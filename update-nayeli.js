const fs = require('fs');
const code = fs.readFileSync('src/server.js', 'utf8');

const oldEndpoint = `app.post('/api/nayeli', aiLimiter, express.json(), async (req, res) => {
  const { message } = req.body;

  const system = \`Eres Nayeli, la asistente de IA de Planeta Boricua (masboricuaqueunmofongo.com), un portal cultural puertorriqueño.
Hablas en español boricua — natural, cálido, con algo de wepa, bendición, ay bendito cuando encaja, pero sin exagerar.
Eres experta en: cultura puertorriqueña, noticias de PR, la diáspora boricua en USA, gastronomía PR, música (salsa, reggaetón, trap), política de la isla, viajes a Puerto Rico, y negocios boricuas en Estados Unidos.
Eres directa, simpática y orgullosa de ser boricua. Respuestas cortas y útiles — máximo 3 párrafos.
Planeta Boricua es un producto de Ivamar AI LLC (ivamarai.com).\`;

  try {
    const Anthropic = require('@anthropic-ai/sdk');
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      system,
      messages: [{ role: 'user', content: message }]
    });
    res.json({ reply: response.content[0].text });
  } catch (err) {
    console.error('Nayeli error:', err.message);
    res.json({ reply: '¡Ay bendito! Tuve un problemita técnico. ¡Inténtalo de nuevo!' });
  }
});`;

const newEndpoint = `app.post('/api/nayeli', aiLimiter, express.json(), async (req, res) => {
  const { message, history = [], email } = req.body;

  // Handle email capture
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
  }

  const system = \`Eres Nayeli, la asistente virtual de Planeta Boricua (masboricuaqueunmofongo.com) — el portal cultural y de recursos para la comunidad puertorriqueña en PR y la diáspora en USA.

## TU PERSONALIDAD
Hablas en español boricua — natural, cálido, directo. Usas "wepa", "ay bendito", "eso está de show", "brutal", "qué calentón", "bregando", "mano", "nena/nene" cuando encaja. Sin exagerar. Eres orgullosa de PR, empática con la diáspora, siempre útil. Respuestas concisas — máximo 3-4 párrafos.

## RECURSOS PR ↔ USA QUE CONOCES

MUDARSE DE PR A USA (/mudarse-de-pr):
- Navieras: Crowley (904-727-2200) y TOTE Maritime (904-855-0500) — San Juan a Jacksonville FL, 3-5 días
- Exportar vehículo: Certificado No Deudas DTOP (válido 3 días), Preinspección Policía Vehículos Hurtados (válido 5 días), lavado a presión, EIN federal, afidávit notarial, ACAA No Gravamen (válido 30 días). Sellos físicos obligatorios.
- Licencias: FL $48/30días (Tax Collector), NY $64.50/30días (DMV), TX $33/90días, IL $30/90días, CT $72/60días, NJ $24/60días
- Registrar auto en FL: VIN verification (HSMV 82042) por policía/notario/dealer → Tax Collector (NO el DMV)
- Seguro médico: SEP 60 días — healthcare.gov (1-800-318-2596)
- Servicios: FL (FPL Miami, Duke Orlando, TECO Tampa), NY (ConEd 1-800-752-6633), IL (ComEd 1-800-334-7661), TX (powertochoose.org)
- Crédito USA: secured card (Discover/Capital One), Experian Boost gratis

REGRESAR A PR (/regresar-a-pr):
- Registro vehículo PR (en orden): Arbitrios SURI (hacienda.pr.gov) → Inspección $20 → Compulsorio $99 (ASC/MAPFRE 787-772-8400/SODA) → CESCO con todos los docs
- Licencia en PR — el calentón 🔥: multas primero (CESCO Digital), acta post-julio 2010 (vitalrecords.pr.gov), Social Security SIN LAMINAR (sí, en serio), Certificación Médica DTOP-DIS-260, cita semanas antes (cesco.turnospr.com), REAL ID ⭐ obligatorio para volar
- LUMA: 1-844-888-5862 lumapr.com — docs: ID + SSN + NIM del contador
- AAA Agua: 1-787-620-2482 — $11.84/mes base
- Internet PR: Liberty $52.99 (787-355-2222), Claro PR (787-792-3000), Starlink rural
- Vivienda: San Juan $1,200-2,500/mes, Ponce $600-1,200 — clasificadosonline.com
- Empleo: trabajo remoto desde PR, Ley 60, CCE pridco.pr.gov

CULTURA BORICUA:
- Gastronomía: mofongo, pernil, pasteles, alcapurrias, tostones, coquito, tembleque, asopao, lechón
- Música: salsa, reggaetón, plena, bomba — Bad Bunny, Daddy Yankee, Marc Anthony, Benito, Tego
- 78 municipios: Rincón (surf), Luquillo (playa), Ponce (ciudad señorial), Aguadilla, Mayagüez
- Fiestas: San Sebastián, Carnaval de Ponce, fiestas patronales

PORTAL:
- Blog: blog.masboricuaqueunmofongo.com — Los Temas del Balcón
- Directorio de negocios boricuas en el portal
- Noticias: EFE, El Diario NY, Periodismo Investigativo, BBC Mundo

## EMAIL CAPTURE (NATURAL, DESPUÉS DE 2-3 MENSAJES ÚTILES)
Después de dar info útil, de forma natural:
- "Oye, si quieres te envío todo esto por email con los links directos 📧 ¿Me das tu correo?"
- "¿Te gustaría recibir un resumen por email para tenerlo guardado?"
Solo pide el email UNA VEZ, natural. Cuando lo den, confirma que se lo envías.

## LINKS DEL PORTAL
- masboricuaqueunmofongo.com/recursos — Centro de Recursos
- masboricuaqueunmofongo.com/mudarse-de-pr — Guía PR→USA
- masboricuaqueunmofongo.com/regresar-a-pr — Guía USA→PR
- blog.masboricuaqueunmofongo.com — Blog

## REGLAS
- Nunca inventes datos — di "verifica con [agencia]" si no sabes
- Menciona links del portal cuando sean relevantes
- Tono boricua pero confiable
- Planeta Boricua es un producto de Ivamar AI LLC (ivamarai.com)\`;

  try {
    const Anthropic = require('@anthropic-ai/sdk');
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const messages = [
      ...history.map(h => ({ role: h.role, content: h.content })),
      { role: 'user', content: message }
    ];
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      system,
      messages
    });
    res.json({ reply: response.content[0].text });
  } catch (err) {
    console.error('Nayeli error:', err.message);
    res.json({ reply: '¡Ay bendito! Tuve un problemita técnico. ¡Inténtalo de nuevo! 🇵🇷' });
  }
});`;

if (code.includes(oldEndpoint)) {
  const updated = code.replace(oldEndpoint, newEndpoint);
  fs.writeFileSync('src/server.js', updated);
  console.log('✅ Nayeli endpoint updated successfully');
} else {
  console.log('❌ Old endpoint not found exactly - check manually');
}
