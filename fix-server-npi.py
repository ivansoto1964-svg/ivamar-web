with open('src/server.js', 'r', encoding='utf-8') as f:
    code = f.read()

marker_start = 'Sitemap: https://yourcaribbeanexpert.com/sitemap.xml`");\n});'
marker_end = '\napp.get("/api/place-photo"'

start = code.find(marker_start)
end = code.find(marker_end)

if start > 0 and end > 0:
    between = code[start + len(marker_start):end]
    print('Found orphan code:')
    print(repr(between))
    code = code[:start + len(marker_start)] + '\n\n' + code[end:]
    with open('src/server.js', 'w', encoding='utf-8') as f:
        f.write(code)
    print('Fixed')
else:
    print(f'start: {start}, end: {end}')
