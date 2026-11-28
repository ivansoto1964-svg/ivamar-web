const sectionFor = pathname => {
  if (/^\/(?:artesanos|feria-artesanos|para-artesanos)(?:\/|$)/.test(pathname)) return 'artesanos';
  if (/^\/(?:turistiando|pueblos)(?:\/|$)/.test(pathname)) return 'viajes';
  if (/^\/agenda-boricua(?:\/|$)/.test(pathname)) return 'agenda';
  return pathname==='/' ? 'portada' : 'portal';
};
const prompts = {
  artesanos:['¿Cómo creo mi perfil gratis?','¿Cómo actualizo mi perfil y descargo el QR?'],
  viajes:['¿Qué puedo hacer en Arecibo?', '¿Dónde paro a comer de Camuy a Isabela?'],
  agenda:['¿Qué hay este fin de semana?', '¿Qué actividades hay hoy en Hatillo?'],
  portada:['¿Qué puedo hacer el fin de semana?', '¿Cómo creo mi perfil de artesano?'],
  portal:['¿Dónde leo historias de Puerto Rico?', '¿Cómo encuentro un artesano?']
};

function withNayeli(html,pathname) {
  if (/^\/(?:artesanos\/(?:mi-perfil|herramientas|comunicaciones)|admin|cuenta|suscripcion|pb-control|go|api|auth)(?:\/|$)/i.test(pathname)
    || /<meta[^>]+name=["']robots["'][^>]*noindex/i.test(html)) return html;
  const section = sectionFor(pathname);
  const examples = prompts[section].map(value=>`<button type="button" data-nayeli-example>${value}</button>`).join('');
  const widget = `<aside class="pb-nayeli" data-nayeli="${section}" aria-label="Nayeli de Planeta Boricua">
<button type="button" class="pb-nayeli-launch" aria-haspopup="dialog" aria-controls="pb-nayeli-chat"><img width="36" height="36" decoding="async" loading="lazy" src="/img/nayeli-soto-cruz.webp" alt=""><span>Pregúntale a Nayeli</span></button>
<dialog class="pb-nayeli-chat" id="pb-nayeli-chat" aria-labelledby="pb-nayeli-title">
<header><img width="48" height="48" decoding="async" src="/img/nayeli-soto-cruz.webp" alt=""><div><h2 id="pb-nayeli-title">Nayeli</h2><p>Asistente de Planeta Boricua · Beta</p></div><button type="button" class="pb-nayeli-close" aria-label="Cerrar el chat">×</button></header>
<div class="pb-nayeli-scroll" tabindex="0" aria-label="Conversación con Nayeli"><div class="pb-nayeli-welcome"><p>¡Wepa! Soy Nayeli Soto Cruz. Iván Soto me creó para Planeta Boricua. Nací digitalmente en Lake Wales, Florida, y mi corazón es de Hatillo, Puerto Rico. ¿En qué te ayudo?</p><div class="pb-nayeli-examples">${examples}</div></div><div class="pb-nayeli-messages" role="log" aria-live="polite"></div></div>
<form><label for="pb-nayeli-question">Tu pregunta</label><div><textarea id="pb-nayeli-question" rows="2" maxlength="1200" placeholder="Escribe tu pregunta…" required></textarea><button type="submit">Enviar</button></div><p>Evita compartir datos personales en el chat.</p><span class="pb-nayeli-status" role="status"></span></form>
</dialog></aside>`;
  return html.replace('</head>','<link rel="stylesheet" href="/css/pb-nayeli.css?v=1"></head>')
    .replace('</body>',widget+'<script src="/js/pb-nayeli.js?v=1" defer></script></body>');
}

module.exports = {withNayeli};
