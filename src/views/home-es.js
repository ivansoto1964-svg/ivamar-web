module.exports = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400&display=swap');
.iva-page{--void:#030508;--deep:#080C12;--surface:#0D1420;--cyan:#00E5C8;--ivawhite:#F0F4FF;--soft:#8892A4;--gold:#E8C97A;font-family:'Syne',sans-serif;background:var(--void);color:var(--ivawhite);margin:-20px;overflow-x:hidden;}
.iva-page *{box-sizing:border-box;margin:0;padding:0;}
.iva-nav{position:sticky;top:0;z-index:100;padding:1rem 2rem;display:flex;align-items:center;justify-content:space-between;background:rgba(3,5,8,0.92);backdrop-filter:blur(12px);border-bottom:1px solid rgba(0,229,200,0.08);}
.iva-logo{display:flex;align-items:center;gap:0.7rem;text-decoration:none;}
.iva-logo-mark{width:32px;height:32px;border:1.5px solid #00E5C8;border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:0.7rem;color:#00E5C8;background:rgba(0,229,200,0.06);}
.iva-logo-text{font-size:1.1rem;font-weight:700;color:#F0F4FF;letter-spacing:-0.02em;}
.iva-logo-text span{color:#00E5C8;}
.iva-nav-links{display:flex;gap:1.5rem;list-style:none;}
.iva-nav-links a{color:#8892A4;text-decoration:none;font-size:0.85rem;font-weight:500;transition:color 0.2s;}
.iva-nav-links a:hover{color:#F0F4FF;}
.iva-nav-right{display:flex;align-items:center;gap:0.8rem;}
.iva-lang-switch{font-size:0.78rem;color:#4A5568;border:1px solid rgba(255,255,255,0.08);padding:0.4rem 0.8rem;border-radius:6px;text-decoration:none;transition:all 0.2s;font-family:'JetBrains Mono',monospace;}
.iva-lang-switch:hover{color:#8892A4;border-color:rgba(255,255,255,0.15);}
.iva-nav-cta{background:transparent;border:1px solid rgba(0,229,200,0.4);color:#00E5C8;padding:0.5rem 1.2rem;border-radius:6px;font-family:'Syne',sans-serif;font-size:0.85rem;font-weight:600;cursor:pointer;transition:all 0.25s;text-decoration:none;display:inline-block;}
.iva-nav-cta:hover{background:rgba(0,229,200,0.1);}
.iva-hero{min-height:92vh;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;padding:5rem 2rem 4rem;overflow:hidden;text-align:center;}
.iva-hero::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(0,229,200,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,200,0.04) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 80%);-webkit-mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 80%);}
.iva-orb{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none;}
.iva-orb-1{width:500px;height:500px;background:rgba(0,229,200,0.08);top:0;left:50%;transform:translateX(-50%);animation:ivaDrift1 8s ease-in-out infinite;}
.iva-orb-2{width:300px;height:300px;background:rgba(232,201,122,0.06);bottom:20%;left:10%;animation:ivaDrift2 10s ease-in-out infinite;}
@keyframes ivaDrift1{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-30px)}}
@keyframes ivaDrift2{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
.iva-badge{display:inline-flex;align-items:center;gap:0.5rem;border:1px solid rgba(0,229,200,0.25);background:rgba(0,229,200,0.05);padding:0.4rem 1rem;border-radius:100px;font-family:'JetBrains Mono',monospace;font-size:0.7rem;color:#00E5C8;letter-spacing:0.1em;margin-bottom:2rem;position:relative;}
.iva-badge-dot{width:6px;height:6px;background:#00E5C8;border-radius:50%;animation:ivaBlink 2s ease-in-out infinite;}
@keyframes ivaBlink{0%,100%{opacity:1}50%{opacity:0.3}}
.iva-hero h1{font-size:clamp(2.8rem,7vw,5.5rem);font-weight:800;line-height:1.05;letter-spacing:-0.03em;color:#F0F4FF;margin-bottom:1.2rem;position:relative;}
.iva-hero h1 em{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;color:#00E5C8;}
.iva-hero-sub{max-width:540px;color:#8892A4;font-size:1.05rem;line-height:1.7;margin-bottom:2.5rem;font-weight:400;position:relative;}
.iva-hero-actions{display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;margin-bottom:4rem;position:relative;}
.iva-btn-main{display:inline-flex;align-items:center;gap:0.5rem;background:#00E5C8;color:#030508;padding:0.85rem 2rem;border-radius:8px;font-family:'Syne',sans-serif;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;border:none;cursor:pointer;}
.iva-btn-main:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,229,200,0.3);}
.iva-btn-ghost{display:inline-flex;align-items:center;gap:0.5rem;background:transparent;color:#F0F4FF;padding:0.85rem 2rem;border-radius:8px;font-family:'Syne',sans-serif;font-weight:600;font-size:0.95rem;text-decoration:none;transition:all 0.25s;border:1px solid rgba(255,255,255,0.12);}
.iva-btn-ghost:hover{border-color:rgba(255,255,255,0.3);background:rgba(255,255,255,0.04);}
.iva-stats{display:flex;gap:3rem;flex-wrap:wrap;justify-content:center;position:relative;}
.iva-stat{text-align:center;}
.iva-stat-num{font-size:2rem;font-weight:800;color:#F0F4FF;letter-spacing:-0.03em;}
.iva-stat-num span{color:#00E5C8;}
.iva-stat-label{font-size:0.72rem;color:#4A5568;letter-spacing:0.1em;text-transform:uppercase;margin-top:0.2rem;}
.iva-section{padding:5rem 2rem;position:relative;}
.iva-section-dark{background:#080C12;}
.iva-section-void{background:#030508;}
.iva-inner{max-width:960px;margin:0 auto;}
.iva-section-label{display:inline-flex;align-items:center;gap:0.5rem;font-family:'JetBrains Mono',monospace;font-size:0.7rem;color:#00E5C8;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:0.8rem;}
.iva-section-label::before{content:'';width:20px;height:1px;background:#00E5C8;}
.iva-section-title{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;letter-spacing:-0.03em;line-height:1.1;margin-bottom:0.8rem;}
.iva-section-title em{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;color:#00E5C8;}
.iva-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:3rem;background:rgba(0,229,200,0.08);border-radius:16px;overflow:hidden;border:1px solid rgba(0,229,200,0.1);}
.iva-step{background:#080C12;padding:2.5rem 2rem;transition:background 0.3s;}
.iva-step:hover{background:rgba(0,229,200,0.04);}
.iva-step-num{font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:#00E5C8;letter-spacing:0.15em;margin-bottom:1rem;opacity:0.7;}
.iva-step-icon{font-size:2rem;margin-bottom:0.8rem;display:block;}
.iva-step-title{font-size:1rem;font-weight:700;margin-bottom:0.5rem;}
.iva-step-desc{font-size:0.83rem;color:#8892A4;line-height:1.6;font-weight:400;}
.iva-features{display:grid;grid-template-columns:repeat(2,1fr);gap:1.2rem;margin-top:3rem;}
.iva-feature{background:#0D1420;border:1px solid rgba(255,255,255,0.05);border-radius:14px;padding:1.8rem;transition:border-color 0.3s,transform 0.3s;position:relative;overflow:hidden;}
.iva-feature::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#00E5C8,transparent);opacity:0;transition:opacity 0.3s;}
.iva-feature:hover{border-color:rgba(0,229,200,0.2);transform:translateY(-3px);}
.iva-feature:hover::before{opacity:1;}
.iva-feature.wide{grid-column:span 2;}
.iva-feature-icon{width:42px;height:42px;background:rgba(0,229,200,0.1);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;margin-bottom:1rem;}
.iva-feature-title{font-size:1rem;font-weight:700;margin-bottom:0.4rem;}
.iva-feature-desc{font-size:0.83rem;color:#8892A4;line-height:1.6;font-weight:400;}
.iva-feature-tag{display:inline-block;margin-top:0.8rem;background:rgba(0,229,200,0.07);border:1px solid rgba(0,229,200,0.2);color:#00E5C8;font-family:'JetBrains Mono',monospace;font-size:0.62rem;padding:0.2rem 0.6rem;border-radius:4px;letter-spacing:0.1em;}
.iva-pricing-card{background:#0D1420;border:1px solid rgba(0,229,200,0.2);border-radius:20px;padding:3rem;margin-top:3rem;position:relative;overflow:hidden;text-align:center;max-width:600px;margin-left:auto;margin-right:auto;}
.iva-pricing-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#00E5C8,#E8C97A,#00E5C8,transparent);}
.iva-pricing-badge{display:inline-flex;align-items:center;gap:0.4rem;background:rgba(232,201,122,0.1);border:1px solid rgba(232,201,122,0.3);color:#E8C97A;font-size:0.75rem;font-family:'JetBrains Mono',monospace;padding:0.3rem 0.8rem;border-radius:100px;margin-bottom:1.5rem;}
.iva-price{display:flex;align-items:flex-start;justify-content:center;gap:0.3rem;margin-bottom:0.4rem;}
.iva-price-currency{font-size:1.4rem;font-weight:700;color:#8892A4;margin-top:0.5rem;}
.iva-price-amount{font-size:5rem;font-weight:800;letter-spacing:-0.04em;line-height:1;}
.iva-price-period{font-size:0.9rem;color:#8892A4;align-self:flex-end;margin-bottom:0.8rem;}
.iva-price-setup{font-size:0.85rem;color:#8892A4;margin-bottom:2rem;}
.iva-price-setup strong{color:#E8C97A;}
.iva-pricing-list{list-style:none;text-align:left;margin-bottom:2rem;display:grid;grid-template-columns:1fr 1fr;gap:0.7rem;}
.iva-pricing-list li{display:flex;align-items:center;gap:0.5rem;font-size:0.86rem;color:#8892A4;font-weight:400;}
.iva-pricing-list li::before{content:'✓';color:#00E5C8;font-weight:700;font-size:0.75rem;flex-shrink:0;}
.iva-btn-pricing{display:block;width:100%;background:#00E5C8;color:#030508;padding:1rem;border-radius:10px;font-family:'Syne',sans-serif;font-weight:700;font-size:1rem;text-decoration:none;transition:all 0.25s;border:none;cursor:pointer;text-align:center;}
.iva-btn-pricing:hover{box-shadow:0 8px 30px rgba(0,229,200,0.3);transform:translateY(-2px);}
.iva-cta{text-align:center;padding:5rem 2rem;background:#080C12;position:relative;}
.iva-cta-glow{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:400px;height:400px;background:radial-gradient(circle,rgba(0,229,200,0.07),transparent 70%);pointer-events:none;}
.iva-cta h2{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;letter-spacing:-0.03em;margin-bottom:1rem;position:relative;}
.iva-cta h2 em{font-family:'Instrument Serif',serif;font-style:italic;color:#00E5C8;}
.iva-cta p{color:#8892A4;margin-bottom:2rem;line-height:1.7;font-weight:400;max-width:500px;margin-left:auto;margin-right:auto;position:relative;}
.iva-cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;position:relative;}
.iva-footer{background:#030508;padding:2rem 2.5rem;border-top:1px solid rgba(255,255,255,0.04);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;font-size:0.8rem;color:#4A5568;}
.iva-footer strong{color:#8892A4;}
.iva-footer-links{display:flex;gap:1.5rem;}
.iva-footer-links a{color:#4A5568;text-decoration:none;transition:color 0.2s;}
.iva-footer-links a:hover{color:#00E5C8;}
@media(max-width:700px){.iva-nav-links{display:none;}.iva-steps{grid-template-columns:1fr;}.iva-features{grid-template-columns:1fr;}.iva-feature.wide{grid-column:span 1;}.iva-pricing-list{grid-template-columns:1fr;}.iva-footer{flex-direction:column;text-align:center;}}
</style>

<div class="iva-page">
  <nav class="iva-nav">
    <a href="/" class="iva-logo">
      <div class="iva-logo-mark">IvA</div>
      <span class="iva-logo-text">Ivamar <span>AI</span></span>
    </a>
    <ul class="iva-nav-links">
      <li><a href="#how">Cómo funciona</a></li>
      <li><a href="#features">Servicios</a></li>
      <li><a href="#pricing">Precios</a></li>
      <li><a href="/demo">Demo</a></li>
      <li><a href="/about">Nosotros</a></li>
    </ul>
    <div class="iva-nav-right">
      <a href="/en" class="iva-lang-switch">🇺🇸 English</a>
      <a href="https://wa.me/18635216708" target="_blank" class="iva-nav-cta">Empezar →</a>
    </div>
  </nav>

  <div class="iva-hero">
    <div class="iva-orb iva-orb-1"></div>
    <div class="iva-orb iva-orb-2"></div>
    <div class="iva-badge"><span class="iva-badge-dot"></span>DISPONIBLE EN PUERTO RICO & USA</div>
    <h1>The <em>Human Touch</em><br>of Intelligence</h1>
    <p class="iva-hero-sub">Creamos páginas con asistente de IA para negocios reales. Tus clientes preguntan, ordenan y pagan — sin que tú tengas que estar al teléfono.</p>
    <div class="iva-hero-actions">    
<a href="/quote" target="_blank" class="iva-btn-main">Request Demo →</a>
      <a href="/demo" class="iva-btn-ghost">Ver demo en vivo</a>
    </div>
    <div class="iva-stats">
      <div class="iva-stat"><div class="iva-stat-num">$125<span></span></div><div class="iva-stat-label">Setup único</div></div>
      <div class="iva-stat"><div class="iva-stat-num">$49<span>/mes</span></div><div class="iva-stat-label">Mensualidad</div></div>
      <div class="iva-stat"><div class="iva-stat-num">0<span>%</span></div><div class="iva-stat-label">Comisión</div></div>
      <div class="iva-stat"><div class="iva-stat-num">24<span>/7</span></div><div class="iva-stat-label">Asistente IvA</div></div>
    </div>
  </div>

  <div class="iva-section iva-section-dark" id="how">
    <div class="iva-inner">
      <div class="iva-section-label">El proceso</div>
      <h2 class="iva-section-title">Listo en <em>48 horas</em></h2>
      <div class="iva-steps">
        <div class="iva-step"><div class="iva-step-num">01 / SETUP</div><span class="iva-step-icon">📋</span><div class="iva-step-title">Nos envías tu info</div><div class="iva-step-desc">Tu logo, menú o servicios, precios y datos del negocio. Nosotros configuramos todo por ti.</div></div>
        <div class="iva-step"><div class="iva-step-num">02 / LAUNCH</div><span class="iva-step-icon">🚀</span><div class="iva-step-title">Tu página sale en vivo</div><div class="iva-step-desc">Publicamos en tu link personalizado. IvA ya conoce tu negocio y está listo para atender clientes 24/7.</div></div>
        <div class="iva-step"><div class="iva-step-num">03 / SELL</div><span class="iva-step-icon">💰</span><div class="iva-step-title">Clientes ordenan y pagan</div><div class="iva-step-desc">IvA guía a tus clientes a WhatsApp o al checkout. Los pagos van directo a tu cuenta. Cero comisiones.</div></div>
      </div>
    </div>
  </div>

  <div class="iva-section iva-section-void" id="features">
    <div class="iva-inner">
      <div class="iva-section-label">Qué incluye</div>
      <h2 class="iva-section-title">Todo lo que tu negocio<br><em>necesita</em></h2>
      <div class="iva-features">
        <div class="iva-feature"><div class="iva-feature-icon">🤖</div><div class="iva-feature-title">IvA — Tu Asistente de IA</div><div class="iva-feature-desc">Entrenado con la info de tu negocio. Responde preguntas, toma órdenes y guía clientes las 24 horas en inglés y español.</div><span class="iva-feature-tag">BILINGÜE · EN + ES</span></div>
        <div class="iva-feature"><div class="iva-feature-icon">📱</div><div class="iva-feature-title">Landing Page Mobile-First</div><div class="iva-feature-desc">Una página hermosa y rápida diseñada para teléfonos. Tu menú, servicios, fotos y precios en un solo lugar.</div><span class="iva-feature-tag">OPTIMIZADA PARA MÓVIL</span></div>
        <div class="iva-feature"><div class="iva-feature-icon">💳</div><div class="iva-feature-title">Pagos Directos al Comerciante</div><div class="iva-feature-desc">Acepta Stripe, ATH Móvil, PayPal o Square. El dinero va directo a tu cuenta — sin intermediarios ni esperas.</div><span class="iva-feature-tag">0% COMISIÓN</span></div>
        <div class="iva-feature"><div class="iva-feature-icon">📲</div><div class="iva-feature-title">Pedidos por WhatsApp</div><div class="iva-feature-desc">Los pedidos llegan formateados directo a tu WhatsApp con todos los detalles. Sin apps, sin complicaciones.</div><span class="iva-feature-tag">NOTIFICACIONES INSTANTÁNEAS</span></div>
        <div class="iva-feature wide"><div class="iva-feature-icon">🏪</div><div class="iva-feature-title">Ideal para Cualquier Negocio Local en PR y USA</div><div class="iva-feature-desc">Food trucks, panaderías, chinchorros, salones, dealers de autos, contratistas — si tienes clientes, IvA trabaja para ti.</div><span class="iva-feature-tag">FOOD TRUCKS · RESTAURANTES · SERVICIOS · RETAIL · AUTOS</span></div>
      </div>
    </div>
  </div>

  <div class="iva-section iva-section-dark" id="pricing">
    <div class="iva-inner" style="text-align:center">
      <div class="iva-section-label" style="justify-content:center">Precios</div>
      <h2 class="iva-section-title">Simple. <em>Transparente.</em> Tuyo.</h2>
      <div class="iva-pricing-card">
        <div class="iva-pricing-badge">⭐ Primer mes gratis</div>
        <div class="iva-price"><span class="iva-price-currency">$</span><span class="iva-price-amount">49</span><span class="iva-price-period">/mes</span></div>
        <p class="iva-price-setup">+ <strong>$125 setup único</strong> · Primer mes incluido gratis</p>
        <ul class="iva-pricing-list">
          <li>Landing page personalizada</li><li>Asistente IvA 24/7</li>
          <li>Pedidos por WhatsApp</li><li>Integración de pagos</li>
          <li>Bilingüe EN + ES</li><li>Hosting y actualizaciones</li>
          <li>Editor de menú</li><li>Soporte prioritario</li>
        </ul>
        <a href="https://wa.me/18635216708" target="_blank" class="iva-btn-pricing">Empezar por WhatsApp →</a>
      </div>
    </div>
  </div>

  <div class="iva-cta">
    <div class="iva-cta-glow"></div>
    <h2>Tu negocio merece<br><em>mejores herramientas</em></h2>
    <p>Únete a negocios en Puerto Rico y USA que ya usan Ivamar AI para vender más y trabajar menos.</p>
    <div class="iva-cta-btns">
      <a href="https://wa.me/18635216708" target="_blank" class="iva-btn-main">Hablar por WhatsApp →</a>     
<a href="/quote" target="_blank" class="iva-btn-main">Request Demo →</a>
    </div>
  </div>

  <div class="iva-footer">
    <div>© 2025 <strong>Ivamar AI LLC</strong> · Delaware, USA · All rights reserved</div>
    <div class="iva-footer-links">
      <a href="/privacy">Privacy</a><a href="/terms">Terms</a>
      <a href="/about">About</a><a href="/contact">Contact</a>
    </div>
  </div>
</div>
`;
