module.exports = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400&display=swap');
.iva-quote{font-family:'Syne',sans-serif;background:#030508;color:#F0F4FF;margin:-20px;overflow-x:hidden;}
.iva-quote *{box-sizing:border-box;margin:0;padding:0;}
.iva-quote a{color:#00E5C8;text-decoration:none;}

/* NAV */
.iva-q-nav{padding:1.2rem 2rem;display:flex;align-items:center;justify-content:space-between;background:rgba(3,5,8,0.95);border-bottom:1px solid rgba(0,229,200,0.08);position:sticky;top:0;z-index:100;backdrop-filter:blur(12px);}
.iva-q-logo{display:flex;align-items:center;gap:0.6rem;text-decoration:none!important;}
.iva-q-logo-mark{width:30px;height:30px;border:1.5px solid #00E5C8;border-radius:7px;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:#00E5C8;background:rgba(0,229,200,0.06);}
.iva-q-logo-text{font-size:1rem;font-weight:700;color:#F0F4FF;letter-spacing:-0.02em;}
.iva-q-logo-text span{color:#00E5C8;}
.iva-q-back{font-size:0.82rem;color:#8892A4;border:1px solid rgba(255,255,255,0.1);padding:0.4rem 1rem;border-radius:6px;transition:all 0.2s;text-decoration:none!important;}
.iva-q-back:hover{color:#F0F4FF;border-color:rgba(255,255,255,0.25);}

/* HERO */
.iva-q-hero{padding:4rem 2rem 3rem;text-align:center;position:relative;overflow:hidden;}
.iva-q-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 0%,rgba(0,229,200,0.07),transparent 70%);pointer-events:none;}
.iva-q-tag{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:0.68rem;color:#00E5C8;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:1rem;padding:0.3rem 0.8rem;border:1px solid rgba(0,229,200,0.2);border-radius:4px;}
.iva-q-hero h1{font-size:clamp(2.2rem,5vw,3.5rem);font-weight:800;letter-spacing:-0.03em;line-height:1.05;margin-bottom:1rem;position:relative;}
.iva-q-hero h1 em{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;color:#00E5C8;}
.iva-q-hero p{color:#8892A4;font-size:1rem;line-height:1.7;max-width:480px;margin:0 auto;font-weight:400;position:relative;}

/* FORM CONTAINER */
.iva-q-content{max-width:680px;margin:0 auto;padding:2rem 2rem 5rem;}

.iva-q-card{background:#0D1420;border:1px solid rgba(255,255,255,0.06);border-radius:20px;padding:2.5rem;margin-bottom:1.5rem;position:relative;overflow:hidden;}
.iva-q-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#00E5C8,transparent);}

.iva-q-card-title{font-size:0.72rem;font-family:'JetBrains Mono',monospace;color:#00E5C8;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:1.5rem;display:flex;align-items:center;gap:0.5rem;}
.iva-q-card-title::before{content:'';width:16px;height:1px;background:#00E5C8;}

.iva-q-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;}
.iva-q-row.single{grid-template-columns:1fr;}

.iva-q-field{display:flex;flex-direction:column;gap:0.4rem;}
.iva-q-field label{font-size:0.75rem;color:#8892A4;letter-spacing:0.05em;font-weight:500;}
.iva-q-field input,
.iva-q-field select,
.iva-q-field textarea{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:0.75rem 1rem;color:#F0F4FF;font-family:'Syne',sans-serif;font-size:0.9rem;transition:border-color 0.2s,box-shadow 0.2s;outline:none;width:100%;}
.iva-q-field input:focus,
.iva-q-field select:focus,
.iva-q-field textarea:focus{border-color:#00E5C8;box-shadow:0 0 0 3px rgba(0,229,200,0.08);}
.iva-q-field select{cursor:pointer;-webkit-appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238892A4' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 1rem center;}
.iva-q-field select option{background:#0D1420;color:#F0F4FF;}
.iva-q-field textarea{resize:vertical;min-height:100px;line-height:1.6;}

/* PLAN SELECTOR */
.iva-q-plans{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;}
.iva-q-plan{border:1.5px solid rgba(255,255,255,0.08);border-radius:12px;padding:1.2rem;cursor:pointer;transition:all 0.2s;position:relative;}
.iva-q-plan:hover{border-color:rgba(0,229,200,0.3);}
.iva-q-plan.selected{border-color:#00E5C8;background:rgba(0,229,200,0.05);}
.iva-q-plan-name{font-size:0.95rem;font-weight:700;margin-bottom:0.3rem;}
.iva-q-plan-price{font-size:0.8rem;color:#00E5C8;font-family:'JetBrains Mono',monospace;margin-bottom:0.5rem;}
.iva-q-plan-desc{font-size:0.75rem;color:#8892A4;line-height:1.4;}
.iva-q-plan-check{position:absolute;top:0.8rem;right:0.8rem;width:20px;height:20px;border-radius:50%;border:1.5px solid rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;font-size:0.65rem;transition:all 0.2s;}
.iva-q-plan.selected .iva-q-plan-check{background:#00E5C8;border-color:#00E5C8;color:#030508;}

/* SUBMIT */
.iva-q-submit{width:100%;padding:1rem;background:#00E5C8;color:#030508;border:none;border-radius:12px;font-family:'Syne',sans-serif;font-weight:700;font-size:1.05rem;cursor:pointer;transition:all 0.25s;display:flex;align-items:center;justify-content:center;gap:0.6rem;margin-top:0.5rem;}
.iva-q-submit:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,229,200,0.3);}
.iva-q-submit:active{transform:translateY(0);}

.iva-q-note{text-align:center;font-size:0.78rem;color:#4A5568;margin-top:1rem;line-height:1.5;}

/* SUCCESS */
.iva-q-success{display:none;text-align:center;padding:4rem 2rem;}
.iva-q-success-icon{font-size:4rem;margin-bottom:1.5rem;}
.iva-q-success h2{font-size:2rem;font-weight:800;letter-spacing:-0.03em;margin-bottom:0.8rem;}
.iva-q-success h2 em{font-family:'Instrument Serif',serif;font-style:italic;color:#00E5C8;}
.iva-q-success p{color:#8892A4;line-height:1.7;max-width:400px;margin:0 auto 2rem;font-weight:400;}
.iva-q-success-btn{display:inline-flex;align-items:center;gap:0.5rem;background:#00E5C8;color:#030508;padding:0.8rem 2rem;border-radius:8px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;}
.iva-q-success-btn:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(0,229,200,0.25);}

.iva-q-footer{padding:2rem;border-top:1px solid rgba(255,255,255,0.04);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;font-size:0.78rem;color:#4A5568;}
.iva-q-footer strong{color:#8892A4;}
.iva-q-footer-links{display:flex;gap:1.2rem;}
.iva-q-footer-links a{color:#4A5568;text-decoration:none;transition:color 0.2s;}
.iva-q-footer-links a:hover{color:#00E5C8;}

@media(max-width:600px){
  .iva-q-row{grid-template-columns:1fr;}
  .iva-q-plans{grid-template-columns:1fr;}
  .iva-q-footer{flex-direction:column;text-align:center;}
}
</style>

<div class="iva-quote">
  <nav class="iva-q-nav">
    <a href="/" class="iva-q-logo">
      <div class="iva-q-logo-mark">IvA</div>
      <span class="iva-q-logo-text">Ivamar <span>AI</span></span>
    </a>
    <a href="/" class="iva-q-back">← Back</a>
  </nav>

  <div class="iva-q-hero">
    <div class="iva-q-tag">Get Started · Empezar</div>
    <h1>Let's build your<br><em>AI-powered page</em></h1>
    <p>Fill out the form below and we'll get back to you within 24 hours to get started. No commitment required.</p>
  </div>

  <div class="iva-q-content">

    <!-- FORM -->
    <div id="quoteForm">

      <!-- BUSINESS INFO -->
      <div class="iva-q-card">
        <div class="iva-q-card-title">Your business info</div>
        <div class="iva-q-row">
          <div class="iva-q-field">
            <label>Business Name *</label>
            <input type="text" id="qBizName" placeholder="El Rincón Boricua" />
          </div>
          <div class="iva-q-field">
            <label>Business Type *</label>
            <select id="qBizType">
              <option value="">Select type</option>
              <option>Food Truck</option>
              <option>Restaurant / Chinchorro</option>
              <option>Bakery / Panadería</option>
              <option>Cafetería</option>
              <option>Bar / Drinks</option>
              <option>Salon / Beauty</option>
              <option>Car Dealer</option>
              <option>Contractor / Services</option>
              <option>Retail Store</option>
              <option>Professional Services</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        <div class="iva-q-row single">
          <div class="iva-q-field">
            <label>Business Location</label>
            <input type="text" id="qLocation" placeholder="Caguas, PR · Orlando, FL · etc." />
          </div>
        </div>
      </div>

      <!-- CONTACT INFO -->
      <div class="iva-q-card">
        <div class="iva-q-card-title">Your contact info</div>
        <div class="iva-q-row">
          <div class="iva-q-field">
            <label>Your Name *</label>
            <input type="text" id="qName" placeholder="María González" />
          </div>
          <div class="iva-q-field">
            <label>WhatsApp Number *</label>
            <input type="tel" id="qPhone" placeholder="+1 (787) 000-0000" />
          </div>
        </div>
        <div class="iva-q-row single">
          <div class="iva-q-field">
            <label>Email (optional)</label>
            <input type="email" id="qEmail" placeholder="tu@email.com" />
          </div>
        </div>
      </div>

      <!-- PLAN -->
      <div class="iva-q-card">
        <div class="iva-q-card-title">Choose your plan</div>
        <div class="iva-q-plans">
          <div class="iva-q-plan selected" onclick="selectPlan(this,'IvA Chat — $125 setup + $49/mes')">
            <div class="iva-q-plan-check">✓</div>
            <div class="iva-q-plan-name">🤖 IvA Chat</div>
            <div class="iva-q-plan-price">$125 setup + $49/mo</div>
            <div class="iva-q-plan-desc">Landing page + AI assistant + WhatsApp flow</div>
          </div>
          <div class="iva-q-plan" onclick="selectPlan(this,'IvA + Orders — $125 setup + $49/mes')">
            <div class="iva-q-plan-check"></div>
            <div class="iva-q-plan-name">🛒 IvA + Orders</div>
            <div class="iva-q-plan-price">$125 setup + $49/mo</div>
            <div class="iva-q-plan-desc">Everything above + menu, cart & payments</div>
          </div>
        </div>
      </div>

      <!-- EXTRA INFO -->
      <div class="iva-q-card">
        <div class="iva-q-card-title">Anything else?</div>
        <div class="iva-q-row single">
          <div class="iva-q-field">
            <label>Tell us about your business (optional)</label>
            <textarea id="qNotes" placeholder="What do you sell? Any special requests? Preferred language for IvA?"></textarea>
          </div>
        </div>
      </div>

      <button class="iva-q-submit" onclick="submitQuote()">
        📲 Send via WhatsApp →
      </button>
      <p class="iva-q-note">You'll be redirected to WhatsApp with your info pre-filled. We respond within 24 hours. · Respondemos en menos de 24 horas.</p>

    </div>

    <!-- SUCCESS -->
    <div class="iva-q-success" id="quoteSuccess">
      <div class="iva-q-success-icon">🎉</div>
      <h2>You're all set,<br><em>let's build it!</em></h2>
      <p>Your request was sent via WhatsApp. We'll get back to you within 24 hours to get your page started.</p>
      <a href="/" class="iva-q-success-btn">← Back to Ivamar AI</a>
    </div>

  </div>

  <div class="iva-q-footer">
    <div>© 2025 <strong>Ivamar AI LLC</strong> · 8 The Green, Suite B, Dover, DE 19901</div>
    <div class="iva-q-footer-links">
      <a href="/privacy">Privacy</a>
      <a href="/terms">Terms</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </div>
  </div>
</div>

<script>
let selectedPlan = 'IvA Chat — $125 setup + $49/mes';

function selectPlan(el, plan) {
  document.querySelectorAll('.iva-q-plan').forEach(p => {
    p.classList.remove('selected');
    p.querySelector('.iva-q-plan-check').textContent = '';
  });
  el.classList.add('selected');
  el.querySelector('.iva-q-plan-check').textContent = '✓';
  selectedPlan = plan;
}

function submitQuote() {
  const bizName = document.getElementById('qBizName').value.trim();
  const bizType = document.getElementById('qBizType').value;
  const name = document.getElementById('qName').value.trim();
  const phone = document.getElementById('qPhone').value.trim();

  if (!bizName || !name || !phone) {
    alert('Please fill in: Business Name, Your Name and WhatsApp number.');
    return;
  }

  const location = document.getElementById('qLocation').value.trim();
  const email = document.getElementById('qEmail').value.trim();
  const notes = document.getElementById('qNotes').value.trim();

  let msg = '🌟 *NEW QUOTE REQUEST — Ivamar AI*\\n\\n';
  msg += '🏪 *Business:* ' + bizName + '\\n';
  if (bizType) msg += '📂 *Type:* ' + bizType + '\\n';
  if (location) msg += '📍 *Location:* ' + location + '\\n';
  msg += '\\n👤 *Contact:* ' + name + '\\n';
  msg += '📱 *WhatsApp:* ' + phone + '\\n';
  if (email) msg += '✉️ *Email:* ' + email + '\\n';
  msg += '\\n💼 *Plan:* ' + selectedPlan + '\\n';
  if (notes) msg += '\\n📝 *Notes:* ' + notes + '\\n';
  msg += '\\n---\\nSent from ivamarai.com/quote';

  window.open('https://wa.me/18635216708?text=' + encodeURIComponent(msg), '_blank');

  document.getElementById('quoteForm').style.display = 'none';
  document.getElementById('quoteSuccess').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>
`;
