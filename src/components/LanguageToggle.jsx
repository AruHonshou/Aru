import React from 'react';
import { LANGUAGE_OPTIONS, translate } from '../i18n/aru-i18n';

export default function LanguageToggle({ language, onChange, className = '' }) {
  return (
    <div className={['language-toggle', className].filter(Boolean).join(' ')} aria-label={translate('common.language', language)}>
      <span className="language-toggle__label">{translate('common.language', language)}</span>
      <div className="language-toggle__options" role="group" aria-label={translate('common.language', language)}>
        {LANGUAGE_OPTIONS.map((option) => (
          <button
            key={option.code}
            type="button"
            className={language === option.code ? 'language-toggle__button language-toggle__button--active' : 'language-toggle__button'}
            aria-pressed={language === option.code}
            aria-label={option.name}
            onClick={() => onChange(option.code)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
