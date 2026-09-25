const esc = value => String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeUrl = value => {
  const raw = String(value || '').replace(/[\u200B-\u200D\u2060\uFEFF]/g, '').replace(/&amp;/g, '&').trim();
  if (!raw || /^(n\/?a|no|ninguno|no tengo|notengo|facebook)$/i.test(raw) || /^(javascript|data):/i.test(raw)) return '';
  try {
    const url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
    return /^https?:$/.test(url.protocol) && url.hostname.includes('.') ? url.href : '';
  } catch (_) { return '';
  }
};
const socialUrl = (value, network) => {
  const raw = String(value || '').replace(/&amp;/g, '&').trim().replace(/^@/, '');
  if (!raw || /^(n\/?a|no|ninguno|no tengo|notengo)$/i.test(raw)) return '';
  if (/^(https?:\/\/|www\.)/i.test(raw) || raw.includes(`${network}.com/`)) return safeUrl(raw);
  return /^[a-zA-Z0-9._]+$/.test(raw) ? `https://${network}.com/${raw}` : '';
};
const normalizeCreation = value => {
  if (typeof value === 'string') return {image:safeUrl(value),title:'',description:'',alt:''};
  if (!value || typeof value !== 'object') return null;
  return {
    image:safeUrl(value.image || value.url),
    title:String(value.title || '').trim(),
    description:String(value.description || '').trim(),
    alt:String(value.alt || '').trim()
  };
};
const primaryArtisanContact = item => {
  const phone = String(item.whatsapp || '').replace(/[^0-9]/g,'');
  if (phone) return {href:`https://wa.me/${phone}`,label:'Contactar al artesano',track:'whatsapp'};
  const website = safeUrl(item.website);
  if (website) return {href:website,label:'Conoce más sobre su trabajo',track:'website'};
  const instagram = socialUrl(item.instagram,'instagram');
  if (instagram) return {href:instagram,label:'Conoce más sobre su trabajo',track:'instagram'};
  const facebook = socialUrl(item.facebook,'facebook');
  if (facebook) return {href:facebook,label:'Conoce más sobre su trabajo',track:'facebook'};
  return null;
};
const { renderExplorePB } = require('./explore-pb');
const { renderPBAd } = require('./pb-ad');
const { isIndexablePBArtisan } = require('../../utils/pb-seo');

