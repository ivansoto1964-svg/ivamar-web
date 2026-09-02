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
<meta name="author" content="Planeta Boricua — Iván Soto">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://www.masboricuaqueunmofongo.com/">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.masboricuaqueunmofongo.com/">
<meta property="og:title" content="Planeta Boricua — Más Boricua Que Un Mofongo">
<meta property="og:description" content="Cultura, identidad, Feria de Artesanías y recursos prácticos para la comunidad puertorriqueña dentro y fuera de la isla.">
<meta property="og:image" content="https://www.masboricuaqueunmofongo.com/img/og-planetaboricua.jpg">
<meta property="og:locale" content="es_PR">
<meta property="og:site_name" content="Planeta Boricua">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="https://www.masboricuaqueunmofongo.com/">
<meta name="twitter:title" content="Planeta Boricua — Más Boricua Que Un Mofongo">
<meta name="twitter:description" content="Cultura, identidad, Feria de Artesanías y recursos para la comunidad puertorriqueña dentro y fuera de la isla.">
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

/* LO MÁS RECIENTE */
.latest-home{background:#fff;padding:2rem 0;border-bottom:1px solid var(--border);}
.latest-home-inner{max-width:1200px;margin:0 auto;padding:0 2rem;}
.latest-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-top:.5rem;}
.latest-card{display:flex;flex-direction:column;background:#f7f7f3;border:1px solid var(--border);border-radius:8px;overflow:hidden;color:inherit;text-decoration:none;}
.latest-card img{width:100%;height:155px;object-fit:cover;}
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
@media(max-width:700px){.pb-app-inner{align-items:flex-start;flex-direction:column}.pb-app-actions{width:100%;justify-content:stretch}.pb-app-btn{flex:1}.pb-app-icon{width:58px;height:58px}}

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
  .latest-home-inner{padding:0 1rem;}
  .latest-grid{grid-template-columns:1fr;}
  .directorio-inner{padding:0 1rem;}
  .feria-inner{grid-template-columns:1fr;gap:2rem;padding:0 1rem;}
  .viajes-inner{padding:0 1rem;}
  .viajes-grid{grid-template-columns:1fr;}
  .pb-footer-main{grid-template-columns:1fr 1fr;padding:2rem 1rem;}
  .pb-footer-bottom{padding:1rem;}
}
.tienda-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;}
.tienda-card{background:#fff;border:1px solid var(--border);border-radius:10px;overflow:hidden;text-decoration:none;display:block;box-shadow:0 2px 8px rgba(0,0,0,.05);transition:transform .2s,box-shadow .2s;}
.tienda-card:hover{transform:translateY(-4px);box-shadow:0 10px 24px rgba(0,0,0,.12);}
.tienda-card img{width:100%;height:150px;display:block;object-fit:cover;}
.tienda-card-body{padding:.9rem 1rem;}
.tienda-card-title{font-size:.86rem;font-weight:800;color:var(--dark);}
.tienda-card-link{font-size:.7rem;color:var(--red);font-weight:700;margin-top:.3rem;}
@media(max-width:900px){.tienda-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:520px){.tienda-grid{grid-template-columns:1fr;}.tienda-card img{height:190px;}}

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
</style>
<script nowprocket data-noptimize="1" data-cfasync="false" data-wpfc-render="false" seraph-accel-crit="1" data-no-defer="1">
  (function () {
      var script = document.createElement("script");
      script.async = 1;
      script.src = 'https://tpembars.com/NDcwMTYx.js?t=470161';
      document.head.appendChild(script);
  })();
  (function(s,t,a,y,twenty,two){s.Stay22=s.Stay22||{};s.Stay22.params={lmaID:"6a4026801c8b38e97c6ad9fd"};twenty=t.createElement(a);two=t.getElementsByTagName(a)[0];twenty.async=1;twenty.src=y;two.parentNode.insertBefore(twenty,two);})(window,document,"script","https://scripts.stay22.com/letmeallez.js");
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
      <a href="/blog">El Balcón</a>
      <a href="/agenda-boricua">Agenda</a>
      <a href="#recursos">Recursos</a>
      <a href="/feria-artesanos">Artesanos</a>
      <a href="/tienda-boricua">Tienda</a>
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
    <div class="hero-sidebar" id="hero-sidebar">
      <div style="padding:1rem 0;color:#999;font-size:0.82rem;">Cargando artículos...</div>
    </div>
  </div>
</section>

<!-- BANNER FERIA DE ARTESANÍAS -->
<section style="background:linear-gradient(135deg,#002D62,#CE1126);padding:2.5rem 2rem;">
  <div style="max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1.5rem;">
    <div>
      <div style="font-size:0.68rem;font-weight:800;color:rgba(255,255,255,0.6);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:0.5rem;">🌍 Planeta Boricua</div>
      <h2 style="font-family:'Playfair Display',serif;font-size:clamp(1.4rem,3vw,2rem);font-weight:700;color:#fff;line-height:1.2;margin-bottom:0.5rem;">Manos boricuas, arte con historia 🇵🇷</h2>
      <p style="font-size:0.9rem;color:rgba(255,255,255,0.75);max-width:500px;">Una exposición gratuita para conectar artesanos puertorriqueños con nuestra gente en la isla y la diáspora.</p>
    </div>
    <div style="display:flex;gap:1rem;flex-wrap:wrap;">
      <a href="/pb/add-negocio" style="display:inline-flex;align-items:center;gap:0.5rem;background:#fff;color:#002D62;padding:0.85rem 1.8rem;border-radius:25px;font-size:0.88rem;font-weight:800;text-decoration:none;white-space:nowrap;">🎨 Registra tu artesanía gratis →</a>
      <a href="/feria-artesanos" style="display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.15);color:#fff;padding:0.85rem 1.8rem;border-radius:25px;font-size:0.88rem;font-weight:700;text-decoration:none;border:1px solid rgba(255,255,255,0.3);white-space:nowrap;">Explorar artesanos</a>
    </div>
  </div>
</section>

<!-- LO MÁS RECIENTE -->
<section class="latest-home" id="lo-mas-reciente">
  <div class="latest-home-inner">
    <div class="sec-divider-inner">
      <span class="sec-divider-label">Lo más reciente</span>
      <div class="sec-divider-line"></div>
    </div>
    <p style="font-size:.85rem;color:var(--mid);line-height:1.6;margin-bottom:1rem;">Acontecimientos seleccionados, verificados y explicados con contexto por Planeta Boricua.</p>
    <div class="latest-grid" id="latest-grid"><div style="color:#999;font-size:.8rem;padding:1rem 0;">Buscando actualizaciones…</div></div>
  </div>
</section>

<!-- AGENDA BORICUA -->
<section class="agenda-home" id="agenda">
  <div class="agenda-home-inner">
    <div class="sec-divider-inner">
      <span class="sec-divider-label">Agenda Boricua</span>
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
      <span class="sec-divider-label">Los Temas del Balcón</span>
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
<section id="recursos" style="background:linear-gradient(135deg,var(--blue),#001a4d);padding:2rem 0;">
  <div style="max-width:1200px;margin:0 auto;padding:0 2rem;display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center;" class="recursos-inner">
    <div>
      <div style="font-size:0.65rem;font-weight:800;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:0.6rem;">Centro de Recursos</div>
      <h2 style="font-family:'Playfair Display',serif;font-size:clamp(1.5rem,2.5vw,2rem);font-weight:800;color:#fff;margin-bottom:0.8rem;line-height:1.2;">¿Te mudas entre PR y USA? <span style="color:#f5c842;">Tenemos tu guía.</span></h2>
      <p style="font-size:0.88rem;color:rgba(255,255,255,0.65);line-height:1.7;margin-bottom:1.5rem;">Licencias de conducir por estado, mudanzas, escuelas, servicios públicos, bancos, crédito y más — todo en español boricua y verificado.</p>
      <a href="/mudarse-de-pr" style="display:inline-flex;align-items:center;gap:0.5rem;background:#CE1126;color:#fff;padding:0.75rem 1.5rem;border-radius:4px;font-size:0.88rem;font-weight:700;text-decoration:none;margin-right:0.8rem;">PR → USA 🇺🇸</a><a href="/regresar-a-pr" style="display:inline-flex;align-items:center;gap:0.5rem;background:#002D62;color:#fff;padding:0.75rem 1.5rem;border-radius:4px;font-size:0.88rem;font-weight:700;text-decoration:none;">USA → PR 🇵🇷</a>
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

<!-- FERIA DE ARTESANÍAS -->
<section class="feria-section" id="feria">
  <div class="feria-inner">
    <div>
      <div class="feria-eyebrow">Feria Digital Permanente 🎨</div>
      <h2 class="feria-title">Muestra tu <span class="accent">Arte</span> al Mundo 🇵🇷</h2>
      <p class="feria-sub">Un espacio gratuito para que artesanos puertorriqueños muestren su trabajo — tu tipo de artesanía, tu historia, tus contactos — para que la diáspora y la gente en Puerto Rico te encuentren.</p>
      <div style="background:rgba(255,255,255,0.12);border-radius:10px;padding:1rem 1.2rem;margin:1.2rem 0;display:flex;align-items:center;gap:0.8rem;">
        <div style="font-size:1.5rem;">📅</div>
        <div style="font-size:0.85rem;color:#fff;line-height:1.5;">La feria digital está abierta todo el año. El <strong>23 de septiembre</strong>, Día del Grito de Lares, celebramos su presentación especial como proyecto cultural permanente.</div>
      </div>
      <a href="/pb/add-negocio" class="btn-white">🎨 Regístrate Gratis →</a>
    </div>
  </div>
</section>

<!-- TIENDA BORICUA -->
<section id="tienda" style="background:#fff;padding:2rem 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);">
  <div style="max-width:1200px;margin:0 auto;padding:0 2rem;">
    <div class="sec-divider-inner">
      <div style="display:flex;align-items:center;gap:0.6rem;">
        <span style="font-size:1.3rem;">🛍️</span>
        <span class="sec-divider-label">Tienda Boricua</span>
      </div>
      <div style="flex:1;height:2px;background:var(--red);margin:0 1rem;"></div>
      <a href="/tienda-boricua" class="sec-divider-link">Explorar la tienda →</a>
    </div>
    <p style="font-size:0.88rem;color:var(--mid);line-height:1.7;margin:1rem 0 1.5rem;">
      Productos con orgullo boricua, seleccionados por Planeta Boricua. Consulta en Amazon el precio, la disponibilidad y la entrega para tu dirección.
    </p>
    <div class="tienda-grid">
      <a href="/go/amazon-shirts" target="_blank" rel="noopener sponsored" class="tienda-card">
        <img src="/img/shop/camisetas-pr.webp" alt="Camisetas de Puerto Rico" loading="lazy" decoding="async">
        <div class="tienda-card-body"><div class="tienda-card-title">👕 Camisetas de PR</div><div class="tienda-card-link">Ver selección →</div></div>
      </a>
      <a href="/go/amazon-flags" target="_blank" rel="noopener sponsored" class="tienda-card">
        <img src="/img/shop/gorras-pr.webp" alt="Gorras de Puerto Rico" loading="lazy" decoding="async">
        <div class="tienda-card-body"><div class="tienda-card-title">🧢 Gorras de PR</div><div class="tienda-card-link">Ver selección →</div></div>
      </a>
      <a href="/go/amazon-kitchen" target="_blank" rel="noopener sponsored" class="tienda-card">
        <img src="/img/shop/tazas-termos.webp" alt="Tazas y termos boricuas" loading="lazy" decoding="async">
        <div class="tienda-card-body"><div class="tienda-card-title">☕ Tazas y Termos</div><div class="tienda-card-link">Ver selección →</div></div>
      </a>
      <a href="/go/amazon-music" target="_blank" rel="noopener sponsored" class="tienda-card">
        <img src="/img/shop/cocina-criolla.webp" alt="Productos para cocina criolla" loading="lazy" decoding="async">
        <div class="tienda-card-body"><div class="tienda-card-title">🌿 Cocina Criolla</div><div class="tienda-card-link">Ver selección →</div></div>
      </a>
      <a href="/go/amazon-books" target="_blank" rel="noopener sponsored" class="tienda-card">
        <img src="/img/shop/dulces-isla.webp" alt="Dulces de Puerto Rico" loading="lazy" decoding="async">
        <div class="tienda-card-body"><div class="tienda-card-title">🍬 Dulces de la Isla</div><div class="tienda-card-link">Ver selección →</div></div>
      </a>
      <a href="/go/amazon-home" target="_blank" rel="noopener sponsored" class="tienda-card">
        <img src="/img/shop/cuatro-patas.webp" alt="Productos boricuas para mascotas" loading="lazy" decoding="async">
        <div class="tienda-card-body"><div class="tienda-card-title">🐾 Boricuas de 4 Patas</div><div class="tienda-card-link">Ver selección →</div></div>
      </a>
      <a href="/go/amazon-auto" target="_blank" rel="noopener sponsored" class="tienda-card">
        <img src="/img/shop/joyeria-boricua.webp" alt="Joyería boricua" loading="lazy" decoding="async">
        <div class="tienda-card-body"><div class="tienda-card-title">💍 Joyería Boricua</div><div class="tienda-card-link">Ver selección →</div></div>
      </a>
      <a href="/go/amazon-gifts" target="_blank" rel="noopener sponsored" class="tienda-card">
        <img src="/img/shop/para-tu-auto.webp" alt="Accesorios boricuas para autos" loading="lazy" decoding="async">
        <div class="tienda-card-body"><div class="tienda-card-title">🚗 Para Tu Auto</div><div class="tienda-card-link">Ver selección →</div></div>
      </a>
      <a href="/go/amazon-merch" target="_blank" rel="noopener sponsored" class="tienda-card">
        <img src="/img/shop/merch-oficial.webp" alt="Mercancía oficial de Planeta Boricua" loading="lazy" decoding="async">
        <div class="tienda-card-body" style="background:linear-gradient(135deg,#002D62,#CE1126);"><div class="tienda-card-title" style="color:#fff;">🇵🇷 Merch Oficial</div><div class="tienda-card-link" style="color:#fff;">Más Boricua que un Mofongo →</div></div>
      </a>
    </div>
    <div style="text-align:center;">
      <a href="/tienda-boricua" style="display:inline-flex;align-items:center;gap:0.5rem;background:var(--red);color:#fff;padding:0.75rem 2rem;border-radius:4px;font-size:0.88rem;font-weight:700;text-decoration:none;">
        🛒 Explorar la Tienda Planeta Boricua →
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
    <div class="viajes-dest-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-top:1.5rem;">

      <a href="https://us.trip.com/hotels/list?flexType=1&cityId=-1&countryId=208&destName=Puerto%20Rico&searchType=C&optionId=208&crn=1&adult=2&curr=USD&locale=es-US&SID=2209817&allianceid=1094387&utm_campaign=520530" target="_blank" rel="noopener" style="text-decoration:none;color:inherit;background:#fff;border-radius:10px;overflow:hidden;border:1px solid var(--border);display:block;">
        <div id="vimg-pr" role="img" aria-label="Foto del destino" style="height:140px;background-image:url('/img/travel-destinations.webp');background-size:400% 200%;background-position:0% 0%;background-repeat:no-repeat;"></div>
        <div style="padding:1rem;">
          <div style="font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem;">Destino Principal</div>
          <div style="font-size:0.9rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;">Puerto Rico</div>
          <div style="font-size:0.75rem;color:var(--mid);margin-bottom:0.5rem;">La Isla del Encanto</div>
          <div style="font-size:0.75rem;font-weight:700;color:var(--blue);">Ver hoteles →</div>
        </div>
      </a>

      <a href="https://us.trip.com/hotels/list?flexType=1&cityId=633&countryId=66&destName=Nueva%20York&searchType=CT&optionId=633&crn=1&adult=2&curr=USD&locale=es-US&SID=2209817&allianceid=1094387&utm_campaign=520530" target="_blank" rel="noopener" style="text-decoration:none;color:inherit;background:#fff;border-radius:10px;overflow:hidden;border:1px solid var(--border);display:block;">
        <div id="vimg-ny" role="img" aria-label="Foto del destino" style="height:140px;background-image:url('/img/travel-destinations.webp');background-size:400% 200%;background-position:33.333% 0%;background-repeat:no-repeat;"></div>
        <div style="padding:1rem;">
          <div style="font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem;">La Gran Manzana</div>
          <div style="font-size:0.9rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;">Nueva York</div>
          <div style="font-size:0.75rem;color:var(--mid);margin-bottom:0.5rem;">El Barrio, El Bronx, Brooklyn</div>
          <div style="font-size:0.75rem;font-weight:700;color:var(--blue);">Ver hoteles →</div>
        </div>
      </a>

      <a href="https://us.trip.com/hotels/list?flexType=1&cityId=1187&countryId=66&destName=Orlando&searchType=CT&optionId=1187&crn=1&adult=2&curr=USD&locale=es-US&SID=2209817&allianceid=1094387&utm_campaign=520530" target="_blank" rel="noopener" style="text-decoration:none;color:inherit;background:#fff;border-radius:10px;overflow:hidden;border:1px solid var(--border);display:block;">
        <div id="vimg-orlando" role="img" aria-label="Foto del destino" style="height:140px;background-image:url('/img/travel-destinations.webp');background-size:400% 200%;background-position:66.667% 0%;background-repeat:no-repeat;"></div>
        <div style="padding:1rem;">
          <div style="font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem;">Florida</div>
          <div style="font-size:0.9rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;">Orlando</div>
          <div style="font-size:0.75rem;color:var(--mid);margin-bottom:0.5rem;">Parques y comunidad boricua</div>
          <div style="font-size:0.75rem;font-weight:700;color:var(--blue);">Ver hoteles →</div>
        </div>
      </a>

      <a href="https://us.trip.com/hotels/list?flexType=1&cityId=20436&countryId=66&destName=Miami&searchType=CT&optionId=20436&crn=1&adult=2&curr=USD&locale=es-US&SID=2209817&allianceid=1094387&utm_campaign=520530" target="_blank" rel="noopener" style="text-decoration:none;color:inherit;background:#fff;border-radius:10px;overflow:hidden;border:1px solid var(--border);display:block;">
        <div id="vimg-miami" role="img" aria-label="Foto del destino" style="height:140px;background-image:url('/img/travel-destinations.webp');background-size:400% 200%;background-position:100% 0%;background-repeat:no-repeat;"></div>
        <div style="padding:1rem;">
          <div style="font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem;">Sur de Florida</div>
          <div style="font-size:0.9rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;">Miami</div>
          <div style="font-size:0.75rem;color:var(--mid);margin-bottom:0.5rem;">Playas y cultura latina</div>
          <div style="font-size:0.75rem;font-weight:700;color:var(--blue);">Ver hoteles →</div>
        </div>
      </a>

      <a href="https://us.trip.com/hotels/list?flexType=1&cityId=5677&countryId=276&destName=Punta%20Cana&searchType=CT&optionId=5677&crn=1&adult=2&curr=USD&locale=es-US&SID=2209817&allianceid=1094387&utm_campaign=520530" target="_blank" rel="noopener" style="text-decoration:none;color:inherit;background:#fff;border-radius:10px;overflow:hidden;border:1px solid var(--border);display:block;">
        <div id="vimg-puntacana" role="img" aria-label="Foto del destino" style="height:140px;background-image:url('/img/travel-destinations.webp');background-size:400% 200%;background-position:0% 100%;background-repeat:no-repeat;"></div>
        <div style="padding:1rem;">
          <div style="font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem;">Caribe</div>
          <div style="font-size:0.9rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;">Punta Cana</div>
          <div style="font-size:0.75rem;color:var(--mid);margin-bottom:0.5rem;">Rep. Dominicana all-inclusive</div>
          <div style="font-size:0.75rem;font-weight:700;color:var(--blue);">Ver hoteles →</div>
        </div>
      </a>

      <a href="https://us.trip.com/hotels/list?flexType=1&cityId=-1&countryId=37&destName=Colombia&searchType=C&optionId=37&crn=1&adult=2&curr=USD&locale=es-US&SID=2209817&allianceid=1094387&utm_campaign=520530" target="_blank" rel="noopener" style="text-decoration:none;color:inherit;background:#fff;border-radius:10px;overflow:hidden;border:1px solid var(--border);display:block;">
        <div id="vimg-colombia" role="img" aria-label="Foto del destino" style="height:140px;background-image:url('/img/travel-destinations.webp');background-size:400% 200%;background-position:33.333% 100%;background-repeat:no-repeat;"></div>
        <div style="padding:1rem;">
          <div style="font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem;">Sudamérica</div>
          <div style="font-size:0.9rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;">Colombia</div>
          <div style="font-size:0.75rem;color:var(--mid);margin-bottom:0.5rem;">Cartagena, Medellín, Bogotá</div>
          <div style="font-size:0.75rem;font-weight:700;color:var(--blue);">Ver hoteles →</div>
        </div>
      </a>

      <a href="https://us.trip.com/hotels/list?flexType=1&cityId=357&countryId=95&destName=Madrid&searchType=CT&optionId=357&crn=1&adult=2&curr=USD&locale=es-US&SID=2209817&allianceid=1094387&utm_campaign=520530" target="_blank" rel="noopener" style="text-decoration:none;color:inherit;background:#fff;border-radius:10px;overflow:hidden;border:1px solid var(--border);display:block;">
        <div id="vimg-madrid" role="img" aria-label="Foto del destino" style="height:140px;background-image:url('/img/travel-destinations.webp');background-size:400% 200%;background-position:66.667% 100%;background-repeat:no-repeat;"></div>
        <div style="padding:1rem;">
          <div style="font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem;">Europa</div>
          <div style="font-size:0.9rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;">Madrid</div>
          <div style="font-size:0.75rem;color:var(--mid);margin-bottom:0.5rem;">España — puerta a Europa</div>
          <div style="font-size:0.75rem;font-weight:700;color:var(--blue);">Ver hoteles →</div>
        </div>
      </a>

      <a href="https://us.trip.com/?SID=2209817&allianceid=1094387&utm_campaign=520530&locale=es-US" target="_blank" rel="noopener" style="text-decoration:none;color:inherit;background:linear-gradient(135deg,var(--blue),#001a4d);border-radius:10px;overflow:hidden;border:1px solid var(--blue);display:block;">
        <div id="vimg-generic" role="img" aria-label="Foto del destino" style="height:140px;background-image:url('/img/travel-destinations.webp');background-size:400% 200%;background-position:100% 100%;background-repeat:no-repeat;"></div>
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
      <a href="/blog">El Balcón</a>
      <a href="#recursos">Recursos</a>
      <a href="/feria-artesanos">Artesanos Puertorriqueños</a>
      <a href="/agenda-boricua">Agenda Boricua</a>
      <a href="/tienda-boricua">Tienda Boricua</a>
      <a href="#viajes">Viajes</a>
    </div>
    <div class="pb-footer-col">
      <h4>Comunidad</h4>
      <a href="/feria-artesanos">Feria Digital de Artesanías 🎨</a>
      <a href="/compartir-evento-boricua">Comparte un evento gratis</a>
      <a href="mailto:masboricuaqueunmofongo@gmail.com">Contacto</a>
    </div>
    <div class="pb-footer-col">
      <h4>Legal</h4>
      <a href="/quienes-somos">Quiénes Somos</a>
      <a href="/privacidad-boricua">Privacidad</a>
      <a href="/terminos-boricua">Términos</a>
    </div>
  </div>
  <div class="pb-footer-bottom">
    <div class="pb-footer-bottom-inner">
      <div class="pb-footer-copy">© 2026 Planeta Boricua · masboricuaqueunmofongo.com · Todos los derechos reservados</div>
      <div class="pb-footer-owner">Proyecto independiente de Iván Soto · Florida, USA</div>
    </div>
  </div>
</footer>

<script>
let pbInstallPrompt = null;

function pbShowStatus(message) {
  const status = document.getElementById('pb-app-status');
  status.textContent = message;
  status.style.display = 'block';
}

function pbIsStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

function playCoqui() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const start = ctx.currentTime + 0.03;
    [[1050, start, .09], [1650, start + .13, .16], [1050, start + .48, .09], [1650, start + .61, .16]].forEach(note => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = note[0];
      gain.gain.setValueAtTime(0, note[1]);
      gain.gain.linearRampToValueAtTime(.18, note[1] + .015);
      gain.gain.exponentialRampToValueAtTime(.001, note[1] + note[2]);
      osc.connect(gain).connect(ctx.destination);
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
  if (Notification.permission === 'granted' && 'serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready;
    registration.showNotification('Algo nuevo en Planeta Boricua 🇵🇷', {
      body: post.title,
      icon: '/icons/pb/icon-192.png',
      badge: '/icons/pb/icon-192.png',
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
      if (!posts || !posts.length) return;
      pbCheckForUpdate(posts[0]);

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
        '<a href="' + p.link + '" class="hero-side-card">' +
        '<div class="hero-side-num">0' + (i + 1) + '</div>' +
        '<div class="hero-side-cat">' + p.tag + '</div>' +
        '<div class="hero-side-title">' + p.title + '</div>' +
        '<div class="hero-side-date">' + p.date + '</div>' +
        '</a>'
      ).join('');

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
    .catch(e => console.log('Blog error:', e));
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
    const events=data.events||[];
    if(!events.length){grid.innerHTML='<div style="grid-column:1/-1;background:var(--light);border-radius:8px;padding:1.5rem;color:var(--mid);">La agenda está comenzando. ¿Conoces una actividad boricua gratuita? Compártela con nosotros.</div>';return;}
    grid.innerHTML=events.map(event=>{const date=new Date(event.startDate+'T12:00:00');const month=date.toLocaleDateString('es-PR',{month:'short'}).replace('.','');const location=event.virtual?'Virtual':[event.city,event.region].filter(Boolean).join(', ');return '<a class="agenda-mini" href="/agenda-boricua"><div class="agenda-mini-date"><strong>'+date.getDate()+'</strong><span>'+safe(month)+'</span></div><div><div class="agenda-mini-type">'+safe(event.type||'Evento boricua')+'</div><h3>'+safe(event.name)+'</h3><p>📍 '+safe(location)+'</p></div></a>'}).join('');
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
