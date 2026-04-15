const express = require("express");
const layout = require("./views/layout");
const home = require("./views/home");
const homeES = require("./views/home-es");
const homeEN = require("./views/home-en");
const about = require("./views/about");
const contact = require("./views/contact");
const privacy = require("./views/privacy");
const terms = require("./views/terms");
const demo = require("./views/demo");
const quote = require("./views/quote");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = process.env.PORT || 4000;

const BILLING_API_URL =
  process.env.BILLING_API_URL || "https://ivamar-brain.onrender.com/v1/billing/checkout-session";

const BILLING_API_KEY =
  process.env.BILLING_API_KEY || "dev-secret";

function slugify(text = "") {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

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
      req.on("timeout", () => { req.destroy(new Error("timeout")); });
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
  res.send(layout({ title: "Ivamar AI", body: home }));
});

app.get("/es", (req, res) => {
  res.send(layout({ title: "Ivamar AI ES", body: homeES }));
});

app.get("/en", (req, res) => {
  res.send(layout({ title: "Ivamar AI EN", body: homeEN }));
});

// About
app.get("/about", (req, res) => {
  res.send(layout({ title: "About — Ivamar AI LLC", body: about }));
});

// Contact
app.get("/contact", (req, res) => {
  res.send(layout({ title: "Contact — Ivamar AI LLC", body: contact }));
});

// Privacy
app.get("/privacy", (req, res) => {
  res.send(layout({ title: "Privacy Policy — Ivamar AI LLC", body: privacy }));
});

// Terms
app.get("/terms", (req, res) => {
  res.send(layout({ title: "Terms of Service — Ivamar AI LLC", body: terms }));
});

// Demo
app.get("/demo", (req, res) => {
  res.send(layout({ title: "Demo — El Rincón Boricua", body: demo }));
});

