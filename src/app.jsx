import React from 'react';
import ReactDOM from 'react-dom/client';
import AruAvatar from './components/AruAvatar';
import LanguageToggle from './components/LanguageToggle';
import { useAudioMouthSync } from './hooks/useAudioMouthSync';
import { useAruLanguage } from './hooks/useAruLanguage';
import { createAudioEngine } from './lib/audio-engine';
import { mouthLabel } from './lib/aru-frames';
import { translate } from './i18n/aru-i18n';
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
const PORTFOLIO_PAGE = 'https://aruhonshou.github.io/AruDev/';

function micErrorMessage(error) {
  if (error?.message === 'MIC_UNSUPPORTED') return 'Este navegador no permite usar el micrÃ³fono aquÃ­.';
  if (error?.message === 'AUDIO_CONTEXT_UNSUPPORTED') return 'Este navegador no soporta AudioContext.';
  if (error?.name === 'NotAllowedError' || error?.name === 'SecurityError') {
    return 'Permiso de micrÃ³fono denegado. Revisa los permisos del navegador.';
  }
  return 'No se puede usar el micrÃ³fono ahora.';
}

function displayMouthLabel(mouth) {
  const label = mouthLabel(mouth);
  if (label === 'semiabierta') return 'Media';
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function localizedMicErrorMessage(error, language) {
  if (error?.message === 'MIC_UNSUPPORTED') return translate('index.errors.micUnsupported', language);
  if (error?.message === 'AUDIO_CONTEXT_UNSUPPORTED') return translate('index.errors.audioContextUnsupported', language);
  if (error?.name === 'NotAllowedError' || error?.name === 'SecurityError') return translate('index.errors.micDenied', language);
  return translate('index.errors.micUnavailable', language);
}

function localizedMouthLabel(mouth, language) {
  const label = mouthLabel(mouth);
  if (label === 'semiabierta') return translate('index.halfOpen', language);
  if (label === 'abierta') return translate('index.open', language);
  return translate('index.closed', language);
}

function App() {
  const [language, setLanguage] = useAruLanguage();
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
      setAudioError(localizedMicErrorMessage(error, language));
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
      setAudioError(translate('index.errors.invalidAudio', language));
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
  const micStatus = micOn ? translate('index.active', language) : translate('index.waiting', language);
  const audioStatus = audioIsActive
    ? translate('index.playing', language)
    : fileLoaded
      ? translate('index.loaded', language)
      : translate('index.noFile', language);
  const overallStatus = micOn
    ? translate('index.listening', language)
    : audioIsActive
      ? translate('index.playing', language)
      : fileLoaded
        ? translate('index.audioLoaded', language)
        : translate('index.ready', language);
  const mouthStatus = localizedMouthLabel(mouth, language);
  const panelTitle = micOn
    ? translate('index.panelTitle.listening', language)
    : audioIsActive
      ? translate('index.panelTitle.playing', language)
      : translate('index.panelTitle.ready', language);

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
            <p className="brand-subtitle">{translate('index.brandSubtitle', language)}</p>
          </div>
        </div>
        <nav className="topbar-actions" aria-label={translate('index.navLabel', language)}>
          <LanguageToggle language={language} onChange={setLanguage} />
          <a
            className="nav-link nav-link--primary"
            href={locked ? undefined : CHAT_PAGE}
            aria-disabled={locked}
            aria-label={translate('index.talkWithAru', language)}
          >
            {translate('index.talkWithAru', language)}
          </a>
          <a
            className="nav-link nav-link--portfolio"
            href={PORTFOLIO_PAGE}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={translate('index.viewPortfolio', language)}
          >
            {translate('index.viewPortfolio', language)}
          </a>
        </nav>
      </header>

      <section className="simple-main" aria-label={translate('index.mainAria', language)}>
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
            language={language}
          />
        </div>

        <aside className="simple-panel" data-audio-state={panelState} aria-label={translate('index.panelAria', language)}>
          <div className="panel-heading">
            <span className="panel-badge">{translate('index.audioMode', language)}</span>
            <h2 className="panel-title">{panelTitle}</h2>
            <p className="panel-copy">{translate('index.panelCopy', language)}</p>
          </div>

          <div className="status-grid" aria-live="polite">
            <div className="status-card status-card--mic" data-active={micOn ? 'true' : 'false'}>
              <span className="status-label">{translate('index.microphone', language)}</span>
              <span className="status-value">{micStatus}</span>
            </div>
            <div className="status-card status-card--audio" data-active={fileLoaded ? 'true' : 'false'} title={fileName || translate('index.noFile', language)}>
              <span className="status-label">{translate('index.audio', language)}</span>
              <span className="status-value">{audioStatus}</span>
            </div>
            <div className="status-card status-card--mouth" data-active={listening ? 'true' : 'false'}>
              <span className="status-label">{translate('index.mouth', language)}</span>
              <span className="status-value">{mouthStatus}</span>
            </div>
            <div className="status-card status-card--mood" data-active={listening || fileLoaded ? 'true' : 'false'}>
              <span className="status-label">{translate('index.status', language)}</span>
              <span className="status-value">{overallStatus}</span>
            </div>
          </div>

          <div className="voice-controls">
            <div className="control-row">
              <button type="button" className="primary-button" onClick={startMic} disabled={micOn || locked}
                aria-label={translate('index.startMicAria', language)}>
                <span className="button-icon button-icon--mic" aria-hidden="true" />
                {translate('index.startMic', language)}
              </button>
              <button type="button" className="soft-button" onClick={stopMic} disabled={!micOn}
                aria-label={translate('index.stopMicAria', language)}>
                <span className="button-icon button-icon--stop" aria-hidden="true" />
                {translate('index.stopMic', language)}
              </button>
            </div>

            <label className="file-button">
              <span className="button-icon button-icon--audio" aria-hidden="true" />
              {translate('index.loadAudio', language)}
              <input className="file-input" type="file" accept="audio/*" onChange={onFilePick} />
            </label>

            <div className="audio-meter" aria-label={`${translate('index.mouth', language)} ${mouthStatus}`}>
              <div className="meter-header">
                <span>{translate('index.volume', language)}</span>
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
        <PanelAjustes
          title={translate('index.settingsTitle', language)}
          buttonLabel={`⚙ ${translate('index.settingsButton', language)}`}
          closeLabel={translate('index.closeSettings', language)}
        >
          <TweakSection label={translate('index.settings.mouth', language)} />
          <TweakSlider label={translate('index.settings.micSensitivity', language)} value={t.micGain} min={0.3} max={5} step={0.1}
            onChange={(value) => setTweak('micGain', value)} />
          <TweakSlider label={translate('index.settings.halfThreshold', language)} value={t.thHalf} min={0.01} max={0.3} step={0.005}
            onChange={(value) => setTweak('thHalf', value)} />
          <TweakSlider label={translate('index.settings.fullThreshold', language)} value={t.thFull} min={0.05} max={0.4} step={0.005}
            onChange={(value) => setTweak('thFull', value)} />
          <TweakSlider label={translate('index.settings.releaseSpeed', language)} value={t.release} min={0.03} max={0.4} step={0.01}
            onChange={(value) => setTweak('release', value)} />
          <TweakToggle label={translate('index.settings.autoBlink', language)} value={t.autoBlink}
            onChange={(value) => setTweak('autoBlink', value)} />
          <TweakSection label={translate('index.settings.movement', language)} />
          <TweakSlider label={translate('index.settings.followRange', language)} value={t.followRange} min={120} max={1200} step={10} unit="px"
            onChange={(value) => setTweak('followRange', value)} />
          <TweakSlider label={translate('index.settings.followSpeed', language)} value={t.smoothing} min={0.04} max={0.5} step={0.01}
            onChange={(value) => setTweak('smoothing', value)} />
          <TweakSection label={translate('index.settings.appearance', language)} />
          <TweakSlider label={translate('index.settings.characterSize', language)} value={t.charSize} min={30} max={92} unit="vmin"
            onChange={(value) => setTweak('charSize', value)} />
          <TweakSection label={translate('index.settings.animeBg', language)} />
          <TweakColor label={translate('index.settings.bgBase', language)} value={t.bgColor} options={BG_OPTIONS}
            onChange={(value) => setTweak('bgColor', value)} />
          <TweakColor label={translate('index.settings.bgSoft', language)} value={t.bgSoftColor}
            onChange={(value) => setTweak('bgSoftColor', value)} />
          <TweakColor label={translate('index.settings.bgAccent', language)} value={t.bgAccentColor}
            onChange={(value) => setTweak('bgAccentColor', value)} />
          <TweakColor label={translate('index.settings.bgDecor', language)} value={t.bgDecorColor}
            onChange={(value) => setTweak('bgDecorColor', value)} />
          <TweakToggle label={translate('index.settings.bgDecorations', language)} value={t.bgDecorEnabled}
            onChange={(value) => setTweak('bgDecorEnabled', value)} />
          <TweakSlider label={translate('index.settings.ambience', language)} value={t.bgMotion} min={0} max={1} step={0.05}
            onChange={(value) => setTweak('bgMotion', value)} />
          <TweakSlider label={translate('index.settings.density', language)} value={t.bgDensity} min={0.25} max={1} step={0.05}
            onChange={(value) => setTweak('bgDensity', value)} />
          <TweakSection label={translate('index.settings.debug', language)} />
          <TweakToggle label={translate('index.settings.showGrid', language)} value={t.showDebug}
            onChange={(value) => setTweak('showDebug', value)} />
        </PanelAjustes>
      ) : null}
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
