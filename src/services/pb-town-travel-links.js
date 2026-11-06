// Existing PB Trip.com partner identifiers; city 4382 is Trip.com's Arecibo destination.
const ARECIBO_HOTELS = 'https://us.trip.com/hotels/arecibo-hotels-list-4382/?locale=es-US&curr=USD&SID=2209817&allianceid=1094387&utm_campaign=520530';
const esc = value => String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function getAreciboActivitiesUrl(value = process.env.PB_ARECIBO_GETYOURGUIDE_URL) {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return '';
    if (['www.getyourguide.com','getyourguide.com'].includes(host) && /^[A-Za-z0-9_-]{3,100}$/.test(url.searchParams.get('partner_id') || '')) return url.href;
    // Official short links generated in the partner portal; never fabricate these.
    if (host === 'gyg.me' && /^\/[A-Za-z0-9_-]{3,100}\/?$/.test(url.pathname)) return url.href;
  } catch (_) {}
  return '';
}
function areciboTravelLinks() {
  const activities = getAreciboActivitiesUrl();
  return `<section class="section ag-weekend" id="reservas"><div class="eyebrow">Organiza tu escapada · Enlaces de afiliados</div><h2>De la idea al fin de semana</h2><div class="grid2 ag-links-grid"><a href="${esc(ARECIBO_HOTELS)}" target="_blank" rel="sponsored noopener noreferrer"><strong>Busca hospedaje en Arecibo ↗</strong><span>Consulta opciones en Trip.com. Escoge fechas y revisa ubicación, precio total y cancelación antes de reservar.</span></a>${activities ? `<a href="${esc(activities)}" target="_blank" rel="sponsored noopener noreferrer"><strong>Explora actividades en la zona ↗</strong><span>Consulta experiencias en GetYourGuide. Revisa el lugar de salida, lo que incluye y la disponibilidad. No sustituye la información del parque del faro.</span></a>` : ''}</div><p class="ag-hint">PB puede recibir una comisión por las reservas realizadas mediante estos enlaces. La disponibilidad, los precios y las condiciones los determina cada proveedor. Las reservas se completan fuera de Planeta Boricua. <a href="/afiliados-boricua">Conoce nuestra política de afiliados.</a></p></section>`;
}
module.exports = { ARECIBO_HOTELS, getAreciboActivitiesUrl, areciboTravelLinks };
