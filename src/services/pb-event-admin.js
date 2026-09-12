const TYPES = [
  'Artesanía', 'Festival', 'Desfile', 'Música y baile', 'Gastronomía',
  'Cultura e historia', 'Taller educativo', 'Actividad familiar',
  'Evento comunitario', 'Evento virtual'
];

const COUNTRIES = ['Puerto Rico', 'Estados Unidos', 'Virtual'];

function text(value, max) {
  return String(value || '').trim().slice(0, max);
}

function safeUrl(value, required = false) {
  const raw = text(value, 500);
  if (!raw && !required) return '';
  try {
    const parsed = new URL(raw);
    if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error();
    return parsed.toString();
  } catch (_) {
    throw new Error(required ? 'Incluye un enlace oficial válido.' : 'La URL de la imagen no es válida.');
  }
}

function duplicateKey(item) {
  const name = text(item?.name, 120).normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  return `${name}|${text(item?.startDate, 10)}`;
}

function buildAdminEvent(input, options = {}) {
  const now = options.now instanceof Date ? options.now : new Date();
  const today = now.toISOString().slice(0, 10);
  const event = {
    name:text(input.name, 120),
    type:text(input.type, 80),
    startDate:text(input.startDate, 10),
    endDate:text(input.endDate, 10),
    time:text(input.time, 100),
    venue:text(input.venue, 180),
    address:text(input.address, 240),
    city:text(input.city, 120),
    region:text(input.region, 120),
    country:text(input.country, 30),
    description:text(input.description, 600),
    eventUrl:safeUrl(input.eventUrl, true),
    image:safeUrl(input.image, false),
    organizerName:text(input.organizerName, 180)
  };

  if (!event.name || !event.type || !event.startDate || !event.region || !event.country || !event.description || !event.organizerName) {
    throw new Error('Completa todos los campos requeridos.');
  }
  if (!TYPES.includes(event.type)) throw new Error('Selecciona una categoría válida.');
  if (!COUNTRIES.includes(event.country)) throw new Error('Selecciona una ubicación válida.');
  if (event.country !== 'Virtual' && !event.city) throw new Error('Indica la ciudad o pueblo del evento.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(event.startDate) || (event.endDate && !/^\d{4}-\d{2}-\d{2}$/.test(event.endDate))) {
    throw new Error('Fecha inválida.');
  }
  if (event.startDate < today) throw new Error('La fecha del evento ya pasó.');
  if (event.endDate && event.endDate < event.startDate) throw new Error('La fecha final no puede ser anterior a la inicial.');

  const existing = Array.isArray(options.existing) ? options.existing : [];
  if (existing.some(item => duplicateKey(item) === duplicateKey(event))) {
    throw new Error('Ese evento ya existe para la misma fecha.');
  }

  const timestamp = now.toISOString();
  const idFactory = typeof options.idFactory === 'function'
    ? options.idFactory
    : () => `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
  return {
    id:String(idFactory()),
    ...event,
    virtual:event.country === 'Virtual',
    cost:'Gratis',
    status:'approved',
    submittedAt:timestamp,
    approvedAt:timestamp,
    sourceLabel:event.organizerName
  };
}

module.exports = { TYPES, COUNTRIES, buildAdminEvent, duplicateKey };
