const assert = require('assert');
const register = require('../src/routes/pb-town-admin');

const routes = {};
const app = {
  get(path, handler) { routes[`GET ${path}`] = handler; },
  post(path, ...handlers) { routes[`POST ${path}`] = handlers.at(-1); }
};
register(app);

let html = '';
routes['GET /administra-tu-pueblo']({query:{pueblo:'arecibo'}},{send(value){html=value;}});
assert.match(html, /Administra la página de tu pueblo/);
assert.match(html, /option value="arecibo" selected/);
assert.match(html, /hasta 40% en su página y 20% al vender otras páginas/);
assert.match(html, /Vives actualmente en ese pueblo/);
assert.match(html, /fetch\('\/api\/pb-town-admin-applications'/);
assert.ok(routes['POST /api/pb-town-admin-applications']);

console.log('PB town administrator application tests passed');
