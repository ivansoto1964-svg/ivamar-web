module.exports = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Planeta Boricua — Más Boricua Que Un Mofongo</title>
<meta name="description" content="Tu portal de cultura, noticias y comunidad puertorriqueña. Directorio de negocios boricuas en USA, noticias de PR, y más.">
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
.directorio-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem;margin-top:1.5rem;}
.dir-card{border:1px solid var(--border);border-radius:4px;padding:1.2rem;display:flex;gap:1rem;align-items:flex-start;transition:all 0.2s;text-decoration:none;color:inherit;}
.dir-card:hover{border-color:var(--red);box-shadow:0 2px 12px rgba(206,17,38,0.08);}
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
    <div class="nav-links">
      <a href="#noticias">Noticias</a>
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
  <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-4181903530685744" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>

<!-- NOTICIAS EN VIVO -->
<section class="noticias-vivo">
  <div class="noticias-vivo-inner">
    <div class="sec-divider-inner">
      <span class="sec-divider-label">Noticias en Vivo</span>
      <div style="flex:1;height:2px;background:var(--red);margin:0 1rem;"></div>
      <span style="font-size:0.65rem;color:#999;">Actualizado automáticamente</span>
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
      <span class="sec-divider-label">Directorio Boricua en USA</span>
      <div style="flex:1;height:2px;background:var(--red);margin:0 1rem;"></div>
      <a href="#" class="sec-divider-link">Añadir negocio →</a>
    </div>
    <div class="directorio-grid">
      <a href="#" class="dir-card">
        <div class="dir-icon">🍽️</div>
        <div class="dir-info">
          <div class="dir-name">La Perla Restaurant</div>
          <div class="dir-cat">Restaurante Boricua</div>
          <div class="dir-location">📍 Orlando, FL</div>
        </div>
        <div class="dir-badge">Destacado</div>
      </a>
      <a href="#" class="dir-card">
        <div class="dir-icon">💇</div>
        <div class="dir-info">
          <div class="dir-name">Glamour Boricua Salon</div>
          <div class="dir-cat">Salón de Belleza</div>
          <div class="dir-location">📍 Kissimmee, FL</div>
        </div>
      </a>
      <a href="#" class="dir-card">
        <div class="dir-icon">🏠</div>
        <div class="dir-info">
          <div class="dir-name">PR Realty Group</div>
          <div class="dir-cat">Bienes Raíces</div>
          <div class="dir-location">📍 Tampa, FL</div>
        </div>
        <div class="dir-badge">Destacado</div>
      </a>
      <a href="#" class="dir-card">
        <div class="dir-icon">🚗</div>
        <div class="dir-info">
          <div class="dir-name">Ramos Auto Sales</div>
          <div class="dir-cat">Concesionario</div>
          <div class="dir-location">📍 New York, NY</div>
        </div>
      </a>
      <a href="#" class="dir-card">
        <div class="dir-icon">⚕️</div>
        <div class="dir-info">
          <div class="dir-name">Clínica Borinquen</div>
          <div class="dir-cat">Clínica Médica</div>
          <div class="dir-location">📍 Chicago, IL</div>
        </div>
      </a>
      <a href="#" class="dir-card">
        <div class="dir-icon">🍞</div>
        <div class="dir-info">
          <div class="dir-name">La Panadería de Abuela</div>
          <div class="dir-cat">Panadería</div>
          <div class="dir-location">📍 Miami, FL</div>
        </div>
        <div class="dir-badge">Nuevo</div>
      </a>
    </div>
    <div class="directorio-cta">
      <a href="#" class="btn-red">Ver Todos los Negocios →</a>
      <a href="#" class="btn-outline-dark">Añadir Mi Negocio</a>
    </div>
  </div>
</section>

<!-- ADSENSE MID -->
<div class="ad-strip">
  <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-4181903530685744" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>


