import React from 'react';
import { useAruBlink } from '../hooks/useAruBlink';
import { useAruLookTracking } from '../hooks/useAruLookTracking';
import {
  CENTER_CELL,
  EXPRESSION_SHEETS,
  avatarSheets,
  frameGrid,
  frameSrc,
  moodMessage,
  sheetForMouth,
  SHEETS,
} from '../lib/aru-frames';
import { playAruSfx } from '../lib/aru-sfx';
import '../styles/aru-avatar.css';
import '../styles/aru-motion.css';

const RAGE_CLICK_LIMIT = 10;
const AFK_MS = 30_000;

function debugFrames(activeCell) {
  const frames = [];
  for (let r = 0; r < 5; r += 1) {
    for (let c = 0; c < 5; c += 1) frames.push({ r, c, active: r === activeCell.r && c === activeCell.c });
  }
  return frames;
}

export default function AruAvatar({
  mode = 'simple',
  enableAudioMouthSync = false,
  audioLevel = 0,
  mouth = 0,
  charSize = 64,
  followRange = 340,
  smoothing = 0.3,
  showDebug = false,
  moodEnabled = false,
  autoBlink = true,
  lookEnabled = true,
  className = '',
  ariaLabel = 'Aru',
  onMoodChange,
  expression = null,
  motion = 'idle-breathe',
  actionBubble = null,
  language = 'es',
  onHardLock,
}) {
  const avatarRef = React.useRef(null);
  const [pressed, setPressed] = React.useState(false);
  const [mood, setMood] = React.useState('normal');
  const [clickCount, setClickCount] = React.useState(0);
  const moodRef = React.useRef(mood);
  const resetAfkRef = React.useRef(() => {});
  const hardLockNotifiedRef = React.useRef(false);
  const hasPlayedAfkSfxRef = React.useRef(false);
  moodRef.current = mood;

  const locked = mood === 'locked';
  const forcedExpression = EXPRESSION_SHEETS.includes(String(expression || '').toUpperCase())
    ? String(expression).toUpperCase()
    : null;
  const blink = useAruBlink(autoBlink && mood === 'normal' && !forcedExpression);
  const cell = useAruLookTracking({
    targetRef: avatarRef,
    followRange,
    smoothing,
    enabled: lookEnabled,
  });
  const activeCell = lookEnabled ? cell : CENTER_CELL;

  React.useEffect(() => {
    onMoodChange?.(mood);
  }, [mood, onMoodChange]);

  React.useEffect(() => {
    if (mood !== 'locked' || hardLockNotifiedRef.current) return;
    hardLockNotifiedRef.current = true;
    onHardLock?.();
  }, [mood, onHardLock]);

  React.useEffect(() => {
    if (!moodEnabled) return undefined;

    let timer = 0;
    function resetAfk() {
      clearTimeout(timer);
      if (moodRef.current === 'locked') return;
      if (moodRef.current === 'bored') setMood('normal');
      timer = window.setTimeout(() => {
        if (moodRef.current === 'normal') setMood('bored');
      }, AFK_MS);
    }
    resetAfkRef.current = resetAfk;

    window.addEventListener('keydown', resetAfk, { passive: true });
    window.addEventListener('pointerdown', resetAfk, { passive: true });
    window.addEventListener('pointermove', resetAfk, { passive: true });
    window.addEventListener('touchstart', resetAfk, { passive: true });
    resetAfk();
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', resetAfk);
      window.removeEventListener('pointerdown', resetAfk);
      window.removeEventListener('pointermove', resetAfk);
      window.removeEventListener('touchstart', resetAfk);
      resetAfkRef.current = () => {};
    };
  }, [moodEnabled]);

  React.useEffect(() => {
    if (!moodEnabled) return;

    if (mood === 'bored') {
      if (hasPlayedAfkSfxRef.current) return;
      hasPlayedAfkSfxRef.current = true;
      playAruSfx('afk', `afk-${Date.now()}`, { queueOnBlock: false });
      return;
    }

    hasPlayedAfkSfxRef.current = false;
  }, [mood, moodEnabled]);

  const frames = React.useMemo(() => frameGrid(avatarSheets({
    includeMouthFrames: enableAudioMouthSync,
    includeSpecial: moodEnabled,
    includeAllExpressions: Boolean(forcedExpression),
  })), [enableAudioMouthSync, forcedExpression, moodEnabled]);

  const activeSheet = moodEnabled && mood !== 'normal'
    ? SHEETS.special[mood]
    : forcedExpression || sheetForMouth({ eyesClosed: blink, mouth: enableAudioMouthSync ? mouth : 0 });

  const moodMotion = mood === 'bored'
    ? 'tired-sway'
    : mood === 'annoyed' || mood === 'locked'
      ? 'angry-shake'
      : null;
  const effectiveMotion = moodMotion || motion;
  const size = `${charSize * 4 / 3}vmin`;
  const classes = [
    'aru-avatar',
    'aru-avatar--bob',
    moodEnabled ? 'aru-avatar--clickable' : '',
    locked ? 'aru-avatar--locked' : '',
    moodEnabled && mood !== 'normal' ? `aru-avatar--mood-${mood}` : '',
    mode ? `aru-avatar--${mode}` : '',
    effectiveMotion ? `aru-avatar--motion-${effectiveMotion}` : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={avatarRef}
      className={classes}
      data-mood={mood}
      data-motion={effectiveMotion || 'none'}
      aria-label={ariaLabel}
      role="img"
      style={{
        '--aru-size': size,
        '--aru-press-scale': pressed && !locked ? 0.94 : 1,
        '--aru-audio-level': audioLevel,
      }}
      onPointerDown={() => {
        if (!moodEnabled) return;
        resetAfkRef.current();
        if (moodRef.current === 'bored') {
          setMood('normal');
          setClickCount(0);
          return;
        }
        if (locked) return;
        setPressed(true);
        setClickCount((count) => {
          const next = count + 1;
          setMood(next >= RAGE_CLICK_LIMIT ? 'locked' : 'annoyed');
          return next;
        });
      }}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
    >
      <div className="aru-avatar__body">
        {frames.map(({ sheet, r, c }) => (
          <img
            key={`${sheet}-${r}-${c}`}
            className={
              sheet === activeSheet && r === activeCell.r && c === activeCell.c
                ? 'aru-avatar__sprite aru-avatar__sprite--active'
                : 'aru-avatar__sprite'
            }
            src={frameSrc(sheet, r, c)}
            alt=""
            draggable="false"
          />
        ))}
      </div>

      {moodEnabled && mood !== 'normal' ? (
        <div className="aru-avatar__bubble">
          <div className="aru-avatar__mood-text">{moodMessage(mood, language)}</div>
          {mood === 'annoyed' ? (
            <button
              type="button"
              className="aru-avatar__sorry"
              aria-label={language === 'en' ? 'Sorry' : 'Lo siento'}
              onClick={(event) => {
                event.stopPropagation();
                setMood('normal');
                setClickCount(0);
              }}
            >
              {language === 'en' ? 'Sorry' : 'Lo siento'}
            </button>
          ) : null}
        </div>
      ) : actionBubble ? (
        <div className="aru-avatar__bubble aru-avatar__bubble--action">
          <div className="aru-avatar__action-text">{actionBubble}</div>
        </div>
      ) : null}

      {showDebug ? (
        <div className="aru-avatar__debug">
          <div>row {activeCell.r} / col {activeCell.c}</div>
          <div className="aru-avatar__debug-grid">
            {debugFrames(activeCell).map(({ r, c, active }) => (
              <div
                key={`d-${r}-${c}`}
                className={active ? 'aru-avatar__debug-cell aru-avatar__debug-cell--active' : 'aru-avatar__debug-cell'}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
