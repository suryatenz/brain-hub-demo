import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Network, Search as SearchIcon, LayoutGrid } from "lucide-react";
import PageTransition from "../components/PageTransition";
import FootfallTicker from "../components/FootfallTicker";
import AnimatedStat from "../components/AnimatedStat";
import { ThrustCard, FeatureCard } from "../components/Card";
import NeuralField from "../components/fx/NeuralField";
import EEGTrace from "../components/fx/EEGTrace";
import Marquee from "../components/fx/Marquee";
import Magnetic from "../components/fx/Magnetic";
import ScrambleText from "../components/fx/ScrambleText";
import ScrollWords from "../components/fx/ScrollWords";
import { Headline, Reveal } from "../components/fx/Reveal";
import { heroDelay } from "../components/fx/intro";
import { thrusts, news, stats, institutions } from "../data/mockData";

// Dedupe by institution name (e.g. University of Houston appears in both
// brainCore and mdrn).
const partnerNames = [
  ...new Set([...institutions.brainCore, ...institutions.accelnet, ...institutions.mdrn].map((p) => p.name)),
];

const MISSION =
  "The BRAIN Center develops safe, effective, and affordable personalized neurotechnologies to diagnose, restore, enhance, and rehabilitate sensory, motor, affective, and cognitive functions.";

// Registration marks in the corners: a small instrument-panel detail.
function CornerMarks() {
  const cls = "absolute h-3 w-3 text-white/30";
  const plus = (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <path d="M6 0V12M0 6H12" />
    </svg>
  );
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-4 sm:inset-6">
      <span className={`${cls} left-0 top-0`}>{plus}</span>
      <span className={`${cls} right-0 top-0`}>{plus}</span>
      <span className={`${cls} bottom-0 left-0`}>{plus}</span>
      <span className={`${cls} bottom-0 right-0`}>{plus}</span>
    </div>
  );
}

