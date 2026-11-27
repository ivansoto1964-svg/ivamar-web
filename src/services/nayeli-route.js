const {namedTowns, normalize} = require('./nayeli-context');

function routeRequest(message) {
  const text = normalize(message);
  const from = text.match(/\b(?:estoy en|salgo de|saliendo de|voy de|desde|de) (.+?)\b(?:y )?(?:(?:voy |vamos )?(?:hacia|para|pa l|pa|a)|rumbo a) (.+)/);
  if (!from) return null;
  const origin = namedTowns(from[1])[0];
  const destination = namedTowns(from[2].split(/\b(?:busca|buscame|donde|recomienda|quiero|necesito|consigue|puedo)\b/)[0])[0];
  if (!origin || !destination || origin[0] === destination[0]) return null;
  let search;
  if (/\b(?:cervezas?|picadera|picar|chinchorros?)\b/.test(text)) search = 'restaurantes con picadera y cerveza';
  else if (/\b(?:gasolinera|gasolina|gasolineras)\b/.test(text)) search = 'gasolineras';
  else if (/\b(?:cafe|cafecito|cafeteria)\b/.test(text)) search = 'cafeterías';
  else if (/\b(?:comer|restaurantes?|almuerzo|desayuno|cena|panaderias?)\b/.test(text)) search = 'restaurantes';
  return search ? {origin:origin[1],destination:destination[1],search} : null;
}

function directions({origin,destination}, stop) {
  const url = new URL('https://www.google.com/maps/dir/');
  url.search = new URLSearchParams({
    api:'1',origin:origin+', Puerto Rico',destination:destination+', Puerto Rico',travelmode:'driving'
  });
  if (stop) {
    url.searchParams.set('waypoints',stop.formattedAddress || stop.displayName.text);
    if (stop.id) url.searchParams.set('waypoint_place_ids',stop.id);
  }
  return url.href;
}

function mapSearch(search,destination) {
  const url = new URL('https://www.google.com/maps/search/');
  url.search = new URLSearchParams({api:'1',query:`${search} en ${destination}, Puerto Rico`});
  return url.href;
}

function seconds(value) {
  return typeof value==='string' && /^\d+(?:\.\d+)?s$/.test(value) ? Number.parseFloat(value) : null;
}

async function requestJson(fetcher,url,key,fields,body) {
  const response = await fetcher(url,{
    method:'POST',signal:AbortSignal.timeout(4500),
    headers:{'Content-Type':'application/json','X-Goog-Api-Key':key,'X-Goog-FieldMask':fields},
    body:JSON.stringify(body)
  });
  if (!response.ok) throw new Error('Google Maps status '+response.status);
  return response.json();
}

async function lookupStops(trip,{env = process.env,fetcher = fetch,now = new Date()} = {}) {
  const key = String(env.NAYELI_GOOGLE_MAPS_KEY || env.GOOGLE_PLACES_KEY || '').trim();
  const wantsBeer = trip.search.includes('cerveza');
  const links = [{label:'Ver la ruta en Google Maps',href:directions(trip)}];
  if (!key) return fallback(trip,links);
  let results;
  let duration;
  try {
    const {routes} = await requestJson(fetcher,'https://routes.googleapis.com/directions/v2:computeRoutes',key,
      'routes.duration,routes.polyline.encodedPolyline',{
        origin:{address:trip.origin+', Puerto Rico'},destination:{address:trip.destination+', Puerto Rico'},
        travelMode:'DRIVE',routingPreference:'TRAFFIC_UNAWARE'
      });
    const route = routes?.[0];
    const polyline = route?.polyline?.encodedPolyline;
    duration = seconds(route?.duration);
    if (!polyline || duration === null) return fallback(trip,links);
    results = await requestJson(fetcher,'https://places.googleapis.com/v1/places:searchText',key,
      'places.id,places.displayName,places.formattedAddress,places.businessStatus,places.currentOpeningHours,places.attributions,routingSummaries'+(wantsBeer?',places.servesBeer':''),{
        textQuery:trip.search,languageCode:'es',regionCode:'PR',pageSize:10,
        searchAlongRouteParameters:{polyline:{encodedPolyline:polyline}},
        routingParameters:{travelMode:'DRIVE',routingPreference:'TRAFFIC_UNAWARE'}
      });
  } catch (_) {
    return fallback(trip,links);
  }
  const stops = (results.places || []).flatMap((place,index)=>{
    const legs = results.routingSummaries?.[index]?.legs;
    const first = seconds(legs?.[0]?.duration);
    const last = seconds(legs?.[1]?.duration);
    if (!place.displayName?.text || place.businessStatus?.startsWith('CLOSED') || first===null || last===null) return [];
    const detour = Math.max(0,Math.round((first+last-duration)/60));
    if (detour>15 || (wantsBeer && place.servesBeer===false)) return [];
    const hours = place.currentOpeningHours;
    const arrival = now.valueOf()+first*1000;
    const closes = Date.parse(hours?.nextCloseTime);
    const opens = Date.parse(hours?.nextOpenTime);
    let schedule = hours?.openNow===true ? 'Figura abierto ahora' : hours?.openNow===false ? 'Figura cerrado ahora' : 'Horario por confirmar';
    if (hours?.openNow===true && Number.isFinite(closes)) {
      if (closes<=arrival) return [];
      schedule = 'Figura abierto a tu llegada estimada';
    } else if (hours?.openNow===false && opens>arrival) {
      return [];
    }
    return [{
      label:place.displayName.text,href:directions(trip,place),detour,
      detail:[place.formattedAddress,wantsBeer&&place.servesBeer?'Sirve cerveza':'',`+${detour} min de manejo aprox.`,schedule].filter(Boolean).join(' · '),
      attribution:(place.attributions || []).map(item=>item.provider).filter(Boolean).join(', ')
    }];
  }).sort((a,b)=>a.detour-b.detour).slice(0,3);
  if (!stops.length) return fallback(trip,links);
  return {reply:`¡Dale, pana! Mira estas paradas de ${trip.origin} a ${trip.destination}. El tiempo extra es de manejo. Confirma el horario y el menú con el negocio.`,links:[...stops,...links],mapSource:true};
}

function fallback(trip,links) {
  return {reply:`Te dejo la ruta de ${trip.origin} a ${trip.destination}, pana. En este momento no pude verificar paradas ni cuánto te desviarían.`,
    links:[...links,{label:`Buscar ${trip.search} en ${trip.destination}`,href:mapSearch(trip.search,trip.destination)}]};
}

module.exports = { routeRequest, lookupStops };
