import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import Box from "@mui/material/Box";

interface UIProps {
  handleOpen: () => void;
}

export default function UploadExcel({ handleOpen }: UIProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Button
        onClick={handleOpen}
        variant="contained"
        component="label"
        sx={{
          marginBottom: "30px",
          backgroundColor: "#48BD69",
          "&:hover": {
            backgroundColor: "#3D9449",
          },
        }}
      >
        <FileCopyIcon />
      </Button>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ marginBottom: "15px", marginLeft: "10px" }}
      >
        Upload Excel
      </Typography>
    </Box>
  );
}
