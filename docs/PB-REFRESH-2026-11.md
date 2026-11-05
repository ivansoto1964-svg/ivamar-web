# Refresh de navegación y presentación · noviembre 2026

Iván autorizó adelantar el trabajo que esperaba al 8 de noviembre y priorizar la navegación sobre nuevas campañas. El alcance incluye portada, lectura, Feria, perfiles públicos de artesanos, Agenda y Recursos.

## Implementación

- Un encabezado público y una hoja de estilos compartidos se aplican desde el mismo middleware que normaliza el pie del portal.
- Escritorio: Inicio, Historias, Artesanos, Agenda, Recursos y Más. Historias abre El Balcón; Más mantiene Lo más reciente, viajes, boletín y otros accesos existentes.
- Celular: barra inferior con Inicio, Historias, Artesanos, Agenda y Más; menú superior alternativo, foco visible, salto al contenido y Escape para cerrar.
- Portada con introducción breve, cuatro accesos claros y una composición editorial renovada.
- Feria con buscador, filtros y tarjetas conservados; perfiles con regreso a la Feria, accesos a creaciones/contacto/compartir y nuevas superficies visuales. Las imágenes siguen completas, sin recortar.
- Se conservan los datos, rutas, QR, galerías, contactos, acceso de artesanos, publicidad y contadores. No se activan tiendas, Talento, Turistiando ni food trucks.
- La rama previa `codex/pb-food-truck-landing` permanece independiente: contiene el menú/carrito piloto, no un rediseño completo ya integrado.

## Validación

- `npm test` y test nuevo de preservación de navegación, paginación, formularios y funciones del perfil.
- El test histórico de redes sociales omitía Pinterest, ya presente en producción; se actualizó su expectativa y el conteo usa NETWORKS.length.
- El servidor completo no se arrancó para validación funcional: la revisión automática bloqueó una conexión externa durante su arranque.
- Se generaron vistas HTML estáticas sin integraciones ni peticiones externas. La previsualización en el navegador remoto quedó limitada por acceso a loopback/archivos locales. Falta QA visual real en escritorio y móvil; no declarar ese control realizado.

## Publicación

El código se prepara en `codex/pb-refresh-navigation`. Producción continúa en `main` y el despliegue en Render sigue siendo manual por Iván. Revisar la vista antes de integrar; después de publicar comprobar portada, lectura, filtros, perfiles con/sin creaciones, contacto, QR y menú móvil.

La rotación y prioridades de PB Ads se revisan después del refresh. Esta entrega no las modifica.
