# Comparación funcional: VerCatálogo y catálogo PB

Revisión pública: 19 de octubre de 2026. Fuente principal: https://vercatalogo.com/ . Documentación de carga masiva: https://sites.google.com/vercatalogo.com/help/ . Las funciones del proveedor son afirmaciones publicadas; no se accedió a su panel ni se probaron sus cobros. No se usa su código, identidad visual ni infraestructura.

## Resultado de la adaptación

| Función anunciada por VerCatálogo | Estado en la rama PB | Alcance o diferencia |
| --- | --- | --- |
| Registro y administración sin programar | Reutilizado | Acceso actual por enlace seguro; panel privado nuevo. |
| Fotos, descripción, precio y disponibilidad | Implementado | Precio en centavos USD; consulta sin precio opcional. |
| Hasta 20 fotos por producto | Varias fotos implementadas, capacidad diferente | PB conserva 1 foto/producto en Catálogo y 4 en Plus. No se elevó automáticamente a 20 por el impacto en almacenamiento y carga de trabajo. |
| Carrito y resumen por WhatsApp | Añadido | Selección en memoria, cantidades, opciones y cálculo en servidor. Mensaje que el comprador decide enviar; no pago, reserva ni confirmación de recepción. |
| Pedidos por correo | Pendiente | No se expone el email privado de acceso ni se envían correos automáticamente. Requiere un contacto comercial elegido por el artesano y flujo de entrega probado. |
| Control de pedidos | Añadido, manual en Plus | Referencia, resumen, importe opcional, estado y pago declarado por el artesano. No verifica el procesador; máximo 200 registros por cuenta. |
| Inventario | Añadido, manual | Cantidad por producto, incluido cero. Valida la suma del mismo producto en distintas opciones. Una consulta no descuenta inventario; el artesano actualiza tras vender. No stock por variante. |
| Tallas, colores y presentaciones | Añadido | Hasta 2 grupos de 10 opciones. Precio y stock compartidos por producto; diferencias de precio por variante pendientes. |
| Categorías y subcategorías | Añadido en Plus | Agrupación por categoría y etiqueta de subcategoría; búsqueda por texto y categoría. |
| Precios al mayor y detal | Añadido en Plus | Un mínimo y un precio unitario reducido por producto. El mínimo suma variantes del mismo producto; el cobro externo se confirma por separado. |
| Cupones | Añadido en Plus | Un cupón activo por catálogo, porcentaje 1–50, mínimo y vencimiento. Descuento sobre mercancía, después del precio por cantidad; no sobre envío. Es estimado en la consulta, no se aplica automáticamente en Stripe/PayPal. |
| Métodos de envío | Añadido | Hasta 6 métodos con tarifa fija estimada, recogido gratuito o precio por confirmar. Sin cotizador de transportistas, etiquetas, direcciones ni cálculo fiscal. |
| Colores y presentación | Añadido | Cuatro paletas controladas; presentación, plazo de preparación y textos de entrega/devoluciones. No HTML o scripts del artesano. |
| Estadísticas | Añadido en Plus | Vistas, clics de pago, clics de WhatsApp y consultas preparadas, agrupados por día y hasta 90 días naturales. No usuarios únicos ni ventas. Sin identificadores persistentes ni datos personales guardados en las métricas. |
| Carga desde Google Sheets | Alternativa CSV añadida en Plus | Pegar CSV exportado por Sheets/Excel/Numbers, revisar y confirmar. Solo añade borradores; códigos duplicados o filas inválidas cancelan toda la operación. No sincronización con Google. |
| Exportación y salida de la plataforma | Añadido | CSV resumido para productos y JSON completo de productos, configuración y registros manuales. Disponible al propietario aunque se cancele el plan. |
| Stripe, PayPal y MercadoPago integrados | Adaptado al modelo PB | Enlaces HTTPS al cobro independiente del artesano. PB no recibe dinero de ventas, no guarda claves del artesano y no confirma transacciones. |
| IA para descripciones y atención | Pendiente | Conectar Nayeli después de definir cuotas, costos, permisos y consentimiento; sin activar antes de la revisión del 8 de noviembre. |
| Reseñas/calificaciones | Pendiente | Requiere moderación, respuesta, reporte y medidas contra reseñas falsas; no se muestran reseñas inventadas. |
| Red de revendedores | Fuera de esta etapa | Clonar un inventario matriz para terceros es otro modelo. No es necesario para catálogos de artesanos independientes. |
| Dominio propio | Pendiente | Requiere DNS, certificados y prueba de propiedad. Inicialmente la URL pertenece a PB. |
| API para terceros | Pendiente | Las rutas internas no equivalen a una API pública. Falta autenticación específica, cuotas y contrato de compatibilidad. |
| Google Analytics y Meta Pixel por negocio | Pendiente | No se instalan scripts arbitrarios ni píxeles de terceros automáticamente. Se prioriza la medición agregada propia. |
| Multimoneda | Fuera de esta etapa | USD cubre el alcance PR/EE. UU. previsto; evitar conversiones y precios de cobro incoherentes. |
| Marca de agua y personalización avanzada | Pendiente | Debe conservar calidad de fotos y derechos; no se modifican imágenes originales automáticamente. |
| Blogs y páginas adicionales por negocio | Pendiente | PB ya tiene contenido editorial; no se habilita un CMS individual por tienda en esta etapa. |

## Planes conservados

- Gratis: perfil y galería actuales; no se recortan beneficios existentes.
- Catálogo, $9.99/mes: 20 productos, una foto por producto, existencias, opciones, selección por WhatsApp, enlace propio de pago y configuración de presentación/entrega.
- Plus, $19.99/mes: 50 productos, cuatro fotos por producto, categorías/subcategorías, cupones, precio por cantidad, importación CSV, registro manual de pedidos y estadísticas agregadas.

VerCatálogo anuncia 250 productos por $10/mes: PB no debe competir prometiendo más capacidad o funciones ya superiores. El valor comercial de pertenecer a una comunidad cultural con difusión todavía tiene que demostrarse. No se garantiza tráfico, ventas ni renovación por añadir estas herramientas.

## Limitaciones para lanzamiento

Toda la rama continúa desactivada. No hay cobros de membresías, publicación ni llamadas nuevas a IA. Quedan por completar la facturación PB, verificación visual, prueba de imágenes con el servicio real, copias/restauración, retención de registros, política comercial de cada plan y piloto con artesanos.

No hay reservas de stock ni checkout transaccional; varios compradores pueden consultar la última pieza. Un enlace fijo de pago puede no contener la talla, cantidad, descuento o envío seleccionados: el artesano debe emitir o verificar el cobro final. No se anuncian como ventas los clics, los mensajes preparados ni los registros manuales.

El almacenamiento sigue usando el disco persistente y un solo proceso Node. Una expansión a varios procesos requiere una base de datos transaccional. Los tokens en URL siguen el esquema actual de PB: antes de lanzar conviene migrar a sesiones HttpOnly y excluir tokens de logs.
