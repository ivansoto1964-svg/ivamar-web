const validSlug = slug => /^[a-z0-9][a-z0-9-]{0,159}$/.test(String(slug || ''));

function buildArtisanManifest(item, slug) {
  if (!validSlug(slug)) throw new Error('Invalid artisan slug');
  const artisanName = String(item?.name || 'Artesano boricua').trim();
  const profilePath = `/artesanos/${slug}`;
  const shortName = artisanName.length > 28 ? `${artisanName.slice(0, 27).trim()}…` : artisanName;

  return {
    id: profilePath,
    name: `${artisanName} · Planeta Boricua`,
    short_name: shortName,
    description: `Acceso directo al perfil artesanal de ${artisanName} en Planeta Boricua.`,
    lang: 'es',
    start_url: `${profilePath}?source=homescreen`,
    scope: '/',
    display: 'standalone',
    background_color: '#f5f5f0',
    theme_color: '#002d62',
    categories: ['business', 'lifestyle'],
    icons: [
      {src:'/icons/pb/icon-192.png',sizes:'192x192',type:'image/png',purpose:'any maskable'},
      {src:'/icons/pb/icon-512.png',sizes:'512x512',type:'image/png',purpose:'any maskable'}
    ],
    shortcuts: [
      {name:'Compartir perfil',short_name:'Compartir',url:`${profilePath}#compartir`},
      {name:'Administrar mi perfil',short_name:'Administrar',url:'/artesanos/mi-perfil'}
    ]
  };
}

module.exports = { buildArtisanManifest, validSlug };
