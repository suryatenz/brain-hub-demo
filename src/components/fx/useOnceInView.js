import { useEffect, useState } from "react";

// True once the element has scrolled into view (and stays true). A plain
// IntersectionObserver rather than framer-motion's useInView, which has been
// observed to silently never fire for some instances when many mount at once.
export function useOnceInView(ref, rootMargin = "0px 0px -10% 0px") {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin, seen]);
  return seen;
}

// Tracks whether an element is currently on screen (for pausing canvas loops).
export function useIsOnScreen(ref) {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOn(entry.isIntersecting), { rootMargin: "80px" });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return on;
}
