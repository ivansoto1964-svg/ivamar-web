const { editorialSections } = require('./editorial-sections');
const { navIcon } = require('./nav-icons');
const { withGetYourGuide } = require('./getyourguide');
const { withBusinessPromo } = require('./business-promo');
const { renderSubscriberForm } = require('./subscriber-form');

function normalizePath(pathname) {
  return pathname.replace(/\/+$/, '') || '/';
}

function isPublicShellPath(pathname) {
  const current = normalizePath(pathname);
  return current === '/' || /^\/(?:blog|lo-mas-reciente|agenda-boricua|pueblos)(?:\/|$)/.test(current)
    || /^\/turistiando(?:\/viaje-[a-f0-9]{16})?$/.test(current)
    || /^\/(?:tu-negocio|crea-tu-menu)(?:\/en)?$/.test(current)
    || ['/feria-artesanos','/feria-artesanos/florida','/recursos','/mudarse-de-pr','/regresar-a-pr','/quienes-somos','/anunciate-en-pb','/privacidad-boricua','/terminos-boricua','/afiliados-boricua','/sala-de-prensa','/grupos-boricuas','/compartir-evento-boricua'].includes(current)
    || /^\/artesanos\/(?!mi-perfil(?:\/|$)|comunicaciones(?:\/|$))[^/]+$/.test(current);
}

function usesEditorialLayout(pathname) {
  return pathname === '/' || /^\/lo-mas-reciente\/[^/]+$/.test(pathname)
    || /^\/blog\/(?!buscar(?:\/|$))[^/]+$/.test(pathname)
    || /^\/turistiando\/viaje-[a-f0-9]{16}$/.test(pathname);
}

function renderSiteHeader(pathname, {english = false, newsletter = '#pb-boletin'} = {}) {
  const current = normalizePath(pathname);
  const home = current === '/';
  const t = (es,en) => english ? en : es;
  const links = [
    ['/','Inicio','Home','home'],
    ...editorialSections,
    ['/feria-artesanos','Artesanos','Artisans','artisans'],
    ['/agenda-boricua','Agenda','Events','calendar'],
    ['/pueblos','Nuestros pueblos','Our towns','plate'],
    ['/recursos','Recursos','Resources','resources'],
    [english ? '/tu-negocio/en' : '/tu-negocio','Tu negocio','Your business','business']
  ];
  const newsletterItem = [newsletter,'Boletín','Newsletter','newsletter'];
  const more = [
    ['/quienes-somos','Quiénes somos','About us','about'],
    ['/anunciate-en-pb','Anúnciate en PB','Advertise','ads'],
    ['mailto:masboricuaqueunmofongo@gmail.com','Contacto','Contact','contact'],
    ['/artesanos/mi-perfil','Administrar mi perfil','Manage my profile','profile']
  ];
  const active = href => {
    if (href === '/') return home;
    if (href === '/feria-artesanos') return current === href || current.startsWith(href+'/') || current.startsWith('/artesanos/');
    if (href === '/recursos') return ['/recursos','/mudarse-de-pr','/regresar-a-pr'].includes(current);
    if (href.startsWith('/tu-negocio')) return /^\/(?:tu-negocio|crea-tu-menu)(?:\/en)?$/.test(current);
    return current === href || current.startsWith(href+'/');
  };
  const render = ([href,es,en,icon]) => `<a href="${href}"${active(href)?' aria-current="page"':''}>${navIcon(icon)}<span class="pb-nav-label">${t(es,en)}</span></a>`;
  const search = `<details class="pb-site-menu pb-editorial-search">
    <summary aria-label="${t('Buscar en Planeta Boricua','Search Planeta Boricua')}">${navIcon('search')}<span>${t('Buscar','Search')}</span></summary>
    <form class="pb-site-panel" action="/lo-mas-reciente" method="get" role="search">
      <label for="pb-editorial-query">${t('Busca noticias en PB','Search PB news')}</label>
      <div class="pb-search-fields"><input id="pb-editorial-query" name="q" type="search" maxlength="100" placeholder="Aguadilla, vuelos, luz…" required><button type="submit">${t('Buscar','Search')}</button></div>
      <a href="/blog/buscar">${t('Buscar en El Balcón','Search El Balcón')}</a>
    </form>
  </details>`;
  const quickLinks = [...editorialSections,['/#hero','Destacadas'],['/agenda-boricua','Agenda'],['/feria-artesanos','Artesanos']];
  const edition = usesEditorialLayout(current) ? `<div class="pb-edition">${home ? '<p>Puerto Rico y nuestra comunidad en Florida Central.</p>' : ''}
    <nav aria-label="Secciones de Planeta Boricua">${quickLinks.map(([href,label]) => `<a href="${href}"${active(href)?' aria-current="page"':''}>${label}</a>`).join('')}</nav>
  </div>` : '';
  return `<a class="pb-site-skip" href="#pb-page-content">${t('Saltar al contenido','Skip to content')}</a>
    <header class="pb-site-header pb-editorial-header">
      <div class="pb-site-header-inner">
        <a class="pb-site-brand" href="/" aria-label="Planeta Boricua — ${t('Inicio','Home')}"><img src="/img/pb-logo-header.webp" width="52" height="44" alt=""><span><strong>Planeta Boricua</strong></span></a>
        <nav class="pb-site-nav" aria-label="${t('Navegación principal','Main navigation')}">
          ${links.map(render).join('')}<details class="pb-site-menu"><summary>${navIcon('more')}<span>${t('Más','More')} <span aria-hidden="true">⌄</span></span></summary><div class="pb-site-panel">${more.map(render).join('')}</div></details>
        </nav>
        ${search}
        <a class="pb-header-newsletter" href="${newsletter}">${t('Boletín','Newsletter')}</a>
        <details class="pb-site-menu pb-site-mobile"><summary>${navIcon('menu')}<span>${t('Menú','Menu')}</span></summary><nav class="pb-site-panel" aria-label="${t('Navegación móvil','Mobile navigation')}">${render(newsletterItem)}${links.map(render).join('')}${more.map(render).join('')}</nav></details>
      </div>
    </header><div id="pb-page-content" tabindex="-1"></div>${edition}`;
}

