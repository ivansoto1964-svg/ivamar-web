let ivaHistory = [];
let ivaTyping = false;
const ivaLang = document.documentElement.lang === "en" ? "en" : (window.location.pathname.startsWith("/en") ? "en" : "es");

async function callIvA(message) {
  try {
    const response = await fetch('/api/iva-sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history: ivaHistory, lang: ivaLang, context: {} })
    });
    const data = await response.json();
    const reply = data.reply || 'Sorry, technical issue. Please contact us directly.';
    ivaHistory.push({ role: 'user', content: message });
    ivaHistory.push({ role: 'assistant', content: reply });
    if (ivaHistory.length > 20) ivaHistory = ivaHistory.slice(-20);
    return reply;
  } catch(e) { return 'Sorry, technical issue. Please contact us directly.'; }
}

function showTyping() {
  const msgs = document.getElementById('ivaMsgs');
  if (!msgs) return;
  const div = document.createElement('div');
  div.className = 'iv-msg iv-bot';
  div.id = 'ivaTypingIndicator';
  div.innerHTML = ivaLang === 'en' ? '<span style="opacity:0.5">IvA is typing...</span>' : '<span style="opacity:0.5">IvA está escribiendo...</span>';
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function removeTyping() {
  const el = document.getElementById('ivaTypingIndicator');
  if (el) el.remove();
}

function linkify(text) {
  return text
    .split('\n').join('<br>')
    .replace(/https?:\/\/[^\s<]+/g, url => '<a href="' + url + '" target="_blank" style="color:#00C896;text-decoration:underline;">' + url + '</a>')
    .replace(/ivamarai\.com\/[^\s<,)]+/g, url => '<a href="https://' + url + '" target="_blank" style="color:#00C896;text-decoration:underline;">' + url + '</a>');
}

function addMsg(text, type) {
  const msgs = document.getElementById('ivaMsgs');
  if (!msgs) return;
  const div = document.createElement('div');
  div.className = 'iv-msg iv-' + type;
  div.innerHTML = linkify(text);
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

async function ivaReply(el) {
  if (ivaTyping) return;
  const text = el.textContent;
  document.querySelectorAll('.iva-sugg').forEach(b => b.disabled = true);
  addMsg(text, 'user');
  ivaTyping = true;
  showTyping();
  const reply = await callIvA(text);
  removeTyping();
  addMsg(reply, 'bot');
  ivaTyping = false;
}

async function ivaSend() {
  if (ivaTyping) return;
  const input = document.getElementById('ivaInput');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  addMsg(text, 'user');
  ivaTyping = true;
  showTyping();
  const reply = await callIvA(text);
  removeTyping();
  addMsg(reply, 'bot');
  ivaTyping = false;
}
