# Aru

**Aru** is an interactive web PNGTuber assistant that complements Kendall Valverde Diaz's official portfolio.

**Aru** es una asistente PNGTuber web interactiva que complementa el portfolio oficial de Kendall Valverde Diaz.

```text
EN: AruDev shows the professional summary. Aru explains the full story.
ES: AruDev muestra el resumen profesional. Aru explica la historia completa.
```

Official portfolio / Portfolio oficial:

```text
https://aruhonshou.github.io/AruDev/
```

## What Aru Is

Aru is:

- a React + Vite PNGTuber companion;
- a static GitHub Pages app with no backend;
- a bilingual ES/EN local guide;
- an anime/chibi UI demo with avatar moods, AFK, blinking, mouse tracking, microphone/audio mouth sync, and motion states;
- a deeper explanation layer for AruDev.

Aru is not:

- another official portfolio;
- a generative AI chatbot;
- a DeepSeek, Worker, OpenAI, or Google Translate integration;
- a backend project;
- an app that requires API keys.

## Pages

```text
/Aru/
/Aru/index.html
```

Avatar mode. Includes mouse tracking, blinking, click moods, AFK, "Lo siento/Sorry", microphone, audio file loading, mouth sync, visual settings, and CTAs to the guide and AruDev.

```text
/Aru/guia.html
```

Deep local guide based on `src/data/kendall-profile.md`. It explains projects, QA Automation, applied AI, fullstack work, DevOps, experience, certifications, contact, and why Kendall may fit a role.

Legacy aliases:

```text
/Aru/simple.html -> /Aru/index.html
/Aru/voz.html    -> /Aru/guia.html
```

## Bilingual Local i18n

Aru supports:

- Spanish (`ES`);
- English (`EN`);
- a visible ES/EN selector on `index.html` and `guia.html`;
- persistence through `localStorage`;
- browser-language fallback: English browsers start in EN, otherwise ES;
- Spanish fallback when a translation is missing.

Main files:

```text
src/i18n/aru-i18n.js
src/hooks/useAruLanguage.js
src/components/LanguageToggle.jsx
```

No translation service is used. All copy is local and bundled by Vite.

## Local Source Of Truth

The main knowledge source is:

```text
src/data/kendall-profile.md
```

The structured guide lives in:

```text
src/data/aru-deep-knowledge.js
src/data/aru-guided-flow.js
```

Rules:

- Aru must not invent data.
- Aru must not create fake projects, fake experience, fake certifications, or private information.
- If a detail is missing:
  - ES: "Mmm... ese dato no lo tengo registrado todavia."
  - EN: "Hmm... I don't have that detail registered yet."
- The guide is fully local and static.
- No `fetch` to APIs, backend, Worker, DeepSeek, or secret keys.

## Motion System

The PNGTuber action system lives in:

```text
src/lib/aru-actions.js
src/hooks/useAruMotionController.js
src/styles/aru-motion.css
```

Actions:

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

Each action can define expression, motion, localized bubble, duration, idle reset, and priority. Internal moods keep priority over temporary guide actions.

## Install

Requirements:

- Node.js 22 LTS recommended.
- Node.js 20.19+ or 22.12+ minimum for Vite 8.

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Local entries:

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

The production build uses the `/Aru/` base path for GitHub Pages.

## Character Frames

Source sheets live in `imagenes/` and are not committed because they are heavy.

```bash
npm run generate:character
```

Generated WebP frames are placed in:

```text
public/slices2/A/r0c0.webp ... r4c4.webp
...
public/slices2/K/r0c0.webp ... r4c4.webp
```

## Structure

```text
.
|-- index.html
|-- guia.html
|-- simple.html
|-- voz.html
|-- scripts/
|-- src/
|   |-- app.jsx
|   |-- talk-app.jsx
|   |-- components/
|   |-- hooks/
|   |-- i18n/
|   |-- lib/
|   |-- styles/
|   `-- data/
|       |-- kendall-profile.md
|       |-- aru-deep-knowledge.js
|       `-- aru-guided-flow.js
|-- public/
`-- imagenes/
```

## Publishing

GitHub Pages target:

```text
https://aruhonshou.github.io/Aru/
https://aruhonshou.github.io/Aru/guia.html
```

Official portfolio:

```text
https://aruhonshou.github.io/AruDev/
```

## License

Code is MIT. Aru assets belong to the project owner and cannot be reused without permission.

See `ASSET_LICENSE.md` for details.
