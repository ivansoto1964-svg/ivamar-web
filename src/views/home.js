module.exports = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;1,400&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
.home-sel{font-family:'Plus Jakarta Sans',sans-serif;background:#ffffff;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem;margin:-20px;}
.home-sel-inner{text-align:center;max-width:480px;width:100%;}
.home-sel-logo{display:flex;align-items:center;justify-content:center;gap:0.6rem;margin-bottom:2.5rem;}
.home-sel-logo-mark{width:36px;height:36px;background:#00C896;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:800;color:#fff;}
.home-sel-logo-text{font-size:1.2rem;font-weight:700;color:#1a1a2e;letter-spacing:-0.02em;}
.home-sel-logo-text span{color:#00C896;}
.home-sel h1{font-size:clamp(2rem,5vw,2.8rem);font-weight:800;letter-spacing:-0.03em;line-height:1.15;margin-bottom:0.8rem;color:#1a1a2e;}
.home-sel h1 em{font-family:'Lora',serif;font-style:italic;font-weight:400;color:#00C896;}
.home-sel-sub{color:#888;font-size:0.9rem;margin-bottom:2.5rem;line-height:1.6;}
.home-sel-cards{display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;margin-bottom:2.5rem;}
.home-sel-card{background:#fff;border:2px solid #f0f0f0;border-radius:16px;padding:1.8rem 2.5rem;cursor:pointer;transition:all 0.25s;text-decoration:none;color:inherit;display:flex;flex-direction:column;align-items:center;gap:0.6rem;min-width:180px;box-shadow:0 2px 12px rgba(0,0,0,0.04);}
.home-sel-card:hover{border-color:#00C896;transform:translateY(-3px);box-shadow:0 12px 32px rgba(0,200,150,0.12);}
.home-sel-card-icon{font-size:2rem;}
.home-sel-card-lang{font-size:1.1rem;font-weight:700;color:#1a1a2e;}
.home-sel-card-sub{font-size:0.75rem;color:#888;}
.home-sel-card-arrow{font-size:0.8rem;color:#00C896;font-weight:600;transition:transform 0.2s;}
.home-sel-card:hover .home-sel-card-arrow{transform:translateX(4px);}
.home-sel-footer{font-size:0.7rem;color:#ccc;line-height:1.8;}
.home-sel-footer strong{color:#aaa;}
@media(max-width:480px){.home-sel-cards{flex-direction:column;align-items:center;}.home-sel-card{width:100%;max-width:280px;}}
</style>

<div class="home-sel">
  <div class="home-sel-inner">
    <div class="home-sel-logo">
      <div class="home-sel-logo-mark">AI</div>
      <span class="home-sel-logo-text">Ivamar <span>AI</span></span>
    </div>

    <h1>The <em>Human Touch</em><br>of Intelligence</h1>
    <p class="home-sel-sub">Select your language · Selecciona tu idioma</p>

    <div class="home-sel-cards">
      <a href="/en" class="home-sel-card">
        <div class="home-sel-card-icon">🇺🇸</div>
        <div class="home-sel-card-lang">English</div>
        <div class="home-sel-card-sub">Continue in English</div>
        <div class="home-sel-card-arrow">Continue →</div>
      </a>
      <a href="/es" class="home-sel-card">
        <div class="home-sel-card-icon">🌎</div>
        <div class="home-sel-card-lang">Español</div>
        <div class="home-sel-card-sub">Continuar en español</div>
        <div class="home-sel-card-arrow">Continuar →</div>
      </a>
    </div>

    <div class="home-sel-footer">
      © 2025 <strong>Ivamar AI LLC</strong> · Delaware, USA · ivamarai.com
    </div>
  </div>
</div>
`;