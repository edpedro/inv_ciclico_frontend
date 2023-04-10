import { useState } from "react";
import Dashboard from "../../components/Dashboard";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ModalAddName from "../../components/ModalAddName";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ModalAddInventario from "../../components/ModalAddInventario";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

function createData(
  name: string,
  calories: string,
  fat: string,
  carbs: string
) {
  return { name, calories, fat, carbs };
}

const rows = [
  createData("inventario_ciclico_movel", "20/03/2023", "Pendente", "Eduardo"),
  createData("inventario_ciclico_movel", "20/03/2023", "Pendente", "Eduardo"),
  createData("inventario_ciclico_movel", "20/03/2023", "Pendente", "Eduardo"),
];

export default function NewInventario() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <Dashboard>
      <Typography variant="h5" gutterBottom sx={{ marginBottom: "20px" }}>
        Criar Inventário
      </Typography>
      <Button
        onClick={handleOpen}
        variant="contained"
        component="label"
        sx={{
          marginBottom: "30px",
          backgroundColor: "#48BD69",
          "&:hover": {
            backgroundColor: "#3D9449",
          },
        }}
      >
        <FileCopyIcon />
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Criador</TableCell>
              <TableCell>Baixar</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.calories}</TableCell>
                <TableCell>{row.fat}</TableCell>
                <TableCell>{row.carbs}</TableCell>
                <TableCell>
                  <DownloadForOfflineIcon fontSize="small" />
                </TableCell>

                <TableCell>
                  <EditIcon fontSize="small" sx={{ marginRight: "10px" }} />
                  <DeleteForeverIcon fontSize="small" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {open && <ModalAddInventario open={open} setOpen={setOpen} />}
    </Dashboard>
  );
}
