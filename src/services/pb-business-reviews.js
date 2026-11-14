'use strict';

const {createHash,randomBytes,randomUUID} = require('node:crypto');
const hash = token => createHash('sha256').update(token).digest('hex');
const duration = 14*86400_000;
const styles = {
  food:{icon:'🥄',one:'cucharita',many:'cucharitas'},
  mechanic:{icon:'🔩',one:'tuerca',many:'tuercas'},
  service:{icon:'⭐',one:'estrella',many:'estrellas'}
};
const symbol = (account, type) => type === 'food' ? styles.food : account.servicePublished?.category === 'mechanic' ? styles.mechanic : styles.service;

module.exports = function mountReviews(app,{origin,owner,update,read,edit,csrf,clean,esc,page,limiter,privatePage,sameOrigin}) {
  const base = '/resenas-pb';
  const recordsFor = (account,type) => account.reviews?.[type] || [];
  const isPublic = (account,type) => type === 'food' ? Boolean(account?.active) : Boolean(account?.servicePublished);
  const rating = (score, style) => `<span aria-hidden="true">${style.icon.repeat(score)}</span> <strong>${score} de 5</strong>`;
  const publicSection = (account,type) => {
    const rows = recordsFor(account,type);
    const style = symbol(account,type);
    const average = rows.length ? (rows.reduce((sum,row)=>sum+row.rating,0)/rows.length).toFixed(1) : '';
    return `<section class="card" id="resenas"><h2>Reseñas</h2>
      ${average ? `<p><span aria-hidden="true">${style.icon}</span> <strong>${average} de 5</strong> · ${rows.length} ${rows.length===1?'reseña':'reseñas'}</p>` : '<p>Todavía no hay reseñas.</p>'}
      ${rows.slice(-30).reverse().map(row=>`<article><p>${rating(row.rating,style)} · Reseña por invitación</p>
        <p class="special-description">${esc(row.comment)}</p>
        ${row.reply ? `<p class="special-description"><strong>Respuesta del negocio</strong><br>${esc(row.reply)}</p>` : ''}</article>`).join('')}
    </section>`;
  };

  const ownerSections = {};
  for (const [type,panel] of [['food','/crea-tu-menu/panel'],['service','/crea-tu-menu/servicios']]) {
    const manage = panel+'/resenas';
    const entry = account => `<section class="card"><h2>Reseñas por invitación</h2>${isPublic(account,type)
      ? `<a class="action" href="${manage}">Pedir reseña</a>` : '<p>Publica tu página para pedir reseñas.</p>'}</section>`;
    const dashboard = (account, link = '') => page('Pedir reseña',`
      <a class="action" href="${panel}">Volver al editor</a>
      <section class="card"><p>Crea un enlace para un cliente después de atenderlo. Dura 14 días y acepta una sola reseña.</p>
      <form method="post">${csrf(account)}<button>Crear invitación</button></form>
      ${link ? `<label>Enlace para compartir<input type="url" readonly value="${esc(link)}"></label>
        <a class="action" rel="noreferrer" href="https://wa.me/?text=${encodeURIComponent('Gracias por visitarnos. ¿Nos dejas una reseña? '+link)}">Compartir por WhatsApp</a>` : ''}
      </section>
      ${recordsFor(account,type).slice(-30).reverse().map(row=>`<section class="card">
        <p>${rating(row.rating,symbol(account,type))} · Reseña por invitación</p><p class="special-description">${esc(row.comment)}</p>
        <form method="post" action="${manage}/${row.id}">${csrf(account)}
          <label>Respuesta del negocio<textarea name="reply" maxlength="500">${esc(row.reply || '')}</textarea></label>
          <button name="action" value="reply">Guardar respuesta</button>
          ${row.reported ? '<p>Marcada para revisión.</p>' : '<button class="secondary-action" name="action" value="report">Marcar para revisión</button>'}
        </form></section>`).join('')}`);

    app.get(manage,owner,(req,res)=>{
      if (!isPublic(req.truck,type)) return res.sendStatus(409);
      res.send(dashboard(req.truck));
    });
    app.post(manage,limiter,owner,(req,res)=>{
      if (!isPublic(req.truck,type)) return res.sendStatus(409);
      const token = randomBytes(24).toString('hex');
      const created = update(req,account=>{
        const invites = (account.reviewInvites || []).filter(invite=>invite.expires>Date.now());
        if (invites.length>=50) return false;
        account.reviewInvites = [...invites,{hash:hash(token),type,expires:Date.now()+duration}];
        return true;
      });
      if (!created) return res.status(429).send(page('Invitaciones pendientes','<p>Ya tienes 50 invitaciones activas. Cuando se use o venza alguna, podrás crear otra.</p>'));
      res.send(dashboard(req.truck,origin+base+'/'+token));
    });
    app.post(manage+'/:id',limiter,owner,(req,res)=>{
      const {action} = req.body;
      if (!isPublic(req.truck,type) || !['reply','report'].includes(action)) return res.sendStatus(400);
      const saved = update(req,account=>{
        const row = recordsFor(account,type).find(item=>item.id===req.params.id);
        if (!row) return false;
        if (action==='reply') row.reply=clean(req.body.reply,500);
        else row.reported=true;
        return true;
      });
      if (!saved) return res.sendStatus(404);
      res.redirect(303,manage);
    });
    ownerSections[type] = entry;
  }

  function lookup(accounts, token) {
    if (!/^[a-f0-9]{48}$/.test(token)) return;
    const key = hash(token);
    for (const account of Object.values(accounts)) {
      const invite = account.reviewInvites?.find(item=>item.hash===key && item.expires>Date.now());
      if (invite && isPublic(account,invite.type)) return {account,invite};
    }
  }
  const unavailable = res => res.status(410).send(page('Enlace no disponible','<p>La invitación venció, ya se usó o la página está retirada. Pídele otra al negocio si la necesitas.</p>'));
  const reviewForm = (res,{account,invite},error = '',score = '',comment = '') => {
    const style = symbol(account,invite.type);
    const name = invite.type === 'food' ? account.name : account.servicePublished.name;
    return res.status(error ? 400 : 200).send(page('Reseña para '+name,`<form class="card" method="post">
      ${error ? `<p role="alert">${esc(error)}</p>` : ''}
      <fieldset><legend>Tu calificación</legend>
      ${[5,4,3,2,1].map(i=>`<label><input type="radio" name="rating" value="${i}" required ${score===String(i)?'checked':''}>
        <span aria-hidden="true">${style.icon.repeat(i)}</span> ${i} ${i===1?style.one:style.many} de 5</label>`).join('')}
      </fieldset><label>Cuéntanos cómo te fue<textarea name="comment" maxlength="700" required>${esc(comment)}</textarea></label>
      <p>Tu calificación y comentario aparecerán en la página del negocio.</p><button>Publicar reseña</button></form>`));
  };
  app.get(base+'/:token',limiter,(req,res)=>{
    privatePage(res);
    const found = lookup(read(),req.params.token);
    return found ? reviewForm(res,found) : unavailable(res);
  });
  app.post(base+'/:token',limiter,(req,res)=>{
    privatePage(res);
    if (!sameOrigin(req)) return res.sendStatus(403);
    const found = lookup(read(),req.params.token);
    if (!found) return unavailable(res);
    const score = clean(req.body.rating,8);
    const comment = clean(req.body.comment,700);
    if (!/^[1-5]$/.test(score) || !comment) return reviewForm(res,found,'Selecciona una calificación y escribe un comentario.',score,comment);
    const saved = edit(accounts=>{
      const current = lookup(accounts,req.params.token);
      if (!current) return false;
      const {account,invite} = current;
      account.reviews ||= {};
      (account.reviews[invite.type] ||= []).push({id:randomUUID(),rating:Number(score),comment});
      account.reviewInvites = account.reviewInvites.filter(item=>item!==invite);
      return true;
    });
    return saved ? res.send(page('Gracias por tu reseña','<p>Tu comentario ya aparece en la página del negocio.</p>')) : unavailable(res);
  });
  return {foodOwner:ownerSections.food,serviceOwner:ownerSections.service,publicSection};
};
