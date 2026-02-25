module.exports = function layout({ title, body }) {
  return `
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>${title}</title>
      <style>
        :root{--bg:#0b1220;--card:#0f172a;--muted:#94a3b8;--text:#e2e8f0;--accent:#22c55e;}
        body{margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;background:linear-gradient(180deg,#070b14, var(--bg));color:var(--text);}
        .wrap{max-width:980px;margin:0 auto;padding:28px;}
        .nav{display:flex;gap:16px;align-items:center;justify-content:space-between;margin-bottom:28px;}
        .nav a{color:var(--muted);text-decoration:none;font-weight:700}
        .nav a:hover{color:var(--text)}
        .brand{display:flex;gap:10px;align-items:center}
        .dot{width:10px;height:10px;border-radius:999px;background:var(--accent);box-shadow:0 0 18px rgba(34,197,94,.6)}
        .card{background:rgba(15,23,42,.85);border:1px solid rgba(148,163,184,.15);border-radius:18px;padding:26px;box-shadow:0 12px 40px rgba(0,0,0,.35)}
        h1{font-size:44px;line-height:1.05;margin:0 0 10px}
        h2{margin:0 0 10px}
        p{color:var(--muted);font-size:18px;line-height:1.45}
        .btns{display:flex;gap:12px;flex-wrap:wrap;margin-top:14px}
        .btn{display:inline-block;padding:12px 16px;border-radius:12px;font-weight:900;text-decoration:none}
        .btn.primary{background:var(--accent);color:#06110b}
        .btn.ghost{border:1px solid rgba(148,163,184,.25);color:var(--text)}
        .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:18px}
        .tile{padding:14px;border-radius:14px;border:1px solid rgba(148,163,184,.15);background:rgba(2,6,23,.35)}
        .tile b{display:block;margin-bottom:6px;color:var(--text)}
        .footer{margin-top:28px;color:var(--muted);font-size:13px}
        @media (max-width:860px){.grid{grid-template-columns:1fr}h1{font-size:36px}}
/* IvA Chat */
.iva-fab{
  position:fixed;right:18px;bottom:18px;z-index:9999;
  width:56px;height:56px;border-radius:999px;border:0;
  background:var(--accent);color:#04110a;font-weight:900;
  box-shadow:0 18px 50px rgba(0,0,0,.45);
  cursor:pointer;
}
.iva-panel{
  position:fixed;right:18px;bottom:86px;z-index:9999;
  width:min(360px, calc(100vw - 36px));
  height:520px;max-height:70vh;
  display:none;flex-direction:column;
  background:rgba(15,23,42,.92);
  border:1px solid rgba(148,163,184,.18);
  border-radius:18px;overflow:hidden;
  box-shadow:0 22px 70px rgba(0,0,0,.55);
  backdrop-filter: blur(10px);
}
.iva-head{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-bottom:1px solid rgba(148,163,184,.12)}
.iva-title{display:flex;gap:10px;align-items:center}
.iva-title b{font-size:14px}
.iva-title span{color:var(--muted);font-size:12px}
.iva-close{background:transparent;border:0;color:var(--muted);cursor:pointer;font-size:18px;line-height:1}
.iva-body{padding:12px;overflow:auto;flex:1}
.iva-msg{margin:10px 0;display:flex}
.iva-msg.user{justify-content:flex-end}
.iva-bubble{
  max-width:85%;
  padding:10px 12px;border-radius:14px;
  border:1px solid rgba(148,163,184,.12);
  background:rgba(2,6,23,.55);
  color:var(--text);font-size:13px;line-height:1.35
}
.iva-msg.user .iva-bubble{background:rgba(34,197,94,.14);border-color:rgba(34,197,94,.25)}
.iva-foot{display:flex;gap:10px;padding:12px;border-top:1px solid rgba(148,163,184,.12)}
.iva-input{
  flex:1;padding:12px 12px;border-radius:12px;
  border:1px solid rgba(148,163,184,.18);
  background:rgba(2,6,23,.55);color:var(--text);
  outline:none;
}
.iva-send{
  padding:12px 14px;border-radius:12px;border:0;
  background:var(--accent);color:#04110a;font-weight:900;cursor:pointer;
}

      </style>
    </head>
    <body>
      <div class="wrap">
        <div class="nav">
          <div class="brand">
            <span class="dot"></span>
            <a href="/" style="color:var(--text);font-weight:900">Ivamar AI</a>
          </div>
          <div style="display:flex;gap:14px;flex-wrap:wrap">
            <a href="/demo">Demo</a>
            <a href="/pricing">Precios</a>
            <a href="/contact">Contacto</a>
          </div>
        </div>

        ${body}
        <div class="footer">
          © ${new Date().getFullYear()} Ivamar AI · Hecho para negocios que quieren vender más sin comisiones.
        </div>
      </div>
<!-- IvA Chat Widget -->
<button class="iva-fab" id="ivaFab" aria-label="Abrir chat">IvA</button>

<div class="iva-panel" id="ivaPanel" role="dialog" aria-label="Chat IvA">
  <div class="iva-head">
    <div class="iva-title">
      <span class="dot"></span>
      <div>
        <b>IvA</b><br/>
        <span>Asistente de Ivamar AI</span>
      </div>
    </div>
    <button class="iva-close" id="ivaClose" aria-label="Cerrar">×</button>
  </div>

  <div class="iva-body" id="ivaBody"></div>

  <div class="iva-foot">
    <input class="iva-input" id="ivaInput" placeholder="Escribe aquí… (ej: precios, demo, cómo funciona)" />
    <button class="iva-send" id="ivaSend">Enviar</button>
  </div>
</div>

<script>
  (function(){
    const fab = document.getElementById("ivaFab");
    const panel = document.getElementById("ivaPanel");
    const closeBtn = document.getElementById("ivaClose");
    const body = document.getElementById("ivaBody");
    const input = document.getElementById("ivaInput");
    const send = document.getElementById("ivaSend");

    function addMsg(text, who){
      const row = document.createElement("div");
      row.className = "iva-msg " + (who === "user" ? "user" : "bot");
      const bubble = document.createElement("div");
      bubble.className = "iva-bubble";
      bubble.textContent = text;
      row.appendChild(bubble);
      body.appendChild(row);
      body.scrollTop = body.scrollHeight;
    }

    async function ask(message){
      try{
        const res = await fetch("/api/assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message })
        });
        const data = await res.json();
        addMsg(data.reply || "Hmm… ahora mismo no pude responder. Intenta de nuevo.", "bot");
      }catch(e){
        addMsg("Ups. Hubo un problema conectando con IvA. Intenta otra vez.", "bot");
      }
    }

    function open(){
      panel.style.display = "flex";
      fab.style.display = "none";
      if (!body.dataset.welcomed){
        addMsg("👋 Soy IvA. Pregúntame por precios, demo o cómo funciona.", "bot");
        body.dataset.welcomed = "1";
      }
      setTimeout(()=>input.focus(), 50);
    }

    function close(){
      panel.style.display = "none";
      fab.style.display = "block";
    }

    fab.addEventListener("click", open);
    closeBtn.addEventListener("click", close);

    async function sendMsg(){
      const msg = (input.value || "").trim();
      if(!msg) return;
      input.value = "";
      addMsg(msg, "user");
      await ask(msg);
    }

    send.addEventListener("click", sendMsg);
    input.addEventListener("keydown", (e)=>{
      if(e.key === "Enter") sendMsg();
      if(e.key === "Escape") close();
    });
  })();
</script>

    </body>
  </html>
  `;
};
