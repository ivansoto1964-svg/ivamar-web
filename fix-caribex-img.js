const fs = require('fs');
let code = fs.readFileSync('src/views/caribex.js', 'utf8');

const oldFunc = `      function getImg(entry) {
        if (entry.media$thumbnail) {
          var u = entry.media$thumbnail.url;
          var i = u.lastIndexOf("/s");
          return i > -1 ? u.substring(0, i) + "/s1600/" : u;
        }
        return "https://yourcaribbeanexpert.com/img/caribex-default.jpg";
      }`;

const newFunc = `      function getImg(entry) {
        if (entry.media$thumbnail) {
          var u = entry.media$thumbnail.url;
          var i = u.lastIndexOf("/s");
          return i > -1 ? u.substring(0, i) + "/s1600/" : u;
        }
        // Fallback: extract first image from content or summary HTML
        var html = entry.content ? entry.content.$t : (entry.summary ? entry.summary.$t : '');
        var match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
        if (match) {
          var imgUrl = match[1];
          var idx = imgUrl.lastIndexOf("/s");
          return idx > -1 ? imgUrl.substring(0, idx) + "/s1600/" : imgUrl;
        }
        return "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80";
      }`;

if (code.includes(oldFunc)) {
  code = code.replace(oldFunc, newFunc);
  fs.writeFileSync('src/views/caribex.js', code);
  console.log('✅ Listo');
} else {
  console.log('❌ No encontrado exacto');
}
