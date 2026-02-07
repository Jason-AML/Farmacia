import { supabase } from "../supabase/Client";

export const registerService = (email, password) => {
  return supabase.auth.signUp({
    email,
    password,
  });
};

export const loginService = (email, password) => {
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
};
export const logoutService = () => {
  return supabase.auth.signOut({ scope: "local" });
};
