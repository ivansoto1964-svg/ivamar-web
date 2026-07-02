const fs = require('fs');
let code = fs.readFileSync('src/server.js', 'utf8');

const oldFeeds = `    // RSS feeds como backup
    const feeds = [
      { url: 'https://periodismoinvestigativo.com/feed/', source: 'Periodismo Investigativo', categoria: 'Investigación' },
      { url: 'https://feeds.bbci.co.uk/mundo/rss.xml', source: 'BBC Mundo', categoria: 'Internacional' }
    ];`;

const newFeeds = `    // RSS feeds — fuentes específicas de PR y diáspora boricua
    const feeds = [
      { url: 'https://periodismoinvestigativo.com/feed/', source: 'Periodismo Investigativo', categoria: 'Investigación' },
      { url: 'https://www.noticel.com/feed/', source: 'NotiCel', categoria: 'Puerto Rico' },
      { url: 'https://www.elnuevodia.com/rss/latest.rss', source: 'El Nuevo Día', categoria: 'Puerto Rico' },
      { url: 'https://www.diariolasamericas.com/rss/', source: 'Diario Las Américas', categoria: 'Diáspora' }
    ];`;

if (code.includes(oldFeeds)) {
  code = code.replace(oldFeeds, newFeeds);
  fs.writeFileSync('src/server.js', code);
  console.log('✅ Fuentes de noticias actualizadas — eliminada BBC Mundo, agregadas NotiCel, El Nuevo Día y Diario Las Américas');
} else {
  console.log('❌ No encontré el bloque exacto de feeds');
}
