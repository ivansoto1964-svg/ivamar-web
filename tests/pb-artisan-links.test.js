const assert = require('assert');
const {artisanSocialUrl, safePublicUrl, validateArtisanContactLinks} = require('../src/utils/pb-artisan-links');

assert.equal(
  artisanSocialUrl('https://www.facebook.com/share/1CFLwvX5Wd/?mibextid=wwXIfr','facebook'),
  'https://www.facebook.com/share/1CFLwvX5Wd/?mibextid=wwXIfr'
);
assert.equal(
  artisanSocialUrl('https://www.facebook.com/profile.php?id=61586089233617','facebook'),
  'https://www.facebook.com/profile.php?id=61586089233617'
);
assert.equal(artisanSocialUrl('@artesana.pr','instagram'),'https://www.instagram.com/artesana.pr');
assert.equal(artisanSocialUrl('https://www.tiktok.com/@artesana.pr','tiktok'),'https://www.tiktok.com/@artesana.pr');
assert.equal(artisanSocialUrl('artesana_pr','pinterest'),'https://www.pinterest.com/artesana_pr');
assert.equal(artisanSocialUrl('https://www.instagram.com/p/ABC123','instagram'),'');
assert.equal(artisanSocialUrl('Nombre del negocio','facebook'),'');
assert.equal(safePublicUrl('javascript:alert(1)'), '');

assert.match(
  validateArtisanContactLinks({facebook:'https://www.facebook.com/share/1CFLwvX5Wd/'}),
  /enlace permanente/
);
assert.equal(
  validateArtisanContactLinks(
    {facebook:'https://www.facebook.com/share/1CFLwvX5Wd/'},
    {facebook:'https://www.facebook.com/share/1CFLwvX5Wd/'}
  ),
  ''
);
assert.match(validateArtisanContactLinks({whatsapp:'787604435'}),/10 a 15 dígitos/);
assert.equal(validateArtisanContactLinks({
  whatsapp:'+1 787 555 1212',
  website:'https://ejemplo.com',
  instagram:'@artesana.pr',
  facebook:'https://www.facebook.com/artesana.pr',
  tiktok:'@artesana.pr',
  pinterest:'artesana_pr',
  etsy:'https://artesana.etsy.com'
}), '');

console.log('PB artisan link tests passed');
