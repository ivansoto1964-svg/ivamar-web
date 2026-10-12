const assert = require('assert');
const fs = require('fs');
const path = require('path');
const render = require('../src/views/pb-nayeli-preview');

const root = path.join(__dirname,'..');
const server = fs.readFileSync(path.join(root,'src/server.js'),'utf8');
const home = fs.readFileSync(path.join(root,'src/views/planetaboricua.js'),'utf8');

assert.match(server,/app\.get\(['"]\/pb-control\/nayeli['"], requirePBAdmin/,'The preview page must require PB admin authentication.');
assert.match(server,/app\.post\(['"]\/pb-control\/nayeli\/preview['"], requirePBAdmin, aiLimiter/,'The preview request must remain authenticated and rate limited.');
assert.match(server,/express\.json\(\{limit:'12kb'\}\), requirePBCsrf/,'The private request must retain CSRF validation.');
assert.match(server,/['"]\/api\/nayeli['"]/,'The public Nayeli route must remain retired.');
assert.doesNotMatch(home,/pb-control\/nayeli|img\/nayeli\.jpg/,'Nayeli must not be introduced into the public homepage.');

const disabled = render({csrf:'private-csrf',enabled:false,hasApiKey:false,model:'gpt-6-luna'});
assert.match(disabled,/Vista previa apagada/);
assert.match(disabled,/No genera llamadas a OpenAI ni costos/);
assert.match(disabled,/<textarea[^>]+disabled/);
assert.match(disabled,/<button type="submit" disabled>/);
assert.match(disabled,/X-CSRF-Token/);
assert.doesNotMatch(disabled,/OPENAI_API_KEY|sk-[A-Za-z0-9]/);

const enabled = render({csrf:'private-csrf',enabled:true,hasApiKey:true,model:'gpt-6-luna'});
assert.match(enabled,/Lista para una prueba privada/);
assert.match(enabled,/fetch\('\/pb-control\/nayeli\/preview'/);
assert.match(enabled,/data-mode="profile"/);
assert.match(enabled,/data-mode="product"/);
assert.match(enabled,/data-mode="promotion"/);
assert.match(enabled,/JSON\.stringify\(\{message,mode,history:/);
assert.match(enabled,/pruebas hoy/);
assert.match(enabled,/tokens medidos/);
assert.doesNotMatch(enabled,/<textarea[^>]+disabled/);
assert.doesNotMatch(enabled,/<button type="submit" disabled>/);

console.log('PB Nayeli private preview tests passed');
