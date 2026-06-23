// src/views/planetaboricua/noticias.js
module.exports = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PBN Noticias — Planeta Boricua</title>
<meta name="description" content="Las últimas noticias de Puerto Rico y la diáspora boricua. Mantente informado con Planeta Boricua Noticias — PBN.">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8301223085122981" crossorigin="anonymous"></script>
<style>
*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'Inter',sans-serif;background:#f5f5f0;color:#111;overflow-x:hidden;}
:root{
  --red:#CE1126;
  --blue:#002D62;
  --dark:#111111;
  --mid:#666;
  --light:#f5f5f0;
  --white:#ffffff;
  --border:#e5e5e0;
  --card:#ffffff;
}
nav{background:var(--white);border-bottom:3px solid var(--red);padding:0;position:sticky;top:0;z-index:100;}
.nav-top{max-width:1200px;margin:0 auto;padding:0.8rem 2rem;display:flex;align-items:center;justify-content:space-between;}
.nav-logo{display:flex;align-items:center;gap:0.6rem;text-decoration:none;}
.nav-logo-text{font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:800;color:var(--dark);line-height:1;}
.nav-logo-sub{font-size:0.58rem;color:var(--mid);text-transform:uppercase;letter-spacing:0.08em;margin-top:0.1rem;}
.nav-links{display:flex;align-items:center;gap:2rem;}
.nav-links a{font-size:0.8rem;color:var(--mid);text-decoration:none;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;transition:color 0.2s;}
.nav-links a:hover{color:var(--red);}
.nav-cta{background:var(--red);color:#fff!important;padding:0.45rem 1rem;border-radius:3px;font-weight:700;}
.nav-ticker{background:var(--red);padding:0.3rem 0;overflow:hidden;}
.nav-ticker-inner{max-width:1200px;margin:0 auto;padding:0 2rem;display:flex;align-items:center;gap:1rem;}
.nav-ticker-label{font-size:0.62rem;font-weight:800;color:#fff;text-transform:uppercase;letter-spacing:0.1em;white-space:nowrap;background:rgba(0,0,0,0.2);padding:0.15rem 0.5rem;}
.nav-ticker-text{font-size:0.72rem;color:rgba(255,255,255,0.9);white-space:nowrap;}

.pbn-hero{background:linear-gradient(135deg,var(--blue),#001a4d);padding:2.5rem 2rem;text-align:center;}
.pbn-hero-logo{width:100px;height:100px;object-fit:contain;margin:0 auto 1rem;display:block;}
.pbn-hero-title{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;color:#fff;margin-bottom:0.4rem;}
.pbn-hero-sub{font-size:0.88rem;color:rgba(255,255,255,0.65);max-width:480px;margin:0 auto;}
.pbn-live{display:inline-flex;align-items:center;gap:0.5rem;background:var(--red);color:#fff;font-size:0.68rem;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;padding:0.25rem 0.7rem;border-radius:3px;margin-top:0.8rem;}
.pbn-live-dot{width:7px;height:7px;background:#fff;border-radius:50%;animation:pulse 1.5s infinite;}
@keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.3;}}

.filtros-wrap{background:var(--white);border-bottom:1px solid var(--border);padding:0.7rem 0;position:sticky;top:64px;z-index:99;}
.filtros-inner{max-width:1200px;margin:0 auto;padding:0 2rem;display:flex;gap:0.5rem;flex-wrap:wrap;align-items:center;}
.filtro-btn{font-size:0.72rem;padding:0.35rem 0.8rem;border:1px solid var(--border);border-radius:2px;background:#fff;cursor:pointer;color:var(--mid);font-weight:600;transition:all 0.15s;font-family:inherit;text-transform:uppercase;letter-spacing:0.05em;}
.filtro-btn.active,.filtro-btn:hover{background:var(--red);color:#fff;border-color:var(--red);}

.noticias-wrap{max-width:1200px;margin:0 auto;padding:2rem;}
.noticias-header{display:flex;align-items:center;gap:1rem;padding-bottom:0.8rem;border-bottom:2px solid var(--red);margin-bottom:1.5rem;}
.noticias-header-title{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:800;color:var(--dark);}
.noticias-count{font-size:0.72rem;color:var(--mid);}

.noticias-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem;}
.noticia-card{background:var(--white);border-radius:4px;overflow:hidden;text-decoration:none;color:inherit;display:flex;flex-direction:column;transition:box-shadow 0.2s;border:1px solid var(--border);}
.noticia-card:hover{box-shadow:0 4px 20px rgba(0,0,0,0.08);}
.noticia-img{height:160px;overflow:hidden;background:linear-gradient(135deg,#e5e5e0,#d0d0ca);display:flex;align-items:center;justify-content:center;font-size:3rem;}
.noticia-img img{width:100%;height:100%;object-fit:cover;transition:transform 0.3s;}
.noticia-card:hover .noticia-img img{transform:scale(1.03);}
.noticia-body{padding:1rem;flex:1;display:flex;flex-direction:column;}
.noticia-meta{display:flex;justify-content:space-between;align-items:center;margin-bottom:0.4rem;}
.noticia-cat{font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;}
.noticia-source{font-size:0.62rem;color:var(--mid);background:var(--light);padding:0.1rem 0.4rem;border-radius:2px;}
.noticia-title{font-family:'Playfair Display',serif;font-size:0.95rem;font-weight:700;color:var(--dark);line-height:1.35;margin-bottom:0.4rem;flex:1;}
.noticia-summary{font-size:0.78rem;color:var(--mid);line-height:1.5;margin-bottom:0.5rem;}
.noticia-date{font-size:0.65rem;color:#aaa;margin-top:auto;}

.skeleton{background:linear-gradient(90deg,#f0f0ea 25%,#e8e8e2 50%,#f0f0ea 75%);background-size:200% 100%;animation:shimmer 1.5s infinite;}
@keyframes shimmer{0%{background-position:200% 0;}100%{background-position:-200% 0;}}
.skeleton-img{height:160px;}
.skeleton-line{height:12px;border-radius:2px;margin-bottom:0.5rem;}
.skeleton-line.short{width:60%;}

footer{background:var(--blue);padding:2rem;text-align:center;margin-top:3rem;}
.footer-logo{display:flex;align-items:center;justify-content:center;gap:0.8rem;margin-bottom:0.5rem;}
.footer-logo img{height:36px;width:36px;object-fit:contain;}
.footer-logo-text{font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;color:#fff;}
.footer-info{font-size:0.68rem;color:rgba(255,255,255,0.4);}
.footer-links{display:flex;gap:1.5rem;justify-content:center;margin:0.8rem 0;}
.footer-links a{font-size:0.72rem;color:rgba(255,255,255,0.5);text-decoration:none;}
.footer-links a:hover{color:#fff;}

@media(max-width:768px){
  .noticias-grid{grid-template-columns:1fr;}
  .nav-links{display:none;}
  .noticias-wrap{padding:1rem;}
  .filtros-inner{padding:0 1rem;}
}
</style>
</head>
<body>

<nav>
  <div class="nav-top">
    <a href="/" class="nav-logo">
      <img src="/pbn-logo.webp" alt="PBN" style="height:40px;width:40px;object-fit:contain;">
      <div>
        <div class="nav-logo-text">Planeta Boricua</div>
        <div class="nav-logo-sub">Más Boricua Que Un Mofongo</div>
      </div>
    </a>
    <div class="nav-links">
      <a href="/">Inicio</a>
      <a href="/recursos">Recursos PR↔USA</a>
      <a href="/#directorio">Directorio</a>
      <a href="/#viajes">Viajes</a>
      <a href="/#newsletter" class="nav-cta">Newsletter →</a>
    </div>
  </div>
  <div class="nav-ticker">
    <div class="nav-ticker-inner">
      <span class="nav-ticker-label">🔴 En vivo</span>
      <span class="nav-ticker-text">Noticias de Puerto Rico y la diáspora boricua · Cultura · Política · Deportes · Gastronomía · Comunidad</span>
    </div>
  </div>
</nav>

<section class="pbn-hero">
  <img src="/pbn-logo.webp" alt="PBN Noticias" class="pbn-hero-logo">
  <h1 class="pbn-hero-title">Planeta Boricua Noticias</h1>
  <p class="pbn-hero-sub">Las últimas noticias de Puerto Rico y la diáspora — actualizadas automáticamente.</p>
  <div class="pbn-live"><div class="pbn-live-dot"></div>En vivo</div>
</section>

<div class="filtros-wrap">
  <div class="filtros-inner">
    <button class="filtro-btn active" onclick="filtrarNoticias('')">Todas</button>
    <button class="filtro-btn" onclick="filtrarNoticias('Puerto Rico')">🇵🇷 Puerto Rico</button>
    <button class="filtro-btn" onclick="filtrarNoticias('Internacional')">🌎 Internacional</button>
    <button class="filtro-btn" onclick="filtrarNoticias('Investigación')">🔍 Investigación</button>
  </div>
</div>

<div class="noticias-wrap">
  <div class="noticias-header">
    <img src="/pbn-logo.webp" alt="PBN" style="height:28px;width:28px;object-fit:contain;">
    <span class="noticias-header-title">Últimas Noticias</span>
    <span class="noticias-count" id="noticias-count">Cargando...</span>
  </div>
  <div class="noticias-grid" id="pbn-grid">
    ${[1,2,3,4,5,6].map(() => '<div class="noticia-card"><div class="noticia-img skeleton skeleton-img"></div><div class="noticia-body"><div class="skeleton skeleton-line" style="width:40%;margin-bottom:0.8rem;"></div><div class="skeleton skeleton-line"></div><div class="skeleton skeleton-line short"></div></div></div>').join('')}
  </div>
</div>

<footer>
  <div class="footer-logo">
    <img src="/pbn-logo.webp" alt="PBN">
    <span class="footer-logo-text">PBN Noticias</span>
  </div>
  <div class="footer-links">
    <a href="/">Inicio</a>
    <a href="/recursos">Recursos</a>
    <a href="/#directorio">Directorio</a>
    <a href="/pb/add-negocio">Añadir Negocio</a>
  </div>
  <div class="footer-info">© 2026 Planeta Boricua · masboricuaqueunmofongo.com · Un proyecto de Ivamar AI LLC</div>
</footer>

<script>
let todasNoticias = [];

async function cargarNoticias() {
  try {
    const res = await fetch('/api/noticias-pr');
    const noticias = await res.json();
    todasNoticias = noticias;
    renderNoticias(noticias);
    document.getElementById('noticias-count').textContent = noticias.length + ' noticias';
  } catch(e) {
    document.getElementById('pbn-grid').innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--mid);">Error cargando noticias. Intenta de nuevo.</div>';
  }
}

function renderNoticias(noticias) {
  const grid = document.getElementById('pbn-grid');
  if (!noticias.length) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--mid);"><div style="font-size:3rem;margin-bottom:1rem;">📰</div><div>No hay noticias disponibles en este momento.</div></div>';
    return;
  }
  grid.innerHTML = noticias.map(function(n) {
    var imgHtml = n.img
      ? '<div class="noticia-img"><img src="' + n.img + '" alt="" style="width:100%;height:100%;object-fit:cover;"></div>'
      : '<div class="noticia-img">📰</div>';
    return '<a href="' + n.link + '" target="_blank" rel="noopener" class="noticia-card">' +
      imgHtml +
      '<div class="noticia-body">' +
      '<div class="noticia-meta">' +
      '<span class="noticia-cat">' + (n.categoria || 'Noticias') + '</span>' +
      '<span class="noticia-source">' + (n.source || 'PBN') + '</span>' +
      '</div>' +
      '<div class="noticia-title">' + n.title + '</div>' +
      (n.summary && n.summary !== '...' ? '<div class="noticia-summary">' + n.summary + '</div>' : '') +
      '<div class="noticia-date">' + (n.date || '') + '</div>' +
      '</div></a>';
  }).join('');
}

function filtrarNoticias(categoria) {
  document.querySelectorAll('.filtro-btn').forEach(function(btn) {
    btn.classList.toggle('active', !categoria ? btn.textContent.includes('Todas') : btn.textContent.includes(categoria));
  });
  renderNoticias(categoria ? todasNoticias.filter(function(n){ return n.categoria === categoria; }) : todasNoticias);
  document.getElementById('noticias-count').textContent = (categoria ? todasNoticias.filter(function(n){ return n.categoria === categoria; }).length : todasNoticias.length) + ' noticias';
}

cargarNoticias();
</script>
</body>
</html>`;
