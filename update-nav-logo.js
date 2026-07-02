const fs = require('fs');

const files = [
  'src/views/about.js',
  'src/views/demos.js',
  'src/views/home.js',
  'src/views/en-assistant.js',
  'src/views/es-asistente.js',
  'src/views/home-es.js',
  'src/views/home-en.js'
];

let totalUpdated = 0;

files.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️ No encontrado: ${filePath}`);
    return;
  }

  let code = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  // Replace nav-logo-mark div with img
  const patterns = [
    { old: '<div class="nav-logo-mark">AI</div>', new: '<img src="/ivamar-ai-logo.png" alt="Ivamar AI" style="width:36px;height:36px;object-fit:contain;">' },
    { old: "<div class='nav-logo-mark'>AI</div>", new: '<img src="/ivamar-ai-logo.png" alt="Ivamar AI" style="width:36px;height:36px;object-fit:contain;">' },
    { old: '<div class="home-sel-logo-mark">AI</div>', new: '<img src="/ivamar-ai-logo.png" alt="Ivamar AI" style="width:36px;height:36px;object-fit:contain;">' },
  ];

  patterns.forEach(({ old, new: newVal }) => {
    if (code.includes(old)) {
      code = code.replace(new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newVal);
      updated = true;
    }
  });

  if (updated) {
    fs.writeFileSync(filePath, code);
    totalUpdated++;
    console.log(`✅ Logo actualizado en ${filePath}`);
  } else {
    console.log(`ℹ️ Sin cambios en ${filePath}`);
  }
});

console.log(`\n🎉 ${totalUpdated} archivos actualizados`);
