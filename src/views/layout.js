function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

module.exports = function layout({ title = "Ivamar AI", body = "", lang = "es" } = {}) {
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
<link rel="icon" href="/favicon.gif" type="image/gif">
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${escapeHtml(title)}</title>
<link rel="icon" href="/favicon.gif" type="image/gif">  
<style>
    :root{
      --bg:#ffffff; --panel:#f8f9fa; --text:#1a1a2e; --muted:#666666;
      --accent:#00C896; --border:rgba(0,0,0,.08);
    }
    body{ margin:0; font-family:'Plus Jakarta Sans',-apple-system,system-ui,sans-serif; background:var(--bg); color:var(--text); }
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    .wrap{ max-width:1100px; margin:0 auto; padding:24px 16px; }
    a{ color:inherit; }

    .grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:16px; margin-top:12px; }
    .tile{ background:#fff; border:1px solid var(--border); border-radius:12px; padding:14px; transition:all .15s ease; box-shadow:0 2px 8px rgba(0,0,0,0.04); }
    .tile:hover{ transform:translateY(-2px); box-shadow:0 8px 20px rgba(0,0,0,0.08); }

    /* BUTTONS */
    .btn{ display:inline-flex; align-items:center; justify-content:center; padding:10px 18px; border-radius:10px; font-weight:700; font-size:0.9rem; cursor:pointer; text-decoration:none; border:none; transition:all 0.2s; }
    .btn.primary{ background:#00C896; color:#fff; }
    .btn.primary:hover{ opacity:0.9; transform:translateY(-1px); }
    .btn.ghost{ background:transparent; color:#1a1a2e; border:1px solid #e5e7eb; }
    .btn.ghost:hover{ border-color:#1a1a2e; }
    .btns{ display:flex; gap:10px; flex-wrap:wrap; }

    /* FORMS */
    .ivamar-form input,
    .ivamar-form select,
    .ivamar-form textarea{
      width:100%; display:block;
      background:#ffffff;
      border:1px solid #e5e7eb;
      border-radius:8px;
      color:var(--text);
      font-family:inherit;
      font-size:0.9rem;
      outline:none;
    }
    .ivamar-form label{ display:block; font-size:0.8rem; color:var(--muted); margin-bottom:4px; margin-top:12px; }

    /* CARD */
    .card{ background:#fff; border:1px solid #f0f0f0; border-radius:16px; padding:20px; margin-bottom:16px; box-shadow:0 2px 12px rgba(0,0,0,0.04); }

  </style>
</head>

<body>
${body}
</body>
</html>`;
};
