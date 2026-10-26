'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const RATINGS={'':'Sin completar',destaco:'Destacó',cumplio:'Cumplió',mejorar:'Podría mejorar',no_observado:'No observado'};
const SECTIONS=[
 ['llegada','Llegada y bienvenida','Facilidad para encontrarlo, estacionamiento, saludo y orientación al llegar.'],
 ['ambiente','Ambiente y comodidad','Vistas, comodidad, temperatura y volumen. ¿Se podía conversar?'],
 ['limpieza','Limpieza visible','Mesa, vasos, cubiertos y baño, solo si lo utilizaste. No inferir condiciones de cocina.'],
 ['servicio','Servicio','Amabilidad, explicación del menú, atención y respuesta a solicitudes.'],
 ['comida','Comida y bebidas','Qué pidieron, presentación, temperatura percibida, sabor y correspondencia con el menú.'],
 ['ritmo','Ritmo de la visita','Esperas y contexto de ocupación. Distinguir tiempos medidos de estimaciones.'],
 ['cuenta','Cuenta y despedida','Exactitud, claridad de cargos, propina y despedida.'],
 ['general','Experiencia general','¿Para quién funciona? Parejas, familias, grupos o una salida tranquila.']
];
const FIELDS={business:['Establecimiento',160],location:['Ubicación / dirección',300],visitDate:['Fecha de visita',10],arrival:['Hora de llegada',5],departure:['Hora de salida',5],observers:['Observadores',160],occupancy:['Ocupación observada',200],awareness:['¿Quién sabía de la cobertura o evaluación?',400],scope:['Qué se acordó evaluar / restricciones de fotografías',1800],courtesy:['Cortesía, descuento o atención especial recibida',1000],ordered:['Platos y bebidas pedidos',1800],timings:['Tiempos: indica cuáles mediste y cuáles estimaste',1800],total:['Total pagado (moneda e impuestos)',100],tip:['Propina (indica si está incluida en el total)',100],website:['Web / contacto para verificar antes de publicar',500],best:['Lo mejor de la visita',1800],improve:['Qué podría mejorar: hechos concretos',1800],useful:['Qué debería saber alguien antes de ir',1800],returnVisit:['¿Volveríamos por nuestra cuenta? ¿Por qué?',1200],story:['Qué hace que este lugar merezca una historia',1800],ivanNotes:['Perspectiva de Iván',1800],tereNotes:['Perspectiva de Tere',1800]};
function fail(message,status=400){const e=Error(message);e.status=status;throw e;}
function clean(v,max){if(typeof v!=='string'||v.length>max||/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(v))fail('Texto inválido o demasiado largo.');return v.trim();}
function normalize(input){
 if(!input||typeof input!=='object'||Array.isArray(input))fail('Datos inválidos.');
 const data={};for(const [key,[,max]] of Object.entries(FIELDS))data[key]=clean(input[key]??'',max);
 if(!data.business)fail('Escribe el nombre del establecimiento.');
 if(data.visitDate&&(!/^20\d\d-\d\d-\d\d$/.test(data.visitDate)||!Number.isFinite(Date.parse(data.visitDate+'T12:00:00Z'))||new Date(data.visitDate+'T12:00:00Z').toISOString().slice(0,10)!==data.visitDate))fail('Fecha inválida.');
 for(const key of ['arrival','departure'])if(data[key]&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(data[key]))fail('Hora inválida.');
 if(!['editorial','privada'].includes(input.kind)||!['borrador','completa'].includes(input.status))fail('Tipo o estado inválido.');
 data.kind=input.kind;data.status=input.status;data.sections={};
 for(const [key] of SECTIONS){const value=input.sections?.[key]??{};if(!Object.hasOwn(RATINGS,value.rating??''))fail('Valoración inválida.');data.sections[key]={rating:value.rating??'',notes:clean(value.notes??'',2000)};}
 return data;
}
function createStore(directory='/data/pb-visit-guide'){
 const valid=id=>{if(!/^VG-[a-f0-9]{24}$/.test(id))fail('Visita no encontrada.',404);return id;};
 const folder=id=>path.join(directory,valid(id));
 const get=id=>{try{return JSON.parse(fs.readFileSync(path.join(folder(id),'record.json'),'utf8'));}catch(e){if(e.code==='ENOENT')return null;throw e;}};
 const persist=r=>{const dir=folder(r.id);fs.mkdirSync(dir,{recursive:true,mode:0o700});const tmp=path.join(dir,crypto.randomBytes(10).toString('hex')+'.tmp');try{fs.writeFileSync(tmp,JSON.stringify(r,null,2),{mode:0o600,flag:'wx'});fs.renameSync(tmp,path.join(dir,'record.json'));}finally{if(fs.existsSync(tmp))fs.unlinkSync(tmp);}};
 const requireRecord=id=>{const r=get(id);if(!r)fail('Visita no encontrada.',404);return r;};
 function save(input,id){const data=normalize(input);const old=id?requireRecord(id):null;if(old&&input.revision!==old.revision)fail('Esta visita cambió en otra pestaña. Recarga antes de guardar para no sobrescribirla.',409);const now=new Date().toISOString();const r={id:old?.id||'VG-'+crypto.randomBytes(12).toString('hex'),createdAt:old?.createdAt||now,updatedAt:now,revision:(old?.revision||0)+1,...data,attachments:old?.attachments||[]};persist(r);return r;}
 async function addImage(id,{data,caption='',kind='foto'}){
  if(typeof data!=='string'||data.length>8500000)fail('La imagen supera el límite de 6 MB.');
  if(!['foto','recibo'].includes(kind))fail('Tipo de imagen inválido.');caption=clean(caption,350);
  const match=/^data:image\/(?:jpeg|png|webp);base64,([a-zA-Z0-9+/=]+)$/.exec(data);if(!match)fail('Usa una imagen JPG, PNG o WebP.');
  const bytes=Buffer.from(match[1],'base64');if(bytes.length>6*1024*1024)fail('La imagen supera el límite de 6 MB.');
  const sharp=require('sharp');let converted;
  try{converted=await sharp(bytes,{limitInputPixels:25000000,animated:false}).rotate().resize({width:1800,height:1800,fit:'inside',withoutEnlargement:true}).jpeg({quality:85}).toBuffer();}catch(_){fail('No pudimos leer esta imagen. Usa JPG, PNG o WebP.');}
  // Re-read after asynchronous conversion: do not discard other saves or attachments.
  const r=requireRecord(id);if(r.attachments.length>=12)fail('Máximo 12 imágenes por visita.');
  const aid=crypto.randomBytes(12).toString('hex'),file=path.join(folder(id),aid+'.jpg');fs.writeFileSync(file,converted,{mode:0o600,flag:'wx'});
  r.attachments.push({id:aid,kind,caption,bytes:converted.length});r.revision++;r.updatedAt=new Date().toISOString();try{persist(r);}catch(e){fs.unlinkSync(file);throw e;}return r;
 }
 function removeImage(id,aid){if(!/^[a-f0-9]{24}$/.test(aid))fail('Imagen no encontrada.',404);const r=requireRecord(id),i=r.attachments.findIndex(a=>a.id===aid);if(i<0)fail('Imagen no encontrada.',404);r.attachments.splice(i,1);r.revision++;r.updatedAt=new Date().toISOString();persist(r);fs.rmSync(path.join(folder(id),aid+'.jpg'),{force:true});return r;}
 function imagePath(id,aid){const r=requireRecord(id);if(!/^[a-f0-9]{24}$/.test(aid)||!r.attachments.some(a=>a.id===aid))fail('Imagen no encontrada.',404);return path.join(folder(id),aid+'.jpg');}
 function all(){fs.mkdirSync(directory,{recursive:true,mode:0o700});return fs.readdirSync(directory).filter(x=>/^VG-[a-f0-9]{24}$/.test(x)).map(get).filter(Boolean).sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt));}
 return {get,save,addImage,removeImage,imagePath,all};
}
function pdf(record,store){
 const PDFDocument=require('pdfkit'),doc=new PDFDocument({size:'LETTER',margin:45,info:{Title:'Expediente privado · '+record.business,Author:'Planeta Boricua'}}),chunks=[];
 const result=new Promise((resolve,reject)=>{doc.on('data',c=>chunks.push(c));doc.on('end',()=>resolve(Buffer.concat(chunks)));doc.on('error',reject);});
 doc.registerFont('VisitRegular',path.join(__dirname,'../assets/visit-fonts/regular.ttf'));doc.registerFont('VisitBold',path.join(__dirname,'../assets/visit-fonts/bold.ttf'));
 const text=(value,size=11)=>doc.font('VisitRegular').fontSize(size).fillColor('#18364b').text(value||'Sin completar',{lineGap:3});
 const title=value=>{if(doc.y>680)doc.addPage();doc.moveDown(.6);doc.font('VisitBold').fontSize(14).fillColor('#076e72').text(value);doc.moveDown(.3);};
 doc.font('VisitBold').fontSize(22).text('Expediente de visita');text('Planeta Boricua · Turistiando con Iván Soto');text('PRIVADO · '+(record.kind==='privada'?'Evaluación confidencial':'Visita editorial')+' · '+record.status,10);text(record.id+' · Revisión '+record.revision,9);
 text('Observaciones originales para redactar posteriormente. No es un informe final ni se publica automáticamente.',10);
 title('Datos y observaciones');
 for(const [key,[label]] of Object.entries(FIELDS)){if(!record[key])continue;if(doc.y>660)doc.addPage();doc.font('VisitBold').fontSize(11).text(label);text(record[key]);doc.moveDown(.5);}
 title('Guía de evaluación');for(const [key,label,hint] of SECTIONS){const item=record.sections[key];title(label+' — '+RATINGS[item.rating]);text(hint,9);text(item.notes||'Sin observaciones registradas.');}
 title('Información pendiente');const missing=[];for(const key of ['visitDate','location','ordered','best','improve','returnVisit'])if(!record[key])missing.push(FIELDS[key][0]);for(const [key,label] of SECTIONS)if(!record.sections[key].rating)missing.push(label);text(missing.length?missing.join('; '):'No faltan campos básicos. Confirmar los datos comerciales antes de publicar.');
 text('Las valoraciones reflejan esta visita. Un recibo respalda el consumo, no demuestra por sí solo la calidad del servicio. Distinguir hechos, estimaciones y opiniones.',10);
 for(const a of record.attachments){doc.addPage();title(a.kind==='recibo'?'Recibo de la visita':'Fotografía');text(a.caption||'Sin descripción.',11);const y=doc.y+12;try{doc.image(store.imagePath(record.id,a.id),45,y,{fit:[522,Math.max(100,720-y)],align:'center',valign:'top'});}catch(_){text('Imagen no disponible.');}}
 doc.end();return result;
}
module.exports={FIELDS,SECTIONS,RATINGS,normalize,createStore,pdf};
