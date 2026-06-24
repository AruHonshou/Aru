import React from 'react';
import ReactDOM from 'react-dom/client';
import AruAvatar from './components/AruAvatar';
import LanguageToggle from './components/LanguageToggle';
import { useAruExpressionController } from './hooks/useAruExpressionController';
import { useAruLanguage } from './hooks/useAruLanguage';
import { useAruMotionController } from './hooks/useAruMotionController';
import { ARU_EXPRESSION_PRIORITY } from './lib/aru-expression-map';
import { getAruAction } from './lib/aru-actions';
import { installAruSfxUnlock, playAruSfx } from './lib/aru-sfx';
import { localize, translate } from './i18n/aru-i18n';
import {
  clearConversation as clearStoredConversation,
  clearVisitorMemory,
  getConversation,
  getVisitorMemory,
  rememberVisitorFromText,
  saveConversation,
  saveVisitorMemory,
} from './lib/aru-memory-store';
import {
  getGuidedNode,
  HOME_NODE_ID,
  NOT_FOUND_NODE_ID,
  searchGuidedFlow,
} from './data/aru-guided-flow';
import './styles/aru-pages.css';
import './styles/voz-page.css';

const PUBLIC_BASE = import.meta.env.BASE_URL;
const PORTFOLIO_PAGE = `${PUBLIC_BASE}portfolio.html`;
const GUIDE_LOADER_DURATION_MS = 1500;
const GUIDE_LOADER_EXIT_MS = 280;
const GUIDE_LOADER_FRAME_MS = 320;
const GUIDE_LOADING_FRAMES = [
  `${PUBLIC_BASE}imagenes/loading1.png`,
  `${PUBLIC_BASE}imagenes/loading2.png`,
];
const UNFORTUNATE_ACTION_ID = 'unfortunateAngry';
const UNFORTUNATE_TRIGGERS = [
  'salada',
  'salado',
  'mala suerte',
  'desafortunada',
  'desafortunado',
  'unfortunate',
  'unlucky',
  'bad luck',
];

function createMessage(role, content, meta = {}) {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role,
    content,
    createdAt: new Date().toISOString(),
    ...meta,
  };
}

function normalizeTriggerText(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}\s]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isUnfortunateTrigger(text) {
  const normalized = normalizeTriggerText(text);
  if (!normalized) return false;

  return UNFORTUNATE_TRIGGERS.some((trigger) => {
    const normalizedTrigger = normalizeTriggerText(trigger);
    if (normalizedTrigger.includes(' ')) return normalized.includes(normalizedTrigger);
    return new RegExp(`(^|\\s)${normalizedTrigger}(?=\\s|$)`).test(normalized);
  });
}

function expressionForNode(node) {
  if (!node) return 'A';
  if (node.id === NOT_FOUND_NODE_ID || node.id === 'free_question') return 'H';
  return node.expression || 'G';
}

function createNodeMessage(nodeId, language = 'es') {
  const node = getGuidedNode(nodeId, language);
  return createMessage('assistant', node.message, {
    nodeId: node.id,
    emotion: node.emotion,
    expression: expressionForNode(node),
    action: node.action,
  });
}

function initialMessages(language = 'es') {
  return [createNodeMessage(HOME_NODE_ID, language)];
}

function loadMessages(language = 'es') {
  const stored = getConversation();
  return stored.length ? stored : initialMessages(language);
}

function lastAssistantNodeId(messages) {
  return [...messages].reverse().find((message) => message.role === 'assistant' && message.nodeId)?.nodeId || HOME_NODE_ID;
}

function previousAssistantNodeId(messages) {
  const assistantNodes = messages
    .filter((message) => message.role === 'assistant' && message.nodeId)
    .map((message) => message.nodeId);
  const current = assistantNodes[assistantNodes.length - 1];

  for (let index = assistantNodes.length - 2; index >= 0; index -= 1) {
    if (assistantNodes[index] !== current) return assistantNodes[index];
  }

  return null;
}

