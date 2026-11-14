const express = require('express');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const Stripe = require('stripe');
const path = require('node:path');
const os = require('node:os');
const {timingSafeEqual} = require('node:crypto');
const mountFoodTrucks = require('../src/services/pb-food-trucks');
const renderLanding = require('../src/views/planetaboricua/crea-tu-menu');

const app = express();
const origin = process.env.RENDER_EXTERNAL_URL || 'http://localhost:4000';
const key = process.env.PB_FOOD_TEST_STRIPE_KEY || '';
const accessCode = process.env.PB_FOOD_PREVIEW_ACCESS || '';
if (key && !/^(sk_test|rk_test|rkcs_test)_/.test(key)) throw new Error('El servicio exige una clave de Stripe de pruebas.');
const stripe = key ? Stripe(key) : null;
const billing = {
  setup:process.env.PB_FOOD_SETUP_PRICE,
  monthly:process.env.PB_FOOD_MONTHLY_PRICE,
  webhook:process.env.PB_FOOD_STRIPE_WEBHOOK_SECRET
};
const accessLinks = new Map();
app.set('trust proxy',1);
app.use((_req,res,next)=>{
  res.set('X-Robots-Tag','noindex, nofollow');
  next();
});
app.use(cookieParser());
app.use(express.urlencoded({extended:true,limit:'15mb'}));
app.use(express.static(path.resolve(__dirname,'../public')));
app.get('/health',(_req,res)=>res.json({ok:true,stripeTestConfigured:Boolean(stripe && billing.setup && billing.monthly && billing.webhook)}));
app.get('/',(_req,res)=>res.redirect('/crea-tu-menu'));
app.get('/crea-tu-menu',(_req,res)=>res.send(renderLanding()));
app.get('/crea-tu-menu/en',(_req,res)=>res.send(renderLanding('en')));
const limiter = rateLimit({windowMs:60_000,limit:20});
app.post('/qa/enlace',limiter,(req,res)=>{
  const candidate = typeof req.body.code === 'string' ? req.body.code : '';
  if (!accessCode || candidate.length !== accessCode.length ||
      Buffer.byteLength(candidate) !== Buffer.byteLength(accessCode) ||
      !timingSafeEqual(Buffer.from(candidate),Buffer.from(accessCode))) return res.sendStatus(403);
  const email = req.body.email;
  const record = accessLinks.get(email);
  if (!record || record.expires < Date.now()) return res.sendStatus(404);
  accessLinks.delete(email);
  res.set('Cache-Control','no-store').json({link:record.link});
});
mountFoodTrucks(app,{
  file:path.join(os.tmpdir(),'pb-food-preview','trucks.json'),
  origin, stripe, billing, limiter,
  rawBody:express.raw({type:'application/json',limit:'256kb'}),
  async sendLink(email,link) {
    for (const [address,record] of accessLinks) if (record.expires < Date.now()) accessLinks.delete(address);
    accessLinks.set(email,{link,expires:Date.now()+20*60_000});
  }
});
app.listen(process.env.PORT || 4000,'0.0.0.0');
