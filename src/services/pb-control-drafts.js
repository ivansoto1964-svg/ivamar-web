const fs = require('fs');
const path = require('path');

const FILE = process.env.PB_CONTROL_DRAFTS_FILE || '/data/pb-control-drafts.json';
const FIELD_LIMITS = {
  blog: {
    originalSlug:120, title:180, slug:120, category:100, dateISO:10, tags:300,
    excerpt:400, content:60000, image:1000, seoTitle:70, metaDescription:150
  },
  latest: {
    editingId:120, title:180, summary:400, body:12000,
    sourceLabel:100, sourceUrl:2000, image:1000
  }
};

function validKey(key) {
  return /^(blog|latest):(new|[a-zA-Z0-9][a-zA-Z0-9-]{0,159})$/.test(String(key || ''));
}

function readAll() {
  try {
    const stored = JSON.parse(fs.readFileSync(FILE, 'utf8'));
    return stored && typeof stored === 'object' && !Array.isArray(stored) ? stored : {};
  } catch (_) {
    return {};
  }
}

function writeAll(drafts) {
  fs.mkdirSync(path.dirname(FILE), { recursive:true });
  const temporary = `${FILE}.${process.pid}.tmp`;
  fs.writeFileSync(temporary, JSON.stringify(drafts, null, 2));
  fs.renameSync(temporary, FILE);
}

function cleanValues(key, input) {
  const type = String(key).split(':', 1)[0];
  const limits = FIELD_LIMITS[type] || {};
  const source = input && typeof input === 'object' && !Array.isArray(input) ? input : {};
  return Object.fromEntries(Object.entries(limits).map(([field, limit]) => [
    field,
    String(source[field] ?? '').slice(0, limit)
  ]));
}

function get(key) {
  if (!validKey(key)) return null;
  const draft = readAll()[key];
  if (!draft || typeof draft !== 'object') return null;
  return { savedAt:String(draft.savedAt || ''), values:cleanValues(key, draft.values) };
}

function save(key, values, now = new Date().toISOString()) {
  if (!validKey(key)) throw new Error('El borrador no es válido.');
  const drafts = readAll();
  const draft = { savedAt:now, values:cleanValues(key, values) };
  drafts[key] = draft;
  writeAll(drafts);
  return draft;
}

function remove(key) {
  if (!validKey(key)) return false;
  const drafts = readAll();
  if (!Object.prototype.hasOwnProperty.call(drafts, key)) return false;
  delete drafts[key];
  writeAll(drafts);
  return true;
}

module.exports = { validKey, get, save, remove, cleanValues };
