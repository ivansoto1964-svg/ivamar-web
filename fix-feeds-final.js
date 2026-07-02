const fs = require('fs');
let code = fs.readFileSync('src/server.js', 'utf8');

const oldFeeds = `    const feeds = [
      { url: 'https://periodismoinvestigativo.com/feed/', source: 'Periodismo Investigativo', categoria: 'Investigación' },
      { url: 'https://www.noticel.com/feed/', source: 'NotiCel', categoria: 'Puerto Rico' },
      { url: 'https://www.elnuevodia.com/rss/latest.rss', source: 'El Nuevo Día', categoria: 'Puerto Rico' },
      { url: 'https://www.diariolasamericas.com/rss/', source: 'Diario Las Américas', categoria: 'Diáspora' },
      { url: 'https://www.wfla.com/tampa-hoy/feed/', source: 'Tampa Hoy', categoria: 'Florida' },
      { url: 'https://www.telemundo51.com/feed/', source: 'Telemundo Miami', categoria: 'Florida' },
      { url: 'https://www.telemundo47.com/feed/', source: 'Telemundo Nueva York', categoria: 'Nueva York' },
      { url: 'https://www.telemundochicago.com/feed/', source: 'Telemundo Chicago', categoria: 'Illinois' },
      { url: 'https://www.telemundo52.com/feed/', source: 'Telemundo Los Angeles', categoria: 'California' }
    ];`;

const newFeeds = `    const feeds = [
      { url: 'https://periodismoinvestigativo.com/feed/', source: 'Periodismo Investigativo', categoria: 'Investigación' },
      { url: 'https://www.noticel.com/feed/', source: 'NotiCel', categoria: 'Puerto Rico' },
      { url: 'https://www.elnuevodia.com/rss/latest.rss', source: 'El Nuevo Día', categoria: 'Puerto Rico' },
      { url: 'https://www.diariolasamericas.com/rss/', source: 'Diario Las Américas', categoria: 'Diáspora' },
      { url: 'https://eldiariony.com/feed/', source: 'El Diario NY', categoria: 'Nueva York' }
    ];`;

if (code.includes(oldFeeds)) {
  code = code.replace(oldFeeds, newFeeds);
  fs.writeFileSync('src/server.js', code);
  console.log('✅ Feeds actualizados — bloqueados eliminados, El Diario NY agregado');
} else {
  console.log('❌ No encontré el bloque exacto');
}
