const { renderExplorePB } = require('./explore-pb');
const {
  SITE_URL,
  eventSlug,
  eventPath,
  eventPageUrl,
  locationText,
  googleCalendarUrl,
  mapsUrl
} = require('../../services/pb-event-tools');

const esc = value => String(value || '').replace(/[&<>"']/g, char => ({
  '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
}[char]));

function absoluteImage(value) {
  const image = String(value || '/img/agenda-boricua-placeholder.svg');
  if (/^https?:\/\//i.test(image)) return image;
  return `${SITE_URL}${image.startsWith('/') ? '' : '/'}${image}`;
}

function dateLabel(event) {
  const format = value => new Date(`${value}T12:00:00`).toLocaleDateString('es-PR', {
    weekday:'long', day:'numeric', month:'long', year:'numeric'
  });
  if (!event.endDate || event.endDate === event.startDate) return format(event.startDate);
  return `${format(event.startDate)} al ${format(event.endDate)}`;
}

function relatedEventCards(events) {
  if (!events.length) return '';
  return `<section class="related"><h2>Otros eventos que te pueden interesar</h2><div class="related-grid">${events.map(item => `<a href="${esc(eventPath(item))}"><strong>${esc(item.name)}</strong><span>${esc(dateLabel(item))}</span><span>📍 ${esc(item.virtual ? 'Virtual' : [item.city,item.region].filter(Boolean).join(', '))}</span></a>`).join('')}</div></section>`;
}

module.exports = function eventoBoricua(event, { relatedEvents = [], recommendations = [] } = {}) {
  if (!event) return '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Evento no encontrado — Planeta Boricua</title></head><body><main style="max-width:700px;margin:4rem auto;padding:1rem;font-family:system-ui"><h1>Evento no encontrado</h1><p>Esta actividad no está disponible en Agenda Boricua.</p><a href="/agenda-boricua">Ver próximos eventos</a></main></body></html>';

  const slug = eventSlug(event);
  const canonical = eventPageUrl(event);
  const image = absoluteImage(event.image);
  const location = event.virtual ? 'Evento virtual' : locationText(event);
  const directions = mapsUrl(event);
  const googleCalendar = googleCalendarUrl(event);
  const organizer = event.organizerName || event.sourceLabel || event.artisanName || 'Organización comunitaria';
  const description = String(event.description || '').slice(0, 300);
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(`${event.name} 🇵🇷\n${dateLabel(event)}\n${canonical}`)}`;
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonical)}`;
  const official = /^https?:\/\//i.test(String(event.eventUrl || '')) ? event.eventUrl : '';
  const calendarPath = `${eventPath(event)}/calendario.ics`;
  const schema = JSON.stringify({
    '@context':'https://schema.org',
    '@type':'Event',
    name:event.name,
    description:event.description,
    startDate:event.startDate,
    endDate:event.endDate || event.startDate,
    eventStatus:'https://schema.org/EventScheduled',
    eventAttendanceMode:event.virtual
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    isAccessibleForFree:true,
    image:[image],
    url:canonical,
    ...(official ? { sameAs:official } : {}),
    location:event.virtual
      ? { '@type':'VirtualLocation', url:official || canonical }
      : {
          '@type':'Place',
          ...(event.venue ? { name:event.venue } : {}),
          address:{
            '@type':'PostalAddress',
            ...(event.address ? { streetAddress:event.address } : {}),
            ...(event.city ? { addressLocality:event.city } : {}),
            ...(event.region ? { addressRegion:event.region } : {}),
            addressCountry:/puerto rico/i.test(event.country || event.region || '') ? 'PR' : 'US'
          }
        },
    organizer:{ '@type':'Organization', name:organizer, ...(official ? { url:official } : {}) },
    offers:{ '@type':'Offer', price:0, priceCurrency:'USD', availability:'https://schema.org/InStock', url:canonical, validFrom:event.approvedAt || event.startDate }
  }).replace(/</g, '\\u003c');
  const explore = renderExplorePB(recommendations);
  const shareData = JSON.stringify({ title:event.name, text:`${event.name} — Agenda Boricua`, url:canonical }).replace(/</g, '\\u003c');

  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#002d62"><title>${esc(event.name)} — Agenda Boricua</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${canonical}"><meta property="og:type" content="website"><meta property="og:site_name" content="Planeta Boricua"><meta property="og:locale" content="es_PR"><meta property="og:title" content="${esc(event.name)} — Agenda Boricua"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${esc(image)}"><meta name="twitter:card" content="summary_large_image"><script type="application/ld+json">${schema}</script><style>
*{box-sizing:border-box}body{margin:0;background:#f5f5f0;color:#171717;font-family:Inter,system-ui,sans-serif}nav{background:#fff;border-bottom:3px solid #ce1126;padding:1rem 5%;display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap}nav a{color:#002d62;text-decoration:none;font-weight:850}.wrap{max-width:1050px;margin:2rem auto;padding:0 1rem}.breadcrumb{font-size:.78rem;margin-bottom:1rem}.breadcrumb a{color:#002d62;font-weight:800;text-decoration:none}.event{display:grid;grid-template-columns:minmax(280px,.9fr) minmax(0,1.1fr);background:#fff;border:1px solid #e4e4df;border-radius:16px;overflow:hidden;box-shadow:0 10px 32px #002d620d}.poster{display:grid;place-items:center;background:#edf1f5;min-height:520px;padding:.75rem}.poster img{display:block;width:100%;height:100%;max-height:650px;object-fit:contain;border-radius:10px}.content{padding:clamp(1.4rem,5vw,3rem)}.type{color:#ce1126;font-size:.7rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase}h1,h2{font-family:Georgia,serif;color:#002d62}h1{font-size:clamp(2rem,5vw,3.25rem);line-height:1.08;margin:.55rem 0 1rem}.date{font-size:1.05rem;font-weight:900;color:#002d62;text-transform:capitalize}.where{font-weight:750}.description{font:1.04rem/1.75 Georgia,serif;white-space:pre-line}.facts{border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;margin:1.3rem 0;padding:.9rem 0}.facts p{margin:.45rem 0;color:#565f6c}.actions{display:flex;gap:.55rem;flex-wrap:wrap;margin-top:1.3rem}.action{border:0;border-radius:8px;background:#002d62;color:#fff;padding:.75rem .92rem;text-decoration:none;font:800 .8rem/1.1 Inter,system-ui,sans-serif;cursor:pointer}.action.red{background:#ce1126}.action.green{background:#128c4a}.action.light{background:#eef2f8;color:#002d62}.status{min-height:1.2rem;color:#526174;font-size:.78rem;font-weight:700}.notice,.publish{margin-top:1.25rem;border-radius:12px;padding:1.1rem}.notice{background:#fff;border-left:4px solid #002d62;color:#626262;font-size:.8rem;line-height:1.55}.publish{background:linear-gradient(135deg,#002d62,#184b80);color:#fff;display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap}.publish strong{font-family:Georgia,serif;font-size:1.2rem}.publish p{margin:.25rem 0;color:#e2ebf5;font-size:.85rem}.publish a{background:#ce1126;color:#fff;text-decoration:none;border-radius:8px;padding:.75rem 1rem;font-weight:900}.related{margin-top:2rem}.related h2{margin-bottom:.8rem}.related-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:.8rem}.related-grid a{display:flex;flex-direction:column;gap:.4rem;background:#fff;border:1px solid #e1e5ea;border-radius:10px;padding:1rem;text-decoration:none;color:#5f6670}.related-grid strong{color:#002d62;font-family:Georgia,serif}.related-grid span{font-size:.76rem;text-transform:capitalize}@media(max-width:760px){.event{grid-template-columns:1fr}.poster{min-height:0;height:min(110vw,520px)}.content{padding:1.25rem}.action{flex:1 1 calc(50% - .55rem);text-align:center}.related-grid{grid-template-columns:1fr}.publish a{width:100%;text-align:center}}
</style></head><body><nav><a href="/">🇵🇷 Planeta Boricua</a><a href="/agenda-boricua">← Agenda Boricua</a></nav><main class="wrap"><div class="breadcrumb"><a href="/">Inicio</a> / <a href="/agenda-boricua">Agenda Boricua</a> / ${esc(event.name)}</div><article class="event"><div class="poster"><img src="${esc(image)}" alt="Afiche de ${esc(event.name)}"></div><div class="content"><div class="type">${esc(event.type || 'Evento boricua')}</div><h1>${esc(event.name)}</h1><p class="date">📅 ${esc(dateLabel(event))}</p><p class="where">📍 ${esc(location)}</p>${event.time ? `<p><strong>Horario anunciado:</strong> ${esc(event.time)}</p>` : ''}<div class="description">${esc(event.description)}</div><div class="facts"><p><strong>Organiza:</strong> ${esc(organizer)}</p><p><strong>Entrada:</strong> ${esc(event.cost || 'Gratis')}</p>${event.artisanSlug ? `<p><strong>Participa:</strong> <a href="/artesanos/${encodeURIComponent(event.artisanSlug)}">${esc(event.artisanName || 'Artesano de Planeta Boricua')}</a></p>` : ''}</div><div class="actions"><button class="action red" id="share-event" type="button" data-event-action="share">Compartir evento</button><a class="action" href="${esc(calendarPath)}" data-event-action="calendar">Guardar en calendario</a><a class="action light" href="${esc(googleCalendar)}" target="_blank" rel="noopener" data-event-action="google-calendar">Google Calendar</a>${directions ? `<a class="action light" href="${esc(directions)}" target="_blank" rel="noopener" data-event-action="directions">Cómo llegar</a>` : ''}${official ? `<a class="action light" href="${esc(official)}" target="_blank" rel="noopener" data-event-action="official">Información oficial</a>` : ''}<a class="action green" href="${esc(whatsapp)}" target="_blank" rel="noopener" data-event-action="whatsapp">WhatsApp</a><a class="action light" href="${esc(facebook)}" target="_blank" rel="noopener" data-event-action="facebook">Facebook</a><button class="action light" id="copy-event" type="button" data-event-action="copy">Copiar enlace</button></div><p class="status" id="share-status" role="status"></p></div></article><aside class="notice"><strong>Confirma antes de asistir.</strong> La información puede cambiar. Consulta la fuente oficial o al organizador antes de salir. Planeta Boricua no organiza ni garantiza esta actividad salvo que se indique expresamente.</aside><section class="publish"><div><strong>¿Organizas una actividad boricua gratuita?</strong><p>Compártela con Planeta Boricua para que podamos evaluarla para Agenda Boricua.</p></div><a href="/compartir-evento-boricua">Publica un evento gratis</a></section>${relatedEventCards(relatedEvents)}${explore}</main><script>(()=>{const slug=${JSON.stringify(slug)},endpoint='/api/pb-evento-metrica/'+encodeURIComponent(slug),shareData=${shareData},status=document.getElementById('share-status');function track(action){try{fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action}),keepalive:true,credentials:'omit'}).catch(()=>{})}catch(_){}}try{const key='pb-event-view:'+slug;if(!sessionStorage.getItem(key)){sessionStorage.setItem(key,'1');track('view')}}catch(_){track('view')}document.querySelectorAll('[data-event-action]').forEach(item=>item.addEventListener('click',()=>track(item.dataset.eventAction),{passive:true}));document.getElementById('share-event').onclick=async()=>{if(navigator.share){try{await navigator.share(shareData);status.textContent='Evento compartido.';return}catch(error){if(error&&error.name==='AbortError')return}}try{await navigator.clipboard.writeText(shareData.url);status.textContent='Enlace copiado. Ya puedes compartirlo.'}catch(_){prompt('Copia el enlace del evento:',shareData.url)}};document.getElementById('copy-event').onclick=async()=>{try{await navigator.clipboard.writeText(shareData.url);status.textContent='Enlace copiado.'}catch(_){prompt('Copia el enlace del evento:',shareData.url)}}})();</script></body></html>`;
};
