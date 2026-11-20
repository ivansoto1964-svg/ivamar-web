'use strict';

const base = '/crea-tu-menu';
const email = 'masboricuaqueunmofongo@gmail.com';
const spanishExamples = [
  {key:'comida', label:'Comida', type:'Menú digital', name:'El Fogoncito', area:'Ponce, Puerto Rico',
    intro:'Criollo, recién hecho y listo para recoger.', action:'Simular pedido',
    rows:[['Mofongo con pollo','$12'],['Tostones con ajo','$4']], note:'Especial de hoy · Mofongo con pollo',
    tools:'Menú con precios, pedidos para recoger por WhatsApp, especiales, cupones QR y control de cocina.',
    cta:'Comenzar con tu menú', contact:'Menú digital'},
  {key:'tienda', label:'Tienda', type:'Catálogo', name:'Tienda Isla Clara', area:'Arecibo, Puerto Rico',
    intro:'Velas y jabones hechos a mano.', action:'Simular consulta',
    rows:[['Vela de coco','$16'],['Jabón de avena','$7']], note:'Consulta inventario por WhatsApp',
    tools:'Un catálogo para mostrar productos, precios y fotos, con un enlace para que te pregunten por disponibilidad.',
    cta:'Me interesa un catálogo', contact:'Catálogo para mi tienda'},
  {key:'servicios', label:'Servicios', type:'Página de servicios', name:'Mecánica al Paso', area:'Hatillo y pueblos cercanos',
    intro:'Mecánica a domicilio por cita.', action:'Simular cotización',
    rows:[['Diagnóstico a domicilio','Por cita'],['Cambio de batería','Cotización']], note:'Atención a domicilio · Coordina por WhatsApp',
    tools:'Una página para explicar qué haces, qué pueblos cubres y cómo pedirte una cotización.',
    cta:'Me interesa una página de servicios', contact:'Página para mi negocio de servicios'}
];

const englishExamples = [
  {label:'Food', type:'Digital menu', area:'Ponce, Puerto Rico',
    intro:'Fresh Puerto Rican food, ready for pickup.', action:'Try a sample order',
    rows:[['Mofongo with chicken','$12'],['Garlic tostones','$4']], note:'Today’s special · Mofongo with chicken',
    tools:'A menu with prices, WhatsApp pickup orders, specials, QR coupons, and kitchen controls.',
    cta:'Start your menu', contact:'Digital menu'},
  {label:'Shop', type:'Product catalog', area:'Arecibo, Puerto Rico',
    intro:'Handmade candles and soaps.', action:'Try a sample inquiry',
    rows:[['Coconut candle','$16'],['Oatmeal soap','$7']], note:'Check availability on WhatsApp',
    tools:'Show your products, prices, and photos, and give customers a direct way to ask what’s in stock.',
    cta:'I’m interested in a catalog', contact:'Catalog for my shop'},
  {label:'Services', type:'Service page', area:'Hatillo and nearby towns',
    intro:'Mobile mechanic by appointment.', action:'Try a sample quote request',
    rows:[['On-site diagnostics','By appointment'],['Battery replacement','Ask for a quote']], note:'Mobile service · Book through WhatsApp',
    tools:'Explain what you do, which towns you cover, and how customers can request a quote.',
    cta:'I’m interested in a service page', contact:'Page for my service business'}
];

