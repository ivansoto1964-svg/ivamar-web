module.exports = function(posts, page, totalPages, category, search) {
  page = page || 1;
  totalPages = totalPages || 1;
  const cards = posts.map((p, i) => {
    const isFeatured = i === 0 && page === 1 && !search && !category;
    return `<article class="blog-card${isFeatured ? ' blog-card-featured' : ''}">
      <a href="/insights/${p.slug}" class="blog-card-img-wrap">
        <img src="${p.image || '/img/og-caribex.jpg'}" alt="${p.title}" loading="${i < 3 ? 'eager' : 'lazy'}">
        <span class="blog-card-cat">${p.category || 'Caribbean Travel'}</span>
      </a>
      <div class="blog-card-body">
        <h2 class="blog-card-title"><a href="/insights/${p.slug}">${p.title}</a></h2>
        <p class="blog-card-excerpt">${p.excerpt || ''}</p>
        <div class="blog-card-meta">
          <span class="blog-card-date">📅 ${p.date || ''}</span>
          <span class="blog-card-time">⏱️ ${p.readTime || '5'} min</span>
          <a href="/insights/${p.slug}" class="blog-card-read">Read more →</a>
        </div>
      </div>
    </article>`;
  }).join('');

  const pagination = totalPages > 1 ? `<div class="blog-pagination">${page > 1 ? `<a href="/insights?page=${page-1}" class="page-btn">← Previous</a>` : ''}<span class="page-info">Page ${page} of ${totalPages}</span>${page < totalPages ? `<a href="/insights?page=${page+1}" class="page-btn">Next →</a>` : ''}</div>` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Caribex Insights — Caribbean Travel Guides & Expert Tips</title>
<meta name="description" content="Expert Caribbean travel guides, island insights, tips and recommendations. Plan your perfect Caribbean getaway with Caribex.">
<link rel="canonical" href="https://www.yourcaribbeanexpert.com/insights">
<meta property="og:title" content="Caribex Insights — Caribbean Travel Guides">
<meta property="og:description" content="Expert Caribbean travel guides and island insights.">
<meta property="og:url" content="https://www.yourcaribbeanexpert.com/insights">
<meta property="og:image" content="https://www.yourcaribbeanexpert.com/img/og-caribex.jpg">
<link rel="alternate" type="application/rss+xml" title="Caribex Insights" href="/insights/feed.xml">
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
.blog-header{background:linear-gradient(135deg,var(--dark-blue),var(--teal));padding:3rem 2rem;text-align:center;}
.blog-header h1{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,4vw,3rem);font-weight:800;color:#fff;margin-bottom:0.5rem;}
.blog-header p{color:rgba(255,255,255,0.8);font-size:0.95rem;max-width:600px;margin:0 auto;}
.blog-search{background:#fff;border-bottom:1px solid var(--border);padding:1rem 0;}
.blog-search-inner{max-width:1200px;margin:0 auto;padding:0 2rem;display:flex;gap:1rem;align-items:center;flex-wrap:wrap;}
.search-box{display:flex;flex:1;max-width:400px;border:1px solid var(--border);border-radius:4px;overflow:hidden;}
.search-box input{flex:1;padding:0.5rem 0.8rem;font-size:0.85rem;border:none;outline:none;font-family:'Inter',sans-serif;}
.search-box button{background:var(--teal);color:#fff;border:none;padding:0.5rem 1rem;font-size:0.82rem;font-weight:700;cursor:pointer;}
.blog-count{font-size:0.78rem;color:var(--mid);}
.blog-cats{background:#fff;border-bottom:1px solid var(--border);padding:0.7rem 0;overflow-x:auto;}
.blog-cats-inner{max-width:1200px;margin:0 auto;padding:0 2rem;display:flex;gap:0.5rem;flex-wrap:nowrap;}
.blog-cat-btn{font-size:0.72rem;font-weight:700;color:var(--mid);text-decoration:none;padding:0.3rem 0.8rem;border:1px solid var(--border);border-radius:20px;white-space:nowrap;transition:all 0.2s;background:#fff;}
.blog-cat-btn:hover,.blog-cat-btn.active{background:var(--teal);color:#fff;border-color:var(--teal);}
.blog-main{max-width:1200px;margin:0 auto;padding:2rem;}
.blog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
.blog-card{background:#fff;border-radius:6px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.06);transition:box-shadow 0.2s;display:flex;flex-direction:column;}
.blog-card:hover{box-shadow:0 6px 24px rgba(0,0,0,0.1);}
.blog-card-featured{grid-column:1/-1;flex-direction:row;}
.blog-card-featured .blog-card-img-wrap{width:55%;height:380px;flex-shrink:0;}
.blog-card-featured .blog-card-body{padding:2rem;display:flex;flex-direction:column;justify-content:center;}
.blog-card-featured .blog-card-title a{font-size:1.8rem;}
.blog-card-img-wrap{display:block;position:relative;height:200px;overflow:hidden;text-decoration:none;flex-shrink:0;}
.blog-card-img-wrap img{width:100%;height:100%;object-fit:cover;transition:transform 0.3s;}
.blog-card:hover .blog-card-img-wrap img{transform:scale(1.04);}
.blog-card-cat{position:absolute;top:0.8rem;left:0.8rem;background:var(--teal);color:#fff;font-size:0.6rem;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;padding:0.2rem 0.6rem;border-radius:2px;}
.blog-card-body{padding:1.2rem;flex:1;display:flex;flex-direction:column;}
.blog-card-title{font-family:'Playfair Display',serif;font-size:1.05rem;font-weight:700;line-height:1.3;margin-bottom:0.6rem;flex:1;}
.blog-card-title a{color:var(--dark);text-decoration:none;}
.blog-card-title a:hover{color:var(--teal);}
.blog-card-excerpt{font-size:0.82rem;color:var(--mid);line-height:1.6;margin-bottom:0.8rem;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}
.blog-card-meta{display:flex;align-items:center;gap:0.8rem;flex-wrap:wrap;margin-top:auto;}
.blog-card-date,.blog-card-time{font-size:0.68rem;color:#999;}
.blog-card-read{font-size:0.75rem;font-weight:700;color:var(--teal);text-decoration:none;margin-left:auto;}
.blog-empty{text-align:center;padding:4rem 2rem;color:var(--mid);grid-column:1/-1;}
.blog-pagination{display:flex;align-items:center;justify-content:center;gap:1rem;margin-top:2.5rem;padding-top:2rem;border-top:1px solid var(--border);}
.page-btn{background:var(--teal);color:#fff;padding:0.6rem 1.5rem;border-radius:4px;text-decoration:none;font-size:0.82rem;font-weight:700;}
.page-info{font-size:0.82rem;color:var(--mid);}
footer{background:var(--dark-blue);padding:2rem;text-align:center;margin-top:3rem;}
footer a{color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.8rem;margin:0 0.5rem;}
footer a:hover{color:#fff;}
footer p{color:rgba(255,255,255,0.3);font-size:0.75rem;margin-top:0.5rem;}
@media(max-width:768px){.blog-grid{grid-template-columns:1fr;}.blog-card-featured{flex-direction:column;}.blog-card-featured .blog-card-img-wrap{width:100%;height:220px;}.blog-card-featured .blog-card-body{padding:1.2rem;}.nav-links{width:100%;overflow-x:auto;flex-wrap:nowrap;padding-bottom:0.3rem;border-top:1px solid #f0f0f0;padding-top:0.5rem;}.nav-links a{white-space:nowrap;}.search-box{max-width:100%;}}
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
<div class="blog-header">
  <h1>🌴 Caribex Insights</h1>
  <p>Expert Caribbean travel guides, island tips and insider knowledge — from your Caribbean expert</p>
</div>
<div class="blog-search">
  <div class="blog-search-inner">
    <form class="search-box" action="/insights/buscar" method="get">
      <input type="text" name="q" placeholder="Search articles..." value="${search || ''}" aria-label="Search">
      <button type="submit">🔍</button>
    </form>
    <span class="blog-count">${posts.length} article${posts.length !== 1 ? 's' : ''} published</span>
  </div>
</div>
<div class="blog-cats">
  <div class="blog-cats-inner">
    <a href="/insights" class="blog-cat-btn${!category ? ' active' : ''}">🌴 All</a>
    <a href="/insights/categoria/caribbean-travel" class="blog-cat-btn${category === 'caribbean-travel' ? ' active' : ''}">✈️ Travel</a>
    <a href="/insights/categoria/island-guides" class="blog-cat-btn${category === 'island-guides' ? ' active' : ''}">🗺️ Island Guides</a>
    <a href="/insights/categoria/culture" class="blog-cat-btn${category === 'culture' ? ' active' : ''}">🎭 Culture</a>
    <a href="/insights/categoria/food" class="blog-cat-btn${category === 'food' ? ' active' : ''}">🍽️ Food</a>
    <a href="/insights/categoria/tips" class="blog-cat-btn${category === 'tips' ? ' active' : ''}">💡 Tips</a>
  </div>
</div>
<div class="blog-main">
  <div class="blog-grid">
    ${cards || '<div class="blog-empty"><p>No articles found.</p></div>'}
  </div>
  ${pagination}
</div>
<footer>
  <a href="/caribex">Portal</a>
  <a href="/insights">Insights</a>
  <a href="/about">About Us</a>
  <a href="/privacidad">Privacy Policy</a>
  <a href="/terminos">Terms of Use</a>
  <p>© 2026 Caribex — Your Caribbean Expert · Ivamar AI LLC</p>
</footer>
</body>
</html>`;
};
