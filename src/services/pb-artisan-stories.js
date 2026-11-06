// Curated interviews, separate from paid business profiles and daily spotlights.
const LUIS_SLUG = 'luis-carrasquillo-del-retiro-a-transformar-el-coco-en-caretas-de-vejigante-460566';
// Verified against the complete published archive, not the latest-ten API feed.
const HISTORICAL_STORY_SLUGS = Object.freeze([
  'un-granito-de-cultura-hecho-a-mano-que-llego-hasta-paraguay-551906',
  'historias-de-nuestra-feria-digital-joelo-me-enamore-otra-vez-y-por-ella-comence-a-pintar-574533',
  'de-lajas-a-maryland-cuatro-generaciones-unidas-por-un-mismo-hilo-760375',
  'arete-tejidos-79-la-artesana-de-corozal-que-encontro-en-el-tejido-una-manera-de-volver-a-comenzar-792501',
  'luzangel-artist-pequenas-tallas-grandes-historias-de-puerto-rico-996269',
  LUIS_SLUG
]);
const historicalStories = new Set(HISTORICAL_STORY_SLUGS);
function isWeeklyStory(item) {
  if (typeof item?.artisanWeekly === 'boolean') return item.artisanWeekly;
  return historicalStories.has(item?.slug);
}
function selectStories(items = []) {
  return items.filter(item => isWeeklyStory(item) && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug || '') && Number.isFinite(Date.parse(item.publishedAt)))
    .sort((a,b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .map(({slug,title,summary,image,publishedAt}) => ({slug,title,summary,image,publishedAt}));
}
module.exports = { LUIS_SLUG, HISTORICAL_STORY_SLUGS, isWeeklyStory, selectStories };
