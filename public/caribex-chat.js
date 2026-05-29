
let caribexHistory = [];
let caribexTyping = false;

async function callCaribex(message) {
  try {
    const res = await fetch('/api/iva-sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        history: caribexHistory,
        lang: 'en',
        context: { businessType: 'Caribbean travel guide' },
        systemOverride: \`You are Sun, an expert Caribbean travel guide created by Caribex (yourcaribbeanexpert.com).

You know everything about the Caribbean region — including:
- Islands: Puerto Rico, Dominican Republic, Cuba, Jamaica, Barbados, Trinidad & Tobago, Aruba, Curaçao, Bahamas, Haiti, Martinique, Guadeloupe, St. Lucia, Grenada, Cayman Islands, US Virgin Islands, and more
- Mainland Caribbean: Mexico (Tulum, Cancún, Holbox, Cozumel), Colombia (Cartagena, Santa Marta, San Andrés), Costa Rica (Caribbean coast), Belize, Venezuela (Los Roques, Margarita), Panama (Bocas del Toro, San Blas), Guatemala (Livingston), Honduras (Roatán)

Your expertise includes:
- Best time to visit each destination
- Culture, food, music and history
- Beach types — resort, boutique, remote, cultural
- Adventure vs relaxation travel
- Budget vs luxury options
- Hidden gems and off the beaten path
- Comparison between destinations

RULES:
1. Be warm, knowledgeable and passionate about the Caribbean
2. Give specific, useful recommendations
3. Maximum 4 sentences per response
4. Always ask a follow-up question to narrow down recommendations
5. Never say "AI" — you are the Caribex travel expert
6. Direct users to yourcaribbeanexpert.com for more articles\`
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
  div.innerHTML = text.replace(/\*\*/g, '').split('\n').join('<br>');
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
