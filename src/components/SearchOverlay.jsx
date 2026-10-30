import { useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, FlaskConical, FileText, Newspaper, CalendarDays, GraduationCap, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { thrusts, publications, news, events, students, staff, gallery } from "../data/mockData";

// Text colors use the accessible "Ink" shades (>=4.5:1 on white). The result
// type is also spelled out as a text label, so color is never the only cue.
const typeMeta = {
  Thrust: { icon: FlaskConical, color: "text-brand-500", to: "/research" },
  Publication: { icon: FileText, color: "text-accent-roseInk", to: "/publications" },
  News: { icon: Newspaper, color: "text-accent-orangeInk", to: "/news" },
  Event: { icon: CalendarDays, color: "text-accent-greenInk", to: "/news" },
  Student: { icon: GraduationCap, color: "text-accent-maroon", to: "/people" },
  Staff: { icon: GraduationCap, color: "text-accent-maroon", to: "/people" },
  Photo: { icon: ImageIcon, color: "text-brand-600", to: "/gallery" },
};

function buildIndex() {
  const items = [];
  thrusts.forEach((t) => items.push({ type: "Thrust", title: t.name, sub: t.summary, key: `t-${t.id}` }));
  publications.forEach((p) => items.push({ type: "Publication", title: p.title, sub: `${p.authors} · ${p.year}`, key: `p-${p.id}` }));
  news.forEach((n) => items.push({ type: "News", title: n.title, sub: n.date, key: `n-${n.id}` }));
  events.forEach((e) => items.push({ type: "Event", title: e.title, sub: `${e.date} · ${e.location}`, key: `e-${e.id}` }));
  students.forEach((s) => items.push({ type: "Student", title: s.name, sub: s.details, key: `s-${s.id}` }));
  staff.forEach((s) => items.push({ type: "Staff", title: s.name, sub: `${s.title} · ${s.institution}`, key: `st-${s.name}` }));
  gallery.forEach((g, i) => items.push({ type: "Photo", title: g.caption, sub: g.album, key: `g-${i}` }));
  return items;
}

const index = buildIndex();

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return index.filter((i) => i.title.toLowerCase().includes(q) || i.sub?.toLowerCase().includes(q)).slice(0, 12);
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-ink-900/50 px-4 pt-24 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search the hub"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-xl overflow-hidden border border-ink-900/20 bg-paper shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              data-own-focus
              className="flex items-center gap-3 border-b-2 border-ink-100 py-2 pl-5 pr-2 transition-colors focus-within:border-brand-500"
            >
              <Search size={18} className="text-slate-muted" aria-hidden="true" />
              <input
                autoFocus
                type="search"
                aria-label="Search publications, people, projects and news"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search publications, people, projects, news…"
                className="min-h-11 flex-1 bg-transparent text-sm text-ink-900 outline-none placeholder:text-slate-muted"
              />
              <button
                onClick={onClose}
                aria-label="Close search"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full hover:bg-ink-50"
              >
                <X size={18} className="text-slate-muted" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto thin-scroll p-2" aria-live="polite">
              {query.trim() && results.length === 0 && (
                <div className="px-4 py-8 text-center text-sm text-slate-muted">
                  No results for “{query}”.
                </div>
              )}
              {results.map((r) => {
                const meta = typeMeta[r.type];
                const Icon = meta.icon;
                return (
                  <button
                    key={r.key}
                    onClick={() => {
                      navigate(meta.to);
                      onClose();
                    }}
                    className="flex w-full items-start gap-3 px-3 py-3 text-left transition-colors hover:bg-white"
                  >
                    <Icon size={16} className={`mt-0.5 shrink-0 ${meta.color}`} />
                    <div className="min-w-0">
                      <div className="truncate font-display text-[1.15rem] leading-tight text-ink-900">{r.title}</div>
                      <div className="text-xs text-slate-muted">
                        <span className={`font-mono text-[10px] font-medium uppercase tracking-[0.12em] ${meta.color}`}>{r.type}</span> · {r.sub}
                      </div>
                    </div>
                  </button>
                );
              })}
              {!query.trim() && (
                <div className="px-4 py-8 text-center text-sm text-slate-muted">
                  Try “EEG”, “rehabilitation”, or “AccelNet”.
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
