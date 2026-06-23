import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, posix } from 'node:path';

const DIST = 'dist';
const BASE = '/Aru/';
const APP_HTML_FILES = ['portfolio.html', 'guia.html'];
const REDIRECT_HTML_FILES = {
  'index.html': 'portfolio.html',
  'simple.html': 'portfolio.html',
  'voz.html': 'guia.html',
};
const SHEETS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

function fail(message) {
  console.error(`La verificacion del build fallo: ${message}`);
  process.exit(1);
}

function assertFile(path) {
  if (!existsSync(path)) fail(`missing file: ${path}`);
}

function readDistHtml(file) {
  const path = join(DIST, file);
  assertFile(path);
  return readFileSync(path, 'utf8');
}

function assertNoRootAssetReference(file, html) {
  const badPatterns = ['src="/assets/', 'href="/assets/'];
  for (const pattern of badPatterns) {
    if (html.includes(pattern)) {
      fail(`${file} contiene una referencia absoluta a assets: ${pattern}`);
    }
  }
}

function assertBaseAssetReference(file, html) {
  if (!html.includes(`${BASE}assets/`)) {
    fail(`${file} no referencia ${BASE}assets/`);
  }
}

function assertRedirect(file, html, target) {
  if (!html.includes(`url=${target}`) || !html.includes(`window.location.replace('${target}')`)) {
    fail(`${file} debe redirigir a ${target}`);
  }
  if (html.includes('/assets/') || html.includes('src/assets') || html.includes('src/app.jsx') || html.includes('src/talk-app.jsx')) {
    fail(`${file} debe ser un redirect minimo sin assets ni apps React`);
  }
}

function assertReferencedBaseAssetsExist(file, html) {
  const attrPattern = /\b(?:src|href)="(\/Aru\/[^"]+)"/g;
  for (const match of html.matchAll(attrPattern)) {
    const urlPath = match[1];
    if (!urlPath.startsWith(BASE)) continue;
    const relative = urlPath.slice(BASE.length);
    assertFile(join(DIST, ...relative.split('/')));
  }
}

function assertSliceImages() {
  for (const sheet of SHEETS) {
    const dir = join(DIST, 'slices2', sheet);
    assertFile(dir);
    const webpFiles = readdirSync(dir).filter((name) => name.endsWith('.webp'));
    if (webpFiles.length !== 25) {
      fail(`${posix.join('dist', 'slices2', sheet)} debe contener 25 archivos webp, encontrados ${webpFiles.length}`);
    }
    for (let r = 0; r < 5; r += 1) {
      for (let c = 0; c < 5; c += 1) {
        assertFile(join(dir, `r${r}c${c}.webp`));
      }
    }
  }
}

for (const file of APP_HTML_FILES) {
  const html = readDistHtml(file);
  assertNoRootAssetReference(file, html);
  assertReferencedBaseAssetsExist(file, html);
  assertBaseAssetReference(file, html);
}

for (const [file, target] of Object.entries(REDIRECT_HTML_FILES)) {
  const html = readDistHtml(file);
  assertRedirect(file, html, target);
}

assertSliceImages();

console.log('Verificacion del build correcta.');
