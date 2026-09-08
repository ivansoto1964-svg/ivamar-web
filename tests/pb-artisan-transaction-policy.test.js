const assert = require('assert');

const artisanProfile = require('../src/views/planetaboricua/artesano-perfil');
const fair = require('../src/views/planetaboricua/feriaartesanos');
const registration = require('../src/views/planetaboricua/add-negocio');
const legal = require('../src/views/legal-boricua');

const profile = artisanProfile({
  name: 'Artesanía de prueba',
  fullDesc: 'Trabajo artesanal',
  whatsapp: '17875551212',
  website: 'https://example.com',
  instagram: 'artesania.pr',
  facebook: 'artesania.pr',
  etsy: 'https://etsy.com/shop/prueba'
}, {
  categoryLabel: 'Artesanía',
  locationLabel: 'Puerto Rico',
  slug: 'artesania-prueba',
  events: [],
  recommendations: []
});

assert(profile.includes('Compra directamente al artesano'));
assert(profile.includes('no procesa pagos ni participa en las transacciones'));
assert(profile.includes('Visitar su tienda'));
assert(profile.includes('Contactar por WhatsApp'));
assert(!profile.includes('>Tienda online</a>'));

assert(fair.includes('¿Necesito una certificación oficial de artesano para participar?'));
assert(fair.includes('¿Puedo comprar directamente en Planeta Boricua?'));
assert(fair.includes('¿Planeta Boricua recibe dinero de las ventas?'));
assert(fair.includes('¿Qué debo hacer antes de comprar?'));
assert(fair.includes('fuera de PB'));

assert(registration.includes('no constituye una certificación gubernamental'));
assert(registration.includes('href="/terminos-boricua"'));
assert(!registration.includes('negocio legítimo operado por o para'));

assert(legal.terminos.includes('no actúa como organismo certificador'));
assert(legal.terminos.includes('no procesa ni custodia pagos'));
assert(legal.terminos.includes('no recibe comisiones sobre las ventas directas'));
assert(legal.terminos.includes('Nada en estos términos pretende excluir derechos del consumidor'));
assert(legal.privacidad.includes('no solicita ni procesa datos de pago'));
assert(legal.afiliados.includes('no recibe comisiones sobre las ventas directas'));

console.log('pb-artisan-transaction-policy.test.js: OK');
