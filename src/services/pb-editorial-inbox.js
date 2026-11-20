const fs = require('node:fs');
const path = require('node:path');

// Trusted, reviewed repository content only. No HTTP publishing endpoint.
function importEditorialInbox({inboxDir, publicDir, dataDir}) {
  if (!fs.existsSync(inboxDir)) return {imported:0};
  const entries = fs.readdirSync(inboxDir).filter(name => name.endsWith('.json')).sort();
  const target = path.join(dataDir, 'approved.json');
  const journal = path.join(dataDir, 'editorial-imports.json');
  const read = (file, fallback) => {
    try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
    catch (error) { if (error.code === 'ENOENT') return fallback; throw error; }
  };
  const approved = read(target, []);
  const seen = read(journal, []);
  if (!Array.isArray(approved) || !Array.isArray(seen)) throw new Error('Invalid editorial storage');
  const records = entries.map(name => {
    const item = JSON.parse(fs.readFileSync(path.join(inboxDir,name),'utf8'));
    for (const [key,min,max] of [['title',10,250],['summary',20,700],['body',200,60000]]) {
      if (typeof item[key] !== 'string' || item[key].length < min || item[key].length > max) throw new Error(`Invalid ${key}: ${name}`);
    }
    if (!/^pb-[a-z0-9-]{5,100}$/.test(item.editorialId) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug)) throw new Error(`Invalid identity: ${name}`);
    if (!Number.isSafeInteger(item.id) || item.id <= 0 || !Number.isFinite(Date.parse(item.publishedAt)) || Date.parse(item.publishedAt)>Date.now()+300000) throw new Error(`Invalid date/id: ${name}`);
    if (!/^\/images\/editorial\/[a-z0-9-]+\.(webp|jpg|png)$/.test(item.image) || !fs.statSync(path.join(publicDir,item.image)).isFile()) throw new Error(`Missing cover: ${name}`);
    if (!Array.isArray(item.sources) || !item.sources.length || item.sources.some(source => !source.label || !/^https:\/\//.test(source.url) || new URL(source.url).username || new URL(source.url).password)) throw new Error(`Invalid sources: ${name}`);
    return {...item,status:'approved'};
  });
  const identity = new Set();
  for (const item of records) {
    for (const key of ['id','slug','editorialId']) {
      const token = `${key}:${item[key]}`;
      if (identity.has(token)) throw new Error('Duplicate inbox identity');
      identity.add(token);
    }
  }
  let imported = 0;
  for (const item of records) {
    if (seen.includes(item.editorialId)) continue;
    const collision = approved.find(post => post.id === item.id && post.slug !== item.slug && post.editorialId !== item.editorialId);
    if (collision) throw new Error(`Conflicting article id: ${item.id}`);
    const existing = approved.find(post => post.editorialId === item.editorialId || post.slug === item.slug || post.id === item.id || post.title.trim().toLowerCase() === item.title.trim().toLowerCase());
    // Never overwrite panel edits or resurrect an intentionally deleted article.
    if (!existing) { approved.push(item); imported++; }
    seen.push(item.editorialId);
  }
  const atomicWrite = (file, data) => {
    const tmp = `${file}.${process.pid}.tmp`;
    fs.writeFileSync(tmp,JSON.stringify(data,null,2));
    fs.renameSync(tmp,file);
  };
  if (entries.length) {
    fs.mkdirSync(dataDir,{recursive:true});
    if (imported) {
      if (fs.existsSync(target)) {
        const backups = path.join(dataDir,'editorial-backups');
        fs.mkdirSync(backups,{recursive:true});
        fs.copyFileSync(target,path.join(backups,`approved-${Date.now()}-${process.pid}.json`),fs.constants.COPYFILE_EXCL);
      }
      atomicWrite(target,approved);
    }
    // Written after content: a crash in between is safe because identities deduplicate.
    atomicWrite(journal,seen);
  }
  return {imported};
}
module.exports = {importEditorialInbox};
