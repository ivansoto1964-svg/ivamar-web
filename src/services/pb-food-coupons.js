const {randomBytes,randomUUID} = require('node:crypto');
const QRCode = require('qrcode');

module.exports = function mountCoupons(app,{panel,menuPath,directory,origin,page,esc,read,edit,owner,csrf,update,privatePage,sameOrigin,limiter}) {
  const dashboard = panel+'/cupones';
  const campaignUrl = (truck,offer) => menuPath(truck)+'/cupones/'+offer.id;
  const current = truck => truck.coupons?.at(-1);
  const valid = offer => offer?.expiresAt > Date.now();
  const count = offer => Object.keys(offer.claims).length;
  const codePattern = /^[a-f0-9]{16}$/;
  const shortCode = code => code.match(/.{4}/g).join('-').toUpperCase();
  function getTruck(id) {
    const records = read();
    return Object.hasOwn(records,id) ? records[id] : null;
  }
  const findOffer = (truck,id) => truck.coupons?.find(offer=>offer.id === id);
  const findClaim = (truck,code) => truck.coupons?.find(offer=>Object.hasOwn(offer.claims,code));

  function publicOffer(truck) {
    const offer = current(truck);
    if (!truck.active || !valid(offer) || offer.closed || count(offer) === offer.limit) return '';
    return `<section class="card special-card"><h2>${offer.percent}% de descuento</h2>
      <p>Para los primeros ${offer.limit} que reclamen su cupón.</p>
      <a class="action" href="${campaignUrl(truck,offer)}">Reclamar cupón</a></section>`;
  }

  function panelPage(truck,error = '',draft = {}) {
    const offer = current(truck);
    const shareUrl = truck.active && valid(offer) && !offer.closed && origin+campaignUrl(truck,offer);
    return page('Cupones',`
      <p><a href="${panel}">Volver al panel</a></p>
      ${error ? `<p class="notice" role="alert">${esc(error)}</p>` : ''}
      ${offer ? `<section class="card"><h2>Última promoción · ${offer.percent}% de descuento</h2>
        <p>${count(offer)} de ${offer.limit} reclamados · ${Object.values(offer.claims).filter(claim=>claim.usedAt).length} canjeados</p>
        ${shareUrl ? `<div data-special-share data-title="${esc(truck.name+' · '+offer.percent+'% de descuento')}"><label>Enlace para redes<input type="url" value="${esc(shareUrl)}" readonly></label>
          <button type="button" data-share hidden>Compartir</button> <button type="button" data-copy hidden>Copiar enlace</button>
          <a class="action" href="https://wa.me/?text=${encodeURIComponent(shareUrl)}">Enviar por WhatsApp</a><p role="status" data-share-status></p></div>
          <script src="/js/pb-food-special-share.js" defer></script>
          <form method="post" action="${dashboard}/cerrar">${csrf(truck)}<input type="hidden" name="campaign" value="${offer.id}"><button>Cerrar reclamos</button></form>
          <p>Los cupones entregados siguen vigentes hasta que venza la promoción.</p>` : ''}
      </section>` : ''}
      ${truck.active && !shareUrl ? `<form class="card" method="post">${csrf(truck)}<h2>Nueva promoción</h2>
        <label>Descuento (%)<input name="percent" type="number" min="1" max="100" value="${esc(draft.percent)}" required></label>
        <label>Cantidad de cupones<input name="limit" type="number" min="1" max="1000" value="${esc(draft.limit)}" required></label>
        <label>Condiciones (opcional)<textarea name="terms" maxlength="300" rows="3">${esc(draft.terms)}</textarea></label>
        <p>Los cupones se pueden reclamar y canjear durante 7 días desde que abres la promoción.</p>
        <button>Publicar promoción</button></form>` : ''}
      ${truck.active ? `<form class="card" method="get" action="${dashboard}/canjear"><h2>Canjear en el negocio</h2>
        <p>Escanea el QR del cliente con la cámara del celular o escribe su código.</p>
        <label>Código<input name="codigo" maxlength="24" autocapitalize="characters" required></label><button>Verificar código</button></form>`
        : '<p>Activa tu menú para publicar promociones y canjear cupones.</p>'}`,truck.palette);
  }

  app.get(dashboard,owner,(req,res)=>res.send(panelPage(req.truck)));
  app.post(dashboard,owner,(req,res)=>{
    const {percent,limit} = req.body;
    const terms = typeof req.body.terms === 'string' ? req.body.terms.trim().slice(0,300) : '';
    const numbers = typeof percent === 'string' && typeof limit === 'string' && /^\d{1,3}$/.test(percent) && /^\d{1,4}$/.test(limit);
    if (!numbers || +percent < 1 || +percent > 100 || +limit < 1 || +limit > 1000) {
      return res.status(400).send(panelPage(req.truck,'Ingresa un porcentaje entre 1 y 100 y una cantidad entre 1 y 1,000.',{percent,limit,terms}));
    }
    const created = update(req,truck=>{
      const offer = current(truck);
      if (!truck.active || (valid(offer) && !offer.closed)) return false;
      truck.coupons ??= [];
      truck.coupons = truck.coupons.filter(valid);
      truck.coupons.push({id:randomUUID(),percent:+percent,limit:+limit,terms,expiresAt:Date.now()+7*86_400_000,claims:{}});
      return true;
    });
    if (!created) return res.status(409).send(panelPage(req.truck,'Cierra la promoción actual antes de crear otra.'));
    res.redirect(303,dashboard);
  });
  app.post(dashboard+'/cerrar',owner,(req,res)=>{
    update(req,truck=>{
      const offer = current(truck);
      if (offer?.id === req.body.campaign) offer.closed = true;
    });
    res.redirect(303,dashboard);
  });

  const redeem = dashboard+'/canjear';
  const normalizedCode = value => typeof value === 'string' ? value.replace(/[\s-]/g,'').toLowerCase() : '';
  function couponStatus(truck,code) {
    const offer = codePattern.test(code) && findClaim(truck,code);
    if (!truck.active || !valid(offer)) return {message:'Código inválido o vencido'};
    if (offer.claims[code].usedAt) return {message:'Este cupón ya fue canjeado'};
    return {offer};
  }
  app.get(redeem,owner,(req,res)=>{
    const code = normalizedCode(req.query.codigo);
    const result = couponStatus(req.truck,code);
    res.send(page(result.message || `Cupón válido · ${result.offer.percent}% de descuento`,result.offer ?
      `<p>${esc(result.offer.terms)}</p><form method="post">${csrf(req.truck)}<input type="hidden" name="code" value="${code}"><button>Confirmar canje</button></form>` :
      `<a href="${dashboard}">Volver a Cupones</a>`,req.truck.palette));
  });
  app.post(redeem,owner,(req,res)=>{
    const code = normalizedCode(req.body.code);
    const result = update(req,truck=>{
      const outcome = couponStatus(truck,code);
      if (outcome.offer) outcome.offer.claims[code].usedAt = Date.now();
      return outcome;
    });
    res.status(result.offer ? 200 : 409).send(page(result.message || `Cupón canjeado · ${result.offer.percent}% de descuento`,
      `<a href="${dashboard}">Volver a Cupones</a>`,req.truck.palette));
  });

  const publicRoute = directory+'/:id/cupones/:campaign';
  const ticketUrl = (url,code) => url+'/'+code;
  const claimCookie = (req,offer) => {
    const value = req.cookies['pb_coupon_'+offer.id];
    return typeof value === 'string' && codePattern.test(value) ? value : null;
  };
  app.get(publicRoute,(req,res)=>{
    privatePage(res);
    const truck = getTruck(req.params.id);
    const offer = truck?.active && findOffer(truck,req.params.campaign);
    if (!offer) return res.sendStatus(404);
    const url = campaignUrl(truck,offer);
    const left = offer.limit-count(offer);
    const claimed = claimCookie(req,offer);
    const existingTicket = typeof claimed === 'string' && Object.hasOwn(offer.claims,claimed);
    const open = valid(offer) && !offer.closed && left > 0;
    if (open && !claimed) {
      res.cookie('pb_coupon_'+offer.id,randomBytes(8).toString('hex'),{
        httpOnly:true,sameSite:'lax',secure:origin.startsWith('https:'),path:url,expires:new Date(offer.expiresAt)
      });
    }
    const description = `${offer.percent}% de descuento en ${truck.name}`;
    res.send(page(description,`<p>${esc(offer.terms)}</p>
      ${existingTicket ? `<a class="action" href="${ticketUrl(url,claimed)}">Ver mi cupón</a>` :
        open ? `<p>${left} disponibles. Presenta el QR en el negocio antes de que venza la promoción.</p><form method="post"><button>Reclamar mi cupón</button></form>` :
          '<p>Esta promoción ya no acepta reclamos.</p>'}
      <p><a href="${menuPath(truck)}">Ver menú y ubicación</a></p>`,truck.palette,{description,url:origin+url}));
  });
  app.post(publicRoute,limiter,(req,res)=>{
    if (!sameOrigin(req)) return res.sendStatus(403);
    privatePage(res);
    const result = edit(records=>{
      const id = req.params.id;
      const truck = Object.hasOwn(records,id) && records[id];
      const offer = truck?.active && findOffer(truck,req.params.campaign);
      if (!offer) return {status:404};
      const url = campaignUrl(truck,offer);
      const code = claimCookie(req,offer);
      if (!code) return {status:303,url};
      if (Object.hasOwn(offer.claims,code)) return {code,url};
      if (!valid(offer) || offer.closed || count(offer) >= offer.limit) return {status:409,url};
      offer.claims[code] = {};
      return {code,url};
    });
    if (result.status === 404) return res.sendStatus(404);
    if (result.status === 303) return res.redirect(303,result.url);
    if (result.status) return res.status(409).send(page('Ya no quedan cupones para reclamar',`<a href="${result.url}">Ver promoción</a>`));
    res.redirect(303,ticketUrl(result.url,result.code));
  });

  app.get(publicRoute+'/:code{/:download}',async(req,res)=>{
    privatePage(res);
    const {id,code,download} = req.params;
    if (!codePattern.test(code) || (download && !['qr','imagen'].includes(download))) return res.sendStatus(404);
    const truck = getTruck(id);
    const offer = truck?.active && findOffer(truck,req.params.campaign);
    if (!offer || !Object.hasOwn(offer.claims,code)) return res.sendStatus(404);
    if (!valid(offer) || offer.claims[code].usedAt) {
      return res.status(410).send(page(offer.claims[code].usedAt ? 'Este cupón ya fue canjeado' : 'Este cupón venció',
        `<a href="${menuPath(truck)}">Ver menú y ubicación</a>`,truck.palette));
    }

    const redeemUrl = origin+redeem+'?codigo='+code;
    if (download === 'qr') res.attachment('cupon-pb.png');
    if (download) return res.type('png').send(await QRCode.toBuffer(redeemUrl,{width:640}));
    const url = ticketUrl(campaignUrl(truck,offer),code);
    res.send(page(`Tu cupón · ${offer.percent}% de descuento`,`<p>Preséntalo en ${esc(truck.name)}.</p>
      <img class="menu-thumbnail coupon-qr" src="${url}/imagen" alt="QR de canje"><p>Código: <strong>${shortCode(code)}</strong></p>
      <p>Vence el <time datetime="${new Date(offer.expiresAt).toISOString()}">${new Intl.DateTimeFormat('es-PR',{timeZone:'America/New_York',dateStyle:'medium',timeStyle:'short'}).format(offer.expiresAt)}</time>, hora del este.</p>
      <p>${esc(offer.terms)}</p><a class="action" href="${url}/qr">Descargar QR</a>
      <a class="action" href="${menuPath(truck)}">Ver menú y ubicación</a>`,truck.palette));
  });

  return publicOffer;
};
