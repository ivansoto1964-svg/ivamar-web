const assert = require('node:assert/strict');
const {withPBSiteShell,isPublicShellPath,renderSiteHeader} = require('../src/views/planetaboricua/site-shell');
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
  assert.match(output, /href="\/blog"[^>]*>[\s\S]*?<span class="pb-nav-label">El Balcón<\/span>/);
  const desktop = output.match(/<nav class="pb-site-nav"[^>]*>([\s\S]*?)<\/nav>/)[1];
  const mobile = output.match(/<nav class="pb-site-panel" aria-label="Navegación móvil">([\s\S]*?)<\/nav>/)[1];
  assert.match(desktop, /href="\/pueblos">[\s\S]*?<span class="pb-nav-label">Nuestros pueblos<\/span><\/a>/);
  assert.match(mobile, /href="\/pueblos">[\s\S]*?<span class="pb-nav-label">Nuestros pueblos<\/span><\/a>/);
  assert.doesNotMatch(output,/href="\/(?:talento-boricua|donde-comer|crea-tu-menu)"/,'Deferred sections must not be activated');
}
const artisan={name:'Taller de prueba',ownerName:'Persona de prueba',desc:'Trabajo artesanal.',photo:'https://example.com/photo.jpg',whatsapp:'17875551212',gallery:[{image:'https://example.com/pieza.jpg',title:'Creación',description:'Detalle de la pieza.'}]};
const original=profile(artisan,{slug:'taller-prueba',categoryLabel:'Artesanía',locationLabel:'Puerto Rico',events:[],recommendations:[]});
const output=withPBSiteShell(original,'/artesanos/taller-prueba');
for (const existing of ['https://wa.me/17875551212','/a/taller-prueba','/artesanos/taller-prueba/manifest.json','id="artisan-gallery-title"','Creación','Detalle de la pieza.','id="pb-share-profile"']) assert.ok(output.includes(existing),existing);
assert.ok(output.includes('<article class="profile">'));
assert.doesNotMatch(output,/pb-shell-profile-trail/);
console.log('PB shared navigation and profile preservation tests passed');

// Each destination retains a visible name and a decorative icon on both surfaces.
const header=renderSiteHeader('/blog');
const iconLinks=[...header.matchAll(/<a href="([^"]+)"([^>]*)>([\s\S]*?)<\/a>/g)].filter(m=>m[3].includes('pb-nav-label'));
assert.equal(iconLinks.length,28);
for(const link of iconLinks){
 assert.match(link[3],/<svg[^>]*aria-hidden="true"[^>]*focusable="false"/);
 assert.match(link[3],/<span class="pb-nav-label">[^<]+<\/span>/);
}
assert.equal(iconLinks.filter(m=>m[1]==='/pueblos'&&m[3].includes('data-pb-icon="plate"')).length,2);
assert.equal(iconLinks.filter(m=>m[1]==='/artesano-de-la-semana'&&m[3].includes('data-pb-icon="weekly"')).length,2);
assert.equal(iconLinks.filter(m=>m[1]==='/blog'&&m[2].includes('aria-current="page"')).length,2);
assert.match(header,/data-pb-icon="menu"/);
assert.doesNotMatch(header,/<img[^>]*src="https?:/);
