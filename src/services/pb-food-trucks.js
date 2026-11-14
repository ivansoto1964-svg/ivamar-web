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
const stripeId = value => typeof value === 'string' ? value : value?.id;
const invoiceSubscription = invoice => stripeId(invoice.parent?.subscription_details?.subscription || invoice.subscription);
const money = cents => '$' + (cents / 100).toFixed(2);
const address = truck => truck.temporaryAddress && Date.parse(truck.temporaryUntil) > Date.now() ? truck.temporaryAddress : truck.address;

const collator = new Intl.Collator('es', {sensitivity:'base'});
const locationKey = value => String(value ?? '').normalize('NFD').replace(/\p{M}/gu,'')
  .toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const puertoRico = new Set(['puerto rico','pr','p r','estado libre asociado de puerto rico']);
const stateNames = new Map(Object.entries({
  AL:'Alabama', AK:'Alaska', AZ:'Arizona', AR:'Arkansas', CA:'California', CO:'Colorado',
  CT:'Connecticut', DE:'Delaware', DC:'Washington D. C.', FL:'Florida', GA:'Georgia', HI:'Hawái',
  ID:'Idaho', IL:'Illinois', IN:'Indiana', IA:'Iowa', KS:'Kansas', KY:'Kentucky', LA:'Luisiana',
  ME:'Maine', MD:'Maryland', MA:'Massachusetts', MI:'Michigan', MN:'Minnesota', MS:'Misisipi',
  MO:'Misuri', MT:'Montana', NE:'Nebraska', NV:'Nevada', NH:'New Hampshire', NJ:'Nueva Jersey',
  NM:'Nuevo México', NY:'Nueva York', NC:'Carolina del Norte', ND:'Dakota del Norte', OH:'Ohio',
  OK:'Oklahoma', OR:'Oregón', PA:'Pensilvania', RI:'Rhode Island', SC:'Carolina del Sur',
  SD:'Dakota del Sur', TN:'Tennessee', TX:'Texas', UT:'Utah', VT:'Vermont', VA:'Virginia',
  WA:'Washington', WV:'Virginia Occidental', WI:'Wisconsin', WY:'Wyoming'
}).flatMap(([code,name])=>[[locationKey(code),name],[locationKey(name),name]]));
Object.entries({
  hawaii:'Hawái', louisiana:'Luisiana', mississippi:'Misisipi', missouri:'Misuri',
  'new jersey':'Nueva Jersey','new mexico':'Nuevo México','new york':'Nueva York',
  'north carolina':'Carolina del Norte','north dakota':'Dakota del Norte',
  pennsylvania:'Pensilvania','south carolina':'Carolina del Sur','south dakota':'Dakota del Sur',
  'west virginia':'Virginia Occidental','washington dc':'Washington D. C.','district of columbia':'Washington D. C.'
}).forEach(([key,name])=>stateNames.set(key,name));

function directoryUrl(filters = {}) {
  const query = new URLSearchParams(filters).toString();
  return esc(query ? directory + '?' + query : directory);
}

const menuPath = truck => directory+'/'+encodeURIComponent(truck.id);
const specialPath = (truck,special) => menuPath(truck)+'/especial/'+special.id;

const specialPeriods = {
  hoy: {label:'Especial de hoy', days:1},
  semana: {label:'Especial de la semana', days:7}
};

function currentSpecial(truck) {
  return truck.special && (truck.special.expiresAt === null || truck.special.expiresAt > Date.now()) ? truck.special : null;
}

function startSpecial(truck) {
  if (truck.active && truck.special?.expiresAt === null) {
    truck.special.expiresAt = Date.now()+specialPeriods[truck.special.period].days*86_400_000;
  }
}

function kitchenStatus(truck) {
  const closed = truck.ordersPaused;
  return `<p class="kitchen-status ${closed ? 'kitchen-closed' : 'kitchen-open'}"><strong>${closed ? 'Cocina cerrada' : 'Cocina abierta'}</strong>${closed ? ' · Por ahora no estamos tomando pedidos nuevos.' : ''}</p>`;
}

function renderSpecial(special) {
  return `<section class="card special-card"><p class="special-label">${specialPeriods[special.period].label}</p>
    <h2>${esc(special.title)}</h2>
    ${special.description ? `<p class="special-description">${esc(special.description)}</p>` : ''}
    ${special.price ? `<p><strong>${esc(special.price)}</strong></p>` : ''}
  </section>`;
}

