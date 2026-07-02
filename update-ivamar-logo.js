const fs = require('fs');
const path = require('path');

const files = [
  'src/views/quote.js',
  'src/views/about.js',
  'src/views/demos-es.js',
  'src/views/terms.js',
  'src/views/contacto.js',
  'src/views/demos.js',
  'src/views/home.js',
  'src/views/privacy.js',
  'src/views/contact.js',
  'src/views/terms-es.js',
  'src/views/quote-es.js',
  'src/views/sobre-nosotros.js',
  'src/views/privacy-es.js'
];

let totalUpdated = 0;

files.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️ No encontrado: ${filePath}`);
    return;
  }

  let code = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  // Replace logo-white.png with the new logo
  if (code.includes('/logo-white.png')) {
    code = code.replace(/\/logo-white\.png/g, '/ivamar-ai-logo.png');
    updated = true;
    console.log(`✅ logo-white.png → ivamar-ai-logo.png en ${path.basename(filePath)}`);
  }

  // Replace home-sel-logo-mark (green square with "AI" text) with img tag
  const oldLogoMark = `<div class="home-sel-logo-mark">AI</div>`;
  const newLogoMark = `<img src="/ivamar-ai-logo.png" alt="Ivamar AI" style="width:40px;height:40px;object-fit:contain;">`;
  if (code.includes(oldLogoMark)) {
    code = code.replace(oldLogoMark, newLogoMark);
    updated = true;
    console.log(`✅ home-sel-logo-mark → img en ${path.basename(filePath)}`);
  }

  if (updated) {
    fs.writeFileSync(filePath, code);
    totalUpdated++;
  }
});

console.log(`\n🎉 ${totalUpdated} archivos actualizados con el nuevo logo de Ivamar AI`);
