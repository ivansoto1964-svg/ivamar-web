const AFFILIATE_HOSTS = [
  /(^|\.)amazon\./i,
  /(^|\.)amzn\.to$/i,
  /(^|\.)trip\.com$/i,
  /(^|\.)tpo\.lu$/i,
  /(^|\.)booking\.com$/i,
  /(^|\.)expedia\./i,
  /(^|\.)aviasales\./i,
  /(^|\.)travelpayouts\./i
];

function plainText(value) {
  return String(value || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&[a-z0-9#]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function wordCount(value) {
  return (plainText(value).match(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9]+/g) || []).length;
}

function isIndexablePBArtisan(item) {
  return wordCount(item && (item.fullDesc || item.desc)) >= 10;
}

function isAffiliateUrl(value) {
  const raw = String(value || '').replace(/&amp;/g, '&').trim();
  if (/^\/go\/(?:amazon|travel)-/i.test(raw)) return true;
  try {
    const url = new URL(raw, 'https://www.masboricuaqueunmofongo.com');
    return AFFILIATE_HOSTS.some(pattern => pattern.test(url.hostname));
  } catch (_) {
    return false;
  }
}

function withRelTokens(tag, tokens) {
  const relMatch = tag.match(/\srel\s*=\s*(["'])(.*?)\1/i);
  const values = new Set([...(relMatch ? relMatch[2].split(/\s+/) : []), ...tokens].filter(Boolean));
  const rel = `rel="${Array.from(values).join(' ')}"`;
  return relMatch ? tag.replace(relMatch[0], ` ${rel}`) : tag.replace(/>$/, ` ${rel}>`);
}

function qualifyAffiliateLinks(html) {
  return String(html || '').replace(/<a\b[^>]*\bhref\s*=\s*(["'])(.*?)\1[^>]*>/gi, tag => {
    const href = (tag.match(/\bhref\s*=\s*(["'])(.*?)\1/i) || [])[2];
    if (!isAffiliateUrl(href)) return tag;
    let qualified = withRelTokens(tag, ['sponsored', 'noopener', 'noreferrer']);
    if (!/\starget\s*=/i.test(qualified)) qualified = qualified.replace(/>$/, ' target="_blank">');
    return qualified;
  });
}

module.exports = { isAffiliateUrl, isIndexablePBArtisan, qualifyAffiliateLinks, wordCount };
