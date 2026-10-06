const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const asset = fs.readFileSync(path.join(__dirname, '..', 'public/sw-pb.js'), 'utf8');

assert.match(asset, /const PB_CACHE = 'planeta-boricua-v3'/, 'A deployment must replace the previous PB cache.');
assert.match(asset, /fetch\(event\.request\)[\s\S]*\.catch\(\(\) => caches\.match\(event\.request\)\)/, 'Static files must be network-first so deployments are visible immediately.');
assert.doesNotMatch(asset, /caches\.match\(event\.request\)\.then\(cached => cached \|\| fetch/, 'Static files must not remain cache-first indefinitely.');

new vm.Script(asset, { filename:'sw-pb.js' });
console.log('PB service worker freshness contract: OK');
