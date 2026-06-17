const fs = require('fs');
let code = fs.readFileSync('src/server.js', 'utf8');

const oldEmailBlock = `  // Handle email capture
  if (email && email.includes('@')) {
    try {
      await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'api-key': process.env.BREVO_API_KEY },
        body: JSON.stringify({ email, listIds: [4], updateEnabled: true, attributes: { SOURCE: 'nayeli-chat' } })
      });
      await resend.emails.send({
        from: 'Planeta Boricua <connect@ivamarai.com>',
        to: 'connect@ivamarai.com',
        subject: '🇵🇷 Nayeli capturó email: ' + email,
        html: '<p>Email capturado por Nayeli: <strong>' + email + '</strong></p>'
      });
      await resend.emails.send({
        from: 'Nayeli — Planeta Boricua <connect@ivamarai.com>',
        to: email,
        subject: '🇵🇷 Nayeli te envía tu resumen de Planeta Boricua',
        html: \`<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#002D62,#CE1126);padding:2rem;text-align:center;border-radius:12px 12px 0 0;">
            <h1 style="color:#fff;font-size:1.4rem;margin:0">🇵🇷 Tu resumen de Planeta Boricua</h1>
            <p style="color:rgba(255,255,255,0.8);font-size:0.85rem;margin-top:0.5rem;">De parte de Nayeli</p>
          </div>
          <div style="padding:2rem;background:#fff;border:1px solid #e5e5e0;">
            <p style="font-size:0.95rem;color:#333;">¡Wepa! Aquí tienes los recursos más útiles de Planeta Boricua:</p>
            <div style="margin:1.5rem 0;">
              <a href="https://www.masboricuaqueunmofongo.com/mudarse-de-pr" style="display:block;background:#002D62;color:#fff;padding:0.8rem 1.2rem;border-radius:6px;text-decoration:none;font-weight:700;margin-bottom:0.8rem;">🇺🇸 Guía: Mudarse de PR a USA →</a>
              <a href="https://www.masboricuaqueunmofongo.com/regresar-a-pr" style="display:block;background:#CE1126;color:#fff;padding:0.8rem 1.2rem;border-radius:6px;text-decoration:none;font-weight:700;margin-bottom:0.8rem;">🇵🇷 Guía: Regresar a Puerto Rico →</a>
              <a href="https://www.masboricuaqueunmofongo.com/recursos" style="display:block;background:#444;color:#fff;padding:0.8rem 1.2rem;border-radius:6px;text-decoration:none;font-weight:700;">📋 Centro de Recursos Completo →</a>
            </div>
            <p style="font-size:0.85rem;color:#666;">También te suscribimos al newsletter de Planeta Boricua. Puedes cancelar cuando quieras.</p>
          </div>
          <div style="padding:1rem;text-align:center;background:#f5f5f0;border-radius:0 0 12px 12px;">
            <p style="font-size:0.72rem;color:#999;">© 2026 Planeta Boricua · masboricuaqueunmofongo.com · Un proyecto de Ivamar AI LLC</p>
          </div>
        </div>\`
      });
    } catch(e) { console.error('Nayeli email error:', e.message); }
    return res.json({ reply: '¡Perfecto! Anotado 📨 Te acabo de enviar un email con todos los recursos y links útiles. Ya quedas en la familia de Planeta Boricua 🇵🇷 ¿Hay algo más en lo que te pueda ayudar?' });
  }`;

