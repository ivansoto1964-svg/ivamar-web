const fs = require('fs');
const path = require('path');

const oldId = 'ca-pub-4181903530685744';
const newId = 'ca-pub-8301223085122981';

const files = [
  'src/views/recursos-boricua.js',
  'src/views/regresar-a-pr.js',
  'src/views/caribex.js',
  'src/views/caribex/destination-template.js',
  'src/views/planetaboricua.js',
  'src/views/mudarse-de-pr.js'
];

let totalReplacements = 0;

files.forEach(file => {
  if (!fs.existsSync(file)) {
    console.log(`⚠️  Archivo no encontrado: ${file}`);
    return;
  }
  let content = fs.readFileSync(file, 'utf8');
  const matches = content.split(oldId).length - 1;
  if (matches > 0) {
    content = content.split(oldId).join(newId);
    fs.writeFileSync(file, content);
    console.log(`✅ ${file}: ${matches} reemplazo(s)`);
    totalReplacements += matches;
  } else {
    console.log(`ℹ️  ${file}: no se encontró el ID viejo (ya actualizado o no aplica)`);
  }
});

console.log(`\n🎉 Total de reemplazos: ${totalReplacements}`);
