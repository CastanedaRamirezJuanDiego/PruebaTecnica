# Instrucciones generales para agentes

Este workspace contiene dos proyectos:

- `backend`: API en Laravel/PHP. Leer tambien `backend/AGENTS.md`.
- `frontend`: aplicacion Angular. Leer tambien `frontend/AGENTS.md`.

El objetivo principal es generar codigo claro, mantenible y estrictamente necesario. Antes de modificar archivos, revisar la estructura existente y seguir los patrones ya presentes en el proyecto.

## Reglas compartidas

- Hacer cambios pequenos, directos y relacionados con la tarea solicitada.
- No crear codigo extra, archivos auxiliares, abstracciones o servicios si no son necesarios.
- No modificar configuraciones globales sin una razon clara.
- No cambiar nombres, rutas o estructuras existentes sin justificarlo.
- No agregar dependencias nuevas salvo que sean indispensables.
- No duplicar logica. Extraer una funcion solo cuando reduzca complejidad real.
- Evitar anidaciones profundas de `if`. Preferir retornos tempranos, validaciones claras y guard clauses.
- Mantener funciones cortas, con una responsabilidad concreta.
- No dejar codigo muerto, comentarios innecesarios, logs temporales ni datos de prueba hardcodeados.
- Usar nombres descriptivos y consistentes con el dominio.
- Priorizar legibilidad sobre soluciones demasiado genericas.

## Forma de trabajo por tipo y feature

- Antes de modificar, identificar el tipo de cambio: backend, frontend, base de datos, integracion, test, configuracion o documentacion.
- Dentro del tipo de cambio, trabajar por feature o caso de uso concreto. No mezclar features distintas en el mismo cambio salvo que sea indispensable.
- Mantener cada cambio dentro de los archivos propios de su tipo y feature.
- Si una tarea toca backend y frontend, avanzar por contrato: primero definir o respetar la forma de datos de la API y luego adaptar el consumo en la UI.
- Nombrar clases, componentes, rutas, metodos, tests y tipos con el mismo vocabulario de la feature.
- Evitar cambios transversales si la feature se puede resolver localmente.
- Si se detecta una mejora fuera del tipo o feature actual, mencionarla como pendiente en lugar de implementarla.
- Al finalizar, explicar el resultado agrupado por tipo de cambio y feature afectada.

## Testing y verificacion

- Agregar o ajustar tests cuando se cree comportamiento nuevo o se corrija un bug.
- No crear tests superficiales que solo verifiquen que una clase existe.
- Mantener tests pequenos, claros y enfocados en comportamiento.
- Ejecutar los comandos relevantes cuando sea posible.
- Informar claramente que se cambio y que no se pudo verificar, si aplica.

## Antes de finalizar una tarea

- Revisar que no haya codigo innecesario.
- Confirmar que rutas, nombres, tipos y respuestas sean consistentes.
- Verificar que no haya problemas evidentes de rendimiento.
- Confirmar que el cambio respeta las instrucciones especificas del proyecto afectado.
