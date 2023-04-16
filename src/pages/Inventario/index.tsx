import { useState } from "react";
import Dashboard from "../../components/Dashboard";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ModalAddName from "../../components/ModalAddName";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ModalAddInventario from "../../components/ModalAddInventario";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

function createData(
  item: string,
  descricao: string,
  endereco: string,
  tipoEstoque: string,
  catItem: string,
  saldoWms: number,
  saldoFisico: number,
  status: string,
  username_id: string
) {
  return {
    item,
    descricao,
    endereco,
    tipoEstoque,
    catItem,
    saldoWms,
    saldoFisico,
    status,
    username_id,
  };
}

const rows = [
  createData(
    "22017521",
    "OTTERBOX SYMMETRY IPHONE 6 ROSA/VERDE",
    "ARM F.22.2",
    "ESTOQUE LIVRE",
    "MOVEL",
    1,
    2,
    "false",
    "Eduardo"
  ),
  createData(
    "22017522",
    "OTTERBOX SYMMETRY IPHONE 6 ROSA/VERDE",
    "ARM F.22.2",
    "ESTOQUE LIVRE",
    "MOVEL",
    1,
    2,
    "false",
    "Eduardo"
  ),
];
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function Inventario() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <Dashboard>
      <Typography variant="h5" gutterBottom sx={{ marginBottom: "20px" }}>
        Criar Inventário
      </Typography>
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
      <Card
        sx={{
          width: 300,
          height: 90,
          marginBottom: 2,
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: 150 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
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
              <DownloadForOfflineIcon fontSize="small" />
              <DeleteForeverIcon fontSize="small" sx={{ marginLeft: 3 }} />
            </Box>
          </Box>
        </CardContent>
      </Card>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Descricao</TableCell>
              <TableCell>Endereco</TableCell>
              <TableCell>Tipo Estoque</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Wms</TableCell>
              <TableCell>Fisico</TableCell>
              <TableCell>Usuario</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.item}>
                <TableCell component="th" scope="row">
                  {row.item}
                </TableCell>
                <TableCell>{row.descricao}</TableCell>
                <TableCell>{row.endereco}</TableCell>
                <TableCell>{row.tipoEstoque}</TableCell>
                <TableCell>{row.catItem}</TableCell>
                <TableCell>{row.saldoWms}</TableCell>
                <TableCell>{row.saldoFisico}</TableCell>
                <TableCell>{row.username_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {open && <ModalAddInventario open={open} setOpen={setOpen} />}
    </Dashboard>
  );
}
