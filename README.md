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
