import { FormEvent, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

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
}

export default function ModalAddInventario({ open, setOpen }: UIPropsModal) {
  const handleClose = () => setOpen(false);
  const [age, setAge] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
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
                Criar Inventario
              </Typography>
              <Box
                component="form"
                onSubmit={() => {}}
                noValidate
                sx={{
                  mt: 1,
                }}
              >
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "15px",
                    marginBottom: "20px",
                    backgroundColor: "#48BD69",
                    "&:hover": {
                      backgroundColor: "#3D9449",
                    },
                  }}
                >
                  <input hidden accept="image/*" multiple type="file" />
                  <FileCopyIcon />
                </Button>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Nome</InputLabel>
                  <Select
                    required
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Nome"
                    color="success"
                    onChange={handleChange}
                    sx={{
                      width: "300px",
                    }}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
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
                  Cadastrar
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}
