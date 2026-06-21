export const ARU_EXPRESSIONS = {
  A: 'OjosAbiertos_BocaCerrada',
  B: 'OjosAbiertos_BocaMedia',
  C: 'OjosAbiertos_BocaAbierta',
  D: 'OjosCerrados_BocaCerrada',
  E: 'OjosCerrados_BocaMedia',
  F: 'OjosCerrados_BocaAbierta',
  G: 'GuinoPaz',
  H: 'Aburrida_BocaO',
  I: 'Enojada_DientesApretados',
  J: 'Enojada_Gritando',
  K: 'Cansada_BocaAbierta',
};

export const ALLOWED_ARU_EXPRESSIONS = Object.keys(ARU_EXPRESSIONS);

export const ARU_EMOTION_TO_EXPRESSION = {
  neutral: 'A',
  happy: 'G',
  wink: 'G',
  thinking: 'H',
  bored: 'H',
  angry: 'I',
  shouting: 'J',
  tired: 'K',
  unknown: 'H',
};

export const ARU_EXPRESSION_PRIORITY = {
  idle: 0,
  ai: 2,
  loading: 3,
  system: 4,
  error: 5,
};

export function normalizeExpression(expression, fallback = 'A') {
  const value = String(expression || '').trim().toUpperCase();
  return ALLOWED_ARU_EXPRESSIONS.includes(value) ? value : fallback;
}

export function expressionForEmotion(emotion, fallback = 'A') {
  return ARU_EMOTION_TO_EXPRESSION[String(emotion || '').trim().toLowerCase()] || fallback;
}
