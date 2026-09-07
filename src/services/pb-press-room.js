const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DEFAULT_FILE = process.env.PB_PRESS_ROOM_FILE || '/data/pb-press-room.json';
const MEDIA_TYPES = ['Radio','Televisión','Periódico','Medio digital','Revista','Podcast','Otro'];
const REACHES = ['Puerto Rico','Diáspora','Latino','Nacional'];
const TAGS = ['Artesanos','Cultura','Eventos','Turismo','Gastronomía','Negocios','Comunidad','Diáspora','Viajes','Entretenimiento','Otros'];
const PRIORITIES = ['A+','A','B','C'];
const CONTACT_TYPES = ['Redacción general','Periodista','Editor','Productor','Director','Contacto personal','Otro'];
const CONTACT_STATUSES = ['Activo','Por verificar','Revalidar antes de envío','Sin email','Alternativo','No contactar'];
const RELEASE_STATUSES = ['Borrador','Listo','En distribución','Finalizado'];
const DISTRIBUTION_STATUSES = ['Pendiente','Enviado','Respondió','Publicó','Seguimiento','No interesado'];
const ENTITY_CATEGORIES = ['Organización','Festival/evento','Cultura/institución','Amplificador/aliado','Servicio de distribución'];

function emptyState() {
  return { version:2, contacts:[], releases:[], distributions:[], entities:[], imports:[] };
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
    version:2,
    contacts:Array.isArray(state.contacts) ? state.contacts : [],
    releases:Array.isArray(state.releases) ? state.releases : [],
    distributions:Array.isArray(state.distributions) ? state.distributions : [],
    entities:Array.isArray(state.entities) ? state.entities.map(entity => ({...entity,id:text(entity?.id,120) || id('entity')})) : [],
    imports:Array.isArray(state.imports) ? state.imports.slice(-20) : []
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

function normalizedKey(value) {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/&/g, ' y ').replace(/[^a-z0-9]+/g, ' ').trim();
}

function entityAliasKey(value) {
  const key=normalizedKey(value);
  if (key.startsWith('puerto rican arts alliance')) return 'puerto rican arts alliance';
  if (key.startsWith('asociacion puertorriquenos en marcha')) return 'asociacion puertorriquenos en marcha';
  if (key.startsWith('somos society')) return 'somos society';
  if (key.startsWith('taller puertorriqueno')) return 'taller puertorriqueno';
  if (key.startsWith('uconn prlacc') || key.startsWith('uconn puerto rican latin american cultural center')) return 'uconn prlacc';
  return key;
}

function sameEntity(left,right) {
  const a=entityAliasKey(left),b=entityAliasKey(right);
  if (a === b) return true;
  const aBase=normalizedKey(String(left || '').split('/')[0]);
  const bBase=normalizedKey(String(right || '').split('/')[0]);
  return (aBase === b && aBase.split(' ').length >= 3) || (bBase === a && bBase.split(' ').length >= 3);
}

function relatedMedia(left,right) {
  const a=normalizedKey(left),b=normalizedKey(right);
  if (a === b) return true;
  const shorter=a.length <= b.length ? a : b;
  const longer=a.length <= b.length ? b : a;
  return shorter.split(' ').length >= 2 && longer.includes(shorter);
}

function contactPersonKey(value) {
  const original=String(value || '');
  const parts=original.split('/').map(item=>item.trim()).filter(Boolean);
  if (parts.length > 1 && inferredContactType(parts.slice(1).join(' ')) !== 'Otro') return normalizedKey(parts[0]);
  return normalizedKey(original);
}

function validEmail(value) {
  const email = text(value,254).toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : '';
}

function inferredContactType(label) {
  const value = normalizedKey(label);
  if (/periodista|reporter|corresponsal/.test(value)) return 'Periodista';
  if (/editor|redaccion|newsroom|news desk|mesa|noticias|tips|story/.test(value)) return /editor/.test(value) ? 'Editor' : 'Redacción general';
  if (/productor|produccion/.test(value)) return 'Productor';
  if (/director|president|publisher|ceo|vice president|managing partner/.test(value)) return 'Director';
  if (/personal|calido/.test(value)) return 'Contacto personal';
  return 'Otro';
}

