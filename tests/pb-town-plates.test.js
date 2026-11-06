const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const municipalities=require('../src/data/pb-municipalities');
const html=fs.readFileSync(require.resolve('../public/pueblos/index.html'),'utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const nodes=new Map();
const get=id=>{if(!nodes.has(id))nodes.set(id,{value:'',textContent:'',innerHTML:'',style:{},addEventListener(){}});return nodes.get(id)};
const context=vm.createContext({document:{getElementById:get},location:{search:'',replace(){}},URLSearchParams});
vm.runInContext(script,context);
let grid=get('townGrid').innerHTML;
assert.equal(Number(get('count').textContent),78);
assert.equal((grid.match(/class="town-plate"/g)||[]).length,78);
for(const [slug,name] of municipalities){
 assert.ok(grid.includes('href="/pueblos/'+slug+'/"'),name+' keeps its canonical link');
 assert.ok(grid.includes('class="plate-sr-only">'+name+'</span>'),name+' keeps an accessible heading');
}
get('search').value='bayamon';vm.runInContext('renderGrid()',context);
assert.equal(get('count').textContent,1);
assert.match(get('townGrid').innerHTML,/BAYAMÓN/);
get('search').value='';get('region').value='Islas Municipio';vm.runInContext('renderGrid()',context);
assert.equal(get('count').textContent,2);
assert.match(get('townGrid').innerHTML,/CULEBRA/);assert.match(get('townGrid').innerHTML,/VIEQUES/);
get('search').value='Arecibo';vm.runInContext('renderGrid()',context);
assert.equal(get('count').textContent,0);assert.match(get('townGrid').innerHTML,/No encontramos pueblos/);
get('region').value='';vm.runInContext('renderGrid()',context);
assert.match(get('townGrid').innerHTML,/href="\/pueblos\/arecibo\/"/);
assert.match(get('townGrid').innerHTML,/Guía de fin de semana/);
console.log('Town plates: all 78 links and accessible names, accent-free search, regions and empty state passed');
