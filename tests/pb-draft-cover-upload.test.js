const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');
const source = fs.readFileSync(path.join(__dirname, '../public/js/pb-synced-drafts.js'), 'utf8');

function harness(upload) {
  const storage = new Map();
  const writes = [];
  const status = () => ({ textContent:'', parentElement:{ querySelector:() => ({ append() {} }) } });
  function form(names) {
    const elements = names.map(name => ({ name, type:name === 'imageFile' ? 'file' : 'text', value:'' }));
    elements.forEach(field => { elements[field.name] = field; });
    const publish = { disabled:false };
    return { elements, publish, addEventListener() {}, querySelector:() => publish };
  }
  const latest = form(['editingId', 'title', 'body', 'image', 'imageFile']);
  const blog = form(['originalSlug', 'title']);
  let selected;
  Object.defineProperty(latest.elements.imageFile, 'files', { get:() => selected ? [selected] : [] });
  Object.defineProperty(latest.elements.imageFile, 'value', { set:v => { if (v === '') selected = undefined; }, get:() => '' });
  latest.elements.title.value = 'Alice Vanessa';
  latest.elements.body.value = '<p>Entrevista con fotos interiores.</p>';
  latest.elements.image.value = '/media/pb-blog/previous.png';
  const nodes = { blogForm:blog, latestForm:latest, blogDraftStatus:status(), latestDraftStatus:status(), latestImagePreview:{} };
  const context = {
    document:{ getElementById:id => nodes[id], querySelectorAll:() => [], createElement:() => ({ addEventListener() {} }) },
    window:{}, MutationObserver:class { observe() {} }, setTimeout:() => 1, clearTimeout() {},
    localStorage:{ getItem:k => storage.get(k), setItem:(k,v) => storage.set(k,v), removeItem:k => storage.delete(k) },
    apiAction:async (action,key,payload) => {
      if (action === 'control-draft-save') writes.push({ key, values:{ ...payload.values } });
      return action === 'control-draft-get' ? { draft:null } : {};
    },
    uploadLatestImage:upload, show() {},
  };
  vm.runInNewContext(source, context);
  return { latest, nodes, writes, storage, control:context.window.pbSyncedDrafts.latest, select:file => { selected = file; } };
}

test('saving a draft uploads its cover and restores the durable URL without publishing', async () => {
  let uploads = 0;
  const h = harness(async () => { uploads++; return '/media/pb-blog/new-cover.png'; });
  await new Promise(resolve => setImmediate(resolve));
  h.select({ name:'cover.jpg' });
  await h.control.saveNow(true);
  assert.equal(uploads, 1);
  assert.equal(h.writes.length, 1);
  assert.equal(h.writes[0].key, 'latest:new');
  assert.equal(h.writes[0].values.image, '/media/pb-blog/new-cover.png');
  assert.equal(h.writes[0].values.body, '<p>Entrevista con fotos interiores.</p>');
  assert.equal(h.latest.elements.imageFile.files.length, 0);
  assert.equal(h.latest.publish.disabled, false);
  assert.equal(h.nodes.latestImagePreview.src, '/media/pb-blog/new-cover.png');
  const local = JSON.parse(h.storage.get('pbControlDraftV1:latest:new'));
  assert.equal(local.values.image, '/media/pb-blog/new-cover.png');
  assert.match(h.nodes.latestDraftStatus.textContent, /Borrador sincronizado/);
});

test('upload failure preserves the old cover and local text, then permits a retry', async () => {
  let attempts = 0;
  const h = harness(async () => { if (++attempts === 1) throw new Error('Sin conexión'); return '/media/pb-blog/retry.png'; });
  await new Promise(resolve => setImmediate(resolve));
  h.select({ name:'cover.jpg' });
  await h.control.saveNow(true);
  assert.equal(h.writes.length, 0);
  assert.equal(h.latest.elements.image.value, '/media/pb-blog/previous.png');
  assert.equal(h.latest.elements.imageFile.files.length, 1);
  assert.equal(h.latest.publish.disabled, false);
  assert.match(h.nodes.latestDraftStatus.textContent, /No se guardó la portada/);
  assert.equal(JSON.parse(h.storage.get('pbControlDraftV1:latest:new')).values.title, 'Alice Vanessa');
  await h.control.saveNow(true);
  assert.equal(attempts, 2);
  assert.equal(h.writes[0].values.image, '/media/pb-blog/retry.png');
});

test('overlapping autosave and save button share one upload and retain edits made during upload', async () => {
  let finish;
  let uploads = 0;
  const h = harness(() => { uploads++; return new Promise(resolve => { finish = resolve; }); });
  await new Promise(resolve => setImmediate(resolve));
  h.select({ name:'cover.jpg' });
  const first = h.control.saveNow();
  const second = h.control.saveNow(true);
  await Promise.resolve();
  assert.equal(h.latest.publish.disabled, true);
  h.latest.elements.title.value = 'Alice Vanessa: título actualizado';
  finish('/media/pb-blog/shared.png');
  await Promise.all([first,second]);
  assert.equal(uploads, 1);
  assert.ok(h.writes.every(write => write.values.title === 'Alice Vanessa: título actualizado'));
  assert.equal(h.latest.publish.disabled, false);
});

test('an upload finishing after switching articles cannot overwrite the other draft', async () => {
  let finish;
  const h = harness(() => new Promise(resolve => { finish = resolve; }));
  await new Promise(resolve => setImmediate(resolve));
  h.select({ name:'cover.jpg' });
  const saving = h.control.saveNow();
  await Promise.resolve();
  h.latest.elements.editingId.value = 'other-article';
  finish('/media/pb-blog/stale.png');
  await saving;
  assert.equal(h.writes.length, 0);
  assert.equal(h.latest.elements.image.value, '/media/pb-blog/previous.png');
});
