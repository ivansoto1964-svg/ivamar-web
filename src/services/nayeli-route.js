const {namedTowns, normalize} = require('./nayeli-context');

function routeRequest(message) {
  const text = normalize(message);
  const towns = namedTowns(text).map(([,name])=>{
    const label = normalize(name);
    const start = (' '+text+' ').indexOf(' '+label+' ');
    return {name,start,end:start+label.length};
  }).sort((a,b)=>a.start-b.start);
  if (towns.length<2) return null;

  const pair = towns.slice(0,-1).map((first,index)=>{
    const second = towns[index+1];
    const lead = text.slice(0,first.start);
    const between = text.slice(first.end,second.start).trim().replace(/^(?:puerto rico|pr)\b/,'').trim();
    if (/\b(?:saliendo de|salgo de|desde)$/.test(between)) {
      return {origin:second.name,destination:first.name};
    }
    if (/\b(?:a|hacia|para|pa|pa l|pa la)$/.test(between)
      || (/\bentre\s*$/.test(lead) && /^(?:e|y)$/.test(between))
      || (/\b(?:ruta|trayecto)\s*$/.test(lead) && /^(?:e|y)?$/.test(between))) {
      return {origin:first.name,destination:second.name};
    }
    return null;
  }).find(Boolean);
  if (!pair) return null;
  let search;
  if (/\b(?:cervezas?|cervecerias?|chinchorros?)\b/.test(text)) search = 'restaurantes con picadera y cerveza';
  else if (/\b(?:gasolineras?|gasolina)\b/.test(text)) search = 'gasolineras';
  else if (/\b(?:cafe|cafecito|cafeterias?)\b/.test(text)) search = 'cafeterías';
  else if (/\b(?:comer|comida|picadera|picar|restaurantes?|almuerzo|desayuno|cena|panaderias?)\b/.test(text)) search = 'restaurantes';
  if (!search) return null;
  const minutes = text.match(/\b(?:maximo(?: de)?|hasta|(?:no |sin )?(?:mas de)|menos de) (\d{1,3}) (?:minutos?|mins?)\b/)?.[1];
  return minutes===undefined ? {...pair,search} : {...pair,search,maxDetourMinutes:Number(minutes)};
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
  if (!response.ok) {
    const payload = typeof response.json==='function' ? await response.json().catch(()=>null) : null;
    const reason = payload?.error?.details?.find(item=>typeof item.reason==='string')?.reason;
    const safeReason = /^[A-Z][A-Z0-9_]{2,70}$/.test(reason || '') ? ' '+reason : '';
    const service = url.includes('routes.googleapis.com') ? 'Routes' : 'Places';
    throw new Error(service+' HTTP '+response.status+safeReason);
  }
  return response.json();
}

async function lookupStops(trip,{env = process.env,fetcher = fetch,now = new Date(),onStatus = ()=>{}} = {}) {
  const key = String(env.NAYELI_GOOGLE_MAPS_KEY || env.GOOGLE_MAPS_API_KEY || env.GOOGLE_PLACES_KEY || '').trim();
  const wantsBeer = trip.search.includes('cerveza');
  const maxDetourMinutes = trip.maxDetourMinutes ?? 15;
  const links = [{label:'Ver la ruta en Google Maps',href:directions(trip)}];
  if (!key) {
    onStatus('missing_key');
    return fallback(trip,links);
  }
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
    if (!polyline || duration === null) {
      onStatus('no_route');
      return fallback(trip,links);
    }
    results = await requestJson(fetcher,'https://places.googleapis.com/v1/places:searchText',key,
      'places.id,places.displayName,places.formattedAddress,places.businessStatus,places.currentOpeningHours,places.attributions,routingSummaries'+(wantsBeer?',places.servesBeer':''),{
        textQuery:trip.search,languageCode:'es',regionCode:'PR',pageSize:10,
        searchAlongRouteParameters:{polyline:{encodedPolyline:polyline}},
        routingParameters:{travelMode:'DRIVE',routingPreference:'TRAFFIC_UNAWARE'}
      });
  } catch (error) {
    onStatus(/^(?:Routes|Places) HTTP [0-9]{3}(?: [A-Z0-9_]+)?$/.test(error.message) ? error.message : 'timeout_or_network_or_invalid_response');
    return fallback(trip,links);
  }
  const stops = (results.places || []).flatMap((place,index)=>{
    const legs = results.routingSummaries?.[index]?.legs;
    const first = seconds(legs?.[0]?.duration);
    const last = seconds(legs?.[1]?.duration);
    if (!place.displayName?.text || place.businessStatus?.startsWith('CLOSED') || first===null || last===null) return [];
    const extraSeconds = Math.max(0,first+last-duration);
    const detour = Math.round(extraSeconds/60);
    if (extraSeconds>maxDetourMinutes*60 || (wantsBeer && place.servesBeer===false)) return [];
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
  onStatus(stops.length ? 'verified_stops '+stops.length : 'no_verified_stops; candidates '+(results.places || []).length);
  if (!stops.length) return fallback(trip,links,{searched:true});
  return {reply:`¡Dale, pana! Mira estas paradas de ${trip.origin} a ${trip.destination}. El tiempo extra es de manejo. Confirma el horario y el menú con el negocio.`,links:[...stops,...links],mapSource:true};
}

function fallback(trip,links,{searched = false} = {}) {
  const detail = searched && trip.maxDetourMinutes!==undefined
    ? `No encontré paradas verificadas con un desvío de hasta ${trip.maxDetourMinutes} minutos.`
    : 'En este momento no pude verificar paradas ni cuánto te desviarían.';
  return {reply:`Te dejo la ruta de ${trip.origin} a ${trip.destination}, pana. ${detail}`,
    links:[...links,{label:`Buscar ${trip.search} en ${trip.destination}`,href:mapSearch(trip.search,trip.destination)}]};
}

module.exports = { routeRequest, lookupStops };
