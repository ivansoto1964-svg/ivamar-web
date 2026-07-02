const fs = require('fs');
let code = fs.readFileSync('src/views/planetaboricua.js', 'utf8');

// 1. Replace CSS for directory
const oldCSS = `.directorio-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem;margin-top:1.5rem;}
.dir-card{border:1px solid var(--border);border-radius:4px;padding:1.2rem;display:flex;gap:1rem;align-items:flex-start;transition:all 0.2s;text-decoration:none;color:inherit;}
.dir-card:hover{border-color:var(--red);box-shadow:0 2px 12px rgba(206,17,38,0.08);}`;

const newCSS = `.directorio-grid{display:flex;flex-direction:column;gap:0;margin-top:1.5rem;border:1px solid var(--border);border-radius:8px;overflow:hidden;}
.dir-card{border-bottom:1px solid var(--border);padding:0.8rem 1rem;display:flex;gap:0.8rem;align-items:center;transition:background 0.15s;text-decoration:none;color:inherit;background:#fff;}
.dir-card:last-child{border-bottom:none;}
.dir-card:hover{background:#fafafa;}
.dir-card.destacado{background:#fffbf0;border-left:3px solid #f0c040;}`;

if (code.includes(oldCSS)) {
  code = code.replace(oldCSS, newCSS);
  console.log('✅ CSS del directorio actualizado a listado compacto');
} else {
  console.log('⚠️ No encontré el CSS exacto — continuando con otros cambios');
}

