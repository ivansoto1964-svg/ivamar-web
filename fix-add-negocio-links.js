const fs = require('fs');
let code = fs.readFileSync('src/views/planetaboricua.js', 'utf8');

let count = 0;

// 1. Link en el divider del directorio
const old1 = `<a href="#" class="sec-divider-link">Añadir negocio →</a>`;
const new1 = `<a href="/pb/add-negocio" class="sec-divider-link">Añadir negocio →</a>`;
if (code.includes(old1)) { code = code.replace(old1, new1); count++; }

// 2. Botón CTA debajo del directorio
const old2 = `<a href="#" class="btn-outline-dark">Añadir Mi Negocio</a>`;
const new2 = `<a href="/pb/add-negocio" class="btn-outline-dark">Añadir Mi Negocio</a>`;
if (code.includes(old2)) { code = code.replace(old2, new2); count++; }

// 3. Link en el footer
const old3 = `      <a href="#">Añadir Mi Negocio</a>`;
const new3 = `      <a href="/pb/add-negocio">Añadir Mi Negocio</a>`;
if (code.includes(old3)) { code = code.replace(old3, new3); count++; }

fs.writeFileSync('src/views/planetaboricua.js', code);
console.log(`✅ ${count} links de "Añadir negocio" actualizados → /pb/add-negocio`);
