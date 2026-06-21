import React from 'react';
import {
  ARU_EXPRESSION_PRIORITY,
  expressionForEmotion,
  normalizeExpression,
} from '../lib/aru-expression-map';

const IDLE_STATE = {
  expression: 'A',
  source: 'idle',
  priority: ARU_EXPRESSION_PRIORITY.idle,
};

function clampDuration(durationMs) {
  const value = Number(durationMs);
  if (!Number.isFinite(value)) return 1800;
  return Math.min(8000, Math.max(600, Math.round(value)));
}

export function useAruExpressionController() {
  const [state, setState] = React.useState(IDLE_STATE);
  const timerRef = React.useRef(0);
  const stateRef = React.useRef(state);
  stateRef.current = state;

  const clearTimer = React.useCallback(() => {
    window.clearTimeout(timerRef.current);
    timerRef.current = 0;
  }, []);

  const resetToIdle = React.useCallback(() => {
    clearTimer();
    setState(IDLE_STATE);
  }, [clearTimer]);

  const applyExpression = React.useCallback((expression, options = {}) => {
    const {
      durationMs = 0,
      resetToIdle: shouldReset = false,
      priority = ARU_EXPRESSION_PRIORITY.ai,
      source = 'ai',
      force = false,
    } = options;

    const next = {
      expression: normalizeExpression(expression),
      source,
      priority,
    };

    if (!force && priority < stateRef.current.priority) return;

    clearTimer();
    setState(next);

    if (durationMs && shouldReset) {
      timerRef.current = window.setTimeout(resetToIdle, clampDuration(durationMs));
    }
  }, [clearTimer, resetToIdle]);

  const setExpression = React.useCallback((expression, options = {}) => {
    applyExpression(expression, {
      priority: ARU_EXPRESSION_PRIORITY.ai,
      source: 'ai',
      ...options,
    });
  }, [applyExpression]);

  const setTemporaryExpression = React.useCallback((expression, options = {}) => {
    applyExpression(expression, {
      durationMs: options.durationMs ?? 1800,
      resetToIdle: options.resetToIdle ?? true,
      priority: ARU_EXPRESSION_PRIORITY.ai,
      source: 'ai',
      ...options,
    });
  }, [applyExpression]);

  const setEmotion = React.useCallback((emotion, options = {}) => {
    setTemporaryExpression(expressionForEmotion(emotion, 'A'), options);
  }, [setTemporaryExpression]);

  React.useEffect(() => () => clearTimer(), [clearTimer]);

  return {
    expression: state.expression,
    overrideExpression: state.source === 'idle' ? null : state.expression,
    source: state.source,
    priority: state.priority,
    setExpression,
    setTemporaryExpression,
    setEmotion,
    resetToIdle,
  };
}
