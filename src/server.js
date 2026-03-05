const express = require("express");
const layout = require("./views/layout");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4000;

// POST JSON helper (works even if fetch() is not available)
function postJson(urlStr, payload, options = {}) {
  return new Promise((resolve, reject) => {
    try {
      const url = new URL(urlStr);
      const lib = url.protocol === "https:" ? require("https") : require("http");
      const data = Buffer.from(JSON.stringify(payload));

      const req = lib.request({
        hostname: url.hostname,
        port: url.port || (url.protocol === "https:" ? 443 : 80),
        path: url.pathname + (url.search || ""),
        method: "POST",
        headers: {
  "Content-Type": "application/json",
  "Content-Length": data.length,
  ...(options.headers || {})
},




        timeout: 15000
      }, (res) => {
        let body = "";
        res.on("data", (chunk) => body += chunk);
        res.on("end", () => resolve({ status: res.statusCode || 0, body }));
      });

      req.on("timeout", () => {
        req.destroy(new Error("timeout"));
      });
      req.on("error", reject);
      req.write(data);
      req.end();
    } catch (e) {
      reject(e);
    }
  });
}


// Home
app.get("/", (req, res) => {
  const body = `
    <div class="card">
      <h1>Landing + Asistente para negocios.</h1>
      <p>
        Tu negocio tiene una página tipo <b>ivamarai.com/tu-negocio</b>.
        Sin comisiones, directo por WhatsApp.
      </p>
      <div class="btns">
        <a class="btn primary" href="/demo">Ver demo</a>
        <a class="btn ghost" href="/pricing">Precios</a>
        <a class="btn ghost" href="/contact">Contacto</a>
      </div>
    </div>
  `;
  res.send(layout({ title: "Ivamar AI", body }));
});// Demo
app.get("/demo", (req, res) => {
  const body = `
    <div class="card">
      <h2>Demo</h2>
      <p>Prueba un ejemplo real:</p>
      <div class="btns">
        <a class="btn primary" href="/loskambu">Ver Los Kambu</a>
        <a class="btn ghost" href="/">Volver</a>
      </div>
    </div>
  `;
  res.send(layout({ title: "Demo", body }));
});

// Pricing
app.get("/pricing", (req, res) => {
  const body = `
    <div class="card">
      <h2>Precios</h2>
      <p><b>Basic</b> — $49.99/mes</p>
      <p><b>Standard</b> — $99/mes</p>
      <p><b>Premium</b> — Desde $199/mes</p>
      <a class="btn ghost" href="/">Volver</a>
    </div>
  `;
  res.send(layout({ title: "Precios", body }));
});

// Contact
app.get("/contact", (req, res) => {
  const body = `
    <div class="card">
      <h2>Contacto</h2>
      <a class="btn primary" href="https://wa.me/17870000000" target="_blank">WhatsApp</a>
      <a class="btn ghost" href="/">Volver</a>
    </div>
  `;
  res.send(layout({ title: "Contacto", body }));
});

// About
app.get("/about", (req, res) => {
  const body = `
    <div class="card">
      <h2>Quiénes somos</h2>
      <p><b>Ivamar AI LLC</b> crea asistentes de inteligencia artificial y experiencias web para ayudar a pequeños negocios a atender clientes, recibir leads y vender más.</p>
      <p>Nuestro enfoque: tecnología útil, simple y con <i>human touch</i>.</p>
      <div class="btns">
        <a class="btn primary" href="/demo">Ver demo</a>
        <a class="btn ghost" href="/">Volver</a>
      </div>
    </div>
  `;
  res.send(layout({ title: "Quiénes somos", body }));
});

// Privacy
app.get("/privacy", (req, res) => {
  const body = `
    <div class="card">
      <h2>Política de Privacidad</h2>
      <p>Resumido:</p>
      <ul>
        <li>Podemos recopilar información que tú nos envías (por ejemplo, mediante formularios de contacto/cotización).</li>
        <li>Podemos usar cookies básicas para funcionamiento y medición.</li>
        <li>No vendemos tu información personal.</li>
      </ul>
      <p>Si tienes preguntas, contáctanos desde <a href="/contact">/contact</a>.</p>
      <a class="btn ghost" href="/">Volver</a>
    </div>
  `;
  res.send(layout({ title: "Privacidad", body }));
});

// Terms
app.get("/terms", (req, res) => {
  const body = `
    <div class="card">
      <h2>Términos del Servicio</h2>
      <p>Resumido:</p>
      <ul>
        <li>Ivamar AI ofrece servicios y herramientas digitales (páginas, asistentes, automatizaciones) según el plan acordado.</li>
        <li>El cliente es responsable del contenido que provee (menús, precios, imágenes y textos).</li>
        <li>El servicio puede incluir integraciones de terceros (WhatsApp, Stripe, OpenAI, etc.).</li>
        <li>Podemos actualizar estos términos cuando sea necesario.</li>
      </ul>
      <p>Para soporte y coordinación visita <a href="/contact">/contact</a>.</p>
      <a class="btn ghost" href="/">Volver</a>
    </div>
  `;
  res.send(layout({ title: "Términos", body }));
});









