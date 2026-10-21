# Búsquedas científicas

Herramienta estática integrada en el catálogo de la página principal.

## Instalación

El ZIP contiene el sitio completo. Para actualizar una copia existente basta con incorporar la carpeta `busquedas/` y reemplazar el `index.html` de la raíz por el incluido. Los otros módulos no se modificaron. Conserva tu configuración de alojamiento. No requiere paquetes, servidor de aplicaciones ni claves API.

Para una revisión local, abre `index.html` en el navegador o sirve la carpeta raíz con un servidor estático. En GitHub Pages conserva `busquedas/` junto al resto de carpetas y publica los archivos como haces habitualmente.

## Contenido

Seis etapas: fuentes y elección de bases; revistas y cuartiles; calidad metodológica; formulación de preguntas; construcción de cadenas; selección de estudios. Fuentes metodológicas enlazadas dentro de la página.

Ocho marcos: PICO, PICOT, PEO, PECO, PCC, SPIDER, PICo y CoCoPop. Cada marco tiene clasificación por intención, ejemplo, componentes y selección de bloques. Salidas: booleano genérico, PubMed, Scopus y Web of Science. Los descriptores MeSH requieren comprobación en el tesauro; no hay traducción ni búsqueda remota automática. El constructor ofrece borradores, no estrategias validadas.

Permite copiar y descargar una ficha TXT con pregunta, términos, cadena, plataforma, fecha, registros recuperados y límites. Los datos del formulario se pierden al recargar o cambiar de estrategia (los componentes); descarga la ficha para conservarlos.

## Verificación

Ejecutar `node busquedas/check.cjs` desde la raíz comprueba ocho marcos en cuatro formatos, OR/AND, deduplicación, bloques excluidos y entradas no admitidas. Se comprobó también en navegador el acceso desde el catálogo, ejemplos PICO/SPIDER, cambio de formato y desactivación de copiar cuando faltan campos. El pegado final y la recuperación deben validarse en cada base real; no se ejecutaron consultas remotas.

## Ampliación a educación

Selector de ejemplos Educación / Salud, con ocho marcos en cada ámbito. ERIC, Education Source, Dialnet y Redalyc complementan las fuentes clínicas. Se incluyen criterios sobre asignación por aula/centro, equivalencia inicial, pérdidas, implementación y medidas de aprendizaje; enlaces a WWC, EEF y MMAT. El botón ERIC abre la consulta en texto libre; utiliza el tesauro y búsqueda avanzada para afinarla. Los ejemplos educativos no asignan descriptores MeSH automáticamente.

## Rediseño didáctico

Ruta visual de seis pasos; catálogo ilustrado y explorador de cuatro tipos de fuente; dos preguntas con retroalimentación; simulación de cuartiles con veinte revistas ficticias y control por teclado; casos de evaluación metodológica; diagrama AND/OR; recorrido de selección con cifras ficticias. Las explicaciones extensas están desplegables. Se comprobaron las interacciones en navegador y se mantuvieron las pruebas del constructor.

## Versión 2 (21 de octubre de 2026)

Rendimiento: un solo bloque de inicialización con referencias a elementos guardadas, delegación de eventos (un listener por grupo de botones en lugar de uno por botón), construcción del DOM con fragmentos, recálculo de la cadena una vez por cuadro mientras se escribe, versiones educativas de los marcos calculadas una sola vez y `content-visibility` para que el navegador no pinte las secciones que aún no están en pantalla. La hoja de estilos se reorganizó sin reglas duplicadas.

Diseño: se conservan los colores del sitio (azul #001282 y rojo #AD0000). Nueva tipografía (Source Serif 4 para títulos, Open Sans para texto), formas redondeadas, iconos SVG propios en lugar de emojis, firma del autor en la portada y notas destacadas tipo «Lo que yo haría», «Ojo con esto» y «Error frecuente».

Textos: todas las explicaciones, retroalimentaciones de las preguntas, mensajes de error del constructor y la lista final se reescribieron en voz de docente, en segunda persona, con ejemplos y errores frecuentes. El contenido técnico no cambió.

`node busquedas/check.cjs` sigue pasando.
