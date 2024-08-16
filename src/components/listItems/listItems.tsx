import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LineAxisIcon from "@mui/icons-material/LineAxis";
import LayersIcon from "@mui/icons-material/Layers";
import GridViewIcon from "@mui/icons-material/GridView";
import { Link } from "react-router-dom";

export const mainListItems = (
  <>
    <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
    </Link>
    <Link to="/dashboard" style={{ textDecoration: "none", color: "#000" }}>
      <ListItemButton>
        <ListItemIcon>
          <LineAxisIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link
      to="/name/inventario"
      style={{ textDecoration: "none", color: "#000" }}
    >
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Criar Inventário" />
      </ListItemButton>
    </Link>
    <Link to="/inventario" style={{ textDecoration: "none", color: "#000" }}>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Inventário" />
      </ListItemButton>
    </Link>
  </>
);

export const secondaryListItems = (
  <>
    <ListSubheader component="div" inset>
      Usuarios
    </ListSubheader>
    <Link to="/users" style={{ textDecoration: "none", color: "#000" }}>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Criar Usuario" />
      </ListItemButton>
    </Link>
  </>
);

export const reversaListItems = (
  <>
    <ListSubheader component="div" inset>
      Reversa
    </ListSubheader>
    <Link to="/protocolo" style={{ textDecoration: "none", color: "#000" }}>
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Protocolo" />
      </ListItemButton>
    </Link>
    <Link to="/baseserial" style={{ textDecoration: "none", color: "#000" }}>
      <ListItemButton>
        <ListItemIcon>
          <GridViewIcon />
        </ListItemIcon>
        <ListItemText primary="Baseserial" />
      </ListItemButton>
    </Link>
  </>
);
