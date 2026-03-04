/**
 * src/views/layout.js
 * Layout base + IvA Chat Widget
 *
 * Fixes:
 * - Elimina llaves sueltas que rompen el <script>
 * - Linkify sin regex con backslashes (para evitar escapes rotos en templates)
 * - Incluye CTA fijo al Google Form + leadUrl constante
 */

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
      --accent:#6ee7ff; --border:rgba(255,255,255,.12);
    }
    body{ margin:0; font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif; background:var(--bg); color:var(--text); }
    .wrap{ max-width:1100px; margin:0 auto; padding:24px 16px; }
    a{ color:inherit; }

    /* IvA Chat */
    .iva-fab{
      position:fixed; right:18px; bottom:18px;
      width:58px; height:58px; border-radius:999px;
      background:var(--accent); border:none; cursor:pointer;
      box-shadow:0 14px 30px rgba(0,0,0,.35);
      display:flex; align-items:center; justify-content:center;
      font-weight:900; color:#001014; z-index:9999;
    }
    .iva-panel{
      position:fixed; right:18px; bottom:18px;
      width:min(420px, calc(100vw - 36px));
      height:560px;
      background:var(--panel);
      border:1px solid var(--border);
      border-radius:18px;
      display:none;
      flex-direction:column;
      overflow:hidden;
      box-shadow:0 18px 50px rgba(0,0,0,.45);
      z-index:10000;
    }
    .iva-head{
      padding:12px;
      display:flex; align-items:center; justify-content:space-between;
      border-bottom:1px solid var(--border);
      gap:10px;
    }
    .iva-brand{ display:flex; align-items:center; gap:10px; }
    .iva-dot{ width:10px; height:10px; border-radius:999px; background:var(--accent); box-shadow:0 0 0 4px rgba(110,231,255,.15); }
    .iva-title{ font-weight:900; letter-spacing:.2px; }
    .iva-sub{ font-size:12px; color:var(--muted); margin-top:2px; }
    .iva-close{
      border:1px solid var(--border);
      background:transparent;
      color:var(--text);
      border-radius:12px;
      padding:8px 10px;
      cursor:pointer;
    }

    .iva-body{ padding:12px; overflow:auto; flex:1; }
    .iva-msg{ display:flex; margin:10px 0; }
    .iva-msg.user{ justify-content:flex-end; }
    .iva-bubble{
      max-width:82%;
      padding:10px 12px;
      border-radius:16px;
      border:1px solid var(--border);
      background:rgba(255,255,255,.03);
      line-height:1.25;
      font-size:14px;
      word-wrap:break-word;
    }
    .iva-msg.user .iva-bubble{
      background:rgba(110,231,255,.10);
      border-color:rgba(110,231,255,.25);
    }
    .iva-bubble a{ color:var(--accent); text-decoration:underline; }

    .iva-cta{
      padding:10px 12px;
      border-top:1px solid var(--border);
      background:rgba(255,255,255,.02);
      display:flex; gap:10px; align-items:center; justify-content:space-between;
    }
    .iva-cta small{ color:var(--muted); }
    .iva-cta a{
      display:inline-flex; align-items:center; gap:8px;
      padding:10px 12px; border-radius:12px;
      border:1px solid rgba(110,231,255,.35);
      background:rgba(110,231,255,.10);
      color:var(--text);
      text-decoration:none;
      font-weight:900;
      white-space:nowrap;
    }

    .iva-foot{
      border-top:1px solid var(--border);
      padding:10px;
      display:flex; gap:10px; align-items:center;
      background:rgba(0,0,0,.12);
    }
    .iva-input{
      flex:1;
      padding:10px 12px;
      border-radius:12px;
      border:1px solid var(--border);
      background:rgba(255,255,255,.04);
      color:var(--text);
      outline:none;
    }
    .iva-send{
      padding:10px 14px;
      border-radius:12px;
      border:none;
      background:var(--accent);
      color:#001014;
      font-weight:900;
      cursor:pointer;
    }
  </style>
