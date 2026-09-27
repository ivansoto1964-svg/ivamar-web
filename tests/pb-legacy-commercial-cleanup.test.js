const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { cleanLegacyCommercialHtml, cleanBlogDirectory, cleanLatestFile } = require('../src/services/pb-legacy-commercial-cleanup');

const editorial = '<p>Texto editorial que debe permanecer.</p>';
const legacy = '<hr><p><strong>🇵🇷 ¿Vas a viajar a Puerto Rico o el Caribe?</strong></p><p><a href="https://us.trip.com/hotels/">Hoteles</a> | <a href="https://kiwi.tpo.lu/old">Vuelos</a></p><p><strong>🛍️ Tienda Boricua</strong></p><p><a href="https://www.amazon.com/shop/planetaboricua">Ver productos boricuas en Amazon</a></p>';
const related = '<p><strong>Más de Planeta Boricua</strong></p><ul><li><a href="/blog/historia">Otra historia</a></li></ul>';
const cleaned = cleanLegacyCommercialHtml(`${editorial}${legacy}${related}`);
assert.match(cleaned, /Texto editorial que debe permanecer/);
assert.match(cleaned, /Más de Planeta Boricua/);
assert.doesNotMatch(cleaned, /Tienda Boricua|amazon\.com|trip\.com|tpo\.lu/);
assert.equal(cleanLegacyCommercialHtml(cleaned), cleaned, 'cleanup must be idempotent');

const temporary = fs.mkdtempSync(path.join(os.tmpdir(),'pb-commercial-cleanup-'));
const posts = path.join(temporary,'posts');
const backups = path.join(temporary,'backups');
fs.mkdirSync(posts);
fs.writeFileSync(path.join(posts,'story.json'),JSON.stringify({slug:'story',content:`${editorial}${legacy}${related}`}));
assert.equal(cleanBlogDirectory(posts,backups),1);
assert.equal(cleanBlogDirectory(posts,backups),0);
assert(fs.existsSync(path.join(backups,'story.json')));

const latest = path.join(temporary,'approved.json');
fs.writeFileSync(latest,JSON.stringify([{slug:'latest',body:`${editorial}${legacy}`}]))
assert.equal(cleanLatestFile(latest,path.join(temporary,'latest-backup')),1);
assert.equal(cleanLatestFile(latest,path.join(temporary,'latest-backup')),0);
assert.doesNotMatch(fs.readFileSync(latest,'utf8'),/Tienda Boricua|amazon\.com|trip\.com|tpo\.lu/);

fs.rmSync(temporary,{recursive:true,force:true});
console.log('PB legacy commercial cleanup tests passed');
