import React from 'react';

export function useAruBlink(enabled = true) {
  const [blink, setBlink] = React.useState(false);

  React.useEffect(() => {
    if (!enabled) {
      setBlink(false);
      return undefined;
    }

    let alive = true;
    let timer = 0;
    const rand = (min, max) => min + Math.random() * (max - min);

    function blinkOnce(duration, after) {
      setBlink(true);
      timer = window.setTimeout(() => {
        if (!alive) return;
        setBlink(false);
        timer = window.setTimeout(after, rand(120, 220));
      }, duration);
    }

    function schedule() {
      if (!alive) return;
      const roll = Math.random();
      let wait = 0;
      if (roll < 0.12) wait = rand(700, 1500);
      else if (roll < 0.82) wait = rand(1800, 4500);
      else wait = rand(4500, 9000);
      timer = window.setTimeout(doBlink, wait);
    }

    function doBlink() {
      if (!alive) return;
      const roll = Math.random();
      if (roll < 0.22) {
        blinkOnce(rand(80, 120), () => {
          if (alive) blinkOnce(rand(70, 110), schedule);
        });
      } else if (roll < 0.28) {
        blinkOnce(rand(260, 420), schedule);
      } else {
        blinkOnce(rand(90, 150), schedule);
      }
    }

    schedule();
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [enabled]);

  return blink;
}
