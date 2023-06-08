import { useState, useEffect } from "react";
import Painel from "../../components/Painel";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ModalAddInventario from "../../components/ModalAddInventario";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useName } from "../../contexts/hooks/NewName";
import { useInventario } from "../../contexts/hooks/Inventario";
import ModalDeleteInventario from "../../components/ModalDeleteInventario";
import { toast } from "react-toastify";
import Loading from "../../components/loanding";

export default function Inventario() {
  const { nameData, loadNameData } = useName();
  const { listIdInventarioData, inventarioData, downloadInventario } =
    useInventario();

  const [open, setOpen] = useState(false);

  const [idDelete, setIdDelete] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [update, setUpdate] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    loadNameData();

    setUpdate(false);
  }, [update]);

  const handleOpen = () => setOpen(true);

  function handleOpenDelete() {
    if (inventarioData && inventarioData.length > 0) {
      setOpenDelete(true);
    }
  }

  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;

    setName(value);

    const filterName = nameData!.filter((data) => data.name === value);
    setIdDelete(filterName[0].id);
    setDate(filterName[0].date);
    listIdInventarioData(filterName[0].id);
  };

  function handleDownload() {
    if (inventarioData && inventarioData.length > 0) {
      downloadInventario(idDelete, name, date);
    }
  }

  function handleUpdate() {
    setUpdate(true);
    if (idDelete) {
      listIdInventarioData(idDelete);
    } else {
      toast.error("Favor selecione inventario para atualizar");
    }
  }

  return (
    <Painel>
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

      <Card
        sx={{
          width: 550,
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
                onClick={() => handleDownload()}
              />
              <DeleteForeverIcon
                onClick={() => handleOpenDelete()}
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
      <Loading />
      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 120 }}>Item</TableCell>
              <TableCell sx={{ width: 250 }}>Descricao</TableCell>
              <TableCell sx={{ width: 120 }}>Endereco</TableCell>
              <TableCell>Tipo Estoque</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Wms</TableCell>
              <TableCell>1°</TableCell>
              <TableCell>2°</TableCell>
              <TableCell>Div</TableCell>
              <TableCell>Usuario</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventarioData ? (
              inventarioData.map((inventario) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={inventario.id}
                >
                  <TableCell component="th" scope="row">
                    {inventario.item}
                  </TableCell>
                  <TableCell>{inventario.descricao}</TableCell>
                  <TableCell>{inventario.endereco}</TableCell>
                  <TableCell>{inventario.tipoEstoque}</TableCell>
                  <TableCell>{inventario.catItem}</TableCell>
                  <TableCell>{inventario.saldoWms}</TableCell>
                  <TableCell>{inventario.firstCount}</TableCell>
                  <TableCell>{inventario.secondCount}</TableCell>
                  <TableCell>
                    {inventario.secondCount
                      ? inventario.secondCount - inventario.saldoWms
                      : inventario.firstCount - inventario.saldoWms}
                  </TableCell>
                  <TableCell>{inventario.user?.name}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell component="th" scope="row">
                  Dados não encontrados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {open && <ModalAddInventario open={open} setOpen={setOpen} />}
      {openDelete && (
        <ModalDeleteInventario
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          idDelete={idDelete}
        />
      )}
    </Painel>
  );
}
