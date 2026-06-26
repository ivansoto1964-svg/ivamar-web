module.exports = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,400;1,400&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'Plus Jakarta Sans',sans-serif;background:#ffffff;color:#1a1a2e;overflow-x:hidden;}

/* NAV */
nav{position:sticky;top:0;z-index:100;background:rgba(255,255,255,0.95);backdrop-filter:blur(12px);border-bottom:1px solid #f0f0f0;padding:1rem 2rem;display:flex;align-items:center;justify-content:space-between;}
.nav-logo{display:flex;align-items:center;gap:0.5rem;text-decoration:none;}
.nav-logo-mark{width:32px;height:32px;background:#00C896;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:800;color:#fff;}
.nav-logo-text{font-size:1.1rem;font-weight:700;color:#1a1a2e;letter-spacing:-0.02em;}
.nav-logo-text span{color:#00C896;}
.nav-links{display:flex;align-items:center;gap:2rem;}
.nav-links a{font-size:0.85rem;color:#666;text-decoration:none;transition:color 0.2s;}
.nav-links a:hover{color:#1a1a2e;}
.nav-cta{background:#1a1a2e;color:#fff!important;padding:0.6rem 1.4rem;border-radius:8px;font-weight:600;font-size:0.82rem!important;transition:all 0.2s!important;}
.nav-cta:hover{background:#00C896!important;transform:translateY(-1px);}

/* BUTTONS */
.btn-primary{display:inline-flex;align-items:center;gap:0.5rem;background:#1a1a2e;color:#fff;padding:0.9rem 2rem;border-radius:10px;font-size:0.9rem;font-weight:700;text-decoration:none;transition:all 0.2s;}
.btn-primary:hover{background:#00C896;transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,200,150,0.3);}
.btn-ghost{display:inline-flex;align-items:center;gap:0.5rem;border:2px solid #e5e7eb;color:#1a1a2e;padding:0.9rem 2rem;border-radius:10px;font-size:0.9rem;font-weight:600;text-decoration:none;transition:all 0.2s;}
.btn-ghost:hover{border-color:#1a1a2e;}
.btn-green{display:inline-flex;align-items:center;gap:0.5rem;background:#00C896;color:#fff;padding:0.9rem 2rem;border-radius:10px;font-size:0.9rem;font-weight:700;text-decoration:none;transition:all 0.2s;}
.btn-green:hover{background:#00a87a;transform:translateY(-2px);}

/* SECTION LABELS */
.section-tag{font-size:0.72rem;font-weight:700;color:#00C896;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.8rem;}
.section-title{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:800;letter-spacing:-0.03em;color:#1a1a2e;margin-bottom:0.8rem;line-height:1.2;}
.section-title em{font-style:italic;color:#00C896;font-family:'Lora',serif;}
.section-sub{font-size:0.95rem;color:#666;line-height:1.8;max-width:520px;margin-bottom:3rem;}

/* HERO */
.hero{padding:5rem 2rem 4rem;max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1.1fr 0.9fr;gap:4rem;align-items:center;}
.hero-badge{display:inline-flex;align-items:center;gap:0.5rem;background:#f0fdf9;border:1px solid #a7f3d0;padding:0.35rem 1rem;border-radius:30px;margin-bottom:1.5rem;}
.hero-badge-dot{width:6px;height:6px;background:#00C896;border-radius:50%;animation:pulse 2s infinite;}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
.hero-badge-text{font-size:0.72rem;color:#059669;font-weight:600;letter-spacing:0.05em;}
.hero h1{font-size:clamp(2.2rem,4.5vw,3.4rem);font-weight:800;line-height:1.15;letter-spacing:-0.03em;color:#1a1a2e;margin-bottom:1.2rem;}
.hero h1 em{font-style:italic;color:#00C896;font-family:'Lora',serif;}
.hero-sub{font-size:1.05rem;color:#555;line-height:1.8;margin-bottom:2rem;max-width:480px;}
.hero-btns{display:flex;gap:0.8rem;flex-wrap:wrap;margin-bottom:2rem;}
.hero-trust{display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap;}
.trust-item{display:flex;align-items:center;gap:0.4rem;font-size:0.78rem;color:#888;}
.trust-icon{color:#00C896;}
.hero-visual{position:relative;}
.chat-mockup{background:#fff;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,0.08),0 0 0 1px rgba(0,0,0,0.04);overflow:hidden;}
.mockup-header{background:#f8f9fa;padding:1rem 1.2rem;border-bottom:1px solid #f0f0f0;display:flex;align-items:center;gap:0.8rem;}
.mockup-avatar{width:36px;height:36px;background:linear-gradient(135deg,#00C896,#0088CC);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;}
.mockup-name{font-size:0.85rem;font-weight:700;color:#1a1a2e;}
.mockup-status{font-size:0.65rem;color:#00C896;font-weight:500;}
.mockup-msgs{padding:1.2rem;display:flex;flex-direction:column;gap:0.8rem;}
.m-msg{max-width:85%;padding:0.75rem 1rem;border-radius:4px 14px 14px 14px;font-size:0.82rem;line-height:1.6;}
.m-bot{background:#f8f9fa;color:#1a1a2e;align-self:flex-start;}
.m-user{background:#1a1a2e;color:#fff;align-self:flex-end;border-radius:14px 4px 14px 14px;}
.mockup-footer{padding:0.8rem 1.2rem;border-top:1px solid #f0f0f0;display:flex;gap:0.5rem;}
.mockup-input{flex:1;background:#f8f9fa;border:none;border-radius:8px;padding:0.6rem 0.9rem;font-size:0.78rem;color:#666;outline:none;}
.mockup-send{background:#00C896;border:none;border-radius:8px;width:34px;height:34px;cursor:pointer;font-size:0.9rem;}
.qr-badge{position:absolute;bottom:-16px;right:-16px;background:#fff;border-radius:14px;padding:0.8rem 1rem;box-shadow:0 8px 24px rgba(0,0,0,0.1);display:flex;align-items:center;gap:0.6rem;}
.qr-icon{font-size:1.8rem;}
.qr-text{font-size:0.72rem;font-weight:600;color:#1a1a2e;line-height:1.3;}
.qr-sub{font-size:0.65rem;color:#888;}

/* PROBLEM SECTION */
.problem{padding:4rem 2rem;background:#fff8f0;border-top:1px solid #ffe4cc;border-bottom:1px solid #ffe4cc;}
.problem-inner{max-width:1100px;margin:0 auto;text-align:center;}
.problem-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;margin-top:3rem;}
.stat-card{background:#fff;border-radius:16px;padding:2rem;border:1px solid #ffe4cc;text-align:center;}
.stat-num{font-size:2.8rem;font-weight:800;color:#ff6b35;letter-spacing:-0.04em;line-height:1;}
.stat-label{font-size:0.85rem;color:#666;margin-top:0.5rem;line-height:1.5;}

/* HOW IT WORKS */
.how{padding:5rem 2rem;background:#f8f9fa;}
.how-inner{max-width:1100px;margin:0 auto;}
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;}
.step{background:#fff;border-radius:16px;padding:1.8rem;border:1px solid #f0f0f0;transition:all 0.25s;position:relative;}
.step:hover{border-color:#00C896;transform:translateY(-3px);box-shadow:0 12px 32px rgba(0,200,150,0.08);}
.step-num{width:40px;height:40px;background:#f0fdf9;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;margin-bottom:1rem;}
.step h3{font-size:0.95rem;font-weight:700;margin-bottom:0.5rem;color:#1a1a2e;}
.step p{font-size:0.8rem;color:#888;line-height:1.6;}
.step-arrow{position:absolute;right:-16px;top:50%;transform:translateY(-50%);color:#e5e7eb;font-size:1.2rem;z-index:1;}

/* PERFECT FOR */
.for-section{padding:5rem 2rem;max-width:1100px;margin:0 auto;}
.biz-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:1rem;margin-top:3rem;}
.biz-card{background:#fff;border:1px solid #f0f0f0;border-radius:14px;padding:1.5rem 1rem;text-align:center;transition:all 0.25s;}
.biz-card:hover{border-color:#00C896;transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,200,150,0.08);}
.biz-icon{font-size:2rem;margin-bottom:0.7rem;}
.biz-name{font-size:0.82rem;font-weight:700;color:#1a1a2e;}

/* FEATURES */
.features-section{padding:5rem 2rem;background:#f8f9fa;}
.features-inner{max-width:1100px;margin:0 auto;}
.features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:3rem;}
.feat-card{background:#fff;border:1px solid #f0f0f0;border-radius:16px;padding:2rem;transition:all 0.25s;}
.feat-card:hover{border-color:#00C896;transform:translateY(-3px);}
.feat-icon{font-size:2rem;margin-bottom:1rem;}
.feat-card h3{font-size:1rem;font-weight:700;margin-bottom:0.5rem;color:#1a1a2e;}
.feat-card p{font-size:0.82rem;color:#666;line-height:1.6;}
.feat-tag{display:inline-block;font-size:0.65rem;font-weight:700;color:#00C896;background:#f0fdf9;border:1px solid #a7f3d0;padding:0.2rem 0.6rem;border-radius:20px;margin-top:0.8rem;letter-spacing:0.05em;text-transform:uppercase;}

/* PLATFORMS SECTION */
.platforms-section{padding:5rem 2rem;background:#fff;}
.platforms-inner{max-width:1100px;margin:0 auto;}
.platforms-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;margin-top:3rem;}
.platform-card{border:1px solid #f0f0f0;border-radius:20px;padding:2rem;transition:all 0.25s;text-decoration:none;color:inherit;display:flex;flex-direction:column;gap:1rem;position:relative;overflow:hidden;}
.platform-card:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,0.08);border-color:#00C896;}
.platform-card-icon{font-size:2.4rem;}
.platform-card-tag{font-size:0.65rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#00C896;}
.platform-card h3{font-size:1.1rem;font-weight:800;color:#1a1a2e;letter-spacing:-0.02em;}
.platform-card p{font-size:0.82rem;color:#666;line-height:1.6;flex:1;}
.platform-card-link{font-size:0.78rem;font-weight:700;color:#00C896;display:flex;align-items:center;gap:0.3rem;}
.platform-card-url{font-size:0.7rem;color:#bbb;margin-top:0.2rem;}

/* PRICING */
.price-strip{padding:5rem 2rem;max-width:1100px;margin:0 auto;text-align:center;}
.price-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:3rem;}
.p-card{background:#fff;border:1px solid #f0f0f0;border-radius:16px;padding:2rem;text-align:left;transition:all 0.25s;position:relative;overflow:hidden;}
.p-card:hover{transform:translateY(-3px);box-shadow:0 12px 32px rgba(0,0,0,0.06);}
.p-card.featured{border-color:#00C896;box-shadow:0 0 0 1px #00C896;}
.p-card.featured::before{content:'Más Popular';position:absolute;top:0;right:0;background:#00C896;color:#fff;font-size:0.62rem;font-weight:700;padding:0.25rem 0.8rem;border-radius:0 14px 0 8px;}
.p-name{font-size:0.7rem;font-weight:700;color:#00C896;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.8rem;}
.p-price{font-size:2.2rem;font-weight:800;color:#1a1a2e;letter-spacing:-0.04em;line-height:1;margin-bottom:0.2rem;}
.p-price span{font-size:0.9rem;font-weight:400;color:#888;}
.p-setup{font-size:0.72rem;color:#888;margin-bottom:1.2rem;}
.p-features{list-style:none;display:flex;flex-direction:column;gap:0.5rem;margin-bottom:1.5rem;}
.p-features li{font-size:0.78rem;color:#555;display:flex;align-items:flex-start;gap:0.5rem;}
.p-features li::before{content:'✓';color:#00C896;font-weight:700;flex-shrink:0;}
.p-btn{width:100%;background:#1a1a2e;color:#fff;border:none;padding:0.8rem;border-radius:8px;font-size:0.82rem;font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;transition:all 0.2s;}
.p-btn:hover{background:#00C896;}
.p-card.featured .p-btn{background:#00C896;}
.p-card.featured .p-btn:hover{background:#00a87a;}

/* MEET IVA */
.iva-section{padding:5rem 2rem;background:#f0fdf9;border-top:1px solid #a7f3d0;border-bottom:1px solid #a7f3d0;}
.iva-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;}
.iva-tag{font-size:0.72rem;font-weight:700;color:#00C896;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.8rem;}
.iva-title{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:800;letter-spacing:-0.03em;color:#1a1a2e;margin-bottom:1rem;line-height:1.2;}
.iva-title em{font-style:italic;color:#00C896;font-family:'Lora',serif;}
.iva-sub{font-size:0.95rem;color:#555;line-height:1.8;margin-bottom:1.5rem;}
.iva-features{list-style:none;display:flex;flex-direction:column;gap:0.8rem;margin-bottom:2rem;}
.iva-features li{display:flex;align-items:flex-start;gap:0.7rem;font-size:0.85rem;color:#555;}
.iva-features li::before{content:'✦';color:#00C896;flex-shrink:0;font-size:0.7rem;margin-top:3px;}
.iva-note{background:#fff;border:1px solid #a7f3d0;border-radius:12px;padding:1rem 1.2rem;font-size:0.82rem;color:#555;line-height:1.6;margin-bottom:1.5rem;}
.iva-note strong{color:#1a1a2e;}
.iva-chat{background:#fff;border:1px solid #e5e7eb;border-radius:20px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.06);}
.iva-chat-header{padding:1rem 1.2rem;background:#f0fdf9;border-bottom:1px solid #a7f3d0;display:flex;align-items:center;gap:0.8rem;}
.iva-avatar{width:36px;height:36px;background:linear-gradient(135deg,#00C896,#0088CC);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1rem;}
.iva-name{font-size:0.85rem;font-weight:700;color:#1a1a2e;}
.iva-online{font-size:0.65rem;color:#00C896;}
.iva-msgs{padding:1.2rem;display:flex;flex-direction:column;gap:0.8rem;min-height:180px;}
.iv-msg{max-width:85%;padding:0.75rem 1rem;font-size:0.82rem;line-height:1.6;border-radius:4px 12px 12px 12px;}
.iv-bot{background:#f8f9fa;border:1px solid #f0f0f0;color:#1a1a2e;align-self:flex-start;}
.iv-user{background:#1a1a2e;color:#fff;border-radius:12px 4px 12px 12px;align-self:flex-end;}
.iva-suggs{padding:0 1rem 0.8rem;display:flex;flex-wrap:wrap;gap:0.4rem;}
.iva-sugg{font-size:0.7rem;padding:0.3rem 0.7rem;border:1px solid #e5e7eb;border-radius:20px;color:#666;cursor:pointer;transition:all 0.2s;background:transparent;font-family:'Plus Jakarta Sans',sans-serif;}
.iva-sugg:hover{border-color:#00C896;color:#00C896;}
.iva-input-row{padding:0.8rem;border-top:1px solid #f0f0f0;display:flex;gap:0.5rem;}
.iva-input{flex:1;background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:0.6rem 0.9rem;color:#1a1a2e;font-size:0.78rem;outline:none;font-family:'Plus Jakarta Sans',sans-serif;}
.iva-input::placeholder{color:#aaa;}
.iva-send{background:#00C896;border:none;border-radius:8px;width:34px;height:34px;cursor:pointer;font-size:0.85rem;}

/* CTA FINAL */
.cta-final{padding:5rem 2rem;text-align:center;background:#1a1a2e;}
.cta-final h2{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:800;color:#fff;letter-spacing:-0.03em;margin-bottom:1rem;}
.cta-final h2 em{font-style:italic;color:#00C896;font-family:'Lora',serif;}
.cta-final p{font-size:0.95rem;color:rgba(255,255,255,0.6);margin-bottom:2rem;}

/* FOOTER */
footer{padding:2.5rem 2rem;border-top:1px solid #f0f0f0;max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;}
.footer-brand{font-size:0.9rem;font-weight:700;color:#1a1a2e;}
.footer-brand span{color:#00C896;}
.footer-links{display:flex;gap:1.5rem;flex-wrap:wrap;}
.footer-links a{font-size:0.78rem;color:#888;text-decoration:none;transition:color 0.2s;}
.footer-links a:hover{color:#1a1a2e;}
.footer-copy{font-size:0.72rem;color:#bbb;}

@media(max-width:768px){
nav{padding:0.8rem 1rem;}
.nav-links{display:none;}
.hero{grid-template-columns:1fr;gap:2rem;padding:3rem 1.2rem;}
.hero-visual{display:none;}
.problem-stats{grid-template-columns:1fr;}
.how{padding:3rem 1.2rem;}
.steps{grid-template-columns:1fr 1fr;}
.step-arrow{display:none;}
.for-section{padding:3rem 1.2rem;}
.features-section{padding:3rem 1.2rem;}
.features-grid{grid-template-columns:1fr;}
.platforms-section{padding:3rem 1.2rem;}
.platforms-grid{grid-template-columns:1fr;}
.price-strip{padding:3rem 1.2rem;}
.price-cards{grid-template-columns:1fr;}
.iva-section{padding:3rem 1.2rem;}
.iva-inner{grid-template-columns:1fr;gap:2rem;}
footer{padding:2rem 1.2rem;flex-direction:column;text-align:center;}
}
</style>

<!-- NAV -->
<nav>
  <a href="/" class="nav-logo">
    <img src="/ivamar-ai-logo.png" alt="Ivamar AI" style="width:36px;height:36px;object-fit:contain;">
    <span class="nav-logo-text">Ivamar <span>AI</span></span>
  </a>
  <div class="nav-links">
    <a href="#how">Cómo Funciona</a>
    <a href="#for">Para Quién</a>
    <a href="#platforms">Nuestro Trabajo</a>
    <a href="#pricing">Precios</a>
    <a href="#iva">Conoce a IvA</a>
    <a href="/cotizar" class="nav-cta">Comenzar →</a>
  </div>
</nav>

<!-- HERO -->
<section class="hero">
  <div>
    <div class="hero-badge">
      <div class="hero-badge-dot"></div>
      <span class="hero-badge-text">Agencia Digital · IA · Web · Crecimiento</span>
    </div>
    <h1>Construimos Productos<br>Digitales que <em>Funcionan.</em></h1>
    <p class="hero-sub">Desde asistentes de IA hasta plataformas web completas — diseñamos, construimos y hacemos crecer productos digitales para negocios que quieren resultados reales. No solo un sitio web. Un sistema que trabaja por ti las 24 horas.</p>
    <div class="hero-btns">
      <a href="#pricing" class="btn-primary">Ver Precios →</a>
      <a href="#platforms" class="btn-ghost">Nuestro Trabajo</a>
    </div>
    <div class="hero-trust">
      <div class="trust-item"><span class="trust-icon">✦</span> Asistentes IA</div>
      <div class="trust-item"><span class="trust-icon">✦</span> Plataformas Web</div>
      <div class="trust-item"><span class="trust-icon">✦</span> Cualquier idioma</div>
      <div class="trust-item"><span class="trust-icon">✦</span> Entrega rápida</div>
    </div>
  </div>
  <div class="hero-visual">
    <div class="chat-mockup">
      <div class="mockup-header">
        <div class="mockup-avatar">🤖</div>
        <div>
          <div class="mockup-name">Zoey — Zoey's Pasta on the Go</div>
          <div class="mockup-status">● En línea · Responde al instante</div>
        </div>
      </div>
      <div class="mockup-msgs">
        <div class="m-msg m-bot">¡Hola! 👋 Bienvenido a Zoey's Pasta. ¡Soy Zoey! ¿En qué te puedo ayudar hoy?</div>
        <div class="m-msg m-user">¿Tienen opciones sin gluten?</div>
        <div class="m-msg m-bot">¡Sí! 😊 Ofrecemos pasta sin gluten en todos nuestros bowls. El más popular es el Cavatappi con pollo a la parrilla. ¿Quieres ver el menú completo?</div>
      </div>
      <div class="mockup-footer">
        <input class="mockup-input" placeholder="Escribe un mensaje...">
        <button class="mockup-send">➤</button>
      </div>
    </div>
    <div class="qr-badge">
      <div class="qr-icon">📱</div>
      <div>
        <div class="qr-text">Comparte por QR o enlace</div>
        <div class="qr-sub">Funciona en cualquier dispositivo</div>
      </div>
    </div>
  </div>
</section>

<!-- PROBLEM -->
<section class="problem">
  <div class="problem-inner">
    <div class="section-tag">El Problema</div>
    <h2 class="section-title">Cada Mensaje Sin Respuesta<br>Es un <em>Cliente Perdido.</em></h2>
    <p class="section-sub" style="margin:0 auto 1rem;">Los clientes esperan respuestas inmediatas — de día o de noche. Si no respondes a tiempo, se van con la competencia.</p>
    <div class="problem-stats">
      <div class="stat-card">
        <div class="stat-num">78%</div>
        <div class="stat-label">de los clientes compran al negocio que responde primero</div>
      </div>
      <div class="stat-card">
        <div class="stat-num">5min</div>
        <div class="stat-label">es la ventana crítica — después de eso los leads se enfrían rápido</div>
      </div>
      <div class="stat-card">
        <div class="stat-num">24/7</div>
        <div class="stat-label">es cuando tus clientes buscan — incluso a las 2am un domingo</div>
      </div>
    </div>
  </div>
</section>

<!-- HOW IT WORKS -->
<section class="how" id="how">
  <div class="how-inner">
    <div class="section-tag">Proceso Simple</div>
    <h2 class="section-title">Cómo <em>Funciona</em></h2>
    <p class="section-sub">Cuatro pasos simples — sin conocimientos técnicos requeridos.</p>
    <div class="steps">
      <div class="step">
        <div class="step-num">🎯</div>
        <h3>Conocemos Tu Negocio</h3>
        <p>Empezamos con tus objetivos, tu audiencia y tu oferta — luego construimos la solución digital correcta para ti.</p>
        <div class="step-arrow">›</div>
      </div>
      <div class="step">
        <div class="step-num">🔧</div>
        <h3>Lo Construimos</h3>
        <p>Ya sea un asistente de IA, una plataforma web o un producto completo — lo diseñamos y desarrollamos rápido.</p>
        <div class="step-arrow">›</div>
      </div>
      <div class="step">
        <div class="step-num">🚀</div>
        <h3>Lanzamos Juntos</h3>
        <p>Tu producto sale en vivo con un código QR, enlace o dominio propio — listo para compartir y empezar a trabajar.</p>
        <div class="step-arrow">›</div>
      </div>
      <div class="step">
        <div class="step-num">📈</div>
        <h3>Lo Hacemos Crecer</h3>
        <p>Soporte continuo, actualizaciones y estrategia para que tu presencia digital siga dando resultados.</p>
      </div>
    </div>
  </div>
</section>

<!-- PERFECT FOR -->
<section class="for-section" id="for">
  <div class="section-tag">Industrias</div>
  <h2 class="section-title">Perfecto <em>Para</em></h2>
  <p class="section-sub">Cualquier negocio que quiera crecer en línea, responder más rápido y capturar más clientes automáticamente.</p>
  <div class="biz-grid">
    <div class="biz-card"><div class="biz-icon">🏠</div><div class="biz-name">Bienes Raíces</div></div>
    <div class="biz-card"><div class="biz-icon">🍽️</div><div class="biz-name">Restaurantes</div></div>
    <div class="biz-card"><div class="biz-icon">🚚</div><div class="biz-name">Food Trucks</div></div>
    <div class="biz-card"><div class="biz-icon">🔨</div><div class="biz-name">Contratistas</div></div>
    <div class="biz-card"><div class="biz-icon">⚖️</div><div class="biz-name">Bufetes de Abogados</div></div>
    <div class="biz-card"><div class="biz-icon">🏥</div><div class="biz-name">Clínicas</div></div>
    <div class="biz-card"><div class="biz-icon">💅</div><div class="biz-name">Salones & Spas</div></div>
    <div class="biz-card"><div class="biz-icon">🚗</div><div class="biz-name">Concesionarios</div></div>
    <div class="biz-card"><div class="biz-icon">❄️</div><div class="biz-name">AC & HVAC</div></div>
    <div class="biz-card"><div class="biz-icon">✈️</div><div class="biz-name">Viajes & Turismo</div></div>
    <div class="biz-card"><div class="biz-icon">🐾</div><div class="biz-name">Tiendas de Mascotas</div></div>
    <div class="biz-card"><div class="biz-icon">✨</div><div class="biz-name">Cualquier Negocio</div></div>
  </div>
</section>

<!-- FEATURES -->
<section class="features-section">
  <div class="features-inner">
    <div class="section-tag">Lo Que Incluye</div>
    <h2 class="section-title">Todo Lo Que <em>Entregamos</em></h2>
    <p class="section-sub">Soluciones digitales completas — desde la estrategia hasta el lanzamiento y el crecimiento.</p>
    <div class="features-grid">
      <div class="feat-card">
        <div class="feat-icon">🤖</div>
        <h3>Asistentes de IA</h3>
        <p>Chatbots de IA personalizados entrenados en tu negocio — respondiendo preguntas, capturando leads y trabajando 24/7 bajo tu marca.</p>
        <span class="feat-tag">Siempre Activo</span>
      </div>
      <div class="feat-card">
        <div class="feat-icon">🌐</div>
        <h3>Plataformas Web</h3>
        <p>Aplicaciones web completas construidas con tecnología moderna — directorios, sistemas de reservas, plataformas de afiliados, portales y más.</p>
        <span class="feat-tag">Hecho a Medida</span>
      </div>
      <div class="feat-card">
        <div class="feat-icon">🌍</div>
        <h3>Multilingüe por Defecto</h3>
        <p>Todo lo que construimos funciona en cualquier idioma — inglés, español, portugués, francés. Tu audiencia, donde sea.</p>
        <span class="feat-tag">Multilingüe</span>
      </div>
      <div class="feat-card">
        <div class="feat-icon">💰</div>
        <h3>Monetización Integrada</h3>
        <p>Pagos con Stripe, enlaces de afiliados, listados destacados, suscripciones — construimos fuentes de ingresos en tu plataforma desde el primer día.</p>
        <span class="feat-tag">Listo para Generar</span>
      </div>
      <div class="feat-card">
        <div class="feat-icon">📲</div>
        <h3>Funciona en Todas Partes</h3>
        <p>Comparte por enlace, código QR, embed, bio de redes sociales o dominio propio. Un producto que llega a clientes en cualquier dispositivo.</p>
        <span class="feat-tag">Multi-Canal</span>
      </div>
      <div class="feat-card">
        <div class="feat-icon">⚡</div>
        <h3>Entrega Rápida</h3>
        <p>Asistentes de IA en 48 horas. Plataformas completas en semanas, no meses. Trabajamos rápido sin recortar calidad.</p>
        <span class="feat-tag">Configuración Rápida</span>
      </div>
    </div>
  </div>
</section>

<!-- OUR PLATFORMS -->
<section class="platforms-section" id="platforms">
  <div class="platforms-inner">
    <div class="section-tag">Nuestro Trabajo</div>
    <h2 class="section-title">Plataformas que Hemos <em>Construido</em></h2>
    <p class="section-sub">No solo construimos para clientes — construimos y operamos nuestras propias plataformas. Esto es de lo que somos capaces.</p>
    <div class="platforms-grid">
      <a href="https://ivamarai.com" target="_blank" class="platform-card">
        <div class="platform-card-icon">🤖</div>
        <div class="platform-card-tag">Asistentes de IA</div>
        <h3>Ivamar AI</h3>
        <p>Nuestro producto principal — asistentes de IA personalizados para negocios locales. Construidos, entrenados y desplegados en 48 horas con captura de leads y soporte multilingüe.</p>
        <div class="platform-card-link">Visitar plataforma →</div>
        <div class="platform-card-url">ivamarai.com</div>
      </a>
      <a href="https://yourcaribbeanexpert.com" target="_blank" class="platform-card">
        <div class="platform-card-icon">🌴</div>
        <div class="platform-card-tag">Plataforma de Viajes</div>
        <h3>Caribex</h3>
        <p>Una plataforma completa de viajes al Caribe con 35 páginas de destinos, un asistente de IA (Sun), integraciones de afiliados, directorio de negocios y newsletter — construida desde cero.</p>
        <div class="platform-card-link">Visitar plataforma →</div>
        <div class="platform-card-url">yourcaribbeanexpert.com</div>
      </a>
      <a href="https://masboricuaqueunmofongo.com" target="_blank" class="platform-card">
        <div class="platform-card-icon">🇵🇷</div>
        <div class="platform-card-tag">Portal Cultural</div>
        <h3>Planeta Boricua</h3>
        <p>Un portal de cultura y comunidad puertorriqueña — contenido, opinión y conexión para una audiencia apasionada. Presencia creciente en TikTok y web.</p>
        <div class="platform-card-link">Visitar plataforma →</div>
        <div class="platform-card-url">masboricuaqueunmofongo.com</div>
      </a>
    </div>
  </div>
</section>

<!-- PRICING -->
<section class="price-strip" id="pricing">
  <div class="section-tag">Precios Simples</div>
  <h2 class="section-title">Precios Claros y <em>Transparentes</em></h2>
  <p class="section-sub" style="margin:0 auto 1rem;">Sin cargos ocultos. Sin contratos. Cancela cuando quieras.</p>
  <div class="price-cards">
    <div class="p-card">
      <div class="p-name">Starter</div>
      <div class="p-price">$29<span>/mes</span></div>
      <div class="p-setup">+ $125 configuración única</div>
      <ul class="p-features">
        <li>Asistente IA para tu negocio</li>
        <li>Inglés y español</li>
        <li>Enlace directo + código QR</li>
        <li>Integración web</li>
        <li>Captura de leads</li>
        <li>Soporte por email</li>
      </ul>
      <button class="p-btn" onclick="window.location.href='/cotizar'">Comenzar →</button>
    </div>
    <div class="p-card featured">
      <div class="p-name">Growth</div>
      <div class="p-price">$49<span>/mes</span></div>
      <div class="p-setup">+ $125 configuración única</div>
      <ul class="p-features">
        <li>Todo lo de Starter</li>
        <li>Integración WhatsApp</li>
        <li>Entrenamiento IA avanzado</li>
        <li>Mayor capacidad de uso</li>
        <li>Captura avanzada de leads</li>
        <li>Soporte prioritario</li>
      </ul>
      <button class="p-btn" onclick="window.location.href='/cotizar'">Comenzar →</button>
    </div>
    <div class="p-card">
      <div class="p-name">Plataforma Personalizada</div>
      <div class="p-price" style="font-size:1.6rem;">Custom</div>
      <div class="p-setup">Según tu proyecto</div>
      <ul class="p-features">
        <li>Construcción de plataforma web</li>
        <li>Integraciones de IA</li>
        <li>Afiliados y pagos</li>
        <li>Flujos personalizados</li>
        <li>Soporte continuo</li>
        <li>Onboarding premium</li>
      </ul>
      <button class="p-btn" onclick="window.open('https://wa.me/18635216708','_blank')">Hablemos →</button>
    </div>
  </div>
</section>

<!-- MEET IVA -->
<section class="iva-section" id="iva">
  <div class="iva-inner">
    <div>
      <div class="iva-tag">Conoce a IvA</div>
      <h2 class="iva-title">Esta es <em>IvA</em> 👋</h2>
      <p class="iva-sub">IvA es la asistente de IA construida por Ivamar AI. Habla con ella aquí mismo — es exactamente cómo se sentiría el asistente de tu negocio.</p>
      <div class="iva-note">
        <strong>💡 Tu asistente funcionaría igual que IvA</strong> — pero con el nombre de tu negocio, tus servicios, tu personalidad y el nombre que elijas. Podría ser "Zoey", "LexIA", "Max" — lo que quieras.
      </div>
      <ul class="iva-features">
        <li>Entrenada en tu negocio específico</li>
        <li>Responde naturalmente como una persona real</li>
        <li>Disponible 24/7 sin que muevas un dedo</li>
        <li>Habla cualquier idioma automáticamente</li>
        <li>Captura leads y te los envía</li>
      </ul>
      <a href="/cotizar" class="btn-green">Obtén Tu Propio Asistente →</a>
    </div>
    <div class="iva-chat">
      <div class="iva-chat-header">
        <div class="iva-avatar">🤖</div>
        <div>
          <div class="iva-name">IvA — Asistente de Ivamar AI</div>
          <div class="iva-online">● En línea · Responde al instante</div>
        </div>
      </div>
      <div class="iva-msgs" id="ivaMsgs">
        <div class="iv-msg iv-bot">¡Hola! 👋 Soy IvA, la asistente creada por Ivamar AI.<br><br>Estoy aquí para mostrarte lo que un asistente de IA puede hacer por tu negocio. ¿Qué tipo de negocio tienes? 😊</div>
      </div>
      <div class="iva-suggs">
        <button class="iva-sugg" onclick="ivaReply(this)">Soy agente de bienes raíces</button>
        <button class="iva-sugg" onclick="ivaReply(this)">Tengo un restaurante</button>
        <button class="iva-sugg" onclick="ivaReply(this)">¿Cuánto cuesta?</button>
      </div>
      <div class="iva-input-row">
        <input class="iva-input" id="ivaInput" placeholder="Cuéntame sobre tu negocio..." onkeydown="if(event.key==='Enter')ivaSend()">
        <button class="iva-send" onclick="ivaSend()">➤</button>
      </div>
    </div>
  </div>
</section>

<!-- CTA FINAL -->
<section class="cta-final">
  <h2>¿Listo para Construir Algo <em>Real?</em></h2>
  <p>Asistente de IA, plataforma web o producto digital completo — hagámoslo realidad.</p>
  <a href="/cotizar" class="btn-green">Inicia Tu Proyecto →</a>
</section>

<!-- FOOTER -->
<footer>
  <div>
    <div class="footer-brand">Ivamar <span>AI</span> LLC</div>
    <div style="font-size:0.72rem;color:#bbb;margin-top:0.2rem;">Delaware, USA · ivamarai.com</div>
  </div>
  <div class="footer-links">
    <a href="/sobre-nosotros">Nosotros</a>
    <a href="/privacy-es">Privacidad</a>
    <a href="/terms-es">Términos</a>
    <a href="/contacto">Contacto</a>
    <a href="/en">English</a>
  </div>
  <div class="footer-copy">© 2026 Ivamar AI LLC · Todos los derechos reservados</div>
</footer>
`;
