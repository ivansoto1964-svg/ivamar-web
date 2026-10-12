function present(value) {
  return Boolean(String(value || '').trim());
}

function runtimeHealth(env = process.env) {
  const checks = [
    {id:'admin',label:'PB Control',configured:present(env.PB_ADMIN_USER || env.ADMIN_USER) && present(env.PB_ADMIN_PASS || env.ADMIN_PASS),impact:'Acceso administrativo privado'},
    {id:'artisan-access',label:'Acceso de artesanos',configured:present(env.PB_ARTISAN_MAGIC_SECRET),impact:'Enlaces seguros, edición de perfiles y suscripciones'},
    {id:'email',label:'Correo de PB',configured:present(env.RESEND_API_KEY) && present(env.PB_SENDER_EMAIL),impact:'Enlaces de acceso, confirmaciones y comunicaciones'},
    {id:'images',label:'Imágenes',configured:present(env.CLOUDINARY_CLOUD_NAME) && present(env.CLOUDINARY_API_KEY) && present(env.CLOUDINARY_API_SECRET),impact:'Subidas de fotos y creaciones'},
    {id:'nayeli',label:'Nayeli privada',configured:env.NAYELI_PREVIEW_ENABLED !== 'true' || present(env.OPENAI_API_KEY),impact:'Pruebas privadas con OpenAI'}
  ];
  const missing = checks.filter(item => !item.configured);
  return {checks,missing,ok:missing.length === 0};
}

module.exports = {runtimeHealth,present};
