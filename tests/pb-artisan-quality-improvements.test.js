const assert = require('assert');
const fs = require('fs');
const path = require('path');
const repairs = require('../src/data/pb-artisan-description-repairs');
const { isIndexablePBArtisan, wordCount } = require('../src/utils/pb-seo');
const artisanAdmin = require('../src/views/planetaboricua/artesano-admin');

assert.equal(Object.keys(repairs).length,16);
for (const [slug,repair] of Object.entries(repairs)) {
  assert.ok(wordCount(repair.fullDesc)>=20, `${slug} needs a substantive description`);
  assert.ok(isIndexablePBArtisan(repair), `${slug} must become indexable`);
}
assert.equal(repairs['irma-lopez-886057'],undefined);
assert.equal(repairs['katherine-ramos-967450'],undefined);

const listHtml = artisanAdmin.list([{id:'1',name:'Perfil breve',city:'Camuy',email:'x@example.com',desc:'Talla de Reyes',fullDesc:'Talla de Reyes'}],'',{needsImprovement:true,total:217,needsCount:2,wordCount});
assert.match(listHtml,/Descripción muy corta/);
assert.match(listHtml,/3 palabras/);
assert.match(listHtml,/Ver todos/);

const server = fs.readFileSync(path.join(__dirname,'..','src/server.js'),'utf8');
assert.match(server,/runPBArtisanDescriptionMigration\(\)/);
assert.match(server,/before-\$\{PB_ARTISAN_DESCRIPTION_MIGRATION\}/);
assert.match(server,/req\.query\?\.needs === '1'/);
assert.match(server,/loadApprovedPBListings\(\{strict:true\}\)/);
assert.match(server,/res\.status\(500\)\.json\(\{ ok:false, error:'No se pudo cargar el directorio\.'/);
assert.match(server,/public, max-age=60, stale-while-revalidate=300/);
assert.match(server,/\['tejidos-a-crochet-974074','griselle-abraham-cancel-717023'\]/, 'The retired Tejidos a Crochet URL must redirect to the canonical profile.');
assert.match(server,/\{keepId:'1787351717023',removeId:'1785541974074',keepSlug:'griselle-abraham-cancel-717023'\}/, 'The confirmed duplicate must be retired through the backed-up migration.');
assert.match(server,/2026-10-06-artisan-duplicate-cleanup-v2/, 'The new cleanup must run independently from the completed v1 migration.');

console.log('PB artisan quality improvements tests passed');
