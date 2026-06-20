import React from 'react';
import ReactDOM from 'react-dom/client';
import charConfig from './character-config';

const { useState, useEffect, useRef, useMemo } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "followRange": 340,
  "smoothing": 0.3,
  "charSize": 64,
  "bgColor": "#FFEAD3",
  "showDebug": false
}/*EDITMODE-END*/;

const { rows: ROWS, cols: COLS } = charConfig;
const SRC = (r, c) => charConfig.src(charConfig.sheets.eyesOpen.close, r, c);
const BLINK_SRC = (r, c) => charConfig.src(charConfig.sheets.eyesClosed.close, r, c);
const BORED_SRC = (r, c) => charConfig.src(charConfig.sheets.special.bored, r, c);
const ANNOYED_SRC = (r, c) => charConfig.src(charConfig.sheets.special.annoyed, r, c);
const RAGE_SRC = (r, c) => charConfig.src(charConfig.sheets.special.rage, r, c);
const BG_OPTIONS = ['#FFEAD3', '#FFF7EC', '#EAF6F0', '#F2EEFF'];
const AFK_MS = 60_000;
const RAGE_CLICK_LIMIT = 10;

function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }

function getFrameSrc(mood, r, c) {
  if (mood === 'bored') return BORED_SRC(r, c);
  if (mood === 'annoyed') return ANNOYED_SRC(r, c);
  if (mood === 'locked') return RAGE_SRC(r, c);
  return SRC(r, c);
}

function getMoodMessage(mood) {
  if (mood === 'bored') return 'Sigues aquí, me aburro 💤';
  if (mood === 'locked') return 'YA DÉJAME EN PAZ PEDAZO DE #!@% AHORA REFRESCA LA PÁGINA, PASO DE #!@%';
  return 'DEJA DE DARME CLICS 💢💢';
}

