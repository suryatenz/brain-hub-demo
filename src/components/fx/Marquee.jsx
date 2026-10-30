// Infinite horizontal ticker. Two identical tracks each slide by -100% of their
// own width, so the loop is seamless at any content width. Pauses on hover and
// keyboard focus; under reduced motion it becomes a static, scrollable row.
//
// The second track is aria-hidden, so the content must NOT be focusable
// (plain text / images only).
export default function Marquee({ children, duration = 40, reverse = false, className = "", gap = "gap-12 pr-12" }) {
  return (
    <div className={`marquee flex overflow-hidden ${className}`} style={{ "--marquee-d": `${duration}s` }}>
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1 ? "true" : undefined}
          className={`marquee-track flex min-w-full shrink-0 items-center ${gap}`}
          style={reverse ? { animationDirection: "reverse" } : undefined}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
