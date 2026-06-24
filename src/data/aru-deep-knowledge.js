export const OFFICIAL_LINKS = {
  portfolio: `${import.meta.env.BASE_URL}portfolio.html`,
  portfolioPublic: 'https://aruhonshou.github.io/Aru/portfolio.html',
  github: 'https://github.com/AruHonshou',
  aruRepo: 'https://github.com/AruHonshou/Aru',
  documenteDemo: 'https://aruhonshou.github.io/Documente/#/dashboard',
  documenteRepo: 'https://github.com/AruHonshou/Documente',
  qapilotRepo: 'https://github.com/AruHonshou/QAPilot/tree/kendall',
  openAiBotFrontend: 'https://github.com/AruHonshou/OpenAIBOTFrontend',
  openAiBotBackend: 'https://github.com/AruHonshou/OpenAIBOTBackend',
  hrRepo: 'https://github.com/AruHonshou/Sistema-Recursos-Humanos',
  infraRepo: 'https://github.com/AruHonshou/devops-terraform-project',
  linkedin: 'https://www.linkedin.com/in/kendall-valverde-diaz-aru/',
  email: 'mailto:kendallavd@gmail.com',
  whatsapp: 'https://wa.me/50685097920',
};

function baseOptions() {
  return [
    { label: { es: 'Resumen profundo', en: 'Deep summary' }, next: 'deep_summary', kind: 'primary' },
    { label: { es: 'Proyectos en detalle', en: 'Projects in detail' }, next: 'projects', kind: 'primary' },
    { label: { es: 'QA y automatización', en: 'QA and automation' }, next: 'qa_automation', kind: 'secondary' },
    { label: { es: 'IA aplicada', en: 'Applied AI' }, next: 'ai_work', kind: 'secondary' },
    { label: { es: 'Por qué contratarlo', en: 'Why hire him' }, next: 'why_hire', kind: 'secondary' },
    { label: { es: 'Contacto', en: 'Contact' }, next: 'contact', kind: 'secondary' },
  ];
}

function projectOptions() {
  return [
    { label: { es: 'Volver a proyectos', en: 'Back to projects' }, next: 'projects', kind: 'back' },
    { label: { es: 'Volver con Aru', en: 'Back with Aru' }, next: 'home', kind: 'back' },
  ];
}

