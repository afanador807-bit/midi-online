# Página personal de Diego Fernando Afanador Restrepo

Sitio estático con herramientas y recursos para docencia e investigación en fisioterapia y ciencias de la salud. Se publica con GitHub Pages y no requiere instalar dependencias ni compilar.

## Estructura

| Ruta | Contenido |
|---|---|
| `index.html` | Portada, catálogo de herramientas y repositorio de recursos |
| `busquedas/` | Búsquedas científicas: tutorial y constructor de cadenas |
| `revisiones/` | Revisiones sistemáticas paso a paso, con el caso ACHIEVE |
| `escritura-cientifica/` | Anatomía y recetario del manuscrito |
| `brujula/` | Orientador de preguntas y metodologías |
| `estadistica/` | Guía de análisis con diez rutas y bases sintéticas |
| `dosificacion/` | Ruta de Dosificación FITT-PV |
| `publicaciones/` | Biblioteca de publicaciones |
| `recomendaciones/admin.html` | Formulario para publicar recomendaciones |
| `assets/` | Estilos, scripts e imágenes compartidos |

## Publicación

1. Sube el contenido a la raíz del repositorio.
2. En Settings → Pages elige Deploy from a branch, la rama y la carpeta `/(root)`.

## Editar el catálogo

En `index.html`, la lista `TOOLS` contiene las herramientas y `REPO` los recursos. Una herramienta sin URL se muestra sin enlace.

## Recomendaciones

La portada lee `recomendaciones.json`; si el archivo no existe o está vacío, la sección no se muestra. Para agregar entradas abre `recomendaciones/admin.html` e ingresa un token fine-grained de GitHub con permiso `Contents: Read and write` limitado a este repositorio. La contraseña del formulario es solo un filtro de interfaz: la escritura la protege el token, que no debe guardarse en el código.

## Verificación

```bash
node busquedas/check.cjs
```

## Licencias

Las figuras y fragmentos del artículo ACHIEVE se usan bajo CC BY 4.0, con atribución en la página. Los recursos externos conservan sus propias licencias.
