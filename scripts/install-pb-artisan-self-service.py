from pathlib import Path

server_path = Path('src/server.js')
view_path = Path('src/views/planetaboricua/add-negocio.js')
server = server_path.read_text()
view = view_path.read_text()

# 1) View require
old = 'const artesanoPerfilPB = require("./views/planetaboricua/artesano-perfil");\n'
new = old + 'const artesanoMiPerfilPB = require("./views/planetaboricua/artesano-mi-perfil");\n'
if 'artesanoMiPerfilPB' not in server:
    if old not in server: raise SystemExit('artisan profile require anchor missing')
    server = server.replace(old, new, 1)

# 2) Stable artisan slugs
old_slug = '''function pbArtisanSlug(item) {\n  const base = String(item.name || 'artesano').normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');\n  return `${base}-${String(item.id || '').slice(-6)}`;\n}\n'''
new_slug = '''function pbArtisanSlug(item) {\n  if (item && /^[a-z0-9][a-z0-9-]*$/.test(String(item.slug || ''))) return String(item.slug);\n  const base = String(item?.name || 'artesano').normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');\n  return `${base}-${String(item?.id || '').slice(-6)}`;\n}\n'''
if 'item && /^[a-z0-9][a-z0-9-]*$/' not in server:
    if old_slug not in server: raise SystemExit('slug anchor missing')
    server = server.replace(old_slug, new_slug, 1)

# 3) Dedicated registration limiter
limiter_anchor = '''const formLimiter = rateLimit({\n  windowMs: 60 * 60 * 1000,\n  max: 5,\n  message: { error: 'Too many submissions. Please try again later.' },\n  standardHeaders: true,\n  legacyHeaders: false\n});\n'''
limiter_block = limiter_anchor + '''\n// Artisan registration: allow normal retries without punishing a user for a validation/network problem.\nconst pbArtisanLimiter = rateLimit({\n  windowMs: 60 * 60 * 1000,\n  max: 20,\n  message: { ok:false, error:'Has hecho demasiados intentos en poco tiempo. Espera unos minutos y vuelve a intentar.' },\n  standardHeaders: true,\n  legacyHeaders: false\n});\n'''
if 'const pbArtisanLimiter = rateLimit' not in server:
    if limiter_anchor not in server: raise SystemExit('limiter anchor missing')
    server = server.replace(limiter_anchor, limiter_block, 1)

# 4) GA4 injection, enabled only on PB host and only after Measurement ID is configured.
ga_anchor = "app.set('trust proxy', 1);\n"
ga_block = ga_anchor + '''\n// PB analytics: set PB_GA_MEASUREMENT_ID=G-XXXXXXXXXX in Render to activate.\napp.use((req, res, next) => {\n  const measurementId = String(process.env.PB_GA_MEASUREMENT_ID || '').trim();\n  if (!/^G-[A-Z0-9]+$/i.test(measurementId)) return next();\n  const host = String(req.hostname || '').toLowerCase();\n  if (!host.includes('masboricuaqueunmofongo.com')) return next();\n  const send = res.send.bind(res);\n  res.send = body => {\n    if (typeof body === 'string' && body.includes('</head>') && !body.includes('googletagmanager.com/gtag/js')) {\n      const snippet = `<script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${measurementId}',{anonymize_ip:true});</script>`;\n      body = body.replace('</head>', snippet + '</head>');\n    }\n    return send(body);\n  };\n  next();\n});\n'''
if 'PB_GA_MEASUREMENT_ID' not in server:
    if ga_anchor not in server: raise SystemExit('GA anchor missing')
    server = server.replace(ga_anchor, ga_block, 1)

