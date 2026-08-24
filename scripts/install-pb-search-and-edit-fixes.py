from pathlib import Path

feria_path = Path('src/views/planetaboricua/feriaartesanos.js')
profile_path = Path('src/views/planetaboricua/artesano-perfil.js')
admin_path = Path('src/views/planetaboricua/artesano-admin.js')

feria = feria_path.read_text()
profile = profile_path.read_text()
admin = admin_path.read_text()

# Improve search with normalization + synonyms + full description/location matching.
old = '''    if (searchTerm) {\n      negocios = negocios.filter(n =>\n        (n.name || '').toLowerCase().includes(searchTerm) ||\n        (n.category || '').toLowerCase().includes(searchTerm) ||\n        (n.desc || '').toLowerCase().includes(searchTerm)\n      );\n    }\n'''
new = r'''    if (searchTerm) {
      const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9ñ]+/g,' ').trim();
      const synonyms = {
        'sombrero':['sombrero','sombreros','gorro','gorros','hat','hats','boina','boinas'],
        'gorro':['gorro','gorros','sombrero','sombreros','hat','hats','boina','boinas'],
        'tenis':['tenis','tennis','sneaker','sneakers','zapato','zapatos','calzado','deportivo','deportivos','custom','pintado','pintados'],
        'tennis':['tenis','tennis','sneaker','sneakers','zapato','zapatos','calzado','deportivo','deportivos','custom','pintado','pintados'],
        'sneaker':['sneaker','sneakers','tenis','tennis','zapato','zapatos','calzado','deportivo','deportivos'],
        'zapato':['zapato','zapatos','calzado','tenis','tennis','sneaker','sneakers'],
        'crochet':['crochet','tejido','tejidos','ganchillo','hilo','lana'],
        'tejido':['tejido','tejidos','crochet','ganchillo','hilo','lana'],
        'pantalla':['pantalla','pantallas','arete','aretes','pendiente','pendientes','joyeria'],
        'arete':['arete','aretes','pantalla','pantallas','pendiente','pendientes','joyeria'],
        'collar':['collar','collares','cadena','cadenas','joyeria'],
        'pulsera':['pulsera','pulseras','brazalete','brazaletes','joyeria'],
        'cartera':['cartera','carteras','bolso','bolsos','bulto','bultos'],
        'bolso':['bolso','bolsos','cartera','carteras','bulto','bultos'],
        'madera':['madera','tallado','talla','pirograbado','wood'],
        'vela':['vela','velas','candle','candles'],
        'jabon':['jabon','jabones','soap','soaps'],
        'mascara':['mascara','mascaras','vejigante','vejigantes'],
        'pintura':['pintura','pinturas','arte','cuadro','cuadros','pintado','pintados']
      };
      const q = normalize(searchTerm);
      const terms = new Set(q.split(/\s+/).filter(Boolean));
      Array.from(terms).forEach(term => (synonyms[term] || []).forEach(s => terms.add(normalize(s))));
      negocios = negocios.filter(n => {
        const haystack = normalize([
          n.name,n.category,n.desc,n.fullDesc,n.city,n.location,n.address,n.website,n.instagram,n.facebook,n.etsy
        ].filter(Boolean).join(' '));
        return Array.from(terms).some(term => haystack.includes(term));
      });
    }
'''
if old not in feria:
    raise SystemExit('search block not found')
feria = feria.replace(old,new,1)

# Public edit button must always go to login page, never attempt profile lookup.
profile = profile.replace('href="/artesanos/mi-perfil"','href="/artesanos/mi-perfil"',1)

# Make admin save result visible next to button and scroll into view.
old_btn = '''<button id="save" class="btn">Guardar cambios</button> <a class="btn alt" href="/artesanos/${encodeURIComponent(item.slug||'')}" target="_blank">Ver perfil</a></form></section><script>'''
new_btn = '''<button id="save" class="btn">Guardar cambios</button> <span id="saveStatus" style="display:inline-block;margin-left:.7rem;font-weight:800"></span> <a class="btn alt" href="/artesanos/${encodeURIComponent(item.slug||'')}" target="_blank">Ver perfil</a></form></section><script>'''
if old_btn not in admin:
    raise SystemExit('admin save button anchor not found')
admin = admin.replace(old_btn,new_btn,1)

old_script = "const f=document.getElementById('f'),m=document.getElementById('msg'),b=document.getElementById('save');"
new_script = "const f=document.getElementById('f'),m=document.getElementById('msg'),b=document.getElementById('save'),s=document.getElementById('saveStatus');"
admin = admin.replace(old_script,new_script,1)

old_success = "m.textContent='✅ '+d.message;m.className='notice ok'"
new_success = "m.textContent='✅ '+d.message;m.className='notice ok';s.textContent='✅ Guardado';s.style.color='#166534';b.textContent='✓ Guardado';m.scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>{b.textContent='Guardar cambios';s.textContent=''},1800)"
admin = admin.replace(old_success,new_success,1)

old_catch = "m.textContent='❌ '+err.message;m.className='notice err'"
new_catch = "m.textContent='❌ '+err.message;m.className='notice err';s.textContent='❌ No guardado';s.style.color='#9f1239';m.scrollIntoView({behavior:'smooth',block:'center'})"
admin = admin.replace(old_catch,new_catch,1)

feria_path.write_text(feria)
profile_path.write_text(profile)
admin_path.write_text(admin)
