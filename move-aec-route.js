const fs = require('fs');
let code = fs.readFileSync('src/server.js', 'utf8');

// Remove the route from its current position after /:slug
const oldRoute = `app.get("/autoridad-energia-criolla", (req, res) => res.send(aecDemo));`;
code = code.replace(oldRoute, '// AEC route moved above /:slug');

// Add it before /:slug
const slugMarker = `app.get("/:slug", (req, res) => {`;
const newCode = `app.get("/autoridad-energia-criolla", (req, res) => res.send(aecDemo));

app.get("/:slug", (req, res) => {`;

if (code.includes(slugMarker)) {
  code = code.replace(slugMarker, newCode);
  fs.writeFileSync('src/server.js', code);
  console.log('✅ Ruta de AEC movida antes de /:slug');
} else {
  console.log('❌ No encontré el marcador /:slug');
}
