const fs = require('fs');
let code = fs.readFileSync('src/views/planetaboricua.js', 'utf8');

// 1. Update avatar from emoji to photo
code = code.replace(
  '<div class="nayeli-avatar">🇵🇷</div>',
  '<img src="/img/nayeli.jpg" alt="Nayeli" style="width:44px;height:44px;border-radius:50%;object-fit:cover;object-position:top;border:2px solid rgba(255,255,255,0.3);flex-shrink:0;">'
);

// 2. Update chat header status
code = code.replace(
  '<div class="nayeli-online">● En línea · Wepa, ¿en qué te ayudo?</div>',
  '<div class="nayeli-online">● En línea · Tu asistente boricua 🇵🇷</div>'
);

// 3. Update welcome message
code = code.replace(
  '<div class="n-msg n-bot">¡Wepa! 🇵🇷 Soy Nayeli, tu asistente boricua.<br><br>Puedo ayudarte con noticias de PR, encontrar negocios boricuas en USA, planificar un viaje a la isla, o simplemente charlar sobre lo nuestro. ¿Qué necesitas hoy? 😊</div>',
  '<div class="n-msg n-bot">¡Wepa! 🇵🇷 Soy Nayeli, tu asistente boricua.<br><br>Puedo ayudarte con mudanzas PR↔USA, licencias, registrar tu vehículo, servicios públicos, cultura boricua, negocios y mucho más. ¿En qué te ayudo hoy?</div>'
);

// 4. Replace the entire nayeliSend function and add history + email capture
const oldScript = `  try {
    const res = await fetch('/api/nayeli', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    });
    const data = await res.json();
    typing.textContent = data.reply || '¡Ay bendito! Intenta de nuevo.';
  } catch {
    typing.textContent = '¡Wepa! Algo salió mal. Intenta de nuevo 🇵🇷';
  }
  msgs.scrollTop = msgs.scrollHeight;
}`;

const newScript = `  try {
    const res = await fetch('/api/nayeli', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history: nayeliHistory })
    });
    const data = await res.json();
    const reply = data.reply || '¡Ay bendito! Intenta de nuevo.';
    typing.innerHTML = reply.replace(/\\n/g, '<br>');

    // Save to history
    nayeliHistory.push({ role: 'user', content: text });
    nayeliHistory.push({ role: 'assistant', content: reply });

    // Keep history manageable (last 10 exchanges)
    if (nayeliHistory.length > 20) nayeliHistory = nayeliHistory.slice(-20);

    // Email capture after 2+ exchanges - check if reply mentions email
    if (nayeliHistory.length >= 4 && !nayeliEmailCaptured) {
      const emailMatch = text.match(/[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}/);
      if (emailMatch) {
        nayeliEmailCaptured = true;
        await fetch('/api/nayeli', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailMatch[0] })
        });
      }
    }
  } catch {
    typing.textContent = '¡Wepa! Algo salió mal. Intenta de nuevo 🇵🇷';
  }
  msgs.scrollTop = msgs.scrollHeight;
}`;

code = code.replace(oldScript, newScript);

// 5. Add nayeliHistory variable before nayeliSend function
code = code.replace(
  'async function nayeliSend()',
  'let nayeliHistory = [];\nlet nayeliEmailCaptured = false;\nasync function nayeliSend()'
);

fs.writeFileSync('src/views/planetaboricua.js', code);
console.log('✅ Nayeli chat UI updated with photo, history and email capture');
