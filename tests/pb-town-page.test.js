const assert = require('assert');
const towns = require('../src/data/pb-towns');
const renderTownPage = require('../src/views/planetaboricua/town-page');

const arecibo = renderTownPage(towns.arecibo, 'arecibo');
const adjuntas = renderTownPage(towns.adjuntas, 'adjuntas');

assert.match(arecibo, /<meta name="robots" content="index,follow">/);
assert.match(adjuntas, /<meta name="robots" content="noindex,follow">/);
assert.match(arecibo, /Arecibo C3/);
assert.match(arecibo, /Oportunidad de generar ingresos/);
assert.match(arecibo, /Me interesa administrar Arecibo/);
assert.match(arecibo, /Discover Puerto Rico — Arecibo/);
assert.match(arecibo, /data-pb-site-footer/);
assert.match(arecibo, /\/api\/pb-stories\//);
assert.doesNotMatch(adjuntas, /href="#administra"/);

console.log('pb-town-page tests passed');
