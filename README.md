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
