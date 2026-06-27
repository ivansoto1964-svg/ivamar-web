module.exports = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Planeta Boricua — Más Boricua Que Un Mofongo</title>
<meta name="description" content="Tu portal de cultura, noticias y comunidad puertorriqueña. Directorio de negocios boricuas en USA, recursos para mudanzas PR↔USA, Nayeli AI y más.">
<meta name="keywords" content="Puerto Rico, boricua, noticias Puerto Rico, cultura puertorriqueña, diáspora boricua, negocios boricuas, mudarse de Puerto Rico, boricuas en Florida, boricuas en Nueva York, recursos boricuas">
<meta name="author" content="Planeta Boricua — Ivamar AI LLC">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://www.masboricuaqueunmofongo.com/">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.masboricuaqueunmofongo.com/">
<meta property="og:title" content="Planeta Boricua — Más Boricua Que Un Mofongo">
<meta property="og:description" content="Tu portal de cultura, noticias y comunidad puertorriqueña. Directorio de negocios boricuas en USA, recursos para mudanzas PR↔USA, Nayeli AI y más.">
<meta property="og:image" content="https://www.masboricuaqueunmofongo.com/img/og-planetaboricua.jpg">
<meta property="og:locale" content="es_PR">
<meta property="og:site_name" content="Planeta Boricua">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="https://www.masboricuaqueunmofongo.com/">
<meta name="twitter:title" content="Planeta Boricua — Más Boricua Que Un Mofongo">
<meta name="twitter:description" content="Tu portal de cultura, noticias y comunidad puertorriqueña. Directorio de negocios boricuas en USA, recursos para mudanzas PR↔USA y Nayeli AI.">
<meta name="twitter:image" content="https://www.masboricuaqueunmofongo.com/img/og-planetaboricua.jpg">
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

