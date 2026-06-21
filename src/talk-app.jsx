import React from 'react';
import ReactDOM from 'react-dom/client';
import AruAvatar from './components/AruAvatar';
import { useAruExpressionController } from './hooks/useAruExpressionController';
import { ARU_EXPRESSION_PRIORITY } from './lib/aru-expression-map';
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

const SIMPLE_PAGE = `${import.meta.env.BASE_URL}simple.html`;

function createMessage(role, content, meta = {}) {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role,
    content,
    createdAt: new Date().toISOString(),
    ...meta,
  };
}

function expressionForNode(node) {
  if (!node) return 'A';
  if (node.id === HOME_NODE_ID) return 'G';
  if (node.id === NOT_FOUND_NODE_ID || node.id === 'free_question') return 'H';
  if (node.id === 'projects' || node.id.startsWith('project_')) return 'C';
  if (node.id === 'skills') return 'B';
  if (node.id === 'experience') return 'A';
  if (node.id === 'certifications') return 'G';
  if (node.id === 'contact') return 'B';
  return node.expression || 'G';
}

function createNodeMessage(nodeId) {
  const node = getGuidedNode(nodeId);
  return createMessage('assistant', node.message, {
    nodeId: node.id,
    emotion: node.emotion,
    expression: expressionForNode(node),
  });
}

function initialMessages() {
  return [createNodeMessage(HOME_NODE_ID)];
}

