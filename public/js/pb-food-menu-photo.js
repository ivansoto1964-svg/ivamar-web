document.querySelectorAll('[data-menu-photo]').forEach(form => {
  const input = form.querySelector('input[type=file]');
  const status = form.querySelector('[data-photo-status]');
  const button = form.querySelector('button');

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (button.disabled || !input.files[0]) return;

    button.disabled = true;
    status.textContent = 'Preparando la foto…';
    let bitmap;
    try {
      bitmap = await createImageBitmap(input.files[0]);
      const scale = Math.min(1, 1800 / bitmap.width, 2200 / bitmap.height);
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(bitmap.width * scale));
      canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      const context = canvas.getContext('2d');
      context.fillStyle = '#fff';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      let photo = canvas.toDataURL('image/jpeg', 0.9).split(',')[1];
      if (photo.length > 2_000_000) photo = canvas.toDataURL('image/jpeg', 0.75).split(',')[1];
      if (photo.length > 2_000_000) throw new Error('La imagen es demasiado grande');
      form.elements.namedItem('photo').value = photo;
      status.textContent = 'Guardando la foto…';
      form.submit();
    } catch {
      status.textContent = 'No pudimos preparar esa foto. Prueba con una captura del menú.';
      button.disabled = false;
    } finally {
      bitmap?.close();
    }
  });
});
