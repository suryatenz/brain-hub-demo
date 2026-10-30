import { Link, useLocation } from "react-router-dom";
import { Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const ROLE_LABELS = {
  public: "Public",
  student: "Student",
  faculty: "Faculty / Partner",
  industry: "Industry / IAB",
  admin: "Admin",
};

// Gates a section of a page (not a whole route) behind a minimum role in the
// public < student < faculty < industry < admin hierarchy. Renders an
// inline "sign in" / "insufficient access" state instead of the children
// when the requirement isn't met, so the rest of the page stays visible.
export default function RequireRole({ min, children }) {
  const { user, hasMinRole, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="rounded-2xl bg-ink-50 p-6 text-sm text-slate-muted">Checking access…</div>;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl bg-ink-50 p-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink-900">
          <Lock size={16} className="text-brand-500" />
          Sign in required
        </div>
        <p className="text-sm text-slate-muted">
          This section needs at least <strong>{ROLE_LABELS[min]}</strong> access.
        </p>
        <Link
          to="/login"
          state={{ from: location.pathname }}
          className="rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600"
        >
          Sign in
        </Link>
      </div>
    );
  }

  if (!hasMinRole(min)) {
    return (
      <div className="flex flex-col items-start gap-2 rounded-2xl bg-ink-50 p-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink-900">
          <Lock size={16} className="text-accent-rose" />
          Insufficient access
        </div>
        <p className="text-sm text-slate-muted">
          You're signed in as <strong>{ROLE_LABELS[role]}</strong>. This section needs at least{" "}
          <strong>{ROLE_LABELS[min]}</strong> access. Ask an admin to promote your account if you
          believe this is wrong.
        </p>
      </div>
    );
  }

  return children;
}
