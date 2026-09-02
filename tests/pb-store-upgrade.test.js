const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const store = require(path.join(root, 'src/views/tienda-boricua'));
const home = fs.readFileSync(path.join(root, 'src/views/planetaboricua.js'), 'utf8');
const server = fs.readFileSync(path.join(root, 'src/server.js'), 'utf8');

const campaigns = [
  'amazon-store', 'amazon-shirts', 'amazon-flags', 'amazon-kitchen',
  'amazon-music', 'amazon-books', 'amazon-home', 'amazon-auto',
  'amazon-gifts', 'amazon-merch'
];

assert.match(store, /<html lang="es">/);
assert.match(store, /rel="canonical" href="https:\/\/www\.masboricuaqueunmofongo\.com\/tienda-boricua"/);
assert.match(store, /Como afiliado de Amazon/);
assert.match(store, /sin costo adicional para ti/);
assert.match(store, /Confirma en Amazon el precio, la disponibilidad y la entrega/);
assert.doesNotMatch(store, /entrega rápida/i);

campaigns.forEach(campaign => {
  assert.ok(store.includes(`/go/${campaign}`), `La tienda debe incluir /go/${campaign}`);
  assert.ok(server.includes(`'${campaign}'`), `PB Control debe reconocer ${campaign}`);
});

assert.match(server, /const tiendaBoricua = require\("\.\/views\/tienda-boricua"\)/);
assert.match(server, /app\.get\("\/tienda-boricua", \(req, res\) => res\.send\(tiendaBoricua\)\)/);
assert.match(server, /https:\/\/www\.masboricuaqueunmofongo\.com\/tienda-boricua<\/loc>/);
assert.match(server, /'amazon-merch': \{ label:'Amazon · Merch oficial PB', url:'https:\/\/amzn\.to\/4gbJZVv' \}/);

assert.ok(home.includes('href="/tienda-boricua"'), 'La portada debe enlazar a la tienda interna');
assert.ok(home.includes('href="/go/amazon-merch"'), 'Merch debe medirse mediante PB Control');
assert.doesNotMatch(home, /href="https:\/\/amzn\.to\/4gbJZVv"/);
assert.doesNotMatch(home, /\/img\/shop\/[^"']+"[^>]+loading="eager"/);
assert.doesNotMatch(home, /entrega rápida en USA y Puerto Rico/i);

console.log('✓ Tienda Planeta Boricua: navegación, transparencia, medición y rendimiento verificados');
