import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseConfigured = Boolean(url && anonKey);

if (!supabaseConfigured) {
  console.warn(
    "Supabase env vars are missing. Copy .env.example to .env.local and fill in " +
      "VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. Auth features are disabled until then."
  );
}

// A stub client that fails gracefully so the rest of the app can render
// (login screen shows a clear "not configured" message) instead of crashing
// when env vars haven't been set yet.
const stubClient = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } }),
    signInWithPassword: async () => ({
      data: null,
      error: { message: "Supabase is not configured yet. See .env.example." },
    }),
    signUp: async () => ({
      data: null,
      error: { message: "Supabase is not configured yet. See .env.example." },
    }),
    signOut: async () => ({ error: null }),
  },
  from() {
    return {
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: { message: "Supabase is not configured." } }),
        }),
      }),
    };
  },
};

export const supabase = supabaseConfigured ? createClient(url, anonKey) : stubClient;
