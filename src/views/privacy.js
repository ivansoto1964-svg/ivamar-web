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
    <a href="/" class="legal-logo">
      <img src="/logo-white.png" alt="Ivamar AI" style="height:28px;width:auto;">
      <span class="legal-logo-text">Ivamar <span>AI</span></span>
    </a>
    <a href="/" class="legal-back">← Back</a>
  </nav>

  <div class="legal-content">
    <h1>Privacy Policy</h1>
    <p class="legal-meta">Ivamar AI LLC · Delaware, USA · Last updated: January 2025 · Version 2.0</p>

    <div class="legal-highlight">
      <p><strong>🔒 Your privacy matters.</strong> This Privacy Policy explains how we collect, use, protect, and share your information when you use Ivamar AI services. Read it before signing up.</p>
    </div>

    <h2>1. Who We Are</h2>
    <p>Ivamar AI LLC ("Ivamar AI", "we", "us", "our") is a limited liability company incorporated in Delaware, USA. We provide AI-powered digital pages and intelligent assistant services for businesses worldwide.</p>

    <h2>2. Information We Collect</h2>
    <p>We collect information you voluntarily provide when using our services:</p>
    <ul>
      <li><strong>Business information:</strong> name, type, menu, services, prices, hours, location</li>
      <li><strong>Contact information:</strong> owner name, email, phone, WhatsApp number</li>
      <li><strong>Messages:</strong> conversations through our AI assistant (IvA)</li>
      <li><strong>Form submissions:</strong> demo requests, quote forms, onboarding data</li>
      <li><strong>Media:</strong> logos, photos, and other content provided by clients</li>
      <li><strong>Legal acceptance records:</strong> agreement timestamps, IP address, terms version (for legal compliance)</li>
      <li><strong>Usage data:</strong> page visits, browser type, device info via analytics tools</li>
    </ul>

    <h2>3. How We Use Your Information</h2>
    <ul>
      <li>To create and manage your business page on our platform</li>
      <li>To configure and train your AI assistant (IvA or custom-named)</li>
      <li>To process payments through third-party providers</li>
      <li>To send service updates, invoices, and support communications</li>
      <li>To improve our platform, features, and user experience</li>
      <li>To respond to your inquiries and provide customer support</li>
      <li>To maintain legal records of agreement acceptance for compliance</li>
    </ul>

    <h2>4. Third-Party Services</h2>
    <p>Our platform integrates with the following third-party services. Each has its own privacy policy:</p>
    <ul>
      <li><strong>Stripe</strong> — payment processing (stripe.com/privacy)</li>
      <li><strong>WhatsApp / Meta</strong> — customer messaging</li>
      <li><strong>Anthropic</strong> — AI assistant functionality</li>
      <li><strong>Resend</strong> — transactional email delivery</li>
      <li><strong>Render</strong> — cloud hosting infrastructure</li>
      <li><strong>Google Workspace</strong> — business email</li>
    </ul>

    <h2>5. Data Sharing</h2>
    <p><strong>We do not sell, rent, or trade your personal information to third parties.</strong> We only share data as necessary to provide our services (payment processors, hosting providers, AI providers, email services) or as required by applicable law.</p>
    <p>We may share aggregated, anonymized data that cannot identify any individual for analytics or business improvement purposes.</p>

    <h2>6. Customer Data on Your Page</h2>
    <p>When customers interact with your business page (orders, AI conversations, contact requests), <strong>you (the Merchant) are responsible for handling and protecting that data</strong> in compliance with applicable privacy laws in your jurisdiction. Ivamar AI provides the technology platform, but the Merchant is the data controller for their customers' information.</p>

    <h2>7. Data Security</h2>
    <p>We implement industry-standard security measures to protect your information:</p>
    <ul>
      <li>Encrypted connections (HTTPS) for all data transmission</li>
      <li>Secure hosting infrastructure with restricted access</li>
      <li>Access controls and authentication for admin features</li>
      <li>Regular backups and incident response procedures</li>
    </ul>
    <p>Payment data is processed exclusively by PCI-compliant third-party providers (Stripe). <strong>Ivamar AI LLC never stores credit card numbers or sensitive payment credentials.</strong></p>

    <h2>8. Data Retention</h2>
    <p>We retain your data for as long as your account is active or as needed to provide our services. Specifically:</p>
    <ul>
      <li><strong>Active accounts:</strong> data retained while you use the service</li>
      <li><strong>After cancellation:</strong> data retained for 30 days for export requests, then permanently deleted</li>
      <li><strong>Legal acceptance records:</strong> retained for up to 7 years for legal compliance</li>
      <li><strong>Financial records:</strong> retained as required by tax and accounting laws</li>
    </ul>

    <h2>9. Your Rights</h2>
    <p>You have the following rights regarding your personal data:</p>
    <ul>
      <li><strong>Access:</strong> request a copy of the data we hold about you</li>
      <li><strong>Correction:</strong> request correction of inaccurate data</li>
      <li><strong>Deletion:</strong> request deletion of your data (subject to legal retention requirements)</li>
      <li><strong>Portability:</strong> request an export of your business data</li>
      <li><strong>Opt-out:</strong> unsubscribe from marketing communications at any time</li>
      <li><strong>Restriction:</strong> request that we limit processing of your data</li>
    </ul>
    <p>To exercise any of these rights, contact us via WhatsApp or email. We will respond within 30 days.</p>

    <h2>10. Cookies & Analytics</h2>
    <p>Our platform may use basic cookies for functionality and analytics purposes. We do not use cookies for advertising or tracking across third-party sites. You can disable cookies in your browser settings, though some features may not function correctly.</p>

    <h2>11. Children's Privacy</h2>
    <p>Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If we become aware that a minor has provided us with personal data, we will delete it promptly.</p>

    <h2>12. International Data Transfers</h2>
    <p>Ivamar AI LLC is based in Delaware, USA. By using our services, you consent to the transfer of your data to and processing in the United States. We comply with applicable international data transfer requirements.</p>

    <h2>13. Changes to This Policy</h2>
    <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify clients of material changes via WhatsApp or email. Continued use of our services after notification constitutes acceptance of the updated policy.</p>

    <h2>14. Contact</h2>
    <p>For privacy questions, requests, or concerns:</p>
    <ul>
      <li><strong>Company:</strong> Ivamar AI LLC</li>
      <li><strong>Address:</strong> 8 The Green, Suite B, Dover, DE 19901, USA</li>
      <li><strong>State of incorporation:</strong> Delaware, USA</li>
      <li><strong>WhatsApp:</strong> +1 (863) 521-6708</li>
      <li><strong>Email:</strong> connect@ivamarai.com</li>
      <li><strong>Website:</strong> ivamarai.com</li>
    </ul>

    <p style="margin-top:3rem;font-size:0.8rem;color:#4A5568;text-align:center;">© 2025 Ivamar AI LLC · Delaware, USA · All rights reserved</p>
  </div>

  <div class="legal-footer">
    <div>© 2025 <strong>Ivamar AI LLC</strong> · Delaware, USA</div>
    <div class="legal-footer-links">
      <a href="/privacy">Privacy</a>
      <a href="/terms">Terms</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </div>
  </div>
</div>
`;
