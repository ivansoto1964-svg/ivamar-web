with open('src/views/planetaboricua.js', 'r', encoding='utf-8') as f:
    code = f.read()

marker = '<!-- NEWSLETTER -->'

block = '<!-- BLOQUE AFILIADOS VIAJES -->\n<section style="background:linear-gradient(135deg,#002D62,#001a4d);padding:2rem 0;">\n  <div style="max-width:1200px;margin:0 auto;padding:0 2rem;text-align:center;">\n    <div style="font-size:0.65rem;font-weight:800;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:0.6rem;">Planificando un viaje?</div>\n    <h3 style="font-family:\'Playfair Display\',serif;font-size:1.5rem;font-weight:800;color:#fff;margin-bottom:0.6rem;">Encuentra los mejores precios en hoteles y vuelos</h3>\n    <p style="font-size:0.85rem;color:rgba(255,255,255,0.6);margin-bottom:1.5rem;">Compara precios en las plataformas mas confiables.</p>\n    <div style="display:flex;flex-wrap:wrap;gap:1rem;justify-content:center;">\n      <a href="https://trip.tpo.lu/WjNSNNdV" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:0.5rem;background:#1890ff;color:#fff;padding:0.75rem 1.5rem;border-radius:6px;text-decoration:none;font-size:0.88rem;font-weight:700;">Hoteles en Trip.com</a>\n      <a href="https://kiwi.tpo.lu/2wAyEzMK" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:0.5rem;background:#e5520a;color:#fff;padding:0.75rem 1.5rem;border-radius:6px;text-decoration:none;font-size:0.88rem;font-weight:700;">Vuelos en Kiwi.com</a>\n    </div>\n    <p style="font-size:0.72rem;color:rgba(255,255,255,0.3);margin-top:1rem;">Planeta Boricua puede recibir una comision por reservas, sin costo adicional para ti.</p>\n  </div>\n</section>\n\n<!-- NEWSLETTER -->'

if marker in code:
    code = code.replace(marker, block)
    with open('src/views/planetaboricua.js', 'w', encoding='utf-8') as f:
        f.write(code)
    print('Fixed')
else:
    print('Not found')