export const deepGuideNodes = {
  home: {
    id: 'home',
    title: { es: 'Inicio', en: 'Home' },
    statusLabel: { es: 'Lista', en: 'Ready' },
    companionLine: {
      es: 'Aru guía el portfolio principal de Kendall.',
      en: 'Aru guides Kendall’s main portfolio.',
    },
    action: 'home',
    message: {
      es: 'Soy Aru ✨ La guía local del portfolio principal de Kendall. Puedo explicar su perfil, proyectos, experiencia, skills, formación, certificaciones y contacto profesional.',
      en: 'I am Aru ✨ The local guide for Kendall’s main portfolio. I can explain his profile, projects, experience, skills, education, certifications, and professional contact channels.',
    },
    summary: {
      es: 'Todo lo que explico viene de la base local del proyecto. Si un dato no está registrado, no lo invento.',
      en: 'Everything I explain comes from the project’s local knowledge base. If a detail is not registered, I do not invent it.',
    },
    emotion: 'happy',
    expression: 'G',
    badges: {
      es: ['PNGTuber web', 'Guía local', 'Sin backend', 'Sin IA externa', 'Portfolio principal'],
      en: ['Web PNGTuber', 'Local guide', 'No backend', 'No external AI', 'Main portfolio'],
    },
    sections: [
      {
        title: { es: 'Cómo usarme', en: 'How to use me' },
        items: [
          {
            es: 'Usa las opciones para explorar proyectos, experiencia, QA, IA aplicada o contacto.',
            en: 'Use the options to explore projects, experience, QA, applied AI, or contact.',
          },
          {
            es: 'Escribe una búsqueda local si quieres ir directo a un proyecto, tecnología o tema.',
            en: 'Type a local search if you want to jump directly to a project, technology, or topic.',
          },
          {
            es: 'Esta guía no llama a servicios externos y no usa un modelo generativo activo.',
            en: 'This guide does not call external services and does not use an active generative model.',
          },
        ],
      },
    ],
    links: [
      { label: { es: 'Volver al portfolio', en: 'Back to portfolio' }, url: OFFICIAL_LINKS.portfolio, action: 'portfolio' },
      { label: { es: 'GitHub de Kendall', en: 'Kendall’s GitHub' }, url: OFFICIAL_LINKS.github },
      { label: { es: 'Repositorio de Aru', en: 'Aru repository' }, url: OFFICIAL_LINKS.aruRepo },
    ],
    searchKeywords: ['inicio', 'home', 'menu', 'ayuda', 'aru', 'asistente', 'guia', 'guía', 'profundo', 'portfolio'],
    options: [
      { label: { es: 'Resumen profundo de Kendall', en: 'Kendall deep summary' }, next: 'deep_summary', kind: 'primary' },
      { label: { es: 'Explícame sus proyectos en detalle', en: 'Explain his projects in detail' }, next: 'projects', kind: 'primary' },
      { label: { es: 'Qué tecnologías domina', en: 'Technologies he uses' }, next: 'skills', kind: 'primary' },
      { label: { es: 'Cómo trabaja en QA', en: 'How he works in QA' }, next: 'qa_automation', kind: 'secondary' },
      { label: { es: 'Cómo trabaja con IA', en: 'How he works with AI' }, next: 'ai_work', kind: 'secondary' },
      { label: { es: 'Contacto', en: 'Contact' }, next: 'contact', kind: 'secondary' },
    ],
  },

  deep_summary: {
    id: 'deep_summary',
    title: { es: 'Resumen profundo de Kendall', en: 'Kendall deep summary' },
    statusLabel: { es: 'Perfil profundo', en: 'Deep profile' },
    companionLine: {
      es: 'Perfil con contexto, no solo lista de skills.',
      en: 'Profile with context, not only a list of skills.',
    },
    action: 'explainFocus',
    message: {
      es: 'Kendall Valverde Díaz es un Software Engineer de Costa Rica especializado en AI-Augmented Development, desarrollo fullstack, frontend moderno, QA Automation y agentes con IA generativa.',
      en: 'Kendall Valverde Díaz is a Software Engineer from Costa Rica specialized in AI-Augmented Development, fullstack development, modern frontend, QA Automation, and generative AI agents.',
    },
    summary: {
      es: 'Su perfil mezcla producto, calidad, automatización, backend, frontend e IA aplicada. La diferencia está en que sus proyectos públicos muestran código, arquitectura y decisiones técnicas verificables.',
      en: 'His profile combines product thinking, quality, automation, backend, frontend, and applied AI. The difference is that his public projects show code, architecture, and verifiable technical decisions.',
    },
    emotion: 'happy',
    expression: 'G',
    badges: ['React', 'TypeScript', 'Node.js', 'QA Automation', 'RAG', 'DevOps'],
    sections: [
      {
        title: { es: 'Qué significa su enfoque', en: 'What his focus means' },
        items: [
          {
            es: 'Construye aplicaciones web fullstack con React, TypeScript, Node.js, Express y NestJS.',
            en: 'He builds fullstack web applications with React, TypeScript, Node.js, Express, and NestJS.',
          },
          {
            es: 'Aplica IA generativa en proyectos concretos: RAG, embeddings, Function Calling, agentes y asistentes virtuales.',
            en: 'He applies generative AI in concrete projects: RAG, embeddings, Function Calling, agents, and virtual assistants.',
          },
          {
            es: 'Viene de una base fuerte en QA Automation, con Playwright, Postman, CI/CD y documentación funcional.',
            en: 'He comes from a strong QA Automation base with Playwright, Postman, CI/CD, and functional documentation.',
          },
        ],
      },
      {
        title: { es: 'Lo que demuestra profesionalmente', en: 'What he demonstrates professionally' },
        items: [
          {
            es: 'Puede pensar en producto, no solo en pantallas.',
            en: 'He can think in terms of product, not only screens.',
          },
          {
            es: 'Puede automatizar calidad y conectar pruebas con flujos reales.',
            en: 'He can automate quality and connect testing with real workflows.',
          },
          {
            es: 'Puede diseñar demos públicas sin exponer secretos ni depender de servicios externos innecesarios.',
            en: 'He can design public demos without exposing secrets or depending on unnecessary external services.',
          },
        ],
      },
    ],
    links: [
      { label: { es: 'GitHub de Kendall', en: 'Kendall’s GitHub' }, url: OFFICIAL_LINKS.github },
    ],
    searchKeywords: ['kendall', 'quien', 'perfil', 'sobre', 'resumen', 'software engineer', 'historia', 'contexto'],
    options: baseOptions(),
  },

  projects: {
    id: 'projects',
    title: { es: 'Proyectos en detalle', en: 'Projects in detail' },
    statusLabel: { es: 'Proyectos', en: 'Projects' },
    companionLine: {
      es: 'Los proyectos muestran cómo trabaja Kendall.',
      en: 'The projects show how Kendall works.',
    },
    action: 'deepProjects',
    message: {
      es: 'Aquí los proyectos se explican como evidencia técnica: qué problema resuelven, qué flujo tienen, qué arquitectura usan y qué demuestran de Kendall.',
      en: 'Here the projects are explained as technical evidence: what problem they solve, what flow they have, what architecture they use, and what they demonstrate about Kendall.',
    },
    emotion: 'happy',
    expression: 'G',
    badges: ['IA aplicada', 'QA Automation', 'Fullstack', 'DevOps', 'Producto'],
    sections: [
      {
        title: { es: 'Mapa de lectura', en: 'Reading map' },
        items: [
          {
            es: 'DocuMente demuestra RAG fullstack, documentos, embeddings, fuentes y arquitectura.',
            en: 'DocuMente demonstrates fullstack RAG, documents, embeddings, sources, and architecture.',
          },
          {
            es: 'QAPilot demuestra QA Automation con IA, Playwright, análisis de fallos y reportes.',
            en: 'QAPilot demonstrates AI-assisted QA Automation, Playwright, failure analysis, and reports.',
          },
          {
            es: 'Aru demuestra portfolio interactivo, PNGTuber web, UI/UX con personalidad y guía local.',
            en: 'Aru demonstrates an interactive portfolio, web PNGTuber, UI/UX with personality, and a local guide.',
          },
        ],
      },
    ],
    searchKeywords: ['proyecto', 'proyectos', 'detalle', 'trabajos', 'portfolio', 'repositorio', 'demo', 'documente', 'qapilot', 'openai bot', 'aru'],
    options: [
      { label: { es: 'DocuMente', en: 'DocuMente' }, next: 'project_documente', kind: 'primary' },
      { label: { es: 'QAPilot', en: 'QAPilot' }, next: 'project_qapilot', kind: 'primary' },
      { label: { es: 'Aru Assistant / Aru Portfolio', en: 'Aru Assistant / Aru Portfolio' }, next: 'project_aru', kind: 'secondary' },
      { label: { es: 'OpenAI Chatbot Fullstack', en: 'OpenAI Chatbot Fullstack' }, next: 'project_openai_bot', kind: 'secondary' },
      { label: { es: 'Sistema de Recursos Humanos', en: 'Human Resources System' }, next: 'project_hr_system', kind: 'secondary' },
      { label: { es: 'Infraestructura AWS/Terraform', en: 'AWS/Terraform Infrastructure' }, next: 'project_infra', kind: 'secondary' },
      { label: { es: 'Volver con Aru', en: 'Back with Aru' }, next: 'home', kind: 'back' },
    ],
  },

  project_documente: {
    id: 'project_documente',
    title: 'DocuMente',
    statusLabel: 'DocuMente',
    companionLine: {
      es: 'RAG fullstack explicado sin humo.',
      en: 'Fullstack RAG explained without smoke.',
    },
    action: 'deepAI',
    message: {
      es: 'DocuMente es un sistema RAG fullstack para subir documentos PDF/TXT, procesarlos, recuperar fragmentos relevantes y responder preguntas con fuentes citables.',
      en: 'DocuMente is a fullstack RAG system for uploading PDF/TXT documents, processing them, retrieving relevant fragments, and answering questions with citable sources.',
    },
    summary: {
      es: 'Lo importante no es solo que usa IA: el proyecto conecta frontend, backend, documentos, búsqueda semántica, seguridad, Docker y CI/CD en una experiencia completa.',
      en: 'The important part is not only that it uses AI: the project connects frontend, backend, documents, semantic search, security, Docker, and CI/CD in a complete experience.',
    },
    emotion: 'happy',
    expression: 'G',
    badges: ['React', 'Vite', 'Node.js', 'Express', 'SQLite', 'OpenAI API', 'RAG', 'Docker'],
    sections: [
      {
        title: { es: 'Problema que resuelve', en: 'Problem it solves' },
        items: [
          {
            es: 'Permite consultar información dentro de documentos en vez de leerlos manualmente.',
            en: 'It lets users query information inside documents instead of reading them manually.',
          },
          {
            es: 'Responde con contexto recuperado desde chunks y fuentes, evitando respuestas libres sin respaldo.',
            en: 'It answers with context retrieved from chunks and sources, avoiding unsupported free-form answers.',
          },
          {
            es: 'Sirve para explorar documentos técnicos, reportes o bases internas en modo demo controlado.',
            en: 'It is useful for exploring technical documents, reports, or internal knowledge in a controlled demo mode.',
          },
        ],
      },
      {
        title: { es: 'Cómo funciona', en: 'How it works' },
        items: [
          {
            es: 'Carga documentos PDF/TXT, extrae y sanitiza texto, luego lo divide en chunks con overlap para conservar contexto.',
            en: 'It uploads PDF/TXT documents, extracts and sanitizes text, then splits it into overlapping chunks to preserve context.',
          },
          {
            es: 'Genera embeddings con OpenAI y recupera fragmentos usando similitud coseno.',
            en: 'It generates embeddings with OpenAI and retrieves fragments using cosine similarity.',
          },
          {
            es: 'El RAGAgent organiza skills como searchDocuments, generateAnswer, summarizeDocument y extractKeywords.',
            en: 'The RAGAgent organizes skills such as searchDocuments, generateAnswer, summarizeDocument, and extractKeywords.',
          },
        ],
      },
      {
        title: { es: 'Stack y arquitectura', en: 'Stack and architecture' },
        items: [
          {
            es: 'Frontend con React, Vite, TailwindCSS y Zustand.',
            en: 'Frontend with React, Vite, TailwindCSS, and Zustand.',
          },
          {
            es: 'Backend con Node.js, Express, JWT, SQLite, NDJSON y API documentada.',
            en: 'Backend with Node.js, Express, JWT, SQLite, NDJSON, and documented API.',
          },
          {
            es: 'Docker y GitHub Actions para empaquetado, validación y flujo de entrega.',
            en: 'Docker and GitHub Actions for packaging, validation, and delivery flow.',
          },
        ],
      },
      {
        title: { es: 'Seguridad, calidad y testing', en: 'Security, quality, and testing' },
        items: [
          {
            es: 'Usa autenticación JWT y persistencia SQLite en la arquitectura registrada.',
            en: 'It uses JWT authentication and SQLite persistence in the registered architecture.',
          },
          {
            es: 'El modo demo del portfolio evita consumir servicios reales o exponer secretos.',
            en: 'The portfolio demo mode avoids consuming real services or exposing secrets.',
          },
          {
            es: 'Demuestra documentación, separación de responsabilidades y un flujo RAG verificable.',
            en: 'It demonstrates documentation, separation of responsibilities, and a verifiable RAG flow.',
          },
        ],
      },
      {
        title: { es: 'Qué demuestra de Kendall', en: 'What it demonstrates about Kendall' },
        items: [
          {
            es: 'RAG real aplicado a documentos, no solo un chatbot genérico.',
            en: 'Real RAG applied to documents, not just a generic chatbot.',
          },
          {
            es: 'Capacidad de diseñar producto fullstack con IA, seguridad y UX entendible.',
            en: 'Ability to design a fullstack AI product with security and understandable UX.',
          },
        ],
      },
    ],
    links: [
      { label: { es: 'Demo', en: 'Demo' }, url: OFFICIAL_LINKS.documenteDemo },
      { label: { es: 'Repositorio', en: 'Repository' }, url: OFFICIAL_LINKS.documenteRepo },
    ],
    searchKeywords: ['documente', 'docu mente', 'rag', 'pdf', 'txt', 'embeddings', 'chunks', 'fuentes', 'documentos', 'chat con documentos'],
    options: projectOptions(),
  },

  project_qapilot: {
    id: 'project_qapilot',
    title: 'QAPilot',
    statusLabel: 'QAPilot',
    companionLine: {
      es: 'QA Automation con enfoque de agente local-first.',
      en: 'QA Automation with a local-first agent approach.',
    },
    action: 'deepQA',
    message: {
      es: 'QAPilot es una plataforma local-first que convierte requerimientos funcionales en casos de prueba, genera pruebas UI/API, ejecuta pruebas con Playwright, analiza fallos con IA y genera reportes HTML, PDF y JSON.',
      en: 'QAPilot is a local-first platform that turns functional requirements into test cases, generates UI/API tests, runs Playwright tests, analyzes failures with AI, and generates HTML, PDF, and JSON reports.',
    },
    summary: {
      es: 'La idea central es llevar IA al trabajo QA sin perder control: requerimientos, casos, ejecución, análisis y reportes dentro de un flujo auditable.',
      en: 'The core idea is to bring AI into QA work without losing control: requirements, cases, execution, analysis, and reports inside an auditable flow.',
    },
    emotion: 'happy',
    expression: 'G',
    badges: ['React 19', 'TypeScript', 'Node.js', 'OpenAI API', 'Playwright', 'SQLite', 'Docker', 'AES-256-GCM'],
    sections: [
      {
        title: { es: 'Problema que resuelve', en: 'Problem it solves' },
        items: [
          {
            es: 'Reduce fricción al convertir requerimientos funcionales en casos de prueba claros.',
            en: 'It reduces friction when turning functional requirements into clear test cases.',
          },
          {
            es: 'Ayuda a equipos QA a pasar de documentación manual a ejecución y reportabilidad.',
            en: 'It helps QA teams move from manual documentation to execution and reporting.',
          },
          {
            es: 'Sirve como herramienta interna para ciclos de calidad más trazables.',
            en: 'It works as an internal tool for more traceable quality cycles.',
          },
        ],
      },
      {
        title: { es: 'Cómo funciona', en: 'How it works' },
        items: [
          {
            es: 'Toma requerimientos, genera casos, prepara pruebas UI/API y muestra progreso con SSE.',
            en: 'It takes requirements, generates cases, prepares UI/API tests, and shows progress with SSE.',
          },
          {
            es: 'Ejecuta pruebas con Playwright y usa IA para ayudar a analizar fallos.',
            en: 'It runs tests with Playwright and uses AI to help analyze failures.',
          },
          {
            es: 'Exporta evidencia en reportes HTML, PDF y JSON.',
            en: 'It exports evidence through HTML, PDF, and JSON reports.',
          },
        ],
      },
      {
        title: { es: 'Stack y arquitectura', en: 'Stack and architecture' },
        items: [
          {
            es: 'React 19, TypeScript, Node.js, SQLite, Docker, Playwright y OpenAI API.',
            en: 'React 19, TypeScript, Node.js, SQLite, Docker, Playwright, and OpenAI API.',
          },
          {
            es: 'Modelo local-first: la credencial del proveedor pertenece al usuario.',
            en: 'Local-first model: the provider credential belongs to the user.',
          },
          {
            es: 'La base registra cifrado AES-256-GCM y enfoque de seguridad para datos sensibles.',
            en: 'The local base registers AES-256-GCM encryption and a security approach for sensitive data.',
          },
        ],
      },
      {
        title: { es: 'Seguridad, calidad y decisiones técnicas', en: 'Security, quality, and technical decisions' },
        items: [
          {
            es: 'La base documenta prácticas como Helmet, CORS, Zod, prevención SSRF y consultas parametrizadas cuando aplica.',
            en: 'The base documents practices such as Helmet, CORS, Zod, SSRF prevention, and parameterized queries when applicable.',
          },
          {
            es: 'La salida por reportes permite revisar resultados sin depender de una interfaz efímera.',
            en: 'Report outputs make results reviewable beyond a temporary interface.',
          },
        ],
      },
      {
        title: { es: 'Qué demuestra de Kendall', en: 'What it demonstrates about Kendall' },
        items: [
          {
            es: 'Experiencia real en QA Automation y conocimiento del SDLC.',
            en: 'Real QA Automation experience and SDLC knowledge.',
          },
          {
            es: 'Capacidad de diseñar herramientas internas donde IA, seguridad y testing trabajan juntas.',
            en: 'Ability to design internal tools where AI, security, and testing work together.',
          },
        ],
      },
    ],
    links: [
      { label: { es: 'Repositorio', en: 'Repository' }, url: OFFICIAL_LINKS.qapilotRepo },
    ],
    searchKeywords: ['qapilot', 'qa pilot', 'qaagent', 'testing', 'playwright', 'casos de prueba', 'fallos', 'reportes', 'automatizacion qa'],
    options: projectOptions(),
  },

  project_aru: {
    id: 'project_aru',
    title: 'Aru Assistant / Aru Portfolio',
    statusLabel: 'Aru',
    companionLine: {
      es: 'Aru es el portfolio principal, no una companion de otro sitio.',
      en: 'Aru is the main portfolio, not a companion for another site.',
    },
    action: 'explainFocus',
    message: {
      es: 'Aru es el portfolio interactivo principal de Kendall y una asistente PNGTuber web con experiencia anime/chibi, guía profunda local, ES/EN y estados visuales.',
      en: 'Aru is Kendall’s main interactive portfolio and a web PNGTuber assistant with an anime/chibi experience, deep local guide, ES/EN support, and visual states.',
    },
    summary: {
      es: 'El proyecto está hecho con React + Vite y GitHub Pages. El portfolio y la guía funcionan como experiencia estática con datos locales.',
      en: 'The project is built with React + Vite and GitHub Pages. The portfolio and guide work as a static experience with local data.',
    },
    emotion: 'happy',
    expression: 'G',
    badges: ['React', 'Vite', 'GitHub Pages', 'PNGTuber web', 'ES/EN', 'Local guide'],
    sections: [
      {
        title: { es: 'Qué es el proyecto', en: 'What the project is' },
        items: [
          {
            es: 'Portfolio principal de Kendall con Aru como personaje protagonista.',
            en: 'Kendall’s main portfolio with Aru as the main character.',
          },
          {
            es: 'Asistente PNGTuber con expresiones A-K, seguimiento del mouse, parpadeo, moods y reacción de enojo por clics.',
            en: 'PNGTuber assistant with A-K expressions, mouse tracking, blinking, moods, and click-rage behavior.',
          },
          {
            es: 'Guía profunda local en guia.html para explicar perfil, proyectos, experiencia, skills y contacto.',
            en: 'Deep local guide in guia.html to explain profile, projects, experience, skills, and contact.',
          },
        ],
      },
      {
        title: { es: 'Flujo principal', en: 'Main flow' },
        items: [
          {
            es: 'portfolio.html presenta secciones interactivas: Sobre mí, Skills, Experiencia, Proyectos, Certificaciones y Contacto.',
            en: 'portfolio.html presents interactive sections: About me, Skills, Experience, Projects, Certifications, and Contact.',
          },
          {
            es: 'guia.html funciona como exploración conversacional local con botones, búsqueda y memoria local.',
            en: 'guia.html works as a local conversational exploration with buttons, search, and local memory.',
          },
          {
            es: 'index.html queda como redirect/alias para que GitHub Pages abra el portfolio desde /Aru/.',
            en: 'index.html remains as a redirect/alias so GitHub Pages opens the portfolio from /Aru/.',
          },
        ],
      },
      {
        title: { es: 'Decisiones técnicas importantes', en: 'Important technical decisions' },
        items: [
          {
            es: 'Datos controlados desde archivos locales, sin exponer secretos ni depender de servicios remotos.',
            en: 'Data controlled from local files, without exposing secrets or depending on remote services.',
          },
          {
            es: 'Sistema de acciones, SFX locales, loading anime/chibi y reacción salada/unfortunate.',
            en: 'Action system, local SFX, anime/chibi loading, and salada/unfortunate reaction.',
          },
          {
            es: 'Hard lock cuando Aru se enoja demasiado: el usuario debe refrescar para recuperar la UI.',
            en: 'Hard lock when Aru gets too angry: the user must refresh to recover the UI.',
          },
        ],
      },
      {
        title: { es: 'Qué demuestra de Kendall', en: 'What it demonstrates about Kendall' },
        items: [
          {
            es: 'UI/UX con personalidad y marca técnica no genérica.',
            en: 'UI/UX with personality and a non-generic technical brand.',
          },
          {
            es: 'React componentizado, estado visual, animaciones y responsive orientado a producto.',
            en: 'Componentized React, visual state, animations, and product-focused responsiveness.',
          },
        ],
      },
    ],
    links: [
      { label: { es: 'Abrir portfolio', en: 'Open portfolio' }, url: OFFICIAL_LINKS.portfolio, action: 'portfolio' },
      { label: { es: 'Repositorio de Aru', en: 'Aru repository' }, url: OFFICIAL_LINKS.aruRepo },
    ],
    searchKeywords: ['aru', 'assistant', 'asistente', 'pngtuber', 'guia local', 'portfolio', 'portafolio', 'modo avatar'],
    options: projectOptions(),
  },

  project_openai_bot: {
    id: 'project_openai_bot',
    title: 'OpenAI Chatbot Fullstack',
    statusLabel: 'OpenAI Bot',
    companionLine: {
      es: 'Separación frontend/backend para IA conversacional.',
      en: 'Frontend/backend separation for conversational AI.',
    },
    action: 'deepAI',
    message: {
      es: 'OpenAI Chatbot Fullstack es una aplicación con frontend React y backend NestJS para chat conversacional, comparativa de modelos y visión de imagen a texto.',
      en: 'OpenAI Chatbot Fullstack is an application with a React frontend and NestJS backend for conversational chat, model comparison, and image-to-text vision.',
    },
    summary: {
      es: 'Demuestra integración de OpenAI API, endpoints REST, separación por capas y una UI moderna para probar flujos conversacionales.',
      en: 'It demonstrates OpenAI API integration, REST endpoints, layered separation, and a modern UI for testing conversational flows.',
    },
    emotion: 'happy',
    expression: 'G',
    badges: ['React', 'TypeScript', 'Vite', 'NestJS', 'REST', 'OpenAI API', 'Vision'],
    sections: [
      {
        title: { es: 'Problema que resuelve', en: 'Problem it solves' },
        items: [
          {
            es: 'Permite probar conversación con modelos de IA desde una interfaz web.',
            en: 'It enables AI model conversation testing from a web interface.',
          },
          {
            es: 'Organiza una separación clara entre UI, backend y consumo de proveedor IA.',
            en: 'It organizes a clear separation between UI, backend, and AI provider consumption.',
          },
        ],
      },
      {
        title: { es: 'Cómo funciona', en: 'How it works' },
        items: [
          {
            es: 'Frontend React/TypeScript/Vite para interacción conversacional.',
            en: 'React/TypeScript/Vite frontend for conversational interaction.',
          },
          {
            es: 'Backend NestJS que encapsula endpoints y comunicación con OpenAI API.',
            en: 'NestJS backend encapsulating endpoints and OpenAI API communication.',
          },
          {
            es: 'Incluye comparativa de modelos y flujo de visión / image-to-text cuando está registrado en la base.',
            en: 'Includes model comparison and vision / image-to-text flow when registered in the base.',
          },
        ],
      },
      {
        title: { es: 'Qué demuestra de Kendall', en: 'What it demonstrates about Kendall' },
        items: [
          {
            es: 'Integración frontend/backend con IA sin mezclar responsabilidades.',
            en: 'Frontend/backend AI integration without mixing responsibilities.',
          },
          {
            es: 'Criterio para diseñar UI conversacional y API separada.',
            en: 'Judgment for designing conversational UI and a separate API.',
          },
        ],
      },
    ],
    links: [
      { label: 'Frontend', url: OFFICIAL_LINKS.openAiBotFrontend },
      { label: 'Backend', url: OFFICIAL_LINKS.openAiBotBackend },
    ],
    searchKeywords: ['openai bot', 'openai chatbot', 'chatbot fullstack', 'vision', 'nest', 'nestjs', 'modelos'],
    options: projectOptions(),
  },

  project_hr_system: {
    id: 'project_hr_system',
    title: { es: 'Sistema de Recursos Humanos', en: 'Human Resources System' },
    statusLabel: { es: 'RRHH', en: 'HR' },
    companionLine: {
      es: 'Fullstack aplicado a un proceso real.',
      en: 'Fullstack applied to a real process.',
    },
    action: 'explainFocus',
    message: {
      es: 'El Sistema de Recursos Humanos es un sistema fullstack para Fundación Centro VRAI enfocado en nómina, expedientes, vacaciones, permisos, incapacidades, reportes y panel administrativo.',
      en: 'The Human Resources System is a fullstack system for Fundación Centro VRAI focused on payroll, employee records, vacation, permissions, sick leave, reports, and an admin dashboard.',
    },
    summary: {
      es: 'Según la base local, reemplazó una operación 100% en papel y redujo el tiempo administrativo un 80%.',
      en: 'According to the local knowledge base, it replaced a 100% paper-based operation and reduced administrative time by 80%.',
    },
    emotion: 'happy',
    expression: 'G',
    badges: ['React', 'TypeScript', 'Node.js', 'MySQL', 'Jest', 'Postman'],
    sections: [
      {
        title: { es: 'Problema que resuelve', en: 'Problem it solves' },
        items: [
          {
            es: 'Digitaliza procesos internos de RRHH que antes dependían de papel.',
            en: 'It digitizes internal HR processes that previously depended on paper.',
          },
          {
            es: 'Centraliza expedientes, vacaciones, permisos, incapacidades, reportes y nómina.',
            en: 'It centralizes employee records, vacation, permissions, sick leave, reports, and payroll.',
          },
          {
            es: 'Sirve a una organización que necesita administrar información laboral con menos fricción.',
            en: 'It serves an organization that needs to manage employee information with less friction.',
          },
        ],
      },
      {
        title: { es: 'Flujo principal', en: 'Main flow' },
        items: [
          {
            es: 'Usuarios administrativos consultan y actualizan expedientes desde un panel.',
            en: 'Administrative users consult and update records from a dashboard.',
          },
          {
            es: 'El sistema organiza reportes y estados de procesos internos.',
            en: 'The system organizes reports and internal process statuses.',
          },
        ],
      },
      {
        title: { es: 'Qué demuestra de Kendall', en: 'What it demonstrates about Kendall' },
        items: [
          {
            es: 'Software útil para procesos reales, no solo una demo visual.',
            en: 'Useful software for real processes, not only a visual demo.',
          },
          {
            es: 'Fullstack práctico con React, TypeScript, Node.js, MySQL, Jest y Postman.',
            en: 'Practical fullstack work with React, TypeScript, Node.js, MySQL, Jest, and Postman.',
          },
          {
            es: 'Impacto operativo registrado: menos papel y 80% menos tiempo administrativo.',
            en: 'Registered operational impact: less paper and 80% less administrative time.',
          },
        ],
      },
    ],
    links: [
      { label: { es: 'Repositorio', en: 'Repository' }, url: OFFICIAL_LINKS.hrRepo },
    ],
    searchKeywords: ['recursos humanos', 'rrhh', 'nomina', 'nómina', 'expedientes', 'fundacion', 'fundación', 'centro vrai', 'mysql'],
    options: projectOptions(),
  },

  project_infra: {
    id: 'project_infra',
    title: { es: 'Infraestructura AWS/Terraform', en: 'AWS/Terraform Infrastructure' },
    statusLabel: 'DevOps',
    companionLine: {
      es: 'Infraestructura reproducible, no despliegue manual improvisado.',
      en: 'Reproducible infrastructure, not improvised manual deployment.',
    },
    action: 'deepDevops',
    message: {
      es: 'Este proyecto muestra infraestructura como código con Terraform, AWS, Docker y CI/CD para provisionar recursos reproducibles y desplegar una API containerizada.',
      en: 'This project shows infrastructure as code with Terraform, AWS, Docker, and CI/CD to provision reproducible resources and deploy a containerized API.',
    },
    summary: {
      es: 'Incluye VPC personalizada, EC2 t3.micro, subnets pública y privada, Security Groups, Elastic IP e IAM con mínimos privilegios.',
      en: 'It includes a custom VPC, EC2 t3.micro, public and private subnets, Security Groups, Elastic IP, and IAM with least privilege.',
    },
    emotion: 'happy',
    expression: 'G',
    badges: ['Terraform', 'AWS', 'Docker', 'GitHub Actions', 'Flask', 'Python', 'Gunicorn', 'pytest'],
    sections: [
      {
        title: { es: 'Problema que resuelve', en: 'Problem it solves' },
        items: [
          {
            es: 'Evita configurar infraestructura manualmente y permite recrear entornos de forma controlada.',
            en: 'It avoids manual infrastructure setup and allows environments to be recreated in a controlled way.',
          },
          {
            es: 'Sirve para demostrar despliegues reproducibles, seguridad de red y automatización CI/CD.',
            en: 'It demonstrates reproducible deployments, network security, and CI/CD automation.',
          },
        ],
      },
      {
        title: { es: 'Stack y arquitectura', en: 'Stack and architecture' },
        items: [
          {
            es: 'Terraform para VPC, subnets, EC2, Security Groups, Elastic IP e IAM.',
            en: 'Terraform for VPC, subnets, EC2, Security Groups, Elastic IP, and IAM.',
          },
          {
            es: 'Docker, GitHub Actions, Flask/Python, Gunicorn y pytest en el flujo registrado.',
            en: 'Docker, GitHub Actions, Flask/Python, Gunicorn, and pytest in the registered flow.',
          },
          {
            es: 'La base registra remote state S3 cifrado cuando aplica.',
            en: 'The base registers encrypted S3 remote state when applicable.',
          },
        ],
      },
      {
        title: { es: 'Qué demuestra de Kendall', en: 'What it demonstrates about Kendall' },
        items: [
          {
            es: 'Criterio DevOps, reproducibilidad y separación entre aplicación e infraestructura.',
            en: 'DevOps judgment, reproducibility, and separation between application and infrastructure.',
          },
          {
            es: 'Atención a seguridad con IAM de mínimos privilegios y red segmentada.',
            en: 'Security awareness with least-privilege IAM and segmented networking.',
          },
        ],
      },
    ],
    links: [
      { label: { es: 'Repositorio', en: 'Repository' }, url: OFFICIAL_LINKS.infraRepo },
    ],
    searchKeywords: ['terraform', 'aws', 'devops', 'infraestructura', 'docker', 'github actions', 'ec2', 'vpc', 'flask'],
    options: projectOptions(),
  },

  skills: {
    id: 'skills',
    title: { es: 'Tecnologías que domina', en: 'Technologies he uses' },
    statusLabel: 'Skills',
    companionLine: {
      es: 'Estas habilidades vienen de proyectos reales.',
      en: 'These skills come from real projects.',
    },
    action: 'deepSkills',
    message: {
      es: 'Kendall trabaja con frontend moderno, backend y APIs, IA aplicada, QA Automation, DevOps, cloud y bases de datos relacionales.',
      en: 'Kendall works with modern frontend, backend and APIs, applied AI, QA Automation, DevOps, cloud, and relational databases.',
    },
    summary: {
      es: 'La diferencia está en cómo combina esas áreas: React/TypeScript para producto, Node/Nest para APIs, Playwright para QA, y RAG/agentes para IA aplicada.',
      en: 'The difference is how he combines those areas: React/TypeScript for product, Node/Nest for APIs, Playwright for QA, and RAG/agents for applied AI.',
    },
    badges: ['React', 'TypeScript', 'Node.js', 'OpenAI API', 'Playwright', 'Docker', 'AWS'],
    sections: [
      { title: 'Frontend', items: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'TailwindCSS', 'Vite', 'Zustand', 'React Router', 'UI responsive'] },
      { title: { es: 'Backend y APIs', en: 'Backend and APIs' }, items: ['Node.js', 'Express', 'NestJS', 'REST APIs', 'GraphQL', 'JWT', 'CORS', 'Postman'] },
      { title: { es: 'IA y agentes', en: 'AI and agents' }, items: ['OpenAI API', 'Anthropic Claude SDK', 'RAG', 'Embeddings', 'Function Calling', 'Agentes con skills atómicas', 'Prompt Engineering'] },
      { title: { es: 'QA y Testing', en: 'QA and Testing' }, items: ['Playwright', 'Selenium', 'Jest', 'Vitest', 'pytest', 'Postman', 'Datos sintéticos', 'Jira', 'Scrum'] },
      { title: { es: 'DevOps y Cloud', en: 'DevOps and Cloud' }, items: ['Docker', 'Docker Compose', 'GitHub Actions', 'Terraform', 'AWS EC2', 'AWS VPC', 'AWS S3', 'AWS IAM', 'Gunicorn'] },
      { title: { es: 'Bases de datos', en: 'Databases' }, items: ['MySQL', 'SQL Server', 'SQLite', 'Consultas parametrizadas', 'Modelado relacional'] },
    ],
    options: [
      { label: { es: 'Ver proyectos relacionados', en: 'View related projects' }, next: 'projects', kind: 'primary' },
      { label: { es: 'QA y automatización', en: 'QA and automation' }, next: 'qa_automation', kind: 'secondary' },
      { label: { es: 'IA aplicada', en: 'Applied AI' }, next: 'ai_work', kind: 'secondary' },
      { label: { es: 'Volver con Aru', en: 'Back with Aru' }, next: 'home', kind: 'back' },
    ],
    searchKeywords: ['skill', 'skills', 'technology', 'technologies', 'stack', 'react', 'typescript', 'node', 'backend', 'frontend', 'docker', 'aws'],
  },

  qa_automation: {
    id: 'qa_automation',
    title: { es: 'QA y automatización', en: 'QA and automation' },
    statusLabel: 'QA',
    companionLine: {
      es: 'Kendall no solo prueba: automatiza y mejora procesos.',
      en: 'Kendall does not just test: he automates and improves processes.',
    },
    action: 'deepQA',
    message: {
      es: 'Kendall tiene experiencia fuerte en QA Automation. En Novacomp, para Davivienda Bank Costa Rica, implementó automatización con Playwright + TypeScript, integró CI/CD con GitHub Actions y redujo el ciclo de pruebas cerca de 40%.',
      en: 'Kendall has strong QA Automation experience. At Novacomp, for Davivienda Bank Costa Rica, he implemented automation with Playwright + TypeScript, integrated CI/CD with GitHub Actions, and reduced the testing cycle by around 40%.',
    },
    summary: {
      es: 'La base local también conecta esa experiencia con QAPilot, un proyecto que aplica IA a generación de casos, ejecución de pruebas y análisis de fallos.',
      en: 'The local knowledge base also connects that experience with QAPilot, a project that applies AI to test case generation, test execution, and failure analysis.',
    },
    sections: [
      {
        title: { es: 'Experiencia profesional', en: 'Professional experience' },
        items: [
          {
            es: 'QA Engineer / QA Lead en Novacomp para Davivienda Bank Costa Rica.',
            en: 'QA Engineer / QA Lead at Novacomp for Davivienda Bank Costa Rica.',
          },
          {
            es: 'Automatización con Playwright + TypeScript en staging aislado.',
            en: 'Automation with Playwright + TypeScript in an isolated staging environment.',
          },
          {
            es: 'Validación REST API en AWS usando Postman.',
            en: 'REST API validation on AWS using Postman.',
          },
        ],
      },
    ],
    links: [
      { label: { es: 'Ver QAPilot', en: 'View QAPilot' }, url: OFFICIAL_LINKS.qapilotRepo },
    ],
    options: [
      { label: { es: 'Ver QAPilot en detalle', en: 'View QAPilot in detail' }, next: 'project_qapilot', kind: 'primary' },
      { label: { es: 'Tecnologías que usa', en: 'Technologies he uses' }, next: 'skills', kind: 'secondary' },
      { label: { es: 'Volver con Aru', en: 'Back with Aru' }, next: 'home', kind: 'back' },
    ],
    searchKeywords: ['qa', 'automation', 'playwright', 'novacomp', 'davivienda', 'postman', 'testing', 'jira', 'scrum'],
  },

  ai_work: {
    id: 'ai_work',
    title: { es: 'IA aplicada', en: 'Applied AI' },
    statusLabel: 'AI',
    companionLine: {
      es: 'RAG, agentes y OpenAI API son parte de su enfoque actual.',
      en: 'RAG, agents, and OpenAI API are part of his current focus.',
    },
    action: 'deepAI',
    message: {
      es: 'Kendall aplica IA generativa en proyectos concretos: DocuMente usa RAG, embeddings y fuentes citables; QAPilot usa IA para transformar requerimientos en pruebas; OpenAI Chatbot integra chat y visión.',
      en: 'Kendall applies generative AI in concrete projects: DocuMente uses RAG, embeddings, and citable sources; QAPilot uses AI to transform requirements into tests; OpenAI Chatbot integrates chat and vision.',
    },
    summary: {
      es: 'Su enfoque AI-Augmented Development no es solo prompting: incluye agentes, Function Calling, embeddings, RAG, flujos SDLC y productos demostrables.',
      en: 'His AI-Augmented Development approach is not only prompting: it includes agents, Function Calling, embeddings, RAG, SDLC workflows, and demonstrable products.',
    },
    badges: ['OpenAI API', 'Anthropic SDK', 'RAG', 'Embeddings', 'Function Calling', 'Agents'],
    sections: [
      {
        title: { es: 'Cómo la aplica', en: 'How he applies it' },
        items: [
          {
            es: 'DocuMente: documentos, chunks, embeddings, recuperación semántica y fuentes.',
            en: 'DocuMente: documents, chunks, embeddings, semantic retrieval, and sources.',
          },
          {
            es: 'QAPilot: generación de casos, ejecución de pruebas, análisis de fallos y reportes.',
            en: 'QAPilot: test case generation, test execution, failure analysis, and reports.',
          },
          {
            es: 'OpenAI Chatbot: frontend React, backend NestJS, chat, visión y comparación de modelos.',
            en: 'OpenAI Chatbot: React frontend, NestJS backend, chat, vision, and model comparison.',
          },
        ],
      },
    ],
    options: [
      { label: { es: 'Ver DocuMente', en: 'View DocuMente' }, next: 'project_documente', kind: 'primary' },
      { label: { es: 'Ver QAPilot', en: 'View QAPilot' }, next: 'project_qapilot', kind: 'primary' },
      { label: { es: 'Ver OpenAI Bot', en: 'View OpenAI Bot' }, next: 'project_openai_bot', kind: 'secondary' },
      { label: { es: 'Volver con Aru', en: 'Back with Aru' }, next: 'home', kind: 'back' },
    ],
    searchKeywords: ['ai', 'ia', 'openai', 'anthropic', 'rag', 'embeddings', 'function calling', 'agents', 'prompt', 'sdlc'],
  },

  fullstack: {
    id: 'fullstack',
    title: 'Fullstack React/Node/TypeScript',
    statusLabel: 'Fullstack',
    companionLine: {
      es: 'Frontend y backend conectados con intención de producto.',
      en: 'Frontend and backend connected with product intent.',
    },
    action: 'explainFocus',
    message: {
      es: 'Kendall construye aplicaciones React + TypeScript, APIs REST/GraphQL y backends con Node.js, Express y NestJS.',
      en: 'Kendall builds React + TypeScript applications, REST/GraphQL APIs, and backends with Node.js, Express, and NestJS.',
    },
    summary: {
      es: 'DocuMente, OpenAI Bot y el Sistema RRHH muestran esa combinación de UI, API, datos, pruebas y despliegue.',
      en: 'DocuMente, OpenAI Bot, and the HR System show that combination of UI, API, data, tests, and deployment.',
    },
    options: [
      { label: { es: 'Ver proyectos', en: 'View projects' }, next: 'projects', kind: 'primary' },
      { label: { es: 'Ver skills', en: 'View skills' }, next: 'skills', kind: 'secondary' },
      { label: { es: 'Volver con Aru', en: 'Back with Aru' }, next: 'home', kind: 'back' },
    ],
    searchKeywords: ['fullstack', 'react', 'node', 'typescript', 'express', 'nestjs', 'api', 'graphql', 'rest'],
  },

  devops: {
    id: 'devops',
    title: { es: 'DevOps, AWS y CI/CD', en: 'DevOps, AWS, and CI/CD' },
    statusLabel: 'DevOps',
    companionLine: {
      es: 'Automatización más allá del frontend.',
      en: 'Automation beyond the frontend.',
    },
    action: 'deepDevops',
    message: {
      es: 'Kendall trabaja con Docker, Docker Compose, GitHub Actions, Terraform y AWS. Su proyecto de infraestructura automatizada muestra recursos reproducibles y despliegue containerizado.',
      en: 'Kendall works with Docker, Docker Compose, GitHub Actions, Terraform, and AWS. His automated infrastructure project shows reproducible resources and containerized deployment.',
    },
    options: [
      { label: { es: 'Infraestructura en detalle', en: 'Infrastructure in detail' }, next: 'project_infra', kind: 'primary' },
      { label: { es: 'Ver proyectos', en: 'View projects' }, next: 'projects', kind: 'secondary' },
      { label: { es: 'Volver con Aru', en: 'Back with Aru' }, next: 'home', kind: 'back' },
    ],
    searchKeywords: ['devops', 'aws', 'terraform', 'docker', 'github actions', 'ci cd', 'cicd', 'infrastructure'],
  },

  experience: {
    id: 'experience',
    title: { es: 'Experiencia profesional', en: 'Professional experience' },
    statusLabel: { es: 'Experiencia', en: 'Experience' },
    companionLine: {
      es: 'Experiencia real en QA, fullstack e IA aplicada.',
      en: 'Real experience in QA, fullstack, and applied AI.',
    },
    action: 'explainFocus',
    message: {
      es: 'La experiencia de Kendall combina QA Automation en un contexto bancario, liderazgo QA y desarrollo fullstack freelance para clientes en Costa Rica y Estados Unidos.',
      en: 'Kendall’s experience combines QA Automation in a banking context, QA leadership, and freelance fullstack development for clients in Costa Rica and the United States.',
    },
    sections: [
      {
        title: 'Novacomp / Davivienda Bank Costa Rica',
        items: [
          {
            es: 'QA Engineer / QA Lead entre 2025 y 2026.',
            en: 'QA Engineer / QA Lead between 2025 and 2026.',
          },
          {
            es: 'Automatización con Playwright + TypeScript en staging aislado.',
            en: 'Automation with Playwright + TypeScript in isolated staging.',
          },
          {
            es: 'CI/CD con GitHub Actions y reducción cercana al 40% en el ciclo de pruebas.',
            en: 'CI/CD with GitHub Actions and around 40% reduction in the testing cycle.',
          },
        ],
      },
      {
        title: { es: 'Fullstack freelance', en: 'Freelance fullstack' },
        items: [
          {
            es: 'Desarrollador fullstack desde 2023 para más de 10 clientes en Costa Rica y Estados Unidos.',
            en: 'Fullstack developer since 2023 for more than 10 clients in Costa Rica and the United States.',
          },
          {
            es: 'Aplicaciones React + TypeScript, APIs REST/GraphQL y backends Node/Express/NestJS.',
            en: 'React + TypeScript applications, REST/GraphQL APIs, and Node/Express/NestJS backends.',
          },
        ],
      },
    ],
    options: [
      { label: { es: 'QA y automatización', en: 'QA and automation' }, next: 'qa_automation', kind: 'primary' },
      { label: { es: 'Fullstack', en: 'Fullstack' }, next: 'fullstack', kind: 'secondary' },
      { label: { es: 'Contacto', en: 'Contact' }, next: 'contact', kind: 'secondary' },
      { label: { es: 'Volver con Aru', en: 'Back with Aru' }, next: 'home', kind: 'back' },
    ],
    searchKeywords: ['experience', 'experiencia', 'work', 'novacomp', 'davivienda', 'freelance', 'client', 'clients', 'qa', 'lead', 'bank'],
  },

  why_hire: {
    id: 'why_hire',
    title: { es: 'Por qué contratar a Kendall', en: 'Why hire Kendall' },
    statusLabel: { es: 'Contratar', en: 'Hire' },
    companionLine: {
      es: 'Razones concretas, sin exagerar.',
      en: 'Concrete reasons, without exaggerating.',
    },
    action: 'whyHire',
    message: {
      es: 'Kendall es un perfil híbrido entre fullstack, QA Automation e IA aplicada. Sus proyectos públicos permiten evaluar código, arquitectura, pensamiento de producto y criterio técnico.',
      en: 'Kendall is a hybrid profile across fullstack, QA Automation, and applied AI. His public projects make it possible to evaluate code, architecture, product thinking, and technical judgment.',
    },
    summary: {
      es: 'La razón más fuerte para considerarlo es la combinación: construye producto, automatiza calidad, aplica IA y entiende despliegue/DevOps.',
      en: 'The strongest reason to consider him is the combination: he builds product, automates quality, applies AI, and understands deployment/DevOps.',
    },
    badges: ['Fullstack', 'QA Automation', 'IA aplicada', 'DevOps', 'Proyectos públicos'],
    sections: [
      {
        title: { es: 'Fortalezas verificables', en: 'Verifiable strengths' },
        items: [
          {
            es: 'Proyectos públicos: Aru, DocuMente, QAPilot, OpenAI Bot, Sistema RRHH e infraestructura AWS/Terraform.',
            en: 'Public projects: Aru, DocuMente, QAPilot, OpenAI Bot, HR System, and AWS/Terraform infrastructure.',
          },
          {
            es: 'Experiencia QA en banca con Playwright, Postman y GitHub Actions.',
            en: 'QA experience in banking with Playwright, Postman, and GitHub Actions.',
          },
          {
            es: 'Stack moderno con React, TypeScript, Node.js, Docker, RAG y agentes.',
            en: 'Modern stack with React, TypeScript, Node.js, Docker, RAG, and agents.',
          },
        ],
      },
    ],
    links: [
      { label: { es: 'GitHub de Kendall', en: 'Kendall’s GitHub' }, url: OFFICIAL_LINKS.github },
      { label: 'LinkedIn', url: OFFICIAL_LINKS.linkedin },
    ],
    options: [
      { label: { es: 'Ver experiencia', en: 'View experience' }, next: 'experience', kind: 'primary' },
      { label: { es: 'Ver proyectos', en: 'View projects' }, next: 'projects', kind: 'secondary' },
      { label: { es: 'Contacto', en: 'Contact' }, next: 'contact', kind: 'secondary' },
      { label: { es: 'Volver con Aru', en: 'Back with Aru' }, next: 'home', kind: 'back' },
    ],
    searchKeywords: ['hire', 'contratar', 'why hire', 'reasons', 'difference', 'strengths', 'recruiter', 'opportunity'],
  },

  certifications: {
    id: 'certifications',
    title: { es: 'Formación y certificaciones', en: 'Education and certifications' },
    statusLabel: { es: 'Formación', en: 'Education' },
    companionLine: {
      es: 'Formación documentada en la base local.',
      en: 'Education documented in the local knowledge base.',
    },
    action: 'deepSkills',
    message: {
      es: 'Kendall registra formación académica y complementaria en Ingeniería en Sistemas, IA aplicada al SDLC y tecnologías clave para fullstack, QA y DevOps.',
      en: 'Kendall records academic and complementary education in Information Systems Engineering, AI applied to the SDLC, and key technologies for fullstack, QA, and DevOps.',
    },
    sections: [
      {
        title: { es: 'Formación académica', en: 'Academic education' },
        items: [
          {
            es: 'Bachillerato en Ingeniería en Sistemas de Información por la Universidad Internacional de las Américas.',
            en: 'Bachelor degree in Information Systems Engineering from Universidad Internacional de las Américas.',
          },
          {
            es: 'IA 360: Ingeniería del Software Aumentada con IA en Universidad CENFOTEC.',
            en: 'AI 360: AI-Augmented Software Engineering at Universidad CENFOTEC.',
          },
          {
            es: 'Inglés avanzado B2+ completado en CCCN.',
            en: 'Advanced English B2+ completed at CCCN.',
          },
        ],
      },
      {
        title: { es: 'Formación complementaria', en: 'Complementary education' },
        items: [
          {
            es: 'TypeScript, React, Node.js, NestJS, Playwright, Docker y MySQL.',
            en: 'TypeScript, React, Node.js, NestJS, Playwright, Docker, and MySQL.',
          },
          {
            es: 'La base local no registra una certificación oficial AWS; por eso Aru no debe afirmar una.',
            en: 'The local knowledge base does not register an official AWS certification; therefore Aru must not claim one.',
          },
        ],
      },
    ],
    options: [
      { label: { es: 'Ver skills', en: 'View skills' }, next: 'skills', kind: 'primary' },
      { label: { es: 'Por qué contratarlo', en: 'Why hire him' }, next: 'why_hire', kind: 'secondary' },
      { label: { es: 'Volver con Aru', en: 'Back with Aru' }, next: 'home', kind: 'back' },
    ],
    searchKeywords: ['certificacion', 'certificación', 'certifications', 'certificate', 'education', 'training', 'studies', 'university', 'cenfotec', 'uia', 'devtalles', 'udemy'],
  },

  contact: {
    id: 'contact',
    title: { es: 'Contacto y enlaces oficiales', en: 'Contact and official links' },
    statusLabel: { es: 'Contacto', en: 'Contact' },
    companionLine: {
      es: 'Canales públicos registrados.',
      en: 'Registered public channels.',
    },
    action: 'portfolio',
    message: {
      es: 'Puedes contactar a Kendall por sus canales públicos profesionales y volver al portfolio principal desde Aru.',
      en: 'You can contact Kendall through his public professional channels and return to the main portfolio from Aru.',
    },
    sections: [
      {
        title: { es: 'Canales públicos', en: 'Public channels' },
        items: [
          'GitHub: AruHonshou.',
          'LinkedIn: Kendall Valverde Díaz.',
          'Email profesional: kendallavd@gmail.com.',
          'WhatsApp público registrado: +506 8509-7920.',
        ],
      },
    ],
    links: [
      { label: { es: 'Volver al portfolio', en: 'Back to portfolio' }, url: OFFICIAL_LINKS.portfolio, action: 'portfolio' },
      { label: { es: 'GitHub de Kendall', en: 'Kendall’s GitHub' }, url: OFFICIAL_LINKS.github },
      { label: { es: 'Repositorio de Aru', en: 'Aru repository' }, url: OFFICIAL_LINKS.aruRepo },
      { label: 'LinkedIn', url: OFFICIAL_LINKS.linkedin },
      { label: 'Email', url: OFFICIAL_LINKS.email },
      { label: 'WhatsApp', url: OFFICIAL_LINKS.whatsapp },
    ],
    options: [
      { label: { es: 'Volver con Aru', en: 'Back with Aru' }, next: 'home', kind: 'back' },
    ],
    searchKeywords: ['contact', 'contacto', 'email', 'linkedin', 'github', 'portfolio', 'whatsapp'],
  },

  free_question: {
    id: 'free_question',
    title: { es: 'Búsqueda local', en: 'Local search' },
    statusLabel: { es: 'Búsqueda local', en: 'Local search' },
    companionLine: {
      es: 'Solo busco en mi base local.',
      en: 'I only search my local knowledge base.',
    },
    action: 'thinking',
    message: {
      es: 'También puedes buscar algo específico sobre Kendall. Prueba DocuMente, QAPilot, React, QA, IA, experiencia, contacto o Terraform.',
      en: 'You can also search for something specific about Kendall. Try DocuMente, QAPilot, React, QA, AI, experience, contact, or Terraform.',
    },
    options: [
      { label: { es: 'Ver proyectos', en: 'View projects' }, next: 'projects', kind: 'primary' },
      { label: { es: 'Ver skills', en: 'View skills' }, next: 'skills', kind: 'secondary' },
      { label: { es: 'Volver con Aru', en: 'Back with Aru' }, next: 'home', kind: 'back' },
    ],
    searchKeywords: ['ask', 'question', 'search', 'specific topic', 'specific', 'pregunta', 'buscar'],
  },

  not_found: {
    id: 'not_found',
    title: { es: 'Detalle no registrado', en: 'Detail not registered' },
    statusLabel: { es: 'Sin datos', en: 'No data' },
    companionLine: {
      es: 'Si no está en la base local, no lo invento.',
      en: 'If it is not in the local knowledge base, I do not invent it.',
    },
    action: 'notFound',
    message: {
      es: 'Mmm... no tengo ese detalle registrado. Puedo ayudarte con información pública sobre Kendall, sus proyectos, skills, experiencia, formación, certificaciones y contacto.',
      en: 'Hmm... I do not have that detail registered. I can help with public information about Kendall, his projects, skills, experience, education, certifications, and contact.',
    },
    options: [
      { label: { es: 'Resumen profundo', en: 'Deep summary' }, next: 'deep_summary', kind: 'primary' },
      { label: { es: 'Proyectos en detalle', en: 'Projects in detail' }, next: 'projects', kind: 'primary' },
      { label: { es: 'QA y automatización', en: 'QA and automation' }, next: 'qa_automation', kind: 'secondary' },
      { label: { es: 'Contacto', en: 'Contact' }, next: 'contact', kind: 'secondary' },
      { label: { es: 'Volver con Aru', en: 'Back with Aru' }, next: 'home', kind: 'back' },
    ],
  },
};

export const deepGuideMeta = {
  nodeCount: Object.keys(deepGuideNodes).length,
};
