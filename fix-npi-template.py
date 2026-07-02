with open('src/views/planetaboricua/estado-template.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Update search inputs HTML
old_inputs = """    <div class="prof-search">
      <input class="prof-input" id="profEspecialidad" placeholder="Especialidad (ej: Cardiólogo, Pediatra, Dentista...)">
      <input class="prof-input" id="profCiudad" placeholder="Ciudad (ej: Orlando, Tampa, Miami...)">
      <button class="prof-btn" onclick="buscarProfesionales()">🔍 Buscar</button>
    </div>"""

new_inputs = """    <div class="prof-search">
      <input class="prof-input" id="profEspecialidad" placeholder="Especialidad (ej: Cardiólogo, Pediatra, Dentista...)">
      <input class="prof-input" id="profZip" placeholder="Código Postal (ej: 34741)" maxlength="5" style="max-width:160px;">
      <select class="prof-input" id="profRadio" style="max-width:160px;">
        <option value="10">📍 10 millas</option>
        <option value="20" selected>📍 20 millas</option>
        <option value="30">📍 30 millas</option>
        <option value="50">📍 50 millas</option>
      </select>
      <button class="prof-btn" onclick="buscarProfesionales()">🔍 Buscar</button>
    </div>"""

if old_inputs in code:
    code = code.replace(old_inputs, new_inputs)
    print('✅ Search inputs updated')
else:
    print('❌ Inputs not found')

# Update the fetch URL in buscarProfesionales
old_url = """    let url = '/api/npi-search?estado=' + state + '&limit=12';
    if (especialidad) url += '&especialidad=' + encodeURIComponent(especialidad);
    if (ciudad) url += '&ciudad=' + encodeURIComponent(ciudad);
    if (!especialidad && !ciudad) url += '&especialidad=physician';"""

new_url = """    const zip = document.getElementById('profZip').value.trim();
    const radio = document.getElementById('profRadio').value;
    let url = '/api/npi-search?estado=' + state;
    if (especialidad) url += '&especialidad=' + encodeURIComponent(especialidad);
    if (zip) {
      url += '&postal_code=' + encodeURIComponent(zip) + '&radio=' + radio;
    }
    if (!especialidad) url += '&especialidad=Family Medicine';"""

if old_url in code:
    code = code.replace(old_url, new_url)
    print('✅ Fetch URL updated')
else:
    print('❌ Fetch URL not found')

# Update variable references - ciudad no longer exists
old_func_start = """async function buscarProfesionales() {
  const especialidad = document.getElementById('profEspecialidad').value.trim();
  const ciudad = document.getElementById('profCiudad').value.trim();"""

new_func_start = """async function buscarProfesionales() {
  const especialidad = document.getElementById('profEspecialidad').value.trim();"""

if old_func_start in code:
    code = code.replace(old_func_start, new_func_start)
    print('✅ Function start updated')
else:
    print('❌ Function start not found')

with open('src/views/planetaboricua/estado-template.js', 'w', encoding='utf-8') as f:
    f.write(code)
