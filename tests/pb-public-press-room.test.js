const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const salaPrensa = require('../src/views/planetaboricua/sala-prensa');

const html = salaPrensa();
assert.match(html, /<h1>Sala de Prensa<\/h1>/);
assert.match(html, /Fotografías oficiales/);
assert.match(html, /8 imágenes/);
assert.match(html, /masboricuaqueunmofongo@gmail\.com/);
assert.equal(salaPrensa.PHOTOS.length, 8);
assert.doesNotMatch(html, /Artesanoa/);
assert.equal((html.match(/<footer/g) || []).length, 0);
assert.ok(html.indexOf('Más de 230 artesanos de Puerto Rico y Estados Unidos se unen en una Feria Digital permanente') < html.indexOf('Fotografías oficiales'));
assert.match(html, /Al 14 de septiembre de 2026, la Feria reúne a 237 artesanos de Puerto Rico y de 11 estados de Estados Unidos/);
assert.match(html, /“Un artesano puede estar en Etsy entre miles de opciones de todas partes del mundo\./);

for (const photo of salaPrensa.PHOTOS) {
  assert.ok(html.includes(photo.file));
  assert.ok(fs.existsSync(path.join(__dirname, '..', 'public', 'media', 'sala-prensa', 'artesanos', photo.file)), `${photo.file} must exist`);
}

const server = fs.readFileSync(path.join(__dirname, '..', 'src', 'server.js'), 'utf8');
assert.match(server, /app\.get\('\/sala-de-prensa'/);
assert.match(server, /masboricuaqueunmofongo\.com\/sala-de-prensa/);
console.log('PB public press room tests passed');
