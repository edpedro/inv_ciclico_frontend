import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Loading from "../loanding";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { UIinventarioList } from "../../types";
import { useInventario } from "../../contexts/hooks/Inventario";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  height: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface UIPropsModal {
  setOpenHistoric: (value: boolean) => void;
  openHistoric: boolean;
  updateSecondData?: UIinventarioList;
}

export default function ModalHistoric({
  openHistoric,
  setOpenHistoric,
}: UIPropsModal) {
  const { historicData } = useInventario();

  const handleClose = () => setOpenHistoric(false);

  const fusoHorario = "America/Sao_Paulo";
  return (
    <div>
      <Modal
        open={openHistoric}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container component="main">
            <CssBaseline />
            <Loading />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h5">
                  Historico
                </Typography>
                <CancelPresentationIcon
                  fontSize="small"
                  color="error"
                  sx={{ marginLeft: "10px", cursor: "pointer" }}
                  onClick={handleClose}
                />
              </Box>

              <TableContainer component={Paper} sx={{ maxHeight: 420 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Data</TableCell>
                      <TableCell>Item</TableCell>
                      <TableCell>Descricao</TableCell>
                      <TableCell>Endereco</TableCell>
                      <TableCell>Wms</TableCell>
                      <TableCell>1°</TableCell>
                      <TableCell>2°</TableCell>
                      <TableCell>Usuario</TableCell>
                      <TableCell>Inventario</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {historicData && historicData.length > 0 ? (
                      historicData.map((historic) => (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={historic.id}
                        >
                          <TableCell component="th" scope="row">
                            {format(
                              utcToZonedTime(
                                historic.baseNameInventario.date,
                                fusoHorario
                              ),
                              "dd/MM/yyyy"
                            )}
                          </TableCell>
                          <TableCell>{historic.item}</TableCell>
                          <TableCell>{historic.descricao}</TableCell>
                          <TableCell>{historic.endereco}</TableCell>
                          <TableCell>{historic.saldoWms}</TableCell>
                          <TableCell>{historic.firstCount}</TableCell>
                          <TableCell>{historic.secondCount}</TableCell>
                          <TableCell>{historic.user?.name}</TableCell>
                          <TableCell>
                            {historic.baseNameInventario.name}
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
            </Box>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}
