import React from 'react';
import ReactDOM from 'react-dom/client';
import charConfig from './character-config';

const { useState, useEffect, useRef, useMemo } = React;

const TALK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "followRange": 340,
  "smoothing": 0.3,
  "charSize": 64,
  "bgColor": "#FFEAD3",
  "micGain": 1.6,
  "thHalf": 0.07,
  "thFull": 0.2,
  "release": 0.12,
  "autoBlink": true
}/*EDITMODE-END*/;

const { rows: ROWS, cols: COLS } = charConfig;
// Hojas: ojos abiertos x boca [cerrada/media/abierta] = A/B/C, ojos cerrados x boca [cerrada/media/abierta] = D/E/F.
const SHEETS = [
  charConfig.sheets.eyesOpen.close,   // A
  charConfig.sheets.eyesOpen.half,    // B
  charConfig.sheets.eyesOpen.open,    // C
  charConfig.sheets.eyesClosed.close, // D
  charConfig.sheets.eyesClosed.half,  // E
  charConfig.sheets.eyesClosed.open,  // F
];
const sheetFor = (eyesClosed, mouth) => SHEETS[(eyesClosed ? 3 : 0) + mouth];
const SRC = (sheet, r, c) => charConfig.src(sheet, r, c);
function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }

// ---- Motor de audio ----
function makeAudioEngine() {
  const st = {
    ctx: null, micAnalyser: null, micStream: null,
    fileAnalyser: null, fileSourceMade: false, buf: null
  };
  function ctx() {
    if (!st.ctx) st.ctx = new (window.AudioContext || window.webkitAudioContext)();
    return st.ctx;
  }
  function levelOf(analyser) {
    if (!analyser) return 0;
    if (!st.buf || st.buf.length !== analyser.fftSize) st.buf = new Float32Array(analyser.fftSize);
    analyser.getFloatTimeDomainData(st.buf);
    let sum = 0;
    for (let i = 0; i < st.buf.length; i++) sum += st.buf[i] * st.buf[i];
    return Math.sqrt(sum / st.buf.length);
  }
  return {
    async startMic() {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const c = ctx();
      await c.resume();
      const src = c.createMediaStreamSource(stream);
      const an = c.createAnalyser();
      an.fftSize = 1024;
      src.connect(an);
      st.micStream = stream;
      st.micAnalyser = an;
    },
    stopMic() {
      if (st.micStream) st.micStream.getTracks().forEach((t) => t.stop());
      st.micStream = null;
      st.micAnalyser = null;
    },
    attachAudioEl(el) {
      if (st.fileSourceMade) return;
      const c = ctx();
      const src = c.createMediaElementSource(el);
      const an = c.createAnalyser();
      an.fftSize = 1024;
      src.connect(an);
      an.connect(c.destination);
      st.fileAnalyser = an;
      st.fileSourceMade = true;
    },
    resume() { if (st.ctx) st.ctx.resume(); },
    level() { return Math.max(levelOf(st.micAnalyser), levelOf(st.fileAnalyser)); },
    micOn() { return !!st.micAnalyser; }
  };
}

