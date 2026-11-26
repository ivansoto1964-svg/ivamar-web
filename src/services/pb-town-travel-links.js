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
  aguadilla: [['aguadilla-l2465/puerto-rico-horseback-sunset-riding-in-the-beach-t839683/', 'Paseo a caballo por la costa de Aguadilla']],
  arecibo: [
    ['arecibo-l138123/mata-de-platano-nature-reserve-bat-watching-night-tour-t1110409/', 'Visita nocturna en Mata de Plátano'],
    ['es-es/arecibo-l138123/puerto-rico-aventura-de-tubing-en-el-rio-tanama-arecibo-t1092510/', 'Excursión por el río Tanamá y una cueva en Arecibo']
  ],
  bayamon: [['es-es/ron-del-barrilito-hacienda-santa-ana-bayamon-l166624/', 'Experiencias de Ron del Barrilito en Hacienda Santa Ana']],
  catano: [['es-es/san-juan-puerto-rico-l355/san-juan-tour-por-la-destileria-casa-bacardi-t429467/', 'Recorrido en Casa BACARDÍ, en Cataño']],
  fajardo: [['es-es/fajardo-l882/desde-fajardo-viaje-de-un-dia-en-catamaran-a-la-isla-de-icacos-t19891/', 'Catamarán a Icacos con salida desde Fajardo']],
  isabela: [['san-juan-puerto-rico-l355/san-juan-caguas-guavate-ponce-rincon-isabela-day-trip-t772787/', 'Excursión desde San Juan con parada en Isabela']],
  lajas: [['la-parguera-l145138/la-parguera-sunset-and-biobay-or-late-night-biobay-cruise-t437542/', 'Paseo en bote por la bahía bioluminiscente de La Parguera']],
  orocovis: [['orocovis-l145413/toro-verde-zipline-the-monster-with-transportation-t948281/', 'Tirolesas en Toro Verde con transporte']],
  'rio-grande': [['san-juan-puerto-rico-l355/from-san-juan-el-yunque-rainforest-and-waterslide-tour-vip-t276657/', 'Excursión a El Yunque con salida desde San Juan']],
  'san-juan': [['es-es/san-juan-puerto-rico-l355/descubre-el-viejo-san-juan-en-un-carrito-de-golf-t1093336/', 'Recorrido en carrito de golf por el Viejo San Juan']],
  vieques: [['es-es/municipio-vieques-l32198/vieques-tour-nocturno-en-kayak-por-la-bahia-bioluminiscente-con-guia-t999419/', 'Kayak nocturno en la bahía bioluminiscente de Vieques']]
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
  const customUrl = slug === 'arecibo' ? getAreciboActivitiesUrl() : '';
  for (const [index, [path,label]] of (activities[slug] || []).entries()) {
    const useCustom = index === 0 && customUrl;
    const url = useCustom || 'https://www.getyourguide.com/' + path + '?partner_id=SW7UD0N&cmp=pb-pueblos-' + slug;
    links.push({provider:'GetYourGuide', label:useCustom ? 'Explora actividades en el área de Arecibo' : label, url, affiliate:true});
  }
  const expedia = expediaActivities[slug];
  if (expedia) links.push({provider:'Expedia', label:expedia[1], url:'https://www.expedia.com/things-to-do/' + expedia[0], affiliate:false});
  return links;
}

module.exports = { ARECIBO_HOTELS, getAreciboActivitiesUrl, getTownTravelLinks };
