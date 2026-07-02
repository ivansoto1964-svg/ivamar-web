const fs = require('fs');
let code = fs.readFileSync('src/views/planetaboricua.js', 'utf8');

const marker = `<!-- VIAJES -->
<section class="viajes" id="viajes">`;

const tiendaSection = `<!-- TIENDA BORICUA -->
<section style="background:#fff;padding:2rem 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);">
  <div style="max-width:1200px;margin:0 auto;padding:0 2rem;">
    <div class="sec-divider-inner">
      <div style="display:flex;align-items:center;gap:0.6rem;">
        <span style="font-size:1.3rem;">🛍️</span>
        <span class="sec-divider-label">Tienda Boricua</span>
      </div>
      <div style="flex:1;height:2px;background:var(--red);margin:0 1rem;"></div>
      <a href="https://www.amazon.com/shop/planetaboricua" target="_blank" class="sec-divider-link">Ver toda la tienda →</a>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center;margin-top:1.5rem;">
      <div>
        <p style="font-size:0.88rem;color:var(--mid);line-height:1.7;margin-bottom:1.5rem;">
          Productos boricuas con orgullo 🇵🇷 — camisetas, tazas, accesorios y más para llevar tu cultura contigo a donde vayas. Disponible en Amazon, entrega rápida en USA y Puerto Rico.
        </p>
        <a href="https://www.amazon.com/shop/planetaboricua" target="_blank" style="display:inline-flex;align-items:center;gap:0.5rem;background:var(--red);color:#fff;padding:0.75rem 1.5rem;border-radius:4px;font-size:0.88rem;font-weight:700;text-decoration:none;">
          🛒 Ver Tienda en Amazon
        </a>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
        <div style="background:var(--light);border-radius:8px;padding:1.2rem;text-align:center;border:1px solid var(--border);">
          <div style="font-size:2rem;margin-bottom:0.5rem;">👕</div>
          <div style="font-size:0.82rem;font-weight:700;color:var(--dark);">Camisetas</div>
          <div style="font-size:0.72rem;color:var(--mid);">Orgullo boricua</div>
        </div>
        <div style="background:var(--light);border-radius:8px;padding:1.2rem;text-align:center;border:1px solid var(--border);">
          <div style="font-size:2rem;margin-bottom:0.5rem;">☕</div>
          <div style="font-size:0.82rem;font-weight:700;color:var(--dark);">Tazas</div>
          <div style="font-size:0.72rem;color:var(--mid);">Para el café boricua</div>
        </div>
        <div style="background:var(--light);border-radius:8px;padding:1.2rem;text-align:center;border:1px solid var(--border);">
          <div style="font-size:2rem;margin-bottom:0.5rem;">🎽</div>
          <div style="font-size:0.82rem;font-weight:700;color:var(--dark);">Accesorios</div>
          <div style="font-size:0.72rem;color:var(--mid);">Lleva la bandera</div>
        </div>
        <div style="background:linear-gradient(135deg,var(--blue),var(--red));border-radius:8px;padding:1.2rem;text-align:center;">
          <div style="font-size:2rem;margin-bottom:0.5rem;">🇵🇷</div>
          <div style="font-size:0.82rem;font-weight:700;color:#fff;">Y más...</div>
          <div style="font-size:0.72rem;color:rgba(255,255,255,0.7);">Ver todo en Amazon</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- VIAJES -->
<section class="viajes" id="viajes">`;

if (code.includes(marker)) {
  code = code.replace(marker, tiendaSection);
  fs.writeFileSync('src/views/planetaboricua.js', code);
  console.log('✅ Sección Tienda Boricua agregada antes de Viajes');
} else {
  console.log('❌ No encontré el marcador de Viajes');
}
