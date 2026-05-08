module.exports = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>IvA — Ivamar AI Assistant</title>
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

body::before {
  content: '';
  position: fixed; inset: 0;
  background:
    radial-gradient(ellipse 60% 40% at 20% 20%, rgba(0,229,200,0.04) 0%, transparent 60%),
    radial-gradient(ellipse 50% 50% at 80% 80%, rgba(0,100,200,0.03) 0%, transparent 60%);
  pointer-events: none; z-index: 0;
}

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

.main {
  min-height: 100vh;
  padding: 5rem 1.5rem 2rem;
  max-width: 720px;
  margin: 0 auto;
  position: relative; z-index: 1;
  display: flex; flex-direction: column;
}

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
  content: 'Most Popular';
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
  cursor: pointer;
}
.sec-card:hover { border-color: rgba(0,229,200,0.15); }
.sec-icon { font-size: 1.5rem; margin-bottom: 0.5rem; }
.sec-name { font-size: 0.75rem; font-weight: 700; margin-bottom: 0.3rem; }
.sec-desc { font-size: 0.68rem; color: var(--gray); line-height: 1.5; }

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
    <a href="#pricing" class="nav-prices">Pricing</a>
    <a href="/es/asistente" class="nav-lang">🇵🇷 Español</a>
  </div>
</nav>

<!-- MAIN -->
<div class="main">

  <!-- HERO MINI -->
  <div class="hero-mini">
    <div class="hero-mini-badge">
      <div class="badge-dot"></div>
      IvA is online now
    </div>
    <h1>Your business deserves an<br><span>intelligent assistant</span></h1>
    <p>Talk to IvA and experience how it works in real time</p>
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
          <div class="chat-agent-sub">● Online · Responds instantly</div>
        </div>
      </div>
      <div class="chat-header-right">ivamarai.com</div>
    </div>

    <div class="chat-msgs" id="msgs"></div>

    <div class="quick-btns" id="quickBtns">
      <button class="qbtn" onclick="quickAction('pricing')">💰 Pricing</button>
      <button class="qbtn" onclick="quickAction('how')">⚡ How it works</button>
      <button class="qbtn" onclick="quickAction('integrate')">🔗 Integrate to my site</button>
      <button class="qbtn" onclick="quickAction('landing')">🌐 I need a landing page</button>
      <button class="qbtn" onclick="quickAction('talk')">👋 Talk to someone</button>
    </div>

    <div class="chat-input-area">
      <input
        class="chat-input"
        id="chatInput"
        placeholder="Type here..."
        onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendMsg();}"
        autocomplete="off"
      >
      <button class="chat-send" id="sendBtn" onclick="sendMsg()">➤</button>
    </div>
  </div>

  <!-- PRICING -->
  <div class="pricing-section" id="pricing">
    <div class="section-label">Plans & Pricing</div>
    <div class="pricing-grid">
      <div class="price-card">
        <div class="price-name">Starter</div>
        <div class="price-amount">$29<span>/mo</span></div>
        <div class="price-setup">+ $125 setup · starting at</div>
        <ul class="price-features">
          <li>AI Assistant for your business</li>
          <li>English & Spanish</li>
          <li>Web integration or direct link for social media</li>
          <li>Mobile-friendly · Works on Instagram, Facebook & WhatsApp</li>
          <li>Basic lead capture</li>
          <li>Basic business training</li>
        </ul>
        <button class="price-cta" onclick="window.location.href='/quote'">Get Started →</button>
      </div>
      <div class="price-card featured">
        <div class="price-name">Growth</div>
        <div class="price-amount">$49<span>/mo</span></div>
        <div class="price-setup">+ $125 setup · starting at</div>
        <ul class="price-features">
          <li>Everything in Starter</li>
          <li>WhatsApp Integration</li>
          <li>Enhanced AI Training</li>
          <li>Higher usage capacity</li>
          <li>Advanced lead capture</li>
          <li>Priority support</li>
        </ul>
        <button class="price-cta" onclick="window.location.href='/quote'">Get Started →</button>
      </div>
      <div class="price-card">
        <div class="price-name">Premium</div>
        <div class="price-amount" style="font-size:1.4rem;">Custom</div>
        <div class="price-setup">Based on your needs</div>
        <ul class="price-features">
          <li>Law firms & legal offices</li>
          <li>Financial services</li>
          <li>Hotels & chains</li>
          <li>Advanced integrations</li>
          <li>Custom workflows</li>
          <li>Premium onboarding</li>
        </ul>
        <button class="price-cta" onclick="window.open('https://wa.me/18635216708','_blank')">Contact Us →</button>
      </div>
    </div>
  </div>

  <!-- TECH -->
  <div class="tech-section">
    <div class="tech-label">Powered by trusted modern technologies</div>
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
    <div class="section-label">Additional Services</div>
    <div class="secondary-grid">
      <div class="sec-card" onclick="window.location.href='/quote'">
        <div class="sec-icon">🌐</div>
        <div class="sec-name">Landing Pages</div>
        <div class="sec-desc">Modern pages with your assistant built in</div>
      </div>
      <div class="sec-card" onclick="window.location.href='/demos'">
        <div class="sec-icon">🛒</div>
        <div class="sec-name">Ordering Systems</div>
        <div class="sec-desc">Digital cart with WhatsApp ordering</div>
      </div>
      <div class="sec-card" onclick="window.location.href='/quote'">
        <div class="sec-icon">⚡</div>
        <div class="sec-name">Premium Solutions</div>
        <div class="sec-desc">Advanced integrations for your industry</div>
      </div>
    </div>
  </div>

  <!-- FOOTER -->
  <div class="page-footer">
    <p>© 2025 Ivamar AI LLC · Delaware, USA<br>
    <a href="/about">About Us</a> · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="mailto:connect@ivamarai.com">connect@ivamarai.com</a></p>
  </div>