// 2. Replace the directory section with full PR municipalities + all US states + compact list
const oldSection = `<section class="directorio" id="directorio">
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
      <select id="dir-filter-location" onchange="loadDirectorio()" style="padding:0.6rem 1rem;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:#fff;cursor:pointer;max-width:220px;">
        <option value="">📍 Todas las ubicaciones</option>
        <optgroup label="🇵🇷 Puerto Rico — Municipios">
          <option value="adjuntas">Adjuntas</option>
          <option value="aguada">Aguada</option>
          <option value="aguadilla">Aguadilla</option>
          <option value="aguas-buenas">Aguas Buenas</option>
          <option value="aibonito">Aibonito</option>
          <option value="anasco">Añasco</option>
          <option value="arecibo">Arecibo</option>
          <option value="arroyo">Arroyo</option>
          <option value="barceloneta">Barceloneta</option>
          <option value="barranquitas">Barranquitas</option>
          <option value="bayamon">Bayamón</option>
          <option value="cabo-rojo">Cabo Rojo</option>
          <option value="caguas">Caguas</option>
          <option value="camuy">Camuy</option>
          <option value="canovanas">Canóvanas</option>
          <option value="carolina">Carolina</option>
          <option value="catano">Cataño</option>
          <option value="cayey">Cayey</option>
          <option value="ceiba">Ceiba</option>
          <option value="ciales">Ciales</option>
          <option value="cidra">Cidra</option>
          <option value="coamo">Coamo</option>
          <option value="comerio">Comerío</option>
          <option value="corozal">Corozal</option>
          <option value="culebra">Culebra</option>
          <option value="dorado">Dorado</option>
          <option value="fajardo">Fajardo</option>
          <option value="florida-pr">Florida</option>
          <option value="guanica">Guánica</option>
          <option value="guayama">Guayama</option>
          <option value="guayanilla">Guayanilla</option>
          <option value="guaynabo">Guaynabo</option>
          <option value="gurabo">Gurabo</option>
          <option value="hatillo">Hatillo</option>
          <option value="hormigueros">Hormigueros</option>
          <option value="humacao">Humacao</option>
          <option value="isabela">Isabela</option>
          <option value="jayuya">Jayuya</option>
          <option value="juana-diaz">Juana Díaz</option>
          <option value="juncos">Juncos</option>
          <option value="lajas">Lajas</option>
          <option value="lares">Lares</option>
          <option value="las-marias">Las Marías</option>
          <option value="las-piedras">Las Piedras</option>
          <option value="loiza">Loíza</option>
          <option value="luquillo">Luquillo</option>
          <option value="manati">Manatí</option>
          <option value="maricao">Maricao</option>
          <option value="maunabo">Maunabo</option>
          <option value="mayaguez">Mayagüez</option>
          <option value="moca">Moca</option>
          <option value="morovis">Morovis</option>
          <option value="naguabo">Naguabo</option>
          <option value="naranjito">Naranjito</option>
          <option value="orocovis">Orocovis</option>
          <option value="patillas">Patillas</option>
          <option value="penuelas">Peñuelas</option>
          <option value="ponce">Ponce</option>
          <option value="quebradillas">Quebradillas</option>
          <option value="rincon">Rincón</option>
          <option value="rio-grande">Río Grande</option>
          <option value="sabana-grande">Sabana Grande</option>
          <option value="salinas">Salinas</option>
          <option value="san-german">San Germán</option>
          <option value="san-juan">San Juan</option>
          <option value="san-lorenzo">San Lorenzo</option>
          <option value="san-sebastian">San Sebastián</option>
          <option value="santa-isabel">Santa Isabel</option>
          <option value="toa-alta">Toa Alta</option>
          <option value="toa-baja">Toa Baja</option>
          <option value="trujillo-alto">Trujillo Alto</option>
          <option value="utuado">Utuado</option>
          <option value="vega-alta">Vega Alta</option>
          <option value="vega-baja">Vega Baja</option>
          <option value="vieques">Vieques</option>
          <option value="villalba">Villalba</option>
          <option value="yabucoa">Yabucoa</option>
          <option value="yauco">Yauco</option>
        </optgroup>
        <optgroup label="🇺🇸 Estados Unidos">
          <option value="alabama">Alabama</option>
          <option value="alaska">Alaska</option>
          <option value="arizona">Arizona</option>
          <option value="arkansas">Arkansas</option>
          <option value="california">California</option>
          <option value="colorado">Colorado</option>
          <option value="connecticut">Connecticut</option>
          <option value="delaware">Delaware</option>
          <option value="florida">Florida</option>
          <option value="georgia">Georgia</option>
          <option value="hawaii">Hawaii</option>
          <option value="idaho">Idaho</option>
          <option value="illinois">Illinois</option>
          <option value="indiana">Indiana</option>
          <option value="iowa">Iowa</option>
          <option value="kansas">Kansas</option>
          <option value="kentucky">Kentucky</option>
          <option value="louisiana">Louisiana</option>
          <option value="maine">Maine</option>
          <option value="maryland">Maryland</option>
          <option value="massachusetts">Massachusetts</option>
          <option value="michigan">Michigan</option>
          <option value="minnesota">Minnesota</option>
          <option value="mississippi">Mississippi</option>
          <option value="missouri">Missouri</option>
          <option value="montana">Montana</option>
          <option value="nebraska">Nebraska</option>
          <option value="nevada">Nevada</option>
          <option value="new-hampshire">New Hampshire</option>
          <option value="new-jersey">New Jersey</option>
          <option value="new-mexico">New Mexico</option>
          <option value="nueva-york">Nueva York</option>
          <option value="north-carolina">North Carolina</option>
          <option value="north-dakota">North Dakota</option>
          <option value="ohio">Ohio</option>
          <option value="oklahoma">Oklahoma</option>
          <option value="oregon">Oregon</option>
          <option value="pennsylvania">Pennsylvania</option>
          <option value="rhode-island">Rhode Island</option>
          <option value="south-carolina">South Carolina</option>
          <option value="south-dakota">South Dakota</option>
          <option value="tennessee">Tennessee</option>
          <option value="texas">Texas</option>
          <option value="utah">Utah</option>
          <option value="vermont">Vermont</option>
          <option value="virginia">Virginia</option>
          <option value="washington">Washington</option>
          <option value="west-virginia">West Virginia</option>
          <option value="wisconsin">Wisconsin</option>
          <option value="wyoming">Wyoming</option>
          <option value="washington-dc">Washington D.C.</option>
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

    <!-- Listado dinámico compacto -->
    <div id="directorio-grid" class="directorio-grid">
      <div style="text-align:center;padding:2rem;color:var(--mid);">
        <div style="font-size:2rem;margin-bottom:0.5rem;">⏳</div>
        <div>Cargando directorio...</div>
      </div>
    </div>

    <div class="directorio-cta">
      <a href="/pb/add-negocio" class="btn-outline-dark">🇵🇷 Añadir Mi Negocio</a>
    </div>
  </div>
</section>`;

if (code.includes(oldSection)) {
  code = code.replace(oldSection, newSection);
  console.log('✅ Sección del directorio actualizada con 78 municipios de PR y 50 estados de USA');
} else {
  console.log('❌ No encontré la sección exacta del directorio');
}

