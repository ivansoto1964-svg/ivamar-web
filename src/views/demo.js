module.exports = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=Pacifico&display=swap');
.demo-wrap{--fire:#FF4D00;--gold:#FFB800;--dark:#0F0A00;--smoke:#1A1208;--cream:#FFF8EE;--muted3:#8A7A5A;font-family:'DM Sans',sans-serif;background:var(--dark);color:var(--cream);margin:-20px;overflow-x:hidden;}
.demo-wrap *{box-sizing:border-box;margin:0;padding:0;}

/* BANNER */
.demo-banner{background:linear-gradient(135deg,#FF4D00,#FF6B00);padding:0.6rem 1.5rem;display:flex;align-items:center;justify-content:space-between;font-size:0.78rem;font-weight:600;color:white;position:sticky;top:0;z-index:200;flex-wrap:wrap;gap:0.5rem;}
.demo-banner-left{display:flex;align-items:center;gap:0.5rem;}
.demo-banner-dot{width:8px;height:8px;background:white;border-radius:50%;animation:blink2 1.5s ease-in-out infinite;}
@keyframes blink2{0%,100%{opacity:1}50%{opacity:0.3}}
.demo-banner-btn{background:white;color:#FF4D00;padding:0.3rem 0.8rem;border-radius:100px;font-size:0.72rem;font-weight:700;text-decoration:none;transition:all 0.2s;}
.demo-banner-btn:hover{transform:scale(1.05);}

/* HERO */
.demo-hero{position:relative;min-height:80vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:3rem 2rem;overflow:hidden;text-align:center;}
.demo-hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 50% 80%,rgba(255,77,0,0.35) 0%,transparent 70%),radial-gradient(ellipse 50% 40% at 20% 20%,rgba(255,184,0,0.15) 0%,transparent 60%);}
.demo-orb{position:absolute;border-radius:50%;filter:blur(60px);pointer-events:none;}
.demo-orb-1{width:300px;height:300px;background:rgba(255,77,0,0.3);bottom:-100px;left:10%;animation:demoFloat 4s ease-in-out infinite;}
.demo-orb-2{width:200px;height:200px;background:rgba(255,184,0,0.2);bottom:-50px;right:15%;animation:demoFloat 6s ease-in-out infinite;}
@keyframes demoFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
.demo-truck{font-size:4.5rem;animation:truckFloat 3s ease-in-out infinite;margin-bottom:1rem;filter:drop-shadow(0 0 30px rgba(255,77,0,0.5));position:relative;}
@keyframes truckFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
.demo-hero h1{font-family:'Pacifico',cursive;font-size:clamp(2.5rem,8vw,5rem);color:var(--gold);text-shadow:3px 3px 0 var(--fire),6px 6px 20px rgba(255,77,0,0.4);line-height:1;margin-bottom:0.5rem;position:relative;}
.demo-hero-sub{font-family:'Bebas Neue',sans-serif;font-size:1.2rem;letter-spacing:0.3em;color:var(--fire);margin-bottom:1rem;position:relative;}
.demo-hero-desc{color:var(--muted3);font-size:1rem;max-width:380px;line-height:1.6;position:relative;}

/* MENU */
.demo-menu{background:#1A1208;padding:3rem 1.5rem;}
.demo-section-header{text-align:center;margin-bottom:2.5rem;}
.demo-section-tag{display:inline-block;background:var(--fire);color:white;font-family:'Bebas Neue',sans-serif;letter-spacing:0.2em;padding:0.3rem 1rem;border-radius:2px;font-size:0.85rem;margin-bottom:0.6rem;}
.demo-section-header h2{font-family:'Bebas Neue',sans-serif;font-size:clamp(2rem,5vw,3rem);letter-spacing:0.05em;}
.demo-cat-tabs{display:flex;gap:0.5rem;overflow-x:auto;padding-bottom:0.5rem;margin-bottom:2rem;max-width:800px;margin-left:auto;margin-right:auto;scrollbar-width:none;}
.demo-cat-tabs::-webkit-scrollbar{display:none;}
.demo-cat-tab{flex-shrink:0;padding:0.5rem 1.2rem;border:1.5px solid rgba(255,184,0,0.3);border-radius:100px;background:transparent;color:var(--muted3);font-family:'DM Sans',sans-serif;font-size:0.88rem;cursor:pointer;transition:all 0.2s;white-space:nowrap;}
.demo-cat-tab.active,.demo-cat-tab:hover{background:var(--gold);border-color:var(--gold);color:var(--dark);font-weight:600;}
.demo-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1.2rem;max-width:900px;margin:0 auto;}

/* CARD */
.demo-card{background:linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02));border:1px solid rgba(255,184,0,0.15);border-radius:14px;overflow:hidden;transition:transform 0.25s,border-color 0.25s,box-shadow 0.25s;}
.demo-card:hover{transform:translateY(-3px);border-color:rgba(255,184,0,0.4);box-shadow:0 10px 30px rgba(255,77,0,0.12);}
.demo-card-img{position:relative;height:160px;overflow:hidden;background:linear-gradient(135deg,rgba(255,77,0,0.15),rgba(255,184,0,0.1));display:flex;align-items:center;justify-content:center;}
.demo-card-img img{width:100%;height:100%;object-fit:cover;display:block;}
.demo-card-img .demo-card-emoji-fallback{font-size:3.5rem;}
.demo-popular{position:absolute;top:0.6rem;right:0.6rem;background:var(--fire);color:white;font-size:0.6rem;font-weight:700;letter-spacing:0.1em;padding:0.2rem 0.5rem;border-radius:100px;text-transform:uppercase;}
.demo-sold-out{position:absolute;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue',sans-serif;font-size:1.2rem;letter-spacing:0.1em;color:rgba(255,255,255,0.7);}
.demo-card-body{padding:1rem;}
.demo-card-title{font-family:'Bebas Neue',sans-serif;font-size:1.3rem;letter-spacing:0.05em;margin-bottom:0.2rem;}
.demo-card-desc{font-size:0.78rem;color:var(--muted3);line-height:1.4;margin-bottom:0.8rem;}
.demo-card-footer{display:flex;align-items:center;justify-content:space-between;}
.demo-price{font-family:'Bebas Neue',sans-serif;font-size:1.5rem;color:var(--gold);}
.demo-add-btn{width:36px;height:36px;border-radius:50%;border:none;background:var(--fire);color:white;font-size:1.3rem;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;}
.demo-add-btn:hover{background:var(--gold);color:var(--dark);transform:scale(1.1);}
.demo-add-btn:disabled{background:rgba(255,255,255,0.1);cursor:not-allowed;transform:none;}

/* CART BAR */
.demo-cart-bar{position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%) translateY(100px);background:linear-gradient(135deg,#1A1208,#0F0A00);border:1.5px solid rgba(255,184,0,0.4);border-radius:100px;padding:0.9rem 1.5rem;display:flex;align-items:center;gap:1rem;cursor:pointer;transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.3s;box-shadow:0 8px 40px rgba(0,0,0,0.5);z-index:100;min-width:260px;max-width:90vw;}
.demo-cart-bar.visible{transform:translateX(-50%) translateY(0);}
.demo-cart-bubble{background:var(--fire);color:white;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;flex-shrink:0;}
.demo-cart-text{flex:1;}
.demo-cart-text-main{font-weight:600;font-size:0.88rem;}
.demo-cart-text-sub{font-size:0.7rem;color:var(--muted3);}
.demo-cart-total{font-family:'Bebas Neue',sans-serif;font-size:1.2rem;color:var(--gold);}

/* MODAL */
.demo-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.85);backdrop-filter:blur(8px);z-index:200;display:none;align-items:flex-end;justify-content:center;padding:1rem;}
.demo-overlay.open{display:flex;}
.demo-modal{background:#1A1208;border:1px solid rgba(255,184,0,0.2);border-radius:24px 24px 16px 16px;width:100%;max-width:460px;padding:1.8rem;animation:slideUp2 0.35s cubic-bezier(0.34,1.56,0.64,1);max-height:90vh;overflow-y:auto;}
@keyframes slideUp2{from{transform:translateY(60px);opacity:0}to{transform:translateY(0);opacity:1}}
.demo-modal-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.2rem;}
.demo-modal-title{font-family:'Bebas Neue',sans-serif;font-size:1.6rem;letter-spacing:0.05em;}
.demo-close{width:32px;height:32px;border-radius:50%;border:1px solid rgba(255,255,255,0.15);background:transparent;color:var(--muted3);font-size:1rem;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;}
.demo-close:hover{border-color:var(--fire);color:var(--fire);}

