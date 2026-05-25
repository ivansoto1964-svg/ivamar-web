module.exports = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Car Dealership — AI Assistant Demo by Ivamar AI</title>
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&family=Barlow+Condensed:wght@600;700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'DM Sans',sans-serif;background:#fff;color:#111;overflow-x:hidden;}
:root{
  --red:#BB0000;
  --dark:#111;
  --gray:#F5F5F5;
  --mid:#666;
  --border:#E5E5E5;
  --green:#00A651;
}

/* NAV */
nav{background:#fff;border-bottom:1px solid var(--border);padding:0 2rem;display:flex;align-items:center;justify-content:space-between;height:64px;position:sticky;top:0;z-index:100;}
.nav-logo{display:flex;align-items:center;gap:0.8rem;}
.nav-kia{background:var(--red);color:#fff;font-family:'Barlow Condensed',sans-serif;font-size:1.1rem;font-weight:900;padding:0.3rem 0.7rem;border-radius:4px;letter-spacing:0.05em;}
.nav-name{font-family:'Barlow',sans-serif;font-size:0.88rem;font-weight:700;color:var(--dark);}
.nav-sub{font-size:0.62rem;color:var(--mid);display:block;}
.nav-right{display:flex;align-items:center;gap:1.5rem;}
.nav-right a{font-size:0.8rem;color:var(--mid);text-decoration:none;font-weight:500;}
.nav-right a:hover{color:var(--red);}
.nav-phone{font-size:0.8rem;font-weight:600;color:var(--dark);}
.nav-demo-tag{font-size:0.62rem;background:#FFF3CD;color:#856404;padding:0.2rem 0.6rem;border-radius:4px;font-weight:700;border:1px solid #FFEAA7;}

/* HERO */
.hero{background:var(--dark);padding:5rem 2rem 4rem;position:relative;overflow:hidden;}
.hero::after{content:'';position:absolute;top:0;right:0;width:50%;height:100%;background:linear-gradient(135deg,transparent,rgba(187,0,0,0.15));pointer-events:none;}
.hero-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1.1fr 0.9fr;gap:4rem;align-items:center;position:relative;z-index:1;}
.hero-badge{display:inline-flex;align-items:center;gap:0.5rem;background:rgba(187,0,0,0.12);border:1px solid rgba(187,0,0,0.25);padding:0.3rem 0.8rem;border-radius:4px;margin-bottom:1.2rem;}
.hero-badge-dot{width:6px;height:6px;background:var(--red);border-radius:50%;animation:pulse 2s infinite;}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
.hero-badge-text{font-size:0.65rem;color:#ff8080;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;}
.hero h1{font-family:'Barlow Condensed',sans-serif;font-size:clamp(3rem,6vw,5.5rem);font-weight:900;line-height:0.95;letter-spacing:-0.01em;color:#fff;text-transform:uppercase;margin-bottom:1.2rem;}
.hero h1 em{color:var(--red);font-style:normal;display:block;}
.hero-sub{font-size:1rem;color:rgba(255,255,255,0.6);line-height:1.7;margin-bottom:2rem;max-width:440px;}
.hero-btns{display:flex;gap:0.8rem;flex-wrap:wrap;margin-bottom:2.5rem;}
.btn-red{display:inline-flex;align-items:center;gap:0.5rem;background:var(--red);color:#fff;padding:0.85rem 1.8rem;border-radius:6px;font-size:0.88rem;font-weight:700;text-decoration:none;transition:all 0.2s;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;}
.btn-red:hover{background:#990000;transform:translateY(-1px);}
.btn-outline-w{display:inline-flex;align-items:center;gap:0.5rem;border:1.5px solid rgba(255,255,255,0.25);color:#fff;padding:0.85rem 1.8rem;border-radius:6px;font-size:0.88rem;font-weight:600;text-decoration:none;transition:all 0.2s;}
.btn-outline-w:hover{border-color:#fff;}
.hero-stats{display:flex;gap:2rem;}
.stat{border-left:2px solid var(--red);padding-left:1rem;}
.stat-num{font-family:'Barlow Condensed',sans-serif;font-size:1.8rem;font-weight:900;color:#fff;line-height:1;}
.stat-label{font-size:0.68rem;color:rgba(255,255,255,0.4);margin-top:0.2rem;}

/* HERO CHAT */
.hero-chat{background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,0.5);}
.hc-header{background:#1a1a1a;padding:1rem 1.2rem;display:flex;align-items:center;gap:0.8rem;}
.hc-avatar{width:36px;height:36px;background:var(--red);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;}
.hc-name{font-size:0.85rem;font-weight:700;color:#fff;}
.hc-status{font-size:0.62rem;color:var(--green);}
.hc-msgs{padding:1.2rem;background:#f9f9f9;display:flex;flex-direction:column;gap:0.8rem;}
.hc-bot{max-width:88%;background:#fff;border:1px solid #eee;border-radius:4px 12px 12px 12px;padding:0.75rem 1rem;font-size:0.8rem;line-height:1.6;color:#111;align-self:flex-start;}
.hc-user{max-width:88%;background:var(--red);border-radius:12px 4px 12px 12px;padding:0.75rem 1rem;font-size:0.8rem;line-height:1.6;color:#fff;align-self:flex-end;}
.hc-footer{padding:0.8rem;border-top:1px solid #eee;display:flex;gap:0.5rem;background:#fff;}
.hc-input{flex:1;border:1px solid #eee;border-radius:8px;padding:0.6rem 0.9rem;font-size:0.75rem;outline:none;font-family:'DM Sans',sans-serif;}
.hc-send{background:var(--red);border:none;border-radius:8px;width:32px;height:32px;cursor:pointer;color:#fff;font-size:0.85rem;}

/* QR BADGE */
.qr-float{position:absolute;bottom:-12px;left:0;background:#fff;border-radius:10px;padding:0.7rem 0.9rem;box-shadow:0 8px 24px rgba(0,0,0,0.3);display:flex;align-items:center;gap:0.6rem;}
.qr-box{width:44px;height:44px;background:var(--dark);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;}
.qr-info-title{font-size:0.7rem;font-weight:700;color:#111;}
.qr-info-sub{font-size:0.62rem;color:var(--mid);}

/* HOW */
.how{padding:5rem 2rem;background:#fff;}
.how-inner{max-width:1100px;margin:0 auto;}
.sec-tag{font-size:0.65rem;font-weight:700;color:var(--red);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:0.5rem;}
.sec-title{font-family:'Barlow Condensed',sans-serif;font-size:clamp(2rem,4vw,3rem);font-weight:900;text-transform:uppercase;color:var(--dark);line-height:1.05;margin-bottom:0.5rem;}
.sec-title em{color:var(--red);font-style:normal;}
.sec-sub{font-size:0.88rem;color:var(--mid);line-height:1.7;max-width:480px;margin-bottom:3rem;}
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;}
.step{position:relative;}
.step-n{font-family:'Barlow Condensed',sans-serif;font-size:3.5rem;font-weight:900;color:#f0f0f0;line-height:1;}
.step-icon{width:42px;height:42px;background:var(--red);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;margin-bottom:0.8rem;}
.step h3{font-family:'Barlow',sans-serif;font-size:0.92rem;font-weight:700;margin-bottom:0.4rem;}
.step p{font-size:0.76rem;color:var(--mid);line-height:1.6;}
.step-arr{position:absolute;right:-14px;top:28px;width:28px;height:2px;background:#eee;}

/* FEATURES */
.feats{padding:5rem 2rem;background:var(--gray);}
.feats-inner{max-width:1100px;margin:0 auto;}
.feats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem;margin-top:3rem;}
.feat{background:#fff;border-radius:12px;padding:1.5rem;border:1px solid var(--border);transition:all 0.2s;}
.feat:hover{border-color:var(--red);transform:translateY(-2px);}
.feat-icon{font-size:1.8rem;margin-bottom:0.8rem;}
.feat h3{font-family:'Barlow',sans-serif;font-size:0.9rem;font-weight:700;margin-bottom:0.4rem;}
.feat p{font-size:0.76rem;color:var(--mid);line-height:1.6;}
.feat-badge{display:inline-block;font-size:0.58rem;font-weight:700;color:var(--red);background:rgba(187,0,0,0.06);border:1px solid rgba(187,0,0,0.15);padding:0.15rem 0.5rem;border-radius:4px;margin-top:0.6rem;text-transform:uppercase;letter-spacing:0.05em;}

/* QR SECTION */
.qr-sec{padding:5rem 2rem;background:#fff;}
.qr-sec-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;}
.qr-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:2rem;}
.qr-card{background:var(--gray);border-radius:12px;padding:1.2rem;border:1px solid var(--border);text-align:center;}
.qr-card-icon{font-size:2rem;margin-bottom:0.6rem;}
.qr-card h3{font-size:0.82rem;font-weight:700;margin-bottom:0.3rem;}
.qr-card p{font-size:0.7rem;color:var(--mid);line-height:1.5;}
.qr-visual{background:var(--dark);border-radius:16px;padding:2rem;text-align:center;}
.qr-visual-box{width:90px;height:90px;background:#fff;border-radius:8px;margin:0 auto 1rem;display:flex;align-items:center;justify-content:center;font-size:2.5rem;}
.qr-visual-text{font-size:0.72rem;color:rgba(255,255,255,0.5);line-height:1.6;}
.qr-visual-brand{font-family:'Barlow Condensed',sans-serif;font-size:1rem;font-weight:800;color:#fff;margin-top:0.5rem;letter-spacing:0.05em;}
.qr-stat{background:rgba(187,0,0,0.08);border:1px solid rgba(187,0,0,0.15);border-radius:8px;padding:0.8rem 1rem;margin-top:1rem;font-size:0.76rem;color:rgba(255,255,255,0.7);line-height:1.5;}
.qr-stat strong{color:#fff;}

/* INVENTORY */
.inv{padding:4rem 2rem;background:var(--dark);}
.inv-inner{max-width:1100px;margin:0 auto;}
.inv-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-top:2rem;}
.car{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:1.2rem;transition:all 0.2s;}
.car:hover{border-color:var(--red);}
.car-emoji{font-size:2.2rem;display:block;margin-bottom:0.8rem;}
.car-name{font-family:'Barlow Condensed',sans-serif;font-size:1.1rem;font-weight:900;color:#fff;text-transform:uppercase;}
.car-type{font-size:0.65rem;color:rgba(255,255,255,0.35);margin-bottom:0.5rem;}
.car-price{font-size:0.85rem;font-weight:700;color:var(--red);}
.car-avail{display:inline-block;font-size:0.58rem;font-weight:700;color:var(--green);background:rgba(0,166,81,0.1);border:1px solid rgba(0,166,81,0.2);padding:0.15rem 0.5rem;border-radius:4px;margin-top:0.4rem;}

/* ASSISTANT */
.assist-sec{padding:5rem 2rem;background:var(--gray);}
.assist-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start;}
.assist-chat{background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,0.1);}
.ac-header{background:var(--dark);padding:1rem 1.2rem;display:flex;align-items:center;justify-content:space-between;}
.ac-info{display:flex;align-items:center;gap:0.8rem;}
.ac-avatar{width:36px;height:36px;background:var(--red);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;}
.ac-name{font-size:0.85rem;font-weight:700;color:#fff;}
.ac-status{font-size:0.62rem;color:var(--green);}
.ac-lang{font-size:0.62rem;color:rgba(255,255,255,0.35);background:rgba(255,255,255,0.07);padding:0.2rem 0.5rem;border-radius:4px;}
.ac-msgs{padding:1.2rem;background:#f9f9f9;display:flex;flex-direction:column;gap:0.8rem;min-height:200px;}
.ac-bot{max-width:88%;background:#fff;border:1px solid #eee;border-radius:4px 12px 12px 12px;padding:0.75rem 1rem;font-size:0.8rem;line-height:1.6;color:#111;align-self:flex-start;}
.ac-user{max-width:88%;background:var(--red);border-radius:12px 4px 12px 12px;padding:0.75rem 1rem;font-size:0.8rem;line-height:1.6;color:#fff;align-self:flex-end;}
.ac-suggs{padding:0 1rem 0.8rem;background:#f9f9f9;display:flex;flex-wrap:wrap;gap:0.4rem;}
.ac-sugg{font-size:0.68rem;padding:0.3rem 0.6rem;border:1px solid #ddd;border-radius:20px;color:#555;cursor:pointer;background:#fff;font-family:'DM Sans',sans-serif;transition:all 0.2s;}
.ac-sugg:hover{border-color:var(--red);color:var(--red);}
.ac-footer{padding:0.8rem;border-top:1px solid #eee;display:flex;gap:0.5rem;background:#fff;}
.ac-input{flex:1;border:1px solid #eee;border-radius:8px;padding:0.6rem 0.9rem;font-size:0.76rem;outline:none;font-family:'DM Sans',sans-serif;}
.ac-send{background:var(--red);border:none;border-radius:8px;width:32px;height:32px;cursor:pointer;color:#fff;font-size:0.85rem;}

/* PLANS */
.plans{padding:5rem 2rem;background:#fff;}
.plans-inner{max-width:1100px;margin:0 auto;}
.plans-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:3rem;}
.plan{background:#fff;border:1.5px solid var(--border);border-radius:16px;padding:2rem;position:relative;overflow:hidden;transition:all 0.2s;}
.plan:hover{transform:translateY(-3px);box-shadow:0 12px 32px rgba(0,0,0,0.08);}
.plan.featured{border-color:var(--red);}
.plan.featured::before{content:'Más Popular';position:absolute;top:0;right:0;background:var(--red);color:#fff;font-size:0.6rem;font-weight:700;padding:0.25rem 0.8rem;border-radius:0 14px 0 8px;letter-spacing:0.05em;}
.plan-tag{font-size:0.65rem;font-weight:700;color:var(--red);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.8rem;}
.plan-name{font-family:'Barlow Condensed',sans-serif;font-size:1.5rem;font-weight:900;text-transform:uppercase;color:var(--dark);margin-bottom:0.3rem;}
.plan-dealers{font-size:0.76rem;color:var(--mid);margin-bottom:1rem;padding-bottom:1rem;border-bottom:1px solid var(--border);}
.plan-price{font-family:'Barlow Condensed',sans-serif;font-size:2.8rem;font-weight:900;color:var(--dark);line-height:1;letter-spacing:-0.03em;}
.plan-price span{font-size:1rem;font-weight:400;color:var(--mid);}
.plan-setup{font-size:0.72rem;color:var(--mid);margin-bottom:1.2rem;}
.plan-features{list-style:none;display:flex;flex-direction:column;gap:0.5rem;margin-bottom:1.5rem;}
.plan-features li{font-size:0.78rem;color:#444;display:flex;align-items:flex-start;gap:0.5rem;}
.plan-features li::before{content:'✓';color:var(--green);font-weight:700;flex-shrink:0;}
.plan-btn{width:100%;background:var(--dark);color:#fff;border:none;padding:0.85rem;border-radius:8px;font-size:0.82rem;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.2s;text-decoration:none;display:block;text-align:center;}
.plan-btn:hover{background:var(--red);}
.plan.featured .plan-btn{background:var(--red);}
.plan.featured .plan-btn:hover{background:#990000;}

/* NO CALLS */
.no-calls{padding:4rem 2rem;background:var(--dark);}
.no-calls-inner{max-width:700px;margin:0 auto;text-align:center;}
.no-calls-icon{font-size:3rem;margin-bottom:1rem;}
.no-calls h2{font-family:'Barlow Condensed',sans-serif;font-size:clamp(2rem,4vw,3rem);font-weight:900;color:#fff;text-transform:uppercase;letter-spacing:-0.01em;margin-bottom:1rem;line-height:1.1;}
.no-calls h2 em{color:var(--red);font-style:normal;}
.no-calls p{font-size:0.92rem;color:rgba(255,255,255,0.55);line-height:1.8;margin-bottom:0.5rem;}
.no-calls-tags{display:flex;gap:0.8rem;justify-content:center;flex-wrap:wrap;margin-top:1.5rem;}
.nc-tag{font-size:0.72rem;font-weight:600;color:rgba(255,255,255,0.5);background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);padding:0.4rem 0.8rem;border-radius:4px;}

/* CTA */
.cta{padding:5rem 2rem;background:var(--red);}
.cta-inner{max-width:700px;margin:0 auto;text-align:center;}
.cta h2{font-family:'Barlow Condensed',sans-serif;font-size:clamp(2.5rem,5vw,4rem);font-weight:900;color:#fff;text-transform:uppercase;letter-spacing:-0.01em;margin-bottom:0.8rem;line-height:1;}
.cta p{font-size:0.92rem;color:rgba(255,255,255,0.75);margin-bottom:2rem;line-height:1.6;}
.btn-white{display:inline-flex;align-items:center;gap:0.5rem;background:#fff;color:var(--red);padding:0.9rem 2rem;border-radius:6px;font-size:0.9rem;font-weight:800;text-decoration:none;transition:all 0.2s;}
.btn-white:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,0.2);}
.cta-note{font-size:0.72rem;color:rgba(255,255,255,0.5);margin-top:1rem;}

/* FOOTER */
footer{background:var(--dark);padding:2rem;text-align:center;}
.footer-kia{font-family:'Barlow Condensed',sans-serif;font-size:1rem;font-weight:800;color:#fff;margin-bottom:0.3rem;}
.footer-kia span{color:var(--red);}
.footer-info{font-size:0.68rem;color:rgba(255,255,255,0.25);line-height:1.7;}
.footer-powered{font-size:0.62rem;color:rgba(255,255,255,0.15);margin-top:0.5rem;}
.footer-powered a{color:rgba(187,0,0,0.4);text-decoration:none;}

@media(max-width:768px){
nav{padding:0 1rem;}.nav-right{display:none;}
.hero{padding:3rem 1.2rem;}.hero-inner{grid-template-columns:1fr;gap:2rem;}.hero-chat{display:none;}.hero-stats{gap:1.2rem;}
.how{padding:3rem 1.2rem;}.steps{grid-template-columns:1fr 1fr;}.step-arr{display:none;}
.feats{padding:3rem 1.2rem;}.feats-grid{grid-template-columns:1fr 1fr;}
.qr-sec{padding:3rem 1.2rem;}.qr-sec-inner{grid-template-columns:1fr;}
.inv{padding:3rem 1.2rem;}.inv-grid{grid-template-columns:1fr 1fr;}
.assist-sec{padding:3rem 1.2rem;}.assist-inner{grid-template-columns:1fr;}
.plans{padding:3rem 1.2rem;}.plans-grid{grid-template-columns:1fr;}
footer{padding:1.5rem;}
}
</style>
</head>
<body>

<!-- NAV -->
<nav>
  <div class="nav-logo">
    <div class="nav-kia">AUTO</div>
    <div>
      <div class="nav-name">Tu Dealer</div>
      <span class="nav-sub">Powered by Ivamar AI · ivamarai.com</span>
    </div>
  </div>
  <div class="nav-right">
    <a href="#how">Cómo Funciona</a>
    <a href="#assistant">Try Assistant</a>
    <a href="#plans">Plans</a>
    <span class="nav-phone">📞 connect@ivamarai.com</span>
    <span class="nav-demo-tag">LIVE DEMO</span>
  </div>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-inner">
    <div>
      <div class="hero-badge">
        <div class="hero-badge-dot"></div>
        <span class="hero-badge-text">24/7 · Español e Inglés · Sin Leads Perdidos</span>
      </div>
      <h1>Encuentra Tu<br>Próximo Vehículo<br><em>Más Rápido.</em></h1>
      <p class="hero-sub">Habla con nuestro asistente virtual para explorar inventario, opciones de financiamiento, trade-ins y vehículos disponibles — al instante, a cualquier hora del día o la noche.</p>
      <div class="hero-btns">
        <a href="#assistant" class="btn-red">🚗 Habla Con Nuestro Asistente</a>
        <a href="#plans" class="btn-outline-w">Ver Planes →</a>
      </div>
      <div class="hero-stats">
        <div class="stat">
          <div class="stat-num">200+</div>
          <div class="stat-label">Vehículos en Stock</div>
        </div>
        <div class="stat">
          <div class="stat-num">24/7</div>
          <div class="stat-label">Asistente en Línea</div>
        </div>
        <div class="stat">
          <div class="stat-num">4.3★</div>
          <div class="stat-label">Reseñas 5 Estrellas</div>
        </div>
      </div>
    </div>
    <div style="position:relative;padding-bottom:1.5rem;">
      <div class="hero-chat">
        <div class="hc-header">
          <div class="hc-avatar">🚗</div>
          <div>
            <div class="hc-name">Asistente de Tu Dealer</div>
            <div class="hc-status">● En Línea · Responde al Instante</div>
          </div>
        </div>
        <div class="hc-msgs">
          <div class="hc-bot">¡Hola! 👋 Bienvenido a Tu Dealer.<br><br>Puedo ayudarte con:<br>🚗 Inventario nuevo · 🚘 Vehículos usados<br>💰 Financiamiento · 🔄 Trade-ins · 🔧 Servicio<br><br>¿En qué puedo ayudarte hoy?</div>
          <div class="hc-user">Me interesa una SUV</div>
          <div class="hc-bot">¡Excelente elección! 🔥 Tenemos varias SUVs en inventario en diferentes rangos de precio. ¿Te gustaría conocer las opciones de financiamiento o agendar una prueba de manejo?</div>
        </div>
        <div class="hc-footer">
          <input class="hc-input" placeholder="Pregunta sobre cualquier vehículo...">
          <button class="hc-send">➤</button>
        </div>
      </div>
      <div class="qr-float">
        <div class="qr-box">📱</div>
        <div>
          <div class="qr-info-title">Escanea en cualquier lugar</div>
          <div class="qr-info-sub">Info instantánea via QR</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- HOW IT WORKS -->
<section class="how" id="how">
  <div class="how-inner">
    <div class="sec-tag">Proceso Simple</div>
    <h2 class="sec-title">How It <em>Works</em></h2>
    <p class="sec-sub">Los clientes obtienen respuestas inmediatas sin esperar a un vendedor — de día o de noche, entre semana o fines de semana.</p>
    <div class="steps">
      <div class="step">
        <div class="step-n">01</div>
        <div class="step-icon">📱</div>
        <h3>Escanea QR o Abre el Link</h3>
        <p>Comparte tu link o QR en cualquier lugar — rótulos, redes sociales, anuncios, tarjetas.</p>
        <div class="step-arr"></div>
      </div>
      <div class="step">
        <div class="step-n">02</div>
        <div class="step-icon">💬</div>
        <h3>Pregunta Naturalmente</h3>
        <p>Escribe en español o inglés. El asistente entiende y responde naturalmente.</p>
        <div class="step-arr"></div>
      </div>
      <div class="step">
        <div class="step-n">03</div>
        <div class="step-icon">🚗</div>
        <h3>Explora al Instante</h3>
        <p>Obtén precios, especificaciones, financiamiento y disponibilidad — sin esperar.</p>
        <div class="step-arr"></div>
      </div>
      <div class="step">
        <div class="step-n">04</div>
        <div class="step-icon">🤝</div>
        <h3>Conéctate Con el Equipo</h3>
        <p>¿Listo para avanzar? El asistente captura el lead y te conecta con el equipo.</p>
      </div>
    </div>
  </div>
</section>

<!-- FEATURES -->
<section class="feats">
  <div class="feats-inner">
    <div class="sec-tag">Capacidades del Asistente</div>
    <h2 class="sec-title">Todo Lo Que el Asistente <em>Puede Hacer</em></h2>
    <p class="sec-sub">Tus clientes obtienen respuestas instantáneas y precisas — 24 horas al día, 7 días a la semana, en cualquier idioma.</p>
    <div class="feats-grid">
      <div class="feat">
        <div class="feat-icon">🚗</div>
        <h3>Preguntas de Inventario</h3>
        <p>Verifica disponibilidad, colores, versiones y especificaciones de cualquier vehículo.</p>
        <span class="feat-badge">Tiempo real</span>
      </div>
      <div class="feat">
        <div class="feat-icon">💰</div>
        <h3>Información de Financiamiento</h3>
        <p>Pagos estimados, opciones de inicial, info de crédito — todo explicado claramente.</p>
        <span class="feat-badge">Instantáneo</span>
      </div>
      <div class="feat">
        <div class="feat-icon">🔄</div>
        <h3>Orientación de Trade-In</h3>
        <p>Guía a los clientes por el proceso de trade-in paso a paso automáticamente.</p>
        <span class="feat-badge">Paso a Paso</span>
      </div>
      <div class="feat">
        <div class="feat-icon">🔧</div>
        <h3>Agendamiento de Servicio</h3>
        <p>Cambios de aceite, mantenimiento y reparaciones agendados directamente.</p>
        <span class="feat-badge">24/7</span>
      </div>
      <div class="feat">
        <div class="feat-icon">📅</div>
        <h3>Solicitudes de Prueba de Manejo</h3>
        <p>Agenda pruebas de manejo fuera de horario, fines de semana — cuando el cliente quiera.</p>
        <span class="feat-badge">Siempre Abierto</span>
      </div>
      <div class="feat">
        <div class="feat-icon">🌍</div>
        <h3>Español e Inglés</h3>
        <p>Responde automáticamente en el idioma del cliente — sin confusión.</p>
        <span class="feat-badge">Bilingüe</span>
      </div>
    </div>
  </div>
</section>

<!-- QR SECTION -->
<section class="qr-sec">
  <div class="qr-sec-inner">
    <div>
      <div class="sec-tag">QR en Todas Partes</div>
      <h2 class="sec-title">Clientes Se Conectan<br>Desde <em>Cualquier Lugar.</em></h2>
      <p class="sec-sub">Coloca QR en tu dealer. Los clientes obtienen respuestas instantáneas incluso cuando está cerrado.</p>
      <div class="qr-grid">
        <div class="qr-card">
          <div class="qr-card-icon">🚗</div>
          <h3>Código QR del Dealer</h3>
          <p>Un código QR para todo tu dealer. Imprímelo donde quieras — rótulos, tarjetas, anuncios.</p>
        </div>
        <div class="qr-card">
          <div class="qr-card-icon">🏢</div>
          <h3>Rótulos del Dealer</h3>
          <p>QR grande en rótulos de entrada — visible desde la carretera.</p>
        </div>
        <div class="qr-card">
          <div class="qr-card-icon">💼</div>
          <h3>Tarjetas de Presentación</h3>
          <p>La tarjeta de cada vendedor conecta directamente al asistente.</p>
        </div>
        <div class="qr-card">
          <div class="qr-card-icon">🔑</div>
          <h3>Imprime en Cualquier Lugar</h3>
          <p>Tarjetas, flyers, banners, redes sociales — un link funciona en todos lados.</p>
        </div>
      </div>
    </div>
    <div>
      <div class="qr-visual">
        <div class="qr-visual-box">🔲</div>
        <div class="qr-visual-text">Escanea para hablar con<br>Tu Asistente al instante</div>
        <div class="qr-visual-brand">TU DEALER</div>
        <div class="qr-stat"><strong>78% de los compradores</strong> contactan al primer dealer que responde. Con un asistente 24/7, siempre eres el primero — incluso a las 2am un domingo.</div>
      </div>
    </div>
  </div>
</section>

<!-- INVENTORY -->
<section class="inv" id="inventory">
  <div class="inv-inner">
    <div class="sec-tag" style="color:rgba(255,255,255,0.35);">Modelos Populares</div>
    <h2 class="sec-title" style="color:#fff;">Current <em>Inventory</em></h2>
    <div class="inv-grid">
      <div class="car">
        <span class="car-emoji">🚙</span>
        <div class="car-name">Telluride</div>
        <div class="car-type">3-Row SUV · 8-Passenger</div>
        <div class="car-price">From \$38,490</div>
        <div class="car-avail">● En Stock</div>
      </div>
      <div class="car">
        <span class="car-emoji">🚗</span>
        <div class="car-name">Sportage</div>
        <div class="car-type">Compact SUV · AWD Available</div>
        <div class="car-price">From \$27,090</div>
        <div class="car-avail">● En Stock</div>
      </div>
      <div class="car">
        <span class="car-emoji">🚐</span>
        <div class="car-name">Sorento</div>
        <div class="car-type">Midsize SUV · Hybrid Available</div>
        <div class="car-price">From \$32,490</div>
        <div class="car-avail">● En Stock</div>
      </div>
      <div class="car">
        <span class="car-emoji">🏎️</span>
        <div class="car-name">K5</div>
        <div class="car-type">Midsize Sedan · GT Available</div>
        <div class="car-price">From \$25,990</div>
        <div class="car-avail">● En Stock</div>
      </div>
    </div>
    <div style="text-align:center;margin-top:2rem;">
      <a href="#assistant" class="btn-red">Pregunta Sobre Cualquier Vehículo →</a>
    </div>
  </div>
</section>

<!-- ASSISTANT -->
<section class="assist-sec" id="assistant">
  <div class="assist-inner">
    <div>
      <div class="sec-tag">Demo en Vivo</div>
      <h2 class="sec-title">Conoce Tu<br><em>Asistente</em></h2>
      <p style="font-size:0.88rem;color:var(--mid);line-height:1.7;margin-bottom:1.5rem;">Así es exactamente como tus clientes experimentan el asistente — pruébalo ahora.</p>
      <div style="background:#fff;border:1px solid var(--border);border-radius:12px;padding:1.2rem;margin-bottom:1rem;">
        <div style="font-size:0.65rem;color:var(--mid);margin-bottom:0.8rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">Prueba preguntando:</div>
        <div style="display:flex;flex-direction:column;gap:0.5rem;">
          <div style="font-size:0.78rem;color:var(--dark);">🚗 "¿Qué SUVs tienen disponibles?"</div>
          <div style="font-size:0.78rem;color:var(--dark);">💰 "¿Cuáles son mis opciones de financiamiento?"</div>
          <div style="font-size:0.78rem;color:var(--dark);">🔄 "¿Cómo funciona un trade-in?"</div>
          <div style="font-size:0.78rem;color:var(--dark);">🔧 "Necesito una cita de servicio"</div>
          <div style="font-size:0.78rem;color:var(--dark);">📅 "¿Puedo agendar una prueba de manejo?"</div>
          <div style="font-size:0.78rem;color:var(--dark);">🇪🇸 "¿Tienen vehículos disponibles esta semana?"</div>
        </div>
      </div>
      <div style="font-size:0.72rem;color:var(--mid);display:flex;align-items:center;gap:0.4rem;">
        <span style="color:var(--green);">●</span> Asistente en vivo · Powered by Ivamar AI
      </div>
    </div>
    <div class="assist-chat">
      <div class="ac-header">
        <div class="ac-info">
          <div class="ac-avatar">🚗</div>
          <div>
            <div class="ac-name">Tu Asistente</div>
            <div class="ac-status">● En Línea · Tu Dealer</div>
          </div>
        </div>
        <div class="ac-lang">EN · ES</div>
      </div>
      <div class="ac-msgs" id="acMsgs">
        <div class="ac-bot">¡Hola! 👋 Bienvenido a Tu Dealer.<br><br>Puedo ayudarte con:<br>🚗 Inventario nuevo y usado<br>💰 Opciones de financiamiento<br>🔄 Orientación de trade-in<br>🔧 Citas de servicio<br>📅 Pruebas de manejo<br><br>¿En qué puedo ayudarte hoy?</div>
      </div>
      <div class="ac-suggs">
        <button class="ac-sugg" onclick="acReply(this)">Vehículos nuevos</button>
        <button class="ac-sugg" onclick="acReply(this)">Opciones de financiamiento</button>
        <button class="ac-sugg" onclick="acReply(this)">Agendar prueba de manejo</button>
        <button class="ac-sugg" onclick="acReply(this)">Trade-in mi vehículo</button>
      </div>
      <div class="ac-footer">
        <input class="ac-input" id="acInput" placeholder="Pregunta sobre cualquier vehículo..." onkeydown="if(event.key==='Enter')acSend()">
        <button class="ac-send" onclick="acSend()">➤</button>
      </div>
    </div>
  </div>
</section>

<!-- PLANS -->
<section class="plans" id="plans">
  <div class="plans-inner">
    <div class="sec-tag">Planes Flexibles</div>
    <h2 class="sec-title">Elige Tu <em>Plan</em></h2>
    <p class="sec-sub">Empieza con una ubicación o despliega en todo el grupo. Cada plan incluye setup y soporte completo.</p>
    <div class="plans-grid">
      <div class="plan">
        <div class="plan-tag">Una Ubicación</div>
        <div class="plan-name">Starter</div>
        <div class="plan-dealers">1 dealer</div>
        <div class="plan-price">\$149<span>/mes</span></div>
        <div class="plan-setup">+ \$500 setup único</div>
        <ul class="plan-features">
          <li>Asistente personalizado entrenado en tu inventario y servicios</li>
          <li>Un código QR + link directo para el dealer</li>
          <li>Español e inglés automático</li>
          <li>Captura de leads 24/7</li>
          <li>Reportes mensuales de leads por email</li>
          <li>Soporte por email · Sin contratos · Cancela cuando quieras</li>
        </ul>
        <a href="mailto:connect@ivamarai.com?subject=Dealer Demo - Starter Plan Interest" class="plan-btn">Comenzar →</a>
      </div>
      <div class="plan featured">
        <div class="plan-tag">Multi-Ubicación</div>
        <div class="plan-name">Multi</div>
        <div class="plan-dealers">3 dealers</div>
        <div class="plan-price">\$349<span>/mo</span></div>
        <div class="plan-setup">+ \$1,200 setup único</div>
        <ul class="plan-features">
          <li>Asistente personalizado entrenado en tu inventario y servicios</li>
          <li>Un código QR + link directo para el dealer</li>
          <li>Español e inglés automático</li>
          <li>Captura de leads 24/7</li>
          <li>Reportes mensuales de leads por email</li>
          <li>Soporte por email · Sin contratos · Cancela cuando quieras</li>
        </ul>
        <a href="mailto:connect@ivamarai.com?subject=Dealer Demo - Multi Plan Interest" class="plan-btn">Comenzar →</a>
      </div>
      <div class="plan">
        <div class="plan-tag">Grupo Completo</div>
        <div class="plan-name">Group</div>
        <div class="plan-dealers">Todos los dealers</div>
        <div class="plan-price">\$599<span>/mo</span></div>
        <div class="plan-setup">+ \$2,500 setup único</div>
        <ul class="plan-features">
          <li>Asistente personalizado entrenado en tu inventario y servicios</li>
          <li>Un código QR + link directo para el dealer</li>
          <li>Español e inglés automático</li>
          <li>Captura de leads 24/7</li>
          <li>Reportes mensuales de leads por email</li>
          <li>Soporte por email · Sin contratos · Cancela cuando quieras</li>
        </ul>
        <a href="mailto:connect@ivamarai.com?subject=Dealer Group - Grupo Completo Plan Interest" class="plan-btn">Comenzar →</a>
      </div>
    </div>
  </div>
</section>

<!-- NO CALLS -->
<section class="no-calls">
  <div class="no-calls-inner">
    <div class="no-calls-icon">📧</div>
    <h2>No Llamamos.<br>No <em>Interrumpimos.</em></h2>
    <p>En Ivamar AI, todo va a tu ritmo — por email, en tus términos. Sin llamadas de 45 minutos. Sin seguimientos agresivos. Sin presión.</p>
    <p>Configuramos tu asistente, nos aseguramos que todo funcione y estamos disponibles por email cuando nos necesites.</p>
    <div class="no-calls-tags">
      <span class="nc-tag">📧 Solo email</span>
      <span class="nc-tag">⚡ Listo en 48hrs</span>
      <span class="nc-tag">🚫 Sin contratos</span>
      <span class="nc-tag">✅ Cancela cuando quieras</span>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="cta">
  <div class="cta-inner">
    <h2>¿Listo para Capturar Más Leads?</h2>
    <p>Envíanos un email y tendrás tu asistente listo en 48 horas. Sin llamadas, sin reuniones — solo resultados.</p>
    <a href="mailto:connect@ivamarai.com?subject=Dealer Demo - Assistant Interest" class="btn-white">📧 Escríbenos para Comenzar</a>
    <div class="cta-note">connect@ivamarai.com · Respondemos en 24 horas</div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-kia">TU <span>DEALER</span></div>
  <div class="footer-info">
    ivamarai.com · connect@ivamarai.com<br>
    Asistentes IA para Dealers · USA y LATAM
  </div>
  <div class="footer-powered">Este demo fue creado por <a href="https://ivamarai.com" target="_blank">Ivamar AI LLC</a> · connect@ivamarai.com</div>
</footer>

<script>
let acHistory = [];
let acTyping = false;

async function callKiaAssistant(message) {
  try {
    const res = await fetch('/api/iva-sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        history: acHistory,
        lang: message.match(/[áéíóúñ¿¡]/i) ? 'es' : 'en',
        context: {
          businessType: 'Kia dealership',
          name: 'Tu Asistente'
        }
      })
    });
    const data = await res.json();
    const reply = data.reply || "I'm having a quick issue. Please call us at connect@ivamarai.com!";
    acHistory.push({ role: 'user', content: message });
    acHistory.push({ role: 'assistant', content: reply });
    if (acHistory.length > 20) acHistory = acHistory.slice(-20);
    return reply;
  } catch(e) {
    return "I'm having a quick issue. Please call us at connect@ivamarai.com!";
  }
}

function showTyping() {
  const msgs = document.getElementById('acMsgs');
  const div = document.createElement('div');
  div.className = 'ac-bot';
  div.id = 'acTyping';
  div.innerHTML = '<span style="opacity:0.5">Asistente escribiendo...</span>';
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function removeTyping() {
  const el = document.getElementById('acTyping');
  if (el) el.remove();
}

function addMsg(text, type) {
  const msgs = document.getElementById('acMsgs');
  const div = document.createElement('div');
  div.className = type === 'user' ? 'ac-user' : 'ac-bot';
  div.innerHTML = text.replace(/\*\*/g, '').split('\n').join('<br>');
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

async function acReply(el) {
  if (acTyping) return;
  const text = el.textContent;
  document.querySelectorAll('.ac-sugg').forEach(b => b.disabled = true);
  addMsg(text, 'user');
  acTyping = true;
  showTyping();
  const reply = await callKiaAssistant(text);
  removeTyping();
  addMsg(reply, 'bot');
  acTyping = false;
}

async function acSend() {
  if (acTyping) return;
  const input = document.getElementById('acInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  addMsg(text, 'user');
  acTyping = true;
  showTyping();
  const reply = await callKiaAssistant(text);
  removeTyping();
  addMsg(reply, 'bot');
  acTyping = false;
}
</script>
<script src="/dealer-chat-es.js"></script>
</body>
</html>
`;