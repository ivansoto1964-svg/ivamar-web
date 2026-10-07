const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {createExternalMetrics,validate} = require('../src/services/pb-external-metrics');

const directory = fs.mkdtempSync(path.join(os.tmpdir(),'pb-external-metrics-'));
try {
  const service = createExternalMetrics({file:path.join(directory,'metrics.json')});
  const row = service.save({month:'2026-09',ga4Users:'100',ga4Sessions:'140',ga4Views:'200',searchClicks:'30',searchImpressions:'900',affiliateRevenue:'12.34',affiliateNotes:'Amazon confirmado',sourceNotes:'Panel oficial'});
  assert.equal(row.affiliateRevenue,12.34);
  assert.equal(service.list()[0].searchImpressions,900);
  service.save({month:'2026-09',ga4Users:'110',affiliateRevenue:'15'});
  assert.equal(service.list().length,1,'saving the same month must update instead of duplicate');
  assert.deepEqual(service.summary(),{months:1,affiliateRevenue:15});
  assert.match(service.csv(),/ingreso_afiliado_confirmado_usd/);
  assert.match(service.csv(),/2026-09/);
  assert.throws(()=>validate({month:'septiembre'}),/mes válido/i);
  assert.throws(()=>validate({month:'2026-09',affiliateRevenue:'-1'}),/ingreso afiliado/i);

  const view = fs.readFileSync(path.join(__dirname,'../src/views/pb-control.js'),'utf8');
  const server = fs.readFileSync(path.join(__dirname,'../src/server.js'),'utf8');
  assert.match(view,/Fuentes externas · cierre mensual/);
  assert.match(view,/medición propia de PB para evitar mezclar definiciones/);
  assert.match(view,/method="post" action="\/pb-control\/metricas-externas"/);
  assert.match(server,/pbExternalMetrics\.save\(req\.body\)/);
  assert.match(server,/pb-metricas-externas-mensuales\.csv/);
} finally {
  fs.rmSync(directory,{recursive:true,force:true});
}

console.log('PB external monthly metrics tests passed');
