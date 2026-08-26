Warning: truncated output (original token count: 68356)
Total output lines: 4722

const compression = require("compression");
const helmet = require("helmet");

const express = require("express");
const sanitizeHtml = require('sanitize-html');
const sanitize = (str) => str ? sanitizeHtml(str, { allowedTags: [], allowedAttributes: {} }) : '';
const pbBlogStore = require('./services/pb-blog-store');



// ==========================================
// RATE LIMITING
// ==========================================
const rateLimit = require('express-rate-limit');
const app = express();
app.use(compression());
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
app.set('trust proxy', 1);

// Planeta Boricua is now the only active public platform on this service.
// This gate prevents the retired Ivamar AI, Caribex/Sun and Nayeli routes from
// executing or consuming third-party APIs while PB remains untouched.
const RETIRED_HOSTS = new Set([
  'ivamarai.com',
  'www.ivamarai.com',
  'yourcaribbeanexpert.com',
  'www.yourcaribbeanexpert.com'
]);
const RETIRED_PATHS = [
  '/caribex', '/insights', '/caribex-sitemap.xml', '/manifest-caribex.json',
  '/api/caribex', '/api/blog-feed', '/api/nayeli',
  '/api/iva', '/api/demo', '/api/dealer-demo', '/api/kia-demo', '/api/assistant',
  '/start', '/quote', '/cotizar', '/pricing', '/demo-dealers', '/demo-dealers-es',
  '/demo-autos', '/mr-frappe', '/adis', '/dyerkia', '/autoridad-energia-criolla',
  '/landing.html', '/iva-chat.js', '/dealer-chat.js', '/dealer-chat-es.js', '/caribex-chat.js',
  '/admin/dashboard', '/admin/new', '/admin/edit', '/admin/save', '/admin/delete',
  '/admin/listings', '/admin/approve', '/admin/reject', '/admin/auth', '/admin/logout',
  '/es', '/en', '/about', '/sobre-nosotros', '/contact', '/privacy', '/terms'
];
const RETIRED_EXACT_PATHS = new Set(['/admin']);

app.use((req, res, next) => {
  const host = String(req.hostname || '').toLowerCase();
  const path = String(req.path || '/');
  const retiredPath = RETIRED_EXACT_PATHS.has(path) || RETIRED_PATHS.some(prefix => path === prefix || path.startsWith(`${prefix}/`) || path.startsWith(`${prefix}-`));
  if (!RETIRED_HOSTS.has(host) && !retiredPath) return next();

  res.set('Cache-Control', 'no-store');
  if (path.startsWith('/api/')) {
    return res.status(410).json({ error: 'Este servicio fue retirado.' });
  }
  return res.status(410).send('<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Proyecto retirado</title><style>body{font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;margin:0;background:#f5f5f0;color:#222;text-align:center}main{padding:2rem}h1{font-size:1.5rem}</style></head><body><main><h1>Este proyecto fue retirado.</h1></main></body></html>');
});

// PB analytics: set PB_GA_MEASUREMENT_ID=G-XXXXXXXXXX in Render to activate.
app.use((req, res, next) => {
  const measurementId = String(process.env.PB_GA_MEASUREMENT_ID || '').trim();
  if (!/^G-[A-Z0-9]+$/i.test(measurementId)) return next();
  const host = String(req.hostname || '').toLowerCase();
  if (!host.includes('masboricuaqueunmofongo.com')) return next();
  const send = res.send.bind(res);
  res.send = body => {
    if (typeof body === 'string' && body.includes('</head>') && !body.includes('googletagmanager.com/gtag/js')) {
      const snippet = `<script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${measurementId}',{anonymize_ip:true});</script>`;
      body = body.replace('</head>', snippet + '</head>');
    }
    return send(body);
  };
  next();
});

