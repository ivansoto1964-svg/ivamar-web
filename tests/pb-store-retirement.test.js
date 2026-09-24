const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname,'..');
const server = fs.readFileSync(path.join(root,'src/server.js'),'utf8');
const home = fs.readFileSync(path.join(root,'src/views/planetaboricua.js'),'utf8');
const statePage = fs.readFileSync(path.join(root,'src/views/planetaboricua/estado-template.js'),'utf8');

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