function artesanoPerfil(item, helpers) {
  const { categoryLabel, locationLabel, slug, events = [], recommendations = [], ad = null } = helpers;
  const title = esc(item.name);
  const description = esc(item.fullDesc || item.desc || 'Artesanía puertorriqueña hecha con dedicación.');
  const shortDescription = esc(item.desc || 'Artesanía puertorriqueña.');
  const image = safeUrl(item.photo) || 'https://www.masboricuaqueunmofongo.com/img/og-planetaboricua.jpg';
  const canonical = `https://www.masboricuaqueunmofongo.com/artesanos/${slug}`;
  const shortUrl = `https://www.masboricuaqueunmofongo.com/a/${slug}`;
  const social = [];
  if (item.whatsapp) social.push(`<a class="btn wa" data-pb-track="whatsapp" href="https://wa.me/${String(item.whatsapp).replace(/[^0-9]/g,'')}" target="_blank" rel="ugc nofollow noopener noreferrer">Contactar por WhatsApp</a>`);
  const websiteUrl = safeUrl(item.website);
  const instagramUrl = socialUrl(item.instagram, 'instagram');
  const facebookUrl = socialUrl(item.facebook, 'facebook');
  const storeUrl = safeUrl(item.etsy);
  if (websiteUrl) social.push(`<a class="btn" data-pb-track="website" href="${esc(websiteUrl)}" target="_blank" rel="ugc nofollow noopener noreferrer">Visitar su página</a>`);
  if (instagramUrl) social.push(`<a class="btn secondary" data-pb-track="instagram" href="${esc(instagramUrl)}" target="_blank" rel="ugc nofollow noopener noreferrer">Ver Instagram</a>`);
  if (facebookUrl) social.push(`<a class="btn secondary" data-pb-track="facebook" href="${esc(facebookUrl)}" target="_blank" rel="ugc nofollow noopener noreferrer">Ver Facebook</a>`);
  if (storeUrl && storeUrl !== websiteUrl) social.push(`<a class="btn secondary" data-pb-track="store" href="${esc(storeUrl)}" target="_blank" rel="ugc nofollow noopener noreferrer">Visitar su tienda</a>`);
  social.push(`<a class="btn secondary" data-pb-track="event" href="/artesanos/${encodeURIComponent(slug)}/compartir-evento">Publicar evento</a>`);
  social.push(`<a class="btn secondary" data-pb-track="qr" href="/artesanos/${encodeURIComponent(slug)}/qr">🔳 Ver y descargar mi QR</a>`);
  social.push(`<a class="btn secondary" data-pb-track="edit" href="/artesanos/mi-perfil">✏️ Editar mi información</a>`);
  const eventList = events.map(event => `<a href="${esc(event.url || '/agenda-boricua')}" style="display:block;background:#fff;padding:1rem;border-radius:8px;text-decoration:none;color:#111;border:1px solid #e5e5e0"><strong>${esc(event.startDate)} · ${esc(event.name)}</strong><br><span style="font-size:.8rem;color:#666">${esc(event.city)}, ${esc(event.region)}</span></a>`).join('');
  const eventSection = eventList ? `<section class="upcoming"><div class="upcoming-head"><div><div class="eyebrow">Agenda Boricua</div><h2>Próximos eventos</h2></div><a href="/agenda-boricua">Ver agenda completa →</a></div><div class="event-list">${eventList}</div></section>` : '';
  const explore = renderExplorePB(recommendations);
  const adHtml = renderPBAd(ad,{placement:'artisan.after_profile',pageSlug:slug});
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#002d62"><link rel="manifest" href="/manifest-pb.json"><link rel="apple-touch-icon" href="/icons/pb/apple-touch-icon.png"><link rel="stylesheet" href="/css/pb-ads.css?v=3"><title>${title} — Artesanos Puertorriqueños</title><meta name="description" content="${shortDescription}"><link rel="canonical" href="${canonical}"><meta property="og:type" content="profile"><meta property="og:title" content="${title} — Feria Digital de Artesanías Puertorriqueñas"><meta property="og:description" content="${shortDescription}"><meta property="og:image" content="${esc(image)}"><meta property="og:url" content="${canonical}"><style>*{box-sizing:border-box}body{margin:0;font-family:Inter,system-ui,sans-serif;background:#f5f5f0;color:#161616}nav{background:#fff;border-bottom:3px solid #ce1126;padding:1rem 5%;display:flex;justify-content:space-between;gap:1rem}nav a{color:#002d62;text-decoration:none;font-weight:700}.wrap{max-width:1000px;margin:2rem auto;padding:0 1rem}.profile{display:grid;grid-template-columns:minmax(280px,1fr) 1.15fr;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px #0001}.photo{width:100%;height:100%;min-height:430px;object-fit:cover}.content{padding:clamp(1.5rem,5vw,3rem)}.eyebrow{color:#ce1126;text-transform:uppercase;letter-spacing:.09em;font-size:.72rem;font-weight:800}h1{font-family:Georgia,serif;font-size:clamp(2rem,5vw,3.2rem);line-height:1.05;margin:.6rem 0}h2{font-family:Georgia,serif;margin:.4rem 0}.location{color:#666;margin-bottom:1.5rem}.description{font-size:1rem;line-height:1.75;white-space:pre-line}.actions{display:flex;gap:.7rem;flex-wrap:wrap;margin-top:1.8rem}.btn{background:#002d62;color:#fff!important;padding:.75rem 1rem;border-radius:7px;text-decoration:none}.btn.wa{background:#178c49}.btn.secondary{background:#fff;color:#002d62!important;border:1px solid #ccd3df}.upcoming{margin:1.3rem 0;background:#fff;border-radius:12px;padding:1.3rem}.upcoming-head{display:flex;justify-content:space-between;align-items:end;gap:1rem;flex-wrap:wrap}.upcoming-head>a{color:#002d62;font-weight:800;text-decoration:none}.event-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:.7rem;margin-top:1rem}.note{max-width:1000px;margin:1.2rem auto;padding:1rem;background:#fff;border-left:4px solid #002d62;color:#555;font-size:.82rem;line-height:1.6}.install-card{display:flex;align-items:center;gap:1rem;margin:1.2rem 0;padding:1rem;background:#eaf2fb;border:1px solid #c4d6eb;border-radius:12px}.install-card[hidden]{display:none}.install-card img{width:58px;height:58px;border-radius:12px}.install-copy{flex:1}.install-copy strong{color:#002d62}.install-copy p{margin:.25rem 0;color:#526174;font-size:.85rem;line-height:1.45}.install-action{border:0;border-radius:8px;background:#ce1126;color:#fff;padding:.75rem 1rem;font-weight:800;cursor:pointer}.install-status{font-size:.78rem;color:#36516e;margin-top:.35rem}.share{text-align:center;margin:2rem 0}.share a{color:#ce1126;font-weight:700}.pb-footer{margin-top:3rem;background:#002d62;color:#fff;padding:2.5rem 5% 1.4rem}.pb-footer-inner{max-width:1000px;margin:auto;display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:2rem}.pb-footer h2{margin:0 0 .45rem;color:#fff}.pb-footer h3{margin:0 0 .75rem;font-size:.9rem;text-transform:uppercase;letter-spacing:.06em}.pb-footer p{color:#dbe5f2;line-height:1.55}.pb-footer a{display:block;color:#fff;text-decoration:none;margin:.5rem 0}.pb-footer a:hover{text-decoration:underline}.pb-footer-bottom{max-width:1000px;margin:1.7rem auto 0;padding-top:1rem;border-top:1px solid #ffffff38;display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;color:#dbe5f2;font-size:.82rem}.pb-footer-bottom a{display:inline;color:#dbe5f2;margin:0 .7rem 0 0}@media(max-width:720px){.profile{grid-template-columns:1fr}.photo{height:320px;min-height:0}.install-card{align-items:flex-start;flex-wrap:wrap}.install-action{width:100%}.pb-footer-inner{grid-template-columns:1fr;gap:1.3rem}}</style><script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'LocalBusiness',name:item.name,description:item.fullDesc||item.desc,image,areaServed:locationLabel,url:canonical})}</script></head><body><nav><a href="/">🇵🇷 Planeta Boricua</a><a href="/feria-artesanos">← Volver a la Feria</a></nav><main class="wrap"><article class="profile"><img class="photo" src="${esc(image)}" alt="Trabajo artesanal de ${title}"><div class="content"><div class="eyebrow">${esc(categoryLabel)}</div><h1>${title}</h1><div class="location">📍 ${esc(locationLabel)}</div><div class="description">${description}</div>${item.price ? `<p><strong>Rango de precios:</strong> ${esc(item.price)}</p>`:''}<div class="actions">${social.join('')}</div></div></article>${eventSection}<aside class="note"><strong>Información provista por el participante.</strong> Planeta Boricua presenta a artesanos independientes. Compras, pagos, entregas y acuerdos se coordinan directamente con cada artesano.</aside>${adHtml}<section class="install-card" id="pb-profile-install" hidden><img src="/icons/pb/icon-192.png" alt="Planeta Boricua"><div class="install-copy"><strong>🇵🇷 Ten Planeta Boricua a un toque</strong><p>Instálala en tu pantalla para volver a la Feria, administrar tu perfil y compartir tus eventos sin buscar la dirección.</p><div class="install-status" id="pb-profile-install-status" role="status"></div></div><button class="install-action" id="pb-profile-install-btn" type="button">Añadir a mi pantalla</button></section><div class="share"><a data-pb-track="share" href="https://wa.me/?text=${encodeURIComponent(item.name+' '+shortUrl)}" target="_blank" rel="noopener">Compartir este perfil por WhatsApp</a></div>${explore}</main><footer class="pb-footer"><div class="pb-footer-inner"><section><h2>🇵🇷 Planeta Boricua</h2><p><strong>Más Boricua que un Mofongo.</strong><br>Un espacio para descubrir, compartir y mantener viva nuestra cultura dentro y fuera de Puerto Rico.</p></section><section><h3>Explora</h3><a href="/feria-artesanos">Feria Digital de Artesanías</a><a href="/agenda-boricua">Agenda Boricua</a><a href="/pueblos">Nuestros Pueblos</a><a href="/lo-mas-reciente">Lo más reciente</a><a href="/blog">Cultura e historias</a></section><section><h3>Participa</h3><a href="/pb/add-negocio">Registra tu artesanía</a><a href="/artesanos/mi-perfil">Administra tu perfil</a><a href="/pueblos">Cuenta la historia de tu pueblo</a><a href="/enviar-evento-boricua">Envía un evento</a><a href="/feria-artesanos">Descubre más artesanos</a></section></div><div class="pb-footer-bottom"><span>© 2026 Planeta Boricua · Más Boricua que un Mofongo 🇵🇷</span><span><a href="/terminos">Términos</a><a href="/privacidad">Privacidad</a><a href="/contacto">Contacto</a></span></div></footer><script>(()=>{const card=document.getElementById('pb-profile-install'),button=document.getElementById('pb-profile-install-btn'),status=document.getElementById('pb-profile-install-status');let prompt=null;const standalone=()=>window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone===true;if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('/sw-pb.js').catch(()=>{}));if(!standalone()&&/iphone|ipad|ipod/i.test(navigator.userAgent))card.hidden=false;window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();prompt=event;if(!standalone())card.hidden=false});window.addEventListener('appinstalled',()=>{prompt=null;card.hidden=true});button.addEventListener('click',async()=>{if(prompt){prompt.prompt();await prompt.userChoice;prompt=null;return}status.textContent=/iphone|ipad|ipod/i.test(navigator.userAgent)?'En Safari, toca Compartir y luego “Añadir a pantalla de inicio”.':'Abre el menú del navegador y selecciona “Instalar aplicación” o “Añadir a pantalla”.'});})();(()=>{const slug=${JSON.stringify(slug)},endpoint='/api/pb-artesano-metrica/'+encodeURIComponent(slug);function send(event){try{fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({event}),keepalive:true,credentials:'omit'}).catch(()=>{})}catch(_){}}try{const key='pb-artisan-view:'+slug;if(!sessionStorage.getItem(key)){sessionStorage.setItem(key,'1');send('view')}}catch(_){send('view')}document.querySelectorAll('[data-pb-track]').forEach(link=>link.addEventListener('click',()=>send(link.dataset.pbTrack),{passive:true}))})();</script><script src="/js/pb-ads.js?v=2" defer></script></body></html>`;
}

