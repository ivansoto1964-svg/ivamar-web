const fs = require('fs');
let code = fs.readFileSync('src/views/planetaboricua.js', 'utf8');

// 1. Add banner + search box right after the sec-divider and before the filters
const oldFilters = `    <!-- Filtros -->
    <div style="display:flex;flex-wrap:wrap;gap:0.8rem;margin:1.5rem 0;">`;

const newFilters = `    <!-- Banner explicativo -->
    <div style="background:linear-gradient(135deg,var(--blue),#001a4d);border-radius:8px;padding:1.2rem 1.5rem;margin:1.2rem 0;display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
      <div style="font-size:1.8rem;">🇵🇷</div>
      <div>
        <div style="font-weight:800;color:#fff;font-size:0.92rem;">Solo negocios y servicios boricuas</div>
        <div style="font-size:0.78rem;color:rgba(255,255,255,0.65);margin-top:0.2rem;">Este directorio es exclusivo para la comunidad puertorriqueña — negocios en PR y la diáspora en USA.</div>
      </div>
      <a href="/pb/add-negocio" style="margin-left:auto;background:var(--red);color:#fff;padding:0.5rem 1rem;border-radius:6px;text-decoration:none;font-size:0.8rem;font-weight:700;white-space:nowrap;">+ Añadir Mi Negocio</a>
    </div>

    <!-- Buscador boricua -->
    <div style="margin:1rem 0;position:relative;">
      <input type="text" id="dir-search" placeholder="¿Qué necesitas? ¿Un plomero? ¿Quién haga bizcochos mojaditos? ¿Un DJ para un party?..." oninput="searchDirectorio()" style="width:100%;padding:0.85rem 1rem 0.85rem 2.8rem;border:2px solid var(--border);border-radius:8px;font-size:0.88rem;font-family:inherit;outline:none;transition:border 0.2s;" onfocus="this.style.borderColor='var(--blue)'" onblur="this.style.borderColor='var(--border)'">
      <span style="position:absolute;left:0.9rem;top:50%;transform:translateY(-50%);font-size:1.1rem;">🔍</span>
    </div>

    <!-- Filtros -->
    <div style="display:flex;flex-wrap:wrap;gap:0.8rem;margin:1rem 0;">`;

if (code.includes(oldFilters)) {
  code = code.replace(oldFilters, newFilters);
  console.log('✅ Banner y buscador agregados');
} else {
  console.log('❌ No encontré el marcador de filtros');
}

// 2. Update the empty state message to the viral boricua version
const oldEmpty = "      grid.innerHTML = '<div style=\"grid-column:1/-1;text-align:center;padding:3rem;color:var(--mid);\"><div style=\"font-size:3rem;margin-bottom:1rem;\">🇵🇷</div><div style=\"font-size:1.1rem;font-weight:700;color:var(--dark);margin-bottom:0.5rem;\">Todavía no hay negocios en esta categoría</div><div style=\"font-size:0.9rem;margin-bottom:1.5rem;\">¡Sé el primero en aparecer aquí!</div><a href=\"/pb/add-negocio\" style=\"display:inline-block;background:var(--blue);color:#fff;padding:0.8rem 1.5rem;border-radius:8px;text-decoration:none;font-weight:700;\">Añadir Mi Negocio →</a></div>';\n      return;";

const newEmpty = `      var searchTerm = document.getElementById('dir-search') ? document.getElementById('dir-search').value.trim() : '';
      var emptyMsg = searchTerm
        ? '¡Ay bendito! No tenemos <strong>' + searchTerm + '</strong> boricua por aquí todavía... ¿Conoces uno? Comparte este enlace con él 👇'
        : '¡Wepa! Todavía no hay negocios en esta categoría. ¡Sé el primero en aparecer aquí!';
      grid.innerHTML = '<div style="text-align:center;padding:3rem;color:var(--mid);">' +
        '<div style="font-size:3rem;margin-bottom:1rem;">🇵🇷</div>' +
        '<div style="font-size:1rem;color:var(--dark);margin-bottom:1.5rem;line-height:1.6;">' + emptyMsg + '</div>' +
        '<a href="/pb/add-negocio" style="display:inline-block;background:var(--blue);color:#fff;padding:0.8rem 1.5rem;border-radius:8px;text-decoration:none;font-weight:700;font-size:0.9rem;">🇵🇷 Añadir Mi Negocio →</a>' +
        '</div>';
      return;`;

if (code.includes(oldEmpty)) {
  code = code.replace(oldEmpty, newEmpty);
  console.log('✅ Mensaje "no hay resultados" actualizado con tono boricua viral');
} else {
  console.log('❌ No encontré el mensaje de empty state');
}

// 3. Add the searchDirectorio function right before loadDirectorio
const oldFn = `async function loadDirectorio() {`;
const newFn = `function searchDirectorio() {
  const term = document.getElementById('dir-search').value.trim().toLowerCase();
  const grid = document.getElementById('directorio-grid');
  const cards = grid.querySelectorAll('.dir-card');

  if (cards.length === 0) {
    // No cards yet, trigger full reload with search
    loadDirectorio();
    return;
  }

  let visible = 0;
  cards.forEach(function(card) {
    const text = card.textContent.toLowerCase();
    if (!term || text.includes(term)) {
      card.style.display = '';
      visible++;
    } else {
      card.style.display = 'none';
    }
  });

  // If nothing visible, show viral message
  if (visible === 0) {
    var emptyMsg = '¡Ay bendito! No tenemos <strong>' + document.getElementById('dir-search').value.trim() + '</strong> boricua por aquí todavía... ¿Conoces uno? Comparte este enlace con él 👇';
    var existing = grid.querySelector('.dir-empty');
    if (!existing) {
      var div = document.createElement('div');
      div.className = 'dir-empty';
      div.style.cssText = 'text-align:center;padding:3rem;color:var(--mid);';
      div.innerHTML = '<div style="font-size:3rem;margin-bottom:1rem;">🇵🇷</div>' +
        '<div style="font-size:1rem;color:var(--dark);margin-bottom:1.5rem;line-height:1.6;">' + emptyMsg + '</div>' +
        '<a href="/pb/add-negocio" style="display:inline-block;background:var(--blue);color:#fff;padding:0.8rem 1.5rem;border-radius:8px;text-decoration:none;font-weight:700;font-size:0.9rem;">🇵🇷 Añadir Mi Negocio →</a>';
      grid.appendChild(div);
    }
  } else {
    var existing = grid.querySelector('.dir-empty');
    if (existing) existing.remove();
  }
}

async function loadDirectorio() {`;

if (code.includes(oldFn)) {
  code = code.replace(oldFn, newFn);
  console.log('✅ Función searchDirectorio agregada');
} else {
  console.log('❌ No encontré loadDirectorio para insertar antes');
}

fs.writeFileSync('src/views/planetaboricua.js', code);
console.log('\n🎉 Directorio actualizado con banner, buscador boricua y mensaje viral');
