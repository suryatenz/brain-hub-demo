import { useEffect } from "react";

// One global pointer listener that feeds --mx / --my (pointer position inside
// the element) to whichever [data-spot] element is under the cursor. The CSS
// in index.css paints a soft signal-coloured radial highlight from those
// variables. One listener for the whole app instead of one per card.
export default function SpotlightTracker() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    function onMove(e) {
      const el = e.target instanceof Element ? e.target.closest("[data-spot]") : null;
      if (!el) return;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    }
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
