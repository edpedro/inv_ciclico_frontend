import { FormEvent, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { UIExpedicaoCreate } from "../../types";
import { toast } from "react-toastify";
import { useLoading } from "../../contexts/hooks/Loanding";
import { useExpedicao } from "../../contexts/hooks/Expedicao";

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
  idUpdate: string;
}

export default function ModalAddExpedicao({
  open,
  setOpen,
  idUpdate,
}: UIPropsModal) {
  const { isLoadingFetch } = useLoading();
  const { createExpedicao, updateExpedicaoData, updateExpedicao } =
    useExpedicao();

  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!idUpdate) {
      setName("");
      setDate("");
    } else {
      if (updateExpedicaoData) {
        const { name, date } = updateExpedicaoData;

        if (name && date) {
          setName(name as string);
          setDate(date as string);
        }
      }
    }
  }, [updateExpedicaoData, idUpdate]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const name = data.get("name") as string;
    const date = data.get("date") as string;

    if (!name || !date) {
      toast.error("Favor preencher todos dados!");

      return;
    }

    const newData: UIExpedicaoCreate = { name, date };

    idUpdate ? updateExpedicao(idUpdate, newData) : createExpedicao(newData);

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
                {idUpdate ? "Atualizar" : "Criar Expedição"}
              </Typography>
              {isLoadingFetch ? (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress color="success" />
                </Box>
              ) : (
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Nome"
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    autoComplete="name"
                    color="success"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="date"
                    type="date"
                    id="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    autoComplete="current-date"
                    color="success"
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
                    {idUpdate ? "Atualizar" : "Cadastrar"}
                  </Button>
                </Box>
              )}
            </Box>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}
