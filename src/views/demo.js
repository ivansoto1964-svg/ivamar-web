module.exports = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=Pacifico&display=swap');
.demo-wrap {
  --fire: #FF4D00;
  --gold: #FFB800;
  --dark: #0F0A00;
  --smoke: #1A1208;
  --cream: #FFF8EE;
  --muted3: #8A7A5A;
  font-family: 'DM Sans', sans-serif;
  background: var(--dark);
  color: var(--cream);
  margin: -20px;
  overflow-x: hidden;
}
.demo-wrap * { box-sizing: border-box; margin: 0; padding: 0; }

/* DEMO BANNER */
.demo-banner {
  background: linear-gradient(135deg, #FF4D00, #FF6B00);
  padding: 0.6rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.78rem;
  font-weight: 600;
  color: white;
  position: sticky;
  top: 0;
  z-index: 200;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.demo-banner-left { display: flex; align-items: center; gap: 0.5rem; }
.demo-banner-dot { width: 8px; height: 8px; background: white; border-radius: 50%; animation: blink2 1.5s ease-in-out infinite; }
@keyframes blink2 { 0%,100%{opacity:1} 50%{opacity:0.3} }
.demo-banner-right { display: flex; gap: 0.8rem; align-items: center; }
.demo-banner-btn {
  background: white;
  color: #FF4D00;
  padding: 0.3rem 0.8rem;
  border-radius: 100px;
  font-size: 0.72rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s;
}
.demo-banner-btn:hover { transform: scale(1.05); }

/* HERO */
.demo-hero {
  position: relative;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  overflow: hidden;
  text-align: center;
}
.demo-hero-bg {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 80% 60% at 50% 80%, rgba(255,77,0,0.35) 0%, transparent 70%),
    radial-gradient(ellipse 50% 40% at 20% 20%, rgba(255,184,0,0.15) 0%, transparent 60%),
    repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,77,0,0.03) 40px, rgba(255,77,0,0.03) 41px);
}
.demo-orb { position: absolute; border-radius: 50%; filter: blur(60px); pointer-events: none; }
.demo-orb-1 { width: 300px; height: 300px; background: rgba(255,77,0,0.3); bottom: -100px; left: 10%; animation: demoFloat 4s ease-in-out infinite; }
.demo-orb-2 { width: 200px; height: 200px; background: rgba(255,184,0,0.2); bottom: -50px; right: 15%; animation: demoFloat 6s ease-in-out infinite; }
@keyframes demoFloat { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-20px) scale(1.1)} }

.demo-truck { font-size: 4.5rem; animation: truckFloat 3s ease-in-out infinite; margin-bottom: 1rem; filter: drop-shadow(0 0 30px rgba(255,77,0,0.5)); position: relative; }
@keyframes truckFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

.demo-hero h1 {
  font-family: 'Pacifico', cursive;
  font-size: clamp(2.5rem, 8vw, 5rem);
  color: var(--gold);
  text-shadow: 3px 3px 0 var(--fire), 6px 6px 20px rgba(255,77,0,0.4);
  line-height: 1;
  margin-bottom: 0.5rem;
  position: relative;
}
.demo-hero-sub {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.2rem;
  letter-spacing: 0.3em;
  color: var(--fire);
  margin-bottom: 1rem;
  position: relative;
}
.demo-hero-desc {
  color: var(--muted3);
  font-size: 1rem;
  max-width: 380px;
  line-height: 1.6;
  position: relative;
}

/* MENU SECTION */
.demo-menu { background: #1A1208; padding: 3rem 1.5rem; }
.demo-section-header { text-align: center; margin-bottom: 2.5rem; }
.demo-section-tag { display: inline-block; background: var(--fire); color: white; font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.2em; padding: 0.3rem 1rem; border-radius: 2px; font-size: 0.85rem; margin-bottom: 0.6rem; }
.demo-section-header h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2rem, 5vw, 3rem); letter-spacing: 0.05em; }

