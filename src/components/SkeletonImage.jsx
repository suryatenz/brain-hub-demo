import { useState } from "react";

// Wraps an <img> with a placeholder shown until the image finishes loading,
// then cross-fades to the real photo — used anywhere a grid of photos would
// otherwise pop in abruptly (Gallery, News, People, events).
//
// The <img> transitions opacity, filter and transform together, so callers can
// add hover effects (greyscale -> colour, zoom) via `imgClassName` and they
// animate smoothly instead of snapping.
export default function SkeletonImage({ src, alt, className = "", imgClassName = "", ...rest }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-ink-50" />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`transition-[opacity,filter,transform] duration-700 ease-out ${loaded ? "opacity-100" : "opacity-0"} ${imgClassName}`}
        {...rest}
      />
    </div>
  );
}
