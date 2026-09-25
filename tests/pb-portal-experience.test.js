const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const server = fs.readFileSync(path.join(root, 'src/server.js'), 'utf8');
const home = fs.readFileSync(path.join(root, 'src/views/planetaboricua.js'), 'utf8');
const fair = fs.readFileSync(path.join(root, 'src/views/planetaboricua/feriaartesanos.js'), 'utf8');
const profileSource = fs.readFileSync(path.join(root, 'src/views/planetaboricua/artesano-perfil.js'), 'utf8');
const artisanProfile = require('../src/views/planetaboricua/artesano-perfil');

assert.match(home, /Feria Digital · Abierta 24\/7/);
assert.match(home, /Visita la Feria Digital de Artesanos Boricuas/);
assert.match(home, /Explorar la Feria →/);
assert.match(home, /¿Eres artesano\? Crea tu espacio digital gratis/);
assert.match(home, /href="\/lo-mas-reciente" class="sec-divider-link">Ver todas →/);
assert.match(home, /id="pb-nav-toggle"[^>]*aria-expanded="false"/);
assert.match(home, /\.nav-links\.is-open\{display:flex;\}/);
assert.doesNotMatch(home, /El <strong>23 de septiembre<\/strong>/);
assert.match(home, /Enlace afiliado · Trip\.com/);
assert.equal((home.match(/rel="sponsored noopener noreferrer"/g) || []).length, 8);
assert.equal((home.match(/id="vimg-pr"/g) || []).length, 1);

assert.match(server, /app\.get\("\/buscar", \(req, res\) => \{/);
assert.match(server, /`\/feria-artesanos\?q=\$\{encodeURIComponent\(query\)\}`/);
assert.match(server, /res\.redirect\(301, target\)/);
assert.match(server, /app\.get\('\/enviar-evento-boricua', \(_req, res\) => res\.redirect\(301, '\/compartir-evento-boricua'\)\)/);
assert.doesNotMatch(profileSource, /href="\/enviar-evento-boricua"/);
assert.match(profileSource, /href="\/compartir-evento-boricua"/);

assert.match(fair, /new URLSearchParams\(window\.location\.search\)\.get\('q'\)/);
assert.match(fair, /initialSearch\.slice\(0, 120\)/);
assert.match(fair, /validHost/);

const baseItem = {
  name:'Perfil de prueba', category:'pintura', location:'caguas', city:'Caguas',
  desc:'Creaciones artesanales.', fullDesc:'Creaciones artesanales puertorriqueñas.',
  photo:'https://res.cloudinary.com/demo/image/upload/example.jpg', gallery:[]
};
const helpers = {categoryLabel:'Pintura',locationLabel:'Caguas, Puerto Rico',slug:'perfil-prueba',events:[],recommendations:[]};
const invalidLinks = artisanProfile({...baseItem,website:'N/A',instagram:'Joelo Artista Puertorriqueño',whatsapp:'123'},helpers);
assert.doesNotMatch(invalidLinks, />Visitar su página</);
assert.doesNotMatch(invalidLinks, />Ver Instagram</);
assert.doesNotMatch(invalidLinks, />Contactar por WhatsApp</);

const cleanedInstagram = artisanProfile({...baseItem,instagram:'https://instagram.com/alysboutique.bohostyle?utm_source=qr'},helpers);
assert.match(cleanedInstagram, /href="https:\/\/www\.instagram\.com\/alysboutique\.bohostyle"/);
assert.doesNotMatch(cleanedInstagram, /%3Futm_source/);

console.log('PB portal experience tests passed');
