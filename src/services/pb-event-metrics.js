const fs = require('fs');
const path = require('path');

const DEFAULT_FILE = process.env.PB_EVENT_METRICS_FILE || '/data/pb-event-metrics.json';
const ACTIONS = new Set(['view', 'share', 'whatsapp', 'facebook', 'copy', 'calendar', 'google-calendar', 'directions', 'official']);
const RETENTION_DAYS = 400;

function dateKey(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA',{timeZone:'America/Puerto_Rico',year:'numeric',month:'2-digit',day:'2-digit'}).format(date);
}

function shiftDay(key, amount) {
  const [year,month,day] = String(key).split('-').map(Number);
  return new Date(Date.UTC(year,month-1,day+amount)).toISOString().slice(0,10);
}

function period(entry,endKey,length) {
  const totals={views:0,actions:{}};
  for(let index=0;index<length;index+=1){
    const day=entry.daily?.[shiftDay(endKey,-index)]||{};
    totals.views+=Number(day.views)||0;
    Object.entries(day.actions||{}).forEach(([action,count])=>{totals.actions[action]=(totals.actions[action]||0)+(Number(count)||0);});
  }
  totals.actionTotal=Object.values(totals.actions).reduce((sum,value)=>sum+(Number(value)||0),0);
  return totals;
}

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
    : { views:0, actions:{}, daily:{} };
  entry.views = Number(entry.views) || 0;
  entry.actions = entry.actions && typeof entry.actions === 'object' && !Array.isArray(entry.actions) ? entry.actions : {};
  entry.daily = entry.daily && typeof entry.daily === 'object' && !Array.isArray(entry.daily) ? entry.daily : {};
  const key=dateKey(date);
  const day=entry.daily[key]&&typeof entry.daily[key]==='object'?entry.daily[key]:{views:0,actions:{}};
  day.views=Number(day.views)||0;
  day.actions=day.actions&&typeof day.actions==='object'&&!Array.isArray(day.actions)?day.actions:{};
  if(safeAction==='view'){entry.views+=1;day.views+=1;}
  else{entry.actions[safeAction]=(Number(entry.actions[safeAction])||0)+1;day.actions[safeAction]=(Number(day.actions[safeAction])||0)+1;}
  entry.daily[key]=day;
  const oldest=shiftDay(key,-(RETENTION_DAYS-1));
  Object.keys(entry.daily).forEach(storedKey=>{if(storedKey<oldest)delete entry.daily[storedKey];});
  entry.lastActivity = date.toISOString();
  data[safeSlug] = entry;
  write(file, data);
  return true;
}

function summary(events, slugger, { file = DEFAULT_FILE, date = new Date() } = {}) {
  const data = read(file);
  const endKey=dateKey(date);
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
        last7:period(entry,endKey,7),
        last30:period(entry,endKey,30),
        last90:period(entry,endKey,90),
        lastActivity:entry.lastActivity || null
      }
    };
  });
}

module.exports = { DEFAULT_FILE, ACTIONS, dateKey, read, record, summary };
