import { useState, useEffect } from "react";
import Painel from "../../components/Painel";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ModalAddInventario from "../../components/ModalAddInventario";
import { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import { useName } from "../../contexts/hooks/NewName";
import { useInventario } from "../../contexts/hooks/Inventario";
import ModalDeleteInventario from "../../components/ModalDeleteInventario";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import Loading from "../../components/loanding";
import { UIinventarioList } from "../../types";
import Search from "../../components/Search";
import UploadExcel from "../../components/UploadExcel";
import ActionInventario from "../../components/ActionInventario";

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

  const [searchData, setSearchData] = useState<UIinventarioList[]>();

  const search = searchData !== undefined ? searchData : inventarioData;

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

  const handleSeach = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    const filterInvData = inventarioData?.filter((data) => {
      return Object.values(data).some((value) => {
        if (value === null) {
          return false;
        }
        return value.toString().toLowerCase().includes(newValue.toLowerCase());
      });
    });

    setSearchData(filterInvData);
  }, 500);

  return (
    <Painel>
      <UploadExcel handleOpen={handleOpen} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <ActionInventario
          name={name}
          handleOpenDelete={handleOpenDelete}
          handleChange={handleChange}
          handleDownload={handleDownload}
          handleUpdate={handleUpdate}
        />
        <Search handleSeach={handleSeach} />
      </Box>

      <Loading />
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
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
            {search !== undefined && search?.length > 0 ? (
              search.map((inventario) => (
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
