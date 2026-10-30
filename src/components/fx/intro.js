// Tiny shared flag so the Home hero can time its entrance to the preloader:
// on the first visit of a session it waits for the curtain to lift; on every
// later visit it starts almost immediately.
let done = false;

export function markIntroDone() {
  done = true;
  try {
    sessionStorage.setItem("bh_intro", "1");
  } catch {
    /* sessionStorage can be unavailable (private mode) — the flag above still works */
  }
}

export function introSeen() {
  if (done) return true;
  try {
    return sessionStorage.getItem("bh_intro") === "1";
  } catch {
    return false;
  }
}

// Seconds the hero should wait before animating in.
export function heroDelay() {
  return introSeen() ? 0.05 : 1.55;
}
