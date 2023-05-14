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
import Loading from "../../components/loanding";
import { UInameList } from "../../types";

export default function Home() {
  const { nameData, loadNameData } = useName();

  useEffect(() => {
    loadNameData();
  }, []);

  const fusoHorario = "America/Sao_Paulo";

  function status(data: UInameList) {
    let status = "pendente";

    if (!data.secondStatus) {
      status = "Divergência";
    } else if (data.firstStatus) {
      let status = "Finalizado";
    }
  }

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
      <Loading />
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
            {nameData && nameData.length > 0 ? (
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
                    {!data.secondStatus && !data.firstStatus
                      ? "Pendente"
                      : !data.secondStatus
                      ? "Divergência"
                      : data.firstStatus
                      ? "Finalizado"
                      : "Pendente"}
                  </TableCell>
                  <TableCell>{data.user.name}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell component="th" scope="row">
                  Dados não encontrados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Dashboard>
  );
}
