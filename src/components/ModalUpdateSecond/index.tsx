import { FormEvent, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import { UIinventarioList, UIsecondUpdate, UIwmsUpdate } from "../../types";
import { useInventario } from "../../contexts/hooks/Inventario";
import { useLoading } from "../../contexts/hooks/Loanding";
import Loading from "../loanding";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface UIPropsModal {
  setOpen: (value: boolean) => void;
  open: boolean;
  updateSecondData?: UIinventarioList;
}

export default function ModalUpdateSecond({
  setOpen,
  open,
  updateSecondData,
}: UIPropsModal) {
  const { updateAdminSecondCount, updateAdminWms } = useInventario();

  const [saldoFisico, setSaldoFisico] = useState<number>();
  const [saldoWms, setSaldoWms] = useState<number>();
  const [idItem, setIdItem] = useState<number>();

  useEffect(() => {
    if (updateSecondData) {
      setSaldoWms(updateSecondData.saldoWms as number);
      setSaldoFisico(updateSecondData.secondCount as number);
      setIdItem(updateSecondData.id as number);
    }
  }, [updateSecondData]);

  const handleClose = () => setOpen(false);

  const handleUpdateSecondCount = () => {
    if (!idItem || saldoFisico === undefined || Number.isNaN(saldoFisico)) {
      toast.error("Favor preencher todos os dados!");
      return null;
    }
    const data: UIsecondUpdate = { id: idItem, saldoFisico };
    const id = updateSecondData?.baseNameInventario_id || "";

    updateAdminSecondCount(id, data);
  };

  const handleUpdateWms = () => {
    if (!idItem || saldoWms === undefined || Number.isNaN(saldoWms)) {
      toast.error("Favor preencher todos os dados!");
      return null;
    }
    if (saldoWms <= 0) {
      toast.error("Favor digitar saldo maior 0");
      return null;
    }
    const data: UIwmsUpdate = { id: idItem, saldoWms };
    const id = updateSecondData?.baseNameInventario_id || "";

    updateAdminWms(id, data);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Loading />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Status
              </Typography>
              <Box component="form" noValidate>
                <Button
                  type="button"
                  fullWidth
                  variant="outlined"
                  sx={{
                    mt: 3,
                    mb: 1,
                    borderColor: "#48BD69",
                    color: "#000",
                  }}
                  color="success"
                >
                  Historico do Item
                </Button>
                <TextField
                  disabled
                  margin="normal"
                  fullWidth
                  id="item"
                  label="Codigo"
                  value={updateSecondData?.item}
                  name="item"
                  autoComplete="item"
                  color="success"
                  autoFocus
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    required
                    type="number"
                    margin="normal"
                    fullWidth
                    id="saldoWms"
                    label="Saldo Wms"
                    name="saldoWms"
                    value={saldoWms}
                    onChange={(event) =>
                      setSaldoWms(parseInt(event.target.value))
                    }
                    autoComplete="saldoWms"
                    color="success"
                    autoFocus
                  />
                  <LoadingButton
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{
                      ml: 5,
                      width: 140,
                      borderColor: "#48BD69",
                      color: "#fff",
                    }}
                    color="success"
                    onClick={handleUpdateWms}
                  >
                    Atualizar
                  </LoadingButton>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    required
                    type="number"
                    margin="normal"
                    fullWidth
                    id="saldoFisico"
                    label="Saldo Segunda Contagem"
                    name="saldoFisico"
                    value={saldoFisico}
                    onChange={(event) =>
                      setSaldoFisico(parseInt(event.target.value))
                    }
                    autoComplete="saldoFisico"
                    color="success"
                    autoFocus
                  />
                  <LoadingButton
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{
                      ml: 5,
                      width: 140,
                      borderColor: "#48BD69",
                      color: "#fff",
                    }}
                    color="success"
                    onClick={handleUpdateSecondCount}
                  >
                    Atualizar
                  </LoadingButton>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}
