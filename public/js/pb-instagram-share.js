(() => {
  const grid = document.querySelector('.share-grid');
  const nativeShare = document.getElementById('native-share');
  const status = document.getElementById('share-status');
  const facebookLink = grid?.querySelector('.share-fb');
  if (!grid || !status || document.getElementById('instagram-share')) return;

  const canonical = document.querySelector('link[rel="canonical"]')?.href || location.href;
  const title = document.querySelector('meta[property="og:title"]')?.content || document.title;
  const description = document.querySelector('meta[property="og:description"]')?.content || '';
  const imageUrl = document.querySelector('meta[property="og:image"]')?.content || '';
  const button = document.createElement('button');
  button.type = 'button';
  button.id = 'instagram-share';
  button.className = 'share share-instagram';
  button.textContent = 'Instagram';
  button.style.background = 'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)';
  if (nativeShare) grid.insertBefore(button, nativeShare);
  else grid.append(button);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(canonical);
      return true;
    } catch (_) {
      return false;
    }
  }

  async function shareImageFile() {
    if (!imageUrl || typeof File === 'undefined' || !navigator.canShare) return null;
    try {
      const response = await fetch(imageUrl, { credentials:'omit' });
      if (!response.ok) return null;
      const blob = await response.blob();
      if (!blob.type.startsWith('image/')) return null;
      const extension = blob.type.split('/')[1]?.replace('jpeg','jpg') || 'jpg';
      const file = new File([blob], `planeta-boricua.${extension}`, { type:blob.type });
      return navigator.canShare({ files:[file] }) ? file : null;
    } catch (_) {
      return null;
    }
  }

  if (facebookLink) {
    facebookLink.addEventListener('click', async (event) => {
      // Facebook's web sharer can redirect visitors to a broken
      // share_channel page. Avoid that flow on both computers and phones.
      event.preventDefault();
      facebookLink.setAttribute('aria-disabled', 'true');
      facebookLink.style.pointerEvents = 'none';
      if (!navigator.share) {
        window.open('https://www.facebook.com/', '_blank', 'noopener,noreferrer');
        const copied = await copyLink();
        status.textContent = copied
          ? 'Enlace copiado. Pégalo en tu publicación de Facebook.'
          : 'Facebook abrió en otra pestaña. Copia el enlace del artículo para publicarlo.';
        if (!copied) window.prompt('Copia este enlace para Facebook:', canonical);
        facebookLink.removeAttribute('aria-disabled');
        facebookLink.style.pointerEvents = '';
        return;
      }
      const copied = await copyLink();
      status.textContent = copied
        ? 'Enlace copiado. Escoge Facebook para compartirlo.'
        : 'Escoge Facebook para compartir la publicación.';
      try {
        await navigator.share({ title, text:description, url:canonical });
        status.textContent = '✅ Menú para compartir abierto.';
      } catch (error) {
        if (error?.name !== 'AbortError') {
          status.textContent = copied
            ? 'Enlace copiado. Puedes pegarlo en Facebook.'
            : 'No se pudo abrir el menú para compartir.';
        }
      } finally {
        facebookLink.removeAttribute('aria-disabled');
        facebookLink.style.pointerEvents = '';
      }
    });
  }

  button.addEventListener('click', async () => {
    button.disabled = true;
    const copied = await copyLink();
    status.textContent = copied
      ? 'Enlace copiado. Escoge Instagram y pégalo en tu historia o mensaje.'
      : 'Escoge Instagram para compartir la publicación.';
    try {
      if (navigator.share) {
        const file = await shareImageFile();
        const payload = { title, text:`${description}\n${canonical}`.trim(), url:canonical };
        if (file) payload.files = [file];
        await navigator.share(payload);
        status.textContent = '✅ Menú para compartir abierto.';
      } else {
        window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
        if (!copied) window.prompt('Copia este enlace para Instagram:', canonical);
      }
    } catch (error) {
      if (error?.name !== 'AbortError') status.textContent = copied ? 'Enlace copiado para Instagram.' : 'No se pudo abrir Instagram.';
    } finally {
      button.disabled = false;
    }
  });
})();
