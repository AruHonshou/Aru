const AFK_AUDIO_FILE = 'audio/aruAFK.mp3';
const AFK_VOLUME = 0.55;
let afkAudioPrimed = false;

function afkAudioUrl() {
  return `${import.meta.env.BASE_URL}${AFK_AUDIO_FILE}`;
}

function expressionForVolume(volume) {
  if (volume < 0.012) return 'A';
  if (volume < 0.024) return 'B';
  return 'C';
}

export function primeAruAfkAudio() {
  if (afkAudioPrimed || typeof Audio === 'undefined') return;
  afkAudioPrimed = true;

  const audio = new Audio(afkAudioUrl());
  audio.preload = 'auto';
  audio.load();

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  const audioContext = new AudioContextClass();
  void audioContext.resume()
    .catch(() => {})
    .finally(() => {
      if (audioContext.state !== 'closed') {
        void audioContext.close().catch(() => {});
      }
    });
}

export function startAruAfkLipSync({ onExpression } = {}) {
  if (typeof window === 'undefined' || typeof Audio === 'undefined') {
    return { stop() {} };
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const audio = new Audio(afkAudioUrl());
  audio.preload = 'auto';
  audio.volume = AFK_VOLUME;

  let audioContext = null;
  let analyser = null;
  let source = null;
  let frameId = 0;
  let stopped = false;

  const stop = () => {
    if (stopped) return;
    stopped = true;
    window.cancelAnimationFrame(frameId);
    audio.pause();
    audio.currentTime = 0;
    audio.removeAttribute('src');
    audio.load();
    onExpression?.('A');

    if (audioContext && audioContext.state !== 'closed') {
      void audioContext.close().catch(() => {});
    }
  };

  const tick = () => {
    if (stopped || !analyser) return;

    const data = new Uint8Array(analyser.fftSize);
    analyser.getByteTimeDomainData(data);

    let sum = 0;
    for (let index = 0; index < data.length; index += 1) {
      const normalized = (data[index] - 128) / 128;
      sum += normalized * normalized;
    }

    onExpression?.(expressionForVolume(Math.sqrt(sum / data.length)));
    frameId = window.requestAnimationFrame(tick);
  };

  const start = async () => {
    if (AudioContextClass) {
      try {
        audioContext = new AudioContextClass();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 512;
        analyser.smoothingTimeConstant = 0.68;
        source = audioContext.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        await audioContext.resume();
      } catch {
        if (audioContext && audioContext.state !== 'closed') {
          void audioContext.close().catch(() => {});
        }
        audioContext = null;
        analyser = null;
        source = null;
      }
    }

    await audio.play();
    tick();
  };

  audio.addEventListener('ended', () => {
    window.cancelAnimationFrame(frameId);
    onExpression?.('A');
    if (audioContext && audioContext.state !== 'closed') {
      void audioContext.close().catch(() => {});
    }
  }, { once: true });

  void start().catch(() => {
    stop();
  });

  return { stop };
}
