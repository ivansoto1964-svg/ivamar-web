const assert = require('assert');
const fs = require('fs');

const home = require('../src/views/planetaboricua');
const renderBlogPost = require('../src/views/pb-blog/post');
const renderLatest = require('../src/views/planetaboricua/lo-mas-reciente');
const renderAgenda = require('../src/views/planetaboricua/agenda-artesanal');
const renderControl = require('../src/views/pb-control');

assert(home.includes('data-pb-subscribe data-source="inicio"'), 'Inicio debe usar el formulario existente con origen inicio.');
assert(home.includes('/js/pb-subscribe.js?v=1'), 'Inicio debe cargar el manejador compartido.');
assert(!home.includes('nlSubscribe()'), 'Inicio no debe conservar el manejador anterior en paralelo.');

const blog = renderBlogPost({
  slug: 'historia-prueba', title: 'Historia prueba', content: '<p>Contenido.</p>',
  date: '29 de agosto de 2026', dateISO: '2026-08-29', tags: []
}, [], null, null, []);
assert(blog.includes('data-source="blog"'), 'El Blog debe identificar sus suscripciones.');
assert(blog.includes('¿Te gustó esta historia?'), 'El Blog debe mostrar su mensaje contextual.');

const latest = renderLatest({
  slug: 'noticia-prueba', title: 'Noticia prueba', summary: 'Resumen', body: '<p>Contenido.</p>',
  image: '', publishedAt: '2026-08-29T12:00:00Z', sources: [{ label: 'Fuente', url: 'https://example.com' }]
}, []);
assert(latest.includes('data-source="lo_mas_reciente"'), 'Lo más reciente debe identificar sus suscripciones.');
assert(latest.includes('Mantente al día con el Planeta'), 'Lo más reciente debe mostrar su mensaje contextual.');

const agenda = renderAgenda([{
  name: 'Evento prueba', startDate: '2099-09-23', city: 'Lares', region: 'Puerto Rico',
  country: 'Puerto Rico', description: 'Actividad gratuita.', organizerName: 'Planeta Boricua'
}]);
assert(agenda.includes('data-source="agenda"'), 'La Agenda debe identificar sus suscripciones.');
assert(agenda.includes('Que no se te pase lo boricua'), 'La Agenda debe mostrar su mensaje contextual.');

const baseControlModel = {
  csrf: 'test', counts: { subscribers: 2 }, latestPending: [], latestApproved: [],
  commentsPending: [], commentsApproved: [], artisansPending: [], artisansApproved: [],
  eventsPending: [], eventsApproved: [], blogPosts: [], affiliates: [], artisanMetrics: [],
  artisanMailHistory: [], artisanEmailAudit: {}, siteAnalytics: {}, artisanEmailCount: 0,
  subscribers: [
    { email: 'blog@example.com', source: 'blog', subscribedAt: '2026-08-29T12:00:00Z' },
    { email: 'home@example.com', source: 'landing', subscribedAt: '2026-08-29T13:00:00Z' }
  ]
};
const control = renderControl(baseControlModel);
assert(control.includes('2 en total'), 'PB Control debe mostrar el total existente.');
assert(control.includes('Blog oficial: <strong>1</strong>'), 'PB Control debe resumir el origen Blog.');
assert(control.includes('Inicio: <strong>1</strong>'), 'PB Control debe tratar el origen histórico landing como Inicio.');

const server = fs.readFileSync(require.resolve('../src/server'), 'utf8');
assert(server.includes("new Set(['blog', 'lo_mas_reciente', 'agenda', 'inicio'])"), 'El servidor debe limitar los orígenes aceptados.');
assert(server.includes("trim().toLowerCase() === email"), 'El servidor debe evitar duplicados sin distinguir mayúsculas.');

console.log('PB subscriber capture tests passed.');