function sectionCategory(section) {
  if (section === 'O') return 'Festival/evento';
  if (section === 'P') return 'Organización';
  if (section === 'Q') return 'Cultura/institución';
  if (section === 'R') return 'Amplificador/aliado';
  return '';
}

function parseMasterPackage(source) {
  const raw = String(source || '').replace(/\r/g,'');
  if (!raw.includes('RECOPILACIÓN INICIAL TERMINADA')) throw new Error('El paquete no indica RECOPILACIÓN INICIAL TERMINADA.');
  const contacts = [];
  const entities = [];
  const warnings = [];
  let section = '';
  let mode = '';
  let currentEntity = '';
  let lastRecord = null;
  const lines = raw.split('\n');

  function addPress(mediaName,contactName,email,status = '') {
    const media = text(mediaName,180);
    if (!media) return;
    const record = {
      mediaName:media, contactName:text(contactName,180), email:validEmail(email), alternateEmails:[],
      phone:'', website:'', mediaType:'', city:'', state:'', country:'', reach:'', tags:[], priority:'',
      contactType:inferredContactType(contactName), status:status || (email ? 'Por verificar' : 'Sin email'),
      notes:`Paquete Maestro 2026-09-07 · sección ${section}. Validación final pendiente.`
    };
    contacts.push(record);
    lastRecord = record;
  }

  function addEntity(name,contactName,email,status = '') {
    const cleanName = text(name,200);
    if (!cleanName) return;
    let entity = entities.find(item => sameEntity(item.name,cleanName));
    const category = sectionCategory(section) || 'Organización';
    if (!entity) {
      entity = {id:'',name:cleanName,categories:[category],city:'',state:'',country:'',areaServed:'',phone:'',website:'',socials:'',description:'',
        contacts:[],source:'Paquete Maestro 2026-09-07',status:status || (email ? 'Por verificar' : 'Sin email'),notes:'',potentialProfile:true,potentialAgenda:category === 'Festival/evento',potentialAlliance:true};
      entities.push(entity);
    } else if (!entity.categories.includes(category)) entity.categories.push(category);
    const cleanEmail = validEmail(email);
    const cleanContact = text(contactName,180);
    if (cleanEmail || cleanContact) {
      const exists = entity.contacts.some(item => (cleanEmail && item.email === cleanEmail) || (!cleanEmail && normalizedKey(item.name) === normalizedKey(cleanContact)));
      if (!exists) entity.contacts.push({name:cleanContact,email:cleanEmail,role:cleanContact,status:status || (cleanEmail ? 'Por verificar' : 'Sin email')});
    }
    if (status === 'Revalidar antes de envío') entity.status = status;
    lastRecord = entity;
  }

  for (let index=0;index<lines.length;index+=1) {
    const line = lines[index].trim();
    if (!line) { mode='';currentEntity='';lastRecord=null;continue; }
    if (/^=+$/.test(line)) continue;
    if (line === 'REGLAS DE DEDUPLICACIÓN') break;
    const heading = line.match(/^([A-R])\.\s/);
    if (heading) { section=heading[1]; mode=''; currentEntity=''; lastRecord=null; continue; }
    if (!section) continue;
    if (/^CONTACTOS?.*SIN EMAIL/i.test(line)) { mode='no-email'; lastRecord=null; continue; }
    if (/^(REVALIDAR|NO ACTIVAR)/i.test(line)) {
      mode='revalidate';
      if (lastRecord) lastRecord.status='Revalidar antes de envío';
      continue;
    }
    if (/^(NOTA|CLASIFICAR):/i.test(line)) {
      if (lastRecord) lastRecord.notes = longText(`${lastRecord.notes || ''} ${line}`,5000);
      continue;
    }
    if (line === 'Puerto Rico Sentinel') {
      const previousSection=section;
      section='R';
      addEntity(line,'','', 'Sin email');
      entities[entities.length-1].categories=['Servicio de distribución'];
      section=previousSection;
      currentEntity=line;
      continue;
    }
    if (/^(POR QUÉ|FUENTE|ENLACE|FECHA|Estos contactos|También pueden|Conservarlos|NO deben)/i.test(line)) continue;
    const category = sectionCategory(section);
    const bullet = line.match(/^—\s*(.+)$/);
    if (bullet && category && currentEntity) {
      const parts = bullet[1].split(/\s+—\s+/).map(item=>item.trim()).filter(Boolean);
      const email = parts.length && validEmail(parts[parts.length-1]) ? parts.pop() : '';
      addEntity(currentEntity,parts.join(' — '),email,mode === 'revalidate' ? 'Revalidar antes de envío' : '');
      continue;
    }
    const parts = line.split(/\s+—\s+/).map(item=>item.trim()).filter(Boolean);
    const email = parts.length && validEmail(parts[parts.length-1]) ? parts.pop() : '';
    if (parts.length >= 2 || (parts.length === 1 && (mode === 'no-email' || email))) {
      const name = parts.shift();
      const contactName = parts.join(' — ');
      const status = mode === 'revalidate' ? 'Revalidar antes de envío' : (mode === 'no-email' && !email ? 'Sin email' : '');
      if (category) addEntity(name,contactName,email,status);
      else addPress(name,contactName,email,status);
      currentEntity = category ? name : '';
      continue;
    }
    if (category && /^[A-ZÁÉÍÓÚÑ¡]/.test(line) && !/[.:]$/.test(line) && line.length < 180) {
      currentEntity=line;
      if (mode === 'no-email' || line === 'Puerto Rico Sentinel') addEntity(line,'','',line === 'Puerto Rico Sentinel' ? 'Sin email' : 'Sin email');
    }
  }
  if (!contacts.length) warnings.push('No se detectaron contactos de prensa.');
  if (!entities.length) warnings.push('No se detectaron organizaciones o entidades.');
  return {contacts,entities,warnings};
}

