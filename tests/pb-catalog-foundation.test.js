'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {configuration,effectivePlan,createStore} = require('../src/services/pb-catalog-foundation');
const directory = fs.mkdtempSync(path.join(os.tmpdir(),'pb-catalog-'));
const now = () => new Date('2026-10-19T15:00:00Z');
const a = {role:'artisan',artisanId:'a'};
const b = {role:'artisan',artisanId:'b'};
const member = {artisanId:'a',plan:'catalog',status:'active',validUntil:'2026-12-01T00:00:00Z'};
const product = {title:'Pieza',description:'Hecha a mano',priceCents:1999,
  images:['https://res.cloudinary.com/demo/image/upload/example.jpg'],
  availability:'available',published:true,paymentUrl:'https://example.com/pay'};
try {
  assert.deepEqual(configuration({}),{catalog:false,memberships:false,assistant:false});
  assert.equal(configuration({PB_CATALOG_ENABLED:'1'}).catalog,false);
  const disabled = createStore({directory,env:{},now});
  assert.throws(() => disabled.upsert(a,member,product),/desactivado/);
  assert.equal(fs.readdirSync(directory).length,0);
  const store = createStore({directory,env:{PB_CATALOG_ENABLED:'true'},now});
  assert.throws(() => store.upsert(b,member,product),/ajena/);
  assert.throws(() => store.list({role:'artisan',artisanId:'../a'}),/autorizado/);
  assert.throws(() => store.list({role:'visitor',artisanId:'a'}),/autorizado/);
  for (const paymentUrl of ['javascript:alert(1)','http://example.com','https://u:p@example.com']) {
    assert.throws(() => store.upsert(a,member,{...product,paymentUrl}));
  }
  assert.throws(() => store.upsert(a,member,{...product,priceCents:19.99}),/Precio/);
  assert.throws(() => store.upsert(a,member,{...product,images:['https://evil.test/image.jpg']}),/Foto/);
  assert.throws(() => store.upsert(a,member,{...product,category:'Tejidos'}),/Plus/);
  assert.throws(() => store.upsert(a,{...member,status:'past_due'},product),/plan/);
  assert.equal(effectivePlan({...member,validUntil:now().toISOString()},now()),'free');
  assert.equal(effectivePlan({...member,validUntil:'invalid'},now()),'free');
  const first = store.upsert(a,member,product);
  assert.equal(store.list(b).length,0);
  assert.throws(() => store.upsert(b,{...member,artisanId:'b'},{...product,id:first.id}),/encontrado/);
  for (let i=1;i<15;i++) store.upsert(a,member,product);
  assert.throws(() => store.upsert(a,member,product),/límite/);
  const plus = {...member,plan:'plus'};
  for (let i=15;i<50;i++) store.upsert(a,plus,{...product,category:'Tejidos',images:[...product.images,'https://res.cloudinary.com/demo/image/upload/second.jpg']});
  assert.throws(() => store.upsert(a,plus,product),/límite/);
  assert.equal(store.publicProducts('a',plus).length,50);
  const basic = store.publicProducts('a',member);
  assert.equal(basic.length,15);
  assert.ok(basic.every(item => item.images.length <= 1 && item.category === ''));
  assert.equal(store.publicProducts('a',{...member,status:'canceled'}).length,0);
  assert.equal(store.list(a).length,50); // Downgrade/cancel never deletes data.
  assert.deepEqual(store.publicProducts('b',member),[]);
  store.remove(a,first.id);
  assert.equal(store.list(a).length,49);
  fs.writeFileSync(path.join(directory,'a.json'),'broken');
  assert.throws(() => store.upsert(a,plus,product));
  assert.equal(fs.readFileSync(path.join(directory,'a.json'),'utf8'),'broken');
  console.log('PASS: disabled defaults, isolation, limits, validation, downgrade preservation, corruption handling.');
} finally { fs.rmSync(directory,{recursive:true,force:true}); }
