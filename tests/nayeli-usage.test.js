const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const usage = require('../src/services/nayeli-usage');

const directory = fs.mkdtempSync(path.join(os.tmpdir(),'pb-nayeli-'));
const file = path.join(directory,'usage.json');
const date = new Date('2026-10-12T16:00:00Z');
const env = {NAYELI_DAILY_LIMIT:'2'};

assert.equal(usage.dailyLimit({}),25);
assert.equal(usage.dailyLimit({NAYELI_DAILY_LIMIT:'999'}),200);
assert.equal(usage.summary({file,date,env}).remaining,2);

let current = usage.record({ok:true,mode:'profile',usage:{input_tokens:100,output_tokens:40,total_tokens:140},file,date,env});
assert.equal(current.requests,1);
assert.equal(current.totalTokens,140);
assert.equal(current.allowed,true);

current = usage.record({ok:false,mode:'product',file,date,env});
assert.equal(current.requests,2);
assert.equal(current.errors,1);
assert.equal(current.remaining,0);
assert.equal(current.allowed,false);

const stored = JSON.parse(fs.readFileSync(file,'utf8'));
assert.deepEqual(stored.days[usage.dayKey(date)].modes,{profile:1,product:1});
assert.equal(JSON.stringify(stored).includes('pregunta privada'),false);

fs.rmSync(directory,{recursive:true,force:true});
console.log('Nayeli private usage controls passed');
