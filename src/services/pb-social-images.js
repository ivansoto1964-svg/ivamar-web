'use strict';
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const sharp = require('sharp');
const overrides = require('../data/pb-social-images.json');
const ORIGIN = 'https://www.masboricuaqueunmofongo.com';
const WIDTH = 1200, HEIGHT = 900;
// Existing editorial image providers only: no arbitrary URL proxy or redirects.
const IMAGE_HOSTS=new Set(['res.cloudinary.com','readyforaoc.org','iprhff.org','upload.wikimedia.org','images.ctfassets.net','www.discoverpuertorico.com','m.media-amazon.com','live.staticflickr.com','img1.wsimg.com']);
function remoteImage(value) {
  try {
    const u=new URL(String(value || ''));
    return u.protocol==='https:' && !u.username && !u.password && !u.port && IMAGE_HOSTS.has(u.hostname) && !u.hash ? u.href : '';
  } catch (_) { return ''; }
}


// Only public, local editorial image paths can be converted. Never fetch a URL.
function localImage(value) {
  let image = String(value || '').trim();
  if (image.startsWith(ORIGIN + '/')) image = image.slice(ORIGIN.length);
  const github='https://raw.githubusercontent.com/ivansoto1964-svg/ivamar-web/main/public/';
  if (image.startsWith(github)) image='/'+image.slice(github.length);
  image = image.split(/[?#]/)[0];
  if (!/^\/(?:images\/editorial|img|media\/pb-blog|media\/pb-blog-optimized)\/[a-zA-Z0-9_./-]+\.(?:jpe?g|png|webp)$/i.test(image)) return '';
  if (image.split('/').some(part => part === '..' || part === '.')) return '';
  return image;
}
function socialCover(image, version = '') {
  const local = localImage(image);
  if (overrides[local]) return {...overrides[local], url:ORIGIN + overrides[local].url};
  const source=local || remoteImage(image);
  if (!source) return {url:String(image || '').startsWith('/') ? ORIGIN + image : String(image || '')};
  const token = Buffer.from(source).toString('base64url');
  const revision = String(version || '').slice(0,100);
  return {url:`${ORIGIN}/media/pb-social/${token}.jpg${revision ? '?v='+encodeURIComponent(revision) : ''}`, width:WIDTH, height:HEIGHT, type:'image/jpeg'};
}
function dimensionTags(cover) {
  return cover.width ? `<meta property="og:image:type" content="image/jpeg"><meta property="og:image:width" content="${cover.width}"><meta property="og:image:height" content="${cover.height}">` : '';
}
function decodeToken(token) {
  if (!/^[a-zA-Z0-9_-]{1,1600}$/.test(token || '')) return '';
  const decoded = Buffer.from(token,'base64url').toString('utf8');
  return Buffer.from(decoded).toString('base64url') === token && (localImage(decoded) === decoded || remoteImage(decoded) === decoded) ? decoded : '';
}
function createRouter({publicDir=path.join(__dirname,'../../public'), mediaDir='/data/pb-blog/media',fetchImage=fetch} = {}) {
  const router = require('express').Router();
  const cache = new Map(), pending = new Map();
  async function sourceFile(image) {
    let root, relative;
    if (image.startsWith('/media/pb-blog-optimized/')) {
      root=mediaDir; relative=image.slice('/media/pb-blog-optimized/'.length).replace(/\.webp$/i,'');
      if (!/^[\w.-]+\.(?:jpe?g|png|webp)$/i.test(relative)) return null;
    } else if (image.startsWith('/media/pb-blog/')) {
      root=mediaDir; relative=image.slice('/media/pb-blog/'.length);
    } else { root=publicDir; relative=image.slice(1); }
    const realRoot=await fs.realpath(root), file=await fs.realpath(path.resolve(root,relative));
    if (!file.startsWith(realRoot + path.sep)) return null;
    const stat=await fs.stat(file);
    if (!stat.isFile() || stat.size>15*1024*1024) return null;
    return {file,stat};
  }
  router.get('/:token.jpg', async (req,res) => {
    const image=decodeToken(req.params.token);
    if (!image) return res.status(400).send('Invalid image');
    try {
      const remote=remoteImage(image);
      const source=remote ? {file:remote,stat:{mtimeMs:0,size:0}} : await sourceFile(image);
      if (!source) return res.status(404).send('Image not found');
      const key=crypto.createHash('sha256').update(source.file+':'+source.stat.mtimeMs+':'+source.stat.size).digest('hex');
      const cached=cache.get(key);
      let buffer=cached && cached.expiresAt>Date.now() ? cached.buffer : null;
      if (!buffer) {
        if (!pending.has(key)) {
          if (pending.size>=8) return res.status(503).set('Retry-After','2').send('Try again');
          pending.set(key,(async()=>{
            let input=source.file;
            if (remote) {
              const response=await fetchImage(remote,{redirect:'error',signal:AbortSignal.timeout(10000)});
              if (!response.ok || !/^image\/(jpeg|png|webp|gif)(?:;|$)/i.test(response.headers.get('content-type') || '') || Number(response.headers.get('content-length'))>15*1024*1024) throw new Error('Invalid remote image');
              const chunks=[];let size=0;
              for await (const chunk of response.body) {
                size+=chunk.length;if(size>15*1024*1024) throw new Error('Image too large');chunks.push(chunk);
              }
              input=Buffer.concat(chunks);
            }
            return sharp(input,{limitInputPixels:40000000}).rotate()
              .resize(WIDTH,HEIGHT,{fit:'contain',background:'#002d62'})
              .flatten({background:'#002d62'}).jpeg({quality:82,mozjpeg:true}).toBuffer();
          })());
        }
        try { buffer=await pending.get(key); } finally { pending.delete(key); }
        cache.set(key,{buffer,expiresAt:remote ? Date.now()+3600000 : Infinity});
        // Bounded memory cache, with no new persistent files or disk growth.
        while (cache.size>24) cache.delete(cache.keys().next().value);
      }
      return res.set('Cache-Control','public, max-age=3600').type('jpeg').send(buffer);
    } catch (error) {
      return res.status(error.code==='ENOENT' ? 404 : 422).send('Image unavailable');
    }
  });
  return router;
}
module.exports={socialCover,dimensionTags,createRouter,localImage,remoteImage,decodeToken};
