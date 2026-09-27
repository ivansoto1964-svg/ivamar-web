const fs = require('fs');
const path = require('path');

const LEGACY_DESTINATION = /(?:amazon\.com\/shop\/planetaboricua|amzn\.to|booking\.tpo\.lu|trip\.tpo\.lu|kiwi\.tpo\.lu|us\.trip\.com)/i;
const LEGACY_COPY = /(?:🛍️\s*Tienda\s+(?:Boricua|PB)|Ver productos boricuas en Amazon|¿Vas a viajar a Puerto Rico(?: o el Caribe)?\s*\??|Encuentra las mejores tarifas para tu próximo viaje|Planifica tu próximo viaje desde Planeta Boricua)/i;

function cleanLegacyCommercialHtml(html) {
  return String(html || '')
    .replace(/<p\b[^>]*>[\s\S]*?<\/p>/gi, block => (
      LEGACY_DESTINATION.test(block) || LEGACY_COPY.test(block) ? '' : block
    ))
    .replace(/(?:\s*<hr\s*\/?>\s*){2,}/gi, '<hr />')
    .trim();
}

function atomicWriteJson(target, value) {
  const temporary = `${target}.${process.pid}.tmp`;
  fs.writeFileSync(temporary, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  fs.renameSync(temporary, target);
}

function backupFile(source, backupDirectory) {
  fs.mkdirSync(backupDirectory, { recursive:true });
  const destination = path.join(backupDirectory, path.basename(source));
  if (!fs.existsSync(destination)) fs.copyFileSync(source, destination);
}

function cleanBlogDirectory(postsDirectory, backupDirectory) {
  if (!fs.existsSync(postsDirectory)) return 0;
  let changed = 0;
  for (const filename of fs.readdirSync(postsDirectory).filter(name => name.endsWith('.json'))) {
    const target = path.join(postsDirectory, filename);
    let post;
    try { post = JSON.parse(fs.readFileSync(target, 'utf8')); } catch (_) { continue; }
    const original = String(post.content || '');
    const cleaned = cleanLegacyCommercialHtml(original);
    if (cleaned === original) continue;
    backupFile(target, backupDirectory);
    post.content = cleaned;
    atomicWriteJson(target, post);
    changed += 1;
  }
  return changed;
}

function cleanLatestFile(latestFile, backupDirectory) {
  if (!fs.existsSync(latestFile)) return 0;
  let items;
  try { items = JSON.parse(fs.readFileSync(latestFile, 'utf8')); } catch (_) { return 0; }
  if (!Array.isArray(items)) return 0;
  let changed = 0;
  for (const item of items) {
    const original = String(item.body || '');
    const cleaned = cleanLegacyCommercialHtml(original);
    if (cleaned === original) continue;
    item.body = cleaned;
    changed += 1;
  }
  if (changed) {
    backupFile(latestFile, backupDirectory);
    atomicWriteJson(latestFile, items);
  }
  return changed;
}

module.exports = { cleanLegacyCommercialHtml, cleanBlogDirectory, cleanLatestFile };
