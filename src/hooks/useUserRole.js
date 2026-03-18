import { getUserRole } from "../services/roleService";
import { useQuery } from "@tanstack/react-query";

export const useUserRole = () => {
  const { data: role, isLoading: loadingRole } = useQuery({
    queryKey: ["userRole"],
    queryFn: getUserRole,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return { role, loadingRole };
};
