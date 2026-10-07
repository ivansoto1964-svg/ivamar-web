const fs = require('fs');
const path = require('path');

const DEFAULT_FILE = process.env.PB_WEB_VITALS_FILE || '/data/pb-web-vitals.json';
const BINS = {
  lcp:[500,1000,1500,2000,2500,3000,4000,5000,7000,10000,20000],
  inp:[50,100,150,200,300,500,750,1000,2000,5000],
  cls:[0.02,0.05,0.1,0.15,0.25,0.4,0.6,1,2]
};
const GOOD = {lcp:2500,inp:200,cls:0.1};
const POOR = {lcp:4000,inp:500,cls:0.25};

function dayKey(date = new Date()) { return date.toISOString().slice(0,10); }
function cleanPath(value) {
  const raw = String(value || '/').split('?')[0].slice(0,240);
  return raw.startsWith('/') ? raw : '/';
}
function metricValue(value, metric) {
  const number = Number(value);
  const maximum = metric === 'cls' ? 5 : 60000;
  return Number.isFinite(number) && number >= 0 && number <= maximum ? number : null;
}
function emptyMetric(metric) { return {count:0,sum:0,good:0,needs:0,poor:0,bins:BINS[metric].map(()=>0)}; }
function read(file) {
  try {
    const value = JSON.parse(fs.readFileSync(file,'utf8'));
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {days:{}};
  } catch (_) { return {days:{}}; }
}
function write(file,data) {
  fs.mkdirSync(path.dirname(file),{recursive:true});
  const temp = `${file}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(temp,JSON.stringify(data,null,2));
  fs.renameSync(temp,file);
}
function add(target,metric,value) {
  target.count += 1;
  target.sum += value;
  target[value <= GOOD[metric] ? 'good' : value <= POOR[metric] ? 'needs' : 'poor'] += 1;
  const index = BINS[metric].findIndex(limit => value <= limit);
  target.bins[index < 0 ? target.bins.length-1 : index] += 1;
}
function merge(target,source) {
  target.count += Number(source?.count)||0;
  target.sum += Number(source?.sum)||0;
  for (const rating of ['good','needs','poor']) target[rating] += Number(source?.[rating])||0;
  target.bins = target.bins.map((count,index) => count + (Number(source?.bins?.[index])||0));
}
function percentile(metric,row,ratio=.75) {
  if (!row.count) return null;
  const target = Math.ceil(row.count*ratio);
  let total = 0;
  for (let index=0; index<row.bins.length; index+=1) {
    total += row.bins[index];
    if (total >= target) return BINS[metric][index];
  }
  return BINS[metric].at(-1);
}
function createWebVitals(options={}) {
  const file = options.file || DEFAULT_FILE;
  function record(input,date=new Date()) {
    const values = Object.fromEntries(Object.keys(BINS).map(metric => [metric,metricValue(input?.[metric],metric)]));
    if (Object.values(values).every(value => value === null)) return false;
    const data = read(file); data.days ||= {};
    const key = dayKey(date); const page = cleanPath(input?.path);
    data.days[key] ||= {overall:Object.fromEntries(Object.keys(BINS).map(metric=>[metric,emptyMetric(metric)])),pages:{}};
    data.days[key].pages[page] ||= Object.fromEntries(Object.keys(BINS).map(metric=>[metric,emptyMetric(metric)]));
    for (const [metric,value] of Object.entries(values)) if (value !== null) {
      add(data.days[key].overall[metric],metric,value);
      add(data.days[key].pages[page][metric],metric,value);
    }
    const cutoff = dayKey(new Date(date.getTime()-90*86400000));
    for (const stored of Object.keys(data.days)) if (stored < cutoff) delete data.days[stored];
    write(file,data); return true;
  }
  function summary(days=30,date=new Date()) {
    const data=read(file); const cutoff=dayKey(new Date(date.getTime()-(days-1)*86400000));
    const metrics=Object.fromEntries(Object.keys(BINS).map(metric=>[metric,emptyMetric(metric)]));
    for (const [key,row] of Object.entries(data.days||{})) if (key>=cutoff) for (const metric of Object.keys(BINS)) merge(metrics[metric],row.overall?.[metric]);
    const result={days};
    for (const [metric,row] of Object.entries(metrics)) result[metric]={count:row.count,p75:percentile(metric,row),average:row.count?Number((row.sum/row.count).toFixed(metric==='cls'?3:0)):null,goodPercent:row.count?Math.round(row.good*100/row.count):null,rating:row.count?(percentile(metric,row)<=GOOD[metric]?'good':percentile(metric,row)<=POOR[metric]?'needs':'poor'):'unknown'};
    return result;
  }
  return {record,summary};
}

module.exports={createWebVitals,BINS,GOOD,POOR};
