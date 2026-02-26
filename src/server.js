const express = require("express");
const layout = require("./views/layout");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4000;

// POST JSON helper (works even if fetch() is not available)
function postJson(urlStr, payload) {
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
          "Content-Length": data.length
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

// Endpoint del asistente IvA (simple por ahora)
app.post("/api/assistant", async (req, res) => {
  const message = (req.body?.message || "").toString();

  // Fallback simple (por si el "cerebro" falla)
  const m = message.toLowerCase();
  let fallback = "👋 Soy IvA, el asistente de Ivamar AI. Dime qué tipo de negocio tienes y te explico cómo te ayudamos a vender más sin comisiones.";

  if (m.includes("precio") || m.includes("plan") || m.includes("cuanto cuesta") || m.includes("cuánto cuesta") || m.includes("costo") || m.includes("cost") || m.includes("tarifa") || m.includes("mensual")) {
    fallback = "Planes desde .99/mes. Incluye landing personalizada + asistente + enlaces a WhatsApp/Instagram/Maps. Si quieres, te preparo un demo.";
  } else if (m.includes("demo")) {
    fallback = "Puedes ver un ejemplo aquí: /loskambu. Cada negocio tiene su landing tipo /tu-negocio.";
  } else if (m.includes("como funciona") || m.includes("cómo funciona")) {
    fallback = "Así funciona: 1) Creamos tu landing, 2) Subes tu info y menú, 3) El asistente responde preguntas y guía al cliente a WhatsApp para ordenar.";
  }

  // "Cerebro" (por ahora: Nayeli local). Luego lo cambiamos a tu SaaS en Render.
  const brainUrl = process.env.IVA_BRAIN_URL || "https://ivamar-brain.onrender.com/api/chat";
  const brainAssistant = process.env.IVA_BRAIN_ASSISTANT || "nayeli";

  try {
    const out = await postJson(brainUrl, { assistant: brainAssistant, message });

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