/* NAV */
nav{background:var(--white);border-bottom:3px solid var(--red);padding:0;position:sticky;top:0;z-index:100;}
.nav-top{max-width:1200px;margin:0 auto;padding:0.8rem 2rem;display:flex;align-items:center;justify-content:space-between;}
.nav-logo{display:flex;align-items:center;gap:0.6rem;text-decoration:none;}
.nav-flag{font-size:1.6rem;}
.nav-logo-text{font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:800;color:var(--dark);line-height:1;}
.nav-logo-sub{font-size:0.58rem;color:var(--mid);text-transform:uppercase;letter-spacing:0.08em;margin-top:0.1rem;}
.nav-links{display:flex;align-items:center;gap:2rem;}
.nav-links a{font-size:0.8rem;color:var(--mid);text-decoration:none;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;transition:color 0.2s;}
.nav-links a:hover{color:var(--red);}
.nav-cta{background:var(--red);color:#fff!important;padding:0.45rem 1rem;border-radius:3px;font-weight:700;}
.nav-cta:hover{background:#a80e1f!important;}
.nav-ticker{background:var(--red);padding:0.3rem 0;overflow:hidden;}
.nav-ticker-inner{max-width:1200px;margin:0 auto;padding:0 2rem;display:flex;align-items:center;gap:1rem;}
.nav-ticker-label{font-size:0.62rem;font-weight:800;color:#fff;text-transform:uppercase;letter-spacing:0.1em;white-space:nowrap;background:rgba(0,0,0,0.2);padding:0.15rem 0.5rem;}
.nav-ticker-text{font-size:0.72rem;color:rgba(255,255,255,0.9);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}

/* HERO */
.hero{background:var(--white);border-bottom:1px solid var(--border);padding:2rem 0;}
.hero-inner{max-width:1200px;margin:0 auto;padding:0 2rem;display:grid;grid-template-columns:1.6fr 1fr;gap:2rem;align-items:start;}
.hero-main{}
.hero-main-img{width:100%;height:320px;object-fit:cover;border-radius:4px;margin-bottom:1rem;background:linear-gradient(135deg,var(--blue),var(--red));display:flex;align-items:center;justify-content:center;font-size:5rem;}
.hero-main-img img{width:100%;height:100%;object-fit:cover;border-radius:4px;}
.hero-cat{font-size:0.65rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:0.5rem;}
.hero-title{font-family:'Playfair Display',serif;font-size:clamp(1.6rem,3vw,2.4rem);font-weight:800;line-height:1.2;color:var(--dark);margin-bottom:0.8rem;}
.hero-excerpt{font-size:0.92rem;color:var(--mid);line-height:1.7;margin-bottom:1rem;}
.hero-meta{font-size:0.7rem;color:#999;display:flex;align-items:center;gap:1rem;}
.hero-read{font-size:0.78rem;font-weight:700;color:var(--red);text-decoration:none;}
.hero-read:hover{text-decoration:underline;}
.hero-sidebar{display:flex;flex-direction:column;gap:0;border-left:1px solid var(--border);padding-left:2rem;}
.hero-side-card{padding:1rem 0;border-bottom:1px solid var(--border);text-decoration:none;color:inherit;display:block;transition:all 0.2s;}
.hero-side-card:last-child{border-bottom:none;}
.hero-side-card:hover .hero-side-title{color:var(--red);}
.hero-side-num{font-family:'Playfair Display',serif;font-size:2rem;font-weight:800;color:var(--border);line-height:1;margin-bottom:0.3rem;}
.hero-side-cat{font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem;}
.hero-side-title{font-family:'Playfair Display',serif;font-size:0.95rem;font-weight:700;color:var(--dark);line-height:1.3;transition:color 0.2s;}
.hero-side-date{font-size:0.65rem;color:#999;margin-top:0.3rem;}

/* SECTION DIVIDER */
.sec-divider{max-width:1200px;margin:0 auto;padding:0 2rem;}
.sec-divider-inner{display:flex;align-items:center;gap:1rem;padding:1rem 0 0.8rem;}
.sec-divider-label{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:800;color:var(--dark);white-space:nowrap;}
.sec-divider-line{flex:1;height:2px;background:var(--red);}
.sec-divider-link{font-size:0.72rem;font-weight:700;color:var(--red);text-decoration:none;white-space:nowrap;}

/* NOTICIAS GRID */
.noticias{background:var(--light);padding:2rem 0;}
.noticias-inner{max-width:1200px;margin:0 auto;padding:0 2rem;}
.noticias-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
.noticia-card{background:var(--white);border-radius:4px;overflow:hidden;text-decoration:none;color:inherit;display:flex;flex-direction:column;transition:box-shadow 0.2s;}
.noticia-card:hover{box-shadow:0 4px 20px rgba(0,0,0,0.08);}
.noticia-img{height:160px;overflow:hidden;background:linear-gradient(135deg,#e5e5e0,#d0d0ca);}
.noticia-img img{width:100%;height:100%;object-fit:cover;transition:transform 0.3s;}
.noticia-card:hover .noticia-img img{transform:scale(1.03);}
.noticia-body{padding:1.2rem;flex:1;display:flex;flex-direction:column;}
.noticia-cat{font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.4rem;}
.noticia-title{font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;color:var(--dark);line-height:1.3;margin-bottom:0.5rem;flex:1;}
.noticia-excerpt{font-size:0.78rem;color:var(--mid);line-height:1.6;margin-bottom:0.8rem;}
.noticia-date{font-size:0.65rem;color:#999;}

/* DIRECTORIO */
.directorio{background:var(--white);border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:2rem 0;}
.directorio-inner{max-width:1200px;margin:0 auto;padding:0 2rem;}
.directorio-grid{display:flex;flex-direction:column;gap:0;margin-top:1.5rem;border:1px solid var(--border);border-radius:8px;overflow:hidden;}
.dir-card{border-bottom:1px solid var(--border);padding:0.8rem 1rem;display:flex;gap:0.8rem;align-items:center;transition:background 0.15s;text-decoration:none;color:inherit;background:#fff;}
.dir-card:last-child{border-bottom:none;}
.dir-card:hover{background:#fafafa;}
.dir-card.destacado{background:#fffbf0;border-left:3px solid #f0c040;}
.dir-icon{width:42px;height:42px;background:#fff5f5;border:1px solid #fdd;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0;}
.dir-info{flex:1;}
.dir-name{font-weight:700;font-size:0.88rem;color:var(--dark);margin-bottom:0.2rem;}
.dir-cat{font-size:0.62rem;color:var(--red);font-weight:700;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:0.2rem;}
.dir-location{font-size:0.72rem;color:var(--mid);}
.dir-badge{font-size:0.58rem;background:#fff8e1;color:#b8860b;border:1px solid #f0d060;padding:0.1rem 0.4rem;border-radius:2px;font-weight:700;text-transform:uppercase;}
.directorio-cta{text-align:center;margin-top:2rem;display:flex;gap:1rem;justify-content:center;}

/* NAYELI */
.nayeli-section{background:var(--blue);padding:2.5rem 0;}
.nayeli-inner{max-width:1200px;margin:0 auto;padding:0 2rem;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;}
.nayeli-eyebrow{font-size:0.65rem;font-weight:800;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:0.6rem;}
.nayeli-title{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3vw,2.6rem);font-weight:800;color:#fff;line-height:1.15;margin-bottom:1rem;}
.nayeli-title .accent{color:#90CAF9;}
.nayeli-sub{font-size:0.92rem;color:rgba(255,255,255,0.65);line-height:1.8;margin-bottom:1.5rem;}
.nayeli-features{list-style:none;display:flex;flex-direction:column;gap:0.6rem;margin-bottom:2rem;}
.nayeli-features li{display:flex;align-items:flex-start;gap:0.6rem;font-size:0.85rem;color:rgba(255,255,255,0.75);}
.nayeli-features li::before{content:'🇵🇷';font-size:0.75rem;flex-shrink:0;margin-top:2px;}
.btn-white{display:inline-flex;align-items:center;gap:0.5rem;background:#fff;color:var(--blue);padding:0.85rem 1.8rem;border-radius:4px;font-size:0.88rem;font-weight:700;text-decoration:none;transition:all 0.2s;}
.btn-white:hover{background:#f0f0f0;}
.nayeli-chat{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:8px;overflow:hidden;}
.nayeli-chat-header{padding:1rem 1.2rem;background:rgba(0,0,0,0.2);border-bottom:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;gap:0.8rem;}
.nayeli-avatar{width:36px;height:36px;background:var(--red);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;}
.nayeli-name{font-size:0.85rem;font-weight:700;color:#fff;}
.nayeli-online{font-size:0.62rem;color:rgba(255,255,255,0.5);}
.nayeli-msgs{padding:1.2rem;display:flex;flex-direction:column;gap:0.8rem;min-height:200px;}
.n-msg{max-width:85%;padding:0.75rem 1rem;font-size:0.82rem;line-height:1.6;}
.n-bot{background:rgba(255,255,255,0.1);border-radius:4px 12px 12px 12px;color:#fff;align-self:flex-start;}
.n-user{background:var(--red);color:#fff;border-radius:12px 4px 12px 12px;align-self:flex-end;}
.nayeli-input-row{padding:0.8rem;border-top:1px solid rgba(255,255,255,0.08);display:flex;gap:0.5rem;}
.nayeli-input{flex:1;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:4px;padding:0.6rem 0.9rem;color:#fff;font-size:0.78rem;outline:none;font-family:'Inter',sans-serif;}
.nayeli-input::placeholder{color:rgba(255,255,255,0.3);}
.nayeli-send{background:var(--red);border:none;border-radius:4px;width:34px;height:34px;cursor:pointer;font-size:0.85rem;color:#fff;}

/* VIAJES */
.viajes{background:var(--light);padding:2rem 0;}
.viajes-inner{max-width:1200px;margin:0 auto;padding:0 2rem;}
.viajes-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:1.5rem;}
.viaje-card{background:var(--white);border-radius:4px;overflow:hidden;text-decoration:none;color:inherit;display:flex;flex-direction:column;transition:box-shadow 0.2s;}
.viaje-card:hover{box-shadow:0 4px 20px rgba(0,0,0,0.08);}
.viaje-img{height:140px;display:flex;align-items:center;justify-content:center;font-size:3rem;}
.viaje-img.pr{background:linear-gradient(135deg,var(--blue),var(--red));}
.viaje-img.orlando{background:linear-gradient(135deg,#1a1a2e,#533483);}
.viaje-img.ny{background:linear-gradient(135deg,#0f3460,#16213e);}
.viaje-body{padding:1.2rem;}
.viaje-cat{font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.4rem;}
.viaje-title{font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;color:var(--dark);margin-bottom:0.4rem;}
.viaje-sub{font-size:0.78rem;color:var(--mid);line-height:1.5;margin-bottom:0.8rem;}
.viaje-cta{font-size:0.75rem;font-weight:700;color:var(--red);}

/* NEWSLETTER */
.newsletter{background:var(--dark);padding:2.5rem 2rem;text-align:center;}
.newsletter-inner{max-width:520px;margin:0 auto;}
.newsletter-eyebrow{font-size:0.65rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:0.6rem;}
.newsletter h2{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3vw,2.4rem);font-weight:800;color:#fff;margin-bottom:0.8rem;line-height:1.2;}
.newsletter h2 em{color:#f5c842;font-style:italic;}
.newsletter p{font-size:0.88rem;color:rgba(255,255,255,0.5);line-height:1.7;margin-bottom:2rem;}
.newsletter-form{display:flex;gap:0.5rem;max-width:420px;margin:0 auto;}
.newsletter-input{flex:1;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:0.8rem 1rem;color:#fff;font-size:0.85rem;outline:none;font-family:'Inter',sans-serif;}
.newsletter-input::placeholder{color:rgba(255,255,255,0.25);}
.newsletter-btn{background:var(--red);color:#fff;border:none;border-radius:4px;padding:0.8rem 1.2rem;font-size:0.85rem;font-weight:700;cursor:pointer;white-space:nowrap;font-family:'Inter',sans-serif;}
.newsletter-btn:hover{background:#a80e1f;}
.newsletter-note{font-size:0.68rem;color:rgba(255,255,255,0.2);margin-top:0.8rem;}

/* BUTTONS */
.btn-red{display:inline-flex;align-items:center;gap:0.5rem;background:var(--red);color:#fff;padding:0.75rem 1.5rem;border-radius:4px;font-size:0.85rem;font-weight:700;text-decoration:none;transition:all 0.2s;}
.btn-red:hover{background:#a80e1f;}
.btn-outline-dark{display:inline-flex;align-items:center;gap:0.5rem;border:2px solid var(--dark);color:var(--dark);padding:0.75rem 1.5rem;border-radius:4px;font-size:0.85rem;font-weight:700;text-decoration:none;transition:all 0.2s;}
.btn-outline-dark:hover{background:var(--dark);color:#fff;}

/* FOOTER */
.pb-footer{background:var(--white);border-top:3px solid var(--red);}
.pb-footer-main{max-width:1200px;margin:0 auto;padding:2.5rem 2rem;display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:2rem;}
.pb-footer-brand{}
.pb-footer-logo{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:800;color:var(--dark);margin-bottom:0.3rem;}
.pb-footer-tagline{font-size:0.72rem;color:var(--mid);margin-bottom:1rem;}
.pb-footer-social{display:flex;gap:0.6rem;}
.pb-footer-social a{width:32px;height:32px;background:var(--light);border:1px solid var(--border);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:0.85rem;text-decoration:none;transition:all 0.2s;}
.pb-footer-social a:hover{background:var(--red);border-color:var(--red);}
.pb-footer-col h4{font-size:0.65rem;font-weight:800;color:var(--dark);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.8rem;padding-bottom:0.4rem;border-bottom:2px solid var(--red);}
.pb-footer-col a{display:block;font-size:0.78rem;color:var(--mid);text-decoration:none;margin-bottom:0.4rem;transition:color 0.2s;}
.pb-footer-col a:hover{color:var(--red);}
.pb-footer-bottom{background:var(--light);border-top:1px solid var(--border);padding:1rem 2rem;}
.pb-footer-bottom-inner{max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;}
.pb-footer-copy{font-size:0.68rem;color:#999;}
.pb-footer-ivamar{font-size:0.68rem;color:#999;}
.pb-footer-ivamar a{color:var(--red);text-decoration:none;}

/* ADSENSE */
.ad-strip{max-width:1200px;margin:0 auto;padding:1rem 2rem;text-align:center;}

@media(max-width:768px){
.recursos-inner{grid-template-columns:1fr!important;}

  .nav-links{display:none;}
  .nav-top{padding:0.8rem 1rem;}
  .hero-inner{grid-template-columns:1fr;gap:1.5rem;padding:0 1rem;}
  .hero-sidebar{border-left:none;border-top:1px solid var(--border);padding-left:0;padding-top:1rem;}
  .noticias-inner{padding:0 1rem;}
  .noticias-grid{grid-template-columns:1fr;}
  .directorio-inner{padding:0 1rem;}
  .nayeli-inner{grid-template-columns:1fr;gap:2rem;padding:0 1rem;}
  .viajes-inner{padding:0 1rem;}
  .viajes-grid{grid-template-columns:1fr;}
  .pb-footer-main{grid-template-columns:1fr 1fr;padding:2rem 1rem;}
  .pb-footer-bottom{padding:1rem;}
}

/* NOTICIAS EN VIVO */
.noticias-vivo{background:var(--light);padding:2rem 0;border-top:1px solid var(--border);}
.noticias-vivo-inner{max-width:1200px;margin:0 auto;padding:0 2rem;}
.noticias-vivo-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem;margin-top:1.5rem;}
.noticia-vivo-card{background:var(--white);border-radius:4px;padding:1.2rem;text-decoration:none;color:inherit;display:flex;flex-direction:column;gap:0.4rem;border-left:3px solid var(--red);transition:box-shadow 0.2s;}
.noticia-vivo-card:hover{box-shadow:0 4px 16px rgba(0,0,0,0.08);}
.noticia-vivo-source{font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;}
.noticia-vivo-cat{font-size:0.6rem;font-weight:600;color:#999;text-transform:uppercase;letter-spacing:0.08em;}
.noticia-vivo-title{font-family:'Playfair Display',serif;font-size:0.9rem;font-weight:700;color:var(--dark);line-height:1.3;}
.noticia-vivo-summary{font-size:0.75rem;color:var(--mid);line-height:1.5;}
.noticia-vivo-date{font-size:0.65rem;color:#999;margin-top:0.3rem;}
.noticia-vivo-body{padding:1rem;display:flex;flex-direction:column;gap:0.4rem;border-left:3px solid var(--red);}
@media(max-width:768px){.noticias-vivo-grid{grid-template-columns:1fr;}}
</style>
<script nowprocket data-noptimize="1" data-cfasync="false" data-wpfc-render="false" seraph-accel-crit="1" data-no-defer="1">
  (function () {
      var script = document.createElement("script");
      script.async = 1;
      script.src = 'https://tpembars.com/NDcwMTYx.js?t=470161';
      document.head.appendChild(script);
  })();
</script>
</head>
<body>

<!-- NAV -->
<nav>
  <div class="nav-top">
    <a href="/" class="nav-logo">
      <img src="/img/pb-logo.png" alt="Planeta Boricua" style="height:44px;width:auto;mix-blend-mode:multiply;">
      <div>
        <div class="nav-logo-text">Planeta Boricua</div>
        <div class="nav-logo-sub">Más Boricua Que Un Mofongo</div>
      </div>
    </a>
    <div class="nav-links">
      <a href="#noticias">Noticias</a>
      <a href="/recursos">Recursos PR↔USA</a>
      <a href="/regresar-a-pr">Regresar a PR</a>
      <a href="#directorio">Directorio</a>
      <a href="#nayeli">Nayeli AI</a>
      <a href="#viajes">Viajes</a>
      <a href="#newsletter" class="nav-cta">Newsletter →</a>
    </div>
  </div>
  <div class="nav-ticker">
    <div class="nav-ticker-inner">
      <span class="nav-ticker-label">🔴 En vivo</span>
      <span class="nav-ticker-text">Noticias de Puerto Rico y la diáspora boricua · Cultura · Política · Deportes · Gastronomía · Comunidad</span>
    </div>
  </div>
</nav>

<!-- HERO -->
<section class="hero" id="hero">
  <div class="hero-inner">
    <div class="hero-main" id="hero-main">
      <div class="hero-main-img" id="hero-main-img" style="display:flex;align-items:center;justify-content:center;font-size:5rem;">🇵🇷</div>
      <div class="hero-cat" id="hero-main-cat">Cargando...</div>
      <h1 class="hero-title" id="hero-main-title">Lo último de Puerto Rico</h1>
      <p class="hero-excerpt" id="hero-main-excerpt"></p>
      <div class="hero-meta">
        <span id="hero-main-date"></span>
        <a href="#" id="hero-main-link" class="hero-read">Leer artículo →</a>
      </div>
    </div>
    <div class="hero-sidebar" id="hero-sidebar">
      <div style="padding:1rem 0;color:#999;font-size:0.82rem;">Cargando noticias...</div>
    </div>
  </div>
</section>

<!-- ADSENSE -->
<div class="ad-strip">
  <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-8301223085122981" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>

<!-- NOTICIAS EN VIVO -->
<section class="noticias-vivo">
  <div class="noticias-vivo-inner">
    <div class="sec-divider-inner">
      <div style="display:flex;align-items:center;gap:0.6rem;">
        <img src="/pbn-logo.webp" alt="PBN" style="height:32px;width:32px;object-fit:contain;">
        <span class="sec-divider-label">PBN Noticias</span>
      </div>
      <div style="flex:1;height:2px;background:var(--red);margin:0 1rem;"></div>
      <a href="/noticias" style="font-size:0.72rem;color:var(--red);font-weight:700;text-decoration:none;">Ver todas →</a>
    </div>
    <div class="noticias-vivo-grid" id="noticias-vivo-grid">
      <div style="background:#fff;border-radius:4px;height:120px;border-left:3px solid #eee;"></div>
      <div style="background:#fff;border-radius:4px;height:120px;border-left:3px solid #eee;"></div>
      <div style="background:#fff;border-radius:4px;height:120px;border-left:3px solid #eee;"></div>
    </div>
  </div>
</section>

<!-- NOTICIAS -->
<section class="noticias" id="noticias">
  <div class="noticias-inner">
    <div class="sec-divider-inner">
      <span class="sec-divider-label">Los Temas del Balcón</span>
      <div style="flex:1;height:2px;background:var(--red);margin:0 1rem;"></div>
      <a href="https://blog.masboricuaqueunmofongo.com" target="_blank" class="sec-divider-link">Ver todos →</a>
    </div>
    <div class="noticias-grid" id="noticias-grid">
      <div style="background:#fff;border-radius:4px;height:280px;display:flex;align-items:center;justify-content:center;color:#ccc;font-size:0.82rem;">Cargando...</div>
      <div style="background:#fff;border-radius:4px;height:280px;"></div>
      <div style="background:#fff;border-radius:4px;height:280px;"></div>
    </div>
  </div>
</section>

<!-- DIRECTORIO -->
<section class="directorio" id="directorio">
  <div class="directorio-inner">
    <div class="sec-divider-inner">
      <span class="sec-divider-label">Directorio Boricua</span>
      <div style="flex:1;height:2px;background:var(--red);margin:0 1rem;"></div>
      <a href="/pb/add-negocio" class="sec-divider-link">Añadir negocio →</a>
    </div>

    <!-- Banner explicativo -->
    <div style="background:linear-gradient(135deg,var(--blue),#001a4d);border-radius:8px;padding:1.2rem 1.5rem;margin:1.2rem 0;display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
      <div style="font-size:1.8rem;">🇵🇷</div>
      <div>
        <div style="font-weight:800;color:#fff;font-size:0.92rem;">Solo negocios y servicios boricuas</div>
        <div style="font-size:0.78rem;color:rgba(255,255,255,0.65);margin-top:0.2rem;">Este directorio es exclusivo para la comunidad puertorriqueña — negocios en PR y la diáspora en USA.</div>
      </div>
      <a href="/pb/add-negocio" style="margin-left:auto;background:var(--red);color:#fff;padding:0.5rem 1rem;border-radius:6px;text-decoration:none;font-size:0.8rem;font-weight:700;white-space:nowrap;">+ Añadir Mi Negocio</a>
    </div>

    <!-- Buscador boricua -->
    <div style="margin:1rem 0;position:relative;">
      <input type="text" id="dir-search" placeholder="¿Qué necesitas? ¿Un plomero? ¿Quién haga bizcochos mojaditos? ¿Un DJ para un party?..." oninput="searchDirectorio()" style="width:100%;padding:0.85rem 1rem 0.85rem 2.8rem;border:2px solid var(--border);border-radius:8px;font-size:0.88rem;font-family:inherit;outline:none;transition:border 0.2s;" onfocus="this.style.borderColor='var(--blue)'" onblur="this.style.borderColor='var(--border)'">
      <span style="position:absolute;left:0.9rem;top:50%;transform:translateY(-50%);font-size:1.1rem;">🔍</span>
    </div>

    <!-- Filtros -->
    <div style="display:flex;flex-wrap:wrap;gap:0.8rem;margin:1rem 0;">
      <select id="dir-filter-location" onchange="loadDirectorio()" style="padding:0.6rem 1rem;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:#fff;cursor:pointer;max-width:220px;">
        <option value="">📍 Todas las ubicaciones</option>
        <optgroup label="🇵🇷 Puerto Rico — Municipios">
          <option value="adjuntas">Adjuntas</option>
          <option value="aguada">Aguada</option>
          <option value="aguadilla">Aguadilla</option>
          <option value="aguas-buenas">Aguas Buenas</option>
          <option value="aibonito">Aibonito</option>
          <option value="anasco">Añasco</option>
          <option value="arecibo">Arecibo</option>
          <option value="arroyo">Arroyo</option>
          <option value="barceloneta">Barceloneta</option>
          <option value="barranquitas">Barranquitas</option>
          <option value="bayamon">Bayamón</option>
          <option value="cabo-rojo">Cabo Rojo</option>
          <option value="caguas">Caguas</option>
          <option value="camuy">Camuy</option>
          <option value="canovanas">Canóvanas</option>
          <option value="carolina">Carolina</option>
          <option value="catano">Cataño</option>
          <option value="cayey">Cayey</option>
          <option value="ceiba">Ceiba</option>
          <option value="ciales">Ciales</option>
          <option value="cidra">Cidra</option>
          <option value="coamo">Coamo</option>
          <option value="comerio">Comerío</option>
          <option value="corozal">Corozal</option>
          <option value="culebra">Culebra</option>
          <option value="dorado">Dorado</option>
          <option value="fajardo">Fajardo</option>
          <option value="florida-pr">Florida</option>
          <option value="guanica">Guánica</option>
          <option value="guayama">Guayama</option>
          <option value="guayanilla">Guayanilla</option>
          <option value="guaynabo">Guaynabo</option>
          <option value="gurabo">Gurabo</option>
          <option value="hatillo">Hatillo</option>
          <option value="hormigueros">Hormigueros</option>
          <option value="humacao">Humacao</option>
          <option value="isabela">Isabela</option>
          <option value="jayuya">Jayuya</option>
          <option value="juana-diaz">Juana Díaz</option>
          <option value="juncos">Juncos</option>
          <option value="lajas">Lajas</option>
          <option value="lares">Lares</option>
          <option value="las-marias">Las Marías</option>
          <option value="las-piedras">Las Piedras</option>
          <option value="loiza">Loíza</option>
          <option value="luquillo">Luquillo</option>
          <option value="manati">Manatí</option>
          <option value="maricao">Maricao</option>
          <option value="maunabo">Maunabo</option>
          <option value="mayaguez">Mayagüez</option>
          <option value="moca">Moca</option>
          <option value="morovis">Morovis</option>
          <option value="naguabo">Naguabo</option>
          <option value="naranjito">Naranjito</option>
          <option value="orocovis">Orocovis</option>
          <option value="patillas">Patillas</option>
          <option value="penuelas">Peñuelas</option>
          <option value="ponce">Ponce</option>
          <option value="quebradillas">Quebradillas</option>
          <option value="rincon">Rincón</option>
          <option value="rio-grande">Río Grande</option>
          <option value="sabana-grande">Sabana Grande</option>
          <option value="salinas">Salinas</option>
          <option value="san-german">San Germán</option>
          <option value="san-juan">San Juan</option>
          <option value="san-lorenzo">San Lorenzo</option>
          <option value="san-sebastian">San Sebastián</option>
          <option value="santa-isabel">Santa Isabel</option>
          <option value="toa-alta">Toa Alta</option>
          <option value="toa-baja">Toa Baja</option>
          <option value="trujillo-alto">Trujillo Alto</option>
          <option value="utuado">Utuado</option>
          <option value="vega-alta">Vega Alta</option>
          <option value="vega-baja">Vega Baja</option>
          <option value="vieques">Vieques</option>
          <option value="villalba">Villalba</option>
          <option value="yabucoa">Yabucoa</option>
          <option value="yauco">Yauco</option>
        </optgroup>
        <optgroup label="🇺🇸 Estados Unidos">
          <option value="alabama">Alabama</option>
          <option value="alaska">Alaska</option>
          <option value="arizona">Arizona</option>
          <option value="arkansas">Arkansas</option>
          <option value="california">California</option>
          <option value="colorado">Colorado</option>
          <option value="connecticut">Connecticut</option>
          <option value="delaware">Delaware</option>
          <option value="florida">Florida</option>
          <option value="georgia">Georgia</option>
          <option value="hawaii">Hawaii</option>
          <option value="idaho">Idaho</option>
          <option value="illinois">Illinois</option>
          <option value="indiana">Indiana</option>
          <option value="iowa">Iowa</option>
          <option value="kansas">Kansas</option>
          <option value="kentucky">Kentucky</option>
          <option value="louisiana">Louisiana</option>
          <option value="maine">Maine</option>
          <option value="maryland">Maryland</option>
          <option value="massachusetts">Massachusetts</option>
          <option value="michigan">Michigan</option>
          <option value="minnesota">Minnesota</option>
          <option value="mississippi">Mississippi</option>
          <option value="missouri">Missouri</option>
          <option value="montana">Montana</option>
          <option value="nebraska">Nebraska</option>
          <option value="nevada">Nevada</option>
          <option value="new-hampshire">New Hampshire</option>
          <option value="new-jersey">New Jersey</option>
          <option value="new-mexico">New Mexico</option>
          <option value="nueva-york">Nueva York</option>
          <option value="north-carolina">North Carolina</option>
          <option value="north-dakota">North Dakota</option>
          <option value="ohio">Ohio</option>
          <option value="oklahoma">Oklahoma</option>
          <option value="oregon">Oregon</option>
          <option value="pennsylvania">Pennsylvania</option>
          <option value="rhode-island">Rhode Island</option>
          <option value="south-carolina">South Carolina</option>
          <option value="south-dakota">South Dakota</option>
          <option value="tennessee">Tennessee</option>
          <option value="texas">Texas</option>
          <option value="utah">Utah</option>
          <option value="vermont">Vermont</option>
          <option value="virginia">Virginia</option>
          <option value="washington">Washington</option>
          <option value="west-virginia">West Virginia</option>
          <option value="wisconsin">Wisconsin</option>
          <option value="wyoming">Wyoming</option>
          <option value="washington-dc">Washington D.C.</option>
        </optgroup>
      </select>
      <select id="dir-filter-category" onchange="loadDirectorio()" style="padding:0.6rem 1rem;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:#fff;cursor:pointer;">
        <option value="">🏪 Todas las categorías</option>
        <option value="restaurante">🍽️ Restaurante</option>
        <option value="food-truck">🚚 Food Truck</option>
        <option value="panaderia">🥐 Panadería</option>
        <option value="barberia">💈 Barbería</option>
        <option value="salon">💅 Salón de Belleza</option>
        <option value="tienda">🛍️ Tienda</option>
        <option value="servicios">🔧 Servicios</option>
        <option value="musica">🎵 Música</option>
        <option value="salud">🏥 Salud</option>
        <option value="transporte">🚗 Transporte</option>
        <option value="otro">📦 Otro</option>
      </select>
    </div>

    <!-- Listado dinámico compacto -->
    <div id="directorio-grid" class="directorio-grid">
      <div style="text-align:center;padding:2rem;color:var(--mid);">
        <div style="font-size:2rem;margin-bottom:0.5rem;">⏳</div>
        <div>Cargando directorio...</div>
      </div>
    </div>

    <div class="directorio-cta">
      <a href="/pb/add-negocio" class="btn-outline-dark">🇵🇷 Añadir Mi Negocio</a>
    </div>
  </div>
</section>

<script>
const categoryIcons = {
  'restaurante': '🍽️',
  'food-truck': '🚚',
  'panaderia': '🥐',
  'barberia': '💈',
  'salon': '💅',
  'tienda': '🛍️',
  'servicios': '🔧',
  'musica': '🎵',
  'salud': '🏥',
  'transporte': '🚗',
  'otro': '📦'
};

function searchDirectorio() {
  const term = document.getElementById('dir-search').value.trim().toLowerCase();
  const grid = document.getElementById('directorio-grid');
  const cards = grid.querySelectorAll('.dir-card');

  if (cards.length === 0) {
    // No cards yet, trigger full reload with search
    loadDirectorio();
    return;
  }

  let visible = 0;
  cards.forEach(function(card) {
    const text = card.textContent.toLowerCase();
    if (!term || text.includes(term)) {
      card.style.display = '';
      visible++;
    } else {
      card.style.display = 'none';
    }
  });

  // If nothing visible, show viral message
  if (visible === 0) {
    var emptyMsg = '¡Ay bendito! No tenemos <strong>' + document.getElementById('dir-search').value.trim() + '</strong> boricua por aquí todavía... ¿Conoces uno? Comparte este enlace con él 👇';
    var existing = grid.querySelector('.dir-empty');
    if (!existing) {
      var div = document.createElement('div');
      div.className = 'dir-empty';
      div.style.cssText = 'text-align:center;padding:3rem;color:var(--mid);';
      div.innerHTML = '<div style="font-size:3rem;margin-bottom:1rem;">🇵🇷</div>' +
        '<div style="font-size:1rem;color:var(--dark);margin-bottom:1.5rem;line-height:1.6;">' + emptyMsg + '</div>' +
        '<a href="/pb/add-negocio" style="display:inline-block;background:var(--blue);color:#fff;padding:0.8rem 1.5rem;border-radius:8px;text-decoration:none;font-weight:700;font-size:0.9rem;">🇵🇷 Añadir Mi Negocio →</a>';
      grid.appendChild(div);
    }
  } else {
    var existing = grid.querySelector('.dir-empty');
    if (existing) existing.remove();
  }
}

async function loadDirectorio() {
  const location = document.getElementById('dir-filter-location').value;
  const category = document.getElementById('dir-filter-category').value;
  const grid = document.getElementById('directorio-grid');

  grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--mid);"><div style="font-size:2rem;margin-bottom:0.5rem;">⏳</div><div>Buscando negocios...</div></div>';

  try {
    const url = location
      ? '/api/pb-negocios/' + location + (category ? '?category=' + category : '')
      : '/api/pb-negocios/all' + (category ? '?category=' + category : '');

    const res = await fetch(url);
    const data = await res.json();
    const negocios = data.negocios || [];

    // Filter by category client-side if no location selected
    const filtered = category && !location
      ? negocios.filter(n => n.category === category)
      : negocios;

    if (filtered.length === 0) {
      var searchTerm = document.getElementById('dir-search') ? document.getElementById('dir-search').value.trim() : '';
      var emptyMsg = searchTerm
        ? '¡Ay bendito! No tenemos <strong>' + searchTerm + '</strong> boricua por aquí todavía... ¿Conoces uno? Comparte este enlace con él 👇'
        : '¡Wepa! Todavía no hay negocios en esta categoría. ¡Sé el primero en aparecer aquí!';
      grid.innerHTML = '<div style="text-align:center;padding:3rem;color:var(--mid);">' +
        '<div style="font-size:3rem;margin-bottom:1rem;">🇵🇷</div>' +
        '<div style="font-size:1rem;color:var(--dark);margin-bottom:1.5rem;line-height:1.6;">' + emptyMsg + '</div>' +
        '<a href="/pb/add-negocio" style="display:inline-block;background:var(--blue);color:#fff;padding:0.8rem 1.5rem;border-radius:8px;text-decoration:none;font-weight:700;font-size:0.9rem;">🇵🇷 Añadir Mi Negocio →</a>' +
        '</div>';
      return;
    }

    // Sort: destacado first, then by date
    filtered.sort(function(a,b){
      if (a.destacado && !b.destacado) return -1;
      if (!a.destacado && b.destacado) return 1;
      return 0;
    });

    grid.innerHTML = filtered.map(function(n) {
      var icon = categoryIcons[n.category] || '🏪';
      var locationStr = n.city + (n.location ? ', ' + n.location : '');
      var contactHtml = '';
      if (n.whatsapp) contactHtml += '<a href="https://wa.me/' + n.whatsapp.replace(/\D/g,'') + '" target="_blank" style="font-size:0.72rem;color:#25D366;text-decoration:none;font-weight:700;margin-right:0.8rem;">📲 WhatsApp</a>';
      if (n.website) contactHtml += '<a href="' + n.website + '" target="_blank" style="font-size:0.72rem;color:var(--blue);text-decoration:none;font-weight:700;margin-right:0.8rem;">🌐 Web</a>';
      if (n.instagram) contactHtml += '<a href="https://instagram.com/' + n.instagram.replace('@','') + '" target="_blank" style="font-size:0.72rem;color:#E1306C;text-decoration:none;font-weight:700;">📷 IG</a>';
      var badgeHtml = n.destacado
        ? '<span style="font-size:0.68rem;background:#f0c040;color:#7a5c00;padding:0.15rem 0.5rem;border-radius:3px;font-weight:800;text-transform:uppercase;margin-left:0.5rem;">⭐ Destacado</span>'
        : (n.badge === 'boricua-verificado' ? '<span style="font-size:0.68rem;background:#e8f5e9;color:#2e7d32;padding:0.15rem 0.5rem;border-radius:3px;font-weight:700;margin-left:0.5rem;">🏅 Verificado</span>' : '');
      return '<div class="dir-card' + (n.destacado ? ' destacado' : '') + '">' +
        '<div style="font-size:1.4rem;min-width:2rem;text-align:center;">' + icon + '</div>' +
        '<div style="flex:1;min-width:0;">' +
        '<div style="display:flex;align-items:center;flex-wrap:wrap;">' +
        '<span style="font-weight:700;font-size:0.9rem;color:var(--dark);">' + n.name + '</span>' +
        badgeHtml +
        '</div>' +
        '<div style="font-size:0.75rem;color:var(--mid);margin-top:0.15rem;">📍 ' + locationStr + ' · ' + icon + ' ' + n.category + '</div>' +
        (n.desc ? '<div style="font-size:0.78rem;color:#555;margin-top:0.3rem;line-height:1.4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + n.desc + '</div>' : '') +
        (contactHtml ? '<div style="margin-top:0.4rem;">' + contactHtml + '</div>' : '') +
        '</div>' +
        '</div>';
    }).join('');

  } catch(e) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--mid);">Error cargando directorio. Intenta de nuevo.</div>';
  }
}

// Load on page start
loadDirectorio();
</script>

<!-- ADSENSE MID -->
<div class="ad-strip">
  <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-8301223085122981" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>



<!-- RECURSOS -->
<section style="background:linear-gradient(135deg,var(--blue),#001a4d);padding:2rem 0;">
  <div style="max-width:1200px;margin:0 auto;padding:0 2rem;display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center;" class="recursos-inner">
    <div>
      <div style="font-size:0.65rem;font-weight:800;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:0.6rem;">Centro de Recursos</div>
      <h2 style="font-family:'Playfair Display',serif;font-size:clamp(1.5rem,2.5vw,2rem);font-weight:800;color:#fff;margin-bottom:0.8rem;line-height:1.2;">¿Te mudas entre PR y USA? <span style="color:#f5c842;">Tenemos tu guía.</span></h2>
      <p style="font-size:0.88rem;color:rgba(255,255,255,0.65);line-height:1.7;margin-bottom:1.5rem;">Licencias de conducir por estado, mudanzas, escuelas, servicios públicos, bancos, crédito y más — todo en español boricua y verificado.</p>
      <a href="/recursos" style="display:inline-flex;align-items:center;gap:0.5rem;background:#CE1126;color:#fff;padding:0.75rem 1.5rem;border-radius:4px;font-size:0.88rem;font-weight:700;text-decoration:none;margin-right:0.8rem;">PR → USA 🇺🇸</a><a href="/regresar-a-pr" style="display:inline-flex;align-items:center;gap:0.5rem;background:#002D62;color:#fff;padding:0.75rem 1.5rem;border-radius:4px;font-size:0.88rem;font-weight:700;text-decoration:none;">USA → PR 🇵🇷</a>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.8rem;">
      <div style="background:rgba(255,255,255,0.08);border-radius:6px;padding:1rem;text-align:center;">
        <div style="font-size:1.5rem;margin-bottom:0.3rem;">🚗</div>
        <div style="font-size:0.78rem;font-weight:700;color:#fff;">Licencias</div>
        <div style="font-size:0.68rem;color:rgba(255,255,255,0.5);">6 estados</div>
      </div>
      <div style="background:rgba(255,255,255,0.08);border-radius:6px;padding:1rem;text-align:center;">
        <div style="font-size:1.5rem;margin-bottom:0.3rem;">🚚</div>
        <div style="font-size:0.78rem;font-weight:700;color:#fff;">Mudanzas</div>
        <div style="font-size:0.68rem;color:rgba(255,255,255,0.5);">PR ↔ USA</div>
      </div>
      <div style="background:rgba(255,255,255,0.08);border-radius:6px;padding:1rem;text-align:center;">
        <div style="font-size:1.5rem;margin-bottom:0.3rem;">🏦</div>
        <div style="font-size:0.78rem;font-weight:700;color:#fff;">Bancos</div>
        <div style="font-size:0.68rem;color:rgba(255,255,255,0.5);">Crédito & finanzas</div>
      </div>
      <div style="background:rgba(255,255,255,0.08);border-radius:6px;padding:1rem;text-align:center;">
        <div style="font-size:1.5rem;margin-bottom:0.3rem;">🏥</div>
        <div style="font-size:0.78rem;font-weight:700;color:#fff;">Salud</div>
        <div style="font-size:0.68rem;color:rgba(255,255,255,0.5);">Seguros médicos</div>
      </div>
    </div>
  </div>
</section>

<!-- NAYELI -->
<section class="nayeli-section" id="nayeli" style="display:none;">
  <div class="nayeli-inner">
    <div>
      <div class="nayeli-eyebrow">Asistente IA Boricua</div>
      <h2 class="nayeli-title">Conoce a <span class="accent">Nayeli</span> 🇵🇷</h2>
      <p class="nayeli-sub">Nayeli es tu asistente de IA boricua — habla tu idioma, entiende tu cultura y está aquí para ayudarte con todo lo de Puerto Rico y la diáspora.</p>
      <ul class="nayeli-features">
        <li>Noticias y temas de Puerto Rico al instante</li>
        <li>Encuentra negocios boricuas cerca de ti</li>
        <li>Planifica tu viaje a la isla</li>
        <li>Responde en español boricua naturalmente</li>
        <li>Disponible 24/7 — como la buena gente de PR</li>
      </ul>
      <a href="#" class="btn-white">Habla con Nayeli →</a>
    </div>
    <div class="nayeli-chat">
      <div class="nayeli-chat-header">
        <img src="/img/nayeli.jpg" alt="Nayeli" style="width:44px;height:44px;border-radius:50%;object-fit:cover;object-position:top;border:2px solid rgba(255,255,255,0.3);flex-shrink:0;">
        <div>
          <div class="nayeli-name">Nayeli — Asistente Boricua</div>
          <div class="nayeli-online">● En línea · Tu asistente boricua 🇵🇷</div>
        </div>
      </div>
      <div class="nayeli-msgs" id="nayeliMsgs">
        <div class="n-msg n-bot">¡Wepa! 🇵🇷 Soy Nayeli, tu asistente boricua. ¿Cómo te llamas?</div>
      </div>
      <div class="nayeli-input-row">
        <input class="nayeli-input" id="nayeliInput" placeholder="Pregúntame lo que quieras..." onkeydown="if(event.key==='Enter')nayeliSend()">
        <button class="nayeli-send" onclick="nayeliSend()">➤</button>
      </div>
    </div>
  </div>
</section>

<!-- TIENDA BORICUA -->
<section style="background:#fff;padding:2rem 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);">
  <div style="max-width:1200px;margin:0 auto;padding:0 2rem;">
    <div class="sec-divider-inner">
      <div style="display:flex;align-items:center;gap:0.6rem;">
        <span style="font-size:1.3rem;">🛍️</span>
        <span class="sec-divider-label">Tienda Boricua</span>
      </div>
      <div style="flex:1;height:2px;background:var(--red);margin:0 1rem;"></div>
      <a href="https://www.amazon.com/shop/planetaboricua" target="_blank" class="sec-divider-link">Ver toda la tienda →</a>
    </div>
    <p style="font-size:0.88rem;color:var(--mid);line-height:1.7;margin:1rem 0 1.5rem;">
      Productos boricuas con orgullo 🇵🇷 — disponibles en Amazon con entrega rápida en USA y Puerto Rico.
    </p>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
      <a href="https://www.amazon.com/shop/planetaboricua/list/1W420Q1BXBM69?tag=ivansoto0f-20" target="_blank" style="text-decoration:none;background:var(--light);border:1px solid var(--border);border-radius:8px;padding:1.2rem;text-align:center;transition:all 0.2s;display:block;">
        <div style="font-size:2rem;margin-bottom:0.5rem;">👕</div>
        <div style="font-size:0.82rem;font-weight:700;color:var(--dark);">Camisetas de PR</div>
        <div style="font-size:0.7rem;color:var(--mid);margin-top:0.2rem;">226 productos</div>
      </a>
      <a href="https://www.amazon.com/shop/planetaboricua/list/2CXBDURUV9G46?tag=ivansoto0f-20" target="_blank" style="text-decoration:none;background:var(--light);border:1px solid var(--border);border-radius:8px;padding:1.2rem;text-align:center;transition:all 0.2s;display:block;">
        <div style="font-size:2rem;margin-bottom:0.5rem;">🧢</div>
        <div style="font-size:0.82rem;font-weight:700;color:var(--dark);">Gorras de PR</div>
        <div style="font-size:0.7rem;color:var(--mid);margin-top:0.2rem;">121 productos</div>
      </a>
      <a href="https://www.amazon.com/shop/planetaboricua/list/1A33AK8DLTYDO?tag=ivansoto0f-20" target="_blank" style="text-decoration:none;background:var(--light);border:1px solid var(--border);border-radius:8px;padding:1.2rem;text-align:center;transition:all 0.2s;display:block;">
        <div style="font-size:2rem;margin-bottom:0.5rem;">☕</div>
        <div style="font-size:0.82rem;font-weight:700;color:var(--dark);">Tazas y Termos</div>
        <div style="font-size:0.7rem;color:var(--mid);margin-top:0.2rem;">63 productos</div>
      </a>
      <a href="https://www.amazon.com/shop/planetaboricua/list/GVPOWIBQMA3B?tag=ivansoto0f-20" target="_blank" style="text-decoration:none;background:var(--light);border:1px solid var(--border);border-radius:8px;padding:1.2rem;text-align:center;transition:all 0.2s;display:block;">
        <div style="font-size:2rem;margin-bottom:0.5rem;">🌿</div>
        <div style="font-size:0.82rem;font-weight:700;color:var(--dark);">Cocina Criolla</div>
        <div style="font-size:0.7rem;color:var(--mid);margin-top:0.2rem;">33 productos</div>
      </a>
      <a href="https://www.amazon.com/shop/planetaboricua/list/2W7GCH9PJ1D9B?tag=ivansoto0f-20" target="_blank" style="text-decoration:none;background:var(--light);border:1px solid var(--border);border-radius:8px;padding:1.2rem;text-align:center;transition:all 0.2s;display:block;">
        <div style="font-size:2rem;margin-bottom:0.5rem;">🍬</div>
        <div style="font-size:0.82rem;font-weight:700;color:var(--dark);">Dulces de la Isla</div>
        <div style="font-size:0.7rem;color:var(--mid);margin-top:0.2rem;">46 productos</div>
      </a>
      <a href="https://www.amazon.com/shop/planetaboricua/list/3PF9YAQ8MKRCO?tag=ivansoto0f-20" target="_blank" style="text-decoration:none;background:var(--light);border:1px solid var(--border);border-radius:8px;padding:1.2rem;text-align:center;transition:all 0.2s;display:block;">
        <div style="font-size:2rem;margin-bottom:0.5rem;">🐾</div>
        <div style="font-size:0.82rem;font-weight:700;color:var(--dark);">Boricuas de 4 Patas</div>
        <div style="font-size:0.7rem;color:var(--mid);margin-top:0.2rem;">40 productos</div>
      </a>
      <a href="https://www.amazon.com/shop/planetaboricua/list/1UY29IVPZQ34Y?tag=ivansoto0f-20" target="_blank" style="text-decoration:none;background:var(--light);border:1px solid var(--border);border-radius:8px;padding:1.2rem;text-align:center;transition:all 0.2s;display:block;">
        <div style="font-size:2rem;margin-bottom:0.5rem;">💍</div>
        <div style="font-size:0.82rem;font-weight:700;color:var(--dark);">Joyería Boricua</div>
        <div style="font-size:0.7rem;color:var(--mid);margin-top:0.2rem;">20 productos</div>
      </a>
      <a href="https://www.amazon.com/shop/planetaboricua/list/1Q6CYDE5BV80P?tag=ivansoto0f-20" target="_blank" style="text-decoration:none;background:var(--light);border:1px solid var(--border);border-radius:8px;padding:1.2rem;text-align:center;transition:all 0.2s;display:block;">
        <div style="font-size:2rem;margin-bottom:0.5rem;">🚗</div>
        <div style="font-size:0.82rem;font-weight:700;color:var(--dark);">Para Tu Auto</div>
        <div style="font-size:0.7rem;color:var(--mid);margin-top:0.2rem;">87 productos</div>
      </a>
    </div>
    <div style="text-align:center;">
      <a href="https://www.amazon.com/shop/planetaboricua" target="_blank" style="display:inline-flex;align-items:center;gap:0.5rem;background:var(--red);color:#fff;padding:0.75rem 2rem;border-radius:4px;font-size:0.88rem;font-weight:700;text-decoration:none;">
        🛒 Ver Toda la Tienda Boricua en Amazon →
      </a>
    </div>
  </div>
</section>

<!-- VIAJES -->
<section class="viajes" id="viajes">
  <div class="viajes-inner">
    <div class="sec-divider-inner">
      <span class="sec-divider-label">Viajes & Destinos</span>
      <div style="flex:1;height:2px;background:var(--red);margin:0 1rem;"></div>
      <span style="font-size:0.72rem;color:var(--mid);">Powered by Trip.com</span>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-top:1.5rem;">

      <a href="https://us.trip.com/hotels/list?flexType=1&cityId=-1&countryId=208&destName=Puerto%20Rico&searchType=C&optionId=208&crn=1&adult=2&curr=USD&locale=es-US&SID=2209817&allianceid=1094387&utm_campaign=520530" target="_blank" rel="noopener" style="text-decoration:none;color:inherit;background:#fff;border-radius:10px;overflow:hidden;border:1px solid var(--border);display:block;">
        <div id="vimg-pr" style="height:140px;background:linear-gradient(135deg,#002D62,#CE1126);display:flex;align-items:center;justify-content:center;font-size:3rem;background-size:cover;background-position:center;">🇵🇷</div>
        <div style="padding:1rem;">
          <div style="font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem;">Destino Principal</div>
          <div style="font-size:0.9rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;">Puerto Rico</div>
          <div style="font-size:0.75rem;color:var(--mid);margin-bottom:0.5rem;">La Isla del Encanto</div>
          <div style="font-size:0.75rem;font-weight:700;color:var(--blue);">Ver hoteles →</div>
        </div>
      </a>

      <a href="https://us.trip.com/hotels/list?flexType=1&cityId=633&countryId=66&destName=Nueva%20York&searchType=CT&optionId=633&crn=1&adult=2&curr=USD&locale=es-US&SID=2209817&allianceid=1094387&utm_campaign=520530" target="_blank" rel="noopener" style="text-decoration:none;color:inherit;background:#fff;border-radius:10px;overflow:hidden;border:1px solid var(--border);display:block;">
        <div id="vimg-ny" style="height:140px;background:linear-gradient(135deg,#1a1a2e,#4a4a6e);display:flex;align-items:center;justify-content:center;font-size:3rem;background-size:cover;background-position:center;">🗽</div>
        <div style="padding:1rem;">
          <div style="font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem;">La Gran Manzana</div>
          <div style="font-size:0.9rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;">Nueva York</div>
          <div style="font-size:0.75rem;color:var(--mid);margin-bottom:0.5rem;">El Barrio, El Bronx, Brooklyn</div>
          <div style="font-size:0.75rem;font-weight:700;color:var(--blue);">Ver hoteles →</div>
        </div>
      </a>

      <a href="https://us.trip.com/hotels/list?flexType=1&cityId=1187&countryId=66&destName=Orlando&searchType=CT&optionId=1187&crn=1&adult=2&curr=USD&locale=es-US&SID=2209817&allianceid=1094387&utm_campaign=520530" target="_blank" rel="noopener" style="text-decoration:none;color:inherit;background:#fff;border-radius:10px;overflow:hidden;border:1px solid var(--border);display:block;">
        <div id="vimg-orlando" style="height:140px;background:linear-gradient(135deg,#0077b6,#00b4d8);display:flex;align-items:center;justify-content:center;font-size:3rem;background-size:cover;background-position:center;">🎢</div>
        <div style="padding:1rem;">
          <div style="font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem;">Florida</div>
          <div style="font-size:0.9rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;">Orlando</div>
          <div style="font-size:0.75rem;color:var(--mid);margin-bottom:0.5rem;">Parques y comunidad boricua</div>
          <div style="font-size:0.75rem;font-weight:700;color:var(--blue);">Ver hoteles →</div>
        </div>
      </a>

      <a href="https://us.trip.com/hotels/list?flexType=1&cityId=20436&countryId=66&destName=Miami&searchType=CT&optionId=20436&crn=1&adult=2&curr=USD&locale=es-US&SID=2209817&allianceid=1094387&utm_campaign=520530" target="_blank" rel="noopener" style="text-decoration:none;color:inherit;background:#fff;border-radius:10px;overflow:hidden;border:1px solid var(--border);display:block;">
        <div id="vimg-miami" style="height:140px;background:linear-gradient(135deg,#f77f00,#d62828);display:flex;align-items:center;justify-content:center;font-size:3rem;background-size:cover;background-position:center;">🌊</div>
        <div style="padding:1rem;">
          <div style="font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem;">Sur de Florida</div>
          <div style="font-size:0.9rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;">Miami</div>
          <div style="font-size:0.75rem;color:var(--mid);margin-bottom:0.5rem;">Playas y cultura latina</div>
          <div style="font-size:0.75rem;font-weight:700;color:var(--blue);">Ver hoteles →</div>
        </div>
      </a>

      <a href="https://us.trip.com/hotels/list?flexType=1&cityId=5677&countryId=276&destName=Punta%20Cana&searchType=CT&optionId=5677&crn=1&adult=2&curr=USD&locale=es-US&SID=2209817&allianceid=1094387&utm_campaign=520530" target="_blank" rel="noopener" style="text-decoration:none;color:inherit;background:#fff;border-radius:10px;overflow:hidden;border:1px solid var(--border);display:block;">
        <div id="vimg-puntacana" style="height:140px;background:linear-gradient(135deg,#2ec4b6,#0077b6);display:flex;align-items:center;justify-content:center;font-size:3rem;background-size:cover;background-position:center;">🇩🇴</div>
        <div style="padding:1rem;">
          <div style="font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem;">Caribe</div>
          <div style="font-size:0.9rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;">Punta Cana</div>
          <div style="font-size:0.75rem;color:var(--mid);margin-bottom:0.5rem;">Rep. Dominicana all-inclusive</div>
          <div style="font-size:0.75rem;font-weight:700;color:var(--blue);">Ver hoteles →</div>
        </div>
      </a>

      <a href="https://us.trip.com/hotels/list?flexType=1&cityId=-1&countryId=37&destName=Colombia&searchType=C&optionId=37&crn=1&adult=2&curr=USD&locale=es-US&SID=2209817&allianceid=1094387&utm_campaign=520530" target="_blank" rel="noopener" style="text-decoration:none;color:inherit;background:#fff;border-radius:10px;overflow:hidden;border:1px solid var(--border);display:block;">
        <div id="vimg-colombia" style="height:140px;background:linear-gradient(135deg,#fcbf49,#d62828);display:flex;align-items:center;justify-content:center;font-size:3rem;background-size:cover;background-position:center;">🇨🇴</div>
        <div style="padding:1rem;">
          <div style="font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem;">Sudamérica</div>
          <div style="font-size:0.9rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;">Colombia</div>
          <div style="font-size:0.75rem;color:var(--mid);margin-bottom:0.5rem;">Cartagena, Medellín, Bogotá</div>
          <div style="font-size:0.75rem;font-weight:700;color:var(--blue);">Ver hoteles →</div>
        </div>
      </a>

      <a href="https://us.trip.com/hotels/list?flexType=1&cityId=357&countryId=95&destName=Madrid&searchType=CT&optionId=357&crn=1&adult=2&curr=USD&locale=es-US&SID=2209817&allianceid=1094387&utm_campaign=520530" target="_blank" rel="noopener" style="text-decoration:none;color:inherit;background:#fff;border-radius:10px;overflow:hidden;border:1px solid var(--border);display:block;">
        <div id="vimg-madrid" style="height:140px;background:linear-gradient(135deg,#c8102e,#ffd700);display:flex;align-items:center;justify-content:center;font-size:3rem;background-size:cover;background-position:center;">🇪🇸</div>
        <div style="padding:1rem;">
          <div style="font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem;">Europa</div>
          <div style="font-size:0.9rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;">Madrid</div>
          <div style="font-size:0.75rem;color:var(--mid);margin-bottom:0.5rem;">España — puerta a Europa</div>
          <div style="font-size:0.75rem;font-weight:700;color:var(--blue);">Ver hoteles →</div>
        </div>
      </a>

      <a href="https://us.trip.com/?SID=2209817&allianceid=1094387&utm_campaign=520530&locale=es-US" target="_blank" rel="noopener" style="text-decoration:none;color:inherit;background:linear-gradient(135deg,var(--blue),#001a4d);border-radius:10px;overflow:hidden;border:1px solid var(--blue);display:block;">
        <div id="vimg-generic" style="height:140px;display:flex;align-items:center;justify-content:center;font-size:3rem;background-size:cover;background-position:center;">🗺️</div>
        <div style="padding:1rem;">
          <div style="font-size:0.6rem;font-weight:800;color:rgba(255,255,255,0.6);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem;">Busca tu destino</div>
          <div style="font-size:0.9rem;font-weight:700;color:#fff;margin-bottom:0.3rem;">A donde quieres ir?</div>
          <div style="font-size:0.75rem;color:rgba(255,255,255,0.7);margin-bottom:0.5rem;">Hoteles y vuelos a cualquier destino</div>
          <div style="font-size:0.75rem;font-weight:700;color:#f5c842;">Buscar ahora →</div>
        </div>
      </a>

    </div>
  </div>
</section>

<script>
(async function loadViajesPhotos() {
  var destinations = [
    { id: 'vimg-pr', q: 'Puerto Rico beach San Juan' },
    { id: 'vimg-ny', q: 'New York City Manhattan skyline' },
    { id: 'vimg-orlando', q: 'Orlando Florida theme parks' },
    { id: 'vimg-miami', q: 'Miami Beach Florida ocean' },
    { id: 'vimg-puntacana', q: 'Punta Cana Dominican Republic beach' },
    { id: 'vimg-colombia', q: 'Cartagena Colombia colorful' },
    { id: 'vimg-madrid', q: 'Madrid Spain Gran Via' },
    { id: 'vimg-generic', q: 'couple travel adventure map' }
  ];
  for (var i = 0; i < destinations.length; i++) {
    try {
      var res = await fetch('/api/place-photo?q=' + encodeURIComponent(destinations[i].q));
      var data = await res.json();
      if (data.url) {
        var el = document.getElementById(destinations[i].id);
        if (el) {
          el.style.backgroundImage = 'url(' + data.url + ')';
          el.style.backgroundSize = 'cover';
          el.style.backgroundPosition = 'center';
          el.innerHTML = '';
        }
      }
    } catch(e) {}
  }
})();
</script>

<!-- NEWSLETTER -->
<section class="newsletter" id="newsletter">
  <div class="newsletter-inner">
    <div class="newsletter-eyebrow">Newsletter</div>
    <h2>Lo Boricua <em>Directo</em> a Tu Email</h2>
    <p>Noticias de PR, cultura, negocios boricuas y más — cada semana en tu correo. Sin spam, solo lo bueno.</p>
    <div class="newsletter-form">
      <input class="newsletter-input" id="nlEmail" type="email" placeholder="tu@email.com">
      <button class="newsletter-btn" onclick="nlSubscribe()">Suscribirme →</button>
    </div>
    <div class="newsletter-note">Sin spam. Cancela cuando quieras. ¡Wepa! 🇵🇷</div>
    <div id="nlMsg" style="margin-top:1rem;font-size:0.85rem;color:#ff6b7a;display:none;"></div>
  </div>
</section>

<!-- FOOTER -->
<footer class="pb-footer">
  <div class="pb-footer-main">
    <div class="pb-footer-brand">
      <div class="pb-footer-logo">🇵🇷 Planeta Boricua</div>
      <div class="pb-footer-tagline">Más Boricua Que Un Mofongo</div>
      <div class="pb-footer-social">
        <a href="https://www.tiktok.com/@planetaboricua4" target="_blank">📱</a>
        <a href="https://www.instagram.com/miplanetaboricua" target="_blank">📸</a>
        <a href="https://www.facebook.com/elplanetaboricua" target="_blank">👍</a>
      </div>
    </div>
    <div class="pb-footer-col">
      <h4>Portal</h4>
      <a href="#noticias">Noticias</a>
      <a href="#directorio">Directorio Boricua</a>
      <a href="/recursos">Recursos PR↔USA</a>
      <a href="/regresar-a-pr">Regresar a PR</a>
      <a href="#nayeli">Nayeli AI</a>
      <a href="#viajes">Viajes a PR</a>
    </div>
    <div class="pb-footer-col">
      <h4>Comunidad</h4>
      <a href="/pb/add-negocio">Añadir Mi Negocio</a>
      <a href="#">Enviar Noticia</a>
      <a href="#newsletter">Newsletter</a>
      <a href="#">Contacto</a>
    </div>
    <div class="pb-footer-col">
      <h4>Legal</h4>
      <a href="/privacidad-boricua">Privacidad</a>
      <a href="/terminos-boricua">Términos</a>
      <a href="/afiliados-boricua">Aviso de Afiliados</a>
    </div>
  </div>
  <div class="pb-footer-bottom">
    <div class="pb-footer-bottom-inner">
      <div class="pb-footer-copy">© 2026 Planeta Boricua · masboricuaqueunmofongo.com · Todos los derechos reservados</div>
      <div class="pb-footer-ivamar">Un producto de <a href="https://ivamarai.com" target="_blank">Ivamar AI LLC</a></div>
    </div>
  </div>
</footer>

<script>
// Blog Feed
(function(){
  fetch('/api/planetaboricua-blog')
    .then(r => r.json())
    .then(posts => {
      if (!posts || !posts.length) return;

      // Hero main — first post WITH image, fallback to first post
      const heroPost = posts.find(p => p.img) || posts[0];
      const heroImg = document.getElementById('hero-main-img');
      if (heroPost.img) {
        heroImg.outerHTML = '<img id="hero-main-img" src="' + heroPost.img + '" alt="' + heroPost.title + '" style="width:100%;height:320px;object-fit:cover;border-radius:4px;margin-bottom:1rem;">';
      }
      document.getElementById('hero-main-cat').textContent = heroPost.tag;
      document.getElementById('hero-main-title').textContent = heroPost.title;
      document.getElementById('hero-main-excerpt').textContent = heroPost.summary;
      document.getElementById('hero-main-date').textContent = heroPost.date;
      document.getElementById('hero-main-link').href = heroPost.link;

      // Hero sidebar — remaining posts excluding hero
      const sidebarPosts = posts.filter(p => p.link !== heroPost.link).slice(0, 4);
      const sidebar = document.getElementById('hero-sidebar');
      sidebar.innerHTML = sidebarPosts.map((p, i) =>
        '<a href="' + p.link + '" target="_blank" class="hero-side-card">' +
        '<div class="hero-side-num">0' + (i + 1) + '</div>' +
        '<div class="hero-side-cat">' + p.tag + '</div>' +
        '<div class="hero-side-title">' + p.title + '</div>' +
        '<div class="hero-side-date">' + p.date + '</div>' +
        '</a>'
      ).join('');

      // Noticias grid — blog posts (all except hero)
      const grid = document.getElementById('noticias-grid');
      const noticiaPosts = posts.filter(p => p.link !== heroPost.link).slice(0, 3);
      grid.innerHTML = noticiaPosts.map(p =>
        '<a href="' + p.link + '" target="_blank" class="noticia-card">' +
        '<div class="noticia-img">' +
        (p.img ? '<img src="' + p.img + '" alt="' + p.title + '">' : '<div style="width:100%;height:100%;background:linear-gradient(135deg,var(--blue),var(--red));display:flex;align-items:center;justify-content:center;font-size:2.5rem;">🇵🇷</div>') +
        '</div>' +
        '<div class="noticia-body">' +
        '<div class="noticia-cat">' + p.tag + '</div>' +
        '<div class="noticia-title">' + p.title + '</div>' +
        '<div class="noticia-excerpt">' + p.summary + '</div>' +
        '<div class="noticia-date">' + p.date + '</div>' +
        '</div></a>'
      ).join('');
    })
    .catch(e => console.log('Blog error:', e));
})();


// Noticias en Vivo
fetch('/api/noticias-pr')
  .then(r => r.json())
  .then(noticias => {
    const grid = document.getElementById('noticias-vivo-grid');
    if (!grid || !noticias.length) return;
    grid.innerHTML = noticias.slice(0, 12).map(n =>
      '<a href="' + n.link + '" target="_blank" rel="noopener" class="noticia-vivo-card">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;">' +
      '<span class="noticia-vivo-source">' + n.source + '</span>' +
      '<span class="noticia-vivo-cat">' + n.categoria + '</span>' +
      '</div>' +
      (n.img ? '<img src="' + n.img + '" alt="" style="width:100%;height:160px;object-fit:cover;display:block;">' : '') +
      '<div class="noticia-vivo-body">' +
      '<div class="noticia-vivo-title">' + n.title + '</div>' +
      (n.summary && n.summary !== '...' ? '<div class="noticia-vivo-summary">' + n.summary + '</div>' : '') +
      '<div class="noticia-vivo-date">' + n.date + '</div>' +
      '</div></a>'
    ).join('');
  })
  .catch(e => console.log('Noticias error:', e));

// Nayeli Chat
let nayeliHistory = [];
let nayeliEmailCaptured = false;
async function nayeliSend() {
  const input = document.getElementById('nayeliInput');
  const msgs = document.getElementById('nayeliMsgs');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  const userMsg = document.createElement('div');
  userMsg.className = 'n-msg n-user';
  userMsg.textContent = text;
  msgs.appendChild(userMsg);
  msgs.scrollTop = msgs.scrollHeight;
  const typing = document.createElement('div');
  typing.className = 'n-msg n-bot';
  typing.textContent = '...';
  msgs.appendChild(typing);
  msgs.scrollTop = msgs.scrollHeight;
  try {
    const res = await fetch('/api/nayeli', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history: nayeliHistory })
    });
    const data = await res.json();
    const reply = data.reply || '¡Ay bendito! Intenta de nuevo.';
    typing.textContent = reply;

    // Save to history
    nayeliHistory.push({ role: 'user', content: text });
    nayeliHistory.push({ role: 'assistant', content: reply });

    // Keep history manageable (last 10 exchanges)
    if (nayeliHistory.length > 20) nayeliHistory = nayeliHistory.slice(-20);

    // Email capture after 2+ exchanges - check if reply mentions email
    if (nayeliHistory.length >= 4 && !nayeliEmailCaptured) {
      const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
      if (emailMatch) {
        nayeliEmailCaptured = true;
        await fetch('/api/nayeli', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailMatch[0], history: nayeliHistory })
        });
      }
    }
  } catch {
    typing.textContent = '¡Wepa! Algo salió mal. Intenta de nuevo 🇵🇷';
  }
  msgs.scrollTop = msgs.scrollHeight;
}

// Newsletter
async function nlSubscribe() {
  const email = document.getElementById('nlEmail').value.trim();
  const msg = document.getElementById('nlMsg');
  if (!email || !email.includes('@')) {
    msg.style.display = 'block';
    msg.textContent = 'Por favor entra un email válido.';
    return;
  }
  try {
    const res = await fetch('/api/newsletter-boricua', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: 'landing' })
    });
    msg.style.display = 'block';
    if (res.ok) {
      msg.style.color = '#4caf50';
      msg.textContent = '¡Wepa! Ya estás suscrito. ¡Bendiciones! 🇵🇷';
      document.getElementById('nlEmail').value = '';
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