</head>

<body>
  <div class="wrap">
    ${body}
  </div>

  <!-- IvA Chat Widget -->
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
      <button class="iva-close" id="ivaClose" aria-label="Cerrar">Cerrar</button>
    </div>

    <div class="iva-body" id="ivaBody"></div>

    <div class="iva-cta">
      <small>¿Quieres demo o cotización?</small>
      <a href="https://forms.gle/cW7qTdj5zTx2S4ZH7" target="_blank" rel="noopener noreferrer">
        Abrir Google Form →
      </a>
    </div>

    <div class="iva-foot">
      <input class="iva-input" id="ivaInput" placeholder="Escribe aquí…" autocomplete="off" />
      <button class="iva-send" id="ivaSend">Enviar</button>
    </div>
  </div>

  <script>
    (function(){
      const leadUrl = "https://forms.gle/cW7qTdj5zTx2S4ZH7";

      const fab = document.getElementById("ivaFab");
      const panel = document.getElementById("ivaPanel");
      const closeBtn = document.getElementById("ivaClose");
      const body = document.getElementById("ivaBody");
      const input = document.getElementById("ivaInput");
      const send = document.getElementById("ivaSend");

      function escapeHtmlLocal(str){
        return String(str)
          .replaceAll("&","&amp;")
          .replaceAll("<","&lt;")
          .replaceAll(">","&gt;")
          .replaceAll('"',"&quot;")
          .replaceAll("'","&#039;");
      }

      function linkify(text){
        const safe = escapeHtmlLocal(text);
        const parts = safe.split(" ");
        for (let i = 0; i < parts.length; i++) {
          const p = parts[i];
          if (p.startsWith("http://") || p.startsWith("https://")) {
            parts[i] = '<a href="' + p + '" target="_blank" rel="noopener noreferrer">' + p + "</a>";
          }
        }
        return parts.join(" ");
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

      async function ask(message){
        const controller = new AbortController();
        const t = setTimeout(() => controller.abort(), 15000);
        send.disabled = true;
        send.textContent = "...";

        try{
          const res = await fetch("/api/assistant", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
            signal: controller.signal
          });

          const raw = await res.text();
          let data = null;
          try{ data = raw ? JSON.parse(raw) : null; }catch(_){ data = null; }

          if(!res.ok){
            addMsg("⚠️ IvA respondió con error (" + res.status + "). Intenta otra vez.", "bot");
            return;
          }

          addMsg((data && data.reply) ? data.reply : "Hmm… ahora mismo no pude responder. Intenta de nuevo.", "bot");
        }catch(e){
          const msg = (e && e.name === "AbortError")
            ? "⏳ Se tardó demasiado. Intenta otra vez."
            : "Ups. Hubo un problema conectando con IvA. Intenta otra vez.";
          addMsg(msg, "bot");
        }finally{
          clearTimeout(t);
          send.disabled = false;
          send.textContent = "Enviar";
        }
      }

      function open(){
        panel.style.display = "flex";
        fab.style.display = "none";
        if(!body.dataset.welcomed){
          body.dataset.welcomed = "1";
          addMsg("Soy IvA y estoy aquí para orientarte. Si quieres una demo/cotización, usa el botón de abajo o este enlace: " + leadUrl, "bot");
        }
        input.focus();
      }

      function close(){
        panel.style.display = "none";
        fab.style.display = "flex";
      }

      fab.addEventListener("click", open);
      closeBtn.addEventListener("click", close);

      send.addEventListener("click", () => {
        const msg = (input.value || "").trim();
        if(!msg) return;
        addMsg(msg, "user");
        input.value = "";
        ask(msg);
      });

      input.addEventListener("keydown", (e) => {
        if(e.key === "Enter") send.click();
      });
    })();
  </script>
</body>
</html>`;
};
