module.exports = function(post, relatedPosts, prevPost, nextPost) {
  const related = (relatedPosts || []).slice(0, 3).map(p => `
    <a href="/insights/${p.slug}" class="related-card">
      <div class="related-img"><img src="${p.image || '/img/og-caribex.jpg'}" alt="${p.title}" loading="lazy"></div>
      <div class="related-body"><span class="related-cat">${p.category || 'Caribbean Travel'}</span><h4 class="related-title">${p.title}</h4></div>
    </a>`).join('');
  const tags = (post.tags || []).map(t => `<a href="/insights/buscar?q=${encodeURIComponent(t)}" class="post-tag">${t}</a>`).join('');
  const wordCount = (post.content || '').replace(/<[^>]+>/g, '').split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));
  const navPrevNext = `<div class="post-nav">${prevPost ? `<a href="/insights/${prevPost.slug}" class="post-nav-item post-nav-prev"><span class="post-nav-label">← Previous</span><span class="post-nav-title">${prevPost.title}</span></a>` : '<div></div>'}${nextPost ? `<a href="/insights/${nextPost.slug}" class="post-nav-item post-nav-next"><span class="post-nav-label">Next →</span><span class="post-nav-title">${nextPost.title}</span></a>` : '<div></div>'}</div>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${post.title} — Caribex</title>
<meta name="description" content="${post.excerpt || post.title}">
<link rel="canonical" href="https://www.yourcaribbeanexpert.com/insights/${post.slug}">
<meta property="og:type" content="article">
<meta property="og:title" content="${post.title}">
<meta property="og:description" content="${post.excerpt || post.title}">
<meta property="og:url" content="https://www.yourcaribbeanexpert.com/insights/${post.slug}">
<meta property="og:image" content="${post.image && post.image.startsWith('http') ? post.image : 'https://www.yourcaribbeanexpert.com/img/og-caribex.jpg'}">
<meta property="og:locale" content="en_US">
<meta property="og:site_name" content="Caribex — Your Caribbean Expert">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${post.title}">
<meta name="twitter:image" content="${post.image && post.image.startsWith('http') ? post.image : 'https://www.yourcaribbeanexpert.com/img/og-caribex.jpg'}">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BlogPosting","headline":"${post.title.replace(/"/g,'&quot;')}","description":"${(post.excerpt||'').replace(/"/g,'&quot;')}","datePublished":"${post.dateISO||post.date||''}","author":{"@type":"Person","name":"Ivan Soto"},"publisher":{"@type":"Organization","name":"Caribex","url":"https://www.yourcaribbeanexpert.com"},"mainEntityOfPage":"https://www.yourcaribbeanexpert.com/insights/${post.slug}"}</script>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8301223085122981" crossorigin="anonymous"></script>
<style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Inter',sans-serif;background:#f0f7ff;color:#111;overflow-x:hidden;}
:root{--teal:#0077b6;--dark-blue:#023e8a;--gold:#f4a261;--dark:#111111;--mid:#555;--border:#cce0f0;}
nav{background:#fff;border-bottom:3px solid var(--teal);position:sticky;top:0;z-index:100;}
.nav-top{max-width:1200px;margin:0 auto;padding:0.8rem 2rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;}
.nav-logo{display:flex;align-items:center;gap:0.6rem;text-decoration:none;}
.nav-logo-img{font-size:1.6rem;}
.nav-logo-text{font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:800;color:var(--dark-blue);line-height:1;}
.nav-logo-sub{font-size:0.58rem;color:var(--mid);text-transform:uppercase;letter-spacing:0.08em;margin-top:0.1rem;}
.nav-links{display:flex;align-items:center;gap:1rem;flex-wrap:wrap;}
.nav-links a{font-size:0.75rem;color:var(--mid);text-decoration:none;font-weight:600;text-transform:uppercase;}
.nav-links a:hover{color:var(--teal);}
.nav-cta{background:var(--teal);color:#fff!important;padding:0.4rem 0.8rem;border-radius:3px;font-weight:700!important;}
.breadcrumb{max-width:1200px;margin:0 auto;padding:0.8rem 2rem;font-size:0.72rem;color:var(--mid);}
.breadcrumb a{color:var(--mid);text-decoration:none;}
.breadcrumb a:hover{color:var(--teal);}
.breadcrumb span{margin:0 0.4rem;color:#ccc;}
.post-hero{width:100%;height:460px;overflow:hidden;background:linear-gradient(135deg,var(--dark-blue),var(--teal));}
.post-hero img{width:100%;height:100%;object-fit:cover;}
.post-wrap{max-width:800px;margin:0 auto;padding:2.5rem 2rem;}
.post-cat{font-size:0.65rem;font-weight:800;color:var(--teal);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:0.8rem;display:inline-block;background:#e8f4fd;padding:0.2rem 0.6rem;border-radius:2px;}
.post-title{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;line-height:1.2;color:var(--dark);margin-bottom:1rem;}
.post-meta{display:flex;align-items:center;gap:1.2rem;font-size:0.75rem;color:#999;margin-bottom:2rem;padding-bottom:1.5rem;border-bottom:2px solid var(--border);flex-wrap:wrap;}
.post-meta strong{color:var(--dark);}
.post-body{font-size:1.05rem;line-height:1.9;color:#222;}
.post-body h2{font-family:'Playfair Display',serif;font-size:1.6rem;font-weight:800;color:var(--dark-blue);margin:2.5rem 0 0.8rem;padding-bottom:0.4rem;border-bottom:2px solid var(--teal);}
.post-body h3{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:700;color:var(--dark);margin:1.8rem 0 0.6rem;}
.post-body p{margin-bottom:1.3rem;}
.post-body strong{color:var(--dark);font-weight:700;}
.post-body a{color:var(--teal);text-decoration:none;border-bottom:1px solid rgba(0,119,182,0.3);}
.post-body a:hover{border-bottom-color:var(--teal);}
.post-body blockquote{border-left:4px solid var(--teal);padding:1rem 1.5rem;margin:1.8rem 0;background:#fff;border-radius:0 4px 4px 0;font-style:italic;color:#444;}
.post-body hr{border:none;border-top:2px solid var(--border);margin:2.5rem 0;}
.post-tags{margin:2rem 0;display:flex;gap:0.5rem;flex-wrap:wrap;align-items:center;}
.post-tags-label{font-size:0.72rem;font-weight:700;color:var(--mid);text-transform:uppercase;}
.post-tag{font-size:0.72rem;color:var(--mid);text-decoration:none;padding:0.2rem 0.7rem;border:1px solid var(--border);border-radius:20px;background:#fff;transition:all 0.2s;}
.post-tag:hover{background:var(--teal);color:#fff;border-color:var(--teal);}
.post-share{margin:2.5rem 0;padding:1.5rem;background:#fff;border-radius:8px;text-align:center;border:1px solid var(--border);}
.post-share p{font-size:0.88rem;color:var(--mid);margin-bottom:1rem;font-weight:600;}
.share-btns{display:flex;gap:0.8rem;justify-content:center;flex-wrap:wrap;}
.share-btn{display:inline-flex;align-items:center;gap:0.4rem;padding:0.6rem 1.4rem;border-radius:4px;font-size:0.8rem;font-weight:700;text-decoration:none;color:#fff;}
.share-fb{background:#1877f2;}
.share-wa{background:#25d366;}
.share-tw{background:#000;}
.share-copy{background:var(--mid);cursor:pointer;border:none;font-family:'Inter',sans-serif;}
.post-affiliate{background:linear-gradient(135deg,var(--dark-blue),var(--teal));border-radius:10px;padding:1.8rem;margin:2.5rem 0;text-align:center;}
.post-affiliate-title{font-family:'Playfair Display',serif;font-size:1.1rem;color:#fff;margin-bottom:0.4rem;}
.post-affiliate p{color:rgba(255,255,255,0.7);font-size:0.82rem;margin-bottom:1.2rem;}
.post-affiliate-links{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}
.post-affiliate-links a{background:rgba(255,255,255,0.15);color:#fff;padding:0.6rem 1.4rem;border-radius:4px;font-size:0.82rem;font-weight:700;text-decoration:none;border:1px solid rgba(255,255,255,0.3);}
.post-nav{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:2.5rem 0;padding:2rem 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);}
.post-nav-item{text-decoration:none;color:inherit;background:#fff;padding:1rem;border-radius:6px;border:1px solid var(--border);transition:border-color 0.2s;}
.post-nav-item:hover{border-color:var(--teal);}
.post-nav-next{text-align:right;}
.post-nav-label{font-size:0.65rem;font-weight:800;color:var(--teal);text-transform:uppercase;letter-spacing:0.1em;display:block;margin-bottom:0.3rem;}
.post-nav-title{font-family:'Playfair Display',serif;font-size:0.9rem;font-weight:700;color:var(--dark);line-height:1.3;display:block;}
.post-related{margin-top:2.5rem;}
.post-related h3{font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:800;color:var(--dark);margin-bottom:1.2rem;}
.related-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;}
.related-card{text-decoration:none;color:inherit;background:#fff;border-radius:6px;overflow:hidden;transition:box-shadow 0.2s;border:1px solid var(--border);}
.related-card:hover{box-shadow:0 4px 16px rgba(0,0,0,0.08);}
.related-img{height:130px;overflow:hidden;}
.related-img img{width:100%;height:100%;object-fit:cover;}
.related-body{padding:0.8rem;}
.related-cat{font-size:0.58rem;font-weight:800;color:var(--teal);text-transform:uppercase;letter-spacing:0.1em;display:block;margin-bottom:0.3rem;}
.related-title{font-family:'Playfair Display',serif;font-size:0.88rem;font-weight:700;color:var(--dark);line-height:1.3;}
footer{background:var(--dark-blue);padding:2rem;text-align:center;margin-top:3rem;}
footer a{color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.8rem;margin:0 0.5rem;}
footer a:hover{color:#fff;}
footer p{color:rgba(255,255,255,0.3);font-size:0.75rem;margin-top:0.5rem;}
@media(max-width:768px){.post-hero{height:260px;}.post-wrap{padding:1.2rem;}.related-grid{grid-template-columns:1fr;}.post-nav{grid-template-columns:1fr;}.nav-links{width:100%;overflow-x:auto;flex-wrap:nowrap;padding-top:0.5rem;border-top:1px solid #f0f0f0;}.nav-links a{white-space:nowrap;}.post-body{font-size:0.98rem;}}
</style>
</head>
<body>
<nav>
  <div class="nav-top">
    <a href="/caribex" class="nav-logo">
      <span class="nav-logo-img">🏝️</span>
      <div>
        <div class="nav-logo-text">Caribex</div>
        <div class="nav-logo-sub">Your Caribbean Expert</div>
      </div>
    </a>
    <div class="nav-links">
      <a href="/caribex">Portal</a>
      <a href="/insights" style="color:var(--teal);font-weight:800">Insights</a>
      <a href="/caribex/puerto-rico">Destinations</a>
      <a href="/about">About</a>
      <a href="/caribex" class="nav-cta">Explore Caribbean</a>
    </div>
  </div>
</nav>
<div class="breadcrumb">
  <a href="/caribex">Home</a><span>›</span>
  <a href="/insights">Insights</a><span>›</span>
  <span>${post.title.length > 60 ? post.title.substring(0,60)+'...' : post.title}</span>
</div>
<div class="post-hero">
  <img src="${post.image && post.image.startsWith('http') ? post.image : '/img/og-caribex.jpg'}" alt="${post.title}">
</div>
<div class="post-wrap">
  <div class="post-cat">🌴 ${post.category || 'Caribbean Travel'}</div>
  <h1 class="post-title">${post.title}</h1>
  <div class="post-meta">
    <span>📅 <strong>${post.date || ''}</strong></span>
    <span>✍️ <strong>Caribex Expert</strong></span>
    <span>⏱️ <strong>${readTime} min</strong> read</span>
    <span>📖 <strong>${wordCount}</strong> words</span>
  </div>
  <div class="post-body">${post.content}</div>
  ${tags ? `<div class="post-tags"><span class="post-tags-label">Tags:</span>${tags}</div>` : ''}
  <div id="disqus_thread" style="margin:2rem 0;padding:1.5rem;background:#fff;border-radius:8px;border:1px solid var(--border);"></div>
  <script>
  var disqus_config = function () {
    this.page.url = 'https://www.yourcaribbeanexpert.com/insights/${post.slug}';
    this.page.identifier = 'caribex-${post.slug}';
  };
  (function() {
    var d = document, s = d.createElement('script');
    s.src = 'https://yourcaribbeanexpert-com.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  })();
  </script>
  <div class="post-share">
    <p>Found this helpful? Share it with fellow travelers 🌴</p>
    <div style="display:flex;align-items:center;gap:0.8rem;justify-content:center;flex-wrap:wrap;margin-top:0.8rem;">
      <input id="share-url" type="text" value="https://www.yourcaribbeanexpert.com/insights/${post.slug}" readonly style="flex:1;max-width:400px;padding:0.6rem 1rem;border:2px solid var(--border);border-radius:4px;font-size:0.82rem;font-family:inherit;color:var(--dark);background:#f9f9f9;">
      <button onclick="navigator.clipboard.writeText(document.getElementById('share-url').value);this.textContent='✅ Copied!';setTimeout(()=>this.textContent='🔗 Copy link',2000)" style="background:var(--teal);color:#fff;border:none;padding:0.6rem 1.2rem;border-radius:4px;font-weight:700;cursor:pointer;font-size:0.82rem;white-space:nowrap;">🔗 Copy link</button>
    </div>
    <p style="font-size:0.75rem;color:var(--mid);margin-top:0.6rem;">Copy the link and share it on Facebook, WhatsApp, or anywhere you like 🌴</p>
  </div>
  <div class="post-affiliate">
    <div class="post-affiliate-title">🏝️ Planning a Caribbean trip?</div>
    <p>Find the best rates for your next island getaway</p>
    <div class="post-affiliate-links">
      <a href="https://booking.tpo.lu/OcdV3VzY" target="_blank" rel="noopener">🏨 Hotels on Booking.com</a>
      <a href="https://trip.tpo.lu/tOQAQ2WQ" target="_blank" rel="noopener">✈️ Flights on Trip.com</a>
    </div>
  </div>
  ${navPrevNext}
  ${related ? `<div class="post-related"><h3>🌴 Keep Exploring</h3><div class="related-grid">${related}</div></div>` : ''}
</div>
<footer>
  <a href="/caribex">Portal</a>
  <a href="/insights">Insights</a>
  <a href="/about">About</a>
  <a href="/privacidad">Privacy</a>
  <a href="/terminos">Terms</a>
  <p>© 2026 Caribex — Your Caribbean Expert · Ivamar AI LLC</p>
</footer>
</body>
</html>`;
};