module.exports = function artesanoPerfilConResponsable(item, helpers) {
  let html = artesanoPerfil(item, helpers);
  const seen = new Set();
  const gallery = (Array.isArray(item.gallery) ? item.gallery : []).map(normalizeCreation).filter(creation => {
    if (!creation?.image || creation.image === safeUrl(item.photo) || seen.has(creation.image)) return false;
    seen.add(creation.image);
    return true;
  }).slice(0, 12);
  if (gallery.length) {
    const contact = primaryArtisanContact(item);
    const contactHtml = contact ? `<div class="artisan-gallery-contact"><p>¿Quieres conocer más sobre estas creaciones?</p><a class="btn" data-pb-track="${esc(contact.track)}" href="${esc(contact.href)}" target="_blank" rel="ugc nofollow noopener noreferrer">${esc(contact.label)}</a></div>` : '';
    const galleryHtml = `<section class="artisan-gallery" aria-labelledby="artisan-gallery-title"><div class="eyebrow">Una vitrina de su trabajo</div><h2 id="artisan-gallery-title">👐 Mis creaciones</h2><p class="artisan-gallery-intro">Conoce algunas de las piezas y el proceso creativo de ${esc(item.ownerName || item.name)}.</p><div class="artisan-gallery-grid">${gallery.map((creation,index) => `<article class="artisan-creation${creation.title || creation.description ? '' : ' artisan-creation-image-only'}"><a class="artisan-creation-image" href="${esc(creation.image)}" target="_blank" rel="noopener" aria-label="Ver en grande: ${esc(creation.title || `creación ${index + 1}`)}"><img src="${esc(creation.image)}" alt="${esc(creation.alt || `Trabajo adicional de ${item.name}`)}" width="640" height="480" loading="lazy" decoding="async" fetchpriority="low"></a>${creation.title || creation.description ? `<div class="artisan-creation-copy">${creation.title ? `<h3>${esc(creation.title)}</h3>` : ''}${creation.description ? `<p>${esc(creation.description)}</p>` : ''}</div>` : ''}</article>`).join('')}</div>${contactHtml}</section>`;
    html = html.replace(
      '.upcoming{margin:1.3rem 0;background:#fff;border-radius:12px;padding:1.3rem}',
      '.artisan-gallery{margin:1.3rem 0;background:#fff;border-radius:12px;padding:clamp(1.15rem,3vw,1.7rem)}.artisan-gallery h2{color:#002d62}.artisan-gallery-intro{color:#596273;line-height:1.6;margin:.35rem 0 1.1rem}.artisan-gallery-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}.artisan-creation{min-width:0;border:1px solid #e1e6ec;border-radius:12px;overflow:hidden;background:#fff;box-shadow:0 5px 16px #002d620a}.artisan-creation-image{display:block;min-width:0;aspect-ratio:4/3;overflow:hidden;background:#edf1f5}.artisan-creation-image img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .2s ease}.artisan-creation-image:hover img{transform:scale(1.025)}.artisan-creation-copy{min-width:0;padding:.85rem}.artisan-creation-copy h3{font-family:Georgia,serif;color:#002d62;font-size:1.08rem;overflow-wrap:anywhere;margin:0 0 .4rem}.artisan-creation-copy p{white-space:pre-line;color:#4f5968;font-size:.88rem;line-height:1.55;overflow-wrap:anywhere;margin:0}.artisan-gallery-contact{display:flex;justify-content:space-between;align-items:center;gap:1rem;margin-top:1.2rem;padding-top:1.1rem;border-top:1px solid #e3e7ed}.artisan-gallery-contact p{margin:0;color:#4f5968;font-weight:700}@media(max-width:760px){.artisan-gallery-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:520px){.artisan-gallery-grid{grid-template-columns:1fr}.artisan-creation{display:block}.artisan-creation-image{width:100%;height:auto;min-height:0;aspect-ratio:4/3}.artisan-gallery-contact{align-items:stretch;flex-direction:column}.artisan-gallery-contact .btn{text-align:center}}.upcoming{margin:1.3rem 0;background:#fff;border-radius:12px;padding:1.3rem}'
    ).replace('</article>', `</article>${galleryHtml}`);
  }
  html = html.replace(
    '.note{max-width:1000px;margin:1.2rem auto;padding:1rem;background:#fff;border-left:4px solid #002d62;color:#555;font-size:.82rem;line-height:1.6}',
    '.note{max-width:1000px;margin:1.2rem auto;padding:1rem;background:#fff;border-left:4px solid #002d62;border-radius:8px;color:#555;font-size:.82rem;line-height:1.6}.note strong{display:block;color:#002d62;font-size:.92rem;margin-bottom:.2rem}'
  );
  html = html.replace(
    '<aside class="note"><strong>Información provista por el participante.</strong> Planeta Boricua presenta a artesanos independientes. Compras, pagos, entregas y acuerdos se coordinan directamente con cada artesano.</aside>',
    '<aside class="note"><strong>Compra directamente al artesano</strong>Planeta Boricua te ayuda a descubrir y contactar artesanos, pero no procesa pagos ni participa en las transacciones. Antes de realizar una compra o enviar un pago, verifica directamente con el artesano los detalles del producto, precio, forma de pago, envío o entrega. Confiamos en nuestra comunidad; verificar también es parte de comprar responsablemente.</aside>'
  );
  if (!isIndexablePBArtisan(item)) {
    html = html.replace('<link rel="canonical"', '<meta name="robots" content="noindex,follow"><link rel="canonical"');
  }
  if (!item.ownerName) return html;
  return html.replace(
    `<h1>${esc(item.name)}</h1><div class="location">`,
    `<h1>${esc(item.name)}</h1><p style="margin:.1rem 0 .7rem;color:#4f5968"><strong>Artesano/a:</strong> ${esc(item.ownerName)}</p><div class="location">`
  );
};
