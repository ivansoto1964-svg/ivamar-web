const fs = require('fs');
const path = require('path');

// 1. Copy view file
const viewSrc = fs.readFileSync('/home/claude/mr-frappe/mr-frappe-v2.js', 'utf8');
fs.writeFileSync('src/views/mr-frappe.js', viewSrc);
console.log('✅ View file installed: src/views/mr-frappe.js');

// 2. Add route and require to server.js
let server = fs.readFileSync('src/server.js', 'utf8');

// Add require
if (!server.includes('mr-frappe')) {
  server = server.replace(
    'const adis = require("./views/adis");',
    'const adis = require("./views/adis");\nconst mrFrappe = require("./views/mr-frappe");'
  );
  console.log('✅ Require added to server.js');
} else {
  console.log('ℹ️ Require already exists');
}

// Add route
if (!server.includes('/mr-frappe')) {
  server = server.replace(
    'app.get("/adis", (req, res) => res.send(adis));',
    'app.get("/adis", (req, res) => res.send(adis));\napp.get("/mr-frappe", (req, res) => res.send(mrFrappe));'
  );
  console.log('✅ Route added: /mr-frappe');
} else {
  console.log('ℹ️ Route already exists');
}

// Add to knownRoutes
if (!server.includes("'mr-frappe'")) {
  server = server.replace(
    "const knownRoutes = ['autoridad-energia-criolla', 'pb', 'caribex', 'admin', 'api', 'start', 'demo', 'dyerkia', 'adis', 'noticias'];",
    "const knownRoutes = ['autoridad-energia-criolla', 'pb', 'caribex', 'admin', 'api', 'start', 'demo', 'dyerkia', 'adis', 'noticias', 'mr-frappe'];"
  );
  console.log('✅ Added to knownRoutes');
}

fs.writeFileSync('src/server.js', server);
console.log('\n🎉 Mr. Frappe demo installed successfully!');
console.log('URL: ivamarai.com/mr-frappe');
