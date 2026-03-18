import {
  loginService,
  logoutService,
  registerService,
} from "../services/authService";
import { useQueryClient } from "@tanstack/react-query";
export const useAuthUser = () => {
  const queryClient = useQueryClient();
  const signUpNewUser = async (email, password) => {
    const { data, error } = await registerService(email, password);

    if (error) {
      throw new Error(error.message);
    }

    if (
      (data.user && !data.user.identities) ||
      data.user.identities.length === 0
    ) {
      throw new Error("Este correo ya está registrado");
    }

    if (data.user) {
      return data;
    }

    throw new Error("El registro no se completó");
  };

  const signUpUser = async (email, password) => {
    const { error } = await loginService(email, password);

    if (error) {
      throw new Error(error.message);
    }
  };

  const logoutUser = async () => {
    await logoutService();
    queryClient.removeQueries({ queryKey: ["userRole"] });
  };
  return { signUpNewUser, logoutUser, signUpUser };
};
