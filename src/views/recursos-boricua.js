module.exports = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Centro de Recursos Boricua — PR ↔ USA | Planeta Boricua</title>
<meta name="description" content="Guías completas para boricuas que se mudan entre Puerto Rico y Estados Unidos. Licencias, mudanzas, servicios, empleo y más.">
<meta name="keywords" content="recursos boricuas, mudarse Puerto Rico USA, regresar Puerto Rico, boricua diáspora guía">
<link rel="canonical" href="https://www.masboricuaqueunmofongo.com/recursos">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8301223085122981" crossorigin="anonymous"></script>
<style>
*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'Inter',sans-serif;background:#f5f5f0;color:#111;min-height:100vh;display:flex;flex-direction:column;}
:root{
  --red:#CE1126;
  --blue:#002D62;
  --dark:#111111;
  --mid:#666;
  --light:#f5f5f0;
  --white:#ffffff;
  --border:#e5e5e0;
}

/* NAV */
nav{background:var(--white);border-bottom:3px solid var(--red);padding:0;}
.nav-top{max-width:1200px;margin:0 auto;padding:0.8rem 2rem;display:flex;align-items:center;justify-content:space-between;}
.nav-logo{display:flex;align-items:center;gap:0.6rem;text-decoration:none;}
.nav-logo img{height:44px;width:auto;mix-blend-mode:multiply;}
.nav-logo-text{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:800;color:var(--dark);}
.nav-back{font-size:0.78rem;color:var(--red);text-decoration:none;font-weight:600;}
.nav-back:hover{text-decoration:underline;}

