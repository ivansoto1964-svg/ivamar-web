const municipalities = require('../../data/pb-municipalities');
const guides = require('../../data/pb-town-guides.json');
const routes = require('../../data/pb-town-routes.json');
const { getTownTravelLinks } = require('../../services/pb-town-travel-links');

const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const relatedStories = {
  adjuntas: [['Las Navidades en casa de mi abuela','/pueblos/adjuntas/historias/las-navidades-en-casa-de-mi-abuela/']],
  lares: [
    ['Lares, el pueblo donde Puerto Rico se atrevió a imaginarse libre','/blog/lares-el-pueblo-donde-puerto-rico-se-atrevio-a-imaginarse-libre'],
    ['La almojábana puertorriqueña y la tradición de Lares','/blog/la-almojabana-puertorriquena-tradicion-sabor-y-orgullo-de-pueblo-en-lares']
  ]
};
const external = 'target="_blank" rel="noopener noreferrer"';

function photoCredit(photo) {
  const license = photo.licenseUrl ? `<a href="${esc(photo.licenseUrl)}" ${external}>${esc(photo.license)}</a>` : esc(photo.license);
  return `<p class="town-photo-credit"><a href="${esc(photo.source)}" ${external}>${esc(photo.title)}</a> · ${esc(photo.author)} · ${license} · versión WebP redimensionada</p>`;
}

function photoImage(photo) {
  return photo ? `<img class="town-cover-photo" src="${esc(photo.path)}" alt="${esc(photo.alt)}" width="${photo.width}" height="${photo.height}" fetchpriority="high" decoding="async">` : '';
}

function mapsLink(place, town) {
  const query = new URLSearchParams({api:'1', query:place + ', ' + town + ', Puerto Rico'});
  return `https://www.google.com/maps/search/?${query}`;
}

function placePhoto(photo) {
  if (!photo) return '';
  return `<figure class="town-place-photo">
    <img src="${esc(photo.path)}" alt="${esc(photo.alt)}" width="${photo.width}" height="${photo.height}" loading="lazy" decoding="async">
    <figcaption>${photoCredit(photo)}</figcaption>
  </figure>`;
}

function stopId(section, index) {
  return `${section}-parada-${index + 1}`;
}

function stopLinks(items, attributes, arrow) {
  return `<ul class="town-stop-links">${items.map(([label,url]) => `<li><a href="${esc(url)}" ${attributes}>${esc(label)} ${arrow}</a></li>`).join('')}</ul>`;
}

function guideCards(town, entries, {showMap = false, photos = {}, section = 'guia-del-pueblo'} = {}) {
  return `<div class="cards">${entries.map(([name, copy, link, linkText, otherLinks = [], visitStatus], index) => {
    const links = link ? [[linkText || 'Más sobre ' + name, link], ...otherLinks] : otherLinks;
    const internal = links.filter(([,url]) => url.startsWith('/'));
    const outbound = links.filter(([,url]) => url.startsWith('https://'));
    if (showMap) outbound.unshift(['Ver mapa de ' + name, mapsLink(name,town)]);
    return `
    <article class="mini town-stop" id="${stopId(section,index)}"><h3>${esc(name)}</h3>${placePhoto(photos[name])}<p>${visitStatus ? `<strong>${esc(visitStatus)}.</strong> ` : ''}${esc(copy)}</p>
      ${internal.length ? stopLinks(internal, '', '→') : ''}
      ${outbound.length ? `<details class="town-visit-links"><summary>${showMap ? 'Mapa y enlaces de visita' : 'Enlaces de visita'}</summary>${stopLinks(outbound, external, '↗')}</details>` : ''}
    </article>`;
  }).join('')}</div>`;
}

function renderGuide(town, guide, slug) {
  const route = routes[slug];
  const routeStops = (route?.stops || []).map(index => {
    const [name] = guide.places[index];
    return `<li><a href="#${stopId('guia-del-pueblo', index)}">${esc(name)}</a></li>`;
  }).join('');
  return `<section class="section town-guide" id="guia-del-pueblo">
    <h2>Qué visitar</h2>
    <div class="town-plan" id="ruta-recomendada"><h3>${esc(route?.title || 'Un plan para empezar')}</h3><p>${esc(route?.copy || guide.plan)}</p>
      ${routeStops ? `<ol class="town-route-stops" aria-label="Paradas de la ruta">${routeStops}</ol>` : ''}
    </div>
    ${guideCards(town, guide.places, {showMap:true, photos:guide.placePhotos})}
  </section>
  ${(guide.sections || []).map(({id,title,entries}) => `<section class="section town-guide" id="${esc(id)}">
    <h2>${esc(title)}</h2>${guideCards(town, entries, {section:id})}</section>`).join('')}`;
}

