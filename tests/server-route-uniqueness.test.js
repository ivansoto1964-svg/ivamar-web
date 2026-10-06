const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'src/server.js'), 'utf8');
const routes = [];
for (const match of source.matchAll(/app\.(get|post|put|patch|delete)\(\s*(["'`])([^"'`]+)\2/g)) {
  routes.push(`${match[1].toUpperCase()} ${match[3]}`);
}
const duplicates = [...new Set(routes.filter((route, index) => routes.indexOf(route) !== index))];

assert.deepStrictEqual(duplicates, [], `Every HTTP method/path pair must have one reachable handler. Duplicates: ${duplicates.join(', ')}`);
console.log('Server route uniqueness contract: OK');
