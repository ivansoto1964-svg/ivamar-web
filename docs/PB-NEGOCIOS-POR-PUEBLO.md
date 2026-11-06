# Directorio de negocios por pueblo · 6 noviembre 2026

## Alcance autorizado

Perfil comercial editable por **$9.99 USD mensuales**, sin cargo inicial ni prueba gratis para este producto. Un negocio por email, un pueblo y una categoría por perfil. No sustituye ni cobra por los perfiles gratuitos de artesanos. No incluye pedidos, pagos de servicios del comercio, reservas dentro de PB, creación de menú, entrevista, publicación especial ni anuncios de Google.

Categorías: Dónde comer, Dónde hospedarse, Qué hacer y Cómo moverse. El directorio funciona para los 78 municipios. Se conserva el contenido editorial existente de Arecibo, Adjuntas y demás pueblos con datos; donde todavía no hay guía se ofrece una página de municipio con el directorio y aviso editorial en preparación.

## Flujo público

1. `/negocios/registro?pueblo=arecibo`: dueño, email privado, datos, categoría, fotos autorizadas, teléfono, WhatsApp, redes, web y acciones según categoría.
2. Email de acceso seguro, con expiración de 2 horas y confirmación de un solo uso mediante POST; los escáneres de correo no verifican cuentas al abrir GET.
3. Revisión en `/pb-control/negocios` después de confirmar el email. No se cobra a solicitudes sin aprobar.
4. El dueño activa una suscripción desde `/negocios/mi-perfil`. El retorno de Stripe nunca publica ni demuestra un pago por sí solo.
5. Solo un periodo realmente pagado, email verificado, perfil aprobado y ausencia de pausa editorial/de riesgo permiten aparecer.
6. Enlace permanente `/negocios/:slug` y QR descargable `/negocios/:slug/qr.png`. Solo publican datos comerciales expresamente seleccionados, nunca el email privado, notas, identificadores Stripe ni autorizaciones internas.
7. Editar conserva la versión aprobada hasta revisar los cambios. Control de revisión evita que una pestaña antigua sobrescriba una actualización.
8. El portal de Stripe permite ver facturas, cambiar el método de pago y cancelar la próxima renovación. La cancelación al final del periodo mantiene cobertura hasta su vencimiento. Pausar contenido desde PB no cancela cargos: se advierte al administrador y al dueño.

Los perfiles se identifican como **espacios comerciales de pago**; el directorio ordena por nombre y no afirma recomendaciones editoriales. Pedidos, servicios, reservas y pagos al comercio se acuerdan fuera de PB.

## Persistencia y seguridad

- Archivo separado `/data/pb-negocios/directory.json`, configurable con `PB_BUSINESS_DATA_DIR`. Directorio absoluto, escritura atómica y respaldo `.previous` antes de cada cambio. Corrupción de datos produce error; no se reemplaza por un directorio vacío.
- La instancia de Render debe conservar el disco persistente `/data`. Arquitectura de un proceso, consistente con el servicio actual; no ejecutar varias réplicas escritoras sobre este JSON.
- Firmas HMAC con dominio propio `pb-business`, expiración, nonce de email consumible y cookies `__Host-` HttpOnly/Secure/SameSite. Se puede reutilizar la clave de artesanos con firmas separadas, sin modificar sus accesos.
- Origen exacto, CSRF para altas, subidas, edición, revisión y operaciones de cobro; límites de solicitudes e imágenes. QR y perfil no disponibles si no son públicos.
- Fotos JPG/PNG/WebP de hasta 5 MB, procesadas por Cloudinary en carpeta propia de cada perfil; máximo 8 y ALT requerido. No admite imágenes arbitrarias externas como sustituto de la carga autorizada.
- Enlaces HTTPS, redes validadas y HTML escapado. No se hacen peticiones a enlaces arbitrarios proporcionados por comerciantes.
- Estados de pago, revisión, propietario y cobertura no se aceptan desde el formulario público.

## Integración de Stripe

Cuenta identificada en el conector: **Planeta Boricua**, `acct_1Q4866DjCGKYfj5T` (modo real). No se crearon suscripciones de clientes ni se efectuaron cargos durante desarrollo. Las pruebas de lifecycle y firma usan datos locales y un cliente simulado, sin peticiones a Stripe.

Producto creado en la cuenta real (sin clientes ni cobros): `prod_Va1U7cA0y1jc4J`. Tarifa mensual de $9.99: `price_1UYrRNDjCGKYfj5TY0jrLpoB`, lookup key `pb_business_monthly_999`, impuesto incluido cuando corresponda y se configure.

