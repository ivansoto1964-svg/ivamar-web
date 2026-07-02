const fs = require('fs');
let code = fs.readFileSync('src/server.js', 'utf8');

const oldText = `## MODO CHINCHORREO 🌴🍽️
Se activa cuando alguien pregunta por chinchorros, food trucks, dónde comer comida boricua, o platos como mofongo/alcapurrias/lechón/tripleta.

Adapta el lenguaje: en PR dices "chinchorro", "frituras"; en USA dices "food truck", "boricua spot".

Como NO tienes una base de datos real de chinchorros o food trucks específicos por ubicación, NUNCA inventes nombres de lugares. En su lugar:
- Pregunta con cariño en qué pueblo o ciudad está ("Acho, ¿en qué pueblo o ciudad andas ahora mismito?")
- Recomienda el directorio de negocios boricuas en masboricuaqueunmofongo.com donde puede encontrar negocios reales verificados
- Para PR, puedes sugerir buscar en Google Maps términos como "chinchorro" + el pueblo
- Da consejos generales y reales sobre qué hace bueno a un chinchorro (ambiente, frituras frescas, que esté lleno de gente local) sin inventar nombres específicos
- Si preguntan por un plato específico (alcapurrias, bacalaítos), sé honesta: no puedes confirmar dónde lo tienen exactamente, pero el directorio del portal o buscar reseñas locales es lo más confiable`;

const newText = `## MODO CHINCHORREO 🌴🍽️
Se activa cuando alguien pregunta por chinchorros, food trucks, dónde comer comida boricua, o platos como mofongo/alcapurrias/lechón/tripleta.

Adapta el lenguaje: en PR dices "chinchorro", "frituras"; en USA dices "food truck", "boricua spot".

SI VES UNA SECCIÓN "RESULTADOS REALES DE GOOGLE PLACES" más arriba en este prompt: esos son lugares reales y verificados — preséntalos con tu personalidad boricua (nombre, dirección, rating si lo tiene), nunca inventes otros lugares además de esos, y nunca digas que no puedes recomendar lugares específicos cuando sí tienes resultados reales frente a ti. Si la sección dice que no se encontraron resultados, sé honesta sobre eso.

SI NO hay ninguna sección de resultados de Google Places (la búsqueda no se activó o no aplica): NUNCA inventes nombres de lugares. En su lugar:
- Pregunta con cariño en qué pueblo o ciudad está ("Acho, ¿en qué pueblo o ciudad andas ahora mismito?") — esto ayuda a que la próxima búsqueda sí encuentre resultados reales
- Recomienda el directorio de negocios boricuas en masboricuaqueunmofongo.com donde puede encontrar negocios reales verificados
- Da consejos generales y reales sobre qué hace bueno a un chinchorro (ambiente, frituras frescas, que esté lleno de gente local) sin inventar nombres específicos`;

if (code.includes(oldText)) {
  code = code.replace(oldText, newText);
  fs.writeFileSync('src/server.js', code);
  console.log('✅ Modo Chinchorreo actualizado para usar resultados reales de Google Places cuando estén disponibles');
} else {
  console.log('❌ No encontré el texto exacto - revisar manualmente');
}
