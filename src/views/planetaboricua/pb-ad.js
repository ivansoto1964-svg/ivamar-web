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
  return `<aside class="pb-sponsor-card" data-pb-campaign="${esc(campaign.id)}" data-pb-placement="${esc(placement)}" aria-label="${esc(campaign.disclosure || 'Publicidad')}"><a class="pb-sponsor-link" href="/pb-ads/click/${encodeURIComponent(campaign.id)}?${esc(query)}"${external ? ' target="_blank"' : ''} rel="${rel}"><span class="pb-sponsor-media"><img src="${esc(campaign.image)}" alt="${esc(campaign.imageAlt)}" width="320" height="180" loading="lazy" decoding="async"></span><span class="pb-sponsor-copy"><span class="pb-sponsor-label"><b>PB ADS</b> · ${esc(campaign.disclosure)}</span><strong>${esc(campaign.headline)}</strong>${campaign.description ? `<small>${esc(campaign.description)}</small>` : ''}</span><span class="pb-sponsor-cta">${esc(campaign.cta || 'Conocer más')} →</span></a></aside>`;
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

function insertAdsAfterBlocks(html, insertions = []) {
  const source = String(html || '');
  const byTarget = new Map(insertions.filter(item => item?.html).map(item => [Number(item.target),item.html]));
  if (!byTarget.size) return source;
  const closing = /<\/(?:p|h2|h3|blockquote|figure|ul|ol)>/gi;
  let result = '';
  let last = 0;
  let count = 0;
  let match;
  while ((match = closing.exec(source))) {
    count += 1;
    const insertion = byTarget.get(count);
    if (!insertion) continue;
    const end = match.index + match[0].length;
    result += source.slice(last,end) + insertion;
    last = end;
    byTarget.delete(count);
  }
  result += source.slice(last);
  for (const insertion of byTarget.values()) result += insertion;
  return result;
}

function insertAdsByProgress(html, insertions = []) {
  const source = String(html || '');
  const active = insertions.filter(item => item?.html);
  if (!active.length) return source;

  const closing = /<\/(?:p|h2|h3|blockquote|figure|ul|ol)>/gi;
  const blocks = Array.from(source.matchAll(closing));
  if (blocks.length < active.length + 1) return insertAdsByTextProgress(source,active);

  const lastContentBlock = Math.max(1,blocks.length - 1);
  const minimumGap = blocks.length >= active.length * 4 ? 2 : 1;
  let previousTarget = 0;
  const placements = active.map((item,index) => {
    const progress = Math.min(.95,Math.max(.05,Number(item.progress) || ((index + 1) / (active.length + 1))));
    const remaining = active.length - index - 1;
    const latestTarget = Math.max(1,lastContentBlock - (remaining * minimumGap));
    const desiredTarget = Math.round(blocks.length * progress);
    const target = Math.min(latestTarget,Math.max(previousTarget + minimumGap,desiredTarget));
    previousTarget = target;
    return {target,html:item.html};
  });

  return insertAdsAfterBlocks(source,placements);
}

function insertAdsByTextProgress(source, insertions) {
  const tokens = /<[^>]*>|[^\s<]+/g;
  const words = [];
  const sentenceBreaks = [];
  let anchorDepth = 0;
  let match;
  while ((match = tokens.exec(source))) {
    const token = match[0];
    if (token.startsWith('<')) {
      if (/^<a\b/i.test(token)) anchorDepth += 1;
      if (/^<\/a\b/i.test(token)) anchorDepth = Math.max(0,anchorDepth - 1);
      continue;
    }
    if (anchorDepth) continue;
    const word = {end:match.index + token.length,index:words.length};
    words.push(word);
    if (/[.!?]["'”’)]?$/.test(token)) sentenceBreaks.push(word);
  }
  if (!words.length) return source;

  const candidates = sentenceBreaks.length >= insertions.length ? sentenceBreaks : words;
  let previousIndex = -1;
  const placements = insertions.map((item,index) => {
    const progress = Math.min(.95,Math.max(.05,Number(item.progress) || ((index + 1) / (insertions.length + 1))));
    const desiredWord = Math.round((words.length - 1) * progress);
    const remaining = insertions.length - index - 1;
    const eligible = candidates.filter(candidate => candidate.index > previousIndex && candidate.index < words.length - remaining);
    const chosen = eligible.reduce((best,candidate) => (
      !best || Math.abs(candidate.index - desiredWord) < Math.abs(best.index - desiredWord) ? candidate : best
    ),null) || words[Math.min(words.length - 1,Math.max(previousIndex + 1,desiredWord))];
    previousIndex = chosen.index;
    return {offset:chosen.end,html:item.html};
  });

  let result = source;
  for (const placement of placements.reverse()) {
    result = result.slice(0,placement.offset) + placement.html + result.slice(placement.offset);
  }
  return result;
}

module.exports = {renderPBAd,insertAfterBlocks,insertAdsAfterBlocks,insertAdsByProgress};
