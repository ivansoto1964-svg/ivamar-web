module.exports = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400&display=swap');
.home-sel{font-family:'Syne',sans-serif;background:#030508;color:#F0F4FF;margin:-20px;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden;}
.home-sel *{box-sizing:border-box;margin:0;padding:0;}
.home-sel-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(0,229,200,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,200,0.03) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 80%);}
.home-sel-orb{position:absolute;border-radius:50%;filter:blur(120px);pointer-events:none;}
.home-sel-orb-1{width:500px;height:500px;background:rgba(0,229,200,0.06);top:50%;left:50%;transform:translate(-50%,-50%);}
.home-sel-inner{position:relative;text-align:center;padding:2rem;}
.home-sel-logo{display:flex;align-items:center;justify-content:center;gap:0.8rem;margin-bottom:3rem;}
.home-sel-logo-mark{width:44px;height:44px;border:2px solid #00E5C8;border-radius:10px;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:0.8rem;color:#00E5C8;background:rgba(0,229,200,0.08);}
.home-sel-logo-text{font-size:1.4rem;font-weight:800;color:#F0F4FF;letter-spacing:-0.02em;}
.home-sel-logo-text span{color:#00E5C8;}
.home-sel-tagline{font-family:'JetBrains Mono',monospace;font-size:0.68rem;color:#00E5C8;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:0.8rem;}
.home-sel h1{font-size:clamp(2.5rem,6vw,4rem);font-weight:800;letter-spacing:-0.03em;line-height:1.05;margin-bottom:0.8rem;}
.home-sel h1 em{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;color:#00E5C8;}
.home-sel-sub{color:#8892A4;font-size:0.9rem;margin-bottom:3rem;font-weight:400;letter-spacing:0.02em;}
.home-sel-cards{display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;margin-bottom:3rem;}
.home-sel-card{background:#0D1420;border:1.5px solid rgba(255,255,255,0.07);border-radius:16px;padding:1.8rem 2.5rem;cursor:pointer;transition:all 0.3s;text-decoration:none;color:inherit;display:flex;flex-direction:column;align-items:center;gap:0.8rem;min-width:200px;}
.home-sel-card:hover{border-color:rgba(0,229,200,0.4);transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,0.3);background:rgba(0,229,200,0.04);}
.home-sel-card-icon{font-size:2rem;}
.home-sel-card-lang{font-size:1.1rem;font-weight:700;color:#F0F4FF;}
.home-sel-card-sub{font-size:0.75rem;color:#4A5568;font-family:'JetBrains Mono',monospace;letter-spacing:0.05em;}
.home-sel-card-arrow{font-size:0.8rem;color:#00E5C8;margin-top:0.3rem;transition:transform 0.2s;}
.home-sel-card:hover .home-sel-card-arrow{transform:translateX(4px);}
.home-sel-footer{font-size:0.72rem;color:#2A3040;text-align:center;line-height:1.8;}
.home-sel-footer strong{color:#4A5568;}
</style>

<div class="home-sel">
  <div class="home-sel-bg"></div>
  <div class="home-sel-orb home-sel-orb-1"></div>

  <div class="home-sel-inner">
    <div class="home-sel-logo">
      <div class="home-sel-logo-mark">IvA</div>
      <span class="home-sel-logo-text">Ivamar <span>AI</span></span>
    </div>

    <div class="home-sel-tagline">From USA to Around the World 🌎</div>
    <h1>The <em>Human Touch</em><br>of Intelligence</h1>
    <p class="home-sel-sub">Select your language · Selecciona tu idioma</p>

    <div class="home-sel-cards">
      <a href="/en" class="home-sel-card">
        <div class="home-sel-card-icon">🌐</div>
        <div class="home-sel-card-lang">English</div>
        <div class="home-sel-card-sub">Continue in English</div>
        <div class="home-sel-card-arrow">Continue →</div>
      </a>
      <a href="/es" class="home-sel-card">
        <div class="home-sel-card-icon">🌐</div>
        <div class="home-sel-card-lang">Español</div>
        <div class="home-sel-card-sub">Continuar en español</div>
        <div class="home-sel-card-arrow">Continuar →</div>
      </a>
    </div>

    <div class="home-sel-footer">
      © 2025 <strong>Ivamar AI LLC</strong> · 8 The Green, Suite B, Dover, DE 19901, USA<br>
      From USA to Around the World 🌎
    </div>
  </div>
</div>
`;
