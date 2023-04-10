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

function createData(name: string, calories: string) {
  return { name, calories };
}

const rows = [
  createData("inventario_ciclico_movel", "20/03/2023"),
  createData("inventario_ciclico_movel", "20/03/2023"),
  createData("inventario_ciclico_movel", "20/03/2023"),
];

export default function NewName() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <Dashboard>
      <Typography variant="h5" gutterBottom sx={{ marginBottom: "20px" }}>
        Criar Nome para Inventário
      </Typography>
      <Button
        onClick={handleOpen}
        variant="outlined"
        sx={{
          marginBottom: "30px",
          borderColor: "#48BD69",
          color: "#48BD69",
        }}
        color="success"
      >
        Criar Nome
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Data</TableCell>
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
                <TableCell>
                  <EditIcon fontSize="small" sx={{ marginRight: "10px" }} />
                  <DeleteForeverIcon fontSize="small" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {open && <ModalAddName open={open} setOpen={setOpen} />}
    </Dashboard>
  );
}
