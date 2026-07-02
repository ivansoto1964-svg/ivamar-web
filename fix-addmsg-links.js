const fs = require('fs');
let code = fs.readFileSync('public/caribex-chat.js', 'utf8');

const oldFn = `function addMsg(text, type) {
  const msgs = document.getElementById('caribexMsgs');
  const div = document.createElement('div');
  div.className = type === 'user' ? 'c-user' : 'c-bot';
  div.innerHTML = text.replace(/\\*\\*/g, '').split('\\n').join('<br>');
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}`;

const newFn = `function addMsg(text, type) {
  const msgs = document.getElementById('caribexMsgs');
  const div = document.createElement('div');
  div.className = type === 'user' ? 'c-user' : 'c-bot';
  // Convert markdown links [Text](url) into real clickable <a> tags
  let formatted = text.replace(/\\*\\*/g, '');
  formatted = formatted.replace(/\\[([^\\]]+)\\]\\((https?:\\/\\/[^\\s)]+)\\)/g, '<a href="$2" target="_blank" rel="noopener" style="color:#2dd4bf;text-decoration:underline;font-weight:600;">$1</a>');
  div.innerHTML = formatted.split('\\n').join('<br>');
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}`;

if (code.includes(oldFn)) {
  code = code.replace(oldFn, newFn);
  fs.writeFileSync('public/caribex-chat.js', code);
  console.log('✅ Función addMsg actualizada - ahora convierte [texto](url) en links clicables reales');
} else {
  console.log('❌ No encontré la función exacta - revisar manualmente');
}
