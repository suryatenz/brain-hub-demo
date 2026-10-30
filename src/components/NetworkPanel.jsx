import { useState } from "react";
import NetworkMap, { groupColor } from "./NetworkMap";
import { networkPins } from "../data/mockData";

const legend = [
  { group: "brain", label: "BRAIN Center core site" },
  { group: "accelnet", label: "AccelNet partner" },
  { group: "mdrn", label: "MDRN partner" },
];

// The interactive network map plus its legend and a live "selected pin"
// readout. Shared by Home and About.
export default function NetworkPanel({ className = "" }) {
  const [active, setActive] = useState(null);
  return (
    <div className={`panel-dark overflow-hidden ${className}`}>
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/8]">
        <NetworkMap pins={networkPins} active={active} onSelect={setActive} />
      </div>
      <div className="flex flex-col gap-4 border-t border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="min-h-[2.5rem] text-sm text-paper" aria-live="polite">
          {active ? (
            <span>
              <span className="font-display text-xl">{active.name}</span>
              <span className="mono-label ml-3 text-slate-mutedDark">{active.sub}</span>
            </span>
          ) : (
            <span className="mono-label text-slate-mutedDark">Select a pin to see which institution it is.</span>
          )}
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {legend.map((l) => (
            <li key={l.group} className="mono-label flex items-center gap-2 text-paper">
              <span className="h-2 w-2 rounded-full" style={{ background: groupColor[l.group] }} />
              {l.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
