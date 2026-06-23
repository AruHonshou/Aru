import { deepGuideNodes } from './aru-deep-knowledge';
import { localize } from '../i18n/aru-i18n';

export const HOME_NODE_ID = 'home';
export const NOT_FOUND_NODE_ID = 'not_found';

export const guidedFlowNodes = deepGuideNodes;
const NODE_ALIASES = {
  about: 'deep_summary',
};
const STOP_WORDS = new Set([
  'a',
  'about',
  'al',
  'and',
  'como',
  'can',
  'con',
  'cual',
  'cuales',
  'cuanto',
  'cuantos',
  'de',
  'del',
  'dime',
  'does',
  'el',
  'en',
  'es',
  'esta',
  'este',
  'hablame',
  'he',
  'his',
  'how',
  'la',
  'las',
  'le',
  'lo',
  'los',
  'me',
  'mi',
  'o',
  'of',
  'para',
  'por',
  'que',
  'se',
  'sobre',
  'su',
  'sus',
  'tell',
  'the',
  'tiene',
  'to',
  'un',
  'una',
  'what',
  'with',
  'y',
]);
const GENERIC_ENTITY_TERMS = new Set(['kendall', 'valverde', 'diaz', 'díaz']);

export function getRawGuidedNode(nodeId) {
  return guidedFlowNodes[nodeId] || guidedFlowNodes[NODE_ALIASES[nodeId]] || guidedFlowNodes[HOME_NODE_ID];
}

export function getGuidedNode(nodeId, language = 'es') {
  return localize(getRawGuidedNode(nodeId), language);
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

function nodeTextParts(node) {
  return [
    node.title,
    node.message,
    node.summary,
    node.statusLabel,
    node.companionLine,
    node.action,
    ...(node.badges || []),
    ...(node.searchKeywords || []),
    ...(node.links || []).flatMap((link) => [link.label, link.url]),
    ...(node.options || []).flatMap((option) => [option.label, option.next, option.url]),
    ...(node.sections || []).flatMap((section) => [
      section.title,
      ...(section.items || []),
    ]),
  ].filter(Boolean);
}

function searchableText(node, language) {
  const primary = localize(node, language);
  const secondary = localize(node, language === 'en' ? 'es' : 'en');
  return normalizeSearchText([
    ...nodeTextParts(primary),
    ...nodeTextParts(secondary),
  ].join(' '));
}

export function searchGuidedFlow(query, language = 'es') {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return null;

  const terms = normalizedQuery
    .split(' ')
    .filter((term) => term.length > 1 && !STOP_WORDS.has(term) && !GENERIC_ENTITY_TERMS.has(term));
  const nodes = Object.values(guidedFlowNodes).filter((node) => ![HOME_NODE_ID, NOT_FOUND_NODE_ID, 'free_question'].includes(node.id));

  const ranked = nodes
    .map((node) => {
      const haystack = searchableText(node, language);
      const keywords = (node.searchKeywords || []).map(normalizeSearchText);
      let score = 0;

      if (keywords.some((keyword) => keyword && normalizedQuery === keyword)) score += 90;
      if (keywords.some((keyword) => {
        if (!keyword || GENERIC_ENTITY_TERMS.has(keyword) || STOP_WORDS.has(keyword)) return false;
        return normalizedQuery.includes(keyword);
      })) score += 50;
      if (haystack.includes(normalizedQuery)) score += 36;

      for (const term of terms) {
        if (keywords.some((keyword) => keyword === term)) score += 14;
        else if (keywords.some((keyword) => keyword.includes(term) || term.includes(keyword))) score += 9;
        else if (haystack.includes(term)) score += 4;
      }

      return { node, score };
    })
    .filter((item) => item.score >= 8)
    .sort((a, b) => b.score - a.score);

  return ranked[0]?.node || null;
}
