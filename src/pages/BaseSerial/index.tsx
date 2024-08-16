import { useState, useEffect } from "react";
import Painel from "../../components/Painel";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Loading from "../../components/loanding";
import { styled } from "@mui/material/styles";
import { useProtocolo } from "../../contexts/hooks/Reversa";
import ModalDeleteCodigo from "../../components/ModalDeleteCodigo";
import ModalAddBaseSerial from "../../components/ModalAddBaseSerial";

export default function BaseSerial() {
  const { codigoData, loadCodigoData, loadStatusData, statusJobs } =
    useProtocolo();

  const [idDelete, setIdDelete] = useState<string>("");
  const [nameBaseSerial, setNameBaseSerial] = useState<string>("");
  const [openAddBaseSerial, setOpenAddBaseSerial] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    loadCodigoData();
    loadStatusData();
  }, []);

  const handleOpenAddBaseSerial = (name: string) => {
    setOpenAddBaseSerial(true);
    setNameBaseSerial(name);
  };

  function handleDelete(codigo: string) {
    setOpenDelete(true);
    setIdDelete(codigo);
  }

  return (
    <Painel>
      <Typography variant="h5" gutterBottom sx={{ marginBottom: "20px" }}>
        Base Serial
      </Typography>
      <Button
        onClick={() => handleOpenAddBaseSerial("Base Serial")}
        variant="outlined"
        sx={{
          marginBottom: "30px",
          borderColor: "#48BD69",
          color: "#48BD69",
        }}
        color="success"
      >
        Upload
      </Button>
      <Loading />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 1,
        }}
      >
        <TableContainer component={Paper} sx={{ width: 540 }}>
          <Table sx={{ minWidth: 500 }} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell>Codigo</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {codigoData && codigoData.length > 0 ? (
                codigoData.map((data) => (
                  <TableRow key={data}>
                    <TableCell>{data}</TableCell>
                    <TableCell>
                      <DeleteForeverIcon
                        fontSize="small"
                        sx={{ marginLeft: "10px", cursor: "pointer" }}
                        onClick={() => handleDelete(data)}
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
        <TableContainer component={Paper} sx={{ width: 540 }}>
          <Table sx={{ minWidth: 500 }} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell>Processo</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Progresso</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {statusJobs && statusJobs.length > 0 ? (
                statusJobs.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell>{data.job}</TableCell>
                    <TableCell>{data.status}</TableCell>
                    <TableCell>{data.progresso}</TableCell>
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
      </Box>

      {openAddBaseSerial && (
        <ModalAddBaseSerial
          openAddBaseSerial={openAddBaseSerial}
          setOpenAddBaseSerial={setOpenAddBaseSerial}
          nameBaseSerial={nameBaseSerial}
        />
      )}
      {openDelete && (
        <ModalDeleteCodigo
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          idDelete={idDelete}
        />
      )}
    </Painel>
  );
}
