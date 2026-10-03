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

    async function saveNow(announce = false) {
      const key = keyFor(type, form);
      const snapshot = { savedAt:new Date().toISOString(), values:values(form) };
      try {
        localStorage.setItem(prefix + key, JSON.stringify(snapshot));
      } catch (_) {}
      status.textContent = 'Guardando borrador…';
      try {
        const result = await apiAction('control-draft-save', key, { values:snapshot.values });
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
      clearTimeout(timer);
      timer = setTimeout(() => saveNow(false), 1400);
    }

    async function restore() {
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

    form.addEventListener('input', schedule);
    form.addEventListener('change', schedule);
    return { restore, saveNow };
  }

  const blog = controller('blog', blogForm, document.getElementById('blogDraftStatus'));
  const latest = controller('latest', latestForm, document.getElementById('latestDraftStatus'));
  blog.restore();
  latest.restore();

  document.getElementById('latestSaveDraft')?.addEventListener('click', () => latest.saveNow(true));
  document.getElementById('newBlogPost')?.addEventListener('click', () => setTimeout(blog.restore, 0));
  document.querySelectorAll('[data-edit-blog]').forEach(button => button.addEventListener('click', () => setTimeout(blog.restore, 0)));
  document.querySelectorAll('[data-jump-composer="latest"]').forEach(button => button.addEventListener('click', () => setTimeout(latest.restore, 0)));
  document.querySelectorAll('[data-edit-latest]').forEach(button => button.addEventListener('click', () => setTimeout(latest.restore, 0)));
})();
