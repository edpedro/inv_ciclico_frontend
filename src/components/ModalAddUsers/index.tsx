import { FormEvent, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { toast } from "react-toastify";
import { UIuser } from "../../types";
import { useUsers } from "../../contexts/hooks/Users";
import { useAuth } from "../../contexts/hooks/Auth";

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

interface UserFormData extends FormData {
  name: string;
  username: string;
  password: string;
  role: string;
}

export default function ModalAddUsers({
  open,
  setOpen,
  idUpdate,
}: UIPropsModal) {
  const { registerUsers, updateUser, userFindData } = useUsers();
  const { authData } = useAuth();

  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userFindData) {
      setName(userFindData?.name as string);
      setUsername(userFindData?.username as string);
      setRole(userFindData?.role as string);
    }
    if (!idUpdate) {
      setName("");
      setUsername("");
      setRole("");
    }
  }, [userFindData, idUpdate]);

  const handleClose = () => setOpen(false);

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (idUpdate === "") {
      if (!username || !password || !name || !role) {
        toast.error("Favor preencher todos dados!");

        return null;
      } else if (!username || !name || !role) {
        toast.error("Favor preencher todos dados!");

        return null;
      }
    }
    const createdById = authData?.sub as string;

    const newDate: any = password
      ? { name, username, password, role }
      : { name, username, role };

    idUpdate
      ? updateUser(idUpdate, newDate)
      : registerUsers(name, username, password, role, createdById);

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
                Criar Usuario
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
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Nome"
                  name="name"
                  autoComplete="name"
                  color="success"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Usuario"
                  name="username"
                  autoComplete="username"
                  color="success"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  color="success"
                  sx={{ mb: 4 }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Autorização
                  </InputLabel>
                  <Select
                    required
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    label="Autorização"
                    color="success"
                    onChange={handleChange}
                    sx={{
                      width: "300px",
                    }}
                  >
                    <MenuItem value="admin">Administrador</MenuItem>
                    <MenuItem value="user">Usuario</MenuItem>
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
                  {idUpdate ? "Atualizar" : "Cadastrar"}
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}
