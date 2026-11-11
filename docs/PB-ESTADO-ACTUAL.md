# Estado operativo de Planeta Boricua

**Proyecto:** Planeta Boricua — Más Boricua que un Mofongo

**Dominio:** <https://www.masboricuaqueunmofongo.com>

**Responsable:** Iván Soto

**Última actualización documental:** 11 de noviembre de 2026

**Repositorio:** `ivansoto1964-svg/ivamar-web`

**Rama de producción:** `main`

Consulta primero el [resumen vigente del README](../README.md#estado-de-la-plataforma--11-de-noviembre-de-2026). Este documento conserva el contexto técnico y el historial operativo. Las fechas y pendientes de cada fase describen el momento en que se registraron.

## Decisión principal

Planeta Boricua es el único proyecto activo de este repositorio.

- Ivamar AI fue descartado como proyecto comercial.
- Nayeli y los asistentes digitales anteriores fueron retirados.
- Caribex dejó de ser una línea activa de trabajo.
- El nombre histórico `ivamar-web` puede permanecer temporalmente en el repositorio y en rutas internas.
- No eliminar código, rutas, dependencias ni datos históricos solamente por contener `ivamar`, `nayeli` o `caribex`. Primero se debe comprobar que la eliminación no afecte Planeta Boricua, Render, imágenes, redirecciones o datos persistentes.

## Infraestructura vigente

| Componente | Estado |
|---|---|
| Dominio público | `masboricuaqueunmofongo.com` |
| Repositorio | GitHub: `ivansoto1964-svg/ivamar-web` |
| Producción | Render, servicio `ivamar-web` con despliegue manual y disco persistente en `/data` |
| Servidor | Node.js + Express |
| Imágenes | Cloudinary y recursos locales según la sección |
| Email transaccional | Resend |
| Dominio de envío | `masboricuaqueunmofongo.com`, verificado |
| Remitente operativo | `notificaciones@masboricuaqueunmofongo.com` |
| Respuestas | `masboricuaqueunmofongo@gmail.com` |
| Gmail conectado a ChatGPT | `masboricuaqueunmofongo@gmail.com` |
| Google Analytics 4 | `G-VDDWTHQNC6` |
| Search Console | Sitemap `/sitemap.xml` enviado correctamente |
| Administración | PB Control con acceso privado |

Nunca guardar contraseñas, claves API, códigos de acceso ni secretos en este documento o en GitHub.

## Forma de trabajo acordada

1. Inspeccionar el código y el estado de Git antes de modificar.
2. Preservar cambios existentes que no pertenecen a la tarea.
3. Hacer cambios pequeños y verificables.
4. Ejecutar `npm test` antes de subir código.
5. Revisar el diff y confirmar que no incluya secretos ni archivos de datos accidentales.
6. Subir el cambio a GitHub solamente cuando esté verificado.
7. Para cambios funcionales, ejecutar **Deploy latest commit** manualmente en el servicio de producción cuando corresponda.
8. Después del deploy, verificar en producción la función afectada.
9. No declarar una tarea terminada solo porque compiló; debe comprobarse el resultado público o privado correspondiente.

Si un deploy falla, no improvisar sobre producción. Identificar el archivo y el commit problemático, corregir desde la última versión sana y volver a ejecutar las verificaciones.

## Funciones confirmadas

### Feria Digital de Artesanías

- Registro gratuito de artesanos.
- Protección contra registros duplicados.
- Campos separados para **nombre del negocio o taller** y **nombre del artesano o artesana**.
- Carga y recuperación de logo y foto principal.
- Corrección de validación de emails en iPhone.
- Confirmación confiable después de enviar el registro.
- Aprobación y administración desde PB Control.
- Perfil público individual y enlace compartible.
- Acceso seguro del artesano mediante email.
- Edición del propio perfil.
- Copia de seguridad antes de guardar cambios.
- Confirmación visible de guardado y email de confirmación.
- Buscador con equivalencias como gorros/sombreros, tenis/zapatos y crochet/tejido.
- Conteo propio de vistas por perfil y clics en enlaces.
- Panel de rendimiento dentro de PB Control.
- Auditoría privada de emails.
- Consolidación segura de cuatro grupos de perfiles duplicados.
- Opción para dejar de recibir comunicaciones.
- Aviso discreto de compra responsable en cada perfil: PB conecta al visitante con el artesano, pero no procesa pagos ni participa en la transacción.
- FAQ pública que aclara que no se exige certificación gubernamental como condición general, que las compras se realizan fuera de PB y que PB no recibe comisiones sobre esas ventas directas.
- Formulario y Términos actualizados para distinguir participación de certificación, licencia o validación legal.
- Enlaces comerciales externos rotulados como contacto, página, red social o tienda externa; no se presenta a PB como lugar de compra.

La cantidad de artesanos es dinámica. Consultar PB Control antes de citar una cifra pública. El caso del email de **Jo It Savon Luxury Handmade Products** ya fue resuelto manualmente.

### Contenido y administración

- Blog oficial alojado dentro de PB.
- Archivo editorial con un conteo dinámico de artículos en PB Control.
- El índice de El Balcón mantiene las tarjetas principales y expone los demás títulos en un archivo compacto, para que todas las historias tengan un enlace directo desde la primera página.
- Las páginas paginadas y categorías tienen canonical propio; las rutas mensuales y de etiquetas heredadas de Blogger redirigen hacia El Balcón en lugar de responder 404.
- PB Control presenta el historial completo de cada artículo publicado: total medido, últimos 30 días, primera actividad y última actividad. También incluye artículos con cero visitas para que ninguno quede invisible en el informe.
- La medición histórica comienza con el contador propio de PB. No se atribuyen a los artículos visitas anteriores que Blogger, GA4 o Search Console no hayan aportado.
- Sección **Lo más reciente** para noticias y actualidad.
- Editor visual compartido por **El Balcón** y **Lo más reciente**, con imágenes múltiples dentro del cuerpo, ALT obligatorio, pie/crédito opcional y controles para reordenar o eliminar antes de guardar.
- Las imágenes interiores reutilizan la carga protegida existente, se muestran responsive y conservan la imagen principal como un campo independiente; no hubo migración ni cambios a publicaciones anteriores.
- Borradores locales con autoguardado y recuperación en los editores.
- Comentarios propios con moderación.
- Agenda Boricua.
- Páginas dinámicas individuales para cada evento de Agenda Boricua, con URL permanente, compartir desde el celular, WhatsApp, Facebook, copia de enlace, calendario universal, Google Calendar y direcciones.
- Las páginas de eventos reutilizan los registros existentes, muestran contenido relacionado de PB y ofrecen el botón **Publica un evento gratis**. No cargan redes publicitarias externas.
- Los clics de compartir, calendario, direcciones y fuente oficial se resumen por evento en PB Control sin recopilar datos personales.
- Sitemap dinámico; Search Console descubrió 227 páginas el 25 de agosto de 2026.
- Footer y páginas legales presentados bajo Planeta Boricua.
- Google Analytics 4 recibiendo tráfico.
- Sistema único de suscriptores con total y origen de captación en PB Control.
- Formularios contextuales de suscripción preparados para Inicio, Blog, Lo más reciente y Agenda Boricua, sin popups ni un sistema paralelo.
- Sala de Prensa PB integrada administrativamente dentro de Comunicaciones: contactos verificados, filtros, comunicados, asociaciones y seguimiento manual.
- La Sala de Prensa privada usa almacenamiento separado con respaldos. En `/sala-de-prensa` se publica únicamente material aprobado.
- La recopilación inicial de contactos se cerró el 7 de septiembre de 2026 mediante un Paquete Maestro. PB Control puede analizarlo sin escribir, consolidarlo de forma idempotente y mostrar el Resumen de Control.
- Las organizaciones, festivales, instituciones culturales, amplificadores y servicios de distribución se conservan en categorías separadas de prensa para uso futuro; no existe todavía un directorio público.
- La lista **LISTOS PARA ENVÍO — FERIA DIGITAL DE ARTESANOS** exige email, estado Activo y prioridad A+ o A. Los contactos nuevos no se consideran verificados automáticamente.
- El editor de comunicados tiene autoguardado local, permite reabrir borradores y propone la campaña de la Feria y el 23 de septiembre de 2026 al crear el primero. Esto no publica ni envía el comunicado.
- Los identificadores vacíos de organizaciones y eventos procedentes de la primera consolidación se reparan automáticamente en la próxima escritura segura del archivo.

### Email

- Resend usa el dominio verificado de Planeta Boricua.
- Los mensajes de prueba salen como Planeta Boricua y permiten responder al Gmail oficial.
- Los emails para artesanos incluyen mecanismo para no recibir más comunicaciones.
- PB Control envía la campaña de revisión de perfiles en lotes de hasta 50, registra las entregas por campaña y evita repetir destinatarios en lotes posteriores.
- La campaña oficial comenzó el 1 de septiembre de 2026: el primer lote produjo 49 entregas y un rebote (`velarecolectionpr@outlook.com`); el segundo lote de 50 se envió el 2 de septiembre. No corresponde enviar otro lote el mismo día.
- ChatGPT puede leer el Gmail oficial, clasificar solicitudes y preparar respuestas.
- Ningún email se envía desde ChatGPT sin autorización expresa de Iván.

## Comprobaciones recientes

- El caso de **Crochet by Sany** confirmó y ayudó a corregir la validación de email en iPhone.
- El perfil separa el negocio **Crochet by Sany** de la artesana **Sanyra Concepción Anguita**.
- Search Console reconoce `/agenda-boricua` como indexada. Las validaciones de `validFrom` y URL en ofertas/organizador pasaron.
- Queda como aviso no crítico el campo recomendado `performer` en algunos eventos.
- Se añadieron recomendaciones de datos estructurados para `validFrom` y URL en ofertas/organizador.
- La validación de Google puede tardar entre varios días y semanas; no repetir cambios mientras Google procesa una versión ya corregida.
- El commit funcional de referencia antes de añadir esta documentación es `65da45f` (`Repair server and separate artisan names`). Los commits posteriores que solo modifican documentos no requieren deploy ni cambian el funcionamiento público.

## Plan operativo original hacia el lanzamiento · septiembre de 2026

- **Lanzamiento inaugural:** 23 de septiembre de 2026, presentado como **la primera feria de artesanos boricuas en línea 24/7**.
- La inscripción de artesanos continúa gratis y la Feria permanecerá disponible al público después del lanzamiento.
- Preparar y enviar el aviso para revisar y mejorar perfiles en lotes de aproximadamente 50 correos, comenzando en septiembre y respetando los límites vigentes de Resend.
- Recibir de los artesanos colaboradores videos naturales trabajando y mostrando sus piezas; las confirmaciones ya comenzaron y todavía se espera el material.
- Crear con ese pietaje una promoción del lanzamiento y material de apoyo para posibles entrevistas.
- Desarrollar el borrador del comunicado y un paquete visual sencillo para medios de Puerto Rico; esta preparación quedó autorizada el 7 de septiembre de 2026, pero su distribución todavía requiere autorización expresa. Iván coordina desde Florida y los artesanos participantes están mayormente en Puerto Rico.
- Mantener imágenes y comunicación naturales, humanas y fáciles de entender; evitar visuales de IA que puedan confundir.
- Continuar actualizando la Agenda mediante investigación de eventos gratuitos, verificación de fuente, publicación y aprobación. No publicar eventos que indiquen costo de entrada.

## Pendientes registrados antes del lanzamiento · septiembre de 2026

1. Completar y desplegar la captación contextual de suscriptores en Inicio, Blog, Lo más reciente y Agenda Boricua.
2. Enviar y comprobar la prueba de la campaña de revisión de perfiles; después enviar el primer lote de hasta 50, respetando las bajas y verificando entregas antes del siguiente lote.
3. Recibir, organizar y editar los videos de artesanos para la promoción del 23 de septiembre.
4. Crear el comunicado y paquete visual para medios del lanzamiento.
5. Revisar el rendimiento y el inventario de PB Ads antes de activar campañas comerciales.
6. Comprobar el aviso no crítico `performer` de eventos en Search Console después del periodo de procesamiento.
7. Reducir las notificaciones innecesarias de GitHub Actions sin ocultar fallos importantes.
8. Desplegar y comprobar la página donde el artesano ve su QR permanente antes de descargarlo; el archivo `.png` y su enlace corto estable no cambian.
   Los perfiles también ofrecen instalar PB en la pantalla del dispositivo sin popup; Android usa el instalador del navegador e iPhone muestra la instrucción de Safari. La app incluye un acceso rápido a **Mi perfil**.
9. Añadir edición completa para publicaciones existentes de **Lo más reciente** y corregir la palabra **Título** en el artículo de los 180,000 abonados sin cambiar su URL.
10. Continuar la optimización post-lanzamiento y validar PB Ads antes de activar campañas comerciales.

## Próximas fases, sin activar todavía

- La idea anterior de una tienda o mercado de múltiples vendedores con artesanos queda archivada y no forma parte del modelo vigente. Reactivarla requeriría una decisión expresa, revisión legal y una arquitectura separada; PB actualmente no es marketplace ni procesa pagos.
- Evaluación futura de niveles promocionales premium; no anunciar precios ni comenzar a cobrar todavía.
- Herramientas impresas o descargables: tarjetas, stickers QR, cajas, sobres y recursos de envío.
- Sustitución gradual de afiliados generales que no producen por negocios o marcas boricuas.
- Sistema de auspiciadores de Planeta Boricua.
- Shopper Boricua.

Ninguna fase futura debe presentar a PB como vendedor, intermediario comercial o procesador de las transacciones de los artesanos sin una nueva autorización y revisión específica.

## Documentos relacionados

- [`PB-EDITORIAL-GUIDE.md`](PB-EDITORIAL-GUIDE.md)
- [`PB-BLOG-MIGRATION.md`](PB-BLOG-MIGRATION.md)
- [`pb-78-pueblos-prototype.md`](pb-78-pueblos-prototype.md)
- [`pb-78-pueblos-checklist.md`](pb-78-pueblos-checklist.md)

## Portada, radio y publicidad · 11 de noviembre de 2026

- La portada toma la historia principal de **Lo más reciente**. Los demás titulares muestran una miniatura cuando la publicación tiene imagen. La guía de Arecibo también tiene [una historia publicada en El Balcón](https://www.masboricuaqueunmofongo.com/blog/arecibo-un-fin-de-semana-entre-el-faro-el-mar-y-el-autocine).
- **Radio PB** está desplegada en el servicio existente. Se verificaron `/radio`, la API pública de programación y el acceso protegido al editor. La parrilla está vacía hasta activar programas con fuente autorizada. Ver [operación de Radio PB](../README.md#cómo-se-opera-radio-pb).
- **PB Ads** rota campañas y registra impresiones visibles y clics. Las cuatro campañas de Expedia y las dos de Trip.com cuentan con nuevas imágenes, verificadas en el panel y en muestras de páginas públicas.
- La activación del cobro del **directorio de negocios por pueblo** continúa pendiente según el registro de configuración. Consultar [la guía de Stripe](PB-NEGOCIOS-POR-PUEBLO.md) antes de cambiar ese estado.

## Instrucción para continuar en un chat nuevo

Usar esta frase:

> Continúa trabajando en Planeta Boricua. Lee primero `README.md` y `docs/PB-ESTADO-ACTUAL.md`, revisa `git status` y el último commit, y dime cuál es la próxima tarea pendiente antes de cambiar código.

Las conexiones de Gmail y GitHub pertenecen a la cuenta de ChatGPT, pero este documento conserva las decisiones, prioridades y comprobaciones que no deben depender de la memoria de un chat.

## Organización de portada y navegación · 5 nov 2026

Se mantiene la imagen actual de PB. La portada reúne historia principal y novedades, muestra hasta cuatro creaciones reales de artesanos aprobados, tres próximos eventos, tres historias y accesos a recursos. Se eliminan invitaciones artesanales repetidas; viajes queda en un desplegable con sus enlaces actuales. El menú público se comparte entre secciones sin cambiar el diseño interior ni las funciones de perfiles. Detalles y verificación en `PB-REFRESH-2026-11.md`. El despliegue continúa siendo manual por Iván en Render; la preparación del código no implica publicación.


## Guía de Arecibo · 6 de noviembre de 2026

- `/pueblos/arecibo/` conserva historia, relatos comunitarios y formulario existentes, y añade portada fotográfica, navegación por secciones y guía de viernes a domingo.
- Integra faro, Poza del Obispo, casco urbano y Auto Cine Santana con fotos suministradas por Iván, optimizadas a WebP, ALT y pies descriptivos. No se atribuye autoría no confirmada.
- La entrada del autocine muestra carteles antiguos; se aclara expresamente que no son la cartelera actual.
- Foto `arecibo-rio.jpg` reservada hasta identificar el sitio; originales conservados por Iván.
- No se destaca un hotel ni se anuncia una reserva, precio o descuento acordado. El widget de hospedaje y los enlaces afiliados de actividades siguen pendientes de recibir y validar; no se inventan identificadores.
- Accesos a la Feria y Agenda llevan a sus secciones generales, sin afirmar que ya filtran Arecibo automáticamente.
- El índice de pueblos enlaza la guía; el acceso antiguo `?pueblo=arecibo` conduce a la misma página.
- Cambios limitados a Arecibo y su enlace en el índice; otros municipios conservan su página actual. Deploy manual de Iván en Render.


## Directorio comercial por pueblo · 6 de noviembre de 2026

Implementado un directorio separado de Artesanos: $9.99 USD mensuales por perfil comercial, categorías para visitantes, fotos, redes, menú/reservas externos, acceso por email y revisión en `/pb-control/negocios`. Los 78 municipios pueden enlazar el registro y sus categorías. Detalles en `PB-NEGOCIOS-POR-PUEBLO.md`.

La publicación requiere email confirmado, aprobación y periodo pagado validado por webhooks de Stripe. El desarrollo no crea suscripciones de clientes ni cargos. La conexión del plugin de Stripe no configura por sí misma las claves ni la firma de webhooks de Render: mantener `PB_BUSINESS_BILLING_ENABLED` sin activar hasta completar y verificar esa configuración. El deploy de código continúa siendo manual por Iván. Artesanos, sus perfiles, datos y transacciones quedan separados.

## Artesano de la Semana y promoción de Arecibo · 6 noviembre 2026

Archivo editorial `/artesano-de-la-semana`, conectado con Feria, Inicio y footer; conserva las entrevistas y sus enlaces originales. Selección manual desde las publicaciones aprobadas en PB Control. Se incluyen las seis historias existentes: I’narú Collection, Joelo, Stitches By Lú y Lú Designs, Areté Tejidos 79, Luzangel Artist y Luis Carrasquillo. Falta el material del próximo artesano. No es un carrusel de selección diaria.

Artículo de Arecibo preparado como borrador en El Balcón, sin publicación automática. Se incorpora un enlace Trip.com específico del destino con los identificadores PB. GetYourGuide espera un enlace auténtico generado por la cuenta. Stripe aún no está activo: tarifa y portal creados, webhook creado y desactivado; firma y referencias guardadas en Render, cobros desactivados. Falta verificar o instalar la clave del servidor, tratamiento fiscal y pruebas. Render está conectado; su actualización de variables disparó automáticamente el deploy del commit c6d54d0. No pedir reconexión ni repetir ese deploy. Detalles operativos y límites en `PB-ARTESANO-SEMANA-Y-ARECIBO.md`.

## Artesano de la Semana en portada · 6 noviembre 2026

Bloque propio inmediatamente antes de Creaciones de nuestra gente. Muestra una sola entrevista: la más reciente seleccionada del archivo editorial, con foto real existente, nombre/proyecto verificados, resumen, enlace a la entrevista y acceso a todas las historias. Se actualiza al publicar y seleccionar una nueva entrevista; no rota por día ni inventa un artesano para una semana sin material. Si no hay entrevistas seleccionadas se oculta; no modifica perfiles ni publicaciones. El cambio de código requiere el deploy manual habitual de Iván.

## Acceso a Nuestros pueblos · 6 noviembre 2026

Se añade **Nuestros pueblos** (`/pueblos`) al menú principal compartido y al menú móvil; antes solo estaba en el footer. Se conserva el acceso del footer y el índice existente de los 78 municipios, desde el cual se llega a Arecibo. Cambio de código preparado para el deploy manual de Iván.

## Tablillas en Nuestros pueblos · 6 noviembre 2026

El índice conserva sus 78 municipios y rutas, buscador y filtro de zona. Las tarjetas se presentan como tablillas originales de PB inspiradas en Puerto Rico: fondo claro, doble borde, nombre grande adaptable, garita tenue, banderas y lema Isla del Encanto. SVG decorativo compartido y texto vectorial accesible; no son 78 imágenes ni se reutiliza el bundle comercial de referencia. La región y estado de la guía se mantienen debajo. Búsqueda admite nombres sin acentos. Respeta reducción de movimiento y teclado. Cambio preparado para deploy manual.

Verificación: `npm test` pasó; prueba específica ejecuta el render de los 78 pueblos, enlaces canónicos, nombres accesibles, búsqueda sin acentos, filtro de islas y estado sin resultados. La previsualización local no estuvo disponible en el navegador; comprobar el diseño en producción después del deploy.

## Iconos del menú · 6 noviembre 2026

Iconos SVG originales de trazo uniforme junto a los nombres visibles del menú compartido, en computadora y celular: casa, balcón, manos artesanas, calendario, tablilla y carpeta; maleta para viajes y manos/estrella para Artesano de la Semana dentro de Más. Noticias, boletín, información, publicidad, contacto y perfil también tienen símbolos coherentes. Se añade al desplegable el acceso al archivo de entrevistas. Los SVG son decorativos, no alteran los nombres accesibles y no requieren fuentes ni imágenes externas. Los enlaces principales presentan icono arriba y nombre debajo; desplegables y menú móvil, icono a la izquierda. Se conserva teclado, menú nativo y ruta activa. Deploy manual habitual.


## Foto de portada en borradores de Lo más reciente · 7 noviembre 2026

El guardado sincronizado ahora sube la foto de portada seleccionada antes de guardar el borrador y conserva su enlace permanente. Antes, el selector solo mostraba la foto localmente y la subida ocurría al publicar, por lo que Guardar borrador retenía el enlace anterior. Se reutiliza el cargador protegido existente (JPG/PNG/WebP, 5 MB). Un fallo conserva la portada anterior y el texto local, muestra el error y permite reintentar. Guardados simultáneos comparten la subida; una subida que termina después de cambiar de artículo no modifica el otro borrador. No publica automáticamente ni modifica entrevistas existentes. Deploy manual de Iván; verificar guardar, recargar y recuperar la nueva portada después del deploy.
