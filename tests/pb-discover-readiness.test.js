
'use strict';
const assert=require('node:assert/strict');
const blog=require('../src/views/pb-blog/post');
const latest=require('../src/views/planetaboricua/lo-mas-reciente');
const origin='https://www.masboricuaqueunmofongo.com';
function tags(html){return Object.fromEntries([...html.matchAll(/<meta (?:property|name)="([^"]+)" content="([^"]*)">/g)].map(x=>[x[1],x[2].replace(/&amp;/g,'&')]));}
function schema(html){return JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);}
const image='/media/pb-blog/prueba-vertical.png';
const b=blog({slug:'prueba-discover',title:'Una historia boricua',excerpt:'Resumen fiel de la historia.',content:'<p>Contenido editorial original.</p>',image,dateISO:'2026-10-19',updatedISO:'2026-10-19T17:00:00Z',tags:[]},[],null,null);
const l=latest({slug:'prueba-discover',title:'Otra historia boricua',summary:'Resumen de la publicación.',body:'<p>Contenido editorial.</p>',image,sources:[],publishedAt:'2026-10-19T17:00:00Z'});
for(const html of [b,l]){
 const meta=tags(html),data=schema(html);
 assert.equal(meta.robots,'index,follow,max-image-preview:large');
 assert.equal((html.match(/<meta name="robots"/g)||[]).length,1);
 assert.ok(meta['og:image'].startsWith(origin+image));
 assert.equal(meta['twitter:image'],meta['og:image']);
 assert.equal(Array.isArray(data.image)?data.image[0]:data.image,meta['og:image']);
 assert.doesNotMatch(meta['og:image'],/crop|w_640|w_600|pb-blog-optimized/);
 assert.match(html,/class="pb-editorial-cover-image"/);
 assert.match(html,/\/css\/pb-editorial-images\.css\?v=3/);
 assert.doesNotMatch(html,/<meta name="robots"[^>]*noindex/);
}
assert.match(tags(b)['og:image'],/v=2026-10-19/);
assert.doesNotMatch(latest(null),/max-image-preview/,'An unavailable article is not promoted for discovery.');
console.log('PASS: article large-image permission; original cover and metadata/schema consistency; existing image layout preserved.');
