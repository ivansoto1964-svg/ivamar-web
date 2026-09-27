const assert = require('assert');
const fs = require('fs');
const path = require('path');

const { STAY22_LMA_ID, hasTravelIntent, renderStay22 } = require('../src/views/planetaboricua/stay22');
const renderLatest = require('../src/views/planetaboricua/lo-mas-reciente');
const renderBlogPost = require('../src/views/pb-blog/post');
const renderEvent = require('../src/views/planetaboricua/evento-boricua');

assert.equal(STAY22_LMA_ID, '6a4026801c8b38e97c6ad9fd');
assert.equal(hasTravelIntent({title:'Nueva ruta aérea desde Orlando a Puerto Rico'}), true);
assert.equal(hasTravelIntent({title:'Artesano presenta una nueva colección de cerámica'}), false);
assert.match(renderStay22(), /data-pb-travel-affiliate="stay22"/);
assert.match(renderStay22(), /scripts\.stay22\.com\/letmeallez\.js/);
assert.equal(renderStay22({enabled:false}), '');

const latest = {slug:'prueba',summary:'Resumen',body:'<p>Contenido editorial.</p>',publishedAt:'2026-09-27T12:00:00.000Z'};
assert.match(renderLatest({...latest,title:'Guía de hoteles para visitar San Juan'}), /data-pb-travel-affiliate="stay22"/);
assert.doesNotMatch(renderLatest({...latest,title:'Nueva exposición de artesanía boricua'}), /data-pb-travel-affiliate="stay22"/);

const blog = {slug:'prueba',excerpt:'Resumen',category:'Cultura e identidad',content:'<p>Contenido editorial.</p>',date:'27 de septiembre de 2026'};
assert.match(renderBlogPost({...blog,title:'Cómo planificar un viaje a Vieques'}), /data-pb-travel-affiliate="stay22"/);
assert.doesNotMatch(renderBlogPost({...blog,title:'La memoria de nuestras abuelas'}), /data-pb-travel-affiliate="stay22"/);

const event = {name:'Festival boricua',startDate:'2026-10-10',city:'Orlando',region:'Florida',country:'USA',description:'Actividad comunitaria',cost:'Gratis'};
assert.match(renderEvent(event), /data-pb-travel-affiliate="stay22"/);
assert.doesNotMatch(renderEvent({...event,virtual:true}), /data-pb-travel-affiliate="stay22"/);

const artisanView = fs.readFileSync(path.join(__dirname,'../src/views/planetaboricua/artesano-perfil.js'),'utf8');
assert.doesNotMatch(artisanView, /stay22|letmeallez/i);

const legal = fs.readFileSync(path.join(__dirname,'../src/views/legal-boricua.js'),'utf8');
assert.match(legal, /<strong>Stay22<\/strong>/);

console.log('PB Stay22 contextual integration tests passed');
