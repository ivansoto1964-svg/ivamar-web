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
});

test('the private mobile view uses the supplied portrait and presents quick tests',()=>{
  const html = render({enabled:true,hasApiKey:true});
  assert.match(html,/nayeli-soto-cruz\.webp/);
  assert.match(html,/Nayeli Soto Cruz/);
  assert.match(html,/Camuy y voy a Isabela/);
  assert.doesNotThrow(()=>compileFunction(html.split('<script>')[1].split('</script>')[0]));
});
