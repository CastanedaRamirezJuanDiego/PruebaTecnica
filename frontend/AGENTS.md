# Instrucciones para frontend Angular

Este proyecto debe ser conciso, funcional y alineado con Angular moderno. La prioridad es construir interfaces internas claras, no pantallas decorativas.

## Estructura y componentes

- Crear componentes solo cuando haya una necesidad clara de separacion.
- No crear capas, helpers o utilidades prematuras.
- Mantener componentes pequenos y enfocados.
- Usar servicios para llamadas HTTP y logica compartida.
- No duplicar interfaces o tipos.
- Mantener nombres consistentes con la API y el dominio.
- No agregar estilos complejos si la tarea no lo requiere.

## Trabajo por tipo y feature

- Organizar el trabajo frontend por tipo de cambio: ruta, componente, servicio HTTP, tipo/interfaz, formulario, estilo y test.
- Para cada tipo, modificar solo lo necesario para la feature solicitada.
- Mantener el mismo nombre de feature en rutas, componentes, servicios, tipos y tests.
- No mezclar pantallas, flujos o entidades de otras features en el mismo cambio.
- Si una feature consume API, alinear primero el contrato de datos y despues ajustar servicio, estado y vista.
- Preferir que la logica especifica de una feature permanezca cerca de su componente o servicio actual.
- Extraer una utilidad compartida solo si ya existe duplicacion real entre features.

## Consumo de API

- Centralizar llamadas HTTP en servicios.
- Manejar estados basicos: loading, error y datos.
- No hardcodear URLs si existe configuracion de entorno o patron existente.
- Tipar respuestas y payloads.
- No hacer multiples requests innecesarios si los datos pueden obtenerse en una sola llamada.
- Evitar suscripciones anidadas. Preferir operadores de RxJS o flujos simples.

## Formularios

- Usar formularios reactivos cuando haya validacion o edicion de datos.
- Validar campos requeridos y formatos basicos.
- Mostrar errores de forma clara sin agregar UI innecesaria.
- No enviar campos que la API no necesita.

## UI y estilos

- Priorizar interfaces simples, claras y usables.
- No crear pantallas de marketing, heroes o elementos decorativos si la tarea es una herramienta interna.
- Evitar componentes visuales grandes si la funcionalidad es CRUD o dashboard.
- No agregar animaciones, iconos o librerias visuales sin necesidad.
- Mantener CSS especifico y pequeno.
- Evitar textos explicativos largos dentro de la UI.

## Rendimiento

- Evitar recalculos pesados en templates.
- No llamar funciones costosas directamente desde el template.
- Usar `trackBy` o equivalente cuando se rendericen listas grandes.
- Evitar requests repetidos en inicializaciones.
- Limpiar recursos si se crean suscripciones manuales persistentes.

## Testing frontend

- Probar servicios HTTP cuando cambie el contrato con la API.
- Probar formularios y comportamiento visible importante.
- No agregar tests que solo verifiquen que el componente se crea.
- Mantener mocks pequenos y cercanos al caso que se prueba.
