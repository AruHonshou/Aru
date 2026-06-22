import React from 'react';
import ReactDOM from 'react-dom/client';
import AruAvatar from './components/AruAvatar';
import { useAudioMouthSync } from './hooks/useAudioMouthSync';
import { createAudioEngine } from './lib/audio-engine';
import { mouthLabel } from './lib/aru-frames';
import './styles/aru-pages.css';

const {
  useAjustes,
  PanelAjustes,
  TweakSection,
  TweakSlider,
  TweakColor,
  TweakToggle,
} = window;

const SIMPLE_DEFAULTS = /*EDITMODE-BEGIN*/{
  "followRange": 340,
  "smoothing": 0.3,
  "charSize": 78,
  "bgColor": "#FFEAD3",
  "bgSoftColor": "#FFE8F1",
  "bgAccentColor": "#FF9FC8",
  "bgDecorColor": "#9BE7D1",
  "bgDecorEnabled": true,
  "bgMotion": 0.7,
  "bgDensity": 0.75,
  "showDebug": false,
  "micGain": 1.6,
  "thHalf": 0.07,
  "thFull": 0.2,
  "release": 0.12,
  "autoBlink": true
}/*EDITMODE-END*/;

const BG_OPTIONS = ['#FFEAD3', '#FFF7EC', '#EAF6F0', '#FDE7EF', '#EAF4FF'];
const CHAT_PAGE = `${import.meta.env.BASE_URL}guia.html`;

function micErrorMessage(error) {
  if (error?.message === 'MIC_UNSUPPORTED') return 'Este navegador no permite usar el micrófono aquí.';
  if (error?.message === 'AUDIO_CONTEXT_UNSUPPORTED') return 'Este navegador no soporta AudioContext.';
  if (error?.name === 'NotAllowedError' || error?.name === 'SecurityError') {
    return 'Permiso de micrófono denegado. Revisa los permisos del navegador.';
  }
  return 'No se puede usar el micrófono ahora.';
}

