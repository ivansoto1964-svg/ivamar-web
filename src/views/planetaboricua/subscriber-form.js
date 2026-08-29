const messages = {
  blog: {
    title: '🇵🇷 ¿Te gustó esta historia? Sigue conectado con Planeta Boricua.',
    copy: 'Recibe nuevas historias, cultura y cosas de nuestra tierra directamente en tu correo.'
  },
  lo_mas_reciente: {
    title: '⚡ Mantente al día con el Planeta.',
    copy: 'Noticias, asuntos que nos afectan y lo que está pasando en Puerto Rico y la diáspora.'
  },
  agenda: {
    title: '📅 Que no se te pase lo boricua.',
    copy: 'Recibe festivales, desfiles, ferias y actividades boricuas directamente en tu correo.'
  }
};

function renderSubscriberForm(source) {
  const message = messages[source];
  if (!message) return '';
  return `<style>${subscriberStyles}</style><section class="pb-subscribe" aria-labelledby="pb-subscribe-${source}-title">
    <div class="pb-subscribe-copy">
      <h2 id="pb-subscribe-${source}-title">${message.title}</h2>
      <p>${message.copy}</p>
    </div>
    <form class="pb-subscribe-form" data-pb-subscribe data-source="${source}">
      <label class="pb-subscribe-label" for="pb-subscribe-${source}-email">Correo electrónico</label>
      <div class="pb-subscribe-fields">
        <input id="pb-subscribe-${source}-email" name="email" type="email" inputmode="email" autocomplete="email" placeholder="tu@email.com" required>
        <button type="submit">Suscribirme</button>
      </div>
      <p class="pb-subscribe-status" role="status" aria-live="polite"></p>
    </form>
  </section><script src="/js/pb-subscribe.js?v=1"></script>`;
}

const subscriberStyles = `.pb-subscribe{margin:2rem 0;padding:1.35rem;background:linear-gradient(135deg,#eef4fb,#fff);border:1px solid #c9d7e8;border-left:5px solid #ce1126;border-radius:10px}.pb-subscribe h2{font-family:Georgia,serif;color:#002d62;font-size:1.25rem;line-height:1.3;margin:0 0 .4rem}.pb-subscribe .pb-subscribe-copy>p{color:#5f6772;font-family:Inter,system-ui,sans-serif;font-size:.92rem;line-height:1.55;margin:0 0 1rem}.pb-subscribe-label{display:block;color:#002d62;font-size:.75rem;font-weight:800;margin-bottom:.35rem}.pb-subscribe-fields{display:flex;gap:.55rem}.pb-subscribe-fields input{min-width:0;flex:1;border:1px solid #b9c4d0;border-radius:7px;background:#fff;padding:.78rem;font:inherit}.pb-subscribe-fields button{border:0;border-radius:7px;background:#ce1126;color:#fff;padding:.78rem 1rem;font:800 .82rem Inter,system-ui,sans-serif;cursor:pointer;white-space:nowrap}.pb-subscribe-fields button:disabled{opacity:.65;cursor:wait}.pb-subscribe .pb-subscribe-status{min-height:1.2em;margin:.65rem 0 0;font-family:Inter,system-ui,sans-serif;font-size:.78rem;font-weight:800;line-height:1.4;color:#666}.pb-subscribe-status[data-state="success"]{color:#166534}.pb-subscribe-status[data-state="error"]{color:#b91c1c}@media(max-width:560px){.pb-subscribe{padding:1.1rem}.pb-subscribe-fields{align-items:stretch;flex-direction:column}.pb-subscribe-fields button{width:100%}}`;

module.exports = { renderSubscriberForm, subscriberStyles };
