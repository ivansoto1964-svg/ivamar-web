'use strict';
const fs=require('node:fs'),path=require('node:path'),express=require('express'),crypto=require('node:crypto');
const sanitizeHtml=require('sanitize-html');
const siteAnalytics=require('./pb-site-analytics');
const caribexMetrics=require('../../data/pb-caribex-metrics.json');
const caribexOriginals=new Map(require('../../data/pb-turistiando/caribex.json').map(post=>[post.sourceId,post]));
const caribexPosts=require('../../data/pb-turistiando/archivo-caribex.json');
const caribexRoutes=new Map(caribexPosts.map(post=>[post.originalUrl,`/turistiando/${post.id}`]));
const ROOT=process.env.PB_TOURISM_DATA_DIR||'/data/pb-turismo';const SEED_DIR=path.join(__dirname,'../../data/pb-turistiando');
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const valid=id=>/^(caribex|viaje)-[a-f0-9]{16}$/.test(id);
function init(){
  fs.mkdirSync(ROOT,{recursive:true,mode:0o700});
  for(const filename of fs.readdirSync(SEED_DIR).filter(name=>name.endsWith('.json')).sort()){
    const posts=JSON.parse(fs.readFileSync(path.join(SEED_DIR,filename),'utf8'));
    for(const post of posts){
      const file=path.join(ROOT,post.id+'.json');
      try{fs.writeFileSync(file,JSON.stringify(post,null,2),{flag:'wx',mode:0o600});}
      catch(error){if(error.code!=='EEXIST')throw error;}
    }
  }
}
function get(id){if(!valid(id))return null;try{return JSON.parse(fs.readFileSync(path.join(ROOT,id+'.json'),'utf8'));}catch(e){if(e.code==='ENOENT')return null;throw e;}}
function all(){init();return fs.readdirSync(ROOT).filter(x=>/^(caribex|viaje)-[a-f0-9]{16}\.json$/.test(x)).map(x=>get(x.slice(0,-5))).filter(Boolean).sort((a,b)=>String(b.originalDate).localeCompare(String(a.originalDate)));}
function save(p){if(!valid(p.id))throw Error('Identificador inválido');init();const f=path.join(ROOT,p.id+'.json'),tmp=f+'.'+crypto.randomBytes(8).toString('hex')+'.tmp';try{fs.writeFileSync(tmp,JSON.stringify(p,null,2),{flag:'wx',mode:0o600});fs.renameSync(tmp,f);}finally{fs.rmSync(tmp,{force:true});}}
function layout(title,body){return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} | Planeta Boricua</title><meta name="description" content="Turistiando con Iván Soto: experiencias, destinos e historias de viaje."><style>body{font:17px/1.6 system-ui;color:#19394c;background:#f8f9f6;margin:0}main{max-width:850px;padding:25px;margin:auto}a{color:#08757b}article,.card{background:white;border:1px solid #ddd;border-radius:12px;padding:22px;margin:14px 0}input,textarea,select{box-sizing:border-box;display:block;width:100%;font:16px system-ui;padding:12px;margin:6px 0 18px}textarea{height:340px}button{background:#08757b;color:white;padding:12px;border:0;border-radius:8px;cursor:pointer}img{max-width:100%;height:auto}label{font-weight:bold} .muted{color:#5b6d75}</style></head><body><main>${body}</main></body></html>`;}
const archiveSections=[
  ['destinos','Destinos y rutas'],
  ['cultura','Historias y cultura'],
  ['planifica','Planifica tu viaje'],
];
const isPublic=post=>post.status==='published'&&post.language==='es';
const isHttps=url=>/^https:\/\//i.test(url||'');
const originalDateFormat=new Intl.DateTimeFormat('es-PR',{dateStyle:'long',timeZone:'UTC'});
const formatViews=new Intl.NumberFormat('en-PR');
const views=count=>formatViews.format(count);
function caribexBody(original,post){
  return sanitizeHtml(original.originalHtml,{
    allowedTags:[...sanitizeHtml.defaults.allowedTags,'img','figure','figcaption'],
    allowedAttributes:{a:['href'],img:['src','alt','loading','referrerpolicy'],td:['colspan','rowspan'],th:['colspan','rowspan','scope']},
    allowedSchemes:['https','mailto'],
    allowProtocolRelative:false,
    transformTags:{
      h1:'h3',
      a:(tagName,attributes)=>{
        const href=attributes.href||'';
        return {tagName,attribs:{href:caribexRoutes.get(href)||href}};
      },
      img:(tagName,attributes)=>{
        const src=attributes.src||'';
        const alt=attributes.alt||post.originalTitle;
        if(!src.startsWith('https://blogger.googleusercontent.com/'))return {tagName,attribs:{}};
        return {tagName,attribs:{src,alt,loading:'lazy',referrerpolicy:'no-referrer'}};
      },
    },
    exclusiveFilter:frame=>frame.tag==='img'&&!frame.attribs.src,
  });
}
const caribexBodies=new Map(caribexPosts.map(post=>[post.id,caribexBody(caribexOriginals.get(post.sourceId),post)]));
function postDate(date){
  const parsed=new Date(date?`${date}T00:00:00Z`:'');
  if(!Number.isFinite(parsed.valueOf()))return esc(date);
  return `<time datetime="${esc(date)}">${originalDateFormat.format(parsed)}</time>`;
}
function postCard(post,heading){
  return `<article class="travel-card">
    <${heading}><a href="/turistiando/${post.id}">${esc(post.title)}</a></${heading}>
    <p class="muted">${postDate(post.originalDate)}</p>
  </article>`;
}
function travelLayout(title,body){
  return layout(title,body).replace('</head>',`<style>
    .travel-intro{padding:20px 0 16px}.travel-intro img{display:block}
    .travel-intro h1,.travel-story h1{font-size:clamp(1.8rem,5vw,2.8rem);line-height:1.15;margin:.5em 0}
    .travel-topics{display:flex;flex-wrap:wrap;gap:8px;margin:1rem 0 1.5rem}
    .travel-topics a{display:inline-flex;align-items:center;min-height:44px;padding:0 12px;border:1px solid #d2e1de;border-radius:8px;background:#fff}
    .travel-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:12px}
    .travel-card{margin:0;padding:16px}.travel-card h3,.travel-card h4{font-size:1.1rem;line-height:1.35;margin:0 0 8px}.travel-card p{margin:0;font-size:.9rem}
    .travel-story{max-width:720px;margin:20px auto}.travel-copy p{white-space:pre-line;overflow-wrap:anywhere}
    .travel-source{border-top:1px solid #ddd;padding-top:16px;margin-bottom:0}
    .travel-original{border-top:1px solid #ddd;margin-top:24px;padding-top:16px;overflow-wrap:anywhere}
    .travel-original img{display:block;margin:1rem auto;max-width:100%;height:auto}
    .travel-original table,.travel-report{display:block;overflow-x:auto;border-collapse:collapse}
    .travel-report td,.travel-report th{padding:.6rem .8rem;border-bottom:1px solid #ddd;text-align:left}
  </style></head>`);
}
function router({requireAdmin,requireAdminCsrf}){const r=express.Router();const safe=(req,res,next)=>{res.set({'Cache-Control':'private, no-store','X-Robots-Tag':'noindex, nofollow'});next()};
 r.get('/turistiando',(_req,res)=>{
   const posts=all().filter(isPublic);
   if (posts.length === 0) res.locals.skipAdSense = true;
   const archive=posts.filter(p=>p.originalUrl);
   const recent=posts.filter(p=>!p.originalUrl);
   const sections=archiveSections.map(([id,title])=>({
     id,title,posts:archive.filter(p=>p.category===id),
   })).filter(section=>section.posts.length);
   const archiveHtml=archive.length?`
     <section id="archivo-caribex" aria-labelledby="titulo-archivo">
       <h2 id="titulo-archivo">Archivo de Caribex</h2>
       <p>Explora ${archive.length} publicaciones de Caribex. Cada página reúne una introducción en español y el artículo completo en inglés, con su fecha original de publicación.</p>
       <p><strong>${views(caribexMetrics.blogViews)} vistas históricas del blog Caribex</strong> · Blogger, al ${postDate(caribexMetrics.capturedOn)}.</p>
       <nav class="travel-topics" aria-label="Temas del archivo">${sections.map(({id,title})=>`<a href="#${id}">${title}</a>`).join('')}</nav>
       ${sections.map(({id,title,posts})=>`<section id="${id}"><h3>${title}</h3><div class="travel-grid">${posts.map(p=>postCard(p,'h4')).join('')}</div></section>`).join('')}
     </section>`:'';
   res.send(travelLayout('Turistiando con Iván Soto',`
     <a href="/">← Planeta Boricua</a>
     <header class="travel-intro">
       <img src="/img/turistiando-logo.png" alt="" width="420">
       <h1>Turistiando con Iván Soto</h1>
       <p>Ideas, rutas e historias para conocer el Caribe a tu ritmo.</p>
     </header>
     ${recent.length?`<section><h2>Más historias de viaje</h2><div class="travel-grid">${recent.map(p=>postCard(p,'h3')).join('')}</div></section>`:''}
     ${archiveHtml}
     ${posts.length?'':'<p>Próximamente compartiremos nuevas historias.</p>'}
     <p><a href="/pueblos/">Explora las guías de los 78 pueblos de Puerto Rico →</a></p>`));
 });
 r.get('/turistiando/:id',(req,res,next)=>{
   const {id}=req.params;
   if(!valid(id))return next();
   let post=get(id);
   if(!post){
     init();
     post=get(id);
   }
   if(!post||!isPublic(post))return next();
   const originalBody=caribexBodies.get(post.id);
   const historicalViews=caribexMetrics.articleViews[post.id];
   const metadata=originalBody?`<meta property="article:published_time" content="${esc(post.originalDate)}"><meta name="author" content="Iván Soto">`:'';
   const image=isHttps(post.image)?`<img src="${esc(post.image)}" alt="">`:'';
   const source=isHttps(post.originalUrl)?`<p class="travel-source"><a href="${esc(post.originalUrl)}">Consultar la publicación en Blogger →</a></p>`:'';
   const date=post.originalUrl?'Publicado originalmente en Caribex el ':'Fecha original: ';
   res.send(travelLayout(post.title,`
     <a href="/turistiando${source?'#archivo-caribex':''}">← Turistiando</a>
     <article class="travel-story">
       <h1>${esc(post.title)}</h1>
       <p class="muted">${date}${postDate(post.originalDate)}${post.updatedAt?' · Actualizado: '+esc(post.updatedAt.slice(0,10)):''}</p>
       ${Number.isInteger(historicalViews)?`<p class="muted">${views(historicalViews)} vistas históricas en Caribex · Blogger, al ${postDate(caribexMetrics.capturedOn)}.</p>`:''}
       ${originalBody?'<p><a href="#articulo-original">Ir al artículo completo en inglés ↓</a></p><h2>En español</h2>':''}
       ${image}
       <div class="travel-copy">${esc(post.body).split(/\n{2,}/).map(paragraph=>`<p>${paragraph}</p>`).join('')}</div>
       ${originalBody?`<section class="travel-original" id="articulo-original" aria-labelledby="original-title">
         <p>Artículo completo en inglés</p>
         <div lang="en"><h2 id="original-title">${esc(post.originalTitle)}</h2>${originalBody}</div>
       </section>`:''}
       ${source}
     </article>`).replace('</head>',metadata+'</head>'));
 });
 r.get('/pb-control/turismo/metricas',safe,requireAdmin,(_req,res)=>{
   const siteViews=siteAnalytics.summary().allTime.pages;
   const articles=all().filter(post=>isPublic(post)&&caribexBodies.has(post.id));
   const rows=articles.map(post=>({
     post,pbViews:siteViews[`/turistiando/${post.id}`]||0,
     bloggerViews:caribexMetrics.articleViews[post.id],
   }));
   res.send(travelLayout('Métricas de Turistiando',`
     <a href="/pb-control/turismo">← Turistiando</a><h1>Métricas de Turistiando</h1>
     <p><strong>${views(caribexMetrics.blogViews)}</strong> vistas históricas de todo el blog Caribex, según Blogger al ${postDate(caribexMetrics.capturedOn)}.</p>
     <p><strong>${views(rows.reduce((total,row)=>total+row.pbViews,0))}</strong> vistas registradas en PB en las páginas de los artículos de Caribex.</p>
     <table class="travel-report"><thead><tr><th scope="col">Artículo</th><th scope="col">Vistas en Caribex</th><th scope="col">Vistas en PB</th></tr></thead>
     <tbody>${rows.map(({post,pbViews,bloggerViews})=>`<tr><th scope="row"><a href="/turistiando/${post.id}">${esc(post.title)}</a></th><td>${views(bloggerViews)}</td><td>${views(pbViews)}</td></tr>`).join('')}</tbody></table>`));
 });
 r.get('/pb-control/turismo',safe,requireAdmin,(req,res)=>res.send(layout('Turistiando · Panel',`<a href="/pb-control">← Panel de control</a><h1>Turistiando</h1><p><a href="/pb-control/turismo/vista-previa">Ver vista privada de Turistiando</a> · <a href="/pb-control/turismo/metricas">Ver métricas de Turistiando</a></p><form method="post" action="/pb-control/turismo/nuevo"><input type="hidden" name="csrf" value="${esc(req.pbAdminSession.csrf)}"><button>Crear artículo nuevo</button></form><p>Las copias de trabajo en inglés están en borradores. Las fichas publicadas de Caribex muestran el texto completo junto con la introducción en español.</p>${all().map(p=>`<article><a href="/pb-control/turismo/${p.id}">${esc(p.title)}</a> · ${esc(p.originalDate)} · ${p.status==='draft'?'Borrador':'Publicado'} · ${esc(p.language)}</article>`).join('')}`)));
 // Private review is restricted to administrators; drafts never use public URLs.
 const reviewable=p=>p.language==='es'&&!/^\[(?:fusionar|integrado)\b/i.test(String(p.title||''));
 const previewLayout=(title,body)=>layout(title,body).replace('</head>',`<style>
 .preview-top{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}
 .preview-intro{padding:24px 0 12px}.preview-intro img{width:min(420px,100%)}
 .preview-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));gap:16px}
 .preview-card{background:white;border:1px solid #dce6e5;border-radius:14px;overflow:hidden}
 .preview-card img{width:100%;height:170px;object-fit:contain;display:block}
 .preview-card div{padding:16px}.preview-card h2{font-size:1.18rem;line-height:1.3;margin:0 0 8px}
 .preview-card p{color:#53686d;margin:0;font-size:.91rem}.preview-note{background:#e7f5ef;border-radius:10px;padding:12px}
 .preview-article img{max-height:460px;width:100%;object-fit:contain}.preview-article div{white-space:pre-wrap;overflow-wrap:anywhere}
 </style></head>`);
 const previewImg=p=>/^https:\/\//i.test(String(p.image||''))?`<img src="${esc(p.image)}" alt="" loading="lazy" referrerpolicy="no-referrer">`:'';
 r.get('/pb-control/turismo/vista-previa',safe,requireAdmin,(req,res)=>{
   const posts=all().filter(reviewable);
   res.send(previewLayout('Vista previa privada · Turistiando',`
   <div class="preview-top"><a href="/pb-control/turismo">← Volver al panel</a><span>Vista privada · Solo administración</span></div>
   <header class="preview-intro"><img src="/img/turistiando-logo.png" alt="Turistiando con Iván Soto"><h1>Turistiando con Iván Soto</h1><p>Viajes, lugares y experiencias para descubrir a nuestro ritmo.</p></header>
   <p class="preview-note">Vista de revisión: aquí también aparecen borradores. Los artículos señalados para fusionar o ya integrados no aparecen en esta vista.</p>
   <div class="preview-grid">${posts.map(p=>`<article class="preview-card">${previewImg(p)}<div><h2><a href="/pb-control/turismo/vista-previa/${esc(p.id)}">${esc(p.title)}</a></h2><p>${esc(p.originalDate)} · ${p.status==='published'?'Publicado':'Borrador'}</p></div></article>`).join('')||'<p>Aún no hay artículos disponibles para revisar.</p>'}</div>`));
 });
 r.get('/pb-control/turismo/vista-previa/:id',safe,requireAdmin,(req,res)=>{
   if(!valid(req.params.id))return res.sendStatus(404);
   init();
   const p=get(req.params.id);if(!p||!reviewable(p))return res.sendStatus(404);
   res.send(previewLayout(p.title,`
   <div class="preview-top"><a href="/pb-control/turismo/vista-previa">← Vista de Turistiando</a><a href="/pb-control/turismo/${esc(p.id)}">Editar artículo</a></div>
   <article class="preview-article"><p class="preview-note">Vista privada · ${p.status==='published'?'Publicado':'Borrador'}</p><h1>${esc(p.title)}</h1><p class="muted">${esc(p.originalDate)}</p>${previewImg(p)}<div>${esc(p.body)}</div></article>`));
 });
 r.post('/pb-control/turismo/nuevo',safe,requireAdmin,requireAdminCsrf,(req,res)=>{const id='viaje-'+crypto.randomBytes(8).toString('hex');const now=new Date().toISOString();save({id,title:'Artículo nuevo',originalTitle:'Artículo nuevo',originalDate:now.slice(0,10),image:'',body:'',status:'draft',language:'es',sourceId:'',updatedAt:now});res.redirect('/pb-control/turismo/'+id);});
 r.get('/pb-control/turismo/:id',safe,requireAdmin,(req,res)=>{const p=get(req.params.id);if(!p)return res.sendStatus(404);res.send(layout('Editar artículo',`<a href="/pb-control/turismo">← Artículos</a><h1>Editar artículo</h1><p>Original: ${esc(p.originalTitle)} · ${esc(p.originalDate)}</p><form method="post"><input type="hidden" name="csrf" value="${esc(req.pbAdminSession.csrf)}"><label>Título<input name="title" required maxlength="180" value="${esc(p.title)}"></label><label>Fecha original<input type="date" name="originalDate" value="${esc(p.originalDate)}"></label><label>Imagen (enlace HTTPS)<input name="image" type="url" maxlength="2000" value="${esc(p.image)}"></label><label>Contenido<textarea name="body" required maxlength="30000">${esc(p.body)}</textarea></label><label>Idioma<select name="language"><option value="en" ${p.language==='en'?'selected':''}>Inglés original</option><option value="es" ${p.language==='es'?'selected':''}>Español revisado</option></select></label><label>Estado<select name="status"><option value="draft" ${p.status==='draft'?'selected':''}>Borrador</option><option value="published" ${p.status==='published'&&p.language==='es'?'selected':''}>Publicado</option></select></label><p>Para publicar, selecciona Español revisado. Comprueba los datos y la imagen.</p><button>Guardar</button></form>`));});
 r.post('/pb-control/turismo/:id',safe,requireAdmin,requireAdminCsrf,(req,res)=>{const p=get(req.params.id);if(!p)return res.sendStatus(404);const {title,body,language,status,originalDate,image}=req.body;if(typeof title!=='string'||!title.trim()||title.length>180||typeof body!=='string'||!body.trim()||body.length>30000||!['es','en'].includes(language)||!['draft','published'].includes(status)||!/^\d{4}-\d{2}-\d{2}$/.test(originalDate))return res.status(400).send('Datos inválidos.');if(typeof image!=='string'||image.length>2000||(image&&!/^https:\/\//i.test(image)))return res.status(400).send('Enlace de imagen inválido.');if(status==='published'&&language!=='es')return res.status(400).send('Revisa y traduce al español antes de publicar.');save({...p,title:title.trim(),body:body.trim(),image:image.trim(),language,status,originalDate,updatedAt:new Date().toISOString()});res.redirect('/pb-control/turismo/'+p.id);});return r;}
function sitemap(){return '<url><loc>https://www.masboricuaqueunmofongo.com/turistiando</loc></url>'+all().filter(isPublic).map(p=>`<url><loc>https://www.masboricuaqueunmofongo.com/turistiando/${p.id}</loc></url>`).join('');}
module.exports={router,all,get,save,sitemap};
