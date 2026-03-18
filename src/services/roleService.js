import { supabase } from "../supabase/Client";
export async function getUserRole() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (error) throw error;
  return data?.role ?? null;
}

export async function hasRole(role) {
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("role", role)
    .single();

  if (error) return false;
  return !!data;
}

export async function getUserRoleById(userId) {
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .single();

  if (error) throw error;
  return data.role;
}
