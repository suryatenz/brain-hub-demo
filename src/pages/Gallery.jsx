import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Images, PlayCircle, Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import PageTransition from "../components/PageTransition";
import AnimatedCounter from "../components/AnimatedCounter";
import SkeletonImage from "../components/SkeletonImage";
import { gallery, colorMap } from "../data/mockData";
import { Headline } from "../components/fx/Reveal";

const videos = [
  {
    id: "tr5tJ1nyEPc",
    title: "MDRN — Music Networks Pilot Grants Informational Webinar 2026",
  },
  {
    id: "OOeEyTSsNqc",
    title: "MDRN Webinar: Centering Belonging Through Music When Working With Older Adults",
  },
];

// A YouTube embed pulls in well over a megabyte of player script before anyone
// presses play, and there are several on the page. Show YouTube's own poster
// frame with a play button instead, and only load the player on click.
function VideoEmbed({ id, title }) {
  const [playing, setPlaying] = useState(false);
  if (playing) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    );
  }
  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
      className="group relative block h-full w-full bg-ink text-left"
    >
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-ink/60 to-transparent">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-signal text-ink-900 shadow-signal transition-transform duration-300 group-hover:scale-110">
          <Play size={24} fill="currentColor" aria-hidden="true" />
        </span>
      </span>
    </button>
  );
}

const albums = [...new Set(gallery.map((g) => g.album))];
const albumColorKey = { "BRAIN Center Awards": "rose", "Brain Center at Children's Museum": "green", "Spring BRAIN Center Event": "orange", "Faculty & Research": "maroon" };
const colorForAlbum = (album) => colorMap[albumColorKey[album]] ?? colorMap.rose;

