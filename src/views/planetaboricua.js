module.exports = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Planeta Boricua — Más Boricua Que Un Mofongo</title>
<meta name="description" content="Tu portal de cultura, noticias y comunidad puertorriqueña. Directorio de negocios boricuas en USA, noticias de PR, y más.">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4181903530685744" crossorigin="anonymous"></script>
<style>
*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'Inter',sans-serif;background:#0a0a0a;color:#f0f0f0;overflow-x:hidden;}
:root{
  --red:#CE1126;
  --blue:#002D62;
  --white:#ffffff;
  --gold:#F5C842;
  --dark:#0a0a0a;
  --card:#141414;
  --border:rgba(255,255,255,0.08);
  --mid:rgba(255,255,255,0.55);
}

/* NAV */
nav{position:sticky;top:0;z-index:100;background:rgba(10,10,10,0.92);backdrop-filter:blur(16px);border-bottom:1px solid var(--border);padding:0 2rem;display:flex;align-items:center;justify-content:space-between;height:64px;}
.nav-logo{display:flex;align-items:center;gap:0.7rem;text-decoration:none;}
.nav-flag{font-size:1.4rem;}
.nav-logo-text{font-family:'Syne',sans-serif;font-size:1rem;font-weight:800;color:#fff;letter-spacing:-0.02em;line-height:1.1;}
.nav-logo-sub{font-size:0.6rem;color:var(--mid);font-weight:400;letter-spacing:0.05em;text-transform:uppercase;}
.nav-links{display:flex;align-items:center;gap:1.8rem;}
.nav-links a{font-size:0.82rem;color:var(--mid);text-decoration:none;font-weight:500;transition:color 0.2s;}
.nav-links a:hover{color:#fff;}
.nav-cta{background:var(--red);color:#fff!important;padding:0.5rem 1.2rem;border-radius:6px;font-weight:700;font-size:0.78rem!important;}
.nav-cta:hover{background:#e01328!important;}

/* HERO */
.hero{position:relative;min-height:92vh;display:flex;align-items:center;overflow:hidden;}
.hero-bg{position:absolute;inset:0;background:linear-gradient(135deg,#0a0a0a 0%,#001233 40%,#002D62 70%,#8B0000 100%);z-index:0;}
.hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px);background-size:60px 60px;z-index:1;}
.hero-glow{position:absolute;width:600px;height:600px;background:radial-gradient(circle,rgba(206,17,38,0.15) 0%,transparent 70%);top:-100px;right:-100px;z-index:1;}
.hero-inner{max-width:1100px;margin:0 auto;padding:5rem 2rem;position:relative;z-index:2;display:grid;grid-template-columns:1.1fr 0.9fr;gap:4rem;align-items:center;}
.hero-eyebrow{display:inline-flex;align-items:center;gap:0.6rem;background:rgba(206,17,38,0.12);border:1px solid rgba(206,17,38,0.3);padding:0.3rem 0.9rem;border-radius:4px;margin-bottom:1.5rem;}
.hero-eyebrow-dot{width:6px;height:6px;background:var(--red);border-radius:50%;animation:pulse 2s infinite;}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
.hero-eyebrow-text{font-size:0.65rem;color:#ff6b7a;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;}
.hero h1{font-family:'Syne',sans-serif;font-size:clamp(2.8rem,5.5vw,4.5rem);font-weight:800;line-height:1.1;color:#fff;margin-bottom:1.2rem;letter-spacing:-0.03em;}
.hero h1 .accent{color:var(--gold);}
.hero h1 .flag{font-size:0.8em;}
.hero-sub{font-size:1rem;color:rgba(255,255,255,0.6);line-height:1.8;margin-bottom:2rem;max-width:460px;}
.hero-btns{display:flex;gap:0.8rem;flex-wrap:wrap;margin-bottom:2.5rem;}
.btn-red{display:inline-flex;align-items:center;gap:0.5rem;background:var(--red);color:#fff;padding:0.85rem 1.8rem;border-radius:6px;font-size:0.88rem;font-weight:700;text-decoration:none;transition:all 0.2s;}
.btn-red:hover{background:#e01328;transform:translateY(-1px);}
.btn-outline{display:inline-flex;align-items:center;gap:0.5rem;border:1.5px solid rgba(255,255,255,0.2);color:#fff;padding:0.85rem 1.8rem;border-radius:6px;font-size:0.88rem;font-weight:600;text-decoration:none;transition:all 0.2s;}
.btn-outline:hover{border-color:rgba(255,255,255,0.6);}
.hero-stats{display:flex;gap:2rem;flex-wrap:wrap;}
.hero-stat{display:flex;flex-direction:column;gap:0.2rem;}
.hero-stat-num{font-family:'Syne',sans-serif;font-size:1.6rem;font-weight:800;color:#fff;}
.hero-stat-label{font-size:0.72rem;color:var(--mid);text-transform:uppercase;letter-spacing:0.05em;}
.hero-visual{display:flex;flex-direction:column;gap:1rem;}
.hero-card{background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:16px;padding:1.4rem;transition:all 0.3s;}
.hero-card:hover{background:rgba(255,255,255,0.07);border-color:rgba(206,17,38,0.3);}
.hero-card-tag{font-size:0.62rem;font-weight:700;color:var(--red);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.5rem;}
.hero-card-title{font-family:'Syne',sans-serif;font-size:0.95rem;font-weight:700;color:#fff;margin-bottom:0.4rem;line-height:1.3;}
.hero-card-sub{font-size:0.78rem;color:var(--mid);line-height:1.5;}
.hero-card-footer{display:flex;align-items:center;justify-content:space-between;margin-top:0.8rem;}
.hero-card-time{font-size:0.68rem;color:rgba(255,255,255,0.3);}
.hero-card-arrow{font-size:0.75rem;color:var(--red);font-weight:700;}

/* SECTIONS COMMON */
.section-eyebrow{font-size:0.68rem;font-weight:700;color:var(--red);letter-spacing:0.12em;text-transform:uppercase;margin-bottom:0.7rem;}
.section-title{font-family:'Syne',sans-serif;font-size:clamp(1.8rem,3vw,2.5rem);font-weight:800;color:#fff;letter-spacing:-0.03em;margin-bottom:0.8rem;line-height:1.15;}
.section-title .accent{color:var(--gold);}
.section-sub{font-size:0.95rem;color:var(--mid);line-height:1.8;max-width:520px;margin-bottom:3rem;}

/* CULTURA SECTION */
.cultura{padding:5rem 2rem;max-width:1100px;margin:0 auto;}
.cultura-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:1.5rem;margin-top:3rem;}
.cultura-main{grid-row:span 2;background:var(--card);border:1px solid var(--border);border-radius:16px;overflow:hidden;text-decoration:none;color:inherit;display:flex;flex-direction:column;transition:all 0.25s;}
.cultura-main:hover{border-color:rgba(206,17,38,0.4);transform:translateY(-3px);}
.cultura-img{height:220px;background:linear-gradient(135deg,#002D62,#CE1126);display:flex;align-items:center;justify-content:center;font-size:4rem;}
.cultura-body{padding:1.5rem;flex:1;display:flex;flex-direction:column;}
.cultura-tag{font-size:0.62rem;font-weight:700;color:var(--red);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.6rem;}
.cultura-title{font-family:'Syne',sans-serif;font-size:1.15rem;font-weight:700;color:#fff;line-height:1.3;margin-bottom:0.6rem;}
.cultura-excerpt{font-size:0.82rem;color:var(--mid);line-height:1.6;flex:1;}
.cultura-footer{display:flex;align-items:center;justify-content:space-between;margin-top:1rem;padding-top:1rem;border-top:1px solid var(--border);}
.cultura-date{font-size:0.7rem;color:rgba(255,255,255,0.3);}
.cultura-read{font-size:0.72rem;color:var(--red);font-weight:700;}
.cultura-card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:1.4rem;text-decoration:none;color:inherit;display:flex;flex-direction:column;gap:0.6rem;transition:all 0.25s;}
.cultura-card:hover{border-color:rgba(206,17,38,0.4);transform:translateY(-2px);}
.cultura-card-icon{font-size:1.8rem;}
.cultura-card-tag{font-size:0.6rem;font-weight:700;color:var(--red);letter-spacing:0.1em;text-transform:uppercase;}
.cultura-card-title{font-family:'Syne',sans-serif;font-size:0.9rem;font-weight:700;color:#fff;line-height:1.3;}
.cultura-card-sub{font-size:0.78rem;color:var(--mid);line-height:1.5;}

/* DIRECTORIO */
.directorio{padding:5rem 2rem;background:#0f0f0f;border-top:1px solid var(--border);border-bottom:1px solid var(--border);}
.directorio-inner{max-width:1100px;margin:0 auto;}
.directorio-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.2rem;margin-top:3rem;}
.dir-card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:1.4rem;display:flex;gap:1rem;align-items:flex-start;transition:all 0.25s;text-decoration:none;color:inherit;}
.dir-card:hover{border-color:rgba(206,17,38,0.4);transform:translateY(-2px);}
.dir-icon{width:44px;height:44px;background:rgba(206,17,38,0.1);border:1px solid rgba(206,17,38,0.2);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0;}
.dir-info{flex:1;}
.dir-name{font-family:'Syne',sans-serif;font-size:0.9rem;font-weight:700;color:#fff;margin-bottom:0.2rem;}
.dir-cat{font-size:0.68rem;color:var(--red);font-weight:600;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.3rem;}
.dir-location{font-size:0.75rem;color:var(--mid);}
.dir-badge{font-size:0.6rem;background:rgba(245,200,66,0.15);color:var(--gold);border:1px solid rgba(245,200,66,0.2);padding:0.15rem 0.5rem;border-radius:3px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;}
.directorio-cta{text-align:center;margin-top:2.5rem;}

/* NAYELI AI */
.nayeli-section{padding:5rem 2rem;max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;}
.nayeli-eyebrow{font-size:0.68rem;font-weight:700;color:var(--red);letter-spacing:0.12em;text-transform:uppercase;margin-bottom:0.7rem;}
.nayeli-title{font-family:'Syne',sans-serif;font-size:clamp(1.8rem,3vw,2.5rem);font-weight:800;color:#fff;letter-spacing:-0.03em;margin-bottom:1rem;line-height:1.15;}
.nayeli-title .accent{color:var(--gold);}
.nayeli-sub{font-size:0.95rem;color:var(--mid);line-height:1.8;margin-bottom:1.5rem;}
.nayeli-features{list-style:none;display:flex;flex-direction:column;gap:0.7rem;margin-bottom:2rem;}
.nayeli-features li{display:flex;align-items:flex-start;gap:0.7rem;font-size:0.85rem;color:rgba(255,255,255,0.7);}
.nayeli-features li::before{content:'🇵🇷';font-size:0.75rem;flex-shrink:0;margin-top:2px;}
.nayeli-chat{background:var(--card);border:1px solid var(--border);border-radius:20px;overflow:hidden;}
.nayeli-chat-header{padding:1rem 1.2rem;background:rgba(206,17,38,0.08);border-bottom:1px solid var(--border);display:flex;align-items:center;gap:0.8rem;}
.nayeli-avatar{width:36px;height:36px;background:linear-gradient(135deg,var(--red),#8B0000);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;}
.nayeli-name{font-family:'Syne',sans-serif;font-size:0.85rem;font-weight:700;color:#fff;}
.nayeli-online{font-size:0.65rem;color:#ff6b7a;}
.nayeli-msgs{padding:1.2rem;display:flex;flex-direction:column;gap:0.8rem;min-height:200px;}
.n-msg{max-width:85%;padding:0.75rem 1rem;font-size:0.82rem;line-height:1.6;}
.n-bot{background:rgba(255,255,255,0.05);border:1px solid var(--border);border-radius:4px 12px 12px 12px;color:#f0f0f0;align-self:flex-start;}
.n-user{background:var(--red);color:#fff;border-radius:12px 4px 12px 12px;align-self:flex-end;}
.nayeli-input-row{padding:0.8rem;border-top:1px solid var(--border);display:flex;gap:0.5rem;}
.nayeli-input{flex:1;background:rgba(255,255,255,0.05);border:1px solid var(--border);border-radius:8px;padding:0.6rem 0.9rem;color:#fff;font-size:0.78rem;outline:none;font-family:'Inter',sans-serif;}
.nayeli-input::placeholder{color:rgba(255,255,255,0.25);}
.nayeli-send{background:var(--red);border:none;border-radius:8px;width:34px;height:34px;cursor:pointer;font-size:0.85rem;color:#fff;}

/* VIAJES / AFILIADOS */
.viajes{padding:5rem 2rem;background:#0f0f0f;border-top:1px solid var(--border);}
.viajes-inner{max-width:1100px;margin:0 auto;}
.viajes-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:3rem;}
.viaje-card{background:var(--card);border:1px solid var(--border);border-radius:16px;overflow:hidden;text-decoration:none;color:inherit;display:flex;flex-direction:column;transition:all 0.25s;}
.viaje-card:hover{border-color:rgba(206,17,38,0.4);transform:translateY(-3px);}
.viaje-img{height:140px;display:flex;align-items:center;justify-content:center;font-size:3.5rem;}
.viaje-img.pr{background:linear-gradient(135deg,#002D62,#CE1126);}
.viaje-img.orlando{background:linear-gradient(135deg,#1a1a2e,#16213e);}
.viaje-img.ny{background:linear-gradient(135deg,#0f3460,#533483);}
.viaje-body{padding:1.2rem;flex:1;display:flex;flex-direction:column;}
.viaje-tag{font-size:0.6rem;font-weight:700;color:var(--red);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.4rem;}
.viaje-title{font-family:'Syne',sans-serif;font-size:0.95rem;font-weight:700;color:#fff;margin-bottom:0.4rem;}
.viaje-sub{font-size:0.78rem;color:var(--mid);line-height:1.5;flex:1;}
.viaje-cta{display:inline-flex;align-items:center;gap:0.4rem;margin-top:1rem;font-size:0.78rem;font-weight:700;color:var(--red);}

/* NEWSLETTER */
.newsletter{padding:5rem 2rem;text-align:center;background:linear-gradient(135deg,#0D1B2A,#1a0005);}
.newsletter-inner{max-width:560px;margin:0 auto;}
.newsletter h2{font-family:'Syne',sans-serif;font-size:clamp(1.8rem,3vw,2.4rem);font-weight:800;color:#fff;letter-spacing:-0.03em;margin-bottom:0.8rem;}
.newsletter h2 .accent{color:var(--gold);}
.newsletter p{font-size:0.92rem;color:var(--mid);line-height:1.7;margin-bottom:2rem;}
.newsletter-form{display:flex;gap:0.6rem;max-width:440px;margin:0 auto;}
.newsletter-input{flex:1;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:8px;padding:0.8rem 1rem;color:#fff;font-size:0.85rem;outline:none;font-family:'Inter',sans-serif;}
.newsletter-input::placeholder{color:rgba(255,255,255,0.3);}
.newsletter-btn{background:var(--red);color:#fff;border:none;border-radius:8px;padding:0.8rem 1.4rem;font-size:0.85rem;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;white-space:nowrap;transition:background 0.2s;}
.newsletter-btn:hover{background:#e01328;}
.newsletter-note{font-size:0.7rem;color:rgba(255,255,255,0.25);margin-top:0.8rem;}

/* FOOTER */
.pb-footer{padding:3rem 2rem;border-top:1px solid var(--border);max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:2rem;}
.pb-footer-brand{display:flex;flex-direction:column;gap:0.4rem;}
.pb-footer-logo{font-family:'Syne',sans-serif;font-size:1rem;font-weight:800;color:#fff;}
.pb-footer-tagline{font-size:0.72rem;color:rgba(255,255,255,0.3);}
.pb-footer-social{display:flex;gap:0.8rem;margin-top:0.8rem;}
.pb-footer-social a{width:34px;height:34px;background:rgba(255,255,255,0.05);border:1px solid var(--border);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:0.9rem;text-decoration:none;transition:all 0.2s;}
.pb-footer-social a:hover{background:rgba(206,17,38,0.15);border-color:rgba(206,17,38,0.3);}
.pb-footer-links{display:flex;flex-direction:column;gap:0.6rem;}
.pb-footer-links h4{font-size:0.7rem;font-weight:700;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.3rem;}
.pb-footer-links a{font-size:0.8rem;color:rgba(255,255,255,0.5);text-decoration:none;transition:color 0.2s;}
.pb-footer-links a:hover{color:#fff;}
.pb-footer-bottom{width:100%;border-top:1px solid var(--border);padding-top:1.5rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;}
.pb-footer-copy{font-size:0.7rem;color:rgba(255,255,255,0.2);}
.pb-footer-ivamar{font-size:0.7rem;color:rgba(255,255,255,0.2);}
.pb-footer-ivamar a{color:rgba(255,255,255,0.35);text-decoration:none;}
.pb-footer-ivamar a:hover{color:#fff;}

@media(max-width:768px){
  nav{padding:0 1rem;}
  .nav-links{display:none;}
  .hero-inner{grid-template-columns:1fr;gap:2.5rem;padding:3.5rem 1.2rem;}
  .hero-visual{display:none;}
  .cultura{padding:3rem 1.2rem;}
  .cultura-grid{grid-template-columns:1fr;}
  .cultura-main{grid-row:auto;}
  .directorio{padding:3rem 1.2rem;}
  .directorio-grid{grid-template-columns:1fr;}
  .nayeli-section{grid-template-columns:1fr;gap:2.5rem;padding:3rem 1.2rem;}
  .viajes{padding:3rem 1.2rem;}
  .viajes-grid{grid-template-columns:1fr;}
  .newsletter{padding:3rem 1.2rem;}
  .newsletter-form{flex-direction:column;}
  .pb-footer{padding:2rem 1.2rem;flex-direction:column;}
  .pb-footer-bottom{flex-direction:column;text-align:center;}
}
</style>
</head>
<body>

<!-- NAV -->
<nav>
  <a href="/" class="nav-logo">
    <div class="nav-flag">🇵🇷</div>
    <div>
      <div class="nav-logo-text">Planeta Boricua</div>
      <div class="nav-logo-sub">Más Boricua Que Un Mofongo</div>
    </div>
  </a>
  <div class="nav-links">
    <a href="#cultura">Cultura</a>
    <a href="#directorio">Directorio</a>
    <a href="#nayeli">Nayeli AI</a>
    <a href="#viajes">Viajes a PR</a>
    <a href="#newsletter" class="nav-cta">Suscríbete →</a>
  </div>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-bg"></div>
  <div class="hero-grid"></div>
  <div class="hero-glow"></div>
  <div class="hero-inner">
    <div>
      <div class="hero-eyebrow">
        <div class="hero-eyebrow-dot"></div>
        <span class="hero-eyebrow-text">Portal Boricua · Cultura · Comunidad</span>
      </div>
      <h1>El Orgullo<br>Boricua <span class="flag">🇵🇷</span><br>Nunca <span class="accent">Duerme.</span></h1>
      <p class="hero-sub">Noticias, cultura, directorio de negocios boricuas en USA, y Nayeli — tu asistente de IA que habla tu idioma y entiende tu isla.</p>
      <div class="hero-btns">
        <a href="#cultura" class="btn-red">Explorar →</a>
        <a href="#directorio" class="btn-outline">Directorio Boricua</a>
      </div>
      <div class="hero-stats">
        <div class="hero-stat">
          <span class="hero-stat-num">3.2M</span>
          <span class="hero-stat-label">Boricuas en USA</span>
        </div>
        <div class="hero-stat">
          <span class="hero-stat-num">24/7</span>
          <span class="hero-stat-label">Noticias de PR</span>
        </div>
        <div class="hero-stat">
          <span class="hero-stat-num">🤖</span>
          <span class="hero-stat-label">Nayeli AI activa</span>
        </div>
      </div>
    </div>
    <div class="hero-visual" id="hero-blog-cards">
      <div class="hero-card">
        <div class="hero-card-tag">🔥 Tendencia</div>
        <div class="hero-card-title">Puerto Rico y el debate sobre el status: lo que debes saber en 2026</div>
        <div class="hero-card-sub">El debate político más importante de la isla explicado sin rodeos.</div>
        <div class="hero-card-footer">
          <span class="hero-card-time">Hace 2 horas</span>
          <span class="hero-card-arrow">Leer →</span>
        </div>
      </div>
      <div class="hero-card">
        <div class="hero-card-tag">🎵 Cultura</div>
        <div class="hero-card-title">El reggaetón boricua que está dominando las playlists globales</div>
        <div class="hero-card-sub">De Santurce al mundo — la música que nos define.</div>
        <div class="hero-card-footer">
          <span class="hero-card-time">Hoy</span>
          <span class="hero-card-arrow">Leer →</span>
        </div>
      </div>
      <div class="hero-card">
        <div class="hero-card-tag">🍽️ Gastronomía</div>
        <div class="hero-card-title">Los mejores restaurantes boricuas en Florida que no puedes perderte</div>
        <div class="hero-card-sub">Sazón, sofrito y amor — aquí en la diáspora.</div>
        <div class="hero-card-footer">
          <span class="hero-card-time">Ayer</span>
          <span class="hero-card-arrow">Leer →</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ADSENSE TOP -->
<div style="max-width:1100px;margin:2rem auto;padding:0 2rem;text-align:center;">
  <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-4181903530685744" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>

<!-- CULTURA -->
<section class="cultura" id="cultura">
  <div class="section-eyebrow">Cultura & Noticias</div>
  <h2 class="section-title">Lo Último de <span class="accent">Puerto Rico</span></h2>
  <p class="section-sub">Noticias, cultura, política y orgullo — todo desde la perspectiva boricua.</p>
  <div class="cultura-grid" id="cultura-grid">
    <a href="#" class="cultura-main">
      <div class="cultura-img">🌴</div>
      <div class="cultura-body">
        <div class="cultura-tag">🔥 Destacado</div>
        <div class="cultura-title">La diáspora boricua en Florida: comunidad, cultura y fuerza política en 2026</div>
        <div class="cultura-excerpt">Más de 1.2 millones de puertorriqueños en Florida están redefiniendo la política y la cultura del estado. Un análisis completo de la comunidad más influyente del Sunshine State.</div>
        <div class="cultura-footer">
          <span class="cultura-date">Junio 2026</span>
          <span class="cultura-read">Leer artículo →</span>
        </div>
      </div>
    </a>
    <a href="#" class="cultura-card">
      <div class="cultura-card-icon">🎵</div>
      <div class="cultura-card-tag">Música</div>
      <div class="cultura-card-title">Bad Bunny y el legado del trap boricua en el mundo</div>
      <div class="cultura-card-sub">Cómo un muchacho de Vega Baja cambió la música global para siempre.</div>
    </a>
    <a href="#" class="cultura-card">
      <div class="cultura-card-icon">⚾</div>
      <div class="cultura-card-tag">Deportes</div>
      <div class="cultura-card-title">Los boricuas que brillan en las Grandes Ligas esta temporada</div>
      <div class="cultura-card-sub">El talento de la isla sigue dominando el béisbol profesional.</div>
    </a>
    <a href="#" class="cultura-card">
      <div class="cultura-card-icon">🏛️</div>
      <div class="cultura-card-tag">Política</div>
      <div class="cultura-card-title">Status de PR: dónde están los candidatos y qué significa para ti</div>
      <div class="cultura-card-sub">Estadidad, ELA o independencia — el debate que define el futuro.</div>
    </a>
    <a href="#" class="cultura-card">
      <div class="cultura-card-icon">🍽️</div>
      <div class="cultura-card-tag">Gastronomía</div>
      <div class="cultura-card-title">Recetas boricuas que no se olvidan: del mofongo al tembleque</div>
      <div class="cultura-card-sub">La cocina que nos une sin importar dónde estemos.</div>
    </a>
  </div>
</section>

<!-- DIRECTORIO -->
<section class="directorio" id="directorio">
  <div class="directorio-inner">
    <div class="section-eyebrow">Directorio</div>
    <h2 class="section-title">Negocios <span class="accent">Boricuas</span> en USA</h2>
    <p class="section-sub">Apoya a los empresarios de la diáspora. Encuentra negocios boricuas cerca de ti.</p>
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
          <div class="dir-cat">Panadería / Bakery</div>
          <div class="dir-location">📍 Miami, FL</div>
        </div>
        <div class="dir-badge">Nuevo</div>
      </a>
    </div>
    <div class="directorio-cta">
      <a href="#" class="btn-red" style="margin-right:1rem;">Ver Todos los Negocios →</a>
      <a href="#" class="btn-outline">Añadir Mi Negocio</a>
    </div>
  </div>
</section>

<!-- NAYELI AI -->
<section class="nayeli-section" id="nayeli">
  <div>
    <div class="nayeli-eyebrow">Asistente IA</div>
    <h2 class="nayeli-title">Conoce a <span class="accent">Nayeli</span> 🇵🇷</h2>
    <p class="nayeli-sub">Nayeli es tu asistente de IA boricua — habla tu idioma, entiende tu cultura y está aquí para ayudarte con todo lo de Puerto Rico y la diáspora.</p>
    <ul class="nayeli-features">
      <li>Noticias y temas de Puerto Rico al instante</li>
      <li>Encuentra negocios boricuas cerca de ti</li>
      <li>Planifica tu viaje a la isla</li>
      <li>Responde en español boricua naturalmente</li>
      <li>Disponible 24/7 — como la buena gente de PR</li>
    </ul>
    <a href="#" class="btn-red">Habla con Nayeli →</a>
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
</section>

<!-- ADSENSE MID -->
<div style="max-width:1100px;margin:0 auto;padding:0 2rem 3rem;text-align:center;">
  <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-4181903530685744" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>

<!-- VIAJES A PR -->
<section class="viajes" id="viajes">
  <div class="viajes-inner">
    <div class="section-eyebrow">Viajes & Afiliados</div>
    <h2 class="section-title">Planifica Tu Viaje a <span class="accent">La Isla</span></h2>
    <p class="section-sub">Vuelos, hoteles y experiencias — todo lo que necesitas para tu próximo viaje a Puerto Rico y más.</p>
    <div class="viajes-grid">
      <a href="https://tp.media/r?marker=480837&trs=335367&p=4114&u=https%3A%2F%2Fwww.expedia.com%2FPuerto-Rico.d602408.Destination-Travel-Guides" target="_blank" rel="noopener" class="viaje-card">
        <div class="viaje-img pr">🌴</div>
        <div class="viaje-body">
          <div class="viaje-tag">🇵🇷 Destino Principal</div>
          <div class="viaje-title">Puerto Rico — La Isla del Encanto</div>
          <div class="viaje-sub">Hoteles, vuelos y tours en PR al mejor precio. Desde $89/noche en San Juan.</div>
          <div class="viaje-cta">Buscar vuelos y hoteles →</div>
        </div>
      </a>
      <a href="https://tp.media/r?marker=480837&trs=335367&p=4114&u=https%3A%2F%2Fwww.expedia.com%2FOrlando.d178293.Destination-Travel-Guides" target="_blank" rel="noopener" class="viaje-card">
        <div class="viaje-img orlando">🎢</div>
        <div class="viaje-body">
          <div class="viaje-tag">🌴 Boricuas en Florida</div>
          <div class="viaje-title">Orlando — El destino familiar</div>
          <div class="viaje-sub">La capital boricua de Florida. Hoteles, parques y la mejor comunidad latina.</div>
          <div class="viaje-cta">Ver hoteles en Orlando →</div>
        </div>
      </a>
      <a href="https://tp.media/r?marker=480837&trs=335367&p=4114&u=https%3A%2F%2Fwww.expedia.com%2FNew-York-City.d178293.Destination-Travel-Guides" target="_blank" rel="noopener" class="viaje-card">
        <div class="viaje-img ny">🗽</div>
        <div class="viaje-body">
          <div class="viaje-tag">🏙️ La Gran Manzana</div>
          <div class="viaje-title">New York — El Barrio y más allá</div>
          <div class="viaje-sub">El Bronx, El Barrio, Brooklyn — la historia boricua de Nueva York te espera.</div>
          <div class="viaje-cta">Explorar Nueva York →</div>
        </div>
      </a>
    </div>
  </div>
</section>

<!-- NEWSLETTER -->
<section class="newsletter" id="newsletter">
  <div class="newsletter-inner">
    <div class="section-eyebrow" style="color:#ff6b7a;">Newsletter</div>
    <h2>Lo Boricua <span class="accent">Directo</span> a Tu Email</h2>
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
<footer style="background:#0a0a0a;border-top:1px solid rgba(255,255,255,0.06);">
  <div class="pb-footer">
    <div class="pb-footer-brand">
      <div class="pb-footer-logo">🇵🇷 Planeta Boricua</div>
      <div class="pb-footer-tagline">Más Boricua Que Un Mofongo</div>
      <div class="pb-footer-social">
        <a href="https://tiktok.com/@planetaboricua" target="_blank" rel="noopener">📱</a>
        <a href="https://instagram.com/planetaboricua" target="_blank" rel="noopener">📸</a>
        <a href="https://facebook.com/planetaboricua" target="_blank" rel="noopener">👍</a>
      </div>
    </div>
    <div class="pb-footer-links">
      <h4>Portal</h4>
      <a href="#cultura">Cultura & Noticias</a>
      <a href="#directorio">Directorio Boricua</a>
      <a href="#nayeli">Nayeli AI</a>
      <a href="#viajes">Viajes a PR</a>
    </div>
    <div class="pb-footer-links">
      <h4>Comunidad</h4>
      <a href="#">Añadir Mi Negocio</a>
      <a href="#">Enviar Noticia</a>
      <a href="#newsletter">Newsletter</a>
      <a href="#">Contacto</a>
    </div>
    <div class="pb-footer-links">
      <h4>Legal</h4>
      <a href="#">Privacidad</a>
      <a href="#">Términos</a>
      <a href="#">Aviso de Afiliados</a>
    </div>
    <div class="pb-footer-bottom">
      <div class="pb-footer-copy">© 2026 Planeta Boricua · masboricuaqueunmofongo.com · Todos los derechos reservados</div>
      <div class="pb-footer-ivamar">Un producto de <a href="https://ivamarai.com" target="_blank">Ivamar AI LLC</a></div>
    </div>
  </div>
</footer>

<script>
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
    typing.textContent = data.reply || 'Ay bendito, tuve un problemita. ¡Intenta de nuevo!';
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
      msg.style.color = '#52B788';
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


<script>
(function(){
  fetch('/api/planetaboricua-blog')
    .then(r => r.json())
    .then(posts => {
      if (!posts || !posts.length) return;

      const heroEl = document.getElementById('hero-blog-cards');
      if (heroEl) {
        heroEl.innerHTML = posts.slice(0, 3).map(p =>
          '<a href="' + p.link + '" target="_blank" class="hero-card" style="text-decoration:none;color:inherit;">' +
          '<div class="hero-card-tag">🔥 ' + p.tag + '</div>' +
          '<div class="hero-card-title">' + p.title + '</div>' +
          '<div class="hero-card-sub">' + p.summary + '</div>' +
          '<div class="hero-card-footer">' +
          '<span class="hero-card-time">' + p.date + '</span>' +
          '<span class="hero-card-arrow">Leer →</span>' +
          '</div></a>'
        ).join('');
      }

      const grid = document.getElementById('cultura-grid');
      if (grid) {
        const featured = posts[0];
        const featuredHtml =
          '<a href="' + featured.link + '" target="_blank" class="cultura-main">' +
          (featured.img ? '<div class="cultura-img" style="padding:0;"><img src="' + featured.img + '" alt="" style="width:100%;height:220px;object-fit:cover;"></div>' : '<div class="cultura-img">🇵🇷</div>') +
          '<div class="cultura-body">' +
          '<div class="cultura-tag">🔥 Destacado</div>' +
          '<div class="cultura-title">' + featured.title + '</div>' +
          '<div class="cultura-excerpt">' + featured.summary + '</div>' +
          '<div class="cultura-footer">' +
          '<span class="cultura-date">' + featured.date + '</span>' +
          '<span class="cultura-read">Leer artículo →</span>' +
          '</div></div></a>';
        const cardsHtml = posts.slice(1, 5).map(p =>
          '<a href="' + p.link + '" target="_blank" class="cultura-card">' +
          '<div class="cultura-card-icon">📰</div>' +
          '<div class="cultura-card-tag">' + p.tag + '</div>' +
          '<div class="cultura-card-title">' + p.title + '</div>' +
          '<div class="cultura-card-sub">' + p.summary + '</div>' +
          '</a>'
        ).join('');
        grid.innerHTML = featuredHtml + cardsHtml;
      }
    })
    .catch(e => console.log('Blog error:', e));
})();
</script>
</body>
</html>
`;
