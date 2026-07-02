const fs = require('fs');
let code = fs.readFileSync('src/server.js', 'utf8');

// 1. Add the require for searchPlacesByText near the top of the file (after other requires)
const requireMarker = `const { getPlacePhoto } = require("./helpers/googlePhotos");`;
const requireAddition = `const { getPlacePhoto } = require("./helpers/googlePhotos");
const { searchPlacesByText } = require("./helpers/googlePlaces");`;

if (code.includes(requireMarker)) {
  code = code.replace(requireMarker, requireAddition);
  console.log('✅ Require de googlePlaces agregado');
} else {
  console.log('⚠️ No encontré el require de googlePhotos para insertar cerca - lo agregamos al inicio del archivo en su lugar');
  code = `const { searchPlacesByText } = require('./helpers/googlePlaces');\n` + code;
}

// 2. Insert the chinchorreo detection + search logic right before the system prompt is built,
// inside the /api/nayeli endpoint, after the email-capture block closes.
const insertMarker = `  const system = \`Eres Nayeli, la asistente cultural de Planeta Boricua (masboricuaqueunmofongo.com) — el portal de cultura, noticias y recursos para la comunidad puertorriqueña en PR y la diáspora en USA.`;

const searchLogic = `  // MODO CHINCHORREO - detect food/restaurant queries and search real places via Google
  let chinchorreoResults = '';
  const foodKeywords = /chinchorro|chinchorreo|food truck|d[oó]nde com|mofongo|alcapurria|lech[oó]n|tripleta|restaurante boricua|comida boricua|comida puertorrique[ñn]a/i;
  if (foodKeywords.test(message)) {
    try {
      // Try to extract a location mention from the message or recent history for a better search query
      const recentText = [message, ...history.slice(-4).map(h => h.content)].join(' ');
      const locationMatch = recentText.match(/\\ben\\s+([A-Za-zÁÉÍÓÚáéíóúñÑ\\s]{3,30})(?:[,.]|$)/);
      const location = locationMatch ? locationMatch[1].trim() : '';
      const searchQuery = location
        ? \`Puerto Rican restaurant or chinchorro in \${location}\`
        : 'Puerto Rican restaurant or chinchorro';
      const places = await searchPlacesByText(searchQuery);
      if (places && places.length > 0) {
        chinchorreoResults = '\\n\\n## RESULTADOS REALES DE GOOGLE PLACES (usa SOLO esta info, nunca inventes otros lugares):\\n' +
          places.map(p => {
            const name = p.displayName?.text || 'Sin nombre';
            const addr = p.formattedAddress || 'Dirección no disponible';
            const rating = p.rating ? \`\${p.rating}⭐ (\${p.userRatingCount || 0} reseñas)\` : 'Sin calificación aún';
            const maps = p.googleMapsUri || '';
            return \`- \${name} — \${addr} — \${rating}\${maps ? ' — ' + maps : ''}\`;
          }).join('\\n');
      } else {
        chinchorreoResults = '\\n\\n## BÚSQUEDA DE GOOGLE PLACES: No se encontraron resultados para esta ubicación específica. Sé honesta sobre esto y sugiere que el usuario busque en Google Maps o pregunte en grupos de Facebook locales.';
      }
    } catch (e) {
      console.error('Chinchorreo search error:', e.message);
    }
  }

  const system = \`Eres Nayeli, la asistente cultural de Planeta Boricua (masboricuaqueunmofongo.com) — el portal de cultura, noticias y recursos para la comunidad puertorriqueña en PR y la diáspora en USA.\${chinchorreoResults}`;

if (code.includes(insertMarker)) {
  code = code.replace(insertMarker, searchLogic);
  console.log('✅ Lógica de búsqueda de Modo Chinchorreo integrada en /api/nayeli');
} else {
  console.log('❌ No encontré el marcador del system prompt - revisar manualmente');
}

fs.writeFileSync('src/server.js', code);
console.log('\\n🎉 Archivo guardado');
