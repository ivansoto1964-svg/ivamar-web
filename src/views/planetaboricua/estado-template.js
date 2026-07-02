// src/views/planetaboricua/estado-template.js
module.exports = function renderEstado(estado) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Boricuas en ${estado.nombre} — Planeta Boricua</title>
<meta name="description" content="${estado.descripcionSEO}">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8301223085122981" crossorigin="anonymous"></script>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'DM Sans',sans-serif;background:#f8f5f0;color:#1a1a1a;overflow-x:hidden;}
:root{--red:#CE1126;--blue:#002D62;--dark:#1a1a1a;--mid:#555;--light:#f8f5f0;--border:#e8e0d5;--white:#fff;}

/* NAV */
nav{background:var(--white);border-bottom:2px solid var(--red);padding:0 2rem;display:flex;align-items:center;justify-content:space-between;height:64px;position:sticky;top:0;z-index:100;box-shadow:0 2px 8px rgba(0,0,0,0.06);}
.nav-logo{display:flex;align-items:center;gap:0.6rem;text-decoration:none;}
.nav-logo-text{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;color:var(--dark);}
.nav-logo-text span{color:var(--red);}
.nav-links{display:flex;align-items:center;gap:1rem;}
.nav-links a{font-size:0.8rem;color:var(--mid);text-decoration:none;font-weight:500;}
.nav-cta{background:var(--red);color:var(--white)!important;padding:0.45rem 1rem;border-radius:20px;font-weight:700!important;}

/* HERO */
.hero{position:relative;min-height:70vh;display:flex;align-items:flex-end;overflow:hidden;}
.hero-bg{position:absolute;inset:0;background:${estado.gradient};}
.hero-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
.hero-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.2) 60%);}
.hero-content{position:relative;z-index:1;max-width:1100px;margin:0 auto;width:100%;padding:3rem 2rem;}
.hero-eyebrow{font-size:0.68rem;font-weight:700;color:rgba(255,255,255,0.6);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:0.5rem;}
.hero h1{font-family:'Playfair Display',serif;font-size:clamp(2.5rem,6vw,4.5rem);font-weight:700;color:#fff;line-height:1.1;margin-bottom:0.6rem;}
.hero h1 em{color:#ff8dcb;font-style:normal;}
.hero-tagline{font-size:1rem;color:rgba(255,255,255,0.75);margin-bottom:1.5rem;font-style:italic;}
.hero-stats{display:flex;gap:1rem;flex-wrap:wrap;}
.hero-stat{background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:10px;padding:0.6rem 1.2rem;text-align:center;backdrop-filter:blur(4px);}
.hero-stat-num{font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:700;color:#fff;}
.hero-stat-label{font-size:0.62rem;color:rgba(255,255,255,0.6);margin-top:0.1rem;}

/* SEARCH SECTION */
.search-sec{background:var(--white);padding:2.5rem 2rem;border-bottom:1px solid var(--border);box-shadow:0 4px 16px rgba(0,0,0,0.05);}
.search-inner{max-width:900px;margin:0 auto;}
.search-title{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;color:var(--dark);margin-bottom:0.4rem;}
.search-sub{font-size:0.85rem;color:var(--mid);margin-bottom:1.5rem;}
.search-box{display:flex;gap:0.8rem;flex-wrap:wrap;margin-bottom:1.2rem;}
.search-input{flex:1;min-width:200px;border:2px solid var(--border);border-radius:8px;padding:0.85rem 1rem;font-size:0.92rem;font-family:inherit;outline:none;transition:border 0.2s;}
.search-input:focus{border-color:var(--red);}
.search-btn{background:var(--red);color:#fff;border:none;border-radius:8px;padding:0.85rem 2rem;font-size:0.92rem;font-weight:700;cursor:pointer;font-family:inherit;white-space:nowrap;}
.cat-pills{display:flex;gap:0.5rem;flex-wrap:wrap;}
.cat-pill{font-size:0.78rem;padding:0.4rem 0.9rem;border:1.5px solid var(--border);border-radius:20px;background:var(--white);cursor:pointer;color:var(--dark);font-weight:600;transition:all 0.2s;white-space:nowrap;}
.cat-pill.active,.cat-pill:hover{background:var(--red);color:#fff;border-color:var(--red);}

/* RESULTS */
.results-sec{padding:2.5rem 2rem;}
.results-inner{max-width:1100px;margin:0 auto;}
.results-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.2rem;flex-wrap:wrap;gap:0.5rem;}
.results-count{font-size:0.85rem;color:var(--mid);}
.results-add{font-size:0.8rem;font-weight:700;color:var(--red);text-decoration:none;}
.biz-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;}
.biz-card{background:var(--white);border-radius:12px;padding:1.2rem;border:1px solid var(--border);transition:all 0.2s;position:relative;}
.biz-card:hover{box-shadow:0 4px 20px rgba(0,0,0,0.08);transform:translateY(-2px);}
.biz-card.destacado{border:2px solid var(--red);}
.biz-badge-dest{position:absolute;top:0.8rem;right:0.8rem;background:var(--red);color:#fff;font-size:0.6rem;font-weight:800;padding:0.2rem 0.5rem;border-radius:4px;text-transform:uppercase;letter-spacing:0.05em;}
.biz-cat{font-size:0.62rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.3rem;}
.biz-name{font-size:0.95rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;line-height:1.3;}
.biz-desc{font-size:0.78rem;color:var(--mid);line-height:1.5;margin-bottom:0.6rem;}
.biz-info{font-size:0.75rem;color:var(--mid);}
.biz-links{display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:0.6rem;}
.biz-link{font-size:0.72rem;font-weight:700;color:var(--blue);text-decoration:none;padding:0.25rem 0.6rem;border:1px solid var(--blue);border-radius:4px;}
.biz-link.wa{color:#25D366;border-color:#25D366;}
.biz-empty{text-align:center;padding:3rem;color:var(--mid);grid-column:1/-1;}
.biz-empty-icon{font-size:2.5rem;margin-bottom:0.8rem;}
.biz-empty-title{font-weight:700;color:var(--dark);margin-bottom:0.4rem;}

/* CIUDADES */
.ciudades-sec{padding:3rem 2rem;background:var(--white);border-top:1px solid var(--border);}
.ciudades-inner{max-width:1100px;margin:0 auto;}
.sec-tag{font-size:0.62rem;font-weight:800;color:var(--red);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:0.4rem;}
.sec-title{font-family:'Playfair Display',serif;font-size:clamp(1.6rem,3vw,2.2rem);font-weight:700;color:var(--dark);margin-bottom:1.5rem;}
.ciudades-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;}
.ciudad-card{border-radius:12px;overflow:hidden;border:1px solid var(--border);transition:all 0.2s;cursor:pointer;}
.ciudad-card:hover{transform:translateY(-2px);box-shadow:0 4px 16px rgba(0,0,0,0.08);}
.ciudad-img{height:120px;display:flex;align-items:center;justify-content:center;font-size:2.5rem;background:${estado.gradient};background-size:cover;background-position:center;}
.ciudad-body{padding:1rem;background:var(--white);}
.ciudad-nombre{font-size:0.92rem;font-weight:700;color:var(--dark);margin-bottom:0.2rem;}
.ciudad-pop{font-size:0.7rem;font-weight:700;color:var(--red);margin-bottom:0.3rem;}
.ciudad-desc{font-size:0.75rem;color:var(--mid);line-height:1.5;}

/* RECURSOS GOB */
.recursos-sec{padding:3rem 2rem;background:var(--light);border-top:1px solid var(--border);}
.recursos-inner{max-width:1100px;margin:0 auto;}
.condado-select{display:flex;gap:1rem;align-items:center;flex-wrap:wrap;margin-bottom:1.5rem;}
.condado-dropdown{border:2px solid var(--border);border-radius:8px;padding:0.7rem 1rem;font-size:0.88rem;font-family:inherit;outline:none;background:var(--white);}
.recursos-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;}
.recurso-card{background:var(--white);border-radius:10px;padding:1rem;border:1px solid var(--border);text-align:center;transition:all 0.2s;}
.recurso-card:hover{border-color:var(--blue);box-shadow:0 2px 12px rgba(0,0,0,0.06);}
.recurso-icon{font-size:1.8rem;margin-bottom:0.5rem;}
.recurso-nombre{font-size:0.8rem;font-weight:700;color:var(--dark);margin-bottom:0.2rem;}
.recurso-desc{font-size:0.7rem;color:var(--mid);margin-bottom:0.5rem;}
.recurso-link{font-size:0.7rem;font-weight:700;color:var(--blue);text-decoration:none;}

/* VIAJES */
.viajes-sec{padding:3rem 2rem;background:linear-gradient(135deg,var(--blue),#001a4d);}
.viajes-inner{max-width:800px;margin:0 auto;text-align:center;}
.viajes-title{font-family:'Playfair Display',serif;font-size:clamp(1.6rem,3vw,2.2rem);font-weight:700;color:#fff;margin-bottom:0.6rem;}
.viajes-sub{font-size:0.88rem;color:rgba(255,255,255,0.65);margin-bottom:1.5rem;}
.viajes-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}
.viaje-btn{display:inline-flex;align-items:center;gap:0.5rem;padding:0.85rem 1.8rem;border-radius:25px;font-size:0.88rem;font-weight:700;text-decoration:none;}

/* TIENDA */
.tienda-sec{padding:3rem 2rem;background:var(--white);border-top:1px solid var(--border);text-align:center;}
.tienda-inner{max-width:600px;margin:0 auto;}
.tienda-title{font-family:'Playfair Display',serif;font-size:1.6rem;font-weight:700;color:var(--dark);margin-bottom:0.5rem;}
.tienda-sub{font-size:0.85rem;color:var(--mid);margin-bottom:1.2rem;}
.tienda-btn{display:inline-flex;align-items:center;gap:0.5rem;background:var(--red);color:#fff;padding:0.85rem 2rem;border-radius:25px;font-size:0.9rem;font-weight:700;text-decoration:none;}

/* FOOTER */
.estado-footer{background:var(--dark);padding:1.5rem 2rem;text-align:center;}
.estado-footer a{color:rgba(255,255,255,0.5);text-decoration:none;font-size:0.8rem;margin:0 0.5rem;}
.estado-footer a:hover{color:#fff;}

/* RESPONSIVE */
@media(max-width:768px){
  .biz-grid{grid-template-columns:1fr 1fr;}
  .ciudades-grid{grid-template-columns:1fr 1fr;}
  .recursos-grid{grid-template-columns:1fr 1fr;}
  .search-box{flex-direction:column;}
  .search-btn{width:100%;}
}
@media(max-width:480px){
  .biz-grid{grid-template-columns:1fr;}
  .ciudades-grid{grid-template-columns:1fr;}
  .recursos-grid{grid-template-columns:1fr 1fr;}
}
</style>
</head>
<body>

<!-- NAV -->
<nav>
  <a href="/" class="nav-logo">
    <span style="font-size:1.3rem;">🇵🇷</span>
    <span class="nav-logo-text">Planeta <span>Boricua</span></span>
  </a>
  <div class="nav-links">
    <a href="/#noticias">Noticias</a>
    <a href="/#directorio">Directorio</a>
    <a href="/pb/add-negocio" class="nav-cta">+ Registrar Negocio</a>
  </div>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-bg"></div>
  ${estado.heroPhoto ? `<img src="${estado.heroPhoto}" alt="Boricuas en ${estado.nombre}" class="hero-img">` : ''}
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">🇵🇷 Comunidad Boricua en USA</div>
    <h1>Boricuas en <em>${estado.nombre}</em></h1>
    <p class="hero-tagline">${estado.tagline}</p>
    <div class="hero-stats">
      <div class="hero-stat">
        <div class="hero-stat-num">${estado.poblacion}</div>
        <div class="hero-stat-label">Boricuas en ${estado.nombre}</div>
      </div>
      <div class="hero-stat">
        <div class="hero-stat-num">${estado.ciudades.length}</div>
        <div class="hero-stat-label">Ciudades principales</div>
      </div>
      <div class="hero-stat">
        <div class="hero-stat-num">#${estado.ranking}</div>
        <div class="hero-stat-label">Estado con más boricuas</div>
      </div>
    </div>
  </div>
</section>

<!-- SEARCH -->
<section class="search-sec">
  <div class="search-inner">
    <h2 class="search-title">¿Qué necesitas en ${estado.nombre}?</h2>
    <p class="search-sub">Encuentra negocios y servicios boricuas cerca de ti — restaurantes, abogados, contables, salones y más.</p>
    <div class="search-box">
      <input class="search-input" id="searchQ" placeholder="¿Qué buscas? (restaurante, abogado, salón...)" oninput="filtrarNegocios()">
      <input class="search-input" id="searchCity" placeholder="Ciudad o Zip" style="max-width:200px;" oninput="filtrarNegocios()">
      <button class="search-btn" onclick="filtrarNegocios()">🔍 Buscar</button>
    </div>
    <div class="cat-pills">
      <button class="cat-pill active" onclick="setCat('',this)">🌟 Todos</button>
      <button class="cat-pill" onclick="setCat('restaurante',this)">🍽️ Restaurantes</button>
      <button class="cat-pill" onclick="setCat('food-truck',this)">🚚 Food Trucks</button>
      <button class="cat-pill" onclick="setCat('salon',this)">💅 Salones</button>
      <button class="cat-pill" onclick="setCat('barberia',this)">💈 Barberías</button>
      <button class="cat-pill" onclick="setCat('salud',this)">🏥 Salud</button>
      <button class="cat-pill" onclick="setCat('servicios',this)">🔧 Servicios</button>
      <button class="cat-pill" onclick="setCat('tienda',this)">🛍️ Tiendas</button>
      <button class="cat-pill" onclick="setCat('transporte',this)">🚗 Transporte</button>
      <button class="cat-pill" onclick="setCat('musica',this)">🎵 Entretenimiento</button>
      <button class="cat-pill" onclick="setCat('panaderia',this)">🥐 Panaderías</button>
    </div>
  </div>
</section>

<!-- RESULTS -->
<section class="results-sec">
  <div class="results-inner">
    <div class="results-header">
      <div class="results-count" id="resultsCount">Cargando negocios...</div>
      <a href="/pb/add-negocio" class="results-add">+ Registra tu negocio gratis →</a>
    </div>
    <div class="biz-grid" id="bizGrid">
      <div class="biz-empty" style="grid-column:1/-1;">
        <div class="biz-empty-icon">⏳</div>
        <div class="biz-empty-title">Cargando...</div>
      </div>
    </div>
  </div>
</section>

<!-- CIUDADES -->
<section class="ciudades-sec">
  <div class="ciudades-inner">
    <div class="sec-tag">Dónde Vivimos</div>
    <h2 class="sec-title">Ciudades Boricuas en ${estado.nombre}</h2>
    <div class="ciudades-grid">
      ${estado.ciudades.map(c => `
      <div class="ciudad-card" onclick="document.getElementById('searchCity').value='${c.nombre}';filtrarNegocios();">
        <div class="ciudad-img" id="cimg-${c.slug}" style="background-size:cover;background-position:center;">${c.emoji}</div>
        <div class="ciudad-body">
          <div class="ciudad-nombre">${c.nombre}</div>
          <div class="ciudad-pop">🇵🇷 ${c.poblacionBoricua} boricuas</div>
          <div class="ciudad-desc">${c.desc}</div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- RECURSOS DEL GOBIERNO -->
<section class="recursos-sec">
  <div class="recursos-inner">
    <div class="sec-tag">Recursos Oficiales</div>
    <h2 class="sec-title">Oficinas de Gobierno en ${estado.nombre}</h2>
    <div class="condado-select">
      <span style="font-size:0.85rem;color:var(--mid);font-weight:600;">Selecciona tu condado:</span>
      <select class="condado-dropdown" id="condadoSelect" onchange="mostrarRecursos()">
        <option value="">-- Selecciona tu condado --</option>
        ${estado.condados.map(c => `<option value="${c.slug}">${c.nombre}</option>`).join('')}
      </select>
    </div>
    <div class="recursos-grid" id="recursosGrid">
      <div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--mid);font-size:0.85rem;">
        Selecciona tu condado para ver las oficinas y recursos disponibles.
      </div>
    </div>
  </div>
</section>

<!-- VIAJES -->
<section class="viajes-sec">
  <div class="viajes-inner">
    <div class="sec-tag" style="color:rgba(255,255,255,0.6);">Planifica tu Viaje</div>
    <h2 class="viajes-title">¿Vas a visitar Puerto Rico?</h2>
    <p class="viajes-sub">Encuentra los mejores precios en hoteles y vuelos a la isla.</p>
    <div class="viajes-btns">
      <a href="${estado.tripcomUrl}" target="_blank" rel="noopener" class="viaje-btn" style="background:#1890ff;color:#fff;">🏨 Hoteles en Trip.com</a>
      <a href="https://kiwi.tpo.lu/2wAyEzMK" target="_blank" rel="noopener" class="viaje-btn" style="background:#e5520a;color:#fff;">✈️ Vuelos en Kiwi.com</a>
    </div>
  </div>
</section>

<!-- TIENDA -->
<section class="tienda-sec">
  <div class="tienda-inner">
    <h2 class="tienda-title">🛍️ Tienda Boricua</h2>
    <p class="tienda-sub">Lleva tu orgullo boricua a donde vayas — camisetas, tazas, dulces y más con entrega rápida en USA.</p>
    <a href="https://www.amazon.com/shop/planetaboricua" target="_blank" class="tienda-btn">🛒 Ver Tienda en Amazon →</a>
  </div>
</section>

<!-- FOOTER -->
<div class="estado-footer">
  <a href="/">🇵🇷 Planeta Boricua</a>
  <a href="/#noticias">Noticias</a>
  <a href="/#directorio">Directorio</a>
  <a href="/pb/add-negocio">Registrar Negocio</a>
  <a href="/#viajes">Viajes</a>
</div>

<script>
// State data
const estadoNombre = '${estado.nombre}';
let todosNegocios = [];
let catActiva = '';

// Category labels
const catLabels = {
  'restaurante': '🍽️ Restaurante',
  'food-truck': '🚚 Food Truck',
  'panaderia': '🥐 Panadería',
  'barberia': '💈 Barbería',
  'salon': '💅 Salón',
  'tienda': '🛍️ Tienda',
  'servicios': '🔧 Servicios',
  'musica': '🎵 Entretenimiento',
  'salud': '🏥 Salud',
  'transporte': '🚗 Transporte',
  'otro': '📦 Otro'
};

// Load negocios
async function cargarNegocios() {
  try {
    const res = await fetch('/api/pb-negocios/all');
    const data = await res.json();
    todosNegocios = (data.listings || []).filter(n =>
      n.estado && n.estado.toLowerCase().includes(estadoNombre.toLowerCase())
    );
    filtrarNegocios();
  } catch(e) {
    mostrarVacio();
  }
}

function setCat(cat, btn) {
  catActiva = cat;
  document.querySelectorAll('.cat-pill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  filtrarNegocios();
}

function filtrarNegocios() {
  const q = (document.getElementById('searchQ').value || '').toLowerCase().trim();
  const city = (document.getElementById('searchCity').value || '').toLowerCase().trim();

  let lista = todosNegocios;

  if (catActiva) lista = lista.filter(n => n.categoria === catActiva);
  if (q) lista = lista.filter(n =>
    (n.nombre || '').toLowerCase().includes(q) ||
    (n.categoria || '').toLowerCase().includes(q) ||
    (n.descripcion || '').toLowerCase().includes(q)
  );
  if (city) lista = lista.filter(n =>
    (n.ciudad || '').toLowerCase().includes(city) ||
    (n.zip || '').includes(city)
  );

  renderNegocios(lista);
}

function renderNegocios(lista) {
  const grid = document.getElementById('bizGrid');
  const count = document.getElementById('resultsCount');

  if (!lista.length) {
    count.textContent = 'No encontramos negocios con esos filtros.';
    grid.innerHTML = \`<div class="biz-empty">
      <div class="biz-empty-icon">🔍</div>
      <div class="biz-empty-title">¿Tienes un negocio boricua en \${estadoNombre}?</div>
      <p style="font-size:0.82rem;margin-top:0.4rem;"><a href="/pb/add-negocio" style="color:var(--red);font-weight:700;">Regístralo gratis →</a></p>
    </div>\`;
    return;
  }

  count.textContent = \`\${lista.length} negocio\${lista.length !== 1 ? 's' : ''} encontrado\${lista.length !== 1 ? 's' : ''} en \${estadoNombre}\`;

  // Destacados first
  const sorted = [...lista].sort((a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0));

  grid.innerHTML = sorted.map(n => \`
    <div class="biz-card\${n.destacado ? ' destacado' : ''}">
      \${n.destacado ? '<div class="biz-badge-dest">⭐ Destacado</div>' : ''}
      <div class="biz-cat">\${catLabels[n.categoria] || n.categoria || 'Negocio'}</div>
      <div class="biz-name">\${n.nombre}</div>
      \${n.descripcion ? \`<div class="biz-desc">\${n.descripcion}</div>\` : ''}
      <div class="biz-info">
        \${n.ciudad ? '📍 ' + n.ciudad + (n.estado ? ', ' + n.estado : '') : ''}
        \${n.telefono ? ' · 📞 ' + n.telefono : ''}
      </div>
      \${(n.website || n.whatsapp) ? \`<div class="biz-links">
        \${n.website ? \`<a href="\${n.website}" target="_blank" class="biz-link">🌐 Web</a>\` : ''}
        \${n.whatsapp ? \`<a href="https://wa.me/\${n.whatsapp.replace(/[^0-9]/g,'')}" target="_blank" class="biz-link wa">📲 WhatsApp</a>\` : ''}
      </div>\` : ''}
    </div>
  \`).join('');
}

function mostrarVacio() {
  document.getElementById('resultsCount').textContent = '';
  document.getElementById('bizGrid').innerHTML = \`<div class="biz-empty">
    <div class="biz-empty-icon">🏪</div>
    <div class="biz-empty-title">Sé el primero en registrar tu negocio en \${estadoNombre}</div>
    <p style="font-size:0.82rem;margin-top:0.4rem;"><a href="/pb/add-negocio" style="color:var(--red);font-weight:700;">Registrar negocio gratis →</a></p>
  </div>\`;
}

// Recursos del gobierno
const recursosData = ${JSON.stringify(estado.condados)};

function mostrarRecursos() {
  const slug = document.getElementById('condadoSelect').value;
  const grid = document.getElementById('recursosGrid');
  if (!slug) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--mid);font-size:0.85rem;">Selecciona tu condado para ver las oficinas disponibles.</div>';
    return;
  }
  const condado = recursosData.find(c => c.slug === slug);
  if (!condado || !condado.recursos) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--mid);">Recursos disponibles próximamente para este condado.</div>';
    return;
  }
  grid.innerHTML = condado.recursos.map(r => \`
    <div class="recurso-card">
      <div class="recurso-icon">\${r.icon}</div>
      <div class="recurso-nombre">\${r.nombre}</div>
      <div class="recurso-desc">\${r.desc}</div>
      \${r.url ? \`<a href="\${r.url}" target="_blank" class="recurso-link">Ver más →</a>\` : ''}
    </div>
  \`).join('');
}

// Load city photos
(async function() {
  const cities = ${JSON.stringify(estado.ciudades.map(c => ({ slug: c.slug, query: c.photoQuery })))};
  for (const c of cities) {
    try {
      const res = await fetch('/api/place-photo?q=' + encodeURIComponent(c.query));
      const data = await res.json();
      if (data.url) {
        const el = document.getElementById('cimg-' + c.slug);
        if (el) { el.style.backgroundImage = 'url(' + data.url + ')'; el.innerHTML = ''; }
      }
    } catch(e) {}
  }
})();

cargarNegocios();
</script>
</body>
</html>`;
};