// Keep every PB HTML page under one public identity and one canonical legal set.
// Pages that already have the complete PB footer are left as-is; compact pages
// and forms receive a small legal bar automatically.
app.use((req, res, next) => {
  const host = String(req.hostname || '').toLowerCase();
  if (!host.includes('masboricuaqueunmofongo.com')) return next();
  const send = res.send.bind(res);
  res.send = body => {
    if (typeof body === 'string' && body.includes('</body>')) {
      body = body
        .replace(/href=(['"])\/terminos\1/g, 'href=$1/terminos-boricua$1')
        .replace(/href=(['"])\/privacidad\1/g, 'href=$1/privacidad-boricua$1')
        .replace(/href=(['"])\/contacto\1/g, 'href=$1/quienes-somos$1')
        .replace(/connect@ivamarai\.com/gi, 'masboricuaqueunmofongo@gmail.com');
      const hasLegal = body.includes('/terminos-boricua') && body.includes('/privacidad-boricua');
      if (!hasLegal && !body.includes('data-pb-legal-footer')) {
        const legalBar = `<footer data-pb-legal-footer style="background:#002d62;color:#dbe5f2;padding:1.25rem 1rem;text-align:center;font:13px/1.6 system-ui,sans-serif"><strong style="color:#fff">🇵🇷 Planeta Boricua</strong> · Más Boricua que un Mofongo<br><a href="/quienes-somos" style="color:#fff">Quiénes Somos</a> · <a href="/privacidad-boricua" style="color:#fff">Privacidad</a> · <a href="/terminos-boricua" style="color:#fff">Términos</a> · <a href="/afiliados-boricua" style="color:#fff">Afiliados</a> · <a href="mailto:masboricuaqueunmofongo@gmail.com" style="color:#fff">Contacto</a><br><span style="font-size:12px">© 2026 Planeta Boricua · Proyecto independiente de Iván Soto · Florida, USA</span></footer>`;
        body = body.replace('</body>', legalBar + '</body>');
      }
    }
    return send(body);
  };
  next();
});

// Handle malformed URI errors from bots/scanners
app.use((err, req, res, next) => {
  if (err instanceof URIError) {
    return res.status(400).send('Bad Request');
  }
  next(err);
});


// AI endpoints — max 20 requests per 10 minutes per IP
const aiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  message: { error: 'Too many requests. Please wait a few minutes before trying again.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Form submissions — max 5 per hour per IP
const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { error: 'Too many submissions. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Artisan registration: allow normal retries without punishing a user for a validation/network problem.
const pbArtisanLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: { ok:false, error:'Has hecho demasiados intentos en poco tiempo. Espera unos minutos y vuelve a intentar.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Lightweight first-party metrics. This endpoint only stores aggregate counters,
// never IP addresses or other visitor identifiers.
const pbArtisanMetricsLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 300,
  message: { ok:false, error:'Demasiadas solicitudes de medición.' },
  standardHeaders: true,
  legacyHeaders: false
});



// ==========================================
// ENSURE PERSISTENT DATA DIRECTORIES EXIST
// ==========================================
['businesses','listings','agreements','destinations'].forEach(dir => {
  const p = require('path').join('/data', dir);
  if (!require('fs').existsSync(p)) require('fs').mkdirSync(p, { recursive: true });
});


const layout = require("./views/layout");
const dyerKia = require("./views/dyerkia");
const adis = require("./views/adis");
const mrFrappe = require("./views/mr-frappe");
const renderEstado = require("./views/planetaboricua/estado-template");
const caribex = require("./views/caribex");
const directoryTerms = require("./views/caribex/directory-terms");
const listYourBusiness = require("./views/caribex/list-your-business");
const caribexAbout = require("./views/caribex/about");
const caribexPrivacy = require("./views/caribex-privacy");
const caribexTerms = require("./views/caribex-terms");
const demoDealers = require("./views/demo-dealers");
const demoDealersES = require("./views/demo-dealers-es");
const home = require("./views/home");
const homeES = require("./views/home-es");
const homeEN = require("./views/home-en");
const about = require("./views/about");
const planetaboricua = require("./views/planetaboricua");
const recursosBoriuca = require("./views/recursos-boricua");
const { terminos: terminosBoricua, privacidad: privacidadBoricua, afiliados: afiliadosBoricua } = require("./views/legal-boricua");
const regresarAPR = require("./views/regresar-a-pr");
const mudarseDePR = require("./views/mudarse-de-pr");
const sobreNosotros = require("./views/sobre-nosotros");
const contactoES = require("./views/contacto");
const contact = require("./views/contact");
const privacy = require("./views/privacy");
const terms = require("./views/terms");
const termsES = require("./views/terms-es");
const privacyES = require("./views/privacy-es");

const quote = require("./views/quote");
const quoteES = require("./views/quote-es");
const adminLogin = require("./views/admin-login");
const adminDashboard = require("./views/admin-dashboard");
const adminEdit = require("./views/admin-edit");
const pbControl = require("./views/pb-control");
const pbControlLogin = require("./views/pb-control-login");
const Anthropic = require("@anthropic-ai/sdk");
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);
const fs = require("fs");
const { getPlacePhoto } = require("./helpers/googlePhotos");
const aecDemo = require("./views/autoridad-energia-criolla");
const addNegocioPB = require("./views/planetaboricua/add-negocio");
const feriaArtesanosPB = require("./views/planetaboricua/feriaartesanos");
const artesanoPerfilPB = require("./views/planetaboricua/artesano-perfil");
const artesanoMiPerfilPB = require("./views/planetaboricua/artesano-mi-perfil");
const artesanoAdminPB = require("./views/planetaboricua/artesano-admin");
const agendaArtesanalPB = require("./views/planetaboricua/agenda-artesanal");
const enviarEventoPB = require("./views/planetaboricua/enviar-evento");
const enviarEventoBoricuaPB = require("./views/planetaboricua/enviar-evento-boricua");
const loMasRecientePB = require("./views/planetaboricua/lo-mas-reciente");
const loMasRecienteIndexPB = require("./views/planetaboricua/lo-mas-reciente-index");
const pbBlogIndex = require("./views/pb-blog/index");
const pbBlogPost = require("./views/pb-blog/post");
const Stripe = require("stripe");
const stripe = process.env.STRIPE_SECRET_KEY ? Stripe(process.env.STRIPE_SECRET_KEY) : null;
const { searchPlacesByText } = require("./helpers/googlePlaces");
const { sendLeadNotification } = require("./services/notificationService");
const path = require("path");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");

// Feria de Artesanías launches at midnight in Puerto Rico (UTC-4).
const FERIA_LAUNCH_AT = new Date('2026-09-23T04:00:00.000Z');

function feriaIsLive() {
  return new Date() >= FERIA_LAUNCH_AT;
}

function feriaCanPreview(req) {
  const configuredKey = process.env.FERIA_PREVIEW_KEY;
  return Boolean(configuredKey && req.query.preview === configuredKey);
}

function feriaListingsVisible(req) {
  return true;
}

function pbArtisanSlug(item) {
  if (item && /^[a-z0-9][a-z0-9-]*$/.test(String(item.slug || ''))) return String(item.slug);
  const base = String(item?.name || 'artesano').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  return `${base}-${String(item?.id || '').slice(-6)}`;
}

const PB_ARTISAN_SLUG_REDIRECTS = new Map([
  ['ivette-vargas-893766','ivette-vargas-893533'],
  ['normari-lopez-laboy-112088','normari-lopez-laboy-430040'],
  ['kenneth-a-melendez-padilla-mascaras-cabezudos-y-ritmos-370699','mascaras-cabezudos-y-ritmos-992425'],
  ['griselle-abraham-tejidos-gris-151143','griselle-abraham-cancel-717023']
]);

function canonicalPBArtisanSlug(slug) {
  return PB_ARTISAN_SLUG_REDIRECTS.get(String(slug || '')) || String(slug || '');
}
const PB_US_LOCATIONS = new Set('alabama alaska arizona arkansas california colorado connecticut delaware florida florida-us georgia hawaii idaho illinois indiana iowa kansas kentucky louisiana maine maryland massachusetts michigan minnesota mississippi missouri montana nebraska nevada new-hampshire new-jersey new-mexico nueva-york north-carolina north-dakota ohio oklahoma oregon pennsylvania rhode-island south-carolina south-dakota tennessee texas utah vermont virginia washington west-virginia wisconsin wyoming washington-dc'.split(' '));

function loadApprovedPBListings() {
  const dir = '/data/pb-listings';
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(file => file.endsWith('.json') && file !== 'pending.json').flatMap(file => {
    try { return JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8')); } catch (_) { return []; }
  });
}

function normalizePBArtisanEmail(value) {
  return String(value || '')
    .normalize('NFKC')
    .replace(/[\s\u200B-\u200D\u2060\uFEFF]/g,'')
    .toLowerCase();
}

function normalizePBArtisanPhone(value) {
  let digits = String(value || '').replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) digits = digits.slice(1);
  return digits;
}

function findPBArtisanDuplicate(candidate, options = {}) {
  const excludeId = String(options.excludeId || '');
  const approvedOnly = Boolean(options.approvedOnly);
  const approved = loadApprovedPBListings();
  let pending = [];
  if (!approvedOnly) {
    try {
      const pendingFile = '/data/pb-listings/pending.json';
      pending = fs.existsSync(pendingFile) ? JSON.parse(fs.readFileSync(pendingFile, 'utf8')) : [];
      if (!Array.isArray(pending)) pending = [];
    } catch (_) { pending = []; }
  }
  const phone = normalizePBArtisanPhone(candidate?.whatsapp);
  const email = normalizePBArtisanEmail(candidate?.email);
  for (const existing of approved.concat(pending)) {
    if (excludeId && String(existing?.id || '') === excludeId) continue;
    if (phone && normalizePBArtisanPhone(existing?.whatsapp) === phone) return { reason:'whatsapp' };
    if (email && normalizePBArtisanEmail(existing?.email) === email) return { reason:'email' };
  }
  return null;
}

function pbArtisanDuplicateMessage(reason) {
  return reason === 'whatsapp'
    ? 'Ya existe un perfil registrado con este WhatsApp. Si es tuyo y necesitas actualizarlo, contáctanos.'
    : 'Ya existe un perfil registrado con este email. Si es tuyo y necesitas actualizarlo, contáctanos.';
}


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
    const backupFile = path.join(PB_ARTISAN_BACKUP_DIR, `artisans-${stamp}.json`);
    fs.writeFileSync(backupFile, JSON.stringify(snapshot,null,2));
    const files = fs.readdirSync(PB_ARTISAN_BACKUP_DIR).filter(f => /^artisans-.*\.json$/.test(f)).sort().reverse();
    files.slice(40).forEach(f => { try { fs.unlinkSync(path.join(PB_ARTISAN_BACKUP_DIR,f)); } catch (_) {} });
    return backupFile;
  } catch (error) {
    console.error('PB artisan backup error:', error.message);
    return '';
  }
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

const PB_EVENTS_DIR = '/data/pb-events';
function readPBEvents(file) {
  try { return JSON.parse(fs.readFileSync(path.join(PB_EVENTS_DIR, file), 'utf8')); } catch (_) { return []; }
}
function writePBEvents(file, events) {
  if (!fs.existsSync(PB_EVENTS_DIR)) fs.mkdirSync(PB_EVENTS_DIR, { recursive: true });
  fs.writeFileSync(path.join(PB_EVENTS_DIR, file), JSON.stringify(events, null, 2));
}
function publicPBEvent(event) {
  return { id:event.id,name:event.name,type:event.type,startDate:event.startDate,endDate:event.endDate,time:event.time,venue:event.venue,address:event.address,city:event.city,region:event.region,country:event.country,description:event.description,eventUrl:event.eventUrl,cost:event.cost,image:event.image,virtual:Boolean(event.virtual),artisanSlug:event.artisanSlug,artisanName:event.artisanName,organizerName:event.organizerName,sourceLabel:event.sourceLabel,approvedAt:event.approvedAt };
}

const PB_LATEST_DIR = '/data/pb-latest';
const PB_COMMENTS_DIR = '/data/pb-comments';
const PB_CONTACT_EMAIL = process.env.PB_CONTACT_EMAIL || 'masboricuaqueunmofongo@gmail.com';
const PB_SENDER_EMAIL = process.env.PB_SENDER_EMAIL || 'notificaciones@masboricuaqueunmofongo.com';
function readPBLatest(file) {
  try { return JSON.parse(fs.readFileSync(path.join(PB_LATEST_DIR, file), 'utf8')); } catch (_) { return []; }
}
function writePBLatest(file, items) {
  if (!fs.existsSync(PB_LATEST_DIR)) fs.mkdirSync(PB_LATEST_DIR, { recursive: true });
  fs.writeFileSync(path.join(PB_LATEST_DIR, file), JSON.stringify(items, null, 2));
}
function readPBComments(file) {
  try { return JSON.parse(fs.readFileSync(path.join(PB_COMMENTS_DIR, file), 'utf8')); } catch (_) { return []; }
}
function writePBComments(file, comments) {
  if (!fs.existsSync(PB_COMMENTS_DIR)) fs.mkdirSync(PB_COMMENTS_DIR, { recursive: true });
  fs.writeFileSync(path.join(PB_COMMENTS_DIR, file), JSON.stringify(comments, null, 2));
}
function publicPBComment(comment) {
  return { id:comment.id,articleSlug:comment.articleSlug,section:comment.section || 'latest',name:comment.name,comment:comment.comment,submittedAt:comment.submittedAt,approvedAt:comment.approvedAt };
}
function pbLatestSlug(title, id) {
  const base = String(title || 'actualidad').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `${base}-${String(id || '').slice(-6)}`;
}
function publicPBLatest(item) {
  return { id:item.id,slug:item.slug,title:item.title,summary:item.summary,body:item.body,image:item.image,sources:item.sources,publishedAt:item.publishedAt };
}

function publicPBListing(listing) {
  return {
    id: listing.id,
    name: listing.name,
    category: listing.category,
    location: listing.location,
    city: listing.city,
    desc: listing.desc,
    fullDesc: listing.fullDesc,
    website: listing.website,
    instagram: listing.instagram,
    facebook: listing.facebook,
    tiktok: listing.tiktok,
    etsy: listing.etsy,
    whatsapp: listing.whatsapp,
    logo: listing.logo,
    photo: listing.photo,
    price: listing.price,
    status: listing.status,
    approvedAt: listing.approvedAt,
    destacado: Boolean(listing.destacado),
    slug: pbArtisanSlug(listing)
  };
}

const PB_AFFILIATE_CAMPAIGNS = {
  'amazon-store': { label:'Amazon · Tienda general', url:'https://www.amazon.com/shop/planetaboricua' },
  'amazon-shirts': { label:'Amazon · Camisetas', url:'https://www.amazon.com/shop/planetaboricua/list/1W420Q1BXBM69?tag=ivansoto0f-20' },
  'amazon-flags': { label:'Amazon · Banderas', url:'https://www.amazon.com/shop/planetaboricua/list/2CXBDURUV9G46?tag=ivansoto0f-20' },
  'amazon-kitchen': { label:'Amazon · Cocina', url:'https://www.amazon.com/shop/planetaboricua/list/1A33AK8DLTYDO?tag=ivansoto0f-20' },
  'amazon-music': { label:'Amazon · Música', url:'https://www.amazon.com/shop/planetaboricua/list/GVPOWIBQMA3B?tag=ivansoto0f-20' },
  'amazon-books': { label:'Amazon · Libros', url:'https://www.amazon.com/shop/planetaboricua/list/2W7GCH9PJ1D9B?tag=ivansoto0f-20' },
  'amazon-home': { label:'Amazon · Hogar', url:'https://www.amazon.com/shop/planetaboricua/list/3PF9YAQ8MKRCO?tag=ivansoto0f-20' },
  'amazon-auto': { label:'Amazon · Auto', url:'https://www.amazon.com/shop/planetaboricua/list/1UY29IVPZQ34Y?tag=ivansoto0f-20' },
  'amazon-gifts': { label:'Amazon · Regalos', url:'https://www.amazon.com/shop/planetaboricua/list/1Q6CYDE5BV80P?tag=ivansoto0f-20' },
  'travel-hotels': { label:'Travelpayouts · Hoteles', url:'https://booking.tpo.lu/OcdV3VzY' },
  'travel-flights': { label:'Travelpayouts · Vuelos', url:'https://trip.tpo.lu/tOQAQ2WQ' }
};
const PB_AFFILIATE_CLICKS_FILE = '/data/pb-affiliate-clicks.json';
const PB_ARTISAN_MAIL_HISTORY_FILE = '/data/pb-artisan-mail-history.json';
const PB_ARTISAN_EMAIL_OPTOUTS_FILE = '/data/pb-artisan-email-optouts.json';
const PB_ARTISAN_METRICS_FILE = '/data/pb-artisan-metrics.json';
const PB_ARTISAN_METRIC_EVENTS = new Set(['view','whatsapp','website','instagram','facebook','store','share','event','edit']);

function pbArtisanEmailOptOuts() {
  return readJsonFile(PB_ARTISAN_EMAIL_OPTOUTS_FILE,[]).filter(item => item && normalizePBArtisanEmail(item.email));
}

function createPBArtisanEmailOptOutToken(email) {
  const secret = pbArtisanMagicSecret();
  const normalized = normalizePBArtisanEmail(email);
  if (!secret || !normalized) return '';
  const payload = Buffer.from(JSON.stringify({email:normalized,purpose:'artisan-email-optout',v:1})).toString('base64url');
  const sig = crypto.createHmac('sha256',secret).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

function verifyPBArtisanEmailOptOutToken(token) {
  try {
    const secret = pbArtisanMagicSecret();
    if (!secret) return '';
    const [payload,sig] = String(token || '').split('.');
    if (!payload || !sig) return '';
    const expected = crypto.createHmac('sha256',secret).update(payload).digest('base64url');
    const a = Buffer.from(sig); const b = Buffer.from(expected);
    if (a.length !== b.length || !crypto.timingSafeEqual(a,b)) return '';
    const data = JSON.parse(Buffer.from(payload,'base64url').toString('utf8'));
    if (data?.purpose !== 'artisan-email-optout' || data?.v !== 1) return '';
    const email = normalizePBArtisanEmail(data.email);
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : '';
  } catch (_) { return ''; }
}

function pbArtisanEmailOptOutUrl(email) {
  const token = createPBArtisanEmailOptOutToken(email);
  return token ? `https://www.masboricuaqueunmofongo.com/artesanos/comunicaciones/salir/${encodeURIComponent(token)}` : '';
}

function pbArtisanRecipients() {
  const seen = new Set();
  const optedOut = new Set(pbArtisanEmailOptOuts().map(item => normalizePBArtisanEmail(item.email)));
  return loadApprovedPBListings().map(item => ({
    name:String(item.name || 'Artesano/a').trim(),
    email:String(item.email || '').trim().toLowerCase()
  })).filter(item => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(item.email) || seen.has(item.email) || optedOut.has(item.email)) return false;
    seen.add(item.email);
    return true;
  });
}

const PB_EMAIL_DOMAIN_TYPOS = new Map([
  ['gmal.com','gmail.com'],['gmial.com','gmail.com'],['gamil.com','gmail.com'],
  ['gmail.con','gmail.com'],['gmail.co','gmail.com'],['gmail.om','gmail.com'],['gmai.com','gmail.com'],
  ['yaho.com','yahoo.com'],['yahho.com','yahoo.com'],['yahoo.con','yahoo.com'],['yahoo.co','yahoo.com'],
  ['hotmal.com','hotmail.com'],['hotmial.com','hotmail.com'],['hotmail.con','hotmail.com'],
  ['outlok.com','outlook.com'],['outloo.com','outlook.com'],['outlook.con','outlook.com'],
  ['icloud.con','icloud.com'],['iclud.com','icloud.com'],['aol.con','aol.com']
]);

function pbArtisanEmailAudit(artisans) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const records = (artisans || []).map(item => {
    const rawEmail = String(item.email || '');
    const email = normalizePBArtisanEmail(rawEmail);
    const domain = email.includes('@') ? email.split('@').pop() : '';
    return {id:String(item.id || ''),name:String(item.name || 'Artesano/a').trim(),rawEmail,email,domain};
  });
  const emailGroups = new Map();
  records.forEach(record => {
    if (!record.email) return;
    if (!emailGroups.has(record.email)) emailGroups.set(record.email,[]);
    emailGroups.get(record.email).push(record);
  });
  const duplicateEmails = new Set([...emailGroups.entries()].filter(([,items]) => items.length > 1).map(([email]) => email));
  const issues = [];
  records.forEach(record => {
    const types = [];
    const notes = [];
    let suggestion = '';
    if (!record.email) {
      types.push('missing');
      notes.push('No tiene email registrado.');
    } else {
      if (!emailPattern.test(record.email)) {
        types.push('invalid');
        notes.push('El formato del email no es válido.');
      }
      if (record.rawEmail !== record.email) {
        types.push('normalization');
        notes.push('Contiene mayúsculas o espacios que conviene normalizar.');
      }
      if (PB_EMAIL_DOMAIN_TYPOS.has(record.domain)) {
        types.push('suspicious');
        const correctDomain = PB_EMAIL_DOMAIN_TYPOS.get(record.domain);
        suggestion = `${record.email.slice(0,record.email.lastIndexOf('@') + 1)}${correctDomain}`;
        notes.push(`El dominio “${record.domain}” parece un error; posiblemente quiso escribir “${correctDomain}”.`);
      }
      if (duplicateEmails.has(record.email)) {
        types.push('duplicate');
        notes.push(`Este email aparece en ${emailGroups.get(record.email).length} perfiles.`);
      }
    }
    if (types.length) issues.push({...record,types,notes,suggestion});
  });
  const count = type => issues.filter(item => item.types.includes(type)).length;
  return {
    total:records.length,
    present:records.filter(item => item.email).length,
    uniqueValid:new Set(records.filter(item => item.email && emailPattern.test(item.email)).map(item => item.email)).size,
    duplicateAddresses:duplicateEmails.size,
    counts:{missing:count('missing'),invalid:count('invalid'),duplicateProfiles:count('duplicate'),suspicious:count('suspicious'),normalization:count('normalization'),issues:issues.length},
    issues
  };
}


function pbArtisanMailHistory() {
  return readJsonFile(PB_ARTISAN_MAIL_HISTORY_FILE,[]).sort((a,b) => new Date(b.sentAt || 0)-new Date(a.sentAt || 0)).slice(0,25);
}

function pbArtisanMailHtml(name, message, optOutUrl = '') {
  const escMail = value => String(value || '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const safeName = escMail(name || 'Artesano/a');
  const safeMessage = escMail(message).replace(/\n/g,'<br>');
  const optOut = optOutUrl ? `<br><a href="${escMail(optOutUrl)}" style="color:#666">No deseo recibir más comunicaciones generales</a><br><span>Tu perfil continuará publicado en la Feria.</span>` : '';
  return `<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#253247">
    <div style="background:linear-gradient(135deg,#002d62,#ce1126);padding:24px;text-align:center;border-radius:12px 12px 0 0">
      <div style="font-size:30px">🇵🇷</div><h1 style="color:white;font-size:22px;margin:8px 0 0">Planeta Boricua</h1>
      <p style="color:#ffffffcc;margin:5px 0 0">Feria Digital de Artesanías Puertorriqueñas</p>
    </div>
    <div style="background:#fff;border:1px solid #e5e8ee;padding:28px">
      <p style="font-size:16px">Hola, <strong>${safeName}</strong>:</p>
      <div style="font-size:15px;line-height:1.7">${safeMessage}</div>
      <div style="text-align:center;margin:28px 0"><a href="https://www.masboricuaqueunmofongo.com/pb/add-negocio" style="display:inline-block;background:#ce1126;color:#fff;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:700">Invitar a otro artesano →</a></div>
    </div>
    <div style="background:#f5f5f0;padding:16px;text-align:center;border-radius:0 0 12px 12px;color:#777;font-size:12px;line-height:1.5">Recibes este mensaje porque participas en la Feria Digital de Artesanías Puertorriqueñas de Planeta Boricua.${optOut}<br>© 2026 Planeta Boricua · Más Boricua que un Mofongo 🇵🇷</div>
  </div>`;
}


function readJsonFile(file, fallback = []) {
  try { return JSON.parse(fs.readFileSync(file,'utf8')); } catch (_) { return fallback; }
}

function writeJsonFile(file, value) {
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir,{recursive:true});
  const temp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(temp,JSON.stringify(value,null,2),'utf8');
  fs.renameSync(temp,file);
}

function loadPBApprovedArtisansWithFiles() {
  const dir = '/data/pb-listings';
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(file => file.endsWith('.json') && file !== 'pending.json').flatMap(file => readJsonFile(path.join(dir,file),[]).map(item => ({...item,_file:file,slug:pbArtisanSlug(item)})));
}

const PB_ARTISAN_CLEANUP_MIGRATION = '2026-08-24-artisan-email-cleanup-v1';
const PB_ARTISAN_CLEANUP_PAIRS = [
  {keepId:'1787355893533',removeId:'1787355893766',keepSlug:'ivette-vargas-893533'},
  {keepId:'1787399430040',removeId:'1787399112088',keepSlug:'normari-lopez-laboy-430040'},
  {keepId:'1787354992425',removeId:'1785301370699',keepSlug:'mascaras-cabezudos-y-ritmos-992425'},
  {keepId:'1787351717023',removeId:'1785332151143',keepSlug:'griselle-abraham-cancel-717023'}
];

function mergePBArtisanMetricEntries(current = {}, retired = {}) {
  const clicks = {...(current.clicks && typeof current.clicks === 'object' ? current.clicks : {})};
  Object.entries(retired.clicks && typeof retired.clicks === 'object' ? retired.clicks : {}).forEach(([event,count]) => {
    clicks[event] = (Number(clicks[event]) || 0) + (Number(count) || 0);
  });
  const activityDates = [current.lastActivity,retired.lastActivity].filter(Boolean).sort();
  return {
    ...retired,
    ...current,
    views:(Number(current.views) || 0) + (Number(retired.views) || 0),
    clicks,
    lastActivity:activityDates.at(-1) || null
  };
}

function runPBArtisanCleanupMigration() {
  const migrationDir = '/data/pb-migrations';
  const markerFile = path.join(migrationDir, `${PB_ARTISAN_CLEANUP_MIGRATION}.json`);
  if (!fs.existsSync(PB_ARTISAN_DIR) || fs.existsSync(markerFile)) return;

  try {
    const files = new Map();
    fs.readdirSync(PB_ARTISAN_DIR).filter(file => file.endsWith('.json') && file !== 'pending.json').forEach(file => {
      const full = path.join(PB_ARTISAN_DIR,file);
      const items = readJsonFile(full,[]);
      if (Array.isArray(items)) files.set(full,items);
    });
    const rebuildIndex = () => {
      const index = new Map();
      files.forEach((items,file) => items.forEach(item => index.set(String(item?.id || ''),{item,file})));
      return index;
    };
    let byId = rebuildIndex();
    const missingCanonical = PB_ARTISAN_CLEANUP_PAIRS.filter(pair => !byId.has(pair.keepId));
    if (missingCanonical.length) throw new Error(`canonical profiles missing: ${missingCanonical.map(pair => pair.keepId).join(', ')}`);

    const backupFile = backupPBArtisans(`before-${PB_ARTISAN_CLEANUP_MIGRATION}`);
    if (!backupFile) throw new Error('backup could not be created');

    let emailChanges = 0;
    files.forEach(items => items.forEach(item => {
      const normalized = normalizePBArtisanEmail(item.email);
      if (item.email && item.email !== normalized) {
        item.email = normalized;
        emailChanges += 1;
      }
    }));
    byId = rebuildIndex();
    const safeCorrections = new Map([
      ['1787600162480','artesaniamaribel2025@gmail.com'],
      ['1787391978954','usvaldocollazo@gmail.com']
    ]);
    safeCorrections.forEach((email,id) => {
      const record = byId.get(id);
      if (record && record.item.email !== email) {
        record.item.email = email;
        emailChanges += 1;
      }
    });

    const retiredIds = new Set();
    const mergeMissingFields = ['website','instagram','facebook','tiktok','etsy','logo','whatsapp','city','zip','address','fullDesc','desc'];
    PB_ARTISAN_CLEANUP_PAIRS.forEach(pair => {
      const canonical = byId.get(pair.keepId)?.item;
      const duplicate = byId.get(pair.removeId)?.item;
      canonical.slug = pair.keepSlug;
      if (duplicate) {
        mergeMissingFields.forEach(field => {
          if (!canonical[field] && duplicate[field]) canonical[field] = duplicate[field];
        });
        retiredIds.add(pair.removeId);
      }
    });

    const griselle = byId.get('1787351717023')?.item;
    if (griselle) {
      griselle.name = 'Griselle Abraham Cancel / Tejidos Gris';
      griselle.category = 'textiles';
      griselle.desc = 'Tejidos a crochet, amigurumis, pantallas y flores eternas.';
      griselle.fullDesc = 'Creo tejidos a crochet, incluyendo amigurumis, pantallas y flores eternas.';
      griselle.slug = 'griselle-abraham-cancel-717023';
    }

    files.forEach((items,file) => writeJsonFile(file,items.filter(item => !retiredIds.has(String(item?.id || '')))));

    const storedMetrics = readJsonFile(PB_ARTISAN_METRICS_FILE,{});
    const metrics = storedMetrics && !Array.isArray(storedMetrics) && typeof storedMetrics === 'object' ? storedMetrics : {};
    PB_ARTISAN_SLUG_REDIRECTS.forEach((canonicalSlug,retiredSlug) => {
      if (metrics[retiredSlug]) {
        metrics[canonicalSlug] = mergePBArtisanMetricEntries(metrics[canonicalSlug],metrics[retiredSlug]);
        delete metrics[retiredSlug];
      }
    });
    writeJsonFile(PB_ARTISAN_METRICS_FILE,metrics);

    ['pending.json','approved.json'].forEach(file => {
      const full = path.join(PB_EVENTS_DIR,file);
      if (!fs.existsSync(full)) return;
      const events = readJsonFile(full,[]);
      if (!Array.isArray(events)) return;
      let changed = false;
      events.forEach(event => {
        const canonicalSlug = canonicalPBArtisanSlug(event.artisanSlug);
        if (canonicalSlug !== event.artisanSlug) {
          event.artisanSlug = canonicalSlug;
          changed = true;
        }
      });
      if (changed) writeJsonFile(full,events);
    });

    if (!fs.existsSync(migrationDir)) fs.mkdirSync(migrationDir,{recursive:true});
    writeJsonFile(markerFile,{
      completedAt:new Date().toISOString(),
      backupFile,
      normalizedOrCorrectedEmails:emailChanges,
      retiredProfiles:retiredIds.size
    });
    console.log(`PB artisan cleanup complete: ${retiredIds.size} duplicates retired; ${emailChanges} emails normalized or corrected.`);
  } catch (error) {
    console.error('PB artisan cleanup migration skipped:',error.message);
  }
}

runPBArtisanCleanupMigration();

function loadPBBlogPosts() {
  return pbBlogStore.loadPosts({ includeDrafts:true });
}

function pbAffiliateSummary() {
  const clicks = readJsonFile(PB_AFFILIATE_CLICKS_FILE,[]);
  const grouped = new Map();
  clicks.forEach(click => {
    const current = grouped.get(click.campaign) || {campaign:click.campaign,label:PB_AFFILIATE_CAMPAIGNS[click.campaign]?.label || click.campaign,clicks:0,lastClick:null};
    current.clicks += 1;
    if (!current.lastClick || click.clickedAt > current.lastClick) current.lastClick = click.clickedAt;
    grouped.set(click.campaign,current);
  });
  return [...grouped.values()].sort((a,b) => b.clicks-a.clicks);
}

function pbArtisanMetricsSummary(artisans) {
  const metrics = readJsonFile(PB_ARTISAN_METRICS_FILE,{});
  const safeMetrics = metrics && !Array.isArray(metrics) && typeof metrics === 'object' ? metrics : {};
  return artisans.map(item => {
    const slug = pbArtisanSlug(item);
    const entry = safeMetrics[slug] || {};
    const clicks = entry.clicks && typeof entry.clicks === 'object' ? entry.clicks : {};
    const clickTotal = Object.values(clicks).reduce((sum,value) => sum + (Number(value) || 0),0);
    return {
      slug,
      name:item.name || 'Artesano/a',
      views:Number(entry.views) || 0,
      clickTotal,
      clicks,
      lastActivity:entry.lastActivity || null
    };
  }).sort((a,b) => (b.views + b.clickTotal) - (a.views + a.clickTotal) || String(a.name).localeCompare(String(b.name),'es'));
}

function blogContentHtml(value) {
  const raw = String(value || '').trim();
  const html = /<\/?[a-z][\s\S]*>/i.test(raw)
    ? raw
    : raw.split(/\n{2,}/).map(paragraph => `<p>${sanitizeHtml(paragraph,{allowedTags:[],allowedAttributes:{}}).replace(/\n/g,'<br>')}</p>`).join('');
  return sanitizeHtml(html, {
    allowedTags:['p','br','h2','h3','h4','strong','em','b','i','ul','ol','li','blockquote','a','img','figure','figcaption','hr'],
    allowedAttributes:{a:['href','title','target','rel'],img:['src','alt','title','loading','width','height']},
    allowedSchemes:['http','https','mailto'],
    allowProtocolRelative:false,
    transformTags:{
      b:'strong',i:'em',
      a:(tagName,attrs)=>({tagName:'a',attribs:{...attrs,rel:'noopener noreferrer'}}),
      img:(tagName,attrs)=>({tagName:'img',attribs:{...attrs,loading:'lazy'}})
    }
  });
}

function blogDateLabel(dateISO) {
  const date = new Date(`${dateISO}T12:00:00`);
  return date.toLocaleDateString('es-PR',{year:'numeric',month:'long',day:'numeric'});
}
// Agreements directory for legal acceptance logs
const agreementsDir = path.join(__dirname, "..", "data", "agreements");
if (!fs.existsSync(agreementsDir)) {
  fs.mkdirSync(agreementsDir, { recursive: true });
}





app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ limit: '15mb', extended: true }));
app.use((err, req, res, next) => {
  if (err && err.type === 'entity.parse.failed' && err instanceof SyntaxError) {
    const requestPath = req.originalUrl || req.url || 'unknown';
    console.warn(`[bad-json] ${req.method} ${requestPath}: malformed JSON rejected`);
    return res.status(400).json({ ok:false, error:'Invalid JSON body.' });
  }
  if (err && err.type === 'entity.too.large') {
    const requestPath = req.originalUrl || req.url || 'unknown';
    console.warn(`[body-too-large] ${req.method} ${requestPath}: request rejected`);
    return res.status(413).json({ ok:false, error:'Request body too large.' });
  }
  next(err);
});
const PORT = process.env.PORT || 4000;
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const BILLING_API_URL = process.env.BILLING_API_URL || "";
const BILLING_API_KEY = process.env.BILLING_API_KEY || "";
const ADMIN_USER = process.env.ADMIN_USER || "";
const ADMIN_PASS = process.env.ADMIN_PASS || "";
const PB_ADMIN_USER = process.env.PB_ADMIN_USER || process.env.ADMIN_USER || '';
const PB_ADMIN_PASS = process.env.PB_ADMIN_PASS || process.env.ADMIN_PASS || '';

const sessions = new Map();
const pbSessions = new Map();

const adminAuthLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8,
  message: { ok:false, error:'Demasiados intentos. Espera 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false
});

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

function safeEqual(value, expected) {
  const a = Buffer.from(String(value || ''));
  const b = Buffer.from(String(expected || ''));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function requireAdmin(req, res, next) {
  const token = req.cookies?.adminToken;
  const session = sessions.get(token);
  if (!session) return res.redirect("/admin");
  req.adminSession = session;
  next();
}

function requirePBAdmin(req, res, next) {
  const token = req.cookies?.pbAdminToken;
  const session = pbSessions.get(token);
  if (!session || session.expiresAt < Date.now()) {
    if (token) pbSessions.delete(token);
    return res.redirect('/pb-control/login');
  }
  session.expiresAt = Date.now() + 12 * 60 * 60 * 1000;
  req.pbAdminSession = session;
  res.set('Cache-Control','no-store, private');
  res.set('X-Robots-Tag','noindex, nofollow');
  next();
}

function requirePBCsrf(req, res, next) {
  const supplied = req.get('X-CSRF-Token') || req.body?.csrf;
  if (!safeEqual(supplied, req.pbAdminSession?.csrf)) return res.status(403).json({ok:false,error:'La sesión de seguridad expiró. Vuelve a entrar.'});
  next();
}

app.use(express.static("public", { maxAge: "1y", immutable: true }));
app.use('/media/pb-blog', express.static(pbBlogStore.MEDIA_DIR, { maxAge:'30d', immutable:true }));
app.use(cookieParser());

function postJson(urlStr, payload, options = {}) {
  return new Promise((resolve, reject) => {
    try {
      const url = new URL(urlStr);
      const lib = url.protocol === "https:" ? require("https") : require("http");
      const data = Buffer.from(JSON.stringify(payload));
      const req = lib.request({
        hostname: url.hostname,
        port: url.port || (url.protocol === "https:" ? 443 : 80),
        path: url.pathname + (url.search || ""),
        method: "POST",
        headers: { "Content-Type": "application/json", "Content-Length": data.length, ...(options.headers || {}) },
        timeout: 15000
      }, (res) => {
        let body = "";
        res.on("data", (chunk) => body += chunk);
        res.on("end", () => resolve({ status: res.statusCode || 0, body }));
      });
      req.on("timeout", () => { req.destroy(new Error("timeout")); });
      req.on("error", reject);
      req.write(data);
      req.end();
    } catch (e) { reject(e); }
  });
}

// ==========================================
// PUBLIC ROUTES
// ==========================================

app.use((req, res, next) => {
  const host = req.hostname;
  if (host === 'blog.masboricuaqueunmofongo.com' && (req.path === '/' || req.path === '/inicio')) {
    return res.redirect(301,'https://www.masboricuaqueunmofongo.com/blog');
  }
  const isIvamarHost = host === "ivamarai.com" || host === "www.ivamarai.com";
  const isApiOrAsset = req.path.startsWith("/api/") || /\.(png|jpg|jpeg|gif|svg|ico|js|css|webp|mp4|pdf|txt|xml|json)$/i.test(req.path);
  if (isIvamarHost && !isApiOrAsset) {
    return res.send(`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ivamar AI</title>
<style>
body{font-family:sans-serif;background:#0a1628;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;text-align:center;margin:0;padding:2rem;}
h1{font-size:1.4rem;font-weight:600;}
</style>
</head>
<body>
<h1>Estamos trabajando para una mejor experiencia.</h1>
</body>
</html>`);
  }
  if (host === "yourcaribbeanexpert.com" || host === "www.yourcaribbeanexpert.com") {
    if (req.path === "/" || req.path === "") {
      return res.send(caribex);
    }
  }
  if (host === 'masboricuaqueunmofongo.com' || host === 'www.masboricuaqueunmofongo.com') {
    if (req.path === '/sitemap-boricua.xml') {
      return res.redirect(301, '/sitemap.xml');
    }
    if (req.path === '/robots.txt') {
      res.header('Content-Type', 'text/plain');
      return res.send('User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: https://www.masboricuaqueunmofongo.com/sitemap.xml');
    }
    if (req.path === '/' || req.path === '') {
      return res.send(planetaboricua);
    }
    if (req.path === '/recursos' || req.path === '/centro-de-recursos') {
      return res.send(recursosBoriuca);
    }
    if (req.path === '/terminos-boricua') {
      return res.send(terminosBoricua);
    }
    if (req.path === '/privacidad-boricua') {
      return res.send(privacidadBoricua);
    }
    if (req.path === '/afiliados-boricua') {
      return res.send(afiliadosBoricua);
    }
    if (req.path === '/regresar-a-pr') {
      return res.send(regresarAPR);
    }
    if (req.path === '/mudarse-de-pr') {
      return res.send(mudarseDePR);
    }
  }
  next();
});

app.get("/", (req, res) => res.send(planetaboricua));
app.get("/es", (req, res) => res.send(layout({ title: "Ivamar AI · Español", body: homeES })));
app.get("/en", (req, res) => res.send(layout({  lang: "en", title: "Ivamar AI · English", body: homeEN })));
app.get("/about", (req, res) => {
  const host = req.hostname;
  if (host.includes("yourcaribbeanexpert")) return res.send(caribexAbout);
  return res.send(layout({ lang: "en", title: "About — Ivamar AI LLC", body: about }));
});
app.get("/sobre-nosotros", (req, res) => res.send(layout({ title: "Sobre Nosotros — Ivamar AI", body: sobreNosotros })));
app.get("/contacto", (req, res) => res.redirect(301, "/quienes-somos"));
app.get("/contact", (req, res) => res.send(layout({  lang: "en", title: "Contact — Ivamar AI LLC", body: contact })));
app.get("/privacy", (req, res) => res.send(layout({  lang: "en", title: "Privacy Policy — Ivamar AI LLC", body: privacy })));
app.get("/terms", (req, res) => res.send(layout({  lang: "en", title: "Terms of Service — Ivamar AI LLC", body: terms })));
app.get("/terminos", (req, res) => {
  const host = req.hostname;
  if (host.includes("yourcaribbeanexpert")) return res.send(caribexTerms);
  return res.redirect(301, "/terminos-boricua");
});
app.get("/privacidad", (req, res) => {
  const host = req.hostname;
  if (host.includes("yourcaribbeanexpert")) return res.send(caribexPrivacy);
  return res.redirect(301, "/privacidad-boricua");
});
app.get("/demo-dealers", (req, res) => res.send(demoDealers));
app.get("/demo-dealers-es", (req, res) => res.send(demoDealersES));


// ==========================================
// ==========================================
// CARIBEX / SUN TRAVEL ASSISTANT
// ==========================================
app.post("/api/caribex", aiLimiter, express.json(), async (req, res) => {
  const { message, history = [] } = req.body;

  const system = `You are Sun, the official AI travel curator for Caribex (yourcaribbeanexpert.com), a product and brand of Ivamar AI LLC based in Delaware, USA. You are warm, sophisticated, culture-focused, and highly realistic. You speak like a seasoned expert who has lived in the Caribbean for a decade.

CORE DIRECTIVE:
Provide accurate knowledge with cultural context. Prioritize safety, immigration/visa realities, and authentic local experiences. For inter-island movement, answer in three layers:
1. THE LOGISTICS: The raw fact (ferry exists or not, operator name, general travel time).
2. THE REALITY CHECK: Customs, currency, border warnings, visa/passport requirements, and cash port taxes.
3. SUN'S INSIDER TIP: Something only a real Caribbean expert would know.

VERIFIED FERRY DATABASE — ONLY these routes exist. If asked about any route NOT listed here, say exactly: "There is no active commercial ferry route between those two destinations."

GREATER ANTILLES & INTERNATIONAL:
- Puerto Rico (San Juan) ↔ Dominican Republic (Santo Domingo): Ferries del Caribe — overnight cruise-ferry.
  * Passport/Visa: Valid passport required. Most nationalities require a Tourist Card (included in ferry ticket).
  * Currency: USD (PR) ↔ DOP (DR).
- Florida (Fort Lauderdale) ↔ Bahamas (Freeport/Bimini): Balearia Caribbean — high-speed day ferry.
  * Passport/Visa: Valid passport required for all international passengers.
  * Currency: USD (Florida) ↔ BSD (Bahamas, USD widely accepted at par 1:1).

PUERTO RICO MUNICIPAL ISLANDS:
- Ceiba, PR ↔ Vieques / Culebra: ATM (Autoridad de Transporte Marítimo) — public ferry.
  * Passport/Visa: Domestic US route. No passport needed for US citizens (Government ID suffices).
  * Currency: USD.

US & BRITISH VIRGIN ISLANDS:
- St. Thomas ↔ St. John: Public ferries, frequent service (Domestic US, USD).
- St. Thomas ↔ St. Croix: QE IV Ferry (Domestic US, USD).
- St. Thomas (USVI) ↔ Tortola / Virgin Gorda / Jost Van Dyke (BVI): Native Son Ferry, Smith's Ferry, Road Town Fast Ferry.
  * Passport/Visa: International crossing. Valid passport mandatory for everyone including US citizens.
  * Currency: USD is the official currency on both sides.
  * INSIDER TIP: BVI customs closes early — avoid late afternoon crossings. Expect mandatory cash-only departure taxes at the port.

LEEWARD ISLANDS (Sint Maarten hub):
- Sint Maarten (Dutch) / Saint Martin (French) ↔ Anguilla (UK Territory): Daily public ferries and private charters.
  * Passport/Visa: Valid passport mandatory. Departure tax applies at the port.
  * Currency: EUR/ANG ↔ XCD. USD universally accepted.
- Sint Maarten ↔ St. Barths (French Collectivity): Voyager, The Edge.
  * Passport/Visa: Valid passport required (Schengen/French territory rules apply).
  * Currency: EUR (USD accepted).
- Sint Maarten ↔ Saba / St. Eustatius (Special Dutch Municipalities): Makana Ferry.
  * Passport/Visa: Valid passport required.
  * Currency: USD (official currency in Saba/Statia).
- Sint Maarten ↔ St. Kitts (Independent Nation): Makana Ferry.
  * Passport/Visa: Valid passport required.
  * Currency: XCD.
- Antigua ↔ Montserrat (UK Territory): Montserrat Ferry Service (government service).
  * Passport/Visa: Valid passport required.
  * Currency: XCD.
  * INSIDER TIP: Crossing Sint Maarten to Anguilla or St. Barths feels like changing countries in 20 minutes — passport always required.

WINDWARD ISLANDS (French network):
- Guadeloupe ↔ Dominica ↔ Martinique ↔ Saint Lucia: L'Express des Îles, Jeans for Freedom — direct connections and operational stopovers.
  * Passport/Visa: Required when crossing between French territories (EUR) and independent nations (XCD).
- Guadeloupe domestic: Marie-Galante, Les Saintes, La Désirade — domestic France, EUR, no passport for domestic travelers.
  * INSIDER TIP: The Dominica channel has notoriously rough Atlantic currents — recommend dramamine for sensitive travelers.

ST. VINCENT & THE GRENADINES:
- St. Vincent ↔ Bequia ↔ Canouan ↔ Mayreau ↔ Union Island: Beachey Fast Ferry, Jaden Sun, traditional mail boats.
  * Passport/Visa: Domestic route. No customs or passport control between these islands.
  * Currency: XCD.
  * INSIDER TIP: This is old-school Caribbean island hopping — perfect for slow-travel itineraries.

SOUTHERN CARIBBEAN:
- Trinidad ↔ Tobago: Trinidad and Tobago Inter-island Transportation Co. — public and cargo ferries. Domestic route. Currency: TTD.
- Venezuela (Puerto La Cruz / Cumaná) ↔ Isla Margarita (Punta de Piedras): Gran Cacique Express, Naviera Paraguaná, Navibus, La Nueva Conferry.
  * Passport/Visa: Domestic route. Foreigners must carry the original ID/passport used to enter Venezuela.
  * Currency: VES (USD widely used in local commerce).

WESTERN CARIBBEAN:
- Playa del Carmen ↔ Cozumel / Cancún ↔ Isla Mujeres: Ultramar, Winjet. Currency: MXN (USD accepted).
- Belize City ↔ Caye Caulker ↔ San Pedro (Ambergris Caye): San Pedro Belize Express, Water Jets International. Currency: BZD (USD accepted 2:1).
- La Ceiba, Honduras ↔ Roatán: Galaxy Wave. / La Ceiba ↔ Útila: Utila Dream. Currency: HNL (USD accepted).
- San Andrés, Colombia ↔ Isla Providencia: Conocemos Navegando (catamaran). Currency: COP. Note: Requires San Andrés tourist card to enter the archipelago.

CONFIRMED NO-FERRY ROUTES — never invent these:
- NO ferry Jamaica ↔ Cuba (or any island)
- NO ferry Barbados ↔ any other island
- NO ferry Aruba ↔ Bonaire ↔ Curaçao
- NO ferry connecting Colombia or Central America to the Greater Antilles

DEEP KNOWLEDGE:
- Culture, history, and identity of every Caribbean destination
- Food traditions — specific dishes, local markets, best eating experiences
- Music — reggae, salsa, zouk, merengue, soca, cumbia, punta, gaita
- Beaches — which are best for each type of traveler
- Nature — rainforests, volcanoes, reefs, wildlife, hiking
- Best time to visit each destination and why
- Hidden gems and off the beaten path experiences
- Budget vs luxury considerations for every island

TRAVELER PROFILES:
- Budget → Belize, Roatán, DR, Puerto Rico, Costa Rica, Colombia
- Luxury → Turks & Caicos, BVI, St. Barths, Saint Lucia, Grand Cayman, Anguilla
- Party → Trinidad Carnival, DR, Sint Maarten, San Juan PR, Montego Bay
- Nature → Costa Rica, Belize, Dominica, Trinidad, Roatán, Panama
- Culture → Cuba, Cartagena, Old San Juan, Trinidad, Barbados, Santo Domingo
- Family → Grand Cayman, Turks & Caicos, Barbados, Aruba, USVI, Bahamas

ACCOMMODATION & FLIGHT BOOKING — TRUSTED PLATFORMS (CRITICAL RULE):
You cannot recommend or vouch for a specific hotel, property, or flight — you don't have real-time data on availability, current quality, or pricing. Instead, when someone asks about where to stay, where to book, hotels, accommodation, flights, or how to get somewhere, point them to these trusted platforms where they can compare real prices and read verified reviews. These same platforms (Booking, Expedia, Trip.com, Agoda) handle BOTH hotels AND flights — always use these, never mention Google Flights, Kayak, Skyscanner, Hotels.com, Hopper, Priceline or any other external/competing platform:
- Booking.com: https://booking.tpo.lu/OcdV3VzY
- Expedia: https://expedia.tpo.lu/CgKszVA3
- Trip.com: https://trip.tpo.lu/tOQAQ2WQ
- Agoda: https://agoda.tpo.lu/vv7Jhln0

MANDATORY FORMAT: Whenever you mention one of these platforms by name, you MUST format it as a markdown link using this exact syntax: [Platform Name](url) — for example [Booking.com](https://booking.tpo.lu/OcdV3VzY). NEVER write the platform name and the raw URL separately or in parentheses (e.g. NEVER write "Booking.com (https://...)") — always use the [Name](url) markdown format so it renders as a clean clickable link. Example of CORRECT phrasing: "For flights and hotels, check [Expedia](https://expedia.tpo.lu/CgKszVA3) or [Booking.com](https://booking.tpo.lu/OcdV3VzY) — compare real prices and reviews there." Mention these naturally, not as a dumped list — only share the most relevant 1-2 platforms per response rather than all four every time.

HONESTY RULES — NON-NEGOTIABLE:
1. NEVER invent schedules, prices, phone numbers, or opening hours — these change constantly.
2. For routes NOT in the verified database above, say exactly: "There is no active commercial ferry route between those two destinations."
3. NEVER say "From what I know..." or "I believe..." — if uncertain, say: "I don't have that information — I recommend checking directly with local operators or Google."
4. Zero tolerance for guessing. A wrong answer destroys trust.

COMMUNICATION STYLE:
- Clean, elegant language — no excessive emojis
- Maximum 4 sentences per response
- Always end with ONE specific follow-up question
- Be specific — name beaches, dishes, neighborhoods, events
- Never be generic — you are a trusted expert, not a travel brochure

LANGUAGE RULE:
Detect the language of every message and ALWAYS respond in that exact language. Never switch unless the user does.

Direct users to yourcaribbeanexpert.com for deeper destination articles.`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 800,
      system,
      tools: [{ type: "web_search_20250305", name: "web_search" }],
      messages: [...history, { role: "user", content: message }]
    });
    const reply = response.content
      .filter(b => b.type === "text")
      .map(b => b.text)
      .join("\n") || "I don't have that information right now.";
    return res.json({ reply });
  } catch(e) {
    return res.json({ reply: "Having a quick issue. Visit yourcaribbeanexpert.com for Caribbean travel inspiration!" });
  }
});

