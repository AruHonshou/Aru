export const profile = {
  name: 'Kendall Valverde',
  fullName: 'Kendall Andres Valverde Diaz',
  role: 'Software Engineer · AI-Augmented Development',
  availability: 'Disponible para nuevas oportunidades',
  location: 'Costa Rica',
  email: 'kendallavd@gmail.com',
  phone: '+506 8509-7920',
  github: 'https://github.com/AruHonshou',
  linkedin: 'https://www.linkedin.com/in/kendall-valverde-diaz-aru/',
  whatsapp: 'https://wa.me/50685097920',
  summary:
    'Software Engineer especializado en AI-Augmented Development con 3+ anos de experiencia en React, TypeScript y Node.js. Construyo agentes inteligentes open source con IA generativa: DocuMente, un sistema RAG fullstack, y QAPilot, un agente QA con Playwright. Lider de automatizacion QA reduciendo ciclos cerca de 40%.',
  about: [
    'Soy Software Engineer especializado en AI-Augmented Development con mas de 3 anos de experiencia en React, TypeScript y Node.js. Construyo agentes inteligentes y plataformas open source con IA generativa usando OpenAI API. Bachiller en Ingenieria en Sistemas de Informacion y colegiado activo del CPIC.',
    'Lidere la automatizacion QA en Novacomp para Davivienda Bank, implementando Playwright + TypeScript con CI/CD en GitHub Actions y reduciendo el ciclo de prueba cerca de 40% en un entorno bancario regulado. Asumi la direccion del equipo de QA a los 7 meses.',
    'Como freelance he atendido a mas de 10 clientes en Costa Rica y Estados Unidos, desarrollando aplicaciones React + TypeScript, integrando OpenAI API, Anthropic SDK y arquitectura RAG. Construy desde paginas web hasta un sistema de RRHH completo que elimino procesos 100% en papel.',
    'Actualmente desarrollo DocuMente, un RAG fullstack para conversar con documentos, y QAPilot, un agente QA que convierte requerimientos en tests ejecutables con Playwright. Ingles B2+ avanzado por CCCN, comodo en entornos 100% en ingles.',
  ],
  stats: [
    { value: '3+', label: 'anos de experiencia' },
    { value: '10+', label: 'clientes' },
    { value: '~40%', label: 'menos ciclo QA' },
    { value: '2', label: 'proyectos IA' },
  ],
  facts: [
    'Ingenieria en Sistemas de Informacion',
    'CPIC - Colegiado activo',
    'Ingles avanzado B2+',
    'React, TypeScript, Node.js e IA',
  ],
};

export const skills = [
  {
    title: 'Frontend',
    items: ['React', 'TypeScript', 'JavaScript', 'TailwindCSS', 'Vite', 'HTML5/CSS3'],
  },
  {
    title: 'Backend & APIs',
    items: ['Node.js', 'Express', 'NestJS', 'REST APIs', 'GraphQL', 'Python'],
  },
  {
    title: 'IA & Agentes',
    items: ['OpenAI API', 'RAG', 'Function Calling', 'Embeddings', 'Prompt Engineering', 'GitHub Copilot'],
  },
  {
    title: 'QA & Testing',
    items: ['Playwright', 'Selenium', 'Jest', 'pytest', 'Postman', 'Swagger'],
  },
  {
    title: 'Bases de datos',
    items: ['MySQL', 'SQL Server', 'SQLite'],
  },
  {
    title: 'DevOps & Cloud',
    items: ['Terraform', 'AWS', 'Docker', 'GitHub Actions', 'Git', 'Gunicorn'],
  },
];

export const experience = [
  {
    role: 'QA Engineer / Lider de QA',
    company: 'Novacomp · Cliente: Davivienda Bank',
    period: '2025 - 2026',
    description:
      'Lidere la estrategia de automatizacion QA para sistemas bancarios criticos de Davivienda. Responsable de direccion del equipo, diseno de casos de prueba, automatizacion con Playwright + TypeScript y CI/CD en AWS.',
    bullets: [
      'Propuse e implemente la primera estrategia de automatizacion del equipo con Playwright + TypeScript en staging aislado, integrando CI/CD con GitHub Actions.',
      'Reduje el ciclo de prueba cerca de 40% en flujos bancarios regulados.',
      'Disene casos de prueba con cobertura de flujos criticos bancarios y validacion de APIs REST usando Postman.',
      'Asumi la direccion del equipo de QA a los 7 meses, coordinando equipo, datos sinteticos y documentacion funcional.',
      'Colabore en desarrollo frontend de la app Davivienda con asistencia de IA, GitHub Copilot y Codex, gestionando defectos en Jira bajo Scrum.',
    ],
    stack: ['Playwright', 'TypeScript', 'AWS', 'GitHub Actions', 'Postman', 'Jira', 'Scrum'],
  },
  {
    role: 'Desarrollador Fullstack',
    company: 'Proyectos independientes · 10+ clientes',
    period: '2023 - Presente',
    description:
      'Desarrollo software a medida para clientes en Costa Rica y Estados Unidos, desde analisis de requerimientos hasta entrega y despliegue, con foco en React, TypeScript, Node.js e IA generativa.',
    bullets: [
      'Cree un sistema de RRHH completo para una fundacion que operaba 100% en papel, reduciendo cerca de 80% el tiempo administrativo.',
      'Integre OpenAI API, Anthropic SDK, arquitectura RAG, Function Calling y embeddings vectoriales para mas de 10 clientes.',
      'Construy APIs REST con Node.js, Express y NestJS conectadas a MySQL y SQL Server, documentadas con Postman y testeadas con Jest.',
      'Gestione proyectos con Git/GitHub, branching, pull requests y flujos colaborativos en equipos distribuidos.',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'OpenAI API', 'MySQL', 'NestJS', 'Git'],
  },
];

