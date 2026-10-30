import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { IdCard, Brain, Network as NetworkIcon, ArrowRight } from "lucide-react";
import PageTransition from "../components/PageTransition";
import { FeatureCard, LinkWrap } from "../components/Card";
import NetworkPanel from "../components/NetworkPanel";
import AnimatedStat from "../components/AnimatedStat";
import XrayPhoto from "../components/fx/XrayPhoto";
import { Headline, Reveal } from "../components/fx/Reveal";
import { axisTickLight as axisTick, tooltipThemeLight as tooltipTheme, chartColorsLight } from "../components/chartTheme";
import { institutions, awards, fundingSummary } from "../data/mockData";

// Draws a rect with only its top corners rounded (or a plain rect when
// radius is 0), used so whichever series sits on top of the stack gets a
// clean rounded cap instead of a flat/square one.
function roundedTopPath(x, y, width, height, radius) {
  if (height <= 0) return "";
  const r = Math.min(radius, width / 2, height);
  if (r <= 0) return `M${x},${y} h${width} v${height} h${-width} Z`;
  return `M${x},${y + height} V${y + r} Q${x},${y} ${x + r},${y} H${x + width - r} Q${x + width},${y} ${x + width},${y + r} V${y + height} Z`;
}

const COMPLETED_FILL = "#7A766C";

// Completed = warm grey, Active = vermilion. Both are >=3:1 on the light panel.
function CompletedBarShape(props) {
  const { x, y, width, height, payload } = props;
  const radius = payload.active > 0 ? 0 : 4;
  return <path d={roundedTopPath(x, y, width, height, radius)} fill={COMPLETED_FILL} />;
}

function ActiveBarShape(props) {
  const { x, y, width, height } = props;
  return <path d={roundedTopPath(x, y, width, height, 4)} fill={chartColorsLight.rose} />;
}

function awardUrl(a) {
  if (a.agency === "NSF") return `https://www.nsf.gov/awardsearch/show-award/?AWD_ID=${a.id}`;
  return "https://reporter.nih.gov/";
}

const fmtMoney = (n) => `$${(n / 1000).toLocaleString(undefined, { maximumFractionDigits: 0 })}K`;
const fmtMoneyM = (n) => `$${(n / 1_000_000).toFixed(2)}M`;

// Derived directly from the real `awards` array (grouped by each award's
// start year) rather than hand-typed, so the chart can't drift from the data.
function buildAwardsByYear(list) {
  const byYear = {};
  for (const a of list) {
    const startYear = a.period.split(/[–-]/)[0].trim();
    byYear[startYear] ??= { year: startYear, active: 0, completed: 0 };
    byYear[startYear][a.status] += Math.round(a.amount / 1000);
  }
  return Object.values(byYear).sort((a, b) => a.year.localeCompare(b.year));
}

const directoryGroups = [
  { key: "brain", title: "BRAIN Center core sites", items: institutions.brainCore },
  { key: "accelnet", title: "AccelNet network partners", items: institutions.accelnet },
  { key: "mdrn", title: "MDRN network partners", items: institutions.mdrn },
];

function AwardRow({ a, i, muted = false }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px 0px" }}
      transition={{ duration: 0.45, delay: i * 0.06 }}
      className="border-t border-ink-900/15"
    >
      <LinkWrap to={awardUrl(a)} className="group block py-5 pl-1 transition-colors hover:bg-white/70">
        <div className="flex items-start justify-between gap-6">
          <span className={`font-display text-[1.15rem] leading-[1.15] ${muted ? "text-ink-700" : "text-ink-900"}`}>
            <span className="link-draw">{a.title}</span>
          </span>
          <span className="tnum shrink-0 font-mono text-sm text-ink-900">{fmtMoney(a.amount)}</span>
        </div>
        <div className="mono-label mt-2 flex items-center justify-between gap-2 text-slate-muted">
          <span>
            {a.agency} · {a.program} · #{a.id} · {a.period}
          </span>
          <ArrowRight size={13} className="shrink-0 text-ink-900 opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </LinkWrap>
    </motion.li>
  );
}

