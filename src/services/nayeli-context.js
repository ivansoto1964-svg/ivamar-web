const STOP_WORDS = new Set(['a','al','con','de','del','el','en','es','la','las','lo','los','para','por','que','un','una','y']);

function normalize(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'')
    .toLowerCase()
    .replace(/[^a-z0-9ñ]+/g,' ')
    .trim();
}

function termsFor(message) {
  const terms = normalize(message).split(/\s+/).filter(term => term.length > 2 && !STOP_WORDS.has(term));
  return Array.from(new Set(terms)).slice(0,12);
}

function score(item, fields, terms) {
  const haystack = normalize(fields.map(field => item?.[field]).filter(Boolean).join(' '));
  if (!haystack || !terms.length) return 0;
  return terms.reduce((total,term) => total + (haystack.includes(term) ? 1 : 0),0);
}

function select(items, fields, terms, limit = 3) {
  return (Array.isArray(items) ? items : [])
    .map(item => ({item,score:score(item,fields,terms)}))
    .filter(entry => entry.score > 0)
    .sort((a,b) => b.score - a.score)
    .slice(0,limit)
    .map(entry => entry.item);
}

function clean(value, limit = 280) {
  return String(value || '').replace(/\s+/g,' ').trim().slice(0,limit);
}

function buildNayeliContext({message,posts = [],latest = [],events = [],artisans = []}) {
  const terms = termsFor(message);
  const sections = [];
  const selectedPosts = select(posts,['title','excerpt','category','content'],terms);
  const selectedLatest = select(latest,['title','summary','body','topic'],terms);
  const selectedEvents = select(events,['name','description','city','region','type','organizerName'],terms);
  const selectedArtisans = select(artisans,['name','ownerName','category','desc','fullDesc','city','location'],terms);

  if (selectedPosts.length) sections.push('ARTÍCULOS:\n' + selectedPosts.map(item => `- ${clean(item.title)} — ${clean(item.excerpt)} — /blog/${encodeURIComponent(item.slug || '')}`).join('\n'));
  if (selectedLatest.length) sections.push('LO MÁS RECIENTE:\n' + selectedLatest.map(item => `- ${clean(item.title)} — ${clean(item.summary || item.body)} — /lo-mas-reciente/${encodeURIComponent(item.slug || '')}`).join('\n'));
  if (selectedEvents.length) sections.push('EVENTOS:\n' + selectedEvents.map(item => `- ${clean(item.name)} — ${clean(item.startDate)} — ${clean([item.city,item.region].filter(Boolean).join(', '))} — ${clean(item.description)}`).join('\n'));
  if (selectedArtisans.length) sections.push('ARTESANOS:\n' + selectedArtisans.map(item => `- ${clean(item.name)} — ${clean(item.category)} — ${clean(item.city || item.location)} — ${clean(item.desc || item.fullDesc)} — /artesanos/${encodeURIComponent(item.slug || '')}`).join('\n'));

  return sections.join('\n\n').slice(0,6000);
}

module.exports = { buildNayeliContext, normalize, termsFor };
