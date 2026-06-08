module.exports = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Add Your Listing — Caribex</title>
</head>
<body>
<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'DM Sans',sans-serif;background:#fff;color:#1a1a1a;}
:root{--teal:#00B4D8;--deep:#0077B6;--dark:#0D1B2A;--mid:#555;--border:#E0EEF4;}
nav{background:rgba(255,255,255,0.95);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);padding:0 2rem;display:flex;align-items:center;justify-content:space-between;height:64px;position:sticky;top:0;z-index:100;}
.nav-logo{display:flex;align-items:center;gap:0.6rem;text-decoration:none;}
.nav-logo img{height:32px;}
.nav-logo-text{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;color:var(--dark);}
.nav-logo-text span{color:var(--teal);}
.nav-back{font-size:0.82rem;color:var(--mid);text-decoration:none;}
.nav-back:hover{color:var(--teal);}
.hero{background:var(--dark);padding:5rem 2rem;text-align:center;}
.hero h1{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;color:#fff;margin-bottom:1rem;}
.hero p{font-size:0.95rem;color:rgba(255,255,255,0.6);max-width:600px;margin:0 auto;}
.form-wrap{max-width:700px;margin:0 auto;padding:5rem 2rem;}
.form-group{margin-bottom:1.5rem;}
label{display:block;font-size:0.78rem;font-weight:700;color:var(--dark);margin-bottom:0.5rem;letter-spacing:0.05em;text-transform:uppercase;}
input,select,textarea{width:100%;padding:0.85rem 1rem;border:1px solid var(--border);border-radius:8px;font-size:0.92rem;font-family:'DM Sans',sans-serif;color:var(--dark);background:#fff;transition:border 0.2s;outline:none;}
input:focus,select:focus,textarea:focus{border-color:var(--teal);}
textarea{resize:vertical;min-height:120px;}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}
.form-section{margin-bottom:2.5rem;}
.form-section-title{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:700;color:var(--dark);margin-bottom:1.5rem;padding-bottom:0.5rem;border-bottom:2px solid var(--border);}
.terms-check{display:flex;align-items:flex-start;gap:0.8rem;background:#F0F8FF;padding:1.2rem;border-radius:10px;border:1px solid var(--border);margin-bottom:2rem;}
.terms-check input[type=checkbox]{width:18px;height:18px;flex-shrink:0;margin-top:2px;accent-color:var(--teal);}
.terms-check label{font-size:0.82rem;color:var(--mid);line-height:1.6;text-transform:none;letter-spacing:0;font-weight:400;}
.terms-check a{color:var(--teal);text-decoration:none;}
.btn-submit{width:100%;padding:1rem;background:var(--teal);color:#fff;border:none;border-radius:8px;font-size:1rem;font-weight:700;cursor:pointer;transition:all 0.2s;font-family:'DM Sans',sans-serif;}
.btn-submit:hover{background:var(--deep);}
.btn-submit:disabled{opacity:0.6;cursor:not-allowed;}
.success{display:none;text-align:center;padding:3rem 2rem;background:#F0FFF4;border-radius:16px;border:1px solid #86EFAC;}
.success h3{font-family:'Playfair Display',serif;font-size:1.5rem;color:#166534;margin-bottom:0.8rem;}
.success p{font-size:0.88rem;color:#166534;line-height:1.8;}
footer{background:var(--dark);padding:2rem;text-align:center;}
.footer-logo{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:700;color:#fff;}
.footer-logo span{color:var(--teal);}
.footer-info{font-size:0.68rem;color:rgba(255,255,255,0.3);margin-top:0.3rem;}
@media(max-width:768px){nav{padding:0 1rem;}.form-wrap{padding:3rem 1rem;}.form-row{grid-template-columns:1fr;}}
</style>

<nav>
  <a href="/caribex" class="nav-logo">
    <img src="https://blogger.googleusercontent.com/img/a/AVvXsEjpryXDEJMBPjbd8FSKV1-c8spW4EIniI5IMWd2ZVda8eF70jvonP3Yc-Xa0O6X0Mcz60oiIhE7rxYdktN7Fnvrx4MKVuUzQ2ZYHhZcDho3gr-PWL0Vk_ZfqsjT1Pasls4QT95BPUyzAH5lLbX0Pr4t1hrDaLzqmnQSdrSdTtM31aWxIEPWC1xRlpe3L1w=s272" alt="Caribex">
    <span class="nav-logo-text">Carib<span>ex</span></span>
  </a>
  <a href="/caribex/directory-terms" class="nav-back">Directory Terms</a>
</nav>

<section class="hero">
  <h1>Add Your Listing</h1>
  <p>Reach thousands of Caribbean travelers every month. Free to get started.</p>
</section>

<div class="form-wrap">
  <div id="form-container">
    <div class="form-section">
      <div class="form-section-title">Business Information</div>
      <div class="form-group">
        <label>Business Name *</label>
        <input type="text" id="biz-name" placeholder="e.g. Paradise Tours Jamaica" required>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Category *</label>
          <select id="biz-category">
            <option value="">Select category</option>
            <option value="hotels">🏨 Where to Stay</option>
            <option value="tours">🧭 Tours & Experiences</option>
            <option value="transport">🚗 Transportation</option>
            <option value="restaurants">🍽️ Where to Eat</option>
          </select>
        </div>
        <div class="form-group">
          <label>Destination *</label>
          <select id="biz-destination">
            <option value="">Select destination</option>
            <option value="puerto-rico">Puerto Rico</option>
            <option value="dominican-republic">Dominican Republic</option>
            <option value="cuba">Cuba</option>
            <option value="jamaica">Jamaica</option>
            <option value="grand-cayman">Grand Cayman</option>
            <option value="barbados">Barbados</option>
            <option value="santa-lucia">Saint Lucia</option>
            <option value="trinidad-tobago">Trinidad & Tobago</option>
            <option value="sint-maarten">Sint Maarten</option>
            <option value="martinique">Martinique</option>
            <option value="guadeloupe">Guadeloupe</option>
            <option value="st-barths">St. Barths</option>
            <option value="grenada">Grenada</option>
            <option value="antigua">Antigua</option>
            <option value="dominica">Dominica</option>
            <option value="st-kitts-nevis">St. Kitts & Nevis</option>
            <option value="aruba">Aruba</option>
            <option value="curacao">Curaçao</option>
            <option value="bonaire">Bonaire</option>
            <option value="usvi">US Virgin Islands</option>
            <option value="bvi">British Virgin Islands</option>
            <option value="turks-caicos">Turks & Caicos</option>
            <option value="bahamas">Bahamas</option>
            <option value="tulum">Tulum</option>
            <option value="cartagena">Cartagena</option>
            <option value="san-andres">San Andrés</option>
            <option value="costa-rica">Costa Rica</option>
            <option value="belize">Belize</option>
            <option value="panama">Panama</option>
            <option value="roatan">Roatán</option>
            <option value="venezuela">Venezuela</option>
            <option value="corn-islands">Corn Islands</option>
            <option value="haiti">Haiti</option>
            <option value="vieques-culebra">Vieques & Culebra</option>
            <option value="guatemala-caribbean">Guatemala Caribbean</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label>Short Description * (max 160 characters)</label>
        <input type="text" id="biz-desc" placeholder="e.g. Authentic Rastafari cultural tour through the Blue Mountains" maxlength="160">
      </div>
      <div class="form-group">
        <label>Full Description *</label>
        <textarea id="biz-full-desc" placeholder="Tell travelers what makes your business special. What do you offer? What's the experience like?"></textarea>
      </div>
    </div>

    <div class="form-section">
      <div class="form-section-title">Contact & Media</div>
      <div class="form-row">
        <div class="form-group">
          <label>Contact Email *</label>
          <input type="email" id="biz-email" placeholder="your@email.com">
        </div>
        <div class="form-group">
          <label>WhatsApp Number</label>
          <input type="text" id="biz-whatsapp" placeholder="+1 876 000 0000">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Website</label>
          <input type="url" id="biz-website" placeholder="https://yourbusiness.com">
        </div>
        <div class="form-group">
          <label>Business Photo *</label>
          <div id="photo-upload-area" style="border:2px dashed var(--border);border-radius:8px;padding:2rem;text-align:center;cursor:pointer;transition:all 0.2s;" onclick="document.getElementById('photo-file').click()">
            <div id="photo-preview" style="display:none;margin-bottom:1rem;">
              <img id="preview-img" style="max-width:100%;max-height:200px;border-radius:8px;object-fit:cover;">
            </div>
            <div id="photo-placeholder">
              <div style="font-size:2rem;margin-bottom:0.5rem;">📷</div>
              <div style="font-size:0.88rem;color:var(--mid);font-weight:600;">Tap to upload a photo</div>
              <div style="font-size:0.75rem;color:#aaa;margin-top:0.3rem;">JPG, PNG — max 5MB</div>
            </div>
          </div>
          <input type="file" id="photo-file" accept="image/*" style="display:none" onchange="handlePhotoUpload(this)">
          <input type="hidden" id="biz-photo" value="">
          <div id="upload-status" style="font-size:0.78rem;margin-top:0.5rem;"></div>
        </div>
      </div>
      <div class="form-group">
        <label>Price Range</label>
        <select id="biz-price">
          <option value="">Select price range</option>
          <option value="$">$ — Budget friendly</option>
          <option value="$$">$$ — Mid range</option>
          <option value="$$$">$$$ — Premium</option>
          <option value="$$$$">$$$$ — Luxury</option>
        </select>
      </div>
    </div>

    <div class="terms-check">
      <input type="checkbox" id="terms-agree">
      <label for="terms-agree">I have read and agree to the <a href="/caribex/directory-terms" target="_blank">Caribex Directory Terms & Guidelines</a>. I understand that Caribex is not responsible for any accidents, injuries, or situations arising from the use of my service. I confirm that all information provided is accurate.</label>
    </div>

    <button class="btn-submit" id="submit-btn" onclick="submitListing()">Submit for Review →</button>
  </div>

  <div class="success" id="success-msg">
    <div style="font-size:3rem;margin-bottom:1rem;">🌴</div>
    <h3>Submission Received!</h3>
    <p>Thank you for listing your business on Caribex. We'll review your submission and get back to you within 1–3 business days.</p>
    <p style="margin-top:1rem;">Questions? Contact us at <strong>connect@ivamarai.com</strong></p>
  </div>
</div>

<footer>
  <div class="footer-logo">Carib<span>ex</span></div>
  <div class="footer-info">© 2026 Caribex — Your Caribbean Expert · A project by Ivamar AI LLC</div>
</footer>

<script>
async function handlePhotoUpload(input) {
  const file = input.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) {
    alert('Photo must be under 5MB');
    return;
  }
  
  const status = document.getElementById('upload-status');
  const area = document.getElementById('photo-upload-area');
  status.textContent = '⏳ Uploading photo...';
  status.style.color = 'var(--teal)';
  area.style.borderColor = 'var(--teal)';
  
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
        status.textContent = '✅ Photo uploaded successfully';
        status.style.color = 'green';
      } else {
        status.textContent = '❌ Upload failed. Please try again.';
        status.style.color = 'red';
        area.style.borderColor = 'red';
      }
    } catch(e) {
      status.textContent = '❌ Connection error. Please try again.';
      status.style.color = 'red';
    }
  };
  reader.readAsDataURL(file);
}

async function submitListing() {
  const name = document.getElementById('biz-name').value.trim();
  const category = document.getElementById('biz-category').value;
  const destination = document.getElementById('biz-destination').value;
  const desc = document.getElementById('biz-desc').value.trim();
  const fullDesc = document.getElementById('biz-full-desc').value.trim();
  const email = document.getElementById('biz-email').value.trim();
  const whatsapp = document.getElementById('biz-whatsapp').value.trim();
  const website = document.getElementById('biz-website').value.trim();
  const photo = document.getElementById('biz-photo').value.trim();
  const price = document.getElementById('biz-price').value;
  const agreed = document.getElementById('terms-agree').checked;

  if (!name || !category || !destination || !desc || !fullDesc || !email || !photo) {
    alert('Please fill in all required fields including a photo.');
    return;
  }
  if (!agreed) {
    alert('Please agree to the Directory Terms before submitting.');
    return;
  }

  const btn = document.getElementById('submit-btn');
  btn.disabled = true;
  btn.textContent = 'Submitting...';

  try {
    const res = await fetch('/api/listing-submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, category, destination, desc, fullDesc, email, whatsapp, website, photo, price })
    });
    const data = await res.json();
    if (data.ok) {
      document.getElementById('form-container').style.display = 'none';
      document.getElementById('success-msg').style.display = 'block';
    } else {
      alert('Something went wrong. Please try again.');
      btn.disabled = false;
      btn.textContent = 'Submit for Review →';
    }
  } catch(e) {
    alert('Connection error. Please try again.');
    btn.disabled = false;
    btn.textContent = 'Submit for Review →';
  }
}
</script>
</body>
</html>
`;
