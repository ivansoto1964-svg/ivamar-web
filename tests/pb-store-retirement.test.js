const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname,'..');
const server = fs.readFileSync(path.join(root,'src/server.js'),'utf8');
const packageJson = JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
const home = fs.readFileSync(path.join(root,'src/views/planetaboricua.js'),'utf8');
const statePage = fs.readFileSync(path.join(root,'src/views/planetaboricua/estado-template.js'),'utf8');

const retiredGateIndex = server.indexOf("const RETIRED_PATHS = [");
assert(retiredGateIndex >= 0, 'The retired-route gate must exist.');
assert.match(server.slice(retiredGateIndex,server.indexOf('const RETIRED_EXACT_PATHS')), /['"]\/api\/aec-chat['"]/, 'The legacy AEC chat path must remain behind the HTTP 410 retirement gate.');
assert.doesNotMatch(server, /app\.post\(['"]\/api\/aec-chat['"]/, 'The legacy AEC Claude handler must not be registered.');
assert.doesNotMatch(server, /Anthropic|api\.anthropic\.com|ANTHROPIC_API_KEY|claude-/i, 'The server must not contain executable Anthropic integration code.');
assert.equal(packageJson.dependencies?.['@anthropic-ai/sdk'], undefined, 'The Anthropic SDK must not be a production dependency.');

assert.match(server, /app\.get\("\/tienda-boricua", \(_req, res\) => res\.redirect\(301, "\/recursos"\)\)/);
assert.doesNotMatch(server, /require\("\.\/views\/tienda-boricua"\)/);
assert.doesNotMatch(server, /masboricuaqueunmofongo\.com\/tienda-boricua<\/loc>/);
assert.doesNotMatch(home, /href="\/tienda-boricua"|Tienda Boricua|Explorar la Tienda/);
assert.doesNotMatch(statePage, /Tienda Boricua|Ver Tienda en Amazon/);
assert.equal(fs.existsSync(path.join(root,'src/views/tienda-boricua.js')),false);

const blogPostsDir = path.join(root,'data/pb-blog/posts');
const retiredCommercialPattern = /Tienda Boricua|Tienda PB|amazon\.com\/shop\/planetaboricua|amzn\.to|booking\.tpo\.lu|trip\.tpo\.lu|kiwi\.tpo\.lu|us\.trip\.com/i;
for (const filename of fs.readdirSync(blogPostsDir).filter(name => name.endsWith('.json'))) {
  const post = fs.readFileSync(path.join(blogPostsDir,filename),'utf8');
  assert.doesNotMatch(post,retiredCommercialPattern,`${filename} must not contain retired store or travel promotion blocks`);
}

console.log('PB store retirement and redirect tests passed');
require('./pb-legacy-commercial-cleanup.test');