function displayMouthLabel(mouth) {
  const label = mouthLabel(mouth);
  if (label === 'semiabierta') return 'Media';
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function App() {
  const [t, setTweak] = useAjustes(SIMPLE_DEFAULTS);
  const [micOn, setMicOn] = React.useState(false);
  const [fileName, setFileName] = React.useState('');
  const [audioError, setAudioError] = React.useState('');
  const [mood, setMood] = React.useState('normal');
  const audioElRef = React.useRef(null);
  const fileUrlRef = React.useRef('');
  const engine = React.useMemo(() => createAudioEngine(), []);
  const getLevel = React.useCallback(() => engine.level(), [engine]);
  const { level, mouth } = useAudioMouthSync({
    getLevel,
    enabled: true,
    gain: t.micGain,
    halfThreshold: t.thHalf,
    fullThreshold: t.thFull,
    release: t.release,
  });

  React.useEffect(() => () => {
    engine.destroy();
    if (fileUrlRef.current) URL.revokeObjectURL(fileUrlRef.current);
  }, [engine]);

  async function startMic() {
    setAudioError('');
    try {
      await engine.startMic();
      setMicOn(true);
    } catch (error) {
      setMicOn(false);
      setAudioError(micErrorMessage(error));
    }
  }

  function stopMic() {
    engine.stopMic();
    setMicOn(false);
  }

  async function onFilePick(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setAudioError('');
    if (!file.type.startsWith('audio/')) {
      setFileName('');
      setAudioError('Archivo inválido. Elige un archivo de audio.');
      return;
    }

    const element = audioElRef.current;
    if (!element) return;

    try {
      engine.attachAudioElement(element);
      await engine.resume();
      if (fileUrlRef.current) URL.revokeObjectURL(fileUrlRef.current);
      const url = URL.createObjectURL(file);
      fileUrlRef.current = url;
      element.src = url;
      setFileName(file.name);
      await element.play();
    } catch (error) {
      // Autoplay may be blocked; the native audio controls remain available.
    }
  }

  const listening = micOn || level > 0.04;
  const locked = mood === 'locked';
  const fileLoaded = Boolean(fileName);
  const audioIsActive = fileLoaded && !micOn && level > 0.04;
  const panelState = micOn ? 'listening' : audioIsActive ? 'playing' : fileLoaded ? 'loaded' : 'idle';
  const micStatus = micOn ? 'Activo' : 'En espera';
  const audioStatus = audioIsActive ? 'Reproduciendo' : fileLoaded ? 'Cargado' : 'Sin archivo';
  const overallStatus = micOn ? 'Escuchando' : audioIsActive ? 'Reproduciendo' : fileLoaded ? 'Audio cargado' : 'Lista';
  const mouthStatus = displayMouthLabel(mouth);

  return (
    <main
      className="page simple-page"
      data-decor={t.bgDecorEnabled ? 'on' : 'off'}
      data-audio-state={panelState}
      style={{
        '--page-bg': t.bgColor,
        '--page-bg-soft': t.bgSoftColor,
        '--page-accent': t.bgAccentColor,
        '--page-decor': t.bgDecorColor,
        '--decor-motion': t.bgMotion,
        '--decor-density': t.bgDensity,
        '--decor-speed': `${18 - (t.bgMotion * 10)}s`,
        '--decor-speed-slow': `${24 - (t.bgMotion * 12)}s`,
      }}
    >
      <div className="anime-bg" aria-hidden="true">
        <div className="anime-bg__blob anime-bg__blob--pink" />
        <div className="anime-bg__blob anime-bg__blob--mint" />
        <div className="anime-bg__cloud anime-bg__cloud--one" />
        <div className="anime-bg__cloud anime-bg__cloud--two" />
        <div className="anime-bg__sticker anime-bg__sticker--star" />
        <div className="anime-bg__sticker anime-bg__sticker--flower" />
        <div className="anime-bg__sparkle anime-bg__sparkle--one" />
        <div className="anime-bg__sparkle anime-bg__sparkle--two" />
        <div className="anime-bg__sparkle anime-bg__sparkle--three" />
        <div className="anime-bg__bokeh anime-bg__bokeh--one" />
        <div className="anime-bg__bokeh anime-bg__bokeh--two" />
        <div className="anime-bg__bokeh anime-bg__bokeh--three" />
        <div className="anime-bg__petal anime-bg__petal--one" />
        <div className="anime-bg__petal anime-bg__petal--two" />
        <div className="anime-bg__petal anime-bg__petal--three" />
      </div>
      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true">A</div>
          <div>
            <h1 className="brand-title">Aru</h1>
            <p className="brand-subtitle">Modo avatar</p>
          </div>
        </div>
        <a className="nav-link nav-link--primary" href={locked ? undefined : CHAT_PAGE} aria-disabled={locked}>
          💬 Conversar con Aru ✨
        </a>
      </header>

      <section className="simple-main" aria-label="Avatar y controles de Aru">
        <div className="avatar-stage">
          <AruAvatar
            mode="simple"
            className="simple-avatar"
            enableAudioMouthSync
            audioLevel={level}
            mouth={mouth}
            charSize={t.charSize}
            followRange={t.followRange}
            smoothing={t.smoothing}
            showDebug={t.showDebug}
            moodEnabled
            autoBlink={t.autoBlink}
            onMoodChange={setMood}
          />
        </div>

        <aside className="simple-panel" data-audio-state={panelState} aria-label="Controles de voz de Aru">
          <div className="panel-heading">
            <span className="panel-badge">Modo audio</span>
            <h2 className="panel-title">Aru está {micOn ? 'escuchando' : audioIsActive ? 'reproduciendo' : 'lista'}</h2>
            <p className="panel-copy">Tu compañera chibi reacciona a voz, audio y movimiento.</p>
          </div>

          <div className="status-grid" aria-live="polite">
            <div className="status-card status-card--mic" data-active={micOn ? 'true' : 'false'}>
              <span className="status-label">Micrófono</span>
              <span className="status-value">{micStatus}</span>
            </div>
            <div className="status-card status-card--audio" data-active={fileLoaded ? 'true' : 'false'} title={fileName || 'Sin archivo'}>
              <span className="status-label">Audio</span>
              <span className="status-value">{audioStatus}</span>
            </div>
            <div className="status-card status-card--mouth" data-active={listening ? 'true' : 'false'}>
              <span className="status-label">Boca</span>
              <span className="status-value">{mouthStatus}</span>
            </div>
            <div className="status-card status-card--mood" data-active={listening || fileLoaded ? 'true' : 'false'}>
              <span className="status-label">Estado</span>
              <span className="status-value">{overallStatus}</span>
            </div>
          </div>

          <div className="voice-controls">
            <div className="control-row">
              <button type="button" className="primary-button" onClick={startMic} disabled={micOn || locked}
                aria-label="Iniciar micrófono de Aru">
                <span className="button-icon button-icon--mic" aria-hidden="true" />
                Iniciar micrófono
              </button>
              <button type="button" className="soft-button" onClick={stopMic} disabled={!micOn}
                aria-label="Detener micrófono de Aru">
                <span className="button-icon button-icon--stop" aria-hidden="true" />
                Detener micrófono
              </button>
            </div>

            <label className="file-button">
              <span className="button-icon button-icon--audio" aria-hidden="true" />
              Cargar archivo de audio
              <input className="file-input" type="file" accept="audio/*" onChange={onFilePick} />
            </label>

            <div className="audio-meter" aria-label={`Boca ${mouthStatus}`}>
              <div className="meter-header">
                <span>Volumen</span>
                <span>{mouthStatus}</span>
              </div>
              <div className="meter-track">
                <div className="meter-fill" style={{ '--meter-level': level }} />
              </div>
            </div>

            <audio
              ref={audioElRef}
              className="audio-player"
              controls={Boolean(fileName)}
              hidden={!fileName}
              onPlay={() => engine.resume()}
            />
          </div>

          {audioError ? <p className="error-note" role="alert">{audioError}</p> : null}
        </aside>
      </section>

      {!locked ? (
        <PanelAjustes title="Ajustes de Aru">
          <TweakSection label="Boca" />
          <TweakSlider label="Sensibilidad del micrófono" value={t.micGain} min={0.3} max={5} step={0.1}
            onChange={(value) => setTweak('micGain', value)} />
          <TweakSlider label="Umbral semiabierta" value={t.thHalf} min={0.01} max={0.3} step={0.005}
            onChange={(value) => setTweak('thHalf', value)} />
          <TweakSlider label="Umbral abierta" value={t.thFull} min={0.05} max={0.4} step={0.005}
            onChange={(value) => setTweak('thFull', value)} />
          <TweakSlider label="Velocidad de cierre" value={t.release} min={0.03} max={0.4} step={0.01}
            onChange={(value) => setTweak('release', value)} />
          <TweakToggle label="Parpadeo automático" value={t.autoBlink}
            onChange={(value) => setTweak('autoBlink', value)} />
          <TweakSection label="Movimiento" />
          <TweakSlider label="Rango de seguimiento" value={t.followRange} min={120} max={1200} step={10} unit="px"
            onChange={(value) => setTweak('followRange', value)} />
          <TweakSlider label="Velocidad de seguimiento" value={t.smoothing} min={0.04} max={0.5} step={0.01}
            onChange={(value) => setTweak('smoothing', value)} />
          <TweakSection label="Apariencia" />
          <TweakSlider label="Tamaño del personaje" value={t.charSize} min={30} max={92} unit="vmin"
            onChange={(value) => setTweak('charSize', value)} />
          <TweakSection label="Fondo anime" />
          <TweakColor label="Color base del fondo" value={t.bgColor} options={BG_OPTIONS}
            onChange={(value) => setTweak('bgColor', value)} />
          <TweakColor label="Color secundario suave" value={t.bgSoftColor}
            onChange={(value) => setTweak('bgSoftColor', value)} />
          <TweakColor label="Color acento/decoraciones" value={t.bgAccentColor}
            onChange={(value) => setTweak('bgAccentColor', value)} />
          <TweakColor label="Color brillos/menta" value={t.bgDecorColor}
            onChange={(value) => setTweak('bgDecorColor', value)} />
          <TweakToggle label="Decoraciones del fondo" value={t.bgDecorEnabled}
            onChange={(value) => setTweak('bgDecorEnabled', value)} />
          <TweakSlider label="Intensidad del ambiente" value={t.bgMotion} min={0} max={1} step={0.05}
            onChange={(value) => setTweak('bgMotion', value)} />
          <TweakSlider label="Cantidad de decoraciones" value={t.bgDensity} min={0.25} max={1} step={0.05}
            onChange={(value) => setTweak('bgDensity', value)} />
          <TweakSection label="Depuración" />
          <TweakToggle label="Mostrar cuadrícula" value={t.showDebug}
            onChange={(value) => setTweak('showDebug', value)} />
        </PanelAjustes>
      ) : null}
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
