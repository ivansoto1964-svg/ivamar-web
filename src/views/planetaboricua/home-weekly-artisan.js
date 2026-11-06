const { selectStories, LUIS_SLUG } = require('../../services/pb-artisan-stories');
const esc = value => String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// Public identities verified in the existing interviews; new stories retain their editorial title.
const identities = {
  'un-granito-de-cultura-hecho-a-mano-que-llego-hasta-paraguay-551906': ['Betzaida Rodríguez', 'I’narú Collection'],
  'historias-de-nuestra-feria-digital-joelo-me-enamore-otra-vez-y-por-ella-comence-a-pintar-574533': ['Joelo', 'Joelo el Artista Puertorriqueño'],
  'de-lajas-a-maryland-cuatro-generaciones-unidas-por-un-mismo-hilo-760375': ['Lourdes Irizarry Semidey y Lourdes M. Burgos Irizarry', 'Stitches By Lú · Lú Designs'],
  'arete-tejidos-79-la-artesana-de-corozal-que-encontro-en-el-tejido-una-manera-de-volver-a-comenzar-792501': ['Michelle Damaris Nieves Albino', 'Areté Tejidos 79'],
  'luzangel-artist-pequenas-tallas-grandes-historias-de-puerto-rico-996269': ['María de los Ángeles', 'Luzangel Artist'],
  [LUIS_SLUG]: ['Luis Carrasquillo', 'Artesanía LC']
};
function safeImage(value) {
  const text = String(value || '');
  if (/^\/(?!\/)/.test(text)) return text;
  try { const url = new URL(text); if (url.protocol === 'https:' && !url.username && !url.password) return url.href; } catch (_) {}
  return '';
}
function renderHomeWeeklyArtisan(published = []) {
  const story = selectStories(published)[0];
  if (!story) return '';
  const image = safeImage(story.image);
  const [name,project] = identities[story.slug] || [story.title,''];
  const href = '/lo-mas-reciente/' + encodeURIComponent(story.slug);
  return `<section class="home-weekly" aria-labelledby="home-weekly-title"><div class="home-section-inner"><div class="sec-divider-inner"><h2 id="home-weekly-title" class="sec-divider-label">Artesano de la Semana</h2><div class="sec-divider-line"></div><a href="/artesano-de-la-semana" class="sec-divider-link">Todas las historias →</a></div><article class="home-weekly-card${image ? '' : ' no-photo'}">${image ? `<a class="home-weekly-photo" href="${href}" aria-label="Conoce la historia de ${esc(name)}"><img src="${esc(image)}" alt="${esc(story.title)}" width="640" height="480" loading="lazy" decoding="async"></a>` : ''}<div class="home-weekly-copy"><p class="home-weekly-kicker">Las manos detrás de las piezas</p><h3><a href="${href}">${esc(name)}</a></h3>${project ? `<p class="home-weekly-project">${esc(project)}</p>` : ''}<p class="home-weekly-summary">${esc(story.summary)}</p><a class="home-weekly-read" href="${href}">Conoce su historia →</a></div></article></div></section>`;
}
module.exports = { renderHomeWeeklyArtisan };
