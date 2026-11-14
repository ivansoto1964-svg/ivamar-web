const basePath = '/crea-tu-menu';
const site = 'https://www.masboricuaqueunmofongo.com';

const copy = {
  es: {
    title: 'Crea tu menú en PB',
    headline: 'Tu food truck. Tu menú. Tus pedidos.',
    intro: 'Actualiza tu menú desde el celular y compártelo con un enlace o un QR. Tus clientes pueden armar su pedido y enviártelo por WhatsApp.',
    price: '$49 de configuración inicial',
    renewal: 'Primer mes sin mensualidad desde la publicación. Luego $9.99 al mes. Tu mensualidad sigue igual: si vendes $1,000 o más, pagas $9.99. Si vendes $10,000, pagas los mismos $9.99.',
    cta: 'Crear mi menú',
    aboutTitle: '¿Qué es Planeta Boricua?',
    about: 'Somos un portal de cultura, artesanía, gastronomía y comunidad boricua. Somos una comunidad en crecimiento en Puerto Rico y la diáspora. Comparte tus especiales con quienes buscan comida boricua en la isla y en Estados Unidos. Cuando publiques tu menú, tu negocio también aparecerá en Dónde Comer, organizado por estado o territorio y ciudad o municipio.',
    stepsTitle: 'Cómo funciona',
    steps: [
      ['Registra tu negocio', 'Entra con tu correo. Guarda el nombre del negocio, pueblo y WhatsApp.'],
      ['Arma tu menú', 'Sube una foto de tu menú o añade platos con precios para recibir pedidos.'],
      ['Publica y comparte', 'Revisa cómo se ve en el celular. Al activar tu menú, tendrás un enlace y un QR descargable para redes, mensajes o imprimir.'],
      ['Comparte tus especiales', 'Anuncia el especial de hoy o de la semana y comparte su enlace en redes o WhatsApp.'],
      ['Recibe pedidos directos', 'Tus clientes pueden escribirte por WhatsApp. Si añades platos con precios, también pueden armar el pedido en el carrito. Tú confirmas la disponibilidad, el pago y el recogido.']
    ],
    faqTitle: 'Preguntas frecuentes',
    faq: [
      ['¿Cuánto cuesta?', 'Pagas $49 una sola vez por la configuración inicial. El primer mes desde la publicación va sin mensualidad. A partir del segundo mes pagas $9.99 al mes. Tu mensualidad sigue igual: si vendes $1,000 o más, pagas $9.99. Si vendes $10,000, pagas los mismos $9.99.'],
      ['¿En qué se diferencia de DoorDash y Uber Eats?', 'Sus marketplaces permiten encontrar negocios y ordenar desde sus apps, con opciones de entrega o recogido según el servicio. PB te da un menú editable, un enlace propio y un QR para recibir pedidos directos por WhatsApp. Puedes usar ambos canales. PB no ofrece reparto.'],
      ['¿Cómo cobro los pedidos?', 'Tú eliges qué métodos aceptas, como Zelle si tu banco lo permite para tu negocio, un enlace de pago o pago al recoger. Tú confirmas el cobro.'],
      ['¿Qué pasa si cambio de ubicación?', 'Tu dirección habitual se muestra por defecto. Si vas a un evento, podrás indicar una ubicación temporal y cuándo termina. Tu enlace y tu QR siguen siendo los mismos.'],
      ['¿Tengo que imprimir un QR nuevo si cambio el menú?', 'No. El QR abre el mismo enlace y los clientes ven el menú actualizado.']
    ]
  },
  en: {
    title: 'Create your menu on PB',
    headline: 'Your food truck. Your menu. Your orders.',
    intro: 'Update your menu from your phone and share it with a link or QR code. Customers can build their order and send it to you on WhatsApp.',
    price: '$49 one-time setup',
    renewal: 'No monthly fee for the first month after publishing. Then $9.99 per month. Your monthly price stays the same: sell $1,000 or more and pay $9.99. Sell $10,000 and still pay $9.99.',
    cta: 'Create my menu',
    aboutTitle: 'What is Planeta Boricua?',
    about: 'We’re a growing Puerto Rican community on the island and across the United States. Share your specials with people looking for Puerto Rican food. When you publish your menu, your business will also appear in our Where to Eat directory, organized by state or territory and city or municipality.',
    stepsTitle: 'How it works',
    steps: [
      ['Register your business', 'Sign in by email. Save your business name, city and WhatsApp number.'],
      ['Build your menu', 'Upload a menu photo or add individual dishes with prices to take orders.'],
      ['Publish and share', 'Preview your menu on mobile. Once activated, you’ll get a link and a downloadable QR code to post, message, or print.'],
      ['Share your specials', 'Post a daily or weekly special and share its link on social media or WhatsApp.'],
      ['Get direct orders', 'Customers can message you on WhatsApp. If you add dishes with prices, they can also build an order in the cart. You confirm availability, payment, and pickup.']
    ],
    faqTitle: 'Frequently asked questions',
    faq: [
      ['How much does it cost?', 'Setup is a one-time $49 payment. There’s no monthly fee for the first month after publishing. Starting in month two, it’s $9.99 per month. Your monthly price stays the same: sell $1,000 or more and pay $9.99. Sell $10,000 and still pay $9.99.'],
      ['How is it different from DoorDash and Uber Eats?', 'Their marketplaces let customers discover businesses and order in their apps, with delivery or pickup depending on the service. PB gives you an editable menu, your own link, and a QR code for direct WhatsApp orders. You can use both channels. PB does not offer delivery.'],
      ['How do I get paid for orders?', 'You choose which payment methods to accept, such as Zelle if your bank supports it for your business, a payment link, or pay at pickup. You confirm payment.'],
      ['What if I change locations?', 'Your usual address is displayed by default. If you’re attending an event, you’ll be able to set a temporary location and an end time. Your link and QR code stay the same.'],
      ['Do I need to print a new QR code when I update my menu?', 'No. The QR code opens the same link and customers see your updated menu.']
    ]
  }
};

