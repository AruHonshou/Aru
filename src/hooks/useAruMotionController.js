import React from 'react';
import { getAruAction } from '../lib/aru-actions';

const IDLE_ACTION = getAruAction('idle');

function clampDuration(durationMs) {
  const value = Number(durationMs);
  if (!Number.isFinite(value)) return 2400;
  return Math.min(8000, Math.max(500, Math.round(value)));
}

export function useAruMotionController(initialAction = 'idle') {
  const [action, setAction] = React.useState(() => getAruAction(initialAction));
  const timerRef = React.useRef(0);
  const actionRef = React.useRef(action);
  actionRef.current = action;

  const clearTimer = React.useCallback(() => {
    window.clearTimeout(timerRef.current);
    timerRef.current = 0;
  }, []);

  const resetToIdle = React.useCallback(() => {
    clearTimer();
    setAction(IDLE_ACTION);
  }, [clearTimer]);

  const runAction = React.useCallback((actionId, options = {}) => {
    const next = getAruAction(actionId, options.fallback || 'idle');
    if (!options.force && next.priority < actionRef.current.priority) return next;

    clearTimer();
    setAction(next);

    if (next.durationMs && next.resetToIdle) {
      timerRef.current = window.setTimeout(resetToIdle, clampDuration(next.durationMs));
    }

    return next;
  }, [clearTimer, resetToIdle]);

  React.useEffect(() => () => clearTimer(), [clearTimer]);

  return {
    action,
    motion: action.motion,
    bubble: action.bubble,
    runAction,
    resetToIdle,
  };
}
