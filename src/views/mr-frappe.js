module.exports = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mr. Frappe Hatillo — Frappés, Bowls & Fresas con Crema</title>
<link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'DM Sans',sans-serif;background:#fff;color:#1a1a1a;overflow-x:hidden;}
:root{
  --pink:#e91e8c;
  --green:#4CAF50;
  --orange:#FF6B35;
  --dark:#1a1a1a;
  --mid:#666;
  --border:#f0e0ea;
  --cream:#fff5fb;
  --gold:#f5c842;
}

/* NAV */
nav{background:#fff;border-bottom:2px solid var(--pink);padding:0 1.5rem;display:flex;align-items:center;justify-content:space-between;height:64px;position:sticky;top:0;z-index:100;box-shadow:0 2px 12px rgba(233,30,140,0.08);}
.nav-logo{display:flex;align-items:center;gap:0.6rem;}
.nav-logo-icon{width:38px;height:38px;background:linear-gradient(135deg,var(--pink),var(--orange));border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.3rem;}
.nav-logo-text{font-family:'Fredoka One',cursive;font-size:1.4rem;color:var(--dark);}
.nav-logo-text span{color:var(--pink);}
.nav-links{display:flex;align-items:center;gap:1.2rem;}
.nav-links a{font-size:0.8rem;color:var(--mid);text-decoration:none;font-weight:500;}
.nav-cta{background:var(--pink);color:#fff!important;padding:0.5rem 1.1rem;border-radius:20px;font-weight:700!important;}

/* HERO */
.hero{background:linear-gradient(135deg,#1a0a12 0%,#2d1020 50%,#1a0a12 100%);padding:4rem 1.5rem;text-align:center;position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;top:-100px;right:-100px;width:400px;height:400px;background:radial-gradient(circle,rgba(233,30,140,0.15),transparent);border-radius:50%;}
.hero::after{content:'';position:absolute;bottom:-100px;left:-100px;width:300px;height:300px;background:radial-gradient(circle,rgba(255,107,53,0.1),transparent);border-radius:50%;}
.hero-inner{max-width:700px;margin:0 auto;position:relative;z-index:1;}
.hero-badge{display:inline-flex;align-items:center;gap:0.4rem;background:rgba(233,30,140,0.15);border:1px solid rgba(233,30,140,0.3);border-radius:20px;padding:0.4rem 1rem;font-size:0.72rem;font-weight:700;color:#ff8dcb;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:1.5rem;}
.hero-title{font-family:'Fredoka One',cursive;font-size:clamp(2.5rem,6vw,4rem);color:#fff;line-height:1.1;margin-bottom:1rem;}
.hero-title span{color:var(--pink);}
.hero-sub{font-size:0.95rem;color:rgba(255,255,255,0.65);line-height:1.8;max-width:500px;margin:0 auto 2rem;}
.hero-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-bottom:2.5rem;}
.btn-wa{display:inline-flex;align-items:center;gap:0.5rem;background:#25D366;color:#fff;padding:0.9rem 2rem;border-radius:25px;font-size:0.9rem;font-weight:700;text-decoration:none;}
.btn-menu{display:inline-flex;align-items:center;gap:0.5rem;border:1.5px solid rgba(255,255,255,0.3);color:#fff;padding:0.9rem 2rem;border-radius:25px;font-size:0.9rem;font-weight:600;text-decoration:none;}
.hero-trending{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:1.2rem 2rem;display:inline-flex;gap:2rem;flex-wrap:wrap;justify-content:center;}
.trend-item{text-align:center;}
.trend-emoji{font-size:1.5rem;}
.trend-label{font-size:0.7rem;color:rgba(255,255,255,0.5);margin-top:0.2rem;}
.trend-name{font-size:0.82rem;font-weight:700;color:#fff;}

/* TRENDING BANNER */
.trending-banner{background:linear-gradient(135deg,var(--pink),var(--orange));padding:0.8rem 1.5rem;text-align:center;}
.trending-banner-inner{display:flex;align-items:center;justify-content:center;gap:0.8rem;flex-wrap:wrap;}
.trend-tag{font-size:0.75rem;font-weight:800;color:#fff;background:rgba(0,0,0,0.15);padding:0.3rem 0.8rem;border-radius:20px;}

/* MENU SECTION */
.menu-sec{padding:4rem 1.5rem;background:var(--cream);}
.menu-inner{max-width:1000px;margin:0 auto;}
.sec-header{text-align:center;margin-bottom:2.5rem;}
.sec-tag{font-size:0.65rem;font-weight:800;color:var(--pink);letter-spacing:0.2em;text-transform:uppercase;margin-bottom:0.4rem;}
.sec-title{font-family:'Fredoka One',cursive;font-size:clamp(1.8rem,4vw,2.5rem);color:var(--dark);}
.sec-sub{font-size:0.85rem;color:var(--mid);margin-top:0.4rem;}

/* CATEGORY TABS */
.cat-tabs{display:flex;gap:0.5rem;flex-wrap:wrap;justify-content:center;margin-bottom:2rem;}
.cat-tab{font-size:0.78rem;padding:0.5rem 1.1rem;border:2px solid var(--border);border-radius:25px;color:var(--mid);cursor:pointer;background:#fff;font-weight:600;transition:all 0.2s;white-space:nowrap;}
.cat-tab.active{background:var(--pink);color:#fff;border-color:var(--pink);}

/* MENU GRID */
.menu-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;}
.menu-card{background:#fff;border-radius:14px;padding:1.2rem;border:1px solid var(--border);position:relative;transition:box-shadow 0.2s;}
.menu-card:hover{box-shadow:0 4px 20px rgba(233,30,140,0.1);}
.menu-card-top{display:flex;justify-content:space-between;align-items:flex-start;gap:0.5rem;margin-bottom:0.4rem;}
.menu-card-name{font-size:0.92rem;font-weight:700;color:var(--dark);line-height:1.3;}
.menu-card-price{font-family:'Fredoka One',cursive;font-size:1.1rem;color:var(--pink);white-space:nowrap;flex-shrink:0;}
.menu-card-desc{font-size:0.75rem;color:var(--mid);line-height:1.5;margin-bottom:0.8rem;}
.menu-card-order{display:inline-flex;align-items:center;gap:0.3rem;background:var(--pink);color:#fff;padding:0.4rem 0.9rem;border-radius:20px;font-size:0.72rem;font-weight:700;text-decoration:none;}
.badge{display:inline-block;font-size:0.62rem;font-weight:800;padding:0.15rem 0.5rem;border-radius:4px;margin-left:0.3rem;vertical-align:middle;}
.badge-trending{background:#FFF3CD;color:#856404;}
.badge-hot{background:#FFE4E4;color:#c0392b;}
.badge-keto{background:#E8F5E9;color:#2e7d32;}
.badge-new{background:#E3F2FD;color:#1565c0;}

/* TOPPINGS */
.toppings-sec{padding:3rem 1.5rem;background:#fff;}
.toppings-inner{max-width:900px;margin:0 auto;}
.topping-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem;margin-top:1.5rem;}
.topping-box{background:var(--cream);border-radius:14px;padding:1.5rem;border:1px solid var(--border);}
.topping-title{font-family:'Fredoka One',cursive;font-size:1.1rem;color:var(--dark);margin-bottom:0.3rem;}
.topping-price{font-size:0.72rem;color:var(--pink);font-weight:700;margin-bottom:0.8rem;}
.topping-list{display:flex;flex-wrap:wrap;gap:0.4rem;}
.topping-pill{font-size:0.72rem;background:#fff;border:1px solid var(--border);border-radius:20px;padding:0.25rem 0.6rem;color:var(--dark);}

/* CTA */
.cta-sec{background:linear-gradient(135deg,#1a0a12,#2d1020);padding:4rem 1.5rem;text-align:center;}
.cta-title{font-family:'Fredoka One',cursive;font-size:clamp(2rem,4vw,3rem);color:#fff;margin-bottom:0.8rem;}
.cta-sub{font-size:0.9rem;color:rgba(255,255,255,0.6);max-width:450px;margin:0 auto 2rem;}
.cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}
.btn-cta-wa{display:inline-flex;align-items:center;gap:0.6rem;background:#25D366;color:#fff;padding:1rem 2.5rem;border-radius:25px;font-size:1rem;font-weight:700;text-decoration:none;}
.btn-cta-call{display:inline-flex;align-items:center;gap:0.6rem;border:1.5px solid rgba(255,255,255,0.3);color:#fff;padding:1rem 2rem;border-radius:25px;font-size:0.9rem;font-weight:600;text-decoration:none;}

/* POWERED */
.powered{background:#111;padding:1rem;text-align:center;font-size:0.72rem;color:rgba(255,255,255,0.3);}
.powered a{color:rgba(255,255,255,0.5);text-decoration:none;}

/* MOBILE */
@media(max-width:640px){
  .menu-grid{grid-template-columns:1fr;}
  .topping-grid{grid-template-columns:1fr;}
  .hero-trending{gap:1rem;}
  .cat-tabs{gap:0.4rem;}
  .cat-tab{font-size:0.72rem;padding:0.4rem 0.8rem;}
}
</style>
</head>
<body>

<!-- NAV -->
<nav>
  <div class="nav-logo">
    <div class="nav-logo-icon">🍓</div>
    <div class="nav-logo-text">Mr. <span>Frappe</span></div>
  </div>
  <div class="nav-links">
    <a href="#menu">Menú</a>
    <a href="#toppings">Toppings</a>
    <a href="https://wa.me/17874206692?text=Hola%20Mr.%20Frappe!%20Quiero%20hacer%20un%20pedido%20%F0%9F%8D%93" target="_blank" class="nav-cta">📲 Ordenar</a>
  </div>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-inner">
    <div class="hero-badge">🍓 Hatillo, Puerto Rico</div>
    <h1 class="hero-title">Frappés, Bowls<br>&amp; <span>Fresas con Crema</span></h1>
    <p class="hero-sub">Los mejores frappés de Hatillo — naturales, clásicos, premium y keto. Bowls de açaí, obleas y Fresas Dubái. Ingredientes frescos, preparados al momento.</p>
    <div class="hero-btns">
      <a href="https://wa.me/17874206692?text=Hola%20Mr.%20Frappe!%20Quiero%20hacer%20un%20pedido%20%F0%9F%8D%93" target="_blank" class="btn-wa">📲 Ordenar por WhatsApp</a>
      <a href="#menu" class="btn-menu">📋 Ver Menú</a>
    </div>
    <div class="hero-trending">
      <div class="trend-item"><div class="trend-emoji">🥤</div><div class="trend-name">Frappés</div><div class="trend-label">50+ sabores</div></div>
      <div class="trend-item"><div class="trend-emoji">🥣</div><div class="trend-name">Bowls</div><div class="trend-label">Açaí & Pitahaya</div></div>
      <div class="trend-item"><div class="trend-emoji">🍓</div><div class="trend-name">Fresas con Crema</div><div class="trend-label">Desde $6.99</div></div>
      <div class="trend-item"><div class="trend-emoji">🫓</div><div class="trend-name">Obleas Dubái</div><div class="trend-label">🔥 Trending</div></div>
    </div>
  </div>
</section>

<!-- TRENDING BANNER -->
<div class="trending-banner">
  <div class="trending-banner-inner">
    <span style="font-size:0.85rem;font-weight:800;color:#fff;">🔥 Lo más pedido ahora:</span>
    <span class="trend-tag">Fresas Dubái $15.49</span>
    <span class="trend-tag">Oblea Dubái Premium $15.99</span>
    <span class="trend-tag">La Monumental $13.49</span>
    <span class="trend-tag">Mr. Bowl $12.99</span>
  </div>
</div>

<!-- MENU -->
<section class="menu-sec" id="menu">
  <div class="menu-inner">
    <div class="sec-header">
      <div class="sec-tag">Nuestro Menú</div>
      <h2 class="sec-title">¿Qué se te antoja hoy? 🍓</h2>
      <p class="sec-sub">Todo preparado al momento con ingredientes frescos · Precios no incluyen IVU</p>
    </div>

    <div class="cat-tabs">
      <button class="cat-tab active" onclick="showCat('frapes',this)">🥤 Frappés</button>
      <button class="cat-tab" onclick="showCat('bowls',this)">🥣 Bowls</button>
      <button class="cat-tab" onclick="showCat('fresas',this)">🍓 Fresas con Crema</button>
      <button class="cat-tab" onclick="showCat('obleas',this)">🫓 Obleas</button>
      <button class="cat-tab" onclick="showCat('keto',this)">💚 Keto</button>
    </div>

    <!-- FRAPES -->
    <div id="cat-frapes" class="menu-grid">
      <div class="menu-card">
        <div class="menu-card-top">
          <div class="menu-card-name">Frappés Naturales</div>
          <div class="menu-card-price">$6.49+</div>
        </div>
        <div class="menu-card-desc">Fresa, Frutas Mixtas, Piña Colada, Coco, Parcha, Mango, Papaya, Guineo, Maíz, Mango Colada, Parcha-Coco y más combinaciones. Regular 16oz $6.49 · Grande 20oz $7.49. Incluye hasta 3 sabores, sabor extra $1.00 c/u.</div>
        <a href="https://wa.me/17874206692?text=Hola!%20Quiero%20un%20Frapp%C3%A9%20Natural%20de%20Mr.%20Frappe%20%F0%9F%8D%93" target="_blank" class="menu-card-order">📲 Ordenar</a>
      </div>
      <div class="menu-card">
        <div class="menu-card-top">
          <div class="menu-card-name">Frappés Clásicos <span class="badge badge-hot">Popular</span></div>
          <div class="menu-card-price">$6.99+</div>
        </div>
        <div class="menu-card-desc">Oreo, Cameo, Chips Ahoy, Nutella, Ferrero, Sara Lee, Tronky, Kinder Bueno, Twix, Snickers, Crunch, Kit Kat, Brownie, Café, Hanuta, Queso y más. Regular 16oz $6.99 · Grande 20oz $7.99.</div>
        <a href="https://wa.me/17874206692?text=Hola!%20Quiero%20un%20Frapp%C3%A9%20Cl%C3%A1sico%20de%20Mr.%20Frappe%20%F0%9F%8D%AA" target="_blank" class="menu-card-order">📲 Ordenar</a>
      </div>
      <div class="menu-card">
        <div class="menu-card-top">
          <div class="menu-card-name">Frappés Premium <span class="badge badge-hot">⭐ Top</span></div>
          <div class="menu-card-price">$7.99+</div>
        </div>
        <div class="menu-card-desc">Nutella-Ferrero, Nutella-Cheesecake, Nutella-Oreo, Oreo-Cheesecake, Ferrero-Café, Ferrero-Fresa, Café-Oreo, Reese's-Cheesecake, Trilleta, Mon Cheri, Avena-Maní, Golden y más. Regular 16oz $7.99 · Grande 20oz $8.99.</div>
        <a href="https://wa.me/17874206692?text=Hola!%20Quiero%20un%20Frapp%C3%A9%20Premium%20de%20Mr.%20Frappe%20%E2%AD%90" target="_blank" class="menu-card-order">📲 Ordenar</a>
      </div>
      <div class="menu-card">
        <div class="menu-card-top">
          <div class="menu-card-name">Sobredosis <span class="badge badge-hot">🔥 Special</span></div>
          <div class="menu-card-price">$5.99+</div>
        </div>
        <div class="menu-card-desc">Selecciona tu sabor + 4 toppings premium $14.99 · Fracaí o Pitahaya (fresa, piña, guineo, coco rallado, granola, whipped cream) Reg $7.99 / Grd $8.99 · Cheesecake al Plato $7.99 · Vasitos de Nutella $5.99</div>
        <a href="https://wa.me/17874206692?text=Hola!%20Quiero%20una%20Sobredosis%20de%20Mr.%20Frappe%20%F0%9F%94%A5" target="_blank" class="menu-card-order">📲 Ordenar</a>
      </div>
      <div class="menu-card">
        <div class="menu-card-top">
          <div class="menu-card-name">Menú de Niños</div>
          <div class="menu-card-price">$3.99</div>
        </div>
        <div class="menu-card-desc">10oz · Sabores: Nutella, Oreo, Cameo, Chips Ahoy, Sara Lee, Fresa, Fresa-Guineo.</div>
        <a href="https://wa.me/17874206692?text=Hola!%20Quiero%20un%20Men%C3%BA%20de%20Ni%C3%B1os%20de%20Mr.%20Frappe%20%F0%9F%91%A7" target="_blank" class="menu-card-order">📲 Ordenar</a>
      </div>
    </div>

    <!-- BOWLS -->
    <div id="cat-bowls" class="menu-grid" style="display:none;">
      <div class="menu-card">
        <div class="menu-card-top">
          <div class="menu-card-name">Bowl Clásico</div>
          <div class="menu-card-price">$6.99 / $7.99</div>
        </div>
        <div class="menu-card-desc">Granola, Miel, Coco Rallado y Guineo. Base: Açaí, Pitahaya, Coco o Parcha. Peq / Grd.</div>
        <a href="https://wa.me/17874206692?text=Hola!%20Quiero%20un%20Bowl%20Cl%C3%A1sico%20de%20Mr.%20Frappe%20%F0%9F%A5%A3" target="_blank" class="menu-card-order">📲 Ordenar</a>
      </div>
      <div class="menu-card">
        <div class="menu-card-top">
          <div class="menu-card-name">Bowl Hawaiano</div>
          <div class="menu-card-price">$8.99 / $10.99</div>
        </div>
        <div class="menu-card-desc">Granola, Coco Rallado, Aceite de Coco, Miel, Piña, Mango y Guineo.</div>
        <a href="https://wa.me/17874206692?text=Hola!%20Quiero%20un%20Bowl%20Hawaiano%20de%20Mr.%20Frappe%20%F0%9F%8C%BA" target="_blank" class="menu-card-order">📲 Ordenar</a>
      </div>
      <div class="menu-card">
        <div class="menu-card-top">
          <div class="menu-card-name">Bowl Surfer</div>
          <div class="menu-card-price">$8.99 / $10.99</div>
        </div>
        <div class="menu-card-desc">Granola, Miel, Aceite de Coco, Fresa, Blueberry, Guineo y Uvas Verdes.</div>
        <a href="https://wa.me/17874206692?text=Hola!%20Quiero%20un%20Bowl%20Surfer%20de%20Mr.%20Frappe%20%F0%9F%8C%8A" target="_blank" class="menu-card-order">📲 Ordenar</a>
      </div>
      <div class="menu-card">
        <div class="menu-card-top">
          <div class="menu-card-name">Nutella Bowl</div>
          <div class="menu-card-price">$8.99 / $10.99</div>
        </div>
        <div class="menu-card-desc">Granola, Coco Rallado, Aceite de Coco, Fresa, Guineo y Nutella.</div>
        <a href="https://wa.me/17874206692?text=Hola!%20Quiero%20un%20Nutella%20Bowl%20de%20Mr.%20Frappe%20%F0%9F%8D%AB" target="_blank" class="menu-card-order">📲 Ordenar</a>
      </div>
      <div class="menu-card">
        <div class="menu-card-top">
          <div class="menu-card-name">Protein Bowl</div>
          <div class="menu-card-price">$10.99 / $12.99</div>
        </div>
        <div class="menu-card-desc">Granola, Coco Rallado, Aceite de Coco, Maní, Peanut Butter, Nueces, Fresas y Guineo.</div>
        <a href="https://wa.me/17874206692?text=Hola!%20Quiero%20un%20Protein%20Bowl%20de%20Mr.%20Frappe%20%F0%9F%92%AA" target="_blank" class="menu-card-order">📲 Ordenar</a>
      </div>
      <div class="menu-card">
        <div class="menu-card-top">
          <div class="menu-card-name">Mr. Bowl <span class="badge badge-hot">🔥 Signature</span></div>
          <div class="menu-card-price">$10.99 / $12.99</div>
        </div>
        <div class="menu-card-desc">Granola, Miel, Aceite de Coco, Coco Rallado, Fresa, Blueberry, Guineo, Piña, Mango, Kiwi y Whipped Cream.</div>
        <a href="https://wa.me/17874206692?text=Hola!%20Quiero%20un%20Mr.%20Bowl%20de%20Mr.%20Frappe%20%F0%9F%94%A5" target="_blank" class="menu-card-order">📲 Ordenar</a>
      </div>
      <div class="menu-card">
        <div class="menu-card-top">
          <div class="menu-card-name">Crea tu Bowl</div>
          <div class="menu-card-price">$3.99 / $4.99</div>
        </div>
        <div class="menu-card-desc">Frutas y Toppings a tu gusto (costo adicional). Toppings para Bowls $1.00 c/u: Fresa, Guineo, Piña, Mango, Blueberry, Kiwi, Uvas Verdes, Papaya, Almendras, Granola, Nueces, Maní Molido, Coco Rallado, Aceite de Coco, Peanut Butter, Nutella, M&M, Whipped Cream, Cheesecake $2.00, Sara Lee $1.50, Brownie $1.50.</div>
        <a href="https://wa.me/17874206692?text=Hola!%20Quiero%20crear%20mi%20propio%20Bowl%20en%20Mr.%20Frappe%20%F0%9F%8D%B3" target="_blank" class="menu-card-order">📲 Ordenar</a>
      </div>
    </div>

    <!-- FRESAS CON CREMA -->
    <div id="cat-fresas" class="menu-grid" style="display:none;">
      <div class="menu-card">
        <div class="menu-card-top">
          <div class="menu-card-name">Mini Fresas & Crema 9oz</div>
          <div class="menu-card-price">$6.99</div>
        </div>
        <div class="menu-card-desc">Crema y Fresa. Topping costo adicional desde $.99.</div>
        <a href="https://wa.me/17874206692?text=Hola!%20Quiero%20Mini%20Fresas%20con%20Crema%20de%20Mr.%20Frappe%20%F0%9F%8D%93" target="_blank" class="menu-card-order">📲 Ordenar</a>
      </div>
      <div class="menu-card">
        <div class="menu-card-top">
          <div class="menu-card-name">La Clásica 16oz</div>
          <div class="menu-card-price">$9.99</div>
        </div>
        <div class="menu-card-desc">Crema, Fresa, Whipped Cream y Granola.</div>
        <a href="https://wa.me/17874206692?text=Hola!%20Quiero%20La%20Cl%C3%A1sica%2016oz%20de%20Mr.%20Frappe%20%F0%9F%8D%93" target="_blank" class="menu-card-order">📲 Ordenar</a>
      </div>
      <div class="menu-card">
        <div class="menu-card-top">
          <div class="menu-card-name">La Napolitana 16oz</div>
          <div class="menu-card-price">$10.99</div>
        </div>
        <div class="menu-card-desc">Crema, Fresa, Nutella, Whipped Cream y Granola.</div>
        <a href="https://wa.me/17874206692?text=Hola!%20Quiero%20La%20Napolitana%2016oz%20de%20Mr.%20Frappe" target="_blank" class="menu-card-order">📲 Ordenar</a>
      </div>
      <div class="menu-card">
        <div class="menu-card-top">
          <div class="menu-card-name">Cookies & Cream 16oz</div>
          <div class="menu-card-price">$10.99</div>
        </div>
        <div class="menu-card-desc">Crema, Fresas, Oreo, Whipped Cream y Granola.</div>
        <a href="https://wa.me/17874206692?text=Hola!%20Quiero%20Cookies%20%26%20Cream%2016oz%20de%20Mr.%20Frappe" target="_blank" class="menu-card-order">📲 Ordenar</a>
      </div>
      <div class="menu-card">
        <div class="menu-card-top">
          <div class="menu-card-name">Banana Cream 16oz</div>
          <div class="menu-card-price">$10.99</div>
        </div>
        <div class="menu-card-desc">Crema, Fresas, Guineo, Whipped Cream y Granola.</div>
        <a href="https://wa.me/17874206692?text=Hola!%20Quiero%20Banana%20Cream%2016oz%20de%20Mr.%20Frappe" target="_blank" class="menu-card-order">📲 Ordenar</a>
      </div>
      <div class="menu-card">
        <div class="menu-card-top">
          <div class="menu-card-name">La Bestial 16oz <span class="badge badge-hot">⭐ Top</span></div>
          <div class="menu-card-price">$12.49</div>
        </div>
        <div class="menu-card-desc">Crema, Fresas, Nutella, Cheesecake, Whipped Cream y Granola.</div>
        <a href="https://wa.me/17874206692?text=Hola!%20Quiero%20La%20Bestial%2016oz%20de%20Mr.%20Frappe%20%E2%AD%90" target="_blank" class="menu-card-order">📲 Ordenar</a>
      </div>
      <div class="menu-card">
        <div class="menu-card-top">
          <div class="menu-card-name">La Rocher 16oz</div>
          <div class="menu-card-price">$11.99</div>
        </div>
        <div class="menu-card-desc">Crema, Fresas, Ferrero Cream, Whipped Cream, Ferrero Topping y Maní.</div>
        <a href="https://wa.me/17874206692?text=Hola!%20Quiero%20La%20Rocher%2016oz%20de%20Mr.%20Frappe" target="_blank" class="menu-card-order">📲 Ordenar</a>
      </div>
      <div class="menu-card">
        <div class="menu-card-top">
          <div class="menu-card-name">La Mister 16oz</div>
          <div class="menu-card-price">$12.49</div>
        </div>
        <div class="menu-card-desc">Crema, Fresa, Guineo, Mango, Piña, Kiwi, Blueberry, Coco Rallado, Whipped Cream y Granola.</div>
        <a href="https://wa.me/17874206692?text=Hola!%20Quiero%20La%20Mister%2016oz%20de%20Mr.%20Frappe" target="_blank" class="menu-card-order">📲 Ordenar</a>
      </div>
      <div class="menu-card">
        <div class="menu-card-top">
          <div class="menu-card-name">La Monumental 16oz <span class="badge badge-hot">🔥 Grande</span></div>
          <div class="menu-card-price">$13.49</div>
        </div>
        <div class="menu-card-desc">Crema, Fresas, Cheesecake, Brownies, Nutella, Whipped Cream y Granola.</div>
        <a href="https://wa.me/17874206692?text=Hola!%20Quiero%20La%20Monumental%2016oz%20de%20Mr.%20Frappe%20%F0%9F%94%A5" target="_blank" class="menu-card-order">📲 Ordenar</a>
      </div>
      <div class="menu-card" style="border:2px solid var(--gold);background:linear-gradient(135deg,#fff9e6,#fff);">
        <div class="menu-card-top">
          <div class="menu-card-name">Fresas Dubái 🔥 <span class="badge badge-trending">Viral</span></div>
          <div class="menu-card-price">$9.99 / $15.49</div>
        </div>
        <div class="menu-card-desc">Crema de Pistacho, Nutella, Kataifi crujiente, Pistacho Triturado, Bites Dubái Bar y Fresas frescas. 9oz Regular / 16oz Grande.</div>
        <a href="https://wa.me/17874206692?text=Hola!%20Quiero%20las%20Fresas%20Dub%C3%A1i%20de%20Mr.%20Frappe%20%F0%9F%94%A5" target="_blank" class="menu-card-order" style="background:var(--gold);color:#1a1a1a;">📲 Quiero estas!</a>
      </div>
    </div>

    <!-- OBLEAS -->
    <div id="cat-obleas" class="menu-grid" style="display:none;">
      <div class="menu-card">
        <div class="menu-card-top">
          <div class="menu-card-name">Oblea Fresas con Crema</div>
          <div class="menu-card-price">$11.99</div>
        </div>
        <div class="menu-card-desc">Arequipe, fresas frescas y nuestra inigualable crema de la casa.</div>
        <a href="https://wa.me/17874206692?text=Hola!%20Quiero%20la%20Oblea%20Fresas%20con%20Crema%20de%20Mr.%20Frappe" target="_blank" class="menu-card-order">📲 Ordenar</a>
      </div>
      <div class="menu-card">
        <div class="menu-card-top">
          <div class="menu-card-name">Oblea Napolitana</div>
          <div class="menu-card-price">$12.99</div>
        </div>
        <div class="menu-card-desc">Arequipe, Nutella, fresas frescas y crema de la casa.</div>
        <a href="https://wa.me/17874206692?text=Hola!%20Quiero%20la%20Oblea%20Napolitana%20de%20Mr.%20Frappe" target="_blank" class="menu-card-order">📲 Ordenar</a>
      </div>
      <div class="menu-card">
        <div class="menu-card-top">
          <div class="menu-card-name">Oblea Strawberries Cheesecake</div>
          <div class="menu-card-price">$13.49</div>
        </div>
        <div class="menu-card-desc">Arequipe, cheesecake, crema de la casa y fresas frescas.</div>
        <a href="https://wa.me/17874206692?text=Hola!%20Quiero%20la%20Oblea%20Strawberries%20Cheesecake%20de%20Mr.%20Frappe" target="_blank" class="menu-card-order">📲 Ordenar</a>
      </div>
      <div class="menu-card" style="border:2px solid var(--gold);background:linear-gradient(135deg,#fff9e6,#fff);">
        <div class="menu-card-top">
          <div class="menu-card-name">Oblea Dubái Clásica 🔥 <span class="badge badge-trending">Viral</span></div>
          <div class="menu-card-price">$14.99</div>
        </div>
        <div class="menu-card-desc">Fresas frescas, crema de pistacho, kataifi crujiente y Nutella.</div>
        <a href="https://wa.me/17874206692?text=Hola!%20Quiero%20la%20Oblea%20Dub%C3%A1i%20Cl%C3%A1sica%20de%20Mr.%20Frappe%20%F0%9F%94%A5" target="_blank" class="menu-card-order" style="background:var(--gold);color:#1a1a1a;">📲 Quiero esta!</a>
      </div>
      <div class="menu-card" style="border:2px solid var(--pink);background:linear-gradient(135deg,#fff5fb,#fff);">
        <div class="menu-card-top">
          <div class="menu-card-name">Oblea Dubái Premium 👑 <span class="badge badge-hot">Top</span></div>
          <div class="menu-card-price">$15.99</div>
        </div>
        <div class="menu-card-desc">Fresas frescas, crema de pistacho, kataifi crujiente, Nutella y crema de la casa. La experiencia completa.</div>
        <a href="https://wa.me/17874206692?text=Hola!%20Quiero%20la%20Oblea%20Dub%C3%A1i%20Premium%20de%20Mr.%20Frappe%20%F0%9F%91%91" target="_blank" class="menu-card-order">📲 Quiero esta!</a>
      </div>
    </div>

    <!-- KETO -->
    <div id="cat-keto" class="menu-grid" style="display:none;">
      <div class="menu-card" style="border:2px solid var(--green);">
        <div class="menu-card-top">
          <div class="menu-card-name">Frappés Keto / Low Carb <span class="badge badge-keto">💚 Keto</span></div>
          <div class="menu-card-price">$7.49 / $8.49</div>
        </div>
        <div class="menu-card-desc">Endulzados con Monk Fruit. Sin azúcar refinada. Sabores disponibles: Fresa · Fresa Blueberry · Fresa Blueberry Queso Crema · Fresa Queso · Queso · 4 Berry · Verde. 16oz $7.49 · 20oz $8.49.</div>
        <a href="https://wa.me/17874206692?text=Hola!%20Quiero%20un%20Frapp%C3%A9%20Keto%20de%20Mr.%20Frappe%20%F0%9F%92%9A" target="_blank" class="menu-card-order" style="background:var(--green);">📲 Ordenar</a>
      </div>
    </div>

  </div>
</section>

<!-- TOPPINGS -->
<section class="toppings-sec" id="toppings">
  <div class="toppings-inner">
    <div class="sec-header">
      <div class="sec-tag">Personaliza tu Orden</div>
      <h2 class="sec-title">Toppings 🍫</h2>
    </div>
    <div class="topping-grid">
      <div class="topping-box">
        <div class="topping-title">Toppings Regulares</div>
        <div class="topping-price">$.50 c/u</div>
        <div class="topping-list">
          <span class="topping-pill">Maní Molido</span><span class="topping-pill">Almendra</span><span class="topping-pill">Coco Rallado</span><span class="topping-pill">Grageas</span><span class="topping-pill">Cherry</span><span class="topping-pill">Chocolate Derretido</span><span class="topping-pill">Caramelo Derretido</span><span class="topping-pill">Strawberry Líquida</span>
        </div>
      </div>
      <div class="topping-box">
        <div class="topping-title">Toppings Premium</div>
        <div class="topping-price">$.75 c/u</div>
        <div class="topping-list">
          <span class="topping-pill">Nutella</span><span class="topping-pill">Ferrero</span><span class="topping-pill">Tronky</span><span class="topping-pill">Cheesecake</span><span class="topping-pill">Hanuta</span><span class="topping-pill">Sara Lee</span><span class="topping-pill">Kit Kat</span><span class="topping-pill">Brownie</span><span class="topping-pill">Reese's</span><span class="topping-pill">M&M</span><span class="topping-pill">Oreo</span><span class="topping-pill">Cameo</span><span class="topping-pill">Chips Ahoy</span><span class="topping-pill">Granola</span><span class="topping-pill">Fresa</span><span class="topping-pill">Guineo</span><span class="topping-pill">Piña</span>
        </div>
      </div>
    </div>
    <div style="text-align:center;margin-top:1.5rem;font-size:0.78rem;color:var(--mid);">
      Agua Fría $1.00 · Alerta de Alergias: nos preocupamos por ti, avísanos · Nos reservamos el derecho de admisión
    </div>
  </div>
</section>

<!-- CTA FINAL -->
<section class="cta-sec">
  <h2 class="cta-title">¿Listo para ordenar? 🍓</h2>
  <p class="cta-sub">Ordena directo por WhatsApp — rápido, fácil y sin complicaciones. Preparamos todo al momento.</p>
  <div class="cta-btns">
    <a href="https://wa.me/17874206692?text=Hola%20Mr.%20Frappe!%20Quiero%20hacer%20un%20pedido%20%F0%9F%8D%93" target="_blank" class="btn-cta-wa">📲 (787) 420-6692</a>
    <a href="tel:+17874206692" class="btn-cta-call">📞 Llamar</a>
  </div>
</section>

<div class="powered">
  Demo creado por <a href="https://ivamarai.com" target="_blank">Ivamar AI</a> · ¿Quieres una página como esta para tu negocio? <a href="https://ivamarai.com" target="_blank">ivamarai.com</a>
</div>

<script>
function showCat(cat, btn) {
  document.querySelectorAll('[id^="cat-"]').forEach(el => el.style.display = 'none');
  document.getElementById('cat-' + cat).style.display = 'grid';
  document.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}
</script>
</body>
</html>`;
