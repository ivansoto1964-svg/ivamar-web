(() => {
  const menus = [...document.querySelectorAll('.pb-site-menu')];
  menus.forEach(menu => menu.addEventListener('toggle', () => {
    if (menu.open) menus.forEach(other => { if (other !== menu) other.open = false; });
  }));
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const open = menus.find(menu => menu.open);
    if (open) { open.open = false; open.querySelector('summary').focus(); }
  });
  document.addEventListener('click', event => {
    menus.forEach(menu => { if (!menu.contains(event.target)) menu.open = false; });
  });
})();

// A mobile selection closes its menu, including links to the current page.
document.querySelectorAll('.pb-site-panel a').forEach(link => link.addEventListener('click', () => {
  const menu = link.closest('details');
  if (menu) menu.open = false;
}));
