import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { introSeen, markIntroDone } from "./intro";

const TRACE = "M0 34 H60 L72 34 L82 10 L94 58 L106 26 L116 34 H170 L180 34 L190 22 L200 46 L210 34 H260 L272 34 L282 6 L294 60 L306 30 L316 34 H360";

// First-visit intro: an EEG trace draws across ink while a counter runs to
// 100, then the curtain lifts off the top. Shown once per browser session,
// never under reduced motion, and any click / key dismisses it immediately.
export default function Preloader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(() => !introSeen());
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (reduce) {
      markIntroDone();
      setShow(false);
      return;
    }
    if (!show) return;
    let raf = 0;
    const t0 = performance.now();
    const DURATION = 1350;
    function tick(now) {
      const p = Math.min((now - t0) / DURATION, 1);
      setPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setShow(false), 180);
    }
    raf = requestAnimationFrame(tick);
    const skip = () => setShow(false);
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("pointerdown", skip, { once: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [reduce, show]);

  return (
    <AnimatePresence onExitComplete={markIntroDone}>
      {show && (
        <motion.div
          aria-hidden="true"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="on-dark fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-ink text-paper"
        >
          <svg viewBox="0 0 360 64" className="h-16 w-[min(360px,70vw)] overflow-visible">
            <motion.path
              d={TRACE}
              fill="none"
              stroke="#FF4A1C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
          <div className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-mutedDark">
            <span>BRAIN Hub</span>
            <span className="tnum text-paper">{String(pct).padStart(3, "0")}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