Portal creado: `bpc_1UYrSyDjCGKYfj5TmhJSOwaR`, con historial, actualización de pago y cancelación al final del periodo. No permite cambiar plan ni cantidad.

Variables para Render:

| Variable | Uso |
|---|---|
| `PB_BUSINESS_MAGIC_SECRET` | Opcional si ya existe `PB_ARTISAN_MAGIC_SECRET`; firma exclusivamente tokens del directorio. |
| `PB_BUSINESS_STRIPE_KEY` | Clave restringida de Stripe recomendada; si no existe, se intenta la `STRIPE_SECRET_KEY` actual. Se verifica que la cuenta coincida antes de cobrar. Nunca guardar claves en Git. |
| `PB_BUSINESS_STRIPE_PRICE_ID` | Price de USD 999 centavos, recurrente mensual. Debe pertenecer al producto del directorio. |
| `PB_BUSINESS_STRIPE_WEBHOOK_SECRET` | Firma del endpoint de webhooks propio de negocios. No reutilizar otra firma. |
| `PB_BUSINESS_STRIPE_PORTAL_ID` | Configuración del portal con cancelación al final de periodo, historial y actualización de método de pago. Si se omite, se usa la configuración PB creada (`bpc_1UYrSyDjCGKYfj5TmhJSOwaR`), sin depender del portal por defecto de otros servicios. |
| `PB_BUSINESS_BILLING_ENABLED` | Mantener sin configurar/`false` hasta validar cuenta, tarifa, webhooks, portal y tratamiento fiscal. `true` habilita iniciar cobros. No hay pago simulado de respaldo. |

Email y fotos reutilizan la configuración existente de Resend y Cloudinary.

Endpoint: `https://www.masboricuaqueunmofongo.com/api/pb-negocios/stripe-webhook`. Se registra **antes** del parser global JSON para verificar los bytes originales y su firma.

Eventos necesarios:

- `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed`, `checkout.session.expired`.
- `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`.
- `invoice.paid`, `invoice.payment_failed`.
- `charge.dispute.created`, `charge.refunded`, `radar.early_fraud_warning.created`.

Las renovaciones se reconcilian con la suscripción y factura actuales, no con estados antiguos del evento. La factura debe estar pagada, pertenecer al Customer dedicado al negocio, usar la suscripción y tarifa correctas y cubrir el importe mensual. Eventos confirmados se deduplican; errores se responden 500 para reintento. Los reembolsos, disputas y alertas de fraude pausan publicación hasta revisión administrativa. Cada negocio tiene Customer dedicado, separado de los otros servicios de PB; el vínculo de autorización usa IDs de Customer/Subscription, no metadata aportada por usuarios.

Los intentos de Checkout se serializan y guardan una clave idempotente antes de pedir una sesión a Stripe. Se reutiliza un Checkout abierto. Un intento ambiguo mayor de 23 horas requiere reconciliación antes de volver a cobrar. Evitar renovar manualmente cargos o crear otra sesión al ver un retorno exitoso.

### Impuestos y activación

Antes de activar cobros, confirmar las obligaciones y registros fiscales aplicables al servicio. No se activó `automatic_tax`: sin registros activos, habilitarlo no garantiza que Stripe recaude impuestos. Si corresponde, configurar registros y Stripe Tax y probar el total antes del lanzamiento. El comportamiento del precio puede incluir el impuesto en los $9.99 según configuración; no cambiar el precio prometido silenciosamente.

Configurar también recuperación de pagos fallidos y avisos al cliente en Stripe Billing. Comprobar permisos de cuenta y Customer Portal; no asumir que la mera conexión del plugin instala una clave de servidor en Render.

## Verificaciones

- `npm test`: suite existente y nueva suite `npm run test:businesses`.
- Pruebas del flujo HTTP de registro y acceso, confirmación consumible, CSRF/origen, propiedad de fotos, administración privada y respuesta segura con cobro deshabilitado.
- Pruebas de no publicación sin pagar, versión aprobada preservada, caducidad, cancelación, renovación y pago fallido, asincronía, deduplicación y pausa por reembolso.
- Prueba de firma usando cuerpo crudo con SDK oficial, rechazando bytes modificados.
- Pruebas locales de enlaces de los 78 municipios, escape de HTML y ocultación de datos privados.

## Despliegue

Código en `main` y **Deploy latest commit** manual por Iván en Render. Luego verificar registro, email, fotos, panel y perfil en producción. No anunciar cobro operativo hasta configurar las variables y completar una prueba de pago en un entorno de pruebas separado. No usar una compra real sin autorización de un titular para la validación.
