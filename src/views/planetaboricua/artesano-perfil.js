const esc = value => String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeUrl = value => {
  const raw = String(value || '').replace(/[\u200B-\u200D\u2060\uFEFF]/g, '').replace(/&amp;/g, '&').trim();
  if (!raw || /^(n\/?a|no|ninguno|no tengo|notengo|facebook)$/i.test(raw) || /^(javascript|data):/i.test(raw)) return '';
  try {
    const url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
    return /^https?:$/.test(url.protocol) && url.hostname.includes('.') ? url.href : '';
  } catch (_) { return ''; }
};
const socialUrl = (value, network) => {
  const raw = String(value || '').replace(/&amp;/g, '&').trim().replace(/^@/, '');
  if (!raw || /^(n\/?a|no|ninguno|no tengo|notengo)$/i.test(raw)) return '';
  if (/^(https?:\/\/|www\.)/i.test(raw) || raw.includes(`${network}.com/`)) return safeUrl(raw);
  return /^[a-zA-Z0-9._]+$/.test(raw) ? `https://${network}.com/${raw}` : '';
};

module.exports = function artesanoPerfil(item, helpers) {
  const { categoryLabel, locationLabel, slug, events = [] } = helpers;
  const title = esc(item.name);
  const description = esc(item.fullDesc || item.desc || 'Artesanía puertorriqueña hecha con dedicación.');
  const shortDescription = esc(item.desc || 'Artesanía puertorriqueña.');
  const image = safeUrl(item.photo) || 'https://www.masboricuaqueunmofongo.com/img/og-planetaboricua.jpg';
  const canonical = `https://www.masboricuaqueunmofongo.com/artesanos/${slug}`;
  const social = [];
  if (item.whatsapp) social.push(`<a class="btn wa" href="https://wa.me/${String(item.whatsapp).replace(/[^0-9]/g,'')}" target="_blank" rel="noopener">WhatsApp</a>`);
  const websiteUrl = safeUrl(item.website);
  const instagramUrl = socialUrl(item.instagram, 'instagram');
  const facebookUrl = socialUrl(item.facebook, 'facebook');
  const storeUrl = safeUrl(item.etsy);
  if (websiteUrl) social.push(`<a class="btn" href="${esc(websiteUrl)}" target="_blank" rel="noopener">Página web</a>`);
  if (instagramUrl) social.push(`<a class="btn secondary" href="${esc(instagramUrl)}" target="_blank" rel="noopener">Instagram</a>`);
  if (facebookUrl) social.push(`<a class="btn secondary" href="${esc(facebookUrl)}" target="_blank" rel="noopener">Facebook</a>`);
  if (storeUrl && storeUrl !== websiteUrl) social.push(`<a class="btn secondary" href="${esc(storeUrl)}" target="_blank" rel="noopener">Tienda online</a>`);
  social.push(`<a class="btn secondary" href="/artesanos/${encodeURIComponent(slug)}/compartir-evento">Publicar evento</a>`);
  const eventList = events.map(event => `<a href="/agenda-boricua" style="display:block;background:#fff;padding:1rem;border-radius:8px;text-decoration:none;color:#111;border:1px solid #e5e5e0"><strong>${esc(event.startDate)} · ${esc(event.name)}</strong><br><span style="font-size:.8rem;color:#666">${esc(event.city)}, ${esc(event.region)}</span></a>`).join('');
  const eventSection = eventList ? `<section class="upcoming"><div class="upcoming-head"><div><div class="eyebrow">Agenda Boricua</div><h2>Próximos eventos</h2></div><a href="/agenda-boricua">Ver agenda completa →</a></div><div class="event-list">${eventList}</div></section>` : '';
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} — Artesanos Puertorriqueños</title><meta name="description" content="${shortDescription}"><link rel="canonical" href="${canonical}"><meta property="og:type" content="profile"><meta property="og:title" content="${title} — Feria Digital de Artesanías Puertorriqueñas"><meta property="og:description" content="${shortDescription}"><meta property="og:image" content="${esc(image)}"><meta property="og:url" content="${canonical}"><style>*{box-sizing:border-box}body{margin:0;font-family:Inter,system-ui,sans-serif;background:#f5f5f0;color:#161616}nav{background:#fff;border-bottom:3px solid #ce1126;padding:1rem 5%;display:flex;justify-content:space-between;gap:1rem}nav a{color:#002d62;text-decoration:none;font-weight:700}.wrap{max-width:1000px;margin:2rem auto;padding:0 1rem}.profile{display:grid;grid-template-columns:minmax(280px,1fr) 1.15fr;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px #0001}.photo{width:100%;height:100%;min-height:430px;object-fit:cover}.content{padding:clamp(1.5rem,5vw,3rem)}.eyebrow{color:#ce1126;text-transform:uppercase;letter-spacing:.09em;font-size:.72rem;font-weight:800}h1{font-family:Georgia,serif;font-size:clamp(2rem,5vw,3.2rem);line-height:1.05;margin:.6rem 0}h2{font-family:Georgia,serif;margin:.4rem 0}.location{color:#666;margin-bottom:1.5rem}.description{font-size:1rem;line-height:1.75;white-space:pre-line}.actions{display:flex;gap:.7rem;flex-wrap:wrap;margin-top:1.8rem}.btn{background:#002d62;color:#fff!important;padding:.75rem 1rem;border-radius:7px;text-decoration:none}.btn.wa{background:#178c49}.btn.secondary{background:#fff;color:#002d62!important;border:1px solid #ccd3df}.upcoming{margin:1.3rem 0;background:#fff;border-radius:12px;padding:1.3rem}.upcoming-head{display:flex;justify-content:space-between;align-items:end;gap:1rem;flex-wrap:wrap}.upcoming-head>a{color:#002d62;font-weight:800;text-decoration:none}.event-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:.7rem;margin-top:1rem}.note{max-width:1000px;margin:1.2rem auto;padding:1rem;background:#fff;border-left:4px solid #002d62;color:#555;font-size:.82rem;line-height:1.6}.share{text-align:center;margin:2rem 0}.share a{color:#ce1126;font-weight:700}@media(max-width:720px){.profile{grid-template-columns:1fr}.photo{height:320px;min-height:0}}</style><script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'LocalBusiness',name:item.name,description:item.fullDesc||item.desc,image,areaServed:locationLabel,url:canonical})}</script></head><body><nav><a href="/">🇵🇷 Planeta Boricua</a><a href="/feria-artesanos">← Volver a la Feria</a></nav><main class="wrap"><article class="profile"><img class="photo" src="${esc(image)}" alt="Trabajo artesanal de ${title}"><div class="content"><div class="eyebrow">${esc(categoryLabel)}</div><h1>${title}</h1><div class="location">📍 ${esc(locationLabel)}</div><div class="description">${description}</div>${item.price ? `<p><strong>Rango de precios:</strong> ${esc(item.price)}</p>`:''}<div class="actions">${social.join('')}</div></div></article>${eventSection}<aside class="note"><strong>Información provista por el participante.</strong> Planeta Boricua presenta a artesanos independientes. Compras, pagos, entregas y acuerdos se coordinan directamente con cada artesano.</aside><div class="share"><a href="https://wa.me/?text=${encodeURIComponent(item.name+' '+canonical)}" target="_blank" rel="noopener">Compartir este perfil por WhatsApp</a></div></main></body></html>`;
};
