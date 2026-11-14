'use strict';

const base = '/crea-tu-menu';
const email = 'masboricuaqueunmofongo@gmail.com';
const examples = [
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

const interest = example => 'mailto:' + email + '?subject=' + encodeURIComponent('Me interesa · ' + example.contact) +
  '&body=' + encodeURIComponent('Saludos, Planeta Boricua. Me interesa esta opción para mi negocio.\n\nNombre del negocio:\nPueblo o ciudad:\nQué vendo u ofrezco:\n');

function renderBusinessLanding({openMenu = false} = {}) {
  const menuAction = openMenu ? base + '/acceso' : interest(examples[0]);
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Tu negocio en PB | Planeta Boricua</title>
<meta name="description" content="Una mini web para tu menú, tienda o negocio de servicios. Muestra lo que haces y conecta con tus clientes por WhatsApp.">
<meta name="robots" content="noindex">
<meta name="theme-color" content="#172548">
<link rel="stylesheet" href="/css/pb-business-landing.css">
<script src="/js/pb-business-landing.js" defer></script>
</head>
<body>
<header class="top wrap">
  <a class="brand" href="https://www.masboricuaqueunmofongo.com/"><img width="42" height="42" src="/pbn-logo.webp" alt=""><span>Planeta Boricua</span></a>
  <a class="top-link" href="#como-funciona">Cómo funciona</a>
  <a class="top-link" href="${base}/en" lang="en">English · Food menus</a>
</header>
<main>
  <section class="hero" aria-labelledby="title">
    <div class="wrap hero-inner">
      <div class="hero-copy">
        <p class="eyebrow">Tu negocio en PB</p>
        <h1 id="title">Lo que vendes.<br>Lo que haces.<br><em>En un solo enlace.</em></h1>
        <p class="lead">Pon tu menú, tus productos o tus servicios en una mini web que puedas compartir en WhatsApp, en tus redes o con un QR impreso.</p>
        <div class="actions"><a class="button primary" href="${menuAction}">Comenzar con tu menú <span aria-hidden="true">↗</span></a><a class="button outline" href="#demo">Probar la demo</a></div>
        <p class="hero-note">${openMenu ? 'Acceso de prueba para menús. Los cobros son simulados.' : 'Menús en piloto por invitación. El botón abre un correo para solicitar acceso.'}</p>
      </div>
      <div class="hero-visual"><img src="/img/pb-business/food.webp" width="960" height="640" alt="Entrega de una orden por la ventanilla de un food truck" fetchpriority="high"><span>Menús · Catálogos · Servicios</span></div>
    </div>
  </section>

  <section class="wrap section" id="demo" aria-labelledby="demo-title">
    <p class="eyebrow blue">Demo interactiva</p>
    <h2 id="demo-title">Míralo como lo vería tu cliente.</h2>
    <p class="section-intro">Escoge un negocio ficticio y prueba el botón de contacto. Las acciones se simulan aquí mismo.</p>
    <div class="demos">
    ${examples.map((x,i)=>`
    <details class="demo" ${i===0?'open':''}>
      <summary><span>${x.label}</span><small>${i===0?'Piloto de menú':'Vista de ejemplo'}</small></summary>
      <div class="demo-content">
        <article class="phone" aria-label="Ejemplo de ${x.label.toLowerCase()}">
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
        <div class="use-case"><h3>${x.type} para tu negocio</h3><p>${x.tools}</p>
          <a class="text-link" href="${i===0?menuAction:interest(x)}">${x.cta} <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </details>`).join('')}
    </div>
  </section>

  <section class="band" id="como-funciona"><div class="wrap section">
    <p class="eyebrow blue">Piloto de menús</p>
    <h2>De tu celular a las manos de tus clientes.</h2>
    <ol class="steps">
      <li><h3>Arma tu menú</h3><p>Entra con tu correo, añade tu WhatsApp y sube una foto del menú o escribe los platos y sus precios.</p></li>
      <li><h3>Míralo antes de publicar</h3><p>Prueba la vista previa desde el celular. Tú decides cuándo está listo.</p></li>
      <li><h3>Comparte tu enlace y QR</h3><p>Al publicar, descarga tu QR y úsalo en tarjetas, rótulos o mesas. El mismo QR abre el menú actualizado.</p></li>
    </ol>
  </div></section>

  <section class="wrap section features" id="incluye" aria-labelledby="features-title">
    <div><p class="eyebrow blue">Qué incluye</p><h2 id="features-title">Herramientas para vender a tu manera.</h2>
    <p>Tu menú también puede aparecer en <strong>Dónde Comer</strong>, el directorio de comida de Planeta Boricua organizado por pueblo, ciudad y estado.</p></div>
    <dl>
      <div><dt>Pedidos directos</dt><dd>Tu cliente arma el pedido y te escribe por WhatsApp. Tú confirmas el recogido y cobras directamente.</dd></div>
      <div><dt>Promos que puedes compartir</dt><dd>Publica el especial de hoy o de la semana y ofrece descuentos con una cantidad limitada de cupones.</dd></div>
      <div><dt>Control desde el celular</dt><dd>Cierra la cocina cuando te llenes, marca platos agotados y descarga un resumen de las ventas que registres.</dd></div>
      <div><dt>Precio claro</dt><dd>PB cobra por publicar y mantener tu menú. Cada venta va directo a tu negocio, con $0 de comisión de PB. Tu procesador puede tener sus propias tarifas.</dd></div>
    </dl>
  </section>

  <section class="wrap section"><div class="price-box">
    <div><p class="eyebrow">Precio del menú</p><h2>$49 <small>al publicar</small></h2><p>Los primeros 30 días van incluidos. Después, <strong>$9.99 al mes</strong>.</p></div>
    <div><a class="button primary" href="${menuAction}">Comenzar con tu menú <span aria-hidden="true">↗</span></a>
    <p>Catálogos y servicios están en etapa de demostración. Puedes escribirnos para indicar qué necesita tu negocio.</p></div>
  </div></section>

  <section class="wrap section questions" aria-labelledby="questions-title"><h2 id="questions-title">Preguntas rápidas</h2>
    <details><summary>¿Qué me da PB además de una página de enlaces?</summary><p>En el menú tienes herramientas para mostrar platos y precios, recibir pedidos, anunciar ofertas y aparecer en Dónde Comer. Puedes compartir el mismo enlace en redes, tarjetas y WhatsApp.</p></details>
    <details><summary>¿Qué pasa si ya uso una app de delivery?</summary><p>Puedes seguir usándola. El menú de PB te sirve como canal de recogido directo. Tu negocio confirma el pedido y el pago con el cliente.</p></details>
    <details><summary>¿Puedo empezar con una tienda o un servicio?</summary><p>Ya puedes probar ambos ejemplos y escribirnos. El registro por correo y la publicación pagada están preparados para el piloto de menús.</p></details>
  </section>
</main>
<footer class="wrap bottom"><a href="https://www.masboricuaqueunmofongo.com/">Planeta Boricua</a><span>Más Boricua Que Un Mofongo</span><a href="mailto:${email}">Escríbenos</a></footer>
</body>
</html>`;
}

module.exports = renderBusinessLanding;
