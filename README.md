# Planeta Boricua

Repositorio principal de **Planeta Boricua — Más Boricua que un Mofongo**.

- Sitio público: <https://www.masboricuaqueunmofongo.com>
- Producción: Render
- Código fuente: GitHub, rama `main`
- Administración privada: PB Control
- Responsable: Iván Soto

Aunque el repositorio conserva el nombre técnico histórico `ivamar-web`, el proyecto activo es exclusivamente **Planeta Boricua**. Ivamar AI, Nayeli y los asistentes anteriores están retirados y no forman parte de la dirección actual del producto.

## Continuidad del proyecto

Antes de trabajar en una sesión o chat nuevo, leer:

1. [`docs/PB-ESTADO-ACTUAL.md`](docs/PB-ESTADO-ACTUAL.md) — estado operativo, decisiones, tareas y reglas de despliegue.
2. [`docs/PB-EDITORIAL-GUIDE.md`](docs/PB-EDITORIAL-GUIDE.md) — voz y método editorial.
3. [`docs/PB-BLOG-MIGRATION.md`](docs/PB-BLOG-MIGRATION.md) — migración del blog y verificaciones relacionadas.

Los documentos de prototipo de los 78 pueblos permanecen en `docs/` como referencia de esa fase.

## Verificación mínima

```bash
npm test
```

El despliegue de producción lo inicia manualmente Iván desde Render. Un cambio subido a GitHub no debe considerarse publicado hasta que Render termine y se verifique la página afectada.

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
- No construir todavía la Sala de Prensa pública.
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

### Fase pública futura

La arquitectura administrativa podrá conectarse posteriormente a una página pública con Media Kit, información y datos rápidos de PB, comunicados autorizados, logos, fotografías, Feria Digital, contacto de prensa y archivo de cobertura. Esa página pública **no debe construirse ni publicar datos internos sin una instrucción nueva y autorización expresa**.

## Operación inmediata de emails · septiembre de 2026

- Asunto vigente: **🇵🇷 Bienvenido oficialmente a la Feria Digital de Artesanos Boricuas**.
- Lotes enviados: 50 el 1 de septiembre, 50 el 2 de septiembre y un tercer lote el 3 de septiembre.
- Resultado conocido del primer lote: 49 entregados y un rebote, `velarecolectionpr@outlook.com`.
- Antes del próximo envío, hacer el lunes el inventario completo de destinatarios únicos, entregados, rebotados, quejas y pendientes.
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
