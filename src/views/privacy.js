module.exports = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400&display=swap');
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
.iva-sub-back:hover{color:#F0F4FF;border-color:rgba(255,255,255,0.25);}
.iva-doc-hero{padding:4rem 2rem 2rem;text-align:center;}
.iva-doc-tag{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:0.68rem;color:#00E5C8;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:1rem;padding:0.3rem 0.8rem;border:1px solid rgba(0,229,200,0.2);border-radius:4px;}
.iva-doc-hero h1{font-size:clamp(2rem,4vw,3rem);font-weight:800;letter-spacing:-0.03em;margin-bottom:0.8rem;}
.iva-doc-hero p{color:#8892A4;font-size:0.9rem;font-weight:400;}
.iva-doc-content{max-width:740px;margin:0 auto;padding:2rem 2rem 5rem;}
.iva-doc-section{margin-bottom:2.5rem;}
.iva-doc-section h2{font-size:1.1rem;font-weight:700;margin-bottom:0.8rem;padding-bottom:0.6rem;border-bottom:1px solid rgba(255,255,255,0.06);color:#F0F4FF;}
.iva-doc-section p{color:#8892A4;line-height:1.8;font-size:0.9rem;font-weight:400;margin-bottom:0.8rem;}
.iva-doc-section ul{list-style:none;padding:0;}
.iva-doc-section ul li{color:#8892A4;font-size:0.9rem;line-height:1.7;padding:0.4rem 0;padding-left:1.2rem;position:relative;}
.iva-doc-section ul li::before{content:'→';position:absolute;left:0;color:#00E5C8;font-size:0.75rem;}
.iva-doc-updated{font-family:'JetBrains Mono',monospace;font-size:0.7rem;color:#4A5568;margin-bottom:2.5rem;padding:0.6rem 1rem;background:#0D1420;border-radius:6px;display:inline-block;}
.iva-sub-footer{padding:2rem;border-top:1px solid rgba(255,255,255,0.04);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;font-size:0.78rem;color:#4A5568;}
.iva-sub-footer strong{color:#8892A4;}
.iva-sub-footer-links{display:flex;gap:1.2rem;}
.iva-sub-footer-links a{color:#4A5568;text-decoration:none;transition:color 0.2s;}
.iva-sub-footer-links a:hover{color:#00E5C8;}
@media(max-width:600px){.iva-sub-footer{flex-direction:column;text-align:center;}}
</style>

<div class="iva-sub">
  <nav class="iva-sub-nav">
    <a href="/" class="iva-sub-logo">
      <div class="iva-sub-logo-mark">IvA</div>
      <span class="iva-sub-logo-text">Ivamar <span>AI</span></span>
    </a>
    <a href="/" class="iva-sub-back">← Volver / Back</a>
  </nav>

  <div class="iva-doc-hero">
    <div class="iva-doc-tag">Legal</div>
    <h1>Privacy Policy</h1>
    <p>Política de Privacidad · Ivamar AI LLC</p>
  </div>

  <div class="iva-doc-content">
    <div class="iva-doc-updated">Last updated / Última actualización: January 2025</div>

    <div class="iva-doc-section">
      <h2>1. Who We Are / Quiénes somos</h2>
      <p>Ivamar AI LLC ("Ivamar AI", "we", "us") is a Delaware limited liability company that provides AI-powered digital pages and assistant services for businesses in Puerto Rico and the United States.</p>
      <p>Ivamar AI LLC es una compañía de responsabilidad limitada registrada en Delaware que provee páginas digitales con asistente de IA para negocios en Puerto Rico y Estados Unidos.</p>
    </div>

    <div class="iva-doc-section">
      <h2>2. Information We Collect / Información que recopilamos</h2>
      <p>We collect information you voluntarily provide when using our services:</p>
      <ul>
        <li>Business information (name, type, menu, services, prices)</li>
        <li>Contact information (name, email, phone, WhatsApp)</li>
        <li>Messages sent through our AI assistant (IvA)</li>
        <li>Form submissions and demo requests</li>
        <li>Basic usage data (page visits, browser type) via analytics</li>
      </ul>
    </div>

    <div class="iva-doc-section">
      <h2>3. How We Use Your Information / Cómo usamos tu información</h2>
      <ul>
        <li>To create and manage your business page on our platform</li>
        <li>To configure and train your IvA assistant</li>
        <li>To process payments through third-party providers (Stripe, PayPal)</li>
        <li>To send you service updates and support communications</li>
        <li>To improve our platform and services</li>
      </ul>
    </div>

    <div class="iva-doc-section">
      <h2>4. Third-Party Services / Servicios de terceros</h2>
      <p>Our platform integrates with the following third-party services, each with their own privacy policies:</p>
      <ul>
        <li>Stripe — payment processing (stripe.com/privacy)</li>
        <li>WhatsApp / Meta — messaging (whatsapp.com/legal/privacy-policy)</li>
        <li>Anthropic / OpenAI — AI assistant functionality</li>
        <li>Google Forms — demo request forms</li>
        <li>Render — cloud hosting provider</li>
      </ul>
    </div>

    <div class="iva-doc-section">
      <h2>5. Data Sharing / Compartir datos</h2>
      <p>We do not sell your personal information. We only share data with third parties as necessary to provide our services (payment processors, hosting providers, AI providers) or as required by law.</p>
      <p>No vendemos tu información personal. Solo compartimos datos con terceros según sea necesario para proveer nuestros servicios.</p>
    </div>

    <div class="iva-doc-section">
      <h2>6. Data Security / Seguridad de datos</h2>
      <p>We implement industry-standard security measures to protect your information. Payment data is processed exclusively by PCI-compliant providers — we never store credit card numbers.</p>
    </div>

    <div class="iva-doc-section">
      <h2>7. Your Rights / Tus derechos</h2>
      <ul>
        <li>Request access to your personal data</li>
        <li>Request correction or deletion of your data</li>
        <li>Opt out of marketing communications at any time</li>
        <li>Request data portability</li>
      </ul>
      <p style="margin-top:0.8rem">To exercise these rights, contact us at <a href="https://wa.me/18635216708">WhatsApp</a>.</p>
    </div>

    <div class="iva-doc-section">
      <h2>8. Contact / Contacto</h2>
      <p>For privacy questions or requests:</p>
      <ul>
        <li>Company: Ivamar AI LLC</li>
        <li>State: Delaware, USA</li>
        <li>WhatsApp: <a href="https://wa.me/18635216708">+1 (863) 521-6708</a></li>
        <li>Website: <a href="https://ivamarai.com">ivamarai.com</a></li>
      </ul>
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
