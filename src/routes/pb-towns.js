const towns = require('../data/pb-towns');
const businesses=require('../services/pb-businesses');
const businessView=require('../views/planetaboricua/businesses');
const renderTownPage = require('../views/planetaboricua/town-page');

module.exports = function registerPBTowns(app,{businessStore}={}) {
  app.get('/pueblos/:town/', (req,res,next) => {
    const slug=String(req.params.town||'').toLowerCase();
    const town=towns[slug];
    if(!town&&!businesses.towns.has(slug)) return next();
    const items=businessStore?businessStore.publicAll().filter(r=>r.town===slug):[];
    const directory=businessView.directory(slug,items);
    res.set('Cache-Control','no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma','no-cache');
    res.set('Expires','0');
    return res.send(town?renderTownPage({...town,businessDirectory:directory},slug):businessView.townPage(slug,items));
  });
};
