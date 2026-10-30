import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

function Word({ children, progress, range, from, to }) {
  const color = useTransform(progress, range, [from, to]);
  return (
    <motion.span style={{ color }} className="mr-[0.26em] inline-block">
      {children}
    </motion.span>
  );
}

// A paragraph whose words "light up" one by one as it scrolls through the
// viewport. `from` is the resting tone — it is deliberately NOT a faded
// opacity: the dim state is a mid-grey that still clears 4.5:1 on ink, so the
// text stays fully readable at every scroll position. Under reduced motion it
// simply renders lit.
export default function ScrollWords({ text, className = "", from = "#8B887F", to = "#F2EFE8" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.88", "end 0.42"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className} style={reduce ? { color: to } : undefined}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = Math.min(1, start + 1.6 / words.length);
        return reduce ? (
          <span key={i} className="mr-[0.26em] inline-block">
            {w}
          </span>
        ) : (
          <Word key={i} progress={scrollYProgress} range={[start, end]} from={from} to={to}>
            {w}
          </Word>
        );
      })}
    </p>
  );
}