# 5) Self-service helpers + backups
helper_anchor = '''function pbArtisanDuplicateMessage(reason) {\n  return reason === 'whatsapp'\n    ? 'Ya existe un perfil registrado con este WhatsApp. Si es tuyo y necesitas actualizarlo, contáctanos.'\n    : 'Ya existe un perfil registrado con este email. Si es tuyo y necesitas actualizarlo, contáctanos.';\n}\n'''
helper_block = helper_anchor + r'''

const PB_ARTISAN_DIR = '/data/pb-listings';
const PB_ARTISAN_BACKUP_DIR = '/data/pb-backups';

function loadPBApprovedArtisanRecord(id) {
  if (!fs.existsSync(PB_ARTISAN_DIR)) return null;
  for (const file of fs.readdirSync(PB_ARTISAN_DIR).filter(f => f.endsWith('.json') && f !== 'pending.json')) {
    const full = path.join(PB_ARTISAN_DIR, file);
    let items = [];
    try { items = JSON.parse(fs.readFileSync(full, 'utf8')); } catch (_) { continue; }
    if (!Array.isArray(items)) continue;
    const index = items.findIndex(item => String(item?.id || '') === String(id || ''));
    if (index >= 0) return { item:items[index], items, index, file, full };
  }
  return null;
}

function backupPBArtisans(reason = 'automatic') {
  try {
    if (!fs.existsSync(PB_ARTISAN_BACKUP_DIR)) fs.mkdirSync(PB_ARTISAN_BACKUP_DIR, {recursive:true});
    const stamp = new Date().toISOString().replace(/[:.]/g,'-');
    const snapshot = { createdAt:new Date().toISOString(), reason, listings:loadApprovedPBListings() };
    fs.writeFileSync(path.join(PB_ARTISAN_BACKUP_DIR, `artisans-${stamp}.json`), JSON.stringify(snapshot,null,2));
    const files = fs.readdirSync(PB_ARTISAN_BACKUP_DIR).filter(f => /^artisans-.*\.json$/.test(f)).sort().reverse();
    files.slice(40).forEach(f => { try { fs.unlinkSync(path.join(PB_ARTISAN_BACKUP_DIR,f)); } catch (_) {} });
  } catch (error) { console.error('PB artisan backup error:', error.message); }
}

function pbArtisanMagicSecret() {
  return String(process.env.PB_ARTISAN_MAGIC_SECRET || process.env.PB_ADMIN_PASS || '').trim();
}

function createPBArtisanToken(item) {
  const secret = pbArtisanMagicSecret();
  if (!secret) return '';
  const payload = Buffer.from(JSON.stringify({id:String(item.id),email:normalizePBArtisanEmail(item.email),exp:Date.now()+2*60*60*1000})).toString('base64url');
  const sig = crypto.createHmac('sha256',secret).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

function verifyPBArtisanToken(token) {
  try {
    const secret = pbArtisanMagicSecret();
    if (!secret) return null;
    const [payload,sig] = String(token || '').split('.');
    if (!payload || !sig) return null;
    const expected = crypto.createHmac('sha256',secret).update(payload).digest('base64url');
    const a = Buffer.from(sig); const b = Buffer.from(expected);
    if (a.length !== b.length || !crypto.timingSafeEqual(a,b)) return null;
    const data = JSON.parse(Buffer.from(payload,'base64url').toString('utf8'));
    if (!data?.id || !data?.email || !data?.exp || Date.now() > Number(data.exp)) return null;
    return data;
  } catch (_) { return null; }
}

function savePBArtisanUpdate(record, next) {
  const sourceItems = record.items.slice();
  const oldLocation = String(record.item.location || '');
  const newLocation = String(next.location || oldLocation);
  if (newLocation === oldLocation) {
    sourceItems[record.index] = next;
    writeJsonFile(record.full, sourceItems);
    return;
  }
  sourceItems.splice(record.index,1);
  writeJsonFile(record.full, sourceItems);
  const target = path.join(PB_ARTISAN_DIR, `${newLocation}.json`);
  const targetItems = readJsonFile(target, []);
  targetItems.push(next);
  writeJsonFile(target, targetItems);
}
'''
if 'function createPBArtisanToken' not in server:
    if helper_anchor not in server: raise SystemExit('duplicate helper anchor missing')
    server = server.replace(helper_anchor, helper_block, 1)

