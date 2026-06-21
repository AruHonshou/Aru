import React from 'react';

export function useAudioMouthSync({
  getLevel,
  enabled = true,
  gain = 1.6,
  halfThreshold = 0.07,
  fullThreshold = 0.2,
  release = 0.12,
  maxLevel = 0.4,
} = {}) {
  const [state, setState] = React.useState({ level: 0, mouth: 0 });
  const envelope = React.useRef(0);
  const options = React.useRef({
    getLevel,
    enabled,
    gain,
    halfThreshold,
    fullThreshold,
    release,
    maxLevel,
  });
  options.current = { getLevel, enabled, gain, halfThreshold, fullThreshold, release, maxLevel };

  React.useEffect(() => {
    let raf = 0;
    let lastMouth = 0;
    let lastSwitch = 0;

    function tick(now) {
      const opts = options.current;
      if (!opts.enabled || !opts.getLevel) {
        envelope.current += (0 - envelope.current) * 0.24;
      } else {
        const raw = opts.getLevel() * opts.gain;
        if (raw > envelope.current) envelope.current += (raw - envelope.current) * 0.6;
        else envelope.current += (raw - envelope.current) * opts.release;
      }

      const level = envelope.current;
      const nextMouth = level >= opts.fullThreshold ? 2 : level >= opts.halfThreshold ? 1 : 0;
      const canSwitch = nextMouth === 0 || now - lastSwitch > 70;
      const mouth = canSwitch ? nextMouth : lastMouth;

      if (mouth !== lastMouth) {
        lastMouth = mouth;
        lastSwitch = now;
      }

      setState((prev) => {
        const meter = Math.min(1, level / opts.maxLevel);
        if (prev.mouth === mouth && Math.abs(prev.level - meter) < 0.01) return prev;
        return { level: meter, mouth };
      });

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return state;
}
