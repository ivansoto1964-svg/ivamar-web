module.exports = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Regresar a Puerto Rico desde USA — Guía Completa | Planeta Boricua</title>
<meta name="description" content="Guía completa para boricuas que regresan a Puerto Rico desde Estados Unidos. Mudanza, licencias DTOP, vivienda, empleo, impuestos, servicios y más.">
<meta name="keywords" content="regresar a Puerto Rico, mudarse de USA a Puerto Rico, volver a Puerto Rico, boricua regresa isla, DTOP licencia, vivienda Puerto Rico, empleo Puerto Rico, Ley 60 Puerto Rico">
<meta property="og:title" content="Regresar a Puerto Rico — Guía Completa para Boricuas">
<meta property="og:description" content="Todo lo que necesitas saber para regresar a Puerto Rico desde Estados Unidos. Mudanza, licencias, vivienda, empleo y más.">
<meta property="og:url" content="https://www.masboricuaqueunmofongo.com/regresar-a-pr">
<meta property="og:image" content="https://www.masboricuaqueunmofongo.com/img/og-planetaboricua.jpg">
<link rel="canonical" href="https://www.masboricuaqueunmofongo.com/regresar-a-pr">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4181903530685744" crossorigin="anonymous"></script>
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
  --green:#2e7d32;
}

/* NAV */
nav{background:var(--white);border-bottom:3px solid var(--red);padding:0;position:sticky;top:0;z-index:100;}
.nav-top{max-width:1200px;margin:0 auto;padding:0.8rem 2rem;display:flex;align-items:center;justify-content:space-between;}
.nav-logo{display:flex;align-items:center;gap:0.6rem;text-decoration:none;}
.nav-logo img{height:44px;width:auto;mix-blend-mode:multiply;}
.nav-logo-text{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:800;color:var(--dark);}
.nav-back{font-size:0.78rem;color:var(--red);text-decoration:none;font-weight:600;}
.nav-back:hover{text-decoration:underline;}

