# Catálogos PB: base desactivada

Preparada el 19 de octubre de 2026 para evaluar su integración después del 8 de noviembre. No hay activación por fecha. La evaluación posterior debe decidir el lanzamiento; cambiar una variable no crea por sí solo la experiencia pública.

## Alcance implementado

`src/services/pb-catalog-foundation.js` es una capa de dominio aislada: planes en centavos USD, límites, normalización de productos y almacenamiento JSON por artesano con escritura temporal y reemplazo atómico. No se importa desde el servidor y no registra rutas. No cambia perfiles, galerías ni precios actuales.

| Plan propuesto | USD/mes | Productos | Fotos/producto | Categorías | Estadísticas de clics |
| --- | ---: | ---: | ---: | --- | --- |
| free | 0 | 0 en el catálogo nuevo | 0 | No | No |
| catalog | 9.99 | 15 | 1 | No | No |
| plus | 19.99 | 50 | 4 | Sí | Sí |

El perfil gratuito conserva todos sus beneficios actuales, incluyendo su galería. Estos límites y prestaciones comerciales son provisionales. El indicador de estadísticas es una declaración de capacidad futura: no se ha construido la medición.

## Seguridad y datos

- El adaptador de servidor debe obtener `principal.artisanId` del acceso seguro actual, nunca del formulario. Revalidar la identidad y aprobación del perfil en cada operación.
- Las membresías se cargan exclusivamente desde almacenamiento de servidor. Un objeto del navegador nunca puede otorgar un plan. Formato esperado: `{artisanId, plan, status, validUntil}`. Solo `active` con vencimiento futuro habilita prestaciones. Un período ya pagado que deba mantenerse activo debe representarse como tal hasta su vencimiento.
- El almacenamiento requiere directorio absoluto en disco persistente, separado de perfiles (propuesta `/data/pb-catalogs`). No se crea nada al importar el módulo. Falta configurar copias de seguridad y recuperación.
- El adaptador debe comprobar que fotos Cloudinary corresponden a subidas autorizadas del usuario. La validación de host del módulo no demuestra propiedad de una foto.
- Los textos son datos de texto plano: escapar siempre al renderizar. Las URL HTTPS se almacenan sin visitar su destino. La revisión/allowlist de proveedores de cobro y moderación de enlaces debe completarse antes del lanzamiento.
- No hay stock transaccional ni órdenes pagadas. `available`, `made_to_order` y `unavailable` son estados informativos.
- Un descenso de plan o cancelación no borra productos: oculta el catálogo o limita lo visible. Las fotos/categorías públicas respetan el plan vigente.
- Escrituras síncronas adecuadas únicamente al patrón actual de un proceso Node y disco local. Antes de escalar a varias instancias, usar base de datos transaccional y resolver concurrencia, auditoría, exportación y retención.

## Controles previstos

`configuration()` devuelve falsos por defecto para `PB_CATALOG_ENABLED`, `PB_MEMBERSHIPS_ENABLED`, `PB_CATALOG_NAYELI_ENABLED`. Solo acepta el literal `true`. El store comprueba el control de catálogo en cada operación. Los otros dos son reservas de configuración para adaptadores futuros, no habilitan funciones aún inexistentes.

Nayeli no queda incluida automáticamente en $19.99: precio, alcance, límites de uso y presupuesto deben decidirse antes de conectar la asistente. No se realizan llamadas de IA ni se modifica su prueba interna actual.

## Flujo previsto y trabajo pendiente

1. Reutilizar el acceso de artesanos por email para el panel; añadir protección CSRF/origen, límites de peticiones y comprobación de propiedad en todas las rutas nuevas.
2. Crear interfaz privada de productos con fotos optimizadas, precios, disponibilidad y enlace de pago externo. Añadir vistas públicas móviles y botón de WhatsApp, sin modificar el perfil gratuito.
3. Persistir membresías con historial y transiciones verificadas por servidor. Elegir después el mecanismo de cobro de la membresía PB; verificar webhooks, autenticidad, idempotencia, renovaciones y cancelaciones antes de otorgar prestaciones. Este módulo no cobra ni almacena membresías.
4. El comprador paga directamente en la cuenta del artesano. PB no recibe fondos de ventas, no necesita claves privadas de sus procesadores y no certifica una venta por un clic. Dejar clara la identidad del vendedor.
5. Implementar métricas de clics con límites contra abuso. Reutilizar la infraestructura de imágenes y perfiles sin mezclar productos nuevos con la galería gratuita.
6. Conectar Nayeli después de decidir funciones y cuotas: contexto solo del artesano autenticado, consentimiento, presupuesto por cuenta y global, sin acceso a secretos ni cambios/cobros autónomos.
7. Probar con cinco artesanos, medir carga de trabajo y renovación, y revisar después del 8 de noviembre. No activar automáticamente ni comprometer presupuesto publicitario.

## Validación

Ejecutar `node tests/pb-catalog-foundation.test.js`. Prueba configuración cerrada sin escritura, aislamiento entre artesanos, enlaces e imágenes inválidos, precios en centavos, vencimientos, límites 15/50, preservación al bajar de plan y error ante archivos corruptos.

No se ha probado UI, proveedor de membresías, compras, carga real de fotos ni despliegue. La infraestructura completa requiere esas etapas; esta rama entrega únicamente la primera base reutilizable.
