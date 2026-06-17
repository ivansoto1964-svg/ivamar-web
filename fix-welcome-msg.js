const fs = require('fs');
let code = fs.readFileSync('src/views/planetaboricua.js', 'utf8');

const oldText = `<div class="n-msg n-bot">¡Wepa! 🇵🇷 Soy Nayeli, tu asistente boricua.<br><br>Puedo ayudarte con mudanzas PR↔USA, licencias, registrar tu vehículo, servicios públicos, cultura boricua, negocios y mucho más. ¿En qué te ayudo hoy?</div>`;

const newText = `<div class="n-msg n-bot">¡Wepa! 🇵🇷 Soy Nayeli, tu asistente boricua. ¿Cómo te llamas?</div>`;

if (code.includes(oldText)) {
  code = code.replace(oldText, newText);
  fs.writeFileSync('src/views/planetaboricua.js', code);
  console.log('✅ Listo');
} else {
  console.log('❌ No encontrado');
}
