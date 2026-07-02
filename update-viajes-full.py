import re

with open('src/server.js', 'r', encoding='utf-8') as f:
    server = f.read()

# Add /api/place-photo endpoint before /:slug
endpoint = '''
// Generic place photo endpoint for Planeta Boricua viajes
app.get("/api/place-photo", async (req, res) => {
  try {
    const q = req.query.q || 'travel destination';
    const url = await getPlacePhoto(q, 600, q);
    res.json({ url: url || null });
  } catch(e) {
    res.json({ url: null });
  }
});

'''

marker = 'app.get("/autoridad-energia-criolla"'
if marker in server:
    server = server.replace(marker, endpoint + marker)
    print('✅ /api/place-photo endpoint added')
else:
    print('❌ Marker not found')

with open('src/server.js', 'w', encoding='utf-8') as f:
    f.write(server)

# Now update the viajes section in planetaboricua.js
with open('src/views/planetaboricua.js', 'r', encoding='utf-8') as f:
    pb = f.read()

old_viajes = '''<!-- VIAJES -->
<section class="viajes" id="viajes">
  <div class="viajes-inner">
    <div class="sec-divider-inner">
      <span class="sec-divider-label">Viajes & Destinos</span>
      <div style="flex:1;height:2px;background:var(--red);margin:0 1rem;"></div>
    </div>
    <div class="viajes-grid">
      <a href="https://tp.media/r?marker=470161&trs=335367&p=4114&u=https%3A%2F%2Fwww.expedia.com%2FPuerto-Rico.d602408.Destination-Travel-Guides" target="_blank" rel="noopener" class="viaje-card">
        <div class="viaje-img pr">🌴</div>
        <div class="viaje-body">
          <div class="viaje-cat">🇵🇷 Destino Principal</div>
          <div class="viaje-title">Puerto Rico — La Isla del Encanto</div>
          <div class="viaje-sub">Hoteles, vuelos y tours en PR al mejor precio. Desde $89/noche en San Juan.</div>
          <div class="viaje-cta">Buscar vuelos y hoteles →</div>
        </div>
      </a>
      <a href="https://tp.media/r?marker=470161&trs=335367&p=4114&u=https%3A%2F%2Fwww.expedia.com%2FOrlando.d178293.Destination-Travel-Guides" target="_blank" rel="noopener" class="viaje-card">
        <div class="viaje-img orlando">🎢</div>
        <div class="viaje-body">
          <div class="viaje-cat">🌴 Boricuas en Florida</div>
          <div class="viaje-title">Orlando — El destino familiar</div>
          <div class="viaje-sub">La capital boricua de Florida. Hoteles, parques y la mejor comunidad.</div>
          <div class="viaje-cta">Ver hoteles en Orlando →</div>
        </div>
      </a>
      <a href="https://tp.media/r?marker=470161&trs=335367&p=4114&u=https%3A%2F%2Fwww.expedia.com%2FNew-York-City.d178293.Destination-Travel-Guides" target="_blank" rel="noopener" class="viaje-card">
        <div class="viaje-img ny">🗽</div>
        <div class="viaje-body">
          <div class="viaje-cat">🏙️ La Gran Manzana</div>
          <div class="viaje-title">New York — El Barrio y más allá</div>
          <div class="viaje-sub">El Bronx, El Barrio, Brooklyn — la historia boricua de Nueva York.</div>
          <div class="viaje-cta">Explorar Nueva York →</div>
        </div>
      </a>
    </div>
  </div>
</section>

<!-- BLOQUE AFILIADOS VIAJES -->
<section style="background:linear-gradient(135deg,#002D62,#001a4d);padding:2rem 0;">
  <div style="max-width:1200px;margin:0 auto;padding:0 2rem;text-align:center;">
    <div style="font-size:0.65rem;font-weight:800;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:0.6rem;">Planificando un viaje?</div>
    <h3 style="font-family:\'Playfair Display\',serif;font-size:1.5rem;font-weight:800;color:#fff;margin-bottom:0.6rem;">Encuentra los mejores precios en hoteles y vuelos</h3>
    <p style="font-size:0.85rem;color:rgba(255,255,255,0.6);margin-bottom:1.5rem;">Compara precios en las plataformas mas confiables.</p>
    <div style="display:flex;flex-wrap:wrap;gap:1rem;justify-content:center;">
      <a href="https://trip.tpo.lu/WjNSNNdV" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:0.5rem;background:#1890ff;color:#fff;padding:0.75rem 1.5rem;border-radius:6px;text-decoration:none;font-size:0.88rem;font-weight:700;">Hoteles en Trip.com</a>
      <a href="https://kiwi.tpo.lu/2wAyEzMK" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:0.5rem;background:#e5520a;color:#fff;padding:0.75rem 1.5rem;border-radius:6px;text-decoration:none;font-size:0.88rem;font-weight:700;">Vuelos en Kiwi.com</a>
    </div>
    <p style="font-size:0.72rem;color:rgba(255,255,255,0.3);margin-top:1rem;">Planeta Boricua puede recibir una comision por reservas, sin costo adicional para ti.</p>
  </div>
</section>'''

