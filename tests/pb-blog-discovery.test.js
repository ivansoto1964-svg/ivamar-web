const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const renderPBIndex = require('../src/views/pb-blog/index');

const post = (slug,title,date='1 sept 2026') => ({
  slug,title,date,category:'Cultura e identidad',excerpt:`Resumen de ${title}`
});

const visible = [post('historia-nueva','Historia nueva')];
const archive = [post('historia-anterior','Historia anterior'),post('historia-clasica','Historia clásica')];
const firstPage = renderPBIndex(visible,1,4,null,null,['Cultura e identidad'],3,archive);
assert.match(firstPage,/Más historias para leer/);
assert.match(firstPage,/2 títulos adicionales/);
assert.match(firstPage,/\/blog\/historia-anterior/);
assert.match(firstPage,/\/blog\/historia-clasica/);
assert.match(firstPage,/<link rel="canonical" href="https:\/\/www\.masboricuaqueunmofongo\.com\/blog">/);
assert.match(firstPage,/<link rel="next" href="https:\/\/www\.masboricuaqueunmofongo\.com\/blog\?page=2">/);

const secondPage = renderPBIndex(visible,2,4,null,null,['Cultura e identidad'],3,[]);
assert.match(secondPage,/<link rel="canonical" href="https:\/\/www\.masboricuaqueunmofongo\.com\/blog\?page=2">/);
assert.match(secondPage,/<link rel="prev" href="https:\/\/www\.masboricuaqueunmofongo\.com\/blog">/);
assert.doesNotMatch(secondPage,/Más historias para leer/);

const serverSource = fs.readFileSync(path.join(__dirname,'../src/server.js'),'utf8');
assert.match(serverSource,/app\.get\('\/search\/label\/:label'/,'Legacy Blogger labels must redirect.');
assert.match(serverSource,/app\.get\('\/:year\/:month'/,'Legacy Blogger monthly archives must redirect.');

console.log('PB blog discovery and history contract: OK');
