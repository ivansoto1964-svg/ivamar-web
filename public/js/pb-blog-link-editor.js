(() => {
  const editor = document.querySelector('#blogForm textarea[name="content"]');
  const label = editor && editor.parentElement.querySelector('label');
  if (!editor || !label) return;

  const heading = document.createElement('div');
  const button = document.createElement('button');
  const help = document.createElement('p');

  heading.style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:.6rem';
  button.className = 'action';
  button.type = 'button';
  button.textContent = '🔗 Añadir enlace';
  help.style.cssText = 'font-size:.68rem;color:#667085;margin:0';
  help.textContent = 'Selecciona una frase dentro del contenido y pulsa el botón.';

  label.parentNode.insertBefore(heading, label);
  heading.append(label, button);
  heading.after(help);

  button.addEventListener('click', () => {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    if (start === end) {
      alert('Primero selecciona las palabras que quieres convertir en enlace.');
      editor.focus();
      return;
    }

    const url = prompt('Pega el enlace completo:', 'https://');
    if (!url) return;

    let parsed;
    try {
      parsed = new URL(url);
    } catch (_) {
      alert('Ese enlace no parece válido. Debe comenzar con https://');
      return;
    }
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      alert('Solo se permiten enlaces que comiencen con http:// o https://');
      return;
    }

    const affiliate = confirm(
      '¿Es un enlace de afiliado, como Amazon? Pulsa OK si es afiliado o Cancelar si es un enlace normal.'
    );
    const safeUrl = url.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    const selected = editor.value.slice(start, end);
    const rel = affiliate ? 'sponsored noopener noreferrer' : 'noopener noreferrer';
    const markup = '<a href="' + safeUrl + '" target="_blank" rel="' + rel + '">' +
      selected + '</a>' + (affiliate ? ' <em>(enlace afiliado)</em>' : '');

    editor.setRangeText(markup, start, end, 'end');
    editor.dispatchEvent(new Event('input', { bubbles:true }));
    editor.focus();
    if (typeof show === 'function') show(affiliate ? 'Enlace afiliado añadido.' : 'Enlace añadido.');
  });
})();
