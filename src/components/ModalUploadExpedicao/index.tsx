import { FormEvent, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { toast } from "react-toastify";
import {} from "../../types";
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
  setOpenUploadExpedicao: (value: boolean) => void;
  openUploadExpedicao: boolean;
  idExpedicao: string;
  nameExpedicao: string;
}

export interface UIexpedicaoUpload {
  baseExpedicao_id: string;
  files: File[];
}

export default function ModalUploadExpedicao({
  openUploadExpedicao,
  setOpenUploadExpedicao,
  idExpedicao,
  nameExpedicao,
}: UIPropsModal) {
  const { uploadPDFExpedicao } = useExpedicao();
  const [files, setFiles] = useState<File[]>([]);

  const handleClose = () => setOpenUploadExpedicao(false);

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileList = event.target.files;
    if (fileList) {
      setFiles(Array.from(fileList) as File[]);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!idExpedicao || files.length === 0) {
      return toast.error("Favor selecionar pelo menos um arquivo!");
    }

    const newData: UIexpedicaoUpload = {
      baseExpedicao_id: idExpedicao,
      files,
    };

    uploadPDFExpedicao(newData);
    setOpenUploadExpedicao(false);
  };

  return (
    <div>
      <Modal
        open={openUploadExpedicao}
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
                {nameExpedicao}
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
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "60px",
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
                    multiple
                    accept=".pdf"
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
                  {files.length > 0 && (
                    <div style={{ textAlign: "center", color: "#fff" }}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        {files.length} arquivo(s) selecionado(s)
                      </Typography>
                    </div>
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
