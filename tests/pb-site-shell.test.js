const assert = require('node:assert/strict');
const {withPBSiteShell,isPublicShellPath} = require('../src/views/planetaboricua/site-shell');
const profile = require('../src/views/planetaboricua/artesano-perfil');
const sample = '<!doctype html><html><head><title>PB</title></head><body><nav><a href="/">Old</a></nav><main><form action="/blog/buscar"><input name="q"></form><nav aria-label="Páginas"><a href="?page=2">Siguiente</a></nav></main></body></html>';
for (const route of ['/pb-control','/pb-control/ads','/api/listings','/artesanos/mi-perfil','/artesanos/test/qr','/artesanos/test/qr.png','/artesanos/comunicaciones/salir/token','/turistiando/presentacion']) {
  assert.equal(isPublicShellPath(route),false,route);
  assert.equal(withPBSiteShell(sample,route),sample);
}
for (const route of ['/','/blog','/blog/prueba','/lo-mas-reciente','/agenda-boricua','/feria-artesanos','/recursos','/artesanos/taller-prueba']) {
  const output=withPBSiteShell(sample,route);
  assert.equal((output.match(/id="pb-page-content"/g)||[]).length,1);
  assert.match(output,/<form action="\/blog\/buscar"><input name="q"><\/form>/);
  assert.match(output,/<nav aria-label="Páginas"><a href="\?page=2">Siguiente<\/a><\/nav>/);
  assert.match(output,/aria-label="Navegación principal"/);
  assert.match(output,/aria-label="Navegación móvil"/);
  assert.equal(withPBSiteShell(output,route),output,'Applying shell twice must be harmless');
  assert.ok(output.indexOf('id="pb-page-content"')>output.indexOf('aria-label="Navegación móvil"'));
  assert.doesNotMatch(output,/pb-shell-intro|pb-shell-mobile|Un planeta\./);
  assert.match(output, /href="\/blog"[^>]*>El Balcón/);
  assert.doesNotMatch(output,/href="\/(?:talento-boricua|donde-comer|crea-tu-menu)"/,'Deferred sections must not be activated');
}
const artisan={name:'Taller de prueba',ownerName:'Persona de prueba',desc:'Trabajo artesanal.',photo:'https://example.com/photo.jpg',whatsapp:'17875551212',gallery:[{image:'https://example.com/pieza.jpg',title:'Creación',description:'Detalle de la pieza.'}]};
const original=profile(artisan,{slug:'taller-prueba',categoryLabel:'Artesanía',locationLabel:'Puerto Rico',events:[],recommendations:[]});
const output=withPBSiteShell(original,'/artesanos/taller-prueba');
for (const existing of ['https://wa.me/17875551212','/a/taller-prueba','/artesanos/taller-prueba/manifest.json','id="artisan-gallery-title"','Creación','Detalle de la pieza.','id="pb-share-profile"']) assert.ok(output.includes(existing),existing);
assert.ok(output.includes('<article class="profile">'));
assert.doesNotMatch(output,/pb-shell-profile-trail/);
console.log('PB shared navigation and profile preservation tests passed');
