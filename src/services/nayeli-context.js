const sanitizeHtml = require('sanitize-html');
const towns = require('../data/pb-towns');
const townGuides = require('../data/pb-town-guides.json');
const municipalities = require('../data/pb-municipalities');

const STOP_WORDS = new Set('busco buscar cerca como con cual cuando donde durante del desde dia dias esta estan este estoy encontrame encontrar favor fin fue hacer hay las los lugar lugares mejor necesito para pasar puedo puedes que quiero semana sirve sobre tarde tiene tienes una unas uno unos ver voy manana hoy sabado domingo'.split(' '));
const agendaDate = new Intl.DateTimeFormat('es-PR',{dateStyle:'full',timeZone:'UTC'});
const weekdays = ['domingo','lunes','martes','miercoles','jueves','viernes','sabado'];
const puertoRicoDate = new Intl.DateTimeFormat('en-CA',{timeZone:'America/Puerto_Rico',year:'numeric',month:'2-digit',day:'2-digit'});

function normalize(value) {
  return String(value || '').normalize('NFD').replace(/\p{M}/gu,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
}

function termsFor(message) {
  return [...new Set(normalize(message).split(' ').filter(term => term.length > 2 && !STOP_WORDS.has(term)))].slice(0,12);
}

function mentions(text, phrase) {
  return (' '+normalize(text)+' ').includes(' '+normalize(phrase)+' ');
}

function namedTowns(message) {
  return municipalities.filter(([slug,name]) => mentions(message,name) && (slug!=='florida' || mentions(message,'Florida Puerto Rico')));
}

function plainText(value, limit = 280) {
  return sanitizeHtml(String(value || ''),{allowedTags:[],allowedAttributes:{},nonTextTags:['script','style']})
    .replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g,' ').trim().slice(0,limit);
}

function select(items, fields, terms, locations = []) {
  return items.map(item => {
    const [headline,...details] = fields.map(field=>normalize(item[field]));
    if (locations.length && !locations.some(([,name])=>[headline,...details].some(value=>mentions(value,name)))) return {item,score:0};
    const score = terms.reduce((total,term) => total + (mentions(headline,term) ? 6 : details.some(value=>mentions(value,term)) ? 1 : 0),0);
    return {item,score};
  }).filter(entry=>entry.score > 0).sort((a,b)=>b.score-a.score).slice(0,3).map(entry=>entry.item);
}

function townContext([slug,name],terms,wantsMap) {
  const town = towns[slug] || {};
  const guide = townGuides[slug] || {};
  const attractions = new Map();
  for (const [place,description] of [...(guide.places || []),...(town.places || [])]) {
    if (!attractions.has(normalize(place))) attractions.set(normalize(place),{name:place,description});
  }
  const coastal = terms.some(term=>['costa','playa','mar','islote'].includes(term));
  const placeTerms = coastal ? [...new Set([...terms,'mar','playa','poza','costera','islote'])] : terms;
  const ranked = select([...attractions.values()],['name','description'],placeTerms);
  const choices = [...new Set([...ranked,...attractions.values()])].slice(0,wantsMap ? 5 : 4);
  return [`- ${name} — /pueblos/${slug}/`, plainText(guide.plan || town.intro || town.why,300),
    ...choices.map(place=>{
      const line = `  · ${plainText(place.name,90)}: ${plainText(place.description,180)}`;
      if (!wantsMap) return line;
      const params = new URLSearchParams({api:'1',query:`${place.name}, ${name}, Puerto Rico`});
      return line+' — https://www.google.com/maps/search/?'+params;
    })].filter(Boolean).join('\n');
}

const articleLine = (item,path,excerpt) => `- ${plainText(item.title,140)} — ${plainText(excerpt)} — ${path}`;

function addDays(day,offset) {
  const date = new Date(day+'T00:00:00Z');
  date.setUTCDate(date.getUTCDate()+offset);
  return date.toISOString().slice(0,10);
}

function requestedDates(message,today) {
  const text = normalize(message);
  if (mentions(text,'hoy')) return [today,today];
  if (mentions(text,'manana') && !mentions(text,'por la manana')) {
    const tomorrow = addDays(today,1);
    return [tomorrow,tomorrow];
  }
  const currentWeekday = new Date(today+'T00:00:00Z').getUTCDay();
  const nextDay = day=>addDays(today,(day-currentWeekday+7)%7);
  if (mentions(text,'este fin de semana') || mentions(text,'el fin de semana')) {
    return currentWeekday===0 ? [today,today] : [nextDay(6),nextDay(0)];
  }
  const weekday = text.match(/\b(?:este|el|para) (domingo|lunes|martes|miercoles|jueves|viernes|sabado)\b/)?.[1];
  if (!weekday) return null;
  const day = nextDay(weekdays.indexOf(weekday));
  return [day,day];
}

