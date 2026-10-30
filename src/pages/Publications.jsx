import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { Search, ExternalLink, SearchX } from "lucide-react";
import PageTransition from "../components/PageTransition";
import AnimatedCounter from "../components/AnimatedCounter";
import { thrustIcon } from "../components/Card";
import { publications, thrusts, colorMap } from "../data/mockData";
import { Headline } from "../components/fx/Reveal";
import {
  axisTickLight as axisTick,
  tooltipThemeLight as tooltipTheme,
  chartColorsLight as chartColors,
  valueLabelLight,
} from "../components/chartTheme";

const years = [...new Set(publications.map((p) => p.year))].sort((a, b) => a - b);
const thrustById = Object.fromEntries(thrusts.map((t) => [t.id, t]));
const scholarUrl = (title) => `https://scholar.google.com/scholar?q=${encodeURIComponent(title)}`;

const venueCount = new Set(publications.map((p) => p.venue)).size;
const topThrust = [...thrusts].sort((a, b) => b.pubs - a.pubs)[0];
const pubsByYear = years.map((y) => ({ year: String(y), count: publications.filter((p) => p.year === y).length }));

export default function Publications() {
  const [searchParams] = useSearchParams();
  const thrustParam = searchParams.get("thrust");

  const [query, setQuery] = useState("");
  const [year, setYear] = useState("All");
  const [thrustFilter, setThrustFilter] = useState(thrustParam && thrustById[thrustParam] ? thrustParam : "All");

  const filtered = useMemo(() => {
    return publications.filter((p) => {
      const matchesYear = year === "All" || p.year === year;
      const matchesThrust = thrustFilter === "All" || p.thrust === thrustFilter;
      const q = query.toLowerCase();
      const matchesQuery =
        !q || p.title.toLowerCase().includes(q) || p.authors.toLowerCase().includes(q) || p.venue.toLowerCase().includes(q);
      return matchesYear && matchesThrust && matchesQuery;
    });
  }, [query, year, thrustFilter]);

  return (
    <PageTransition>
      <section className="relative border-b border-ink-100">
        <div className="container-page pb-16 pt-16 sm:pb-24 sm:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow">Publications</span>
            <Headline as="h1" onMount className="display-2 mt-6 max-w-[18ch]">From static list to *filterable database*</Headline>
            <p className="lead mt-8 max-w-xl">
              Search by title, author, or venue, and filter by year or research thrust.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-x-10 gap-y-8 border-t border-ink-100 pt-8 sm:max-w-md">
              <div>
                <div className="tnum font-display text-[clamp(2rem,3.2vw,2.75rem)] leading-none tracking-[-0.03em] text-ink-900">
                  <AnimatedCounter value={publications.length} />
                </div>
                <div className="mono-label mt-2 text-slate-muted">Publications</div>
              </div>
              <div>
                <div className="tnum font-display text-[clamp(2rem,3.2vw,2.75rem)] leading-none tracking-[-0.03em] text-ink-900">
                  <AnimatedCounter value={venueCount} />
                </div>
                <div className="mono-label mt-2 text-slate-muted">Distinct venues</div>
              </div>
              <div>
                <div className="tnum font-display text-[clamp(2rem,3.2vw,2.75rem)] leading-none tracking-[-0.03em] text-ink-900">
                  {years[0]}–{years[years.length - 1]}
                </div>
                <div className="mono-label mt-2 text-slate-muted">Years covered</div>
              </div>
              <div>
                <div className="tnum font-display text-[clamp(2rem,3.2vw,2.75rem)] leading-none tracking-[-0.03em] text-ink-900">{topThrust.tag}</div>
                <div className="mono-label mt-2 text-slate-muted">Most published thrust</div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <div className="flex min-w-0 items-center gap-2 rounded-full bg-white px-4 py-3 shadow-card ring-1 ring-ink-100/60 sm:max-w-md">
                <Search size={17} className="shrink-0 text-slate-muted" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search publications…"
                  className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-muted"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setYear("All")}
                  className={`chip rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    year === "All" ? "bg-brand-500 text-white" : "bg-white text-ink-700 ring-1 ring-ink-100 hover:bg-ink-50"
                  }`}
                >
                  All years
                </button>
                {years.map((y) => (
                  <button
                    key={y}
                    onClick={() => setYear(y)}
                    className={`chip rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                      year === y ? "bg-brand-500 text-white" : "bg-white text-ink-700 ring-1 ring-ink-100 hover:bg-ink-50"
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setThrustFilter("All")}
                  className={`chip rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    thrustFilter === "All" ? "bg-brand-500 text-white" : "bg-white text-ink-700 ring-1 ring-ink-100 hover:bg-ink-50"
                  }`}
                >
                  All thrusts
                </button>
                {thrusts.map((t) => {
                  const c = colorMap[t.color] ?? colorMap.rose;
                  const active = thrustFilter === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setThrustFilter(t.id)}
                      className={`chip rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                        active ? `${c.dot} ${c.activeText}` : `${c.bg} ${c.text} ring-1 ${c.ring} hover:brightness-95`
                      }`}
                    >
                      {t.tag}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="panel p-6 sm:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <div className="mono-label text-slate-muted">Publications by year</div>
                <div className="mono-label tnum text-ink-900">{publications.length} total</div>
              </div>
              <div
                className="mt-6"
                role="img"
                aria-label={`Bar chart of publications per year: ${pubsByYear.map((r) => `${r.year} ${r.count}`).join(", ")}.`}
              >
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={pubsByYear} margin={{ top: 22, right: 8, bottom: 0, left: -18 }}>
                    <CartesianGrid vertical={false} stroke="rgba(10,10,14,0.10)" />
                    <XAxis dataKey="year" tick={axisTick} axisLine={false} tickLine={false} />
                    <YAxis tick={axisTick} axisLine={false} tickLine={false} allowDecimals={false} />
                    <Tooltip {...tooltipTheme} formatter={(v) => [`${v} publications`, ""]} />
                    <Bar dataKey="count" fill={chartColors.rose} radius={[4, 4, 0, 0]} maxBarSize={44}>
                      <LabelList dataKey="count" position="top" {...valueLabelLight} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      </section>

      <section className="container-page pb-24">
        <p className="mb-4 text-sm text-slate-muted">{filtered.length} publications</p>
        <div className="flex flex-col gap-3">
          {filtered.map((p, i) => {
            const thrust = thrustById[p.thrust];
            const c = colorMap[thrust?.color] ?? colorMap.rose;
            const Icon = thrustIcon[thrust?.tag] ?? ExternalLink;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px 0px" }}
                transition={{ duration: 0.35, delay: (i % 10) * 0.035 }}
                whileHover={{ x: 4 }}
                className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl bg-white p-5 pl-6 shadow-card ring-1 ring-ink-100/60 transition-shadow hover:shadow-cardHover sm:flex-row sm:items-center sm:justify-between"
              >
                <span className={`absolute inset-y-0 left-0 w-1.5 ${c.dot}`} />
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${c.bg} ${c.text} ring-1 ${c.ring}`}
                  >
                    <Icon size={16} strokeWidth={2} />
                  </span>
                  <div>
                    <div className="font-medium text-ink-900">{p.title}</div>
                    <div className="mt-1 text-sm text-slate-muted">
                      {p.authors} · {p.venue} · {p.year}
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end sm:gap-2">
                  {thrust && (
                    <span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ring-1 ${c.bg} ${c.text} ${c.ring}`}>
                      {thrust.tag}
                    </span>
                  )}
                  <a
                    href={scholarUrl(p.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-500 hover:text-brand-600"
                  >
                    View <ExternalLink size={12} />
                  </a>
                </div>
              </motion.div>
            );
          })}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center py-16 text-center text-slate-muted">
              <SearchX size={28} className="mb-3 text-ink-200" />
              {thrustFilter !== "All" && !query.trim() && year === "All" ? (
                <>
                  <p>
                    No publications are tagged under <strong>{thrustById[thrustFilter]?.name}</strong> yet.
                  </p>
                  <p className="mt-1 text-sm">
                    This is a newer or emerging thrust — check back as new NSF/NIH-funded research is added.
                  </p>
                </>
              ) : (
                <p>No publications match your filters.</p>
              )}
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
