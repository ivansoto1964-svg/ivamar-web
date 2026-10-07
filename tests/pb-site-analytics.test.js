const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const analytics = require('../src/services/pb-site-analytics');
const legacyBlogViews = require('../src/data/pb-blog-legacy-views.json');
const renderPBControl = require('../src/views/pb-control');
const serverSource = fs.readFileSync(path.join(__dirname, '../src/server.js'), 'utf8');

assert.equal(Object.keys(legacyBlogViews).length, 29, 'The verified Blogger baseline must include the 29 published articles supplied by the owner.');
assert.equal(Object.values(legacyBlogViews).reduce((sum,value) => sum + value,0), 3254, 'The verified Blogger baseline must total 3,254 views.');

function request({ method='GET', hostname='www.masboricuaqueunmofongo.com', pagePath='/', userAgent='Mozilla/5.0', accept='text/html' } = {}) {
  return {
    method,
    hostname,
    path:pagePath,
    headers:{ 'user-agent':userAgent, accept },
    get(name) { return this.headers[String(name).toLowerCase()] || ''; }
  };
}

assert.equal(analytics.shouldTrackRequest(request()), true, 'The public home page should be counted.');
assert.equal(analytics.shouldTrackRequest(request({ pagePath:'/blog/cafe-boricua' })), true, 'Public articles should be counted.');
assert.equal(analytics.shouldTrackRequest(request({ pagePath:'/pb-control' })), false, 'PB Control must never count itself.');
assert.equal(analytics.shouldTrackRequest(request({ pagePath:'/api/pb-data' })), false, 'API calls must not count as visits.');
assert.equal(analytics.shouldTrackRequest(request({ pagePath:'/img/logo.png', accept:'image/png' })), false, 'Assets must not count as visits.');
assert.equal(analytics.shouldTrackRequest(request({ userAgent:'Googlebot/2.1' })), false, 'Search robots must not count as visitors.');
assert.equal(analytics.shouldTrackRequest(request({ method:'POST' })), false, 'Form submissions must not count as page views.');
assert.equal(analytics.shouldTrackRequest(request({ hostname:'example.com' })), false, 'Other hosts must not affect PB analytics.');
assert.match(serverSource, /app\.use\(cookieParser\(\)\);[\s\S]*pbSiteAnalytics\.shouldTrackRequest\(req\)/, 'Analytics middleware must run after cookie parsing.');
assert.match(serverSource, /res\.once\('finish'/, 'A visit must be recorded only after the response finishes.');
assert.match(serverSource, /contentType\.includes\('text\/html'\)/, 'Only successful HTML pages must be counted.');
assert.match(serverSource, /const pagePath = req\.path;[\s\S]*recordPageView\(\{ pagePath, newVisitor \}\)/, 'The full path must be captured before mounted routers strip their prefix.');
assert.match(serverSource, /const legacyPBPath = `\/\$\{post\.slug\}`/, 'Previously misplaced El Balcón paths must be recovered.');

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pb-site-analytics-'));
const file = path.join(tempDir, 'metrics.json');
const now = new Date('2026-08-27T16:00:00.000Z');

analytics.recordPageView({ file, pagePath:'/', date:now, newVisitor:true });
analytics.recordPageView({ file, pagePath:'/blog/cafe-boricua', date:now, newVisitor:false });
analytics.recordPageView({ file, pagePath:'/blog/cafe-boricua', date:new Date('2026-08-26T16:00:00.000Z'), newVisitor:true });
analytics.recordPageView({ file, pagePath:'/lo-mas-reciente/noticia-pr', date:new Date('2026-08-20T16:00:00.000Z'), newVisitor:true });

const summary = analytics.summary({ file, date:now });
assert.equal(summary.today.visitors, 1);
assert.equal(summary.today.pageViews, 2);
assert.equal(summary.last7.visitors, 2);
assert.equal(summary.last7.pageViews, 3);
assert.equal(summary.last30.visitors, 3);
assert.equal(summary.last90.visitors, 3);
assert.equal(summary.last365.visitors, 3);
assert.equal(summary.allTime.pageViews, 4);
assert.equal(summary.pageHistory['/blog/cafe-boricua'].views, 2);
assert.equal(summary.pageHistory['/blog/cafe-boricua'].firstView, '2026-08-26');
assert.equal(summary.pageHistory['/blog/cafe-boricua'].lastView, '2026-08-27');
assert.equal(summary.topPages[0].path, '/blog/cafe-boricua');
assert.equal(summary.topPages[0].views, 2);
assert.equal(summary.topArticles.length, 2);
assert.equal(summary.daily.at(-1).date, '2026-08-27');
assert.equal(summary.months[0].month, '2026-08');
assert.match(analytics.csv({ file }), /2026-08,3,4/);
assert.match(analytics.pageLabel('/blog/cafe-boricua'), /El Balcón · Cafe Boricua/);
assert.match(analytics.pageLabel('/agenda-boricua/festival-del-cafe-20260920'), /Evento · Festival Del Cafe/);

const html = renderPBControl({
  counts:{},
  siteAnalytics:summary,
  latestPending:[], latestApproved:[], commentsPending:[], commentsApproved:[],
  artisansPending:[], artisansApproved:[], eventsPending:[], eventsApproved:[],
  subscribers:[], blogPosts:[], affiliates:[], artisanMetrics:[], artisanMailHistory:[],
  artisanEmailAudit:{ counts:{}, issues:[] }
});
assert.match(html, /data-tab="estadisticas"/, 'PB Control must expose the analytics tab.');
assert.match(html, /Visitantes hoy/);
assert.match(html, /Últimos 7 días/);
assert.match(html, /Últimos 90 días/);
assert.match(html, /Últimos 12 meses/);
assert.match(html, /Desde que comenzamos/);
assert.match(html, /Descargar CSV/);
assert.match(html, /Páginas más visitadas/);
assert.match(html, /Artículos más leídos/);
assert.match(html, /El Balcón · historial editorial completo/);
assert.match(html, /No guarda nombres, emails, direcciones IP ni identificadores persistentes/);

const unifiedHtml = renderPBControl({
  counts:{}, latestPending:[],latestApproved:[],commentsPending:[],commentsApproved:[],
  artisansPending:[],artisansApproved:[],eventsPending:[],eventsApproved:[],subscribers:[],
  blogPosts:[],affiliates:[],artisanMetrics:[],artisanMailHistory:[],artisanEmailAudit:{counts:{},issues:[]},
  siteAnalytics:{...summary,blogHistory:[{
    title:'Artículo migrado',path:'/blog/articulo-migrado',origin:'Blogger → PB',
    bloggerViews:399,pbViews:28,viewsTotal:427,views30:28,firstView:'2026-08-27',lastView:'2026-09-28'
  }]}
});
assert.match(unifiedHtml, /427 totales/);
assert.match(unifiedHtml, /399 históricas de Blogger · 28 medidas por PB/);
assert.doesNotMatch(unifiedHtml, /<details class="section">/);

console.log('PB site analytics contract: OK');
require('./pb-external-metrics.test');
