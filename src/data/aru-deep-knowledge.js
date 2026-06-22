import kendallProfileText from './kendall-profile.md?raw';

export const KENDALL_PROFILE_SOURCE = kendallProfileText;

export const OFFICIAL_LINKS = {
  arudev: 'https://aruhonshou.github.io/AruDev/',
  github: 'https://github.com/AruHonshou',
  aruRepo: 'https://github.com/AruHonshou/Aru',
  arudevRepo: 'https://github.com/AruHonshou/AruDev',
  documenteDemo: 'https://aruhonshou.github.io/Documente/#/dashboard',
  documenteRepo: 'https://github.com/AruHonshou/Documente',
  qapilotRepo: 'https://github.com/AruHonshou/QAPilot/tree/kendall',
  openAiBotFrontend: 'https://github.com/AruHonshou/OpenAIBOTFrontend',
  openAiBotBackend: 'https://github.com/AruHonshou/OpenAIBOTBackend',
  hrRepo: 'https://github.com/AruHonshou/Sistema-Recursos-Humanos',
  infraRepo: 'https://github.com/AruHonshou/devops-terraform-project',
  linkedin: 'https://www.linkedin.com/in/kendall-valverde-diaz-aru/',
  email: 'mailto:kendallavd@gmail.com',
};

const sourceNote = 'Fuente local: kendall-profile.md';

function baseOptions() {
  return [
    { label: 'Resumen profundo', next: 'deep_summary', kind: 'primary' },
    { label: 'Proyectos en detalle', next: 'projects', kind: 'primary' },
    { label: 'QA y automatización', next: 'qa_automation', kind: 'secondary' },
    { label: 'IA aplicada', next: 'ai_work', kind: 'secondary' },
    { label: 'Por qué contratarlo', next: 'why_hire', kind: 'secondary' },
    { label: 'Ir a AruDev', url: OFFICIAL_LINKS.arudev, kind: 'link', action: 'portfolio' },
  ];
}

function projectOptions() {
  return [
    { label: 'Volver a proyectos', next: 'projects', kind: 'back' },
    { label: 'Ver AruDev', url: OFFICIAL_LINKS.arudev, kind: 'link', action: 'portfolio' },
    { label: 'Volver con Aru', next: 'home', kind: 'back' },
  ];
}