function renderSources(guide, hasHeroPhoto) {
  return `<section class="section town-guide-sources" id="fuentes"><details><summary>Referencias y créditos de fotos</summary><ul>${guide.sources.map(([label,url]) => `<li><a href="${esc(url)}" ${external}>${esc(label)} ↗</a></li>`).join('')}${guide.population2025 ? `<li><a href="https://www.census.gov/data/datasets/time-series/demo/popest/2020s-total-puerto-rico-municipios.html" ${external}>Negociado del Censo — estimados de población ↗</a></li>` : ''}</ul>${hasHeroPhoto ? photoCredit(guide.photo) : ''}</details></section>`;
}

function renderTravelLinks(slug) {
  const links = getTownTravelLinks(slug);
  if (!links.length) return '';
  const tiles = links.map(({provider,label,url,affiliate}) => `
    <a class="town-reservation" href="${esc(url)}" target="_blank" rel="${affiliate ? 'sponsored ' : ''}noopener noreferrer" data-pb-event="pb_town_travel_open" data-pb-method="${esc(provider + ':' + slug)}">
      <span>${esc(provider)}${affiliate ? ' · Afiliado' : ''}</span><strong>${esc(label)} ↗</strong></a>`);
  return `<section class="section town-booking" id="reservas"><h2>Organiza tu visita</h2><p>Comprueba la ubicación o el punto de salida, el precio total y las opciones de cancelación.</p><div class="grid2">${tiles.join('')}</div>${links.some(link => link.affiliate) ? '<p class="town-disclosure">PB puede recibir una comisión cuando reservas con un enlace marcado «Afiliado». <a href="/afiliados-boricua">Nuestra política de afiliados</a>.</p>' : ''}</section>`;
}

function renderRelatedStories(slug) {
  const stories = relatedStories[slug] || [];
  if (!stories.length) return '';
  return `<section class="section"><h2>Lee también en PB</h2><ul>${stories.map(([name,url]) => `<li><a href="${url}">${esc(name)} →</a></li>`).join('')}</ul></section>`;
}

function renderTownNavigation(slug) {
  const position = municipalities.findIndex(([id]) => id === slug);
  const links = [[municipalities[position - 1],'← Pueblo anterior'],[municipalities[position + 1],'Próximo pueblo →']];
  return `<nav class="town-next" aria-label="Recorre los pueblos"><a href="/pueblos/">Los 78 pueblos</a>${links.filter(([town]) => town).map(([[id,name], label]) => `<a href="/pueblos/${id}/"><small>${label}</small><strong>${esc(name)}</strong></a>`).join('')}</nav>`;
}

const topicPatterns = {
  playa: /\b(playas?|balnearios?|surf|jobos|domes|poza del obispo|la pared)\b/,
  naturaleza: /\b(bosques?|cuevas?|cavernas?|canones?|r[ií]os?|lagos?|lagunas?|montana|naturales?|reservas?|cascadas?|senderos?|embalses?|mirador|humedales?|refugio|salinas|petroglifos)\b/,
  'vida nocturna': /\b(la placita de santurce|poblado de boqueron|vida nocturna|bares)\b/,
  comida: /\b(cafes?|restaurantes?|lechon|kioscos?|vaca negra|gastronom[ií]a|agroturismo|chocolat|longaniza|quesos?|panaderia)\b/,
  'historia y cultura': /\b(museos?|histori[ac][oa]?s?|plazas?|fuerte|castillo|casco|parroquia|iglesia|faro|teatro|ruinas|artesan[ií]a|caparra)\b/,
  festivales: /\b(festival|fiestas|mascaras|carnaval)\b/,
  hospedaje: /\b(hoteles?|paradores?|hospedaje|campamento|punta maracayo)\b/
};
function searchableStops(guide) {
  const sections = [{id:'guia-del-pueblo',entries:guide.places}, ...(guide.sections || [])];
  return sections.flatMap(({id,entries}) => entries.map(([name,,,,,visitStatus],index) => {
    const searchable = name.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
    const topics = Object.entries(topicPatterns).filter(([,pattern]) => pattern.test(searchable)).map(([topic]) => topic);
    return {name,id:stopId(id,index),topics,visitStatus};
  }));
}

function directoryData() {
  return Object.fromEntries(Object.entries(guides).map(([slug, guide]) => [slug, {
    subtitle:guide.subtitle,
    region:guide.region,
    photo:guide.photo?.path,
    stops:searchableStops(guide)
  }]));
}

module.exports = { directoryData, photoImage, renderGuide, renderRelatedStories, renderSources, renderTravelLinks, renderTownNavigation };
