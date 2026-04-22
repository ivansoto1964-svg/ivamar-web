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
      <div class="legal-logo-mark">IvA</div>
      <span class="legal-logo-text">Ivamar <span>AI</span></span>
    </a>
    <a href="/es" class="legal-back">← Volver</a>
  </nav>

  <div class="legal-content">
    <h1>Política de Privacidad</h1>
    <p class="legal-meta">Ivamar AI LLC · Delaware, USA · Última actualización: Enero 2025</p>

    <h2>1. Quiénes Somos</h2>
    <p>Ivamar AI LLC es una empresa de responsabilidad limitada incorporada en Delaware, USA. Proveemos páginas digitales con IA y servicios de asistentes digitales para negocios. Esta Política de Privacidad explica cómo recopilamos, usamos y protegemos su información.</p>

    <h2>2. Información que Recopilamos</h2>
    <p>Recopilamos información que usted provee voluntariamente al usar nuestros servicios:</p>
    <ul>
      <li>Información del negocio (nombre, tipo, menú, servicios, precios, horarios)</li>
      <li>Información de contacto (nombre del dueño, email, teléfono, WhatsApp)</li>
      <li>Mensajes enviados a través del asistente digital IvA</li>
      <li>Solicitudes de demo, formularios de cotización y datos de incorporación</li>
      <li>Logos, fotos y otros medios provistos por los clientes</li>
      <li>Datos básicos de uso (visitas a páginas, tipo de navegador)</li>
    </ul>

    <h2>3. Cómo Usamos su Información</h2>
    <ul>
      <li>Para crear y administrar su página web en nuestra plataforma</li>
      <li>Para configurar y entrenar su asistente digital IvA</li>
      <li>Para procesar pagos a través de proveedores externos</li>
      <li>Para enviar actualizaciones del servicio, facturas y comunicaciones de soporte</li>
      <li>Para mejorar nuestra plataforma y experiencia de usuario</li>
      <li>Para responder sus consultas y brindar soporte al cliente</li>
    </ul>

    <h2>4. Servicios de Terceros</h2>
    <p>Nuestra plataforma se integra con los siguientes servicios externos, cada uno con su propia política de privacidad:</p>
    <ul>
      <li>Stripe — procesamiento de pagos (stripe.com/privacy)</li>
      <li>WhatsApp / Meta — mensajería con clientes</li>
      <li>Anthropic — funcionalidad del asistente de IA</li>
      <li>Render — infraestructura de hosting en la nube</li>
      <li>ATH Móvil / PayPal / Square — procesadores de pago alternativos</li>
    </ul>

    <h2>5. Compartir Datos</h2>
    <p>No vendemos, alquilamos ni comercializamos su información personal a terceros. Solo compartimos datos según sea necesario para proveer nuestros servicios o según lo exija la ley aplicable.</p>

    <h2>6. Seguridad de Datos</h2>
    <p>Implementamos medidas de seguridad estándar de la industria para proteger su información, incluyendo conexiones cifradas (HTTPS), infraestructura de hosting segura y controles de acceso. Los datos de pago son procesados exclusivamente por proveedores externos certificados PCI.</p>

    <h2>7. Retención de Datos</h2>
    <p>Retenemos sus datos mientras su cuenta esté activa o según sea necesario para proveer nuestros servicios. Tras la cancelación, sus datos se retienen durante 30 días para solicitudes de exportación, luego se eliminan permanentemente.</p>

    <h2>8. Sus Derechos</h2>
    <p>Usted tiene los siguientes derechos sobre sus datos personales:</p>
    <ul>
      <li>Acceso — solicitar una copia de los datos que tenemos sobre usted</li>
      <li>Corrección — solicitar corrección de datos incorrectos</li>
      <li>Eliminación — solicitar la eliminación de sus datos</li>
      <li>Portabilidad — solicitar una exportación de los datos de su negocio</li>
      <li>Exclusión — darse de baja de comunicaciones de marketing en cualquier momento</li>
    </ul>

    <h2>9. Cookies</h2>
    <p>Nuestra plataforma puede usar cookies básicas para funcionalidad y análisis. No usamos cookies para publicidad ni seguimiento en sitios de terceros.</p>

    <h2>10. Privacidad de Menores</h2>
    <p>Nuestros servicios no están dirigidos a personas menores de 18 años. No recopilamos conscientemente información personal de menores.</p>

    <h2>11. Cambios a Esta Política</h2>
    <p>Podemos actualizar esta Política de Privacidad ocasionalmente. Notificaremos a los clientes de cambios importantes por WhatsApp o email.</p>

    <h2>12. Contacto</h2>
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