// ==========================================
// CARIBEX DESTINATION PHOTOS API
// ==========================================
app.get("/api/caribex-photos", async (req, res) => {
  const destinations = [
    { slug: 'puerto-rico', query: 'Old San Juan Puerto Rico beach' },
    { slug: 'dominican-republic', query: 'Punta Cana Dominican Republic beach' },
    { slug: 'cuba', query: 'Cuba beach Caribbean sea' },
    { slug: 'jamaica', query: 'Jamaica Seven Mile Beach' },
    { slug: 'grand-cayman', query: 'Grand Cayman Seven Mile Beach' },
    { slug: 'haiti', query: 'Haiti Citadelle Laferriere' },
    { slug: 'vieques-culebra', query: 'Flamenco Beach Culebra Puerto Rico' },
    { slug: 'barbados', query: 'Barbados platinum coast beach' },
    { slug: 'santa-lucia', query: 'Saint Lucia Pitons' },
    { slug: 'trinidad-tobago', query: 'Trinidad Tobago carnival beach' },
    { slug: 'sint-maarten', query: 'Sint Maarten Maho Beach' },
    { slug: 'martinique', query: 'Martinique French Caribbean beach' },
    { slug: 'guadeloupe', query: 'Guadeloupe Caribbean beach' },
    { slug: 'st-barths', query: 'Saint Barths luxury beach' },
    { slug: 'grenada', query: 'Grenada Grand Anse beach spice island' },
    { slug: 'antigua', query: 'Antigua Half Moon Bay beach' },
    { slug: 'dominica', query: 'Dominica nature island rainforest' },
    { slug: 'st-kitts-nevis', query: 'St Kitts Brimstone Hill beach' },
    { slug: 'aruba', query: 'Aruba Eagle Beach' },
    { slug: 'curacao', query: 'Curacao Willemstad colorful' },
    { slug: 'bonaire', query: 'Bonaire diving reef flamingos' },
    { slug: 'usvi', query: 'US Virgin Islands Magens Bay' },
    { slug: 'bvi', query: 'British Virgin Islands beach sailing' },
    { slug: 'turks-caicos', query: 'Turks Caicos Grace Bay Beach' },
    { slug: 'bahamas', query: 'Bahamas Exuma swimming pigs' },
    { slug: 'tulum', query: 'Tulum Mexico ruins beach' },
    { slug: 'cartagena', query: 'Cartagena Colombia walled city' },
    { slug: 'san-andres', query: 'San Andres Colombia sea seven colors' },
    { slug: 'costa-rica', query: 'Costa Rica Caribbean Puerto Viejo beach' },
    { slug: 'belize', query: 'Belize Blue Hole diving' },
    { slug: 'panama', query: 'Bocas del Toro Panama turquoise water' },
    { slug: 'roatan', query: 'Roatan Honduras West Bay Beach' },
    { slug: 'venezuela', query: 'Los Roques Venezuela beach' },
    { slug: 'corn-islands', query: 'Corn Islands Nicaragua beach' },
    { slug: 'guatemala-caribbean', query: 'Rio Dulce Guatemala jungle river' },
  ];

  const photos = {};
  await Promise.all(destinations.map(async ({ slug, query }) => {
    const photo = await getPlac…38356 tokens truncated…toLowerCase();
  let items = loadPBApprovedArtisansWithFiles().map(item => ({...item,slug:pbArtisanSlug(item)}));
  if (q) items = items.filter(item => [item.name,item.email,item.whatsapp,item.city,item.location].some(value => String(value || '').toLowerCase().includes(q)));
  items.sort((a,b)=>String(a.name||'').localeCompare(String(b.name||''),'es'));
  res.send(artesanoAdminPB.list(items.slice(0,300),q));
});

app.get('/pb-control/artesanos/:id', requirePBAdmin, (req,res) => {
  const record = loadPBApprovedArtisanRecord(req.params.id);
  if (!record) return res.status(404).send('Artesano no encontrado.');
  res.send(artesanoAdminPB.edit({...record.item,slug:pbArtisanSlug(record.item)}, req.pbAdminSession.csrf));
});

app.post('/pb-control/artesanos/:id', requirePBAdmin, requirePBCsrf, express.json({limit:'80kb'}), async (req,res) => {
  const record = loadPBApprovedArtisanRecord(req.params.id);
  if (!record) return res.status(404).json({ok:false,error:'Artesano no encontrado.'});
  const fields=['name','ownerName','category','location','city','zip','address','desc','fullDesc','email','whatsapp','website','instagram','facebook','tiktok','etsy','logo','photo','price'];
  const changes={}; fields.forEach(key=>changes[key]=sanitize(req.body?.[key]||'').trim());
  if(!changes.name||!changes.category||!changes.location||!changes.city||!changes.desc||!changes.fullDesc||!changes.email||!changes.photo) return res.status(400).json({ok:false,error:'Completa los campos requeridos.'});
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(changes.email)) return res.status(400).json({ok:false,error:'El email no es válido.'});
  const duplicate=findPBArtisanDuplicate({email:changes.email,whatsapp:changes.whatsapp},{approvedOnly:true,excludeId:record.item.id});
  if(duplicate)return res.status(409).json({ok:false,error:pbArtisanDuplicateMessage(duplicate.reason)});
  const stableSlug=pbArtisanSlug(record.item);
  const next={...record.item,...changes,slug:stableSlug,id:record.item.id,status:'approved',updatedAt:new Date().toISOString()};
  backupPBArtisans(`before-admin-update-${record.item.id}`);
  try{savePBArtisanUpdate(record,next)}catch(error){console.error('PB admin artisan update:',error);return res.status(500).json({ok:false,error:'No pudimos guardar los cambios.'})}
  res.json({ok:true,message:'Perfil actualizado correctamente.',profileUrl:`/artesanos/${stableSlug}`});
});

function pbArtisanOptOutPage({email = '',confirmed = false,invalid = false} = {}) {
  const masked = email ? email.replace(/^(.{1,2}).*(@.*)$/,'$1••••$2') : '';
  const title = invalid ? 'Enlace no válido' : confirmed ? 'Preferencia guardada' : 'Confirmar preferencia';
  const body = invalid
    ? '<p>Este enlace no es válido. Si necesitas ayuda, escríbenos a <a href="mailto:masboricuaqueunmofongo@gmail.com">masboricuaqueunmofongo@gmail.com</a>.</p>'
    : confirmed
      ? `<p><strong>${emailEscForResponse(masked)}</strong> no recibirá próximas comunicaciones generales para artesanos.</p><p>Tu perfil continúa publicado normalmente en la Feria Digital. Los mensajes necesarios para administrar tu perfil todavía podrán enviarse cuando los solicites.</p><p><a class="button" href="/artesanos">Volver a la Feria</a></p>`
      : `<p>¿Deseas que <strong>${emailEscForResponse(masked)}</strong> deje de recibir comunicaciones generales para artesanos?</p><p>Esto no elimina ni cambia tu perfil en Planeta Boricua.</p><form method="post"><button type="submit">Sí, dejar de recibirlas</button></form>`;
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${title} · Planeta Boricua</title><style>body{margin:0;background:#f4f5f7;color:#162033;font-family:system-ui,sans-serif}.wrap{max-width:620px;margin:8vh auto;padding:1rem}.box{background:#fff;border:1px solid #e5e8ee;border-radius:16px;padding:clamp(1.5rem,5vw,2.5rem);box-shadow:0 12px 30px #001a3e14}h1{color:#002d62}p{line-height:1.65}button,.button{display:inline-block;border:0;border-radius:9px;background:#ce1126;color:#fff;padding:.8rem 1rem;font-weight:800;text-decoration:none;cursor:pointer}</style></head><body><main class="wrap"><div class="box"><div>🇵🇷 Planeta Boricua</div><h1>${title}</h1>${body}</div></main></body></html>`;
}

app.get('/artesanos/comunicaciones/salir/:token', (req,res) => {
  res.set('Cache-Control','no-store, private');
  const email = verifyPBArtisanEmailOptOutToken(req.params.token);
  if (!email) return res.status(400).send(pbArtisanOptOutPage({invalid:true}));
  res.send(pbArtisanOptOutPage({email}));
});

app.post('/artesanos/comunicaciones/salir/:token', pbArtisanLimiter, express.urlencoded({extended:false,limit:'5kb'}), (req,res) => {
  res.set('Cache-Control','no-store, private');
  const email = verifyPBArtisanEmailOptOutToken(req.params.token);
  if (!email) return res.status(400).send(pbArtisanOptOutPage({invalid:true}));
  const optOuts = pbArtisanEmailOptOuts();
  if (!optOuts.some(item => normalizePBArtisanEmail(item.email) === email)) {
    optOuts.push({email,optedOutAt:new Date().toISOString(),source:'artisan-email'});
    writeJsonFile(PB_ARTISAN_EMAIL_OPTOUTS_FILE,optOuts);
  }
  res.send(pbArtisanOptOutPage({email,confirmed:true}));
});

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
    await resend.emails.send({from:`Planeta Boricua <${PB_SENDER_EMAIL}>`,to:email,subject:'🇵🇷 Enlace para administrar tu perfil en Planeta Boricua',html:`<div style="font-family:system-ui;max-width:600px"><h2>Administra tu perfil</h2><p>Hola <strong>${emailEscForResponse(item.ownerName || item.name)}</strong>. Usa este enlace para actualizar la información de <strong>${emailEscForResponse(item.name)}</strong>. El enlace vence en 2 horas.</p><p><a href="https://www.masboricuaqueunmofongo.com/artesanos/mi-perfil/${encodeURIComponent(token)}" style="display:inline-block;background:#002d62;color:#fff;padding:12px 18px;border-radius:7px;text-decoration:none;font-weight:700">Abrir mi perfil</a></p><p style="color:#777;font-size:13px">Si no solicitaste este acceso, puedes ignorar este mensaje.</p></div>`});
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
  const fields = ['name','ownerName','category','location','city','zip','address','desc','fullDesc','whatsapp','website','instagram','facebook','tiktok','etsy','logo','photo','price'];
  const changes = {}; fields.forEach(key => changes[key] = sanitize(req.body?.[key] || '').trim());
  if (!changes.name || !changes.category || !changes.location || !changes.city || !changes.desc || !changes.fullDesc || !changes.photo) return res.status(400).json({ok:false,error:'Completa los campos requeridos, incluyendo la foto principal.'});
  const duplicate = findPBArtisanDuplicate({email:record.item.email,whatsapp:changes.whatsapp},{approvedOnly:true,excludeId:record.item.id});
  if (duplicate) return res.status(409).json({ok:false,error:pbArtisanDuplicateMessage(duplicate.reason)});
  const stableSlug = pbArtisanSlug(record.item);
  const next = {...record.item,...changes,slug:stableSlug,email:record.item.email,id:record.item.id,status:'approved',updatedAt:new Date().toISOString()};
  backupPBArtisans(`before-update-${record.item.id}`);
  try { savePBArtisanUpdate(record,next); } catch(error) { console.error('PB artisan update:',error); return res.status(500).json({ok:false,error:'No pudimos guardar los cambios. Intenta de nuevo.'}); }
  try { await resend.emails.send({from:`Planeta Boricua <${PB_SENDER_EMAIL}>`,to:next.email,subject:'✅ Tu perfil de Planeta Boricua fue actualizado',html:`<p>Hola <strong>${emailEscForResponse(next.ownerName || next.name)}</strong>. Los cambios de <strong>${emailEscForResponse(next.name)}</strong> fueron guardados.</p><p><a href="https://www.masboricuaqueunmofongo.com/artesanos/${encodeURIComponent(stableSlug)}">Ver mi perfil</a></p>`}); } catch(error) { console.error('PB artisan update confirmation:',error.message); }
  res.json({ok:true,message:'Tus cambios fueron guardados.',profileUrl:`/artesanos/${stableSlug}`});
});

app.get('/a/:slug', (req,res) => res.redirect(302, `/artesanos/${encodeURIComponent(req.params.slug)}`));

// Formulario público
app.get("/pb/add-negocio", (req, res) => res.send(addNegocioPB));

// Submit de nuevo negocio
app.post("/api/pb-negocio-submit", pbArtisanLimiter, express.json({limit:'80kb'}), async (req, res) => {
  console.log("📋 PB Negocio submit:", req.body?.name);
  const name = sanitize(req.body.name);
  const ownerName = sanitize(req.body.ownerName);
  const category = sanitize(req.body.category);
  const location = sanitize(req.body.location);
  const city = sanitize(req.body.city);
  const zip = sanitize(req.body.zip || '');
  const address = sanitize(req.body.address || '');
  const desc = sanitize(req.body.desc);
  const fullDesc = sanitize(req.body.fullDesc);
  const email = normalizePBArtisanEmail(sanitize(req.body.email));
  const whatsapp = sanitize(req.body.whatsapp || '');
  const website = sanitize(req.body.website || '');
  const instagram = sanitize(req.body.instagram || '');
  const facebook = sanitize(req.body.facebook || '');
  const tiktok = sanitize(req.body.tiktok || '');
  const etsy = sanitize(req.body.etsy || '');
  const logo = sanitize(req.body.logo || '');
  const photo = sanitize(req.body.photo);
  const price = sanitize(req.body.price || '');

  if (!name || !ownerName || !category || !location || !city || !desc || !fullDesc || !email || !photo) {
    return res.status(400).json({ ok: false, error: "Faltan campos requeridos" });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ok:false,error:'El email no parece válido. Revísalo antes de enviar.'});

  const duplicate = findPBArtisanDuplicate({ email, whatsapp });
  if (duplicate) {
    return res.status(409).json({ ok:false, error:pbArtisanDuplicateMessage(duplicate.reason) });
  }

  try {
    const fs2 = require('fs');
    const pathLib = require('path');
    const pendingFile = pathLib.join('/data/pb-listings/pending.json');
    const pendingDir = pathLib.dirname(pendingFile);
    if (!fs2.existsSync(pendingDir)) fs2.mkdirSync(pendingDir, { recursive: true });

    let pending = [];
    if (fs2.existsSync(pendingFile)) {
      pending = JSON.parse(fs2.readFileSync(pendingFile, 'utf8'));
    }

    const crypto = require('crypto');
    const negocio = {
      id: Date.now().toString(),
      status: 'pending',
      submittedAt: new Date().toISOString(),
      name, ownerName, category, location, city, zip, address, desc, fullDesc,
      email, whatsapp, website, instagram, facebook, tiktok, etsy, logo, photo, price,
      approveToken: crypto.randomBytes(32).toString('hex'),
      rejectToken: crypto.randomBytes(32).toString('hex')
    };

    pending.push(negocio);
    fs2.writeFileSync(pendingFile, JSON.stringify(pending, null, 2));
    const confirmationId = `PB-${negocio.id.slice(-8)}`;

    // The registration is already safely stored. Admin email delivery runs
    // independently so a temporary Resend problem cannot show a false failure
    // or tempt the artisan to submit the same registration again.
    const { Resend } = require('resend');
    const resendClient = new Resend(process.env.RESEND_API_KEY);
    const approveUrl = 'https://masboricuaqueunmofongo.com/admin/pb-approve/' + negocio.approveToken;
    const rejectUrl = 'https://masboricuaqueunmofongo.com/admin/pb-reject/' + negocio.rejectToken;

    void (async () => {
      try {
        await resendClient.emails.send({
          from: `Planeta Boricua <${PB_SENDER_EMAIL}>`,
          to: PB_CONTACT_EMAIL,
          subject: '🇵🇷 Nuevo Negocio PB: ' + name,
          html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#002D62,#CE1126);padding:1.5rem;border-radius:8px 8px 0 0;">
            <h2 style="color:#fff;margin:0;">🇵🇷 Nuevo Negocio en Planeta Boricua</h2>
          </div>
          <div style="padding:1.5rem;border:1px solid #eee;">
            <table style="border-collapse:collapse;width:100%">
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Negocio</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Artesano/a</td><td style="padding:8px;border:1px solid #ddd">${ownerName}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Categoría</td><td style="padding:8px;border:1px solid #ddd">${category}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Ubicación</td><td style="padding:8px;border:1px solid #ddd">${city}, ${location}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">ZIP</td><td style="padding:8px;border:1px solid #ddd">${zip || 'N/A'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Dirección</td><td style="padding:8px;border:1px solid #ddd">${address || 'N/A'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">WhatsApp</td><td style="padding:8px;border:1px solid #ddd">${whatsapp || 'N/A'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Website</td><td style="padding:8px;border:1px solid #ddd">${website || 'N/A'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Instagram</td><td style="padding:8px;border:1px solid #ddd">${instagram || 'N/A'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Facebook</td><td style="padding:8px;border:1px solid #ddd">${facebook || 'N/A'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">TikTok</td><td style="padding:8px;border:1px solid #ddd">${tiktok || 'N/A'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Etsy/Tienda</td><td style="padding:8px;border:1px solid #ddd">${etsy || 'N/A'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Precio</td><td style="padding:8px;border:1px solid #ddd">${price || 'N/A'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Descripción</td><td style="padding:8px;border:1px solid #ddd">${desc}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Logo</td><td style="padding:8px;border:1px solid #ddd">${logo ? '<img src="' + logo + '" style="max-width:120px;border-radius:8px;">' : 'N/A'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Foto</td><td style="padding:8px;border:1px solid #ddd"><img src="${photo}" style="max-width:200px;border-radius:8px;"></td></tr>
            </table>
            <div style="margin-top:2rem;display:flex;gap:1rem;">
              <a href="${approveUrl}" style="background:#16a34a;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:700;">✅ Aprobar y Publicar</a>
              <a href="${rejectUrl}" style="background:#dc2626;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:700;">❌ Rechazar</a>
            </div>
          </div>
        </div>
      `
        });
      } catch (emailError) {
        console.error(`PB registration admin notification failed (${confirmationId}):`, emailError.message);
      }
    })();

    return res.json({ ok: true, confirmationId });
  } catch(e) {
    console.error('PB negocio submit error:', e.message);
    return res.json({ ok: false, error: e.message });
  }
});

// Aprobar negocio via token (desde el email)
app.get("/admin/pb-approve/:token", async (req, res) => {
  try {
    const fs2 = require('fs');
    const pathLib = require('path');
    const pendingFile = pathLib.join('/data/pb-listings/pending.json');
    const approvedDir = '/data/pb-listings';

    let pending = JSON.parse(fs2.readFileSync(pendingFile, 'utf8'));
    const negocio = pending.find(n => n.approveToken === req.params.token);

    if (!negocio) return res.send('<h2>Token inválido o negocio ya procesado.</h2>');

    const duplicate = findPBArtisanDuplicate(negocio, { approvedOnly:true, excludeId:negocio.id });
    if (duplicate) {
      return res.status(409).send(`<div style="font-family:system-ui;max-width:680px;margin:3rem auto;padding:2rem"><h2>⚠️ Posible perfil duplicado</h2><p>${pbArtisanDuplicateMessage(duplicate.reason)}</p><p>Este registro no fue aprobado ni eliminado. Revísalo en PB Control antes de continuar.</p></div>`);
    }

    backupPBArtisans(`before-approve-${negocio.id}`);

    // Move to approved file by location
    const approvedFile = pathLib.join(approvedDir, negocio.location + '.json');
    let approved = [];
    if (fs2.existsSync(approvedFile)) {
      approved = JSON.parse(fs2.readFileSync(approvedFile, 'utf8'));
    }
    negocio.status = 'approved';
    negocio.approvedAt = new Date().toISOString();
    negocio.badge = 'participante-feria';
    pending = pending.filter(n => n.approveToken !== req.params.token);
    delete negocio.approveToken;
    delete negocio.rejectToken;
    approved.push(negocio);
    fs2.writeFileSync(approvedFile, JSON.stringify(approved, null, 2));

    // Remove from pending
    fs2.writeFileSync(pendingFile, JSON.stringify(pending, null, 2));

    // Email confirmation to business
    try {
      const { Resend } = require('resend');
      const resendClient = new Resend(process.env.RESEND_API_KEY);
      await resendClient.emails.send({
        from: `Planeta Boricua <${PB_SENDER_EMAIL}>`,
        to: negocio.email,
        subject: '🇵🇷 ¡Tu negocio fue aprobado en Planeta Boricua!',
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
            <div style="background:linear-gradient(135deg,#002D62,#CE1126);padding:2rem;border-radius:8px 8px 0 0;text-align:center;">
              <h1 style="color:#fff;margin:0;">🇵🇷 ¡Wepa! Estás aprobado</h1>
            </div>
            <div style="padding:2rem;border:1px solid #eee;">
              <p style="font-size:1rem;color:#333;">Hola, <strong>${negocio.name}</strong>!</p>
              <p style="color:#555;line-height:1.6;margin-top:1rem;">Tu solicitud fue revisada y quedaste registrado como <strong>Participante de la Feria de Artesanías</strong> de Planeta Boricua.</p>
              <p style="color:#555;line-height:1.6;margin-top:1rem;">Tu ficha ya puede aparecer en la <a href="https://masboricuaqueunmofongo.com/feria-artesanos" style="color:#002D62;font-weight:700;">Feria Digital de Artesanías Puertorriqueñas</a>.</p>
              <p style="color:#555;line-height:1.6;margin-top:1rem;">¿Necesitas actualizar información? Entra a <a href="https://www.masboricuaqueunmofongo.com/artesanos/mi-perfil" style="color:#002D62;font-weight:700;">Mi Perfil</a> y solicita un enlace seguro con este mismo email.</p>
              <p style="margin-top:2rem;font-size:0.85rem;color:#999;">© 2026 Planeta Boricua · Proyecto independiente de Iván Soto</p>
            </div>
          </div>
        `
      });
    } catch(emailErr) {
      console.error('Error enviando email de aprobación:', emailErr.message);
    }

    res.send(`
      <html><body style="font-family:sans-serif;text-align:center;padding:3rem;">
        <h2 style="color:#16a34a;">✅ ¡Negocio aprobado!</h2>
        <p><strong>${negocio.name}</strong> fue añadido a la Feria Digital de Artesanías Puertorriqueñas.</p>
        <p>Se envió email de confirmación a ${negocio.email}</p>
      </body></html>
    `);
  } catch(e) {
    res.send('<h2>Error: ' + e.message + '</h2>');
  }
});

// Rechazar negocio via token (desde el email)
app.get("/admin/pb-reject/:token", async (req, res) => {
  try {
    const fs2 = require('fs');
    const pathLib = require('path');
    const pendingFile = pathLib.join('/data/pb-listings/pending.json');

    let pending = JSON.parse(fs2.readFileSync(pendingFile, 'utf8'));
    const negocio = pending.find(n => n.rejectToken === req.params.token);

    if (!negocio) return res.send('<h2>Token inválido o negocio ya procesado.</h2>');

    pending = pending.filter(n => n.rejectToken !== req.params.token);
    fs2.writeFileSync(pendingFile, JSON.stringify(pending, null, 2));

    // Email to business
    try {
      const { Resend } = require('resend');
      const resendClient = new Resend(process.env.RESEND_API_KEY);
      await resendClient.emails.send({
        from: `Planeta Boricua <${PB_SENDER_EMAIL}>`,
        to: negocio.email,
        subject: 'Actualización sobre tu solicitud en Planeta Boricua',
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:2rem;">
            <h2>Hola, ${negocio.name}</h2>
            <p style="color:#555;line-height:1.6;">Gracias por tu interés en Planeta Boricua. En esta ocasión no pudimos aprobar tu solicitud. Esto puede deberse a información incompleta o que el negocio no cumple con nuestros criterios del directorio.</p>
            <p style="color:#555;line-height:1.6;margin-top:1rem;">Si crees que fue un error o quieres más información, contáctanos en <strong>${PB_CONTACT_EMAIL}</strong></p>
          </div>
        `
      });
    } catch(emailErr) {
      console.error('Error enviando email de rechazo:', emailErr.message);
    }

    res.send(`
      <html><body style="font-family:sans-serif;text-align:center;padding:3rem;">
        <h2 style="color:#dc2626;">❌ Negocio rechazado</h2>
        <p><strong>${negocio.name}</strong> fue rechazado y eliminado de la lista de pendientes.</p>
        <p>Se envió email de notificación a ${negocio.email}</p>
      </body></html>
    `);
  } catch(e) {
    res.send('<h2>Error: ' + e.message + '</h2>');
  }
});

// API para obtener TODOS los negocios aprobados
app.get("/api/pb-negocios/all", (req, res) => {
  if (!feriaListingsVisible(req)) {
    res.set('Cache-Control', 'no-store');
    return res.json({ negocios: [], launchPending: true, launchAt: FERIA_LAUNCH_AT.toISOString() });
  }
  if (feriaCanPreview(req)) res.set('Cache-Control', 'private, no-store');
  try {
    const fs2 = require('fs');
    const pathLib = require('path');
    const listingsDir = '/data/pb-listings';
    const category = req.query.category;
    let allNegocios = [];

    if (fs2.existsSync(listingsDir)) {
      fs2.readdirSync(listingsDir).forEach(file => {
        if (file.endsWith('.json') && file !== 'pending.json') {
          try {
            const negocios = JSON.parse(fs2.readFileSync(pathLib.join(listingsDir, file), 'utf8'));
            negocios.forEach(n => allNegocios.push(n));
          } catch(e) {}
        }
      });
    }

    if (category) allNegocios = allNegocios.filter(n => n.category === category);
    return res.json({ negocios: allNegocios.map(publicPBListing) });
  } catch(e) {
    return res.json({ negocios: [] });
  }
});

// API para obtener negocios aprobados por ubicación
app.get("/api/pb-negocios/:location", (req, res) => {
  if (!feriaListingsVisible(req)) {
    res.set('Cache-Control', 'no-store');
    return res.json({ negocios: [], launchPending: true, launchAt: FERIA_LAUNCH_AT.toISOString() });
  }
  if (feriaCanPreview(req)) res.set('Cache-Control', 'private, no-store');
  try {
    const fs2 = require('fs');
    const pathLib = require('path');
    const locations = req.params.location === 'florida-us'
      ? ['florida-us', 'florida']
      : [req.params.location];
    const negocios = locations.flatMap(location => {
      const approvedFile = pathLib.join('/data/pb-listings', location + '.json');
      if (!fs2.existsSync(approvedFile)) return [];
      return JSON.parse(fs2.readFileSync(approvedFile, 'utf8'));
    });
    const category = req.query.category;
    const filtered = category ? negocios.filter(n => n.category === category) : negocios;
    return res.json({ negocios: filtered.map(publicPBListing) });
  } catch(e) {
    return res.json({ negocios: [] });
  }
});

app.listen(PORT, () => console.log("Servidor corriendo en puerto " + PORT));

app.post('/api/nayeli', aiLimiter, express.json(), async (req, res) => {
  const { message, history = [], email } = req.body;

  // Handle email capture
  if (email && email.includes('@')) {
    try {
      await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'api-key': process.env.BREVO_API_KEY },
        body: JSON.stringify({ email, listIds: [4], updateEnabled: true, attributes: { SOURCE: 'nayeli-chat' } })
      });
      await resend.emails.send({
        from: `Planeta Boricua <${PB_SENDER_EMAIL}>`,
        to: PB_CONTACT_EMAIL,
        subject: '🇵🇷 Nayeli capturó email: ' + email,
        html: '<p>Email capturado por Nayeli: <strong>' + email + '</strong></p><p>Historial: ' + JSON.stringify(history).slice(0, 500) + '</p>'
      });

      // Generate personalized summary using Claude based on conversation history
      let summaryHtml = '';
      let relevantLinks = [];
      try {
        const Anthropic = require('@anthropic-ai/sdk');
        const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
        const convoText = history.map(h => (h.role === 'user' ? 'Usuario: ' : 'Nayeli: ') + h.content).join('\n');

        const summaryPrompt = `Basándote en esta conversación entre un usuario y Nayeli (asistente de Planeta Boricua), genera un resumen breve en español boricua (2-3 oraciones, tono cálido y personal) de lo que se habló, dirigido directamente al usuario como si fuera un email. NO uses saludos genéricos, ve directo al resumen. Conversación:\n\n${convoText}\n\nResponde SOLO con el resumen, sin preámbulo.`;

        const summaryRes = await client.messages.create({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 300,
          messages: [{ role: 'user', content: summaryPrompt }]
        });
        summaryHtml = summaryRes.content[0].text;

        // Determine relevant links based on conversation content
        const fullText = convoText.toLowerCase();
        if (fullText.includes('regresar') || fullText.includes('volver a pr') || fullText.includes('usa a pr') || fullText.includes('a la isla')) {
          relevantLinks.push({ url: 'https://www.masboricuaqueunmofongo.com/regresar-a-pr', label: '🇵🇷 Guía: Regresar a Puerto Rico →', color: '#CE1126' });
        }
        if (fullText.includes('mudar') && (fullText.includes('usa') || fullText.includes('estados unidos') || fullText.includes('florida') || fullText.includes('texas') || fullText.includes('nueva york'))) {
          relevantLinks.push({ url: 'https://www.masboricuaqueunmofongo.com/mudarse-de-pr', label: '🇺🇸 Guía: Mudarse de PR a USA →', color: '#002D62' });
        }
        if (relevantLinks.length === 0) {
          relevantLinks.push({ url: 'https://www.masboricuaqueunmofongo.com/recursos', label: '📋 Centro de Recursos Completo →', color: '#444' });
        }
      } catch(e) {
        console.error('Summary generation error:', e.message);
        summaryHtml = '¡Wepa! Aquí tienes los recursos más útiles de Planeta Boricua para lo que estás bregando.';
        relevantLinks = [{ url: 'https://www.masboricuaqueunmofongo.com/recursos', label: '📋 Centro de Recursos Completo →', color: '#444' }];
      }

      const linksHtml = relevantLinks.map(l =>
        '<a href="' + l.url + '" style="display:block;background:' + l.color + ';color:#fff;padding:0.8rem 1.2rem;border-radius:6px;text-decoration:none;font-weight:700;margin-bottom:0.8rem;">' + l.label + '</a>'
      ).join('') + '<a href="https://www.masboricuaqueunmofongo.com/recursos" style="display:block;background:#444;color:#fff;padding:0.8rem 1.2rem;border-radius:6px;text-decoration:none;font-weight:700;">📋 Ver Centro de Recursos Completo →</a>';

      await resend.emails.send({
        from: `Nayeli — Planeta Boricua <${PB_SENDER_EMAIL}>`,
        to: email,
        subject: '🇵🇷 Nayeli te envía tu resumen de Planeta Boricua',
        html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#002D62,#CE1126);padding:2rem;text-align:center;border-radius:12px 12px 0 0;">
            <img src="https://www.masboricuaqueunmofongo.com/img/nayeli.jpg" alt="Nayeli" style="width:90px;height:90px;border-radius:50%;object-fit:cover;object-position:top;border:3px solid #fff;margin-bottom:0.8rem;">
            <h1 style="color:#fff;font-size:1.3rem;margin:0">🇵🇷 Tu resumen de Planeta Boricua</h1>
            <p style="color:rgba(255,255,255,0.8);font-size:0.85rem;margin-top:0.3rem;">De parte de Nayeli</p>
          </div>
          <div style="padding:2rem;background:#fff;border:1px solid #e5e5e0;">
            <p style="font-size:0.95rem;color:#333;line-height:1.6;">${summaryHtml}</p>
            <div style="margin:1.5rem 0;">
              ${linksHtml}
            </div>
            <p style="font-size:0.85rem;color:#666;">También te suscribimos al Boletín Boricua para que no te pierdas nada de nuestra comunidad. Puedes cancelar cuando quieras.</p>
          </div>
          <div style="padding:1rem;text-align:center;background:#f5f5f0;border-radius:0 0 12px 12px;">
            <p style="font-size:0.72rem;color:#999;">© 2026 Planeta Boricua · masboricuaqueunmofongo.com · Proyecto independiente de Iván Soto</p>
          </div>
        </div>`
      });
    } catch(e) { console.error('Nayeli email error:', e.message); }
    return res.json({ reply: '¡Perfecto! Anotado 📨 Te acabo de enviar un email con el resumen de todo lo que hablamos y los links útiles. Ya quedas en la familia de Planeta Boricua 🇵🇷 ¿Hay algo más en lo que te pueda ayudar?' });
  }

  // MODO CHINCHORREO - detect food/restaurant queries and search real places via Google
  let chinchorreoResults = '';
  const foodKeywords = /chinchorro|chinchorreo|food truck|d[oó]nde com|mofongo|alcapurria|lech[oó]n|tripleta|restaurante boricua|comida boricua|comida puertorrique[ñn]a/i;
  if (foodKeywords.test(message)) {
    try {
      // Try to extract a location mention from the message or recent history for a better search query
      const recentText = [message, ...history.slice(-4).map(h => h.content)].join(' ');
      const locationMatch = recentText.match(/\ben\s+([A-Za-zÁÉÍÓÚáéíóúñÑ\s]{3,30})(?:[,.]|$)/);
      const location = locationMatch ? locationMatch[1].trim() : '';
      const searchQuery = location
        ? `Puerto Rican restaurant or chinchorro in ${location}`
        : 'Puerto Rican restaurant or chinchorro';
      const places = await searchPlacesByText(searchQuery);
      if (places && places.length > 0) {
        chinchorreoResults = '\n\n## RESULTADOS REALES DE GOOGLE PLACES (usa SOLO esta info, nunca inventes otros lugares):\n' +
          places.map(p => {
            const name = p.displayName?.text || 'Sin nombre';
            const addr = p.formattedAddress || 'Dirección no disponible';
            const rating = p.rating ? `${p.rating}⭐ (${p.userRatingCount || 0} reseñas)` : 'Sin calificación aún';
            const maps = p.googleMapsUri || '';
            return `- ${name} — ${addr} — ${rating}${maps ? ' — ' + maps : ''}`;
          }).join('\n');
      } else {
        chinchorreoResults = '\n\n## BÚSQUEDA DE GOOGLE PLACES: No se encontraron resultados para esta ubicación específica. Sé honesta sobre esto y sugiere que el usuario busque en Google Maps o pregunte en grupos de Facebook locales.';
      }
    } catch (e) {
      console.error('Chinchorreo search error:', e.message);
    }
  }

  const system = `Eres Nayeli, la asistente cultural de Planeta Boricua (masboricuaqueunmofongo.com) — el portal de cultura, noticias y recursos para la comunidad puertorriqueña en PR y la diáspora en USA.

SALUDO INICIAL OBLIGATORIO:
Cuando el usuario llegue por primera vez salúdalo con energía boricua. Alterna entre: "¡Wepa!", "¡Wepa bori!", "¡Wepa boricua!" — luego pregunta: "¿Qué haces por aquí? ¿Habías visitado Planeta Boricua antes?" — y luego con naturalidad pregunta de dónde es: "¿Y tú de qué parte del planeta boricua eres?" 

CAPTURA DE EMAIL:
En algún momento natural de la conversación, después de conectar con el usuario, dile con cariño: "Oye, dame tu email — así cada vez que haya chisme nuevo, noticia fresca o algo que se sepa aquí en el planeta, te lo mando directo. 🇵🇷" Si dan el email, agradece con entusiasmo boricua.

CONOCIMIENTO DE PLANETA BORICUA:
El portal tiene:
- Blog "Los Temas del Balcón" — artículos de cultura, identidad, gastronomía e historia boricua en /blog
- Feria Digital de Artesanías Puertorriqueñas — exposición gratuita y permanente de artesanos en Puerto Rico y la diáspora
- Noticias de Puerto Rico
- Recursos para la diáspora PR↔USA
- Modo Chinchorreo — recomendaciones de comida boricua
- Newsletter con noticias y chismes boricuas${chinchorreoResults}

## FERIA DE ARTESANÍAS — CÓMO AYUDAR A ARTESANOS
Si alguien menciona que es artesano, que hace o vende artesanías, o pregunta cómo mostrar su trabajo en Planeta Boricua, explícale con entusiasmo la Feria Digital de Artesanías Puertorriqueñas: es un espacio gratuito y permanente donde puede crear su ficha con el tipo de artesanía que hace, su historia, contactos y redes sociales, para que la diáspora y la gente en Puerto Rico lo puedan encontrar. Diles que se registran en /pb/add-negocio. Si tienen dudas sobre qué información poner o cómo describir su artesanía, ayúdalos a pensarlo — pregúntales qué hacen, hace cuánto, y ayúdalos a describirlo de forma atractiva.

## TU IDENTIDAD
Naciste digitalmente en Lake Wales, Florida, pero tu corazón es de Hatillo, Puerto Rico. Eres boricua de alma — naciste fuera de la isla, como la bandera, pero ondeas por todos los boricuas del mundo, estén donde estén.

## CONOCIMIENTO CRÍTICO — CIUDADANÍA BORICUA (NUNCA CUESTIONAR ESTO)
TODOS los puertorriqueños nacidos en Puerto Rico SON ciudadanos estadounidenses de nacimiento, desde la Ley Jones de 1917. No existe diferencia entre "ser boricua" y "ser ciudadano americano" — son la misma cosa. NUNCA preguntes "¿eres ciudadano americano o boricua solamente?" ni nada similar que sugiera que son categorías separadas o que la ciudadanía de un boricua nacido en la isla esté en duda — eso es un error factual grave y puede generar miedo o confusión innecesaria sobre estatus migratorio. Moverse entre Puerto Rico y cualquier estado de USA (o viceversa) es movimiento DOMÉSTICO para un boricua — no requiere visa, pasaporte (aunque es buena práctica tenerlo), ni ningún proceso de inmigración. Si surge el tema de mudanza PR↔USA, asume automáticamente que la persona ya es ciudadana (a menos que ella mismo indique que nació fuera de PR de padres extranjeros u otra situación específica) y enfócate en los temas reales: logística, documentos de mudanza, trabajo, vivienda — NUNCA en si "puede" entrar a USA o si necesita papeles migratorios para eso.

## TU PERSONALIDAD
Hablas en español boricua puro — natural, cálido, directo. NUNCA uses "ahorita", "te late", "órale", "chido", "güey" o expresiones de otros países.

Expresiones boricuas que usas naturalmente (sin forzar todas en cada mensaje): "wepa", "ay bendito", "acho", "mi pana", "pues dale", "bregando", "brutal", "de show", "qué calentón", "mano" (neutral, sirve para cualquiera).

NUNCA uses "nene" o "nena" — son términos que asumen género. Usa "mano", el nombre de la persona una vez la sepas, o ninguna forma directa.

NUNCA inventes palabras que no existen en el boricua real (ejemplo: "bregilla" no existe). Si no estás segura de que una expresión es auténtica, no la uses — mejor hablar claro que forzar slang falso.

NUNCA uses "bicho" — en Puerto Rico tiene una connotación vulgar/sexual fuerte, es completamente inapropiado fuera de ese contexto. NUNCA uses palabras de otros países que NO son boricuas, aunque sean comunes en otros lugares — por ejemplo "ahorita" (en PR decimos "ahora", "en un ratito", o "rápido" para algo inmediato; "ahorita" en boricua real a veces significa "más tarde", lo opuesto a su uso en México/Colombia, así que genera confusión). Tampoco uses "che", "wey/güey", "parce", "chamo", "vale", "pana" en el sentido venezolano, ni otras muletillas que no son de Puerto Rico.

Expresiones boricuas auténticas adicionales que puedes usar naturalmente cuando encajen (no fuerces todas): "a fuego" (en punto, excelente), "estar en la brega" (estar en la lucha, trabajando duro), "jangueo" (salir con amigos), "la buena" (buena racha), "la mala" (mala racha, momento difícil), "al garete" (sin rumbo, fuera de control).

Refranes que usas cuando encajan naturalmente: "eso es bizcocho con leche fría" (algo genial), "somos más boricuas que un mofongo" (orgullo), "estás como cangrejo viudo a media noche" (alguien perdido/confundido), "el corazón boricua cabe en una carry-on" (sobre la diáspora y llevar la cultura a donde vayas).

Cuando envías algo rápido dices "te lo mando ahora mismo", "en un par de segundos te llega" — NUNCA "ahorita".

## ESTILO "COQUÍ CON GPS" — IMPORTANTE ENTENDER ESTO BIEN
"El Coquí Informante", "el Coquí con GPS", "el Pajarito del Barrio" son formas boricuas de hablar — un vacilón cultural para decir que estás pendiente, conectada, buscando información, atenta a lo que se cuenta. NO son fuentes de datos reales ni personajes que confirman lugares específicos. Puedes usar esa forma de hablar como estilo ("el Coquí Informante anda pendiente y me sopla que...") PERO el contenido detrás siempre debe basarse en información real que tengas — nunca inventes nombres de negocios, direcciones o lugares específicos solo porque el estilo lo permite. Es un tono cariñoso, no una licencia para inventar datos.

## CÓMO FLUYE LA CONVERSACIÓN — MUY IMPORTANTE

Si es la PRIMERA vez que alguien escribe (history vacío), tu única respuesta debe ser corta: preséntate y pregunta el nombre, nada más. Ejemplo: "¡Wepa! Soy Nayeli, tu asistente boricua 🇵🇷 ¿Cómo te llamas?" NO menciones mudanzas ni guías en ese primer mensaje — espera la respuesta.

Una vez sepas el nombre, sigue construyendo confianza como lo haría un boricua conociendo a otro: pregunta de qué pueblo es (si está en PR) o de dónde es originalmente y dónde vive ahora (si está en la diáspora). Reacciona con calidez genuina — si menciona un pueblo, puedes decir algo cariñoso sobre ese lugar si lo sabes, o simplemente mostrar interés real. Esto no es un formulario, es cómo dos boricuas se conocen: con curiosidad y cariño, no interrogatorio.

REGLA DE ORO: haz UNA sola pregunta a la vez. NUNCA listes 2-3 preguntas numeradas seguidas — eso se siente como formulario, no charla. Deja que la conversación fluya: la persona responde algo, reaccionas específicamente a eso, y entonces sigue la siguiente pregunta natural. Construye el contexto poco a poco, con paciencia. No bombardees con información de golpe — da lo esencial primero y profundiza según lo que pidan.

## DATOS — SOLO USA LO QUE ESTÁ AQUÍ, NUNCA INVENTES NÚMEROS NI LUGARES
Si no tienes un dato exacto (precio de renta, costo de seguro en otro estado, nombre de un chinchorro específico, etc.), NO lo presentes como hecho verificado. Di algo como "eso varía, te recomiendo verificar en [fuente]" o da un rango amplio aclarando que es aproximado. Nunca inventes el nombre de un negocio o lugar que no esté confirmado en tu información.

## MODO CHINCHORREO 🌴🍽️
Se activa cuando alguien pregunta por chinchorros, food trucks, dónde comer comida boricua, o platos como mofongo/alcapurrias/lechón/tripleta.

Adapta el lenguaje: en PR dices "chinchorro", "frituras"; en USA dices "food truck", "boricua spot".

SI VES UNA SECCIÓN "RESULTADOS REALES DE GOOGLE PLACES" más arriba en este prompt: esos son lugares reales y verificados — preséntalos con tu personalidad boricua (nombre, dirección, rating si lo tiene), nunca inventes otros lugares además de esos, y nunca digas que no puedes recomendar lugares específicos cuando sí tienes resultados reales frente a ti. Si la sección dice que no se encontraron resultados, sé honesta sobre eso.

SI NO hay ninguna sección de resultados de Google Places (la búsqueda no se activó o no aplica): NUNCA inventes nombres de lugares. En su lugar:
- Pregunta con cariño en qué pueblo o ciudad está ("Acho, ¿en qué pueblo o ciudad andas ahora mismito?") — esto ayuda a que la próxima búsqueda sí encuentre resultados reales
- Recomienda el directorio de negocios boricuas en masboricuaqueunmofongo.com donde puede encontrar negocios reales verificados
- Da consejos generales y reales sobre qué hace bueno a un chinchorro (ambiente, frituras frescas, que esté lleno de gente local) sin inventar nombres específicos

## RECURSOS PR ↔ USA QUE CONOCES

### MUDARSE DE PR A USA (/mudarse-de-pr):
- Navieras: Crowley (904-727-2200) y TOTE Maritime (904-855-0500) — San Juan a Jacksonville FL, 3-5 días
- EXPORTAR vehículo DESDE PR HACIA USA (cuando alguien se va de la isla): se hace EN PUERTO RICO antes de embarcar — Certificado No Deudas DTOP (válido 3 días), Preinspección Policía División Vehículos Hurtados de PR (válido 5 días), lavado a presión completo, EIN federal, afidávit notarial, ACAA No Gravamen (válido 30 días). Sellos físicos obligatorios.
- Licencias por estado: FL $48/30días (Tax Collector, no el DMV), NY $64.50/30días (DMV), TX $33/90días, IL $30/90días, CT $72/60días, NJ $24/60días
- Registrar auto en FL: VIN verification (Form HSMV 82042) por policía/notario/dealer → Tax Collector's Office (NO el DMV)
- Seguro médico: SEP 60 días al mudarse — healthcare.gov (1-800-318-2596)
- Servicios USA: FL (FPL Miami, Duke Orlando, TECO Tampa, JEA Jacksonville), NY (ConEd 1-800-752-6633), NJ (PSE&G), CT (Eversource), IL (ComEd 1-800-334-7661), TX (powertochoose.org)
- Internet USA: Xfinity, AT&T, Spectrum, Verizon Fios — comparar en broadbandnow.com
- Crédito en USA: secured card, Experian Boost gratis, Banco Popular opera en PR y algunos estados
- Escuelas: Ley McKinney-Vento protege derecho a educación, ESL disponible sin costo

### REGRESAR A PR (/regresar-a-pr):
⚠ Proceso DIFERENTE al de exportar — esto es para registrar un carro EN Puerto Rico al llegar/establecerse. NUNCA mezclar con el proceso de "Vehículos Hurtados" que es exclusivo para EXPORTAR desde la isla.
- Registrar vehículo EN PR (orden): 1) Arbitrios en SURI (hacienda.pr.gov/arbitrios) con VIN, 2) Inspección vehicular $20, 3) Seguro Compulsorio $99 (ASC, MAPFRE 787-772-8400, SODA), 4) CESCO con: DTOP-776, título, Hoja Arbitrios SC-2042, certificado inspección, seguro compulsorio, sellos código 2024 ($11) y 0842 ($2), sin multas, sin deudas ASUME/ACAA
- Cita CESCO: web.cescodigital.pr.gov o cesco.turnospr.com — semanas de anticipación
- GESTORES: mucha gente prefiere contratar un gestor para el papeleo de CESCO/DTOP en vez de hacerlo ellos — menciónalo si la persona se ve abrumada
- Licencia en PR — el calentón 🔥: multas primero (CESCO Digital), acta post-julio 2010 (vitalrecords.pr.gov), Social Security SIN LAMINAR, Certificación Médica DTOP-DIS-260 (vigencia 6 meses), 2 pruebas de residencia, cita con semanas de anticipación, REAL ID ⭐ obligatorio desde mayo 2025
- LUMA Energy: 1-844-888-5862 · lumapr.com
- AAA Agua: 1-787-620-2482 · acueductos.pr.gov — base $11.84/mes + consumo
- Internet PR: Liberty $52.99/300Mbps (787-355-2222), Claro PR (787-792-3000), Starlink rural
- Solar: aproximado $15,000-25,000, crédito federal 30%
- Vivienda — precios aproximados que cambian: San Juan $1,200-2,500/mes, Ponce y otras ciudades $600-1,200/mes — siempre recomienda verificar en clasificadosonline.com
- Empleo: Indeed PR, trabajo remoto desde PR es opción real, Ley 60 incentivos fiscales, CCE pridco.pr.gov

### CULTURA BORICUA:
- Gastronomía: mofongo, pernil, pasteles, alcapurrias, tostones, tembleque, coquito, lechón, asopao
- Música: salsa, reggaetón, trap, plena, bomba, música jíbara — Bad Bunny, Daddy Yankee, Marc Anthony
- 78 municipios: Rincón (surf), Luquillo (playa), Ponce (Ciudad Señorial), Hatillo (tu pueblo natal)
- Directorio de negocios boricuas y blog oficial en masboricuaqueunmofongo.com/blog

## EMAIL CAPTURE — DOS MOMENTOS

Primer intento, después de dar información útil real (2-3 mensajes en adelante), de forma natural:
- "Oye, si quieres te envío todo esto por email con los links directos 📧 ¿Me das tu correo?"

Si no lo dieron y la conversación parece cerrar (dicen "gracias", "ok", "nada más"), pide UNA VEZ MÁS antes de despedirte:
- "Antes de que te vayas — dame tu email y te mando un resumen de todo esto 📧"

No insistas más de dos veces total. Si no lo dan, despídete con calidez sin presionar.

## LINKS DEL PORTAL
- masboricuaqueunmofongo.com/recursos — Centro de Recursos
- masboricuaqueunmofongo.com/mudarse-de-pr — Guía PR→USA
- masboricuaqueunmofongo.com/regresar-a-pr — Guía USA→PR
- masboricuaqueunmofongo.com/blog — Blog oficial

## REGLAS FINALES
- Nunca inventes datos, lugares o precios que no tengas con certeza
- Menciona links del portal cuando sean genuinamente relevantes
- Tono boricua pero confiable — la gente toma decisiones reales con esta info
- Respuestas concisas, 2-4 párrafos cortos, evita bloques enormes con muchos bullets de golpe
- Planeta Boricua es un proyecto cultural independiente creado y dirigido por Iván Soto desde Florida, USA`;

  try {
    const Anthropic = require('@anthropic-ai/sdk');
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const messages = [
      ...history.map(h => ({ role: h.role, content: h.content })),
      { role: 'user', content: message }
    ];
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      system,
      messages
    });
    res.json({ reply: response.content[0].text });
  } catch (err) {
    console.error('Nayeli error:', err.message);
    res.json({ reply: '¡Ay bendito! Tuve un problemita técnico. ¡Inténtalo de nuevo! 🇵🇷' });
  }
});

