const fs = require('fs');
let code = fs.readFileSync('src/views/planetaboricua.js', 'utf8');

const oldLine = `<section class="nayeli-section" id="nayeli">`;
const newLine = `<section class="nayeli-section" id="nayeli" style="display:none;">`;

if (code.includes(oldLine)) {
  code = code.replace(oldLine, newLine);
  fs.writeFileSync('src/views/planetaboricua.js', code);
  console.log('✅ Sección de Nayeli oculta (display:none) - código intacto, fácil de reactivar después');
} else {
  console.log('❌ No encontré la línea exacta - revisar manualmente');
}
