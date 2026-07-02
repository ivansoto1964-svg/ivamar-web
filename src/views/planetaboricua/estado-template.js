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
body{font-family:'DM Sans',sans-serif;background:#fff;color:#1a1a1a;overflow-x:hidden;}
:root{--red:#CE1126;--blue:#002D62;--dark:#1a1a1a;--mid:#555;--light:#f8f5f0;--border:#e8e0d5;}

/* NAV */
nav{background:rgba(255,255,255,0.97);backdrop-filter:blur(12px);border-bottom:2px solid var(--red);padding:0 2rem;display:flex;align-items:center;justify-content:space-between;height:64px;position:sticky;top:0;z-index:100;}
.nav-logo{display:flex;align-items:center;gap:0.6rem;text-decoration:none;}
.nav-logo-icon{font-size:1.4rem;}
.nav-logo-text{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;color:var(--dark);}
.nav-logo-text span{color:var(--red);}
.nav-back{font-size:0.82rem;color:var(--mid);text-decoration:none;display:flex;align-items:center;gap:0.4rem;}
.nav-back:hover{color:var(--red);}

/* HERO */
.hero{position:relative;min-height:80vh;display:flex;align-items:flex-end;overflow:hidden;}
.hero-bg{position:absolute;inset:0;background:${estado.gradient};opacity:${estado.heroPhoto ? '0.5' : '1'};}
.hero-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
.hero-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.1) 60%);}
.hero-content{position:relative;z-index:1;max-width:1100px;margin:0 auto;width:100%;padding:3rem 2rem;}
.hero-flag{font-size:3rem;margin-bottom:0.8rem;display:block;}
.hero-eyebrow{font-size:0.68rem;font-weight:700;color:rgba(255,255,255,0.6);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:0.5rem;}
.hero h1{font-family:'Playfair Display',serif;font-size:clamp(2.5rem,6vw,5rem);font-weight:700;color:#fff;line-height:1.1;margin-bottom:0.5rem;}
.hero h1 span{color:#ff8dcb;}
.hero-tagline{font-size:1.05rem;color:rgba(255,255,255,0.75);margin-bottom:1.5rem;font-style:italic;}
.hero-stats{display:flex;gap:1.5rem;flex-wrap:wrap;}
.hero-stat{background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:10px;padding:0.7rem 1.2rem;text-align:center;}
.hero-stat-num{font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:700;color:#fff;}
.hero-stat-label{font-size:0.65rem;color:rgba(255,255,255,0.6);margin-top:0.1rem;}

/* OVERVIEW */
.overview{padding:5rem 2rem;background:#fff;}
.overview-inner{max-width:800px;margin:0 auto;}
.sec-tag{font-size:0.65rem;font-weight:700;color:var(--red);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:0.5rem;}
.sec-title{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3.5vw,2.5rem);font-weight:700;color:var(--dark);margin-bottom:1.5rem;line-height:1.15;}
.overview-text p{font-size:1rem;color:#444;line-height:1.9;margin-bottom:1.2rem;}

/* CIUDADES */
.ciudades{padding:5rem 2rem;background:var(--light);}
.ciudades-inner{max-width:1100px;margin:0 auto;}
.ciudades-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem;margin-top:2rem;}
.ciudad-card{background:#fff;border-radius:14px;overflow:hidden;border:1px solid var(--border);transition:all 0.2s;}
.ciudad-card:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,0.08);}
.ciudad-img{height:140px;display:flex;align-items:center;justify-content:center;font-size:3rem;background:${estado.gradient};}
.ciudad-body{padding:1.2rem;}
.ciudad-nombre{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;}
.ciudad-pop{font-size:0.72rem;font-weight:700;color:var(--red);margin-bottom:0.5rem;}
.ciudad-desc{font-size:0.78rem;color:var(--mid);line-height:1.6;}

/* DIRECTORIO */
.directorio{padding:5rem 2rem;background:#fff;}
.directorio-inner{max-width:1100px;margin:0 auto;}
.dir-search{display:flex;gap:0.8rem;margin:1.5rem 0;flex-wrap:wrap;}
.dir-input{flex:1;min-width:200px;border:2px solid var(--border);border-radius:8px;padding:0.75rem 1rem;font-size:0.9rem;font-family:inherit;outline:none;}
.dir-input:focus{border-color:var(--red);}
.dir-btn{background:var(--red);color:#fff;border:none;border-radius:8px;padding:0.75rem 1.5rem;font-size:0.9rem;font-weight:700;cursor:pointer;font-family:inherit;}
.dir-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-top:1.5rem;}
.dir-card{background:var(--light);border-radius:10px;padding:1.2rem;border:1px solid var(--border);}
.dir-card-name{font-size:0.9rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;}
.dir-card-cat{font-size:0.68rem;font-weight:700;color:var(--red);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.3rem;}
.dir-card-loc{font-size:0.75rem;color:var(--mid);}
.dir-empty{text-align:center;padding:3rem;color:var(--mid);font-size:0.9rem;}

/* PROFESIONALES */
.profesionales{padding:5rem 2rem;background:var(--light);}
.prof-inner{max-width:1100px;margin:0 auto;}
.prof-search{display:flex;gap:0.8rem;margin:1.5rem 0;flex-wrap:wrap;}
.prof-input{flex:1;min-width:200px;border:2px solid var(--border);border-radius:8px;padding:0.75rem 1rem;font-size:0.9rem;font-family:inherit;outline:none;}
.prof-input:focus{border-color:var(--blue);}
.prof-btn{background:var(--blue);color:#fff;border:none;border-radius:8px;padding:0.75rem 1.5rem;font-size:0.9rem;font-weight:700;cursor:pointer;font-family:inherit;}
.prof-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-top:1.5rem;}
.prof-card{background:#fff;border-radius:10px;padding:1.2rem;border:1px solid var(--border);}
.prof-card-name{font-size:0.9rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;}
.prof-card-spec{font-size:0.72rem;font-weight:700;color:var(--blue);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.3rem;}
.prof-card-loc{font-size:0.75rem;color:var(--mid);}
.prof-badge{display:inline-block;background:#E8F5E9;color:#2e7d32;font-size:0.62rem;font-weight:700;padding:0.15rem 0.5rem;border-radius:4px;margin-left:0.4rem;}

/* VIAJES */
.viajes{padding:5rem 2rem;background:linear-gradient(135deg,var(--blue),#001a4d);}
.viajes-inner{max-width:900px;margin:0 auto;text-align:center;}
.viajes-title{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3.5vw,2.5rem);font-weight:700;color:#fff;margin-bottom:0.8rem;}
.viajes-sub{font-size:0.9rem;color:rgba(255,255,255,0.65);margin-bottom:2rem;}
.viajes-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}
.viaje-btn{display:inline-flex;align-items:center;gap:0.5rem;padding:0.9rem 1.8rem;border-radius:25px;font-size:0.88rem;font-weight:700;text-decoration:none;}
.viaje-btn-primary{background:#1890ff;color:#fff;}
.viaje-btn-secondary{background:#e5520a;color:#fff;}

/* TIENDA */
.tienda{padding:4rem 2rem;background:#fff;border-top:1px solid var(--border);}
.tienda-inner{max-width:700px;margin:0 auto;text-align:center;}
.tienda-title{font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:700;color:var(--dark);margin-bottom:0.5rem;}
.tienda-sub{font-size:0.88rem;color:var(--mid);margin-bottom:1.5rem;}
.tienda-btn{display:inline-flex;align-items:center;gap:0.5rem;background:var(--red);color:#fff;padding:0.9rem 2rem;border-radius:25px;font-size:0.9rem;font-weight:700;text-decoration:none;}

/* FOOTER */
.pb-estado-footer{background:var(--dark);padding:2rem;text-align:center;}
.pb-estado-footer a{color:rgba(255,255,255,0.5);text-decoration:none;font-size:0.8rem;}
.pb-estado-footer a:hover{color:#fff;}

@media(max-width:768px){
  .ciudades-grid{grid-template-columns:1fr 1fr;}
  .dir-grid{grid-template-columns:1fr 1fr;}
  .prof-grid{grid-template-columns:1fr 1fr;}
  .hero-stats{gap:0.8rem;}
}
@media(max-width:480px){
  .ciudades-grid{grid-template-columns:1fr;}
  .dir-grid{grid-template-columns:1fr;}
  .prof-grid{grid-template-columns:1fr;}
}
</style>
</head>
<body>

<!-- NAV -->
<nav>
  <a href="/" class="nav-logo">
    <span class="nav-logo-icon">🇵🇷</span>
    <span class="nav-logo-text">Planeta <span>Boricua</span></span>
  </a>
  <a href="/" class="nav-back">← Inicio</a>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-bg"></div>
  ${estado.heroPhoto ? `<img src="${estado.heroPhoto}" alt="Boricuas en ${estado.nombre}" class="hero-img">` : ''}
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <span class="hero-flag">${estado.bandera}</span>
    <div class="hero-eyebrow">Comunidad Boricua en USA</div>
    <h1>Boricuas en <span>${estado.nombre}</span></h1>
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

<!-- OVERVIEW -->
<section class="overview">
  <div class="overview-inner">
    <div class="sec-tag">La Comunidad</div>
    <h2 class="sec-title">Boricuas en ${estado.nombre}</h2>
    <div class="overview-text">
      ${estado.overview.split('\n').map(p => p.trim() ? `<p>${p}</p>` : '').join('')}
    </div>
  </div>
</section>

<!-- CIUDADES -->
<section class="ciudades">
  <div class="ciudades-inner">
    <div class="sec-tag">Dónde Vivimos</div>
    <h2 class="sec-title">Ciudades Boricuas en ${estado.nombre}</h2>
    <div class="ciudades-grid">
      ${estado.ciudades.map(c => `
      <div class="ciudad-card">
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

<!-- DIRECTORIO DE NEGOCIOS -->
<section class="directorio" id="directorio">
  <div class="directorio-inner">
    <div class="sec-tag">Negocios Boricuas</div>
    <h2 class="sec-title">Directorio de Negocios en ${estado.nombre}</h2>
    <p style="font-size:0.88rem;color:var(--mid);margin-bottom:1rem;">Negocios boricuas verificados en ${estado.nombre}. ¿Tienes un negocio? <a href="/pb/add-negocio" style="color:var(--red);font-weight:700;">Regístralo gratis →</a></p>
    <div class="dir-search">
      <input class="dir-input" id="dirSearch" placeholder="Buscar negocio o categoría..." oninput="buscarNegocios()">
    </div>
    <div class="dir-grid" id="dirGrid">
      <div class="dir-empty">Cargando negocios...</div>
    </div>
  </div>
</section>

<!-- DIRECTORIO PROFESIONAL -->
<section class="profesionales" id="profesionales">
  <div class="prof-inner">
    <div class="sec-tag">Profesionales de Salud</div>
    <h2 class="sec-title">Busca un Profesional de Salud en ${estado.nombre}</h2>
    <p style="font-size:0.88rem;color:var(--mid);margin-bottom:1.5rem;">Datos verificados del Registro Federal NPI (National Provider Identifier) de USA. Licencias activas solamente.</p>
    <div style="background:var(--light);border-radius:12px;padding:1.5rem;border:1px solid var(--border);margin-bottom:1.5rem;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;">
        <div>
          <label style="font-size:0.72rem;font-weight:700;color:var(--mid);text-transform:uppercase;letter-spacing:0.08em;display:block;margin-bottom:0.4rem;">Especialidad</label>
          <select class="prof-input" id="profEspecialidad" style="width:100%;">
            <option value="">-- Selecciona una especialidad --</option>
            <option value="Family Medicine">🩺 Médico de Familia / Generalista</option>
            <option value="Internal Medicine">🫀 Médico Internista</option>
            <option value="Pediatrics">👶 Pediatra</option>
            <option value="Cardiology">❤️ Cardiólogo</option>
            <option value="Dermatology">🧴 Dermatólogo</option>
            <option value="Obstetrics">🤱 Ginecólogo / Obstetra</option>
            <option value="Psychiatry">🧠 Psiquiatra</option>
            <option value="Psychology">💭 Psicólogo</option>
            <option value="Orthopedic Surgery">🦴 Ortopeda</option>
            <option value="Ophthalmology">👁️ Oftalmólogo</option>
            <option value="Dentist">🦷 Dentista</option>
            <option value="Neurology">🧬 Neurólogo</option>
            <option value="Endocrinology">⚗️ Endocrinólogo</option>
            <option value="Gastroenterology">🫁 Gastroenterólogo</option>
            <option value="Urology">🔬 Urólogo</option>
            <option value="Oncology">🎗️ Oncólogo</option>
            <option value="Pulmonary Disease">🫁 Neumólogo</option>
            <option value="Rheumatology">💊 Reumatólogo</option>
            <option value="Nephrology">🫘 Nefrólogo</option>
            <option value="Physical Therapist">🏃 Fisioterapeuta</option>
            <option value="Nurse Practitioner">👩‍⚕️ Enfermera Practicante</option>
            <option value="Nutritionist">🥗 Nutricionista</option>
            <option value="Pharmacy">💊 Farmacéutico</option>
            <option value="Chiropractic">🙌 Quiropráctico</option>
            <option value="Optometry">👓 Optometrista</option>
          </select>
        </div>
        <div>
          <label style="font-size:0.72rem;font-weight:700;color:var(--mid);text-transform:uppercase;letter-spacing:0.08em;display:block;margin-bottom:0.4rem;">Tu Código Postal</label>
          <input class="prof-input" id="profZip" placeholder="Ej: 34741" maxlength="5" style="width:100%;" type="number">
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
        <div>
          <label style="font-size:0.72rem;font-weight:700;color:var(--mid);text-transform:uppercase;letter-spacing:0.08em;display:block;margin-bottom:0.4rem;">Radio de búsqueda</label>
          <select class="prof-input" id="profRadio">
            <option value="10">📍 10 millas</option>
            <option value="20" selected>📍 20 millas</option>
            <option value="30">📍 30 millas</option>
            <option value="50">📍 50 millas</option>
          </select>
        </div>
        <div style="margin-top:1.2rem;">
          <button class="prof-btn" onclick="buscarProfesionales()" id="profBtnBuscar">🔍 Buscar Profesional</button>
        </div>
      </div>
      <p style="font-size:0.72rem;color:var(--mid);margin-top:0.8rem;">💡 El código postal y la especialidad son necesarios para buscar. Los resultados muestran profesionales con licencia activa.</p>
    </div>
    <div id="profGrid">
      <div class="dir-empty" style="text-align:center;padding:3rem;color:var(--mid);">
        <div style="font-size:2.5rem;margin-bottom:0.8rem;">🔍</div>
        <div style="font-weight:700;color:var(--dark);margin-bottom:0.4rem;">Selecciona una especialidad y tu código postal</div>
        <div style="font-size:0.82rem;">Te mostramos profesionales con licencia activa cerca de ti.</div>
      </div>
    </div>
  </div>
</section>

<!-- VIAJES -->
<section class="viajes">
  <div class="viajes-inner">
    <div class="sec-tag" style="color:rgba(255,255,255,0.6);">Planifica tu Viaje</div>
    <h2 class="viajes-title">¿Vas a visitar ${estado.nombre}?</h2>
    <p class="viajes-sub">Encuentra los mejores precios en hoteles y vuelos para ${estado.nombre}.</p>
    <div class="viajes-btns">
      <a href="${estado.tripcomUrl}" target="_blank" rel="noopener" class="viaje-btn viaje-btn-primary">🏨 Hoteles en Trip.com</a>
      <a href="https://kiwi.tpo.lu/2wAyEzMK" target="_blank" rel="noopener" class="viaje-btn viaje-btn-secondary">✈️ Vuelos en Kiwi.com</a>
    </div>
  </div>
</section>

<!-- TIENDA -->
<section class="tienda">
  <div class="tienda-inner">
    <h2 class="tienda-title">🛍️ Tienda Boricua</h2>
    <p class="tienda-sub">Lleva tu orgullo boricua a donde vayas — camisetas, tazas, dulces y más.</p>
    <a href="https://www.amazon.com/shop/planetaboricua" target="_blank" class="tienda-btn">🛒 Ver Tienda en Amazon →</a>
  </div>
</section>

<!-- FOOTER -->
<div class="pb-estado-footer">
  <a href="/">🇵🇷 Planeta Boricua</a> &nbsp;·&nbsp;
  <a href="/#noticias">Noticias</a> &nbsp;·&nbsp;
  <a href="/#directorio">Directorio</a> &nbsp;·&nbsp;
  <a href="/#viajes">Viajes</a>
</div>

<script>
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

// Load negocios
async function cargarNegocios() {
  try {
    const res = await fetch('/api/pb-negocios/all');
    const data = await res.json();
    const estado = '${estado.slug}';
    window.todosNegocios = (data.listings || []).filter(n =>
      n.estado && n.estado.toLowerCase().includes('${estado.nombre.toLowerCase()}')
    );
    renderNegocios(window.todosNegocios);
  } catch(e) {
    document.getElementById('dirGrid').innerHTML = '<div class="dir-empty" style="grid-column:1/-1;">¿Tienes un negocio boricua en ${estado.nombre}? <a href="/pb/add-negocio" style="color:var(--red);font-weight:700;">Regístralo gratis →</a></div>';
  }
}

function renderNegocios(lista) {
  const grid = document.getElementById('dirGrid');
  if (!lista.length) {
    grid.innerHTML = '<div class="dir-empty" style="grid-column:1/-1;">Aún no hay negocios registrados en ${estado.nombre}. <a href="/pb/add-negocio" style="color:var(--red);font-weight:700;">¡Sé el primero! →</a></div>';
    return;
  }
  grid.innerHTML = lista.map(n => \`
    <div class="dir-card">
      <div class="dir-card-cat">\${n.categoria || 'Negocio'}</div>
      <div class="dir-card-name">\${n.nombre}</div>
      <div class="dir-card-loc">📍 \${n.ciudad || ''}\${n.ciudad ? ', ' : ''}\${n.estado || ''}</div>
    </div>
  \`).join('');
}

function buscarNegocios() {
  const q = document.getElementById('dirSearch').value.toLowerCase();
  if (!window.todosNegocios) return;
  const filtrados = window.todosNegocios.filter(n =>
    (n.nombre || '').toLowerCase().includes(q) ||
    (n.categoria || '').toLowerCase().includes(q)
  );
  renderNegocios(filtrados);
}

// Hispanic last names for Spanish speaker badge
const hispanicNames = ['garcia', 'rivera', 'rodriguez', 'martinez', 'lopez', 'gonzalez', 'hernandez', 'perez', 'sanchez', 'ramirez', 'torres', 'flores', 'diaz', 'morales', 'ortiz', 'cruz', 'reyes', 'vega', 'castillo', 'jimenez', 'vargas', 'delgado', 'espinoza', 'padilla', 'acosta', 'nieves', 'colon', 'santiago', 'rosario', 'figueroa', 'ramos', 'ayala', 'ocasio', 'velez', 'suarez', 'mendez', 'crespo', 'resto', 'negron', 'cardona', 'pagan', 'lebron', 'molina', 'serrano', 'medina', 'guerrero', 'soto', 'rojas', 'romero', 'dominguez', 'chavez', 'contreras', 'mendoza', 'aguilar', 'ruiz', 'guzman', 'silva', 'nunez', 'munoz'];

function isHispanic(lastName) {
  return hispanicNames.includes((lastName || '').toLowerCase());
}

// Buscar profesionales de salud via NPI Registry
async function buscarProfesionales() {
  const especialidad = document.getElementById('profEspecialidad').value;
  const zip = document.getElementById('profZip').value.trim();
  const radio = document.getElementById('profRadio').value;
  const grid = document.getElementById('profGrid');
  const btn = document.getElementById('profBtnBuscar');

  // Validate inputs
  if (!especialidad) {
    grid.innerHTML = '<div class="dir-empty" style="text-align:center;padding:2rem;color:#c0392b;"><div style="font-size:1.5rem;margin-bottom:0.5rem;">⚠️</div><div>Por favor selecciona una especialidad.</div></div>';
    return;
  }
  if (!zip || zip.length !== 5) {
    grid.innerHTML = '<div class="dir-empty" style="text-align:center;padding:2rem;color:#c0392b;"><div style="font-size:1.5rem;margin-bottom:0.5rem;">⚠️</div><div>Por favor ingresa tu código postal (5 dígitos).</div></div>';
    return;
  }

  // Show loading
  btn.disabled = true;
  btn.textContent = 'Buscando...';
  grid.innerHTML = '<div style="text-align:center;padding:3rem;color:var(--mid);"><div style="font-size:2rem;margin-bottom:0.8rem;">⏳</div><div>Buscando profesionales cerca de ti...</div></div>';

  try {
    const url = '/api/npi-search?postal_code=' + encodeURIComponent(zip) + '&radio=' + radio + '&especialidad=' + encodeURIComponent(especialidad);
    const res = await fetch(url);
    const data = await res.json();
    const results = (data.results || []).filter(r => r.basic && r.basic.status === 'A' && r.enumeration_type === 'NPI-1');

    if (!results.length) {
      grid.innerHTML = '<div class="dir-empty" style="text-align:center;padding:3rem;"><div style="font-size:2rem;margin-bottom:0.8rem;">😕</div><div style="font-weight:700;color:var(--dark);margin-bottom:0.4rem;">No encontramos resultados</div><div style="font-size:0.82rem;color:var(--mid);">Intenta con un radio mayor o una especialidad diferente.</div></div>';
      return;
    }

    const cards = results.map(r => {
      const basic = r.basic || {};
      const addrs = r.addresses || [];
      const addr = addrs.find(a => a.address_purpose === 'LOCATION') || addrs[0] || {};
      const tax = (r.taxonomies || []).find(t => t.primary) || (r.taxonomies || [])[0] || {};
      const prefix = basic.name_prefix && basic.name_prefix !== '--' ? basic.name_prefix + ' ' : '';
      const fullName = (prefix + (basic.first_name || '') + ' ' + (basic.last_name || '')).trim();
      const hispanic = isHispanic(basic.last_name);
      const phone = addr.telephone_number || '';
      const city = addr.city || '';
      const state = addr.state || '';

      return \`<div class="prof-card" style="background:#fff;border-radius:10px;padding:1.2rem;border:1px solid var(--border);transition:box-shadow 0.2s;" onmouseover="this.style.boxShadow='0 4px 16px rgba(0,0,0,0.08)'" onmouseout="this.style.boxShadow='none'">
        <div style="font-size:0.65rem;font-weight:800;color:var(--blue);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.3rem;">\${tax.desc || 'Profesional de Salud'}</div>
        <div style="font-size:0.95rem;font-weight:700;color:var(--dark);margin-bottom:0.4rem;">
          \${fullName || 'Profesional Verificado'}
          <span style="display:inline-block;background:#E8F5E9;color:#2e7d32;font-size:0.6rem;font-weight:700;padding:0.15rem 0.5rem;border-radius:4px;margin-left:0.4rem;">✓ Licencia Activa</span>
          \${hispanic ? '<span style="display:inline-block;background:#FFF3E0;color:#E65100;font-size:0.6rem;font-weight:700;padding:0.15rem 0.5rem;border-radius:4px;margin-left:0.2rem;">🇵🇷 Habla español</span>' : ''}
        </div>
        <div style="font-size:0.78rem;color:var(--mid);">
          \${city ? '📍 ' + city + (state ? ', ' + state : '') : ''}
          \${phone ? ' &nbsp;·&nbsp; 📞 ' + phone : ''}
        </div>
      </div>\`;
    }).join('');

    const especialidadLabel = document.getElementById('profEspecialidad').options[document.getElementById('profEspecialidad').selectedIndex].text;
    grid.innerHTML = \`<div style="margin-bottom:1rem;font-size:0.82rem;color:var(--mid);">Se encontraron <strong style="color:var(--dark);">\${results.length} profesionales</strong> de \${especialidadLabel} en un radio de \${radio} millas.</div><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;">\${cards}</div>\`;

  } catch(e) {
    grid.innerHTML = '<div class="dir-empty" style="text-align:center;padding:2rem;color:#c0392b;">Error al buscar. Intenta de nuevo.</div>';
  } finally {
    btn.disabled = false;
    btn.textContent = '🔍 Buscar Profesional';
  }
}

cargarNegocios();
</script>
</body>
</html>`;
};
