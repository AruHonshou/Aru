const characters = [...document.querySelectorAll('.aru-character')];
const loadingScreen = document.querySelector('#loadingScreen');
const message = document.querySelector('#aruMessage');
const pills = [...document.querySelectorAll('.character-pill')];
const internalLinks = [...document.querySelectorAll('a[href^="#"]')];
const revealTargets = [...document.querySelectorAll('.manga-card, .project-card, .manga-panel, .contact-card')];
const languageToggle = document.querySelector('#languageToggle');
const metaDescription = document.querySelector('meta[name="description"]');

const ROWS = 5;
const COLS = 5;
const SHEETS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const DEFAULT_SHEET = 'A';
const FRAME_BASE = './slices2';

const expressionSheets = {
  default: 'A',
  skills: 'B',
  experiencia: 'D',
  proyectos: 'C',
  certificaciones: 'E',
  contacto: 'B',
  annoyed: 'G',
};

const translations = {
  es: {
    pageTitle: 'Aru Honshou | Portfolio',
    metaDescription: 'Portfolio anime/chibi de Kendall Valverde Díaz, AruHonshou: Software Engineer, AI-Augmented Development, Fullstack TypeScript y QA Automation.',
    loading: 'Loading',
    skip: 'Saltar al contenido',
    navVoice: 'ARU ASISTENTE VIRTUAL',
    heroEyebrow: 'Portfolio interactivo',
    heroTitle: 'Kendall Valverde Díaz crea software con IA y QA.',
    heroLead: 'Software Engineer especializado en AI-Augmented Development. 3+ años creando productos React, TypeScript y Node.js, con agentes IA, RAG y automatización QA.',
    heroProjects: 'Ver proyectos',
    heroContact: 'Hablemos',
    aruDefault: 'Elige una ruta y Aru cambia de gesto contigo.',
    pillSkills: 'Skills',
    pillExperience: 'Experiencia',
    pillProjects: 'Proyectos',
    pillCerts: 'Certificaciones',
    pillContact: 'Contacto',
    skillsEyebrow: 'Skill board',
    skillsTitle: 'Stack que combina producto, IA y calidad.',
    skillFrontendTag: 'Frontend',
    skillFrontendTitle: 'Interfaces modernas',
    skillFrontendText: 'React, TypeScript, JavaScript, HTML5, CSS3, Vite, TailwindCSS, Zustand y UI responsive para productos mantenibles.',
    skillBackendTag: 'Backend & APIs',
    skillBackendTitle: 'Servicios fullstack',
    skillBackendText: 'Node.js, Express, NestJS, REST, GraphQL, JWT y APIs documentadas con Postman para equipos distribuidos.',
    skillAiTag: 'AI Agents',
    skillAiTitle: 'IA aplicada',
    skillAiText: 'OpenAI API, Anthropic SDK, RAG, embeddings, function calling, prompt engineering y agentes con skills atómicas.',
    skillQaTag: 'QA Automation',
    skillQaTitle: 'Calidad automatizada',
    skillQaText: 'Playwright, Selenium, Jest, Vitest, pytest, Postman, Swagger y datos sintéticos para flujos críticos.',
    skillDevopsTag: 'DevOps',
    skillDevopsTitle: 'Entrega reproducible',
    skillDevopsText: 'Docker, GitHub Actions, Terraform, AWS EC2/VPC/S3/IAM, Gunicorn, Git y pipelines test-build-deploy.',
    skillDataTag: 'Data',
    skillDataTitle: 'Bases de datos',
    skillDataText: 'MySQL, SQL Server, SQLite, queries parametrizadas y almacenamiento local-first para herramientas con IA.',
    experienceEyebrow: 'Arco profesional',
    experienceTitle: 'Experiencia reciente.',
    jobOneTitle: 'QA Engineer / Líder de QA',
    jobOneMeta: 'Novacomp, cliente Davivienda Bank Costa Rica - 2025 - 2026',
    jobOneText: 'Lideré la estrategia de automatización QA para sistemas bancarios críticos, combinando Playwright + TypeScript, Postman, AWS y GitHub Actions.',
    jobOneBulletA: 'Reduje el ciclo de prueba cerca de 40% con automatización en staging aislado.',
    jobOneBulletB: 'Diseñé casos con cobertura del 100% de flujos críticos: cajeros, créditos e hipotecas.',
    jobOneBulletC: 'Asumí dirección del equipo QA a los 7 meses y mejoré trazabilidad con Jira/Scrum.',
    jobTwoTitle: 'Fullstack Developer',
    jobTwoMeta: 'Proyectos independientes - 10+ clientes - 2023 - Presente',
    jobTwoText: 'Desarrollo software a medida para clientes en Costa Rica y Estados Unidos, desde requerimientos hasta despliegue.',
    jobTwoBulletA: 'React + TypeScript con REST/GraphQL, estado, TailwindCSS y diseño responsive.',
    jobTwoBulletB: 'Integraciones OpenAI API, Anthropic Claude SDK, RAG, function calling y embeddings.',
    jobTwoBulletC: 'Sistema de RRHH para Fundación Centro VRAI: operación 100% en papel a digital, 80% menos tiempo administrativo.',
    projectsEyebrow: 'Proyecto manga shelf',
    projectsTitle: 'Proyectos destacados.',
    projectOneTag: 'QA + IA',
    projectOneText: 'Agente QA local-first que convierte requerimientos en casos de prueba, ejecuta UI/APIs, analiza fallos con IA y genera reportes HTML, PDF y JSON.',
    projectTwoTag: 'RAG',
    projectTwoText: 'Sistema RAG fullstack para subir PDF/TXT, generar embeddings, recuperar chunks por similitud coseno y responder con fuentes citables.',
    projectThreeTag: 'OpenAI',
    projectThreeText: 'Aplicación fullstack con chat conversacional, comparativa de modelos y visión para imagen a texto.',
    projectThreeTech: 'React, NestJS, REST, OpenAI API, visión',
    projectFourTag: 'DevOps',
    projectFourText: 'Infraestructura como código que despliega VPC, EC2, subnets, Security Groups, Elastic IP e IAM con mínimos privilegios.',
    projectFiveTag: 'Producto interno',
    projectFiveText: 'Sistema fullstack de RRHH para nómina, expedientes, vacaciones, reportes y panel administrativo.',
    projectSixTag: 'Portfolio',
    projectSixText: 'Portfolio personal con cambio ES/EN, chatbot IA integrado y arquitectura orientada a reclutadores técnicos.',
    code: 'Código',
    certsEyebrow: 'Credenciales',
    certsTitle: 'Certificaciones y aprendizaje.',
    certOneTitle: 'Bachillerato en Ingeniería en Sistemas de Información',
    certOneMeta: 'Universidad Internacional de las Américas - 2021 - 2025 - Titulado',
    certOneText: 'Colegiado activo del CPIC.',
    certTwoTitle: 'IA 360: Ingeniería del Software Aumentada con IA',
    certTwoMeta: 'Universidad CENFOTEC - 2026 - Presente',
    certTwoText: 'Formación enfocada en SDLC con IA y desarrollo asistido por agentes.',
    certThreeTitle: 'Inglés avanzado B2+',
    certThreeText: 'Disponible para entornos en español e inglés.',
    certFourTitle: 'Certificaciones DevTalles / Udemy',
    certFourText: 'TypeScript, React Hooks y MERN, Node.js, NestJS, Playwright, Docker y MySQL.',
    contactEyebrow: 'Contacto',
    contactTitle: 'Construyamos software que se pueda probar, mantener y mejorar.',
    contactText: 'Disponible para posiciones fullstack, frontend, QA o roles enfocados en IA. Remoto o presencial en Costa Rica.',
    contactLanguage: 'Español nativo / Inglés B2+',
    voiceAssistant: 'Asistente de voz',
    backTop: 'Volver arriba',
  },
  en: {
    pageTitle: 'Aru Honshou | Portfolio',
    metaDescription: 'Anime/chibi portfolio for Kendall Valverde Díaz, AruHonshou: Software Engineer, AI-Augmented Development, Fullstack TypeScript, and QA Automation.',
    loading: 'Loading',
    skip: 'Skip to content',
    navVoice: 'ARU VIRTUAL ASSISTANT',
    heroEyebrow: 'Interactive portfolio',
    heroTitle: 'Kendall Valverde Díaz builds software with AI and QA.',
    heroLead: 'Software Engineer specialized in AI-Augmented Development. 3+ years building React, TypeScript, and Node.js products with AI agents, RAG, and QA automation.',
    heroProjects: 'View projects',
    heroContact: "Let's talk",
    aruDefault: 'Choose a route and Aru changes expression with you.',
    pillSkills: 'Skills',
    pillExperience: 'Experience',
    pillProjects: 'Projects',
    pillCerts: 'Certifications',
    pillContact: 'Contact',
    skillsEyebrow: 'Skill board',
    skillsTitle: 'A stack that combines product, AI, and quality.',
    skillFrontendTag: 'Frontend',
    skillFrontendTitle: 'Modern interfaces',
    skillFrontendText: 'React, TypeScript, JavaScript, HTML5, CSS3, Vite, TailwindCSS, Zustand, and responsive UI for maintainable products.',
    skillBackendTag: 'Backend & APIs',
    skillBackendTitle: 'Fullstack services',
    skillBackendText: 'Node.js, Express, NestJS, REST, GraphQL, JWT, and APIs documented with Postman for distributed teams.',
    skillAiTag: 'AI Agents',
    skillAiTitle: 'Applied AI',
    skillAiText: 'OpenAI API, Anthropic SDK, RAG, embeddings, function calling, prompt engineering, and agents with atomic skills.',
    skillQaTag: 'QA Automation',
    skillQaTitle: 'Automated quality',
    skillQaText: 'Playwright, Selenium, Jest, Vitest, pytest, Postman, Swagger, and synthetic data for critical flows.',
    skillDevopsTag: 'DevOps',
    skillDevopsTitle: 'Reproducible delivery',
    skillDevopsText: 'Docker, GitHub Actions, Terraform, AWS EC2/VPC/S3/IAM, Gunicorn, Git, and test-build-deploy pipelines.',
    skillDataTag: 'Data',
    skillDataTitle: 'Databases',
    skillDataText: 'MySQL, SQL Server, SQLite, parameterized queries, and local-first storage for AI tools.',
    experienceEyebrow: 'Professional arc',
    experienceTitle: 'Recent experience.',
    jobOneTitle: 'QA Engineer / QA Lead',
    jobOneMeta: 'Novacomp, Davivienda Bank Costa Rica client - 2025 - 2026',
    jobOneText: 'Led QA automation strategy for critical banking systems, combining Playwright + TypeScript, Postman, AWS, and GitHub Actions.',
    jobOneBulletA: 'Reduced the test cycle by around 40% with automation in an isolated staging environment.',
    jobOneBulletB: 'Designed cases with 100% coverage of critical flows: ATMs, loans, and mortgages.',
    jobOneBulletC: 'Took over QA team leadership after 7 months and improved traceability with Jira/Scrum.',
    jobTwoTitle: 'Fullstack Developer',
    jobTwoMeta: 'Independent projects - 10+ clients - 2023 - Present',
    jobTwoText: 'Build custom software for clients in Costa Rica and the United States, from requirements to deployment.',
    jobTwoBulletA: 'React + TypeScript with REST/GraphQL, state management, TailwindCSS, and responsive design.',
    jobTwoBulletB: 'OpenAI API, Anthropic Claude SDK, RAG, function calling, and embeddings integrations.',
    jobTwoBulletC: 'HR system for Fundación Centro VRAI: moved a 100% paper process to digital, cutting administrative time by 80%.',
    projectsEyebrow: 'Manga project shelf',
    projectsTitle: 'Featured projects.',
    projectOneTag: 'QA + AI',
    projectOneText: 'Local-first QA agent that turns requirements into test cases, runs UI/APIs, analyzes failures with AI, and generates HTML, PDF, and JSON reports.',
    projectTwoTag: 'RAG',
    projectTwoText: 'Fullstack RAG system to upload PDF/TXT files, generate embeddings, retrieve chunks by cosine similarity, and answer with citable sources.',
    projectThreeTag: 'OpenAI',
    projectThreeText: 'Fullstack conversational chat app with model comparison and vision for image-to-text workflows.',
    projectThreeTech: 'React, NestJS, REST, OpenAI API, vision',
    projectFourTag: 'DevOps',
    projectFourText: 'Infrastructure as code that deploys VPC, EC2, subnets, Security Groups, Elastic IP, and IAM with least privilege.',
    projectFiveTag: 'Internal product',
    projectFiveText: 'Fullstack HR system for payroll, records, vacations, reports, and an admin panel.',
    projectSixTag: 'Portfolio',
    projectSixText: 'Personal portfolio with ES/EN switching, integrated AI chatbot, and architecture oriented to technical recruiters.',
    code: 'Code',
    certsEyebrow: 'Credentials',
    certsTitle: 'Certifications and learning.',
    certOneTitle: 'Bachelor’s Degree in Information Systems Engineering',
    certOneMeta: 'Universidad Internacional de las Américas - 2021 - 2025 - Graduated',
    certOneText: 'Active CPIC member.',
    certTwoTitle: 'AI 360: AI-Augmented Software Engineering',
    certTwoMeta: 'Universidad CENFOTEC - 2026 - Present',
    certTwoText: 'Training focused on AI-powered SDLC and agent-assisted development.',
    certThreeTitle: 'Advanced English B2+',
    certThreeText: 'Available for Spanish and English environments.',
    certFourTitle: 'DevTalles / Udemy Certifications',
    certFourText: 'TypeScript, React Hooks and MERN, Node.js, NestJS, Playwright, Docker, and MySQL.',
    contactEyebrow: 'Contact',
    contactTitle: 'Let’s build software that can be tested, maintained, and improved.',
    contactText: 'Available for fullstack, frontend, QA, or AI-focused roles. Remote or on-site in Costa Rica.',
    contactLanguage: 'Native Spanish / English B2+',
    voiceAssistant: 'Voice assistant',
    backTop: 'Back to top',
  },
};

