(() => {
  const MAX_IMAGES = 5;
  const MAX_BYTES = 5 * 1024 * 1024;
  const TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

  const init = () => document.querySelectorAll('[data-pb-gallery-editor]').forEach(editor => {
    const input = editor.querySelector('[data-pb-gallery-files]');
    const hidden = editor.querySelector('[data-pb-gallery-value]');
    const preview = editor.querySelector('[data-pb-gallery-preview]');
    const status = editor.querySelector('[data-pb-gallery-status]');
    if (!input || !hidden || !preview || !status) return;

    let images = [];
    try { images = JSON.parse(hidden.value || '[]'); } catch (_) {}
    images = [...new Set(Array.isArray(images) ? images.filter(value => /^https:\/\//.test(String(value))) : [])].slice(0, MAX_IMAGES);

    const sync = () => {
      hidden.value = JSON.stringify(images);
      preview.replaceChildren(...images.map((url, index) => {
        const card = document.createElement('div');
        card.className = 'pb-gallery-thumb';
        const image = document.createElement('img');
        image.src = url;
        image.alt = `Foto adicional ${index + 1}`;
        image.loading = 'lazy';
        image.width = 160;
        image.height = 120;
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.textContent = 'Quitar';
        remove.setAttribute('aria-label', `Quitar foto adicional ${index + 1}`);
        remove.addEventListener('click', () => { images.splice(index, 1); status.textContent = 'Foto eliminada. Guarda los cambios para confirmar.'; sync(); });
        card.append(image, remove);
        return card;
      }));
      input.disabled = images.length >= MAX_IMAGES;
    };

    const upload = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('No se pudo leer la imagen.'));
      reader.onload = async () => {
        try {
          const response = await fetch('/api/upload-photo', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({data:reader.result}) });
          const data = await response.json();
          if (!response.ok || !data.ok) throw new Error(data.error || 'No se pudo subir la imagen.');
          resolve(data.url);
        } catch (error) { reject(error); }
      };
      reader.readAsDataURL(file);
    });

    input.addEventListener('change', async () => {
      const available = MAX_IMAGES - images.length;
      const selected = [...input.files].slice(0, available);
      input.value = '';
      if (!selected.length) return;
      for (const file of selected) {
        if (!TYPES.has(file.type)) { status.textContent = 'Usa solamente imágenes JPG, PNG o WebP.'; continue; }
        if (file.size > MAX_BYTES) { status.textContent = 'Cada imagen debe pesar 5 MB o menos.'; continue; }
        status.textContent = `Subiendo ${images.length + 1} de ${MAX_IMAGES}…`;
        try { images.push(await upload(file)); sync(); }
        catch (error) { status.textContent = `❌ ${error.message}`; break; }
      }
      if (images.length) status.textContent = `✅ ${images.length} foto${images.length === 1 ? '' : 's'} adicional${images.length === 1 ? '' : 'es'} lista${images.length === 1 ? '' : 's'}.`;
    });
    sync();
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
