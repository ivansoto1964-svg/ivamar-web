const sectionFor = pathname => {
  if (pathname === '/') return 'home';
  if (/^\/(blog|lo-mas-reciente)(\/|$)/.test(pathname)) return 'stories';
  if (pathname === '/feria-artesanos' || /^\/artesanos\//.test(pathname)) return 'artisans';
  if (/^\/agenda-boricua(?:\/|$)/.test(pathname)) return 'agenda';
  return 'more';
};
// Only the established, public reading and discovery pages use this shell.
// Owner tools, sign-in, QR downloads, forms and deferred pilots keep their UI.
function isPublicShellPath(pathname) {
  return pathname === '/' || /^\/(?:blog|lo-mas-reciente|agenda-boricua)(?:\/|$)/.test(pathname)
    || ['/feria-artesanos','/recursos','/mudarse-de-pr','/regresar-a-pr','/quienes-somos','/anunciate-en-pb','/privacidad-boricua','/terminos-boricua','/afiliados-boricua','/sala-de-prensa'].includes(pathname)
    || /^\/artesanos\/(?!mi-perfil(?:\/|$)|comunicaciones(?:\/|$))[^/]+$/.test(pathname);
}
const icons = {
  home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>',
  stories:'<path d="M3 4h7l2 2 2-2h7v16h-7l-2 2-2-2H3Z"/><path d="M12 6v16M6 8h3m-3 4h3m6-4h3m-3 4h3"/>',
  artisans:'<path d="m4 10 4-6h8l4 6v10H4Z"/><path d="M4 10h16M9 20v-6h6v6"/>',
  agenda:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 11h18m-14 4h2m6 0h2"/>',
  more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>'
};
const icon = key => `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[key]}</svg>`;
function renderSiteHeader(pathname) {
  const current = sectionFor(pathname);
  const links = [['home','/','Inicio'],['stories','/blog','Historias'],['artisans','/feria-artesanos','Artesanos'],['agenda','/agenda-boricua','Agenda']];
  const link = ([key,href,label], mobile=false) => `<a href="${href}"${current===key?' aria-current="page"':''}>${mobile?icon(key):''}<span>${label}</span></a>`;
  const moreLinks = `<a href="/lo-mas-reciente">Lo más reciente <span>Actualidad y comunidad</span></a><a href="/recursos">Recursos <span>Guías entre Puerto Rico y USA</span></a><a href="/#viajes">Viajes y destinos <span>Explora tu próxima salida</span></a><a href="/#newsletter">Boletín Boricua <span>Historias en tu correo</span></a><a href="/quienes-somos">Conoce PB <span>El proyecto y su gente</span></a><a href="/anunciate-en-pb">Anúnciate en PB</a><a href="/artesanos/mi-perfil">Administrar mi perfil</a>`;
  return `<a class="pb-shell-skip" href="#pb-page-content">Saltar al contenido</a><header class="pb-shell-header"><div class="pb-shell-utility"><span>PUERTO RICO + LA DIÁSPORA</span><a href="/compartir-evento-boricua">Comparte un evento <span aria-hidden="true">↗</span></a></div><div class="pb-shell-top"><a class="pb-shell-brand" href="/" aria-label="Planeta Boricua — Inicio"><img src="/img/pb-logo-header.webp" width="54" height="46" alt=""><span><strong>Planeta Boricua<span class="pb-shell-dot">.</span></strong><small>MÁS BORICUA QUE UN MOFONGO</small></span></a><nav class="pb-shell-desktop" aria-label="Navegación principal">${links.map(l=>link(l)).join('')}<a href="/recursos"${pathname==='/recursos'?' aria-current="page"':''}>Recursos</a><details class="pb-shell-more"><summary>Más <span aria-hidden="true">⌄</span></summary><div class="pb-shell-panel">${moreLinks}</div></details></nav><a class="pb-shell-newsletter" href="/#newsletter">Únete al boletín <span aria-hidden="true">↗</span></a><details class="pb-shell-more pb-shell-mobile-top"><summary>Menú</summary><div class="pb-shell-panel">${links.map(l=>link(l)).join('')}${moreLinks}</div></details></div></header><nav class="pb-shell-mobile" aria-label="Navegación móvil">${links.map(l=>link(l,true)).join('')}<details class="pb-shell-more"><summary${current==='more'?' class="pb-shell-selected"':''}>${icon('more')}<span>Más</span></summary><div class="pb-shell-panel">${moreLinks}</div></details></nav><!--PB_SHELL_END-->`;
}
const intro = `<section class="pb-shell-intro" aria-labelledby="pb-welcome-title"><div><p class="pb-shell-kicker">CULTURA · GENTE · CONEXIONES</p><h2 id="pb-welcome-title">Un planeta.<br><em>Muchas historias.</em></h2></div><div class="pb-shell-intro-copy"><p>Lo nuestro vive en lo que creamos, contamos y compartimos. Descubre a nuestra gente, estés donde estés.</p><a href="/feria-artesanos">Conoce nuestras manos creadoras <span aria-hidden="true">↗</span></a></div></section><div class="pb-shell-shortcuts" aria-label="Descubre Planeta Boricua"><a href="/blog"><span>01</span><strong>Historias que nos unen</strong><small>El Balcón y nuestra cultura ↗</small></a><a href="/feria-artesanos"><span>02</span><strong>Hecho por manos boricuas</strong><small>Explora la Feria Digital ↗</small></a><a href="/agenda-boricua"><span>03</span><strong>Nos vemos por ahí</strong><small>Eventos de nuestra comunidad ↗</small></a><a href="/recursos"><span>04</span><strong>Una mano para orientarte</strong><small>Recursos entre la isla y USA ↗</small></a></div>`;
function withPBSiteShell(html, pathname) {
  if (!isPublicShellPath(pathname) || typeof html !== 'string' || !html.includes('</head>') || !html.includes('</body>') || html.includes('data-pb-shell=')) return html;
  const page = pathname === '/' ? 'home' : pathname === '/feria-artesanos' ? 'fair' : /^\/artesanos\//.test(pathname) ? 'profile' : sectionFor(pathname);
  let result = html.replace(/<body\b([^>]*)>/i, `<body$1 data-pb-shell="${page}">`);
  // The first nav is the old page header; pagination and in-page navigation stay.
  const oldNav = /<nav\b[^>]*>[\s\S]*?<\/nav>/i;
  if (oldNav.test(result)) result = result.replace(oldNav, renderSiteHeader(pathname));
  else result = result.replace(/(<body\b[^>]*>)/i, '$1'+renderSiteHeader(pathname));
  result = result.replace('</head>', '<link rel="stylesheet" href="/css/pb-refresh.css?v=1"></head>');
  result = result.replace('</body>', '<script src="/js/pb-navigation.js?v=1" defer></script></body>');
  // A focusable landing point works even on legacy pages without a main element.
  const marker = '<div id="pb-page-content" tabindex="-1"></div>';
  result = result.replace('<!--PB_SHELL_END-->', marker+(page==='home'?intro:''));
  if (page === 'profile') {
    const hasGallery = result.includes('id="artisan-gallery-title"');
    const profileNav = `<div class="pb-shell-profile-trail"><a href="/feria-artesanos">← Todos los artesanos</a><div>${hasGallery?'<a href="#artisan-gallery-title">Sus creaciones</a>':''}<a href="#pb-artisan-contact">Contacto</a><a href="#compartir">Compartir perfil</a></div></div>`;
    result = result.replace('<article class="profile">', profileNav+'<article class="profile">').replace('<div class="actions">','<div class="actions" id="pb-artisan-contact">');
  }
  return result;
}
module.exports = { withPBSiteShell, renderSiteHeader, isPublicShellPath };
