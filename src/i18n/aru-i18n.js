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
      brandSubtitle: 'Portafolio interactivo de Kendall',
      navLabel: 'Acciones del portafolio',
      talkWithAru: 'Preguntarle a Aru',
      viewPortfolio: 'Abrir portfolio',
      mainAria: 'Portafolio interactivo con Aru',
      panelAria: 'Panel del portafolio de Kendall',
      currentSection: 'Sección',
      sectionsNav: 'Secciones del portafolio',
      settingsTitle: 'Ajustes de Aru',
      settingsButton: 'Ajustes',
      closeSettings: 'Cerrar ajustes',
      settings: {
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
    },
    guide: {
      brandSubtitle: 'PNGTuber deep guide',
      status: 'Estado',
      section: 'Sección',
      visitor: 'Visitante',
      backToAvatar: 'Volver al portfolio',
      title: 'Guía con Aru',
      subtitle: 'Aru explica el perfil de Kendall usando conocimiento local.',
      newConversation: 'Nueva conversación',
      clearMemory: 'Borrar memoria local',
      searchPlaceholder: 'Busca en la base local de Kendall...',
      searchAria: 'Búsqueda local sobre Kendall',
      searchButton: 'Buscar',
      panelAria: 'Guía con Aru',
      ready: 'Lista',
      noData: 'Sin datos',
      companionFallback: 'Guiando el perfil de Kendall ✨',
      companionHome: 'Aru guía el portfolio principal de Kendall.',
    },
    mood: {
      bored: 'No pierdas Aru... Brilla Aru...',
      locked: 'Ya déjame en paz, ahora refresca la página.',
      annoyed: '💢 💢 ¡Deja de darme clics!',
      sorry: 'Lo siento',
    },
  },
  en: {
    common: {
      language: 'Language',
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
      brandSubtitle: 'Kendall’s interactive portfolio',
      navLabel: 'Portfolio actions',
      talkWithAru: '💬 Ask Aru',
      viewPortfolio: 'Open portfolio',
      mainAria: 'Interactive portfolio with Aru',
      panelAria: 'Kendall portfolio panel',
      currentSection: 'Section',
      sectionsNav: 'Portfolio sections',
      settingsTitle: 'Aru settings',
      settingsButton: 'Settings',
      closeSettings: 'Close settings',
      settings: {
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
    },
    guide: {
      brandSubtitle: 'PNGTuber deep guide',
      status: 'Status',
      section: 'Section',
      visitor: 'Visitor',
      backToAvatar: 'Back to portfolio',
      title: 'Guide with Aru',
      subtitle: 'Aru explains Kendall’s profile using local knowledge.',
      newConversation: 'New conversation',
      clearMemory: 'Clear local memory',
      searchPlaceholder: 'Search Kendall’s local knowledge base...',
      searchAria: 'Local search about Kendall',
      searchButton: 'Search',
      panelAria: 'Guide with Aru',
      ready: 'Ready',
      noData: 'No data',
      companionFallback: 'Guiding Kendall’s profile ✨',
      companionHome: 'Aru guides Kendall’s main portfolio.',
    },
    mood: {
      bored: 'Don’t lose Aru... Shine, Aru...',
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