// 3. Update the JavaScript rendering to compact list style
const oldMap = `    grid.innerHTML = filtered.map(function(n) {
      var photoHtml = n.photo
        ? '<img src="' + n.photo + '" alt="' + n.name + '" style="width:100%;height:140px;object-fit:cover;border-radius:8px 8px 0 0;margin-bottom:0.8rem;">'
        : '<div class="dir-icon">' + (categoryIcons[n.category] || '🏪') + '</div>';
      var descHtml = n.desc
        ? '<div style="font-size:0.78rem;color:var(--mid);margin-top:0.4rem;line-height:1.4;">' + n.desc + '</div>'
        : '';
      var waHtml = n.whatsapp
        ? '<a href="https://wa.me/' + n.whatsapp.replace(/\\D/g,'') + '" target="_blank" style="font-size:0.75rem;background:#25D366;color:#fff;padding:0.3rem 0.6rem;border-radius:4px;text-decoration:none;font-weight:700;">📲 WhatsApp</a>'
        : '';
      var webHtml = n.website
        ? '<a href="' + n.website + '" target="_blank" style="font-size:0.75rem;background:var(--blue);color:#fff;padding:0.3rem 0.6rem;border-radius:4px;text-decoration:none;font-weight:700;">🌐 Web</a>'
        : '';
      var igHtml = n.instagram
        ? '<a href="https://instagram.com/' + n.instagram.replace('@','') + '" target="_blank" style="font-size:0.75rem;background:#E1306C;color:#fff;padding:0.3rem 0.6rem;border-radius:4px;text-decoration:none;font-weight:700;">📷 IG</a>'
        : '';
      var badgeHtml = n.badge === 'boricua-verificado'
        ? '<div class="dir-badge">🏅 Boricua Verificado</div>'
        : '';
      var locationStr = n.city + (n.location ? ', ' + n.location : '');
      return '<div class="dir-card">' +
        photoHtml +
        '<div class="dir-info">' +
        '<div class="dir-name">' + n.name + '</div>' +
        '<div class="dir-cat">' + (categoryIcons[n.category] || '🏪') + ' ' + n.category + '</div>' +
        '<div class="dir-location">📍 ' + locationStr + '</div>' +
        descHtml +
        '<div style="margin-top:0.8rem;display:flex;gap:0.5rem;flex-wrap:wrap;">' +
        waHtml + webHtml + igHtml +
        '</div></div>' +
        badgeHtml +
        '</div>';
    }).join('');`;

const newMap = `    // Sort: destacado first, then by date
    filtered.sort(function(a,b){
      if (a.destacado && !b.destacado) return -1;
      if (!a.destacado && b.destacado) return 1;
      return 0;
    });

    grid.innerHTML = filtered.map(function(n) {
      var icon = categoryIcons[n.category] || '🏪';
      var locationStr = n.city + (n.location ? ', ' + n.location : '');
      var contactHtml = '';
      if (n.whatsapp) contactHtml += '<a href="https://wa.me/' + n.whatsapp.replace(/\\D/g,'') + '" target="_blank" style="font-size:0.72rem;color:#25D366;text-decoration:none;font-weight:700;margin-right:0.8rem;">📲 WhatsApp</a>';
      if (n.website) contactHtml += '<a href="' + n.website + '" target="_blank" style="font-size:0.72rem;color:var(--blue);text-decoration:none;font-weight:700;margin-right:0.8rem;">🌐 Web</a>';
      if (n.instagram) contactHtml += '<a href="https://instagram.com/' + n.instagram.replace('@','') + '" target="_blank" style="font-size:0.72rem;color:#E1306C;text-decoration:none;font-weight:700;">📷 IG</a>';
      var badgeHtml = n.destacado
        ? '<span style="font-size:0.68rem;background:#f0c040;color:#7a5c00;padding:0.15rem 0.5rem;border-radius:3px;font-weight:800;text-transform:uppercase;margin-left:0.5rem;">⭐ Destacado</span>'
        : (n.badge === 'boricua-verificado' ? '<span style="font-size:0.68rem;background:#e8f5e9;color:#2e7d32;padding:0.15rem 0.5rem;border-radius:3px;font-weight:700;margin-left:0.5rem;">🏅 Verificado</span>' : '');
      return '<div class="dir-card' + (n.destacado ? ' destacado' : '') + '">' +
        '<div style="font-size:1.4rem;min-width:2rem;text-align:center;">' + icon + '</div>' +
        '<div style="flex:1;min-width:0;">' +
        '<div style="display:flex;align-items:center;flex-wrap:wrap;">' +
        '<span style="font-weight:700;font-size:0.9rem;color:var(--dark);">' + n.name + '</span>' +
        badgeHtml +
        '</div>' +
        '<div style="font-size:0.75rem;color:var(--mid);margin-top:0.15rem;">📍 ' + locationStr + ' · ' + icon + ' ' + n.category + '</div>' +
        (n.desc ? '<div style="font-size:0.78rem;color:#555;margin-top:0.3rem;line-height:1.4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + n.desc + '</div>' : '') +
        (contactHtml ? '<div style="margin-top:0.4rem;">' + contactHtml + '</div>' : '') +
        '</div>' +
        '</div>';
    }).join('');`;

if (code.includes(oldMap)) {
  code = code.replace(oldMap, newMap);
  console.log('✅ Listado cambiado a formato compacto tipo Yelp');
} else {
  console.log('❌ No encontré el bloque del map — revisar manualmente');
}

fs.writeFileSync('src/views/planetaboricua.js', code);
console.log('\n🎉 Directorio actualizado');
