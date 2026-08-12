module.exports = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Feria Digital de Artesanías Puertorriqueñas — Planeta Boricua</title>
<meta name="description" content="Descubre y apoya artesanos puertorriqueños en Puerto Rico y la diáspora. Una feria digital gratuita y permanente de Planeta Boricua.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://www.masboricuaqueunmofongo.com/feria-artesanos">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'Inter',sans-serif;background:#f5f5f0 url('/img/artesanos-pattern-bg.png');background-size:420px;color:#111;overflow-x:hidden;}
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
.nav-flag{font-size:1.6rem;}
.nav-logo-text{font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:800;color:var(--dark);line-height:1;}
.nav-logo-sub{font-size:0.58rem;color:var(--mid);text-transform:uppercase;letter-spacing:0.08em;margin-top:0.1rem;}
.nav-back{font-size:0.8rem;color:var(--mid);text-decoration:none;font-weight:600;}
.nav-back:hover{color:var(--red);}

.hero-feria{background:linear-gradient(rgba(0,20,50,0.55),rgba(0,20,50,0.7)),url('/img/artesanos-hero-bg.png');background-size:cover;background-position:center;padding:4rem 2rem 3rem;text-align:center;}
.hero-feria h1{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;color:#fff;margin-bottom:0.6rem;text-shadow:0 2px 12px rgba(0,0,0,0.5);}
.hero-feria p{color:rgba(255,255,255,0.9);font-size:0.95rem;max-width:600px;margin:0 auto;line-height:1.6;text-shadow:0 1px 6px rgba(0,0,0,0.5);}
.hero-actions{display:flex;justify-content:center;gap:.7rem;flex-wrap:wrap;margin-top:1.4rem}.hero-btn{padding:.75rem 1.15rem;border-radius:8px;background:#ce1126;color:#fff;text-decoration:none;font-weight:800;font-size:.85rem}.hero-btn.secondary{background:#fff;color:#002d62}.directory-heading{display:flex;justify-content:space-between;align-items:end;gap:1rem;flex-wrap:wrap;margin-bottom:.6rem}.directory-heading h2{font-family:'Playfair Display',serif;font-size:1.6rem}.result-count{font-weight:700;color:var(--blue);font-size:.85rem}.fair-note{background:#fff;border-left:4px solid var(--blue);padding:1rem;margin:1.5rem 0;border-radius:6px;color:var(--mid);font-size:.82rem;line-height:1.6}

.directorio-wrap{max-width:1200px;margin:0 auto;padding:2rem;}

.dir-search-row{margin:1rem 0;position:relative;}
.dir-search-row input{width:100%;padding:0.85rem 1rem 0.85rem 2.8rem;border:2px solid var(--border);border-radius:8px;font-size:0.92rem;font-family:inherit;outline:none;transition:border 0.2s;}
.dir-search-row input:focus{border-color:var(--blue);}
.dir-search-icon{position:absolute;left:0.9rem;top:50%;transform:translateY(-50%);font-size:1.1rem;}

.dir-filters{display:flex;flex-wrap:wrap;gap:0.8rem;margin:1rem 0 1.5rem;}
.dir-filters select{padding:0.6rem 1rem;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:#fff;cursor:pointer;}

.dir-city-label{font-weight:800;font-size:0.85rem;color:var(--blue);text-transform:uppercase;letter-spacing:0.08em;padding:0.5rem 1rem;background:#f0f4ff;border-left:3px solid var(--blue);margin-bottom:0.5rem;}
.dir-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:0.8rem;padding:0 0.5rem;}
.dir-card{background:#fff;border:1px solid var(--border);border-radius:10px;overflow:hidden;display:flex;flex-direction:column;transition:transform .2s,box-shadow .2s}.dir-card:hover{transform:translateY(-3px);box-shadow:0 10px 24px #0001}
.dir-card-photo{width:100%;height:210px;object-fit:cover;background:#eee;}
.dir-card-body{padding:0.9rem;display:flex;flex-direction:column;gap:0.4rem;}
.dir-card-desc{font-size:.8rem;color:var(--mid);line-height:1.55;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}.dir-card-actions{display:flex;gap:.5rem;flex-wrap:wrap;margin-top:auto;padding-top:.5rem}.dir-card-actions a{font-size:.72rem;text-decoration:none;font-weight:800;padding:.45rem .6rem;border-radius:5px;background:#f0f4ff;color:var(--blue)}.dir-card-actions .profile-link{background:var(--blue);color:#fff}

footer.pb-footer{background:var(--dark);color:rgba(255,255,255,0.6);padding:2rem;text-align:center;font-size:0.8rem;margin-top:2rem;}
footer.pb-footer a{color:rgba(255,255,255,0.8);text-decoration:none;margin:0 0.5rem;}
</style>
</head>
<body>

<nav>
  <div class="nav-top">
    <a href="https://www.masboricuaqueunmofongo.com/" class="nav-logo">
      <span class="nav-flag">🇵🇷</span>
      <div>
        <div class="nav-logo-text">Planeta Boricua</div>
        <div class="nav-logo-sub">Feria Digital Permanente</div>
      </div>
    </a>
    <div style="display:flex;gap:1rem"><a href="/agenda-boricua" class="nav-back">Agenda</a><a href="https://www.masboricuaqueunmofongo.com/" class="nav-back">← Portal</a></div>
  </div>
</nav>

<section class="hero-feria">
  <h1>Feria Digital de Artesanías Puertorriqueñas 🇵🇷</h1>
  <p><strong>Manos boricuas, arte que cuenta nuestra historia.</strong> Una exposición gratuita y permanente que conecta a nuestros artesanos con Puerto Rico y la diáspora.</p>
  <div class="hero-actions"><a class="hero-btn secondary" href="#artesanos">Explorar artesanos</a><a class="hero-btn secondary" href="/agenda-boricua">Ver Agenda Boricua</a><a class="hero-btn" href="/pb/add-negocio">Registrar mi artesanía gratis</a></div>
</section>

<div class="directorio-wrap" id="artesanos">
  <div class="directory-heading"><div><h2>Descubre el talento boricua</h2><p style="color:var(--mid);font-size:.85rem;margin-top:.3rem">Busca por nombre, oficio o ubicación.</p></div><div id="result-count" class="result-count" aria-live="polite">Cargando participantes…</div></div>
  <div class="dir-search-row">
    <span class="dir-search-icon">🔍</span>
    <input type="text" id="dir-search" placeholder="¿Buscas un tallador? ¿Joyería hecha a mano? ¿Un tejedor?..." oninput="searchDirectorio()">
  </div>

  <div class="dir-filters">
    <select id="dir-filter-location" onchange="loadDirectorio()">
      <option value="">📍 Todas las ubicaciones</option>
      <optgroup label="🇵🇷 Puerto Rico — Municipios">
        <option value="adjuntas">Adjuntas</option><option value="aguada">Aguada</option><option value="aguadilla">Aguadilla</option><option value="aguas-buenas">Aguas Buenas</option><option value="aibonito">Aibonito</option><option value="anasco">Añasco</option><option value="arecibo">Arecibo</option><option value="arroyo">Arroyo</option><option value="barceloneta">Barceloneta</option><option value="barranquitas">Barranquitas</option><option value="bayamon">Bayamón</option><option value="cabo-rojo">Cabo Rojo</option><option value="caguas">Caguas</option><option value="camuy">Camuy</option><option value="canovanas">Canóvanas</option><option value="carolina">Carolina</option><option value="catano">Cataño</option><option value="cayey">Cayey</option><option value="ceiba">Ceiba</option><option value="ciales">Ciales</option><option value="cidra">Cidra</option><option value="coamo">Coamo</option><option value="comerio">Comerío</option><option value="corozal">Corozal</option><option value="culebra">Culebra</option><option value="dorado">Dorado</option><option value="fajardo">Fajardo</option><option value="florida-pr">Florida (PR)</option><option value="guanica">Guánica</option><option value="guayama">Guayama</option><option value="guayanilla">Guayanilla</option><option value="guaynabo">Guaynabo</option><option value="gurabo">Gurabo</option><option value="hatillo">Hatillo</option><option value="hormigueros">Hormigueros</option><option value="humacao">Humacao</option><option value="isabela">Isabela</option><option value="jayuya">Jayuya</option><option value="juana-diaz">Juana Díaz</option><option value="juncos">Juncos</option><option value="lajas">Lajas</option><option value="lares">Lares</option><option value="las-marias">Las Marías</option><option value="las-piedras">Las Piedras</option><option value="loiza">Loíza</option><option value="luquillo">Luquillo</option><option value="manati">Manatí</option><option value="maricao">Maricao</option><option value="maunabo">Maunabo</option><option value="mayaguez">Mayagüez</option><option value="moca">Moca</option><option value="morovis">Morovis</option><option value="naguabo">Naguabo</option><option value="naranjito">Naranjito</option><option value="orocovis">Orocovis</option><option value="patillas">Patillas</option><option value="penuelas">Peñuelas</option><option value="ponce">Ponce</option><option value="quebradillas">Quebradillas</option><option value="rincon">Rincón</option><option value="rio-grande">Río Grande</option><option value="sabana-grande">Sabana Grande</option><option value="salinas">Salinas</option><option value="san-german">San Germán</option><option value="san-juan">San Juan</option><option value="san-lorenzo">San Lorenzo</option><option value="san-sebastian">San Sebastián</option><option value="santa-isabel">Santa Isabel</option><option value="toa-alta">Toa Alta</option><option value="toa-baja">Toa Baja</option><option value="trujillo-alto">Trujillo Alto</option><option value="utuado">Utuado</option><option value="vega-alta">Vega Alta</option><option value="vega-baja">Vega Baja</option><option value="vieques">Vieques</option><option value="villalba">Villalba</option><option value="yabucoa">Yabucoa</option><option value="yauco">Yauco</option>
      </optgroup>
      <optgroup label="🇺🇸 Estados Unidos">
        <option value="alabama">Alabama</option><option value="alaska">Alaska</option><option value="arizona">Arizona</option><option value="arkansas">Arkansas</option><option value="california">California</option><option value="colorado">Colorado</option><option value="connecticut">Connecticut</option><option value="delaware">Delaware</option><option value="florida-us">Florida</option><option value="georgia">Georgia</option><option value="hawaii">Hawaii</option><option value="idaho">Idaho</option><option value="illinois">Illinois</option><option value="indiana">Indiana</option><option value="iowa">Iowa</option><option value="kansas">Kansas</option><option value="kentucky">Kentucky</option><option value="louisiana">Louisiana</option><option value="maine">Maine</option><option value="maryland">Maryland</option><option value="massachusetts">Massachusetts</option><option value="michigan">Michigan</option><option value="minnesota">Minnesota</option><option value="mississippi">Mississippi</option><option value="missouri">Missouri</option><option value="montana">Montana</option><option value="nebraska">Nebraska</option><option value="nevada">Nevada</option><option value="new-hampshire">New Hampshire</option><option value="new-jersey">New Jersey</option><option value="new-mexico">New Mexico</option><option value="nueva-york">Nueva York</option><option value="north-carolina">North Carolina</option><option value="north-dakota">North Dakota</option><option value="ohio">Ohio</option><option value="oklahoma">Oklahoma</option><option value="oregon">Oregon</option><option value="pennsylvania">Pennsylvania</option><option value="rhode-island">Rhode Island</option><option value="south-carolina">South Carolina</option><option value="south-dakota">South Dakota</option><option value="tennessee">Tennessee</option><option value="texas">Texas</option><option value="utah">Utah</option><option value="vermont">Vermont</option><option value="virginia">Virginia</option><option value="washington">Washington</option><option value="west-virginia">West Virginia</option><option value="wisconsin">Wisconsin</option><option value="wyoming">Wyoming</option><option value="washington-dc">Washington D.C.</option>
      </optgroup>
    </select>

    <select id="dir-filter-category" onchange="loadDirectorio()">
      <option value="">🎨 Todas las categorías</option>
      <option value="tallado-madera">🪵 Tallado en Madera</option>
      <option value="joyeria">💍 Joyería Artesanal</option>
      <option value="ceramica">🏺 Cerámica / Alfarería</option>
      <option value="textiles">🧵 Textiles / Costura</option>
      <option value="pintura">🎨 Pintura / Arte</option>
      <option value="santos">🙏 Santos / Tallas Religiosas</option>
      <option value="cuero">👜 Trabajo en Cuero</option>
      <option value="vejigantes">🎭 Máscaras / Vejigantes</option>
      <option value="instrumentos">🥁 Instrumentos Musicales</option>
      <option value="reciclado">♻️ Arte con Material Reciclado</option>
      <option value="velas-jabones">🕯️ Velas / Jabones Artesanales</option>
      <option value="otro">📦 Otro</option>
    </select>
    <select id="dir-sort" onchange="loadDirectorio()"><option value="featured">⭐ Destacados primero</option><option value="name">A–Z Nombre</option><option value="location">📍 Ubicación</option></select>
  </div>

  <div id="directorio-grid">
    <div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--mid);">⏳ Cargando artesanos...</div>
  </div>

  <div style="text-align:center;margin-top:2rem;">
    <a href="/pb/add-negocio" style="display:inline-block;background:var(--blue);color:#fff;padding:0.9rem 1.8rem;border-radius:8px;text-decoration:none;font-weight:700;font-size:0.92rem;">🎨 Regístrate Gratis →</a>
  </div>
  <div class="fair-note"><strong>Una vitrina, no un intermediario.</strong> La información es provista por cada participante. Planeta Boricua no procesa compras ni pagos; los pedidos, entregas y acuerdos se coordinan directamente con cada artesano.</div>
</div>

<footer class="pb-footer">
  <div>🇵🇷 Planeta Boricua · Feria Digital de Artesanías Puertorriqueñas</div>
  <div style="margin-top:0.8rem;">
    <a href="https://www.masboricuaqueunmofongo.com/">Portal</a>
    <a href="https://www.masboricuaqueunmofongo.com/quienes-somos">Quiénes Somos</a>
    <a href="https://www.masboricuaqueunmofongo.com/privacidad-boricua">Privacidad</a>
    <a href="https://www.masboricuaqueunmofongo.com/terminos-boricua">Términos</a>
  </div>
  <div style="margin-top:0.8rem;">© 2026 Planeta Boricua · Un producto de Ivamar AI LLC</div>
</footer>

<script>
const categoryIcons = {
  'tallado-madera': '🪵',
  'joyeria': '💍',
  'ceramica': '🏺',
  'textiles': '🧵',
  'pintura': '🎨',
  'santos': '🙏',
  'cuero': '👜',
  'vejigantes': '🎭',
  'instrumentos': '🥁',
  'reciclado': '♻️',
  'velas-jabones': '🕯️',
  'otro': '📦'
};
const categoryLabels = {
  'tallado-madera':'Tallado en madera','joyeria':'Joyería artesanal','ceramica':'Cerámica y alfarería','textiles':'Textiles y costura','pintura':'Pintura y arte','santos':'Santos y tallas religiosas','cuero':'Trabajo en cuero','vejigantes':'Máscaras y vejigantes','instrumentos':'Instrumentos musicales','reciclado':'Arte con material reciclado','velas-jabones':'Velas y jabones artesanales','otro':'Otra artesanía'
};
function escapeHtml(value){return String(value||'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function safeExternalUrl(value){var raw=String(value||'').trim();var lower=raw.toLowerCase();if(!raw||lower.startsWith('javascript:')||lower.startsWith('data:'))return '';return lower.startsWith('http://')||lower.startsWith('https://')?raw:'https://'+raw;}
function instagramUrl(value){var handle=String(value||'').trim();if(handle.startsWith('@'))handle=handle.slice(1);var marker='instagram.com/';var index=handle.toLowerCase().indexOf(marker);if(index>=0)handle=handle.slice(index+marker.length);while(handle.endsWith('/'))handle=handle.slice(0,-1);return handle?'https://instagram.com/'+encodeURIComponent(handle):'';}

function searchDirectorio() {
  loadDirectorio();
}

async function loadDirectorio() {
  const location = document.getElementById('dir-filter-location').value;
  const category = document.getElementById('dir-filter-category').value;
  const sort = document.getElementById('dir-sort').value;
  const searchTerm = document.getElementById('dir-search').value.trim().toLowerCase();
  const grid = document.getElementById('directorio-grid');

  grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--mid);">⏳ Buscando artesanos...</div>';

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const previewKey = urlParams.get('preview');
    const previewParam = previewKey ? 'preview=' + encodeURIComponent(previewKey) : '';
    const url = location
      ? '/api/pb-negocios/' + location + '?' + [category ? 'category=' + category : '', previewParam].filter(Boolean).join('&')
      : '/api/pb-negocios/all' + '?' + [category ? 'category=' + category : '', previewParam].filter(Boolean).join('&');

    const res = await fetch(url);
    const data = await res.json();
    let negocios = data.negocios || [];

    if (category && !location) {
      negocios = negocios.filter(n => n.category === category);
    }
    if (searchTerm) {
      negocios = negocios.filter(n =>
        (n.name || '').toLowerCase().includes(searchTerm) ||
        (n.category || '').toLowerCase().includes(searchTerm) ||
        (n.desc || '').toLowerCase().includes(searchTerm)
      );
    }

    if (negocios.length === 0) {
      document.getElementById('result-count').textContent = '0 participantes';
      grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--mid);">' +
        '<div style="font-size:3rem;margin-bottom:1rem;">🎨</div>' +
        '<div style="font-size:1rem;color:var(--dark);margin-bottom:1.5rem;line-height:1.6;">¡Wepa! Todavía no hay artesanos aquí. ¡Sé el primero en aparecer!</div>' +
        '<a href="/pb/add-negocio" style="display:inline-block;background:var(--blue);color:#fff;padding:0.8rem 1.5rem;border-radius:8px;text-decoration:none;font-weight:700;font-size:0.9rem;">🎨 Regístrate Gratis →</a>' +
        '</div>';
      return;
    }

    negocios.sort(function(a,b){
      if(sort==='name') return String(a.name||'').localeCompare(String(b.name||''),'es');
      if(sort==='location') return String(a.city||a.location||'').localeCompare(String(b.city||b.location||''),'es');
      if (a.destacado && !b.destacado) return -1;
      if (!a.destacado && b.destacado) return 1;
      return String(a.name||'').localeCompare(String(b.name||''),'es');
    });
    document.getElementById('result-count').textContent = negocios.length + ' participante' + (negocios.length===1?'':'s');

    var locationLabels = {
      'adjuntas':'Adjuntas, PR','aguada':'Aguada, PR','aguadilla':'Aguadilla, PR','aguas-buenas':'Aguas Buenas, PR','aibonito':'Aibonito, PR','anasco':'Añasco, PR','arecibo':'Arecibo, PR','arroyo':'Arroyo, PR','barceloneta':'Barceloneta, PR','barranquitas':'Barranquitas, PR','bayamon':'Bayamón, PR','cabo-rojo':'Cabo Rojo, PR','caguas':'Caguas, PR','camuy':'Camuy, PR','canovanas':'Canóvanas, PR','carolina':'Carolina, PR','catano':'Cataño, PR','cayey':'Cayey, PR','ceiba':'Ceiba, PR','ciales':'Ciales, PR','cidra':'Cidra, PR','coamo':'Coamo, PR','comerio':'Comerío, PR','corozal':'Corozal, PR','culebra':'Culebra, PR','dorado':'Dorado, PR','fajardo':'Fajardo, PR','florida-pr':'Florida, PR','guanica':'Guánica, PR','guayama':'Guayama, PR','guayanilla':'Guayanilla, PR','guaynabo':'Guaynabo, PR','gurabo':'Gurabo, PR','hatillo':'Hatillo, PR','hormigueros':'Hormigueros, PR','humacao':'Humacao, PR','isabela':'Isabela, PR','jayuya':'Jayuya, PR','juana-diaz':'Juana Díaz, PR','juncos':'Juncos, PR','lajas':'Lajas, PR','lares':'Lares, PR','las-marias':'Las Marías, PR','las-piedras':'Las Piedras, PR','loiza':'Loíza, PR','luquillo':'Luquillo, PR','manati':'Manatí, PR','maricao':'Maricao, PR','maunabo':'Maunabo, PR','mayaguez':'Mayagüez, PR','moca':'Moca, PR','morovis':'Morovis, PR','naguabo':'Naguabo, PR','naranjito':'Naranjito, PR','orocovis':'Orocovis, PR','patillas':'Patillas, PR','penuelas':'Peñuelas, PR','ponce':'Ponce, PR','quebradillas':'Quebradillas, PR','rincon':'Rincón, PR','rio-grande':'Río Grande, PR','sabana-grande':'Sabana Grande, PR','salinas':'Salinas, PR','san-german':'San Germán, PR','san-juan':'San Juan, PR','san-lorenzo':'San Lorenzo, PR','san-sebastian':'San Sebastián, PR','santa-isabel':'Santa Isabel, PR','toa-alta':'Toa Alta, PR','toa-baja':'Toa Baja, PR','trujillo-alto':'Trujillo Alto, PR','utuado':'Utuado, PR','vega-alta':'Vega Alta, PR','vega-baja':'Vega Baja, PR','vieques':'Vieques, PR','villalba':'Villalba, PR','yabucoa':'Yabucoa, PR','yauco':'Yauco, PR',
      'alabama':'Alabama, USA','alaska':'Alaska, USA','arizona':'Arizona, USA','arkansas':'Arkansas, USA','california':'California, USA','colorado':'Colorado, USA','connecticut':'Connecticut, USA','delaware':'Delaware, USA','florida':'Florida, USA','florida-us':'Florida, USA','georgia':'Georgia, USA','hawaii':'Hawaii, USA','idaho':'Idaho, USA','illinois':'Illinois, USA','indiana':'Indiana, USA','iowa':'Iowa, USA','kansas':'Kansas, USA','kentucky':'Kentucky, USA','louisiana':'Louisiana, USA','maine':'Maine, USA','maryland':'Maryland, USA','massachusetts':'Massachusetts, USA','michigan':'Michigan, USA','minnesota':'Minnesota, USA','mississippi':'Mississippi, USA','missouri':'Missouri, USA','montana':'Montana, USA','nebraska':'Nebraska, USA','nevada':'Nevada, USA','new-hampshire':'New Hampshire, USA','new-jersey':'New Jersey, USA','new-mexico':'New Mexico, USA','nueva-york':'Nueva York, USA','north-carolina':'North Carolina, USA','north-dakota':'North Dakota, USA','ohio':'Ohio, USA','oklahoma':'Oklahoma, USA','oregon':'Oregon, USA','pennsylvania':'Pennsylvania, USA','rhode-island':'Rhode Island, USA','south-carolina':'South Carolina, USA','south-dakota':'South Dakota, USA','tennessee':'Tennessee, USA','texas':'Texas, USA','utah':'Utah, USA','vermont':'Vermont, USA','virginia':'Virginia, USA','washington':'Washington, USA','west-virginia':'West Virginia, USA','wisconsin':'Wisconsin, USA','wyoming':'Wyoming, USA','washington-dc':'Washington D.C., USA'
    };

    var html = '<div class="dir-grid">';
    negocios.forEach(function(n) {
        var icon = categoryIcons[n.category] || '🎨';
        var city = n.city || locationLabels[n.location] || 'Puerto Rico';
        var photoImg = n.photo && n.photo !== ''
          ? '<img src="' + escapeHtml(safeExternalUrl(n.photo)) + '" class="dir-card-photo" alt="Trabajo artesanal de ' + escapeHtml(n.name) + '" loading="lazy">' : '<div class="dir-card-photo" style="display:grid;place-items:center;font-size:3rem">🎨</div>';
        var descText = n.desc && n.desc !== ''
          ? '<div class="dir-card-desc">' + escapeHtml(n.desc) + '</div>' : '';
        var waLink = n.whatsapp && n.whatsapp !== ''
          ? '<a href="https://wa.me/' + String(n.whatsapp).replace(/[^0-9]/g,'') + '" target="_blank" rel="noopener">WhatsApp</a>' : '';
        var igLink = n.instagram && n.instagram !== '' && n.instagram.toLowerCase() !== 'no'
          ? '<a href="' + escapeHtml(instagramUrl(n.instagram)) + '" target="_blank" rel="noopener">Instagram</a>' : '';
        var webLink = n.website && n.website !== '' && n.website.toLowerCase() !== 'no' && n.website.toLowerCase() !== 'nan'
          ? '<a href="' + escapeHtml(safeExternalUrl(n.website)) + '" target="_blank" rel="noopener">Web</a>' : '';
        html += '<div class="dir-card">';
        html += photoImg;
        html += '<div class="dir-card-body">';
        html += '<div style="display:flex;align-items:flex-start;gap:0.5rem;">';
        html += '<span style="font-size:1.2rem;">' + icon + '</span>';
        html += '<div style="flex:1;">';
        html += '<div style="font-weight:800;font-size:1rem;color:var(--dark);line-height:1.3;">' + escapeHtml(n.name) + '</div>';
        html += '<div style="font-size:0.72rem;color:var(--mid);margin-top:0.2rem;">' + escapeHtml(categoryLabels[n.category] || 'Artesanía puertorriqueña') + ' · 📍 ' + escapeHtml(city) + '</div>';
        html += '</div></div>';
        html += descText;
        html += '<div class="dir-card-actions"><a class="profile-link" href="/artesanos/' + encodeURIComponent(n.slug) + '">Conocer al artesano</a>' + waLink + webLink + igLink + '</div>';
        html += '</div></div>';
    });
    html += '</div>';
    grid.innerHTML = html;

  } catch(e) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--mid);">Error cargando el directorio. Intenta de nuevo.</div>';
  }
}

loadDirectorio();
</script>

</body>
</html>`;
