import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts";
import { Search, SearchX, ExternalLink } from "lucide-react";
import PageTransition from "../components/PageTransition";
import AnimatedCounter from "../components/AnimatedCounter";
import { LinkWrap } from "../components/Card";
import StudentSpotlight from "../components/StudentSpotlight";
import { people, students, staff, colorMap } from "../data/mockData";
import { Headline, Reveal } from "../components/fx/Reveal";
import {
  axisTickLight as axisTick,
  tooltipThemeLight as tooltipTheme,
  chartColorsLight as chartColors,
  valueLabelLight,
} from "../components/chartTheme";
import XrayPhoto from "../components/fx/XrayPhoto";

const studentInstitutions = [...new Set(students.map((s) => s.instCode))].sort();

const instColorKey = { UH: "rose", ASU: "orange", TEC: "green", UMH: "maroon" };
const instHex = chartColors;
const colorForInst = (code) => colorMap[instColorKey[code]] ?? colorMap.rose;

const institutionCount = new Set([
  ...people.map((p) => p.institution),
  ...students.map((s) => s.institution),
  ...staff.map((s) => s.institution),
]).size;

// Names in the source directory carry annotations like ", PhD (F'21)" — strip
// those before building a search query so it targets the person, not the note.
const cleanName = (name) => name.split(/[,(]/)[0].trim();
const linkedinUrl = (name) => `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(cleanName(name))}`;

const studentsByInst = studentInstitutions
  .map((code) => ({ code, count: students.filter((s) => s.instCode === code).length }))
  .sort((a, b) => b.count - a.count);

export default function People() {
  const [studentQuery, setStudentQuery] = useState("");
  const [studentInst, setStudentInst] = useState("All");

  const filteredStudents = useMemo(() => {
    const q = studentQuery.toLowerCase();
    return students.filter((s) => {
      const matchesInst = studentInst === "All" || s.instCode === studentInst;
      const matchesQuery = !q || s.name.toLowerCase().includes(q) || s.details.toLowerCase().includes(q);
      return matchesInst && matchesQuery;
    });
  }, [studentQuery, studentInst]);

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
            <span className="eyebrow">People</span>
            <Headline as="h1" onMount className="display-2 mt-6 max-w-[18ch]">Leadership, students, and staff across *the network*</Headline>
            <p className="lead mt-8 max-w-xl">
              Real names, real roles, real institutions — pulled directly from
              nsfbrain.org's own leadership, student, and staff directories.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-x-10 gap-y-8 border-t border-ink-100 pt-8 sm:max-w-md">
              <div>
                <div className="tnum font-display text-[clamp(2rem,3.2vw,2.75rem)] leading-none tracking-[-0.03em] text-ink-900">
                  <AnimatedCounter value={people.length} />
                </div>
                <div className="mono-label mt-2 text-slate-muted">Leadership</div>
              </div>
              <div>
                <div className="tnum font-display text-[clamp(2rem,3.2vw,2.75rem)] leading-none tracking-[-0.03em] text-ink-900">
                  <AnimatedCounter value={students.length} />
                </div>
                <div className="mono-label mt-2 text-slate-muted">Students</div>
              </div>
              <div>
                <div className="tnum font-display text-[clamp(2rem,3.2vw,2.75rem)] leading-none tracking-[-0.03em] text-ink-900">
                  <AnimatedCounter value={staff.length} />
                </div>
                <div className="mono-label mt-2 text-slate-muted">Staff</div>
              </div>
              <div>
                <div className="tnum font-display text-[clamp(2rem,3.2vw,2.75rem)] leading-none tracking-[-0.03em] text-ink-900">
                  <AnimatedCounter value={institutionCount} />
                </div>
                <div className="mono-label mt-2 text-slate-muted">Institutions</div>
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
                <div className="mono-label text-slate-muted">Students by institution</div>
                <div className="mono-label tnum text-ink-900">{students.length} total</div>
              </div>
              <div
                className="mt-6"
                role="img"
                aria-label={`Bar chart of students per institution: ${studentsByInst.map((r) => `${r.code} ${r.count}`).join(", ")}.`}
              >
                <ResponsiveContainer width="100%" height={studentsByInst.length * 58 + 8}>
                  <BarChart data={studentsByInst} layout="vertical" margin={{ top: 4, right: 40, bottom: 4, left: 0 }}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="code" width={48} tick={axisTick} axisLine={false} tickLine={false} />
                    <Tooltip {...tooltipTheme} formatter={(v) => [`${v} students`, ""]} />
                    <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={26}>
                      {studentsByInst.map((row) => (
                        <Cell key={row.code} fill={instHex[instColorKey[row.code]] ?? instHex.rose} />
                      ))}
                      <LabelList dataKey="count" position="right" {...valueLabelLight} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      </section>

      {/* Leadership: a portrait grid. Photos sit in greyscale and warm to full
          colour on hover; each links to a LinkedIn people-search for that name. */}
      <section className="container-page pb-28 pt-20">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-ink-100 pb-8">
          <div>
            <span className="eyebrow">Leadership</span>
            <Headline as="h2" className="display-2 mt-4 max-w-3xl">
              The people *steering the work*
            </Headline>
          </div>
          <span className="mono-label tnum text-slate-muted">{people.length} profiles</span>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-3 lg:grid-cols-4">
          {people.map((p, i) => (
            <Reveal key={p.name} delay={(i % 4) * 0.07} y={44}>
              <LinkWrap to={linkedinUrl(p.name)} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-ink-50">
                  {p.photo ? (
                    <XrayPhoto src={p.photo} alt={p.name} className="h-full w-full" />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center font-display text-7xl text-slate-muted">
                      {p.name
                        .split(" ")
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                  )}
                  <span className="mono-label tnum absolute left-3 top-3 bg-paper/90 px-2 py-1 text-ink-900">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-[1.35rem] leading-[1.04] text-ink-900">
                  <span className="link-draw">{p.name}</span>
                </h3>
                <p className="mono-label mt-2 text-signal-ink">{p.title}</p>
                <p className="mt-1 text-sm text-slate-muted">{p.institution}</p>
              </LinkWrap>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Students: a typographic directory, not a wall of boxes. */}
      <section className="bg-paper-2 section-pad">
        <div className="container-page">
          <span className="eyebrow">Students</span>
          <Headline as="h2" className="display-2 mt-4 max-w-4xl">
            {`${students.length} student researchers across *the network*`}
          </Headline>
          <p className="lead mt-6 max-w-2xl">
            Graduate and undergraduate students conducting research across BRAIN Center partner institutions, real
            names pulled from the Center's own student directory.
          </p>

          <div className="mt-10 flex flex-col gap-4">
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-3 ring-1 ring-ink-100 sm:max-w-md">
              <Search size={17} className="shrink-0 text-slate-muted" />
              <input
                value={studentQuery}
                onChange={(e) => setStudentQuery(e.target.value)}
                aria-label="Search students by name or program"
                placeholder="Search students by name or program…"
                className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-muted"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setStudentInst("All")}
                aria-pressed={studentInst === "All"}
                className={`chip rounded-full px-4 py-2 transition-colors ${
                  studentInst === "All" ? "bg-brand-500 text-white" : "bg-transparent text-ink-900 ring-1 ring-ink-100 hover:bg-white"
                }`}
              >
                All institutions
              </button>
              {studentInstitutions.map((code) => {
                const c = colorForInst(code);
                const active = studentInst === code;
                return (
                  <button
                    key={code}
                    onClick={() => setStudentInst(code)}
                    aria-pressed={active}
                    className={`chip rounded-full px-4 py-2 transition-colors ${
                      active ? `${c.dot} ${c.activeText}` : `${c.bg} ${c.text} ring-1 ${c.ring}`
                    }`}
                  >
                    {code}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="mono-label tnum mt-8 text-slate-muted">{filteredStudents.length} students</p>
          <div className="mt-3 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStudents.map((s, i) => {
              const c = colorForInst(s.instCode);
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px 0px" }}
                  transition={{ duration: 0.4, delay: (i % 9) * 0.03 }}
                  className="border-t border-ink-900/15"
                >
                  <LinkWrap
                    to={linkedinUrl(s.name)}
                    className="group grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 py-4 pl-1 transition-colors hover:bg-white/70"
                  >
                    <span className="font-display text-[1.15rem] leading-tight text-ink-900">{s.name}</span>
                    <span className="mono-label inline-flex items-center gap-2 self-start pt-1.5 text-ink-900">
                      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
                      {s.instCode}
                      {s.alum && <span className="text-slate-muted">· Alum</span>}
                    </span>
                    <span className="col-span-2 text-xs leading-relaxed text-slate-muted">{s.details}</span>
                    <span className="col-span-2 mt-1 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-900 opacity-0 transition-opacity group-hover:opacity-100">
                      Find on LinkedIn <ExternalLink size={11} />
                    </span>
                  </LinkWrap>
                </motion.div>
              );
            })}
          </div>
          {filteredStudents.length === 0 && (
            <div className="flex flex-col items-center py-12 text-center">
              <SearchX size={24} className="mb-2 text-slate-muted" />
              <p className="text-sm text-slate-muted">No students match your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Student spotlight — rotating carousel, text-only since we don't
          have individual student photos, only their directory info. */}
      <StudentSpotlight />

      {/* Staff */}
      <section className="section-pad container-page">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-ink-100 pb-8">
          <div>
            <span className="eyebrow">Staff</span>
            <Headline as="h2" className="display-2 mt-4">
              Keeping it *running*
            </Headline>
          </div>
          <span className="mono-label tnum text-slate-muted">{staff.length} people</span>
        </div>
        <div className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {staff.map((s, i) => (
            <Reveal key={s.name} delay={(i % 3) * 0.07} className="border-t border-ink-900/15">
              <LinkWrap to={linkedinUrl(s.name)} className="group block py-5 pl-1 transition-colors hover:bg-white/70">
                <div className="font-display text-[1.3rem] leading-tight text-ink-900">
                  <span className="link-draw">{s.name}</span>
                </div>
                <div className="mono-label mt-2 text-signal-ink">{s.title}</div>
                <div className="mt-1 text-sm text-slate-muted">{s.institution}</div>
              </LinkWrap>
            </Reveal>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
