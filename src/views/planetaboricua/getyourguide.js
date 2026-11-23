const PARTNER = 'SW7UD0N';
const destinations = [
  {key:'sanjuan',path:'san-juan-puerto-rico-l355',name:'San Juan',region:'Puerto Rico',description:'Historia, sabores y paseos desde la capital.',position:'0% 0%'},
  {key:'fajardo',path:'fajardo-l882',name:'Fajardo',region:'Puerto Rico',description:'Catamaranes, esnórquel y aventuras por la costa este.',position:'0% 0%'},
  {key:'orlando',path:'orlando-l191',name:'Orlando',region:'Florida',description:'Atracciones, espectáculos y planes en familia.',position:'66.667% 0%'},
  {key:'tampa',path:'tampa-l1187',name:'Tampa',region:'Florida',description:'Acuario, recorridos urbanos y paseos por la bahía.',position:'100% 100%'},
  {key:'miami',path:'miami-l176',name:'Miami',region:'Florida',description:'Arte, cultura y paseos por Biscayne Bay.',position:'100% 0%'},
  {key:'nuevayork',path:'new-york-city-l59',name:'Nueva York',region:'Estados Unidos',description:'Broadway, museos y miradores para aprovechar la visita.',position:'33.333% 0%'},
  {key:'puntacana',path:'punta-cana-l411',name:'Punta Cana',region:'República Dominicana',description:'Playas, catamaranes y excursiones para una escapada caribeña.',position:'0% 100%'},
  {key:'cartagena',path:'cartagena-l362',name:'Cartagena',region:'Colombia',description:'Ciudad amurallada y paseos hacia las islas del Rosario.',position:'33.333% 100%'},
  {key:'madrid',path:'madrid-l46',name:'Madrid',region:'España',description:'Museos, sabores y excursiones a ciudades cercanas.',position:'66.667% 100%'},
  {key:'lasvegas',path:'las-vegas-l58',name:'Las Vegas',region:'Nevada · Estados Unidos',description:'Espectáculos, atracciones y excursiones al desierto.',art:'city',theme:'Luces y espectáculos'},
  {key:'sedona',path:'sedona-l954',name:'Sedona',region:'Arizona · En tendencia',description:'Rocas rojas, miradores y recorridos entre paisajes del desierto.',art:'desert',theme:'Paisajes y aventura'}
];
function renderDestination(d) {
  const visual = d.art
    ? `<div class="pb-paseo-photo pb-paseo-art pb-paseo-art-${d.art}" aria-hidden="true"><span>${d.theme}</span></div>`
    : `<div class="pb-paseo-photo" aria-hidden="true" style="background-position:${d.position}"></div>`;
  return `<a class="pb-paseo" href="https://www.getyourguide.com/es-es/${d.path}/?partner_id=${PARTNER}&amp;cmp=pb-${d.key}" target="_blank" rel="sponsored noopener noreferrer">${visual}<div class="pb-paseo-copy"><span class="pb-paseo-region">${d.region}</span><h3>${d.name}</h3><p>${d.description}</p><span class="pb-paseo-link">Explorar actividades <span aria-hidden="true">↗</span></span></div></a>`;
}
function renderGetYourGuide() {
  return `<section class="pb-paseos" data-pb-gyg aria-labelledby="pb-paseos-title"><div class="pb-paseos-head"><div><h2 id="pb-paseos-title">¿Pa’ dónde nos vamos?</h2><p>Desde un paseo por la isla hasta tu próxima escapada.</p></div><span>Afiliados de GetYourGuide</span></div><div class="pb-paseos-grid">${destinations.slice(0,6).map(renderDestination).join('')}</div><details class="pb-paseos-more"><summary>Más destinos para tu próximo viaje <span aria-hidden="true">+</span></summary><div class="pb-paseos-grid">${destinations.slice(6).map(renderDestination).join('')}</div><p class="pb-paseos-trend">Una idea para salir de lo de siempre: Sedona figura entre los destinos con mayor crecimiento de búsquedas en el informe <a href="https://ir.expediagroup.com/news-and-events/news/news-details/2026/UNPACK-27-EXPEDIA-AND-HOTELS-COM-REVEAL-THE-TRAVEL-TRENDS-INSPIRING-THE-WORLD-IN-2027/default.aspx" target="_blank" rel="noopener noreferrer">Unpack ’27 de Expedia</a>, publicado el 14 de octubre de 2026. La selección de PB combina cercanía, cultura y nuevas ideas para viajar.</p></details><p class="pb-paseos-disclosure">Enlaces de afiliado. PB puede recibir una comisión si reservas. <a href="/afiliados-boricua">Más información</a>. Consulta disponibilidad, idioma, punto de encuentro y condiciones de cada actividad antes de reservar.</p></section>`;
}
function withGetYourGuide(html, pathname) {
  if (typeof html !== 'string' || html.includes('data-pb-gyg') || pathname !== '/') return html;
  const marker = '<details class="home-travel">';
  if (!html.includes(marker)) return html;
  return html.replace(marker,renderGetYourGuide()+marker).replace('</head>','<link rel="stylesheet" href="/css/pb-paseos.css?v=2"></head>');
}
module.exports = {renderGetYourGuide, withGetYourGuide};