function latestAssistantIndex(messages) {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    if (messages[index].role === 'assistant') return index;
  }

  return -1;
}

function compactStatusForNode(node, language = 'es') {
  if (!node) return translate('guide.ready', language);
  if (node.id === HOME_NODE_ID) return translate('guide.ready', language);
  if (node.id === NOT_FOUND_NODE_ID) return translate('guide.noData', language);
  return node.statusLabel || node.title;
}

function companionLineForNode(node, language = 'es') {
  if (!node || node.id === HOME_NODE_ID) return translate('guide.companionHome', language);
  return node.companionLine || translate('guide.companionFallback', language);
}

function optionClassName(kind = 'secondary') {
  return [
    'flow-option',
    kind ? `flow-option--${kind}` : '',
  ].filter(Boolean).join(' ');
}

function externalLinkLabel(link) {
  const text = `${link.label} ${link.url}`.toLowerCase();
  if (text.includes('demo') || text.includes('abrir') || text.includes('portfolio')) return `🌐 ${link.label}`;
  if (text.includes('github') || text.includes('repositorio') || text.includes('repository')) return `🔗 ${link.label}`;
  if (text.includes('mailto')) return `✉ ${link.label}`;
  if (text.includes('wa.me')) return `💬 ${link.label}`;
  return `↗ ${link.label}`;
}

function optionsForNode(node, backNodeId, language = 'es') {
  const options = node.options || [];
  if (!backNodeId || node.id === HOME_NODE_ID || options.some((option) => option.next === backNodeId)) {
    return options;
  }

  return [
    {
      label: translate('common.backTo', language, { title: getGuidedNode(backNodeId, language).title }),
      next: backNodeId,
      kind: 'backSmart',
    },
    ...options,
  ];
}

