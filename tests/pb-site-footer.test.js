const assert = require('assert');
require('./pb-service-worker.test');
require('./pb-artisan-metrics.test');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const { renderPBSiteFooter, withPBSiteFooter } = require('../src/views/planetaboricua/site-footer');
const { renderPBSocialFollow } = require('../src/views/planetaboricua/social-follow');

const canonical = renderPBSiteFooter();
assert.match(canonical, /data-pb-site-footer/);
assert.match(canonical, /href="\/lo-mas-reciente"/);
assert.match(canonical, /href="\/blog"/);
assert.match(canonical, /href="\/feria-artesanos"/);
assert.match(canonical, /href="\/agenda-boricua"/);
assert.match(canonical, /href="\/pueblos"/);
assert.match(canonical, /href="\/afiliados-boricua"/);
assert.match(canonical, /href="\/anunciate-en-pb">Anúnciate en PB/);
assert.match(canonical, /mailto:masboricuaqueunmofongo@gmail\.com/);
assert.match(canonical, /\.pb-footer\{[^}]*text-align:left/);
assert.match(canonical, /\.pb-footer-col a\{[^}]*text-align:left/);

const legacy = '<!doctype html><html><head><title>Prueba</title></head><body><main>Contenido</main><footer class="old"><a href="/privacidad">Privacidad</a></footer><script>window.ok=true</script></body></html>';
const normalized = withPBSiteFooter(legacy, { social: renderPBSocialFollow() });
assert.equal((normalized.match(/<footer\b/g) || []).length, 1);
assert.equal((normalized.match(/data-pb-site-footer>/g) || []).length, 1);
assert.equal((normalized.match(/data-pb-site-footer-styles/g) || []).length, 1);
assert.equal((normalized.match(/data-pb-social-follow/g) || []).length, 1);
assert.doesNotMatch(normalized, /class="old"/);
assert.match(normalized, /<main>Contenido<\/main>/);
assert.match(normalized, /<script>window\.ok=true<\/script>/);
assert.ok(normalized.indexOf('data-pb-social-follow') < normalized.indexOf('data-pb-site-footer>'));

const alreadyCanonical = withPBSiteFooter(
  `<html><body><main>Inicio</main>${renderPBSocialFollow()}${canonical}</body></html>`,
  { social: renderPBSocialFollow() }
);
assert.equal((alreadyCanonical.match(/<footer\b/g) || []).length, 1);
assert.equal((alreadyCanonical.match(/data-pb-site-footer>/g) || []).length, 1);
assert.equal((alreadyCanonical.match(/data-pb-site-footer-styles/g) || []).length, 1);
assert.equal((alreadyCanonical.match(/data-pb-social-follow/g) || []).length, 1);

for (const relative of [
  'src/views/planetaboricua.js',
  'src/views/planetaboricua/feriaartesanos.js',
  'src/views/planetaboricua/lo-mas-reciente-index.js',
  'src/views/pb-blog/index.js',
  'src/views/pb-blog/post.js',
  'src/views/recursos-boricua.js',
  'src/views/quienes-somos.js',
  'src/views/legal-boricua.js'
]) {
  const source = fs.readFileSync(path.join(root, relative), 'utf8');
  assert.match(source, /<footer\b|renderPBSiteFooter/, `${relative} must expose a footer for response normalization`);
}

const server = fs.readFileSync(path.join(root, 'src/server.js'), 'utf8');
assert.match(server, /withPBSiteFooter\(body, \{ social: renderPBSocialFollow\(\) \}\)/);
assert.doesNotMatch(server, /data-pb-legal-footer/);

console.log('PB shared site footer tests passed');
