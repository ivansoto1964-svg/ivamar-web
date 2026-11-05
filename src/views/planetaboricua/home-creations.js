const esc = value => String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const validImage = value => {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password && url.hostname === 'res.cloudinary.com' && url.pathname.includes('/image/upload/');
  } catch (_) { return false; }
};
// Input is projected from approved records with the existing gallery sanitizer.
// Publish only creation details already visible on public profiles, never records.
function renderHomeCreations(records, now = new Date()) {
  const day = Math.floor(now.getTime() / 86400000);
  const unique = new Map();
  for (const item of records || []) {
    if (!/^[a-z0-9][a-z0-9-]*$/.test(item.slug || '') || unique.has(item.slug)) continue;
    const gallery = (Array.isArray(item.gallery) ? item.gallery : []).filter(piece => piece && piece.title && piece.description && validImage(piece.image));
    if (gallery.length) unique.set(item.slug, {...item,gallery});
  }
  const candidates = [...unique.values()].sort((a,b) => a.slug.localeCompare(b.slug));
  if (!candidates.length) return '<p class="home-section-copy">Conoce los talleres, sus historias y sus creaciones en la <a href="/feria-artesanos">Feria Digital de Artesanos</a>.</p>';
  const start = day % candidates.length;
  const chosen = Array.from({length:Math.min(4,candidates.length)}, (_,i) => candidates[(start+i)%candidates.length]);
  return '<div class="home-creations-grid">'+chosen.map(item => {
    const piece = item.gallery[day % item.gallery.length];
    const location = item.city || String(item.location || '').replace(/-/g,' ');
    return `<a class="home-creation" href="/artesanos/${item.slug}#artisan-gallery-title"><img src="${esc(piece.image)}" alt="${esc(piece.alt || piece.title)}" width="360" height="240" loading="lazy" decoding="async"><div class="home-creation-copy"><h3>${esc(piece.title)}</h3><p>${esc(item.name)}</p>${location?`<small>${esc(location)}</small>`:''}<span>Conocer al artesano →</span></div></a>`;
  }).join('')+'</div>';
}
module.exports = { renderHomeCreations };
