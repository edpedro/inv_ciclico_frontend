import { useState, useEffect } from "react";
import Painel from "../../components/Painel";
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
import ModalAddUsers from "../../components/ModalAddUsers";
import { useUsers } from "../../contexts/hooks/Users";
import ModalDeleteUser from "../../components/ModalDeleteUser";
import Loading from "../../components/loanding";

export default function Users() {
  const { listAllUserData, lisUserData, listUserFindOneData } = useUsers();

  const [idDelete, setIdDelete] = useState("");
  const [idUpdate, setIdUpdate] = useState("");
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setIdUpdate("");
  };

  useEffect(() => {
    listAllUserData();
  }, []);

  function handleDelete(id: string) {
    setOpenDelete(true);
    setIdDelete(id);
  }

  function handleUpdate(id: string) {
    listUserFindOneData(id);
    setOpen(true);
    setIdUpdate(id);
  }

  return (
    <Painel>
      <Typography variant="h5" gutterBottom sx={{ marginBottom: "20px" }}>
        Controle de acesso Usuario
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
        Criar Usuario
      </Button>
      <Loading />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Autorização</TableCell>
              <TableCell>Pontos</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lisUserData && lisUserData.length > 0 ? (
              lisUserData.map((data) => (
                <TableRow key={data.id}>
                  <TableCell component="th" scope="row">
                    {data.name}
                  </TableCell>
                  <TableCell>{data.username}</TableCell>
                  <TableCell>
                    {data.role === "user" ? "Usuario" : "Administrador"}
                  </TableCell>
                  <TableCell>{data.totalPoints}</TableCell>
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
        <ModalAddUsers open={open} setOpen={setOpen} idUpdate={idUpdate} />
      )}
      {openDelete && (
        <ModalDeleteUser
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          idDelete={idDelete}
        />
      )}
    </Painel>
  );
}
