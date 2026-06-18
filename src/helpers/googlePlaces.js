// Google Places (New) - Text Search helper
// Used by Nayeli's Modo Chinchorreo to find real chinchorros/restaurants/food trucks
// Adapted from nayeli-chinchorreo/src/services/places.google.js to use ivamar-web's env var name

async function searchPlacesByText(query) {
  const apiKey = process.env.GOOGLE_PLACES_KEY;

  if (!apiKey) {
    console.error('Missing GOOGLE_PLACES_KEY env variable');
    return [];
  }

  try {
    const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": [
          "places.displayName",
          "places.formattedAddress",
          "places.rating",
          "places.userRatingCount",
          "places.googleMapsUri",
          "places.websiteUri"
        ].join(",")
      },
      body: JSON.stringify({
        textQuery: query,
        maxResultCount: 5
      })
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`Google Places error ${res.status}: ${text}`);
      return [];
    }

    const data = await res.json();
    return data.places || [];
  } catch (e) {
    console.error('searchPlacesByText error:', e.message);
    return [];
  }
}

module.exports = { searchPlacesByText };
