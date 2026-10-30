import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, LogOut } from "lucide-react";
import SearchOverlay from "./SearchOverlay";
import Magnetic from "./fx/Magnetic";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/about", label: "About" },
  { to: "/research", label: "Research" },
  { to: "/publications", label: "Publications" },
  { to: "/people", label: "People" },
  { to: "/gallery", label: "Gallery" },
  { to: "/news", label: "News" },
  { to: "/membership", label: "Membership" },
];

const ROLE_LABELS = { public: "Public", student: "Student", faculty: "Faculty", industry: "Industry", admin: "Admin" };

// A tiny EEG-spike glyph: the brand mark.
function Mark({ className = "" }) {
  return (
    <svg viewBox="0 0 32 20" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 11 H9 L12 3 L16 17 L20 7 L23 11 H31" />
    </svg>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const { pathname } = useLocation();
  const { user, role, signOut, loading } = useAuth();
  const menuButtonRef = useRef(null);
  const menuCloseRef = useRef(null);
  const wasOpen = useRef(false);
  const isHome = pathname === "/";

  // On Home the header floats over the dark hero: light text, transparent.
  // Once the hero is scrolled past, it becomes a paper bar.
  useEffect(() => {
    function onScroll() {
      setOverDark(isHome && window.scrollY < window.innerHeight * 0.82);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Mobile menu is a modal dialog: Escape closes it, focus moves into it when
  // it opens, and returns to the hamburger button that opened it when it closes.
  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      menuCloseRef.current?.focus();
      function onKey(e) {
        if (e.key === "Escape") setOpen(false);
      }
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      menuButtonRef.current?.focus();
    }
  }, [open]);

  const tone = overDark
    ? "on-dark border-white/10 bg-ink/30 text-paper"
    : "border-ink-100/70 bg-paper/85 text-ink-900";

  return (
    <>
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-500 ${tone}`}>
        <div className="container-page flex h-[68px] items-center justify-between gap-6">
          <NavLink to="/" aria-label="BRAIN Hub — home" className="group flex items-center gap-3">
            <Mark className="h-5 w-8 text-signal transition-transform duration-500 ease-out group-hover:scale-x-110" />
            <span className="font-display text-[1.3rem] leading-none tracking-tight">
              BRAIN <em className="italic">Hub</em>
            </span>
          </NavLink>

          <nav aria-label="Main" className="hidden items-center gap-0.5 min-[1380px]:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className="relative whitespace-nowrap px-2.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] opacity-80 transition-opacity hover:opacity-100 aria-[current=page]:opacity-100"
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        className="absolute inset-x-3 -bottom-[1px] h-[2px] bg-signal"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className={`hidden min-h-11 items-center gap-2.5 rounded-full border px-4 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors md:flex ${
                overDark ? "border-white/20 hover:bg-white/10" : "border-ink-100 hover:bg-ink-50"
              }`}
            >
              <Search size={14} />
              <span>Search</span>
              <kbd className={`whitespace-nowrap rounded-sm border px-1.5 py-0.5 text-[10px] ${overDark ? "border-white/20 text-slate-mutedDark" : "border-ink-100 text-slate-muted"}`}>
                {/Mac|iPhone|iPad/.test(navigator.userAgent) ? "⌘K" : "Ctrl K"}
              </kbd>
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-white/10 md:hidden"
              aria-label="Search"
            >
              <Search size={19} />
            </button>

            <span className="hidden sm:inline-block">
              <Magnetic strength={0.25}>
                <Link
                  to="/hub"
                  className="inline-flex min-h-11 items-center whitespace-nowrap rounded-full bg-signal px-5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink-900 transition-transform hover:scale-[1.04]"
                >
                  Central Hub
                </Link>
              </Magnetic>
            </span>

            {!loading &&
              (user ? (
                <div className="hidden items-center gap-1 sm:flex">
                  <span className="rounded-full border border-current px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] opacity-70">
                    {ROLE_LABELS[role]}
                  </span>
                  <button
                    onClick={signOut}
                    className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-white/10"
                    aria-label="Sign out"
                  >
                    <LogOut size={17} />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="link-draw hidden min-h-11 items-center whitespace-nowrap px-3 font-mono text-[11px] uppercase tracking-[0.14em] sm:inline-flex"
                >
                  Sign in
                </Link>
              ))}

            <button
              ref={menuButtonRef}
              className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-white/10 min-[1380px]:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-haspopup="dialog"
            >
              <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-3/5 self-end bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="on-dark fixed inset-0 z-50 flex flex-col bg-ink text-paper min-[1380px]:hidden"
          >
            <div className="container-page flex h-[68px] shrink-0 items-center justify-between">
              <span className="mono-label text-slate-mutedDark">Menu</span>
              <button
                ref={menuCloseRef}
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>
            <div className="container-page flex flex-1 flex-col justify-center gap-1 overflow-y-auto pb-10">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `group block border-b border-white/10 py-3 font-display text-[clamp(1.8rem,8vw,2.8rem)] leading-none transition-colors ${
                        isActive ? "text-signal" : "hover:text-signal"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>
            <div className="container-page flex shrink-0 flex-wrap gap-3 pb-8">
              <Link
                to="/hub"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-11 items-center rounded-full bg-signal px-6 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink-900"
              >
                Central Hub
              </Link>
              {user ? (
                <button
                  onClick={() => {
                    setOpen(false);
                    signOut();
                  }}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-6 font-mono text-[11px] uppercase tracking-[0.14em]"
                >
                  <LogOut size={14} /> Sign out ({ROLE_LABELS[role]})
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-11 items-center rounded-full border border-white/25 px-6 font-mono text-[11px] uppercase tracking-[0.14em]"
                >
                  Sign in
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
