import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Database,
  Stethoscope,
  Cpu,
  Network,
  Zap,
  Activity,
  HeartPulse,
  ShieldCheck,
  Dumbbell,
  Factory,
  Music2,
  Scale,
} from "lucide-react";
import { colorMap, thrusts } from "../data/mockData";

export const thrustIcon = {
  Data: Database,
  Clinical: Stethoscope,
  Devices: Cpu,
  Interop: Network,
  Neuromod: Zap,
  Measurement: Activity,
  Rehab: HeartPulse,
  Regulatory: ShieldCheck,
  Sports: Dumbbell,
  "Industry 4.0": Factory,
  "Art & Music": Music2,
  Ethics: Scale,
};

const maxThrustPubs = Math.max(...thrusts.map((t) => t.pubs));
const ease = [0.22, 1, 0.36, 1];

// Wraps children in the right link type for a `to` value: a full URL opens
// in a new tab, a same-page "#anchor" uses a plain <a> (so the browser does
// the scrolling, not the SPA router), anything else is an internal route.
export function LinkWrap({ to, className, children }) {
  if (!to) return <div className={className}>{children}</div>;
  if (/^https?:\/\//.test(to)) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  if (to.startsWith("#")) {
    return (
      <a href={to} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

// The round arrow "affordance" that slides in on hover / focus.
function Go({ external = false }) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <span
      aria-hidden="true"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-100 transition-all duration-500 ease-out group-hover:-rotate-45 group-hover:border-ink-900 group-hover:bg-ink-900 group-hover:text-paper"
    >
      <Icon size={16} />
    </span>
  );
}

// A research thrust: numbered index, tag, big serif title, publication meter.
export function ThrustCard({ thrust, index = 0 }) {
  const c = colorMap[thrust.color] ?? colorMap.rose;
  const Icon = thrustIcon[thrust.tag] ?? Database;
  const fill = maxThrustPubs > 0 ? thrust.pubs / maxThrustPubs : 0;
  const n = thrusts.findIndex((t) => t.id === thrust.id) + 1;
  return (
    <Link to={`/publications?thrust=${thrust.id}`} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: 0.8, ease, delay: (index % 3) * 0.07 }}
        data-spot
        className="spot group relative flex h-full min-h-[22rem] flex-col border border-ink-100/80 bg-white p-6 transition-colors duration-500 hover:border-ink-900"
      >
        <div className="flex items-start justify-between">
          <span className="mono-label tnum text-slate-muted">
            {String(n).padStart(2, "0")} <span className="opacity-40">/ {thrusts.length}</span>
          </span>
          <span className={`mono-label inline-flex items-center gap-2 ${c.text}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
            {thrust.tag}
          </span>
        </div>

        <Icon
          aria-hidden="true"
          strokeWidth={1}
          className="mt-6 h-10 w-10 text-ink-900/80 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-6"
        />

        <h3 className="mt-6 font-display text-[1.55rem] leading-[1.02] tracking-[-0.02em] text-ink-900">{thrust.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-muted">{thrust.summary}</p>

        <div className="mt-6 flex items-end justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-slate-muted">
              <span>Publications</span>
              <span className="tnum text-ink-900">{thrust.pubs}</span>
            </div>
            <div className="mt-2 h-px w-full bg-ink-100">
              <motion.div
                className={`-mt-px h-[3px] origin-left ${c.dot}`}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: fill }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease, delay: 0.2 }}
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <Go />
        </div>
      </motion.div>
    </Link>
  );
}

// An editorial "feature": thick top rule, mono index, serif title. The icon is
// a quiet line glyph, not a tinted badge.
export function FeatureCard({ icon: Icon, color = "rose", eyebrow, title, children, index = 0, to, linkLabel = "Explore" }) {
  const c = colorMap[color] ?? colorMap.rose;
  return (
    <LinkWrap to={to} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: 0.8, ease, delay: (index % 3) * 0.08 }}
        data-spot
        className="spot group relative flex h-full flex-col border-t-2 border-ink-900 bg-transparent px-1 pb-6 pt-5"
      >
        <div className="flex items-start justify-between">
          <span className="mono-label tnum text-slate-muted">{String(index + 1).padStart(2, "0")}</span>
          {Icon && (
            <Icon
              aria-hidden="true"
              strokeWidth={1.1}
              className="h-9 w-9 text-ink-900 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-6"
            />
          )}
        </div>
        {eyebrow && (
          <div className={`mono-label mt-8 inline-flex items-center gap-2 ${c.text}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
            {eyebrow}
          </div>
        )}
        {title && <h3 className="display-3 mt-3 text-ink-900">{title}</h3>}
        <div className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-slate-muted">{children}</div>
        {to && (
          <div className="mt-6 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-ink-900">
            <span className="link-draw">{linkLabel}</span>
            <Go external={/^https?:\/\//.test(to)} />
          </div>
        )}
      </motion.div>
    </LinkWrap>
  );
}

// General-purpose hairline panel.
export function SimpleCard({ eyebrow, title, children, index = 0, className = "", to, linkLabel = "" }) {
  return (
    <LinkWrap to={to} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: 0.75, ease, delay: (index % 4) * 0.06 }}
        data-spot
        className={`spot group h-full border border-ink-100/80 bg-white p-6 transition-colors duration-500 ${
          to ? "hover:border-ink-900" : ""
        } ${className}`}
      >
        {eyebrow && <div className="mono-label mb-3 text-signal-ink">{eyebrow}</div>}
        {title && <h3 className="mb-2 font-display text-[1.35rem] leading-[1.05] tracking-[-0.02em] text-ink-900">{title}</h3>}
        {children}
        {to && (
          <div className="mt-4 flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-ink-900 opacity-0 transition-opacity group-hover:opacity-100">
            {linkLabel} <ArrowRight size={13} />
          </div>
        )}
      </motion.div>
    </LinkWrap>
  );
}
