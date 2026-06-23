const SFX_VOLUME = 0.55;

const SFX_FILES = {
  greeting: 'audio/gambare-beam.mp3',
  notFound: 'audio/god-damn.mp3',
  angry: 'audio/angry.mp3',
  afk: 'audio/aruAFK.mp3',
};

const audioCache = new Map();
const playedEvents = new Set();
const pendingEvents = new Map();
let unlockListening = false;

function sfxUrl(kind) {
  const file = SFX_FILES[kind];
  return file ? `${import.meta.env.BASE_URL}${file}` : null;
}

function getAudio(kind) {
  if (typeof Audio === 'undefined') return null;
  const url = sfxUrl(kind);
  if (!url) return null;
  if (!audioCache.has(kind)) {
    const audio = new Audio(url);
    audio.preload = 'auto';
    audio.volume = SFX_VOLUME;
    audioCache.set(kind, audio);
  }
  return audioCache.get(kind);
}

async function playNow(kind) {
  const audio = getAudio(kind);
  if (!audio) return false;
  audio.pause();
  audio.currentTime = 0;
  audio.volume = SFX_VOLUME;
  await audio.play();
  return true;
}

function rememberPending(kind, eventId) {
  if (!eventId) return;
  pendingEvents.set(eventId, kind);
  installAruSfxUnlock();
}

async function flushPending() {
  const entries = [...pendingEvents.entries()];
  pendingEvents.clear();
  for (const [eventId, kind] of entries) {
    if (playedEvents.has(eventId)) continue;
    try {
      await playNow(kind);
      playedEvents.add(eventId);
    } catch {
      // Browser autoplay may stay locked. Keep the UI silent and stable.
    }
  }
}

export function installAruSfxUnlock() {
  if (unlockListening || typeof window === 'undefined') return;
  unlockListening = true;

  const onFirstInteraction = () => {
    window.removeEventListener('pointerdown', onFirstInteraction);
    window.removeEventListener('keydown', onFirstInteraction);
    window.removeEventListener('touchstart', onFirstInteraction);
    unlockListening = false;
    void flushPending();
  };

  window.addEventListener('pointerdown', onFirstInteraction, { once: true });
  window.addEventListener('keydown', onFirstInteraction, { once: true });
  window.addEventListener('touchstart', onFirstInteraction, { once: true });
}

export function playAruSfx(kind, eventId = kind, options = {}) {
  if (!kind || !sfxUrl(kind) || playedEvents.has(eventId)) return;
  playedEvents.add(eventId);

  void playNow(kind).catch(() => {
    playedEvents.delete(eventId);
    if (options.queueOnBlock !== false) {
      rememberPending(kind, eventId);
    }
  });
}
