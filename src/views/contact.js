module.exports = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400&display=swap');
.iva-sub{font-family:'Syne',sans-serif;background:#030508;color:#F0F4FF;margin:-20px;overflow-x:hidden;}
.iva-sub *{box-sizing:border-box;margin:0;padding:0;}
.iva-sub a{color:#00E5C8;text-decoration:none;}
.iva-sub-nav{padding:1.2rem 2rem;display:flex;align-items:center;justify-content:space-between;background:rgba(3,5,8,0.95);border-bottom:1px solid rgba(0,229,200,0.08);position:sticky;top:0;z-index:100;backdrop-filter:blur(12px);}
.iva-sub-logo{display:flex;align-items:center;gap:0.6rem;text-decoration:none!important;}
.iva-sub-logo-mark{width:30px;height:30px;border:1.5px solid #00E5C8;border-radius:7px;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:#00E5C8;background:rgba(0,229,200,0.06);}
.iva-sub-logo-text{font-size:1rem;font-weight:700;color:#F0F4FF;letter-spacing:-0.02em;}
.iva-sub-logo-text span{color:#00E5C8;}
.iva-sub-back{font-size:0.82rem;color:#8892A4;border:1px solid rgba(255,255,255,0.1);padding:0.4rem 1rem;border-radius:6px;transition:all 0.2s;text-decoration:none!important;}
.iva-sub-back:hover{color:#F0F4FF;border-color:rgba(255,255,255,0.25);}
.iva-sub-hero{padding:5rem 2rem 3rem;text-align:center;position:relative;overflow:hidden;}
.iva-sub-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 0%,rgba(0,229,200,0.07),transparent 70%);pointer-events:none;}
.iva-sub-tag{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:0.68rem;color:#00E5C8;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:1rem;padding:0.3rem 0.8rem;border:1px solid rgba(0,229,200,0.2);border-radius:4px;}
.iva-sub-hero h1{font-size:clamp(2.5rem,5vw,4rem);font-weight:800;letter-spacing:-0.03em;line-height:1.05;margin-bottom:1.2rem;}
.iva-sub-hero h1 em{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;color:#00E5C8;}
.iva-sub-hero p{color:#8892A4;font-size:1.05rem;line-height:1.7;max-width:480px;margin:0 auto;font-weight:400;}
.iva-sub-content{max-width:800px;margin:0 auto;padding:3rem 2rem 5rem;}
.iva-contact-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.2rem;margin-bottom:3rem;}
.iva-contact-card{background:#0D1420;border:1px solid rgba(255,255,255,0.05);border-radius:14px;padding:2rem;transition:border-color 0.3s,transform 0.3s;position:relative;overflow:hidden;}
.iva-contact-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#00E5C8,transparent);opacity:0;transition:opacity 0.3s;}
.iva-contact-card:hover{border-color:rgba(0,229,200,0.2);transform:translateY(-3px);}
.iva-contact-card:hover::before{opacity:1;}
.iva-contact-icon{font-size:2rem;margin-bottom:1rem;}
.iva-contact-title{font-size:1rem;font-weight:700;margin-bottom:0.4rem;}
.iva-contact-desc{font-size:0.82rem;color:#8892A4;line-height:1.5;margin-bottom:1rem;font-weight:400;}
.iva-contact-btn{display:inline-flex;align-items:center;gap:0.4rem;background:#00E5C8;color:#030508;padding:0.6rem 1.2rem;border-radius:7px;font-family:'Syne',sans-serif;font-weight:700;font-size:0.82rem;text-decoration:none!important;transition:all 0.2s;}
.iva-contact-btn:hover{box-shadow:0 4px 15px rgba(0,229,200,0.25);transform:translateY(-1px);}
.iva-contact-btn.ghost{background:transparent;color:#00E5C8;border:1px solid rgba(0,229,200,0.3);}
.iva-contact-btn.ghost:hover{background:rgba(0,229,200,0.08);}
.iva-info-box{background:#080C12;border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:2rem;}
.iva-info-box h3{font-size:1rem;font-weight:700;margin-bottom:1.2rem;color:#8892A4;letter-spacing:0.05em;text-transform:uppercase;font-size:0.78rem;font-family:'JetBrains Mono',monospace;}
.iva-info-row{display:flex;gap:1rem;align-items:flex-start;margin-bottom:1rem;padding-bottom:1rem;border-bottom:1px solid rgba(255,255,255,0.04);}
.iva-info-row:last-child{margin-bottom:0;padding-bottom:0;border-bottom:none;}
.iva-info-label{font-size:0.75rem;color:#4A5568;min-width:80px;font-family:'JetBrains Mono',monospace;letter-spacing:0.05em;padding-top:2px;}
.iva-info-val{font-size:0.88rem;color:#8892A4;line-height:1.5;}
.iva-info-val strong{color:#F0F4FF;}
.iva-sub-footer{padding:2rem;border-top:1px solid rgba(255,255,255,0.04);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;font-size:0.78rem;color:#4A5568;}
.iva-sub-footer strong{color:#8892A4;}
.iva-sub-footer-links{display:flex;gap:1.2rem;}
.iva-sub-footer-links a{color:#4A5568;text-decoration:none;transition:color 0.2s;}
.iva-sub-footer-links a:hover{color:#00E5C8;}
@media(max-width:600px){.iva-contact-grid{grid-template-columns:1fr;}.iva-sub-footer{flex-direction:column;text-align:center;}}
</style>

<div class="iva-sub">
  <nav class="iva-sub-nav">
    <a href="/" class="iva-sub-logo">
      <img src="/logo-white.png" alt="Ivamar AI" style="height:28px;width:auto;">
      <span class="iva-sub-logo-text">Ivamar <span>AI</span></span>
    </a>
    <a href="/" class="iva-sub-back">← Volver / Back</a>
  </nav>

  <div class="iva-sub-hero">
    <div class="iva-sub-tag">Contact / Contacto</div>
    <h1>Hablemos de tu <em>negocio</em></h1>
    <p>Estamos aquí para ayudarte. Escríbenos por WhatsApp y respondemos rápido — en inglés o español.</p>
  </div>

  <div class="iva-sub-content">

    <div class="iva-contact-grid">
      <div class="iva-contact-card">
        <div class="iva-contact-icon">📲</div>
        <div class="iva-contact-title">WhatsApp (más rápido)</div>
        <div class="iva-contact-desc">La forma más rápida de hablar con nosotros. Respondemos en minutos durante horas de negocio.</div>
        <a href="https://wa.me/18635216708" target="_blank" class="iva-contact-btn">Abrir WhatsApp →</a>
      </div>
      <div class="iva-contact-card">
        <div class="iva-contact-icon">📋</div>
        <div class="iva-contact-title">Solicitar Demo</div>
        <div class="iva-contact-desc">¿Quieres ver cómo quedaría la página de tu negocio? Llena el formulario y te preparamos un demo.</div>
        <a href="https://forms.gle/cW7qTdj5zTx2S4ZH7" target="_blank" class="iva-contact-btn">Solicitar Demo →</a>
      </div>
      <div class="iva-contact-card">
        <div class="iva-contact-icon">🌐</div>
        <div class="iva-contact-title">Ver Demo en Vivo</div>
        <div class="iva-contact-desc">Mira un ejemplo real de cómo funciona una página de Ivamar AI para un negocio de comida.</div>
        <a href="/demo" class="iva-contact-btn ghost">Ver Demo →</a>
      </div>
      <div class="iva-contact-card">
        <div class="iva-contact-icon">💼</div>
        <div class="iva-contact-title">Alianzas y Revendedores</div>
        <div class="iva-contact-desc">¿Quieres ofrecer Ivamar AI a tus clientes? Pregúntanos sobre nuestro programa de partners.</div>
        <a href="https://wa.me/18635216708?text=Hola%2C%20me%20interesa%20el%20programa%20de%20partners%20de%20Ivamar%20AI" target="_blank" class="iva-contact-btn ghost">Ser Partner →</a>
      </div>
    </div>

    <div class="iva-info-box">
      <h3>Información de la empresa</h3>
      <div class="iva-info-row">
        <span class="iva-info-label">EMPRESA</span>
        <span class="iva-info-val"><strong>Ivamar AI LLC</strong></span>
      </div>
      <div class="iva-info-row">
        <span class="iva-info-label">ESTADO</span>
        <span class="iva-info-val">Delaware, USA</span>
      </div>
      <div class="iva-info-row">
        <span class="iva-info-label">MERCADO</span>
        <span class="iva-info-val">Puerto Rico & United States</span>
      </div>
      <div class="iva-info-row">
        <span class="iva-info-label">IDIOMAS</span>
        <span class="iva-info-val">Español · English</span>
      </div>
      <div class="iva-info-row">
        <span class="iva-info-label">HORARIO</span>
        <span class="iva-info-val">Lunes–Viernes 9am–6pm AST · IvA disponible 24/7</span>
      </div>
      <div class="iva-info-row">
        <span class="iva-info-label">WHATSAPP</span>
        <span class="iva-info-val"><a href="https://wa.me/18635216708">+1 (863) 521-6708</a></span>
      </div>
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
