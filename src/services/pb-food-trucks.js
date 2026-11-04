const {randomBytes, randomUUID, createHash} = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const QRCode = require('qrcode');

const base = '/crea-tu-menu';
const access = base + '/acceso';
const panel = base + '/panel';
const directory = '/donde-comer';
const cookie = 'pb_food_owner';
const palettes = {clasico:'Clásico PB', tropical:'Tropical', brasa:'Brasa', costa:'Costa'};
const networks = {instagram:['Instagram',['instagram.com']], facebook:['Facebook',['facebook.com','fb.com']], tiktok:['TikTok',['tiktok.com']], youtube:['YouTube',['youtube.com','youtu.be']]};
const categories = ['Platos','Complementos','Bebidas','Postres'];
const methods = ['Al recoger','Zelle','Enlace de pago'];
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clean = (value, size) => typeof value === 'string' ? value.trim().slice(0,size) : '';
const theme = value => typeof value === 'string' && Object.hasOwn(palettes,value) ? value : 'clasico';
const hash = value => createHash('sha256').update(value).digest('hex');
const token = () => randomBytes(32).toString('hex');
const money = cents => '$' + (cents / 100).toFixed(2);
const address = truck => truck.temporaryAddress && Date.parse(truck.temporaryUntil) > Date.now() ? truck.temporaryAddress : truck.address;

function socialUrl(value, hosts) {
  try {
    const url = new URL(value);
    if (url.protocol === 'https:' && !url.username && !url.password && !url.port && url.pathname !== '/' &&
      hosts.some(host => url.hostname === host || url.hostname.endsWith('.' + host))) return url.href;
  } catch {}
  return '';
}