// Endpoint del asistente IvA (simple por ahora)
app.post("/api/assistant", async (req, res) => {
  const message = (req.body?.message || "").toString();

  // Fallback simple (por si el "cerebro" falla)
  const m = message.toLowerCase();
let fallback = "🌺 Soy Nayeli, tu embajadora digital boricua. Ahora mismo estoy teniendo un glitch técnico 😅. Escríbeme de nuevo en unos segundos, o dime tu negocio y te ayudo con lo básico aquí mismo.";
if (m.includes("precio") || m.includes("plan") || m.includes("cuanto cuesta") || m.includes("cuánto cuesta") || m.includes("costo") || m.includes("cost") || m.includes("tarifa") || m.includes("mensual")) {
    fallback = "Planes desde .99/mes. Incluye landing personalizada + asistente + enlaces a WhatsApp/Instagram/Maps. Si quieres, te preparo un demo.";
  } else if (m.includes("demo")) {
    fallback = "Puedes ver un ejemplo aquí: /loskambu. Cada negocio tiene su landing tipo /tu-negocio.";
  } else if (m.includes("como funciona") || m.includes("cómo funciona")) {
    fallback = "Así funciona: 1) Creamos tu landing, 2) Subes tu info y menú, 3) El asistente responde preguntas y guía al cliente a WhatsApp para ordenar.";
  }

  // Cerebro real (Render)
  const brainUrl = process.env.IVA_BRAIN_URL || "https://ivamar-brain.onrender.com/v1/chat";
const brainAssistant = process.env.IVA_BRAIN_ASSISTANT || "iva";
  const brainKey = process.env.IVA_BRAIN_API_KEY || "dev-secret";

  // Debug del bridge
 if (process.env.NODE_ENV !== "production" && (message || "").trim() === "__debug") {
      try {
      const out = await postJson(
        brainUrl,
        { assistantId: brainAssistant, message: "ping", sessionId: "web-session" },
        { headers: { Authorization: `Bearer ${brainKey}` } }
      );

      let data = null;
      try { data = out.body ? JSON.parse(out.body) : null; } catch (_) { data = null; }

      return res.json({
        debug: true,
        brainUrl,
        brainAssistant,
        hasBrainKey: !!(process.env.IVA_BRAIN_API_KEY && process.env.IVA_BRAIN_API_KEY.trim()),
        status: out.status,
        bodyPreview: (out.body || "").slice(0, 200),
        parsedReply: data && data.reply ? ("" + data.reply).slice(0, 120) : null
      });
    } catch (e) {
      return res.json({
        debug: true,
        brainUrl,
        brainAssistant,
        hasBrainKey: !!(process.env.IVA_BRAIN_API_KEY && process.env.IVA_BRAIN_API_KEY.trim()),
        error: (e && e.message) ? e.message : String(e)
      });
    }
  }

  // Llamada real al brain
  try {
    const out = await postJson(
      brainUrl,
      { assistantId: brainAssistant, message, sessionId: req.body?.sessionId || "web-session" },
      { headers: { Authorization: `Bearer ${brainKey}` } }
    );

    let data = null;
    try { data = out.body ? JSON.parse(out.body) : null; } catch (_) { data = null; }

    if (out.status >= 200 && out.status < 300 && data && typeof data.reply === "string" && data.reply.trim()) {
      return res.json({ reply: data.reply });
    }

    return res.json({ reply: fallback });
  } catch (e) {
    return res.json({ reply: fallback });
  }
});

// Ruta dinámica por negocio
app.get("/:slug", (req, res) => {
  const slug = req.params.slug;
  const filePath = path.join(__dirname, "..", "data", "businesses", `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send(layout({
      title: "No encontrado",
      body: `<div class="card"><h2>Negocio no encontrado</h2><a class="btn ghost" href="/">Volver</a></div>`
    }));
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const body = `
    <div class="card">
      <h1>${data.name}</h1>
      <p>${data.description}</p>

      <div class="btns">
        <a class="btn primary" href="${data.links.whatsapp}" target="_blank">Ordenar por WhatsApp</a>
        <a class="btn ghost" href="${data.links.instagram}" target="_blank">Instagram</a>
      </div>

      <h2 style="margin-top:30px">Menú</h2>
      <div class="grid">
        ${data.menu.map(item => `
          <div class="tile">
            <b>${item.name}</b>
            <div>${item.desc}</div>
            <div style="margin-top:8px;font-weight:900;color:var(--text)">$${item.price}</div>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  res.send(layout({ title: data.name, body }));
});

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
