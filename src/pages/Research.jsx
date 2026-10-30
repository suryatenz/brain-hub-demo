import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts";
import { Search, SearchX } from "lucide-react";
import PageTransition from "../components/PageTransition";
import { ThrustCard } from "../components/Card";
import AnimatedCounter from "../components/AnimatedCounter";
import { thrusts, publications, colorMap } from "../data/mockData";
import { Headline } from "../components/fx/Reveal";
import {
  axisTickLight as axisTick,
  tooltipThemeLight as tooltipTheme,
  chartColorsLight as chartColors,
  valueLabelLight,
} from "../components/chartTheme";

const tags = ["All", ...new Set(thrusts.map((t) => t.tag))];
const tagColorKey = Object.fromEntries(thrusts.map((t) => [t.tag, t.color]));
const hexFor = chartColors;

const totalPubs = thrusts.reduce((sum, t) => sum + t.pubs, 0);
const institutionCount = new Set(publications.map((p) => p.inst)).size;
const pubYears = publications.map((p) => p.year);
const yearSpan = `${Math.min(...pubYears)}–${Math.max(...pubYears)}`;
// `plot` keeps zero-publication thrusts (Data, Sports, ...) drawn as an empty
// track with a "0" label instead of vanishing: Recharts skips zero-width bars.
const chartData = [...thrusts].sort((a, b) => b.pubs - a.pubs).map((t) => ({ ...t, plot: Math.max(t.pubs, 0.001) }));

export default function Research() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");

  const filtered = useMemo(() => {
    return thrusts.filter((t) => {
      const matchesTag = tag === "All" || t.tag === tag;
      const matchesQuery =
        !query.trim() ||
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.summary.toLowerCase().includes(query.toLowerCase());
      return matchesTag && matchesQuery;
    });
  }, [query, tag]);

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
            <span className="eyebrow">Research</span>
            <Headline as="h1" onMount className="display-2 mt-6 max-w-[18ch]">Twelve thrusts, *one searchable* database</Headline>
            <p className="lead mt-8 max-w-xl">
              Formerly a static, densely-written page — now scannable cards you can
              filter by topic or search directly.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-x-10 gap-y-8 border-t border-ink-100 pt-8 sm:max-w-md">
              <div>
                <div className="tnum font-display text-[clamp(2rem,3.2vw,2.75rem)] leading-none tracking-[-0.03em] text-ink-900">
                  <AnimatedCounter value={thrusts.length} />
                </div>
                <div className="mono-label mt-2 text-slate-muted">Research thrusts</div>
              </div>
              <div>
                <div className="tnum font-display text-[clamp(2rem,3.2vw,2.75rem)] leading-none tracking-[-0.03em] text-ink-900">
                  <AnimatedCounter value={totalPubs} />
                </div>
                <div className="mono-label mt-2 text-slate-muted">Publications indexed</div>
              </div>
              <div>
                <div className="tnum font-display text-[clamp(2rem,3.2vw,2.75rem)] leading-none tracking-[-0.03em] text-ink-900">
                  <AnimatedCounter value={institutionCount} />
                </div>
                <div className="mono-label mt-2 text-slate-muted">Institutions contributing</div>
              </div>
              <div>
                <div className="tnum font-display text-[clamp(2rem,3.2vw,2.75rem)] leading-none tracking-[-0.03em] text-ink-900">{yearSpan}</div>
                <div className="mono-label mt-2 text-slate-muted">Publication years</div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-3 shadow-card ring-1 ring-ink-100/60 sm:max-w-md">
                <Search size={17} className="shrink-0 text-slate-muted" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search research thrusts…"
                  className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-muted"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => {
                  const isAll = t === "All";
                  const c = !isAll ? colorMap[tagColorKey[t]] : null;
                  const active = tag === t;
                  return (
                    <button
                      key={t}
                      onClick={() => setTag(t)}
                      className={`chip rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                        isAll
                          ? active
                            ? "bg-brand-500 text-white"
                            : "bg-white text-ink-700 ring-1 ring-ink-100 hover:bg-ink-50"
                          : active
                            ? `${c.dot} ${c.activeText}`
                            : `${c.bg} ${c.text} ring-1 ${c.ring} hover:brightness-95`
                      }`}
                    >
                      {t}
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
                <div className="mono-label text-slate-muted">Publications by thrust</div>
                <div className="mono-label tnum text-ink-900">{totalPubs} total</div>
              </div>
              <div
                className="mt-6"
                role="img"
                aria-label={`Bar chart of publications per research thrust: ${chartData.map((t) => `${t.tag} ${t.pubs}`).join(", ")}.`}
              >
                <ResponsiveContainer width="100%" height={chartData.length * 38 + 8}>
                  <BarChart data={chartData} layout="vertical" margin={{ top: 4, right: 36, bottom: 4, left: 0 }}>
                    <XAxis type="number" hide />
                    <YAxis
                      type="category"
                      dataKey="tag"
                      width={96}
                      tick={axisTick}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      {...tooltipTheme}
                      formatter={(_value, _name, item) => [`${item?.payload?.pubs} publications`, item?.payload?.name]}
                    />
                    <Bar
                      dataKey="plot"
                      radius={[0, 4, 4, 0]}
                      barSize={16}
                      background={{ fill: "rgba(10,10,14,0.05)", radius: 4 }}
                    >
                      {chartData.map((t) => (
                        <Cell key={t.id} fill={hexFor[t.color] ?? hexFor.rose} />
                      ))}
                      <LabelList
                        dataKey="plot"
                        content={({ x, y, width, height, index }) => (
                          <text
                            x={x + width + 8}
                            y={y + height / 2}
                            dy="0.35em"
                            {...valueLabelLight}
                          >
                            {chartData[index].pubs}
                          </text>
                        )}
                      />
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
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <SearchX size={28} className="mb-3 text-ink-200" />
            <p className="text-slate-muted">No thrusts match your search.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t, i) => (
              <ThrustCard key={t.id} thrust={t} index={i} />
            ))}
          </div>
        )}
      </section>
    </PageTransition>
  );
}
