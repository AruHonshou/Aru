import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const RAIZ = process.cwd();
const CARPETA_ORIGEN = path.join(RAIZ, 'imagenes');
const CARPETA_SALIDA = path.join(RAIZ, 'public', 'slices2');
const HOJAS = ['A', 'B', 'C', 'D', 'E', 'F'];
const TAMANO_FRAME = 1200;
const CALIDAD_WEBP = 92;
const COLOR_FONDO = { r: 0xff, g: 0xea, b: 0xd3 };
const UMBRAL_PERSONAJE = 28;

async function existeRuta(ruta) {
  try {
    await fs.access(ruta);
    return true;
  } catch {
    return false;
  }
}

async function buscarHojaFuente(hoja) {
  const entradas = await fs.readdir(CARPETA_ORIGEN, { withFileTypes: true });
  const coincidencias = entradas
    .filter((entrada) => entrada.isFile())
    .map((entrada) => entrada.name)
    .filter((nombre) => nombre.toLowerCase().endsWith('.png'))
    .filter((nombre) => nombre.startsWith(`${hoja}_`) || nombre.startsWith(hoja))
    .sort();

  if (coincidencias.length === 0) {
    throw new Error(`Falta la hoja PNG ${hoja} en ${CARPETA_ORIGEN}`);
  }
  return path.join(CARPETA_ORIGEN, coincidencias[0]);
}

function limitesGrilla(tamano, indice) {
  const inicio = Math.round((indice * tamano) / 5);
  const fin = Math.round(((indice + 1) * tamano) / 5);
  return { inicio, largo: fin - inicio };
}

function esPersonaje(datos, indice) {
  const dr = datos[indice] - COLOR_FONDO.r;
  const dg = datos[indice + 1] - COLOR_FONDO.g;
  const db = datos[indice + 2] - COLOR_FONDO.b;
  return dr * dr + dg * dg + db * db > UMBRAL_PERSONAJE * UMBRAL_PERSONAJE;
}

function conservarGrupoPrincipalSobreFondo(datos, ancho, alto, canales) {
  if (canales < 3) {
    throw new Error(`Se esperaban al menos 3 canales, se recibieron ${canales}`);
  }

  const totalPixeles = ancho * alto;
  const etiquetas = new Int32Array(totalPixeles);
  const cola = new Int32Array(totalPixeles);
  const grupos = [{ area: 0, minX: 0, minY: 0, maxX: 0, maxY: 0 }];
  let etiqueta = 0;

  for (let inicio = 0; inicio < totalPixeles; inicio += 1) {
    if (etiquetas[inicio] !== 0 || !esPersonaje(datos, inicio * canales)) {
      continue;
    }

    etiqueta += 1;
    let cabeza = 0;
    let colaFinal = 0;
    let area = 0;
    let minX = ancho;
    let minY = alto;
    let maxX = -1;
    let maxY = -1;
    cola[colaFinal] = inicio;
    colaFinal += 1;
    etiquetas[inicio] = etiqueta;

    while (cabeza < colaFinal) {
      const pixel = cola[cabeza];
      cabeza += 1;
      area += 1;

      const x = pixel % ancho;
      const y = Math.floor(pixel / ancho);
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;

      const vecinos = [
        x > 0 ? pixel - 1 : -1,
        x < ancho - 1 ? pixel + 1 : -1,
        y > 0 ? pixel - ancho : -1,
        y < alto - 1 ? pixel + ancho : -1,
      ];

      for (const siguiente of vecinos) {
        if (siguiente < 0 || etiquetas[siguiente] !== 0) {
          continue;
        }
        if (!esPersonaje(datos, siguiente * canales)) {
          continue;
        }
        etiquetas[siguiente] = etiqueta;
        cola[colaFinal] = siguiente;
        colaFinal += 1;
      }
    }

    grupos[etiqueta] = { area, minX, minY, maxX, maxY };
  }

  let etiquetaPrincipal = 0;
  let areaPrincipal = 0;
  for (let i = 1; i < grupos.length; i += 1) {
    if (grupos[i].area > areaPrincipal) {
      areaPrincipal = grupos[i].area;
      etiquetaPrincipal = i;
    }
  }

  const principal = grupos[etiquetaPrincipal];
  const margen = 2;
  const minX = Math.max(0, principal.minX - margen);
  const minY = Math.max(0, principal.minY - margen);
  const maxX = Math.min(ancho - 1, principal.maxX + margen);
  const maxY = Math.min(alto - 1, principal.maxY + margen);

  for (let pixel = 0; pixel < totalPixeles; pixel += 1) {
    const x = pixel % ancho;
    const y = Math.floor(pixel / ancho);
    const dentroDelAreaPrincipal = x >= minX && x <= maxX && y >= minY && y <= maxY;
    if (dentroDelAreaPrincipal) continue;

    const indice = pixel * canales;
    datos[indice] = COLOR_FONDO.r;
    datos[indice + 1] = COLOR_FONDO.g;
    datos[indice + 2] = COLOR_FONDO.b;
  }

  return { cantidadGrupos: grupos.length - 1, areaPrincipal };
}

