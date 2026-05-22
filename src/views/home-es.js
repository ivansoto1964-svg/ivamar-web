module.exports = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,400;1,400&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'Plus Jakarta Sans',sans-serif;background:#ffffff;color:#1a1a2e;overflow-x:hidden;}

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

.btn-primary{display:inline-flex;align-items:center;gap:0.5rem;background:#1a1a2e;color:#fff;padding:0.9rem 2rem;border-radius:10px;font-size:0.9rem;font-weight:700;text-decoration:none;transition:all 0.2s;}
.btn-primary:hover{background:#00C896;transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,200,150,0.3);}
.btn-ghost{display:inline-flex;align-items:center;gap:0.5rem;border:2px solid #e5e7eb;color:#1a1a2e;padding:0.9rem 2rem;border-radius:10px;font-size:0.9rem;font-weight:600;text-decoration:none;transition:all 0.2s;}
.btn-ghost:hover{border-color:#1a1a2e;}
.btn-green{display:inline-flex;align-items:center;gap:0.5rem;background:#00C896;color:#fff;padding:0.9rem 2rem;border-radius:10px;font-size:0.9rem;font-weight:700;text-decoration:none;transition:all 0.2s;}
.btn-green:hover{background:#00a87a;transform:translateY(-2px);}

.section-tag{font-size:0.72rem;font-weight:700;color:#00C896;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.8rem;}
.section-title{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:800;letter-spacing:-0.03em;color:#1a1a2e;margin-bottom:0.8rem;line-height:1.2;}
.section-title em{font-style:italic;color:#00C896;font-family:'Lora',serif;}
.section-sub{font-size:0.95rem;color:#666;line-height:1.8;max-width:520px;margin-bottom:3rem;}

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

.problem{padding:4rem 2rem;background:#fff8f0;border-top:1px solid #ffe4cc;border-bottom:1px solid #ffe4cc;}
.problem-inner{max-width:1100px;margin:0 auto;text-align:center;}
.problem-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;margin-top:3rem;}
.stat-card{background:#fff;border-radius:16px;padding:2rem;border:1px solid #ffe4cc;text-align:center;}
.stat-num{font-size:2.8rem;font-weight:800;color:#ff6b35;letter-spacing:-0.04em;line-height:1;}
.stat-label{font-size:0.85rem;color:#666;margin-top:0.5rem;line-height:1.5;}

.how{padding:5rem 2rem;background:#f8f9fa;}
.how-inner{max-width:1100px;margin:0 auto;}
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;}
.step{background:#fff;border-radius:16px;padding:1.8rem;border:1px solid #f0f0f0;transition:all 0.25s;position:relative;}
.step:hover{border-color:#00C896;transform:translateY(-3px);box-shadow:0 12px 32px rgba(0,200,150,0.08);}
.step-num{width:40px;height:40px;background:#f0fdf9;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;margin-bottom:1rem;}
.step h3{font-size:0.95rem;font-weight:700;margin-bottom:0.5rem;color:#1a1a2e;}
.step p{font-size:0.8rem;color:#888;line-height:1.6;}
.step-arrow{position:absolute;right:-16px;top:50%;transform:translateY(-50%);color:#e5e7eb;font-size:1.2rem;z-index:1;}

.for-section{padding:5rem 2rem;max-width:1100px;margin:0 auto;}
.biz-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:1rem;margin-top:3rem;}
.biz-card{background:#fff;border:1px solid #f0f0f0;border-radius:14px;padding:1.5rem 1rem;text-align:center;transition:all 0.25s;}
.biz-card:hover{border-color:#00C896;transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,200,150,0.08);}
.biz-icon{font-size:2rem;margin-bottom:0.7rem;}
.biz-name{font-size:0.82rem;font-weight:700;color:#1a1a2e;}

.features-section{padding:5rem 2rem;background:#f8f9fa;}
.features-inner{max-width:1100px;margin:0 auto;}
.features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:3rem;}
.feat-card{background:#fff;border:1px solid #f0f0f0;border-radius:16px;padding:2rem;transition:all 0.25s;}
.feat-card:hover{border-color:#00C896;transform:translateY(-3px);}
.feat-icon{font-size:2rem;margin-bottom:1rem;}
.feat-card h3{font-size:1rem;font-weight:700;margin-bottom:0.5rem;color:#1a1a2e;}
.feat-card p{font-size:0.82rem;color:#666;line-height:1.6;}
.feat-tag{display:inline-block;font-size:0.65rem;font-weight:700;color:#00C896;background:#f0fdf9;border:1px solid #a7f3d0;padding:0.2rem 0.6rem;border-radius:20px;margin-top:0.8rem;letter-spacing:0.05em;text-transform:uppercase;}

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

.cta-final{padding:5rem 2rem;text-align:center;background:#1a1a2e;}
.cta-final h2{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:800;color:#fff;letter-spacing:-0.03em;margin-bottom:1rem;}
.cta-final h2 em{font-style:italic;color:#00C896;font-family:'Lora',serif;}
.cta-final p{font-size:0.95rem;color:rgba(255,255,255,0.6);margin-bottom:2rem;}

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
.price-strip{padding:3rem 1.2rem;}
.price-cards{grid-template-columns:1fr;}
.iva-section{padding:3rem 1.2rem;}
.iva-inner{grid-template-columns:1fr;gap:2rem;}
footer{padding:2rem 1.2rem;flex-direction:column;text-align:center;}
}
</style>

<nav>
  <a href="/" class="nav-logo">
    <div class="nav-logo-mark">AI</div>
    <span class="nav-logo-text">Ivamar <span>AI</span></span>
  </a>
  <div class="nav-links">
    <a href="#como">Cómo Funciona</a>
    <a href="#para-quien">Para Quién</a>
    <a href="#precios">Precios</a>
    <a href="#iva">Conoce IvA</a>
    <a href="/cotizar" class="nav-cta">Comenzar →</a>
  </div>
</nav>

<section class="hero">
  <div>
    <div class="hero-badge">
      <div class="hero-badge-dot"></div>
      <span class="hero-badge-text">Asistentes IA para Negocios Locales</span>
    </div>
    <h1>Creamos Asistentes IA<br>para <em>Tu Negocio.</em></h1>
    <p class="hero-sub">Un asistente inteligente con tu nombre, tu personalidad, tu idioma — disponible 24/7 a través de un simple link o código QR. Tus clientes obtienen respuestas al instante. Tú capturas más leads automáticamente.</p>
    <div class="hero-btns">
      <a href="#precios" class="btn-primary">Ver Precios →</a>
      <a href="#como" class="btn-ghost">Cómo Funciona</a>
    </div>
    <div class="hero-trust">
      <div class="trust-item"><span class="trust-icon">✦</span> Trabaja 24/7</div>
      <div class="trust-item"><span class="trust-icon">✦</span> Cualquier idioma</div>
      <div class="trust-item"><span class="trust-icon">✦</span> Sin contratos</div>
      <div class="trust-item"><span class="trust-icon">✦</span> Listo en 48hrs</div>
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
        <div class="m-msg m-bot">¡Hola! 👋 Bienvenido a Zoey's Pasta. Soy Zoey. ¿En qué puedo ayudarte hoy?</div>
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
        <div class="qr-text">Comparte por QR o Link</div>
        <div class="qr-sub">Funciona en cualquier dispositivo</div>
      </div>
    </div>
  </div>
</section>

<section class="problem">
  <div class="problem-inner">
    <div class="section-tag">El Problema</div>
    <h2 class="section-title">Cada Mensaje Sin Respuesta<br>Es un <em>Cliente Perdido.</em></h2>
    <p class="section-sub" style="margin:0 auto 1rem;">Los clientes esperan respuestas inmediatas — de día o de noche. Si no respondes a tiempo, se van a la competencia.</p>
    <div class="problem-stats">
      <div class="stat-card">
        <div class="stat-num">78%</div>
        <div class="stat-label">de los clientes compran con el negocio que responde primero</div>
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

<section class="how" id="como">
  <div class="how-inner">
    <div class="section-tag">Proceso Simple</div>
    <h2 class="section-title">Cómo <em>Funciona</em></h2>
    <p class="section-sub">Cuatro pasos simples — sin conocimientos técnicos.</p>
    <div class="steps">
      <div class="step">
        <div class="step-num">🎯</div>
        <h3>Creamos tu Asistente</h3>
        <p>Entrenamos tu asistente con la info de tu negocio, servicios, precios, horarios y personalidad.</p>
        <div class="step-arrow">›</div>
      </div>
      <div class="step">
        <div class="step-num">🔗</div>
        <h3>Recibes tu Link y QR</h3>
        <p>Compártelo en tus flyers, redes sociales, web, rótulos o bio de WhatsApp.</p>
        <div class="step-arrow">›</div>
      </div>
      <div class="step">
        <div class="step-num">💬</div>
        <h3>Clientes Chatean al Instante</h3>
        <p>Tu asistente responde naturalmente 24/7 — contestando preguntas, guiando y capturando leads.</p>
        <div class="step-arrow">›</div>
      </div>
      <div class="step">
        <div class="step-num">📲</div>
        <h3>Recibes los Leads</h3>
        <p>Cada consulta es capturada y enviada a ti — lista para dar seguimiento cuando quieras.</p>
      </div>
    </div>
  </div>
</section>

<section class="for-section" id="para-quien">
  <div class="section-tag">Industrias</div>
  <h2 class="section-title">Perfecto <em>Para</em></h2>
  <p class="section-sub">Cualquier negocio local que quiera responder más rápido y capturar más leads automáticamente.</p>
  <div class="biz-grid">
    <div class="biz-card"><div class="biz-icon">🏠</div><div class="biz-name">Realtors</div></div>
    <div class="biz-card"><div class="biz-icon">🍽️</div><div class="biz-name">Restaurantes</div></div>
    <div class="biz-card"><div class="biz-icon">🚚</div><div class="biz-name">Food Trucks</div></div>
    <div class="biz-card"><div class="biz-icon">🔨</div><div class="biz-name">Contractors</div></div>
    <div class="biz-card"><div class="biz-icon">⚖️</div><div class="biz-name">Bufetes</div></div>
    <div class="biz-card"><div class="biz-icon">🏥</div><div class="biz-name">Clínicas</div></div>
    <div class="biz-card"><div class="biz-icon">💅</div><div class="biz-name">Salones & Spas</div></div>
    <div class="biz-card"><div class="biz-icon">🚗</div><div class="biz-name">Dealers</div></div>
    <div class="biz-card"><div class="biz-icon">❄️</div><div class="biz-name">AC & HVAC</div></div>
    <div class="biz-card"><div class="biz-icon">💰</div><div class="biz-name">Financieras</div></div>
    <div class="biz-card"><div class="biz-icon">🐾</div><div class="biz-name">Pet Shops</div></div>
    <div class="biz-card"><div class="biz-icon">✨</div><div class="biz-name">Cualquier Negocio</div></div>
  </div>
</section>

<section class="features-section">
  <div class="features-inner">
    <div class="section-tag">Qué Incluye</div>
    <h2 class="section-title">Todo Lo Que Tu Asistente <em>Puede Hacer</em></h2>
    <p class="section-sub">Tu asistente está completamente entrenado en tu negocio y listo para trabajar desde el primer día.</p>
    <div class="features-grid">
      <div class="feat-card">
        <div class="feat-icon">💬</div>
        <h3>Responde Preguntas 24/7</h3>
        <p>Responde a preguntas de clientes sobre tus servicios, precios, horarios y disponibilidad — al instante, a cualquier hora.</p>
        <span class="feat-tag">Siempre Activo</span>
      </div>
      <div class="feat-card">
        <div class="feat-icon">🌍</div>
        <h3>Cualquier Idioma</h3>
        <p>Responde automáticamente en español, inglés, portugués, francés o cualquier idioma en que escriba tu cliente.</p>
        <span class="feat-tag">Multiidioma</span>
      </div>
      <div class="feat-card">
        <div class="feat-icon">📲</div>
        <h3>Captura Leads Automáticamente</h3>
        <p>Pide nombre, teléfono y email de forma natural durante la conversación. Cada lead te llega al instante.</p>
        <span class="feat-tag">Generación de Leads</span>
      </div>
      <div class="feat-card">
        <div class="feat-icon">🔗</div>
        <h3>Funciona en Cualquier Lugar</h3>
        <p>Comparte por link, QR, web, bio de Instagram, Facebook o WhatsApp. Un asistente, en todos lados.</p>
        <span class="feat-tag">Multi-Canal</span>
      </div>
      <div class="feat-card">
        <div class="feat-icon">🎭</div>
        <h3>Tu Nombre y Personalidad</h3>
        <p>Tu asistente lleva el nombre y el estilo que elijas. Los clientes interactúan con tu marca, no con un bot genérico.</p>
        <span class="feat-tag">100% Personalizado</span>
      </div>
      <div class="feat-card">
        <div class="feat-icon">⚡</div>
        <h3>Listo en 48 Horas</h3>
        <p>Envíanos la info de tu negocio y nosotros construimos, entrenamos y lanzamos tu asistente en 48 horas.</p>
        <span class="feat-tag">Setup Rápido</span>
      </div>
    </div>
  </div>
</section>

<section class="price-strip" id="precios">
  <div class="section-tag">Precios Simples</div>
  <h2 class="section-title">Precios <em>Transparentes</em></h2>
  <p class="section-sub" style="margin:0 auto 1rem;">Sin cargos escondidos. Sin contratos. Cancela cuando quieras.</p>
  <div class="price-cards">
    <div class="p-card">
      <div class="p-name">Starter</div>
      <div class="p-price">$29<span>/mes</span></div>
      <div class="p-setup">+ $125 setup único</div>
      <ul class="p-features">
        <li>Asistente IA para tu negocio</li>
        <li>Español e inglés</li>
        <li>Link directo + código QR</li>
        <li>Integración web</li>
        <li>Captura de leads</li>
        <li>Soporte por email</li>
      </ul>
      <button class="p-btn" onclick="window.location.href='/cotizar'">Comenzar →</button>
    </div>
    <div class="p-card featured">
      <div class="p-name">Growth</div>
      <div class="p-price">$49<span>/mes</span></div>
      <div class="p-setup">+ $125 setup único</div>
      <ul class="p-features">
        <li>Todo lo del Starter</li>
        <li>Integración WhatsApp</li>
        <li>Entrenamiento avanzado</li>
        <li>Mayor capacidad de uso</li>
        <li>Captura de leads avanzada</li>
        <li>Soporte prioritario</li>
      </ul>
      <button class="p-btn" onclick="window.location.href='/cotizar'">Comenzar →</button>
    </div>
    <div class="p-card">
      <div class="p-name">Premium</div>
      <div class="p-price" style="font-size:1.6rem;">Custom</div>
      <div class="p-setup">Según tus necesidades</div>
      <ul class="p-features">
        <li>Bufetes y clínicas</li>
        <li>Servicios financieros</li>
        <li>Hoteles y cadenas</li>
        <li>Integraciones avanzadas</li>
        <li>Flujos personalizados</li>
        <li>Onboarding premium</li>
      </ul>
      <button class="p-btn" onclick="window.open('https://wa.me/18635216708','_blank')">Contáctanos →</button>
    </div>
  </div>
</section>

<section class="iva-section" id="iva">
  <div class="iva-inner">
    <div>
      <div class="iva-tag">Conoce a IvA</div>
      <h2 class="iva-title">Esta es <em>IvA</em> 👋</h2>
      <p class="iva-sub">IvA es el asistente de IA creado por Ivamar AI. Habla con ella aquí mismo — así funcionaría el asistente de tu negocio.</p>
      <div class="iva-note">
        <strong>💡 Tu asistente funcionaría igual que IvA</strong> — pero con el nombre de tu negocio, tus servicios, tu personalidad y el nombre que tú elijas. Puede ser "Zoey", "LexIA", "Max" — lo que quieras.
      </div>
      <ul class="iva-features">
        <li>Entrenado específicamente en tu negocio</li>
        <li>Responde naturalmente como una persona real</li>
        <li>Disponible 24/7 sin que tengas que hacer nada</li>
        <li>Habla cualquier idioma automáticamente</li>
        <li>Captura leads y te los envía automáticamente</li>
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
        <div class="iv-msg iv-bot">¡Hola! 👋 Soy IvA, el asistente de Ivamar AI.<br><br>Estoy aquí para mostrarte cómo un asistente IA puede trabajar para tu negocio. ¿Qué tipo de negocio tienes? 😊</div>
      </div>
      <div class="iva-suggs">
        <button class="iva-sugg" onclick="ivaReply(this)">Soy realtor</button>
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

<section class="cta-final">
  <h2>¿Listo para Dejar de <em>Perder Leads?</em></h2>
  <p>Tu asistente listo en 48 horas. Sin contratos. Cancela cuando quieras.</p>
  <a href="/cotizar" class="btn-green">Comenzar Hoy →</a>
</section>

<footer>
  <div>
    <div class="footer-brand">Ivamar <span>AI</span> LLC</div>
    <div style="font-size:0.72rem;color:#bbb;margin-top:0.2rem;">Delaware, USA · ivamarai.com</div>
  </div>
  <div class="footer-links">
    <a href="/sobre-nosotros">Nosotros</a>
    <a href="/privacidad">Privacidad</a>
    <a href="/terminos">Términos</a>
    <a href="/contacto">Contacto</a>
    <a href="/en">English</a>
  </div>
  <div class="footer-copy">© 2025 Ivamar AI LLC · Todos los derechos reservados</div>
</footer>

<script>
let ivaHistory = [];
let ivaTyping = false;

async function callIvA(message) {
  try {
    const response = await fetch('/api/iva-sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history: ivaHistory, lang: 'es', context: {} })
    });
    const data = await response.json();
    const reply = data.reply || 'Disculpa, tuve un problema técnico. Por favor escríbenos directamente.';
    ivaHistory.push({ role: 'user', content: message });
    ivaHistory.push({ role: 'assistant', content: reply });
    if (ivaHistory.length > 20) ivaHistory = ivaHistory.slice(-20);
    return reply;
  } catch(e) { return 'Disculpa, tuve un problema técnico. Por favor escríbenos directamente.'; }
}

function showTyping() {
  const msgs = document.getElementById('ivaMsgs');
  const div = document.createElement('div');
  div.className = 'iv-msg iv-bot';
  div.id = 'ivaTypingIndicator';
  div.innerHTML = '<span style="opacity:0.5">IvA está escribiendo...</span>';
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function removeTyping() {
  const el = document.getElementById('ivaTypingIndicator');
  if (el) el.remove();
}

function addMsg(text, type) {
  const msgs = document.getElementById('ivaMsgs');
  const div = document.createElement('div');
  div.className = 'iv-msg iv-' + type;
  div.innerHTML = text.split('\n').join('<br>');
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

async function ivaReply(el) {
  if (ivaTyping) return;
  const text = el.textContent;
  document.querySelectorAll('.iva-sugg').forEach(b => b.disabled = true);
  addMsg(text, 'user');
  ivaTyping = true;
  showTyping();
  const reply = await callIvA(text);
  removeTyping();
  addMsg(reply, 'bot');
  ivaTyping = false;
}

async function ivaSend() {
  if (ivaTyping) return;
  const input = document.getElementById('ivaInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  addMsg(text, 'user');
  ivaTyping = true;
  showTyping();
  const reply = await callIvA(text);
  removeTyping();
  addMsg(reply, 'bot');
  ivaTyping = false;
}
</script>
`;
