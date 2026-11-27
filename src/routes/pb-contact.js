const express = require('express');
const rateLimit = require('express-rate-limit');
const { renderContact, topics } = require('../views/planetaboricua/contacto');
const { isValidSubscriberEmail } = require('../services/pb-subscriber-welcome');

const pbHosts = new Set(['masboricuaqueunmofongo.com', 'www.masboricuaqueunmofongo.com']);
const trustedOrigins = new Set(Array.from(pbHosts, host => `https://${host}`));
const topicLabels = new Map(topics);
const field = value => typeof value === 'string' ? value.trim() : '';

function createContactRouter({email, sendMessage}) {
  const router = express.Router();
  const show = (res, status, state = {}) => res.status(status).send(renderContact({email,...state}));
  const limit = rateLimit({
    windowMs: 60 * 60 * 1000, limit: 5, standardHeaders: true, legacyHeaders: false,
    handler: (_req,res) => show(res,429,{error:'Has enviado varios mensajes. Intenta de nuevo más tarde o usa el correo directo.'})
  });
  router.use('/contacto', (req,res,next) => {
    if (!pbHosts.has(req.hostname)) return next('router');
    res.locals.skipAdSense = true;
    res.set('Cache-Control','no-store');
    next();
  });
  router.get('/contacto',(req,res) => show(res,200,{sent:req.query.enviado === '1'}));
  router.post('/contacto',limit,express.urlencoded({extended:false,limit:'24kb',parameterLimit:8}),async (req,res) => {
    if (!trustedOrigins.has(req.get('Origin'))) return show(res,403,{error:'Abre el formulario desde Planeta Boricua y vuelve a intentarlo.'});
    const body = req.body || {};
    if (body.website) return res.redirect(303,'/contacto?enviado=1');
    const values = {name:field(body.name),email:field(body.email),topic:field(body.topic),message:field(body.message)};
    const topic = topicLabels.get(values.topic);
    if (!values.name || values.name.length > 100 || values.email.length > 254 || /[<>,;:"\\]/.test(values.email) || !isValidSubscriberEmail(values.email) ||
        !topic || !values.message || values.message.length > 4000) {
      return show(res,400,{values,error:'Revisa el nombre, el correo, el tema y el mensaje, e inténtalo de nuevo.'});
    }
    try {
      await sendMessage({replyTo:values.email,subject:`Contacto PB · ${topic}`,text:`Nombre: ${values.name}\nCorreo: ${values.email}\nTema: ${topic}\n\n${values.message}`});
    } catch {
      return show(res,503,{values,error:'El envío falló. Intenta otra vez o escríbenos al correo directo.'});
    }
    return res.redirect(303,'/contacto?enviado=1');
  });
  return router;
}

module.exports = {createContactRouter};
