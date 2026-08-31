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

console.log('PB artisan quality improvements tests passed');
