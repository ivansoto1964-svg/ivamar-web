const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const render = require('../src/views/pb-control');

const server = fs.readFileSync(path.join(__dirname, '../src/server.js'), 'utf8');
const html = render({
  csrf:'test', counts:{}, blogPosts:[], latestPending:[], latestApproved:[],
  commentsPending:[], commentsApproved:[], artisansPending:[], artisansApproved:[],
  eventsPending:[], eventsApproved:[], subscribers:[], affiliates:[],
  artisanEmailAudit:{}, artisanMetrics:[], artisanMailHistory:[]
});

assert.match(html, /id="eventCreateForm"/, 'PB Control must provide an administrative event form.');
assert.match(html, /name="freeConfirmed"/, 'The administrator must confirm free admission.');
assert.match(html, /name="performerName"/, 'The form must support Google performer data when applicable.');
assert.match(html, /apiAction\('event-create','new',data\)/, 'The form must use the protected PB Control action endpoint.');
assert.match(server, /if \(action==='event-create'\)/, 'The server must recognize direct administrative event creation.');
assert.match(server, /Ese evento ya está guardado/, 'Duplicate event submissions must be rejected.');
assert.match(server, /createdBy:'pb-admin'/, 'Administrative events must retain their origin.');
assert.match(server, /performerName:event\.performerName/, 'Performer data must reach the public Agenda schema.');
const inlineScripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
assert.ok(inlineScripts.length, 'PB Control must contain its client script.');
new vm.Script(inlineScripts.at(-1)[1], {filename:'pb-control-inline.js'});

console.log('PB administrative event creation contract: OK');