export const projects = [
  {
    title: 'DocuMente - RAG Fullstack',
    status: 'Completado',
    description:
      'Asistente fullstack para cargar documentos PDF/TXT, generar embeddings con OpenAI, recuperar chunks relevantes por similitud coseno y responder en lenguaje natural con fuentes citables.',
    highlights: ['RAG pipeline', 'Streaming', 'GitHub Pages'],
    stack: ['React', 'TypeScript', 'Node.js', 'OpenAI API', 'SQLite', 'Docker'],
    links: [
      { label: 'Codigo', href: 'https://github.com/AruHonshou/Documente' },
      { label: 'Demo', href: 'https://aruhonshou.github.io/Documente' },
    ],
  },
  {
    title: 'QAPilot - QA Automatizado con IA',
    status: 'En desarrollo',
    description:
      'Convierte requerimientos en lenguaje natural en casos de prueba, los ejecuta con Playwright y Fetch/Axios, analiza fallos con IA y genera reportes HTML, PDF y JSON.',
    highlights: ['7 skills IA', 'Playwright', 'Reportes'],
    stack: ['React 19', 'TypeScript', 'Node.js', 'OpenAI API', 'Playwright', 'SQLite'],
    links: [{ label: 'Codigo', href: 'https://github.com/AruHonshou/QAPilot' }],
  },
  {
    title: 'Sistema de RRHH',
    status: 'Completado',
    description:
      'Sistema completo de gestion de recursos humanos para una fundacion que operaba 100% en papel. Nomina, expedientes, vacaciones, reportes y panel administrativo.',
    highlights: ['80% menos tiempo admin', '0 duplicados', '100% digital'],
    stack: ['React', 'TypeScript', 'Node.js', 'MySQL', 'Jest', 'Postman'],
    links: [{ label: 'GitHub', href: 'https://github.com/AruHonshou' }],
  },
  {
    title: 'OpenAI Chatbot',
    status: 'Completado',
    description:
      'Aplicacion fullstack con integracion a OpenAI API. Chat conversacional, comparativa de modelos y vision. Frontend React + TypeScript + Vite + TailwindCSS y backend NestJS.',
    highlights: ['React + TypeScript', 'NestJS', 'OpenAI API'],
    stack: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'NestJS', 'OpenAI API'],
    links: [
      { label: 'Frontend', href: 'https://github.com/AruHonshou/OpenAIBOTFrontend' },
      { label: 'Backend', href: 'https://github.com/AruHonshou/OpenAIBOTBackend' },
    ],
  },
  {
    title: 'Portfolio Personal',
    status: 'En evolucion',
    description:
      'Portfolio personal con identidad Aru, animaciones, presentacion profesional y una experiencia visual anime/manga/chibi para reclutadores tecnicos.',
    highlights: ['Anime UI', 'Aru interactiva', 'GitHub Pages'],
    stack: ['React', 'Vite', 'Framer Motion', 'GitHub Pages'],
    links: [
      { label: 'Codigo', href: 'https://github.com/AruHonshou/Aru' },
      { label: 'Demo', href: 'https://aruhonshou.github.io/Aru/' },
    ],
  },
];

export const certifications = [
  {
    title: 'Bachillerato en Ingenieria en Sistemas de Informacion',
    issuer: 'Universidad Internacional de las Americas',
    period: '2021 - 2025',
    status: 'Titulado',
  },
  {
    title: 'IA360: Ingenieria del Software Aumentada con IA',
    issuer: 'Universidad CENFOTEC',
    period: '2026 - Presente',
    status: 'En curso',
  },
  {
    title: 'Ingles Avanzado - Nivel B2+',
    issuer: 'Centro Cultural Costarricense Norteamericano (CCCN)',
    period: '',
    status: 'Completado',
  },
  { title: 'TypeScript - Guia Completa', issuer: 'DevTalles / Udemy', period: '', status: 'Completado' },
  { title: 'React - De Cero a Experto: Hooks y MERN', issuer: 'DevTalles / Udemy', period: '', status: 'Completado' },
  { title: 'Node.js - De Cero a Experto', issuer: 'DevTalles / Udemy', period: '', status: 'Completado' },
  { title: 'NestJS - Microservicios y Aplicaciones Escalables', issuer: 'DevTalles / Udemy', period: '', status: 'Completado' },
  { title: 'Playwright - Automatizacion de Pruebas', issuer: 'DevTalles / Udemy', period: '', status: 'Completado' },
  { title: 'Docker - Guia Practica para Desarrolladores', issuer: 'DevTalles / Udemy', period: '', status: 'Completado' },
  { title: 'MySQL - Bases de Datos Relacionales', issuer: 'DevTalles / Udemy', period: '', status: 'Completado' },
];
