
const https = require('https');

const photoCache = {};

async function getPlacePhoto(placeName, width = 400) {
  if (photoCache[placeName]) return photoCache[placeName];
  
  return new Promise((resolve) => {
    const query = encodeURIComponent(placeName + ' caribbean beach');
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
            photoCache[placeName] = photoUrl;
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
