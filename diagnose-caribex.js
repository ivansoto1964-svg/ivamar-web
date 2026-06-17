const fs = require('fs');
const code = fs.readFileSync('src/views/caribex.js', 'utf8');

// Buscar </head> o </style> para ubicar el contexto
const headIdx = code.indexOf('</head>');
const styleEndIdx = code.indexOf('</style>');

console.log('Posición de </style>:', styleEndIdx);
console.log('Posición de </head>:', headIdx);
console.log('');
console.log('--- Contexto alrededor de </style> (primeras 2 apariciones) ---');

let searchFrom = 0;
let count = 0;
while (count < 2) {
  const idx = code.indexOf('</style>', searchFrom);
  if (idx === -1) break;
  console.log(`\n[Aparición ${count + 1} en posición ${idx}]`);
  console.log(code.substring(idx, idx + 150));
  searchFrom = idx + 1;
  count++;
}
