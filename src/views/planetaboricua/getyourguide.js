const PARTNER = 'SW7UD0N';
const destinations = [
  {key:'sanjuan',path:'san-juan-puerto-rico-l355',name:'San Juan',region:'Puerto Rico',description:'Historia, sabores y paseos desde la capital.',position:'0% 0%'},
  {key:'fajardo',path:'fajardo-l882',name:'Fajardo',region:'Puerto Rico',description:'Catamaranes, esnórquel y aventuras por la costa este.',position:'0% 0%'},
  {key:'orlando',path:'orlando-l191',name:'Orlando',region:'Florida',description:'Atracciones, espectáculos y planes en familia.',position:'66.667% 0%'},
  {key:'tampa',path:'tampa-l1187',name:'Tampa',region:'Florida',description:'Acuario, recorridos urbanos y paseos por la bahía.',position:'100% 100%'},
  {key:'miami',path:'miami-l176',name:'Miami',region:'Florida',description:'Arte, cultura y paseos por Biscayne Bay.',position:'100% 0%'}
];
function renderGetYourGuide() {
  return `<section class="pb-paseos" data-pb-gyg aria-labelledby="pb-paseos-title"><div class="pb-paseos-head"><div><h2 id="pb-paseos-title">¿Pa’ dónde nos vamos?</h2><p>Escoge tu destino y encuentra tu próximo paseo.</p></div><span>Afiliados de GetYourGuide</span></div><div class="pb-paseos-grid">${destinations.map(d=>`<a class="pb-paseo" href="https://www.getyourguide.com/es-es/${d.path}/?partner_id=${PARTNER}&amp;cmp=pb-${d.key}" target="_blank" rel="sponsored noopener noreferrer"><div class="pb-paseo-photo" aria-hidden="true" style="background-position:${d.position}"></div><div class="pb-paseo-copy"><span class="pb-paseo-region">${d.region}</span><h3>${d.name}</h3><p>${d.description}</p><span class="pb-paseo-link">Explorar actividades <span aria-hidden="true">↗</span></span></div></a>`).join('')}</div><p class="pb-paseos-disclosure">Enlaces de afiliado. PB puede recibir una comisión si reservas. <a href="/afiliados-boricua">Más información</a>.</p></section>`;
}
function withGetYourGuide(html, pathname) {
  if (typeof html !== 'string' || html.includes('data-pb-gyg') || pathname !== '/') return html;
  const marker = '<details class="home-travel">';
  if (!html.includes(marker)) return html;
  return html.replace(marker,renderGetYourGuide()+marker).replace('</head>','<link rel="stylesheet" href="/css/pb-paseos.css?v=1"></head>');
}
module.exports = {renderGetYourGuide, withGetYourGuide};
