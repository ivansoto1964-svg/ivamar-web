// WhatsAppNotificationProvider — sends a lead notification via Twilio WhatsApp
const twilio = require('twilio');

function buildLeadWhatsAppText(lead, business) {
  return `📲 *Nuevo Lead — ${business.name || 'Tu Negocio'}*\n\n` +
    `*Nombre:* ${lead.customerName || 'N/A'}\n` +
    `*Teléfono:* ${lead.phone || 'N/A'}\n` +
    `*Email:* ${lead.email || 'N/A'}\n` +
    `*Interés:* ${lead.service || 'N/A'}\n` +
    (lead.photo ? `*Foto:* ${lead.photo}\n` : '') +
    `*Resumen:* ${lead.summary || 'N/A'}`;
}

async function sendWhatsApp({ to, text }) {
  try {
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    const fromNumber = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886';
    let cleanTo = to.replace('whatsapp:', '').replace(/[^\d+]/g, '');
    if (!cleanTo.startsWith('+')) {
      cleanTo = cleanTo.length === 10 ? '+1' + cleanTo : '+' + cleanTo;
    }
    const toNumber = `whatsapp:${cleanTo}`;

    const message = await client.messages.create({
      from: fromNumber,
      to: toNumber,
      body: text
    });

    return { ok: true, channel: 'whatsapp', sid: message.sid };
  } catch (e) {
    console.error('WhatsAppNotificationProvider error:', e.message);
    return { ok: false, channel: 'whatsapp', error: e.message };
  }
}

module.exports = { sendWhatsApp, buildLeadWhatsAppText };
