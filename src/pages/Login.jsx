import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, UserPlus, AlertCircle, ShieldAlert } from "lucide-react";
import PageTransition from "../components/PageTransition";
import { useAuth } from "../context/AuthContext";

// supabase-js reports a dead connection as a bare "Failed to fetch"; say what
// actually happened instead.
const friendlyAuthError = (message = "") =>
  /failed to fetch|networkerror|load failed|network request failed/i.test(message)
    ? "Can't reach the sign-in service right now. Check your connection and try again in a moment."
    : message;

export default function Login() {
  const { signIn, signUp, configured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from ?? "/hub";

  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [institution, setInstitution] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setInfo("");
    setBusy(true);

    let result;
    try {
      result =
        mode === "signin"
          ? await signIn({ email, password })
          : await signUp({ email, password, fullName, institution });
    } catch (err) {
      result = { error: { message: err?.message } };
    }

    setBusy(false);

    if (result.error) {
      setError(friendlyAuthError(result.error.message));
      return;
    }

    // If email confirmation is required, signUp() returns a user but no
    // session — only then do we ask them to check their inbox. If email
    // confirmation is off, Supabase returns an active session immediately,
    // so we sign them straight in like a normal login.
    if (mode === "signup" && !result.data?.session) {
      setInfo("Account created. Check your email to confirm, then sign in below.");
      setMode("signin");
      return;
    }

    navigate(redirectTo, { replace: true });
  }

  return (
    <PageTransition>
      <section className="container-page section-pad flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md border border-ink-900/15 bg-white p-8 sm:p-10"
        >
          <h1 className="display-3 text-ink-900">
            {mode === "signin" ? "Sign in" : "Create an account"}
          </h1>
          <p className="mt-2 text-sm text-slate-muted">
            {mode === "signin"
              ? "Sign in to access role-based areas of the hub."
              : "New accounts start at the Student tier — an admin can promote your role afterward."}
          </p>

          {!configured && (
            <div role="alert" className="mt-5 flex items-start gap-2 rounded-xl bg-accent-orange/10 p-3 text-sm text-accent-orangeInk">
              <ShieldAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
              <span>
                Supabase isn't configured yet. Copy <code>.env.example</code> to{" "}
                <code>.env.local</code> and add your project URL and anon key.
              </span>
            </div>
          )}

          {error && (
            <div id="login-error" role="alert" className="mt-5 flex items-start gap-2 rounded-xl bg-accent-rose/10 p-3 text-sm text-accent-roseInk">
              <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}
          {info && (
            <div role="status" className="mt-5 flex items-start gap-2 rounded-xl bg-accent-green/10 p-3 text-sm text-accent-greenInk">
              <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
              <span>{info}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} aria-busy={busy} className="mt-6 flex flex-col gap-4">
            {mode === "signup" && (
              <>
                <div>
                  <label htmlFor="login-name" className="mb-1 block text-xs font-semibold text-ink-700">Full name</label>
                  <input
                    id="login-name"
                    autoComplete="name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="min-h-11 w-full rounded-xl border border-ink-100 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label htmlFor="login-inst" className="mb-1 block text-xs font-semibold text-ink-700">Institution</label>
                  <input
                    id="login-inst"
                    autoComplete="organization"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="min-h-11 w-full rounded-xl border border-ink-100 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500"
                    placeholder="University of Houston"
                  />
                </div>
              </>
            )}
            <div>
              <label htmlFor="login-email" className="mb-1 block text-xs font-semibold text-ink-700">Email</label>
              <input
                id="login-email"
                autoComplete="username"
                aria-describedby={error ? "login-error" : undefined}
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-h-11 w-full rounded-xl border border-ink-100 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500"
                placeholder="jane@university.edu"
              />
            </div>
            <div>
              <label htmlFor="login-password" className="mb-1 block text-xs font-semibold text-ink-700">Password</label>
              <input
                id="login-password"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                aria-describedby={error ? "login-error" : undefined}
                required
                type="password"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="min-h-11 w-full rounded-xl border border-ink-100 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={busy}
              className="chip mt-2 min-h-12 gap-2 rounded-full bg-signal px-7 font-medium text-ink-900 transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              {mode === "signin" ? <LogIn size={16} /> : <UserPlus size={16} />}
              {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <button
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError("");
              setInfo("");
            }}
            className="mt-3 min-h-11 w-full text-center text-sm font-medium text-brand-500 hover:text-brand-600"
          >
            {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </motion.div>
      </section>
    </PageTransition>
  );
}
