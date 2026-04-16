module.exports = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400&display=swap');
.iva-login{font-family:'Syne',sans-serif;background:#030508;color:#F0F4FF;margin:-20px;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem;position:relative;overflow:hidden;}
.iva-login *{box-sizing:border-box;margin:0;padding:0;}
.iva-login::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(0,229,200,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,200,0.04) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 80%);-webkit-mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 80%);}
.iva-login-orb{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none;width:400px;height:400px;background:rgba(0,229,200,0.07);top:50%;left:50%;transform:translate(-50%,-50%);}
.iva-login-card{background:#0D1420;border:1px solid rgba(0,229,200,0.15);border-radius:20px;padding:2.5rem;width:100%;max-width:420px;position:relative;overflow:hidden;}
.iva-login-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#00E5C8,transparent);}
.iva-login-logo{display:flex;align-items:center;gap:0.7rem;margin-bottom:2rem;justify-content:center;}
.iva-login-logo-mark{width:36px;height:36px;border:1.5px solid #00E5C8;border-radius:9px;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:0.75rem;color:#00E5C8;background:rgba(0,229,200,0.06);}
.iva-login-logo-text{font-size:1.2rem;font-weight:700;color:#F0F4FF;letter-spacing:-0.02em;}
.iva-login-logo-text span{color:#00E5C8;}
.iva-login-title{font-size:1.5rem;font-weight:800;letter-spacing:-0.02em;margin-bottom:0.4rem;text-align:center;}
.iva-login-sub{font-size:0.82rem;color:#8892A4;text-align:center;margin-bottom:2rem;font-family:'JetBrains Mono',monospace;letter-spacing:0.05em;}
.iva-login-field{margin-bottom:1rem;}
.iva-login-field label{display:block;font-size:0.72rem;color:#8892A4;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:0.4rem;}
.iva-login-field input{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:0.75rem 1rem;color:#F0F4FF;font-family:'Syne',sans-serif;font-size:0.95rem;outline:none;transition:border-color 0.2s,box-shadow 0.2s;}
.iva-login-field input:focus{border-color:#00E5C8;box-shadow:0 0 0 3px rgba(0,229,200,0.08);}
.iva-login-btn{width:100%;padding:0.9rem;background:#00E5C8;color:#030508;border:none;border-radius:10px;font-family:'Syne',sans-serif;font-weight:700;font-size:1rem;cursor:pointer;transition:all 0.25s;margin-top:0.5rem;}
.iva-login-btn:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(0,229,200,0.3);}
.iva-login-error{background:rgba(255,77,77,0.1);border:1px solid rgba(255,77,77,0.3);color:#ff6b6b;padding:0.7rem 1rem;border-radius:8px;font-size:0.82rem;margin-bottom:1rem;display:none;text-align:center;}
.iva-login-back{text-align:center;margin-top:1.5rem;font-size:0.78rem;color:#4A5568;}
.iva-login-back a{color:#00E5C8;text-decoration:none;}
.iva-login-back a:hover{text-decoration:underline;}
</style>

<div class="iva-login">
  <div class="iva-login-orb"></div>
  <div class="iva-login-card">
    <div class="iva-login-logo">
      <div class="iva-login-logo-mark">IvA</div>
      <span class="iva-login-logo-text">Ivamar <span>AI</span></span>
    </div>
    <div class="iva-login-title">Admin Panel</div>
    <div class="iva-login-sub">SECURE ACCESS · ACCESO SEGURO</div>
    <div class="iva-login-error" id="loginError">Usuario o contraseña incorrectos</div>
    <div class="iva-login-field">
      <label>Usuario / Username</label>
      <input type="text" id="loginUser" placeholder="tu-negocio o admin" autocomplete="username" />
    </div>
    <div class="iva-login-field">
      <label>Contraseña / Password</label>
      <input type="password" id="loginPass" placeholder="••••••••" autocomplete="current-password" onkeydown="if(event.key==='Enter')doLogin()" />
    </div>
    <button class="iva-login-btn" onclick="doLogin()">Entrar →</button>
    <div class="iva-login-back"><a href="/">← Volver a ivamarai.com</a></div>
  </div>
</div>

<script>
function doLogin() {
  const user = document.getElementById('loginUser').value.trim().toLowerCase();
  const pass = document.getElementById('loginPass').value.trim();
  if (!user || !pass) { showError('Por favor completa todos los campos'); return; }
  
  fetch('/admin/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user, pass })
  })
  .then(r => r.json())
  .then(data => {
    if (data.ok) {
      window.location.href = data.redirect;
    } else {
      showError('Usuario o contraseña incorrectos');
    }
  })
  .catch(() => showError('Error de conexión. Intenta de nuevo.'));
}

function showError(msg) {
  const el = document.getElementById('loginError');
  el.textContent = msg;
  el.style.display = 'block';
  setTimeout(() => el.style.display = 'none', 4000);
}
</script>
`;
