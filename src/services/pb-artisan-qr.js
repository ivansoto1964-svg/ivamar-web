const QRCode = require('qrcode');

const PB_ORIGIN = 'https://www.masboricuaqueunmofongo.com';
const cache = new Map();

function assertSlug(slug) {
  const value = String(slug || '');
  if (!/^[a-z0-9][a-z0-9-]{0,159}$/.test(value)) throw new Error('Invalid artisan slug');
  return value;
}

function artisanShortUrl(slug) {
  return `${PB_ORIGIN}/a/${encodeURIComponent(assertSlug(slug))}`;
}

async function artisanQrPng(slug) {
  const validSlug = assertSlug(slug);
  if (!cache.has(validSlug)) {
    cache.set(validSlug,QRCode.toBuffer(artisanShortUrl(validSlug),{
      type:'png',
      errorCorrectionLevel:'M',
      width:640,
      margin:3,
      color:{dark:'#002D62',light:'#FFFFFFFF'}
    }).catch(error => {
      cache.delete(validSlug);
      throw error;
    }));
  }
  return cache.get(validSlug);
}

module.exports = {artisanShortUrl,artisanQrPng};
