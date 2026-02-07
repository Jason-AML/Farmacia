import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const PublicRoutes = ({ children }) => {
  const { user, loadingAuth } = useAuthContext();

  if (loadingAuth) return <p>Cargando</p>;

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoutes;
