const crypto = require('crypto');

const DEFAULT_BATCH_SIZE = 50;

function campaignId(subject, message) {
  return crypto.createHash('sha256').update(`${String(subject || '').trim()}\n${String(message || '').trim()}`).digest('hex').slice(0,24);
}

function deliveredEmails(deliveries, id) {
  return new Set((deliveries || []).filter(item => item?.campaignId === id && item?.email).map(item => String(item.email).trim().toLowerCase()));
}

function nextBatch(recipients, deliveries, subject, message, size = DEFAULT_BATCH_SIZE) {
  const id = campaignId(subject,message);
  const sent = deliveredEmails(deliveries,id);
  const pending = (recipients || []).filter(person => !sent.has(String(person.email || '').trim().toLowerCase()));
  const batchSize = Math.max(1,Math.min(DEFAULT_BATCH_SIZE,Number(size) || DEFAULT_BATCH_SIZE));
  return {campaignId:id,batch:pending.slice(0,batchSize),remainingBefore:pending.length,totalRecipients:(recipients || []).length};
}

function recordDeliveries(deliveries, id, recipients, sentAt = new Date().toISOString()) {
  const result = Array.isArray(deliveries) ? deliveries.slice() : [];
  const existing = deliveredEmails(result,id);
  (recipients || []).forEach(person => {
    const email = String(person.email || '').trim().toLowerCase();
    if (!email || existing.has(email)) return;
    result.push({campaignId:id,email,sentAt});
    existing.add(email);
  });
  return result;
}

module.exports = {DEFAULT_BATCH_SIZE,campaignId,nextBatch,recordDeliveries};
