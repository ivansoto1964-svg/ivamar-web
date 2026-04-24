module.exports = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400&display=swap');
.about-page{font-family:'Syne',sans-serif;background:#030508;color:#F0F4FF;margin:-20px;overflow-x:hidden;}
.about-page *{box-sizing:border-box;margin:0;padding:0;}
.about-nav{padding:1.2rem 2rem;display:flex;align-items:center;justify-content:space-between;background:rgba(3,5,8,0.95);border-bottom:1px solid rgba(0,229,200,0.08);position:sticky;top:0;z-index:100;backdrop-filter:blur(12px);}
.about-logo{display:flex;align-items:center;gap:0.7rem;text-decoration:none;}
.about-back{font-size:0.82rem;color:#8892A4;border:1px solid rgba(255,255,255,0.1);padding:0.4rem 1rem;border-radius:6px;text-decoration:none;transition:all 0.2s;}
.about-back:hover{color:#F0F4FF;border-color:rgba(255,255,255,0.25);}
.about-hero{padding:5rem 2rem 4rem;text-align:center;position:relative;overflow:hidden;}
.about-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 0%,rgba(0,229,200,0.07),transparent 70%);pointer-events:none;}
.about-tag{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:0.68rem;color:#00E5C8;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:1rem;padding:0.3rem 0.8rem;border:1px solid rgba(0,229,200,0.2);border-radius:4px;}
.about-hero h1{font-size:clamp(2.2rem,5vw,3.5rem);font-weight:800;letter-spacing:-0.03em;line-height:1.05;margin-bottom:1rem;position:relative;}
.about-hero h1 em{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;color:#00E5C8;}
.about-hero p{color:#8892A4;font-size:1rem;line-height:1.7;max-width:560px;margin:0 auto;font-weight:400;position:relative;}
.about-content{max-width:800px;margin:0 auto;padding:3rem 2rem 5rem;}
.about-section{margin-bottom:3rem;}
.about-section-label{font-family:'JetBrains Mono',monospace;font-size:0.68rem;color:#00E5C8;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:0.8rem;display:flex;align-items:center;gap:0.5rem;}
.about-section-label::before{content:'';width:16px;height:1px;background:#00E5C8;}
.about-section h2{font-size:1.6rem;font-weight:800;letter-spacing:-0.02em;margin-bottom:1rem;line-height:1.2;}
.about-section h2 em{font-family:'Instrument Serif',serif;font-style:italic;color:#00E5C8;}
.about-section p{color:#8892A4;line-height:1.8;font-size:0.95rem;font-weight:400;margin-bottom:1rem;}
.about-values{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-top:1.5rem;}
.about-value{background:#0D1420;border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:1.5rem;transition:border-color 0.3s;}
.about-value:hover{border-color:rgba(0,229,200,0.2);}
.about-value-icon{font-size:1.8rem;margin-bottom:0.8rem;}
.about-value-title{font-size:0.95rem;font-weight:700;margin-bottom:0.4rem;}
.about-value-desc{font-size:0.8rem;color:#8892A4;line-height:1.5;font-weight:400;}
.about-mission{background:#0D1420;border:1px solid rgba(0,229,200,0.15);border-radius:16px;padding:2rem;margin-top:1.5rem;position:relative;overflow:hidden;}
.about-mission::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#00E5C8,transparent);}
.about-mission p{color:#8892A4;line-height:1.8;font-size:0.95rem;font-weight:400;margin:0;}
.about-team{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;margin-top:1.5rem;}
.about-team-card{background:#0D1420;border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:1.5rem;display:flex;gap:1rem;align-items:flex-start;}
.about-team-avatar{width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,rgba(0,229,200,0.2),rgba(0,229,200,0.05));border:1px solid rgba(0,229,200,0.2);display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0;}
.about-team-name{font-size:0.95rem;font-weight:700;margin-bottom:0.2rem;}
.about-team-role{font-family:'JetBrains Mono',monospace;font-size:0.62rem;color:#00E5C8;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.4rem;}
.about-team-desc{font-size:0.78rem;color:#8892A4;line-height:1.5;font-weight:400;}
.about-legal{background:#080C12;border:1px solid rgba(255,255,255,0.05);border-radius:14px;padding:1.5rem;margin-top:1.5rem;}
.about-legal-title{font-size:0.9rem;font-weight:700;margin-bottom:0.8rem;color:#F0F4FF;}
.about-legal-item{display:flex;gap:0.5rem;font-size:0.82rem;color:#8892A4;margin-bottom:0.5rem;align-items:center;}
.about-legal-item span{color:#00E5C8;font-family:'JetBrains Mono',monospace;font-size:0.7rem;}
.about-cta{background:#080C12;border-top:1px solid rgba(255,255,255,0.05);padding:4rem 2rem;text-align:center;}
.about-cta h2{font-size:clamp(1.8rem,4vw,2.5rem);font-weight:800;letter-spacing:-0.03em;margin-bottom:0.8rem;}
.about-cta h2 em{font-family:'Instrument Serif',serif;font-style:italic;color:#00E5C8;}
.about-cta p{color:#8892A4;margin-bottom:2rem;max-width:440px;margin-left:auto;margin-right:auto;line-height:1.7;}
.about-cta-btn{display:inline-flex;align-items:center;gap:0.5rem;background:#00E5C8;color:#030508;padding:0.85rem 2rem;border-radius:8px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;}
.about-cta-btn:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,229,200,0.3);}
.about-footer{background:#030508;padding:2rem 2.5rem;border-top:1px solid rgba(255,255,255,0.04);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;font-size:0.8rem;color:#4A5568;}
.about-footer strong{color:#8892A4;}
.about-footer-links{display:flex;gap:1.5rem;}
.about-footer-links a{color:#4A5568;text-decoration:none;transition:color 0.2s;}
.about-footer-links a:hover{color:#00E5C8;}
@media(max-width:700px){.about-values{grid-template-columns:1fr;}.about-team{grid-template-columns:1fr;}.about-footer{flex-direction:column;text-align:center;}}
</style>

<div class="about-page">
  <nav class="about-nav">
    <a href="/es" class="about-logo">
      <img src="/logo-white.png" alt="Ivamar AI" style="height:28px;width:auto;">
    </a>
    <a href="/es" class="about-back">← Volver</a>
  </nav>

  <div class="about-hero">
    <div class="about-tag">Sobre Ivamar AI</div>
    <h1>Tecnología con<br><em>toque humano</em></h1>
    <p>Construimos herramientas con IA para negocios reales — desde food trucks hasta despachos de abogados — en USA y alrededor del mundo.</p>
  </div>

  <div class="about-content">

    <div class="about-section">
      <div class="about-section-label">Quiénes somos</div>
      <h2>Construido para <em>negocios reales</em></h2>
      <p>Ivamar AI LLC es una empresa de tecnología incorporada en Delaware, USA. Nos especializamos en páginas digitales con IA y asistentes inteligentes para negocios locales de todos los tamaños e industrias.</p>
      <p>Nacimos de una idea simple: cada negocio local merece las mismas herramientas digitales que las grandes corporaciones — pero adaptadas a su realidad, su idioma y sus clientes. Sin necesidad de conocimientos técnicos.</p>
    </div>

    <div class="about-section">
      <div class="about-section-label">Nuestros valores</div>
      <h2>En lo que <em>creemos</em></h2>
      <div class="about-values">
        <div class="about-value">
          <div class="about-value-icon">🤝</div>
          <div class="about-value-title">Toque Humano</div>
          <div class="about-value-desc">Tecnología que se siente personal. IvA habla como una persona real, no como un robot.</div>
        </div>
        <div class="about-value">
          <div class="about-value-icon">🎯</div>
          <div class="about-value-title">Simplicidad</div>
          <div class="about-value-desc">Herramientas poderosas que cualquier dueño de negocio puede usar — sin código, sin complicaciones.</div>
        </div>
        <div class="about-value">
          <div class="about-value-icon">🌎</div>
          <div class="about-value-title">Alcance Global</div>
          <div class="about-value-desc">Desde USA para el mundo. Multilingüe por diseño, no por traducción.</div>
        </div>
      </div>
    </div>

    <div class="about-section">
      <div class="about-section-label">Nuestra misión</div>
      <h2>Democratizando la <em>IA para negocios</em></h2>
      <div class="about-mission">
        <p>Hacer la inteligencia artificial accesible para cada negocio local — sin importar tamaño, industria o conocimiento técnico. Un food truck en Miami y un despacho de abogados en Nueva York merecen la misma calidad de presencia digital y experiencia al cliente.</p>
      </div>
    </div>

    <div class="about-section">
      <div class="about-section-label">El equipo</div>
      <h2>Las personas detrás <em>de IvA</em></h2>
      <div class="about-team">
        <div class="about-team-card">
          <div class="about-team-avatar">👨‍💻</div>
          <div>
            <div class="about-team-name">Ivamar AI Team</div>
            <div class="about-team-role">Founders & Builders</div>
            <div class="about-team-desc">Un equipo de builders en USA apasionados por la tecnología y los negocios locales. Construimos, iteramos y mejoramos cada día.</div>
          </div>
        </div>
        <div class="about-team-card">
          <div class="about-team-avatar">🤖</div>
          <div>
            <div class="about-team-name">IvA</div>
            <div class="about-team-role">Asistente Digital IA</div>
            <div class="about-team-desc">El corazón del producto. IvA aprende de cada negocio y atiende a sus clientes con conocimiento, empatía y disponibilidad total 24/7.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="about-section">
      <div class="about-section-label">Info legal</div>
      <h2>Información de <em>la empresa</em></h2>
      <div class="about-legal">
        <div class="about-legal-title">Ivamar AI LLC</div>
        <div class="about-legal-item"><span>📍</span> 8 The Green, Suite B, Dover, DE 19901, USA</div>
        <div class="about-legal-item"><span>🏛</span> Incorporada en Delaware, Estados Unidos</div>
        <div class="about-legal-item"><span>🌎</span> Desde USA para el mundo</div>
        <div class="about-legal-item"><span>📲</span> WhatsApp: +1 (863) 521-6708</div>
        <div class="about-legal-item"><span>✉️</span> connect@ivamarai.com</div>
        <div class="about-legal-item"><span>🌐</span> ivamarai.com</div>
      </div>
    </div>

  </div>

  <div class="about-cta">
    <h2>¿Listo para hacer crecer<br>tu <em>negocio con IA?</em></h2>
    <p>Contáctanos por WhatsApp y en 48 horas tu página está en vivo.</p>
    <a href="https://wa.me/18635216708" target="_blank" class="about-cta-btn">Hablar por WhatsApp →</a>
  </div>

  <div class="about-footer">
    <div>© 2025 <strong>Ivamar AI LLC</strong> · Dover, DE 19901, USA · Desde USA para el mundo 🌎</div>
    <div class="about-footer-links">
      <a href="/privacidad">Privacidad</a>
      <a href="/terminos">Términos</a>
      <a href="/sobre-nosotros">Nosotros</a>
      <a href="/contacto">Contacto</a>
    </div>
  </div>
</div>
`;
