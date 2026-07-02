const fs = require('fs');
let code = fs.readFileSync('src/server.js', 'utf8');

const marker = `// API para obtener negocios aprobados por ubicación
app.get("/api/pb-negocios/:location", (req, res) => {`;

const addition = `// API para obtener TODOS los negocios aprobados
app.get("/api/pb-negocios/all", (req, res) => {
  try {
    const fs2 = require('fs');
    const pathLib = require('path');
    const listingsDir = '/data/pb-listings';
    const category = req.query.category;
    let allNegocios = [];

    if (fs2.existsSync(listingsDir)) {
      fs2.readdirSync(listingsDir).forEach(file => {
        if (file.endsWith('.json') && file !== 'pending.json') {
          try {
            const negocios = JSON.parse(fs2.readFileSync(pathLib.join(listingsDir, file), 'utf8'));
            negocios.forEach(n => allNegocios.push(n));
          } catch(e) {}
        }
      });
    }

    if (category) allNegocios = allNegocios.filter(n => n.category === category);
    return res.json({ negocios: allNegocios });
  } catch(e) {
    return res.json({ negocios: [] });
  }
});

// API para obtener negocios aprobados por ubicación
app.get("/api/pb-negocios/:location", (req, res) => {`;

if (code.includes(marker)) {
  code = code.replace(marker, addition);
  fs.writeFileSync('src/server.js', code);
  console.log('✅ Endpoint /api/pb-negocios/all agregado');
} else {
  console.log('❌ No encontré el marcador - revisar manualmente');
}
