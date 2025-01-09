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
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import Loading from "../../components/loanding";
import { styled } from "@mui/material/styles";
import ModalAddExpedicao from "../../components/ModalAddExpedicao";
import { useExpedicao } from "../../contexts/hooks/Expedicao";
import ModalDeleteExpedicao from "../../components/ModalDeleteExpedicao";
import ModalUploadExpedicao from "../../components/ModalUploadExpedicao";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  width: 80,
}));

export default function CriarNameExpedicao() {
  const { expedicaoData, loadExpedicaoData, listIdExpedicaoData } =
    useExpedicao();

  const [idDelete, setIdDelete] = useState<string>("");
  const [idUpdate, setIdUpdate] = useState<string>("");
  const [idExpedicao, setIdExpedicao] = useState<string>("");
  const [nameExpedicao, setNameExpedicao] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [openUploadExpedicao, setOpenUploadExpedicao] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    loadExpedicaoData();
  }, []);

  const handleOpenUploadExpedicao = (id: string, name: string) => {
    setOpenUploadExpedicao(true);
    setIdExpedicao(id);
    setNameExpedicao(name);
  };

  const handleOpen = () => {
    setOpen(true);
    setIdUpdate("");
  };

  function handleDelete(id: string) {
    setOpenDelete(true);
    setIdDelete(id);
  }

  function handleUpdate(id: string) {
    listIdExpedicaoData(id);
    setOpen(true);
    setIdUpdate(id);
  }

  const fusoHorario = "America/Sao_Paulo";
  console.log(expedicaoData);
  return (
    <Painel>
      <Typography variant="h5" gutterBottom sx={{ marginBottom: "20px" }}>
        Expedição
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
        Criar Expedição
      </Button>
      <Loading />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Volume</TableCell>
              <TableCell>Palete</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expedicaoData && expedicaoData.length > 0 ? (
              expedicaoData.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>{data.name}</TableCell>
                  <TableCell>
                    {format(
                      utcToZonedTime(data.date, fusoHorario),
                      "dd/MM/yyyy"
                    )}
                  </TableCell>
                  <TableCell>{data.volumes}</TableCell>
                  <TableCell>{data.pallet}</TableCell>
                  <TableCell>
                    {data.status === "Pendente" ? (
                      <Item sx={{ backgroundColor: "#FFFF00" }}>Pendente</Item>
                    ) : data.status === "conferido" ? (
                      <Item sx={{ backgroundColor: "#48BD69" }}>Conferido</Item>
                    ) : data.status === "conferencia" ? (
                      <Item sx={{ backgroundColor: "#FFFF00" }}>
                        Em Conferência
                      </Item>
                    ) : (
                      <Item sx={{ backgroundColor: "#df3939" }}>
                        Divergência
                      </Item>
                    )}
                  </TableCell>
                  <TableCell>
                    {data.uploadPDF ? (
                      <UploadFileIcon
                        fontSize="small"
                        sx={{
                          marginLeft: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          handleOpenUploadExpedicao(data.id, data.name)
                        }
                      />
                    ) : (
                      <UploadFileIcon
                        fontSize="small"
                        sx={{
                          marginLeft: "10px",
                          cursor: "pointer",
                          color: "#df3939",
                        }}
                        onClick={() =>
                          handleOpenUploadExpedicao(data.id, data.name)
                        }
                      />
                    )}
                    <EditIcon
                      fontSize="small"
                      sx={{ marginLeft: "10px", cursor: "pointer" }}
                      onClick={() => handleUpdate(data.id)}
                    />

                    <DeleteForeverIcon
                      fontSize="small"
                      sx={{ marginLeft: "10px", cursor: "pointer" }}
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
      {openUploadExpedicao && (
        <ModalUploadExpedicao
          openUploadExpedicao={openUploadExpedicao}
          setOpenUploadExpedicao={setOpenUploadExpedicao}
          idExpedicao={idExpedicao}
          nameExpedicao={nameExpedicao}
        />
      )}
      {open && (
        <ModalAddExpedicao open={open} setOpen={setOpen} idUpdate={idUpdate} />
      )}
      {openDelete && (
        <ModalDeleteExpedicao
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          idDelete={idDelete}
        />
      )}
    </Painel>
  );
}
