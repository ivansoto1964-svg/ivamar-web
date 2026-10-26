'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const VERSION = '2026-10-26.5';
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const COPY = {
 en: {
  title:'Let’s discover your place', eyebrow:'A personal introduction',
  intro:'My name is Iván Soto. Planeta Boricua — Más Boricua Que Un Mofongo is a Spanish-language cultural website for Puerto Ricans on the island and throughout the United States. In Turistiando con Iván Soto, I share personal travel, dining and local experiences, along with practical details to help readers discover places like yours.',
  visit:'I am visiting as a customer and am prepared to pay for my visit. No interview is needed. With your permission, I would like to photograph the food, premises and views, and share my experience in Spanish on Planeta Boricua and its social media. If your establishment offers media discounts or hosted experiences, we would be happy to hear about them; they are entirely optional.',
  distribution:'We also share our published stories on our social media and in Puerto Rican community groups, some with thousands of members, where group rules allow. This gives readers more opportunities to discover your establishment. Group membership does not represent guaranteed views, reach, visits or sales.',
  discretionTitle:'Discretion during our visit',
  discretion:'We kindly ask the manager or person in charge to handle our visit discreetly and, where possible, avoid announcing the coverage to the service staff. We would like to experience the usual service any customer would receive, without special treatment. Please inform staff as needed to coordinate photography or follow the establishment’s policies.',
  policy:'There is no charge for this editorial coverage. Any discount, complimentary meal, accommodation or service is entirely voluntary and is not required for coverage. It does not guarantee a favorable review or grant advance approval of the content. Any benefit related to the coverage will be clearly disclosed, following U.S. Federal Trade Commission (FTC) guidance.',
  permission:'For the visit and location identified below, I authorize Iván Soto / Planeta Boricua to take photographs of the food, premises and views in areas permitted by the establishment, and to publish those photographs with editorial coverage on Planeta Boricua and its social media, subject to the restrictions below. This permission does not include identifiable guests or staff without their separate permission, private or restricted areas, interviews, or use in unrelated advertising. It does not grant editorial approval or transfer ownership of our brand.',
  authority:'I confirm that I am authorized to give this permission on behalf of this establishment. I have read and accept the permission and editorial transparency terms above.',
  privacy:'Your name, role, establishment, visit details, email, restrictions and the accepted text will be stored privately by Planeta Boricua as a record of permission. A copy will be emailed to you and to Planeta Boricua. This does not subscribe you to marketing. For questions, corrections or requests concerning future photography or use, contact masboricuaqueunmofongo@gmail.com. This record documents your declaration; it does not independently verify your identity or authority.',
  copy:'As soon as the article is published, we will email you a link to read and share it.',
  form:'Permission for this visit', business:'Establishment name', location:'Location / address', visitDate:'Visit date', name:'Your full name', role:'Your role', email:'Email for your copy', restrictions:'Restrictions or areas to avoid (optional)', consent:'Permission', approve:'Approve & save permission', saving:'Saving permission…', success:'Permission recorded', reference:'Reference', saved:'Recorded', pending:'The permission is saved. One or more email copies could not yet be accepted for sending. Planeta Boricua can retry them from its private panel.', accepted:'Both email copies were accepted by the email service. Check your inbox and spam folder; acceptance is not proof of delivery.', emailLabel:'Email copies', venue:'Establishment', pb:'Planeta Boricua', print:'Print / save this receipt as PDF', error:'We could not save your permission. Nothing is confirmed. Please try again.', expired:'The form expired. Reload this page before approving.', timezone:'Time zone', statusAccepted:'Accepted for sending', statusFailed:'Pending / retry needed', statusSending:'Pending', review:'Please review the terms before approving.', language:'Español', privacyTitle:'Your information', policyTitle:'Transparency & independence', allowTitle:'What you authorize'
 },
 es: {
  title:'Vamos a conocer tu espacio', eyebrow:'Una presentación personal',
  intro:'Soy Iván Soto. Planeta Boricua — Más Boricua Que Un Mofongo es un portal cultural en español para los puertorriqueños en la Isla y en Estados Unidos. En Turistiando con Iván Soto comparto experiencias personales de viajes, gastronomía y lugares, junto con información práctica para que nuestros lectores puedan descubrir espacios como el tuyo.',
  visit:'Te visito como cliente y estoy preparado para pagar mi visita. No hace falta una entrevista. Con tu permiso, quisiera fotografiar la comida, el establecimiento y las vistas, y compartir mi experiencia en español en Planeta Boricua y sus redes sociales. Si el establecimiento ofrece descuentos o experiencias de cortesía para medios, agradeceremos conocer esas opciones; son completamente voluntarias.',
  distribution:'Además del portal, compartimos nuestras publicaciones en nuestras redes sociales y en grupos de comunidades boricuas, algunos con miles de miembros, cuando sus reglas lo permiten. Esto ofrece más oportunidades para que los lectores descubran tu establecimiento. La cantidad de miembros de un grupo no equivale a vistas ni garantiza alcance, visitas o ventas.',
  discretionTitle:'Discreción durante la visita',
  discretion:'Agradecemos que el gerente o encargado maneje nuestra visita con discreción y, cuando sea posible, evite anunciar la cobertura al personal de servicio. Queremos conocer la experiencia habitual de cualquier cliente, sin atenciones especiales. Esto no impide comunicar al personal lo necesario para coordinar las fotografías o respetar las normas del establecimiento.',
  policy:'Esta cobertura editorial no tiene costo. Cualquier descuento, comida, estadía o servicio de cortesía es voluntario y no es condición para la cobertura. No garantiza una opinión favorable ni concede aprobación previa del contenido. Cualquier beneficio relacionado con la cobertura se indicará claramente, siguiendo las orientaciones de la Comisión Federal de Comercio de Estados Unidos (FTC).',
  permission:'Para la visita y ubicación identificadas abajo, autorizo a Iván Soto / Planeta Boricua a tomar fotografías de la comida, el establecimiento y las vistas en las áreas permitidas por el negocio, y a publicarlas junto con su cobertura editorial en Planeta Boricua y sus redes sociales, sujeto a las restricciones indicadas abajo. Este permiso no incluye clientes o empleados identificables sin su autorización separada, áreas privadas o restringidas, entrevistas ni uso en publicidad ajena a esta cobertura. No concede aprobación editorial ni transfiere la propiedad de nuestra marca.',
  authority:'Confirmo que estoy autorizado para conceder este permiso en nombre del establecimiento. He leído y acepto el permiso y las condiciones de transparencia editorial anteriores.',
  privacy:'Planeta Boricua guardará de forma privada tu nombre, cargo, negocio, detalles de la visita, email, restricciones y texto aceptado como registro del permiso. Se enviará una copia a tu correo y otra a Planeta Boricua. Esto no te suscribe a publicidad. Para preguntas, correcciones o solicitudes sobre futuras fotografías o usos, escribe a masboricuaqueunmofongo@gmail.com. Este registro documenta tu declaración; no verifica de forma independiente tu identidad o facultad para autorizar.',
  copy:'Tan pronto se publique el artículo, te enviaremos un email con el enlace para leerlo y compartirlo.',
  form:'Permiso para esta visita', business:'Nombre del establecimiento', location:'Ubicación / dirección', visitDate:'Fecha de la visita', name:'Tu nombre completo', role:'Tu cargo', email:'Email para recibir tu copia', restrictions:'Restricciones o áreas que debemos evitar (opcional)', consent:'Permiso', approve:'Aprobar y guardar permiso', saving:'Guardando permiso…', success:'Autorización registrada', reference:'Referencia', saved:'Registro', pending:'El permiso quedó guardado. Una o ambas copias por correo están pendientes de envío. Planeta Boricua puede reintentarlo desde su panel privado.', accepted:'El servicio de correo aceptó ambas copias para envío. Revisa tu buzón y Spam; la aceptación no confirma la entrega.', emailLabel:'Copias por correo', venue:'Establecimiento', pb:'Planeta Boricua', print:'Imprimir / guardar comprobante en PDF', error:'No pudimos guardar el permiso. No hay confirmación. Intenta nuevamente.', expired:'El formulario venció. Recarga esta página antes de aprobar.', timezone:'Zona horaria', statusAccepted:'Aceptado para envío', statusFailed:'Pendiente / requiere reenvío', statusSending:'Pendiente', review:'Revisa las condiciones antes de aprobar.', language:'English', privacyTitle:'Tus datos', policyTitle:'Transparencia e independencia', allowTitle:'Lo que autorizas'
 }
};
function fail(message){const error=new Error(message);error.validation=true;throw error;}
function clean(value,max,required=true,multiline=false){if(typeof value!=='string'||value.length>max)fail('Invalid field / Campo inválido');const out=value.trim();if((required&&!out)||/[\u0000-\u001f\u007f]/.test((multiline?out.replace(/\n/g,''):out)))fail('Invalid field / Campo inválido');return out;}
function validate(input){
 if(input.consent!==true||!COPY[input.lang]||input.version!==VERSION||input.website)fail('Review and accept the terms / Revisa y acepta las condiciones');
 const data={lang:input.lang,business:clean(input.business,160),location:clean(input.location,240),visitDate:clean(input.visitDate,10),name:clean(input.name,120),role:clean(input.role,100),email:clean(input.email,254).toLowerCase(),restrictions:clean(input.restrictions||'',1500,false,true)};
 if(!/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(data.email)||/[\r\n]/.test(data.email))fail('Invalid email / Email inválido');
 if(!/^20\d{2}-\d{2}-\d{2}$/.test(data.visitDate)||!Number.isFinite(Date.parse(data.visitDate+'T12:00:00Z'))||new Date(data.visitDate+'T12:00:00Z').toISOString().slice(0,10)!==data.visitDate)fail('Invalid date / Fecha inválida');
 data.consent=true;data.version=VERSION;return data;
}
function ticket(secret,now=Date.now()){const payload=Buffer.from(JSON.stringify({nonce:crypto.randomBytes(24).toString('hex'),expires:now+4*3600000})).toString('base64url');return payload+'.'+crypto.createHmac('sha256',secret).update('pb-travel:'+payload).digest('hex');}
function verifyTicket(secret,value,now=Date.now()){
 try{if(!secret||typeof value!=='string'||value.length>500)return null;const [p,s]=value.split('.');const expected=crypto.createHmac('sha256',secret).update('pb-travel:'+p).digest('hex');if(!s||s.length!==expected.length||!crypto.timingSafeEqual(Buffer.from(s),Buffer.from(expected)))return null;const claims=JSON.parse(Buffer.from(p,'base64url').toString());return /^[a-f0-9]{48}$/.test(claims.nonce)&&claims.expires>now?claims:null;}catch(_){return null;}
}
function snapshot(lang){const c=COPY[lang];return {version:VERSION,language:lang,introduction:c.intro,visit:c.visit,distribution:c.distribution,discretion:c.discretion,transparency:c.policy,permission:c.permission,authority:c.authority,privacy:c.privacy,copyOffer:c.copy};}
function createStore(directory){
 const file=id=>{if(!/^TP-[a-f0-9]{32}$/.test(id))throw Error('Invalid reference');return path.join(directory,id+'.json');};
 function save(record){fs.mkdirSync(directory,{recursive:true,mode:0o700});const target=file(record.id),tmp=target+'.'+crypto.randomBytes(8).toString('hex')+'.tmp';try{fs.writeFileSync(tmp,JSON.stringify(record,null,2),{mode:0o600,flag:'wx'});fs.renameSync(tmp,target);}finally{if(fs.existsSync(tmp))fs.unlinkSync(tmp);}}
 function get(id){try{return JSON.parse(fs.readFileSync(file(id),'utf8'));}catch(error){if(error.code==='ENOENT')return null;throw error;}}
 function create(input,nonce,now=new Date()){
  const data=validate(input),id='TP-'+hash('permission:'+nonce).slice(0,32),payloadHash=hash(JSON.stringify(data)),existing=get(id);
  if(existing){if(existing.payloadHash!==payloadHash)fail('This permission was already saved. Reload for a different visit / Este permiso ya fue guardado. Recarga para otra visita');return {record:existing,created:false};}
  const acceptedText=snapshot(data.lang),record={id,...data,acceptedAt:now.toISOString(),recordedTimeZone:'UTC',displayTimeZone:'America/New_York',acceptedText,textSha256:hash(JSON.stringify(acceptedText)),payloadHash,identityVerified:false,mail:{venue:{status:'pending'},pb:{status:'pending'}}};
  save(record);return {record,created:true};
 }
 return {save,get,create,all:()=>{fs.mkdirSync(directory,{recursive:true,mode:0o700});return fs.readdirSync(directory).filter(n=>/^TP-[a-f0-9]{32}\.json$/.test(n)).map(n=>get(n.slice(0,-5))).sort((a,b)=>b.acceptedAt.localeCompare(a.acceptedAt));}};
}
function createMailer({store,send,pbEmail,from}){
 const inFlight=new Map();
 function deliver(id){if(inFlight.has(id))return inFlight.get(id);const work=(async()=>{
  const r=store.get(id);if(!r)throw Error('Not found');
  const {receiptHtml}=require('../views/planetaboricua/turistiando-permiso');
  for(const key of ['venue','pb']){
   if(r.mail[key].status==='accepted')continue;
   r.mail[key]={status:'pending',attemptedAt:new Date().toISOString()};store.save(r);
   try{let timer;const result=await Promise.race([send({from,to:key==='venue'?r.email:pbEmail,replyTo:pbEmail,subject:`Turistiando · ${r.id} · ${r.business}`,html:receiptHtml(r),text:JSON.stringify({reference:r.id,visit:r.visitDate,business:r.business,location:r.location,approvedBy:r.name,role:r.role,restrictions:r.restrictions,acceptedAt:r.acceptedAt,...r.acceptedText},null,2)}, {idempotencyKey:`pb-travel-${r.id}-${key}`}),new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('Email acceptance timeout')),12000);timer.unref?.();})]).finally(()=>clearTimeout(timer));if(result?.error||!result?.data?.id)throw Error('Provider did not confirm acceptance');r.mail[key]={status:'accepted',acceptedAt:new Date().toISOString(),providerId:result.data.id};}
   catch(_){r.mail[key]={status:'failed',attemptedAt:new Date().toISOString()};}
   store.save(r);
  }
  return r;
 })().finally(()=>inFlight.delete(id));inFlight.set(id,work);return work;}
 return {deliver};
}
module.exports={COPY,VERSION,hash,validate,ticket,verifyTicket,snapshot,createStore,createMailer};
