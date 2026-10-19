'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {artisanSocialUrl}=require('../utils/pb-artisan-links');
const POLICY_VERSION='2026-10-19.directory.1';
const CATEGORIES=['Comida por encargo','Repostería','Coquito y bebidas','Limbers y postres fríos','Mecánica','Limpieza','Hogar y mantenimiento','Belleza y cuidado personal','Mudanzas y transporte','Fotografía y eventos','Otros servicios'];
function isPrivatePath(value){return /^\/quien-hace\/(?:registro|acceso|mi-perfil|vista-previa)(?:\/|$)/.test(String(value||'').split('?')[0]);}
function fail(message){const e=new Error(message);e.validation=true;throw e;}
function text(value,max,label,required=false){if(typeof value!=='string'||value.length>max||(required&&!value.trim()))fail(`${label}: revisa este campo.`);return value.trim();}
function email(value){const v=text(value,254,'Email',true).toLowerCase();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))fail('Escribe un email válido.');return v;}
function url(value){if(!value)return '';try{const u=new URL(value);if(u.protocol!=='https:'||u.username||u.password)throw Error();return u.href;}catch(_){fail('Usa enlaces HTTPS válidos.');}}
const US_STATES=['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming','District of Columbia'];
function profile(input){
 const name=text(input.name,120,'Nombre del negocio',true),category=text(input.category,80,'Categoría',true);
 if(name.length<3||!CATEGORIES.includes(category))fail('Indica el nombre y una categoría válida.');
 const bio=text(input.bio,1600,'Descripción',true);if(bio.length<20)fail('Describe tus servicios con al menos 20 caracteres.');
 const country=input.country;if(!['PR','US'].includes(country))fail('Selecciona Puerto Rico o Estados Unidos.');
 const region=country==='PR'?'Puerto Rico':text(input.region,100,'Estado',true);if(country==='US'&&!US_STATES.includes(region))fail('Selecciona un estado válido.');
 const city=text(input.city,100,country==='PR'?'Pueblo':'Ciudad',true),zip=text(input.zip??'',5,'Código postal');if(zip&&!/^\d{5}$/.test(zip))fail('Usa un código postal de cinco dígitos.');if(zip&&country==='PR'&&!/^00[679]/.test(zip))fail('Revisa el código postal de Puerto Rico.');
 const phone=text(input.phone??'',30,'Teléfono').replace(/\D/g,'');if(phone&&!/^\d{10,15}$/.test(phone))fail('Revisa el teléfono público.');
 const website=url(input.website??'');if(!phone&&!website)fail('Incluye teléfono público o página para que te contacten.');
 const photo=url(input.photo);if(!photo)fail('Añade una foto o logo.');
 const gallery=input.gallery??[];if(!Array.isArray(gallery)||gallery.length>12)fail('Puedes añadir hasta 12 fotos a la galería.');
 const images=gallery.map(item=>{if(!item||typeof item!=='object')fail('Revisa las fotos.');return {url:url(text(item.url,2048,'Foto',true)),caption:text(item.caption??'',180,'Descripción de foto')};});
 const socials={};for(const network of ['instagram','facebook','tiktok']){const value=text(input[network]??'',500,network);socials[network]=value?artisanSocialUrl(value,network):'';if(value&&!socials[network])fail('Revisa tu enlace de '+network);}
 const seasonStart=text(input.seasonStart??'',10,'Inicio de temporada'),seasonEnd=text(input.seasonEnd??'',10,'Fin de temporada');
 if(Boolean(seasonStart)!==Boolean(seasonEnd)||seasonStart&&(!realDate(seasonStart)||!realDate(seasonEnd)||seasonEnd<seasonStart))fail('Completa ambas fechas de temporada en orden válido.');
 return {name,category,bio,country,region,city,zip,area:text(input.area??'',300,'Área que atiendes'),connection:text(input.connection,300,'Vínculo boricua',true),phone,website,photo,gallery:images,seasonStart,seasonEnd,...socials};
}
function acceptance(input,now){
 for(const key of ['adultRepresentative','rulesAccepted','privacyAcknowledged','publicationAuthorized'])if(input[key]!==true)fail('Debes confirmar tu representación y aceptar las políticas y la publicación del perfil.');
 if(input.policyVersion!==POLICY_VERSION)fail('Las políticas cambiaron. Recarga y léelas antes de continuar.');
 return {version:POLICY_VERSION,at:now.toISOString(),adultRepresentative:true,rulesAccepted:true,privacyAcknowledged:true,publicationAuthorized:true,socialPromotionAuthorized:input.socialPromotionAuthorized===true};
}
function realDate(value){return /^\d{4}-\d{2}-\d{2}$/.test(value)&&Number.isFinite(Date.parse(value+'T12:00:00Z'))&&new Date(value+'T12:00:00Z').toISOString().slice(0,10)===value;}
function dayKeys(start,end){const result=[];for(let d=start;d<=end;d=new Date(Date.parse(d+'T12:00:00Z')+86400000).toISOString().slice(0,10))result.push(d);return result;}
function token(secret,kind,claims,now=new Date(),ttl=2*3600000){if(!secret)throw Error('Falta configurar el acceso seguro de ¿Quién hace?.');const body=Buffer.from(JSON.stringify({...claims,kind,exp:now.getTime()+ttl})).toString('base64url');return body+'.'+crypto.createHmac('sha256',secret).update('pb-directory:'+body).digest('base64url');}
function verify(secret,value,kind,now=new Date()){
 try{if(!secret)return null;const parts=String(value||'').split('.');if(parts.length!==2)return null;const [body,sig]=parts,expected=crypto.createHmac('sha256',secret).update('pb-directory:'+body).digest('base64url');const a=Buffer.from(sig),b=Buffer.from(expected);if(a.length!==b.length||!crypto.timingSafeEqual(a,b))return null;const claims=JSON.parse(Buffer.from(body,'base64url').toString('utf8'));return claims.kind===kind&&Number.isFinite(claims.exp)&&claims.exp>now.getTime()?claims:null;}catch(_){return null;}
}
function createStore({directory,now=()=>new Date()}){
 if(!path.isAbsolute(directory))throw Error('Configura un directorio persistente absoluto.');
 function file(id){if(!/^[a-f0-9-]{36}$/.test(id))fail('Perfil inválido.');return path.join(directory,id+'.json');}
 function get(id){let raw;try{raw=fs.readFileSync(file(id),'utf8');}catch(e){if(e.code==='ENOENT')return null;throw e;}const r=JSON.parse(raw);if(r.version!==1||r.id!==id)throw Error('Registro de directorio inválido.');return r;}
 function all(){try{return fs.readdirSync(directory).filter(f=>/^[a-f0-9-]{36}\.json$/.test(f)).map(f=>get(f.slice(0,-5)));}catch(e){if(e.code==='ENOENT')return [];throw e;}}
 function write(record){fs.mkdirSync(directory,{recursive:true,mode:0o700});const f=file(record.id),tmp=f+'.'+crypto.randomUUID()+'.tmp';try{fs.writeFileSync(tmp,JSON.stringify(record,null,2),{mode:0o600,flag:'wx'});fs.renameSync(tmp,f);}finally{if(fs.existsSync(tmp))fs.unlinkSync(tmp);}}
 function existing(id){const r=get(id);if(!r||r.status==='retired')fail('Perfil no encontrado.');return r;}
 return {get,all,
  byEmail(value){const normalized=email(value);return all().find(r=>r.email===normalized&&r.status!=='retired')||null;},
  bySlug(slug){return all().find(r=>r.slug===slug&&r.status==='approved')||null;},
  create(input,folder){
   const normalized=email(input.email);if(this.byEmail(normalized))fail('Ya existe una solicitud con ese email. Solicita tu enlace de acceso.');
   const draft=profile(input),consent=acceptance(input,now()),id=crypto.randomUUID();
   const slug=draft.name.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,70)+'-'+id.slice(0,8);
   const r={version:1,id,slug,email:normalized,ownerName:text(input.ownerName,120,'Nombre de la persona responsable',true),folder,sessionVersion:1,status:'pending',profile:null,draft,consent,consentHistory:[consent],paused:false,emailVerifiedAt:null,submittedAt:now().toISOString(),updatedAt:now().toISOString()};write(r);return r;
  },
  verifyEmail(id){const r=existing(id);if(!r.emailVerifiedAt){r.emailVerifiedAt=now().toISOString();write(r);}return r;},
  saveDraft(id,input){const r=existing(id);r.draft=profile(input);const consent=acceptance(input,now());r.consent=consent;r.consentHistory=[...(r.consentHistory||[]),consent].slice(-20);r.updatedAt=now().toISOString();r.reviewPending=true;write(r);return r;},
  moderate(id,action){const r=existing(id);if(action==='approve'){if(!r.emailVerifiedAt)fail('La persona responsable debe confirmar su correo antes de aprobar.');if(!r.draft)fail('No hay cambios pendientes.');if(r.consent.version!==POLICY_VERSION)fail('Debe aceptar las políticas vigentes.');r.profile=r.draft;r.draft=null;r.status='approved';r.reviewPending=false;r.approvedAt=now().toISOString();}else if(action==='reject'){if(r.status==='approved'){r.draft=null;r.reviewPending=false;}else r.status='rejected';}else fail('Acción inválida.');r.updatedAt=now().toISOString();write(r);return r;},
  retire(id){const r=existing(id);r.status='retired';r.sessionVersion+=1;r.retiredAt=now().toISOString();write(r);},
  setPaused(id,paused){if(typeof paused!=='boolean')fail('Revisa el estado de pausa.');const r=existing(id);r.paused=paused;r.updatedAt=now().toISOString();write(r);return r;},
  publicRecord(record){
   if(!record||record.status!=='approved'||record.paused)return null;
   const p=record.profile,today=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Puerto_Rico',year:'numeric',month:'2-digit',day:'2-digit'}).format(now());
   if(p.seasonStart&&(today<p.seasonStart||today>p.seasonEnd))return null;
   return {slug:record.slug,...p};
  }

 };
}
function search(records,query={}){
 const clean=v=>String(v??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim().slice(0,120);
 const q=clean(query.q),city=clean(query.city),region=clean(query.region),zip=String(query.zip??'').trim();
 return records.filter(r=>(!query.country||r.country===query.country)&&(!query.category||r.category===query.category)&&(!city||clean(r.city)===city)&&(!region||clean(r.region)===region)&&(!zip||r.zip===zip)&&(!q||clean([r.name,r.bio,r.category,r.area,r.city,r.region].join(' ')).includes(q))).sort((a,b)=>a.name.localeCompare(b.name,'es'));
}
module.exports={isPrivatePath,POLICY_VERSION,CATEGORIES,US_STATES,profile,acceptance,createStore,token,verify,email,search};
