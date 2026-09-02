const TITLE_FIX = Object.freeze({
  slug:'titulo-180-000-abonados-bajo-racionamiento-la-sequia-aprieta-a-puerto-rico-562127',
  from:'Título 180,000 abonados bajo racionamiento: la sequía aprieta a Puerto Rico',
  to:'180,000 abonados bajo racionamiento: la sequía aprieta a Puerto Rico'
});

function correctKnownTitle(items) {
  let changed = false;
  const corrected = (items || []).map(item => {
    if (item?.slug !== TITLE_FIX.slug || item.title !== TITLE_FIX.from) return item;
    changed = true;
    return {...item,title:TITLE_FIX.to};
  });
  return {items:corrected,changed};
}

function updatePublished(items, id, changes, updatedAt = new Date().toISOString()) {
  const index = (items || []).findIndex(item => String(item?.id || '') === String(id || ''));
  if (index < 0) return null;
  const current = items[index];
  const sources = [{label:changes.sourceLabel,url:changes.sourceUrl},...(Array.isArray(current.sources) ? current.sources.slice(1) : [])];
  const updated = {
    ...current,
    title:changes.title,
    summary:changes.summary,
    body:changes.body,
    image:changes.image || current.image || '',
    sources,
    updatedAt
  };
  const next = items.slice();
  next[index] = updated;
  return {items:next,item:updated};
}

module.exports = {TITLE_FIX,correctKnownTitle,updatePublished};
