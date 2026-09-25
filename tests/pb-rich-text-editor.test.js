const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const renderControl = require('../src/views/pb-control');
const renderBlogPost = require('../src/views/pb-blog/post');
const renderBlogIndex = require('../src/views/pb-blog/index');
const renderLatest = require('../src/views/planetaboricua/lo-mas-reciente');
const renderLatestIndex = require('../src/views/planetaboricua/lo-mas-reciente-index');

const root = path.resolve(__dirname, '..');
const asset = fs.readFileSync(path.join(root, 'public/js/pb-rich-text-editor.js'), 'utf8');
const editorialImages = fs.readFileSync(path.join(root, 'public/css/pb-editorial-images.css'), 'utf8');
const server = fs.readFileSync(path.join(root, 'src/server.js'), 'utf8');
const html = renderControl({
  csrf:'test', counts:{}, blogPosts:[], latestPending:[], latestApproved:[],
  commentsPending:[], commentsApproved:[], artisansPending:[], artisansApproved:[],
  eventsPending:[], eventsApproved:[], subscribers:[], affiliates:[],
  artisanEmailAudit:{}, artisanMetrics:[], artisanMailHistory:[]
});

assert.match(html, /\/js\/pb-rich-text-editor\.js\?v=2/, 'PB Control must load the current visual editor.');
assert.match(asset, /Negrita/);
assert.match(asset, /Cursiva/);
assert.match(asset, /Título grande/);
assert.match(asset, /insertUnorderedList/);
assert.match(asset, /text\/html/, 'Rich clipboard HTML must be read when pasting.');
assert.match(asset, /sponsored noopener noreferrer/, 'Affiliate links must remain disclosed and protected.');
assert.match(asset, /Insertar imagen entre párrafos/, 'Both editors must expose the shared inline-image action.');
assert.match(asset, /Texto alternativo \(ALT\)/, 'Inline images must collect accessible alternative text.');
assert.match(asset, /Pie de foto \(opcional\)/, 'Inline images must support captions.');
assert.match(asset, /Crédito o fuente \(opcional\)/, 'Inline images must support credit or source text.');
assert.match(asset, /↑ Subir/);
assert.match(asset, /↓ Bajar/);
assert.match(asset, /Eliminar esta imagen del artículo/);
assert.match(asset, /uploadLatestImage\(file\)/, 'Inline images must reuse the existing protected uploader.');
assert.match(asset, /'IMG', 'FIGURE', 'FIGCAPTION'/, 'Reopening a post must preserve inline media markup.');
assert.match(server, /const body = blogContentHtml\(req\.body\.body \|\| ''\);/, 'Latest posts must save sanitized rich text.');
assert.match(server, /body:blogContentHtml\(item\.body\)/, 'Latest posts must be sanitized again before rendering.');
assert.match(server, /'img','figure','figcaption'/, 'The server sanitizer must preserve approved inline media elements.');
assert.match(server, /img:\['src','alt','title','loading','width','height'\]/, 'The server sanitizer must preserve safe image metadata including ALT.');
assert.match(server, /https:\/\/www\.trip\.com\/\?SID=2209817&allianceid=1094387&utm_campaign=520530/, 'Trip.com must use the direct affiliate URL without the fragile short-link redirect.');
assert.match(server, /https:\/\/us\.trip\.com\/hotels\/list\?[^']*countryId=208[^']*SID=2209817&allianceid=1094387/, 'The Puerto Rico hotel card must use the working direct Trip.com affiliate URL.');