function App() {
  const [t, setTweak] = useAjustes(TALK_DEFAULTS);
  const [cell, setCell] = useState({ r: 2, c: 2 });
  const [mouth, setMouth] = useState(0);        // 0: cerrada, 1: media, 2: abierta
  const [blink, setBlink] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [micErr, setMicErr] = useState('');
  const [fileName, setFileName] = useState('');

  const charRef = useRef(null);
  const audioElRef = useRef(null);
  const meterRef = useRef(null);
  const engine = useMemo(() => makeAudioEngine(), []);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const env = useRef(0);
  const tweaksRef = useRef(t);
  tweaksRef.current = t;

  // Seguimiento del mouse.
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

  // Bucle principal: seguimiento + nivel de audio -> estado de la boca.
  useEffect(() => {
    let raf;
    let last = { r: 2, c: 2 };
    let lastMouth = 0;
    let lastSwitch = 0;
    function tick(now) {
      const tw = tweaksRef.current;
      current.current.x += (target.current.x - current.current.x) * tw.smoothing;
      current.current.y += (target.current.y - current.current.y) * tw.smoothing;
      const c = clamp(Math.round((current.current.x + 1) / 2 * (COLS - 1)), 0, COLS - 1);
      const r = clamp(Math.round((current.current.y + 1) / 2 * (ROWS - 1)), 0, ROWS - 1);
      if (r !== last.r || c !== last.c) { last = { r, c }; setCell(last); }
      const raw = engine.level() * tw.micGain;
      if (raw > env.current) env.current += (raw - env.current) * 0.6;
      else env.current += (raw - env.current) * tw.release;
      if (meterRef.current) {
        meterRef.current.style.width = `${clamp(env.current / 0.4, 0, 1) * 100}%`;
      }
      const lv = env.current;
      const m = lv >= tw.thFull ? 2 : lv >= tw.thHalf ? 1 : 0;
      if (m !== lastMouth && now - lastSwitch > 70) {
        lastMouth = m; lastSwitch = now; setMouth(m);
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [engine]);

  // Parpadeo automatico con variacion natural.
  useEffect(() => {
    if (!t.autoBlink) { setBlink(false); return; }
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
        // Doble parpadeo.
        blinkOnce(rand(80, 120), () => { if (alive) blinkOnce(rand(70, 110), schedule); });
      } else if (roll < 0.28) {
        // Parpadeo lento.
        blinkOnce(rand(260, 420), schedule);
      } else {
        blinkOnce(rand(90, 150), schedule);
      }
    }
    function schedule() {
      if (!alive) return;
      const u = Math.random();
      let wait;
      if (u < 0.12) wait = rand(700, 1500);        // A veces parpadea de nuevo rapido.
      else if (u < 0.82) wait = rand(1800, 4500);  // Intervalo normal.
      else wait = rand(4500, 9000);                // Intervalo largo en reposo.
      timer = setTimeout(doBlink, wait);
    }
    schedule();
    return () => { alive = false; clearTimeout(timer); };
  }, [t.autoBlink]);

  async function toggleMic() {
    setMicErr('');
    if (micOn) { engine.stopMic(); setMicOn(false); return; }
    try {
      await engine.startMic();
      setMicOn(true);
    } catch (e) {
      setMicErr('No se puede usar el microfono. Revisa los permisos.');
    }
  }

  function onFilePick(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const el = audioElRef.current;
    engine.attachAudioEl(el);
    engine.resume();
    el.src = URL.createObjectURL(f);
    el.play().catch(() => {});
    setFileName(f.name);
  }

  const allFrames = useMemo(() => {
    const arr = [];
    for (const s of SHEETS) for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) arr.push({ s, r, c });
    return arr;
  }, []);
  const activeSheet = sheetFor(blink, mouth);

  const inkColor = 'rgba(60,48,38,0.8)';
  const subColor = 'rgba(60,48,38,0.45)';
  const panelBg = 'rgba(255,255,255,0.88)';
  const lineColor = 'rgba(60,48,38,0.12)';

  const sizeVmin = t.charSize * 4 / 3;

  return (
    <div style={{
      position: 'fixed', inset: 0, background: t.bgColor,
      overflow: 'hidden', transition: 'background 0.4s ease',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'crosshair', fontFamily: "'Zen Maru Gothic', sans-serif"
    }}>
      <div ref={charRef} className="bob" style={{
        position: 'relative',
        width: `${sizeVmin}vmin`, height: `${sizeVmin}vmin`,
        maxWidth: 1200, maxHeight: 1200,
        userSelect: 'none', touchAction: 'none'
      }}>
        {allFrames.map(({ s, r, c }) => (
          <img key={`${s}${r}${c}`} src={SRC(s, r, c)} alt="" draggable="false" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            opacity: s === activeSheet && r === cell.r && c === cell.c ? 1 : 0,
            pointerEvents: 'none'
          }}></img>
        ))}
      </div>

      <div style={{ position: 'absolute', top: '3.5vh', left: 0, right: 0, textAlign: 'center', pointerEvents: 'none' }}>
        <div style={{ fontSize: 'clamp(18px, 2.4vmin, 26px)', fontWeight: 700, color: inkColor, letterSpacing: '0.18em' }}>Aru</div>
        <div style={{ fontSize: 'clamp(12px, 1.6vmin, 16px)', color: subColor, marginTop: 4, letterSpacing: '0.08em' }}>Sincroniza la boca y los parpadeos con el audio</div>
      </div>

      <div style={{
        position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', alignItems: 'center', gap: 14,
        background: panelBg, backdropFilter: 'blur(10px)',
        border: `1px solid ${lineColor}`, borderRadius: 18,
        padding: '12px 18px', cursor: 'default',
        boxShadow: '0 6px 24px rgba(60,48,38,0.10)'
      }}>
        <button onClick={toggleMic} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: 'inherit', fontWeight: 700, fontSize: 14,
          color: micOn ? '#fff' : inkColor,
          background: micOn ? '#D96C4F' : 'transparent',
          border: `1.5px solid ${micOn ? '#D96C4F' : lineColor}`,
          borderRadius: 12, padding: '9px 16px', cursor: 'pointer',
          minHeight: 44
        }}>
          <span style={{
            width: 9, height: 9, borderRadius: '50%',
            background: micOn ? '#fff' : '#D96C4F',
            animation: micOn ? 'pulse 1.2s ease-in-out infinite' : 'none'
          }}></span>
          {micOn ? 'Detener microfono' : 'Iniciar microfono'}
        </button>

        <label style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontWeight: 700, fontSize: 14, color: inkColor,
          border: `1.5px solid ${lineColor}`, borderRadius: 12,
          padding: '9px 16px', cursor: 'pointer', minHeight: 44, boxSizing: 'border-box'
        }}>
          Archivo de audio
          <input type="file" accept="audio/*" onChange={onFilePick} style={{ display: 'none' }}></input>
        </label>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, minWidth: 150 }}>
          <div style={{ fontSize: 11, color: subColor, letterSpacing: '0.06em', display: 'flex', justifyContent: 'space-between' }}>
            <span>Volumen</span>
            <span>{['cerrada', 'semiabierta', 'abierta'][mouth]}</span>
          </div>
          <div style={{ position: 'relative', height: 10, borderRadius: 5, background: lineColor, overflow: 'hidden' }}>
            <div ref={meterRef} style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: '0%',
              borderRadius: 5, background: 'linear-gradient(90deg, #8FBC8F, #E8B04B, #D96C4F)'
            }}></div>
            <div style={{ position: 'absolute', top: 0, bottom: 0, width: 2, background: inkColor, opacity: 0.5, left: `${clamp(t.thHalf / 0.4, 0, 1) * 100}%` }}></div>
            <div style={{ position: 'absolute', top: 0, bottom: 0, width: 2, background: inkColor, opacity: 0.5, left: `${clamp(t.thFull / 0.4, 0, 1) * 100}%` }}></div>
          </div>
        </div>
      </div>
      {micErr ? (
        <div style={{ position: 'absolute', bottom: 92, left: '50%', transform: 'translateX(-50%)', color: '#B3261E', fontSize: 13, fontWeight: 700 }}>{micErr}</div>
      ) : null}
      <audio ref={audioElRef} controls style={{
        position: 'absolute', bottom: 20, right: 20, width: 260,
        display: fileName ? 'block' : 'none', cursor: 'default'
      }}></audio>

      <a href="index.html" style={{
        position: 'absolute', top: 18, left: 18, fontSize: 13, fontWeight: 700,
        color: subColor, textDecoration: 'none', letterSpacing: '0.06em'
      }}>&lt;- Portfolio</a>

      <PanelAjustes>
        <TweakSection label="Boca"></TweakSection>
        <TweakSlider label="Sensibilidad del microfono" value={t.micGain} min={0.3} max={5} step={0.1}
          onChange={(v) => setTweak('micGain', v)}></TweakSlider>
        <TweakSlider label="Umbral semiabierta" value={t.thHalf} min={0.01} max={0.3} step={0.005}
          onChange={(v) => setTweak('thHalf', v)}></TweakSlider>
        <TweakSlider label="Umbral abierta" value={t.thFull} min={0.05} max={0.4} step={0.005}
          onChange={(v) => setTweak('thFull', v)}></TweakSlider>
        <TweakSlider label="Velocidad de cierre" value={t.release} min={0.03} max={0.4} step={0.01}
          onChange={(v) => setTweak('release', v)}></TweakSlider>
        <TweakToggle label="Parpadeo automatico" value={t.autoBlink}
          onChange={(v) => setTweak('autoBlink', v)}></TweakToggle>
        <TweakSection label="Movimiento"></TweakSection>
        <TweakSlider label="Rango de seguimiento" value={t.followRange} min={120} max={1200} step={10} unit="px"
          onChange={(v) => setTweak('followRange', v)}></TweakSlider>
        <TweakSlider label="Velocidad de seguimiento" value={t.smoothing} min={0.04} max={0.5} step={0.01}
          onChange={(v) => setTweak('smoothing', v)}></TweakSlider>
        <TweakSection label="Apariencia"></TweakSection>
        <TweakSlider label="Tamano del personaje" value={t.charSize} min={30} max={92} unit="vmin"
          onChange={(v) => setTweak('charSize', v)}></TweakSlider>
      </PanelAjustes>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App></App>);
