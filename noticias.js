// src/views/planetaboricua/noticias.js
module.exports = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PBN Noticias — Planeta Boricua Noticias</title>
<meta name="description" content="Las últimas noticias de Puerto Rico y la diáspora boricua. Mantente informado con Planeta Boricua Noticias — PBN.">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'DM Sans',sans-serif;background:#f5f5f0;color:#1a1a1a;}
:root{--blue:#002D62;--red:#CE1126;--white:#fff;--light:#f5f5f0;--border:#e5e5e0;--mid:#666;}

/* NAV */
nav{background:var(--blue);padding:0 2rem;display:flex;align-items:center;justify-content:space-between;height:64px;position:sticky;top:0;z-index:100;}
.nav-logo{display:flex;align-items:center;gap:0.8rem;text-decoration:none;}
.nav-logo img{height:40px;width:40px;object-fit:contain;}
.nav-logo-text{font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;color:#fff;}
.nav-logo-sub{font-size:0.6rem;color:rgba(255,255,255,0.6);text-transform:uppercase;letter-spacing:0.08em;}
.nav-back{font-size:0.8rem;color:rgba(255,255,255,0.7);text-decoration:none;display:flex;align-items:center;gap:0.4rem;}
.nav-back:hover{color:#fff;}

/* HERO */
.hero{background:linear-gradient(135deg,var(--blue),#001a4d);padding:3rem 2rem;text-align:center;}
.hero-logo{width:120px;height:120px;object-fit:contain;margin:0 auto 1.5rem;}
.hero-title{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;color:#fff;margin-bottom:0.5rem;}
.hero-sub{font-size:0.9rem;color:rgba(255,255,255,0.65);max-width:500px;margin:0 auto;}
.hero-live{display:inline-flex;align-items:center;gap:0.5rem;background:var(--red);color:#fff;font-size:0.72rem;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;padding:0.3rem 0.8rem;border-radius:4px;margin-top:1rem;}
.hero-live::before{content:'';width:8px;height:8px;background:#fff;border-radius:50%;animation:pulse 1.5s infinite;}
@keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.3;}}

/* FILTROS */
.filtros{background:#fff;border-bottom:1px solid var(--border);padding:0.8rem 2rem;display:flex;gap:0.5rem;flex-wrap:wrap;align-items:center;position:sticky;top:64px;z-index:99;}
.filtro-btn{font-size:0.75rem;padding:0.4rem 0.9rem;border:1px solid var(--border);border-radius:20px;background:#fff;cursor:pointer;color:var(--mid);font-weight:600;transition:all 0.15s;font-family:inherit;}
.filtro-btn.active,.filtro-btn:hover{background:var(--blue);color:#fff;border-color:var(--blue);}

/* GRID */
.noticias-wrap{max-width:1200px;margin:0 auto;padding:2rem;}
.noticias-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem;}
.noticia-card{background:#fff;border-radius:8px;overflow:hidden;border:1px solid var(--border);transition:all 0.2s;text-decoration:none;color:inherit;display:flex;flex-direction:column;}
.noticia-card:hover{border-color:var(--red);box-shadow:0 4px 16px rgba(206,17,38,0.08);transform:translateY(-2px);}
.noticia-img{width:100%;height:180px;object-fit:cover;display:block;background:var(--light);}
.noticia-body{padding:1rem;flex:1;display:flex;flex-direction:column;}
.noticia-meta{display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;}
.noticia-source{font-size:0.65rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.08em;}
.noticia-cat{font-size:0.62rem;color:var(--mid);background:var(--light);padding:0.15rem 0.4rem;border-radius:3px;}
.noticia-title{font-size:0.9rem;font-weight:700;color:#1a1a1a;line-height:1.4;margin-bottom:0.5rem;flex:1;}
.noticia-summary{font-size:0.78rem;color:var(--mid);line-height:1.5;margin-bottom:0.5rem;}
.noticia-date{font-size:0.68rem;color:#aaa;margin-top:auto;}
.noticia-placeholder{background:var(--light);height:180px;}

/* EMPTY STATE */
.empty{text-align:center;padding:4rem 2rem;color:var(--mid);}
.empty-icon{font-size:3rem;margin-bottom:1rem;}

/* FOOTER */
footer{background:var(--blue);padding:1.5rem 2rem;text-align:center;}
.footer-logo{display:flex;align-items:center;justify-content:center;gap:0.8rem;margin-bottom:0.5rem;}
.footer-logo img{height:36px;width:36px;object-fit:contain;}
.footer-logo-text{font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;color:#fff;}
.footer-info{font-size:0.68rem;color:rgba(255,255,255,0.4);}

@media(max-width:768px){
  .noticias-grid{grid-template-columns:1fr;}
  .filtros{padding:0.8rem 1rem;}
  .noticias-wrap{padding:1rem;}
  nav{padding:0 1rem;}
}
</style>
</head>
<body>

<nav>
  <a href="/" class="nav-logo">
    <img src="/pbn-logo.webp" alt="PBN">
    <div>
      <div class="nav-logo-text">PBN Noticias</div>
      <div class="nav-logo-sub">Planeta Boricua</div>
    </div>
  </a>
  <a href="/" class="nav-back">← Volver al portal</a>
</nav>

<section class="hero">
  <img src="/pbn-logo.webp" alt="PBN Noticias" class="hero-logo">
  <h1 class="hero-title">Planeta Boricua Noticias</h1>
  <p class="hero-sub">Las últimas noticias de Puerto Rico y la diáspora boricua — actualizadas automáticamente.</p>
  <div class="hero-live">🔴 En vivo</div>
</section>

<div class="filtros">
  <button class="filtro-btn active" onclick="filtrarNoticias('')">Todas</button>
  <button class="filtro-btn" onclick="filtrarNoticias('Puerto Rico')">🇵🇷 Puerto Rico</button>
  <button class="filtro-btn" onclick="filtrarNoticias('Internacional')">🌎 Internacional</button>
  <button class="filtro-btn" onclick="filtrarNoticias('Investigación')">🔍 Investigación</button>
</div>

<div class="noticias-wrap">
  <div class="noticias-grid" id="pbn-grid">
    <div class="noticia-card"><div class="noticia-placeholder"></div><div class="noticia-body"><div class="noticia-title" style="background:var(--light);height:14px;border-radius:4px;margin-bottom:0.5rem;"></div><div class="noticia-title" style="background:var(--light);height:14px;border-radius:4px;width:70%;"></div></div></div>
    <div class="noticia-card"><div class="noticia-placeholder"></div><div class="noticia-body"><div class="noticia-title" style="background:var(--light);height:14px;border-radius:4px;margin-bottom:0.5rem;"></div><div class="noticia-title" style="background:var(--light);height:14px;border-radius:4px;width:70%;"></div></div></div>
    <div class="noticia-card"><div class="noticia-placeholder"></div><div class="noticia-body"><div class="noticia-title" style="background:var(--light);height:14px;border-radius:4px;margin-bottom:0.5rem;"></div><div class="noticia-title" style="background:var(--light);height:14px;border-radius:4px;width:70%;"></div></div></div>
  </div>
</div>

<footer>
  <div class="footer-logo">
    <img src="/pbn-logo.webp" alt="PBN">
    <span class="footer-logo-text">PBN Noticias</span>
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
  } catch(e) {
    document.getElementById('pbn-grid').innerHTML = '<div class="empty" style="grid-column:1/-1"><div class="empty-icon">📡</div><div>Error cargando noticias. Intenta de nuevo.</div></div>';
  }
}

function renderNoticias(noticias) {
  const grid = document.getElementById('pbn-grid');
  if (!noticias.length) {
    grid.innerHTML = '<div class="empty" style="grid-column:1/-1"><div class="empty-icon">📰</div><div>No hay noticias disponibles en este momento.</div></div>';
    return;
  }
  grid.innerHTML = noticias.map(function(n) {
    return '<a href="' + n.link + '" target="_blank" rel="noopener" class="noticia-card">' +
      (n.img ? '<img src="' + n.img + '" alt="' + n.title + '" class="noticia-img" onerror="this.style.display=\'none\'">' : '<div class="noticia-placeholder"></div>') +
      '<div class="noticia-body">' +
      '<div class="noticia-meta">' +
      '<span class="noticia-source">' + (n.source || 'PBN') + '</span>' +
      '<span class="noticia-cat">' + (n.categoria || 'Noticias') + '</span>' +
      '</div>' +
      '<div class="noticia-title">' + n.title + '</div>' +
      (n.summary && n.summary !== '...' ? '<div class="noticia-summary">' + n.summary + '</div>' : '') +
      '<div class="noticia-date">' + (n.date || '') + '</div>' +
      '</div></a>';
  }).join('');
}

function filtrarNoticias(categoria) {
  document.querySelectorAll('.filtro-btn').forEach(function(btn) {
    btn.classList.remove('active');
    if ((!categoria && btn.textContent.includes('Todas')) || btn.textContent.includes(categoria)) {
      btn.classList.add('active');
    }
  });
  if (!categoria) {
    renderNoticias(todasNoticias);
  } else {
    renderNoticias(todasNoticias.filter(function(n) { return n.categoria === categoria; }));
  }
}

cargarNoticias();
</script>
</body>
</html>`;
