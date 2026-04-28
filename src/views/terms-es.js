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
    <h1>Términos de Servicio</h1>
    <p class="legal-meta">Ivamar AI LLC · Delaware, USA · Última actualización: Enero 2025 · Versión 2.0</p>

    <div class="legal-highlight">
      <p><strong>📋 Importante — Lee antes de pagar:</strong> Al usar nuestros servicios aceptas estos Términos. Por favor revísalos cuidadosamente y contáctanos con cualquier pregunta antes de completar tu pago.</p>
    </div>

    <h2>1. Acuerdo</h2>
    <p>Al acceder o usar cualquier servicio provisto por Ivamar AI LLC ("Empresa", "nosotros"), usted ("Comerciante", "Cliente") acepta estos Términos de Servicio. Si no está de acuerdo, no use nuestros servicios.</p>

    <h2>2. Servicios Provistos</h2>
    <p>Ivamar AI LLC ofrece los siguientes servicios digitales:</p>
    <ul>
      <li>Páginas web personalizadas para negocios</li>
      <li>Asistente digital de IA ("IvA" o nombre personalizado) entrenado con la información del Comerciante</li>
      <li>Integración de pedidos por WhatsApp</li>
      <li>Integración con procesadores de pago (Stripe, ATH Móvil, PayPal, Square u otros)</li>
      <li>Hosting, mantenimiento y soporte técnico</li>
      <li>Panel de administración para editar contenido</li>
    </ul>

    <h2>3. Precios y Pagos</h2>
    <ul>
      <li>Pago único de configuración: $125 USD (incluye los primeros 30 días de servicio)</li>
      <li>Suscripción mensual: $49 USD o $99 USD según industria</li>
      <li>Los pagos se procesan vía Stripe u otros métodos acordados</li>
      <li>Las mensualidades vencen automáticamente cada ciclo de facturación</li>
      <li>Los servicios pueden suspenderse después de 7 días de mora</li>
      <li>No se cobran comisiones por orden o transacción</li>
    </ul>

    <h2>4. Garantía Sin Cargos Escondidos</h2>
    <div class="legal-highlight">
      <p><strong>Nuestra promesa:</strong> Ivamar AI LLC cobra únicamente el setup acordado y la mensualidad. Sin cargos escondidos, sin comisiones por transacción, sin sorpresas. Si ves cualquier cargo no autorizado de Ivamar AI LLC, contáctanos de inmediato y te lo devolvemos en su totalidad — incluso si es solo un centavo.</p>
    </div>

    <h2>5. Cancelación</h2>
    <ul>
      <li>Puedes cancelar en cualquier momento. Sin contratos a largo plazo.</li>
      <li>El pago de configuración no es reembolsable una vez publicada la página</li>
      <li>Las mensualidades no son reembolsables para el período actual</li>
      <li>Tus datos serán eliminados permanentemente 30 días después de cancelar</li>
      <li>Puedes solicitar exportación de datos dentro de 30 días</li>
    </ul>

    <h2>6. Responsabilidad del Comerciante</h2>
    <p>Ivamar AI LLC actúa únicamente como plataforma tecnológica e intermediario digital. El Comerciante es el único responsable de todos los aspectos de su negocio incluyendo:</p>
    <ul>
      <li>Calidad, seguridad y legalidad de productos y servicios</li>
      <li>Exactitud de todo el contenido (menús, precios, horarios, descripciones, disponibilidad)</li>
      <li>Cumplimiento con todas las leyes locales, estatales, federales e internacionales</li>
      <li>Interacciones con clientes, cumplimiento y soporte</li>
      <li>Mantenimiento de cuentas de procesadores de pago</li>
      <li>Licencias de negocio, permisos y cumplimiento regulatorio</li>
    </ul>

    <h2>7. Seguridad Alimentaria & Alergias</h2>
    <p>Ivamar AI LLC no prepara, manipula, inspecciona, distribuye ni vende ningún alimento o producto a través de nuestra plataforma. Los Comerciantes en industrias relacionadas con comida son los únicos responsables de:</p>
    <ul>
      <li>Informar a los clientes sobre ingredientes, alérgenos y riesgos de contaminación cruzada</li>
      <li>Cumplir con todas las regulaciones de seguridad alimentaria</li>
      <li>Manejo, preparación y almacenamiento adecuado de alimentos</li>
      <li>Permisos de salud e inspecciones</li>
    </ul>
    <p>Clientes con alergias, restricciones alimentarias o condiciones de salud deben contactar al Comerciante directamente antes de ordenar. <strong>Ivamar AI LLC no asume ninguna responsabilidad por enfermedades, lesiones, reacciones alérgicas, intoxicaciones alimentarias o cualquier daño causado por productos o servicios del Comerciante.</strong></p>

    <h2>8. Descargo del Asistente de IA</h2>
    <p>El asistente de IA (IvA o nombre personalizado) está entrenado con información provista por el Comerciante. Limitaciones importantes:</p>
    <ul>
      <li>Las respuestas se generan automáticamente y pueden contener errores o información desactualizada</li>
      <li>Los Comerciantes son responsables de mantener su información actualizada</li>
      <li>El asistente no sustituye asesoramiento profesional (médico, legal, financiero, etc.)</li>
      <li>Ivamar AI LLC no es responsable de respuestas inexactas o incorrectas generadas por la IA</li>
    </ul>

    <h2>9. Pagos y Descargo de Impuestos</h2>
    <p><strong>Ivamar AI LLC NO es procesador de pagos, comerciante de registro ni intermediario financiero.</strong> No recaudamos, retenemos ni recibimos ninguna porción de los pagos entre clientes y Comerciantes en nuestra plataforma.</p>
    <p>TODOS los pagos de clientes finales van 100% directo a la cuenta del procesador del Comerciante (Stripe, ATH Móvil, PayPal, Square u otros). El único ingreso de Ivamar AI LLC es la mensualidad pagada por el Comerciante.</p>
    <p><strong>Responsabilidad Fiscal:</strong> El Comerciante es el único responsable de:</p>
    <ul>
      <li>Cobrar los impuestos aplicables sobre sus productos y servicios</li>
      <li>Reportar y remitir todos los impuestos a las autoridades correspondientes (locales, estatales, federales, internacionales)</li>
      <li>Cumplir con todas las leyes fiscales en su jurisdicción</li>
    </ul>
    <p>Ivamar AI LLC no tiene obligaciones fiscales relacionadas con las ventas del Comerciante.</p>

    <h2>10. Sin Garantía de Resultados</h2>
    <p>Ivamar AI LLC no garantiza ventas, tráfico de clientes, conversiones o resultados de negocio. El éxito de tu negocio depende de muchos factores fuera de nuestro control.</p>

    <h2>11. Propiedad Intelectual</h2>
    <p>El Comerciante retiene la propiedad de todo el contenido que provee (logos, fotos, menús, descripciones). Ivamar AI LLC retiene la propiedad completa de la plataforma, tecnología, código, plantillas y sistemas de IA.</p>

    <h2>12. Uso Aceptable</h2>
    <p>Aceptas no usar nuestros servicios para actividades ilegales, fraudulentas, dañinas o prohibidas. Nos reservamos el derecho de suspender o terminar el servicio por violaciones.</p>

    <h2>13. Servicios de Terceros</h2>
    <p>Nuestra plataforma se integra con servicios externos (Stripe, WhatsApp, Anthropic, Render, etc.). Cada uno tiene sus propios términos y políticas de privacidad. Ivamar AI LLC no es responsable de las acciones, políticas o servicios de terceros.</p>

    <h2>14. Disponibilidad de la Plataforma</h2>
    <p>Ivamar AI LLC provee su plataforma "tal como está" y "según disponibilidad". No garantizamos servicio ininterrumpido, libre de errores o seguro. No somos responsables por interrupciones, pérdida de datos o fallas técnicas fuera de nuestro control razonable.</p>

    <h2>15. Limitación de Responsabilidad</h2>
    <p>La responsabilidad máxima total de Ivamar AI LLC con cualquier Comerciante o cliente se limita a los honorarios pagados en los 3 meses anteriores al reclamo. Ivamar AI LLC no es responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos.</p>

    <h2>16. Indemnización</h2>
    <p>El Comerciante acepta indemnizar y mantener libre de responsabilidad a Ivamar AI LLC de cualquier reclamo, daño, pérdida o gasto (incluyendo honorarios de abogados) derivados de:</p>
    <ul>
      <li>Productos, servicios u operaciones de negocio del Comerciante</li>
      <li>Contenido provisto por el Comerciante o errores en el contenido</li>
      <li>Obligaciones fiscales del Comerciante</li>
      <li>Disputas o quejas de clientes</li>
      <li>Violación de estos términos o leyes aplicables</li>
    </ul>

    <h2>17. Ley Aplicable y Disputas</h2>
    <p>Estos Términos se rigen por las leyes del Estado de Delaware, USA. Las disputas se resolverán mediante arbitraje vinculante bajo las reglas de la AAA. Se renuncia expresamente a demandas colectivas.</p>

    <h2>18. Cambios a los Términos</h2>
    <p>Ivamar AI LLC se reserva el derecho de actualizar estos Términos en cualquier momento. Cambios importantes se notificarán por WhatsApp o email.</p>

    <h2>19. Contacto</h2>
    <ul>
      <li>Empresa: Ivamar AI LLC</li>
      <li>Dirección: 8 The Green, Suite B, Dover, DE 19901, USA</li>
      <li>Estado de incorporación: Delaware, USA</li>
      <li>WhatsApp: +1 (863) 521-6708</li>
      <li>Email: connect@ivamarai.com</li>
      <li>Website: ivamarai.com</li>
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
