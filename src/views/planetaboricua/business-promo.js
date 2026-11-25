// Promotion stays outside editorial copy and points to the explanatory landing.
function renderBusinessPromo(context = 'portal') {
  const home = context === 'portada';
  const advertise = home ? '<a class="pb-business-example" href="/anunciate-en-pb" data-pb-event="pb_advertise_open" data-pb-method="portada">Anúnciate en PB</a>' : '';
  return `<section class="pb-business-promo${home ? ' pb-business-promo-home' : ''}" data-pb-business-promo aria-label="Una página para tu negocio"><div class="pb-business-promo-copy"><p class="pb-business-kicker">PARA TU NEGOCIO</p><h2>${home ? 'Tu negocio merece su propio enlace.' : '¿Tienes un negocio o trabajas por tu cuenta?'}</h2><p>Muestra tu menú o tus servicios, añade tus redes y facilita que te contacten por WhatsApp. Comparte tu página por enlace o código QR.</p><p class="pb-business-detail">Restaurantes, food trucks y servicios pueden comenzar con su correo. Para tiendas, consulta las opciones de catálogo.</p></div><div class="pb-business-promo-actions"><a class="pb-business-primary" href="/tu-negocio?desde=${context}" data-pb-event="pb_business_open" data-pb-method="${context}">Crea la página de tu negocio</a><a class="pb-business-example" href="/tu-negocio?desde=${context}#demo">Ver ejemplos</a>${advertise}</div></section>`;
}
function withBusinessPromo(html, pathname) {
  if (html.includes('data-pb-business-promo')) return html;
  if (pathname === '/') return html.replace('<div class="pb-home-ad" aria-label="Publicidad destacada">', renderBusinessPromo('portada')+'<div class="pb-home-ad" aria-label="Publicidad destacada">');
  const context = /^\/lo-mas-reciente(?:\/|$)/.test(pathname) ? 'lo-mas-reciente'
    : /^\/blog(?:\/|$)/.test(pathname) ? 'el-balcon'
    : ['/recursos','/mudarse-de-pr','/regresar-a-pr'].includes(pathname) ? 'recursos'
    : /^\/feria-artesanos(?:\/|$)/.test(pathname) ? 'feria'
    : pathname === '/agenda-boricua' ? 'agenda'
    : pathname === '/anunciate-en-pb' ? 'publicidad' : '';
  if (!context) return html;
  // Insert after the main content; do not interrupt a story or its source links.
  const index = html.lastIndexOf('</main>');
  if (index >= 0) return html.slice(0,index+7)+renderBusinessPromo(context)+html.slice(index+7);
  // Some legacy section templates have no main element.
  const footer = html.indexOf('<footer');
  return footer < 0 ? html : html.slice(0,footer)+renderBusinessPromo(context)+html.slice(footer);
}
module.exports = {renderBusinessPromo, withBusinessPromo};
