import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useName } from "../../contexts/hooks/NewName";

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
  setOpenDelete: (value: boolean) => void;
  openDelete: boolean;
  idDelete: string;
}

export default function ModalDelete({
  openDelete,
  setOpenDelete,
  idDelete,
}: UIPropsModal) {
  const { deleteName } = useName();
  const handleClose = () => setOpenDelete(false);

  function handleDeleteName() {
    deleteName(idDelete);
    setOpenDelete(false);
  }

  return (
    <div>
      <Modal
        open={openDelete}
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
              <Typography component="h1" variant="h6">
                Deseja excluir inventario?
              </Typography>
              <Button
                onClick={handleDeleteName}
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
                Excluir
              </Button>
            </Box>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}
