# Aru

**Aru** es una asistente PNGTuber web interactiva que complementa el portfolio oficial de Kendall Valverde Díaz.

La idea central:

```text
AruDev muestra el resumen profesional.
Aru explica la historia completa.
```

Aru no es otro portfolio oficial. El portfolio visual y resumido vive en:

```text
https://aruhonshou.github.io/AruDev/
```

## Qué Es Aru

Aru es:

- una companion PNGTuber web hecha con React y Vite;
- una entrada interactiva con avatar, moods, AFK, parpadeo, mouse tracking, micrófono y audio;
- una guía local profunda que explica proyectos, experiencia, skills, QA, IA y DevOps;
- una demo de UI anime/chibi, motion design y estados visuales;
- un complemento de AruDev.

Aru no es:

- otro portfolio oficial;
- un chatbot con IA externa;
- una app con backend;
- una integración con DeepSeek;
- un Worker;
- un proyecto que requiera API keys.

## Páginas

```text
/Aru/
/Aru/index.html
```

Modo avatar PNGTuber. Incluye:

- seguimiento del mouse;
- parpadeo;
- moods por clic;
- AFK;
- botón "Lo siento";
- micrófono;
- carga de archivo de audio;
- sincronización de boca;
- panel de ajustes visuales;
- CTA hacia la guía profunda;
- CTA hacia AruDev.

```text
/Aru/guia.html
```

Guía interactiva profunda basada en `src/data/kendall-profile.md`.

Explica con más detalle:

- resumen profundo de Kendall;
- proyectos;
- QA Automation;
- IA aplicada, RAG, agentes y OpenAI API;
- fullstack React/Node/TypeScript;
- DevOps, AWS, Docker, Terraform y GitHub Actions;
- razones para contratar a Kendall;
- enlaces oficiales.

Aliases antiguos:

```text
/Aru/simple.html -> /Aru/index.html
/Aru/voz.html    -> /Aru/guia.html
```

## Fuente Local De Verdad

La base principal de conocimiento es:

```text
src/data/kendall-profile.md
```

La capa estructurada de la guía vive en:

```text
src/data/aru-deep-knowledge.js
src/data/aru-guided-flow.js
```

Reglas:

- Aru no debe inventar datos.
- Aru no debe crear experiencia, certificaciones, proyectos o métricas falsas.
- Si falta información, responde que ese dato no está registrado todavía.
- Todo el flujo es local y se incluye en el bundle de Vite.
- No se usa `fetch` hacia APIs, backend, Worker, DeepSeek ni claves.

## Motion System

Las acciones PNGTuber están en:

```text
src/lib/aru-actions.js
src/hooks/useAruMotionController.js
src/styles/aru-motion.css
```

Acciones disponibles:

- `idle`
- `home`
- `deepProjects`
- `deepSkills`
- `deepQA`
- `deepAI`
- `deepDevops`
- `whyHire`
- `portfolio`
- `thinking`
- `notFound`
- `angry`
- `tired`
- `explainFocus`

Cada acción puede definir:

- expresión A-K;
- animación;
- burbuja temporal;
- duración;
- reset a idle;
- prioridad.

Los moods internos de Aru tienen prioridad sobre acciones temporales para no romper enojo por clics, AFK ni el botón "Lo siento".

## Instalación

Requisitos:

- Node.js 22 LTS recomendado.
- Node.js 20.19+ o 22.12+ como mínimo para Vite 8.

```bash
npm install
```

## Ejecutar En Local

```bash
npm run dev
```

Entradas:

```text
http://localhost:5173/
http://localhost:5173/index.html
http://localhost:5173/guia.html
```

## Build

```bash
npm run build
npm run verify:pages
npm run preview
```

El build usa base path `/Aru/`, listo para GitHub Pages.

## Generar Frames Del Personaje

Las hojas fuente están en `imagenes/` y no se suben a Git porque son pesadas.

```bash
npm run generate:character
```

El generador crea frames WebP en:

```text
public/slices2/A/r0c0.webp ... r4c4.webp
...
public/slices2/F/r0c0.webp ... r4c4.webp
```

Cada carpeta `A-F` debe contener 25 archivos. Las expresiones especiales `G-K` también se verifican en el build.

## Estructura

```text
.
|-- index.html        # modo avatar PNGTuber
|-- guia.html         # guía profunda local
|-- simple.html       # redirect antiguo hacia index.html
|-- voz.html          # redirect antiguo hacia guia.html
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
|   |   |-- kendall-profile.md
|   |   |-- aru-deep-knowledge.js
|   |   `-- aru-guided-flow.js
|   |-- ajustes-panel.jsx
|   `-- character-config.js
|-- public/
|   `-- slices2/
`-- imagenes/      # fuente local ignorada por Git
```

## Publicación

GitHub Pages debe abrir el avatar en:

```text
https://aruhonshou.github.io/Aru/
```

La guía profunda queda en:

```text
https://aruhonshou.github.io/Aru/guia.html
```

El portfolio oficial queda en:

```text
https://aruhonshou.github.io/AruDev/
```

## Licencia

El código está bajo MIT. Los assets de Aru pertenecen al usuario del proyecto y no se pueden reutilizar sin permiso.

Consulta `ASSET_LICENSE.md` para más detalle.
