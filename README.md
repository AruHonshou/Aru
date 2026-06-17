# Aru Portfolio

Portfolio interactivo de **Kendall Valverde** con identidad visual de **Aru**. La entrada principal presenta informacion profesional, skills, experiencia, proyectos, certificaciones y contacto con estetica anime/manga/chibi. La version con voz sigue disponible como experiencia separada.

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
http://localhost:5173/index.html
http://localhost:5173/simple.html
http://localhost:5173/voz.html
```

`index.html` es el portfolio principal. `simple.html` redirige al portfolio para mantener compatibilidad con enlaces anteriores. `voz.html` conserva la version con microfono y archivo de audio.

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
|   |-- AruAvatar.jsx
|   |-- portfolio-data.js
|   |-- portfolio.css
|   |-- talk-app.jsx
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

El build usa GitHub Pages con base path `/Aru/`. La URL publica esperada es:

```text
https://aruhonshou.github.io/Aru/
```

## Licencia

El codigo esta bajo MIT. Los assets de Aru pertenecen al usuario del proyecto y no se pueden reutilizar sin permiso.

Consulta `ASSET_LICENSE.md` para mas detalle.
