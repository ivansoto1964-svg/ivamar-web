const NETWORKS = Object.freeze([
  { name: 'Facebook', href: 'https://www.facebook.com/elplanetaboricua/', icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3c-3.3 0-5 2-5 5v2H6v4h3v7h4v-7h3.4l.6-4h-4V9c0-.7.3-1 1-1Z"/></svg>' },
  { name: 'Instagram', href: 'https://www.instagram.com/miplanetaboricua/', icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle class="pb-social-icon-fill" cx="17.5" cy="6.5" r="1"/></svg>' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@planetaboricua4', icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3c.4 2.3 1.7 3.7 4 4v4c-1.5 0-2.8-.4-4-1.1V16a6 6 0 1 1-6-6h1v4a3 3 0 1 0 1 2V3h4Z"/></svg>' },
  { name: 'YouTube', href: 'https://www.youtube.com/@planetaboricua', icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4"/><path class="pb-social-icon-fill" d="m10 9 6 3-6 3Z"/></svg>' },
  { name: 'Telegram', href: 'https://t.me/planetaboricua', icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 4-3 16-6-4-3 3-1-5-5-2 18-8Zm-11 9 .7 2.6.2-1.8L17 8l-7 5Z"/></svg>' }
]);

function renderPBSocialFollow() {
  const links = NETWORKS.map(network => `<a href="${network.href}" target="_blank" rel="noopener noreferrer" aria-label="Seguir a Planeta Boricua en ${network.name}"><span aria-hidden="true">${network.icon}</span>${network.name}</a>`).join('');
  return `<section class="pb-social-follow" data-pb-social-follow aria-labelledby="pb-social-follow-title"><style>
.pb-social-follow{background:#f7f4ed;border-top:1px solid #ded9ce;border-bottom:1px solid #ded9ce;padding:1.25rem 1rem;text-align:center;font-family:Inter,system-ui,sans-serif}.pb-social-follow strong{display:block;color:#002d62;font-size:.76rem;letter-spacing:.1em;text-transform:uppercase;margin-bottom:.75rem}.pb-social-follow div{display:flex;justify-content:center;gap:.55rem;flex-wrap:wrap}.pb-social-follow a{display:inline-flex;align-items:center;gap:.4rem;min-height:40px;padding:.55rem .75rem;border:1px solid #c9d1dc;border-radius:999px;background:#fff;color:#002d62;text-decoration:none;font-size:.76rem;font-weight:800}.pb-social-follow a:hover{border-color:#ce1126;color:#ce1126}.pb-social-follow a:focus-visible{border-color:#ce1126;color:#ce1126;outline:3px solid #ce1126;outline-offset:3px}.pb-social-follow a span{display:grid;place-items:center;width:1.25rem;height:1.25rem;border-radius:50%;background:#002d62;color:#fff}.pb-social-follow a svg{width:.82rem;height:.82rem;fill:currentColor;stroke:currentColor;stroke-width:1.8}.pb-social-follow a svg rect,.pb-social-follow a svg circle{fill:none}.pb-social-follow a svg .pb-social-icon-fill{fill:currentColor;stroke:none}@media(max-width:480px){.pb-social-follow a{flex:1 1 calc(50% - .55rem);justify-content:center;max-width:160px}}
</style><strong id="pb-social-follow-title">Síguenos en:</strong><div>${links}</div></section>`;
}

module.exports = { NETWORKS, renderPBSocialFollow };
