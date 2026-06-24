import React from 'react';
import ReactDOM from 'react-dom/client';
import AruAvatar from './components/AruAvatar';
import LanguageToggle from './components/LanguageToggle';
import { useAruExpressionController } from './hooks/useAruExpressionController';
import { useAruLanguage } from './hooks/useAruLanguage';
import { useAruMotionController } from './hooks/useAruMotionController';
import { ARU_EXPRESSION_PRIORITY } from './lib/aru-expression-map';
import { localize, translate } from './i18n/aru-i18n';
import {
  getPortfolioSection,
  portfolioCta,
  portfolioSections,
} from './data/portfolio-sections';
import './styles/aru-pages.css';

const SIMPLE_DEFAULTS = /*EDITMODE-BEGIN*/{
  "followRange": 340,
  "smoothing": 0.3,
  "charSize": 78,
  "bgColor": "#FFEAD3",
  "bgSoftColor": "#FFE8F1",
  "bgAccentColor": "#FF9FC8",
  "bgDecorColor": "#9BE7D1",
  "bgDecorEnabled": true,
  "bgMotion": 0.7,
  "bgDensity": 0.75,
  "showDebug": false,
  "autoBlink": true
}/*EDITMODE-END*/;

function PortfolioTags({ tags }) {
  if (!tags?.length) return null;
  return (
    <div className="portfolio-tags">
      {tags.map((tag) => <span key={tag}>{tag}</span>)}
    </div>
  );
}

function PortfolioIdentity({ items, language }) {
  if (!items?.length) return null;
  return (
    <dl
      className="portfolio-identity"
      aria-label={localize({ es: 'Datos profesionales principales', en: 'Main professional facts' }, language)}
    >
      {items.map((item) => (
        <div className="portfolio-identity__item" key={localize(item.label, language)}>
          <dt>{localize(item.label, language)}</dt>
          <dd>{localize(item.value, language)}</dd>
        </div>
      ))}
    </dl>
  );
}

function SectionHighlights({ items, language }) {
  if (!items?.length) return null;
  return (
    <ul className="portfolio-highlights">
      {items.map((item) => <li key={localize(item, language)}>{localize(item, language)}</li>)}
    </ul>
  );
}

function SkillGroups({ groups, language }) {
  if (!groups?.length) return null;
  return (
    <div className="portfolio-skill-grid">
      {groups.map((group) => (
        <section className="portfolio-mini-card" key={localize(group.title, language)}>
          <h4>{localize(group.title, language)}</h4>
          {group.description ? <p>{localize(group.description, language)}</p> : null}
          <div className="portfolio-chip-list">
            {group.items.map((item) => <span key={item}>{item}</span>)}
          </div>
        </section>
      ))}
    </div>
  );
}

function ExperienceTimeline({ timeline, language }) {
  if (!timeline?.length) return null;
  return (
    <div className="portfolio-timeline">
      {timeline.map((entry) => (
        <section className="portfolio-timeline__item" key={`${localize(entry.role, language)}-${localize(entry.period, language)}`}>
          <div>
            <div className="portfolio-timeline__meta">
              {entry.index ? <span>{entry.index}</span> : null}
              <span className="portfolio-timeline__period">{localize(entry.period, language)}</span>
            </div>
            <h4>{localize(entry.role, language)}</h4>
            <p>{localize(entry.place, language)}</p>
          </div>
          {entry.description ? <p>{localize(entry.description, language)}</p> : null}
          <ul>
            {entry.items.map((item) => <li key={localize(item, language)}>{localize(item, language)}</li>)}
          </ul>
          <PortfolioTags tags={entry.stack} />
        </section>
      ))}
    </div>
  );
}

function ActionButtons({ actions, language, onSelectSection, compact = false, disabled = false }) {
  if (!actions?.length) return null;
  return (
    <div className={compact ? 'portfolio-actions portfolio-actions--compact' : 'portfolio-actions'}>
      {actions.map((action) => {
        const label = localize(action.label, language);
        const className = [
          'portfolio-action',
          action.variant ? `portfolio-action--${action.variant}` : '',
        ].filter(Boolean).join(' ');

        if (action.section) {
          return (
            <button
              type="button"
              className={className}
              disabled={disabled}
              onClick={() => {
                if (disabled) return;
                onSelectSection(action.section);
              }}
              key={`${label}-${action.section}`}
            >
              {label}
            </button>
          );
        }

        return (
          <a
            className={className}
            href={action.href}
            target={action.href?.startsWith('mailto:') || action.href?.includes('guia.html') ? undefined : '_blank'}
            rel={action.href?.startsWith('mailto:') || action.href?.includes('guia.html') ? undefined : 'noopener noreferrer'}
            aria-disabled={disabled ? 'true' : undefined}
            tabIndex={disabled ? -1 : undefined}
            onClick={(event) => {
              if (disabled) event.preventDefault();
            }}
            key={`${label}-${action.href}`}
          >
            {label}
          </a>
        );
      })}
    </div>
  );
}