/* CART ITEMS */
.demo-cart-item{padding:0.8rem 0;border-bottom:1px solid rgba(255,255,255,0.06);}
.demo-cart-item-top{display:flex;align-items:center;gap:0.8rem;}
.demo-item-emoji{font-size:1.6rem;flex-shrink:0;}
.demo-item-info{flex:1;}
.demo-item-name{font-weight:600;font-size:0.85rem;}
.demo-item-price-sm{font-size:0.75rem;color:var(--muted3);}
.demo-qty-ctrl{display:flex;align-items:center;gap:0.4rem;}
.demo-qty-btn{width:24px;height:24px;border-radius:50%;border:1px solid rgba(255,255,255,0.2);background:transparent;color:var(--cream);cursor:pointer;font-size:0.9rem;transition:all 0.2s;display:flex;align-items:center;justify-content:center;}
.demo-qty-btn:hover{border-color:var(--fire);color:var(--fire);}
.demo-qty-num{font-weight:600;min-width:18px;text-align:center;font-size:0.9rem;}

/* SPECIAL INSTRUCTIONS */
.demo-item-notes{margin-top:0.5rem;}
.demo-item-notes-btn{background:transparent;border:1px dashed rgba(255,184,0,0.25);color:var(--muted3);font-size:0.72rem;padding:0.3rem 0.7rem;border-radius:6px;cursor:pointer;transition:all 0.2s;font-family:'DM Sans',sans-serif;}
.demo-item-notes-btn:hover{border-color:rgba(255,184,0,0.5);color:var(--gold);}
.demo-item-notes-input{width:100%;margin-top:0.4rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,184,0,0.2);border-radius:7px;padding:0.5rem 0.7rem;color:var(--cream);font-family:'DM Sans',sans-serif;font-size:0.78rem;outline:none;resize:none;display:none;}
.demo-item-notes-input.visible{display:block;}
.demo-item-notes-input::placeholder{color:var(--muted3);}

