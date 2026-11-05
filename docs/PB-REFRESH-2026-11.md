# Organización de PB · 5 de noviembre de 2026

## Dirección aprobada

Conservar la imagen actual (logo, blanco, rojo, azul y tipografías). Portada editorial compacta, con una feria integrada para descubrir creaciones. El alcance implementado es navegación compartida y organización de la portada; las páginas interiores conservan su diseño y funciones.

## Cambios

- Menú consistente: Inicio, El Balcón, Artesanos, Agenda, Recursos y Más. Desplegable nativo en celular, cierre con Escape o al seleccionar un enlace y salto al contenido.
- Apertura: una historia de El Balcón y tres novedades de Lo más reciente. Las fuentes cargan por separado y ninguna sustituye a la otra.
- Feria: hasta cuatro creaciones de distintos artesanos aprobados, con título, autor y ubicación; selección diaria estable. Solo se toman creaciones con imagen segura, título y descripción existentes. Los enlaces llevan a la galería pública. No se publican registros, emails ni campos privados. Si faltan creaciones se ofrece un enlace a la feria.
- Se conserva una sola invitación al registro artesanal.
- Agenda: hasta tres próximos eventos; después tres historias del Balcón y tres accesos a guías.
- Viajes conserva sus ocho enlaces afiliados dentro de un desplegable compacto; boletín y aplicación siguen disponibles al final.
- Se conservan los espacios actuales de publicidad, sin cambiar campañas o rotación.
- Los artículos ya incluyen lecturas y recomendaciones de otras secciones; se conserva ese mecanismo.

No hay migraciones, nuevas dependencias, escrituras de datos, cambios en QR, contactos, galerías, administración, pagos o envíos. No se activan tiendas ni secciones pendientes.

## Verificación y publicación

- `npm test` completo y prueba de hidratación independiente de los feeds, orden de secciones, selección de creaciones, escape de texto y ausencia de campos privados.
- Navegación compartida verificada contra formularios, paginación y funciones del perfil.
- QA visual: portada en laptop y vista de 390 píxeles mediante iframe; menú móvil abre y cierra con Escape. La muestra estática usa dos galerías públicas verificadas; producción selecciona hasta cuatro del conjunto aprobado.
- Vista estática aislada con contenido público real para QA mediante el servicio oficial de previsualización. No se inicia el servidor completo ni sus integraciones externas.
- Producción se despliega manualmente en Render por Iván. Tras el despliegue comprobar portada, selección de creaciones, menú, páginas interiores y ausencia de errores públicos.
