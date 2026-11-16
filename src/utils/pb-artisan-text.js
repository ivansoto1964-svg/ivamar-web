const decodeStoredText = value => String(value || '').replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (match, entity) => {
  const named = {amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:' '};
  const key = entity.toLowerCase();
  if (key.startsWith('#')) {
    const codePoint = key.startsWith('#x') ? parseInt(key.slice(2), 16) : parseInt(key.slice(1), 10);
    return codePoint <= 0x10ffff ? String.fromCodePoint(codePoint) : match;
  }
  return named[key] || match;
});
const esc = value => String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

module.exports = { decodeStoredText, esc };
