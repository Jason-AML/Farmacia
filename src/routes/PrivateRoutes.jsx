import { Outlet } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

export const PrivateRoutes = () => {
  return (
    <PrivateRoute>
      <Outlet />
    </PrivateRoute>
  );
};
export default PrivateRoutes;
