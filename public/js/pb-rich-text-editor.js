(() => {
  const selectors = ['#blogForm textarea[name="content"]', '#latestForm textarea[name="body"]'];
  const allowedTags = new Set(['P', 'BR', 'H2', 'H3', 'H4', 'STRONG', 'EM', 'B', 'I', 'UL', 'OL', 'LI', 'BLOCKQUOTE', 'A', 'IMG', 'FIGURE', 'FIGCAPTION', 'HR']);
  const style = document.createElement('style');
  style.textContent = '.rich-editor-shell{border:1px solid #cbd2dc;border-radius:10px;overflow:hidden;background:#fff}.rich-editor-toolbar{display:flex;flex-wrap:wrap;gap:.35rem;padding:.5rem;background:#f4f6fa;border-bottom:1px solid #dfe4eb;position:sticky;top:65px;z-index:4}.rich-editor-button{border:1px solid #c8d0dc;border-radius:6px;background:#fff;color:#002d62;padding:.48rem .62rem;font:800 .75rem system-ui;cursor:pointer}.rich-editor-button:hover,.rich-editor-button:focus{background:#e8f1ff;outline:2px solid #99b7dd}.rich-editor-area{min-height:330px;padding:1rem;font:1rem/1.7 Georgia,serif;color:#242424;outline:0}.rich-editor-area:empty:before{content:attr(data-placeholder);color:#8a94a3}.rich-editor-area h2{font-size:1.55rem;color:#002d62;border-bottom:3px solid #ce1126;padding-bottom:.3rem}.rich-editor-area h3{font-size:1.25rem;color:#002d62}.rich-editor-area a{color:#002d62;font-weight:800}.rich-editor-area blockquote{border-left:4px solid #ce1126;padding-left:1rem;color:#555}.rich-editor-area figure{max-width:100%;margin:1.4rem 0;padding:.65rem;border:1px solid #d9e0e9;border-radius:10px;background:#f8fafc;overflow:hidden}.rich-editor-area figure img{display:block;width:100%;max-width:100%;height:auto;max-height:480px;object-fit:contain;border-radius:7px;background:#eef1f5}.rich-editor-area figcaption{padding:.55rem .2rem 0;color:#5f6875;font:italic .8rem/1.45 system-ui}.rich-image-controls{display:flex;flex-wrap:wrap;gap:.35rem;margin-top:.6rem}.rich-image-controls button{border:1px solid #c8d0dc;border-radius:6px;background:#fff;color:#002d62;padding:.42rem .6rem;font:800 .72rem system-ui;cursor:pointer}.rich-image-controls button:last-child{color:#9d1a29}.rich-image-modal{position:fixed;inset:0;z-index:1000;display:none;align-items:center;justify-content:center;padding:1rem;background:#001a3ecc}.rich-image-modal.show{display:flex}.rich-image-dialog{width:min(560px,100%);max-height:92vh;overflow:auto;background:#fff;border-radius:12px;padding:1.2rem;box-shadow:0 20px 70px #0006}.rich-image-dialog h2{margin:.1rem 0;color:#002d62;font:1.45rem Georgia,serif}.rich-image-dialog p{color:#667085;font-size:.82rem;line-height:1.5}.rich-image-dialog label{display:block;margin:.8rem 0 .3rem;color:#002d62;font:800 .76rem system-ui}.rich-image-dialog input{width:100%;padding:.72rem;border:1px solid #cbd2dc;border-radius:7px;font:inherit}.rich-image-dialog .rich-image-actions{display:flex;justify-content:flex-end;gap:.6rem;margin-top:1rem}.rich-image-dialog .rich-image-actions button{border:0;border-radius:7px;padding:.7rem 1rem;font-weight:900;cursor:pointer}.rich-image-cancel{background:#e9edf2;color:#334155}.rich-image-insert{background:#ce1126;color:#fff}.rich-image-status{min-height:1.2rem;color:#9d1a29!important;font-weight:800}@media(max-width:760px){.rich-editor-button{flex:1 1 auto}.rich-image-dialog .rich-image-actions{flex-direction:column-reverse}.rich-image-dialog .rich-image-actions button{width:100%}}';
  document.head.append(style);

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, char => ({
      '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
    })[char]);
  }

  function plainTextHtml(value) {
    return String(value || '').trim().split(/\n{2,}/).filter(Boolean)
      .map(paragraph => `<p>${escapeHtml(paragraph).replace(/\n/g, '<br>')}</p>`).join('');
  }

  function cleanHtml(value) {
    const template = document.createElement('template');
    template.innerHTML = String(value || '');
    template.content.querySelectorAll('[data-pb-editor-only]').forEach(node => node.remove());
    [...template.content.querySelectorAll('*')].reverse().forEach(originalNode => {
      let node = originalNode;
      const inlineStyle = String(node.getAttribute('style') || '').toLowerCase();
      const fontSize = Number.parseFloat((inlineStyle.match(/font-size\s*:\s*([0-9.]+)px/) || [])[1] || '0');
      let semanticTag = node.tagName;
      if (semanticTag === 'H1' || ((semanticTag === 'P' || semanticTag === 'DIV') && fontSize >= 20)) semanticTag = 'H2';
      else if (semanticTag === 'DIV') semanticTag = 'P';
      else if (semanticTag === 'SPAN' && /font-style\s*:\s*italic/.test(inlineStyle)) semanticTag = 'EM';
      else if (semanticTag === 'SPAN' && /font-weight\s*:\s*(bold|[6-9]00)/.test(inlineStyle)) semanticTag = 'STRONG';
      if (semanticTag !== node.tagName) {
        const replacement = document.createElement(semanticTag.toLowerCase());
        replacement.append(...node.childNodes);
        node.replaceWith(replacement);
        node = replacement;
      }
      if (!allowedTags.has(node.tagName)) {
        node.replaceWith(...node.childNodes);
        return;
      }
      const href = node.tagName === 'A' ? String(node.getAttribute('href') || '').trim() : '';
      const originalRel = node.tagName === 'A' ? String(node.getAttribute('rel') || '') : '';
      const image = node.tagName === 'IMG' ? {
        src:String(node.getAttribute('src') || '').trim(),
        alt:String(node.getAttribute('alt') || '').trim().slice(0, 300),
        title:String(node.getAttribute('title') || '').trim().slice(0, 300)
      } : null;
      [...node.attributes].forEach(attribute => node.removeAttribute(attribute.name));
      if (node.tagName === 'A') {
        if (/^(https?:\/\/|mailto:|\/)/i.test(href)) {
          node.setAttribute('href', href);
          node.setAttribute('target', '_blank');
          node.setAttribute('rel', /\bsponsored\b/i.test(originalRel) || /(?:amazon\.|amzn\.to)/i.test(href) ? 'sponsored noopener noreferrer' : 'noopener noreferrer');
        } else {
          node.replaceWith(...node.childNodes);
        }
      } else if (node.tagName === 'IMG') {
        if (!/^(https?:\/\/|\/media\/pb-blog\/|\/img\/)/i.test(image.src)) {
          node.remove();
          return;
        }
        node.setAttribute('src', image.src);
        node.setAttribute('alt', image.alt);
        if (image.title) node.setAttribute('title', image.title);
        node.setAttribute('loading', 'lazy');
      }
    });
    return template.innerHTML;
  }

  function normalizedHtml(value) {
    const raw = String(value || '').trim();
    return /<\/?[a-z][\s\S]*>/i.test(raw) ? cleanHtml(raw) : plainTextHtml(raw);
  }

  function insertHtml(html) {
    document.execCommand('insertHTML', false, html);
  }

  function makeButton(label, title, action) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'rich-editor-button';
    button.textContent = label;
    button.title = title;
    button.setAttribute('aria-label', title);
    button.addEventListener('mousedown', event => event.preventDefault());
    button.addEventListener('click', action);
    return button;
  }

  function directEditorBlock(editor, node) {
    let block = node?.nodeType === Node.ELEMENT_NODE ? node : node?.parentElement;
    while (block && block.parentElement !== editor) block = block.parentElement;
    return block?.parentElement === editor ? block : null;
  }

  function meaningfulSibling(figure, direction) {
    let sibling = direction < 0 ? figure.previousElementSibling : figure.nextElementSibling;
    while (sibling && sibling.tagName === 'P' && !sibling.textContent.trim()) {
      sibling = direction < 0 ? sibling.previousElementSibling : sibling.nextElementSibling;
    }
    return sibling;
  }

  function decorateFigures(editor, sync) {
    editor.querySelectorAll('figure').forEach(figure => {
      figure.contentEditable = 'false';
      if (figure.querySelector('[data-pb-editor-only]')) return;
      const controls = document.createElement('div');
      controls.className = 'rich-image-controls';
      controls.dataset.pbEditorOnly = 'true';
      const move = (label, title, direction) => makeButton(label, title, () => {
        const sibling = meaningfulSibling(figure, direction);
        if (!sibling) return;
        if (direction < 0) sibling.before(figure); else sibling.after(figure);
        sync();
      });
      const remove = makeButton('Eliminar', 'Eliminar esta imagen del artículo', () => {
        if (!window.confirm('¿Eliminar esta imagen del cuerpo del artículo?')) return;
        figure.remove();
        sync();
      });
      controls.append(move('↑ Subir', 'Mover imagen hacia arriba', -1), move('↓ Bajar', 'Mover imagen hacia abajo', 1), remove);
      figure.append(controls);
    });
  }

  let imageModal;
  function openImageModal(editor, sync) {
    const selection = window.getSelection();
    const anchor = selection?.rangeCount && editor.contains(selection.getRangeAt(0).commonAncestorContainer)
      ? directEditorBlock(editor, selection.getRangeAt(0).commonAncestorContainer)
      : null;
    if (!imageModal) {
      const overlay = document.createElement('div');
      overlay.className = 'rich-image-modal';
      overlay.innerHTML = '<form class="rich-image-dialog"><h2>Insertar imagen en el artículo</h2><p>La imagen se colocará después del párrafo seleccionado. Puedes repetir este proceso para añadir varias.</p><label>Imagen (JPG, PNG o WebP; máx. 5 MB)</label><input name="file" type="file" accept="image/jpeg,image/png,image/webp" required><label>Texto alternativo (ALT)</label><input name="alt" maxlength="300" required placeholder="Describe brevemente lo que aparece"><label>Pie de foto (opcional)</label><input name="caption" maxlength="500" placeholder="Explica la imagen al lector"><label>Crédito o fuente (opcional)</label><input name="credit" maxlength="300" placeholder="Foto: nombre / Fuente: organización"><p class="rich-image-status" role="status" aria-live="polite"></p><div class="rich-image-actions"><button class="rich-image-cancel" type="button">Cancelar</button><button class="rich-image-insert" type="submit">Subir e insertar</button></div></form>';
      document.body.append(overlay);
      imageModal = { overlay, form:overlay.querySelector('form'), active:null };
      imageModal.form.querySelector('.rich-image-cancel').addEventListener('click', () => overlay.classList.remove('show'));
      overlay.addEventListener('click', event => { if (event.target === overlay) overlay.classList.remove('show'); });
      imageModal.form.addEventListener('submit', async event => {
        event.preventDefault();
        const current = imageModal.active;
        const file = imageModal.form.elements.file.files[0];
        const alt = imageModal.form.elements.alt.value.trim();
        const caption = imageModal.form.elements.caption.value.trim();
        const credit = imageModal.form.elements.credit.value.trim();
        const status = imageModal.form.querySelector('.rich-image-status');
        const submit = imageModal.form.querySelector('.rich-image-insert');
        if (!current || !file || !alt) return;
        if (!/^image\/(jpeg|png|webp)$/.test(file.type) || file.size > 5 * 1024 * 1024) {
          status.textContent = 'Selecciona una imagen JPG, PNG o WebP de hasta 5 MB.';
          return;
        }
        if (typeof uploadLatestImage !== 'function') {
          status.textContent = 'El cargador de imágenes no está disponible. Recarga PB Control.';
          return;
        }
        submit.disabled = true;
        status.textContent = 'Subiendo imagen…';
        try {
          const src = await uploadLatestImage(file);
          const figure = document.createElement('figure');
          const img = document.createElement('img');
          img.src = src;
          img.alt = alt;
          img.loading = 'lazy';
          figure.append(img);
          if (caption || credit) {
            const figcaption = document.createElement('figcaption');
            if (caption) figcaption.append(document.createTextNode(caption));
            if (caption && credit) figcaption.append(document.createTextNode(' · '));
            if (credit) {
              const strong = document.createElement('strong');
              strong.textContent = 'Crédito/Fuente: ';
              figcaption.append(strong, document.createTextNode(credit));
            }
            figure.append(figcaption);
          }
          const spacer = document.createElement('p');
          spacer.append(document.createElement('br'));
          if (current.anchor?.isConnected && current.anchor.parentElement === current.editor) current.anchor.after(figure, spacer);
          else current.editor.append(figure, spacer);
          decorateFigures(current.editor, current.sync);
          current.sync();
          overlay.classList.remove('show');
          current.editor.focus();
        } catch (error) {
          status.textContent = error.message || 'No se pudo subir la imagen.';
        } finally {
          submit.disabled = false;
        }
      });
    }
    imageModal.form.reset();
    imageModal.form.querySelector('.rich-image-status').textContent = '';
    imageModal.active = { editor, sync, anchor };
    imageModal.overlay.classList.add('show');
    imageModal.form.elements.file.focus();
  }

  function enhance(textarea) {
    if (!textarea || textarea.dataset.richEditorReady) return null;
    textarea.dataset.richEditorReady = 'true';
    textarea.required = false;
    textarea.hidden = true;

    const shell = document.createElement('div');
    shell.className = 'rich-editor-shell';
    const toolbar = document.createElement('div');
    toolbar.className = 'rich-editor-toolbar';
    toolbar.setAttribute('role', 'toolbar');
    toolbar.setAttribute('aria-label', 'Formato del texto');
    const editor = document.createElement('div');
    editor.className = 'rich-editor-area';
    editor.contentEditable = 'true';
    editor.setAttribute('role', 'textbox');
    editor.setAttribute('aria-multiline', 'true');
    editor.dataset.placeholder = 'Escribe o pega aquí el contenido. El formato se conservará.';

    function sync() {
      const text = editor.textContent.replace(/\u00a0/g, ' ').trim();
      textarea.value = text ? cleanHtml(editor.innerHTML) : '';
      textarea.dispatchEvent(new Event('input', { bubbles:true }));
    }

    function focusAndRun(command, value) {
      editor.focus();
      document.execCommand(command, false, value);
      sync();
    }

    toolbar.append(
      makeButton('B', 'Negrita', () => focusAndRun('bold')),
      makeButton('I', 'Cursiva', () => focusAndRun('italic')),
      makeButton('Título', 'Título grande', () => focusAndRun('formatBlock', 'h2')),
      makeButton('Subtítulo', 'Subtítulo', () => focusAndRun('formatBlock', 'h3')),
      makeButton('• Lista', 'Lista con viñetas', () => focusAndRun('insertUnorderedList')),
      makeButton('1. Lista', 'Lista numerada', () => focusAndRun('insertOrderedList')),
      makeButton('📷 Imagen', 'Insertar imagen entre párrafos', () => openImageModal(editor, sync)),
      makeButton('🔗 Enlace', 'Añadir enlace', () => {
        editor.focus();
        const selection = window.getSelection();
        const selectedText = selection ? selection.toString().trim() : '';
        const href = window.prompt('Pega el enlace completo:');
        if (!href) return;
        const safeHref = href.trim();
        if (!/^(https?:\/\/|mailto:|\/)/i.test(safeHref)) {
          window.alert('Usa un enlace que comience con https://, mailto: o /.');
          return;
        }
        const label = selectedText || window.prompt('Texto visible del enlace:', safeHref) || safeHref;
        const affiliate = /(?:amazon\.|amzn\.to)/i.test(safeHref);
        const disclosure = affiliate ? ' <em>(enlace afiliado)</em>' : '';
        const rel = affiliate ? 'sponsored noopener noreferrer' : 'noopener noreferrer';
        insertHtml(`<a href="${escapeHtml(safeHref)}" target="_blank" rel="${rel}">${escapeHtml(label)}</a>${disclosure}`);
        sync();
      })
    );

    function refresh() {
      editor.innerHTML = normalizedHtml(textarea.value);
      decorateFigures(editor, sync);
    }

    editor.addEventListener('input', sync);
    editor.addEventListener('blur', sync);
    editor.addEventListener('paste', event => {
      event.preventDefault();
      const clipboard = event.clipboardData;
      const pastedHtml = clipboard && clipboard.getData('text/html');
      const pastedText = clipboard && clipboard.getData('text/plain');
      insertHtml(pastedHtml ? cleanHtml(pastedHtml) : plainTextHtml(pastedText));
      sync();
    });
    textarea.form.addEventListener('submit', event => {
      sync();
      if (!textarea.value.trim()) {
        event.preventDefault();
        editor.focus();
        if (typeof show === 'function') show('Escribe el contenido antes de publicar.', true);
      }
    }, true);

    shell.append(toolbar, editor);
    textarea.after(shell);
    refresh();
    return { refresh, sync };
  }

  const editors = selectors.map(selector => enhance(document.querySelector(selector))).filter(Boolean);
  window.pbRefreshRichEditors = () => editors.forEach(editor => editor.refresh());
  document.getElementById('newBlogPost')?.addEventListener('click', () => setTimeout(window.pbRefreshRichEditors, 0));
  document.querySelectorAll('[data-edit-blog]').forEach(button => button.addEventListener('click', () => setTimeout(window.pbRefreshRichEditors, 0)));
})();
