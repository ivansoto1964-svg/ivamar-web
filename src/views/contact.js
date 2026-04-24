module.exports = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400&display=swap');
.contact-page{font-family:'Syne',sans-serif;background:#030508;color:#F0F4FF;margin:-20px;overflow-x:hidden;}
.contact-page *{box-sizing:border-box;margin:0;padding:0;}
.contact-nav{padding:1.2rem 2rem;display:flex;align-items:center;justify-content:space-between;background:rgba(3,5,8,0.95);border-bottom:1px solid rgba(0,229,200,0.08);position:sticky;top:0;z-index:100;backdrop-filter:blur(12px);}
.contact-logo{display:flex;align-items:center;gap:0.7rem;text-decoration:none;}
.contact-back{font-size:0.82rem;color:#8892A4;border:1px solid rgba(255,255,255,0.1);padding:0.4rem 1rem;border-radius:6px;text-decoration:none;transition:all 0.2s;}
.contact-back:hover{color:#F0F4FF;border-color:rgba(255,255,255,0.25);}
.contact-hero{padding:5rem 2rem 3rem;text-align:center;position:relative;overflow:hidden;}
.contact-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 0%,rgba(0,229,200,0.07),transparent 70%);pointer-events:none;}
.contact-tag{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:0.68rem;color:#00E5C8;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:1rem;padding:0.3rem 0.8rem;border:1px solid rgba(0,229,200,0.2);border-radius:4px;}
.contact-hero h1{font-size:clamp(2.2rem,5vw,3.5rem);font-weight:800;letter-spacing:-0.03em;line-height:1.05;margin-bottom:1rem;position:relative;}
.contact-hero h1 em{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;color:#00E5C8;}
.contact-hero p{color:#8892A4;font-size:1rem;line-height:1.7;max-width:480px;margin:0 auto;font-weight:400;position:relative;}
.contact-content{max-width:800px;margin:0 auto;padding:3rem 2rem 5rem;}
.contact-options{display:grid;grid-template-columns:repeat(2,1fr);gap:1.2rem;margin-bottom:3rem;}
.contact-option{background:#0D1420;border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:1.8rem;transition:all 0.3s;position:relative;overflow:hidden;}
.contact-option::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#00E5C8,transparent);opacity:0;transition:opacity 0.3s;}
.contact-option:hover{border-color:rgba(0,229,200,0.2);transform:translateY(-3px);}
.contact-option:hover::before{opacity:1;}
.contact-option-icon{font-size:2rem;margin-bottom:1rem;}
.contact-option-title{font-size:1rem;font-weight:700;margin-bottom:0.4rem;}
.contact-option-desc{font-size:0.83rem;color:#8892A4;line-height:1.6;margin-bottom:1.2rem;font-weight:400;}
.contact-option-btn{display:inline-flex;align-items:center;gap:0.5rem;padding:0.65rem 1.2rem;border-radius:8px;font-weight:700;font-size:0.85rem;text-decoration:none;transition:all 0.2s;border:none;cursor:pointer;}
.contact-option-btn.primary{background:#00E5C8;color:#030508;}
.contact-option-btn.primary:hover{box-shadow:0 6px 20px rgba(0,229,200,0.25);transform:translateY(-1px);}
.contact-option-btn.ghost{background:transparent;color:#00E5C8;border:1px solid rgba(0,229,200,0.3);}
.contact-option-btn.ghost:hover{background:rgba(0,229,200,0.08);}
.contact-option-btn.wa{background:#25D366;color:white;}
.contact-option-btn.wa:hover{background:#20bd5a;transform:translateY(-1px);}
.contact-info{background:#080C12;border:1px solid rgba(255,255,255,0.05);border-radius:16px;padding:2rem;margin-bottom:2rem;}
.contact-info-title{font-family:'JetBrains Mono',monospace;font-size:0.7rem;color:#00E5C8;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:1.5rem;display:flex;align-items:center;gap:0.5rem;}
.contact-info-title::before{content:'';width:16px;height:1px;background:#00E5C8;}
.contact-info-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:0.8rem;}
.contact-info-item{display:flex;flex-direction:column;gap:0.2rem;}
.contact-info-label{font-family:'JetBrains Mono',monospace;font-size:0.62rem;color:#4A5568;letter-spacing:0.1em;text-transform:uppercase;}
.contact-info-value{font-size:0.88rem;color:#F0F4FF;font-weight:500;}
.contact-footer{background:#030508;padding:2rem 2.5rem;border-top:1px solid rgba(255,255,255,0.04);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;font-size:0.8rem;color:#4A5568;}
.contact-footer strong{color:#8892A4;}
.contact-footer-links{display:flex;gap:1.5rem;}
.contact-footer-links a{color:#4A5568;text-decoration:none;transition:color 0.2s;}
.contact-footer-links a:hover{color:#00E5C8;}
@media(max-width:600px){.contact-options{grid-template-columns:1fr;}.contact-info-grid{grid-template-columns:1fr;}.contact-footer{flex-direction:column;text-align:center;}}
</style>

<div class="contact-page">
  <nav class="contact-nav">
    <a href="/en" class="contact-logo">
      <img src="/logo-white.png" alt="Ivamar AI" style="height:28px;width:auto;">
    </a>
    <a href="/en" class="contact-back">← Back</a>
  </nav>

  <div class="contact-hero">
    <div class="contact-tag">Contact</div>
    <h1>Let's talk about<br><em>your business</em></h1>
    <p>We're here to help. Message us on WhatsApp and we'll respond quickly — in English or Spanish.</p>
  </div>

  <div class="contact-content">

    <div class="contact-options">

      <div class="contact-option">
        <div class="contact-option-icon">📲</div>
        <div class="contact-option-title">WhatsApp (fastest)</div>
        <div class="contact-option-desc">The fastest way to reach us. We respond within minutes during business hours.</div>
        <a href="https://wa.me/18635216708" target="_blank" class="contact-option-btn wa">Open WhatsApp →</a>
      </div>

      <div class="contact-option">
        <div class="contact-option-icon">📋</div>
        <div class="contact-option-title">Request your page</div>
        <div class="contact-option-desc">Ready to get started? Fill out the form, choose your plan and pay securely with Stripe.</div>
        <a href="/quote" class="contact-option-btn primary">Get started →</a>
      </div>

      <div class="contact-option">
        <div class="contact-option-icon">🌐</div>
        <div class="contact-option-title">See Live Demos</div>
        <div class="contact-option-desc">See real examples of how an Ivamar AI page works for different types of businesses.</div>
        <a href="/demos" class="contact-option-btn ghost">View Demos →</a>
      </div>

      <div class="contact-option">
        <div class="contact-option-icon">💼</div>
        <div class="contact-option-title">Partners & Resellers</div>
        <div class="contact-option-desc">Want to offer Ivamar AI to your clients? Ask us about our partner program.</div>
        <a href="https://wa.me/18635216708?text=Hi%2C%20I'm%20interested%20in%20the%20Ivamar%20AI%20partner%20program" target="_blank" class="contact-option-btn ghost">Become a Partner →</a>
      </div>

    </div>

    <div class="contact-info">
      <div class="contact-info-title">Company information</div>
      <div class="contact-info-grid">
        <div class="contact-info-item">
          <div class="contact-info-label">Company</div>
          <div class="contact-info-value">Ivamar AI LLC</div>
        </div>
        <div class="contact-info-item">
          <div class="contact-info-label">State</div>
          <div class="contact-info-value">Delaware, USA</div>
        </div>
        <div class="contact-info-item">
          <div class="contact-info-label">Reach</div>
          <div class="contact-info-value">From USA to Around the World 🌎</div>
        </div>
        <div class="contact-info-item">
          <div class="contact-info-label">Languages</div>
          <div class="contact-info-value">English · Español</div>
        </div>
        <div class="contact-info-item">
          <div class="contact-info-label">Hours</div>
          <div class="contact-info-value">Mon–Fri 9am–6pm · IvA 24/7</div>
        </div>
        <div class="contact-info-item">
          <div class="contact-info-label">WhatsApp</div>
          <div class="contact-info-value">+1 (863) 521-6708</div>
        </div>
        <div class="contact-info-item">
          <div class="contact-info-label">Email</div>
          <div class="contact-info-value">connect@ivamarai.com</div>
        </div>
        <div class="contact-info-item">
          <div class="contact-info-label">Website</div>
          <div class="contact-info-value">ivamarai.com</div>
        </div>
      </div>
    </div>

  </div>

  <div class="contact-footer">
    <div>© 2025 <strong>Ivamar AI LLC</strong> · 8 The Green, Suite B, Dover, DE 19901, USA · From USA to Around the World 🌎</div>
    <div class="contact-footer-links">
      <a href="/privacy">Privacy</a>
      <a href="/terms">Terms</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </div>
  </div>
</div>
`;