</div>

<script>
let state = {
  step: 'greeting',
  name: '',
  location: '',
  businessType: '',
  hasWebsite: null,
  assistantName: '',
  email: '',
  phone: '',
  isTyping: false
};

const now = () => {
  const d = new Date();
  return d.getHours().toString().padStart(2,'0') + ':' + d.getMinutes().toString().padStart(2,'0');
};

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
      msgs.scrollTop = msgs.scrollHeight;
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
  msgs.scrollTop = msgs.scrollHeight;
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
  msgs.scrollTop = msgs.scrollHeight;
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
  msgs.scrollTop = msgs.scrollHeight;
}

function disableInput(placeholder = 'Select an option...') {
  document.getElementById('chatInput').placeholder = placeholder;
  document.getElementById('chatInput').disabled = true;
  document.getElementById('sendBtn').disabled = true;
}

function enableInput(placeholder = 'Type here...') {
  document.getElementById('chatInput').placeholder = placeholder;
  document.getElementById('chatInput').disabled = false;
  document.getElementById('sendBtn').disabled = false;
  document.getElementById('chatInput').focus();
}

async function startConversation() {
  disableInput('IvA is typing...');
  showTyping();
  await appendBot('Hi 👋<br>I\\'m IvA, the assistant from Ivamar AI.<br>Your business can have an AI assistant <em>just like this one</em>.', 1200);
  showTyping();
  await appendBot('Tell me 😊<br>Where are you visiting us from today?', 2200);
  state.step = 'location';
  enableInput('Your city or country...');
}

async function handleLocation(location) {
  state.location = location;
  appendUser(location);
  disableInput();
  showTyping();
  await appendBot(\`Great! 👏<br>So glad to have someone from <strong>\${location}</strong> here.\`, 1000);
  showTyping();
  await appendBot('What\\'s your name? 😊', 1800);
  state.step = 'name';
  enableInput('Your name...');
}

async function handleName(name) {
  state.name = name.charAt(0).toUpperCase() + name.slice(1);
  appendUser(name);
  disableInput();
  showTyping();
  await appendBot(\`Nice to meet you, <strong>\${state.name}</strong> 😍\`, 1000);
  showTyping();
  await appendBot(\`What type of business do you have, \${state.name}? 👇\`, 1800);
  state.step = 'businessType';
  appendOptions([
    { value: 'restaurant', label: '🍽️ Restaurant' },
    { value: 'lawyer', label: '⚖️ Law Firm' },
    { value: 'realtor', label: '🏠 Realtor' },
    { value: 'salon', label: '💅 Salon' },
    { value: 'financial', label: '💰 Financial' },
    { value: 'contractor', label: '🔨 Contractor' },
    { value: 'petshop', label: '🐾 Pet Shop' },
    { value: 'other', label: '✨ Other' },
  ]);
  disableInput('Select your business type...');
}

async function handleBusinessType(type, label) {
  state.businessType = type;
  appendUser(label);
  disableInput();

  const reactions = {
    restaurant: \`\${state.name}, restaurants with AI assistants handle orders and questions 24/7 automatically! 🍽️\`,
    lawyer: \`Perfect \${state.name}, law firms use AI for initial client intake — it organizes all the information before the consultation. ⚖️\`,
    realtor: \`Great choice \${state.name}! An AI assistant qualifies leads automatically and answers property questions around the clock. 🏠\`,
    salon: \`\${state.name}, salons with AI never miss an appointment! Scheduling, questions and confirmations — all automated. 💅\`,
    financial: \`\${state.name}, financial services use AI for initial pre-qualification — it collects client info before the evaluation. 💰\`,
    contractor: \`\${state.name}! Contractors with AI capture leads, provide initial estimates and respond 24/7. 🔨\`,
    petshop: \`Great niche \${state.name}! A pet shop AI handles appointments, product questions and more. 🐾\`,
    other: \`Perfect \${state.name}, we have solutions for almost any type of business. 😊\`,
  };

  showTyping();
  await appendBot(reactions[type] || reactions.other, 1000);
  showTyping();
  await appendBot(\`And the best part 😊<br>when we create your assistant,<br>you decide the <strong>name and personality</strong><br>so it connects perfectly with your brand.\`, 2200);
  showTyping();
  await appendBot(\`Just like I'm IvA 👋<br>your business can have a completely personalized one.<br><br>What name would you give your assistant? 😍\`, 3600);
  state.step = 'assistantName';
  enableInput('Give your assistant a name...');
}

async function handleAssistantName(name) {
  state.assistantName = name;
  appendUser(name);
  disableInput();

  const reactions = {
    lexia: \`LexIA 😮‍💨<br>that name is <strong>perfect</strong> for a law firm.\`,
    nayeli: \`Nayeli 🌺<br>what a beautiful and memorable name!\`,
    sharky: \`Sharky 🦈<br>now that has personality! Clients will love it.\`,
    max: \`Max 🐾<br>simple, direct and easy to remember. Perfect!\`,
  };

  const defaultReaction = \`<strong>\${name}</strong> 😮‍💨<br>that name has <em>everything</em>. Clients are going to connect with it immediately.\`;
  const reaction = reactions[name.toLowerCase()] || defaultReaction;

  showTyping();
  await appendBot(reaction, 1000);
  showTyping();
  await appendBot(\`And remember 😊<br><strong>\${name}</strong> never sleeps.<br>Just like I'm here for you right now 👋<br>it can handle your customers<br>at <strong>any hour</strong> — even while you sleep.\`, 2200);
  showTyping();
  await appendBot(\`\${state.name}, one important question 😊<br>Does your business already have a website?\`, 3800);
  state.step = 'website';
  appendOptions([
    { value: 'yes', label: '✅ Yes, I have one' },
    { value: 'no', label: '❌ No website yet' },
    { value: 'bad', label: '😅 Yes but it\\'s outdated' },
  ]);
  disableInput('Select an option...');
}

async function handleWebsite(has, label) {
  state.hasWebsite = has;
  appendUser(label);
  disableInput();

  if (has === 'yes') {
    showTyping();
    await appendBot(\`Perfect 👏<br>We can integrate <strong>\${state.assistantName}</strong> directly into your current website.<br><br>No redesign needed — we just add the assistant.\`, 1000);
    showTyping();
    await appendBot(\`✦ 24/7 customer support<br>✦ Automatic lead capture<br>✦ English & Spanish support<br>✦ WhatsApp integration\`, 2400);
  } else if (has === 'no') {
    showTyping();
    await appendBot(\`No problem 😊<br>We can also build a <strong>modern landing page</strong> for your business with the assistant built in.\`, 1000);
    showTyping();
    await appendBot(\`✦ Mobile-first premium design<br>✦ Your branding & colors<br>✦ \${state.assistantName} integrated<br>✦ WhatsApp direct<br>✦ Complete setup\`, 2400);
  } else {
    showTyping();
    await appendBot(\`Perfect time for an upgrade! 😊<br>We can build a modern landing page<br>and migrate everything with <strong>\${state.assistantName}</strong> built in.\`, 1000);
    showTyping();
    await appendBot(\`Your business deserves a digital presence that<br>truly reflects your quality. 🔥\`, 2400);
  }

  showTyping();
  await appendBot(\`\${state.name}, to send you personalized info and prepare your demo 😊<br>What's your email?\`, 3800);
  state.step = 'email';
  enableInput('Your email...');
}

async function handleEmail(email) {
  state.email = email;
  appendUser(email);
  disableInput();
  showTyping();
  await appendBot(\`Got it 👏<br>And your WhatsApp number, \${state.name}?\`, 1000);
  state.step = 'phone';
  enableInput('Your WhatsApp...');
}

async function handlePhone(phone) {
  state.phone = phone;
  appendUser(phone);
  disableInput();
  showTyping();
  await appendBot(\`All set, \${state.name}! 🎉<br>We have everything we need.<br><br>An Ivamar AI specialist will reach out shortly to set up <strong>\${state.assistantName}</strong> and walk you through all the details. 🚀\`, 1200);
  showTyping();
  await appendBot(\`Many businesses are already using AI assistants to serve customers 24/7.<br>Yours could be next. 😊<br><br>Meanwhile, check out the available <a href="#pricing" style="color:var(--teal)">plans below</a>. 👇\`, 2800);
  state.step = 'done';
}

async function sendMsg() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text || state.isTyping) return;

  state.isTyping = true;
  input.value = '';
  disableInput('IvA is typing...');

  switch (state.step) {
    case 'location': await handleLocation(text); break;
    case 'name': await handleName(text); break;
    case 'assistantName': await handleAssistantName(text); break;
    case 'email': await handleEmail(text); break;
    case 'phone': await handlePhone(text); break;
    default:
      appendUser(text);
      showTyping();
      await appendBot(\`\${state.name ? state.name + ', t' : 'T'}hanks for reaching out 😊 To continue, complete the flow above or reach us on <a href="https://wa.me/18635216708" style="color:var(--teal)" target="_blank">WhatsApp</a>.\`, 1000);
      enableInput();
  }

  state.isTyping = false;
}

async function selectOption(value, label) {
  if (state.isTyping) return;
  state.isTyping = true;
  document.querySelectorAll('.opt-btn').forEach(b => b.disabled = true);

  switch (state.step) {
    case 'businessType': await handleBusinessType(value, label); break;
    case 'website': await handleWebsite(value, label); break;
    default: break;
  }

  state.isTyping = false;
}

async function quickAction(type) {
  if (state.isTyping) return;
  state.isTyping = true;

  const responses = {
    pricing: \`Plans start at <strong>$29/month</strong> + $125 setup 😊<br>Pricing depends on your business needs and usage.<br>Check out all the details in the pricing section below 👇\`,
    how: \`It's simple \${state.name || ''} 😊<br>1️⃣ We learn about your business<br>2️⃣ We train your assistant with your info<br>3️⃣ We integrate it into your site or build your page<br>4️⃣ Your assistant starts serving customers 24/7 🚀\`,
    integrate: \`If you already have a website, we integrate the assistant directly. 🔗<br>No changes to your design — we just add the assistant.<br>Works on any web platform.\`,
    landing: \`We also build modern landing pages with the assistant built in 🌐<br>Premium mobile-first design, your branding and colors.<br>Everything included in the setup!\`,
    talk: \`Of course! Reach us directly on WhatsApp:<br><a href="https://wa.me/18635216708" style="color:var(--teal)" target="_blank">+1 (863) 521-6708</a> 👋<br>or email us at <a href="mailto:connect@ivamarai.com" style="color:var(--teal)">connect@ivamarai.com</a>\`,
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

window.addEventListener('load', () => {
  setTimeout(startConversation, 500);
});
</script>
</body>
</html>

`;