import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useIsOnScreen } from "./useOnceInView";

// A scrolling multi-channel EEG-style waveform on <canvas>. The signal is
// SIMULATED (layered sine waves with occasional bursts) — a visual motif for
// the lab's work, not measured data — and the surrounding UI labels it as
// such. Paused off-screen; a single still frame under reduced motion.
export default function EEGTrace({ className = "", channels = 4, color = "#FF4A1C", amplitude = 1 }) {
  const ref = useRef(null);
  const onScreen = useIsOnScreen(ref);
  const reduce = useReducedMotion();
  const controls = useRef({ start() {}, stop() {} });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;

    function resize() {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(0);
    }

    function draw(time) {
      ctx.clearRect(0, 0, w, h);
      const band = h / channels;
      for (let c = 0; c < channels; c++) {
        const y0 = band * (c + 0.5);
        ctx.beginPath();
        for (let x = 0; x <= w; x += 2) {
          const p = x * 0.011 + time * (0.85 + c * 0.22);
          let y = Math.sin(p * 1.3 + c) * 0.5 + Math.sin(p * 3.1 + time * 0.7) * 0.26 + Math.sin(p * 7.3 + c * 2) * 0.12;
          // Slow "burst" envelope so the trace breathes like real activity.
          const env = Math.pow(Math.max(0, Math.sin(x * 0.0042 - time * (0.7 + c * 0.13) + c * 1.7)), 6) * 1.7;
          y *= 0.3 + env;
          const py = y0 + y * band * 0.42 * amplitude;
          if (x === 0) ctx.moveTo(x, py);
          else ctx.lineTo(x, py);
        }
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.9 - c * 0.14;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      // Fade both ends so the trace dissolves into the background.
      ctx.globalCompositeOperation = "destination-in";
      const g = ctx.createLinearGradient(0, 0, w, 0);
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(0.12, "rgba(0,0,0,1)");
      g.addColorStop(0.88, "rgba(0,0,0,1)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
    }

    function loop(t) {
      draw(t / 1000);
      raf = requestAnimationFrame(loop);
    }
    controls.current = {
      start() {
        if (running || reduce) return;
        running = true;
        raf = requestAnimationFrame(loop);
      },
      stop() {
        running = false;
        cancelAnimationFrame(raf);
      },
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => {
      controls.current.stop();
      ro.disconnect();
    };
  }, [channels, color, amplitude, reduce]);

  useEffect(() => {
    if (onScreen && !document.hidden) controls.current.start();
    else controls.current.stop();
  }, [onScreen]);

  return <canvas ref={ref} aria-hidden="true" role="presentation" className={`block h-full w-full ${className}`} />;
}