new_viajes = '''<!-- VIAJES -->
<section class="viajes" id="viajes">
  <div class="viajes-inner">
    <div class="sec-divider-inner">
      <span class="sec-divider-label">Viajes & Destinos</span>
      <div style="flex:1;height:2px;background:var(--red);margin:0 1rem;"></div>
      <span style="font-size:0.72rem;color:var(--mid);">Powered by Trip.com</span>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-top:1.5rem;">

      <a href="https://us.trip.com/hotels/list?flexType=1&cityId=-1&countryId=208&destName=Puerto%20Rico&searchType=C&optionId=208&crn=1&adult=2&curr=USD&locale=es-US&SID=2209817&allianceid=1094387&utm_campaign=520530" target="_blank" rel="noopener" style="text-decoration:none;color:inherit;background:#fff;border-radius:10px;overflow:hidden;border:1px solid var(--border);display:block;">
        <div id="vimg-pr" style="height:140px;background:linear-gradient(135deg,#002D62,#CE1126);display:flex;align-items:center;justify-content:center;font-size:3rem;background-size:cover;background-position:center;">🇵🇷</div>
        <div style="padding:1rem;">
          <div style="font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem;">Destino Principal</div>
          <div style="font-size:0.9rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;">Puerto Rico</div>
          <div style="font-size:0.75rem;color:var(--mid);margin-bottom:0.5rem;">La Isla del Encanto</div>
          <div style="font-size:0.75rem;font-weight:700;color:var(--blue);">Ver hoteles →</div>
        </div>
      </a>

      <a href="https://us.trip.com/hotels/list?flexType=1&cityId=633&countryId=66&destName=Nueva%20York&searchType=CT&optionId=633&crn=1&adult=2&curr=USD&locale=es-US&SID=2209817&allianceid=1094387&utm_campaign=520530" target="_blank" rel="noopener" style="text-decoration:none;color:inherit;background:#fff;border-radius:10px;overflow:hidden;border:1px solid var(--border);display:block;">
        <div id="vimg-ny" style="height:140px;background:linear-gradient(135deg,#1a1a2e,#4a4a6e);display:flex;align-items:center;justify-content:center;font-size:3rem;background-size:cover;background-position:center;">🗽</div>
        <div style="padding:1rem;">
          <div style="font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem;">La Gran Manzana</div>
          <div style="font-size:0.9rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;">Nueva York</div>
          <div style="font-size:0.75rem;color:var(--mid);margin-bottom:0.5rem;">El Barrio, El Bronx, Brooklyn</div>
          <div style="font-size:0.75rem;font-weight:700;color:var(--blue);">Ver hoteles →</div>
        </div>
      </a>

      <a href="https://us.trip.com/hotels/list?flexType=1&cityId=1187&countryId=66&destName=Orlando&searchType=CT&optionId=1187&crn=1&adult=2&curr=USD&locale=es-US&SID=2209817&allianceid=1094387&utm_campaign=520530" target="_blank" rel="noopener" style="text-decoration:none;color:inherit;background:#fff;border-radius:10px;overflow:hidden;border:1px solid var(--border);display:block;">
        <div id="vimg-orlando" style="height:140px;background:linear-gradient(135deg,#0077b6,#00b4d8);display:flex;align-items:center;justify-content:center;font-size:3rem;background-size:cover;background-position:center;">🎢</div>
        <div style="padding:1rem;">
          <div style="font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem;">Florida</div>
          <div style="font-size:0.9rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;">Orlando</div>
          <div style="font-size:0.75rem;color:var(--mid);margin-bottom:0.5rem;">Parques y comunidad boricua</div>
          <div style="font-size:0.75rem;font-weight:700;color:var(--blue);">Ver hoteles →</div>
        </div>
      </a>

      <a href="https://us.trip.com/hotels/list?flexType=1&cityId=20436&countryId=66&destName=Miami&searchType=CT&optionId=20436&crn=1&adult=2&curr=USD&locale=es-US&SID=2209817&allianceid=1094387&utm_campaign=520530" target="_blank" rel="noopener" style="text-decoration:none;color:inherit;background:#fff;border-radius:10px;overflow:hidden;border:1px solid var(--border);display:block;">
        <div id="vimg-miami" style="height:140px;background:linear-gradient(135deg,#f77f00,#d62828);display:flex;align-items:center;justify-content:center;font-size:3rem;background-size:cover;background-position:center;">🌊</div>
        <div style="padding:1rem;">
          <div style="font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem;">Sur de Florida</div>
          <div style="font-size:0.9rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;">Miami</div>
          <div style="font-size:0.75rem;color:var(--mid);margin-bottom:0.5rem;">Playas y cultura latina</div>
          <div style="font-size:0.75rem;font-weight:700;color:var(--blue);">Ver hoteles →</div>
        </div>
      </a>

      <a href="https://us.trip.com/hotels/list?flexType=1&cityId=5677&countryId=276&destName=Punta%20Cana&searchType=CT&optionId=5677&crn=1&adult=2&curr=USD&locale=es-US&SID=2209817&allianceid=1094387&utm_campaign=520530" target="_blank" rel="noopener" style="text-decoration:none;color:inherit;background:#fff;border-radius:10px;overflow:hidden;border:1px solid var(--border);display:block;">
        <div id="vimg-puntacana" style="height:140px;background:linear-gradient(135deg,#2ec4b6,#0077b6);display:flex;align-items:center;justify-content:center;font-size:3rem;background-size:cover;background-position:center;">🇩🇴</div>
        <div style="padding:1rem;">
          <div style="font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem;">Caribe</div>
          <div style="font-size:0.9rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;">Punta Cana</div>
          <div style="font-size:0.75rem;color:var(--mid);margin-bottom:0.5rem;">Rep. Dominicana all-inclusive</div>
          <div style="font-size:0.75rem;font-weight:700;color:var(--blue);">Ver hoteles →</div>
        </div>
      </a>

      <a href="https://us.trip.com/hotels/list?flexType=1&cityId=-1&countryId=37&destName=Colombia&searchType=C&optionId=37&crn=1&adult=2&curr=USD&locale=es-US&SID=2209817&allianceid=1094387&utm_campaign=520530" target="_blank" rel="noopener" style="text-decoration:none;color:inherit;background:#fff;border-radius:10px;overflow:hidden;border:1px solid var(--border);display:block;">
        <div id="vimg-colombia" style="height:140px;background:linear-gradient(135deg,#fcbf49,#d62828);display:flex;align-items:center;justify-content:center;font-size:3rem;background-size:cover;background-position:center;">🇨🇴</div>
        <div style="padding:1rem;">
          <div style="font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem;">Sudamérica</div>
          <div style="font-size:0.9rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;">Colombia</div>
          <div style="font-size:0.75rem;color:var(--mid);margin-bottom:0.5rem;">Cartagena, Medellín, Bogotá</div>
          <div style="font-size:0.75rem;font-weight:700;color:var(--blue);">Ver hoteles →</div>
        </div>
      </a>

      <a href="https://us.trip.com/hotels/list?flexType=1&cityId=357&countryId=95&destName=Madrid&searchType=CT&optionId=357&crn=1&adult=2&curr=USD&locale=es-US&SID=2209817&allianceid=1094387&utm_campaign=520530" target="_blank" rel="noopener" style="text-decoration:none;color:inherit;background:#fff;border-radius:10px;overflow:hidden;border:1px solid var(--border);display:block;">
        <div id="vimg-madrid" style="height:140px;background:linear-gradient(135deg,#c8102e,#ffd700);display:flex;align-items:center;justify-content:center;font-size:3rem;background-size:cover;background-position:center;">🇪🇸</div>
        <div style="padding:1rem;">
          <div style="font-size:0.6rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem;">Europa</div>
          <div style="font-size:0.9rem;font-weight:700;color:var(--dark);margin-bottom:0.3rem;">Madrid</div>
          <div style="font-size:0.75rem;color:var(--mid);margin-bottom:0.5rem;">España — puerta a Europa</div>
          <div style="font-size:0.75rem;font-weight:700;color:var(--blue);">Ver hoteles →</div>
        </div>
      </a>

      <a href="https://us.trip.com/?SID=2209817&allianceid=1094387&utm_campaign=520530&locale=es-US" target="_blank" rel="noopener" style="text-decoration:none;color:inherit;background:linear-gradient(135deg,var(--blue),#001a4d);border-radius:10px;overflow:hidden;border:1px solid var(--blue);display:block;">
        <div id="vimg-generic" style="height:140px;display:flex;align-items:center;justify-content:center;font-size:3rem;background-size:cover;background-position:center;">🗺️</div>
        <div style="padding:1rem;">
          <div style="font-size:0.6rem;font-weight:800;color:rgba(255,255,255,0.6);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem;">Busca tu destino</div>
          <div style="font-size:0.9rem;font-weight:700;color:#fff;margin-bottom:0.3rem;">A donde quieres ir?</div>
          <div style="font-size:0.75rem;color:rgba(255,255,255,0.7);margin-bottom:0.5rem;">Hoteles y vuelos a cualquier destino</div>
          <div style="font-size:0.75rem;font-weight:700;color:#f5c842;">Buscar ahora →</div>
        </div>
      </a>

    </div>
  </div>
</section>

<script>
(async function loadViajesPhotos() {
  var destinations = [
    { id: 'vimg-pr', q: 'Puerto Rico beach San Juan' },
    { id: 'vimg-ny', q: 'New York City Manhattan skyline' },
    { id: 'vimg-orlando', q: 'Orlando Florida theme parks' },
    { id: 'vimg-miami', q: 'Miami Beach Florida ocean' },
    { id: 'vimg-puntacana', q: 'Punta Cana Dominican Republic beach' },
    { id: 'vimg-colombia', q: 'Cartagena Colombia colorful' },
    { id: 'vimg-madrid', q: 'Madrid Spain Gran Via' },
    { id: 'vimg-generic', q: 'couple travel adventure map' }
  ];
  for (var i = 0; i < destinations.length; i++) {
    try {
      var res = await fetch('/api/place-photo?q=' + encodeURIComponent(destinations[i].q));
      var data = await res.json();
      if (data.url) {
        var el = document.getElementById(destinations[i].id);
        if (el) {
          el.style.backgroundImage = 'url(' + data.url + ')';
          el.style.backgroundSize = 'cover';
          el.style.backgroundPosition = 'center';
          el.innerHTML = '';
        }
      }
    } catch(e) {}
  }
})();
</script>'''

if old_viajes in pb:
    pb = pb.replace(old_viajes, new_viajes)
    with open('src/views/planetaboricua.js', 'w', encoding='utf-8') as f:
        f.write(pb)
    print('✅ Viajes section updated with 8 destination cards + Google Places photos')
else:
    print('❌ Old viajes section not found exactly')
