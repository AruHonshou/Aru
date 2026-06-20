import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const [sheet, fileName] = process.argv.slice(2);
if (!sheet || !fileName) {
  throw new Error('Uso: node scripts/generate-one-sheet.mjs SHEET FILE');
}

const root = process.cwd();
const source = path.join(root, 'imagenes', fileName);
const outDir = path.join(root, 'public', 'slices2', sheet);
const frameSize = 1200;
const quality = 92;

function gridLimit(size, index) {
  const start = Math.round((index * size) / 5);
  const end = Math.round(((index + 1) * size) / 5);
  return { start, size: end - start };
}

await fs.access(source);
await fs.rm(outDir, { recursive: true, force: true });
await fs.mkdir(outDir, { recursive: true });

const meta = await sharp(source, { limitInputPixels: false, sequentialRead: true }).metadata();
if (!meta.width || !meta.height) {
  throw new Error(`${fileName} no tiene dimensiones legibles`);
}
if (meta.width !== meta.height) {
  throw new Error(`${fileName} debe ser cuadrada; se recibio ${meta.width}x${meta.height}`);
}

for (let row = 0; row < 5; row += 1) {
  const top = gridLimit(meta.height, row);
  for (let col = 0; col < 5; col += 1) {
    const left = gridLimit(meta.width, col);
    await sharp(source, { limitInputPixels: false, sequentialRead: true })
      .extract({ left: left.start, top: top.start, width: left.size, height: top.size })
      .resize(frameSize, frameSize, { fit: 'fill', kernel: sharp.kernel.lanczos3 })
      .webp({ quality, effort: 4 })
      .toFile(path.join(outDir, `r${row}c${col}.webp`));
  }
}

const frames = (await fs.readdir(outDir)).filter((name) => /^r[0-4]c[0-4]\.webp$/.test(name));
if (frames.length !== 25) {
  throw new Error(`${sheet} genero ${frames.length} frames en vez de 25`);
}

console.log(`${sheet}: ${fileName} -> ${frames.length} frames`);
