# Página personal de Diego Fernando Afanador Restrepo

Sitio estático preparado para GitHub Pages. No requiere instalar dependencias ni ejecutar una compilación.

## Archivos

- `index.html`: página, estilos y catálogo interactivo.
- `favicon.svg`: icono personal.
- `.nojekyll`: sirve los archivos directamente.
- `assets/mascota-totodile.png`: mascota mostrada junto a los datos de contacto.

## Publicación en GitHub Pages

1. Extrae el ZIP y carga su contenido en la raíz del repositorio (o en la carpeta que selecciones como fuente de Pages). Debes ver index.html, favicon.svg y las carpetas brujula/, estadistica/, escritura-cientifica/, dosificacion/, publicaciones/ y revisiones/ al mismo nivel. No dejes todo dentro de una carpeta envolvente como pagina-personal/.
2. En Settings → Pages, elige Deploy from a branch, selecciona la rama y la carpeta donde quedó index.html (normalmente /(root)) y guarda.
3. Abre la URL que GitHub muestra en Pages. En un repositorio de proyecto tendrá una ruta que incluye el nombre del repositorio; los enlaces de regreso llevan de forma explícita a index.html dentro de esa misma publicación.

El paquete integral omite recomendaciones.json para conservar las recomendaciones que ya estén guardadas en tu repositorio. Si cargas una actualización, conserva ese archivo de GitHub.

## Brújula de investigación en salud

El catálogo enlaza a la herramienta interactiva `brujula/index.html`. Presenta un recorrido de decisiones para estudios cualitativos, cuantitativos y revisiones. Cada recorrido completo entrega una metodología concreta, una explicación y puntos que conviene revisar con el equipo docente. Incluye una guía de PICO, PEO/PECO, PICo, SPIDER, PCC, SPICE y PerSPEcTiF. La guía académica y el árbol completo acompañan la herramienta en `brujula/contenido-y-arbol-de-decisiones.md`.

## Incorporar herramientas y recursos

Edita la lista `TOOLS` al final de `index.html`. Cada herramienta tiene nombre, descripción, estado, público, color y URL. Si todavía no está publicada, conserva la URL vacía. La página mostrará el estado sin crear un enlace falso.

Edita `REPO` para incorporar guías y materiales por categoría. El buscador y los filtros actúan sobre las herramientas; los recursos se muestran agrupados.

GitHub Pages sirve archivos: incorporar una herramienta significa subir su aplicación estática o enlazar su ubicación. La página no incluye un formulario de carga de archivos ni un panel de administración.

## Contenido que debes revisar antes de publicar

Se conservaron de tu plantilla los datos de contacto, enlaces, líneas de investigación y proyectos. Verifica que sigan vigentes. Los perfiles académicos sin URL aparecen como pendientes.

El footer identifica la iniciativa como personal y conserva las licencias de los recursos externos; puedes definir una licencia propia para tus materiales y el código.

## Ruta de revisiones sistemáticas

La página `revisiones/index.html` organiza el contenido entregado en 13 etapas, desde la pregunta hasta el envío a revista. Los cinco apartados de cada etapa son agrupadores temáticos, no pasos uniformes; la secuencia la marca el menú lateral. El bloque ACHIEVE añade una anatomía visual adaptada a la etapa: fragmentos del artículo, diagramas PRISMA, tabla de características, evaluación PEDro, forest plots y gráfico de embudo, con preguntas de lectura crítica. Las figuras y fragmentos se presentan con atribución al artículo y licencia CC BY 4.0. También se señala una discrepancia entre el resumen y el cuerpo del artículo sobre el número de estudios incluidos en el metaanálisis para que el estudiante la verifique. El avance del checklist se guarda localmente. Las notas marcadas como pendientes se conservan visibles y las notas privadas para el docente se excluyeron. Las tres clases del ABC permanecen como videos complementarios. La guía se centra en revisiones de intervenciones en salud y deriva a Brújula cuando la pregunta pertenece a otro tipo de revisión.

## Escritura Científica

La herramienta `escritura-cientifica/index.html` articula la anatomía visual del artículo con el recetario de escritura entregado por el autor. Incluye la estructura del manuscrito, lenguaje y citación, recetas para organizar la introducción, la metodología, los resultados y la discusión, ejemplos de artículos publicados y filtros por diseño. Sus mesas de trabajo para introducción, resultados y discusión permiten redactar notas, ver un esquema de párrafos, cargar ejemplos y copiar el esquema; los borradores se guardan localmente en el navegador y no se sincronizan entre dispositivos. La navegación superior permite saltar entre las secciones y regresar a la página personal.

## Estadística en salud