function Hero() {
  const d = heroDelay();
  return (
    <section className="on-dark relative -mt-[68px] flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0">
        <NeuralField />
      </div>
      <div className="bg-grid-dark absolute inset-0 opacity-50" aria-hidden="true" />
      {/* Keeps the headline legible over the busiest part of the network. */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" aria-hidden="true" />
      <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-ink/70 to-transparent" aria-hidden="true" />
      <CornerMarks />

      <div className="container-page relative z-10 w-full pb-6 pt-40 sm:pt-48">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 sm:mb-10">
          <ScrambleText
            as="p"
            text="NSF IUCRC BRAIN Center × AccelNet × MDRN"
            delay={d * 1000}
            className="eyebrow"
          />
          <span className="mono-label text-slate-mutedDark">Demo redesign concept</span>
        </div>

        <Headline
          as="h1"
          onMount
          delay={d}
          accent="text-signal"
          className="font-display text-[clamp(2.4rem,5.6vw,5.4rem)] leading-[0.92] tracking-[-0.035em]"
        >
          Neurotechnology research, *one living network.*
        </Headline>

        <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal delay={d + 0.5} as="p" className="lead max-w-xl">
              The NSF BRAIN Center, the Movement, Music &amp; BrainHealth AccelNet, and the Music &amp; Dementia Research
              Network, brought together in one hub — searchable, current, and built for a growing list of 18+ partner
              institutions across six countries.
            </Reveal>
            <Reveal delay={d + 0.65} className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Link
                  to="/research"
                  className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-signal px-7 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink-900 transition-transform hover:scale-[1.03]"
                >
                  Explore research <ArrowRight size={15} />
                </Link>
              </Magnetic>
              <Magnetic strength={0.2}>
                <Link
                  to="/hub"
                  className="inline-flex min-h-12 items-center rounded-full border border-white/25 px-7 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors hover:bg-white/10"
                >
                  Preview the Central Hub
                </Link>
              </Magnetic>
            </Reveal>
          </div>
          <Reveal delay={d + 0.7}>
            <FootfallTicker />
          </Reveal>
        </div>
      </div>

      <div className="relative z-10">
        <div className="container-page mb-1 flex items-center justify-between">
          <span className="mono-label text-slate-mutedDark">Simulated EEG · 4 channels</span>
          <span className="mono-label hidden text-slate-mutedDark sm:inline">Scroll ↓</span>
        </div>
        <div className="h-24 w-full sm:h-28">
          <EEGTrace channels={4} />
        </div>
      </div>
    </section>
  );
}

function PartnerMarquee() {
  return (
    <section aria-label="Partner institutions" className="border-y border-ink-100 bg-paper-2 py-6">
      <Marquee duration={70} gap="gap-10 pr-10">
        {partnerNames.map((n) => (
          <span key={n} className="flex items-center gap-10 whitespace-nowrap font-display text-[1.6rem] italic leading-none text-ink-900">
            {n}
            <span className="h-2 w-2 rotate-45 bg-signal" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}

function Mission() {
  return (
    <section className="on-dark relative overflow-hidden bg-ink py-28 text-paper sm:py-40">
      <div className="bg-grid-dark absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="container-page relative">
        <span className="eyebrow">Mission</span>
        <ScrollWords
          text={MISSION}
          className="mt-8 max-w-[26ch] font-display text-[clamp(1.6rem,3.3vw,2.9rem)] leading-[1.06] tracking-[-0.02em] sm:max-w-5xl"
        />
        <Reveal className="mt-14 flex flex-wrap gap-x-8 gap-y-3">
          <Link to="/about" className="link-draw inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-paper">
            About the Center <ArrowRight size={14} />
          </Link>
          <Link to="/about#network-map" className="link-draw inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-paper">
            See the network map <ArrowRight size={14} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="border-b border-ink-100">
      <div className="container-page grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.08}
            className={`border-ink-100 py-12 pr-4 sm:py-16 ${i % 2 === 1 ? "pl-4 sm:pl-8" : ""} ${
              i > 0 ? "lg:border-l lg:pl-8" : ""
            } ${i % 2 === 1 ? "border-l lg:border-l" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""}`}
          >
            <AnimatedStat value={s.value} className="tnum font-display text-[clamp(2rem,3.8vw,3.4rem)] leading-none tracking-[-0.03em]" />
            <div className="mono-label mt-4 text-slate-muted">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function RailHeader({ index, total }) {
  return (
    <div className="container-page flex w-full flex-col justify-between gap-6 sm:flex-row sm:items-end">
      <div>
        <span className="eyebrow">Research</span>
        <Headline as="h2" className="display-2 mt-4 max-w-2xl">
          Twelve research *thrusts*
        </Headline>
      </div>
      <div className="flex items-center gap-8">
        {typeof index === "number" && (
          <span className="mono-label tnum text-slate-muted">
            {String(index + 1).padStart(2, "0")} / {total}
          </span>
        )}
        <Link to="/research" className="link-draw inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em]">
          View all thrusts <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

// Pinned horizontal scroll: the section is as tall as the horizontal distance
// to travel, its inner frame sticks to the viewport, and vertical scroll
// progress drives the track sideways.
function PinnedRail() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [dist, setDist] = useState(0);
  const [idx, setIdx] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  useMotionValueEvent(scrollYProgress, "change", (v) => setIdx(Math.min(thrusts.length - 1, Math.floor(v * thrusts.length))));

  useLayoutEffect(() => {
    function measure() {
      const t = trackRef.current;
      if (t) setDist(Math.max(0, t.scrollWidth - window.innerWidth));
    }
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Keyboard users tab through the cards while the track is moved by scroll,
  // so when a card takes focus, scroll the page until that card is in view.
  function ensureVisible(i) {
    const card = trackRef.current?.children[i];
    if (!card || !sectionRef.current) return;
    const desired = Math.min(Math.max(card.offsetLeft - 96, 0), dist);
    const top = sectionRef.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + desired, behavior: "instant" });
  }

  return (
    <section ref={sectionRef} style={{ height: `calc(${dist}px + 100vh)` }} className="relative bg-paper-2">
      <div className="sticky top-0 flex h-screen flex-col justify-center gap-10 overflow-hidden pt-16">
        <RailHeader index={idx} total={thrusts.length} />
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="relative flex w-max gap-5 px-5 sm:px-8 lg:px-[max(3rem,calc((100vw-88rem)/2+3rem))]"
        >
          {thrusts.map((t, i) => (
            <div key={t.id} className="w-[26rem] shrink-0" onFocusCapture={() => ensureVisible(i)}>
              <ThrustCard thrust={t} index={i} />
            </div>
          ))}
        </motion.div>
        <div className="container-page w-full">
          <div className="h-px w-full bg-ink-100">
            <motion.div style={{ scaleX: scrollYProgress }} className="h-[3px] origin-left -translate-y-px bg-signal" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Small screens / reduced motion: a plain swipeable, snap-scrolling rail.
function SimpleRail() {
  return (
    <section className="section-pad bg-paper-2">
      <RailHeader />
      <div className="thin-scroll mt-10 snap-x snap-mandatory overflow-x-auto pb-6">
        <div className="flex w-max gap-4 px-5 sm:px-8">
          {thrusts.map((t, i) => (
            <div key={t.id} className="w-[82vw] shrink-0 snap-start sm:w-[22rem]">
              <ThrustCard thrust={t} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ThrustsRail() {
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return wide && !reduce ? <PinnedRail /> : <SimpleRail />;
}

function WhyHub() {
  return (
    <section className="section-pad container-page">
      <div className="mb-14 max-w-3xl">
        <span className="eyebrow">Why a central hub</span>
        <Headline as="h2" className="display-2 mt-4">
          From two static websites to *one living system*
        </Headline>
      </div>
      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-3">
        <FeatureCard icon={SearchIcon} color="rose" eyebrow="Findability" title="Site-wide search" index={0}>
          Publications, people, projects, and news — searchable in one place, each result labeled by type.
        </FeatureCard>
        <FeatureCard icon={LayoutGrid} color="green" eyebrow="Structure" title="Cards, not walls of text" index={1}>
          Dense pages reorganized into scannable cards, borrowed from esind.eu's F/Z-pattern layout system.
        </FeatureCard>
        <FeatureCard icon={Network} color="orange" eyebrow="Connection" title="Three networks, growing" index={2}>
          One hub connecting BRAIN Center core sites, AccelNet's five research networks, and MDRN.
        </FeatureCard>
      </div>
    </section>
  );
}

function fmtDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function NewsSection() {
  const items = news.slice(0, 3);
  return (
    <section className="bg-paper-2 py-24 sm:py-32">
      <div className="container-page">
        <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow">Latest</span>
            <Headline as="h2" className="display-2 mt-4">
              News from the *network*
            </Headline>
          </div>
          <Link to="/news" className="link-draw inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em]">
            All news &amp; events <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-3">
          {items.map((n, i) => (
            <Reveal key={n.id} delay={i * 0.1} y={40}>
              <a href={n.url} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-ink-50">
                  <motion.img
                    src={n.image}
                    alt=""
                    loading="lazy"
                    initial={{ scale: 1.25 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter] duration-700 group-hover:grayscale-0"
                  />
                </div>
                <div className="mono-label mt-5 flex items-center justify-between text-slate-muted">
                  <span className="text-signal-ink">{n.tag}</span>
                  <span className="tnum">{fmtDate(n.date)}</span>
                </div>
                <h3 className="mt-3 font-display text-[1.35rem] leading-[1.08] tracking-[-0.015em]">
                  <span className="link-draw">{n.title}</span>
                  <ArrowUpRight size={18} className="ml-1 inline align-top opacity-0 transition-opacity group-hover:opacity-100" />
                </h3>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function JoinCTA() {
  return (
    <section className="on-dark relative overflow-hidden bg-ink py-28 text-paper sm:py-40">
      <div className="container-page relative text-center">
        <span className="eyebrow">Membership</span>
        <Headline as="h2" accent="text-signal" className="display-1 mx-auto mt-6 max-w-[14ch]">
          Join the *network.*
        </Headline>
        <Reveal as="p" className="lead mx-auto mt-8 max-w-lg">
          Industry partners, faculty and students shape the research agenda, share resources, and move technology from
          lab to market.
        </Reveal>
        <Reveal className="mt-10">
          <Magnetic strength={0.4}>
            <Link
              to="/membership"
              className="inline-flex min-h-14 items-center gap-3 rounded-full bg-signal px-9 font-mono text-xs font-medium uppercase tracking-[0.16em] text-ink-900 transition-transform hover:scale-105"
            >
              Become a member <ArrowRight size={16} />
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <PartnerMarquee />
      <Mission />
      <Stats />
      <ThrustsRail />
      <WhyHub />
      <NewsSection />
      <JoinCTA />
    </PageTransition>
  );
}
