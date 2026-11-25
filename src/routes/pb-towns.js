const towns = require('../data/pb-towns');
const guides = require('../data/pb-town-guides.json');
const municipalityNames = new Map(require('../data/pb-municipalities'));
const businessView=require('../views/planetaboricua/businesses');
const renderTownPage = require('../views/planetaboricua/town-page');

module.exports = function registerPBTowns(app,{businessStore}={}) {
  app.get('/pueblos/:town/', (req,res,next) => {
    const slug=String(req.params.town||'').toLowerCase();
    const town=towns[slug];
    const name=municipalityNames.get(slug);
    if (!name) return next();
    if (!req.path.endsWith('/')) {
      const query = req.originalUrl.slice(req.path.length);
      return res.redirect(301, '/pueblos/' + slug + '/' + query);
    }
    const items=businessStore?businessStore.publicAll().filter(r=>r.town===slug):[];
    const directory=businessView.directory(slug,items);
    res.set('Cache-Control','no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma','no-cache');
    res.set('Expires','0');
    return res.send(renderTownPage({name,...town,businessDirectory:directory},slug,guides[slug]));
  });
};
