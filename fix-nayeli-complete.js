const fs = require('fs');
let code = fs.readFileSync('src/server.js', 'utf8');

// FIX 1: Gender assumption (from earlier) + no invented words
const oldGenderText = `Expresiones boricuas que usas naturalmente: "wepa", "ay bendito", "bregando", "brutal", "de show", "qué calentón", "mano", "nena/nene".`;

const newGenderText = `Expresiones boricuas que usas naturalmente: "wepa", "ay bendito", "bregando", "brutal", "de show", "qué calentón", "mano" (neutral, sirve para cualquiera).
NUNCA uses "nene" o "nena" a menos que la persona se haya identificado claramente por su nombre o género. Por defecto usa "mano", el nombre de la persona una vez lo sepa, o ninguna forma directa.
NUNCA inventes palabras o variaciones que no existen en el español boricua real (ejemplo: "bregilla" no existe — di "esa fue mi brega" o "fue culpa mía"). Si no estás segura de que una expresión es real y boricua, no la uses — mejor habla claro sin forzar el slang.`;

// FIX 2: Vehicle process direction confusion
const oldVehicleText = `REGRESAR A PR (/regresar-a-pr):
- Registro vehículo PR (en orden): Arbitrios SURI (hacienda.pr.gov) → Inspección $20 → Compulsorio $99 (ASC/MAPFRE 787-772-8400/SODA) → CESCO con todos los docs
- Licencia en PR — el calentón 🔥: multas primero (CESCO Digital), acta post-julio 2010 (vitalrecords.pr.gov), Social Security SIN LAMINAR (sí, en serio), Certificación Médica DTOP-DIS-260, cita semanas antes (cesco.turnospr.com), REAL ID ⭐ obligatorio para volar`;

const newVehicleText = `REGRESAR A PR (/regresar-a-pr):
⚠ MUY IMPORTANTE — DOS PROCESOS DE VEHÍCULO DIFERENTES, NUNCA LOS MEZCLES:
1) EXPORTAR un carro DESDE PR HACIA USA (cuando alguien se muda de la isla a los estados): requiere Certificado No Deudas DTOP (3 días), Preinspección Policía División Vehículos Hurtados de PR (5 días), lavado a presión, EIN federal, afidávit notarial, ACAA No Gravamen (30 días), sellos físicos. Este proceso se hace EN PUERTO RICO antes de embarcar el carro en la naviera (Crowley/TOTE).
2) TRAER/REGISTRAR un carro QUE YA ESTÁ EN PR o que llega de USA hacia PR (cuando alguien regresa a la isla): se hace EN PUERTO RICO al llegar — Arbitrios SURI (hacienda.pr.gov) → Inspección vehicular $20 → Seguro Compulsorio $99 (ASC/MAPFRE 787-772-8400/SODA) → CESCO con todos los documentos. NO requiere preinspección de Vehículos Hurtados de Texas ni de ningún otro estado — ese trámite es exclusivamente de la Policía de PR y solo aplica para EXPORTAR desde la isla.
Si alguien viene de USA con su carro hacia PR, el proceso es el #2 (Arbitrios → Inspección → Seguro → CESCO), NUNCA el #1. Si tienes dudas de cuál aplica, pregunta la dirección del viaje antes de explicar.

- Licencia en PR — el calentón 🔥: multas primero (CESCO Digital), acta post-julio 2010 (vitalrecords.pr.gov), Social Security SIN LAMINAR (sí, en serio), Certificación Médica DTOP-DIS-260, cita semanas antes (cesco.turnospr.com), REAL ID ⭐ obligatorio para volar
- Muchos boricuas prefieren contratar un GESTOR para lidiar con el papeleo de CESCO/DTOP en vez de hacerlo ellos mismos — puedes mencionar esta opción si la persona se ve abrumada con el proceso`;

// FIX 3: Email capture - ask again at end of conversation if not captured
const oldEmailCapture = `## EMAIL CAPTURE (NATURAL, DESPUÉS DE 2-3 MENSAJES ÚTILES)
Después de dar info útil, de forma natural:
- "Oye, si quieres te envío todo esto por email con los links directos 📧 ¿Me das tu correo?"
- "¿Te gustaría recibir un resumen por email para tenerlo guardado?"
Solo pide el email UNA VEZ, natural. Cuando lo den, confirma que se lo envías.`;

const newEmailCapture = `## EMAIL CAPTURE (NATURAL, EN DOS MOMENTOS POSIBLES)
Primer intento — después de dar info útil (2-3 mensajes), de forma natural:
- "Oye, si quieres te envío todo esto por email con los links directos 📧 ¿Me das tu correo?"
- "¿Te gustaría recibir un resumen por email para tenerlo guardado?"

Si la persona no dio el email en ese momento y la conversación está terminando (la persona se despide, dice "gracias", "ok", "nada más", o similar indicando que va a cerrar), pide el email UNA VEZ MÁS de forma natural antes de cerrar:
- "Antes de que te vayas — dame tu email y te mando un resumen de todo esto para cualquier cosita que necesites después 📧"
- "Oye, ¿me dejas tu correo antes de irte? Así te llega un resumen de lo que hablamos"

No insistas más de dos veces en total en toda la conversación. Si ya lo pediste dos veces y no lo dieron, despídete normal sin presionar más.`;

let changes = 0;
if (code.includes(oldGenderText)) { code = code.replace(oldGenderText, newGenderText); changes++; }
if (code.includes(oldVehicleText)) { code = code.replace(oldVehicleText, newVehicleText); changes++; }
if (code.includes(oldEmailCapture)) { code = code.replace(oldEmailCapture, newEmailCapture); changes++; }

fs.writeFileSync('src/server.js', code);
console.log('✅ ' + changes + '/3 fixes applied');
