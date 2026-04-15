module.exports = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400&display=swap');
.iva-lang {
  font-family: 'Syne', sans-serif;
  background: #030508;
  color: #F0F4FF;
  margin: -20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 2rem;
}
.iva-lang * { box-sizing: border-box; margin: 0; padding: 0; }
.iva-lang::before {
  content: '';
  position: absolute; inset: 0;
  background-image: linear-gradient(rgba(0,229,200,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,200,0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%);
}
.iva-lang-orb {
  position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none;
}
.iva-lang-orb-1 { width: 500px; height: 500px; background: rgba(0,229,200,0.07); top: -100px; left: 50%; transform: translateX(-50%); }
.iva-lang-orb-2 { width: 300px; height: 300px; background: rgba(232,201,122,0.05); bottom: 0; right: 0; }

.iva-lang-content {
  position: relative;
  text-align: center;
  max-width: 600px;
  width: 100%;
}

.iva-lang-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 3rem;
}
.iva-lang-logo-mark {
  width: 44px; height: 44px;
  border: 2px solid #00E5C8;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem; color: #00E5C8;
  background: rgba(0,229,200,0.06);
}
.iva-lang-logo-text { font-size: 1.4rem; font-weight: 700; color: #F0F4FF; letter-spacing: -0.02em; }
.iva-lang-logo-text span { color: #00E5C8; }

.iva-lang-tagline {
  font-family: 'Instrument Serif', serif;
  font-style: italic;
  font-size: clamp(1.6rem, 4vw, 2.5rem);
  color: #F0F4FF;
  margin-bottom: 0.8rem;
  line-height: 1.2;
}
.iva-lang-sub {
  font-size: 0.88rem;
  color: #4A5568;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 3.5rem;
}

.iva-lang-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
  margin-bottom: 2rem;
}

.iva-lang-card {
  background: rgba(13,20,32,0.8);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  text-decoration: none;
  color: #F0F4FF;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
  display: block;
}
.iva-lang-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, #00E5C8, transparent);
  opacity: 0; transition: opacity 0.3s;
}
.iva-lang-card:hover {
  border-color: rgba(0,229,200,0.3);
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(0,229,200,0.1);
}
.iva-lang-card:hover::before { opacity: 1; }

.iva-lang-flag { font-size: 3rem; margin-bottom: 1rem; display: block; }
.iva-lang-name { font-size: 1.3rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 0.3rem; }
.iva-lang-desc { font-size: 0.8rem; color: #8892A4; font-weight: 400; }
.iva-lang-arrow {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 1.2rem;
  font-size: 0.8rem;
  color: #00E5C8;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.05em;
}

.iva-lang-footer {
  font-size: 0.72rem;
  color: #2D3748;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.05em;
}

@media (max-width: 480px) {
  .iva-lang-cards { grid-template-columns: 1fr; gap: 1rem; }
  .iva-lang-card { padding: 2rem 1.5rem; }
}
</style>

<div class="iva-lang">
  <div class="iva-lang-orb iva-lang-orb-1"></div>
  <div class="iva-lang-orb iva-lang-orb-2"></div>

  <div class="iva-lang-content">
    <div class="iva-lang-logo">
      <div class="iva-lang-logo-mark">IvA</div>
      <span class="iva-lang-logo-text">Ivamar <span>AI</span></span>
    </div>

    <div class="iva-lang-tagline">The Human Touch<br>of Intelligence</div>
    <div class="iva-lang-sub">Select your language · Selecciona tu idioma</div>

    <div class="iva-lang-cards">
      <a href="/en" class="iva-lang-card">
        <span class="iva-lang-flag">🇺🇸</span>
        <div class="iva-lang-name">English</div>
        <div class="iva-lang-desc">Continue in English</div>
        <div class="iva-lang-arrow">Continue →</div>
      </a>
      <a href="/es" class="iva-lang-card">
        <span class="iva-lang-flag">🇵🇷</span>
        <div class="iva-lang-name">Español</div>
        <div class="iva-lang-desc">Continuar en español</div>
        <div class="iva-lang-arrow">Continuar →</div>
      </a>
    </div>

    <div class="iva-lang-footer">© 2025 Ivamar AI LLC · Delaware, USA</div>
  </div>
</div>
`;
