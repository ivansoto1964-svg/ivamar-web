const fs = require('fs');
let code = fs.readFileSync('src/server.js', 'utf8');

// 1. Add Stripe require near the top (after other requires)
const requireMarker = `const { getPlacePhoto } = require("./helpers/googlePhotos");`;
const requireAddition = `const { getPlacePhoto } = require("./helpers/googlePhotos");
const Stripe = require("stripe");
const stripe = process.env.STRIPE_SECRET_KEY ? Stripe(process.env.STRIPE_SECRET_KEY) : null;`;

if (code.includes(requireMarker)) {
  code = code.replace(requireMarker, requireAddition);
  console.log('✅ Stripe require agregado');
} else {
  console.log('❌ No encontré el require de googlePhotos para insertar Stripe cerca');
}

// 2. Replace the external call to ivamar-brain with direct Stripe call
const oldBilling = `  const siteUrl = \`\${req.protocol}://\${req.get("host")}\`;
  try {
    const out = await postJson(BILLING_API_URL, { plan: "setup-125", slug, businessName, ownerName, email, whatsapp, businessType, successUrl: \`\${siteUrl}/\${slug}\`, cancelUrl: \`\${siteUrl}/start\` }, { headers: { Authorization: \`Bearer \${BILLING_API_KEY}\` } });
    let data = null;
    try { data = out.body ? JSON.parse(out.body) : null; } catch (_) {}
    const checkoutUrl = data?.url || data?.checkoutUrl || data?.checkout_url;
    if (out.status >= 200 && out.status < 300 && checkoutUrl) return res.redirect(checkoutUrl);
  } catch (e) { console.error("Error checkout:", e.message); }

  return res.redirect(\`/\${slug}\`);
});`;

const newBilling = `  const siteUrl = \`\${req.protocol}://\${req.get("host")}\`;

  // Direct Stripe checkout — no longer depends on ivamar-brain
  if (stripe && email && email.includes("@")) {
    try {
      const customers = await stripe.customers.list({ email, limit: 1 });
      const customer = customers.data.length > 0
        ? customers.data[0]
        : await stripe.customers.create({ email, name: ownerName || undefined });

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer: customer.id,
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: \`Ivamar AI — \${businessName}\`,
                description: "Setup + Monthly subscription"
              },
              unit_amount: 4900, // $49.00/mo
              recurring: { interval: "month" }
            },
            quantity: 1
          }
        ],
        metadata: { slug, businessName, ownerName: ownerName || "", businessType: businessType || "" },
        success_url: \`\${siteUrl}/\${slug}\`,
        cancel_url: \`\${siteUrl}/start\`
      });

      if (session.url) return res.redirect(session.url);
    } catch (e) {
      console.error("Stripe checkout error:", e.message);
    }
  }

  return res.redirect(\`/\${slug}\`);
});`;

if (code.includes(oldBilling)) {
  code = code.replace(oldBilling, newBilling);
  console.log('✅ Billing migrado: ahora usa Stripe directamente sin depender de ivamar-brain');
} else {
  console.log('❌ No encontré el bloque de billing exacto - revisar manualmente');
}

fs.writeFileSync('src/server.js', code);
console.log('\n🎉 Archivo guardado');
