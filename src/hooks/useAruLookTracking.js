import React from 'react';
import { CENTER_CELL, COLS, ROWS, clamp } from '../lib/aru-frames';

export function useAruLookTracking({
  targetRef,
  followRange = 340,
  smoothing = 0.3,
  enabled = true,
  originY = 0.45,
} = {}) {
  const [cell, setCell] = React.useState(CENTER_CELL);
  const target = React.useRef({ x: 0, y: 0 });
  const current = React.useRef({ x: 0, y: 0 });
  const config = React.useRef({ followRange, smoothing, enabled, originY });
  config.current = { followRange, smoothing, enabled, originY };

  React.useEffect(() => {
    function onMove(event) {
      if (!config.current.enabled) return;
      const element = targetRef?.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height * config.current.originY;
      const range = config.current.followRange;
      target.current.x = clamp((event.clientX - cx) / range, -1, 1);
      target.current.y = clamp((event.clientY - cy) / range, -1, 1);
    }

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerdown', onMove);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onMove);
    };
  }, [targetRef]);

  React.useEffect(() => {
    let raf = 0;
    let last = CENTER_CELL;

    function tick() {
      const { enabled: trackingEnabled, smoothing: smooth } = config.current;
      if (!trackingEnabled) {
        target.current.x = 0;
        target.current.y = 0;
      }

      current.current.x += (target.current.x - current.current.x) * smooth;
      current.current.y += (target.current.y - current.current.y) * smooth;

      const c = clamp(Math.round(((current.current.x + 1) / 2) * (COLS - 1)), 0, COLS - 1);
      const r = clamp(Math.round(((current.current.y + 1) / 2) * (ROWS - 1)), 0, ROWS - 1);

      if (r !== last.r || c !== last.c) {
        last = { r, c };
        setCell(last);
      }
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return cell;
}
