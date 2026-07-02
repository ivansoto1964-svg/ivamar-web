with open('src/server.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Update the URL construction to support postal_code and radius
old = "    let apiUrl = `https://npiregistry.cms.hhs.gov/api/?version=2.1&state=${estado || 'FL'}&limit=9&pretty=on`;"
new = "    let apiUrl = `https://npiregistry.cms.hhs.gov/api/?version=2.1&limit=25&pretty=on`;\n    if (postal_code) {\n      apiUrl += `&postal_code=${encodeURIComponent(postal_code)}`;\n      if (radio) apiUrl += `&radius=${encodeURIComponent(radio)}`;\n    } else {\n      apiUrl += `&state=${estado || 'FL'}`;\n    }"

if old in code:
    code = code.replace(old, new)
    print('✅ URL updated')
else:
    print('❌ URL not found')

# Update query params to include postal_code and radio
old2 = "    const { nombre, apellido, especialidad, estado } = req.query;"
new2 = "    const { nombre, apellido, especialidad, estado, postal_code, radio } = req.query;"

if old2 in code:
    code = code.replace(old2, new2)
    print('✅ Query params updated')
else:
    print('❌ Query params not found')

with open('src/server.js', 'w', encoding='utf-8') as f:
    f.write(code)
