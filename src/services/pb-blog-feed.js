'use strict';
const ORIGIN='https://www.masboricuaqueunmofongo.com';
const BRAND_IMAGES=new Set(['/img/pb-logo.png','/img/og-planetaboricua.jpg','/img/og-planeta-boricua-logo.jpg']);
const xml=value=>String(value??'').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\ufffe\uffff]/g,'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
function coverUrl(value){
 if(typeof value!=='string'||!value.trim())return '';
 const raw=value.trim();if(!raw.startsWith('/')&&!/^https:\/\//i.test(raw)||raw.startsWith('//'))return '';
 try{const u=new URL(raw,ORIGIN);if(u.protocol!=='https:'||u.username||u.password)return '';if(u.origin===ORIGIN&&BRAND_IMAGES.has(u.pathname))return '';return u.href;}catch(_){return '';}
}
function renderFeed(posts,{pinterest=false}={}){
 const seen=new Set(),limit=pinterest?5:20;
 const selected=(Array.isArray(posts)?posts:[]).filter(p=>p&&(!p.status||p.status==='published')&&/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug||''))
 .slice().sort((a,b)=>(Date.parse(b.dateISO||b.publishedAt||b.date)||0)-(Date.parse(a.dateISO||a.publishedAt||a.date)||0))
 .filter(p=>{if(seen.has(p.slug)||pinterest&&!coverUrl(p.image))return false;seen.add(p.slug);return true;}).slice(0,limit);
 const items=selected.map(p=>{
  const link=ORIGIN+'/blog/'+p.slug,image=coverUrl(p.image),stamp=Date.parse(p.dateISO||p.publishedAt||p.date),date=Number.isFinite(stamp)?`<pubDate>${xml(new Date(stamp).toUTCString())}</pubDate>`:'';
  // Keep identity tied to the article. One original cover, no inline photos or ads.
  return `<item><title>${xml(p.title)}</title><link>${xml(link)}</link><description>${xml(p.excerpt||'')}</description>${date}<guid isPermaLink="true">${xml(link)}</guid>${image?`<media:content url="${xml(image)}" medium="image"/>`:''}</item>`;
 }).join('');
 return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/"><channel><title>${pinterest?'Cultura y tradiciones de Puerto Rico — Planeta Boricua':'Los Temas del Balcón — Planeta Boricua'}</title><link>${ORIGIN}/blog</link><description>Artículos sobre cultura boricua, identidad y diáspora.</description><language>es-PR</language>${items}</channel></rss>`;
}
module.exports={renderFeed,coverUrl};
