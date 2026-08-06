// NotificationService — decoupled dispatcher. The assistant only creates a lead;
// this decides which channel(s) to use and logs the result.
const fs = require('fs');
const path = require('path');
const { sendEmail, buildLeadEmailHtml } = require('./providers/emailProvider');
const { sendWhatsApp, buildLeadWhatsAppText } = require('./providers/whatsappProvider');

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
function wasRecentlySent(businessId, phone) {
  try {
    const logFile = path.join(LOG_DIR, `${businessId}.json`);
    if (!fs.existsSync(logFile)) return false;
    const log = JSON.parse(fs.readFileSync(logFile, 'utf8'));
    const fiveMinAgo = Date.now() - 5 * 60 * 1000;
    return log.some(entry =>
      entry.phone === phone &&
      entry.status === 'sent' &&
      new Date(entry.date).getTime() > fiveMinAgo
    );
  } catch (e) {
    return false;
  }
}

async function sendLeadNotification(lead, business) {
  const businessId = business.slug || business.name || 'unknown';
  const preferences = business.notificationPreferences || ['email'];
  const results = [];

  if (wasRecentlySent(businessId, lead.phone)) {
    console.log(`Duplicate lead skipped for ${businessId} / ${lead.phone}`);
    return [{ ok: true, channel: 'none', skipped: true, reason: 'duplicate' }];
  }

  const emailDestination = business.notifyLeadDirectly ? lead.email : business.ownerEmail;
  const whatsappDestination = business.notifyLeadDirectly ? lead.phone : business.ownerWhatsApp;

  if (preferences.includes('email') && emailDestination) {
    const result = await sendEmail({
      to: emailDestination,
      subject: `📲 Nuevo Lead — ${business.name || businessId}`,
      html: buildLeadEmailHtml(lead, business)
    });
    logNotification(businessId, { channel: 'email', status: result.ok ? 'sent' : 'failed', error: result.error || null, phone: lead.phone });
    results.push(result);
  }

  if (preferences.includes('whatsapp') && whatsappDestination) {
    const result = await sendWhatsApp({
      to: whatsappDestination,
      text: buildLeadWhatsAppText(lead, business)
    });
    logNotification(businessId, { channel: 'whatsapp', status: result.ok ? 'sent' : 'failed', error: result.error || null, phone: lead.phone });
    results.push(result);
  }

  return results;
}

module.exports = { sendLeadNotification };
