const { renderPBSiteFooter } = require('./planetaboricua/site-footer');
const { renderStay22 } = require('./planetaboricua/stay22');

module.exports = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="manifest" href="/manifest-pb.json">
<link rel="apple-touch-icon" href="/icons/pb/apple-touch-icon.png">
<meta name="theme-color" content="#0033A0">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Planeta Boricua">
<title>Planeta Boricua — Más Boricua Que Un Mofongo</title>
<meta name="description" content="Cultura, identidad y recursos prácticos para la comunidad puertorriqueña en Puerto Rico y la diáspora. Artículos originales, Feria de Artesanías y guías PR↔USA.">
<meta name="keywords" content="Puerto Rico, cultura puertorriqueña, diáspora boricua, artesanos puertorriqueños, mudarse de Puerto Rico, recursos boricuas">
<meta name="author" content="Planeta Boricua">
<meta name="robots" content="index, follow">
<meta name="p:domain_verify" content="2591e6434fbe571ecc8889dc10061d14"/>
<link rel="canonical" href="https://www.masboricuaqueunmofongo.com/">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.masboricuaqueunmofongo.com/">
<meta property="og:title" content="Planeta Boricua — Más Boricua Que Un Mofongo">
<meta property="og:description" content="Cultura, identidad, Feria de Artesanías y recursos prácticos para la comunidad puertorriqueña dentro y fuera de la isla.">
<meta property="og:image" content="https://www.masboricuaqueunmofongo.com/img/og-planeta-boricua-logo.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Logo oficial de Planeta Boricua">
<meta property="og:locale" content="es_PR">
<meta property="og:site_name" content="Planeta Boricua">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="https://www.masboricuaqueunmofongo.com/">
<meta name="twitter:title" content="Planeta Boricua — Más Boricua Que Un Mofongo">
<meta name="twitter:description" content="Cultura, identidad, Feria de Artesanías y recursos para la comunidad puertorriqueña dentro y fuera de la isla.">
<meta name="twitter:image" content="https://www.masboricuaqueunmofongo.com/img/og-planeta-boricua-logo.jpg">
<meta name="twitter:image:alt" content="Logo oficial de Planeta Boricua">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<!--PB_HOME_HERO_PRELOAD-->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/pb-ads.css?v=4">
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
.nav-menu-toggle{display:none;border:1px solid var(--border);border-radius:6px;background:#fff;color:var(--blue);padding:.55rem .75rem;font:800 .76rem 'Inter',sans-serif;cursor:pointer;}
.nav-ticker{background:var(--red);padding:0.3rem 0;overflow:hidden;}
.nav-ticker-inner{max-width:1200px;margin:0 auto;padding:0 2rem;display:flex;align-items:center;gap:1rem;}
.nav-ticker-label{font-size:0.62rem;font-weight:800;color:#fff;text-transform:uppercase;letter-spacing:0.1em;white-space:nowrap;background:rgba(0,0,0,0.2);padding:0.15rem 0.5rem;}
.nav-ticker-text{font-size:0.72rem;color:rgba(255,255,255,0.9);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}

/* HERO */
.hero{background:var(--white);border-bottom:1px solid var(--border);padding:2rem 0;}
.hero-inner{max-width:1200px;margin:0 auto;padding:0 2rem;display:grid;grid-template-columns:1.6fr 1fr;gap:2rem;align-items:start;}
.hero-main{}
.hero-main-img{width:100%;height:320px;object-fit:contain;border-radius:4px;margin-bottom:1rem;background:linear-gradient(135deg,var(--blue),var(--red));display:flex;align-items:center;justify-content:center;font-size:5rem;}
.hero-main-img img{width:100%;height:100%;object-fit:contain;border-radius:4px;}
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

/* FERIA PROMO */
.fair-promo{background:linear-gradient(135deg,#002D62,#CE1126);padding:2.5rem 2rem;}
.fair-promo-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1.5rem;}
.fair-promo-eyebrow{font-size:.68rem;font-weight:800;color:rgba(255,255,255,.68);letter-spacing:.15em;text-transform:uppercase;margin-bottom:.5rem;}
.fair-promo h2{font-family:'Playfair Display',serif;font-size:clamp(1.4rem,3vw,2rem);font-weight:700;color:#fff;line-height:1.2;margin-bottom:.5rem;}
.fair-promo p{font-size:.9rem;color:rgba(255,255,255,.82);max-width:560px;line-height:1.6;}
.fair-promo-actions{display:flex;gap:1rem;flex-wrap:wrap;}
.fair-promo-btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;padding:.85rem 1.35rem;border-radius:25px;font-size:.86rem;font-weight:800;text-decoration:none;text-align:center;}
.fair-promo-btn.primary{background:#fff;color:#002D62;}
.fair-promo-btn.secondary{background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.35);}
.pb-home-ad{max-width:1200px;margin:0 auto;padding:0 2rem}.pb-home-ad:empty{display:none}.pb-home-ad .pb-sponsor-card{margin:1.5rem 0}

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
.noticia-img img{display:block;width:100%;height:100%;object-fit:contain;object-position:center;}
.noticia-body{padding:1.2rem;flex:1;display:flex;flex-direction:column;}
.noticia-cat{font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.4rem;}
.noticia-title{font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;color:var(--dark);line-height:1.3;margin-bottom:0.5rem;flex:1;}
.noticia-excerpt{font-size:0.78rem;color:var(--mid);line-height:1.6;margin-bottom:0.8rem;}
.noticia-date{font-size:0.65rem;color:#999;}

/* LO MÁS RECIENTE */
.latest-home{background:#fff;padding:2rem 0;border-bottom:1px solid var(--border);}
.latest-home-inner{max-width:1200px;margin:0 auto;padding:0 2rem;}
.latest-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-top:.5rem;}
.latest-card{display:flex;flex-direction:column;background:#f7f7f3;border:1px solid var(--border);border-radius:8px;overflow:hidden;color:inherit;text-decoration:none;}
.latest-card img{display:block;width:100%;height:155px;object-fit:contain;object-position:center;background:#eef1f5;}
.latest-placeholder{height:155px;background:linear-gradient(135deg,#002d62 0%,#064886 62%,#ce1126 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;text-align:center;gap:.35rem;}
.latest-placeholder strong{font-family:'Playfair Display',serif;font-size:1.15rem;}
.latest-placeholder span{font-size:2rem;}
.latest-copy{padding:1rem;display:flex;flex-direction:column;flex:1;}
.latest-label{font-size:.6rem;color:var(--red);font-weight:900;letter-spacing:.1em;text-transform:uppercase;}
.latest-copy h3{font-family:'Playfair Display',serif;font-size:1rem;line-height:1.3;margin:.35rem 0;color:var(--dark);}
.latest-copy p{font-size:.75rem;color:var(--mid);line-height:1.55;}
.latest-date{font-size:.62rem;color:#999;margin-top:auto;padding-top:.8rem;}

/* DIRECTORIO */
.directorio{background:var(--white);border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:2rem 0;}
.directorio-inner{max-width:1200px;margin:0 auto;padding:0 2rem;}
.directorio-grid{display:block;margin-top:1.5rem;}
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

/* AGENDA BORICUA */
.agenda-home{background:#fff;padding:2rem 0;border-bottom:1px solid var(--border);}
.agenda-home-inner{max-width:1200px;margin:0 auto;padding:0 2rem;}
.agenda-home-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-top:1rem;}
.agenda-mini{display:flex;gap:.9rem;background:var(--light);border:1px solid var(--border);border-radius:8px;padding:1rem;text-decoration:none;color:inherit;}
.agenda-mini-date{width:52px;height:58px;background:var(--blue);color:#fff;border-radius:7px;display:flex;flex-direction:column;align-items:center;justify-content:center;flex-shrink:0;text-transform:uppercase;}
.agenda-mini-date strong{font-size:1.25rem;}.agenda-mini-date span{font-size:.62rem;}
.agenda-mini-type{font-size:.58rem;color:var(--red);font-weight:900;text-transform:uppercase;letter-spacing:.06em;}
.agenda-mini h3{font-family:'Playfair Display',serif;font-size:.95rem;line-height:1.25;margin:.2rem 0;color:var(--dark);}
.agenda-mini p{font-size:.7rem;color:var(--mid);line-height:1.4;}
@media(max-width:800px){.agenda-home-grid{grid-template-columns:1fr;}}

/* FERIA */
.feria-section{background:var(--blue);padding:2.5rem 0;}
.feria-inner{max-width:1200px;margin:0 auto;padding:0 2rem;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;}
.feria-eyebrow{font-size:0.65rem;font-weight:800;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:0.6rem;}
.feria-title{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3vw,2.6rem);font-weight:800;color:#fff;line-height:1.15;margin-bottom:1rem;}
.feria-title .accent{color:#90CAF9;}
.feria-sub{font-size:0.92rem;color:rgba(255,255,255,0.65);line-height:1.8;margin-bottom:1.5rem;}
.btn-white{display:inline-flex;align-items:center;gap:0.5rem;background:#fff;color:var(--blue);padding:0.85rem 1.8rem;border-radius:4px;font-size:0.88rem;font-weight:700;text-decoration:none;transition:all 0.2s;}
.btn-white:hover{background:#f0f0f0;}

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
.newsletter-form{display:flex;flex-wrap:wrap;gap:0.5rem;max-width:420px;margin:0 auto;}
.newsletter-input{flex:1;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:0.8rem 1rem;color:#fff;font-size:0.85rem;outline:none;font-family:'Inter',sans-serif;}
.newsletter-input::placeholder{color:rgba(255,255,255,0.25);}
.newsletter-btn{background:var(--red);color:#fff;border:none;border-radius:4px;padding:0.8rem 1.2rem;font-size:0.85rem;font-weight:700;cursor:pointer;white-space:nowrap;font-family:'Inter',sans-serif;}
.newsletter-btn:hover{background:#a80e1f;}
.newsletter-note{font-size:0.68rem;color:rgba(255,255,255,0.35);margin-top:0.8rem;}.newsletter .pb-subscribe-status{flex-basis:100%;min-height:1.2em;margin:.5rem 0 0;font-size:.85rem;font-weight:700;color:#ff8b98}.newsletter .pb-subscribe-status[data-state="success"]{color:#72d993}.newsletter .pb-subscribe-status[data-state="error"]{color:#ff8b98}@media(max-width:520px){.newsletter-form{align-items:stretch;flex-direction:column}.newsletter-btn{width:100%}}
.pb-app{background:linear-gradient(135deg,#002D62,#001a3d);padding:2rem;}
.pb-app-inner{max-width:900px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:1.5rem;}
.pb-app-copy{display:flex;align-items:center;gap:1rem;}
.pb-app-icon{width:68px;height:68px;border-radius:16px;box-shadow:0 5px 18px rgba(0,0,0,.25);}
.pb-app h3{font-family:'Playfair Display',serif;color:#fff;font-size:1.35rem;margin-bottom:.3rem;}
.pb-app p{color:rgba(255,255,255,.7);font-size:.82rem;line-height:1.5;}
.pb-app-actions{display:flex;gap:.7rem;flex-wrap:wrap;justify-content:flex-end;}
.pb-app-btn{border:0;border-radius:7px;padding:.75rem 1rem;font-family:'Inter',sans-serif;font-size:.78rem;font-weight:800;cursor:pointer;white-space:nowrap;}
.pb-app-install{background:#fff;color:#002D62;}
.pb-app-alerts{background:#CE1126;color:#fff;}
.pb-app-status{font-size:.7rem;color:#f5c842;margin-top:.5rem;display:none;}
.pb-coqui-alert{position:fixed;z-index:1000;top:calc(.75rem + env(safe-area-inset-top));left:50%;width:min(92vw,560px);transform:translate(-50%,-140%);opacity:0;display:flex;align-items:center;gap:.8rem;padding:.85rem 1rem;background:#002D62;color:#fff;border:2px solid #f5c842;border-radius:14px;box-shadow:0 12px 35px #001a3d66;transition:transform .28s ease,opacity .28s ease;pointer-events:none}.pb-coqui-alert.show{transform:translate(-50%,0);opacity:1;pointer-events:auto}.pb-coqui-alert-icon{display:grid;place-items:center;flex:0 0 46px;width:46px;height:46px;background:#fff;border-radius:50%;font-size:1.65rem}.pb-coqui-alert-copy{min-width:0;flex:1}.pb-coqui-alert-copy strong,.pb-coqui-alert-copy span{display:block}.pb-coqui-alert-copy strong{font-size:.88rem}.pb-coqui-alert-copy span{margin-top:.18rem;color:#e4edf8;font-size:.76rem;line-height:1.35;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.pb-coqui-alert-open{display:none;flex:0 0 auto;background:#CE1126;color:#fff;text-decoration:none;border-radius:8px;padding:.58rem .7rem;font-size:.7rem;font-weight:900}.pb-coqui-alert-open.show{display:block}
@media(max-width:700px){.pb-app-inner{align-items:flex-start;flex-direction:column}.pb-app-actions{width:100%;justify-content:stretch}.pb-app-btn{flex:1}.pb-app-icon{width:58px;height:58px}}
@media(max-width:700px){.pb-home-ad{padding:0 1rem}}

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
.pb-footer-owner{font-size:0.68rem;color:#999;}
.pb-footer-owner a{color:var(--red);text-decoration:none;}


@media(max-width:768px){
.recursos-inner{grid-template-columns:1fr!important;}

  .nav-menu-toggle{display:inline-flex;align-items:center;justify-content:center;}
  .nav-links{display:none;width:100%;flex-direction:column;align-items:stretch;gap:0;padding:.55rem 0 .15rem;border-top:1px solid var(--border);}
  .nav-links.is-open{display:flex;}
  .nav-links a{padding:.7rem .15rem;font-size:.76rem;}
  .nav-cta{text-align:center;margin-top:.25rem;}
  .nav-top{flex-wrap:wrap;padding:0.8rem 1rem;}
  .hero-inner{grid-template-columns:1fr;gap:1.5rem;padding:0 1rem;}
  .hero-sidebar{border-left:none;border-top:1px solid var(--border);padding-left:0;padding-top:1rem;}
  .noticias-inner{padding:0 1rem;}
  .noticias-grid{grid-template-columns:1fr;}
  .latest-home-inner{padding:0 1rem;}
  .latest-grid{grid-template-columns:1fr;}
  .directorio-inner{padding:0 1rem;}
  .feria-inner{grid-template-columns:1fr;gap:2rem;padding:0 1rem;}
  .viajes-inner{padding:0 1rem;}
  .viajes-grid{grid-template-columns:1fr;}
  .pb-footer-main{grid-template-columns:1fr 1fr;padding:2rem 1rem;}
  .pb-footer-bottom{padding:1rem;}
  .fair-promo{padding:2rem 1rem;}
  .fair-promo-inner{align-items:stretch;}
  .fair-promo-actions{width:100%;flex-direction:column;}
  .fair-promo-btn{width:100%;white-space:normal;line-height:1.35;}
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
@media(max-width:640px){.viajes-dest-grid{grid-template-columns:repeat(2,1fr)!important;}}

/* Compact homepage organization; retain the current PB identity. */

.home-weekly{padding:30px 0;background:#f7f4ec;border-bottom:1px solid var(--border)}.home-weekly .sec-divider-inner{margin-bottom:18px}.home-weekly-card{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.3fr);border:1px solid #e3ded2;border-radius:16px;overflow:hidden;background:#fff}.home-weekly-photo{display:block;background:#eee9df;min-height:280px}.home-weekly-photo img{width:100%;height:100%;max-height:360px;display:block;object-fit:contain}.home-weekly-copy{padding:clamp(22px,3vw,36px);align-self:center;min-width:0}.home-weekly-kicker{font-size:.66rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--red);margin-bottom:10px}.home-weekly-copy h3{font-family:'Playfair Display',Georgia,serif;font-size:clamp(1.5rem,3vw,2rem);line-height:1.2;margin:0 0 8px}.home-weekly-copy h3 a{color:var(--blue);text-decoration:none}.home-weekly-project{font-size:.88rem;font-weight:700;color:#6b573d;margin:0 0 12px}.home-weekly-summary{font-size:.93rem;color:#50575b;line-height:1.65;margin:12px 0 20px;max-width:64ch}.home-weekly-read{display:inline-block;padding:11px 18px;background:var(--blue);color:#fff;border-radius:7px;text-decoration:none;font-size:.83rem;font-weight:750}.home-weekly a:focus-visible{outline:3px solid var(--red);outline-offset:4px}.home-weekly-card.no-photo{grid-template-columns:1fr}@media(max-width:640px){.home-weekly{padding:24px 0}.home-weekly-card{grid-template-columns:1fr}.home-weekly-photo{min-height:0}.home-weekly-photo img{height:260px;max-height:none}.home-weekly-copy{padding:22px}.home-weekly .sec-divider-label{font-size:1rem}}

.home-section-inner{max-width:1180px;margin:0 auto;padding:0 24px}
.home-creations,.home-resources{padding:28px 0;background:#fff;border-bottom:1px solid var(--border)}
.home-section-copy{font-size:.9rem;line-height:1.6;color:var(--mid);margin:10px 0 18px}
.home-creations-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px}
.home-creation{display:block;min-width:0;color:var(--dark);text-decoration:none;border:1px solid var(--border);border-radius:4px;overflow:hidden;background:#fff}
.home-creation img{display:block;width:100%;height:190px;object-fit:contain;background:#f5f5f0}
.home-creation-copy{padding:12px}.home-creation h3{font-family:'Playfair Display',Georgia,serif;font-size:1rem;line-height:1.35;margin:0 0 6px}.home-creation p{font-size:.8rem;line-height:1.5;color:#555}.home-creation small{display:block;font-size:.75rem;color:#666;margin-top:4px}.home-creation span{display:block;font-size:.75rem;color:var(--red);font-weight:700;margin-top:10px}
.home-register{font-size:.8rem;margin-top:18px}.home-register a{color:var(--blue)}
.home-resource-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:18px}.home-resource-grid>a{padding:20px;border:1px solid var(--border);border-top:3px solid var(--blue);background:#fff;color:var(--dark);text-decoration:none;border-radius:4px}.home-resource-grid h3{font-family:'Playfair Display',Georgia,serif;font-size:1.1rem;line-height:1.35}.home-resource-grid p{font-size:.85rem;line-height:1.6;color:var(--mid);margin:10px 0}.home-resource-grid span{font-size:.8rem;color:var(--red);font-weight:700}
.home-sidebar-heading{font-family:'Playfair Display',Georgia,serif;font-size:1.2rem;margin-bottom:8px;color:var(--dark)}
.hero-sidebar .latest-grid{display:block}.hero-sidebar .latest-card{display:block;border:0;border-bottom:1px solid var(--border);border-radius:0;box-shadow:none;margin:0}.hero-sidebar .latest-card img,.hero-sidebar .latest-placeholder,.hero-sidebar .latest-copy p,.hero-sidebar .latest-label{display:none}.hero-sidebar .latest-copy{padding:16px 0}.hero-sidebar .latest-copy h3{font-size:1.05rem;line-height:1.4}.hero-sidebar .sec-divider-link{margin-top:16px;align-self:flex-start}.hero-sidebar .latest-date{margin-top:8px}
.home-travel>summary{cursor:pointer;color:var(--blue);font-size:.9rem;padding:12px 0}.home-travel:not([open])>.viajes-dest-grid{display:none!important}
.home-feed-fallback{padding:20px;color:var(--blue)}
.noticia-excerpt{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.hero-sidebar .latest-card{background:transparent}
.hero-inner,.noticias-inner,.agenda-home-inner{max-width:1180px}
.home-creations a:focus-visible,.home-resources a:focus-visible,.home-travel>summary:focus-visible{outline:3px solid var(--blue);outline-offset:3px}
@media(max-width:900px){.home-creations-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.home-resource-grid{grid-template-columns:1fr}}
@media(max-width:640px){.home-section-inner{padding:0 16px}.home-creations-grid{gap:12px}.home-creation img{height:150px}.home-creation-copy{padding:10px}.home-creation h3{font-size:.9rem}.sec-divider-inner{flex-wrap:wrap;gap:8px}.hero-sidebar{padding-top:16px}.home-creations,.home-resources{padding:24px 0}}

</style>
<script nowprocket data-noptimize="1" data-cfasync="false" data-wpfc-render="false" seraph-accel-crit="1" data-no-defer="1">
  (function () {
      var script = document.createElement("script");
      script.async = 1;
      script.src = 'https://tpembars.com/NDcwMTYx.js?t=470161';
      document.head.appendChild(script);
  })();
</script>
${renderStay22()}
</head>
<body>
<aside class="pb-coqui-alert" id="pb-coqui-alert" role="status" aria-live="assertive" aria-atomic="true">
  <div class="pb-coqui-alert-icon" aria-hidden="true">🐸</div>
  <div class="pb-coqui-alert-copy"><strong id="pb-coqui-alert-heading">¡Coquí de Planeta Boricua!</strong><span id="pb-coqui-alert-message">Hay algo nuevo para ti.</span></div>
  <a class="pb-coqui-alert-open" id="pb-coqui-alert-open" href="/">Abrir</a>
</aside>

<!-- NAV -->
<nav>
  <div class="nav-top">
    <a href="/" class="nav-logo">
      <img src="/img/pb-logo-header.webp" alt="Planeta Boricua" width="240" height="202" style="height:44px;width:auto;mix-blend-mode:multiply;">
      <div>
        <div class="nav-logo-text">Planeta Boricua</div>
        <div class="nav-logo-sub">Más Boricua Que Un Mofongo</div>
      </div>
    </a>
    <button class="nav-menu-toggle" id="pb-nav-toggle" type="button" aria-expanded="false" aria-controls="pb-nav-links">Menú</button>
    <div class="nav-links" id="pb-nav-links">
      <a href="/lo-mas-reciente">Lo más reciente</a>
      <a href="/blog">El Balcón</a>
      <a href="/agenda-boricua">Agenda</a>
      <a href="/pueblos">Nuestros pueblos</a>
      <a href="#recursos">Recursos</a>
      <a href="/feria-artesanos">Artesanos</a>
      ${process.env.PB_TALENT_ENABLED !== 'true' ? '' : '<a href="/talento-boricua">Talento Boricua</a>'}
      <a href="#viajes">Viajes</a>
      <a href="#newsletter" class="nav-cta">Boletín →</a>
    </div>
  </div>
</nav>

<!-- HERO -->
<section class="hero" id="hero">
  <div class="hero-inner">
    <div class="hero-main" id="hero-main">
      <div class="hero-main-img" id="hero-main-img" style="display:flex;align-items:center;justify-content:center;font-size:5rem;">🇵🇷</div>
      <div class="hero-cat" id="hero-main-cat">Cargando...</div>
      <h1 class="hero-title" id="hero-main-title">Historias de nuestro Planeta Boricua</h1>
      <p class="hero-excerpt" id="hero-main-excerpt"></p>
      <div class="hero-meta">
        <span id="hero-main-date"></span>
        <a href="#" id="hero-main-link" class="hero-read">Leer artículo →</a>
      </div>
    </div>
    <aside class="hero-sidebar" id="hero-sidebar" aria-labelledby="home-latest-title">
      <h2 id="home-latest-title" class="home-sidebar-heading">Lo más reciente</h2>
      <div id="latest-grid" class="latest-grid"><p>Cargando novedades…</p></div>
      <a href="/lo-mas-reciente" class="sec-divider-link">Ver todas →</a>
    </aside>
  </div>
</section>

<div class="pb-home-ad" aria-label="Publicidad destacada"><!--PB_AD_HOME_AFTER_HERO--></div>

<!--PB_HOME_WEEKLY_ARTISAN-->

<!-- CREACIONES REALES DE LA FERIA -->
<section class="home-creations" id="feria" aria-labelledby="fair-promo-title">
  <div class="home-section-inner">
    <p class="home-section-copy">Feria Digital · Abierta 24/7</p>
    <div class="sec-divider-inner"><h2 id="fair-promo-title" class="sec-divider-label">Creaciones de nuestra gente</h2><div class="sec-divider-line"></div><a href="/feria-artesanos" class="sec-divider-link">Explorar la Feria →</a></div>
    <p class="home-section-copy">Visita la Feria Digital de Artesanos Boricuas: conoce sus piezas y contáctalos directamente.</p>
    <!--PB_HOME_CREATIONS-->
    <p class="home-register"><a href="/pb/add-negocio">¿Eres artesano? Crea tu espacio digital gratis →</a></p>
  </div>
</section>

<!-- AGENDA BORICUA -->
<section class="agenda-home" id="agenda">
  <div class="agenda-home-inner">
    <div class="sec-divider-inner">
      <span class="sec-divider-label">Esta semana en nuestra comunidad</span>
      <div class="sec-divider-line"></div>
      <a href="/agenda-boricua" class="sec-divider-link">Ver todos →</a>
    </div>
    <p style="font-size:.85rem;color:var(--mid);line-height:1.6;">Eventos gratuitos que celebran nuestra cultura en Puerto Rico y Estados Unidos.</p>
    <div class="agenda-home-grid" id="agenda-home-grid"><div style="color:#999;font-size:.8rem;padding:1rem 0;">Buscando próximos eventos…</div></div>
    <div style="margin-top:1rem;"><a href="/compartir-evento-boricua" class="btn-red">Comparte un evento gratis →</a></div>
  </div>
</section>

<!-- ARTÍCULOS ORIGINALES -->
<section class="noticias" id="articulos">
  <div class="noticias-inner">
    <div class="sec-divider-inner">
      <span class="sec-divider-label">Más historias del Balcón</span>
      <div style="flex:1;height:2px;background:var(--red);margin:0 1rem;"></div>
      <a href="/blog" class="sec-divider-link">Ver todos →</a>
    </div>
    <div class="noticias-grid" id="noticias-grid">
      <div style="background:#fff;border-radius:4px;height:280px;display:flex;align-items:center;justify-content:center;color:#ccc;font-size:0.82rem;">Cargando...</div>
      <div style="background:#fff;border-radius:4px;height:280px;"></div>
      <div style="background:#fff;border-radius:4px;height:280px;"></div>
    </div>
  </div>
</section>

<div class="pb-home-ad" aria-label="Publicidad"><!--PB_AD_HOME_MIDDLE--></div>

<!-- DIRECTORIO -->

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
        '<a href="/pb/add-negocio" style="display:inline-block;background:var(--blue);color:#fff;padding:0.8rem 1.5rem;border-radius:8px;text-decoration:none;font-weight:700;font-size:0.9rem;">🎨 Regístrate Gratis →</a>';
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
    const urlParams = new URLSearchParams(window.location.search);
    const previewKey = urlParams.get('preview');
    const previewParam = previewKey ? 'preview=' + encodeURIComponent(previewKey) : '';
    const url = location
      ? '/api/pb-negocios/' + location + '?' + [category ? 'category=' + category : '', previewParam].filter(Boolean).join('&')
      : '/api/pb-negocios/all' + '?' + [category ? 'category=' + category : '', previewParam].filter(Boolean).join('&');

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
        '<a href="/pb/add-negocio" style="display:inline-block;background:var(--blue);color:#fff;padding:0.8rem 1.5rem;border-radius:8px;text-decoration:none;font-weight:700;font-size:0.9rem;">🎨 Regístrate Gratis →</a>' +
        '</div>';
      return;
    }

    // Sort: destacado first, then by date
    filtered.sort(function(a,b){
      if (a.destacado && !b.destacado) return -1;
      if (!a.destacado && b.destacado) return 1;
      return 0;
    });

    // Group by city
    var byCity = {};
    filtered.forEach(function(n) {
      var city = n.city || 'Puerto Rico';
      if (!byCity[city]) byCity[city] = [];
      byCity[city].push(n);
    });

    var html = '';
    Object.keys(byCity).sort().forEach(function(city) {
      var negocios = byCity[city];
      html += '<div style="margin-bottom:1.5rem;">';
      html += '<div style="font-weight:800;font-size:0.85rem;color:var(--blue);text-transform:uppercase;letter-spacing:0.08em;padding:0.5rem 1rem;background:#f0f4ff;border-left:3px solid var(--blue);margin-bottom:0.5rem;">📍 ' + city + ' <span style="font-weight:400;color:var(--mid);font-size:0.75rem;">(' + negocios.length + ')</span></div>';
      html += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:0.8rem;padding:0 0.5rem;">';
      negocios.forEach(function(n) {
        var icon = categoryIcons[n.category] || '🏪';
        var phone = n.phone ? n.phone.replace('.0','') : '';
        var webLink = n.website && n.website !== 'nan' && n.website !== '' 
          ? '<a href="' + n.website + '" target="_blank" style="font-size:0.72rem;color:var(--blue);text-decoration:none;font-weight:700;">🌐 Web</a>' : '';
        var phoneLink = phone && phone !== 'nan' 
          ? '<a href="tel:' + phone + '" style="font-size:0.72rem;color:var(--red);text-decoration:none;font-weight:700;">📞 ' + phone + '</a>' : '';
        var rating = n.rating && n.rating > 0 
          ? '<span style="font-size:0.68rem;color:#f59e0b;font-weight:700;">⭐ ' + n.rating + '</span>' : '';
        html += '<div style="background:#fff;border:1px solid var(--border);border-radius:8px;padding:0.9rem;display:flex;flex-direction:column;gap:0.4rem;">';
        html += '<div style="display:flex;align-items:flex-start;gap:0.5rem;">';
        html += '<span style="font-size:1.2rem;">' + icon + '</span>';
        html += '<div style="flex:1;">';
        html += '<div style="font-weight:700;font-size:0.88rem;color:var(--dark);line-height:1.3;">' + n.name + '</div>';
        html += '<div style="font-size:0.72rem;color:var(--mid);margin-top:0.2rem;">' + n.category + '</div>';
        html += '</div>';
        if (rating) html += rating;
        html += '</div>';
        if (phoneLink || webLink) {
          html += '<div style="display:flex;gap:0.8rem;flex-wrap:wrap;margin-top:0.3rem;">' + phoneLink + webLink + '</div>';
        }
        html += '</div>';
      });
      html += '</div></div>';
    });
    grid.innerHTML = html;

  } catch(e) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--mid);">Error cargando directorio. Intenta de nuevo.</div>';
  }
}

// La Feria completa se publica en /feria-artesanos el 23 de septiembre.
</script>

<!-- RECURSOS -->
<section id="recursos" class="home-resources" aria-labelledby="home-resources-title">
  <div class="home-section-inner">
    <div class="sec-divider-inner"><h2 id="home-resources-title" class="sec-divider-label">Guías que ayudan</h2><div class="sec-divider-line"></div><a href="/recursos" class="sec-divider-link">Todos los recursos →</a></div>
    <div class="home-resource-grid">
      <a href="/mudarse-de-pr"><h3>De Puerto Rico a Estados Unidos</h3><p>Orientación para preparar tu mudanza y comenzar esta etapa.</p><span>Consultar la guía →</span></a>
      <a href="/regresar-a-pr"><h3>Regresar a Puerto Rico</h3><p>Información práctica para organizar tu regreso a la isla.</p><span>Preparar el regreso →</span></a>
      <a href="/recursos"><h3>Encuentra el recurso que necesitas</h3><p>Explora las guías disponibles para la vida entre PR y USA.</p><span>Explorar recursos →</span></a>
    </div>
  </div>
</section>

<!-- VIAJES -->
<section class="viajes" id="viajes">
  <div class="viajes-inner">
    <div class="sec-divider-inner">
      <span class="sec-divider-label">Viajes & Destinos</span>
      <div style="flex:1;height:2px;background:var(--red);margin:0 1rem;"></div>
      <span style="font-size:0.72rem;color:var(--mid);">Enlace afiliado · Trip.com</span>
    </div>
    <details class="home-travel"><summary>Explorar hoteles y destinos · enlaces afiliados</summary>
    <div class="viajes-dest-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-top:1.5rem;">

      <a href="https://us.trip.com/hotels/list?flexType=1&cityId=-1&countryId=208&destName=Puerto%20Rico&searchType=C&optionId=208&crn=1&adult=2&curr=USD&locale=es-US&SID=2209817&allianceid=1094387&utm_campaign=520530" target="_blank" rel="sponsored noopener noreferrer" style="text-decoration:none;color:inherit;background:#fff;border-radius:10px;overflow:hidden;border:1px solid var(--border);display:block;">
        <div id="vimg-pr" role="img" aria-label="Foto del destino" style="height:140px;background-image:url('/img/travel-destinations.webp');background-size:400% 200%;background-position:0% 0%;background-repeat:no-repeat;"></div>
        <div style="padding:1rem;">
          <div style="font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem;">Destino Principal</div>
          <div style="font-size:0.9rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;">Puerto Rico</div>
          <div style="font-size:0.75rem;color:var(--mid);margin-bottom:0.5rem;">La Isla del Encanto</div>
          <div style="font-size:0.75rem;font-weight:700;color:var(--blue);">Ver hoteles →</div>
        </div>
      </a>

      <a href="https://us.trip.com/hotels/list?flexType=1&cityId=633&countryId=66&destName=Nueva%20York&searchType=CT&optionId=633&crn=1&adult=2&curr=USD&locale=es-US&SID=2209817&allianceid=1094387&utm_campaign=520530" target="_blank" rel="sponsored noopener noreferrer" style="text-decoration:none;color:inherit;background:#fff;border-radius:10px;overflow:hidden;border:1px solid var(--border);display:block;">
        <div id="vimg-ny" role="img" aria-label="Foto del destino" style="height:140px;background-image:url('/img/travel-destinations.webp');background-size:400% 200%;background-position:33.333% 0%;background-repeat:no-repeat;"></div>
        <div style="padding:1rem;">
          <div style="font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem;">La Gran Manzana</div>
          <div style="font-size:0.9rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;">Nueva York</div>
          <div style="font-size:0.75rem;color:var(--mid);margin-bottom:0.5rem;">El Barrio, El Bronx, Brooklyn</div>
          <div style="font-size:0.75rem;font-weight:700;color:var(--blue);">Ver hoteles →</div>
        </div>
      </a>

      <a href="https://us.trip.com/hotels/list?flexType=1&cityId=1187&countryId=66&destName=Orlando&searchType=CT&optionId=1187&crn=1&adult=2&curr=USD&locale=es-US&SID=2209817&allianceid=1094387&utm_campaign=520530" target="_blank" rel="sponsored noopener noreferrer" style="text-decoration:none;color:inherit;background:#fff;border-radius:10px;overflow:hidden;border:1px solid var(--border);display:block;">
        <div id="vimg-orlando" role="img" aria-label="Foto del destino" style="height:140px;background-image:url('/img/travel-destinations.webp');background-size:400% 200%;background-position:66.667% 0%;background-repeat:no-repeat;"></div>
        <div style="padding:1rem;">
          <div style="font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem;">Florida</div>
          <div style="font-size:0.9rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;">Orlando</div>
          <div style="font-size:0.75rem;color:var(--mid);margin-bottom:0.5rem;">Parques y comunidad boricua</div>
          <div style="font-size:0.75rem;font-weight:700;color:var(--blue);">Ver hoteles →</div>
        </div>
      </a>

      <a href="https://us.trip.com/hotels/list?flexType=1&cityId=20436&countryId=66&destName=Miami&searchType=CT&optionId=20436&crn=1&adult=2&curr=USD&locale=es-US&SID=2209817&allianceid=1094387&utm_campaign=520530" target="_blank" rel="sponsored noopener noreferrer" style="text-decoration:none;color:inherit;background:#fff;border-radius:10px;overflow:hidden;border:1px solid var(--border);display:block;">
        <div id="vimg-miami" role="img" aria-label="Foto del destino" style="height:140px;background-image:url('/img/travel-destinations.webp');background-size:400% 200%;background-position:100% 0%;background-repeat:no-repeat;"></div>
        <div style="padding:1rem;">
          <div style="font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem;">Sur de Florida</div>
          <div style="font-size:0.9rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;">Miami</div>
          <div style="font-size:0.75rem;color:var(--mid);margin-bottom:0.5rem;">Playas y cultura latina</div>
          <div style="font-size:0.75rem;font-weight:700;color:var(--blue);">Ver hoteles →</div>
        </div>
      </a>

      <a href="https://us.trip.com/hotels/list?flexType=1&cityId=5677&countryId=276&destName=Punta%20Cana&searchType=CT&optionId=5677&crn=1&adult=2&curr=USD&locale=es-US&SID=2209817&allianceid=1094387&utm_campaign=520530" target="_blank" rel="sponsored noopener noreferrer" style="text-decoration:none;color:inherit;background:#fff;border-radius:10px;overflow:hidden;border:1px solid var(--border);display:block;">
        <div id="vimg-puntacana" role="img" aria-label="Foto del destino" style="height:140px;background-image:url('/img/travel-destinations.webp');background-size:400% 200%;background-position:0% 100%;background-repeat:no-repeat;"></div>
        <div style="padding:1rem;">
          <div style="font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem;">Caribe</div>
          <div style="font-size:0.9rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;">Punta Cana</div>
          <div style="font-size:0.75rem;color:var(--mid);margin-bottom:0.5rem;">Rep. Dominicana all-inclusive</div>
          <div style="font-size:0.75rem;font-weight:700;color:var(--blue);">Ver hoteles →</div>
        </div>
      </a>

      <a href="https://us.trip.com/hotels/list?flexType=1&cityId=-1&countryId=37&destName=Colombia&searchType=C&optionId=37&crn=1&adult=2&curr=USD&locale=es-US&SID=2209817&allianceid=1094387&utm_campaign=520530" target="_blank" rel="sponsored noopener noreferrer" style="text-decoration:none;color:inherit;background:#fff;border-radius:10px;overflow:hidden;border:1px solid var(--border);display:block;">
        <div id="vimg-colombia" role="img" aria-label="Foto del destino" style="height:140px;background-image:url('/img/travel-destinations.webp');background-size:400% 200%;background-position:33.333% 100%;background-repeat:no-repeat;"></div>
        <div style="padding:1rem;">
          <div style="font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem;">Sudamérica</div>
          <div style="font-size:0.9rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;">Colombia</div>
          <div style="font-size:0.75rem;color:var(--mid);margin-bottom:0.5rem;">Cartagena, Medellín, Bogotá</div>
          <div style="font-size:0.75rem;font-weight:700;color:var(--blue);">Ver hoteles →</div>
        </div>
      </a>

      <a href="https://us.trip.com/hotels/list?flexType=1&cityId=357&countryId=95&destName=Madrid&searchType=CT&optionId=357&crn=1&adult=2&curr=USD&locale=es-US&SID=2209817&allianceid=1094387&utm_campaign=520530" target="_blank" rel="sponsored noopener noreferrer" style="text-decoration:none;color:inherit;background:#fff;border-radius:10px;overflow:hidden;border:1px solid var(--border);display:block;">
        <div id="vimg-madrid" role="img" aria-label="Foto del destino" style="height:140px;background-image:url('/img/travel-destinations.webp');background-size:400% 200%;background-position:66.667% 100%;background-repeat:no-repeat;"></div>
        <div style="padding:1rem;">
          <div style="font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem;">Europa</div>
          <div style="font-size:0.9rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;">Madrid</div>
          <div style="font-size:0.75rem;color:var(--mid);margin-bottom:0.5rem;">España — puerta a Europa</div>
          <div style="font-size:0.75rem;font-weight:700;color:var(--blue);">Ver hoteles →</div>
        </div>
      </a>

      <a href="https://us.trip.com/?SID=2209817&allianceid=1094387&utm_campaign=520530&locale=es-US" target="_blank" rel="sponsored noopener noreferrer" style="text-decoration:none;color:inherit;background:linear-gradient(135deg,var(--blue),#001a4d);border-radius:10px;overflow:hidden;border:1px solid var(--blue);display:block;">
        <div id="vimg-generic" role="img" aria-label="Foto del destino" style="height:140px;background-image:url('/img/travel-destinations.webp');background-size:400% 200%;background-position:100% 100%;background-repeat:no-repeat;"></div>
        <div style="padding:1rem;">
          <div style="font-size:0.6rem;font-weight:800;color:rgba(255,255,255,0.6);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem;">Busca tu destino</div>
          <div style="font-size:0.9rem;font-weight:700;color:#fff;margin-bottom:0.3rem;">A donde quieres ir?</div>
          <div style="font-size:0.75rem;color:rgba(255,255,255,0.7);margin-bottom:0.5rem;">Hoteles y vuelos a cualquier destino</div>
          <div style="font-size:0.75rem;font-weight:700;color:#f5c842;">Buscar ahora →</div>
        </div>
      </a>

    </div>
    </details>
  </div>
</section>

<!-- NEWSLETTER -->
<section class="newsletter" id="newsletter">
  <div class="newsletter-inner">
    <div class="newsletter-eyebrow">Boletín Boricua</div>
    <h2>Lo Boricua <em>Directo</em> a Tu Email</h2>
    <p>Historias, cultura, recursos y novedades de nuestra comunidad — directo a tu correo. Sin spam, solo lo bueno.</p>
    <form class="newsletter-form" data-pb-subscribe data-source="inicio">
      <input class="newsletter-input" name="email" type="email" inputmode="email" autocomplete="email" placeholder="tu@email.com" aria-label="Correo electrónico" required>
      <button class="newsletter-btn" type="submit">Suscribirme →</button>
      <p class="pb-subscribe-status" role="status" aria-live="polite"></p>
    </form>
    <div class="newsletter-note">Sin spam. Cancela cuando quieras. ¡Wepa! 🇵🇷</div>
  </div>
</section>

<!-- APP INSTALABLE -->
<section class="pb-app" id="instalar-app">
  <div class="pb-app-inner">
    <div class="pb-app-copy">
      <img class="pb-app-icon" src="/icons/pb/icon-192.png" alt="Ícono de Planeta Boricua">
      <div>
        <h3>Lleva Planeta Boricua contigo 🇵🇷</h3>
        <p>Instálala en tu pantalla y activa el coquí para enterarte cuando publiquemos algo importante.</p>
        <div class="pb-app-status" id="pb-app-status" role="status"></div>
      </div>
    </div>
    <div class="pb-app-actions">
      <button class="pb-app-btn pb-app-install" id="pb-install-btn" type="button">📲 Instalar app</button>
      <button class="pb-app-btn pb-app-alerts" id="pb-alerts-btn" type="button">🔔 Activar el coquí</button>
    </div>
  </div>
</section>

<div class="pb-home-ad" aria-label="Publicidad"><!--PB_AD_HOME_BEFORE_FOOTER--></div>

<!-- FOOTER -->
${renderPBSiteFooter()}
<script src="/js/pb-ads.js?v=5" defer></script>

<script>
let pbInstallPrompt = null;

const pbNavToggle = document.getElementById('pb-nav-toggle');
const pbNavLinks = document.getElementById('pb-nav-links');
if (pbNavToggle && pbNavLinks) {
  pbNavToggle.addEventListener('click', function () {
    const open = pbNavLinks.classList.toggle('is-open');
    pbNavToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    pbNavToggle.textContent = open ? 'Cerrar' : 'Menú';
  });
}

function pbShowStatus(message) {
  const status = document.getElementById('pb-app-status');
  status.textContent = message;
  status.style.display = 'block';
}

function pbIsStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

let pbCoquiAlertTimer = null;

function pbShowCoquiAlert(message, url) {
  const alertBox = document.getElementById('pb-coqui-alert');
  const alertMessage = document.getElementById('pb-coqui-alert-message');
  const alertOpen = document.getElementById('pb-coqui-alert-open');
  if (!alertBox || !alertMessage || !alertOpen) return;
  alertMessage.textContent = message || 'Hay algo nuevo para ti.';
  if (url) {
    alertOpen.href = url;
    alertOpen.classList.add('show');
  } else {
    alertOpen.classList.remove('show');
  }
  alertBox.classList.add('show');
  clearTimeout(pbCoquiAlertTimer);
  pbCoquiAlertTimer = setTimeout(() => alertBox.classList.remove('show'), 8500);
}

function playCoqui() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const start = ctx.currentTime + 0.03;
    const master = ctx.createGain();
    master.gain.value = .52;
    master.connect(ctx.destination);
    [[1050, start, .09], [1650, start + .13, .16], [1050, start + .48, .09], [1650, start + .61, .16]].forEach(note => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = note[0];
      gain.gain.setValueAtTime(0, note[1]);
      gain.gain.linearRampToValueAtTime(.72, note[1] + .015);
      gain.gain.exponentialRampToValueAtTime(.001, note[1] + note[2]);
      osc.connect(gain).connect(master);
      osc.start(note[1]);
      osc.stop(note[1] + note[2] + .02);
    });
    setTimeout(() => ctx.close(), 1200);
  } catch (e) {}
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw-pb.js').catch(() => {}));
}

window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  pbInstallPrompt = event;
});

window.addEventListener('appinstalled', () => {
  pbInstallPrompt = null;
  pbShowStatus('¡Instalada! Ya tienes Planeta Boricua en tu pantalla.');
  document.getElementById('pb-install-btn').textContent = '✅ App instalada';
});

document.getElementById('pb-install-btn').addEventListener('click', async () => {
  if (pbIsStandalone()) {
    pbShowStatus('Ya estás usando Planeta Boricua como app.');
    return;
  }
  if (pbInstallPrompt) {
    pbInstallPrompt.prompt();
    await pbInstallPrompt.userChoice;
    pbInstallPrompt = null;
    return;
  }
  const isiPhone = /iphone|ipad|ipod/i.test(navigator.userAgent);
  pbShowStatus(isiPhone ? 'En iPhone: toca Compartir y luego “Añadir a pantalla de inicio”.' : 'Abre el menú del navegador y selecciona “Instalar aplicación” o “Añadir a pantalla”.');
});

document.getElementById('pb-alerts-btn').addEventListener('click', async () => {
  if (!('Notification' in window)) {
    pbShowStatus('Este navegador no permite avisos. Aun así puedes instalar la app.');
    return;
  }
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    localStorage.setItem('pb_coqui_enabled', '1');
    playCoqui();
    pbShowCoquiAlert('¡Listo! Así te avisará cuando publiquemos algo nuevo.');
    if (navigator.vibrate) navigator.vibrate([120, 70, 180]);
    pbShowStatus('¡Coquí activado! Sonará dentro de la app cuando detectemos una publicación nueva.');
    document.getElementById('pb-alerts-btn').textContent = '✅ Coquí activado';
  } else {
    pbShowStatus('Los avisos no fueron autorizados. Puedes activarlos luego desde el navegador.');
  }
});

async function pbCheckForUpdate(post) {
  if (!post || !post.link) return;
  const previous = localStorage.getItem('pb_latest_post');
  localStorage.setItem('pb_latest_post', post.link);
  if (!previous || previous === post.link || localStorage.getItem('pb_coqui_enabled') !== '1') return;
  playCoqui();
  pbShowCoquiAlert(post.title || 'Hay una publicación nueva.', post.link);
  if (navigator.vibrate) navigator.vibrate([120, 70, 180]);
  if (Notification.permission === 'granted' && 'serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready;
    registration.showNotification('Algo nuevo en Planeta Boricua 🇵🇷', {
      body: post.title,
      icon: '/icons/pb/icon-192.png',
      badge: '/icons/pb/notification-badge.svg',
      vibrate: [120, 70, 180],
      tag: 'pb-latest-post',
      data: { url: post.link }
    });
  }
}

// Lo más reciente — canal editorial rápido de PB
(function loadLatest(){
  const grid=document.getElementById('latest-grid');
  if(!grid)return;
  const safe=value=>String(value||'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  fetch('/api/pb-lo-mas-reciente').then(response=>response.json()).then(data=>{
    const items=(data.items||[]).slice(0,3);
    if(!items.length){grid.innerHTML='<div style="grid-column:1/-1;background:var(--light);border-radius:8px;padding:1.3rem;color:var(--mid);">Aquí aparecerán las actualizaciones importantes verificadas por Planeta Boricua.</div>';return;}
    grid.innerHTML=items.map(item=>'<a class="latest-card" href="/lo-mas-reciente/'+encodeURIComponent(item.slug)+'">'+(item.image&&item.image!=='/img/og-planetaboricua.jpg'?'<img src="'+safe(item.image)+'" alt="'+safe(item.title)+'" loading="lazy">':'<div class="latest-placeholder"><span>🇵🇷</span><strong>Planeta Boricua</strong></div>')+'<div class="latest-copy"><div class="latest-label">Lo más reciente</div><h3>'+safe(item.title)+'</h3><p>'+safe(item.summary)+'</p><div class="latest-date">'+new Date(item.publishedAt).toLocaleString('es-PR',{dateStyle:'medium',timeStyle:'short'})+'</div></div></a>').join('');
  }).catch(()=>{grid.innerHTML='<div style="color:var(--mid);font-size:.8rem;">No pudimos cargar las actualizaciones.</div>'});
})();

// Blog Feed
(function(){
  fetch('/api/planetaboricua-blog')
    .then(r => r.json())
    .then(posts => {
      if (!Array.isArray(posts) || !posts.length) throw new Error('No published posts');
      pbCheckForUpdate(posts[0]);

      // Hero main — first post WITH image, fallback to first post
      const heroPost = posts.find(p => p.img) || posts[0];
      const heroImg = document.getElementById('hero-main-img');
      if (heroPost.img) {
        heroImg.outerHTML = '<img id="hero-main-img" src="' + heroPost.img + '" alt="' + heroPost.title + '" width="768" height="320" fetchpriority="high" decoding="async" style="display:block;width:100%;height:320px;object-fit:contain;object-position:center;background:#eef1f5;border-radius:4px;margin-bottom:1rem;">';
      }
      document.getElementById('hero-main-cat').textContent = heroPost.tag;
      document.getElementById('hero-main-title').textContent = heroPost.title;
      document.getElementById('hero-main-excerpt').textContent = heroPost.summary;
      document.getElementById('hero-main-date').textContent = heroPost.date;
      document.getElementById('hero-main-link').href = heroPost.link;

      // Selección editorial — publicaciones del blog (excepto la principal)
      const grid = document.getElementById('noticias-grid');
      const noticiaPosts = posts.filter(p => p.link !== heroPost.link).slice(0, 3);
      grid.innerHTML = noticiaPosts.map(p =>
        '<a href="' + p.link + '" class="noticia-card">' +
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
    .catch(() => {
      document.getElementById('hero-main-cat').textContent = 'El Balcón';
      document.getElementById('hero-main-excerpt').textContent = 'Explora las historias y experiencias de nuestra comunidad.';
      document.getElementById('hero-main-link').href = '/blog';
      document.getElementById('noticias-grid').innerHTML = '<a href="/blog" class="home-feed-fallback">Visita El Balcón para leer nuestras historias →</a>';
    });
})();

setInterval(() => {
  fetch('/api/planetaboricua-blog?check=' + Date.now())
    .then(response => response.json())
    .then(posts => { if (posts && posts.length) pbCheckForUpdate(posts[0]); })
    .catch(() => {});
}, 10 * 60 * 1000);

// Próximos eventos de la Agenda Boricua
(function loadAgendaHome(){
  const grid=document.getElementById('agenda-home-grid');
  if(!grid)return;
  const safe=value=>String(value||'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  fetch('/api/pb-eventos-proximos').then(response=>response.json()).then(data=>{
    const events=(data.events||[]).slice(0,3);
    if(!events.length){grid.innerHTML='<div style="grid-column:1/-1;background:var(--light);border-radius:8px;padding:1.5rem;color:var(--mid);">La agenda está comenzando. ¿Conoces una actividad boricua gratuita? Compártela con nosotros.</div>';return;}
    grid.innerHTML=events.map(event=>{const date=new Date(event.startDate+'T12:00:00');const month=date.toLocaleDateString('es-PR',{month:'short'}).replace('.','');const location=event.virtual?'Virtual':[event.city,event.region].filter(Boolean).join(', ');return '<a class="agenda-mini" href="'+safe(event.url||'/agenda-boricua')+'"><div class="agenda-mini-date"><strong>'+date.getDate()+'</strong><span>'+safe(month)+'</span></div><div><div class="agenda-mini-type">'+safe(event.type||'Evento boricua')+'</div><h3>'+safe(event.name)+'</h3><p>📍 '+safe(location)+'</p></div></a>'}).join('');
  }).catch(()=>{grid.innerHTML='<div style="color:var(--mid);font-size:.8rem;">No pudimos cargar la agenda en este momento.</div>'});
})();


</script>

<script src="/js/pb-subscribe.js?v=1"></script>


<!-- Cookie Banner -->
<div id="cookie-banner" style="display:none;position:fixed;bottom:0;left:0;right:0;background:#111;color:#fff;padding:1rem 2rem;z-index:9999;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;font-family:'Inter',sans-serif;font-size:0.82rem;">
  <p style="margin:0;color:rgba(255,255,255,0.8);">🍪 Usamos cookies para mejorar tu experiencia y mostrar anuncios relevantes. Al continuar navegando, aceptas nuestro uso de cookies. <a href="/privacidad-boricua" style="color:#CE1126;text-decoration:underline;">Ver Política de Privacidad</a></p>
  <button onclick="acceptCookies()" style="background:#CE1126;color:#fff;border:none;padding:0.5rem 1.5rem;border-radius:4px;font-weight:700;cursor:pointer;white-space:nowrap;font-size:0.82rem;">Aceptar</button>
</div>
<script>
function acceptCookies() {
  localStorage.setItem('cookies_accepted', '1');
  document.getElementById('cookie-banner').style.display = 'none';
}
window.addEventListener('DOMContentLoaded', function() {
  if (!localStorage.getItem('cookies_accepted')) {
    document.getElementById('cookie-banner').style.display = 'flex';
  }
});
</script>

</body>
</html>
`;
