module.exports = function(posts) {
  const cards = posts.map((p, i) => `
    <article class="blog-card${i === 0 ? ' blog-card-featured' : ''}">
      <a href="/blog/${p.slug}" class="blog-card-img-wrap">
        <img src="${p.image || '/img/og-planetaboricua.jpg'}" alt="${p.title}" loading="lazy">
        <span class="blog-card-cat">${p.category || 'Cultura Boricua'}</span>
      </a>
      <div class="blog-card-body">
        <h2 class="blog-card-title"><a href="/blog/${p.slug}">${p.title}</a></h2>
        <p class="blog-card-excerpt">${p.excerpt || ''}</p>
        <div class="blog-card-meta">
          <span class="blog-card-date">${p.date || ''}</span>
          <a href="/blog/${p.slug}" class="blog-card-read">Leer más →</a>
        </div>
      </div>
    </article>
  `).join('');

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Blog — Planeta Boricua | Más Boricua Que Un Mofongo</title>
<meta name="description" content="Artículos sobre cultura boricua, identidad, gastronomía y la diáspora puertorriqueña.">
<link rel="canonical" href="https://www.masboricuaqueunmofongo.com/blog">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8301223085122981" crossorigin="anonymous"></script>
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
.blog-header{background:linear-gradient(135deg,var(--blue),#001a3e);padding:3rem 2rem;text-align:center;}
.blog-header h1{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,3rem);font-weight:800;color:#fff;margin-bottom:0.5rem;}
.blog-header p{color:rgba(255,255,255,0.7);font-size:0.95rem;}
.blog-cats{background:#fff;border-bottom:1px solid var(--border);padding:0.8rem 0;overflow-x:auto;}
.blog-cats-inner{max-width:1200px;margin:0 auto;padding:0 2rem;display:flex;gap:0.5rem;flex-wrap:wrap;}
.blog-cat-btn{font-size:0.72rem;font-weight:700;color:var(--mid);text-decoration:none;padding:0.3rem 0.8rem;border:1px solid var(--border);border-radius:20px;white-space:nowrap;transition:all 0.2s;}
.blog-cat-btn:hover,.blog-cat-btn.active{background:var(--red);color:#fff;border-color:var(--red);}
.blog-main{max-width:1200px;margin:0 auto;padding:2rem;}
.blog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
.blog-card{background:#fff;border-radius:6px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.06);transition:box-shadow 0.2s;}
.blog-card:hover{box-shadow:0 4px 20px rgba(0,0,0,0.1);}
.blog-card-featured{grid-column:1/-1;}
.blog-card-featured .blog-card-img-wrap{height:380px;}
.blog-card-featured .blog-card-title a{font-size:1.6rem;}
.blog-card-img-wrap{display:block;position:relative;height:200px;overflow:hidden;text-decoration:none;}
.blog-card-img-wrap img{width:100%;height:100%;object-fit:cover;transition:transform 0.3s;}
.blog-card:hover .blog-card-img-wrap img{transform:scale(1.04);}
.blog-card-cat{position:absolute;top:0.8rem;left:0.8rem;background:var(--red);color:#fff;font-size:0.6rem;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;padding:0.2rem 0.6rem;border-radius:2px;}
.blog-card-body{padding:1.2rem;}
.blog-card-title{font-family:'Playfair Display',serif;font-size:1.05rem;font-weight:700;line-height:1.3;margin-bottom:0.6rem;}
.blog-card-title a{color:var(--dark);text-decoration:none;}
.blog-card-title a:hover{color:var(--red);}
.blog-card-excerpt{font-size:0.82rem;color:var(--mid);line-height:1.6;margin-bottom:0.8rem;}
.blog-card-meta{display:flex;align-items:center;justify-content:space-between;}
.blog-card-date{font-size:0.68rem;color:#999;}
.blog-card-read{font-size:0.75rem;font-weight:700;color:var(--red);text-decoration:none;}
.blog-empty{text-align:center;padding:4rem 2rem;color:var(--mid);}
footer{background:var(--dark);padding:2rem;text-align:center;margin-top:3rem;}
footer a{color:rgba(255,255,255,0.5);text-decoration:none;font-size:0.8rem;margin:0 0.5rem;}
footer p{color:rgba(255,255,255,0.3);font-size:0.75rem;margin-top:0.5rem;}
@media(max-width:768px){.blog-grid{grid-template-columns:1fr;}.blog-card-featured{grid-column:1;}.blog-card-featured .blog-card-img-wrap{height:220px;}.nav-links{display:none;}}
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
<div class="blog-header">
  <h1>📝 Blog Boricua</h1>
  <p>Cultura, identidad, gastronomía y la diáspora puertorriqueña — desde el Planeta Boricua</p>
</div>
<div class="blog-cats">
  <div class="blog-cats-inner">
    <a href="/blog" class="blog-cat-btn active">Todo</a>
    <a href="/blog/categoria/cultura" class="blog-cat-btn">Cultura</a>
    <a href="/blog/categoria/gastronomia" class="blog-cat-btn">Gastronomía</a>
    <a href="/blog/categoria/diaspora" class="blog-cat-btn">Diáspora</a>
    <a href="/blog/categoria/identidad" class="blog-cat-btn">Identidad</a>
    <a href="/blog/categoria/historia" class="blog-cat-btn">Historia</a>
    <a href="/blog/categoria/viajes" class="blog-cat-btn">Viajes</a>
  </div>
</div>
<div class="blog-main">
  <div class="blog-grid">
    ${cards.length ? cards : '<div class="blog-empty"><p>Artículos próximamente 🇵🇷</p></div>'}
  </div>
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
