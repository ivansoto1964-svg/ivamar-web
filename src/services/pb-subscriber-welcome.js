const crypto = require('crypto');

const PB_SITE_URL = 'https://www.masboricuaqueunmofongo.com';
const PB_WELCOME_SUBJECT = '🇵🇷 ¡Wepa! Bienvenido a Planeta Boricua';

function normalizeSubscriberEmail(value) {
  return String(value || '').trim().toLowerCase();
}

function isValidSubscriberEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeSubscriberEmail(value));
}

function findSubscriber(subscribers, email) {
  const normalized = normalizeSubscriberEmail(email);
  return (Array.isArray(subscribers) ? subscribers : []).find(item => normalizeSubscriberEmail(item?.email) === normalized) || null;
}

function createSubscriberRecord(email, source, now = new Date()) {
  const timestamp = now.toISOString();
  return {
    email: normalizeSubscriberEmail(email),
    source,
    subscribedAt: timestamp,
    status: 'active',
    welcomeStatus: 'sending',
    welcomeAttemptedAt: timestamp
  };
}

function createUnsubscribeToken(email, secret) {
  const normalized = normalizeSubscriberEmail(email);
  if (!normalized || !secret) return '';
  const payload = Buffer.from(JSON.stringify({
    email: normalized,
    purpose: 'pb-subscriber-unsubscribe',
    v: 1
  })).toString('base64url');
  const signature = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

function verifyUnsubscribeToken(token, secret) {
  try {
    if (!secret) return '';
    const [payload, signature] = String(token || '').split('.');
    if (!payload || !signature) return '';
    const expected = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
    const actualBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expected);
    if (actualBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(actualBuffer, expectedBuffer)) return '';
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (data?.purpose !== 'pb-subscriber-unsubscribe' || data?.v !== 1) return '';
    return isValidSubscriberEmail(data.email) ? normalizeSubscriberEmail(data.email) : '';
  } catch (_) {
    return '';
  }
}

function unsubscribeUrl(email, secret) {
  const token = createUnsubscribeToken(email, secret);
  return token ? `${PB_SITE_URL}/suscripcion/salir/${encodeURIComponent(token)}` : '';
}

function welcomeEmail({ email, from, secret }) {
  const unsubscribe = unsubscribeUrl(email, secret);
  if (!unsubscribe) throw new Error('No se pudo crear el enlace de baja.');
  return {
    from,
    to: normalizeSubscriberEmail(email),
    subject: PB_WELCOME_SUBJECT,
    headers: {
      'List-Unsubscribe': `<${unsubscribe}>`,
      'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click'
    },
    html: `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;background:#f3f5f8;color:#263143;font-family:Arial,Helvetica,sans-serif"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f3f5f8"><tr><td align="center" style="padding:24px 12px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;background:#ffffff;border:1px solid #dfe5ed;border-radius:14px;overflow:hidden"><tr><td style="background:#002d62;padding:28px 24px;text-align:center"><div style="font-size:30px;line-height:1">🇵🇷</div><h1 style="margin:12px 0 4px;color:#ffffff;font-size:24px;line-height:1.25">¡Wepa! Bienvenido a Planeta Boricua</h1><p style="margin:0;color:#dce8f5;font-size:14px">Más Boricua Que Un Mofongo</p></td></tr><tr><td style="padding:28px 26px;font-size:16px;line-height:1.65"><p style="margin:0 0 18px">¡Wepa! Qué bueno tenerte por aquí. 🇵🇷</p><p style="margin:0 0 18px">Gracias por suscribirte a Planeta Boricua – Más Boricua Que Un Mofongo.</p><p style="margin:0 0 18px">Creamos este espacio para conectar a Puerto Rico con nuestra diáspora y mantener cerca todo eso que nos une: nuestra cultura, nuestros pueblos, nuestra comida, nuestras tradiciones, nuestra gente y las historias que muchas veces no llegan a otros medios.</p><p style="margin:0 0 18px">Aquí encontrarás historias de nuestros artesanos, actividades de la comunidad, cultura, gastronomía, curiosidades y esos pedacitos de Puerto Rico que aparecen dondequiera que haya un boricua.</p><p style="margin:0 0 18px">No importa si estás en la Isla o a miles de millas de ella. El corazón boricua cabe en una carry-on. 🇵🇷❤️</p><p style="margin:0 0 18px">Gracias por formar parte de esta comunidad.</p><p style="margin:0 0 24px"><strong style="color:#002d62">Si es de Puerto Rico, encuéntralo en Planeta Boricua. 🇵🇷</strong></p><p style="margin:0">Un abrazo boricua,<br><strong>Iván Soto Pino</strong><br>Planeta Boricua – Más Boricua Que Un Mofongo</p></td></tr><tr><td style="border-top:4px solid #ce1126;background:#f7f8fa;padding:18px 22px;text-align:center;color:#687386;font-size:12px;line-height:1.5"><p style="margin:0 0 7px">Recibiste este correo porque te suscribiste en Planeta Boricua.</p><p style="margin:0"><a href="${unsubscribe}" style="color:#002d62;text-decoration:underline">Darse de baja</a> &nbsp;·&nbsp; <a href="${PB_SITE_URL}/privacidad-boricua" style="color:#002d62;text-decoration:underline">Privacidad</a></p></td></tr></table></td></tr></table></body></html>`
  };
}

module.exports = {
  PB_WELCOME_SUBJECT,
  normalizeSubscriberEmail,
  isValidSubscriberEmail,
  findSubscriber,
  createSubscriberRecord,
  createUnsubscribeToken,
  verifyUnsubscribeToken,
  unsubscribeUrl,
  welcomeEmail
};
