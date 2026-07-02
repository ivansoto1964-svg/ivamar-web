with open('src/views/planetaboricua/estado-template.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Hispanic last names for badge detection
hispanic_names = ['garcia','rivera','rodriguez','martinez','lopez','gonzalez','hernandez','perez','sanchez','ramirez','torres','flores','diaz','morales','ortiz','cruz','reyes','vega','castillo','jimenez','vargas','delgado','espinoza','padilla','acosta','nieves','colon','santiago','rosario','figueroa','ramos','ayala','ocasio','velez','suarez','mendez','crespo','resto','negron','cardona','pagan','lebron','molina','serrano','medina','guerrero','soto','rojas','romero','dominguez','chavez','contreras','mendoza','aguilar','ruiz','guzman','silva','nunez','munoz']

old_func = """// Load profesionales from NPI API
async function buscarProfesionales() {
  const nombre = document.getElementById('profNombre').value.trim();
  if (!nombre) return;
  const grid = document.getElementById('profGrid');
  grid.innerHTML = '<div class="dir-empty" style="grid-column:1/-1;">Buscando...</div>';
  try {
    const state = '${estado.codigoEstado}';
    const url = '/api/npi-search?nombre=' + encodeURIComponent(nombre) + '&estado=' + state;
    const res = await fetch(url);
    const data = await res.json();
    const results = data.results || [];
    if (!results.length) {
      grid.innerHTML = '<div class="dir-empty" style="grid-column:1/-1;">No encontramos resultados. Intenta con otro nombre o especialidad.</div>';
      return;
    }
    grid.innerHTML = results.map(r => {
      const basic = r.basic || {};
      const addr = (r.addresses || [])[0] || {};
      const tax = (r.taxonomies || [])[0] || {};
      const nombre = basic.name_prefix ? basic.name_prefix + ' ' + basic.first_name + ' ' + basic.last_name : basic.first_name + ' ' + basic.last_name;
      return \\`
        <div class="prof-card">
          <div class="prof-card-spec">\\${tax.desc || 'Profesional de Salud'}</div>
          <div class="prof-card-name">\\${nombre}<span class="prof-badge">✓ Licencia Activa</span></div>
          <div class="prof-card-loc">📍 \\${addr.city || ''}\\${addr.city ? ', ' : ''}\\${addr.state || ''}</div>
        </div>
      \\`;
    }).join('');
  } catch(e) {
    grid.innerHTML = '<div class="dir-empty" style="grid-column:1/-1;">Error al buscar. Intenta de nuevo.</div>';"""

new_func = """// Hispanic last names for Spanish speaker badge
const hispanicNames = """ + str(hispanic_names) + """;

function isHispanic(lastName) {
  return hispanicNames.includes((lastName || '').toLowerCase());
}

// Load profesionales from NPI API
async function buscarProfesionales() {
  const especialidad = document.getElementById('profEspecialidad').value.trim();
  const ciudad = document.getElementById('profCiudad').value.trim();
  const grid = document.getElementById('profGrid');
  grid.innerHTML = '<div class="dir-empty" style="grid-column:1/-1;">Buscando...</div>';
  try {
    const state = '${estado.codigoEstado}';
    let url = '/api/npi-search?estado=' + state + '&limit=12';
    if (especialidad) url += '&especialidad=' + encodeURIComponent(especialidad);
    if (ciudad) url += '&ciudad=' + encodeURIComponent(ciudad);
    if (!especialidad && !ciudad) url += '&especialidad=physician';
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
    grid.innerHTML = '<div class="dir-empty" style="grid-column:1/-1;">Error al buscar. Intenta de nuevo.</div>';"""

if old_func in code:
    code = code.replace(old_func, new_func)
    print('✅ buscarProfesionales updated')
else:
    print('❌ Not found')

# Also update the search input fields in HTML
old_inputs = """    <div class="prof-search">
      <input class="prof-input" id="profNombre" placeholder="Nombre del médico o especialidad...">
      <button class="prof-btn" onclick="buscarProfesionales()">🔍 Buscar</button>
    </div>"""

new_inputs = """    <div class="prof-search">
      <input class="prof-input" id="profEspecialidad" placeholder="Especialidad (ej: Cardiólogo, Pediatra, Dentista...)">
      <input class="prof-input" id="profCiudad" placeholder="Ciudad (ej: Orlando, Tampa, Miami...)">
      <button class="prof-btn" onclick="buscarProfesionales()">🔍 Buscar</button>
    </div>"""

if old_inputs in code:
    code = code.replace(old_inputs, new_inputs)
    print('✅ Search inputs updated')
else:
    print('❌ Inputs not found')

# Update initial message
old_init = """      <div class="dir-empty" style="grid-column:1/-1;">Escribe un nombre o especialidad para buscar.</div>"""
new_init = """      <div class="dir-empty" style="grid-column:1/-1;">Selecciona una especialidad o ciudad y haz clic en Buscar.</div>"""

if old_init in code:
    code = code.replace(old_init, new_init)
    print('✅ Initial message updated')

with open('src/views/planetaboricua/estado-template.js', 'w', encoding='utf-8') as f:
    f.write(code)
