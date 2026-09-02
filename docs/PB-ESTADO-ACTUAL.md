# Estado operativo de Planeta Boricua

**Proyecto:** Planeta Boricua — Más Boricua que un Mofongo

**Dominio:** <https://www.masboricuaqueunmofongo.com>

**Responsable:** Iván Soto

**Última actualización documental:** 2 de septiembre de 2026

**Repositorio:** `ivansoto1964-svg/ivamar-web`

**Rama de producción:** `main`

Este documento es la fuente central de continuidad técnica y operativa. Debe actualizarse cuando se complete una función importante, cambie una integración o se reordenen las prioridades.

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
| Producción | Render; despliegue manual por Iván |
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
7. Iván ejecuta **Deploy latest commit** manualmente en Render.
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

La cantidad de artesanos es dinámica. Consultar PB Control antes de citar una cifra pública. El caso del email de **Jo It Savon Luxury Handmade Products** ya fue resuelto manualmente.

### Contenido y administración

- Blog oficial alojado dentro de PB.
- Archivo de 30 artículos propios observado en PB Control.
- Sección **Lo más reciente** para noticias y actualidad.
- Borradores locales con autoguardado y recuperación en los editores.
- Comentarios propios con moderación.
- Agenda Boricua.
- Sitemap dinámico; Search Console descubrió 227 páginas el 25 de agosto de 2026.
- Footer y páginas legales presentados bajo Planeta Boricua.
- Google Analytics 4 recibiendo tráfico.
- Sistema único de suscriptores con total y origen de captación en PB Control.
- Formularios contextuales de suscripción preparados para Inicio, Blog, Lo más reciente y Agenda Boricua, sin popups ni un sistema paralelo.

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

## Plan operativo hacia el lanzamiento

- **Lanzamiento inaugural:** 23 de septiembre de 2026, presentado como **la primera feria de artesanos boricuas en línea 24/7**.
- La inscripción de artesanos continúa gratis y la Feria permanecerá disponible al público después del lanzamiento.
- Preparar y enviar el aviso para revisar y mejorar perfiles en lotes de aproximadamente 50 correos, comenzando en septiembre y respetando los límites vigentes de Resend.
- Recibir de los artesanos colaboradores videos naturales trabajando y mostrando sus piezas; las confirmaciones ya comenzaron y todavía se espera el material.
- Crear con ese pietaje una promoción del lanzamiento y material de apoyo para posibles entrevistas.
- Preparar un comunicado y un paquete visual sencillo para medios de Puerto Rico; Iván coordina desde Florida y los artesanos participantes están mayormente en Puerto Rico.
- Mantener imágenes y comunicación naturales, humanas y fáciles de entender; evitar visuales de IA que puedan confundir.
- Continuar actualizando la Agenda mediante investigación de eventos gratuitos, verificación de fuente, publicación y aprobación. No publicar eventos que indiquen costo de entrada.

## Pendientes inmediatos

1. Completar y desplegar la captación contextual de suscriptores en Inicio, Blog, Lo más reciente y Agenda Boricua.
2. Enviar y comprobar la prueba de la campaña de revisión de perfiles; después enviar el primer lote de hasta 50, respetando las bajas y verificando entregas antes del siguiente lote.
3. Recibir, organizar y editar los videos de artesanos para la promoción del 23 de septiembre.
4. Crear el comunicado y paquete visual para medios del lanzamiento.
5. Revisar semanalmente la preparación para Google AdSense; ya existe una tarea programada para esa revisión.
6. Comprobar el aviso no crítico `performer` de eventos en Search Console después del periodo de procesamiento.
7. Reducir las notificaciones innecesarias de GitHub Actions sin ocultar fallos importantes.
8. Desplegar y comprobar la página donde el artesano ve su QR permanente antes de descargarlo; el archivo `.png` y su enlace corto estable no cambian.
   Los perfiles también ofrecen instalar PB en la pantalla del dispositivo sin popup; Android usa el instalador del navegador e iPhone muestra la instrucción de Safari. La app incluye un acceso rápido a **Mi perfil**.
9. Añadir edición completa para publicaciones existentes de **Lo más reciente** y corregir la palabra **Título** en el artículo de los 180,000 abonados sin cambiar su URL.
10. Continuar recogiendo videos, preparar la promoción y el comunicado de prensa para el lanzamiento del 23 de septiembre, y mantener la revisión programada de AdSense.

## Próximas fases, sin activar todavía

- Tienda PB beta con aproximadamente diez artesanos.
- Productos, fotos, precios y formas de pago.
- Evaluación futura de niveles premium; no anunciar precios ni comenzar a cobrar todavía.
- Herramientas impresas o descargables: tarjetas, stickers QR, cajas, sobres y recursos de envío.
- Sustitución gradual de afiliados generales que no producen por negocios o marcas boricuas.
- Sistema de auspiciadores de Planeta Boricua.
- Shopper Boricua.
- Mercado Boricua de múltiples vendedores a largo plazo.

La tienda no debe adelantarse a la medición, la comunicación con artesanos y la estabilidad operativa.

## Documentos relacionados

- [`PB-EDITORIAL-GUIDE.md`](PB-EDITORIAL-GUIDE.md)
- [`PB-BLOG-MIGRATION.md`](PB-BLOG-MIGRATION.md)
- [`pb-78-pueblos-prototype.md`](pb-78-pueblos-prototype.md)
- [`pb-78-pueblos-checklist.md`](pb-78-pueblos-checklist.md)

## Instrucción para continuar en un chat nuevo

Usar esta frase:

> Continúa trabajando en Planeta Boricua. Lee primero `README.md` y `docs/PB-ESTADO-ACTUAL.md`, revisa `git status` y el último commit, y dime cuál es la próxima tarea pendiente antes de cambiar código.

Las conexiones de Gmail y GitHub pertenecen a la cuenta de ChatGPT, pero este documento conserva las decisiones, prioridades y comprobaciones que no deben depender de la memoria de un chat.
