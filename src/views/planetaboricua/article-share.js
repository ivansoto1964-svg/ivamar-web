const { navIcon } = require('./nav-icons');

function renderArticleShare(title, canonical) {
  const url = encodeURIComponent(canonical);
  const label = encodeURIComponent(title);
  const text = encodeURIComponent(title + ' ' + canonical);
  return `<div class="pb-article-share" aria-label="Comparte esta publicación">
    <a class="pb-share-primary pb-share-whatsapp" href="https://wa.me/?text=${text}" target="_blank" rel="noopener noreferrer" data-pb-event="pb_share" data-pb-method="whatsapp">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 0 1-13 8l-5 1 1-5a9 9 0 1 1 17-4Z"/><path d="M8 8c1-1 2 1 2 2l-1 1a7 7 0 0 0 3 3l1-1c1 0 3 1 2 2-2 3-10-5-7-7Z"/></svg>WhatsApp
    </a>
    <details class="pb-share-options">
      <summary class="pb-share-primary">${navIcon('share')}Compartir</summary>
      <div class="pb-share-panel">
        <div class="share-grid">
          <button class="share share-copy" type="button" id="copy-link">Copiar enlace</button>
          <button class="share share-more" type="button" id="native-share" hidden>Más opciones</button>
          <a class="share share-fb" href="https://www.facebook.com/sharer/sharer.php?u=${url}" target="_blank" rel="noopener noreferrer" data-pb-event="pb_share" data-pb-method="facebook">Facebook</a>
          <a class="share share-x" href="https://twitter.com/intent/tweet?text=${label}&amp;url=${url}" target="_blank" rel="noopener noreferrer" data-pb-event="pb_share" data-pb-method="x">X</a>
          <a class="share share-threads" href="https://www.threads.net/intent/post?text=${text}" target="_blank" rel="noopener noreferrer" data-pb-event="pb_share" data-pb-method="threads">Threads</a>
          <a class="share share-tg" href="https://t.me/share/url?url=${url}&amp;text=${label}" target="_blank" rel="noopener noreferrer" data-pb-event="pb_share" data-pb-method="telegram">Telegram</a>
          <a class="share share-mail" href="mailto:?subject=${label}&amp;body=${text}" data-pb-event="pb_share" data-pb-method="correo">Correo</a>
        </div>
        <label class="pb-share-link-label" for="pb-article-url">Enlace de la publicación</label>
        <input id="pb-article-url" type="url" value="${canonical}" readonly>
        <p class="form-status" id="share-status" role="status" aria-live="polite"></p>
      </div>
    </details>
  </div><script src="/js/pb-article-share.js?v=1" defer></script>`;
}

module.exports = { renderArticleShare };