/* DELIVERY OPTIONS */
.demo-delivery-opts{display:grid;grid-template-columns:1fr 1fr;gap:0.6rem;margin-bottom:1rem;}
.demo-delivery-opt{border:1.5px solid rgba(255,255,255,0.1);border-radius:10px;padding:0.8rem;cursor:pointer;transition:all 0.2s;text-align:center;}
.demo-delivery-opt.selected{border-color:var(--gold);background:rgba(255,184,0,0.08);}
.demo-delivery-opt-icon{font-size:1.4rem;margin-bottom:0.3rem;}
.demo-delivery-opt-name{font-size:0.82rem;font-weight:700;color:var(--cream);}
.demo-delivery-opt-desc{font-size:0.68rem;color:var(--muted3);margin-top:0.2rem;}

.demo-summary{background:rgba(255,184,0,0.06);border:1px solid rgba(255,184,0,0.15);border-radius:10px;padding:0.9rem 1.1rem;margin:1.2rem 0;}
.demo-summary-row{display:flex;justify-content:space-between;font-size:0.85rem;margin-bottom:0.3rem;color:var(--muted3);}
.demo-summary-row.total{color:var(--cream);font-weight:700;font-size:1rem;margin-top:0.5rem;padding-top:0.5rem;border-top:1px solid rgba(255,255,255,0.08);margin-bottom:0;}
.demo-form-group{margin-bottom:0.8rem;}
.demo-form-group label{display:block;font-size:0.72rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--muted3);margin-bottom:0.3rem;}
.demo-form-group input{width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:8px;padding:0.65rem 0.9rem;color:var(--cream);font-family:'DM Sans',sans-serif;font-size:0.9rem;transition:border-color 0.2s;outline:none;}
.demo-form-group input:focus{border-color:var(--gold);}
.demo-action-btns{display:flex;flex-direction:column;gap:0.7rem;margin-top:1rem;}
.demo-btn{width:100%;padding:0.9rem;border-radius:10px;border:none;font-family:'Bebas Neue',sans-serif;font-size:1.2rem;letter-spacing:0.1em;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:0.5rem;}
.demo-btn-stripe{background:linear-gradient(135deg,var(--fire),#FF6B00);color:white;}
.demo-btn-stripe:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(255,77,0,0.35);}
.demo-btn-wa{background:linear-gradient(135deg,#25D366,#128C7E);color:white;}
.demo-btn-wa:hover{transform:translateY(-2px);}
.demo-btn-divider{text-align:center;font-size:0.72rem;color:var(--muted3);letter-spacing:0.1em;}

/* TOAST */
.demo-toast{position:fixed;top:1.5rem;left:50%;transform:translateX(-50%) translateY(-80px);background:#1A2E1A;border:1px solid #25D366;color:#25D366;padding:0.7rem 1.3rem;border-radius:100px;font-weight:600;font-size:0.85rem;z-index:999;transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1);white-space:nowrap;}
.demo-toast.show{transform:translateX(-50%) translateY(0);}

/* IVA CHAT */
.demo-iva-section{background:#0F0A00;padding:3rem 1.5rem;border-top:1px solid rgba(255,184,0,0.1);}
.demo-iva-header{text-align:center;margin-bottom:2rem;}
.demo-iva-tag{display:inline-block;background:rgba(255,77,0,0.15);border:1px solid rgba(255,77,0,0.3);color:var(--fire);font-family:'Bebas Neue',sans-serif;letter-spacing:0.2em;padding:0.3rem 1rem;border-radius:2px;font-size:0.85rem;margin-bottom:0.6rem;}
.demo-iva-header h2{font-family:'Bebas Neue',sans-serif;font-size:clamp(1.8rem,4vw,2.5rem);letter-spacing:0.05em;color:var(--cream);margin-bottom:0.4rem;}
.demo-iva-header h2 span{color:var(--gold);}
.demo-iva-header p{font-size:0.88rem;color:var(--muted3);max-width:400px;margin:0 auto;line-height:1.6;}
.demo-chat-box{background:#1A1208;border:1px solid rgba(255,184,0,0.2);border-radius:16px;overflow:hidden;max-width:600px;margin:0 auto;}
.demo-chat-topbar{background:#0F0A00;padding:1rem 1.2rem;display:flex;align-items:center;gap:0.8rem;border-bottom:1px solid rgba(255,184,0,0.1);}
.demo-chat-av{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--fire),var(--gold));display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;}
.demo-chat-agent-name{font-weight:700;font-size:0.88rem;color:var(--cream);}
.demo-chat-status{font-size:0.7rem;color:#4CAF50;display:flex;align-items:center;gap:3px;}
.demo-chat-status::before{content:'●';font-size:0.5rem;}
.demo-chat-msgs{height:300px;overflow-y:auto;padding:1.2rem;display:flex;flex-direction:column;gap:0.8rem;scroll-behavior:smooth;}
.demo-chat-msgs::-webkit-scrollbar{width:3px;}
.demo-chat-msgs::-webkit-scrollbar-thumb{background:rgba(255,184,0,0.2);border-radius:2px;}
.demo-msg{max-width:82%;display:flex;flex-direction:column;gap:3px;}
.demo-msg.bot{align-self:flex-start;}
.demo-msg.user{align-self:flex-end;}
.demo-msg-bubble{padding:0.75rem 1rem;border-radius:12px;font-size:0.85rem;line-height:1.5;}
.demo-msg.bot .demo-msg-bubble{background:rgba(255,184,0,0.08);border:1px solid rgba(255,184,0,0.15);color:var(--cream);border-bottom-left-radius:4px;}
.demo-msg.user .demo-msg-bubble{background:var(--fire);color:white;border-bottom-right-radius:4px;}
.demo-msg-time{font-size:0.65rem;color:var(--muted3);}
.demo-msg.user .demo-msg-time{text-align:right;}
.demo-typing{display:flex;gap:3px;padding:0.75rem 1rem;background:rgba(255,184,0,0.06);border:1px solid rgba(255,184,0,0.1);border-radius:12px;border-bottom-left-radius:4px;width:fit-content;}
.demo-typing span{width:5px;height:5px;background:var(--gold);border-radius:50%;animation:demoType 1.2s ease-in-out infinite;}
.demo-typing span:nth-child(2){animation-delay:0.2s;}
.demo-typing span:nth-child(3){animation-delay:0.4s;}
@keyframes demoType{0%,100%{opacity:0.3;transform:scale(0.8)}50%{opacity:1;transform:scale(1)}}
.demo-chat-suggestions{display:flex;gap:0.5rem;flex-wrap:wrap;padding:0.8rem 1.2rem;}
.demo-suggestion{padding:0.4rem 0.9rem;background:rgba(255,77,0,0.08);border:1px solid rgba(255,77,0,0.2);border-radius:100px;font-size:0.75rem;color:var(--fire);cursor:pointer;transition:all 0.2s;white-space:nowrap;}
.demo-suggestion:hover{background:rgba(255,77,0,0.18);}
.demo-chat-input-area{padding:1rem 1.2rem;border-top:1px solid rgba(255,184,0,0.1);display:flex;gap:0.8rem;align-items:center;}
.demo-chat-input{flex:1;background:rgba(255,255,255,0.04);border:1px solid rgba(255,184,0,0.15);border-radius:8px;padding:0.75rem 1rem;color:var(--cream);font-family:'DM Sans',sans-serif;font-size:0.88rem;outline:none;transition:border-color 0.2s;}
.demo-chat-input:focus{border-color:rgba(255,184,0,0.4);}
.demo-chat-input::placeholder{color:var(--muted3);}
.demo-chat-send{width:38px;height:38px;background:var(--fire);border:none;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1rem;transition:all 0.2s;flex-shrink:0;}
.demo-chat-send:hover{background:var(--gold);color:var(--dark);}

/* FLOAT */
.demo-float-btn{position:fixed;bottom:24px;right:24px;width:54px;height:54px;background:linear-gradient(135deg,var(--fire),#FF6B00);border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:20px;box-shadow:0 8px 25px rgba(255,77,0,0.4);z-index:500;transition:all 0.3s;animation:firePulse 3s ease-in-out infinite;}
@keyframes firePulse{0%,100%{box-shadow:0 8px 25px rgba(255,77,0,0.4)}50%{box-shadow:0 8px 35px rgba(255,77,0,0.6)}}
.demo-float-btn:hover{transform:scale(1.1);}
.demo-float-badge{position:absolute;top:-2px;right:-2px;width:15px;height:15px;background:#4CAF50;border-radius:50%;border:2px solid var(--dark);animation:blink2 2s infinite;}
.demo-float-panel{position:fixed;bottom:88px;right:24px;width:300px;max-height:420px;background:#1A1208;border:1px solid rgba(255,184,0,0.2);border-radius:16px;overflow:hidden;z-index:499;display:none;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,0.6);}
.demo-float-panel.open{display:flex;}
.demo-float-header{background:#0F0A00;padding:0.9rem 1rem;display:flex;align-items:center;gap:0.7rem;border-bottom:1px solid rgba(255,184,0,0.1);}
.demo-float-av{width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,var(--fire),var(--gold));display:flex;align-items:center;justify-content:center;font-size:0.9rem;flex-shrink:0;}
.demo-float-info{flex:1;}
.demo-float-name{font-size:0.78rem;font-weight:700;color:var(--cream);}
.demo-float-status{font-size:0.65rem;color:#4CAF50;}
.demo-float-close{background:transparent;border:none;color:var(--muted3);font-size:1rem;cursor:pointer;}
.demo-float-msgs{flex:1;overflow-y:auto;padding:0.8rem;display:flex;flex-direction:column;gap:0.7rem;}
.demo-float-input-area{padding:0.7rem 0.8rem;border-top:1px solid rgba(255,184,0,0.1);display:flex;gap:0.5rem;}
.demo-float-input{flex:1;background:rgba(255,255,255,0.04);border:1px solid rgba(255,184,0,0.15);border-radius:7px;padding:0.6rem 0.8rem;color:var(--cream);font-family:'DM Sans',sans-serif;font-size:0.8rem;outline:none;}
.demo-float-input::placeholder{color:var(--muted3);}
.demo-float-send{width:30px;height:30px;background:var(--fire);border:none;border-radius:7px;cursor:pointer;font-size:0.85rem;flex-shrink:0;}

/* CTA */
.demo-cta-bottom{background:#0F0A00;padding:3rem 2rem;text-align:center;border-top:1px solid rgba(255,184,0,0.1);}
.demo-cta-bottom h3{font-family:'Bebas Neue',sans-serif;font-size:2rem;letter-spacing:0.05em;color:var(--gold);margin-bottom:0.8rem;}
.demo-cta-bottom p{color:var(--muted3);font-size:0.9rem;margin-bottom:1.5rem;max-width:400px;margin-left:auto;margin-right:auto;line-height:1.6;}
.demo-cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}
.demo-cta-btn-main{display:inline-flex;align-items:center;gap:0.5rem;background:#00E5C8;color:#030508;padding:0.8rem 1.8rem;border-radius:8px;font-family:'DM Sans',sans-serif;font-weight:700;font-size:0.9rem;text-decoration:none;transition:all 0.25s;}
.demo-cta-btn-main:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(0,229,200,0.25);}
.demo-cta-btn-ghost{display:inline-flex;align-items:center;gap:0.5rem;background:transparent;color:var(--cream);padding:0.8rem 1.8rem;border-radius:8px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:0.9rem;text-decoration:none;transition:all 0.25s;border:1px solid rgba(255,255,255,0.12);}
.demo-cta-btn-ghost:hover{border-color:rgba(255,255,255,0.3);}

@media(max-width:480px){
  .demo-grid{grid-template-columns:1fr 1fr;gap:0.8rem;}
  .demo-card-desc{display:none;}
  .demo-cta-btns{flex-direction:column;align-items:center;}
  .demo-cta-btns a{width:100%;justify-content:center;}
}
</style>

<div class="demo-wrap">

  <div class="demo-banner">
    <div class="demo-banner-left"><span class="demo-banner-dot"></span>DEMO — Ejemplo real de Ivamar AI</div>
    <div><a href="/quote" class="demo-banner-btn">¿Quieres uno así? →</a></div>
  </div>

  <div class="demo-hero">
    <div class="demo-hero-bg"></div>
    <div class="demo-orb demo-orb-1"></div>
    <div class="demo-orb demo-orb-2"></div>
    <div class="demo-truck">🚚</div>
    <h1>El Rincón<br>Boricua</h1>
    <p class="demo-hero-sub">Food Truck · Puerto Rico & USA</p>
    <p class="demo-hero-desc">Sabores auténticos de la isla directo a ti. Pide aquí y paga fácil.</p>
  </div>

  <div class="demo-menu">
    <div class="demo-section-header">
      <div class="demo-section-tag">🔥 Menú del Día</div>
      <h2>Elige Tu Antojo</h2>
    </div>
    <div class="demo-cat-tabs">
      <button class="demo-cat-tab active" onclick="demoFilter('all',this)">Todo</button>
      <button class="demo-cat-tab" onclick="demoFilter('platos',this)">🍽 Platos</button>
      <button class="demo-cat-tab" onclick="demoFilter('snacks',this)">🌮 Snacks</button>
      <button class="demo-cat-tab" onclick="demoFilter('bebidas',this)">🥤 Bebidas</button>
      <button class="demo-cat-tab" onclick="demoFilter('postres',this)">🍮 Postres</button>
    </div>
    <div class="demo-grid" id="demoGrid"></div>
  </div>

  <div class="demo-cart-bar" id="demoCartBar" onclick="demoOpenModal()">
    <div class="demo-cart-bubble" id="demoCartCount">0</div>
    <div class="demo-cart-text">
      <div class="demo-cart-text-main">Ver mi orden</div>
      <div class="demo-cart-text-sub" id="demoCartSub">Sin items</div>
    </div>
    <div class="demo-cart-total" id="demoCartTotal">$0.00</div>
  </div>

  <div class="demo-overlay" id="demoOverlay">
    <div class="demo-modal">
      <div class="demo-modal-header">
        <div class="demo-modal-title">Tu Orden 🧾</div>
        <button class="demo-close" onclick="demoCloseModal()">✕</button>
      </div>

      <!-- DELIVERY OPTIONS -->
      <div style="margin-bottom:1rem;">
        <div style="font-size:0.72rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--muted3);margin-bottom:0.6rem;">¿Cómo lo quieres?</div>
        <div class="demo-delivery-opts">
          <div class="demo-delivery-opt selected" id="opt-pickup" onclick="selectDelivery('pickup')">
            <div class="demo-delivery-opt-icon">🏃</div>
            <div class="demo-delivery-opt-name">Recoger</div>
            <div class="demo-delivery-opt-desc">Pick up en el truck</div>
          </div>
          <div class="demo-delivery-opt" id="opt-delivery" onclick="selectDelivery('delivery')">
            <div class="demo-delivery-opt-icon">🛵</div>
            <div class="demo-delivery-opt-name">Delivery</div>
            <div class="demo-delivery-opt-desc">Te lo llevamos (+$3)</div>
          </div>
        </div>
        <div id="delivery-address-field" style="display:none;margin-top:0.5rem;">
          <input type="text" id="deliveryAddress" placeholder="📍 Tu dirección de entrega" style="width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:8px;padding:0.65rem 0.9rem;color:var(--cream);font-family:'DM Sans',sans-serif;font-size:0.88rem;outline:none;" />
        </div>
      </div>

      <div id="demoCartItems"></div>

      <div class="demo-summary">
        <div class="demo-summary-row"><span>Subtotal</span><span id="demoSub">$0.00</span></div>
        <div class="demo-summary-row" id="delivery-fee-row" style="display:none;"><span>Delivery fee</span><span>$3.00</span></div>
        <div class="demo-summary-row"><span>Tax (7%)</span><span id="demoTax">$0.00</span></div>
        <div class="demo-summary-row total"><span>TOTAL</span><span id="demoTotal">$0.00</span></div>
      </div>

      <div class="demo-form-group">
        <label>Tu Nombre *</label>
        <input type="text" id="demoName" placeholder="Ej: María González">
      </div>
      <div class="demo-form-group">
        <label>Teléfono</label>
        <input type="tel" id="demoPhone" placeholder="+1 (787) 000-0000">
      </div>

      <div class="demo-action-btns">
        <button class="demo-btn demo-btn-stripe" onclick="demoStripe()">💳 PAGAR CON TARJETA</button>
        <div class="demo-btn-divider">— o enviar pedido por —</div>
        <button class="demo-btn demo-btn-wa" onclick="demoWhatsApp()">📲 WHATSAPP AL NEGOCIO</button>
      </div>
    </div>
  </div>

  <div class="demo-toast" id="demoToast"></div>

  <!-- IVA CHAT -->
  <div class="demo-iva-section">
    <div class="demo-iva-header">
      <div class="demo-iva-tag">🤖 ASISTENTE IA</div>
      <h2>Habla con <span>IvA</span></h2>
      <p>IvA conoce el menú, precios y horario. Pregúntale lo que quieras — en español o inglés.</p>
    </div>
    <div class="demo-chat-box">
      <div class="demo-chat-topbar">
        <div class="demo-chat-av">🤖</div>
        <div>
          <div class="demo-chat-agent-name">IvA — El Rincón Boricua</div>
          <div class="demo-chat-status">En línea ahora</div>
        </div>
      </div>
      <div class="demo-chat-msgs" id="demoChatMsgs">
        <div class="demo-msg bot">
          <div class="demo-msg-bubble">¡Wepa! Soy IvA, el asistente de El Rincón Boricua. ¿Qué te preparo hoy? 🥪🔥</div>
          <div class="demo-msg-time">Ahora</div>
        </div>
      </div>
      <div class="demo-chat-suggestions" id="demoChatSugg">
        <span class="demo-suggestion" onclick="demoSendSugg(this)">¿Qué tiene el menú?</span>
        <span class="demo-suggestion" onclick="demoSendSugg(this)">¿Cuál es el más popular?</span>
        <span class="demo-suggestion" onclick="demoSendSugg(this)">¿Dónde están ubicados?</span>
        <span class="demo-suggestion" onclick="demoSendSugg(this)">¿Hacen delivery?</span>
      </div>
      <div class="demo-chat-input-area">
        <input class="demo-chat-input" id="demoChatInput" placeholder="Escribe tu pregunta..." onkeydown="if(event.key==='Enter')demoSendChat('main')" />
        <button class="demo-chat-send" onclick="demoSendChat('main')">➤</button>
      </div>
    </div>
  </div>

  <!-- FLOAT WIDGET -->
  <button class="demo-float-btn" onclick="demoToggleFloat()">
    🤖<div class="demo-float-badge"></div>
  </button>
  <div class="demo-float-panel" id="demoFloatPanel">
    <div class="demo-float-header">
      <div class="demo-float-av">🤖</div>
      <div class="demo-float-info">
        <div class="demo-float-name">IvA — El Rincón Boricua</div>
        <div class="demo-float-status">● En línea</div>
      </div>
      <button class="demo-float-close" onclick="demoToggleFloat()">✕</button>
    </div>
    <div class="demo-float-msgs" id="demoFloatMsgs">
      <div class="demo-msg bot">
        <div class="demo-msg-bubble">¡Wepa! Soy IvA 🔥 ¿Qué te preparo?</div>
        <div class="demo-msg-time">Ahora</div>
      </div>
    </div>
    <div class="demo-float-input-area">
      <input class="demo-float-input" id="demoFloatInput" placeholder="Escribe aquí..." onkeydown="if(event.key==='Enter')demoSendChat('float')" />
      <button class="demo-float-send" onclick="demoSendChat('float')">➤</button>
    </div>
  </div>

  <div class="demo-cta-bottom">
    <h3>¿Quieres una página así para tu negocio?</h3>
    <p>En 48 horas tu food truck, restaurante o negocio tiene su propia página con asistente IA, menú y pagos.</p>
    <div class="demo-cta-btns">
      <a href="/quote" class="demo-cta-btn-main">Solicitar mi página →</a>
      <a href="https://wa.me/18635216708" target="_blank" class="demo-cta-btn-ghost">Hablar por WhatsApp</a>
    </div>
  </div>

</div>

<script>
const DEMO_MENU = [
  {id:1,name:"Mofongo con Camarones",desc:"Mofongo artesanal con camarones al ajillo",price:14.99,emoji:"🥣",cat:"platos",popular:true,img:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80"},
  {id:2,name:"Pernil Plate",desc:"Cerdo asado lento, arroz, habichuelas y tostones",price:13.99,emoji:"🍖",cat:"platos",popular:true,img:"https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=80"},
  {id:3,name:"Chuletas Can-Can",desc:"Chuletas fritas con arroz mamposteao",price:15.99,emoji:"🥩",cat:"platos",img:"https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80"},
  {id:4,name:"Alcapurrias de Pollo",desc:"Alcapurrias caseras rellenas de pollo guisado (x3)",price:8.99,emoji:"🫔",cat:"snacks",popular:true,img:"https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80"},
  {id:5,name:"Tostones con Mojo",desc:"Tostones crujientes con ajo y limón",price:5.99,emoji:"🫓",cat:"snacks",img:"https://images.unsplash.com/photo-1587334274328-64186a80aeee?w=400&q=80"},
  {id:6,name:"Empanadillas (x4)",desc:"Mezcla de carne, queso y pollo",price:7.99,emoji:"🥟",cat:"snacks",img:"https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&q=80"},
  {id:7,name:"Coquito Shake",desc:"Batido cremoso de coco con canela",price:5.99,emoji:"🥥",cat:"bebidas",popular:true,img:"https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=400&q=80"},
  {id:8,name:"Limonada Tamarindo",desc:"Fresca limonada tropical con tamarindo",price:3.99,emoji:"🍹",cat:"bebidas",img:"https://images.unsplash.com/photo-1587015990127-424b954571b5?w=400&q=80"},
  {id:9,name:"Malta Caribeña",desc:"Malta fría bien fría",price:2.99,emoji:"🍺",cat:"bebidas",img:"https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&q=80"},
  {id:10,name:"Tembleque",desc:"Postre de coco con canela al estilo boricua",price:4.99,emoji:"🍮",cat:"postres",popular:true,img:"https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80"},
  {id:11,name:"Arroz con Leche",desc:"Clásico cremoso con canela",price:3.99,emoji:"🍚",cat:"postres",img:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80"},
];

let demoCart = {};
let demoNotes = {};
let deliveryMode = 'pickup';

function demoRender(cat) {
  const grid = document.getElementById('demoGrid');
  const items = cat === 'all' ? DEMO_MENU : DEMO_MENU.filter(i => i.cat === cat);
  grid.innerHTML = items.map(item => \`
    <div class="demo-card">
      <div class="demo-card-img">
        <img src="\${item.img}" alt="\${item.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
        <div class="demo-card-emoji-fallback" style="display:none">\${item.emoji}</div>
        \${item.popular ? '<span class="demo-popular">🔥 Popular</span>' : ''}
      </div>
      <div class="demo-card-body">
        <div class="demo-card-title">\${item.name}</div>
        <div class="demo-card-desc">\${item.desc}</div>
        <div class="demo-card-footer">
          <div class="demo-price">$\${item.price.toFixed(2)}</div>
          <button class="demo-add-btn" onclick="demoAdd(\${item.id})">+</button>
        </div>
      </div>
    </div>
  \`).join('');
}

function demoFilter(cat, el) {
  document.querySelectorAll('.demo-cat-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  demoRender(cat);
}

function demoAdd(id) {
  demoCart[id] = (demoCart[id] || 0) + 1;
  demoUpdateBar();
  demoToastShow('✅ Añadido a tu orden');
}

function demoRemove(id) {
  if (demoCart[id] > 1) demoCart[id]--;
  else { delete demoCart[id]; delete demoNotes[id]; }
  demoUpdateBar();
  demoRenderModal();
}

function demoUpdateBar() {
  const ids = Object.keys(demoCart);
  const count = ids.reduce((s,id) => s + demoCart[id], 0);
  const total = ids.reduce((s,id) => s + DEMO_MENU.find(i=>i.id==id).price * demoCart[id], 0);
  document.getElementById('demoCartCount').textContent = count;
  document.getElementById('demoCartTotal').textContent = '$' + total.toFixed(2);
  const names = ids.slice(0,2).map(id => DEMO_MENU.find(i=>i.id==id).name.split(' ')[0]).join(', ');
  document.getElementById('demoCartSub').textContent = count > 0 ? names : 'Sin items';
  if (count > 0) document.getElementById('demoCartBar').classList.add('visible');
  else document.getElementById('demoCartBar').classList.remove('visible');
}

function demoRenderModal() {
  const container = document.getElementById('demoCartItems');
  const ids = Object.keys(demoCart);
  if (!ids.length) { container.innerHTML = '<p style="color:#8A7A5A;text-align:center;padding:1rem">Tu orden está vacía</p>'; demoUpdateTotals(); return; }
  container.innerHTML = ids.map(id => {
    const item = DEMO_MENU.find(i => i.id == id);
    return \`
      <div class="demo-cart-item">
        <div class="demo-cart-item-top">
          <div class="demo-item-emoji">\${item.emoji}</div>
          <div class="demo-item-info">
            <div class="demo-item-name">\${item.name}</div>
            <div class="demo-item-price-sm">$\${item.price.toFixed(2)} c/u</div>
          </div>
          <div class="demo-qty-ctrl">
            <button class="demo-qty-btn" onclick="demoRemove(\${id})">−</button>
            <span class="demo-qty-num">\${demoCart[id]}</span>
            <button class="demo-qty-btn" onclick="demoAdd(\${id})">+</button>
          </div>
        </div>
        <div class="demo-item-notes">
          <button class="demo-item-notes-btn" onclick="toggleNotes(\${id})">
            \${demoNotes[id] ? '📝 ' + demoNotes[id] : '+ Instrucciones especiales'}
          </button>
          <textarea
            class="demo-item-notes-input \${demoNotes[id] ? 'visible' : ''}"
            id="notes-\${id}"
            placeholder="Ej: sin cebolla, extra mayo, bien caliente..."
            rows="2"
            onchange="saveNote(\${id})"
          >\${demoNotes[id] || ''}</textarea>
        </div>
      </div>
    \`;
  }).join('');
  demoUpdateTotals();
}

function toggleNotes(id) {
  const input = document.getElementById('notes-' + id);
  if (input) {
    input.classList.toggle('visible');
    if (input.classList.contains('visible')) input.focus();
  }
}

function saveNote(id) {
  const input = document.getElementById('notes-' + id);
  if (input) {
    demoNotes[id] = input.value.trim();
    if (!demoNotes[id]) delete demoNotes[id];
  }
}

function selectDelivery(mode) {
  deliveryMode = mode;
  document.getElementById('opt-pickup').classList.toggle('selected', mode === 'pickup');
  document.getElementById('opt-delivery').classList.toggle('selected', mode === 'delivery');
  document.getElementById('delivery-address-field').style.display = mode === 'delivery' ? 'block' : 'none';
  document.getElementById('delivery-fee-row').style.display = mode === 'delivery' ? 'flex' : 'none';
  demoUpdateTotals();
}

function demoUpdateTotals() {
  const sub = Object.keys(demoCart).reduce((s,id) => s + DEMO_MENU.find(i=>i.id==id).price * demoCart[id], 0);
  const deliveryFee = deliveryMode === 'delivery' ? 3 : 0;
  const tax = (sub + deliveryFee) * 0.07;
  document.getElementById('demoSub').textContent = '$' + sub.toFixed(2);
  document.getElementById('demoTax').textContent = '$' + tax.toFixed(2);
  document.getElementById('demoTotal').textContent = '$' + (sub + deliveryFee + tax).toFixed(2);
}

function demoOpenModal() {
  if (!Object.keys(demoCart).length) return;
  demoRenderModal();
  document.getElementById('demoOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function demoCloseModal() {
  document.getElementById('demoOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function demoStripe() {
  const name = document.getElementById('demoName').value.trim();
  if (!name) { demoToastShow('⚠️ Por favor escribe tu nombre'); return; }
  demoToastShow('💳 Demo: Aquí abriría Stripe Checkout');
  setTimeout(() => alert('✅ DEMO: En producción el cliente pagaría con tarjeta via Stripe.\\n\\nTotal: ' + document.getElementById('demoTotal').textContent), 800);
}

function demoWhatsApp() {
  const name = document.getElementById('demoName').value.trim() || 'Cliente';
  const ids = Object.keys(demoCart);
  if (!ids.length) return;

  let msg = '🚚 *PEDIDO — El Rincón Boricua*\\n\\n';
  msg += '👤 Cliente: ' + name + '\\n';
  if (document.getElementById('demoPhone').value) msg += '📞 Tel: ' + document.getElementById('demoPhone').value + '\\n';
  msg += '🛵 Tipo: ' + (deliveryMode === 'delivery' ? 'Delivery' : 'Recoger en el truck') + '\\n';
  if (deliveryMode === 'delivery' && document.getElementById('deliveryAddress').value) {
    msg += '📍 Dirección: ' + document.getElementById('deliveryAddress').value + '\\n';
  }
  msg += '\\n*Items:*\\n';
  ids.forEach(id => {
    const item = DEMO_MENU.find(i => i.id == id);
    msg += '• ' + item.emoji + ' ' + item.name + ' x' + demoCart[id] + ' — $' + (item.price * demoCart[id]).toFixed(2);
    if (demoNotes[id]) msg += '\\n  📝 ' + demoNotes[id];
    msg += '\\n';
  });
  const sub = ids.reduce((s,id) => s + DEMO_MENU.find(i=>i.id==id).price * demoCart[id], 0);
  const deliveryFee = deliveryMode === 'delivery' ? 3 : 0;
  msg += '\\n💰 *TOTAL: $' + (( sub + deliveryFee) * 1.07).toFixed(2) + '*\\n\\n¡Gracias! 🇵🇷';

  window.open('https://wa.me/18635216708?text=' + encodeURIComponent(msg), '_blank');
  demoCloseModal();
  demoToastShow('📲 Pedido enviado por WhatsApp!');
}

function demoToastShow(msg) {
  const t = document.getElementById('demoToast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

document.getElementById('demoOverlay').addEventListener('click', e => {
  if (e.target === document.getElementById('demoOverlay')) demoCloseModal();
});

// IVA CHAT
function demoToggleFloat() { document.getElementById('demoFloatPanel').classList.toggle('open'); }

function demoAddMsg(cId, text, type) {
  const c = document.getElementById(cId);
  const now = new Date().toLocaleTimeString('es',{hour:'2-digit',minute:'2-digit'});
  const d = document.createElement('div');
  d.className = 'demo-msg ' + type;
  d.innerHTML = '<div class="demo-msg-bubble">' + text + '</div><div class="demo-msg-time">' + now + '</div>';
  c.appendChild(d); c.scrollTop = c.scrollHeight;
}

function demoShowTyping(cId) {
  const c = document.getElementById(cId);
  const d = document.createElement('div');
  d.className = 'demo-msg bot'; d.id = 'demoTyping_' + cId;
  d.innerHTML = '<div class="demo-typing"><span></span><span></span><span></span></div>';
  c.appendChild(d); c.scrollTop = c.scrollHeight;
}

function demoHideTyping(cId) { const el = document.getElementById('demoTyping_' + cId); if(el) el.remove(); }

async function demoSendChat(mode) {
  const inputId = mode === 'float' ? 'demoFloatInput' : 'demoChatInput';
  const msgsId = mode === 'float' ? 'demoFloatMsgs' : 'demoChatMsgs';
  const input = document.getElementById(inputId);
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  const sugg = document.getElementById('demoChatSugg');
  if (sugg) sugg.style.display = 'none';
  demoAddMsg(msgsId, text, 'user');
  demoShowTyping(msgsId);
  try {
    const res = await fetch('/api/assistant', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({message: text, sessionId: 'demo-rincon-boricua'})
    });
    const data = await res.json();
    demoHideTyping(msgsId);
    demoAddMsg(msgsId, data.reply || '¿En qué más te ayudo?', 'bot');
  } catch(e) {
    demoHideTyping(msgsId);
    demoAddMsg(msgsId, 'Disculpa, tuve un problema. Intenta de nuevo.', 'bot');
  }
}

function demoSendSugg(el) { document.getElementById('demoChatInput').value = el.textContent; demoSendChat('main'); }

demoRender('all');
</script>
`;
