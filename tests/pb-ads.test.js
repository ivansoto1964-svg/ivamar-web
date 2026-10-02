const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

const { createPBAds, validateCampaign, wordCount, artisanEligible } = require('../src/services/pb-ads');
const { renderPBAd, insertAfterBlocks, insertAdsAfterBlocks, insertAdsByProgress } = require('../src/views/planetaboricua/pb-ad');
const renderBlogPost = require('../src/views/pb-blog/post');
const renderLatest = require('../src/views/planetaboricua/lo-mas-reciente');
const renderArtisan = require('../src/views/planetaboricua/artesano-perfil');
const renderControl = require('../src/views/pb-ads-control');

const repositorySeed = JSON.parse(fs.readFileSync(path.join(__dirname,'../data/pb-ads/campaigns.json'),'utf8'));
const adStyles = fs.readFileSync(path.join(__dirname,'../public/css/pb-ads.css'),'utf8');
const adScript = fs.readFileSync(path.join(__dirname,'../public/js/pb-ads.js'),'utf8');
repositorySeed.forEach(campaign => assert.doesNotThrow(() => validateCampaign(campaign,campaign)));
assert.ok(repositorySeed.every(campaign => campaign.status === 'draft'),'starter campaigns must require an explicit activation');
assert.ok(repositorySeed.every(campaign => campaign.cta && campaign.vertical),'starter campaigns must define a CTA and inventory vertical');
assert.ok(repositorySeed.filter(campaign => campaign.sections.includes('artisan')).every(artisanEligible),'artisan inventory must be internal or travel');
assert.ok(repositorySeed.filter(campaign => campaign.advertiser === 'Amazon').every(campaign => !campaign.sections.includes('artisan')),'Amazon must never be eligible on artisan profiles');
assert.match(adStyles, /@media\(max-width:620px\)[\s\S]*\.pb-sponsor-link\{grid-template-columns:minmax\(0,1fr\)/, 'mobile ads must use a full-width stacked layout');
assert.match(adStyles, /@media\(max-width:620px\)[\s\S]*\.pb-sponsor-media\{width:100%;aspect-ratio:16\/9\}/, 'mobile ad images must fill the available card width');
assert.match(adStyles, /\.pb-sponsor-card--wide \.pb-sponsor-media\{[^}]*width:100%;aspect-ratio:auto/, 'wide affiliate banners must preserve their complete aspect ratio');
assert.match(adStyles, /\.pb-sponsor-card--wide \.pb-sponsor-media img\{[^}]*height:auto;object-fit:contain/, 'wide affiliate banners must never be cropped');
assert.match(adScript, /naturalWidth \/ image\.naturalHeight >= 3/, 'PB Ads must detect ultra-wide creatives automatically');
assert.doesNotThrow(() => new Function(adScript));

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(),'pb-ads-test-'));
const seedFile = path.join(tempRoot,'seed.json');
const now = '2026-09-22T12:00:00.000Z';
const base = {
  headline:'Campaña de prueba', description:'Descripción breve', image:'/img/og-planetaboricua.jpg',
  cta:'Ver campaña', imageAlt:'Imagen de prueba', destinationUrl:'https://example.com/oferta', status:'active',
  startsAt:'', endsAt:'', sections:['blog'], categories:[], placements:['blog.inline_1'],
  priority:10, vertical:'retail', advertiser:'Prueba', affiliateNetwork:'', excludedArtisanCategories:[],
  createdAt:now, updatedAt:now
};
const campaigns = [
  {...base,id:'pbad-internal',internalName:'Interna',type:'internal',vertical:'internal',destinationUrl:'/agenda-boricua'},
  {...base,id:'pbad-affiliate',internalName:'Afiliada',type:'affiliate',priority:99},
  {...base,id:'pbad-direct',internalName:'Directa',type:'direct',priority:1},
  {...base,id:'pbad-future',internalName:'Directa futura',type:'direct',priority:100,startsAt:'2026-10-01T00:00:00.000Z'},
  {...base,id:'pbad-artisan',internalName:'Viajes para artesanos',type:'affiliate',vertical:'travel',sections:['artisan'],placements:['artisan.after_profile'],excludedArtisanCategories:['joyeria']},
  {...base,id:'pbad-artisan-retail',internalName:'Producto bloqueado',type:'affiliate',vertical:'retail',sections:['artisan'],placements:['artisan.after_profile'],priority:100}
];
fs.writeFileSync(seedFile,JSON.stringify(campaigns));