export default function About() {
  const activeAwards = awards.filter((a) => a.status === "active");
  const pastAwards = awards.filter((a) => a.status === "completed");
  const awardsByYear = buildAwardsByYear(awards);

  return (
    <PageTransition>
      <section className="relative border-b border-ink-100">
        <div className="container-page pb-20 pt-16 sm:pb-28 sm:pt-24">
          <div className="grid items-end gap-14 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <span className="eyebrow">About</span>
              <Headline as="h1" onMount className="display-2 mt-6 max-w-[18ch]">
                One mission, run by one PI, across *three networks*
              </Headline>
              <p className="lead mt-8 max-w-2xl">
                The BRAIN Center develops safe, effective, and affordable personalized neurotechnologies to diagnose,
                restore, enhance, and rehabilitate sensory, motor, affective, and cognitive functions. Through
                interdisciplinary research on brain function and behavior, the Center aims to improve human health and
                quality of life. Alongside it, the Movement, Music &amp; BrainHealth AccelNet (NSF Award #2412731,
                2024–2028) links five research networks spanning the US, Switzerland, the UK, and pan-European
                infrastructure. Dr. Contreras-Vidal also serves as Site PI for the University of Houston on the{" "}
                <a
                  href="https://mdrn.ucsf.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-ink-900 underline decoration-signal decoration-2 underline-offset-4 hover:bg-signal/20"
                >
                  Music &amp; Dementia Research Network
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>{" "}
                (MDRN), an NIH/NIA-funded consortium led by UCSF.
              </p>
            </div>
            <motion.figure
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto w-full max-w-sm lg:mx-0"
            >
              <div className="group relative aspect-[4/5] overflow-hidden bg-ink-50">
                <XrayPhoto
                  src="/images/people/contreras-vidal-hero.jpg"
                  alt="Dr. Jose Luis Contreras-Vidal"
                  className="h-full w-full"
                />
                <span className="mono-label absolute left-3 top-3 bg-paper/90 px-2 py-1 text-ink-900">Fig. 01</span>
              </div>
              <figcaption className="mt-4 border-t border-ink-900 pt-3">
                <div className="font-display text-[1.3rem] leading-tight text-ink-900">Dr. Jose Luis Contreras-Vidal</div>
                <div className="mono-label mt-2 text-signal-ink">Hugh Roy &amp; Lillie Cranz Cullen Distinguished Professor</div>
                <div className="mt-1 text-sm text-slate-muted">IEEE Fellow · AIMBE Fellow · University of Houston</div>
              </figcaption>
            </motion.figure>
          </div>
        </div>
      </section>

      <section className="section-pad container-page">
        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-3">
          <FeatureCard
            icon={IdCard}
            color="rose"
            eyebrow="Principal Investigator"
            title="Director, Co-PI, and Site PI"
            index={0}
            to="/people"
            linkLabel="Meet the leadership"
          >
            Director of the NSF BRAIN Center, Co-PI of the Movement, Music &amp; BrainHealth AccelNet, and Site PI for
            MDRN at the University of Houston.
          </FeatureCard>
          <FeatureCard
            icon={Brain}
            color="orange"
            eyebrow="Shared thread"
            title="Neurotechnology, art & music, brain health"
            index={1}
            to="/research"
            linkLabel="See the research thrusts"
          >
            All three networks study the same underlying questions — how neural signals connect to movement,
            creativity, and long-term brain health — from different institutional vantage points.
          </FeatureCard>
          <FeatureCard
            icon={NetworkIcon}
            color="green"
            eyebrow="Structure"
            title="Nine core sites, ten partner networks"
            index={2}
            to="#network-map"
            linkLabel="Jump to the map"
          >
            The BRAIN Center's nine core sites across the US, Mexico, and Spain; AccelNet's five research networks; and
            MDRN's growing consortium — mapped below.
          </FeatureCard>
        </div>
      </section>

      {/* Map */}
      <section id="network-map" className="on-dark scroll-mt-20 bg-ink py-24 text-paper sm:py-32">
        <div className="container-page">
          <div className="mb-12 max-w-3xl">
            <span className="eyebrow">Network map</span>
            <Headline as="h2" accent="text-signal" className="display-2 mt-4">
              A map people can *actually read*
            </Headline>
          </div>
          <Reveal y={50}>
            <NetworkPanel />
          </Reveal>
        </div>
      </section>

      {/* Partner directory */}
      <section className="section-pad container-page">
        <span className="eyebrow">Directory</span>
        <Headline as="h2" className="display-2 mt-4">
          Partner *institutions*
        </Headline>

        <div className="mt-14 grid gap-x-12 gap-y-16 lg:grid-cols-3">
          {directoryGroups.map((group) => (
            <div key={group.key}>
              <h3 className="mono-label mb-4 flex items-baseline justify-between border-b border-ink-900 pb-3 text-ink-900">
                <span>{group.title}</span>
                <span className="tnum text-slate-muted">{String(group.items.length).padStart(2, "0")}</span>
              </h3>
              <ul>
                {group.items.map((it, i) => (
                  <motion.li
                    key={it.name}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px 0px" }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    className="border-b border-ink-100"
                  >
                    <LinkWrap to={it.url} className="group block py-4 pl-1 transition-colors hover:bg-white/70">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-display text-[1.15rem] leading-tight text-ink-900">
                          <span className="link-draw">{it.name}</span>
                        </span>
                        {it.url && (
                          <ArrowRight size={14} className="shrink-0 text-ink-900 opacity-0 transition-opacity group-hover:opacity-100" />
                        )}
                      </div>
                      <div className="mono-label mt-2 leading-relaxed text-slate-muted">
                        {it.role} · {it.location}
                      </div>
                    </LinkWrap>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Awards & Funding */}
      <section className="bg-paper-2 section-pad">
        <div className="container-page">
          <span className="eyebrow">Awards &amp; Funding</span>
          <Headline as="h2" className="display-2 mt-4 max-w-4xl">
            Real NSF and NIH awards *behind this network*
          </Headline>
          <p className="lead mt-6 max-w-2xl">
            Pulled from NSF Award Search and NIH RePORTER for Dr. Contreras-Vidal at the University of Houston. Active
            funding today is well above the $1.3M figure often quoted for the AccelNet award alone.
          </p>

          <div className="mt-14 grid grid-cols-2 border-y border-ink-900 lg:grid-cols-4">
            {[
              { v: fmtMoneyM(fundingSummary.combinedActive), l: "Active NSF + NIH funding" },
              { v: fmtMoneyM(fundingSummary.nsfLifetime), l: "NSF lifetime total (TX awards)" },
              { v: fmtMoneyM(fundingSummary.nihLifetime), l: "NIH lifetime total" },
              { v: fmtMoneyM(fundingSummary.combinedLifetime), l: "Combined career total" },
            ].map((s, i) => (
              <Reveal
                key={s.l}
                delay={i * 0.08}
                className={`py-10 pr-4 ${i % 2 === 1 ? "border-l border-ink-900/15 pl-6" : ""} ${i > 1 ? "border-t border-ink-900/15 lg:border-t-0" : ""} ${
                  i === 2 ? "lg:border-l lg:border-ink-900/15 lg:pl-6" : ""
                }`}
              >
                <a href="#awards-list" className="group block">
                  <AnimatedStat
                    value={s.v}
                    className="tnum font-display text-[clamp(1.9rem,3.4vw,2.9rem)] leading-none tracking-[-0.03em] text-ink-900"
                  />
                  <div className="mono-label mt-4 text-slate-muted group-hover:text-ink-900">{s.l} ↓</div>
                </a>
              </Reveal>
            ))}
          </div>

          <div id="awards-list" className="mt-20 grid scroll-mt-24 gap-x-14 gap-y-14 lg:grid-cols-2">
            <div>
              <h3 className="mono-label mb-2 flex items-baseline justify-between border-b border-ink-900 pb-3 text-ink-900">
                <span>Active awards</span>
                <span className="tnum text-slate-muted">{String(activeAwards.length).padStart(2, "0")}</span>
              </h3>
              <ul>
                {activeAwards.map((a, i) => (
                  <AwardRow key={a.id} a={a} i={i} />
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mono-label mb-2 flex items-baseline justify-between border-b border-ink-900 pb-3 text-ink-900">
                <span>Completed awards</span>
                <span className="tnum text-slate-muted">{String(pastAwards.length).padStart(2, "0")}</span>
              </h3>
              <ul>
                {pastAwards.map((a, i) => (
                  <AwardRow key={a.id} a={a} i={i} muted />
                ))}
              </ul>
            </div>
          </div>

          <Reveal y={40} className="panel mt-20 p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <div className="mono-label text-slate-muted">Award value by start year · $K</div>
              <ul className="mono-label flex gap-5 text-ink-900" aria-hidden="true">
                <li className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5" style={{ background: chartColorsLight.rose }} /> Active
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5" style={{ background: COMPLETED_FILL }} /> Completed
                </li>
              </ul>
            </div>
            <div
              className="mt-8"
              role="img"
              aria-label={`Stacked bar chart of award value in thousands of dollars by start year: ${awardsByYear
                .map((r) => `${r.year} active ${r.active}, completed ${r.completed}`)
                .join("; ")}.`}
            >
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={awardsByYear} barSize={46} barCategoryGap="35%" margin={{ top: 8, right: 8, bottom: 0, left: -8 }}>
                  <CartesianGrid vertical={false} stroke="rgba(10,10,14,0.10)" />
                  <XAxis dataKey="year" tick={axisTick} axisLine={false} tickLine={false} />
                  <YAxis tick={axisTick} axisLine={false} tickLine={false} />
                  <Tooltip {...tooltipTheme} formatter={(v, name) => [`$${Number(v).toLocaleString()}K`, name]} />
                  <Bar dataKey="completed" name="Completed" stackId="a" fill={COMPLETED_FILL} shape={CompletedBarShape} />
                  <Bar dataKey="active" name="Active" stackId="a" fill={chartColorsLight.rose} shape={ActiveBarShape} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-slate-muted">
              Grouped by the year each award started; a single multi-year award's full value is shown in its start
              year.
            </p>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
