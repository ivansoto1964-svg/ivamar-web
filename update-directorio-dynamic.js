const fs = require('fs');
let code = fs.readFileSync('src/views/planetaboricua.js', 'utf8');

const oldSection = `<section class="directorio" id="directorio">
  <div class="directorio-inner">
    <div class="sec-divider-inner">
      <span class="sec-divider-label">Directorio Boricua en USA</span>
      <div style="flex:1;height:2px;background:var(--red);margin:0 1rem;"></div>
      <a href="/pb/add-negocio" class="sec-divider-link">Añadir negocio →</a>
    </div>
    <div class="directorio-grid">
      <a href="#" class="dir-card">
        <div class="dir-icon">🍽️</div>
        <div class="dir-info">
          <div class="dir-name">La Perla Restaurant</div>
          <div class="dir-cat">Restaurante Boricua</div>
          <div class="dir-location">📍 Orlando, FL</div>
        </div>
        <div class="dir-badge">Destacado</div>
      </a>
      <a href="#" class="dir-card">
        <div class="dir-icon">💇</div>
        <div class="dir-info">
          <div class="dir-name">Glamour Boricua Salon</div>
          <div class="dir-cat">Salón de Belleza</div>
          <div class="dir-location">📍 Kissimmee, FL</div>
        </div>
      </a>
      <a href="#" class="dir-card">
        <div class="dir-icon">🏠</div>
        <div class="dir-info">
          <div class="dir-name">PR Realty Group</div>
          <div class="dir-cat">Bienes Raíces</div>
          <div class="dir-location">📍 Tampa, FL</div>
        </div>
        <div class="dir-badge">Destacado</div>
      </a>
      <a href="#" class="dir-card">
        <div class="dir-icon">🚗</div>
        <div class="dir-info">
          <div class="dir-name">Ramos Auto Sales</div>
          <div class="dir-cat">Concesionario</div>
          <div class="dir-location">📍 New York, NY</div>
        </div>
      </a>
      <a href="#" class="dir-card">
        <div class="dir-icon">⚕️</div>
        <div class="dir-info">
          <div class="dir-name">Clínica Borinquen</div>
          <div class="dir-cat">Clínica Médica</div>
          <div class="dir-location">📍 Chicago, IL</div>
        </div>
      </a>
      <a href="#" class="dir-card">
        <div class="dir-icon">🍞</div>
        <div class="dir-info">
          <div class="dir-name">La Panadería de Abuela</div>
          <div class="dir-cat">Panadería</div>
          <div class="dir-location">📍 Miami, FL</div>
        </div>
        <div class="dir-badge">Nuevo</div>
      </a>
    </div>
    <div class="directorio-cta">
      <a href="#" class="btn-red">Ver Todos los Negocios →</a>
      <a href="/pb/add-negocio" class="btn-outline-dark">Añadir Mi Negocio</a>
    </div>
  </div>
</section>`;

