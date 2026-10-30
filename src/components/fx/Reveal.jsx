import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

// Fade-and-rise on scroll into view. `as` picks the element ("p", "li", ...).
export function Reveal({ children, delay = 0, y = 28, className = "", as = "div", ...rest }) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// "plain *italic accent* plain," -> array of words, each an array of
// { t, italic } segments. A segment with no whitespace before it (e.g. the
// comma in "*one*,") is glued onto the previous word so it can never wrap
// onto a line by itself.
function tokenize(text) {
  const words = [];
  let italic = false;
  let prevEndsWithSpace = true;
  for (const part of text.split("*")) {
    const startsWithSpace = /^\s/.test(part);
    const bits = part.split(/\s+/).filter(Boolean);
    bits.forEach((t, i) => {
      const glue = i === 0 && !startsWithSpace && !prevEndsWithSpace && words.length > 0;
      if (glue) words[words.length - 1].push({ t, italic });
      else words.push([{ t, italic }]);
    });
    if (bits.length) prevEndsWithSpace = /\s$/.test(part);
    italic = !italic;
  }
  return words;
}

// Display headline whose words rise out of a mask, staggered. Wrap a phrase
// in *asterisks* to set it in the italic accent colour.
// Renders the heading element itself so `aria-label` carries the full text
// for assistive tech while the animated word spans stay aria-hidden.
export function Headline({
  as: Tag = "h2",
  children,
  className = "",
  accent = "text-signal-ink",
  delay = 0,
  stagger = 0.07,
  onMount = false,
}) {
  const text = String(children);
  const words = tokenize(text);
  // The trigger lives on the mask wrapper, NOT the moving word: a word that
  // starts translated outside its own overflow:hidden parent is fully clipped,
  // and IntersectionObserver never reports a clipped element as visible — so a
  // word-level whileInView would simply never fire.
  const trigger = onMount
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <Tag aria-label={text.replace(/\*/g, "")} className={className}>
      {words.map((segs, i) => (
        <span key={i}>
          <motion.span
            aria-hidden="true"
            className="inline-block overflow-hidden align-top"
            style={{ paddingTop: "0.08em", marginTop: "-0.08em", paddingBottom: "0.16em", marginBottom: "-0.16em" }}
            initial="hidden"
            {...trigger}
          >
            <motion.span
              className="inline-block will-change-transform"
              variants={{
                hidden: { y: "118%" },
                show: { y: "0%", transition: { duration: 1, ease, delay: delay + i * stagger } },
              }}
            >
              {segs.map((s, k) =>
                s.italic ? (
                  <em key={k} className={`font-display italic ${accent}`}>
                    {s.t}
                  </em>
                ) : (
                  <span key={k}>{s.t}</span>
                )
              )}
            </motion.span>
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
