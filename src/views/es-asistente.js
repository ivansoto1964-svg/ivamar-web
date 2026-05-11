module.exports = `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>IvA — Asistente de Ivamar AI</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Lora:ital,wght@0,400;0,500;1,400&family=JetBrains+Mono:wght@300;400&display=swap" rel="stylesheet">
<style>
:root {
  --bg: #030508;
  --bg2: #070B10;
  --bg3: #0C1118;
  --teal: #00E5C8;
  --teal2: #00C4AC;
  --white: #F0F4FF;
  --gray: #8892A4;
  --gray2: #4A5568;
  --border: rgba(0,229,200,0.08);
  --border2: rgba(255,255,255,0.05);
  --glow: rgba(0,229,200,0.15);
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

body {
  font-family: 'Syne', sans-serif;
  background: var(--bg);
  color: var(--white);
  min-height: 100vh;
  overflow-x: hidden;
}

/* AMBIENT BG */
body::before {
  content: '';
  position: fixed; inset: 0;
  background:
    radial-gradient(ellipse 60% 40% at 20% 20%, rgba(0,229,200,0.04) 0%, transparent 60%),
    radial-gradient(ellipse 50% 50% at 80% 80%, rgba(0,100,200,0.03) 0%, transparent 60%);
  pointer-events: none; z-index: 0;
}

/* NAV */
nav {
  position: fixed; top: 0; width: 100%; z-index: 100;
  padding: 1rem 2rem;
  display: flex; align-items: center; justify-content: space-between;
  background: rgba(3,5,8,0.92);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border2);
}
.nav-logo {
  display: flex; align-items: center; gap: 0.6rem;
  text-decoration: none;
}
.nav-logo-mark {
  width: 28px; height: 28px;
  background: var(--teal);
  border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.75rem; font-weight: 800;
  color: var(--bg);
}
.nav-logo-text {
  font-size: 0.95rem; font-weight: 700;
  color: var(--white); letter-spacing: -0.02em;
}
.nav-logo-text span { color: var(--teal); }
.nav-right { display: flex; align-items: center; gap: 1rem; }
.nav-lang {
  font-size: 0.72rem; color: var(--gray);
  border: 1px solid var(--border2);
  padding: 0.3rem 0.8rem; border-radius: 20px;
  cursor: pointer; transition: all 0.2s;
  text-decoration: none;
}
.nav-lang:hover { border-color: var(--teal); color: var(--teal); }
.nav-prices {
  font-size: 0.72rem; color: var(--gray);
  text-decoration: none; transition: color 0.2s;
}
.nav-prices:hover { color: var(--teal); }

/* MAIN LAYOUT */
.main {
  min-height: 100vh;
  padding: 5rem 1.5rem 2rem;
  max-width: 720px;
  margin: 0 auto;
  position: relative; z-index: 1;
  display: flex; flex-direction: column;
}

/* HERO MINI */
.hero-mini {
  text-align: center;
  padding: 2rem 0 1.5rem;
  animation: fadeUp 0.6s ease both;
}
.hero-mini-badge {
  display: inline-flex; align-items: center; gap: 0.4rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem; color: var(--teal);
  letter-spacing: 0.1em; text-transform: uppercase;
  margin-bottom: 0.8rem;
}
.badge-dot {
  width: 5px; height: 5px;
  background: var(--teal); border-radius: 50%;
  animation: pulse 2s infinite;
}
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

.hero-mini h1 {
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  font-weight: 800; letter-spacing: -0.03em;
  line-height: 1.2; margin-bottom: 0.5rem;
}
.hero-mini h1 span { color: var(--teal); }
.hero-mini p {
  font-size: 0.85rem; color: var(--gray);
  font-family: 'Lora', serif; font-style: italic;
}

/* CHAT CONTAINER */
.chat-wrap {
  flex: 1;
  background: var(--bg2);
  border: 1px solid var(--border2);
  border-radius: 20px;
  overflow: hidden;
  display: flex; flex-direction: column;
  animation: fadeUp 0.6s ease 0.1s both;
  box-shadow: 0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,229,200,0.04);
  margin-bottom: 1.5rem;
}

/* CHAT HEADER */
.chat-header {
  padding: 1rem 1.4rem;
  background: rgba(0,229,200,0.04);
  border-bottom: 1px solid var(--border2);
  display: flex; align-items: center; justify-content: space-between;
}
.chat-agent { display: flex; align-items: center; gap: 0.8rem; }
.chat-avatar {
  width: 36px; height: 36px;
  background: linear-gradient(135deg, var(--teal), #0088CC);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 1rem; position: relative;
  flex-shrink: 0;
}
.chat-avatar-dot {
  position: absolute; bottom: 0; right: 0;
  width: 9px; height: 9px;
  background: #22C55E;
  border-radius: 50%;
  border: 2px solid var(--bg2);
}
.chat-agent-name { font-size: 0.85rem; font-weight: 700; }
.chat-agent-sub { font-size: 0.65rem; color: var(--teal); letter-spacing: 0.05em; }
.chat-header-right { font-size: 0.65rem; color: var(--gray2); font-family: 'JetBrains Mono', monospace; }

/* MESSAGES */
.chat-msgs {
  flex: 1; padding: 1.4rem;
  display: flex; flex-direction: column; gap: 1rem;
  overflow-y: auto; min-height: 320px; max-height: 420px;
}
.chat-msgs::-webkit-scrollbar { width: 3px; }
.chat-msgs::-webkit-scrollbar-track { background: transparent; }
.chat-msgs::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }

.msg { display: flex; gap: 0.6rem; animation: msgIn 0.3s ease both; }
@keyframes msgIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.msg-bot { align-items: flex-start; }
.msg-user { flex-direction: row-reverse; }

.msg-avatar {
  width: 28px; height: 28px; flex-shrink: 0;
  background: linear-gradient(135deg, var(--teal), #0088CC);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.75rem; margin-top: 2px;
}

.msg-bubble {
  max-width: 82%;
  padding: 0.8rem 1rem;
  border-radius: 4px 14px 14px 14px;
  font-size: 0.85rem; line-height: 1.7;
  font-family: 'Lora', serif;
}
.msg-bot .msg-bubble {
  background: var(--bg3);
  border: 1px solid var(--border2);
  color: var(--white);
  border-radius: 4px 14px 14px 14px;
}
.msg-user .msg-bubble {
  background: rgba(0,229,200,0.08);
  border: 1px solid rgba(0,229,200,0.15);
  color: var(--white);
  border-radius: 14px 4px 14px 14px;
  font-family: 'Syne', sans-serif;
  font-size: 0.82rem;
}
.msg-time {
  font-size: 0.6rem; color: var(--gray2);
  font-family: 'JetBrains Mono', monospace;
  margin-top: 0.3rem; padding: 0 0.2rem;
}
.msg-bot .msg-time { text-align: left; }
.msg-user .msg-time { text-align: right; }

/* TYPING INDICATOR */
.typing {
  display: flex; gap: 0.6rem; align-items: flex-start;
  animation: msgIn 0.3s ease both;
}
.typing-bubble {
  background: var(--bg3);
  border: 1px solid var(--border2);
  border-radius: 4px 14px 14px 14px;
  padding: 0.8rem 1rem;
  display: flex; gap: 4px; align-items: center;
}
.typing-dot {
  width: 6px; height: 6px;
  background: var(--teal); border-radius: 50%;
  animation: typingBounce 1.2s infinite;
}
.typing-dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes typingBounce {
  0%,60%,100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-4px); opacity: 1; }
}

/* QUICK BUTTONS */
.quick-btns {
  padding: 0.8rem 1.4rem;
  border-top: 1px solid var(--border2);
  display: flex; gap: 0.5rem; flex-wrap: wrap;
}
.qbtn {
  font-size: 0.7rem; padding: 0.35rem 0.9rem;
  border: 1px solid var(--border2);
  border-radius: 20px; color: var(--gray);
  cursor: pointer; transition: all 0.2s;
  background: transparent;
  font-family: 'Syne', sans-serif;
  white-space: nowrap;
}
.qbtn:hover { border-color: var(--teal); color: var(--teal); background: rgba(0,229,200,0.04); }
.qbtn.active { border-color: var(--teal); color: var(--teal); background: rgba(0,229,200,0.06); }

/* OPTIONS GRID */
.options-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-top: 0.8rem;
}
.opt-btn {
  padding: 0.6rem 0.5rem;
  border: 1px solid var(--border2);
  border-radius: 10px;
  background: rgba(255,255,255,0.02);
  color: var(--white); font-size: 0.72rem;
  cursor: pointer; transition: all 0.2s;
  font-family: 'Syne', sans-serif;
  text-align: center;
}
.opt-btn:hover { border-color: var(--teal); background: rgba(0,229,200,0.06); color: var(--teal); }

/* INPUT AREA */
.chat-input-area {
  padding: 1rem 1.4rem;
  border-top: 1px solid var(--border2);
  display: flex; gap: 0.6rem; align-items: center;
  background: rgba(0,0,0,0.2);
}
.chat-input {
  flex: 1;
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--border2);
  border-radius: 10px;
  padding: 0.7rem 1rem;
  color: var(--white);
  font-size: 0.82rem;
  outline: none;
  font-family: 'Syne', sans-serif;
  transition: border-color 0.2s;
  resize: none;
}
.chat-input:focus { border-color: rgba(0,229,200,0.3); }
.chat-input::placeholder { color: var(--gray2); }
.chat-send {
  width: 38px; height: 38px;
  background: var(--teal);
  border: none; border-radius: 10px;
  cursor: pointer; font-size: 0.9rem;
  transition: all 0.2s; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.chat-send:hover { background: var(--teal2); transform: scale(1.05); }
.chat-send:disabled { background: var(--bg3); cursor: not-allowed; transform: none; }

/* PRICING SECTION */
.pricing-section {
  padding: 2rem 0;
  animation: fadeUp 0.6s ease 0.2s both;
}
.section-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem; color: var(--teal);
  letter-spacing: 0.12em; text-transform: uppercase;
  margin-bottom: 1rem; text-align: center;
}
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
.price-card {
  background: var(--bg2);
  border: 1px solid var(--border2);
  border-radius: 16px; padding: 1.5rem;
  transition: all 0.25s; position: relative;
  overflow: hidden;
}
.price-card:hover { border-color: rgba(0,229,200,0.2); transform: translateY(-2px); }
.price-card.featured {
  border-color: rgba(0,229,200,0.25);
  background: rgba(0,229,200,0.03);
}
.price-card.featured::before {
  content: 'Más popular';
  position: absolute; top: 0; right: 0;
  background: var(--teal);
  color: var(--bg);
  font-size: 0.6rem; font-weight: 700;
  padding: 0.25rem 0.7rem;
  border-radius: 0 14px 0 8px;
  letter-spacing: 0.05em;
}
.price-name {
  font-size: 0.7rem; color: var(--teal);
  letter-spacing: 0.1em; text-transform: uppercase;
  margin-bottom: 0.8rem; font-family: 'JetBrains Mono', monospace;
}
.price-amount {
  font-size: 2rem; font-weight: 800;
  letter-spacing: -0.04em; line-height: 1;
  margin-bottom: 0.2rem;
}
.price-amount span { font-size: 0.9rem; font-weight: 400; color: var(--gray); }
.price-setup {
  font-size: 0.72rem; color: var(--gray);
  margin-bottom: 1rem; font-family: 'JetBrains Mono', monospace;
}
.price-features {
  list-style: none;
  display: flex; flex-direction: column; gap: 0.5rem;
  margin-bottom: 1.2rem;
}
.price-features li {
  font-size: 0.75rem; color: var(--gray);
  display: flex; align-items: flex-start; gap: 0.5rem; line-height: 1.4;
}
.price-features li::before { content: '✦'; color: var(--teal); flex-shrink: 0; font-size: 0.6rem; margin-top: 2px; }
.price-cta {
  width: 100%;
  background: transparent;
  border: 1px solid var(--border2);
  color: var(--white); padding: 0.7rem;
  border-radius: 8px; font-size: 0.78rem;
  cursor: pointer; transition: all 0.2s;
  font-family: 'Syne', sans-serif; font-weight: 600;
}
.price-cta:hover { border-color: var(--teal); color: var(--teal); }
.price-card.featured .price-cta {
  background: var(--teal); border-color: var(--teal);
  color: var(--bg);
}
.price-card.featured .price-cta:hover { background: var(--teal2); }

/* TECH SECTION */
.tech-section {
  padding: 2rem 0;
  text-align: center;
  border-top: 1px solid var(--border2);
  animation: fadeUp 0.6s ease 0.3s both;
}
.tech-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem; color: var(--gray2);
  letter-spacing: 0.15em; text-transform: uppercase;
  margin-bottom: 1.2rem;
}
.tech-logos {
  display: flex; gap: 2rem; justify-content: center;
  flex-wrap: wrap; align-items: center;
}
.tech-logo {
  font-size: 0.72rem; color: var(--gray2);
  letter-spacing: 0.05em; font-family: 'JetBrains Mono', monospace;
  transition: color 0.2s;
}
.tech-logo:hover { color: var(--gray); }

/* SECONDARY SERVICES */
.secondary-section {
  padding: 2rem 0;
  border-top: 1px solid var(--border2);
  animation: fadeUp 0.6s ease 0.35s both;
}
.secondary-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 1rem; margin-top: 1rem;
}
.sec-card {
  background: var(--bg2);
  border: 1px solid var(--border2);
  border-radius: 12px; padding: 1.2rem;
  text-align: center; transition: all 0.2s;
}
.sec-card:hover { border-color: rgba(0,229,200,0.15); }
.sec-icon { font-size: 1.5rem; margin-bottom: 0.5rem; }
.sec-name { font-size: 0.75rem; font-weight: 700; margin-bottom: 0.3rem; }
.sec-desc { font-size: 0.68rem; color: var(--gray); line-height: 1.5; }

/* FOOTER */
.page-footer {
  padding: 2rem 0 1rem;
  text-align: center;
  border-top: 1px solid var(--border2);
}
.page-footer p { font-size: 0.7rem; color: var(--gray2); line-height: 1.8; }
.page-footer a { color: var(--teal); text-decoration: none; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 600px) {
  nav { padding: 0.8rem 1rem; }
  .main { padding: 4.5rem 1rem 1.5rem; }
  .pricing-grid { grid-template-columns: 1fr; }
  .secondary-grid { grid-template-columns: 1fr; }
  .options-grid { grid-template-columns: repeat(2, 1fr); }
  .tech-logos { gap: 1.2rem; }
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
  <div class="nav-right">
    <a href="#precios" class="nav-prices">Ver precios</a>
    <a href="/en/assistant" class="nav-lang">🇺🇸 English</a>
  </div>
</nav>

<!-- MAIN -->
<div class="main">

  <!-- HERO MINI -->
  <div class="hero-mini">
    <div class="hero-mini-badge">
      <div class="badge-dot"></div>
      IvA está en línea ahora
    </div>
    <h1>Tu negocio merece un<br><span>asistente inteligente</span></h1>
    <p>Habla con IvA y descubre cómo funciona en tiempo real</p>
  </div>

  <!-- CHAT -->
  <div class="chat-wrap">
    <div class="chat-header">
      <div class="chat-agent">
        <div class="chat-avatar">
          🤖
          <div class="chat-avatar-dot"></div>
        </div>
        <div>
          <div class="chat-agent-name">IvA — Ivamar AI</div>
          <div class="chat-agent-sub">● En línea · Responde al instante</div>
        </div>
      </div>
      <div class="chat-header-right">ivamarai.com</div>
    </div>

    <div class="chat-msgs" id="msgs"></div>

    <div class="quick-btns" id="quickBtns">
      <button class="qbtn" onclick="quickAction('precios')">💰 Ver precios</button>
      <button class="qbtn" onclick="quickAction('como')">⚡ Cómo funciona</button>
      <button class="qbtn" onclick="quickAction('integrar')">🔗 Integrar a mi web</button>
      <button class="qbtn" onclick="quickAction('landing')">🌐 Necesito landing page</button>
      <button class="qbtn" onclick="quickAction('hablar')">👋 Hablar con alguien</button>
    </div>

    <div class="chat-input-area">
      <input
        class="chat-input"
        id="chatInput"
        placeholder="Escríbeme aquí..."
        onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendMsg();}"
        autocomplete="off"
      >
      <button class="chat-send" id="sendBtn" onclick="sendMsg()">➤</button>
    </div>
  </div>

  <!-- PRICING -->
  <div class="pricing-section" id="precios">
    <div class="section-label">Planes y precios</div>
    <div class="pricing-grid">
      <div class="price-card">
        <div class="price-name">Starter</div>
        <div class="price-amount">$29<span>/mes</span></div>
        <div class="price-setup">+ $125 setup · desde</div>
        <ul class="price-features">
          <li>Asistente IA para tu negocio</li>
          <li>Español e inglés</li>
          <li>Integración web o link directo para redes sociales</li>
          <li>Mobile-friendly · Funciona en Instagram, Facebook y WhatsApp</li>
          <li>Captura de leads básica</li>
          <li>Entrenamiento básico</li>
        </ul>
        <button class="price-cta" onclick="window.location.href='/cotizar'">Comenzar →</button>
      </div>
      <div class="price-card featured">
        <div class="price-name">Growth</div>
        <div class="price-amount">$49<span>/mes</span></div>
        <div class="price-setup">+ $125 setup · desde</div>
        <ul class="price-features">
          <li>Todo lo del Starter</li>
          <li>Integración WhatsApp</li>
          <li>Entrenamiento avanzado</li>
          <li>Mayor capacidad de uso</li>
          <li>Captura de leads avanzada</li>
          <li>Soporte prioritario</li>
        </ul>
        <button class="price-cta" onclick="window.location.href='/cotizar'">Comenzar →</button>
      </div>
      <div class="price-card">
        <div class="price-name">Premium</div>
        <div class="price-amount" style="font-size:1.4rem;">Custom</div>
        <div class="price-setup">Según necesidades</div>
        <ul class="price-features">
          <li>Bufetes y firmas legales</li>
          <li>Cooperativas y financieras</li>
          <li>Hoteles y cadenas</li>
          <li>Integraciones avanzadas</li>
          <li>Flujos personalizados</li>
          <li>Onboarding premium</li>
        </ul>
        <button class="price-cta" onclick="window.open('https://wa.me/18635216708','_blank')">Consultar →</button>
      </div>
    </div>
  </div>

  <!-- TECH -->
  <div class="tech-section">
    <div class="tech-label">Tecnologías modernas de confianza</div>
    <div class="tech-logos">
      <span class="tech-logo">Anthropic</span>
      <span class="tech-logo">OpenAI</span>
      <span class="tech-logo">Stripe</span>
      <span class="tech-logo">WhatsApp</span>
      <span class="tech-logo">Render</span>
      <span class="tech-logo">GitHub</span>
    </div>
  </div>

  <!-- SECONDARY -->
  <div class="secondary-section">
    <div class="section-label">Servicios adicionales</div>
    <div class="secondary-grid">
      <div class="sec-card" onclick="window.location.href='/cotizar'" style="cursor:pointer;">
        <div class="sec-icon">🌐</div>
        <div class="sec-name">Landing Pages</div>
        <div class="sec-desc">Páginas modernas con tu asistente integrado</div>
      </div>
      <div class="sec-card" onclick="window.location.href='/demos-es'" style="cursor:pointer;">
        <div class="sec-icon">🛒</div>
        <div class="sec-name">Sistemas de Pedidos</div>
        <div class="sec-desc">Carrito digital con pedidos por WhatsApp</div>
      </div>
      <div class="sec-card" onclick="window.location.href='/cotizar'" style="cursor:pointer;">
        <div class="sec-icon">⚡</div>
        <div class="sec-name">Soluciones Premium</div>
        <div class="sec-desc">Integraciones avanzadas para tu industria</div>
      </div>
    </div>
  </div>

  <!-- FOOTER -->
  <div class="page-footer">
    <p>© 2025 Ivamar AI LLC · Delaware, USA<br>
    <a href="/sobre-nosotros">Sobre Nosotros</a> · <a href="/privacy">Privacidad</a> · <a href="/terms">Términos</a> · <a href="mailto:connect@ivamarai.com">connect@ivamarai.com</a></p>
  </div>

</div>

<script>
// ─── STATE ───────────────────────────────────────────────
let state = {
  step: 'active',
  name: '',
  location: '',
  businessType: '',
  hasWebsite: null,
  assistantName: '',
  email: '',
  phone: '',
  isTyping: false,
  history: []
};

async function callIvA(userMessage) {
  try {
    const response = await fetch('/api/iva-sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userMessage,
        history: state.history,
        lang: 'es',
        context: {
          name: state.name,
          businessType: state.businessType,
          hasWebsite: state.hasWebsite,
          assistantName: state.assistantName,
          location: state.location
        }
      })
    });
    const data = await response.json();
    const reply = data.reply || 'Disculpa, tuve un problema. Escríbenos por WhatsApp.';
    state.history.push({ role: 'user', content: userMessage });
    state.history.push({ role: 'assistant', content: reply });
    if (state.history.length > 20) state.history = state.history.slice(-20);
    return reply;
  } catch(e) {
    return 'Disculpa, tuve un problema técnico. Por favor escríbenos por WhatsApp directamente.';
  }
}

const now = () => {
  const d = new Date();
  return d.getHours().toString().padStart(2,'0') + ':' + d.getMinutes().toString().padStart(2,'0');
};

function scrollToBottom() {
  const msgs = document.getElementById('msgs');
  if (!msgs) return;
  msgs.scrollTop = msgs.scrollHeight;
  setTimeout(() => { msgs.scrollTop = msgs.scrollHeight; }, 50);
  setTimeout(() => { msgs.scrollTop = msgs.scrollHeight; }, 150);
}

// ─── RENDER ──────────────────────────────────────────────
function appendBot(text, delay = 0) {
  return new Promise(resolve => {
    setTimeout(() => {
      removeTyping();
      const msgs = document.getElementById('msgs');
      const div = document.createElement('div');
      div.className = 'msg msg-bot';
      div.innerHTML = \`
        <div class="msg-avatar">🤖</div>
        <div>
          <div class="msg-bubble">\${text}</div>
          <div class="msg-time">\${now()}</div>
        </div>\`;
      msgs.appendChild(div);
      scrollToBottom();
      resolve();
    }, delay);
  });
}

function appendUser(text) {
  const msgs = document.getElementById('msgs');
  const div = document.createElement('div');
  div.className = 'msg msg-user';
  div.innerHTML = \`
    <div>
      <div class="msg-bubble">\${text}</div>
      <div class="msg-time">\${now()}</div>
    </div>\`;
  msgs.appendChild(div);
  scrollToBottom();
}

function showTyping() {
  removeTyping();
  const msgs = document.getElementById('msgs');
  const div = document.createElement('div');
  div.className = 'typing'; div.id = 'typingIndicator';
  div.innerHTML = \`
    <div class="msg-avatar">🤖</div>
    <div class="typing-bubble">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>\`;
  msgs.appendChild(div);
  scrollToBottom();
}

function removeTyping() {
  const t = document.getElementById('typingIndicator');
  if (t) t.remove();
}

function appendOptions(options) {
  const msgs = document.getElementById('msgs');
  const div = document.createElement('div');
  div.className = 'msg msg-bot';
  const grid = options.map(o =>
    \`<button class="opt-btn" onclick="selectOption('\${o.value}','\${o.label}')">\${o.label}</button>\`
  ).join('');
  div.innerHTML = \`
    <div class="msg-avatar">🤖</div>
    <div style="flex:1">
      <div class="options-grid">\${grid}</div>
    </div>\`;
  msgs.appendChild(div);
  scrollToBottom();
}

function disableInput(placeholder = 'Selecciona una opción...') {
  document.getElementById('chatInput').placeholder = placeholder;
  document.getElementById('chatInput').disabled = true;
  document.getElementById('sendBtn').disabled = true;
}

function enableInput(placeholder = 'Escríbeme aquí...') {
  document.getElementById('chatInput').placeholder = placeholder;
  document.getElementById('chatInput').disabled = false;
  document.getElementById('sendBtn').disabled = false;
  document.getElementById('chatInput').focus();
}

// ─── CONVERSATION FLOW ───────────────────────────────────
async function startConversation() {
  disableInput('IvA está escribiendo...');
  showTyping();
  const greeting = 'Hola 👋 Soy IvA, el asistente de Ivamar AI. Así mismo puede funcionar el asistente de tu negocio. Cuéntame, ¿desde dónde nos visitas hoy?';
  state.history.push({ role: 'assistant', content: greeting });
  await appendBot(greeting, 1200);
  state.step = 'active';
  enableInput('Escribe tu ciudad o país...');
}

async function handleLocation(location) {
  state.location = location;
  appendUser(location);
  disableInput();
  showTyping();
  await appendBot(\`¡Excelente! 👏<br>Qué bueno tener gente de <strong>\${location}</strong> por aquí.\`, 1000);
  showTyping();
  await appendBot('¿Cómo te llamas? 😊', 1800);
  state.step = 'name';
  enableInput('Tu nombre...');
}

async function handleName(name) {
  state.name = name.charAt(0).toUpperCase() + name.slice(1);
  appendUser(name);
  disableInput();
  showTyping();
  await appendBot(\`Mucho gusto, <strong>\${state.name}</strong> 😍\`, 1000);
  showTyping();
  await appendBot(\`¿Qué tipo de negocio tienes, \${state.name}? 👇\`, 1800);
  state.step = 'businessType';
  appendOptions([
    { value: 'restaurante', label: '🍽️ Restaurante' },
    { value: 'abogado', label: '⚖️ Abogado/a' },
    { value: 'realtor', label: '🏠 Realtor' },
    { value: 'salon', label: '💅 Salón' },
    { value: 'financiera', label: '💰 Financiera' },
    { value: 'contractor', label: '🔨 Contractor' },
    { value: 'petshop', label: '🐾 Pet Shop' },
    { value: 'otro', label: '✨ Otro' },
  ]);
  disableInput('Selecciona tu tipo de negocio...');
}

async function handleBusinessType(type, label) {
  state.businessType = type;
  appendUser(label);
  disableInput();

  const reactions = {
    restaurante: \`¡\${state.name}, los restaurantes que usan asistentes IA atienden pedidos y preguntas 24/7 automáticamente! 🍽️\`,
    abogado: \`Perfecto \${state.name}, los bufetes usan asistentes IA para el intake inicial de clientes — organiza toda la información antes de la consulta. ⚖️\`,
    realtor: \`¡Excelente \${state.name}! Un asistente IA califica leads automáticamente y responde preguntas sobre propiedades a cualquier hora. 🏠\`,
    salon: \`¡\${state.name}, los salones con asistente IA nunca pierden una cita! Agenda, preguntas y confirmaciones automáticas. 💅\`,
    financiera: \`\${state.name}, las financieras usan IA para la precalificación inicial — recopila info del cliente antes de la evaluación. 💰\`,
    contractor: \`¡\${state.name}! Los contractors con IA capturan leads, dan presupuestos iniciales y responden 24/7. 🔨\`,
    petshop: \`¡Qué nicho tan bueno \${state.name}! Un asistente IA para pet shop maneja citas, preguntas sobre productos y más. 🐾\`,
    otro: \`Perfecto \${state.name}, tenemos soluciones para casi cualquier tipo de negocio. 😊\`,
  };

  showTyping();
  await appendBot(reactions[type] || reactions.otro, 1000);
  showTyping();
  await appendBot(\`Y lo mejor 😊<br>cuando creamos tu asistente,<br>tú decides el <strong>nombre y personalidad</strong> que deseas<br>para que conecte mejor con tu negocio.\`, 2200);
  showTyping();
  await appendBot(\`Así como yo soy IvA 👋<br>tu negocio puede tener uno completamente personalizado.<br><br>¿Qué nombre te gustaría para tu super asistente? 😍\`, 3600);
  state.step = 'assistantName';
  enableInput('Dale un nombre a tu asistente...');
}

async function handleAssistantName(name) {
  state.assistantName = name;
  appendUser(name);
  disableInput();

  const reactions = {
    lexia: \`LexIA 😮‍💨<br>ese nombre está <strong>brutal</strong> para un bufete.\`,
    nayeli: \`Nayeli 🌺<br>¡qué nombre tan bonito y memorable!\`,
    sharky: \`Sharky 🦈<br>¡eso tiene personalidad! A los clientes les va a encantar.\`,
    max: \`Max 🐾<br>simple, directo y fácil de recordar. ¡Perfecto!\`,
  };

  const defaultReaction = \`<strong>\${name}</strong> 😮‍💨<br>ese nombre tiene <em>todo</em>. Los clientes van a conectar de inmediato.\`;
  const reaction = reactions[name.toLowerCase()] || defaultReaction;

  showTyping();
  await appendBot(reaction, 1000);
  showTyping();
  await appendBot(\`Y recuerda 😊<br>tu asistente <strong>\${name}</strong> nunca duerme.<br>Así como yo te estoy atendiendo ahora 👋<br>también puede atender clientes de tu negocio<br>a <strong>cualquier hora</strong> — incluso mientras duermes.\`, 2200);
  showTyping();
  await appendBot(\`\${state.name}, una pregunta importante 😊<br>¿Tu negocio ya tiene página web?\`, 3800);
  state.step = 'website';
  appendOptions([
    { value: 'yes', label: '✅ Sí tengo web' },
    { value: 'no', label: '❌ No tengo web' },
    { value: 'bad', label: '😅 Tengo una pero está vieja' },
  ]);
  disableInput('Selecciona una opción...');
}

async function handleWebsite(has, label) {
  state.hasWebsite = has;
  appendUser(label);
  disableInput();

  if (has === 'yes') {
    showTyping();
    await appendBot(\`Perfecto 👏<br>Podemos integrar tu asistente <strong>\${state.assistantName}</strong> directamente a tu página actual.<br><br>Sin cambiar nada de tu web — solo agregamos el asistente.\`, 1000);
    showTyping();
    await appendBot(\`✦ Atención al cliente 24/7<br>✦ Captura de leads automática<br>✦ Soporte en español e inglés<br>✦ Integración con WhatsApp\`, 2400);
  } else if (has === 'no') {
    showTyping();
    await appendBot(\`No hay problema 😊<br>También podemos crear una <strong>landing page moderna</strong> para tu negocio con el asistente integrado.\`, 1000);
    showTyping();
    await appendBot(\`✦ Diseño mobile-first premium<br>✦ Tu branding y colores<br>✦ Asistente \${state.assistantName} integrado<br>✦ WhatsApp directo<br>✦ Setup completo\`, 2400);
  } else {
    showTyping();
    await appendBot(\`¡Perfecto momento para actualizarla! 😊<br>Podemos crear una nueva landing page moderna<br>y migrar todo tu contenido con <strong>\${state.assistantName}</strong> integrado.\`, 1000);
    showTyping();
    await appendBot(\`Tu negocio merece una presencia digital que<br>realmente refleje tu calidad. 🔥\`, 2400);
  }

  showTyping();
  await appendBot(\`\${state.name}, para enviarte información personalizada y preparar tu demo 😊<br>¿Cuál es tu email?\`, 3800);
  state.step = 'email';
  enableInput('Tu email...');
}

async function handleEmail(email) {
  state.email = email;
  appendUser(email);
  disableInput();
  showTyping();
  await appendBot(\`Perfecto 👏<br>¿Y tu número de WhatsApp, \${state.name}?\`, 1000);
  state.step = 'phone';
  enableInput('Tu WhatsApp...');
}

async function handlePhone(phone) {
  state.phone = phone;
  appendUser(phone);
  disableInput();
  showTyping();
  await appendBot(\`¡Listo \${state.name}! 🎉<br>Tenemos todo lo que necesitamos.<br><br>En breve un especialista de Ivamar AI se comunicará contigo para preparar tu asistente <strong>\${state.assistantName}</strong> y darte todos los detalles. 🚀\`, 1200);
  showTyping();
  await appendBot(\`Muchos negocios ya están comenzando a usar asistentes IA para atender clientes 24/7.<br>El tuyo puede ser el próximo. 😊<br><br>Mientras tanto, puedes revisar los <a href="#precios" style="color:var(--teal)">planes disponibles</a> aquí abajo. 👇\`, 2800);
  state.step = 'done';
}

// ─── INPUT HANDLER ────────────────────────────────────────
async function sendMsg() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text || state.isTyping) return;
  state.isTyping = true;
  input.value = '';
  appendUser(text);
  disableInput('IvA está escribiendo...');
  showTyping();
  const reply = await callIvA(text);
  await appendBot(reply, 0);
  enableInput();
  state.isTyping = false;
}

async function selectOption(value, label) {
  if (state.isTyping) return;
  state.isTyping = true;

  // Disable all option buttons
  document.querySelectorAll('.opt-btn').forEach(b => b.disabled = true);

  switch (state.step) {
    case 'businessType': await handleBusinessType(value, label); break;
    case 'website': await handleWebsite(value, label); break;
    default: break;
  }

  state.isTyping = false;
}

// ─── QUICK ACTIONS ────────────────────────────────────────
async function quickAction(type) {
  if (state.isTyping) return;
  state.isTyping = true;

  const responses = {
    precios: \`Los planes arrancan desde <strong>$29/mes</strong> + $125 de setup 😊<br>Dependiendo de las necesidades de tu negocio, el precio puede variar.<br>Puedes ver todos los detalles en la sección de precios aquí abajo 👇\`,
    como: \`Es muy simple \${state.name || ''} 😊<br>1️⃣ Conversamos sobre tu negocio<br>2️⃣ Entrenamos a tu asistente con tu info<br>3️⃣ Lo integramos a tu web o creamos tu página<br>4️⃣ Tu asistente empieza a atender clientes 24/7 🚀\`,
    integrar: \`¡Perfecto! Si ya tienes web, integramos el asistente directamente. 🔗<br>Sin cambios en tu diseño — solo agregamos el asistente.<br>Funciona en cualquier plataforma web.\`,
    landing: \`También creamos landing pages modernas con el asistente integrado 🌐<br>Diseño premium, mobile-first, con tu branding y colores.<br>¡Todo incluido en el setup!\`,
    hablar: \`¡Claro! Puedes contactarnos directamente por WhatsApp:<br><a href="https://wa.me/18635216708" style="color:var(--teal)" target="_blank">+1 (863) 521-6708</a> 👋<br>o escríbenos a <a href="mailto:connect@ivamarai.com" style="color:var(--teal)">connect@ivamarai.com</a>\`,
  };

  appendUser(document.querySelector(\`.qbtn[onclick*="\${type}"]\`)?.textContent || type);
  showTyping();
  await appendBot(responses[type] || '😊', 1000);
  state.isTyping = false;
}

function scrollToChat() {
  document.getElementById('msgs').scrollIntoView({ behavior: 'smooth' });
  document.getElementById('chatInput').focus();
}

// ─── START ────────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(startConversation, 500);
});
</script>
</body>
</html>

`;