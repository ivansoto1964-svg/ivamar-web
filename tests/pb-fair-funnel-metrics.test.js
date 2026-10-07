const assert=require('assert');
const fs=require('fs');
const os=require('os');
const path=require('path');
const metrics=require('../src/services/pb-fair-funnel-metrics');

const directory=fs.mkdtempSync(path.join(os.tmpdir(),'pb-fair-funnel-'));
const file=path.join(directory,'metrics.json');
const now=new Date('2026-10-07T16:00:00.000Z');

assert.equal(metrics.record('view',{file,date:now}),true);
assert.equal(metrics.record('search',{file,date:now,resultCount:1}),true);
assert.equal(metrics.record('search',{file,date:now,resultCount:0}),true);
assert.equal(metrics.record('profile',{file,date:now}),true);
assert.equal(metrics.record('contact',{file,date:now}),true);
assert.equal(metrics.record('invalid',{file,date:now}),false);

const summary=metrics.summary({file,date:now});
assert.equal(summary.total.views,1);
assert.equal(summary.total.searches,2);
assert.equal(summary.total.searchesWithResults,1);
assert.equal(summary.total.zeroResultSearches,1);
assert.equal(summary.total.profiles,1);
assert.equal(summary.total.contacts,1);
assert.equal(summary.total.searchSuccessRate,50);
assert.equal(summary.last30.contacts,1);
assert.doesNotMatch(JSON.stringify(metrics.read(file)),/Stitches|consulta|query|email|ip/i);
console.log('PB fair funnel metrics: OK');
