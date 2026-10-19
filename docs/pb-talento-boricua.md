# Talento Boricua: registro, perfil y calendario

Implementado el 19 de octubre de 2026 como sección cultural gratuita independiente de la Feria de Artesanos y del catálogo comercial en preparación. No incluye suscripciones, ventas ni llamadas nuevas a IA.

## Enlaces

- Directorio: `/talento-boricua`.
- Solicitud: `/talento-boricua/registro`.
- Políticas específicas: `/talento-boricua/politicas` (versión `2026-10-19.1`).
- Solicitar acceso por email: `/talento-boricua/acceso`.
- Panel: `/talento-boricua/mi-perfil` (sesión privada).
- Perfil público: `/talento-boricua/{slug}`.
- Moderación: `/pb-control/talento`, con el acceso y CSRF actuales de PB Control.

## Flujo

1. El responsable adulto añade su nombre privado, email privado, nombre artístico, categoría, vínculo con Puerto Rico, ubicación general, presentación y foto. Opcionalmente añade teléfono público, web/redes y un video específico de YouTube.
2. Lee y acepta las condiciones y privacidad, confirma su representación y autoriza la publicación. Todas las casillas empiezan sin marcar; el permiso para redes propias de PB es opcional. Se guardan versión, fecha y alcance de las autorizaciones. Estos textos operativos deben revisarse si cambia el servicio; no constituyen una certificación jurídica de cumplimiento para todas las jurisdicciones.
3. La solicitud se guarda pendiente. Resend entrega un enlace firmado de dos horas. Abrirlo no confirma nada (protección frente a escáneres de correo); el responsable pulsa «Confirmar y abrir mi perfil» para verificar el email e iniciar sesión.
4. PB revisa foto, identidad cultural declarada, texto, contactos, video y permisos en PB Control. La aprobación o no aprobación del perfil genera un aviso transaccional al responsable; si falla, PB Control informa que la revisión se guardó pero el correo no se entregó. No se puede aprobar sin confirmación del correo.
5. El perfil aprobado se añade al directorio y sitemap. Los cambios posteriores del perfil quedan en borrador para revisión, conservando la versión pública vigente.
6. Desde su panel, el artista crea presentaciones, disponibilidad o bloqueos privados. Las presentaciones se revisan; la disponibilidad es una declaración del artista y solo se publica con perfil aprobado. No hay reservas automáticas ni cobros.
7. El responsable puede retirar el perfil y calendario; la sesión se invalida. La eliminación de datos privados se gestiona por el contacto publicado en las políticas; retirar no equivale a borrado de archivos/backups.

## Calendario

- Vista mensual con navegación y lista de próximas presentaciones.
- Hasta 31 días por entrada, fechas futuras, horario opcional y zona horaria explícita.
- Hasta 200 entradas por perfil; el propietario puede eliminar las antiguas.
- La disponibilidad no se presume por días vacíos. Las presentaciones aprobadas o pendientes y los bloqueos privados impiden mostrar el día como disponible. Una presentación rechazada deja de bloquearlo. La versión inicial es por día, no un motor de reservas con franjas horarias.
- Los bloqueos privados nunca se incluyen en la proyección pública, ni en el archivo de calendario ni en el directorio.
- La descarga ICS de una presentación aprobada guarda un recordatorio de días completos; el horario anunciado y su zona horaria se incluyen en la descripción. No pretende sustituir una invitación con hora exacta o confirmación de contratación.
- Estas presentaciones pertenecen al perfil del artista: no se duplican automáticamente en Agenda Boricua, que mantiene sus reglas y revisión actuales.

## Video

Una sola URL elegida por el artista; no hay galería ni alojamiento de videos. Acepta formatos de enlace YouTube/watch, youtu.be, Shorts y Live con ID válido. Esto valida el formato, no la existencia, titularidad o permiso real de incrustación. El artista actualiza el enlace manualmente cuando desea destacar otro video.

El reproductor no se conecta hasta pulsar el botón. Usa `youtube-nocookie.com` y referrer de origen para compatibilidad. No se promete ausencia total de tratamiento por YouTube tras cargarlo. Referencia oficial: https://support.google.com/youtube/answer/171780 . No hay búsqueda automática del video más reciente ni API pagada.

## Configuración y datos

- Reutiliza el disco persistente `/data`; datos en `/data/pb-talento/{uuid}.json`, separados de artesanos y eventos existentes. Escritura mediante archivo temporal y renombrado atómico. No se escriben datos al importar el módulo.
- Usa `PB_TALENT_MAGIC_SECRET` o, si no existe, el actual `PB_ARTISAN_MAGIC_SECRET`; los tokens llevan un ámbito criptográfico distinto, sin intercambiar accesos de artesanos y talentos. Sin secreto, el registro devuelve una página de configuración pendiente, nunca un acceso inseguro.
- Reutiliza `RESEND_API_KEY`, `PB_SENDER_EMAIL` y las variables Cloudinary actuales. No crea cuentas ni suscripciones nuevas.
- `PB_TALENT_ENABLED` está desactivado por defecto. Solo el valor explícito `true` habilita el directorio y perfiles públicos, ICS público, sitemap y enlaces del menú y pie. El registro por enlace, las políticas, el acceso del responsable y la revisión privada en PB Control siguen disponibles para preparar solicitudes antes del lanzamiento. Una aprobación previa a la apertura no publica el perfil y su correo lo explica. Mantenerlo sin configurar o en `false` hasta la evaluación posterior al 8 de noviembre. El despliegue de código no debe activar la sección por sí solo; no hay activación automática por fecha. Los datos guardados se conservan.
- Las fotos se cargan mediante rutas limitadas, token de formulario firmado o sesión autenticada y carpeta de imágenes de la solicitud. Se admiten JPG/PNG/WebP hasta 5 MB; el proveedor verifica el archivo real. Las pruebas locales simulan el proveedor.
- Sesión de dos horas en cookie `__Host-pbTalent`, HttpOnly, Secure, SameSite=Lax. En producción requiere HTTPS. Las escrituras verifican origen y CSRF. El retiro incrementa la versión de sesión e invalida accesos anteriores.
- Las páginas privadas de registro, acceso y panel se excluyen de analítica propia, GA inyectado y Web Vitals. El cambio evita guardar el token del enlace de acceso; no cambia cifras ni definiciones históricas. Los logs de infraestructura del enlace de email requieren el tratamiento privado correspondiente.
- La moderación usa el administrador actual de PB. Se revisa en la nueva sección; no se enviaron mensajes ni emails reales durante las pruebas.

## Pruebas y límites de verificación

`npm run test:talent` cubre consentimiento, permisos de redes opcionales, correo sin confirmar, límites de fechas, zona horaria, proyección pública, preservación de versión aprobada, tokens con ámbito/expiración/firma, sesiones/CSRF/origen, subida simulada, borradores, aprobación de presentaciones, ICS, retiro e invalidación, exclusión de rutas privadas en métricas, escapado y sintaxis del JavaScript.

La prueba HTTP usa directorios temporales y servicios de correo/foto simulados. Antes de compartir el enlace de registro, comprobar después del deploy una solicitud real, recepción de email y subida de foto, además de una revisión visual en móvil. No se hicieron compras ni altas de proveedores. La reproducción de videos externos depende de la configuración y disponibilidad de YouTube.

Las copias/recuperación, depuración de solicitudes antiguas y administración de eliminación de datos deben incorporarse a la operación de PB antes de ampliar el volumen. El almacenamiento está diseñado para el proceso único con disco persistente actual; varias instancias requieren base de datos o coordinación transaccional.
