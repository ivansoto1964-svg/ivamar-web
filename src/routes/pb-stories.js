const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const sanitizeHtml = require('sanitize-html');
const rateLimit = require('express-rate-limit');
const { Resend } = require('resend');

const DATA_DIR = process.env.PB_STORIES_DATA_DIR || '/data/pb-stories';
const PB_CONTACT_EMAIL = process.env.PB_CONTACT_EMAIL || 'masboricuaqueunmofongo@gmail.com';
const PB_SENDER_EMAIL = process.env.PB_SENDER_EMAIL || 'connect@ivamarai.com';
const resend = new Resend(process.env.RESEND_API_KEY);

function ensureDir() { if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true }); }
function file(name) { ensureDir(); return path.join(DATA_DIR, name); }
function read(name) { try { return JSON.parse(fs.readFileSync(file(name), 'utf8')); } catch (_) { return []; } }
function write(name, value) { ensureDir(); const target=file(name); const temp=`${target}.${process.pid}.tmp`; fs.writeFileSync(temp, JSON.stringify(value, null, 2), 'utf8'); fs.renameSync(temp,target); }
function clean(value, max=5000) { return sanitizeHtml(String(value || ''), { allowedTags: [], allowedAttributes: {} }).trim().slice(0,max); }
function esc(value) { return String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function slugify(value='') { return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,100); }
function townName(slug) { return slug.split('-').map(x => x.charAt(0).toUpperCase()+x.slice(1)).join(' '); }
function publicStory(item) { return { id:item.id,town:item.town,slug:item.slug,name:item.name,location:item.location,type:item.type,title:item.title,story:item.story,approvedAt:item.approvedAt }; }
function storyUrl(item) { return `https://www.masboricuaqueunmofongo.com/pueblos/${encodeURIComponent(item.town)}/historias/${encodeURIComponent(item.slug)}`; }
function lowQualityStory(text) {
  const normalized=String(text||'').replace(/\s+/g,' ').trim();
  const words=normalized.match(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]{2,}/g)||[];
  const alpha=(normalized.match(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/g)||[]).length;
  const symbols=(normalized.match(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9\s.,¿?¡!:'"()\-]/g)||[]).length;
  const repeated=/([A-Za-zÁÉÍÓÚÜÑáéíóúüñ])\1{4,}/i.test(normalized);
  const keyboardNoise=/(?:asdf|qwer|zxcv|hjkl|jkl;|poiuy|lkjh|12345|67890)/i.test(normalized);
  const unique=new Set(words.map(w=>w.toLowerCase()));
  if(words.length < 8) return true;
  if(alpha && symbols/Math.max(normalized.length,1) > .12) return true;
  if(repeated || keyboardNoise) return true;
  if(words.length >= 10 && unique.size/words.length < .35) return true;
  return false;
}

function renderStory(item) {
  const canonical = storyUrl(item);
  const share = encodeURIComponent(`${item.title} — ${canonical}`);
  const paragraphs = item.story.split(/\n{2,}/).map(p=>`<p>${esc(p).replace(/\n/g,'<br>')}</p>`).join('');
  const place = item.location ? ` · ${esc(item.location)}` : '';
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(item.title)} — Historias de ${esc(townName(item.town))} | Planeta Boricua</title><meta name="description" content="${esc(item.story.slice(0,155))}"><link rel="canonical" href="${canonical}"><meta property="og:type" content="article"><meta property="og:title" content="${esc(item.title)}"><meta property="og:description" content="Una historia de ${esc(townName(item.town))} compartida en Planeta Boricua."><meta property="og:url" content="${canonical}"><meta property="og:image" content="https://www.masboricuaqueunmofongo.com/img/pb-logo.png"><style>*{box-sizing:border-box}body{margin:0;background:#f6f4ee;color:#1f1f1c;font-family:Inter,system-ui,sans-serif;line-height:1.7}nav{background:#fff;border-bottom:3px solid #ce1126;padding:1rem 5%;display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap}nav a{color:#002d62;text-decoration:none;font-weight:900}.hero{background:linear-gradient(135deg,#002d62,#184b80);color:#fff;padding:4rem 1rem;text-align:center}.hero small{letter-spacing:.12em;text-transform:uppercase;font-weight:900;color:#ffffffb8}.hero h1{font:700 clamp(2.3rem,7vw,4.5rem) Georgia,serif;line-height:1.08;max-width:900px;margin:.5rem auto}.wrap{max-width:820px;margin:auto;padding:2rem 1rem 5rem}.paper{background:#fff;border:1px solid #e2dfd6;border-radius:16px;padding:clamp(1.3rem,5vw,3rem);box-shadow:0 12px 30px #0000000a}.meta{font-size:.82rem;color:#666;border-bottom:1px solid #eee;padding-bottom:1rem}.story p{font:1.1rem/1.85 Georgia,serif}.share{border-top:1px solid #eee;margin-top:2rem;padding-top:1.4rem}.buttons{display:flex;gap:.55rem;flex-wrap:wrap}.buttons a,.buttons button{border:0;border-radius:8px;padding:.72rem .9rem;font-weight:900;text-decoration:none;cursor:pointer;background:#002d62;color:#fff}.buttons .wa{background:#128c4a}.buttons .fb{background:#1877f2}.cta{margin-top:2rem;background:#eef4fb;border-radius:12px;padding:1.2rem}.cta a{color:#ce1126;font-weight:900}.note{font-size:.74rem;color:#777;margin-top:2rem}</style></head><body><nav><a href="/">🇵🇷 Planeta Boricua</a><a href="/pueblos/${encodeURIComponent(item.town)}/">← ${esc(townName(item.town))}</a></nav><header class="hero"><small>Historias de mi pueblo · ${esc(townName(item.town))}</small><h1>${esc(item.title)}</h1></header><main class="wrap"><article class="paper"><div class="meta">Por <strong>${esc(item.name)}</strong>${place}</div><div class="story">${paragraphs}</div><section class="share"><h2>Comparte esta historia 🇵🇷</h2><div class="buttons"><a class="wa" target="_blank" rel="noopener" href="https://wa.me/?text=${share}">WhatsApp</a><a class="fb" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonical)}">Facebook</a><button id="copy">Copiar enlace</button></div><p id="status"></p></section><div class="cta"><strong>¿También tienes una historia de ${esc(townName(item.town))}?</strong><br><a href="/pueblos/${encodeURIComponent(item.town)}/#historias">Cuéntala en Planeta Boricua →</a></div><p class="note">Las historias representan recuerdos y aportaciones de sus autores. Planeta Boricua puede editar formato, moderar o retirar contenido que viole sus normas.</p></article></main><script>document.getElementById('copy').onclick=async()=>{try{await navigator.clipboard.writeText(${JSON.stringify(canonical)});document.getElementById('status').textContent='Enlace copiado.'}catch(_){prompt('Copia este enlace:',${JSON.stringify(canonical)})}}</script></body></html>`;
}

module.exports = function registerPBStories(app) {
  const limiter = rateLimit({ windowMs: 60*60*1000, max: 5, standardHeaders:true, legacyHeaders:false, message:{ok:false,error:'Has enviado varias aportaciones. Intenta nuevamente más tarde.'} });

  app.post('/api/pb-stories/:town', limiter, require('express').json({limit:'40kb'}), async (req,res) => {
    const town = clean(req.params.town,80).toLowerCase();
    if (!/^[a-z0-9-]+$/.test(town)) return res.status(400).json({ok:false,error:'Pueblo inválido.'});
    if (String(req.body.website || '').trim()) return res.status(202).json({ok:true,pending:true});
    const name = clean(req.body.name,60).replace(/\s+/g,' ');
    const email = clean(req.body.email,160).toLowerCase();
    const location = clean(req.body.location,100).replace(/\s+/g,' ');
    const type = clean(req.body.type,80).replace(/\s+/g,' ');
    const title = clean(req.body.title,140).replace(/\s+/g,' ');
    const story = clean(req.body.story,6000);
    const consent = req.body.consent === true || req.body.consent === 'true' || req.body.consent === 'on';
    const newsletter = req.body.newsletter === true || req.body.newsletter === 'true' || req.body.newsletter === 'on';
    if (!name || !email || !title || !story || !consent) return res.status(400).json({ok:false,error:'Completa nombre, email, título, historia y acepta las normas.'});
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ok:false,error:'Escribe un email válido.'});
    if (story.length < 40) return res.status(400).json({ok:false,error:'Cuéntanos un poquito más. La historia debe tener al menos 40 caracteres.'});
    if (lowQualityStory(story)) return res.status(400).json({ok:false,error:'Parece que el texto está incompleto o no contiene una historia clara. Escribe unas cuantas palabras más contándonos el recuerdo o dato que quieres compartir.'});
    const urls = (story.match(/https?:\/\//gi) || []).length;
    const risky = urls > 2 || /\b(?:ssn|social security|credit card|tarjeta de cr[eé]dito|password|contrase[nñ]a)\b/i.test(story);
    if (risky) return res.status(400).json({ok:false,error:'La aportación contiene enlaces o información sensible que no podemos recibir de esta forma.'});
    const pending = read('pending.json');
    const duplicate = pending.some(x => x.town===town && x.email===email && x.title.toLowerCase()===title.toLowerCase() && x.story===story);
    if (duplicate) return res.status(202).json({ok:true,pending:true,message:'Ya recibimos esta historia.'});
    const id = `${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;
    const item = { id,town,name,email,location,type,title,story,newsletter,status:'pending',submittedAt:new Date().toISOString(),approveToken:crypto.randomBytes(24).toString('hex'),rejectToken:crypto.randomBytes(24).toString('hex') };
    pending.push(item); write('pending.json',pending);
    if (newsletter) {
      const subscribersFile='/data/pb-subscribers.json';
      try { const list=JSON.parse(fs.readFileSync(subscribersFile,'utf8')); if(!list.some(x=>String(x.email).toLowerCase()===email)) { list.push({email,source:`Historias de ${townName(town)}`,subscribedAt:new Date().toISOString()}); fs.writeFileSync(subscribersFile,JSON.stringify(list,null,2)); } } catch (_) {}
    }
    try {
      const approve=`https://www.masboricuaqueunmofongo.com/admin/pb-story-approve/${item.approveToken}`;
      const reject=`https://www.masboricuaqueunmofongo.com/admin/pb-story-reject/${item.rejectToken}`;
      await resend.emails.send({from:`Planeta Boricua <${PB_SENDER_EMAIL}>`,to:PB_CONTACT_EMAIL,subject:`🇵🇷 Nueva historia de ${townName(town)}: ${title}`,html:`<h2>${esc(title)}</h2><p><strong>Autor:</strong> ${esc(name)}</p><p><strong>Email privado:</strong> ${esc(email)}</p><p><strong>Ubicación:</strong> ${esc(location || 'No indicada')}</p><p><strong>Tipo:</strong> ${esc(type || 'Historia')}</p><hr><p>${esc(story).replace(/\n/g,'<br>')}</p><p style="margin-top:2rem"><a href="${approve}" style="background:#087443;color:white;padding:12px 18px;text-decoration:none;border-radius:7px;font-weight:bold">✅ Aprobar y publicar</a> &nbsp; <a href="${reject}" style="color:#a61727;font-weight:bold">❌ Rechazar</a></p>`});
    } catch(error) { console.error('PB story email error:',error.message); }
    return res.status(202).json({ok:true,pending:true,message:'✅ Recibimos tu historia. La revisaremos antes de publicarla.'});
  });

  app.get('/admin/pb-story-approve/:token', (req,res) => {
    const pending=read('pending.json'); const index=pending.findIndex(x=>x.approveToken===req.params.token);
    if(index<0) return res.status(404).send('Historia no encontrada o ya procesada.');
    const item=pending.splice(index,1)[0];
    const approved=read('approved.json');
    const base=slugify(item.title) || 'historia'; let slug=base; let n=2; while(approved.some(x=>x.town===item.town&&x.slug===slug)) slug=`${base}-${n++}`;
    delete item.approveToken; delete item.rejectToken; item.slug=slug; item.status='approved'; item.approvedAt=new Date().toISOString();
    approved.push(item); write('pending.json',pending); write('approved.json',approved);
    const url=storyUrl(item);
    res.send(`<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><body style="font-family:system-ui;text-align:center;padding:3rem"><h1>✅ Historia publicada</h1><p>${esc(item.title)}</p><p><a href="${url}">Ver y compartir historia</a></p></body></html>`);
  });

  app.get('/admin/pb-story-reject/:token', (req,res) => {
    const pending=read('pending.json'); const index=pending.findIndex(x=>x.rejectToken===req.params.token);
    if(index<0) return res.status(404).send('Historia no encontrada o ya procesada.');
    pending.splice(index,1); write('pending.json',pending);
    res.send('<!doctype html><html lang="es"><meta charset="utf-8"><body style="font-family:system-ui;text-align:center;padding:3rem"><h1>Historia rechazada</h1></body></html>');
  });

  app.get('/api/pb-stories/:town', (req,res) => {
    const town=clean(req.params.town,80).toLowerCase();
    const items=read('approved.json').filter(x=>x.town===town).sort((a,b)=>new Date(b.approvedAt)-new Date(a.approvedAt)).map(publicStory);
    res.json({ok:true,items});
  });

  app.get('/pueblos/:town/historias/:slug', (req,res,next) => {
    const town=clean(req.params.town,80).toLowerCase(), slug=clean(req.params.slug,120).toLowerCase();
    const item=read('approved.json').find(x=>x.town===town&&x.slug===slug);
    if(!item) return next();
    res.send(renderStory(item));
  });
};