function renderMenuLanding(language = 'es') {
  const english = language === 'en';
  const t = english ? copy.en : copy.es;
  const path = english ? basePath + '/en' : basePath;
  return `<!doctype html>
<html lang="${english ? 'en' : 'es'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${t.title} | Planeta Boricua</title>
<meta name="description" content="${t.intro}">
<link rel="canonical" href="${site}${path}">
<link rel="alternate" hreflang="es" href="${site}${basePath}">
<link rel="alternate" hreflang="en" href="${site}${basePath}/en">
<style>
*{box-sizing:border-box}body{margin:0;background:#fff9ee;color:#252421;font:1rem/1.6 system-ui,sans-serif}a{color:inherit}header,main,footer{width:min(100% - 2rem,66rem);margin-inline:auto}header{display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:1rem 0;font-weight:750}header a:first-child{display:flex;align-items:center;gap:.6rem;text-decoration:none}header img{width:42px;height:42px;object-fit:contain}section{margin-block:clamp(2rem,6vw,4rem)}.hero{background:#222a26;color:#fff9ee;border-radius:1.4rem;padding:clamp(1.4rem,5vw,4rem);margin-top:.5rem}.eyebrow{color:#f7cd73;font-weight:750}h1,h2,h3,p{margin:0 0 .7rem}h1{font-family:Georgia,serif;font-size:clamp(2.5rem,7vw,5rem);line-height:1.02;max-width:13ch}h2{font-family:Georgia,serif;font-size:clamp(1.8rem,4vw,2.6rem);line-height:1.12}p{max-width:65ch}.price{margin-top:1.4rem;font-size:1.3rem;font-weight:800}.cta{display:inline-block;background:#f7cd73;color:#222a26;border-radius:.65rem;padding:.65rem 1rem;font-weight:800;margin:.5rem 0}.status{font-size:.9rem}ol{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,14rem),1fr));gap:1rem;padding:0;list-style:none;counter-reset:steps}li{counter-increment:steps;background:#fff;border:1px solid #ded4c3;padding:1rem;border-radius:.8rem}li::before{content:counter(steps);display:block;color:#8b302a;font-weight:800}details{padding:.85rem 0;border-bottom:1px solid #ded4c3}summary{cursor:pointer;font-weight:750}details p{margin:.6rem 0 0}footer{border-top:1px solid #ded4c3;padding:1rem 0 2rem}a:focus-visible,summary:focus-visible{outline:3px solid #b64332;outline-offset:4px}
</style>
</head>
<body>
<header><a href="/"><img src="/pbn-logo.webp" alt="">Planeta Boricua</a><a href="${english ? basePath : basePath + '/en'}" lang="${english ? 'es' : 'en'}">${english ? 'Español' : 'English'}</a></header>
<main>
<section class="hero">
<p class="eyebrow">${t.title}</p>
<h1>${t.headline}</h1>
<p>${t.intro}</p>
<p class="price">${t.price}</p><p>${t.renewal}</p>
<a class="cta" href="${basePath}/acceso">${t.cta}</a>
</section>
<section><h2>${t.aboutTitle}</h2><p>${t.about}</p></section>
<section><h2>${t.stepsTitle}</h2><ol>${t.steps.map(([title, body]) => `<li><h3>${title}</h3><p>${body}</p></li>`).join('')}</ol></section>
<section><h2>${t.faqTitle}</h2>${t.faq.map(([question, answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join('')}</section>
</main>
<footer><a href="/">Planeta Boricua</a></footer>
</body>
</html>`;
}

module.exports = renderMenuLanding;
