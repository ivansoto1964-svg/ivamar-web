const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DEFAULT_FILE = process.env.PB_PRESS_ROOM_FILE || '/data/pb-press-room.json';
const MEDIA_TYPES = ['Radio','Televisión','Periódico','Medio digital','Revista','Podcast','Otro'];
const REACHES = ['Puerto Rico','Diáspora','Latino','Nacional'];
const TAGS = ['Artesanos','Cultura','Eventos','Turismo','Gastronomía','Negocios','Comunidad','Diáspora','Viajes','Entretenimiento','Otros'];
const PRIORITIES = ['A','B','C'];
const CONTACT_TYPES = ['Redacción general','Periodista','Editor','Productor','Director','Contacto personal','Otro'];
const CONTACT_STATUSES = ['Activo','Por verificar','No contactar'];
const RELEASE_STATUSES = ['Borrador','Listo','En distribución','Finalizado'];
const DISTRIBUTION_STATUSES = ['Pendiente','Enviado','Respondió','Publicó','Seguimiento','No interesado'];

function emptyState() {
  return { version:1, contacts:[], releases:[], distributions:[] };
}

function text(value, max = 300) {
  return String(value || '').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}

function longText(value, max = 50000) {
  return String(value || '').replace(/\u0000/g, '').trim().slice(0, max);
}

function choice(value, allowed, fallback) {
  const clean = text(value, 80);
  return allowed.includes(clean) ? clean : fallback;
}