function ProjectCards({ projects, language, onSelectSection, disabled = false }) {
  if (!projects?.length) return null;
  return (
    <div className="portfolio-project-grid">
      {projects.map((project) => (
          <article className="portfolio-project-card" key={project.name}>
            <span className="portfolio-project-card__category">{localize(project.category, language)}</span>
            <h4>{project.name}</h4>
            <p>{localize(project.description, language)}</p>
            {project.impact ? <strong className="portfolio-project-card__impact">{localize(project.impact, language)}</strong> : null}
            <div className="portfolio-project-card__stack">
              {project.stack.map((item) => <span key={item}>{item}</span>)}
            </div>
            <ActionButtons actions={project.actions} language={language} onSelectSection={onSelectSection} compact disabled={disabled} />
          </article>
      ))}
    </div>
  );
}

function ContactLinks({ links, language, disabled = false }) {
  if (!links?.length) return null;
  return (
    <div className="portfolio-contact-grid">
      {links.map((link) => {
        const label = localize(link.label, language);
        const value = localize(link.value, language);
        const content = (
          <>
            <span>{label}</span>
            <strong>{value}</strong>
          </>
        );

        return link.href ? (
          <a
            className="portfolio-contact-card"
            href={link.href}
            target={link.href.startsWith('mailto:') ? undefined : '_blank'}
            rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            aria-disabled={disabled ? 'true' : undefined}
            tabIndex={disabled ? -1 : undefined}
            onClick={(event) => {
              if (disabled) event.preventDefault();
            }}
            key={`${label}-${value}`}
          >
            {content}
          </a>
        ) : (
          <div className="portfolio-contact-card" key={`${label}-${value}`}>
            {content}
          </div>
        );
      })}
    </div>
  );
}

function PortfolioPanel({ section, language, onSelectSection, disabled = false }) {
  const cta = section.cta ? portfolioCta[section.cta] : null;

  return (
    <article className="portfolio-card" key={section.id}>
      <div className="portfolio-card__header">
        <span className="portfolio-card__eyebrow">{localize(section.eyebrow, language)}</span>
        <h2>{localize(section.title, language)}</h2>
        <p>{localize(section.summary, language)}</p>
      </div>

      <PortfolioIdentity items={section.identity} language={language} />
      <SectionHighlights items={section.highlights} language={language} />
      <PortfolioTags tags={section.tags} />
      <ActionButtons actions={section.actions} language={language} onSelectSection={onSelectSection} disabled={disabled} />
      <SkillGroups groups={section.groups} language={language} />
      <ExperienceTimeline timeline={section.timeline} language={language} />
      <ProjectCards projects={section.projects} language={language} onSelectSection={onSelectSection} disabled={disabled} />
      <ContactLinks links={section.contactLinks} language={language} disabled={disabled} />

      {cta ? (
        <div className="portfolio-card__footer">
          <a
            className="portfolio-guide-link"
            href={cta.href}
            aria-disabled={disabled ? 'true' : undefined}
            tabIndex={disabled ? -1 : undefined}
            onClick={(event) => {
              if (disabled) event.preventDefault();
            }}
          >
            {localize(cta.label, language)}
          </a>
        </div>
      ) : null}
    </article>
  );
}

