import { useState, useEffect } from "react";
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
import { useName } from "../../contexts/hooks/NewName";
import ModalDelete from "../../components/ModalDelete";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import Loading from "../../components/loanding";

export default function ListName() {
  const { nameData, loadNameData, listNameData } = useName();

  const [idDelete, setIdDelete] = useState("");
  const [idUpdate, setIdUpdate] = useState("");
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setIdUpdate("");
  };

  useEffect(() => {
    loadNameData();
  }, []);

  function handleDelete(id: string) {
    setOpenDelete(true);
    setIdDelete(id);
  }

  function handleUpdate(id: string) {
    listNameData(id);
    setOpen(true);
    setIdUpdate(id);
  }
  const fusoHorario = "America/Sao_Paulo";

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
      <Loading />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ações</TableCell>
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
                    {data.status ? "Finalizando" : "Pendente"}
                  </TableCell>
                  <TableCell>
                    <EditIcon
                      fontSize="small"
                      sx={{ marginRight: "10px", cursor: "pointer" }}
                      onClick={() => handleUpdate(data.id)}
                    />

                    <DeleteForeverIcon
                      fontSize="small"
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleDelete(data.id)}
                    />
                  </TableCell>
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
      {open && (
        <ModalAddName open={open} setOpen={setOpen} idUpdate={idUpdate} />
      )}
      {openDelete && (
        <ModalDelete
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          idDelete={idDelete}
        />
      )}
    </Dashboard>
  );
}
