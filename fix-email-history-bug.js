const fs = require('fs');
let code = fs.readFileSync('src/views/planetaboricua.js', 'utf8');

const oldText = `          body: JSON.stringify({ email: emailMatch[0] })`;
const newText = `          body: JSON.stringify({ email: emailMatch[0], history: nayeliHistory })`;

if (code.includes(oldText)) {
  code = code.replace(oldText, newText);
  fs.writeFileSync('src/views/planetaboricua.js', code);
  console.log('✅ Listo - frontend ahora envía history con el email');
} else {
  console.log('❌ No encontrado');
}
