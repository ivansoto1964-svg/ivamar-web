const { DAYS } = require('../../services/pb-radio');
const { withPBSiteFooter } = require('./site-footer');

const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]));

function page(title, body, admin = false) {
  return `<!doctype html><html lang="es-PR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)} · Planeta Boricua</title>
${admin ? '<meta name="robots" content="noindex,nofollow">' : '<link rel="canonical" href="https://www.masboricuaqueunmofongo.com/radio">'}
<style>
*{box-sizing:border-box}[hidden]{display:none!important}body{margin:0;background:#f5f5f0;color:#17283b;font:1rem/1.55 system-ui,sans-serif}a{color:#07477e}a:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid #ce1126;outline-offset:3px}.top{background:#fff;border-bottom:3px solid #ce1126}.top nav{max-width:940px;margin:auto;padding:.85rem 1rem;display:flex;justify-content:space-between;gap:1rem}.top a{font-weight:700}.wrap{max-width:940px;margin:auto;padding:1.5rem 1rem 3rem}h1{font:700 clamp(2.2rem,7vw,4rem)/1.1 Georgia,serif;margin:.25rem 0 1rem}h2,h3{line-height:1.2}.hero{background:#002d62;color:#fff;border-radius:1.25rem;padding:clamp(1.25rem,5vw,3rem);margin-bottom:2rem}.hero h2{margin:0}.hero a{color:#fff}.signal{display:grid;gap:.65rem;align-items:center}.signal p{margin:0}.status{font-weight:750;color:#dbeaff}button,.button{display:inline-block;width:fit-content;border:0;border-radius:.65rem;background:#07477e;color:#fff;padding:.65rem 1rem;font:700 1rem system-ui,sans-serif;text-decoration:none;cursor:pointer}.hero button{background:#fff;color:#002d62}.panel,.program{background:#fff;border:1px solid #d7e0e8;border-radius:.8rem;padding:1rem;margin:.75rem 0}.program h3,.program p{margin:0}.program p{color:#4a5868}.programs{padding:0;list-style:none}.split{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,17rem),1fr));gap:1rem}.fields{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,13rem),1fr));gap:.8rem;margin:.7rem 0}.fields label,.wide{display:grid;gap:.25rem;font-weight:650}.wide{margin:.75rem 0}input:not([type=checkbox]),select{width:100%;padding:.55rem;border:1px solid #8595a7;border-radius:.45rem;background:white;font:inherit;color:inherit}.check{display:block;margin:1rem 0}.error{border-left:4px solid #ce1126;padding:.5rem 1rem;background:#fff}.hint{font-size:.95rem}.actions{display:flex;align-items:center;flex-wrap:wrap;gap:1rem}
</style></head><body>
<header class="top"><nav aria-label="Planeta Boricua"><a href="/">🇵🇷 Planeta Boricua</a>${admin ? '<a href="/pb-control">Centro de Control</a>' : '<a href="/lo-mas-reciente">Lo más reciente</a>'}</nav></header>
<main class="wrap">${body}</main></body></html>`;
}

function publicRadio() {
  return withPBSiteFooter(page('Radio Planeta Boricua', `
<section class="hero" aria-labelledby="radio-title">
  <h1 id="radio-title">Radio Planeta Boricua</h1>
  <div class="signal">
    <p class="status" id="radio-status" role="status">Cargando programación…</p>
    <h2 id="radio-title-current">En sintonía con Puerto Rico</h2>
    <p id="radio-station"></p>
    <button id="radio-play" type="button" hidden>Escuchar</button>
    <audio id="radio-audio" preload="none" hidden></audio>
    <a id="radio-link" target="_blank" rel="noopener noreferrer" hidden>Escuchar en la emisora</a>
  </div>
</section>
<section aria-labelledby="radio-schedule-title">
  <h2 id="radio-schedule-title">Programación semanal</h2>
  <p>Todos los horarios son de Puerto Rico.</p>
  <p id="radio-next" hidden></p>
  <ul class="programs" id="radio-programs"></ul>
</section>
<noscript><p>Activa JavaScript para consultar la programación y usar el reproductor.</p></noscript>
<script src="/js/pb-radio.js?v=1" defer></script>`));
}

