'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { mkdtempSync, writeFileSync, readFileSync, rmSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join } = require('node:path');
const express = require('express');
const Stripe = require('stripe');
const mount = require('../src/services/pb-food-trucks');

test('pilot gates signup and handles signed payment, renewal and risk events', async t => {
  const folder = mkdtempSync(join(tmpdir(),'pb-food-pilot-'));
  const file = join(folder,'trucks.json');
  const ownerEmail = 'owner@example.com';
  const signingSecret = 'fixture-webhook-secret';
  const record = {id:'truck',name:'Fogón Piloto',email:ownerEmail,city:'Ponce',state:'Puerto Rico',items:[],checkout:'cs_fixture'};
  writeFileSync(file,JSON.stringify({truck:record}));
  const subscription = {id:'sub_fixture',customer:'cus_fixture',status:'trialing',items:{data:[{price:'price_monthly'}]}};
  const stripe = {
    webhooks:Stripe.webhooks,
    subscriptions:{retrieve:async id => {
      assert.equal(id,subscription.id);
      return subscription;
    }},
    charges:{retrieve:async id => ({id,customer:subscription.customer})}
  };
  const app = express(), webhookRouter = express.Router();
  app.use(webhookRouter);
  app.use(express.json(),express.urlencoded({extended:false}));
  const server = app.listen(0,'127.0.0.1');
  await new Promise(resolve=>server.once('listening',resolve));
  t.after(()=>{server.close();rmSync(folder,{recursive:true,force:true});});
  const origin = 'http://127.0.0.1:'+server.address().port;
  const emailed = [];
  mount(app,{file,origin,inviteEmail:ownerEmail,stripe,webhookRouter,
    limiter:(_req,_res,next)=>next(),rawBody:express.raw({type:'application/json'}),
    billing:{setup:'price_setup',monthly:'price_monthly',webhook:signingSecret,live:true,account:'acct_fixture'},
    sendLink:async email=>emailed.push(email)
  });
  async function send(type,object,{live=true,valid=true}={}) {
    const payload=JSON.stringify({id:'evt_'+type,type,livemode:live,data:{object}});
    const signature=Stripe.webhooks.generateTestHeaderString({payload,secret:valid?signingSecret:'other'});
    return (await fetch(origin+'/crea-tu-menu/stripe-webhook',{method:'POST',headers:{
      'content-type':'application/json','stripe-signature':signature
    },body:payload})).status;
  }
  for (const email of ['other@example.com', ownerEmail]){
    const res=await fetch(origin+'/crea-tu-menu/acceso',{method:'POST',headers:{Origin:origin},body:new URLSearchParams({email})});
    assert.equal(res.status,200);
  }
  assert.deepEqual(emailed,[ownerEmail]);

  const status = async (suffix='') => (await fetch(origin+'/donde-comer/truck'+suffix)).status;
  const checkout = {id:record.checkout,customer:subscription.customer,subscription:subscription.id,payment_status:'paid'};
  assert.equal(await send('checkout.session.completed',checkout,{valid:false}),400);
  assert.equal(await send('checkout.session.completed',checkout,{live:false}),400);
  assert.equal(await send('checkout.session.completed',{...checkout,id:'cs_unknown'}),200);
  assert.equal(await send('checkout.session.completed',{...checkout,payment_status:'unpaid'}),200);
  assert.equal(await status(),404);
  assert.equal(await send('checkout.session.async_payment_succeeded',checkout),200);
  assert.equal(await status(),200);
  assert.equal(await status('/qr'),200);
  const directory = await fetch(origin+'/donde-comer?region=pr',{redirect:'manual'});
  assert.equal(directory.status,302);
  assert.equal(directory.headers.get('location'),'/crea-tu-menu#planes-futuros');


  const invoice = {customer:subscription.customer,parent:{subscription_details:{subscription:subscription.id}}};
  subscription.status='past_due';
  assert.equal(await send('invoice.payment_failed',invoice),200);
  assert.equal(await status(),404);
  subscription.status='active';
  assert.equal(await send('invoice.paid',invoice),200);
  assert.equal(await status(),200);
  assert.equal(await send('charge.dispute.created',{charge:'ch_fixture'}),200);
  assert.equal(JSON.parse(readFileSync(file,'utf8')).truck.billingAlert.charge,'ch_fixture');
  subscription.status='canceled';
  assert.equal(await send('customer.subscription.deleted',subscription),200);
  assert.equal(await status(),404);
});
