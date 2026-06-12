module.exports = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Centro de Recursos Boricua — Tu Guía PR ↔ USA | Planeta Boricua</title>
<meta name="description" content="Guía completa para boricuas que se mudan entre Puerto Rico y Estados Unidos. Licencias, mudanzas, escuelas, servicios públicos, bancos y más.">
<meta name="keywords" content="mudarse de Puerto Rico a Florida, licencia de conducir Puerto Rico a USA, recursos boricuas, mudanza PR USA, boricuas diáspora, seguro médico Puerto Rico, banco Puerto Rico USA, escuelas Puerto Rico">
<meta name="author" content="Planeta Boricua — Ivamar AI LLC">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://www.masboricuaqueunmofongo.com/recursos">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.masboricuaqueunmofongo.com/recursos">
<meta property="og:title" content="Centro de Recursos Boricua — Guía Completa PR ↔ USA">
<meta property="og:description" content="Guía completa para boricuas que se mudan entre Puerto Rico y Estados Unidos. Licencias, mudanzas, escuelas, servicios públicos, bancos y más.">
<meta property="og:image" content="https://www.masboricuaqueunmofongo.com/img/og-planetaboricua.jpg">
<meta property="og:locale" content="es_PR">
<meta property="og:site_name" content="Planeta Boricua">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Centro de Recursos Boricua — Guía Completa PR ↔ USA">
<meta name="twitter:description" content="Licencias de conducir por estado, mudanzas PR↔USA, escuelas, seguros médicos, bancos y crédito — todo en español boricua.">
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
.nav-flag{font-size:1.6rem;}
.nav-logo-text{font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:800;color:var(--dark);line-height:1;}
.nav-logo-sub{font-size:0.58rem;color:var(--mid);text-transform:uppercase;letter-spacing:0.08em;margin-top:0.1rem;}
.nav-back{font-size:0.78rem;color:var(--red);text-decoration:none;font-weight:600;display:flex;align-items:center;gap:0.4rem;}
.nav-back:hover{text-decoration:underline;}

