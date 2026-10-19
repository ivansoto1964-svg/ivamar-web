'use strict';

// Dormant domain layer. No routes, billing calls or assistant calls are installed.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const PLANS = Object.freeze({
  free: Object.freeze({monthlyCents:0, products:0, photosPerProduct:0, categories:false, clickStats:false}),
  catalog: Object.freeze({monthlyCents:999, products:15, photosPerProduct:1, categories:false, clickStats:false}),
  plus: Object.freeze({monthlyCents:1999, products:50, photosPerProduct:4, categories:true, clickStats:true})
});

function configuration(env = process.env) {
  return Object.freeze({catalog:env.PB_CATALOG_ENABLED === 'true',
    memberships:env.PB_MEMBERSHIPS_ENABLED === 'true',
    assistant:env.PB_CATALOG_NAYELI_ENABLED === 'true'});
}
function effectivePlan(membership, now = new Date()) {
  // Membership is trusted server data, never a plan supplied by the browser.
  if (!membership || membership.status !== 'active' || !['catalog','plus'].includes(membership.plan)) return 'free';
  const expires = Date.parse(membership.validUntil);
  return Number.isFinite(expires) && expires > now.getTime() ? membership.plan : 'free';
}
function fail(message) { throw new Error(message); }
function text(value, max, label, required = false) {
  if (typeof value !== 'string' || value.length > max || (required && !value.trim())) fail(`${label} inválido.`);
  // Values remain plain text; future views must HTML-escape on output.
  return value.trim();
}
function httpsUrl(value, image = false) {
  if (!value) return '';
  if (typeof value !== 'string' || value.length > 2048) fail('Enlace inválido.');
  let url;
  try { url = new URL(value); } catch (_) { fail('Enlace inválido.'); }
  if (url.protocol !== 'https:' || url.username || url.password || url.hash) fail('Usa un enlace HTTPS sin credenciales ni fragmentos.');
  if (image && (url.hostname !== 'res.cloudinary.com' || !url.pathname.includes('/image/upload/'))) fail('Foto no autorizada.');
  return url.href;
}
function normalizeProduct(input, plan) {
  const limits = PLANS[plan];
  if (!input || typeof input !== 'object' || !limits || plan === 'free') fail('Este plan no incluye catálogo.');
  if (!Array.isArray(input.images) || input.images.length < 1 || input.images.length > limits.photosPerProduct) fail('Cantidad de fotos inválida.');
  if (input.images.some(image => typeof image !== 'string' || !image)) fail('Foto inválida.');
  if (input.priceCents !== null && (!Number.isSafeInteger(input.priceCents) || input.priceCents < 0 || input.priceCents > 100000000)) fail('Precio inválido; usa centavos o null para consultar.');
  if (!['available','made_to_order','unavailable'].includes(input.availability)) fail('Disponibilidad inválida.');
  if (typeof input.published !== 'boolean') fail('Estado de publicación inválido.');
  const category = text(input.category ?? '',60,'Categoría');
  if (category && !limits.categories) fail('Las categorías requieren Plus.');
  return {
    title:text(input.title,120,'Nombre',true), description:text(input.description,1200,'Descripción',true),
    priceCents:input.priceCents, currency:'USD', images:[...new Set(input.images.map(image => httpsUrl(image,true)))],
    category, availability:input.availability, published:input.published,
    // Opaque external destination: never fetched, never treated as a paid order.
    paymentUrl:httpsUrl(input.paymentUrl),
  };
}
function ownerId(principal) {
  if (!principal || principal.role !== 'artisan' || !/^[A-Za-z0-9_-]{1,128}$/.test(String(principal.artisanId || ''))) fail('Acceso no autorizado.');
  return String(principal.artisanId);
}
function createStore({directory, env = process.env, now = () => new Date()} = {}) {
  if (!directory || !path.isAbsolute(directory)) fail('Configura un directorio persistente absoluto.');
  function file(id) { return path.join(directory,`${id}.json`); }
  function read(id) {
    let raw;
    try { raw = fs.readFileSync(file(id),'utf8'); }
    catch (error) { if (error.code === 'ENOENT') return {version:1,artisanId:id,products:[]}; throw error; }
    const data = JSON.parse(raw);
    if (data.version !== 1 || data.artisanId !== id || !Array.isArray(data.products)) fail('Catálogo inválido; no se sobrescribirá.');
    return data;
  }
  function write(id,data) {
    fs.mkdirSync(directory,{recursive:true,mode:0o700});
    const temp = `${file(id)}.${crypto.randomUUID()}.tmp`;
    try { fs.writeFileSync(temp,JSON.stringify(data,null,2),{mode:0o600,flag:'wx'}); fs.renameSync(temp,file(id)); }
    finally { if (fs.existsSync(temp)) fs.unlinkSync(temp); }
  }
  function enabled() { if (!configuration(env).catalog) fail('Catálogo desactivado.'); }
  return Object.freeze({
    list(principal) { enabled(); return read(ownerId(principal)).products; },
    upsert(principal,membership,input) {
      enabled();
      const id = ownerId(principal);
      const plan = effectivePlan(membership,now());
      if (String(membership?.artisanId) !== id) fail('Membresía ajena.');
      const product = normalizeProduct(input,plan);
      const data = read(id);
      const index = input.id ? data.products.findIndex(item => item.id === input.id) : -1;
      if (input.id && index < 0) fail('Producto no encontrado.');
      if (index < 0 && data.products.length >= PLANS[plan].products) fail('Alcanzaste el límite de productos.');
      // Never discard overflow products after a downgrade.
      const timestamp = now().toISOString();
      const saved = {...product,id:index < 0 ? crypto.randomUUID() : data.products[index].id,
        createdAt:index < 0 ? timestamp : data.products[index].createdAt,updatedAt:timestamp};
      if (index < 0) data.products.push(saved); else data.products[index] = saved;
      write(id,data);
      return saved;
    },
    remove(principal,productId) {
      enabled(); const id = ownerId(principal); const data = read(id);
      if (!data.products.some(item => item.id === productId)) fail('Producto no encontrado.');
      data.products = data.products.filter(item => item.id !== productId); write(id,data);
    },
    publicProducts(artisanId,membership) {
      enabled(); const id = ownerId({role:'artisan',artisanId});
      if (String(membership?.artisanId) !== id) return [];
      const plan = effectivePlan(membership,now());
      // Old Plus data is preserved; public output respects the current plan.
      return read(id).products.filter(item => item.published).slice(0,PLANS[plan].products)
        .map(item => ({...item,images:item.images.slice(0,PLANS[plan].photosPerProduct),category:PLANS[plan].categories ? item.category : ''}));
    }
  });
}
module.exports = {PLANS,configuration,effectivePlan,normalizeProduct,createStore};
