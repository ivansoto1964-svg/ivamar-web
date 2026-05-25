
let acHistory = [];
let acTyping = false;

async function callKiaAssistant(message) {
  try {
    const res = await fetch('/api/iva-sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        history: acHistory,
        lang: message.match(/[áéíóúñ¿¡]/i) ? 'es' : 'en',
        context: {
          businessType: 'Kia dealership',
          name: 'Kia Assistant'
        }
      })
    });
    const data = await res.json();
    const reply = data.reply || "I'm having a quick issue. Please call us at (863) 676-0595!";
    acHistory.push({ role: 'user', content: message });
    acHistory.push({ role: 'assistant', content: reply });
    if (acHistory.length > 20) acHistory = acHistory.slice(-20);
    return reply;
  } catch(e) {
    return "I'm having a quick issue. Please call us at (863) 676-0595!";
  }
}

function showTyping() {
  const msgs = document.getElementById('acMsgs');
  const div = document.createElement('div');
  div.className = 'ac-bot';
  div.id = 'acTyping';
  div.innerHTML = '<span style="opacity:0.5">Kia Assistant is typing...</span>';
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function removeTyping() {
  const el = document.getElementById('acTyping');
  if (el) el.remove();
}

function addMsg(text, type) {
  const msgs = document.getElementById('acMsgs');
  const div = document.createElement('div');
  div.className = type === 'user' ? 'ac-user' : 'ac-bot';
  div.innerHTML = text.replace(/\*\*/g, '').split('\n').join('<br>');
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

async function acReply(el) {
  if (acTyping) return;
  const text = el.textContent;
  document.querySelectorAll('.ac-sugg').forEach(b => b.disabled = true);
  addMsg(text, 'user');
  acTyping = true;
  showTyping();
  const reply = await callKiaAssistant(text);
  removeTyping();
  addMsg(reply, 'bot');
  acTyping = false;
}

async function acSend() {
  if (acTyping) return;
  const input = document.getElementById('acInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  addMsg(text, 'user');
  acTyping = true;
  showTyping();
  const reply = await callKiaAssistant(text);
  removeTyping();
  addMsg(reply, 'bot');
  acTyping = false;
}
