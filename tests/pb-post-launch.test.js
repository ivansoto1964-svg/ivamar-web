const assert = require('assert');
const fs = require('fs');
const path = require('path');
const artisanProfile = require('../src/views/planetaboricua/artesano-perfil');
const artisanSelfService = require('../src/views/planetaboricua/artesano-mi-perfil');
const artisanAdmin = require('../src/views/planetaboricua/artesano-admin');
const { NETWORKS, renderPBSocialFollow } = require('../src/views/planetaboricua/social-follow');

const root = path.join(__dirname, '..');
const cloudinaryImage = index => `https://res.cloudinary.com/planeta/image/upload/v1/artesanos/foto-${index}.webp`;

assert.deepEqual(NETWORKS.map(item => [item.name, item.href]), [
  ['Facebook','https://www.facebook.com/elplanetaboricua/'],
  ['Instagram','https://www.instagram.com/miplanetaboricua/'],
  ['TikTok','https://www.tiktok.com/@planetaboricua4'],
  ['YouTube','https://www.youtube.com/@planetaboricua'],
  ['Telegram','https://t.me/planetaboricua']
]);
const social = renderPBSocialFollow();
assert.match(social, /Síguenos en:/);
assert.equal((social.match(/<a href=/g) || []).length, 5);
assert.equal((social.match(/target="_blank"/g) || []).length, 5);
assert.equal((social.match(/rel="noopener noreferrer"/g) || []).length, 5);
assert.equal((social.match(/aria-label="Seguir a Planeta Boricua en /g) || []).length, 5);
assert.equal((social.match(/<svg /g) || []).length, 5);

const item = {
  id:'artisan-1', name:'Taller de prueba', ownerName:'Artesana', category:'joyeria', location:'caguas', city:'Caguas',
  desc:'Joyería artesanal inspirada en la cultura y naturaleza de Puerto Rico.', fullDesc:'Creamos piezas originales con técnicas artesanales y materiales seleccionados.',
  email:'artesana@example.com', photo:cloudinaryImage(0), gallery:[1,2,3,4,5,6].map(cloudinaryImage)
};
const helpers = {categoryLabel:'Joyería',locationLabel:'Caguas, Puerto Rico',slug:'taller-prueba',events:[],recommendations:[]};
const profile = artisanProfile(item, helpers);
assert.match(profile, /class="artisan-gallery"/);
assert.equal((profile.match(/class="artisan-gallery-grid"/g) || []).length, 1);
assert.equal((profile.match(/alt="Trabajo adicional de Taller de prueba"/g) || []).length, 5);
assert.match(profile, /loading="lazy" decoding="async"/);
assert.match(profile, /width="600" height="450"/);

const selfEdit = artisanSelfService.editPage(item, 'token', '/artesanos/taller-prueba');
assert.match(selfEdit, /name="gallery"/);
assert.match(selfEdit, /pb-artisan-gallery\.js/);
const adminEdit = artisanAdmin.edit({...item,slug:'taller-prueba'}, 'csrf');
assert.match(adminEdit, /name="gallery"/);
assert.match(adminEdit, /pb-artisan-gallery\.js/);

const server = fs.readFileSync(path.join(root,'src/server.js'),'utf8');
assert.match(server, /PB_ARTISAN_GALLERY_LIMIT = 5/);
assert.ok(server.includes('jpeg|png|webp'), 'server must validate the supported image MIME types');
assert.match(server, /quality: 'auto:good'/);
assert.match(server, /renderPBSocialFollow/);

console.log('PB post-launch social and artisan gallery tests passed');
