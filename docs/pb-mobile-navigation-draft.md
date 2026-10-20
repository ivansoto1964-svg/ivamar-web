# Navegación móvil de PB: propuesta aislada

Estado: borrador para evaluar después del 8 de noviembre de 2026. No integrar ni desplegar automáticamente.

## Revisión previa

Base: main, commit 353d99d96eabc96075ee1698a4534df49e42a19a.
La portada incorpora su menú y CSS propios en src/views/planetaboricua.js.
La feria usa otro encabezado en src/views/planetaboricua/feriaartesanos.js.
El pie se comparte mediante src/views/planetaboricua/site-footer.js.
Hay mejoras de catálogo y directorio en otra rama: no se copian ni se mezclan aquí.

## Alcance

Solo se añaden este documento y docs/previews/pb-mobile-navigation.html.
No se modifica ningún archivo existente, dependencia, ruta, dato o variable de entorno.
No se añade ningún enlace público a la maqueta. No hay peticiones de escritura, formularios,
analítica ni almacenamiento local. Único recurso externo: el logo oficial ya publicado.
La navegación de muestra usa fragmentos locales; enlaces marcados ↗ abren el portal actual.

## Propuesta concreta

- Misma navegación en portada, lectura, agenda, feria y perfil.
- En celular: Inicio, Leer, Agenda, Artesanos y Más en barra inferior.
- Leer agrupa accesos a Lo más reciente y El Balcón sin cambiar sus nombres ni URLs.
- Más conserva acceso a Recursos, Viajes, Boletín y Sobre PB.
- No se agregan Pueblos, Talento, tiendas o ¿Quién hace? a la navegación pública.
- En escritorio la misma barra pasa arriba y deja de ser fija.
- Estado seleccionado visible, enlaces con texto, foco de teclado y Escape para cerrar Más.
- Área inferior reservada y safe-area para evitar tapar contenido.

La maqueta no propone un buscador general funcional: requiere una tarea separada.
No reorganiza el orden de portada, El Balcón o Lo más reciente.

## Verificación e integración futura

Validar sintaxis del JavaScript de la maqueta, IDs/destinos locales y alcance del diff.
No se afirma validación visual real en dispositivos: faltan iPhone/Safari y Android/Chrome,
320/360/390/430 px, texto ampliado y teclado. No se usa un navegador alternativo improvisado.
Antes de integrar, comprobar colisiones con coquí, cookies, PWA, anuncios y botones fijos.
La integración futura deberá usar un componente compartido con CSS prefijado y sin selectores
globales que afecten los nav actuales. Revisar páginas de entrada y enlaces de volver atrás.
Ejecutar pruebas del repositorio y comprobación visual tras integrar; este borrador no carga
en el servidor y no requiere ejecutar servicios ni modificar package.json.

Publicación sujeta a evaluación posterior al 8 de noviembre y decisión de Iván.
No hay activación por fecha, merge, deploy ni cambios en medición o anuncios en este trabajo.
