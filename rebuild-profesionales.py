with open('src/views/planetaboricua/estado-template.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Replace the entire profesionales section HTML
old_html = """<!-- DIRECTORIO PROFESIONAL -->
<section class="profesionales" id="profesionales">
  <div class="prof-inner">
    <div class="sec-tag">Profesionales Verificados</div>
    <h2 class="sec-title">Médicos y Profesionales Boricuas en ${estado.nombre}</h2>
    <p style="font-size:0.88rem;color:var(--mid);margin-bottom:1rem;">Profesionales con licencia activa verificada — datos del registro federal NPI de USA.</p>
    <div class="prof-search">
      <input class="prof-input" id="profEspecialidad" placeholder="Especialidad (ej: Cardiólogo, Pediatra, Dentista...)">
      <input class="prof-input" id="profZip" placeholder="Código Postal (ej: 34741)" maxlength="5" style="max-width:160px;">
      <select class="prof-input" id="profRadio" style="max-width:160px;">
        <option value="10">📍 10 millas</option>
        <option value="20" selected>📍 20 millas</option>
        <option value="30">📍 30 millas</option>
        <option value="50">📍 50 millas</option>
      </select>
      <button class="prof-btn" onclick="buscarProfesionales()">🔍 Buscar</button>
    </div>
    <div class="prof-grid" id="profGrid">
      <div class="dir-empty" style="grid-column:1/-1;">Selecciona una especialidad o ciudad y haz clic en Buscar.</div>
    </div>
  </div>
</section>"""

new_html = """<!-- DIRECTORIO PROFESIONAL -->
<section class="profesionales" id="profesionales">
  <div class="prof-inner">
    <div class="sec-tag">Profesionales de Salud</div>
    <h2 class="sec-title">Busca un Profesional de Salud en ${estado.nombre}</h2>
    <p style="font-size:0.88rem;color:var(--mid);margin-bottom:1.5rem;">Datos verificados del Registro Federal NPI (National Provider Identifier) de USA. Licencias activas solamente.</p>
    <div style="background:var(--light);border-radius:12px;padding:1.5rem;border:1px solid var(--border);margin-bottom:1.5rem;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;">
        <div>
          <label style="font-size:0.72rem;font-weight:700;color:var(--mid);text-transform:uppercase;letter-spacing:0.08em;display:block;margin-bottom:0.4rem;">Especialidad</label>
          <select class="prof-input" id="profEspecialidad" style="width:100%;">
            <option value="">-- Selecciona una especialidad --</option>
            <option value="Family Medicine">🩺 Médico de Familia / Generalista</option>
            <option value="Internal Medicine">🫀 Médico Internista</option>
            <option value="Pediatrics">👶 Pediatra</option>
            <option value="Cardiology">❤️ Cardiólogo</option>
            <option value="Dermatology">🧴 Dermatólogo</option>
            <option value="Obstetrics">🤱 Ginecólogo / Obstetra</option>
            <option value="Psychiatry">🧠 Psiquiatra</option>
            <option value="Psychology">💭 Psicólogo</option>
            <option value="Orthopedic Surgery">🦴 Ortopeda</option>
            <option value="Ophthalmology">👁️ Oftalmólogo</option>
            <option value="Dentist">🦷 Dentista</option>
            <option value="Neurology">🧬 Neurólogo</option>
            <option value="Endocrinology">⚗️ Endocrinólogo</option>
            <option value="Gastroenterology">🫁 Gastroenterólogo</option>
            <option value="Urology">🔬 Urólogo</option>
            <option value="Oncology">🎗️ Oncólogo</option>
            <option value="Pulmonary Disease">🫁 Neumólogo</option>
            <option value="Rheumatology">💊 Reumatólogo</option>
            <option value="Nephrology">🫘 Nefrólogo</option>
            <option value="Physical Therapist">🏃 Fisioterapeuta</option>
            <option value="Nurse Practitioner">👩‍⚕️ Enfermera Practicante</option>
            <option value="Nutritionist">🥗 Nutricionista</option>
            <option value="Pharmacy">💊 Farmacéutico</option>
            <option value="Chiropractic">🙌 Quiropráctico</option>
            <option value="Optometry">👓 Optometrista</option>
          </select>
        </div>
        <div>
          <label style="font-size:0.72rem;font-weight:700;color:var(--mid);text-transform:uppercase;letter-spacing:0.08em;display:block;margin-bottom:0.4rem;">Tu Código Postal</label>
          <input class="prof-input" id="profZip" placeholder="Ej: 34741" maxlength="5" style="width:100%;" type="number">
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
        <div>
          <label style="font-size:0.72rem;font-weight:700;color:var(--mid);text-transform:uppercase;letter-spacing:0.08em;display:block;margin-bottom:0.4rem;">Radio de búsqueda</label>
          <select class="prof-input" id="profRadio">
            <option value="10">📍 10 millas</option>
            <option value="20" selected>📍 20 millas</option>
            <option value="30">📍 30 millas</option>
            <option value="50">📍 50 millas</option>
          </select>
        </div>
        <div style="margin-top:1.2rem;">
          <button class="prof-btn" onclick="buscarProfesionales()" id="profBtnBuscar">🔍 Buscar Profesional</button>
        </div>
      </div>
      <p style="font-size:0.72rem;color:var(--mid);margin-top:0.8rem;">💡 El código postal y la especialidad son necesarios para buscar. Los resultados muestran profesionales con licencia activa.</p>
    </div>
    <div id="profGrid">
      <div class="dir-empty" style="text-align:center;padding:3rem;color:var(--mid);">
        <div style="font-size:2.5rem;margin-bottom:0.8rem;">🔍</div>
        <div style="font-weight:700;color:var(--dark);margin-bottom:0.4rem;">Selecciona una especialidad y tu código postal</div>
        <div style="font-size:0.82rem;">Te mostramos profesionales con licencia activa cerca de ti.</div>
      </div>
    </div>
  </div>
</section>"""

if old_html in code:
    code = code.replace(old_html, new_html)
    print('✅ HTML section updated')
else:
    print('❌ HTML section not found')

# Replace the entire JavaScript function
old_js = """// Load profesionales from NPI API
async function buscarProfesionales() {
  const especialidad = document.getElementById('profEspecialidad').value.trim();
  const grid = document.getElementById('profGrid');
  grid.innerHTML = '<div class="dir-empty" style="grid-column:1/-1;">Buscando...</div>';
  try {
    const state = '${estado.codigoEstado}';
    const zip = document.getElementById('profZip').value.trim();
    const radio = document.getElementById('profRadio').value;
    let url = '/api/npi-search?estado=' + state;
    if (especialidad) url += '&especialidad=' + encodeURIComponent(especialidad);
    if (zip) {
      url += '&postal_code=' + encodeURIComponent(zip) + '&radio=' + radio;
    }
    if (!especialidad) url += '&especialidad=Family Medicine';
    const res = await fetch(url);
    const data = await res.json();
    const results = data.results || [];
    if (!results.length) {
      grid.innerHTML = '<div class="dir-empty" style="grid-column:1/-1;">No encontramos resultados. Intenta con otra especialidad o ciudad.</div>';
      return;
    }
    grid.innerHTML = results.map(r => {
      const basic = r.basic || {};
      const addrs = r.addresses || [];
      const addr = addrs.find(a => a.address_purpose === 'LOCATION') || addrs[0] || {};
      const tax = (r.taxonomies || [])[0] || {};
      const fullName = (basic.name_prefix && basic.name_prefix !== '--' ? basic.name_prefix + ' ' : '') + (basic.first_name || '') + ' ' + (basic.last_name || '');
      const hispanic = isHispanic(basic.last_name);
      const phone = addr.telephone_number || '';
      return \\`
        <div class="prof-card">
          <div class="prof-card-spec">\\${tax.desc || 'Profesional de Salud'}</div>
          <div class="prof-card-name">\\${fullName.trim()}<span class="prof-badge">✓ Licencia Activa</span>\\${hispanic ? '<span class="prof-badge" style="background:#FFF3E0;color:#E65100;">🇵🇷 Probablemente habla español</span>' : ''}</div>
          <div class="prof-card-loc">📍 \\${addr.city || ''}\\${addr.city ? ', ' : ''}\\${addr.state || ''}\\${phone ? ' · 📞 ' + phone : ''}</div>
        </div>
      \\`;
    }).join('');
  } catch(e) {
    grid.innerHTML = '<div class="dir-empty" style="grid-column:1/-1;">Error al buscar. Intenta de nuevo.</div>';
  }
}"""

new_js = """// Buscar profesionales de salud via NPI Registry
async function buscarProfesionales() {
  const especialidad = document.getElementById('profEspecialidad').value;
  const zip = document.getElementById('profZip').value.trim();
  const radio = document.getElementById('profRadio').value;
  const grid = document.getElementById('profGrid');
  const btn = document.getElementById('profBtnBuscar');

  // Validate inputs
  if (!especialidad) {
    grid.innerHTML = '<div class="dir-empty" style="text-align:center;padding:2rem;color:#c0392b;"><div style="font-size:1.5rem;margin-bottom:0.5rem;">⚠️</div><div>Por favor selecciona una especialidad.</div></div>';
    return;
  }
  if (!zip || zip.length !== 5) {
    grid.innerHTML = '<div class="dir-empty" style="text-align:center;padding:2rem;color:#c0392b;"><div style="font-size:1.5rem;margin-bottom:0.5rem;">⚠️</div><div>Por favor ingresa tu código postal (5 dígitos).</div></div>';
    return;
  }

  // Show loading
  btn.disabled = true;
  btn.textContent = 'Buscando...';
  grid.innerHTML = '<div style="text-align:center;padding:3rem;color:var(--mid);"><div style="font-size:2rem;margin-bottom:0.8rem;">⏳</div><div>Buscando profesionales cerca de ti...</div></div>';

  try {
    const url = '/api/npi-search?postal_code=' + encodeURIComponent(zip) + '&radio=' + radio + '&especialidad=' + encodeURIComponent(especialidad);
    const res = await fetch(url);
    const data = await res.json();
    const results = (data.results || []).filter(r => r.basic && r.basic.status === 'A' && r.enumeration_type === 'NPI-1');

    if (!results.length) {
      grid.innerHTML = '<div class="dir-empty" style="text-align:center;padding:3rem;"><div style="font-size:2rem;margin-bottom:0.8rem;">😕</div><div style="font-weight:700;color:var(--dark);margin-bottom:0.4rem;">No encontramos resultados</div><div style="font-size:0.82rem;color:var(--mid);">Intenta con un radio mayor o una especialidad diferente.</div></div>';
      return;
    }

    const cards = results.map(r => {
      const basic = r.basic || {};
      const addrs = r.addresses || [];
      const addr = addrs.find(a => a.address_purpose === 'LOCATION') || addrs[0] || {};
      const tax = (r.taxonomies || []).find(t => t.primary) || (r.taxonomies || [])[0] || {};
      const prefix = basic.name_prefix && basic.name_prefix !== '--' ? basic.name_prefix + ' ' : '';
      const fullName = (prefix + (basic.first_name || '') + ' ' + (basic.last_name || '')).trim();
      const hispanic = isHispanic(basic.last_name);
      const phone = addr.telephone_number || '';
      const city = addr.city || '';
      const state = addr.state || '';

      return \\`<div class="prof-card" style="background:#fff;border-radius:10px;padding:1.2rem;border:1px solid var(--border);transition:box-shadow 0.2s;" onmouseover="this.style.boxShadow='0 4px 16px rgba(0,0,0,0.08)'" onmouseout="this.style.boxShadow='none'">
        <div style="font-size:0.65rem;font-weight:800;color:var(--blue);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.3rem;">\\${tax.desc || 'Profesional de Salud'}</div>
        <div style="font-size:0.95rem;font-weight:700;color:var(--dark);margin-bottom:0.4rem;">
          \\${fullName || 'Profesional Verificado'}
          <span style="display:inline-block;background:#E8F5E9;color:#2e7d32;font-size:0.6rem;font-weight:700;padding:0.15rem 0.5rem;border-radius:4px;margin-left:0.4rem;">✓ Licencia Activa</span>
          \\${hispanic ? '<span style="display:inline-block;background:#FFF3E0;color:#E65100;font-size:0.6rem;font-weight:700;padding:0.15rem 0.5rem;border-radius:4px;margin-left:0.2rem;">🇵🇷 Habla español</span>' : ''}
        </div>
        <div style="font-size:0.78rem;color:var(--mid);">
          \\${city ? '📍 ' + city + (state ? ', ' + state : '') : ''}
          \\${phone ? ' &nbsp;·&nbsp; 📞 ' + phone : ''}
        </div>
      </div>\\`;
    }).join('');

    const especialidadLabel = document.getElementById('profEspecialidad').options[document.getElementById('profEspecialidad').selectedIndex].text;
    grid.innerHTML = \\`<div style="margin-bottom:1rem;font-size:0.82rem;color:var(--mid);">Se encontraron <strong style="color:var(--dark);">\\${results.length} profesionales</strong> de \\${especialidadLabel} en un radio de \\${radio} millas.</div><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;">\\${cards}</div>\\`;

  } catch(e) {
    grid.innerHTML = '<div class="dir-empty" style="text-align:center;padding:2rem;color:#c0392b;">Error al buscar. Intenta de nuevo.</div>';
  } finally {
    btn.disabled = false;
    btn.textContent = '🔍 Buscar Profesional';
  }
}"""

if old_js in code:
    code = code.replace(old_js, new_js)
    print('✅ JavaScript function rebuilt')
else:
    print('❌ JavaScript function not found')

with open('src/views/planetaboricua/estado-template.js', 'w', encoding='utf-8') as f:
    f.write(code)