/* HERO */
.page-hero{background:linear-gradient(135deg,var(--blue),#001a4d);padding:3rem 2rem;text-align:center;}
.page-hero-inner{max-width:800px;margin:0 auto;}
.page-hero-eyebrow{font-size:0.65rem;font-weight:800;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:0.8rem;}
.page-hero h1{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,3rem);font-weight:800;color:#fff;line-height:1.2;margin-bottom:1rem;}
.page-hero h1 em{color:#f5c842;font-style:italic;}
.page-hero p{font-size:0.95rem;color:rgba(255,255,255,0.65);line-height:1.8;margin-bottom:2rem;max-width:560px;margin-left:auto;margin-right:auto;}

/* DIRECTION TOGGLE */
.direction-toggle{display:inline-flex;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:8px;overflow:hidden;margin-bottom:1rem;}
.dir-btn{padding:0.7rem 1.5rem;font-size:0.85rem;font-weight:700;cursor:pointer;transition:all 0.2s;border:none;background:transparent;color:rgba(255,255,255,0.6);font-family:'Inter',sans-serif;}
.dir-btn.active{background:var(--red);color:#fff;}
.dir-label{font-size:0.75rem;color:rgba(255,255,255,0.4);margin-top:0.5rem;}

/* CATEGORY TABS */
.cat-tabs{background:var(--white);border-bottom:1px solid var(--border);position:sticky;top:64px;z-index:90;}
.cat-tabs-inner{max-width:1200px;margin:0 auto;padding:0 2rem;display:flex;gap:0;overflow-x:auto;}
.cat-tab{padding:1rem 1.2rem;font-size:0.78rem;font-weight:600;color:var(--mid);text-decoration:none;white-space:nowrap;border-bottom:3px solid transparent;transition:all 0.2s;cursor:pointer;display:flex;align-items:center;gap:0.4rem;background:transparent;border-left:none;border-right:none;border-top:none;font-family:'Inter',sans-serif;}
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

/* DIRECTION PANELS */
.direction-panels{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:2rem;}
.dir-panel{background:var(--white);border-radius:8px;border:1px solid var(--border);overflow:hidden;}
.dir-panel-header{padding:1rem 1.2rem;display:flex;align-items:center;gap:0.8rem;border-bottom:1px solid var(--border);}
.dir-panel-header.pr-usa{background:#fff5f5;border-bottom-color:#fdd;}
.dir-panel-header.usa-pr{background:#f0f4ff;border-bottom-color:#dde4ff;}
.dir-panel-icon{font-size:1.4rem;}
.dir-panel-title{font-weight:700;font-size:0.88rem;color:var(--dark);}
.dir-panel-sub{font-size:0.7rem;color:var(--mid);}
.dir-panel-body{padding:1.2rem;}

/* STEPS */
.steps-list{list-style:none;display:flex;flex-direction:column;gap:1rem;}
.step-item{display:flex;gap:1rem;align-items:flex-start;}
.step-num{width:28px;height:28px;background:var(--red);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.72rem;font-weight:800;flex-shrink:0;margin-top:1px;}
.step-content{}
.step-title{font-weight:700;font-size:0.85rem;color:var(--dark);margin-bottom:0.2rem;}
.step-desc{font-size:0.78rem;color:var(--mid);line-height:1.5;}
.step-note{font-size:0.72rem;color:var(--green);font-weight:600;margin-top:0.2rem;}

/* DOCS CHECKLIST */
.docs-card{background:var(--white);border-radius:8px;border:1px solid var(--border);padding:1.2rem;margin-bottom:1.5rem;}
.docs-card-title{font-weight:700;font-size:0.85rem;color:var(--dark);margin-bottom:0.8rem;display:flex;align-items:center;gap:0.5rem;}
.docs-list{list-style:none;display:flex;flex-direction:column;gap:0.5rem;}
.docs-list li{display:flex;align-items:flex-start;gap:0.6rem;font-size:0.8rem;color:#444;line-height:1.4;}
.docs-list li::before{content:'✓';color:var(--green);font-weight:800;flex-shrink:0;}
.docs-list li.warning::before{content:'⚠';color:#f57c00;}
.docs-list li.warning{color:#f57c00;}

/* STATE CARDS */
.states-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1rem;margin-top:1rem;}
.state-card{background:var(--white);border:1px solid var(--border);border-radius:8px;overflow:hidden;transition:box-shadow 0.2s;}
.state-card:hover{box-shadow:0 4px 16px rgba(0,0,0,0.08);}
.state-card-header{padding:0.8rem 1rem;background:#f8f8f5;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;}
.state-name{font-weight:800;font-size:0.88rem;color:var(--dark);}
.state-flag{font-size:1.2rem;}
.state-card-body{padding:1rem;}
.state-detail{font-size:0.78rem;color:#444;margin-bottom:0.4rem;display:flex;gap:0.5rem;}
.state-detail strong{color:var(--dark);min-width:80px;}
.state-link{display:inline-flex;align-items:center;gap:0.3rem;font-size:0.72rem;font-weight:700;color:var(--red);text-decoration:none;margin-top:0.6rem;}
.state-link:hover{text-decoration:underline;}

/* INFO BOX */
.info-box{background:#e8f5e9;border:1px solid #a5d6a7;border-radius:8px;padding:1rem 1.2rem;margin-bottom:1.5rem;}
.info-box.warning{background:#fff8e1;border-color:#ffe082;}
.info-box.blue{background:#e3f2fd;border-color:#90caf9;}
.info-box-title{font-weight:700;font-size:0.82rem;color:var(--dark);margin-bottom:0.4rem;display:flex;align-items:center;gap:0.4rem;}
.info-box-text{font-size:0.78rem;color:#444;line-height:1.6;}

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
.nayeli-cta-btn{display:block;background:var(--red);color:#fff;padding:0.65rem;border-radius:4px;font-size:0.82rem;font-weight:700;text-decoration:none;transition:background 0.2s;}
.nayeli-cta-btn:hover{background:#a80e1f;}

/* COLABORA */
.colabora{background:var(--blue);padding:3rem 2rem;text-align:center;margin-top:2rem;}
.colabora-inner{max-width:600px;margin:0 auto;}
.colabora h2{font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:800;color:#fff;margin-bottom:0.8rem;}
.colabora h2 em{color:#f5c842;font-style:italic;}
.colabora p{font-size:0.88rem;color:rgba(255,255,255,0.65);line-height:1.7;margin-bottom:1.5rem;}
.colabora-form{display:flex;flex-direction:column;gap:0.8rem;max-width:480px;margin:0 auto;}
.colabora-input{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:4px;padding:0.8rem 1rem;color:#fff;font-size:0.85rem;outline:none;font-family:'Inter',sans-serif;}
.colabora-input::placeholder{color:rgba(255,255,255,0.3);}
.colabora-textarea{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:4px;padding:0.8rem 1rem;color:#fff;font-size:0.85rem;outline:none;font-family:'Inter',sans-serif;resize:vertical;min-height:100px;}
.colabora-textarea::placeholder{color:rgba(255,255,255,0.3);}
.colabora-btn{background:var(--red);color:#fff;border:none;border-radius:4px;padding:0.85rem;font-size:0.88rem;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;}
.colabora-btn:hover{background:#a80e1f;}

/* FOOTER */
.page-footer{background:var(--white);border-top:3px solid var(--red);padding:1.5rem 2rem;text-align:center;}
.page-footer-text{font-size:0.72rem;color:#999;}
.page-footer-text a{color:var(--red);text-decoration:none;}

/* AD */
.ad-strip{max-width:1200px;margin:0 auto;padding:1rem 2rem;text-align:center;}

@media(max-width:768px){
  .content{grid-template-columns:1fr;padding:1rem;}
  .direction-panels{grid-template-columns:1fr;}
  .states-grid{grid-template-columns:1fr;}
  .cat-tabs-inner{padding:0 1rem;}
  .page-hero{padding:2rem 1rem;}
  .sidebar{display:none;}
}
</style>
</head>
<body>

<!-- NAV -->
<nav>
  <div class="nav-top">
    <a href="/" class="nav-logo">
      <div class="nav-flag">🇵🇷</div>
      <div>
        <div class="nav-logo-text">Planeta Boricua</div>
        <div class="nav-logo-sub">Más Boricua Que Un Mofongo</div>
      </div>
    </a>
    <a href="/" class="nav-back">← Volver al portal</a>
  </div>
</nav>

<!-- PAGE HERO -->
<section class="page-hero">
  <div class="page-hero-inner">
    <div class="page-hero-eyebrow">Centro de Recursos</div>
    <h1>Tu Guía Completa<br><em>PR ↔ USA</em></h1>
    <p>Todo lo que necesitas saber para mudarte entre Puerto Rico y Estados Unidos — licencias, mudanzas, escuelas, servicios y más. Información verificada, en español boricua.</p>
  </div>
</section>

<!-- CATEGORY TABS -->
<div class="cat-tabs">
  <div class="cat-tabs-inner">
    <button class="cat-tab active" onclick="showSection('mudanzas')">🚚 Mudanzas</button>
    <button class="cat-tab" onclick="showSection('licencias')">🚗 Licencias</button>
    <button class="cat-tab" onclick="showSection('escuelas')">🏫 Escuelas</button>
    <button class="cat-tab" onclick="showSection('servicios')">💧 Servicios Públicos</button>
    <button class="cat-tab" onclick="showSection('salud')">🏥 Salud</button>
    <button class="cat-tab" onclick="showSection('bancos')">🏦 Bancos</button>
    <button class="cat-tab" onclick="showSection('gobierno')">🏛️ Gobierno</button>
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

    <!-- MUDANZAS -->
    <div class="resource-section active" id="section-mudanzas">
      <div class="resource-header">
        <h2 class="resource-title">🚚 Mudanzas PR ↔ USA</h2>
        <p class="resource-sub">Todo lo que necesitas saber antes de hacer la mudanza — documentos, empresas navieras, envío de vehículos y checklist completo.</p>
      </div>

      <div class="direction-panels">
        <div class="dir-panel">
          <div class="dir-panel-header pr-usa">
            <div class="dir-panel-icon">🇵🇷→🇺🇸</div>
            <div>
              <div class="dir-panel-title">Me voy de PR a USA</div>
              <div class="dir-panel-sub">Pasos para mudarte a los estados</div>
            </div>
          </div>
          <div class="dir-panel-body">
            <ul class="steps-list">
              <li class="step-item">
                <div class="step-num">1</div>
                <div class="step-content">
                  <div class="step-title">Consigue una dirección en USA</div>
                  <div class="step-desc">Necesitas una dirección física antes de llegar — familiar, amigo, o apartamento ya rentado. Muchos trámites la requieren.</div>
                </div>
              </li>
              <li class="step-item">
                <div class="step-num">2</div>
                <div class="step-content">
                  <div class="step-title">Contratar naviera para tus muebles</div>
                  <div class="step-desc">Crowley y TOTE Maritime son las principales. Envían desde San Juan a Jacksonville, FL o Eddystone, PA. Tiempo: 3-5 días.</div>
                  <div class="step-note">💡 Crowley: (904) 727-2200 · crowley.com</div>
                </div>
              </li>
              <li class="step-item">
                <div class="step-num">3</div>
                <div class="step-content">
                  <div class="step-title">Enviar tu vehículo</div>
                  <div class="step-desc">Necesitas título limpio, seguro activo, y certificado de no deudas del DTOP. Puerto de salida: San Juan. Puerto de llegada: Jacksonville o Eddystone.</div>
                </div>
              </li>
              <li class="step-item">
                <div class="step-num">4</div>
                <div class="step-content">
                  <div class="step-title">Actualizar dirección postal</div>
                  <div class="step-desc">Notifica al USPS en usps.com. También actualiza: banco, seguro médico, Social Security, IRS y tarjetas de crédito.</div>
                </div>
              </li>
              <li class="step-item">
                <div class="step-num">5</div>
                <div class="step-content">
                  <div class="step-title">Impuestos — ¡importante!</div>
                  <div class="step-desc">Al mudarte de PR a USA, dejas de aplicar bajo las leyes de Hacienda PR y comienzas a tributar al IRS federal. Consulta un contador.</div>
                  <div class="step-note">⚠ Hay implicaciones fiscales significativas al cambiar residencia</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="dir-panel">
          <div class="dir-panel-header usa-pr">
            <div class="dir-panel-icon">🇺🇸→🇵🇷</div>
            <div>
              <div class="dir-panel-title">Regreso a Puerto Rico</div>
              <div class="dir-panel-sub">Pasos para regresar a la isla</div>
            </div>
          </div>
          <div class="dir-panel-body">
            <ul class="steps-list">
              <li class="step-item">
                <div class="step-num">1</div>
                <div class="step-content">
                  <div class="step-title">Asegurar vivienda en PR</div>
                  <div class="step-desc">Renta o compra antes de llegar. El mercado de vivienda en PR ha cambiado — los precios subieron significativamente después del huracán María.</div>
                </div>
              </li>
              <li class="step-item">
                <div class="step-num">2</div>
                <div class="step-content">
                  <div class="step-title">Enviar tus pertenencias</div>
                  <div class="step-desc">Crowley y TOTE van desde Jacksonville o Eddystone hacia San Juan. También puedes usar servicios de moving terrestre hasta Florida y luego naviera.</div>
                  <div class="step-note">💡 TOTE Maritime: (904) 855-0500 · totemaritime.com</div>
                </div>
              </li>
              <li class="step-item">
                <div class="step-num">3</div>
                <div class="step-content">
                  <div class="step-title">Registrar vehículo en DTOP</div>
                  <div class="step-desc">Tienes 90 días para registrar tu vehículo en PR. Necesitas: título, inspección, seguro de PR y pago de arbitrios si el auto es de fuera.</div>
                  <div class="step-note">💡 DTOP: (787) 294-0101 · dtop.pr.gov</div>
                </div>
              </li>
              <li class="step-item">
                <div class="step-num">4</div>
                <div class="step-content">
                  <div class="step-title">Actualizar dirección</div>
                  <div class="step-desc">Notifica al Social Security, IRS, tu banco y seguros. Si recibes beneficios federales, asegúrate que sigan activos en PR.</div>
                </div>
              </li>
              <li class="step-item">
                <div class="step-num">5</div>
                <div class="step-content">
                  <div class="step-title">Ventajas fiscales de regresar</div>
                  <div class="step-desc">Al establecer residencia en PR puedes beneficiarte de las Leyes 60, 22 y otras. Consulta un contador especializado en tributación de PR.</div>
                  <div class="step-note">💡 Posibles beneficios fiscales significativos</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="info-box">
        <div class="info-box-title">💡 ¿Sabías esto?</div>
        <div class="info-box-text">No necesitas pasaporte para viajar entre Puerto Rico y los estados continentales. Es un vuelo doméstico. Solo necesitas una identificación válida con REAL ID o pasaporte americano para pasar seguridad del aeropuerto.</div>
      </div>
    </div>

    <!-- LICENCIAS -->
    <div class="resource-section" id="section-licencias">
      <div class="resource-header">
        <h2 class="resource-title">🚗 Licencia de Conducir PR ↔ USA</h2>
        <p class="resource-sub">Cómo canjear tu licencia de Puerto Rico en los estados y cómo obtener la licencia de PR al regresar.</p>
      </div>

      <div class="info-box blue">
        <div class="info-box-title">📋 Lo básico que debes saber</div>
        <div class="info-box-text">La licencia de PR es válida en todos los estados. Al establecer residencia en un estado, generalmente tienes 30-90 días para canjearla. Necesitarás documentos REAL ID — todos los estados lo requieren desde 2025.</div>
      </div>

      <h3 style="font-family:'Playfair Display',serif;font-size:1.1rem;margin-bottom:1rem;color:var(--dark);">🇵🇷→🇺🇸 Canjear licencia PR en los estados principales</h3>

      <div class="docs-card">
        <div class="docs-card-title">📄 Documentos REAL ID requeridos en todos los estados</div>
        <ul class="docs-list">
          <li>Prueba de identidad: Pasaporte americano O acta de nacimiento (de PR debe ser emitida después del 1 de julio de 2010)</li>
          <li>Número de Social Security (tarjeta original o documento que lo muestre)</li>
          <li>Prueba de residencia en el nuevo estado (2 documentos — factura de luz, banco, contrato de renta)</li>
          <li>Tu licencia de conducir de Puerto Rico (original)</li>
          <li class="warning">Actas de nacimiento de PR emitidas ANTES del 1 de julio de 2010 NO son aceptadas — solicita una nueva en vitalrecords.pr.gov</li>
        </ul>
      </div>

      <div class="states-grid">
        <div class="state-card">
          <div class="state-card-header">
            <span class="state-name">Florida</span>
            <span class="state-flag">🌴</span>
          </div>
          <div class="state-card-body">
            <div class="state-detail"><strong>Plazo:</strong> 30 días de establecer residencia</div>
            <div class="state-detail"><strong>Costo:</strong> $48 aprox.</div>
            <div class="state-detail"><strong>Cita:</strong> Requerida en línea</div>
            <div class="state-detail"><strong>Agencia:</strong> DHSMV / Tax Collector</div>
            <a href="https://www.flhsmv.gov" target="_blank" class="state-link">flhsmv.gov →</a>
          </div>
        </div>
        <div class="state-card">
          <div class="state-card-header">
            <span class="state-name">New York</span>
            <span class="state-flag">🗽</span>
          </div>
          <div class="state-card-body">
            <div class="state-detail"><strong>Plazo:</strong> 30 días de establecer residencia</div>
            <div class="state-detail"><strong>Costo:</strong> $64.50 aprox.</div>
            <div class="state-detail"><strong>Cita:</strong> DMV — walk-in o cita</div>
            <div class="state-detail"><strong>Agencia:</strong> NY DMV</div>
            <a href="https://dmv.ny.gov" target="_blank" class="state-link">dmv.ny.gov →</a>
          </div>
        </div>
        <div class="state-card">
          <div class="state-card-header">
            <span class="state-name">Texas</span>
            <span class="state-flag">⭐</span>
          </div>
          <div class="state-card-body">
            <div class="state-detail"><strong>Plazo:</strong> 90 días de establecer residencia</div>
            <div class="state-detail"><strong>Costo:</strong> $33 aprox.</div>
            <div class="state-detail"><strong>Cita:</strong> Requerida — DPS</div>
            <div class="state-detail"><strong>Agencia:</strong> TX DPS</div>
            <a href="https://www.dps.texas.gov" target="_blank" class="state-link">dps.texas.gov →</a>
          </div>
        </div>
        <div class="state-card">
          <div class="state-card-header">
            <span class="state-name">Illinois</span>
            <span class="state-flag">🌆</span>
          </div>
          <div class="state-card-body">
            <div class="state-detail"><strong>Plazo:</strong> 90 días de establecer residencia</div>
            <div class="state-detail"><strong>Costo:</strong> $30 aprox.</div>
            <div class="state-detail"><strong>Cita:</strong> Requerida — SOS</div>
            <div class="state-detail"><strong>Agencia:</strong> IL Secretary of State</div>
            <a href="https://www.ilsos.gov" target="_blank" class="state-link">ilsos.gov →</a>
          </div>
        </div>
        <div class="state-card">
          <div class="state-card-header">
            <span class="state-name">Connecticut</span>
            <span class="state-flag">🏛️</span>
          </div>
          <div class="state-card-body">
            <div class="state-detail"><strong>Plazo:</strong> 60 días de establecer residencia</div>
            <div class="state-detail"><strong>Costo:</strong> $72 aprox.</div>
            <div class="state-detail"><strong>Cita:</strong> DMV — cita requerida</div>
            <div class="state-detail"><strong>Agencia:</strong> CT DMV</div>
            <a href="https://portal.ct.gov/DMV" target="_blank" class="state-link">portal.ct.gov/DMV →</a>
          </div>
        </div>
        <div class="state-card">
          <div class="state-card-header">
            <span class="state-name">New Jersey</span>
            <span class="state-flag">🌿</span>
          </div>
          <div class="state-card-body">
            <div class="state-detail"><strong>Plazo:</strong> 60 días de establecer residencia</div>
            <div class="state-detail"><strong>Costo:</strong> $24 aprox.</div>
            <div class="state-detail"><strong>Cita:</strong> MVC — cita requerida</div>
            <div class="state-detail"><strong>Agencia:</strong> NJ MVC</div>
            <a href="https://www.nj.gov/mvc" target="_blank" class="state-link">nj.gov/mvc →</a>
          </div>
        </div>
      </div>

      <div style="margin-top:2rem;">
        <h3 style="font-family:'Playfair Display',serif;font-size:1.1rem;margin-bottom:1rem;color:var(--dark);">🇺🇸→🇵🇷 Obtener licencia de PR al regresar</h3>
        <div class="dir-panel">
          <div class="dir-panel-header usa-pr">
            <div class="dir-panel-icon">🇺🇸→🇵🇷</div>
            <div>
              <div class="dir-panel-title">Canjear licencia de USA en DTOP</div>
              <div class="dir-panel-sub">Departamento de Transportación y Obras Públicas</div>
            </div>
          </div>
          <div class="dir-panel-body">
            <ul class="steps-list">
              <li class="step-item">
                <div class="step-num">1</div>
                <div class="step-content">
                  <div class="step-title">Documentos necesarios</div>
                  <div class="step-desc">Licencia de conducir del estado, acta de nacimiento, tarjeta de Social Security, prueba de residencia en PR (dos documentos)</div>
                </div>
              </li>
              <li class="step-item">
                <div class="step-num">2</div>
                <div class="step-content">
                  <div class="step-title">Sacar cita en DTOP</div>
                  <div class="step-desc">El DTOP requiere cita previa. Puedes sacarla en dtop.pr.gov o llamar al (787) 294-0101.</div>
                  <div class="step-note">💡 Las citas se agotan rápido — sácala con anticipación</div>
                </div>
              </li>
              <li class="step-item">
                <div class="step-num">3</div>
                <div class="step-content">
                  <div class="step-title">Examen de conocimiento</div>
                  <div class="step-desc">Puede que tengas que tomar el examen de conocimiento del tránsito de PR. Prepárate con el manual oficial del DTOP.</div>
                </div>
              </li>
              <li class="step-item">
                <div class="step-num">4</div>
                <div class="step-content">
                  <div class="step-title">Costo aproximado</div>
                  <div class="step-desc">Alrededor de $10-25 dependiendo del tipo de licencia. Acepta efectivo y tarjeta.</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- ESCUELAS -->
    <div class="resource-section" id="section-escuelas">
      <div class="resource-header">
        <h2 class="resource-title">🏫 Escuelas y Educación</h2>
        <p class="resource-sub">Cómo matricular a tus hijos en escuelas en USA o en PR, transferencia de créditos y equivalencias.</p>
      </div>
      <div class="direction-panels">
        <div class="dir-panel">
          <div class="dir-panel-header pr-usa">
            <div class="dir-panel-icon">🇵🇷→🇺🇸</div>
            <div>
              <div class="dir-panel-title">Matricular en escuelas de USA</div>
              <div class="dir-panel-sub">Kinder a 12vo grado</div>
            </div>
          </div>
          <div class="dir-panel-body">
            <ul class="steps-list">
              <li class="step-item">
                <div class="step-num">1</div>
                <div class="step-content">
                  <div class="step-title">Documentos requeridos</div>
                  <div class="step-desc">Acta de nacimiento, récord de vacunas, transcripción escolar de PR (en inglés o con traducción), prueba de residencia en el distrito.</div>
                </div>
              </li>
              <li class="step-item">
                <div class="step-num">2</div>
                <div class="step-content">
                  <div class="step-title">Evaluación de inglés (ESL)</div>
                  <div class="step-desc">La mayoría de los distritos evalúan el nivel de inglés. Si el estudiante necesita apoyo, lo asignan a clases ESL sin costo adicional.</div>
                </div>
              </li>
              <li class="step-item">
                <div class="step-num">3</div>
                <div class="step-content">
                  <div class="step-title">Transcripción de PR</div>
                  <div class="step-desc">Solicita el récord académico al Departamento de Educación de PR antes de salir. Portal: de.pr.gov · Tel: (787) 759-2000</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="dir-panel">
          <div class="dir-panel-header usa-pr">
            <div class="dir-panel-icon">🇺🇸→🇵🇷</div>
            <div>
              <div class="dir-panel-title">Matricular en escuelas de PR</div>
              <div class="dir-panel-sub">Departamento de Educación PR</div>
            </div>
          </div>
          <div class="dir-panel-body">
            <ul class="steps-list">
              <li class="step-item">
                <div class="step-num">1</div>
                <div class="step-content">
                  <div class="step-title">Documentos requeridos</div>
                  <div class="step-desc">Acta de nacimiento, récord de vacunas, transcripción escolar del estado (con traducción al español si es necesario), prueba de residencia en PR.</div>
                </div>
              </li>
              <li class="step-item">
                <div class="step-num">2</div>
                <div class="step-content">
                  <div class="step-title">Proceso de matrícula</div>
                  <div class="step-desc">Visita la escuela del distrito donde vas a vivir. El Departamento de Educación de PR asigna la escuela por zona residencial.</div>
                  <div class="step-note">💡 DE PR: (787) 759-2000 · de.pr.gov</div>
                </div>
              </li>
              <li class="step-item">
                <div class="step-num">3</div>
                <div class="step-content">
                  <div class="step-title">Equivalencias de grados</div>
                  <div class="step-desc">Los grados son equivalentes. Si el niño venía en 5to grado en USA, entra en 5to en PR. La evaluación es por edad y grado completado.</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- SERVICIOS PÚBLICOS -->
    <div class="resource-section" id="section-servicios">
      <div class="resource-header">
        <h2 class="resource-title">💧 Servicios Públicos en PR</h2>
        <p class="resource-sub">Cómo solicitar agua, luz y otros servicios al llegar o regresar a Puerto Rico.</p>
      </div>
      <div class="info-box">
        <div class="info-box-title">💡 Al llegar a Puerto Rico</div>
        <div class="info-box-text">Los servicios de agua y luz en PR son manejados por la AAA y LUMA Energy respectivamente. Ambos requieren que el titular del contrato sea el dueño o arrendatario del inmueble.</div>
      </div>
      <div class="states-grid">
        <div class="state-card">
          <div class="state-card-header">
            <span class="state-name">💧 Agua — AAA</span>
          </div>
          <div class="state-card-body">
            <div class="state-detail"><strong>Agencia:</strong> Autoridad de Acueductos y Alcantarillados</div>
            <div class="state-detail"><strong>Teléfono:</strong> (787) 620-2277</div>
            <div class="state-detail"><strong>Documentos:</strong> Escritura o contrato de renta + ID</div>
            <div class="state-detail"><strong>Proceso:</strong> En persona o en línea</div>
            <a href="https://www.acueductospr.com" target="_blank" class="state-link">acueductospr.com →</a>
          </div>
        </div>
        <div class="state-card">
          <div class="state-card-header">
            <span class="state-name">⚡ Luz — LUMA Energy</span>
          </div>
          <div class="state-card-body">
            <div class="state-detail"><strong>Agencia:</strong> LUMA Energy</div>
            <div class="state-detail"><strong>Teléfono:</strong> (787) 521-1028</div>
            <div class="state-detail"><strong>Documentos:</strong> Escritura o contrato de renta + ID + NIM del medidor</div>
            <div class="state-detail"><strong>Proceso:</strong> En línea preferiblemente</div>
            <a href="https://www.lumapr.com" target="_blank" class="state-link">lumapr.com →</a>
          </div>
        </div>
        <div class="state-card">
          <div class="state-card-header">
            <span class="state-name">📶 Internet / Cable</span>
          </div>
          <div class="state-card-body">
            <div class="state-detail"><strong>Liberty PR:</strong> (787) 355-2222</div>
            <div class="state-detail"><strong>Claro PR:</strong> (787) 792-3000</div>
            <div class="state-detail"><strong>Choice Cable:</strong> (787) 751-6200</div>
            <div class="state-detail"><strong>Proceso:</strong> Por teléfono o en línea</div>
          </div>
        </div>
      </div>
    </div>

    <!-- SALUD -->
    <div class="resource-section" id="section-salud">
      <div class="resource-header">
        <h2 class="resource-title">🏥 Salud y Seguros Médicos</h2>
        <p class="resource-sub">Cómo transferir tu seguro médico, hospitales principales en PR y cómo conseguir cobertura al llegar a los estados.</p>
      </div>

      <div class="info-box warning">
        <div class="info-box-title">⚠ Importante — Mudanza activa un Período Especial de Inscripción</div>
        <div class="info-box-text">Mudarte a un nuevo estado o a PR activa un Período Especial de Inscripción (SEP) de 60 días. Puedes cambiar o inscribirte en un nuevo seguro médico aunque no sea temporada de inscripción abierta. No pierdas ese plazo.</div>
      </div>

      <div class="direction-panels">
        <div class="dir-panel">
          <div class="dir-panel-header pr-usa">
            <div class="dir-panel-icon">🇵🇷→🇺🇸</div>
            <div>
              <div class="dir-panel-title">Seguro médico al llegar a USA</div>
              <div class="dir-panel-sub">Opciones y pasos</div>
            </div>
          </div>
          <div class="dir-panel-body">
            <ul class="steps-list">
              <li class="step-item">
                <div class="step-num">1</div>
                <div class="step-content">
                  <div class="step-title">Si tienes trabajo con beneficios</div>
                  <div class="step-desc">Tu empleador puede ofrecerte seguro médico. Puede haber un período de espera de hasta 90 días. Mientras tanto, considera COBRA o el Mercado de Salud.</div>
                </div>
              </li>
              <li class="step-item">
                <div class="step-num">2</div>
                <div class="step-content">
                  <div class="step-title">Healthcare.gov — Mercado de Seguros</div>
                  <div class="step-desc">La mudanza activa un SEP de 60 días. Entra a healthcare.gov o llama al 1-800-318-2596 (en español disponible). Puedes calificar para subsidios según tu ingreso.</div>
                  <div class="step-note">💡 healthcare.gov · 1-800-318-2596</div>
                </div>
              </li>
              <li class="step-item">
                <div class="step-num">3</div>
                <div class="step-content">
                  <div class="step-title">Medicaid — seguro gratis o bajo costo</div>
                  <div class="step-desc">Si tu ingreso es bajo, puedes calificar para Medicaid. Cada estado tiene su propio programa. En Florida se llama Florida Medicaid · 1-877-711-3662.</div>
                </div>
              </li>
              <li class="step-item">
                <div class="step-num">4</div>
                <div class="step-content">
                  <div class="step-title">COBRA — continuar tu seguro de PR</div>
                  <div class="step-desc">Si tenías seguro de empleador en PR, puedes continuar esa cobertura por hasta 18 meses bajo COBRA. Tienes 60 días para decidir. Es caro pero te cubre mientras consigues otro.</div>
                </div>
              </li>
              <li class="step-item">
                <div class="step-num">5</div>
                <div class="step-content">
                  <div class="step-title">Transferir récords médicos</div>
                  <div class="step-desc">Solicita copias de tus récords médicos antes de salir de PR. Los hospitales y médicos están obligados a dártelos. Pide también récords de vacunas para toda la familia.</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="dir-panel">
          <div class="dir-panel-header usa-pr">
            <div class="dir-panel-icon">🇺🇸→🇵🇷</div>
            <div>
              <div class="dir-panel-title">Seguro médico al regresar a PR</div>
              <div class="dir-panel-sub">Opciones en la isla</div>
            </div>
          </div>
          <div class="dir-panel-body">
            <ul class="steps-list">
              <li class="step-item">
                <div class="step-num">1</div>
                <div class="step-content">
                  <div class="step-title">Mi Salud — Medicaid de PR</div>
                  <div class="step-desc">Si calificas por ingreso, puedes inscribirte en Mi Salud, el programa de Medicaid de PR. Cubre servicios médicos básicos sin costo o con copago mínimo.</div>
                  <div class="step-note">💡 Mi Salud: (787) 765-2929</div>
                </div>
              </li>
              <li class="step-item">
                <div class="step-num">2</div>
                <div class="step-content">
                  <div class="step-title">Seguros privados en PR</div>
                  <div class="step-desc">Triple-S, MCS, First Medical y Humana operan en PR. Compara planes en tu trabajo o directamente con cada aseguradora.</div>
                </div>
              </li>
              <li class="step-item">
                <div class="step-num">3</div>
                <div class="step-content">
                  <div class="step-title">Medicare en PR — diferente a USA</div>
                  <div class="step-desc">Medicare en PR tiene cobertura diferente. Medicare Part A (hospital) aplica igual, pero Part B (médico) y Part D (recetas) tienen diferencias importantes. Llama a Medicare para actualizar tu dirección.</div>
                  <div class="step-note">💡 Medicare: 1-800-633-4227</div>
                </div>
              </li>
              <li class="step-item">
                <div class="step-num">4</div>
                <div class="step-content">
                  <div class="step-title">Hospitales principales en PR</div>
                  <div class="step-desc">Centro Médico (787) 777-3535 · Hospital Auxilio Mutuo (787) 758-2000 · Ashford Presbyterian (787) 721-2160 · HIMA San Pablo (787) 653-3434</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- BANCOS -->
    <div class="resource-section" id="section-bancos">
      <div class="resource-header">
        <h2 class="resource-title">🏦 Bancos y Finanzas</h2>
        <p class="resource-sub">Bancos que operan en PR y USA, cómo construir crédito al llegar a los estados, y cómo manejar tus finanzas en la transición.</p>
      </div>

      <div class="info-box blue">
        <div class="info-box-title">💡 La ventaja de los bancos que operan en ambos</div>
        <div class="info-box-text">Banco Popular y Oriental Bank tienen presencia en PR y en estados como Florida y Nueva York. Puedes mantener tu cuenta y simplemente actualizar tu dirección sin abrir una cuenta nueva.</div>
      </div>

      <div class="direction-panels">
        <div class="dir-panel">
          <div class="dir-panel-header pr-usa">
            <div class="dir-panel-icon">🇵🇷→🇺🇸</div>
            <div>
              <div class="dir-panel-title">Finanzas al llegar a USA</div>
              <div class="dir-panel-sub">Crédito, bancos y más</div>
            </div>
          </div>
          <div class="dir-panel-body">
            <ul class="steps-list">
              <li class="step-item">
                <div class="step-num">1</div>
                <div class="step-content">
                  <div class="step-title">El problema del crédito al llegar</div>
                  <div class="step-desc">Aunque vengas de PR con historial de crédito, el sistema de crédito de USA no lo reconoce. Comienzas desde cero — sin score, es difícil rentar apartamento, conseguir auto o tarjeta de crédito.</div>
                </div>
              </li>
              <li class="step-item">
                <div class="step-num">2</div>
                <div class="step-content">
                  <div class="step-title">Abre una cuenta bancaria primero</div>
                  <div class="step-desc">Bank of America, Wells Fargo o Banco Popular en Florida aceptan tu ID de PR y Social Security. Sin cuenta bancaria es casi imposible construir crédito.</div>
                </div>
              </li>
              <li class="step-item">
                <div class="step-num">3</div>
                <div class="step-content">
                  <div class="step-title">Tarjeta de crédito asegurada (secured card)</div>
                  <div class="step-desc">Das un depósito de $200-500 que se convierte en tu límite. Discover it Secured y Capital One Secured son las mejores para empezar. Úsala para compras pequeñas y paga el balance completo cada mes.</div>
                  <div class="step-note">💡 En 6-12 meses puedes tener score de 650+</div>
                </div>
              </li>
              <li class="step-item">
                <div class="step-num">4</div>
                <div class="step-content">
                  <div class="step-title">Experian Boost — sube el score gratis</div>
                  <div class="step-desc">Conecta tu cuenta bancaria a Experian Boost. Agrega pagos de Netflix, Spotify, teléfono y luz a tu historial. Puede subir tu score 10-20 puntos inmediatamente.</div>
                  <div class="step-note">💡 experian.com/boost — completamente gratis</div>
                </div>
              </li>
              <li class="step-item">
                <div class="step-num">5</div>
                <div class="step-content">
                  <div class="step-title">Lo que NUNCA debes hacer</div>
                  <div class="step-desc">Pagar tarde (baja el score 50-100 puntos y queda 7 años en el historial). Usar más del 30% de tu límite. Cerrar tarjetas viejas. Solicitar muchas tarjetas a la vez.</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="dir-panel">
          <div class="dir-panel-header usa-pr">
            <div class="dir-panel-icon">🇺🇸→🇵🇷</div>
            <div>
              <div class="dir-panel-title">Finanzas al regresar a PR</div>
              <div class="dir-panel-sub">Bancos y transferencias</div>
            </div>
          </div>
          <div class="dir-panel-body">
            <ul class="steps-list">
              <li class="step-item">
                <div class="step-num">1</div>
                <div class="step-content">
                  <div class="step-title">Mantén tu cuenta en USA</div>
                  <div class="step-desc">No cierres tu cuenta bancaria en USA al regresar. Es útil para compras en línea, recibir pagos de trabajo remoto y transferencias. Solo actualiza la dirección.</div>
                </div>
              </li>
              <li class="step-item">
                <div class="step-num">2</div>
                <div class="step-content">
                  <div class="step-title">Banco Popular — el puente ideal</div>
                  <div class="step-desc">Banco Popular opera en PR, Florida, Nueva York y otros estados. Puedes tener cuentas en ambos lados y transferir dinero sin cargo entre ellas.</div>
                  <div class="step-note">💡 popular.com · PR: (787) 724-3659</div>
                </div>
              </li>
              <li class="step-item">
                <div class="step-num">3</div>
                <div class="step-content">
                  <div class="step-title">Envío de dinero PR ↔ USA</div>
                  <div class="step-desc">Wise es la opción más económica para transferencias internacionales. Zelle funciona entre bancos que lo soportan en ambos lados. ACH directo entre cuentas del mismo banco es gratis.</div>
                </div>
              </li>
              <li class="step-item">
                <div class="step-num">4</div>
                <div class="step-content">
                  <div class="step-title">Cooperativas de crédito en PR</div>
                  <div class="step-desc">Las cooperativas (credit unions) de PR son excelentes — tasas de interés más bajas que los bancos. CoopAmérica, CoopAEE y otras ofrecen préstamos personales y de auto a mejores tasas.</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="states-grid" style="margin-top:1.5rem;">
        <div class="state-card">
          <div class="state-card-header"><span class="state-name">🏦 Banco Popular</span></div>
          <div class="state-card-body">
            <div class="state-detail"><strong>PR:</strong> (787) 724-3659</div>
            <div class="state-detail"><strong>USA:</strong> 1-800-981-7700</div>
            <div class="state-detail"><strong>Estados:</strong> FL, NY, NJ, IL, CA, TX</div>
            <a href="https://www.popular.com" target="_blank" class="state-link">popular.com →</a>
          </div>
        </div>
        <div class="state-card">
          <div class="state-card-header"><span class="state-name">🏦 Oriental Bank</span></div>
          <div class="state-card-body">
            <div class="state-detail"><strong>PR:</strong> (787) 620-0000</div>
            <div class="state-detail"><strong>Estados:</strong> FL, NY</div>
            <a href="https://www.orientalbank.com" target="_blank" class="state-link">orientalbank.com →</a>
          </div>
        </div>
        <div class="state-card">
          <div class="state-card-header"><span class="state-name">💳 Tarjetas para empezar crédito</span></div>
          <div class="state-card-body">
            <div class="state-detail"><strong>Discover it Secured:</strong> Sin cargo anual</div>
            <div class="state-detail"><strong>Capital One Secured:</strong> Depósito desde $49</div>
            <div class="state-detail"><strong>Chime Credit Builder:</strong> Sin verificación</div>
          </div>
        </div>
      </div>
    </div>

    <!-- GOBIERNO -->
    <div class="resource-section" id="section-gobierno">
      <div class="resource-header">
        <h2 class="resource-title">🏛️ Gobierno y Documentos</h2>
        <p class="resource-sub">Contactos de agencias de gobierno en PR y USA para los trámites más comunes.</p>
      </div>
      <div class="states-grid">
        <div class="state-card">
          <div class="state-card-header"><span class="state-name">🇵🇷 Registro Demográfico PR</span></div>
          <div class="state-card-body">
            <div class="state-detail"><strong>Actas nacimiento:</strong> (787) 767-9120</div>
            <div class="state-detail"><strong>Portal:</strong> vitalrecords.pr.gov</div>
            <div class="state-detail"><strong>Nota:</strong> Solicita actas posteriores al 1 de julio de 2010 para REAL ID</div>
            <a href="https://vitalrecords.pr.gov" target="_blank" class="state-link">vitalrecords.pr.gov →</a>
          </div>
        </div>
        <div class="state-card">
          <div class="state-card-header"><span class="state-name">💼 Social Security</span></div>
          <div class="state-card-body">
            <div class="state-detail"><strong>Teléfono:</strong> 1-800-772-1213</div>
            <div class="state-detail"><strong>Portal:</strong> ssa.gov</div>
            <div class="state-detail"><strong>Actualizar dirección:</strong> En línea o por teléfono</div>
            <a href="https://www.ssa.gov" target="_blank" class="state-link">ssa.gov →</a>
          </div>
        </div>
        <div class="state-card">
          <div class="state-card-header"><span class="state-name">💰 Hacienda PR</span></div>
          <div class="state-card-body">
            <div class="state-detail"><strong>Teléfono:</strong> (787) 622-0123</div>
            <div class="state-detail"><strong>Portal:</strong> hacienda.pr.gov</div>
            <div class="state-detail"><strong>Importante:</strong> Notifica cambio de residencia para impuestos</div>
            <a href="https://hacienda.pr.gov" target="_blank" class="state-link">hacienda.pr.gov →</a>
          </div>
        </div>
        <div class="state-card">
          <div class="state-card-header"><span class="state-name">📮 USPS — Cambio de Dirección</span></div>
          <div class="state-card-body">
            <div class="state-detail"><strong>Portal:</strong> usps.com</div>
            <div class="state-detail"><strong>Costo:</strong> $1.10 para verificación</div>
            <div class="state-detail"><strong>Tiempo:</strong> Hacer 2 semanas antes de mudarte</div>
            <a href="https://www.usps.com/manage/forward.htm" target="_blank" class="state-link">Cambiar dirección →</a>
          </div>
        </div>
        <div class="state-card">
          <div class="state-card-header"><span class="state-name">🛂 Pasaporte Americano</span></div>
          <div class="state-card-body">
            <div class="state-detail"><strong>Teléfono:</strong> 1-877-487-2778</div>
            <div class="state-detail"><strong>Portal:</strong> travel.state.gov</div>
            <div class="state-detail"><strong>Tip:</strong> Aunque no es necesario para viajar PR↔USA, es el mejor ID universal</div>
            <a href="https://travel.state.gov" target="_blank" class="state-link">travel.state.gov →</a>
          </div>
        </div>
        <div class="state-card">
          <div class="state-card-header"><span class="state-name">🗳️ Registro Electoral PR</span></div>
          <div class="state-card-body">
            <div class="state-detail"><strong>CEE PR:</strong> (787) 777-8682</div>
            <div class="state-detail"><strong>Portal:</strong> ceepur.org</div>
            <div class="state-detail"><strong>Nota:</strong> Si te mudas a un estado, puedes votar en elecciones estatales y federales</div>
            <a href="https://www.ceepur.org" target="_blank" class="state-link">ceepur.org →</a>
          </div>
        </div>
      </div>
    </div>

  </div>

  <!-- SIDEBAR -->
  <div class="sidebar">
    <div class="nayeli-cta">
      <div class="nayeli-cta-icon">🇵🇷</div>
      <div class="nayeli-cta-title">¿Tienes preguntas?</div>
      <div class="nayeli-cta-sub">Nayeli conoce todo sobre mudanzas PR ↔ USA. Pregúntale lo que necesites.</div>
      <a href="/#nayeli" class="nayeli-cta-btn">Hablar con Nayeli →</a>
    </div>

    <div class="sidebar-card" style="margin-top:1rem;">
      <div class="sidebar-title">Recursos Rápidos</div>
      <a href="https://dtop.pr.gov" target="_blank" class="sidebar-link">DTOP — Licencias PR →</a>
      <a href="https://www.flhsmv.gov" target="_blank" class="sidebar-link">DHSMV — Licencias Florida →</a>
      <a href="https://vitalrecords.pr.gov" target="_blank" class="sidebar-link">Actas de Nacimiento PR →</a>
      <a href="https://www.ssa.gov" target="_blank" class="sidebar-link">Social Security →</a>
      <a href="https://www.usps.com" target="_blank" class="sidebar-link">USPS — Cambio de Dirección →</a>
      <a href="https://hacienda.pr.gov" target="_blank" class="sidebar-link">Hacienda PR →</a>
      <a href="https://www.lumapr.com" target="_blank" class="sidebar-link">LUMA Energy →</a>
      <a href="https://www.acueductospr.com" target="_blank" class="sidebar-link">AAA — Agua PR →</a>
    </div>

    <div class="sidebar-card">
      <div class="sidebar-title">Adsense</div>
      <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-4181903530685744" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </div>
  </div>
</div>

<!-- COLABORA -->
<section class="colabora">
  <div class="colabora-inner">
    <h2>¿Tienes info que <em>nos falta?</em> 🇵🇷</h2>
    <p>Esta guía la construimos entre todos. Si tienes información actualizada, una experiencia que compartir, o sabes de un recurso que debería estar aquí — cuéntanos. La comunidad boricua se ayuda.</p>
    <div class="colabora-form">
      <input class="colabora-input" id="colabNombre" placeholder="Tu nombre">
      <input class="colabora-input" id="colabEmail" type="email" placeholder="Tu email">
      <input class="colabora-input" id="colabTema" placeholder="Tema (ej: Licencias en Massachusetts)">
      <textarea class="colabora-textarea" id="colabInfo" placeholder="Comparte la información o corrección..."></textarea>
      <button class="colabora-btn" onclick="enviarColaboracion()">Enviar Colaboración →</button>
    </div>
    <div id="colabMsg" style="margin-top:1rem;font-size:0.85rem;color:#f5c842;display:none;"></div>
  </div>
</section>

<!-- FOOTER -->
<footer class="page-footer">
  <div class="page-footer-text">
    © 2026 <a href="/">Planeta Boricua</a> · masboricuaqueunmofongo.com · Un producto de <a href="https://ivamarai.com">Ivamar AI LLC</a><br>
    <span style="margin-top:0.3rem;display:block;">La información en esta página es orientativa. Verifica siempre con las agencias oficiales correspondientes.</span>
  </div>
</footer>

<script>
function showSection(id) {
  document.querySelectorAll('.resource-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('section-' + id).classList.add('active');
  event.target.classList.add('active');
}

async function enviarColaboracion() {
  const nombre = document.getElementById('colabNombre').value.trim();
  const email = document.getElementById('colabEmail').value.trim();
  const tema = document.getElementById('colabTema').value.trim();
  const info = document.getElementById('colabInfo').value.trim();
  const msg = document.getElementById('colabMsg');

  if (!nombre || !email || !tema || !info) {
    msg.style.display = 'block';
    msg.style.color = '#ff6b7a';
    msg.textContent = 'Por favor completa todos los campos.';
    return;
  }

  try {
    const res = await fetch('/api/colaboracion-boricua', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, tema, info, source: 'centro-recursos' })
    });
    msg.style.display = 'block';
    if (res.ok) {
      msg.style.color = '#f5c842';
      msg.textContent = '¡Wepa! Gracias por tu colaboración. La revisamos y la publicamos pronto. ¡Bendiciones! 🇵🇷';
      document.getElementById('colabNombre').value = '';
      document.getElementById('colabEmail').value = '';
      document.getElementById('colabTema').value = '';
      document.getElementById('colabInfo').value = '';
    } else {
      msg.textContent = 'Algo salió mal. Intenta de nuevo.';
    }
  } catch {
    msg.style.display = 'block';
    msg.textContent = 'Error de conexión. Intenta de nuevo.';
  }
}
</script>

</body>
</html>
`;
