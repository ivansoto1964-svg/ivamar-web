const _sc = '<' + '/script>';

module.exports = function renderDestination(dest) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${dest.name} — Caribex Caribbean Expert</title>
<meta name="description" content="${dest.tagline} — Caribex Caribbean Travel Guide">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8301223085122981" crossorigin="anonymous">${_sc}
<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'DM Sans',sans-serif;background:#fff;color:#1a1a1a;overflow-x:hidden;}
:root{--teal:#00B4D8;--deep:#0077B6;--sand:#F4E8D0;--dark:#0D1B2A;--mid:#555;--border:#E0EEF4;}
nav{background:rgba(255,255,255,0.95);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);padding:0 2rem;display:flex;align-items:center;justify-content:space-between;height:64px;position:sticky;top:0;z-index:100;}
.nav-logo{display:flex;align-items:center;gap:0.6rem;text-decoration:none;}
.nav-logo img{height:32px;}
.nav-logo-text{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;color:var(--dark);}
.nav-logo-text span{color:var(--teal);}
.nav-back{font-size:0.82rem;color:var(--mid);text-decoration:none;display:flex;align-items:center;gap:0.4rem;}
.nav-back:hover{color:var(--teal);}
.hero{position:relative;height:80vh;min-height:500px;overflow:hidden;display:flex;align-items:flex-end;}
.hero-bg{position:absolute;inset:0;background:${dest.gradient};opacity:${dest.heroPhoto ? '0.55' : '1'};}
.hero-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:1;}
.hero-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.1) 60%);}
.hero-content{position:relative;z-index:1;max-width:1100px;margin:0 auto;width:100%;padding:3rem 2rem;}
.hero-flag{font-size:3rem;margin-bottom:0.8rem;display:block;}
.hero-region{font-size:0.68rem;font-weight:700;color:rgba(255,255,255,0.6);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:0.5rem;}
.hero h1{font-family:'Playfair Display',serif;font-size:clamp(3rem,7vw,6rem);font-weight:700;color:#fff;line-height:1;margin-bottom:0.5rem;}
.hero-tagline{font-size:1.1rem;color:rgba(255,255,255,0.75);margin-bottom:1.5rem;font-style:italic;}
.best-for{display:flex;gap:0.5rem;flex-wrap:wrap;}
.bf-tag{font-size:0.7rem;font-weight:700;color:#fff;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.3);padding:0.3rem 0.8rem;border-radius:20px;}
.overview{padding:5rem 2rem;background:#fff;}
.overview-inner{max-width:800px;margin:0 auto;}
.sec-tag{font-size:0.65rem;font-weight:700;color:var(--teal);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:0.5rem;}
.sec-title{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:700;color:var(--dark);margin-bottom:1.5rem;line-height:1.15;}
.overview-text p{font-size:1rem;color:#444;line-height:1.9;margin-bottom:1.2rem;}
.experiences{padding:5rem 2rem;background:#F0F8FF;}
.exp-inner{max-width:1100px;margin:0 auto;}
.exp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem;margin-top:2rem;}
.exp-card{background:#fff;border-radius:14px;padding:1.5rem;border:1px solid var(--border);transition:all 0.2s;}
.exp-card:hover{border-color:var(--teal);transform:translateY(-2px);}
.exp-icon{font-size:2rem;margin-bottom:0.8rem;}
.exp-name{font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;color:var(--dark);margin-bottom:0.5rem;}
.exp-desc{font-size:0.78rem;color:var(--mid);line-height:1.6;}
.beaches{padding:5rem 2rem;background:#fff;}
.beaches-inner{max-width:1100px;margin:0 auto;}
.beach-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem;margin-top:2rem;}
.beach-card{border-radius:16px;overflow:hidden;border:1px solid var(--border);display:flex;}
.beach-color{width:6px;flex-shrink:0;background:${dest.gradient};}
.beach-body{padding:1.2rem;}
.beach-type{font-size:0.62rem;font-weight:700;color:var(--teal);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.3rem;}
.beach-name{font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;color:var(--dark);margin-bottom:0.4rem;}
.beach-desc{font-size:0.78rem;color:var(--mid);line-height:1.5;}
.food-sec{padding:5rem 2rem;background:var(--sand);}
.food-inner{max-width:1100px;margin:0 auto;}
.food-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.2rem;margin-top:2rem;}
.food-card{background:#fff;border-radius:14px;padding:1.5rem;border:1px solid #E8DCC8;}
.food-name{font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;color:var(--dark);margin-bottom:0.5rem;}
.food-desc{font-size:0.78rem;color:var(--mid);line-height:1.6;}
.culture-sec{padding:5rem 2rem;background:var(--dark);}
.culture-inner{max-width:800px;margin:0 auto;text-align:center;}
.culture-text p{font-size:1rem;color:rgba(255,255,255,0.7);line-height:1.9;margin-bottom:1.2rem;}
.practical{padding:5rem 2rem;background:#fff;}
.practical-inner{max-width:1100px;margin:0 auto;}
.practical-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.2rem;margin-top:2rem;}
.prac-card{background:#F0F8FF;border-radius:12px;padding:1.5rem;border:1px solid var(--border);}
.prac-label{font-size:0.62rem;font-weight:700;color:var(--teal);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.5rem;}
.prac-value{font-size:0.82rem;color:var(--dark);line-height:1.5;font-weight:500;}
.best-time{padding:3rem 2rem;background:#F0F8FF;text-align:center;}
.best-time-inner{max-width:700px;margin:0 auto;}
.best-time p{font-size:0.92rem;color:var(--mid);line-height:1.8;}
.directory-sec{padding:5rem 2rem;background:#fff;}
.directory-inner{max-width:1100px;margin:0 auto;}
.dir-cats{display:grid;grid-template-columns:repeat(4,1fr);gap:1.2rem;margin-top:2rem;}
.dir-cat{background:#F0F8FF;border:1px solid var(--border);border-radius:16px;padding:1.8rem 1.2rem;text-align:center;cursor:pointer;transition:all 0.2s;}
.dir-cat:hover{border-color:var(--teal);transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,180,216,0.1);}
.dir-cat-icon{font-size:2.2rem;margin-bottom:0.8rem;}
.dir-cat-name{font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;}
.dir-cat-count{font-size:0.72rem;color:var(--teal);font-weight:700;}
.dir-panel{display:none;margin-top:2rem;}
.dir-panel.active{display:block;}
.dir-panel-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;}
.dir-panel-title{font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:700;color:var(--dark);}
.dir-panel-close{font-size:0.82rem;color:var(--mid);cursor:pointer;}
.dir-listings{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem;}
.dir-listing{background:#fff;border:1px solid var(--border);border-radius:14px;overflow:hidden;transition:all 0.2s;}
.dir-listing-img{height:140px;overflow:hidden;background:linear-gradient(135deg,#E0F7FA,#B3E5FC);}
.dir-listing-img img{width:100%;height:100%;object-fit:cover;}
.dir-listing-body{padding:1.2rem;}
.dir-listing-name{font-family:'Playfair Display',serif;font-size:0.95rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;}
.dir-listing-desc{font-size:0.75rem;color:var(--mid);line-height:1.5;margin-bottom:0.8rem;}
.dir-listing-price{font-size:0.68rem;font-weight:700;color:var(--teal);}
.dir-listing-contact{display:flex;gap:0.5rem;margin-top:0.8rem;flex-wrap:wrap;}
.dir-contact-btn{font-size:0.7rem;font-weight:700;padding:0.3rem 0.7rem;border-radius:4px;text-decoration:none;}
.dir-contact-wa{background:#25D366;color:#fff;}
.dir-contact-web{background:#F0F8FF;color:var(--deep);border:1px solid var(--border);}
.dir-empty{text-align:center;padding:3rem;background:#F0F8FF;border-radius:14px;border:1px solid var(--border);}
.dir-empty p{font-size:0.88rem;color:var(--mid);margin-bottom:1rem;}
.dir-empty a{color:var(--teal);font-weight:700;text-decoration:none;}

.plan-trip{padding:4rem 2rem;background:#F0F8FF;}
.plan-trip-inner{max-width:1100px;margin:0 auto;}
.plan-trip-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.2rem;margin-top:2rem;}
.plan-trip-card{background:#fff;border-radius:14px;padding:1.5rem;border:1px solid var(--border);}
.plan-trip-cat{font-size:0.65rem;font-weight:700;color:var(--teal);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:1rem;}
.plan-trip-links{display:flex;flex-direction:column;gap:0.6rem;}
.plan-trip-link{display:flex;align-items:center;gap:0.5rem;text-decoration:none;color:var(--dark);font-size:0.82rem;font-weight:500;padding:0.5rem 0.8rem;border-radius:8px;border:1px solid var(--border);transition:all 0.2s;}
.plan-trip-link:hover{border-color:var(--teal);color:var(--teal);}
@media(max-width:768px){.plan-trip{padding:3rem 1rem;}.plan-trip-grid{grid-template-columns:repeat(2,1fr);}}
.local-cta{padding:5rem 2rem;background:linear-gradient(160deg,#0D1B2A 0%,#023E8A 100%);}
.local-cta-inner{max-width:800px;margin:0 auto;text-align:center;}
.local-cta-tag{font-size:0.68rem;font-weight:700;color:var(--teal);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:1rem;}
.local-cta-title{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:700;color:#fff;line-height:1.2;margin-bottom:1.5rem;}
.local-cta-text{font-size:0.95rem;color:rgba(255,255,255,0.75);line-height:1.9;margin-bottom:1rem;max-width:680px;margin-left:auto;margin-right:auto;}
.local-cta-sub{font-size:0.82rem;color:rgba(255,255,255,0.5);margin-bottom:2rem;font-style:italic;}
.local-cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}
.btn-list{display:inline-flex;align-items:center;background:var(--teal);color:#fff;padding:0.9rem 1.8rem;border-radius:6px;font-size:0.88rem;font-weight:700;text-decoration:none;transition:all 0.2s;}
.btn-list:hover{background:#0096B4;}
.btn-share{display:inline-flex;align-items:center;background:rgba(255,255,255,0.1);color:#fff;padding:0.9rem 1.8rem;border-radius:6px;font-size:0.88rem;font-weight:700;text-decoration:none;border:1px solid rgba(255,255,255,0.2);transition:all 0.2s;}
.assist-strip{padding:4rem 2rem;background:${dest.gradient};}
.assist-strip-inner{max-width:900px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;}
.assist-strip h2{font-family:'Playfair Display',serif;font-size:clamp(1.5rem,3vw,2.2rem);font-weight:700;color:#fff;margin-bottom:0.8rem;}
.assist-strip p{font-size:0.88rem;color:rgba(255,255,255,0.75);line-height:1.7;margin-bottom:1.5rem;}
.btn-white{display:inline-flex;align-items:center;gap:0.5rem;background:#fff;color:var(--dark);padding:0.85rem 1.8rem;border-radius:6px;font-size:0.88rem;font-weight:700;text-decoration:none;transition:all 0.2s;}
footer{background:var(--dark);padding:2rem;text-align:center;}
.footer-logo{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:700;color:#fff;margin-bottom:0.3rem;}
.footer-logo span{color:var(--teal);}
.footer-info{font-size:0.68rem;color:rgba(255,255,255,0.3);margin-top:0.3rem;}
@media(max-width:768px){
nav{padding:0 1rem;}
.hero{height:65vh;}
.overview{padding:3rem 1rem;}
.experiences{padding:3rem 1rem;}.exp-grid{grid-template-columns:1fr;}
.beaches{padding:3rem 1rem;}.beach-grid{grid-template-columns:1fr;}
.food-sec{padding:3rem 1rem;}.food-grid{grid-template-columns:1fr;}
.culture-sec{padding:3rem 1rem;}
.practical{padding:3rem 1rem;}.practical-grid{grid-template-columns:1fr 1fr;}
.assist-strip{padding:3rem 1rem;}.assist-strip-inner{grid-template-columns:1fr;}
.directory-sec{padding:3rem 1rem;}.dir-cats{grid-template-columns:repeat(2,1fr);}.dir-listings{grid-template-columns:1fr;}
.local-cta{padding:3rem 1rem;}.local-cta-btns{flex-direction:column;align-items:center;}
.sec-tag{font-size:0.9rem;}
.exp-name{font-size:1.15rem;}
.exp-desc{font-size:0.95rem;}
.beach-type{font-size:0.85rem;}
.beach-name{font-size:1.15rem;}
.beach-desc{font-size:0.95rem;}
.food-name{font-size:1.15rem;}
.food-desc{font-size:0.95rem;}
.prac-label{font-size:0.85rem;}
.prac-value{font-size:1rem;}
.bf-tag{font-size:0.88rem;}
.hero-region{font-size:0.85rem;}
.hero-tagline{font-size:1rem;}
.overview-text p{font-size:1rem;}
.culture-text p{font-size:1rem;}
.best-time p{font-size:1rem;}
.dir-cat-name{font-size:1.05rem;}
.dir-cat-count{font-size:0.88rem;}
.local-cta-text{font-size:1rem;}
.local-cta-sub{font-size:0.9rem;}
}
</style>
<script data-cfasync="false">
  (function(){var s=document.createElement("script");s.async=1;s.src="https://tpembars.com/NDgwODM3.js?t=480837";document.head.appendChild(s);})();
</script>
<nav>
  <a href="/caribex" class="nav-logo">
    <img src="https://blogger.googleusercontent.com/img/a/AVvXsEjpryXDEJMBPjbd8FSKV1-c8spW4EIniI5IMWd2ZVda8eF70jvonP3Yc-Xa0O6X0Mcz60oiIhE7rxYdktN7Fnvrx4MKVuUzQ2ZYHhZcDho3gr-PWL0Vk_ZfqsjT1Pasls4QT95BPUyzAH5lLbX0Pr4t1hrDaLzqmnQSdrSdTtM31aWxIEPWC1xRlpe3L1w=s272" alt="Caribex">
    <span class="nav-logo-text">Carib<span>ex</span></span>
  </a>
  <a href="/caribex" class="nav-back">← All Destinations</a>
</nav>

<section class="hero">
  ${dest.heroPhoto ? `<img class="hero-img" src="${dest.heroPhoto}" alt="${dest.name}" loading="eager">` : ''}
  <div class="hero-bg"></div>
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <span class="hero-flag">${dest.flag}</span>
    <div class="hero-region">${dest.region} · ${dest.country}</div>
    <h1>${dest.name}</h1>
    <p class="hero-tagline">"${dest.tagline}"</p>
    <div class="best-for">
      ${dest.bestFor.map(b => `<span class="bf-tag">${b}</span>`).join('')}
    </div>
  </div>
</section>

<section class="overview">
  <div class="overview-inner">
    <div class="sec-tag">Overview</div>
    <h2 class="sec-title">Why ${dest.name}?</h2>
    <div class="overview-text">
      ${dest.overview.split('\n').map(p => `<p>${p}</p>`).join('')}
    </div>
  </div>
</section>

<section class="experiences">
  <div class="exp-inner">
    <div class="sec-tag">Top Experiences</div>
    <h2 class="sec-title">What to Do in ${dest.name}</h2>
    <div class="exp-grid">
      ${dest.topExperiences.map(e => `
      <div class="exp-card">
        <div class="exp-icon">${e.icon}</div>
        <div class="exp-name">${e.name}</div>
        <div class="exp-desc">${e.desc}</div>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="beaches">
  <div class="beaches-inner">
    <div class="sec-tag">Beaches</div>
    <h2 class="sec-title">Best Beaches in ${dest.name}</h2>
    <div class="beach-grid">
      ${dest.beaches.map(b => `
      <div class="beach-card">
        <div class="beach-color"></div>
        <div class="beach-body">
          <div class="beach-type">${b.type}</div>
          <div class="beach-name">${b.name}</div>
          <div class="beach-desc">${b.desc}</div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="food-sec">
  <div class="food-inner">
    <div class="sec-tag">Food & Drink</div>
    <h2 class="sec-title">What to Eat in ${dest.name}</h2>
    <div class="food-grid">
      ${dest.food.map(f => `
      <div class="food-card">
        <div class="food-name">🍽️ ${f.name}</div>
        <div class="food-desc">${f.desc}</div>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="culture-sec">
  <div class="culture-inner">
    <div class="sec-tag" style="color:var(--teal)">Culture & People</div>
    <h2 class="sec-title" style="color:#fff;margin-bottom:2rem;">The Soul of ${dest.name}</h2>
    <div class="culture-text">
      ${dest.culture.split('\n').map(p => `<p>${p}</p>`).join('')}
    </div>
  </div>
</section>

<section class="best-time">
  <div class="best-time-inner">
    <div class="sec-tag">When to Visit</div>
    <h2 class="sec-title">Best Time to Visit ${dest.name}</h2>
    <p>${dest.bestTime}</p>
  </div>
</section>

<section class="practical">
  <div class="practical-inner">
    <div class="sec-tag">Practical Info</div>
    <h2 class="sec-title">Planning Your Trip</h2>
    <div class="practical-grid">
      <div class="prac-card">
        <div class="prac-label">💰 Currency</div>
        <div class="prac-value">${dest.practical.currency}</div>
      </div>
      <div class="prac-card">
        <div class="prac-label">🗣️ Language</div>
        <div class="prac-value">${dest.practical.language}</div>
      </div>
      <div class="prac-card">
        <div class="prac-label">✈️ How to Get There</div>
        <div class="prac-value">${dest.practical.howToGet}</div>
      </div>
      <div class="prac-card">
        <div class="prac-label">💵 Daily Budget</div>
        <div class="prac-value">${dest.practical.budget}</div>
      </div>
    </div>
  </div>
</section>

<section class="directory-sec" style="display:none;">
  <div class="directory-inner">
    <div class="sec-tag">Local Directory</div>
    <h2 class="sec-title">Explore ${dest.name}</h2>
    <div class="dir-cats">
      <div class="dir-cat" onclick="loadCategory('hotels')">
        <div class="dir-cat-icon">🏨</div>
        <div class="dir-cat-name">Where to Stay</div>
        <div class="dir-cat-count" id="count-hotels">Loading...</div>
      </div>
      <div class="dir-cat" onclick="loadCategory('tours')">
        <div class="dir-cat-icon">🧭</div>
        <div class="dir-cat-name">Tours & Experiences</div>
        <div class="dir-cat-count" id="count-tours">Loading...</div>
      </div>
      <div class="dir-cat" onclick="loadCategory('transport')">
        <div class="dir-cat-icon">🚗</div>
        <div class="dir-cat-name">Transportation</div>
        <div class="dir-cat-count" id="count-transport">Loading...</div>
      </div>
      <div class="dir-cat" onclick="loadCategory('restaurants')">
        <div class="dir-cat-icon">🍽️</div>
        <div class="dir-cat-name">Where to Eat</div>
        <div class="dir-cat-count" id="count-restaurants">Loading...</div>
      </div>
    </div>
    <div id="dir-panel" class="dir-panel">
      <div class="dir-panel-header">
        <div class="dir-panel-title" id="dir-panel-title"></div>
        <a class="dir-panel-close" onclick="closePanel()">✕ Close</a>
      </div>
      <div id="dir-panel-content" class="dir-listings"></div>
    </div>
  </div>
</section>


<section class="plan-trip">
  <div class="plan-trip-inner">
    <div class="sec-tag">Plan Your Trip</div>
    <h2 class="sec-title">Book Your ${dest.name} Adventure</h2>
    <div class="plan-trip-grid">
      <div class="plan-trip-card">
        <div class="plan-trip-cat">✈️ Flights</div>
        <div class="plan-trip-links">
          <a href="https://aviasales.tpo.lu/aKl7hWzz" target="_blank" class="plan-trip-link">🔍 Aviasales</a>
          <a href="https://cheapoair.tpo.lu/oVzDnpo9" target="_blank" class="plan-trip-link">💸 CheapOair</a>
          <a href="https://trip.tpo.lu/tOQAQ2WQ" target="_blank" class="plan-trip-link">🌍 Trip.com</a>
        </div>
      </div>
      <div class="plan-trip-card">
        <div class="plan-trip-cat">🏨 Hotels</div>
        <div class="plan-trip-links">
          <a href="https://booking.tpo.lu/OcdV3VzY" target="_blank" class="plan-trip-link">🏨 Booking.com</a>
          <a href="https://agoda.tpo.lu/vv7Jhln0" target="_blank" class="plan-trip-link">🌺 Agoda</a>
          <a href="https://expedia.tpo.lu/CgKszVA3" target="_blank" class="plan-trip-link">✈️ Expedia</a>
          <a href="https://hostelworld.tpo.lu/NesOTknC" target="_blank" class="plan-trip-link">🎒 Hostelworld</a>
        </div>
      </div>
      <div class="plan-trip-card">
        <div class="plan-trip-cat">🎯 Tours & Activities</div>
        <div class="plan-trip-links">
          <a href="https://klook.tpo.lu/CqpbC7mj" target="_blank" class="plan-trip-link">🎡 Klook</a>
          <a href="https://viator.tpo.lu/ZrcFpdKy" target="_blank" class="plan-trip-link">🗺️ Viator</a>
          <a href="https://tripadvisor.tpo.lu/jmUAb3Nt" target="_blank" class="plan-trip-link">⭐ TripAdvisor</a>
        </div>
      </div>
      <div class="plan-trip-card">
        <div class="plan-trip-cat">🌍 All in One</div>
        <div class="plan-trip-links">
          <a href="https://trip.tpo.lu/tOQAQ2WQ" target="_blank" class="plan-trip-link">🌍 Trip.com</a>
          <a href="https://expedia.tpo.lu/CgKszVA3" target="_blank" class="plan-trip-link">✈️ Expedia</a>
          <a href="https://tripadvisor.tpo.lu/jmUAb3Nt" target="_blank" class="plan-trip-link">⭐ TripAdvisor</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="local-cta">
  <div class="local-cta-inner">
    <div class="local-cta-tag">🌴 For Local Business Owners</div>
    <h2 class="local-cta-title">You know this island better than any travel guide ever will.</h2>
    <p class="local-cta-text">The best Caribbean experiences aren't on the big booking sites — they're the hidden gems, the family restaurants, the tours run by people who actually grew up here. Help us change that. Add your listing on Caribex for free and let travelers discover ${dest.name} through the people who actually live it.</p>
    <p class="local-cta-sub">No commissions. No fees. No contracts. Just your slice of paradise, shared with the world.</p>
    <div class="local-cta-btns">
      <a href="/caribex/list-your-business" class="btn-list">Add Your Listing Free →</a>
      <a href="#" class="btn-share" onclick="shareCaribex(event)">📲 Share with Someone Who Should</a>
    </div>
  </div>
</section>

<section class="assist-strip">
  <div class="assist-strip-inner">
    <div>
      <h2>Ask Sun About ${dest.name}</h2>
      <p>Get personalized recommendations, insider tips and travel advice about ${dest.name} — from someone who knows every corner of the Caribbean.</p>
      <a href="/caribex#assistant" class="btn-white">🌴 Talk to Sun ☀️ →</a>
    </div>
    <div style="background:rgba(255,255,255,0.1);border-radius:16px;padding:1.5rem;border:1px solid rgba(255,255,255,0.2);">
      <div style="font-size:0.75rem;color:rgba(255,255,255,0.6);margin-bottom:0.8rem;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">Ask anything like:</div>
      <div style="display:flex;flex-direction:column;gap:0.5rem;">
        <div style="font-size:0.82rem;color:#fff;">🏖️ "What's the best beach for families?"</div>
        <div style="font-size:0.82rem;color:#fff;">🍽️ "Where should I eat like a local?"</div>
        <div style="font-size:0.82rem;color:#fff;">📅 "When's the best time to visit?"</div>
        <div style="font-size:0.82rem;color:#fff;">💰 "What's a realistic daily budget?"</div>
      </div>
    </div>
  </div>
</section>

<footer>
  <div class="footer-logo">Carib<span>ex</span></div>
  <div style="margin-bottom:1rem;display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
    <a href="/caribex" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.82rem;">Portal</a>
    <a href="/insights" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.82rem;">Insights</a>
    <a href="/about" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.82rem;">About</a>
    <a href="/privacidad" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.82rem;">Privacy</a>
    <a href="/terminos" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.82rem;">Terms</a>
    <a href="https://www.instagram.com/caribex2026/" target="_blank" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.82rem;">📷 Instagram</a>
    <a href="https://www.facebook.com/profile.php?id=61586089233617" target="_blank" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.82rem;">👍 Facebook</a>
  </div>
  <div class="footer-info">© 2026 Caribex — Your Caribbean Expert · Ivamar AI LLC</div>
</footer>

<script>
const DEST_SLUG = '${dest.slug}';
const DEST_NAME = '${dest.name}';
const CAT_NAMES = { hotels: 'Where to Stay', tours: 'Tours & Experiences', transport: 'Transportation', restaurants: 'Where to Eat' };

async function loadCounts() {
  const cats = ['hotels','tours','transport','restaurants'];
  for (const cat of cats) {
    try {
      const r = await fetch('/api/listings/' + DEST_SLUG + '/' + cat);
      const d = await r.json();
      const count = d.listings ? d.listings.length : 0;
      document.getElementById('count-' + cat).textContent = count > 0 ? count + ' listed' : 'Be the first →';
    } catch(e) {
      document.getElementById('count-' + cat).textContent = 'Be the first →';
    }
  }
}

async function loadCategory(cat) {
  const panel = document.getElementById('dir-panel');
  const title = document.getElementById('dir-panel-title');
  const content = document.getElementById('dir-panel-content');
  title.textContent = CAT_NAMES[cat] + ' in ' + DEST_NAME;
  content.innerHTML = '<p style="color:#888;text-align:center;padding:2rem">Loading...</p>';
  panel.classList.add('active');
  panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  try {
    const r = await fetch('/api/listings/' + DEST_SLUG + '/' + cat);
    const d = await r.json();
    const listings = d.listings || [];
    if (listings.length === 0) {
      content.innerHTML = '<div class="dir-empty"><p>No listings yet for this category in ' + DEST_NAME + '.</p><a href="/caribex/list-your-business">Be the first to list your business →</a></div>';
      return;
    }
    content.innerHTML = listings.map(function(l) {
      var html = '<div class="dir-listing">';
      html += '<div class="dir-listing-img"><img src="' + l.photo + '" alt="' + l.name + '"></div>';
      html += '<div class="dir-listing-body">';
      html += '<div class="dir-listing-name">' + l.name + '</div>';
      html += '<div class="dir-listing-desc">' + l.desc + '</div>';
      if (l.price) html += '<div class="dir-listing-price">' + l.price + '</div>';
      html += '<div class="dir-listing-contact">';
      if (l.whatsapp) html += '<a href="https://wa.me/' + l.whatsapp.replace(/[^0-9]/g,'') + '" target="_blank" class="dir-contact-btn dir-contact-wa">💬 WhatsApp</a>';
      if (l.website) html += '<a href="' + l.website + '" target="_blank" class="dir-contact-btn dir-contact-web">🌐 Website</a>';
      html += '</div></div></div>';
      return html;
    }).join('');
  } catch(e) {
    content.innerHTML = '<div class="dir-empty"><p>Could not load listings. Please try again.</p></div>';
  }
}

function closePanel() {
  document.getElementById('dir-panel').classList.remove('active');
}

function shareCaribex(e) {
  e.preventDefault();
  const msg = encodeURIComponent("Hey! I found this Caribbean travel site that lists hotels, tours and restaurants for free — no commissions, no fees. Thought you or someone you know might be interested: https://yourcaribbeanexpert.com/caribex/list-your-business 🌴");
  window.open("https://wa.me/?text=" + msg, "_blank");
}

loadCounts();
${_sc}

</body>
</html>
`;
};