# 6) Self-service routes and short artisan URL
routes_anchor = '''// Formulario público\napp.get("/pb/add-negocio", (req, res) => res.send(addNegocioPB));\n'''
routes_block = r'''// Artisan self-service: passwordless access by verified registration email.
app.get('/artesanos/mi-perfil', (_req,res) => {
  res.set('Cache-Control','no-store, private');
  res.send(artesanoMiPerfilPB.loginPage());
});

app.post('/api/pb-artesano-access', pbArtisanLimiter, express.json({limit:'10kb'}), async (req,res) => {
  const email = normalizePBArtisanEmail(sanitize(req.body?.email || ''));
  const generic = 'Si ese email corresponde a un perfil aprobado, recibirás un enlace seguro en unos minutos.';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ok:false,message:'Escribe un email válido.'});
  const item = loadApprovedPBListings().find(entry => normalizePBArtisanEmail(entry.email) === email);
  if (!item) return res.json({ok:true,message:generic});
  const token = createPBArtisanToken(item);
  if (!token) return res.status(503).json({ok:false,message:'El acceso de artesanos todavía no está configurado. Intenta más tarde.'});
  try {
    await resend.emails.send({from:`Planeta Boricua <${PB_SENDER_EMAIL}>`,to:email,subject:'🇵🇷 Enlace para administrar tu perfil en Planeta Boricua',html:`<div style="font-family:system-ui;max-width:600px"><h2>Administra tu perfil</h2><p>Hola <strong>${emailEscForResponse(item.name)}</strong>. Usa este enlace para actualizar tu información. El enlace vence en 2 horas.</p><p><a href="https://www.masboricuaqueunmofongo.com/artesanos/mi-perfil/${encodeURIComponent(token)}" style="display:inline-block;background:#002d62;color:#fff;padding:12px 18px;border-radius:7px;text-decoration:none;font-weight:700">Abrir mi perfil</a></p><p style="color:#777;font-size:13px">Si no solicitaste este acceso, puedes ignorar este mensaje.</p></div>`});
  } catch (error) { console.error('PB artisan access email:',error.message); return res.status(503).json({ok:false,message:'No pudimos enviar el email en este momento. Intenta de nuevo más tarde.'}); }
  res.json({ok:true,message:generic});
});

app.get('/artesanos/mi-perfil/:token', (req,res) => {
  res.set('Cache-Control','no-store, private');
  const auth = verifyPBArtisanToken(req.params.token);
  if (!auth) return res.status(401).send('<div style="font-family:system-ui;max-width:600px;margin:3rem auto"><h2>Este enlace venció o no es válido.</h2><p><a href="/artesanos/mi-perfil">Solicita un enlace nuevo.</a></p></div>');
  const record = loadPBApprovedArtisanRecord(auth.id);
  if (!record || normalizePBArtisanEmail(record.item.email) !== auth.email) return res.status(404).send('Perfil no encontrado.');
  const slug = pbArtisanSlug(record.item);
  res.send(artesanoMiPerfilPB.editPage(record.item, req.params.token, `/artesanos/${encodeURIComponent(slug)}`));
});

app.post('/api/pb-artesano-update/:token', pbArtisanLimiter, express.json({limit:'80kb'}), async (req,res) => {
  const auth = verifyPBArtisanToken(req.params.token);
  if (!auth) return res.status(401).json({ok:false,error:'Tu enlace de acceso venció. Solicita uno nuevo.'});
  const record = loadPBApprovedArtisanRecord(auth.id);
  if (!record || normalizePBArtisanEmail(record.item.email) !== auth.email) return res.status(404).json({ok:false,error:'Perfil no encontrado.'});
  const fields = ['name','category','location','city','zip','address','desc','fullDesc','whatsapp','website','instagram','facebook','tiktok','etsy','logo','photo','price'];
  const changes = {}; fields.forEach(key => changes[key] = sanitize(req.body?.[key] || '').trim());
  if (!changes.name || !changes.category || !changes.location || !changes.city || !changes.desc || !changes.fullDesc || !changes.photo) return res.status(400).json({ok:false,error:'Completa los campos requeridos, incluyendo la foto principal.'});
  const duplicate = findPBArtisanDuplicate({email:record.item.email,whatsapp:changes.whatsapp},{approvedOnly:true,excludeId:record.item.id});
  if (duplicate) return res.status(409).json({ok:false,error:pbArtisanDuplicateMessage(duplicate.reason)});
  const stableSlug = pbArtisanSlug(record.item);
  const next = {...record.item,...changes,slug:stableSlug,email:record.item.email,id:record.item.id,status:'approved',updatedAt:new Date().toISOString()};
  backupPBArtisans(`before-update-${record.item.id}`);
  try { savePBArtisanUpdate(record,next); } catch(error) { console.error('PB artisan update:',error); return res.status(500).json({ok:false,error:'No pudimos guardar los cambios. Intenta de nuevo.'}); }
  try { await resend.emails.send({from:`Planeta Boricua <${PB_SENDER_EMAIL}>`,to:next.email,subject:'✅ Tu perfil de Planeta Boricua fue actualizado',html:`<p>Hola <strong>${emailEscForResponse(next.name)}</strong>. Tus cambios fueron guardados.</p><p><a href="https://www.masboricuaqueunmofongo.com/artesanos/${encodeURIComponent(stableSlug)}">Ver mi perfil</a></p>`}); } catch(error) { console.error('PB artisan update confirmation:',error.message); }
  res.json({ok:true,message:'Tus cambios fueron guardados.',profileUrl:`/artesanos/${stableSlug}`});
});

app.get('/a/:slug', (req,res) => res.redirect(302, `/artesanos/${encodeURIComponent(req.params.slug)}`));

// Formulario público
app.get("/pb/add-negocio", (req, res) => res.send(addNegocioPB));
'''
if "app.get('/artesanos/mi-perfil'" not in server:
    if routes_anchor not in server: raise SystemExit('artisan route anchor missing')
    server = server.replace(routes_anchor, routes_block, 1)

