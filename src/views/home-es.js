module.exports = `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ivamar AI — Asistente IA para tu Negocio</title>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,400;1,400&display=swap" rel="stylesheet">
<style>
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
.btn-primary{display:inline-flex;align-items:center;gap:0.5rem;background:#1a1a2e;color:#fff;padding:0.9rem 2rem;border-radius:10px;font-size:0.9rem;font-weight:700;text-decoration:none;transition:all 0.2s;}
.btn-primary:hover{background:#00C896;transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,200,150,0.3);}
.btn-ghost{display:inline-flex;align-items:center;gap:0.5rem;border:2px solid #e5e7eb;color:#1a1a2e;padding:0.9rem 2rem;border-radius:10px;font-size:0.9rem;font-weight:600;text-decoration:none;transition:all 0.2s;}
.btn-ghost:hover{border-color:#1a1a2e;}
.hero-trust{display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap;}
.trust-item{display:flex;align-items:center;gap:0.4rem;font-size:0.78rem;color:#888;}
.trust-icon{color:#00C896;}

/* HERO RIGHT - CHAT MOCKUP */
.hero-visual{position:relative;}
.chat-mockup{background:#fff;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,0.08),0 0 0 1px rgba(0,0,0,0.04);overflow:hidden;}
.mockup-header{background:#f8f9fa;padding:1rem 1.2rem;border-bottom:1px solid #f0f0f0;display:flex;align-items:center;gap:0.8rem;}
.mockup-avatar{width:36px;height:36px;background:linear-gradient(135deg,#00C896,#0088CC);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;}
.mockup-name{font-size:0.85rem;font-weight:700;color:#1a1a2e;}
.mockup-status{font-size:0.65rem;color:#00C896;font-weight:500;}
.mockup-msgs{padding:1.2rem;display:flex;flex-direction:column;gap:0.8rem;}
.m-msg{max-width:85%;padding:0.75rem 1rem;border-radius:4px 14px 14px 14px;font-size:0.82rem;line-height:1.6;}
.m-bot{background:#f8f9fa;color:#1a1a2e;align-self:flex-start;border-radius:4px 14px 14px 14px;}
.m-user{background:#1a1a2e;color:#fff;align-self:flex-end;border-radius:14px 4px 14px 14px;}
.mockup-footer{padding:0.8rem 1.2rem;border-top:1px solid #f0f0f0;display:flex;gap:0.5rem;}
.mockup-input{flex:1;background:#f8f9fa;border:none;border-radius:8px;padding:0.6rem 0.9rem;font-size:0.78rem;color:#666;outline:none;}
.mockup-send{background:#00C896;border:none;border-radius:8px;width:34px;height:34px;cursor:pointer;font-size:0.9rem;}

/* QR BADGE */
.qr-badge{position:absolute;bottom:-16px;right:-16px;background:#fff;border-radius:14px;padding:0.8rem 1rem;box-shadow:0 8px 24px rgba(0,0,0,0.1);display:flex;align-items:center;gap:0.6rem;}
.qr-icon{font-size:1.8rem;}
.qr-text{font-size:0.72rem;font-weight:600;color:#1a1a2e;line-height:1.3;}
.qr-sub{font-size:0.65rem;color:#888;}

/* HOW IT WORKS */
.how{padding:5rem 2rem;background:#f8f9fa;}
.how-inner{max-width:1100px;margin:0 auto;}
.section-tag{font-size:0.72rem;font-weight:700;color:#00C896;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.8rem;}
.section-title{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:800;letter-spacing:-0.03em;color:#1a1a2e;margin-bottom:0.8rem;line-height:1.2;}
.section-title em{font-style:italic;color:#00C896;font-family:'Lora',serif;}
.section-sub{font-size:0.95rem;color:#666;line-height:1.8;max-width:500px;margin-bottom:3rem;}
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
.biz-card{background:#fff;border:1px solid #f0f0f0;border-radius:14px;padding:1.5rem 1rem;text-align:center;transition:all 0.25s;cursor:default;}
.biz-card:hover{border-color:#00C896;transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,200,150,0.08);}
.biz-icon{font-size:2rem;margin-bottom:0.7rem;}
.biz-name{font-size:0.82rem;font-weight:700;color:#1a1a2e;}

/* MEET IVA */
.iva-section{padding:5rem 2rem;background:#f0fdf9;border-top:1px solid #a7f3d0;border-bottom:1px solid #a7f3d0;}
.iva-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;}
.iva-tag{font-size:0.72rem;font-weight:700;color:#00C896;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.8rem;}
.iva-title{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:800;letter-spacing:-0.03em;color:#1a1a2e;margin-bottom:1rem;line-height:1.2;}
.iva-sub{font-size:0.95rem;color:#555;line-height:1.8;margin-bottom:1.5rem;}
.iva-features{list-style:none;display:flex;flex-direction:column;gap:0.8rem;margin-bottom:2rem;}
.iva-features li{display:flex;align-items:flex-start;gap:0.7rem;font-size:0.85rem;color:#555;}
.iva-features li::before{content:'✦';color:#00C896;flex-shrink:0;font-size:0.7rem;margin-top:3px;}
.iva-chat{background:#fff;border:1px solid #e5e7eb;border-radius:20px;overflow:hidden;}
.iva-chat-header{padding:1rem 1.2rem;background:#f0fdf9;border-bottom:1px solid #a7f3d0;display:flex;align-items:center;gap:0.8rem;}
.iva-avatar{width:36px;height:36px;background:linear-gradient(135deg,#00C896,#0088CC);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1rem;}
.iva-name{font-size:0.85rem;font-weight:700;color:#1a1a2e;}
.iva-online{font-size:0.65rem;color:#00C896;}
.iva-msgs{padding:1.2rem;display:flex;flex-direction:column;gap:0.8rem;min-height:200px;}
.iv-msg{max-width:85%;padding:0.75rem 1rem;font-size:0.82rem;line-height:1.6;}
.iv-bot{background:#f8f9fa;border:1px solid #f0f0f0;color:#1a1a2e;border-radius:4px 12px 12px 12px;align-self:flex-start;}
.iv-user{background:rgba(0,200,150,0.15);border:1px solid rgba(0,200,150,0.2);color:#1a1a2e;border-radius:12px 4px 12px 12px;align-self:flex-end;}
.iva-suggs{padding:0 1rem 0.8rem;display:flex;flex-wrap:wrap;gap:0.4rem;}
.iva-sugg{font-size:0.7rem;padding:0.3rem 0.7rem;border:1px solid #e5e7eb;border-radius:20px;color:#666;cursor:pointer;transition:all 0.2s;background:transparent;font-family:'Plus Jakarta Sans',sans-serif;}
.iva-sugg:hover{border-color:#00C896;color:#00C896;}
.iva-input-row{padding:0.8rem;border-top:1px solid #f0f0f0;display:flex;gap:0.5rem;}
.iva-input{flex:1;background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:0.6rem 0.9rem;color:#1a1a2e;font-size:0.78rem;outline:none;font-family:'Plus Jakarta Sans',sans-serif;}
.iva-input::placeholder{color:#aaa;}
.iva-send{background:#00C896;border:none;border-radius:8px;width:34px;height:34px;cursor:pointer;font-size:0.85rem;}

/* YOUR ASSISTANT */
.your-section{padding:5rem 2rem;background:#f8f9fa;}
.your-inner{max-width:1100px;margin:0 auto;text-align:center;}
.your-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem;margin-top:3rem;}
.your-card{background:#fff;border:1px solid #f0f0f0;border-radius:16px;padding:2rem 1.5rem;text-align:center;transition:all 0.25s;}
.your-card:hover{border-color:#00C896;transform:translateY(-3px);}
.your-icon{font-size:2rem;margin-bottom:1rem;}
.your-card h3{font-size:0.95rem;font-weight:700;margin-bottom:0.5rem;color:#1a1a2e;}
.your-card p{font-size:0.8rem;color:#888;line-height:1.6;}

/* PRICING STRIP */
.price-strip{padding:4rem 2rem;max-width:1100px;margin:0 auto;text-align:center;}
.price-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:3rem;}
.p-card{background:#fff;border:1px solid #f0f0f0;border-radius:16px;padding:2rem;text-align:left;transition:all 0.25s;position:relative;overflow:hidden;}
.p-card:hover{transform:translateY(-3px);box-shadow:0 12px 32px rgba(0,0,0,0.06);}
.p-card.featured{border-color:#00C896;box-shadow:0 0 0 1px #00C896;}
.p-card.featured::before{content:'Más popular';position:absolute;top:0;right:0;background:#00C896;color:#fff;font-size:0.62rem;font-weight:700;padding:0.25rem 0.8rem;border-radius:0 14px 0 8px;}
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
.how{padding:3rem 1.2rem;}
.steps{grid-template-columns:1fr 1fr;}
.step-arrow{display:none;}
.for-section{padding:3rem 1.2rem;}
.iva-section{padding:3rem 1.2rem;}
.iva-inner{grid-template-columns:1fr;gap:2rem;}
.your-section{padding:3rem 1.2rem;}
.price-strip{padding:3rem 1.2rem;}
.price-cards{grid-template-columns:1fr;}
footer{padding:2rem 1.2rem;flex-direction:column;text-align:center;}
}
</style>
</head>
<body>

<!-- NAV -->
<nav>
  <a href="/" class="nav-logo">
    <div class="nav-logo-mark">AI</div>
    <span class="nav-logo-text">Ivamar <span>AI</span></span>
  </a>
  <div class="nav-links">
    <a href="#como">Cómo Funciona</a>
    <a href="#para-quien">Para Quién</a>
    <a href="#precios">Precios</a>
    <a href="/es/asistente" class="nav-cta">Talk to IvA →</a>
  </div>
</nav>

<!-- HERO -->
<section class="hero">
  <div>
    <div class="hero-badge">
      <div class="hero-badge-dot"></div>
      <span class="hero-badge-text">Disponible para negocios locales</span>
    </div>
    <h1>No Pierdas Más<br><em>Clientes o Leads.</em></h1>
    <p class="hero-sub">Con un simple link o código QR, tu negocio puede responder a clientes, contestar preguntas y capturar nuevos leads automáticamente — 24/7, en cualquier idioma.</p>
    <div class="hero-btns">
      <a href="/es/asistente" class="btn-primary">👋 Habla con IvA</a>
      <a href="#como" class="btn-ghost">Cómo Funciona →</a>
    </div>
    <div class="hero-trust">
      <div class="trust-item"><span class="trust-icon">✦</span> Trabaja 24/7</div>
      <div class="trust-item"><span class="trust-icon">✦</span> Español e inglés</div>
      <div class="trust-item"><span class="trust-icon">✦</span> Sin contratos</div>
      <div class="trust-item"><span class="trust-icon">✦</span> Listo en 48hrs</div>
    </div>
  </div>
  <div class="hero-visual">
    <div class="chat-mockup">
      <div class="mockup-header">
        <div class="mockup-avatar">🤖</div>
        <div>
          <div class="mockup-name">IvA — Tu Asistente de Negocio</div>
          <div class="mockup-status">● En línea · Responde al instante</div>
        </div>
      </div>
      <div class="mockup-msgs">
        <div class="m-msg m-bot">¡Hola! 👋 Estoy aquí para ayudarte con cualquier pregunta 24/7. ¿En qué puedo ayudarte hoy?</div>
        <div class="m-msg m-user">¿Cuál es el horario?</div>
        <div class="m-msg m-bot">Estamos abiertos de lunes a sábado de 9am a 7pm. ¿Te gustaría agendar una cita o necesitas más información? 😊</div>
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

<!-- HOW IT WORKS -->
<section class="how" id="como">
  <div class="how-inner">
    <div class="section-tag">Proceso Simple</div>
    <h2 class="section-title">Cómo <em>Funciona</em></h2>
    <p class="section-sub">Cuatro pasos simples — sin conocimientos técnicos.</p>
    <div class="steps">
      <div class="step">
        <div class="step-num">🔗</div>
        <h3>Comparte tu Link o QR</h3>
        <p>Pon tu link o código QR en tus flyers, redes sociales, web o rótulos.</p>
        <div class="step-arrow">›</div>
      </div>
      <div class="step">
        <div class="step-num">💬</div>
        <h3>Clientes Hacen Preguntas</h3>
        <p>Los clientes tocan el link y empiezan a chatear al instante — a cualquier hora.</p>
        <div class="step-arrow">›</div>
      </div>
      <div class="step">
        <div class="step-num">🤖</div>
        <h3>El Asistente Responde</h3>
        <p>Tu asistente IA responde naturalmente, en su idioma, las 24 horas del día.</p>
        <div class="step-arrow">›</div>
      </div>
      <div class="step">
        <div class="step-num">📲</div>
        <h3>Capturas Más Leads</h3>
        <p>Cada consulta es capturada y enviada a ti — lista para dar seguimiento.</p>
      </div>
    </div>
  </div>
</section>

<!-- PERFECT FOR -->
<section class="for-section" id="para-quien">
  <div class="section-tag">Industrias</div>
  <h2 class="section-title">Perfecto <em>Para</em></h2>
  <p class="section-sub">Cualquier negocio local que quiera responder más rápido y capturar más leads.</p>
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

<!-- MEET IVA -->
<section class="iva-section">
  <div class="iva-inner">
    <div>
      <div class="iva-tag">Conoce tu Asistente</div>
      <h2 class="iva-title">Conoce a IvA 👋</h2>
      <p class="iva-sub">Habla con IvA ahora mismo y descubre cómo esta herramienta puede ayudar a tu negocio. IvA es amigable, natural y habla español e inglés.</p>
      <ul class="iva-features">
        <li>Responde preguntas de clientes al instante</li>
        <li>Guía a los clientes naturalmente en la conversación</li>
        <li>Trabaja 24/7 — incluso mientras duermes</li>
        <li>Habla español, inglés y cualquier idioma</li>
        <li>Funciona por links, códigos QR o tu página web</li>
        <li>Captura leads y te los envía automáticamente</li>
      </ul>
      <a href="/es/asistente" class="btn-primary" style="display:inline-flex;">👋 Habla con IvA Ahora</a>
    </div>
    <div class="iva-chat">
      <div class="iva-chat-header">
        <div class="iva-avatar">🤖</div>
        <div>
          <div class="iva-name">IvA — Ivamar AI</div>
          <div class="iva-online">● En línea · Responde al instante</div>
        </div>
      </div>
      <div class="iva-msgs" id="ivaMsgs">
        <div class="iv-msg iv-bot">Hola 👋 Gracias por visitar Ivamar AI.<br><br>Muchos negocios pierden clientes simplemente porque nadie responde a tiempo.<br><br>¿Te gustaría saber si esta herramienta puede ayudar a tu negocio? 😊</div>
      </div>
      <div class="iva-suggs">
        <button class="iva-sugg" onclick="ivaReply(this)">Sí, cuéntame más</button>
        <button class="iva-sugg" onclick="ivaReply(this)">¿Cuánto cuesta?</button>
        <button class="iva-sugg" onclick="ivaReply(this)">Tengo un restaurante</button>
      </div>
      <div class="iva-input-row">
        <input class="iva-input" id="ivaInput" placeholder="Escribe aquí..." onkeydown="if(event.key==='Enter')ivaSend()">
        <button class="iva-send" onclick="ivaSend()">➤</button>
      </div>
    </div>
  </div>
</section>

<script>
const ivaResponses = {
  'sí, cuéntame más': '¡Perfecto! 😊 IvA es un asistente inteligente que creamos específicamente para tu negocio. Los clientes pueden hablar con él a través de un link o código QR — y responde al instante, 24/7. ¿Qué tipo de negocio tienes?',
  '¿cuánto cuesta?': "Precios simples 😊 El setup arranca desde $125 (único) y el plan mensual desde $29/mes. Sin contratos, cancela cuando quieras. ¿Quieres ver un demo en vivo para tu tipo de negocio?",
  'tengo un restaurante': "¡Perfecto! 🍽️ Para restaurantes, IvA puede responder preguntas sobre el menú, horarios, reservaciones y hasta ayudar a tomar pedidos directo por WhatsApp — sin pagar comisiones a Uber Eats. ¿Te gustaría ver cómo se vería para tu restaurante?",
  'default': "¡Gracias! 😊 La mejor forma de entender cómo IvA puede ayudar a tu negocio es experimentarlo tú mismo. Haz clic en el botón de abajo para tener una conversación completa con IvA."
};

function ivaReply(el) {
  const text = el.textContent;
  addMsg(text, 'user');
  const key = text.toLowerCase();
  const reply = ivaResponses[key] || ivaResponses['default'];
  setTimeout(() => addMsg(reply, 'bot'), 700);
}

function ivaSend() {
  const input = document.getElementById('ivaInput');
  if (!input.value.trim()) return;
  addMsg(input.value, 'user');
  setTimeout(() => addMsg(ivaResponses['default'], 'bot'), 700);
  input.value = '';
}

function addMsg(text, type) {
  const msgs = document.getElementById('ivaMsgs');
  const div = document.createElement('div');
  div.className = 'iv-msg iv-' + type;
  div.textContent = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}
</script>
</body>
</html>
`;
