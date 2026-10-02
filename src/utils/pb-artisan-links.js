const NETWORKS = {
  facebook: { host:'facebook.com', base:'https://www.facebook.com/', label:'Facebook' },
  instagram: { host:'instagram.com', base:'https://www.instagram.com/', label:'Instagram' },
  tiktok: { host:'tiktok.com', base:'https://www.tiktok.com/@', label:'TikTok' },
  pinterest: { host:'pinterest.com', base:'https://www.pinterest.com/', label:'Pinterest' }
};

const PLACEHOLDER = /^(n\/?a|no\.?|ninguno|no tengo|notengo|none|facebook|-+)$/i;
const RESERVED_PATHS = {
  instagram: new Set(['accounts','direct','explore','p','reel','reels','stories','tv']),
  tiktok: new Set(['discover','explore','foryou','login','music','tag','video']),
  pinterest: new Set(['ideas','pin','search','today'])
};

function cleanLinkValue(value) {
  return String(value || '')
    .replace(/[\u200B-\u200D\u2060\uFEFF]/g, '')
    .replace(/&amp;/gi, '&')
    .trim();
}

function safePublicUrl(value) {
  const raw = cleanLinkValue(value);
  if (!raw || PLACEHOLDER.test(raw) || /^(javascript|data):/i.test(raw) || /^[^:/\s@]+@[^\s/@]+\.[^\s/@]+$/.test(raw)) return '';
  try {
    const url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
    const validHost = /^(?:[a-z0-9-]+\.)+[a-z]{2,}$/i.test(url.hostname);
    return /^https?:$/.test(url.protocol) && validHost && !url.username && !url.password ? url.href : '';
  } catch (_) {
    return '';
  }
}

function isNetworkHost(hostname, expected) {
  const host = String(hostname || '').toLowerCase();
  return host === expected || host.endsWith(`.${expected}`);
}

function artisanSocialUrl(value, network) {
  const config = NETWORKS[network];
  if (!config) return '';
  let raw = cleanLinkValue(value).replace(/^@/, '');
  if (!raw || PLACEHOLDER.test(raw)) return '';

  if (/^(https?:\/\/|www\.)/i.test(raw) || raw.toLowerCase().includes(`${network}.com/`)) {
    const cleaned = safePublicUrl(raw);
    if (!cleaned) return '';
    try {
      const url = new URL(cleaned);
      if (!isNetworkHost(url.hostname, config.host)) return '';
      if (network === 'facebook') return url.href;
      const segment = decodeURIComponent(url.pathname.split('/').filter(Boolean)[0] || '').replace(/^@/, '');
      if (!segment || RESERVED_PATHS[network]?.has(segment.toLowerCase())) return '';
      raw = segment;
    } catch (_) {
      return '';
    }
  }

  const handle = raw.split(/[/?#]/)[0].replace(/^@/, '');
  if (!/^[a-zA-Z0-9._]+$/.test(handle) || RESERVED_PATHS[network]?.has(handle.toLowerCase())) return '';
  return `${config.base}${handle}`;
}

function validateArtisanContactLinks(values, previous = null) {
  const unchanged = field => previous && String(values?.[field] || '').trim() === String(previous?.[field] || '').trim();
  const socialFields = ['instagram','facebook','tiktok','pinterest'];
  for (const field of socialFields) {
    const raw = cleanLinkValue(values?.[field]);
    if (!raw || unchanged(field)) continue;
    if (field === 'facebook') {
      const url = safePublicUrl(raw);
      if (url) {
        try {
          if (/^\/share(?:\/|$)/i.test(new URL(url).pathname)) {
            return 'Facebook: usa el enlace permanente de tu página o perfil, no un enlace de “Compartir”.';
          }
        } catch (_) {}
      }
    }
    if (!artisanSocialUrl(raw, field)) {
      return `${NETWORKS[field].label}: escribe @usuario o el enlace permanente de tu perfil.`;
    }
  }

  for (const [field,label] of [['website','Sitio web'],['etsy','Tienda externa']]) {
    const raw = cleanLinkValue(values?.[field]);
    if (raw && !unchanged(field) && !safePublicUrl(raw)) return `${label}: escribe una dirección web completa y válida.`;
  }

  const whatsapp = cleanLinkValue(values?.whatsapp);
  if (whatsapp && !unchanged('whatsapp') && !/^\d{10,15}$/.test(whatsapp.replace(/\D/g, ''))) {
    return 'WhatsApp: escribe un número de 10 a 15 dígitos, incluyendo el código de país.';
  }
  return '';
}

module.exports = {artisanSocialUrl, safePublicUrl, validateArtisanContactLinks};