function renderDirectory(trucks, query) {
  const requestedRegion = clean(query.region,10);
  const requestedState = locationKey(clean(query.estado,60));
  const requestedCity = clean(query.ciudad,80);
  const cityFilter = locationKey(requestedCity);
  const stateFilter = puertoRico.has(requestedState) ? 'Puerto Rico' : stateNames.get(requestedState);
  const region = ['pr','usa'].includes(requestedRegion) ? requestedRegion
    : stateFilter === 'Puerto Rico' ? 'pr' : stateFilter ? 'usa' : '';
  const groups = new Map();
  for (const truck of trucks) {
    const key = locationKey(truck.state);
    const state = puertoRico.has(key) ? 'Puerto Rico' : stateNames.get(key);
    const city = clean(truck.city,80);
    if (!truck.active || !state || !city) continue;
    if (region && (region === 'pr') !== (state === 'Puerto Rico')) continue;
    if (requestedState && state !== stateFilter) continue;
    if (cityFilter && locationKey(city) !== cityFilter) continue;

    if (!groups.has(state)) groups.set(state,new Map());
    const places = groups.get(state);
    const cityKey = locationKey(city);
    if (!places.has(cityKey)) places.set(cityKey,{name:city,trucks:[]});
    places.get(cityKey).trucks.push(truck);
  }

  const sections = [...groups].sort(([a],[b])=>collator.compare(a,b)).map(([state,places])=>{
    const isIsland = state === 'Puerto Rico';
    const stateLink = directoryUrl(isIsland ? {region:'pr'} : {region:'usa',estado:state});
    const cities = [...places.values()].sort((a,b)=>collator.compare(a.name,b.name));
    return `<section class="directory-region"><h2><a href="${stateLink}">${esc(state)}</a></h2>
      <div class="grid">${cities.map(({name,trucks})=>{
        const filters = isIsland ? {region:'pr',ciudad:name} : {region:'usa',estado:state,ciudad:name};
        return `<section class="card directory-place"><h3><a href="${directoryUrl(filters)}">${esc(name)}</a></h3><ul>
          ${trucks.sort((a,b)=>collator.compare(a.name,b.name)).map(truck=>{
            const special = currentSpecial(truck);
            const href = menuPath(truck);
            return `<li><a href="${href}">${esc(truck.name)}</a>
              ${truck.ordersPaused ? `<small class="kitchen-closed">Cocina cerrada</small>` : ''}
              ${special ? `<a class="directory-special" href="${specialPath(truck,special)}">${specialPeriods[special.period].label}</a>` : ''}
              ${address(truck) ? `<span>${esc(address(truck))}</span>` : ''}</li>`;
          }).join('')}
        </ul></section>`;
      }).join('')}</div></section>`;
  }).join('');
  const regions = [['','Todos'],['pr','Puerto Rico'],['usa','Estados Unidos']];
  const title = requestedCity ? [requestedCity,stateFilter].filter(Boolean).join(', ') : stateFilter;
  return page('¿Dónde comer?',`<p>Descubre dónde se cocina boricua, en Puerto Rico y en la diáspora. Explora menús y especiales por pueblo en la isla o por estado y ciudad en Estados Unidos.</p>
    <nav aria-label="Región">${regions.map(([key,label])=>`<a href="${directoryUrl(key ? {region:key} : {})}"${region === key ? ' aria-current="page"' : ''}>${label}</a>`).join('')}</nav>
    ${title ? `<p>Mostrando ${esc(title)} · <a href="${directoryUrl(region ? {region} : {})}">Ver toda la región</a></p>` : ''}
    ${sections || '<p>Todavía no hay menús publicados para esta ubicación.</p>'}
    <p class="directory-cta">¿Cocinas boricua en la isla o en Estados Unidos? <a href="${base}">Crea tu menú en PB</a></p>`);
}

function socialUrl(value, hosts) {
  try {
    const url = new URL(value);
    if (url.protocol === 'https:' && !url.username && !url.password && !url.port && url.pathname !== '/' &&
      hosts.some(host => url.hostname === host || url.hostname.endsWith('.' + host))) return url.href;
  } catch {}
  return '';
}