function renderBusinessLanding({language = 'es', preview = false, businessPath = base} = {}) {
  const english = language === 'en';
  const t = (es, en) => english ? en : es;
  const examples = english ? spanishExamples.map((example,i)=>({...example,...englishExamples[i]})) : spanishExamples;
  const interest = example => 'mailto:' + email + '?subject=' + encodeURIComponent(t('Me interesa', 'Interested in') + ' · ' + example.contact) +
    '&body=' + encodeURIComponent(t(
      'Saludos, Planeta Boricua. Me interesa esta opción para mi negocio.\n\nNombre del negocio:\nPueblo o ciudad:\nQué vendo u ofrezco:\n',
      'Hi, Planeta Boricua. I’m interested in this option for my business.\n\nBusiness name:\nTown or city:\nWhat I sell or offer:\n'
    ));
  const menuAction = base + '/acceso';
  const canonical = 'https://www.masboricuaqueunmofongo.com' + (businessPath === base ? '/tu-negocio' : businessPath) + (english ? '/en' : '');
  const socialCover = 'https://www.masboricuaqueunmofongo.com/img/pb-business/tu-negocio-emprendedora-social-20261120.jpg';
  const shareTitle = t('Tu negocio, con su propia web en PB', 'Your business, with its own website on PB');
  const shareDescription = t('Una mini web para comida, tiendas y servicios. Muestra lo que ofreces y facilita el contacto por WhatsApp, en Puerto Rico y Florida.', 'A mini website for food businesses, shops and services. Show what you offer and make it easy to contact you on WhatsApp, in Puerto Rico and Florida.');
  const shareAlt = t('Ejemplo ilustrativo de una emprendedora mostrando la mini web de su negocio en Planeta Boricua.', 'Illustrative example of an entrepreneur showing her business mini website on Planeta Boricua.');
  return `<!doctype html>
<html lang="${english ? 'en' : 'es'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${t("Tu negocio en PB", "Your business on PB")} | Planeta Boricua</title>
<meta name="description" content="${t("Una mini web para tu menú, tienda o negocio de servicios. Muestra lo que haces y conecta con tus clientes por WhatsApp.", "A mini website for your menu, shop, or service business. Show what you offer and connect with customers on WhatsApp.")}">
<meta name="robots" content="noindex">
<meta name="theme-color" content="#172548">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Planeta Boricua">
<meta property="og:locale" content="${english ? 'en_US' : 'es_PR'}">
<meta property="og:url" content="${canonical}">
<meta property="og:title" content="${shareTitle}">
<meta property="og:description" content="${shareDescription}">
<meta property="og:image" content="${socialCover}">
<meta property="og:image:secure_url" content="${socialCover}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${shareAlt}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${shareTitle}">
<meta name="twitter:description" content="${shareDescription}">
<meta name="twitter:image" content="${socialCover}">
<meta name="twitter:image:alt" content="${shareAlt}">
<link rel="stylesheet" href="/css/pb-business-landing.css?v=3">
<script src="/js/pb-business-landing.js" defer></script>
</head>
<body>
<header class="top wrap">
  <a class="brand" href="https://www.masboricuaqueunmofongo.com/"><img width="42" height="42" src="/pbn-logo.webp" alt=""><span>Planeta Boricua</span></a>
  <a class="top-link" href="#como-funciona">${t("Cómo funciona", "How it works")}</a>
  <a class="top-link" href="${english ? businessPath : businessPath + '/en'}" lang="${english ? 'es' : 'en'}">${t('English', 'Español')}</a>
</header>
<main>
  <section class="hero" aria-labelledby="title">
    <div class="wrap hero-inner">
      <div class="hero-copy">
        <p class="eyebrow">${t("Tu negocio en PB", "Your business on PB")}</p>
        <h1 id="title">${t("Una página para tu negocio.", "A page for your business.")}</h1>
        <p class="lead">${t("Muestra lo que vendes, lo que cocinas o el servicio que ofreces. Dale a tus clientes una forma sencilla de contactarte por WhatsApp.", "Show what you sell, what you cook, or the services you offer. Give customers an easy way to reach you on WhatsApp.")}</p>
        <div class="actions"><a class="button primary" href="#tipos">${t("Escoge tu tipo de negocio", "Choose your business type")}</a><a class="button outline" href="#demo">${t("Ver ejemplos", "View examples")}</a></div>
      </div>
      <div class="hero-visual business-photos">
        ${examples.map(x=>`<figure><img src="/img/pb-business/${x.key==='comida'?'food':x.key}.webp" width="360" height="420" alt=""><figcaption>${x.label}</figcaption></figure>`).join('')}
      </div>
    </div>
  </section>

  <section class="wrap section business-types" id="tipos" aria-labelledby="types-title">
    <h2 id="types-title">${t("¿Qué ofrece tu negocio?", "What does your business offer?")}</h2>
    <div class="type-grid">
      <article><h3>${t("Servicios", "Services")}</h3><p>${t("Explica qué haces, qué zona cubres y cómo pedir una cita por WhatsApp.", "Explain what you do, where you work, and how to request a WhatsApp appointment.")}</p><a class="button primary" href="${menuAction}?tipo=servicios">${t("Crear página de servicios", "Create a service page")}</a></article>
      <article><h3>${t("Tienda", "Shop")}</h3><p>${t("Conoce el ejemplo de catálogo y escríbenos para consultar opciones para tu tienda.", "See a sample catalog and get in touch about options for your shop.")}</p><a class="button primary" href="${interest(examples[1])}">${t("Consultar sobre catálogo", "Ask about a catalog")}</a></article>
      <article><h3>${t("Comida", "Food")}</h3><p>${t("Arma tu menú con platos y precios para recibir pedidos por WhatsApp.", "Set up your menu with dishes and prices for WhatsApp orders.")}</p><a class="button primary" href="${menuAction}">${t("Crear menú", "Create a menu")}</a></article>
    </div>
    <p class="section-intro">${preview ? t("En esta demo puedes abrir los editores de prueba.", "In this demo you can open the test editors.") : t("Para empezar en Comida o Servicios, solicita un enlace de acceso con tu correo. Puedes guardar un borrador y revisar cómo se ve.", "To get started with Food or Services, request a sign-in link by email. You can save a draft and see how it looks.")}</p>
  </section>

  <section class="wrap section" id="demo" aria-labelledby="demo-title">
    <p class="eyebrow blue">${t("Demo interactiva", "Interactive demo")}</p>
    <h2 id="demo-title">${t("Míralo como lo vería tu cliente.", "See it the way your customers will.")}</h2>
    <p class="section-intro">${t("Escoge un negocio ficticio y prueba el botón de contacto. Las acciones se simulan aquí mismo.", "Pick a sample business and try its contact button. All actions are simulated on this page.")}</p>
    <div class="demos">
    ${examples.map((x,i)=>`
    <details class="demo">
      <summary><span>${x.label}</span></summary>
      <div class="demo-content">
        <article class="phone" aria-label="${t('Ejemplo de', 'Example of')} ${x.label.toLowerCase()}">
          <img src="/img/pb-business/${x.key==='comida'?'food':x.key}.webp" width="720" height="420" alt="" loading="lazy">
          <div class="phone-body">
            <p class="demo-type">${x.type} · Demo</p>
            <h3>${x.name}</h3><p class="location">${x.area}</p><p>${x.intro}</p>
            <ul>${x.rows.map(([name,price])=>`<li><span>${name}</span><strong>${price}</strong></li>`).join('')}</ul>
            <p class="special">${x.note}</p>
            <button class="button demo-action" type="button" data-preview="${x.key}" aria-controls="demo-${x.key}" aria-expanded="false">${x.action}</button>
            <p class="message" id="demo-${x.key}" role="status" hidden></p>
          </div>
        </article>
        <div class="use-case"><h3>${x.type} ${t('para tu negocio', 'for your business')}</h3><p>${x.tools}</p>
          <a class="text-link" href="${i===0?menuAction:x.key==='servicios' ? menuAction+'?tipo=servicios' : interest(x)}">${x.key==='servicios' ? t('Comenzar con tu página de servicios','Start your service page') : x.cta} <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </details>`).join('')}
    </div>
  </section>

  <section class="band" id="como-funciona"><div class="wrap section">
    <h2>${t("Cómo empezar", "How to get started")}</h2>
    <ol class="steps">
      <li><h3>${t("Escoge tu tipo de negocio", "Choose your business type")}</h3><p>${t("En Comida y Servicios puedes entrar con tu correo. Para Tiendas, escríbenos desde la opción de catálogo.", "For Food and Services, sign in by email. For Shops, use the catalog contact option.")}</p></li>
      <li><h3>${t("Añade tu información", "Add your information")}</h3><p>${t("En Comida y Servicios puedes añadir el nombre de tu negocio, lo que ofreces, tu WhatsApp y tus redes sociales.", "Food and service businesses can add their name, what they offer, their WhatsApp number, and their social links.")}</p></li>
      <li><h3>${t("Revisa tu página", "Preview your page")}</h3><p>${t("Guarda tu borrador y revisa cómo se ve desde el celular.", "Save your draft and check how it looks on your phone.")}</p></li>
    </ol>
  </div></section>
</main>
<footer class="wrap bottom"><a href="https://www.masboricuaqueunmofongo.com/">Planeta Boricua</a><span>Más Boricua Que Un Mofongo</span><a href="mailto:${email}">${t("Escríbenos", "Get in touch")}</a></footer>
</body>
</html>`;
}

module.exports = renderBusinessLanding;
