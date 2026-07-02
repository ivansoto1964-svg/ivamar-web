const fs = require('fs');
let code = fs.readFileSync('src/views/planetaboricua.js', 'utf8');

const oldBlock = `<!-- BLOQUE AFILIADOS VIAJES -->
<section style="background:linear-gradient(135deg,var(--blue),#001a4d);padding:2rem 0;">
  <div style="max-width:1200px;margin:0 auto;padding:0 2rem;text-align:center;">
    <div style="font-size:0.65rem;font-weight:800;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:0.6rem;">¿Planificando un viaje?</div>
    <h3 style="font-family:'Playfair Display',serif;font-size:clamp(1.3rem,2.5vw,1.8rem);font-weight:800;color:#fff;margin-bottom:0.6rem;">Encuentra los mejores precios en hoteles y vuelos</h3>
    <p style="font-size:0.85rem;color:rgba(255,255,255,0.6);margin-bottom:1.5rem;">Compara precios en las plataformas más confiables — todo desde aquí.</p>
    <div style="display:flex;flex-wrap:wrap;gap:1rem;justify-content:center;">
      <a href="https://booking.tpo.lu/OcdV3VzY" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:0.5rem;background:#003580;color:#fff;padding:0.75rem 1.5rem;border-radius:6px;text-decoration:none;font-size:0.88rem;font-weight:700;">
        🏨 Booking.com
      </a>
      <a href="https://expedia.tpo.lu/CgKszVA3" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:0.5rem;background:#00355F;color:#fff;padding:0.75rem 1.5rem;border-radius:6px;text-decoration:none;font-size:0.88rem;font-weight:700;">
        ✈️ Expedia
      </a>
      <a href="https://trip.tpo.lu/tOQAQ2WQ" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:0.5rem;background:#1890ff;color:#fff;padding:0.75rem 1.5rem;border-radius:6px;text-decoration:none;font-size:0.88rem;font-weight:700;">
        🌍 Trip.com
      </a>
      <a href="https://agoda.tpo.lu/vv7Jhln0" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:0.5rem;background:#e0224e;color:#fff;padding:0.75rem 1.5rem;border-radius:6px;text-decoration:none;font-size:0.88rem;font-weight:700;">
        🎒 Agoda
      </a>
    </div>
    <p style="font-size:0.72rem;color:rgba(255,255,255,0.3);margin-top:1rem;">Planeta Boricua puede recibir una comisión por reservas realizadas a través de estos enlaces, sin costo adicional para ti.</p>
  </div>
</section>`;

const newBlock = `<!-- BLOQUE AFILIADOS VIAJES -->
<section style="background:linear-gradient(135deg,var(--blue),#001a4d);padding:2rem 0;">
  <div style="max-width:1200px;margin:0 auto;padding:0 2rem;text-align:center;">
    <div style="font-size:0.65rem;font-weight:800;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:0.6rem;">¿Planificando un viaje?</div>
    <h3 style="font-family:'Playfair Display',serif;font-size:clamp(1.3rem,2.5vw,1.8rem);font-weight:800;color:#fff;margin-bottom:0.6rem;">Encuentra los mejores precios en hoteles y vuelos</h3>
    <p style="font-size:0.85rem;color:rgba(255,255,255,0.6);margin-bottom:1.5rem;">Compara precios en las plataformas más confiables — todo desde aquí.</p>
    <div style="display:flex;flex-wrap:wrap;gap:1rem;justify-content:center;">
      <a href="https://trip.tpo.lu/WjNSNNdV" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:0.5rem;background:#1890ff;color:#fff;padding:0.75rem 1.5rem;border-radius:6px;text-decoration:none;font-size:0.88rem;font-weight:700;">
        🌍 Hoteles en Trip.com
      </a>
      <a href="https://kiwi.tpo.lu/2wAyEzMK" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:0.5rem;background:#e5520a;color:#fff;padding:0.75rem 1.5rem;border-radius:6px;text-decoration:none;font-size:0.88rem;font-weight:700;">
        ✈️ Vuelos en Kiwi.com
      </a>
    </div>
    <p style="font-size:0.72rem;color:rgba(255,255,255,0.3);margin-top:1rem;">Planeta Boricua puede recibir una comisión por reservas realizadas a través de estos enlaces, sin costo adicional para ti.</p>
  </div>
</section>`;

if (code.includes(oldBlock)) {
  code = code.replace(oldBlock, newBlock);
  fs.writeFileSync('src/views/planetaboricua.js', code);
  console.log('✅ Bloque de afiliados actualizado con links correctos de PB (marker 470161)');
} else {
  console.log('❌ No encontré el bloque anterior');
}
