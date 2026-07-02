const fs = require('fs');
let code = fs.readFileSync('src/server.js', 'utf8');

const oldRoute = `app.get("/:slug", (req, res) => {
  const slug = req.params.slug;
  const businessFile = path.join(__dirname, "..", "data", "businesses", \`\${slug}.json\`);
  const clientsFilePath = path.join(__dirname, "..", "data", "clients.json");`;

const newRoute = `app.get("/:slug", (req, res) => {
  const slug = req.params.slug;

  // Ignore static file requests (let express.static handle them)
  if (/\\.(png|jpg|jpeg|gif|svg|ico|js|css|webp|mp4|pdf|txt|xml|json)$/i.test(slug)) {
    return res.status(404).send('Not found');
  }

  const businessFile = path.join(__dirname, "..", "data", "businesses", \`\${slug}.json\`);
  const clientsFilePath = path.join(__dirname, "..", "data", "clients.json");`;

if (code.includes(oldRoute)) {
  code = code.replace(oldRoute, newRoute);
  fs.writeFileSync('src/server.js', code);
  console.log('✅ Ruta /:slug actualizada - ya no intercepta archivos estáticos');
} else {
  console.log('❌ No encontré la ruta exacta - revisar manualmente');
}