function App() {
  const [t, setTweak] = useAjustes(TWEAK_DEFAULTS);
  const [cell, setCell] = useState({ r: 2, c: 2 });
  const [pressed, setPressed] = useState(false);
  const [blink, setBlink] = useState(false);
  const [mood, setMood] = useState('normal');
  const [clickCount, setClickCount] = useState(0);
  const stageRef = useRef(null);
  const charRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const tweaksRef = useRef(t);
  const moodRef = useRef(mood);
  tweaksRef.current = t;
  moodRef.current = mood;

  useEffect(() => {
    function onMove(e) {
      const el = charRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height * 0.45;
      const range = tweaksRef.current.followRange;
      target.current.x = clamp((e.clientX - cx) / range, -1, 1);
      target.current.y = clamp((e.clientY - cy) / range, -1, 1);
    }
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerdown', onMove);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onMove);
    };
  }, []);

  useEffect(() => {
    let timer;
    function resetAfk() {
      clearTimeout(timer);
      if (moodRef.current === 'locked') return;
      if (moodRef.current === 'bored') setMood('normal');
      timer = setTimeout(() => {
        if (moodRef.current === 'normal') setMood('bored');
      }, AFK_MS);
    }

    const events = ['keydown'];
    for (const eventName of events) window.addEventListener(eventName, resetAfk, { passive: true });
    resetAfk();
    return () => {
      clearTimeout(timer);
      for (const eventName of events) window.removeEventListener(eventName, resetAfk);
    };
  }, []);

  useEffect(() => {
    let raf;
    let last = { r: 2, c: 2 };
    function tick() {
      const k = tweaksRef.current.smoothing;
      current.current.x += (target.current.x - current.current.x) * k;
      current.current.y += (target.current.y - current.current.y) * k;
      const c = clamp(Math.round((current.current.x + 1) / 2 * (COLS - 1)), 0, COLS - 1);
      const r = clamp(Math.round((current.current.y + 1) / 2 * (ROWS - 1)), 0, ROWS - 1);
      if (r !== last.r || c !== last.c) {
        last = { r, c };
        setCell(last);
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    let alive = true;
    let timer;
    const rand = (a, b) => a + Math.random() * (b - a);
    function blinkOnce(dur, after) {
      setBlink(true);
      timer = setTimeout(() => {
        if (!alive) return;
        setBlink(false);
        timer = setTimeout(after, rand(120, 220));
      }, dur);
    }
    function doBlink() {
      if (!alive) return;
      const roll = Math.random();
      if (roll < 0.22) {
        blinkOnce(rand(80, 120), () => { if (alive) blinkOnce(rand(70, 110), schedule); });
      } else if (roll < 0.28) {
        blinkOnce(rand(260, 420), schedule);
      } else {
        blinkOnce(rand(90, 150), schedule);
      }
    }
    function schedule() {
      if (!alive) return;
      const u = Math.random();
      let wait;
      if (u < 0.12) wait = rand(700, 1500);
      else if (u < 0.82) wait = rand(1800, 4500);
      else wait = rand(4500, 9000);
      timer = setTimeout(doBlink, wait);
    }
    schedule();
    return () => { alive = false; clearTimeout(timer); };
  }, []);

  const frames = useMemo(() => {
    const arr = [];
    for (let r = 0; r < ROWS; r += 1) for (let c = 0; c < COLS; c += 1) arr.push({ r, c });
    return arr;
  }, []);

  const locked = mood === 'locked';
  const inkColor = 'rgba(60,48,38,0.8)';

  return (
    <div
      ref={stageRef}
      style={{
        position: 'fixed', inset: 0, background: t.bgColor,
        overflow: 'hidden', transition: 'background 0.4s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', cursor: locked ? 'not-allowed' : 'crosshair',
        fontFamily: "'Zen Maru Gothic', sans-serif"
      }}
    >
      <div
        ref={charRef}
        onPointerDown={() => {
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
        className="bob"
        style={{
          position: 'relative',
          width: `${t.charSize * 4 / 3}vmin`, height: `${t.charSize * 4 / 3}vmin`,
          maxWidth: 1200, maxHeight: 1200,
          transform: pressed && !locked ? 'scale(0.94)' : 'scale(1)',
          transition: 'transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
          userSelect: 'none', touchAction: 'none'
        }}
      >
        {frames.map(({ r, c }) => (
          <img
            key={`${r}-${c}`}
            src={getFrameSrc(mood, r, c)}
            alt=""
            draggable="false"
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              opacity: r === cell.r && c === cell.c ? 1 : 0,
              pointerEvents: 'none'
            }}
          ></img>
        ))}
        {blink && mood === 'normal' ? (
          <img
            src={BLINK_SRC(cell.r, cell.c)}
            alt=""
            draggable="false"
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              pointerEvents: 'none'
            }}
          ></img>
        ) : null}
      </div>

      {mood !== 'normal' ? (
        <div style={{
          position: 'absolute', top: '8vh', left: '50%', transform: 'translateX(-50%)',
          display: 'grid', justifyItems: 'center', gap: 12, zIndex: 3
        }}>
          <div style={{
            maxWidth: 'min(78vw, 460px)', padding: '14px 18px',
            border: '3px solid rgba(60,48,38,0.9)', borderRadius: 18,
            background: 'rgba(255,255,255,0.88)', color: inkColor,
            boxShadow: '7px 8px 0 rgba(158,59,59,0.18)',
            fontWeight: 700, textAlign: 'center', letterSpacing: '0.04em'
          }}>{getMoodMessage(mood)}</div>
          {mood === 'annoyed' ? (
            <button
              type="button"
              onClick={() => {
                setMood('normal');
                setClickCount(0);
              }}
              style={{
                appearance: 'none', border: '3px solid rgba(60,48,38,0.9)',
                borderRadius: 999, padding: '10px 18px', background: '#fff',
                color: '#9E3B3B', font: 'inherit', fontWeight: 700,
                boxShadow: '5px 6px 0 rgba(234,123,123,0.45)', cursor: 'pointer'
              }}
            >LO SIENTO</button>
          ) : null}
        </div>
      ) : null}

      <a href={locked ? undefined : 'voz.html'} aria-disabled={locked} style={{
        position: 'absolute', bottom: '4.5vh', left: '50%',
        transform: 'translateX(-50%)', minHeight: 44,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        padding: '10px 18px', border: '3px solid rgba(60,48,38,0.9)',
        borderRadius: 999, background: locked ? '#8b7a7a' : '#D25353', color: '#fff',
        textDecoration: 'none', fontSize: 15, fontWeight: 700,
        letterSpacing: '0.04em', boxShadow: '6px 7px 0 rgba(158,59,59,0.72)',
        opacity: locked ? 0.62 : 1,
        pointerEvents: locked ? 'none' : 'auto'
      }}>Conversar con Aru</a>

      {t.showDebug ? (
        <div style={{
          position: 'absolute', top: 16, left: 16,
          background: 'rgba(0,0,0,0.55)', color: '#fff', borderRadius: 10,
          padding: '10px 12px', fontSize: 12, fontFamily: 'ui-monospace, monospace',
          pointerEvents: 'none', lineHeight: 1.5
        }}>
          <div>row {cell.r} / col {cell.c}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 14px)', gap: 3, marginTop: 6 }}>
            {frames.map(({ r, c }) => (
              <div key={`d${r}-${c}`} style={{
                width: 14, height: 14, borderRadius: 3,
                background: r === cell.r && c === cell.c ? '#FFB13D' : 'rgba(255,255,255,0.22)'
              }}></div>
            ))}
          </div>
        </div>
      ) : null}

      {!locked ? (
        <PanelAjustes>
          <TweakSection label="Movimiento"></TweakSection>
          <TweakSlider label="Rango de seguimiento" value={t.followRange} min={120} max={1200} step={10} unit="px"
            onChange={(v) => setTweak('followRange', v)}></TweakSlider>
          <TweakSlider label="Velocidad de seguimiento" value={t.smoothing} min={0.04} max={0.5} step={0.01}
            onChange={(v) => setTweak('smoothing', v)}></TweakSlider>
          <TweakSection label="Apariencia"></TweakSection>
          <TweakColor label="Color de fondo" value={t.bgColor} options={BG_OPTIONS}
            onChange={(v) => setTweak('bgColor', v)}></TweakColor>
          <TweakSlider label="Tamaño del personaje" value={t.charSize} min={30} max={92} unit="vmin"
            onChange={(v) => setTweak('charSize', v)}></TweakSlider>
          <TweakSection label="Depuración"></TweakSection>
          <TweakToggle label="Mostrar cuadrícula" value={t.showDebug}
            onChange={(v) => setTweak('showDebug', v)}></TweakToggle>
        </PanelAjustes>
      ) : null}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App></App>);
