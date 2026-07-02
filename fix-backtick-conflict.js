const fs = require('fs');
let code = fs.readFileSync('src/views/planetaboricua.js', 'utf8');

// Fix the empty state innerHTML - replace backtick template with string concatenation
const oldEmpty = "      grid.innerHTML = `\n        <div style=\"grid-column:1/-1;text-align:center;padding:3rem;color:var(--mid);\">\n          <div style=\"font-size:3rem;margin-bottom:1rem;\">🇵🇷</div>\n          <div style=\"font-size:1.1rem;font-weight:700;color:var(--dark);margin-bottom:0.5rem;\">Todavía no hay negocios en esta categoría</div>\n          <div style=\"font-size:0.9rem;margin-bottom:1.5rem;\">¡Sé el primero en aparecer aquí!</div>\n          <a href=\"/pb/add-negocio\" style=\"display:inline-block;background:var(--blue);color:#fff;padding:0.8rem 1.5rem;border-radius:8px;text-decoration:none;font-weight:700;\">Añadir Mi Negocio →</a>\n        </div>\n      `;\n      return;";

const newEmpty = "      grid.innerHTML = '<div style=\"grid-column:1/-1;text-align:center;padding:3rem;color:var(--mid);\"><div style=\"font-size:3rem;margin-bottom:1rem;\">🇵🇷</div><div style=\"font-size:1.1rem;font-weight:700;color:var(--dark);margin-bottom:0.5rem;\">Todavía no hay negocios en esta categoría</div><div style=\"font-size:0.9rem;margin-bottom:1.5rem;\">¡Sé el primero en aparecer aquí!</div><a href=\"/pb/add-negocio\" style=\"display:inline-block;background:var(--blue);color:#fff;padding:0.8rem 1.5rem;border-radius:8px;text-decoration:none;font-weight:700;\">Añadir Mi Negocio →</a></div>';\n      return;";

if (code.includes(oldEmpty)) {
  code = code.replace(oldEmpty, newEmpty);
  console.log('✅ Empty state fixed');
} else {
  // Try a more flexible replacement
  const emptyStart = "      grid.innerHTML = `\n        <div style=\"grid-column:1/-1;text-align:center;padding:3rem;";
  const emptyEnd = "Añadir Mi Negocio →</a>\n        </div>\n      `;\n      return;";
  const startIdx = code.indexOf(emptyStart);
  const endIdx = code.indexOf(emptyEnd);
  if (startIdx !== -1 && endIdx !== -1) {
    const before = code.substring(0, startIdx);
    const after = code.substring(endIdx + emptyEnd.length);
    code = before + "      grid.innerHTML = '<div style=\"grid-column:1/-1;text-align:center;padding:3rem;color:var(--mid);\"><div style=\"font-size:3rem;margin-bottom:1rem;\">🇵🇷</div><div style=\"font-size:1.1rem;font-weight:700;color:var(--dark);margin-bottom:0.5rem;\">Todavía no hay negocios en esta categoría</div><div style=\"font-size:0.9rem;margin-bottom:1.5rem;\">¡Sé el primero en aparecer aquí!</div><a href=\"/pb/add-negocio\" style=\"display:inline-block;background:var(--blue);color:#fff;padding:0.8rem 1.5rem;border-radius:8px;text-decoration:none;font-weight:700;\">Añadir Mi Negocio →</a></div>';\n      return;" + after;
    console.log('✅ Empty state fixed (flexible method)');
  } else {
    console.log('❌ Could not find empty state block');
  }
}

// Fix the map template - replace inner backticks with string concatenation
const oldMap = "    grid.innerHTML = filtered.map(n => `\n      <div class=\"dir-card\">\n        ${n.photo ? `<img src=\"${n.photo}\" alt=\"${n.name}\" style=\"width:100%;height:140px;object-fit:cover;border-radius:8px 8px 0 0;margin-bottom:0.8rem;\">` : `<div class=\"dir-icon\">${categoryIcons[n.category] || '🏪'}</div>`}\n        <div class=\"dir-info\">\n          <div class=\"dir-name\">${n.name}</div>\n          <div class=\"dir-cat\">${categoryIcons[n.category] || '🏪'} ${n.category}</div>\n          <div class=\"dir-location\">📍 ${n.city}${n.location ? ', ' + n.location : ''}</div>\n          ${n.desc ? `<div style=\"font-size:0.78rem;color:var(--mid);margin-top:0.4rem;line-height:1.4;\">${n.desc}</div>` : ''}\n          <div style=\"margin-top:0.8rem;display:flex;gap:0.5rem;flex-wrap:wrap;\">\n            ${n.whatsapp ? `<a href=\"https://wa.me/${n.whatsapp.replace(/\\D/g,'')}\" target=\"_blank\" style=\"font-size:0.75rem;background:#25D366;color:#fff;padding:0.3rem 0.6rem;border-radius:4px;text-decoration:none;font-weight:700;\">📲 WhatsApp</a>` : ''}\n            ${n.website ? `<a href=\"${n.website}\" target=\"_blank\" style=\"font-size:0.75rem;background:var(--blue);color:#fff;padding:0.3rem 0.6rem;border-radius:4px;text-decoration:none;font-weight:700;\">🌐 Web</a>` : ''}\n            ${n.instagram ? `<a href=\"https://instagram.com/${n.instagram.replace('@','')}\" target=\"_blank\" style=\"font-size:0.75rem;background:#E1306C;color:#fff;padding:0.3rem 0.6rem;border-radius:4px;text-decoration:none;font-weight:700;\">📷 IG</a>` : ''}\n          </div>\n        </div>\n        ${n.badge === 'boricua-verificado' ? `<div class=\"dir-badge\">🏅 Boricua Verificado</div>` : ''}\n      </div>\n    `).join('');";

const newMap = `    grid.innerHTML = filtered.map(function(n) {
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

if (code.includes(oldMap)) {
  code = code.replace(oldMap, newMap);
  console.log('✅ Map template fixed');
} else {
  // Find and replace the map block more flexibly
  const mapStart = "    grid.innerHTML = filtered.map(n => `";
  const mapEnd = "`).join('');";
  const si = code.indexOf(mapStart);
  const ei = code.indexOf(mapEnd, si);
  if (si !== -1 && ei !== -1) {
    code = code.substring(0, si) + newMap + code.substring(ei + mapEnd.length);
    console.log('✅ Map template fixed (flexible method)');
  } else {
    console.log('❌ Could not find map block');
  }
}

fs.writeFileSync('src/views/planetaboricua.js', code);
console.log('\n🎉 Archivo guardado');
