'use strict';
const express=require('express');
const guide=require('./pb-visit-guide'),view=require('../views/planetaboricua/visit-guide');
function createRouter({directory,requireAdmin,requireAdminCsrf}){
 const router=express.Router(),store=guide.createStore(directory),base='/pb-control/visitas';
 router.use(base,(req,res,next)=>{res.set({'Cache-Control':'private, no-store','X-Robots-Tag':'noindex, nofollow','Referrer-Policy':'no-referrer'});next();},requireAdmin);
 const wrap=fn=>(req,res,next)=>Promise.resolve().then(()=>fn(req,res,next)).catch(next);
 const record=id=>{const r=store.get(id);if(!r){const e=Error('Visita no encontrada.');e.status=404;throw e;}return r;};
 router.get(base,wrap((req,res)=>res.send(view.list(store.all(),req.pbAdminSession.csrf))));
 router.get(base+'/nueva',(req,res)=>res.send(view.edit(null,req.pbAdminSession.csrf)));
 router.get(base+'/guia-imprimible',(req,res)=>res.send(view.blank()));
 router.post(base,requireAdminCsrf,wrap((req,res)=>{if(Buffer.byteLength(JSON.stringify(req.body))>60000)return res.sendStatus(413);res.json({ok:true,record:store.save(req.body)});}));
 router.get(base+'/:id/expediente.pdf',wrap(async(req,res)=>{const r=record(req.params.id),bytes=await guide.pdf(r,store);res.type('pdf').set('Content-Disposition',`attachment; filename="${r.id}-expediente.pdf"`).send(bytes);}));
 router.get(base+'/:id/registro.json',wrap((req,res)=>res.set('Content-Disposition',`attachment; filename="${req.params.id}.json"`).json(record(req.params.id))));
 router.get(base+'/:id/imagenes/:aid',wrap((req,res)=>res.type('jpeg').sendFile(store.imagePath(req.params.id,req.params.aid))));
 router.post(base+'/:id/imagenes',requireAdminCsrf,wrap(async(req,res)=>res.json({ok:true,record:await store.addImage(req.params.id,req.body)})));
 router.post(base+'/:id/imagenes/:aid/eliminar',requireAdminCsrf,wrap((req,res)=>res.json({ok:true,record:store.removeImage(req.params.id,req.params.aid)})));
 router.get(base+'/:id',wrap((req,res)=>res.send(view.edit(record(req.params.id),req.pbAdminSession.csrf))));
 router.post(base+'/:id',requireAdminCsrf,wrap((req,res)=>{if(Buffer.byteLength(JSON.stringify(req.body))>60000)return res.sendStatus(413);res.json({ok:true,record:store.save(req.body,req.params.id)});}));
 router.use((err,req,res,next)=>{if(!req.path.startsWith(base))return next(err);res.status(err.status||500).json({ok:false,error:err.status?err.message:'No se pudo completar la operación. Tus cambios no están confirmados.'});});return router;
}
module.exports={createRouter};
