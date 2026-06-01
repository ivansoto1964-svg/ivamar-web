module.exports = function renderDestination(dest) {
  return `
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4181903530685744" crossorigin="anonymous"></script>
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
.hero-bg{position:absolute;inset:0;background:${dest.gradient};opacity:0.9;}
.hero-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.5;}
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

.assist-strip{padding:4rem 2rem;background:${dest.gradient};}
.assist-strip-inner{max-width:900px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;}
.assist-strip h2{font-family:'Playfair Display',serif;font-size:clamp(1.5rem,3vw,2.2rem);font-weight:700;color:#fff;margin-bottom:0.8rem;}
.assist-strip p{font-size:0.88rem;color:rgba(255,255,255,0.75);line-height:1.7;margin-bottom:1.5rem;}
.btn-white{display:inline-flex;align-items:center;gap:0.5rem;background:#fff;color:var(--dark);padding:0.85rem 1.8rem;border-radius:6px;font-size:0.88rem;font-weight:700;text-decoration:none;transition:all 0.2s;}
.btn-white:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(0,0,0,0.15);}

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
}
</style>

<nav>
  <a href="/caribex" class="nav-logo">
    <img src="https://blogger.googleusercontent.com/img/a/AVvXsEjpryXDEJMBPjbd8FSKV1-c8spW4EIniI5IMWd2ZVda8eF70jvonP3Yc-Xa0O6X0Mcz60oiIhE7rxYdktN7Fnvrx4MKVuUzQ2ZYHhZcDho3gr-PWL0Vk_ZfqsjT1Pasls4QT95BPUyzAH5lLbX0Pr4t1hrDaLzqmnQSdrSdTtM31aWxIEPWC1xRlpe3L1w=s272" alt="Caribex">
    <span class="nav-logo-text">Carib<span>ex</span></span>
  </a>
  <a href="/caribex" class="nav-back">← All Destinations</a>
</nav>

<section class="hero">
  <img class="hero-img" src="https://api.unsplash.com/photos/random?query=${encodeURIComponent(dest.name + ' caribbean')}&client_id=UNSPLASH_KEY&w=1600&h=900" alt="${dest.name}" loading="eager" onerror="this.style.display='none'">
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
  <div class="footer-info">© 2026 Caribex — Your Caribbean Expert · A project by Ivamar AI LLC</div>
</footer>
`;
};
