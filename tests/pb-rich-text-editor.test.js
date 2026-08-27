const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const renderControl = require('../src/views/pb-control');
const renderLatest = require('../src/views/planetaboricua/lo-mas-reciente');

const root = path.resolve(__dirname, '..');
const asset = fs.readFileSync(path.join(root, 'public/js/pb-rich-text-editor.js'), 'utf8');
const server = fs.readFileSync(path.join(root, 'src/server.js'), 'utf8');
const html = renderControl({
  csrf:'test', counts:{}, blogPosts:[], latestPending:[], latestApproved:[],
  commentsPending:[], commentsApproved:[], artisansPending:[], artisansApproved:[],
  eventsPending:[], eventsApproved:[], subscribers:[], affiliates:[],
  artisanEmailAudit:{}, artisanMetrics:[], artisanMailHistory:[]
});

assert.match(html, /\/js\/pb-rich-text-editor\.js\?v=1/, 'PB Control must load the visual editor.');
assert.match(asset, /Negrita/);
assert.match(asset, /Cursiva/);
assert.match(asset, /Título grande/);
assert.match(asset, /insertUnorderedList/);
assert.match(asset, /text\/html/, 'Rich clipboard HTML must be read when pasting.');
assert.match(asset, /sponsored noopener noreferrer/, 'Affiliate links must remain disclosed and protected.');
assert.match(server, /const body = blogContentHtml\(req\.body\.body \|\| ''\);/, 'Latest posts must save sanitized rich text.');
assert.match(server, /body:blogContentHtml\(item\.body\)/, 'Latest posts must be sanitized again before rendering.');
assert.match(server, /https:\/\/www\.trip\.com\/\?SID=2209817&allianceid=1094387&utm_campaign=520530/, 'Trip.com must use the direct affiliate URL without the fragile short-link redirect.');

const latestHtml = renderLatest({
  slug:'prueba', title:'Prueba', summary:'Resumen', image:'',
  body:'<h2>Título interior</h2><p>Texto <strong>fuerte</strong> y <em>cursivo</em>.</p>',
  sources:[], publishedAt:'2026-08-26T12:00:00.000Z'
});
assert.match(latestHtml, /<h2>Título interior<\/h2>/, 'Latest headings must render instead of appearing as code.');
assert.match(latestHtml, /<strong>fuerte<\/strong>/, 'Latest bold text must render.');
assert.doesNotMatch(latestHtml, /&lt;h2&gt;/, 'Latest rich text must not be escaped after server sanitization.');

new vm.Script(asset, { filename:'pb-rich-text-editor.js' });
console.log('PB rich text editor contract: OK');