const expressionMessages = {
  es: {
    skills: 'Stack listo: IA, frontend, backend y automatización.',
    experiencia: 'Aquí está la parte seria: experiencia con impacto medible.',
    proyectos: 'Proyectos destacados con IA, RAG, DevOps y producto.',
    certificaciones: 'Formación, certificaciones y aprendizaje continuo.',
    contacto: 'Contacto directo para colaborar o construir algo nuevo.',
    annoyed: '¿QUÉ HACES? DEJA DE DARME CLICS 💢💢',
  },
  en: {
    skills: 'Stack ready: AI, frontend, backend, and automation.',
    experiencia: 'Here is the serious part: experience with measurable impact.',
    proyectos: 'Featured projects with AI, RAG, DevOps, and product thinking.',
    certificaciones: 'Training, certifications, and continuous learning.',
    contacto: 'Direct contact to collaborate or build something new.',
    annoyed: 'WHAT ARE YOU DOING? STOP CLICKING ME 💢💢',
  },
};

const blinkPair = {
  A: 'D',
  B: 'E',
  C: 'F',
};

let currentLanguage = localStorage.getItem('aruPortfolioLanguage') === 'en' ? 'en' : 'es';
let defaultMessage = '';
const characterState = characters.map((element) => ({
  element,
  target: { x: 0, y: 0 },
  current: { x: 0, y: 0 },
  cell: { r: 2, c: 2 },
}));

