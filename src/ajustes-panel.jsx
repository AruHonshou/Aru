import React from 'react';

// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// ajustes-panel.jsx
// Panel reutilizable de ajustes y controles de formulario.
// Exporta los controles al objeto window para que las pantallas los usen sin
// dependencias adicionales.
//
// Tambien mantiene el protocolo de edicion del contenedor:
// __activate_edit_mode, __deactivate_edit_mode, __edit_mode_available,
// __edit_mode_set_keys y __edit_mode_dismissed.
//
// Los nombres Tweak* se conservan como contrato interno del panel heredado.
/* END USAGE */

const __TWEAKS_STYLE = `
  .twk-fab{position:fixed;left:18px;bottom:18px;z-index:2147483646;
    appearance:none;display:inline-flex;align-items:center;justify-content:center;gap:8px;overflow:hidden;
    border:2px solid rgba(59,43,50,.72);border-radius:999px;padding:13px 19px;
    background:
      radial-gradient(circle at 18% 20%,rgba(255,255,255,.92) 0 18%,transparent 34%),
      linear-gradient(135deg,rgba(255,244,249,.98),rgba(255,205,225,.95) 48%,rgba(213,248,239,.95));
    color:#3b2b32;-webkit-backdrop-filter:blur(18px) saturate(180%);backdrop-filter:blur(18px) saturate(180%);
    box-shadow:6px 7px 0 rgba(255,159,200,.32),0 18px 36px rgba(120,80,110,.2),0 1px 0 rgba(255,255,255,.72) inset;
    font:13px/1 ui-sans-serif,system-ui,-apple-system,sans-serif;font-weight:900;
    letter-spacing:.015em;cursor:pointer;isolation:isolate;
    transition:transform .18s cubic-bezier(.2,.8,.2,1),box-shadow .18s ease,filter .18s ease}
  .twk-fab:before{content:"";position:absolute;inset:3px;border-radius:999px;
    border:1px solid rgba(255,255,255,.58);pointer-events:none;z-index:-1}
  .twk-fab:after{content:"";position:absolute;right:13px;top:8px;width:7px;height:7px;border-radius:50%;
    background:rgba(255,255,255,.9);box-shadow:-20px 20px 0 rgba(255,255,255,.42);pointer-events:none}
  .twk-fab:hover{filter:saturate(1.12);transform:translateY(-3px) rotate(-1deg);
    box-shadow:8px 9px 0 rgba(255,159,200,.34),0 24px 42px rgba(120,80,110,.24),0 1px 0 rgba(255,255,255,.74) inset}
  .twk-fab:active{transform:translateY(1px) scale(.98);box-shadow:3px 4px 0 rgba(255,159,200,.28),0 12px 26px rgba(120,80,110,.18)}
  @media(max-width:620px){.twk-fab{left:12px;bottom:12px;padding:10px 13px;
    font-size:12px;box-shadow:4px 5px 0 rgba(255,159,200,.24),0 12px 26px rgba(120,80,110,.18),0 1px 0 rgba(255,255,255,.55) inset}}
  .twk-panel{position:fixed;left:16px;bottom:16px;z-index:2147483646;width:312px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom left;
    background:
      radial-gradient(circle at 18% 0%,rgba(255,202,224,.42),transparent 32%),
      radial-gradient(circle at 96% 12%,rgba(174,241,224,.36),transparent 34%),
      linear-gradient(180deg,rgba(255,252,248,.94),rgba(255,245,250,.9));
    color:#3b2b32;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:2px solid rgba(59,43,50,.32);border-radius:18px;
    box-shadow:6px 7px 0 rgba(155,231,209,.2),0 1px 0 rgba(255,255,255,.7) inset,0 22px 52px rgba(86,54,78,.22);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:13px 11px 12px 16px;cursor:move;user-select:none;
    background:linear-gradient(135deg,rgba(255,255,255,.72),rgba(255,226,238,.58));
    border-bottom:1px solid rgba(59,43,50,.12)}
  .twk-hd b{position:relative;font-size:13px;font-weight:900;letter-spacing:.01em;padding-left:18px}
  .twk-hd b:before{content:"";position:absolute;left:0;top:50%;width:10px;height:10px;border-radius:50%;
    background:linear-gradient(135deg,#ff8fbd,#9be7d1);box-shadow:0 0 0 4px rgba(255,159,200,.16);transform:translateY(-50%)}
  .twk-x{appearance:none;border:1px solid rgba(59,43,50,.14);background:rgba(255,255,255,.72);color:rgba(59,43,50,.62);
    width:26px;height:26px;border-radius:999px;cursor:pointer;font-size:13px;line-height:1;
    box-shadow:0 2px 8px rgba(120,80,110,.08);transition:transform .15s ease,background .15s ease,color .15s ease}
  .twk-x:hover{background:rgba(255,232,241,.9);color:#3b2b32;transform:rotate(4deg) scale(1.04)}
  .twk-body{padding:12px 14px 15px;display:flex;flex-direction:column;gap:9px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(255,159,200,.34) transparent}
  .twk-body::-webkit-scrollbar{width:7px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(255,159,200,.34);border-radius:999px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(255,125,184,.5);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:6px;padding:9px 10px;
    border:1px solid rgba(59,43,50,.1);border-radius:12px;
    background:linear-gradient(180deg,rgba(255,255,255,.68),rgba(255,250,244,.52));
    box-shadow:0 1px 0 rgba(255,255,255,.72) inset,0 5px 14px rgba(120,80,110,.06)}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(59,43,50,.76)}
  .twk-lbl>span:first-child{font-weight:750}
  .twk-val{color:rgba(59,43,50,.52);font-variant-numeric:tabular-nums;font-weight:700}

  .twk-sect{display:inline-flex;align-items:center;align-self:flex-start;gap:6px;margin:7px 0 -2px;
    padding:4px 9px;border-radius:999px;border:1px solid rgba(255,159,200,.25);
    background:rgba(255,232,241,.52);font-size:10px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(59,43,50,.6);box-shadow:0 1px 0 rgba(255,255,255,.72) inset}
  .twk-sect:first-child{margin-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:1px solid rgba(59,43,50,.12);border-radius:9px;
    background:rgba(255,255,255,.74);color:inherit;font:inherit;outline:none;
    box-shadow:0 1px 0 rgba(255,255,255,.72) inset;transition:border-color .15s ease,box-shadow .15s ease,background .15s ease}
  .twk-field:focus{border-color:rgba(255,125,184,.62);background:rgba(255,255,255,.95);
    box-shadow:0 0 0 3px rgba(255,159,200,.18)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:7px;margin:7px 0;cursor:pointer;
    border-radius:999px;background:linear-gradient(90deg,rgba(255,143,189,.68),rgba(155,231,209,.72));
    outline:none;box-shadow:0 1px 0 rgba(255,255,255,.82) inset}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:18px;height:18px;border-radius:50%;background:linear-gradient(135deg,#fff,#ffe6f1);
    border:2px solid rgba(59,43,50,.52);box-shadow:2px 3px 0 rgba(255,159,200,.24),0 2px 8px rgba(120,80,110,.18);cursor:pointer}
  .twk-slider::-moz-range-thumb{width:18px;height:18px;border-radius:50%;
    background:#fff;border:2px solid rgba(59,43,50,.52);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:pointer}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(255,232,241,.56);user-select:none;border:1px solid rgba(59,43,50,.08)}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:linear-gradient(135deg,rgba(255,255,255,.96),rgba(212,248,239,.72));
    box-shadow:0 1px 2px rgba(120,80,110,.14);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:650;min-height:22px;
    border-radius:6px;cursor:pointer;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:42px;height:24px;border:1px solid rgba(59,43,50,.16);border-radius:999px;
    background:rgba(225,216,211,.58);transition:background .18s ease,box-shadow .18s ease;cursor:pointer;padding:0;
    box-shadow:0 1px 0 rgba(255,255,255,.72) inset}
  .twk-toggle[data-on="1"]{background:linear-gradient(135deg,rgba(255,159,200,.9),rgba(155,231,209,.9));
    box-shadow:0 0 0 3px rgba(155,231,209,.18)}
  .twk-toggle i{position:absolute;top:3px;left:3px;width:16px;height:16px;border-radius:50%;
    background:linear-gradient(135deg,#fff,#fff0f6);box-shadow:0 2px 4px rgba(120,80,110,.25);transition:transform .18s cubic-bezier(.2,.8,.2,1)}
  .twk-toggle[data-on="1"] i{transform:translateX(18px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:28px;padding:0 0 0 8px;
    border:1px solid rgba(59,43,50,.12);border-radius:9px;background:rgba(255,255,255,.72)}
  .twk-num-lbl{font-weight:700;color:rgba(59,43,50,.64);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(59,43,50,.45)}

  .twk-btn{appearance:none;height:28px;padding:0 12px;border:1px solid rgba(59,43,50,.2);border-radius:999px;
    background:linear-gradient(135deg,rgba(255,143,189,.92),rgba(255,202,224,.88));color:#3b2b32;font:inherit;font-weight:850;cursor:default;
    box-shadow:2px 3px 0 rgba(255,159,200,.22);transition:transform .14s ease,filter .14s ease,background .14s ease}
  .twk-btn:hover{filter:saturate(1.08);transform:translateY(-1px)}
  .twk-btn.secondary{background:rgba(255,255,255,.66);color:inherit}
  .twk-btn.secondary:hover{background:rgba(255,232,241,.8)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:58px;height:26px;
    border:2px solid rgba(59,43,50,.26);border-radius:9px;padding:0;cursor:pointer;
    background:transparent;flex-shrink:0;box-shadow:2px 3px 0 rgba(155,231,209,.18)}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:7px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:2px solid rgba(255,255,255,.82);border-radius:10px;overflow:hidden;cursor:pointer;
    box-shadow:0 0 0 1px rgba(59,43,50,.12),0 4px 12px rgba(120,80,110,.1);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 1px rgba(59,43,50,.2),0 7px 16px rgba(120,80,110,.15)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 2px rgba(59,43,50,.72),0 0 0 5px rgba(255,159,200,.22),
    0 7px 16px rgba(120,80,110,.16)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// useAjustes
// Fuente unica de valores del panel. setTweak persiste cambios mediante el host.
function useAjustes(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Acepta setTweak('clave', valor) o setTweak({ clave: valor }) sin romper el
  // bloque JSON persistido.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null
      ? keyOrEdits : { [keyOrEdits]: val };
    setValues((prev) => ({ ...prev, ...edits }));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
    // Senal local para listeners de la misma pagina.
    window.dispatchEvent(new CustomEvent('tweakchange', { detail: edits }));
  }, []);
  return [values, setTweak];
}

// PanelAjustes
// Contenedor flotante. Registra el listener antes de anunciar disponibilidad
// para que el host pueda abrir y cerrar el panel de forma consistente.
function PanelAjustes({
  title = 'Ajustes',
  buttonLabel = '⚙ Ajustes',
  closeLabel = 'Cerrar ajustes',
  children,
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({ x: 16, y: 16 });
  const PAD = 16;

  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth, h = panel.offsetHeight;
    const maxLeft = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxLeft, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y)),
    };
    panel.style.left = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);

  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);

  React.useEffect(() => {
    const onMsg = (e) => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);
      else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
  };

  const onDragStart = (e) => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX, sy = e.clientY;
    const startLeft = r.left;
    const startBottom = window.innerHeight - r.bottom;
    const move = (ev) => {
      offsetRef.current = {
        x: startLeft + (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy),
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  if (!open) {
    return (
      <>
        <style>{__TWEAKS_STYLE}</style>
        <button type="button" className="twk-fab" onClick={() => setOpen(true)}>
          {buttonLabel}
        </button>
      </>
    );
  }
  return (
    <>
      <style>{__TWEAKS_STYLE}</style>
      <div ref={dragRef} className="twk-panel" data-omelette-chrome=""
           style={{ left: offsetRef.current.x, bottom: offsetRef.current.y }}>
        <div className="twk-hd" onMouseDown={onDragStart}>
          <b>{title}</b>
          <button className="twk-x" aria-label={closeLabel}
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={dismiss}>x</button>
        </div>
        <div className="twk-body">
          {children}
        </div>
      </div>
    </>
  );
}

// Helpers de layout

function TweakSection({ label, children }) {
  return (
    <>
      <div className="twk-sect">{label}</div>
      {children}
    </>
  );
}

function TweakRow({ label, value, children, inline = false }) {
  return (
    <div className={inline ? 'twk-row twk-row-h' : 'twk-row'}>
      <div className="twk-lbl">
        <span>{label}</span>
        {value != null && <span className="twk-val">{value}</span>}
      </div>
      {children}
    </div>
  );
}

// Controles

function TweakSlider({ label, value, min = 0, max = 100, step = 1, unit = '', onChange }) {
  return (
    <TweakRow label={label} value={`${value}${unit}`}>
      <input type="range" className="twk-slider" min={min} max={max} step={step}
             value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </TweakRow>
  );
}

function TweakToggle({ label, value, onChange }) {
  return (
    <div className="twk-row twk-row-h">
      <div className="twk-lbl"><span>{label}</span></div>
      <button type="button" className="twk-toggle" data-on={value ? '1' : '0'}
              role="switch" aria-checked={!!value}
              onClick={() => onChange(!value)}><i /></button>
    </div>
  );
}

function TweakRadio({ label, value, options, onChange }) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // El valor activo vive en una ref para que el arrastre no use cierres viejos.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Si las opciones no caben como segmentos, se usa un select para evitar saltos.
  const labelLen = (o) => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({ 2: 16, 3: 10 }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emite strings; se vuelve al tipo original cuando es posible.
    const resolve = (s) => {
      const m = options.find((o) => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return <TweakSelect label={label} value={value} options={options}
                        onChange={(s) => onChange(resolve(s))} />;
  }
  const opts = options.map((o) => (typeof o === 'object' ? o : { value: o, label: o }));
  const idx = Math.max(0, opts.findIndex((o) => o.value === value));
  const n = opts.length;

  const segAt = (clientX) => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor(((clientX - r.left - 2) / inner) * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };

  const onPointerDown = (e) => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = (ev) => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <TweakRow label={label}>
      <div ref={trackRef} role="radiogroup" onPointerDown={onPointerDown}
           className={dragging ? 'twk-seg dragging' : 'twk-seg'}>
        <div className="twk-seg-thumb"
             style={{ left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
                      width: `calc((100% - 4px) / ${n})` }} />
        {opts.map((o) => (
          <button key={o.value} type="button" role="radio" aria-checked={o.value === value}>
            {o.label}
          </button>
        ))}
      </div>
    </TweakRow>
  );
}

function TweakSelect({ label, value, options, onChange }) {
  return (
    <TweakRow label={label}>
      <select className="twk-field" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => {
          const v = typeof o === 'object' ? o.value : o;
          const l = typeof o === 'object' ? o.label : o;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
    </TweakRow>
  );
}

function TweakText({ label, value, placeholder, onChange }) {
  return (
    <TweakRow label={label}>
      <input className="twk-field" type="text" value={value} placeholder={placeholder}
             onChange={(e) => onChange(e.target.value)} />
    </TweakRow>
  );
}

function TweakNumber({ label, value, min, max, step = 1, unit = '', onChange }) {
  const clamp = (n) => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({ x: 0, val: 0 });
  const onScrubStart = (e) => {
    e.preventDefault();
    startRef.current = { x: e.clientX, val: value };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = (ev) => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return (
    <div className="twk-num">
      <span className="twk-num-lbl" onPointerDown={onScrubStart}>{label}</span>
      <input type="number" value={value} min={min} max={max} step={step}
             onChange={(e) => onChange(clamp(Number(e.target.value)))} />
      {unit && <span className="twk-num-unit">{unit}</span>}
    </div>
  );
}

// Calcula contraste para que la marca sea legible sobre cada muestra de color.
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, (c) => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}

const __TwkCheck = ({ light }) => (
  <svg viewBox="0 0 14 14" aria-hidden="true">
    <path d="M3 7.2 5.8 10 11 4.2" fill="none" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round"
          stroke={light ? 'rgba(0,0,0,.78)' : '#fff'} />
  </svg>
);

// Selector de colores. Acepta un color o una paleta y devuelve el mismo formato.
function TweakColor({ label, value, options, onChange }) {
  if (!options || !options.length) {
    return (
      <div className="twk-row twk-row-h">
        <div className="twk-lbl"><span>{label}</span></div>
        <input type="color" className="twk-swatch" value={value}
               onChange={(e) => onChange(e.target.value)} />
      </div>
    );
  }
  // El input nativo emite hex en minusculas; por eso la comparacion ignora caso.
  const key = (o) => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return (
    <TweakRow label={label}>
      <div className="twk-chips" role="radiogroup">
        {options.map((o, i) => {
          const colors = Array.isArray(o) ? o : [o];
          const [hero, ...rest] = colors;
          const sup = rest.slice(0, 4);
          const on = key(o) === cur;
          return (
            <button key={i} type="button" className="twk-chip" role="radio"
                    aria-checked={on} data-on={on ? '1' : '0'}
                    aria-label={colors.join(', ')} title={colors.join(' - ')}
                    style={{ background: hero }}
                    onClick={() => onChange(o)}>
              {sup.length > 0 && (
                <span>
                  {sup.map((c, j) => <i key={j} style={{ background: c }} />)}
                </span>
              )}
              {on && <__TwkCheck light={__twkIsLight(hero)} />}
            </button>
          );
        })}
      </div>
    </TweakRow>
  );
}

function TweakButton({ label, onClick, secondary = false }) {
  return (
    <button type="button" className={secondary ? 'twk-btn secondary' : 'twk-btn'}
            onClick={onClick}>{label}</button>
  );
}

Object.assign(window, {
  useAjustes, PanelAjustes, TweakSection, TweakRow,
  TweakSlider, TweakToggle, TweakRadio, TweakSelect,
  TweakText, TweakNumber, TweakColor, TweakButton,
});
