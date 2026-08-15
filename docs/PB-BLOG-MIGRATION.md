# Migración del blog de Blogger a Planeta Boricua

## Estado técnico

- Los 29 artículos existentes quedaron archivados dentro de PB.
- Las imágenes alojadas por Blogger fueron copiadas y optimizadas como WebP dentro de PB.
- El blog público usa `/blog` y ya no consulta el feed de Blogger.
- El Centro de Control permite crear, editar, guardar borradores, publicar y eliminar artículos.
- El índice, RSS y sitemap se generan desde el archivo oficial de PB.
- Las direcciones antiguas de artículos tienen redirecciones permanentes hacia sus páginas nuevas.

## Orden para completar el cambio público

1. Desplegar y verificar el nuevo blog en `https://www.masboricuaqueunmofongo.com/blog`.
2. Descargar una copia de seguridad final desde Blogger y conservarla fuera de línea.
3. Añadir `blog.masboricuaqueunmofongo.com` como dominio personalizado del mismo servicio de Render que sirve PB.
4. En GoDaddy, cambiar únicamente el registro DNS de `blog` para que use el destino indicado por Render. No alterar el dominio principal ni el correo.
5. Verificar que una dirección antigua de Blogger responda con una redirección 301 hacia su artículo correspondiente en `/blog/...`.
6. En Google Search Console, mantener verificado el dominio y enviar `https://www.masboricuaqueunmofongo.com/sitemap.xml`.
7. Solicitar indexación de `/blog` y de los artículos principales.
8. Mantener las redirecciones permanentemente. No borrar la copia de seguridad de Blogger.

## Comprobaciones posteriores

- El índice `/blog` carga sin errores.
- Los artículos muestran sus imágenes desde `/img/blog/archive/`.
- `/blog/feed.xml` responde correctamente.
- `/blog/sitemap.xml` y `/sitemap.xml` incluyen los artículos.
- Las publicaciones nuevas aparecen en la portada de PB y en el índice.
- Los borradores no son visibles públicamente.
