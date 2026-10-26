'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path'),test=require('node:test');
const p=require('../src/services/pb-travel-permissions'),view=require('../src/views/planetaboricua/turistiando-permiso');
const {createRouter}=require('../src/services/pb-travel-permission-routes');
const input={lang:'en',version:p.VERSION,business:'Example Café',location:'Example street, Winter Haven',visitDate:'2026-10-26',name:'Test Manager',role:'Manager',email:'test@example.com',restrictions:'No guests. Patio only.',consent:true};
const temp=()=>fs.mkdtempSync(path.join(os.tmpdir(),'pb-travel-test-'));
test('permission survives restart with exact accepted terms, timestamp and constraints; duplicate cannot replace it',()=>{
 const dir=temp();try{const s=p.createStore(dir),first=s.create(input,'a'.repeat(48),new Date('2026-10-26T16:00:00Z'));assert.equal(first.created,true);assert.equal(first.record.acceptedAt,'2026-10-26T16:00:00.000Z');assert.equal(first.record.acceptedText.permission,p.COPY.en.permission);assert.equal(first.record.textSha256,p.hash(JSON.stringify(first.record.acceptedText)));assert.equal(first.record.restrictions,input.restrictions);assert.equal(p.createStore(dir).get(first.record.id).email,input.email);assert.equal(s.create(input,'a'.repeat(48)).created,false);assert.equal(s.all().length,1);assert.throws(()=>s.create({...input,business:'Changed'},'a'.repeat(48)),/already saved/);assert.equal(s.get(first.record.id).business,input.business);}finally{fs.rmSync(dir,{recursive:true});}
});
test('validation rejects missing consent, tampered terms, malformed dates, overlong fields and header injection',()=>{
 for(const change of [{consent:false},{version:'old'},{lang:'xx'},{email:'x\n@example.com'},{business:'x\nBcc: other@example.com'},{visitDate:'2026-02-30'},{name:''},{restrictions:'x'.repeat(1501)},{website:'bot'}])assert.throws(()=>p.validate({...input,...change}));
 assert.equal(p.validate({...input,restrictions:'Patio only\nNo staff'}).restrictions,'Patio only\nNo staff');
});
test('signed tickets reject tampering and expiration',()=>{const secret='unit-test-secret',t=p.ticket(secret,1000);assert.ok(p.verifyTicket(secret,t,2000));assert.equal(p.verifyTicket(secret,t+'x',2000),null);assert.equal(p.verifyTicket('wrong',t,2000),null);assert.equal(p.verifyTicket(secret,t,4*3600000+1000),null);});
test('email failures preserve consent, retry only failures, and concurrent retries share one send sequence',async()=>{
 const dir=temp();try{const store=p.createStore(dir),{record}=store.create(input,'b'.repeat(48));let failPB=true,calls=[];const mailer=p.createMailer({store,pbEmail:'pb@example.com',from:'test@example.com',send:async(msg,options)=>{calls.push([msg.to,options.idempotencyKey]);assert.equal(store.get(record.id).consent,true);if(msg.to==='pb@example.com'&&failPB)return {error:{message:'Unavailable'}};return {data:{id:'provider-test-id'}};}});
 let result=await mailer.deliver(record.id);assert.equal(result.mail.venue.status,'accepted');assert.equal(result.mail.pb.status,'failed');assert.equal(store.all().length,1);failPB=false;await Promise.all([mailer.deliver(record.id),mailer.deliver(record.id)]);result=store.get(record.id);assert.equal(result.mail.pb.status,'accepted');assert.equal(calls.filter(x=>x[0]===input.email).length,1);assert.equal(calls.filter(x=>x[0]==='pb@example.com').length,2);assert.equal(calls[1][1],calls[2][1]);await mailer.deliver(record.id);assert.equal(calls.length,3);}finally{fs.rmSync(dir,{recursive:true});}
});
test('HTML escapes business text; both languages contain permissions, disclosure and consent fields',()=>{
 for(const lang of ['en','es']){const html=view.page({lang,ticket:'test-ticket'});assert.ok(html.includes(p.COPY[lang].authority));assert.ok(html.includes('name="consent" required'));assert.ok(html.includes('name="email" type="email"'));assert.ok(html.includes('noindex,nofollow'));assert.ok(html.includes('pb-travel-permissions.js'));}
 const dir=temp();try{const {record}=p.createStore(dir).create({...input,business:'<img src=x onerror=alert(1)>'},'c'.repeat(48));assert.ok(!view.receiptHtml(record).includes('<img'));assert.ok(view.receiptHtml(record).includes('&lt;img'));}finally{fs.rmSync(dir,{recursive:true});}
});
test('HTTP flow: signed same-origin consent, private admin, duplicate prevention and private receipt',async()=>{
 const express=require('express'),app=express(),dir=temp(),secret='unit-test-secret';let sent=0;
 app.use(express.json());app.use(express.urlencoded({extended:false}));app.use(createRouter({directory:dir,secret,pbEmail:'pb@example.com',from:'test@example.com',send:async()=>({data:{id:'fake-'+(++sent)}}),requireAdmin:(req,res,next)=>{if(req.get('X-Test-Admin')!=='yes')return res.status(401).end();req.pbAdminSession={csrf:'test-csrf'};next();},requireAdminCsrf:(req,res,next)=>req.body.csrf==='test-csrf'?next():res.status(403).end()}));
 const server=app.listen(0,'127.0.0.1');await new Promise(resolve=>server.once('listening',resolve));const root='http://127.0.0.1:'+server.address().port;
 try{
 const page=await fetch(root+'/turistiando/presentacion?lang=es');assert.equal(page.status,200);assert.equal(page.headers.get('cache-control'),'private, no-store');const html=await page.text(),ticket=JSON.parse(html.match(/const config=(.*?);<\/script>/s)[1]).ticket;
 const post=(data,origin='https://www.masboricuaqueunmofongo.com')=>fetch(root+'/api/pb-turistiando/autorizar',{method:'POST',headers:{'Content-Type':'application/json',Origin:origin},body:JSON.stringify({...data,ticket})});
 assert.equal((await post(input,'https://evil.example')).status,403);assert.equal((await post({...input,consent:false})).status,400);
 const response=await post(input),result=await response.json();assert.equal(response.status,200);assert.equal(result.record.mail.venue.status,'accepted');assert.equal(result.record.mail.venue.providerId,undefined);assert.equal(result.record.payloadHash,undefined);assert.equal(sent,2);assert.equal((await post(input)).status,200);assert.equal(sent,2);
 assert.equal((await fetch(root+'/pb-control/turistiando')).status,401);assert.equal((await fetch(root+'/pb-control/turistiando/'+result.record.id+'/registro.json')).status,401);
 const admin=await fetch(root+'/pb-control/turistiando/'+result.record.id,{headers:{'X-Test-Admin':'yes'}});assert.equal(admin.status,200);assert.ok((await admin.text()).includes(input.restrictions));
 const badCsrf=await fetch(root+'/pb-control/turistiando/'+result.record.id+'/reenviar',{method:'POST',headers:{'X-Test-Admin':'yes','Content-Type':'application/json'},body:'{}'});assert.equal(badCsrf.status,403);
 }finally{await new Promise(resolve=>server.close(resolve));fs.rmSync(dir,{recursive:true});}
});
