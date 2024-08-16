import { FormEvent, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { toast } from "react-toastify";
import { UIBaseCreate, UIinventarioCreate } from "../../types";
import { useInventario } from "../../contexts/hooks/Inventario";
import { useProtocolo } from "../../contexts/hooks/Reversa";

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
  setOpenAddBaseSerial: (value: boolean) => void;
  openAddBaseSerial: boolean;
  nameBaseSerial: string;
}

export default function ModalAddBaseSerial({
  openAddBaseSerial,
  setOpenAddBaseSerial,
  nameBaseSerial,
}: UIPropsModal) {
  const { uploadBaseSerial } = useProtocolo();

  const [file, setFile] = useState<File | null>();

  const handleClose = () => setOpenAddBaseSerial(false);

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

    if (file === undefined) {
      return toast.error("Favor preencher todos dados!");
    }
    if (file !== null && file !== undefined) {
      const newData: UIBaseCreate = {
        file,
      };

      uploadBaseSerial(newData);
    }
    setOpenAddBaseSerial(false);
  };

  return (
    <div>
      <Modal
        open={openAddBaseSerial}
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
                {nameBaseSerial}
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
                    height: "60px",
                    width: "250px",
                    marginTop: "15px",
                    marginBottom: "20px",
                    border: "1px solid #3D9449",
                    backgroundColor: "#48BD69",
                    "&:hover": {
                      backgroundColor: "#8dcc95",
                    },
                  }}
                >
                  <input
                    hidden
                    accept=".xlsx"
                    type="file"
                    onChange={handleFileInputChange}
                  />
                  <FileCopyIcon
                    sx={{
                      color: "#fff",
                      "&:hover": {
                        color: "#3D9449",
                      },
                    }}
                  />
                  {file && (
                    <Typography variant="caption" display="block" gutterBottom>
                      {file.name} ({file.size} bytes)
                    </Typography>
                  )}
                </Button>
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
                  Processar
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}