function GuidedNodeContent({ node, backNodeId, isLatest, language, onSelect, onExternalAction, disabled = false }) {
  const options = isLatest
    ? optionsForNode(node, backNodeId, language).filter((option) => option.next !== node.id)
    : [];
  const isProject = node.id.startsWith('project_');
  const kicker = node.id === HOME_NODE_ID
    ? translate('common.sourceKicker', language)
    : isProject
      ? translate('common.projectKicker', language)
      : translate('common.explainKicker', language);

  return (
    <div className={isProject ? 'flow-card flow-card--project' : 'flow-card'}>
      <div className="flow-card__header">
        <span className="flow-card__kicker">{kicker}</span>
        <div className="flow-card__title-row">
          <h3>{node.title}</h3>
          <span className="flow-card__tag">{isProject ? translate('common.project', language) : translate('common.localGuide', language)}</span>
        </div>
      </div>

      <p className="flow-card__message">{node.message}</p>
      {node.summary ? <p className="flow-card__summary">{node.summary}</p> : null}

      {node.badges?.length ? (
        <section
          className={isProject ? 'flow-feature-strip flow-feature-strip--project' : 'flow-feature-strip'}
          aria-label={translate('common.featureTopics', language)}
        >
          <h4>{isProject ? translate('common.projectStack', language) : translate('common.featureTopics', language)}</h4>
          <div className="flow-badges">
            {node.badges.map((badge) => <span key={badge}>{badge}</span>)}
          </div>
        </section>
      ) : null}

      {node.sections?.length ? (
        <div className="flow-sections">
          {node.sections.map((section) => (
            <section key={section.title} className="flow-section">
              <h4>{section.title}</h4>
              {section.items?.length ? (
                <ul>
                  {section.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      ) : null}

      {node.links?.length ? (
        <section className="flow-link-panel" aria-label={translate('common.links', language)}>
          <h4>{isProject ? translate('common.projectLinks', language) : translate('common.links', language)}</h4>
          <div className="flow-links">
            {node.links.map((link) => (
              <a
                key={`${link.label}-${link.url}`}
                className="flow-link"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={disabled ? 'true' : undefined}
                tabIndex={disabled ? -1 : undefined}
                onClick={(event) => {
                  if (disabled) {
                    event.preventDefault();
                    return;
                  }
                  onExternalAction?.(link.action || 'portfolio');
                }}
              >
                {externalLinkLabel(link)}
              </a>
            ))}
          </div>
        </section>
      ) : null}

      {options.length ? (
        <div
          className={isProject ? 'flow-options flow-options--project-nav' : 'flow-options'}
          aria-label={translate('common.flowOptions', language)}
        >
          {options.map((option) => (
            option.url ? (
              <a
                key={`${option.label}-${option.url}`}
                className={optionClassName(option.kind || 'link')}
                href={option.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={disabled ? 'true' : undefined}
                tabIndex={disabled ? -1 : undefined}
                onClick={(event) => {
                  if (disabled) {
                    event.preventDefault();
                    return;
                  }
                  onExternalAction?.(option.action || 'portfolio');
                }}
              >
                {option.label}
              </a>
            ) : (
              <button
                type="button"
                key={`${option.label}-${option.next}`}
                className={optionClassName(option.kind)}
                disabled={disabled}
                onClick={() => {
                  if (disabled) return;
                  onSelect(option);
                }}
              >
                {option.label}
              </button>
            )
          ))}
        </div>
      ) : null}

    </div>
  );
}

function App() {
  const [language, setLanguage] = useAruLanguage();
  const [messages, setMessages] = React.useState(() => loadMessages(language));
  const [input, setInput] = React.useState('');
  const [visitorMemory, setVisitorMemory] = React.useState(getVisitorMemory);
  const [avatarMood, setAvatarMood] = React.useState('normal');
  const [isAruHardLocked, setIsAruHardLocked] = React.useState(false);
  const [pageShakeActive, setPageShakeActive] = React.useState(false);
  const [guideLoading, setGuideLoading] = React.useState(true);
  const [guideLoaderLeaving, setGuideLoaderLeaving] = React.useState(false);
  const [guideLoaderFrame, setGuideLoaderFrame] = React.useState(0);
  const expressionController = useAruExpressionController();
  const motionController = useAruMotionController('idle', language);
  const messagesListRef = React.useRef(null);
  const shakeTimerRef = React.useRef(0);
  const shakeFrameRef = React.useRef(0);
  const loaderIntervalRef = React.useRef(0);
  const loaderHideTimerRef = React.useRef(0);
  const loaderRemoveTimerRef = React.useRef(0);
  const lastUnfortunateSubmitRef = React.useRef({ text: '', at: 0 });
  const currentNode = getGuidedNode(lastAssistantNodeId(messages), language);
  const backNodeId = previousAssistantNodeId(messages);
  const lastAssistantIndex = latestAssistantIndex(messages);
  const currentStatus = compactStatusForNode(currentNode, language);
  const companionLine = companionLineForNode(currentNode, language);
  const latestAssistantMessage = messages[lastAssistantIndex] || null;
  const hardLocked = isAruHardLocked || avatarMood === 'locked';

  React.useEffect(() => {
    saveConversation(messages);
  }, [messages]);

  React.useEffect(() => {
    installAruSfxUnlock();
  }, []);

  React.useEffect(() => {
    document.title = language === 'en'
      ? "Aru - Kendall's Deep Guide"
      : 'Aru - Guía profunda de Kendall';
  }, [language]);

  React.useEffect(() => {
    loaderIntervalRef.current = window.setInterval(() => {
      setGuideLoaderFrame((frame) => (frame + 1) % GUIDE_LOADING_FRAMES.length);
    }, GUIDE_LOADER_FRAME_MS);

    loaderHideTimerRef.current = window.setTimeout(() => {
      setGuideLoaderLeaving(true);
      loaderRemoveTimerRef.current = window.setTimeout(() => {
        window.clearInterval(loaderIntervalRef.current);
        setGuideLoading(false);
      }, GUIDE_LOADER_EXIT_MS);
    }, GUIDE_LOADER_DURATION_MS);

    return () => {
      window.clearInterval(loaderIntervalRef.current);
      window.clearTimeout(loaderHideTimerRef.current);
      window.clearTimeout(loaderRemoveTimerRef.current);
    };
  }, []);

  React.useEffect(() => () => {
    window.clearTimeout(shakeTimerRef.current);
    window.cancelAnimationFrame(shakeFrameRef.current);
  }, []);

  React.useEffect(() => {
    saveVisitorMemory({ lastVisitAt: new Date().toISOString() });
  }, []);

  React.useEffect(() => {
    const list = messagesListRef.current;
    if (!list) return;
    if (messages[messages.length - 1]?.role !== 'assistant') {
      list.scrollTo({ top: list.scrollHeight, behavior: 'smooth' });
      return;
    }

    const latestAssistant = list.querySelector('[data-latest-assistant="true"]');
    if (latestAssistant) {
      latestAssistant.scrollIntoView({ block: 'start', behavior: 'smooth' });
      return;
    }

    list.scrollTo({ top: list.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  React.useEffect(() => {
    const action = getAruAction(currentNode.action || (currentNode.id === NOT_FOUND_NODE_ID ? 'notFound' : 'explainFocus'));
    motionController.runAction(action.id, { force: true });
    if (action.sfx && latestAssistantMessage?.id && !guideLoading) {
      playAruSfx(action.sfx, `${action.id}:${latestAssistantMessage.id}`, {
        queueOnBlock: action.sfx !== 'greeting',
      });
    }
    expressionController.setTemporaryExpression(action.expression || expressionForNode(currentNode), {
      durationMs: action.durationMs || 2400,
      resetToIdle: action.resetToIdle ?? true,
      source: currentNode.id === NOT_FOUND_NODE_ID ? 'error' : 'system',
      priority: currentNode.id === NOT_FOUND_NODE_ID ? ARU_EXPRESSION_PRIORITY.error : ARU_EXPRESSION_PRIORITY.system,
      force: true,
    });
  }, [currentNode.id, latestAssistantMessage?.id, guideLoading]);

  function showNode(nodeId, userLabel = null) {
    if (hardLocked) return;
    const node = getGuidedNode(nodeId, language);

    setMessages((currentMessages) => {
      const currentNodeId = lastAssistantNodeId(currentMessages);
      if (currentNodeId === node.id) return currentMessages;

      return [
        ...currentMessages.filter((message) => message.role !== 'error'),
        ...(userLabel ? [createMessage('user', userLabel)] : []),
        createNodeMessage(node.id, language),
      ];
    });
  }

  function selectOption(option) {
    if (hardLocked) return;
    if (!option?.next) return;
    showNode(option.next, option.label);
  }

  function triggerAngryPageShake() {
    window.clearTimeout(shakeTimerRef.current);
    window.cancelAnimationFrame(shakeFrameRef.current);
    setPageShakeActive(false);

    shakeFrameRef.current = window.requestAnimationFrame(() => {
      setPageShakeActive(true);
      shakeTimerRef.current = window.setTimeout(() => setPageShakeActive(false), 760);
    });
  }

  function isDuplicateUnfortunateSubmit(content) {
    const normalized = normalizeTriggerText(content);
    const now = Date.now();
    const last = lastUnfortunateSubmitRef.current;
    if (last.text === normalized && now - last.at < 900) return true;

    lastUnfortunateSubmitRef.current = { text: normalized, at: now };
    return false;
  }

  function runUnfortunateReaction(content) {
    const action = getAruAction(UNFORTUNATE_ACTION_ID);
    const userMessage = createMessage('user', content, { action: action.id });

    setInput('');
    setMessages((currentMessages) => [
      ...currentMessages.filter((message) => message.role !== 'error'),
      userMessage,
    ]);

    motionController.runAction(action.id, { force: true });
    expressionController.setTemporaryExpression(action.expression, {
      durationMs: action.durationMs || 2600,
      resetToIdle: action.resetToIdle ?? true,
      source: 'error',
      priority: ARU_EXPRESSION_PRIORITY.error + 1,
      force: true,
    });

    if (action.sfx) {
      playAruSfx(action.sfx, `${action.id}:${userMessage.id}`);
    }

    triggerAngryPageShake();
  }

  function submitContent(rawContent) {
    if (hardLocked) return;
    const content = String(rawContent || '').trim();
    if (!content) return;

    rememberVisitorFromText(content);
    setVisitorMemory(getVisitorMemory());

    if (isUnfortunateTrigger(content)) {
      setInput('');
      if (!isDuplicateUnfortunateSubmit(content)) {
        runUnfortunateReaction(content);
      }
      return;
    }

    const result = searchGuidedFlow(content, language);
    const node = result || getGuidedNode(NOT_FOUND_NODE_ID, language);

    setInput('');
    setMessages((currentMessages) => {
      if (lastAssistantNodeId(currentMessages) === node.id) return currentMessages;

      return [
        ...currentMessages.filter((message) => message.role !== 'error'),
        createMessage('user', content),
        createNodeMessage(node.id, language),
      ];
    });
  }

  function submitMessage(event) {
    event?.preventDefault();
    submitContent(input);
  }

  function startNewConversation() {
    if (hardLocked) return;
    clearStoredConversation();
    setMessages(initialMessages(language));
    setInput('');
    expressionController.resetToIdle();
    motionController.runAction('home', { force: true });
  }

  function clearLocalMemory() {
    if (hardLocked) return;
    clearVisitorMemory();
    setVisitorMemory({});
    startNewConversation();
  }

  return (
    <main
      className={['page chat-page voz-page', hardLocked ? 'aru-page--hard-locked' : ''].filter(Boolean).join(' ')}
      data-mode="guided"
      data-avatar-mood={avatarMood}
      data-aru-action={motionController.action.id}
      data-shake={pageShakeActive ? 'angry' : undefined}
      data-hard-locked={hardLocked ? 'true' : 'false'}
      aria-busy={guideLoading ? 'true' : undefined}
    >
      {guideLoading ? (
        <div
          className="aru-guide-loader"
          data-state={guideLoaderLeaving ? 'leaving' : 'active'}
          role="status"
          aria-label="Loading Aru guide"
        >
          <div className="aru-guide-loader__spark aru-guide-loader__spark--one" aria-hidden="true" />
          <div className="aru-guide-loader__spark aru-guide-loader__spark--two" aria-hidden="true" />
          <div className="aru-guide-loader__content">
            <img
              className="aru-guide-loader__image"
              src={GUIDE_LOADING_FRAMES[guideLoaderFrame]}
              alt="Aru loading"
            />
            <p className="aru-guide-loader__text">WA HA HA !!!</p>
          </div>
        </div>
      ) : null}

      <div className="voz-bg" aria-hidden="true">
        <div className="voz-bg__blob voz-bg__blob--rose" />
        <div className="voz-bg__blob voz-bg__blob--mint" />
        <div className="voz-bg__cloud voz-bg__cloud--one" />
        <div className="voz-bg__cloud voz-bg__cloud--two" />
        <div className="voz-bg__spark voz-bg__spark--one" />
        <div className="voz-bg__spark voz-bg__spark--two" />
      </div>

      <aside className="chat-avatar-panel companion-card" data-section={currentNode.id} data-avatar-mood={avatarMood} aria-label="Aru">
        <div className="companion-card__header">
          <div className="brand-lockup">
            <div className="brand-mark" aria-hidden="true">A</div>
            <div>
              <h1 className="brand-title">Aru</h1>
              <p className="brand-subtitle">PNGTuber deep guide</p>
            </div>
          </div>
          <span className="companion-card__chip">{currentStatus}</span>
        </div>

        <div className="chat-avatar-wrap">
          <div className="chat-avatar-stage" aria-hidden="true" />
          <AruAvatar
            mode="chat"
            className="chat-avatar"
            charSize={62}
            followRange={380}
            smoothing={0.24}
            moodEnabled
            onMoodChange={setAvatarMood}
            onHardLock={() => setIsAruHardLocked(true)}
            lookEnabled
            autoBlink
            language={language}
            expression={expressionController.overrideExpression}
            motion={motionController.motion}
            actionBubble={motionController.bubble}
          />
        </div>

        <p className="companion-card__line">
          {companionLine}
        </p>

        <div className="mini-status">
          <div className="mini-status__item">
            <span>{translate('guide.status', language)}</span>
            <strong>{currentStatus}</strong>
          </div>
          <div className="mini-status__item">
            <span>{translate('guide.section', language)}</span>
            <strong>{currentNode.title}</strong>
          </div>
          {visitorMemory.name ? (
            <div className="mini-status__item">
              <span>{translate('guide.visitor', language)}</span>
              <strong>{visitorMemory.name}</strong>
            </div>
          ) : null}
          <a
            className="nav-link companion-back"
            href={PORTFOLIO_PAGE}
            aria-disabled={hardLocked ? 'true' : undefined}
            tabIndex={hardLocked ? -1 : undefined}
            onClick={(event) => {
              if (hardLocked) event.preventDefault();
            }}
          >
            {translate('guide.backToAvatar', language)}
          </a>
        </div>
      </aside>

      <section className="chat-panel" aria-label={translate('guide.panelAria', language)}>
        <header className="chat-header">
          <div>
            <h2 className="chat-title">{translate('guide.title', language)}</h2>
            <p className="chat-subtitle">
              {translate('guide.subtitle', language)}
            </p>
          </div>
          <div className="chat-header__actions">
            <LanguageToggle language={language} onChange={setLanguage} disabled={hardLocked} />
            <button type="button" className="soft-button chat-reset-button" onClick={startNewConversation} disabled={hardLocked}>
              {translate('guide.newConversation', language)}
            </button>
            <button type="button" className="soft-button chat-memory-button" onClick={clearLocalMemory} disabled={hardLocked}>
              {translate('guide.clearMemory', language)}
            </button>
          </div>
        </header>

        <div className="chat-messages" aria-live="polite" ref={messagesListRef}>
          <div className="chat-thread">
            {messages.map((message, index) => {
              const node = message.nodeId ? getGuidedNode(message.nodeId, language) : null;
              const isLatestAssistant = message.role === 'assistant' && index === lastAssistantIndex;
              return (
                <div
                  key={message.id}
                  className={`message-row message-row--${message.role}`}
                  data-latest-assistant={isLatestAssistant ? 'true' : undefined}
                >
                  {message.role !== 'user' ? <span className="message-avatar" aria-hidden="true">A</span> : null}
                  <div className="message-bubble">
                    {node ? (
                      <GuidedNodeContent
                        node={node}
                        backNodeId={backNodeId}
                        isLatest={isLatestAssistant}
                        language={language}
                        onSelect={selectOption}
                        onExternalAction={(actionId) => motionController.runAction(actionId, { force: true })}
                        disabled={hardLocked}
                      />
                    ) : (
                      <p>{message.content}</p>
                    )}
                  </div>
                  {message.role === 'user' ? <span className="message-avatar message-avatar--user" aria-hidden="true">{translate('common.userBadge', language)}</span> : null}
                </div>
              );
            })}
          </div>
        </div>

        <form className="chat-composer" onSubmit={submitMessage}>
          <div className="composer-row">
            <textarea
              className="chat-input"
              value={input}
              rows={1}
              placeholder={translate('guide.searchPlaceholder', language)}
              aria-label={translate('guide.searchAria', language)}
              disabled={hardLocked}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  submitMessage(event);
                }
              }}
            />
            <button type="submit" className="primary-button" disabled={hardLocked || !input.trim()}>
              {translate('guide.searchButton', language)}
            </button>
          </div>
        </form>
      </section>
      {hardLocked ? <div className="aru-hard-lock-overlay" aria-hidden="true" /> : null}
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