La carpeta `estadistica/` contiene una guía interactiva organizada en diez temáticas y doce secciones comunes. Cada tema incluye caso ficticio, árbol de cuatro decisiones, explicación de la prueba, supuestos, alternativas, tutorial paso a paso para IBM SPSS Statistics y jamovi, guía para leer la salida, plantilla de reporte, límites y fuentes oficiales. T1 incluye además una base sintética reproducible de 24 registros, resultados descriptivos calculados y descarga CSV con encabezados legibles (por ejemplo, `Edad en años`). La ficha de T1 enlaza al libro *Estadística en salud* en el repositorio Areandina y a su ficha en la biblioteca personal. Cada ruta T1–T10 dispone de una base sintética propia descargable en CSV, con diccionario de variables y vista previa; también se ofrece un ZIP con las diez bases. Los datos son ficticios y sirven para practicar la importación, selección de pruebas e interpretación; las rutas distintas de T1 no presentan resultados calculados como si fueran observaciones reales. La sección final de cada ruta detalla limitaciones metodológicas, posibles sobreestimaciones y controles para interpretar cada método. Los videos QR ya están integrados como reproductores en las secciones SPSS de las metodologías que corresponden, con la página impresa del libro para ubicarlos. Se enlazan listas de descriptivos, gráficos, t independientes, ANOVA, y ejemplos de Pearson, Wilcoxon, Friedman, McNemar y otras pruebas relacionadas. El libro no aporta un tutorial QR específico para estimar RR, OR o HR ni para supervivencia Kaplan–Meier/Cox; esas limitaciones se señalan en la herramienta. Algunas rutas de jamovi dependen de módulos adicionales y se identifican como tales.


## Biblioteca de publicaciones

La página `publicaciones/index.html` organiza los registros de publicaciones extraídos del archivo de datos de FisioTIPS. Incluye 51 registros (47 artículos, 3 libros y 1 capítulo), búsqueda, filtros por tipo y estado, y enlaces DOI o URL cuando el registro los incluye. Dos libros están marcados “En proceso editorial”, tal como aparecen en los datos de origen.

## Ruta de Dosificación FITT-PV

La aplicación estática e interactiva se encuentra en `dosificacion/index.html` y se enlaza desde el catálogo de herramientas. No requiere un servidor ni archivos auxiliares. Mantiene visible su alcance: apoyo al razonamiento profesional, no sustitución del juicio clínico, y dosis operativas pendientes de validación clínica externa.

## Publicar recomendaciones

La portada muestra el contenido de `recomendaciones.json`. El formulario de `recomendaciones/admin.html` puede agregar entradas sin editar el HTML: ingresa el repositorio GitHub, la rama, la carpeta desde la que Pages sirve el sitio y un token fine-grained con permiso `Contents: Read and write` limitado a ese repositorio. El primer envío crea el archivo de datos; cada envío posterior agrega una recomendación y genera un commit. GitHub Pages sirve el nuevo contenido al completar su despliegue.

La contraseña del formulario es un filtro de interfaz en un sitio estático, no autenticación segura del servidor. La escritura real queda protegida por el token de GitHub: ingrésalo solo en una página confiable, no lo compartas ni lo guardes en el código. El token se solicita al publicar; si el repositorio no coincide con el directorio servido por Pages, el archivo no aparecerá en la portada.

## Referencia visual

Adaptación de la estructura HTML entregada por el usuario y del Manual de Identidad Visual Unicauca V2024: Open Sans (p. 13), azul RGB 0/18/130 y rojo RGB 173/0/0 (p. 14), colores complementarios (p. 15), placas y tótems de señalética (p. 39). No se reprodujo ni redibujó el escudo. La página se identifica como personal.

Open Sans se solicita a Google Fonts. Si no hay conexión, el sitio utiliza fuentes de sistema.

## Versión 2 (21 de octubre de 2026): rendimiento, identidad y voz docente

**Archivos compartidos nuevos**
- `assets/sitio.css`: capa de identidad común a todas las páginas. Títulos en Source Serif 4, texto en Open Sans, formas redondeadas y botones tipo píldora, conservando el azul #001282 y el rojo #AD0000. Se carga al final de cada página; los ajustes de cada módulo están agrupados por `data-page`.
- `assets/sitio.js`: muestra los videos de YouTube como miniatura y carga el reproductor solo al hacer clic.
- `assets/perfil.jpg`: foto de perfil (17 KB) usada en el encabezado de todas las páginas, en la portada y en las firmas.

**Rendimiento**
- Dosificación pasó de 4 MB a 320 KB. Las tipografías incrustadas de la página se reemplazaron por Google Fonts. La plantilla de la ficha exportable, que sí necesita sus tipografías incrustadas para que el PNG salga igual en cualquier equipo, ahora está en `dosificacion/ficha-plantilla.js` y se descarga solo al abrir la exportación (o al pasar el cursor por el botón).
- Mascota de la portada: de 272 KB a 71 KB. Ícono de Dosificación: de 248 KB a 13 KB.
- Estadística ya no encadena la carga de tipografías dentro del CSS.
- Revisiones ya no se desplaza sola al abrir la página y actualiza el avance sin recorrer todas las etapas en cada clic.
- Búsquedas: código reorganizado, delegación de eventos y recálculo por cuadro de animación.
- Publicaciones tenía el fondo sin definir y se veía negro en navegadores con modo oscuro; ahora el fondo es siempre blanco.

**Textos**
Se reescribieron en voz de docente, con trato de «tú», la portada, Búsquedas, la Brújula (incluidas las 44 recomendaciones finales y avisos en la página en lugar de ventanas emergentes) y Estadística (árboles de decisión, casos T2 a T10, módulo T1 y limitaciones). Se retiró de Estadística el mecanismo que añadía al azar una frase genérica a las retroalimentaciones cortas. Revisiones y Escritura Científica ya estaban escritas en la voz del autor y se conservaron. En Dosificación solo cambió la presentación inicial; la nota de alcance y los textos clínicos quedaron igual.
