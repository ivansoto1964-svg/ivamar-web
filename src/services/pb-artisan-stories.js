// Curated interviews, separate from paid business profiles and daily spotlights.
const LUIS_SLUG = 'luis-carrasquillo-del-retiro-a-transformar-el-coco-en-caretas-de-vejigante-460566';
function isWeeklyStory(item) {
  if (typeof item?.artisanWeekly === 'boolean') return item.artisanWeekly;
  return item?.slug === LUIS_SLUG;
}
function selectStories(items = []) {
  return items.filter(item => isWeeklyStory(item) && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug || '') && Number.isFinite(Date.parse(item.publishedAt)))
    .sort((a,b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .map(({slug,title,summary,image,publishedAt}) => ({slug,title,summary,image,publishedAt}));
}
module.exports = { LUIS_SLUG, isWeeklyStory, selectStories };
