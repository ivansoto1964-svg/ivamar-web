(()=>{
  if(!('PerformanceObserver' in window)||navigator.webdriver)return;
  const values={lcp:null,inp:null,cls:0};let sent=false;
  try{new PerformanceObserver(list=>{const entries=list.getEntries();if(entries.length)values.lcp=Math.round(entries.at(-1).startTime)}).observe({type:'largest-contentful-paint',buffered:true})}catch(_){}
  try{new PerformanceObserver(list=>{for(const entry of list.getEntries())if(!entry.hadRecentInput)values.cls=Number((values.cls+entry.value).toFixed(4))}).observe({type:'layout-shift',buffered:true})}catch(_){}
  try{new PerformanceObserver(list=>{for(const entry of list.getEntries())values.inp=Math.max(values.inp||0,Math.round(entry.duration))}).observe({type:'event',buffered:true,durationThreshold:40})}catch(_){}
  function send(){if(sent)return;sent=true;const body=JSON.stringify({path:location.pathname,lcp:values.lcp,inp:values.inp,cls:values.cls});try{if(navigator.sendBeacon){navigator.sendBeacon('/api/pb-web-vitals',new Blob([body],{type:'application/json'}));return}fetch('/api/pb-web-vitals',{method:'POST',headers:{'Content-Type':'application/json'},body,keepalive:true,credentials:'omit'}).catch(()=>{})}catch(_){}}
  addEventListener('pagehide',send,{once:true});document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')send()},{once:true});
})();
