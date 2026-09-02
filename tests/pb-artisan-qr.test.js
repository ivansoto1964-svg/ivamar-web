const assert = require('assert');
const fs = require('fs');
const qr = require('../src/services/pb-artisan-qr');

(async () => {
  const slug = 'crochet-by-sany-664508';
  assert.equal(qr.artisanShortUrl(slug),'https://www.masboricuaqueunmofongo.com/a/crochet-by-sany-664508');
  assert.throws(() => qr.artisanShortUrl('../bad'),/Invalid artisan slug/);
  const png = await qr.artisanQrPng(slug);
  assert.ok(Buffer.isBuffer(png));
  assert.ok(png.length > 1000);
  assert.deepEqual([...png.subarray(0,8)],[137,80,78,71,13,10,26,10]);

  const view = fs.readFileSync(require.resolve('../src/views/planetaboricua/artesano-perfil'),'utf8');
  const qrPreviewView = require('../src/views/planetaboricua/artesano-qr');
  const server = fs.readFileSync(require.resolve('../src/server'),'utf8');
  assert.match(view,/Ver y descargar mi QR/);
  assert.match(view,/\/artesanos\/\$\{encodeURIComponent\(slug\)\}\/qr/);
  assert.match(view,/compartir-evento/);
  assert.match(view,/manifest-pb\.json/);
  assert.match(view,/Ten Planeta Boricua a un toque/);
  assert.match(view,/beforeinstallprompt/);
  assert.match(view,/Añadir a pantalla de inicio/);
  assert.match(server,/\/artesanos\/:slug\/qr['"]/);
  assert.match(server,/\/artesanos\/:slug\/qr\.png/);
  assert.match(server,/Ver y descargar mi QR/);
  assert.match(server,/Content-Disposition/);
  assert.match(server,/PB_ARTISAN_METRIC_EVENTS[^\n]+['"]qr['"]/);
  const preview = qrPreviewView({name:'Crochet by Sany',slug,qrDataUri:`data:image/png;base64,${png.toString('base64')}`});
  assert.match(preview,/Este es tu código QR permanente/);
  assert.match(preview,/Crochet by Sany/);
  assert.match(preview,/qr-crochet-by-sany-664508\.png/);
  assert.match(preview,/Aunque luego actualices/);
  const manifest = JSON.parse(fs.readFileSync(require.resolve('../public/manifest-pb.json'),'utf8'));
  assert.ok(manifest.shortcuts.some(item => item.url === '/artesanos/mi-perfil'));
  console.log('PB artisan QR tests passed');
})().catch(error => {
  console.error(error);
  process.exit(1);
});
