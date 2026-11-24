'use strict';

const envelope = require('../data/pb-lakeland-preview.encrypted.json');
const PREVIEW_PATH = '/propuestas/lakeland-aguadilla';

function renderPreview() {
  // The source HTML and password are deliberately absent from the repository.
  // A random shared review password unlocks the AES-GCM document in-browser.
  const payload = JSON.stringify(envelope).replace(/</g, '\\u003c');
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive"><meta name="referrer" content="no-referrer"><title>Propuesta privada · Planeta Boricua</title><style>
*{box-sizing:border-box}body{margin:0;background:#071d35;color:white;font:17px/1.6 system-ui,sans-serif}main{width:min(540px,calc(100% - 40px));margin:10vh auto;padding:30px;border:1px solid #4b6882;border-radius:16px;background:#102b45}h1{font-size:2.4rem;line-height:1.1;letter-spacing:-.04em;margin:15px 0 25px}.eyebrow{font-size:.8rem;letter-spacing:.15em;font-weight:800;color:#a4d5eb}p{color:#d0dfeb}label{display:block;font-weight:700}input{width:100%;margin:10px 0;padding:14px;border:1px solid #b7cbd9;border-radius:6px;font:inherit}button{background:#e63343;color:white;padding:14px 20px;border:0;border-radius:6px;font:inherit;font-weight:800;cursor:pointer}button:focus-visible,input:focus-visible{outline:3px solid #f7cb55;outline-offset:3px}button:disabled{opacity:.6}#error{color:#ffd6d9;min-height:30px;font-size:.9rem}.small{font-size:.85rem}#bar{display:flex;justify-content:space-between;align-items:center;gap:15px;padding:8px 18px;background:#071d35;font-size:.85rem}#bar button{padding:7px 12px;font-size:.85rem}iframe{display:block;width:100%;height:calc(100dvh - 57px);border:0;background:white}[hidden]{display:none!important}
</style></head><body><main id="gate"><div class="eyebrow">PLANETA BORICUA · PRIVATE PREVIEW</div><h1>From Lakeland<br>to Aguadilla.</h1><p>Vista de presentación para posibles participantes.<br>Private concept preview for prospective partners.</p><form id="unlock"><label for="password">Clave de acceso / Access password</label><input id="password" type="password" autocomplete="off" autocapitalize="off" spellcheck="false" required maxlength="200"><button id="open" type="submit">Ver propuesta / View preview</button><p id="error" role="status" aria-live="polite"></p></form><p class="small">Esta muestra no confirma auspicios ni participación. Las fotos finales de hoteles serán suministradas y autorizadas por los participantes.</p></main><div id="review" hidden><div id="bar"><span>PB · Propuesta privada / Private preview</span><button id="lock" type="button">Cerrar / Lock</button></div><iframe id="preview" title="From Lakeland to Aguadilla — propuesta bilingüe" sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"></iframe></div>
<script>
const envelope=${payload};
const bytes=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
const input=document.getElementById('password'),error=document.getElementById('error'),open=document.getElementById('open'),frame=document.getElementById('preview');
document.getElementById('unlock').addEventListener('submit',async e=>{e.preventDefault();open.disabled=true;error.textContent='Abriendo / Opening…';try{if(!crypto.subtle)throw new Error('unsupported');const raw=await crypto.subtle.importKey('raw',new TextEncoder().encode(input.value),'PBKDF2',false,['deriveKey']);const key=await crypto.subtle.deriveKey({name:'PBKDF2',hash:'SHA-256',salt:bytes(envelope.salt),iterations:envelope.iterations},raw,{name:'AES-GCM',length:256},false,['decrypt']);const decoded=await crypto.subtle.decrypt({name:'AES-GCM',iv:bytes(envelope.iv)},key,bytes(envelope.ciphertext));frame.srcdoc=new TextDecoder().decode(decoded);input.value='';error.textContent='';document.getElementById('gate').hidden=true;document.getElementById('review').hidden=false;}catch(err){error.textContent=err.message==='unsupported'?'Usa un navegador actualizado mediante HTTPS. / Use an updated browser over HTTPS.':'No se pudo abrir. Revisa la clave. / Unable to open. Check the password.';}finally{open.disabled=false;}});
document.getElementById('lock').addEventListener('click',()=>{frame.removeAttribute('srcdoc');document.getElementById('review').hidden=true;document.getElementById('gate').hidden=false;input.value='';input.focus();});
</script></body></html>`;
}

function servePreview(req, res) {
  res.set({
    'Cache-Control': 'private, no-store, max-age=0',
    'X-Robots-Tag': 'noindex, nofollow, noarchive',
    'Referrer-Policy': 'no-referrer',
    'Content-Security-Policy': "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; frame-src 'self' about:; connect-src 'none'; form-action 'none'; base-uri 'none'; frame-ancestors 'self'"
  });
  return res.type('html').send(renderPreview());
}

module.exports = { PREVIEW_PATH, renderPreview, servePreview };
