const fs = require('fs');
const path = require('path');

// 1. Create the views directory for Planeta Boricua if it doesn't exist
const pbViewsDir = path.join('src', 'views', 'planetaboricua');
if (!fs.existsSync(pbViewsDir)) {
  fs.mkdirSync(pbViewsDir, { recursive: true });
  console.log('✅ Directorio src/views/planetaboricua/ creado');
}

// 2. Copy the form file
fs.copyFileSync(
  path.join(__dirname, 'add-negocio.js'),
  path.join(pbViewsDir, 'add-negocio.js')
);
console.log('✅ Formulario add-negocio.js copiado a src/views/planetaboricua/');

// 3. Create the pending directory for PB listings on disk
const pbPendingDir = '/data/pb-listings';
try {
  if (!fs.existsSync(pbPendingDir)) {
    fs.mkdirSync(pbPendingDir, { recursive: true });
    console.log('✅ Directorio /data/pb-listings/ creado');
  }
} catch(e) {
  console.log('ℹ️ /data/pb-listings/ se creará en Render (disco persistente)');
}

// 4. Add routes to server.js
let code = fs.readFileSync('src/server.js', 'utf8');

// Add require for the form view
const requireMarker = `const { getPlacePhoto } = require("./helpers/googlePhotos");`;
const requireAddition = `const { getPlacePhoto } = require("./helpers/googlePhotos");
const addNegocioPB = require("./views/planetaboricua/add-negocio");`;

if (code.includes(requireMarker) && !code.includes('addNegocioPB')) {
  code = code.replace(requireMarker, requireAddition);
  console.log('✅ Require de add-negocio agregado');
} else {
  console.log('ℹ️ Require ya existe o no encontré el marcador');
}

