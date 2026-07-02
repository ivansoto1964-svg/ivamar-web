const fs = require('fs');
let code = fs.readFileSync('src/server.js', 'utf8');

// Remove from current position
code = code.replace(`app.get("/noticias", (req, res) => res.send(pbNoticias));`, '// noticias route moved above /:slug');

// Add before /:slug
const slugMarker = `app.get("/autoridad-energia-criolla", (req, res) => res.send(aecDemo));

app.get("/:slug", (req, res) => {`;

const newCode = `app.get("/autoridad-energia-criolla", (req, res) => res.send(aecDemo));
app.get("/noticias", (req, res) => res.send(pbNoticias));

app.get("/:slug", (req, res) => {`;

if (code.includes(slugMarker)) {
  code = code.replace(slugMarker, newCode);
  fs.writeFileSync('src/server.js', code);
  console.log('✅ Ruta /noticias movida antes de /:slug');
} else {
  console.log('❌ No encontré el marcador');
}
