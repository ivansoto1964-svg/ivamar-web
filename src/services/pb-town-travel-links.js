const ARECIBO_HOTELS = 'https://us.trip.com/hotels/arecibo-hotels-list-4382/?locale=es-US&curr=USD&SID=2209817&allianceid=1094387&utm_campaign=520530';
const tripDestinations = {
  adjuntas: 'garzas-hotel-detail-128886188/hacienda-villa-sotomayor',
  aguada: 'aguada-hotels-list-59613',
  aguadilla: 'aguadilla-hotels-list-4835',
  anasco: 'moca-hotel-detail-2124820/rincon-beach-resort',
  arecibo: 'arecibo-hotels-list-4382',
  'cabo-rojo': 'cabo-rojo-1-hotels-list-59615',
  caguas: 'caguas-hotels-list-75066',
  carolina: 'carolina-hotels-list-19950',
  coamo: 'san-ildefonso-1-hotel-detail-28779133/hotel-banos-de-coamo',
  culebra: 'culebra-hotels-list-5108',
  dorado: 'dorado-hotels-list-20121',
  fajardo: 'fajardo-hotels-list-6725',
  guayama: 'guayama-hotels-list-59616',
  hatillo: 'hatillo-1-hotels-list-59617',
  humacao: 'humacao-hotels-list-59618',
  isabela: 'isabela-hotels-list-36393',
  lajas: 'parguera-hotels-list-305731',
  loiza: 'loiza-hotels-list-36391',
  luquillo: 'luquillo-hotels-list-59620',
  manati: 'manati-hotels-list-92520',
  maunabo: 'maunabo-hotels-list-59621',
  mayaguez: 'mayaguez-hotels-list-7415',
  ponce: 'ponce-hotels-list-5658',
  rincon: 'rincon-hotels-list-36390',
  'rio-grande': 'rio-grande-1-hotels-list-36389',
  salinas: 'salinas-hotels-list-26707',
  'san-juan': 'san-juan-hotels-list-4090',
  utuado: 'caguana-hotel-detail-126191426/la-casita-amarilla-en-utuado-puerto-rico',
  vieques: 'vieques-hotels-list-22036',
  yauco: 'yauco-hotels-list-305797'
};
const tripPropertyLabels = {
  adjuntas: 'Consulta Hacienda Villa Sotomayor',
  anasco: 'Consulta Rincón Beach Resort, en Añasco',
  coamo: 'Consulta el hospedaje Hotel Baños de Coamo',
  lajas: 'Compara hospedajes en La Parguera',
  utuado: 'Consulta La Casita Amarilla en Caguana'
};
const tripQuery = new URL(ARECIBO_HOTELS).search;
const activities = {
  aguadilla: ['punta-borinquen-beach-l234802/', 'Actividades en Punta Borinquén'],
  arecibo: ['arecibo-l138123/mata-de-platano-nature-reserve-bat-watching-night-tour-t1110409/', 'Visita nocturna en Mata de Plátano'],
  fajardo: ['fajardo-l882/', 'Excursiones con salida desde Fajardo'],
  orocovis: ['orocovis-l145413/toro-verde-zipline-the-monster-with-transportation-t948281/', 'Tirolesas en Toro Verde con transporte'],
  'rio-grande': ['san-juan-puerto-rico-l355/from-san-juan-el-yunque-rainforest-and-waterslide-tour-vip-t276657/', 'Excursión a El Yunque con salida desde San Juan'],
  'san-juan': ['san-juan-puerto-rico-l355/', 'Actividades y recorridos en San Juan']
};
const expediaActivities = {
  ponce: ['from-san-juan-full-day-cultural-road-trip-to-ponce.a51796675.activity-details', 'Ruta cultural por Ponce con salida desde San Juan'],
  vieques: ['vieques-bioluminescent-bay-boat-tour.a48293536.activity-details', 'Paseo en bote por la bahía bioluminiscente de Vieques']
};

function getAreciboActivitiesUrl(value = process.env.PB_ARECIBO_GETYOURGUIDE_URL) {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return '';
    if (['www.getyourguide.com','getyourguide.com'].includes(host) && /^[A-Za-z0-9_-]{3,100}$/.test(url.searchParams.get('partner_id') || '')) return url.href;
    if (host === 'gyg.me' && /^\/[A-Za-z0-9_-]{3,100}\/?$/.test(url.pathname)) return url.href;
  } catch (_) {}
  return '';
}

function getTownTravelLinks(slug) {
  const links = [];
  const hotel = tripDestinations[slug];
  if (hotel) {
    const url = 'https://us.trip.com/hotels/' + hotel + '/' + tripQuery;
    links.push({provider:'Trip.com', label:tripPropertyLabels[slug] || 'Compara hospedajes en el área', url, affiliate:true});
  }
  const activity = activities[slug];
  if (activity) {
    const customUrl = slug === 'arecibo' ? getAreciboActivitiesUrl() : '';
    const url = customUrl || 'https://www.getyourguide.com/' + activity[0] + '?partner_id=SW7UD0N&cmp=pb-pueblos-' + slug;
    links.push({provider:'GetYourGuide', label:customUrl ? 'Explora actividades en el área de Arecibo' : activity[1], url, affiliate:true});
  }
  const expedia = expediaActivities[slug];
  if (expedia) links.push({provider:'Expedia', label:expedia[1], url:'https://www.expedia.com/things-to-do/' + expedia[0], affiliate:false});
  return links;
}

module.exports = { ARECIBO_HOTELS, getAreciboActivitiesUrl, getTownTravelLinks };
