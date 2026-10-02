const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

const { createPBAds } = require('../src/services/pb-ads');
const { insertAdsByProgress } = require('../src/views/planetaboricua/pb-ad');
const { renderExplorePB } = require('../src/views/planetaboricua/explore-pb');

const legacyArticle = `<p>Entrada uno.<br />Entrada dos.<br /><strong>Título con salto<br />que no debe partirse</strong>.<br />Entrada cuatro.<br />Entrada cinco.<br />Entrada seis.<br />Entrada siete.<br />Entrada ocho.</p>`;
const placed = insertAdsByProgress(legacyArticle,[
  {progress:.4,html:'<aside>A</aside>'},
  {progress:.75,html:'<aside>B</aside>'}
]);

assert.ok(placed.includes('</p><aside>A</aside><p>'),'first ad must be inserted between valid paragraphs');
assert.ok(placed.includes('</p><aside>B</aside><p>'),'second ad must be inserted between valid paragraphs');
assert.strictEqual((placed.match(/<p>/g)||[]).length,(placed.match(/<\/p>/g)||[]).length,'paragraph tags must stay balanced');
assert.ok(placed.includes('<strong>Título con salto<br />que no debe partirse</strong>'),'inline formatting must remain intact');

const noSafeBoundary = insertAdsByProgress('Texto heredado sin bloques.',[{progress:.5,html:'<aside>A</aside>'}]);
assert.strictEqual(noSafeBoundary,'Texto heredado sin bloques.<aside>A</aside>','an ad without a safe boundary must be appended, never injected into text');

const explore = renderExplorePB([{title:'Publicación',href:'/publicacion',image:'/img/cuadrada.png',area:'PB'}]);
assert.match(explore,/\.pb-explore-image\{padding:\.25rem\}/);
assert.match(explore,/object-fit:contain/);
assert.doesNotMatch(explore,/object-fit:cover/);

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(),'pb-ads-rotation-'));
const seedFile = path.join(tempRoot,'campaigns.json');
const base = {
  headline:'Campaña',description:'Descripción',cta:'Ver',image:'/img/og-planetaboricua.jpg',imageAlt:'Imagen',
  destinationUrl:'https://example.com',type:'affiliate',vertical:'retail',status:'active',startsAt:'',endsAt:'',
  sections:['latest'],categories:[],placements:['latest.inline_1'],advertiser:'Prueba',affiliateNetwork:'Prueba',
  excludedArtisanCategories:[],createdAt:'2026-10-02T00:00:00.000Z',updatedAt:'2026-10-02T00:00:00.000Z'
};
fs.writeFileSync(seedFile,JSON.stringify([
  {...base,id:'pbad-high',internalName:'Alta',priority:10},
  {...base,id:'pbad-low',internalName:'Baja',priority:1}
]));

try {
  const service = createPBAds({liveDir:path.join(tempRoot,'live'),seedFile});
  const seen = new Set();
  for (let index = 0; index < 300; index += 1) {
    seen.add(service.select({section:'latest',placement:'latest.inline_1',pageSlug:`pagina-${index}`,now:'2026-10-02T12:00:00.000Z'}).id);
  }
  assert.deepStrictEqual([...seen].sort(),['pbad-high','pbad-low'],'lower-priority campaigns of the winning type must still rotate');
} finally {
  fs.rmSync(tempRoot,{recursive:true,force:true});
}

console.log('PB Ads regression tests passed');
