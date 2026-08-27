const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const renderBlog = require('../src/views/pb-blog/post');
const renderLatest = require('../src/views/planetaboricua/lo-mas-reciente');

const root = path.resolve(__dirname, '..');
const asset = fs.readFileSync(path.join(root, 'public/js/pb-instagram-share.js'), 'utf8');
const blog = renderBlog({
  slug:'prueba',title:'Prueba',excerpt:'Resumen',content:'<p>Contenido</p>',
  image:'/img/pb-logo.png',dateISO:'2026-08-27',date:'27 de agosto de 2026',tags:[]
}, [], null, null, []);
const latest = renderLatest({
  slug:'prueba',title:'Prueba',summary:'Resumen',body:'<p>Contenido</p>',image:'',
  sources:[],publishedAt:'2026-08-27T12:00:00.000Z'
});

assert.match(blog, /\/js\/pb-instagram-share\.js\?v=2/, 'Blog posts must load the current social sharing helper.');
assert.match(latest, /\/js\/pb-instagram-share\.js\?v=2/, 'Latest posts must load the current social sharing helper.');
assert.match(asset, /instagram-share/);
assert.match(asset, /navigator\.share/);
assert.match(asset, /querySelector\('\.share-fb'\)/, 'Facebook buttons must use the mobile share menu.');
assert.match(asset, /event\.preventDefault\(\)/, 'Mobile Facebook sharing must bypass the broken web sharer.');
assert.match(asset, /navigator\.share\(\{ title, text:description, url:canonical \}\)/, 'Facebook must receive the canonical article URL.');
assert.match(asset, /window\.open\('https:\/\/www\.facebook\.com\/'/, 'Desktop fallback must open Facebook without the broken sharer URL.');
assert.doesNotMatch(asset, /facebook\.com\/sharer/, 'The sharing helper must not use Facebook\'s broken web sharer.');
assert.match(asset, /navigator\.clipboard\.writeText\(canonical\)/, 'The article link must be copied for Instagram.');
assert.match(asset, /navigator\.canShare\(\{ files:\[file\] \}\)/, 'Supported phones should share the article image.');
new vm.Script(asset, { filename:'pb-instagram-share.js' });

console.log('PB Instagram sharing contract: OK');
