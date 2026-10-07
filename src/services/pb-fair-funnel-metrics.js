const fs = require('fs');
const path = require('path');

const DEFAULT_FILE = process.env.PB_FAIR_FUNNEL_METRICS_FILE || '/data/pb-fair-funnel-metrics.json';
const ACTIONS = new Set(['view','search','profile','contact']);
const RETENTION_DAYS = 400;

function dateKey(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA',{timeZone:'America/Puerto_Rico',year:'numeric',month:'2-digit',day:'2-digit'}).format(date);
}
function shiftDay(key, amount) {
  const [year,month,day] = String(key).split('-').map(Number);
  return new Date(Date.UTC(year,month-1,day+amount)).toISOString().slice(0,10);
}
function emptyCounts() {
  return {views:0,searches:0,searchesWithResults:0,zeroResultSearches:0,profiles:0,contacts:0};
}
function normalizeCounts(value) {
  const counts=emptyCounts();
  Object.keys(counts).forEach(key=>{counts[key]=Number(value?.[key])||0;});
  return counts;
}
function read(file=DEFAULT_FILE) {
  try {
    const data=JSON.parse(fs.readFileSync(file,'utf8'));
    return data&&typeof data==='object'&&!Array.isArray(data)?data:{totals:emptyCounts(),daily:{}};
  } catch(_){return {totals:emptyCounts(),daily:{}};}
}
function write(file,data) {
  const directory=path.dirname(file);
  if(!fs.existsSync(directory))fs.mkdirSync(directory,{recursive:true});
  const temporary=`${file}.${process.pid}.tmp`;
  fs.writeFileSync(temporary,JSON.stringify(data,null,2),'utf8');
  fs.renameSync(temporary,file);
}
function increment(counts,action,resultCount) {
  if(action==='view')counts.views+=1;
  if(action==='profile')counts.profiles+=1;
  if(action==='contact')counts.contacts+=1;
  if(action==='search'){
    counts.searches+=1;
    if((Number(resultCount)||0)>0)counts.searchesWithResults+=1;
    else counts.zeroResultSearches+=1;
  }
}
function record(action,{resultCount=0,file=DEFAULT_FILE,date=new Date()}={}) {
  const safeAction=String(action||'').toLowerCase();
  if(!ACTIONS.has(safeAction))return false;
  const data=read(file);
  data.totals=normalizeCounts(data.totals);
  data.daily=data.daily&&typeof data.daily==='object'&&!Array.isArray(data.daily)?data.daily:{};
  const key=dateKey(date),day=normalizeCounts(data.daily[key]);
  increment(data.totals,safeAction,resultCount);
  increment(day,safeAction,resultCount);
  data.daily[key]=day;
  const oldest=shiftDay(key,-(RETENTION_DAYS-1));
  Object.keys(data.daily).forEach(storedKey=>{if(storedKey<oldest)delete data.daily[storedKey];});
  data.lastActivity=date.toISOString();
  write(file,data);
  return true;
}
function withRates(value) {
  const counts=normalizeCounts(value);
  return {...counts,
    searchSuccessRate:counts.searches?Math.round(counts.searchesWithResults/counts.searches*1000)/10:0,
    profileRate:counts.views?Math.round(counts.profiles/counts.views*1000)/10:0,
    contactRate:counts.profiles?Math.round(counts.contacts/counts.profiles*1000)/10:0
  };
}
function period(data,endKey,length) {
  const counts=emptyCounts();
  for(let index=0;index<length;index+=1){
    const day=normalizeCounts(data.daily?.[shiftDay(endKey,-index)]);
    Object.keys(counts).forEach(key=>{counts[key]+=day[key];});
  }
  return withRates(counts);
}
function summary({file=DEFAULT_FILE,date=new Date()}={}) {
  const data=read(file),endKey=dateKey(date);
  return {total:withRates(data.totals),last7:period(data,endKey,7),last30:period(data,endKey,30),last90:period(data,endKey,90),lastActivity:data.lastActivity||null};
}

module.exports={DEFAULT_FILE,ACTIONS,dateKey,read,record,summary};
