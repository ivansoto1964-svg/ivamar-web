const fs = require('fs');
const path = require('path');

// 1. Copy the noticias page
fs.copyFileSync(
  path.join(__dirname, 'noticias.js'),
  path.join('src', 'views', 'planetaboricua', 'noticias.js')
);
console.log('✅ Página noticias.js copiada a src/views/planetaboricua/');

// 2. Add route and require to server.js
let code = fs.readFileSync('src/server.js', 'utf8');

// Add require
const requireMarker = `const addNegocioPB = require("./views/planetaboricua/add-negocio");`;
const requireAddition = `const addNegocioPB = require("./views/planetaboricua/add-negocio");
const pbNoticias = require("./views/planetaboricua/noticias");`;

if (code.includes(requireMarker) && !code.includes('pbNoticias')) {
  code = code.replace(requireMarker, requireAddition);
  console.log('✅ Require de pbNoticias agregado');
}

// Add route before PB directorio section
const routeMarker = `// Formulario público
app.get("/pb/add-negocio", (req, res) => res.send(addNegocioPB));`;

const newRoute = `// Página de noticias PBN
app.get("/noticias", (req, res) => res.send(pbNoticias));

// Formulario público
app.get("/pb/add-negocio", (req, res) => res.send(addNegocioPB));`;

if (code.includes(routeMarker) && !code.includes('app.get("/noticias"')) {
  code = code.replace(routeMarker, newRoute);
  console.log('✅ Ruta /noticias agregada');
}

fs.writeFileSync('src/server.js', code);

// 3. Update the "Noticias en Vivo" section in planetaboricua.js with PBN logo and link
let pb = fs.readFileSync('src/views/planetaboricua.js', 'utf8');

const oldSection = `    <div class="sec-divider-inner">
      <span class="sec-divider-label">Noticias en Vivo</span>
      <div style="flex:1;height:2px;background:var(--red);margin:0 1rem;"></div>
      <span style="font-size:0.65rem;color:#999;">Actualizado automáticamente</span>
    </div>`;

const newSection = `    <div class="sec-divider-inner">
      <div style="display:flex;align-items:center;gap:0.6rem;">
        <img src="/pbn-logo.webp" alt="PBN" style="height:32px;width:32px;object-fit:contain;">
        <span class="sec-divider-label">PBN Noticias</span>
      </div>
      <div style="flex:1;height:2px;background:var(--red);margin:0 1rem;"></div>
      <a href="/noticias" style="font-size:0.72rem;color:var(--red);font-weight:700;text-decoration:none;">Ver todas →</a>
    </div>`;

if (pb.includes(oldSection)) {
  pb = pb.replace(oldSection, newSection);
  fs.writeFileSync('src/views/planetaboricua.js', pb);
  console.log('✅ Sección "Noticias en Vivo" actualizada con logo PBN y link a /noticias');
} else {
  console.log('❌ No encontré la sección de Noticias en Vivo');
}

console.log('\n🎉 PBN Noticias instalado');
