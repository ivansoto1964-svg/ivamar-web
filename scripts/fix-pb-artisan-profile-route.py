from pathlib import Path

p = Path('src/server.js')
s = p.read_text()
old = "app.get('/artesanos/:slug', (req, res) => {\n  const item = loadApprovedPBListings().find(entry => pbArtisanSlug(entry) === req.params.slug);"
new = "app.get('/artesanos/:slug', (req, res, next) => {\n  // Reserve /artesanos/mi-perfil for the artisan self-service login route defined below.\n  if (req.params.slug === 'mi-perfil') return next();\n  const item = loadApprovedPBListings().find(entry => pbArtisanSlug(entry) === req.params.slug);"
if old not in s:
    raise SystemExit('artisan public route anchor not found')
s = s.replace(old, new, 1)
p.write_text(s)
