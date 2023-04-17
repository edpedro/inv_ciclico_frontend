import { useEffect } from "react";
import Dashboard from "../../components/Dashboard";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useName } from "../../contexts/hooks/NewName";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

function createData(
  name: string,
  calories: string,
  fat: string,
  carbs: string
) {
  return { name, calories, fat, carbs };
}

const rows = [
  createData("inventario_ciclico_movel1", "20/03/2023", "Pendente", "Eduardo"),
  createData("inventario_ciclico_movel2", "20/03/2023", "Pendente", "Eduardo"),
  createData("inventario_ciclico_movel3", "20/03/2023", "Pendente", "Eduardo"),
];

export default function Home() {
  const { nameData, loadNameData } = useName();

  useEffect(() => {
    loadNameData();
  }, []);

  const fusoHorario = "America/Sao_Paulo";

  return (
    <Dashboard>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ marginBottom: "20px", textAlign: "center" }}
      >
        Bem-vindo ao Sistema de Inventario
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ marginBottom: "20px" }}>
        Todos Inventarios
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Admin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nameData &&
              nameData.map((data) => (
                <TableRow key={data.id}>
                  <TableCell component="th" scope="row">
                    {data.name}
                  </TableCell>
                  <TableCell>
                    {format(
                      utcToZonedTime(data.date, fusoHorario),
                      "dd/MM/yyyy"
                    )}
                  </TableCell>
                  <TableCell>
                    {data.status ? "Finalizando" : "Pendente"}
                  </TableCell>
                  <TableCell>{data.user.name}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Dashboard>
  );
}
