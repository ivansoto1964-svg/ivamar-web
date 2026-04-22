module.exports = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400&display=swap');
.iva-quote{font-family:'Syne',sans-serif;background:#030508;color:#F0F4FF;margin:-20px;overflow-x:hidden;}
.iva-quote *{box-sizing:border-box;margin:0;padding:0;}
.iva-quote a{color:#00E5C8;text-decoration:none;}
.iva-q-nav{padding:1.2rem 2rem;display:flex;align-items:center;justify-content:space-between;background:rgba(3,5,8,0.95);border-bottom:1px solid rgba(0,229,200,0.08);position:sticky;top:0;z-index:100;backdrop-filter:blur(12px);}
.iva-q-logo{display:flex;align-items:center;gap:0.6rem;text-decoration:none!important;}
.iva-q-logo-mark{width:30px;height:30px;border:1.5px solid #00E5C8;border-radius:7px;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:#00E5C8;background:rgba(0,229,200,0.06);}
.iva-q-logo-text{font-size:1rem;font-weight:700;color:#F0F4FF;letter-spacing:-0.02em;}
.iva-q-logo-text span{color:#00E5C8;}
.iva-q-back{font-size:0.82rem;color:#8892A4;border:1px solid rgba(255,255,255,0.1);padding:0.4rem 1rem;border-radius:6px;transition:all 0.2s;text-decoration:none!important;}
.iva-q-back:hover{color:#F0F4FF;border-color:rgba(255,255,255,0.25);}
.iva-q-hero{padding:4rem 2rem 3rem;text-align:center;position:relative;overflow:hidden;}
.iva-q-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 0%,rgba(0,229,200,0.07),transparent 70%);pointer-events:none;}
.iva-q-tag{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:0.68rem;color:#00E5C8;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:1rem;padding:0.3rem 0.8rem;border:1px solid rgba(0,229,200,0.2);border-radius:4px;}
.iva-q-hero h1{font-size:clamp(2.2rem,5vw,3.5rem);font-weight:800;letter-spacing:-0.03em;line-height:1.05;margin-bottom:1rem;position:relative;}
.iva-q-hero h1 em{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;color:#00E5C8;}
.iva-q-hero p{color:#8892A4;font-size:1rem;line-height:1.7;max-width:480px;margin:0 auto;font-weight:400;position:relative;}
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

/* PRICING ALERT */
.iva-q-price-alert{background:rgba(0,229,200,0.06);border:1px solid rgba(0,229,200,0.2);border-radius:12px;padding:1rem 1.2rem;margin-bottom:1.5rem;display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap;}
.iva-q-price-alert-text{font-size:0.85rem;color:#8892A4;}
.iva-q-price-alert-text strong{color:#F0F4FF;}
.iva-q-price-badge{font-family:'JetBrains Mono',monospace;font-size:0.8rem;color:#00E5C8;background:rgba(0,229,200,0.1);border:1px solid rgba(0,229,200,0.3);padding:0.3rem 0.8rem;border-radius:100px;white-space:nowrap;}

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

/* STRIPE BUTTON */
.iva-q-stripe-btn{width:100%;padding:1rem;background:linear-gradient(135deg,#635BFF,#4B44CC);color:white;border:none;border-radius:12px;font-family:'Syne',sans-serif;font-weight:700;font-size:1rem;cursor:pointer;transition:all 0.25s;display:flex;align-items:center;justify-content:center;gap:0.6rem;margin-bottom:0.8rem;text-decoration:none;}
.iva-q-stripe-btn:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(99,91,255,0.3);}
.iva-q-wa-btn{width:100%;padding:1rem;background:linear-gradient(135deg,#25D366,#128C7E);color:white;border:none;border-radius:12px;font-family:'Syne',sans-serif;font-weight:700;font-size:1rem;cursor:pointer;transition:all 0.25s;display:flex;align-items:center;justify-content:center;gap:0.6rem;text-decoration:none;}
.iva-q-wa-btn:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(37,211,102,0.25);}
.iva-q-divider{text-align:center;font-size:0.78rem;color:#4A5568;margin:0.8rem 0;letter-spacing:0.05em;}

.iva-q-note{text-align:center;font-size:0.78rem;color:#4A5568;margin-top:1rem;line-height:1.5;}

/* STRIPE INFO BOX */
.iva-q-stripe-info{background:rgba(99,91,255,0.06);border:1px solid rgba(99,91,255,0.2);border-radius:12px;padding:1rem 1.2rem;margin-bottom:1.5rem;display:flex;align-items:flex-start;gap:0.8rem;}
.iva-q-stripe-info-icon{font-size:1.2rem;flex-shrink:0;margin-top:0.1rem;}
.iva-q-stripe-info-text{font-size:0.82rem;color:#8892A4;line-height:1.6;}
.iva-q-stripe-info-text strong{color:#F0F4FF;}

.iva-q-footer{padding:2rem;border-top:1px solid rgba(255,255,255,0.04);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;font-size:0.78rem;color:#4A5568;}
.iva-q-footer strong{color:#8892A4;}
.iva-q-footer-links{display:flex;gap:1.2rem;}
.iva-q-footer-links a{color:#4A5568;text-decoration:none;transition:color 0.2s;}
.iva-q-footer-links a:hover{color:#00E5C8;}
@media(max-width:600px){.iva-q-row{grid-template-columns:1fr;}.iva-q-plans{grid-template-columns:1fr;}.iva-q-footer{flex-direction:column;text-align:center;}}
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
    <p>Fill out the form, choose your plan and pay securely with Stripe. Your page will be live in 48 hours.</p>
  </div>

  <div class="iva-q-content">

    <!-- BUSINESS INFO -->
    <div class="iva-q-card">
      <div class="iva-q-card-title">Your business info</div>
      <div class="iva-q-row">
        <div class="iva-q-field">
          <label>Business Name *</label>
          <input type="text" id="qBizName" placeholder="La Plaza Restaurant" />
        </div>
        <div class="iva-q-field">
          <label>Business Type *</label>
          <select id="qBizType" onchange="updatePricing()">
            <option value="">Select type / Selecciona</option>
            <optgroup label="🍽 Food & Beverage">
              <option value="food_basic">Food Truck</option>
              <option value="food_basic">Restaurant / Chinchorro</option>
              <option value="food_basic">Bakery / Panadería</option>
              <option value="food_basic">Cafetería</option>
              <option value="food_basic">Bar / Drinks</option>
              <option value="food_basic">Kiosko / Street Food</option>
            </optgroup>
            <optgroup label="💇 Beauty & Wellness">
              <option value="beauty_basic">Salon / Barbershop</option>
              <option value="beauty_basic">Spa / Nails</option>
              <option value="beauty_basic">Gym / Fitness</option>
            </optgroup>
            <optgroup label="🚗 Automotive">
              <option value="auto_pro">Car Dealer / Dealer de Autos</option>
              <option value="auto_pro">Auto Repair / Mecánica</option>
              <option value="auto_pro">Car Rental</option>
            </optgroup>
            <optgroup label="🏠 Real Estate">
              <option value="realtor_pro">Realtor / Agente de Bienes Raíces</option>
              <option value="realtor_pro">Property Manager</option>
              <option value="realtor_pro">Home Services / Contractor</option>
            </optgroup>
            <optgroup label="🏥 Health & Medical">
              <option value="medical_pro">Doctor / Médico General</option>
              <option value="medical_pro">Dentist / Dentista</option>
              <option value="medical_pro">Therapist / Terapeuta</option>
              <option value="medical_pro">Veterinarian / Veterinario</option>
              <option value="medical_pro">Pharmacy / Farmacia</option>
            </optgroup>
            <optgroup label="⚖️ Professional Services">
              <option value="legal_pro">Lawyer / Abogado</option>
              <option value="legal_pro">Accountant / Contador</option>
              <option value="legal_pro">Insurance Agent</option>
              <option value="legal_pro">Financial Advisor</option>
            </optgroup>
            <optgroup label="🏪 Retail & Other">
              <option value="retail_basic">Retail Store / Tienda</option>
              <option value="retail_basic">Photography / Fotógrafo</option>
              <option value="retail_basic">Event Planner</option>
              <option value="retail_basic">Other / Otro</option>
            </optgroup>
          </select>
        </div>
      </div>

      <div class="iva-q-price-alert" id="priceAlert" style="display:none;">
        <div class="iva-q-price-alert-text">
          Recommended plan for <strong id="alertBizType">your business</strong>:
          <span id="alertPlanName" style="color:#00E5C8;font-weight:600;"></span>
        </div>
        <div class="iva-q-price-badge" id="alertPrice"></div>
      </div>

      <div class="iva-q-row single">
        <div class="iva-q-field">
          <label>Location / Ubicación</label>
          <input type="text" id="qLocation" placeholder="Miami, FL · Caguas, PR · etc." />
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
          <label>WhatsApp *</label>
          <input type="tel" id="qPhone" placeholder="+1 (305) 000-0000" />
        </div>
      </div>
      <div class="iva-q-row single">
        <div class="iva-q-field">
          <label>Email *</label>
          <input type="email" id="qEmail" placeholder="tu@email.com" />
        </div>
      </div>
    </div>

    <!-- PLAN SELECTOR -->
    <div class="iva-q-card">
      <div class="iva-q-card-title">Choose your plan</div>
      <div class="iva-q-plans">
        <div class="iva-q-plan selected" id="plan1" onclick="selectPlan(this,'IvA Chat')">
          <div class="iva-q-plan-check">✓</div>
          <div class="iva-q-plan-name">🤖 IvA Chat</div>
          <div class="iva-q-plan-price" id="plan1Price">$125 setup + $49/mo</div>
          <div class="iva-q-plan-desc">Landing page + AI assistant + WhatsApp flow</div>
        </div>
        <div class="iva-q-plan" id="plan2" onclick="selectPlan(this,'IvA + Orders')">
          <div class="iva-q-plan-check"></div>
          <div class="iva-q-plan-name">🛒 IvA + Orders</div>
          <div class="iva-q-plan-price" id="plan2Price">$125 setup + $49/mo</div>
          <div class="iva-q-plan-desc">Everything above + menu, cart & payments</div>
        </div>
      </div>
    </div>

    <!-- NOTES -->
    <div class="iva-q-card">
      <div class="iva-q-card-title">Anything else?</div>
      <div class="iva-q-row single">
        <div class="iva-q-field">
          <label>Tell us about your business (optional)</label>
          <textarea id="qNotes" placeholder="What do you sell? Any special requests? Preferred language for IvA?"></textarea>
        </div>
      </div>
    </div>

    <!-- PAYMENT INFO -->
    <div class="iva-q-stripe-info">
      <div class="iva-q-stripe-info-icon">🔒</div>
      <div class="iva-q-stripe-info-text">
        <strong>Secure payment via Stripe.</strong> You'll pay the $125 setup today. The monthly plan starts with a <strong>30-day free trial</strong> — your card will not be charged until after your first month.
      </div>
    </div>

    <!-- PAY BUTTONS -->
    <button class="iva-q-stripe-btn" onclick="goToStripe()">
      💳 Pay with Stripe →
    </button>

    <div class="iva-q-divider">— or send your request via —</div>

    <button class="iva-q-wa-btn" onclick="submitWhatsApp()">
      📲 Send via WhatsApp
    </button>

    <p class="iva-q-note">Stripe payment is secure and encrypted. First month free — cancel anytime.</p>
  </div>

  <div class="iva-q-footer">
    <div>© 2025 <strong>Ivamar AI LLC</strong> · 8 The Green, Suite B, Dover, DE 19901, USA</div>
    <div class="iva-q-footer-links">
      <a href="/privacy">Privacy</a>
      <a href="/terms">Terms</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </div>
  </div>
</div>

<script>
const STRIPE_SETUP = 'https://buy.stripe.com/bJe6oH81Q2eafoc17af3a00';
const STRIPE_49 = 'https://buy.stripe.com/14A28ra9Y3ieb7W8zCf3a01';
const STRIPE_99 = 'https://buy.stripe.com/28E6oHgymf0Wdg46ruf3a02';

const PRICING = {
  food_basic:   { monthly: 49,  label: 'Food & Beverage' },
  beauty_basic: { monthly: 49,  label: 'Beauty & Wellness' },
  retail_basic: { monthly: 49,  label: 'Retail & Other' },
  auto_pro:     { monthly: 99,  label: 'Automotive' },
  realtor_pro:  { monthly: 99,  label: 'Real Estate' },
  medical_pro:  { monthly: 99,  label: 'Health & Medical' },
  legal_pro:    { monthly: 99,  label: 'Professional Services' },
};

let selectedPlan = 'IvA Chat';
let currentMonthly = 49;

function updatePricing() {
  const select = document.getElementById('qBizType');
  const val = select.value;
  const tier = PRICING[val];
  if (!tier) { document.getElementById('priceAlert').style.display = 'none'; return; }
  currentMonthly = tier.monthly;
  const priceStr = '$125 setup + $' + tier.monthly + '/mo';
  document.getElementById('plan1Price').textContent = priceStr;
  document.getElementById('plan2Price').textContent = priceStr;
  document.getElementById('alertBizType').textContent = tier.label;
  document.getElementById('alertPlanName').textContent = tier.monthly === 49 ? 'Standard' : 'Professional';
  document.getElementById('alertPrice').textContent = '$' + tier.monthly + '/month';
  document.getElementById('priceAlert').style.display = 'flex';
}

function selectPlan(el, plan) {
  document.querySelectorAll('.iva-q-plan').forEach(p => {
    p.classList.remove('selected');
    p.querySelector('.iva-q-plan-check').textContent = '';
  });
  el.classList.add('selected');
  el.querySelector('.iva-q-plan-check').textContent = '✓';
  selectedPlan = plan;
}

function validate() {
  const bizName = document.getElementById('qBizName').value.trim();
  const name = document.getElementById('qName').value.trim();
  const phone = document.getElementById('qPhone').value.trim();
  const email = document.getElementById('qEmail').value.trim();
  if (!bizName || !name || !phone || !email) {
    alert('Please fill in: Business Name, Your Name, WhatsApp and Email.');
    return false;
  }
  return true;
}

function goToStripe() {
  if (!validate()) return;

  const bizName = document.getElementById('qBizName').value.trim();
  const name = document.getElementById('qName').value.trim();
  const phone = document.getElementById('qPhone').value.trim();
  const email = document.getElementById('qEmail').value.trim();
  const bizType = document.getElementById('qBizType').options[document.getElementById('qBizType').selectedIndex]?.text || '';
  const notes = document.getElementById('qNotes').value.trim();

  // First send WhatsApp notification to Ivan
  let msg = '💳 *NEW STRIPE PAYMENT — Ivamar AI*\\n\\n';
  msg += '🏪 *Business:* ' + bizName + '\\n';
  msg += '📂 *Type:* ' + bizType + '\\n';
  msg += '👤 *Contact:* ' + name + '\\n';
  msg += '📱 *WhatsApp:* ' + phone + '\\n';
  msg += '✉️ *Email:* ' + email + '\\n';
  msg += '💼 *Plan:* ' + selectedPlan + ' — $125 setup + $' + currentMonthly + '/mo\\n';
  if (notes) msg += '📝 *Notes:* ' + notes + '\\n';
  msg += '\\n---\\nSent from ivamarai.com/quote';

  // Open WhatsApp notification
  window.open('https://wa.me/18635216708?text=' + encodeURIComponent(msg), '_blank');

  // Then redirect to Stripe after short delay
  setTimeout(() => {
    const monthlyLink = currentMonthly === 99 ? STRIPE_99 : STRIPE_49;
    // Add prefill params to Stripe
    const setupUrl = STRIPE_SETUP + '?prefilled_email=' + encodeURIComponent(email);
    window.location.href = setupUrl;
  }, 1000);
}

function submitWhatsApp() {
  if (!validate()) return;
  const bizName = document.getElementById('qBizName').value.trim();
  const bizType = document.getElementById('qBizType').options[document.getElementById('qBizType').selectedIndex]?.text || '';
  const name = document.getElementById('qName').value.trim();
  const phone = document.getElementById('qPhone').value.trim();
  const email = document.getElementById('qEmail').value.trim();
  const location = document.getElementById('qLocation').value.trim();
  const notes = document.getElementById('qNotes').value.trim();

  let msg = '🌟 *NEW QUOTE REQUEST — Ivamar AI*\\n\\n';
  msg += '🏪 *Business:* ' + bizName + '\\n';
  msg += '📂 *Type:* ' + bizType + '\\n';
  if (location) msg += '📍 *Location:* ' + location + '\\n';
  msg += '\\n👤 *Contact:* ' + name + '\\n';
  msg += '📱 *WhatsApp:* ' + phone + '\\n';
  msg += '✉️ *Email:* ' + email + '\\n';
  msg += '\\n💼 *Plan:* ' + selectedPlan + ' — $125 setup + $' + currentMonthly + '/mo\\n';
  if (notes) msg += '\\n📝 *Notes:* ' + notes + '\\n';
  msg += '\\n---\\nSent from ivamarai.com/quote';

  window.open('https://wa.me/18635216708?text=' + encodeURIComponent(msg), '_blank');
}
</script>
`;
