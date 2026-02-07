import {
  loginService,
  logoutService,
  registerService,
} from "../services/authService";

export const useAuthUser = () => {
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
  };

  return { signUpNewUser, logoutUser, signUpUser };
};
