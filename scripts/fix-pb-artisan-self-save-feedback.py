from pathlib import Path

# Trigger workflow after installer creation.
p = Path('src/views/planetaboricua/artesano-mi-perfil.js')
s = p.read_text()

old_actions = '<div class="actions"><button id="save" class="btn" type="submit">Guardar cambios</button><a class="btn alt" href="${esc(publicUrl)}" target="_blank" rel="noopener">Ver mi perfil</a></div>'
new_actions = '<div class="actions"><button id="save" class="btn" type="submit">Guardar cambios</button><span id="saveStatus" style="display:inline-flex;align-items:center;font-weight:900;min-height:44px"></span><a class="btn alt" href="${esc(publicUrl)}" target="_blank" rel="noopener">Ver mi perfil</a></div>'
if old_actions not in s:
    raise SystemExit('actions block not found')
s = s.replace(old_actions, new_actions, 1)

old_vars = "const TOKEN=${JSON.stringify(token)};const f=document.getElementById('f'),msg=document.getElementById('msg'),save=document.getElementById('save');"
new_vars = "const TOKEN=${JSON.stringify(token)};const f=document.getElementById('f'),msg=document.getElementById('msg'),save=document.getElementById('save'),saveStatus=document.getElementById('saveStatus');"
if old_vars not in s:
    raise SystemExit('vars block not found')
s = s.replace(old_vars, new_vars, 1)

old_start = "f.onsubmit=async e=>{e.preventDefault();msg.className='notice';save.disabled=true;save.textContent='Guardando…';"
new_start = "f.onsubmit=async e=>{e.preventDefault();msg.className='notice';saveStatus.textContent='';save.disabled=true;save.textContent='Guardando…';"
if old_start not in s:
    raise SystemExit('submit start not found')
s = s.replace(old_start, new_start, 1)

old_success = "msg.textContent='✅ '+(d.message||'Cambios guardados.');msg.className='notice ok';if(d.profileUrl){const a=f.querySelector('a[href]');a.href=d.profileUrl}"
new_success = "msg.textContent='✅ '+(d.message||'Cambios guardados.');msg.className='notice ok';saveStatus.textContent='✅ Cambios guardados';saveStatus.style.color='#166534';save.textContent='✓ Guardado';saveStatus.scrollIntoView({behavior:'smooth',block:'center'});if(d.profileUrl){const a=f.querySelector('a[href]');a.href=d.profileUrl};setTimeout(()=>{save.textContent='Guardar cambios';saveStatus.textContent=''},2200)"
if old_success not in s:
    raise SystemExit('success block not found')
s = s.replace(old_success, new_success, 1)

old_error = "}catch(err){msg.textContent='❌ '+err.message;msg.className='notice err'}finally{save.disabled=false;save.textContent='Guardar cambios'}};"
new_error = "}catch(err){msg.textContent='❌ '+err.message;msg.className='notice err';saveStatus.textContent='❌ No se guardaron los cambios';saveStatus.style.color='#9f1239';saveStatus.scrollIntoView({behavior:'smooth',block:'center'})}finally{save.disabled=false;if(save.textContent==='Guardando…')save.textContent='Guardar cambios'}};"
if old_error not in s:
    raise SystemExit('error/finally block not found')
s = s.replace(old_error, new_error, 1)

p.write_text(s)