function dateValue(value) {
  const clean = text(value, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(clean) ? clean : '';
}

function urlValue(value) {
  const clean = text(value, 500);
  if (!clean) return '';
  try {
    const parsed = new URL(clean);
    return ['http:','https:'].includes(parsed.protocol) ? parsed.toString() : '';
  } catch (_) {
    return '';
  }
}

function normalizeState(value) {
  const state = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  return {
    version:1,
    contacts:Array.isArray(state.contacts) ? state.contacts : [],
    releases:Array.isArray(state.releases) ? state.releases : [],
    distributions:Array.isArray(state.distributions) ? state.distributions : []
  };
}

function read(file = DEFAULT_FILE) {
  try { return normalizeState(JSON.parse(fs.readFileSync(file, 'utf8'))); }
  catch (_) { return emptyState(); }
}

function write(file, state) {
  const directory = path.dirname(file);
  fs.mkdirSync(directory, { recursive:true });
  if (fs.existsSync(file)) {
    const backupDirectory = path.join(directory, 'pb-press-room-backups');
    fs.mkdirSync(backupDirectory, { recursive:true });
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    fs.copyFileSync(file, path.join(backupDirectory, `press-room-${stamp}-${crypto.randomBytes(2).toString('hex')}.json`));
    const backups = fs.readdirSync(backupDirectory).filter(name => name.endsWith('.json')).sort();
    backups.slice(0, Math.max(0, backups.length - 40)).forEach(name => fs.unlinkSync(path.join(backupDirectory, name)));
  }
  const temporary = `${file}.${process.pid}.${crypto.randomBytes(2).toString('hex')}.tmp`;
  fs.writeFileSync(temporary, JSON.stringify(normalizeState(state), null, 2), 'utf8');
  fs.renameSync(temporary, file);
}

function id(prefix) {
  return `${prefix}-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
}

function contactPayload(input = {}) {
  const email = text(input.email, 254).toLowerCase();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('El email del contacto no es válido.');
  const website = urlValue(input.website);
  if (input.website && !website) throw new Error('El sitio web no es válido.');
  const tags = (Array.isArray(input.tags) ? input.tags : String(input.tags || '').split(','))
    .map(item => choice(item, TAGS, '')).filter(Boolean).filter((item, index, values) => values.indexOf(item) === index);
  const mediaName = text(input.mediaName, 180);
  if (!mediaName) throw new Error('Escribe el nombre del medio.');
  return {
    mediaName,
    contactName:text(input.contactName, 180),
    email,
    phone:text(input.phone, 60),
    website,
    mediaType:choice(input.mediaType, MEDIA_TYPES, 'Medio digital'),
    city:text(input.city, 120),
    state:text(input.state, 120),
    country:text(input.country, 120),
    reach:choice(input.reach, REACHES, 'Puerto Rico'),
    tags,
    priority:choice(input.priority, PRIORITIES, 'B'),
    contactType:choice(input.contactType, CONTACT_TYPES, 'Redacción general'),
    status:choice(input.status, CONTACT_STATUSES, 'Por verificar'),
    notes:longText(input.notes, 5000)
  };
}

function releasePayload(input = {}) {
  const title = text(input.title, 240);
  const date = dateValue(input.date);
  if (!title) throw new Error('Escribe el título del comunicado.');
  if (!date) throw new Error('Selecciona una fecha válida.');
  const mediaKitUrl = urlValue(input.mediaKitUrl);
  if (input.mediaKitUrl && !mediaKitUrl) throw new Error('El enlace del Media Kit no es válido.');
  return {
    title,
    date,
    campaign:text(input.campaign, 200),
    content:longText(input.content, 50000),
    mediaKitUrl,
    status:choice(input.status, RELEASE_STATUSES, 'Borrador')
  };
}

function saveContact(input, contactId = '', file = DEFAULT_FILE) {
  const state = read(file);
  const now = new Date().toISOString();
  const payload = contactPayload(input);
  if (contactId) {
    const index = state.contacts.findIndex(item => item.id === contactId);
    if (index < 0) return null;
    state.contacts[index] = { ...state.contacts[index], ...payload, updatedAt:now };
    write(file, state);
    return state.contacts[index];
  }
  const contact = { id:id('contact'), ...payload, createdAt:now, updatedAt:now };
  state.contacts.push(contact);
  write(file, state);
  return contact;
}

function deactivateContact(contactId, file = DEFAULT_FILE) {
  const state = read(file);
  const index = state.contacts.findIndex(item => item.id === contactId);
  if (index < 0) return null;
  state.contacts[index] = { ...state.contacts[index], status:'No contactar', updatedAt:new Date().toISOString() };
  write(file, state);
  return state.contacts[index];
}

function saveRelease(input, releaseId = '', file = DEFAULT_FILE) {
  const state = read(file);
  const now = new Date().toISOString();
  const payload = releasePayload(input);
  if (releaseId) {
    const index = state.releases.findIndex(item => item.id === releaseId);
    if (index < 0) return null;
    state.releases[index] = { ...state.releases[index], ...payload, updatedAt:now };
    write(file, state);
    return state.releases[index];
  }
  const release = { id:id('release'), ...payload, createdAt:now, updatedAt:now };
  state.releases.push(release);
  write(file, state);
  return release;
}

function associateContacts(releaseId, contactIds, file = DEFAULT_FILE) {
  const state = read(file);
  if (!state.releases.some(item => item.id === releaseId)) throw new Error('El comunicado no existe.');
  const selected = new Set((Array.isArray(contactIds) ? contactIds : []).map(value => text(value, 120)).filter(Boolean).slice(0, 500));
  if (!selected.size) throw new Error('Selecciona por lo menos un contacto.');
  const existing = new Set(state.distributions.filter(item => item.releaseId === releaseId).map(item => item.contactId));
  const now = new Date().toISOString();
  const added = [];
  state.contacts.filter(contact => selected.has(contact.id) && !existing.has(contact.id)).forEach(contact => {
    if (contact.status === 'No contactar') return;
    const record = {
      id:id('distribution'), releaseId, contactId:contact.id,
      mediaName:contact.mediaName, contactName:contact.contactName, email:contact.email,
      sentDate:'', status:'Pendiente', followUpDate:'', publicationUrl:'', notes:'',
      createdAt:now, updatedAt:now
    };
    state.distributions.push(record);
    added.push(record);
  });
  if (added.length) write(file, state);
  return added;
}

function updateDistribution(distributionId, input = {}, file = DEFAULT_FILE) {
  const state = read(file);
  const index = state.distributions.findIndex(item => item.id === distributionId);
  if (index < 0) return null;
  const publicationUrl = urlValue(input.publicationUrl);
  if (input.publicationUrl && !publicationUrl) throw new Error('El enlace de publicación no es válido.');
  state.distributions[index] = {
    ...state.distributions[index],
    sentDate:dateValue(input.sentDate),
    status:choice(input.status, DISTRIBUTION_STATUSES, state.distributions[index].status || 'Pendiente'),
    followUpDate:dateValue(input.followUpDate),
    publicationUrl,
    notes:longText(input.notes, 5000),
    updatedAt:new Date().toISOString()
  };
  write(file, state);
  return state.distributions[index];
}

module.exports = {
  DEFAULT_FILE, MEDIA_TYPES, REACHES, TAGS, PRIORITIES, CONTACT_TYPES, CONTACT_STATUSES, RELEASE_STATUSES, DISTRIBUTION_STATUSES,
  emptyState, read, saveContact, deactivateContact, saveRelease, associateContacts, updateDistribution
};
