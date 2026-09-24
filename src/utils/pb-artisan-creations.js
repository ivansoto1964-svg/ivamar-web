const creationImage = item => String(typeof item === 'string' ? item : item?.image || item?.url || '').trim();

const creationHasDetails = item => Boolean(
  item && typeof item === 'object' && String(item.title || '').trim() && String(item.description || '').trim()
);

function parseGallery(value) {
  if (Array.isArray(value)) return value;
  if (typeof value !== 'string') return [];
  try {
    const parsed = JSON.parse(value || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (_) {
    return [];
  }
}

function hasRequiredDetailsForNewCreations(value, existingValue = []) {
  const existing = parseGallery(existingValue);
  const exemptHistoricalImages = new Set(
    existing.filter(item => !creationHasDetails(item)).map(creationImage).filter(Boolean)
  );
  return parseGallery(value).every(item => {
    const image = creationImage(item);
    return !image || exemptHistoricalImages.has(image) || creationHasDetails(item);
  });
}

module.exports = { creationImage, creationHasDetails, parseGallery, hasRequiredDetailsForNewCreations };
