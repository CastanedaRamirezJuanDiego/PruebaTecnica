# Instrucciones para backend Laravel

Este proyecto debe comportarse como una API REST en Laravel/PHP. Evitar vistas Blade para nuevas funcionalidades, salvo que la tarea lo pida explicitamente.

## Estructura esperada

Para nuevos modulos API, preferir esta estructura cuando aplique:

- `routes/api.php` para rutas HTTP.
- Controllers enfocados en recibir request y devolver response.
- Form Requests para validacion cuando la entrada tenga reglas relevantes.
- Models con relaciones Eloquent claras.
- API Resources cuando la respuesta necesite forma controlada.
- Migrations para cambios de base de datos.
- Factories y feature tests cuando se agregue comportamiento importante.

No crear capas como `Repository`, `Service`, `Action` o `DTO` por defecto. Solo agregarlas si la logica ya es suficientemente compleja o se reutiliza en varios lugares.

## Trabajo por tipo y feature

- Organizar el trabajo backend por tipo de cambio: ruta, controller, request, modelo, resource, migracion, factory, seeder y test.
- Para cada tipo, modificar solo lo necesario para la feature solicitada.
- Mantener el nombre de la feature consistente entre ruta, controller, modelo, request, resource y tests.
- No mezclar endpoints o entidades de otras features en el mismo cambio.
- Si una feature requiere varias piezas, implementarlas en orden de contrato: migracion/modelo, validacion, controller/ruta, resource y tests.
- No crear una carpeta, clase o capa nueva solo para "ordenar" una feature si Laravel ya ofrece una ubicacion clara.
- Cuando una feature comparta logica con otra, reutilizar lo existente antes de extraer una clase nueva.

## API REST

- Usar codigos HTTP correctos:
  - `200` para respuestas exitosas.
  - `201` para creacion.
  - `204` para eliminacion sin contenido.
  - `404` para recurso no encontrado.
  - `422` para errores de validacion.
- Responder JSON consistente.
- No exponer campos internos innecesarios.
- Validar toda entrada del usuario.
- No confiar en datos recibidos desde frontend para permisos, usuario autenticado o calculos sensibles.
- Usar route model binding cuando simplifique el codigo.
- Evitar respuestas falsas, mocks o datos demo salvo que la tarea lo pida.

## Base de datos y Eloquent

- Evitar consultas N+1. Usar `with()`, `load()` o eager loading cuando se devuelvan relaciones.
- Seleccionar solo relaciones necesarias.
- No cargar colecciones completas si se necesita paginacion.
- Usar `paginate()` o `simplePaginate()` para listados que puedan crecer.
- Definir relaciones Eloquent con nombres claros.
- Usar indices en migraciones cuando haya busquedas frecuentes, foreign keys o filtros importantes.
- Evitar logica pesada dentro de accessors, mutators o resources si puede provocar consultas repetidas.

## Controllers y validacion

- Mantener controllers delgados.
- No mezclar validacion manual extensa dentro del controller si puede ir en un Form Request.
- No hacer multiples responsabilidades en una sola accion.
- Preferir retornos tempranos en lugar de bloques `if` anidados.
- Mantener la logica de negocio simple dentro del modelo o una clase dedicada solo cuando realmente haga falta.

## Seguridad

- No guardar secretos en codigo.
- No imprimir tokens, API keys o datos sensibles en logs.
- Usar variables de entorno para credenciales.
- Respetar autenticacion y autorizacion cuando el endpoint maneje datos privados.
- Validar ownership del recurso cuando aplique.

## Integracion con IA

Cuando se conecte una API de modelo de lenguaje:

- Encapsular la llamada en una clase clara si se reutiliza o si tiene manejo de errores relevante.
- Usar variables de entorno para API keys y configuracion.
- Definir entrada y salida esperada.
- Preferir structured output cuando la respuesta sea consumida por el sistema.
- Validar la respuesta del modelo antes de guardarla o usarla.
- Registrar uso minimo necesario: modelo, tokens si estan disponibles, costo estimado y estado.
- Controlar timeouts, errores y respuestas invalidas.
- No llamar modelos de IA dentro de loops grandes sin control de costo.
- Evitar prompts largos o datos innecesarios.

## Testing backend

- Priorizar feature tests para endpoints API.
- Probar creacion, listado, actualizacion, eliminacion y validaciones cuando aplique.
- Usar factories para datos de prueba.
- Verificar errores `422`, `404` y permisos cuando correspondan.