let activeSheet = DEFAULT_SHEET;
let blink = false;
let rafId = 0;
let holdExpressionUntil = 0;
const loadingStartedAt = Date.now();

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function frameSrc(sheet, row, col) {
  return `${FRAME_BASE}/${sheet}/r${row}c${col}.webp`;
}

function hideLoadingScreen() {
  if (!loadingScreen) return;
  const minimumVisibleMs = 1150;
  const elapsed = Date.now() - loadingStartedAt;
  const wait = Math.max(0, minimumVisibleMs - elapsed);

  window.setTimeout(() => {
    loadingScreen.classList.add('is-hidden');
    window.setTimeout(() => loadingScreen.remove(), 520);
  }, wait);
}

function createCharacterFrames(state) {
  const fragment = document.createDocumentFragment();

  for (const sheet of SHEETS) {
    for (let r = 0; r < ROWS; r += 1) {
      for (let c = 0; c < COLS; c += 1) {
        const image = document.createElement('img');
        image.className = 'aru-frame';
        image.src = frameSrc(sheet, r, c);
        image.alt = '';
        image.draggable = false;
        image.dataset.sheet = sheet;
        image.dataset.row = String(r);
        image.dataset.col = String(c);
        fragment.append(image);
      }
    }
  }

  state.element.append(fragment);
  updateVisibleFrame(state);
}

