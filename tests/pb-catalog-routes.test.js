'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const os=require('node:os');
const path=require('node:path');
const crypto=require('node:crypto');
const vm=require('node:vm');
const express=require('express');
const {createStore}=require('../src/services/pb-catalog-foundation');
const {createCatalogRouter,readMembership}=require('../src/services/pb-catalog-routes');
const view=require('../src/views/planetaboricua/artesano-catalogo');
(async()=>{
  const directory=fs.mkdtempSync(path.join(os.tmpdir(),'pb-catalog-http-'));
  const env={};const now=()=>new Date('2026-10-19T15:00:00Z');
  const origin='https://www.masboricuaqueunmofongo.com';
  const artists={a:{id:'a',name:'Tejidos <María>',slug:'tejidos',email:'a@example.com',whatsapp:'7875550100',desc:'Hecho a mano'},b:{id:'b',name:'Otro',slug:'otro',email:'b@example.com'}};
  const memberships={a:{artisanId:'a',plan:'catalog',status:'active',validUntil:'2026-12-01T00:00:00Z'}};
  let uploadCalls=0,reads=0;
  const store=createStore({directory,env,now});
  const app=express();
  app.use(createCatalogRouter({store,env,now,origin,
    verifyToken:token=>artists[token]?{id:token,email:artists[token].email}:null,
    getArtisan:id=>artists[id],getArtisanBySlug:slug=>Object.values(artists).find(item=>item.slug===slug),
    getMembership:id=>{reads++;return memberships[id]||null;},
    upload:async(data,id)=>{uploadCalls++;return `https://res.cloudinary.com/demo/image/upload/v1/planeta-boricua/catalogos/${id}/foto.png`;},
    requireAdmin:(req,res,next)=>req.get('X-Test-Admin')==='yes'?next():res.sendStatus(401)
  }));
  const server=app.listen(0,'127.0.0.1');await new Promise(resolve=>server.once('listening',resolve));
  const base=`http://127.0.0.1:${server.address().port}`;
  const request=(url,options={})=>fetch(base+url,options);
  const post=(token,action,body,headers={})=>request(`/api/pb-catalogo/${token}/${action}`,{method:'POST',headers:{'Content-Type':'application/json',Origin:origin,'X-CSRF-Token':crypto.createHash('sha256').update('pb-catalog-csrf:'+token).digest('hex'),...headers},body:JSON.stringify(body)});
  const product={title:'Pieza <script>alert(1)</script>',description:'Tejida a mano',priceCents:1999,availability:'available',published:true,images:['https://res.cloudinary.com/demo/image/upload/v1/planeta-boricua/catalogos/a/foto.png'],paymentUrl:'https://example.com/pay'};
  try{
    assert.equal((await request('/artesanos/catalogo/a')).status,404);
    assert.equal((await post('a','guardar',product)).status,404);
    assert.equal(reads,0);assert.equal(fs.readdirSync(directory).length,0);
    env.PB_CATALOG_ENABLED='true';
    assert.equal((await request('/artesanos/catalogo/expired')).status,401);
    const panel=await request('/artesanos/catalogo/a');assert.equal(panel.status,200);
    assert.equal(panel.headers.get('referrer-policy'),'no-referrer');assert.match(panel.headers.get('cache-control'),/no-store/);
    const html=await panel.text();assert.match(html,/Tejidos &lt;María&gt;/);
    for(const script of html.matchAll(/<script>([\s\S]*?)<\/script>/g))new vm.Script(script[1]);
    assert.equal((await post('a','guardar',product,{'Origin':'https://evil.test'})).status,403);
    assert.equal((await post('a','guardar',product,{'X-CSRF-Token':'bad'})).status,403);
    assert.equal((await post('b','guardar',{...product,plan:'plus'})).status,403);
    assert.equal((await post('a','guardar',{...product,images:['https://res.cloudinary.com/demo/image/upload/v1/planeta-boricua/catalogos/b/other.png']})).status,400);
    const saved=await post('a','guardar',product);assert.equal(saved.status,200);const id=(await saved.json()).product.id;
    assert.equal(store.list({role:'artisan',artisanId:'b'}).length,0);
    assert.equal((await request('/catalogos/tejidos')).status,404);
    const preview=await request('/artesanos/catalogo/a/vista');const previewHtml=await preview.text();
    assert.match(previewHtml,/Vista de prueba/);assert.doesNotMatch(previewHtml,/<script>alert/);assert.match(previewHtml,/Pagar al artesano/);
    assert.equal((await request('/pb-control/catalogos/a')).status,401);
    assert.equal((await request('/pb-control/catalogos/a',{headers:{'X-Test-Admin':'yes'}})).status,200);
    env.PB_CATALOG_PUBLIC_ENABLED='true';
    assert.equal((await request('/catalogos/tejidos')).status,200);
    assert.equal((await request('/catalogos/otro')).status,404);
    assert.equal((await post('b','eliminar',{id})).status,400);
    assert.equal(store.list({role:'artisan',artisanId:'a'}).length,1);
    const data='data:image/png;base64,iVBORw0KGgo=';
    assert.equal((await post('a','foto',{data})).status,200);assert.equal(uploadCalls,1);
    assert.equal((await post('b','foto',{data})).status,403);assert.equal(uploadCalls,1);
    assert.equal((await post('a','foto',{data:'data:image/svg+xml;base64,abc='})).status,400);
    memberships.a.status='canceled';
    assert.equal((await request('/catalogos/tejidos')).status,404);
    assert.equal((await post('a','guardar',product)).status,403);
    assert.equal(store.list({role:'artisan',artisanId:'a'}).length,1);
    assert.equal((await post('a','eliminar',{id})).status,200); // Owner can delete retained data.
    assert.equal(store.list({role:'artisan',artisanId:'a'}).length,0);
    const hidden=view.publicPage({item:artists.a,products:[{...product,id:'x',availability:'unavailable'}],profileUrl:'/artesanos/tejidos'});
    assert.doesNotMatch(hidden,/Pagar al artesano/);assert.doesNotMatch(hidden,/Consultar por WhatsApp/);
    const malicious=view.panel({item:artists.a,products:[{...product,title:'</script><script>alert(1)</script>'}],plan:'catalog',token:'a',csrf:'test'});
    assert.doesNotMatch(malicious,/<\/script><script>alert/);
    const mf=path.join(directory,'memberships.json');
    assert.equal(readMembership(mf,'a'),null);
    fs.writeFileSync(mf,JSON.stringify({version:1,memberships:[memberships.a]}));assert.equal(readMembership(mf,'a').status,'canceled');
    fs.writeFileSync(mf,JSON.stringify({version:1,memberships:[memberships.a,memberships.a]}));assert.throws(()=>readMembership(mf,'a'),/duplicadas/);
    fs.writeFileSync(mf,'bad');assert.throws(()=>readMembership(mf,'a'));
    console.log('PASS: HTTP gates, owner access, CSRF/origin, photo ownership, uploads, cancellation, escaped views, private/public separation.');
  }finally{await new Promise(resolve=>server.close(resolve));fs.rmSync(directory,{recursive:true,force:true});}
})().catch(error=>{console.error(error);process.exitCode=1;});
