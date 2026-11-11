# Planeta Boricua

Repositorio principal de **Planeta Boricua — Más Boricua que un Mofongo**.

- Sitio público: <https://www.masboricuaqueunmofongo.com>
- Producción: servicio `ivamar-web` en Render, con disco persistente en `/data`.
- Código fuente: GitHub, rama `main`
- Administración privada: PB Control
- Responsable: Iván Soto

Aunque el repositorio conserva el nombre técnico histórico `ivamar-web`, el proyecto activo es exclusivamente **Planeta Boricua**. Ivamar AI, Nayeli y los asistentes anteriores están retirados y no forman parte de la dirección actual del producto.

## Estado de la plataforma · 11 de noviembre de 2026

| Área | Qué está disponible y dónde se administra |
| --- | --- |
| Inicio y Lo más reciente | La portada abre con la publicación más reciente aprobada, su imagen principal y una lista de titulares con miniaturas cuando tienen foto. [Lo más reciente](https://www.masboricuaqueunmofongo.com/lo-mas-reciente) y [El Balcón](https://www.masboricuaqueunmofongo.com/blog) se trabajan en PB Control → Publicaciones. Lo más reciente requiere una fuente verificable y conserva la portada en los borradores sincronizados. |
| Feria Digital y Artesano de la Semana | Registro gratuito, perfiles que cada artesano puede editar por email, creaciones y QR permanente. El [archivo de entrevistas](https://www.masboricuaqueunmofongo.com/artesano-de-la-semana) conserva las publicaciones originales. La entrevista seleccionada más reciente aparece en Inicio. La compra se coordina directamente con el artesano. |
| Agenda y Nuestros pueblos | [Agenda Boricua](https://www.masboricuaqueunmofongo.com/agenda-boricua) ofrece una página por evento. [Nuestros pueblos](https://www.masboricuaqueunmofongo.com/pueblos) está en el menú compartido, con buscador, filtro por zona y tablillas para los 78 municipios. Arecibo tiene guía de fin de semana y contenido comunitario. |
| Radio PB | [Radio Planeta Boricua](https://www.masboricuaqueunmofongo.com/radio) está publicada. La programación se edita en [PB Control → Radio PB](https://www.masboricuaqueunmofongo.com/pb-control/radio). La parrilla pública está vacía al cierre de esta actualización. |
| Publicidad y afiliados | [PB Ads](https://www.masboricuaqueunmofongo.com/pb-control/ads) gestiona campañas directas, afiliadas e internas, con ubicaciones y métricas. Las campañas de Expedia para vuelos, cruceros, hoteles y hoteles en Puerto Rico están activas, con imágenes por categoría. Las dos campañas de Trip.com recibieron imágenes nuevas. |
| Estadísticas y comunicaciones | PB Control reúne métricas propias, suscriptores, moderación y comunicaciones. GA4 y Search Console complementan la medición. La [Sala de Prensa pública](https://www.masboricuaqueunmofongo.com/sala-de-prensa) comparte material aprobado. Los contactos y el seguimiento viven en el panel privado. |
| Negocios por pueblo | El directorio y el flujo de suscripción están implementados. El cobro de $9.99 USD al mes sigue pendiente de activar y verificar en Stripe. Ver [configuración de cobros](docs/PB-NEGOCIOS-POR-PUEBLO.md). |

### Cómo se opera Radio PB

1. En PB Control → Radio PB, edita un borrador o añade un programa. Configura emisora, día, inicio y cierre en hora de Puerto Rico. El horario se repite cada semana.
2. Añade el enlace HTTPS autorizado de audio directo para escuchar dentro de PB. Si tienes la página oficial para escuchar, ese enlace abre la emisora.
3. Marca **Activar este espacio en la parrilla pública** y guarda. El reproductor consulta qué programa corresponde al horario. Puedes añadir un audio de respaldo para los espacios sin señal.
4. Verifica la página pública al comenzar el bloque. WMSW, Católica Radio, Radio Raíces y Éxitos 1530 AM arrancaron como borradores. Para activar cada señal faltan los enlaces autorizados y la confirmación del horario completo.

La configuración de radio se guarda en `/data/pb-radio/schedule.json`. Con audio directo, la emisora sirve el audio al navegador y PB maneja la parrilla. Esta versión funciona en el servicio existente de Render.

### Cómo se leen las métricas de PB Ads

- Las impresiones visibles, los clics y el CTR se consultan por campaña en PB Ads. El inventario agrega actividad por ubicación durante los últimos 30 días.
- Los cambios de imagen, estado y ubicación se guardan desde el panel. La selección usa las fechas, ubicaciones y prioridades de cada campaña.
- Para verificar reservas, ventas o comisiones, consultar el panel del programa de afiliación. El CTR de PB mide clics sobre impresiones, y las campañas recién activadas pueden tener poca muestra.

## Continuidad del proyecto

Antes de trabajar en una sesión o chat nuevo, leer:

1. [`docs/PB-ESTADO-ACTUAL.md`](docs/PB-ESTADO-ACTUAL.md) — continuidad técnica y registro de decisiones y fases anteriores.
2. [`docs/PB-EDITORIAL-GUIDE.md`](docs/PB-EDITORIAL-GUIDE.md) — voz y método editorial.
3. [`docs/PB-BLOG-MIGRATION.md`](docs/PB-BLOG-MIGRATION.md) — migración del blog y verificaciones relacionadas.

Los documentos de prototipo de los 78 pueblos permanecen en `docs/` como referencia de esa fase.

## Verificación mínima

```bash
npm test
```

Producción toma el código de `main`. Para cambios funcionales, iniciar el despliegue manual en Render cuando corresponda, verificar que quede en estado `live` y comprobar la página o función afectada. Los cambios de contenido, horarios y campañas realizados en PB Control se aplican desde el panel. Los cambios de documentación se consultan en GitHub.

## Sala de Prensa PB

### Estado y ubicación

La primera versión administrativa fue desplegada y verificada el **6 de septiembre de 2026**. Vive dentro de **PB Control → Comunicaciones → Sala de Prensa PB** y está preparada para servir posteriormente a todas las áreas de Planeta Boricua, aunque la primera campaña será la Feria Digital de Artesanos.

La implementación reutiliza la sesión privada, protección CSRF, componentes, estilos y disco persistente existentes. No rediseña el portal, no reconstruye funciones disponibles y no cambia datos, rutas ni funciones de Artesanos.

### Protección y almacenamiento

- Datos separados en `/data/pb-press-room.json`.
- Escritura atómica y respaldos rotativos antes de modificaciones.
- No contiene contactos inventados ni un comunicado precargado.
- No envía emails ni se conecta a Resend u otros servicios externos.
- No modificar el envío actual de comunicaciones a Artesanos al trabajar esta función.
- Antes de cada cambio: inspeccionar la arquitectura vigente y ejecutar `npm test`.
- Después de cada cambio: comprobar Comunicaciones, Artesanos, contactos, comunicados, asociaciones y seguimiento antes del deploy manual de Render.

### Contactos de medios

Cada contacto puede guardar:

- Medio, contacto o periodista, email, teléfono y sitio web.
- Tipo de medio: Radio, Televisión, Periódico, Medio digital, Revista, Podcast u Otro.
- Ciudad o mercado, estado y país.
- Alcance: Puerto Rico, Diáspora, Latino o Nacional.
- Etiquetas: Artesanos, Cultura, Eventos, Turismo, Gastronomía, Negocios, Comunidad, Diáspora, Viajes, Entretenimiento u Otros.
- Prioridad A, B o C.
- Tipo de contacto: Redacción general, Periodista, Editor, Productor, Director, Contacto personal u Otro.
- Estado: Activo, Por verificar o No contactar.
- Notas internas.

La interfaz permite crear, consultar, editar y desactivar contactos; buscar; aplicar filtros por todos los campos importantes; y seleccionar múltiples contactos. Los contactos marcados **No contactar** no pueden añadirse a una distribución.

### Comunicados y seguimiento

Cada comunicado puede guardar título, fecha, tema o campaña, contenido, enlace al Media Kit y estado: **Borrador, Listo, En distribución o Finalizado**.

El editor conserva un borrador local mientras se escribe y, para la primera campaña, propone automáticamente **Feria Digital de Artesanos — Planeta Boricua** y la fecha **23 de septiembre de 2026**. Guardar un borrador no lo publica ni envía correos.

La cabecera de Sala de Prensa ofrece acceso directo a **Nuevo comunicado**, evitando recorrer la lista completa de contactos para llegar al editor.

Los contactos seleccionados pueden asociarse al comunicado sin duplicar la misma relación. Para cada asociación se registra:

- Medio, contacto y email.
- Fecha de envío.
- Estado: Pendiente, Enviado, Respondió, Publicó, Seguimiento o No interesado.
- Fecha de seguimiento.
- Enlace de publicación.
- Notas internas.

El panel muestra totales de contactos, comunicados, seguimientos y publicaciones. También resume las gestiones, respuestas y publicaciones de cada contacto para identificar los medios con mejor relación con PB.

### Primera campaña

- Campaña: **Feria Digital de Artesanos — Planeta Boricua**.
- Lanzamiento: **23 de septiembre de 2026**.
- Investigar y verificar los contactos antes de añadirlos.
- El desarrollo del borrador del comunicado quedó autorizado el **7 de septiembre de 2026**.
- No distribuir ni marcar el comunicado como enviado sin una autorización nueva y expresa de Iván.
- Priorizar medios de Puerto Rico y la diáspora apropiados para artesanos, cultura, comunidad y eventos.

### Paquete Maestro y consolidación

La recopilación inicial se declaró terminada el **7 de septiembre de 2026**. PB Control incluye una herramienta privada para pegar el Paquete Maestro, analizarlo sin guardar y consolidarlo solamente después de revisar la vista previa.

- Reconoce prioridad **A+** además de A, B y C.
- Deduplica sin borrar contactos válidos existentes y actualiza solamente campos vacíos.
- Conserva emails alternos de la misma persona sin convertirlos en contactos innecesariamente duplicados.
- Separa prensa de organizaciones, festivales/eventos, cultura/instituciones, amplificadores/aliados y servicios de distribución.
- Los registros nuevos del paquete quedan pendientes de validación; un email encontrado no se activa automáticamente.
- La vista **LISTOS PARA ENVÍO — FERIA DIGITAL DE ARTESANOS** muestra únicamente contactos A+/A con email y estado Activo.
- La consolidación crea un respaldo del archivo persistente antes de escribir.
- Los registros de organizaciones y eventos reciben identificadores permanentes; las importaciones anteriores con identificadores vacíos se reparan de forma automática en la próxima escritura segura.
- Esta función no envía correos, no crea campañas y no construye el directorio público de organizaciones.

### Sala de Prensa pública

La primera fase pública quedó autorizada e implementada el **14 de septiembre de 2026** en `/sala-de-prensa`. Publica únicamente material aprobado: ocho fotografías oficiales de la Feria Digital con identificación, ubicación, pie de foto, crédito y descarga individual. No expone contactos, seguimientos, borradores ni otros datos internos del panel administrativo.

## Historial de emails · septiembre de 2026

- Asunto vigente: **🇵🇷 Bienvenido oficialmente a la Feria Digital de Artesanos Boricuas**.
- Lotes enviados: 50 el 1 de septiembre, 50 el 2 de septiembre y un tercer lote el 3 de septiembre.
- Resultado conocido del primer lote: 49 entregados y un rebote, `velarecolectionpr@outlook.com`.
- Antes de un nuevo lote, revisar destinatarios únicos, entregas, rebotes, quejas y pendientes en PB Control.
- No repetir destinatarios y no enviar otro lote hasta revisar ese inventario.
- PB Control selecciona automáticamente los próximos destinatarios pendientes en lotes de hasta 50.
- Todo envío necesita autorización expresa de Iván; la Sala de Prensa no participa en este proceso.

## Editor de artículos e imágenes interiores

**El Balcón** y **Lo más reciente** comparten el mismo editor visual en PB Control. Además de la imagen principal o portada, el editor permite insertar varias imágenes dentro del cuerpo y colocarlas después del párrafo seleccionado.

- Cada imagen interior usa el cargador protegido ya existente y admite JPG, PNG o WebP de hasta 5 MB.
- El texto alternativo (ALT) es obligatorio; el pie de foto y el crédito o fuente son opcionales.
- Antes de guardar se puede subir, bajar o eliminar cada imagen desde su bloque de vista previa.
- Las imágenes y sus pies se adaptan a móvil y escritorio sin cambiar el diseño general de las publicaciones.
- El contenido se guarda como HTML sanitizado en los campos actuales; no requiere una tabla nueva ni migración.
- Las publicaciones antiguas siguen funcionando sin cambios y pueden editarse normalmente aunque no tengan imágenes interiores.

## Descubrimiento e historial de El Balcón

El Balcón conserva las publicaciones migradas desde Blogger y facilita nuevamente el acceso a las historias antiguas sin cambiar las URLs actuales.

- La primera página mantiene sus tarjetas y añade un archivo compacto con todos los demás títulos publicados.
- Las páginas 2 en adelante y las categorías usan una URL canónica propia; ya no apuntan todas a la primera página.
- Las antiguas rutas mensuales de Blogger y sus páginas de etiquetas redirigen permanentemente al archivo o categoría correspondiente en PB.
- Las 29 publicaciones originales conservan una ruta antigua única y una URL actual única.
- PB Control muestra un historial completo de todos los artículos publicados, incluso los que todavía tengan cero visitas medidas.
- Para cada artículo se presentan visitas de los últimos 30 días, acumulado desde que comenzó la medición propia y fechas de primera y última actividad.
- Las visitas anteriores a la activación del contador propio no se fabrican ni pueden deducirse del contenido migrado. Para investigar tráfico anterior debe consultarse Blogger, GA4 o Search Console mientras esos datos sigan disponibles.

## Agenda Boricua — páginas y herramientas de eventos

Cada evento aprobado dispone de una página pública dinámica con enlace permanente. No se crean archivos o copias de imágenes por evento: una sola plantilla reutiliza los datos existentes.

- Las tarjetas de Agenda, la portada y los perfiles de artesanos enlazan al evento correspondiente.
- Cada página permite compartir mediante el menú del celular, WhatsApp, Facebook o un enlace copiado.
- Los visitantes pueden descargar un calendario universal `.ics`, abrir Google Calendar y consultar la dirección en Google Maps.
- Cuando el horario solamente está disponible como texto, el calendario conserva el evento como actividad de día completo e incluye el horario anunciado en la descripción para no interpretar incorrectamente horas o zonas horarias.
- La página presenta la fuente oficial, actividades relacionadas, enlaces para continuar explorando PB y una invitación visible para publicar gratuitamente otro evento.
- Los eventos aparecen en el sitemap con sus propias URLs y datos estructurados `Event`.
- PB Control mide por evento vistas y clics en compartir, calendarios, direcciones y fuente oficial sin guardar nombres, emails, IP ni identificadores persistentes.
- Los eventos existentes funcionan con la nueva plantilla sin migración ni republicación.

## Política de artesanos y transacciones externas

Desde el **8 de septiembre de 2026**, la Feria y los perfiles se presentan de forma consistente como una plataforma de descubrimiento, promoción y conexión:

- Planeta Boricua no vende los productos de los artesanos, no procesa ni custodia pagos y no participa en sus transacciones.
- Las compras, pedidos, pagos, envíos, entregas, cambios, devoluciones y garantías se coordinan directamente entre comprador y artesano, fuera de PB.
- PB no exige una certificación gubernamental de artesano como condición general para solicitar participación y no actúa como organismo certificador.
- Cada participante conserva la responsabilidad de cumplir los registros, licencias, permisos, obligaciones contributivas y demás requisitos aplicables a su actividad.
- La aceptación de un perfil no equivale a certificación, licencia, validación legal ni garantía de una transacción futura.
- Los perfiles mantienen sus enlaces externos, identificados como formas de contactar al artesano o visitar su página, redes o tienda externa.
- Las comisiones de afiliados de otras áreas de PB son relaciones separadas y no incluyen las ventas directas de los artesanos de la Feria.

La Feria incluye una FAQ pública con estas aclaraciones; el formulario de registro enlaza los Términos de Uso, y los perfiles muestran un aviso breve de compra responsable. Esta política no crea carrito, checkout, sistema de pagos ni marketplace.

## Ideas futuras en evaluación

Estas propuestas todavía no están activas. Deben analizarse, cotizarse y probarse por separado antes de convertirlas en funciones o compromisos comerciales.

### Herramientas para artesanos · objetivo octubre de 2026

- Crear una página de herramientas prácticas para artesanos.
- Comparar sobres de envío, etiquetas, cajas y otros materiales, incluyendo productos disponibles mediante Amazon Afiliados.
- Evaluar una futura experiencia **PlanetaShip** apoyada en EasyShip o EasyPost; confirmar proveedor, costos, cobertura desde Puerto Rico y modelo de afiliación antes de implementarla.

### Contenido sobre mudanzas · noviembre-diciembre de 2026

- Crear recursos para quienes se mudan entre Puerto Rico y Estados Unidos: **¿Te mudas a PR o a USA?**
- Desarrollar después **¿Te mudaste? ¿Cómo te va? Cuenta tu historia**, con experiencias reales de personas que se mudaron durante el año.
- Evaluar un concurso independiente con premio de hasta $1,000, sujeto a conseguir primero el dinero de auspiciadores.
- Posibles auspiciadores: compañías de mudanzas y de envío de automóviles. Considerar exclusividad anual por categoría y mantener el enlace disponible durante todo el año.
- Prospecto inicial para la categoría de envío de automóviles: **Car Lover Transport**. Contacto, cobertura, propuesta económica y disponibilidad de exclusividad quedan pendientes de investigar y verificar antes de cualquier acercamiento.
- Definir presupuesto, reglas, selección de historias, derechos de publicación y promoción antes de anunciar premio o fechas.

### Publicaciones gastronómicas con cupones QR

Proyecto comercial independiente del concurso de mudanzas.

- Publicar especiales temáticos, por ejemplo **Esencia de cocina criolla**, con cinco restaurantes participantes.
- Cobrar $100 a cada restaurante por aparecer en la publicación: $500 de ingreso bruto por edición.
- Permitir que cada restaurante ofrezca una promoción a las primeras 10 personas: descuento, bebida gratis u otra oferta acordada.
- Generar hasta 10 cupones QR únicos, descargables y medibles por restaurante.
- El restaurante escanea el QR y el cupón queda marcado como usado; al agotarse los 10, la oferta se cierra.
- Considerar invertir $200 de los $500 en publicidad de la publicación, dejando un balance estimado de $300 para PB antes de otros costos.
- Identificar claramente a los restaurantes participantes y acordar por escrito oferta, restricciones, vigencia, fotos y condiciones antes de publicar.
- Si el piloto funciona, repetir el formato con otros temas gastronómicos sin mezclarlo con otros concursos o auspicios.


## Negocios por pueblo

Directorio de perfiles comerciales con categorías de visitantes, registro y edición por email, revisión en PB Control y suscripción de $9.99 USD al mes. No cambia el registro gratuito de artesanos ni procesa pedidos o pagos del negocio. Ver [configuración, controles y activación](docs/PB-NEGOCIOS-POR-PUEBLO.md). El cobro permanece deshabilitado hasta configurar y verificar Stripe en Render.

## Artesano de la Semana y guía de Arecibo

El archivo `/artesano-de-la-semana` reúne entrevistas publicadas, conservando sus enlaces. PB Control permite añadir o retirar cada historia de la sección sin eliminarla. La guía municipal y la [historia de Arecibo en El Balcón](https://www.masboricuaqueunmofongo.com/blog/arecibo-un-fin-de-semana-entre-el-faro-el-mar-y-el-autocine) son piezas complementarias. Historial de afiliados, Stripe y operación en [`docs/PB-ARTESANO-SEMANA-Y-ARECIBO.md`](docs/PB-ARTESANO-SEMANA-Y-ARECIBO.md).