export const deepGuideNodes = {
  home: {
    id: 'home',
    title: 'Inicio',
    statusLabel: 'Lista',
    companionLine: 'Aru explica lo que AruDev resume.',
    action: 'home',
    message: 'Soy Aru ✨ El portfolio te muestra el resumen profesional de Kendall. Yo puedo contarte la historia completa: proyectos, decisiones técnicas, experiencia, habilidades y contexto profesional.',
    summary: 'Todo lo que explico viene de la base local kendall-profile.md y de archivos actuales del proyecto. Si un dato no está registrado, no lo invento.',
    emotion: 'happy',
    expression: 'G',
    badges: ['PNGTuber web', 'Guía local', 'Sin backend', 'Sin IA externa', 'AruDev companion'],
    sections: [
      {
        title: 'Cómo usarme',
        items: [
          'Usa las opciones para explorar detalles detrás del portfolio.',
          'Escribe una búsqueda local si quieres ir directo a un proyecto, tecnología o experiencia.',
          'Para el resumen visual y rápido, abre AruDev; para contexto profundo, quédate con Aru.',
        ],
      },
    ],
    links: [
      { label: 'Ver portfolio completo', url: OFFICIAL_LINKS.arudev },
      { label: 'GitHub de Kendall', url: OFFICIAL_LINKS.github },
      { label: 'Repositorio de Aru', url: OFFICIAL_LINKS.aruRepo },
    ],
    searchKeywords: ['inicio', 'home', 'menu', 'ayuda', 'aru', 'asistente', 'guia', 'guía', 'profundo', 'historia completa'],
    options: [
      { label: 'Resumen profundo de Kendall', next: 'deep_summary', kind: 'primary' },
      { label: 'Explícame sus proyectos en detalle', next: 'projects', kind: 'primary' },
      { label: '¿Qué tecnologías domina?', next: 'skills', kind: 'primary' },
      { label: '¿Cómo trabaja en QA?', next: 'qa_automation', kind: 'secondary' },
      { label: '¿Cómo trabaja con IA?', next: 'ai_work', kind: 'secondary' },
      { label: 'Ir al portfolio completo', url: OFFICIAL_LINKS.arudev, kind: 'link', action: 'portfolio' },
      { label: 'Ver GitHub', url: OFFICIAL_LINKS.github, kind: 'link', action: 'portfolio' },
    ],
  },

  deep_summary: {
    id: 'deep_summary',
    title: 'Resumen profundo de Kendall',
    statusLabel: 'Perfil profundo',
    companionLine: 'Perfil con contexto, no solo lista de skills.',
    action: 'explainFocus',
    message: 'Kendall Valverde Díaz es un Software Engineer de Costa Rica especializado en AI-Augmented Development, desarrollo fullstack, frontend moderno, QA Automation y agentes con IA generativa.',
    summary: 'Su perfil mezcla producto, calidad, automatización, backend, frontend e IA aplicada. AruDev resume esa identidad; aquí te explico cómo se conecta cada parte.',
    emotion: 'happy',
    expression: 'G',
    badges: ['React', 'TypeScript', 'Node.js', 'QA Automation', 'RAG', 'DevOps'],
    sections: [
      {
        title: 'Qué significa su enfoque',
        items: [
          'Construye aplicaciones web fullstack con React, TypeScript, Node.js, Express y NestJS.',
          'Aplica IA generativa en proyectos concretos: RAG, embeddings, Function Calling, agentes y asistentes virtuales.',
          'Viene de una base fuerte en QA Automation, con Playwright, Postman, CI/CD y documentación funcional.',
        ],
      },
      {
        title: 'Lo que demuestra profesionalmente',
        items: [
          'Puede pensar en producto, no solo en pantallas.',
          'Puede automatizar calidad y conectar pruebas con flujos reales.',
          'Puede diseñar demos públicas sin exponer secretos ni depender de servicios externos innecesarios.',
        ],
      },
    ],
    links: [
      { label: 'Ver portfolio completo', url: OFFICIAL_LINKS.arudev },
      { label: 'GitHub de Kendall', url: OFFICIAL_LINKS.github },
    ],
    searchKeywords: ['kendall', 'quien', 'perfil', 'sobre', 'resumen', 'profundo', 'software engineer', 'historia', 'contexto'],
    options: baseOptions(),
  },

  projects: {
    id: 'projects',
    title: 'Proyectos en detalle',
    statusLabel: 'Proyectos',
    companionLine: 'Los proyectos muestran cómo trabaja Kendall.',
    action: 'deepProjects',
    message: 'AruDev muestra los proyectos como tarjetas rápidas. Aquí los vemos como evidencia técnica: qué problema resuelven, qué decisiones toman y qué demuestran de Kendall.',
    emotion: 'happy',
    expression: 'G',
    badges: ['IA aplicada', 'QA Automation', 'Fullstack', 'DevOps', 'Producto'],
    sections: [
      {
        title: 'Mapa de lectura',
        items: [
          'DocuMente demuestra RAG fullstack, documentos, embeddings, fuentes y arquitectura.',
          'QAPilot demuestra QA Automation con IA, Playwright, análisis de fallos y reportes.',
          'Sistema RRHH demuestra impacto real en procesos administrativos.',
          'Infraestructura AWS/Terraform demuestra DevOps, reproducibilidad y CI/CD.',
        ],
      },
    ],
    searchKeywords: ['proyecto', 'proyectos', 'detalle', 'trabajos', 'portfolio', 'repositorio', 'demo', 'documente', 'qapilot', 'openai bot'],
    options: [
      { label: '¿Qué demuestra DocuMente?', next: 'project_documente', kind: 'primary' },
      { label: '¿Qué demuestra QAPilot?', next: 'project_qapilot', kind: 'primary' },
      { label: 'AruDev como portfolio oficial', next: 'project_arudev', kind: 'secondary' },
      { label: 'Aru como asistente PNGTuber', next: 'project_aru', kind: 'secondary' },
      { label: 'OpenAI Chatbot Fullstack', next: 'project_openai_bot', kind: 'secondary' },
      { label: 'Sistema de Recursos Humanos', next: 'project_hr_system', kind: 'secondary' },
      { label: 'Infraestructura AWS/Terraform', next: 'project_infra', kind: 'secondary' },
      { label: 'Volver con Aru', next: 'home', kind: 'back' },
    ],
  },

  project_documente: {
    id: 'project_documente',
    title: 'DocuMente',
    statusLabel: 'DocuMente',
    companionLine: 'RAG fullstack explicado sin humo.',
    action: 'deepAI',
    message: 'DocuMente es un sistema RAG fullstack para subir documentos PDF/TXT, generar embeddings, recuperar chunks relevantes y responder preguntas con fuentes citables.',
    summary: 'Lo importante no es solo “usa IA”: el proyecto muestra cómo conectar documentos, backend, búsqueda semántica, seguridad, Docker y CI/CD en una experiencia completa.',
    emotion: 'happy',
    expression: 'G',
    badges: ['React', 'TypeScript', 'Node.js', 'Express', 'SQLite', 'OpenAI API', 'RAG', 'Docker'],
    sections: [
      {
        title: 'Problema que resuelve',
        items: [
          'Permite consultar información dentro de documentos en vez de leerlos manualmente.',
          'Responde con contexto recuperado desde chunks y fuentes, no con respuestas libres sin respaldo.',
          'Organiza el flujo desde carga de documentos hasta respuesta final.',
        ],
      },
      {
        title: 'Decisiones técnicas',
        items: [
          'Divide texto en chunks con overlap para preservar contexto.',
          'Genera embeddings y recupera fragmentos por similitud coseno.',
          'Usa skills como searchDocuments, generateAnswer, summarizeDocument y extractKeywords.',
        ],
      },
      {
        title: 'Qué demuestra Kendall',
        items: [
          'Arquitectura fullstack aplicada a IA real.',
          'Criterio para explicar RAG, fuentes y recuperación semántica.',
          'Capacidad para llevar una demo técnica a un producto entendible.',
        ],
      },
    ],
    links: [
      { label: 'Ver demo', url: OFFICIAL_LINKS.documenteDemo },
      { label: 'Ver repositorio', url: OFFICIAL_LINKS.documenteRepo },
      { label: 'Ver portfolio completo', url: OFFICIAL_LINKS.arudev },
    ],
    searchKeywords: ['documente', 'docu mente', 'rag', 'pdf', 'txt', 'embeddings', 'chunks', 'fuentes', 'documentos', 'chat con documentos'],
    options: projectOptions(),
  },

  project_qapilot: {
    id: 'project_qapilot',
    title: 'QAPilot',
    statusLabel: 'QAPilot',
    companionLine: 'QA Automation con enfoque de agente local-first.',
    action: 'deepQA',
    message: 'QAPilot es una plataforma local-first que convierte requerimientos funcionales en casos de prueba, ejecuta pruebas UI/API, analiza fallos con IA y genera reportes HTML, PDF y JSON.',
    summary: 'La idea central es llevar IA al trabajo QA sin perder control: requerimientos, casos, ejecución, análisis y reportes dentro de un flujo auditable.',
    emotion: 'happy',
    expression: 'G',
    badges: ['React', 'TypeScript', 'Node.js', 'OpenAI API', 'Playwright', 'SQLite', 'Docker', 'QA Automation'],
    sections: [
      {
        title: 'Problema que resuelve en QA',
        items: [
          'Reduce fricción al convertir requerimientos funcionales en casos de prueba.',
          'Conecta generación de pruebas con ejecución UI mediante Playwright.',
          'Ayuda a analizar fallos y entregar reportes exportables.',
        ],
      },
      {
        title: 'Decisiones técnicas',
        items: [
          'Modelo local-first: la credencial del proveedor pertenece al usuario.',
          'QAAgent con skills para analizar requerimientos, generar casos y revisar fallos.',
          'Reportes HTML, PDF y JSON para evidenciar resultados.',
        ],
      },
      {
        title: 'Qué demuestra Kendall',
        items: [
          'Experiencia práctica en QA Automation.',
          'Criterio para unir IA, pruebas, seguridad local y reportabilidad.',
          'Capacidad para diseñar herramientas internas útiles para equipos de calidad.',
        ],
      },
    ],
    links: [
      { label: 'Ver repositorio', url: OFFICIAL_LINKS.qapilotRepo },
      { label: 'Ver portfolio completo', url: OFFICIAL_LINKS.arudev },
    ],
    searchKeywords: ['qapilot', 'qa pilot', 'qaagent', 'testing', 'playwright', 'casos de prueba', 'fallos', 'reportes', 'automatizacion qa'],
    options: projectOptions(),
  },

  project_arudev: {
    id: 'project_arudev',
    title: 'AruDev',
    statusLabel: 'AruDev',
    companionLine: 'AruDev es el portfolio oficial.',
    action: 'portfolio',
    message: 'AruDev es el portfolio oficial de Kendall. Está pensado para mostrar el resumen profesional de forma rápida: skills, experiencia, proyectos, certificaciones y contacto.',
    summary: 'Aru no reemplaza AruDev. Aru explica con más detalle lo que el portfolio resume.',
    emotion: 'happy',
    expression: 'G',
    badges: ['Portfolio oficial', 'GitHub Pages', 'UI anime/chibi', 'Resumen profesional'],
    sections: [
      {
        title: 'Rol de AruDev',
        items: [
          'Presentar una lectura rápida para reclutadores o visitantes.',
          'Mostrar identidad visual, proyectos y canales oficiales.',
          'Servir como punto de entrada profesional.',
        ],
      },
      {
        title: 'Rol de Aru',
        items: [
          'Explicar decisiones técnicas y contexto detrás de cada proyecto.',
          'Guiar al visitante de forma conversacional y local.',
          'Conectar siempre de vuelta al portfolio oficial.',
        ],
      },
    ],
    links: [
      { label: 'Ver portfolio completo', url: OFFICIAL_LINKS.arudev },
      { label: 'Repositorio de AruDev', url: OFFICIAL_LINKS.arudevRepo },
    ],
    searchKeywords: ['arudev', 'aru dev', 'portfolio', 'portafolio', 'oficial', 'resumen profesional'],
    options: projectOptions(),
  },

  project_aru: {
    id: 'project_aru',
    title: 'Aru Assistant',
    statusLabel: 'Aru',
    companionLine: 'Yo soy la parte explicadora del ecosistema.',
    action: 'explainFocus',
    message: 'Aru es la asistente virtual personal de Kendall. En esta versión funciona como guía local estructurada basada en kendall-profile.md, sin backend ni modelo generativo.',
    summary: 'El proyecto demuestra una experiencia PNGTuber web con React, Vite, expresiones A-K, moods, seguimiento del mouse, parpadeo, audio/micrófono en modo avatar y guía profunda local.',
    emotion: 'happy',
    expression: 'G',
    badges: ['React', 'Vite', 'PNGTuber web', 'Conocimiento local', 'GitHub Pages'],
    sections: [
      {
        title: 'Qué demuestra',
        items: [
          'Diseño de una companion interactiva que complementa un portfolio.',
          'Separación entre entrada avatar y guía profunda.',
          'Cuidado por seguridad: sin API keys, sin backend y sin llamadas externas para la guía.',
        ],
      },
    ],
    links: [
      { label: 'Abrir Aru', url: 'https://aruhonshou.github.io/Aru/' },
      { label: 'Repositorio de Aru', url: OFFICIAL_LINKS.aruRepo },
    ],
    searchKeywords: ['aru', 'assistant', 'asistente', 'pngtuber', 'guia local', 'modo avatar'],
    options: projectOptions(),
  },

  project_openai_bot: {
    id: 'project_openai_bot',
    title: 'OpenAI Chatbot Fullstack',
    statusLabel: 'OpenAI Bot',
    companionLine: 'Separación frontend/backend para IA conversacional.',
    action: 'deepAI',
    message: 'OpenAI Chatbot Fullstack es una aplicación con frontend React y backend NestJS para chat conversacional, comparativa de modelos y visión de imagen a texto.',
    summary: 'Demuestra integración de OpenAI API, endpoints REST, separación por capas y una UI moderna para probar flujos conversacionales.',
    emotion: 'happy',
    expression: 'G',
    badges: ['React', 'TypeScript', 'Vite', 'NestJS', 'REST', 'OpenAI API', 'Vision'],
    sections: [
      {
        title: 'Qué aporta al perfil',
        items: [
          'Muestra integración fullstack con IA generativa.',
          'Separa responsabilidades entre frontend y backend.',
          'Explora chat, visión y comparativa de modelos.',
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
    title: 'Sistema de Recursos Humanos',
    statusLabel: 'RRHH',
    companionLine: 'Fullstack aplicado a un proceso real.',
    action: 'explainFocus',
    message: 'El Sistema de Recursos Humanos es un sistema fullstack para Fundación Centro VRAI enfocado en nómina, expedientes, vacaciones, reportes y panel administrativo.',
    summary: 'Según la base local, reemplazó una operación 100% en papel y redujo el tiempo administrativo un 80%.',
    emotion: 'happy',
    expression: 'G',
    badges: ['React', 'TypeScript', 'Node.js', 'MySQL', 'Jest', 'Postman'],
    sections: [
      {
        title: 'Problema que resuelve',
        items: [
          'Digitaliza expedientes, vacaciones, permisos, incapacidades y reportes.',
          'Reduce trabajo administrativo manual.',
          'Entrega paneles y flujos para una operación interna.',
        ],
      },
      {
        title: 'Qué demuestra Kendall',
        items: [
          'Capacidad de transformar procesos reales en software.',
          'Uso de frontend, backend, base de datos, pruebas y documentación.',
          'Orientación a impacto operacional, no solo a demo visual.',
        ],
      },
    ],
    links: [
      { label: 'Ver repositorio', url: OFFICIAL_LINKS.hrRepo },
      { label: 'Ver portfolio completo', url: OFFICIAL_LINKS.arudev },
    ],
    searchKeywords: ['recursos humanos', 'rrhh', 'nomina', 'expedientes', 'fundacion', 'centro vrai', 'mysql'],
    options: projectOptions(),
  },

  project_infra: {
    id: 'project_infra',
    title: 'Infraestructura AWS/Terraform',
    statusLabel: 'DevOps',
    companionLine: 'Infraestructura reproducible, no solo despliegue manual.',
    action: 'deepDevops',
    message: 'Este proyecto muestra infraestructura como código con Terraform, AWS, Docker y CI/CD para provisionar recursos reproducibles y desplegar una API containerizada.',
    summary: 'Incluye VPC personalizada, EC2 t3.micro, subnets pública y privada, Security Groups, Elastic IP e IAM con mínimos privilegios.',
    emotion: 'happy',
    expression: 'G',
    badges: ['Terraform', 'AWS', 'Docker', 'GitHub Actions', 'Flask', 'Python', 'pytest'],
    sections: [
      {
        title: 'Qué demuestra',
        items: [
          'Infraestructura reproducible con Terraform.',
          'Pipelines para aplicación e infraestructura.',
          'Criterio de seguridad con IAM y red segmentada.',
        ],
      },
    ],
    links: [
      { label: 'Ver repositorio', url: OFFICIAL_LINKS.infraRepo },
      { label: 'Ver portfolio completo', url: OFFICIAL_LINKS.arudev },
    ],
    searchKeywords: ['terraform', 'aws', 'devops', 'infraestructura', 'docker', 'github actions', 'ec2', 'vpc', 'flask'],
    options: projectOptions(),
  },

  skills: {
    id: 'skills',
    title: 'Tecnologías que domina',
    statusLabel: 'Skills',
    companionLine: 'Estas habilidades vienen de proyectos reales.',
    action: 'deepSkills',
    message: 'Kendall trabaja con frontend moderno, backend y APIs, IA aplicada, QA Automation, DevOps, cloud y bases de datos relacionales.',
    summary: 'La diferencia está en cómo combina esas áreas: React/TypeScript para producto, Node/Nest para APIs, Playwright para QA, y RAG/agentes para IA aplicada.',
    emotion: 'happy',
    expression: 'G',
    badges: ['React', 'TypeScript', 'Node.js', 'OpenAI API', 'Playwright', 'Docker', 'AWS'],
    sections: [
      { title: 'Frontend', items: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'TailwindCSS', 'Vite', 'Zustand', 'React Router', 'UI responsive'] },
      { title: 'Backend y APIs', items: ['Node.js', 'Express', 'NestJS', 'REST APIs', 'GraphQL', 'JWT', 'CORS', 'Postman'] },
      { title: 'IA y agentes', items: ['OpenAI API', 'Anthropic Claude SDK', 'RAG', 'Embeddings', 'Function Calling', 'Agentes con skills atómicas', 'Prompt Engineering'] },
      { title: 'QA y Testing', items: ['Playwright', 'Selenium', 'Jest', 'Vitest', 'pytest', 'Postman', 'Datos sintéticos', 'Jira', 'Scrum'] },
      { title: 'DevOps y Cloud', items: ['Docker', 'Docker Compose', 'GitHub Actions', 'Terraform', 'AWS EC2', 'AWS VPC', 'AWS S3', 'AWS IAM', 'Gunicorn'] },
      { title: 'Bases de datos', items: ['MySQL', 'SQL Server', 'SQLite', 'Consultas parametrizadas', 'Modelado relacional'] },
    ],
    searchKeywords: ['skill', 'skills', 'tecnologia', 'tecnologias', 'stack', 'react', 'typescript', 'node', 'backend', 'frontend', 'docker', 'aws'],
    options: [
      { label: 'Ver proyectos relacionados', next: 'projects', kind: 'primary' },
      { label: 'QA y automatización', next: 'qa_automation', kind: 'secondary' },
      { label: 'IA aplicada', next: 'ai_work', kind: 'secondary' },
      { label: 'Volver con Aru', next: 'home', kind: 'back' },
    ],
  },

  qa_automation: {
    id: 'qa_automation',
    title: 'QA y automatización',
    statusLabel: 'QA',
    companionLine: 'Kendall no solo prueba: automatiza y mejora procesos.',
    action: 'deepQA',
    message: 'Kendall tiene experiencia fuerte en QA Automation. En Novacomp, para Davivienda Bank Costa Rica, implementó automatización con Playwright + TypeScript, integró CI/CD con GitHub Actions y redujo el ciclo de pruebas cerca de 40%.',
    summary: 'La base local también conecta esa experiencia con QAPilot, un proyecto que aplica IA a generación de casos, ejecución de pruebas y análisis de fallos.',
    emotion: 'happy',
    expression: 'G',
    badges: ['Playwright', 'TypeScript', 'Postman', 'GitHub Actions', 'Jira', 'Scrum', 'QAPilot'],
    sections: [
      {
        title: 'Experiencia profesional',
        items: [
          'QA Engineer / Líder de QA en Novacomp para Davivienda Bank Costa Rica.',
          'Automatización con Playwright + TypeScript en staging aislado.',
          'Validación de APIs REST en AWS usando Postman.',
          'Documentación funcional y coordinación QA en contexto Scrum/Jira.',
        ],
      },
      {
        title: 'Qué demuestra',
        items: [
          'Criterio para priorizar flujos críticos.',
          'Capacidad de reducir ciclos de prueba con automatización.',
          'Conexión entre QA profesional y herramientas propias como QAPilot.',
        ],
      },
    ],
    links: [
      { label: 'Ver QAPilot', url: OFFICIAL_LINKS.qapilotRepo },
      { label: 'Ver portfolio completo', url: OFFICIAL_LINKS.arudev },
    ],
    searchKeywords: ['qa', 'automation', 'automatizacion', 'automatización', 'playwright', 'novacomp', 'davivienda', 'postman', 'testing', 'jiras', 'scrum'],
    options: [
      { label: 'Ver QAPilot en detalle', next: 'project_qapilot', kind: 'primary' },
      { label: 'Tecnologías que usa', next: 'skills', kind: 'secondary' },
      { label: 'Volver con Aru', next: 'home', kind: 'back' },
    ],
  },

  ai_work: {
    id: 'ai_work',
    title: 'IA aplicada',
    statusLabel: 'IA',
    companionLine: 'RAG, agentes y OpenAI API son parte de su enfoque actual.',
    action: 'deepAI',
    message: 'Kendall aplica IA generativa en proyectos concretos: DocuMente usa RAG, embeddings y fuentes citables; QAPilot usa IA para transformar requerimientos en pruebas; OpenAI Chatbot integra chat y visión.',
    summary: 'Su enfoque de AI-Augmented Development no es solo usar prompts: incluye agentes, Function Calling, embeddings, RAG, workflows del SDLC y productos demostrables.',
    emotion: 'happy',
    expression: 'G',
    badges: ['OpenAI API', 'Anthropic SDK', 'RAG', 'Embeddings', 'Function Calling', 'Agentes'],
    sections: [
      {
        title: 'Cómo lo aplica',
        items: [
          'DocuMente: documentos, chunks, embeddings, recuperación semántica y fuentes.',
          'QAPilot: generación de casos, ejecución de pruebas, análisis de fallos y reportes.',
          'OpenAI Chatbot: frontend React, backend NestJS, chat, visión y comparativa de modelos.',
        ],
      },
      {
        title: 'Qué demuestra profesionalmente',
        items: [
          'Capacidad de aterrizar IA en flujos de producto.',
          'Criterio para separar frontend/backend y proteger secretos.',
          'Entendimiento de agentes con skills atómicas y búsqueda contextual.',
        ],
      },
    ],
    links: [
      { label: 'Ver DocuMente', url: OFFICIAL_LINKS.documenteRepo },
      { label: 'Ver QAPilot', url: OFFICIAL_LINKS.qapilotRepo },
      { label: 'Ver portfolio completo', url: OFFICIAL_LINKS.arudev },
    ],
    searchKeywords: ['ia', 'ai', 'openai', 'anthropic', 'rag', 'embeddings', 'function calling', 'agentes', 'prompt', 'sdlc'],
    options: [
      { label: 'Ver DocuMente', next: 'project_documente', kind: 'primary' },
      { label: 'Ver QAPilot', next: 'project_qapilot', kind: 'secondary' },
      { label: 'Ver OpenAI Bot', next: 'project_openai_bot', kind: 'secondary' },
      { label: 'Volver con Aru', next: 'home', kind: 'back' },
    ],
  },

  fullstack: {
    id: 'fullstack',
    title: 'Fullstack React/Node/TypeScript',
    statusLabel: 'Fullstack',
    companionLine: 'Frontend y backend conectados con intención de producto.',
    action: 'explainFocus',
    message: 'Kendall construye aplicaciones React + TypeScript, APIs REST/GraphQL y backends con Node.js, Express y NestJS.',
    summary: 'En proyectos como DocuMente, OpenAI Bot y Sistema RRHH se ve esa combinación de UI, API, datos, pruebas y despliegue.',
    emotion: 'happy',
    expression: 'G',
    badges: ['React', 'TypeScript', 'Node.js', 'Express', 'NestJS', 'REST', 'GraphQL'],
    sections: [
      {
        title: 'Dónde se ve',
        items: [
          'DocuMente une frontend, backend, SQLite, RAG y Docker.',
          'OpenAI Bot separa frontend React y backend NestJS.',
          'Sistema RRHH aplica React, Node y MySQL a procesos administrativos.',
        ],
      },
    ],
    searchKeywords: ['fullstack', 'react', 'node', 'typescript', 'express', 'nestjs', 'api', 'graphql', 'rest'],
    options: [
      { label: 'Ver proyectos', next: 'projects', kind: 'primary' },
      { label: 'Ver skills', next: 'skills', kind: 'secondary' },
      { label: 'Volver con Aru', next: 'home', kind: 'back' },
    ],
  },

  devops: {
    id: 'devops',
    title: 'DevOps, AWS y CI/CD',
    statusLabel: 'DevOps',
    companionLine: 'Automatización también fuera del frontend.',
    action: 'deepDevops',
    message: 'Kendall trabaja con Docker, Docker Compose, GitHub Actions, Terraform y AWS. Su proyecto de infraestructura automatizada muestra recursos reproducibles y despliegue containerizado.',
    emotion: 'happy',
    expression: 'G',
    badges: ['Docker', 'GitHub Actions', 'Terraform', 'AWS', 'EC2', 'VPC', 'IAM'],
    sections: [
      {
        title: 'Qué cubre',
        items: [
          'Contenedores con Docker y Docker Compose.',
          'Pipelines con GitHub Actions.',
          'Infraestructura AWS con Terraform: VPC, EC2, subnets, Security Groups, Elastic IP e IAM.',
        ],
      },
    ],
    links: [
      { label: 'Ver infraestructura', url: OFFICIAL_LINKS.infraRepo },
    ],
    searchKeywords: ['devops', 'aws', 'terraform', 'docker', 'github actions', 'ci cd', 'cicd', 'infraestructura'],
    options: [
      { label: 'Infraestructura en detalle', next: 'project_infra', kind: 'primary' },
      { label: 'Ver proyectos', next: 'projects', kind: 'secondary' },
      { label: 'Volver con Aru', next: 'home', kind: 'back' },
    ],
  },

  experience: {
    id: 'experience',
    title: 'Experiencia profesional',
    statusLabel: 'Experiencia',
    companionLine: 'Experiencia real en QA, fullstack e IA aplicada.',
    action: 'explainFocus',
    message: 'La experiencia de Kendall combina QA Automation en contexto bancario, liderazgo QA y desarrollo fullstack freelance para clientes de Costa Rica y Estados Unidos.',
    emotion: 'happy',
    expression: 'G',
    badges: ['Novacomp', 'Davivienda', 'QA Automation', 'Freelance fullstack', 'React', 'Node.js'],
    sections: [
      {
        title: 'Novacomp / Davivienda Bank Costa Rica',
        items: [
          'QA Engineer / Líder de QA entre 2025 y 2026.',
          'Automatización con Playwright + TypeScript en staging aislado.',
          'CI/CD con GitHub Actions y reducción del ciclo de pruebas cerca de 40%.',
          'Validación de APIs REST en AWS usando Postman.',
        ],
      },
      {
        title: 'Fullstack freelance',
        items: [
          'Desarrollador fullstack desde 2023 para más de 10 clientes en Costa Rica y Estados Unidos.',
          'Aplicaciones React + TypeScript, APIs REST/GraphQL y backends Node/Express/NestJS.',
          'Integraciones con OpenAI API, Anthropic Claude SDK, RAG, Function Calling y embeddings.',
        ],
      },
    ],
    searchKeywords: ['experiencia', 'trabajo', 'novacomp', 'davivienda', 'freelance', 'cliente', 'clientes', 'qa', 'lider', 'banco'],
    options: [
      { label: 'QA y automatización', next: 'qa_automation', kind: 'primary' },
      { label: 'Fullstack', next: 'fullstack', kind: 'secondary' },
      { label: 'Contacto', next: 'contact', kind: 'secondary' },
      { label: 'Volver con Aru', next: 'home', kind: 'back' },
    ],
  },

  why_hire: {
    id: 'why_hire',
    title: 'Por qué contratar a Kendall',
    statusLabel: 'Contratar',
    companionLine: 'Razones concretas, sin exagerar.',
    action: 'whyHire',
    message: 'Kendall es un perfil híbrido entre fullstack, QA Automation e IA aplicada. Sus proyectos públicos permiten evaluar código, arquitectura, producto y criterio técnico.',
    summary: 'La razón fuerte para considerarlo es la combinación: construye producto, automatiza calidad, aplica IA y entiende despliegue/DevOps.',
    emotion: 'happy',
    expression: 'G',
    badges: ['Fullstack', 'QA Automation', 'IA aplicada', 'DevOps', 'Proyectos públicos'],
    sections: [
      {
        title: 'Fortalezas verificables',
        items: [
          'Proyectos públicos: AruDev, DocuMente, QAPilot, OpenAI Bot, Sistema RRHH e infraestructura AWS/Terraform.',
          'Experiencia QA en contexto bancario con Playwright, Postman y GitHub Actions.',
          'Stack moderno con React, TypeScript, Node.js, Docker, RAG y agentes.',
        ],
      },
      {
        title: 'Dónde encaja',
        items: [
          'Roles fullstack, frontend, QA Automation o IA aplicada.',
          'Equipos que valoran producto, pruebas, documentación y demos técnicas.',
          'Ambientes remotos o presenciales en Costa Rica, según la base local.',
        ],
      },
    ],
    links: [
      { label: 'Ver portfolio completo', url: OFFICIAL_LINKS.arudev },
      { label: 'GitHub de Kendall', url: OFFICIAL_LINKS.github },
      { label: 'LinkedIn', url: OFFICIAL_LINKS.linkedin },
    ],
    searchKeywords: ['contratar', 'hire', 'por que', 'porque', 'razones', 'diferencia', 'fortalezas', 'reclutador', 'oportunidad'],
    options: [
      { label: 'Ver experiencia', next: 'experience', kind: 'primary' },
      { label: 'Ver proyectos', next: 'projects', kind: 'secondary' },
      { label: 'Contacto', next: 'contact', kind: 'secondary' },
      { label: 'Volver con Aru', next: 'home', kind: 'back' },
    ],
  },

  certifications: {
    id: 'certifications',
    title: 'Formación y certificaciones',
    statusLabel: 'Formación',
    companionLine: 'Formación documentada en la base local.',
    action: 'explainFocus',
    message: 'Kendall registra formación académica y complementaria en ingeniería de sistemas, IA aplicada al SDLC y tecnologías clave para fullstack, QA y DevOps.',
    emotion: 'happy',
    expression: 'G',
    badges: ['UIA', 'CENFOTEC', 'CCCN', 'DevTalles', 'Udemy'],
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
          'TypeScript, React, Node.js, NestJS, Playwright, Docker y MySQL.',
          'La base local no registra una certificación AWS oficial; por eso Aru no debe afirmarla.',
        ],
      },
    ],
    links: [
      { label: 'Verificar certificados', url: 'https://cursos.devtalles.com/certificates' },
      { label: 'Ver portfolio completo', url: OFFICIAL_LINKS.arudev },
    ],
    searchKeywords: ['certificacion', 'certificaciones', 'certificado', 'educacion', 'formacion', 'estudios', 'universidad', 'cenfotec', 'uia', 'devtalles', 'udemy'],
    options: [
      { label: 'Ver skills', next: 'skills', kind: 'primary' },
      { label: 'Por qué contratarlo', next: 'why_hire', kind: 'secondary' },
      { label: 'Volver con Aru', next: 'home', kind: 'back' },
    ],
  },

  contact: {
    id: 'contact',
    title: 'Contacto y enlaces oficiales',
    statusLabel: 'Contacto',
    companionLine: 'Canales públicos registrados.',
    action: 'portfolio',
    message: 'Puedes contactar a Kendall por sus canales públicos profesionales y visitar AruDev como portfolio oficial.',
    emotion: 'happy',
    expression: 'G',
    badges: ['AruDev', 'GitHub', 'LinkedIn', 'Email'],
    sections: [
      {
        title: 'Canales públicos',
        items: [
          'GitHub: AruHonshou.',
          'LinkedIn: Kendall Valverde Díaz.',
          'Email profesional: kendallavd@gmail.com.',
          'Portfolio oficial: AruDev.',
        ],
      },
    ],
    links: [
      { label: 'Ver portfolio completo', url: OFFICIAL_LINKS.arudev },
      { label: 'GitHub de Kendall', url: OFFICIAL_LINKS.github },
      { label: 'Repositorio de Aru', url: OFFICIAL_LINKS.aruRepo },
      { label: 'LinkedIn', url: OFFICIAL_LINKS.linkedin },
      { label: 'Email', url: OFFICIAL_LINKS.email },
    ],
    searchKeywords: ['contacto', 'contactar', 'email', 'correo', 'linkedin', 'github', 'portfolio', 'portafolio', 'arudev'],
    options: [
      { label: 'Ver portfolio completo', url: OFFICIAL_LINKS.arudev, kind: 'link', action: 'portfolio' },
      { label: 'Volver con Aru', next: 'home', kind: 'back' },
    ],
  },

  free_question: {
    id: 'free_question',
    title: 'Búsqueda local',
    statusLabel: 'Búsqueda local',
    companionLine: 'Buscaré solo en mi base local.',
    action: 'thinking',
    message: 'También puedes buscar algo específico sobre Kendall. Prueba con DocuMente, QAPilot, React, QA, IA, experiencia, contacto o Terraform.',
    emotion: 'thinking',
    expression: 'H',
    searchKeywords: ['preguntar', 'pregunta', 'buscar', 'busqueda', 'búsqueda', 'algo especifico', 'algo específico', 'especifico', 'específico'],
    options: [
      { label: 'Ver proyectos', next: 'projects', kind: 'primary' },
      { label: 'Ver skills', next: 'skills', kind: 'secondary' },
      { label: 'Volver con Aru', next: 'home', kind: 'back' },
    ],
  },

  not_found: {
    id: 'not_found',
    title: 'Dato no registrado',
    statusLabel: 'Sin datos',
    companionLine: 'Si no está en la base local, no lo invento.',
    action: 'notFound',
    message: 'Mmm... ese dato no lo tengo registrado todavía. Puedo ayudarte con información pública sobre Kendall, sus proyectos, skills, experiencia, formación, certificaciones y contacto.',
    emotion: 'thinking',
    expression: 'H',
    searchKeywords: [],
    options: [
      { label: 'Resumen profundo', next: 'deep_summary', kind: 'primary' },
      { label: 'Proyectos en detalle', next: 'projects', kind: 'primary' },
      { label: 'QA y automatización', next: 'qa_automation', kind: 'secondary' },
      { label: 'Contacto', next: 'contact', kind: 'secondary' },
      { label: 'Volver con Aru', next: 'home', kind: 'back' },
    ],
  },
};

export const deepGuideMeta = {
  sourceNote,
  profileCharacters: kendallProfileText.length,
  hasAntiHallucinationRule: kendallProfileText.includes('Si tienes duda, no inventes'),
  nodeCount: Object.keys(deepGuideNodes).length,
};