const latestHtml = renderLatest({
  slug:'prueba', title:'Prueba', summary:'Resumen', image:'/media/pb-blog/vertical.webp',
  body:'<h2>Título interior</h2><p>Texto <strong>fuerte</strong> y <em>cursivo</em>.</p><figure><img src="/media/pb-blog/interior.webp" alt="Artesana pintando una pieza" loading="lazy"><figcaption>Trabajo en proceso · <strong>Crédito/Fuente:</strong> Planeta Boricua</figcaption></figure>',
  sources:[], publishedAt:'2026-08-26T12:00:00.000Z'
});
assert.match(latestHtml, /<h2>Título interior<\/h2>/, 'Latest headings must render instead of appearing as code.');
assert.match(latestHtml, /<strong>fuerte<\/strong>/, 'Latest bold text must render.');
assert.doesNotMatch(latestHtml, /&lt;h2&gt;/, 'Latest rich text must not be escaped after server sanitization.');
assert.match(latestHtml, /<figure><img src="\/media\/pb-blog\/interior\.webp" alt="Artesana pintando una pieza" loading="lazy"><figcaption>/, 'Latest must render inline images, ALT and captions in article order.');
assert.match(latestHtml, /\.body figure img\{display:block;width:100%;height:auto/, 'Latest inline images must scale responsively.');
assert.match(latestHtml, /\.body figure img\{max-width:100%\}/, 'Latest inline images must never overflow their article container.');
assert.match(latestHtml, /class="article-image pb-editorial-cover"><img class="pb-editorial-cover-image"/, 'Latest must use the shared non-cropping article cover system.');

const blogHtml = renderBlogPost({
  slug:'prueba-blog', title:'Prueba El Balcón', excerpt:'Resumen', image:'/media/pb-blog/square.webp',
  content:'<p>Primer párrafo.</p><figure><img src="/media/pb-blog/blog.webp" alt="Mesa con artesanías"><figcaption>Piezas terminadas · <strong>Crédito/Fuente:</strong> Archivo PB</figcaption></figure><p>Segundo párrafo.</p>',
  tags:[], date:'7 de septiembre de 2026', dateISO:'2026-09-07'
}, [], null, null, []);
assert.match(blogHtml, /<p>Primer párrafo\.<\/p><figure><img src="\/media\/pb-blog\/blog\.webp" alt="Mesa con artesanías"><figcaption>/, 'El Balcón must preserve inline images between paragraphs.');
assert.match(blogHtml, /\.post-body figure img\{display:block;width:100%;max-width:100%;height:auto/, 'El Balcón inline images must be responsive.');
assert.match(blogHtml, /class="post-hero pb-editorial-cover"><img class="pb-editorial-cover-image"/, 'El Balcón must use the same non-cropping article cover system.');
assert.match(editorialImages, /\.pb-editorial-card-image[\s\S]*object-fit: contain/, 'Editorial cards must preserve the complete image without cropping.');
assert.match(editorialImages, /\.pb-editorial-cover-image[\s\S]*object-fit: contain/, 'Individual articles must share one proportion-preserving cover rule.');

const sample = { slug:'muestra', title:'Muestra editorial', excerpt:'Resumen', summary:'Resumen', image:'/media/pb-blog/sample.webp', category:'Cultura', topic:'Cultura', publishedAt:'2026-09-19T12:00:00.000Z' };
const blogIndexHtml = renderBlogIndex([sample, sample], 1, 1, '', '', ['Cultura'], 2, []);
const latestIndexHtml = renderLatestIndex([sample], 1, 1, '', '', ['Cultura'], 1);
for (const rendered of [blogIndexHtml, latestIndexHtml, blogHtml, latestHtml]) {
  assert.match(rendered, /\/css\/pb-editorial-images\.css\?v=2/, 'Every editorial view must load the fresh shared image system.');
}
assert.match(blogIndexHtml, /class="story-img pb-editorial-card-media"[\s\S]*class="pb-editorial-card-image"/, 'El Balcón cards must use the shared card treatment.');
assert.match(blogIndexHtml, /\.story-img img\{[^}]*object-fit:contain/, 'El Balcón previews must show the complete image.');
assert.match(latestIndexHtml, /class="latest-media pb-editorial-card-media"[\s\S]*class="pb-editorial-card-image"/, 'Latest cards must use the shared card treatment.');
assert.match(latestIndexHtml, /\.latest-media img\{[^}]*object-fit:contain/, 'Latest previews must show the complete image.');
assert.doesNotMatch(latestIndexHtml, /\/go\/travel-flights|presentado por <span>Trip\.com/, 'Latest index must not bypass PB Ads with a fixed affiliate block.');

new vm.Script(asset, { filename:'pb-rich-text-editor.js' });
console.log('PB rich text editor contract: OK');
