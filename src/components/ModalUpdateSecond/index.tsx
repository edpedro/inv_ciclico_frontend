import { FormEvent, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import {
  UIinventarioCreate,
  UIinventarioList,
  UIsecondUpdate,
} from "../../types";
import { useInventario } from "../../contexts/hooks/Inventario";

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
  const { updateAdminSecondCount } = useInventario();

  const [saldoFisico, setSaldoFisico] = useState<number>();
  const [idItem, setIdItem] = useState<number>();

  useEffect(() => {
    if (updateSecondData) {
      setSaldoFisico(updateSecondData.secondCount as number);
      setIdItem(updateSecondData.id as number);
    }
  }, [updateSecondData]);

  const handleClose = () => setOpen(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!idItem || saldoFisico === undefined || Number.isNaN(saldoFisico)) {
      toast.error("Favor preencher todos os dados!");
      return null;
    }

    const data: UIsecondUpdate = { id: idItem, saldoFisico };
    const id = updateSecondData?.baseNameInventario_id || "";

    updateAdminSecondCount(id, data);

    setOpen(false);
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Segunda Contagem
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                  mt: 1,
                }}
              >
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
                <TextField
                  required
                  type="number"
                  margin="normal"
                  fullWidth
                  id="saldoFisico"
                  label="Quantidade"
                  name="saldoFisico"
                  value={saldoFisico}
                  onChange={(event) =>
                    setSaldoFisico(parseInt(event.target.value))
                  }
                  autoComplete="saldoFisico"
                  color="success"
                  autoFocus
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    borderColor: "#48BD69",
                    color: "#fff",
                  }}
                  color="success"
                >
                  Atualizar
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}
