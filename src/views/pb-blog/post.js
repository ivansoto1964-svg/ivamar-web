module.exports = function(post, relatedPosts) {
  const related = (relatedPosts || []).slice(0, 3).map(p => `
    <a href="/blog/${p.slug}" class="related-card">
      <div class="related-img">
        <img src="${p.image || '/img/og-planetaboricua.jpg'}" alt="${p.title}" loading="lazy">
      </div>
      <div class="related-body">
        <span class="related-cat">${p.category || 'Cultura Boricua'}</span>
        <h4 class="related-title">${p.title}</h4>
      </div>
    </a>
  `).join('');

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${post.title} — Planeta Boricua</title>
<meta name="description" content="${post.excerpt || post.title}">
<link rel="canonical" href="https://www.masboricuaqueunmofongo.com/blog/${post.slug}">
<meta property="og:type" content="article">
<meta property="og:title" content="${post.title}">
<meta property="og:description" content="${post.excerpt || post.title}">
<meta property="og:url" content="https://www.masboricuaqueunmofongo.com/blog/${post.slug}">
<meta property="og:image" content="${post.image || 'https://www.masboricuaqueunmofongo.com/img/og-planetaboricua.jpg'}">
<meta property="og:locale" content="es_PR">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8301223085122981" crossorigin="anonymous"></script>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"BlogPosting","headline":"${post.title}","description":"${post.excerpt || post.title}","datePublished":"${post.date || ''}","author":{"@type":"Organization","name":"Planeta Boricua"},"publisher":{"@type":"Organization","name":"Planeta Boricua","url":"https://www.masboricuaqueunmofongo.com"}}
</script>
<style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Inter',sans-serif;background:#f5f5f0;color:#111;overflow-x:hidden;}
:root{--red:#CE1126;--blue:#002D62;--dark:#111111;--mid:#666;--light:#f5f5f0;--white:#ffffff;--border:#e5e5e0;}
nav{background:#fff;border-bottom:3px solid var(--red);padding:0;position:sticky;top:0;z-index:100;}
.nav-top{max-width:1200px;margin:0 auto;padding:0.8rem 2rem;display:flex;align-items:center;justify-content:space-between;}
.nav-logo{display:flex;align-items:center;gap:0.6rem;text-decoration:none;}
.nav-flag{font-size:1.6rem;}
.nav-logo-text{font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:800;color:var(--dark);line-height:1;}
.nav-logo-sub{font-size:0.58rem;color:var(--mid);text-transform:uppercase;letter-spacing:0.08em;margin-top:0.1rem;}
.nav-links{display:flex;align-items:center;gap:1.5rem;}
.nav-links a{font-size:0.78rem;color:var(--mid);text-decoration:none;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;}
.nav-links a:hover{color:var(--red);}
.nav-cta{background:var(--red);color:#fff!important;padding:0.45rem 1rem;border-radius:3px;font-weight:700!important;}
.breadcrumb{max-width:1200px;margin:0 auto;padding:0.8rem 2rem;font-size:0.72rem;color:var(--mid);}
.breadcrumb a{color:var(--mid);text-decoration:none;}
.breadcrumb a:hover{color:var(--red);}
.breadcrumb span{margin:0 0.4rem;}
.post-hero{width:100%;height:420px;overflow:hidden;background:linear-gradient(135deg,var(--blue),var(--red));}
.post-hero img{width:100%;height:100%;object-fit:cover;}
.post-wrap{max-width:780px;margin:0 auto;padding:2rem;}
.post-cat{font-size:0.65rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:0.8rem;}
.post-title{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;line-height:1.2;color:var(--dark);margin-bottom:1rem;}
.post-meta{display:flex;align-items:center;gap:1rem;font-size:0.72rem;color:#999;margin-bottom:2rem;padding-bottom:1.5rem;border-bottom:1px solid var(--border);flex-wrap:wrap;}
.post-body{font-size:1.05rem;line-height:1.85;color:#222;}
.post-body h2{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:800;color:var(--dark);margin:2rem 0 0.8rem;}
.post-body h3{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:700;color:var(--dark);margin:1.5rem 0 0.6rem;}
.post-body p{margin-bottom:1.2rem;}
.post-body strong{color:var(--dark);}
.post-body a{color:var(--red);text-decoration:none;}
.post-body a:hover{text-decoration:underline;}
.post-body blockquote{border-left:3px solid var(--red);padding:0.8rem 1.2rem;margin:1.5rem 0;background:#fff;font-style:italic;color:var(--mid);}
.post-body hr{border:none;border-top:1px solid var(--border);margin:2rem 0;}
.post-share{margin:2.5rem 0;padding:1.5rem;background:#fff;border-radius:6px;text-align:center;}
.post-share p{font-size:0.85rem;color:var(--mid);margin-bottom:1rem;}
.share-btns{display:flex;gap:0.8rem;justify-content:center;flex-wrap:wrap;}
.share-btn{display:inline-flex;align-items:center;gap:0.4rem;padding:0.5rem 1.2rem;border-radius:4px;font-size:0.78rem;font-weight:700;text-decoration:none;color:#fff;}
.share-fb{background:#1877f2;}
.share-wa{background:#25d366;}
.share-tw{background:#000;}
.post-affiliate{background:linear-gradient(135deg,var(--blue),#001a3e);border-radius:8px;padding:1.5rem;margin:2rem 0;text-align:center;}
.post-affiliate p{color:rgba(255,255,255,0.8);font-size:0.85rem;margin-bottom:0.8rem;}
.post-affiliate-links{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}
.post-affiliate-links a{background:rgba(255,255,255,0.15);color:#fff;padding:0.5rem 1.2rem;border-radius:4px;font-size:0.8rem;font-weight:700;text-decoration:none;border:1px solid rgba(255,255,255,0.3);}
.post-amazon{background:#fff8e1;border:1px solid #f0d060;border-radius:6px;padding:1.2rem;margin:2rem 0;text-align:center;}
.post-amazon p{font-size:0.82rem;color:var(--mid);margin-bottom:0.6rem;}
.post-amazon a{background:#ff9900;color:#fff;padding:0.5rem 1.5rem;border-radius:4px;font-size:0.82rem;font-weight:700;text-decoration:none;display:inline-block;}
.post-related{margin-top:3rem;padding-top:2rem;border-top:1px solid var(--border);}
.post-related h3{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:800;color:var(--dark);margin-bottom:1.2rem;}
.related-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;}
.related-card{text-decoration:none;color:inherit;background:#fff;border-radius:4px;overflow:hidden;transition:box-shadow 0.2s;}
.related-card:hover{box-shadow:0 4px 16px rgba(0,0,0,0.08);}
.related-img{height:130px;overflow:hidden;}
.related-img img{width:100%;height:100%;object-fit:cover;transition:transform 0.3s;}
.related-card:hover .related-img img{transform:scale(1.04);}
.related-body{padding:0.8rem;}
.related-cat{font-size:0.58rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;display:block;margin-bottom:0.3rem;}
.related-title{font-family:'Playfair Display',serif;font-size:0.88rem;font-weight:700;color:var(--dark);line-height:1.3;}
footer{background:var(--dark);padding:2rem;text-align:center;margin-top:3rem;}
footer a{color:rgba(255,255,255,0.5);text-decoration:none;font-size:0.8rem;margin:0 0.5rem;}
footer p{color:rgba(255,255,255,0.3);font-size:0.75rem;margin-top:0.5rem;}
@media(max-width:768px){.post-hero{height:240px;}.post-wrap{padding:1.2rem;}.related-grid{grid-template-columns:1fr;}.nav-links{display:none;}.post-meta{gap:0.5rem;}}
</style>
</head>
<body>
<nav>
  <div class="nav-top">
    <a href="/" class="nav-logo">
      <span class="nav-flag">🇵🇷</span>
      <div>
        <div class="nav-logo-text">Planeta Boricua</div>
        <div class="nav-logo-sub">Más Boricua Que Un Mofongo</div>
      </div>
    </a>
    <div class="nav-links">
      <a href="/">Portal</a>
      <a href="/blog" style="color:var(--red)">Blog</a>
      <a href="/#directorio">Directorio</a>
      <a href="/pb/add-negocio" class="nav-cta">Registra tu negocio</a>
    </div>
  </div>
</nav>
<div class="breadcrumb">
  <a href="/">Inicio</a><span>›</span>
  <a href="/blog">Blog</a><span>›</span>
  ${post.title}
</div>
<div class="post-hero">
  <img src="${post.image || '/img/og-planetaboricua.jpg'}" alt="${post.title}">
</div>
<div class="post-wrap">
  <div class="post-cat">🇵🇷 ${post.category || 'Cultura Boricua'}</div>
  <h1 class="post-title">${post.title}</h1>
  <div class="post-meta">
    <span>📅 ${post.date || ''}</span>
    <span>✍️ Planeta Boricua</span>
    <span>⏱️ ${post.readTime || '5'} min de lectura</span>
  </div>
  <div class="post-body">
    ${post.content}
  </div>
  <div class="post-share">
    <p>¿Te gustó este artículo? Compártelo con otro boricua 🇵🇷</p>
    <div class="share-btns">
      <a href="https://www.facebook.com/sharer/sharer.php?u=https://www.masboricuaqueunmofongo.com/blog/${post.slug}" target="_blank" class="share-btn share-fb">👍 Facebook</a>
      <a href="https://wa.me/?text=https://www.masboricuaqueunmofongo.com/blog/${post.slug}" target="_blank" class="share-btn share-wa">💬 WhatsApp</a>
      <a href="https://twitter.com/intent/tweet?url=https://www.masboricuaqueunmofongo.com/blog/${post.slug}" target="_blank" class="share-btn share-tw">𝕏 Twitter</a>
    </div>
  </div>
  <div class="post-affiliate">
    <p>🇵🇷 ¿Vas a viajar a Puerto Rico?</p>
    <div class="post-affiliate-links">
      <a href="https://booking.tpo.lu/OcdV3VzY" target="_blank">🏨 Hoteles en Booking.com</a>
      <a href="https://trip.tpo.lu/tOQAQ2WQ" target="_blank">✈️ Vuelos y hoteles en Trip.com</a>
    </div>
  </div>
  <div class="post-amazon">
    <p>🛍️ Tienda Boricua — productos puertorriqueños en Amazon</p>
    <a href="https://www.amazon.com/shop/planetaboricua" target="_blank">Ver Tienda Boricua →</a>
  </div>
  ${related ? `<div class="post-related"><h3>Sigue explorando Planeta Boricua</h3><div class="related-grid">${related}</div></div>` : ''}
</div>
<footer>
  <a href="/">Portal</a>
  <a href="/blog">Blog</a>
  <a href="/#directorio">Directorio</a>
  <a href="/pb/add-negocio">Añadir Negocio</a>
  <a href="/privacidad-boricua">Privacidad</a>
  <p>© 2026 Planeta Boricua — Ivamar AI LLC · Más Boricua Que Un Mofongo 🇵🇷</p>
</footer>
</body>
</html>`;
};
