const SITE_URL = 'https://www.masboricuaqueunmofongo.com';

function slugPart(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);
}

function eventSlug(event = {}) {
  const name = slugPart(event.name) || 'evento-boricua';
  const date = /^\d{4}-\d{2}-\d{2}$/.test(String(event.startDate || ''))
    ? String(event.startDate).replace(/-/g, '')
    : slugPart(event.id).slice(-12);
  return [name, date].filter(Boolean).join('-');
}

function eventPath(event) {
  return `/agenda-boricua/${eventSlug(event)}`;
}

function eventPageUrl(event) {
  return `${SITE_URL}${eventPath(event)}`;
}

function findEventBySlug(events, slug) {
  const requested = String(slug || '').toLowerCase();
  return (Array.isArray(events) ? events : []).find(event => eventSlug(event) === requested) || null;
}

function compactDate(value) {
  return String(value || '').replace(/-/g, '');
}

function addOneDay(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || ''));
  if (!match) return '';
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]) + 1));
  return date.toISOString().slice(0, 10);
}

function locationText(event) {
  if (event?.virtual) return 'Evento virtual';
  const seen = new Set();
  return [event?.venue, event?.address, event?.city, event?.region, event?.country]
    .filter(value => {
      const normalized = String(value || '').trim().toLowerCase();
      if (!normalized || seen.has(normalized)) return false;
      seen.add(normalized);
      return true;
    })
    .join(', ');
}

function icsEscape(value) {
  return String(value || '')
    .replace(/\\/g, '\\\\')
    .replace(/\r?\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

function foldIcsLine(line) {
  const parts = [];
  let remaining = String(line);
  while (Buffer.byteLength(remaining, 'utf8') > 73) {
    let index = Math.min(remaining.length, 70);
    while (index > 1 && Buffer.byteLength(remaining.slice(0, index), 'utf8') > 73) index -= 1;
    parts.push(remaining.slice(0, index));
    remaining = ` ${remaining.slice(index)}`;
  }
  parts.push(remaining);
  return parts.join('\r\n');
}

function calendarDescription(event) {
  return [
    event.description,
    event.time ? `Horario anunciado: ${event.time}` : '',
    event.eventUrl ? `Información oficial: ${event.eventUrl}` : '',
    `Agenda Boricua: ${eventPageUrl(event)}`
  ].filter(Boolean).join('\n\n');
}

function buildEventIcs(event) {
  const start = compactDate(event.startDate);
  const end = compactDate(addOneDay(event.endDate || event.startDate));
  if (!/^\d{8}$/.test(start) || !/^\d{8}$/.test(end)) throw new Error('El evento no tiene una fecha válida.');
  const approvedDate = new Date(event.approvedAt || '');
  const stamp = !Number.isNaN(approvedDate.getTime())
    ? approvedDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
    : `${start}T120000Z`;
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Planeta Boricua//Agenda Boricua//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${eventSlug(event)}@masboricuaqueunmofongo.com`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${start}`,
    `DTEND;VALUE=DATE:${end}`,
    `SUMMARY:${icsEscape(event.name)}`,
    `DESCRIPTION:${icsEscape(calendarDescription(event))}`,
    `LOCATION:${icsEscape(locationText(event))}`,
    `URL:${eventPageUrl(event)}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ];
  return `${lines.map(foldIcsLine).join('\r\n')}\r\n`;
}

function googleCalendarUrl(event) {
  const start = compactDate(event.startDate);
  const end = compactDate(addOneDay(event.endDate || event.startDate));
  const params = new URLSearchParams({
    action:'TEMPLATE',
    text:String(event.name || 'Evento boricua'),
    dates:`${start}/${end}`,
    details:calendarDescription(event),
    location:locationText(event)
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function mapsUrl(event) {
  if (!event || event.virtual) return '';
  const query = locationText(event);
  return query ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}` : '';
}

module.exports = {
  SITE_URL,
  eventSlug,
  eventPath,
  eventPageUrl,
  findEventBySlug,
  locationText,
  buildEventIcs,
  googleCalendarUrl,
  mapsUrl
};
