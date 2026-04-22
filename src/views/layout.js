function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

module.exports = function layout({ title = "Ivamar AI", body = "" } = {}) {
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <style>
    :root{
      --bg:#0b0b0f; --panel:#12121a; --text:#f5f5f7; --muted:#b7b7c2;
      --accent:#00E5C8; --border:rgba(255,255,255,.12);
    }
    body{ margin:0; font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif; background:var(--bg); color:var(--text); }
    .wrap{ max-width:1100px; margin:0 auto; padding:24px 16px; }
    a{ color:inherit; }

    .grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:16px; margin-top:12px; }
    .tile{ background:var(--panel); border:1px solid var(--border); border-radius:12px; padding:14px; transition:transform .15s ease; }
    .tile:hover{ transform:translateY(-2px); }

    /* BUTTONS */
    .btn{ display:inline-flex; align-items:center; justify-content:center; padding:10px 18px; border-radius:10px; font-weight:700; font-size:0.9rem; cursor:pointer; text-decoration:none; border:none; transition:all 0.2s; }
    .btn.primary{ background:var(--accent); color:#001014; }
    .btn.primary:hover{ opacity:0.9; transform:translateY(-1px); }
    .btn.ghost{ background:transparent; color:var(--text); border:1px solid var(--border); }
    .btn.ghost:hover{ border-color:rgba(255,255,255,0.3); }
    .btns{ display:flex; gap:10px; flex-wrap:wrap; }

    /* FORMS */
    .ivamar-form input,
    .ivamar-form select,
    .ivamar-form textarea{
      width:100%; display:block;
      background:rgba(255,255,255,0.05);
      border:1px solid var(--border);
      border-radius:8px;
      color:var(--text);
      font-family:inherit;
      font-size:0.9rem;
      outline:none;
    }
    .ivamar-form label{ display:block; font-size:0.8rem; color:var(--muted); margin-bottom:4px; margin-top:12px; }

    /* CARD */
    .card{ background:var(--panel); border:1px solid var(--border); border-radius:16px; padding:20px; margin-bottom:16px; }

    /* IvA Chat Widget */
    .iva-fab{
      position:fixed; right:18px; bottom:18px;
      width:58px; height:58px; border-radius:999px;
      background:var(--accent); border:none; cursor:pointer;
      box-shadow:0 14px 30px rgba(0,229,200,.25);
      display:flex; align-items:center; justify-content:center;
      font-weight:900; color:#001014; z-index:9999;
      font-size:0.85rem; letter-spacing:0.02em;
      animation:ivaPulse 3s ease-in-out infinite;
    }
    @keyframes ivaPulse{ 0%,100%{box-shadow:0 14px 30px rgba(0,229,200,.25)} 50%{box-shadow:0 14px 40px rgba(0,229,200,.45)} }
    .iva-panel{
      position:fixed; right:18px; bottom:18px;
      width:min(400px, calc(100vw - 36px));
      height:540px;
      background:var(--panel);
      border:1px solid rgba(0,229,200,0.2);
      border-radius:18px;
      display:none;
      flex-direction:column;
      overflow:hidden;
      box-shadow:0 18px 50px rgba(0,0,0,.5);
      z-index:10000;
    }
    .iva-head{
      padding:12px 14px;
      display:flex; align-items:center; justify-content:space-between;
      border-bottom:1px solid var(--border);
      background:rgba(0,0,0,0.2);
      gap:10px;
    }
    .iva-brand{ display:flex; align-items:center; gap:10px; }
    .iva-dot{ width:9px; height:9px; border-radius:999px; background:#4CAF50; animation:ivaBlink 2s ease-in-out infinite; }
    @keyframes ivaBlink{ 0%,100%{opacity:1} 50%{opacity:0.3} }
    .iva-title{ font-weight:900; letter-spacing:.2px; font-size:0.9rem; }
    .iva-sub{ font-size:11px; color:var(--muted); margin-top:1px; }
    .iva-close{ border:1px solid var(--border); background:transparent; color:var(--text); border-radius:8px; padding:6px 10px; cursor:pointer; font-size:0.8rem; }
    .iva-close:hover{ border-color:rgba(255,255,255,0.3); }
    .iva-body{ padding:12px; overflow:auto; flex:1; display:flex; flex-direction:column; gap:8px; }
    .iva-msg{ display:flex; }
    .iva-msg.user{ justify-content:flex-end; }
    .iva-bubble{ max-width:82%; padding:9px 12px; border-radius:14px; border:1px solid var(--border); background:rgba(255,255,255,.04); line-height:1.4; font-size:13px; word-wrap:break-word; }
    .iva-msg.user .iva-bubble{ background:rgba(0,229,200,.12); border-color:rgba(0,229,200,.25); }
    .iva-bubble a{ color:var(--accent); text-decoration:underline; }
    .iva-typing{ display:flex; gap:3px; padding:9px 12px; background:rgba(255,255,255,.04); border:1px solid var(--border); border-radius:14px; width:fit-content; }
    .iva-typing span{ width:5px; height:5px; background:var(--muted); border-radius:50%; animation:ivaTyp 1.2s ease-in-out infinite; }
    .iva-typing span:nth-child(2){ animation-delay:0.2s; }
    .iva-typing span:nth-child(3){ animation-delay:0.4s; }
    @keyframes ivaTyp{ 0%,100%{opacity:0.3;transform:scale(0.8)} 50%{opacity:1;transform:scale(1)} }
    .iva-cta{
      padding:8px 12px;
      border-top:1px solid var(--border);
      background:rgba(0,229,200,0.04);
      display:flex; gap:8px; align-items:center; justify-content:space-between;
    }
    .iva-cta small{ color:var(--muted); font-size:11px; }
    .iva-cta a{
      display:inline-flex; align-items:center; gap:6px;
      padding:7px 12px; border-radius:8px;
      border:1px solid rgba(0,229,200,.35);
      background:rgba(0,229,200,.1);
      color:var(--text); text-decoration:none;
      font-weight:700; font-size:12px; white-space:nowrap;
    }
    .iva-cta a:hover{ background:rgba(0,229,200,.2); }
    .iva-foot{ border-top:1px solid var(--border); padding:10px; display:flex; gap:8px; align-items:center; background:rgba(0,0,0,.12); }
    .iva-input{ flex:1; padding:9px 12px; border-radius:10px; border:1px solid var(--border); background:rgba(255,255,255,.04); color:var(--text); outline:none; font-size:13px; font-family:inherit; }
    .iva-input:focus{ border-color:rgba(0,229,200,0.4); }
    .iva-input::placeholder{ color:var(--muted); }
    .iva-send{ padding:9px 14px; border-radius:10px; border:none; background:var(--accent); color:#001014; font-weight:900; cursor:pointer; font-size:13px; }
    .iva-send:hover{ opacity:0.9; }
  </style>
</head>

<body>
  <div class="wrap">
    ${body}
  </div>

  <!-- IvA Chat Widget — oculto en /demo y páginas de negocios con su propio chat -->
  <script>
    // Ocultar widget en páginas que tienen su propio chat
    const hiddenPaths = ['/demo'];
    const currentPath = window.location.pathname;
    const hideWidget = hiddenPaths.includes(currentPath) ||
      (currentPath.split('/').length === 2 &&
       currentPath !== '/' &&
       !['en','es','about','contact','privacy','terms','quote','admin','start'].includes(currentPath.split('/')[1]));
  </script>

  <button class="iva-fab" id="ivaFab" aria-label="Abrir chat">IvA</button>

  <div class="iva-panel" id="ivaPanel" role="dialog" aria-label="Chat IvA">
    <div class="iva-head">
      <div class="iva-brand">
        <span class="iva-dot"></span>
        <div>
          <div class="iva-title">IvA</div>
          <div class="iva-sub">Asistente de Ivamar AI</div>
        </div>
      </div>
      <button class="iva-close" id="ivaClose">Cerrar</button>
    </div>
    <div class="iva-body" id="ivaBody"></div>
    <div class="iva-cta">
      <small>¿Cómo puedo ayudarte?</small>
      <a href="/quote">Solicitar ahora →</a>
    </div>
    <div class="iva-foot">
      <input class="iva-input" id="ivaInput" placeholder="Escribe aquí…" autocomplete="off" />
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

      // Ocultar si es página con su propio chat
      if (typeof hideWidget !== 'undefined' && hideWidget) {
        fab.style.display = 'none';
        return;
      }

      function escHtml(str){ return String(str).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;"); }

      function linkify(text){
        const safe = escHtml(text);
        return safe.split(" ").map(p =>
          (p.startsWith("http://") || p.startsWith("https://"))
            ? '<a href="' + p + '" target="_blank" rel="noopener noreferrer">' + p + "</a>"
            : p
        ).join(" ");
      }

      function addMsg(text, who){
        const row = document.createElement("div");
        row.className = "iva-msg " + (who === "user" ? "user" : "bot");
        const bubble = document.createElement("div");
        bubble.className = "iva-bubble";
        bubble.innerHTML = linkify(text);
        row.appendChild(bubble);
        body.appendChild(row);
        body.scrollTop = body.scrollHeight;
      }

      function showTyping(){
        const d = document.createElement("div");
        d.className = "iva-msg bot"; d.id = "ivaTyping";
        d.innerHTML = '<div class="iva-typing"><span></span><span></span><span></span></div>';
        body.appendChild(d); body.scrollTop = body.scrollHeight;
      }

      function hideTyping(){ const el = document.getElementById("ivaTyping"); if(el) el.remove(); }

      async function ask(message){
        send.disabled = true; send.textContent = "...";
        showTyping();
        try{
          const res = await fetch("/api/assistant", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
          });
          const data = await res.json();
          hideTyping();
          addMsg((data && data.reply) ? data.reply : "Hmm… no pude responder. Intenta de nuevo.", "bot");
        }catch(e){
          hideTyping();
          addMsg("Ups. Hubo un problema. Intenta otra vez.", "bot");
        }finally{
          send.disabled = false; send.textContent = "Enviar";
        }
      }

      function openPanel(){
        panel.style.display = "flex";
        fab.style.display = "none";
        if(!body.dataset.welcomed){
          body.dataset.welcomed = "1";
          addMsg("¡Hola! Soy IvA 👋 ¿En qué puedo ayudarte hoy? Puedo ayudarte a crear tu página con asistente de IA para tu negocio. ¿Qué tipo de negocio tienes? 🚀", "bot");
        }
        input.focus();
      }

      function closePanel(){
        panel.style.display = "none";
        fab.style.display = "flex";
      }

      fab.addEventListener("click", openPanel);
      closeBtn.addEventListener("click", closePanel);
      send.addEventListener("click", () => {
        const msg = (input.value || "").trim();
        if(!msg) return;
        addMsg(msg, "user");
        input.value = "";
        ask(msg);
      });
      input.addEventListener("keydown", (e) => { if(e.key === "Enter") send.click(); });
    })();
  </script>
</body>
</html>`;
};
