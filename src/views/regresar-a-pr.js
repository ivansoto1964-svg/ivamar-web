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
  <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-8301223085122981" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins>
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

      <div style="margin-bottom:1.5rem;">
        <h3 style="font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:800;color:#111;margin-bottom:1rem;padding-bottom:0.4rem;border-bottom:2px solid #CE1126;">🚚 Empresas de Mudanza USA → PR</h3>
        <div class="cards-grid">
          <div class="info-card">
            <div class="info-card-header"><span class="info-card-name">⚓ Crowley</span><span style="font-size:0.65rem;color:#CE1126;font-weight:700;">Naviera Principal</span></div>
            <div class="info-card-body">
              <div class="info-card-detail"><strong>Teléfono:</strong> (904) 727-2200</div>
              <div class="info-card-detail"><strong>Rutas:</strong> Jacksonville → San Juan</div>
              <div class="info-card-detail"><strong>Tiempo:</strong> 3-5 días</div>
              <div class="info-card-detail"><strong>Servicios:</strong> Contenedor completo y LCL</div>
              <a href="https://www.crowley.com" target="_blank" class="info-card-link">crowley.com →</a>
            </div>
          </div>
          <div class="info-card">
            <div class="info-card-header"><span class="info-card-name">⚓ TOTE Maritime</span><span style="font-size:0.65rem;color:#CE1126;font-weight:700;">Naviera Principal</span></div>
            <div class="info-card-body">
              <div class="info-card-detail"><strong>Teléfono:</strong> (904) 855-0500</div>
              <div class="info-card-detail"><strong>Rutas:</strong> Jacksonville → San Juan</div>
              <div class="info-card-detail"><strong>Tiempo:</strong> 3-5 días</div>
              <div class="info-card-detail"><strong>Servicios:</strong> Carga general y vehículos</div>
              <a href="https://www.totemaritime.com" target="_blank" class="info-card-link">totemaritime.com →</a>
            </div>
          </div>
          <div class="info-card">
            <div class="info-card-header"><span class="info-card-name">📦 U-Pack</span></div>
            <div class="info-card-body">
              <div class="info-card-detail"><strong>Teléfono:</strong> 1-800-413-4799</div>
              <div class="info-card-detail"><strong>Servicio:</strong> Tú empacas, ellos mueven</div>
              <div class="info-card-detail"><strong>Ventaja:</strong> Más económico que mudanza completa</div>
              <a href="https://www.upack.com" target="_blank" class="info-card-link">upack.com →</a>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-bottom:1.5rem;">
        <h3 style="font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:800;color:#111;margin-bottom:1rem;padding-bottom:0.4rem;border-bottom:2px solid #CE1126;">🚗 Empresas de Envío de Autos USA → PR</h3>
        <div class="cards-grid">
          <div class="info-card">
            <div class="info-card-header"><span class="info-card-name">🚗 Puerto Rico Car Transport</span><span style="font-size:0.65rem;color:#CE1126;font-weight:700;">Especialista PR</span></div>
            <div class="info-card-body">
              <div class="info-card-detail"><strong>Teléfono:</strong> (904) 322-7644</div>
              <div class="info-card-detail"><strong>Especialidad:</strong> Solo envíos a/desde PR</div>
              <div class="info-card-detail"><strong>Servicios:</strong> Autos, motos, botes, RVs</div>
              <a href="https://www.puertoricocartransport.com" target="_blank" class="info-card-link">puertoricocartransport.com →</a>
            </div>
          </div>
          <div class="info-card">
            <div class="info-card-header"><span class="info-card-name">🚗 AutoStar Transport</span></div>
            <div class="info-card-body">
              <div class="info-card-detail"><strong>Experiencia:</strong> 19+ años</div>
              <div class="info-card-detail"><strong>Soporte:</strong> Bilingüe EN/ES</div>
              <div class="info-card-detail"><strong>Servicios:</strong> Open y enclosed transport</div>
              <a href="https://www.autostartransport.com" target="_blank" class="info-card-link">autostartransport.com →</a>
            </div>
          </div>
          <div class="info-card">
            <div class="info-card-header"><span class="info-card-name">🚗 RoadRunner Auto</span></div>
            <div class="info-card-body">
              <div class="info-card-detail"><strong>Servicio:</strong> Door-to-door disponible</div>
              <div class="info-card-detail"><strong>Ventaja:</strong> Red amplia de carriers</div>
              <div class="info-card-detail"><strong>Cotización:</strong> En línea instantánea</div>
              <a href="https://www.roadrunnerautotransport.com/puerto-rico-car-shipping" target="_blank" class="info-card-link">roadrunnerautotransport.com →</a>
            </div>
          </div>
        </div>
      </div>

      <div class="info-box blue" style="margin-bottom:1.5rem;">
        <div class="info-box-title">💰 Calcular Arbitrios de tu Vehículo</div>
        <div class="info-box-text">Antes de enviar tu vehículo, verifica cuánto tendrás que pagar de arbitrios en Puerto Rico. El cálculo oficial se hace en SURI — el sistema de Hacienda PR.<br><br>
        <a href="https://suri.hacienda.pr.gov" target="_blank" style="color:#002D62;font-weight:700;">Calcular arbitrios en SURI →</a></div>
      </div>

      <div class="steps-card">
        <div class="steps-card-header">
          <div class="steps-card-icon">🚗</div>
          <div>
            <div class="steps-card-title">Registrar tu vehículo en PR — Proceso Completo</div>
            <div class="steps-card-sub">Arbitrios → Inspección → Seguro Compulsorio → CESCO</div>
          </div>
        </div>
        <div class="steps-card-body">

          <div class="info-box warning" style="margin-bottom:1.2rem;">
            <div class="info-box-title">⚠ El orden importa — sigue estos pasos en secuencia</div>
            <div class="info-box-text">No puedes ir al CESCO sin antes pagar arbitrios, inspeccionar el vehículo y tener el seguro compulsorio. Hazlo en orden o perderás tiempo y dinero.</div>
          </div>

          <ul class="steps-list">
            <li class="step-item">
              <div class="step-num">1</div>
              <div class="step-content">
                <div class="step-title">Calcula y paga los Arbitrios — Hacienda PR</div>
                <div class="step-desc">Si tu vehículo fue comprado fuera de PR, debe pagar arbitrios (impuesto de importación). Usa el VIN del vehículo para estimar el monto en SURI de Hacienda. El pago genera la <strong>Hoja de Arbitrios (Forma SC-2042)</strong> — sin esto no puedes registrar.</div>
                <div class="step-note">💡 Estima tus arbitrios en: hacienda.pr.gov/arbitrios → Servicios → Buscar información de un vehículo</div>
                <div class="step-warning">⚠ Los arbitrios pueden ser significativos. Infórmate ANTES de enviar el vehículo.</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">2</div>
              <div class="step-content">
                <div class="step-title">Inspección Vehicular — Estación Oficial</div>
                <div class="step-desc">Lleva el vehículo a una Estación Oficial de Inspección. Se inspecciona: luces, frenos, bocina, cristales, dirección, suspensión, gomas, mofle (emanación de gases), carrocería y más. Costo: <strong>$20</strong> (subió de $11). Si falla, debes reparar y reinspeccionar.</div>
                <div class="step-note">💡 Lleva la licencia del vehículo impresa desde CESCO Digital para la inspección</div>
                <div class="step-warning">⚠ Sin pasar la inspección no puedes obtener el marbete ni registrar</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">3</div>
              <div class="step-content">
                <div class="step-title">Seguro Compulsorio (Obligatorio) — Escoge tu aseguradora</div>
                <div class="step-desc">El Seguro de Responsabilidad Obligatorio (SRO) es requerido por ley. Cubre hasta <strong>$4,500 por accidente</strong> a terceros. Costo fijo: <strong>$99 para vehículos personales</strong> (no ha cambiado en 25 años). Se obtiene al momento de la inspección o en colecturías, bancos y cooperativas.</div>
                <div class="step-note">💡 Puedes escoger tu aseguradora — tienes derecho a elegir. Si te dan el formulario con una ya marcada, es ilegal. Denúncialo a la OCS.</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">4</div>
              <div class="step-content">
                <div class="step-title">Documentos para llevar al CESCO</div>
                <div class="step-desc">Reúne <strong>todo</strong> antes de ir — el CESCO no trabaja transacciones con documentación incompleta:</div>
                <div style="margin-top:0.5rem;">
                  <div style="font-size:0.75rem;color:#444;line-height:1.8;">
                    ✅ Formulario DTOP-776 "Solicitud para Registración de Vehículos de Motor"<br>
                    ✅ Título de propiedad del vehículo (original del estado de USA)<br>
                    ✅ Hoja de Arbitrios (Forma SC-2042) emitida por Hacienda PR<br>
                    ✅ Certificado de Inspección Vehicular<br>
                    ✅ Seguro Compulsorio vigente<br>
                    ✅ Comprobante de Rentas Internas código 2024 ($11) — por registro<br>
                    ✅ Comprobante de Rentas Internas código 0842 ($2)<br>
                    ✅ ID válida con foto<br>
                    ✅ Pago de derechos anuales (tablillas)<br>
                    ✅ Sin multas pendientes (verifica en CESCO Digital antes de ir)<br>
                    ✅ Sin deudas con ASUME o ACAA (o plan de pago activo)
                  </div>
                </div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">5</div>
              <div class="step-content">
                <div class="step-title">Sacar cita en CESCO</div>
                <div class="step-desc">Las citas son obligatorias y se agotan rápido. Sácala en CESCO Digital o en cesco.turnospr.com. Hay 15 CESCO en toda la isla. También puedes hacer muchos trámites en línea a través de CESCO Digital.</div>
                <div class="step-note">💡 CESCO Digital: web.cescodigital.pr.gov · cesco.pr.gov</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">6</div>
              <div class="step-content">
                <div class="step-title">Seguro adicional (recomendado)</div>
                <div class="step-desc">El compulsorio solo cubre $4,500 a terceros — NO cubre tu vehículo. Para cubrir tu auto, contrata una póliza adicional con compañías como MAPFRE PR, Triple-S, Multinational Insurance u otras aseguradoras en la isla.</div>
              </div>
            </li>
          </ul>

          <div style="margin-top:1.5rem;">
            <h4 style="font-size:0.82rem;font-weight:700;color:#111;margin-bottom:0.8rem;padding-bottom:0.4rem;border-bottom:1px solid #e5e5e0;">🛡️ Compañías de Seguro Compulsorio en PR</h4>
            <div class="cards-grid">
              <div class="info-card">
                <div class="info-card-header"><span class="info-card-name">ASC — Mi Compulsorio</span><span style="font-size:0.65rem;color:#CE1126;font-weight:700;">Especialista #1</span></div>
                <div class="info-card-body">
                  <div class="info-card-detail"><strong>Especialidad:</strong> Solo seguro compulsorio</div>
                  <div class="info-card-detail"><strong>Ventaja:</strong> 24+ años de experiencia</div>
                  <div class="info-card-detail"><strong>Inspección:</strong> Remota disponible</div>
                  <a href="https://www.ascmicompulsorio.com" target="_blank" class="info-card-link">ascmicompulsorio.com →</a>
                </div>
              </div>
              <div class="info-card">
                <div class="info-card-header"><span class="info-card-name">MAPFRE Puerto Rico</span></div>
                <div class="info-card-body">
                  <div class="info-card-detail"><strong>Cobertura:</strong> Hasta $4,500</div>
                  <div class="info-card-detail"><strong>Extra:</strong> $100 compensación adicional</div>
                  <div class="info-card-detail"><strong>Teléfono:</strong> (787) 772-8400</div>
                  <a href="https://www.mapfre.pr/seguros-autos/compulsorio/" target="_blank" class="info-card-link">mapfre.pr →</a>
                </div>
              </div>
              <div class="info-card">
                <div class="info-card-header"><span class="info-card-name">SODA Compulsorio</span></div>
                <div class="info-card-body">
                  <div class="info-card-detail"><strong>Ventaja:</strong> Pago por ATH Móvil</div>
                  <div class="info-card-detail"><strong>Grúa:</strong> Incluida 24/7</div>
                  <div class="info-card-detail"><strong>WhatsApp:</strong> (787) 999-5050</div>
                </div>
              </div>
            </div>
          </div>

          <div class="info-box blue" style="margin-top:1rem;">
            <div class="info-box-title">💡 Calcula tus arbitrios antes de enviar el auto</div>
            <div class="info-box-text">Usa el VIN de tu vehículo para estimar el monto de arbitrios en SURI de Hacienda PR. Así sabes cuánto vas a pagar antes de enviar el carro desde USA.<br><br>
            <a href="https://suri.hacienda.pr.gov" target="_blank" style="color:#002D62;font-weight:700;">Estimar arbitrios en SURI → suri.hacienda.pr.gov</a><br>
            <a href="https://hacienda.pr.gov/arbitrios/arbitrios-en-el-caso-de-vehiculos" target="_blank" style="color:#002D62;font-weight:700;">Tabla de arbitrios → hacienda.pr.gov</a></div>
          </div>

          <div class="info-box blue" style="margin-top:1rem;">
            <div class="info-box-title">🧑‍💼 ¿Todo esto te parece mucho? Considera un gestor</div>
            <div class="info-box-text">Muchos boricuas prefieren contratar un <strong>gestor</strong> para que se encargue del papeleo de CESCO y DTOP en su nombre — arbitrios, inspección, seguro compulsorio y la cita misma. Por una tarifa (varía según el gestor, usualmente entre $30-$100 dependiendo del trámite), te ahorras filas, viajes y el dolor de cabeza de coordinar todo. Busca gestores recomendados en tu pueblo a través de Facebook o pregunta en tu CESCO local — muchos trabajan directamente en o cerca de las oficinas de CESCO.</div>
          </div>

          <div class="info-box" style="margin-top:1rem;">
            <div class="info-box-title">⚠ Consulta directamente con las agencias oficiales</div>
            <div class="info-box-text">Esta información es orientativa. Los requisitos y costos pueden cambiar. Verifica siempre en:<br>
            CESCO: <strong>cesco.pr.gov</strong> · Hacienda: <strong>hacienda.pr.gov</strong> · OCS (seguros): <strong>ocs.pr.gov</strong></div>
          </div>

        </div>
      </div>
    </div>

    <!-- LICENCIAS -->
    <div class="resource-section" id="section-licencias">
      <div class="resource-header">
        <h2 class="resource-title">🚗 Licencia de Conducir en PR</h2>
        <p class="resource-sub">Cómo canjear tu licencia de USA por una de Puerto Rico en el DTOP/CESCO. Bienvenido al calentón. 🇵🇷</p>
      </div>

      <div class="info-box red">
        <div class="info-box-title">🔥 Bienvenido al calentón — esto es PR</div>
        <div class="info-box-text">El proceso de canjear la licencia parece simple pero tiene más requisitos de lo que uno espera. Tarjeta del Social laminada → no sirve. Acta de nacimiento antes del 2010 → no sirve. Multas pendientes → no puedes tramitar. Cita disponible → en 3 semanas si tienes suerte. ¡Prepárate con todo antes de ir!</div>
      </div>

      <div class="info-box blue">
        <div class="info-box-title">📋 Lo básico</div>
        <div class="info-box-text">Al establecer residencia en PR, tienes 90 días para canjear tu licencia de USA por una de PR. Desde mayo 2025 necesitas REAL ID para volar dentro de USA — asegúrate de pedirla al hacer el canje.</div>
      </div>

      <div class="steps-card">
        <div class="steps-card-header">
          <div class="steps-card-icon">🪪</div>
          <div>
            <div class="steps-card-title">Canjear licencia USA → PR en el CESCO</div>
            <div class="steps-card-sub">Proceso completo verificado — 7 pasos que nadie te cuenta</div>
          </div>
        </div>
        <div class="steps-card-body">
          <ul class="steps-list">
            <li class="step-item">
              <div class="step-num">1</div>
              <div class="step-content">
                <div class="step-title">Verifica que no tienes multas pendientes PRIMERO</div>
                <div class="step-desc">Si tienes multas de tránsito sin pagar en PR, no puedes tramitar la licencia. Verifica en CESCO Digital antes de ir. Si tienes deudas con ACAA (accidentes de autos) o ASUME (manutención), también te bloquean — necesitas certificación de pago o plan de pago activo.</div>
                <div class="step-note">💡 Verifica multas: web.cescodigital.pr.gov</div>
                <div class="step-warning">⚠ Una sola multa sin pagar y el viaje al CESCO fue en balde</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">2</div>
              <div class="step-content">
                <div class="step-title">Verifica tu Acta de Nacimiento — debe ser post-julio 2010</div>
                <div class="step-desc">Las actas de nacimiento de PR emitidas ANTES del 1 de julio de 2010 fueron invalidadas por ley. Si la tuya es antigua, no sirve para ningún trámite. Solicita una nueva en el Registro Demográfico — puedes hacerlo en línea.</div>
                <div class="step-note">💡 Registro Demográfico: vitalrecords.pr.gov · (787) 767-9120</div>
                <div class="step-warning">⚠ Muchos boricuas llegan al CESCO con el acta vieja y se tienen que ir sin tramitar</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">3</div>
              <div class="step-content">
                <div class="step-title">Tarjeta de Social Security — sin laminar, en original</div>
                <div class="step-desc">El CESCO requiere la tarjeta de Social Security en original y sin laminar. Si está laminada o no la tienes, puedes presentar alternativas: Forma W-2 original del año en curso o anterior, o Forma SSA-1099, ambas con tu nombre y número completo.</div>
                <div class="step-warning">⚠ Tarjeta laminada = no aceptada. Sí, en serio. Bienvenido al calentón 🇵🇷</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">4</div>
              <div class="step-content">
                <div class="step-title">Certificación Médica — DTOP-DIS-260</div>
                <div class="step-desc">El CESCO puede requerir una certificación médica completada por un médico licenciado en Puerto Rico confirmando que puedes conducir de forma segura. Esta tiene vigencia de 6 meses. Si tu médico está en USA, necesitas conseguir uno en PR antes del trámite.</div>
                <div class="step-warning">⚠ Esto sorprende a muchos — prepárala con anticipación</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">5</div>
              <div class="step-content">
                <div class="step-title">Lista completa de documentos</div>
                <div class="step-desc" style="line-height:1.8;">
                  ✅ Licencia de conducir del estado (original y vigente)<br>
                  ✅ Acta de nacimiento de PR (post-julio 2010) o Pasaporte americano vigente<br>
                  ✅ Tarjeta de Social Security (original, sin laminar)<br>
                  ✅ Dos pruebas de residencia en PR — factura de LUMA, AAA, banco o contrato de renta<br>
                  ✅ Certificación Médica DTOP-DIS-260 (si se requiere)<br>
                  ✅ Sin multas pendientes<br>
                  ✅ Sin deudas con ACAA o ASUME (o plan de pago activo)
                </div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">6</div>
              <div class="step-content">
                <div class="step-title">Sacar cita en CESCO Digital</div>
                <div class="step-desc">Las citas son obligatorias y se agotan con semanas de anticipación. Sácala en cesco.turnospr.com o web.cescodigital.pr.gov lo antes posible después de llegar a PR. Hay 15 CESCO en la isla — busca el más cercano a ti.</div>
                <div class="step-note">💡 Citas: cesco.turnospr.com · CESCO Digital: web.cescodigital.pr.gov · (787) 294-0101</div>
                <div class="step-warning">⚠ Las citas pueden estar ocupadas por 2-3 semanas. Sácala el primer día que llegues</div>
                <div class="info-box blue" style="margin-top:1rem;">
                  <div class="info-box-title">🧑‍💼 Si se te complica, un gestor puede ayudarte</div>
                  <div class="info-box-text">Coordinar acta de nacimiento, certificación médica, verificar multas y sacar cita — todo a la vez — puede ser mucho si acabas de llegar. Un <strong>gestor</strong> puede manejar el papeleo y la cita por ti a cambio de una tarifa. Pregunta en tu CESCO local o busca recomendaciones en grupos de Facebook de tu pueblo.</div>
                </div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">7</div>
              <div class="step-content">
                <div class="step-title">Examen de conocimiento — puede ser requerido</div>
                <div class="step-desc">El CESCO puede requerir que tomes el examen de conocimiento del tránsito de PR. No es garantizado pero pasa. Prepárate estudiando el manual oficial en dtop.pr.gov. El examen cubre señales de tránsito, leyes de PR y conducción segura.</div>
              </div>
            </li>
          </ul>

          <div style="margin-top:1rem;padding:1rem;background:#fff8e1;border:1px solid #ffe082;border-radius:8px;">
            <div style="font-weight:700;font-size:0.82rem;color:#111;margin-bottom:0.5rem;">💰 Costo y tiempo</div>
            <div style="font-size:0.78rem;color:#444;line-height:1.6;">
              Costo aproximado: <strong>$10-25</strong><br>
              Licencia temporal: recibes el mismo día<br>
              Licencia permanente: por correo en <strong>2-3 semanas</strong>
            </div>
          </div>
        </div>
      </div>

      <div class="info-box warning">
        <div class="info-box-title">⭐ REAL ID — obligatorio para volar dentro de USA desde mayo 2025</div>
        <div class="info-box-text">Desde el 7 de mayo de 2025, necesitas REAL ID para abordar vuelos domésticos dentro de USA y entrar a instalaciones federales. Tu nueva licencia de PR debe tener el símbolo de estrella ⭐ en la esquina superior derecha para ser REAL ID. <strong>Pídela específicamente al hacer el canje</strong> — si no lo pides puede que te den la regular sin estrella. Si tienes pasaporte americano vigente, ese también sirve como alternativa.</div>
      </div>

      <div class="info-box">
        <div class="info-box-title">⚠ Consulta directamente con el CESCO</div>
        <div class="info-box-text">Los requisitos pueden variar y actualizarse. Verifica en cesco.pr.gov o llama al (787) 294-0101 antes de ir para confirmar que tienes todo en orden. Un viaje con documentos incompletos al CESCO es tiempo perdido.</div>
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
        <p class="resource-sub">Cómo conectar agua, luz, internet y cable al llegar a Puerto Rico — requisitos, costos y contactos verificados.</p>
      </div>

      <div class="info-box warning">
        <div class="info-box-title">⚠ Prepárate para la realidad de los servicios en PR</div>
        <div class="info-box-text">La infraestructura eléctrica de PR (LUMA Energy) puede ser menos confiable que en los estados. Los apagones son frecuentes. Muchas familias invierten en panel solar e inversor como respaldo. Planifica con anticipación.</div>
      </div>

      <!-- LUMA -->
      <div class="steps-card" style="margin-bottom:1.5rem;">
        <div class="steps-card-header">
          <div class="steps-card-icon">⚡</div>
          <div>
            <div class="steps-card-title">Luz — LUMA Energy</div>
            <div class="steps-card-sub">Servicio eléctrico residencial en Puerto Rico</div>
          </div>
        </div>
        <div class="steps-card-body">
          <ul class="steps-list">
            <li class="step-item">
              <div class="step-num">1</div>
              <div class="step-content">
                <div class="step-title">Documentos necesarios</div>
                <div class="step-desc">
                  ✅ Identificación válida con foto emitida por el gobierno<br>
                  ✅ Número de Social Security<br>
                  ✅ Número de Contador (NIM) si lo tienes disponible<br>
                  ✅ Si rentas: contrato de alquiler o arrendamiento
                </div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">2</div>
              <div class="step-content">
                <div class="step-title">Cómo solicitar el servicio</div>
                <div class="step-desc">Tres opciones: (A) En línea en lumapr.com → Solicita Un Servicio, (B) Por la app Mi LUMA → Ayuda → Solicitudes, (C) En persona en cualquier Centro de Servicio al Cliente LUMA.</div>
                <div class="step-note">💡 Se recomienda hacerlo en línea — más rápido y sin esperar en fila</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">3</div>
              <div class="step-content">
                <div class="step-title">Tiempo de activación y costo</div>
                <div class="step-desc">3-5 días hábiles para activación de servicio nuevo. Se requiere un depósito de garantía dependiendo del historial de crédito.</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">4</div>
              <div class="step-content">
                <div class="step-title">Registrar planta eléctrica o solar</div>
                <div class="step-desc">Si tienes planta o sistema solar, debes registrarlo con LUMA llamando al 1-844-888-5862 o en persona en un Centro de Servicio.</div>
              </div>
            </li>
          </ul>
          <div class="info-box" style="margin-top:1rem;">
            <div class="info-box-title">📞 Contacto LUMA Energy</div>
            <div class="info-box-text">
              Teléfono 24/7: <strong>1-844-888-5862 (LUMA)</strong><br>
              Web: <strong>lumapr.com</strong> · App: Mi LUMA<br>
              ⚠ <em>Consulta directamente en lumapr.com/residencial/solicita-un-servicio para requisitos actualizados</em>
            </div>
          </div>
        </div>
      </div>

      <!-- AAA -->
      <div class="steps-card" style="margin-bottom:1.5rem;">
        <div class="steps-card-header">
          <div class="steps-card-icon">💧</div>
          <div>
            <div class="steps-card-title">Agua — Autoridad de Acueductos y Alcantarillados (AAA)</div>
            <div class="steps-card-sub">Servicio de agua potable en Puerto Rico</div>
          </div>
        </div>
        <div class="steps-card-body">
          <ul class="steps-list">
            <li class="step-item">
              <div class="step-num">1</div>
              <div class="step-content">
                <div class="step-title">Documentos necesarios</div>
                <div class="step-desc">
                  ✅ Identificación válida con foto<br>
                  ✅ Escritura de propiedad o contrato de alquiler<br>
                  ✅ Fianza requerida al abrir cuenta nueva (monto varía)
                </div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">2</div>
              <div class="step-content">
                <div class="step-title">Cómo solicitar</div>
                <div class="step-desc">En persona en la oficina regional AAA más cercana o a través del portal Mi AAA en acueductos.pr.gov. Horario: lunes a viernes 7:30am - 4:00pm.</div>
                <div class="step-note">💡 Llama antes de visitar — algunos horarios cambiaron en 2025</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">3</div>
              <div class="step-content">
                <div class="step-title">Tarifas 2026</div>
                <div class="step-desc">Cargo fijo mensual: <strong>$11.84</strong> + consumo por galón (escala progresiva) + alcantarillado (113% del consumo de agua) + cargo CCCE (promedio $8-15/mes). Si tienes ingresos limitados, aplica al programa LIRA para reducción de hasta 33%.</div>
              </div>
            </li>
          </ul>
          <div class="info-box" style="margin-top:1rem;">
            <div class="info-box-title">📞 Contacto AAA</div>
            <div class="info-box-text">
              Teléfono: <strong>1-787-620-2482</strong><br>
              Web: <strong>acueductos.pr.gov</strong> · Portal: Mi AAA<br>
              ⚠ <em>Consulta directamente en acueductos.pr.gov para requisitos actualizados</em>
            </div>
          </div>
        </div>
      </div>

      <!-- INTERNET -->
      <div class="steps-card" style="margin-bottom:1.5rem;">
        <div class="steps-card-header">
          <div class="steps-card-icon">📶</div>
          <div>
            <div class="steps-card-title">Internet y Cable en PR</div>
            <div class="steps-card-sub">Proveedores principales y cómo contratar</div>
          </div>
        </div>
        <div class="steps-card-body">
          <div class="cards-grid">
            <div class="info-card">
              <div class="info-card-header"><span class="info-card-name">📶 Liberty PR</span><span style="font-size:0.65rem;color:#CE1126;font-weight:700;">Principal</span></div>
              <div class="info-card-body">
                <div class="info-card-detail"><strong>Teléfono:</strong> (787) 355-2222</div>
                <div class="info-card-detail"><strong>Internet desde:</strong> $52.99/mes (300Mbps)</div>
                <div class="info-card-detail"><strong>Requisitos:</strong> Solo ID vigente + verificar cobertura</div>
                <div class="info-card-detail"><strong>Tecnología:</strong> Fibra óptica disponible</div>
                <div class="info-card-detail"><strong>Garantía:</strong> 30 días para clientes nuevos</div>
                <a href="https://www.libertypr.com" target="_blank" class="info-card-link">libertypr.com →</a>
              </div>
            </div>
            <div class="info-card">
              <div class="info-card-header"><span class="info-card-name">📶 Claro PR</span></div>
              <div class="info-card-body">
                <div class="info-card-detail"><strong>Teléfono:</strong> (787) 792-3000</div>
                <div class="info-card-detail"><strong>Servicios:</strong> Internet + TV + Telefonía</div>
                <div class="info-card-detail"><strong>Tecnología:</strong> Fibra óptica en áreas seleccionadas</div>
                <a href="https://www.claropr.com" target="_blank" class="info-card-link">claropr.com →</a>
              </div>
            </div>
            <div class="info-card">
              <div class="info-card-header"><span class="info-card-name">📶 Choice Cable</span></div>
              <div class="info-card-body">
                <div class="info-card-detail"><strong>Teléfono:</strong> (787) 751-6200</div>
                <div class="info-card-detail"><strong>Servicios:</strong> Cable + Internet</div>
                <div class="info-card-detail"><strong>Área:</strong> Principalmente metro San Juan</div>
              </div>
            </div>
            <div class="info-card">
              <div class="info-card-header"><span class="info-card-name">🛸 Starlink</span></div>
              <div class="info-card-body">
                <div class="info-card-detail"><strong>Ideal para:</strong> Áreas rurales sin fibra</div>
                <div class="info-card-detail"><strong>Velocidad:</strong> 25-220 Mbps</div>
                <div class="info-card-detail"><strong>Costo:</strong> ~$120/mes + equipo</div>
                <a href="https://www.starlink.com" target="_blank" class="info-card-link">starlink.com →</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SOLAR -->
      <div class="steps-card">
        <div class="steps-card-header">
          <div class="steps-card-icon">☀️</div>
          <div>
            <div class="steps-card-title">Solar e Inversor — ¿Vale la pena en PR?</div>
            <div class="steps-card-sub">La alternativa a los apagones frecuentes</div>
          </div>
        </div>
        <div class="steps-card-body">
          <ul class="steps-list">
            <li class="step-item">
              <div class="step-num">1</div>
              <div class="step-content">
                <div class="step-title">¿Por qué muchos boricuas instalan solar?</div>
                <div class="step-desc">Los apagones de LUMA son frecuentes, especialmente en áreas rurales y después de tormentas. Un sistema solar + inversor/batería te da independencia energética y reduce la factura de luz significativamente.</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">2</div>
              <div class="step-content">
                <div class="step-title">Costo aproximado</div>
                <div class="step-desc">Sistema residencial completo: <strong>$15,000-25,000</strong>. Con el crédito federal del 30% (ITC), el costo efectivo baja a $10,500-17,500. Retorno de inversión: 5-8 años dependiendo del consumo.</div>
                <div class="step-note">💡 Crédito federal del 30% aplica en PR igual que en los estados</div>
              </div>
            </li>
            <li class="step-item">
              <div class="step-num">3</div>
              <div class="step-content">
                <div class="step-title">Registrar con LUMA</div>
                <div class="step-desc">Si instalas solar, debes registrar el sistema con LUMA Energy antes de conectarlo a la red. Llama al 1-844-888-5862 o visita un Centro de Servicio al Cliente.</div>
              </div>
            </li>
          </ul>
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
      <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-8301223085122981" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </div>
  </div>
</div>

<!-- AD BOTTOM -->
<div class="ad-strip">
  <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-8301223085122981" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins>
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
