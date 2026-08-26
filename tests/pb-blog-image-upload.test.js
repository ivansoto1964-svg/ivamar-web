const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const render = require('../src/views/pb-control');

const root = path.resolve(__dirname, '..');
const asset = fs.readFileSync(path.join(root, 'public/js/pb-blog-image-upload.js'), 'utf8');
const html = render({
  csrf:'test', counts:{}, blogPosts:[], latestPending:[], latestApproved:[],
  commentsPending:[], commentsApproved:[], artisansPending:[], artisansApproved:[],
  eventsPending:[], eventsApproved:[], subscribers:[], affiliates:[],
  artisanEmailAudit:{}, artisanMetrics:[], artisanMailHistory:[]
});

assert.match(html, /\/js\/pb-blog-image-upload\.js\?v=1/, 'PB Control must load the reliable blog image uploader.');
assert.match(asset, /data\.image = await uploadLatestImage\(file\)/, 'The image must upload before the article is saved.');
assert.ok(asset.indexOf('uploadLatestImage(file)') < asset.indexOf("apiAction('blog-save'"), 'The upload must finish before publishing.');
assert.match(asset, /latest-image-preview show/, 'A selected image must display a preview.');
new vm.Script(asset, { filename:'pb-blog-image-upload.js' });

console.log('PB blog image upload contract: OK');
