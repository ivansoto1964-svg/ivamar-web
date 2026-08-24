from pathlib import Path
p=Path('src/server.js')
s=p.read_text()
req='const artesanoMiPerfilPB = require("./views/planetaboricua/artesano-mi-perfil");\n'
if 'artesanoAdminPB' not in s:
    if req not in s: raise SystemExit('self-service require anchor missing')
    s=s.replace(req,req+'const artesanoAdminPB = require("./views/planetaboricua/artesano-admin");\n',1)
anchor="app.get('/artesanos/mi-perfil', (_req,res) => {"
block=r'''// PB Control artisan editor.
app.get('/pb-control/artesanos', requirePBAdmin, (req,res) => {
  const q = sanitize(req.query?.q || '').trim().toLowerCase();
  let items = loadPBApprovedArtisansWithFiles().map(item => ({...item,slug:pbArtisanSlug(item)}));
  if (q) items = items.filter(item => [item.name,item.email,item.whatsapp,item.city,item.location].some(value => String(value || '').toLowerCase().includes(q)));
  items.sort((a,b)=>String(a.name||'').localeCompare(String(b.name||''),'es'));
  res.send(artesanoAdminPB.list(items.slice(0,300),q));
});

app.get('/pb-control/artesanos/:id', requirePBAdmin, (req,res) => {
  const record = loadPBApprovedArtisanRecord(req.params.id);
  if (!record) return res.status(404).send('Artesano no encontrado.');
  res.send(artesanoAdminPB.edit({...record.item,slug:pbArtisanSlug(record.item)}, req.pbAdminSession.csrf));
});

app.post('/pb-control/artesanos/:id', requirePBAdmin, requirePBCsrf, express.json({limit:'80kb'}), async (req,res) => {
  const record = loadPBApprovedArtisanRecord(req.params.id);
  if (!record) return res.status(404).json({ok:false,error:'Artesano no encontrado.'});
  const fields=['name','category','location','city','zip','address','desc','fullDesc','email','whatsapp','website','instagram','facebook','tiktok','etsy','logo','photo','price'];
  const changes={}; fields.forEach(key=>changes[key]=sanitize(req.body?.[key]||'').trim());
  if(!changes.name||!changes.category||!changes.location||!changes.city||!changes.desc||!changes.fullDesc||!changes.email||!changes.photo) return res.status(400).json({ok:false,error:'Completa los campos requeridos.'});
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(changes.email)) return res.status(400).json({ok:false,error:'El email no es válido.'});
  const duplicate=findPBArtisanDuplicate({email:changes.email,whatsapp:changes.whatsapp},{approvedOnly:true,excludeId:record.item.id});
  if(duplicate)return res.status(409).json({ok:false,error:pbArtisanDuplicateMessage(duplicate.reason)});
  const stableSlug=pbArtisanSlug(record.item);
  const next={...record.item,...changes,slug:stableSlug,id:record.item.id,status:'approved',updatedAt:new Date().toISOString()};
  backupPBArtisans(`before-admin-update-${record.item.id}`);
  try{savePBArtisanUpdate(record,next)}catch(error){console.error('PB admin artisan update:',error);return res.status(500).json({ok:false,error:'No pudimos guardar los cambios.'})}
  res.json({ok:true,message:'Perfil actualizado correctamente.',profileUrl:`/artesanos/${stableSlug}`});
});

'''
if "app.get('/pb-control/artesanos'" not in s:
    if anchor not in s: raise SystemExit('self-service route anchor missing')
    s=s.replace(anchor,block+anchor,1)
p.write_text(s)
print('PB artisan admin editor installed')
