const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const page = require('../src/views/planetaboricua/publicidad');
const { withPBSiteFooter } = require('../src/views/planetaboricua/site-footer');
const { renderPBSocialFollow } = require('../src/views/planetaboricua/social-follow');
const server = fs.readFileSync(path.join(root, 'src/server.js'), 'utf8');

assert.match(page, /<title>Publicidad en PB — Planeta Boricua<\/title>/);
assert.match(page, /Campañas desde \$75 por 30 días/);
assert.match(page, /impresiones, clics y CTR/);
assert.match(page, /no garantiza ventas, clientes, reservaciones ni una cantidad específica de clics/i);
assert.match(page, /no compra cobertura editorial favorable/i);
assert.match(page, /Solicitud%20de%20publicidad%20en%20PB/);
assert.doesNotMatch(page, /fundador/i);
assert.doesNotMatch(page, /adsense|adsbygoogle|googlesyndication/i);
assert.doesNotMatch(page, /\$125|\$225|\$250/);
assert.match(server, /app\.get\("\/anunciate-en-pb", \(_req, res\) => res\.send\(publicidadPB\)\)/);
assert.match(server, /\/anunciate-en-pb<\/loc>/);

const publicPage = withPBSiteFooter(page, { social: renderPBSocialFollow() });
assert.equal((publicPage.match(/data-pb-site-footer>/g) || []).length, 1);
assert.equal((publicPage.match(/data-pb-social-follow/g) || []).length, 1);
assert.match(publicPage, /href="\/anunciate-en-pb">Anúnciate en PB/);

console.log('PB advertising page tests passed');
