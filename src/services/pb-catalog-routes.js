'use strict';
const crypto = require('node:crypto');
const fs = require('node:fs');
const express = require('express');
const rateLimit = require('express-rate-limit');
const {configuration,effectivePlan,PLANS} = require('./pb-catalog-foundation');
const view = require('../views/planetaboricua/artesano-catalogo');

function readMembership(file,id) {
  let raw;
  try { raw=fs.readFileSync(file,'utf8'); }
  catch(error) { if(error.code==='ENOENT') return null;throw error; }
  const data=JSON.parse(raw);
  if(data.version!==1||!Array.isArray(data.memberships)) throw new Error('Archivo de membresías inválido.');
  const matches=data.memberships.filter(entry=>String(entry.artisanId)===String(id));
  if(matches.length>1) throw new Error('Membresías duplicadas.');
  return matches[0]||null;
}
function csrf(token) { return crypto.createHash('sha256').update('pb-catalog-csrf:'+token).digest('hex'); }
function equal(a,b) { const x=Buffer.from(String(a||'')),y=Buffer.from(String(b||''));return x.length===y.length&&crypto.timingSafeEqual(x,y); }
function createCatalogRouter({store,verifyToken,getArtisan,getArtisanBySlug,getMembership,upload,requireAdmin,
  env=process.env,origin='https://www.masboricuaqueunmofongo.com',now=()=>new Date()}) {
  const router=express.Router();
  const mutations=rateLimit({windowMs:60*60*1000,limit:90,standardHeaders:true,legacyHeaders:false});
  const uploads=rateLimit({windowMs:60*60*1000,limit:25,standardHeaders:true,legacyHeaders:false});
  const wrapped=fn=>(req,res,next)=>Promise.resolve().then(()=>fn(req,res,next)).catch(next);
  const gate=(req,res,next)=>{res.set({'Cache-Control':'no-store, private','X-Robots-Tag':'noindex, nofollow','Referrer-Policy':'no-referrer'});if(!configuration(env).catalog)return res.sendStatus(404);next();};
  const auth=(req,res,next)=>{
    const token=String(req.params.token||'');
    const claims=verifyToken(token);
    const item=claims&&getArtisan(claims.id);
    if(!item||String(item.email||'').trim().toLowerCase()!==String(claims.email||'').trim().toLowerCase())return res.status(401).json({error:'Tu acceso venció. Solicita otro enlace desde Mi perfil.'});
    req.catalog={item,token,principal:{role:'artisan',artisanId:String(item.id)},membership:getMembership(item.id)};
    next();
  };
  const writeGuard=(req,res,next)=>{
    if(req.get('Origin')!==origin||req.get('Sec-Fetch-Site')==='cross-site'||!equal(req.get('X-CSRF-Token'),csrf(req.catalog.token)))return res.status(403).json({error:'No se pudo verificar la solicitud.'});
    next();
  };
  const paid=(req,res,next)=>effectivePlan(req.catalog.membership,now())==='free'?res.status(403).json({error:'Necesitas un catálogo habilitado.'}):next();
  const ownPhoto=(url,id)=>{
    try {const parsed=new URL(url);return parsed.hostname==='res.cloudinary.com'&&parsed.pathname.includes(`/planeta-boricua/catalogos/${id}/`);}catch(_){return false;}
  };
  router.get('/artesanos/catalogo/:token',gate,wrapped(auth),wrapped((req,res)=>{
    const {item,token,principal,membership}=req.catalog;
    res.send(view.panel({item,token,csrf:csrf(token),products:store.list(principal),plan:effectivePlan(membership,now())}));
  }));
  router.get('/artesanos/catalogo/:token/vista',gate,wrapped(auth),wrapped((req,res)=>{
    const {item,membership}=req.catalog;
    res.send(view.publicPage({item,products:store.publicProducts(String(item.id),membership),profileUrl:`/artesanos/${encodeURIComponent(item.slug)}`,preview:true}));
  }));
  router.post('/api/pb-catalogo/:token/guardar',gate,mutations,wrapped(auth),writeGuard,paid,express.json({limit:'40kb'}),wrapped((req,res)=>{
    const {principal,membership}=req.catalog;
    if(!Array.isArray(req.body?.images)||!req.body.images.every(url=>ownPhoto(url,principal.artisanId)))return res.status(400).json({error:'Usa fotos subidas desde tu catálogo.'});
    try {res.json({product:store.upsert(principal,membership,req.body)});}catch(error){if(error.code)throw error;res.status(400).json({error:error.message});}
  }));
  router.post('/api/pb-catalogo/:token/eliminar',gate,mutations,wrapped(auth),writeGuard,express.json({limit:'2kb'}),wrapped((req,res)=>{
    try {store.remove(req.catalog.principal,req.body?.id);res.json({ok:true});}catch(error){if(error.code)throw error;res.status(400).json({error:error.message});}
  }));
  router.post('/api/pb-catalogo/:token/foto',gate,uploads,wrapped(auth),writeGuard,paid,express.json({limit:'7mb'}),wrapped(async(req,res)=>{
    if(!upload)return res.status(503).json({error:'La carga de fotos todavía no está configurada.'});
    const plan=effectivePlan(req.catalog.membership,now());
    const data=req.body?.data;
    const match=typeof data==='string'&&data.match(/^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/]+={0,2})$/);
    if(!match||Buffer.byteLength(match[2],'base64')>5*1024*1024)return res.status(400).json({error:'Usa una imagen JPG, PNG o WebP de hasta 5 MB.'});
    // Cap upload calls even if drafts are never saved; billing is never inferred.
    if(!PLANS[plan].products)return res.sendStatus(403);
    const url=await upload(data,req.catalog.principal.artisanId);
    if(!ownPhoto(url,req.catalog.principal.artisanId))throw new Error('El proveedor devolvió una foto no autorizada.');
    res.json({url});
  }));
  router.get('/catalogos/:slug',gate,wrapped((req,res)=>{
    // A separate switch permits private pilot editing without public catalogs.
    if(env.PB_CATALOG_PUBLIC_ENABLED!=='true')return res.sendStatus(404);
    const item=getArtisanBySlug(req.params.slug);
    if(!item)return res.sendStatus(404);
    const membership=getMembership(item.id);
    if(effectivePlan(membership,now())==='free')return res.sendStatus(404);
    res.send(view.publicPage({item,products:store.publicProducts(String(item.id),membership),profileUrl:`/artesanos/${encodeURIComponent(item.slug)}`}));
  }));
  if(requireAdmin)router.get('/pb-control/catalogos/:id',gate,requireAdmin,wrapped((req,res)=>{
    const item=getArtisan(req.params.id);if(!item)return res.sendStatus(404);
    // Read-only preview of actual saved products; no entitlement grants here.
    res.send(view.publicPage({item,products:store.publicProducts(String(item.id),getMembership(item.id)),profileUrl:`/artesanos/${encodeURIComponent(item.slug)}`,preview:true}));
  }));
  router.use((error,req,res,next)=>{
    const ours=req.path.startsWith('/api/pb-catalogo/')||req.path.startsWith('/artesanos/catalogo/')||req.path.startsWith('/catalogos/')||req.path.startsWith('/pb-control/catalogos/');
    if(!ours)return next(error);
    // Avoid returning filesystem details, credentials or malformed JSON bodies.
    const status=error.type==='entity.too.large'?413:error.type==='entity.parse.failed'?400:500;
    res.status(status).json({error:status===413?'La solicitud es demasiado grande.':status===400?'Solicitud inválida.':'No pudimos completar la operación. Intenta nuevamente.'});
  });
  return router;
}
module.exports={createCatalogRouter,readMembership};
