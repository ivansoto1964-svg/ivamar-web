// EmailNotificationProvider — sends a lead notification email via Resend
const { Resend } = require('resend');

async function sendEmail({ to, subject, html }) {
  try {
    const resendClient = new Resend(process.env.RESEND_API_KEY);
    await resendClient.emails.send({
      from: 'Ivamar AI <connect@ivamarai.com>',
      to: [to],
      subject,
      html
    });
    return { ok: true, channel: 'email' };
  } catch (e) {
    console.error('EmailNotificationProvider error:', e.message);
    return { ok: false, channel: 'email', error: e.message };
  }
}

function buildLeadEmailHtml(lead, business) {
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#0077B6;padding:1.5rem;border-radius:8px 8px 0 0;">
        <h2 style="color:#fff;margin:0;">📲 Nuevo Lead — ${business.name || 'Tu Negocio'}</h2>
      </div>
      <div style="padding:1.5rem;border:1px solid #eee;">
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Nombre</td><td style="padding:8px;border:1px solid #ddd">${lead.customerName || 'N/A'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Teléfono</td><td style="padding:8px;border:1px solid #ddd">${lead.phone || 'N/A'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${lead.email || 'N/A'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Interés</td><td style="padding:8px;border:1px solid #ddd">${lead.service || 'N/A'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Resumen</td><td style="padding:8px;border:1px solid #ddd">${lead.summary || 'N/A'}</td></tr>
        </table>
      </div>
    </div>
  `;
}

module.exports = { sendEmail, buildLeadEmailHtml };
