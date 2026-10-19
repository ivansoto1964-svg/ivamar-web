# RSS de portadas para Pinterest

19 de octubre de 2026. Preparación técnica; no conecta la cuenta ni publica Pines.

- `/blog/feed.xml`: RSS 2.0 existente, hasta 20 artículos publicados; incorpora una portada original por artículo cuando hay una válida. Mantiene los artículos sin imagen para lectores RSS.
- `/blog/pinterest.xml`: piloto de hasta cinco artículos publicados recientes con portada válida. Omite borradores, URLs de imagen inseguras, portadas vacías y logos genéricos conocidos. No incluye galerías ni imágenes dentro del texto ni anuncios.
- Un solo `media:content` por artículo, con URL HTTPS absoluta y namespace Media RSS. El enlace y GUID apuntan al artículo del dominio reclamado. Títulos y resúmenes se escapan como XML; no se usa CDATA vulnerable a `]]>`. Se conserva la fecha real cuando es válida, sin inventar fecha actual para fechas desconocidas.
- No se amplían, recortan ni reemplazan imágenes. No se cambian las páginas de artículos, métricas, anuncios o perfiles.

## Prueba por el propietario después del deploy

1. Comprobar que https://www.masboricuaqueunmofongo.com/blog/pinterest.xml responde como RSS con portadas.
2. Crear un tablero secreto de prueba en Pinterest.
3. En Importar contenido → RSS → Conectar, introducir esa URL y elegir el tablero secreto.
4. Al guardar se autoriza la creación automática de Pines desde ese feed, incluyendo contenido anterior presente. Esta rama no pulsa Guardar ni activa la conexión por el usuario.
5. La documentación de Pinterest indica hasta 24 horas desde la actualización del feed y publicación de artículos antiguos primero. No garantiza tiempo real ni el aspecto exacto. Revisar las imágenes, textos y enlaces antes de hacer público el tablero.

El límite cinco es el tamaño del feed, no un límite total de publicaciones futuras. Si se mantiene conectado, entrarán nuevos artículos conforme se publiquen y entren en la selección. Actualizar un artículo no garantiza que Pinterest actualice su Pin; revisar sus controles antes de reconectar o borrar Pines. Este feed cubre El Balcón; Lo Más Reciente no se conecta automáticamente.

Referencia: https://help.pinterest.com/es/business/article/auto-publish-pins-from-your-rss-feed

## Validación

Pruebas del generador y rutas HTTP: límite 20/5, un original por artículo, dominio de enlaces, GUID estable, orden cronológico, exclusión de borradores y portadas genéricas/inseguras, duplicados y caracteres XML. XML de casos especiales analizado con ElementTree, verificando que título e imagen conservan sus valores. Suite completa npm test ejecutada. Pinterest y la recuperación de imágenes por su importador no se simulan como verificados: requieren conexión y revisión del propietario tras deploy. No se envían fotos privadas ni datos de acceso en el feed.
