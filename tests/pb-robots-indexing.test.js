const assert = require('assert');
const fs = require('fs');
const path = require('path');

const server = fs.readFileSync(path.join(__dirname, '..', 'src', 'server.js'), 'utf8');

const pbRobots = server.match(/if \(req\.path === '\/robots\.txt'\) \{[\s\S]*?return res\.send\(([^;]+)\);/);
assert.ok(pbRobots, 'PB must serve an explicit robots.txt');
assert.doesNotMatch(pbRobots[0], /Disallow: \/api\//, 'PB robots.txt must not prevent crawlers from seeing API noindex headers');
assert.match(pbRobots[0], /Sitemap: https:\/\/www\.masboricuaqueunmofongo\.com\/sitemap\.xml/, 'PB robots.txt must advertise the canonical sitemap');

assert.match(server, /startsWith\('\/api\/'\)[\s\S]*?X-Robots-Tag', 'noindex, nofollow'/, 'Every API response must send an X-Robots-Tag noindex header');

console.log('PB robots indexing contract: OK');
