'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {PREVIEW_PATH, renderPreview, servePreview} = require('../src/services/pb-lakeland-preview');

test('partner preview keeps business content and images encrypted', () => {
  const page = renderPreview();
  assert.match(page, /type="password"/);
  assert.match(page, /crypto\.subtle\.decrypt/);
  assert.match(page, /sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"/);
  assert.doesNotMatch(page, /Villa Montaña|info@villacofresi|data:image|googletagmanager|adsbygoogle/);
  assert.doesNotMatch(page, /localStorage|sessionStorage|fetch\(/);
  const encrypted = require('../src/data/pb-lakeland-preview.encrypted.json');
  assert.equal(encrypted.algorithm, 'AES-256-GCM');
  assert.ok(encrypted.iterations >= 600000);
  assert.equal(Buffer.from(encrypted.iv, 'base64').length, 12);
});

test('partner preview is private, non-indexable and cannot send forms or requests', () => {
  let headers, body, type;
  servePreview({}, {set(value) {headers=value; return this;}, type(value) {type=value;return this;}, send(value){body=value;return this;}});
  assert.equal(type, 'html');
  assert.match(headers['Cache-Control'], /no-store/);
  assert.match(headers['X-Robots-Tag'], /noindex/);
  assert.equal(headers['Referrer-Policy'], 'no-referrer');
  assert.match(headers['Content-Security-Policy'], /connect-src 'none'/);
  assert.match(headers['Content-Security-Policy'], /form-action 'none'/);
  assert.ok(body.includes('frame.srcdoc='));
});

test('preview route precedes tracking and has no static unencrypted fallback', () => {
  const server=fs.readFileSync(path.join(__dirname,'../src/server.js'),'utf8');
  assert.ok(server.indexOf('app.get(pbLakelandPreview.PREVIEW_PATH') < server.indexOf('// PB analytics:'));
  assert.equal(PREVIEW_PATH, '/propuestas/lakeland-aguadilla');
  assert.equal(fs.existsSync(path.join(__dirname,'../public/propuestas/lakeland-aguadilla.html')), false);
});
