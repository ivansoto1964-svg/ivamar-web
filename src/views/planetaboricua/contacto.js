const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({
  '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
}[char]));

const topics = [
  ['eventos', 'Prensa y eventos'],
  ['publicidad', 'Publicidad y colaboraciones'],
  ['correcciones', 'Correcciones y sugerencias'],
  ['general', 'Consulta general']
];

function renderContact({values = {}, error = '', sent = false, email}) {
  const options = topics.map(([key,label]) => `<option value="${key}"${values.topic === key ? ' selected' : ''}>${label}</option>`).join('');
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Contacto — Planeta Boricua</title><meta name="description" content="Envía un mensaje al equipo de Planeta Boricua sobre eventos, colaboraciones, correcciones o consultas del portal."><link rel="canonical" href="https://www.masboricuaqueunmofongo.com/contacto"><style>
  *{box-sizing:border-box}body{margin:0;background:#faf8f3;color:#17202a;font:1rem/1.55 system-ui,sans-serif}.pb-contact{max-width:930px;margin:auto;padding:clamp(1.2rem,4vw,3rem) 1rem}.pb-contact h1,.pb-contact h2{font-family:Georgia,serif;color:#10213a}.pb-contact h1{font-size:clamp(2rem,6vw,3.35rem);line-height:1.12;margin:0}.pb-contact h2{font-size:1.2rem;margin-top:0}.pb-contact-grid{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,1fr);gap:1rem;align-items:start}.pb-contact-card{background:#fff;border:1px solid #ddd9d0;border-radius:10px;padding:clamp(1rem,3vw,1.5rem)}.pb-contact label{display:block;font-weight:700;margin:1rem 0 .25rem}.pb-contact :is(input,select,textarea){font:inherit;color:inherit;width:100%;min-height:44px;padding:.6rem;border:1px solid #8794a3;border-radius:6px;background:#fff}.pb-contact textarea{min-height:140px;resize:vertical}.pb-contact a{color:#002d62;overflow-wrap:anywhere}.pb-contact button{font:inherit;font-weight:750;padding:.65rem 1rem;min-height:44px;color:#fff;background:#a71028;border:0;border-radius:6px;cursor:pointer}.pb-contact small{display:block;margin:1rem 0}.pb-contact .pb-contact-hp{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}.pb-contact-status{border-radius:5px;padding:.75rem;background:#fce8ec;color:#790e23}.pb-contact-status.sent{background:#e8f4ec;color:#16502c}@media(max-width:650px){.pb-contact-grid{grid-template-columns:1fr}}
  </style></head><body><main class="pb-contact"><h1>Contacto</h1><p>Escríbenos sobre una actividad, una colaboración o cualquier consulta sobre Planeta Boricua.</p><div class="pb-contact-grid">
  <section class="pb-contact-card" aria-labelledby="contact-form-title"><h2 id="contact-form-title">Envíanos un mensaje</h2>
  ${sent ? '<p class="pb-contact-status sent" role="status">Recibimos tu mensaje. Si hace falta responderte, usaremos el correo que nos diste.</p><a href="/contacto">Enviar otro mensaje</a>' : `
  ${error ? `<p class="pb-contact-status" role="alert">${esc(error)}</p>` : ''}
  <form method="post" action="/contacto" accept-charset="UTF-8">
  <label for="pb-contact-name">Tu nombre</label><input id="pb-contact-name" name="name" autocomplete="name" required maxlength="100" value="${esc(values.name)}">
  <label for="pb-contact-email">Tu correo electrónico</label><input id="pb-contact-email" name="email" type="email" autocomplete="email" required maxlength="254" value="${esc(values.email)}">
  <label for="pb-contact-topic">Tema</label><select id="pb-contact-topic" name="topic" required><option value="">Escoge un tema</option>${options}</select>
  <label for="pb-contact-message">Mensaje</label><textarea id="pb-contact-message" name="message" required maxlength="4000">${esc(values.message)}</textarea>
  <div class="pb-contact-hp" aria-hidden="true"><label for="pb-contact-website">Deja este campo en blanco</label><input id="pb-contact-website" name="website" autocomplete="off" tabindex="-1"></div>
  <small>Usaremos tu correo para atender este mensaje. <a href="/privacidad-boricua">Política de privacidad</a></small><button type="submit">Enviar mensaje</button>
  </form>`}</section><aside class="pb-contact-card"><h2>Correo directo</h2><a href="mailto:${esc(email)}">${esc(email)}</a><h2>¿Quieres compartir un evento?</h2><a href="/compartir-evento-boricua">Enviar los detalles de un evento →</a></aside></div></main></body></html>`;
}

module.exports = {renderContact,topics};