const newSection = `<section class="directorio" id="directorio">
  <div class="directorio-inner">
    <div class="sec-divider-inner">
      <span class="sec-divider-label">Directorio Boricua</span>
      <div style="flex:1;height:2px;background:var(--red);margin:0 1rem;"></div>
      <a href="/pb/add-negocio" class="sec-divider-link">Añadir negocio →</a>
    </div>

    <!-- Filtros -->
    <div style="display:flex;flex-wrap:wrap;gap:0.8rem;margin:1.5rem 0;">
      <select id="dir-filter-location" onchange="loadDirectorio()" style="padding:0.6rem 1rem;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:#fff;cursor:pointer;">
        <option value="">📍 Todas las ubicaciones</option>
        <optgroup label="🇵🇷 Puerto Rico">
          <option value="puerto-rico-isla">Puerto Rico (Isla)</option>
        </optgroup>
        <optgroup label="🇺🇸 Estados Unidos">
          <option value="florida">Florida</option>
          <option value="nueva-york">Nueva York</option>
          <option value="texas">Texas</option>
          <option value="new-jersey">New Jersey</option>
          <option value="pennsylvania">Pennsylvania</option>
          <option value="connecticut">Connecticut</option>
          <option value="massachusetts">Massachusetts</option>
          <option value="illinois">Illinois</option>
          <option value="california">California</option>
          <option value="georgia">Georgia</option>
          <option value="north-carolina">North Carolina</option>
          <option value="otro-estado">Otro Estado</option>
        </optgroup>
      </select>
      <select id="dir-filter-category" onchange="loadDirectorio()" style="padding:0.6rem 1rem;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:#fff;cursor:pointer;">
        <option value="">🏪 Todas las categorías</option>
        <option value="restaurante">🍽️ Restaurante</option>
        <option value="food-truck">🚚 Food Truck</option>
        <option value="panaderia">🥐 Panadería</option>
        <option value="barberia">💈 Barbería</option>
        <option value="salon">💅 Salón de Belleza</option>
        <option value="tienda">🛍️ Tienda</option>
        <option value="servicios">🔧 Servicios</option>
        <option value="musica">🎵 Música</option>
        <option value="salud">🏥 Salud</option>
        <option value="transporte">🚗 Transporte</option>
        <option value="otro">📦 Otro</option>
      </select>
    </div>

    <!-- Grid dinámico -->
    <div id="directorio-grid" class="directorio-grid">
      <div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--mid);">
        <div style="font-size:2rem;margin-bottom:0.5rem;">⏳</div>
        <div>Cargando directorio...</div>
      </div>
    </div>

    <div class="directorio-cta">
      <a href="/pb/add-negocio" class="btn-outline-dark">🇵🇷 Añadir Mi Negocio</a>
    </div>
  </div>
</section>

<script>
const categoryIcons = {
  'restaurante': '🍽️',
  'food-truck': '🚚',
  'panaderia': '🥐',
  'barberia': '💈',
  'salon': '💅',
  'tienda': '🛍️',
  'servicios': '🔧',
  'musica': '🎵',
  'salud': '🏥',
  'transporte': '🚗',
  'otro': '📦'
};

async function loadDirectorio() {
  const location = document.getElementById('dir-filter-location').value;
  const category = document.getElementById('dir-filter-category').value;
  const grid = document.getElementById('directorio-grid');

  grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--mid);"><div style="font-size:2rem;margin-bottom:0.5rem;">⏳</div><div>Buscando negocios...</div></div>';

  try {
    const url = location
      ? '/api/pb-negocios/' + location + (category ? '?category=' + category : '')
      : '/api/pb-negocios/all' + (category ? '?category=' + category : '');

    const res = await fetch(url);
    const data = await res.json();
    const negocios = data.negocios || [];

    // Filter by category client-side if no location selected
    const filtered = category && !location
      ? negocios.filter(n => n.category === category)
      : negocios;

    if (filtered.length === 0) {
      grid.innerHTML = \`
        <div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--mid);">
          <div style="font-size:3rem;margin-bottom:1rem;">🇵🇷</div>
          <div style="font-size:1.1rem;font-weight:700;color:var(--dark);margin-bottom:0.5rem;">Todavía no hay negocios en esta categoría</div>
          <div style="font-size:0.9rem;margin-bottom:1.5rem;">¡Sé el primero en aparecer aquí!</div>
          <a href="/pb/add-negocio" style="display:inline-block;background:var(--blue);color:#fff;padding:0.8rem 1.5rem;border-radius:8px;text-decoration:none;font-weight:700;">Añadir Mi Negocio →</a>
        </div>
      \`;
      return;
    }

    grid.innerHTML = filtered.map(n => \`
      <div class="dir-card">
        \${n.photo ? \`<img src="\${n.photo}" alt="\${n.name}" style="width:100%;height:140px;object-fit:cover;border-radius:8px 8px 0 0;margin-bottom:0.8rem;">\` : \`<div class="dir-icon">\${categoryIcons[n.category] || '🏪'}</div>\`}
        <div class="dir-info">
          <div class="dir-name">\${n.name}</div>
          <div class="dir-cat">\${categoryIcons[n.category] || '🏪'} \${n.category}</div>
          <div class="dir-location">📍 \${n.city}\${n.location ? ', ' + n.location : ''}</div>
          \${n.desc ? \`<div style="font-size:0.78rem;color:var(--mid);margin-top:0.4rem;line-height:1.4;">\${n.desc}</div>\` : ''}
          <div style="margin-top:0.8rem;display:flex;gap:0.5rem;flex-wrap:wrap;">
            \${n.whatsapp ? \`<a href="https://wa.me/\${n.whatsapp.replace(/\\D/g,'')}" target="_blank" style="font-size:0.75rem;background:#25D366;color:#fff;padding:0.3rem 0.6rem;border-radius:4px;text-decoration:none;font-weight:700;">📲 WhatsApp</a>\` : ''}
            \${n.website ? \`<a href="\${n.website}" target="_blank" style="font-size:0.75rem;background:var(--blue);color:#fff;padding:0.3rem 0.6rem;border-radius:4px;text-decoration:none;font-weight:700;">🌐 Web</a>\` : ''}
            \${n.instagram ? \`<a href="https://instagram.com/\${n.instagram.replace('@','')}" target="_blank" style="font-size:0.75rem;background:#E1306C;color:#fff;padding:0.3rem 0.6rem;border-radius:4px;text-decoration:none;font-weight:700;">📷 IG</a>\` : ''}
          </div>
        </div>
        \${n.badge === 'boricua-verificado' ? \`<div class="dir-badge">🏅 Boricua Verificado</div>\` : ''}
      </div>
    \`).join('');

  } catch(e) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--mid);">Error cargando directorio. Intenta de nuevo.</div>';
  }
}

// Load on page start
loadDirectorio();
</script>`;

if (code.includes(oldSection)) {
  code = code.replace(oldSection, newSection);
  fs.writeFileSync('src/views/planetaboricua.js', code);
  console.log('✅ Directorio dinámico con filtros instalado en planetaboricua.js');
} else {
  console.log('❌ No encontré la sección exacta - revisar manualmente');
}
