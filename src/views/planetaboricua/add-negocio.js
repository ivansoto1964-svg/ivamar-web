// Save as: src/views/planetaboricua/add-negocio.js

module.exports = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Registrar mi artesanía — Feria Digital de Artesanías Puertorriqueñas</title>
</head>
<body>
<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'DM Sans',sans-serif;background:#fff;color:#1a1a1a;}
:root{--blue:#002D62;--red:#CE1126;--dark:#0a0a0a;--mid:#555;--border:#e5e5e0;}
nav{background:var(--blue);padding:0 2rem;display:flex;align-items:center;justify-content:space-between;height:64px;position:sticky;top:0;z-index:100;}
.nav-logo{display:flex;align-items:center;gap:0.6rem;text-decoration:none;}
.nav-logo-text{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;color:#fff;}
.nav-logo-text span{color:var(--red);}
.nav-back{font-size:0.82rem;color:rgba(255,255,255,0.7);text-decoration:none;}
.nav-back:hover{color:#fff;}
.hero{background:linear-gradient(135deg,var(--blue),var(--red));padding:5rem 2rem;text-align:center;}
.hero h1{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;color:#fff;margin-bottom:1rem;}
.hero p{font-size:0.95rem;color:rgba(255,255,255,0.8);max-width:600px;margin:0 auto;}
.form-wrap{max-width:700px;margin:0 auto;padding:5rem 2rem;}
.form-group{margin-bottom:1.5rem;}
label{display:block;font-size:0.78rem;font-weight:700;color:var(--dark);margin-bottom:0.5rem;letter-spacing:0.05em;text-transform:uppercase;}
input,select,textarea{width:100%;padding:0.85rem 1rem;border:1px solid var(--border);border-radius:8px;font-size:0.92rem;font-family:'DM Sans',sans-serif;color:var(--dark);background:#fff;transition:border 0.2s;outline:none;}
input:focus,select:focus,textarea:focus{border-color:var(--blue);}
textarea{resize:vertical;min-height:120px;}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}
.form-section{margin-bottom:2.5rem;}
.form-section-title{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:700;color:var(--dark);margin-bottom:1.5rem;padding-bottom:0.5rem;border-bottom:2px solid var(--border);}
.terms-check{display:flex;align-items:flex-start;gap:0.8rem;background:#f0f4ff;padding:1.2rem;border-radius:10px;border:1px solid var(--border);margin-bottom:2rem;}
.terms-check input[type=checkbox]{width:18px;height:18px;flex-shrink:0;margin-top:2px;accent-color:var(--blue);}
.terms-check label{font-size:0.82rem;color:var(--mid);line-height:1.6;text-transform:none;letter-spacing:0;font-weight:400;}
.terms-check a{color:var(--blue);text-decoration:none;}
.btn-submit{width:100%;padding:1rem;background:var(--blue);color:#fff;border:none;border-radius:8px;font-size:1rem;font-weight:700;cursor:pointer;transition:all 0.2s;font-family:'DM Sans',sans-serif;}
.btn-submit:hover{background:var(--red);}
.btn-submit:disabled{opacity:0.6;cursor:not-allowed;}
.success{display:none;text-align:center;padding:3rem 2rem;background:#f0fff4;border-radius:16px;border:1px solid #86efac;}
.success h3{font-family:'Playfair Display',serif;font-size:1.5rem;color:#166534;margin-bottom:0.8rem;}
.success p{font-size:0.88rem;color:#166534;line-height:1.8;}
.badge-preview{display:inline-block;background:#fff8e1;color:#b8860b;border:1px solid #f0d060;padding:0.2rem 0.6rem;border-radius:4px;font-size:0.75rem;font-weight:700;text-transform:uppercase;margin-top:0.5rem;}
footer{background:var(--blue);padding:2rem;text-align:center;}
.footer-logo{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:700;color:#fff;}
.footer-logo span{color:var(--red);}
.footer-info{font-size:0.68rem;color:rgba(255,255,255,0.4);margin-top:0.3rem;}
@media(max-width:768px){nav{padding:0 1rem;}.form-wrap{padding:3rem 1rem;}.form-row{grid-template-columns:1fr;}}
</style>

<nav>
  <a href="/" class="nav-logo">
    <span class="nav-logo-text">Planeta <span>Boricua</span></span>
  </a>
  <a href="/feria-artesanos" class="nav-back">← Ver la Feria</a>
</nav>

<section class="hero">
  <h1>🇵🇷 Únete a la Feria Digital</h1>
  <p>Presenta tu artesanía a la comunidad boricua en Puerto Rico y la diáspora. El registro es gratuito.</p>
</section>

<div class="form-wrap">
  <div id="form-container">

    <div class="form-section">
      <div class="form-section-title">Información de tu Artesanía</div>
      <div class="form-group">
        <label>Nombre del Artesano / Taller *</label>
        <input type="text" id="biz-name" placeholder="ej. Taller Manos de Borinquen" required>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Categoría *</label>
          <select id="biz-category">
            <option value="">Selecciona tipo de artesanía</option>
            <option value="tallado-madera">🪵 Tallado en Madera</option>
            <option value="joyeria">💍 Joyería Artesanal</option>
            <option value="ceramica">🏺 Cerámica / Alfarería</option>
            <option value="textiles">🧵 Textiles / Costura</option>
            <option value="pintura">🎨 Pintura / Arte</option>
            <option value="santos">🙏 Santos / Tallas Religiosas</option>
            <option value="cuero">👜 Trabajo en Cuero</option>
            <option value="vejigantes">🎭 Máscaras / Vejigantes</option>
            <option value="instrumentos">🥁 Instrumentos Musicales</option>
            <option value="reciclado">♻️ Arte con Material Reciclado</option>
            <option value="velas-jabones">🕯️ Velas / Jabones Artesanales</option>
            <option value="otro">📦 Otro</option>
          </select>
        </div>
        <div class="form-group">
          <label>Estado (USA) o Pueblo (PR) *</label>
          <select id="biz-location">
            <option value="">Selecciona ubicación</option>
            <optgroup label="🇵🇷 Puerto Rico — Municipios">
              <option value="adjuntas">Adjuntas</option>
              <option value="aguada">Aguada</option>
              <option value="aguadilla">Aguadilla</option>
              <option value="aguas-buenas">Aguas Buenas</option>
              <option value="aibonito">Aibonito</option>
              <option value="anasco">Añasco</option>
              <option value="arecibo">Arecibo</option>
              <option value="arroyo">Arroyo</option>
              <option value="barceloneta">Barceloneta</option>
              <option value="barranquitas">Barranquitas</option>
              <option value="bayamon">Bayamón</option>
              <option value="cabo-rojo">Cabo Rojo</option>
              <option value="caguas">Caguas</option>
              <option value="camuy">Camuy</option>
              <option value="canovanas">Canóvanas</option>
              <option value="carolina">Carolina</option>
              <option value="catano">Cataño</option>
              <option value="cayey">Cayey</option>
              <option value="ceiba">Ceiba</option>
              <option value="ciales">Ciales</option>
              <option value="cidra">Cidra</option>
              <option value="coamo">Coamo</option>
              <option value="comerio">Comerío</option>
              <option value="corozal">Corozal</option>
              <option value="culebra">Culebra</option>
              <option value="dorado">Dorado</option>
              <option value="fajardo">Fajardo</option>
              <option value="florida-pr">Florida (PR)</option>
              <option value="guanica">Guánica</option>
              <option value="guayama">Guayama</option>
              <option value="guayanilla">Guayanilla</option>
              <option value="guaynabo">Guaynabo</option>
              <option value="gurabo">Gurabo</option>
              <option value="hatillo">Hatillo</option>
              <option value="hormigueros">Hormigueros</option>
              <option value="humacao">Humacao</option>
              <option value="isabela">Isabela</option>
              <option value="jayuya">Jayuya</option>
              <option value="juana-diaz">Juana Díaz</option>
              <option value="juncos">Juncos</option>
              <option value="lajas">Lajas</option>
              <option value="lares">Lares</option>
              <option value="las-marias">Las Marías</option>
              <option value="las-piedras">Las Piedras</option>
              <option value="loiza">Loíza</option>
              <option value="luquillo">Luquillo</option>
              <option value="manati">Manatí</option>
              <option value="maricao">Maricao</option>
              <option value="maunabo">Maunabo</option>
              <option value="mayaguez">Mayagüez</option>
              <option value="moca">Moca</option>
              <option value="morovis">Morovis</option>
              <option value="naguabo">Naguabo</option>
              <option value="naranjito">Naranjito</option>
              <option value="orocovis">Orocovis</option>
              <option value="patillas">Patillas</option>
              <option value="penuelas">Peñuelas</option>
              <option value="ponce">Ponce</option>
              <option value="quebradillas">Quebradillas</option>
              <option value="rincon">Rincón</option>
              <option value="rio-grande">Río Grande</option>
              <option value="sabana-grande">Sabana Grande</option>
              <option value="salinas">Salinas</option>
              <option value="san-german">San Germán</option>
              <option value="san-juan">San Juan</option>
              <option value="san-lorenzo">San Lorenzo</option>
              <option value="san-sebastian">San Sebastián</option>
              <option value="santa-isabel">Santa Isabel</option>
              <option value="toa-alta">Toa Alta</option>
              <option value="toa-baja">Toa Baja</option>
              <option value="trujillo-alto">Trujillo Alto</option>
              <option value="utuado">Utuado</option>
              <option value="vega-alta">Vega Alta</option>
              <option value="vega-baja">Vega Baja</option>
              <option value="vieques">Vieques</option>
              <option value="villalba">Villalba</option>
              <option value="yabucoa">Yabucoa</option>
              <option value="yauco">Yauco</option>
            </optgroup>
            <optgroup label="🇺🇸 Estados Unidos">
              <option value="alabama">Alabama</option>
              <option value="alaska">Alaska</option>
              <option value="arizona">Arizona</option>
              <option value="arkansas">Arkansas</option>
              <option value="california">California</option>
              <option value="colorado">Colorado</option>
              <option value="connecticut">Connecticut</option>
              <option value="delaware">Delaware</option>
              <option value="florida-us">Florida</option>
              <option value="georgia">Georgia</option>
              <option value="hawaii">Hawaii</option>
              <option value="idaho">Idaho</option>
              <option value="illinois">Illinois</option>
              <option value="indiana">Indiana</option>
              <option value="iowa">Iowa</option>
              <option value="kansas">Kansas</option>
              <option value="kentucky">Kentucky</option>
              <option value="louisiana">Louisiana</option>
              <option value="maine">Maine</option>
              <option value="maryland">Maryland</option>
              <option value="massachusetts">Massachusetts</option>
              <option value="michigan">Michigan</option>
              <option value="minnesota">Minnesota</option>
              <option value="mississippi">Mississippi</option>
              <option value="missouri">Missouri</option>
              <option value="montana">Montana</option>
              <option value="nebraska">Nebraska</option>
              <option value="nevada">Nevada</option>
              <option value="new-hampshire">New Hampshire</option>
              <option value="new-jersey">New Jersey</option>
              <option value="new-mexico">New Mexico</option>
              <option value="nueva-york">Nueva York</option>
              <option value="north-carolina">North Carolina</option>
              <option value="north-dakota">North Dakota</option>
              <option value="ohio">Ohio</option>
              <option value="oklahoma">Oklahoma</option>
              <option value="oregon">Oregon</option>
              <option value="pennsylvania">Pennsylvania</option>
              <option value="rhode-island">Rhode Island</option>
              <option value="south-carolina">South Carolina</option>
              <option value="south-dakota">South Dakota</option>
              <option value="tennessee">Tennessee</option>
              <option value="texas">Texas</option>
              <option value="utah">Utah</option>
              <option value="vermont">Vermont</option>
              <option value="virginia">Virginia</option>
              <option value="washington">Washington</option>
              <option value="west-virginia">West Virginia</option>
              <option value="wisconsin">Wisconsin</option>
              <option value="wyoming">Wyoming</option>
              <option value="washington-dc">Washington D.C.</option>
            </optgroup>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Ciudad *</label>
          <input type="text" id="biz-city" placeholder="ej. Orlando, Kissimmee, Bayamón">
        </div>
        <div class="form-group">
          <label>ZIP Code</label>
          <input type="text" id="biz-zip" placeholder="ej. 34741" maxlength="10">
        </div>
      </div>
      <div class="form-group">
        <label>Dirección</label>
        <input type="text" id="biz-address" placeholder="ej. 1234 Calle Principal, Suite 2">
      </div>
      <div class="form-group">
        <label>Descripción Corta * (máx. 160 caracteres)</label>
        <input type="text" id="biz-desc" placeholder="Describe en una oración lo que creas" maxlength="160">
      </div>
      <div class="form-group">
        <label>Descripción Completa *</label>
        <textarea id="biz-full-desc" placeholder="Cuéntanos tu historia, qué creas, qué materiales utilizas y cómo pueden comprarte o hacerte un pedido."></textarea>
      </div>
    </div>

    <div class="form-section">
      <div class="form-section-title">Contacto y Redes</div>
      <div class="form-row">
        <div class="form-group">
          <label>Email de Contacto *</label>
          <input type="email" id="biz-email" placeholder="tu@negocio.com">
        </div>
        <div class="form-group">
          <label>WhatsApp o Teléfono</label>
          <input type="text" id="biz-whatsapp" placeholder="+1 787 000 0000">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Sitio Web</label>
          <input type="url" id="biz-website" placeholder="https://tunegocio.com">
        </div>
        <div class="form-group">
          <label>Instagram</label>
          <input type="text" id="biz-instagram" placeholder="@tunegocio">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Facebook</label>
          <input type="text" id="biz-facebook" placeholder="facebook.com/tupagina">
        </div>
        <div class="form-group">
          <label>TikTok</label>
          <input type="text" id="biz-tiktok" placeholder="@tuartesania">
        </div>
      </div>
      <div class="form-group">
        <label>Etsy o Tienda Online</label>
        <input type="url" id="biz-etsy" placeholder="https://etsy.com/shop/tutienda">
      </div>
      <div class="form-group">
        <label>Logo (opcional)</label>
        <div id="logo-upload-area" style="border:2px dashed var(--border);border-radius:8px;padding:1.5rem;text-align:center;cursor:pointer;transition:all 0.2s;" onclick="document.getElementById('logo-file').click()">
          <div id="logo-preview" style="display:none;margin-bottom:1rem;">
            <img id="preview-logo" style="max-width:100%;max-height:150px;border-radius:8px;object-fit:contain;">
          </div>
          <div id="logo-placeholder">
            <div style="font-size:1.8rem;margin-bottom:0.4rem;">🏷️</div>
            <div style="font-size:0.85rem;color:var(--mid);font-weight:600;">Toca para subir tu logo</div>
            <div style="font-size:0.72rem;color:#aaa;margin-top:0.2rem;">JPG, PNG — máx. 5MB</div>
          </div>
        </div>
        <input type="file" id="logo-file" accept="image/*" style="display:none" onchange="handleLogoUpload(this)">
        <input type="hidden" id="biz-logo" value="">
        <div id="logo-upload-status" style="font-size:0.78rem;margin-top:0.5rem;"></div>
      </div>
      <div class="form-group">
        <label>Foto de tu Trabajo *</label>
        <div id="photo-upload-area" style="border:2px dashed var(--border);border-radius:8px;padding:2rem;text-align:center;cursor:pointer;transition:all 0.2s;" onclick="document.getElementById('photo-file').click()">
          <div id="photo-preview" style="display:none;margin-bottom:1rem;">
            <img id="preview-img" style="max-width:100%;max-height:200px;border-radius:8px;object-fit:cover;">
          </div>
          <div id="photo-placeholder">
            <div style="font-size:2rem;margin-bottom:0.5rem;">📷</div>
            <div style="font-size:0.88rem;color:var(--mid);font-weight:600;">Toca para subir una foto</div>
            <div style="font-size:0.75rem;color:#aaa;margin-top:0.3rem;">JPG, PNG — máx. 5MB</div>
          </div>
        </div>
        <input type="file" id="photo-file" accept="image/*" style="display:none" onchange="handlePhotoUpload(this)">
        <input type="hidden" id="biz-photo" value="">
        <div id="upload-status" style="font-size:0.78rem;margin-top:0.5rem;"></div>
      </div>
      <div class="form-group">
        <label>Rango de Precios</label>
        <select id="biz-price">
          <option value="">Selecciona rango</option>
          <option value="$">$ — Económico</option>
          <option value="$$">$$ — Precio moderado</option>
          <option value="$$$">$$$ — Premium</option>
          <option value="$$$$">$$$$ — Lujo</option>
        </select>
      </div>
    </div>

    <div style="background:#f0f4ff;border-radius:10px;padding:1.2rem;margin-bottom:2rem;border:1px solid var(--border);">
      <p style="font-size:0.85rem;color:var(--mid);line-height:1.6;">🎨 Una vez revisada y aprobada, tendrás una ficha pública dentro de la <strong>Feria Digital de Artesanías Puertorriqueñas</strong> que podrás compartir con tus clientes.</p>
    </div>

    <div class="terms-check">
      <input type="checkbox" id="terms-agree">
      <label for="terms-agree">He leído y acepto los términos del directorio de Planeta Boricua. Confirmo que toda la información proporcionada es verídica y que este es un negocio legítimo operado por o para la comunidad boricua.</label>
    </div>

    <div id="registration-error" style="display:none;background:#fff1f2;color:#9f1239;border:1px solid #fda4af;padding:1rem;border-radius:10px;margin-bottom:1rem;line-height:1.5;font-size:.86rem"></div>
    <button class="btn-submit" id="submit-btn" onclick="submitNegocio()">Enviar para Revisión 🇵🇷 →</button>
  </div>

  <div class="success" id="success-msg">
    <div style="font-size:3rem;margin-bottom:1rem;">🇵🇷</div>
    <h3>¡Wepa! Solicitud Recibida</h3>
    <p>Recibimos la información de tu negocio. Lo revisaremos en 1-3 días hábiles y te avisaremos por email cuando esté aprobado.</p>
    <p style="margin-top:1rem;">¿Preguntas? Escríbenos a <strong>masboricuaqueunmofongo@gmail.com</strong></p>
    <div style="margin-top:1.5rem;padding-top:1.5rem;border-top:1px solid #86efac;">
      <p style="font-weight:700;color:#166534;">¿Conoces a otro artesano? 🎨</p>
      <p style="margin-top:0.3rem;">Comparte la Feria Digital para que también se beneficie.</p>
      <div style="display:flex;gap:0.6rem;justify-content:center;margin-top:1rem;flex-wrap:wrap;">
        <a href="https://wa.me/?text=¡Wepa! Mira esta Feria de Artesanías gratis de Planeta Boricua para mostrar tu trabajo: https://www.masboricuaqueunmofongo.com/pb/add-negocio" target="_blank" style="background:#25D366;color:#fff;padding:0.6rem 1.2rem;border-radius:8px;text-decoration:none;font-size:0.85rem;font-weight:700;">📱 WhatsApp</a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=https://www.masboricuaqueunmofongo.com/pb/add-negocio" target="_blank" style="background:#1877F2;color:#fff;padding:0.6rem 1.2rem;border-radius:8px;text-decoration:none;font-size:0.85rem;font-weight:700;">📘 Facebook</a>
      </div>
    </div>
  </div>
</div>

<footer>
  <div class="footer-logo">Planeta <span>Boricua</span></div>
  <div class="footer-info">© 2026 Planeta Boricua · masboricuaqueunmofongo.com · Proyecto independiente de Iván Soto</div>
</footer>

<script>
async function handlePhotoUpload(input) {
  const file = input.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) {
    alert('La foto debe ser menor de 5MB');
    return;
  }
  const status = document.getElementById('upload-status');
  const area = document.getElementById('photo-upload-area');
  status.textContent = '⏳ Subiendo foto...';
  status.style.color = 'var(--blue)';
  area.style.borderColor = 'var(--blue)';
  const reader = new FileReader();
  reader.onload = async function(e) {
    try {
      const res = await fetch('/api/upload-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: e.target.result })
      });
      const data = await res.json();
      if (data.ok) {
        document.getElementById('biz-photo').value = data.url;
        document.getElementById('preview-img').src = data.url;
        document.getElementById('photo-preview').style.display = 'block';
        document.getElementById('photo-placeholder').style.display = 'none';
        status.textContent = '✅ Foto subida exitosamente';
        status.style.color = 'green';
        if (typeof saveArtisanDraft === 'function') saveArtisanDraft();
      } else {
        status.textContent = '❌ ' + (data.error || 'Error al subir. Intenta de nuevo.');
        status.style.color = 'red';
      }
    } catch(e) {
      status.textContent = '❌ Error de conexión. Intenta de nuevo.';
      status.style.color = 'red';
    }
  };
  reader.readAsDataURL(file);
}

async function handleLogoUpload(input) {
  const file = input.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) {
    alert('El logo debe ser menor de 5MB');
    return;
  }
  const status = document.getElementById('logo-upload-status');
  const area = document.getElementById('logo-upload-area');
  status.textContent = '⏳ Subiendo logo...';
  status.style.color = 'var(--blue)';
  area.style.borderColor = 'var(--blue)';
  const reader = new FileReader();
  reader.onload = async function(e) {
    try {
      const res = await fetch('/api/upload-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: e.target.result })
      });
      const data = await res.json();
      if (data.ok) {
        document.getElementById('biz-logo').value = data.url;
        document.getElementById('preview-logo').src = data.url;
        document.getElementById('logo-preview').style.display = 'block';
        document.getElementById('logo-placeholder').style.display = 'none';
        status.textContent = '✅ Logo subido exitosamente';
        status.style.color = 'green';
        if (typeof saveArtisanDraft === 'function') saveArtisanDraft();
      } else {
        status.textContent = '❌ ' + (data.error || 'Error al subir. Intenta de nuevo.');
        status.style.color = 'red';
      }
    } catch(e) {
      status.textContent = '❌ Error de conexión. Intenta de nuevo.';
      status.style.color = 'red';
    }
  };
  reader.readAsDataURL(file);
}

const PB_ARTISAN_DRAFT_V1='pbArtisanRegistrationDraftV1';
const draftIds=['biz-name','biz-category','biz-location','biz-city','biz-zip','biz-address','biz-desc','biz-full-desc','biz-email','biz-whatsapp','biz-website','biz-instagram','biz-facebook','biz-tiktok','biz-etsy','biz-logo','biz-photo','biz-price'];
let draftTimer=null;
function saveArtisanDraft(){clearTimeout(draftTimer);draftTimer=setTimeout(()=>{const d={};draftIds.forEach(id=>{const el=document.getElementById(id);if(el)d[id]=el.value});d.terms=document.getElementById('terms-agree').checked;localStorage.setItem(PB_ARTISAN_DRAFT_V1,JSON.stringify(d));},350)}
function restoreArtisanDraft(){try{const d=JSON.parse(localStorage.getItem(PB_ARTISAN_DRAFT_V1)||'null');if(!d)return;draftIds.forEach(id=>{const el=document.getElementById(id);if(el&&d[id]!==undefined)el.value=d[id]});document.getElementById('terms-agree').checked=Boolean(d.terms);if(d['biz-photo']){document.getElementById('preview-img').src=d['biz-photo'];document.getElementById('photo-preview').style.display='block';document.getElementById('photo-placeholder').style.display='none';document.getElementById('upload-status').textContent='✅ Foto recuperada del borrador';document.getElementById('upload-status').style.color='green'}if(d['biz-logo']){document.getElementById('preview-logo').src=d['biz-logo'];document.getElementById('logo-preview').style.display='block';document.getElementById('logo-placeholder').style.display='none';document.getElementById('logo-upload-status').textContent='✅ Logo recuperado del borrador';document.getElementById('logo-upload-status').style.color='green'}}catch(_){}}
function showRegistrationError(message,fieldId){const box=document.getElementById('registration-error');box.textContent=message;box.style.display='block';if(fieldId){const el=document.getElementById(fieldId);if(el){el.focus();el.scrollIntoView({behavior:'smooth',block:'center'})}}}
function clearRegistrationError(){const box=document.getElementById('registration-error');box.style.display='none';box.textContent=''}
function validEmail(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)}

async function submitNegocio() {
  clearRegistrationError();
  const values={name:document.getElementById('biz-name').value.trim(),category:document.getElementById('biz-category').value,location:document.getElementById('biz-location').value,city:document.getElementById('biz-city').value.trim(),zip:document.getElementById('biz-zip').value.trim(),address:document.getElementById('biz-address').value.trim(),desc:document.getElementById('biz-desc').value.trim(),fullDesc:document.getElementById('biz-full-desc').value.trim(),email:document.getElementById('biz-email').value.trim(),whatsapp:document.getElementById('biz-whatsapp').value.trim(),website:document.getElementById('biz-website').value.trim(),instagram:document.getElementById('biz-instagram').value.trim(),facebook:document.getElementById('biz-facebook').value.trim(),tiktok:document.getElementById('biz-tiktok').value.trim(),etsy:document.getElementById('biz-etsy').value.trim(),logo:document.getElementById('biz-logo').value.trim(),photo:document.getElementById('biz-photo').value.trim(),price:document.getElementById('biz-price').value};
  const required=[['name','biz-name','Escribe el nombre del artesano o emprendimiento.'],['category','biz-category','Selecciona una categoría.'],['location','biz-location','Selecciona tu estado o pueblo.'],['city','biz-city','Escribe tu ciudad, pueblo o sector.'],['desc','biz-desc','Añade una descripción corta.'],['fullDesc','biz-full-desc','Cuéntanos un poco más sobre tu trabajo.'],['email','biz-email','Escribe tu email.'],['photo','photo-upload-area','Sube una foto principal de tu trabajo.']];
  for(const [key,id,msg] of required){if(!values[key]){showRegistrationError('⚠️ '+msg,id);return}}
  if(!validEmail(values.email)){showRegistrationError('⚠️ El email no parece válido. Revísalo antes de enviar.','biz-email');return}
  if(!document.getElementById('terms-agree').checked){showRegistrationError('⚠️ Debes aceptar los términos antes de enviar.','terms-agree');return}
  const btn=document.getElementById('submit-btn');btn.disabled=true;btn.textContent='Enviando… no cierres esta página';
  try{
    const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),25000);
    const res=await fetch('/api/pb-negocio-submit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(values),signal:controller.signal});clearTimeout(timeout);
    let data={};try{data=await res.json()}catch(_){throw new Error('El servidor no devolvió una respuesta válida. Intenta de nuevo.')}
    if(!res.ok||!data.ok)throw new Error(data.error||'No pudimos completar el registro. Revisa la información e intenta otra vez.');
    localStorage.removeItem(PB_ARTISAN_DRAFT_V1);document.getElementById('form-container').style.display='none';document.getElementById('success-msg').style.display='block';window.scrollTo({top:0,behavior:'smooth'});
  }catch(e){const text=e.name==='AbortError'?'La conexión tardó demasiado. Tu información quedó guardada en este teléfono; verifica tu señal e intenta otra vez.':e.message||'Error de conexión. Tu borrador quedó guardado.';showRegistrationError('❌ '+text);btn.disabled=false;btn.textContent='Enviar para Revisión 🇵🇷 →'}
}

document.addEventListener('DOMContentLoaded',()=>{restoreArtisanDraft();document.querySelectorAll('input,select,textarea').forEach(el=>{el.addEventListener('input',saveArtisanDraft);el.addEventListener('change',saveArtisanDraft)})});
</script>

</body>
</html>
`;
