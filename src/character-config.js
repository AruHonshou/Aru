// Configuracion del personaje: referencias centralizadas a los frames.
// Al cambiar de personaje, normalmente solo hace falta ajustar este archivo.

export default {
  // Ruta base de los frames, relativa a public/.
  basePath: 'slices2',

  // Formato de imagen (webp / png).
  ext: 'webp',

  // Grilla: filas para direccion vertical (0 arriba a 4 abajo), columnas para horizontal (0 izquierda a 4 derecha).
  rows: 5,
  cols: 5,

  // Hojas: ojos abiertos x boca [cerrada/media/abierta] = A/B/C, ojos cerrados x boca [cerrada/media/abierta] = D/E/F.
  sheets: {
    eyesOpen:   { close: 'A', half: 'B', open: 'C' },
    eyesClosed: { close: 'D', half: 'E', open: 'F' },
  },

  // Construye la ruta de cada frame.
  src(sheet, r, c) {
    return `${this.basePath}/${sheet}/r${r}c${c}.${this.ext}`;
  },
};