.demo-cat-tabs { display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.5rem; margin-bottom: 2rem; max-width: 800px; margin-left: auto; margin-right: auto; scrollbar-width: none; }
.demo-cat-tabs::-webkit-scrollbar { display: none; }
.demo-cat-tab { flex-shrink: 0; padding: 0.5rem 1.2rem; border: 1.5px solid rgba(255,184,0,0.3); border-radius: 100px; background: transparent; color: var(--muted3); font-family: 'DM Sans', sans-serif; font-size: 0.88rem; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
.demo-cat-tab.active, .demo-cat-tab:hover { background: var(--gold); border-color: var(--gold); color: var(--dark); font-weight: 600; }

.demo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.2rem; max-width: 900px; margin: 0 auto; }

.demo-card {
  background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
  border: 1px solid rgba(255,184,0,0.15);
  border-radius: 14px; overflow: hidden;
  transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
}
.demo-card:hover { transform: translateY(-3px); border-color: rgba(255,184,0,0.4); box-shadow: 0 10px 30px rgba(255,77,0,0.12); }
.demo-card-emoji { background: linear-gradient(135deg, rgba(255,77,0,0.15), rgba(255,184,0,0.1)); padding: 1.2rem; text-align: center; font-size: 3rem; position: relative; }
.demo-popular { position: absolute; top: 0.6rem; right: 0.6rem; background: var(--fire); color: white; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.1em; padding: 0.2rem 0.5rem; border-radius: 100px; text-transform: uppercase; }
.demo-card-body { padding: 1rem; }
.demo-card-title { font-family: 'Bebas Neue', sans-serif; font-size: 1.3rem; letter-spacing: 0.05em; margin-bottom: 0.2rem; }
.demo-card-desc { font-size: 0.78rem; color: var(--muted3); line-height: 1.4; margin-bottom: 0.8rem; }
.demo-card-footer { display: flex; align-items: center; justify-content: space-between; }
.demo-price { font-family: 'Bebas Neue', sans-serif; font-size: 1.5rem; color: var(--gold); }
.demo-add-btn { width: 36px; height: 36px; border-radius: 50%; border: none; background: var(--fire); color: white; font-size: 1.3rem; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
.demo-add-btn:hover { background: var(--gold); color: var(--dark); transform: scale(1.1); }

/* CART BAR */
.demo-cart-bar {
  position: fixed; bottom: 1.5rem; left: 50%;
  transform: translateX(-50%) translateY(100px);
  background: linear-gradient(135deg, #1A1208, #0F0A00);
  border: 1.5px solid rgba(255,184,0,0.4);
  border-radius: 100px; padding: 0.9rem 1.5rem;
  display: flex; align-items: center; gap: 1rem;
  cursor: pointer; transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s;
  box-shadow: 0 8px 40px rgba(0,0,0,0.5);
  z-index: 100; min-width: 260px; max-width: 90vw;
}
.demo-cart-bar.visible { transform: translateX(-50%) translateY(0); }
.demo-cart-bar:hover { box-shadow: 0 12px 50px rgba(255,77,0,0.2); }
.demo-cart-bubble { background: var(--fire); color: white; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.8rem; flex-shrink: 0; }
.demo-cart-text { flex: 1; }
.demo-cart-text-main { font-weight: 600; font-size: 0.88rem; }
.demo-cart-text-sub { font-size: 0.7rem; color: var(--muted3); }
.demo-cart-total { font-family: 'Bebas Neue', sans-serif; font-size: 1.2rem; color: var(--gold); }

/* MODAL */
.demo-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(8px); z-index: 200; display: none; align-items: flex-end; justify-content: center; padding: 1rem; }
.demo-overlay.open { display: flex; }
.demo-modal { background: #1A1208; border: 1px solid rgba(255,184,0,0.2); border-radius: 24px 24px 16px 16px; width: 100%; max-width: 460px; padding: 1.8rem; animation: slideUp2 0.35s cubic-bezier(0.34,1.56,0.64,1); max-height: 85vh; overflow-y: auto; }
@keyframes slideUp2 { from{transform:translateY(60px);opacity:0} to{transform:translateY(0);opacity:1} }
.demo-modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.2rem; }
.demo-modal-title { font-family: 'Bebas Neue', sans-serif; font-size: 1.6rem; letter-spacing: 0.05em; }
.demo-close { width: 32px; height: 32px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.15); background: transparent; color: var(--muted3); font-size: 1rem; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
.demo-close:hover { border-color: var(--fire); color: var(--fire); }
.demo-cart-item { display: flex; align-items: center; gap: 0.8rem; padding: 0.7rem 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
.demo-item-emoji { font-size: 1.6rem; }
.demo-item-info { flex: 1; }
.demo-item-name { font-weight: 600; font-size: 0.85rem; }
.demo-item-price-sm { font-size: 0.75rem; color: var(--muted3); }
.demo-qty-ctrl { display: flex; align-items: center; gap: 0.4rem; }
.demo-qty-btn { width: 24px; height: 24px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.2); background: transparent; color: var(--cream); cursor: pointer; font-size: 0.9rem; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
.demo-qty-btn:hover { border-color: var(--fire); color: var(--fire); }
.demo-qty-num { font-weight: 600; min-width: 18px; text-align: center; font-size: 0.9rem; }
.demo-summary { background: rgba(255,184,0,0.06); border: 1px solid rgba(255,184,0,0.15); border-radius: 10px; padding: 0.9rem 1.1rem; margin: 1.2rem 0; }
.demo-summary-row { display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.3rem; color: var(--muted3); }
.demo-summary-row.total { color: var(--cream); font-weight: 700; font-size: 1rem; margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid rgba(255,255,255,0.08); margin-bottom: 0; }
.demo-form-group { margin-bottom: 0.8rem; }
.demo-form-group label { display: block; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted3); margin-bottom: 0.3rem; }
.demo-form-group input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; padding: 0.65rem 0.9rem; color: var(--cream); font-family: 'DM Sans', sans-serif; font-size: 0.9rem; transition: border-color 0.2s; outline: none; }
.demo-form-group input:focus { border-color: var(--gold); }
.demo-action-btns { display: flex; flex-direction: column; gap: 0.7rem; margin-top: 1rem; }
.demo-btn { width: 100%; padding: 0.9rem; border-radius: 10px; border: none; font-family: 'Bebas Neue', sans-serif; font-size: 1.2rem; letter-spacing: 0.1em; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 0.5rem; text-decoration: none; }
.demo-btn-stripe { background: linear-gradient(135deg, var(--fire), #FF6B00); color: white; box-shadow: 0 4px 15px rgba(255,77,0,0.25); }
.demo-btn-stripe:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(255,77,0,0.35); }
.demo-btn-wa { background: linear-gradient(135deg, #25D366, #128C7E); color: white; }
.demo-btn-wa:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(37,211,102,0.25); }
.demo-btn-divider { text-align: center; font-size: 0.72rem; color: var(--muted3); letter-spacing: 0.1em; }

/* TOAST */
.demo-toast { position: fixed; top: 1.5rem; left: 50%; transform: translateX(-50%) translateY(-80px); background: #1A2E1A; border: 1px solid #25D366; color: #25D366; padding: 0.7rem 1.3rem; border-radius: 100px; font-weight: 600; font-size: 0.85rem; z-index: 999; transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1); white-space: nowrap; }
.demo-toast.show { transform: translateX(-50%) translateY(0); }

/* CTA BOTTOM */
.demo-cta-bottom { background: #0F0A00; padding: 3rem 2rem; text-align: center; border-top: 1px solid rgba(255,184,0,0.1); }
.demo-cta-bottom h3 { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; letter-spacing: 0.05em; color: var(--gold); margin-bottom: 0.8rem; }
.demo-cta-bottom p { color: var(--muted3); font-size: 0.9rem; margin-bottom: 1.5rem; max-width: 400px; margin-left: auto; margin-right: auto; line-height: 1.6; }
.demo-cta-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
.demo-cta-btn-main { display: inline-flex; align-items: center; gap: 0.5rem; background: #00E5C8; color: #030508; padding: 0.8rem 1.8rem; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 0.9rem; text-decoration: none; transition: all 0.25s; }
.demo-cta-btn-main:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,229,200,0.25); }
.demo-cta-btn-ghost { display: inline-flex; align-items: center; gap: 0.5rem; background: transparent; color: var(--cream); padding: 0.8rem 1.8rem; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 0.9rem; text-decoration: none; transition: all 0.25s; border: 1px solid rgba(255,255,255,0.12); }
.demo-cta-btn-ghost:hover { border-color: rgba(255,255,255,0.3); }

@media(max-width:480px){.demo-grid{grid-template-columns:1fr 1fr;gap:0.8rem;}.demo-card-desc{display:none;}}
</style>

<div class="demo-wrap">

  <!-- DEMO BANNER -->
  <div class="demo-banner">
    <div class="demo-banner-left">
      <span class="demo-banner-dot"></span>
      DEMO — Este es un ejemplo real de Ivamar AI
    </div>
    <div class="demo-banner-right">
      <a href="https://docs.google.com/forms/d/e/1FAIpQLSeT03zxb4z2T65X01aaWDcoa9th9-9yhIm3a6yxpEDRMz1KWw/viewform" target="_blank" class="demo-banner-btn">¿Quieres uno así? →</a>
    </div>
  </div>

  <!-- HERO -->
  <div class="demo-hero">
    <div class="demo-hero-bg"></div>
    <div class="demo-orb demo-orb-1"></div>
    <div class="demo-orb demo-orb-2"></div>
    <div class="demo-truck">🚚</div>
    <h1>El Rincón<br>Boricua</h1>
    <p class="demo-hero-sub">Food Truck · Puerto Rico & USA</p>
    <p class="demo-hero-desc">Sabores auténticos de la isla directo a ti. Pide aquí y paga fácil.</p>
  </div>

  <!-- MENU -->
  <div class="demo-menu">
    <div class="demo-section-header">
      <div class="demo-section-tag">🔥 Menú del Día</div>
      <h2>Elige Tu Antojo</h2>
    </div>
    <div class="demo-cat-tabs">
      <button class="demo-cat-tab active" onclick="demoFilter('all',this)">Todo</button>
      <button class="demo-cat-tab" onclick="demoFilter('platos',this)">🍽 Platos</button>
      <button class="demo-cat-tab" onclick="demoFilter('snacks',this)">🌮 Snacks</button>
      <button class="demo-cat-tab" onclick="demoFilter('bebidas',this)">🥤 Bebidas</button>
      <button class="demo-cat-tab" onclick="demoFilter('postres',this)">🍮 Postres</button>
    </div>
    <div class="demo-grid" id="demoGrid"></div>
  </div>

  <!-- CART BAR -->
  <div class="demo-cart-bar" id="demoCartBar" onclick="demoOpenModal()">
    <div class="demo-cart-bubble" id="demoCartCount">0</div>
    <div class="demo-cart-text">
      <div class="demo-cart-text-main">Ver mi orden</div>
      <div class="demo-cart-text-sub" id="demoCartSub">Sin items</div>
    </div>
    <div class="demo-cart-total" id="demoCartTotal">$0.00</div>
  </div>

  <!-- MODAL -->
  <div class="demo-overlay" id="demoOverlay">
    <div class="demo-modal">
      <div class="demo-modal-header">
        <div class="demo-modal-title">Tu Orden 🧾</div>
        <button class="demo-close" onclick="demoCloseModal()">✕</button>
      </div>
      <div id="demoCartItems"></div>
      <div class="demo-summary">
        <div class="demo-summary-row"><span>Subtotal</span><span id="demoSub">$0.00</span></div>
        <div class="demo-summary-row"><span>Tax (7%)</span><span id="demoTax">$0.00</span></div>
        <div class="demo-summary-row total"><span>TOTAL</span><span id="demoTotal">$0.00</span></div>
      </div>
      <div class="demo-form-group">
        <label>Tu Nombre</label>
        <input type="text" id="demoName" placeholder="Ej: María González">
      </div>
      <div class="demo-form-group">
        <label>Teléfono (opcional)</label>
        <input type="tel" id="demoPhone" placeholder="+1 (787) 000-0000">
      </div>
      <div class="demo-action-btns">
        <button class="demo-btn demo-btn-stripe" onclick="demoStripe()">💳 PAGAR CON TARJETA</button>
        <div class="demo-btn-divider">— o enviar pedido por —</div>
        <button class="demo-btn demo-btn-wa" onclick="demoWhatsApp()">📲 WHATSAPP AL NEGOCIO</button>
      </div>
    </div>
  </div>

  <!-- TOAST -->
  <div class="demo-toast" id="demoToast"></div>

  <!-- CTA BOTTOM -->
  <div class="demo-cta-bottom">
    <h3>¿Quieres una página así para tu negocio?</h3>
    <p>En 48 horas tu food truck, restaurante o negocio tiene su propia página con asistente IA, menú y pagos.</p>
    <div class="demo-cta-btns">
      <a href="https://docs.google.com/forms/d/e/1FAIpQLSeT03zxb4z2T65X01aaWDcoa9th9-9yhIm3a6yxpEDRMz1KWw/viewform" target="_blank" class="demo-cta-btn-main">Solicitar mi página →</a>
      <a href="https://wa.me/18635216708" target="_blank" class="demo-cta-btn-ghost">Hablar por WhatsApp</a>
    </div>
  </div>

</div>

<script>
const DEMO_MENU = [
  {id:1,name:"Mofongo con Camarones",desc:"Mofongo artesanal con camarones al ajillo",price:14.99,emoji:"🥣",cat:"platos",popular:true},
  {id:2,name:"Pernil Plate",desc:"Cerdo asado lento, arroz, habichuelas y tostones",price:13.99,emoji:"🍖",cat:"platos",popular:true},
  {id:3,name:"Chuletas Can-Can",desc:"Chuletas fritas con arroz mamposteao",price:15.99,emoji:"🥩",cat:"platos"},
  {id:4,name:"Alcapurrias de Pollo",desc:"Alcapurrias caseras rellenas de pollo guisado (x3)",price:8.99,emoji:"🫔",cat:"snacks",popular:true},
  {id:5,name:"Tostones con Mojo",desc:"Tostones crujientes con ajo y limón",price:5.99,emoji:"🫓",cat:"snacks"},
  {id:6,name:"Empanadillas (x4)",desc:"Mezcla de carne, queso y pollo",price:7.99,emoji:"🥟",cat:"snacks"},
  {id:7,name:"Coquito Shake",desc:"Batido cremoso de coco con canela",price:5.99,emoji:"🥥",cat:"bebidas",popular:true},
  {id:8,name:"Limonada Tamarindo",desc:"Fresca limonada tropical con tamarindo",price:3.99,emoji:"🍹",cat:"bebidas"},
  {id:9,name:"Malta Caribeña",desc:"Malta fría bien fría 🧊",price:2.99,emoji:"🍺",cat:"bebidas"},
  {id:10,name:"Tembleque",desc:"Postre de coco con canela al estilo boricua",price:4.99,emoji:"🍮",cat:"postres",popular:true},
  {id:11,name:"Arroz con Leche",desc:"Clásico cremoso con canela",price:3.99,emoji:"🍚",cat:"postres"},
];

let demoCart = {};

function demoRender(cat) {
  const grid = document.getElementById('demoGrid');
  const items = cat === 'all' ? DEMO_MENU : DEMO_MENU.filter(i => i.cat === cat);
  grid.innerHTML = items.map(item => \`
    <div class="demo-card">
      <div class="demo-card-emoji">
        \${item.emoji}
        \${item.popular ? '<span class="demo-popular">🔥 Popular</span>' : ''}
      </div>
      <div class="demo-card-body">
        <div class="demo-card-title">\${item.name}</div>
        <div class="demo-card-desc">\${item.desc}</div>
        <div class="demo-card-footer">
          <div class="demo-price">$\${item.price.toFixed(2)}</div>
          <button class="demo-add-btn" onclick="demoAdd(\${item.id})">+</button>
        </div>
      </div>
    </div>
  \`).join('');
}

function demoFilter(cat, el) {
  document.querySelectorAll('.demo-cat-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  demoRender(cat);
}

function demoAdd(id) {
  demoCart[id] = (demoCart[id] || 0) + 1;
  demoUpdateBar();
  demoToastShow('✅ Añadido a tu orden');
}

function demoRemove(id) {
  if (demoCart[id] > 1) demoCart[id]--;
  else delete demoCart[id];
  demoUpdateBar();
  demoRenderModal();
}

function demoUpdateBar() {
  const ids = Object.keys(demoCart);
  const count = ids.reduce((s,id) => s + demoCart[id], 0);
  const total = ids.reduce((s,id) => s + DEMO_MENU.find(i=>i.id==id).price * demoCart[id], 0);
  document.getElementById('demoCartCount').textContent = count;
  document.getElementById('demoCartTotal').textContent = '$' + total.toFixed(2);
  const names = ids.slice(0,2).map(id => DEMO_MENU.find(i=>i.id==id).name.split(' ')[0]).join(', ');
  document.getElementById('demoCartSub').textContent = count > 0 ? names : 'Sin items';
  const bar = document.getElementById('demoCartBar');
  if (count > 0) bar.classList.add('visible');
  else bar.classList.remove('visible');
}

function demoRenderModal() {
  const container = document.getElementById('demoCartItems');
  const ids = Object.keys(demoCart);
  if (!ids.length) { container.innerHTML = '<p style="color:#8A7A5A;text-align:center;padding:1rem">Tu orden está vacía</p>'; demoUpdateTotals(); return; }
  container.innerHTML = ids.map(id => {
    const item = DEMO_MENU.find(i => i.id == id);
    return \`
      <div class="demo-cart-item">
        <div class="demo-item-emoji">\${item.emoji}</div>
        <div class="demo-item-info">
          <div class="demo-item-name">\${item.name}</div>
          <div class="demo-item-price-sm">$\${item.price.toFixed(2)} c/u</div>
        </div>
        <div class="demo-qty-ctrl">
          <button class="demo-qty-btn" onclick="demoRemove(\${id})">−</button>
          <span class="demo-qty-num">\${demoCart[id]}</span>
          <button class="demo-qty-btn" onclick="demoAdd(\${id})">+</button>
        </div>
      </div>
    \`;
  }).join('');
  demoUpdateTotals();
}

function demoUpdateTotals() {
  const sub = Object.keys(demoCart).reduce((s,id) => s + DEMO_MENU.find(i=>i.id==id).price * demoCart[id], 0);
  const tax = sub * 0.07;
  document.getElementById('demoSub').textContent = '$' + sub.toFixed(2);
  document.getElementById('demoTax').textContent = '$' + tax.toFixed(2);
  document.getElementById('demoTotal').textContent = '$' + (sub+tax).toFixed(2);
}

function demoOpenModal() {
  if (!Object.keys(demoCart).length) return;
  demoRenderModal();
  document.getElementById('demoOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function demoCloseModal() {
  document.getElementById('demoOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function demoStripe() {
  const name = document.getElementById('demoName').value.trim();
  if (!name) { demoToastShow('⚠️ Por favor escribe tu nombre'); return; }
  demoToastShow('💳 Demo: Aquí abriría Stripe Checkout');
  setTimeout(() => alert('✅ DEMO: En producción aquí el cliente pagaría con tarjeta via Stripe.\\n\\nCliente: ' + name + '\\nTotal: ' + document.getElementById('demoTotal').textContent), 800);
}

function demoWhatsApp() {
  const name = document.getElementById('demoName').value.trim() || 'Cliente';
  const ids = Object.keys(demoCart);
  if (!ids.length) return;
  let msg = '🚚 *PEDIDO — El Rincón Boricua*\\n\\n';
  msg += '👤 Cliente: ' + name + '\\n\\n*Items:*\\n';
  ids.forEach(id => {
    const item = DEMO_MENU.find(i => i.id == id);
    msg += '• ' + item.emoji + ' ' + item.name + ' x' + demoCart[id] + ' — $' + (item.price * demoCart[id]).toFixed(2) + '\\n';
  });
  const sub = ids.reduce((s,id) => s + DEMO_MENU.find(i=>i.id==id).price * demoCart[id], 0);
  msg += '\\n💰 *TOTAL: $' + (sub * 1.07).toFixed(2) + '*\\n\\n¡Gracias! 🇵🇷';
  window.open('https://wa.me/18635216708?text=' + encodeURIComponent(msg), '_blank');
  demoCloseModal();
  demoToastShow('📲 Pedido enviado por WhatsApp!');
}

function demoToastShow(msg) {
  const t = document.getElementById('demoToast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

document.getElementById('demoOverlay').addEventListener('click', e => {
  if (e.target === document.getElementById('demoOverlay')) demoCloseModal();
});

demoRender('all');
</script>
`;
