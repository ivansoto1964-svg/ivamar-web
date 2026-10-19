'use strict';
function publicClient(){
  const config=JSON.parse(document.getElementById('public-catalog-data').textContent),cart=[];
  const list=document.getElementById('cart-lines'),message=document.getElementById('cart-message'),send=document.getElementById('cart-send');
  const metric=action=>{if(config.metricEndpoint)fetch(config.metricEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({event:action}),keepalive:true}).catch(()=>{});};
  metric('views');
  document.addEventListener('click',event=>{const link=event.target.closest('[data-metric]');if(link)metric(link.dataset.metric);});
  const clearQuote=()=>{send.hidden=true;send.removeAttribute('href');message.textContent='';};
  function render(){clearQuote();list.replaceChildren();cart.forEach((line,index)=>{const p=document.createElement('p');p.textContent=`${line.quantity} × ${config.products.find(p=>p.id===line.id).title} ${Object.entries(line.options).map(([key,value])=>`${key}: ${value}`).join(', ')} `;const remove=document.createElement('button');remove.textContent='Quitar';remove.className='alt';remove.type='button';remove.onclick=()=>{cart.splice(index,1);render();};p.append(remove);list.append(p);});if(!cart.length)list.textContent='Añade las creaciones que te interesen.';}
  document.querySelectorAll('[data-add-product]').forEach(button=>{button.onclick=()=>{const card=button.closest('[data-product]'),id=button.dataset.addProduct,quantity=Number(card.querySelector('[data-quantity]').value),options=Object.fromEntries(Array.from(card.querySelectorAll('[data-option]')).map(select=>[select.dataset.option,select.value]));if(!Number.isInteger(quantity)||quantity<1||quantity>99){message.textContent='La cantidad debe estar entre 1 y 99.';return;}const existing=cart.find(line=>line.id===id&&JSON.stringify(line.options)===JSON.stringify(options));if(existing)existing.quantity+=quantity;else cart.push({id,quantity,options});render();message.textContent='Añadido a tu selección. Prepara la consulta para confirmar precios y disponibilidad.';};});
  document.getElementById('cart-coupon').oninput=clearQuote;document.getElementById('cart-shipping').onchange=clearQuote;
  document.getElementById('cart-prepare').onclick=async event=>{
    clearQuote();event.target.disabled=true;
    try{
      const selection=document.getElementById('cart-shipping').value;
      const headers={'Content-Type':'application/json'};if(config.csrf)headers['X-CSRF-Token']=config.csrf;
      const response=await fetch(config.quoteEndpoint,{method:'POST',headers,body:JSON.stringify({lines:cart,coupon:document.getElementById('cart-coupon').value,shippingIndex:selection===''?null:Number(selection)})});const data=await response.json();if(!response.ok)throw new Error(data.error||'No pudimos preparar la consulta.');
      message.textContent=data.quote.message;
      if(data.whatsappUrl){send.href=data.whatsappUrl;send.hidden=false;}
      else message.textContent+='\nEl artesano no tiene WhatsApp configurado. Usa el contacto de su perfil.';
    }catch(error){message.textContent=error.message;}finally{event.target.disabled=false;}
  };
  const search=document.getElementById('catalog-search');search.oninput=()=>{const term=search.value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();document.querySelectorAll('[data-product]').forEach(card=>{card.hidden=!card.dataset.search.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().includes(term);});};
  render();
}
function panelClient(){
  const state=JSON.parse(document.getElementById('catalog-data').textContent),list=document.getElementById('product-list'),form=document.getElementById('product-form'),msg=document.getElementById('message');
  let images=[],busy=false,importPreview='';
  const message=value=>{msg.textContent=value;};
  async function api(suffix,body){const response=await fetch(state.base+suffix,{method:'POST',headers:{'Content-Type':'application/json','X-CSRF-Token':state.csrf},body:JSON.stringify(body)});const data=await response.json();if(!response.ok)throw new Error(data.error||'No se pudo completar la operación.');return data;}
  function button(label,action){const b=document.createElement('button');b.type='button';b.className='alt';b.textContent=label;b.onclick=action;return b;}
  function lock(value){busy=value;document.querySelectorAll('button,input,textarea,select').forEach(element=>element.disabled=value);}
  function drawPhotos(){const holder=document.getElementById('photos-list');if(!holder)return;holder.replaceChildren();images.forEach((url,index)=>{const figure=document.createElement('figure'),img=document.createElement('img');img.src=url;img.alt='Foto del producto';figure.append(img,button('Quitar foto',()=>{images.splice(index,1);drawPhotos();}));holder.append(figure);});}
  function reset(){form.reset();form.elements.id.value='';images=[];drawPhotos();document.getElementById('form-title').textContent='Añadir producto';}
  function draw(){
    list.replaceChildren();document.getElementById('count').textContent=String(state.products.length);
    if(!state.products.length){const p=document.createElement('p');p.textContent='Añade tu primera creación para comenzar.';list.append(p);}
    state.products.forEach(product=>{const article=document.createElement('article');article.className='card';const title=document.createElement('h3');title.textContent=product.title;const detail=document.createElement('p');detail.textContent=(product.published?'Visible':'Borrador / oculto')+' · '+(product.priceCents===null?'Consultar precio':'$'+(product.priceCents/100).toFixed(2))+' · '+(product.stock===null||product.stock===undefined?'Existencias sin limitar':product.stock+' disponibles');article.append(title,detail);
      if(form)article.append(button('Editar',()=>{reset();for(const key of ['id','title','description','category','availability','paymentUrl','sku','subcategory'])if(form.elements[key])form.elements[key].value=product[key]||'';form.elements.price.value=product.priceCents===null?'':(product.priceCents/100).toFixed(2);form.elements.stock.value=product.stock??'';form.elements.options.value=(product.optionGroups||[]).map(group=>group.name+':'+group.values.join('|')).join('\n');if(form.elements.wholesaleMinimum){form.elements.wholesaleMinimum.value=product.wholesale?.minimum??'';form.elements.wholesalePrice.value=product.wholesale? (product.wholesale.unitCents/100).toFixed(2):'';}form.elements.published.checked=product.published;images=product.images.slice();drawPhotos();document.getElementById('form-title').textContent='Editar producto';form.elements.title.focus();}));
      article.append(button('Eliminar',async()=>{if(busy||!confirm('¿Eliminar este producto del catálogo?'))return;lock(true);try{await api('/eliminar',{id:product.id});state.products=state.products.filter(p=>p.id!==product.id);if(form)reset();draw();message('Producto eliminado.');}catch(error){message(error.message);}finally{lock(false);}}));list.append(article);
    });
  }
  function price(value){const raw=String(value||'').trim();if(!raw)return null;if(!/^\d{1,7}(\.\d{1,2})?$/.test(raw))throw new Error('Usa precios con hasta dos decimales, por ejemplo 19.99.');return Math.round(Number(raw)*100);}
  if(form){
    document.getElementById('reset').onclick=reset;
    document.getElementById('photos').onchange=async event=>{if(busy)return;const files=Array.from(event.target.files);if(images.length+files.length>state.limits.photosPerProduct){message('Has superado el máximo de fotos.');event.target.value='';return;}lock(true);try{for(const file of files){if(file.size>5*1024*1024||!['image/jpeg','image/png','image/webp'].includes(file.type))throw new Error('Usa fotos JPG, PNG o WebP de hasta 5 MB.');const data=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(file);});const result=await api('/foto',{data});images.push(result.url);drawPhotos();}message('Fotos listas. Guarda el producto para conservar los cambios.');}catch(error){message(error.message);}finally{event.target.value='';lock(false);}};
    form.onsubmit=async event=>{event.preventDefault();if(busy)return;try{
      const values=new FormData(form),stock=String(values.get('stock')||'').trim();if(stock&&!/^\d+$/.test(stock))throw new Error('Las existencias deben ser un número entero.');
      const optionGroups=String(values.get('options')||'').split('\n').filter(line=>line.trim()).map(line=>{const colon=line.indexOf(':');if(colon<1)throw new Error('Opciones: usa Color:Rojo|Azul, una línea por grupo.');return {name:line.slice(0,colon).trim(),values:line.slice(colon+1).split('|').map(v=>v.trim())};});
      const minimum=values.get('wholesaleMinimum'),unitCents=price(values.get('wholesalePrice'));
      const body={id:values.get('id')||undefined,title:values.get('title'),description:values.get('description'),category:values.get('category')||'',subcategory:values.get('subcategory')||'',sku:values.get('sku')||'',stock:stock?Number(stock):null,optionGroups,wholesale:minimum||unitCents!==null?{minimum:Number(minimum),unitCents}:null,priceCents:price(values.get('price')),images:images.slice(),paymentUrl:values.get('paymentUrl')||'',availability:values.get('availability'),published:form.elements.published.checked};
      lock(true);const result=await api('/guardar',body);const index=state.products.findIndex(p=>p.id===result.product.id);if(index<0)state.products.push(result.product);else state.products[index]=result.product;reset();draw();message('Producto guardado.');
    }catch(error){message(error.message);}finally{lock(false);}};
  }
  const settingsForm=document.getElementById('settings-form');
  if(settingsForm)settingsForm.onsubmit=async event=>{event.preventDefault();if(busy)return;try{
    const v=new FormData(settingsForm);const shipping=String(v.get('shipping')||'').split('\n').filter(line=>line.trim()).map(line=>{const cut=line.lastIndexOf('|');if(cut<1)throw new Error('Entrega: usa Nombre|precio. Deja el precio vacío para coordinar.');return {label:line.slice(0,cut).trim(),feeCents:price(line.slice(cut+1))};});
    const code=String(v.get('couponCode')||'').trim();const coupon=code?{code,percent:Number(v.get('couponPercent')),minimumCents:price(v.get('couponMinimum'))??0,expires:new Date(String(v.get('couponExpires'))+'T23:59:59-04:00').toISOString()}:null;
    lock(true);await api('/configuracion',{theme:v.get('theme'),intro:v.get('intro'),deliveryNote:v.get('deliveryNote'),returnsNote:v.get('returnsNote'),leadTime:v.get('leadTime'),shipping,coupon});message('Configuración guardada.');
  }catch(error){message(error.message);}finally{lock(false);}};
  const csv=document.getElementById('csv-input'),preview=document.getElementById('csv-preview'),commit=document.getElementById('csv-commit');
  if(csv){csv.oninput=()=>{importPreview='';commit.hidden=true;};preview.onclick=async()=>{if(busy)return;lock(true);try{const result=await api('/importar',{csv:csv.value,dryRun:true});importPreview=csv.value;commit.hidden=false;message(`${result.count} productos nuevos listos para importar como borradores. No se han guardado cambios.`);}catch(error){message(error.message);}finally{lock(false);}};commit.onclick=async()=>{if(busy||!importPreview||importPreview!==csv.value)return;lock(true);try{const result=await api('/importar',{csv:importPreview,dryRun:false});state.products.push(...result.products);csv.value='';importPreview='';commit.hidden=true;draw();message('Productos importados como borradores. Revisa fotos y datos antes de publicarlos.');}catch(error){message(error.message);}finally{lock(false);}};}
  const orderForm=document.getElementById('order-form');
  function drawOrders(){
    const holder=document.getElementById('order-list');if(!holder)return;holder.replaceChildren();
    (state.orders||[]).forEach(order=>{const article=document.createElement('article'),heading=document.createElement('h3'),detail=document.createElement('p');article.className='card';heading.textContent=order.reference;detail.textContent=order.summary+' · '+order.status.replace(/_/g,' ')+(order.paymentReported?' · Pago confirmado manualmente por ti':' · Pago sin confirmar');article.append(heading,detail,button('Editar',()=>{for(const key of ['id','reference','summary','status'])orderForm.elements[key].value=order[key];orderForm.elements.amount.value=order.amountCents===null?'':(order.amountCents/100).toFixed(2);orderForm.elements.paymentReported.checked=order.paymentReported;orderForm.elements.reference.focus();}),button('Eliminar',async()=>{if(busy||!confirm('¿Eliminar este registro de pedido?'))return;lock(true);try{await api('/eliminar-pedido',{id:order.id});state.orders=state.orders.filter(item=>item.id!==order.id);drawOrders();message('Registro eliminado.');}catch(error){message(error.message);}finally{lock(false);}}));holder.append(article);});
  }
  if(orderForm){document.getElementById('order-reset').onclick=()=>{orderForm.reset();orderForm.elements.id.value='';};orderForm.onsubmit=async event=>{event.preventDefault();if(busy)return;try{const v=new FormData(orderForm),body={id:v.get('id')||undefined,reference:v.get('reference'),summary:v.get('summary'),status:v.get('status'),amountCents:price(v.get('amount')),paymentReported:orderForm.elements.paymentReported.checked};lock(true);const result=await api('/pedido',body),index=state.orders.findIndex(order=>order.id===result.order.id);if(index<0)state.orders.unshift(result.order);else state.orders[index]=result.order;orderForm.reset();orderForm.elements.id.value='';drawOrders();message('Registro guardado. PB no ha verificado el pago.');}catch(error){message(error.message);}finally{lock(false);}};drawOrders();}
  draw();
}
module.exports={panelClient,publicClient};
