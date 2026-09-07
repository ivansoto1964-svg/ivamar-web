const crypto = require('crypto');

const DEFAULT_BATCH_SIZE = 50;

function normalizeEmail(value) {
  return String(value || '')
    .normalize('NFKC')
    .replace(/[\s\u200B-\u200D\u2060\uFEFF]/g,'')
    .toLowerCase();
}

function isValidEmail(value) {
  const email = normalizeEmail(value);
  const parts = email.split('@');
  if (parts.length !== 2 || !parts[0] || !parts[1] || email.length > 254) return false;
  const [local,domain] = parts;
  if (local.length > 64 || local.startsWith('.') || local.endsWith('.') || local.includes('..')) return false;
  if (!/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local)) return false;
  const labels = domain.split('.');
  if (labels.length < 2) return false;
  return labels.every(label => label.length > 0 && label.length <= 63 && /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(label));
}

function campaignId(subject, message) {
  return crypto.createHash('sha256').update(`${String(subject || '').trim()}\n${String(message || '').trim()}`).digest('hex').slice(0,24);
}

function deliveredEmails(deliveries, id) {
  return new Set((deliveries || []).filter(item => item?.campaignId === id && item?.email).map(item => normalizeEmail(item.email)));
}

function nextBatch(recipients, deliveries, subject, message, size = DEFAULT_BATCH_SIZE) {
  const id = campaignId(subject,message);
  const sent = deliveredEmails(deliveries,id);
  const seen = new Set();
  const normalizedRecipients = (recipients || []).map(person => ({...person,email:normalizeEmail(person?.email)}));
  const pending = normalizedRecipients.filter(person => {
    if (!isValidEmail(person.email) || seen.has(person.email) || sent.has(person.email)) return false;
    seen.add(person.email);
    return true;
  });
  const batchSize = Math.max(1,Math.min(DEFAULT_BATCH_SIZE,Number(size) || DEFAULT_BATCH_SIZE));
  return {campaignId:id,batch:pending.slice(0,batchSize),remainingBefore:pending.length,totalRecipients:(recipients || []).length};
}

function recordDeliveries(deliveries, id, recipients, sentAt = new Date().toISOString()) {
  const result = Array.isArray(deliveries) ? deliveries.slice() : [];
  const existing = deliveredEmails(result,id);
  (recipients || []).forEach(person => {
    const email = normalizeEmail(person?.email);
    if (!email || existing.has(email)) return;
    result.push({campaignId:id,email,sentAt});
    existing.add(email);
  });
  return result;
}

module.exports = {DEFAULT_BATCH_SIZE,normalizeEmail,isValidEmail,campaignId,nextBatch,recordDeliveries};
