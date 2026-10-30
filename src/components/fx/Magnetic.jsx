import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

// Pulls its child a little toward the pointer while it hovers nearby, then
// springs back. Fine pointers only; a no-op under reduced motion.
export default function Magnetic({ children, strength = 0.32, className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  if (reduce) return <span className={`inline-block ${className}`}>{children}</span>;

  function onMove(e) {
    if (e.pointerType !== "mouse") return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.span>
  );
}
