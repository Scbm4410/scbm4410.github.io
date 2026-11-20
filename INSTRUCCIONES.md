# Portfolio web — Silvia Buceta Martín

Este proyecto convierte `assets/portfolio.pdf` en un visor web de una página cada vez, con transición de paso de página, controles de navegación, zoom, pantalla completa y espacios para contenido multimedia.

## Estructura

- `index.html`: estructura del visor.
- `styles.css`: aspecto visual y adaptación a móvil.
- `viewer.js`: carga del PDF, navegación, animación y reproducción multimedia.
- `media.js`: **único archivo que tendrás que editar para colocar o cambiar GIF, vídeo o galerías**.
- `assets/portfolio.pdf`: PDF base de 27 páginas.
- `media/`: carpeta donde subirás tus GIF, vídeos e imágenes.

## Publicarlo en GitHub Pages

1. Entra en GitHub y abre el repositorio que creaste para el portfolio.
2. Descomprime el ZIP en tu ordenador.
3. Dentro de la carpeta descomprimida, selecciona `index.html`, `styles.css`, `viewer.js`, `media.js`, y las carpetas `assets` y `media`. Sube esos elementos a la **raíz** del repositorio. No subas la carpeta contenedora `portfolio_web` como una carpeta dentro del repositorio: el archivo `index.html` debe quedar visible al abrir la página principal del repositorio.
4. En GitHub, pulsa **Add file → Upload files**, arrastra los archivos y carpetas y confirma con **Commit changes**.
5. Abre **Settings → Pages**.
6. En **Build and deployment**, elige **Deploy from a branch**.
7. Selecciona la rama `main` y la carpeta `/ (root)`, y pulsa **Save**.
8. Espera a que GitHub Pages termine la publicación. En esa misma sección aparecerá el enlace público del portfolio. Ábrelo y comprueba que carga el PDF.

Cada vez que subas cambios a la rama `main`, GitHub Pages actualizará la web automáticamente (puede tardar unos minutos).

> Para GitHub Pages gratuito, lo más sencillo es mantener el repositorio público. Todo lo que publiques en él —PDF, vídeos e imágenes— podrá ser visto y descargado por cualquiera que tenga acceso al repositorio o a la web.

## Añadir contenido multimedia (sin volver a tocar el visor)

### Paso 1. Sube los archivos a su carpeta

En tu repositorio, entra en la carpeta correspondiente y usa **Add file → Upload files**.

- GIF: `media/gifs/`
- Vídeos MP4: `media/videos/`
- Fotografías de galerías: `media/galerias/`

Usa nombres sencillos, sin espacios ni tildes. Por ejemplo: `cortinillas.mp4`, `fanzine.gif`, `personaje-01.jpg`.

### Paso 2. Edita `media.js`

En GitHub, abre `media.js`, pulsa el icono del lápiz (**Edit**) y busca la entrada que corresponde al recuadro que quieres completar. Cada espacio tiene un `id` y un número de página.

Ahora mismo los espacios vacíos están definidos con `type:"empty"`. Sustituye esa entrada por el tipo de contenido que quieras. **Conserva `page`, `x`, `y`, `w` y `h`**, salvo que quieras cambiar su ubicación o tamaño.

#### GIF
Ejemplo para el espacio de la página 7:

```js
{ id:"fanzine", page:7, type:"gif",
  src:"media/gifs/animacion.gif",
  x:33.4, y:41.5, w:42.5, h:43.5 },
```

El GIF se reproduce automáticamente y en bucle.

#### Vídeo
Ejemplo para la página 21:

```js
{ id:"cortinillas", page:21, type:"video",
  src:"media/videos/cortinillas.mp4",
  x:67.2, y:42, w:21.4, h:40.5 },
```

El vídeo aparecerá con controles de reproducción. Se recomienda MP4 con códec H.264 y audio AAC. El visitante pulsa reproducir; no se inicia con sonido automáticamente.

#### Galería de fotografías
Ejemplo para la página 24:

```js
{ id:"personajes", page:24, type:"gallery",
  images:[
    "media/galerias/personaje-01.jpg",
    "media/galerias/personaje-02.jpg",
    "media/galerias/personaje-03.jpg"
  ],
  x:66.8, y:46, w:21.5, h:41 },
```

La primera fotografía funciona como miniatura. Al pulsarla se abre una galería a pantalla completa con flechas para avanzar y retroceder.

### Paso 3. Guarda los cambios

Pulsa **Commit changes**. Espera a que GitHub Pages actualice la web y recárgala. Si ves la versión anterior, fuerza la recarga:

- Windows: `Ctrl + F5`
- Mac: `Cmd + Shift + R`

## Mapa de espacios detectados en el PDF

Los números corresponden a las páginas del PDF (1–27):

| Página | Espacio | Uso previsto |
|---|---|---|
| 7 | Recuadro grande | Multimedia del proyecto editorial/fanzine |
| 8 | Página casi en blanco | Pieza multimedia a página completa |
| 20 | Página casi en blanco | Pieza multimedia a página completa del bloque Motion Graphics |
| 21 | Recuadro junto a «Cortinillas de televisión» | Vídeo o animación |
| 22 | Dos recuadros | Dos piezas multimedia |
| 24 | Recuadro junto a «Dibujo de personajes» | Proceso o galería |
| 25 | Recuadro junto a «Experimentación creativa» | Proceso o galería |
| 26 | Recuadro junto a «Exploración y bocetos» | Proceso o galería |

Las posiciones iniciales están aproximadas a partir de la composición del PDF. Puedes ajustar `x`, `y`, `w` y `h` en `media.js` si quieres que el contenido encaje con más precisión.

## Cómo entender las posiciones

Los cuatro valores están expresados en porcentajes del tamaño de la página:

- `x`: distancia desde el borde izquierdo.
- `y`: distancia desde el borde superior.
- `w`: anchura del espacio.
- `h`: altura del espacio.

Por ejemplo, `x:33, y:40, w:43, h:44` coloca el contenido aproximadamente a un tercio del borde izquierdo, a un 40 % desde arriba, con un tamaño del 43 % de ancho y 44 % de alto.

## Recomendaciones para los archivos

- Vídeo: MP4 (H.264), preferiblemente comprimido para web.
- GIF: optimizado y no excesivamente pesado; para animaciones largas, MP4 suele ocupar mucho menos.
- Fotografías: JPG o WebP para reducir el peso; PNG si necesitas transparencia.
- Evita nombres de archivo con espacios, tildes o caracteres especiales.
- No borres ni renombres `assets/portfolio.pdf` sin actualizar también `PDF_URL` en `viewer.js`.
- Los archivos del repositorio son públicos si el repositorio es público. No subas material privado.

## Si algo no aparece

1. Comprueba que el nombre y la ruta del archivo coinciden exactamente con los de `media.js` (incluidas mayúsculas y minúsculas).
2. Comprueba que el archivo está en la carpeta indicada.
3. Asegúrate de que la entrada multimedia está dentro de `window.PORTFOLIO_MEDIA = [ ... ]` y que las comas y comillas están bien colocadas.
4. Comprueba que `index.html`, `media.js`, `viewer.js`, `styles.css` y `assets/portfolio.pdf` están en la raíz/ruta indicada.
5. Recarga la web forzando la actualización del navegador.

## Nota técnica

El visor utiliza PDF.js desde una CDN para representar las páginas del PDF y código CSS/JavaScript propio para la transición de página. Por ello, el visitante necesita conexión a internet. El visor no depende de servicios de pago, pero GitHub Pages y las bibliotecas externas están sujetos a sus condiciones y límites de uso.
