const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {importEditorialInbox} = require('../src/services/pb-editorial-inbox');
function fixture(t) {
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'pb-inbox-')); t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
 const opts={inboxDir:path.join(root,'inbox'),publicDir:path.join(root,'public'),dataDir:path.join(root,'data')};
 fs.mkdirSync(opts.inboxDir); fs.mkdirSync(path.join(opts.publicDir,'images/editorial'),{recursive:true}); fs.writeFileSync(path.join(opts.publicDir,'images/editorial/cover.webp'),'cover');
 const item={editorialId:'pb-example-2026',id:12345,slug:'example-2026',title:'Una noticia útil para nuestra gente',summary:'Un resumen con información verificada.',body:'Contenido útil. '.repeat(30),image:'/images/editorial/cover.webp',publishedAt:'2026-01-01T12:00:00Z',sources:[{label:'Fuente oficial',url:'https://example.org/info'}]};
 const file=path.join(opts.inboxDir,'article.json'); const write=()=>fs.writeFileSync(file,JSON.stringify(item)); write();
 return {opts,item,write,target:path.join(opts.dataDir,'approved.json')};
}
test('imports once, preserves edits and respects deletion',t=>{
 const f=fixture(t); assert.equal(importEditorialInbox(f.opts).imported,1);
 const posts=JSON.parse(fs.readFileSync(f.target)); posts[0].title='Edited in panel'; fs.writeFileSync(f.target,JSON.stringify(posts));
 assert.equal(importEditorialInbox(f.opts).imported,0); assert.equal(JSON.parse(fs.readFileSync(f.target))[0].title,'Edited in panel');
 fs.writeFileSync(f.target,'[]'); assert.equal(importEditorialInbox(f.opts).imported,0); assert.deepEqual(JSON.parse(fs.readFileSync(f.target)),[]);
});
test('rejects unsafe cover and malformed storage without touching content',t=>{
 const f=fixture(t); f.item.image='/../../secret.png'; f.write(); assert.throws(()=>importEditorialInbox(f.opts)); assert.equal(fs.existsSync(f.target),false);
 f.item.image='/images/editorial/cover.webp';f.write();fs.mkdirSync(f.opts.dataDir);fs.writeFileSync(f.target,'broken');assert.throws(()=>importEditorialInbox(f.opts)); assert.equal(fs.readFileSync(f.target,'utf8'),'broken');
});
test('recovers after content write without journal and deduplicates prior panel publication',t=>{
 const f=fixture(t);fs.mkdirSync(f.opts.dataDir); fs.writeFileSync(f.target,JSON.stringify([f.item])); assert.equal(importEditorialInbox(f.opts).imported,0); assert.equal(JSON.parse(fs.readFileSync(f.target)).length,1);
});
test('validates entire batch before import and backs up prior published content',t=>{
 const f=fixture(t);const bad={...f.item,editorialId:'pb-second-2026',id:12346,slug:'second-2026',image:'/images/editorial/missing.webp'};
 const badFile=path.join(f.opts.inboxDir,'second.json');fs.writeFileSync(badFile,JSON.stringify(bad));assert.throws(()=>importEditorialInbox(f.opts));assert.equal(fs.existsSync(f.target),false);
 fs.unlinkSync(badFile);fs.mkdirSync(f.opts.dataDir);const previous=[{...f.item,id:987,slug:'older-story',editorialId:'pb-older-2026',title:'Una historia anterior'}];fs.writeFileSync(f.target,JSON.stringify(previous));assert.equal(importEditorialInbox(f.opts).imported,1);
 const backupDir=path.join(f.opts.dataDir,'editorial-backups');assert.deepEqual(JSON.parse(fs.readFileSync(path.join(backupDir,fs.readdirSync(backupDir)[0]))),previous);
});
