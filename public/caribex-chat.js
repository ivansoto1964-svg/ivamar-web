
let caribexHistory = [];
let caribexTyping = false;

async function callCaribex(message) {
  try {
    const res = await fetch('/api/caribex', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        history: caribexHistory
      })
    });
    const data = await res.json();
    const reply = data.reply || "I'm having a quick issue. Visit yourcaribbeanexpert.com for more Caribbean insights!";
    caribexHistory.push({ role: 'user', content: message });
    caribexHistory.push({ role: 'assistant', content: reply });
    if (caribexHistory.length > 20) caribexHistory = caribexHistory.slice(-20);
    return reply;
  } catch(e) {
    return "I'm having a quick issue. Visit yourcaribbeanexpert.com for more Caribbean insights!";
  }
}

function showTyping() {
  const msgs = document.getElementById('caribexMsgs');
  const div = document.createElement('div');
  div.className = 'c-bot';
  div.id = 'caribexTyping';
  div.innerHTML = '<span style="opacity:0.5">Sun is typing...</span>';
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function removeTyping() {
  const el = document.getElementById('caribexTyping');
  if (el) el.remove();
}

function addMsg(text, type) {
  const msgs = document.getElementById('caribexMsgs');
  const div = document.createElement('div');
  div.className = type === 'user' ? 'c-user' : 'c-bot';
  // Convert markdown links [Text](url) into real clickable <a> tags
  let formatted = text.replace(/\*\*/g, '');
  formatted = formatted.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" style="color:#2dd4bf;text-decoration:underline;font-weight:600;">$1</a>');
  div.innerHTML = formatted.split('\n').join('<br>');
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

async function caribexReply(el) {
  if (caribexTyping) return;
  const text = el.textContent;
  document.querySelectorAll('.chat-sugg').forEach(b => b.disabled = true);
  addMsg(text, 'user');
  caribexTyping = true;
  showTyping();
  const reply = await callCaribex(text);
  removeTyping();
  addMsg(reply, 'bot');
  caribexTyping = false;
}

async function caribexSend() {
  if (caribexTyping) return;
  const input = document.getElementById('caribexInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  addMsg(text, 'user');
  caribexTyping = true;
  showTyping();
  const reply = await callCaribex(text);
  removeTyping();
  addMsg(reply, 'bot');
  caribexTyping = false;
}
