module.exports = function(biz, isNew) {
  return `
<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400&display=swap');
.iva-edit{font-family:'Syne',sans-serif;background:#030508;color:#F0F4FF;margin:-20px;min-height:100vh;}
.iva-edit *{box-sizing:border-box;margin:0;padding:0;}
.iva-edit-nav{padding:1rem 2rem;background:rgba(3,5,8,0.95);border-bottom:1px solid rgba(0,229,200,0.08);display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;backdrop-filter:blur(12px);}
.iva-edit-logo{display:flex;align-items:center;gap:0.6rem;text-decoration:none;}
.iva-edit-logo-mark{width:30px;height:30px;border:1.5px solid #00E5C8;border-radius:7px;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:#00E5C8;background:rgba(0,229,200,0.06);}
.iva-edit-logo-text{font-size:1rem;font-weight:700;color:#F0F4FF;}
.iva-edit-logo-text span{color:#00E5C8;}
.iva-edit-back{font-size:0.82rem;color:#8892A4;border:1px solid rgba(255,255,255,0.1);padding:0.4rem 1rem;border-radius:6px;transition:all 0.2s;text-decoration:none;}
.iva-edit-back:hover{color:#F0F4FF;border-color:rgba(255,255,255,0.25);}
.iva-edit-content{max-width:800px;margin:0 auto;padding:2.5rem 2rem 5rem;}
.iva-edit-header{margin-bottom:2rem;}
.iva-edit-title{font-size:1.8rem;font-weight:800;letter-spacing:-0.02em;margin-bottom:0.3rem;}
.iva-edit-title span{color:#00E5C8;}
.iva-edit-slug{font-family:'JetBrains Mono',monospace;font-size:0.72rem;color:#4A5568;}
.iva-edit-card{background:#0D1420;border:1px solid rgba(255,255,255,0.05);border-radius:16px;padding:2rem;margin-bottom:1.5rem;position:relative;overflow:hidden;}
.iva-edit-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#00E5C8,transparent);}
.iva-edit-card-title{font-family:'JetBrains Mono',monospace;font-size:0.68rem;color:#00E5C8;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:1.5rem;display:flex;align-items:center;gap:0.5rem;}
.iva-edit-card-title::before{content:'';width:16px;height:1px;background:#00E5C8;}
.iva-edit-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;}
.iva-edit-row.single{grid-template-columns:1fr;}
.iva-edit-field{display:flex;flex-direction:column;gap:0.4rem;}
.iva-edit-field label{font-size:0.72rem;color:#8892A4;letter-spacing:0.05em;font-weight:500;}
.iva-edit-field input,
.iva-edit-field select,
.iva-edit-field textarea{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:0.7rem 1rem;color:#F0F4FF;font-family:'Syne',sans-serif;font-size:0.9rem;outline:none;transition:border-color 0.2s;width:100%;}
.iva-edit-field input:focus,
.iva-edit-field select:focus,
.iva-edit-field textarea:focus{border-color:#00E5C8;}
.iva-edit-field select{cursor:pointer;-webkit-appearance:none;}
.iva-edit-field textarea{resize:vertical;min-height:90px;line-height:1.6;}
.iva-edit-field select option{background:#0D1420;}
.iva-edit-menu-item{display:flex;gap:0.5rem;align-items:center;margin-bottom:0.5rem;}
.iva-edit-menu-item input{flex:1;}
.iva-edit-menu-item input.price{max-width:90px;}
.iva-edit-menu-del{width:32px;height:32px;background:rgba(255,77,77,0.08);border:1px solid rgba(255,77,77,0.15);border-radius:6px;color:#ff6b6b;font-size:0.9rem;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.2s;}
.iva-edit-menu-del:hover{background:rgba(255,77,77,0.2);}
.iva-edit-add-btn{background:transparent;border:1px dashed rgba(0,229,200,0.3);color:#00E5C8;padding:0.6rem 1rem;border-radius:8px;font-family:'Syne',sans-serif;font-size:0.82rem;font-weight:600;cursor:pointer;transition:all 0.2s;width:100%;margin-top:0.5rem;}
.iva-edit-add-btn:hover{background:rgba(0,229,200,0.05);border-color:rgba(0,229,200,0.5);}
.iva-edit-actions{display:flex;gap:1rem;margin-top:2rem;}
.iva-edit-save{flex:1;padding:1rem;background:#00E5C8;color:#030508;border:none;border-radius:10px;font-family:'Syne',sans-serif;font-weight:700;font-size:1rem;cursor:pointer;transition:all 0.25s;}
.iva-edit-save:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(0,229,200,0.3);}
.iva-edit-preview{padding:1rem;background:transparent;color:#8892A4;border:1px solid rgba(255,255,255,0.1);border-radius:10px;font-family:'Syne',sans-serif;font-weight:600;font-size:0.9rem;cursor:pointer;transition:all 0.2s;}
.iva-edit-preview:hover{color:#F0F4FF;border-color:rgba(255,255,255,0.25);}
.iva-edit-success{background:rgba(76,175,80,0.1);border:1px solid rgba(76,175,80,0.3);color:#4CAF50;padding:1rem;border-radius:10px;text-align:center;font-weight:600;display:none;margin-bottom:1rem;}
@media(max-width:600px){.iva-edit-row{grid-template-columns:1fr;}.iva-edit-actions{flex-direction:column;}}
</style>

<div class="iva-edit">
  <nav class="iva-edit-nav">
    <a href="/admin/dashboard" class="iva-edit-logo">
      <div class="iva-edit-logo-mark">IvA</div>
      <span class="iva-edit-logo-text">Ivamar <span>AI</span> · Admin</span>
    </a>
    <a href="/admin/dashboard" class="iva-edit-back">← Dashboard</a>
  </nav>

  <div class="iva-edit-content">
    <div class="iva-edit-header">
      <div class="iva-edit-title">${isNew ? '✨ <span>Nuevo</span> negocio' : 'Editando: <span>' + (biz.name || biz.slug) + '</span>'}</div>
      ${!isNew ? `<div class="iva-edit-slug">ivamarai.com/${biz.slug}</div>` : ''}
    </div>

    <div class="iva-edit-success" id="saveSuccess">✅ ¡Cambios guardados! La página se actualizó.</div>

    <!-- INFO GENERAL -->
    <div class="iva-edit-card">
      <div class="iva-edit-card-title">Información del negocio</div>
      <div class="iva-edit-row">
        <div class="iva-edit-field">
          <label>Nombre del negocio *</label>
          <input type="text" id="bizName" value="${biz.name || ''}" placeholder="Ej: El Rincón Boricua" />
        </div>
        <div class="iva-edit-field">
          <label>Tipo de negocio</label>
          <select id="bizType">
            <option value="Food Truck" ${(biz.headline||'').includes('Food Truck')?'selected':''}>Food Truck</option>
            <option value="Restaurante" ${(biz.headline||'').includes('Restaurante')?'selected':''}>Restaurante</option>
            <option value="Panadería" ${(biz.headline||'').includes('Panadería')?'selected':''}>Panadería</option>
            <option value="Cafetería" ${(biz.headline||'').includes('Cafetería')?'selected':''}>Cafetería</option>
            <option value="Dealer de Autos" ${(biz.headline||'').includes('Autos')?'selected':''}>Dealer de Autos</option>
            <option value="Salón de Belleza" ${(biz.headline||'').includes('Salón')?'selected':''}>Salón de Belleza</option>
            <option value="Servicios Profesionales" ${(biz.headline||'').includes('Servicios')?'selected':''}>Servicios Profesionales</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
      </div>
      <div class="iva-edit-row single">
        <div class="iva-edit-field">
          <label>Descripción</label>
          <textarea id="bizDesc" placeholder="Describe tu negocio...">${biz.description || ''}</textarea>
        </div>
      </div>
      <div class="iva-edit-row">
        <div class="iva-edit-field">
          <label>Dirección</label>
          <input type="text" id="bizAddress" value="${biz.address || ''}" placeholder="PR-2 Km 45, Arecibo, PR" />
        </div>
        <div class="iva-edit-field">
          <label>Horario</label>
          <input type="text" id="bizHours" value="${biz.hours || ''}" placeholder="Lun-Dom 11am - 9pm" />
        </div>
      </div>
      <div class="iva-edit-row">
        <div class="iva-edit-field">
          <label>WhatsApp</label>
          <input type="text" id="bizWhatsapp" value="${(biz.links?.whatsapp||'').replace('https://wa.me/','')}" placeholder="17870000000" />
        </div>
        <div class="iva-edit-field">
          <label>Estado</label>
          <select id="bizStatus">
            <option value="abierto" ${biz.status==='abierto'||!biz.status?'selected':''}>🟢 Abierto</option>
            <option value="cerrado" ${biz.status==='cerrado'?'selected':''}>🔴 Cerrado</option>
            <option value="vacaciones" ${biz.status==='vacaciones'?'selected':''}>🌴 Vacaciones</option>
            <option value="feriado" ${biz.status==='feriado'?'selected':''}>📅 Feriado</option>
          </select>
        </div>
      </div>
      <div class="iva-edit-row">
        <div class="iva-edit-field">
          <label>Logo URL</label>
          <input type="text" id="bizLogo" value="${biz.logoUrl || ''}" placeholder="https://..." />
        </div>
        <div class="iva-edit-field">
          <label>Foto principal URL</label>
          <input type="text" id="bizPhoto" value="${biz.businessPhotoUrl || ''}" placeholder="https://..." />
        </div>
      </div>
    </div>

    <!-- MENU -->
    <div class="iva-edit-card">
      <div class="iva-edit-card-title">Menú principal</div>
      <div style="display:flex;gap:0.5rem;margin-bottom:0.5rem;padding:0 0 0.3rem;">
        <span style="flex:1;font-size:0.7rem;color:#4A5568;font-family:'JetBrains Mono',monospace;">NOMBRE</span>
        <span style="width:90px;font-size:0.7rem;color:#4A5568;font-family:'JetBrains Mono',monospace;">PRECIO</span>
        <span style="width:32px;"></span>
      </div>
      <div id="menuItems">
        ${(biz.menu||[]).map((item,i) => `
          <div class="iva-edit-menu-item">
            <input type="text" value="${item.name||''}" placeholder="Nombre del plato" />
            <input type="number" class="price" value="${item.price||''}" placeholder="0.00" step="0.01" />
            <button class="iva-edit-menu-del" onclick="this.parentElement.remove()">×</button>
          </div>
        `).join('')}
      </div>
      <button class="iva-edit-add-btn" onclick="addMenuItem('menuItems')">+ Agregar plato</button>
    </div>

    <!-- SIDES -->
    <div class="iva-edit-card">
      <div class="iva-edit-card-title">Acompañantes</div>
      <div id="sideItems">
        ${(biz.sides||[]).map(item => `
          <div class="iva-edit-menu-item">
            <input type="text" value="${item.name||''}" placeholder="Nombre" />
            <input type="number" class="price" value="${item.price||''}" placeholder="0.00" step="0.01" />
            <button class="iva-edit-menu-del" onclick="this.parentElement.remove()">×</button>
          </div>
        `).join('')}
      </div>
      <button class="iva-edit-add-btn" onclick="addMenuItem('sideItems')">+ Agregar acompañante</button>
    </div>

    <!-- DRINKS -->
    <div class="iva-edit-card">
      <div class="iva-edit-card-title">Bebidas</div>
      <div id="drinkItems">
        ${(biz.drinks||[]).map(item => `
          <div class="iva-edit-menu-item">
            <input type="text" value="${item.name||''}" placeholder="Nombre" />
            <input type="number" class="price" value="${item.price||''}" placeholder="0.00" step="0.01" />
            <button class="iva-edit-menu-del" onclick="this.parentElement.remove()">×</button>
          </div>
        `).join('')}
      </div>
      <button class="iva-edit-add-btn" onclick="addMenuItem('drinkItems')">+ Agregar bebida</button>
    </div>

    <!-- ASISTENTE IVA -->
    <div class="iva-edit-card">
      <div class="iva-edit-card-title">Asistente IvA</div>
      <div class="iva-edit-row">
        <div class="iva-edit-field">
          <label>Nombre del asistente</label>
          <input type="text" id="assistantName" value="${biz.assistant?.name || 'IvA'}" placeholder="IvA" />
        </div>
        <div class="iva-edit-field">
          <label>Tono</label>
          <input type="text" id="assistantTone" value="${biz.assistant?.tone || ''}" placeholder="amistoso, boricua, profesional" />
        </div>
      </div>
      <div class="iva-edit-row single">
        <div class="iva-edit-field">
          <label>Saludo inicial</label>
          <textarea id="assistantWelcome" placeholder="¡Hola! ¿En qué te ayudo hoy?">${biz.assistant?.welcome || ''}</textarea>
        </div>
      </div>
    </div>

    <div class="iva-edit-actions">
      <button class="iva-edit-save" onclick="saveChanges('${biz.slug||''}')">💾 Guardar cambios</button>
      ${!isNew ? `<button class="iva-edit-preview" onclick="window.open('/${biz.slug}','_blank')">👁 Ver página</button>` : ''}
    </div>
  </div>
</div>

<script>
function addMenuItem(containerId) {
  const container = document.getElementById(containerId);
  const div = document.createElement('div');
  div.className = 'iva-edit-menu-item';
  div.innerHTML = '<input type="text" placeholder="Nombre" /><input type="number" class="price" placeholder="0.00" step="0.01" /><button class="iva-edit-menu-del" onclick="this.parentElement.remove()">×</button>';
  container.appendChild(div);
  div.querySelector('input').focus();
}

function getMenuItems(containerId) {
  return Array.from(document.getElementById(containerId).querySelectorAll('.iva-edit-menu-item')).map(row => {
    const inputs = row.querySelectorAll('input');
    const name = inputs[0].value.trim();
    const price = parseFloat(inputs[1].value) || null;
    return name ? { name, price, desc: '' } : null;
  }).filter(Boolean);
}

function saveChanges(currentSlug) {
  const name = document.getElementById('bizName').value.trim();
  if (!name) { alert('El nombre del negocio es requerido'); return; }

  const slug = currentSlug || name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
  const whatsapp = document.getElementById('bizWhatsapp').value.trim().replace(/\\D/g,'');

  const data = {
    slug,
    name,
    headline: document.getElementById('bizType').value + ' con Ivamar AI',
    description: document.getElementById('bizDesc').value.trim(),
    address: document.getElementById('bizAddress').value.trim(),
    hours: document.getElementById('bizHours').value.trim(),
    status: document.getElementById('bizStatus').value,
    logoUrl: document.getElementById('bizLogo').value.trim(),
    businessPhotoUrl: document.getElementById('bizPhoto').value.trim(),
    links: { whatsapp: whatsapp ? 'https://wa.me/' + whatsapp : '#', instagram: '#', googleMaps: '#' },
    assistant: {
      name: document.getElementById('assistantName').value.trim() || 'IvA',
      tone: document.getElementById('assistantTone').value.trim(),
      welcome: document.getElementById('assistantWelcome').value.trim(),
      keywords: [], avatarUrl: ''
    },
    menu: getMenuItems('menuItems'),
    sides: getMenuItems('sideItems'),
    drinks: getMenuItems('drinkItems'),
    desserts: []
  };

  fetch('/admin/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(r => r.json())
  .then(res => {
    if (res.ok) {
      const el = document.getElementById('saveSuccess');
      el.style.display = 'block';
      setTimeout(() => el.style.display = 'none', 4000);
      if (!currentSlug) window.location.href = '/admin/edit/' + slug;
    } else {
      alert('Error guardando: ' + (res.error || 'desconocido'));
    }
  })
  .catch(() => alert('Error de conexión'));
}
</script>
  `;
};
