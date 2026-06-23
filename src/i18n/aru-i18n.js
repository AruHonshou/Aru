export const SUPPORTED_LANGUAGES = ['es', 'en'];
export const DEFAULT_LANGUAGE = 'es';
export const LANGUAGE_STORAGE_KEY = 'aru-language-v1';

export const LANGUAGE_OPTIONS = [
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'en', label: 'EN', name: 'English' },
];

export const UI_TEXT = {
  es: {
    common: {
      language: 'Idioma',
      sourceNote: 'Fuente local: kendall-profile.md',
      userBadge: 'Tu',
      localGuide: 'Guía local',
      project: 'Proyecto',
      sourceKicker: 'Aru Deep Guide',
      projectKicker: 'Ficha técnica guiada',
      explainKicker: 'Aru explica',
      featureTopics: 'Temas clave',
      projectStack: 'Stack y enfoque',
      links: 'Enlaces oficiales',
      projectLinks: 'Enlaces destacados',
      flowOptions: 'Opciones de Aru',
      backTo: 'Volver a {{title}}',
    },
    index: {
      brandSubtitle: 'Modo avatar',
      navLabel: 'Acciones principales',
      talkWithAru: '💬 Hablar con Aru',
      viewPortfolio: '🌐 Ver portfolio completo',
      mainAria: 'Avatar y controles de Aru',
      panelAria: 'Controles de voz de Aru',
      audioMode: 'Modo audio',
      panelTitle: {
        listening: 'Aru está escuchando',
        playing: 'Aru está reproduciendo',
        ready: 'Aru está lista',
      },
      panelCopy: 'Tu compañera chibi reacciona a voz, audio y movimiento.',
      microphone: 'Micrófono',
      audio: 'Audio',
      mouth: 'Boca',
      status: 'Estado',
      waiting: 'En espera',
      active: 'Activo',
      noFile: 'Sin archivo',
      loaded: 'Cargado',
      closed: 'Cerrada',
      halfOpen: 'Media',
      open: 'Abierta',
      ready: 'Lista',
      listening: 'Escuchando',
      playing: 'Reproduciendo',
      audioLoaded: 'Audio cargado',
      startMic: 'Iniciar micrófono',
      stopMic: 'Detener micrófono',
      loadAudio: 'Cargar archivo de audio',
      startMicAria: 'Iniciar micrófono de Aru',
      stopMicAria: 'Detener micrófono de Aru',
      volume: 'Volumen',
      settingsTitle: 'Ajustes de Aru',
      settingsButton: 'Ajustes',
      closeSettings: 'Cerrar ajustes',
      settings: {
        mouth: 'Boca',
        micSensitivity: 'Sensibilidad del micrófono',
        halfThreshold: 'Umbral semiabierta',
        fullThreshold: 'Umbral abierta',
        releaseSpeed: 'Velocidad de cierre',
        autoBlink: 'Parpadeo automático',
        movement: 'Movimiento',
        followRange: 'Rango de seguimiento',
        followSpeed: 'Velocidad de seguimiento',
        appearance: 'Apariencia',
        characterSize: 'Tamaño del personaje',
        animeBg: 'Fondo anime',
        bgBase: 'Color base del fondo',
        bgSoft: 'Color secundario suave',
        bgAccent: 'Color acento/decoraciones',
        bgDecor: 'Color brillos/menta',
        bgDecorations: 'Decoraciones del fondo',
        ambience: 'Intensidad del ambiente',
        density: 'Cantidad de decoraciones',
        debug: 'Depuración',
        showGrid: 'Mostrar cuadrícula',
      },
      errors: {
        micUnsupported: 'Este navegador no permite usar el micrófono aquí.',
        audioContextUnsupported: 'Este navegador no soporta AudioContext.',
        micDenied: 'Permiso de micrófono denegado. Revisa los permisos del navegador.',
        micUnavailable: 'No se puede usar el micrófono ahora.',
        invalidAudio: 'Archivo inválido. Elige un archivo de audio.',
      },
    },
    guide: {
      brandSubtitle: 'PNGTuber deep guide',
      status: 'Estado',
      section: 'Sección',
      visitor: 'Visitante',
      backToAvatar: 'Volver al avatar',
      title: 'Guía con Aru',
      subtitle: 'Aru explica lo que AruDev resume, usando conocimiento local.',
      newConversation: 'Nueva conversación',
      clearMemory: 'Borrar memoria local',
      searchPlaceholder: 'Busca en la base local de Kendall...',
      searchAria: 'Búsqueda local sobre Kendall',
      searchButton: 'Buscar',
      panelAria: 'Guía con Aru',
      ready: 'Lista',
      noData: 'Sin datos',
      companionFallback: 'Guiando el perfil de Kendall ✨',
      companionHome: 'Aru explica lo que AruDev resume.',
    },
    mood: {
      bored: '¿Sigues aquí? Me estoy aburriendo...',
      locked: 'Ya déjame en paz, ahora refresca la página.',
      annoyed: '💢 💢 ¡Deja de darme clics!',
      sorry: 'Lo siento',
    },
  },
  en: {
    common: {
      language: 'Language',
      sourceNote: 'Local source: kendall-profile.md',
      userBadge: 'You',
      localGuide: 'Local guide',
      project: 'Project',
      sourceKicker: 'Aru Deep Guide',
      projectKicker: 'Guided technical card',
      explainKicker: 'Aru explains',
      featureTopics: 'Key topics',
      projectStack: 'Stack and focus',
      links: 'Official links',
      projectLinks: 'Featured links',
      flowOptions: 'Aru options',
      backTo: 'Back to {{title}}',
    },
    index: {
      brandSubtitle: 'Avatar mode',
      navLabel: 'Main actions',
      talkWithAru: '💬 Talk with Aru',
      viewPortfolio: '🌐 View full portfolio',
      mainAria: 'Aru avatar and controls',
      panelAria: 'Aru voice controls',
      audioMode: 'Audio mode',
      panelTitle: {
        listening: 'Aru is listening',
        playing: 'Aru is playing',
        ready: 'Aru is ready',
      },
      panelCopy: 'Your chibi companion reacts to voice, audio, and movement.',
      microphone: 'Microphone',
      audio: 'Audio',
      mouth: 'Mouth',
      status: 'Status',
      waiting: 'Waiting',
      active: 'Active',
      noFile: 'No file',
      loaded: 'Loaded',
      closed: 'Closed',
      halfOpen: 'Half-open',
      open: 'Open',
      ready: 'Ready',
      listening: 'Listening',
      playing: 'Playing',
      audioLoaded: 'Audio loaded',
      startMic: 'Start microphone',
      stopMic: 'Stop microphone',
      loadAudio: 'Load audio file',
      startMicAria: 'Start Aru microphone',
      stopMicAria: 'Stop Aru microphone',
      volume: 'Volume',
      settingsTitle: 'Aru settings',
      settingsButton: 'Settings',
      closeSettings: 'Close settings',
      settings: {
        mouth: 'Mouth',
        micSensitivity: 'Microphone sensitivity',
        halfThreshold: 'Half-open threshold',
        fullThreshold: 'Open threshold',
        releaseSpeed: 'Close speed',
        autoBlink: 'Automatic blink',
        movement: 'Movement',
        followRange: 'Tracking range',
        followSpeed: 'Tracking speed',
        appearance: 'Appearance',
        characterSize: 'Character size',
        animeBg: 'Anime background',
        bgBase: 'Base background color',
        bgSoft: 'Soft secondary color',
        bgAccent: 'Accent/decor color',
        bgDecor: 'Sparkle/mint color',
        bgDecorations: 'Background decorations',
        ambience: 'Ambient intensity',
        density: 'Decoration density',
        debug: 'Debug',
        showGrid: 'Show grid',
      },
      errors: {
        micUnsupported: 'This browser cannot use the microphone here.',
        audioContextUnsupported: 'This browser does not support AudioContext.',
        micDenied: 'Microphone permission was denied. Check your browser permissions.',
        micUnavailable: 'The microphone cannot be used right now.',
        invalidAudio: 'Invalid file. Choose an audio file.',
      },
    },
    guide: {
      brandSubtitle: 'PNGTuber deep guide',
      status: 'Status',
      section: 'Section',
      visitor: 'Visitor',
      backToAvatar: 'Back to avatar',
      title: 'Guide with Aru',
      subtitle: 'Aru explains what AruDev summarizes, using local knowledge.',
      newConversation: 'New conversation',
      clearMemory: 'Clear local memory',
      searchPlaceholder: 'Search Kendall’s local knowledge base...',
      searchAria: 'Local search about Kendall',
      searchButton: 'Search',
      panelAria: 'Guide with Aru',
      ready: 'Ready',
      noData: 'No data',
      companionFallback: 'Guiding Kendall’s profile ✨',
      companionHome: 'Aru explains what AruDev summarizes.',
    },
    mood: {
      bored: 'Are you still here? I am getting bored...',
      locked: 'Leave me alone now, then refresh the page.',
      annoyed: '💢 💢 Stop clicking me!',
      sorry: 'Sorry',
    },
  },
};

