// Shared navigation only: public page styles and profile functions stay intact.
function isPublicShellPath(pathname) {
  return pathname === '/' || /^\/(?:blog|lo-mas-reciente|agenda-boricua)(?:\/|$)/.test(pathname)
    || ['/feria-artesanos','/recursos','/mudarse-de-pr','/regresar-a-pr','/quienes-somos','/anunciate-en-pb','/privacidad-boricua','/terminos-boricua','/afiliados-boricua','/sala-de-prensa'].includes(pathname)
    || /^\/artesanos\/(?!mi-perfil(?:\/|$)|comunicaciones(?:\/|$))[^/]+$/.test(pathname);
}
function renderSiteHeader(pathname) {
  const links = [['/','Inicio'],['/blog','El Balcón'],['/feria-artesanos','Artesanos'],['/agenda-boricua','Agenda'],['/recursos','Recursos']];
  const active = href => href === '/' ? pathname === '/' : href === '/feria-artesanos' ? pathname === href || pathname.startsWith('/artesanos/') : href === '/recursos' ? ['/recursos','/mudarse-de-pr','/regresar-a-pr'].includes(pathname) : pathname === href || pathname.startsWith(href+'/');
  const more = [['/lo-mas-reciente','Lo más reciente'],['/#viajes','Viajes y destinos'],['/#newsletter','Boletín'],['/quienes-somos','Quiénes somos'],['/anunciate-en-pb','Anúnciate en PB'],['mailto:masboricuaqueunmofongo@gmail.com','Contacto'],['/artesanos/mi-perfil','Administrar mi perfil']];
  const render = ([href,label]) => `<a href="${href}"${active(href)?' aria-current="page"':''}>${label}</a>`;
  return `<a class="pb-site-skip" href="#pb-page-content">Saltar al contenido</a><header class="pb-site-header"><div class="pb-site-header-inner"><a class="pb-site-brand" href="/" aria-label="Planeta Boricua — Inicio"><img src="/img/pb-logo-header.webp" width="52" height="44" alt=""><span><strong>Planeta Boricua</strong><small>MÁS BORICUA QUE UN MOFONGO</small></span></a><nav class="pb-site-nav" aria-label="Navegación principal">${links.map(render).join('')}<details class="pb-site-menu"><summary>Más <span aria-hidden="true">⌄</span></summary><div class="pb-site-panel">${more.map(render).join('')}</div></details></nav><details class="pb-site-menu pb-site-mobile"><summary>Menú</summary><nav class="pb-site-panel" aria-label="Navegación móvil">${links.map(render).join('')}${more.map(render).join('')}</nav></details></div></header><div id="pb-page-content" tabindex="-1"></div>`;
}
function withPBSiteShell(html, pathname) {
  if (!isPublicShellPath(pathname) || typeof html !== 'string' || !html.includes('</head>') || !html.includes('</body>') || html.includes('data-pb-navigation')) return html;
  let result = html.replace(/<body\b([^>]*)>/i, '<body$1 data-pb-navigation>');
  const oldNav = /<nav\b[^>]*>[\s\S]*?<\/nav>/i;
  if (oldNav.test(result)) result = result.replace(oldNav, renderSiteHeader(pathname));
  else result = result.replace(/(<body\b[^>]*>)/i, '$1'+renderSiteHeader(pathname));
  return result.replace('</head>', '<link rel="stylesheet" href="/css/pb-refresh.css?v=2"></head>')
    .replace('</body>', '<script src="/js/pb-navigation.js?v=2" defer></script></body>');
}
module.exports = { withPBSiteShell, renderSiteHeader, isPublicShellPath };
