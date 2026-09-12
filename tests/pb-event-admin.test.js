const assert = require('assert');
const pbEventAdmin = require('../src/services/pb-event-admin');
const renderPBControl = require('../src/views/pb-control');

const base = {
  name:'Encuentro cultural boricua',
  type:'Cultura e historia',
  startDate:'2026-09-20',
  endDate:'2026-09-20',
  time:'2:00 p. m.–4:00 p. m.',
  venue:'Centro Cultural',
  address:'123 Calle Principal',
  city:'Nueva York',
  region:'New York',
  country:'Estados Unidos',
  description:'Actividad cultural gratuita dedicada a la comunidad puertorriqueña.',
  eventUrl:'https://example.org/evento',
  image:'https://example.org/afiche.jpg',
  organizerName:'Organización Cultural'
};

const saved = pbEventAdmin.buildAdminEvent(base, {
  now:new Date('2026-09-12T12:00:00.000Z'),
  existing:[],
  idFactory:() => 'evento-prueba'
});

assert.strictEqual(saved.id, 'evento-prueba');
assert.strictEqual(saved.status, 'approved');
assert.strictEqual(saved.cost, 'Gratis');
assert.strictEqual(saved.virtual, false);
assert.strictEqual(saved.sourceLabel, 'Organización Cultural');
assert.strictEqual(Object.prototype.hasOwnProperty.call(saved, 'email'), false);

assert.throws(() => pbEventAdmin.buildAdminEvent(base, {
  now:new Date('2026-09-12T12:00:00.000Z'),
  existing:[saved]
}), /ya existe/);

assert.throws(() => pbEventAdmin.buildAdminEvent({...base,eventUrl:'javascript:alert(1)'}, {
  now:new Date('2026-09-12T12:00:00.000Z')
}), /enlace oficial válido/);

assert.throws(() => pbEventAdmin.buildAdminEvent({...base,startDate:'2026-09-01',endDate:''}, {
  now:new Date('2026-09-12T12:00:00.000Z')
}), /ya pasó/);

assert.throws(() => pbEventAdmin.buildAdminEvent({...base,city:''}, {
  now:new Date('2026-09-12T12:00:00.000Z')
}), /ciudad o pueblo/);

const virtual = pbEventAdmin.buildAdminEvent({
  ...base,
  name:'Conversatorio virtual',
  type:'Evento virtual',
  country:'Virtual',
  city:'',
  address:'',
  venue:'Evento virtual',
  image:''
}, {
  now:new Date('2026-09-12T12:00:00.000Z'),
  idFactory:() => 'evento-virtual'
});
assert.strictEqual(virtual.virtual, true);

const html = renderPBControl({
  csrf:'token',
  counts:{},
  blogPosts:[],
  latestPending:[],
  latestApproved:[],
  commentsPending:[],
  commentsApproved:[],
  artisansPending:[],
  artisansApproved:[],
  artisanNeedsImprovement:[],
  artisanMetrics:[],
  artisanEmailAudit:{},
  artisanMailHistory:[],
  eventsPending:[],
  eventsApproved:[],
  subscribers:[],
  affiliates:[],
  siteAnalytics:{},
  pressRoom:{}
});
assert.match(html, /id="eventForm"/);
assert.match(html, /Añadir evento verificado/);
assert.match(html, /No envía correos al organizador/);
assert.match(html, /event-create/);

console.log('pb-event-admin: ok');
