import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useName } from "../../contexts/hooks/NewName";

interface UIProps {
  name: string;
  handleChange: (event: SelectChangeEvent) => void;
  handleDownload: () => void;
  handleOpenDelete: () => void;
  handleUpdate: () => void;
}

export default function ActionInventario({
  handleChange,
  handleDownload,
  handleOpenDelete,
  handleUpdate,
  name,
}: UIProps) {
  const { nameData } = useName();
  return (
    <Card
      sx={{
        width: 550,
        height: 80,
        marginBottom: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: 250 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Inventario</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={name}
              label="Nome Inventario"
              color="success"
              onChange={handleChange}
            >
              {nameData &&
                nameData.map((value) => (
                  <MenuItem key={value.id} value={value.name}>
                    {value.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            marginLeft: 5,
            display: " flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ marginBottom: 1 }}>Ações</Typography>

          <Box>
            <DownloadForOfflineIcon
              fontSize="small"
              sx={{ cursor: "pointer" }}
              onClick={handleDownload}
            />
            <DeleteForeverIcon
              onClick={handleOpenDelete}
              fontSize="small"
              sx={{ marginLeft: 3, cursor: "pointer" }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            marginLeft: 5,
            display: " flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <Button
              fullWidth
              variant="contained"
              sx={{
                borderColor: "#48BD69",
                color: "#fff",
              }}
              color="success"
              onClick={handleUpdate}
            >
              Atualizar
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
