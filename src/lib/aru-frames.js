import charConfig from '../character-config';

export const ROWS = charConfig.rows;
export const COLS = charConfig.cols;
export const CENTER_CELL = { r: 2, c: 2 };

export const MOUTH_LABELS = ['cerrada', 'semiabierta', 'abierta'];

export const SHEETS = {
  eyesOpen: [
    charConfig.sheets.eyesOpen.close,
    charConfig.sheets.eyesOpen.half,
    charConfig.sheets.eyesOpen.open,
  ],
  eyesClosed: [
    charConfig.sheets.eyesClosed.close,
    charConfig.sheets.eyesClosed.half,
    charConfig.sheets.eyesClosed.open,
  ],
  special: {
    wink: charConfig.sheets.special.wink,
    bored: charConfig.sheets.special.bored,
    annoyed: charConfig.sheets.special.annoyed,
    rage: charConfig.sheets.special.rage,
    tired: charConfig.sheets.special.tired,
    locked: charConfig.sheets.special.rage,
  },
};

export const EXPRESSION_SHEETS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function frameSrc(sheet, row, col) {
  return charConfig.src(sheet, row, col);
}

export function sheetForMouth({ eyesClosed = false, mouth = 0 }) {
  return (eyesClosed ? SHEETS.eyesClosed : SHEETS.eyesOpen)[clamp(mouth, 0, 2)];
}

export function frameGrid(sheets) {
  const frames = [];
  for (const sheet of sheets) {
    for (let r = 0; r < ROWS; r += 1) {
      for (let c = 0; c < COLS; c += 1) {
        frames.push({ sheet, r, c });
      }
    }
  }
  return frames;
}

export function avatarSheets({ includeMouthFrames = false, includeSpecial = false, includeAllExpressions = false } = {}) {
  if (includeAllExpressions) {
    const sheets = [...EXPRESSION_SHEETS];
    if (includeSpecial) {
      sheets.push(SHEETS.special.bored, SHEETS.special.annoyed, SHEETS.special.locked);
    }
    return Array.from(new Set(sheets));
  }

  const sheets = includeMouthFrames
    ? [...SHEETS.eyesOpen, ...SHEETS.eyesClosed]
    : [SHEETS.eyesOpen[0], SHEETS.eyesClosed[0]];

  if (includeSpecial) {
    sheets.push(SHEETS.special.bored, SHEETS.special.annoyed, SHEETS.special.locked);
  }

  return Array.from(new Set(sheets));
}

export function moodMessage(mood, language = 'es') {
  const messages = {
    es: {
      bored: '¿Sigues aquí? Me estoy aburriendo...',
      locked: 'Ya déjame en paz, ahora refresca la página.',
      annoyed: '💢 💢 ¡Deja de darme clics!',
    },
    en: {
      bored: 'Are you still here? I am getting bored...',
      locked: 'Leave me alone now, then refresh the page.',
      annoyed: '💢 💢 Stop clicking me!',
    },
  };
  const localized = messages[language] || messages.es;
  if (mood === 'bored') return localized.bored;
  if (mood === 'locked') return localized.locked;
  return localized.annoyed;
}

export function mouthLabel(mouth) {
  return MOUTH_LABELS[clamp(mouth, 0, 2)];
}
