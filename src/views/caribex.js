module.exports = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Caribex — Your Caribbean Expert</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'DM Sans',sans-serif;background:#fff;color:#1a1a1a;overflow-x:hidden;}
:root{
  --teal:#00B4D8;
  --deep:#0077B6;
  --sand:#F4E8D0;
  --dark:#0D1B2A;
  --mid:#555;
  --border:#E0EEF4;
  --green:#52B788;
}

/* NAV */
nav{background:rgba(255,255,255,0.95);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);padding:0 2rem;display:flex;align-items:center;justify-content:space-between;height:64px;position:sticky;top:0;z-index:100;}
.nav-logo{display:flex;align-items:center;gap:0.6rem;text-decoration:none;}
.nav-logo img{height:36px;}
.nav-logo-text{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:700;color:var(--dark);}
.nav-logo-text span{color:var(--teal);}
.nav-links{display:flex;align-items:center;gap:1.8rem;}
.nav-links a{font-size:0.82rem;color:var(--mid);text-decoration:none;font-weight:500;transition:color 0.2s;}
.nav-links a:hover{color:var(--teal);}
.nav-cta{background:var(--deep);color:#fff!important;padding:0.55rem 1.2rem;border-radius:6px;font-weight:700;font-size:0.8rem!important;}
.nav-cta:hover{background:var(--teal)!important;}

/* HERO */
.hero{position:relative;min-height:90vh;display:flex;align-items:center;overflow:hidden;background:linear-gradient(160deg,#0D1B2A 0%,#023E8A 50%,#0077B6 100%);}
.hero-waves{position:absolute;bottom:0;left:0;width:100%;overflow:hidden;line-height:0;}
.hero-inner{max-width:1100px;margin:0 auto;padding:5rem 2rem;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;position:relative;z-index:1;}
.hero-badge{display:inline-flex;align-items:center;gap:0.5rem;background:rgba(0,180,216,0.15);border:1px solid rgba(0,180,216,0.3);padding:0.3rem 0.8rem;border-radius:4px;margin-bottom:1.2rem;}
.hero-badge-dot{width:6px;height:6px;background:var(--teal);border-radius:50%;animation:pulse 2s infinite;}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
.hero-badge-text{font-size:0.65rem;color:#90E0EF;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;}
.hero h1{font-family:'Playfair Display',serif;font-size:clamp(2.5rem,5vw,4rem);font-weight:700;line-height:1.15;color:#fff;margin-bottom:1.2rem;}
.hero h1 em{color:#90E0EF;font-style:italic;}
.hero-sub{font-size:1rem;color:rgba(255,255,255,0.65);line-height:1.8;margin-bottom:2rem;max-width:460px;}
.hero-btns{display:flex;gap:0.8rem;flex-wrap:wrap;}
.btn-teal{display:inline-flex;align-items:center;gap:0.5rem;background:var(--teal);color:#fff;padding:0.9rem 1.8rem;border-radius:6px;font-size:0.88rem;font-weight:700;text-decoration:none;transition:all 0.2s;}
.btn-teal:hover{background:#00C4E8;transform:translateY(-1px);}
.btn-outline-w{display:inline-flex;align-items:center;gap:0.5rem;border:1.5px solid rgba(255,255,255,0.3);color:#fff;padding:0.9rem 1.8rem;border-radius:6px;font-size:0.88rem;font-weight:600;text-decoration:none;transition:all 0.2s;}
.btn-outline-w:hover{border-color:#fff;}

/* HERO STATS */
.hero-stats{display:flex;gap:2rem;margin-top:2.5rem;}
.h-stat{border-left:2px solid var(--teal);padding-left:1rem;}
.h-stat-num{font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:700;color:#fff;line-height:1;}
.h-stat-label{font-size:0.68rem;color:rgba(255,255,255,0.5);margin-top:0.2rem;}

/* HERO VISUAL */
.hero-visual{position:relative;}
.dest-grid{display:grid;grid-template-columns:1fr 1fr;gap:0.8rem;}
.dest-card{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:12px;padding:1rem;transition:all 0.2s;cursor:pointer;}
.dest-card:hover{background:rgba(255,255,255,0.15);border-color:var(--teal);}
.dest-card-flag{font-size:1.5rem;margin-bottom:0.4rem;}
.dest-card-name{font-size:0.82rem;font-weight:700;color:#fff;}
.dest-card-type{font-size:0.65rem;color:rgba(255,255,255,0.5);}
.dest-card.featured{background:rgba(0,180,216,0.15);border-color:var(--teal);}

/* TAGLINE */
.tagline{padding:4rem 2rem;background:var(--sand);text-align:center;}
.tagline h2{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,4vw,3rem);font-weight:700;color:var(--dark);line-height:1.2;max-width:700px;margin:0 auto 1rem;}
.tagline h2 em{color:var(--teal);font-style:italic;}
.tagline p{font-size:0.95rem;color:var(--mid);line-height:1.8;max-width:600px;margin:0 auto;}

/* DESTINATIONS */
.destinations{padding:5rem 2rem;background:#fff;}
.dest-inner{max-width:1200px;margin:0 auto;}
.sec-tag{font-size:0.65rem;font-weight:700;color:var(--teal);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:0.5rem;}
.sec-title{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:700;color:var(--dark);margin-bottom:0.5rem;line-height:1.15;}
.sec-title em{color:var(--teal);font-style:italic;}
.sec-sub{font-size:0.88rem;color:var(--mid);line-height:1.7;max-width:520px;margin-bottom:3rem;}

/* REGION TABS */
.region-tabs{display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:2rem;}
.region-tab{font-size:0.75rem;padding:0.4rem 1rem;border:1.5px solid var(--border);border-radius:20px;color:var(--mid);cursor:pointer;transition:all 0.2s;background:#fff;font-family:'DM Sans',sans-serif;}
.region-tab.active,.region-tab:hover{background:var(--teal);color:#fff;border-color:var(--teal);}

.islands-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.2rem;}
.island-card{border-radius:16px;overflow:hidden;border:1px solid var(--border);transition:all 0.25s;cursor:pointer;text-decoration:none;}
.island-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,119,182,0.12);}
.island-card-img{height:160px;display:flex;align-items:center;justify-content:center;font-size:3.5rem;position:relative;}
.island-card-body{padding:1rem;}
.island-card-name{font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;color:var(--dark);margin-bottom:0.2rem;}
.island-card-region{font-size:0.65rem;color:var(--teal);font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.4rem;}
.island-card-desc{font-size:0.75rem;color:var(--mid);line-height:1.5;}
.island-tag{display:inline-block;font-size:0.6rem;font-weight:700;padding:0.15rem 0.5rem;border-radius:4px;margin-top:0.6rem;}
.tag-beach{background:#E0F7FA;color:#0077B6;}
.tag-culture{background:#F3E5F5;color:#7B1FA2;}
.tag-nature{background:#E8F5E9;color:#2E7D32;}
.tag-luxury{background:#FFF8E1;color:#F57F17;}

/* MAINLAND CARIBE */
.mainland{padding:5rem 2rem;background:#F0F8FF;}
.mainland-inner{max-width:1200px;margin:0 auto;}
.mainland-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:2.5rem;}
.mainland-card{background:#fff;border-radius:16px;padding:1.5rem;border:1px solid var(--border);transition:all 0.2s;}
.mainland-card:hover{border-color:var(--teal);transform:translateY(-2px);}
.mainland-flag{font-size:2rem;margin-bottom:0.8rem;}
.mainland-country{font-size:0.65rem;font-weight:700;color:var(--teal);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.3rem;}
.mainland-city{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;color:var(--dark);margin-bottom:0.5rem;}
.mainland-desc{font-size:0.78rem;color:var(--mid);line-height:1.6;}

/* ASSISTANT */
.assist-sec{padding:5rem 2rem;background:var(--dark);}
.assist-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;}
.assist-tag{font-size:0.65rem;font-weight:700;color:var(--teal);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:0.5rem;}
.assist-title{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:700;color:#fff;margin-bottom:1rem;line-height:1.15;}
.assist-title em{color:#90E0EF;font-style:italic;}
.assist-sub{font-size:0.92rem;color:rgba(255,255,255,0.6);line-height:1.8;margin-bottom:1.5rem;}
.assist-features{list-style:none;display:flex;flex-direction:column;gap:0.8rem;margin-bottom:2rem;}
.assist-features li{display:flex;align-items:flex-start;gap:0.7rem;font-size:0.85rem;color:rgba(255,255,255,0.7);}
.assist-features li::before{content:'✦';color:var(--teal);flex-shrink:0;font-size:0.7rem;margin-top:3px;}

/* CHAT */
.chat-box{background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,0.3);}
.chat-header{background:linear-gradient(135deg,var(--deep),var(--teal));padding:1rem 1.2rem;display:flex;align-items:center;gap:0.8rem;}
.chat-avatar{width:38px;height:38px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;}
.chat-name{font-size:0.85rem;font-weight:700;color:#fff;}
.chat-status{font-size:0.62rem;color:rgba(255,255,255,0.75);}
.chat-msgs{padding:1.2rem;background:#F8FBFF;display:flex;flex-direction:column;gap:0.8rem;min-height:200px;}
.c-bot{max-width:88%;background:#fff;border:1px solid var(--border);border-radius:4px 12px 12px 12px;padding:0.75rem 1rem;font-size:0.82rem;line-height:1.6;color:#1a1a1a;align-self:flex-start;box-shadow:0 1px 4px rgba(0,0,0,0.05);}
.c-user{max-width:88%;background:var(--deep);border-radius:12px 4px 12px 12px;padding:0.75rem 1rem;font-size:0.82rem;line-height:1.6;color:#fff;align-self:flex-end;}
.chat-suggs{padding:0 1rem 0.8rem;background:#F8FBFF;display:flex;flex-wrap:wrap;gap:0.4rem;}
.chat-sugg{font-size:0.68rem;padding:0.3rem 0.7rem;border:1px solid var(--border);border-radius:20px;color:var(--mid);cursor:pointer;background:#fff;font-family:'DM Sans',sans-serif;transition:all 0.2s;}
.chat-sugg:hover{border-color:var(--teal);color:var(--teal);}
.chat-footer{padding:0.8rem;border-top:1px solid var(--border);display:flex;gap:0.5rem;background:#fff;}
.chat-input{flex:1;border:1px solid var(--border);border-radius:8px;padding:0.6rem 0.9rem;font-size:0.78rem;outline:none;font-family:'DM Sans',sans-serif;}
.chat-send{background:var(--teal);border:none;border-radius:8px;width:34px;height:34px;cursor:pointer;color:#fff;font-size:0.85rem;}

/* BLOG */
.blog-sec{padding:5rem 2rem;background:#fff;}
.blog-inner{max-width:1100px;margin:0 auto;}
.blog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:2.5rem;}
.blog-card{border-radius:14px;overflow:hidden;border:1px solid var(--border);transition:all 0.2s;text-decoration:none;}
.blog-card:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,119,182,0.1);}
.blog-card-img{height:140px;display:flex;align-items:center;justify-content:center;font-size:3rem;background:linear-gradient(135deg,#E0F7FA,#B3E5FC);}
.blog-card-body{padding:1.2rem;}
.blog-card-tag{font-size:0.62rem;font-weight:700;color:var(--teal);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:0.4rem;}
.blog-card-title{font-family:'Playfair Display',serif;font-size:0.95rem;font-weight:700;color:var(--dark);line-height:1.4;margin-bottom:0.4rem;}
.blog-card-desc{font-size:0.72rem;color:var(--mid);line-height:1.5;}

/* NEWSLETTER */
.newsletter{padding:4rem 2rem;background:var(--sand);text-align:center;}
.newsletter h2{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3.5vw,2.4rem);font-weight:700;color:var(--dark);margin-bottom:0.8rem;}
.newsletter p{font-size:0.88rem;color:var(--mid);margin-bottom:1.5rem;}
.nl-form{display:flex;gap:0.5rem;max-width:420px;margin:0 auto;flex-wrap:wrap;justify-content:center;}
.nl-input{flex:1;min-width:220px;border:1.5px solid var(--border);border-radius:8px;padding:0.75rem 1rem;font-size:0.85rem;outline:none;font-family:'DM Sans',sans-serif;}
.nl-btn{background:var(--deep);color:#fff;border:none;border-radius:8px;padding:0.75rem 1.5rem;font-size:0.85rem;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.2s;}
.nl-btn:hover{background:var(--teal);}

/* FOOTER */
footer{background:var(--dark);padding:3rem 2rem 1.5rem;}
.footer-inner{max-width:1100px;margin:0 auto;}
.footer-top{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:2rem;margin-bottom:2rem;}
.footer-brand{font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:700;color:#fff;margin-bottom:0.5rem;}
.footer-brand span{color:var(--teal);}
.footer-desc{font-size:0.78rem;color:rgba(255,255,255,0.4);line-height:1.6;}
.footer-col h4{font-size:0.72rem;font-weight:700;color:rgba(255,255,255,0.5);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.8rem;}
.footer-col a{display:block;font-size:0.78rem;color:rgba(255,255,255,0.4);text-decoration:none;margin-bottom:0.4rem;transition:color 0.2s;}
.footer-col a:hover{color:var(--teal);}
.footer-bottom{border-top:1px solid rgba(255,255,255,0.07);padding-top:1.5rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;}
.footer-copy{font-size:0.68rem;color:rgba(255,255,255,0.25);}
.footer-powered{font-size:0.65rem;color:rgba(255,255,255,0.2);}
.footer-powered a{color:rgba(0,180,216,0.4);text-decoration:none;}

@media(max-width:768px){
nav{padding:0 1rem;}.nav-links{display:none;}
.hero-inner{grid-template-columns:1fr;gap:2rem;padding:3rem 1.2rem;}.hero-visual{display:none;}
.hero-stats{gap:1.2rem;}
.tagline{padding:3rem 1rem;}
.destinations{padding:3rem 1rem;}.islands-grid{grid-template-columns:1fr 1fr;}
.mainland{padding:3rem 1rem;}.mainland-grid{grid-template-columns:1fr;}
.assist-sec{padding:3rem 1rem;}.assist-inner{grid-template-columns:1fr;}
.blog-sec{padding:3rem 1rem;}.blog-grid{grid-template-columns:1fr;}
.footer-top{grid-template-columns:1fr 1fr;}
}
</style>
</head>
<body>

<!-- NAV -->
<nav>
  <a href="/" class="nav-logo">
    <img src="https://blogger.googleusercontent.com/img/a/AVvXsEjpryXDEJMBPjbd8FSKV1-c8spW4EIniI5IMWd2ZVda8eF70jvonP3Yc-Xa0O6X0Mcz60oiIhE7rxYdktN7Fnvrx4MKVuUzQ2ZYHhZcDho3gr-PWL0Vk_ZfqsjT1Pasls4QT95BPUyzAH5lLbX0Pr4t1hrDaLzqmnQSdrSdTtM31aWxIEPWC1xRlpe3L1w=s272" alt="Caribex">
    <span class="nav-logo-text">Carib<span>ex</span></span>
  </a>
  <div class="nav-links">
    <a href="#destinations">Destinations</a>
    <a href="#mainland">Mainland Caribbean</a>
    <a href="#assistant">Caribex AI</a>
    <a href="https://www.yourcaribbeanexpert.com" target="_blank">Blog</a>
    <a href="#assistant" class="nav-cta">Plan My Trip →</a>
  </div>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-inner">
    <div>
      <div class="hero-badge">
        <div class="hero-badge-dot"></div>
        <span class="hero-badge-text">The Caribbean — Beyond the Islands</span>
      </div>
      <h1>The Caribbean Is Not<br>One Destination.<br><em>It's a World.</em></h1>
      <p class="hero-sub">From the turquoise waters of the Bahamas to the colonial streets of Cartagena, the Mayan ruins of Tulum to the rainforests of Costa Rica — Caribex guides you through the real Caribbean.</p>
      <div class="hero-btns">
        <a href="#assistant" class="btn-teal">🌴 Plan My Caribbean Trip</a>
        <a href="#destinations" class="btn-outline-w">Explore Destinations →</a>
      </div>
      <div class="hero-stats">
        <div class="h-stat">
          <div class="h-stat-num">30+</div>
          <div class="h-stat-label">Destinations</div>
        </div>
        <div class="h-stat">
          <div class="h-stat-num">10+</div>
          <div class="h-stat-label">Countries</div>
        </div>
        <div class="h-stat">
          <div class="h-stat-num">1</div>
          <div class="h-stat-label">Caribbean Soul</div>
        </div>
      </div>
    </div>
    <div class="hero-visual">
      <div class="dest-grid">
        <div class="dest-card featured">
          <div class="dest-card-flag">🇵🇷</div>
          <div class="dest-card-name">Puerto Rico</div>
          <div class="dest-card-type">Island · Culture · History</div>
        </div>
        <div class="dest-card">
          <div class="dest-card-flag">🇩🇴</div>
          <div class="dest-card-name">Dominican Rep.</div>
          <div class="dest-card-type">Island · Beach · Music</div>
        </div>
        <div class="dest-card">
          <div class="dest-card-flag">🇨🇴</div>
          <div class="dest-card-name">Cartagena</div>
          <div class="dest-card-type">Mainland · Colonial · Art</div>
        </div>
        <div class="dest-card">
          <div class="dest-card-flag">🇲🇽</div>
          <div class="dest-card-name">Tulum</div>
          <div class="dest-card-type">Mexico · Ruins · Nature</div>
        </div>
        <div class="dest-card">
          <div class="dest-card-flag">🇯🇲</div>
          <div class="dest-card-name">Jamaica</div>
          <div class="dest-card-type">Island · Music · Vibes</div>
        </div>
        <div class="dest-card">
          <div class="dest-card-flag">🇧🇿</div>
          <div class="dest-card-name">Belize</div>
          <div class="dest-card-type">Mainland · Reef · Jungle</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- TAGLINE -->
<section class="tagline">
  <h2>"Exploring the Caribbean through<br><em>culture, history, and travel."</em></h2>
  <p>The Caribbean is not a color. It is a feeling — shaped by sound, pace, food, history and the rhythm of its people. Caribex goes beyond the postcard.</p>
</section>

<!-- ISLAND DESTINATIONS -->
<section class="destinations" id="destinations">
  <div class="dest-inner">
    <div class="sec-tag">Caribbean Islands</div>
    <h2 class="sec-title">Island <em>Destinations</em></h2>
    <p class="sec-sub">Each island has its own rhythm, culture and character. Discover what makes each one unique.</p>
    <div class="region-tabs">
      <div class="region-tab active">All Islands</div>
      <div class="region-tab">Greater Antilles</div>
      <div class="region-tab">Lesser Antilles</div>
      <div class="region-tab">Dutch Caribbean</div>
      <div class="region-tab">Bahamas & Turks</div>
    </div>
    <div class="islands-grid">
      <a href="https://www.yourcaribbeanexpert.com" target="_blank" class="island-card">
        <div class="island-card-img" style="background:linear-gradient(135deg,#006994,#00A8CC);">🇵🇷</div>
        <div class="island-card-body">
          <div class="island-card-region">Greater Antilles</div>
          <div class="island-card-name">Puerto Rico</div>
          <div class="island-card-desc">Old San Juan, El Yunque rainforest, bioluminescent bays and the soul of the Caribbean in one island.</div>
          <span class="island-tag tag-culture">Culture</span>
          <span class="island-tag tag-beach">Beach</span>
        </div>
      </a>
      <a href="https://www.yourcaribbeanexpert.com" target="_blank" class="island-card">
        <div class="island-card-img" style="background:linear-gradient(135deg,#1B4332,#40916C);">🇩🇴</div>
        <div class="island-card-body">
          <div class="island-card-region">Greater Antilles</div>
          <div class="island-card-name">Dominican Republic</div>
          <div class="island-card-desc">Punta Cana, Santo Domingo's colonial zone, merengue nights and the warmest hospitality in the Caribbean.</div>
          <span class="island-tag tag-beach">Beach</span>
          <span class="island-tag tag-culture">Culture</span>
        </div>
      </a>
      <a href="https://www.yourcaribbeanexpert.com" target="_blank" class="island-card">
        <div class="island-card-img" style="background:linear-gradient(135deg,#003049,#0077B6);">🇨🇺</div>
        <div class="island-card-body">
          <div class="island-card-region">Greater Antilles</div>
          <div class="island-card-name">Cuba</div>
          <div class="island-card-desc">Havana's vintage cars, Viñales tobacco fields, salsa rhythms and a history unlike anywhere else on earth.</div>
          <span class="island-tag tag-culture">Culture</span>
          <span class="island-tag tag-nature">Nature</span>
        </div>
      </a>
      <a href="https://www.yourcaribbeanexpert.com" target="_blank" class="island-card">
        <div class="island-card-img" style="background:linear-gradient(135deg,#5C4033,#8D6E63);">🇯🇲</div>
        <div class="island-card-body">
          <div class="island-card-region">Greater Antilles</div>
          <div class="island-card-name">Jamaica</div>
          <div class="island-card-desc">Reggae birthplace, Blue Mountains coffee, Dunn's River Falls and the most laid-back Caribbean vibes.</div>
          <span class="island-tag tag-culture">Culture</span>
          <span class="island-tag tag-beach">Beach</span>
        </div>
      </a>
      <a href="https://www.yourcaribbeanexpert.com" target="_blank" class="island-card">
        <div class="island-card-img" style="background:linear-gradient(135deg,#F4A261,#E76F51);">🇧🇧</div>
        <div class="island-card-body">
          <div class="island-card-region">Lesser Antilles</div>
          <div class="island-card-name">Barbados</div>
          <div class="island-card-desc">Elegant and refined, rum distilleries, coral reefs and the sophisticated side of the Caribbean.</div>
          <span class="island-tag tag-luxury">Luxury</span>
          <span class="island-tag tag-beach">Beach</span>
        </div>
      </a>
      <a href="https://www.yourcaribbeanexpert.com" target="_blank" class="island-card">
        <div class="island-card-img" style="background:linear-gradient(135deg,#0096C7,#48CAE4);">🇦🇼</div>
        <div class="island-card-body">
          <div class="island-card-region">Dutch Caribbean</div>
          <div class="island-card-name">Aruba</div>
          <div class="island-card-desc">Perpetual sunshine, Eagle Beach, windsurfing paradise and the most consistently beautiful weather in the Caribbean.</div>
          <span class="island-tag tag-beach">Beach</span>
          <span class="island-tag tag-luxury">Luxury</span>
        </div>
      </a>
      <a href="https://www.yourcaribbeanexpert.com" target="_blank" class="island-card">
        <div class="island-card-img" style="background:linear-gradient(135deg,#2D6A4F,#52B788);">🇹🇹</div>
        <div class="island-card-body">
          <div class="island-card-region">Lesser Antilles</div>
          <div class="island-card-name">Trinidad & Tobago</div>
          <div class="island-card-desc">Carnival capital, steelpan birthplace, Asa Wright bird sanctuary and two completely different island personalities.</div>
          <span class="island-tag tag-culture">Culture</span>
          <span class="island-tag tag-nature">Nature</span>
        </div>
      </a>
      <a href="https://www.yourcaribbeanexpert.com" target="_blank" class="island-card">
        <div class="island-card-img" style="background:linear-gradient(135deg,#023E8A,#0096C7);">🇧🇸</div>
        <div class="island-card-body">
          <div class="island-card-region">Bahamas</div>
          <div class="island-card-name">The Bahamas</div>
          <div class="island-card-desc">700 islands, the clearest water on the planet, swimming pigs and the closest thing to paradise you'll find.</div>
          <span class="island-tag tag-beach">Beach</span>
          <span class="island-tag tag-luxury">Luxury</span>
        </div>
      </a>
    </div>
  </div>
</section>

<!-- MAINLAND CARIBBEAN -->
<section class="mainland" id="mainland">
  <div class="mainland-inner">
    <div class="sec-tag">Mainland Caribbean</div>
    <h2 class="sec-title">The Caribbean <em>Beyond the Islands</em></h2>
    <p class="sec-sub">The Caribbean region extends far beyond the sea. These mainland destinations share the same soul — tropical, vibrant and deeply cultural.</p>
    <div class="mainland-grid">
      <div class="mainland-card">
        <div class="mainland-flag">🇲🇽</div>
        <div class="mainland-country">Mexico</div>
        <div class="mainland-city">Tulum · Cancún · Holbox · Cozumel</div>
        <div class="mainland-desc">Mayan ruins meet Caribbean waters. Tulum's bohemian cenotes, Cancún's vibrant energy, Holbox's barefoot beaches and Cozumel's world-class diving.</div>
      </div>
      <div class="mainland-card">
        <div class="mainland-flag">🇨🇴</div>
        <div class="mainland-country">Colombia</div>
        <div class="mainland-city">Cartagena · Santa Marta · San Andrés</div>
        <div class="mainland-desc">Colonial Cartagena's walled city, Santa Marta's Tayrona National Park, and San Andrés — a Caribbean island that belongs to Colombia.</div>
      </div>
      <div class="mainland-card">
        <div class="mainland-flag">🇨🇷</div>
        <div class="mainland-country">Costa Rica</div>
        <div class="mainland-city">Puerto Viejo · Tortuguero · Limón</div>
        <div class="mainland-desc">The Caribbean coast of Costa Rica is a world apart — Afro-Caribbean culture, sea turtle nesting and jungle rivers flowing to the sea.</div>
      </div>
      <div class="mainland-card">
        <div class="mainland-flag">🇧🇿</div>
        <div class="mainland-country">Belize</div>
        <div class="mainland-city">Ambergris Caye · Placencia · Hopkins</div>
        <div class="mainland-desc">The second largest barrier reef on earth, Mayan ruins, jungle rivers and a laid-back Caribbean culture unlike anywhere else in Central America.</div>
      </div>
      <div class="mainland-card">
        <div class="mainland-flag">🇻🇪</div>
        <div class="mainland-country">Venezuela</div>
        <div class="mainland-city">Isla Margarita · Los Roques · Mochima</div>
        <div class="mainland-desc">Los Roques archipelago — one of the most pristine Caribbean destinations — plus Margarita's beaches and Mochima's turquoise bays.</div>
      </div>
      <div class="mainland-card">
        <div class="mainland-flag">🇵🇦</div>
        <div class="mainland-country">Panama</div>
        <div class="mainland-city">Bocas del Toro · San Blas · Colón</div>
        <div class="mainland-desc">Bocas del Toro's colorful water bungalows, the pristine Guna Yala (San Blas) islands and the historic Canal connecting two oceans.</div>
      </div>
    </div>
  </div>
</section>

<!-- CARIBEX AI ASSISTANT -->
<section class="assist-sec" id="assistant">
  <div class="assist-inner">
    <div>
      <div class="assist-tag">Caribex AI</div>
      <h2 class="assist-title">Your Personal<br><em>Caribbean Guide</em></h2>
      <p class="assist-sub">Talk to Caribex AI — our expert assistant knows every corner of the Caribbean. Ask anything about destinations, culture, travel tips or the best time to visit.</p>
      <ul class="assist-features">
        <li>Personalized destination recommendations</li>
        <li>Best time to visit each destination</li>
        <li>Culture, food and local insights</li>
        <li>Island vs mainland comparison</li>
        <li>Budget and luxury travel guidance</li>
        <li>Responds in English and Spanish</li>
      </ul>
      <a href="https://chatgpt.com/g/g-6920ae7344a88191bac385443bc46a64-caribex-ai-your-caribbean-expert" target="_blank" class="btn-teal">Talk to Caribex AI →</a>
    </div>
    <div class="chat-box">
      <div class="chat-header">
        <div class="chat-avatar">🌴</div>
        <div>
          <div class="chat-name">Caribex AI — Your Caribbean Expert</div>
          <div class="chat-status">● Online · Knows every corner of the Caribbean</div>
        </div>
      </div>
      <div class="chat-msgs" id="caribexMsgs">
        <div class="c-bot">Hi! 🌴 I'm Caribex AI, your personal Caribbean guide.<br><br>I can help you find the perfect Caribbean destination based on your travel style — beach, culture, adventure or luxury.<br><br>What kind of Caribbean experience are you looking for?</div>
      </div>
      <div class="chat-suggs">
        <button class="chat-sugg" onclick="caribexReply(this)">Best beach destination</button>
        <button class="chat-sugg" onclick="caribexReply(this)">Cultural experience</button>
        <button class="chat-sugg" onclick="caribexReply(this)">Off the beaten path</button>
        <button class="chat-sugg" onclick="caribexReply(this)">Family friendly</button>
      </div>
      <div class="chat-footer">
        <input class="chat-input" id="caribexInput" placeholder="Ask me anything about the Caribbean..." onkeydown="if(event.key==='Enter')caribexSend()">
        <button class="chat-send" onclick="caribexSend()">➤</button>
      </div>
    </div>
  </div>
</section>

<!-- BLOG -->
<section class="blog-sec">
  <div class="blog-inner">
    <div class="sec-tag">From the Blog</div>
    <h2 class="sec-title">Caribbean <em>Insights</em></h2>
    <p class="sec-sub">Thoughtful stories about Caribbean culture, travel and regional insight — beyond the surface.</p>
    <div class="blog-grid">
      <a href="https://www.yourcaribbeanexpert.com/2026/03/not-all-turquoise-beaches-mean-same.html" target="_blank" class="blog-card">
        <div class="blog-card-img">🏖️</div>
        <div class="blog-card-body">
          <div class="blog-card-tag">Caribbean Travel</div>
          <div class="blog-card-title">Not All Turquoise Beaches Mean the Same Thing</div>
          <div class="blog-card-desc">Two beaches may share the same shade of blue and offer completely different experiences.</div>
        </div>
      </a>
      <a href="https://www.yourcaribbeanexpert.com/2026/02/choosing-caribbean-is-not-choosing.html" target="_blank" class="blog-card">
        <div class="blog-card-img">🌊</div>
        <div class="blog-card-body">
          <div class="blog-card-tag">Travel Mindset</div>
          <div class="blog-card-title">Choosing the Caribbean Is Not Choosing a Beach</div>
          <div class="blog-card-desc">It's choosing a rhythm, a culture and a context that shapes the entire experience.</div>
        </div>
      </a>
      <a href="https://www.yourcaribbeanexpert.com/2025/12/the-caribbean-is-not-one-destination_30.html" target="_blank" class="blog-card">
        <div class="blog-card-img">🌴</div>
        <div class="blog-card-body">
          <div class="blog-card-tag">Caribbean Insights</div>
          <div class="blog-card-title">The Caribbean Is Not One Destination</div>
          <div class="blog-card-desc">The first thing every traveler should understand before planning their Caribbean trip.</div>
        </div>
      </a>
    </div>
    <div style="text-align:center;margin-top:2rem;">
      <a href="https://www.yourcaribbeanexpert.com" target="_blank" class="btn-teal">Read All Articles →</a>
    </div>
  </div>
</section>

<!-- NEWSLETTER -->
<section class="newsletter">
  <h2>Stay Ahead of the Caribbean</h2>
  <p>Travel insights, destination guides and hidden gems — delivered to your inbox.</p>
  <div class="nl-form">
    <input class="nl-input" type="email" placeholder="your@email.com">
    <button class="nl-btn">Subscribe</button>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-inner">
    <div class="footer-top">
      <div>
        <div class="footer-brand">Carib<span>ex</span></div>
        <div class="footer-desc">Your Caribbean Expert — exploring the Caribbean through culture, history and travel. Beyond the surface.</div>
      </div>
      <div class="footer-col">
        <h4>Destinations</h4>
        <a href="#destinations">Islands</a>
        <a href="#mainland">Mainland</a>
        <a href="#assistant">Plan a Trip</a>
      </div>
      <div class="footer-col">
        <h4>Explore</h4>
        <a href="https://www.yourcaribbeanexpert.com" target="_blank">Blog</a>
        <a href="https://www.yourcaribbeanexpert.com/p/about-caribex.html" target="_blank">About</a>
        <a href="https://www.yourcaribbeanexpert.com/p/contact_17.html" target="_blank">Contact</a>
      </div>
      <div class="footer-col">
        <h4>Legal</h4>
        <a href="https://www.yourcaribbeanexpert.com/p/terms-of-service.html" target="_blank">Terms</a>
        <a href="https://www.yourcaribbeanexpert.com/p/privacy-policy_01097434756.html" target="_blank">Privacy</a>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-copy">© 2026 Caribex — Your Caribbean Expert. All rights reserved.</div>
      <div class="footer-powered">A project by <a href="https://ivamarai.com" target="_blank">Ivamar AI LLC</a> · Delaware, USA</div>
    </div>
  </div>
</footer>

<script>
let caribexHistory = [];
let caribexTyping = false;

async function callCaribex(message) {
  try {
    const res = await fetch('/api/iva-sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        history: caribexHistory,
        lang: 'en',
        context: { businessType: 'Caribbean travel guide' },
        systemOverride: \`You are Caribex AI, an expert Caribbean travel guide created by Caribex (yourcaribbeanexpert.com).

You know everything about the Caribbean region — including:
- Islands: Puerto Rico, Dominican Republic, Cuba, Jamaica, Barbados, Trinidad & Tobago, Aruba, Curaçao, Bahamas, Haiti, Martinique, Guadeloupe, St. Lucia, Grenada, Cayman Islands, US Virgin Islands, and more
- Mainland Caribbean: Mexico (Tulum, Cancún, Holbox, Cozumel), Colombia (Cartagena, Santa Marta, San Andrés), Costa Rica (Caribbean coast), Belize, Venezuela (Los Roques, Margarita), Panama (Bocas del Toro, San Blas), Guatemala (Livingston), Honduras (Roatán)

Your expertise includes:
- Best time to visit each destination
- Culture, food, music and history
- Beach types — resort, boutique, remote, cultural
- Adventure vs relaxation travel
- Budget vs luxury options
- Hidden gems and off the beaten path
- Comparison between destinations

RULES:
1. Be warm, knowledgeable and passionate about the Caribbean
2. Give specific, useful recommendations
3. Maximum 4 sentences per response
4. Always ask a follow-up question to narrow down recommendations
5. Never say "AI" — you are the Caribex travel expert
6. Direct users to yourcaribbeanexpert.com for more articles\`
      })
    });
    const data = await res.json();
    const reply = data.reply || "I'm having a quick issue. Visit yourcaribbeanexpert.com for more Caribbean insights!";
    caribexHistory.push({ role: 'user', content: message });
    caribexHistory.push({ role: 'assistant', content: reply });
    if (caribexHistory.length > 20) caribexHistory = caribexHistory.slice(-20);
    return reply;
  } catch(e) {
    return "I'm having a quick issue. Visit yourcaribbeanexpert.com for more Caribbean insights!";
  }
}

function showTyping() {
  const msgs = document.getElementById('caribexMsgs');
  const div = document.createElement('div');
  div.className = 'c-bot';
  div.id = 'caribexTyping';
  div.innerHTML = '<span style="opacity:0.5">Caribex is typing...</span>';
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function removeTyping() {
  const el = document.getElementById('caribexTyping');
  if (el) el.remove();
}

function addMsg(text, type) {
  const msgs = document.getElementById('caribexMsgs');
  const div = document.createElement('div');
  div.className = type === 'user' ? 'c-user' : 'c-bot';
  div.innerHTML = text.replace(/\*\*/g, '').split('\n').join('<br>');
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

async function caribexReply(el) {
  if (caribexTyping) return;
  const text = el.textContent;
  document.querySelectorAll('.chat-sugg').forEach(b => b.disabled = true);
  addMsg(text, 'user');
  caribexTyping = true;
  showTyping();
  const reply = await callCaribex(text);
  removeTyping();
  addMsg(reply, 'bot');
  caribexTyping = false;
}

async function caribexSend() {
  if (caribexTyping) return;
  const input = document.getElementById('caribexInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  addMsg(text, 'user');
  caribexTyping = true;
  showTyping();
  const reply = await callCaribex(text);
  removeTyping();
  addMsg(reply, 'bot');
  caribexTyping = false;
}
</script>
</body>
</html>
`;