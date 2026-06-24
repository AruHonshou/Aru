export const portfolioCta = {
  guide: {
    label: { es: 'Aru lo explica mejor', en: 'Aru explains it better' },
    href: `${import.meta.env.BASE_URL}guia.html`,
  },
};

export const portfolioSections = [
  {
    id: 'about',
    navLabel: { es: 'Sobre mí', en: 'About me' },
    title: {
      es: 'Construyo software fullstack con IA, QA Automation y experiencias web interactivas.',
      en: 'I build fullstack software with AI, QA Automation, and interactive web experiences.',
    },
    eyebrow: { es: 'Perfil profesional', en: 'Professional profile' },
    status: { es: 'Perfil', en: 'Profile' },
    expression: 'G',
    motion: 'talking-bounce',
    bubble: {
      es: 'Primero lo importante: quién es Kendall y qué construye ✨',
      en: 'First things first: who Kendall is and what he builds ✨',
    },
    identity: [
      { label: { es: 'Nombre', en: 'Name' }, value: 'Kendall Valverde Díaz' },
      { label: { es: 'Rol', en: 'Role' }, value: 'Software Engineer / Fullstack Engineer' },
      {
        label: { es: 'Foco', en: 'Focus' },
        value: 'AI-Augmented Development · React · TypeScript · QA Automation',
      },
    ],
    tags: ['React', 'TypeScript', 'Node.js', 'QA Automation', 'IA aplicada', 'RAG', 'Agentes'],
    summary: {
      es: 'Kendall Valverde Díaz es Software Engineer / Fullstack Engineer de Costa Rica, especializado en AI-Augmented Development, frontend moderno, backend y automatización de calidad.',
      en: 'Kendall Valverde Díaz is a Software Engineer / Fullstack Engineer from Costa Rica, specialized in AI-Augmented Development, modern frontend, backend, and quality automation.',
    },
    highlights: [
      {
        es: 'Crea productos fullstack mantenibles con React, TypeScript, Node.js y APIs claras.',
        en: 'Builds maintainable fullstack products with React, TypeScript, Node.js, and clear APIs.',
      },
      {
        es: 'Integra IA aplicada, RAG y agentes para flujos útiles, no solo demos.',
        en: 'Integrates applied AI, RAG, and agents into useful workflows, not just demos.',
      },
      {
        es: 'Refuerza calidad con QA Automation, pruebas API/UI y pipelines reproducibles.',
        en: 'Strengthens quality with QA Automation, API/UI testing, and reproducible pipelines.',
      },
    ],
    groups: [
      {
        title: { es: 'Fullstack moderno', en: 'Modern fullstack' },
        description: {
          es: 'React, TypeScript, Node.js y APIs para productos web claros, mantenibles y orientados a usuarios reales.',
          en: 'React, TypeScript, Node.js, and APIs for clear, maintainable web products built for real users.',
        },
        items: ['React', 'TypeScript', 'Node.js', 'REST', 'GraphQL'],
      },
      {
        title: { es: 'IA aplicada', en: 'Applied AI' },
        description: {
          es: 'Agentes, RAG, embeddings, Function Calling y flujos con OpenAI API y Anthropic SDK.',
          en: 'Agents, RAG, embeddings, Function Calling, and workflows with OpenAI API and Anthropic SDK.',
        },
        items: ['RAG', 'Agents', 'OpenAI API', 'Embeddings'],
      },
      {
        title: { es: 'QA Automation', en: 'QA Automation' },
        description: {
          es: 'Automatización con Playwright, Postman, CI/CD y datos sintéticos para flujos críticos.',
          en: 'Automation with Playwright, Postman, CI/CD, and synthetic data for critical flows.',
        },
        items: ['Playwright', 'Postman', 'GitHub Actions', 'Testing'],
      },
    ],
    actions: [
      { label: { es: 'Ver proyectos', en: 'View projects' }, section: 'projects', variant: 'primary' },
      { label: { es: 'Contactarme', en: 'Contact me' }, section: 'contact', variant: 'secondary' },
      { label: { es: 'Aru lo explica mejor', en: 'Aru explains it better' }, href: `${import.meta.env.BASE_URL}guia.html`, variant: 'guide' },
    ],
  },
  {
    id: 'skills',
    navLabel: { es: 'Skills', en: 'Skills' },
    title: {
      es: 'Tecnologías para crear, probar y entregar producto.',
      en: 'Technologies for building, testing, and shipping product.',
    },
    eyebrow: { es: 'Skill board', en: 'Skill board' },
    status: { es: 'Skills', en: 'Skills' },
    expression: 'G',
    motion: 'selected-pop',
    bubble: {
      es: 'Estas habilidades vienen de proyectos reales, no solo de teoría.',
      en: 'These skills come from real projects, not just theory.',
    },
    summary: {
      es: 'Un stack práctico para interfaces, servicios, IA aplicada, automatización QA, datos y entrega reproducible.',
      en: 'A practical stack for interfaces, services, applied AI, QA automation, data, and reproducible delivery.',
    },
    highlights: [
      {
        es: 'Frontend fuerte: React, TypeScript, Vite, TailwindCSS y estado moderno.',
        en: 'Strong frontend: React, TypeScript, Vite, TailwindCSS, and modern state.',
      },
      {
        es: 'Backend y datos: Node.js, Express, NestJS, REST, GraphQL, MySQL y SQLite.',
        en: 'Backend and data: Node.js, Express, NestJS, REST, GraphQL, MySQL, and SQLite.',
      },
      {
        es: 'Calidad e IA: Playwright, Postman, RAG, embeddings, agentes y CI/CD.',
        en: 'Quality and AI: Playwright, Postman, RAG, embeddings, agents, and CI/CD.',
      },
    ],
    tags: ['React', 'TypeScript', 'Node.js', 'Playwright', 'RAG', 'Docker', 'AWS'],
    groups: [
      {
        title: { es: 'Frontend / Interfaces modernas', en: 'Frontend / Modern interfaces' },
        description: {
          es: 'UI responsive para productos mantenibles, dashboards, chat UIs y portafolios interactivos.',
          en: 'Responsive UI for maintainable products, dashboards, chat UIs, and interactive portfolios.',
        },
        items: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Vite', 'TailwindCSS', 'Zustand'],
      },
      {
        title: { es: 'Backend & APIs / Servicios fullstack', en: 'Backend & APIs / Fullstack services' },
        description: {
          es: 'APIs documentadas, autenticación y servicios conectados a bases de datos.',
          en: 'Documented APIs, authentication, and services connected to databases.',
        },
        items: ['Node.js', 'Express', 'NestJS', 'REST', 'GraphQL', 'JWT', 'Postman'],
      },
      {
        title: { es: 'AI Agents / IA aplicada', en: 'AI Agents / Applied AI' },
        description: {
          es: 'Arquitecturas con agentes, RAG, recuperación semántica y respuestas con fuentes.',
          en: 'Architectures with agents, RAG, semantic retrieval, and source-grounded answers.',
        },
        items: ['OpenAI API', 'Anthropic SDK', 'RAG', 'Embeddings', 'Function Calling', 'Prompt Engineering'],
      },
      {
        title: { es: 'QA Automation / Calidad automatizada', en: 'QA Automation / Automated quality' },
        description: {
          es: 'Pruebas UI/API, trazabilidad, datos sintéticos y flujos críticos.',
          en: 'UI/API testing, traceability, synthetic data, and critical workflows.',
        },
        items: ['Playwright', 'Selenium', 'Jest', 'Vitest', 'pytest', 'Postman', 'Swagger'],
      },
      {
        title: { es: 'DevOps / Entrega reproducible', en: 'DevOps / Reproducible delivery' },
        description: {
          es: 'Pipelines test-build-deploy, contenedores e infraestructura documentada.',
          en: 'Test-build-deploy pipelines, containers, and documented infrastructure.',
        },
        items: ['Docker', 'GitHub Actions', 'Terraform', 'AWS EC2', 'AWS VPC', 'AWS S3', 'AWS IAM', 'Gunicorn', 'Git'],
      },
      {
        title: { es: 'Data / Bases de datos', en: 'Data / Databases' },
        description: {
          es: 'Modelado relacional, consultas parametrizadas y persistencia local-first.',
          en: 'Relational modeling, parameterized queries, and local-first persistence.',
        },
        items: ['MySQL', 'SQL Server', 'SQLite', 'Parameterized queries', 'Local-first storage'],
      },
    ],
    actions: [
      { label: { es: 'Ver experiencia', en: 'View experience' }, section: 'experience', variant: 'primary' },
      { label: { es: 'Ver proyectos', en: 'View projects' }, section: 'projects', variant: 'secondary' },
      { label: { es: 'Aru lo explica mejor', en: 'Aru explains it better' }, href: `${import.meta.env.BASE_URL}guia.html`, variant: 'guide' },
    ],
  },
  {
    id: 'experience',
    navLabel: { es: 'Experiencia', en: 'Experience' },
    title: { es: 'Experiencia aplicada en QA Automation y fullstack.', en: 'Applied experience in QA Automation and fullstack.' },
    eyebrow: { es: 'Arco profesional', en: 'Professional arc' },
    status: { es: 'Experiencia', en: 'Experience' },
    expression: 'A',
    motion: 'explain-focus',
    bubble: {
      es: 'Aquí puedes ver cómo Kendall ha aplicado QA, automatización y desarrollo en entornos reales.',
      en: 'Here you can see how Kendall has applied QA, automation, and development in real environments.',
    },
    summary: {
      es: 'Experiencia reciente en QA Automation bancaria y desarrollo fullstack freelance para clientes de Costa Rica y Estados Unidos.',
      en: 'Recent experience in banking QA Automation and freelance fullstack development for clients in Costa Rica and the United States.',
    },
    highlights: [
      {
        es: 'QA Automation en sistemas bancarios críticos con Playwright, TypeScript y Postman.',
        en: 'QA Automation for critical banking systems with Playwright, TypeScript, and Postman.',
      },
      {
        es: 'Desarrollo fullstack freelance desde requerimientos hasta despliegue.',
        en: 'Freelance fullstack development from requirements to deployment.',
      },
      {
        es: 'Orientación a trazabilidad, reducción de tiempos y automatización útil.',
        en: 'Focused on traceability, time reduction, and useful automation.',
      },
    ],
    tags: ['QA Automation', 'Banking QA', 'Fullstack', 'CI/CD', 'React', 'TypeScript'],
    timeline: [
      {
        index: '01',
        role: { es: 'QA Engineer / Líder de QA', en: 'QA Engineer / QA Lead' },
        place: 'Novacomp / Davivienda Bank Costa Rica',
        period: '2025 - 2026',
        description: {
          es: 'Lideró la estrategia de automatización QA para sistemas bancarios críticos, combinando Playwright + TypeScript, Postman, AWS y GitHub Actions.',
          en: 'Led the QA automation strategy for critical banking systems, combining Playwright + TypeScript, Postman, AWS, and GitHub Actions.',
        },
        items: [
          {
            es: 'Redujo el ciclo de prueba cerca de 40% con automatización en staging aislado.',
            en: 'Reduced the testing cycle by around 40% with automation in an isolated staging environment.',
          },
          {
            es: 'Diseñó casos con cobertura del 100% de flujos críticos: cajeros, créditos e hipotecas.',
            en: 'Designed cases with 100% coverage of critical flows: ATMs, loans, and mortgages.',
          },
          {
            es: 'Asumió dirección del equipo QA a los 7 meses y mejoró trazabilidad con Jira/Scrum.',
            en: 'Took QA team leadership after 7 months and improved traceability with Jira/Scrum.',
          },
        ],
        stack: ['Playwright', 'TypeScript', 'Postman', 'AWS', 'GitHub Actions', 'Jira/Scrum'],
      },
      {
        index: '02',
        role: { es: 'Fullstack Developer Freelance', en: 'Freelance Fullstack Developer' },
        place: { es: 'Proyectos independientes - 10+ clientes', en: 'Independent projects - 10+ clients' },
        period: { es: '2023 - Presente', en: '2023 - Present' },
        description: {
          es: 'Desarrolla software a medida para clientes en Costa Rica y Estados Unidos, desde requerimientos hasta despliegue.',
          en: 'Builds custom software for clients in Costa Rica and the United States, from requirements to deployment.',
        },
        items: [
          {
            es: 'React + TypeScript con REST/GraphQL, estado, TailwindCSS y diseño responsive.',
            en: 'React + TypeScript with REST/GraphQL, state management, TailwindCSS, and responsive design.',
          },
          {
            es: 'Integraciones OpenAI API, Anthropic Claude SDK, RAG, Function Calling y embeddings.',
            en: 'Integrations with OpenAI API, Anthropic Claude SDK, RAG, Function Calling, and embeddings.',
          },
          {
            es: 'Sistema de RRHH para Fundación Centro VRAI: operación 100% en papel a digital, 80% menos tiempo administrativo.',
            en: 'HR system for Fundación Centro VRAI: from 100% paper operation to digital, with 80% less administrative time.',
          },
        ],
        stack: ['React', 'TypeScript', 'Node.js', 'REST/GraphQL', 'OpenAI API', 'MySQL'],
      },
    ],
    actions: [
      { label: { es: 'Ver proyectos', en: 'View projects' }, section: 'projects', variant: 'primary' },
      { label: { es: 'Contactarme', en: 'Contact me' }, section: 'contact', variant: 'secondary' },
    ],
  },
  {
    id: 'projects',
    navLabel: { es: 'Proyectos', en: 'Projects' },
    title: { es: 'Proyectos que prueban el stack.', en: 'Projects that prove the stack.' },
    eyebrow: { es: 'Estante de proyectos manga', en: 'Project manga shelf' },
    status: { es: 'Proyectos', en: 'Projects' },
    expression: 'G',
    motion: 'happy-bounce',
    bubble: {
      es: 'Estos proyectos muestran IA aplicada, QA, fullstack e infraestructura.',
      en: 'These projects show applied AI, QA, fullstack work, and infrastructure.',
    },
    summary: {
      es: 'Una selección breve de proyectos públicos y demostrables. La guía de Aru conserva el detalle largo y el storytelling técnico.',
      en: 'A brief selection of public and demonstrable projects. Aru guide keeps the deeper technical storytelling.',
    },
    highlights: [
      {
        es: 'IA aplicada: QAPilot, DocuMente y chatbots fullstack con modelos reales.',
        en: 'Applied AI: QAPilot, DocuMente, and fullstack chatbots with real models.',
      },
      {
        es: 'Calidad: automatización UI/API, reportes, trazabilidad y pruebas reproducibles.',
        en: 'Quality: UI/API automation, reports, traceability, and reproducible tests.',
      },
      {
        es: 'Producto: interfaces interactivas, sistemas internos y despliegues en GitHub Pages/AWS.',
        en: 'Product: interactive interfaces, internal systems, and deployments on GitHub Pages/AWS.',
      },
    ],
    tags: ['QAPilot', 'DocuMente', 'OpenAI', 'Terraform', 'RRHH', 'Aru'],
    projects: [
      {
        name: 'QAPilot',
        category: { es: 'QA + IA', en: 'QA + AI' },
        description: {
          es: 'Agente QA local-first que convierte requerimientos en casos de prueba, ejecuta pruebas UI/API, analiza fallos con IA y genera reportes HTML, PDF y JSON.',
          en: 'Local-first QA agent that turns requirements into test cases, runs UI/API tests, analyzes failures with AI, and generates HTML, PDF, and JSON reports.',
        },
        stack: ['React 19', 'TypeScript', 'Node.js', 'OpenAI API', 'Playwright', 'SQLite', 'Docker', 'SSE', 'AES-256-GCM'],
        actions: [
          { label: { es: 'Código', en: 'Code' }, href: 'https://github.com/AruHonshou/QAPilot/tree/kendall' },
          { label: { es: 'Aru lo explica mejor', en: 'Aru explains it better' }, href: `${import.meta.env.BASE_URL}guia.html`, variant: 'guide' },
        ],
      },
      {
        name: 'DocuMente',
        category: 'RAG',
        description: {
          es: 'Sistema RAG fullstack para subir PDF/TXT, generar embeddings, recuperar chunks por similitud coseno y responder con fuentes citables.',
          en: 'Fullstack RAG system for uploading PDF/TXT files, generating embeddings, retrieving chunks by cosine similarity, and answering with citable sources.',
        },
        stack: ['React', 'Vite', 'TailwindCSS', 'Zustand', 'Node.js', 'Express', 'SQLite', 'JWT', 'NDJSON', 'Docker', 'GitHub Actions'],
        actions: [
          { label: { es: 'Código', en: 'Code' }, href: 'https://github.com/AruHonshou/Documente' },
          { label: { es: 'Demo', en: 'Demo' }, href: 'https://aruhonshou.github.io/Documente/#/dashboard' },
          { label: { es: 'Aru lo explica mejor', en: 'Aru explains it better' }, href: `${import.meta.env.BASE_URL}guia.html`, variant: 'guide' },
        ],
      },
      {
        name: 'OpenAI Chatbot Fullstack',
        category: 'OpenAI',
        description: {
          es: 'Aplicación fullstack con chat conversacional, comparativa de modelos y visión para imagen a texto.',
          en: 'Fullstack app with conversational chat, model comparison, and vision for image-to-text.',
        },
        stack: ['React', 'NestJS', 'REST', 'OpenAI API', 'Vision'],
        actions: [
          { label: 'Frontend', href: 'https://github.com/AruHonshou/OpenAIBOTFrontend' },
          { label: 'Backend', href: 'https://github.com/AruHonshou/OpenAIBOTBackend' },
          { label: { es: 'Aru lo explica mejor', en: 'Aru explains it better' }, href: `${import.meta.env.BASE_URL}guia.html`, variant: 'guide' },
        ],
      },
      {
        name: 'Terraform + AWS',
        category: 'DevOps',
        description: {
          es: 'Infraestructura como código que despliega VPC, EC2, subnets, Security Groups, Elastic IP e IAM con mínimos privilegios.',
          en: 'Infrastructure as code deploying VPC, EC2, subnets, Security Groups, Elastic IP, and least-privilege IAM.',
        },
        stack: ['Terraform', 'AWS', 'Docker', 'GitHub Actions', 'Flask', 'Gunicorn', 'pytest', 'S3 remote state'],
        actions: [
          { label: { es: 'Aru lo explica mejor', en: 'Aru explains it better' }, href: `${import.meta.env.BASE_URL}guia.html`, variant: 'guide' },
        ],
      },
      {
        name: 'Sistema de Recursos Humanos',
        category: { es: 'Producto interno', en: 'Internal product' },
        description: {
          es: 'Sistema fullstack de RRHH para nómina, expedientes, vacaciones, reportes y panel administrativo.',
          en: 'Fullstack HR system for payroll, employee records, vacations, reports, and admin dashboard.',
        },
        impact: { es: 'Impacto: 80% menos tiempo administrativo.', en: 'Impact: 80% less administrative time.' },
        stack: ['React', 'TypeScript', 'Node.js', 'MySQL', 'Jest', 'Postman'],
        actions: [
          { label: { es: 'Código', en: 'Code' }, href: 'https://github.com/AruHonshou/Sistema-Recursos-Humanos' },
          { label: { es: 'Aru lo explica mejor', en: 'Aru explains it better' }, href: `${import.meta.env.BASE_URL}guia.html`, variant: 'guide' },
        ],
      },
      {
        name: 'Aru Assistant / Portafolio Aru',
        category: { es: 'Portafolio interactivo', en: 'Interactive portfolio' },
        description: {
          es: 'Asistente virtual anime/chibi y portafolio interactivo con Aru como personaje protagonista, cambio ES/EN, animaciones, guía local y experiencia visual diferenciada.',
          en: 'Anime/chibi virtual assistant and interactive portfolio with Aru as the main character, ES/EN language switching, animations, local guide, and distinct visual experience.',
        },
        stack: ['React', 'Vite', 'CSS3', 'GitHub Pages', 'PNGTuber'],
        actions: [
          { label: { es: 'Código', en: 'Code' }, href: 'https://github.com/AruHonshou/Aru' },
          { label: { es: 'Aru lo explica mejor', en: 'Aru explains it better' }, href: `${import.meta.env.BASE_URL}guia.html`, variant: 'guide' },
        ],
      },
    ],
    actions: [
      { label: { es: 'Ver GitHub', en: 'View GitHub' }, href: 'https://github.com/AruHonshou', variant: 'primary' },
      { label: { es: 'Aru lo explica mejor', en: 'Aru explains it better' }, href: `${import.meta.env.BASE_URL}guia.html`, variant: 'guide' },
    ],
  },
  {
    id: 'certifications',
    navLabel: { es: 'Certificaciones', en: 'Certifications' },
    title: { es: 'Formación enfocada en software, IA y calidad.', en: 'Training focused on software, AI, and quality.' },
    eyebrow: { es: 'Credenciales', en: 'Credentials' },
    status: { es: 'Formación', en: 'Education' },
    expression: 'G',
    motion: 'selected-pop',
    bubble: {
      es: 'Formación, práctica y mejora constante. ¡Eso también cuenta!',
      en: 'Training, practice, and constant improvement. That counts too!',
    },
    summary: {
      es: 'Una base académica en sistemas, especialización actual en IA aplicada al SDLC, inglés avanzado y cursos técnicos alineados a proyectos reales.',
      en: 'An academic base in systems, current specialization in AI applied to the SDLC, advanced English, and technical courses aligned with real projects.',
    },
    highlights: [
      {
        es: 'Ingeniería en Sistemas de Información, titulado y colegiado activo del CPIC.',
        en: 'Information Systems Engineering graduate and active CPIC member.',
      },
      {
        es: 'Especialización actual en Ingeniería del Software Aumentada con IA.',
        en: 'Current specialization in AI-Augmented Software Engineering.',
      },
      {
        es: 'Inglés B2+ y formación complementaria en TypeScript, React, Node.js, QA y DevOps.',
        en: 'English B2+ and complementary training in TypeScript, React, Node.js, QA, and DevOps.',
      },
    ],
    tags: ['UIA', 'CPIC', 'CENFOTEC', 'English B2+', 'DevTalles', 'Playwright'],
    groups: [
      {
        title: { es: 'Académico', en: 'Academic' },
        description: {
          es: 'Bachillerato en Ingeniería en Sistemas de Información por la Universidad Internacional de las Américas. 2021 - 2025. Titulado y colegiado activo del CPIC.',
          en: 'Bachelor degree in Information Systems Engineering from Universidad Internacional de las Américas. 2021 - 2025. Graduate and active CPIC member.',
        },
        items: ['UIA', '2021 - 2025', 'Titulado', 'CPIC'],
      },
      {
        title: { es: 'IA y especialización', en: 'AI and specialization' },
        description: {
          es: 'IA 360: Ingeniería del Software Aumentada con IA en Universidad CENFOTEC. 2026 - Presente. Enfoque en SDLC con IA y desarrollo asistido por agentes.',
          en: 'AI 360: AI-Augmented Software Engineering at Universidad CENFOTEC. 2026 - Present. Focused on AI-powered SDLC and agent-assisted development.',
        },
        items: ['CENFOTEC', 'AI-Augmented SDLC', 'Agents'],
      },
      {
        title: { es: 'Idiomas', en: 'Languages' },
        description: {
          es: 'Inglés avanzado B2+ completado en el Centro Cultural Costarricense Norteamericano. Disponible para entornos en español e inglés.',
          en: 'Advanced English B2+ completed at Centro Cultural Costarricense Norteamericano. Available for Spanish and English environments.',
        },
        items: ['Español nativo', 'English B2+', 'CCCN'],
      },
      {
        title: { es: 'DevTalles / Udemy', en: 'DevTalles / Udemy' },
        description: {
          es: 'Formación complementaria en tecnologías clave de fullstack, QA y DevOps.',
          en: 'Complementary training in key fullstack, QA, and DevOps technologies.',
        },
        items: ['TypeScript', 'React Hooks y MERN', 'Node.js', 'NestJS', 'Playwright', 'Docker', 'MySQL'],
      },
    ],
    actions: [
      { label: { es: 'Ver skills', en: 'View skills' }, section: 'skills', variant: 'primary' },
      { label: { es: 'Contactarme', en: 'Contact me' }, section: 'contact', variant: 'secondary' },
    ],
  },
  {
    id: 'contact',
    navLabel: { es: 'Contacto', en: 'Contact' },
    title: {
      es: 'Contacto claro para roles fullstack, QA e IA.',
      en: 'Clear contact for fullstack, QA, and AI roles.',
    },
    eyebrow: { es: 'Contacto', en: 'Contact' },
    status: { es: 'Contacto', en: 'Contact' },
    expression: 'G',
    motion: 'talking-bounce',
    bubble: {
      es: 'Si quieres hablar con Kendall, aquí están sus enlaces principales 💌',
      en: 'If you want to talk with Kendall, here are his main links 💌',
    },
    summary: {
      es: 'Disponible para posiciones fullstack, frontend, QA o roles enfocados en IA. Remoto o presencial en Costa Rica.',
      en: 'Available for fullstack, frontend, QA, or AI-focused roles. Remote or onsite in Costa Rica.',
    },
    tags: ['Costa Rica', 'Remote', 'Fullstack', 'QA Automation', 'AI'],
    highlights: [
      { es: 'Costa Rica.', en: 'Costa Rica.' },
      { es: 'Español nativo / Inglés B2+.', en: 'Native Spanish / English B2+.' },
      { es: 'Perfil orientado a producto, testing, IA aplicada y automatización.', en: 'Profile focused on product, testing, applied AI, and automation.' },
    ],
    contactLinks: [
      { label: 'Email', value: 'kendallavd@gmail.com', href: 'mailto:kendallavd@gmail.com' },
      { label: 'GitHub', value: 'AruHonshou', href: 'https://github.com/AruHonshou' },
      { label: 'LinkedIn', value: 'Kendall Valverde Díaz', href: 'https://www.linkedin.com/in/kendall-valverde-diaz-aru/' },
      { label: 'WhatsApp', value: '+506 8509-7920', href: 'https://wa.me/50685097920' },
    ],
    actions: [
      { label: { es: 'Enviar correo', en: 'Send email' }, href: 'mailto:kendallavd@gmail.com', variant: 'primary' },
      { label: { es: 'Ver GitHub', en: 'View GitHub' }, href: 'https://github.com/AruHonshou', variant: 'secondary' },
      { label: { es: 'LinkedIn', en: 'LinkedIn' }, href: 'https://www.linkedin.com/in/kendall-valverde-diaz-aru/', variant: 'secondary' },
      { label: { es: 'Aru lo explica mejor', en: 'Aru explains it better' }, href: `${import.meta.env.BASE_URL}guia.html`, variant: 'guide' },
    ],
  },
];

export function getPortfolioSection(sectionId) {
  return portfolioSections.find((section) => section.id === sectionId) || portfolioSections[0];
}
