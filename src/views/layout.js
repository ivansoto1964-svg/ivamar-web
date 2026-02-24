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
    </body>
  </html>
  `;
};
