const fs = require('fs');
const path = require('path');

// 1. Copy template
fs.copyFileSync(
  path.join(__dirname, 'estado-template.js'),
  'src/views/planetaboricua/estado-template.js'
);
console.log('✅ Template installed: src/views/planetaboricua/estado-template.js');

// 2. Copy Florida JSON to data folder
if (!fs.existsSync('src/data/estados')) fs.mkdirSync('src/data/estados', { recursive: true });
fs.copyFileSync(
  path.join(__dirname, 'florida.json'),
  'src/data/estados/florida.json'
);
console.log('✅ Florida data installed: src/data/estados/florida.json');

// 3. Update server.js
let server = fs.readFileSync('src/server.js', 'utf8');

const requireLine = 'const renderEstado = require("./views/planetaboricua/estado-template");';
const routeLine = `
// PLANETA BORICUA — ESTADO PAGES
app.get("/florida", async (req, res) => {
  try {
    const estado = JSON.parse(fs.readFileSync(\`\${__dirname}/data/estados/florida.json\`, 'utf8'));
    const heroPhoto = await getPlacePhoto('Florida boricua community Orlando', 1600, 'Florida boricua community Orlando');
    estado.heroPhoto = heroPhoto;
    res.send(renderEstado(estado));
  } catch(e) {
    console.error(e);
    res.status(500).send('Error loading Florida page');
  }
});
`;

if (!server.includes('renderEstado')) {
  server = server.replace(
    'const mrFrappe = require("./views/mr-frappe");',
    'const mrFrappe = require("./views/mr-frappe");\n' + requireLine
  );
  console.log('✅ Require added');
} else {
  console.log('ℹ️ Require already exists');
}

if (!server.includes('/florida')) {
  server = server.replace(
    'app.get("/mr-frappe"',
    routeLine + '\napp.get("/mr-frappe"'
  );
  console.log('✅ Florida route added');
} else {
  console.log('ℹ️ Florida route already exists');
}

// Add florida to knownRoutes
if (!server.includes("'florida'")) {
  server = server.replace(
    "'mr-frappe'];",
    "'mr-frappe', 'florida'];"
  );
  console.log('✅ Added florida to knownRoutes');
}

// Add to sitemap
if (!server.includes('/florida</loc>')) {
  server = server.replace(
    "`<url><loc>${base}/caribex/directory-terms</loc>",
    "`<url><loc>\${base}/florida</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>`,\n    `<url><loc>\${base}/caribex/directory-terms</loc>"
  );
  console.log('✅ Added florida to sitemap');
}

fs.writeFileSync('src/server.js', server);
console.log('\n🎉 Florida page installed!');
console.log('URL: masboricuaqueunmofongo.com/florida');
