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
.iva-doc-updated{font-family:'JetBrains Mono',monospace;font-size:0.7rem;color:#4A5568;margin-bottom:2.5rem;padding:0.6rem 1rem;background:#0D1420;border-radius:6px;display:inline-block;}
.iva-doc-section{margin-bottom:2.5rem;}
.iva-doc-section h2{font-size:1.05rem;font-weight:700;margin-bottom:0.8rem;padding-bottom:0.6rem;border-bottom:1px solid rgba(255,255,255,0.06);color:#F0F4FF;}
.iva-doc-section p{color:#8892A4;line-height:1.8;font-size:0.9rem;font-weight:400;margin-bottom:0.8rem;}
.iva-doc-section p:last-child{margin-bottom:0;}
.iva-doc-section ul{list-style:none;padding:0;}
.iva-doc-section ul li{color:#8892A4;font-size:0.9rem;line-height:1.7;padding:0.4rem 0;padding-left:1.2rem;position:relative;}
.iva-doc-section ul li::before{content:'→';position:absolute;left:0;color:#00E5C8;font-size:0.75rem;}
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
      <img src="/logo-white.png" alt="Ivamar AI" style="height:28px;width:auto;">
      <span class="iva-sub-logo-text">Ivamar <span>AI</span></span>
    </a>
    <a href="/" class="iva-sub-back">← Back</a>
  </nav>

  <div class="iva-doc-hero">
    <div class="iva-doc-tag">Legal</div>
    <h1>Privacy Policy</h1>
    <p>Ivamar AI LLC · Delaware, USA</p>
  </div>

  <div class="iva-doc-content">
    <div class="iva-doc-updated">Last updated: January 2025</div>

    <div class="iva-doc-section">
      <h2>1. Who We Are</h2>
      <p>Ivamar AI LLC ("Ivamar AI", "we", "us", "our") is a limited liability company incorporated in Delaware, USA. We provide AI-powered digital pages and assistant services for businesses in Puerto Rico and the United States. This Privacy Policy explains how we collect, use and protect your information when you use our services.</p>
    </div>

    <div class="iva-doc-section">
      <h2>2. Information We Collect</h2>
      <p>We collect information you voluntarily provide when using our services:</p>
      <ul>
        <li>Business information (name, type, menu, services, prices, hours)</li>
        <li>Contact information (owner name, email address, phone, WhatsApp number)</li>
        <li>Messages sent through our AI assistant (IvA)</li>
        <li>Form submissions, demo requests and onboarding data</li>
        <li>Logo images, photos and other media provided by clients</li>
        <li>Basic usage data (page visits, browser type) via analytics tools</li>
      </ul>
    </div>

    <div class="iva-doc-section">
      <h2>3. How We Use Your Information</h2>
      <ul>
        <li>To create and manage your business page on our platform</li>
        <li>To configure and train your IvA AI assistant</li>
        <li>To process payments through third-party providers</li>
        <li>To send service updates, invoices and support communications</li>
        <li>To improve our platform, features and user experience</li>
        <li>To respond to your inquiries and provide customer support</li>
      </ul>
    </div>

    <div class="iva-doc-section">
      <h2>4. Third-Party Services</h2>
      <p>Our platform integrates with the following third-party services. Each has its own privacy policy and data practices:</p>
      <ul>
        <li>Stripe — payment processing (stripe.com/privacy)</li>
        <li>WhatsApp / Meta — customer messaging</li>
        <li>Anthropic / OpenAI — AI assistant functionality</li>
        <li>Google Forms — demo request and onboarding forms</li>
        <li>Render — cloud hosting infrastructure</li>
        <li>ATH Móvil / PayPal / Square — alternative payment processors</li>
      </ul>
    </div>

    <div class="iva-doc-section">
      <h2>5. Data Sharing</h2>
      <p>We do not sell, rent or trade your personal information to third parties. We only share data as necessary to provide our services (payment processors, hosting providers, AI providers) or as required by applicable law.</p>
      <p>We may share aggregated, anonymized data that cannot identify any individual for analytics or business improvement purposes.</p>
    </div>

    <div class="iva-doc-section">
      <h2>6. Data Security</h2>
      <p>We implement industry-standard security measures to protect your information, including encrypted connections (HTTPS), secure hosting infrastructure and access controls.</p>
      <p>Payment data is processed exclusively by PCI-compliant third-party providers. Ivamar AI LLC never stores credit card numbers or sensitive payment credentials.</p>
    </div>

    <div class="iva-doc-section">
      <h2>7. Data Retention</h2>
      <p>We retain your data for as long as your account is active or as needed to provide our services. Upon cancellation, your data will be retained for 30 days to allow for export requests, then permanently deleted.</p>
    </div>

    <div class="iva-doc-section">
      <h2>8. Your Rights</h2>
      <p>You have the following rights regarding your personal data:</p>
      <ul>
        <li>Access — request a copy of the data we hold about you</li>
        <li>Correction — request correction of inaccurate data</li>
        <li>Deletion — request deletion of your data</li>
        <li>Portability — request an export of your business data</li>
        <li>Opt-out — unsubscribe from marketing communications at any time</li>
      </ul>
      <p>To exercise any of these rights, contact us via <a href="https://wa.me/18635216708">WhatsApp</a>.</p>
    </div>

    <div class="iva-doc-section">
      <h2>9. Cookies</h2>
      <p>Our platform may use basic cookies for functionality and analytics purposes. We do not use cookies for advertising or tracking across third-party sites. You can disable cookies in your browser settings, though some features may not function correctly.</p>
    </div>

    <div class="iva-doc-section">
      <h2>10. Children's Privacy</h2>
      <p>Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If we become aware that a minor has provided us with personal data, we will delete it promptly.</p>
    </div>

    <div class="iva-doc-section">
      <h2>11. Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. We will notify clients of material changes via WhatsApp or email. Continued use of our services after notification constitutes acceptance of the updated policy.</p>
    </div>

    <div class="iva-doc-section">
      <h2>12. Contact</h2>
      <p>For privacy questions, requests or concerns:</p>
      <ul>
        <li>Company: Ivamar AI LLC</li>
        <li>State of incorporation: Delaware, USA</li>
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
