const fs = require('fs');
let code = fs.readFileSync('src/views/planetaboricua.js', 'utf8');

const oldSection = `<!-- TIENDA BORICUA -->
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
</section>`;

const newSection = `<!-- TIENDA BORICUA -->
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
    <p style="font-size:0.88rem;color:var(--mid);line-height:1.7;margin:1rem 0 1.5rem;">
      Productos boricuas con orgullo 🇵🇷 — disponibles en Amazon con entrega rápida en USA y Puerto Rico.
    </p>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
      <a href="https://www.amazon.com/shop/planetaboricua/list/1W420Q1BXBM69?tag=ivansoto0f-20" target="_blank" style="text-decoration:none;background:var(--light);border:1px solid var(--border);border-radius:8px;padding:1.2rem;text-align:center;transition:all 0.2s;display:block;">
        <div style="font-size:2rem;margin-bottom:0.5rem;">👕</div>
        <div style="font-size:0.82rem;font-weight:700;color:var(--dark);">Camisetas de PR</div>
        <div style="font-size:0.7rem;color:var(--mid);margin-top:0.2rem;">226 productos</div>
      </a>
      <a href="https://www.amazon.com/shop/planetaboricua/list/2CXBDURUV9G46?tag=ivansoto0f-20" target="_blank" style="text-decoration:none;background:var(--light);border:1px solid var(--border);border-radius:8px;padding:1.2rem;text-align:center;transition:all 0.2s;display:block;">
        <div style="font-size:2rem;margin-bottom:0.5rem;">🧢</div>
        <div style="font-size:0.82rem;font-weight:700;color:var(--dark);">Gorras de PR</div>
        <div style="font-size:0.7rem;color:var(--mid);margin-top:0.2rem;">121 productos</div>
      </a>
      <a href="https://www.amazon.com/shop/planetaboricua/list/1A33AK8DLTYDO?tag=ivansoto0f-20" target="_blank" style="text-decoration:none;background:var(--light);border:1px solid var(--border);border-radius:8px;padding:1.2rem;text-align:center;transition:all 0.2s;display:block;">
        <div style="font-size:2rem;margin-bottom:0.5rem;">☕</div>
        <div style="font-size:0.82rem;font-weight:700;color:var(--dark);">Tazas y Termos</div>
        <div style="font-size:0.7rem;color:var(--mid);margin-top:0.2rem;">63 productos</div>
      </a>
      <a href="https://www.amazon.com/shop/planetaboricua/list/GVPOWIBQMA3B?tag=ivansoto0f-20" target="_blank" style="text-decoration:none;background:var(--light);border:1px solid var(--border);border-radius:8px;padding:1.2rem;text-align:center;transition:all 0.2s;display:block;">
        <div style="font-size:2rem;margin-bottom:0.5rem;">🌿</div>
        <div style="font-size:0.82rem;font-weight:700;color:var(--dark);">Cocina Criolla</div>
        <div style="font-size:0.7rem;color:var(--mid);margin-top:0.2rem;">33 productos</div>
      </a>
      <a href="https://www.amazon.com/shop/planetaboricua/list/2W7GCH9PJ1D9B?tag=ivansoto0f-20" target="_blank" style="text-decoration:none;background:var(--light);border:1px solid var(--border);border-radius:8px;padding:1.2rem;text-align:center;transition:all 0.2s;display:block;">
        <div style="font-size:2rem;margin-bottom:0.5rem;">🍬</div>
        <div style="font-size:0.82rem;font-weight:700;color:var(--dark);">Dulces de la Isla</div>
        <div style="font-size:0.7rem;color:var(--mid);margin-top:0.2rem;">46 productos</div>
      </a>
      <a href="https://www.amazon.com/shop/planetaboricua/list/3PF9YAQ8MKRCO?tag=ivansoto0f-20" target="_blank" style="text-decoration:none;background:var(--light);border:1px solid var(--border);border-radius:8px;padding:1.2rem;text-align:center;transition:all 0.2s;display:block;">
        <div style="font-size:2rem;margin-bottom:0.5rem;">🐾</div>
        <div style="font-size:0.82rem;font-weight:700;color:var(--dark);">Boricuas de 4 Patas</div>
        <div style="font-size:0.7rem;color:var(--mid);margin-top:0.2rem;">40 productos</div>
      </a>
      <a href="https://www.amazon.com/shop/planetaboricua/list/1UY29IVPZQ34Y?tag=ivansoto0f-20" target="_blank" style="text-decoration:none;background:var(--light);border:1px solid var(--border);border-radius:8px;padding:1.2rem;text-align:center;transition:all 0.2s;display:block;">
        <div style="font-size:2rem;margin-bottom:0.5rem;">💍</div>
        <div style="font-size:0.82rem;font-weight:700;color:var(--dark);">Joyería Boricua</div>
        <div style="font-size:0.7rem;color:var(--mid);margin-top:0.2rem;">20 productos</div>
      </a>
      <a href="https://www.amazon.com/shop/planetaboricua/list/1Q6CYDE5BV80P?tag=ivansoto0f-20" target="_blank" style="text-decoration:none;background:var(--light);border:1px solid var(--border);border-radius:8px;padding:1.2rem;text-align:center;transition:all 0.2s;display:block;">
        <div style="font-size:2rem;margin-bottom:0.5rem;">🚗</div>
        <div style="font-size:0.82rem;font-weight:700;color:var(--dark);">Para Tu Auto</div>
        <div style="font-size:0.7rem;color:var(--mid);margin-top:0.2rem;">87 productos</div>
      </a>
    </div>
    <div style="text-align:center;">
      <a href="https://www.amazon.com/shop/planetaboricua" target="_blank" style="display:inline-flex;align-items:center;gap:0.5rem;background:var(--red);color:#fff;padding:0.75rem 2rem;border-radius:4px;font-size:0.88rem;font-weight:700;text-decoration:none;">
        🛒 Ver Toda la Tienda Boricua en Amazon →
      </a>
    </div>
  </div>
</section>`;

if (code.includes(oldSection)) {
  code = code.replace(oldSection, newSection);
  fs.writeFileSync('src/views/planetaboricua.js', code);
  console.log('✅ Tienda Boricua actualizada con categorías y links directos');
} else {
  console.log('❌ No encontré la sección anterior');
}
