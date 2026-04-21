module.exports = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400&display=swap');
.auto-wrap{--black:#0A0A0A;--steel:#141414;--panel:#1C1C1C;--border:rgba(255,255,255,0.07);--red:#E63329;--white:#F5F5F0;--muted:#6B6B6B;--soft:#9A9A9A;--gold:#C9A84C;font-family:'Barlow',sans-serif;background:var(--black);color:var(--white);margin:-20px;overflow-x:hidden;}
.auto-wrap *{box-sizing:border-box;margin:0;padding:0;}

/* BANNER */
.auto-banner{background:linear-gradient(135deg,#E63329,#c42a20);padding:0.6rem 1.5rem;display:flex;align-items:center;justify-content:space-between;font-size:0.78rem;font-weight:600;color:white;position:sticky;top:0;z-index:200;flex-wrap:wrap;gap:0.5rem;}
.auto-banner-left{display:flex;align-items:center;gap:0.5rem;}
.auto-banner-dot{width:8px;height:8px;background:white;border-radius:50%;animation:autoBlink 1.5s ease-in-out infinite;}
@keyframes autoBlink{0%,100%{opacity:1}50%{opacity:0.3}}
.auto-banner-btn{background:white;color:#E63329;padding:0.3rem 0.8rem;border-radius:100px;font-size:0.72rem;font-weight:700;text-decoration:none;transition:all 0.2s;}
.auto-banner-btn:hover{transform:scale(1.05);}

/* NAV */
.auto-nav{padding:1rem 2rem;display:flex;align-items:center;justify-content:space-between;background:rgba(10,10,10,0.95);border-bottom:1px solid var(--border);}
.auto-nav-logo{display:flex;flex-direction:column;}
.auto-nav-name{font-family:'Barlow Condensed',sans-serif;font-size:1.4rem;font-weight:900;letter-spacing:0.05em;text-transform:uppercase;color:var(--white);line-height:1;}
.auto-nav-sub{font-family:'JetBrains Mono',monospace;font-size:0.6rem;color:var(--red);letter-spacing:0.2em;text-transform:uppercase;}
.auto-nav-badge{display:flex;align-items:center;gap:0.4rem;font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:#4CAF50;letter-spacing:0.1em;}
.auto-nav-badge::before{content:'●';font-size:0.5rem;}
.auto-nav-cta{background:var(--red);color:white;padding:0.5rem 1.2rem;border-radius:4px;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:0.9rem;letter-spacing:0.05em;text-transform:uppercase;border:none;cursor:pointer;transition:all 0.2s;text-decoration:none;}
.auto-nav-cta:hover{background:#c42a20;}

/* HERO */
.auto-hero{position:relative;min-height:85vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:4rem 2rem;overflow:hidden;}
.auto-hero-bg{position:absolute;inset:0;background:linear-gradient(135deg,rgba(230,51,41,0.08) 0%,transparent 50%,rgba(201,168,76,0.05) 100%);}
.auto-hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px);background-size:50px 50px;}
.auto-hero-tag{display:inline-flex;align-items:center;gap:0.5rem;border:1px solid rgba(230,51,41,0.3);background:rgba(230,51,41,0.08);padding:0.4rem 1rem;border-radius:2px;font-family:'JetBrains Mono',monospace;font-size:0.68rem;color:var(--red);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:2rem;position:relative;}
.auto-hero h1{font-family:'Barlow Condensed',sans-serif;font-size:clamp(3.5rem,9vw,7rem);font-weight:900;text-transform:uppercase;letter-spacing:-0.01em;line-height:0.95;margin-bottom:1.5rem;position:relative;}
.auto-hero h1 span{color:var(--red);}
.auto-hero-sub{color:var(--soft);font-size:1rem;line-height:1.7;max-width:480px;margin-bottom:2.5rem;position:relative;font-weight:400;}
.auto-hero-actions{display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;position:relative;margin-bottom:3rem;}
.auto-btn-primary{background:var(--red);color:white;padding:0.85rem 2rem;border-radius:4px;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:1rem;letter-spacing:0.08em;text-transform:uppercase;border:none;cursor:pointer;transition:all 0.2s;text-decoration:none;display:inline-flex;align-items:center;gap:0.5rem;}
.auto-btn-primary:hover{background:#c42a20;transform:translateY(-2px);box-shadow:0 8px 25px rgba(230,51,41,0.3);}
.auto-btn-ghost{background:transparent;color:var(--white);padding:0.85rem 2rem;border-radius:4px;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:1rem;letter-spacing:0.08em;text-transform:uppercase;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all 0.2s;text-decoration:none;display:inline-flex;align-items:center;gap:0.5rem;}
.auto-btn-ghost:hover{border-color:rgba(255,255,255,0.4);}
.auto-hero-stats{display:flex;gap:3rem;flex-wrap:wrap;justify-content:center;position:relative;}
.auto-stat{text-align:center;}
.auto-stat-num{font-family:'Barlow Condensed',sans-serif;font-size:2.2rem;font-weight:900;color:var(--white);letter-spacing:-0.02em;}
.auto-stat-num span{color:var(--red);}
.auto-stat-label{font-size:0.7rem;color:var(--muted);letter-spacing:0.12em;text-transform:uppercase;margin-top:0.2rem;font-family:'JetBrains Mono',monospace;}

/* INVENTORY */
.auto-inventory{padding:5rem 2rem;background:var(--steel);}
.auto-section-header{max-width:1100px;margin:0 auto 3rem;display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:1rem;}
.auto-section-label{font-family:'JetBrains Mono',monospace;font-size:0.68rem;color:var(--red);letter-spacing:0.2em;text-transform:uppercase;margin-bottom:0.5rem;}
.auto-section-title{font-family:'Barlow Condensed',sans-serif;font-size:clamp(2rem,4vw,3rem);font-weight:900;text-transform:uppercase;letter-spacing:0.02em;line-height:1;}
.auto-filter-tabs{display:flex;gap:0.5rem;flex-wrap:wrap;}
.auto-filter-tab{padding:0.4rem 1rem;border:1px solid var(--border);border-radius:2px;background:transparent;color:var(--soft);font-family:'Barlow Condensed',sans-serif;font-size:0.85rem;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;cursor:pointer;transition:all 0.2s;}
.auto-filter-tab.active,.auto-filter-tab:hover{background:var(--red);border-color:var(--red);color:white;}
.auto-cars-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:1.5rem;max-width:1100px;margin:0 auto;}

/* CAR CARD */
.auto-car-card{background:var(--panel);border:1px solid var(--border);border-radius:8px;overflow:hidden;transition:transform 0.3s,border-color 0.3s,box-shadow 0.3s;cursor:pointer;}
.auto-car-card:hover{transform:translateY(-4px);border-color:rgba(230,51,41,0.3);box-shadow:0 12px 40px rgba(0,0,0,0.4);}
.auto-car-img{position:relative;height:200px;background:linear-gradient(135deg,#1a1a1a,#222);display:flex;align-items:center;justify-content:center;font-size:5rem;overflow:hidden;}
.auto-car-img::before{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,transparent 60%,rgba(0,0,0,0.5));}
.auto-car-badge{position:absolute;top:0.8rem;left:0.8rem;padding:0.3rem 0.7rem;border-radius:2px;font-family:'Barlow Condensed',sans-serif;font-size:0.72rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;}
.auto-car-badge.hot{background:var(--red);color:white;}
.auto-car-badge.new{background:var(--gold);color:#000;}
.auto-car-price-tag{position:absolute;bottom:0.8rem;right:0.8rem;background:rgba(0,0,0,0.8);padding:0.4rem 0.8rem;border-radius:4px;font-family:'Barlow Condensed',sans-serif;font-size:1.1rem;font-weight:700;color:var(--gold);}
.auto-car-body{padding:1.2rem;}
.auto-car-name{font-family:'Barlow Condensed',sans-serif;font-size:1.3rem;font-weight:800;text-transform:uppercase;letter-spacing:0.03em;margin-bottom:0.4rem;}
.auto-car-specs{display:flex;gap:0.8rem;flex-wrap:wrap;margin-bottom:1rem;}
.auto-car-spec{font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:var(--soft);letter-spacing:0.05em;display:flex;align-items:center;gap:0.3rem;}
.auto-car-spec::before{content:'·';color:var(--red);}
.auto-car-footer{display:flex;gap:0.8rem;}
.auto-car-btn{flex:1;padding:0.6rem;border-radius:4px;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:0.85rem;letter-spacing:0.05em;text-transform:uppercase;border:none;cursor:pointer;transition:all 0.2s;}
.auto-car-btn-main{background:var(--red);color:white;}
.auto-car-btn-main:hover{background:#c42a20;}
.auto-car-btn-ghost{background:transparent;color:var(--soft);border:1px solid var(--border);}
.auto-car-btn-ghost:hover{border-color:rgba(255,255,255,0.3);color:var(--white);}

/* TESTIMONIALS */
.auto-testimonials{padding:5rem 2rem;background:var(--black);}
.auto-testimonials-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.2rem;max-width:1100px;margin:3rem auto 0;}
.auto-testimonial{background:var(--panel);border:1px solid var(--border);border-radius:8px;padding:1.5rem;position:relative;overflow:hidden;}
.auto-testimonial::before{content:'"';position:absolute;top:-0.5rem;left:1rem;font-size:5rem;color:var(--red);opacity:0.15;font-family:'Barlow Condensed',sans-serif;font-weight:900;line-height:1;}
.auto-stars{color:var(--gold);font-size:0.75rem;margin-bottom:0.8rem;}
.auto-testimonial-text{font-size:0.88rem;color:var(--soft);line-height:1.7;margin-bottom:1.2rem;font-style:italic;position:relative;}
.auto-testimonial-author{display:flex;align-items:center;gap:0.8rem;}
.auto-testimonial-avatar{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--red),var(--gold));display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;}
.auto-testimonial-name{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.05em;}
.auto-testimonial-car{font-size:0.72rem;color:var(--red);font-family:'JetBrains Mono',monospace;}

/* CHAT */
.auto-chat-section{padding:5rem 2rem;background:var(--steel);}
.auto-chat-inner{max-width:700px;margin:0 auto;}
.auto-chat-header{text-align:center;margin-bottom:2.5rem;}
.auto-chat-box{background:var(--black);border:1px solid var(--border);border-radius:12px;overflow:hidden;}
.auto-chat-topbar{background:var(--panel);padding:1rem 1.5rem;display:flex;align-items:center;gap:0.8rem;border-bottom:1px solid var(--border);}
.auto-chat-avatar{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,var(--red),#ff6b35);display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;}
.auto-chat-agent-name{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:1rem;text-transform:uppercase;letter-spacing:0.05em;}
.auto-chat-status{font-size:0.7rem;color:#4CAF50;font-family:'JetBrains Mono',monospace;display:flex;align-items:center;gap:0.3rem;}
.auto-chat-status::before{content:'●';font-size:0.5rem;}
.auto-chat-msgs{height:360px;overflow-y:auto;padding:1.5rem;display:flex;flex-direction:column;gap:1rem;scroll-behavior:smooth;}
.auto-chat-msgs::-webkit-scrollbar{width:4px;}
.auto-chat-msgs::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px;}
.auto-msg{max-width:80%;display:flex;flex-direction:column;gap:0.3rem;}
.auto-msg.bot{align-self:flex-start;}
.auto-msg.user{align-self:flex-end;}
.auto-msg-bubble{padding:0.75rem 1rem;border-radius:12px;font-size:0.88rem;line-height:1.5;}
.auto-msg.bot .auto-msg-bubble{background:var(--panel);color:var(--white);border-bottom-left-radius:4px;}
.auto-msg.user .auto-msg-bubble{background:var(--red);color:white;border-bottom-right-radius:4px;}
.auto-msg-time{font-size:0.65rem;color:var(--muted);font-family:'JetBrains Mono',monospace;}
.auto-msg.user .auto-msg-time{text-align:right;}
.auto-typing{display:flex;gap:4px;padding:0.75rem 1rem;background:var(--panel);border-radius:12px;border-bottom-left-radius:4px;width:fit-content;}
.auto-typing span{width:6px;height:6px;background:var(--soft);border-radius:50%;animation:autoType 1.2s ease-in-out infinite;}
.auto-typing span:nth-child(2){animation-delay:0.2s;}
.auto-typing span:nth-child(3){animation-delay:0.4s;}
@keyframes autoType{0%,100%{opacity:0.3;transform:scale(0.8)}50%{opacity:1;transform:scale(1)}}
.auto-chat-suggestions{display:flex;gap:0.5rem;flex-wrap:wrap;padding:0 1.5rem 1rem;}
.auto-suggestion{padding:0.35rem 0.8rem;background:var(--panel);border:1px solid var(--border);border-radius:100px;font-size:0.75rem;color:var(--soft);cursor:pointer;transition:all 0.2s;white-space:nowrap;}
.auto-suggestion:hover{border-color:var(--red);color:var(--red);}
.auto-chat-input-area{padding:1rem 1.5rem;border-top:1px solid var(--border);display:flex;gap:0.8rem;align-items:center;}
.auto-chat-input{flex:1;background:var(--panel);border:1px solid var(--border);border-radius:8px;padding:0.75rem 1rem;color:var(--white);font-family:'Barlow',sans-serif;font-size:0.9rem;outline:none;transition:border-color 0.2s;}
.auto-chat-input:focus{border-color:rgba(230,51,41,0.5);}
.auto-chat-input::placeholder{color:var(--muted);}
.auto-chat-send{background:var(--red);color:white;width:40px;height:40px;border-radius:8px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1rem;transition:all 0.2s;flex-shrink:0;}
.auto-chat-send:hover{background:#c42a20;}

/* CTA */
.auto-cta{padding:5rem 2rem;background:var(--black);text-align:center;position:relative;overflow:hidden;}
.auto-cta::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 50%,rgba(230,51,41,0.08),transparent 70%);}
.auto-cta h2{font-family:'Barlow Condensed',sans-serif;font-size:clamp(2.5rem,5vw,4rem);font-weight:900;text-transform:uppercase;letter-spacing:0.02em;margin-bottom:1rem;position:relative;}
.auto-cta h2 span{color:var(--red);}
.auto-cta p{color:var(--soft);max-width:480px;margin:0 auto 2.5rem;line-height:1.7;position:relative;}
.auto-cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;position:relative;}
.auto-cta-btn-main{display:inline-flex;align-items:center;gap:0.5rem;background:#00E5C8;color:#030508;padding:0.8rem 1.8rem;border-radius:4px;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:1rem;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;transition:all 0.25s;}
.auto-cta-btn-main:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(0,229,200,0.25);}
.auto-cta-btn-ghost{display:inline-flex;align-items:center;gap:0.5rem;background:transparent;color:var(--white);padding:0.8rem 1.8rem;border-radius:4px;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:1rem;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;transition:all 0.25s;border:1px solid rgba(255,255,255,0.15);}
.auto-cta-btn-ghost:hover{border-color:rgba(255,255,255,0.4);}

footer.auto-footer{background:#050505;padding:2rem;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;font-size:0.78rem;color:var(--muted);font-family:'JetBrains Mono',monospace;}

@media(max-width:600px){.auto-section-header{flex-direction:column;align-items:flex-start;}.auto-hero h1{font-size:3.5rem;}.auto-cta-btns{flex-direction:column;align-items:center;}.auto-cta-btns a{width:100%;justify-content:center;}}
</style>

<div class="auto-wrap">

  <!-- BANNER -->
  <div class="auto-banner">
    <div class="auto-banner-left"><span class="auto-banner-dot"></span>DEMO — Ejemplo real de Ivamar AI para Dealers</div>
    <div><a href="/quote" class="auto-banner-btn">¿Quieres uno así? →</a></div>
  </div>

  <!-- NAV -->
  <nav class="auto-nav">
    <div class="auto-nav-logo">
      <div class="auto-nav-name">Luis Soto <span style="color:var(--red)">Autos</span></div>
      <div class="auto-nav-sub">Puerto Rico & Florida · Since 2015</div>
    </div>
    <div class="auto-nav-badge">IvA Online 24/7</div>
    <a href="#chat" class="auto-nav-cta">Habla con IvA</a>
  </nav>

  <!-- HERO -->
  <section class="auto-hero">
    <div class="auto-hero-bg"></div>
    <div class="auto-hero-grid"></div>
    <div class="auto-hero-tag">🚗 Dealer Certificado · PR & FL</div>
    <h1>Tu próximo<br>carro <span>te espera</span></h1>
    <p class="auto-hero-sub">Más de 40 vehículos disponibles. Financiamiento flexible, trade-in aceptado. IvA te ayuda a encontrar el carro perfecto — 24/7.</p>
    <div class="auto-hero-actions">
      <a href="#inventory" class="auto-btn-primary">Ver Inventario →</a>
      <a href="#chat" class="auto-btn-ghost">Habla con IvA</a>
    </div>
    <div class="auto-hero-stats">
      <div class="auto-stat"><div class="auto-stat-num">40<span>+</span></div><div class="auto-stat-label">Vehículos</div></div>
      <div class="auto-stat"><div class="auto-stat-num">$0<span></span></div><div class="auto-stat-label">Down payment options</div></div>
      <div class="auto-stat"><div class="auto-stat-num">24<span>/7</span></div><div class="auto-stat-label">IvA disponible</div></div>
      <div class="auto-stat"><div class="auto-stat-num">10<span>yr</span></div><div class="auto-stat-label">En el negocio</div></div>
    </div>
  </section>

  <!-- INVENTORY -->
  <section class="auto-inventory" id="inventory">
    <div class="auto-section-header">
      <div>
        <div class="auto-section-label">Inventario disponible</div>
        <div class="auto-section-title">Encuentra tu carro</div>
      </div>
      <div class="auto-filter-tabs">
        <button class="auto-filter-tab active" onclick="filterCars('all',this)">Todos</button>
        <button class="auto-filter-tab" onclick="filterCars('sedan',this)">Sedán</button>
        <button class="auto-filter-tab" onclick="filterCars('suv',this)">SUV</button>
        <button class="auto-filter-tab" onclick="filterCars('truck',this)">Truck</button>
      </div>
    </div>
    <div class="auto-cars-grid" id="carsGrid"></div>
  </section>

  <!-- TESTIMONIALS -->
  <section class="auto-testimonials">
    <div style="max-width:1100px;margin:0 auto">
      <div class="auto-section-label" style="text-align:center">Lo que dicen nuestros clientes</div>
      <div class="auto-section-title" style="text-align:center">Compradores <span style="color:var(--red)">felices</span></div>
    </div>
    <div class="auto-testimonials-grid">
      <div class="auto-testimonial">
        <div class="auto-stars">★★★★★</div>
        <div class="auto-testimonial-text">IvA me respondió a las 11pm cuando estaba buscando un SUV. Al otro día fui al dealer y en 2 horas salí con mi Honda CR-V. El proceso fue increíble.</div>
        <div class="auto-testimonial-author"><div class="auto-testimonial-avatar">👩</div><div><div class="auto-testimonial-name">María Rodríguez</div><div class="auto-testimonial-car">Honda CR-V 2022</div></div></div>
      </div>
      <div class="auto-testimonial">
        <div class="auto-stars">★★★★★</div>
        <div class="auto-testimonial-text">Luis me consiguió financiamiento cuando otro dealer me dijo que no. El asistente me explicó todo el proceso antes de ir. 100% recomendado.</div>
        <div class="auto-testimonial-author"><div class="auto-testimonial-avatar">👨</div><div><div class="auto-testimonial-name">Carlos Medina</div><div class="auto-testimonial-car">Toyota Tacoma 2021</div></div></div>
      </div>
      <div class="auto-testimonial">
        <div class="auto-stars">★★★★★</div>
        <div class="auto-testimonial-text">Me aceptaron mi carro como trade-in y me aplicaron el valor al nuevo. IvA me calculó todo antes de llegar al dealer. Súper transparente.</div>
        <div class="auto-testimonial-author"><div class="auto-testimonial-avatar">👩</div><div><div class="auto-testimonial-name">Ana Flores</div><div class="auto-testimonial-car">Hyundai Tucson 2023</div></div></div>
      </div>
    </div>
  </section>

  <!-- CHAT -->
  <section class="auto-chat-section" id="chat">
    <div class="auto-chat-inner">
      <div class="auto-chat-header">
        <div class="auto-section-label" style="justify-content:center;display:flex">Asistente IA</div>
        <div class="auto-section-title" style="text-align:center">Habla con <span style="color:var(--red)">IvA</span></div>
        <p style="color:var(--soft);font-size:0.9rem;margin-top:0.5rem;line-height:1.6;text-align:center">IvA conoce todo el inventario, precios y opciones de financiamiento. Pregúntale lo que quieras — en inglés o español.</p>
      </div>
      <div class="auto-chat-box">
        <div class="auto-chat-topbar">
          <div class="auto-chat-avatar">🤖</div>
          <div>
            <div class="auto-chat-agent-name">IvA — Luis Soto Autos</div>
            <div class="auto-chat-status">En línea ahora</div>
          </div>
        </div>
        <div class="auto-chat-msgs" id="autoChatMsgs">
          <div class="auto-msg bot">
            <div class="auto-msg-bubble">¡Hola! 👋 Soy IvA, el asistente de Luis Soto Autos. Estoy aquí para ayudarte a encontrar tu próximo vehículo. ¿Qué tipo de carro estás buscando?</div>
            <div class="auto-msg-time">Ahora</div>
          </div>
        </div>
        <div class="auto-chat-suggestions" id="autoChatSugg">
          <span class="auto-suggestion" onclick="autoSendSugg(this)">¿Qué carros tienen?</span>
          <span class="auto-suggestion" onclick="autoSendSugg(this)">¿Aceptan trade-in?</span>
          <span class="auto-suggestion" onclick="autoSendSugg(this)">¿Tienen financiamiento?</span>
          <span class="auto-suggestion" onclick="autoSendSugg(this)">Quiero agendar una cita</span>
        </div>
        <div class="auto-chat-input-area">
          <input class="auto-chat-input" id="autoChatInput" placeholder="Escribe tu pregunta..." onkeydown="if(event.key==='Enter')autoSendChat()" />
          <button class="auto-chat-send" onclick="autoSendChat()">➤</button>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="auto-cta">
    <h2>¿Listo para tu<br><span>próximo carro?</span></h2>
    <p>Visítanos en nuestro dealer o habla con IvA ahora mismo. Financiamiento disponible para todos los créditos.</p>
    <div class="auto-cta-btns">
      <a href="#chat" class="auto-btn-primary">Habla con IvA →</a>
      <a href="/quote" class="auto-cta-btn-main">Quiero una página así →</a>
    </div>
  </section>

  <footer class="auto-footer">
    <div>© 2025 Luis Soto Autos · Puerto Rico & Florida · Powered by <span style="color:var(--red)">Ivamar AI</span></div>
    <div>ivamarai.com/demo-autos</div>
  </footer>

</div>

<script>
const CARS = [
  {id:1,name:"Honda CR-V 2022",type:"suv",price:"$28,900",year:2022,miles:"18,500 mi",fuel:"Gasolina",trans:"Automático",emoji:"🚙",badge:"hot"},
  {id:2,name:"Toyota Tacoma 2021",type:"truck",price:"$34,500",year:2021,miles:"24,000 mi",fuel:"Gasolina",trans:"Automático",emoji:"🛻",badge:"hot"},
  {id:3,name:"Hyundai Tucson 2023",type:"suv",price:"$31,200",year:2023,miles:"8,200 mi",fuel:"Gasolina",trans:"Automático",emoji:"🚗",badge:"new"},
  {id:4,name:"Toyota Camry 2022",type:"sedan",price:"$26,400",year:2022,miles:"21,000 mi",fuel:"Gasolina",trans:"Automático",emoji:"🚘",badge:""},
  {id:5,name:"Ford F-150 2021",type:"truck",price:"$38,900",year:2021,miles:"29,000 mi",fuel:"Gasolina",trans:"Automático",emoji:"🛻",badge:""},
  {id:6,name:"Honda Civic 2023",type:"sedan",price:"$22,800",year:2023,miles:"5,400 mi",fuel:"Gasolina",trans:"Automático",emoji:"🚗",badge:"new"},
];

function renderCars(type) {
  const grid = document.getElementById('carsGrid');
  const cars = type === 'all' ? CARS : CARS.filter(c => c.type === type);
  grid.innerHTML = cars.map(car => \`
    <div class="auto-car-card">
      <div class="auto-car-img">
        <span style="font-size:5rem">\${car.emoji}</span>
        \${car.badge ? \`<div class="auto-car-badge \${car.badge}">\${car.badge==='hot'?'🔥 Popular':'✨ Nuevo'}</div>\` : ''}
        <div class="auto-car-price-tag">\${car.price}</div>
      </div>
      <div class="auto-car-body">
        <div class="auto-car-name">\${car.name}</div>
        <div class="auto-car-specs">
          <span class="auto-car-spec">\${car.miles}</span>
          <span class="auto-car-spec">\${car.fuel}</span>
          <span class="auto-car-spec">\${car.trans}</span>
        </div>
        <div class="auto-car-footer">
          <button class="auto-car-btn auto-car-btn-main" onclick="askAboutCar('\${car.name}','\${car.price}')">Me interesa</button>
          <button class="auto-car-btn auto-car-btn-ghost" onclick="askAboutCar('\${car.name}','\${car.price}')">Ver detalles</button>
        </div>
      </div>
    </div>
  \`).join('');
}

function filterCars(type, el) {
  document.querySelectorAll('.auto-filter-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  renderCars(type);
}

function askAboutCar(name, price) {
  document.getElementById('chat').scrollIntoView({behavior:'smooth'});
  setTimeout(() => {
    document.getElementById('autoChatInput').value = \`Me interesa el \${name} (\${price}). ¿Qué más me puedes decir?\`;
    document.getElementById('autoChatInput').focus();
  }, 600);
}

// CHAT
function autoAddMsg(text, type) {
  const msgs = document.getElementById('autoChatMsgs');
  const now = new Date().toLocaleTimeString('es',{hour:'2-digit',minute:'2-digit'});
  const d = document.createElement('div');
  d.className = 'auto-msg ' + type;
  d.innerHTML = '<div class="auto-msg-bubble">' + text + '</div><div class="auto-msg-time">' + now + '</div>';
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
}

function autoShowTyping() {
  const msgs = document.getElementById('autoChatMsgs');
  const d = document.createElement('div');
  d.className = 'auto-msg bot'; d.id = 'autoTyping';
  d.innerHTML = '<div class="auto-typing"><span></span><span></span><span></span></div>';
  msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight;
}

function autoHideTyping() { const el = document.getElementById('autoTyping'); if(el) el.remove(); }

async function autoSendChat() {
  const input = document.getElementById('autoChatInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  const sugg = document.getElementById('autoChatSugg');
  if (sugg) sugg.style.display = 'none';
  autoAddMsg(text, 'user');
  autoShowTyping();
  try {
    const res = await fetch('/api/demo-autos', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({message: text})
    });
    const data = await res.json();
    autoHideTyping();
    autoAddMsg(data.reply || '¿En qué más te puedo ayudar?', 'bot');
  } catch(e) {
    autoHideTyping();
    autoAddMsg('Disculpa, tuve un problema. Intenta de nuevo.', 'bot');
  }
}

function autoSendSugg(el) {
  document.getElementById('autoChatInput').value = el.textContent;
  autoSendChat();
}

renderCars('all');
</script>
`;
