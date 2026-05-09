
const express = require("express");
const layout = require("./views/layout");
const home = require("./views/home");
const homeES = require("./views/home-es");
const homeEN = require("./views/home-en");
const about = require("./views/about");
const sobreNosotros = require("./views/sobre-nosotros");
const contactoES = require("./views/contacto");
const contact = require("./views/contact");
const privacy = require("./views/privacy");
const terms = require("./views/terms");
const termsES = require("./views/terms-es");
const privacyES = require("./views/privacy-es");
const demo = require("./views/demo");
const demos = require("./views/demos");
const demosES = require("./views/demos-es");
const demoAutos = require("./views/demo-autos");
const quote = require("./views/quote");
const quoteES = require("./views/quote-es");
const esAsistente = require("./views/es-asistente");
const enAssistant = require("./views/en-assistant");
const adminLogin = require("./views/admin-login");
const adminDashboard = require("./views/admin-dashboard");
const adminEdit = require("./views/admin-edit");
const Anthropic = require("@anthropic-ai/sdk");
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);
const fs = require("fs");
const path = require("path");
const cookieParser = require("cookie-parser");
// Agreements directory for legal acceptance logs
const agreementsDir = path.join(__dirname, "..", "data", "agreements");
if (!fs.existsSync(agreementsDir)) {
  fs.mkdirSync(agreementsDir, { recursive: true });
}





const app = express();
const PORT = process.env.PORT || 4000;
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const BILLING_API_URL = process.env.BILLING_API_URL || "https://ivamar-brain.onrender.com/v1/billing/checkout-session";
const BILLING_API_KEY = process.env.BILLING_API_KEY || "dev-secret";
const ADMIN_USER = process.env.ADMIN_USER || "ivamar-admin";
const ADMIN_PASS = process.env.ADMIN_PASS || "ivamar2025";

const sessions = new Map();

function generateToken() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function requireAdmin(req, res, next) {
  const token = req.cookies?.adminToken;
  const session = sessions.get(token);
  if (!session) return res.redirect("/admin");
  req.adminSession = session;
  next();
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

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
        headers: { "Content-Type": "application/json", "Content-Length": data.length, ...(options.headers || {}) },
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
    } catch (e) { reject(e); }
  });
}

// ==========================================
// PUBLIC ROUTES
// ==========================================

app.get("/", (req, res) => res.send(layout({ title: "Ivamar AI", body: home })));
app.get("/es", (req, res) => res.send(layout({ title: "Ivamar AI · Español", body: homeES })));
app.get("/en", (req, res) => res.send(layout({  lang: "en", title: "Ivamar AI · English", body: homeEN })));
app.get("/about", (req, res) => res.send(layout({  lang: "en", title: "About — Ivamar AI LLC", body: about })));
app.get("/sobre-nosotros", (req, res) => res.send(layout({ title: "Sobre Nosotros — Ivamar AI", body: sobreNosotros })));
app.get("/contacto", (req, res) => res.send(layout({ title: "Contacto — Ivamar AI", body: contactoES })));
app.get("/contact", (req, res) => res.send(layout({  lang: "en", title: "Contact — Ivamar AI LLC", body: contact })));
app.get("/privacy", (req, res) => res.send(layout({  lang: "en", title: "Privacy Policy — Ivamar AI LLC", body: privacy })));
app.get("/terms", (req, res) => res.send(layout({  lang: "en", title: "Terms of Service — Ivamar AI LLC", body: terms })));
app.get("/terminos", (req, res) => res.send(layout({ title: "Términos de Servicio — Ivamar AI", body: termsES })));
app.get("/privacidad", (req, res) => res.send(layout({ title: "Política de Privacidad — Ivamar AI", body: privacyES })));
app.get("/demo", (req, res) => res.send(layout({  lang: "en", title: "Demo — El Rincón Boricua", body: demo })));
app.get("/demos", (req, res) => res.send(layout({  lang: "en", title: "Demos — Ivamar AI", body: demos })));
app.get("/demos-es", (req, res) => res.send(layout({ title: "Demos — Ivamar AI", body: demosES })));
app.get("/demo-autos", (req, res) => res.send(layout({  lang: "en", title: "Demo — Luis Soto Autos", body: demoAutos })));
app.get("/quote", (req, res) => res.send(layout({  lang: "en", title: "Get Started — Ivamar AI", body: quote })));


// API: Log legal agreement acceptance
app.post("/api/log-agreement", express.json(), (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() 
            || req.headers['x-real-ip']
            || req.socket?.remoteAddress 
            || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';
    
    const record = {
      ...req.body,
      ip: ip,
      userAgent: userAgent,
      receivedAt: new Date().toISOString()
    };
    
    const fileName = `${Date.now()}_${(req.body.email || 'unknown').replace(/[^a-z0-9]/gi, '_')}.json`;
    const filePath = path.join(agreementsDir, fileName);
    
    fs.writeFileSync(filePath, JSON.stringify(record, null, 2));
    
    console.log(`✅ Agreement logged: ${req.body.bizName} (${req.body.email}) from IP ${ip}`);
    
    // Send backup email to business owner
    if (process.env.RESEND_API_KEY && process.env.AGREEMENT_EMAIL_TO) {
      resend.emails.send({
        from: 'Ivamar AI <onboarding@resend.dev>',
        to: process.env.AGREEMENT_EMAIL_TO,
        subject: `📋 New Agreement: ${req.body.bizName || 'Unknown'} (${req.body.email || 'no email'})`,
        html: `<h2>New Legal Agreement Signed</h2>
<p><strong>Business:</strong> ${req.body.bizName || 'N/A'}</p>
<p><strong>Name:</strong> ${req.body.name || 'N/A'}</p>
<p><strong>Email:</strong> ${req.body.email || 'N/A'}</p>
<p><strong>Plan:</strong> ${req.body.plan || 'N/A'}</p>
<p><strong>IP:</strong> ${ip}</p>
<p><strong>Time:</strong> ${record.receivedAt}</p>
<p><strong>File ID:</strong> ${fileName}</p>
<hr>
<pre>${JSON.stringify(record, null, 2)}</pre>`,
        attachments: [{
          filename: fileName,
          content: Buffer.from(JSON.stringify(record, null, 2)).toString('base64')
        }]
      }).then(() => {
        console.log(`📧 Email backup sent for ${fileName}`);
      }).catch(emailErr => {
        console.error('Email backup failed:', emailErr);
      });
    }
    
    res.json({ success: true, id: fileName });
  } catch (err) {
    console.error('Agreement log error:', err);
    res.status(500).json({ error: 'Failed to log agreement' });
  }
});