function page(title, body, palette, share) {
  const social = share ? `<meta property="og:type" content="website"><meta property="og:site_name" content="Planeta Boricua"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(share.description)}"><meta property="og:url" content="${esc(share.url)}">` : '';
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} | Planeta Boricua</title>${social}<link rel="stylesheet" href="/css/pb-food-trucks.css"></head><body data-theme="${theme(palette)}"><header><a href="${directory}">Dónde Comer · PB</a><a href="${base}">Crea tu menú</a></header><main><h1>${esc(title)}</h1>${body}</main><script src="/js/pb-food-menu-photo.js" defer></script></body></html>`;
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

function renderMenu(truck, preview = false, palette = truck.palette, photo = '', offer = '', previewActions = '') {
  const socials = Object.entries(networks).map(([key,[name,hosts]]) => {
    const url = socialUrl(truck.social?.[key],hosts);
    return url ? `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${name}</a>` : '';
  }).filter(Boolean);
  const accepting = !truck.ordersPaused;
  const items = truck.items.map(item => `<article class="card"><small>${esc(item.category)}</small><h2>${esc(item.name)}</h2><p>${esc(item.description)}</p><strong>${money(item.cents)}</strong> ${accepting ? `<button type="button" data-add="${item.id}" ${item.available?'':'disabled'}>${item.available?'Añadir':'Agotado'}</button>` : item.available ? '' : '<span>Agotado</span>'}</article>`).join('');
  const data = JSON.stringify({name:truck.name, whatsapp:preview?'':truck.whatsapp, items:truck.items}).replaceAll('<','\\u003c');
  const where = [address(truck), truck.city, truck.state].filter(Boolean).join(', ');
  const maps = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(where);
  const contact = !preview && truck.whatsapp ? `<a class="action" href="https://wa.me/${esc(truck.whatsapp)}">${accepting ? 'Escribir por WhatsApp' : 'Consultar por WhatsApp'}</a>` : '';
  const menuPhoto = photo ? `<section><h2>Foto del menú</h2><a href="${photo}"><img class="menu-photo" src="${photo}" alt="Menú de ${esc(truck.name || 'este negocio')}" /></a></section>` : '';
  const cart = items && accepting ? `<section class="card"><h2>Tu pedido</h2><ul id="cart-lines"></ul><p id="cart-total" aria-live="polite"></p><label>Método de pago<select id="cart-payment">${(truck.payments || []).map(method=>`<option>${esc(method)}</option>`).join('')}</select></label><label>Recogido<select id="cart-pickup"><option value="pronto">Lo antes posible</option><option value="hora">Solicitar una hora</option></select></label><div id="cart-time-field" hidden><label>Hora aproximada en el negocio<input type="time" id="cart-time"></label></div><button id="cart-send" disabled>Pedir para recoger por WhatsApp</button><p>${preview?'Vista privada del menú.':'El negocio confirma el total y el recogido.'}</p></section><script id="pb-menu-data" type="application/json">${data}</script><script src="/js/pb-food-truck-cart.js" defer></script>` : '';
  const special = currentSpecial(truck);
  return page(truck.name || 'Vista previa del menú', `${previewActions}${kitchenStatus(truck)}<p>${esc(where)}</p><p>${esc(truck.hours)}</p><nav aria-label="Contacto y ubicación">${where ? `<a href="${esc(maps)}">Ver en Google Maps</a>` : ''}${contact}${socials.join('')}</nav>${special ? renderSpecial(special) : ''}${offer}${menuPhoto}${items ? `<div class="grid">${items}</div>` : menuPhoto ? '' : '<p>Aún no hay platos en este menú.</p>'}${cart}`,palette);
}

module.exports = function mount(app,{file,origin,sendLink,limiter,stripe,billing,rawBody,webhookRouter=app,inviteEmail}) {
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
  const invited = inviteEmail === undefined ? null : clean(inviteEmail,254).toLowerCase();
  const canJoin = email => invited === null || Boolean(invited && email === invited);
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

  require('./pb-food-sales')(app,{panel,page,esc,owner,csrf,update});
  const publicOffer = require('./pb-food-coupons')(app,{panel,menuPath,directory,origin,page,esc,read,edit,owner,csrf,update,privatePage,sameOrigin,limiter});

  app.get(access,(_req,res)=>privatePage(res).send(page('Crea o abre tu menú',`<form class="card" method="post">${field('Correo electrónico','email','','email',true)}<button>Enviar enlace de acceso</button></form>`)));
  app.post(access,limiter,async(req,res)=>{
    privatePage(res);
    if(!sameOrigin(req)) return res.sendStatus(403);
    const email=clean(req.body.email,254).toLowerCase();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.sendStatus(400);
    const confirmation = () => res.send(page('Revisa tu correo','<p>Si tu correo tiene acceso, recibirás un enlace que vence en 20 minutos.</p>'));
    if (!canJoin(email) && !Object.values(read()).some(truck=>truck.email===email && truck.subscription)) return confirmation();
    const secret=token();
    edit(records=>{
      let truck=Object.values(records).find(item=>item.email===email);
      if(!truck){const id=randomUUID();truck=records[id]={id,email,items:[]};}
      Object.assign(truck,{login:hash(secret),loginUntil:Date.now()+20*60_000});
    });
    await sendLink(email,origin+access+'/'+secret);
    return confirmation();
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
  const checkoutReady=billingReady && (billing.live !== true || ['automatic','none'].includes(billing.taxMode));
  let catalog;
  function verifyCatalog() {
    if (!billing.account) return Promise.resolve();
    if (!catalog) {
      catalog = Promise.all([stripe.accounts.retrieve(), stripe.prices.retrieve(billing.setup), stripe.prices.retrieve(billing.monthly)])
        .then(([account, setup, monthly]) => {
          const matches = (price, cents, type) => price.livemode === billing.live && price.active &&
            price.currency === 'usd' && price.unit_amount === cents && price.type === type;
          if (account.id !== billing.account || !account.charges_enabled ||
              !matches(setup,4900,'one_time') || !matches(monthly,999,'recurring') ||
              monthly.recurring?.interval !== 'month' || monthly.recurring.interval_count !== 1) {
            throw new Error('La cuenta o los precios de Stripe no corresponden a Dónde Comer.');
          }
        }).catch(error=>{catalog=undefined;throw error;});
    }
    return catalog;
  }
  const canActivate=truck=>checkoutReady && canJoin(truck.email) && !truck.subscription && truck.name && truck.city && truck.state && truck.whatsapp && (hasPhoto(truck) || truck.items.some(item=>item.available));
  function specialEditor(truck, draft = currentSpecial(truck) || {}, error = '') {
    const special = currentSpecial(truck);
    const url = truck.active && special ? origin + specialPath(truck,special) : '';
    const message = url ? `${specialPeriods[special.period].label} · ${special.title} · ${truck.name}` : '';
    return `<section class="card" id="especial"><h2>Mis especiales</h2>
      ${error ? `<p class="notice" role="alert">${esc(error)}</p>` : ''}
      <form method="post" action="${panel}/especial">${csrf(truck)}
        <label>Duración<select name="period">
          <option value="hoy" ${draft.period === 'hoy' ? 'selected' : ''}>Especial de hoy · 24 horas</option>
          <option value="semana" ${draft.period === 'semana' ? 'selected' : ''}>Especial de la semana · 7 días</option>
        </select></label>
        <label>Nombre del especial<input name="title" maxlength="100" value="${esc(draft.title)}" required></label>
        <label>Precio (opcional)<input name="price" maxlength="32" placeholder="$12" value="${esc(draft.price)}"></label>
        <label>Descripción (opcional)<textarea name="description" maxlength="350" rows="3">${esc(draft.description)}</textarea></label>
        <button>${truck.active ? 'Publicar especial' : 'Guardar especial'}</button>
      </form>
      ${url ? `<div class="special-share" data-special-share data-title="${esc(message)}">
        <label>Enlace para redes<input type="url" value="${esc(url)}" readonly></label>
        <button type="button" data-share hidden>Compartir</button>
        <button type="button" data-copy hidden>Copiar enlace</button>
        <a class="action" href="https://wa.me/?text=${encodeURIComponent(message+' '+url)}">Enviar por WhatsApp</a>
        <a class="action" href="${esc(url)}">Ver especial</a><p role="status" data-share-status></p>
      </div><script src="/js/pb-food-special-share.js" defer></script>` : ''}
      ${special && !truck.active ? '<p>El enlace estará disponible cuando actives tu menú. La duración del especial empieza en ese momento.</p>' : ''}
      ${special ? `<form method="post" action="${panel}/especial/retirar">${csrf(truck)}<button class="secondary-action">Retirar especial</button></form>` : ''}
    </section>`;
  }

  function publishControls(truck) {
    if (truck.active) {
      const url = menuPath(truck);
      return `<p>Tu menú está publicado.</p><a class="action" href="${url}">Ver mi menú público</a>
        <a class="action" href="${url}/qr">Descargar QR</a>`;
    }

    if (canActivate(truck)) {
      return `<form method="post" action="${panel}/activar">${csrf(truck)}
        <p>$49 al publicar. Los primeros 30 días van incluidos. Después, $9.99 al mes. PB cobra $0 por pedido.</p>
        <button>Publicar</button>
        <p>Te llevamos a Stripe. Tu menú se hace público cuando se confirme el pago.</p>
      </form>`;
    }

    const message = truck.subscription ? 'Revisa el estado de tu suscripción en Gestionar suscripción.'
      : !truck.name || !truck.city || !truck.state || !truck.whatsapp ? 'Guarda primero el nombre, pueblo o ciudad, estado y WhatsApp del negocio.'
      : !hasPhoto(truck) && !truck.items.some(item=>item.available) ? 'Sube una foto del menú o guarda al menos un plato disponible.'
      : 'La publicación todavía no está disponible.';
    return `<p>${message}</p>`;
  }

  function ownerPanel(truck, error = '', photoExists = hasPhoto(truck), specialDraft, specialError, notice = '') {
    const colors=Object.entries(palettes).map(([key,label])=>`<label><input type="radio" name="palette" value="${key}" ${theme(truck.palette)===key?'checked':''}> ${label} <a href="${panel}/vista-previa?paleta=${key}">Vista previa</a></label>`).join('');
    const social=Object.entries(networks).map(([key,[label]])=>field(label,key,truck.social?.[key],'url')).join('');
    const payments=methods.map(value=>`<label><input type="checkbox" name="payments" value="${value}" ${truck.payments?.includes(value)?'checked':''}> ${value}</label>`).join('');
    const items=truck.items.map(item=>`<li><a href="${panel}/plato/${item.id}">${esc(item.name)}</a> · ${money(item.cents)} ${item.available?'':'· Agotado'}</li>`).join('');
    const basics = profileFields.filter(([, key]) => ['name','whatsapp','city'].includes(key))
      .map(([label,key]) => field(key === 'whatsapp' ? 'WhatsApp' : label,key,truck[key],key === 'whatsapp' ? 'tel' : 'text',true)).join('');
    const details = profileFields.filter(([, key]) => !['name','whatsapp','city'].includes(key))
      .map(([label,key]) => field(label,key,key === 'state' ? truck[key] || 'Puerto Rico' : truck[key],key === 'phone' ? 'tel' : 'text')).join('');
    return page('Administra tu menú', `
      <nav aria-label="Accesos rápidos"><a href="#cocina">Cocina</a><a href="#especial">Especiales</a><a href="${panel}/cupones">Cupones</a><a href="${panel}/ventas">Ventas</a><a href="#menu">Mi menú</a><a href="${panel}/vista-previa">Vista previa</a><a href="#publicar">Publicar y compartir</a><a href="#ubicacion">Ubicación y redes</a></nav>
      ${error ? `<p class="notice" role="alert">${esc(error)}</p>` : ''}
      ${notice ? `<p class="notice" role="status">${esc(notice)}</p>` : ''}
      <section class="card" id="cocina"><h2>Estado de la cocina</h2>
        ${kitchenStatus(truck)}
        <p>Puedes cerrar temprano si ya completaste tu turno de pedidos. El horario publicado se conserva. Vuelve a abrir la cocina cuando estés listo.</p>
        <form method="post" action="${panel}/pedidos">${csrf(truck)}
          <button name="mode" value="${truck.ordersPaused ? 'abrir' : 'pausar'}">${truck.ordersPaused ? 'Abrir cocina' : 'Cerrar cocina'}</button>
        </form>
      </section>
      ${specialEditor(truck,specialDraft,specialError)}
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
      <section class="card" id="publicar"><h2>Publicar y compartir</h2>${publishControls(truck)}
        ${billingReady && truck.customer ? `<form method="post" action="${panel}/facturacion">${csrf(truck)}<button>Gestionar suscripción</button></form>` : ''}
      </section>`);
  }

  app.get(panel,owner,(req,res)=>{
    const status = req.query.publicacion;
    let notice = '';
    if (status === 'confirmando') {
      notice = req.truck.active ? 'Tu menú ya está publicado. Puedes compartirlo y descargar el QR.'
        : 'Estamos esperando la confirmación de Stripe. Tu menú se publicará cuando se confirme el pago. Puedes recargar esta página para ver el estado.';
    }
    if (status === 'cancelada' && !req.truck.active) {
      notice = 'Tu menú sigue guardado como borrador. Puedes editarlo o volver a publicar cuando quieras.';
    }
    res.send(ownerPanel(req.truck,'',hasPhoto(req.truck),undefined,undefined,notice));
  });
  app.post(panel+'/pedidos',owner,(req,res)=>{
    const {mode} = req.body;
    if (mode !== 'pausar' && mode !== 'abrir') return res.sendStatus(400);
    update(req,truck=>{truck.ordersPaused = mode === 'pausar';});
    res.redirect(303,panel+'#cocina');
  });
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

  app.post(panel+'/especial',owner,(req,res)=>{
    const draft = {
      period:clean(req.body.period,10), title:clean(req.body.title,100),
      price:clean(req.body.price,32), description:clean(req.body.description,350)
    };
    if (!draft.title || !Object.hasOwn(specialPeriods,draft.period)) {
      return res.status(400).send(ownerPanel(req.truck,'',hasPhoto(req.truck),draft,'Escribe el nombre del especial y escoge cuánto tiempo quieres mostrarlo.'));
    }
    update(req,truck=>{
      const previous = currentSpecial(truck);
      const sameSpecial = previous && previous.period === draft.period && previous.title === draft.title;
      truck.special = {
        ...draft, id:sameSpecial ? previous.id : randomUUID(),
        expiresAt:sameSpecial ? previous.expiresAt : truck.active ? Date.now()+specialPeriods[draft.period].days*86_400_000 : null
      };
    });
    res.redirect(303,panel+'#especial');
  });
  app.post(panel+'/especial/retirar',owner,(req,res)=>{
    update(req,truck=>{delete truck.special;});
    res.redirect(303,panel+'#especial');
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
  app.get(panel+'/vista-previa',owner,(req,res)=>{
    const truck = req.truck;
    const actions = `<section class="card"><h2>Vista previa privada</h2>
      <p>Así se verá tu menú cuando lo compartas.</p>
      <a class="action" href="${panel}">Seguir editando</a>
      ${publishControls(truck)}
    </section>`;
    res.send(renderMenu(truck,true,req.query.paleta ?? truck.palette,hasPhoto(truck) ? panel+'/foto' : '','',actions));
  });
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
    await verifyCatalog();
    let session=truck.checkout && await stripe.checkout.sessions.retrieve(truck.checkout);
    if(session?.status==='complete') return res.redirect(303,panel+'?publicacion=confirmando');
    if(session?.status!=='open'){
      session=await stripe.checkout.sessions.create({
        mode:'subscription',customer_email:truck.email,locale:'es',client_reference_id:truck.id,
        integration_identifier:'pb-food-hzrmyqvk',
        ...(billing.taxMode === 'automatic' ? {automatic_tax:{enabled:true},billing_address_collection:'required'} : {}),
        line_items:[{price:billing.setup,quantity:1},{price:billing.monthly,quantity:1}],
        subscription_data:{trial_period_days:30,metadata:{pbFoodTruck:truck.id}},metadata:{pbFoodTruck:truck.id},
        success_url:origin+panel+'?publicacion=confirmando',cancel_url:origin+panel+'?publicacion=cancelada'
      },{idempotencyKey:'pb-food-'+truck.id+'-'+(truck.checkout || 'initial')});
      update(req,record=>{record.checkout=session.id;});
    }
    res.redirect(303,session.url);
  });
  app.post(panel+'/facturacion',owner,async(req,res)=>{
    if(!billingReady || !req.truck.customer) return res.sendStatus(409);
    const session=await stripe.billingPortal.sessions.create({customer:req.truck.customer,return_url:origin+panel,configuration:billing.portal || undefined});
    res.redirect(303,session.url);
  });
  const riskEvents = ['charge.dispute.created','charge.refunded','radar.early_fraud_warning.created'];
  const checkoutEvents = ['checkout.session.completed','checkout.session.async_payment_succeeded'];
  const subscriptionEvents = ['customer.subscription.updated','customer.subscription.deleted'];
  const invoiceEvents = ['invoice.paid','invoice.payment_failed'];
  webhookRouter.post(base+'/stripe-webhook',rawBody,async(req,res)=>{
    if(!billingReady) return res.sendStatus(404);
    let event;
    try { event=stripe.webhooks.constructEvent(req.body,req.get('stripe-signature'),billing.webhook); }
    catch { return res.sendStatus(400); }
    if (billing.live !== undefined && event.livemode !== billing.live) return res.sendStatus(400);
    const object=event.data.object, records=Object.values(read());

    if (riskEvents.includes(event.type)) {
      // Checkout creates a dedicated Stripe Customer for each new food truck.
      const charge=event.type==='charge.refunded' ? object : await stripe.charges.retrieve(stripeId(object.charge));
      const truck=records.find(record=>record.customer && record.customer===stripeId(charge.customer));
      if (truck) {
        edit(list=>{
          const record=list[truck.id];
          if (record.billingAlert?.event === event.id) return;
          record.billingAlert={event:event.id,type:event.type,charge:charge.id,at:event.created};
          console.warn('[PB food billing review]',event.type,truck.id,charge.id);
        });
      }
      return res.sendStatus(200);
    }

    const checkout=checkoutEvents.includes(event.type);
    const subscription=subscriptionEvents.includes(event.type);
    const invoice=invoiceEvents.includes(event.type);
    const subscriptionId=checkout ? stripeId(object.subscription) : subscription ? object.id : invoice ? invoiceSubscription(object) : null;
    if (!subscriptionId) return res.sendStatus(200);
    const truck=checkout
      ? records.find(record=>record.checkout===object.id)
      : records.find(record=>record.subscription===subscriptionId);
    if (!truck || (checkout && object.payment_status!=='paid')) return res.sendStatus(200);

    const current=await stripe.subscriptions.retrieve(subscriptionId);
    const customer=stripeId(current.customer) || stripeId(object.customer);
    if (billing.account && (!customer || customer !== stripeId(object.customer) ||
        !current.items?.data?.some(item=>stripeId(item.price)===billing.monthly))) return res.sendStatus(400);

    edit(list=>{
      const record=list[truck.id];
      if (record.subscription && record.subscription !== current.id) return;
      const active=['active','trialing'].includes(current.status);
      Object.assign(record,{subscription:current.id,customer,active});
      startSpecial(record);
    });
    res.sendStatus(200);
  });

  app.get(directory,(req,res)=>res.send(renderDirectory(Object.values(read()),req.query)));
  app.get(directory+'/:id',(req,res)=>{
    const truck=read()[req.params.id];
    if(!truck?.active) return res.sendStatus(404);
    res.set('Cache-Control','no-store').send(renderMenu(truck,false,truck.palette,hasPhoto(truck) ? directory+'/'+truck.id+'/foto' : '',publicOffer(truck)));
  });
  app.get(directory+'/:id/especial/:specialId',(req,res)=>{
    const truck = read()[req.params.id];
    if (!truck?.active) return res.sendStatus(404);
    res.set('Cache-Control','no-store');
    const special = currentSpecial(truck);
    const back = `<a class="action" href="${menuPath(truck)}">Ver el menú y la ubicación</a>`;
    if (!special || special.id !== req.params.specialId) {
      return res.status(410).send(page('Este especial ya terminó',back,truck.palette));
    }
    const title = `${special.title} · ${truck.name}`;
    const description = [specialPeriods[special.period].label,special.price,special.description].filter(Boolean).join(' · ');
    const message = encodeURIComponent('Hola, me interesa el especial: '+special.title);
    const contact = truck.whatsapp && !truck.ordersPaused ? `<a class="action" href="https://wa.me/${esc(truck.whatsapp)}?text=${message}">Preguntar por WhatsApp</a>` : '';
    res.send(page(title,`${kitchenStatus(truck)}<p class="special-label">${specialPeriods[special.period].label}</p>
      ${special.description ? `<p class="special-description">${esc(special.description)}</p>` : ''}
      ${special.price ? `<p><strong>${esc(special.price)}</strong></p>` : ''}
      <nav aria-label="Opciones del especial">${contact}${back}</nav>`,truck.palette,{description,url:origin+specialPath(truck,special)}));
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
