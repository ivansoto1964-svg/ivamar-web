function byNewest(a, b) {
  const aDate = new Date(a.publishedAt || a.dateISO || a.updatedISO || a.approvedAt || Number(a.id) || 0);
  const bDate = new Date(b.publishedAt || b.dateISO || b.updatedISO || b.approvedAt || Number(b.id) || 0);
  return bDate - aDate;
}

function eventLocation(event) {
  if (event.virtual) return 'Evento virtual';
  return [event.venue, event.city, event.region].filter(Boolean).join(' · ');
}

function eventDate(event) {
  if (!event.startDate) return '';
  const date = new Date(`${event.startDate}T12:00:00`);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('es-PR', {
    day:'numeric',
    month:'long',
    year:'numeric',
    timeZone:'America/Puerto_Rico'
  });
}

function buildPBExploreRecommendations({
  currentSlug = '',
  latest = [],
  blogPosts = [],
  events = [],
  artisans = [],
  today = new Date().toISOString().slice(0, 10)
} = {}) {
  const recommendations = [];
  const nextLatest = latest
    .filter(item => item && item.slug && item.slug !== currentSlug)
    .sort(byNewest)[0];
  if (nextLatest) recommendations.push({
    area:'Lo más reciente',
    title:nextLatest.title,
    summary:nextLatest.summary,
    image:nextLatest.image,
    href:`/lo-mas-reciente/${encodeURIComponent(nextLatest.slug)}`
  });

  const blog = blogPosts
    .filter(post => post && post.slug && (post.status || 'published') === 'published')
    .sort(byNewest)[0];
  if (blog) recommendations.push({
    area:'Blog oficial',
    title:blog.title,
    summary:blog.excerpt,
    image:blog.image,
    href:`/blog/${encodeURIComponent(blog.slug)}`
  });

  const event = events
    .filter(item => item && item.name && item.startDate && (item.endDate || item.startDate) >= today)
    .sort((a, b) => String(a.startDate).localeCompare(String(b.startDate)))[0];
  if (event) recommendations.push({
    area:'Agenda Boricua',
    title:event.name,
    summary:[eventDate(event), eventLocation(event)].filter(Boolean).join(' · '),
    image:event.image || '/img/agenda-boricua-placeholder.svg',
    href:'/agenda-boricua'
  });

  const artisan = artisans
    .filter(item => item && item.name && item.slug)
    .sort(byNewest)[0];
  if (artisan) recommendations.push({
    area:'Feria de Artesanos',
    title:artisan.name,
    summary:artisan.desc || [artisan.category, artisan.city].filter(Boolean).join(' · '),
    image:artisan.photo || artisan.logo,
    href:`/artesanos/${encodeURIComponent(artisan.slug)}`
  });

  return recommendations.slice(0, 4);
}

module.exports = { buildPBExploreRecommendations };
