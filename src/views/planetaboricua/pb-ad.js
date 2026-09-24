const esc = value => String(value || '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

function renderPBAd(campaign, context = {}) {
  if (!campaign) return '';
  const placement = String(context.placement || 'unknown');
  const pageSlug = String(context.pageSlug || '').slice(0,180);
  const query = new URLSearchParams({placement,page:pageSlug}).toString();
  const external = campaign.type !== 'internal';
  const rel = campaign.type === 'affiliate' || campaign.type === 'direct'
    ? 'sponsored noopener noreferrer'
    : 'noopener';
  return `<aside class="pb-sponsor-card" data-pb-campaign="${esc(campaign.id)}" data-pb-placement="${esc(placement)}" aria-label="${esc(campaign.disclosure || 'Publicidad')}"><a class="pb-sponsor-link" href="/pb-ads/click/${encodeURIComponent(campaign.id)}?${esc(query)}"${external ? ' target="_blank"' : ''} rel="${rel}"><span class="pb-sponsor-media"><img src="${esc(campaign.image)}" alt="${esc(campaign.imageAlt)}" width="320" height="180" loading="lazy" decoding="async"></span><span class="pb-sponsor-copy"><span class="pb-sponsor-label"><b>PB ADS</b> · ${esc(campaign.disclosure)}</span><strong>${esc(campaign.headline)}</strong>${campaign.description ? `<small>${esc(campaign.description)}</small>` : ''}</span><span class="pb-sponsor-cta">Conocer más →</span></a></aside>`;
}

function insertAfterBlocks(html, insertion, target = 3) {
  if (!insertion) return String(html || '');
  const source = String(html || '');
  const closing = /<\/(?:p|h2|h3|blockquote|figure|ul|ol)>/gi;
  let match;
  let count = 0;
  while ((match = closing.exec(source))) {
    count += 1;
    if (count >= target) return source.slice(0,match.index+match[0].length) + insertion + source.slice(match.index+match[0].length);
  }
  return source + insertion;
}

module.exports = {renderPBAd,insertAfterBlocks};
