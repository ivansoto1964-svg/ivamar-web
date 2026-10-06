const fs = require('fs');
const path = require('path');

const DEFAULT_FILE = process.env.PB_ARTISAN_METRICS_FILE || '/data/pb-artisan-metrics.json';
const EVENTS = new Set(['view','whatsapp','website','instagram','facebook','tiktok','pinterest','store','share','event','edit','qr','install']);
const RETENTION_DAYS = 400;

function dateKey(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {timeZone:'America/Puerto_Rico',year:'numeric',month:'2-digit',day:'2-digit'}).format(date);
}

function shiftDay(key, amount) {
  const [year, month, day] = String(key).split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day + amount)).toISOString().slice(0,10);
}

function read(file = DEFAULT_FILE) {
  try {
    const data = JSON.parse(fs.readFileSync(file,'utf8'));
    return data && typeof data === 'object' && !Array.isArray(data) ? data : {};
  } catch (_) { return {}; }
}

function write(file, data) {
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir,{recursive:true});
  const temp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(temp,JSON.stringify(data,null,2),'utf8');
  fs.renameSync(temp,file);
}

function period(entry, endKey, length) {
  const totals = {views:0,clicks:{}};
  for (let index=0; index<length; index+=1) {
    const day = entry.daily?.[shiftDay(endKey,-index)] || {};
    totals.views += Number(day.views) || 0;
    Object.entries(day.clicks || {}).forEach(([event,count]) => {
      totals.clicks[event] = (totals.clicks[event] || 0) + (Number(count) || 0);
    });
  }
  totals.clickTotal = Object.values(totals.clicks).reduce((sum,value)=>sum+(Number(value)||0),0);
  return totals;
}

function record(slug, event, {file=DEFAULT_FILE,date=new Date()}={}) {
  const safeSlug = String(slug || '').toLowerCase();
  const safeEvent = String(event || '').toLowerCase();
  if (!/^[a-z0-9][a-z0-9-]{0,159}$/.test(safeSlug) || !EVENTS.has(safeEvent)) return false;
  const data = read(file);
  const entry = data[safeSlug] && typeof data[safeSlug] === 'object' ? data[safeSlug] : {views:0,clicks:{},daily:{}};
  entry.views = Number(entry.views) || 0;
  entry.clicks = entry.clicks && typeof entry.clicks === 'object' && !Array.isArray(entry.clicks) ? entry.clicks : {};
  entry.daily = entry.daily && typeof entry.daily === 'object' && !Array.isArray(entry.daily) ? entry.daily : {};
  const key = dateKey(date);
  const day = entry.daily[key] && typeof entry.daily[key] === 'object' ? entry.daily[key] : {views:0,clicks:{}};
  day.views = Number(day.views) || 0;
  day.clicks = day.clicks && typeof day.clicks === 'object' && !Array.isArray(day.clicks) ? day.clicks : {};
  if (safeEvent === 'view') { entry.views += 1; day.views += 1; }
  else {
    entry.clicks[safeEvent] = (Number(entry.clicks[safeEvent]) || 0) + 1;
    day.clicks[safeEvent] = (Number(day.clicks[safeEvent]) || 0) + 1;
  }
  entry.daily[key] = day;
  const oldest = shiftDay(key,-(RETENTION_DAYS-1));
  Object.keys(entry.daily).forEach(storedKey=>{ if(storedKey<oldest) delete entry.daily[storedKey]; });
  entry.lastActivity = date.toISOString();
  data[safeSlug] = entry;
  write(file,data);
  return true;
}

function summary(artisans, slugger, {file=DEFAULT_FILE,date=new Date()}={}) {
  const data = read(file);
  const endKey = dateKey(date);
  return (Array.isArray(artisans)?artisans:[]).map(item=>{
    const slug = slugger(item);
    const entry = data[slug] || {};
    const clicks = entry.clicks && typeof entry.clicks === 'object' ? entry.clicks : {};
    const clickTotal = Object.values(clicks).reduce((sum,value)=>sum+(Number(value)||0),0);
    return {slug,name:item.name||'Artesano/a',views:Number(entry.views)||0,clickTotal,clicks,last7:period(entry,endKey,7),last30:period(entry,endKey,30),last90:period(entry,endKey,90),lastActivity:entry.lastActivity||null};
  }).sort((a,b)=>(b.views+b.clickTotal)-(a.views+a.clickTotal)||String(a.name).localeCompare(String(b.name),'es'));
}

module.exports = {DEFAULT_FILE,EVENTS,dateKey,read,record,summary};
