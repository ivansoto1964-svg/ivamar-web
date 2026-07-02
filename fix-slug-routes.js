const fs = require('fs');
let code = fs.readFileSync('src/server.js', 'utf8');

const oldCheck = `  // Ignore static file requests (let express.static handle them)
  if (/\\.(png|jpg|jpeg|gif|svg|ico|js|css|webp|mp4|pdf|txt|xml|json)$/i.test(slug)) {
    return res.status(404).send('Not found');
  }`;

const newCheck = `  // Ignore static file requests (let express.static handle them)
  if (/\\.(png|jpg|jpeg|gif|svg|ico|js|css|webp|mp4|pdf|txt|xml|json)$/i.test(slug)) {
    return res.status(404).send('Not found');
  }

  // Ignore known demo and app routes
  const knownRoutes = ['autoridad-energia-criolla', 'pb', 'caribex', 'admin', 'api', 'start', 'demo', 'dyerkia', 'adis'];
  if (knownRoutes.includes(slug)) {
    return res.status(404).send('Not found');
  }`;

if (code.includes(oldCheck)) {
  code = code.replace(oldCheck, newCheck);
  fs.writeFileSync('src/server.js', code);
  console.log('✅ Exclusiones de rutas conocidas agregadas al /:slug handler');
} else {
  console.log('❌ No encontré el bloque exacto');
}
