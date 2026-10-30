import AnimatedCounter from "./AnimatedCounter";

// Takes a hand-formatted stat string like "$3.3M+" or "9 + 5 + 5+" and
// animates every embedded number on scroll-into-view, leaving the
// surrounding currency signs / connectors / suffixes as static text — so
// mockData can keep simple display strings instead of structured numbers.
export default function AnimatedStat({ value, className = "" }) {
  const parts = String(value).split(/(\d+\.?\d*)/g).filter((p) => p !== "");
  return (
    <span className={className}>
      {parts.map((part, i) =>
        /^\d+\.?\d*$/.test(part) ? (
          <AnimatedCounter
            key={i}
            value={parseFloat(part)}
            decimals={part.includes(".") ? 1 : 0}
          />
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}
