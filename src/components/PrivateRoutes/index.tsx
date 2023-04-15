import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/hooks/Auth";

const PrivateRoutes = () => {
  const { authenticated } = useAuth();

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
