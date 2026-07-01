const https = require('https');
const fs = require('fs');
const path = require('path');

// Persistent cache file on disk
const CACHE_FILE = '/data/photo-cache.json';

// Load cache from disk on startup
let photoCache = {};
try {
  if (fs.existsSync(CACHE_FILE)) {
    photoCache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    console.log(`[GooglePhotos] Loaded ${Object.keys(photoCache).length} cached photos from disk`);
  }
} catch(e) {
  console.log('[GooglePhotos] Starting with empty cache');
  photoCache = {};
}

// Save cache to disk
function saveCache() {
  try {
    const dir = path.dirname(CACHE_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(CACHE_FILE, JSON.stringify(photoCache, null, 2));
  } catch(e) {
    console.error('[GooglePhotos] Error saving cache:', e.message);
  }
}

async function getPlacePhoto(placeName, width = 400, searchQuery = null) {
  const cacheKey = placeName + '_' + width;

  // Return from cache if exists
  if (photoCache[cacheKey]) {
    return photoCache[cacheKey];
  }

  return new Promise((resolve) => {
    const query = encodeURIComponent(searchQuery || placeName + ' caribbean beach');
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${query}&inputtype=textquery&fields=photos&key=${process.env.GOOGLE_PLACES_KEY}`;

    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          const photo = result?.candidates?.[0]?.photos?.[0]?.photo_reference;
          if (photo) {
            const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${width}&photo_reference=${photo}&key=${process.env.GOOGLE_PLACES_KEY}`;
            // Save to memory and disk cache
            photoCache[cacheKey] = photoUrl;
            saveCache();
            console.log(`[GooglePhotos] Cached new photo for: ${placeName}`);
            resolve(photoUrl);
          } else {
            resolve(null);
          }
        } catch(e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

module.exports = { getPlacePhoto };
