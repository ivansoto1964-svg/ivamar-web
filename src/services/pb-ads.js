const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const TYPES = new Set(['direct', 'affiliate', 'internal']);
const STATUSES = new Set(['draft', 'active', 'inactive', 'archived']);
const VERTICALS = new Set(['general', 'retail', 'travel', 'internal']);
const TYPE_RANK = { direct:3, affiliate:2, internal:1 };
const PLACEMENTS = new Set([
  'blog.inline_1', 'blog.inline_2',
  'latest.inline_1', 'latest.inline_2',
  'artisan.after_profile'
]);
const SECTIONS = new Set(['blog', 'latest', 'artisan']);
const IMAGE_TYPES = [
  { mime:'image/jpeg', ext:'jpg', test:buffer => buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff },
  { mime:'image/png', ext:'png', test:buffer => buffer.slice(0,8).equals(Buffer.from([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a])) },
  { mime:'image/webp', ext:'webp', test:buffer => buffer.slice(0,4).toString() === 'RIFF' && buffer.slice(8,12).toString() === 'WEBP' }
];

function cleanText(value, max = 500) {
  return String(value || '').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0,max);
}

function cleanList(value, allowed, max = 30) {
  const items = Array.isArray(value) ? value : String(value || '').split(',');
  return [...new Set(items.map(item => cleanText(item,80)).filter(item => item && (!allowed || allowed.has(item))))].slice(0,max);
}

function safeDestination(value, type) {
  const raw = String(value || '').trim();
  if (type === 'internal' && /^\/[a-z0-9/_?&=.%+#-]*$/i.test(raw) && !raw.startsWith('//')) return raw;
  let url;
  try { url = new URL(raw); } catch (_) { throw new Error('Incluye un enlace de destino válido.'); }
  if (url.protocol !== 'https:') throw new Error('El enlace de destino debe usar HTTPS.');
  url.username = '';
  url.password = '';
  return url.toString();
}

function safeImage(value) {
  const raw = String(value || '').trim();
  if (/^\/media\/pb-ads\/[a-f0-9-]+\.(?:jpg|png|webp)$/i.test(raw)) return raw;
  if (/^\/img\/[a-z0-9/_-]+\.(?:jpg|jpeg|png|webp)$/i.test(raw)) return raw;
  throw new Error('Sube un banner JPG, PNG o WebP para servirlo directamente desde Planeta Boricua.');
}

function artisanEligible(campaign) {
  return campaign?.type === 'internal' || campaign?.vertical === 'travel';
}

function isoDate(value, label) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) throw new Error(`${label} no es válida.`);
  return date.toISOString();
}

