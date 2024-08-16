import { Routes as Router, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Inventario from "../pages/Inventario";
import PrivateRoutes from "../components/PrivateRoutes";
import { useAuth } from "../contexts/hooks/Auth";
import ListName from "../pages/ListName";
import Register from "../pages/Register";
import Users from "../pages/Users";
import Dashboard from "../pages/Dashboard";
import Reversa from "../pages/Protocolo";
import BaseSerial from "../pages/BaseSerial";

const Routes = () => {
  const { isLoadingStorage } = useAuth();

  if (isLoadingStorage) {
    return (
      <Box
        sx={{
          width: "100%",
        }}
      >
        <LinearProgress color="success" />
      </Box>
    );
  }

  return (
    <Router>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/name/inventario" element={<ListName />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/users" element={<Users />} />
        <Route path="/protocolo" element={<Reversa />} />
        <Route path="/baseserial" element={<BaseSerial />} />
      </Route>
      <Route path="*" element={<Home />} />
    </Router>
  );
};

export default Routes;
