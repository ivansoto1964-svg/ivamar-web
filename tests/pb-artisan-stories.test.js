const test = require('node:test');
const assert = require('node:assert/strict');
const { selectStories, isWeeklyStory, LUIS_SLUG, HISTORICAL_STORY_SLUGS } = require('../src/services/pb-artisan-stories');
const view = require('../src/views/planetaboricua/artesano-semana');
const { ARECIBO_HOTELS, getAreciboActivitiesUrl, areciboTravelLinks } = require('../src/services/pb-town-travel-links');
test('curation preserves the published Luis story and allows explicit removal', () => {
  assert.equal(isWeeklyStory({slug:LUIS_SLUG}),true);
  assert.equal(isWeeklyStory({slug:LUIS_SLUG,artisanWeekly:false}),false);
  assert.equal(isWeeklyStory({title:'Entrevista a un artesano'}),false);
});
test('every previously published artisan feature appears once without retagging live articles', () => {
  const records = HISTORICAL_STORY_SLUGS.map((slug,i) => ({slug,title:slug,publishedAt:new Date(Date.UTC(2026,8,19+i*7)).toISOString()}));
  const unrelated = {slug:'jose-jun-martinez-el-artista-boricua-que-lleva-los-paisajes-de-puerto-rico-al-corazon-de-londres-847952',publishedAt:'2026-10-19T18:00:00Z'};
  const before = JSON.stringify(records);
  const stories = selectStories([...records,unrelated]);
  assert.equal(stories.length,6);
  assert.deepEqual(stories.map(x=>x.slug),[...HISTORICAL_STORY_SLUGS].reverse());
  assert.equal(JSON.stringify(records),before);
  const html = view(stories);
  for(const {slug} of records) assert.ok(html.includes('/lo-mas-reciente/'+slug));
  assert.ok(!html.includes(unrelated.slug));
  assert.equal(selectStories(records.map(x=>({...x,artisanWeekly:false}))).length,0);
});
test('archive projects only public metadata in publication order and validates links', () => {
  const selected = selectStories([
    {slug:LUIS_SLUG,publishedAt:'2026-10-30T00:00:00Z',email:'private@example.com'},
    {slug:'otra-historia',artisanWeekly:true,publishedAt:'2026-11-07T00:00:00Z',body:'private-draft'},
    {slug:'no-elegida',publishedAt:'2026-11-01T00:00:00Z'},
    {slug:'bad" onclick=',artisanWeekly:true,publishedAt:'2026-11-01T00:00:00Z'},
    {slug:'sin-fecha',artisanWeekly:true}
  ]);
  assert.deepEqual(selected.map(x=>x.slug),['otra-historia',LUIS_SLUG]);
  assert.equal('email' in selected[1],false);
  assert.equal('body' in selected[0],false);
  const html=view([{...selected[0],title:'<script>bad</script>',image:'javascript:bad()'}]);
  assert.ok(!html.includes('<script>bad</script>'));
  assert.ok(!html.includes('javascript:'));
  assert.ok(html.includes('/lo-mas-reciente/otra-historia'));
  assert.ok(view([]).includes('Estamos preparando las primeras historias'));
});
test('hotel link retains PB attribution and the verified Arecibo destination', () => {
  const url=new URL(ARECIBO_HOTELS);
  assert.equal(url.pathname,'/hotels/arecibo-hotels-list-4382/');
  assert.equal(url.searchParams.get('SID'),'2209817');
  assert.equal(url.searchParams.get('allianceid'),'1094387');
  assert.match(areciboTravelLinks(),/sponsored noopener noreferrer/);
  assert.match(areciboTravelLinks(),/comisión/);
});
test('activities require an actual affiliate URL and reject misleading or unsafe hosts', () => {
  assert.equal(getAreciboActivitiesUrl('https://www.getyourguide.com/arecibo-l138123/'),'');
  assert.equal(getAreciboActivitiesUrl('https://www.getyourguide.com.evil.test/?partner_id=ABC'),'');
  assert.equal(getAreciboActivitiesUrl('https://user:pass@www.getyourguide.com/?partner_id=ABC'),'');
  assert.equal(getAreciboActivitiesUrl('javascript:alert(1)'),'');
  assert.equal(getAreciboActivitiesUrl('https://www.getyourguide.com/arecibo-l138123/?partner_id=PB123'),'https://www.getyourguide.com/arecibo-l138123/?partner_id=PB123');
  assert.equal(getAreciboActivitiesUrl('https://gyg.me/test123'),'https://gyg.me/test123');
});
test('Arecibo publication is a draft and sends readers to the complete guide', () => {
  const post = require('../data/pb-blog/posts/arecibo-un-fin-de-semana-entre-el-faro-el-mar-y-el-autocine.json');
  assert.equal(post.status,'draft');
  assert.equal(post.category,'De pueblo en pueblo');
  assert.ok(post.content.includes('href="/pueblos/arecibo/"'));
  assert.ok(post.seoTitle.length<=70);
  assert.ok(post.metaDescription.length<=150);
});
