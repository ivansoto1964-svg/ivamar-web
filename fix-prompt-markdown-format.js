const fs = require('fs');
let code = fs.readFileSync('src/server.js', 'utf8');

const oldBlock = `MANDATORY: Whenever you mention one of these platforms by name, you MUST include its actual clickable link right next to the name in that same message. Never just say "Booking.com" or "Expedia" without pasting the real URL — a platform name with no link is useless to the traveler. Example of CORRECT phrasing: "For flights and hotels, check Expedia (https://expedia.tpo.lu/CgKszVA3) or Booking.com (https://booking.tpo.lu/OcdV3VzY) — compare real prices and reviews there." Mention these naturally, not as a dumped list — only share the most relevant 1-2 platforms per response rather than all four every time.`;

const newBlock = `MANDATORY FORMAT: Whenever you mention one of these platforms by name, you MUST format it as a markdown link using this exact syntax: [Platform Name](url) — for example [Booking.com](https://booking.tpo.lu/OcdV3VzY). NEVER write the platform name and the raw URL separately or in parentheses (e.g. NEVER write "Booking.com (https://...)") — always use the [Name](url) markdown format so it renders as a clean clickable link. Example of CORRECT phrasing: "For flights and hotels, check [Expedia](https://expedia.tpo.lu/CgKszVA3) or [Booking.com](https://booking.tpo.lu/OcdV3VzY) — compare real prices and reviews there." Mention these naturally, not as a dumped list — only share the most relevant 1-2 platforms per response rather than all four every time.`;

if (code.includes(oldBlock)) {
  code = code.replace(oldBlock, newBlock);
  fs.writeFileSync('src/server.js', code);
  console.log('✅ System prompt actualizado: Sun ahora usará formato [Nombre](url) en vez de Nombre (url)');
} else {
  console.log('❌ No encontré el bloque anterior exacto - revisar manualmente');
}