// Add routes before app.listen
const routesMarker = `app.listen(PORT, () => console.log("Servidor corriendo en puerto " + PORT));`;
const newRoutes = `
// ==========================================
// PLANETA BORICUA — DIRECTORIO DE NEGOCIOS
// ==========================================

// Formulario público
app.get("/pb/add-negocio", (req, res) => res.send(addNegocioPB));

// Submit de nuevo negocio
app.post("/api/pb-negocio-submit", formLimiter, express.json(), async (req, res) => {
  console.log("📋 PB Negocio submit:", req.body?.name);
  const name = sanitize(req.body.name);
  const category = sanitize(req.body.category);
  const location = sanitize(req.body.location);
  const city = sanitize(req.body.city);
  const zip = sanitize(req.body.zip || '');
  const address = sanitize(req.body.address || '');
  const desc = sanitize(req.body.desc);
  const fullDesc = sanitize(req.body.fullDesc);
  const email = sanitize(req.body.email);
  const whatsapp = sanitize(req.body.whatsapp || '');
  const website = sanitize(req.body.website || '');
  const instagram = sanitize(req.body.instagram || '');
  const photo = sanitize(req.body.photo);
  const price = sanitize(req.body.price || '');

  if (!name || !category || !location || !city || !desc || !fullDesc || !email || !photo) {
    return res.json({ ok: false, error: "Faltan campos requeridos" });
  }

  try {
    const fs2 = require('fs');
    const pathLib = require('path');
    const pendingFile = pathLib.join('/data/pb-listings/pending.json');
    const pendingDir = pathLib.dirname(pendingFile);
    if (!fs2.existsSync(pendingDir)) fs2.mkdirSync(pendingDir, { recursive: true });

    let pending = [];
    if (fs2.existsSync(pendingFile)) {
      pending = JSON.parse(fs2.readFileSync(pendingFile, 'utf8'));
    }

    const crypto = require('crypto');
    const negocio = {
      id: Date.now().toString(),
      status: 'pending',
      submittedAt: new Date().toISOString(),
      name, category, location, city, zip, address, desc, fullDesc,
      email, whatsapp, website, instagram, photo, price,
      approveToken: crypto.randomBytes(32).toString('hex'),
      rejectToken: crypto.randomBytes(32).toString('hex')
    };

    pending.push(negocio);
    fs2.writeFileSync(pendingFile, JSON.stringify(pending, null, 2));

    // Email notification to admin
    const { Resend } = require('resend');
    const resendClient = new Resend(process.env.RESEND_API_KEY);
    const approveUrl = 'https://masboricuaqueunmofongo.com/admin/pb-approve/' + negocio.approveToken;
    const rejectUrl = 'https://masboricuaqueunmofongo.com/admin/pb-reject/' + negocio.rejectToken;

    await resendClient.emails.send({
      from: 'Planeta Boricua <connect@ivamarai.com>',
      to: 'connect@ivamarai.com',
      subject: '🇵🇷 Nuevo Negocio PB: ' + name,
      html: \`
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#002D62,#CE1126);padding:1.5rem;border-radius:8px 8px 0 0;">
            <h2 style="color:#fff;margin:0;">🇵🇷 Nuevo Negocio en Planeta Boricua</h2>
          </div>
          <div style="padding:1.5rem;border:1px solid #eee;">
            <table style="border-collapse:collapse;width:100%">
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Negocio</td><td style="padding:8px;border:1px solid #ddd">\${name}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Categoría</td><td style="padding:8px;border:1px solid #ddd">\${category}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Ubicación</td><td style="padding:8px;border:1px solid #ddd">\${city}, \${location}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">ZIP</td><td style="padding:8px;border:1px solid #ddd">\${zip || 'N/A'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Dirección</td><td style="padding:8px;border:1px solid #ddd">\${address || 'N/A'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">\${email}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">WhatsApp</td><td style="padding:8px;border:1px solid #ddd">\${whatsapp || 'N/A'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Website</td><td style="padding:8px;border:1px solid #ddd">\${website || 'N/A'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Instagram</td><td style="padding:8px;border:1px solid #ddd">\${instagram || 'N/A'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Precio</td><td style="padding:8px;border:1px solid #ddd">\${price || 'N/A'}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Descripción</td><td style="padding:8px;border:1px solid #ddd">\${desc}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Foto</td><td style="padding:8px;border:1px solid #ddd"><img src="\${photo}" style="max-width:200px;border-radius:8px;"></td></tr>
            </table>
            <div style="margin-top:2rem;display:flex;gap:1rem;">
              <a href="\${approveUrl}" style="background:#16a34a;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:700;">✅ Aprobar y Publicar</a>
              <a href="\${rejectUrl}" style="background:#dc2626;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:700;">❌ Rechazar</a>
            </div>
          </div>
        </div>
      \`
    });

    return res.json({ ok: true });
  } catch(e) {
    console.error('PB negocio submit error:', e.message);
    return res.json({ ok: false, error: e.message });
  }
});

// Aprobar negocio via token (desde el email)
app.get("/admin/pb-approve/:token", async (req, res) => {
  try {
    const fs2 = require('fs');
    const pathLib = require('path');
    const pendingFile = pathLib.join('/data/pb-listings/pending.json');
    const approvedDir = '/data/pb-listings';

    let pending = JSON.parse(fs2.readFileSync(pendingFile, 'utf8'));
    const negocio = pending.find(n => n.approveToken === req.params.token);

    if (!negocio) return res.send('<h2>Token inválido o negocio ya procesado.</h2>');

    // Move to approved file by location
    const approvedFile = pathLib.join(approvedDir, negocio.location + '.json');
    let approved = [];
    if (fs2.existsSync(approvedFile)) {
      approved = JSON.parse(fs2.readFileSync(approvedFile, 'utf8'));
    }
    negocio.status = 'approved';
    negocio.approvedAt = new Date().toISOString();
    negocio.badge = 'boricua-verificado';
    approved.push(negocio);
    fs2.writeFileSync(approvedFile, JSON.stringify(approved, null, 2));

    // Remove from pending
    pending = pending.filter(n => n.approveToken !== req.params.token);
    fs2.writeFileSync(pendingFile, JSON.stringify(pending, null, 2));

    // Email confirmation to business
    try {
      const { Resend } = require('resend');
      const resendClient = new Resend(process.env.RESEND_API_KEY);
      await resendClient.emails.send({
        from: 'Planeta Boricua <connect@ivamarai.com>',
        to: negocio.email,
        subject: '🇵🇷 ¡Tu negocio fue aprobado en Planeta Boricua!',
        html: \`
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
            <div style="background:linear-gradient(135deg,#002D62,#CE1126);padding:2rem;border-radius:8px 8px 0 0;text-align:center;">
              <h1 style="color:#fff;margin:0;">🇵🇷 ¡Wepa! Estás aprobado</h1>
            </div>
            <div style="padding:2rem;border:1px solid #eee;">
              <p style="font-size:1rem;color:#333;">Hola, <strong>\${negocio.name}</strong>!</p>
              <p style="color:#555;line-height:1.6;margin-top:1rem;">Tu negocio ha sido verificado y ya aparece en el <strong>Directorio Boricua</strong> de Planeta Boricua con el badge de <strong>🏅 Boricua Verificado</strong>.</p>
              <p style="color:#555;line-height:1.6;margin-top:1rem;">Miles de boricuas en USA y Puerto Rico podrán encontrarte ahora mismo en <a href="https://masboricuaqueunmofongo.com/#directorio" style="color:#002D62;font-weight:700;">masboricuaqueunmofongo.com</a></p>
              <p style="color:#555;line-height:1.6;margin-top:1rem;">¿Necesitas actualizar información? Contáctanos en <strong>connect@ivamarai.com</strong></p>
              <p style="margin-top:2rem;font-size:0.85rem;color:#999;">© 2026 Planeta Boricua · Un proyecto de Ivamar AI LLC</p>
            </div>
          </div>
        \`
      });
    } catch(emailErr) {
      console.error('Error enviando email de aprobación:', emailErr.message);
    }

    res.send(\`
      <html><body style="font-family:sans-serif;text-align:center;padding:3rem;">
        <h2 style="color:#16a34a;">✅ ¡Negocio aprobado!</h2>
        <p><strong>\${negocio.name}</strong> ya aparece en el directorio de Planeta Boricua.</p>
        <p>Se envió email de confirmación a \${negocio.email}</p>
      </body></html>
    \`);
  } catch(e) {
    res.send('<h2>Error: ' + e.message + '</h2>');
  }
});

// Rechazar negocio via token (desde el email)
app.get("/admin/pb-reject/:token", async (req, res) => {
  try {
    const fs2 = require('fs');
    const pathLib = require('path');
    const pendingFile = pathLib.join('/data/pb-listings/pending.json');

    let pending = JSON.parse(fs2.readFileSync(pendingFile, 'utf8'));
    const negocio = pending.find(n => n.rejectToken === req.params.token);

    if (!negocio) return res.send('<h2>Token inválido o negocio ya procesado.</h2>');

    pending = pending.filter(n => n.rejectToken !== req.params.token);
    fs2.writeFileSync(pendingFile, JSON.stringify(pending, null, 2));

    // Email to business
    try {
      const { Resend } = require('resend');
      const resendClient = new Resend(process.env.RESEND_API_KEY);
      await resendClient.emails.send({
        from: 'Planeta Boricua <connect@ivamarai.com>',
        to: negocio.email,
        subject: 'Actualización sobre tu solicitud en Planeta Boricua',
        html: \`
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:2rem;">
            <h2>Hola, \${negocio.name}</h2>
            <p style="color:#555;line-height:1.6;">Gracias por tu interés en Planeta Boricua. En esta ocasión no pudimos aprobar tu solicitud. Esto puede deberse a información incompleta o que el negocio no cumple con nuestros criterios del directorio.</p>
            <p style="color:#555;line-height:1.6;margin-top:1rem;">Si crees que fue un error o quieres más información, contáctanos en <strong>connect@ivamarai.com</strong></p>
          </div>
        \`
      });
    } catch(emailErr) {
      console.error('Error enviando email de rechazo:', emailErr.message);
    }

    res.send(\`
      <html><body style="font-family:sans-serif;text-align:center;padding:3rem;">
        <h2 style="color:#dc2626;">❌ Negocio rechazado</h2>
        <p><strong>\${negocio.name}</strong> fue rechazado y eliminado de la lista de pendientes.</p>
        <p>Se envió email de notificación a \${negocio.email}</p>
      </body></html>
    \`);
  } catch(e) {
    res.send('<h2>Error: ' + e.message + '</h2>');
  }
});

// API para obtener negocios aprobados por ubicación
app.get("/api/pb-negocios/:location", (req, res) => {
  try {
    const fs2 = require('fs');
    const pathLib = require('path');
    const approvedFile = pathLib.join('/data/pb-listings', req.params.location + '.json');
    if (!fs2.existsSync(approvedFile)) return res.json({ negocios: [] });
    const negocios = JSON.parse(fs2.readFileSync(approvedFile, 'utf8'));
    const category = req.query.category;
    const filtered = category ? negocios.filter(n => n.category === category) : negocios;
    return res.json({ negocios: filtered });
  } catch(e) {
    return res.json({ negocios: [] });
  }
});

app.listen(PORT, () => console.log("Servidor corriendo en puerto " + PORT));`;

if (code.includes('app.listen(PORT, () => console.log("Servidor corriendo en puerto " + PORT));')) {
  code = code.replace(
    'app.listen(PORT, () => console.log("Servidor corriendo en puerto " + PORT));',
    newRoutes
  );
  console.log('✅ Rutas de directorio PB agregadas al server.js');
} else {
  console.log('❌ No encontré app.listen - revisar manualmente');
}

fs.writeFileSync('src/server.js', code);
console.log('\n🎉 Todo listo - ahora actualiza los links en planetaboricua.js');
