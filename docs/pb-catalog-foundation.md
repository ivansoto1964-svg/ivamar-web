# Catálogos PB: base desactivada

Preparada el 19 de octubre de 2026 para evaluar su integración después del 8 de noviembre. No hay activación por fecha. La rama incluye ahora panel privado y vista del catálogo, pendientes de publicación. La evaluación posterior debe decidir el lanzamiento; cambiar una variable no crea por sí solo la experiencia pública.

## Alcance implementado

`src/services/pb-catalog-foundation.js` es una capa de dominio aislada: planes en centavos USD, límites, normalización de productos y almacenamiento JSON por artesano con escritura temporal y reemplazo atómico. El servidor registra las rutas únicamente si `PB_CATALOG_ENABLED=true`. Con su valor predeterminado no registra rutas ni crea archivos. No cambia los datos de perfiles, galerías ni precios actuales. El enlace «Mi catálogo» aparece en la navegación privada solo al habilitar el piloto.

| Plan propuesto | USD/mes | Productos | Fotos/producto | Categorías | Estadísticas de clics |
| --- | ---: | ---: | ---: | --- | --- |
| free | 0 | 0 en el catálogo nuevo | 0 | No | No |
| catalog | 9.99 | 20 | 1 | No | No |
| plus | 19.99 | 50 | 4 | Sí | Sí |

El perfil gratuito conserva todos sus beneficios actuales, incluyendo su galería. Estos límites y prestaciones comerciales son provisionales. La medición agregada de actividad del catálogo público está implementada para Plus; no equivale a ventas o usuarios únicos.

## Seguridad y datos

- El adaptador de servidor debe obtener `principal.artisanId` del acceso seguro actual, nunca del formulario. Revalidar la identidad y aprobación del perfil en cada operación.
- Las membresías se cargan exclusivamente desde almacenamiento de servidor. Un objeto del navegador nunca puede otorgar un plan. Formato esperado: `{artisanId, plan, status, validUntil}`. Solo `active` con vencimiento futuro habilita prestaciones. Un período ya pagado que deba mantenerse activo debe representarse como tal hasta su vencimiento.
- El almacenamiento requiere directorio absoluto en disco persistente, separado de perfiles (propuesta `/data/pb-catalogs`). No se crea nada al importar el módulo. Falta configurar copias de seguridad y recuperación.
- Las rutas de guardado aceptan únicamente fotos Cloudinary del directorio `planeta-boricua/catalogos/{id}/`. La carga autenticada guarda en ese directorio y tiene un límite de 25 solicitudes por IP/hora. El directorio debe mantenerse exclusivo de estas rutas; la validación de host del módulo base por sí sola no demuestra propiedad.
- Los textos son datos de texto plano: escapar siempre al renderizar. Las URL HTTPS se almacenan sin visitar su destino. Se rechazan esquemas inseguros y credenciales. La revisión/allowlist de proveedores de cobro y moderación de enlaces debe completarse antes del lanzamiento.
- No hay stock transaccional ni comprobación de órdenes pagadas. El registro de pedidos es manual; cualquier pago marcado en él proviene del artesano, sin verificación de PB. `available`, `made_to_order` y `unavailable` son estados informativos.
- Un descenso de plan o cancelación no borra productos: oculta el catálogo o limita lo visible. Las fotos/categorías públicas respetan el plan vigente.
- Escrituras síncronas adecuadas únicamente al patrón actual de un proceso Node y disco local. Antes de escalar a varias instancias, usar base de datos transaccional y resolver concurrencia, auditoría, exportación y retención.

## Controles previstos

`configuration()` devuelve falsos por defecto para `PB_CATALOG_ENABLED`, `PB_MEMBERSHIPS_ENABLED`, `PB_CATALOG_NAYELI_ENABLED`. Solo acepta el literal `true`. El store comprueba el control de catálogo en cada operación. Los otros dos son reservas de configuración para adaptadores futuros, no habilitan funciones aún inexistentes. `PB_CATALOG_PUBLIC_ENABLED=true` es un segundo control obligatorio para publicar `/catalogos/:slug`; no se activa por habilitar el panel.

Nayeli no queda incluida automáticamente en $19.99: precio, alcance, límites de uso y presupuesto deben decidirse antes de conectar la asistente. No se realizan llamadas de IA ni se modifica su prueba interna actual. Cupones y precios por cantidad de Plus se calculan solo en la consulta estimada y deben confirmarse en el cobro externo.

## Flujo previsto y trabajo pendiente