function validateCampaign(input, current = null) {
  const type = cleanText(input.type,20);
  const status = cleanText(input.status,20);
  if (!TYPES.has(type)) throw new Error('Selecciona un tipo de campaña válido.');
  if (!STATUSES.has(status)) throw new Error('Selecciona un estado válido.');
  const internalName = cleanText(input.internalName,120);
  const headline = cleanText(input.headline,140);
  const description = cleanText(input.description,240);
  const cta = cleanText(input.cta || current?.cta || 'Conocer más',60);
  const imageAlt = cleanText(input.imageAlt,180);
  if (!internalName || !headline || !cta || !imageAlt) throw new Error('Completa nombre interno, titular, CTA y texto alternativo.');
  const requestedVertical = cleanText(input.vertical || current?.vertical || (type === 'internal' ? 'internal' : 'general'),20);
  const vertical = type === 'internal' ? 'internal' : requestedVertical;
  if (!VERTICALS.has(vertical)) throw new Error('Selecciona una clasificación de inventario válida.');
  const startsAt = isoDate(input.startsAt, 'La fecha de inicio');
  const endsAt = isoDate(input.endsAt, 'La fecha de finalización');
  if (startsAt && endsAt && new Date(endsAt) <= new Date(startsAt)) throw new Error('La fecha final debe ser posterior al inicio.');
  const sections = cleanList(input.sections, SECTIONS);
  const placements = cleanList(input.placements, PLACEMENTS);
  if (!sections.length || !placements.length) throw new Error('Selecciona por lo menos una sección y una posición.');
  if (placements.some(item => !sections.includes(item.split('.')[0]))) throw new Error('Cada posición debe pertenecer a una sección seleccionada.');
  if (sections.includes('artisan') && !artisanEligible({type,vertical})) throw new Error('Los perfiles de artesanos solo aceptan promociones internas o campañas de viajes.');
  const now = new Date().toISOString();
  return {
    id:current?.id || `pbad-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
    internalName,
    headline,
    description,
    cta,
    image:safeImage(input.image || current?.image || ''),
    imageAlt,
    destinationUrl:safeDestination(input.destinationUrl, type),
    type,
    vertical,
    status,
    startsAt,
    endsAt,
    sections,
    categories:cleanList(input.categories,null,40),
    placements,
    priority:Math.max(0,Math.min(100,Number.parseInt(input.priority,10) || 0)),
    advertiser:cleanText(input.advertiser,120),
    affiliateNetwork:cleanText(input.affiliateNetwork,80),
    excludedArtisanCategories:cleanList(input.excludedArtisanCategories,null,40),
    createdAt:current?.createdAt || now,
    updatedAt:now
  };
}

function disclosure(campaign) {
  if (campaign.type === 'affiliate') return 'Publicidad · Enlace afiliado';
  if (campaign.type === 'internal') return 'Promoción de Planeta Boricua';
  return 'Publicidad';
}

function wordCount(html) {
  return String(html || '').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&(?:nbsp|amp|quot|#\d+);/gi,' ').trim().split(/\s+/).filter(Boolean).length;
}

function createPBAds(options = {}) {
  const liveDir = options.liveDir || process.env.PB_ADS_DIR || '/data/pb-ads';
  const seedFile = options.seedFile || path.join(__dirname,'../../data/pb-ads/campaigns.json');
  const campaignsFile = path.join(liveDir,'campaigns.json');
  const metricsFile = path.join(liveDir,'metrics.json');
  const mediaDir = path.join(liveDir,'media');
  let cache = { stamp:-1, items:[] };

  function ensureDir() { fs.mkdirSync(liveDir,{recursive:true}); }
  function sourceFile() { return fs.existsSync(campaignsFile) ? campaignsFile : seedFile; }
  function read() {
    const file = sourceFile();
    try {
      const stamp = fs.statSync(file).mtimeMs;
      if (cache.stamp === stamp) return cache.items;
      const parsed = JSON.parse(fs.readFileSync(file,'utf8'));
      cache = {stamp,items:Array.isArray(parsed) ? parsed : []};
    } catch (_) { cache = {stamp:0,items:[]}; }
    return cache.items;
  }
  function write(items) {
    ensureDir();
    const temp = `${campaignsFile}.${process.pid}.${Date.now()}.tmp`;
    fs.writeFileSync(temp,JSON.stringify(items,null,2));
    fs.renameSync(temp,campaignsFile);
    cache = {stamp:-1,items:[]};
    return read();
  }
  function list() { return read().map(item => ({...item,disclosure:disclosure(item)})); }
  function save(input, id = '') {
    const items = read().slice();
    const index = id ? items.findIndex(item => item.id === id) : -1;
    if (id && index < 0) return null;
    const saved = validateCampaign(input,index >= 0 ? items[index] : null);
    if (index >= 0) items[index] = saved; else items.push(saved);
    write(items);
    return saved;
  }
  function setStatus(id,status) {
    if (!['active','inactive'].includes(status)) throw new Error('Estado no válido.');
    const items = read().slice();
    const index = items.findIndex(item => item.id === id);
    if (index < 0) return null;
    if (items[index].status === 'archived') throw new Error('Una campaña archivada no puede reactivarse.');
    items[index] = {...items[index],status,updatedAt:new Date().toISOString()};
    write(items);
    return items[index];
  }
  function remove(id) {
    const items = read().slice();
    const index = items.findIndex(item => item.id === id);
    if (index < 0) return false;
    items[index] = {...items[index],status:'archived',updatedAt:new Date().toISOString()};
    write(items);
    return true;
  }
  function select(context = {}) {
    const now = context.now ? new Date(context.now) : new Date();
    const section = cleanText(context.section,40);
    const placement = cleanText(context.placement,80);
    const category = cleanText(context.category,80).toLowerCase();
    const artisanCategory = cleanText(context.artisanCategory,80).toLowerCase();
    const excluded = new Set(context.excludeIds || []);
    const eligible = read().filter(item => {
      if (excluded.has(item.id) || item.status !== 'active') return false;
      if (item.startsAt && now < new Date(item.startsAt)) return false;
      if (item.endsAt && now >= new Date(item.endsAt)) return false;
      if (!item.sections?.includes(section) || !item.placements?.includes(placement)) return false;
      if (section === 'artisan' && !artisanEligible(item)) return false;
      if (item.categories?.length && !item.categories.some(value => value.toLowerCase() === category)) return false;
      if (section === 'artisan' && artisanCategory && item.excludedArtisanCategories?.some(value => value.toLowerCase() === artisanCategory)) return false;
      return true;
    });
    eligible.sort((a,b) => (TYPE_RANK[b.type]-TYPE_RANK[a.type]) || (Number(b.priority)-Number(a.priority)) || a.id.localeCompare(b.id));
    if (!eligible.length) return null;
    const topRank = TYPE_RANK[eligible[0].type];
    const topPriority = Number(eligible[0].priority) || 0;
    const tied = eligible.filter(item => TYPE_RANK[item.type] === topRank && (Number(item.priority)||0) === topPriority);
    const key = `${context.pageSlug || ''}|${placement}|${now.toISOString().slice(0,13)}`;
    const hash = crypto.createHash('sha256').update(key).digest().readUInt32BE(0);
    const chosen = tied[hash % tied.length];
    return {...chosen,disclosure:disclosure(chosen)};
  }
  function findActive(id) {
    const item = read().find(campaign => campaign.id === id);
    if (!item || item.status !== 'active') return null;
    const now = new Date();
    if ((item.startsAt && now < new Date(item.startsAt)) || (item.endsAt && now >= new Date(item.endsAt))) return null;
    return item;
  }
  function saveImageData(dataUrl) {
    const match = String(dataUrl || '').match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/);
    if (!match) throw new Error('La imagen debe ser JPG, PNG o WebP.');
    const buffer = Buffer.from(match[2],'base64');
    if (!buffer.length || buffer.length > 750*1024) throw new Error('El banner no puede superar 750 KB.');
    const type = IMAGE_TYPES.find(item => item.mime === match[1] && item.test(buffer));
    if (!type) throw new Error('El contenido del archivo no coincide con una imagen permitida.');
    fs.mkdirSync(mediaDir,{recursive:true});
    const name = `${crypto.createHash('sha256').update(buffer).digest('hex').slice(0,24)}.${type.ext}`;
    const full = path.join(mediaDir,name);
    if (!fs.existsSync(full)) fs.writeFileSync(full,buffer,{flag:'wx'});
    return `/media/pb-ads/${name}`;
  }
  function recordMetric(id,event,context = {}) {
    if (!['impression','click'].includes(event) || !findActive(id)) return false;
    ensureDir();
    let metrics = {};
    try { metrics = JSON.parse(fs.readFileSync(metricsFile,'utf8')); } catch (_) {}
    if (!metrics || Array.isArray(metrics) || typeof metrics !== 'object') metrics = {};
    const day = new Date().toISOString().slice(0,10);
    metrics[day] ||= {};
    metrics[day][id] ||= {impressions:0,clicks:0,placements:{}};
    metrics[day][id][event === 'click' ? 'clicks' : 'impressions'] += 1;
    const placement = cleanText(context.placement,80) || 'unknown';
    metrics[day][id].placements[placement] ||= {impressions:0,clicks:0};
    metrics[day][id].placements[placement][event === 'click' ? 'clicks' : 'impressions'] += 1;
    const temp = `${metricsFile}.${process.pid}.${Date.now()}.tmp`;
    fs.writeFileSync(temp,JSON.stringify(metrics,null,2));
    fs.renameSync(temp,metricsFile);
    return true;
  }
  function summary(days = 30) {
    let metrics = {};
    try { metrics = JSON.parse(fs.readFileSync(metricsFile,'utf8')); } catch (_) {}
    const cutoff = new Date(); cutoff.setUTCHours(0,0,0,0); cutoff.setUTCDate(cutoff.getUTCDate()-Math.max(1,days)+1);
    const totals = new Map(list().map(item => [item.id,{id:item.id,name:item.internalName,status:item.status,type:item.type,impressions:0,clicks:0}]));
    for (const [day,campaigns] of Object.entries(metrics || {})) {
      if (new Date(`${day}T00:00:00Z`) < cutoff) continue;
      for (const [id,value] of Object.entries(campaigns || {})) {
        const row = totals.get(id) || {id,name:id,status:'unknown',type:'unknown',impressions:0,clicks:0};
        row.impressions += Number(value.impressions)||0;
        row.clicks += Number(value.clicks)||0;
        totals.set(id,row);
      }
    }
    return [...totals.values()].map(row => ({...row,ctr:row.impressions ? Number((row.clicks*100/row.impressions).toFixed(2)) : 0}));
  }
  return {list,save,setStatus,remove,select,findActive,saveImageData,recordMetric,summary,wordCount,mediaDir,placements:[...PLACEMENTS],sections:[...SECTIONS]};
}

module.exports = {createPBAds,validateCampaign,wordCount,disclosure,artisanEligible,TYPES,STATUSES,VERTICALS,PLACEMENTS,SECTIONS};