<!-- NAYELI -->
<section class="nayeli-section" id="nayeli">
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
        <div class="nayeli-avatar">🇵🇷</div>
        <div>
          <div class="nayeli-name">Nayeli — Asistente Boricua</div>
          <div class="nayeli-online">● En línea · Wepa, ¿en qué te ayudo?</div>
        </div>
      </div>
      <div class="nayeli-msgs" id="nayeliMsgs">
        <div class="n-msg n-bot">¡Wepa! 🇵🇷 Soy Nayeli, tu asistente boricua.<br><br>Puedo ayudarte con noticias de PR, encontrar negocios boricuas en USA, planificar un viaje a la isla, o simplemente charlar sobre lo nuestro. ¿Qué necesitas hoy? 😊</div>
      </div>
      <div class="nayeli-input-row">
        <input class="nayeli-input" id="nayeliInput" placeholder="Pregúntame lo que quieras..." onkeydown="if(event.key==='Enter')nayeliSend()">
        <button class="nayeli-send" onclick="nayeliSend()">➤</button>
      </div>
    </div>
  </div>
</section>

<!-- VIAJES -->
<section class="viajes" id="viajes">
  <div class="viajes-inner">
    <div class="sec-divider-inner">
      <span class="sec-divider-label">Viajes & Destinos</span>
      <div style="flex:1;height:2px;background:var(--red);margin:0 1rem;"></div>
    </div>
    <div class="viajes-grid">
      <a href="https://tp.media/r?marker=480837&trs=335367&p=4114&u=https%3A%2F%2Fwww.expedia.com%2FPuerto-Rico.d602408.Destination-Travel-Guides" target="_blank" rel="noopener" class="viaje-card">
        <div class="viaje-img pr">🌴</div>
        <div class="viaje-body">
          <div class="viaje-cat">🇵🇷 Destino Principal</div>
          <div class="viaje-title">Puerto Rico — La Isla del Encanto</div>
          <div class="viaje-sub">Hoteles, vuelos y tours en PR al mejor precio. Desde $89/noche en San Juan.</div>
          <div class="viaje-cta">Buscar vuelos y hoteles →</div>
        </div>
      </a>
      <a href="https://tp.media/r?marker=480837&trs=335367&p=4114&u=https%3A%2F%2Fwww.expedia.com%2FOrlando.d178293.Destination-Travel-Guides" target="_blank" rel="noopener" class="viaje-card">
        <div class="viaje-img orlando">🎢</div>
        <div class="viaje-body">
          <div class="viaje-cat">🌴 Boricuas en Florida</div>
          <div class="viaje-title">Orlando — El destino familiar</div>
          <div class="viaje-sub">La capital boricua de Florida. Hoteles, parques y la mejor comunidad.</div>
          <div class="viaje-cta">Ver hoteles en Orlando →</div>
        </div>
      </a>
      <a href="https://tp.media/r?marker=480837&trs=335367&p=4114&u=https%3A%2F%2Fwww.expedia.com%2FNew-York-City.d178293.Destination-Travel-Guides" target="_blank" rel="noopener" class="viaje-card">
        <div class="viaje-img ny">🗽</div>
        <div class="viaje-body">
          <div class="viaje-cat">🏙️ La Gran Manzana</div>
          <div class="viaje-title">New York — El Barrio y más allá</div>
          <div class="viaje-sub">El Bronx, El Barrio, Brooklyn — la historia boricua de Nueva York.</div>
          <div class="viaje-cta">Explorar Nueva York →</div>
        </div>
      </a>
    </div>
  </div>
</section>

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
        <a href="https://tiktok.com/@planetaboricua" target="_blank">📱</a>
        <a href="https://instagram.com/planetaboricua" target="_blank">📸</a>
        <a href="https://facebook.com/planetaboricua" target="_blank">👍</a>
      </div>
    </div>
    <div class="pb-footer-col">
      <h4>Portal</h4>
      <a href="#noticias">Noticias</a>
      <a href="#directorio">Directorio Boricua</a>
      <a href="#nayeli">Nayeli AI</a>
      <a href="#viajes">Viajes a PR</a>
    </div>
    <div class="pb-footer-col">
      <h4>Comunidad</h4>
      <a href="#">Añadir Mi Negocio</a>
      <a href="#">Enviar Noticia</a>
      <a href="#newsletter">Newsletter</a>
      <a href="#">Contacto</a>
    </div>
    <div class="pb-footer-col">
      <h4>Legal</h4>
      <a href="#">Privacidad</a>
      <a href="#">Términos</a>
      <a href="#">Aviso de Afiliados</a>
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
      body: JSON.stringify({ message: text })
    });
    const data = await res.json();
    typing.textContent = data.reply || '¡Ay bendito! Intenta de nuevo.';
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
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: 'planetaboricua' })
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