app.get("/es/asistente", (req, res) => res.send(esAsistente));
app.get("/en/assistant", (req, res) => res.send(enAssistant));
app.get("/cotizar", (req, res) => res.send(layout({ title: "Empezar — Ivamar AI", body: quoteES })));
app.get("/pricing", (req, res) => res.redirect("/quote"));

// ==========================================
// ADMIN ROUTES
// ==========================================

app.get("/admin", (req, res) => res.send(layout({ title: "Admin — Ivamar AI", body: adminLogin })));

app.post("/admin/auth", (req, res) => {
  const { user, pass } = req.body || {};
  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    const token = generateToken();
    sessions.set(token, { role: "admin", slug: null });
    res.cookie("adminToken", token, { httpOnly: true, maxAge: 86400000 * 7 });
    return res.json({ ok: true, redirect: "/admin/dashboard" });
  }
  const businessFile = path.join(__dirname, "..", "data", "businesses", `${user}.json`);
  if (fs.existsSync(businessFile)) {
    const clientPass = process.env[`CLIENT_PASS_${user.toUpperCase().replace(/-/g, "_")}`] || user + "2025";
    if (pass === clientPass) {
      const token = generateToken();
      sessions.set(token, { role: "client", slug: user });
      res.cookie("adminToken", token, { httpOnly: true, maxAge: 86400000 * 7 });
      return res.json({ ok: true, redirect: `/admin/edit/${user}` });
    }
  }
  res.json({ ok: false });
});

app.get("/admin/logout", (req, res) => {
  const token = req.cookies?.adminToken;
  if (token) sessions.delete(token);
  res.clearCookie("adminToken");
  res.redirect("/admin");
});

app.get("/admin/dashboard", requireAdmin, (req, res) => {
  if (req.adminSession.role !== "admin") return res.redirect(`/admin/edit/${req.adminSession.slug}`);
  const bizDir = path.join(__dirname, "..", "data", "businesses");
  const files = fs.readdirSync(bizDir).filter(f => f.endsWith(".json"));
  const businesses = files.map(f => {
    try { return JSON.parse(fs.readFileSync(path.join(bizDir, f), "utf8")); }
    catch (e) { return null; }
  }).filter(Boolean);
  res.send(layout({ title: "Dashboard — Ivamar AI", body: adminDashboard(businesses) }));
});

app.get("/admin/new", requireAdmin, (req, res) => {
  if (req.adminSession.role !== "admin") return res.redirect("/admin/dashboard");
  res.send(layout({ title: "Nuevo negocio — Admin", body: adminEdit({}, true) }));
});

app.get("/admin/edit/:slug", requireAdmin, (req, res) => {
  const slug = req.params.slug;
  if (req.adminSession.role === "client" && req.adminSession.slug !== slug) {
    return res.redirect(`/admin/edit/${req.adminSession.slug}`);
  }
  const bizFile = path.join(__dirname, "..", "data", "businesses", `${slug}.json`);
  let biz = {};
  if (fs.existsSync(bizFile)) {
    try { biz = JSON.parse(fs.readFileSync(bizFile, "utf8")); } catch (e) {}
  }
  res.send(layout({ title: `Editando ${biz.name || slug} — Admin`, body: adminEdit(biz, false) }));
});

app.post("/admin/save", requireAdmin, (req, res) => {
  const data = req.body;
  if (!data || !data.slug) return res.json({ ok: false, error: "slug requerido" });
  if (req.adminSession.role === "client" && req.adminSession.slug !== data.slug) {
    return res.json({ ok: false, error: "no autorizado" });
  }
  try {
    const bizFile = path.join(__dirname, "..", "data", "businesses", `${data.slug}.json`);
    fs.writeFileSync(bizFile, JSON.stringify(data, null, 2), "utf8");
    res.json({ ok: true });
  } catch (e) {
    res.json({ ok: false, error: e.message });
  }
});

app.post("/admin/delete/:slug", requireAdmin, (req, res) => {
  if (req.adminSession.role !== "admin") return res.json({ ok: false, error: "no autorizado" });
  try {
    const bizFile = path.join(__dirname, "..", "data", "businesses", `${req.params.slug}.json`);
    if (fs.existsSync(bizFile)) fs.unlinkSync(bizFile);
    res.json({ ok: true });
  } catch (e) {
    res.json({ ok: false, error: e.message });
  }
});

// ==========================================
// IVA ASSISTANT API — CLAUDE
// ==========================================

