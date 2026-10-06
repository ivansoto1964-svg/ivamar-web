const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const metrics = require('../src/services/pb-artisan-metrics');

const directory=fs.mkdtempSync(path.join(os.tmpdir(),'pb-artisan-metrics-'));
const file=path.join(directory,'metrics.json');
const now=new Date('2026-10-06T16:00:00.000Z');

assert.equal(metrics.record('taller-prueba','view',{file,date:now}),true);
assert.equal(metrics.record('taller-prueba','whatsapp',{file,date:now}),true);
assert.equal(metrics.record('taller-prueba','invalid',{file,date:now}),false);
const item=metrics.summary([{name:'Taller Prueba',slug:'taller-prueba'}],entry=>entry.slug,{file,date:now})[0];
assert.equal(item.views,1);
assert.equal(item.clickTotal,1);
assert.equal(item.last7.views,1);
assert.equal(item.last30.clicks.whatsapp,1);
assert.equal(item.last90.clickTotal,1);

console.log('PB artisan daily metrics: OK');
