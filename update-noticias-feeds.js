const fs = require('fs');
let code = fs.readFileSync('src/server.js', 'utf8');

// 1. Update feeds list - add Telemundo stations
const oldFeeds = `      { url: 'https://www.wfla.com/tampa-hoy/feed/', source: 'Tampa Hoy', categoria: 'Florida' }
    ];`;

const newFeeds = `      { url: 'https://www.wfla.com/tampa-hoy/feed/', source: 'Tampa Hoy', categoria: 'Florida' },
      { url: 'https://www.telemundo51.com/feed/', source: 'Telemundo Miami', categoria: 'Florida' },
      { url: 'https://www.telemundo47.com/feed/', source: 'Telemundo Nueva York', categoria: 'Nueva York' },
      { url: 'https://www.telemundochicago.com/feed/', source: 'Telemundo Chicago', categoria: 'Illinois' },
      { url: 'https://www.telemundo52.com/feed/', source: 'Telemundo Los Angeles', categoria: 'California' }
    ];`;

if (code.includes(oldFeeds)) {
  code = code.replace(oldFeeds, newFeeds);
  console.log('✅ Telemundo feeds agregados');
} else {
  console.log('❌ No encontré el bloque de feeds');
}

// 2. Fix the RSS parser - better image extraction + clean Google News HTML + handle no-image gracefully
const oldParser = `      const r = await fetch(feed.url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const xml = await r.text();
      const items = [];
      const itemRegex = /<item>([\\s\\S]*?)<\\/item>/g;
      let match;
      while ((match = itemRegex.exec(xml)) !== null && items.length < 3) {
        const item = match[1];
        const title = (item.match(/<title><!\\[CDATA\\[(.*?)\\]\\]><\\/title>/) || item.match(/<title>(.*?)<\\/title>/))?.[1] || '';
        const link = (item.match(/<link>(.*?)<\\/link>/) || item.match(/<link[^>]*href="([^"]*)"/)) ?.[1] || '#';
        const pubDate = (item.match(/<pubDate>(.*?)<\\/pubDate>/))?.[1] || '';
        const desc = (item.match(/<description><!\\[CDATA\\[(.*?)\\]\\]><\\/description>/) || item.match(/<description>(.*?)<\\/description>/))?.[1] || '';
        const cleanDesc = desc.replace(/<[^>]+>/g, '').replace(/https?:\\/\\/\\S+/g, '').trim();
        const summary = cleanDesc.length > 10 ? cleanDesc.slice(0, 120) + '...' : '';
        const date = pubDate ? new Date(pubDate).toLocaleDateString('es-PR', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
        const imgMatch = item.match(/<img[^>]+src=["']([^"']+)["']/i);
        const img = imgMatch ? imgMatch[1] : null;
        const tag = feed.categoria;
        if (title) items.push({ title: title.trim(), link: link.trim(), date, summary, img, source: feed.source, categoria: tag });
      }
      return items;`;

const newParser = `      const r = await fetch(feed.url, { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(5000) });
      const xml = await r.text();
      const items = [];
      const itemRegex = /<item>([\\s\\S]*?)<\\/item>/g;
      let match;
      while ((match = itemRegex.exec(xml)) !== null && items.length < 3) {
        const item = match[1];
        // Clean title - strip HTML tags
        let title = (item.match(/<title><!\\[CDATA\\[(.*?)\\]\\]><\\/title>/) || item.match(/<title>(.*?)<\\/title>/))?.[1] || '';
        title = title.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#124;/g, '|').trim();
        // Clean link - for Google News get the actual article URL
        let link = (item.match(/<link>(.*?)<\\/link>/) || item.match(/<guid[^>]*>(.*?)<\\/guid>/) || item.match(/<link[^>]*href="([^"]*)"/)) ?.[1] || '#';
        link = link.replace(/<!\\[CDATA\\[|\\]\\]>/g, '').trim();
        const pubDate = (item.match(/<pubDate>(.*?)<\\/pubDate>/))?.[1] || '';
        const desc = (item.match(/<description><!\\[CDATA\\[(.*?)\\]\\]><\\/description>/) || item.match(/<description>(.*?)<\\/description>/))?.[1] || '';
        const cleanDesc = desc.replace(/<[^>]+>/g, '').replace(/https?:\\/\\/\\S+/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
        const summary = cleanDesc.length > 10 ? cleanDesc.slice(0, 150) + '...' : '';
        const date = pubDate ? new Date(pubDate).toLocaleDateString('es-PR', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
        // Try multiple image sources
        const imgMatch = 
          item.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/i) ||
          item.match(/<media:content[^>]+url=["']([^"']+)["']/i) ||
          item.match(/<enclosure[^>]+url=["']([^"']+\\.(?:jpg|jpeg|png|webp)[^"']*)["']/i) ||
          item.match(/<img[^>]+src=["']([^"']+)["']/i);
        const img = imgMatch ? imgMatch[1] : null;
        const tag = feed.categoria;
        if (title && title.length > 5) items.push({ title, link, date, summary, img, source: feed.source, categoria: tag });
      }
      return items;`;

if (code.includes(oldParser)) {
  code = code.replace(oldParser, newParser);
  console.log('✅ Parser RSS mejorado - mejor extracción de imágenes y limpieza de HTML');
} else {
  console.log('❌ No encontré el parser exacto');
}

// 3. Fix results limit - increase to show more news from all sources
const oldLimit = `res.json(results.slice(0, 15));`;
const newLimit = `res.json(results.slice(0, 24));`;

if (code.includes(oldLimit)) {
  code = code.replace(oldLimit, newLimit);
  console.log('✅ Límite de noticias aumentado a 24');
}

fs.writeFileSync('src/server.js', code);
console.log('\n🎉 Endpoint noticias-pr actualizado');
