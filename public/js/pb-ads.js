(() => {
  const cards = [...document.querySelectorAll('[data-pb-campaign][data-pb-placement]')];
  if (!cards.length) return;
  const fitCreative = card => {
    const image = card.querySelector('.pb-sponsor-media img');
    if (!image) return;
    const apply = () => {
      if (image.naturalWidth > 0 && image.naturalHeight > 0 && image.naturalWidth / image.naturalHeight >= 3) {
        card.classList.add('pb-sponsor-card--wide');
      }
    };
    if (image.complete) apply();
    else image.addEventListener('load',apply,{once:true});
  };
  cards.forEach(fitCreative);
  const send = card => {
    const campaign = card.dataset.pbCampaign;
    const placement = card.dataset.pbPlacement;
    const key = `pb-ad-impression:${campaign}:${placement}:${location.pathname}`;
    try { if (sessionStorage.getItem(key)) return; sessionStorage.setItem(key,'1'); } catch (_) {}
    const payload = JSON.stringify({campaign,placement,page:location.pathname.slice(0,180)});
    if (navigator.sendBeacon) navigator.sendBeacon('/api/pb-ads/impression',new Blob([payload],{type:'application/json'}));
    else fetch('/api/pb-ads/impression',{method:'POST',headers:{'Content-Type':'application/json'},body:payload,keepalive:true,credentials:'omit'}).catch(()=>{});
  };
  if (!('IntersectionObserver' in window)) { cards.forEach(send); return; }
  const seen = new WeakMap();
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    const old = seen.get(entry.target);
    if (!entry.isIntersecting || entry.intersectionRatio < .5) { if (old) clearTimeout(old); seen.delete(entry.target); return; }
    if (old) return;
    seen.set(entry.target,setTimeout(() => { send(entry.target); observer.unobserve(entry.target); seen.delete(entry.target); },1000));
  }),{threshold:[.5]});
  cards.forEach(card => observer.observe(card));
})();
