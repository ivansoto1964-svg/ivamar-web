const assert = require('node:assert/strict');
const test = require('node:test');
const {compileFunction} = require('node:vm');
const {routeRequest,lookupStops} = require('../src/services/nayeli-route');
const {buildNayeliContext} = require('../src/services/nayeli-context');
const render = require('../src/views/pb-nayeli-preview');

const now = new Date('2026-11-27T20:00:00Z');

test('a town question prioritizes the actual PB guide, travel articles and current agenda', ()=>{
  const context = buildNayeliContext({
    message:'¿Qué puedo hacer esta tarde en Arecibo?',now,
    posts:[{slug:'credito',title:'Cómo establecer crédito en Florida',excerpt:'Qué hacer esta tarde'}],
    tourism:[{slug:'viaje-1234',title:'Paseo por Arecibo',summary:'El casco y la costa'}],
    events:[
      {name:'Festival viejo',city:'Arecibo',startDate:'2026-10-24',url:'/agenda-boricua/festival-viejo'},
      {name:'Festival nuevo',city:'Arecibo',startDate:'2026-11-28',url:'/agenda-boricua/festival-nuevo'}
    ]
  });
  assert.match(context,/\/pueblos\/arecibo\//);
  assert.match(context,/Cueva Ventana/);
  assert.match(context,/\/turistiando\/viaje-1234/);
  assert.match(context,/\/agenda-boricua\/festival-nuevo/);
  assert.doesNotMatch(context,/Festival viejo|crédito en Florida/);
});

test('routes use both municipalities and only display verified nearby results',async ()=>{
  const trip = routeRequest('Estoy en Camuy, voy a Isabela, búscame un sitio con cerveza y algo para picar');
  assert.deepEqual(trip,{origin:'Camuy',destination:'Isabela',search:'restaurantes con picadera y cerveza'});
  for (const question of [
    'Entre Camuy e Isabela, búscame un sitio de picadera y cerveza',
    'Voy de Camuy a Isabela. ¿Dónde paro a tomar cerveza?',
    'Voy a Isabela saliendo de Camuy, ¿dónde paro por cerveza?',
    'Isabela desde Camuy, ¿dónde paro a tomar cerveza?',
    'Camuy. Voy pa’ Isabela. ¿Una parada con cerveza?',
    'En la ruta Camuy–Isabela, ¿dónde hay chinchorros?'
  ]) {
    assert.deepEqual(routeRequest(question),trip,question);
  }
  assert.deepEqual(routeRequest('¿Un lugar para comer entre Camuy e Isabela?'),{
    origin:'Camuy',destination:'Isabela',search:'restaurantes'
  });
  assert.equal(routeRequest('¿Qué restaurantes hay en Camuy e Isabela?'),null);
  assert.equal(routeRequest('¿Qué puedo hacer en Camuy?'),null);
  const places = [
    {displayName:{text:'Opción lejos'},servesBeer:true},
    {id:'nearby-place',displayName:{text:'Chinchorro de prueba'},servesBeer:true,currentOpeningHours:{openNow:true,nextCloseTime:'2026-11-28T00:00:00Z'}},
    {displayName:{text:'Cierra pronto'},servesBeer:true,currentOpeningHours:{openNow:true,nextCloseTime:'2026-11-27T20:01:00Z'}}
  ];
  const legs = a=>({legs:[{duration:a+'s'},{duration:'1200s'}]});
  const fetcher = async (url,request) => {
    if (url.includes('computeRoutes')) return {ok:true,json:async()=>({routes:[{duration:'1800s',polyline:{encodedPolyline:'test-polyline'}}]})};
    assert.equal(JSON.parse(request.body).searchAlongRouteParameters.polyline.encodedPolyline,'test-polyline');
    return {ok:true,json:async()=>({places,routingSummaries:[legs(1700),legs(780),legs(660)]})};
  };
  const result = await lookupStops(trip,{env:{NAYELI_GOOGLE_MAPS_KEY:'fake'},now,fetcher});
  assert.equal(result.mapSource,true);
  assert.equal(result.links.length,2);
  assert.match(result.links[0].detail,/\+3 min de manejo aprox.*abierto a tu llegada/);
  assert.equal(new URL(result.links[0].href).searchParams.get('waypoint_place_ids'),'nearby-place');
  const fallback = await lookupStops(trip,{env:{},fetcher:()=>assert.fail('no key')});
  assert.match(fallback.reply,/no pude verificar paradas/);
  assert.match(fallback.links[0].href,/google.com\/maps\/dir/);
  assert.match(fallback.links[1].href,/google.com\/maps\/search/);
  const statuses = [];
  const unavailable = await lookupStops(trip,{
    env:{GOOGLE_MAPS_API_KEY:'fake'},
    fetcher:async()=>({ok:false,status:403,json:async()=>({error:{details:[{reason:'SERVICE_DISABLED',metadata:{key:'secret'}}]}})}),
    onStatus:value=>statuses.push(value)
  });
  assert.deepEqual(unavailable,fallback);
  assert.deepEqual(statuses,['Routes HTTP 403 SERVICE_DISABLED']);
});

test('the private mobile view uses the supplied portrait and presents quick tests',()=>{
  const html = render({enabled:true,hasApiKey:true});
  assert.match(html,/nayeli-soto-cruz\.webp/);
  assert.match(html,/Nayeli Soto Cruz/);
  assert.match(html,/Camuy y voy a Isabela/);
  assert.doesNotThrow(()=>compileFunction(html.split('<script>')[1].split('</script>')[0]));
});

test('the chat turns spaced and escaped Markdown into verified, unique links',()=>{
  const html = render({enabled:false});
  const script = html.split('<script>')[1].split('</script>')[0];
  const node = () => ({
    children:[],
    append(...parts){this.children.push(...parts);},
    appendChild(part){this.append(part);}
  });
  const conversation = node();
  const document = {
    createElement(tag){return {tag,...node()};},
    getElementById(){return conversation;},
    querySelectorAll(){return [];}
  };
  const bubble = compileFunction(script+'\nreturn bubble;', ['document','location'])(document,new URL('https://www.masboricuaqueunmofongo.com/pb-control/nayeli'));
  bubble('assistant',String.raw`[Cueva Ventana]\( /pueblos/arecibo/ \) y [el faro]( /pueblos/arecibo/ ). [Lee la crónica](/blog/arecibo) o [este enlace](https://example.com/).`,{
    allowedPaths:['/pueblos/arecibo/','/blog/arecibo']
  });
  const children = conversation.children[0].children;
  assert.deepEqual(children.filter(part=>part.tag==='a').map(link=>[link.textContent,new URL(link.href).pathname]),[
    ['Cueva Ventana','/pueblos/arecibo/'],['Lee la crónica','/blog/arecibo']
  ]);
  assert.ok(children.includes('el faro'));
  assert.ok(children.includes('este enlace'));
});

test('a Saturday question cannot surface the Hatillo festival held on Sunday',()=>{
  const events = [
    {name:'Festival Lágrimas de Monte',city:'Hatillo',venue:'Hacienda Doña Fela',startDate:'2026-11-29',url:'/agenda-boricua/festival-lagrimas-de-monte-20261129'},
    {name:'Plan de sábado',city:'Hatillo',startDate:'2026-11-28',url:'/agenda-boricua/plan-de-sabado'},
    {name:'Evento del próximo mes',city:'Hatillo',startDate:'2026-12-12'}
  ];
  const saturday = buildNayeliContext({message:'¿Qué hay este sábado cerca de Hatillo?',events,now});
  assert.match(saturday,/FECHA SOLICITADA: sábado, 28 de noviembre de 2026/);
  assert.match(saturday,/Plan de sábado — sábado, 28 de noviembre de 2026/);
  assert.doesNotMatch(saturday,/Festival Lágrimas de Monte|Evento del próximo mes/);
  const none = buildNayeliContext({message:'¿Qué hay este sábado cerca de Hatillo?',events:[events[0]],now});
  assert.match(none,/AGENDA: no se encontraron actividades/);
  const sunday = buildNayeliContext({message:'¿Qué hay este domingo cerca de Hatillo?',events,now:new Date('2026-11-28T02:00:00Z')});
  assert.match(sunday,/FECHA LOCAL DE PUERTO RICO: viernes, 27 de noviembre de 2026/);
  assert.match(sunday,/Festival Lágrimas de Monte — domingo, 29 de noviembre de 2026 — Hacienda Doña Fela/);
  const weekend = buildNayeliContext({message:'¿Qué hay este fin de semana cerca de Hatillo?',events,now});
  assert.match(weekend,/Plan de sábado/);
  assert.match(weekend,/Festival Lágrimas de Monte/);
});

test('route stops honor the requested maximum instead of rounding before filtering',async ()=>{
  const trip = routeRequest('Salgo de Camuy y voy pa’ Isabela. ¿Dónde puedo picar algo y tomarme una cerveza sin desviarme más de 10 minutos?');
  assert.equal(trip.maxDetourMinutes,10);
  const fetcher = async url=>{
    if (url.includes('computeRoutes')) return {ok:true,json:async()=>({routes:[{duration:'1800s',polyline:{encodedPolyline:'test'}}]})};
    return {ok:true,json:async()=>({
      places:[{displayName:{text:'Dentro del límite'}},{displayName:{text:'Sobre el límite'}}],
      routingSummaries:[600,601].map(extra=>({legs:[{duration:'600s'},{duration:(1200+extra)+'s'}]}))
    })};
  };
  const env = {NAYELI_GOOGLE_MAPS_KEY:'fake'};
  const result = await lookupStops(trip,{env,fetcher,now});
  assert.deepEqual(result.links.map(link=>link.label),['Dentro del límite','Ver la ruta en Google Maps']);
  const none = await lookupStops({...trip,maxDetourMinutes:5},{env,fetcher,now});
  assert.match(none.reply,/hasta 5 minutos/);
});
