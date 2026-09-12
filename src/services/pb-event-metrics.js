const fs = require('fs');
const path = require('path');

const DEFAULT_FILE = process.env.PB_EVENT_METRICS_FILE || '/data/pb-event-metrics.json';
const ACTIONS = new Set(['view', 'share', 'whatsapp', 'facebook', 'copy', 'calendar', 'google-calendar', 'directions', 'official']);

function read(file = DEFAULT_FILE) {
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    return data && typeof data === 'object' && !Array.isArray(data) ? data : {};
  } catch (_) {
    return {};
  }
}

function write(file, data) {
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive:true });
  const temp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(temp, JSON.stringify(data, null, 2), 'utf8');
  fs.renameSync(temp, file);
}

function record(slug, action, { file = DEFAULT_FILE, date = new Date() } = {}) {
  const safeSlug = String(slug || '').toLowerCase();
  const safeAction = String(action || '').toLowerCase();
  if (!/^[a-z0-9][a-z0-9-]{0,139}$/.test(safeSlug) || !ACTIONS.has(safeAction)) return false;
  const data = read(file);
  const entry = data[safeSlug] && typeof data[safeSlug] === 'object'
    ? data[safeSlug]
    : { views:0, actions:{} };
  entry.views = Number(entry.views) || 0;
  entry.actions = entry.actions && typeof entry.actions === 'object' && !Array.isArray(entry.actions) ? entry.actions : {};
  if (safeAction === 'view') entry.views += 1;
  else entry.actions[safeAction] = (Number(entry.actions[safeAction]) || 0) + 1;
  entry.lastActivity = date.toISOString();
  data[safeSlug] = entry;
  write(file, data);
  return true;
}

function summary(events, slugger, { file = DEFAULT_FILE } = {}) {
  const data = read(file);
  return (Array.isArray(events) ? events : []).map(event => {
    const slug = slugger(event);
    const entry = data[slug] || {};
    const actions = entry.actions && typeof entry.actions === 'object' ? entry.actions : {};
    return {
      ...event,
      eventSlug:slug,
      metrics:{
        views:Number(entry.views) || 0,
        actions,
        actionTotal:Object.values(actions).reduce((total, value) => total + (Number(value) || 0), 0),
        lastActivity:entry.lastActivity || null
      }
    };
  });
}

module.exports = { DEFAULT_FILE, ACTIONS, read, record, summary };
