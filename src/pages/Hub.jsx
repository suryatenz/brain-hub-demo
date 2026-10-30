import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { UploadCloud, Lock, CheckCircle2, Database, Search, LayoutDashboard, ShieldCheck } from "lucide-react";
import PageTransition from "../components/PageTransition";
import RequireRole from "../components/RequireRole";
import AdminPanel from "../components/AdminPanel";
import { useAuth } from "../context/AuthContext";
import { roles, thrusts } from "../data/mockData";
import { Headline } from "../components/fx/Reveal";
import {
  axisTickLight as axisTick,
  tooltipThemeLight as tooltipTheme,
  chartColorsLight as chartColors,
  valueLabelLight,
} from "../components/chartTheme";

// Six most-published thrusts (the full 12 live on the Research page).
const barData = [...thrusts]
  .sort((a, b) => b.pubs - a.pubs)
  .slice(0, 6)
  .map((t) => ({ name: t.tag, publications: t.pubs }));
const pieData = [
  { name: "BRAIN Core Sites", value: 9, color: chartColors.rose },
  { name: "AccelNet Networks", value: 5, color: chartColors.green },
  { name: "MDRN Networks", value: 5, color: chartColors.orange },
];
const pieTotal = pieData.reduce((sum, d) => sum + d.value, 0);

const roleAccess = {
  public: ["Publications", "Events", "People"],
  student: ["Publications", "Events", "People", "Shared datasets"],
  faculty: ["Publications", "Events", "People", "Shared datasets", "Upload & edit own records"],
  industry: ["Pre-publication results", "Project reports", "Comment & vote"],
  admin: ["Everything", "Approve uploads", "Manage roles"],
};

