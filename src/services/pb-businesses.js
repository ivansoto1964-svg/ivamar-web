'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const towns=new Map(require('../data/pb-municipalities'));
const {artisanSocialUrl}=require('../utils/pb-artisan-links');
const CATEGORIES={comida:'Dónde comer',hospedaje:'Dónde hospedarse',experiencias:'Qué hacer',transporte:'Cómo moverse'};
const POLICY='2026-11-06',PRICE=999;
const fail=message=>{throw Object.assign(new Error(message),{validation:true});};
const text=(v,max,label,required=false)=>{if(typeof v!=='string'||v.length>max||(required&&!v.trim())||/[\u0000-\u0008]/.test(v))fail('Revisa '+label+'.');return v.trim();};
const email=v=>{v=text(v,254,'el email',true).toLowerCase();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))fail('Escribe un email válido.');return v;};
function url(v){if(!v)return '';v=text(v,1000,'el enlace');try{const u=new URL(v);if(u.protocol!=='https:'||u.username||u.password||!u.hostname.includes('.')||/^(localhost|127\.|0\.|10\.|192\.168\.|169\.254\.)/.test(u.hostname))throw Error();return u.href;}catch(_){fail('Usa enlaces completos que comiencen con https://.');}}
function profile(input){
 const r={name:text(input.name,120,'el nombre',true),town:text(input.town,60,'el pueblo',true),category:text(input.category,30,'la categoría',true),description:text(input.description,2400,'la descripción',true),address:text(input.address,240,'la dirección',true),hours:text(input.hours,800,'los horarios',true),details:text(input.details||'',1600,'los detalles')};
 if(r.name.length<3||r.description.length<30||!towns.has(r.town)||!CATEGORIES[r.category])fail('Completa el nombre, una descripción de al menos 30 caracteres, el pueblo y la categoría.');
 for(const k of ['phone','whatsapp']){r[k]=text(input[k]||'',30,k).replace(/\D/g,'');if(r[k]&&!/^\d{10,15}$/.test(r[k]))fail('Revisa el número de '+k+'.');}
 for(const k of ['website','menu','order','booking','tickets','youtube'])r[k]=url(input[k]||'');
 for(const k of ['facebook','instagram','tiktok']){const v=text(input[k]||'',500,k);r[k]=v?artisanSocialUrl(v,k):'';if(v&&!r[k])fail('Revisa tu perfil de '+k+'.');if(r[k])r[k]=url(r[k]);}
 if(r.youtube&&!['youtube.com','www.youtube.com','youtu.be'].includes(new URL(r.youtube).hostname))fail('Usa un enlace de YouTube.');
 if(!r.phone&&!r.whatsapp&&!r.website&&!r.booking&&!r.order)fail('Añade teléfono, WhatsApp o un enlace para contactar tu negocio.');
 if(!Array.isArray(input.photos)||input.photos.length<1||input.photos.length>8)fail('Añade de una a ocho fotos.');
 r.photos=input.photos.map(p=>({url:url(p.url),alt:text(p.alt,180,'la descripción de la foto',true)}));
 return r;
}
const digest=v=>crypto.createHash('sha256').update(String(v)).digest('hex');
function token(secret,kind,data,ttl=7200000,now=Date.now()){const body=Buffer.from(JSON.stringify({...data,kind,exp:now+ttl})).toString('base64url');return body+'.'+crypto.createHmac('sha256',secret).update('pb-business:'+body).digest('base64url');}
function verify(secret,value,kind,now=Date.now()){try{if(!secret)return null;const [b,s,...rest]=String(value||'').split('.'),expected=crypto.createHmac('sha256',secret).update('pb-business:'+b).digest('base64url');if(rest.length||!equal(s,expected))return null;const c=JSON.parse(Buffer.from(b,'base64url'));return c.kind===kind&&c.exp>now?c:null;}catch(_){return null;}}
function equal(a,b){a=Buffer.from(String(a||''));b=Buffer.from(String(b||''));return a.length===b.length&&crypto.timingSafeEqual(a,b);}
function entitled(r,now=Date.now()){return Boolean(r&&r.approved&&r.emailVerifiedAt&&!r.hidden&&!r.billing.hold&&['active','past_due'].includes(r.billing.status)&&r.billing.paidUntil*1000>now);}
function publicRecord(r,now=Date.now()){return entitled(r,now)?{slug:r.slug,...r.approved}:null;}
function createStore(directory,now=()=>Date.now()){
 if(!path.isAbsolute(directory))throw Error('Business data directory must be absolute.');
 const file=path.join(directory,'directory.json');
 function read(){if(!fs.existsSync(file))return {records:[],events:[]};const value=JSON.parse(fs.readFileSync(file,'utf8'));if(!Array.isArray(value.records)||!Array.isArray(value.events))throw Error('Invalid business directory data');return value;}
 function write(data){fs.mkdirSync(directory,{recursive:true,mode:0o700});if(fs.existsSync(file)){fs.copyFileSync(file,file+'.previous');fs.chmodSync(file+'.previous',0o600);}const temp=file+'.'+crypto.randomBytes(8).toString('hex')+'.tmp';fs.writeFileSync(temp,JSON.stringify(data),{mode:0o600});fs.renameSync(temp,file);}
 function mutate(fn){const d=read();const result=fn(d);write(d);return result;}
 const all=()=>read().records;
 function get(id){return all().find(r=>r.id===id);}
 function update(id,fn){return mutate(d=>{const r=d.records.find(r=>r.id===id);if(!r)fail('Perfil no encontrado.');fn(r);r.updatedAt=new Date(now()).toISOString();return r;});}
 return {all,get,byEmail:v=>all().find(r=>r.email===v),bySlug:v=>all().find(r=>r.slug===v),byCustomer:id=>all().find(r=>r.billing.customer===id),bySubscription:id=>all().find(r=>r.billing.subscription===id),update,
  create(input){const e=email(input.email),p=profile(input);if(input.accepted!==true||input.policy!==POLICY)fail('Acepta las condiciones y tu autorización para publicar.');return mutate(d=>{if(d.records.some(r=>r.email===e))fail('Ya existe una solicitud con ese correo. Entra a tu perfil.');const id=crypto.randomBytes(16).toString('hex');const slug=p.name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,65)+'-'+id.slice(0,8);const r={id,slug,email:e,ownerName:text(input.ownerName,100,'tu nombre',true),draft:p,approved:null,revision:1,pending:true,reviewNote:'',hidden:false,emailVerifiedAt:null,version:1,consent:{policy:POLICY,at:new Date(now()).toISOString()},createdAt:new Date(now()).toISOString(),billing:{customer:null,subscription:null,status:'none',paidUntil:0,hold:null,checkout:null,attempt:0}};d.records.push(r);return r;});},
  draft(id,input){const p=profile(input);return update(id,r=>{if(Number(input.revision)!==r.revision)fail('Hay cambios más recientes. Recarga antes de guardar.');r.draft=p;r.revision++;r.pending=true;r.reviewNote='';});},
  moderate(id,action,revision){return update(id,r=>{if(Number(revision)!==r.revision)fail('El perfil cambió. Recarga antes de revisarlo.');if(action==='approve'){if(!r.emailVerifiedAt)fail('El dueño debe confirmar su email primero.');r.approved=structuredClone(r.draft);r.pending=false;r.reviewNote='Aprobado';}else if(action==='reject'){r.pending=false;r.reviewNote='Revisa la información y envía una actualización.';}else if(action==='hide')r.hidden=true;else if(action==='show')r.hidden=false;else if(action==='clear-risk')r.billing.hold=null;else fail('Acción inválida.');});},
  publicAll:()=>all().map(r=>publicRecord(r,now())).filter(Boolean).sort((a,b)=>a.name.localeCompare(b.name,'es')),
  seen:id=>read().events.includes(id),done(id){mutate(d=>{if(!d.events.includes(id))d.events.push(id);d.events=d.events.slice(-3000);});}
 };
}
module.exports={CATEGORIES,towns,POLICY,PRICE,profile,email,url,token,verify,equal,digest,entitled,publicRecord,createStore,fail};
