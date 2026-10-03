const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');

const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'pb-control-drafts-'));
process.env.PB_CONTROL_DRAFTS_FILE = path.join(directory, 'drafts.json');
const drafts = require('../src/services/pb-control-drafts');

assert.equal(drafts.validKey('blog:new'), true);
assert.equal(drafts.validKey('latest:1787921561944'), true);
assert.equal(drafts.validKey('../data:bad'), false);

const saved = drafts.save('blog:new', {
  title:'Una historia en progreso',
  content:'<p>Texto con <strong>formato</strong>.</p>',
  ignored:'no debe guardarse'
}, '2026-10-03T13:00:00.000Z');
assert.equal(saved.savedAt, '2026-10-03T13:00:00.000Z');
assert.equal(saved.values.title, 'Una historia en progreso');
assert.equal(saved.values.content, '<p>Texto con <strong>formato</strong>.</p>');
assert.equal(Object.hasOwn(saved.values, 'ignored'), false);
assert.deepEqual(drafts.get('blog:new'), saved);

drafts.save('latest:new', { title:'Noticia', body:'Contenido' });
assert.equal(drafts.get('latest:new').values.body, 'Contenido');
assert.equal(drafts.remove('blog:new'), true);
assert.equal(drafts.get('blog:new'), null);
assert.equal(drafts.remove('blog:new'), false);

const root = path.resolve(__dirname, '..');
const browserSync = fs.readFileSync(path.join(root, 'public/js/pb-synced-drafts.js'), 'utf8');
const server = fs.readFileSync(path.join(root, 'src/server.js'), 'utf8');
new vm.Script(browserSync, { filename:'pb-synced-drafts.js' });
assert.match(browserSync, /control-draft-save/);
assert.match(browserSync, /control-draft-get/);
assert.match(server, /action === 'control-draft-save'/);
assert.match(server, /pbControlDrafts\.remove\('latest:new'\)/, 'Publishing must remove the synchronized private draft.');

fs.rmSync(directory, { recursive:true, force:true });
console.log('PB synchronized control drafts: OK');
