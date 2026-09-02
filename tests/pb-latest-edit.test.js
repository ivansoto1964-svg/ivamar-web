const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const editor = require('../src/services/pb-latest-editor');
const renderControl = require('../src/views/pb-control');

const original = {
  id:'1787921561944',
  slug:editor.TITLE_FIX.slug,
  title:editor.TITLE_FIX.from,
  summary:'Resumen original',
  body:'<p>Contenido original</p>',
  image:'/media/pb-blog/original.png',
  sources:[{label:'Fuente uno',url:'https://example.com/uno'},{label:'Fuente dos',url:'https://example.com/dos'}],
  status:'approved',
  publishedAt:'2026-08-28T16:52:00.000Z'
};

const correction = editor.correctKnownTitle([original]);
assert.equal(correction.changed,true);
assert.equal(correction.items[0].title,editor.TITLE_FIX.to);
assert.equal(correction.items[0].slug,original.slug,'the known title correction must preserve the public URL');

const saved = editor.updatePublished([correction.items[0]],original.id,{
  title:'Título corregido por Iván',
  summary:'Resumen actualizado',
  body:'<p>Contenido actualizado</p>',
  image:'',
  sourceLabel:'Fuente principal',
  sourceUrl:'https://example.com/principal'
},'2026-09-02T21:00:00.000Z');
assert.ok(saved);
assert.equal(saved.item.slug,original.slug,'editing a title must never regenerate the slug');
assert.equal(saved.item.id,original.id);
assert.equal(saved.item.publishedAt,original.publishedAt);
assert.equal(saved.item.image,original.image,'leaving the image field empty must preserve the current image');
assert.equal(saved.item.sources.length,2,'secondary sources must not be discarded');
assert.equal(saved.item.sources[1].url,'https://example.com/dos');

const html = renderControl({
  csrf:'test',counts:{},blogPosts:[],latestPending:[],latestApproved:[original],
  commentsPending:[],commentsApproved:[],artisansPending:[],artisansApproved:[],
  eventsPending:[],eventsApproved:[],subscribers:[],affiliates:[],
  artisanEmailAudit:{},artisanMetrics:[],artisanMailHistory:[]
});
assert.match(html,/data-edit-latest=/);
assert.match(html,/latestEditingId\.name='editingId'/);
assert.match(html,/Cancelar edición/);
assert.match(html,/latest-update/);
assert.match(html,/pbRefreshRichEditors/);
const inlineScripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(match => match[1]);
assert.ok(inlineScripts.length,'PB Control must include its client-side controller.');
inlineScripts.forEach((script,index) => new vm.Script(script,{filename:`pb-control-inline-${index}.js`}));

const server = fs.readFileSync(path.join(__dirname,'..','src/server.js'),'utf8');
assert.match(server,/action === 'latest-update'/);
assert.match(server,/pbLatestEditor\.updatePublished/);
assert.match(server,/repairPBLatestTitleTypo\(\)/);
console.log('PB latest editing and stable URL tests passed');
