'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {artisanSocialUrl}=require('../utils/pb-artisan-links');
const POLICY_VERSION='2026-10-19.1';
const CATEGORIES=['Trovador/a','Músico/a','Cantante','Agrupación musical','Otro talento cultural'];
function isPrivatePath(value){return /^\/talento-boricua\/(?:registro|acceso|mi-perfil)(?:\/|$)/.test(String(value||'').split('?')[0]);}
function fail(message){const e=new Error(message);e.validation=true;throw e;}
function text(value,max,label,required=false){if(typeof value!=='string'||value.length>max||(required&&!value.trim()))fail(`${label}: revisa este campo.`);return value.trim();}
function email(value){const v=text(value,254,'Email',true).toLowerCase();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))fail('Escribe un email válido.');return v;}
function url(value){if(!value)return '';try{const u=new URL(value);if(u.protocol!=='https:'||u.username||u.password)throw Error();return u.href;}catch(_){fail('Usa enlaces HTTPS válidos.');}}
function videoId(value){
 if(!value)return '';
 let u;try{u=new URL(value);}catch(_){fail('Usa el enlace de un video de YouTube.');}
 if(u.protocol!=='https:'||u.username||u.password)fail('Usa un enlace HTTPS de YouTube.');
 const host=u.hostname.toLowerCase(),parts=u.pathname.split('/').filter(Boolean);let id='';
 if(['youtu.be','www.youtu.be'].includes(host))id=parts[0]||'';
 else if(['youtube.com','www.youtube.com','m.youtube.com'].includes(host))id=parts[0]==='watch'?u.searchParams.get('v')||'':['shorts','live','embed'].includes(parts[0])?parts[1]||'':'';
 if(!/^[A-Za-z0-9_-]{11}$/.test(id))fail('Incluye un video específico de YouTube, no el enlace del canal.');
 return id;
}
function profile(input){
 const name=text(input.name,120,'Nombre artístico',true),category=text(input.category,80,'Categoría',true);
 if(name.length<3||!CATEGORIES.includes(category))fail('Indica el nombre artístico y una categoría válida.');
 const bio=text(input.bio,1600,'Presentación',true);if(bio.length<20)fail('Cuéntanos un poco más de tu trayectoria (mínimo 20 caracteres).');
 const phone=text(input.phone??'',30,'Teléfono').replace(/\D/g,'');if(phone&&!/^\d{10,15}$/.test(phone))fail('Revisa el teléfono de contacto público.');
 const photo=url(input.photo);if(!photo)fail('Añade una foto para el perfil.');
 const socials={};for(const network of ['instagram','facebook','tiktok']){const value=text(input[network]??'',500,network);socials[network]=value?artisanSocialUrl(value,network):'';if(value&&!socials[network])fail(`Revisa tu enlace de ${network}.`);}
 return {name,category,bio,city:text(input.city,100,'Ciudad o pueblo',true),region:text(input.region,100,'Estado o región',true),connection:text(input.connection,300,'Vínculo con Puerto Rico',true),phone,website:url(input.website??''),photo,videoId:videoId(text(input.videoUrl??'',500,'Video')),...socials};
}
function acceptance(input,now){
 for(const key of ['adultRepresentative','rulesAccepted','privacyAcknowledged','publicationAuthorized'])if(input[key]!==true)fail('Debes confirmar tu representación y aceptar las políticas y la publicación del perfil.');
 if(input.policyVersion!==POLICY_VERSION)fail('Las políticas cambiaron. Recarga y léelas antes de continuar.');
 return {version:POLICY_VERSION,at:now.toISOString(),adultRepresentative:true,rulesAccepted:true,privacyAcknowledged:true,publicationAuthorized:true,socialPromotionAuthorized:input.socialPromotionAuthorized===true};
}
function realDate(value){return /^\d{4}-\d{2}-\d{2}$/.test(value)&&Number.isFinite(Date.parse(value+'T12:00:00Z'))&&new Date(value+'T12:00:00Z').toISOString().slice(0,10)===value;}
function dayKeys(start,end){const result=[];for(let d=start;d<=end;d=new Date(Date.parse(d+'T12:00:00Z')+86400000).toISOString().slice(0,10))result.push(d);return result;}
function calendarEntry(input,now=new Date()){
 const kind=input.kind;if(!['performance','available','busy_private'].includes(kind))fail('Selecciona presentación, disponible o bloqueo privado.');
 const startDate=text(input.startDate,10,'Fecha inicial',true),endDate=text(input.endDate||input.startDate,10,'Fecha final',true),timezone=text(input.timezone,80,'Zona horaria',true);
 try{new Intl.DateTimeFormat('en',{timeZone:timezone}).format(now);}catch(_){fail('Zona horaria inválida.');}
 const today=new Intl.DateTimeFormat('en-CA',{timeZone:timezone,year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
 if(!realDate(startDate)||!realDate(endDate)||endDate<startDate||startDate<today||(Date.parse(endDate)-Date.parse(startDate))/86400000>30)fail('Usa fechas futuras válidas; cada entrada puede cubrir hasta 31 días.');
 const startTime=text(input.startTime??'',5,'Hora inicial'),endTime=text(input.endTime??'',5,'Hora final');
 for(const t of [startTime,endTime])if(t&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(t))fail('Revisa el horario.');
 if(endTime&&!startTime||startTime&&endTime&&startTime>=endTime)fail('La hora final debe ser posterior a la inicial. Para actividades que cruzan medianoche, crea una entrada por día.');
 return {kind,startDate,endDate,timezone,startTime,endTime,title:kind==='performance'?text(input.title,140,'Nombre de la presentación',true):kind==='available'?'Disponible':'Bloqueo privado',venue:kind==='performance'?text(input.venue??'',180,'Lugar público'):'',city:kind==='performance'?text(input.city,100,'Ciudad de la presentación',true):'',eventUrl:kind==='performance'?url(input.eventUrl??''):'',status:kind==='performance'?'pending':'declared'};
}
function publicCalendar(record,today){
 if(record.status!=='approved')return [];
 const calendar=record.calendar||[],blocked=new Set();
 for(const e of calendar)if(e.kind!=='available'&&(e.kind==='busy_private'||e.status!=='rejected'))for(const day of dayKeys(e.startDate,e.endDate))blocked.add(day);
 const entries=calendar.filter(e=>e.kind==='performance'&&e.status==='approved'&&e.endDate>=today).map(({id,title,startDate,endDate,startTime,endTime,timezone,venue,city,eventUrl})=>({id,kind:'performance',title,startDate,endDate,startTime,endTime,timezone,venue,city,eventUrl}));
 const seen=new Set();
 for(const e of calendar)if(e.kind==='available')for(const day of dayKeys(e.startDate,e.endDate))if(day>=today&&!blocked.has(day)&&!seen.has(day)){seen.add(day);entries.push({id:e.id+'-'+day,kind:'available',title:'Disponible',startDate:day,endDate:day,startTime:e.startTime,endTime:e.endTime,timezone:e.timezone});}
 return entries.sort((a,b)=>a.startDate.localeCompare(b.startDate));
}
function token(secret,kind,claims,now=new Date(),ttl=2*3600000){if(!secret)throw Error('Falta configurar el acceso seguro de Talento Boricua.');const body=Buffer.from(JSON.stringify({...claims,kind,exp:now.getTime()+ttl})).toString('base64url');return body+'.'+crypto.createHmac('sha256',secret).update('pb-talent:'+body).digest('base64url');}
function verify(secret,value,kind,now=new Date()){
 try{if(!secret)return null;const parts=String(value||'').split('.');if(parts.length!==2)return null;const [body,sig]=parts,expected=crypto.createHmac('sha256',secret).update('pb-talent:'+body).digest('base64url');const a=Buffer.from(sig),b=Buffer.from(expected);if(a.length!==b.length||!crypto.timingSafeEqual(a,b))return null;const claims=JSON.parse(Buffer.from(body,'base64url').toString('utf8'));return claims.kind===kind&&Number.isFinite(claims.exp)&&claims.exp>now.getTime()?claims:null;}catch(_){return null;}
}
function createStore({directory,now=()=>new Date()}){
 if(!path.isAbsolute(directory))throw Error('Configura un directorio persistente absoluto.');
 function file(id){if(!/^[a-f0-9-]{36}$/.test(id))fail('Perfil inválido.');return path.join(directory,id+'.json');}
 function get(id){let raw;try{raw=fs.readFileSync(file(id),'utf8');}catch(e){if(e.code==='ENOENT')return null;throw e;}const r=JSON.parse(raw);if(r.version!==1||r.id!==id)throw Error('Registro cultural inválido.');return r;}
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
   const r={version:1,id,slug,email:normalized,ownerName:text(input.ownerName,120,'Nombre de la persona responsable',true),folder,sessionVersion:1,status:'pending',profile:null,draft,consent,consentHistory:[consent],calendar:[],emailVerifiedAt:null,submittedAt:now().toISOString(),updatedAt:now().toISOString()};write(r);return r;
  },
  verifyEmail(id){const r=existing(id);if(!r.emailVerifiedAt){r.emailVerifiedAt=now().toISOString();write(r);}return r;},
  saveDraft(id,input){const r=existing(id);r.draft=profile(input);const consent=acceptance(input,now());r.consent=consent;r.consentHistory=[...(r.consentHistory||[]),consent].slice(-20);r.updatedAt=now().toISOString();r.reviewPending=true;write(r);return r;},
  moderate(id,action){const r=existing(id);if(action==='approve'){if(!r.emailVerifiedAt)fail('El artista debe confirmar su correo antes de aprobar.');if(!r.draft)fail('No hay cambios pendientes.');if(r.consent.version!==POLICY_VERSION)fail('Debe aceptar las políticas vigentes.');r.profile=r.draft;r.draft=null;r.status='approved';r.reviewPending=false;r.approvedAt=now().toISOString();}else if(action==='reject'){if(r.status==='approved'){r.draft=null;r.reviewPending=false;}else r.status='rejected';}else fail('Acción inválida.');r.updatedAt=now().toISOString();write(r);return r;},
  retire(id){const r=existing(id);r.status='retired';r.sessionVersion+=1;r.retiredAt=now().toISOString();write(r);},
  saveCalendar(id,input){const r=existing(id),entry=calendarEntry(input,now());const index=input.id?r.calendar.findIndex(e=>e.id===input.id):-1;if(input.id&&index<0)fail('Entrada no encontrada.');if(index<0&&r.calendar.length>=200)fail('Elimina entradas anteriores antes de añadir más (máximo 200).');entry.id=index<0?crypto.randomUUID():input.id;entry.updatedAt=now().toISOString();if(index<0)r.calendar.push(entry);else r.calendar[index]=entry;write(r);return entry;},
  deleteCalendar(id,entryId){const r=existing(id);if(!r.calendar.some(e=>e.id===entryId))fail('Entrada no encontrada.');r.calendar=r.calendar.filter(e=>e.id!==entryId);write(r);},
  moderateCalendar(id,entryId,action){const r=existing(id),entry=r.calendar.find(e=>e.id===entryId);if(!entry||entry.kind!=='performance')fail('Presentación no encontrada.');if(!['approve','reject'].includes(action))fail('Acción inválida.');entry.status=action==='approve'?'approved':'rejected';write(r);},
  publicRecord(record){if(!record||record.status!=='approved')return null;const today=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Puerto_Rico',year:'numeric',month:'2-digit',day:'2-digit'}).format(now());return {slug:record.slug,...record.profile,calendar:publicCalendar(record,today)};}
 };
}
function ics(record,entry){
 const escape=v=>String(v||'').replace(/\\/g,'\\\\').replace(/\r?\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');
 const compact=v=>v.replace(/-/g,''),next=new Date(Date.parse(entry.endDate+'T12:00:00Z')+86400000).toISOString().slice(0,10),url='https://www.masboricuaqueunmofongo.com/talento-boricua/'+record.slug;
 const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Planeta Boricua//Talento Boricua//ES','CALSCALE:GREGORIAN','BEGIN:VEVENT',`UID:${entry.id}@masboricuaqueunmofongo.com`,`DTSTAMP:${compact(entry.startDate)}T120000Z`,`DTSTART;VALUE=DATE:${compact(entry.startDate)}`,`DTEND;VALUE=DATE:${compact(next)}`,`SUMMARY:${escape(entry.title+' · '+record.name)}`,`DESCRIPTION:${escape(`Horario anunciado: ${entry.startTime||'Por confirmar'}${entry.endTime?'–'+entry.endTime:''} (${entry.timezone}). Recordatorio de fecha; confirma el horario con el artista.\n${url}`)}`,`LOCATION:${escape([entry.venue,entry.city].filter(Boolean).join(', '))}`,`URL:${url}`,'END:VEVENT','END:VCALENDAR'];
 return lines.map(line=>{const parts=[];let rest=line;while(Buffer.byteLength(rest)>73){let size=65;while(Buffer.byteLength(rest.slice(0,size))>73)size--;parts.push(rest.slice(0,size));rest=' '+rest.slice(size);}parts.push(rest);return parts.join('\r\n');}).join('\r\n')+'\r\n';
}
module.exports={isPrivatePath,POLICY_VERSION,CATEGORIES,profile,acceptance,calendarEntry,publicCalendar,createStore,token,verify,videoId,ics,email};
