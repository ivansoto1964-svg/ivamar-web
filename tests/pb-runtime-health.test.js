const assert = require('assert');
const fs = require('fs');
const path = require('path');
const {runtimeHealth} = require('../src/services/pb-runtime-health');
const renderControl = require('../src/views/pb-control');

const completeEnv = {
  ADMIN_USER:'admin',ADMIN_PASS:'admin-password',PB_ARTISAN_MAGIC_SECRET:'artisan-secret',
  RESEND_API_KEY:'resend-key',PB_SENDER_EMAIL:'notificaciones@example.com',
  CLOUDINARY_CLOUD_NAME:'cloud',CLOUDINARY_API_KEY:'cloud-key',CLOUDINARY_API_SECRET:'cloud-secret',
  NAYELI_PREVIEW_ENABLED:'true',OPENAI_API_KEY:'openai-key'
};

const healthy = runtimeHealth(completeEnv);
assert.equal(healthy.ok,true);
assert.equal(healthy.missing.length,0);

const withoutArtisanSecret = runtimeHealth({...completeEnv,PB_ARTISAN_MAGIC_SECRET:''});
assert.equal(withoutArtisanSecret.ok,false);
assert.deepEqual(withoutArtisanSecret.missing.map(item => item.id),['artisan-access']);

const disabledNayeli = runtimeHealth({...completeEnv,NAYELI_PREVIEW_ENABLED:'false',OPENAI_API_KEY:''});
assert.equal(disabledNayeli.checks.find(item => item.id === 'nayeli').configured,true);

const model = {
  csrf:'test',runtimeHealth:withoutArtisanSecret,counts:{},latestPending:[],latestApproved:[],commentsPending:[],commentsApproved:[],
  artisansPending:[],artisansApproved:[],eventsPending:[],eventsApproved:[],subscribers:[],subscriberStats:{},blogPosts:[],
  affiliates:[],artisanMetrics:[],artisanMailHistory:[],artisanEmailAudit:{},siteAnalytics:{},externalMetrics:{},pressRoom:{},fairFunnel:{}
};
const html = renderControl(model);
assert.match(html,/Salud del sistema/);
assert.match(html,/Acceso de artesanos/);
assert.match(html,/Falta configurar/);
assert.doesNotMatch(html,/artisan-secret|admin-password|resend-key|cloud-secret|openai-key/);

const server = fs.readFileSync(path.join(__dirname,'../src/server.js'),'utf8');
const stories = fs.readFileSync(path.join(__dirname,'../src/routes/pb-stories.js'),'utf8');
assert.match(server,/process\.env\.PB_ARTISAN_MAGIC_SECRET \|\| ''/);
assert.doesNotMatch(server,/PB_ARTISAN_MAGIC_SECRET \|\| process\.env\.PB_ADMIN_PASS/);
assert.doesNotMatch(stories,/PB_ARTISAN_MAGIC_SECRET\|\|process\.env\.PB_ADMIN_PASS/);

console.log('PB runtime health tests passed');
