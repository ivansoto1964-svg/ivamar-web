const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const municipalities = require('../src/data/pb-municipalities');
const guides = require('../src/data/pb-town-guides.json');
const towns = require('../src/data/pb-towns');
const routes = require('../src/data/pb-town-routes.json');
const renderTownPage = require('../src/views/planetaboricua/town-page');

const arecibo = renderTownPage(towns.arecibo, 'arecibo');
const adjuntas = renderTownPage(towns.adjuntas, 'adjuntas');

assert.match(arecibo, /<meta name="robots" content="index,follow">/);
assert.match(adjuntas, /<meta name="robots" content="noindex,follow">/);
assert.match(arecibo, /Arecibo C3/);
assert.match(arecibo, /Lo que hace único a Arecibo/);
assert.match(arecibo, /\/administra-tu-pueblo\?pueblo=arecibo/);
assert.doesNotMatch(arecibo, /Discover Puerto Rico — Arecibo/);
assert.match(arecibo, /data-pb-site-footer/);
assert.match(arecibo, /\/api\/pb-stories\//);
assert.doesNotMatch(adjuntas, /<a href="#administra"/);

assert.deepEqual(Object.keys(guides), municipalities.map(([slug]) => slug));
assert.deepEqual(Object.keys(routes), Object.keys(guides));
for (const [slug, name] of municipalities) {
  const guide = guides[slug];
  assert.ok(guide.places.length >= 2, slug);
  assert.ok(guide.sources.some(([,url]) => url.startsWith('https://www.discoverpuertorico.com/')), slug);
  assert.ok(guide.photo.source.startsWith('https://commons.wikimedia.org/wiki/File:'), slug);
  assert.equal(fs.readFileSync(path.join(__dirname,'../public',guide.photo.path)).subarray(8,12).toString(), 'WEBP', slug);
  const html = renderTownPage({name,...towns[slug]}, slug, guide);
  assert.ok(html.includes(`<h1>${name}</h1>`), slug);
  assert.match(html, /id="guia-del-pueblo"/);
  assert.match(html, /id="historia-del-pueblo"/);
  assert.match(html, /id="fuentes"><details><summary>/);
  assert.ok(html.includes(routes[slug].title), slug);
  for (const index of routes[slug].stops) {
    const stop = 'guia-del-pueblo-parada-' + (index + 1);
    assert.ok(html.includes('href="#' + stop + '"'), slug);
    assert.ok(html.includes('id="' + stop + '"'), slug);
    assert.ok(!guide.places[index][5], slug + ' should avoid closed stops in its route');
  }
}
assert.match(renderTownPage(towns.arecibo, 'arecibo', guides.arecibo), /partner_id=SW7UD0N/);
assert.match(renderTownPage(towns.arecibo, 'arecibo', guides.arecibo), /rel="sponsored noopener noreferrer"/);

console.log('pb-town-page tests passed');
require('./pb-town-admin.test');
