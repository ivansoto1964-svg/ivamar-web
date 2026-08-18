# Prototipo: Los 78 pueblos de Planeta Boricua

## Objetivo
Probar la arquitectura editorial y visual antes de integrarla al portal principal.

## Incluye
- Índice completo de los 78 municipios.
- Búsqueda por nombre y filtro por zona.
- Vista individual por municipio usando `?pueblo=slug`.
- Primera conexión con selecciones de **Auténtico PB — Apoya lo Nuestro**.
- Estados editoriales claros: selección principal, candidato fuerte, candidato y por verificar.

## Seguridad
- El prototipo vive solamente bajo `/pueblos/`.
- Lleva `noindex,follow` durante la fase de prueba.
- No modifica rutas, PB Control, Blog, Lo más reciente, Agenda, Artesanos ni datos persistentes.
- No afirma propiedad puertorriqueña cuando aún falta verificación.

## Próximo paso después de validar
Convertir la vista individual en páginas permanentes indexables y conectar datos reales de Agenda Boricua, Directorio de Artesanos, Blog y Lo más reciente por municipio.
