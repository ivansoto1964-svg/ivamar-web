'use strict';
const express=require('express'),crypto=require('node:crypto'),rateLimit=require('express-rate-limit');
const talent=require('./pb-talent');
const view=require('../views/planetaboricua/talento-boricua');
const COOKIE='__Host-pbTalent';
const hash=token=>crypto.createHash('sha256').update('talent-csrf:'+token).digest('hex');
const equal=(a,b)=>{a=Buffer.from(String(a||''));b=Buffer.from(String(b||''));return a.length===b.length&&crypto.timingSafeEqual(a,b);};
function createRouter({store,secret,sendAccess,notifyStatus,upload,requireAdmin,requireAdminCsrf,publicEnabled=()=>false,origin='https://www.masboricuaqueunmofongo.com',now=()=>new Date()}){
 const router=express.Router(),wrap=fn=>(req,res,next)=>Promise.resolve().then(()=>fn(req,res,next)).catch(next);
 const publicLimit=rateLimit({windowMs:3600000,limit:8,standardHeaders:true,legacyHeaders:false});
 const photoLimit=rateLimit({windowMs:3600000,limit:15,standardHeaders:true,legacyHeaders:false});
 const ownerLimit=rateLimit({windowMs:15*60000,limit:60,standardHeaders:true,legacyHeaders:false});
 const publicOnly=(req,res,next)=>publicEnabled()?next():res.status(404).send(view.notice('Talento Boricua está en preparación','La sección pública todavía no está abierta. Puedes completar tu solicitud desde el enlace de registro.','/talento-boricua/registro'));
 const privateHeaders=(req,res,next)=>{res.set({'Cache-Control':'no-store, private','X-Robots-Tag':'noindex, nofollow','Referrer-Policy':'no-referrer'});next();};
 const ready=(req,res,next)=>secret?next():res.status(503).send(view.notice('Registro en preparación','El acceso seguro todavía no está configurado. Comunícate con Planeta Boricua.'));
 const sameOrigin=(req,res,next)=>req.get('Origin')===origin&&req.get('Sec-Fetch-Site')!=='cross-site'?next():res.status(403).json({error:'No se pudo verificar el origen de la solicitud.'});
 function cookie(req){return String(req.headers.cookie||'').split(';').map(s=>s.trim()).find(s=>s.startsWith(COOKIE+'='))?.slice(COOKIE.length+1)||'';}
 const owner=(req,res,next)=>{
  const value=cookie(req),claims=talent.verify(secret,value,'session',now()),record=claims&&store.get(claims.id);
  if(!record||record.status==='retired'||record.email!==claims.email||record.sessionVersion!==claims.version||!record.emailVerifiedAt)return res.status(401).json({error:'Tu acceso venció. Solicita un enlace nuevo.',login:'/talento-boricua/acceso'});
  req.talent={record,token:value};next();
 };
 const ownerCsrf=(req,res,next)=>equal(req.get('X-CSRF-Token'),hash(req.talent.token))?next():res.status(403).json({error:'La sesión de seguridad expiró.'});
 const formTicket=(req,res,next)=>{
  const ticket=req.get('X-PB-Talent-Ticket')||'',claims=talent.verify(secret,ticket,'form',now());
  if(!claims||!/^([a-f0-9]{32})$/.test(claims.nonce)||!equal(req.get('X-CSRF-Token'),hash(ticket)))return res.status(403).json({error:'El formulario venció. Recarga la página.'});
  req.talentForm=claims;next();
 };
 const validPhoto=(photo,folder)=>{try{const u=new URL(photo);return u.protocol==='https:'&&u.hostname==='res.cloudinary.com'&&u.pathname.includes(`/image/upload/`)&&u.pathname.includes(`/planeta-boricua/talento/${folder}/`)&&!u.username&&!u.password;}catch(_){return false;}};
 const access=async record=>{
  const value=talent.token(secret,'email',{id:record.id,email:record.email,version:record.sessionVersion},now());
  await sendAccess(record.email,origin+'/talento-boricua/acceso/'+encodeURIComponent(value));
 };
 const errorResponse=(res,error)=>{if(!error.validation)throw error;return res.status(400).json({error:error.message});};
 router.get('/talento-boricua/registro',privateHeaders,ready,(req,res)=>{const ticket=talent.token(secret,'form',{nonce:crypto.randomBytes(16).toString('hex')},now());res.send(view.registration({ticket,csrf:hash(ticket)}));});
 router.get('/talento-boricua/politicas',(req,res)=>res.send(view.policies()));
 router.get('/talento-boricua/acceso',privateHeaders,(req,res)=>res.send(view.access()));
 router.get('/talento-boricua/acceso/:token',privateHeaders,ready,wrap((req,res)=>{
  const claims=talent.verify(secret,req.params.token,'email',now()),r=claims&&store.get(claims.id);
  if(!r||r.status==='retired'||r.email!==claims.email||r.sessionVersion!==claims.version)return res.status(401).send(view.notice('Enlace vencido','Solicita otro enlace de acceso.', '/talento-boricua/acceso'));
  // Viewing an email link does not verify or mutate anything (mail scanners).
  res.send(view.confirm({token:req.params.token,csrf:hash(req.params.token)}));
 }));
 router.post('/api/pb-talento/confirmar',privateHeaders,ready,publicLimit,sameOrigin,express.json({limit:'5kb'}),wrap((req,res)=>{
  const value=req.body?.token,claims=talent.verify(secret,value,'email',now()),r=claims&&store.get(claims.id);
  if(!r||r.status==='retired'||r.email!==claims.email||r.sessionVersion!==claims.version||!equal(req.body?.csrf,hash(value)))return res.status(401).json({error:'El enlace venció o no es válido.'});
  store.verifyEmail(r.id);
  const session=talent.token(secret,'session',{id:r.id,email:r.email,version:r.sessionVersion},now());
  res.cookie(COOKIE,session,{httpOnly:true,secure:true,sameSite:'lax',path:'/',maxAge:2*3600000});res.json({redirect:'/talento-boricua/mi-perfil'});
 }));
 router.post('/api/pb-talento/registro',privateHeaders,ready,publicLimit,sameOrigin,formTicket,express.json({limit:'30kb'}),wrap(async(req,res)=>{
  const input=req.body||{};
  if(Buffer.byteLength(JSON.stringify(input))>30000)return res.sendStatus(413);
  try{
   talent.email(input.email);
   // Duplicate requests never overwrite another profile or its consent.
   const existing=store.byEmail(input.email);
   if(existing){await access(existing);return res.json({message:'Revisa tu correo para confirmar o administrar tu solicitud.'});}
   if(!validPhoto(input.photo,req.talentForm.nonce))return res.status(400).json({error:'Sube la foto desde este formulario.'});
   const record=store.create(input,req.talentForm.nonce);
   try{await access(record);}catch(error){return res.status(503).json({error:'Guardamos tu solicitud, pero no pudimos enviar el acceso. Intenta desde «Entrar a mi perfil».'});}
   res.json({message:'Recibimos tu solicitud. Revisa tu correo y confirma tu acceso; luego Planeta Boricua revisará el perfil antes de publicarlo.'});
  }catch(error){return errorResponse(res,error);}
 }));
 router.post('/api/pb-talento/acceso',privateHeaders,ready,publicLimit,sameOrigin,express.json({limit:'2kb'}),wrap(async(req,res)=>{
  let email;try{email=talent.email(req.body?.email);}catch(error){return errorResponse(res,error);}
  const record=store.byEmail(email);if(record)await access(record);
  res.json({message:'Si ese correo tiene una solicitud, recibirás un enlace seguro. Revisa también Spam o Promociones.'});
 }));
 async function photo(req,res,folder){
  const value=req.body?.data,match=typeof value==='string'&&value.match(/^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/]+={0,2})$/);
  if(!match||Buffer.byteLength(match[2],'base64')>5*1024*1024)return res.status(400).json({error:'Usa una foto JPG, PNG o WebP de hasta 5 MB.'});
  const result=await upload(value,folder);if(!validPhoto(result,folder))throw Error('Invalid upload destination');res.json({url:result});
 }
 router.post('/api/pb-talento/foto-registro',privateHeaders,ready,photoLimit,sameOrigin,formTicket,express.json({limit:'7mb'}),wrap((req,res)=>photo(req,res,req.talentForm.nonce)));
 router.post('/api/pb-talento/foto',privateHeaders,ready,photoLimit,sameOrigin,wrap(owner),ownerCsrf,express.json({limit:'7mb'}),wrap((req,res)=>photo(req,res,req.talent.record.folder)));
 router.get('/talento-boricua/mi-perfil',privateHeaders,ready,wrap((req,res,next)=>{if(!talent.verify(secret,cookie(req),'session',now()))return res.redirect('/talento-boricua/acceso');owner(req,res,next);}),wrap((req,res)=>res.send(view.owner({record:req.talent.record,csrf:hash(req.talent.token),publicEnabled:publicEnabled()}))));
 router.post('/api/pb-talento/perfil',privateHeaders,ready,ownerLimit,sameOrigin,wrap(owner),ownerCsrf,express.json({limit:'30kb'}),wrap((req,res)=>{
  try{if(!validPhoto(req.body?.photo,req.talent.record.folder))return res.status(400).json({error:'Usa una foto subida desde tu perfil.'});store.saveDraft(req.talent.record.id,req.body||{});res.json({message:'Cambios enviados para revisión. Tu calendario sigue disponible en este panel.'});}catch(error){return errorResponse(res,error);}
 }));
 router.post('/api/pb-talento/calendario',privateHeaders,ready,ownerLimit,sameOrigin,wrap(owner),ownerCsrf,express.json({limit:'5kb'}),wrap((req,res)=>{
  try{res.json({entry:store.saveCalendar(req.talent.record.id,req.body||{})});}catch(error){return errorResponse(res,error);}
 }));
 router.post('/api/pb-talento/calendario/eliminar',privateHeaders,ready,ownerLimit,sameOrigin,wrap(owner),ownerCsrf,express.json({limit:'2kb'}),wrap((req,res)=>{
  try{store.deleteCalendar(req.talent.record.id,req.body?.id);res.json({ok:true});}catch(error){return errorResponse(res,error);}
 }));
 router.post('/api/pb-talento/retirar',privateHeaders,ready,ownerLimit,sameOrigin,wrap(owner),ownerCsrf,express.json({limit:'1kb'}),wrap((req,res)=>{
  if(req.body?.confirmed!==true)return res.status(400).json({error:'Confirma el retiro del perfil.'});store.retire(req.talent.record.id);res.clearCookie(COOKIE,{httpOnly:true,secure:true,sameSite:'lax',path:'/'});res.json({redirect:'/talento-boricua'});
 }));
 router.post('/api/pb-talento/salir',privateHeaders,ready,sameOrigin,wrap(owner),ownerCsrf,(req,res)=>{res.clearCookie(COOKIE,{httpOnly:true,secure:true,sameSite:'lax',path:'/'});res.json({redirect:'/talento-boricua/acceso'});});
 router.get('/pb-control/talento',privateHeaders,requireAdmin,wrap((req,res)=>res.send(view.admin({records:store.all(),csrf:req.pbAdminSession.csrf,publicEnabled:publicEnabled()}))));
 router.post('/pb-control/talento/accion',privateHeaders,requireAdmin,sameOrigin,express.json({limit:'3kb'}),requireAdminCsrf,wrap(async(req,res)=>{
  try{
   const {id,action,entryId}=req.body||{};
   if(entryId)store.moderateCalendar(id,entryId,action);
   else if(action==='retire')store.retire(id);
   else {
    const record=store.moderate(id,action);
    if(notifyStatus){try{await notifyStatus(record.email,action,origin+'/talento-boricua/'+record.slug);}catch(_){return res.json({ok:true,warning:'La revisión se guardó, pero no pudimos entregar el aviso por correo.'});}}
   }
   res.json({ok:true});
  }catch(error){return errorResponse(res,error);}
 }));
 router.get('/talento-boricua',publicOnly,(req,res)=>res.send(view.directory(store.all().map(r=>store.publicRecord(r)).filter(Boolean))));
 router.get('/talento-boricua/:slug/calendario/:id.ics',publicOnly,wrap((req,res)=>{
  const r=store.publicRecord(store.bySlug(req.params.slug)),entry=r?.calendar.find(e=>e.id===req.params.id&&e.kind==='performance');if(!entry)return res.sendStatus(404);
  res.set({'Content-Type':'text/calendar; charset=utf-8','Content-Disposition':'attachment; filename="presentacion-pb.ics"'});res.send(talent.ics(r,entry));
 }));
 router.get('/talento-boricua/:slug',publicOnly,wrap((req,res)=>{const r=store.publicRecord(store.bySlug(req.params.slug));if(!r)return res.status(404).send(view.notice('Perfil no disponible','Este perfil no está publicado.','/talento-boricua'));res.send(view.publicProfile(r,req.query.month,now()));}));
 router.use((error,req,res,next)=>{if(!req.path.startsWith('/talento-boricua')&&!req.path.startsWith('/api/pb-talento')&&!req.path.startsWith('/pb-control/talento'))return next(error);const status=error.type==='entity.too.large'?413:error.type==='entity.parse.failed'?400:500;res.status(status).json({error:status===413?'La solicitud es demasiado grande.':status===400?'Solicitud inválida.':'No pudimos completar la operación. Intenta nuevamente.'});});
 return router;
}
module.exports={createRouter};
