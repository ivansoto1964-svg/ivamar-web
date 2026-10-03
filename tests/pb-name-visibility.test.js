const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');

const repeatedPublicSurfaces = [
  'public/pueblos/index.html',
  'src/views/planetaboricua.js',
  'src/views/planetaboricua/site-footer.js',
  'src/views/planetaboricua/feriaartesanos.js',
  'src/views/planetaboricua/noticias.js',
  'src/views/planetaboricua/add-negocio.js',
  'src/views/recursos-boricua.js',
  'src/views/regresar-a-pr.js',
  'src/views/mudarse-de-pr.js',
  'src/views/pb-blog/index.js'
];

for (const relative of repeatedPublicSurfaces) {
  assert.doesNotMatch(read(relative), /Iv[aá]n Soto/i, `${relative} must use the PB identity instead of repeating the owner name`);
}

const server = read('src/server.js');
assert.doesNotMatch(server, /© 2026 Planeta Boricua[^<\n]*Iv[aá]n Soto/i);

const legal = read('src/views/legal-boricua.js');
for (const footer of legal.match(/<footer\b[\s\S]*?<\/footer>/gi) || []) {
  assert.doesNotMatch(footer, /Iv[aá]n Soto/i);
}

assert.match(read('src/views/quienes-somos.js'), /creado y dirigido por <strong>Iván Soto<\/strong>/);
assert.match(read('src/views/pb-blog/post.js'), /✍️ <strong>Iván Soto<\/strong>/);
assert.match(read('src/views/planetaboricua/sala-prensa.js'), /expresó Iván Soto Pino/);
assert.match(read('src/services/pb-subscriber-welcome.js'), /<strong>Iván Soto Pino<\/strong>/);

console.log('PB personal name visibility tests passed');