function page(title, body, palette) {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} | Planeta Boricua</title><link rel="stylesheet" href="/css/pb-food-trucks.css"></head><body data-theme="${theme(palette)}"><header><a href="${directory}">Dónde Comer · PB</a><a href="${base}">Crea tu menú</a></header><main><h1>${esc(title)}</h1>${body}</main></body></html>`;
}

function field(label, name, value = '', type = 'text', required = false) {
  return `<label>${label}<input name="${name}" type="${type}" value="${esc(value)}" ${required?'required':''}></label>`;
}

const profileFields = [
  ['Dueño','owner',100],['Food truck','name',100],['Teléfono','phone',35],['WhatsApp con código de país','whatsapp',35],
  ['Estado o territorio','state',60],['Ciudad o municipio','city',80],['Dirección habitual','address',180],['Horario','hours',180],
  ['Dirección temporal','temporaryAddress',180],['Fin de la ubicación temporal (fecha y hora con zona)','temporaryUntil',40]
];

function profile(body) {
  const values = Object.fromEntries(profileFields.map(([,key,size]) => [key,clean(body[key],size)]));
  values.whatsapp = values.whatsapp.replace(/[^0-9]/g,'');
  if (profileFields.slice(0,8).some(([,key]) => !values[key]) || !/^[1-9]\d{7,14}$/.test(values.whatsapp)) return null;
  if (values.temporaryAddress && !Number.isFinite(Date.parse(values.temporaryUntil))) return null;
  values.payments = methods.filter(value => [body.payments].flat().includes(value));
  if (!values.payments.length) return null;
  values.palette = theme(body.palette);
  values.social = {};
  for (const [key,[,hosts]] of Object.entries(networks)) {
    const value = clean(body[key],500);
    if (!value) continue;
    const url = socialUrl(value,hosts);
    if (!url) return null;
    values.social[key] = url;
  }
  return values;
}

function renderMenu(truck, preview = false, palette = truck.palette) {
  const socials = Object.entries(networks).map(([key,[name,hosts]]) => {
    const url = socialUrl(truck.social?.[key],hosts);
    return url ? `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${name}</a>` : '';
  }).filter(Boolean);
  const items = truck.items.map(item => `<article class="card"><small>${esc(item.category)}</small><h2>${esc(item.name)}</h2><p>${esc(item.description)}</p><strong>${money(item.cents)}</strong> <button type="button" data-add="${item.id}" ${item.available?'':'disabled'}>${item.available?'Añadir':'Agotado'}</button></article>`).join('');
  const data = JSON.stringify({name:truck.name, whatsapp:preview?'':truck.whatsapp, items:truck.items}).replaceAll('<','\\u003c');
  return page(truck.name || 'Vista previa del menú', `<p>${esc(address(truck))} · ${esc(truck.city)}, ${esc(truck.state)}</p><p>${esc(truck.hours)}</p>${socials.length?`<nav aria-label="Redes del negocio">${socials.join('')}</nav>`:''}<div class="grid">${items || '<p>Aún no hay platos en este menú.</p>'}</div><section class="card"><h2>Tu pedido</h2><ul id="cart-lines"></ul><p id="cart-total" aria-live="polite"></p><label>Método de pago<select id="cart-payment">${(truck.payments || []).map(method=>`<option>${esc(method)}</option>`).join('')}</select></label><button id="cart-send" disabled>Preparar pedido por WhatsApp</button><p>${preview?'Vista privada del menú.':'El negocio confirma el total y el recogido.'}</p></section><script id="pb-menu-data" type="application/json">${data}</script><script src="/js/pb-food-truck-cart.js" defer></script>`,palette);
}

module.exports = function mount(app,{file,origin,sendLink,limiter,stripe,billing,rawBody}) {
  function read() {
    try { return JSON.parse(fs.readFileSync(file,'utf8')); }
    catch (error) { if(error.code==='ENOENT') return {}; throw error; }
  }
  function edit(fn) {
    const records = read();
    const result = fn(records);
    fs.mkdirSync(path.dirname(file),{recursive:true});
    const temp = file + '.' + randomUUID() + '.tmp';
    try {
      fs.writeFileSync(temp,JSON.stringify(records),{mode:0o600});
      fs.renameSync(temp,file);
    } finally { if (fs.existsSync(temp)) fs.unlinkSync(temp); }
    return result;
  }
  const privatePage = res => res.set({'Cache-Control':'no-store','Referrer-Policy':'no-referrer','X-Robots-Tag':'noindex'});
  const sameOrigin = req => req.get('origin') === origin;
  const csrf = truck => `<input type="hidden" name="csrf" value="${truck.csrf}">`;
  const update = (req,fn) => edit(records=>fn(records[req.truck.id]));
  function owner(req,res,next) {
    privatePage(res);
    const value = req.cookies[cookie];
    req.truck = typeof value==='string' && Object.values(read()).find(truck=>truck.session===hash(value) && truck.sessionUntil>Date.now());
    if (!req.truck) return res.redirect(303,access);
    if (req.method==='POST' && (!sameOrigin(req) || req.body.csrf!==req.truck.csrf)) return res.sendStatus(403);
    next();
  }

  app.get(access,(_req,res)=>privatePage(res).send(page('Crea o abre tu menú',`<form class="card" method="post">${field('Correo electrónico','email','','email',true)}<button>Enviar enlace de acceso</button></form>`)));
  app.post(access,limiter,async(req,res)=>{
    privatePage(res);
    if(!sameOrigin(req)) return res.sendStatus(403);
    const email=clean(req.body.email,254).toLowerCase();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.sendStatus(400);
    const secret=token();
    edit(records=>{
      let truck=Object.values(records).find(item=>item.email===email);
      if(!truck){const id=randomUUID();truck=records[id]={id,email,items:[]};}
      Object.assign(truck,{login:hash(secret),loginUntil:Date.now()+20*60_000});
    });
    await sendLink(email,origin+access+'/'+secret);
    res.send(page('Revisa tu correo','<p>El enlace vence en 20 minutos.</p>'));
  });
  app.get(access+'/:token',(req,res)=>{
    privatePage(res);
    if(!/^[0-9a-f]{64}$/.test(req.params.token)) return res.sendStatus(404);
    res.send(page('Confirma tu acceso','<form method="post"><button>Entrar a mi menú</button></form>'));
  });
  app.post(access+'/:token',limiter,(req,res)=>{
    privatePage(res);
    if(!sameOrigin(req)) return res.sendStatus(403);
    const session=token();
    const valid=edit(records=>{
      const truck=Object.values(records).find(item=>item.login===hash(req.params.token) && item.loginUntil>Date.now());
      if(!truck) return false;
      delete truck.login;
      Object.assign(truck,{session:hash(session),sessionUntil:Date.now()+8*3_600_000,csrf:token()});
      return true;
    });
    if(!valid) return res.status(400).send(page('Enlace vencido',`<a href="${access}">Solicitar otro</a>`));
    res.cookie(cookie,session,{httpOnly:true,sameSite:'lax',secure:origin.startsWith('https:'),path:base,maxAge:8*3_600_000});
    res.redirect(303,panel);
  });

  const billingReady=Boolean(stripe && billing.setup && billing.monthly && billing.webhook);
  const canActivate=truck=>billingReady && !truck.subscription && truck.name && truck.items.some(item=>item.available);
  app.get(panel,owner,(req,res)=>{
    const truck=req.truck;
    const colors=Object.entries(palettes).map(([key,label])=>`<label><input type="radio" name="palette" value="${key}" ${theme(truck.palette)===key?'checked':''}> ${label} <a href="${panel}/vista-previa?paleta=${key}">Vista previa</a></label>`).join('');
    const social=Object.entries(networks).map(([key,[label]])=>field(label,key,truck.social?.[key],'url')).join('');
    const payments=methods.map(value=>`<label><input type="checkbox" name="payments" value="${value}" ${truck.payments?.includes(value)?'checked':''}> ${value}</label>`).join('');
    const items=truck.items.map(item=>`<li><a href="${panel}/plato/${item.id}">${esc(item.name)}</a> · ${money(item.cents)} ${item.available?'':'· Agotado'}</li>`).join('');
    res.send(page('Administra tu menú',`<form class="card" method="post">${csrf(truck)}${profileFields.map(([label,key],i)=>field(label,key,truck[key],'text',i<8)).join('')}<fieldset><legend>Estilo de mi menú</legend>${colors}</fieldset><fieldset><legend>Redes sociales del negocio</legend>${social}</fieldset><fieldset><legend>Métodos de pago</legend>${payments}</fieldset><button>Guardar perfil</button></form><section class="card"><h2>Menú</h2><ul>${items}</ul><a href="${panel}/plato/nuevo">Añadir plato</a> · <a href="${panel}/vista-previa">Ver menú</a>${canActivate(truck)?`<form method="post" action="${panel}/activar">${csrf(truck)}<button>Activar por $49</button><p>Primeros 30 días sin mensualidad. Luego $9.99 al mes.</p></form>`:''}${billingReady && truck.customer?`<form method="post" action="${panel}/facturacion">${csrf(truck)}<button>Gestionar suscripción</button></form>`:''}${truck.active?`<p><a href="${directory}/${truck.id}">Menú público</a> · <a href="${directory}/${truck.id}/qr">Descargar QR</a></p>`:''}</section>`));
  });
  app.post(panel,owner,(req,res)=>{
    const values=profile(req.body);
    if(!values) return res.status(400).send(page('Revisa el perfil',`<p>Verifica los campos requeridos, el WhatsApp, los pagos y los enlaces HTTPS a cada red.</p><a href="${panel}">Volver</a>`));
    update(req,truck=>Object.assign(truck,values));
    res.redirect(303,panel);
  });
  app.get(panel+'/vista-previa',owner,(req,res)=>res.send(renderMenu(req.truck,true,req.query.paleta ?? req.truck.palette)));
  app.get(panel+'/plato/:id',owner,(req,res)=>{
    const item=req.params.id==='nuevo'?{}:req.truck.items.find(row=>row.id===req.params.id);
    if(!item) return res.sendStatus(404);
    res.send(page(item.id?'Editar plato':'Añadir plato',`<form class="card" method="post">${csrf(req.truck)}${field('Nombre','name',item.name,'text',true)}${field('Descripción','description',item.description)}${field('Precio en dólares','price',item.id?(item.cents/100).toFixed(2):'','text',true)}<label>Categoría<select name="category">${categories.map(value=>`<option ${item.category===value?'selected':''}>${value}</option>`).join('')}</select></label><label><input type="checkbox" name="available" ${item.available===false?'':'checked'}> Disponible</label><button>Guardar plato</button> ${item.id?'<button name="remove" value="1" formnovalidate>Eliminar plato</button>':''}</form>`));
  });
  app.post(panel+'/plato/:id',owner,(req,res)=>{
    const {id}=req.params,{category,available,remove}=req.body;
    if(id!=='nuevo' && !req.truck.items.some(row=>row.id===id)) return res.sendStatus(404);
    const name=clean(req.body.name,100),price=clean(req.body.price,12);
    if(remove!=='1' && (!name || !categories.includes(category) || !/^\d{1,5}(\.\d{1,2})?$/.test(price))) return res.sendStatus(400);
    if(id==='nuevo' && req.truck.items.length>=120) return res.sendStatus(409);
    update(req,truck=>{
      const index=truck.items.findIndex(row=>row.id===id);
      if(remove==='1'){if(index>=0) truck.items.splice(index,1);return;}
      const item={id:index<0?randomUUID():id,name,category,description:clean(req.body.description,400),cents:Math.round(Number(price)*100),available:available==='on'};
      if(index<0) truck.items.push(item);
      else truck.items[index]=item;
    });
    res.redirect(303,panel);
  });

  app.post(panel+'/activar',owner,async(req,res)=>{
    const truck=req.truck;
    if(!canActivate(truck)) return res.sendStatus(409);
    let session=truck.checkout && await stripe.checkout.sessions.retrieve(truck.checkout);
    if(session?.status==='complete') return res.status(409).send(page('Activación en proceso',`<a href="${panel}">Volver</a>`));
    if(session?.status!=='open'){
      session=await stripe.checkout.sessions.create({
        mode:'subscription',customer_email:truck.email,line_items:[{price:billing.setup,quantity:1},{price:billing.monthly,quantity:1}],
        subscription_data:{trial_period_days:30,metadata:{pbFoodTruck:truck.id}},metadata:{pbFoodTruck:truck.id},
        success_url:origin+panel,cancel_url:origin+panel
      },{idempotencyKey:'pb-food-'+truck.id+'-'+(truck.checkout || 'initial')});
      update(req,record=>{record.checkout=session.id;});
    }
    res.redirect(303,session.url);
  });
  app.post(panel+'/facturacion',owner,async(req,res)=>{
    if(!billingReady || !req.truck.customer) return res.sendStatus(409);
    const session=await stripe.billingPortal.sessions.create({customer:req.truck.customer,return_url:origin+panel});
    res.redirect(303,session.url);
  });
  app.post(base+'/stripe-webhook',rawBody,async(req,res)=>{
    if(!billingReady) return res.sendStatus(404);
    let event;
    try { event=stripe.webhooks.constructEvent(req.body,req.get('stripe-signature'),billing.webhook); }
    catch { return res.sendStatus(400); }
    const object=event.data.object,id=object.metadata?.pbFoodTruck,records=read();
    if(!id || !Object.hasOwn(records,id)) return res.sendStatus(200);
    const checkout=['checkout.session.completed','checkout.session.async_payment_succeeded'].includes(event.type);
    const subscription=['customer.subscription.updated','customer.subscription.deleted'].includes(event.type);
    if(checkout && object.payment_status==='paid' && object.subscription){
      const current=await stripe.subscriptions.retrieve(object.subscription);
      edit(list=>{
        const truck=list[id];
        if(truck.subscription && truck.subscription!==current.id) return;
        Object.assign(truck,{subscription:current.id,customer:object.customer,active:['active','trialing'].includes(current.status)});
      });
    } else if(subscription && records[id].subscription===object.id){
      const current=await stripe.subscriptions.retrieve(object.id);
      edit(list=>{if(list[id].subscription===object.id) list[id].active=['active','trialing'].includes(current.status);});
    }
    res.sendStatus(200);
  });

  app.get(directory,(req,res)=>{
    const state=clean(req.query.estado,60),city=clean(req.query.ciudad,80);
    const trucks=Object.values(read()).filter(truck=>truck.active && (!state || truck.state.toLowerCase()===state.toLowerCase()) && (!city || truck.city.toLowerCase()===city.toLowerCase()));
    trucks.sort((a,b)=>a.state.localeCompare(b.state)||a.city.localeCompare(b.city)||a.name.localeCompare(b.name));
    res.send(page('Dónde Comer',`<form method="get">${field('Estado o territorio','estado',state)}${field('Ciudad o municipio','ciudad',city)}<button>Buscar</button></form><div class="grid">${trucks.map(truck=>`<article class="card"><small>${esc(truck.city)}, ${esc(truck.state)}</small><h2><a href="${directory}/${truck.id}">${esc(truck.name)}</a></h2><p>${esc(address(truck))}</p></article>`).join('') || '<p>Todavía no hay menús para esta búsqueda.</p>'}</div>`));
  });
  app.get(directory+'/:id',(req,res)=>{
    const truck=read()[req.params.id];
    if(!truck?.active) return res.sendStatus(404);
    res.send(renderMenu(truck));
  });
  app.get(directory+'/:id/qr',async(req,res)=>{
    const truck=read()[req.params.id];
    if(!truck?.active) return res.sendStatus(404);
    res.attachment('menu-pb.png').type('png').send(await QRCode.toBuffer(origin+directory+'/'+truck.id,{width:640}));
  });
};