function loadMessages() {
  const stored = getConversation();
  return stored.length ? stored : initialMessages();
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

function compactStatusForNode(node) {
  if (!node) return 'Lista';
  if (node.id === HOME_NODE_ID) return 'Lista';
  if (node.id === NOT_FOUND_NODE_ID) return 'Sin datos';
  if (node.id === 'free_question') return 'Busqueda';
  if (node.id === 'about') return 'Perfil';
  if (node.id === 'projects') return 'Proyectos';
  if (node.id.startsWith('project_')) return 'Proyecto';
  if (node.id === 'certifications') return 'Certificados';
  return node.statusLabel || node.title;
}

function optionClassName(kind = 'secondary') {
  return [
    'flow-option',
    kind ? `flow-option--${kind}` : '',
  ].filter(Boolean).join(' ');
}

function optionsForNode(node, backNodeId) {
  const options = node.options || [];
  if (!backNodeId || node.id === HOME_NODE_ID || options.some((option) => option.next === backNodeId)) {
    return options;
  }

  return [
    {
      label: `Volver a ${getGuidedNode(backNodeId).title}`,
      next: backNodeId,
      kind: 'backSmart',
    },
    ...options,
  ];
}

function GuidedNodeContent({ node, backNodeId, isLatest, onSelect }) {
  const options = isLatest ? optionsForNode(node, backNodeId) : [];
  const isProject = node.id.startsWith('project_');

  return (
    <div className={isProject ? 'flow-card flow-card--project' : 'flow-card'}>
      <div className="flow-card__header">
        <span className="flow-card__kicker">{isProject ? 'Ficha de proyecto' : 'Aru responde'}</span>
        <div className="flow-card__title-row">
          <h3>{node.title}</h3>
          {isProject ? <span className="flow-card__tag">Proyecto</span> : null}
        </div>
      </div>

      <p className="flow-card__message">{node.message}</p>
      {node.summary ? <p className="flow-card__summary">{node.summary}</p> : null}

      {node.badges?.length ? (
        <section className="flow-feature-strip" aria-label="Tecnologias y temas">
          <h4>{isProject ? 'Stack y enfoque' : 'Temas clave'}</h4>
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
        <section className="flow-link-panel" aria-label="Enlaces">
          <h4>{isProject ? 'Enlaces destacados' : 'Enlaces'}</h4>
          <div className="flow-links">
            {node.links.map((link) => (
              <a
                key={`${link.label}-${link.url}`}
                className="flow-link"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>
      ) : null}

      {options.length ? (
        <div className="flow-options" aria-label="Opciones de Aru">
          {options.map((option) => (
            option.url ? (
              <a
                key={`${option.label}-${option.url}`}
                className={optionClassName(option.kind || 'link')}
                href={option.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {option.label}
              </a>
            ) : (
              <button
                type="button"
                key={`${option.label}-${option.next}`}
                className={optionClassName(option.kind)}
                onClick={() => onSelect(option)}
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
  const [messages, setMessages] = React.useState(loadMessages);
  const [input, setInput] = React.useState('');
  const [visitorMemory, setVisitorMemory] = React.useState(getVisitorMemory);
  const expressionController = useAruExpressionController();
  const messagesListRef = React.useRef(null);
  const currentNode = getGuidedNode(lastAssistantNodeId(messages));
  const backNodeId = previousAssistantNodeId(messages);
  const lastAssistantIndex = latestAssistantIndex(messages);
  const currentStatus = compactStatusForNode(currentNode);

  React.useEffect(() => {
    saveConversation(messages);
  }, [messages]);

  React.useEffect(() => {
    saveVisitorMemory({ lastVisitAt: new Date().toISOString() });
  }, []);

  React.useEffect(() => {
    const list = messagesListRef.current;
    if (!list) return;
    const latestAssistant = list.querySelector('[data-latest-assistant="true"]');
    if (latestAssistant) {
      latestAssistant.scrollIntoView({ block: 'start', behavior: 'smooth' });
      return;
    }

    list.scrollTo({ top: list.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  function showNode(nodeId, userLabel = null) {
    const node = getGuidedNode(nodeId);

    setMessages((currentMessages) => {
      const currentNodeId = lastAssistantNodeId(currentMessages);
      if (currentNodeId === node.id) return currentMessages;

      return [
        ...currentMessages.filter((message) => message.role !== 'error'),
        ...(userLabel ? [createMessage('user', userLabel)] : []),
        createNodeMessage(node.id),
      ];
    });

    expressionController.setTemporaryExpression(expressionForNode(node), {
      durationMs: 6200,
      resetToIdle: true,
      source: 'system',
      priority: ARU_EXPRESSION_PRIORITY.system,
      force: true,
    });
  }

  function selectOption(option) {
    if (!option?.next) return;
    showNode(option.next, option.label);
  }

  function submitContent(rawContent) {
    const content = String(rawContent || '').trim();
    if (!content) return;

    rememberVisitorFromText(content);
    setVisitorMemory(getVisitorMemory());

    const result = searchGuidedFlow(content);
    const node = result || getGuidedNode(NOT_FOUND_NODE_ID);

    setInput('');
    setMessages((currentMessages) => {
      if (lastAssistantNodeId(currentMessages) === node.id) return currentMessages;

      return [
        ...currentMessages.filter((message) => message.role !== 'error'),
        createMessage('user', content),
        createNodeMessage(node.id),
      ];
    });
    expressionController.setTemporaryExpression(expressionForNode(node), {
      durationMs: result ? 6200 : 6800,
      resetToIdle: true,
      source: result ? 'system' : 'error',
      priority: result ? ARU_EXPRESSION_PRIORITY.system : ARU_EXPRESSION_PRIORITY.error,
      force: true,
    });
  }

  function submitMessage(event) {
    event?.preventDefault();
    submitContent(input);
  }

  function startNewConversation() {
    clearStoredConversation();
    setMessages(initialMessages());
    setInput('');
    expressionController.resetToIdle();
  }

  function clearLocalMemory() {
    clearVisitorMemory();
    setVisitorMemory({});
    startNewConversation();
  }

  return (
    <main className="page chat-page voz-page" data-mode="guided">
      <div className="voz-bg" aria-hidden="true">
        <div className="voz-bg__blob voz-bg__blob--rose" />
        <div className="voz-bg__blob voz-bg__blob--mint" />
        <div className="voz-bg__cloud voz-bg__cloud--one" />
        <div className="voz-bg__cloud voz-bg__cloud--two" />
        <div className="voz-bg__spark voz-bg__spark--one" />
        <div className="voz-bg__spark voz-bg__spark--two" />
      </div>

      <aside className="chat-avatar-panel companion-card" data-section={currentNode.id} aria-label="Aru">
        <div className="companion-card__header">
          <div className="brand-lockup">
            <div className="brand-mark" aria-hidden="true">A</div>
            <div>
              <h1 className="brand-title">Aru</h1>
              <p className="brand-subtitle">Guia virtual de Kendall</p>
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
            moodEnabled={false}
            lookEnabled
            autoBlink
            expression={expressionController.overrideExpression}
          />
        </div>

        <p className="companion-card__line">
          Aru te guia por el perfil profesional de Kendall.
        </p>

        <div className="mini-status">
          <div className="mini-status__item">
            <span>Estado</span>
            <strong>{currentStatus}</strong>
          </div>
          <div className="mini-status__item">
            <span>Seccion</span>
            <strong>{currentNode.title}</strong>
          </div>
          {visitorMemory.name ? (
            <div className="mini-status__item">
              <span>Visitante</span>
              <strong>{visitorMemory.name}</strong>
            </div>
          ) : null}
          <a className="nav-link companion-back" href={SIMPLE_PAGE}>Volver al avatar</a>
        </div>
      </aside>

      <section className="chat-panel" aria-label="Guia con Aru">
        <header className="chat-header">
          <div>
            <h2 className="chat-title">Guia con Aru</h2>
            <p className="chat-subtitle">
              FAQ interactivo local basado en la informacion publica de Kendall.
            </p>
          </div>
          <div className="chat-header__actions">
            <button type="button" className="soft-button chat-reset-button" onClick={startNewConversation}>
              Nueva conversacion
            </button>
            <button type="button" className="soft-button chat-memory-button" onClick={clearLocalMemory}>
              Borrar memoria local
            </button>
          </div>
        </header>

        <div className="chat-messages" aria-live="polite" ref={messagesListRef}>
          {messages.map((message, index) => {
            const node = message.nodeId ? getGuidedNode(message.nodeId) : null;
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
                      onSelect={selectOption}
                    />
                  ) : (
                    <p>{message.content}</p>
                  )}
                </div>
                {message.role === 'user' ? <span className="message-avatar message-avatar--user" aria-hidden="true">Tu</span> : null}
              </div>
            );
          })}
        </div>

        <form className="chat-composer" onSubmit={submitMessage}>
          <div className="composer-row">
            <textarea
              className="chat-input"
              value={input}
              rows={1}
              placeholder="Tambien puedes buscar algo especifico sobre Kendall..."
              aria-label="Busqueda local sobre Kendall"
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  submitMessage(event);
                }
              }}
            />
            <button type="submit" className="primary-button" disabled={!input.trim()}>
              Buscar
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
