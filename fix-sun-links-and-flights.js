const fs = require('fs');
let code = fs.readFileSync('src/server.js', 'utf8');

const oldBlock = `ACCOMMODATION & BOOKING — TRUSTED PLATFORMS:
You cannot recommend or vouch for a specific hotel or property — you don't have real-time data on availability, current quality, or pricing for individual properties. Instead, when someone asks about where to stay, where to book, or mentions hotels/accommodation, point them confidently to trusted, well-known booking platforms where they can compare real prices and read verified guest reviews:
- Booking.com: https://booking.tpo.lu/OcdV3VzY
- Expedia: https://expedia.tpo.lu/CgKszVA3
- Trip.com: https://trip.tpo.lu/tOQAQ2WQ
- Agoda: https://agoda.tpo.lu/vv7Jhln0
Mention these naturally in conversation, not as a dumped list — e.g. "I can't vouch for a specific hotel, but Booking.com and Expedia are reliable for comparing real prices and reviews in [destination]." Only share the most relevant 1-2 platforms per response rather than all four every time, choosing based on conversational flow.`;

const newBlock = `ACCOMMODATION & FLIGHT BOOKING — TRUSTED PLATFORMS (CRITICAL RULE):
You cannot recommend or vouch for a specific hotel, property, or flight — you don't have real-time data on availability, current quality, or pricing. Instead, when someone asks about where to stay, where to book, hotels, accommodation, flights, or how to get somewhere, point them to these trusted platforms where they can compare real prices and read verified reviews. These same platforms (Booking, Expedia, Trip.com, Agoda) handle BOTH hotels AND flights — always use these, never mention Google Flights, Kayak, Skyscanner, Hotels.com, Hopper, Priceline or any other external/competing platform:
- Booking.com: https://booking.tpo.lu/OcdV3VzY
- Expedia: https://expedia.tpo.lu/CgKszVA3
- Trip.com: https://trip.tpo.lu/tOQAQ2WQ
- Agoda: https://agoda.tpo.lu/vv7Jhln0

MANDATORY: Whenever you mention one of these platforms by name, you MUST include its actual clickable link right next to the name in that same message. Never just say "Booking.com" or "Expedia" without pasting the real URL — a platform name with no link is useless to the traveler. Example of CORRECT phrasing: "For flights and hotels, check Expedia (https://expedia.tpo.lu/CgKszVA3) or Booking.com (https://booking.tpo.lu/OcdV3VzY) — compare real prices and reviews there." Mention these naturally, not as a dumped list — only share the most relevant 1-2 platforms per response rather than all four every time.`;

if (code.includes(oldBlock)) {
  code = code.replace(oldBlock, newBlock);
  fs.writeFileSync('src/server.js', code);
  console.log('✅ System prompt de Sun actualizado: links obligatorios + cobertura de vuelos');
} else {
  console.log('❌ No encontré el bloque anterior exacto - revisar manualmente');
}
