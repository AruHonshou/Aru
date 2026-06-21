export function createAudioEngine() {
  const state = {
    ctx: null,
    micAnalyser: null,
    micStream: null,
    fileAnalyser: null,
    fileSourceMade: false,
    buffer: null,
  };

  function audioContext() {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) {
      throw new Error('AUDIO_CONTEXT_UNSUPPORTED');
    }
    if (!state.ctx) state.ctx = new AudioCtor();
    return state.ctx;
  }

  function levelOf(analyser) {
    if (!analyser) return 0;
    if (!state.buffer || state.buffer.length !== analyser.fftSize) {
      state.buffer = new Float32Array(analyser.fftSize);
    }

    analyser.getFloatTimeDomainData(state.buffer);
    let sum = 0;
    for (let i = 0; i < state.buffer.length; i += 1) {
      sum += state.buffer[i] * state.buffer[i];
    }
    return Math.sqrt(sum / state.buffer.length);
  }

  return {
    async startMic() {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('MIC_UNSUPPORTED');
      }

      this.stopMic();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ctx = audioContext();
      await ctx.resume();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      source.connect(analyser);
      state.micStream = stream;
      state.micAnalyser = analyser;
    },

    stopMic() {
      if (state.micStream) {
        state.micStream.getTracks().forEach((track) => track.stop());
      }
      state.micStream = null;
      state.micAnalyser = null;
    },

    attachAudioElement(element) {
      if (!element || state.fileSourceMade) return;
      const ctx = audioContext();
      const source = ctx.createMediaElementSource(element);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      state.fileAnalyser = analyser;
      state.fileSourceMade = true;
    },

    async resume() {
      if (state.ctx) await state.ctx.resume();
    },

    level() {
      return Math.max(levelOf(state.micAnalyser), levelOf(state.fileAnalyser));
    },

    micOn() {
      return !!state.micAnalyser;
    },

    destroy() {
      this.stopMic();
      state.fileAnalyser = null;
      if (state.ctx) {
        state.ctx.close().catch(() => {});
      }
      state.ctx = null;
      state.buffer = null;
    },
  };
}
