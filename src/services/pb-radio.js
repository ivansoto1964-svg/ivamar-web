const fs = require('node:fs');
const path = require('node:path');
const { createHash, randomUUID } = require('node:crypto');

const DAYS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const WEEK = 7 * 1440;
const clock = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Puerto_Rico', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23',
});
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const drafts = [
  { id: 'manolo', title: 'Dialogando con Manolo', station: 'WMSW', day: 2, start: '10:00' },
  { id: 'un-sabado-mas', title: 'Un Sábado Más', station: 'Católica Radio', day: 6, start: '16:00' },
  { id: 'raices', title: '', station: 'Radio Raíces' },
  { id: 'exitos', title: '', station: 'Éxitos 1530 AM' },
];

function minutes(time) {
  if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time)) return NaN;
  const [hour, minute] = time.split(':').map(Number);
  return hour * 60 + minute;
}

function httpsUrl(value) {
  if (!value) return '';
  try {
    const url = new URL(value);
    if (url.protocol === 'https:' && !url.username && !url.password && value.length <= 1500) return url.href;
  } catch {}
  throw new Error('Usa un enlace HTTPS válido, sin credenciales.');
}

function validateSlot(input, id) {
  const read = key => String(input[key] ?? '').trim();
  const title = read('title');
  const station = read('station');
  const start = read('start');
  const end = read('end');
  const dayValue = read('day');
  const day = dayValue === '' ? null : Number(dayValue);
  const enabled = input.enabled === 'yes';
  const stream = httpsUrl(read('stream'));
  const link = httpsUrl(read('link'));
  if (!station || station.length > 100 || title.length > 120) throw new Error('Indica la emisora y revisa la longitud del título.');
  if (day !== null && (!Number.isInteger(day) || day < 0 || day > 6)) throw new Error('Selecciona un día válido.');
  if ((start && !Number.isFinite(minutes(start))) || (end && !Number.isFinite(minutes(end)))) throw new Error('Indica horas válidas.');
  if (enabled && (!title || day === null || !start || !end || (!stream && !link))) {
    throw new Error('Para activar un programa, completa el título, el horario y el enlace de la emisora.');
  }
  if (start && start === end) throw new Error('La hora de inicio y la de cierre deben ser distintas.');
  return { id, title, station, day, start, end, stream, link, enabled };
}

function interval(slot) {
  const start = slot.day * 1440 + minutes(slot.start);
  let end = slot.day * 1440 + minutes(slot.end);
  if (end < start) end += 1440;
  return { slot, start, end };
}

function validateSchedule(slots) {
  const live = slots.filter(slot => slot.enabled).map(interval);
  for (let i = 0; i < live.length; i += 1) {
    const first = live[i];
    for (const second of live.slice(i + 1)) {
      if ([-WEEK, 0, WEEK].some(offset => first.start < second.end + offset && second.start + offset < first.end)) {
        throw new Error(`Se cruzan los horarios de «${first.slot.title}» y «${second.slot.title}».`);
      }
    }
  }
}

function getSchedule(config, now = new Date()) {
  const parts = Object.fromEntries(clock.formatToParts(now).map(({ type, value }) => [type, value]));
  const minute = weekdays.indexOf(parts.weekday) * 1440 + Number(parts.hour) * 60 + Number(parts.minute);
  const upcoming = config.slots.filter(slot => slot.enabled).map(interval).sort((a, b) => a.start - b.start);
  const current = upcoming.find(item => [minute, minute + WEEK].some(value => item.start <= value && value < item.end));
  const next = upcoming.find(item => item.start > minute) || upcoming[0];
  const untilEnd = current ? (current.end - minute + WEEK) % WEEK : Infinity;
  const untilStart = next ? (next.start - minute + WEEK) % WEEK || WEEK : Infinity;
  const untilChange = Math.min(untilEnd, untilStart);
  return {
    current: current?.slot || null,
    next: next?.slot || null,
    fallback: config.fallback,
    programs: upcoming.map(item => item.slot),
    refreshMs: Number.isFinite(untilChange) ? untilChange * 60000 - (now.getTime() % 60000) : null,
  };
}

function createRadioStore(file) {
  function read() {
    try {
      const source = fs.readFileSync(file, 'utf8');
      return { ...JSON.parse(source), revision: createHash('sha256').update(source).digest('hex') };
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      return { slots: drafts, fallback: '', revision: 'initial' };
    }
  }

  function update(revision, edit) {
    const current = read();
    if (current.revision !== revision) throw new Error('La parrilla cambió. Vuelve al panel y abre el programa otra vez.');
    const { slots, fallback } = edit(current);
    validateSchedule(slots);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const temp = `${file}.${randomUUID()}.tmp`;
    try {
      fs.writeFileSync(temp, JSON.stringify({ slots, fallback }, null, 2), { flag: 'wx' });
      fs.renameSync(temp, file);
    } finally {
      fs.rmSync(temp, { force: true });
    }
  }
  return { read, update };
}

module.exports = { DAYS, validateSlot, validateSchedule, getSchedule, httpsUrl, createRadioStore };
