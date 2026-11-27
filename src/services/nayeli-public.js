const express = require('express');
const rateLimit = require('express-rate-limit');
const fs = require('node:fs');
const path = require('node:path');
const {dayKey} = require('./nayeli-usage');
const {MAX_MESSAGE_CHARS,safeHistory} = require('./nayeli-openai');

const ENDPOINT = '/api/pb-nayeli';
const hosts = new Set(['www.masboricuaqueunmofongo.com','masboricuaqueunmofongo.com']);

function enabled(env = process.env) {
  return env.NAYELI_PUBLIC_ENABLED === 'true' && Boolean(env.OPENAI_API_KEY?.trim());
}

// Render serves PB from one instance with a persistent disk. Reserve the request
// before calling a provider, so simultaneous visits and provider failures count.
function reserve(file,maps,date = new Date()) {
  const day = dayKey(date);
  let totals;
  try {
    totals = JSON.parse(fs.readFileSync(file,'utf8'));
  } catch (error) {
    if (error.code!=='ENOENT') throw error;
  }
  if (!totals || totals.day!==day) totals = {day,requests:0,maps:0};
  if (!Number.isInteger(totals.requests) || !Number.isInteger(totals.maps)) throw new Error('Invalid public Nayeli quota data');
  if (totals.requests>=120 || (maps && totals.maps>=30)) return false;
  totals.requests += 1;
  if (maps) totals.maps += 1;
  fs.mkdirSync(path.dirname(file),{recursive:true});
  fs.writeFileSync(file+'.tmp',JSON.stringify(totals),{mode:0o600});
  fs.renameSync(file+'.tmp',file);
  return true;
}

function router({answer,parseRoute,env = process.env,file = '/data/pb-nayeli-public-usage.json'}){
  const r = express.Router();
  const limits = rateLimit({
    windowMs:15*60*1000,limit:8,standardHeaders:'draft-7',legacyHeaders:false,
    message:{ok:false,error:'Llegaste al límite de preguntas. Vuelve a intentarlo en unos minutos.'}
  });
  r.post(ENDPOINT,(req,res,next)=>{
    res.set('Cache-Control','no-store');
    if (!enabled(env) || !hosts.has(req.hostname)) return res.status(404).json({ok:false,error:'Nayeli está fuera de servicio por el momento.'});
    if (req.get('origin')!=='https://'+req.hostname) return res.status(403).json({ok:false,error:'Abre Nayeli desde Planeta Boricua.'});
    if (!req.is('application/json')) return res.status(415).json({ok:false,error:'La consulta debe enviarse desde el chat.'});
    next();
  },limits,express.json({limit:'12kb'}),async (req,res)=>{
    const message = typeof req.body?.message==='string' ? req.body.message.trim() : '';
    if (!message || message.length>MAX_MESSAGE_CHARS) return res.status(400).json({ok:false,error:'Escribe una pregunta de hasta 1,200 caracteres.'});
    const trip = parseRoute(message);
    try {
      if (!reserve(file,Boolean(trip))) return res.status(429).json({ok:false,error:trip?'Por hoy se agotaron las consultas de ruta. Puedes buscar en Google Maps.':'Por hoy se agotaron las consultas de Nayeli. Volvemos mañana.'});
      const history = safeHistory(req.body?.history);
      const {reply,links,allowedPaths,mapSource} = await answer({message,history,trip,publicBeta:true});
      if (!reply) throw new Error('empty reply');
      res.json({ok:true,reply,links,allowedPaths,mapSource});
    } catch (_) {
      res.status(502).json({ok:false,error:'No pude contestar ahora mismo. Intenta de nuevo en un ratito.'});
    }
  });
  r.use(ENDPOINT,(error,_req,res,next)=>{
    if (error.type==='entity.too.large' || error.type==='entity.parse.failed') {
      return res.status(error.status).json({ok:false,error:'La consulta está incompleta o es demasiado larga.'});
    }
    next(error);
  });
  return r;
}

module.exports = {enabled,router,ENDPOINT};