# 7) Use dedicated limiter for registrations
server = server.replace('app.post("/api/pb-negocio-submit", formLimiter, express.json(), async (req, res) => {','app.post("/api/pb-negocio-submit", pbArtisanLimiter, express.json({limit:\'80kb\'}), async (req, res) => {',1)

# 8) Backup before approval
approval_anchor = '''    // Move to approved file by location\n    const approvedFile = pathLib.join(approvedDir, negocio.location + '.json');\n'''
if "backupPBArtisans(`before-approve-${negocio.id}`);" not in server:
    if approval_anchor not in server: raise SystemExit('approval anchor missing')
    server = server.replace(approval_anchor, "    backupPBArtisans(`before-approve-${negocio.id}`);\n\n" + approval_anchor, 1)

# 9) Approval email now points to self-service
old_email_note = '<p style="color:#555;line-height:1.6;margin-top:1rem;">¿Necesitas actualizar información? Contáctanos en <strong>${PB_CONTACT_EMAIL}</strong></p>'
new_email_note = '<p style="color:#555;line-height:1.6;margin-top:1rem;">¿Necesitas actualizar información? Entra a <a href="https://www.masboricuaqueunmofongo.com/artesanos/mi-perfil" style="color:#002D62;font-weight:700;">Mi Perfil</a> y solicita un enlace seguro con este mismo email.</p>'
if old_email_note in server:
    server = server.replace(old_email_note,new_email_note,1)

# 10) Harden public registration UX: inline errors, autosave draft, precise server messages.
if 'id="registration-error"' not in view:
    button = '    <button class="btn-submit" id="submit-btn" onclick="submitNegocio()">Enviar para Revisión 🇵🇷 →</button>'
    repl = '    <div id="registration-error" style="display:none;background:#fff1f2;color:#9f1239;border:1px solid #fda4af;padding:1rem;border-radius:10px;margin-bottom:1rem;line-height:1.5;font-size:.86rem"></div>\n' + button
    if button not in view: raise SystemExit('registration button anchor missing')
    view = view.replace(button,repl,1)

