module.exports = function(businesses) {
  return `
<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400&display=swap');
.iva-dash{font-family:'Syne',sans-serif;background:#030508;color:#F0F4FF;margin:-20px;min-height:100vh;}
.iva-dash *{box-sizing:border-box;margin:0;padding:0;}
.iva-dash a{color:#00E5C8;text-decoration:none;}
.iva-dash-nav{padding:1rem 2rem;background:rgba(3,5,8,0.95);border-bottom:1px solid rgba(0,229,200,0.08);display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;backdrop-filter:blur(12px);}
.iva-dash-logo{display:flex;align-items:center;gap:0.6rem;}
.iva-dash-logo-mark{width:30px;height:30px;border:1.5px solid #00E5C8;border-radius:7px;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:#00E5C8;background:rgba(0,229,200,0.06);}
.iva-dash-logo-text{font-size:1rem;font-weight:700;color:#F0F4FF;}
.iva-dash-logo-text span{color:#00E5C8;}
.iva-dash-nav-right{display:flex;align-items:center;gap:1rem;}
.iva-dash-badge{font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:#00E5C8;background:rgba(0,229,200,0.08);border:1px solid rgba(0,229,200,0.2);padding:0.3rem 0.8rem;border-radius:4px;letter-spacing:0.1em;}
.iva-dash-logout{font-size:0.8rem;color:#8892A4;border:1px solid rgba(255,255,255,0.1);padding:0.35rem 0.8rem;border-radius:6px;transition:all 0.2s;cursor:pointer;background:transparent;}
.iva-dash-logout:hover{color:#F0F4FF;border-color:rgba(255,255,255,0.25);}
.iva-dash-content{max-width:1100px;margin:0 auto;padding:2.5rem 2rem;}
.iva-dash-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:2rem;flex-wrap:wrap;gap:1rem;}
.iva-dash-title{font-size:1.8rem;font-weight:800;letter-spacing:-0.02em;}
.iva-dash-title span{color:#00E5C8;}
.iva-dash-new-btn{background:#00E5C8;color:#030508;padding:0.7rem 1.5rem;border-radius:8px;font-family:'Syne',sans-serif;font-weight:700;font-size:0.88rem;border:none;cursor:pointer;transition:all 0.25s;display:flex;align-items:center;gap:0.5rem;}
.iva-dash-new-btn:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(0,229,200,0.3);}
.iva-dash-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:2.5rem;}
.iva-dash-stat{background:#0D1420;border:1px solid rgba(255,255,255,0.05);border-radius:12px;padding:1.2rem 1.5rem;}
.iva-dash-stat-num{font-size:2rem;font-weight:800;letter-spacing:-0.03em;color:#F0F4FF;}
.iva-dash-stat-num span{color:#00E5C8;}
.iva-dash-stat-label{font-size:0.7rem;color:#4A5568;letter-spacing:0.1em;text-transform:uppercase;margin-top:0.2rem;font-family:'JetBrains Mono',monospace;}
.iva-dash-search{margin-bottom:1.5rem;}
.iva-dash-search input{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:0.75rem 1rem;color:#F0F4FF;font-family:'Syne',sans-serif;font-size:0.9rem;outline:none;transition:border-color 0.2s;}
.iva-dash-search input:focus{border-color:rgba(0,229,200,0.4);}
.iva-dash-search input::placeholder{color:#4A5568;}
.iva-dash-table{background:#0D1420;border:1px solid rgba(255,255,255,0.05);border-radius:14px;overflow:hidden;}
.iva-dash-table-header{display:grid;grid-template-columns:2fr 1.5fr 1fr 1fr 1.2fr;gap:1rem;padding:0.9rem 1.5rem;border-bottom:1px solid rgba(255,255,255,0.06);font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:#4A5568;letter-spacing:0.1em;text-transform:uppercase;}
.iva-dash-row{display:grid;grid-template-columns:2fr 1.5fr 1fr 1fr 1.2fr;gap:1rem;padding:1rem 1.5rem;border-bottom:1px solid rgba(255,255,255,0.04);align-items:center;transition:background 0.2s;}
.iva-dash-row:last-child{border-bottom:none;}
.iva-dash-row:hover{background:rgba(255,255,255,0.02);}
.iva-dash-biz-name{font-weight:700;font-size:0.9rem;margin-bottom:0.2rem;}
.iva-dash-biz-slug{font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:#4A5568;}
.iva-dash-biz-type{font-size:0.8rem;color:#8892A4;}
.iva-dash-status{display:inline-flex;align-items:center;gap:0.4rem;font-size:0.72rem;font-weight:600;padding:0.3rem 0.7rem;border-radius:100px;font-family:'JetBrains Mono',monospace;}
.iva-dash-status.open{background:rgba(76,175,80,0.12);color:#4CAF50;border:1px solid rgba(76,175,80,0.2);}
.iva-dash-status.closed{background:rgba(255,77,77,0.1);color:#ff6b6b;border:1px solid rgba(255,77,77,0.2);}
.iva-dash-status.vacation{background:rgba(255,184,0,0.1);color:#FFB800;border:1px solid rgba(255,184,0,0.2);}
.iva-dash-actions{display:flex;gap:0.5rem;}
.iva-dash-action-btn{padding:0.4rem 0.8rem;border-radius:6px;font-family:'Syne',sans-serif;font-size:0.75rem;font-weight:600;border:none;cursor:pointer;transition:all 0.2s;}
.iva-dash-action-edit{background:rgba(0,229,200,0.1);color:#00E5C8;border:1px solid rgba(0,229,200,0.2);}
.iva-dash-action-edit:hover{background:rgba(0,229,200,0.2);}
.iva-dash-action-view{background:rgba(255,255,255,0.05);color:#8892A4;border:1px solid rgba(255,255,255,0.08);}
.iva-dash-action-view:hover{color:#F0F4FF;border-color:rgba(255,255,255,0.2);}
.iva-dash-action-del{background:rgba(255,77,77,0.08);color:#ff6b6b;border:1px solid rgba(255,77,77,0.15);}
.iva-dash-action-del:hover{background:rgba(255,77,77,0.15);}
.iva-dash-empty{text-align:center;padding:4rem 2rem;color:#4A5568;}
.iva-dash-empty-icon{font-size:3rem;margin-bottom:1rem;}
@media(max-width:768px){.iva-dash-stats{grid-template-columns:repeat(2,1fr);}.iva-dash-table-header{display:none;}.iva-dash-row{grid-template-columns:1fr;gap:0.5rem;}.iva-dash-actions{flex-wrap:wrap;}}
</style>

<div class="iva-dash">
  <nav class="iva-dash-nav">
    <div class="iva-dash-logo">
      <div class="iva-dash-logo-mark">IvA</div>
      <span class="iva-dash-logo-text">Ivamar <span>AI</span> · Admin</span>
    </div>
    <div class="iva-dash-nav-right">
      <span class="iva-dash-badge">MASTER ADMIN</span>
      <button class="iva-dash-logout" onclick="window.location.href='/admin/logout'">Cerrar sesión</button>
    </div>
  </nav>

  <div class="iva-dash-content">
    <div class="iva-dash-header">
      <div class="iva-dash-title">Negocios <span>activos</span></div>
      <button class="iva-dash-new-btn" onclick="window.location.href='/admin/new'">+ Nuevo negocio</button>
    </div>

    <div class="iva-dash-stats">
      <div class="iva-dash-stat">
        <div class="iva-dash-stat-num">${businesses.length}<span></span></div>
        <div class="iva-dash-stat-label">Total negocios</div>
      </div>
      <div class="iva-dash-stat">
        <div class="iva-dash-stat-num">${businesses.filter(b=>b.status==='abierto'||!b.status).length}<span></span></div>
        <div class="iva-dash-stat-label">Abiertos</div>
      </div>
      <div class="iva-dash-stat">
        <div class="iva-dash-stat-num">$${businesses.length * 49}<span>/mo</span></div>
        <div class="iva-dash-stat-label">MRR estimado</div>
      </div>
      <div class="iva-dash-stat">
        <div class="iva-dash-stat-num">${businesses.length}<span></span></div>
        <div class="iva-dash-stat-label">Con IvA activo</div>
      </div>
    </div>

    <div class="iva-dash-search">
      <input type="text" id="searchInput" placeholder="🔍 Buscar negocio..." oninput="filterRows()" />
    </div>

    <div class="iva-dash-table">
      <div class="iva-dash-table-header">
        <span>Negocio</span>
        <span>Tipo</span>
        <span>Estado</span>
        <span>Slug</span>
        <span>Acciones</span>
      </div>
      <div id="bizRows">
        ${businesses.length === 0 ? `
          <div class="iva-dash-empty">
            <div class="iva-dash-empty-icon">🏪</div>
            <div>No hay negocios todavía</div>
            <div style="margin-top:1rem"><button class="iva-dash-new-btn" onclick="window.location.href='/admin/new'" style="margin:0 auto">+ Crear primer negocio</button></div>
          </div>
        ` : businesses.map(b => `
          <div class="iva-dash-row" data-name="${(b.name||'').toLowerCase()}">
            <div>
              <div class="iva-dash-biz-name">${b.name || 'Sin nombre'}</div>
              <div class="iva-dash-biz-slug">ivamarai.com/${b.slug}</div>
            </div>
            <div class="iva-dash-biz-type">${b.headline || 'Negocio local'}</div>
            <div>
              <span class="iva-dash-status ${b.status === 'cerrado' ? 'closed' : b.status === 'vacaciones' ? 'vacation' : 'open'}">
                ${b.status === 'cerrado' ? '🔴 Cerrado' : b.status === 'vacaciones' ? '🌴 Vacaciones' : '🟢 Abierto'}
              </span>
            </div>
            <div class="iva-dash-biz-slug">/${b.slug}</div>
            <div class="iva-dash-actions">
              <button class="iva-dash-action-btn iva-dash-action-edit" onclick="window.location.href='/admin/edit/${b.slug}'">✏️ Editar</button>
              <button class="iva-dash-action-btn iva-dash-action-view" onclick="window.open('/${b.slug}','_blank')">👁 Ver</button>
              <button class="iva-dash-action-btn iva-dash-action-del" onclick="deleteBiz('${b.slug}','${b.name}')">🗑</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
</div>

<script>
function filterRows() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  document.querySelectorAll('.iva-dash-row').forEach(row => {
    const name = row.dataset.name || '';
    row.style.display = name.includes(q) ? '' : 'none';
  });
}

function deleteBiz(slug, name) {
  if (!confirm('¿Seguro que quieres eliminar "' + name + '"? Esta acción no se puede deshacer.')) return;
  fetch('/admin/delete/' + slug, { method: 'POST' })
    .then(r => r.json())
    .then(data => {
      if (data.ok) window.location.reload();
      else alert('Error eliminando el negocio');
    });
}
</script>
  `;
};
