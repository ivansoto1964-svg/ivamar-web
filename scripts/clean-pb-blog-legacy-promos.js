const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '..', 'data', 'pb-blog', 'posts');
const legacyDestination = /(?:amazon\.com\/shop\/planetaboricua|amzn\.to|booking\.tpo\.lu|trip\.tpo\.lu|kiwi\.tpo\.lu|us\.trip\.com)/i;
const legacyCopy = /(?:🛍️\s*Tienda\s+(?:Boricua|PB)|Ver productos boricuas en Amazon|¿Vas a viajar a Puerto Rico(?: o el Caribe)?\s*\??|Encuentra las mejores tarifas para tu próximo viaje|Planifica tu próximo viaje desde Planeta Boricua)/i;

let changed = 0;

for (const filename of fs.readdirSync(postsDir).filter(name => name.endsWith('.json'))) {
  const target = path.join(postsDir, filename);
  const post = JSON.parse(fs.readFileSync(target, 'utf8'));
  const original = String(post.content || '');
  const cleaned = original
    .replace(/<p\b[^>]*>[\s\S]*?<\/p>/gi, block => (
      legacyDestination.test(block) || legacyCopy.test(block) ? '' : block
    ))
    .replace(/(?:\s*<hr\s*\/?>\s*){2,}/gi, '<hr />')
    .trim();

  if (cleaned === original) continue;
  post.content = cleaned;
  fs.writeFileSync(target, `${JSON.stringify(post, null, 2)}\n`, 'utf8');
  changed += 1;
}

console.log(`Cleaned legacy commercial blocks from ${changed} El Balcón posts.`);