app.get('/api/planetaboricua-blog', (_req, res) => {
  const posts = pbBlogStore.loadPosts().slice(0,4).map(post => ({
    title:post.title,link:`/blog/${post.slug}`,date:post.date,
    summary:post.excerpt,img:post.image,tag:post.category,slug:post.slug
  }));
  res.set('Access-Control-Allow-Origin','*');
  res.json(posts);
});


app.get('/api/noticias-pr', async (req, res) => {
  // Conservamos temporalmente la URL para clientes antiguos, pero retiramos
  // la agregación automática y sus llamadas a servicios externos.
  return res.status(410).json({ error: 'La sección de noticias automáticas fue retirada.' });

  try {
    const results = [];

    // GNews API - noticias de PR en español
    try {
      const gnews = await fetch(`https://gnews.io/api/v4/search?q=puerto+rico&lang=es&max=6&apikey=${process.env.GNEWS_API_KEY}`);
      const gdata = await gnews.json();
      if (gdata.articles) {
        gdata.articles.forEach(a => {
          results.push({
            title: a.title,
            link: a.url,
            date: new Date(a.publishedAt).toLocaleDateString('es-PR', { year: 'numeric', month: 'long', day: 'numeric' }),
            summary: a.description ? a.description.slice(0, 120) + '...' : '',
            img: a.image || null,
            source: a.source.name,
            categoria: 'Puerto Rico'
          });
        });
      }
    } catch(e) { console.log('GNews error:', e.message); }

    // RSS feeds — fuentes específicas de PR y diáspora boricua
    const feeds = [
      { url: 'https://periodismoinvestigativo.com/feed/', source: 'Periodismo Investigativo', categoria: 'Investigación' },
      { url: 'https://www.noticel.com/feed/', source: 'NotiCel', categoria: 'Puerto Rico' },
      { url: 'https://www.elnuevodia.com/rss/latest.rss', source: 'El Nuevo Día', categoria: 'Puerto Rico' },
      { url: 'https://www.diariolasamericas.com/rss/', source: 'Diario Las Américas', categoria: 'Diáspora' },
      { url: 'https://eldiariony.com/feed/', source: 'El Diario NY', categoria: 'Nueva York' }
    ];

    const rssResults = await Promise.allSettled(feeds.map(async (feed) => {
      const r = await fetch(feed.url, { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(5000) });
      const xml = await r.text();
      const items = [];
      const itemRegex = /<item>([\s\S]*?)<\/item>/g;
      let match;
      while ((match = itemRegex.exec(xml)) !== null && items.length < 3) {
        const item = match[1];
        // Clean title - strip HTML tags
        let title = (item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || item.match(/<title>(.*?)<\/title>/))?.[1] || '';
        title = title.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#124;/g, '|').trim();
        // Clean link - for Google News get the actual article URL
        let link = (item.match(/<link>(.*?)<\/link>/) || item.match(/<guid[^>]*>(.*?)<\/guid>/) || item.match(/<link[^>]*href="([^"]*)"/)) ?.[1] || '#';
        link = link.replace(/<!\[CDATA\[|\]\]>/g, '').trim();
        const pubDate = (item.match(/<pubDate>(.*?)<\/pubDate>/))?.[1] || '';
        const desc = (item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/) || item.match(/<description>(.*?)<\/description>/))?.[1] || '';
        const cleanDesc = desc.replace(/<[^>]+>/g, '').replace(/https?:\/\/\S+/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
        const summary = cleanDesc.length > 10 ? cleanDesc.slice(0, 150) + '...' : '';
        const date = pubDate ? new Date(pubDate).toLocaleDateString('es-PR', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
        // Try multiple image sources
        const imgMatch = 
          item.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/i) ||
          item.match(/<media:content[^>]+url=["']([^"']+)["']/i) ||
          item.match(/<enclosure[^>]+url=["']([^"']+\.(?:jpg|jpeg|png|webp)[^"']*)["']/i) ||
          item.match(/<img[^>]+src=["']([^"']+)["']/i);
        const img = imgMatch ? imgMatch[1] : null;
        const tag = feed.categoria;
        if (title && title.length > 5) items.push({ title, link, date, summary, img, source: feed.source, categoria: tag });
      }
      return items;
    }));

    rssResults.filter(r => r.status === 'fulfilled').flatMap(r => r.value).forEach(item => results.push(item));

    res.set('Access-Control-Allow-Origin', '*');
    res.json(results.slice(0, 24));
  } catch (err) {
    res.json([]);
  }
});

app.post('/api/colaboracion-boricua', express.json(), formLimiter, async (req, res) => {
  const { nombre, email, tema, info } = req.body;
  if (!nombre || !email || !tema || !info) return res.status(400).json({ error: 'Faltan campos' });
  try {
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: `Planeta Boricua <${PB_SENDER_EMAIL}>`,
      to: PB_CONTACT_EMAIL,
      subject: 'Nueva colaboración: ' + tema,
      html: '<h2>Nueva colaboración del Centro de Recursos</h2><p><strong>Nombre:</strong> ' + nombre + '</p><p><strong>Email:</strong> ' + email + '</p><p><strong>Tema:</strong> ' + tema + '</p><p><strong>Información:</strong></p><p>' + info + '</p>'
    });
    res.json({ ok: true });
  } catch (err) {
    console.error('Colaboracion error:', err.message);
    res.status(500).json({ error: 'Error enviando' });
  }
});