function mergeEmpty(target,source,fields) {
  let changed=false;
  fields.forEach(field => {
    const empty = target[field] === undefined || target[field] === null || target[field] === '' || (Array.isArray(target[field]) && !target[field].length);
    if (empty && source[field] !== undefined && source[field] !== null && source[field] !== '' && (!Array.isArray(source[field]) || source[field].length)) {
      target[field]=source[field];changed=true;
    }
  });
  return changed;
}

function mergeParsedPackage(current,parsed) {
  const state = normalizeState(JSON.parse(JSON.stringify(current || emptyState())));
  const report = {addedContacts:0,updatedContacts:0,duplicatesMerged:0,addedEntities:0,updatedEntities:0,entityContactsMerged:0,warnings:[...(parsed.warnings || [])]};
  const now = new Date().toISOString();
  parsed.contacts.forEach(incoming => {
    const mediaKey = normalizedKey(incoming.mediaName);
    const nameKey = contactPersonKey(incoming.contactName);
    const email = validEmail(incoming.email);
    let match = state.contacts.find(item => normalizedKey(item.mediaName) === mediaKey && nameKey && contactPersonKey(item.contactName) === nameKey);
    if (!match && nameKey) match = state.contacts.find(item => relatedMedia(item.mediaName,incoming.mediaName) && contactPersonKey(item.contactName) === nameKey);
    if (!match && email) match = state.contacts.find(item => {
      if (validEmail(item.email) !== email || !relatedMedia(item.mediaName,incoming.mediaName)) return false;
      const existingName=contactPersonKey(item.contactName);
      const bothEditorial=['Redacción general','Otro'].includes(item.contactType) && ['Redacción general','Otro'].includes(incoming.contactType);
      return !nameKey || !existingName || existingName === nameKey || existingName.includes(nameKey) || nameKey.includes(existingName) || bothEditorial;
    });
    if (!match && !nameKey && !email) match = state.contacts.find(item => normalizedKey(item.mediaName) === mediaKey && !normalizedKey(item.contactName) && !validEmail(item.email));
    if (match) {
      let changed=mergeEmpty(match,incoming,['contactName','email','phone','website','mediaType','city','state','country','reach','tags','priority','contactType','status','notes']);
      if (email && validEmail(match.email) && validEmail(match.email) !== email && nameKey === contactPersonKey(match.contactName)) {
        match.alternateEmails=Array.isArray(match.alternateEmails)?match.alternateEmails:[];
        if (!match.alternateEmails.includes(email)) { match.alternateEmails.push(email);changed=true; }
      }
      if (changed) {match.updatedAt=now;report.updatedContacts+=1;} else report.duplicatesMerged+=1;
    } else {
      state.contacts.push({id:id('contact'),...incoming,createdAt:now,updatedAt:now});
      report.addedContacts+=1;
    }
  });
  parsed.entities.forEach(incoming => {
    let match=state.entities.find(item => sameEntity(item.name,incoming.name));
    if (!match) {
      state.entities.push({...incoming,id:id('entity'),createdAt:now,updatedAt:now});
      report.addedEntities+=1;
      return;
    }
    let changed=mergeEmpty(match,incoming,['city','state','country','areaServed','phone','website','socials','description','source','status','notes']);
    match.categories=Array.from(new Set([...(match.categories || []),...(incoming.categories || [])]));
    match.contacts=Array.isArray(match.contacts)?match.contacts:[];
    (incoming.contacts || []).forEach(contact => {
      const duplicate=match.contacts.some(item => (contact.email && validEmail(item.email) === contact.email) || (!contact.email && normalizedKey(item.name) === normalizedKey(contact.name)));
      if (!duplicate) {match.contacts.push(contact);report.entityContactsMerged+=1;changed=true;}
    });
    if (changed) {match.updatedAt=now;report.updatedEntities+=1;}
  });
  return {state,report};
}

