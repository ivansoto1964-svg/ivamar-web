const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const pressRoom = require('../src/services/pb-press-room');
const renderControl = require('../src/views/pb-control');

const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'pb-press-room-'));
const file = path.join(directory, 'press-room.json');

const contact = pressRoom.saveContact({
  mediaName:'Medio verificado', contactName:'Contacto Uno', email:'contacto@example.com',
  website:'https://example.com/prensa', mediaType:'Radio', city:'San Juan', state:'Puerto Rico',
  country:'Estados Unidos', reach:'Puerto Rico', tags:['Artesanos','Cultura'], priority:'A',
  contactType:'Productor', status:'Activo', notes:'Contacto confirmado.'
}, '', file);
assert.ok(contact.id);
assert.equal(pressRoom.read(file).contacts.length, 1);

const edited = pressRoom.saveContact({...contact,phone:'787-555-0100',tags:['Eventos']}, contact.id, file);
assert.equal(edited.phone, '787-555-0100');
assert.deepEqual(edited.tags, ['Eventos']);

const release = pressRoom.saveRelease({
  title:'Comunicado de prueba', date:'2026-09-23', campaign:'Campaña verificada',
  content:'Contenido pendiente de aprobación.', mediaKitUrl:'https://example.com/media-kit', status:'Borrador'
}, '', file);
assert.ok(release.id);

const firstAssociation = pressRoom.associateContacts(release.id, [contact.id], file);
assert.equal(firstAssociation.length, 1);
assert.equal(pressRoom.associateContacts(release.id, [contact.id], file).length, 0, 'association must be idempotent');

const tracked = pressRoom.updateDistribution(firstAssociation[0].id, {
  sentDate:'2026-09-10', status:'Publicó', followUpDate:'2026-09-12',
  publicationUrl:'https://example.com/cobertura', notes:'Cobertura confirmada.'
}, file);
assert.equal(tracked.status, 'Publicó');
assert.equal(tracked.publicationUrl, 'https://example.com/cobertura');

pressRoom.deactivateContact(contact.id, file);
assert.equal(pressRoom.read(file).contacts[0].status, 'No contactar');
assert.ok(fs.readdirSync(path.join(directory, 'pb-press-room-backups')).length, 'mutations must create recoverable backups');

assert.throws(() => pressRoom.saveContact({mediaName:'Medio',email:'no-es-email'}, '', file), /email/);
assert.throws(() => pressRoom.saveRelease({title:'Sin fecha'}, '', file), /fecha/);

const master = `PLANETA BORICUA
Estado: RECOPILACIÓN INICIAL TERMINADA

A. PUERTO RICO — MEDIOS / PRENSA
Medio verificado — Contacto Uno — contacto@example.com
Medio nuevo — Periodista Cultural — periodista@medio.test
CONTACTOS IMPORTANTES SIN EMAIL CONFIRMADO:
Radio sin correo — formulario oficial

O. FESTIVALES / DESFILES / EVENTOS
Festival Boricua — Organización — festival@example.org
CONTACTOS SIN EMAIL DIRECTO CONFIRMADO:
Festival sin email

P. ORGANIZACIONES BORICUAS / LATINAS
Organización Cultural — Directora — directora@example.org

Q. CULTURA / ARTES / EDUCACIÓN
Centro Cultural — General — centro@example.org

R. AMPLIFICADORES / ALIANZAS
Desfile Nacional
— Wanda — wanda@example.org
— Wilson — wilson@example.org

REGLAS DE DEDUPLICACIÓN`;
const preview = pressRoom.previewMasterPackage(master,file);
assert.equal(preview.addedContacts,2);
assert.equal(preview.parsedEntities,5);
assert.equal(pressRoom.read(file).contacts.length,1,'preview must not write');
const imported = pressRoom.importMasterPackage(master,file);
assert.equal(imported.addedContacts,2);
assert.equal(imported.summary.recordsWithoutEmail,1);
assert.equal(imported.summary.festivals,2);
assert.equal(imported.summary.organizations,1);
assert.equal(imported.summary.culture,1);
assert.equal(pressRoom.read(file).entities.length,5);
assert.ok(pressRoom.read(file).entities.every(entity => entity.id && entity.name),'every imported entity must retain its name and receive a stable id');
const repeated = pressRoom.importMasterPackage(master,file);
assert.equal(repeated.addedContacts,0,'master import must be idempotent');
assert.equal(repeated.addedEntities,0,'entity import must be idempotent');
assert.ok(pressRoom.PRIORITIES.includes('A+'));

const state = pressRoom.read(file);
state.options = {
  mediaTypes:pressRoom.MEDIA_TYPES, reaches:pressRoom.REACHES, tags:pressRoom.TAGS,
  priorities:pressRoom.PRIORITIES, contactTypes:pressRoom.CONTACT_TYPES,
  contactStatuses:pressRoom.CONTACT_STATUSES, releaseStatuses:pressRoom.RELEASE_STATUSES,
  distributionStatuses:pressRoom.DISTRIBUTION_STATUSES
};
const html = renderControl({
  csrf:'test', counts:{}, blogPosts:[], latestPending:[], latestApproved:[],
  commentsPending:[], commentsApproved:[], artisansPending:[], artisansApproved:[],
  eventsPending:[], eventsApproved:[], subscribers:[], affiliates:[], artisanEmailCount:0,
  artisanEmailAudit:{}, artisanMetrics:[], artisanMailHistory:[], siteAnalytics:{}, pressRoom:state
});
assert.match(html,/Sala de Prensa PB/);
assert.match(html,/Esta versión no envía emails/);
assert.match(html,/press-contact-save/);
assert.match(html,/press-release-associate/);
assert.match(html,/press-distribution-update/);
assert.match(html,/Consolidar Paquete Maestro/);
assert.match(html,/LISTOS PARA ENVÍO/);
assert.match(html,/Organizaciones, festivales, cultura y aliados/);
assert.match(html,/Medio verificado/);
assert.match(html,/Comunicado de prueba/);
assert.match(html,/pressReleaseDraftStatus/);
assert.match(html,/Feria Digital de Artesanos — Planeta Boricua/);
const inlineScripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(match => match[1]);
inlineScripts.forEach((script,index) => new vm.Script(script,{filename:`pb-control-press-inline-${index}.js`}));

const server = fs.readFileSync(path.join(__dirname,'..','src/server.js'),'utf8');
assert.match(server,/pbPressRoom\.read\(\)/);
assert.match(server,/action === 'press-contact-save'/);
assert.match(server,/action === 'press-master-preview'/);
assert.match(server,/action === 'press-master-import'/);
assert.match(server,/action === 'press-release-save'/);
assert.match(server,/action === 'press-release-associate'/);
assert.match(server,/action === 'press-distribution-update'/);

console.log('PB press room tests passed');