export function normalizeLanguage(language) {
  return SUPPORTED_LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE;
}

export function getInitialLanguage() {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (SUPPORTED_LANGUAGES.includes(stored)) return stored;
  } catch {
    // localStorage can be unavailable in strict browser modes.
  }

  try {
    return window.navigator.language?.toLowerCase().startsWith('en') ? 'en' : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

export function saveLanguage(language) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, normalizeLanguage(language));
  } catch {
    // Language persistence improves UX, but the UI must keep working without it.
  }
}

export function localize(value, language = DEFAULT_LANGUAGE) {
  const lang = normalizeLanguage(language);

  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (typeof value !== 'object') return value;
  if (Array.isArray(value)) return value.map((item) => localize(item, lang));

  if (Object.prototype.hasOwnProperty.call(value, 'es') || Object.prototype.hasOwnProperty.call(value, 'en')) {
    return value[lang] ?? value.es ?? value.en ?? '';
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, localize(item, lang)]),
  );
}

export function translate(path, language = DEFAULT_LANGUAGE, params = {}) {
  const lang = normalizeLanguage(language);
  const fallback = path.split('.').reduce((current, part) => current?.[part], UI_TEXT.es);
  const localized = path.split('.').reduce((current, part) => current?.[part], UI_TEXT[lang]) ?? fallback ?? '';
  return String(localized).replace(/\{\{(\w+)\}\}/g, (_, key) => params[key] ?? '');
}
