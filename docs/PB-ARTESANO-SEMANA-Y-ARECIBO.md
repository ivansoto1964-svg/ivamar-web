# Historias de artesanos y escapada a Arecibo · 6 noviembre 2026

## Artesano de la Semana

- Nueva sección `/artesano-de-la-semana`: archivo editorial conectado a Inicio, Feria Digital y footer.
- Reutiliza las publicaciones aprobadas de Lo más reciente, sus fechas, fotos y enlaces originales. No copia artículos, no altera perfiles ni publica entrevistas pendientes.
- El archivo histórico incluye las seis historias publicadas verificadas en el sitemap completo: I’narú Collection / Betzaida Rodríguez (19 septiembre), Joelo (26 septiembre), Stitches By Lú y Lú Designs / Lourdes Irizarry Semidey y Lourdes M. Burgos Irizarry (3 octubre), Areté Tejidos 79 / Michelle Damaris Nieves Albino (17 octubre), Luzangel Artist / María de los Ángeles (24 octubre) y Luis Carrasquillo (31 octubre). Se reutilizan sus slugs originales, fechas y fotos; no se vuelven a publicar ni se altera el archivo persistente. No depender del API limitado a las últimas diez publicaciones. La noticia sobre José “Jun” Martínez y artículos generales sobre artesanía no son entrevistas de esta serie. Una exclusión editorial explícita conserva su prioridad.
- En PB Control → Publicaciones → Lo más reciente, cada artículo publicado permite **Añadir a Artesano de la Semana** o **Retirar de Artesano de la Semana**. La retirada no borra el artículo. Acciones protegidas por la sesión y CSRF existentes, sobre el archivo persistente vigente; selección explícita y estable ante reintentos.
- No confundir este archivo de entrevistas con la propuesta anterior de un artesano destacado diario. Este cambio no implementa una selección diaria automática.
- Para el siguiente participante faltan nombre, respuestas/entrevista, fotografías autorizadas y créditos. No inventar ni comprometer una fecha sin el material.

## Arecibo

Se prepara en El Balcón un borrador con el título **Arecibo sin prisa: un fin de semana entre el faro, el mar y el autocine**. Categoría: De pueblo en pueblo. Incluye portada del faro, fotos interiores de La Poza y el autocine, SEO, fuentes y enlaces a la guía, Feria y Agenda. No publica al iniciar el servidor.

El archivo semilla entra al almacenamiento persistente mediante el inicializador existente del blog únicamente si aún no existe ese slug; no reemplaza ediciones de Iván. Publicar desde PB Control después del deploy manual. No programar una publicación automática ni atribuir experiencias personales inventadas.

## Afiliados

- Trip.com: enlace específico de Arecibo, destino 4382, con los identificadores PB existentes `SID=2209817`, `allianceid=1094387`, `utm_campaign=520530`. Destino verificado: `https://us.trip.com/hotels/arecibo-hotels-list-4382/`. No se realizó una reserva ni se comprobó una comisión de venta.
- Se añade un bloque visible de hospedaje y aviso de afiliados en la guía. Enlaces externos `sponsored noopener noreferrer`.
- GetYourGuide: cuenta asociada al Gmail PB identificada mediante sus emails de bienvenida/estadísticas. El panel del navegador no tiene sesión iniciada. FALTA obtener un enlace de afiliado generado por la cuenta.
- `PB_ARECIBO_GETYOURGUIDE_URL` admite un enlace HTTPS de GetYourGuide con `partner_id` o un enlace corto oficial `gyg.me`. Debe ser una selección pertinente a la zona, verificada antes de configurar. Sin valor válido, el botón no se muestra; nunca se fabrica un identificador ni se sustituye por un enlace sin atribución.
- No se verificó una entrada al parque del faro disponible en GetYourGuide. No presentar excursiones distintas como entradas al parque.

## Stripe y Render

La tarifa y el portal están creados (ver `PB-NEGOCIOS-POR-PUEBLO.md`). El 6 de noviembre se creó el webhook `we_1UYsRTDjCGKYfj5TbIYy1FxW` (API 2026-09-30.endive), con los 12 eventos del directorio. Permanece **desactivado** hasta completar la clave del servidor y las pruebas. La firma se transfirió directamente a Render, sin incluirla en Git ni en documentación. No hay cobros de clientes creados durante esta tarea.

Render conectado y servicio confirmado: `ivamar-web`, `srv-d6f2ahn5r7bs738fuhlg`, workspace `tea-d5609km3jp1c73a4ulh0`, repo correcto, rama main, una instancia y disco `/data`. Se guardaron por merge (sin sustituir otras variables) la tarifa, portal, cuenta, firma del webhook y `PB_BUSINESS_BILLING_ENABLED=false`.

La herramienta de actualización de variables **disparó automáticamente** el deploy `dep-dbn29sjncjis73dv66lg`, commit `c6d54d04ecd6c392077e7d662d1fcbc667f98aa4`. No volver a lanzar ese deploy manualmente. Para próximas modificaciones de variables, advertir que este método de Render despliega automáticamente; el flujo manual habitual del repositorio se conserva para cambios de código.

El conector de Render no expone lectura de variables existentes. No se pudo comprobar ni instalar una clave `PB_BUSINESS_STRIPE_KEY`/`STRIPE_SECRET_KEY` mediante los conectores disponibles. Falta configurar o verificar una clave restringida de Stripe en el servidor, validar permisos y entorno de pruebas, resolver tratamiento fiscal y entonces habilitar el webhook y los cobros. No afirmar que Stripe está operativo solo por tener precio, portal y firma configurados.

GetYourGuide: se intentó el acceso mediante el formulario seguro del navegador; el proveedor devolvió **Invalid email or password**. No se inició sesión ni se obtuvo un identificador de afiliado. No repetir credenciales automáticamente ni cambiar la contraseña.

## Validación y despliegue

`npm test` incluye pruebas del archivo editorial, selección/retirada explícita, proyección pública sin datos privados, escape de contenido, enlaces de afiliación y estado borrador. La previsualización local no pudo completarse. Después del deploy automático de configuración, Render confirmó estado **live** el 6 de noviembre a las 19:06:17 UTC. Se verificaron en el navegador de producción la nueva sección con la foto e historia de Luis y el bloque de afiliados Trip.com en Arecibo. La publicación de Arecibo sigue siendo un borrador; no se hizo pública ni se envió por email.
