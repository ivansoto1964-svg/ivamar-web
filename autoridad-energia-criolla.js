// src/views/autoridad-energia-criolla.js
module.exports = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Autoridad de Energía Criolla — Paneles Solares Puerto Rico</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'DM Sans',sans-serif;background:#fff;color:#1a1a1a;overflow-x:hidden;}
:root{
  --green:#1a6b2f;
  --lime:#4CAF50;
  --yellow:#f5c842;
  --cream:#f8fdf8;
  --dark:#1a1a1a;
  --mid:#666;
  --border:#e0ede0;
}
nav{background:#fff;border-bottom:1px solid var(--border);padding:0 1.5rem;display:flex;align-items:center;justify-content:space-between;height:64px;position:sticky;top:0;z-index:100;}
.nav-logo{display:flex;align-items:center;gap:0.8rem;}
.nav-logo-icon{width:38px;height:38px;background:var(--green);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;}
.nav-logo-text{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;color:var(--dark);}
.nav-logo-sub{font-size:0.65rem;color:var(--mid);text-transform:uppercase;letter-spacing:0.08em;}
.nav-links{display:flex;align-items:center;gap:1.5rem;}
.nav-links a{font-size:0.8rem;color:var(--mid);text-decoration:none;font-weight:500;}
.nav-cta{background:var(--green);color:#fff!important;padding:0.55rem 1.2rem;border-radius:6px;font-weight:700!important;}

.hero{position:relative;min-height:88vh;background:linear-gradient(135deg,#0d3b1a 0%,#1a6b2f 50%,#0d3b1a 100%);display:flex;align-items:center;overflow:hidden;}
.hero-sun{position:absolute;right:-100px;top:-100px;width:500px;height:500px;background:radial-gradient(circle,rgba(245,200,66,0.15) 0%,transparent 70%);border-radius:50%;}
.hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px);background-size:40px 40px;}
.hero-inner{max-width:1100px;margin:0 auto;padding:4rem 1.5rem;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;position:relative;z-index:1;}
.hero-tag{font-size:0.65rem;font-weight:800;color:var(--yellow);letter-spacing:0.2em;text-transform:uppercase;margin-bottom:1rem;display:flex;align-items:center;gap:0.5rem;}
.hero-title{font-family:'Playfair Display',serif;font-size:clamp(2.5rem,5vw,4rem);font-weight:700;color:#fff;line-height:1.1;margin-bottom:1.2rem;}
.hero-title span{color:var(--yellow);}
.hero-sub{font-size:0.95rem;color:rgba(255,255,255,0.7);line-height:1.8;margin-bottom:2rem;max-width:480px;}
.hero-btns{display:flex;gap:1rem;flex-wrap:wrap;}
.btn-primary{display:inline-flex;align-items:center;gap:0.5rem;background:var(--yellow);color:var(--dark);padding:0.9rem 2rem;border-radius:6px;font-size:0.9rem;font-weight:800;text-decoration:none;transition:all 0.2s;}
.btn-primary:hover{background:#e0b530;transform:translateY(-1px);}
.btn-secondary{display:inline-flex;align-items:center;gap:0.5rem;border:1.5px solid rgba(255,255,255,0.4);color:#fff;padding:0.9rem 2rem;border-radius:6px;font-size:0.9rem;font-weight:600;text-decoration:none;transition:all 0.2s;}
.btn-secondary:hover{border-color:#fff;background:rgba(255,255,255,0.1);}
.hero-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-top:2rem;}
.stat{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:1rem;text-align:center;}
.stat-num{font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:700;color:var(--yellow);}
.stat-label{font-size:0.7rem;color:rgba(255,255,255,0.6);text-transform:uppercase;letter-spacing:0.08em;margin-top:0.2rem;}

.chat-card{background:#fff;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,0.3);overflow:hidden;max-width:420px;}
.chat-header{background:linear-gradient(135deg,var(--green),#2d8a4e);padding:1.2rem 1.5rem;display:flex;align-items:center;gap:0.8rem;}
.chat-avatar{width:42px;height:42px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.3rem;}
.chat-info{}
.chat-name{font-weight:700;color:#fff;font-size:0.95rem;}
.chat-status{font-size:0.72rem;color:rgba(255,255,255,0.7);margin-top:0.1rem;}
.chat-msgs{padding:1.2rem;background:#f8fdf8;min-height:240px;max-height:300px;overflow-y:auto;display:flex;flex-direction:column;gap:0.8rem;}
.msg{max-width:82%;padding:0.7rem 1rem;border-radius:14px;font-size:0.82rem;line-height:1.5;}
.msg.bot{background:#fff;border:1px solid var(--border);border-radius:14px 14px 14px 4px;align-self:flex-start;color:var(--dark);}
.msg.user{background:var(--green);color:#fff;border-radius:14px 14px 4px 14px;align-self:flex-end;}
.typing{display:flex;gap:4px;align-items:center;padding:0.5rem 0;}
.typing span{width:7px;height:7px;background:var(--mid);border-radius:50%;animation:bounce 1.2s infinite;}
.typing span:nth-child(2){animation-delay:0.2s;}
.typing span:nth-child(3){animation-delay:0.4s;}
@keyframes bounce{0%,60%,100%{transform:translateY(0);}30%{transform:translateY(-6px);}}
.chat-suggs{padding:0.8rem 1.2rem;display:flex;flex-wrap:wrap;gap:0.4rem;border-top:1px solid var(--border);background:#fff;}
.sugg{font-size:0.72rem;padding:0.35rem 0.7rem;border:1px solid var(--border);border-radius:20px;background:#fff;cursor:pointer;color:var(--green);font-weight:600;transition:all 0.15s;}
.sugg:hover{background:var(--green);color:#fff;border-color:var(--green);}
.chat-input-row{display:flex;gap:0.5rem;padding:0.8rem 1rem;border-top:1px solid var(--border);background:#fff;}
.chat-input{flex:1;border:1px solid var(--border);border-radius:20px;padding:0.6rem 1rem;font-size:0.82rem;outline:none;font-family:inherit;}
.chat-input:focus{border-color:var(--green);}
.chat-send{background:var(--green);color:#fff;border:none;border-radius:50%;width:36px;height:36px;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;flex-shrink:0;}

.servicios{padding:5rem 1.5rem;background:var(--cream);}
.servicios-inner{max-width:1000px;margin:0 auto;}
.sec-tag{font-size:0.65rem;font-weight:700;color:var(--lime);letter-spacing:0.2em;text-transform:uppercase;margin-bottom:0.5rem;}
.sec-title{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,4vw,2.5rem);font-weight:700;color:var(--dark);margin-bottom:0.5rem;}
.sec-sub{font-size:0.88rem;color:var(--mid);line-height:1.7;max-width:500px;margin-bottom:3rem;}
.servicios-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
.servicio-card{background:#fff;border-radius:16px;padding:2rem;border:1px solid var(--border);transition:all 0.2s;}
.servicio-card:hover{border-color:var(--lime);box-shadow:0 8px 24px rgba(76,175,80,0.1);transform:translateY(-2px);}
.servicio-icon{font-size:2.5rem;margin-bottom:1rem;}
.servicio-title{font-size:1rem;font-weight:700;color:var(--dark);margin-bottom:0.5rem;}
.servicio-desc{font-size:0.82rem;color:var(--mid);line-height:1.6;}

.ahorro{padding:5rem 1.5rem;background:linear-gradient(135deg,var(--green),#2d8a4e);}
.ahorro-inner{max-width:1000px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;}
.ahorro-title{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3vw,2.5rem);font-weight:700;color:#fff;margin-bottom:1rem;}
.ahorro-sub{font-size:0.9rem;color:rgba(255,255,255,0.75);line-height:1.8;margin-bottom:2rem;}
.ahorro-cards{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}
.ahorro-card{background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:1.2rem;text-align:center;}
.ahorro-card-num{font-family:'Playfair Display',serif;font-size:2rem;font-weight:700;color:var(--yellow);}
.ahorro-card-label{font-size:0.72rem;color:rgba(255,255,255,0.65);margin-top:0.3rem;}

.incentivos{padding:5rem 1.5rem;background:#fff;}
.incentivos-inner{max-width:1000px;margin:0 auto;}
.incentivos-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem;margin-top:2.5rem;}
.incentivo-card{border:1px solid var(--border);border-radius:16px;padding:1.8rem;display:flex;gap:1rem;align-items:flex-start;}
.incentivo-icon{font-size:2rem;flex-shrink:0;}
.incentivo-title{font-size:0.95rem;font-weight:700;color:var(--dark);margin-bottom:0.4rem;}
.incentivo-desc{font-size:0.82rem;color:var(--mid);line-height:1.6;}
.incentivo-badge{display:inline-block;background:#e8f5e9;color:var(--green);font-size:0.68rem;font-weight:700;padding:0.2rem 0.5rem;border-radius:4px;margin-top:0.5rem;}

.review-sec{padding:5rem 1.5rem;background:var(--cream);}
.review-inner{max-width:1000px;margin:0 auto;}
.review-card{background:#fff;border-radius:16px;padding:2rem;border:1px solid var(--border);max-width:600px;margin:2rem auto 0;}
.review-stars{color:var(--yellow);font-size:1.2rem;margin-bottom:0.8rem;}
.review-text{font-size:0.95rem;color:var(--dark);line-height:1.7;font-style:italic;margin-bottom:1rem;}
.review-author{font-size:0.82rem;font-weight:700;color:var(--mid);}

.cta-sec{padding:5rem 1.5rem;background:var(--dark);text-align:center;}
.cta-title{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;color:#fff;margin-bottom:1rem;}
.cta-sub{font-size:0.95rem;color:rgba(255,255,255,0.6);line-height:1.7;max-width:500px;margin:0 auto 2.5rem;}
.cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}
.btn-wa{display:inline-flex;align-items:center;gap:0.6rem;background:#25D366;color:#fff;padding:1rem 2rem;border-radius:8px;font-size:0.9rem;font-weight:700;text-decoration:none;}
.btn-call{display:inline-flex;align-items:center;gap:0.6rem;border:1.5px solid rgba(255,255,255,0.3);color:#fff;padding:1rem 2rem;border-radius:8px;font-size:0.9rem;font-weight:600;text-decoration:none;}

.powered{background:#111;padding:1.2rem;text-align:center;font-size:0.72rem;color:rgba(255,255,255,0.3);}
.powered a{color:rgba(255,255,255,0.5);text-decoration:none;}
.powered a:hover{color:#fff;}

@media(max-width:768px){
  .hero-inner{grid-template-columns:1fr;}
  .chat-card{max-width:100%;}
  .servicios-grid{grid-template-columns:1fr;}
  .ahorro-inner{grid-template-columns:1fr;}
  .incentivos-grid{grid-template-columns:1fr;}
  .hero-stats{grid-template-columns:repeat(3,1fr);}
}
</style>
</head>
<body>

<nav>
  <div class="nav-logo">
    <div class="nav-logo-icon">☀️</div>
    <div>
      <div class="nav-logo-text">Autoridad Energía Criolla</div>
      <div class="nav-logo-sub">Paneles Solares · Puerto Rico</div>
    </div>
  </div>
  <div class="nav-links">
    <a href="#servicios">Servicios</a>
    <a href="#incentivos">Incentivos</a>
    <a href="https://wa.me/19398651483" target="_blank" class="nav-cta">📲 Cotización Gratis</a>
  </div>
</nav>

<section class="hero">
  <div class="hero-sun"></div>
  <div class="hero-grid"></div>
  <div class="hero-inner">
    <div>
      <div class="hero-tag">☀️ Energía Solar · Puerto Rico</div>
      <h1 class="hero-title">Enciende tu hogar con <span>energía criolla</span></h1>
      <p class="hero-sub">Instalación, reparación y mantenimiento de sistemas solares. Personalizados para cada hogar y negocio en la isla. Ahorra en tu factura de LUMA desde el primer mes.</p>
      <div class="hero-btns">
        <a href="https://wa.me/19398651483" target="_blank" class="btn-primary">📲 Cotización Gratis</a>
        <a href="#chat" class="btn-secondary">💬 Pregúntale a IvA</a>
      </div>
      <div class="hero-stats">
        <div class="stat">
          <div class="stat-num">30%</div>
          <div class="stat-label">Crédito Federal</div>
        </div>
        <div class="stat">
          <div class="stat-num">$0</div>
          <div class="stat-label">Cotización</div>
        </div>
        <div class="stat">
          <div class="stat-num">25+</div>
          <div class="stat-label">Años garantía</div>
        </div>
      </div>
    </div>

    <div id="chat">
      <div class="chat-card">
        <div class="chat-header">
          <div class="chat-avatar">☀️</div>
          <div class="chat-info">
            <div class="chat-name">IvA — Asistente Solar</div>
            <div class="chat-status">● En línea · Autoridad Energía Criolla</div>
          </div>
        </div>
        <div class="chat-msgs" id="aecMsgs">
          <div class="msg bot">¡Hola! Soy IvA, el asistente de Autoridad de Energía Criolla 🌞 ¿Cuánto pagas de luz al mes aproximadamente? Con eso te digo cuánto puedes ahorrar con paneles solares.</div>
        </div>
        <div class="chat-suggs">
          <button class="sugg" onclick="aecReply(this)">¿Cuánto cuesta instalar?</button>
          <button class="sugg" onclick="aecReply(this)">¿Qué incentivos hay?</button>
          <button class="sugg" onclick="aecReply(this)">¿Cuánto puedo ahorrar?</button>
          <button class="sugg" onclick="aecReply(this)">¿Tienen financiamiento?</button>
        </div>
        <div class="chat-input-row">
          <input class="chat-input" id="aecInput" placeholder="Escribe tu pregunta..." onkeydown="if(event.key==='Enter')aecSend()">
          <button class="chat-send" onclick="aecSend()">➤</button>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="servicios" id="servicios">
  <div class="servicios-inner">
    <div class="sec-tag">Nuestros Servicios</div>
    <h2 class="sec-title">Soluciones solares completas</h2>
    <p class="sec-sub">Desde la cotización hasta la instalación y el mantenimiento — te acompañamos en cada paso de tu transición a la energía solar.</p>
    <div class="servicios-grid">
      <div class="servicio-card">
        <div class="servicio-icon">🔆</div>
        <div class="servicio-title">Instalación Solar</div>
        <div class="servicio-desc">Sistemas residenciales y comerciales diseñados según tu consumo energético. Equipos de alta calidad con garantía extendida.</div>
      </div>
      <div class="servicio-card">
        <div class="servicio-icon">🔋</div>
        <div class="servicio-title">Baterías e Inversores</div>
        <div class="servicio-desc">Almacena la energía generada y úsala cuando más la necesites. Independencia energética real, incluso en apagones.</div>
      </div>
      <div class="servicio-card">
        <div class="servicio-icon">🔧</div>
        <div class="servicio-title">Reparación y Mantenimiento</div>
        <div class="servicio-desc">Servicio técnico profesional para sistemas existentes. Diagnóstico, limpieza y reparación para maximizar el rendimiento.</div>
      </div>
    </div>
  </div>
</section>

<section class="ahorro">
  <div class="ahorro-inner">
    <div>
      <h2 class="ahorro-title">¿Cuánto puedes ahorrar?</h2>
      <p class="ahorro-sub">La mayoría de nuestros clientes recuperan su inversión en 5-7 años y disfrutan de energía casi gratis por 20+ años más. Con los incentivos disponibles, nunca ha sido mejor momento para pasarte al solar.</p>
      <a href="https://wa.me/19398651483?text=Hola%20Reinaldo%2C%20quiero%20una%20cotizaci%C3%B3n%20para%20paneles%20solares" target="_blank" class="btn-primary">Quiero mi cotización gratuita →</a>
    </div>
    <div class="ahorro-cards">
      <div class="ahorro-card">
        <div class="ahorro-card-num">$150</div>
        <div class="ahorro-card-label">Ahorro mensual promedio</div>
      </div>
      <div class="ahorro-card">
        <div class="ahorro-card-num">7 años</div>
        <div class="ahorro-card-label">Retorno de inversión</div>
      </div>
      <div class="ahorro-card">
        <div class="ahorro-card-num">30%</div>
        <div class="ahorro-card-label">Crédito federal disponible</div>
      </div>
      <div class="ahorro-card">
        <div class="ahorro-card-num">25 años</div>
        <div class="ahorro-card-label">Garantía de paneles</div>
      </div>
    </div>
  </div>
</section>

<section class="incentivos" id="incentivos">
  <div class="incentivos-inner">
    <div class="sec-tag">Incentivos Disponibles</div>
    <h2 class="sec-title">El gobierno te paga por pasarte al solar</h2>
    <p class="sec-sub">Existen incentivos federales y locales que reducen significativamente el costo de tu sistema solar. Nosotros te guiamos en todo el proceso.</p>
    <div class="incentivos-grid">
      <div class="incentivo-card">
        <div class="incentivo-icon">🇺🇸</div>
        <div>
          <div class="incentivo-title">Crédito Federal ITC (30%)</div>
          <div class="incentivo-desc">El gobierno federal te devuelve el 30% del costo total del sistema como crédito en tus impuestos. Disponible para hogares y negocios hasta 2032.</div>
          <div class="incentivo-badge">Hasta $6,000 de ahorro</div>
        </div>
      </div>
      <div class="incentivo-card">
        <div class="incentivo-icon">🇵🇷</div>
        <div>
          <div class="incentivo-title">Ley 399 de Puerto Rico</div>
          <div class="incentivo-desc">Exención total del impuesto sobre la propiedad para sistemas de energía renovable instalados en Puerto Rico. Tu propiedad no paga impuestos adicionales por el sistema solar.</div>
          <div class="incentivo-badge">Exención de impuestos</div>
        </div>
      </div>
      <div class="incentivo-card">
        <div class="incentivo-icon">💰</div>
        <div>
          <div class="incentivo-title">Net Metering (LUMA)</div>
          <div class="incentivo-desc">Vende el exceso de energía que produces de vuelta a la red de LUMA y reduce tu factura mensual aún más. Tu medidor corre al revés.</div>
          <div class="incentivo-badge">Créditos en tu factura</div>
        </div>
      </div>
      <div class="incentivo-card">
        <div class="incentivo-icon">🏦</div>
        <div>
          <div class="incentivo-title">Financiamiento Disponible</div>
          <div class="incentivo-desc">No necesitas el dinero completo para empezar. Trabajamos con opciones de financiamiento para que tu instalación sea accesible desde el primer día.</div>
          <div class="incentivo-badge">Desde $0 de inicial</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="review-sec">
  <div class="review-inner">
    <div class="sec-tag">Lo Que Dicen Nuestros Clientes</div>
    <h2 class="sec-title">Confianza que habla por sí sola</h2>
    <div class="review-card">
      <div class="review-stars">★★★★★</div>
      <div class="review-text">"Tremendo ser humano. Me atendió excelente y sin pero. Le deseo mucho éxito."</div>
      <div class="review-author">— Luis Cardona · Facebook</div>
    </div>
  </div>
</section>

<section class="cta-sec">
  <div class="cta-title">¿Listo para independizarte de LUMA?</div>
  <p class="cta-sub">Cotización gratis, sin compromiso. Reinaldo Ortiz y su equipo te asesoran personalmente desde el primer contacto.</p>
  <div class="cta-btns">
    <a href="https://wa.me/19398651483?text=Hola%20Reinaldo%2C%20quiero%20una%20cotizaci%C3%B3n%20para%20paneles%20solares" target="_blank" class="btn-wa">📲 WhatsApp (939) 865-1483</a>
    <a href="tel:+19398651483" class="btn-call">📞 Llamar ahora</a>
  </div>
</section>

<div class="powered">
  Demo creado por <a href="https://ivamarai.com" target="_blank">Ivamar AI</a> · ¿Quieres un asistente digital para tu negocio? <a href="https://ivamarai.com" target="_blank">ivamarai.com</a>
</div>

<script>
let aecHistory = [];
let aecTyping = false;

function addAecMsg(text, type) {
  const msgs = document.getElementById('aecMsgs');
  const div = document.createElement('div');
  div.className = 'msg ' + type;
  div.textContent = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function showAecTyping() {
  const msgs = document.getElementById('aecMsgs');
  const div = document.createElement('div');
  div.id = 'aecTyping';
  div.className = 'msg bot';
  div.innerHTML = '<div class="typing"><span></span><span></span><span></span></div>';
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function removeAecTyping() {
  const el = document.getElementById('aecTyping');
  if (el) el.remove();
}

async function callAec(message) {
  const res = await fetch('/api/aec-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history: aecHistory })
  });
  const data = await res.json();
  const reply = data.reply || 'Hubo un error. Llámanos al (939) 865-1483.';
  aecHistory.push({ role: 'user', content: message });
  aecHistory.push({ role: 'assistant', content: reply });
  if (aecHistory.length > 20) aecHistory = aecHistory.slice(-20);
  return reply;
}

async function aecSend() {
  if (aecTyping) return;
  const input = document.getElementById('aecInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  addAecMsg(text, 'user');
  aecTyping = true;
  showAecTyping();
  const reply = await callAec(text);
  removeAecTyping();
  addAecMsg(reply, 'bot');
  aecTyping = false;
}

async function aecReply(el) {
  if (aecTyping) return;
  const text = el.textContent;
  document.querySelectorAll('.sugg').forEach(b => b.disabled = true);
  addAecMsg(text, 'user');
  aecTyping = true;
  showAecTyping();
  const reply = await callAec(text);
  removeAecTyping();
  addAecMsg(reply, 'bot');
  aecTyping = false;
}
</script>
</body>
</html>`;
