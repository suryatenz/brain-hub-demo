import { useEffect, useState } from "react";
import { ShieldCheck, RefreshCw } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

const ROLES = ["public", "student", "faculty", "industry", "admin"];

export default function AdminPanel() {
  const { user } = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState(null);

  async function load() {
    setLoading(true);
    setError("");
    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, full_name, institution, role, created_at")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setRows(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function updateRole(id, role) {
    setSavingId(id);
    const { error } = await supabase.from("profiles").update({ role }).eq("id", id);
    if (!error) {
      setRows((rs) => rs.map((r) => (r.id === id ? { ...r, role } : r)));
    } else {
      setError(error.message);
    }
    setSavingId(null);
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-ink-100/60">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink-900">
          <ShieldCheck size={16} className="text-brand-500" />
          Manage roles ({rows.length} accounts)
        </div>
        <button onClick={load} className="flex items-center gap-1.5 text-xs font-medium text-brand-500 hover:text-brand-600">
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      {error && <p role="alert" className="mb-3 text-sm text-accent-roseInk">{error}</p>}
      {loading ? (
        <p className="text-sm text-slate-muted">Loading accounts…</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-slate-muted">No accounts yet.</p>
      ) : (
        <div className="flex flex-col divide-y divide-ink-100">
          {rows.map((r) => (
            <div key={r.id} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-ink-900">
                  {r.full_name || r.email}
                  {r.id === user?.id && <span className="ml-2 text-xs text-brand-500">(you)</span>}
                </div>
                <div className="truncate text-xs text-slate-muted">
                  {r.email} {r.institution ? `· ${r.institution}` : ""}
                </div>
              </div>
              <select
                value={r.role}
                disabled={savingId === r.id}
                onChange={(e) => updateRole(r.id, e.target.value)}
                className="rounded-full border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-700 outline-none focus:border-brand-400"
              >
                {ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
