module.exports = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400&display=swap');
.legal-page{font-family:'Syne',sans-serif;background:#030508;color:#F0F4FF;margin:-20px;overflow-x:hidden;}
.legal-page *{box-sizing:border-box;margin:0;padding:0;}
.legal-nav{padding:1.2rem 2rem;display:flex;align-items:center;justify-content:space-between;background:rgba(3,5,8,0.95);border-bottom:1px solid rgba(0,229,200,0.08);position:sticky;top:0;z-index:100;backdrop-filter:blur(12px);}
.legal-logo{display:flex;align-items:center;gap:0.7rem;text-decoration:none;}
.legal-logo-mark{width:32px;height:32px;border:1.5px solid #00E5C8;border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:0.7rem;color:#00E5C8;background:rgba(0,229,200,0.06);}
.legal-logo-text{font-size:1.1rem;font-weight:700;color:#F0F4FF;letter-spacing:-0.02em;}
.legal-logo-text span{color:#00E5C8;}
.legal-back{font-size:0.82rem;color:#8892A4;border:1px solid rgba(255,255,255,0.1);padding:0.4rem 1rem;border-radius:6px;text-decoration:none;transition:all 0.2s;}
.legal-back:hover{color:#F0F4FF;}
.legal-content{max-width:760px;margin:0 auto;padding:4rem 2rem 6rem;}
.legal-content h1{font-size:2rem;font-weight:800;letter-spacing:-0.03em;margin-bottom:0.5rem;}
.legal-meta{font-family:'JetBrains Mono',monospace;font-size:0.72rem;color:#4A5568;margin-bottom:3rem;letter-spacing:0.05em;}
.legal-content h2{font-size:1.1rem;font-weight:700;margin:2rem 0 0.8rem;color:#F0F4FF;}
.legal-content p{color:#8892A4;line-height:1.8;font-size:0.9rem;margin-bottom:0.8rem;font-weight:400;}
.legal-content ul{color:#8892A4;line-height:1.8;font-size:0.9rem;padding-left:1.5rem;margin-bottom:0.8rem;}
.legal-content ul li{margin-bottom:0.3rem;}
.legal-footer{background:#030508;padding:2rem 2.5rem;border-top:1px solid rgba(255,255,255,0.04);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;font-size:0.8rem;color:#4A5568;}
.legal-footer strong{color:#8892A4;}
.legal-footer-links{display:flex;gap:1.5rem;}
.legal-footer-links a{color:#4A5568;text-decoration:none;transition:color 0.2s;}
.legal-footer-links a:hover{color:#00E5C8;}
</style>

<div class="legal-page">
  <nav class="legal-nav">
    <a href="/" class="legal-logo">
      <img src="/logo-white.png" alt="Ivamar AI" style="height:28px;width:auto;">
      <span class="legal-logo-text">Ivamar <span>AI</span></span>
    </a>
    <a href="/es" class="legal-back">← Volver</a>
  </nav>

  <div class="legal-content">
    <h1>Términos de Servicio</h1>
    <p class="legal-meta">Ivamar AI LLC · Delaware, USA · Última actualización: Enero 2025</p>

    <h2>1. Acuerdo</h2>
    <p>Al acceder o utilizar cualquier servicio proporcionado por Ivamar AI LLC ("Empresa", "nosotros"), usted ("Cliente") acepta estar sujeto a estos Términos de Servicio. Si no está de acuerdo, no utilice nuestros servicios.</p>

    <h2>2. Servicios</h2>
    <p>Ivamar AI LLC ofrece los siguientes servicios digitales:</p>
    <ul>
      <li>Páginas web personalizadas para negocios</li>
      <li>Asistente digital IvA entrenado con la información del negocio</li>
      <li>Integración de pedidos por WhatsApp</li>
      <li>Integración de pagos (Stripe, ATH Móvil, PayPal, Square)</li>
      <li>Hosting, mantenimiento y soporte técnico</li>
      <li>Panel de administración para editar contenido</li>
    </ul>

    <h2>3. Precios y Pagos</h2>
    <ul>
      <li>Pago único de configuración: $125 USD (incluye el primer mes de servicio gratis)</li>
      <li>Mensualidad: $49 USD/mes a partir del segundo mes</li>
      <li>Los pagos se procesan mediante Stripe u otros métodos acordados</li>
      <li>Las mensualidades vencen en la misma fecha cada mes</li>
      <li>Los servicios pueden suspenderse después de 7 días de mora</li>
      <li>No se cobran comisiones por orden o transacción</li>
    </ul>

    <h2>4. Responsabilidades del Cliente</h2>
    <ul>
      <li>Proveer información del negocio precisa y completa</li>
      <li>Mantener actualizada toda la información del negocio</li>
      <li>No utilizar la plataforma para actividades ilegales o contenido prohibido</li>
      <li>Cumplir con todas las leyes aplicables</li>
      <li>Mantener sus propias cuentas de procesador de pagos</li>
      <li>Asegurarse de que el contenido provisto no infrinja derechos de terceros</li>
    </ul>

    <h2>5. Propiedad Intelectual</h2>
    <p>El cliente retiene la propiedad de todo el contenido que provee, incluyendo logos, fotos, menús y descripciones del negocio. Ivamar AI LLC retiene la propiedad completa de la plataforma, plantillas, sistemas de IA, código y tecnología. Tras la cancelación, los clientes pueden solicitar una exportación de sus datos dentro de 30 días.</p>

    <h2>6. Cancelación</h2>
    <ul>
      <li>Cualquiera de las partes puede cancelar con 30 días de aviso escrito por WhatsApp o email</li>
      <li>Los pagos de configuración no son reembolsables una vez publicada la página</li>
      <li>Las mensualidades no son reembolsables para el período de facturación actual</li>
      <li>Los datos del cliente serán eliminados permanentemente 30 días después de la cancelación</li>
    </ul>

    <h2>7. Limitación de Responsabilidad</h2>
    <p>Ivamar AI LLC es un proveedor de tecnología. No somos responsables de los productos, servicios, precios o transacciones de nuestros clientes. Nuestra responsabilidad total máxima con cualquier cliente se limita a los honorarios pagados en los 3 meses anteriores al reclamo.</p>

    <h2>8. Descargo de Responsabilidad del Asistente IA</h2>
    <p>IvA es un asistente de IA diseñado para ayudar a los negocios a comunicarse con sus clientes. Todas las respuestas se generan basándose en la información provista por el cliente. Ivamar AI LLC no es responsable de errores o imprecisiones en las respuestas generadas por IA.</p>

    <h2>9. Ley Aplicable y Disputas</h2>
    <p>Estos Términos de Servicio se rigen por las leyes del Estado de Delaware, Estados Unidos de América. Cualquier disputa se resolverá mediante arbitraje vinculante de acuerdo con las reglas de la Asociación Americana de Arbitraje (AAA).</p>

    <h2>10. Cambios a los Términos</h2>
    <p>Ivamar AI LLC se reserva el derecho de actualizar estos Términos en cualquier momento. Los clientes serán notificados de cambios importantes por WhatsApp o email.</p>

    <h2>11. Contacto</h2>
    <ul>
      <li>Empresa: Ivamar AI LLC</li>
      <li>Estado de incorporación: Delaware, USA</li>
      <li>WhatsApp: +1 (863) 521-6708</li>
      <li>Email: connect@ivamarai.com</li>
      <li>Website: ivamarai.com</li>
    </ul>
  </div>

  <div class="legal-footer">
    <div>© 2025 <strong>Ivamar AI LLC</strong> · Delaware, USA · All rights reserved</div>
    <div class="legal-footer-links">
      <a href="/privacidad">Privacidad</a>
      <a href="/terminos">Términos</a>
      <a href="/about">About</a>
      <a href="/contact">Contacto</a>
    </div>
  </div>
</div>
`;
