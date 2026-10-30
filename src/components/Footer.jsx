import { NavLink } from "react-router-dom";
import { ArrowUp } from "lucide-react";

const columns = [
  {
    title: "Explore",
    links: [
      { to: "/research", label: "Research Thrusts" },
      { to: "/publications", label: "Publications" },
      { to: "/about", label: "Partner Institutions" },
      { to: "/people", label: "People" },
    ],
  },
  {
    title: "Connect",
    links: [
      { to: "/gallery", label: "Gallery" },
      { to: "/news", label: "News & Events" },
      { to: "/membership", label: "Membership" },
      { to: "/hub", label: "Central Hub (preview)" },
    ],
  },
];

// A plain, quiet footer: brand line, two link columns, a demo notice.
export default function Footer() {
  return (
    <footer className="on-dark bg-ink text-paper">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
        <div>
          <div className="font-display text-xl leading-none">
            BRAIN <em className="italic text-signal">Hub</em>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-mutedDark">
            Building Reliable Advances and Innovations in Neurotechnology — an NSF Industry-University Cooperative
            Research Center, headquartered at the University of Houston, working alongside the Movement, Music &amp;
            BrainHealth AccelNet and the Music &amp; Dementia Research Network.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <div className="mono-label mb-4 text-slate-mutedDark">{col.title}</div>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} className="link-draw text-sm text-paper">
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <div className="mono-label mb-4 text-slate-mutedDark">Demo notice</div>
          <p className="text-sm leading-relaxed text-slate-mutedDark">
            This is a design concept demo. Content is illustrative; no accounts, uploads, or search results are
            connected to real systems.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-4 text-xs text-slate-mutedDark">
          <span>Demo redesign concept · nsfbrain.org · accelnet-brainhealth.org · mdrn.ucsf.edu</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-4 text-paper transition-colors hover:bg-white/10"
          >
            Back to top <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
