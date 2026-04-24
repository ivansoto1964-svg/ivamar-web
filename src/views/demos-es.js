module.exports = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400&display=swap');
.demos-page{font-family:'Syne',sans-serif;background:#030508;color:#F0F4FF;margin:-20px;overflow-x:hidden;min-height:100vh;}
.demos-page *{box-sizing:border-box;margin:0;padding:0;}
.demos-nav{padding:1.2rem 2rem;display:flex;align-items:center;justify-content:space-between;background:rgba(3,5,8,0.95);border-bottom:1px solid rgba(0,229,200,0.08);position:sticky;top:0;z-index:100;backdrop-filter:blur(12px);}
.demos-logo{display:flex;align-items:center;gap:0.7rem;text-decoration:none;}
.demos-back{font-size:0.82rem;color:#8892A4;border:1px solid rgba(255,255,255,0.1);padding:0.4rem 1rem;border-radius:6px;transition:all 0.2s;text-decoration:none;}
.demos-back:hover{color:#F0F4FF;border-color:rgba(255,255,255,0.25);}
.demos-hero{padding:5rem 2rem 3rem;text-align:center;position:relative;overflow:hidden;}
.demos-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 0%,rgba(0,229,200,0.07),transparent 70%);pointer-events:none;}
.demos-tag{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:0.68rem;color:#00E5C8;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:1rem;padding:0.3rem 0.8rem;border:1px solid rgba(0,229,200,0.2);border-radius:4px;}
.demos-hero h1{font-size:clamp(2.2rem,5vw,3.5rem);font-weight:800;letter-spacing:-0.03em;line-height:1.05;margin-bottom:1rem;position:relative;}
.demos-hero h1 em{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;color:#00E5C8;}
.demos-hero p{color:#8892A4;font-size:1rem;line-height:1.7;max-width:500px;margin:0 auto;font-weight:400;position:relative;}
.demos-grid{max-width:900px;margin:0 auto;padding:3rem 2rem 5rem;display:grid;grid-template-columns:repeat(auto-fill,minmax(380px,1fr));gap:1.5rem;}
.demo-card{background:#0D1420;border:1px solid rgba(255,255,255,0.06);border-radius:20px;overflow:hidden;transition:transform 0.3s,border-color 0.3s,box-shadow 0.3s;text-decoration:none;display:block;color:inherit;position:relative;}
.demo-card:hover{transform:translateY(-6px);box-shadow:0 20px 50px rgba(0,0,0,0.4);}
.demo-card-hero{height:180px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;}
.demo-card-emoji{font-size:5rem;filter:drop-shadow(0 0 20px rgba(255,255,255,0.1));animation:demoFloat 3s ease-in-out infinite;}
@keyframes demoFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
.demo-card-tag{position:absolute;top:1rem;left:1rem;font-family:'JetBrains Mono',monospace;font-size:0.62rem;letter-spacing:0.12em;text-transform:uppercase;padding:0.25rem 0.6rem;border-radius:3px;font-weight:600;}
.demo-card-body{padding:1.5rem;}
.demo-card-industry{font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:#4A5568;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:0.5rem;}
.demo-card-title{font-size:1.3rem;font-weight:800;letter-spacing:-0.02em;margin-bottom:0.5rem;}
.demo-card-desc{font-size:0.85rem;color:#8892A4;line-height:1.6;margin-bottom:1.2rem;font-weight:400;}
.demo-card-features{display:flex;flex-wrap:wrap;gap:0.4rem;margin-bottom:1.5rem;}
.demo-card-feature{font-size:0.68rem;color:#8892A4;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);padding:0.2rem 0.6rem;border-radius:100px;}
.demo-card-btn{display:flex;align-items:center;justify-content:space-between;padding:0.8rem 1rem;border-radius:10px;font-weight:700;font-size:0.88rem;transition:all 0.2s;}
.demo-card:hover .demo-card-btn{transform:translateX(4px);}
.demo-card.restaurant .demo-card-hero{background:linear-gradient(135deg,#0F0C08,#1C1810);}
.demo-card.restaurant .demo-card-tag{background:rgba(26,92,58,0.2);color:#4CAF50;border:1px solid rgba(26,92,58,0.4);}
.demo-card.restaurant .demo-card-btn{background:rgba(26,92,58,0.1);color:#4CAF50;border:1px solid rgba(26,92,58,0.2);}
.demo-card.restaurant:hover{border-color:rgba(26,92,58,0.4);}
.demo-card.auto .demo-card-hero{background:linear-gradient(135deg,#0a0a0a,#141414);}
.demo-card.auto .demo-card-tag{background:rgba(230,51,41,0.15);color:#E63329;border:1px solid rgba(230,51,41,0.3);}
.demo-card.auto .demo-card-btn{background:rgba(230,51,41,0.1);color:#E63329;border:1px solid rgba(230,51,41,0.2);}
.demo-card.auto:hover{border-color:rgba(230,51,41,0.3);}
.demo-card.soon{opacity:0.5;pointer-events:none;}
.demo-card.soon .demo-card-hero{background:linear-gradient(135deg,#0D1420,#111827);}
.demo-card.soon .demo-card-tag{background:rgba(0,229,200,0.08);color:#00E5C8;border:1px solid rgba(0,229,200,0.15);}
.demo-card.soon .demo-card-btn{background:rgba(0,229,200,0.05);color:#4A5568;border:1px solid rgba(255,255,255,0.06);}
.demos-cta{background:#080C12;border-top:1px solid rgba(255,255,255,0.05);padding:4rem 2rem;text-align:center;}
.demos-cta h2{font-size:clamp(1.8rem,4vw,2.5rem);font-weight:800;letter-spacing:-0.03em;margin-bottom:0.8rem;}
.demos-cta h2 em{font-family:'Instrument Serif',serif;font-style:italic;color:#00E5C8;}
.demos-cta p{color:#8892A4;margin-bottom:2rem;max-width:440px;margin-left:auto;margin-right:auto;line-height:1.7;}
.demos-cta-btn{display:inline-flex;align-items:center;gap:0.5rem;background:#00E5C8;color:#030508;padding:0.85rem 2rem;border-radius:8px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;}
.demos-cta-btn:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,229,200,0.3);}
.demos-footer{background:#030508;padding:2rem 2.5rem;border-top:1px solid rgba(255,255,255,0.04);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;font-size:0.8rem;color:#4A5568;}
.demos-footer strong{color:#8892A4;}
.demos-footer-links{display:flex;gap:1.5rem;}
.demos-footer-links a{color:#4A5568;text-decoration:none;transition:color 0.2s;}
.demos-footer-links a:hover{color:#00E5C8;}
@media(max-width:600px){.demos-grid{grid-template-columns:1fr;padding:2rem 1.5rem 4rem;}}
</style>

<div class="demos-page">
  <nav class="demos-nav">
    <a href="/es" class="demos-logo">
      <img src="/logo-white.png" alt="Ivamar AI" style="height:28px;width:auto;">
    </a>
    <a href="/es" class="demos-back">← Volver</a>
  </nav>

  <div class="demos-hero">
    <div class="demos-tag">Demos en vivo</div>
    <h1>Mira cómo funciona<br><em>en tu industria</em></h1>
    <p>Cada demo es un ejemplo real de lo que Ivamar AI puede hacer para tu negocio. Prueba el asistente, ordena, explora.</p>
  </div>

  <div class="demos-grid">

    <!-- RESTAURANTE -->
    <a href="/demo" class="demo-card restaurant">
      <div class="demo-card-hero">
        <div class="demo-card-tag">🍽 En vivo</div>
        <div class="demo-card-emoji">🍽</div>
      </div>
      <div class="demo-card-body">
        <div class="demo-card-industry">Restaurante · Food Truck · Cafetería</div>
        <div class="demo-card-title">La Plaza Restaurant</div>
        <div class="demo-card-desc">Menú digital con fotos, carrito de pedidos, opciones de delivery y pickup, instrucciones especiales e IvA — tu asistente digital disponible 24/7 en español e inglés.</div>
        <div class="demo-card-features">
          <span class="demo-card-feature">Menú con fotos</span>
          <span class="demo-card-feature">Carrito</span>
          <span class="demo-card-feature">Delivery/Pickup</span>
          <span class="demo-card-feature">WhatsApp</span>
          <span class="demo-card-feature">IvA IA</span>
        </div>
        <div class="demo-card-btn">Ver demo del restaurante →</div>
      </div>
    </a>

    <!-- DEALER AUTOS -->
    <a href="/demo-autos" class="demo-card auto">
      <div class="demo-card-hero">
        <div class="demo-card-tag">🚗 En vivo</div>
        <div class="demo-card-emoji">🚗</div>
      </div>
      <div class="demo-card-body">
        <div class="demo-card-industry">Dealer de Autos · Concesionario</div>
        <div class="demo-card-title">Luis Soto Autos</div>
        <div class="demo-card-desc">Inventario de vehículos, filtros por tipo, testimonios de clientes e IvA — el asistente que captura leads y responde sobre financiamiento 24/7.</div>
        <div class="demo-card-features">
          <span class="demo-card-feature">Inventario</span>
          <span class="demo-card-feature">Filtros</span>
          <span class="demo-card-feature">Trade-in</span>
          <span class="demo-card-feature">Financiamiento</span>
          <span class="demo-card-feature">IvA IA</span>
        </div>
        <div class="demo-card-btn">Ver demo del dealer →</div>
      </div>
    </a>

    <!-- PRÓXIMAMENTE: SALÓN -->
    <div class="demo-card soon">
      <div class="demo-card-hero">
        <div class="demo-card-tag">Próximamente</div>
        <div class="demo-card-emoji">💇</div>
      </div>
      <div class="demo-card-body">
        <div class="demo-card-industry">Salón · Spa · Barbería</div>
        <div class="demo-card-title">Salón de Belleza</div>
        <div class="demo-card-desc">Servicios, precios, galería de fotos y reservaciones directas por WhatsApp con IvA como asistente digital.</div>
        <div class="demo-card-features">
          <span class="demo-card-feature">Servicios</span>
          <span class="demo-card-feature">Galería</span>
          <span class="demo-card-feature">Reservaciones</span>
          <span class="demo-card-feature">IvA IA</span>
        </div>
        <div class="demo-card-btn">Próximamente →</div>
      </div>
    </div>

    <!-- PRÓXIMAMENTE: REALTOR -->
    <div class="demo-card soon">
      <div class="demo-card-hero">
        <div class="demo-card-tag">Próximamente</div>
        <div class="demo-card-emoji">🏠</div>
      </div>
      <div class="demo-card-body">
        <div class="demo-card-industry">Realtor · Bienes Raíces</div>
        <div class="demo-card-title">Agente de Bienes Raíces</div>
        <div class="demo-card-desc">Listado de propiedades, captura de leads calificados e IvA que pre-califica compradores 24/7.</div>
        <div class="demo-card-features">
          <span class="demo-card-feature">Propiedades</span>
          <span class="demo-card-feature">Leads</span>
          <span class="demo-card-feature">Pre-calificación</span>
          <span class="demo-card-feature">IvA IA</span>
        </div>
        <div class="demo-card-btn">Próximamente →</div>
      </div>
    </div>

  </div>

  <div class="demos-cta">
    <h2>¿Quieres una página<br><em>para tu negocio?</em></h2>
    <p>En 48 horas tu negocio tiene su propia página con asistente digital IA. Setup $125 + $49/mes. Primer mes gratis.</p>
    <a href="/cotizar" class="demos-cta-btn">Solicita tu página →</a>
  </div>

  <div class="demos-footer">
    <div>© 2025 <strong>Ivamar AI LLC</strong> · Dover, DE 19901, USA · Desde USA para el mundo 🌎</div>
    <div class="demos-footer-links">
      <a href="/privacidad">Privacidad</a>
      <a href="/terminos">Términos</a>
      <a href="/sobre-nosotros">Nosotros</a>
      <a href="/contacto">Contacto</a>
    </div>
  </div>
</div>
`;
