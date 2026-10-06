const fs = require('fs');
const path = require('path');

const DEFAULT_FILE = process.env.PB_SITE_ANALYTICS_FILE || '/data/pb-site-analytics.json';
const RETENTION_DAYS = 400;
const BOT_PATTERN = /bot|crawler|spider|slurp|facebookexternalhit|whatsapp|preview|monitor|uptime|headless/i;
const EXCLUDED_PREFIXES = [
  '/pb-control', '/admin', '/api', '/media', '/health', '/metrics',
  '/artesanos/metric', '/artesanos/mi-perfil', '/artesanos/acceso'
];
const STATIC_EXTENSION = /\.(?:avif|css|gif|ico|jpe?g|js|json|map|mp3|mp4|pdf|png|svg|txt|webmanifest|webp|xml|woff2?)$/i;

function readData(file = DEFAULT_FILE) {
  try {
    const value = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('invalid analytics data');
    return {
      version:2,
      startedAt:value.startedAt || null,
      days:value.days && typeof value.days === 'object' && !Array.isArray(value.days) ? value.days : {},
      months:value.months && typeof value.months === 'object' && !Array.isArray(value.months) ? value.months : {}
    };
  } catch (_) {
    return { version:2, startedAt:null, days:{}, months:{} };
  }
}

function writeData(file, value) {
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive:true });
  const temp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(temp, JSON.stringify(value, null, 2), 'utf8');
  fs.renameSync(temp, file);
}

function puertoRicoDateKey(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone:'America/Puerto_Rico', year:'numeric', month:'2-digit', day:'2-digit'
  }).format(date);
}

function shiftDay(dateKey, amount) {
  const [year, month, day] = String(dateKey).split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + amount));
  return date.toISOString().slice(0, 10);
}

function normalizePagePath(value) {
  let pagePath = String(value || '/').split('?')[0].slice(0, 240);
  if (!pagePath.startsWith('/')) pagePath = `/${pagePath}`;
  if (pagePath.length > 1) pagePath = pagePath.replace(/\/+$/, '');
  return pagePath || '/';
}

function shouldTrackRequest(req) {
  const host = String(req.hostname || '').toLowerCase();
  const method = String(req.method || 'GET').toUpperCase();
  const pagePath = normalizePagePath(req.path || req.url);
  const userAgent = String(req.get?.('user-agent') || req.headers?.['user-agent'] || '');
  const accept = String(req.get?.('accept') || req.headers?.accept || '');
  if (method !== 'GET') return false;
  if (!['masboricuaqueunmofongo.com', 'www.masboricuaqueunmofongo.com'].includes(host)) return false;
  if (BOT_PATTERN.test(userAgent)) return false;
  if (accept && !accept.includes('text/html') && !accept.includes('*/*')) return false;
  if (STATIC_EXTENSION.test(pagePath)) return false;
  if (EXCLUDED_PREFIXES.some(prefix => pagePath === prefix || pagePath.startsWith(`${prefix}/`))) return false;
  return true;
}

function recordPageView({ file = DEFAULT_FILE, pagePath = '/', date = new Date(), newVisitor = false } = {}) {
  const dayKey = puertoRicoDateKey(date);
  const normalizedPath = normalizePagePath(pagePath);
  const data = readData(file);
  if (!data.startedAt) data.startedAt = date.toISOString();
  const day = data.days[dayKey] && typeof data.days[dayKey] === 'object' ? data.days[dayKey] : { visitors:0, pageViews:0, pages:{} };
  day.visitors = (Number(day.visitors) || 0) + (newVisitor ? 1 : 0);
  day.pageViews = (Number(day.pageViews) || 0) + 1;
  day.pages = day.pages && typeof day.pages === 'object' && !Array.isArray(day.pages) ? day.pages : {};
  day.pages[normalizedPath] = (Number(day.pages[normalizedPath]) || 0) + 1;
  data.days[dayKey] = day;
  const newest = [...Object.keys(data.days), dayKey].sort().at(-1);
  const oldest = shiftDay(newest, -(RETENTION_DAYS - 1));
  Object.keys(data.days).forEach(key => {
    if (key >= oldest) return;
    const archived = data.days[key] || {};
    const monthKey = key.slice(0, 7);
    const month = data.months[monthKey] || { visitors:0, pageViews:0, pages:{} };
    month.visitors += Number(archived.visitors) || 0;
    month.pageViews += Number(archived.pageViews) || 0;
    Object.entries(archived.pages || {}).forEach(([archivedPath, count]) => {
      month.pages[archivedPath] = (month.pages[archivedPath] || 0) + (Number(count) || 0);
    });
    data.months[monthKey] = month;
    delete data.days[key];
  });
  writeData(file, data);
  return day;
}

function period(data, endKey, length) {
  const keys = Array.from({ length }, (_, index) => shiftDay(endKey, -index));
  const totals = { visitors:0, pageViews:0, pages:{} };
  keys.forEach(key => {
    const day = data.days[key] || {};
    totals.visitors += Number(day.visitors) || 0;
    totals.pageViews += Number(day.pageViews) || 0;
    Object.entries(day.pages || {}).forEach(([pagePath, count]) => {
      totals.pages[pagePath] = (totals.pages[pagePath] || 0) + (Number(count) || 0);
    });
  });
  return totals;
}

