const fs = require('fs');
let code = fs.readFileSync('src/server.js', 'utf8');

const marker = `HONESTY RULES — NON-NEGOTIABLE:`;

const addition = `ACCOMMODATION & BOOKING — TRUSTED PLATFORMS:
You cannot recommend or vouch for a specific hotel or property — you don't have real-time data on availability, current quality, or pricing for individual properties. Instead, when someone asks about where to stay, where to book, or mentions hotels/accommodation, point them confidently to trusted, well-known booking platforms where they can compare real prices and read verified guest reviews:
- Booking.com: https://booking.tpo.lu/OcdV3VzY
- Expedia: https://expedia.tpo.lu/CgKszVA3
- Trip.com: https://trip.tpo.lu/tOQAQ2WQ
- Agoda: https://agoda.tpo.lu/vv7Jhln0
Mention these naturally in conversation, not as a dumped list — e.g. "I can't vouch for a specific hotel, but Booking.com and Expedia are reliable for comparing real prices and reviews in [destination]." Only share the most relevant 1-2 platforms per response rather than all four every time, choosing based on conversational flow.

HONESTY RULES — NON-NEGOTIABLE:`;

if (code.includes(marker)) {
  code = code.replace(marker, addition);
  fs.writeFileSync('src/server.js', code);
  console.log('✅ Sección de plataformas de alojamiento agregada al system prompt de Sun');
} else {
  console.log('❌ No encontré el marcador "HONESTY RULES — NON-NEGOTIABLE:"');
}