export default function Gallery() {
  const [albumFilter, setAlbumFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = useMemo(
    () => (albumFilter === "All" ? gallery : gallery.filter((g) => g.album === albumFilter)),
    [albumFilter]
  );

  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);
  const returnFocusRef = useRef(null);
  const wasOpen = useRef(false);

  const openLightbox = (i) => {
    returnFocusRef.current = document.activeElement;
    setLightboxIndex(i);
  };
  const closeLightbox = () => setLightboxIndex(null);
  const next = () => setLightboxIndex((i) => (i + 1) % filtered.length);
  const prev = () => setLightboxIndex((i) => (i - 1 + filtered.length) % filtered.length);

  const isOpen = lightboxIndex !== null;
  useEffect(() => {
    if (!isOpen) {
      // Closing: hand focus back to the photo that opened the lightbox.
      if (wasOpen.current) {
        wasOpen.current = false;
        const el = returnFocusRef.current;
        if (el && el.isConnected) el.focus();
      }
      return;
    }
    wasOpen.current = true;
    closeBtnRef.current?.focus();
    // Depend only on isOpen (not lightboxIndex) so the listener mounts once
    // per open/close cycle rather than re-subscribing on every arrow-key
    // press — a cheap correctness improvement even though it wasn't the
    // cause of an issue seen during testing (that turned out to be the
    // exit-animation duration, not the listener).
    function onKey(e) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      // aria-modal only tells assistive tech the page behind is inert; the
      // browser still lets Tab walk out to it, so keep Tab inside the dialog.
      if (e.key === "Tab" && dialogRef.current) {
        const items = [...dialogRef.current.querySelectorAll("button")];
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (!dialogRef.current.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const current = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <PageTransition>
      <section className="relative border-b border-ink-100">
        <div className="container-page pb-16 pt-16 sm:pb-24 sm:pt-24">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="eyebrow">Gallery</span>
          <Headline as="h1" onMount className="display-2 mt-6 max-w-[18ch]">The network in *pictures and video*</Headline>
          <p className="lead mt-8 max-w-xl">
            Real photos from BRAIN Center events, faculty, and research — pulled
            from the University of Houston Cullen College of Engineering's own
            newsroom and photo galleries — plus real webinar recordings from the
            Music &amp; Dementia Research Network.
          </p>

          <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
            <div>
              <div className="tnum font-display text-[clamp(2rem,3.2vw,2.75rem)] leading-none tracking-[-0.03em] text-ink-900">
                <AnimatedCounter value={gallery.length} />
              </div>
              <div className="mono-label mt-2 text-slate-muted">Photos</div>
            </div>
            <div>
              <div className="tnum font-display text-[clamp(2rem,3.2vw,2.75rem)] leading-none tracking-[-0.03em] text-ink-900">
                <AnimatedCounter value={videos.length} />
              </div>
              <div className="mono-label mt-2 text-slate-muted">Videos</div>
            </div>
            <div>
              <div className="tnum font-display text-[clamp(2rem,3.2vw,2.75rem)] leading-none tracking-[-0.03em] text-ink-900">
                <AnimatedCounter value={albums.length} />
              </div>
              <div className="mono-label mt-2 text-slate-muted">Albums</div>
            </div>
          </div>
        </motion.div>
      </div>
      </section>

      <section className="container-page pb-20">
        <div className="mb-4 flex items-center gap-2">
          <Images size={18} className="text-brand-500" />
          <h2 className="display-3 text-ink-900">Photos</h2>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setAlbumFilter("All")}
            className={`chip rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
              albumFilter === "All" ? "bg-brand-500 text-white" : "bg-white text-ink-700 ring-1 ring-ink-100 hover:bg-ink-50"
            }`}
          >
            All albums
          </button>
          {albums.map((album) => {
            const c = colorForAlbum(album);
            const active = albumFilter === album;
            return (
              <button
                key={album}
                onClick={() => setAlbumFilter(album)}
                className={`chip rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  active ? `${c.dot} ${c.activeText}` : `${c.bg} ${c.text} ring-1 ${c.ring} hover:brightness-95`
                }`}
              >
                {album}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((g, i) => (
            <motion.button
              key={g.src}
              onClick={() => openLightbox(i)}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px 0px" }}
              transition={{ duration: 0.35, delay: (i % 8) * 0.04 }}
              className="group relative aspect-square overflow-hidden rounded-xl bg-ink-50 text-left"
            >
              <SkeletonImage
                src={g.src}
                alt={g.caption}
                loading="lazy"
                className="h-full w-full"
                imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Decorative repeat of the image's alt text (revealed on hover and
                  keyboard focus) — hidden from screen readers so it isn't read twice. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-end bg-gradient-to-t from-ink-900/80 via-ink-900/0 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                <p className="text-xs font-medium leading-snug text-white">{g.caption}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="bg-ink-50/60 section-pad">
        <div className="container-page">
          <div className="mb-6 flex items-center gap-2">
            <PlayCircle size={18} className="text-brand-500" />
            <h2 className="display-3 text-ink-900">Videos</h2>
          </div>
          <p className="mb-8 max-w-2xl text-sm text-slate-muted">
            Real webinar recordings from the Music &amp; Dementia Research Network's own channel.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            {videos.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px 0px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-ink-100/60"
              >
                <div className="aspect-video w-full">
                  <VideoEmbed id={v.id} title={v.title} />
                </div>
                <p className="p-4 text-sm font-medium text-ink-900">{v.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {current && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Photo viewer, ${lightboxIndex + 1} of ${filtered.length}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="on-dark fixed inset-0 z-50 flex items-center justify-center bg-ink-900/90 p-4 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <button
              ref={closeBtnRef}
              onClick={closeLightbox}
              aria-label="Close photo viewer"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
            >
              <ChevronRight size={22} />
            </button>

            <motion.div
              key={current.src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="flex max-h-[85vh] max-w-3xl flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={current.src}
                alt={current.caption}
                className="max-h-[70vh] w-auto rounded-xl object-contain shadow-2xl"
              />
              <div className="mt-4 max-w-xl text-center">
                <p className="text-sm font-medium text-white">{current.caption}</p>
                <p className="mt-1 text-xs text-white/60">
                  {current.album} · {lightboxIndex + 1} of {filtered.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