function updateVisibleFrame(state) {
  const visibleSheet = blink && blinkPair[activeSheet] ? blinkPair[activeSheet] : activeSheet;
  state.element.querySelectorAll('.aru-frame').forEach((frame) => {
    const isCurrent =
      frame.dataset.sheet === visibleSheet &&
      Number(frame.dataset.row) === state.cell.r &&
      Number(frame.dataset.col) === state.cell.c;
    frame.classList.toggle('is-visible', isCurrent);
  });
}

function updateAllFrames() {
  characterState.forEach(updateVisibleFrame);
}

function t(key) {
  return translations[currentLanguage][key] ?? translations.es[key] ?? '';
}

function applyLanguage(language) {
  currentLanguage = language === 'en' ? 'en' : 'es';
  localStorage.setItem('aruPortfolioLanguage', currentLanguage);
  document.documentElement.lang = currentLanguage;
  document.title = t('pageTitle');
  if (metaDescription) metaDescription.setAttribute('content', t('metaDescription'));

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const value = t(element.dataset.i18n);
    if (value) element.textContent = value;
  });

  defaultMessage = t('aruDefault');
  if (message) message.textContent = defaultMessage;
  languageToggle?.setAttribute('aria-pressed', currentLanguage === 'en' ? 'true' : 'false');
  languageToggle?.setAttribute('aria-label', currentLanguage === 'en' ? 'Switch to Spanish' : 'Cambiar a inglés');
}

