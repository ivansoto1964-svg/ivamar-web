(() => {
  const options = document.querySelector('.pb-share-options');
  if (!options) return;
  const link = document.getElementById('pb-article-url');
  const status = document.getElementById('share-status');
  const nativeShare = document.getElementById('native-share');

  document.getElementById('copy-link').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(link.value);
      status.textContent = 'Enlace copiado.';
      window.gtag?.('event', 'pb_share', {method:'copiar_enlace'});
    } catch {
      link.select();
      link.focus();
      status.textContent = 'Selecciona y copia este enlace.';
    }
  });
  if (navigator.share) {
    nativeShare.hidden = false;
    nativeShare.addEventListener('click', async () => {
      try {
        await navigator.share({title:document.querySelector('h1').textContent, url:link.value});
        window.gtag?.('event', 'pb_share', {method:'menu_del_dispositivo'});
      } catch (error) {
        if (error.name !== 'AbortError') status.textContent = 'Usa Copiar enlace o elige una red.';
      }
    });
  }

  options.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !options.open) return;
    event.preventDefault();
    options.open = false;
    options.querySelector('summary').focus();
  });
})();
