export const HOME_NODE_ID = 'home';
export const NOT_FOUND_NODE_ID = 'not_found';

export const guidedFlowNodes = {
  home: {
    id: 'home',
    title: 'Inicio',
    statusLabel: 'Lista',
    message: '¡Hola! Soy Aru, la asistente virtual de Kendall. Puedo contarte sobre su perfil, proyectos, experiencia, skills, certificaciones o contacto. ¿Qué gustas saber?',
    emotion: 'happy',
    expression: 'G',
    searchKeywords: ['inicio', 'home', 'menu', 'ayuda', 'aru', 'asistente'],
    options: [
      { label: 'Sobre Kendall', next: 'about', kind: 'primary' },
      { label: 'Proyectos', next: 'projects', kind: 'primary' },
      { label: 'Skills', next: 'skills', kind: 'primary' },
      { label: 'Experiencia', next: 'experience', kind: 'primary' },
      { label: 'Certificaciones', next: 'certifications', kind: 'primary' },
      { label: 'Contacto', next: 'contact', kind: 'primary' },
      { label: 'Preguntar algo específico', next: 'free_question', kind: 'secondary' },
    ],
  },

  about: {
    id: 'about',
    title: 'Sobre Kendall',
    statusLabel: 'Explorando perfil',
    message: 'Kendall Valverde Díaz es un Software Engineer de Costa Rica especializado en AI-Augmented Development, desarrollo fullstack, frontend moderno, QA Automation y agentes de IA aplicada.',
    summary: 'Su perfil combina producto, calidad, automatización e inteligencia artificial aplicada al desarrollo de software.',
    emotion: 'happy',
    expression: 'G',
    badges: ['React', 'TypeScript', 'Node.js', 'QA Automation', 'RAG', 'Agentes IA'],
    sections: [
      {
        title: 'Enfoque profesional',
        items: [
          'Construye productos fullstack con React, TypeScript y Node.js.',
          'Integra APIs de IA aplicada, agentes inteligentes y sistemas RAG.',
          'Diseña soluciones con testing, CI/CD, seguridad y buenas prácticas.',
        ],
      },
      {
        title: 'Perfil público',
        items: [
          'Ubicación pública: Costa Rica.',
          'Idiomas: español nativo e inglés avanzado B2+.',
          'Colegiado activo del CPIC.',
        ],
      },
    ],
    searchKeywords: ['kendall', 'quien', 'perfil', 'sobre', 'presentacion', 'resumen', 'software engineer', 'aru honshou', 'aruhonshou'],
    options: [
      { label: 'Ver proyectos', next: 'projects', kind: 'primary' },
      { label: 'Ver skills', next: 'skills', kind: 'secondary' },
      { label: 'Contacto', next: 'contact', kind: 'secondary' },
      { label: 'Volver al inicio', next: 'home', kind: 'back' },
    ],
  },

  projects: {
    id: 'projects',
    title: 'Proyectos',
    statusLabel: 'Mostrando proyectos',
    message: 'Kendall tiene varios proyectos destacados. Algunos se enfocan en IA aplicada, otros en QA Automation, fullstack, sistemas administrativos y DevOps. ¿Cuál quieres conocer?',
    emotion: 'happy',
    expression: 'G',
    sections: [
      {
        title: 'Mapa rápido',
        items: [
          'DocuMente y QAPilot muestran IA aplicada a problemas concretos.',
          'Aru.Dev y Aru Assistant muestran marca personal, UI anime/chibi y experiencia guiada.',
          'Sistema RRHH e Infraestructura AWS/Terraform muestran producto interno y DevOps.',
        ],
      },
    ],
    searchKeywords: ['proyecto', 'proyectos', 'trabajos', 'realizado', 'hecho', 'portfolio', 'demo', 'repositorio'],
    options: [
      { label: 'Aru.Dev', next: 'project_arudev', kind: 'primary' },
      { label: 'Aru Assistant', next: 'project_aru', kind: 'primary' },
      { label: 'DocuMente', next: 'project_documente', kind: 'primary' },
      { label: 'QAPilot', next: 'project_qapilot', kind: 'primary' },
      { label: 'OpenAI Chatbot', next: 'project_openai_bot', kind: 'secondary' },
      { label: 'Sistema de Recursos Humanos', next: 'project_hr_system', kind: 'secondary' },
      { label: 'Infraestructura AWS/Terraform', next: 'project_infra', kind: 'secondary' },
      { label: 'Volver al inicio', next: 'home', kind: 'back' },
    ],
  },

  project_arudev: {
    id: 'project_arudev',
    title: 'Aru.Dev',
    statusLabel: 'Mostrando proyectos',
    message: 'Aru.Dev es el portfolio personal de Kendall. Presenta su perfil profesional, skills, experiencia, proyectos, certificaciones y contacto mediante una experiencia visual anime/chibi con Aru como personaje protagonista.',
    summary: 'Es una página técnica con identidad visual propia, orientada a reclutadores y visitantes que quieren evaluar su perfil completo.',
    emotion: 'happy',
    expression: 'G',
    badges: ['HTML', 'CSS3', 'JavaScript', 'Vite', 'GitHub Pages', 'Portfolio'],
    sections: [
      {
        title: 'Qué demuestra',
        items: [
          'Marca personal técnica con estética anime/chibi.',
          'Presentación profesional de skills, proyectos, experiencia y contacto.',
          'Publicación en GitHub Pages bajo /AruDev/.',
        ],
      },
    ],
    links: [
      { label: 'Ver demo', url: 'https://aruhonshou.github.io/AruDev/' },
      { label: 'Ver repositorio', url: 'https://github.com/AruHonshou/AruDev' },
    ],
    searchKeywords: ['arudev', 'aru.dev', 'aru dev', 'portfolio', 'portafolio', 'pagina de kendall', 'sitio de kendall', 'portfolio anime'],
    options: projectOptions(),
  },

  project_aru: {
    id: 'project_aru',
    title: 'Aru Assistant',
    statusLabel: 'Mostrando proyectos',
    message: 'Aru es la asistente virtual personal de Kendall. Está pensada para guiar a visitantes del portfolio, explicar su perfil y responder con información controlada desde una base local.',
    summary: 'El proyecto combina personaje anime/chibi, expresiones visuales, navegación guiada y conocimiento local sin depender de servicios externos.',
    emotion: 'happy',
    expression: 'G',
    badges: ['React', 'Vite', 'UI anime/chibi', 'FAQ guiado', 'Conocimiento local', 'GitHub Pages'],
    sections: [
      {
        title: 'Qué demuestra',
        items: [
          'Experiencia interactiva de portfolio con personaje 2D.',
          'Seguimiento de mouse, parpadeo y control de expresiones A-K.',
          'Arquitectura frontend sin exponer secretos ni depender de backend para la guía.',
        ],
      },
    ],
    links: [
      { label: 'Abrir guia', url: 'https://aruhonshou.github.io/Aru/guia.html' },
      { label: 'Ver repositorio', url: 'https://github.com/AruHonshou/Aru' },
    ],
    searchKeywords: ['aru', 'asistente', 'assistant', 'asistente virtual', 'aru assistant', 'chat con aru', 'aru honshou', 'personaje'],
    options: projectOptions(),
  },

  project_documente: {
    id: 'project_documente',
    title: 'DocuMente',
    statusLabel: 'Mostrando proyectos',
    message: 'DocuMente es un sistema RAG fullstack creado por Kendall para subir documentos PDF/TXT, generar embeddings, recuperar fragmentos relevantes y responder preguntas con fuentes citables.',
    summary: 'Es uno de sus proyectos más fuertes de IA aplicada porque une frontend, backend, autenticación, SQLite, Docker, CI/CD y un RAGAgent con skills.',
    emotion: 'happy',
    expression: 'G',
    badges: ['React', 'TypeScript', 'Node.js', 'Express', 'SQLite', 'OpenAI API', 'RAG', 'Docker', 'GitHub Actions'],
    sections: [
      {
        title: 'Cómo funciona',
        items: [
          'Procesa documentos, divide texto en chunks con overlap y genera embeddings.',
          'Recupera chunks por similitud coseno para responder con contexto.',
          'Incluye skills como searchDocuments, generateAnswer, summarizeDocument y extractKeywords.',
        ],
      },
      {
        title: 'Estado',
        items: ['Completado, con modo demo para portfolio.'],
      },
    ],
    links: [
      { label: 'Ver demo', url: 'https://aruhonshou.github.io/Documente/#/dashboard' },
      { label: 'Ver repositorio', url: 'https://github.com/AruHonshou/Documente' },
    ],
    searchKeywords: ['documente', 'docu mente', 'documento', 'documentos', 'rag', 'pdf', 'txt', 'embeddings', 'fuentes citables', 'chat con documentos'],
    options: projectOptions(),
  },

  project_qapilot: {
    id: 'project_qapilot',
    title: 'QAPilot',
    statusLabel: 'Mostrando proyectos',
    message: 'QAPilot es una plataforma open source local-first que convierte requerimientos funcionales en casos de prueba, ejecuta pruebas UI y API, analiza fallos con IA y genera reportes HTML, PDF y JSON.',
    summary: 'Demuestra QA Automation con IA, Playwright, seguridad local-first, agentes con skills y generación de reportes.',
    emotion: 'happy',
    expression: 'G',
    badges: ['React', 'TypeScript', 'Node.js', 'OpenAI API', 'Playwright', 'SQLite', 'Docker', 'QA Automation'],
    sections: [
      {
        title: 'QAAgent',
        items: [
          'Analiza requerimientos y genera casos de prueba.',
          'Crea y ejecuta pruebas UI con Playwright y pruebas API con Fetch/Axios.',
          'Analiza fallos y genera reportes exportables.',
        ],
      },
      {
        title: 'Seguridad',
        items: ['La credencial del proveedor es del usuario y el enfoque es local-first.'],
      },
    ],
    links: [
      { label: 'Ver repositorio', url: 'https://github.com/AruHonshou/QAPilot/tree/kendall' },
    ],
    searchKeywords: ['qapilot', 'qa pilot', 'qaagent', 'agente qa', 'testing con ia', 'pruebas con ia', 'playwright', 'casos de prueba'],
    options: projectOptions(),
  },

  project_openai_bot: {
    id: 'project_openai_bot',
    title: 'OpenAI Chatbot Fullstack',
    statusLabel: 'Mostrando proyectos',
    message: 'OpenAI Chatbot Fullstack es una aplicación de Kendall con frontend React y backend NestJS para chat conversacional, comparativa de modelos y visión de imagen a texto.',
    summary: 'Demuestra integración de OpenAI API, separación frontend/backend, endpoints REST y una UI moderna para flujos conversacionales.',
    emotion: 'happy',
    expression: 'G',
    badges: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'NestJS', 'REST', 'OpenAI API', 'Vision'],
    sections: [
      {
        title: 'Qué demuestra',
        items: [
          'Frontend moderno conectado a backend NestJS.',
          'Uso de chat, visión y comparativa de modelos.',
          'Arquitectura fullstack separada por repositorios.',
        ],
      },
    ],
    links: [
      { label: 'Frontend', url: 'https://github.com/AruHonshou/OpenAIBOTFrontend' },
      { label: 'Backend', url: 'https://github.com/AruHonshou/OpenAIBOTBackend' },
    ],
    searchKeywords: ['openai bot', 'openai chatbot', 'openaibot', 'chatbot fullstack', 'bot de openai', 'vision', 'modelos'],
    options: projectOptions(),
  },

  project_hr_system: {
    id: 'project_hr_system',
    title: 'Sistema de Recursos Humanos',
    statusLabel: 'Mostrando proyectos',
    message: 'El Sistema de Recursos Humanos es un sistema fullstack para Fundación Centro VRAI enfocado en nómina, expedientes, vacaciones, reportes y panel administrativo.',
    summary: 'Reemplazó una operación 100% en papel y redujo el tiempo administrativo un 80%.',
    emotion: 'happy',
    expression: 'G',
    badges: ['React', 'TypeScript', 'Node.js', 'MySQL', 'Jest', 'Postman', 'Producto interno'],
    sections: [
      {
        title: 'Impacto',
        items: [
          'Digitalización de procesos administrativos.',
          'Gestión de expedientes, vacaciones, permisos, incapacidades y reportes.',
          'Demuestra fullstack aplicado a procesos reales.',
        ],
      },
    ],
    links: [
      { label: 'Ver repositorio', url: 'https://github.com/AruHonshou/Sistema-Recursos-Humanos' },
    ],
    searchKeywords: ['recursos humanos', 'rrhh', 'sistema rrhh', 'fundacion centro vrai', 'nomina', 'planilla', 'vacaciones', 'permisos', 'reportes'],
    options: projectOptions(),
  },

  project_infra: {
    id: 'project_infra',
    title: 'Infraestructura AWS/Terraform',
    statusLabel: 'Mostrando proyectos',
    message: 'Este proyecto muestra infraestructura como código con Terraform, AWS, Docker y CI/CD para provisionar recursos reproducibles y desplegar una API containerizada.',
    summary: 'Incluye VPC personalizada, EC2 t3.micro, subnets pública y privada, Security Groups, Elastic IP e IAM con mínimos privilegios.',
    emotion: 'happy',
    expression: 'G',
    badges: ['Terraform', 'AWS', 'Docker', 'GitHub Actions', 'Flask', 'Python', 'Gunicorn', 'pytest'],
    sections: [
      {
        title: 'Qué demuestra',
        items: [
          'DevOps e infraestructura reproducible.',
          'Pipelines de App y Terraform.',
          'API Flask containerizada con pruebas unitarias.',
        ],
      },
    ],
    links: [
      { label: 'Ver repositorio', url: 'https://github.com/AruHonshou/devops-terraform-project' },
    ],
    searchKeywords: ['terraform', 'aws', 'devops', 'infraestructura', 'ci cd', 'cicd', 'docker', 'ec2', 'vpc', 'flask'],
    options: projectOptions(),
  },

  skills: {
    id: 'skills',
    title: 'Skills',
    statusLabel: 'Mostrando skills',
    message: 'Kendall trabaja principalmente con frontend moderno, backend y APIs, IA aplicada, QA Automation, DevOps, cloud y bases de datos relacionales.',
    emotion: 'happy',
    expression: 'G',
    sections: [
      { title: 'Frontend', items: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'TailwindCSS', 'Vite', 'Zustand', 'React Router', 'UI responsive'] },
      { title: 'Backend y APIs', items: ['Node.js', 'Express', 'NestJS', 'REST APIs', 'GraphQL', 'JWT', 'CORS', 'Postman'] },
      { title: 'IA y agentes', items: ['OpenAI API', 'Anthropic Claude SDK', 'RAG', 'Embeddings', 'Function Calling', 'Agentes con skills atómicas', 'Prompt Engineering'] },
      { title: 'QA y Testing', items: ['Playwright', 'Selenium', 'Jest', 'Vitest', 'pytest', 'Postman', 'Datos sintéticos', 'Jira', 'Scrum'] },
      { title: 'DevOps y Cloud', items: ['Docker', 'Docker Compose', 'GitHub Actions', 'Terraform', 'AWS EC2', 'AWS VPC', 'AWS S3', 'AWS IAM', 'Gunicorn'] },
      { title: 'Bases de datos', items: ['MySQL', 'SQL Server', 'SQLite', 'Consultas parametrizadas', 'Modelado relacional'] },
      { title: 'Lenguajes y versionado', items: ['TypeScript', 'JavaScript', 'Python', 'Git', 'GitHub', 'Pull requests'] },
    ],
    searchKeywords: ['skill', 'skills', 'tecnologia', 'tecnologias', 'stack', 'herramientas', 'react', 'typescript', 'node', 'backend', 'frontend', 'base de datos', 'devops', 'docker', 'aws'],
    options: [
      { label: 'Proyectos relacionados', next: 'projects', kind: 'primary' },
      { label: 'Experiencia', next: 'experience', kind: 'secondary' },
      { label: 'Contacto', next: 'contact', kind: 'secondary' },
      { label: 'Volver al inicio', next: 'home', kind: 'back' },
    ],
  },

  experience: {
    id: 'experience',
    title: 'Experiencia',
    statusLabel: 'Mostrando experiencia',
    message: 'La experiencia de Kendall combina QA Automation en contexto bancario, liderazgo QA y desarrollo fullstack freelance para clientes de Costa Rica y Estados Unidos.',
    emotion: 'happy',
    expression: 'G',
    sections: [
      {
        title: 'Novacomp / Davivienda Bank Costa Rica',
        items: [
          'QA Engineer / Líder de QA entre 2025 y 2026.',
          'Implementó automatización con Playwright + TypeScript en staging aislado.',
          'Integró CI/CD con GitHub Actions y redujo el ciclo de pruebas cerca de 40%.',
          'Validó APIs REST en AWS usando Postman y coordinó documentación funcional.',
        ],
      },
      {
        title: 'Fullstack freelance',
        items: [
          'Desarrollador fullstack desde 2023 para más de 10 clientes en Costa Rica y Estados Unidos.',
          'Construye aplicaciones React + TypeScript, APIs REST/GraphQL y backends con Node.js, Express y NestJS.',
          'Integra OpenAI API, Anthropic Claude SDK, RAG, Function Calling y embeddings.',
        ],
      },
    ],
    searchKeywords: ['experiencia', 'trabajo', 'novacomp', 'davivienda', 'freelance', 'cliente', 'clientes', 'qa', 'lider', 'banco'],
    options: [
      { label: 'Ver QAPilot', next: 'project_qapilot', kind: 'primary' },
      { label: 'Ver Sistema RRHH', next: 'project_hr_system', kind: 'secondary' },
      { label: 'Contacto', next: 'contact', kind: 'secondary' },
      { label: 'Volver al inicio', next: 'home', kind: 'back' },
    ],
  },

  certifications: {
    id: 'certifications',
    title: 'Certificaciones',
    statusLabel: 'Mostrando certificaciones',
    message: 'Kendall registra formación académica y complementaria en ingeniería de sistemas, IA aplicada al SDLC y tecnologías clave para fullstack, QA y DevOps.',
    emotion: 'happy',
    expression: 'G',
    sections: [
      {
        title: 'Formación académica',
        items: [
          'Bachillerato en Ingeniería en Sistemas de Información por la Universidad Internacional de las Américas.',
          'IA 360: Ingeniería del Software Aumentada con IA en Universidad CENFOTEC.',
          'Inglés avanzado B2+ completado en CCCN.',
        ],
      },
      {
        title: 'Formación complementaria',
        items: [
          'TypeScript: Guía completa.',
          'React: De cero a experto: Hooks y MERN.',
          'Node.js: De cero a experto.',
          'NestJS: Microservicios y aplicaciones escalables.',
          'Playwright: Automatización de pruebas.',
          'Docker: Guía práctica para desarrolladores.',
          'MySQL: Bases de datos relacionales.',
        ],
      },
    ],
    links: [
      { label: 'Verificar certificados', url: 'https://cursos.devtalles.com/certificates' },
    ],
    searchKeywords: ['certificacion', 'certificaciones', 'certificado', 'certificados', 'educacion', 'formacion', 'estudios', 'universidad', 'cenfotec', 'uia', 'devtalles', 'udemy'],
    options: [
      { label: 'Ver skills', next: 'skills', kind: 'primary' },
      { label: 'Contacto', next: 'contact', kind: 'secondary' },
      { label: 'Volver al inicio', next: 'home', kind: 'back' },
    ],
  },

  contact: {
    id: 'contact',
    title: 'Contacto',
    statusLabel: 'Mostrando contacto',
    message: 'Puedes contactar a Kendall por sus canales públicos profesionales.',
    emotion: 'happy',
    expression: 'G',
    sections: [
      {
        title: 'Canales públicos',
        items: [
          'GitHub: AruHonshou.',
          'LinkedIn: Kendall Valverde Díaz.',
          'Email profesional: kendallavd@gmail.com.',
          'Teléfono público mostrado en portfolio y CV: +506 8509-7920.',
        ],
      },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/AruHonshou' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/kendall-valverde-diaz-aru/' },
      { label: 'Email', url: 'mailto:kendallavd@gmail.com' },
      { label: 'Portfolio', url: 'https://aruhonshou.github.io/AruDev/' },
      { label: 'WhatsApp', url: 'https://wa.me/50685097920' },
    ],
    searchKeywords: ['contacto', 'contactar', 'email', 'correo', 'linkedin', 'github', 'whatsapp', 'telefono', 'portfolio', 'portafolio'],
    options: [
      { label: 'Ver portfolio', url: 'https://aruhonshou.github.io/AruDev/', kind: 'link' },
      { label: 'Volver al inicio', next: 'home', kind: 'back' },
    ],
  },

  free_question: {
    id: 'free_question',
    title: 'Búsqueda local',
    statusLabel: 'Búsqueda local',
    message: 'También puedes buscar algo específico sobre Kendall. Escríbeme palabras como DocuMente, QAPilot, React, contacto, certificaciones, experiencia o Recursos Humanos.',
    emotion: 'thinking',
    expression: 'H',
    searchKeywords: ['preguntar', 'pregunta', 'buscar', 'busqueda', 'búsqueda', 'algo especifico', 'algo específico', 'especifico', 'específico'],
    options: [
      { label: 'Ver proyectos', next: 'projects', kind: 'primary' },
      { label: 'Ver skills', next: 'skills', kind: 'secondary' },
      { label: 'Volver al inicio', next: 'home', kind: 'back' },
    ],
  },

  not_found: {
    id: 'not_found',
    title: 'Sin información local',
    statusLabel: 'Sin información local',
    message: 'No tengo esa información en mi base de conocimiento sobre Kendall. Puedes preguntarme sobre su perfil, proyectos, skills, experiencia, certificaciones o contacto.',
    emotion: 'thinking',
    expression: 'H',
    searchKeywords: [],
    options: [
      { label: 'Sobre Kendall', next: 'about', kind: 'primary' },
      { label: 'Proyectos', next: 'projects', kind: 'primary' },
      { label: 'Skills', next: 'skills', kind: 'secondary' },
      { label: 'Contacto', next: 'contact', kind: 'secondary' },
      { label: 'Volver al inicio', next: 'home', kind: 'back' },
    ],
  },
};