async function limpiarCarpetasSalida() {
  await fs.mkdir(CARPETA_SALIDA, { recursive: true });
  for (const hoja of HOJAS) {
    await fs.rm(path.join(CARPETA_SALIDA, hoja), { recursive: true, force: true });
    await fs.mkdir(path.join(CARPETA_SALIDA, hoja), { recursive: true });
  }
}

async function generarHoja(hoja) {
  const origen = await buscarHojaFuente(hoja);
  const imagen = sharp(origen, { limitInputPixels: false, sequentialRead: true });
  const metadatos = await imagen.metadata();

  if (!metadatos.width || !metadatos.height) {
    throw new Error(`${path.basename(origen)} no tiene dimensiones legibles`);
  }
  if (metadatos.width !== metadatos.height) {
    throw new Error(`${path.basename(origen)} debe ser cuadrada; se recibio ${metadatos.width}x${metadatos.height}`);
  }

  console.log(`${hoja}: ${path.basename(origen)} (${metadatos.width}x${metadatos.height})`);

  for (let fila = 0; fila < 5; fila += 1) {
    const arriba = limitesGrilla(metadatos.height, fila);
    for (let columna = 0; columna < 5; columna += 1) {
      const izquierda = limitesGrilla(metadatos.width, columna);
      const salida = path.join(CARPETA_SALIDA, hoja, `r${fila}c${columna}.webp`);

      const { data, info } = await sharp(origen, { limitInputPixels: false, sequentialRead: true })
        .extract({
          left: izquierda.inicio,
          top: arriba.inicio,
          width: izquierda.largo,
          height: arriba.largo,
        })
        .resize(TAMANO_FRAME, TAMANO_FRAME, {
          fit: 'fill',
          kernel: sharp.kernel.lanczos3,
        })
        .removeAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

      const { cantidadGrupos, areaPrincipal } = conservarGrupoPrincipalSobreFondo(
        data,
        info.width,
        info.height,
        info.channels,
      );
      if (areaPrincipal === 0) {
        throw new Error(`${hoja} r${fila}c${columna} no contiene un grupo principal del personaje`);
      }

      await sharp(data, {
        raw: {
          width: info.width,
          height: info.height,
          channels: info.channels,
        },
      })
        .webp({
          quality: CALIDAD_WEBP,
          effort: 4,
        })
        .toFile(salida);

      if (cantidadGrupos > 1) {
        console.log(`  ${hoja} r${fila}c${columna}: se conservo el grupo principal y se quitaron ${cantidadGrupos - 1} grupos vecinos o ruido`);
      }
    }
  }
}

async function verificarSalida() {
  let total = 0;
  for (const hoja of HOJAS) {
    const carpeta = path.join(CARPETA_SALIDA, hoja);
    const entradas = await fs.readdir(carpeta);
    const frames = entradas.filter((nombre) => /^r[0-4]c[0-4]\.webp$/.test(nombre));
    if (frames.length !== 25) {
      throw new Error(`${hoja} genero ${frames.length} frames en vez de 25`);
    }
    total += frames.length;
  }
  if (total !== 150) {
    throw new Error(`Se generaron ${total} frames en vez de 150`);
  }
  console.log(`Se generaron ${total} frames WebP en ${path.relative(RAIZ, CARPETA_SALIDA)}`);
}

async function main() {
  if (!(await existeRuta(CARPETA_ORIGEN))) {
    throw new Error(`No existe la carpeta fuente: ${CARPETA_ORIGEN}`);
  }
  await limpiarCarpetasSalida();
  for (const hoja of HOJAS) {
    await generarHoja(hoja);
  }
  await verificarSalida();
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
