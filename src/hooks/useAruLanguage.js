import React from 'react';
import {
  getInitialLanguage,
  LANGUAGE_STORAGE_KEY,
  normalizeLanguage,
  saveLanguage,
} from '../i18n/aru-i18n';

export function useAruLanguage() {
  const [language, setLanguageState] = React.useState(getInitialLanguage);

  const setLanguage = React.useCallback((nextLanguage) => {
    const normalized = normalizeLanguage(nextLanguage);
    setLanguageState(normalized);
    saveLanguage(normalized);
  }, []);

  React.useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  React.useEffect(() => {
    function syncLanguage(event) {
      if (event.key === LANGUAGE_STORAGE_KEY && event.newValue) {
        setLanguageState(normalizeLanguage(event.newValue));
      }
    }

    window.addEventListener('storage', syncLanguage);
    return () => window.removeEventListener('storage', syncLanguage);
  }, []);

  return [language, setLanguage];
}
