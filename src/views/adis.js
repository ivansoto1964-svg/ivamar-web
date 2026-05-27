module.exports = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ADIS Restaurant — Arecibo, Puerto Rico</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'DM Sans',sans-serif;background:#fff;color:#1a1a1a;overflow-x:hidden;}
:root{
  --brown:#8B4513;
  --gold:#C9A84C;
  --cream:#FDF8F3;
  --dark:#1a1a1a;
  --mid:#666;
  --border:#E8E0D5;
}

/* NAV */
nav{background:#fff;border-bottom:1px solid var(--border);padding:0 1.5rem;display:flex;align-items:center;justify-content:space-between;height:64px;position:sticky;top:0;z-index:100;}
.nav-logo{display:flex;align-items:center;gap:0.6rem;}
.nav-logo-heart{width:36px;height:36px;background:var(--brown);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1rem;color:#fff;}
.nav-logo-text{font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:700;color:var(--dark);letter-spacing:0.05em;}
.nav-links{display:flex;align-items:center;gap:1.5rem;}
.nav-links a{font-size:0.8rem;color:var(--mid);text-decoration:none;font-weight:500;}
.nav-links a:hover{color:var(--brown);}
.nav-order{background:var(--brown);color:#fff!important;padding:0.55rem 1.2rem;border-radius:6px;font-weight:700;font-size:0.8rem!important;}

/* HERO */
.hero{position:relative;height:85vh;min-height:500px;overflow:hidden;}
.hero-bg{width:100%;height:100%;object-fit:cover;filter:brightness(0.55);}
.hero-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.6));}
.hero-content{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem;}
.hero-logo{width:80px;height:80px;background:rgba(255,255,255,0.15);backdrop-filter:blur(8px);border:2px solid rgba(255,255,255,0.3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:2rem;margin-bottom:1rem;}
.hero-name{font-family:'Playfair Display',serif;font-size:clamp(3rem,8vw,6rem);font-weight:700;color:#fff;letter-spacing:0.1em;line-height:1;margin-bottom:0.5rem;}
.hero-tag{font-size:0.85rem;color:rgba(255,255,255,0.75);letter-spacing:0.2em;text-transform:uppercase;margin-bottom:0.5rem;}
.hero-location{font-size:0.8rem;color:rgba(255,255,255,0.6);margin-bottom:2rem;}
.hero-btns{display:flex;gap:0.8rem;flex-wrap:wrap;justify-content:center;}
.btn-order{display:inline-flex;align-items:center;gap:0.5rem;background:var(--brown);color:#fff;padding:0.9rem 2rem;border-radius:6px;font-size:0.9rem;font-weight:700;text-decoration:none;transition:all 0.2s;}
.btn-order:hover{background:#6B3410;transform:translateY(-1px);}
.btn-menu{display:inline-flex;align-items:center;gap:0.5rem;border:1.5px solid rgba(255,255,255,0.5);color:#fff;padding:0.9rem 2rem;border-radius:6px;font-size:0.9rem;font-weight:600;text-decoration:none;transition:all 0.2s;}
.btn-menu:hover{border-color:#fff;background:rgba(255,255,255,0.1);}

/* HORARIO STRIP */
.horario{background:var(--dark);padding:1rem 2rem;text-align:center;}
.horario-inner{display:flex;align-items:center;justify-content:center;gap:2rem;flex-wrap:wrap;}
.h-item{font-size:0.78rem;color:rgba(255,255,255,0.7);}
.h-item strong{color:#fff;}
.h-dot{color:var(--gold);}

/* SECTION STYLES */
.sec-tag{font-size:0.65rem;font-weight:700;color:var(--gold);letter-spacing:0.2em;text-transform:uppercase;margin-bottom:0.5rem;}
.sec-title{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,4vw,2.8rem);font-weight:700;color:var(--dark);line-height:1.15;margin-bottom:0.5rem;}
.sec-sub{font-size:0.88rem;color:var(--mid);line-height:1.7;max-width:500px;margin-bottom:2.5rem;}

/* OFERTAS DIARIAS */
.ofertas{padding:5rem 1.5rem;background:var(--cream);}
.ofertas-inner{max-width:900px;margin:0 auto;}
.week-badge{display:inline-flex;align-items:center;gap:0.5rem;background:#fff;border:1px solid var(--border);padding:0.4rem 1rem;border-radius:20px;font-size:0.72rem;color:var(--mid);margin-bottom:2rem;}
.week-badge strong{color:var(--brown);}
.ofertas-note{font-size:0.72rem;color:var(--mid);margin-bottom:2rem;font-style:italic;}
.dias-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;}
.dia-card{background:#fff;border-radius:14px;padding:1.5rem;border:1px solid var(--border);transition:all 0.2s;}
.dia-card:hover{border-color:var(--brown);box-shadow:0 8px 24px rgba(139,69,19,0.08);}
.dia-name{font-size:0.65rem;font-weight:700;color:var(--gold);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:0.8rem;}
.dia-plato{display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;margin-bottom:0.5rem;}
.dia-plato-name{font-size:0.88rem;font-weight:600;color:var(--dark);line-height:1.4;}
.dia-price{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;color:var(--brown);flex-shrink:0;}
.dia-desc{font-size:0.72rem;color:var(--mid);line-height:1.5;margin-top:0.3rem;}
.almuerzo-note{background:var(--dark);color:rgba(255,255,255,0.7);font-size:0.68rem;padding:0.25rem 0.6rem;border-radius:4px;display:inline-block;margin-bottom:0.8rem;}

/* MENU SECTION */
.menu-sec{padding:5rem 1.5rem;background:#fff;}
.menu-inner{max-width:900px;margin:0 auto;}
.menu-cats{display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:2rem;}
.menu-cat{font-size:0.72rem;padding:0.4rem 0.9rem;border:1px solid var(--border);border-radius:20px;color:var(--mid);cursor:pointer;transition:all 0.2s;background:#fff;}
.menu-cat.active,.menu-cat:hover{background:var(--brown);color:#fff;border-color:var(--brown);}
.menu-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;}
.menu-item{background:var(--cream);border-radius:12px;padding:1.2rem;border:1px solid var(--border);}
.menu-item-top{display:flex;justify-content:space-between;align-items:flex-start;gap:0.5rem;margin-bottom:0.3rem;}
.menu-item-name{font-size:0.88rem;font-weight:600;color:var(--dark);line-height:1.4;}
.menu-item-price{font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;color:var(--brown);flex-shrink:0;}
.menu-item-desc{font-size:0.72rem;color:var(--mid);line-height:1.5;}

/* FOTOS */
.fotos{padding:5rem 1.5rem;background:var(--cream);}
.fotos-inner{max-width:900px;margin:0 auto;}
.fotos-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0.8rem;margin-top:2rem;}
.foto-card{border-radius:12px;overflow:hidden;aspect-ratio:1;background:var(--border);display:flex;align-items:center;justify-content:center;font-size:3rem;}

/* REVIEWS */
.reviews{padding:5rem 1.5rem;background:#fff;}
.reviews-inner{max-width:900px;margin:0 auto;}
.reviews-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;margin-top:2rem;}
.review-card{background:var(--cream);border-radius:14px;padding:1.5rem;border:1px solid var(--border);}
.review-header{display:flex;align-items:center;gap:0.8rem;margin-bottom:0.8rem;}
.review-avatar{width:36px;height:36px;background:var(--brown);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:0.9rem;font-weight:700;flex-shrink:0;}
.review-name{font-size:0.85rem;font-weight:700;color:var(--dark);}
.review-stars{color:var(--gold);font-size:0.75rem;}
.review-text{font-size:0.78rem;color:var(--mid);line-height:1.6;font-style:italic;}

/* CTA ORDER */
.cta-order{padding:5rem 1.5rem;background:var(--brown);text-align:center;}
.cta-order h2{font-family:'Playfair Display',serif;font-size:clamp(2rem,5vw,3.5rem);font-weight:700;color:#fff;margin-bottom:0.8rem;line-height:1.1;}
.cta-order p{font-size:0.92rem;color:rgba(255,255,255,0.75);margin-bottom:2rem;line-height:1.6;}
.btn-call{display:inline-flex;align-items:center;gap:0.5rem;background:#fff;color:var(--brown);padding:1rem 2.5rem;border-radius:8px;font-size:1rem;font-weight:800;text-decoration:none;transition:all 0.2s;font-family:'Playfair Display',serif;}
.btn-call:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,0.2);}
.cta-note{font-size:0.72rem;color:rgba(255,255,255,0.5);margin-top:1rem;}

/* FOOTER */
footer{background:var(--dark);padding:2rem 1.5rem;text-align:center;}
.footer-logo{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;color:#fff;letter-spacing:0.1em;margin-bottom:0.5rem;}
.footer-info{font-size:0.72rem;color:rgba(255,255,255,0.4);line-height:1.8;}
.footer-powered{font-size:0.62rem;color:rgba(255,255,255,0.15);margin-top:0.8rem;}
.footer-powered a{color:rgba(201,168,76,0.4);text-decoration:none;}

@media(max-width:768px){
nav{padding:0 1rem;}.nav-links{display:none;}
.hero{height:70vh;}
.horario-inner{gap:1rem;flex-direction:column;}
.ofertas{padding:3rem 1rem;}.dias-grid{grid-template-columns:1fr;}
.menu-sec{padding:3rem 1rem;}.menu-grid{grid-template-columns:1fr;}
.fotos{padding:3rem 1rem;}.fotos-grid{grid-template-columns:repeat(2,1fr);}
.reviews{padding:3rem 1rem;}.reviews-grid{grid-template-columns:1fr;}
.cta-order{padding:3rem 1rem;}
}
</style>
</head>
<body>

<!-- NAV -->
<nav>
  <div class="nav-logo">
    <div class="nav-logo-heart">♥</div>
    <div class="nav-logo-text">ADIS</div>
  </div>
  <div class="nav-links">
    <a href="#ofertas">Ofertas Diarias</a>
    <a href="#menu">Menú</a>
    <a href="#reviews">Reseñas</a>
    <a href="tel:7875979332" class="nav-order">📞 Ordenar Ahora</a>
  </div>
</nav>

<!-- HERO -->
<section class="hero">
  <div style="width:100%;height:100%;background:linear-gradient(135deg,#3d1f0d 0%,#6B3410 40%,#8B4513 70%,#C9A84C 100%);position:absolute;"></div>
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <div class="hero-logo">♥</div>
    <p class="hero-tag">Restaurante & Brunch</p>
    <h1 class="hero-name">ADIS</h1>
    <p class="hero-location">📍 Arecibo, Puerto Rico · Almuerzo hasta las 2:30pm</p>
    <div class="hero-btns">
      <a href="tel:7875979332" class="btn-order">📞 Ordenar Ahora · 787-597-9332</a>
      <a href="#menu" class="btn-menu">Ver Menú →</a>
    </div>
  </div>
</section>

<!-- HORARIO -->
<div class="horario">
  <div class="horario-inner">
    <div class="h-item"><strong>Lun–Vie</strong> Brunch & Almuerzo 7:30am–2:30pm</div>
    <span class="h-dot">✦</span>
    <div class="h-item"><strong>Sáb–Dom</strong> Brunch & Almuerzo 8:00am–2:30pm</div>
    <span class="h-dot">✦</span>
    <div class="h-item">📞 <strong>787-597-9332</strong></div>
  </div>
</div>

<!-- OFERTAS DIARIAS -->
<section class="ofertas" id="ofertas">
  <div class="ofertas-inner">
    <div class="sec-tag">Esta Semana</div>
    <h2 class="sec-title">Ofertas Diarias</h2>
    <div class="week-badge"><strong>Semana 25–31 de mayo</strong> · Almuerzo hasta las 2:30pm</div>
    <div class="dias-grid">
      <div class="dia-card">
        <div class="dia-name">Lunes</div>
        <div class="dia-plato">
          <div class="dia-plato-name">Sancocho con Arroz</div>
          <div class="dia-price">\$10</div>
        </div>
      </div>
      <div class="dia-card">
        <div class="dia-name">Martes</div>
        <div class="dia-plato">
          <div class="dia-plato-name">Pastelón de Carne Molida</div>
          <div class="dia-price">\$10</div>
        </div>
      </div>
      <div class="dia-card">
        <div class="dia-name">Miércoles</div>
        <div class="dia-plato">
          <div class="dia-plato-name">Verdura con Bacalao</div>
          <div class="dia-price">\$11</div>
        </div>
        <div class="dia-plato" style="margin-top:0.5rem;">
          <div>
            <div class="dia-plato-name">Carne Guisada</div>
            <div class="dia-desc">Con 2 acompañantes — arroz y hab, mamposteado, tostones, amarillos, ensalada, papas fritas</div>
          </div>
          <div class="dia-price">\$10</div>
        </div>
      </div>
      <div class="dia-card">
        <div class="dia-name">Jueves</div>
        <div class="dia-plato">
          <div class="dia-plato-name">Pechuga a la Milanesa</div>
          <div class="dia-price">\$11</div>
        </div>
        <div class="dia-plato" style="margin-top:0.5rem;">
          <div>
            <div class="dia-plato-name">Biftec Encebollado</div>
            <div class="dia-desc">Con 2 acompañantes — arroz y hab, mamposteado, tostones, amarillos, ensalada, papas fritas</div>
          </div>
          <div class="dia-price">\$11</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- MENU -->
<section class="menu-sec" id="menu">
  <div class="menu-inner">
    <div class="sec-tag">Nuestro Menú</div>
    <h2 class="sec-title">Comida Casera & Brunch</h2>
    <p class="sec-sub">Ingredientes frescos, hecho con amor, entregas disponibles.</p>
    <div class="menu-grid">
      <div class="menu-item">
        <div class="menu-item-top">
          <div class="menu-item-name">🥩 Churrasco & Huevos</div>
          <div class="menu-item-price">\$18</div>
        </div>
        <div class="menu-item-desc">Churrasco a la parrilla con huevos al gusto y papas salteadas</div>
      </div>
      <div class="menu-item">
        <div class="menu-item-top">
          <div class="menu-item-name">🍝 Pasta con Pollo</div>
          <div class="menu-item-price">\$15</div>
        </div>
        <div class="menu-item-desc">Penne con pollo a la crema y pan tostado a la parrilla</div>
      </div>
      <div class="menu-item">
        <div class="menu-item-top">
          <div class="menu-item-name">🌮 Tacos de Pescado</div>
          <div class="menu-item-price">\$14</div>
        </div>
        <div class="menu-item-desc">Pescado frito con repollo morado, pico de gallo y salsa de aguacate</div>
      </div>
      <div class="menu-item">
        <div class="menu-item-top">
          <div class="menu-item-name">🍖 Costillas BBQ</div>
          <div class="menu-item-price">\$22</div>
        </div>
        <div class="menu-item-desc">Costillas glaseadas con papas fritas y queso rallado</div>
      </div>
      <div class="menu-item">
        <div class="menu-item-top">
          <div class="menu-item-name">🦐 Arroz con Mariscos</div>
          <div class="menu-item-price">\$19</div>
        </div>
        <div class="menu-item-desc">Arroz mamposteado con camarones, calamares y tostones</div>
      </div>
      <div class="menu-item">
        <div class="menu-item-top">
          <div class="menu-item-name">🥞 Brunch Completo</div>
          <div class="menu-item-price">\$16</div>
        </div>
        <div class="menu-item-desc">Huevos revueltos con queso, tocino, papas y waffle con frutas</div>
      </div>
      <div class="menu-item">
        <div class="menu-item-top">
          <div class="menu-item-name">🫔 Tostones Rellenos</div>
          <div class="menu-item-price">\$12</div>
        </div>
        <div class="menu-item-desc">Tostones rellenos de ensalada de cangrejo con salsa de ají</div>
      </div>
      <div class="menu-item">
        <div class="menu-item-top">
          <div class="menu-item-name">☕ Desayuno Criollo</div>
          <div class="menu-item-price">\$10</div>
        </div>
        <div class="menu-item-desc">Revoltillo de huevos con salchichón, tostadas y café</div>
      </div>
    </div>
    <div style="text-align:center;margin-top:2rem;">
      <a href="tel:7875979332" style="display:inline-flex;align-items:center;gap:0.5rem;background:var(--brown);color:#fff;padding:0.9rem 2rem;border-radius:8px;font-size:0.9rem;font-weight:700;text-decoration:none;">📞 Llamar para Ordenar</a>
    </div>
  </div>
</section>

<!-- FOTOS -->
<section class="fotos" id="fotos">
  <div class="fotos-inner">
    <div class="sec-tag">Galería</div>
    <h2 class="sec-title">Nuestros Platos</h2>
    <div class="fotos-grid">
      <div class="foto-card">🥩</div>
      <div class="foto-card">🍝</div>
      <div class="foto-card">🌮</div>
      <div class="foto-card">🍖</div>
      <div class="foto-card">🦐</div>
      <div class="foto-card">🥞</div>
    </div>
    <p style="font-size:0.72rem;color:var(--mid);text-align:center;margin-top:1rem;">📸 Síguenos en Instagram para ver más</p>
  </div>
</section>

<!-- REVIEWS -->
<section class="reviews" id="reviews">
  <div class="reviews-inner">
    <div class="sec-tag">Lo Que Dicen</div>
    <h2 class="sec-title">Reseñas ⭐⭐⭐⭐⭐</h2>
    <div class="reviews-grid">
      <div class="review-card">
        <div class="review-header">
          <div class="review-avatar">N</div>
          <div>
            <div class="review-name">Nilka Medina</div>
            <div class="review-stars">★★★★★</div>
          </div>
        </div>
        <div class="review-text">"Excelente servicio, comida y ambiente. Soy de San Juan y las últimas 3 veces que he venido a Arecibo he comido en Adis. De los mejores huevos benedictos con papas salteadas que me he comido."</div>
      </div>
      <div class="review-card">
        <div class="review-header">
          <div class="review-avatar">S</div>
          <div>
            <div class="review-name">Shanell Miranda</div>
            <div class="review-stars">★★★★★</div>
          </div>
        </div>
        <div class="review-text">"Food was super good, first time coming here. The bread they used for my egg Benedict was pretty awesome!"</div>
      </div>
      <div class="review-card">
        <div class="review-header">
          <div class="review-avatar">M</div>
          <div>
            <div class="review-name">Marylissa Gonzalez</div>
            <div class="review-stars">★★★★★</div>
          </div>
        </div>
        <div class="review-text">"Recomiendo este lugar con los ojos cerrados, no solo por la comida sino por el trato especial que hace sentir a cada cliente como en casa. ¡Definitivamente un restaurante que merece ser visitado!"</div>
      </div>
      <div class="review-card">
        <div class="review-header">
          <div class="review-avatar">P</div>
          <div>
            <div class="review-name">Patricia Rodriguez</div>
            <div class="review-stars">★★★★★</div>
          </div>
        </div>
        <div class="review-text">"¡Que rico! El omelette de pavo y bacon con papas salteadas fue literalmente el mejor. ¡Riquísimo!"</div>
      </div>
    </div>
  </div>
</section>

<!-- CTA ORDER -->
<section class="cta-order">
  <h2>¿Listo para Ordenar?</h2>
  <p>Comida casera, fresca y nutritiva — hecha con amor.<br>Llámanos y recoge tu orden o pregunta por entregas.</p>
  <a href="tel:7875979332" class="btn-call">📞 787-597-9332</a>
  <div class="cta-note">Lun–Vie 7:30am–2:30pm · Sáb–Dom 8:00am–2:30pm</div>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-logo">ADIS</div>
  <div class="footer-info">
    Arecibo, Puerto Rico<br>
    📞 787-597-9332 · Almuerzo hasta las 2:30pm
  </div>
  <div class="footer-powered">Página creada por <a href="https://ivamarai.com" target="_blank">Ivamar AI LLC</a></div>
</footer>

</body>
</html>
`;