function withPBSiteShell(html, pathname) {
  if (!isPublicShellPath(pathname) || typeof html !== 'string' || !html.includes('</head>') || !html.includes('</body>') || html.includes('data-pb-navigation')) return html;
  const current = normalizePath(pathname);
  const english = /<html\b[^>]*\blang=["']en/i.test(html);
  const hasSignup = /<form\b[^>]*\bdata-pb-subscribe\b/i.test(html);
  const newsletter = current === '/' && hasSignup ? '#newsletter' : '#pb-boletin';
  const header = renderSiteHeader(current,{english,newsletter});
  let result = html.replace(/<body\b([^>]*)>/i, '<body$1 data-pb-navigation>');
  const main = result.search(/<main\b/i);
  const oldNav = result.match(/<nav\b[^>]*>[\s\S]*?<\/nav>/i);
  if (oldNav && (main < 0 || oldNav.index < main) && !oldNav[0].includes('data-pb-local-nav')) {
    result = result.replace(oldNav[0], header);
  } else {
    result = result.replace(/<body\b[^>]*>/i, body => body + header);
  }
  result = withBusinessPromo(result, current);
  result = withGetYourGuide(result, current);
  // The former static index was cached as immutable for a year.
  result = result.replace(/href=(["'])\/pueblos\/?\1/g, 'href=$1/pueblos/?v=2$1');
  if (!hasSignup) {
    const related = [
      ['/lo-mas-reciente','Lee las últimas noticias','Read the latest news'],
      ['/blog','Historias de El Balcón','Stories from El Balcón'],
      ['/turistiando','Explora Turistiando','Explore Turistiando'],
      ['/agenda-boricua','Busca actividades','Find events'],
      ['/feria-artesanos','Conoce a los artesanos','Meet the artisans']
    ].filter(([href]) => current !== href && !current.startsWith(href+'/')).slice(0,3);
    const signup = `<div class="pb-community-signup">
      <nav class="pb-continue" aria-label="${english ? 'Explore more of Planeta Boricua' : 'Sigue explorando Planeta Boricua'}">
        ${related.map(([href,es,en])=>`<a href="${href}" data-pb-event="pb_related_open" data-pb-method="secciones">${english ? en : es}</a>`).join('')}
      </nav>
      ${renderSubscriberForm('portal',{english})}
    </div>`;
    const footer = result.search(/<footer\b/i);
    result = footer >= 0 ? result.slice(0,footer)+signup+result.slice(footer) : result.replace('</body>',signup+'</body>');
  }
  const editorial = usesEditorialLayout(current);
  if (editorial) {
    result = result.replace('data-pb-navigation', `data-pb-navigation data-pb-edition="${current === '/' ? 'home' : 'article'}"`);
  }
  return result.replace('</head>', '<link rel="stylesheet" href="/css/pb-refresh.css?v=4"><link rel="stylesheet" href="/css/pb-editorial-layout.css?v=3"></head>')
    .replace('</body>', '<script src="/js/pb-navigation.js?v=3" defer></script><script src="/js/pb-editorial-events.js?v=1" defer></script></body>');
}
module.exports = { withPBSiteShell, renderSiteHeader, isPublicShellPath };