function projectOptions() {
  return [
    { label: 'Volver a proyectos', next: 'projects', kind: 'back' },
    { label: 'Volver al inicio', next: 'home', kind: 'back' },
    { label: 'Contacto', next: 'contact', kind: 'secondary' },
  ];
}

export function getGuidedNode(nodeId) {
  return guidedFlowNodes[nodeId] || guidedFlowNodes[HOME_NODE_ID];
}

export function normalizeSearchText(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s/-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function searchableText(node) {
  return normalizeSearchText([
    node.title,
    node.message,
    node.summary,
    ...(node.badges || []),
    ...(node.searchKeywords || []),
    ...(node.links || []).flatMap((link) => [link.label, link.url]),
    ...(node.sections || []).flatMap((section) => [
      section.title,
      ...(section.items || []),
    ]),
  ].filter(Boolean).join(' '));
}

export function searchGuidedFlow(query) {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return null;

  const terms = normalizedQuery.split(' ').filter((term) => term.length > 1);
  const nodes = Object.values(guidedFlowNodes).filter((node) => !['home', 'not_found', 'free_question'].includes(node.id));

  const ranked = nodes
    .map((node) => {
      const haystack = searchableText(node);
      const keywords = (node.searchKeywords || []).map(normalizeSearchText);
      let score = 0;

      if (keywords.some((keyword) => keyword && normalizedQuery === keyword)) score += 80;
      if (keywords.some((keyword) => keyword && normalizedQuery.includes(keyword))) score += 45;
      if (haystack.includes(normalizedQuery)) score += 35;

      for (const term of terms) {
        if (keywords.some((keyword) => keyword === term)) score += 12;
        else if (keywords.some((keyword) => keyword.includes(term) || term.includes(keyword))) score += 8;
        else if (haystack.includes(term)) score += 4;
      }

      return { node, score };
    })
    .filter((item) => item.score >= 8)
    .sort((a, b) => b.score - a.score);

  return ranked[0]?.node || null;
}
