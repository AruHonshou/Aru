# Aru

Aplicacion web de avatar para **Aru**. El personaje sigue el mouse en 25 direcciones, parpadea automaticamente y puede mover la boca segun el microfono o un archivo de audio.

`simple.html` es el avatar interactivo principal con microfono, audio, ajustes y estados visuales.

`voz.html` funciona como una guia local tipo FAQ sobre Kendall: responde desde datos estaticos del frontend, usa navegacion guiada y busqueda local, y no requiere backend, claves, variables de entorno ni servicios externos.

## Instalacion

Requisitos:

- Node.js 22 LTS recomendado.
- Node.js 20.19+ o 22.12+ como minimo para Vite 8.

```bash
npm install
```

## Generar Los Frames

Las hojas fuente estan en `imagenes/` y no se suben a Git porque son muy pesadas.

Para regenerar los 150 frames WebP:

```bash
npm run generate:character
```

El generador lee `A_*.png` hasta `F_*.png`, corta cada hoja en una grilla 5x5, elimina fragmentos de celdas vecinas y escribe:

```text
public/slices2/A/r0c0.webp ... r4c4.webp
...
public/slices2/F/r0c0.webp ... r4c4.webp
```

Cada carpeta `A-F` debe contener 25 archivos.

## Ejecutar En Local

```bash
npm run dev
```

Entradas:

```text
http://localhost:5173/voz.html
http://localhost:5173/simple.html
```

`index.html` redirige automaticamente a la guia local.

## Modo Local De Voz

La pantalla `voz.html` no usa backend ni llamadas externas de chat. La informacion vive en:

```text
src/data/aru-guided-flow.js
src/data/kendall-profile.md
```

La busqueda libre de `voz.html` es una busqueda local sobre esos datos. No se necesita `.env`, no se configura ninguna URL remota y no se suben claves al repositorio.

## Build

```bash
npm run build
npm run verify:pages
npm run preview
```

El build usa base path `/Aru/`, listo para GitHub Pages con este repositorio.

## Estructura

```text
.
|-- index.html
|-- voz.html
|-- simple.html
|-- scripts/
|   |-- generate-character-slices.mjs
|   `-- verify-pages-build.mjs
|-- src/
|   |-- app.jsx
|   |-- talk-app.jsx
|   |-- components/
|   |-- hooks/
|   |-- lib/
|   |-- styles/
|   |-- data/
|   |   |-- aru-guided-flow.js
|   |   `-- kendall-profile.md
|   |-- ajustes-panel.jsx
|   `-- character-config.js
|-- public/
|   `-- slices2/
`-- imagenes/      # fuente local ignorada por Git
```

## Estados Del Personaje

| Carpeta | Ojos | Boca |
| --- | --- | --- |
| `A` | abiertos | cerrada |
| `B` | abiertos | semiabierta |
| `C` | abiertos | abierta |
| `D` | cerrados | cerrada |
| `E` | cerrados | semiabierta |
| `F` | cerrados | abierta |

Las filas y columnas representan las 25 direcciones de mirada:

- Columnas: izquierda, diagonal izquierda, frente, diagonal derecha, derecha.
- Filas: muy arriba, algo arriba, centro, algo abajo, muy abajo.

## Publicacion En GitHub

Antes de subir:

1. Crea un repositorio vacio llamado `aru`.
2. No agregues README, `.gitignore` ni licencia desde GitHub.
3. Pasa la URL HTTPS del repositorio para conectar el remoto.

No se hara commit ni push hasta tener esa URL.

## Licencia

El codigo esta bajo MIT. Los assets de Aru pertenecen al usuario del proyecto y no se pueden reutilizar sin permiso.

Consulta `ASSET_LICENSE.md` para mas detalle.
