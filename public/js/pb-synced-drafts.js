(() => {
  const prefix = 'pbControlDraftV1:';
  const blogForm = document.getElementById('blogForm');
  const latestForm = document.getElementById('latestForm');
  if (!blogForm || !latestForm || typeof apiAction !== 'function') return;

  function values(form) {
    const result = {};
    for (const field of form.elements) {
      if (!field.name || ['file', 'submit', 'button'].includes(field.type) || field.name === 'csrf') continue;
      result[field.name] = field.type === 'checkbox' ? field.checked : field.value;
    }
    return result;
  }

  function localDraft(key) {
    try {
      const raw = localStorage.getItem(prefix + key);
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  }

  function apply(form, draft) {
    for (const [name, value] of Object.entries(draft?.values || {})) {
      const field = form.elements[name];
      if (!field || field.type === 'file') continue;
      if (field.type === 'checkbox') field.checked = Boolean(value);
      else field.value = value;
    }
    if (form === latestForm) {
      const preview = document.getElementById('latestImagePreview');
      const image = String(form.elements.image?.value || '').trim();
      if (preview && image) {
        preview.src = image;
        preview.className = 'latest-image-preview show';
      }
    }
    setTimeout(() => window.pbRefreshRichEditors?.(), 0);
  }

  function keyFor(type, form) {
    if (type === 'blog') return `blog:${form.elements.originalSlug?.value || 'new'}`;
    return `latest:${form.elements.editingId?.value || 'new'}`;
  }

  function controller(type, form, status) {
    let timer = null;
    let generation = 0;
    let suspended = false;
    const coverUploads = new WeakMap();

    async function saveNow(announce = false) {
      if (suspended) return null;
      const key = keyFor(type, form);
      const currentGeneration = generation;
      let snapshot = { savedAt:new Date().toISOString(), values:values(form) };
      try {
        localStorage.setItem(prefix + key, JSON.stringify(snapshot));
      } catch (_) {}
      const imageFile = type === 'latest' ? form.elements.imageFile : null;
      const file = imageFile?.files?.[0];
      if (file) {
        status.textContent = 'Subiendo foto de portada…';
        try {
          let upload = coverUploads.get(file);
          if (!upload) {
            const publish = form.querySelector('button.primary[type="submit"]');
            const wasDisabled = publish?.disabled;
            if (publish) publish.disabled = true;
            upload = Promise.resolve().then(() => uploadLatestImage(file)).finally(() => {
              if (publish) publish.disabled = wasDisabled;
            });
            coverUploads.set(file, upload);
          }
          const image = await upload;
          if (suspended || generation !== currentGeneration || keyFor(type, form) !== key) return null;
          if (imageFile.files[0] && imageFile.files[0] !== file) return null;
          form.elements.image.value = image;
          imageFile.value = '';
          const preview = document.getElementById('latestImagePreview');
          if (preview) {
            preview.src = image;
            preview.className = 'latest-image-preview show';
          }
          // Include edits made while the photo was uploading, not just the earlier snapshot.
          snapshot = { savedAt:new Date().toISOString(), values:values(form) };
          try { localStorage.setItem(prefix + key, JSON.stringify(snapshot)); } catch (_) {}
        } catch (error) {
          coverUploads.delete(file);
          if (suspended || generation !== currentGeneration || keyFor(type, form) !== key) return null;
          status.textContent = 'No se guardó la portada. El texto sigue en este dispositivo; vuelve a guardar el borrador.';
          if (typeof show === 'function') show(error.message || 'No se pudo subir la foto de portada.', true);
          return null;
        }
      }
      status.textContent = 'Guardando borrador…';
      try {
        const result = await apiAction('control-draft-save', key, { values:snapshot.values });
        if (suspended || generation !== currentGeneration) {
          try { localStorage.removeItem(prefix + key); } catch (_) {}
          try { await apiAction('control-draft-delete', key); } catch (_) {}
          return null;
        }
        const saved = result.draft || snapshot;
        try { localStorage.setItem(prefix + key, JSON.stringify(saved)); } catch (_) {}
        const time = new Date(saved.savedAt || Date.now()).toLocaleTimeString('es-PR', { hour:'numeric', minute:'2-digit' });
        status.textContent = `✓ Borrador sincronizado ${time}`;
        if (announce && typeof show === 'function') show('Borrador guardado. Ya puedes abrirlo en otro dispositivo.');
        return saved;
      } catch (_) {
        status.textContent = 'Guardado en este dispositivo; falta conexión para sincronizar.';
        if (announce && typeof show === 'function') show('Se guardó en este dispositivo, pero no pudo sincronizarse.', true);
        return snapshot;
      }
    }

    function schedule() {
      if (suspended) return;
      clearTimeout(timer);
      timer = setTimeout(() => saveNow(false), 1400);
    }

    async function restore() {
      if (suspended) return;
      const currentGeneration = ++generation;
      const key = keyFor(type, form);
      let local = localDraft(key);
      try {
        const result = await apiAction('control-draft-get', key);
        if (generation !== currentGeneration || keyFor(type, form) !== key) return;
        const remote = result.draft;
        local = localDraft(key) || local;
        if (remote && (!local || String(remote.savedAt) > String(local.savedAt || ''))) {
          apply(form, remote);
          try { localStorage.setItem(prefix + key, JSON.stringify(remote)); } catch (_) {}
          const when = new Date(remote.savedAt).toLocaleString('es-PR', { month:'short', day:'numeric', hour:'numeric', minute:'2-digit' });
          status.textContent = `↺ Borrador sincronizado recuperado · ${when}`;
        } else if (local && (!remote || String(local.savedAt || '') > String(remote.savedAt || ''))) {
          await saveNow(false);
        }
      } catch (_) {
        if (!local) status.textContent = 'Autoguardado activo; esperando conexión para sincronizar.';
      }
    }

    async function clear() {
      suspended = true;
      clearTimeout(timer);
      generation += 1;
      const key = keyFor(type, form);
      try { localStorage.removeItem(prefix + key); } catch (_) {}
      try {
        await apiAction('control-draft-delete', key);
        status.textContent = '✓ Publicado; editor listo para una publicación nueva.';
      } catch (_) {
        status.textContent = 'Publicado; el borrador local fue eliminado.';
      }
    }

    function resume() {
      suspended = false;
    }

    form.addEventListener('input', schedule);
    form.addEventListener('change', schedule);
    new MutationObserver(() => {
      if (status.textContent.includes('Guardado definitivo')) clear();
    }).observe(status, { childList:true, characterData:true, subtree:true });
    const discard = document.createElement('button');
    discard.type = 'button';
    discard.className = 'action';
    discard.textContent = 'Limpiar para escribir algo nuevo';
    discard.addEventListener('click', async () => {
      if (!window.confirm('Se eliminará este borrador del teléfono y la computadora. ¿Continuar?')) return;
      discard.disabled = true;
      await clear();
      if (type === 'blog' && typeof resetBlogForm === 'function') resetBlogForm();
      else if (type === 'latest' && typeof resetLatestForm === 'function') resetLatestForm();
      resume();
      setTimeout(() => window.pbRefreshRichEditors?.(), 0);
      discard.disabled = false;
    });
    status.parentElement?.querySelector('.tools')?.append(discard);
    return { restore, saveNow, clear, resume };
  }

  const blog = controller('blog', blogForm, document.getElementById('blogDraftStatus'));
  const latest = controller('latest', latestForm, document.getElementById('latestDraftStatus'));
  window.pbSyncedDrafts = { blog, latest };
  blog.restore();
  latest.restore();

  document.getElementById('latestSaveDraft')?.addEventListener('click', () => latest.saveNow(true));
  document.getElementById('newBlogPost')?.addEventListener('click', () => setTimeout(blog.restore, 0));
  document.querySelectorAll('[data-edit-blog]').forEach(button => button.addEventListener('click', () => setTimeout(blog.restore, 0)));
  document.querySelectorAll('[data-jump-composer="latest"]').forEach(button => button.addEventListener('click', () => setTimeout(latest.restore, 0)));
  document.querySelectorAll('[data-edit-latest]').forEach(button => button.addEventListener('click', () => setTimeout(latest.restore, 0)));
})();