app.post("/api/demo", async (req, res) => {
  const message = (req.body?.message || "").toString();
  try {
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: "Eres IvA, el asistente de La Plaza Restaurant en Miami, FL. MENU: Ropa Vieja $15.99, Pollo a la Brasa $14.99, Camarones al Ajillo $18.99, Tostones con Guacamole $7.99, Empanadas x3 $8.99, Ensalada Tropical $9.99, Agua de Jamaica $3.99, Limonada Natural $3.99, Cafe Cubano $2.99, Flan de Coco $5.99, Churros con Chocolate $6.99. HORARIO: Lun-Vie 11am-10pm, Sab-Dom 10am-11pm. DELIVERY: Si, $3 adicional. PICKUP: Gratis. Responde en el idioma del cliente. Se amistoso y profesional. Maximo 3 oraciones.",
      messages: [{ role: "user", content: message }]
    });
    return res.json({ reply: response.content[0].text });
  } catch (e) {
    console.error("Demo error:", e.message);
    return res.json({ reply: "Sorry, I had a problem. Please try again or contact us via WhatsApp." });
  }
});

app.post("/api/demo-autos", async (req, res) => {
  const message = (req.body?.message || "").toString();
  try {
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: "Eres IvA, asistente de Luis Soto Autos dealer en Puerto Rico y Florida. INVENTARIO: Honda CR-V 2022 $28,900 18,500mi SUV, Toyota Tacoma 2021 $34,500 24,000mi Truck, Hyundai Tucson 2023 $31,200 8,200mi SUV nuevo, Toyota Camry 2022 $26,400 21,000mi Sedan, Ford F-150 2021 $38,900 29,000mi Truck, Honda Civic 2023 $22,800 5,400mi Sedan nuevo. Aceptamos trade-in. Financiamiento todos los creditos desde $0 down. Horario Lun-Sab 9am-7pm. Captura nombre y telefono del prospecto. Maximo 3 oraciones. Responde en idioma del cliente.",
      messages: [{ role: "user", content: message }]
    });
    return res.json({ reply: response.content[0].text });
  } catch (e) {
    console.error("Demo autos error:", e.message);
    return res.json({ reply: "Disculpa, tuve un problema. Llámanos directamente." });
  }
});

























// ==========================================
// IvA SALES ASSISTANT - Conversational AI
// ==========================================
app.post("/api/iva-sales", express.json(), async (req, res) => {
  const { message, history = [], lang = "es", context = {} } = req.body;

  const systemES = `Eres IvA, el asistente de ventas de Ivamar AI — una plataforma que crea asistentes de IA para negocios.

TU MISIÓN: Demostrar el producto EN VIVO mientras conversas. El usuario está experimentando exactamente cómo funcionaría su propio asistente.

SERVICIOS DE IVAMAR AI:
- Asistente IA solo (integración a web existente o link directo): $125 setup + desde $29/mes
- Asistente IA + Landing Page: $250 setup + desde $29/mes
- El asistente funciona en: web propia, link directo para redes sociales, Instagram bio, Facebook, WhatsApp
- No se necesita web propia — el link directo funciona solo
- Dominio personalizado disponible como addon
- Setup en 48 horas
- Soporte en español e inglés
- Sin contratos, cancela cuando quieras

REGLAS DE CONVERSACIÓN:
1. DETECTA LA INTENCIÓN antes de responder. El usuario puede estar: respondiendo, preguntando, describiendo su negocio, confundido o cambiando de tema.
2. Si el usuario PREGUNTA algo — respóndelo PRIMERO, luego continúa la conversación.
3. Si el usuario describe su negocio cuando preguntas otra cosa — reconócelo y úsalo.
4. NUNCA asumas que cualquier respuesta es el nombre del asistente si claramente es otra cosa.
5. USA el nombre del usuario naturalmente cuando lo sepas.
6. NO presiones agresivamente por email o teléfono — captura leads orgánicamente.
7. Varía tus respuestas — no repitas frases ni emojis.
8. Sé paciente con usuarios confundidos — simplifica.
9. Máximo 4 oraciones por respuesta — conversacional y conciso.
10. Responde SIEMPRE en español en esta versión.

CONTEXTO CONOCIDO DEL USUARIO:
- Nombre: ${context.name || "desconocido"}
- Tipo de negocio: ${context.businessType || "desconocido"}
- Tiene web: ${context.hasWebsite || "desconocido"}
- Nombre del asistente elegido: ${context.assistantName || "no elegido"}
- Ubicación: ${context.location || "desconocida"}

FLUJO SUGERIDO (no rígido — adáptate):
1. Saluda y presenta
2. Pregunta de dónde visita
3. Pregunta nombre
4. Pregunta tipo de negocio
5. Reacciona con casos de uso específicos para su industria
6. Invita a elegir nombre para su asistente
7. Explica disponibilidad 24/7
8. Pregunta si tiene web
9. Explica integración o link directo según su caso
10. Captura email y teléfono naturalmente
11. Explica próximos pasos

RECUERDA: Eres el DEMO del producto. La experiencia de conversar contigo ES la demostración.`;

  const systemEN = `You are IvA, the sales assistant for Ivamar AI — a platform that creates AI assistants for businesses.

YOUR MISSION: Demonstrate the product LIVE while you chat. The user is experiencing exactly how their own assistant would work.

IVAMAR AI SERVICES:
- AI Assistant only (web integration or direct link): $125 setup + from $29/month
- AI Assistant + Landing Page: $250 setup + from $29/month
- The assistant works on: existing website, direct link for social media, Instagram bio, Facebook, WhatsApp
- No website needed — direct link works standalone
- Custom domain available as addon
- Setup in 48 hours
- English and Spanish support
- No contracts, cancel anytime

CONVERSATION RULES:
1. DETECT INTENT before responding. The user may be: answering, asking a question, describing their business, confused, or changing topic.
2. If the user ASKS something — answer it FIRST, then continue the conversation.
3. If the user describes their business when you asked something else — acknowledge it and use it.
4. NEVER assume any response is the assistant name if it's clearly something else.
5. USE the user's name naturally when you know it.
6. Do NOT aggressively push for email or phone — capture leads organically.
7. Vary your responses — don't repeat phrases or emojis.
8. Be patient with confused users — simplify.
9. Maximum 4 sentences per response — conversational and concise.
10. Always respond in English in this version.

KNOWN USER CONTEXT:
- Name: ${context.name || "unknown"}
- Business type: ${context.businessType || "unknown"}
- Has website: ${context.hasWebsite || "unknown"}
- Chosen assistant name: ${context.assistantName || "not chosen"}
- Location: ${context.location || "unknown"}

SUGGESTED FLOW (not rigid — adapt):
1. Greet and introduce
2. Ask where they're visiting from
3. Ask their name
4. Ask business type
5. React with specific use cases for their industry
6. Invite them to choose a name for their assistant
7. Explain 24/7 availability
8. Ask if they have a website
9. Explain integration or direct link based on their case
10. Capture email and phone naturally
11. Explain next steps

REMEMBER: You ARE the product demo. The experience of talking to you IS the demonstration.`;

  const systemPrompt = lang === "en" ? systemEN : systemES;

  const messages = [
    ...(history || []),
    { role: "user", content: message }
  ];

  try {
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      system: systemPrompt,
      messages: messages
    });
    return res.json({ reply: response.content[0].text });
  } catch (e) {
    console.error("IvA Sales error:", e.message);
    const fallback = lang === "en"
      ? "Sorry, I had a technical issue. Please reach us on WhatsApp directly."
      : "Disculpa, tuve un problema técnico. Por favor escríbenos por WhatsApp directamente.";
    return res.json({ reply: fallback });
  }
});

