import { motion, useReducedMotion } from "framer-motion";

const out = [0.22, 1, 0.36, 1];
const inOut = [0.76, 0, 0.24, 1];

// Every page is wrapped in this. On navigation an ink curtain sweeps up from
// the bottom to cover the old page (exit), the route swaps underneath, then the
// curtain retreats upward to reveal the new page (enter) while its content
// rises into place. Under reduced motion the curtain is not rendered at all
// and the page just cross-fades.
export default function PageTransition({ children }) {
  const reduce = useReducedMotion();
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 22 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: out, delay: reduce ? 0 : 0.28 } }}
        exit={{ opacity: 0, transition: { duration: 0.25 } }}
      >
        {children}
      </motion.div>
      {!reduce && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[75] bg-ink"
          initial={{ scaleY: 1, originY: 0 }}
          animate={{ scaleY: 0, originY: 0, transition: { duration: 0.65, ease: inOut, delay: 0.05 } }}
          exit={{ scaleY: 1, originY: 1, transition: { duration: 0.5, ease: inOut } }}
        />
      )}
    </>
  );
}
