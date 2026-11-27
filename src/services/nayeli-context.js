const sanitizeHtml = require('sanitize-html');
const towns = require('../data/pb-towns');
const townGuides = require('../data/pb-town-guides.json');
const municipalities = require('../data/pb-municipalities');

const STOP_WORDS = new Set('busco buscar cerca como con cual cuando donde durante del desde dia dias esta estan este estoy encontrame encontrar favor fin fue hacer hay las los lugar lugares mejor necesito para pasar puedo puedes que quiero semana sirve sobre tarde tiene tienes una unas uno unos ver voy manana hoy sabado domingo'.split(' '));
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

function townContext([slug,name],terms) {
  const town = towns[slug] || {};
  const guide = townGuides[slug] || {};
  const attractions = new Map();
  for (const [place,description] of [...(guide.places || []),...(town.places || [])]) {
    if (!attractions.has(normalize(place))) attractions.set(normalize(place),{name:place,description});
  }
  const ranked = select([...attractions.values()],['name','description'],terms);
  const choices = [...new Set([...ranked,...attractions.values()])].slice(0,4);
  return [`- ${name} — /pueblos/${slug}/`, plainText(guide.plan || town.intro || town.why,300),
    ...choices.map(place=>`  · ${plainText(place.name,90)}: ${plainText(place.description,180)}`)].filter(Boolean).join('\n');
}

const articleLine = (item,path,excerpt) => `- ${plainText(item.title,140)} — ${plainText(excerpt)} — ${path}`;

function buildNayeliContext({message,posts = [],latest = [],tourism = [],events = [],artisans = [],now = new Date()}) {
  const terms = termsFor(message);
  const locations = namedTowns(message).slice(0,3);
  const today = puertoRicoDate.format(now);
  const sections = [];
  const selectedTourism = select(tourism,['title','summary','category','excerpt'],terms,locations);
  const selectedPosts = select(posts,['title','excerpt','category','content'],terms,locations);
  const selectedLatest = select(latest,['title','summary','body','topic'],terms,locations);
  const selectedEvents = select(events.filter(item=>!(item.endDate || item.startDate) || (item.endDate || item.startDate)>=today),['name','description','city','region','type','organizerName'],terms,locations);
  const selectedArtisans = select(artisans,['name','ownerName','category','desc','fullDesc','city','location'],terms,locations);
  if (locations.length) sections.push('NUESTROS PUEBLOS:\n' + locations.map(item=>townContext(item,terms)).join('\n'));
  if (selectedTourism.length) sections.push('TURISTIANDO:\n' + selectedTourism.map(item=>articleLine(item,`/turistiando/${encodeURIComponent(item.slug)}`,item.summary || item.excerpt)).join('\n'));
  if (selectedEvents.length) sections.push('AGENDA (fechas de las actividades):\n' + selectedEvents.map(item=>`- ${plainText(item.name,130)} — ${plainText(item.startDate,30)} ${plainText(item.time,50)} — ${plainText([item.city,item.region].filter(Boolean).join(', '),100)} — ${plainText(item.description,180)} — ${item.url || '/agenda-boricua'}`).join('\n'));
  if (selectedArtisans.length) sections.push('ARTESANOS:\n' + selectedArtisans.map(item=>`- ${plainText(item.name,130)} — ${plainText(item.category,85)} — ${plainText(item.city || item.location,95)} — ${plainText(item.desc || item.fullDesc,160)} — /artesanos/${encodeURIComponent(item.slug || '')}`).join('\n'));
  if (selectedPosts.length) sections.push('EL BALCÓN:\n' + selectedPosts.map(item=>articleLine(item,`/blog/${encodeURIComponent(item.slug || '')}`,item.excerpt)).join('\n'));
  if (selectedLatest.length) sections.push('LO MÁS RECIENTE (comprueba la fecha antes de usar un aviso):\n' + selectedLatest.map(item=>articleLine(item,`/lo-mas-reciente/${encodeURIComponent(item.slug || '')}`,[String(item.publishedAt || '').slice(0,10),item.summary || item.body].filter(Boolean).join(' · '))).join('\n'));
  return sections.join('\n\n').slice(0,6000);
}

module.exports = { buildNayeliContext, normalize, termsFor, namedTowns };
