for (const block of document.querySelectorAll('[data-special-share]')) {
  const input = block.querySelector('input');
  const share = block.querySelector('[data-share]');
  const copy = block.querySelector('[data-copy]');
  const status = block.querySelector('[data-share-status]');

  if (navigator.share) {
    share.hidden = false;
    share.addEventListener('click', async () => {
      try {
        await navigator.share({title:block.dataset.title, url:input.value});
      } catch (error) {
        if (error.name !== 'AbortError') status.textContent = 'Puedes copiar el enlace y pegarlo en tu red.';
      }
    });
  }

  if (navigator.clipboard?.writeText) {
    copy.hidden = false;
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(input.value);
        status.textContent = 'Enlace copiado.';
      } catch {
        input.select();
        status.textContent = 'Copia el enlace seleccionado.';
      }
    });
  }
}
