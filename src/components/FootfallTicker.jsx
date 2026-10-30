import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sections = [
  { label: "Research", base: 42 },
  { label: "Publications", base: 27 },
  { label: "Events", base: 19 },
  { label: "Membership", base: 11 },
];

function useLiveCount(base) {
  const [value, setValue] = useState(base);
  useEffect(() => {
    const id = setInterval(() => {
      setValue((v) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const next = v + delta;
        return next < 3 ? 3 : next;
      });
    }, 2200 + Math.random() * 1500);
    return () => clearInterval(id);
  }, []);
  return value;
}

function Counter({ label, base }) {
  const value = useLiveCount(base);
  return (
    <div className="flex flex-col gap-3 border border-white/10 bg-ink/50 p-4 backdrop-blur-sm">
      <span className="mono-label flex items-center gap-2 text-slate-mutedDark">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-green" />
        </span>
        {label}
      </span>
      <motion.span
        key={value}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="tnum font-display text-5xl leading-none text-paper"
      >
        {value}
      </motion.span>
    </div>
  );
}

export default function FootfallTicker() {
  return (
    <div>
      <div className="mono-label mb-3 flex items-center justify-between text-slate-mutedDark">
        <span>Live footfall</span>
        <span>who's browsing now</span>
      </div>
      <div className="grid grid-cols-2 gap-px">
        {sections.map((s) => (
          <Counter key={s.label} {...s} />
        ))}
      </div>
      <p className="mono-label mt-3 normal-case tracking-normal text-slate-mutedDark">
        Illustrative demo data — reuses site analytics once wired to production.
      </p>
    </div>
  );
}
