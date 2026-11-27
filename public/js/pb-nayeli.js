(() => {
  const widget = document.querySelector('[data-nayeli]');
  if (!widget) return;
  const dialog = widget.querySelector('dialog');
  const launcher = widget.querySelector('.pb-nayeli-launch');
  const form = dialog.querySelector('form');
  const input = form.querySelector('textarea');
  const submit = form.querySelector('[type=submit]');
  const scroll = dialog.querySelector('.pb-nayeli-scroll');
  const messages = dialog.querySelector('.pb-nayeli-messages');
  const status = dialog.querySelector('.pb-nayeli-status');
  const history = [];
  let busy = false;

  function measure(name) {
    if (typeof window.gtag === 'function') window.gtag('event',name,{section:widget.dataset.nayeli});
  }

  function link(container,label,href,affiliate) {
    const url = new URL(href,location.href);
    if (url.protocol!=='https:' || url.username || url.password) return;
    const a = document.createElement('a');
    a.textContent = label;
    a.href = url.href;
    if (url.origin!==location.origin) {
      a.target = '_blank';
      a.rel = 'noopener';
    }
    if (affiliate) a.rel = (a.rel+' sponsored').trim();
    a.addEventListener('click',()=>measure('nayeli_result_click'));
    container.append(a);
  }

  function show(role,text,result) {
    const item = document.createElement('div');
    item.className = 'pb-nayeli-message '+role;
    if (!result) item.textContent = text;
    else {
      const allowed = new Set([...(result.allowedPaths || []),'https://chatgpt.com/']);
      const used = new Set();
      const pattern = /\*\*([^*\n]+)\*\*|\[([^\]\n]+)\]\\?\(\s*([^()\s\\]+)\s*\\?\)/g;
      let end = 0;
      for (const match of text.matchAll(pattern)) {
        const [part,bold,label,value] = match;
        item.append(text.slice(end,match.index));
        if (bold) {
          const strong = document.createElement('strong');
          strong.textContent = bold;
          item.append(strong);
        } else {
          const href = value.replace(/^https:\/\/(?:www\.)?masboricuaqueunmofongo\.com(?=\/)/,'');
          if (allowed.has(href) && !used.has(href)) {
            link(item,label,href);
            used.add(href);
          } else item.append(label);
        }
        end = match.index+part.length;
      }
      item.append(text.slice(end));
      if (result.links?.length) {
        const list = document.createElement('ul');
        list.className = 'pb-nayeli-links';
        for (const value of result.links) {
          const row = document.createElement('li');
          link(row,value.label,value.href,value.affiliate);
          const detail = [value.detail,value.attribution,value.affiliate?'Enlace de afiliado · PB puede recibir una comisión':''].filter(Boolean).join(' · ');
          if (detail) {
            const small = document.createElement('small');
            small.textContent = detail;
            row.append(small);
          }
          list.append(row);
        }
        item.append(list);
      }
      if (result.mapSource) {
        const source = document.createElement('small');
        source.className = 'pb-nayeli-source';
        source.translate = false;
        source.textContent = 'Google Maps';
        item.append(source);
      }
    }
    messages.append(item);
    scroll.scrollTop = scroll.scrollHeight;
  }

  launcher.addEventListener('click',()=>{
    dialog.showModal();
    measure('nayeli_open');
  });
  dialog.querySelector('.pb-nayeli-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>launcher.focus());
  for (const button of dialog.querySelectorAll('[data-nayeli-example]')) {
    button.addEventListener('click',()=>{
      if (busy) return;
      input.value = button.textContent;
      input.focus();
    });
  }
  form.addEventListener('submit',async event=>{
    event.preventDefault();
    const message = input.value.trim();
    if (!message || busy) return;
    busy = true;
    submit.disabled = true;
    input.value = '';
    status.textContent = 'Nayeli está buscando…';
    show('user',message);
    measure('nayeli_question');
    try {
      const response = await fetch('/api/pb-nayeli',{
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({message,history:history.slice(-6)}),signal:AbortSignal.timeout(25000)
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error);
      show('assistant',result.reply,result);
      history.push({role:'user',content:message},{role:'assistant',content:result.reply});
      if (history.length>6) history.splice(0,history.length-6);
      status.textContent = '';
    } catch (error) {
      status.textContent = error instanceof TypeError || error instanceof SyntaxError || error.name==='TimeoutError'
        ? 'No pude conectar. Intenta de nuevo en un ratito.' : error.message;
      if (!input.value) input.value = message;
    } finally {
      busy = false;
      submit.disabled = false;
    }
  });
})();
