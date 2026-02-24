const express = require("express");
const layout = require("./views/layout");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;

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
