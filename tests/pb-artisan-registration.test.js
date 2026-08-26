const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const form = fs.readFileSync(path.join(root, 'src/views/planetaboricua/add-negocio.js'), 'utf8');
const server = fs.readFileSync(path.join(root, 'src/server.js'), 'utf8');

assert.match(
  form,
  /id="biz-owner-name"[^>]*required/,
  'The artisan name input must remain required.'
);
assert.match(
  form,
  /ownerName:document\.getElementById\('biz-owner-name'\)\.value\.trim\(\)/,
  'The browser must send ownerName to the registration endpoint.'
);

const routeStart = server.indexOf('app.post("/api/pb-negocio-submit"');
const routeEnd = server.indexOf('// Aprobar negocio via token', routeStart);
assert.ok(routeStart >= 0 && routeEnd > routeStart, 'The artisan registration route must exist.');
const route = server.slice(routeStart, routeEnd);

assert.match(
  route,
  /const ownerName = sanitize\(req\.body\.ownerName\);/,
  'The server must read ownerName before validating it.'
);
assert.match(route, /!name \|\| !ownerName \|\| !category/, 'ownerName must remain a required server field.');
assert.match(route, /name, ownerName, category/, 'ownerName must be saved in the pending registration.');

console.log('PB artisan registration contract: OK');
