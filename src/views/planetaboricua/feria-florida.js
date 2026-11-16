const { safePublicUrl } = require('../../utils/pb-artisan-links');
const { decodeStoredText, esc } = require('../../utils/pb-artisan-text');

const title = 'Artesanos boricuas en Florida';
const description = 'Encuentra artesanos puertorriqueños en Florida, Estados Unidos. Explora por ciudad, descubre sus creaciones y visita sus perfiles en Planeta Boricua.';
const canonical = 'https://www.masboricuaqueunmofongo.com/feria-artesanos/florida';
const collator = new Intl.Collator('es-PR', { sensitivity: 'base' });

function renderProfile(profile) {
  const name = esc(decodeStoredText(profile.name));
  const summary = esc(decodeStoredText(profile.description).trim());
  const photo = safePublicUrl(profile.photo);
  return `<article class="fl-card">
    ${photo.startsWith('https://') ? `<img src="${esc(photo)}" alt="" loading="lazy" width="240" height="180">` : ''}
    <div class="fl-card-copy">
      <p class="fl-category">${esc(profile.category)}</p>
      <h3><a href="/artesanos/${encodeURIComponent(profile.slug)}">${name}</a></h3>
      ${summary ? `<p>${summary}</p>` : ''}
    </div>
  </article>`;
}

module.exports = function renderFloridaArtisans(profiles) {
  const cities = new Map();
  for (const profile of profiles) {
    const city = decodeStoredText(profile.city).trim().replace(/\s+/g, ' ');
    const label = city || 'Ciudad sin especificar';
    const key = label.toLocaleLowerCase('es-PR');
    if (!cities.has(key)) cities.set(key, { label, profiles: [] });
    cities.get(key).profiles.push(profile);
  }

  const groups = [...cities.values()].sort((left, right) => collator.compare(left.label, right.label));
  const listings = groups.map(group => {
    const cards = group.profiles
      .sort((left, right) => collator.compare(left.name, right.name))
      .map(renderProfile).join('');
    return `<section class="fl-city"><h2>${esc(group.label)}</h2>${cards}</section>`;
  }).join('');

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} | Planeta Boricua</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<style>
body{margin:0}
.fl-page{font-family:Inter,system-ui,sans-serif;color:#15243a;background:#f6f6f1}
.fl-hero{padding:clamp(2rem,6vw,4.2rem) 1.25rem;text-align:center;background:#002d62;color:white}
.fl-hero a{color:#fff;text-underline-offset:.22em}
.fl-hero h1{margin:.65rem 0;font:700 clamp(2rem,6vw,3.7rem)/1.12 Georgia,serif;color:inherit}
.fl-hero p{margin:.7rem auto 0;max-width:38rem}
.fl-list{box-sizing:border-box;max-width:72rem;margin:0 auto;padding:clamp(1.25rem,4vw,2.5rem) 1rem}
.fl-cities{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,28rem),1fr));gap:1.75rem;align-items:start}
.fl-city h2{margin:0 0 .8rem;padding-left:.7rem;border-left:4px solid #ce1126;color:#002d62;font:700 1.55rem/1.3 Georgia,serif}
.fl-card{display:flex;align-items:flex-start;gap:1rem;margin:0 0 .75rem;padding:1rem;background:white;border:1px solid #dfe4e9;border-radius:.65rem;overflow-wrap:anywhere}
.fl-card img{width:clamp(4rem,15vw,7rem);height:auto;aspect-ratio:4/3;object-fit:contain;background:#eef2f6;border-radius:.35rem}
.fl-card-copy{min-width:0}
.fl-card h3{margin:.2rem 0 .35rem;font-size:1.03rem;line-height:1.3}
.fl-card a{color:#002d62;text-underline-offset:.16em}
.fl-card p,.fl-guidance{margin:0;font-size:.88rem;line-height:1.55}
.fl-card .fl-category{color:#425879;font-weight:650}
.fl-guidance{margin-top:1.15rem}
</style>
</head>
<body>
<main class="fl-page">
  <header class="fl-hero">
    <a href="/feria-artesanos">Volver a la Feria Digital</a>
    <h1>${title}</h1>
    <p>${description}</p>
  </header>
  <div class="fl-list">
    ${listings ? `<div class="fl-cities">${listings}</div>` : '<p>Todavía no hay perfiles de Florida publicados en la Feria.</p>'}
    <p class="fl-guidance">Los pedidos, pagos y entregas se coordinan directamente con cada artesano.</p>
  </div>
</main>
</body>
</html>`;
};