function displayAgendaDate(iso) {
  return agendaDate.format(new Date(iso+'T00:00:00Z'));
}

function agendaLine(item) {
  const start = displayAgendaDate(item.startDate);
  const dates = item.endDate && item.endDate!==item.startDate ? start+' a '+displayAgendaDate(item.endDate) : start;
  const where = [item.venue,item.address,item.city,item.region].filter(Boolean).join(', ');
  const details = [dates,plainText(item.time,80),plainText(where,160),plainText(item.cost,60),plainText(item.description,180)].filter(Boolean);
  return '- '+[plainText(item.name,130),...details,item.url || '/agenda-boricua'].join(' — ');
}

function buildNayeliContext({message,history = [],posts = [],latest = [],tourism = [],events = [],artisans = [],now = new Date()}) {
  const terms = termsFor(message);
  const text = normalize(message);
  const wantsMap = /\b(?:mapa|maps|como llego|como llegar|enlace para llegar|indicaciones|ubicacion|donde queda)\b/.test(text);
  const followup = wantsMap || /\b(?:parada|primera|segunda|tercera|ese lugar|esa opcion|alli)\b/.test(text);
  let locations = namedTowns(message).slice(0,3);
  if (!locations.length && followup) {
    for (const turn of history.slice(-6).reverse()) {
      if (turn.role!=='user') continue;
      locations = namedTowns(turn.content).slice(0,3);
      if (locations.length) break;
    }
  }
  const today = puertoRicoDate.format(now);
  const dates = requestedDates(message,today);
  const sections = [`FECHA LOCAL DE PUERTO RICO: ${displayAgendaDate(today)}.`];
  if (dates) sections.push('FECHA SOLICITADA: '+[...new Set(dates)].map(displayAgendaDate).join(' a ')+'.');
  const selectedTourism = select(tourism,['title','summary','category','excerpt'],terms,locations);
  const selectedPosts = select(posts,['title','excerpt','category','content'],terms,locations);
  const selectedLatest = select(latest,['title','summary','body','topic'],terms,locations);
  const datedEvents = events.filter(item=>{
    const {startDate} = item;
    const endDate = item.endDate || startDate;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate || '') || !/^\d{4}-\d{2}-\d{2}$/.test(endDate || '')) return false;
    if (!Number.isFinite(Date.parse(startDate)) || !Number.isFinite(Date.parse(endDate))) return false;
    return dates ? startDate<=dates[1] && endDate>=dates[0] : endDate>=today;
  });
  const selectedEvents = dates && !terms.length
    ? datedEvents.sort((a,b)=>a.startDate.localeCompare(b.startDate)).slice(0,3)
    : select(datedEvents,['name','description','city','region','type','organizerName','venue'],terms,locations);
  const selectedArtisans = select(artisans,['name','ownerName','category','desc','fullDesc','city','location'],terms,locations);
  if (locations.length) sections.push('NUESTROS PUEBLOS:\n' + locations.map(item=>townContext(item,terms,wantsMap)).join('\n'));
  if (selectedTourism.length) sections.push('TURISTIANDO:\n' + selectedTourism.map(item=>articleLine(item,`/turistiando/${encodeURIComponent(item.slug)}`,item.summary || item.excerpt)).join('\n'));
  if (selectedEvents.length) sections.push('AGENDA (día y fecha verificados por calendario):\n' + selectedEvents.map(agendaLine).join('\n'));
  else if (dates) sections.push('AGENDA: no se encontraron actividades publicadas en PB que coincidan con la fecha y la consulta.');
  if (selectedArtisans.length) sections.push('ARTESANOS:\n' + selectedArtisans.map(item=>`- ${plainText(item.name,130)} — ${plainText(item.category,85)} — ${plainText(item.city || item.location,95)} — ${plainText(item.desc || item.fullDesc,160)} — /artesanos/${encodeURIComponent(item.slug || '')}`).join('\n'));
  if (selectedPosts.length) sections.push('EL BALCÓN:\n' + selectedPosts.map(item=>articleLine(item,`/blog/${encodeURIComponent(item.slug || '')}`,item.excerpt)).join('\n'));
  if (selectedLatest.length) sections.push('LO MÁS RECIENTE (comprueba la fecha antes de usar un aviso):\n' + selectedLatest.map(item=>articleLine(item,`/lo-mas-reciente/${encodeURIComponent(item.slug || '')}`,[String(item.publishedAt || '').slice(0,10),item.summary || item.body].filter(Boolean).join(' · '))).join('\n'));
  return sections.join('\n\n').slice(0,6000);
}

module.exports = { buildNayeliContext, normalize, termsFor, namedTowns };
