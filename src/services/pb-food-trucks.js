const {randomBytes, randomUUID, createHash} = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const QRCode = require('qrcode');
const sharp = require('sharp');

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
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} | Planeta Boricua</title><link rel="stylesheet" href="/css/pb-food-trucks.css"></head><body data-theme="${theme(palette)}"><header><a href="${directory}">Dónde Comer · PB</a><a href="${base}">Crea tu menú</a></header><main><h1>${esc(title)}</h1>${body}</main><script src="/js/pb-food-menu-photo.js" defer></script></body></html>`;
}

function field(label, name, value = '', type = 'text', required = false) {
  return `<label>${label}<input name="${name}" type="${type}" value="${esc(value)}" ${name === 'price' ? 'inputmode="decimal"' : ''} ${required?'required':''}></label>`;
}

const profileFields = [
  ['Dueño','owner',100],['Food truck','name',100],['Teléfono','phone',35],['WhatsApp con código de país','whatsapp',35],
  ['Estado o territorio','state',60],['Ciudad o municipio','city',80],['Dirección habitual','address',180],['Horario','hours',180],
  ['Dirección temporal','temporaryAddress',180],['Fin de la ubicación temporal (fecha y hora con zona)','temporaryUntil',40]
];

function profile(body) {
  const values = Object.fromEntries(profileFields.map(([,key,size]) => [key,clean(body[key],size)]));
  values.whatsapp = values.whatsapp.replace(/[^0-9]/g,'');
  if (/^\d{10}$/.test(values.whatsapp)) values.whatsapp = '1' + values.whatsapp;
  if (!values.name || !values.city || !values.state || !/^[1-9]\d{7,14}$/.test(values.whatsapp)) return null;
  if (values.temporaryAddress && !Number.isFinite(Date.parse(values.temporaryUntil))) return null;
  values.payments = methods.filter(value => [body.payments].flat().includes(value));
  if (!values.payments.length) values.payments = ['Al recoger'];
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

function renderMenu(truck, preview = false, palette = truck.palette, photo = '') {
  const socials = Object.entries(networks).map(([key,[name,hosts]]) => {
    const url = socialUrl(truck.social?.[key],hosts);
    return url ? `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${name}</a>` : '';
  }).filter(Boolean);
  const items = truck.items.map(item => `<article class="card"><small>${esc(item.category)}</small><h2>${esc(item.name)}</h2><p>${esc(item.description)}</p><strong>${money(item.cents)}</strong> <button type="button" data-add="${item.id}" ${item.available?'':'disabled'}>${item.available?'Añadir':'Agotado'}</button></article>`).join('');
  const data = JSON.stringify({name:truck.name, whatsapp:preview?'':truck.whatsapp, items:truck.items}).replaceAll('<','\\u003c');
  const where = [address(truck), truck.city, truck.state].filter(Boolean).join(', ');
  const maps = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(where);
  const contact = !preview && truck.whatsapp ? `<a class="action" href="https://wa.me/${esc(truck.whatsapp)}">Escribir por WhatsApp</a>` : '';
  const menuPhoto = photo ? `<section><h2>Foto del menú</h2><a href="${photo}"><img class="menu-photo" src="${photo}" alt="Menú de ${esc(truck.name || 'este negocio')}" /></a></section>` : '';
  const cart = items ? `<div class="grid">${items}</div><section class="card"><h2>Tu pedido</h2><ul id="cart-lines"></ul><p id="cart-total" aria-live="polite"></p><label>Método de pago<select id="cart-payment">${(truck.payments || []).map(method=>`<option>${esc(method)}</option>`).join('')}</select></label><button id="cart-send" disabled>Preparar pedido por WhatsApp</button><p>${preview?'Vista privada del menú.':'El negocio confirma el total y el recogido.'}</p></section><script id="pb-menu-data" type="application/json">${data}</script><script src="/js/pb-food-truck-cart.js" defer></script>` : '';
  return page(truck.name || 'Vista previa del menú', `<p>${esc(where)}</p><p>${esc(truck.hours)}</p><nav aria-label="Contacto y ubicación">${where ? `<a href="${esc(maps)}">Ver en Google Maps</a>` : ''}${contact}${socials.join('')}</nav>${menuPhoto}${cart || (menuPhoto ? '' : '<p>Aún no hay platos en este menú.</p>')}`,palette);
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

  const photoFile = truck => path.join(file + '.photos', truck.id + '.webp');
  const hasPhoto = truck => fs.existsSync(photoFile(truck));
  const billingReady=Boolean(stripe && billing.setup && billing.monthly && billing.webhook);
  const canActivate=truck=>billingReady && !truck.subscription && truck.name && truck.city && truck.state && truck.whatsapp && (hasPhoto(truck) || truck.items.some(item=>item.available));
  function ownerPanel(truck, error = '', photoExists = hasPhoto(truck)) {
    const colors=Object.entries(palettes).map(([key,label])=>`<label><input type="radio" name="palette" value="${key}" ${theme(truck.palette)===key?'checked':''}> ${label} <a href="${panel}/vista-previa?paleta=${key}">Vista previa</a></label>`).join('');
    const social=Object.entries(networks).map(([key,[label]])=>field(label,key,truck.social?.[key],'url')).join('');
    const payments=methods.map(value=>`<label><input type="checkbox" name="payments" value="${value}" ${truck.payments?.includes(value)?'checked':''}> ${value}</label>`).join('');
    const items=truck.items.map(item=>`<li><a href="${panel}/plato/${item.id}">${esc(item.name)}</a> · ${money(item.cents)} ${item.available?'':'· Agotado'}</li>`).join('');
    const basics = profileFields.filter(([, key]) => ['name','whatsapp','city'].includes(key))
      .map(([label,key]) => field(key === 'whatsapp' ? 'WhatsApp' : label,key,truck[key],key === 'whatsapp' ? 'tel' : 'text',true)).join('');
    const details = profileFields.filter(([, key]) => !['name','whatsapp','city'].includes(key))
      .map(([label,key]) => field(label,key,key === 'state' ? truck[key] || 'Puerto Rico' : truck[key],key === 'phone' ? 'tel' : 'text')).join('');
    const status = truck.active ? `<a class="action" href="${directory}/${truck.id}">Ver mi menú público</a> <a class="action" href="${directory}/${truck.id}/qr">Descargar QR</a>`
      : canActivate(truck) ? `<form method="post" action="${panel}/activar">${csrf(truck)}<button>Activar por $49</button><p>Primeros 30 días sin mensualidad. Luego $9.99 al mes.</p></form>`
      : `<p>${truck.subscription ? 'Tu suscripción está registrada.' : !truck.name || !truck.city || !truck.whatsapp ? 'Guarda el nombre, pueblo y WhatsApp del negocio para poder activar.' : !photoExists && !truck.items.some(item => item.available) ? 'Sube una foto o guarda un plato disponible para poder activar.' : 'La activación aún no está disponible.'}</p>`;
    return page('Administra tu menú', `
      <nav aria-label="Accesos rápidos"><a href="#menu">Mi menú</a><a href="${panel}/vista-previa">Vista previa</a><a href="#ubicacion">Ubicación y redes</a></nav>
      ${error ? `<p class="notice" role="alert">${esc(error)}</p>` : ''}
      <form class="card" method="post" id="ubicacion">${csrf(truck)}<h2>Mi negocio</h2>${basics}
        <details ${error ? 'open' : ''}><summary>Horario, ubicación, redes y estilo</summary>${details}
        <fieldset><legend>Estilo de mi menú</legend>${colors}</fieldset>
        <fieldset><legend>Redes sociales</legend>${social}</fieldset>
        <fieldset><legend>Métodos de pago de los pedidos</legend>${payments}</fieldset></details>
        <button>Guardar perfil</button>
      </form>
      <section class="card" id="menu"><h2>Mi menú</h2>
        ${photoExists ? `<img class="menu-thumbnail" src="${panel}/foto" alt="Foto actual del menú">` : ''}
        <form method="post" action="${panel}/foto" data-menu-photo>${csrf(truck)}
          <label>${photoExists ? 'Reemplazar foto del menú' : 'Subir foto del menú'}<input type="file" accept="image/*" required></label>
          <p>Usa una foto de tu galería o una imagen de Canva. Si lo tienes en PDF, puedes subir una captura.</p>
          <input type="hidden" name="photo">
          <button>Guardar foto</button><p role="status" data-photo-status></p>
          <noscript>Activa JavaScript para subir una foto. También puedes añadir platos.</noscript>
        </form>
        <h3>Platos para pedidos</h3><ul>${items}</ul>
        <a class="action" href="${panel}/plato/nuevo">Añadir plato</a>
      </section>
      <section class="card"><h2>Publicar y compartir</h2>${status}
        ${billingReady && truck.customer ? `<form method="post" action="${panel}/facturacion">${csrf(truck)}<button>Gestionar suscripción</button></form>` : ''}
      </section>`);
  }

  app.get(panel,owner,(req,res)=>res.send(ownerPanel(req.truck)));
  app.post(panel,owner,(req,res)=>{
    const values=profile(req.body);
    if (!values) {
      const draft = Object.fromEntries(profileFields.map(([,key,size]) => [key, clean(req.body[key],size)]));
      draft.social = Object.fromEntries(Object.keys(networks).map(key => [key, clean(req.body[key],500)]));
      draft.payments = methods.filter(value => [req.body.payments].flat().includes(value));
      draft.palette = theme(req.body.palette);
      return res.status(400).send(ownerPanel({...req.truck,...draft}, 'Revisa el nombre, pueblo, WhatsApp y los enlaces de redes. Si pusiste una dirección temporal, verifica también la fecha de fin.'));
    }
    update(req,truck=>Object.assign(truck,values));
    res.redirect(303,panel);
  });

  function sendPhoto(truck, res) {
    if (!hasPhoto(truck)) return res.sendStatus(404);
    res.set('Cache-Control','no-store').type('webp').sendFile(path.resolve(photoFile(truck)));
  }

  app.get(panel+'/foto',owner,(req,res)=>sendPhoto(req.truck,res));
  app.post(panel+'/foto',owner,async(req,res)=>{
    const encoded = clean(req.body.photo, 2_000_001);
    if (!encoded || encoded.length > 2_000_000 || !/^[A-Za-z0-9+/]+={0,2}$/.test(encoded)) {
      return res.status(400).send(ownerPanel(req.truck, 'Escoge una imagen más pequeña y vuelve a subirla.'));
    }
    let image;
    try {
      const source = sharp(Buffer.from(encoded,'base64'), {limitInputPixels:6_000_000});
      const {format} = await source.metadata();
      if (!['jpeg','png','webp'].includes(format)) throw new Error('Formato no admitido');
      image = await source.rotate().resize({width:1800,height:2200,fit:'inside',withoutEnlargement:true}).webp({quality:86}).toBuffer();
    } catch {
      return res.status(400).send(ownerPanel(req.truck, 'No pudimos abrir la imagen. Prueba con una foto o captura JPG, PNG o WebP.'));
    }
    const target = photoFile(req.truck);
    const temporary = target + '.' + randomUUID() + '.tmp';
    await fs.promises.mkdir(path.dirname(target), {recursive:true});
    try {
      await fs.promises.writeFile(temporary,image,{mode:0o600});
      await fs.promises.rename(temporary,target);
    } finally {
      await fs.promises.rm(temporary,{force:true});
    }
    res.redirect(303,panel+'#menu');
  });
  app.get(panel+'/vista-previa',owner,(req,res)=>res.send(renderMenu(req.truck,true,req.query.paleta ?? req.truck.palette,hasPhoto(req.truck) ? panel+'/foto' : '')));
  app.get(panel+'/plato/:id',owner,(req,res)=>{
    const item=req.params.id==='nuevo'?{}:req.truck.items.find(row=>row.id===req.params.id);
    if(!item) return res.sendStatus(404);
    res.send(page(item.id?'Editar plato':'Añadir plato',`<form class="card" method="post">${csrf(req.truck)}${field('Nombre','name',item.name,'text',true)}${field('Descripción','description',item.description)}${field('Precio en dólares','price',item.id?(item.cents/100).toFixed(2):'','text',true)}<label>Categoría<select name="category">${categories.map(value=>`<option ${item.category===value?'selected':''}>${value}</option>`).join('')}</select></label><label><input type="checkbox" name="available" ${item.available===false?'':'checked'}> Disponible</label><button>Guardar plato</button> <button name="next" value="1">Guardar y añadir otro</button> ${item.id?'<button name="remove" value="1" formnovalidate>Eliminar plato</button>':''}</form>`));
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
    res.redirect(303,req.body.next === '1' ? panel+'/plato/nuevo' : panel+'#menu');
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
    res.send(renderMenu(truck,false,truck.palette,hasPhoto(truck) ? directory+'/'+truck.id+'/foto' : ''));
  });
  app.get(directory+'/:id/foto',(req,res)=>{
    const truck=read()[req.params.id];
    if (!truck?.active) return res.sendStatus(404);
    sendPhoto(truck,res);
  });
  app.get(directory+'/:id/qr',async(req,res)=>{
    const truck=read()[req.params.id];
    if(!truck?.active) return res.sendStatus(404);
    res.attachment('menu-pb.png').type('png').send(await QRCode.toBuffer(origin+directory+'/'+truck.id,{width:640}));
  });
};
