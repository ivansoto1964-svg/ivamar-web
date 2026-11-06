# Historias de artesanos y escapada a Arecibo · 6 noviembre 2026

## Artesano de la Semana

- Nueva sección `/artesano-de-la-semana`: archivo editorial conectado a Inicio, Feria Digital y footer.
- Reutiliza las publicaciones aprobadas de Lo más reciente, sus fechas, fotos y enlaces originales. No copia artículos, no altera perfiles ni publica entrevistas pendientes.
- Luis Carrasquillo se incorpora por su slug existente como historia del archivo. No se presenta como una nueva entrevista para el 7 de noviembre.
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

La tarifa y el portal están creados (ver `PB-NEGOCIOS-POR-PUEBLO.md`). El 6 de noviembre el listado real de webhooks de Stripe está vacío. No hay cobros de clientes creados durante esta tarea.

Render fue conectado por Iván el 6 de noviembre, pero la sesión aún no expone herramientas operativas de Render para leer servicios o editar variables. No pedir que conecte de nuevo ni afirmar que se instaló una clave en el servidor. Al reanudar, descubrir sus herramientas y completar la conexión segura del servidor y el webhook, con el plan fiscal y pruebas separados antes de habilitar cobros. Mantener `PB_BUSINESS_BILLING_ENABLED` desactivado hasta validar.

## Validación y despliegue

`npm test` incluye pruebas del archivo editorial, selección/retirada explícita, proyección pública sin datos privados, escape de contenido, enlaces de afiliación y estado borrador. El deploy sigue siendo manual por Iván. La prueba de interfaz local no pudo completarse porque la superficie de navegador no accede al servidor local; no presentar esa vista como verificada en navegador.
