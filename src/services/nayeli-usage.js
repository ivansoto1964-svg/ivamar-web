const fs = require('fs');
const path = require('path');

const DEFAULT_FILE = path.join(__dirname,'../../data/pb-nayeli-usage.json');
const DEFAULT_DAILY_LIMIT = 25;

function dayKey(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA',{timeZone:'America/Puerto_Rico',year:'numeric',month:'2-digit',day:'2-digit'}).format(date);
}

function dailyLimit(env = process.env) {
  const parsed = Number.parseInt(env.NAYELI_DAILY_LIMIT,10);
  return Number.isFinite(parsed) ? Math.min(200,Math.max(1,parsed)) : DEFAULT_DAILY_LIMIT;
}

function read(file = DEFAULT_FILE) {
  try {
    const value = JSON.parse(fs.readFileSync(file,'utf8'));
    return value && value.days && typeof value.days === 'object' ? value : {version:1,days:{}};
  } catch (_) {
    return {version:1,days:{}};
  }
}

function write(value,file = DEFAULT_FILE) {
  fs.mkdirSync(path.dirname(file),{recursive:true});
  const temporary = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(temporary,JSON.stringify(value,null,2));
  fs.renameSync(temporary,file);
}

function measuredTokens(usage = {}) {
  const input = Number(usage.input_tokens ?? usage.inputTokens) || 0;
  const output = Number(usage.output_tokens ?? usage.outputTokens) || 0;
  return {input,output,total:Number(usage.total_tokens ?? usage.totalTokens) || input + output};
}

function summary({file = DEFAULT_FILE,env = process.env,date = new Date()} = {}) {
  const key = dayKey(date);
  const item = read(file).days[key] || {};
  const requests = Number(item.requests) || 0;
  const limit = dailyLimit(env);
  return {date:key,requests,successes:Number(item.successes)||0,errors:Number(item.errors)||0,inputTokens:Number(item.inputTokens)||0,outputTokens:Number(item.outputTokens)||0,totalTokens:Number(item.totalTokens)||0,limit,remaining:Math.max(0,limit-requests),allowed:requests < limit};
}

function record({ok,usage,mode,file = DEFAULT_FILE,date = new Date(),env = process.env}) {
  const value = read(file);
  const key = dayKey(date);
  const item = value.days[key] || {requests:0,successes:0,errors:0,inputTokens:0,outputTokens:0,totalTokens:0,modes:{}};
  const tokens = measuredTokens(usage);
  item.requests += 1;
  item.successes += ok ? 1 : 0;
  item.errors += ok ? 0 : 1;
  item.inputTokens += tokens.input;
  item.outputTokens += tokens.output;
  item.totalTokens += tokens.total;
  const safeMode = ['general','profile','product','promotion'].includes(mode) ? mode : 'general';
  item.modes[safeMode] = (Number(item.modes[safeMode]) || 0) + 1;
  value.days[key] = item;
  value.days = Object.fromEntries(Object.keys(value.days).sort().slice(-45).map(day => [day,value.days[day]]));
  write(value,file);
  return summary({file,env,date});
}

module.exports = { summary, record, dailyLimit, dayKey, measuredTokens, DEFAULT_DAILY_LIMIT };
