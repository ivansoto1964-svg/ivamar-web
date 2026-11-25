document.addEventListener('click', event => {
  const link = event.target.closest('a[data-pb-event]');
  if (!link || typeof window.gtag !== 'function') return;
  window.gtag('event', link.dataset.pbEvent, {method:link.dataset.pbMethod});
});
