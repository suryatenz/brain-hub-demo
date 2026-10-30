import { useRef } from "react";
import SkeletonImage from "../SkeletonImage";

// Portrait with an "x-ray" lens. The photo sits in greyscale; when the pointer
// is over the card the picture warms to colour and a circular lens follows the
// pointer, showing the same photo as an inverted, cyan-tinted radiograph with
// faint scan lines.
//
// The lens is pure CSS (a masked duplicate of the photo). The pointer only
// writes two custom properties, so there is no React state or re-render per
// mouse move. Touch devices get no lens (a tap follows the link instead), and
// keyboard focus on the parent link shows the lens at its resting position.
//
// Requires a `group` ancestor: hover / focus state comes from `group-hover` /
// `group-focus-visible`.
const XRAY_FILTER =
  "grayscale(1) invert(1) contrast(1.55) brightness(1.05) sepia(1) hue-rotate(135deg) saturate(3.2)";

const SHOW =
  "opacity-0 transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-100 group-focus-visible:opacity-100";

export default function XrayPhoto({ src, alt, className = "", lens = 52 }) {
  const box = useRef(null);

  function onPointerMove(e) {
    if (e.pointerType === "touch" || !box.current) return;
    const r = box.current.getBoundingClientRect();
    box.current.style.setProperty("--xx", `${e.clientX - r.left}px`);
    box.current.style.setProperty("--xy", `${e.clientY - r.top}px`);
  }

  const mask = `radial-gradient(circle ${lens}px at var(--xx) var(--xy), #000 97%, transparent 100%)`;

  return (
    <div
      ref={box}
      onPointerMove={onPointerMove}
      style={{ "--xx": "50%", "--xy": "38%" }}
      className={`relative overflow-hidden bg-ink-50 ${className}`}
    >
      <SkeletonImage
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full"
        imgClassName="h-full w-full object-cover object-top grayscale group-hover:grayscale-0"
      />

      {/* The lens: same photo, radiograph filter, clipped to a circle. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${SHOW}`}
        style={{ WebkitMaskImage: mask, maskImage: mask }}
      >
        <img
          src={src}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover object-top"
          style={{ filter: XRAY_FILTER }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.28) 0 1px, transparent 1px 3px)" }}
        />
      </div>

      {/* Lens rim + label. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute rounded-full border border-[#2EE6C5] shadow-[0_0_0_1px_rgba(10,10,14,0.55),0_0_24px_rgba(46,230,197,0.45)] ${SHOW}`}
        style={{
          left: "var(--xx)",
          top: "var(--xy)",
          width: lens * 2,
          height: lens * 2,
          transform: "translate(-50%, -50%)",
        }}
      />
      <span
        aria-hidden="true"
        className={`mono-label pointer-events-none absolute bottom-3 left-3 bg-ink px-2 py-1 text-[#2EE6C5] ${SHOW}`}
      >
        X-ray
      </span>
    </div>
  );
}
