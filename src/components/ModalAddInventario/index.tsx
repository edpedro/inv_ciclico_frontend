import { FormEvent, useState, useEffect } from "react";
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
import { useName } from "../../contexts/hooks/NewName";
import { toast } from "react-toastify";
import { UIinventarioCreate } from "../../types";
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
}

export default function ModalAddInventario({ open, setOpen }: UIPropsModal) {
  const { nameData, loadNameData } = useName();
  const { createInventario } = useInventario();

  const [name, setName] = useState("");
  const [idInventario, setIdInventario] = useState("");
  const [file, setFile] = useState<File | null>();

  useEffect(() => {
    loadNameData();
  }, []);

  const handleClose = () => setOpen(false);

  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;

    setName(value);

    const filterName = nameData!.filter((data) => data.name === value);
    setIdInventario(filterName[0].id);
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file !== null && file !== undefined) {
      setFile(file);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!idInventario || file === undefined) {
      return toast.error("Favor preencher todos dados!");
    }
    if (file !== null && file !== undefined) {
      const newData: UIinventarioCreate = {
        baseNameInventario_id: idInventario,
        file,
      };

      createInventario(newData);
    }
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
                Criar Inventario
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
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
                  <input
                    hidden
                    accept=".xlsx"
                    type="file"
                    onChange={handleFileInputChange}
                  />
                  <FileCopyIcon />
                  {file && (
                    <Typography variant="caption" display="block" gutterBottom>
                      {file.name} ({file.size} bytes)
                    </Typography>
                  )}
                </Button>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Nome</InputLabel>
                  <Select
                    required
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={name}
                    label="Nome"
                    color="success"
                    onChange={handleChange}
                    sx={{
                      width: "300px",
                    }}
                  >
                    {nameData &&
                      nameData.map((value) => (
                        <MenuItem key={value.id} value={value.name}>
                          {value.name}
                        </MenuItem>
                      ))}
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
