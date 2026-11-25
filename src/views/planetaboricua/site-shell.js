const { navIcon } = require('./nav-icons');
const { withGetYourGuide } = require('./getyourguide');
const { withBusinessPromo } = require('./business-promo');
// Shared navigation only: public page styles and profile functions stay intact.
function isPublicShellPath(pathname) {
  return pathname === '/' || /^\/(?:blog|lo-mas-reciente|agenda-boricua)(?:\/|$)/.test(pathname)
    || ['/feria-artesanos','/feria-artesanos/florida','/recursos','/mudarse-de-pr','/regresar-a-pr','/quienes-somos','/anunciate-en-pb','/privacidad-boricua','/terminos-boricua','/afiliados-boricua','/sala-de-prensa'].includes(pathname)
    || /^\/artesanos\/(?!mi-perfil(?:\/|$)|comunicaciones(?:\/|$))[^/]+$/.test(pathname);
}
function usesEditorialLayout(pathname) {
  return pathname === '/' || /^\/lo-mas-reciente\/[^/]+\/?$/.test(pathname)
    || /^\/blog\/(?!buscar(?:\/|$))[^/]+\/?$/.test(pathname);
}

function renderSiteHeader(pathname) {
  const editorial = usesEditorialLayout(pathname);
  const home = pathname === '/';
  const links = [['/','Inicio','home'],['/blog','El Balcón','balcony'],['/feria-artesanos','Artesanos','artisans'],['/agenda-boricua','Agenda','calendar'],['/pueblos','Nuestros pueblos','plate'],['/recursos','Recursos','resources'],['/tu-negocio','Tu negocio','business']];
  const active = href => href === '/' ? pathname === '/' : href === '/feria-artesanos' ? pathname === href || pathname === '/feria-artesanos/florida' || pathname.startsWith('/artesanos/') : href === '/recursos' ? ['/recursos','/mudarse-de-pr','/regresar-a-pr'].includes(pathname) : pathname === href || pathname.startsWith(href+'/');
  const more = [['/lo-mas-reciente','Lo más reciente','news'],['/#viajes','Viajes y destinos','travel'],['/#newsletter','Boletín','newsletter'],['/quienes-somos','Quiénes somos','about'],['/anunciate-en-pb','Anúnciate en PB','ads'],['mailto:masboricuaqueunmofongo@gmail.com','Contacto','contact'],['/artesanos/mi-perfil','Administrar mi perfil','profile']];
  const render = ([href,label,icon]) => `<a href="${href}"${active(href)?' aria-current="page"':''}>${navIcon(icon)}<span class="pb-nav-label">${label}</span></a>`;
  const editorialSearch = editorial ? `<details class="pb-site-menu pb-editorial-search">
    <summary aria-label="Buscar en Planeta Boricua">${navIcon('search')}<span>Buscar</span></summary>
    <form class="pb-site-panel" action="/lo-mas-reciente" method="get" role="search">
      <label for="pb-editorial-query">Busca noticias en PB</label>
      <div class="pb-search-fields"><input id="pb-editorial-query" name="q" type="search" maxlength="100" placeholder="Aguadilla, vuelos, luz…" required><button type="submit">Buscar</button></div>
      <a href="/blog/buscar">Buscar en El Balcón</a>
    </form>
  </details>` : '';
  const mobileLinks = editorial ? [['/#hero','Destacadas'],['/lo-mas-reciente','Lo último'],['/agenda-boricua','Agenda'],['/feria-artesanos','Artesanos']] : [];
  const edition = editorial ? `<div class="pb-edition">${home ? '<p>Puerto Rico y nuestra comunidad en Florida Central.</p>' : ''}
    <nav aria-label="Secciones de Planeta Boricua">${mobileLinks.map(([href,label]) => `<a href="${href}">${label}</a>`).join('')}</nav>
  </div>` : '';
  return `<a class="pb-site-skip" href="#pb-page-content">Saltar al contenido</a><header class="pb-site-header${editorial ? ' pb-editorial-header' : ''}"><div class="pb-site-header-inner"><a class="pb-site-brand" href="/" aria-label="Planeta Boricua — Inicio"><img src="/img/pb-logo-header.webp" width="52" height="44" alt=""><span><strong>Planeta Boricua</strong><small>MÁS BORICUA QUE UN MOFONGO</small></span></a><nav class="pb-site-nav" aria-label="Navegación principal">${links.map(render).join('')}<details class="pb-site-menu"><summary>${navIcon('more')}<span>Más <span aria-hidden="true">⌄</span></span></summary><div class="pb-site-panel">${more.map(render).join('')}</div></details></nav>${editorialSearch}<details class="pb-site-menu pb-site-mobile"><summary>${navIcon('menu')}<span>Menú</span></summary><nav class="pb-site-panel" aria-label="Navegación móvil">${links.map(render).join('')}${more.map(render).join('')}</nav></details></div></header><div id="pb-page-content" tabindex="-1"></div>${edition}`;
}
function withPBSiteShell(html, pathname) {
  if (!isPublicShellPath(pathname) || typeof html !== 'string' || !html.includes('</head>') || !html.includes('</body>') || html.includes('data-pb-navigation')) return html;
  let result = html.replace(/<body\b([^>]*)>/i, '<body$1 data-pb-navigation>');
  const oldNav = /<nav\b[^>]*>[\s\S]*?<\/nav>/i;
  if (oldNav.test(result)) result = result.replace(oldNav, renderSiteHeader(pathname));
  else result = result.replace(/(<body\b[^>]*>)/i, '$1'+renderSiteHeader(pathname));
  result = withBusinessPromo(result, pathname);
  result = withGetYourGuide(result, pathname);
  const editorial = usesEditorialLayout(pathname);
  if (editorial) {
    result = result.replace('data-pb-navigation', `data-pb-navigation data-pb-edition="${pathname === '/' ? 'home' : 'article'}"`);
  }
  const layout = editorial ? '<link rel="stylesheet" href="/css/pb-editorial-layout.css?v=1">' : '';
  const analytics = editorial ? '<script src="/js/pb-editorial-events.js?v=1" defer></script>' : '';
  return result.replace('</head>', '<link rel="stylesheet" href="/css/pb-refresh.css?v=4">' + layout + '</head>')
    .replace('</body>', '<script src="/js/pb-navigation.js?v=3" defer></script>' + analytics + '</body>');
}
module.exports = { withPBSiteShell, renderSiteHeader, isPublicShellPath };
