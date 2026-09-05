const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const analytics = require('../src/services/pb-site-analytics');
const renderPBControl = require('../src/views/pb-control');
const serverSource = fs.readFileSync(path.join(__dirname, '../src/server.js'), 'utf8');

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
assert.equal(summary.topPages[0].path, '/blog/cafe-boricua');
assert.equal(summary.topPages[0].views, 2);
assert.equal(summary.topArticles.length, 2);
assert.equal(summary.daily.at(-1).date, '2026-08-27');
assert.match(analytics.pageLabel('/blog/cafe-boricua'), /El Balcón · Cafe Boricua/);

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
assert.match(html, /Páginas más visitadas/);
assert.match(html, /Artículos más leídos/);
assert.match(html, /No guarda nombres, emails, direcciones IP ni identificadores persistentes/);

console.log('PB site analytics contract: OK');
