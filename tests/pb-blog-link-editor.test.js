const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const render = require('../src/views/pb-control');

const root = path.resolve(__dirname, '..');
const asset = fs.readFileSync(path.join(root, 'public/js/pb-blog-link-editor.js'), 'utf8');
const server = fs.readFileSync(path.join(root, 'src/server.js'), 'utf8');
const html = render({
  csrf:'test', counts:{}, blogPosts:[], latestPending:[], latestApproved:[],
  commentsPending:[], commentsApproved:[], artisansPending:[], artisansApproved:[],
  eventsPending:[], eventsApproved:[], subscribers:[], affiliates:[],
  artisanEmailAudit:{}, artisanMetrics:[], artisanMailHistory:[]
});

assert.match(html, /\/js\/pb-blog-link-editor\.js\?v=1/, 'PB Control must load the link button.');
assert.match(asset, /setRangeText/, 'The tool must insert the link at the selected text.');
assert.match(asset, /sponsored noopener noreferrer/, 'Affiliate links must be marked as sponsored.');
assert.match(asset, /\(enlace afiliado\)/, 'Affiliate disclosure must be visible in the article.');
assert.match(server, /test\(attrs\.rel \|\| ''\) \? 'sponsored noopener noreferrer'/, 'The sanitizer must preserve sponsored links.');
new vm.Script(asset, { filename:'pb-blog-link-editor.js' });

console.log('PB blog link editor contract: OK');
