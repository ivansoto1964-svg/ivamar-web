const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const { isAffiliateUrl, isIndexablePBArtisan, qualifyAffiliateLinks } = require('../src/utils/pb-seo');
const artisanProfile = require('../src/views/planetaboricua/artesano-perfil');

assert.equal(isAffiliateUrl('https://amzn.to/example'), true);
assert.equal(isAffiliateUrl('https://us.trip.com/hotels/list?id=1'), true);
assert.equal(isAffiliateUrl('/go/amazon-store'), true);
assert.equal(isAffiliateUrl('/blog/historia-boricua'), false);

const qualified = qualifyAffiliateLinks('<p><a href="https://amazon.com/example" rel="noopener">Producto</a> <a href="/blog/otro">Otro</a></p>');
assert.match(qualified, /href="https:\/\/amazon\.com\/example"[^>]*rel="[^"]*sponsored[^"]*"/);
assert.match(qualified, /href="https:\/\/amazon\.com\/example"[^>]*target="_blank"/);
assert.match(qualified, /<a href="\/blog\/otro">Otro<\/a>/);

assert.equal(isIndexablePBArtisan({ desc:'Creo joyería.' }), false);
assert.equal(isIndexablePBArtisan({ desc:'Creo joyería artesanal en plata y piedras, inspirada en nuestra cultura puertorriqueña.' }), true);

const helpers = { categoryLabel:'Joyería', locationLabel:'Caguas, Puerto Rico', slug:'perfil-prueba', events:[], recommendations:[] };
const thinHtml = artisanProfile({ name:'Perfil breve', desc:'Creo joyería.', whatsapp:'7875551212', website:'ejemplo.com' }, helpers);
assert.match(thinHtml, /<meta name="robots" content="noindex,follow">/);
assert.match(thinHtml, /rel="ugc nofollow noopener noreferrer"/);

const completeHtml = artisanProfile({ name:'Perfil completo', desc:'Creo joyería artesanal en plata y piedras, inspirada en nuestra cultura puertorriqueña.' }, helpers);
assert.doesNotMatch(completeHtml, /<meta name="robots" content="noindex,follow">/);

const server = fs.readFileSync(path.join(root, 'src/server.js'), 'utf8');
assert.match(server, /loadApprovedPBListings\(\)\.filter\(isIndexablePBArtisan\)/);
assert.match(server, /\/mudarse-de-pr<\/loc>/);
assert.match(server, /\/regresar-a-pr<\/loc>/);
assert.match(server, /\/afiliados-boricua<\/loc>/);
assert.match(server, /google\.com, pub-4181903530685744, DIRECT, f08c47fec0942fa0/);
assert.doesNotMatch(server, /google\.com, pub-8301223085122981, DIRECT/);

const activePBViews = [
  'src/views/planetaboricua.js',
  'src/views/recursos-boricua.js',
  'src/views/quienes-somos.js',
  'src/views/mudarse-de-pr.js',
  'src/views/regresar-a-pr.js',
  'src/views/pb-blog/index.js',
  'src/views/pb-blog/post.js',
  'src/views/planetaboricua/noticias.js',
  'src/views/planetaboricua/estado-template.js',
  'src/views/planetaboricua/lo-mas-reciente-index.js'
];
for (const filename of activePBViews) {
  const view = fs.readFileSync(path.join(root, filename), 'utf8');
  assert.match(view, /ca-pub-4181903530685744/, `${filename} must use the active PB publisher ID`);
  assert.doesNotMatch(view, /ca-pub-8301223085122981/, `${filename} still uses the cancelled publisher ID`);
}

const legal = fs.readFileSync(path.join(root, 'src/views/legal-boricua.js'), 'utf8');
assert.match(legal, /Programa de Asociados de Amazon/);
assert.match(legal, /Google AdSense/);

const postsDir = path.join(root, 'data/pb-blog/posts');
for (const filename of fs.readdirSync(postsDir).filter(name => name.endsWith('.json'))) {
  const post = JSON.parse(fs.readFileSync(path.join(postsDir, filename), 'utf8'));
  const renderedContent = qualifyAffiliateLinks(post.content || '');
  const anchors = renderedContent.match(/<a\b[^>]*>/gi) || [];
  for (const anchor of anchors) {
    const href = (anchor.match(/\bhref\s*=\s*(["'])(.*?)\1/i) || [])[2];
    if (isAffiliateUrl(href)) {
      assert.match(anchor, /\brel="[^"]*\bsponsored\b[^"]*"/i, `${filename} has an unqualified affiliate link`);
    }
  }
}

console.log('PB AdSense readiness tests passed');
