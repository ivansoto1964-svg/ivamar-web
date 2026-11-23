const PARTNER = 'SW7UD0N';
const cities = {
  sanjuan: {id:355, path:'san-juan-puerto-rico-l355', name:'San Juan y excursiones desde la capital'},
  orlando: {id:191, path:'orlando-l191', name:'Orlando y alrededores'}
};
function renderGetYourGuide(cityKeys = ['sanjuan','orlando']) {
  const selected = cityKeys.filter(key => Object.hasOwn(cities,key));
  if (!selected.length) return '';
  return `<section data-pb-gyg style="margin:24px 0;padding:20px;background:#f4f7fb;border-radius:12px;color:#17243b"><h2>Busca tu próximo paseo</h2><p>Consulta fechas, punto de salida, idioma y condiciones antes de reservar.</p><p>Enlaces de afiliados. PB puede recibir una comisión por las reservas. <a href="/afiliados-boricua">Conoce nuestra política</a>.</p><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:20px">${selected.map(key => {const c=cities[key];return `<div style="min-width:0;overflow:hidden"><h3>${c.name}</h3><div data-gyg-href="https://widget.getyourguide.com/default/city.frame" data-gyg-location-id="${c.id}" data-gyg-locale-code="es-ES" data-gyg-widget="city" data-gyg-partner-id="${PARTNER}" data-gyg-campaign="pb-${key}"></div><a href="https://www.getyourguide.com/${c.path}/?partner_id=${PARTNER}&amp;cmp=pb-${key}" target="_blank" rel="sponsored noopener noreferrer">Ver actividades y disponibilidad ↗</a></div>`;}).join('')}</div></section>`;
}
function withGetYourGuide(html, pathname) {
  if (typeof html !== 'string' || html.includes('data-pb-gyg')) return html;
  if (pathname !== '/') return html;
  const marker = '<details class="home-travel">';
  if (!html.includes(marker)) return html;
  return html.replace(marker, renderGetYourGuide()+marker).replace('</head>',`<script async defer src="https://widget.getyourguide.com/dist/pa.umd.production.min.js" data-gyg-partner-id="${PARTNER}"></script></head>`);
}
module.exports = {renderGetYourGuide, withGetYourGuide};
