module.exports = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400&display=swap');
.legal-page{font-family:'Syne',sans-serif;background:#030508;color:#F0F4FF;margin:-20px;overflow-x:hidden;}
.legal-page *{box-sizing:border-box;margin:0;padding:0;}
.legal-nav{padding:1.2rem 2rem;display:flex;align-items:center;justify-content:space-between;background:rgba(3,5,8,0.95);border-bottom:1px solid rgba(0,229,200,0.08);position:sticky;top:0;z-index:100;backdrop-filter:blur(12px);}
.legal-logo{display:flex;align-items:center;gap:0.7rem;text-decoration:none;}
.legal-logo-text{font-size:1rem;font-weight:700;color:#F0F4FF;letter-spacing:-0.02em;margin-left:0.5rem;}
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
.legal-content strong{color:#F0F4FF;}
.legal-highlight{background:rgba(0,229,200,0.05);border-left:3px solid #00E5C8;padding:1rem 1.2rem;margin:1.5rem 0;border-radius:6px;}
.legal-highlight p{color:#F0F4FF;font-size:0.9rem;margin:0;}
.legal-footer{background:#030508;padding:2rem 2.5rem;border-top:1px solid rgba(255,255,255,0.04);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;font-size:0.8rem;color:#4A5568;}
.legal-footer strong{color:#8892A4;}
.legal-footer-links{display:flex;gap:1.5rem;}
.legal-footer-links a{color:#4A5568;text-decoration:none;transition:color 0.2s;}
.legal-footer-links a:hover{color:#00E5C8;}
</style>

<div class="legal-page">
  <nav class="legal-nav">
    <a href="/es" class="legal-logo">
      <img src="/logo-white.png" alt="Ivamar AI" style="height:28px;width:auto;">
      <span class="legal-logo-text">Ivamar <span>AI</span></span>
    </a>
    <a href="/es" class="legal-back">← Volver</a>
  </nav>

  <div class="legal-content">
    <h1>Política de Privacidad</h1>
    <p class="legal-meta">Ivamar AI LLC · Delaware, USA · Última actualización: Enero 2025 · Versión 2.0</p>

    <div class="legal-highlight">
      <p><strong>🔒 Tu privacidad importa.</strong> Esta Política de Privacidad explica cómo recopilamos, usamos, protegemos y compartimos tu información cuando usas los servicios de Ivamar AI. Léela antes de registrarte.</p>
    </div>

    <h2>1. Quiénes Somos</h2>
    <p>Ivamar AI LLC ("Ivamar AI", "nosotros") es una empresa de responsabilidad limitada incorporada en Delaware, USA. Proveemos páginas digitales con IA y servicios de asistentes inteligentes para negocios alrededor del mundo.</p>

    <h2>2. Información que Recopilamos</h2>
    <p>Recopilamos información que provees voluntariamente al usar nuestros servicios:</p>
    <ul>
      <li><strong>Información del negocio:</strong> nombre, tipo, menú, servicios, precios, horarios, ubicación</li>
      <li><strong>Información de contacto:</strong> nombre del dueño, email, teléfono, WhatsApp</li>
      <li><strong>Mensajes:</strong> conversaciones con nuestro asistente IA (IvA)</li>
      <li><strong>Formularios:</strong> solicitudes de demo, formularios de cotización, datos de incorporación</li>
      <li><strong>Medios:</strong> logos, fotos y otros contenidos provistos por clientes</li>
      <li><strong>Registros legales:</strong> timestamp de aceptación, IP, versión de términos (cumplimiento legal)</li>
      <li><strong>Datos de uso:</strong> visitas, tipo de navegador, info del dispositivo vía analytics</li>
    </ul>

    <h2>3. Cómo Usamos tu Información</h2>
    <ul>
      <li>Para crear y administrar tu página de negocio en nuestra plataforma</li>
      <li>Para configurar y entrenar tu asistente de IA (IvA o nombre personalizado)</li>
      <li>Para procesar pagos a través de proveedores externos</li>
      <li>Para enviar actualizaciones del servicio, facturas y comunicaciones de soporte</li>
      <li>Para mejorar nuestra plataforma, funciones y experiencia de usuario</li>
      <li>Para responder consultas y brindar soporte al cliente</li>
      <li>Para mantener registros legales de aceptación de términos</li>
    </ul>

    <h2>4. Servicios de Terceros</h2>
    <p>Nuestra plataforma se integra con los siguientes servicios externos. Cada uno tiene su propia política de privacidad:</p>
    <ul>
      <li><strong>Stripe</strong> — procesamiento de pagos (stripe.com/privacy)</li>
      <li><strong>WhatsApp / Meta</strong> — mensajería con clientes</li>
      <li><strong>Anthropic</strong> — funcionalidad del asistente de IA</li>
      <li><strong>Resend</strong> — entrega de emails transaccionales</li>
      <li><strong>Render</strong> — infraestructura de hosting en la nube</li>
      <li><strong>Google Workspace</strong> — email empresarial</li>
    </ul>

    <h2>5. Compartir Datos</h2>
    <p><strong>No vendemos, alquilamos ni comercializamos tu información personal a terceros.</strong> Solo compartimos datos según sea necesario para proveer nuestros servicios (procesadores de pago, proveedores de hosting, IA, servicios de email) o según lo exija la ley aplicable.</p>
    <p>Podemos compartir datos agregados y anónimos que no identifican a ninguna persona para fines de análisis o mejora del negocio.</p>

    <h2>6. Datos de Clientes en tu Página</h2>
    <p>Cuando los clientes interactúan con tu página de negocio (pedidos, conversaciones con IA, solicitudes de contacto), <strong>tú (el Comerciante) eres responsable del manejo y protección de esos datos</strong> en cumplimiento con las leyes de privacidad aplicables en tu jurisdicción. Ivamar AI provee la plataforma tecnológica, pero el Comerciante es el controlador de los datos de sus clientes.</p>

    <h2>7. Seguridad de Datos</h2>
    <p>Implementamos medidas de seguridad estándar de la industria para proteger tu información:</p>
    <ul>
      <li>Conexiones encriptadas (HTTPS) para toda transmisión de datos</li>
      <li>Infraestructura de hosting segura con acceso restringido</li>
      <li>Controles de acceso y autenticación para funciones de administrador</li>
      <li>Respaldos regulares y procedimientos de respuesta a incidentes</li>
    </ul>
    <p>Los datos de pago son procesados exclusivamente por proveedores externos certificados PCI (Stripe). <strong>Ivamar AI LLC nunca almacena números de tarjeta ni credenciales sensibles de pago.</strong></p>

    <h2>8. Retención de Datos</h2>
    <p>Retenemos tus datos mientras tu cuenta esté activa o según sea necesario para proveer nuestros servicios:</p>
    <ul>
      <li><strong>Cuentas activas:</strong> datos retenidos mientras uses el servicio</li>
      <li><strong>Tras cancelación:</strong> datos retenidos por 30 días para solicitudes de exportación, luego eliminados permanentemente</li>
      <li><strong>Registros legales:</strong> retenidos hasta 7 años para cumplimiento legal</li>
      <li><strong>Registros financieros:</strong> retenidos según las leyes fiscales y contables</li>
    </ul>

    <h2>9. Tus Derechos</h2>
    <p>Tienes los siguientes derechos sobre tus datos personales:</p>
    <ul>
      <li><strong>Acceso:</strong> solicitar copia de los datos que tenemos sobre ti</li>
      <li><strong>Corrección:</strong> solicitar corrección de datos inexactos</li>
      <li><strong>Eliminación:</strong> solicitar la eliminación de tus datos (sujeto a requisitos legales)</li>
      <li><strong>Portabilidad:</strong> solicitar exportación de los datos de tu negocio</li>
      <li><strong>Exclusión:</strong> darse de baja de comunicaciones de marketing en cualquier momento</li>
      <li><strong>Restricción:</strong> solicitar que limitemos el procesamiento de tus datos</li>
    </ul>
    <p>Para ejercer cualquiera de estos derechos, contáctanos por WhatsApp o email. Responderemos en 30 días.</p>

    <h2>10. Cookies y Analytics</h2>
    <p>Nuestra plataforma puede usar cookies básicas para funcionalidad y análisis. No usamos cookies para publicidad ni seguimiento en sitios de terceros. Puedes deshabilitar cookies en tu navegador, aunque algunas funciones pueden no funcionar correctamente.</p>

    <h2>11. Privacidad de Menores</h2>
    <p>Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos conscientemente información personal de menores. Si nos enteramos que un menor nos ha provisto datos personales, los eliminaremos prontamente.</p>

    <h2>12. Transferencias Internacionales de Datos</h2>
    <p>Ivamar AI LLC tiene base en Delaware, USA. Al usar nuestros servicios, aceptas la transferencia de tus datos a los Estados Unidos y su procesamiento allí. Cumplimos con los requisitos aplicables de transferencia internacional de datos.</p>

    <h2>13. Cambios a Esta Política</h2>
    <p>Podemos actualizar esta Política de Privacidad ocasionalmente para reflejar cambios en nuestras prácticas o requisitos legales. Notificaremos a los clientes de cambios importantes por WhatsApp o email. El uso continuo de nuestros servicios constituye aceptación de la política actualizada.</p>

    <h2>14. Contacto</h2>
    <p>Para preguntas, solicitudes o inquietudes sobre privacidad:</p>
    <ul>
      <li><strong>Empresa:</strong> Ivamar AI LLC</li>
      <li><strong>Dirección:</strong> 8 The Green, Suite B, Dover, DE 19901, USA</li>
      <li><strong>Estado de incorporación:</strong> Delaware, USA</li>
      <li><strong>WhatsApp:</strong> +1 (863) 521-6708</li>
      <li><strong>Email:</strong> connect@ivamarai.com</li>
      <li><strong>Website:</strong> ivamarai.com</li>
    </ul>

    <p style="margin-top:3rem;font-size:0.8rem;color:#4A5568;text-align:center;">© 2025 Ivamar AI LLC · Delaware, USA · Todos los derechos reservados</p>
  </div>

  <div class="legal-footer">
    <div>© 2025 <strong>Ivamar AI LLC</strong> · Delaware, USA</div>
    <div class="legal-footer-links">
      <a href="/privacidad">Privacidad</a>
      <a href="/terminos">Términos</a>
      <a href="/sobre-nosotros">Nosotros</a>
      <a href="/contacto">Contacto</a>
    </div>
  </div>
</div>
`;
