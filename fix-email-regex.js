const fs = require('fs');
let code = fs.readFileSync('src/views/planetaboricua.js', 'utf8');

const oldLine = `      const emailMatch = text.includes("@") ? [text.trim()] : null;`;

const newLine = `      const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/);`;

if (code.includes(oldLine)) {
  code = code.replace(oldLine, newLine);
  fs.writeFileSync('src/views/planetaboricua.js', code);
  console.log('✅ Extracción de email corregida: ahora usa regex real en vez de tomar el mensaje completo');
} else {
  console.log('❌ No encontré la línea exacta - revisar manualmente');
}
