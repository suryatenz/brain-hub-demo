import { lazy, Suspense, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { AuthProvider } from "./context/AuthContext";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Preloader from "./components/fx/Preloader";
import ScrollProgress from "./components/fx/ScrollProgress";
import SpotlightTracker from "./components/fx/SpotlightTracker";
import Home from "./pages/Home";

// Every page except Home is its own chunk, so the first visit only downloads
// what Home needs (charts, the world map and its data load with the pages that
// use them). The loaders are kept so the chunks can be prefetched while idle:
// by the time someone clicks a nav link the page is usually already cached.
const loaders = {
  about: () => import("./pages/About"),
  research: () => import("./pages/Research"),
  publications: () => import("./pages/Publications"),
  people: () => import("./pages/People"),
  gallery: () => import("./pages/Gallery"),
  news: () => import("./pages/News"),
  membership: () => import("./pages/Membership"),
  hub: () => import("./pages/Hub"),
  login: () => import("./pages/Login"),
  notFound: () => import("./pages/NotFound"),
};
const About = lazy(loaders.about);
const Research = lazy(loaders.research);
const Publications = lazy(loaders.publications);
const People = lazy(loaders.people);
const Gallery = lazy(loaders.gallery);
const News = lazy(loaders.news);
const Membership = lazy(loaders.membership);
const Hub = lazy(loaders.hub);
const Login = lazy(loaders.login);
const NotFound = lazy(loaders.notFound);

const page = (Component) => (
  <Suspense fallback={null}>
    <Component />
  </Suspense>
);

const SITE_TITLE = "NSF BRAIN Hub — Demo Redesign";
const PAGE_TITLES = {
  "/about": "About",
  "/research": "Research",
  "/publications": "Publications",
  "/people": "People",
  "/gallery": "Gallery",
  "/news": "News & Events",
  "/membership": "Membership",
  "/hub": "Central Hub",
  "/login": "Sign in",
};

export default function App() {
  const location = useLocation();
  const mainRef = useRef(null);
  const firstRender = useRef(true);

  // A single-page app never reloads, so the tab title has to follow the route
  // (it is also what a screen reader announces after navigation).
  useEffect(() => {
    const name = location.pathname === "/" ? null : (PAGE_TITLES[location.pathname] ?? "Page not found");
    document.title = name ? `${name} · BRAIN Hub` : SITE_TITLE;
  }, [location.pathname]);

  // Warm the other pages' chunks once the browser is idle (skipped when the
  // visitor has asked for reduced data use or is on a very slow connection).
  useEffect(() => {
    const conn = navigator.connection;
    if (conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? "")) return;
    const run = () => Object.values(loaders).forEach((load) => load());
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(run, { timeout: 5000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(run, 2500);
    return () => clearTimeout(id);
  }, []);

  // On client-side navigation the browser keeps the old scroll offset and
  // leaves keyboard/screen-reader focus on the link that was clicked. Reset
  // both: scroll to the top and move focus to <main> so the new page's
  // content is what gets read/tabbed next. The focus reset is skipped for the
  // initial load (don't steal focus from the skip link).
  //
  // "#anchor" URLs (Home links to /about#network-map) need their own handling:
  // the browser can't scroll to an element that a lazily-loaded page and the
  // route transition haven't rendered yet, so wait for it to appear.
  useEffect(() => {
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1));
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let tries = 0;
      const timer = setInterval(() => {
        const el = document.getElementById(id);
        if (el) {
          clearInterval(timer);
          el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        } else if (++tries > 50) {
          clearInterval(timer);
        }
      }, 100);
      firstRender.current = false;
      return () => clearInterval(timer);
    }
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    mainRef.current?.focus({ preventScroll: true });
  }, [location.pathname, location.hash]);

  function skipToMain(e) {
    e.preventDefault();
    mainRef.current?.focus();
    mainRef.current?.scrollIntoView();
  }

  return (
    <MotionConfig reducedMotion="user">
      <AuthProvider>
        <Preloader />
        <ScrollProgress />
        <SpotlightTracker />
        <div className="flex min-h-screen flex-col">
          <a
            href="#main"
            onClick={skipToMain}
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[95] focus:rounded-full focus:bg-brand-500 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:shadow-cardHover"
          >
            Skip to main content
          </a>
          <Nav />
          <main id="main" ref={mainRef} tabIndex={-1} className="flex-1 outline-none">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={page(About)} />
                <Route path="/research" element={page(Research)} />
                <Route path="/publications" element={page(Publications)} />
                <Route path="/people" element={page(People)} />
                <Route path="/gallery" element={page(Gallery)} />
                <Route path="/news" element={page(News)} />
                <Route path="/membership" element={page(Membership)} />
                <Route path="/hub" element={page(Hub)} />
                <Route path="/login" element={page(Login)} />
                <Route path="*" element={page(NotFound)} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </MotionConfig>
  );
}
