const assert = require('assert');
const { buildPBExploreRecommendations } = require('../src/services/pb-ecosystem-explore');
const { renderExplorePB } = require('../src/views/planetaboricua/explore-pb');
const loMasReciente = require('../src/views/planetaboricua/lo-mas-reciente');
const blogPost = require('../src/views/pb-blog/post');
const agendaBoricua = require('../src/views/planetaboricua/agenda-artesanal');
const artisanProfile = require('../src/views/planetaboricua/artesano-perfil');

const recommendations = buildPBExploreRecommendations({
  currentSlug:'noticia-actual',
  today:'2026-08-29',
  latest:[
    {slug:'otra-noticia',title:'Otra noticia',summary:'Resumen real',image:'/media/otra.jpg',publishedAt:'2026-08-28T12:00:00Z'},
    {slug:'noticia-actual',title:'No debe repetirse',publishedAt:'2026-08-29T12:00:00Z'}
  ],
  blogPosts:[
    {slug:'borrador',title:'Borrador',status:'draft',dateISO:'2026-08-29'},
    {slug:'historia-cafe',title:'Historia del café',excerpt:'Una historia cultural',image:'/media/cafe.jpg',status:'published',dateISO:'2026-08-28'}
  ],
  events:[
    {id:'pasado',name:'Evento pasado',startDate:'2026-08-01',endDate:'2026-08-02'},
    {id:'futuro',name:'Festival boricua',startDate:'2026-09-05',city:'Ponce',region:'Puerto Rico',image:'/media/festival.jpg'}
  ],
  artisans:[
    {id:'1788000000000',slug:'taller-boricua-000000',name:'Taller Boricua',desc:'Trabajo hecho a mano',photo:'/media/taller.jpg'}
  ]
});

assert.strictEqual(recommendations.length, 4);
assert.deepStrictEqual(recommendations.map(item => item.area), [
  'Lo más reciente',
  'El Balcón',
  'Agenda Boricua',
  'Feria de Artesanos'
]);
assert.ok(!recommendations.some(item => item.title === 'No debe repetirse'));
assert.ok(!recommendations.some(item => item.title === 'Borrador'));
assert.ok(!recommendations.some(item => item.title === 'Evento pasado'));
assert.strictEqual(recommendations[2].href, '/agenda-boricua');
assert.strictEqual(recommendations[3].href, '/feria-artesanos');
assert.ok(recommendations[3].summary.includes('Taller Boricua'));

const agendaRecommendations = buildPBExploreRecommendations({
  currentBlogSlug:'historia-cafe',
  currentArtisanSlug:'taller-boricua-000000',
  excludeAreas:['Agenda Boricua'],
  today:'2026-08-29',
  latest:[{slug:'otra-noticia',title:'Otra noticia',publishedAt:'2026-08-28'}],
  blogPosts:[
    {slug:'historia-cafe',title:'Historia actual',status:'published',dateISO:'2026-08-29'},
    {slug:'otra-historia',title:'Otra historia',status:'published',dateISO:'2026-08-28'}
  ],
  events:[{name:'Festival',startDate:'2026-09-05'}],
  artisans:[
    {id:'1788000000000',slug:'taller-boricua-000000',name:'Taller actual'},
    {id:'1787000000000',slug:'otro-taller-000001',name:'Otro taller'}
  ]
});
assert.deepStrictEqual(agendaRecommendations.map(item => item.area), [
  'Lo más reciente',
  'El Balcón',
  'Feria de Artesanos'
]);
assert.ok(!agendaRecommendations.some(item => item.title === 'Historia actual'));
assert.ok(agendaRecommendations.find(item => item.area === 'Feria de Artesanos').summary.includes('Otro taller'));

const rendered = renderExplorePB([
  ...recommendations,
  {area:'Extra',title:'No debe aparecer',href:'/extra'}
]);
assert.ok(rendered.includes('🇵🇷 Sigue explorando Planeta Boricua'));
assert.ok(rendered.includes('Explora más de Planeta Boricua →'));
assert.ok(rendered.includes('/blog/historia-cafe'));
assert.ok(!rendered.includes('No debe aparecer'));

const safeRendered = renderExplorePB([{area:'Blog',title:'<script>alert(1)</script>',href:'/&quot;'}]);
assert.ok(!safeRendered.includes('<script>alert(1)</script>'));
assert.ok(safeRendered.includes('&lt;script&gt;alert(1)&lt;/script&gt;'));

const article = loMasReciente({
  slug:'noticia-actual',
  title:'Noticia actual',
  summary:'Resumen',
  body:'<p>Contenido</p>',
  image:'/media/noticia.jpg',
  sources:[],
  publishedAt:'2026-08-29T12:00:00Z'
}, [], recommendations);
assert.ok(article.includes('Sigue explorando Planeta Boricua'));
assert.ok(article.indexOf('Comparte esta publicación') < article.indexOf('Sigue explorando Planeta Boricua'));
assert.ok(article.indexOf('Sigue explorando Planeta Boricua') < article.indexOf('Comentarios (0)'));

const blogHtml = blogPost({
  slug:'historia-cafe',
  title:'Historia del café',
  excerpt:'Resumen',
  content:'<p>Contenido cultural</p>',
  dateISO:'2026-08-29',
  date:'29 de agosto de 2026',
  status:'published',
  tags:[]
}, [], null, null, [], agendaRecommendations);
assert.ok(blogHtml.includes('Sigue explorando Planeta Boricua'));
assert.ok(blogHtml.indexOf('Sigue explorando Planeta Boricua') < blogHtml.indexOf('</main>'));

const agendaHtml = agendaBoricua([], agendaRecommendations);
assert.ok(agendaHtml.includes('Sigue explorando Planeta Boricua'));
assert.ok(!agendaHtml.includes('<span class="pb-explore-area">Agenda Boricua</span>'));

const artisanHtml = artisanProfile({
  name:'Taller actual',
  desc:'Trabajo artesanal',
  photo:'https://example.com/taller.jpg'
}, {
  categoryLabel:'Artesanía puertorriqueña',
  locationLabel:'Ponce, Puerto Rico',
  slug:'taller-boricua-000000',
  events:[],
  recommendations
});
assert.ok(artisanHtml.includes('Sigue explorando Planeta Boricua'));
assert.ok(artisanHtml.includes('href="/feria-artesanos"'));

console.log('PB ecosystem exploration tests passed');