start = view.find('async function submitNegocio() {')
end = view.find('</script>', start)
if start < 0 or end < 0: raise SystemExit('submit function script anchors missing')
if 'PB_ARTISAN_DRAFT_V1' not in view:
    new_script_tail = r'''const PB_ARTISAN_DRAFT_V1='pbArtisanRegistrationDraftV1';
const draftIds=['biz-name','biz-category','biz-location','biz-city','biz-zip','biz-address','biz-desc','biz-full-desc','biz-email','biz-whatsapp','biz-website','biz-instagram','biz-facebook','biz-tiktok','biz-etsy','biz-logo','biz-photo','biz-price'];
let draftTimer=null;
function saveArtisanDraft(){clearTimeout(draftTimer);draftTimer=setTimeout(()=>{const d={};draftIds.forEach(id=>{const el=document.getElementById(id);if(el)d[id]=el.value});d.terms=document.getElementById('terms-agree').checked;localStorage.setItem(PB_ARTISAN_DRAFT_V1,JSON.stringify(d));},350)}
function restoreArtisanDraft(){try{const d=JSON.parse(localStorage.getItem(PB_ARTISAN_DRAFT_V1)||'null');if(!d)return;draftIds.forEach(id=>{const el=document.getElementById(id);if(el&&d[id]!==undefined)el.value=d[id]});document.getElementById('terms-agree').checked=Boolean(d.terms);if(d['biz-photo']){document.getElementById('preview-img').src=d['biz-photo'];document.getElementById('photo-preview').style.display='block';document.getElementById('photo-placeholder').style.display='none';document.getElementById('upload-status').textContent='✅ Foto recuperada del borrador';document.getElementById('upload-status').style.color='green'}if(d['biz-logo']){document.getElementById('preview-logo').src=d['biz-logo'];document.getElementById('logo-preview').style.display='block';document.getElementById('logo-placeholder').style.display='none';document.getElementById('logo-upload-status').textContent='✅ Logo recuperado del borrador';document.getElementById('logo-upload-status').style.color='green'}}catch(_){}}
function showRegistrationError(message,fieldId){const box=document.getElementById('registration-error');box.textContent=message;box.style.display='block';if(fieldId){const el=document.getElementById(fieldId);if(el){el.focus();el.scrollIntoView({behavior:'smooth',block:'center'})}}}
function clearRegistrationError(){const box=document.getElementById('registration-error');box.style.display='none';box.textContent=''}
function validEmail(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)}

async function submitNegocio() {
  clearRegistrationError();
  const values={name:document.getElementById('biz-name').value.trim(),category:document.getElementById('biz-category').value,location:document.getElementById('biz-location').value,city:document.getElementById('biz-city').value.trim(),zip:document.getElementById('biz-zip').value.trim(),address:document.getElementById('biz-address').value.trim(),desc:document.getElementById('biz-desc').value.trim(),fullDesc:document.getElementById('biz-full-desc').value.trim(),email:document.getElementById('biz-email').value.trim(),whatsapp:document.getElementById('biz-whatsapp').value.trim(),website:document.getElementById('biz-website').value.trim(),instagram:document.getElementById('biz-instagram').value.trim(),facebook:document.getElementById('biz-facebook').value.trim(),tiktok:document.getElementById('biz-tiktok').value.trim(),etsy:document.getElementById('biz-etsy').value.trim(),logo:document.getElementById('biz-logo').value.trim(),photo:document.getElementById('biz-photo').value.trim(),price:document.getElementById('biz-price').value};
  const required=[['name','biz-name','Escribe el nombre del artesano o emprendimiento.'],['category','biz-category','Selecciona una categoría.'],['location','biz-location','Selecciona tu estado o pueblo.'],['city','biz-city','Escribe tu ciudad, pueblo o sector.'],['desc','biz-desc','Añade una descripción corta.'],['fullDesc','biz-full-desc','Cuéntanos un poco más sobre tu trabajo.'],['email','biz-email','Escribe tu email.'],['photo','photo-upload-area','Sube una foto principal de tu trabajo.']];
  for(const [key,id,msg] of required){if(!values[key]){showRegistrationError('⚠️ '+msg,id);return}}
  if(!validEmail(values.email)){showRegistrationError('⚠️ El email no parece válido. Revísalo antes de enviar.','biz-email');return}
  if(!document.getElementById('terms-agree').checked){showRegistrationError('⚠️ Debes aceptar los términos antes de enviar.','terms-agree');return}
  const btn=document.getElementById('submit-btn');btn.disabled=true;btn.textContent='Enviando… no cierres esta página';
  try{
    const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),25000);
    const res=await fetch('/api/pb-negocio-submit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(values),signal:controller.signal});clearTimeout(timeout);
    let data={};try{data=await res.json()}catch(_){throw new Error('El servidor no devolvió una respuesta válida. Intenta de nuevo.')}
    if(!res.ok||!data.ok)throw new Error(data.error||'No pudimos completar el registro. Revisa la información e intenta otra vez.');
    localStorage.removeItem(PB_ARTISAN_DRAFT_V1);document.getElementById('form-container').style.display='none';document.getElementById('success-msg').style.display='block';window.scrollTo({top:0,behavior:'smooth'});
  }catch(e){const text=e.name==='AbortError'?'La conexión tardó demasiado. Tu información quedó guardada en este teléfono; verifica tu señal e intenta otra vez.':e.message||'Error de conexión. Tu borrador quedó guardado.';showRegistrationError('❌ '+text);btn.disabled=false;btn.textContent='Enviar para Revisión 🇵🇷 →'}
}

document.addEventListener('DOMContentLoaded',()=>{restoreArtisanDraft();document.querySelectorAll('input,select,textarea').forEach(el=>{el.addEventListener('input',saveArtisanDraft);el.addEventListener('change',saveArtisanDraft)})});
'''
    view = view[:start] + new_script_tail + view[end:]

# Make upload errors preserve actual API message and save draft after successful upload.
view = view.replace("status.textContent = '❌ Error al subir. Intenta de nuevo.';", "status.textContent = '❌ ' + (data.error || 'Error al subir. Intenta de nuevo.');", 2)
view = view.replace("status.style.color = 'green';\n      } else {", "status.style.color = 'green';\n        if (typeof saveArtisanDraft === 'function') saveArtisanDraft();\n      } else {", 2)

server_path.write_text(server)
view_path.write_text(view)
print('PB artisan self-service installer applied')
