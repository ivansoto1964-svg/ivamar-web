'use strict';
const crypto=require('node:crypto');
const {PRICE,fail}=require('./pb-businesses');
const EVENTS=['checkout.session.completed','checkout.session.async_payment_succeeded','checkout.session.async_payment_failed','checkout.session.expired','customer.subscription.created','customer.subscription.updated','customer.subscription.deleted','invoice.paid','invoice.payment_failed','charge.dispute.created','charge.refunded','radar.early_fraud_warning.created'];
const id=v=>typeof v==='string'?v:v?.id;
function createBilling({store,stripe,env=process.env,origin='https://www.masboricuaqueunmofongo.com',now=()=>Date.now()}){
 const locks=new Map();
 async function lock(key,fn){const previous=locks.get(key)||Promise.resolve();const next=previous.catch(()=>{}).then(fn);locks.set(key,next);try{return await next;}finally{if(locks.get(key)===next)locks.delete(key);}}
 function configured(){return Boolean(stripe&&env.PB_BUSINESS_BILLING_ENABLED==='true'&&env.PB_BUSINESS_STRIPE_PRICE_ID&&env.PB_BUSINESS_STRIPE_WEBHOOK_SECRET);}
 let verified;
 async function check(){if(!configured())fail('El cobro todavía está en preparación. Tu solicitud puede guardarse sin pagar.');if(!verified)verified=Promise.all([stripe.accounts.retrieve(),stripe.prices.retrieve(env.PB_BUSINESS_STRIPE_PRICE_ID)]).then(([account,price])=>{if(account.id!==(env.PB_BUSINESS_STRIPE_ACCOUNT_ID||'acct_1Q4866DjCGKYfj5T')||!account.charges_enabled||!price.active||price.currency!=='usd'||price.unit_amount!==PRICE||price.type!=='recurring'||price.recurring?.interval!=='month'||price.recurring.interval_count!==1)throw Error('La cuenta o tarifa de Stripe no corresponde al directorio PB.');return {price,account};}).catch(e=>{verified=null;throw e;});return verified;}
 async function checkout(record){return lock(record.id,async()=>{
  await check();let r=store.get(record.id);if(!r.approved||!r.emailVerifiedAt||r.hidden||r.billing.hold)fail('Primero confirma tu email y espera la aprobación del perfil.');
  if(r.billing.subscription){const sub=await stripe.subscriptions.retrieve(r.billing.subscription);if(!['canceled','incomplete_expired'].includes(sub.status))fail('Ya tienes una suscripción. Usa «Administrar mensualidad».');}
  if(!r.billing.customer){const c=await stripe.customers.create({email:r.email,name:r.draft.name},{idempotencyKey:'pb-business-customer-'+r.id});r=store.update(r.id,v=>v.billing.customer=c.id);}
  // Reuse an open Checkout, including after a lost response or process restart.
  if(r.billing.checkout){const session=await stripe.checkout.sessions.retrieve(r.billing.checkout);if(session.status==='open'&&session.url)return session.url;if(session.status==='complete')fail('Stripe está confirmando tu pago. No vuelvas a pagar; recarga en unos momentos.');r=store.update(r.id,v=>{v.billing.checkout=null;v.billing.pendingAttempt=null;});}
  if(!r.billing.pendingAttempt)r=store.update(r.id,v=>{v.billing.attempt++;v.billing.pendingAttempt={key:crypto.randomBytes(16).toString('hex'),created:now(),expires:Math.floor(now()/1000)+3600};});
  // An ambiguous Stripe request older than 24h needs reconciliation, never a blind new charge.
  if(now()-r.billing.pendingAttempt.created>23*3600000)fail('Debemos revisar el intento anterior de pago antes de crear otro. Escríbenos.');
  const session=await stripe.checkout.sessions.create({mode:'subscription',customer:r.billing.customer,client_reference_id:r.id,line_items:[{price:env.PB_BUSINESS_STRIPE_PRICE_ID,quantity:1}],subscription_data:{billing_mode:{type:'flexible'}},billing_address_collection:'required',locale:'es',expires_at:r.billing.pendingAttempt.expires,success_url:origin+'/negocios/mi-perfil?pago=recibido',cancel_url:origin+'/negocios/mi-perfil?pago=cancelado',integration_identifier:'pb-business-'+r.billing.pendingAttempt.key.slice(0,8).replace(/[0-9]/g,'a')},{idempotencyKey:'pb-business-checkout-'+r.id+'-'+r.billing.pendingAttempt.key});
  store.update(r.id,v=>v.billing.checkout=session.id);return session.url;
 });}
 async function portal(record){await check();if(!record.billing.customer)fail('Todavía no tienes una mensualidad.');return (await stripe.billingPortal.sessions.create({customer:record.billing.customer,return_url:origin+'/negocios/mi-perfil',configuration:env.PB_BUSINESS_STRIPE_PORTAL_ID||'bpc_1UYrSyDjCGKYfj5TmhJSOwaR'})).url;}
 async function reconcile(record,subscriptionId,invoice){
  const sub=await stripe.subscriptions.retrieve(subscriptionId);if(id(sub.customer)!==record.billing.customer||!sub.items?.data?.some(i=>id(i.price)===env.PB_BUSINESS_STRIPE_PRICE_ID))throw Error('Subscription ownership or price mismatch');
  let paidUntil=record.billing.paidUntil||0;
  const invoiceId=id(invoice)||id(sub.latest_invoice);
  if(invoiceId){const paid=await stripe.invoices.retrieve(invoiceId);const subId=id(paid.parent?.subscription_details?.subscription)||id(paid.subscription);if(paid.status==='paid'&&paid.amount_paid>=PRICE&&paid.currency==='usd'&&id(paid.customer)===record.billing.customer&&subId===sub.id){const lines=await stripe.invoices.listLineItems(paid.id,{limit:100});for(const line of lines.data)if((id(line.pricing?.price_details?.price)||id(line.price))===env.PB_BUSINESS_STRIPE_PRICE_ID&&line.quantity===1&&line.period?.end)paidUntil=Math.max(paidUntil,line.period.end);}}
  return store.update(record.id,r=>{r.billing.subscription=sub.id;r.billing.status=sub.status;r.billing.cancelAtPeriodEnd=Boolean(sub.cancel_at_period_end);r.billing.paidUntil=Math.max(r.billing.paidUntil||0,paidUntil);r.billing.checkout=null;r.billing.pendingAttempt=null;});
 }
 async function event(evt){
  const {price}=await check();if(evt.livemode!==price.livemode)throw Error('Stripe mode mismatch');if(!EVENTS.includes(evt.type))return;
  return lock('webhooks',async()=>{if(store.seen(evt.id))return;const obj=evt.data.object;
   if(['charge.dispute.created','charge.refunded','radar.early_fraud_warning.created'].includes(evt.type)){
    // Dedicated first-class Customer per business, never a customer shared with other PB services.
    const charge=evt.type==='charge.refunded'?obj:await stripe.charges.retrieve(id(obj.charge));const r=store.byCustomer(id(charge.customer));if(r)store.update(r.id,v=>{v.billing.hold={reason:evt.type,charge:charge.id,at:new Date(now()).toISOString()};});
   }else if(evt.type.startsWith('checkout.session.')){
    const r=store.byCustomer(id(obj.customer));if(r){if(r.billing.checkout!==obj.id&&id(obj.subscription)!==r.billing.subscription&&!(r.billing.pendingAttempt&&obj.client_reference_id===r.id))throw Error('Unrecognized checkout session');if(obj.subscription&&!['checkout.session.async_payment_failed','checkout.session.expired'].includes(evt.type)){await reconcile(r,id(obj.subscription));}else if(['checkout.session.expired','checkout.session.async_payment_failed'].includes(evt.type)){store.update(r.id,v=>{v.billing.checkout=null;v.billing.pendingAttempt=null;});}}
   }else if(evt.type.startsWith('customer.subscription.')){
    const r=store.byCustomer(id(obj.customer));if(r&&obj.items?.data?.some(i=>id(i.price)===env.PB_BUSINESS_STRIPE_PRICE_ID)){if(r.billing.subscription&&r.billing.subscription!==obj.id){const current=await stripe.subscriptions.retrieve(r.billing.subscription);if(!['canceled','incomplete_expired'].includes(current.status)){store.done(evt.id);return;}}await reconcile(r,obj.id);}
   }else{
    const subscriptionId=id(obj.parent?.subscription_details?.subscription)||id(obj.subscription);const r=store.byCustomer(id(obj.customer));if(r&&subscriptionId&&(!r.billing.subscription||r.billing.subscription===subscriptionId))await reconcile(r,subscriptionId,obj.id);
   }
   store.done(evt.id);
  });
 }
 return {configured,checkout,portal,event,check,reconcile,construct:(body,signature)=>stripe.webhooks.constructEvent(body,signature,env.PB_BUSINESS_STRIPE_WEBHOOK_SECRET)};
}
module.exports={createBilling,EVENTS};