app.post("/api/assistant", async (req, res) => {
  const message = (req.body?.message || "").toString();
  const businessSlug = req.body?.businessSlug || null;

  let systemPrompt = "Eres IvA, el asistente virtual de Ivamar AI. Ayudas a negocios en Puerto Rico y USA con paginas web con IA, asistentes digitales y menus digitales. Responde en el idioma del cliente. Se amigable y conciso. Servicios: paginas web con asistente de IA, menus digitales para restaurantes y food trucks, asistentes digitales para cualquier negocio. Setup: $125. Mensual desde $49/mes. Primer mes gratis.";

  if (businessSlug === "demo") {
    systemPrompt = "Eres El Bori, el asistente boricua de El Rincon Boricua, un food truck en Puerto Rico. MENU: Mofongo con Camarones $14.99, Pernil Plate $13.99, Chuletas Can-Can $15.99, Alcapurrias de Pollo $8.99, Tostones con Mojo $5.99, Empanadillas x4 $7.99, Coquito Shake $5.99, Limonada Tamarindo $3.99, Malta Caribena $2.99, Tembleque $4.99, Arroz con Leche $3.99. UBICACION: Caguas, Puerto Rico. HORARIO: Mar-Jue 4pm-10pm, Vie 4pm-11pm, Sab-Dom 12pm-11pm, Lun Cerrado. DELIVERY: Si, $3 adicional. PICKUP: Gratis. PERSONALIDAD: Boricua autentico de Puerto Rico. Usa: brutal, riquísimo, espectacular, a otro nivel, wepa, duro, al punto. Para tiempo: ahora, en pal de minutos. NUNCA uses: ahorita, que lo que, expresiones mexicanas o dominicanas. Responde en el idioma del cliente. Maximo 3 oraciones.";
  } else if (businessSlug) {
    const bizFile = path.join(__dirname, "..", "data", "businesses", `${businessSlug}.json`);
    if (fs.existsSync(bizFile)) {
      try {
        const biz = JSON.parse(fs.readFileSync(bizFile, "utf8"));
        systemPrompt = `Eres ${biz.assistant?.name || "IvA"}, un asistente de IA para ${biz.name}. Tipo: ${biz.headline || "Negocio local"}. Descripcion: ${biz.description || ""}. Direccion: ${biz.address || ""}. Horario: ${biz.hours || ""}. Estado: ${biz.status || "abierto"}. WhatsApp: ${biz.links?.whatsapp || ""}. Menu: ${(biz.menu || []).map(i => i.name + (i.price ? " $" + i.price : "")).join(", ")}. Bebidas: ${(biz.drinks || []).map(i => i.name + (i.price ? " $" + i.price : "")).join(", ")}. Tono: ${biz.assistant?.tone || "amistoso y profesional"}. Responde en el idioma del cliente. Maximo 3 oraciones. Cuando el cliente quiera ordenar, guialo a WhatsApp.`;
      } catch (e) {
        console.error("Error loading business:", e.message);
      }
    }
  }

  try {
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: systemPrompt,
      messages: [{ role: "user", content: message }]
    });
    return res.json({ reply: response.content[0].text });
  } catch (e) {
    console.error("Claude API error:", e.status, e.message);
    return res.json({ reply: "Disculpa, tuve un problema tecnico. Por favor escribeme directamente por WhatsApp." });
  }
});

// ==========================================
// START FORM
// ==========================================

