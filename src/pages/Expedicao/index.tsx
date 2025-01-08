import { useState, useEffect } from "react";
import Painel from "../../components/Painel";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import Loading from "../../components/loanding";
import { UInotafiscalList } from "../../types";
import Search from "../../components/Search";
import CustomStepper from "../../components/StepperExpedicao";
import { useExpedicao } from "../../contexts/hooks/Expedicao";
import ActionExpedicao from "../../components/ActionExpedicao";
import ModalDeleteNotaFiscal from "../../components/ModalDeleteNotaFiscal";

type StepStatus = "conferido" | "conferencia" | "divergencia" | "pendente";

export default function Expedicao() {
  const {
    expedicaoData,
    loadExpedicaoData,
    notafiscalData,
    LisIdNotaFiscalData,
    updateExpedicaoData,
    listIdExpedicaoData,
    downloadExpedicao,
    Releaseblocked,
    expedicaoBlocked,
    setExpedicaoBlocked,
  } = useExpedicao();

  const [idDelete, setIdDelete] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState<StepStatus>("pendente");
  const [update, setUpdate] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  const [searchData, setSearchData] = useState<UInotafiscalList[]>();

  let search = searchData !== undefined ? searchData : notafiscalData;

  useEffect(() => {
    loadExpedicaoData();

    setUpdate(false);

    return () => {
      LisIdNotaFiscalData("1");
    };
  }, []);

  function handleOpenDelete() {
    if (notafiscalData && notafiscalData.length > 0) {
      setOpenDelete(true);
    }
  }

  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;

    setName(value);

    const filterName = expedicaoData!.filter((data) => data.name === value);

    setIdDelete(filterName[0].id);
    setDate(filterName[0].date);
    LisIdNotaFiscalData(filterName[0].id);
    setExpedicaoBlocked(filterName[0].blocked);

    const newStatus = filterName[0].status;
    if (
      newStatus === "conferido" ||
      newStatus === "conferencia" ||
      newStatus === "divergencia" ||
      newStatus === "pendente"
    ) {
      setStatus(newStatus);
    } else {
      console.error("Status inválido:", newStatus);
    }
    setSearchData(undefined);
  };

  function handleDownload() {
    if (expedicaoData && expedicaoData.length > 0) {
      downloadExpedicao(idDelete, name, date);
    }
  }

  function handleUpdate() {
    if (idDelete) {
      LisIdNotaFiscalData(idDelete);
      listIdExpedicaoData(idDelete);
      setUpdate(true);
    } else {
      toast.error("Favor selecione expedição para atualizar");
    }
  }

  function handleReleaseblocked() {
    if (idDelete) {
      Releaseblocked(idDelete);
      LisIdNotaFiscalData(idDelete);
      listIdExpedicaoData(idDelete);
      setUpdate(true);
    } else {
      toast.error("Favor selecione expedição para desbloquear");
    }
  }

  const handleSeach = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    const filterInvData = notafiscalData?.filter((data) => {
      return Object.values(data).some((value) => {
        if (value === null) {
          return false;
        }
        return value.toString().toLowerCase().includes(newValue.toLowerCase());
      });
    });

    setSearchData(filterInvData);
  }, 500);

  useEffect(() => {
    if (updateExpedicaoData) {
      const newStatus = updateExpedicaoData.status;
      if (
        newStatus === "conferido" ||
        newStatus === "conferencia" ||
        newStatus === "divergencia" ||
        newStatus === "pendente"
      ) {
        setStatus(newStatus);
      } else {
        console.error("Status inválido:", newStatus);
      }
    }
  }, [updateExpedicaoData]);

  return (
    <Painel>
      {notafiscalData && notafiscalData?.length > 0 && (
        <CustomStepper
          currentStatus={status}
          idExpedicao={idDelete}
          blocked={expedicaoBlocked}
          handleReleaseblocked={handleReleaseblocked}
        />
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <ActionExpedicao
          name={name}
          handleOpenDelete={handleOpenDelete}
          handleChange={handleChange}
          handleDownload={handleDownload}
          handleUpdate={handleUpdate}
        />
        <Search handleSeach={handleSeach} />
      </Box>

      <Loading />
      <TableContainer component={Paper} sx={{ maxHeight: 480 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 120 }}>Codigo</TableCell>
              <TableCell sx={{ width: 250 }}>Descricao</TableCell>
              <TableCell sx={{ width: 120 }}>QuantidadeNF</TableCell>
              <TableCell>Fisico</TableCell>
              <TableCell>Div</TableCell>
              <TableCell>Nota Fiscal</TableCell>
              <TableCell>Fornecimento</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Usuario</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {search !== undefined && search?.length > 0 ? (
              search.map((notafiscal) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={notafiscal.id}
                >
                  <TableCell component="th" scope="row">
                    {notafiscal.codigo}
                  </TableCell>
                  <TableCell>{notafiscal.description}</TableCell>
                  <TableCell>{notafiscal.quantityNF}</TableCell>
                  <TableCell>{notafiscal.quantityPhysical}</TableCell>
                  <TableCell>
                    {notafiscal.quantityPhysical - notafiscal.quantityNF}
                  </TableCell>
                  <TableCell>{notafiscal.number}</TableCell>
                  <TableCell>{notafiscal.supply}</TableCell>
                  <TableCell>{notafiscal.status}</TableCell>
                  <TableCell>{notafiscal.conference_user}</TableCell>
                  {/* <TableCell>
                    <IosShareIcon
                      fontSize="small"
                      sx={{ marginRight: "10px", cursor: "pointer" }}
                      onClick={() => handleUpdateSecond(inventario.id)}
                    />
                  </TableCell> */}
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
      {openDelete && (
        <ModalDeleteNotaFiscal
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          idDelete={idDelete}
        />
      )}
      {/* {open && (
          <ModalUpdateSecond
            open={open}
            setOpen={setOpen}
            updateSecondData={updateSecondData}
          />
        )} */}
    </Painel>
  );
}
