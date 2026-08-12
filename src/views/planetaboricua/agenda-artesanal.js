const esc = (value) =>
  String(value || "").replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
const areaOf = (event) =>
  event.virtual
    ? "virtual"
    : /^(puerto rico|pr)$/i.test(event.country || "") ||
        /^puerto rico$/i.test(event.region || "")
      ? "pr"
      : "usa";

module.exports = function agendaBoricua(events = []) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcoming = events
    .filter((e) => new Date(`${e.endDate || e.startDate}T23:59:59`) >= today)
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  const cards = upcoming
    .map((event) => {
      const date = new Date(`${event.startDate}T12:00:00`);
      const month = date
        .toLocaleDateString("es-PR", { month: "short" })
        .replace(".", "");
      const location = event.virtual
        ? "Evento virtual"
        : [event.venue, event.city, event.region].filter(Boolean).join(" · ");
      const presenter = event.artisanSlug
        ? `Presentado por <a href="/artesanos/${encodeURIComponent(event.artisanSlug)}">${esc(event.artisanName)}</a>`
        : `Organizado por <strong>${esc(event.organizerName || event.sourceLabel || "Organización comunitaria")}</strong>`;
      const region =
        areaOf(event) === "pr"
          ? event.city
          : [event.region, event.city].filter(Boolean).join(" — ");
      if (!event.image) event.image = "/img/agenda-boricua-placeholder.svg";
      return `<article class="event-card" data-area="${areaOf(event)}" data-region="${esc(region).toLowerCase()}" data-city="${esc(event.city).toLowerCase()}">${event.image ? `<img src="${esc(event.image)}" alt="Afiche de ${esc(event.name)}" loading="lazy">` : ""}<div class="event-content"><div class="date"><strong>${date.getDate()}</strong><span>${esc(month)}</span></div><div class="event-copy"><div class="type">${esc(event.type || "Evento cultural")}</div><h2>${esc(event.name)}</h2><p class="where">📍 ${esc(location)}</p>${event.time ? `<p><strong>Horario:</strong> ${esc(event.time)}</p>` : ""}<p>${esc(event.description)}</p><div class="presenter">${presenter}</div><div class="actions">${event.eventUrl ? `<a href="${esc(event.eventUrl)}" target="_blank" rel="noopener">Información oficial</a>` : ""}<a href="https://wa.me/?text=${encodeURIComponent(event.name + " https://www.masboricuaqueunmofongo.com/agenda-boricua")}" target="_blank" rel="noopener">Compartir</a></div></div></div></article>`;
    })
    .join("");
  const locations = upcoming.map((event) => ({
    area: areaOf(event),
    region:
      areaOf(event) === "pr"
        ? event.city
        : [event.region, event.city].filter(Boolean).join(" — "),
    city: event.city,
  }));
  const schema = upcoming.map((e) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.name,
    startDate: e.startDate,
    endDate: e.endDate || e.startDate,
    eventAttendanceMode: e.virtual
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    isAccessibleForFree: true,
    location: e.virtual
      ? {
          "@type": "VirtualLocation",
          url:
            e.eventUrl ||
            "https://www.masboricuaqueunmofongo.com/agenda-boricua",
        }
      : {
          "@type": "Place",
          name: e.venue || e.city,
          address: [e.address, e.city, e.region].filter(Boolean).join(", "),
        },
    image: e.image ? [e.image] : undefined,
    description: e.description,
    url: e.eventUrl || "https://www.masboricuaqueunmofongo.com/agenda-boricua",
  }));
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Agenda Boricua — Eventos gratuitos en Puerto Rico y Estados Unidos</title><meta name="description" content="Descubre eventos boricuas gratuitos en Puerto Rico y Estados Unidos, organizados por fecha, pueblo, estado y ciudad."><link rel="canonical" href="https://www.masboricuaqueunmofongo.com/agenda-boricua"><script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script><style>*{box-sizing:border-box}body{margin:0;font-family:Inter,system-ui,sans-serif;background:#f5f5f0;color:#151515}nav{background:#fff;border-bottom:3px solid #ce1126;padding:1rem 5%;display:flex;justify-content:space-between;gap:1rem}nav a{color:#002d62;text-decoration:none;font-weight:800}.hero{background:linear-gradient(135deg,#002d62,#184b80);color:#fff;padding:4rem 1rem;text-align:center}.hero h1{font-family:Georgia,serif;font-size:clamp(2rem,5vw,3.3rem);margin:0 0 .8rem}.hero p{max-width:720px;margin:auto;line-height:1.7;color:#ffffffd6}.wrap{max-width:1050px;margin:2rem auto;padding:0 1rem}.top{display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;margin-bottom:1.3rem}.top h2{font-family:Georgia,serif;margin-bottom:.3rem}.btn{background:#ce1126;color:#fff;padding:.75rem 1rem;border-radius:7px;text-decoration:none;font-weight:800}.filters{display:grid;grid-template-columns:1fr 1fr;gap:.8rem;background:#fff;border:1px solid #e4e4df;border-radius:12px;padding:1rem;margin-bottom:1.2rem}.filters label{font-size:.7rem;font-weight:900;color:#002d62;text-transform:uppercase}.filters select{width:100%;margin-top:.35rem;padding:.75rem;border:1px solid #d7d7d1;border-radius:7px;background:#fff}.events{display:grid;gap:1rem}.event-card{display:grid;grid-template-columns:260px 1fr;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e4e4df}.event-card>img{width:100%;height:100%;min-height:260px;object-fit:cover}.event-content{display:flex;padding:1.3rem;gap:1rem}.date{background:#002d62;color:#fff;width:65px;height:72px;border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;flex-shrink:0;text-transform:uppercase}.date strong{font-size:1.5rem}.date span{font-size:.7rem}.type{color:#ce1126;text-transform:uppercase;font-size:.68rem;font-weight:900;letter-spacing:.08em}.event-copy h2{font-family:Georgia,serif;margin:.35rem 0}.event-copy p{color:#626262;line-height:1.55;font-size:.87rem}.where{font-weight:700}.presenter{font-size:.78rem}.presenter a{color:#002d62;font-weight:800}.actions{display:flex;gap:.5rem;flex-wrap:wrap;margin-top:1rem}.actions a{background:#eef2f8;color:#002d62;padding:.5rem .7rem;border-radius:5px;text-decoration:none;font-size:.75rem;font-weight:800}.empty{text-align:center;background:#fff;padding:4rem 1rem;border-radius:12px;color:#666}.no-results{display:none;text-align:center;background:#fff;padding:2rem;border-radius:12px;color:#666}.note{margin-top:2rem;padding:1rem;border-left:4px solid #002d62;background:#fff;color:#666;font-size:.8rem;line-height:1.6}@media(max-width:700px){.filters{grid-template-columns:1fr}.event-card{grid-template-columns:1fr}.event-card>img{height:230px;min-height:0}.event-content{padding:1rem}.hero{padding:3rem 1rem}}</style></head><body><nav><a href="/">🇵🇷 Planeta Boricua</a><a href="/feria-artesanos">Artesanos</a></nav><header class="hero"><h1>Agenda Boricua</h1><p>Actividades gratuitas que celebran nuestra cultura en Puerto Rico y en la diáspora. Busca por pueblo, estado o ciudad.</p></header><main class="wrap"><div class="top"><div><h2>Próximos eventos</h2><p><span id="event-count">${upcoming.length}</span> evento${upcoming.length === 1 ? "" : "s"} en agenda</p></div><a class="btn" href="/compartir-evento-boricua">Comparte un evento gratis</a></div>${upcoming.length ? `<section class="filters"><label>Área<select id="area-filter"><option value="all">Todos</option><option value="pr">Puerto Rico</option><option value="usa">Estados Unidos</option><option value="virtual">Virtual</option></select></label><label>Ubicación<select id="location-filter"><option value="all">Todas las ubicaciones</option></select></label></section>` : ""}<section class="events">${cards || '<div class="empty"><div style="font-size:3rem">📅</div><h2>La agenda está comenzando</h2><p>Pronto encontrarás aquí actividades boricuas gratuitas dentro y fuera de Puerto Rico.</p><p><a class="btn" href="/compartir-evento-boricua">Comparte la primera</a></p></div>'}</section><div class="no-results" id="no-results">No hay eventos próximos para esa ubicación.</div><aside class="note"><strong>Confirma antes de asistir.</strong> Publicar una actividad gratuita en Planeta Boricua no tiene costo. La información puede cambiar. Planeta Boricua no organiza ni garantiza estos eventos salvo que se indique expresamente.</aside></main><script>const locationData=${JSON.stringify(locations).replace(/</g, "\\u003c")};const area=document.getElementById('area-filter'),locationSelect=document.getElementById('location-filter');function clean(v){return String(v||'').trim().toLowerCase()}function fillLocations(){if(!area)return;const selected=area.value;const values=[...new Set(locationData.filter(x=>selected==='all'||x.area===selected).map(x=>selected==='pr'?x.city:x.region).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'es'));locationSelect.innerHTML='<option value="all">Todas las ubicaciones</option>'+values.map(v=>'<option value="'+clean(v).replace(/"/g,'&quot;')+'">'+v+'</option>').join('');filterEvents()}function filterEvents(){const selectedArea=area?area.value:'all',selectedLocation=locationSelect?locationSelect.value:'all';let visible=0;document.querySelectorAll('.event-card').forEach(card=>{const show=(selectedArea==='all'||card.dataset.area===selectedArea)&&(selectedLocation==='all'||card.dataset.region===selectedLocation||card.dataset.city===selectedLocation);card.style.display=show?'grid':'none';if(show)visible++});const count=document.getElementById('event-count');if(count)count.textContent=visible;const none=document.getElementById('no-results');if(none)none.style.display=visible?'none':'block'}if(area){area.addEventListener('change',fillLocations);locationSelect.addEventListener('change',filterEvents);fillLocations()}</script></body></html>`;
};
