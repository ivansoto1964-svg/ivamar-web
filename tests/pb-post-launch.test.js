const assert = require('assert');
const fs = require('fs');
const path = require('path');
const artisanProfile = require('../src/views/planetaboricua/artesano-perfil');
const artisanSelfService = require('../src/views/planetaboricua/artesano-mi-perfil');
const artisanAdmin = require('../src/views/planetaboricua/artesano-admin');
const { hasRequiredDetailsForNewCreations } = require('../src/utils/pb-artisan-creations');
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
  email:'artesana@example.com', whatsapp:'17875551212', photo:cloudinaryImage(0), gallery:[
    {image:cloudinaryImage(1),title:'Pulsera Mar Caribe',description:'Creada a mano con cuentas azules y blancas.',alt:'Pulsera azul y blanca sobre una mesa de madera'},
    ...[2,3,4,5,6,7,8,9,10,11,12,13].map(cloudinaryImage)
  ]
};
const helpers = {categoryLabel:'Joyería',locationLabel:'Caguas, Puerto Rico',slug:'taller-prueba',events:[],recommendations:[]};
const profile = artisanProfile(item, helpers);
assert.match(profile, /class="artisan-gallery"/);
assert.match(profile, /👐 Mis creaciones/);
assert.equal((profile.match(/class="artisan-gallery-grid"/g) || []).length, 1);
assert.equal((profile.match(/<article class="artisan-creation/g) || []).length, 12);
assert.equal((profile.match(/alt="Trabajo adicional de Taller de prueba"/g) || []).length, 11);
assert.match(profile, /Pulsera Mar Caribe/);
assert.match(profile, /Creada a mano con cuentas azules y blancas/);
assert.match(profile, /alt="Pulsera azul y blanca sobre una mesa de madera"/);
assert.match(profile, /loading="lazy" decoding="async" fetchpriority="low"/);
assert.match(profile, /width="640" height="480"/);
assert.match(profile, />Contactar al artesano</);
assert.doesNotMatch(profile, />Comprar</);

const selfEdit = artisanSelfService.editPage(item, 'token', '/artesanos/taller-prueba');
assert.match(selfEdit, /name="gallery"/);
assert.match(selfEdit, /pb-artisan-gallery\.js/);
assert.match(selfEdit, /Mis creaciones/);
assert.match(selfEdit, /hasta 12 creaciones/i);
assert.match(selfEdit, /Este ejemplo es solamente orientación/);
const adminEdit = artisanAdmin.edit({...item,slug:'taller-prueba'}, 'csrf');
assert.match(adminEdit, /name="gallery"/);
assert.match(adminEdit, /pb-artisan-gallery\.js/);
assert.match(adminEdit, /Mis creaciones/);

const server = fs.readFileSync(path.join(root,'src/server.js'),'utf8');
assert.match(server, /PB_ARTISAN_GALLERY_LIMIT = 12/);
assert.match(server, /PB_ARTISAN_CREATION_LIMITS/);
assert.ok(server.includes('jpeg|png|webp'), 'server must validate the supported image MIME types');
assert.match(server, /quality: 'auto:good'/);
assert.match(server, /renderPBSocialFollow/);

const galleryClient = fs.readFileSync(path.join(root,'public/js/pb-artisan-gallery.js'),'utf8');
assert.match(galleryClient, /const MAX_IMAGES = 12/);
assert.match(galleryClient, /Título de la creación/);
assert.match(galleryClient, /Texto alternativo/);
assert.match(galleryClient, /Mostrar otra idea/);
assert.doesNotMatch(galleryClient, /precio|comprar|carrito/i);
assert.match(galleryClient, /historical:!allNew/);
assert.match(galleryClient, /required = !creation\.historical/);

const legacyGallery = [cloudinaryImage(1),cloudinaryImage(2)];
assert.equal(hasRequiredDetailsForNewCreations([
  {image:cloudinaryImage(1),title:'',description:'',alt:''},
  {image:cloudinaryImage(2),title:'',description:'',alt:''}
],legacyGallery),true,'historical URL-only photos must remain exempt');
assert.equal(hasRequiredDetailsForNewCreations([
  {image:cloudinaryImage(7),title:'Nueva pieza',description:'Creada a mano.',alt:''}
],legacyGallery),true,'new creation may omit alt text');
assert.equal(hasRequiredDetailsForNewCreations([
  {image:cloudinaryImage(7),title:'',description:'Creada a mano.',alt:''}
],legacyGallery),false,'new creation must have a title');
assert.equal(hasRequiredDetailsForNewCreations([
  {image:cloudinaryImage(7),title:'Nueva pieza',description:'',alt:''}
],legacyGallery),false,'new creation must have a description');
assert.equal(hasRequiredDetailsForNewCreations([
  {image:cloudinaryImage(8),title:'',description:'',alt:''}
],[{image:cloudinaryImage(8),title:'Pieza publicada',description:'Descripción publicada.',alt:''}]),false,'a modern creation cannot lose its required details');

console.log('PB post-launch social and artisan gallery tests passed');
