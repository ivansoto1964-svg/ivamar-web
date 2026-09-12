const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const tools = require('../src/services/pb-event-tools');
const metrics = require('../src/services/pb-event-metrics');
const renderAgenda = require('../src/views/planetaboricua/agenda-artesanal');
const renderEvent = require('../src/views/planetaboricua/evento-boricua');
const renderPBControl = require('../src/views/pb-control');

const event = {
  id:'event-1',
  name:'Festival del Ñame y la Carne Frita',
  type:'Gastronomía',
  startDate:'2026-09-19',
  endDate:'2026-09-20',
  time:'10:00 a. m. a 6:00 p. m.',
  venue:'Plaza Pública',
  address:'Calle Principal',
  city:'Villalba',
  region:'Puerto Rico',
  country:'Puerto Rico',
  description:'Una celebración gratuita de nuestra gastronomía y cultura.',
  eventUrl:'https://example.com/evento',
  image:'/img/agenda-boricua-placeholder.svg',
  organizerName:'Municipio de Villalba',
  cost:'Gratis',
  approvedAt:'2026-09-07T12:00:00.000Z'
};

const slug = 'festival-del-name-y-la-carne-frita-20260919';
assert.equal(tools.eventSlug(event), slug);
assert.equal(tools.eventPath(event), `/agenda-boricua/${slug}`);
assert.equal(tools.findEventBySlug([event], slug), event);
assert.equal(tools.findEventBySlug([event], 'otro'), null);
assert.match(tools.mapsUrl(event), /^https:\/\/www\.google\.com\/maps\/search/);

const ics = tools.buildEventIcs(event);
assert.match(ics, /BEGIN:VCALENDAR/);
assert.match(ics, /DTSTART;VALUE=DATE:20260919/);
assert.match(ics, /DTEND;VALUE=DATE:20260921/);
assert.match(ics, /Festival del Ñame y la Carne Frita/);
const unfoldedIcs = ics.replace(/\r\n /g, '');
assert.match(unfoldedIcs, new RegExp(tools.eventPageUrl(event).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));

const google = new URL(tools.googleCalendarUrl(event));
assert.equal(google.hostname, 'calendar.google.com');
assert.equal(google.searchParams.get('dates'), '20260919/20260921');

const eventHtml = renderEvent(event, { relatedEvents:[] });
assert.match(eventHtml, /Compartir evento/);
assert.match(eventHtml, /Guardar en calendario/);
assert.match(eventHtml, /Google Calendar/);
assert.match(eventHtml, /Cómo llegar/);
assert.match(eventHtml, /Publica un evento gratis/);
assert.match(eventHtml, new RegExp(`/agenda-boricua/${slug}/calendario\\.ics`));
assert.match(eventHtml, /ca-pub-2526350815852271/);
assert.match(eventHtml, /application\/ld\+json/);

const agendaHtml = renderAgenda([event]);
assert.match(agendaHtml, new RegExp(`/agenda-boricua/${slug}`));
assert.match(agendaHtml, /Ver evento/);
assert.match(agendaHtml, /Publica un evento gratis/);
assert.doesNotMatch(agendaHtml, /wa\.me\/\?text=[^"']*\/agenda-boricua["']/);

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pb-event-metrics-'));
const metricsFile = path.join(tempDir, 'metrics.json');
assert.equal(metrics.record(slug, 'view', { file:metricsFile }), true);
assert.equal(metrics.record(slug, 'calendar', { file:metricsFile }), true);
assert.equal(metrics.record(slug, 'invalid', { file:metricsFile }), false);
const measured = metrics.summary([event], tools.eventSlug, { file:metricsFile })[0];
assert.equal(measured.metrics.views, 1);
assert.equal(measured.metrics.actions.calendar, 1);

const controlHtml = renderPBControl({
  counts:{}, siteAnalytics:{},
  latestPending:[], latestApproved:[], commentsPending:[], commentsApproved:[],
  artisansPending:[], artisansApproved:[], eventsPending:[], eventsApproved:[measured],
  subscribers:[], blogPosts:[], affiliates:[], artisanMetrics:[], artisanMailHistory:[],
  artisanEmailAudit:{ counts:{}, issues:[] }, pressRoom:{ contacts:[], releases:[], distributions:[], entities:[], options:{}, controlSummary:{} }
});
assert.match(controlHtml, /Rendimiento:/);
assert.match(controlHtml, new RegExp(`/agenda-boricua/${slug}`));

const serverSource = fs.readFileSync(path.join(__dirname, '../src/server.js'), 'utf8');
assert.match(serverSource, /agenda-boricua\/:slug\/calendario\.ics/);
assert.match(serverSource, /api\/pb-evento-metrica\/:slug/);
assert.match(serverSource, /eventUrls/);

console.log('PB event experience contract: OK');
