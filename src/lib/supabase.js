import { createClient } from "@supabase/supabase-js";

// HMR-safe singleton — reuses the same instance across Vite hot reloads
let instance = import.meta.hot?.data?.supabase ?? null;

if (!instance) {
  instance = createClient(
    import.meta.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co",
    import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder"
  );
  if (import.meta.hot) {
    import.meta.hot.data.supabase = instance;
  }
}

export const supabase = instance;