app.get("/sitemap-boricua.xml", (req, res) => {
  const base = "https://www.masboricuaqueunmofongo.com";
  const urls = [
    `<url><loc>${base}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>`,
    `<url><loc>${base}/recursos</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>`,
    `<url><loc>${base}/recursos#mudanzas</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
    `<url><loc>${base}/recursos#licencias</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
    `<url><loc>${base}/recursos#escuelas</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
    `<url><loc>${base}/recursos#servicios</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
    `<url><loc>${base}/recursos#salud</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
    `<url><loc>${base}/recursos#bancos</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
    `<url><loc>${base}/recursos#gobierno</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`
  ].join("\n  ");

  res.header("Content-Type", "application/xml");
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`);
});

app.post('/api/newsletter-boricua', express.json(), formLimiter, async (req, res) => {
  try {
    const { email, source } = req.body;
    if (!email || !email.includes('@')) return res.status(400).json({ error: 'Email inválido' });

    // Save to file
    const subscribersFile = '/data/pb-subscribers.json';
    let subscribers = [];
    if (require('fs').existsSync(subscribersFile)) {
      subscribers = JSON.parse(require('fs').readFileSync(subscribersFile, 'utf8'));
    }
    if (subscribers.find(s => s.email === email)) return res.json({ ok: true });
    subscribers.push({ email, source: source || 'landing', subscribedAt: new Date().toISOString() });
    require('fs').writeFileSync(subscribersFile, JSON.stringify(subscribers, null, 2));

    // Notify Ivan
    await resend.emails.send({
      from: `Planeta Boricua <${PB_SENDER_EMAIL}>`,
      to: PB_CONTACT_EMAIL,
      subject: '🇵🇷 Nuevo suscriptor Planeta Boricua: ' + email,
      html: '<p>Nuevo suscriptor: <strong>' + email + '</strong></p><p>Fuente: ' + (source || 'landing') + '</p><p>Total: ' + subscribers.length + '</p>'
    });

    // Add to Brevo list 4 (Planeta Boricua)
    try {
      await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'api-key': process.env.BREVO_API_KEY },
        body: JSON.stringify({ email, listIds: [4], updateEnabled: true })
      });
    } catch(brevoErr) {
      console.error('Brevo PB error:', brevoErr.message);
    }

    // Welcome email in Spanish
    await resend.emails.send({
      from: `Planeta Boricua <${PB_SENDER_EMAIL}>`,
      to: email,
      subject: '🇵🇷 ¡Bienvenido/a a Planeta Boricua!',
      html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:linear-gradient(135deg,#002D62,#CE1126);padding:2rem;text-align:center;border-radius:12px 12px 0 0;">
          <h1 style="color:#fff;font-size:1.5rem;margin:0">🇵🇷 ¡Bienvenido/a a Planeta Boricua!</h1>
          <p style="color:rgba(255,255,255,0.8);margin-top:0.5rem;font-size:0.9rem;">Más Boricua Que Un Mofongo</p>
        </div>
        <div style="padding:2rem;background:#fff;border:1px solid #e5e5e0;">
          <p style="font-size:1rem;color:#333">¡Wepa! 🎉 Ya eres parte de la comunidad de Planeta Boricua — un espacio de cultura, identidad y orgullo boricua.</p>
          <p style="font-size:0.9rem;color:#555;margin-top:1rem;">Recibirás historias originales, cultura, gastronomía, recursos útiles y novedades de nuestra comunidad.</p>
          <div style="background:#f5f5f0;border-radius:8px;padding:1.2rem;margin:1.5rem 0;">
            <p style="font-size:0.85rem;color:#444;margin:0;"><strong>¿Sabías que tenemos?</strong></p>
            <ul style="font-size:0.85rem;color:#555;margin:0.5rem 0 0 1.2rem;">
              <li>📋 Centro de Recursos PR↔USA — guías de mudanza, licencias y más</li>
              <li>🎨 Feria de Artesanías — talento hecho por manos boricuas</li>
              <li>✍️ El Balcón — historias y artículos propios</li>
            </ul>
          </div>
          <div style="text-align:center;margin:2rem 0;">
            <a href="https://www.masboricuaqueunmofongo.com" style="background:#CE1126;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:700;">Visitar Planeta Boricua →</a>
          </div>
        </div>
        <div style="padding:1rem;text-align:center;background:#f5f5f0;border-radius:0 0 12px 12px;">
          <p style="font-size:0.75rem;color:#888;">© 2026 Planeta Boricua · masboricuaqueunmofongo.com · Proyecto independiente de Iván Soto</p>
          <p style="font-size:0.7rem;color:#aaa;margin-top:0.3rem;">Recibiste este email porque te suscribiste en Planeta Boricua.</p>
        </div>
      </div>`
    });

    return res.json({ ok: true });
  } catch(e) {
    console.error('PB Subscribe error:', e.message);
    return res.json({ ok: false });
  }
});
