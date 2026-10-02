const assert = require('node:assert/strict');
const vm = require('node:vm');

const html = require('../src/views/planetaboricua/feriaartesanos');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
assert.ok(scripts.length, 'The artisan fair must include its directory script.');

const elements = {
  'dir-filter-location': { value: '' },
  'dir-filter-category': { value: '' },
  'dir-sort': { value: 'featured' },
  'dir-search': { value: 'Stitches By Lú' },
  'directorio-grid': { innerHTML: '' },
  'result-count': { textContent: '' }
};

const negocios = [
  { name: 'Crafted by Ana', slug: 'crafted-by-ana', category: 'otro', city: 'Ponce', desc: 'Regalos hechos a mano.' },
  { name: 'Lú Designs', slug: 'lu-designs', category: 'otro', city: 'Puerto Rico', desc: 'Artículos personalizados.' },
  { name: 'Stitches by Lú', slug: 'stitches-by-lu', category: 'textiles', city: 'Baltimore', desc: 'Artículos tejidos y bordados para bebé.' }
];

const context = {
  document: { getElementById: id => elements[id] },
  window: { location: { search: '' } },
  fetch: async () => ({ json: async () => ({ negocios }) }),
  URL,
  URLSearchParams,
  Map,
  Set,
  encodeURIComponent,
  clearTimeout: () => {},
  setTimeout: fn => { fn(); return 1; },
  console
};

vm.runInNewContext(scripts.at(-1)[1], context);

setImmediate(() => {
  assert.equal(elements['result-count'].textContent, '1 participante');
  assert.match(elements['directorio-grid'].innerHTML, /Stitches by Lú/);
  assert.doesNotMatch(elements['directorio-grid'].innerHTML, /Crafted by Ana/);
  assert.doesNotMatch(elements['directorio-grid'].innerHTML, /Lú Designs/);
  console.log('PB artisan search regression: OK');
});
