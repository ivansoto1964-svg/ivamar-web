from pathlib import Path

p = Path('src/server.js')
s = p.read_text()

email_start = "    if (action === 'artisan-email-test' || action === 'artisan-email-send') {"
artisan_start = "    if (action.startsWith('artisan-')) {"
event_start = "    if (action.startsWith('event-')) {"

email_pos = s.find(email_start)
artisan_pos = s.find(artisan_start)
event_pos = s.find(event_start, email_pos if email_pos >= 0 else 0)

if email_pos < 0 or artisan_pos < 0 or event_pos < 0:
    raise SystemExit('Required PB action blocks not found')

if email_pos < artisan_pos:
    print('PB artisan email actions already ordered correctly.')
else:
    email_block = s[email_pos:event_pos]
    s = s[:email_pos] + s[event_pos:]
    artisan_pos = s.find(artisan_start)
    s = s[:artisan_pos] + email_block + s[artisan_pos:]
    p.write_text(s)
    print('Moved artisan email actions before generic artisan routing.')
