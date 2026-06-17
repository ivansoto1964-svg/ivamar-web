// Este script construye el tema completo nuevo.
// PASO 1: pega tu tema actual completo (el que copiaste de Blogger) en el archivo "current-theme.xml" en esta misma carpeta
// PASO 2: corre: node build-new-theme.js
// PASO 3: el resultado sale en "new-theme-OUTPUT.xml" - copia TODO ese contenido y pégalo en Blogger > Tema > Editar HTML, reemplazando todo

const fs = require('fs');

let code = fs.readFileSync('current-theme.xml', 'utf8');

// 1. Add Google Fonts (Playfair Display + Damion) right after <head>
const headTag = `<title><data:view.title.escaped/></title>`;
const fontsLink = `<title><data:view.title.escaped/></title>
    <link href='https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Damion&family=Roboto:wght@300;400;700&display=swap' rel='stylesheet'/>`;
if (code.includes(headTag)) {
  code = code.replace(headTag, fontsLink);
}

// 2. Replace the Variables block (keycolor through Widths) with new boricua-themed variables
const varsStart = '<Variable name="keycolor"';
const varsEnd = '</Group>\n */';

const startIdx = code.indexOf(varsStart);
const endIdx = code.indexOf(varsEnd, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  const newVars = fs.readFileSync('new-variables.xml', 'utf8');
  code = code.substring(0, startIdx) + newVars + '\n' + code.substring(endIdx);
  console.log('✅ Variables de color/fuente actualizadas');
} else {
  console.log('❌ No encontré el bloque de variables. startIdx:', startIdx, 'endIdx:', endIdx);
}

// 3. Remove HTML2 widget (Nayeli chat, visible)
const html2Start = code.indexOf(`<b:widget id='HTML2' locked='false' title='Aqui Esta Nayeli' type='HTML' visible='true'>`);
if (html2Start !== -1) {
  const html2End = code.indexOf(`</b:widget>`, html2Start) + `</b:widget>`.length;
  code = code.substring(0, html2Start) + code.substring(html2End);
  console.log('✅ Widget HTML2 (Nayeli visible) eliminado');
} else {
  console.log('⚠ No encontré HTML2 - puede que ya esté eliminado o el texto varíe');
}

// 4. Remove HTML1 widget (Nayeli chat, hidden duplicate)
const html1Start = code.indexOf(`<b:widget id='HTML1' locked='false' title='Aqui esta Nayeli' type='HTML' visible='false'>`);
if (html1Start !== -1) {
  const html1End = code.indexOf(`</b:widget>`, html1Start) + `</b:widget>`.length;
  code = code.substring(0, html1Start) + code.substring(html1End);
  console.log('✅ Widget HTML1 (Nayeli oculto) eliminado');
} else {
  console.log('⚠ No encontré HTML1 - puede que ya esté eliminado o el texto varíe');
}

// 5. Add custom CSS for header background gradient (boricua flag colors) right before the closing of b:skin
const skinCloseMarker = `]]></b:skin>`;
const customCSS = `

/* ===== PLANETA BORICUA CUSTOM THEME ===== */
.bg-photo-container{background:linear-gradient(135deg,#002D62 0%,#CE1126 100%);height:180px;}
.bg-photo{display:none;}
.bg-photo-overlay{background:rgba(0,0,0,0.15);}
.Header h1{font-family:'Playfair Display',serif;letter-spacing:-0.01em;}
.post-title a{font-family:'Playfair Display',serif;}
.PageList .tabs li a{text-transform:none;letter-spacing:0.02em;}
.tabs .selected{border-bottom:3px solid #fff;}
#page_body .FeaturedPost,.Blog .blog-posts .post-outer-container{border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,0.06);}
.sidebar-container .widget .title{font-family:'Playfair Display',serif;font-weight:700;font-size:15px;text-transform:uppercase;letter-spacing:0.03em;}
blockquote{border-left:4px solid #CE1126;padding-left:16px;text-align:left;font-size:1.1em;}
.Attribution{font-family:'Roboto',sans-serif;}

]]></b:skin>`;

if (code.includes(skinCloseMarker)) {
  code = code.replace(skinCloseMarker, customCSS);
  console.log('✅ CSS personalizado de Planeta Boricua agregado');
} else {
  console.log('❌ No encontré el cierre de b:skin');
}

fs.writeFileSync('new-theme-OUTPUT.xml', code);
console.log('\n🇵🇷 LISTO - revisa new-theme-OUTPUT.xml');
