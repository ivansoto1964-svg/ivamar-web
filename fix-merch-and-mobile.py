import re

with open('src/views/planetaboricua.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Fix 1: Add Merch card to Tienda Boricua - replace the last card before the "Ver Toda" button
old_last_card = '      <a href="https://www.amazon.com/shop/planetaboricua/list/1Q6CYDE5BV80P?tag=ivansoto0f-20" target="_blank" style="text-decoration:none;background:var(--light);border:1px solid var(--border);border-radius:8px;padding:1.2rem;text-align:center;transition:all 0.2s;display:block;">\n        <div style="font-size:2rem;margin-bottom:10px;">🚗</div>\n        <div style="font-size:0.82rem;font-weight:700;color:var(--dark);">Para Tu Auto</div>\n        <div style="font-size:0.7rem;color:var(--mid);margin-top:0.2rem;">87 productos</div>\n      </a>'

new_last_card = '      <a href="https://www.amazon.com/shop/planetaboricua/list/1Q6CYDE5BV80P?tag=ivansoto0f-20" target="_blank" style="text-decoration:none;background:var(--light);border:1px solid var(--border);border-radius:8px;padding:1.2rem;text-align:center;transition:all 0.2s;display:block;">\n        <div style="font-size:2rem;margin-bottom:10px;">🚗</div>\n        <div style="font-size:0.82rem;font-weight:700;color:var(--dark);">Para Tu Auto</div>\n        <div style="font-size:0.7rem;color:var(--mid);margin-top:0.2rem;">87 productos</div>\n      </a>\n      <a href="https://amzn.to/4gbJZVv" target="_blank" style="text-decoration:none;background:linear-gradient(135deg,#002D62,#CE1126);border:1px solid #CE1126;border-radius:8px;padding:1.2rem;text-align:center;transition:all 0.2s;display:block;">\n        <div style="font-size:2rem;margin-bottom:10px;">👕</div>\n        <div style="font-size:0.82rem;font-weight:700;color:#fff;">Merch Oficial 🇵🇷</div>\n        <div style="font-size:0.7rem;color:rgba(255,255,255,0.7);margin-top:0.2rem;">Más Boricua que un Mofongo</div>\n      </a>'

if old_last_card in code:
    code = code.replace(old_last_card, new_last_card)
    print('✅ Merch card added to Tienda Boricua')
else:
    print('❌ Tienda card not found')

# Fix 2: Add responsive CSS for viajes grid - add media query to existing style
old_style = '</style>\n</head>'
new_style = '@media(max-width:640px){.viajes-dest-grid{grid-template-columns:repeat(2,1fr)!important;}}\n</style>\n</head>'

if old_style in code:
    code = code.replace(old_style, new_style, 1)
    print('✅ Mobile responsive CSS added for viajes grid')
else:
    print('❌ Style closing tag not found')

# Fix 3: Add class to viajes grid div
old_grid = '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-top:1.5rem;">'
new_grid = '<div class="viajes-dest-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-top:1.5rem;">'

if old_grid in code:
    code = code.replace(old_grid, new_grid, 1)
    print('✅ Class added to viajes grid')
else:
    print('❌ Viajes grid div not found')

with open('src/views/planetaboricua.js', 'w', encoding='utf-8') as f:
    f.write(code)

print('\n🎉 Done!')