app.get("/start", (req, res) => {
  const body = `
  <div class="card">
    <h1>Comienza tu página con Ivamar AI</h1>
    <p style="margin-bottom:20px;">En menos de 48 horas tu negocio tiene su propia página con asistente de IA.</p>
    <form method="POST" action="/start">
      <label>Nombre del negocio</label>
      <input type="text" name="businessName" placeholder="Ej. El Rincón Boricua" required style="margin-bottom:16px;padding:10px;" />
      <label>Nombre del dueño</label>
      <input type="text" name="ownerName" placeholder="Tu nombre" required style="margin-bottom:16px;padding:10px;" />
      <label>Email</label>
      <input type="email" name="email" placeholder="ejemplo@email.com" required style="margin-bottom:16px;padding:10px;" />
      <label>WhatsApp</label>
      <input type="text" name="whatsapp" placeholder="787-000-0000" required style="margin-bottom:16px;padding:10px;" />
      <label>Tipo de negocio</label>
      <select name="businessType" required style="margin-bottom:16px;padding:10px;">
        <option value="">Selecciona</option>
        <option>Food Truck</option><option>Restaurante</option><option>Panadería</option>
        <option>Cafetería</option><option>Dealer de Autos</option><option>Salón de Belleza</option>
        <option>Servicios Profesionales</option><option>Otro</option>
      </select>
      <label>Descripción</label>
      <textarea name="description" rows="3" placeholder="Describe tu negocio" style="margin-bottom:16px;padding:10px;"></textarea>
      <label>Menú o servicios</label>
      <textarea name="menu" rows="5" placeholder="Ej. Tripleta - $12" style="margin-bottom:16px;padding:10px;"></textarea>
      <label>Bebidas</label>
      <textarea name="drinks" rows="3" placeholder="Ej. Refresco - $2" style="margin-bottom:16px;padding:10px;"></textarea>
      <label>Dirección</label>
      <input type="text" name="address" placeholder="Ej. PR-2 Km 45, Arecibo, PR" style="margin-bottom:16px;padding:10px;" />
      <label>Horario</label>
      <input type="text" name="hours" placeholder="Lunes a Domingo 11am-9pm" style="margin-bottom:16px;padding:10px;" />
      <label>Logo (link)</label>
      <input type="text" name="logoUrl" placeholder="https://..." style="margin-bottom:16px;padding:10px;" />
      <div style="margin:24px 0;padding:16px;border:1px solid #ddd;border-radius:8px;">
        <p><b>Setup: $125</b> · <b>Mensual: $49</b></p>
        <p style="font-size:0.85rem;margin-top:4px;">Primer mes incluido gratis</p>
      </div>
      <div class="btns">
        <button class="btn primary" type="submit">Continuar</button>
        <a class="btn ghost" href="/">Volver</a>
      </div>
    </form>
  </div>`;
  res.send(layout({ title: "Start Now — Ivamar AI", body }));
});

app.post("/start", async (req, res) => {
  const { businessName = "", ownerName = "", email = "", whatsapp = "", businessType = "", description = "", menu = "", drinks = "", logoUrl = "", address = "", hours = "" } = req.body || {};
  const slug = businessName.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  function parseItems(text) {
    return (text || "").split("\n").map(l => l.trim()).filter(Boolean).map(line => {
      const m = line.match(/^(.*?)-\s*\$?(\d+(?:\.\d{1,2})?)$/);
      if (m) return { name: m[1].trim(), price: Number(m[2]), desc: "" };
      return { name: line, price: null, desc: "" };
    });
  }

  const businessData = {
    slug, name: businessName,
    headline: `${businessType || "Negocio local"} con Ivamar AI`,
    description: description || "Próximamente más información.",
    logoUrl, businessPhotoUrl: "", address, hours, status: "abierto", theme: "light",
    assistant: { name: "IvA", tone: "amistoso y profesional", welcome: `¡Hola! Soy IvA, el asistente de ${businessName}. ¿En qué te ayudo hoy?`, keywords: [], avatarUrl: "" },
    links: { whatsapp: whatsapp ? `https://wa.me/${String(whatsapp).replace(/\D/g, "")}` : "#", instagram: "#", googleMaps: "#" },
    menu: parseItems(menu).length ? parseItems(menu) : [{ name: "Menú pendiente", price: 0, desc: "" }],
    sides: [], drinks: parseItems(drinks), desserts: []
  };

  const bizFile = path.join(__dirname, "..", "data", "businesses", `${slug}.json`);
  fs.writeFileSync(bizFile, JSON.stringify(businessData, null, 2), "utf8");

  const siteUrl = `${req.protocol}://${req.get("host")}`;
  try {
    const out = await postJson(BILLING_API_URL, { plan: "setup-125", slug, businessName, ownerName, email, whatsapp, businessType, successUrl: `${siteUrl}/${slug}`, cancelUrl: `${siteUrl}/start` }, { headers: { Authorization: `Bearer ${BILLING_API_KEY}` } });
    let data = null;
    try { data = out.body ? JSON.parse(out.body) : null; } catch (_) {}
    const checkoutUrl = data?.url || data?.checkoutUrl || data?.checkout_url;
    if (out.status >= 200 && out.status < 300 && checkoutUrl) return res.redirect(checkoutUrl);
  } catch (e) { console.error("Error checkout:", e.message); }

  return res.redirect(`/${slug}`);
});

