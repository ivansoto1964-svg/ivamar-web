const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const server = fs.readFileSync(path.join(root, 'src/server.js'), 'utf8');
const home = fs.readFileSync(path.join(root, 'src/views/planetaboricua.js'), 'utf8');
const renderedHome = require('../src/views/planetaboricua');
const fair = fs.readFileSync(path.join(root, 'src/views/planetaboricua/feriaartesanos.js'), 'utf8');
const profileSource = fs.readFileSync(path.join(root, 'src/views/planetaboricua/artesano-perfil.js'), 'utf8');
const artisanProfile = require('../src/views/planetaboricua/artesano-perfil');
const fairPage = require('../src/views/planetaboricua/feriaartesanos');
const { renderPBSiteFooter } = require('../src/views/planetaboricua/site-footer');

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
assert.match(renderedHome, /data-pb-site-footer/);

assert.match(server, /app\.get\("\/buscar", \(req, res\) => \{/);
assert.match(server, /`\/feria-artesanos\?q=\$\{encodeURIComponent\(query\)\}`/);
assert.match(server, /res\.redirect\(301, target\)/);
assert.match(server, /app\.get\('\/enviar-evento-boricua', \(_req, res\) => res\.redirect\(301, '\/compartir-evento-boricua'\)\)/);
assert.doesNotMatch(profileSource, /href="\/enviar-evento-boricua"/);
assert.match(profileSource, /href="\/compartir-evento-boricua"/);

assert.match(fair, /new URLSearchParams\(window\.location\.search\)\.get\('q'\)/);
assert.match(fair, /initialSearch\.slice\(0, 120\)/);
assert.match(fair, /validHost/);

const renderedFair = fairPage;
const inlineScripts = [...renderedFair.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(match => match[1]);
assert.doesNotThrow(() => inlineScripts.forEach(script => new Function(script)));
assert.ok(renderedFair.includes('q.split(/\\s+/)'));

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
assert.match(cleanedInstagram, /data-pb-site-footer/);
assert.match(cleanedInstagram, /href="\/privacidad-boricua"/);
assert.match(cleanedInstagram, /href="\/terminos-boricua"/);
assert.doesNotMatch(cleanedInstagram, /Un espacio para descubrir, compartir y mantener viva/);
assert.equal((cleanedInstagram.match(/data-pb-site-footer>/g) || []).length, 1);
assert.equal((renderedHome.match(/data-pb-site-footer>/g) || []).length, 1);
assert.equal(renderPBSiteFooter(), renderedHome.match(/<style data-pb-site-footer-styles>[\s\S]*?<\/footer>/)[0]);
assert.match(cleanedInstagram, /id="pb-share-profile"/);
assert.match(cleanedInstagram, /id="pb-copy-profile"/);
assert.match(cleanedInstagram, /id="pb-share-facebook"/);
assert.match(cleanedInstagram, /id="pb-share-instagram"/);
assert.match(cleanedInstagram, />WhatsApp<\/a>/);
assert.match(cleanedInstagram, />⬇️ Descargar QR<\/a>/);
assert.match(cleanedInstagram, /navigator\.share\(\{title,text,url\}\)/);
assert.match(cleanedInstagram, /navigator\.clipboard\.writeText\(url\)/);
assert.match(cleanedInstagram, /data-pb-track="share"/);
assert.match(cleanedInstagram, /Promociona este perfil/);
assert.ok(cleanedInstagram.indexOf('Promociona este perfil') < cleanedInstagram.indexOf('Compra directamente al artesano'));
const profileWithGallery = artisanProfile({...baseItem,gallery:['https://res.cloudinary.com/demo/image/upload/second.jpg']},helpers);
assert.ok(profileWithGallery.indexOf('Promociona este perfil') < profileWithGallery.indexOf('👐 Mis creaciones'));
assert.equal((cleanedInstagram.match(/Descargar QR/g) || []).length, 1);
const profileScripts = [...cleanedInstagram.matchAll(/<script>([\s\S]*?)<\/script>/gi)].map(match => match[1]);
assert.doesNotThrow(() => profileScripts.forEach(script => new Function(script)));

console.log('PB portal experience tests passed');
