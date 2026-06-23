# Aru

**Aru** is Kendall Valverde Díaz's main interactive portfolio and local PNGTuber guide.

**Aru** es el portfolio principal interactivo de Kendall Valverde Díaz y una guía local con estética anime/chibi.

## Pages

```text
/Aru/
/Aru/index.html
```

GitHub Pages entry. `index.html` is a minimal redirect/alias to `portfolio.html`.

```text
/Aru/portfolio.html
```

Main interactive portfolio with Aru, ES/EN, sections, avatar moods, mouse tracking, blinking, local SFX, visual settings, and GitHub Pages deployment.

```text
/Aru/guia.html
```

Deep local guide based on `src/data/kendall-profile.md`. It explains Kendall's projects, QA Automation, applied AI, fullstack work, DevOps, experience, certifications, and contact.

Legacy aliases:

```text
/Aru/simple.html -> /Aru/portfolio.html
/Aru/voz.html    -> /Aru/guia.html
```

## Local Data

The source of truth is:

```text
src/data/kendall-profile.md
```

Structured portfolio and guide data live in:

```text
src/data/portfolio-sections.js
src/data/aru-deep-knowledge.js
src/data/aru-guided-flow.js
```

The portfolio and guide are static. They do not use backend services, external APIs, fetch, Workers, DeepSeek, or generative AI at runtime.

## Run

```bash
npm install
npm run dev
```

Local entries:

```text
http://localhost:5173/
http://localhost:5173/portfolio.html
http://localhost:5173/guia.html
```

## Build

```bash
npm run build
npm run verify:pages
npm run preview
```

The production build uses the `/Aru/` base path for GitHub Pages.

## Structure

```text
.
|-- index.html
|-- portfolio.html
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
|       |-- portfolio-sections.js
|       |-- aru-deep-knowledge.js
|       `-- aru-guided-flow.js
|-- public/
`-- imagenes/
```

## Publishing

GitHub Pages target:

```text
https://aruhonshou.github.io/Aru/
https://aruhonshou.github.io/Aru/portfolio.html
https://aruhonshou.github.io/Aru/guia.html
```

## License

Code is MIT. Aru assets belong to the project owner and cannot be reused without permission.

See `ASSET_LICENSE.md` for details.