app.get("/quote", (req, res) => {
  res.send(layout({ title: "Get Started — Ivamar AI", body: quote }));
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

// Start Now
app.get("/start", (req, res) => {
  const body = `
  <div class="card">
    <h1>Comienza a crear la presencia digital de tu negocio</h1>
    <p style="margin-bottom:20px;">
      A partir de este momento vas a llevar tu negocio a otro nivel.
      En los próximos minutos podrás crear una landing page profesional,
      mostrar tu menú o servicios, conectar tus canales de contacto
      y configurar un asistente digital que ayudará a atender a tus clientes.
    </p>
    <form class="ivamar-form" method="POST" action="/start">
      <label>Nombre del negocio</label>
      <input type="text" name="businessName" placeholder="Ej. Kambu Sandwiches" required style="margin-bottom:16px;padding:10px;" />
      <label>Nombre del dueño o contacto</label>
      <input type="text" name="ownerName" placeholder="Tu nombre" required style="margin-bottom:16px;padding:10px;" />
      <label>Email</label>
      <input type="email" name="email" placeholder="ejemplo@email.com" required style="margin-bottom:16px;padding:10px;" />
      <label>WhatsApp</label>
      <input type="text" name="whatsapp" placeholder="Ej. 787-000-0000" required style="margin-bottom:16px;padding:10px;" />
      <label>Tipo de negocio</label>
      <select name="businessType" required style="margin-bottom:16px;padding:10px;">
        <option value="">Selecciona</option>
        <option value="Food Truck">Food Truck</option>
        <option value="Cafetería">Cafetería</option>
        <option value="Restaurante">Restaurante</option>
        <option value="Lechonera">Lechonera</option>
        <option value="Panadería">Panadería</option>
        <option value="Kiosco">Kiosco</option>
        <option value="Barra o bebidas">Barra o bebidas</option>
        <option value="Postres o dulces">Postres o dulces</option>
        <option value="Servicios profesionales">Servicios profesionales</option>
        <option value="Salón de belleza">Salón de belleza</option>
        <option value="Dealer de autos">Dealer de autos</option>
        <option value="Otro negocio de comida">Otro negocio de comida</option>
      </select>
      <label>Descripción del negocio</label>
      <textarea name="description" rows="4" placeholder="Describe tu negocio" style="margin-bottom:16px;padding:10px;"></textarea>
      <label>Menú o servicios</label>
      <textarea name="menu" rows="6" placeholder="Ej. Tripleta - $12&#10;Papas fritas - $4&#10;Refresco - $2" style="margin-bottom:16px;padding:10px;"></textarea>
      <label>Acompañantes</label>
      <textarea name="sides" rows="4" placeholder="Ej. Papas fritas - $4&#10;Tostones - $5" style="margin-bottom:16px;padding:10px;"></textarea>
      <label>Bebidas</label>
      <textarea name="drinks" rows="4" placeholder="Ej. Refresco - $2&#10;Agua - $1" style="margin-bottom:16px;padding:10px;"></textarea>
      <label>Postres</label>
      <textarea name="desserts" rows="4" placeholder="Ej. Flan - $4&#10;Tres leches - $5" style="margin-bottom:16px;padding:10px;"></textarea>
      <label>Logo del negocio (link)</label>
      <input type="text" name="logoUrl" placeholder="Pega aquí el link de tu logo" style="margin-bottom:16px;padding:10px;" />
      <label>Foto principal del negocio (link)</label>
      <input type="text" name="businessPhotoUrl" placeholder="Foto del food truck, local o plato estrella" style="margin-bottom:16px;padding:10px;" />
      <label>Dirección del negocio</label>
      <input type="text" name="address" placeholder="Ej. PR-2 Km 45, Arecibo, Puerto Rico" style="margin-bottom:16px;padding:10px;" />
      <label>Horario del negocio</label>
      <input type="text" name="hours" placeholder="Ej. Lunes a Domingo, 11:00am - 9:00pm" style="margin-bottom:16px;padding:10px;" />
      <label>Estado del negocio</label>
      <select name="status" style="margin-bottom:16px;padding:10px;">
        <option value="abierto">Abierto</option>
        <option value="cerrado">Cerrado</option>
        <option value="vacaciones">Vacaciones</option>
        <option value="feriado">Feriado</option>
      </select>
      <label>Estilo visual de tu página</label>
      <select name="theme" style="margin-bottom:16px;padding:10px;">
        <option value="light">Claro / limpio</option>
        <option value="dark">Oscuro / elegante</option>
        <option value="tropical">Tropical / cálido</option>
      </select>
      <h2 style="margin-top:24px;">Tu asistente digital</h2>
      <label>Nombre del asistente</label>
      <input type="text" name="assistantName" placeholder="Ej. Porky" style="margin-bottom:16px;padding:10px;" />
      <label>Tono del asistente</label>
      <input type="text" name="assistantTone" placeholder="Ej. boricua, amistoso, profesional" style="margin-bottom:16px;padding:10px;" />
      <label>Saludo inicial del asistente</label>
      <textarea name="assistantWelcome" rows="3" placeholder="Ej. ¡Wepa! Soy Porky. ¿Qué te preparo hoy?" style="margin-bottom:16px;padding:10px;"></textarea>
      <label>Palabras o frases clave</label>
      <input type="text" name="assistantKeywords" placeholder="Ej. wepa, duro, al punto" style="margin-bottom:16px;padding:10px;" />
      <label>Avatar del asistente (link)</label>
      <input type="text" name="assistantAvatarUrl" placeholder="Pega aquí el link de la imagen" style="margin-bottom:16px;padding:10px;" />
      <div style="margin-top:24px;margin-bottom:24px;padding:16px;border:1px solid #ddd;border-radius:8px;">
        <p><b>Setup: $125</b></p>
        <p><b>Mensual: $49</b></p>
        <p>El mensual comienza dentro de los próximos 30 días</p>
      </div>
      <div class="btns" style="margin-top:16px;">
        <button class="btn primary" type="submit">Continuar</button>
        <a class="btn ghost" href="/">Volver</a>
      </div>
    </form>
  </div>
  `;
  res.send(layout({ title: "Start Now", body }));
});

app.post("/start", async (req, res) => {
  const {
    businessName = "", ownerName = "", email = "", whatsapp = "",
    businessType = "", description = "", menu = "", sides = "",
    drinks = "", desserts = "", logoUrl = "", businessPhotoUrl = "",
    address = "", hours = "", status = "abierto", theme = "light",
    assistantName = "", assistantTone = "", assistantWelcome = "",
    assistantKeywords = "", assistantAvatarUrl = ""
  } = req.body || {};

  const clientsFile = path.join(__dirname, "..", "data", "clients.json");
  let clients = [];
  try {
    const raw = fs.readFileSync(clientsFile, "utf8");
    clients = JSON.parse(raw);
    if (!Array.isArray(clients)) clients = [];
  } catch (e) { clients = []; }

  const slug = businessName.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  function parseItems(text) {
    return (text || "").split("\n").map(l => l.trim()).filter(Boolean).map(line => {
      let itemName = line, price = null;
      const m = line.match(/^(.*?)-\s*\$?(\d+(?:\.\d{1,2})?)$/);
      if (m) { itemName = m[1].trim(); price = Number(m[2]); }
      return { name: itemName || "Item", price: Number.isFinite(price) ? price : null, desc: "" };
    });
  }

  const businessData = {
    slug, name: businessName,
    headline: `${businessType || "Negocio local"} con Ivamar AI`,
    description: description || "Próximamente más información.",
    logoUrl, businessPhotoUrl, address, hours,
    status: status || "abierto", theme,
    assistant: {
      name: assistantName || "IvA",
      tone: assistantTone || "amistoso y profesional",
      welcome: assistantWelcome || `Hola, soy ${assistantName || "IvA"}. ¿En qué te ayudo hoy?`,
      keywords: (assistantKeywords || "").split(",").map(w => w.trim()).filter(Boolean),
      avatarUrl: assistantAvatarUrl || ""
    },
    links: {
      whatsapp: whatsapp ? `https://wa.me/${String(whatsapp).replace(/\D/g, "")}` : "#",
      instagram: "#", googleMaps: "#"
    },
    menu: parseItems(menu).length ? parseItems(menu) : [{ name: "Menú pendiente", price: 0, desc: "" }],
    sides: parseItems(sides), drinks: parseItems(drinks), desserts: parseItems(desserts)
  };

  const businessFile = path.join(__dirname, "..", "data", "businesses", `${slug}.json`);
  fs.writeFileSync(businessFile, JSON.stringify(businessData, null, 2), "utf8");

  const siteUrl = `${req.protocol}://${req.get("host")}`;
  try {
    const out = await postJson(BILLING_API_URL, {
      plan: "setup-125", slug, businessName, ownerName, email, whatsapp, businessType,
      successUrl: `${siteUrl}/${slug}`, cancelUrl: `${siteUrl}/start`
    }, { headers: { Authorization: `Bearer ${BILLING_API_KEY}` } });

    let data = null;
    try { data = out.body ? JSON.parse(out.body) : null; } catch (_) {}
    const checkoutUrl = data?.url || data?.checkoutUrl || data?.checkout_url;
    if (out.status >= 200 && out.status < 300 && checkoutUrl) return res.redirect(checkoutUrl);
  } catch (e) { console.error("Error creando checkout:", e.message); }

  return res.redirect(`/${slug}`);
});

// API del asistente IvA
app.post("/api/assistant", async (req, res) => {
  const message = (req.body?.message || "").toString();
  const m = message.toLowerCase();

  let fallback = "🌺 Soy IvA, tu asistente de Ivamar AI. Ahora mismo tengo un problema técnico 😅. Escríbeme de nuevo en unos segundos.";
  if (m.includes("precio") || m.includes("plan") || m.includes("cuanto cuesta") || m.includes("cuánto cuesta") || m.includes("mensual")) {
    fallback = "Nuestros planes comienzan en $49/mes + $125 de setup único. Incluye landing personalizada + asistente IvA + WhatsApp + pagos. ¿Quieres un demo?";
  } else if (m.includes("demo")) {
    fallback = "Puedes ver un ejemplo en /loskambu. Cada negocio tiene su propia página en /tu-negocio.";
  } else if (m.includes("como funciona") || m.includes("cómo funciona")) {
    fallback = "Así funciona: 1) Creamos tu landing, 2) Configuramos IvA con tu info, 3) Tus clientes preguntan, ordenan y pagan directo a ti.";
  }

  const brainUrl = process.env.IVA_BRAIN_URL || "https://ivamar-brain.onrender.com/v1/chat";
  const brainAssistant = process.env.IVA_BRAIN_ASSISTANT || "iva";
  const brainKey = process.env.IVA_BRAIN_API_KEY || "dev-secret";

  try {
    const out = await postJson(brainUrl,
      { assistantId: brainAssistant, message, sessionId: req.body?.sessionId || "web-session" },
      { headers: { Authorization: `Bearer ${brainKey}` } }
    );
    let data = null;
    try { data = out.body ? JSON.parse(out.body) : null; } catch (_) {}
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
  const businessFile = path.join(__dirname, "..", "data", "businesses", `${slug}.json`);
  const clientsFilePath = path.join(__dirname, "..", "data", "clients.json");

  if (fs.existsSync(businessFile)) {
    const data = JSON.parse(fs.readFileSync(businessFile, "utf-8"));
    const theme = data.theme || "light";
    let pageStyle = "";
    if (theme === "dark") pageStyle = "background:#111;color:#f5f5f5;";
    else if (theme === "tropical") pageStyle = "background:linear-gradient(180deg,#fff8e7 0%,#ffe8c2 100%);color:#2b1d0e;";
    else pageStyle = "background:#ffffff;color:#111111;";

    const assistantName = data.assistant?.name || "IvA";
    const assistantWelcome = data.assistant?.welcome || "Hola, ¿en qué te ayudo hoy?";
    const whatsappNumber = (data.links?.whatsapp || "").replace(/\D/g, "");

    let statusLabel = "";
    if (data.status === "cerrado") statusLabel = "🔴 Cerrado";
    else if (data.status === "vacaciones") statusLabel = "🌴 Vacaciones";
    else if (data.status === "feriado") statusLabel = "📅 Feriado";
    else statusLabel = "🟢 Abierto";

    const body = `
      <div class="card" style="${pageStyle}">
        ${data.businessPhotoUrl ? `
          <div style="margin:-20px -20px 24px -20px;overflow:hidden;border-radius:16px 16px 0 0;">
            <img src="${data.businessPhotoUrl}" alt="${data.name}" style="width:100%;height:340px;object-fit:cover;display:block;" />
          </div>
        ` : ""}
        <div style="text-align:center;margin:-20px 0 24px 0;position:relative;z-index:2;">
          ${data.logoUrl ? `<img src="${data.logoUrl}" alt="${data.name} logo" style="width:90px;height:90px;object-fit:cover;border-radius:16px;border:4px solid #fff;background:#fff;box-shadow:0 8px 24px rgba(0,0,0,.18);" />` : ""}
        </div>
        <div style="text-align:center;margin-bottom:18px;">
          <div style="display:inline-block;margin-bottom:10px;padding:8px 14px;border-radius:999px;background:rgba(255,255,255,.08);font-weight:700;">${statusLabel}</div>
          <h1 style="margin:20px 0 8px 0;font-size:34px;">${data.name}</h1>
          <p style="margin:0 auto;max-width:700px;color:var(--muted);font-size:17px;">${data.description || ""}</p>
        </div>
        ${data.address || data.hours ? `
          <div style="margin:16px 0 22px 0;text-align:center;">
            ${data.address ? `<div style="margin-bottom:8px;"><b>Dirección:</b> ${data.address}</div>` : ""}
            ${data.hours ? `<div style="margin-bottom:10px;"><b>Horario:</b> ${data.hours}</div>` : ""}
            ${data.address ? `<a class="btn ghost" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address)}" target="_blank">Ver en Google Maps</a>` : ""}
          </div>
        ` : ""}
        <div style="margin:24px 0 18px 0;text-align:center;">
          <a href="${data.links?.whatsapp || "#"}" target="_blank"
             style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;font-size:18px;font-weight:700;padding:14px 22px;border-radius:12px;box-shadow:0 8px 20px rgba(0,0,0,.18);">
            Ordenar ahora por WhatsApp
          </a>
        </div>
        <h2 style="margin-top:40px;font-size:28px;">Menú</h2>
        <div class="grid">
          ${(data.menu || []).map((item, i) => `
            <div class="tile">
              <b>${item.name}</b>
              <div>${item.desc || ""}</div>
              <div style="margin-top:8px;font-weight:900;">${item.price !== null ? "$" + item.price : "Precio pendiente"}</div>
              <div style="margin-top:12px;display:flex;align-items:center;gap:10px;">
                <button onclick="changeQty('menu-${i}',-1)" style="padding:6px 10px;border:none;border-radius:8px;cursor:pointer;">-</button>
                <span id="qty-menu-${i}">0</span>
                <button onclick="changeQty('menu-${i}',1)" style="padding:6px 10px;border:none;border-radius:8px;cursor:pointer;">+</button>
              </div>
            </div>
          `).join("")}
        </div>
        ${(data.sides||[]).length ? `<h2 style="margin-top:40px;">Acompañantes</h2><div class="grid">${(data.sides||[]).map((item,i)=>`<div class="tile"><b>${item.name}</b><div style="margin-top:8px;font-weight:900;">${item.price!==null?"$"+item.price:"Precio pendiente"}</div><div style="margin-top:12px;display:flex;align-items:center;gap:10px;"><button onclick="changeQty('side-${i}',-1)" style="padding:6px 10px;border:none;border-radius:8px;cursor:pointer;">-</button><span id="qty-side-${i}">0</span><button onclick="changeQty('side-${i}',1)" style="padding:6px 10px;border:none;border-radius:8px;cursor:pointer;">+</button></div></div>`).join("")}</div>` : ""}
        ${(data.drinks||[]).length ? `<h2 style="margin-top:40px;">Bebidas</h2><div class="grid">${(data.drinks||[]).map((item,i)=>`<div class="tile"><b>${item.name}</b><div style="margin-top:8px;font-weight:900;">${item.price!==null?"$"+item.price:"Precio pendiente"}</div><div style="margin-top:12px;display:flex;align-items:center;gap:10px;"><button onclick="changeQty('drink-${i}',-1)" style="padding:6px 10px;border:none;border-radius:8px;cursor:pointer;">-</button><span id="qty-drink-${i}">0</span><button onclick="changeQty('drink-${i}',1)" style="padding:6px 10px;border:none;border-radius:8px;cursor:pointer;">+</button></div></div>`).join("")}</div>` : ""}
        ${(data.desserts||[]).length ? `<h2 style="margin-top:40px;">Postres</h2><div class="grid">${(data.desserts||[]).map((item,i)=>`<div class="tile"><b>${item.name}</b><div style="margin-top:8px;font-weight:900;">${item.price!==null?"$"+item.price:"Precio pendiente"}</div><div style="margin-top:12px;display:flex;align-items:center;gap:10px;"><button onclick="changeQty('dessert-${i}',-1)" style="padding:6px 10px;border:none;border-radius:8px;cursor:pointer;">-</button><span id="qty-dessert-${i}">0</span><button onclick="changeQty('dessert-${i}',1)" style="padding:6px 10px;border:none;border-radius:8px;cursor:pointer;">+</button></div></div>`).join("")}</div>` : ""}

        <div id="cart" style="margin-top:40px;padding:20px;border-radius:20px;background:#f0f0f0;">
          <h2 style="margin-top:0;">🛒 Tu orden</h2>
          <div id="cart-items" style="margin-bottom:16px;color:#555;">No has añadido nada todavía.</div>
          <div style="margin-top:16px;font-weight:700;color:#222;">
            <div>Subtotal: $<span id="subtotal">0.00</span></div>
            <div>Tax (11.5%): $<span id="tax">0.00</span></div>
            <div style="margin-top:8px;font-size:20px;font-weight:900;">Total: $<span id="total">0.00</span></div>
          </div>
          <a id="send-order-btn" href="#" target="_blank"
            style="margin-top:16px;width:100%;padding:12px;border:none;border-radius:10px;background:#25D366;color:white;font-weight:700;text-decoration:none;display:inline-block;text-align:center;">
            Enviar pedido por WhatsApp
          </a>
        </div>

        <script>
        const menuItems = ${JSON.stringify(data.menu||[])};
        const sidesItems = ${JSON.stringify(data.sides||[])};
        const drinksItems = ${JSON.stringify(data.drinks||[])};
        const dessertsItems = ${JSON.stringify(data.desserts||[])};
        const waNumber = "${whatsappNumber}";
        const bizName = "${data.name}";

        function changeQty(id, delta) {
          const el = document.getElementById("qty-" + id);
          if (!el) return;
          let qty = parseInt(el.textContent||"0",10) + delta;
          if (qty < 0) qty = 0;
          el.textContent = qty;
          updateCart();
        }

        function updateCart() {
          let lines = [], subtotal = 0;
          function process(items, prefix) {
            items.forEach((item, i) => {
              const el = document.getElementById("qty-" + prefix + "-" + i);
              const qty = el ? parseInt(el.textContent||"0",10) : 0;
              if (qty > 0) {
                const price = Number.isFinite(Number(item.price)) ? Number(item.price) : 0;
                subtotal += qty * price;
                lines.push(item.name + " x" + qty + " = $" + (qty*price).toFixed(2));
              }
            });
          }
          process(menuItems,"menu"); process(sidesItems,"side");
          process(drinksItems,"drink"); process(dessertsItems,"dessert");

          document.getElementById("cart-items").innerHTML = lines.length ? lines.join("<br/>") : "No has añadido nada todavía.";
          const tax = subtotal * 0.115;
          document.getElementById("subtotal").textContent = subtotal.toFixed(2);
          document.getElementById("tax").textContent = tax.toFixed(2);
          document.getElementById("total").textContent = (subtotal+tax).toFixed(2);

          const msg = "🛒 *Pedido — " + bizName + "*\\n\\n" + lines.join("\\n") + "\\n\\n💰 *Total: $" + (subtotal+tax).toFixed(2) + "*\\n\\n¡Gracias!";
          document.getElementById("send-order-btn").href = "https://wa.me/" + waNumber + "?text=" + encodeURIComponent(msg);
        }
        updateCart();
        </script>
      </div>
    `;
    return res.send(layout({ title: data.name, body }));
  }

  // Buscar en clients.json
  let clients = [];
  try {
    const raw = fs.readFileSync(clientsFilePath, "utf8");
    clients = JSON.parse(raw);
    if (!Array.isArray(clients)) clients = [];
  } catch (e) { clients = []; }

  const client = clients.find(item => item.slug === slug);
  if (client) {
    const body = `
      <div class="card">
        <h1>${client.businessName}</h1>
        <p><b>Tipo:</b> ${client.businessType || "No definido"}</p>
        <p><b>WhatsApp:</b> ${client.whatsapp || "Pendiente"}</p>
        <div class="btns" style="margin-top:16px;">
          <a class="btn ghost" href="/">Volver</a>
        </div>
      </div>
    `;
    return res.send(layout({ title: client.businessName, body }));
  }

  return res.status(404).send(layout({
    title: "No encontrado",
    body: `<div class="card"><h2>Negocio no encontrado</h2><a class="btn ghost" href="/">Volver</a></div>`
  }));
});

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
