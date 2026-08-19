const towns = require('../data/pb-towns');
const renderTownPage = require('../views/planetaboricua/town-page');

module.exports = function registerPBTowns(app) {
  app.get('/pueblos/:town/', (req,res,next) => {
    const slug=String(req.params.town||'').toLowerCase();
    const town=towns[slug];
    if(!town) return next();
    return res.send(renderTownPage(town,slug));
  });
};