/* HERO */
.hero{background:linear-gradient(135deg,var(--blue),#001a4d);padding:4rem 2rem;text-align:center;}
.hero-eyebrow{font-size:0.65rem;font-weight:800;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:0.8rem;}
.hero h1{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,3rem);font-weight:800;color:#fff;line-height:1.2;margin-bottom:1rem;}
.hero h1 em{color:#f5c842;font-style:italic;}
.hero p{font-size:0.95rem;color:rgba(255,255,255,0.65);line-height:1.8;max-width:560px;margin:0 auto;}

/* MAIN */
.main{flex:1;max-width:900px;margin:0 auto;padding:3rem 2rem;width:100%;}

/* DIRECTION CARDS */
.direction-grid{display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin-bottom:3rem;}
.direction-card{text-decoration:none;color:inherit;display:flex;flex-direction:column;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);transition:all 0.3s;}
.direction-card:hover{transform:translateY(-6px);box-shadow:0 12px 40px rgba(0,0,0,0.15);}
.direction-card-header{padding:2.5rem 2rem;display:flex;flex-direction:column;align-items:center;text-align:center;gap:1rem;}
.direction-card.pr-usa .direction-card-header{background:linear-gradient(135deg,#002D62,#0044AA);}
.direction-card.usa-pr .direction-card-header{background:linear-gradient(135deg,#CE1126,#8B0000);}
.direction-emoji{font-size:3rem;}
.direction-arrow{font-size:2rem;color:rgba(255,255,255,0.6);}
.direction-title{font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:800;color:#fff;line-height:1.2;}
.direction-sub{font-size:0.82rem;color:rgba(255,255,255,0.7);}
.direction-card-body{background:var(--white);padding:1.5rem 2rem;flex:1;}
.direction-topics{list-style:none;display:flex;flex-direction:column;gap:0.5rem;margin-bottom:1.5rem;}
.direction-topics li{font-size:0.82rem;color:#444;display:flex;align-items:center;gap:0.5rem;}
.direction-topics li::before{content:'→';color:var(--red);font-weight:700;flex-shrink:0;}
.direction-btn{display:block;text-align:center;padding:0.85rem;border-radius:6px;font-size:0.88rem;font-weight:700;text-decoration:none;transition:all 0.2s;}
.direction-card.pr-usa .direction-btn{background:var(--blue);color:#fff;}
.direction-card.pr-usa .direction-btn:hover{background:#001a4d;}
.direction-card.usa-pr .direction-btn{background:var(--red);color:#fff;}
.direction-card.usa-pr .direction-btn:hover{background:#a80e1f;}

/* NAYELI CTA */
.nayeli-strip{background:var(--blue);border-radius:12px;padding:2rem;display:flex;align-items:center;gap:2rem;margin-bottom:2rem;}
.nayeli-strip-icon{font-size:3rem;flex-shrink:0;}
.nayeli-strip-text h3{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:800;color:#fff;margin-bottom:0.4rem;}
.nayeli-strip-text p{font-size:0.85rem;color:rgba(255,255,255,0.65);line-height:1.6;}
.nayeli-strip-btn{display:inline-flex;align-items:center;gap:0.5rem;background:var(--red);color:#fff;padding:0.75rem 1.5rem;border-radius:6px;font-size:0.85rem;font-weight:700;text-decoration:none;white-space:nowrap;flex-shrink:0;}

/* AD */
.ad-strip{text-align:center;margin-bottom:2rem;}

/* FOOTER */
.pb-footer{background:var(--white);border-top:3px solid var(--red);margin-top:auto;}
.pb-footer-main{max-width:1200px;margin:0 auto;padding:2rem;display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:2rem;}
.pb-footer-col h4{font-size:0.65rem;font-weight:800;color:var(--dark);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.8rem;padding-bottom:0.4rem;border-bottom:2px solid var(--red);}
.pb-footer-col a{display:block;font-size:0.78rem;color:var(--mid);text-decoration:none;margin-bottom:0.4rem;}
.pb-footer-col a:hover{color:var(--red);}
.pb-footer-bottom{background:var(--light);border-top:1px solid var(--border);padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;}
.pb-footer-copy{font-size:0.68rem;color:#999;}
.pb-footer-ivamar a{color:var(--red);text-decoration:none;font-size:0.68rem;}

@media(max-width:768px){
  .nav-top{padding:0.8rem 1rem;}
  .hero{padding:3rem 1rem;}
  .main{padding:2rem 1rem;}
  .direction-grid{grid-template-columns:1fr;}
  .nayeli-strip{flex-direction:column;text-align:center;}
  .pb-footer-main{grid-template-columns:1fr 1fr;padding:1.5rem 1rem;}
  .pb-footer-bottom{flex-direction:column;text-align:center;padding:1rem;}
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
    <a href="/" class="nav-back">← Volver al portal</a>
  </div>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-eyebrow">Centro de Recursos</div>
  <h1>Tu Guía Boricua<br><em>PR ↔ USA</em> 🇵🇷</h1>
  <p>Información verificada para boricuas que se mudan entre Puerto Rico y Estados Unidos. Selecciona tu dirección:</p>
</section>

<!-- MAIN -->
<div class="main">

  <!-- DIRECTION CARDS -->
  <div class="direction-grid">
    <a href="/mudarse-de-pr" class="direction-card pr-usa">
      <div class="direction-card-header">
        <div class="direction-emoji">🇵🇷</div>
        <div class="direction-arrow">→ 🇺🇸</div>
        <div class="direction-title">Me voy de PR<br>a Estados Unidos</div>
        <div class="direction-sub">Guía completa para mudarte de la isla a los estados</div>
      </div>
      <div class="direction-card-body">
        <ul class="direction-topics">
          <li>Mudanza y envío de pertenencias</li>
          <li>Licencia de conducir por estado</li>
          <li>Documentos REAL ID</li>
          <li>Escuelas y ESL</li>
          <li>Seguro médico — Healthcare.gov</li>
          <li>Construir crédito desde cero</li>
          <li>Impuestos al salir de PR</li>
        </ul>
        <span class="direction-btn">Ver Guía PR → USA →</span>
      </div>
    </a>

    <a href="/regresar-a-pr" class="direction-card usa-pr">
      <div class="direction-card-header">
        <div class="direction-emoji">🇺🇸</div>
        <div class="direction-arrow">→ 🇵🇷</div>
        <div class="direction-title">Regreso a<br>Puerto Rico</div>
        <div class="direction-sub">Guía completa para regresar a la isla desde USA</div>
      </div>
      <div class="direction-card-body">
        <ul class="direction-topics">
          <li>Mudanza y navieras USA → PR</li>
          <li>Registro de vehículo en CESCO</li>
          <li>Arbitrios, inspección y compulsorio</li>
          <li>LUMA, AAA, internet en PR</li>
          <li>Vivienda — precios actuales</li>
          <li>Empleo y trabajo remoto en PR</li>
          <li>Ventajas fiscales Ley 60</li>
        </ul>
        <span class="direction-btn">Ver Guía USA → PR →</span>
      </div>
    </a>
  </div>

  <!-- AD -->
  <div class="ad-strip">
    <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-8301223085122981" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
  </div>

  <!-- NAYELI CTA -->
  <div class="nayeli-strip">
    <div class="nayeli-strip-icon">🇵🇷</div>
    <div class="nayeli-strip-text">
      <h3>¿Tienes preguntas? Habla con Nayeli</h3>
      <p>Nayeli es tu asistente boricua de IA. Conoce todo sobre mudanzas PR↔USA, licencias, servicios y más. Pregúntale lo que necesites — en español boricua, 24/7.</p>
    </div>
    <a href="/#nayeli" class="nayeli-strip-btn">Hablar con Nayeli →</a>
  </div>

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

</body>
</html>
`;
