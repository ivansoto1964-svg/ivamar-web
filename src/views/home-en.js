module.exports = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ivamar AI — AI Assistant for Your Business</title>
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
.iva-section{padding:5rem 2rem;background:linear-gradient(135deg,#1a1a2e 0%,#0f3460 100%);}
.iva-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;}
.iva-tag{font-size:0.72rem;font-weight:700;color:#00C896;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.8rem;}
.iva-title{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:800;letter-spacing:-0.03em;color:#fff;margin-bottom:1rem;line-height:1.2;}
.iva-sub{font-size:0.95rem;color:rgba(255,255,255,0.6);line-height:1.8;margin-bottom:1.5rem;}
.iva-features{list-style:none;display:flex;flex-direction:column;gap:0.8rem;margin-bottom:2rem;}
.iva-features li{display:flex;align-items:flex-start;gap:0.7rem;font-size:0.85rem;color:rgba(255,255,255,0.7);}
.iva-features li::before{content:'✦';color:#00C896;flex-shrink:0;font-size:0.7rem;margin-top:3px;}
.iva-chat{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:20px;overflow:hidden;}
.iva-chat-header{padding:1rem 1.2rem;background:rgba(0,200,150,0.08);border-bottom:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;gap:0.8rem;}
.iva-avatar{width:36px;height:36px;background:linear-gradient(135deg,#00C896,#0088CC);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1rem;}
.iva-name{font-size:0.85rem;font-weight:700;color:#fff;}
.iva-online{font-size:0.65rem;color:#00C896;}
.iva-msgs{padding:1.2rem;display:flex;flex-direction:column;gap:0.8rem;min-height:200px;}
.iv-msg{max-width:85%;padding:0.75rem 1rem;font-size:0.82rem;line-height:1.6;}
.iv-bot{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);color:#fff;border-radius:4px 12px 12px 12px;align-self:flex-start;}
.iv-user{background:rgba(0,200,150,0.15);border:1px solid rgba(0,200,150,0.2);color:#fff;border-radius:12px 4px 12px 12px;align-self:flex-end;}
.iva-suggs{padding:0 1rem 0.8rem;display:flex;flex-wrap:wrap;gap:0.4rem;}
.iva-sugg{font-size:0.7rem;padding:0.3rem 0.7rem;border:1px solid rgba(255,255,255,0.12);border-radius:20px;color:rgba(255,255,255,0.5);cursor:pointer;transition:all 0.2s;background:transparent;font-family:'Plus Jakarta Sans',sans-serif;}
.iva-sugg:hover{border-color:#00C896;color:#00C896;}
.iva-input-row{padding:0.8rem;border-top:1px solid rgba(255,255,255,0.06);display:flex;gap:0.5rem;}
.iva-input{flex:1;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:0.6rem 0.9rem;color:#fff;font-size:0.78rem;outline:none;font-family:'Plus Jakarta Sans',sans-serif;}
.iva-input::placeholder{color:rgba(255,255,255,0.25);}
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
    <a href="#how">How It Works</a>
    <a href="#for">Who It's For</a>
    <a href="#pricing">Pricing</a>
    <a href="/en/assistant" class="nav-cta">Talk to IvA →</a>
  </div>
</nav>

<!-- HERO -->
<section class="hero">
  <div>
    <div class="hero-badge">
      <div class="hero-badge-dot"></div>
      <span class="hero-badge-text">Now available for local businesses</span>
    </div>
    <h1>Don't Lose More<br><em>Leads or Customers.</em></h1>
    <p class="hero-sub">With a simple link or QR code, your business can respond to customers, answer questions, and capture new leads automatically — 24/7, in any language.</p>
    <div class="hero-btns">
      <a href="/en/assistant" class="btn-primary">👋 Talk to IvA</a>
      <a href="#how" class="btn-ghost">See How It Works →</a>
    </div>
    <div class="hero-trust">
      <div class="trust-item"><span class="trust-icon">✦</span> Works 24/7</div>
      <div class="trust-item"><span class="trust-icon">✦</span> English & Spanish</div>
      <div class="trust-item"><span class="trust-icon">✦</span> No contracts</div>
      <div class="trust-item"><span class="trust-icon">✦</span> Setup in 48hrs</div>
    </div>
  </div>
  <div class="hero-visual">
    <div class="chat-mockup">
      <div class="mockup-header">
        <div class="mockup-avatar">🤖</div>
        <div>
          <div class="mockup-name">IvA — Your Business Assistant</div>
          <div class="mockup-status">● Online now · Responds instantly</div>
        </div>
      </div>
      <div class="mockup-msgs">
        <div class="m-msg m-bot">Hi! 👋 Welcome. I'm here to help answer your questions 24/7. What can I do for you today?</div>
        <div class="m-msg m-user">What are your hours?</div>
        <div class="m-msg m-bot">We're open Mon–Sat 9am to 7pm. Would you like to schedule an appointment or get more info? 😊</div>
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

<!-- HOW IT WORKS -->
<section class="how" id="how">
  <div class="how-inner">
    <div class="section-tag">Simple Process</div>
    <h2 class="section-title">How It <em>Works</em></h2>
    <p class="section-sub">Four simple steps — no tech knowledge required.</p>
    <div class="steps">
      <div class="step">
        <div class="step-num">🔗</div>
        <h3>Share Your Link or QR</h3>
        <p>Put your custom link or QR code on your flyers, social media, website or signs.</p>
        <div class="step-arrow">›</div>
      </div>
      <div class="step">
        <div class="step-num">💬</div>
        <h3>Customers Ask Questions</h3>
        <p>Customers tap the link and instantly start chatting — any time, any day.</p>
        <div class="step-arrow">›</div>
      </div>
      <div class="step">
        <div class="step-num">🤖</div>
        <h3>Assistant Responds</h3>
        <p>Your AI assistant answers naturally, in their language, 24 hours a day.</p>
        <div class="step-arrow">›</div>
      </div>
      <div class="step">
        <div class="step-num">📲</div>
        <h3>You Capture More Leads</h3>
        <p>Every inquiry is captured and sent to you — ready for follow-up.</p>
      </div>
    </div>
  </div>
</section>

<!-- PERFECT FOR -->
<section class="for-section" id="for">
  <div class="section-tag">Industries</div>
  <h2 class="section-title">Perfect <em>For</em></h2>
  <p class="section-sub">Any local business that wants to respond faster and capture more leads.</p>
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

<!-- MEET IVA -->
<section class="iva-section">
  <div class="iva-inner">
    <div>
      <div class="iva-tag">Meet Your Assistant</div>
      <h2 class="iva-title">Meet IvA 👋</h2>
      <p class="iva-sub">Talk with IvA right now and discover how this tool could help your business. IvA is friendly, natural, and speaks both English and Spanish.</p>
      <ul class="iva-features">
        <li>Answers customer questions instantly</li>
        <li>Guides customers naturally through the conversation</li>
        <li>Works 24/7 — even while you sleep</li>
        <li>Speaks English, Spanish and any language</li>
        <li>Works through links, QR codes or your website</li>
        <li>Captures leads and sends them to you automatically</li>
      </ul>
      <a href="/en/assistant" class="btn-primary" style="display:inline-flex;">👋 Talk to IvA Now</a>
    </div>
    <div class="iva-chat">
      <div class="iva-chat-header">
        <div class="iva-avatar">🤖</div>
        <div>
          <div class="iva-name">IvA — Ivamar AI</div>
          <div class="iva-online">● Online · Responds instantly</div>
        </div>
      </div>
      <div class="iva-msgs" id="ivaMsgs">
        <div class="iv-msg iv-bot">Hi 👋 Thanks for visiting Ivamar AI.<br><br>Many businesses lose customers simply because nobody responds fast enough.<br><br>Would you like to know if this tool could help your business? 😊</div>
      </div>
      <div class="iva-suggs">
        <button class="iva-sugg" onclick="ivaReply(this)">Yes, tell me more</button>
        <button class="iva-sugg" onclick="ivaReply(this)">How much does it cost?</button>
        <button class="iva-sugg" onclick="ivaReply(this)">I have a restaurant</button>
      </div>
      <div class="iva-input-row">
        <input class="iva-input" id="ivaInput" placeholder="Type here..." onkeydown="if(event.key==='Enter')ivaSend()">
        <button class="iva-send" onclick="ivaSend()">➤</button>
      </div>
    </div>
  </div>
</section>

<!-- YOUR OWN ASSISTANT -->
<section class="your-section">
  <div class="your-inner">
    <div class="section-tag">Custom Assistant</div>
    <h2 class="section-title">Your Business Gets Its Own <em>Assistant</em></h2>
    <p class="section-sub" style="margin:0 auto 1rem;">We create a digital assistant for your business — with the name and personality you choose. Your customers will love it. 😊</p>
    <div class="your-grid">
      <div class="your-card">
        <div class="your-icon">✏️</div>
        <h3>You Choose the Name</h3>
        <p>Name it anything — "Zoey", "LexIA", "Max" — whatever fits your brand.</p>
      </div>
      <div class="your-card">
        <div class="your-icon">🎭</div>
        <h3>Custom Personality</h3>
        <p>Friendly, professional, fun — your assistant matches your business style.</p>
      </div>
      <div class="your-card">
        <div class="your-icon">🌍</div>
        <h3>Any Language</h3>
        <p>Responds in English, Spanish, Portuguese, French — automatically.</p>
      </div>
      <div class="your-card">
        <div class="your-icon">📱</div>
        <h3>Share Anywhere</h3>
        <p>Link, QR code, website, Instagram bio, WhatsApp — works everywhere.</p>
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
      <div class="p-setup">+ $125 one-time setup · starting at</div>
      <ul class="p-features">
        <li>AI Assistant for your business</li>
        <li>English & Spanish</li>
        <li>Web integration or direct link</li>
        <li>Mobile-friendly</li>
        <li>Basic lead capture</li>
        <li>Basic business training</li>
      </ul>
      <button class="p-btn" onclick="window.location.href='/quote'">Get Started →</button>
    </div>
    <div class="p-card featured">
      <div class="p-name">Growth</div>
      <div class="p-price">$49<span>/mo</span></div>
      <div class="p-setup">+ $125 one-time setup · starting at</div>
      <ul class="p-features">
        <li>Everything in Starter</li>
        <li>WhatsApp Integration</li>
        <li>Enhanced AI Training</li>
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
const ivaResponses = {
  'yes, tell me more': "Great! 😊 IvA is a smart assistant we create specifically for your business. Customers can talk to it through a simple link or QR code — and it responds instantly, 24/7, even when you're busy or sleeping. What type of business do you have?",
  'how much does it cost?': "Simple pricing 😊 Setup starts at $125 (one-time) and the monthly plan starts from $29/month. No contracts, cancel anytime. Want to see a live demo for your specific business?",
  'i have a restaurant': "Perfect! 🍽️ For restaurants, IvA can answer questions about your menu, hours, reservations, and even help customers place orders directly via WhatsApp — without Uber Eats commissions. Would you like to see how it would look for your restaurant?",
  'default': "Thanks for that! 😊 The best way to understand how IvA could help your business is to experience it yourself. Click the button below to have a full conversation with IvA — it'll ask you about your business and show you exactly what's possible."
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