const newEmailBlock = `  // Handle email capture
  if (email && email.includes('@')) {
    try {
      await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'api-key': process.env.BREVO_API_KEY },
        body: JSON.stringify({ email, listIds: [4], updateEnabled: true, attributes: { SOURCE: 'nayeli-chat' } })
      });
      await resend.emails.send({
        from: 'Planeta Boricua <connect@ivamarai.com>',
        to: 'connect@ivamarai.com',
        subject: '🇵🇷 Nayeli capturó email: ' + email,
        html: '<p>Email capturado por Nayeli: <strong>' + email + '</strong></p><p>Historial: ' + JSON.stringify(history).slice(0, 500) + '</p>'
      });

      // Generate personalized summary using Claude based on conversation history
      let summaryHtml = '';
      let relevantLinks = [];
      try {
        const Anthropic = require('@anthropic-ai/sdk');
        const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
        const convoText = history.map(h => (h.role === 'user' ? 'Usuario: ' : 'Nayeli: ') + h.content).join('\\n');

        const summaryPrompt = \`Basándote en esta conversación entre un usuario y Nayeli (asistente de Planeta Boricua), genera un resumen breve en español boricua (2-3 oraciones, tono cálido y personal) de lo que se habló, dirigido directamente al usuario como si fuera un email. NO uses saludos genéricos, ve directo al resumen. Conversación:\\n\\n\${convoText}\\n\\nResponde SOLO con el resumen, sin preámbulo.\`;

        const summaryRes = await client.messages.create({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 300,
          messages: [{ role: 'user', content: summaryPrompt }]
        });
        summaryHtml = summaryRes.content[0].text;

        // Determine relevant links based on conversation content
        const fullText = convoText.toLowerCase();
        if (fullText.includes('regresar') || fullText.includes('volver a pr') || fullText.includes('usa a pr') || fullText.includes('a la isla')) {
          relevantLinks.push({ url: 'https://www.masboricuaqueunmofongo.com/regresar-a-pr', label: '🇵🇷 Guía: Regresar a Puerto Rico →', color: '#CE1126' });
        }
        if (fullText.includes('mudar') && (fullText.includes('usa') || fullText.includes('estados unidos') || fullText.includes('florida') || fullText.includes('texas') || fullText.includes('nueva york'))) {
          relevantLinks.push({ url: 'https://www.masboricuaqueunmofongo.com/mudarse-de-pr', label: '🇺🇸 Guía: Mudarse de PR a USA →', color: '#002D62' });
        }
        if (relevantLinks.length === 0) {
          relevantLinks.push({ url: 'https://www.masboricuaqueunmofongo.com/recursos', label: '📋 Centro de Recursos Completo →', color: '#444' });
        }
      } catch(e) {
        console.error('Summary generation error:', e.message);
        summaryHtml = '¡Wepa! Aquí tienes los recursos más útiles de Planeta Boricua para lo que estás bregando.';
        relevantLinks = [{ url: 'https://www.masboricuaqueunmofongo.com/recursos', label: '📋 Centro de Recursos Completo →', color: '#444' }];
      }

      const linksHtml = relevantLinks.map(l =>
        '<a href="' + l.url + '" style="display:block;background:' + l.color + ';color:#fff;padding:0.8rem 1.2rem;border-radius:6px;text-decoration:none;font-weight:700;margin-bottom:0.8rem;">' + l.label + '</a>'
      ).join('') + '<a href="https://www.masboricuaqueunmofongo.com/recursos" style="display:block;background:#444;color:#fff;padding:0.8rem 1.2rem;border-radius:6px;text-decoration:none;font-weight:700;">📋 Ver Centro de Recursos Completo →</a>';

      await resend.emails.send({
        from: 'Nayeli — Planeta Boricua <connect@ivamarai.com>',
        to: email,
        subject: '🇵🇷 Nayeli te envía tu resumen de Planeta Boricua',
        html: \`<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#002D62,#CE1126);padding:2rem;text-align:center;border-radius:12px 12px 0 0;">
            <img src="https://www.masboricuaqueunmofongo.com/img/nayeli.jpg" alt="Nayeli" style="width:90px;height:90px;border-radius:50%;object-fit:cover;object-position:top;border:3px solid #fff;margin-bottom:0.8rem;">
            <h1 style="color:#fff;font-size:1.3rem;margin:0">🇵🇷 Tu resumen de Planeta Boricua</h1>
            <p style="color:rgba(255,255,255,0.8);font-size:0.85rem;margin-top:0.3rem;">De parte de Nayeli</p>
          </div>
          <div style="padding:2rem;background:#fff;border:1px solid #e5e5e0;">
            <p style="font-size:0.95rem;color:#333;line-height:1.6;">\${summaryHtml}</p>
            <div style="margin:1.5rem 0;">
              \${linksHtml}
            </div>
            <p style="font-size:0.85rem;color:#666;">También te suscribimos al newsletter de Planeta Boricua para que no te pierdas nada boricua. Puedes cancelar cuando quieras.</p>
          </div>
          <div style="padding:1rem;text-align:center;background:#f5f5f0;border-radius:0 0 12px 12px;">
            <p style="font-size:0.72rem;color:#999;">© 2026 Planeta Boricua · masboricuaqueunmofongo.com · Un proyecto de Ivamar AI LLC</p>
          </div>
        </div>\`
      });
    } catch(e) { console.error('Nayeli email error:', e.message); }
    return res.json({ reply: '¡Perfecto! Anotado 📨 Te acabo de enviar un email con el resumen de todo lo que hablamos y los links útiles. Ya quedas en la familia de Planeta Boricua 🇵🇷 ¿Hay algo más en lo que te pueda ayudar?' });
  }`;

if (code.includes(oldEmailBlock)) {
  code = code.replace(oldEmailBlock, newEmailBlock);
  fs.writeFileSync('src/server.js', code);
  console.log('✅ Listo - email actualizado con foto y resumen personalizado');
} else {
  console.log('❌ No encontré el bloque exacto');
}
