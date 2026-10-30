import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Animates a numeric value counting up from 0 the first time it scrolls into
// view. `value` accepts a plain number; `prefix`/`suffix` wrap the digits
// (e.g. prefix="$" suffix="M+") so callers don't need to pre-format strings
// that this component can't animate numerically.
//
// Uses a plain IntersectionObserver rather than framer-motion's useInView:
// when several instances mount at once in the same row (e.g. a stat strip),
// useInView has been observed to silently never flip `true` for some of
// them, leaving those counters stuck at 0 forever.
export default function AnimatedCounter({ value, prefix = "", suffix = "", decimals = 0, duration = 1.2, className = "" }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      // Vertical-only margin: a symmetric "-60px" on all sides also shrinks
      // left/right, which silently excludes elements sitting near the edge
      // of a narrow (mobile) viewport — they'd never be reported as visible.
      { rootMargin: "-60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const [display, setDisplay] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    // With "reduce motion" on, skip the count-up and show the real number.
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    let raf;
    const start = performance.now();
    const from = 0;
    const to = value;
    function tick(now) {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduceMotion]);

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </motion.span>
  );
}