function controlSummary(stateInput) {
  const state=normalizeState(stateInput);
  const usable=state.contacts.filter(item => validEmail(item.email));
  const ready=usable.filter(item => item.status === 'Activo' && ['A+','A'].includes(item.priority));
  const countCategory = category => state.entities.filter(item => (item.categories || []).includes(category)).length;
  const lastImport=state.imports[state.imports.length-1]?.report || {};
  return {
    uniqueMedia:new Set(state.contacts.map(item=>normalizedKey(item.mediaName)).filter(Boolean)).size,
    pressContacts:state.contacts.length,contactsWithEmail:usable.length,
    aPlusReady:ready.filter(item=>item.priority==='A+').length,aReady:ready.filter(item=>item.priority==='A').length,
    pendingRevalidation:state.contacts.filter(item=>['Por verificar','Revalidar antes de envío'].includes(item.status)).length,
    organizations:countCategory('Organización'),festivals:countCategory('Festival/evento'),culture:countCategory('Cultura/institución'),
    amplifiers:countCategory('Amplificador/aliado'),distributionServices:countCategory('Servicio de distribución'),
    duplicatesMerged:Number(lastImport.duplicatesMerged || 0),recordsWithoutEmail:state.contacts.filter(item=>!validEmail(item.email)).length,
    readyContacts:ready
  };
}

function previewMasterPackage(source,file = DEFAULT_FILE) {
  const parsed=parseMasterPackage(source);
  const merged=mergeParsedPackage(read(file),parsed);
  return {...merged.report,summary:controlSummary(merged.state),parsedContacts:parsed.contacts.length,parsedEntities:parsed.entities.length};
}

function importMasterPackage(source,file = DEFAULT_FILE) {
  const parsed=parseMasterPackage(source);
  const merged=mergeParsedPackage(read(file),parsed);
  merged.state.imports.push({id:id('import'),name:'Paquete Maestro 2026-09-07',importedAt:new Date().toISOString(),report:merged.report});
  write(file,merged.state);
  return {...merged.report,summary:controlSummary(merged.state),parsedContacts:parsed.contacts.length,parsedEntities:parsed.entities.length};
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
  DEFAULT_FILE, MEDIA_TYPES, REACHES, TAGS, PRIORITIES, CONTACT_TYPES, CONTACT_STATUSES, RELEASE_STATUSES, DISTRIBUTION_STATUSES, ENTITY_CATEGORIES,
  emptyState, read, saveContact, deactivateContact, saveRelease, associateContacts, updateDistribution,
  parseMasterPackage,mergeParsedPackage,controlSummary,previewMasterPackage,importMasterPackage
};
