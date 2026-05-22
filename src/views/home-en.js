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

/* PRICING */
.price-strip{padding:5rem 2rem;max-width:1100px;margin:0 auto;text-align:center;}
.price-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:3rem;}
.p-card{background:#fff;border:1px solid #f0f0f0;border-radius:16px;padding:2rem;text-align:left;transition:all 0.25s;position:relative;overflow:hidden;}
.p-card:hover{transform:translateY(-3px);box-shadow:0 12px 32px rgba(0,0,0,0.06);}
.p-card.featured{border-color:#00C896;box-shadow:0 0 0 1px #00C896;}
.p-card.featured::before{content:'Most Popular';position:absolute;top:0;right:0;background:#00C896;color:#fff;font-size:0.62rem;font-weight:700;padding:0.25rem 0.8rem;border-radius:0 14px 0 8px;}
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
    <div class="nav-logo-mark">AI</div>
    <span class="nav-logo-text">Ivamar <span>AI</span></span>
  </a>
  <div class="nav-links">
    <a href="#how">How It Works</a>
    <a href="#for">Who It's For</a>
    <a href="#pricing">Pricing</a>
    <a href="#iva">Meet IvA</a>
    <a href="/quote" class="nav-cta">Get Started →</a>
  </div>
</nav>

<!-- HERO -->
<section class="hero">
  <div>
    <div class="hero-badge">
      <div class="hero-badge-dot"></div>
      <span class="hero-badge-text">AI Assistants for Local Businesses</span>
    </div>
    <h1>We Build AI Assistants<br>for <em>Your Business.</em></h1>
    <p class="hero-sub">A smart assistant with your name, your personality, your language — available 24/7 through a simple link or QR code. Your customers get instant answers. You capture more leads automatically.</p>
    <div class="hero-btns">
      <a href="#pricing" class="btn-primary">See Pricing →</a>
      <a href="#how" class="btn-ghost">How It Works</a>
    </div>
    <div class="hero-trust">
      <div class="trust-item"><span class="trust-icon">✦</span> Works 24/7</div>
      <div class="trust-item"><span class="trust-icon">✦</span> Any language</div>
      <div class="trust-item"><span class="trust-icon">✦</span> No contracts</div>
      <div class="trust-item"><span class="trust-icon">✦</span> Setup in 48hrs</div>
    </div>
  </div>
  <div class="hero-visual">
    <div class="chat-mockup">
      <div class="mockup-header">
        <div class="mockup-avatar">🤖</div>
        <div>
          <div class="mockup-name">Zoey — Zoey's Pasta on the Go</div>
          <div class="mockup-status">● Online · Responds instantly</div>
        </div>
      </div>
      <div class="mockup-msgs">
        <div class="m-msg m-bot">Hi! 👋 Welcome to Zoey's Pasta. I'm Zoey! What can I help you with today?</div>
        <div class="m-msg m-user">Do you have gluten-free options?</div>
        <div class="m-msg m-bot">Yes! 😊 We offer gluten-free pasta on all our bowls. Our most popular is the Cavatappi with grilled chicken. Want to see the full menu?</div>
      </div>
      <div class="mockup-footer">
        <input class="mockup-input" placeholder="Type a message...">
        <button class="mockup-send">➤</button>
      </div>
    </div>
    <div class="qr-badge">
      <div class="qr-icon">📱</div>
      <div>
        <div class="qr-text">Share via QR or Link</div>
        <div class="qr-sub">Works on any device</div>
      </div>
    </div>
  </div>
</section>

<!-- PROBLEM -->
<section class="problem">
  <div class="problem-inner">
    <div class="section-tag">The Problem</div>
    <h2 class="section-title">Every Unanswered Message<br>Is a <em>Lost Customer.</em></h2>
    <p class="section-sub" style="margin:0 auto 1rem;">Customers expect instant answers — day or night. If you don't respond fast enough, they move on to the competition.</p>
    <div class="problem-stats">
      <div class="stat-card">
        <div class="stat-num">78%</div>
        <div class="stat-label">of customers buy from the business that responds first</div>
      </div>
      <div class="stat-card">
        <div class="stat-num">5min</div>
        <div class="stat-label">is the critical window — after that, leads go cold fast</div>
      </div>
      <div class="stat-card">
        <div class="stat-num">24/7</div>
        <div class="stat-label">is when your customers are searching — including 2am on a Sunday</div>
      </div>
    </div>
  </div>
</section>

<!-- HOW IT WORKS -->
<section class="how" id="how">
  <div class="how-inner">
    <div class="section-tag">Simple Process</div>
    <h2 class="section-title">How It <em>Works</em></h2>
    <p class="section-sub">Four simple steps — no tech knowledge required.</p>
    <div class="steps">
      <div class="step">
        <div class="step-num">🎯</div>
        <h3>We Build Your Assistant</h3>
        <p>We train your assistant with your business info, services, prices, hours and personality.</p>
        <div class="step-arrow">›</div>
      </div>
      <div class="step">
        <div class="step-num">🔗</div>
        <h3>You Get a Link & QR</h3>
        <p>Share it on your flyers, social media, website, signs or WhatsApp bio.</p>
        <div class="step-arrow">›</div>
      </div>
      <div class="step">
        <div class="step-num">💬</div>
        <h3>Customers Chat Instantly</h3>
        <p>Your assistant responds naturally 24/7 — answering questions, guiding and capturing leads.</p>
        <div class="step-arrow">›</div>
      </div>
      <div class="step">
        <div class="step-num">📲</div>
        <h3>You Get the Leads</h3>
        <p>Every inquiry is captured and sent to you — ready for follow-up when you want.</p>
      </div>
    </div>
  </div>
</section>

<!-- PERFECT FOR -->
<section class="for-section" id="for">
  <div class="section-tag">Industries</div>
  <h2 class="section-title">Perfect <em>For</em></h2>
  <p class="section-sub">Any local business that wants to respond faster and capture more leads automatically.</p>
  <div class="biz-grid">
    <div class="biz-card"><div class="biz-icon">🏠</div><div class="biz-name">Realtors</div></div>
    <div class="biz-card"><div class="biz-icon">🍽️</div><div class="biz-name">Restaurants</div></div>
    <div class="biz-card"><div class="biz-icon">🚚</div><div class="biz-name">Food Trucks</div></div>
    <div class="biz-card"><div class="biz-icon">🔨</div><div class="biz-name">Contractors</div></div>
    <div class="biz-card"><div class="biz-icon">⚖️</div><div class="biz-name">Law Firms</div></div>
    <div class="biz-card"><div class="biz-icon">🏥</div><div class="biz-name">Clinics</div></div>
    <div class="biz-card"><div class="biz-icon">💅</div><div class="biz-name">Salons & Spas</div></div>
    <div class="biz-card"><div class="biz-icon">🚗</div><div class="biz-name">Car Dealers</div></div>
    <div class="biz-card"><div class="biz-icon">❄️</div><div class="biz-name">AC & HVAC</div></div>
    <div class="biz-card"><div class="biz-icon">💰</div><div class="biz-name">Financial</div></div>
    <div class="biz-card"><div class="biz-icon">🐾</div><div class="biz-name">Pet Shops</div></div>
    <div class="biz-card"><div class="biz-icon">✨</div><div class="biz-name">Any Business</div></div>
  </div>
</section>

<!-- FEATURES -->
<section class="features-section">
  <div class="features-inner">
    <div class="section-tag">What's Included</div>
    <h2 class="section-title">Everything Your Assistant <em>Can Do</em></h2>
    <p class="section-sub">Your assistant is fully trained on your business and ready to work from day one.</p>
    <div class="features-grid">
      <div class="feat-card">
        <div class="feat-icon">💬</div>
        <h3>Answers Questions 24/7</h3>
        <p>Responds to customer questions about your services, prices, hours and availability — instantly, any time of day.</p>
        <span class="feat-tag">Always On</span>
      </div>
      <div class="feat-card">
        <div class="feat-icon">🌍</div>
        <h3>Any Language</h3>
        <p>Automatically responds in English, Spanish, Portuguese, French or any language your customer writes in.</p>
        <span class="feat-tag">Multilingual</span>
      </div>
      <div class="feat-card">
        <div class="feat-icon">📲</div>
        <h3>Captures Leads Automatically</h3>
        <p>Asks for name, phone and email naturally during the conversation. Every lead sent to you instantly.</p>
        <span class="feat-tag">Lead Generation</span>
      </div>
      <div class="feat-card">
        <div class="feat-icon">🔗</div>
        <h3>Works Everywhere</h3>
        <p>Share via link, QR code, website embed, Instagram bio, Facebook or WhatsApp. One assistant, everywhere.</p>
        <span class="feat-tag">Multi-Channel</span>
      </div>
      <div class="feat-card">
        <div class="feat-icon">🎭</div>
        <h3>Your Name & Personality</h3>
        <p>Your assistant gets the name and style you choose. Customers interact with your brand, not a generic bot.</p>
        <span class="feat-tag">Fully Custom</span>
      </div>
      <div class="feat-card">
        <div class="feat-icon">⚡</div>
        <h3>Ready in 48 Hours</h3>
        <p>Send us your business info and we build, train and launch your assistant within 48 hours.</p>
        <span class="feat-tag">Fast Setup</span>
      </div>
    </div>
  </div>
</section>

<!-- PRICING -->
<section class="price-strip" id="pricing">
  <div class="section-tag">Simple Pricing</div>
  <h2 class="section-title">Clear & <em>Transparent</em> Pricing</h2>
  <p class="section-sub" style="margin:0 auto 1rem;">No hidden fees. No contracts. Cancel anytime.</p>
  <div class="price-cards">
    <div class="p-card">
      <div class="p-name">Starter</div>
      <div class="p-price">$29<span>/mo</span></div>
      <div class="p-setup">+ $125 one-time setup</div>
      <ul class="p-features">
        <li>AI Assistant for your business</li>
        <li>English & Spanish</li>
        <li>Direct link + QR code</li>
        <li>Web integration</li>
        <li>Lead capture</li>
        <li>Email support</li>
      </ul>
      <button class="p-btn" onclick="window.location.href='/quote'">Get Started →</button>
    </div>
    <div class="p-card featured">
      <div class="p-name">Growth</div>
      <div class="p-price">$49<span>/mo</span></div>
      <div class="p-setup">+ $125 one-time setup</div>
      <ul class="p-features">
        <li>Everything in Starter</li>
        <li>WhatsApp Integration</li>
        <li>Advanced AI Training</li>
        <li>Higher usage capacity</li>
        <li>Advanced lead capture</li>
        <li>Priority support</li>
      </ul>
      <button class="p-btn" onclick="window.location.href='/quote'">Get Started →</button>
    </div>
    <div class="p-card">
      <div class="p-name">Premium</div>
      <div class="p-price" style="font-size:1.6rem;">Custom</div>
      <div class="p-setup">Based on your needs</div>
      <ul class="p-features">
        <li>Law firms & clinics</li>
        <li>Financial services</li>
        <li>Hotels & chains</li>
        <li>Advanced integrations</li>
        <li>Custom workflows</li>
        <li>Premium onboarding</li>
      </ul>
      <button class="p-btn" onclick="window.open('https://wa.me/18635216708','_blank')">Contact Us →</button>
    </div>
  </div>
</section>

<!-- MEET IVA -->
<section class="iva-section" id="iva">
  <div class="iva-inner">
    <div>
      <div class="iva-tag">Meet IvA</div>
      <h2 class="iva-title">This is <em>IvA</em> 👋</h2>
      <p class="iva-sub">IvA is the AI assistant built by Ivamar AI. Talk to her right here — she's exactly what your business assistant would feel like.</p>
      <div class="iva-note">
        <strong>💡 Your assistant would work just like IvA</strong> — but with your business name, your services, your personality and the name you choose. Could be "Zoey", "LexIA", "Max" — anything you want.
      </div>
      <ul class="iva-features">
        <li>Trained on your specific business</li>
        <li>Responds naturally like a real person</li>
        <li>Available 24/7 without you lifting a finger</li>
        <li>Speaks any language automatically</li>
        <li>Captures leads and sends them to you</li>
      </ul>
      <a href="/quote" class="btn-green">Get Your Own Assistant →</a>
    </div>
    <div class="iva-chat">
      <div class="iva-chat-header">
        <div class="iva-avatar">🤖</div>
        <div>
          <div class="iva-name">IvA — Ivamar AI Assistant</div>
          <div class="iva-online">● Online · Responds instantly</div>
        </div>
      </div>
      <div class="iva-msgs" id="ivaMsgs">
        <div class="iv-msg iv-bot">Hi there! 👋 I'm IvA, the assistant built by Ivamar AI.<br><br>I'm here to show you what an AI assistant can do for your business. What type of business do you have? 😊</div>
      </div>
      <div class="iva-suggs">
        <button class="iva-sugg" onclick="ivaReply(this)">I'm a realtor</button>
        <button class="iva-sugg" onclick="ivaReply(this)">I have a restaurant</button>
        <button class="iva-sugg" onclick="ivaReply(this)">How much does it cost?</button>
      </div>
      <div class="iva-input-row">
        <input class="iva-input" id="ivaInput" placeholder="Tell me about your business..." onkeydown="if(event.key==='Enter')ivaSend()">
        <button class="iva-send" onclick="ivaSend()">➤</button>
      </div>
    </div>
  </div>
</section>

<!-- CTA FINAL -->
<section class="cta-final">
  <h2>Ready to Stop <em>Losing Leads?</em></h2>
  <p>Get your AI assistant set up in 48 hours. No contracts. Cancel anytime.</p>
  <a href="/quote" class="btn-green">Get Started Today →</a>
</section>

<!-- FOOTER -->
<footer>
  <div>
    <div class="footer-brand">Ivamar <span>AI</span> LLC</div>
    <div style="font-size:0.72rem;color:#bbb;margin-top:0.2rem;">Delaware, USA · ivamarai.com</div>
  </div>
  <div class="footer-links">
    <a href="/about">About</a>
    <a href="/privacy">Privacy</a>
    <a href="/terms">Terms</a>
    <a href="/contact">Contact</a>
    <a href="/es">Español</a>
  </div>
  <div class="footer-copy">© 2025 Ivamar AI LLC · All rights reserved</div>
</footer>

<script>
let ivaHistory = [];
let ivaTyping = false;

async function callIvA(message) {
  try {
    const response = await fetch('/api/iva-sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history: ivaHistory, lang: 'en', context: {} })
    });
    const data = await response.json();
    const reply = data.reply || 'Sorry, I had a technical issue. Please reach us directly.';
    ivaHistory.push({ role: 'user', content: message });
    ivaHistory.push({ role: 'assistant', content: reply });
    if (ivaHistory.length > 20) ivaHistory = ivaHistory.slice(-20);
    return reply;
  } catch(e) { return 'Sorry, I had a technical issue. Please reach us directly.'; }
}

function showTyping() {
  const msgs = document.getElementById('ivaMsgs');
  const div = document.createElement('div');
  div.className = 'iv-msg iv-bot';
  div.id = 'ivaTypingIndicator';
  div.innerHTML = '<span style="opacity:0.5">IvA is typing...</span>';
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
