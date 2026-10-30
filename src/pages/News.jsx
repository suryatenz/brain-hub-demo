import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Newspaper, Brain, ExternalLink } from "lucide-react";
import PageTransition from "../components/PageTransition";
import AnimatedCounter from "../components/AnimatedCounter";
import SkeletonImage from "../components/SkeletonImage";
import { news, events, colorMap } from "../data/mockData";
import { Headline } from "../components/fx/Reveal";

// Parses y/m/d as local-time components rather than handing the raw string
// to `new Date()` — a date-only ISO string ("2026-06-15") parses as UTC
// midnight, which then renders as the previous day in any timezone behind
// UTC (including US Central), so every date on this page was off by one.
function fmt(date) {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const newsTags = [...new Set(news.map((n) => n.tag))];
const tagColorKey = { Research: "rose", Awards: "orange", Membership: "green", Workforce: "maroon", Partnership: "peach" };
const colorForTag = (tag) => colorMap[tagColorKey[tag]] ?? colorMap.rose;

// Years pulled straight from the "YYYY-MM-DD" string rather than via
// `new Date(...).getFullYear()`, which is one more place the UTC-parsing/
// local-timezone mismatch above could shift a date near a year boundary.
const allYears = [...news.map((n) => n.date), ...events.map((e) => e.date)].map((d) => Number(d.slice(0, 4)));
const yearSpan = `${Math.min(...allYears)}–${Math.max(...allYears)}`;

export default function News() {
  const [tagFilter, setTagFilter] = useState("All");

  const filteredNews = useMemo(
    () => (tagFilter === "All" ? news : news.filter((n) => n.tag === tagFilter)),
    [tagFilter]
  );
  const featured = filteredNews.find((n) => n.featured);
  const rest = filteredNews.filter((n) => !n.featured);

  return (
    <PageTransition>
      <section className="relative border-b border-ink-100">
        <div className="container-page pb-16 pt-16 sm:pb-24 sm:pt-24">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="eyebrow">News &amp; Events</span>
          <Headline as="h1" onMount className="display-2 mt-6 max-w-[18ch]">Hosted natively — no more *stub links* or calendar embeds</Headline>
          <p className="lead mt-8 max-w-xl">
            News previously linked out to uh.edu with no preview; events lived
            in a slow-loading Google Calendar iframe. Both now live on-site, in
            the same design system as everything else — every story still
            credits its original source.
          </p>

          <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
            <div>
              <div className="tnum font-display text-[clamp(2rem,3.2vw,2.75rem)] leading-none tracking-[-0.03em] text-ink-900">
                <AnimatedCounter value={news.length} />
              </div>
              <div className="mono-label mt-2 text-slate-muted">News stories</div>
            </div>
            <div>
              <div className="tnum font-display text-[clamp(2rem,3.2vw,2.75rem)] leading-none tracking-[-0.03em] text-ink-900">
                <AnimatedCounter value={events.length} />
              </div>
              <div className="mono-label mt-2 text-slate-muted">Upcoming events</div>
            </div>
            <div>
              <div className="tnum font-display text-[clamp(2rem,3.2vw,2.75rem)] leading-none tracking-[-0.03em] text-ink-900">{yearSpan}</div>
              <div className="mono-label mt-2 text-slate-muted">Years covered</div>
            </div>
          </div>
        </motion.div>
      </div>
      </section>

      <section className="container-page pb-16">
        <div className="mb-4 flex items-center gap-2">
          <Newspaper size={18} className="text-brand-500" />
          <h2 className="display-3 text-ink-900">News</h2>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setTagFilter("All")}
            className={`chip rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
              tagFilter === "All" ? "bg-brand-500 text-white" : "bg-white text-ink-700 ring-1 ring-ink-100 hover:bg-ink-50"
            }`}
          >
            All
          </button>
          {newsTags.map((tag) => {
            const c = colorForTag(tag);
            const active = tagFilter === tag;
            return (
              <button
                key={tag}
                onClick={() => setTagFilter(tag)}
                className={`chip rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  active ? `${c.dot} ${c.activeText}` : `${c.bg} ${c.text} ring-1 ${c.ring} hover:brightness-95`
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {featured && (
          <motion.a
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px 0px" }}
            transition={{ duration: 0.4 }}
            className="group mb-6 grid gap-0 overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-ink-100/60 sm:grid-cols-2"
          >
            <SkeletonImage
              src={featured.image}
              alt={featured.title}
              className="aspect-[4/3] sm:aspect-auto"
              imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="flex flex-col justify-center p-6 sm:p-8">
              <span className={`mb-3 w-fit rounded-full px-3 py-1 text-xs font-semibold ring-1 ${colorForTag(featured.tag).bg} ${colorForTag(featured.tag).text} ${colorForTag(featured.tag).ring}`}>
                Featured · {featured.tag}
              </span>
              <h3 className="display-3 text-ink-900">{featured.title}</h3>
              <p className="mt-3 text-sm text-slate-muted">{fmt(featured.date)}</p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-brand-500 opacity-0 transition-opacity group-hover:opacity-100">
                Source <ExternalLink size={12} />
              </div>
            </div>
            <span className="sr-only"> (opens in a new tab)</span>
            </motion.a>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((n, i) => (
            <motion.a
              key={n.id}
              href={n.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px 0px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="group block overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-ink-100/60 transition-shadow hover:shadow-cardHover"
            >
              <div className="aspect-video w-full overflow-hidden bg-brand-50">
                {n.image ? (
                  <SkeletonImage
                    src={n.image}
                    alt={n.title}
                    loading="lazy"
                    className="h-full w-full"
                    imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-100 to-accent-peach/30">
                    <Brain size={32} className="text-brand-300" />
                  </div>
                )}
              </div>
              <div className="p-5">
                <span className={`mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ring-1 ${colorForTag(n.tag).bg} ${colorForTag(n.tag).text} ${colorForTag(n.tag).ring}`}>
                  {n.tag}
                </span>
                <h3 className="font-display text-[1.25rem] leading-[1.08] tracking-[-0.015em] text-ink-900">{n.title}</h3>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <p className="text-sm text-slate-muted">{fmt(n.date)}</p>
                  <span className="flex items-center gap-1 text-xs font-semibold text-brand-500 opacity-0 transition-opacity group-hover:opacity-100">
                    Source <ExternalLink size={11} />
                  </span>
                </div>
              </div>
              <span className="sr-only"> (opens in a new tab)</span>
            </motion.a>
          ))}
        </div>
      </section>

      <section className="container-page pb-24">
        <div className="mb-2 flex items-center gap-2">
          <CalendarDays size={18} className="text-brand-500" />
          <h2 className="display-3 text-ink-900">Upcoming events</h2>
        </div>
        <p className="mb-6 text-sm text-slate-muted">Hover a card for a look at the event, or click through for details.</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((e, i) => (
            <motion.a
              key={e.id}
              href={e.url || "https://www.nsfbrain.org/events"}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px 0px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative block aspect-[4/5] overflow-hidden rounded-2xl shadow-card ring-1 ring-ink-100/60"
            >
              <img
                src={e.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full scale-105 object-cover opacity-40 saturate-50 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 group-hover:saturate-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/30 to-transparent transition-opacity duration-500 group-hover:from-ink-900/70 group-hover:via-ink-900/10" />
              <div className="relative flex h-full flex-col justify-end p-5 text-white">
                <span className="mb-2 w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                  {e.type}
                </span>
                <div className="font-display text-[1.3rem] leading-[1.05]">{e.title}</div>
                <div className="mt-2 flex items-center gap-1.5 text-sm text-white/80">
                  <MapPin size={13} /> {e.location}
                </div>
                <div className="mt-1 text-sm font-medium text-white/90">{fmt(e.date)}</div>
                <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                  More info <ExternalLink size={11} />
                </div>
              </div>
              <span className="sr-only"> (opens in a new tab)</span>
            </motion.a>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
