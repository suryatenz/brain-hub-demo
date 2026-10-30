import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useOnceInView } from "./useOnceInView";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/%+";

// Text that "decodes" into place, character by character, the first time it
// scrolls into view — a nod to signal decoding. The real text is always in the
// DOM for screen readers (sr-only); the scrambled layer is aria-hidden.
export default function ScrambleText({ text, className = "", delay = 0, duration = 900, as: Tag = "span" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const seen = useOnceInView(ref, "0px 0px -5% 0px");
  const [out, setOut] = useState(reduce ? text : text.replace(/[^\s]/g, "·"));

  useEffect(() => {
    if (reduce) {
      setOut(text);
      return;
    }
    if (!seen) return;
    let raf = 0;
    let start = 0;
    const timer = setTimeout(() => {
      function tick(now) {
        if (!start) start = now;
        const p = Math.min((now - start) / duration, 1);
        const resolved = Math.floor(p * text.length);
        let s = "";
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (/\s/.test(ch) || i < resolved) s += ch;
          else s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setOut(s);
        if (p < 1) raf = requestAnimationFrame(tick);
      }
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [seen, text, delay, duration, reduce]);

  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{out}</span>
    </Tag>
  );
}
