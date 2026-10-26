/* One form, one durable receipt. No visitor identifiers or local storage. */
'use strict';
(()=>{
 const form=document.querySelector('#permission-form');if(!form)return;
 const {lang,version,ticket,c}=config,button=form.querySelector('button[type=submit]'),message=document.querySelector('#message');
 const pad=n=>String(n).padStart(2,'0'),d=new Date();form.elements.visitDate.value=`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
 const add=(parent,tag,text)=>{const el=document.createElement(tag);el.textContent=text;parent.append(el);return el;};
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(button.disabled||!form.reportValidity())return;button.disabled=true;button.textContent=c.saving;message.textContent='';
  const data=Object.fromEntries(new FormData(form));Object.assign(data,{consent:form.elements.consent.checked,lang,version,ticket});
  try{
   const response=await fetch('/api/pb-turistiando/autorizar',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
   const result=await response.json();if(!response.ok||!result.ok)throw Error(result.error||c.error);
   const r=result.record,receipt=document.querySelector('#receipt');receipt.replaceChildren();add(receipt,'span',c.success).className='badge';add(receipt,'h1',c.success);
   const dl=add(receipt,'dl','');dl.className='receipt';for(const [label,value] of [[c.reference,r.id],[c.business,r.business],[c.location,r.location],[c.visitDate,r.visitDate],[c.name,r.name],[c.role,r.role],[c.email,r.email],[c.restrictions,r.restrictions||'—'],[c.saved,r.acceptedAt+' (UTC)']]){add(dl,'dt',label);add(dl,'dd',value);}
   for(const [title,text] of [[c.allowTitle,r.acceptedText.permission],[c.consent,r.acceptedText.authority],[c.policyTitle,r.acceptedText.transparency],[c.privacyTitle,r.acceptedText.privacy]]){add(receipt,'h2',title);add(receipt,'p',text);}
   add(receipt,'p',r.mail.venue.status==='accepted'&&r.mail.pb.status==='accepted'?c.accepted:c.pending);
   add(receipt,'p',c.copy);add(receipt,'p','Version: '+r.version+' · SHA-256: '+r.textSha256).className='small';
   const print=add(receipt,'button',c.print);print.type='button';print.addEventListener('click',()=>window.print());
   document.querySelector('#introduction').hidden=true;document.querySelector('#terms').hidden=true;document.querySelector('#form-section').hidden=true;receipt.hidden=false;receipt.focus();receipt.scrollIntoView({behavior:'smooth'});
  }catch(error){message.textContent=error.message||c.error;message.className='error';button.disabled=false;button.textContent=c.approve;}
 });
})();