/* HERO */
.page-hero{background:linear-gradient(135deg,#CE1126,#8B0000);padding:4rem 2rem;text-align:center;position:relative;overflow:hidden;}
.page-hero::before{content:'🇵🇷';position:absolute;font-size:15rem;opacity:0.05;top:-2rem;right:-2rem;}
.page-hero-inner{max-width:800px;margin:0 auto;position:relative;z-index:1;}
.page-hero-eyebrow{font-size:0.65rem;font-weight:800;color:rgba(255,255,255,0.6);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:0.8rem;}
.page-hero h1{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,3rem);font-weight:800;color:#fff;line-height:1.2;margin-bottom:1rem;}
.page-hero h1 em{font-style:italic;color:#f5c842;}
.page-hero p{font-size:0.95rem;color:rgba(255,255,255,0.75);line-height:1.8;margin-bottom:2rem;max-width:560px;margin-left:auto;margin-right:auto;}
.hero-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}
.btn-white{display:inline-flex;align-items:center;gap:0.5rem;background:#fff;color:var(--red);padding:0.8rem 1.6rem;border-radius:4px;font-size:0.88rem;font-weight:700;text-decoration:none;}
.btn-outline-w{display:inline-flex;align-items:center;gap:0.5rem;border:2px solid rgba(255,255,255,0.4);color:#fff;padding:0.8rem 1.6rem;border-radius:4px;font-size:0.88rem;font-weight:600;text-decoration:none;}

/* CATEGORY TABS */
.cat-tabs{background:var(--white);border-bottom:1px solid var(--border);position:sticky;top:64px;z-index:90;}
.cat-tabs-inner{max-width:1200px;margin:0 auto;padding:0 2rem;display:flex;gap:0;overflow-x:auto;}
.cat-tab{padding:1rem 1.2rem;font-size:0.78rem;font-weight:600;color:var(--mid);white-space:nowrap;border-bottom:3px solid transparent;transition:all 0.2s;cursor:pointer;display:flex;align-items:center;gap:0.4rem;background:transparent;border-left:none;border-right:none;border-top:none;font-family:'Inter',sans-serif;}
.cat-tab:hover{color:var(--dark);}
.cat-tab.active{color:var(--red);border-bottom-color:var(--red);}

/* MAIN CONTENT */
.content{max-width:1200px;margin:0 auto;padding:2rem;display:grid;grid-template-columns:1fr 300px;gap:2rem;align-items:start;}

/* RESOURCE SECTIONS */
.resource-section{display:none;}
.resource-section.active{display:block;}
.resource-header{margin-bottom:1.5rem;}
.resource-title{font-family:'Playfair Display',serif;font-size:1.6rem;font-weight:800;color:var(--dark);margin-bottom:0.4rem;}
.resource-sub{font-size:0.88rem;color:var(--mid);line-height:1.6;}

/* STEPS */
.steps-card{background:var(--white);border-radius:8px;border:1px solid var(--border);overflow:hidden;margin-bottom:1.5rem;}
.steps-card-header{padding:1rem 1.2rem;background:#fff5f5;border-bottom:1px solid #fdd;display:flex;align-items:center;gap:0.8rem;}
.steps-card-icon{font-size:1.4rem;}
.steps-card-title{font-weight:700;font-size:0.88rem;color:var(--dark);}
.steps-card-sub{font-size:0.7rem;color:var(--mid);}
.steps-card-body{padding:1.2rem;}
.steps-list{list-style:none;display:flex;flex-direction:column;gap:1rem;}
.step-item{display:flex;gap:1rem;align-items:flex-start;}
.step-num{width:28px;height:28px;background:var(--red);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.72rem;font-weight:800;flex-shrink:0;margin-top:1px;}
.step-title{font-weight:700;font-size:0.85rem;color:var(--dark);margin-bottom:0.2rem;}
.step-desc{font-size:0.78rem;color:var(--mid);line-height:1.5;}
.step-note{font-size:0.72rem;color:var(--green);font-weight:600;margin-top:0.2rem;}
.step-warning{font-size:0.72rem;color:#f57c00;font-weight:600;margin-top:0.2rem;}

/* INFO BOX */
.info-box{background:#e8f5e9;border:1px solid #a5d6a7;border-radius:8px;padding:1rem 1.2rem;margin-bottom:1.5rem;}
.info-box.warning{background:#fff8e1;border-color:#ffe082;}
.info-box.blue{background:#e3f2fd;border-color:#90caf9;}
.info-box.red{background:#fff5f5;border-color:#ffcdd2;}
.info-box-title{font-weight:700;font-size:0.82rem;color:var(--dark);margin-bottom:0.4rem;}
.info-box-text{font-size:0.78rem;color:#444;line-height:1.6;}

/* CARDS GRID */
.cards-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1rem;margin-bottom:1.5rem;}
.info-card{background:var(--white);border:1px solid var(--border);border-radius:8px;overflow:hidden;}
.info-card-header{padding:0.8rem 1rem;background:#f8f8f5;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;}
.info-card-name{font-weight:800;font-size:0.88rem;color:var(--dark);}
.info-card-body{padding:1rem;}
.info-card-detail{font-size:0.78rem;color:#444;margin-bottom:0.4rem;display:flex;gap:0.5rem;}
.info-card-detail strong{color:var(--dark);min-width:80px;}
.info-card-link{display:inline-flex;align-items:center;gap:0.3rem;font-size:0.72rem;font-weight:700;color:var(--red);text-decoration:none;margin-top:0.6rem;}

/* SIDEBAR */
.sidebar{}
.sidebar-card{background:var(--white);border-radius:8px;border:1px solid var(--border);padding:1.2rem;margin-bottom:1rem;}
.sidebar-title{font-weight:700;font-size:0.82rem;color:var(--dark);margin-bottom:0.8rem;padding-bottom:0.5rem;border-bottom:2px solid var(--red);}
.sidebar-link{display:block;font-size:0.78rem;color:var(--mid);text-decoration:none;padding:0.4rem 0;border-bottom:1px solid var(--border);transition:color 0.2s;}
.sidebar-link:last-child{border-bottom:none;}
.sidebar-link:hover{color:var(--red);}
.nayeli-cta{background:var(--blue);border-radius:8px;padding:1.2rem;text-align:center;color:#fff;}
.nayeli-cta-icon{font-size:2rem;margin-bottom:0.5rem;}
.nayeli-cta-title{font-family:'Playfair Display',serif;font-size:1rem;font-weight:800;margin-bottom:0.4rem;}
.nayeli-cta-sub{font-size:0.75rem;color:rgba(255,255,255,0.65);margin-bottom:1rem;line-height:1.5;}
.nayeli-cta-btn{display:block;background:var(--red);color:#fff;padding:0.65rem;border-radius:4px;font-size:0.82rem;font-weight:700;text-decoration:none;}

/* AD */
.ad-strip{max-width:1200px;margin:0 auto;padding:1rem 2rem;text-align:center;}

/* FOOTER */
.pb-footer{background:var(--white);border-top:3px solid var(--red);}
.pb-footer-main{max-width:1200px;margin:0 auto;padding:2rem;display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:2rem;}
.pb-footer-col h4{font-size:0.65rem;font-weight:800;color:var(--dark);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.8rem;padding-bottom:0.4rem;border-bottom:2px solid var(--red);}
.pb-footer-col a{display:block;font-size:0.78rem;color:var(--mid);text-decoration:none;margin-bottom:0.4rem;transition:color 0.2s;}
.pb-footer-col a:hover{color:var(--red);}
.pb-footer-bottom{background:var(--light);border-top:1px solid var(--border);padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;}
.pb-footer-copy{font-size:0.68rem;color:#999;}
.pb-footer-ivamar{font-size:0.68rem;color:#999;}
.pb-footer-ivamar a{color:var(--red);text-decoration:none;}

@media(max-width:768px){
  .nav-top{padding:0.8rem 1rem;}
  .page-hero{padding:3rem 1rem;}
  .content{grid-template-columns:1fr;padding:1rem;}
  .sidebar{display:none;}
  .cat-tabs-inner{padding:0 1rem;}
  .cards-grid{grid-template-columns:1fr;}
  .pb-footer-main{grid-template-columns:1fr 1fr;padding:1.5rem 1rem;}
  .pb-footer-bottom{padding:1rem;flex-direction:column;text-align:center;}
}
</style>
</head>
<body>

<!-- NAV -->
<nav>
  <div class="nav-top">
    <a href="/" class="nav-logo">
      <img src="/img/pb-logo.png" alt="Planeta Boricua">
      <span class="nav-logo-text">Planeta Boricua</span>
    </a>
    <a href="/recursos" class="nav-back">← Centro de Recursos</a>
  </div>
</nav>

<!-- HERO -->
<section class="page-hero">
  <div class="page-hero-inner">
    <div class="page-hero-eyebrow">Guía Completa</div>
    <h1>Regresar a <em>Puerto Rico</em> 🇵🇷</h1>
    <p>Todo lo que necesitas saber para volver a la isla desde Estados Unidos — mudanza, licencias, vivienda, empleo, impuestos y servicios. Información verificada, en español boricua.</p>
    <div class="hero-btns">
      <a href="#mudanza" class="btn-white">Ver Guía Completa →</a>
      <a href="/recursos" class="btn-outline-w">Guía PR → USA</a>
    </div>
  </div>
</section>

<!-- CATEGORY TABS -->
<div class="cat-tabs">
  <div class="cat-tabs-inner">
    <button class="cat-tab active" onclick="showSection('mudanza')">🚚 Mudanza</button>
    <button class="cat-tab" onclick="showSection('licencias')">🚗 Licencias</button>
    <button class="cat-tab" onclick="showSection('vivienda')">🏠 Vivienda</button>
    <button class="cat-tab" onclick="showSection('empleo')">💼 Empleo</button>
    <button class="cat-tab" onclick="showSection('impuestos')">💰 Impuestos</button>
    <button class="cat-tab" onclick="showSection('servicios')">💧 Servicios</button>
    <button class="cat-tab" onclick="showSection('salud')">🏥 Salud</button>
    <button class="cat-tab" onclick="showSection('escuelas')">🏫 Escuelas</button>
  </div>
</div>

<!-- AD -->
<div class="ad-strip">
  <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-4181903530685744" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>

<!-- MAIN CONTENT -->
<div class="content">
  <div>

    <!-- MUDANZA -->
    <div class="resource-section active" id="section-mudanza">
      <div class="resource-header">
        <h2 class="resource-title">🚚 Mudanza USA → Puerto Rico</h2>
        <p class="resource-sub">Cómo enviar tus pertenencias y tu vehículo de vuelta a la isla.</p>
      </div>

      <div class="info-box">
        <div class="info-box-title">💡 Lo primero que debes saber</div>
        <div class="info-box-text">Mudarte de USA a PR es técnicamente una mudanza doméstica — no necesitas aduana internacional. Pero sí necesitas una naviera porque es una isla. Las dos principales son Crowley y TOTE Maritime.</div>
      </div>

      <div class="steps-card">
        <div class="steps-card-header">
          <div class="steps-card-icon">📦</div>
          <div>
            <div class="steps-card-title">Enviar tus muebles y pertenencias</div>
            <div class="steps-card-sub">Proceso completo paso a paso</div>
          </div>
        </div>
        <div class="steps-card-body">
          <ul class="steps-list">
            <li class="step-item">
              <div class="step-num">1</div>
              <div class="step-content">
                <div class="step-title">Elige la naviera</div>
                <div class="step-desc">Crowley y TOTE Maritime son las principales opciones. Ambas operan desde Jacksonville, FL y Eddystone, PA hacia San Juan, PR. Compara precios según el volumen que vas a enviar.</div>
                <div class="step-note">💡 Crowley: crowley.com · (904) 727-2200</div>
                <div class="step-note">💡 TOTE Maritime: totemaritime.com · (904) 855-0500</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">2</div>
              <div class="step-content">
                <div class="step-title">Opciones de envío</div>
                <div class="step-desc">Puedes enviar en contenedor completo (si tienes mucho) o LCL (Less than Container Load) si tienes pocas cosas. El LCL comparte contenedor con otros envíos y es más económico.</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">3</div>
              <div class="step-content">
                <div class="step-title">Tiempo de tránsito</div>
                <div class="step-desc">De Jacksonville a San Juan: 3-5 días. De Eddystone a San Juan: 5-7 días. Planifica con al menos 2-3 semanas de anticipación para reservar espacio.</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">4</div>
              <div class="step-content">
                <div class="step-title">Entrega en PR</div>
                <div class="step-desc">Las navieras entregan en el puerto de San Juan. Necesitas contratar un servicio de entrega local en PR para llevar las cosas a tu nueva dirección. Muchas navieras tienen este servicio adicional.</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">5</div>
              <div class="step-content">
                <div class="step-title">Artículos que no puedes enviar</div>
                <div class="step-desc">Plantas, alimentos frescos, materiales peligrosos, y ciertos artículos regulados. Consulta con la naviera antes de empacar.</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="steps-card">
        <div class="steps-card-header">
          <div class="steps-card-icon">🚗</div>
          <div>
            <div class="steps-card-title">Enviar tu vehículo a PR</div>
            <div class="steps-card-sub">Requisitos y proceso</div>
          </div>
        </div>
        <div class="steps-card-body">
          <ul class="steps-list">
            <li class="step-item">
              <div class="step-num">1</div>
              <div class="step-content">
                <div class="step-title">Documentos necesarios</div>
                <div class="step-desc">Título del vehículo limpio (sin liens), seguro de auto activo, y el vehículo debe estar limpio (lavado) antes de embarcarse.</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">2</div>
              <div class="step-content">
                <div class="step-title">Arbitrios al llegar a PR</div>
                <div class="step-desc">Si el vehículo fue comprado fuera de PR, puede estar sujeto al pago de arbitrios (impuesto de importación) al registrarlo en PR. Consulta con Hacienda PR antes de enviarlo.</div>
                <div class="step-warning">⚠ Los arbitrios pueden ser significativos — infórmate antes</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">3</div>
              <div class="step-content">
                <div class="step-title">Registrar el vehículo en DTOP</div>
                <div class="step-desc">Tienes 90 días para registrar tu vehículo en PR. Necesitas: título, arbitrios pagados (si aplica), inspección vehicular, seguro de PR y pago de tablillas.</div>
                <div class="step-note">💡 DTOP: (787) 294-0101 · dtop.pr.gov</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">4</div>
              <div class="step-content">
                <div class="step-title">Seguro de auto en PR</div>
                <div class="step-desc">Necesitas seguro de PR antes de registrar el vehículo. Tu seguro de USA no es válido en PR. Contacta compañías como Triple-S, MAPFRE o State Farm PR.</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- LICENCIAS -->
    <div class="resource-section" id="section-licencias">
      <div class="resource-header">
        <h2 class="resource-title">🚗 Licencia de Conducir en PR</h2>
        <p class="resource-sub">Cómo canjear tu licencia de USA por una de Puerto Rico en el DTOP.</p>
      </div>

      <div class="info-box blue">
        <div class="info-box-title">📋 Lo básico</div>
        <div class="info-box-text">Al establecer residencia en PR, tienes 90 días para canjear tu licencia de USA por una de PR. El DTOP requiere cita previa — sácala con anticipación porque se agotan rápido.</div>
      </div>

      <div class="steps-card">
        <div class="steps-card-header">
          <div class="steps-card-icon">🪪</div>
          <div>
            <div class="steps-card-title">Canjear licencia USA → DTOP Puerto Rico</div>
            <div class="steps-card-sub">Departamento de Transportación y Obras Públicas</div>
          </div>
        </div>
        <div class="steps-card-body">
          <ul class="steps-list">
            <li class="step-item">
              <div class="step-num">1</div>
              <div class="step-content">
                <div class="step-title">Documentos necesarios</div>
                <div class="step-desc">Licencia de conducir del estado (original), acta de nacimiento de PR o pasaporte americano, tarjeta de Social Security, y dos pruebas de residencia en PR (factura de LUMA, AAA, banco o contrato de renta).</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">2</div>
              <div class="step-content">
                <div class="step-title">Sacar cita en DTOP</div>
                <div class="step-desc">Cita obligatoria en dtop.pr.gov o llamando al (787) 294-0101. Las citas se agotan — sácala lo antes posible después de llegar a PR.</div>
                <div class="step-note">💡 dtop.pr.gov · (787) 294-0101</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">3</div>
              <div class="step-content">
                <div class="step-title">Examen de conocimiento</div>
                <div class="step-desc">Puede que tengas que tomar el examen de conocimiento del tránsito de PR. Prepárate con el manual oficial disponible en el portal del DTOP.</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">4</div>
              <div class="step-content">
                <div class="step-title">Costo y tiempo</div>
                <div class="step-desc">Costo aproximado: $10-25. Recibes una licencia temporal el mismo día y la permanente por correo en 2-3 semanas.</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="info-box warning">
        <div class="info-box-title">⚠ REAL ID en PR</div>
        <div class="info-box-text">Las licencias de PR son REAL ID compliant desde 2022. Sin embargo, para vuelos domésticos dentro de USA necesitas asegurarte que tu nueva licencia de PR tenga el símbolo de estrella REAL ID. Pregúntalo en el DTOP al hacer el canje.</div>
      </div>
    </div>

    <!-- VIVIENDA -->
    <div class="resource-section" id="section-vivienda">
      <div class="resource-header">
        <h2 class="resource-title">🏠 Vivienda en Puerto Rico</h2>
        <p class="resource-sub">El mercado de vivienda en PR ha cambiado significativamente. Lo que necesitas saber antes de buscar.</p>
      </div>

      <div class="info-box warning">
        <div class="info-box-title">⚠ El mercado de vivienda en PR es diferente ahora</div>
        <div class="info-box-text">Después del huracán María (2017) y la pandemia, los precios de vivienda en PR subieron considerablemente. San Juan, Dorado y áreas metropolitanas están especialmente caras. Planifica con tiempo y presupuesto realista.</div>
      </div>

      <div class="steps-card">
        <div class="steps-card-header">
          <div class="steps-card-icon">🏘️</div>
          <div>
            <div class="steps-card-title">Opciones de vivienda al regresar</div>
            <div class="steps-card-sub">Renta vs compra — qué conviene más</div>
          </div>
        </div>
        <div class="steps-card-body">
          <ul class="steps-list">
            <li class="step-item">
              <div class="step-num">1</div>
              <div class="step-content">
                <div class="step-title">Renta primero — compra después</div>
                <div class="step-desc">Si llevas tiempo fuera, renta por 6-12 meses antes de comprar. El mercado y los vecindarios cambian. Necesitas tiempo para redescubrir la isla y decidir dónde quieres vivir.</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">2</div>
              <div class="step-content">
                <div class="step-title">Precios actuales de renta (2026)</div>
                <div class="step-desc">San Juan / Santurce: $1,200-2,500/mes. Guaynabo / Bayamón: $900-1,800/mes. Ponce / Mayagüez: $600-1,200/mes. Área rural: $400-800/mes.</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">3</div>
              <div class="step-content">
                <div class="step-title">Dónde buscar vivienda</div>
                <div class="step-desc">clasificadosonline.com es el portal más usado en PR. También Facebook Marketplace, Zillow (tiene listados de PR) y grupos de Facebook de la comunidad.</div>
                <div class="step-note">💡 clasificadosonline.com — el Craigslist de PR</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">4</div>
              <div class="step-content">
                <div class="step-title">Comprar propiedad en PR</div>
                <div class="step-desc">Si vas a comprar, necesitas un agente de bienes raíces licenciado en PR. Los bancos que operan en PR y USA (Banco Popular, Oriental) facilitan el proceso de hipoteca para quienes regresan.</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">5</div>
              <div class="step-content">
                <div class="step-title">Zonas a considerar</div>
                <div class="step-desc">Para familias: Guaynabo, Bayamón, Caguas. Para jóvenes profesionales: Santurce, Miramar, Condado. Para tranquilidad: Rincón, Isabela, Luquillo. Para costo de vida bajo: interior de la isla.</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- EMPLEO -->
    <div class="resource-section" id="section-empleo">
      <div class="resource-header">
        <h2 class="resource-title">💼 Empleo en Puerto Rico</h2>
        <p class="resource-sub">Cómo buscar trabajo en PR, el mercado laboral actual y opciones de trabajo remoto.</p>
      </div>

      <div class="info-box blue">
        <div class="info-box-title">💡 El trabajo remoto cambió todo</div>
        <div class="info-box-text">Si trabajas remotamente para una empresa de USA, puedes regresar a PR y mantener tu trabajo. Es la forma más fácil de regresar — mantienes tu ingreso en dólares y vives en la isla.</div>
      </div>

      <div class="steps-card">
        <div class="steps-card-header">
          <div class="steps-card-icon">🔍</div>
          <div>
            <div class="steps-card-title">Dónde buscar trabajo en PR</div>
          </div>
        </div>
        <div class="steps-card-body">
          <ul class="steps-list">
            <li class="step-item">
              <div class="step-num">1</div>
              <div class="step-content">
                <div class="step-title">Portales de empleo en PR</div>
                <div class="step-desc">Indeed PR, LinkedIn, clasificadosonline.com (sección empleos), y empleos.pr.gov (empleos del gobierno de PR).</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">2</div>
              <div class="step-content">
                <div class="step-title">Sectores con más oportunidades</div>
                <div class="step-desc">Manufactura farmacéutica, tecnología, turismo, construcción (hay mucha reconstrucción post-María), salud, y servicios profesionales bilingües.</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">3</div>
              <div class="step-content">
                <div class="step-title">Tu bilingüismo es una ventaja</div>
                <div class="step-desc">Si venías de USA y eres completamente bilingüe inglés-español, tienes ventaja competitiva en PR. Muchas empresas multinacionales buscan exactamente ese perfil.</div>
                <div class="step-note">💡 Empresas como Microsoft, Google, Amazon tienen operaciones en PR</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">4</div>
              <div class="step-content">
                <div class="step-title">Trabajo remoto desde PR</div>
                <div class="step-desc">Si mantienes trabajo remoto de USA, verifica las implicaciones fiscales. Bajo ciertas condiciones puedes pagar menos impuestos viviendo en PR que en un estado de USA.</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">5</div>
              <div class="step-content">
                <div class="step-title">Emprender en PR</div>
                <div class="step-desc">PR ofrece incentivos para nuevos negocios, especialmente bajo las Leyes 60 y 73. Si piensas emprender, consulta con la Compañía de Comercio y Exportación de PR (CCE).</div>
                <div class="step-note">💡 CCE PR: pridco.pr.gov</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- IMPUESTOS -->
    <div class="resource-section" id="section-impuestos">
      <div class="resource-header">
        <h2 class="resource-title">💰 Impuestos al Regresar a PR</h2>
        <p class="resource-sub">Las ventajas fiscales de regresar a Puerto Rico y lo que necesitas saber sobre impuestos.</p>
      </div>

      <div class="info-box red">
        <div class="info-box-title">⚠ Consulta siempre con un contador especializado</div>
        <div class="info-box-text">La situación fiscal de PR es compleja y única. Esta información es orientativa. Consulta con un contador público autorizado (CPA) especializado en tributación de PR antes de tomar decisiones.</div>
      </div>

      <div class="steps-card">
        <div class="steps-card-header">
          <div class="steps-card-icon">📊</div>
          <div>
            <div class="steps-card-title">Lo que cambia al establecer residencia en PR</div>
          </div>
        </div>
        <div class="steps-card-body">
          <ul class="steps-list">
            <li class="step-item">
              <div class="step-num">1</div>
              <div class="step-content">
                <div class="step-title">Puerto Rico tiene su propio sistema fiscal</div>
                <div class="step-desc">PR tiene un sistema tributario propio — Hacienda PR — separado del IRS federal. Los residentes de PR generalmente están exentos de impuesto federal sobre ingresos generados en PR.</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">2</div>
              <div class="step-content">
                <div class="step-title">Ley 60 — Incentivos para nuevos residentes</div>
                <div class="step-desc">Si eres nuevo residente bona fide de PR (viniste de USA) puedes calificar para incentivos bajo la Ley 60, incluyendo tasa reducida de 4% en impuestos sobre negocios y 0% en ganancias de capital generadas después de establecer residencia.</div>
                <div class="step-note">💡 Requiere cumplir requisitos específicos de presencia en PR</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">3</div>
              <div class="step-content">
                <div class="step-title">Año de transición — el más complicado</div>
                <div class="step-desc">El año en que te mudas es el más complicado fiscalmente. Puedes tener obligaciones con el IRS (por los meses en USA) y con Hacienda PR (por los meses en PR). Un CPA es esencial ese primer año.</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">4</div>
              <div class="step-content">
                <div class="step-title">Notificar a Hacienda PR</div>
                <div class="step-desc">Al establecer residencia en PR, regístrate en Hacienda PR para obtener tu número de contribuyente y comenzar a cumplir con tus obligaciones fiscales en la isla.</div>
                <div class="step-note">💡 Hacienda PR: hacienda.pr.gov · (787) 622-0123</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- SERVICIOS -->
    <div class="resource-section" id="section-servicios">
      <div class="resource-header">
        <h2 class="resource-title">💧 Servicios Públicos en PR</h2>
        <p class="resource-sub">Cómo conectar agua, luz e internet al llegar a Puerto Rico.</p>
      </div>

      <div class="info-box warning">
        <div class="info-box-title">⚠ Prepárate para la realidad de los servicios en PR</div>
        <div class="info-box-text">La infraestructura de servicios en PR, especialmente la electricidad (LUMA Energy), puede ser menos confiable que en los estados. Los apagones son frecuentes. Muchas familias invierten en panel solar e inversor como respaldo.</div>
      </div>

      <div class="cards-grid">
        <div class="info-card">
          <div class="info-card-header"><span class="info-card-name">⚡ Luz — LUMA Energy</span></div>
          <div class="info-card-body">
            <div class="info-card-detail"><strong>Teléfono:</strong> (787) 521-1028</div>
            <div class="info-card-detail"><strong>Documentos:</strong> Escritura o contrato de renta + ID + NIM del medidor</div>
            <div class="info-card-detail"><strong>Proceso:</strong> En línea preferiblemente</div>
            <div class="info-card-detail"><strong>Tiempo:</strong> 3-5 días hábiles</div>
            <a href="https://www.lumapr.com" target="_blank" class="info-card-link">lumapr.com →</a>
          </div>
        </div>
        <div class="info-card">
          <div class="info-card-header"><span class="info-card-name">💧 Agua — AAA</span></div>
          <div class="info-card-body">
            <div class="info-card-detail"><strong>Teléfono:</strong> (787) 620-2277</div>
            <div class="info-card-detail"><strong>Documentos:</strong> Escritura o contrato + ID</div>
            <div class="info-card-detail"><strong>Proceso:</strong> En persona o en línea</div>
            <div class="info-card-detail"><strong>Tiempo:</strong> 2-3 días hábiles</div>
            <a href="https://www.acueductospr.com" target="_blank" class="info-card-link">acueductospr.com →</a>
          </div>
        </div>
        <div class="info-card">
          <div class="info-card-header"><span class="info-card-name">📶 Internet y Cable</span></div>
          <div class="info-card-body">
            <div class="info-card-detail"><strong>Liberty PR:</strong> (787) 355-2222</div>
            <div class="info-card-detail"><strong>Claro PR:</strong> (787) 792-3000</div>
            <div class="info-card-detail"><strong>Choice Cable:</strong> (787) 751-6200</div>
            <div class="info-card-detail"><strong>Starlink:</strong> starlink.com (rural)</div>
          </div>
        </div>
        <div class="info-card">
          <div class="info-card-header"><span class="info-card-name">☀️ Solar e Inversor</span></div>
          <div class="info-card-body">
            <div class="info-card-detail"><strong>Costo aprox:</strong> $15,000-25,000</div>
            <div class="info-card-detail"><strong>Incentivos:</strong> Crédito federal 30%</div>
            <div class="info-card-detail"><strong>Retorno:</strong> 5-8 años</div>
            <div class="info-card-detail"><strong>Recomendado:</strong> Fuera de áreas urbanas</div>
          </div>
        </div>
      </div>
    </div>

    <!-- SALUD -->
    <div class="resource-section" id="section-salud">
      <div class="resource-header">
        <h2 class="resource-title">🏥 Salud al Regresar a PR</h2>
        <p class="resource-sub">Seguros médicos, hospitales y cómo transferir tu cobertura al regresar a la isla.</p>
      </div>

      <div class="info-box warning">
        <div class="info-box-title">⚠ Medicare en PR es diferente</div>
        <div class="info-box-text">Si eres beneficiario de Medicare, tu cobertura cambia al establecer residencia en PR. Medicare Part B tiene cobertura diferente en PR vs los estados continentales. Llama a Medicare al 1-800-633-4227 para actualizar tu dirección y entender los cambios.</div>
      </div>

      <div class="steps-card">
        <div class="steps-card-header">
          <div class="steps-card-icon">🏥</div>
          <div>
            <div class="steps-card-title">Opciones de seguro médico en PR</div>
          </div>
        </div>
        <div class="steps-card-body">
          <ul class="steps-list">
            <li class="step-item">
              <div class="step-num">1</div>
              <div class="step-content">
                <div class="step-title">Mi Salud — Medicaid de PR</div>
                <div class="step-desc">Si calificas por ingreso, puedes inscribirte en Mi Salud. Cubre servicios médicos básicos sin costo o con copago mínimo.</div>
                <div class="step-note">💡 Mi Salud: (787) 765-2929</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">2</div>
              <div class="step-content">
                <div class="step-title">Seguros privados en PR</div>
                <div class="step-desc">Triple-S (787) 774-6900, MCS (787) 758-0505, First Medical (787) 620-3344, Humana PR. Tu mudanza activa un Período Especial de Inscripción de 60 días.</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">3</div>
              <div class="step-content">
                <div class="step-title">Transferir récords médicos</div>
                <div class="step-desc">Solicita copias de todos tus récords médicos antes de salir de USA. Pide también las recetas activas para que tu nuevo médico en PR pueda continuarlas.</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">4</div>
              <div class="step-content">
                <div class="step-title">Hospitales principales en PR</div>
                <div class="step-desc">Centro Médico (787) 777-3535 · Auxilio Mutuo (787) 758-2000 · Ashford Presbyterian (787) 721-2160 · HIMA San Pablo Caguas (787) 653-3434 · Hospital Episcopal (787) 721-2160</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- ESCUELAS -->
    <div class="resource-section" id="section-escuelas">
      <div class="resource-header">
        <h2 class="resource-title">🏫 Escuelas al Regresar a PR</h2>
        <p class="resource-sub">Cómo matricular a tus hijos en escuelas de Puerto Rico y transferir créditos universitarios.</p>
      </div>

      <div class="steps-card">
        <div class="steps-card-header">
          <div class="steps-card-icon">📚</div>
          <div>
            <div class="steps-card-title">Matricular en escuelas de PR</div>
            <div class="steps-card-sub">Kinder a 12vo grado</div>
          </div>
        </div>
        <div class="steps-card-body">
          <ul class="steps-list">
            <li class="step-item">
              <div class="step-num">1</div>
              <div class="step-content">
                <div class="step-title">Documentos necesarios</div>
                <div class="step-desc">Acta de nacimiento, récords de vacunas actualizados, transcripción escolar del estado (con traducción al español si es necesario), y prueba de residencia en PR.</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">2</div>
              <div class="step-content">
                <div class="step-title">Escuelas públicas — por zona</div>
                <div class="step-desc">El Departamento de Educación de PR asigna la escuela según la dirección. Visita la escuela del distrito con los documentos.</div>
                <div class="step-note">💡 DE PR: (787) 759-2000 · de.pr.gov</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">3</div>
              <div class="step-content">
                <div class="step-title">El español en las escuelas</div>
                <div class="step-desc">Si tus hijos crecieron en USA y su español es limitado, algunas escuelas tienen programas de apoyo. Las escuelas privadas bilinguales son una opción si el presupuesto lo permite.</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">4</div>
              <div class="step-content">
                <div class="step-title">Escuelas privadas recomendadas</div>
                <div class="step-desc">Academia San José (Guaynabo), Colegio San Ignacio (Río Piedras), Baldwin School (Bayamón), Cathedral School (Santurce), Wesleyan Academy (Guaynabo).</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">5</div>
              <div class="step-content">
                <div class="step-title">Universidad en PR</div>
                <div class="step-desc">UPR, Inter, Sagrado Corazón y Ana G. Méndez aceptan transferencias de universidades acreditadas de USA. Lleva transcripciones oficiales para evaluar equivalencias.</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>

  <!-- SIDEBAR -->
  <div class="sidebar">
    <div class="nayeli-cta">
      <div class="nayeli-cta-icon">🇵🇷</div>
      <div class="nayeli-cta-title">¿Tienes preguntas?</div>
      <div class="nayeli-cta-sub">Nayeli conoce todo sobre regresar a Puerto Rico. Pregúntale lo que necesites.</div>
      <a href="/#nayeli" class="nayeli-cta-btn">Hablar con Nayeli →</a>
    </div>

    <div class="sidebar-card" style="margin-top:1rem;">
      <div class="sidebar-title">Links Útiles PR</div>
      <a href="https://dtop.pr.gov" target="_blank" class="sidebar-link">DTOP — Licencias →</a>
      <a href="https://www.lumapr.com" target="_blank" class="sidebar-link">LUMA Energy →</a>
      <a href="https://www.acueductospr.com" target="_blank" class="sidebar-link">AAA — Agua →</a>
      <a href="https://hacienda.pr.gov" target="_blank" class="sidebar-link">Hacienda PR →</a>
      <a href="https://vitalrecords.pr.gov" target="_blank" class="sidebar-link">Registro Demográfico →</a>
      <a href="https://clasificadosonline.com" target="_blank" class="sidebar-link">Clasificados Online →</a>
      <a href="https://de.pr.gov" target="_blank" class="sidebar-link">Dpto. de Educación PR →</a>
    </div>

    <div class="sidebar-card">
      <div class="sidebar-title">También te puede interesar</div>
      <a href="/recursos" class="sidebar-link">Guía PR → USA →</a>
      <a href="/#directorio" class="sidebar-link">Directorio Boricua →</a>
      <a href="/#noticias" class="sidebar-link">Noticias de PR →</a>
    </div>

    <div class="sidebar-card">
      <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-4181903530685744" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </div>
  </div>
</div>

<!-- AD BOTTOM -->
<div class="ad-strip">
  <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-4181903530685744" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>

<!-- FOOTER -->
<footer class="pb-footer">
  <div class="pb-footer-main">
    <div>
      <div style="font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:800;color:#111;margin-bottom:0.3rem;">🇵🇷 Planeta Boricua</div>
      <div style="font-size:0.72rem;color:#666;margin-bottom:1rem;">Más Boricua Que Un Mofongo</div>
      <div style="display:flex;gap:0.8rem;">
        <a href="https://www.tiktok.com/@planetaboricua4" target="_blank" style="font-size:0.8rem;color:#CE1126;text-decoration:none;">📱 TikTok</a>
        <a href="https://www.instagram.com/miplanetaboricua" target="_blank" style="font-size:0.8rem;color:#CE1126;text-decoration:none;">📸 IG</a>
        <a href="https://www.facebook.com/elplanetaboricua" target="_blank" style="font-size:0.8rem;color:#CE1126;text-decoration:none;">👍 FB</a>
      </div>
    </div>
    <div class="pb-footer-col">
      <h4>Portal</h4>
      <a href="/">Inicio</a>
      <a href="/#noticias">Noticias</a>
      <a href="/#directorio">Directorio Boricua</a>
      <a href="/recursos">Recursos PR↔USA</a>
      <a href="/regresar-a-pr">Regresar a PR</a>
    </div>
    <div class="pb-footer-col">
      <h4>Comunidad</h4>
      <a href="/#directorio">Añadir Mi Negocio</a>
      <a href="/#newsletter">Newsletter</a>
      <a href="mailto:connect@ivamarai.com">Contacto</a>
    </div>
    <div class="pb-footer-col">
      <h4>Legal</h4>
      <a href="/privacidad-boricua">Privacidad</a>
      <a href="/terminos-boricua">Términos</a>
      <a href="/afiliados-boricua">Aviso de Afiliados</a>
    </div>
  </div>
  <div class="pb-footer-bottom">
    <div class="pb-footer-copy">© 2026 Planeta Boricua · masboricuaqueunmofongo.com · Todos los derechos reservados</div>
    <div class="pb-footer-ivamar">Un producto de <a href="https://ivamarai.com" target="_blank">Ivamar AI LLC</a></div>
  </div>
</footer>

<script>
function showSection(id) {
  document.querySelectorAll('.resource-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('section-' + id).classList.add('active');
  event.target.classList.add('active');
}
</script>

</body>
</html>
`;
