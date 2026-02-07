import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const PrivateRoute = ({ children }) => {
  const { user, loadingAuth } = useAuthContext();

  if (loadingAuth) return null;

  if (!user) return <Navigate to="/register" replace />;

  return children;
};
