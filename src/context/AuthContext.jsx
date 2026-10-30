import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase, supabaseConfigured } from "../lib/supabaseClient";

const ROLE_LEVELS = { public: 0, student: 1, faculty: 2, industry: 3, admin: 4 };

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadProfile(userId) {
    if (!userId) {
      setProfile(null);
      return;
    }
    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
    if (error) {
      setProfile(null);
    } else {
      setProfile(data);
    }
  }

  useEffect(() => {
    let mounted = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!mounted) return;
        setSession(data.session);
        return loadProfile(data.session?.user?.id);
      })
      // If the auth service can't be reached, carry on as a signed-out visitor
      // instead of leaving the header stuck in its "loading" state.
      .catch(() => {})
      .finally(() => mounted && setLoading(false));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      loadProfile(newSession?.user?.id);
    });

    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  async function signUp({ email, password, fullName, institution }) {
    return supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, institution } },
    });
  }

  async function signIn({ email, password }) {
    return supabase.auth.signInWithPassword({ email, password });
  }

  async function signOut() {
    return supabase.auth.signOut();
  }

  // "public" for anyone not logged in yet — matches the role already
  // described on the Hub preview page (browse/search only).
  const role = profile?.role ?? "public";
  const roleLevel = ROLE_LEVELS[role] ?? 0;

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      profile,
      role,
      roleLevel,
      hasMinRole: (minRole) => roleLevel >= (ROLE_LEVELS[minRole] ?? 0),
      loading,
      configured: supabaseConfigured,
      signUp,
      signIn,
      signOut,
    }),
    [session, profile, loading, role, roleLevel]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export { ROLE_LEVELS };
