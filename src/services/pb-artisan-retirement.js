const fs = require('fs');
const path = require('path');

function read(file) {
  if (!fs.existsSync(file)) return [];
  const items = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!Array.isArray(items)) throw new Error('Invalid artisan archive');
  return items;
}

function write(file, items) {
  fs.mkdirSync(path.dirname(file), {recursive:true});
  const temp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(temp, JSON.stringify(items, null, 2));
  fs.renameSync(temp, file);
}

function retire({record, archiveFile, slug, now = new Date().toISOString()}) {
  const archived = read(archiveFile).filter(entry => String(entry.item.id) !== String(record.item.id));
  archived.push({item:{...record.item,slug},file:record.file,retiredAt:now});
  // Preserve the complete record before removing it from the public directory.
  write(archiveFile, archived);
  write(record.full, record.items.filter(item => String(item.id) !== String(record.item.id)));
}

function restore({id, archiveFile, directory, approved}) {
  const archived = read(archiveFile);
  const entry = archived.find(entry => String(entry.item.id) === String(id));
  if (!entry) throw new Error('Perfil retirado no encontrado.');
  const email = value => String(value || '').trim().toLowerCase();
  const phone = value => String(value || '').replace(/\D/g,'').replace(/^1(?=\d{10}$)/,'');
  if (approved.some(item => String(item.id) === String(id) || item.slug === entry.item.slug ||
    (email(entry.item.email) && email(item.email) === email(entry.item.email)) ||
    (phone(entry.item.whatsapp).length === 10 && phone(item.whatsapp) === phone(entry.item.whatsapp)))) {
    throw new Error('Ya existe un perfil activo con estos datos. Revisa los duplicados antes de restaurar.');
  }
  if (path.basename(entry.file) !== entry.file || !entry.file.endsWith('.json') || entry.file === 'pending.json') throw new Error('Archivo de origen inválido.');
  const target = path.join(directory, entry.file);
  write(target, [...read(target), entry.item]);
  write(archiveFile, archived.filter(item => String(item.item.id) !== String(id)));
  return entry.item;
}

module.exports = {read, retire, restore};
