import { useMemo, useRef, useState } from "react";
import { ComposableMap, Geographies, Geography, Graticule, Marker, ZoomableGroup } from "react-simple-maps";
import { geoInterpolate, geoMercator } from "d3-geo";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Plus, Minus, Maximize2 } from "lucide-react";
import worldTopo from "../data/world-110m.json";

// Network colours — also used by the legends on Home and About.
export const groupColor = { brain: "#FF4A1C", accelnet: "#2EE6C5", mdrn: "#FFB627" };

const HUB = [-95.34, 29.72]; // University of Houston
const CENTER = [-57, 40];
const W = 800;
const H = 430;

// Countries that host at least one partner get a slightly lighter land tone.
// (ISO 3166-1 numeric ids as used by world-atlas: US, MX, ES, CH, GB, DE.)
const PARTNER_COUNTRIES = new Set(["840", "484", "724", "756", "826", "276"]);

// Same projection react-simple-maps builds from projectionConfig={{ scale: 280 }},
// so hand-drawn arcs land exactly on the pins.
const projection = geoMercator().scale(280).translate([W / 2, H / 2]);

// A great-circle arc between two [lon, lat] points, sampled and projected into
// an SVG path. Mercator bends great circles into the classic flight-path curve.
function arcPath(from, to, steps = 44) {
  const interp = geoInterpolate(from, to);
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const p = projection(interp(i / steps));
    if (!p) continue;
    d += `${d ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`;
  }
  return d;
}