try {
  const service = createPBAds({liveDir:path.join(tempRoot,'live'),seedFile});
  assert.strictEqual(service.select({section:'blog',placement:'blog.inline_1',now,pageSlug:'uno'}).id,'pbad-direct','direct campaigns must outrank affiliate and internal campaigns');
  assert.strictEqual(service.select({section:'blog',placement:'blog.inline_1',now,pageSlug:'uno',excludeIds:['pbad-direct']}).id,'pbad-affiliate');
  assert.strictEqual(service.select({section:'artisan',placement:'artisan.after_profile',artisanCategory:'joyeria',now,pageSlug:'joya'}),null,'competitor exclusions must be honored');
  assert.strictEqual(service.select({section:'artisan',placement:'artisan.after_profile',artisanCategory:'ceramica',now,pageSlug:'barro'}).id,'pbad-artisan');
  const homeDraft = service.save({...base,internalName:'Portada',type:'internal',vertical:'internal',destinationUrl:'/blog',sections:['home'],placements:['home.after_hero','home.middle','home.before_footer'],status:'draft'});
  assert.deepStrictEqual(homeDraft.placements,['home.after_hero','home.middle','home.before_footer']);
  assert.strictEqual(artisanEligible(campaigns[0]),true);
  assert.strictEqual(artisanEligible(campaigns[4]),true);
  assert.strictEqual(artisanEligible(campaigns[5]),false);

  const saved = service.save({...base,internalName:'Guardada',type:'internal',destinationUrl:'/blog',sections:['latest'],placements:['latest.inline_1'],status:'draft'});
  assert.ok(saved.id.startsWith('pbad-'));
  assert.strictEqual(service.setStatus(saved.id,'active').status,'active');
  assert.strictEqual(service.remove(saved.id),true);
  assert.strictEqual(service.list().find(item => item.id === saved.id).status,'archived');
  assert.throws(() => service.setStatus(saved.id,'active'),/archivada/i);

  assert.throws(() => validateCampaign({...base,internalName:'Mala',type:'direct',destinationUrl:'javascript:alert(1)'}),/enlace de destino/i);
  assert.throws(() => validateCampaign({...base,internalName:'Mala',type:'direct',image:'https://tracker.example/banner.webp'}),/Planeta Boricua/i);
  assert.throws(() => validateCampaign({...base,internalName:'Mala',type:'direct',endsAt:'2026-09-01',startsAt:'2026-09-02'}),/posterior/i);
  assert.throws(() => validateCampaign({...base,internalName:'Amazon en artesanos',type:'affiliate',vertical:'retail',sections:['artisan'],placements:['artisan.after_profile']}),/perfiles de artesanos/i);
  assert.strictEqual(wordCount('<style>ignorar esto</style><p>Uno dos tres</p>'),3);

  service.recordMetric('pbad-direct','impression',{placement:'blog.inline_1'});
  service.recordMetric('pbad-direct','click',{placement:'blog.inline_1'});
  const metrics = service.summary().find(item => item.id === 'pbad-direct');
  assert.deepStrictEqual({impressions:metrics.impressions,clicks:metrics.clicks,ctr:metrics.ctr},{impressions:1,clicks:1,ctr:100});

  const directAd = {...campaigns[2],disclosure:'Publicidad'};
  const affiliateAd = {...campaigns[1],disclosure:'Publicidad · Enlace afiliado'};
  const card = renderPBAd({...directAd,headline:'<script>alert(1)</script>'},{placement:'blog.inline_1',pageSlug:'prueba'});
  assert.ok(card.includes('PB ADS'));
  assert.ok(card.includes('Ver campaña'));
  assert.ok(card.includes('rel="sponsored noopener noreferrer"'));
  assert.ok(!card.includes('<script>alert(1)</script>'));
  assert.ok(insertAfterBlocks('<p>Uno</p><p>Dos</p><p>Tres</p><p>Cuatro</p>','<aside>AD</aside>',3).indexOf('<aside>AD</aside>') > insertAfterBlocks('<p>Uno</p><p>Dos</p><p>Tres</p>','<aside>AD</aside>',3).indexOf('<p>Tres</p>'));
  const distributed = insertAdsAfterBlocks('<p>Uno</p><p>Dos</p><p>Tres</p><p>Cuatro</p><p>Cinco</p>',[{target:2,html:'<aside>A</aside>'},{target:4,html:'<aside>B</aside>'}]);
  assert.ok(distributed.indexOf('<p>Dos</p><aside>A</aside>') > -1);
  assert.ok(distributed.indexOf('<p>Cuatro</p><aside>B</aside>') > -1);
  const twentyBlocks = Array.from({length:20},(_,index) => `<p>Bloque ${index + 1}</p>`).join('');
  const byProgress = insertAdsByProgress(twentyBlocks,[{progress:.4,html:'<aside>A</aside>'},{progress:.75,html:'<aside>B</aside>'}]);
  assert.ok(byProgress.includes('Bloque 8</p><aside>A</aside><p>Bloque 9'));
  assert.ok(byProgress.includes('Bloque 15</p><aside>B</aside><p>Bloque 16'));
  const legacyText = Array.from({length:20},(_,index) => `Esta es la oración número ${index + 1}.`).join(' ');
  const legacyProgress = insertAdsByProgress(legacyText,[{progress:.4,html:'<aside>A</aside>'},{progress:.75,html:'<aside>B</aside>'}]);
  assert.ok(legacyProgress.endsWith('<aside>A</aside><aside>B</aside>'),'plain text without safe block boundaries must remain valid');
  const legacyParagraph = `<p>${Array.from({length:20},(_,index) => `Esta es la oración número ${index + 1}.<br />`).join('')}</p>`;
  const legacyParagraphProgress = insertAdsByProgress(legacyParagraph,[{progress:.4,html:'<aside>A</aside>'},{progress:.75,html:'<aside>B</aside>'}]);
  assert.ok(legacyParagraphProgress.includes('</p><aside>A</aside><p>'));
  assert.ok(legacyParagraphProgress.includes('</p><aside>B</aside><p>'));
  assert.strictEqual((legacyParagraphProgress.match(/<p>/g)||[]).length,(legacyParagraphProgress.match(/<\/p>/g)||[]).length,'legacy paragraph tags must remain balanced');

  const repeated = count => Array.from({length:count},(_,index) => `<p>Palabra ${index} contenido adicional del artículo.</p>`).join('');
  const blogBase = {slug:'articulo',title:'Artículo',excerpt:'Resumen',date:'22 de septiembre de 2026',dateISO:'2026-09-22',content:'',tags:[]};
  const shortBlog = renderBlogPost({...blogBase,content:repeated(20)},[],null,null,[],[],{top:affiliateAd,first:directAd,second:campaigns[0]});
  assert.strictEqual((shortBlog.match(/class="pb-sponsor-card"/g)||[]).length,1,'short blog posts may show one top ad');
  const mediumBlog = renderBlogPost({...blogBase,content:repeated(100)},[],null,null,[],[],{top:affiliateAd,first:directAd,second:campaigns[0]});
  assert.strictEqual((mediumBlog.match(/class="pb-sponsor-card"/g)||[]).length,2,'medium blog posts may show two ads');
  const longBlog = renderBlogPost({...blogBase,content:repeated(200)},[],null,null,[],[],{top:affiliateAd,first:directAd,second:campaigns[0]});
  assert.strictEqual((longBlog.match(/class="pb-sponsor-card"/g)||[]).length,3,'long blog posts may show three ads');
  assert.ok(!longBlog.includes('class="post-affiliate"'));
  assert.ok(!longBlog.includes('class="post-amazon"'));

  const latest = renderLatest({slug:'noticia',title:'Noticia',summary:'Resumen',body:'<p>Contenido corto.</p>',sources:[],publishedAt:now},[],[],{top:affiliateAd,first:directAd,second:campaigns[0]});
  assert.strictEqual((latest.match(/class="pb-sponsor-card"/g)||[]).length,1,'short latest posts may show one ad after the content');
  assert.ok(latest.includes('/css/pb-ads.css?v=3'),'latest posts must bypass stale mobile ad styles');

  const artisan = renderArtisan({name:'Taller Boricua',desc:'Trabajo artesanal puertorriqueño hecho a mano con mucho cuidado y tradición.',photo:'https://example.com/foto.jpg'},
    {categoryLabel:'Artesanía',locationLabel:'Ponce, Puerto Rico',slug:'taller-boricua',events:[],recommendations:[],ad:{...campaigns[0],sections:['artisan'],placements:['artisan.after_profile'],disclosure:'Promoción de Planeta Boricua'}});
  assert.strictEqual((artisan.match(/class="pb-sponsor-card"/g)||[]).length,1);
  assert.ok(artisan.indexOf('Compra directamente al artesano') < artisan.indexOf('class="pb-sponsor-card"'));

  const controlHtml = renderControl({csrf:'csrf-token',campaigns:[{...directAd,startsAt:now}],metrics:[]});
  assert.ok(controlHtml.includes('Nueva campaña'));
  assert.ok(controlHtml.includes('Portada · Debajo del hero'));
  assert.ok(controlHtml.includes('Portada · Zona intermedia'));
  assert.ok(controlHtml.includes('Portada · Antes del footer'));
  assert.ok(controlHtml.includes('hora de Puerto Rico'));
  assert.ok(controlHtml.includes('2026-09-22T08%3A00'),'campaign dates must be edited in Puerto Rico time');
  const inlineScript = (controlHtml.match(/<script>([\s\S]*?)<\/script>/)||[])[1];
  assert.ok(inlineScript);
  assert.doesNotThrow(() => new Function(inlineScript));
} finally {
  fs.rmSync(tempRoot,{recursive:true,force:true});
}

console.log('PB Ads tests passed');
