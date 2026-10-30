import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { students } from "../data/mockData";

// A handful of real students with the most complete directory info (mentor +
// program + institution), rotated through automatically. No individual
// student photos exist in the source data, so this is initials-based rather
// than photographic — an honest substitute, not a fake headshot.
const featured = students.filter((s) => s.mentor || s.details.includes("Mentor")).slice(0, 8);

function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("");
}

const ctrl =
  "flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-colors hover:bg-white/10";

export default function StudentSpotlight() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);

  // Auto-rotating content must be stoppable: the user can pause it, it pauses
  // while the pointer is over it or focus is inside it, and it doesn't start
  // at all when the OS asks for reduced motion.
  const playing = !reduceMotion && !userPaused && !hovering && !focusWithin;

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % featured.length), 5000);
    return () => clearInterval(id);
  }, [playing]);

  if (featured.length === 0) return null;
  const s = featured[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Student spotlight"
      className="on-dark relative overflow-hidden bg-ink py-24 text-paper"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setFocusWithin(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocusWithin(false);
      }}
    >
      <div className="container-page">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <span className="eyebrow">Student Spotlight</span>
            <h2 className="display-3 mt-4">Researchers behind the work</h2>
          </div>
          <div className="flex shrink-0 gap-2">
            {!reduceMotion && (
              <button
                onClick={() => setUserPaused((p) => !p)}
                className={ctrl}
                aria-label={userPaused ? "Resume automatic rotation" : "Pause automatic rotation"}
              >
                {userPaused ? <Play size={16} /> : <Pause size={16} />}
              </button>
            )}
            <button
              onClick={() => setIndex((i) => (i - 1 + featured.length) % featured.length)}
              className={ctrl}
              aria-label="Previous student"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setIndex((i) => (i + 1) % featured.length)}
              className={ctrl}
              aria-label="Next student"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Announce changes only when the user moved the slide (playing = auto-rotating = stay quiet). */}
        <div aria-live={playing ? "off" : "polite"} aria-atomic="true">
          <AnimatePresence mode="wait">
            <motion.div
              key={s.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${featured.length}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-start gap-6 sm:flex-row sm:items-center"
            >
              <span
                aria-hidden="true"
                className="flex h-24 w-24 shrink-0 items-center justify-center border border-white/15 bg-white/5 font-display text-4xl text-paper"
              >
                {initials(s.name)}
              </span>
              <div>
                <Quote size={22} className="mb-3 text-signal" aria-hidden="true" />
                <div className="font-display text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.02] tracking-[-0.02em]">{s.name}</div>
                <p className="mono-label mt-4 max-w-xl leading-relaxed normal-case tracking-normal text-slate-mutedDark">
                  {s.details} · {s.institution}
                  {s.alum && " · Alum"}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex flex-wrap items-center">
          {featured.map((f, i) => (
            <button
              key={f.id}
              onClick={() => setIndex(i)}
              className="group flex h-11 items-center justify-center px-2.5"
              aria-label={`Show ${f.name}`}
              aria-current={i === index ? "true" : undefined}
            >
              <span
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-signal" : "w-1.5 bg-white/40 group-hover:bg-white/70"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