function setExpression(key, text = expressionMessages[currentLanguage][key], options = {}) {
  if (options.hold) holdExpressionUntil = Date.now() + 1400;
  const nextSheet = expressionSheets[key] ?? DEFAULT_SHEET;
  if (activeSheet !== nextSheet) {
    activeSheet = nextSheet;
    characters.forEach((character) => {
      character.classList.add('is-switching');
      window.setTimeout(() => character.classList.remove('is-switching'), 160);
    });
    updateAllFrames();
  }
  if (message && text) message.textContent = text;
}

function resetExpression() {
  if (Date.now() < holdExpressionUntil) return;
  setExpression('default', defaultMessage);
}

function scoldClickingAru() {
  setExpression('annoyed', expressionMessages[currentLanguage].annoyed, { hold: true });
  holdExpressionUntil = Date.now() + 2400;
}

function updatePointerTargets(event) {
  characterState.forEach((state) => {
    const rect = state.element.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height * 0.45;
    const range = Math.max(rect.width * 0.52, 280);
    state.target.x = clamp((event.clientX - cx) / range, -1, 1);
    state.target.y = clamp((event.clientY - cy) / range, -1, 1);
  });
}

function tick() {
  characterState.forEach((state) => {
    state.current.x += (state.target.x - state.current.x) * 0.28;
    state.current.y += (state.target.y - state.current.y) * 0.28;

    const nextCell = {
      c: clamp(Math.round(((state.current.x + 1) / 2) * (COLS - 1)), 0, COLS - 1),
      r: clamp(Math.round(((state.current.y + 1) / 2) * (ROWS - 1)), 0, ROWS - 1),
    };

    if (nextCell.r !== state.cell.r || nextCell.c !== state.cell.c) {
      state.cell = nextCell;
      updateVisibleFrame(state);
    }
  });

  rafId = requestAnimationFrame(tick);
}

function startBlinking() {
  let timer = 0;
  let alive = true;
  const random = (min, max) => min + Math.random() * (max - min);

  function schedule() {
    if (!alive) return;
    timer = window.setTimeout(() => {
      blink = true;
      updateAllFrames();
      window.setTimeout(() => {
        blink = false;
        updateAllFrames();
        schedule();
      }, random(85, 150));
    }, random(1800, 5200));
  }

  schedule();
  return () => {
    alive = false;
    window.clearTimeout(timer);
  };
}

