'use strict';
// Pure validation/quotation helpers. No provider calls, customer records or payments.
function fail(message){throw new Error(message);}
function short(value,max,label){if(typeof value!=='string'||value.length>max)fail(`${label} inválido.`);return value.trim();}
function cents(value,label,nullable=true){if(value===null&&nullable)return null;if(!Number.isSafeInteger(value)||value<0||value>100000000)fail(`${label} inválido.`);return value;}
function extras(input,plan){
  const stock=input.stock??null;
  if(stock!==null&&(!Number.isSafeInteger(stock)||stock<0||stock>100000))fail('Existencias inválidas.');
  const sku=short(input.sku??'',60,'Código');
  const subcategory=short(input.subcategory??'',60,'Subcategoría');
  if(subcategory&&plan!=='plus')fail('Las subcategorías requieren Plus.');
  const groups=input.optionGroups??[];
  if(!Array.isArray(groups)||groups.length>2)fail('Usa hasta dos grupos de opciones.');
  const names=new Set();
  const optionGroups=groups.map(group=>{
    if(!group||typeof group!=='object')fail('Opciones inválidas.');
    const name=short(group.name,40,'Nombre de opción');
    if(!name||names.has(name.toLowerCase()))fail('Nombre de opción vacío o repetido.');names.add(name.toLowerCase());
    if(!Array.isArray(group.values)||!group.values.length||group.values.length>10)fail('Usa entre 1 y 10 opciones.');
    const values=group.values.map(value=>short(value,40,'Opción'));
    if(values.some(value=>!value)||new Set(values.map(value=>value.toLowerCase())).size!==values.length)fail('Opciones vacías o repetidas.');
    return {name,values};
  });
  let wholesale=null;
  if(input.wholesale){
    if(plan!=='plus')fail('El precio por cantidad requiere Plus.');
    const minimum=input.wholesale.minimum;
    if(!Number.isSafeInteger(minimum)||minimum<2||minimum>99)fail('Cantidad mínima inválida.');
    const unitCents=cents(input.wholesale.unitCents,'Precio por cantidad',false);
    if(input.priceCents===null||unitCents>=input.priceCents)fail('El precio por cantidad debe ser menor que el precio regular.');
    wholesale={minimum,unitCents};
  }
  return {sku,stock,optionGroups,wholesale,subcategory};
}
function normalizeSettings(input,plan){
  if(!input||typeof input!=='object')fail('Configuración inválida.');
  const theme=input.theme??'azul';
  if(!['azul','caribe','coral','bosque'].includes(theme))fail('Color inválido.');
  const shipping=input.shipping??[];
  if(!Array.isArray(shipping)||shipping.length>6)fail('Usa hasta seis métodos de entrega.');
  const labels=new Set();
  const methods=shipping.map(method=>{const label=short(method.label,80,'Entrega');if(!label||labels.has(label.toLowerCase()))fail('Método de entrega vacío o repetido.');labels.add(label.toLowerCase());return {label,feeCents:cents(method.feeCents,'Costo de entrega')};});
  let coupon=null;
  if(input.coupon){
    if(plan!=='plus')fail('Los cupones requieren Plus.');
    const code=short(input.coupon.code,24,'Cupón').toUpperCase();
    if(!/^[A-Z0-9_-]{3,24}$/.test(code))fail('Código de cupón inválido.');
    const percent=input.coupon.percent;
    if(!Number.isInteger(percent)||percent<1||percent>50)fail('El descuento debe ser de 1 a 50 %.');
    const expires=short(input.coupon.expires,30,'Vencimiento');
    if(!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(expires)||(!Number.isFinite(Date.parse(expires))||new Date(expires).toISOString()!==expires))fail('Vencimiento inválido.');
    coupon={code,percent,expires,minimumCents:cents(input.coupon.minimumCents??0,'Compra mínima',false)};
  }
  return {theme,intro:short(input.intro??'',600,'Presentación'),deliveryNote:short(input.deliveryNote??'',700,'Información de entrega'),returnsNote:short(input.returnsNote??'',700,'Información de devoluciones'),leadTime:short(input.leadTime??'',160,'Tiempo de preparación'),shipping:methods,coupon};
}
function defaultSettings(){return normalizeSettings({},'catalog');}
function quote({products,settings,lines,coupon='',shippingIndex=null,now=new Date()}){
  if(!Array.isArray(lines)||!lines.length||lines.length>30)fail('Selecciona entre 1 y 30 artículos.');
  const byId=new Map(products.map(product=>[product.id,product]));
  const totals=new Map();const seen=new Set();
  const selected=lines.map(line=>{
    if(!line||typeof line!=='object'||!Number.isInteger(line.quantity)||line.quantity<1||line.quantity>99)fail('Cantidad inválida.');
    const product=byId.get(line.id);
    if(!product||product.availability==='unavailable'||product.stock===0)fail('Un producto ya no está disponible.');
    const options=line.options??{};
    if(!options||typeof options!=='object'||Array.isArray(options))fail('Opciones inválidas.');
    const groups=product.optionGroups??[];
    if(Object.keys(options).length!==groups.length||groups.some(group=>!group.values.includes(options[group.name])))fail('Selecciona las opciones disponibles de cada producto.');
    const chosen=Object.fromEntries(groups.map(group=>[group.name,options[group.name]]));
    const key=JSON.stringify([product.id,chosen]);
    if(seen.has(key))fail('Combina las cantidades de un mismo artículo.');seen.add(key);
    const total=(totals.get(product.id)||0)+line.quantity;
    if(total>99||product.stock!==null&&product.stock!==undefined&&total>product.stock)fail('La cantidad supera las existencias disponibles.');
    totals.set(product.id,total);
    return {product,quantity:line.quantity,options:chosen};
  });
  const items=selected.map(({product,quantity,options})=>{
    const tier=product.wholesale;
    const unitCents=tier&&totals.get(product.id)>=tier.minimum?tier.unitCents:product.priceCents;
    return {id:product.id,title:product.title,quantity,options,unitCents,lineCents:unitCents===null?null:unitCents*quantity};
  });
  const subtotalCents=items.some(item=>item.lineCents===null)?null:items.reduce((sum,item)=>sum+item.lineCents,0);
  let appliedCoupon=null,discountCents=0;
  if(coupon){
    if(typeof coupon!=='string'||coupon.length>24)fail('Cupón inválido.');
    const valid=settings.coupon;
    if(!valid||valid.code!==coupon.trim().toUpperCase()||Date.parse(valid.expires)<=now.getTime())fail('Cupón inválido o vencido.');
    if(subtotalCents===null||subtotalCents<valid.minimumCents)fail('El pedido no alcanza el mínimo del cupón o necesita cotización.');
    discountCents=Math.round(subtotalCents*valid.percent/100);appliedCoupon=valid.code;
  }
  let delivery='Entrega por coordinar',shippingCents=null;
  if(shippingIndex!==null){
    if(!Number.isInteger(shippingIndex)||!settings.shipping[shippingIndex])fail('Selecciona un método de entrega válido.');
    const method=settings.shipping[shippingIndex];delivery=method.label;shippingCents=method.feeCents;
  }
  const totalCents=subtotalCents===null||shippingCents===null?null:subtotalCents-discountCents+shippingCents;
  const money=value=>value===null?'por confirmar':'$'+(value/100).toFixed(2);
  const message=['Saludos, quiero consultar este pedido que preparé en Planeta Boricua:',...items.map(item=>`${item.quantity} × ${item.title}${Object.keys(item.options).length?' ('+Object.entries(item.options).map(([key,value])=>key+': '+value).join(', ')+')':''} — ${money(item.lineCents)}`),`Subtotal: ${money(subtotalCents)}`,...(appliedCoupon?[`Cupón ${appliedCoupon}: -${money(discountCents)}`]:[]),`${delivery}: ${money(shippingCents)}`,`Total estimado: ${money(totalCents)}`,'Impuestos y disponibilidad por confirmar con el artesano. Esta solicitud no es un pago ni una reserva.'].join('\n');
  if(message.length>6000)fail('El pedido es demasiado largo para WhatsApp. Reduce los artículos.');
  return {items,subtotalCents,discountCents,appliedCoupon,shippingCents,delivery,totalCents,message};
}
function parseCsv(source){
  if(typeof source!=='string'||source.length>250000)fail('El CSV debe tener menos de 250 KB.');
  source=source.replace(/^\uFEFF/,'');
  const rows=[];let row=[],cell='',quoted=false,closed=false;
  for(let i=0;i<=source.length;i++){
    const c=source[i];
    if(quoted){if(c===undefined)fail('Comillas sin cerrar en CSV.');if(c==='"'){if(source[i+1]==='"'){cell+='"';i++;}else{quoted=false;closed=true;}}else cell+=c;continue;}
    if(c==='"'){if(cell||closed)fail('Comillas inválidas en CSV.');quoted=true;continue;}
    if(c===','||c==='\n'||c==='\r'||c===undefined){row.push(cell);cell='';closed=false;if(c!==','){if(row.some(value=>value!==''))rows.push(row);row=[];if(c==='\r'&&source[i+1]==='\n')i++;}continue;}
    if(closed)fail('Contenido después de comillas en CSV.');cell+=c;
  }
  if(rows.length<2||rows.length>51)fail('El CSV debe contener encabezados y entre 1 y 50 productos.');
  const headers=rows.shift().map(value=>value.trim());
  const allowed=['sku','title','description','price','stock','category','image','paymentUrl'];
  if(new Set(headers).size!==headers.length||headers.some(header=>!allowed.includes(header))||!headers.includes('title')||!headers.includes('description'))fail('Encabezados CSV inválidos. Usa sku,title,description,price,stock,category,image,paymentUrl.');
  return rows.map(values=>{if(values.length!==headers.length)fail('Una fila CSV tiene columnas de más o de menos.');return Object.fromEntries(headers.map((header,index)=>[header,values[index]]));});
}
function csvProducts(source){return parseCsv(source).map(row=>{
  const price=String(row.price??'').trim(),stock=String(row.stock??'').trim();
  if(price&&!/^\d{1,7}(\.\d{1,2})?$/.test(price))fail('Precio CSV inválido.');
  if(stock&&!/^\d{1,6}$/.test(stock))fail('Existencias CSV inválidas.');
  return {sku:row.sku??'',title:row.title,description:row.description,priceCents:price?Math.round(Number(price)*100):null,stock:stock?Number(stock):null,category:row.category??'',images:row.image?[row.image]:[],paymentUrl:row.paymentUrl??'',availability:'available',published:false};
});}
function exportCsv(products){
  const headers=['sku','title','description','price','stock','category','image','paymentUrl'];
  const cell=value=>{let s=String(value??'');if(/^[\s]*[=+@-]/.test(s)||/^[\t\r]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"';};
  return [headers,...products.map(product=>[product.sku??'',product.title,product.description,product.priceCents===null?'':(product.priceCents/100).toFixed(2),product.stock??'',product.category,product.images[0]??'',product.paymentUrl])].map(row=>row.map(cell).join(',')).join('\r\n');
}
module.exports={extras,normalizeSettings,defaultSettings,quote,csvProducts,exportCsv};
