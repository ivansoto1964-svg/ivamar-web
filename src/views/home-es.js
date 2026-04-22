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
.iva-industries{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-top:3rem;}
.iva-industry{background:#0D1420;border:1px solid rgba(255,255,255,0.05);border-radius:14px;padding:1.5rem 1.2rem;text-align:center;transition:all 0.3s;position:relative;overflow:hidden;cursor:pointer;text-decoration:none;display:block;color:inherit;}
.iva-industry::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#00E5C8,transparent);opacity:0;transition:opacity 0.3s;}
.iva-industry:hover{transform:translateY(-4px);border-color:rgba(0,229,200,0.2);box-shadow:0 12px 30px rgba(0,0,0,0.3);}
.iva-industry:hover::before{opacity:1;}
.iva-industry-icon{font-size:2.2rem;margin-bottom:0.8rem;display:block;}
.iva-industry-name{font-size:0.9rem;font-weight:700;margin-bottom:0.3rem;color:#F0F4FF;}
.iva-industry-desc{font-size:0.72rem;color:#4A5568;line-height:1.4;}
.iva-industry-tag{display:inline-block;margin-top:0.8rem;font-family:'JetBrains Mono',monospace;font-size:0.6rem;color:#00E5C8;letter-spacing:0.1em;border:1px solid rgba(0,229,200,0.2);padding:0.2rem 0.5rem;border-radius:3px;}
.iva-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:3rem;background:rgba(0,229,200,0.08);border-radius:16px;overflow:hidden;border:1px solid rgba(0,229,200,0.1);}
.iva-step{background:#030508;padding:2.5rem 2rem;transition:background 0.3s;}
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

/* DUAL PRICING */
.iva-pricing-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-top:3rem;max-width:700px;margin-left:auto;margin-right:auto;}
.iva-pricing-card{background:#0D1420;border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:2.5rem;position:relative;overflow:hidden;text-align:center;transition:transform 0.3s,border-color 0.3s;}
.iva-pricing-card:hover{transform:translateY(-4px);}
.iva-pricing-card.featured{border-color:rgba(0,229,200,0.3);background:rgba(0,229,200,0.03);}
.iva-pricing-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent);}
.iva-pricing-card.featured::before{background:linear-gradient(90deg,transparent,#00E5C8,transparent);}
.iva-pricing-badge{display:inline-flex;align-items:center;gap:0.4rem;font-size:0.72rem;font-family:'JetBrains Mono',monospace;padding:0.3rem 0.8rem;border-radius:100px;margin-bottom:1.2rem;}
.iva-pricing-badge.standard{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#8892A4;}
.iva-pricing-badge.pro{background:rgba(232,201,122,0.1);border:1px solid rgba(232,201,122,0.3);color:#E8C97A;}
.iva-pricing-plan-name{font-size:1.1rem;font-weight:800;margin-bottom:0.3rem;}
.iva-pricing-industries{font-size:0.75rem;color:#4A5568;margin-bottom:1.5rem;line-height:1.5;}
.iva-price{display:flex;align-items:flex-start;justify-content:center;gap:0.2rem;margin-bottom:0.3rem;}
.iva-price-currency{font-size:1.2rem;font-weight:700;color:#8892A4;margin-top:0.4rem;}
.iva-price-amount{font-size:4rem;font-weight:800;letter-spacing:-0.04em;line-height:1;}
.iva-price-period{font-size:0.85rem;color:#8892A4;align-self:flex-end;margin-bottom:0.6rem;}
.iva-price-setup{font-size:0.8rem;color:#8892A4;margin-bottom:1.5rem;}
.iva-price-setup strong{color:#E8C97A;}
.iva-pricing-list{list-style:none;text-align:left;margin-bottom:1.5rem;display:flex;flex-direction:column;gap:0.5rem;}
.iva-pricing-list li{display:flex;align-items:center;gap:0.5rem;font-size:0.82rem;color:#8892A4;font-weight:400;}
.iva-pricing-list li::before{content:'✓';color:#00E5C8;font-weight:700;font-size:0.72rem;flex-shrink:0;}
.iva-btn-pricing{display:block;width:100%;padding:0.85rem;border-radius:10px;font-family:'Syne',sans-serif;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;border:none;cursor:pointer;text-align:center;}
.iva-btn-pricing.standard{background:rgba(255,255,255,0.06);color:#F0F4FF;border:1px solid rgba(255,255,255,0.12);}
.iva-btn-pricing.standard:hover{background:rgba(255,255,255,0.1);}
.iva-btn-pricing.pro{background:#00E5C8;color:#030508;}
.iva-btn-pricing.pro:hover{box-shadow:0 8px 30px rgba(0,229,200,0.3);transform:translateY(-2px);}

/* FAQ */
.iva-faq{display:flex;flex-direction:column;gap:0.8rem;margin-top:3rem;}
.iva-faq-item{background:#0D1420;border:1px solid rgba(255,255,255,0.05);border-radius:12px;overflow:hidden;}
.iva-faq-q{padding:1.2rem 1.5rem;font-size:0.95rem;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:1rem;transition:background 0.2s;}
.iva-faq-q:hover{background:rgba(0,229,200,0.03);}
.iva-faq-icon{font-size:1.1rem;color:#00E5C8;flex-shrink:0;transition:transform 0.3s;}
.iva-faq-item.open .iva-faq-icon{transform:rotate(45deg);}
.iva-faq-a{max-height:0;overflow:hidden;transition:max-height 0.3s ease;font-size:0.88rem;color:#8892A4;line-height:1.7;font-weight:400;}
.iva-faq-item.open .iva-faq-a{max-height:200px;}
.iva-faq-a-inner{padding:0 1.5rem 1.2rem;}

.iva-cta{text-align:center;padding:5rem 2rem;background:#080C12;position:relative;overflow:hidden;}
.iva-cta-glow{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:300px;height:300px;background:radial-gradient(circle,rgba(0,229,200,0.07),transparent 70%);pointer-events:none;z-index:0;}
.iva-cta-inner{position:relative;z-index:1;max-width:560px;margin:0 auto;}
.iva-cta h2{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;letter-spacing:-0.03em;margin-bottom:1rem;line-height:1.15;}
.iva-cta h2 em{font-family:'Instrument Serif',serif;font-style:italic;color:#00E5C8;}
.iva-cta p{color:#8892A4;margin-bottom:2rem;line-height:1.7;font-weight:400;font-size:0.95rem;}
.iva-cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}
.iva-footer{background:#030508;padding:2rem 2.5rem;border-top:1px solid rgba(255,255,255,0.04);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;font-size:0.8rem;color:#4A5568;}
.iva-footer strong{color:#8892A4;}
.iva-footer-links{display:flex;gap:1.5rem;}
.iva-footer-links a{color:#4A5568;text-decoration:none;transition:color 0.2s;}
.iva-footer-links a:hover{color:#00E5C8;}
@media(max-width:700px){
  .iva-nav-links{display:none;}
  .iva-industries{grid-template-columns:repeat(2,1fr);}
  .iva-steps{grid-template-columns:1fr;}
  .iva-features{grid-template-columns:1fr;}
  .iva-feature.wide{grid-column:span 1;}
  .iva-pricing-grid{grid-template-columns:1fr;}
  .iva-footer{flex-direction:column;text-align:center;}
  .iva-cta{padding:4rem 1.5rem;}
  .iva-cta-btns{flex-direction:column;align-items:center;}
  .iva-cta-btns a{width:100%;justify-content:center;}
  .iva-stats{gap:1.5rem;}
  .iva-hero-actions{flex-direction:column;align-items:center;}
  .iva-hero-actions a{width:100%;justify-content:center;}
}
</style>

<div class="iva-page">
  <nav class="iva-nav">
    <a href="/" class="iva-logo">
      <div class="iva-logo-mark">IvA</div>
      <span class="iva-logo-text">Ivamar <span>AI</span></span>
    </a>
    <ul class="iva-nav-links">
      <li><a href="#industries">Industrias</a></li>
      <li><a href="#how">Cómo funciona</a></li>
      <li><a href="#pricing">Precios</a></li>
      <li><a href="/demos">Demos</a></li>
      <li><a href="/about">Nosotros</a></li>
    </ul>
    <div class="iva-nav-right">
      <a href="/en" class="iva-lang-switch">EN · English</a>
      <a href="/quote" class="iva-nav-cta">Empezar →</a>
    </div>
  </nav>

  <div class="iva-hero">
    <div class="iva-orb iva-orb-1"></div>
    <div class="iva-orb iva-orb-2"></div>
    <div class="iva-badge"><span class="iva-badge-dot"></span>FROM USA TO AROUND THE WORLD 🌎</div>
    <h1>The <em>Human Touch</em><br>of Intelligence</h1>
    <p class="iva-hero-sub">Creamos páginas con asistente digital de IA para negocios reales. Tus clientes preguntan, ordenan y pagan — sin que tú tengas que estar al teléfono.</p>
    <div class="iva-hero-actions">
      <a href="/quote" class="iva-btn-main">Empezar ahora →</a>
      <a href="/demos" class="iva-btn-ghost">Ver demos en vivo</a>
    </div>
    <div class="iva-stats">
      <div class="iva-stat"><div class="iva-stat-num">$125<span></span></div><div class="iva-stat-label">Setup único</div></div>
      <div class="iva-stat"><div class="iva-stat-num">$49<span>/mes</span></div><div class="iva-stat-label">Desde</div></div>
      <div class="iva-stat"><div class="iva-stat-num">0<span>%</span></div><div class="iva-stat-label">Comisión</div></div>
      <div class="iva-stat"><div class="iva-stat-num">24<span>/7</span></div><div class="iva-stat-label">Asistente IvA</div></div>
    </div>
  </div>


<!-- INDUSTRIAS -->
  <div class="iva-section iva-section-dark" id="industries">
    <div class="iva-inner">
      <div class="iva-section-label">A quién servimos</div>
      <h2 class="iva-section-title">Para <em>cualquier</em> negocio local</h2>
      <div class="iva-industries">
        <a href="/quote" class="iva-industry"><span class="iva-industry-icon">🚚</span><div class="iva-industry-name">Food Trucks</div><div class="iva-industry-desc">Menú digital, pedidos por WhatsApp y pagos</div><span class="iva-industry-tag">$49/mes</span></a>
        <a href="/quote" class="iva-industry"><span class="iva-industry-icon">🍽</span><div class="iva-industry-name">Restaurantes</div><div class="iva-industry-desc">Menú completo, reservaciones y asistente IA</div><span class="iva-industry-tag">$49/mes</span></a>
        <a href="/quote" class="iva-industry"><span class="iva-industry-icon">💇</span><div class="iva-industry-name">Salones & Spas</div><div class="iva-industry-desc">Servicios, precios y reservaciones por WhatsApp</div><span class="iva-industry-tag">$49/mes</span></a>
        <a href="/quote" class="iva-industry"><span class="iva-industry-icon">🥐</span><div class="iva-industry-name">Panaderías & Cafés</div><div class="iva-industry-desc">Especiales del día, órdenes y chat con clientes</div><span class="iva-industry-tag">$49/mes</span></a>
        <a href="/quote" class="iva-industry"><span class="iva-industry-icon">🚗</span><div class="iva-industry-name">Dealers de Autos</div><div class="iva-industry-desc">Inventario, captura de leads e info de financiamiento</div><span class="iva-industry-tag">$99/mes</span></a>
        <a href="/quote" class="iva-industry"><span class="iva-industry-icon">🏠</span><div class="iva-industry-name">Realtors</div><div class="iva-industry-desc">Propiedades, captura de leads y citas</div><span class="iva-industry-tag">$99/mes</span></a>
        <a href="/quote" class="iva-industry"><span class="iva-industry-icon">🏥</span><div class="iva-industry-name">Médicos & Dentistas</div><div class="iva-industry-desc">Servicios, citas y preguntas de pacientes</div><span class="iva-industry-tag">$99/mes</span></a>
        <a href="/quote" class="iva-industry"><span class="iva-industry-icon">⚖️</span><div class="iva-industry-name">Abogados & Servicios</div><div class="iva-industry-desc">Áreas de práctica, consultas y captura de leads</div><span class="iva-industry-tag">$99/mes</span></a>
      </div>
    </div>
  </div>


















  <!-- COMO FUNCIONA -->
  <div class="iva-section iva-section-void" id="how">
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

  <!-- FEATURES -->
  <div class="iva-section iva-section-dark">
    <div class="iva-inner">
      <div class="iva-section-label">Qué incluye</div>
      <h2 class="iva-section-title">Todo lo que tu negocio<br><em>necesita</em></h2>
      <div class="iva-features">
        <div class="iva-feature"><div class="iva-feature-icon">🤖</div><div class="iva-feature-title">IvA — Tu Asistente Digital</div><div class="iva-feature-desc">Entrenado con la info de tu negocio. Responde preguntas, toma órdenes y guía clientes 24/7 en cualquier idioma.</div><span class="iva-feature-tag">MULTILINGÜE</span></div>
        <div class="iva-feature"><div class="iva-feature-icon">📱</div><div class="iva-feature-title">Página Web Mobile-First</div><div class="iva-feature-desc">Una página hermosa y rápida diseñada para teléfonos. Tu menú, servicios, fotos y precios en un solo lugar.</div><span class="iva-feature-tag">OPTIMIZADA PARA MÓVIL</span></div>
        <div class="iva-feature"><div class="iva-feature-icon">💳</div><div class="iva-feature-title">Pagos Directos</div><div class="iva-feature-desc">Acepta Stripe, ATH Móvil, PayPal o Square. El dinero va directo a tu cuenta — sin intermediarios.</div><span class="iva-feature-tag">0% COMISIÓN</span></div>
        <div class="iva-feature"><div class="iva-feature-icon">📲</div><div class="iva-feature-title">Pedidos por WhatsApp</div><div class="iva-feature-desc">Los pedidos llegan formateados directo a tu WhatsApp. Sin apps, sin complicaciones.</div><span class="iva-feature-tag">NOTIFICACIONES INSTANTÁNEAS</span></div>
        <div class="iva-feature wide"><div class="iva-feature-icon">🔧</div><div class="iva-feature-title">Panel de Admin — Edita Todo Tú Mismo</div><div class="iva-feature-desc">Actualiza tu menú, precios, fotos y horario cuando quieras desde tu propio panel de admin. Sin código, sin desarrolladores. Tu página se actualiza al instante.</div><span class="iva-feature-tag">SIN CÓDIGO · ACTUALIZACIONES INSTANTÁNEAS · CONTROL TOTAL</span></div>
      </div>
    </div>
  </div>

  <!-- PRECIOS -->
  <div class="iva-section iva-section-void" id="pricing">
    <div class="iva-inner" style="text-align:center">
      <div class="iva-section-label" style="justify-content:center">Precios</div>
      <h2 class="iva-section-title">Simple. <em>Transparente.</em> Tuyo.</h2>
      <p style="color:#8892A4;margin-top:0.5rem;font-size:0.95rem;">Todos los planes incluyen $125 de setup · Primer mes gratis</p>
      <div class="iva-pricing-grid">

        <!-- BÁSICO -->
        <div class="iva-pricing-card">
          <div class="iva-pricing-badge standard">⚡ Estándar</div>
          <div class="iva-pricing-plan-name">Plan Básico</div>
          <div class="iva-pricing-industries">Food trucks · Restaurantes<br>Salones · Panaderías · Cafés</div>
          <div class="iva-price"><span class="iva-price-currency">$</span><span class="iva-price-amount">49</span><span class="iva-price-period">/mes</span></div>
          <p class="iva-price-setup">+ <strong>$125 setup</strong> · Primer mes gratis</p>
          <ul class="iva-pricing-list">
            <li>Página web personalizada</li>
            <li>Asistente digital IvA 24/7</li>
            <li>Pedidos por WhatsApp</li>
            <li>Integración de pagos</li>
            <li>Panel de admin</li>
            <li>Multilingüe</li>
          </ul>
          <a href="/quote" class="iva-btn-pricing standard">Empezar →</a>
        </div>

        <!-- PROFESIONAL -->
        <div class="iva-pricing-card featured">
          <div class="iva-pricing-badge pro">🚀 Profesional</div>
          <div class="iva-pricing-plan-name">Plan Pro</div>
          <div class="iva-pricing-industries">Dealers · Realtors<br>Médicos · Abogados · Finanzas</div>
          <div class="iva-price"><span class="iva-price-currency">$</span><span class="iva-price-amount">99</span><span class="iva-price-period">/mes</span></div>
          <p class="iva-price-setup">+ <strong>$125 setup</strong> · Primer mes gratis</p>
          <ul class="iva-pricing-list">
            <li>Todo lo del Plan Básico</li>
            <li>Captura de leads</li>
            <li>Reservación de citas</li>
            <li>Soporte prioritario</li>
            <li>Prompts avanzados para IvA</li>
            <li>Showcase de inventario</li>
          </ul>
          <a href="/quote" class="iva-btn-pricing pro">Empezar →</a>
        </div>

      </div>
    </div>
  </div>

  <!-- FAQ -->
  <div class="iva-section iva-section-dark">
    <div class="iva-inner">
      <div class="iva-section-label">FAQ</div>
      <h2 class="iva-section-title">Preguntas <em>frecuentes</em></h2>
      <div class="iva-faq">
        <div class="iva-faq-item">
          <div class="iva-faq-q" onclick="toggleFaq(this)">¿Necesito saber de tecnología o programación? <span class="iva-faq-icon">+</span></div>
          <div class="iva-faq-a"><div class="iva-faq-a-inner">Para nada. Nosotros configuramos todo por ti. Solo nos envías tu info — logo, menú, precios, horario — y tu página sale en vivo en 48 horas. Después puedes actualizar todo desde tu panel de admin sin ningún conocimiento técnico.</div></div>
        </div>
        <div class="iva-faq-item">
          <div class="iva-faq-q" onclick="toggleFaq(this)">¿Cuánto tiempo tarda el setup? <span class="iva-faq-icon">+</span></div>
          <div class="iva-faq-a"><div class="iva-faq-a-inner">Tu página sale en vivo dentro de 48 horas después de que nos envíes tu información. En la mayoría de los casos entregamos el mismo día.</div></div>
        </div>
        <div class="iva-faq-item">
          <div class="iva-faq-q" onclick="toggleFaq(this)">¿IvA habla español e inglés? <span class="iva-faq-icon">+</span></div>
          <div class="iva-faq-a"><div class="iva-faq-a-inner">¡Sí! IvA detecta automáticamente el idioma en que te escribe tu cliente y responde en el mismo idioma. Funciona en español, inglés y otros idiomas también.</div></div>
        </div>
        <div class="iva-faq-item">
          <div class="iva-faq-q" onclick="toggleFaq(this)">¿Puedo cancelar cuando quiera? <span class="iva-faq-icon">+</span></div>
          <div class="iva-faq-a"><div class="iva-faq-a-inner">Sí. No hay contratos a largo plazo. Puedes cancelar tu suscripción mensual en cualquier momento. El primer mes siempre es gratis.</div></div>
        </div>
        <div class="iva-faq-item">
          <div class="iva-faq-q" onclick="toggleFaq(this)">¿Qué pasa después de que pago? <span class="iva-faq-icon">+</span></div>
          <div class="iva-faq-a"><div class="iva-faq-a-inner">Después del pago te contactamos por WhatsApp para recopilar la info de tu negocio. En 48 horas tu página está en vivo en ivamarai.com/tu-negocio. También recibes acceso a tu panel de admin para hacer cambios cuando quieras.</div></div>
        </div>
      </div>
    </div>
  </div>

  <!-- CTA -->
  <div class="iva-cta">
    <div class="iva-cta-glow"></div>
    <div class="iva-cta-inner">
      <h2>Sé el primero en tu área<br>en ofrecer <em>servicio con IA</em></h2>
      <p>Tus clientes ya están buscando negocios como el tuyo en internet. Dales la mejor experiencia — 24/7, en cualquier idioma.</p>
      <div class="iva-cta-btns">
        <a href="https://wa.me/18635216708" target="_blank" class="iva-btn-main">Hablar por WhatsApp →</a>
        <a href="/quote" class="iva-btn-ghost">Empezar ahora</a>
      </div>
    </div>
  </div>

  <div class="iva-footer">
    <div>© 2025 <strong>Ivamar AI LLC</strong> · 8 The Green, Suite B, Dover, DE 19901, USA · From USA to Around the World 🌎</div>
    <div class="iva-footer-links">
      <a href="/privacy">Privacy</a><a href="/terms">Terms</a>
      <a href="/about">About</a><a href="/contact">Contact</a>
    </div>
  </div>
</div>

<script>
function toggleFaq(el) {
  const item = el.parentElement;
  item.classList.toggle('open');
}
</script>
`;
