const assert=require('node:assert/strict');
const fs=require('node:fs');
const os=require('node:os');
const path=require('node:path');
const vm=require('node:vm');
const {createWebVitals}=require('../src/services/pb-web-vitals');

const directory=fs.mkdtempSync(path.join(os.tmpdir(),'pb-web-vitals-'));
try{
  const service=createWebVitals({file:path.join(directory,'vitals.json')});
  assert.equal(service.record({path:'/blog/prueba',lcp:1800,inp:120,cls:0.04},new Date('2026-10-07T12:00:00Z')),true);
  assert.equal(service.record({path:'/blog/prueba',lcp:3200,inp:240,cls:0.12},new Date('2026-10-07T12:01:00Z')),true);
  assert.equal(service.record({path:'/otra',lcp:4700,inp:700,cls:0.4},new Date('2026-10-07T12:02:00Z')),true);
  assert.equal(service.record({path:'/bad',lcp:-1,inp:'x',cls:99},new Date('2026-10-07T12:03:00Z')),false);
  const summary=service.summary(30,new Date('2026-10-07T18:00:00Z'));
  assert.equal(summary.lcp.count,3);
  assert.equal(summary.lcp.p75,5000);
  assert.equal(summary.lcp.rating,'poor');
  assert.equal(summary.cls.goodPercent,33);

  const browser=fs.readFileSync(path.join(__dirname,'../public/js/pb-web-vitals.js'),'utf8');
  new vm.Script(browser,{filename:'pb-web-vitals.js'});
  assert.match(browser,/largest-contentful-paint/);
  assert.match(browser,/layout-shift/);
  assert.match(browser,/durationThreshold:40/);
  assert.match(browser,/sendBeacon\('\/api\/pb-web-vitals'/);
  const server=fs.readFileSync(path.join(__dirname,'../src/server.js'),'utf8');
  assert.match(server,/app\.post\('\/api\/pb-web-vitals'/);
}finally{fs.rmSync(directory,{recursive:true,force:true})}
console.log('PB Core Web Vitals tests passed');
