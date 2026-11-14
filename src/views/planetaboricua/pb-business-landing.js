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

function renderBusinessLanding({language = 'es', openMenu = false} = {}) {
  const english = language === 'en';
  const t = (es, en) => english ? en : es;
  const examples = english ? spanishExamples.map((example,i)=>({...example,...englishExamples[i]})) : spanishExamples;
  const interest = example => 'mailto:' + email + '?subject=' + encodeURIComponent(t('Me interesa', 'Interested in') + ' · ' + example.contact) +
    '&body=' + encodeURIComponent(t(
      'Saludos, Planeta Boricua. Me interesa esta opción para mi negocio.\n\nNombre del negocio:\nPueblo o ciudad:\nQué vendo u ofrezco:\n',
      'Hi, Planeta Boricua. I’m interested in this option for my business.\n\nBusiness name:\nTown or city:\nWhat I sell or offer:\n'
    ));
  const menuAction = openMenu ? base + '/acceso' : interest(examples[0]);
  return `<!doctype html>
<html lang="${english ? 'en' : 'es'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${t("Tu negocio en PB", "Your business on PB")} | Planeta Boricua</title>
<meta name="description" content="${t("Una mini web para tu menú, tienda o negocio de servicios. Muestra lo que haces y conecta con tus clientes por WhatsApp.", "A mini website for your menu, shop, or service business. Show what you offer and connect with customers on WhatsApp.")}">
<meta name="robots" content="noindex">
<meta name="theme-color" content="#172548">
<link rel="stylesheet" href="/css/pb-business-landing.css">
<script src="/js/pb-business-landing.js" defer></script>
</head>
<body>
<header class="top wrap">
  <a class="brand" href="https://www.masboricuaqueunmofongo.com/"><img width="42" height="42" src="/pbn-logo.webp" alt=""><span>Planeta Boricua</span></a>
  <a class="top-link" href="#como-funciona">${t("Cómo funciona", "How it works")}</a>
  <a class="top-link" href="${english ? base : base + '/en'}" lang="${english ? 'es' : 'en'}">${t('English', 'Español')}</a>
</header>
<main>
  <section class="hero" aria-labelledby="title">
    <div class="wrap hero-inner">
      <div class="hero-copy">
        <p class="eyebrow">${t("Tu negocio en PB", "Your business on PB")}</p>
        <h1 id="title">${t("Lo que vendes.", "What you sell.")}<br>${t("Lo que haces.", "What you do.")}<br><em>${t("En un solo enlace.", "In one link.")}</em></h1>
        <p class="lead">${t("Pon tu menú, tus productos o tus servicios en una mini web que puedas compartir en WhatsApp, en tus redes o con un QR impreso.", "Put your menu, products, or services on a mini website you can share on WhatsApp, social media, or with a printed QR code.")}</p>
        <div class="actions"><a class="button primary" href="${menuAction}">${t("Comenzar con tu menú", "Start your menu")} <span aria-hidden="true">↗</span></a><a class="button outline" href="#demo">${t("Probar la demo", "Try the demo")}</a></div>
        <p class="hero-note">${openMenu ? t('Acceso de prueba para menús. Los cobros son simulados.', 'Menu test access. Payments are simulated.') : t('Menús en piloto por invitación. El botón abre un correo para solicitar acceso.', 'The menu pilot is invite-only. Use the button to request access by email.')}</p>
      </div>
      <div class="hero-visual"><img src="/img/pb-business/food.webp" width="960" height="640" alt="${t("Entrega de una orden por la ventanilla de un food truck", "A customer receiving an order at a food truck window")}" fetchpriority="high"><span>${t("Menús · Catálogos · Servicios", "Menus · Catalogs · Services")}</span></div>
    </div>
  </section>

  <section class="wrap section" id="demo" aria-labelledby="demo-title">
    <p class="eyebrow blue">${t("Demo interactiva", "Interactive demo")}</p>
    <h2 id="demo-title">${t("Míralo como lo vería tu cliente.", "See it the way your customers will.")}</h2>
    <p class="section-intro">${t("Escoge un negocio ficticio y prueba el botón de contacto. Las acciones se simulan aquí mismo.", "Pick a sample business and try its contact button. All actions are simulated on this page.")}</p>
    <div class="demos">
    ${examples.map((x,i)=>`
    <details class="demo" ${i===0?'open':''}>
      <summary><span>${x.label}</span><small>${i===0?t('Piloto de menú','Menu pilot'):t('Vista de ejemplo','Sample preview')}</small></summary>
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
          <a class="text-link" href="${i===0?menuAction:interest(x)}">${x.cta} <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </details>`).join('')}
    </div>
  </section>

  <section class="band" id="como-funciona"><div class="wrap section">
    <p class="eyebrow blue">${t("Piloto de menús", "Menu pilot")}</p>
    <h2>${t("De tu celular a las manos de tus clientes.", "From your phone to your customers.")}</h2>
    <ol class="steps">
      <li><h3>${t("Arma tu menú", "Build your menu")}</h3><p>${t("Entra con tu correo, añade tu WhatsApp y sube una foto del menú o escribe los platos y sus precios.", "Sign in with your email, add your WhatsApp number, and upload a menu photo or list your dishes and prices.")}</p></li>
      <li><h3>${t("Míralo antes de publicar", "Preview before you publish")}</h3><p>${t("Prueba la vista previa desde el celular. Tú decides cuándo está listo.", "Check the preview from your phone. You decide when it’s ready.")}</p></li>
      <li><h3>${t("Comparte tu enlace y QR", "Share your link and QR code")}</h3><p>${t("Al publicar, descarga tu QR y úsalo en tarjetas, rótulos o mesas. El mismo QR abre el menú actualizado.", "When you publish, download your QR code for cards, signs, or tables. The same code opens your updated menu.")}</p></li>
    </ol>
  </div></section>

  <section class="wrap section features" id="incluye" aria-labelledby="features-title">
    <div><p class="eyebrow blue">${t("Qué incluye", "What’s included")}</p><h2 id="features-title">${t("Herramientas para vender a tu manera.", "Tools to sell your way.")}</h2>
    <p>${t("Tu menú también puede aparecer en ", "Your menu can also appear in ")}<strong>Dónde Comer</strong>${t(", el directorio de comida de Planeta Boricua organizado por pueblo, ciudad y estado.", ", Planeta Boricua’s dining directory organized by town, city, and state.")}</p></div>
    <dl>
      <div><dt>${t("Pedidos directos", "Direct orders")}</dt><dd>${t("Tu cliente arma el pedido y te escribe por WhatsApp. Tú confirmas el recogido y cobras directamente.", "Customers build their orders and message you on WhatsApp. You confirm pickup and get paid directly.")}</dd></div>
      <div><dt>${t("Promos que puedes compartir", "Shareable promotions")}</dt><dd>${t("Publica el especial de hoy o de la semana y ofrece descuentos con una cantidad limitada de cupones.", "Post a daily or weekly special and offer discounts with a limited number of coupons.")}</dd></div>
      <div><dt>${t("Control desde el celular", "Manage it from your phone")}</dt><dd>${t("Cierra la cocina cuando te llenes, marca platos agotados y descarga un resumen de las ventas que registres.", "Pause orders when you’re at capacity, mark dishes sold out, and download a summary of the sales you record.")}</dd></div>
      <div><dt>${t("Precio claro", "Clear pricing")}</dt><dd>${t("PB cobra por publicar y mantener tu menú. Cada venta va directo a tu negocio, con $0 de comisión de PB. Tu procesador puede tener sus propias tarifas.", "PB charges for publishing and hosting your menu. Each sale goes directly to your business, with $0 in PB commission. Your payment processor may have its own fees.")}</dd></div>
    </dl>
  </section>

  <section class="wrap section"><div class="price-box">
    <div><p class="eyebrow">${t("Precio del menú", "Menu pricing")}</p><h2>$49 <small>${t("al publicar", "when you publish")}</small></h2><p>${t("Los primeros 30 días van incluidos. Después, ", "The first 30 days are included. Then ")}<strong>${t("$9.99 al mes", "$9.99 per month")}</strong>.</p></div>
    <div><a class="button primary" href="${menuAction}">${t("Comenzar con tu menú", "Start your menu")} <span aria-hidden="true">↗</span></a>
    <p>${t("Catálogos y servicios están en etapa de demostración. Puedes escribirnos para indicar qué necesita tu negocio.", "Catalogs and service pages are available as demos. Get in touch to tell us what your business needs.")}</p></div>
  </div></section>

  <section class="wrap section questions" aria-labelledby="questions-title"><h2 id="questions-title">${t("Preguntas rápidas", "Quick questions")}</h2>
    <details><summary>${t("¿Qué me da PB además de una página de enlaces?", "What can I do beyond sharing links?")}</summary><p>${t("En el menú tienes herramientas para mostrar platos y precios, recibir pedidos, anunciar ofertas y aparecer en Dónde Comer. Puedes compartir el mismo enlace en redes, tarjetas y WhatsApp.", "Show dishes and prices, take orders, post specials, and get listed in Dónde Comer. Share the same menu link on social media, business cards, and WhatsApp.")}</p></details>
    <details><summary>${t("¿Qué pasa si ya uso una app de delivery?", "What if I already use a delivery app?")}</summary><p>${t("Puedes seguir usándola. El menú de PB te sirve como canal de recogido directo. Tu negocio confirma el pedido y el pago con el cliente.", "Keep using it. Your PB menu gives you a direct pickup channel. Your business confirms the order and payment with the customer.")}</p></details>
    <details><summary>${t("¿Puedo empezar con una tienda o un servicio?", "Can I start with a shop or service business?")}</summary><p>${t("Ya puedes probar ambos ejemplos y escribirnos. El registro por correo y la publicación pagada están preparados para el piloto de menús.", "You can try both demos and get in touch now. Email sign-up and paid publishing are set up for the menu pilot.")}</p></details>
  </section>
</main>
<footer class="wrap bottom"><a href="https://www.masboricuaqueunmofongo.com/">Planeta Boricua</a><span>Más Boricua Que Un Mofongo</span><a href="mailto:${email}">${t("Escríbenos", "Get in touch")}</a></footer>
</body>
</html>`;
}

module.exports = renderBusinessLanding;
