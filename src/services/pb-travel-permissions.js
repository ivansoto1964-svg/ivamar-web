'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const VERSION = '2026-10-26.6';
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const COPY = {
  "en": {
    "title": "Let’s discover your establishment",
    "eyebrow": "A personal introduction",
    "intro": "I’m Iván Soto, a communicator with experience in radio, television and tourism. Through Turistiando con Iván Soto on Planeta Boricua, I share experiences and places with our Puerto Rican community in Spanish.",
    "visit": "We would love to discover your establishment and share our experience in an article featuring our own photographs and helpful information for readers who may wish to visit.",
    "distribution": "The article on our social media and in Puerto Rican community groups.",
    "discretionTitle": "About our visit",
    "discretion": "We would like to enjoy your establishment and experience the usual service without interrupting operations or requesting special treatment. We will not conduct interviews or photograph employees, the kitchen, or private or prohibited areas. We will avoid including identifiable customers or other people in photographs. We appreciate the manager handling our visit discreetly. Staff may be informed as needed to facilitate photography and follow the establishment’s policies.",
    "policy": "There is no charge for this editorial coverage. Any invitation, discount or full or partial courtesy is welcome and appreciated, but completely optional and will be arranged with the person in charge beforehand. Permission for photography and publication does not imply an offer of complimentary services. We will share our experience honestly. Courtesies do not guarantee a favorable review or grant advance approval of the content. Any benefit received in connection with this coverage will be clearly disclosed in the article as part of our commitment to transparency with our readers.",
    "permission": "For the visit and location identified in this form, I authorize Iván Soto / Planeta Boricua to photograph dishes, the establishment and its views in permitted areas and use those photographs in the article and in sharing that coverage on Planeta Boricua’s social media, subject to the restrictions provided. There will be no interviews or photographs of employees, the kitchen, or private or prohibited areas. Identifiable customers or other people will be avoided in photographs. This permission does not include future visits or advertising uses unrelated to this publication, grant editorial approval, or transfer ownership of our brand.",
    "authority": "I confirm that I am authorized to give this permission on behalf of the establishment and accept the conditions for the visit, photography and publication described above.",
    "privacy": "We will privately store the form details and accepted text as a record of permission, including the date and time of acceptance. A copy will be emailed to the address provided and to Planeta Boricua. Your email will not be published or subscribed to marketing. We will use it to manage this permission and send you the published article link. For questions or corrections: masboricuaqueunmofongo@gmail.com.",
    "copy": "As soon as we publish the article, we will email you the link so you can share it too.",
    "form": "Permission for this visit",
    "business": "Establishment name",
    "location": "Location / address",
    "visitDate": "Visit date",
    "name": "Your full name",
    "role": "Your role",
    "email": "Email for your copy",
    "restrictions": "Restrictions or areas to avoid (optional)",
    "consent": "Permission",
    "approve": "Authorize this visit",
    "saving": "Saving permission…",
    "success": "Permission recorded",
    "reference": "Reference",
    "saved": "Recorded",
    "pending": "The permission is saved. One or more email copies could not yet be accepted for sending. Planeta Boricua can retry them from its private panel.",
    "accepted": "Both email copies were accepted by the email service. Check your inbox and spam folder; acceptance is not proof of delivery.",
    "emailLabel": "Email copies",
    "venue": "Establishment",
    "pb": "Planeta Boricua",
    "print": "Print / save this receipt as PDF",
    "error": "We could not save your permission. Nothing is confirmed. Please try again.",
    "expired": "The form expired. Reload this page before approving.",
    "timezone": "Time zone",
    "statusAccepted": "Accepted for sending",
    "statusFailed": "Pending / retry needed",
    "statusSending": "Pending",
    "review": "The manager or authorized representative may record permission and specify any additional restrictions.",
    "language": "Español",
    "privacyTitle": "Your information",
    "policyTitle": "Collaborations",
    "allowTitle": "What you authorize",
    "benefitsTitle": "What will we share?",
    "benefits": [
      "Our experience with the food, atmosphere and location.",
      "Photographs of the dishes, establishment and views, with your permission.",
      "Your address, website and contact options.",
      "The article on our social media and in Puerto Rican community groups."
    ],
    "portalLabel": "Discover Planeta Boricua",
    "corrections": "You may contact us to correct factual details such as your address, opening hours or contact information.",
    "thanks": "Thank you for welcoming us and letting us discover your establishment."
  },
  "es": {
    "title": "Conozcamos tu establecimiento",
    "eyebrow": "Una presentación personal",
    "intro": "Soy Iván Soto, comunicador con experiencia en radio, televisión y turismo. En Turistiando con Iván Soto, dentro de Planeta Boricua, comparto experiencias y lugares con nuestra comunidad puertorriqueña en español.",
    "visit": "Nos gustaría conocer tu establecimiento y contar nuestra experiencia mediante una publicación con fotografías propias e información útil para quienes deseen visitarlo.",
    "distribution": "La publicación en nuestras redes sociales y en grupos de comunidades boricuas.",
    "discretionTitle": "Sobre nuestra visita",
    "discretion": "Queremos disfrutar del lugar y conocer el servicio habitual, sin interrumpir las operaciones ni solicitar atención especial. No realizaremos entrevistas ni tomaremos fotografías de empleados, la cocina o zonas privadas o no permitidas. Evitaremos incluir clientes u otras personas identificables en las imágenes. Agradecemos que el gerente o encargado maneje nuestra visita con discreción. Puede informar al personal lo necesario para facilitar las fotografías y respetar las normas del establecimiento.",
    "policy": "Esta cobertura editorial no tiene costo. Cualquier invitación, descuento o cortesía, total o parcial, será bienvenida y agradecida, pero es completamente opcional y se coordinará previamente con el encargado. Autorizar las fotografías y la publicación no implica ofrecer una cortesía. Compartiremos nuestra experiencia con honestidad. Las cortesías no garantizan una evaluación favorable ni conceden aprobación previa del contenido. Cualquier beneficio recibido relacionado con esta cobertura se indicará claramente en la publicación, como parte de nuestro compromiso de transparencia con los lectores.",
    "permission": "Para la visita y ubicación indicadas en este formulario, autorizo a Iván Soto / Planeta Boricua a tomar fotografías de los platos, el establecimiento y sus vistas en las áreas permitidas, y a utilizarlas en el artículo y en la difusión de esa cobertura en las redes de Planeta Boricua, sujeto a las restricciones indicadas. No se realizarán entrevistas ni se tomarán fotografías de empleados, la cocina o zonas privadas o no permitidas. Se evitará incluir clientes u otras personas identificables en las imágenes. Esta autorización no incluye futuras visitas ni usos publicitarios ajenos a esta publicación, no concede aprobación editorial ni transfiere la propiedad de nuestra marca.",
    "authority": "Confirmo que estoy autorizado para conceder este permiso en nombre del establecimiento y acepto las condiciones de la visita, las fotografías y su publicación descritas arriba.",
    "privacy": "Guardaremos de forma privada los datos del formulario y el texto aceptado como registro de la autorización, con la fecha y hora de aceptación. Enviaremos una copia al correo indicado y otra a Planeta Boricua. Tu correo no se publicará ni se utilizará para suscribirte a promociones. Lo usaremos para gestionar esta autorización y enviarte el enlace del artículo publicado. Para preguntas o correcciones: masboricuaqueunmofongo@gmail.com.",
    "copy": "Tan pronto publiquemos el artículo, te enviaremos un email con el enlace para que también puedas compartirlo.",
    "form": "Autorización para esta visita",
    "business": "Nombre del establecimiento",
    "location": "Ubicación / dirección",
    "visitDate": "Fecha de la visita",
    "name": "Tu nombre completo",
    "role": "Tu cargo",
    "email": "Email para recibir tu copia",
    "restrictions": "Restricciones o áreas que debemos evitar (opcional)",
    "consent": "Permiso",
    "approve": "Autorizar esta visita",
    "saving": "Guardando permiso…",
    "success": "Autorización registrada",
    "reference": "Referencia",
    "saved": "Registro",
    "pending": "El permiso quedó guardado. Una o ambas copias por correo están pendientes de envío. Planeta Boricua puede reintentarlo desde su panel privado.",
    "accepted": "El servicio de correo aceptó ambas copias para envío. Revisa tu buzón y Spam; la aceptación no confirma la entrega.",
    "emailLabel": "Copias por correo",
    "venue": "Establecimiento",
    "pb": "Planeta Boricua",
    "print": "Imprimir / guardar comprobante en PDF",
    "error": "No pudimos guardar el permiso. No hay confirmación. Intenta nuevamente.",
    "expired": "El formulario venció. Recarga esta página antes de aprobar.",
    "timezone": "Zona horaria",
    "statusAccepted": "Aceptado para envío",
    "statusFailed": "Pendiente / requiere reenvío",
    "statusSending": "Pendiente",
    "review": "El gerente o representante autorizado puede registrar el permiso e indicar cualquier restricción adicional.",
    "language": "English",
    "privacyTitle": "Tu información",
    "policyTitle": "Colaboraciones",
    "allowTitle": "Lo que autorizas",
    "benefitsTitle": "¿Qué compartiremos?",
    "benefits": [
      "Nuestra experiencia con la comida, el ambiente y el lugar.",
      "Fotografías de los platos, el establecimiento y sus vistas, con tu autorización.",
      "Dirección, sitio web y opciones de contacto.",
      "La publicación en nuestras redes sociales y en grupos de comunidades boricuas."
    ],
    "portalLabel": "Conoce Planeta Boricua",
    "corrections": "Puedes comunicarnos cualquier corrección de datos objetivos, como dirección, horarios o información de contacto.",
    "thanks": "Gracias por recibirnos y permitirnos conocer su espacio."
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
function snapshot(lang){const c=COPY[lang];return {version:VERSION,language:lang,introduction:c.intro,visit:c.visit,benefits:c.benefits,corrections:c.corrections,distribution:c.distribution,discretion:c.discretion,transparency:c.policy,permission:c.permission,authority:c.authority,privacy:c.privacy,copyOffer:c.copy};}
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