function radioControl(config, csrf, { slot, saved, error } = {}) {
  const form = slot || {};
  const security = `<input type="hidden" name="csrf" value="${esc(csrf)}"><input type="hidden" name="revision" value="${esc(config.revision)}">`;
  const options = DAYS.map((day, index) => `<option value="${index}"${String(form.day) === String(index) ? ' selected' : ''}>${day}</option>`).join('');
  const programs = config.slots.map(item => `<li class="program"><h3>${esc(item.title || item.station)}</h3>
    <p>${esc(item.station)} · ${item.enabled ? 'Activo' : 'Borrador'}</p>
    <p>${esc(DAYS[item.day] || 'Día por confirmar')}${item.start ? ` · ${esc(item.start)}` : ''}${item.end ? ` a ${esc(item.end)}` : ''}</p>
    <a href="/pb-control/radio?editar=${encodeURIComponent(item.id)}#editor">Editar programa</a></li>`).join('');
  return page('Programación de Radio PB', `
    <h1>Programación de Radio PB</h1><p>Hora de Puerto Rico · <a href="/radio">Ver la página de radio</a></p>
    ${saved ? '<p role="status">Cambios guardados.</p>' : ''}
    ${error ? `<p class="error" role="alert">${esc(error)}</p>` : ''}
    <div class="split">
      <section aria-labelledby="list-title"><h2 id="list-title">Parrilla semanal</h2><ul class="programs">${programs}</ul></section>
      <section class="panel" id="editor" aria-labelledby="edit-title">
        <h2 id="edit-title">${form.id ? 'Editar programa' : 'Añadir programa'}</h2>
        <form method="post" action="/pb-control/radio">
          ${security}<input type="hidden" name="action" value="save"><input type="hidden" name="id" value="${esc(form.id)}">
          <div class="fields">
            <label>Programa<input name="title" maxlength="120" value="${esc(form.title)}"></label>
            <label>Emisora<input name="station" required maxlength="100" value="${esc(form.station)}"></label>
            <label>Día<select name="day"><option value="">Por confirmar</option>${options}</select></label>
            <label>Inicio<input type="time" name="start" value="${esc(form.start)}"></label>
            <label>Cierre<input type="time" name="end" value="${esc(form.end)}"></label>
          </div>
          <label class="wide">Señal de audio directa (HTTPS)<input type="url" name="stream" maxlength="1500" value="${esc(form.stream)}"></label>
          <label class="wide">Página oficial para escuchar (HTTPS)<input type="url" name="link" maxlength="1500" value="${esc(form.link)}"></label>
          <p class="hint">Una señal directa compatible permite escuchar en PB. Con solo la página oficial se muestra un enlace a la emisora.</p>
          <label class="check"><input name="enabled" type="checkbox" value="yes"${form.enabled ? ' checked' : ''}> Activar este espacio en la parrilla pública</label>
          <div class="actions"><button>Guardar programa</button>${form.id ? '<a href="/pb-control/radio#editor">Añadir otro programa</a>' : ''}</div>
        </form>
      </section>
    </div>
    <section class="panel" aria-labelledby="fallback-title">
      <h2 id="fallback-title">Audio de respaldo</h2>
      <p>Opcional. Usa una cápsula de PB para los espacios sin señal.</p>
      <form method="post" action="/pb-control/radio">
        ${security}<input type="hidden" name="action" value="fallback">
        <label class="wide">Enlace directo al audio (HTTPS)<input type="url" name="fallback" maxlength="1500" value="${esc(config.fallback)}"></label>
        <button>Guardar respaldo</button>
      </form>
    </section>`, true);
}

module.exports = { publicRadio, radioControl };
