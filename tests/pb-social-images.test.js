'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises'),os=require('node:os'),path=require('node:path');
const sharp=require('sharp'),express=require('express');
const {socialCover,decodeToken,localImage,createRouter}=require('../src/services/pb-social-images');

test('Only public image paths are converted; external URLs and traversal cannot access files',()=>{
 for(const image of ['/data/private.png','/img/../private.png','/img/%2e%2e/private.png','//evil.test/image.png','https://evil.test/a.png','/img/x.svg','/img/a\\b.png']) assert.equal(localImage(image),'');
 for(const value of ['..','a!','',Buffer.from('/img/../private.png').toString('base64url')]) assert.equal(decodeToken(value),'');
 assert.equal(socialCover('https://example.com/photo.jpg').url,'https://example.com/photo.jpg');
 const a=socialCover('/media/pb-blog/photo.png','2026-11-20'),b=socialCover('/media/pb-blog/photo.png','2026-11-21');
 assert.notEqual(a.url,b.url);assert.equal(a.width,1200);assert.equal(a.height,900);
});

test('HTTP share image is a complete JPEG with declared dimensions for static, uploaded and optimized covers',async()=>{
 const root=await fs.mkdtemp(path.join(os.tmpdir(),'pb-social-')),publicDir=path.join(root,'public'),mediaDir=path.join(root,'media');
 await fs.mkdir(path.join(publicDir,'images/editorial'),{recursive:true});await fs.mkdir(mediaDir);
 const source=await sharp({create:{width:300,height:600,channels:3,background:'#ff0000'}}).webp().toBuffer();
 await fs.writeFile(path.join(publicDir,'images/editorial/vertical.webp'),source);
 await fs.writeFile(path.join(mediaDir,'upload.png'),await sharp(source).png().toBuffer());
 await fs.writeFile(path.join(mediaDir,'broken.png'),'not an image');
 await fs.writeFile(path.join(root,'secret.png'),source);
 await fs.symlink(path.join(root,'secret.png'),path.join(publicDir,'images/editorial/link.png'));
 const app=express();app.use('/media/pb-social',createRouter({publicDir,mediaDir}));
 const server=app.listen(0,'127.0.0.1');await new Promise(resolve=>server.once('listening',resolve));
 const origin='http://127.0.0.1:'+server.address().port;
 async function request(image){const u=new URL(socialCover(image).url);return fetch(origin+u.pathname+u.search);}
 try {
  for(const image of ['/images/editorial/vertical.webp','/media/pb-blog/upload.png','/media/pb-blog-optimized/upload.png.webp']){
   const r=await request(image);assert.equal(r.status,200);assert.match(r.headers.get('content-type'),/image\/jpeg/);
   const buffer=Buffer.from(await r.arrayBuffer());const m=await sharp(buffer).metadata();assert.equal(m.width,1200);assert.equal(m.height,900);assert.equal(m.format,'jpeg');assert.ok(buffer.length<1024*1024);
   // Containment preserves the full portrait rather than cropping it to fill the landscape card.
   const {data,info}=await sharp(buffer).raw().toBuffer({resolveWithObject:true});
   const center=((450*info.width)+600)*info.channels;assert.ok(data[center]>200);
   const edge=((450*info.width)+20)*info.channels;assert.ok(data[edge]<30);
  }
  assert.equal((await request('/img/missing.png')).status,404);
  assert.equal((await request('/media/pb-blog/broken.png')).status,422);
  assert.equal((await request('/images/editorial/link.png')).status,404);
  assert.equal((await fetch(origin+'/media/pb-social/invalid.jpg')).status,400);
 } finally {await new Promise(resolve=>server.close(resolve));await fs.rm(root,{recursive:true,force:true});}
});

test('Remote conversion stays within known image providers and caches successful JPEGs',async()=>{
 const {remoteImage}=require('../src/services/pb-social-images');
 for(const url of ['http://res.cloudinary.com/a.jpg','https://res.cloudinary.com.evil.test/a.jpg','https://user:pass@res.cloudinary.com/a.jpg','https://res.cloudinary.com:8443/a.jpg','https://127.0.0.1/a.jpg']) assert.equal(remoteImage(url),'');
 const png=await sharp({create:{width:600,height:300,channels:3,background:'#00ff00'}}).png().toBuffer();let calls=0;
 const app=express();app.use('/media/pb-social',createRouter({fetchImage:async(url,options)=>{
  calls++;assert.equal(options.redirect,'error');assert.ok(options.signal);assert.equal(url,'https://res.cloudinary.com/demo/image/upload/a.png');
  return new Response(png,{headers:{'content-type':'image/png'}});
 }}));
 const server=app.listen(0,'127.0.0.1');await new Promise(resolve=>server.once('listening',resolve));
 try {
  const cover=socialCover('https://res.cloudinary.com/demo/image/upload/a.png');const url='http://127.0.0.1:'+server.address().port+new URL(cover.url).pathname;
  for(let i=0;i<2;i++) {const r=await fetch(url);assert.equal(r.status,200);assert.equal((await sharp(Buffer.from(await r.arrayBuffer())).metadata()).format,'jpeg');}
  assert.equal(calls,1);
 } finally {await new Promise(resolve=>server.close(resolve));}
});
