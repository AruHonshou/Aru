const CONVERSATION_KEY = 'aru-guided-messages-v2';
const LEGACY_CONVERSATION_KEYS = ['aru-chat-messages-v1', 'aru-chat-messages-v2', 'aru-guided-messages-v1'];
const VISITOR_MEMORY_KEY = 'aru-visitor-memory-v1';

function readJson(key, fallback) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || 'null');
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // La memoria local mejora la UX, pero no debe romper el chat.
  }
}

function isValidMessage(message) {
  return ['user', 'assistant', 'error'].includes(message?.role)
    && typeof message.content === 'string';
}

function sanitizeConversation(messages) {
  return messages.filter(isValidMessage);
}

export function getConversation() {
  const current = readJson(CONVERSATION_KEY, null);
  if (Array.isArray(current) && current.every(isValidMessage)) return sanitizeConversation(current);
  return [];
}

export function saveConversation(messages) {
  if (!Array.isArray(messages)) return;
  writeJson(CONVERSATION_KEY, sanitizeConversation(messages).slice(-40));
}

export function clearConversation() {
  try {
    localStorage.removeItem(CONVERSATION_KEY);
    for (const key of LEGACY_CONVERSATION_KEYS) localStorage.removeItem(key);
  } catch {
    // Sin accion: localStorage puede no estar disponible.
  }
}

export function getVisitorMemory() {
  const memory = readJson(VISITOR_MEMORY_KEY, {});
  return typeof memory === 'object' && memory ? memory : {};
}

export function saveVisitorMemory(memory) {
  if (!memory || typeof memory !== 'object') return;
  writeJson(VISITOR_MEMORY_KEY, {
    ...getVisitorMemory(),
    ...memory,
    updatedAt: new Date().toISOString(),
  });
}

export function clearVisitorMemory() {
  try {
    localStorage.removeItem(VISITOR_MEMORY_KEY);
  } catch {
    // Sin accion: localStorage puede no estar disponible.
  }
}

export function rememberVisitorFromText(text) {
  const match = String(text || '').match(/\b(?:me llamo|mi nombre es|my name is|i am|i'm)\s+([a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ\s'-]{1,40})/i);
  if (!match) return;

  saveVisitorMemory({
    name: match[1].trim().replace(/[.!?]+$/, ''),
    lastVisitAt: new Date().toISOString(),
  });
}