1. Implementado: panel con acceso por el token seguro actual y revalidación de email/perfil aprobado, comprobación CSRF y Origin en escrituras, límites de solicitudes y separación por propietario. Las páginas no se cachean, no se indexan y no envían referrer. El piloto mantiene el esquema actual de tokens en URL; antes del lanzamiento conviene pasar a sesiones HttpOnly y ocultar tokens en logs.
2. Implementado: interfaz privada para crear, editar, ocultar y eliminar productos; cargar fotos; indicar precios, disponibilidad, categoría Plus y enlace de pago externo. Vista adaptable con fotos completas, categorías, botón de pago externo y consulta por WhatsApp. No se muestran botones de compra para productos no disponibles. Los formularios no cambian la galería gratuita.
3. Persistir membresías con historial y transiciones verificadas por servidor. Elegir después el mecanismo de cobro de la membresía PB; verificar webhooks, autenticidad, idempotencia, renovaciones y cancelaciones antes de otorgar prestaciones. Este módulo no cobra ni almacena membresías.
4. El comprador paga directamente en la cuenta del artesano. PB no recibe fondos de ventas, no necesita claves privadas de sus procesadores y no certifica una venta por un clic. Dejar clara la identidad del vendedor.
5. Implementado: métricas agregadas con límites contra abuso; inventario manual, opciones, selección y cotización por WhatsApp, configuración de entrega, CSV revisable, exportación completa y registro manual de pedidos. Véase `pb-catalog-feature-comparison.md` para alcance, planes y diferencias con el proveedor.
6. Conectar Nayeli después de decidir funciones y cuotas: contexto solo del artesano autenticado, consentimiento, presupuesto por cuenta y global, sin acceso a secretos ni cambios/cobros autónomos.
7. Pendiente: probar con cinco artesanos, medir carga de trabajo y renovación, y revisar después del 8 de noviembre. No activar automáticamente ni comprometer presupuesto publicitario.

## Validación

Ejecutar `node tests/pb-catalog-foundation.test.js`. Prueba configuración cerrada sin escritura, aislamiento entre artesanos, enlaces e imágenes inválidos, precios en centavos, vencimientos, límites 20/50, preservación al bajar de plan y error ante archivos corruptos.

Ejecutar `npm run test:catalog` con las dependencias instaladas. Las pruebas nuevas también forman parte de `npm test`, cuya suite existente pasó en esta revisión. Prueba el flujo HTTP de guardado, consulta, eliminación, cancelación, fotos de propietario, origen/CSRF, separación de vista privada y pública, escapado de texto y sintaxis del JavaScript de la interfaz. El proveedor de fotos está simulado en estas pruebas.

No hay verificación visual en navegador, conexión real a Cloudinary en este entorno, cobros de membresía ni integración con Nayeli. La selección de productos y las métricas propias ya están implementadas y probadas por HTTP. No se ha desplegado.

## Rutas y piloto futuro

- `/artesanos/catalogo/:token`: panel con el token actual del enlace seguro.
- `/artesanos/catalogo/:token/vista`: vista privada sin compartir el token con destinos externos.
- `/api/pb-catalogo/:token/{guardar,eliminar,foto}`: POST autenticado, Origin del dominio canónico y cabecera CSRF suministrada por el panel.
- `/catalogos/:slug`: exige los dos controles de catálogo y publicación, perfil aprobado y membresía vigente.
- `/pb-control/catalogos/:id`: vista de solo lectura, protegida por el acceso de administración existente.

El repositorio de membresías es de solo lectura; ningún navegador puede elegir el plan. Durante el piloto futuro un administrador deberá preparar registros autorizados en `/data/pb-catalog-memberships.json`, fuera de Git, con estructura `{"version":1,"memberships":[{"artisanId":"ID_REAL","plan":"catalog","status":"active","validUntil":"FECHA_ISO_FUTURA"}]}`. Eso representa un acceso de prueba, no evidencia de pago. Un archivo inválido o con duplicados provoca error; no se concede acceso por defecto.

No configurar ahora esos archivos o variables en producción. Después de la evaluación, probar primero en staging con datos de prueba, copias y consentimiento de los participantes. Antes de cobrar, completar el ciclo de suscripción y sus pruebas.

## Rutas adicionales de herramientas

- POST privado `/api/pb-catalogo/:token/{configuracion,importar,cotizar,pedido,eliminar-pedido}`.
- GET privado `/api/pb-catalogo/:token/exportar.csv` y `/exportar.json`. CSV es una exportación resumida; JSON incluye productos completos, ajustes y registros manuales.
- POST público `/api/pb-catalogo-publico/:slug/{cotizar,metrica}`: exige catálogo publicado, plan vigente, origen propio y límites por IP. Nunca permite cambiar productos, importar, tocar stock o otorgar planes.
- La vista privada puede preparar consultas, pero no añade métricas. La vista pública registra actividad agregada, sin cookies ni identificadores persistentes.
- `pb-catalog-tools.test.js` prueba cálculo monetario, cantidades agregadas de variantes, manipulación de precios, descuentos, vencimientos, envío desconocido, importación atómica, exportación segura para hojas de cálculo, registro manual de pedidos y métricas.
