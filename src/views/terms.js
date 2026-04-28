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
    <h1>Terms of Service</h1>
    <p class="legal-meta">Ivamar AI LLC · Delaware, USA · Last updated: January 2025 · Version 2.0</p>

    <div class="legal-highlight">
      <p><strong>📋 Important — Read before paying:</strong> By using our services, you agree to these Terms. Please review them carefully and contact us with any questions before completing your payment.</p>
    </div>

    <h2>1. Agreement</h2>
    <p>By accessing or using any service provided by Ivamar AI LLC ("Company", "we", "us", "our"), you ("Merchant", "Client", "you") agree to be bound by these Terms of Service. If you do not agree, do not use our services.</p>

    <h2>2. Services Provided</h2>
    <p>Ivamar AI LLC offers the following digital services:</p>
    <ul>
      <li>Custom mobile-first landing pages for businesses</li>
      <li>AI assistant ("IvA" or custom-named) trained on Merchant business information</li>
      <li>WhatsApp order flow integration</li>
      <li>Integration with payment processors (Stripe, ATH Móvil, PayPal, Square, others)</li>
      <li>Hosting, maintenance and technical support</li>
      <li>Admin panel for content editing</li>
    </ul>

    <h2>3. Pricing & Payment</h2>
    <ul>
      <li>One-time setup fee: $125 USD (includes first 30 days of service)</li>
      <li>Monthly subscription: $49 USD or $99 USD depending on industry</li>
      <li>Payments processed via Stripe or other agreed methods</li>
      <li>Monthly fees are due automatically each billing cycle</li>
      <li>Services may be suspended after 7 days of non-payment</li>
      <li>No commissions are charged per order or transaction</li>
    </ul>

    <h2>4. No Hidden Fees Guarantee</h2>
    <div class="legal-highlight">
      <p><strong>Our promise:</strong> Ivamar AI LLC charges only the agreed setup fee and monthly subscription. No hidden fees, no transaction commissions, no surprise charges. If you ever see any unauthorized charge from Ivamar AI LLC on your account, contact us immediately and we will refund it in full — even if it's just one penny.</p>
    </div>

    <h2>5. Cancellation</h2>
    <ul>
      <li>You may cancel at any time. No long-term contracts.</li>
      <li>Setup fees are non-refundable once the page has been published</li>
      <li>Monthly fees are non-refundable for the current billing period</li>
      <li>Client data will be permanently deleted 30 days after cancellation</li>
      <li>You may request data export within 30 days of cancellation</li>
    </ul>

    <h2>6. Merchant Responsibility</h2>
    <p>Ivamar AI LLC acts solely as a technology platform and digital intermediary. The Merchant is solely responsible for all aspects of their business operations including:</p>
    <ul>
      <li>Product and service quality, safety, and legality</li>
      <li>Accuracy of all content (menus, prices, hours, descriptions, availability)</li>
      <li>Compliance with all applicable local, state, federal, and international laws</li>
      <li>Customer interactions, fulfillment, and support</li>
      <li>Maintenance of payment processor accounts</li>
      <li>Business licenses, permits, and regulatory compliance</li>
    </ul>

    <h2>7. Food Safety & Allergen Disclaimer</h2>
    <p>Ivamar AI LLC does not prepare, handle, inspect, distribute, or sell any food or products through our platform. Merchants in food-related industries are solely responsible for:</p>
    <ul>
      <li>Informing customers about ingredients, allergens, and cross-contamination risks</li>
      <li>Compliance with all food safety and health regulations</li>
      <li>Proper food handling, preparation, and storage</li>
      <li>Health permits and inspections</li>
    </ul>
    <p>Customers with food allergies, dietary restrictions, or health conditions must contact the Merchant directly before ordering. <strong>Ivamar AI LLC assumes no liability for illness, injury, allergic reaction, food poisoning, or any harm caused by Merchant products or services.</strong></p>

    <h2>8. AI Assistant Disclaimer</h2>
    <p>The AI assistant (IvA or custom-named) is trained on Merchant-provided information. Important limitations:</p>
    <ul>
      <li>Responses are generated automatically and may contain errors or outdated information</li>
      <li>Merchants are responsible for keeping their information current and accurate</li>
      <li>The AI assistant is not a substitute for professional advice (medical, legal, financial, or otherwise)</li>
      <li>Ivamar AI LLC is not responsible for inaccurate, incomplete, or misleading AI-generated responses</li>
    </ul>

    <h2>9. Payments & Tax Disclaimer</h2>
    <p><strong>Ivamar AI LLC is NOT a payment processor, merchant of record, or financial intermediary.</strong> We do not collect, hold, or receive any portion of payments made between customers and Merchants on our platform.</p>
    <p>ALL end-customer payments go 100% directly to the Merchant's chosen payment processor account (Stripe, ATH Móvil, PayPal, Square, or others). Ivamar AI LLC's only revenue is the monthly subscription fee paid by the Merchant.</p>
    <p><strong>Tax Responsibility:</strong> The Merchant is solely responsible for:</p>
    <ul>
      <li>Collecting applicable sales tax on their products and services</li>
      <li>Reporting and remitting all taxes to appropriate authorities (local, state, federal, international)</li>
      <li>Compliance with all tax laws in their jurisdiction</li>
    </ul>
    <p>Ivamar AI LLC has no tax obligations related to Merchant product sales and assumes no responsibility for Merchant tax compliance.</p>

    <h2>10. No Guarantee of Results</h2>
    <p>Ivamar AI LLC makes no guarantees about sales, customer traffic, conversions, or business results. The success of your business depends on many factors outside our control.</p>

    <h2>11. Intellectual Property</h2>
    <p>The Merchant retains ownership of all content they provide (logos, photos, menus, descriptions). Ivamar AI LLC retains full ownership of the platform, technology, code, templates, and AI systems. Merchants grant Ivamar AI LLC a non-exclusive license to display their content on our platform during the term of service.</p>

    <h2>12. Acceptable Use</h2>
    <p>You agree not to use our services for any illegal, fraudulent, harmful, or prohibited activities. We reserve the right to suspend or terminate service for violations.</p>

    <h2>13. Third-Party Services</h2>
    <p>Our platform integrates with third-party services (Stripe, WhatsApp, Anthropic, Render, etc.). Each has its own terms and privacy policies. Ivamar AI LLC is not responsible for the actions, policies, or services of third parties.</p>

    <h2>14. Platform Availability</h2>
    <p>Ivamar AI LLC provides its platform "as is" and "as available." We do not guarantee uninterrupted, error-free, or secure service. We are not liable for service interruptions, data loss, or technical failures beyond our reasonable control.</p>

    <h2>15. Limitation of Liability</h2>
    <p>Ivamar AI LLC's maximum total liability to any Merchant or customer is limited to the fees paid in the 3 months preceding the claim. Ivamar AI LLC is not liable for indirect, incidental, special, consequential, or punitive damages of any kind.</p>

    <h2>16. Indemnification</h2>
    <p>The Merchant agrees to indemnify, defend, and hold harmless Ivamar AI LLC, its officers, employees, and agents from any claims, damages, losses, or expenses (including attorney fees) arising from:</p>
    <ul>
      <li>Merchant's products, services, or business operations</li>
      <li>Merchant-provided content or content errors</li>
      <li>Merchant's tax obligations</li>
      <li>Customer disputes or complaints</li>
      <li>Violation of these terms or applicable laws</li>
    </ul>

    <h2>17. Governing Law & Disputes</h2>
    <p>These Terms are governed by the laws of the State of Delaware, United States of America. Any disputes will be resolved through binding arbitration under the American Arbitration Association (AAA) rules. Class action lawsuits are expressly waived.</p>

    <h2>18. Changes to Terms</h2>
    <p>Ivamar AI LLC reserves the right to update these Terms at any time. Material changes will be notified via WhatsApp or email. Continued use of our services constitutes acceptance of the updated Terms.</p>

    <h2>19. Contact</h2>
    <ul>
      <li>Company: Ivamar AI LLC</li>
      <li>Address: 8 The Green, Suite B, Dover, DE 19901, USA</li>
      <li>State of incorporation: Delaware, USA</li>
      <li>WhatsApp: +1 (863) 521-6708</li>
      <li>Email: connect@ivamarai.com</li>
      <li>Website: ivamarai.com</li>
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
