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
      <div class="iva-sub-logo-mark">IvA</div>
      <span class="iva-sub-logo-text">Ivamar <span>AI</span></span>
    </a>
    <a href="/" class="iva-sub-back">← Back</a>
  </nav>

  <div class="iva-doc-hero">
    <div class="iva-doc-tag">Legal</div>
    <h1>Terms of Service</h1>
    <p>Ivamar AI LLC · Delaware, USA</p>
  </div>

  <div class="iva-doc-content">
    <div class="iva-doc-updated">Last updated: January 2025</div>

    <div class="iva-doc-section">
      <h2>1. Agreement</h2>
      <p>By accessing or using any service provided by Ivamar AI LLC ("Company", "we", "us"), you ("Client") agree to be bound by these Terms of Service. If you do not agree, do not use our services.</p>
    </div>

    <div class="iva-doc-section">
      <h2>2. Services</h2>
      <p>Ivamar AI LLC provides the following digital services:</p>
      <ul>
        <li>Custom mobile-first landing pages for businesses</li>
        <li>AI assistant (IvA) trained on client business information</li>
        <li>WhatsApp order flow integration</li>
        <li>Payment processing integration (Stripe, ATH Móvil, PayPal, Square)</li>
        <li>Hosting, maintenance and technical support</li>
        <li>Menu and content editor access</li>
      </ul>
    </div>

    <div class="iva-doc-section">
      <h2>3. Pricing & Payment</h2>
      <ul>
        <li>One-time setup fee: $125 USD (includes first month of service free)</li>
        <li>Monthly service fee: $49 USD/month starting in month 2</li>
        <li>Payments are processed via Stripe or other agreed methods</li>
        <li>Monthly fees are due on the same date each month</li>
        <li>Services may be suspended after 7 days of non-payment</li>
        <li>No commissions are charged per order or transaction</li>
      </ul>
    </div>

    <div class="iva-doc-section">
      <h2>4. Client Responsibilities</h2>
      <ul>
        <li>Provide accurate and complete business information (menu, prices, hours, photos)</li>
        <li>Keep all business information up to date</li>
        <li>Not use the platform for illegal activities or prohibited content</li>
        <li>Comply with all applicable laws in Puerto Rico and the United States</li>
        <li>Maintain their own payment processor accounts (Stripe, ATH Móvil, etc.)</li>
        <li>Ensure all content provided does not infringe third-party rights</li>
      </ul>
    </div>

    <div class="iva-doc-section">
      <h2>5. Intellectual Property</h2>
      <p>The client retains ownership of all content they provide, including logos, photos, menus and business descriptions. Ivamar AI LLC retains full ownership of the platform, templates, AI systems, code and technology.</p>
      <p>Upon cancellation, clients may request an export of their business data within 30 days.</p>
    </div>

    <div class="iva-doc-section">
      <h2>6. Cancellation</h2>
      <ul>
        <li>Either party may cancel with 30 days written notice via WhatsApp or email</li>
        <li>Setup fees are non-refundable once the page has been published</li>
        <li>Monthly fees are non-refundable for the current billing period</li>
        <li>Client data will be permanently deleted 30 days after cancellation</li>
      </ul>
    </div>

    <div class="iva-doc-section">
      <h2>7. Limitation of Liability</h2>
      <p>Ivamar AI LLC is a technology provider. We are not responsible for the products, services, pricing or transactions of our clients. We are not liable for any indirect, incidental, special or consequential damages arising from use of our platform.</p>
      <p>Our maximum total liability to any client is limited to the fees paid in the 3 months preceding the claim.</p>
    </div>

    <div class="iva-doc-section">
      <h2>8. AI Assistant Disclaimer</h2>
      <p>IvA is an AI assistant designed to help businesses communicate with their customers. All responses are generated based on information provided by the client. Ivamar AI LLC is not responsible for errors, inaccuracies or omissions in AI-generated responses. Clients are responsible for keeping their business information accurate and current.</p>
    </div>

    <div class="iva-doc-section">
      <h2>9. Governing Law & Disputes</h2>
      <p>These Terms of Service are governed by the laws of the State of Delaware, United States of America. Any disputes arising under these terms will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association (AAA).</p>
    </div>

    <div class="iva-doc-section">
      <h2>10. Changes to Terms</h2>
      <p>Ivamar AI LLC reserves the right to update these Terms of Service at any time. Clients will be notified of material changes via WhatsApp or email. Continued use of our services after notification constitutes acceptance of the updated terms.</p>
    </div>

    <div class="iva-doc-section">
      <h2>11. Contact</h2>
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