export default function NetworkMap({ pins, active, onSelect }) {
  const wrapRef = useRef(null);
  const inView = useInView(wrapRef, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(null);
  const [pos, setPos] = useState({ coordinates: CENTER, zoom: 1 });

  const targets = useMemo(
    () =>
      pins
        .filter((p) => p.lon !== HUB[0] || p.lat !== HUB[1])
        .map((p) => ({ ...p, d: arcPath(HUB, [p.lon, p.lat]), color: groupColor[p.group] ?? groupColor.brain })),
    [pins]
  );

  const zoomIn = () => setPos((p) => ({ ...p, zoom: Math.min(p.zoom * 1.6, 5) }));
  const zoomOut = () => setPos((p) => ({ ...p, zoom: Math.max(p.zoom / 1.6, 1) }));
  const reset = () => setPos({ coordinates: CENTER, zoom: 1 });

  const ctrl =
    "flex h-11 w-11 items-center justify-center text-paper transition-colors hover:bg-white/10 focus-visible:bg-white/10";

  return (
    <div
      ref={wrapRef}
      role="group"
      aria-label={`Network map of ${pins.length} partner institutions. Tab to a pin and press Enter to see its details.`}
      className="on-dark relative h-full w-full bg-ink"
    >
      <style>{`
        @keyframes bh-flow { to { stroke-dashoffset: -28; } }
        .bh-flow { stroke-dasharray: 3 11; animation: bh-flow 1.2s linear infinite; }
        @keyframes bh-ring { 0% { r: 7; opacity: .7; } 100% { r: 26; opacity: 0; } }
        .bh-ring { animation: bh-ring 2.6s cubic-bezier(.2,.6,.4,1) infinite; }
      `}</style>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 280 }}
        width={W}
        height={H}
        style={{ width: "100%", height: "100%" }}
      >
        <defs>
          <radialGradient id="bh-ocean" cx="35%" cy="55%" r="80%">
            <stop offset="0%" stopColor="#14141C" />
            <stop offset="100%" stopColor="#0A0A0E" />
          </radialGradient>
        </defs>
        <rect x={0} y={0} width={W} height={H} fill="url(#bh-ocean)" />

        <ZoomableGroup center={pos.coordinates} zoom={pos.zoom} minZoom={1} maxZoom={5} onMoveEnd={setPos}>
          <Graticule stroke="rgba(255,255,255,0.06)" strokeWidth={0.4} step={[15, 15]} />

          <Geographies geography={worldTopo}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const partner = PARTNER_COUNTRIES.has(String(geo.id));
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={partner ? "#20202B" : "#14141B"}
                    stroke={partner ? "#3A3A4A" : "#23232E"}
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: partner ? "#2C2C3A" : "#1B1B24" },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* Connections: a dim base arc that draws in, a flowing dash on top, and a
              travelling signal pulse. Pulses are SMIL, so they are skipped entirely
              under reduced motion. */}
          {targets.map((t, i) => (
            <g key={`arc-${t.name}`}>
              <path
                d={t.d}
                fill="none"
                stroke={t.color}
                strokeOpacity={0.4}
                strokeWidth={1}
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                style={{
                  strokeDashoffset: inView || reduce ? 0 : 1,
                  transition: reduce ? "none" : `stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1) ${i * 0.045}s`,
                }}
              />
              {inView && !reduce && (
                <>
                  <path
                    d={t.d}
                    fill="none"
                    stroke={t.color}
                    strokeOpacity={0.9}
                    strokeWidth={0.9}
                    strokeLinecap="round"
                    className="bh-flow"
                    style={{ animationDelay: `${i * 0.06}s` }}
                  />
                  <circle r={2} fill="#FBFAF7">
                    <animateMotion dur={`${3.2 + (i % 5) * 0.5}s`} begin={`${1.4 + i * 0.35}s`} repeatCount="indefinite" path={t.d} />
                  </circle>
                  <circle r={6} fill={t.color} opacity={0.25}>
                    <animateMotion dur={`${3.2 + (i % 5) * 0.5}s`} begin={`${1.4 + i * 0.35}s`} repeatCount="indefinite" path={t.d} />
                  </circle>
                </>
              )}
            </g>
          ))}

          {pins.map((p) => {
            const color = groupColor[p.group] ?? groupColor.brain;
            const isHub = p.lon === HUB[0] && p.lat === HUB[1];
            const r = isHub ? 6.5 : 4.5;
            return (
              <Marker
                key={p.name}
                coordinates={[p.lon, p.lat]}
                // Each pin is a real, keyboard-operable control: focusable, named,
                // activatable with Enter/Space, and shows the same on-map label on
                // focus that the mouse gets on hover.
                tabIndex={0}
                role="button"
                aria-label={`${p.name}. ${p.sub}`}
                aria-pressed={active?.name === p.name}
                onClick={() => onSelect(p)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(p);
                  }
                }}
                onMouseEnter={() => setHovered(p.name)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(p.name)}
                onBlur={() => setHovered(null)}
              >
                {isHub && !reduce && <circle className="bh-ring" fill="none" stroke={color} strokeWidth={1.2} />}
                {isHub && <circle r={20} fill={color} opacity={0.1} />}
                <motion.circle
                  r={r}
                  fill={color}
                  stroke="#0A0A0E"
                  strokeWidth={1.8}
                  whileHover={{ scale: 1.5 }}
                  style={{ cursor: "pointer", transformOrigin: "center", transformBox: "fill-box" }}
                />
                {active?.name === p.name && <circle r={r + 5} fill="none" stroke={color} strokeWidth={1.2} opacity={0.9} />}
              </Marker>
            );
          })}

          {/* Rendered last so the label always paints above every pin. */}
          {hovered &&
            (() => {
              const hp = pins.find((p) => p.name === hovered);
              if (!hp) return null;
              const label = hp.name.length > 26 ? hp.name.slice(0, 24) + "…" : hp.name;
              const w = Math.min(hp.name.length, 26) * 5.6 + 18;
              return (
                <Marker key="hover-label" coordinates={[hp.lon, hp.lat]}>
                  <g pointerEvents="none">
                    <rect x={-w / 2} y={-30} width={w} height={17} fill="#FBFAF7" />
                    <text x={0} y={-18} textAnchor="middle" fontSize={8.5} fontWeight={500} fill="#0A0A0E" style={{ fontFamily: "'Geist Mono', monospace", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                      {label}
                    </text>
                  </g>
                </Marker>
              );
            })()}
        </ZoomableGroup>
      </ComposableMap>

      <div className="absolute bottom-3 right-3 flex flex-col border border-white/15 bg-ink/80 backdrop-blur-sm">
        <button onClick={zoomIn} aria-label="Zoom in" className={ctrl}>
          <Plus size={15} />
        </button>
        <button onClick={zoomOut} aria-label="Zoom out" className={`${ctrl} border-y border-white/15`}>
          <Minus size={15} />
        </button>
        <button onClick={reset} aria-label="Reset view" className={ctrl}>
          <Maximize2 size={13} />
        </button>
      </div>
    </div>
  );
}
