const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const home = require('../src/views/planetaboricua');
const fair = require('../src/views/planetaboricua/feriaartesanos');
const { renderSiteHeader } = require('../src/views/planetaboricua/site-shell');

const retiredSection = /artesano-de-la-semana|Artesano de la Semana/i;
const server = fs.readFileSync(path.join(__dirname, '../src/server.js'), 'utf8');

test('the former weekly artisan section redirects permanently to the fair', () => {
  assert.match(server, /app\.get\('\/artesano-de-la-semana', \(_req, res\) => \{\s*res\.redirect\(301, '\/feria-artesanos'\);\s*\}/);
  assert.doesNotMatch(server, /<loc>[^<]+\/artesano-de-la-semana<\/loc>/);
});

test('homepage, navigation and fair no longer promote the retired section', () => {
  for (const html of [home, renderSiteHeader('/'), fair]) {
    assert.doesNotMatch(html, retiredSection);
  }
});