function bindExpressionHover(targets, expression) {
  targets.forEach((target) => {
    target.addEventListener('pointerenter', () => setExpression(expression));
    target.addEventListener('pointerover', () => setExpression(expression));
    target.addEventListener('mouseenter', () => setExpression(expression));
    target.addEventListener('click', () => setExpression(expression, expressionMessages[currentLanguage][expression], { hold: true }));
    target.addEventListener('focusin', () => setExpression(expression));
    target.addEventListener('pointerleave', resetExpression);
    target.addEventListener('mouseleave', resetExpression);
    target.addEventListener('focusout', resetExpression);
  });
}

const expressionRegions = [
  { selector: '#skills .manga-card', expression: 'skills' },
  { selector: '#experiencia .manga-panel', expression: 'experiencia' },
  { selector: '#proyectos .project-card', expression: 'proyectos' },
  { selector: '#certificaciones .cert-card', expression: 'certificaciones' },
  { selector: '#contacto .contact-card, #contacto a', expression: 'contacto' },
];

function findExpressionRegion(node) {
  if (!(node instanceof Element)) return null;
  for (const region of expressionRegions) {
    if (node.closest(region.selector)) return region.expression;
  }
  return null;
}

function bindDelegatedExpressions() {
  ['pointerover', 'mouseover', 'click', 'focusin'].forEach((eventName) => {
    document.addEventListener(eventName, (event) => {
      const expression = findExpressionRegion(event.target);
      if (expression) setExpression(expression, expressionMessages[currentLanguage][expression], { hold: eventName === 'click' });
    });
  });

  ['pointerout', 'mouseout', 'focusout'].forEach((eventName) => {
    document.addEventListener(eventName, (event) => {
      const fromExpression = findExpressionRegion(event.target);
      const toExpression = findExpressionRegion(event.relatedTarget);
      if (fromExpression && fromExpression !== toExpression) resetExpression();
    });
  });
}

applyLanguage(currentLanguage);

languageToggle?.addEventListener('click', () => {
  applyLanguage(currentLanguage === 'es' ? 'en' : 'es');
  resetExpression();
});

characterState.forEach(createCharacterFrames);
window.addEventListener('pointermove', updatePointerTargets);
window.addEventListener('pointerdown', updatePointerTargets);
rafId = requestAnimationFrame(tick);
startBlinking();

characters.forEach((character) => {
  character.tabIndex = 0;
  character.addEventListener('click', scoldClickingAru);
  character.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    scoldClickingAru();
  });
});

pills.forEach((pill) => {
  const expression = pill.dataset.expression;

  pill.addEventListener('mouseenter', () => setExpression(expression));
  pill.addEventListener('focus', () => setExpression(expression));
  pill.addEventListener('mouseleave', resetExpression);
  pill.addEventListener('blur', resetExpression);
  pill.addEventListener('click', () => setExpression(expression));
});

bindExpressionHover([...document.querySelectorAll('#skills .manga-card')], 'skills');
bindExpressionHover([...document.querySelectorAll('#experiencia .manga-panel')], 'experiencia');
bindExpressionHover([...document.querySelectorAll('#proyectos .project-card')], 'proyectos');
bindExpressionHover([...document.querySelectorAll('#certificaciones .cert-card')], 'certificaciones');
bindExpressionHover([...document.querySelectorAll('#contacto .contact-card, #contacto a')], 'contacto');
bindDelegatedExpressions();

internalLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetElement = document.querySelector(link.getAttribute('href'));
    if (!targetElement) return;
    event.preventDefault();
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', link.getAttribute('href'));
  });
});

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const active = entry.target.id;
    pills.forEach((pill) => {
      const isActive = pill.getAttribute('href') === `#${active}`;
      pill.classList.toggle('is-active', isActive);
    });
  });
}, { rootMargin: '-45% 0px -45% 0px', threshold: 0.01 });

document.querySelectorAll('section[id]').forEach((section) => navObserver.observe(section));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

revealTargets.forEach((targetElement) => revealObserver.observe(targetElement));

window.addEventListener('beforeunload', () => {
  cancelAnimationFrame(rafId);
});

if (document.readyState === 'complete') {
  hideLoadingScreen();
} else {
  window.addEventListener('load', hideLoadingScreen, { once: true });
}
