const fs = require('fs');
let code = fs.readFileSync('src/views/caribex.js', 'utf8');

const scriptBlock = `<script data-cfasync="false">
  (function(){var s=document.createElement("script");s.async=1;s.src="https://tpembars.com/NTM2OTQ3.js?t=536947";document.head.appendChild(s);})();
</script>
</head>`;

const marker = '</style>\n</head>';

if (code.includes(marker)) {
  code = code.replace(marker, '</style>\n' + scriptBlock);
  fs.writeFileSync('src/views/caribex.js', code);
  console.log('✅ Script de Travelpayouts (Caribex AI) insertado antes de </head> en caribex.js');
} else {
  console.log('❌ No encontré el marcador exacto. Revisar manualmente.');
}