function App() {
  const [language, setLanguage] = useAruLanguage();
  const t = SIMPLE_DEFAULTS;
  const [mood, setMood] = React.useState('normal');
  const [activeSectionId, setActiveSectionId] = React.useState('about');
  const [hoverExpression, setHoverExpression] = React.useState(null);
  const [isAruHardLocked, setIsAruHardLocked] = React.useState(false);
  const expressionController = useAruExpressionController();
  const motionController = useAruMotionController('home', language);

  const activeSection = getPortfolioSection(activeSectionId);
  const locked = mood === 'locked';
  const hardLocked = isAruHardLocked || locked;
  const avatarExpression = mood === 'normal' && hoverExpression
    ? hoverExpression
    : expressionController.overrideExpression;

  function selectSection(sectionId) {
    if (hardLocked) return;
    setActiveSectionId(sectionId);
  }

  React.useEffect(() => {
    setHoverExpression(null);
    motionController.runAction(activeSection.motion || 'home', { force: true });
    expressionController.setTemporaryExpression(activeSection.expression || 'G', {
      durationMs: 2400,
      resetToIdle: true,
      source: 'system',
      priority: ARU_EXPRESSION_PRIORITY.system,
      force: true,
    });
  }, [activeSection.id]);

  React.useEffect(() => {
    if (mood !== 'normal') setHoverExpression(null);
  }, [mood]);

  React.useEffect(() => {
    document.title = language === 'en'
      ? "Aru - Kendall's Interactive Portfolio"
      : 'Aru - Portfolio interactivo de Kendall';
  }, [language]);

  return (
    <main
      className={['page simple-page portfolio-page', hardLocked ? 'aru-page--hard-locked' : ''].filter(Boolean).join(' ')}
      data-decor={t.bgDecorEnabled ? 'on' : 'off'}
      data-section={activeSection.id}
      data-hard-locked={hardLocked ? 'true' : 'false'}
      style={{
        '--page-bg': t.bgColor,
        '--page-bg-soft': t.bgSoftColor,
        '--page-accent': t.bgAccentColor,
        '--page-decor': t.bgDecorColor,
        '--decor-motion': t.bgMotion,
        '--decor-density': t.bgDensity,
        '--decor-speed': `${18 - (t.bgMotion * 10)}s`,
        '--decor-speed-slow': `${24 - (t.bgMotion * 12)}s`,
      }}
    >
      <div className="anime-bg" aria-hidden="true">
        <div className="anime-bg__blob anime-bg__blob--pink" />
        <div className="anime-bg__blob anime-bg__blob--mint" />
        <div className="anime-bg__cloud anime-bg__cloud--one" />
        <div className="anime-bg__cloud anime-bg__cloud--two" />
        <div className="anime-bg__sticker anime-bg__sticker--star" />
        <div className="anime-bg__sticker anime-bg__sticker--flower" />
        <div className="anime-bg__sparkle anime-bg__sparkle--one" />
        <div className="anime-bg__sparkle anime-bg__sparkle--two" />
        <div className="anime-bg__sparkle anime-bg__sparkle--three" />
        <div className="anime-bg__bokeh anime-bg__bokeh--one" />
        <div className="anime-bg__bokeh anime-bg__bokeh--two" />
        <div className="anime-bg__bokeh anime-bg__bokeh--three" />
        <div className="anime-bg__petal anime-bg__petal--one" />
        <div className="anime-bg__petal anime-bg__petal--two" />
        <div className="anime-bg__petal anime-bg__petal--three" />
      </div>

      <header className="topbar portfolio-topbar">
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true">A</div>
          <div>
            <h1 className="brand-title">Aru</h1>
            <p className="brand-subtitle">{translate('index.brandSubtitle', language)}</p>
          </div>
        </div>
        <nav className="topbar-actions" aria-label={translate('index.navLabel', language)}>
          <LanguageToggle language={language} onChange={setLanguage} disabled={hardLocked} />
          <a
            className="nav-link nav-link--primary"
            href={portfolioCta.guide.href}
            aria-label={localize(portfolioCta.guide.label, language)}
            aria-disabled={hardLocked ? 'true' : undefined}
            tabIndex={hardLocked ? -1 : undefined}
            onClick={(event) => {
              if (hardLocked) event.preventDefault();
            }}
          >
            {localize(portfolioCta.guide.label, language)}
          </a>
        </nav>
      </header>

      <section className="portfolio-shell" aria-label={translate('index.mainAria', language)}>
        <div className="portfolio-content-wrap">
          <PortfolioPanel section={activeSection} language={language} onSelectSection={selectSection} disabled={hardLocked} />
        </div>

        <div className="avatar-stage portfolio-avatar-stage">
          <AruAvatar
            mode="simple"
            className="simple-avatar portfolio-avatar"
            charSize={t.charSize}
            followRange={t.followRange}
            smoothing={t.smoothing}
            showDebug={t.showDebug}
            moodEnabled
            autoBlink={t.autoBlink}
            onMoodChange={setMood}
            onHardLock={() => setIsAruHardLocked(true)}
            language={language}
            expression={avatarExpression}
            motion={motionController.motion}
            actionBubble={localize(activeSection.bubble, language)}
          />
        </div>

        <nav className="portfolio-section-nav" aria-label={translate('index.sectionsNav', language)}>
          {portfolioSections.map((section, index) => {
            const isActive = section.id === activeSection.id;
            const hoverValue = index % 2 === 0 ? 'B' : 'C';
            const clearHover = () => setHoverExpression(null);
            const showHover = () => {
              if (!hardLocked && mood === 'normal') setHoverExpression(hoverValue);
            };
            return (
              <button
                type="button"
                className="portfolio-section-button"
                data-active={isActive ? 'true' : 'false'}
                disabled={hardLocked}
                onPointerEnter={showHover}
                onPointerLeave={clearHover}
                onFocus={showHover}
                onBlur={clearHover}
                onClick={() => {
                  clearHover();
                  selectSection(section.id);
                }}
                key={section.id}
              >
                <span>{localize(section.navLabel, language)}</span>
              </button>
            );
          })}
        </nav>
      </section>

      {hardLocked ? <div className="aru-hard-lock-overlay" aria-hidden="true" /> : null}
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
