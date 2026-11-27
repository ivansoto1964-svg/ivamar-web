const { categorySlug } = require('../utils/pb-editorial');
const { wordCount } = require('./pb-ads');

const source = {
  blog: {path:'/blog', label:'El Balcón'},
  latest: {path:'/lo-mas-reciente', label:'Lo Más Reciente'}
};

const curated = new Map([
  ['/blog/por-la-60-carreteras-largas-una-vaca-y-yeehaw-junction', {category:'Destinos y rutas'}],
  ['/blog/florida-central-mas-cerca-de-casa-primer-vuelo-avelo-lakeland-aguadilla', {category:'Destinos y rutas'}],
  ['/blog/arecibo-un-fin-de-semana-entre-el-faro-el-mar-y-el-autocine', {category:'Destinos y rutas'}],
  ['/blog/los-5-destinos-favoritos-de-los-boricuas-y-por-que-cada-uno-se-siente-diferente', {category:'Destinos y rutas'}],
  ['/lo-mas-reciente/avelo-conectara-lakeland-con-aguadilla-una-nueva-opcion-directa-para-los-boricuas-de-florida-central-345896', {category:'Destinos y rutas', until:'2026-11-18'}],
  ['/lo-mas-reciente/recoger-pasajeros-mco-estacionamiento-gratis', {category:'Planifica tu viaje'}],
  ['/lo-mas-reciente/te-cancelaron-el-vuelo-cuando-te-toca-un-reembolso', {category:'Planifica tu viaje'}],
  ['/lo-mas-reciente/frontier-estrena-opcion-para-cancelar-por-cualquier-razon-pero-cuanto-cuesta-realmente-un-vuelo-barato-361310', {category:'Planifica tu viaje'}],
  ['/lo-mas-reciente/ferry-culebra-horario-diciembre-febrero', {category:'Avisos de viaje', until:'2027-02-28'}],
  ['/lo-mas-reciente/viajas-desde-puerto-rico-esta-navidad-revisa-lo-que-llevas-en-la-maleta-402545', {category:'Planifica tu viaje', until:'2027-01-06'}]
]);

const transit = /\b(?:vuelos?|aeropuertos?|ferr(?:y|is?|ies)|lanchas?|cruceros?|aerolineas?)\b/;
const tripAction = /\b(?:equipaje|maletas?|pasajeros?|reembolsos?|estacionamiento|horarios?|boletos?|reserv(?:a|ar|as)|tarifas?|requisitos de entrada)\b/;
const places = /\b(?:playas?|faro|cuevas?|bosques?|parques?|senderos?|destinos?|costa|casco|mercados?|museos?|pueblos?)\b/;
const serviceChange = /\b(?:demoras?|retrasos?|cancelaciones?|cierres?|suspende|suspenden|afecta|afectan|interrupcion|reanudan)\b/;
const routeChange = /\b(?:vuelos? inaugurales?|vuelos? directos?|nuevas? rutas?|nuevas? conexiones?|conectara|conecta|reanuda)\b/;
const airline = /\b(?:avelo|frontier|jetblue|spirit|southwest|aerolineas?)\b/;
const editorialTravelTag = new Set(['turistiando','guia-de-viaje','viajes']);
const displayDate = new Intl.DateTimeFormat('es-PR',{dateStyle:'long',timeZone:'America/Puerto_Rico'});
const dayKey = new Intl.DateTimeFormat('en-CA',{year:'numeric',month:'2-digit',day:'2-digit',timeZone:'America/Puerto_Rico'});
const plain = text => String(text||'').normalize('NFD').replace(/\p{M}/gu,'').toLowerCase();
const dateFor = raw => new Date(/^\d{4}-\d{2}-\d{2}$/.test(raw || '') ? raw+'T12:00:00-04:00' : raw || '');
const hasTripTag = item => (Array.isArray(item.tags) && item.tags.some(tag=>editorialTravelTag.has(categorySlug(tag)))) || editorialTravelTag.has(categorySlug(item.topic || item.category));

function classify(item, section, publishedAt) {
  const title = plain(item.title);
  const description = plain(item.summary || item.excerpt);
  const heading = title.replace(/[^a-z0-9]+/g,' ').trim();
  if (/\b(?:mudanza|mudarse|arresto|atentado|amenaza|proyecto de ley)\b/.test(heading) && !hasTripTag(item)) return null;

  if (section === 'latest' && serviceChange.test(heading) && /\b(?:autopista|carretera|pr ?[0-9]+)\b/.test(heading)) {
    return advisory(publishedAt, 7);
  }
  if (section === 'latest' && (transit.test(heading) || (airline.test(heading) && transit.test(description)))) {
    const specificSchedule = /\bhorarios?\b/.test(heading) || /\b(?:cambia|ajusta|modifica)\b.*\b(?:salidas?|itinerarios?|servicio)\b/.test(heading);
    if (specificSchedule || (serviceChange.test(heading) && !/\b(?:si te|cuando te|como pedir|cuando pedir|reembolso|derechos)\b/.test(heading))) {
      return advisory(publishedAt, specificSchedule ? 30 : 7);
    }
    if (routeChange.test(heading)) return {category:'Destinos y rutas'};
    if (tripAction.test(heading)) return {category:'Planifica tu viaje'};
  }

  if (section === 'latest' && airline.test(heading) && routeChange.test(heading)) return {category:'Destinos y rutas'};

  const howTo = /\b(?:que ver|que visitar|que hacer|que llevar|como llegar|guia de viaje|itinerario de viaje|escapada a|fin de semana entre)\b/.test(heading);
  const context = heading + ' ' + description;
  const destinationGuide = /\b(?:que ver en|que visitar en|escapada a|fin de semana entre)\b/.test(heading);
  if (destinationGuide || (howTo && places.test(context))) return {category:'Destinos y rutas'};
  if (howTo && (transit.test(context) || /\bviajes?\b/.test(heading))) {
    return {category:'Planifica tu viaje'};
  }
  if (/\b(?:viajas|vas a viajar|antes de viajar)\b/.test(heading) && tripAction.test(context)) return {category:'Planifica tu viaje'};
  return hasTripTag(item)?{category:'Planifica tu viaje'}:null;
}

function advisory(publishedAt, days) {
  const expiry = new Date(publishedAt);
  expiry.setUTCDate(expiry.getUTCDate() + days);
  return {category:'Avisos de viaje', until:dayKey.format(expiry)};
}

function linkedTravelPosts({blog = [],latest = [], now = new Date()} = {}) {
  const today = dayKey.format(now);
  const articles = new Map();
  for (const [section, posts] of Object.entries({blog,latest})) {
    const {path,label}=source[section];
    for (const item of posts) {
      if (!item.title || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug || '')) continue;
      if (item.status && item.status!==(section==='blog'?'published':'approved')) continue;
      const published = dateFor(section==='blog'?(item.dateISO || item.updatedISO):item.publishedAt);
      if (!Number.isFinite(published.valueOf()) || published > now) continue;
      const href = path+'/'+item.slug;
      const selection = curated.get(href) || classify(item,section,published);
      if (!selection || (selection.until && selection.until<today)) continue;
      const {category,until}=selection;
      articles.set(href,{
        href, sourceLabel:label, slug:item.slug, title:item.title, image:item.image,
        excerpt:item.summary || item.excerpt || '', category, dateISO:published.toISOString(), date:displayDate.format(published),
        readTime:item.readTime || Math.max(1,Math.ceil(wordCount(item.body || item.content)/200)),
        travelUntil:until?displayDate.format(dateFor(until)):''
      });
    }
  }
  return [...articles.values()];
}

module.exports = {linkedTravelPosts};
