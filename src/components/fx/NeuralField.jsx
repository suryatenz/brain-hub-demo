import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useIsOnScreen } from "./useOnceInView";

const DEFAULT_COLORS = ["#FF4A1C", "#2EE6C5", "#FFB627"];

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

// A living neural network drawn on <canvas>: nodes drift, connect to near
// neighbours, "fire" signals along the connections, and are pushed apart /
// wired to the cursor. The three colours are the three networks this hub
// unites (BRAIN Center, AccelNet, MDRN). Purely decorative (aria-hidden).
//
// Performance: capped devicePixelRatio, node count scaled to area, an O(n^2)
// neighbour pass over <= ~110 nodes, and the loop is paused whenever the
// canvas is off-screen or the tab is hidden. With reduced motion it draws a
// single still frame and never starts an animation loop.
export default function NeuralField({ className = "", colors = DEFAULT_COLORS, density = 11000, linkDistance = 170 }) {
  const canvasRef = useRef(null);
  const onScreen = useIsOnScreen(canvasRef);
  const reduce = useReducedMotion();
  const runningRef = useRef(false);
  const startRef = useRef(() => {});
  const stopRef = useRef(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const palette = colors.map(hexToRgb);
    let w = 0;
    let h = 0;
    let raf = 0;
    let nodes = [];
    const pulses = [];
    const mouse = { x: -9999, y: -9999, on: false };

    function makeNode() {
      const ci = Math.floor(Math.random() * palette.length);
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: 1.1 + Math.random() * 1.7,
        c: palette[ci],
        flash: 0,
      };
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(120, Math.max(34, (w * h) / density)));
      nodes = Array.from({ length: n }, makeNode);
      pulses.length = 0;
      if (reduce) draw(0);
    }

    function spawnPulse() {
      const a = nodes[Math.floor(Math.random() * nodes.length)];
      if (!a) return;
      let best = null;
      let bestD = linkDistance * linkDistance;
      for (const b of nodes) {
        if (b === a) continue;
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < bestD && Math.random() < 0.35) {
          bestD = d2;
          best = b;
        }
      }
      if (best) pulses.push({ a, b: best, t: 0, speed: 0.012 + Math.random() * 0.014 });
    }

    function draw(step) {
      ctx.clearRect(0, 0, w, h);
      const L2 = linkDistance * linkDistance;

      if (step) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -10 || n.x > w + 10) n.vx *= -1;
          if (n.y < -10 || n.y > h + 10) n.vy *= -1;
          if (mouse.on) {
            const dx = n.x - mouse.x;
            const dy = n.y - mouse.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 150 * 150) {
              const d = Math.sqrt(d2) || 1;
              const f = (1 - d / 150) * 0.7;
              n.x += (dx / d) * f;
              n.y += (dy / d) * f;
            }
          }
          if (n.flash > 0) n.flash = Math.max(0, n.flash - 0.03);
        }
      }

      // Connections between near neighbours.
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < L2) {
            const alpha = (1 - Math.sqrt(d2) / linkDistance) * 0.55;
            ctx.strokeStyle = `rgba(${a.c[0]},${a.c[1]},${a.c[2]},${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Wire the cursor into the network.
      if (mouse.on) {
        for (const n of nodes) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 190 * 190) {
            const alpha = (1 - Math.sqrt(d2) / 190) * 0.7;
            ctx.strokeStyle = `rgba(255,74,28,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        }
      }

      // Nodes.
      for (const n of nodes) {
        const r = n.r + n.flash * 3.2;
        ctx.fillStyle = `rgba(${n.c[0]},${n.c[1]},${n.c[2]},${0.85 + n.flash * 0.15})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Signals travelling along connections.
      if (step) {
        if (pulses.length < 7 && Math.random() < 0.05) spawnPulse();
        for (let k = pulses.length - 1; k >= 0; k--) {
          const p = pulses[k];
          p.t += p.speed;
          if (p.t >= 1) {
            p.b.flash = 1;
            pulses.splice(k, 1);
            continue;
          }
          const x = p.a.x + (p.b.x - p.a.x) * p.t;
          const y = p.a.y + (p.b.y - p.a.y) * p.t;
          ctx.save();
          ctx.shadowColor = `rgb(${p.a.c[0]},${p.a.c[1]},${p.a.c[2]})`;
          ctx.shadowBlur = 14;
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(x, y, 2.1, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
    }

    function loop() {
      draw(1);
      raf = requestAnimationFrame(loop);
    }
    startRef.current = () => {
      if (runningRef.current || reduce) return;
      runningRef.current = true;
      raf = requestAnimationFrame(loop);
    };
    stopRef.current = () => {
      runningRef.current = false;
      cancelAnimationFrame(raf);
    };

    function onMove(e) {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      mouse.on = x >= 0 && y >= 0 && x <= r.width && y <= r.height;
      mouse.x = x;
      mouse.y = y;
    }
    function onVisibility() {
      if (document.hidden) stopRef.current();
      else if (canvas.dataset.on === "1") startRef.current();
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stopRef.current();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, density, linkDistance]);

  // Run only while on-screen.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.dataset.on = onScreen ? "1" : "0";
    if (onScreen && !document.hidden) startRef.current();
    else stopRef.current();
  }, [onScreen]);

  return <canvas ref={canvasRef} aria-hidden="true" role="presentation" className={`block h-full w-full ${className}`} />;
}
