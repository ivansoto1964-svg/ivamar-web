const fs = require('fs');
let code = fs.readFileSync('src/views/planetaboricua.js', 'utf8');

// 1. Insertar el script de Travelpayouts antes de </head>
const headMarker = '</style>\n</head>';
const scriptBlock = `<script nowprocket data-noptimize="1" data-cfasync="false" data-wpfc-render="false" seraph-accel-crit="1" data-no-defer="1">
  (function () {
      var script = document.createElement("script");
      script.async = 1;
      script.src = 'https://tpembars.com/NDcwMTYx.js?t=470161';
      document.head.appendChild(script);
  })();
</script>
</head>`;

if (code.includes(headMarker)) {
  code = code.replace(headMarker, '</style>\n' + scriptBlock);
  console.log('✅ Script de Travelpayouts (Planeta Boricua) insertado antes de </head>');
} else {
  console.log('❌ No encontré el marcador </style>\\n</head>');
}

// 2. Actualizar los 3 links de afiliado existentes: marker=480837 -> marker=470161
const oldMarker = 'marker=480837';
const newMarker = 'marker=470161';
const matches = code.split(oldMarker).length - 1;

if (matches > 0) {
  code = code.split(oldMarker).join(newMarker);
  console.log(`✅ ${matches} link(s) de afiliado actualizados de marker=480837 a marker=470161`);
} else {
  console.log('ℹ️ No se encontraron links con marker=480837 (puede que ya estén actualizados)');
}

fs.writeFileSync('src/views/planetaboricua.js', code);
console.log('\n🎉 Archivo guardado');
