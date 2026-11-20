/*
  CONFIGURACIÓN DE CONTENIDO MULTIMEDIA
  - page: número de página del PDF (empieza en 1).
  - id: identificador único.
  - type: "gif", "video" o "gallery".
  - src: ruta del archivo desde la raíz del repositorio.
  - images: lista de rutas para una galería.
  - x, y, w, h: posición y tamaño en porcentaje de la página.
  Puedes cambiar estos valores sin tocar viewer.js.
*/
window.PORTFOLIO_MEDIA = [
  // PÁGINAS CON ESPACIOS MULTIMEDIA DEL PDF:
  // 7: recuadro grande de la página del fanzine.
  { id:"pag_fanzine", page:7, type:"gallery",
   images:[
    "media/galerias/fanzine/FANZINE_page-0001.jpg",
    "media/galerias/fanzine/FANZINE_page-0002.jpg",
    "media/galerias/fanzine/FANZINE_page-0003.jpg",
    "media/galerias/fanzine/FANZINE_page-0004.jpg",
    "media/galerias/fanzine/FANZINE_page-0005.jpg",
    "media/galerias/fanzine/FANZINE_page-0006.jpg",
    "media/galerias/fanzine/FANZINE_page-0007.jpg",
    "media/galerias/fanzine/FANZINE_page-0008.jpg",
    "media/galerias/fanzine/FANZINE_page-0009.jpg",
    "media/galerias/fanzine/FANZINE_page-0010.jpg",
    "media/galerias/fanzine/FANZINE_page-0011.jpg",
    "media/galerias/fanzine/FANZINE_page-0012.jpg",
    "media/galerias/fanzine/FANZINE_page-0013.jpg",
    "media/galerias/fanzine/FANZINE_page-0014.jpg",
    "media/galerias/fanzine/FANZINE_page-0015.jpg",
  ],
   x:33.4, y:41.5, w:42.5, h:43.5},

  // 8: página prácticamente en blanco; espacio para pieza a página completa.
  { id:"fanzine", page:8, type:"gif", src:"media/gifs/Fanzine.gif", x:2, y:7, w:96, h:87 },

  // 20: página prácticamente en blanco; espacio para pieza a página completa.
  { id:"motion-principal", page:20, type:"empty", x:2, y:7, w:96, h:87 },

  // 21: recuadro de vídeo/animación junto al texto "Cortinillas de televisión".
  { id:"cortinillas", page:21, type:"empty", x:67.2, y:42.0, w:21.4, h:40.5 },

  // 22: dos recuadros multimedia.
  { id:"motion-izquierda", page:22, type:"empty", x:13.0, y:42.5, w:35.3, h:39.0 },
  { id:"motion-derecha", page:22, type:"empty", x:53.0, y:42.5, w:35.2, h:39.0 },

  // 24, 25 y 26: recuadros de ilustración.
  { id:"personajes", page:24, type:"empty", x:66.8, y:46.0, w:21.5, h:41.0 },
  { id:"experimentacion", page:25, type:"empty", x:66.8, y:48.0, w:21.5, h:40.0 },
  { id:"bocetos", page:26, type:"empty", x:66.8, y:46.5, w:21.5, h:41.0 }

  /*
  EJEMPLOS: cuando quieras añadir un archivo, sustituye una entrada
  type:"empty" por una de estas estructuras (mantén page, x, y, w, h):

  GIF:
  { id:"fanzine", page:7, type:"gif",
    src:"media/gifs/animacion.gif", x:33.4, y:41.5, w:42.5, h:43.5 },

  VÍDEO:
  { id:"cortinillas", page:21, type:"video",
    src:"media/videos/cortinillas.mp4", x:67.2, y:42, w:21.4, h:40.5 },

  GALERÍA:
  { id:"personajes", page:24, type:"gallery",
    images:["media/galerias/personaje-1.jpg","media/galerias/personaje-2.jpg"],
    x:66.8, y:46, w:21.5, h:41 }
  */
];