function addTotals(target, source) {
  target.visitors += Number(source?.visitors) || 0;
  target.pageViews += Number(source?.pageViews) || 0;
  Object.entries(source?.pages || {}).forEach(([pagePath, count]) => {
    target.pages[pagePath] = (target.pages[pagePath] || 0) + (Number(count) || 0);
  });
  return target;
}

function allTimePeriod(data) {
  const totals = { visitors:0, pageViews:0, pages:{} };
  Object.values(data.months || {}).forEach(month => addTotals(totals, month));
  Object.values(data.days || {}).forEach(day => addTotals(totals, day));
  return totals;
}

function monthlyBreakdown(data) {
  const months = {};
  Object.entries(data.months || {}).forEach(([key, value]) => {
    months[key] = addTotals({ visitors:0, pageViews:0, pages:{} }, value);
  });
  Object.entries(data.days || {}).forEach(([dateKey, day]) => {
    const monthKey = dateKey.slice(0, 7);
    months[monthKey] = addTotals(months[monthKey] || { visitors:0, pageViews:0, pages:{} }, day);
  });
  return Object.entries(months).sort(([a], [b]) => b.localeCompare(a)).map(([month, value]) => ({
    month,
    visitors:value.visitors,
    pageViews:value.pageViews
  }));
}

function csv({ file = DEFAULT_FILE } = {}) {
  const rows = monthlyBreakdown(readData(file));
  return ['mes,visitas_diarias_acumuladas,paginas_vistas']
    .concat(rows.map(row => [row.month, row.visitors, row.pageViews].join(',')))
    .join('\n') + '\n';
}

function changePercent(current, previous) {
  if (!previous) return current ? null : 0;
  return Math.round(((current - previous) / previous) * 100);
}

function pageLabel(pagePath) {
  const exact = {
    '/':'Inicio', '/blog':'El Balcón', '/lo-mas-reciente':'Lo más reciente',
    '/feria-artesanos':'Feria de Artesanos', '/agenda-boricua':'Agenda Boricua',
    '/recursos':'Recursos', '/pb/add-negocio':'Registro de artesanos', '/quienes-somos':'Quiénes somos'
  };
  if (exact[pagePath]) return exact[pagePath];
  const prefixes = [
    ['/blog/', 'El Balcón · '], ['/lo-mas-reciente/', 'Lo más reciente · '],
    ['/agenda-boricua/', 'Evento · '], ['/artesanos/', 'Artesano · '], ['/pueblos/', 'Pueblo · ']
  ];
  const match = prefixes.find(([prefix]) => pagePath.startsWith(prefix));
  if (!match) return pagePath;
  const slug = pagePath.slice(match[0].length).split('/').filter(Boolean).at(-1) || pagePath;
  const title = slug.replace(/-\d{6,8}$/, '').replace(/-/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase());
  return `${match[1]}${title}`;
}

function rankedPages(pages, filter = () => true, limit = 10) {
  return Object.entries(pages || {}).filter(([pagePath]) => filter(pagePath)).map(([pagePath, views]) => ({
    path:pagePath, label:pageLabel(pagePath), views:Number(views) || 0
  })).sort((a, b) => b.views - a.views || a.label.localeCompare(b.label, 'es')).slice(0, limit);
}

function pageHistory(data) {
  const history = {};
  Object.keys(data.days || {}).sort().forEach(dateKey => {
    Object.entries(data.days[dateKey]?.pages || {}).forEach(([pagePath, count]) => {
      const normalizedPath = normalizePagePath(pagePath);
      const item = history[normalizedPath] || { views:0, firstView:dateKey, lastView:dateKey };
      item.views += Number(count) || 0;
      item.firstView = item.firstView < dateKey ? item.firstView : dateKey;
      item.lastView = item.lastView > dateKey ? item.lastView : dateKey;
      history[normalizedPath] = item;
    });
  });
  return history;
}

function summary({ file = DEFAULT_FILE, date = new Date() } = {}) {
  const data = readData(file);
  const todayKey = puertoRicoDateKey(date);
  const today = period(data, todayKey, 1);
  const last7 = period(data, todayKey, 7);
  const previous7 = period(data, shiftDay(todayKey, -7), 7);
  const last30 = period(data, todayKey, 30);
  const previous30 = period(data, shiftDay(todayKey, -30), 30);
  const last90 = period(data, todayKey, 90);
  const last365 = period(data, todayKey, 365);
  const allTime = allTimePeriod(data);
  const daily = Array.from({ length:14 }, (_, index) => shiftDay(todayKey, index - 13)).map(key => ({
    date:key,
    visitors:Number(data.days[key]?.visitors) || 0,
    pageViews:Number(data.days[key]?.pageViews) || 0
  }));
  const isArticle = pagePath => pagePath.startsWith('/blog/') || pagePath.startsWith('/lo-mas-reciente/');
  return {
    startedAt:data.startedAt,
    today,
    last7:{...last7, change:changePercent(last7.visitors, previous7.visitors)},
    last30:{...last30, change:changePercent(last30.visitors, previous30.visitors)},
    last90,
    last365,
    allTime,
    months:monthlyBreakdown(data),
    pageHistory:pageHistory(data),
    topPages:rankedPages(last30.pages, () => true, 12),
    topArticles:rankedPages(last30.pages, isArticle, 10),
    daily
  };
}

module.exports = {
  DEFAULT_FILE,
  csv,
  normalizePagePath,
  pageLabel,
  puertoRicoDateKey,
  recordPageView,
  pageHistory,
  shouldTrackRequest,
  summary
};
