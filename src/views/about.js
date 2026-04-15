module.exports = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400&display=swap');
.iva-sub{font-family:'Syne',sans-serif;background:#030508;color:#F0F4FF;margin:-20px;overflow-x:hidden;}
.iva-sub *{box-sizing:border-box;margin:0;padding:0;}
.iva-sub a{color:#00E5C8;text-decoration:none;}
.iva-sub a:hover{text-decoration:underline;}
.iva-sub-nav{padding:1.2rem 2rem;display:flex;align-items:center;justify-content:space-between;background:rgba(3,5,8,0.95);border-bottom:1px solid rgba(0,229,200,0.08);position:sticky;top:0;z-index:100;backdrop-filter:blur(12px);}
.iva-sub-logo{display:flex;align-items:center;gap:0.6rem;text-decoration:none!important;}
.iva-sub-logo-mark{width:30px;height:30px;border:1.5px solid #00E5C8;border-radius:7px;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:#00E5C8;background:rgba(0,229,200,0.06);}
.iva-sub-logo-text{font-size:1rem;font-weight:700;color:#F0F4FF;letter-spacing:-0.02em;}
.iva-sub-logo-text span{color:#00E5C8;}
.iva-sub-back{font-size:0.82rem;color:#8892A4;border:1px solid rgba(255,255,255,0.1);padding:0.4rem 1rem;border-radius:6px;transition:all 0.2s;text-decoration:none!important;}
.iva-sub-back:hover{color:#F0F4FF;border-color:rgba(255,255,255,0.25);text-decoration:none!important;}
.iva-sub-hero{padding:5rem 2rem 3rem;text-align:center;position:relative;overflow:hidden;}
.iva-sub-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 0%,rgba(0,229,200,0.07),transparent 70%);pointer-events:none;}
.iva-sub-tag{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:0.68rem;color:#00E5C8;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:1rem;padding:0.3rem 0.8rem;border:1px solid rgba(0,229,200,0.2);border-radius:4px;}
.iva-sub-hero h1{font-size:clamp(2.5rem,5vw,4rem);font-weight:800;letter-spacing:-0.03em;line-height:1.05;margin-bottom:1.2rem;}
.iva-sub-hero h1 em{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;color:#00E5C8;}
.iva-sub-hero p{color:#8892A4;font-size:1.05rem;line-height:1.7;max-width:560px;margin:0 auto;font-weight:400;}
.iva-sub-content{max-width:800px;margin:0 auto;padding:3rem 2rem 5rem;}
.iva-sub-section{margin-bottom:3.5rem;}
.iva-sub-section h2{font-size:1.4rem;font-weight:700;margin-bottom:1rem;letter-spacing:-0.02em;}
.iva-sub-section h2 em{font-family:'Instrument Serif',serif;font-style:italic;color:#00E5C8;font-weight:400;}
.iva-sub-section p{color:#8892A4;line-height:1.8;font-size:0.95rem;font-weight:400;margin-bottom:1rem;}
.iva-sub-section p:last-child{margin-bottom:0;}
.iva-divider{height:1px;background:rgba(255,255,255,0.06);margin:2.5rem 0;}
.iva-values{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-top:1.5rem;}
.iva-value{background:#0D1420;border:1px solid rgba(255,255,255,0.05);border-radius:12px;padding:1.5rem;}
.iva-value-icon{font-size:1.8rem;margin-bottom:0.8rem;}
.iva-value-title{font-size:0.9rem;font-weight:700;margin-bottom:0.4rem;}
.iva-value-desc{font-size:0.8rem;color:#8892A4;line-height:1.5;}
.iva-team{display:grid;grid-template-columns:repeat(2,1fr);gap:1.2rem;margin-top:1.5rem;}
.iva-team-card{background:#0D1420;border:1px solid rgba(255,255,255,0.05);border-radius:14px;padding:1.8rem;display:flex;gap:1.2rem;align-items:flex-start;}
.iva-team-avatar{width:52px;height:52px;border-radius:12px;background:linear-gradient(135deg,rgba(0,229,200,0.2),rgba(0,229,200,0.05));border:1px solid rgba(0,229,200,0.2);display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0;}
.iva-team-name{font-size:0.95rem;font-weight:700;margin-bottom:0.2rem;}
.iva-team-role{font-size:0.75rem;color:#00E5C8;font-family:'JetBrains Mono',monospace;letter-spacing:0.08em;margin-bottom:0.5rem;}
.iva-team-desc{font-size:0.8rem;color:#8892A4;line-height:1.5;}
.iva-sub-cta{background:#080C12;border:1px solid rgba(0,229,200,0.15);border-radius:16px;padding:2.5rem;text-align:center;margin-top:2rem;}
.iva-sub-cta h3{font-size:1.3rem;font-weight:700;margin-bottom:0.6rem;}
.iva-sub-cta p{color:#8892A4;font-size:0.9rem;margin-bottom:1.5rem;font-weight:400;}
.iva-sub-btn{display:inline-flex;align-items:center;gap:0.5rem;background:#00E5C8;color:#030508;padding:0.8rem 1.8rem;border-radius:8px;font-family:'Syne',sans-serif;font-weight:700;font-size:0.9rem;text-decoration:none!important;transition:all 0.25s;}
.iva-sub-btn:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(0,229,200,0.25);}
.iva-sub-footer{padding:2rem;border-top:1px solid rgba(255,255,255,0.04);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;font-size:0.78rem;color:#4A5568;}
.iva-sub-footer strong{color:#8892A4;}
.iva-sub-footer-links{display:flex;gap:1.2rem;}
.iva-sub-footer-links a{color:#4A5568;text-decoration:none;transition:color 0.2s;}
.iva-sub-footer-links a:hover{color:#00E5C8;}
@media(max-width:600px){.iva-values{grid-template-columns:1fr;}.iva-team{grid-template-columns:1fr;}.iva-sub-footer{flex-direction:column;text-align:center;}}
</style>

<div class="iva-sub">
  <nav class="iva-sub-nav">
    <a href="/" class="iva-sub-logo">
      <div class="iva-sub-logo-mark">IvA</div>
      <span class="iva-sub-logo-text">Ivamar <span>AI</span></span>
    </a>
    <a href="/" class="iva-sub-back">← Volver / Back</a>
  </nav>

  <div class="iva-sub-hero">
    <div class="iva-sub-tag">About / Nosotros</div>
    <h1>Tecnología con <em>alma boricua</em></h1>
    <p>Somos Ivamar AI LLC — una empresa de Delaware creada para ayudar a negocios reales en Puerto Rico y USA a competir con las mejores herramientas digitales.</p>
  </div>

  <div class="iva-sub-content">

    <div class="iva-sub-section">
      <h2>¿Quiénes <em>somos</em>?</h2>
      <p>Ivamar AI LLC es una empresa tecnológica registrada en Delaware, USA, con raíces en Puerto Rico. Nacimos de una idea simple: los pequeños negocios merecen las mismas herramientas que las grandes corporaciones, pero adaptadas a su realidad, su idioma y su cultura.</p>
      <p>Creamos páginas inteligentes con asistentes de IA que trabajan 24/7 — respondiendo preguntas, tomando pedidos y guiando clientes al WhatsApp o checkout del negocio. Sin comisiones. Sin complicaciones.</p>
    </div>

    <div class="iva-divider"></div>

    <div class="iva-sub-section">
      <h2>Nuestros <em>valores</em></h2>
      <div class="iva-values">
        <div class="iva-value">
          <div class="iva-value-icon">🤝</div>
          <div class="iva-value-title">Human Touch</div>
          <div class="iva-value-desc">La tecnología que construimos siempre tiene un toque humano. IvA habla como una persona real, no como un robot.</div>
        </div>
        <div class="iva-value">
          <div class="iva-value-icon">🎯</div>
          <div class="iva-value-title">Simplicidad</div>
          <div class="iva-value-desc">Herramientas poderosas que cualquier dueño de negocio puede usar, sin saber de tecnología.</div>
        </div>
        <div class="iva-value">
          <div class="iva-value-icon">🌺</div>
          <div class="iva-value-title">Raíces boricuas</div>
          <div class="iva-value-desc">Entendemos el mercado de PR y la diáspora en USA. Bilingüe por naturaleza, no por traducción.</div>
        </div>
      </div>
    </div>

    <div class="iva-divider"></div>

    <div class="iva-sub-section">
      <h2>Nuestra <em>misión</em></h2>
      <p>Democratizar el acceso a la inteligencia artificial para negocios locales. Que un food truck en Caguas o un salón en Orlando tengan la misma presencia digital que cualquier cadena nacional.</p>
      <p>Cada negocio que se une a Ivamar AI obtiene una página profesional, un asistente inteligente y un sistema de pedidos — todo por menos de lo que cuesta un anuncio de Facebook al mes.</p>
    </div>

    <div class="iva-divider"></div>

    <div class="iva-sub-section">
      <h2>El equipo <em>detrás</em></h2>
      <div class="iva-team">
        <div class="iva-team-card">
          <div class="iva-team-avatar">👨‍💻</div>
          <div>
            <div class="iva-team-name">Ivamar AI Team</div>
            <div class="iva-team-role">FOUNDERS & BUILDERS</div>
            <div class="iva-team-desc">Un equipo de builders en PR y USA apasionados por la tecnología y los negocios locales. Construimos, iteramos y mejoramos cada día.</div>
          </div>
        </div>
        <div class="iva-team-card">
          <div class="iva-team-avatar">🤖</div>
          <div>
            <div class="iva-team-name">IvA</div>
            <div class="iva-team-role">AI ASSISTANT</div>
            <div class="iva-team-desc">El corazón del producto. IvA aprende de cada negocio y atiende a sus clientes con conocimiento, empatía y disponibilidad total.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="iva-sub-cta">
      <h3>¿Listo para llevar tu negocio al siguiente nivel?</h3>
      <p>Contáctanos por WhatsApp y en 48 horas tu página está en vivo.</p>
      <a href="https://wa.me/18635216708" target="_blank" class="iva-sub-btn">Hablar por WhatsApp →</a>
    </div>

  </div>

  <div class="iva-sub-footer">
    <div>© 2025 <strong>Ivamar AI LLC</strong> · Delaware, USA · All rights reserved</div>
    <div class="iva-sub-footer-links">
      <a href="/privacy">Privacy</a>
      <a href="/terms">Terms</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </div>
  </div>
</div>
`;
