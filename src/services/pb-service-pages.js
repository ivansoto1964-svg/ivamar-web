'use strict';

const fs = require('node:fs/promises');
const path = require('node:path');
const {randomUUID} = require('node:crypto');
const sharp = require('sharp');
const QRCode = require('qrcode');

const editor = '/crea-tu-menu/servicios';
const publicBase = '/servicios-pb';
const access = '/crea-tu-menu/acceso?tipo=servicios';
const complete = profile => Boolean(profile?.name && profile.area && profile.work && profile.whatsapp);

function mountServicePages(app,{file,origin,owner,update,read,csrf,page,esc,clean,field,demoAccess,reviews,networks,parseSocialLinks,renderSocialLinks}) {
  const photoFile = (account, photo) => path.resolve(file + '.service-photos',account.id,photo + '.webp');
  const publicUrl = account => publicBase + '/' + account.id;
  const form = (account, error = '') => {
    const info = account.service || {};
    const link = publicUrl(account);
    return page('Mi página de servicios',`
      ${account.demo ? '<p class="notice">Usa información ficticia. Si publicas la demo, cualquiera con su enlace puede abrirla.</p>' : ''}
      ${error ? `<p role="alert" class="notice">${esc(error)}</p>` : ''}
      <form method="post" class="card">${csrf(account)}
        ${field('Nombre del negocio','name',info.name,'text',true)}
        ${field('Pueblos o zonas que cubres','area',info.area,'text',true)}
        <label>Trabajos que haces<textarea name="work" rows="5" maxlength="1000" required>${esc(info.work)}</textarea></label>
        <label>Tipo de servicio<select name="category">
          <option value="service">Servicios generales</option>
          <option value="mechanic" ${info.category==='mechanic'?'selected':''}>Mecánica a domicilio</option>
        </select></label>
        ${field('Horario o disponibilidad','hours',info.hours)}
        ${field('WhatsApp con código de país','whatsapp',info.whatsapp,'tel',true)}
        <fieldset><legend>Redes sociales (opcional)</legend>
          <p>Pega el enlace completo de cada perfil que quieras mostrar.</p>
          ${Object.entries(networks).map(([key,[label]])=>field(label,key,info.social?.[key],'url')).join('')}
        </fieldset>
        <button>Guardar borrador</button>
      </form>
      <section class="card" id="foto"><h2>Foto de tu trabajo</h2>
        ${info.photo ? `<img class="menu-thumbnail" src="${editor}/foto" alt="Foto actual de tu trabajo">` : ''}
        <form method="post" action="${editor}/foto" data-menu-photo>${csrf(account)}
          <label>Elige una foto<input type="file" accept="image/*" required></label><input type="hidden" name="photo">
          <button>Guardar foto</button><p role="status" data-photo-status></p>
        </form>
      </section>
      <section class="card"><h2>Vista previa y publicación</h2>
        <a class="action" href="${editor}/vista-previa">Vista previa</a>
        ${account.servicePublished ? `<label>Enlace para compartir<input type="url" readonly value="${esc(origin+link)}"></label><a class="action" href="${link}">Abrir página de prueba</a><a class="action" href="${link}/qr">Descargar QR</a>
          <form method="post" action="${editor}/retirar">${csrf(account)}<button class="secondary-action">Retirar página de prueba</button></form>` : ''}
      </section>${reviews.serviceOwner(account)}`);
  };

  const servicePage = (account, preview) => {
    const info = preview ? account.service || {} : account.servicePublished;
    const url = publicUrl(account);
    const socials = renderSocialLinks(info.social);
    const appointment = `<form method="dialog" data-service-appointment data-phone="${preview ? '' : esc(info.whatsapp)}">
      <h3>Pide una cita a domicilio</h3>
      <label>Dirección del servicio<input name="address" autocomplete="street-address" maxlength="180" required placeholder="Calle y número, urbanización o barrio"></label>
      <label>Pueblo o ciudad<input name="city" autocomplete="address-level2" maxlength="80" required></label>
      <label>Estado o territorio<input name="region" autocomplete="address-level1" maxlength="60" required></label>
      <label>Punto de referencia (opcional)<input name="landmark" maxlength="120"></label>
      <p>Revisa la dirección antes de enviarla. El negocio te confirmará si puede llegar y qué horarios tiene.</p>
      <button type="submit" disabled>Revisar dirección</button>
      <div data-appointment-confirmation hidden>
        <h4>Confirma la dirección del servicio</h4>
        <p data-appointment-address class="special-description" tabindex="-1"></p>
        ${preview ? '<p>Vista previa. Al publicar, tus clientes podrán enviar la solicitud por WhatsApp.</p>' : '<a class="action" data-appointment-whatsapp rel="noreferrer">Dirección correcta · Abrir WhatsApp</a>'}
        <button type="button" class="secondary-action" data-appointment-edit>Editar dirección</button>
      </div>
      <noscript>Activa JavaScript para preparar la solicitud de cita.</noscript>
    </form><script src="/js/pb-service-appointment.js" defer></script>`;
    const publish = demoAccess && account.demo && complete(info)
      ? `<form method="post" action="${editor}/publicar">${csrf(account)}<button>Publicar página de prueba</button></form>`
      : '<p>Completa el nombre, la zona, los servicios y el WhatsApp para probar la publicación en la demo.</p>';
    return page(info.name || 'Vista previa de servicios',`
      ${preview ? `<section class="card"><h2>Vista previa privada</h2><a class="action" href="${editor}">Seguir editando</a>${publish}</section>`
        : '<p class="notice">Página de prueba · negocio ficticio</p>'}
      ${info.photo ? `<img class="menu-photo" src="${preview ? editor : url}/foto" alt="Foto del trabajo de ${esc(info.name)}">` : ''}
      <section class="card"><h2>Servicios</h2><p class="special-description">${esc(info.work)}</p></section>
      ${socials ? `<nav aria-label="Redes sociales">${socials}</nav>` : ''}
      <section class="card"><h2>Zona de servicio y citas</h2><p>${esc(info.area)}</p>
        ${info.hours ? `<p>${esc(info.hours)}</p>` : ''}${appointment}</section>${preview ? '' : reviews.publicSection(account,'service')}`);
  };

  app.get(editor,owner,(req,res)=>res.send(form(req.truck)));
  app.post(editor,owner,(req,res)=>{
    const info = {
      name:clean(req.body.name,100),area:clean(req.body.area,200),work:clean(req.body.work,1000),
      category:req.body.category==='mechanic' ? 'mechanic' : 'service',
      hours:clean(req.body.hours,160),whatsapp:clean(req.body.whatsapp,35).replace(/\D/g,'')
    };
    const social = parseSocialLinks(req.body);
    const draft = {...req.truck,service:{...req.truck.service,...info,social:Object.fromEntries(
      Object.keys(networks).map(key=>[key,clean(req.body[key],500)])
    )}};
    if (/^\d{10}$/.test(info.whatsapp)) info.whatsapp = '1'+info.whatsapp;
    if (!complete(info) || !/^[1-9]\d{7,14}$/.test(info.whatsapp)) {
      return res.status(400).send(form(draft,'Completa los campos y verifica el número de WhatsApp.'));
    }
    if (!social) return res.status(400).send(form(draft,'Verifica que cada enlace corresponda a su red social y empiece con https://.'));
    update(req,account=>{account.service={...account.service,...info,social};});
    res.redirect(303,editor);
  });

  app.get(editor+'/vista-previa',owner,(req,res)=>res.send(servicePage(req.truck,true)));
  app.get(editor+'/foto',owner,(req,res)=>{
    if (!req.truck.service?.photo) return res.sendStatus(404);
    res.type('webp').sendFile(photoFile(req.truck,req.truck.service.photo));
  });

  app.post(editor+'/foto',owner,async(req,res)=>{
    const encoded = clean(req.body.photo,2_000_001);
    let image;
    try {
      if (!encoded || encoded.length > 2_000_000 || !/^[A-Za-z0-9+/]+={0,2}$/.test(encoded)) throw new Error('Invalid image');
      const source = sharp(Buffer.from(encoded,'base64'),{limitInputPixels:6_000_000});
      if (!['jpeg','png','webp'].includes((await source.metadata()).format)) throw new Error('Invalid format');
      image = await source.rotate().resize({width:1440,height:1600,fit:'inside',withoutEnlargement:true}).webp({quality:83}).toBuffer();
    } catch {
      return res.status(400).send(form(req.truck,'Prueba con una foto JPG, PNG o WebP.'));
    }
    const photo = randomUUID();
    const target = photoFile(req.truck,photo);
    const temp = target+'.'+randomUUID()+'.tmp';
    try {
      await fs.mkdir(path.dirname(target),{recursive:true});
      await fs.writeFile(temp,image,{mode:0o600});
      await fs.rename(temp,target);
    } finally {
      await fs.rm(temp,{force:true});
    }
    const stale = update(req,account=>{
      const previous = account.service?.photo;
      account.service={...account.service,photo};
      return previous && previous!==account.servicePublished?.photo ? previous : null;
    });
    if (stale) await fs.rm(photoFile(req.truck,stale),{force:true});
    res.redirect(303,editor+'#foto');
  });

  app.post(editor+'/publicar',owner,async(req,res)=>{
    if (!demoAccess || !req.truck.demo || !complete(req.truck.service)) return res.sendStatus(409);
    const stale = update(req,account=>{
      const previous = account.servicePublished?.photo;
      account.servicePublished={...account.service};
      return previous && previous!==account.service.photo ? previous : null;
    });
    if (stale) await fs.rm(photoFile(req.truck,stale),{force:true});
    res.redirect(303,editor);
  });

  app.post(editor+'/retirar',owner,async(req,res)=>{
    const stale = update(req,account=>{
      const previous = account.servicePublished?.photo;
      delete account.servicePublished;
      return previous && previous!==account.service?.photo ? previous : null;
    });
    if (stale) await fs.rm(photoFile(req.truck,stale),{force:true});
    res.redirect(303,editor);
  });

  const published = (req,res,next) => {
    const records = read();
    const account = Object.hasOwn(records,req.params.id) ? records[req.params.id] : null;
    if (!account?.servicePublished) return res.sendStatus(404);
    res.set({'Cache-Control':'no-store','X-Robots-Tag':'noindex'});
    req.serviceAccount = account;
    next();
  };
  app.get(publicBase+'/:id',published,(req,res)=>res.send(servicePage(req.serviceAccount,false)));
  app.get(publicBase+'/:id/foto',published,(req,res)=>{
    if (!req.serviceAccount.servicePublished.photo) return res.sendStatus(404);
    res.type('webp').sendFile(photoFile(req.serviceAccount,req.serviceAccount.servicePublished.photo));
  });
  app.get(publicBase+'/:id/qr',published,async(req,res)=>{
    const qr = await QRCode.toBuffer(origin+publicUrl(req.serviceAccount),{width:640});
    res.type('png').attachment('pagina-servicios-pb.png').send(qr);
  });
}

module.exports = {mountServicePages, editor, access};
