// NotificationService — decoupled dispatcher. The assistant only creates a lead;
// this decides which channel(s) to use and logs the result.
const fs = require('fs');
const path = require('path');
const { sendEmail, buildLeadEmailHtml } = require('./providers/emailProvider');

const LOG_DIR = '/data/notifications-log';

function logNotification(businessId, entry) {
  try {
    if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });
    const logFile = path.join(LOG_DIR, `${businessId}.json`);
    let log = [];
    if (fs.existsSync(logFile)) log = JSON.parse(fs.readFileSync(logFile, 'utf8'));
    log.push({ ...entry, date: new Date().toISOString() });
    fs.writeFileSync(logFile, JSON.stringify(log, null, 2));
  } catch (e) {
    console.error('NotificationService log error:', e.message);
  }
}

// business = the parsed business JSON (data/businesses/{slug}.json)
// lead = { customerName, phone, email, service, summary }
async function sendLeadNotification(lead, business) {
  const businessId = business.slug || business.name || 'unknown';
  const preferences = business.notificationPreferences || ['email'];
  const results = [];

  if (preferences.includes('email') && business.ownerEmail) {
    const result = await sendEmail({
      to: business.ownerEmail,
      subject: `📲 Nuevo Lead — ${business.name || businessId}`,
      html: buildLeadEmailHtml(lead, business)
    });
    logNotification(businessId, { channel: 'email', status: result.ok ? 'sent' : 'failed', error: result.error || null });
    results.push(result);
  }

  // WhatsApp provider will be plugged in here in Etapa 3 — no changes needed
  // to this function's callers when that happens.
  if (preferences.includes('whatsapp') && business.ownerWhatsApp) {
    // placeholder until Etapa 3
    logNotification(businessId, { channel: 'whatsapp', status: 'skipped', error: 'WhatsApp provider not yet implemented' });
  }

  return results;
}

module.exports = { sendLeadNotification };
