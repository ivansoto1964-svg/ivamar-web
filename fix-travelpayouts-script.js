const fs = require('fs');

const oldScriptLine = `(function(){var s=document.createElement("script");s.async=1;s.src="https://tpembars.com/NDgwODM3.js?t=480837";document.head.appendChild(s);})();`;
const newScriptLine = `(function(){var s=document.createElement("script");s.async=1;s.src="https://tpembars.com/NTM2OTQ3.js?t=536947";document.head.appendChild(s);})();`;

const fullScriptBlock = `<script data-cfasync="false">
  ${newScriptLine}
</script>`;

// 1. Fix destination-template.js - replace old ID with correct one
let template = fs.readFileSync('src/views/caribex/destination-template.js', 'utf8');
if (template.includes(oldScriptLine)) {
  template = template.replace(oldScriptLine, newScriptLine);
  fs.writeFileSync('src/views/caribex/destination-template.js', template);
  console.log('✅ destination-template.js: script actualizado a Caribex AI (NTM2OTQ3)');
} else if (template.includes('NTM2OTQ3')) {
  console.log('ℹ️ destination-template.js ya tiene el script correcto');
} else {
  console.log('⚠️ destination-template.js: no encontré ningún script de Travelpayouts - revisar manualmente');
}

// 2. Check/fix caribex.js - add if missing entirely
let caribex = fs.readFileSync('src/views/caribex.js', 'utf8');
if (caribex.includes('NTM2OTQ3')) {
  console.log('ℹ️ caribex.js ya tiene el script correcto');
} else if (caribex.includes(oldScriptLine)) {
  caribex = caribex.replace(oldScriptLine, newScriptLine);
  fs.writeFileSync('src/views/caribex.js', caribex);
  console.log('✅ caribex.js: script actualizado a Caribex AI (NTM2OTQ3)');
} else if (caribex.includes('tpembars.com')) {
  console.log('⚠️ caribex.js tiene una referencia a tpembars.com pero no coincide exactamente - revisar manualmente');
} else {
  // No script at all - insert one right after </style> before <nav>
  const marker = '</style>\n\n<nav>';
  if (caribex.includes(marker)) {
    caribex = caribex.replace(marker, '</style>\n' + fullScriptBlock + '\n<nav>');
    fs.writeFileSync('src/views/caribex.js', caribex);
    console.log('✅ caribex.js: script de Travelpayouts agregado (no existía)');
  } else {
    console.log('❌ caribex.js: no tiene script y no encontré el marcador </style>\\n\\n<nav> para insertarlo - revisar manualmente');
  }
}