export default function Hub() {
  const { user, role: realRole } = useAuth();
  const [previewRole, setPreviewRole] = useState("public");
  const [uploadStep, setUploadStep] = useState(0);
  const [uploading, setUploading] = useState(false);

  function simulateUpload() {
    setUploading(true);
    setUploadStep(1);
    setTimeout(() => setUploadStep(2), 900);
    setTimeout(() => {
      setUploadStep(3);
      setUploading(false);
    }, 1900);
  }

  const activeRole = roles.find((r) => r.id === previewRole);

  return (
    <PageTransition>
      <section className="relative border-b border-ink-100">
        <div className="container-page pb-16 pt-16 sm:pb-24 sm:pt-24">
          <span className="eyebrow">Part Three</span>
          <Headline as="h1" onMount className="display-1 mt-6">
            The Central *Hub*
          </Headline>
          <p className="lead mt-8 max-w-xl">
            One platform above both websites: React front end, Supabase role permissions, and dashboards reading the
            same database.
          </p>
          <p className="mono-label mt-8 inline-flex items-center gap-3 border border-ink-900/20 px-4 py-3 normal-case tracking-normal text-ink-900">
            <ShieldCheck size={15} />
            {user ? (
              <span>
                Signed in as <strong className="font-semibold">{realRole}</strong> — the upload and admin sections below
                check this real role.
              </span>
            ) : (
              <span>
                Not signed in —{" "}
                <Link to="/login" className="font-semibold underline decoration-signal decoration-2 underline-offset-4">
                  sign in
                </Link>{" "}
                to unlock the upload and admin sections below.
              </span>
            )}
          </p>
        </div>
      </section>

      {/* Role switcher (educational preview — not tied to your real account) */}
      <section className="container-page pb-14">
        <div className="mb-4 flex items-center gap-2">
          <Lock size={17} className="text-brand-500" />
          <h2 className="display-3 text-ink-900">Who sees what</h2>
        </div>
        <p className="mb-4 text-sm text-slate-muted">
          Compare access levels below — this switcher is just for illustration.
        </p>
        <div className="flex flex-wrap gap-2">
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => setPreviewRole(r.id)}
              className={`chip rounded-full px-4 py-2 transition-colors ${
                previewRole === r.id ? "bg-brand-500 text-white" : "bg-transparent text-ink-900 ring-1 ring-ink-100 hover:bg-white"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={previewRole}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mt-6 grid gap-5 sm:grid-cols-2"
          >
            <div className="border border-ink-900/15 bg-white p-6">
              <div className="mono-label mb-2 text-signal-ink">Can see</div>
              <p className="text-sm text-ink-900">{activeRole.sees}</p>
            </div>
            <div className="border border-ink-900/15 bg-white p-6">
              <div className="mono-label mb-2 text-signal-ink">Can do</div>
              <p className="text-sm text-ink-900">{activeRole.can}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex flex-wrap gap-2">
          {roleAccess[previewRole].map((a) => (
            <span key={a} className="mono-label border border-ink-900/20 px-3 py-1.5 text-ink-900">
              {a}
            </span>
          ))}
        </div>
      </section>

      {/* Upload flow */}
      <section className="bg-ink-50/60 section-pad">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <UploadCloud size={18} className="text-brand-500" />
              <h2 className="display-3 text-ink-900">How it works</h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-muted">
              A researcher uploads a dataset with a short metadata form. The file
              goes to storage; the description becomes a searchable database
              record. Try the simulated flow.
            </p>

            <RequireRole min="faculty">
              <button
                onClick={simulateUpload}
                disabled={uploading}
                className="chip min-h-12 gap-2 rounded-full bg-signal px-7 font-medium text-ink-900 transition-transform hover:scale-[1.02] disabled:opacity-60"
              >
                <UploadCloud size={16} />
                {uploading ? "Uploading…" : "Simulate a dataset upload"}
              </button>

              <div className="mt-6 flex flex-col gap-3">
                {[
                  { step: 1, label: "File sent to storage" },
                  { step: 2, label: "Metadata written to database" },
                  { step: 3, label: "Now searchable across the hub" },
                ].map((s) => (
                  <div key={s.step} className="flex items-center gap-3">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                        uploadStep >= s.step ? "bg-accent-green text-ink-900" : "bg-ink-100 text-slate-muted"
                      }`}
                    >
                      {uploadStep >= s.step ? <CheckCircle2 size={14} /> : s.step}
                    </span>
                    <span className={`text-sm ${uploadStep >= s.step ? "text-ink-900" : "text-slate-muted"}`}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </RequireRole>
          </div>

          <div className="border border-ink-900/15 bg-white p-6">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink-900">
              <Database size={16} className="text-brand-500" /> Website → Database → Storage
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {["React app", "Metadata + roles", "Dropbox / S3"].map((s, i) => (
                <div key={s} className="flex flex-1 items-center gap-2">
                  <div className="flex-1 rounded-xl bg-brand-50 px-4 py-3 text-center text-xs font-semibold text-brand-600">
                    {s}
                  </div>
                  {i < 2 && <span className="hidden text-ink-300 sm:block">→</span>}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-muted">
              Dropbox stores the bytes; the database is the memory that knows what
              each file is, who can see it, and how to find it.
            </p>
          </div>
        </div>
      </section>

      {/* Admin — real role management, gated by the actual hierarchy */}
      <section className="container-page section-pad !pt-14">
        <div className="mb-4 flex items-center gap-2">
          <ShieldCheck size={17} className="text-brand-500" />
          <h2 className="display-3 text-ink-900">Admin: manage roles</h2>
        </div>
        <p className="mb-6 text-sm text-slate-muted">
          Real, not simulated — this reads and writes the <code>profiles</code> table
          through Supabase row-level security. Only accounts with the Admin role can see this.
        </p>
        <RequireRole min="admin">
          <AdminPanel />
        </RequireRole>
      </section>

      {/* Dashboard preview */}
      <section className="section-pad container-page">
        <div className="mb-8 flex items-center gap-2">
          <LayoutDashboard size={18} className="text-brand-500" />
          <h2 className="display-3 text-ink-900">Impact dashboard (preview)</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="panel p-6 sm:p-8">
            <div className="mono-label text-slate-muted">Top thrusts by publications</div>
            <div
              className="mt-6"
              role="img"
              aria-label={`Bar chart of publications for the six most-published thrusts: ${barData.map((r) => `${r.name} ${r.publications}`).join(", ")}.`}
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData} margin={{ top: 22, right: 8, bottom: 0, left: -18 }}>
                  <CartesianGrid vertical={false} stroke="rgba(10,10,14,0.10)" />
                  <XAxis dataKey="name" tick={axisTick} axisLine={false} tickLine={false} interval={0} />
                  <YAxis tick={axisTick} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip {...tooltipTheme} formatter={(v) => [`${v} publications`, ""]} />
                  <Bar dataKey="publications" fill={chartColors.rose} radius={[4, 4, 0, 0]} maxBarSize={44}>
                    <LabelList dataKey="publications" position="top" {...valueLabelLight} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="panel p-6 sm:p-8">
            <div className="mono-label text-slate-muted">Institutions by network</div>
            <div
              className="mt-6 grid items-center gap-6 sm:grid-cols-[1fr_auto]"
              role="img"
              aria-label={`Donut chart of ${pieTotal} institutions by network: ${pieData.map((d) => `${d.name} ${d.value}`).join(", ")}.`}
            >
              <div className="relative mx-auto h-[240px] w-full max-w-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={68}
                      outerRadius={108}
                      paddingAngle={2}
                      stroke="none"
                    >
                      {pieData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip {...tooltipTheme} formatter={(v, name) => [`${v} institutions`, name]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="tnum font-display text-5xl leading-none text-ink-900">{pieTotal}</span>
                  <span className="mono-label mt-1 text-slate-muted">Institutions</span>
                </div>
              </div>
              <ul className="flex flex-col gap-3" aria-hidden="true">
                {pieData.map((d) => (
                  <li key={d.name} className="flex items-center gap-3">
                    <span className="h-3 w-3 shrink-0" style={{ background: d.color }} />
                    <span className="text-sm text-ink-900">{d.name}</span>
                    <span className="tnum ml-auto pl-4 font-mono text-sm text-ink-900">{d.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-4 flex items-center gap-2 text-xs text-slate-muted">
          <Search size={13} /> Illustrative dashboard data — reads from the same database as search and uploads once wired to production.
        </p>
      </section>
    </PageTransition>
  );
}
