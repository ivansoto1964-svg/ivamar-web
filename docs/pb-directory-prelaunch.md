# ¿Quién hace? y tiendas: preparación privada

Preparación del 19 de octubre de 2026. Rama de revisión; no desplegada. No activar antes de la evaluación posterior al 8 de noviembre sin decisión explícita. No hay activación por fecha.

## Controles de publicación

- `PB_DIRECTORY_ENABLED=true`: monta registro, entrada por correo, panel privado y revisión administrativa. Ausente/false: no monta rutas ni crea registros.
- `PB_DIRECTORY_PUBLIC_ENABLED=true`: requiere además el anterior para abrir directorio, perfiles, navegación y sitemap. Con solo el control maestro activo se puede preparar un piloto por enlace, sin perfiles públicos. El enlace no constituye invitación restringida: cualquiera que lo conozca puede solicitar registro.
- Tiendas: `PB_CATALOG_ENABLED=true` monta panel privado; `PB_CATALOG_PUBLIC_ENABLED=true` abre además catálogos. Ambos apagados por defecto. Las rutas vuelven a validar el control maestro en cada petición.
- `PB_TALENT_ENABLED` sigue funcionando como antes. Este cambio no modifica el registro por enlace que se envió al trovador.
- No cambiar variables de producción ni realizar deploy de esta rama durante la preparación.

## Directorio implementado

Registro con responsable adulto y email privado, vínculo boricua declarado, negocio, categoría, descripción, foto/logo, hasta 12 fotos con leyendas, contactos y enlaces. Puerto Rico: pueblo y región fija. Estados Unidos: ciudad y estado de una lista de 50 estados y DC. Código postal opcional de 5 dígitos; área atendida descriptiva. La búsqueda combina texto, categoría, país, estado, ciudad exacta sin distinción de acento/mayúsculas y código postal exacto. No hay geolocalización, radio de distancia ni validación postal contra una base de direcciones. La revisión de PB evalúa la solicitud; no certifica identidad boricua, licencias ni servicios.

Perfil nuevo pendiente, correo confirmado antes de aprobación. Los cambios no sustituyen la versión aprobada hasta revisarse. Pausa inmediata elegida por el propietario, reactivación sujeta a aprobación/apertura y temporada. Intervalo opcional de temporada con ambas fechas, inclusivo según hora de Puerto Rico; fuera del intervalo el perfil se oculta. La pausa no cambia suscripciones. No se migra ni elimina ningún perfil artesanal; un artesano puede solicitar un perfil separado. No se creó importación automática de artesanos ni enlace de cuentas.

Sesiones separadas `__Host-pbDirectory`, HttpOnly/Secure/SameSite=Lax, vencimiento 2 horas. Firma HMAC con namespace distinto al de Talento, confirmación POST (abrir enlace no verifica), Origin y CSRF para escrituras, límites por IP. `PB_DIRECTORY_MAGIC_SECRET`, con fallback al secreto de artesanos existente. Fotos: Cloudinary exclusivo `planeta-boricua/directorio/{nonce}` y comprobación de propiedad en guardado; JPG/PNG/WebP hasta 5 MB. Correo transaccional Resend. No se solicitaron cuentas ni se enviaron correos reales durante las pruebas.

Rutas privadas no indexables, no almacenadas en caché, sin referrer ni GA/medición propia. La exclusión de las nuevas rutas no reinicia ni cambia cifras históricas. Las rutas de catálogo con token también quedan excluidas. Configurar redacción de tokens en logs antes de abrir pilotos; los logs de infraestructura no están controlados por estas cabeceras.

Datos JSON en `/data/pb-directorio`, escrituras atómicas y permisos restrictivos, sin crear directorio al importar. Arquitectura actual de un solo proceso y disco persistente; antes de varias instancias hace falta almacenamiento transaccional. Respaldos/restauración y una política de retención siguen pendientes operativamente.

## Rutas para pruebas futuras

- `/quien-hace/registro`, `/quien-hace/politicas`, `/quien-hace/acceso`.
- `/quien-hace/mi-perfil`, `/quien-hace/vista-previa`: solo sesión del propietario.
- `/pb-control/directorio`, `/pb-control/directorio/:id/vista`: administración autenticada.
- `/quien-hace`, `/quien-hace/:slug`: solo con apertura pública y perfil aprobado, activo y en temporada.
- API `/api/pb-directorio/`: registro, acceso, confirmar, foto-registro, foto, perfil, pausa, retirar, salir. Retirar invalida sesión y oculta; no es borrado automático de datos privados.

## Tiendas integradas

La base previamente preparada se integró con el main que contiene Talento. Conserva planes provisionales 20 productos/$9.99 y 50/$19.99; galería gratuita actual sin cambios. Las tiendas son opcionales y separadas del directorio ¿Quién hace?, cuyo posible precio de $9.99 no activa prestaciones de tienda. No hay aceptación de pagos de compradores en PB. Cada artesano utiliza su enlace HTTPS de cobro externo o coordina por WhatsApp. Un enlace o clic no verifica una venta. No deben compartirse claves privadas de Stripe u otros procesadores.

Implementado: panel, carga de fotos, productos/precios, disponibilidad, enlaces externos, cotización por WhatsApp y vista pública detrás de controles. Plus: categorías, opciones, descuentos, entrega, CSV, exportación, registro manual de pedidos y métricas agregadas. Detalle y límites en `pb-catalog-foundation.md` y `pb-catalog-feature-comparison.md`.

**No está implementado el ciclo de suscripción comercial PB.** Los accesos de prueba se asignan solo en servidor mediante el archivo de membresías documentado, fuera de Git; no indican un pago real. No hay cobros, renovaciones, webhooks, cancelación/reembolso automatizados ni Nayeli conectada. Antes de cobrar hay que elegir y probar ese ciclo, aceptar términos comerciales, decidir prestaciones/precios y revisar enlaces/proveedores externos. No anunciar las tiendas como servicio de pago listo por tener estas pantallas.

## Validación realizada y límites

`npm test` completo pasó, incluyendo suite anterior, Talento, catálogo y directorio. Nuevas pruebas HTTP comprueban controles apagados, permisos, sesiones separadas, correo confirmado, galería propia, borrador/aprobación, pausa, temporadas, búsqueda, vista previa privada, retiro y exclusiones de medición. Proveedores de fotos y correo simulados: no prueban entrega real ni credenciales de producción.

No se realizó revisión visual en navegador ni prueba de compra/pago real. Antes de abrir: revisar en móvil/escritorio, validar emails/fotos en un entorno de prueba con consentimiento, respaldos, restauración y un pequeño piloto de negocios/artesanos. Mantener la sección pública cerrada y no prometer ventas. La automatización comercial y Nayeli requieren trabajo adicional separado.
