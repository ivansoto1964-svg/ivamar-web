(() => {
  if (typeof blogForm === 'undefined' || typeof uploadLatestImage !== 'function') return;
  const imageFile = blogForm.elements.imageFile;
  if (!imageFile) return;

  const preview = document.createElement('img');
  preview.alt = 'Vista previa de la imagen del artículo';
  preview.className = 'latest-image-preview';
  imageFile.after(preview);

  imageFile.addEventListener('change', () => {
    const file = imageFile.files[0];
    if (!file) {
      preview.className = 'latest-image-preview';
      preview.removeAttribute('src');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      show('La imagen no puede superar 5 MB.', true);
      imageFile.value = '';
      preview.className = 'latest-image-preview';
      preview.removeAttribute('src');
      return;
    }
    preview.src = URL.createObjectURL(file);
    preview.className = 'latest-image-preview show';
  });

  blogForm.onsubmit = async event => {
    event.preventDefault();
    const submit = event.submitter;
    submit.disabled = true;
    try {
      const data = Object.fromEntries(new FormData(blogForm));
      data.status = submit?.value || 'published';
      const file = imageFile.files[0];
      delete data.imageFile;
      delete data.imageData;
      if (file) {
        show('Subiendo imagen…');
        data.image = await uploadLatestImage(file);
      }
      show(data.status === 'draft' ? 'Guardando borrador…' : 'Publicando…');
      const result = await apiAction('blog-save', data.originalSlug || 'new', data);
      blogDraft.clear();
      show(result.message || 'Guardado.');
      setTimeout(() => location.reload(), 600);
    } catch (error) {
      show(error.message || 'No se pudo guardar la publicación.', true);
      submit.disabled = false;
    }
  };
})();
