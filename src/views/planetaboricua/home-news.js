const { optimizedImageUrl } = require('../../services/pb-blog-store');

const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[char]);
const dateFormat = new Intl.DateTimeFormat('es-PR', {dateStyle:'medium', timeZone:'America/Puerto_Rico'});

function newsImage(item) {
  return item?.image && item.image !== '/img/og-planetaboricua.jpg' ? optimizedImageUrl(item.image) : '';
}

function newsDate(item) {
  const date = new Date(item.publishedAt);
  return Number.isFinite(date.getTime()) ? `<time datetime="${date.toISOString()}">${dateFormat.format(date)}</time>` : '';
}

function storyUrl(item) {
  return '/lo-mas-reciente/' + encodeURIComponent(item.slug);
}

function renderHomeLead(item) {
  if (!item) return '<h1 class="hero-title">Lo más reciente de Planeta Boricua</h1><a class="hero-read" href="/lo-mas-reciente">Explora las publicaciones</a>';
  const url = storyUrl(item);
  const image = newsImage(item);
  return `<div class="hero-cat">Lo más reciente</div>
    <h1 class="hero-title"><a href="${url}" data-pb-event="pb_story_open" data-pb-method="portada_destacada">${escape(item.title)}</a></h1>
    ${item.summary ? `<p class="hero-excerpt">${escape(item.summary)}</p>` : ''}
    ${image ? `<a class="home-lead-image" href="${url}" aria-label="Leer: ${escape(item.title)}" data-pb-event="pb_story_open" data-pb-method="portada_destacada"><img id="hero-main-img" class="hero-main-img" src="${escape(image)}" alt="" width="768" height="432" fetchpriority="high" decoding="async"></a>` : ''}
    <div class="hero-meta">${newsDate(item)}<a href="${url}" class="hero-read" data-pb-event="pb_story_open" data-pb-method="portada_destacada">Leer artículo</a></div>`;
}

function renderHomeNewsRows(items) {
  return items.map(item => {
    const image = newsImage(item);
    return `<a class="latest-card" href="${storyUrl(item)}" data-pb-event="pb_story_open" data-pb-method="portada_recientes">
      <div class="latest-copy"><h3>${escape(item.title)}</h3><div class="latest-date">${newsDate(item)}</div></div>
      ${image ? `<img src="${escape(image)}" alt="" width="80" height="72" loading="lazy" decoding="async">` : '<span class="latest-placeholder" aria-hidden="true">🇵🇷</span>'}
    </a>`;
  }).join('');
}

module.exports = { newsImage, renderHomeLead, renderHomeNewsRows };