// ==========================================
// DYNAMIC BUSINESS PAGES
// ==========================================

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
    const assistantWelcome = data.assistant?.welcome || "¡Hola! ¿En qué te ayudo hoy?";
    const whatsappNumber = (data.links?.whatsapp || "").replace(/\D/g, "");
    const hours = typeof data.hours === "string" ? data.hours : "";

    let statusLabel = "";
    if (data.status === "cerrado") statusLabel = "🔴 Cerrado";
    else if (data.status === "vacaciones") statusLabel = "🌴 Vacaciones";
    else if (data.status === "feriado") statusLabel = "📅 Feriado";
    else statusLabel = "🟢 Open";

    const chatHTML = `
<style>
.iva-chat-section{margin-top:40px;padding:24px;background:#0D1420;border-radius:16px;border:1px solid rgba(0,229,200,0.15);}
.iva-chat-section h3{font-family:sans-serif;font-size:18px;font-weight:700;color:#F0F4FF;margin-bottom:4px;}
.iva-chat-section p{font-size:13px;color:#8892A4;margin-bottom:16px;}
.iva-chat-box{background:#080C12;border:1px solid rgba(255,255,255,0.06);border-radius:12px;overflow:hidden;}
.iva-chat-topbar{background:#111827;padding:12px 16px;display:flex;align-items:center;gap:10px;border-bottom:1px solid rgba(255,255,255,0.05);}
.iva-chat-avatar{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#00E5C8,#00a896);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;}
.iva-chat-agent{flex:1;}
.iva-chat-agent-name{font-size:13px;font-weight:700;color:#F0F4FF;}
.iva-chat-agent-status{font-size:11px;color:#4CAF50;display:flex;align-items:center;gap:4px;}
.iva-chat-agent-status::before{content:'●';font-size:8px;}
.iva-chat-msgs{height:280px;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;scroll-behavior:smooth;}
.iva-msg{max-width:82%;display:flex;flex-direction:column;gap:3px;}
.iva-msg.bot{align-self:flex-start;}
.iva-msg.user{align-self:flex-end;}
.iva-msg-bubble{padding:10px 13px;border-radius:12px;font-size:13px;line-height:1.5;font-family:sans-serif;}
.iva-msg.bot .iva-msg-bubble{background:#1C2536;color:#F0F4FF;border-bottom-left-radius:4px;}
.iva-msg.user .iva-msg-bubble{background:#00E5C8;color:#030508;border-bottom-right-radius:4px;font-weight:500;}
.iva-msg-time{font-size:10px;color:#4A5568;}
.iva-msg.user .iva-msg-time{text-align:right;}
.iva-typing{display:flex;gap:3px;padding:10px 13px;background:#1C2536;border-radius:12px;border-bottom-left-radius:4px;width:fit-content;}
.iva-typing span{width:5px;height:5px;background:#8892A4;border-radius:50%;animation:ivaTyping 1.2s ease-in-out infinite;}
.iva-typing span:nth-child(2){animation-delay:0.2s;}
.iva-typing span:nth-child(3){animation-delay:0.4s;}
@keyframes ivaTyping{0%,100%{opacity:0.3;transform:scale(0.8)}50%{opacity:1;transform:scale(1)}}
.iva-suggestions{display:flex;gap:6px;flex-wrap:wrap;padding:8px 16px;}
.iva-suggestion{padding:5px 10px;background:rgba(0,229,200,0.07);border:1px solid rgba(0,229,200,0.2);border-radius:100px;font-size:11px;color:#00E5C8;cursor:pointer;transition:all 0.2s;white-space:nowrap;}
.iva-suggestion:hover{background:rgba(0,229,200,0.15);}
.iva-chat-input-area{padding:12px 16px;border-top:1px solid rgba(255,255,255,0.05);display:flex;gap:8px;align-items:center;}
.iva-chat-input{flex:1;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:10px 14px;color:#F0F4FF;font-family:sans-serif;font-size:13px;outline:none;}
.iva-chat-input:focus{border-color:rgba(0,229,200,0.4);}
.iva-chat-input::placeholder{color:#4A5568;}
.iva-chat-send{width:36px;height:36px;background:#00E5C8;border:none;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;transition:all 0.2s;flex-shrink:0;}
.iva-float-btn{position:fixed;bottom:24px;right:24px;width:56px;height:56px;background:linear-gradient(135deg,#00E5C8,#00a896);border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:22px;box-shadow:0 8px 25px rgba(0,229,200,0.35);z-index:999;transition:all 0.3s;}
.iva-float-btn:hover{transform:scale(1.1);}
.iva-float-badge{position:absolute;top:-2px;right:-2px;width:16px;height:16px;background:#4CAF50;border-radius:50%;border:2px solid white;}
.iva-float-panel{position:fixed;bottom:90px;right:24px;width:300px;max-height:420px;background:#0D1420;border:1px solid rgba(0,229,200,0.2);border-radius:16px;overflow:hidden;z-index:998;display:none;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,0.5);}
.iva-float-panel.open{display:flex;}
.iva-float-header{background:#111827;padding:12px 14px;display:flex;align-items:center;gap:8px;border-bottom:1px solid rgba(255,255,255,0.05);}
.iva-float-avatar{width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#00E5C8,#00a896);display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;}
.iva-float-info{flex:1;}
.iva-float-name{font-size:11px;font-weight:700;color:#F0F4FF;}
.iva-float-status{font-size:10px;color:#4CAF50;}
.iva-float-close{background:transparent;border:none;color:#4A5568;font-size:15px;cursor:pointer;}
.iva-float-msgs{flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:8px;}
.iva-float-input-area{padding:8px 10px;border-top:1px solid rgba(255,255,255,0.05);display:flex;gap:6px;}
.iva-float-input{flex:1;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:7px;padding:7px 10px;color:#F0F4FF;font-family:sans-serif;font-size:12px;outline:none;}
.iva-float-input::placeholder{color:#4A5568;}
.iva-float-send{width:30px;height:30px;background:#00E5C8;border:none;border-radius:7px;cursor:pointer;font-size:11px;}
</style>

<div class="iva-chat-section">
  <h3>💬 Chat with ${assistantName}</h3>
  <p>Your AI assistant available 24/7 — in English & Spanish.</p>
  <div class="iva-chat-box">
    <div class="iva-chat-topbar">
      <div class="iva-chat-avatar">🤖</div>
      <div class="iva-chat-agent">
        <div class="iva-chat-agent-name">${assistantName} — ${data.name}</div>
        <div class="iva-chat-agent-status">Online now</div>
      </div>
    </div>
    <div class="iva-chat-msgs" id="ivaMsgs">
      <div class="iva-msg bot">
        <div class="iva-msg-bubble">${assistantWelcome}</div>
        <div class="iva-msg-time">Now</div>
      </div>
    </div>
    <div class="iva-suggestions" id="ivaSuggestions">
      <span class="iva-suggestion" onclick="ivaSendSugg(this)">What's on the menu?</span>
      <span class="iva-suggestion" onclick="ivaSendSugg(this)">What are the hours?</span>
      <span class="iva-suggestion" onclick="ivaSendSugg(this)">How do I order?</span>
    </div>
    <div class="iva-chat-input-area">
      <input class="iva-chat-input" id="ivaInput" placeholder="Escribe tu pregunta..." onkeydown="if(event.key==='Enter')ivaSend('main')" />
      <button class="iva-chat-send" onclick="ivaSend('main')">➤</button>
    </div>
  </div>
</div>

<button class="iva-float-btn" onclick="ivaToggleFloat()">
  🤖<div class="iva-float-badge"></div>
</button>
<div class="iva-float-panel" id="ivaFloatPanel">
  <div class="iva-float-header">
    <div class="iva-float-avatar">🤖</div>
    <div class="iva-float-info">
      <div class="iva-float-name">${assistantName} — ${data.name}</div>
      <div class="iva-float-status">● En línea</div>
    </div>
    <button class="iva-float-close" onclick="ivaToggleFloat()">✕</button>
  </div>
  <div class="iva-float-msgs" id="ivaFloatMsgs">
    <div class="iva-msg bot">
      <div class="iva-msg-bubble">${assistantWelcome}</div>
      <div class="iva-msg-time">Now</div>
    </div>
  </div>
  <div class="iva-float-input-area">
    <input class="iva-float-input" id="ivaFloatInput" placeholder="Escribe aquí..." onkeydown="if(event.key==='Enter')ivaSend('float')" />
    <button class="iva-float-send" onclick="ivaSend('float')">➤</button>
  </div>
</div>

<script>
const IVA_SLUG = "${slug}";
function ivaToggleFloat(){document.getElementById('ivaFloatPanel').classList.toggle('open');}
function ivaAddMsg(cId,text,type){const c=document.getElementById(cId);const now=new Date().toLocaleTimeString('es',{hour:'2-digit',minute:'2-digit'});const d=document.createElement('div');d.className='iva-msg '+type;d.innerHTML='<div class="iva-msg-bubble">'+text+'</div><div class="iva-msg-time">'+now+'</div>';c.appendChild(d);c.scrollTop=c.scrollHeight;}
function ivaShowTyping(cId){const c=document.getElementById(cId);const d=document.createElement('div');d.className='iva-msg bot';d.id='ivaT_'+cId;d.innerHTML='<div class="iva-typing"><span></span><span></span><span></span></div>';c.appendChild(d);c.scrollTop=c.scrollHeight;}
function ivaHideTyping(cId){const el=document.getElementById('ivaT_'+cId);if(el)el.remove();}
async function ivaSend(mode){
  const iId=mode==='float'?'ivaFloatInput':'ivaInput';
  const mId=mode==='float'?'ivaFloatMsgs':'ivaMsgs';
  const input=document.getElementById(iId);
  const text=input.value.trim();if(!text)return;
  input.value='';
  const sugg=document.getElementById('ivaSuggestions');if(sugg)sugg.style.display='none';
  ivaAddMsg(mId,text,'user');ivaShowTyping(mId);
  try{
    const r=await fetch('/api/assistant',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text,businessSlug:IVA_SLUG})});
    const data=await r.json();
    ivaHideTyping(mId);ivaAddMsg(mId,data.reply||'¿En qué más te ayudo?','bot');
  }catch(e){ivaHideTyping(mId);ivaAddMsg(mId,'Disculpa, tuve un problema. Intenta de nuevo.','bot');}
}
function ivaSendSugg(el){document.getElementById('ivaInput').value=el.textContent;ivaSend('main');}
<\/script>`;

    const body = `
      <div class="card" style="${pageStyle}">
        ${data.businessPhotoUrl ? `<div style="margin:-20px -20px 24px -20px;overflow:hidden;border-radius:16px 16px 0 0;"><img src="${data.businessPhotoUrl}" alt="${data.name}" style="width:100%;height:300px;object-fit:cover;display:block;" /></div>` : ""}
        <div style="text-align:center;margin-bottom:18px;">
          ${data.logoUrl ? `<img src="${data.logoUrl}" alt="${data.name}" style="width:80px;height:80px;object-fit:cover;border-radius:14px;border:3px solid #fff;box-shadow:0 6px 20px rgba(0,0,0,.15);margin-bottom:12px;" />` : ""}
          <div style="display:inline-block;margin-bottom:8px;padding:6px 14px;border-radius:999px;background:rgba(0,0,0,.05);font-weight:700;">${statusLabel}</div>
          <h1 style="margin:8px 0;font-size:30px;">${data.name}</h1>
          <p style="color:var(--muted);font-size:16px;max-width:600px;margin:0 auto;">${data.description || ""}</p>
        </div>
        ${data.address || hours ? `<div style="text-align:center;margin-bottom:20px;">${data.address ? `<div style="margin-bottom:6px;">📍 ${data.address}</div>` : ""}${hours ? `<div>🕐 ${hours}</div>` : ""}</div>` : ""}
        <div style="text-align:center;margin:20px 0;">
          <a href="${data.links?.whatsapp || "#"}" target="_blank" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;font-size:17px;font-weight:700;padding:13px 22px;border-radius:12px;">📲 Order via WhatsApp</a>
        </div>
        <h2 style="margin-top:36px;font-size:26px;">Menu</h2>
        <div class="grid">
          ${(data.menu || []).map((item, i) => `<div class="tile"><b>${item.name}</b><div style="font-size:13px;color:#888;margin-top:4px;">${item.desc || ""}</div><div style="margin-top:6px;font-weight:900;">${item.price !== null ? "$" + item.price : "Precio pendiente"}</div><div style="margin-top:10px;display:flex;align-items:center;gap:8px;"><button onclick="changeQty('menu-${i}',-1)" style="padding:5px 9px;border:none;border-radius:7px;cursor:pointer;">-</button><span id="qty-menu-${i}">0</span><button onclick="changeQty('menu-${i}',1)" style="padding:5px 9px;border:none;border-radius:7px;cursor:pointer;">+</button></div></div>`).join("")}
        </div>
        ${(data.drinks || []).length ? `<h2 style="margin-top:28px;font-size:22px;">Bebidas</h2><div class="grid">${(data.drinks || []).map((item, i) => `<div class="tile"><b>${item.name}</b><div style="margin-top:6px;font-weight:900;">${item.price !== null ? "$" + item.price : ""}</div><div style="margin-top:10px;display:flex;align-items:center;gap:8px;"><button onclick="changeQty('drink-${i}',-1)" style="padding:5px 9px;border:none;border-radius:7px;cursor:pointer;">-</button><span id="qty-drink-${i}">0</span><button onclick="changeQty('drink-${i}',1)" style="padding:5px 9px;border:none;border-radius:7px;cursor:pointer;">+</button></div></div>`).join("")}</div>` : ""}
        <div id="cart" style="margin-top:36px;padding:18px;border-radius:16px;background:#f0f0f0;">
          <h2 style="margin-top:0;">🛒 Your Order</h2>
          <div id="cart-items" style="margin-bottom:14px;color:#555;">Nothing added yet.</div>
          <div style="font-weight:700;"><div>Subtotal: $<span id="subtotal">0.00</span></div><div>Tax (11.5%): $<span id="tax">0.00</span></div><div style="font-size:18px;margin-top:6px;">Total: $<span id="total">0.00</span></div></div>
          <a id="send-order-btn" href="#" target="_blank" style="margin-top:14px;display:inline-block;width:100%;padding:12px;border-radius:10px;background:#25D366;color:white;font-weight:700;text-decoration:none;text-align:center;">Send Order via WhatsApp</a>
        </div>
        ${chatHTML}
        <script>
        const menuItems = ${JSON.stringify(data.menu || [])};
        const drinkItems = ${JSON.stringify(data.drinks || [])};
        const waNumber = "${whatsappNumber}";
        const bizName = "${data.name}";
        function changeQty(id,delta){const el=document.getElementById("qty-"+id);if(!el)return;let qty=parseInt(el.textContent||"0",10)+delta;if(qty<0)qty=0;el.textContent=qty;updateCart();}
        function updateCart(){let lines=[],subtotal=0;function process(items,prefix){items.forEach((item,i)=>{const el=document.getElementById("qty-"+prefix+"-"+i);const qty=el?parseInt(el.textContent||"0",10):0;if(qty>0){const price=Number.isFinite(Number(item.price))?Number(item.price):0;subtotal+=qty*price;lines.push(item.name+" x"+qty+" = $"+(qty*price).toFixed(2));}});}process(menuItems,"menu");process(drinkItems,"drink");document.getElementById("cart-items").innerHTML=lines.length?lines.join("<br/>"):"Nothing added yet.";const tax=subtotal*0.115;document.getElementById("subtotal").textContent=subtotal.toFixed(2);document.getElementById("tax").textContent=tax.toFixed(2);document.getElementById("total").textContent=(subtotal+tax).toFixed(2);const msg="🛒 *Order — "+bizName+"*\\n\\n"+lines.join("\\n")+"\\n\\n💰 *Total: $"+(subtotal+tax).toFixed(2)+"*\\n\\nThank you!";document.getElementById("send-order-btn").href="https://wa.me/"+waNumber+"?text="+encodeURIComponent(msg);}
        updateCart();
        <\/script>
      </div>`;
    return res.send(layout({ title: data.name, body }));
  }

  let clients = [];
  try {
    const raw = fs.readFileSync(clientsFilePath, "utf8");
    clients = JSON.parse(raw);
    if (!Array.isArray(clients)) clients = [];
  } catch (e) { clients = []; }

  const client = clients.find(item => item.slug === slug);
  if (client) {
    const body = `<div class="card"><h1>${client.businessName}</h1><p><b>WhatsApp:</b> ${client.whatsapp || "Pendiente"}</p><div class="btns" style="margin-top:16px;"><a class="btn ghost" href="/">Volver</a></div></div>`;
    return res.send(layout({ title: client.businessName, body }));
  }

  return res.status(404).send(layout({ title: "No encontrado", body: `<div class="card"><h2>Negocio no encontrado</h2><a class="btn ghost" href="/">Volver</a></div>` }));
});

app.listen(PORT, () => console.log("Servidor corriendo en puerto " + PORT));
