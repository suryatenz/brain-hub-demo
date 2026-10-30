import { motion, useScroll, useSpring } from "framer-motion";

// A hairline reading-progress bar pinned to the top of the viewport.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] bg-signal"
    />
  );
}
