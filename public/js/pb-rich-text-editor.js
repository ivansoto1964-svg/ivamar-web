(() => {
  const selectors = ['#blogForm textarea[name="content"]', '#latestForm textarea[name="body"]'];
  const allowedTags = new Set(['P', 'BR', 'H2', 'H3', 'H4', 'STRONG', 'EM', 'B', 'I', 'UL', 'OL', 'LI', 'BLOCKQUOTE', 'A', 'HR']);
  const style = document.createElement('style');
  style.textContent = '.rich-editor-shell{border:1px solid #cbd2dc;border-radius:10px;overflow:hidden;background:#fff}.rich-editor-toolbar{display:flex;flex-wrap:wrap;gap:.35rem;padding:.5rem;background:#f4f6fa;border-bottom:1px solid #dfe4eb;position:sticky;top:65px;z-index:4}.rich-editor-button{border:1px solid #c8d0dc;border-radius:6px;background:#fff;color:#002d62;padding:.48rem .62rem;font:800 .75rem system-ui;cursor:pointer}.rich-editor-button:hover,.rich-editor-button:focus{background:#e8f1ff;outline:2px solid #99b7dd}.rich-editor-area{min-height:330px;padding:1rem;font:1rem/1.7 Georgia,serif;color:#242424;outline:0}.rich-editor-area:empty:before{content:attr(data-placeholder);color:#8a94a3}.rich-editor-area h2{font-size:1.55rem;color:#002d62;border-bottom:3px solid #ce1126;padding-bottom:.3rem}.rich-editor-area h3{font-size:1.25rem;color:#002d62}.rich-editor-area a{color:#002d62;font-weight:800}.rich-editor-area blockquote{border-left:4px solid #ce1126;padding-left:1rem;color:#555}@media(max-width:760px){.rich-editor-button{flex:1 1 auto}}';
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
      [...node.attributes].forEach(attribute => node.removeAttribute(attribute.name));
      if (node.tagName === 'A') {
        if (/^(https?:\/\/|mailto:|\/)/i.test(href)) {
          node.setAttribute('href', href);
          node.setAttribute('target', '_blank');
          node.setAttribute('rel', /\bsponsored\b/i.test(originalRel) || /(?:amazon\.|amzn\.to)/i.test(href) ? 'sponsored noopener noreferrer' : 'noopener noreferrer');
        } else {
          node.replaceWith(...node.childNodes);
        }
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
