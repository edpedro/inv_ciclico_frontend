import { ReactNode } from "react";
import { Routes as Router, Route, Navigate, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import NewInventario from "../pages/NewInventario";
import PrivateRoutes from "../components/PrivateRoutes";
import { useLoading } from "../contexts/hooks/Loanding";
import { useAuth } from "../contexts/hooks/Auth";
import Loading from "../components/loanding";
import NewName from "../pages/NewName";

const Routes = () => {
  const { isLoading } = useAuth();
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<NewName />} />
        <Route path="/inventario" element={<NewInventario />} />
      </Route>
      <Route path="*" element={<Home />} />
    </Router>
  );
};

export default Routes;
