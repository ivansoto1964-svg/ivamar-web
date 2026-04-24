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
      <img src="/logo-white.png" alt="Ivamar AI" style="height:28px;width:auto;">
      <span class="iva-logo-text">Ivamar <span>AI</span></span>
    </a>
    <ul class="iva-nav-links">
      <li><a href="#industries">Industries</a></li>
      <li><a href="#how">How it works</a></li>
      <li><a href="#pricing">Pricing</a></li>
      <li><a href="/demos">Demos</a></li>
      <li><a href="/about">About</a></li>
    </ul>
    <div class="iva-nav-right">
      <a href="/es" class="iva-lang-switch">ES · Español</a>
      <a href="/quote" class="iva-nav-cta">Get Started →</a>
    </div>
  </nav>

  <div class="iva-hero">
    <div class="iva-orb iva-orb-1"></div>
    <div class="iva-orb iva-orb-2"></div>
    <div class="iva-badge"><span class="iva-badge-dot"></span>FROM USA TO AROUND THE WORLD 🌎</div>
    <h1>The <em>Human Touch</em><br>of Intelligence</h1>
    <p class="iva-hero-sub">AI-powered pages for real businesses. Your customers ask questions, order, and pay — without you lifting a finger.</p>
    <div class="iva-hero-actions">
      <a href="/quote" class="iva-btn-main">Get Started →</a>
      <a href="/demos" class="iva-btn-ghost">See live demos</a>
    </div>
    <div class="iva-stats">
      <div class="iva-stat"><div class="iva-stat-num">$125<span></span></div><div class="iva-stat-label">One-time setup</div></div>
      <div class="iva-stat"><div class="iva-stat-num">$49<span>/mo</span></div><div class="iva-stat-label">Starting at</div></div>
      <div class="iva-stat"><div class="iva-stat-num">0<span>%</span></div><div class="iva-stat-label">Commission</div></div>
      <div class="iva-stat"><div class="iva-stat-num">24<span>/7</span></div><div class="iva-stat-label">IvA Assistant</div></div>
    </div>
  </div>

  <!-- INDUSTRIES -->
  <div class="iva-section iva-section-dark" id="industries">
    <div class="iva-inner">
      <div class="iva-section-label">Who we serve</div>
      <h2 class="iva-section-title">Built for <em>every</em> local business</h2>
      <div class="iva-industries">
        <a href="/quote" class="iva-industry"><span class="iva-industry-icon">🚚</span><div class="iva-industry-name">Food Trucks</div><div class="iva-industry-desc">Digital menu, WhatsApp orders and payments</div><span class="iva-industry-tag">$49/mo</span></a>
        <a href="/quote" class="iva-industry"><span class="iva-industry-icon">🍽</span><div class="iva-industry-name">Restaurants</div><div class="iva-industry-desc">Full menu, reservations and AI assistant</div><span class="iva-industry-tag">$49/mo</span></a>
        <a href="/quote" class="iva-industry"><span class="iva-industry-icon">💇</span><div class="iva-industry-name">Salons & Spas</div><div class="iva-industry-desc">Services, pricing and booking via WhatsApp</div><span class="iva-industry-tag">$49/mo</span></a>
        <a href="/quote" class="iva-industry"><span class="iva-industry-icon">🥐</span><div class="iva-industry-name">Bakeries & Cafés</div><div class="iva-industry-desc">Daily specials, orders and customer chat</div><span class="iva-industry-tag">$49/mo</span></a>
        <a href="/quote" class="iva-industry"><span class="iva-industry-icon">🚗</span><div class="iva-industry-name">Car Dealers</div><div class="iva-industry-desc">Inventory showcase, leads and financing info</div><span class="iva-industry-tag">$99/mo</span></a>
        <a href="/quote" class="iva-industry"><span class="iva-industry-icon">🏠</span><div class="iva-industry-name">Realtors</div><div class="iva-industry-desc">Property listings, lead capture and appointments</div><span class="iva-industry-tag">$99/mo</span></a>
        <a href="/quote" class="iva-industry"><span class="iva-industry-icon">🏥</span><div class="iva-industry-name">Medical & Dental</div><div class="iva-industry-desc">Services, appointments and patient questions</div><span class="iva-industry-tag">$99/mo</span></a>
        <a href="/quote" class="iva-industry"><span class="iva-industry-icon">⚖️</span><div class="iva-industry-name">Lawyers & Services</div><div class="iva-industry-desc">Practice areas, consultations and lead capture</div><span class="iva-industry-tag">$99/mo</span></a>
      </div>
    </div>
  </div>

  <!-- HOW IT WORKS -->
  <div class="iva-section iva-section-void" id="how">
    <div class="iva-inner">
      <div class="iva-section-label">The process</div>
      <h2 class="iva-section-title">Up and running in <em>48 hours</em></h2>
      <div class="iva-steps">
        <div class="iva-step"><div class="iva-step-num">01 / SETUP</div><span class="iva-step-icon">📋</span><div class="iva-step-title">Share your info</div><div class="iva-step-desc">Send us your logo, menu or services, prices and business details. We configure everything for you.</div></div>
        <div class="iva-step"><div class="iva-step-num">02 / LAUNCH</div><span class="iva-step-icon">🚀</span><div class="iva-step-title">Go live</div><div class="iva-step-desc">Your page is published on your custom link. IvA knows your business and is ready to serve customers 24/7.</div></div>
        <div class="iva-step"><div class="iva-step-num">03 / SELL</div><span class="iva-step-icon">💰</span><div class="iva-step-title">Customers order & pay</div><div class="iva-step-desc">IvA guides customers to WhatsApp or checkout. Payments go directly to your account. Zero commissions.</div></div>
      </div>
    </div>
  </div>

  <!-- FEATURES -->
  <div class="iva-section iva-section-dark">
    <div class="iva-inner">
      <div class="iva-section-label">What's included</div>
      <h2 class="iva-section-title">Everything your<br>business <em>needs</em></h2>
      <div class="iva-features">
        <div class="iva-feature"><div class="iva-feature-icon">🤖</div><div class="iva-feature-title">IvA — Your AI Assistant</div><div class="iva-feature-desc">Trained on your business. Answers questions, takes orders, and guides customers 24/7 in any language.</div><span class="iva-feature-tag">MULTILINGUAL</span></div>
        <div class="iva-feature"><div class="iva-feature-icon">📱</div><div class="iva-feature-title">Mobile-First Landing Page</div><div class="iva-feature-desc">Beautiful and fast, designed for phones. Your menu, services, photos and prices — all in one place.</div><span class="iva-feature-tag">OPTIMIZED FOR MOBILE</span></div>
        <div class="iva-feature"><div class="iva-feature-icon">💳</div><div class="iva-feature-title">Direct Payments</div><div class="iva-feature-desc">Accept Stripe, ATH Móvil, PayPal or Square. Money goes directly to your account — no middlemen.</div><span class="iva-feature-tag">0% COMMISSION</span></div>
        <div class="iva-feature"><div class="iva-feature-icon">📲</div><div class="iva-feature-title">WhatsApp Order Flow</div><div class="iva-feature-desc">Orders formatted and sent directly to your WhatsApp. No apps to download, no training needed.</div><span class="iva-feature-tag">INSTANT NOTIFICATIONS</span></div>
        <div class="iva-feature wide"><div class="iva-feature-icon">🔧</div><div class="iva-feature-title">Your Own Admin Panel — Edit Everything Yourself</div><div class="iva-feature-desc">Update your menu, prices, photos and hours anytime from your own admin panel. No code, no developers needed. Your page updates instantly.</div><span class="iva-feature-tag">NO CODE · INSTANT UPDATES · FULL CONTROL</span></div>
      </div>
    </div>
  </div>

  <!-- PRICING — DUAL PLANS -->
  <div class="iva-section iva-section-void" id="pricing">
    <div class="iva-inner" style="text-align:center">
      <div class="iva-section-label" style="justify-content:center">Pricing</div>
      <h2 class="iva-section-title">Simple. <em>Transparent.</em> Yours.</h2>
      <p style="color:#8892A4;margin-top:0.5rem;font-size:0.95rem;">All plans include $125 one-time setup · First month free</p>
      <div class="iva-pricing-grid">

        <!-- STANDARD -->
        <div class="iva-pricing-card">
          <div class="iva-pricing-badge standard">⚡ Standard</div>
          <div class="iva-pricing-plan-name">Basic Plan</div>
          <div class="iva-pricing-industries">Food trucks · Restaurants<br>Salons · Bakeries · Cafés</div>
          <div class="iva-price"><span class="iva-price-currency">$</span><span class="iva-price-amount">49</span><span class="iva-price-period">/mo</span></div>
          <p class="iva-price-setup">+ <strong>$125 setup</strong> · First month free</p>
          <ul class="iva-pricing-list">
            <li>Custom landing page</li>
            <li>IvA AI assistant 24/7</li>
            <li>WhatsApp order flow</li>
            <li>Payment integration</li>
            <li>Admin panel</li>
            <li>Multilingual support</li>
          </ul>
          <a href="/quote" class="iva-btn-pricing standard">Get started →</a>
        </div>

        <!-- PROFESSIONAL -->
        <div class="iva-pricing-card featured">
          <div class="iva-pricing-badge pro">🚀 Professional</div>
          <div class="iva-pricing-plan-name">Pro Plan</div>
          <div class="iva-pricing-industries">Car dealers · Realtors<br>Medical · Lawyers · Finance</div>
          <div class="iva-price"><span class="iva-price-currency">$</span><span class="iva-price-amount">99</span><span class="iva-price-period">/mo</span></div>
          <p class="iva-price-setup">+ <strong>$125 setup</strong> · First month free</p>
          <ul class="iva-pricing-list">
            <li>Everything in Basic</li>
            <li>Lead capture system</li>
            <li>Appointment booking</li>
            <li>Priority support</li>
            <li>Advanced IvA prompts</li>
            <li>Inventory showcase</li>
          </ul>
          <a href="/quote" class="iva-btn-pricing pro">Get started →</a>
        </div>

      </div>
    </div>
  </div>

  <!-- FAQ -->
  <div class="iva-section iva-section-dark">
    <div class="iva-inner">
      <div class="iva-section-label">FAQ</div>
      <h2 class="iva-section-title">Common <em>questions</em></h2>
      <div class="iva-faq">
        <div class="iva-faq-item">
          <div class="iva-faq-q" onclick="toggleFaq(this)">Do I need to know technology or coding? <span class="iva-faq-icon">+</span></div>
          <div class="iva-faq-a"><div class="iva-faq-a-inner">Not at all. We set everything up for you. You just send us your info — logo, menu, prices, hours — and your page is live in 48 hours. After that, you can update everything from your admin panel with no technical knowledge needed.</div></div>
        </div>
        <div class="iva-faq-item">
          <div class="iva-faq-q" onclick="toggleFaq(this)">How long does setup take? <span class="iva-faq-icon">+</span></div>
          <div class="iva-faq-a"><div class="iva-faq-a-inner">Your page is live within 48 hours after you send us your business information. In most cases we deliver same day.</div></div>
        </div>
        <div class="iva-faq-item">
          <div class="iva-faq-q" onclick="toggleFaq(this)">Does IvA speak Spanish and English? <span class="iva-faq-icon">+</span></div>
          <div class="iva-faq-a"><div class="iva-faq-a-inner">Yes! IvA automatically detects the language your customer writes in and responds in the same language. It works in Spanish, English, and other languages too.</div></div>
        </div>
        <div class="iva-faq-item">
          <div class="iva-faq-q" onclick="toggleFaq(this)">Can I cancel anytime? <span class="iva-faq-icon">+</span></div>
          <div class="iva-faq-a"><div class="iva-faq-a-inner">Yes. There are no long-term contracts. You can cancel your monthly subscription at any time. Your first month is always free.</div></div>
        </div>
        <div class="iva-faq-item">
          <div class="iva-faq-q" onclick="toggleFaq(this)">What happens after I pay? <span class="iva-faq-icon">+</span></div>
          <div class="iva-faq-a"><div class="iva-faq-a-inner">After payment we contact you via WhatsApp to collect your business info. Within 48 hours your page is live at ivamarai.com/your-business. You also get access to your admin panel to make changes anytime.</div></div>
        </div>
      </div>
    </div>
  </div>

  <!-- CTA -->
  <div class="iva-cta">
    <div class="iva-cta-glow"></div>
    <div class="iva-cta-inner">
      <h2>Be the first in your area<br>to offer <em>AI-powered service</em></h2>
      <p>Your customers are already looking for businesses like yours online. Give them the best experience — 24/7, in any language.</p>
      <div class="iva-cta-btns">
        <a href="https://wa.me/18635216708" target="_blank" class="iva-btn-main">Chat on WhatsApp →</a>
        <a href="/quote" class="iva-btn-ghost">Get started</a>
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
