'use strict';
const express=require('express');
const rateLimit=require('express-rate-limit');
const permissions=require('./pb-travel-permissions');
const view=require('../views/planetaboricua/turistiando-permiso');
function createRouter({directory='/data/pb-travel-permissions',secret,send,pbEmail,from,requireAdmin,requireAdminCsrf,origin='https://www.masboricuaqueunmofongo.com',ready=()=>true,now=()=>new Date()}){
 const router=express.Router(),store=permissions.createStore(directory),mailer=permissions.createMailer({store,send,pbEmail,from});
 const wrap=fn=>(req,res,next)=>Promise.resolve().then(()=>fn(req,res,next)).catch(next);
 const privateHeaders=(req,res,next)=>{res.set({'Cache-Control':'private, no-store','X-Robots-Tag':'noindex, nofollow','Referrer-Policy':'no-referrer'});next();};
 const available=()=>Boolean(secret&&ready());
 const sameOrigin=(req,res,next)=>req.get('Origin')===origin&&req.get('Sec-Fetch-Site')!=='cross-site'?next():res.status(403).json({ok:false,error:'Invalid origin / Origen inválido'});
 const limit=rateLimit({windowMs:3600000,limit:15,standardHeaders:true,legacyHeaders:false,message:{ok:false,error:'Please wait before trying again / Espera antes de intentar nuevamente'}});
 const receipt=r=>{const {payloadHash,mail,...rest}=r;return {...rest,mail:{venue:{status:mail.venue.status},pb:{status:mail.pb.status}}};};
 router.get('/turistiando/presentacion',privateHeaders,(req,res)=>{const lang=req.query.lang==='es'?'es':'en';res.status(available()?200:503).send(view.page({lang,available:available(),ticket:available()?permissions.ticket(secret,now().getTime()):''}));});
 router.post('/api/pb-turistiando/autorizar',privateHeaders,limit,sameOrigin,express.json({limit:'12kb'}),wrap(async(req,res)=>{
  if(!available())return res.status(503).json({ok:false,error:'Form unavailable / Formulario no disponible'});
  if(Buffer.byteLength(JSON.stringify(req.body||{}))>12000)return res.sendStatus(413);
  const claims=permissions.verifyTicket(secret,req.body?.ticket,now().getTime());
  if(!claims)return res.status(403).json({ok:false,error:'Form expired. Reload this page / Formulario vencido. Recarga la página'});
  let record;
  try{({record}=store.create(req.body,claims.nonce,now()));}catch(error){if(error.validation)return res.status(400).json({ok:false,error:error.message});throw error;}
  // The durable permission exists before either independent email operation.
  // Email errors do not undo consent or falsely report a successful delivery.
  try{record=await mailer.deliver(record.id);}catch(_){record=store.get(record.id);}
  res.json({ok:true,record:receipt(record)});
 }));
 router.get('/pb-control/turistiando',privateHeaders,requireAdmin,wrap((req,res)=>res.send(view.admin({records:store.all()}))));
 router.get('/pb-control/turistiando/:id/registro.json',privateHeaders,requireAdmin,wrap((req,res)=>{if(!/^TP-[a-f0-9]{32}$/.test(req.params.id))return res.sendStatus(404);const r=store.get(req.params.id);if(!r)return res.sendStatus(404);res.set('Content-Disposition',`attachment; filename="${r.id}.json"`).json(r);}));
 router.get('/pb-control/turistiando/:id',privateHeaders,requireAdmin,wrap((req,res)=>{if(!/^TP-[a-f0-9]{32}$/.test(req.params.id))return res.sendStatus(404);const r=store.get(req.params.id);if(!r)return res.sendStatus(404);res.send(view.adminRecord(r,req.pbAdminSession.csrf));}));
 router.post('/pb-control/turistiando/:id/reenviar',privateHeaders,requireAdmin,requireAdminCsrf,wrap(async(req,res)=>{if(!/^TP-[a-f0-9]{32}$/.test(req.params.id)||!store.get(req.params.id))return res.sendStatus(404);const r=await mailer.deliver(req.params.id);res.send(view.adminRecord(r,req.pbAdminSession.csrf,'Se revisaron las copias pendientes. Los envíos ya aceptados no se repiten.'));}));
 router.use((error,req,res,next)=>{if(!/^\/(?:turistiando\/presentacion|api\/pb-turistiando|pb-control\/turistiando)(?:\/|$)/.test(req.path))return next(error);res.status(error.type==='entity.too.large'?413:500).json({ok:false,error:'Unable to complete the operation / No pudimos completar la operación'});});
 return router;
}
module.exports={createRouter};
