import React from 'react';
import { motion } from 'framer-motion';
import charConfig from './character-config';

const { useEffect, useMemo, useRef, useState } = React;
const { rows: ROWS, cols: COLS } = charConfig;
const OPEN_SRC = (r, c) => charConfig.src(charConfig.sheets.eyesOpen.close, r, c);
const BLINK_SRC = (r, c) => charConfig.src(charConfig.sheets.eyesClosed.close, r, c);

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export default function AruAvatar({ size = 'min(45vw, 620px)', className = '' }) {
  const [cell, setCell] = useState({ r: 2, c: 2 });
  const [blink, setBlink] = useState(false);
  const [pressed, setPressed] = useState(false);
  const avatarRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function onMove(event) {
      const element = avatarRef.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * 0.44;
      const range = Math.max(180, rect.width * 0.55);
      target.current.x = clamp((event.clientX - centerX) / range, -1, 1);
      target.current.y = clamp((event.clientY - centerY) / range, -1, 1);
    }

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerdown', onMove);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onMove);
    };
  }, []);

  useEffect(() => {
    let raf;
    let last = { r: 2, c: 2 };
    function tick() {
      current.current.x += (target.current.x - current.current.x) * 0.22;
      current.current.y += (target.current.y - current.current.y) * 0.22;
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

  useEffect(() => {
    let alive = true;
    let timer;
    const random = (min, max) => min + Math.random() * (max - min);
    function blinkOnce(duration, next) {
      setBlink(true);
      timer = setTimeout(() => {
        if (!alive) return;
        setBlink(false);
        timer = setTimeout(next, random(120, 220));
      }, duration);
    }
    function schedule() {
      if (!alive) return;
      timer = setTimeout(() => blinkOnce(random(85, 150), schedule), random(1800, 5200));
    }
    schedule();
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, []);

  const frames = useMemo(() => {
    const all = [];
    for (let r = 0; r < ROWS; r += 1) {
      for (let c = 0; c < COLS; c += 1) {
        all.push({ r, c });
      }
    }
    return all;
  }, []);

  return (
    <motion.div
      ref={avatarRef}
      className={`aru-avatar bob ${className}`}
      style={{ '--avatar-size': size }}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      animate={{ scale: pressed ? 0.965 : 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
    >
      {frames.map(({ r, c }) => (
        <img
          key={`${r}-${c}`}
          src={OPEN_SRC(r, c)}
          alt=""
          draggable="false"
          style={{ opacity: r === cell.r && c === cell.c ? 1 : 0 }}
        />
      ))}
      {blink ? <img src={BLINK_SRC(cell.r, cell.c)} alt="" draggable="false" className="avatar-blink" /> : null}
    </motion.div>
  );
}
