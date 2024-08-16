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
import { useProtocolo } from "../../contexts/hooks/Reversa";

interface UIProps {
  name: string;
  handleChange: (event: SelectChangeEvent) => void;
  handleDownload: () => void;
  handleUpdate: () => void;
}

export default function ActionProtocolo({
  handleChange,
  handleDownload,
  handleUpdate,
  name,
}: UIProps) {
  const { nameProtocoloData } = useProtocolo();
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
            <InputLabel id="demo-simple-select-label">Protocolo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={name}
              label="Nome Protocolo"
              color="success"
              onChange={handleChange}
            >
              {nameProtocoloData &&
                nameProtocoloData.map((value) => (
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
