const municipalities = require('../../data/pb-municipalities');
const guides = require('../../data/pb-town-guides.json');
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
  return `https://www.google.com/maps/search/?${esc(query)}`;
}

function placePhoto(photo) {
  if (!photo) return '';
  return `<figure class="town-place-photo">
    <img src="${esc(photo.path)}" alt="${esc(photo.alt)}" width="${photo.width}" height="${photo.height}" loading="lazy" decoding="async">
    <figcaption>${photoCredit(photo)}</figcaption>
  </figure>`;
}

function guideCards(town, entries, {showMap = false, photos = {}} = {}) {
  return `<div class="cards">${entries.map(([name, copy, link, linkText]) => `
    <article class="mini"><h3>${esc(name)}</h3>${placePhoto(photos[name])}<p>${esc(copy)}</p>
    ${showMap ? `<a class="town-map" href="${mapsLink(name,town)}" ${external}>Ver mapa de ${esc(name)} ↗</a>` : ''}
    ${link ? `<p><a class="town-map" href="${esc(link)}" ${link.startsWith('https://') ? external : ''}>${esc(linkText || 'Más sobre ' + name)} ${link.startsWith('https://') ? '↗' : '→'}</a></p>` : ''}</article>`).join('')}</div>`;
}

function renderGuide(town, guide, hasWeekendGuide) {
  return `<section class="section town-guide" id="guia-del-pueblo">
    <h2>${hasWeekendGuide ? 'Tres paradas para entender Arecibo' : 'Qué visitar'}</h2>
    <div class="town-plan"><strong>${hasWeekendGuide ? 'Del casco al carso' : 'Un plan para empezar'}</strong><p>${esc(guide.plan)}</p></div>
    ${guideCards(town, guide.places, {showMap:true, photos:guide.placePhotos})}
  </section>
  ${(guide.sections || []).map(({id,title,entries}) => `<section class="section town-guide" id="${esc(id)}">
    <h2>${esc(title)}</h2>${guideCards(town, entries)}</section>`).join('')}`;
}

function renderSources(guide, hasHeroPhoto) {
  return `<section class="section town-guide-sources" id="fuentes"><h2>Fuentes y enlaces de visita</h2><ul>${guide.sources.map(([label,url]) => `<li><a href="${esc(url)}" ${external}>${esc(label)} ↗</a></li>`).join('')}</ul>${hasHeroPhoto ? photoCredit(guide.photo) : ''}</section>`;
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

function directoryData() {
  return Object.fromEntries(Object.entries(guides).map(([slug, guide]) => [slug, {
    subtitle:guide.subtitle,
    region:guide.region,
    photo:guide.photo?.path
  }]));
}

module.exports = { directoryData, photoImage, renderGuide, renderRelatedStories, renderSources, renderTravelLinks, renderTownNavigation };
