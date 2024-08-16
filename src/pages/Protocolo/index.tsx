import { useState, useEffect } from "react";
import Painel from "../../components/Painel";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import Loading from "../../components/loanding";
import { UIProtocoloList } from "../../types";
import Search from "../../components/Search";
import ActionProtocolo from "../../components/ActionProtocolo";

import { useProtocolo } from "../../contexts/hooks/Reversa";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export default function Protocolo() {
  const {
    loadNameProtocoloData,
    loadProtocoloData,
    listIdProtocoloData,
    protocoloData,
    idProtocoloData,
    downloadProtocolo,
  } = useProtocolo();

  const [idDelete, setIdDelete] = useState("");
  const [name, setName] = useState("");

  const [update, setUpdate] = useState(false);
  const [download, setDownload] = useState<UIProtocoloList[]>();
  const [protocolo, setProtocolo] = useState<UIProtocoloList[]>();

  const [searchData, setSearchData] = useState<UIProtocoloList[]>();

  const search = searchData !== undefined ? searchData : idProtocoloData;

  const fusoHorario = "America/Sao_Paulo";

  useEffect(() => {
    loadNameProtocoloData();
    loadProtocoloData();

    setUpdate(false);
  }, [update]);

  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;

    setName(value);

    const filterName = protocoloData!.filter(
      (data) => data.nameProtocols.name === value
    );

    if (filterName[0].nameProtocols.id) {
      listIdProtocoloData(filterName[0].nameProtocols.id);
      setIdDelete(filterName[0].nameProtocols.id);
      setProtocolo(filterName);

      setDownload(filterName);
    }

    setSearchData(undefined);
  };

  function handleDownload() {
    if (download && download.length > 0) {
      downloadProtocolo(
        download[0].nameProtocols.id,
        download[0].nameProtocols.name,
        download[0].nameProtocols.date
      );
    }
  }

  function handleUpdate() {
    setUpdate(true);
    if (idDelete) {
      listIdProtocoloData(idDelete);
    } else {
      toast.error("Favor selecione protocolo para atualizar");
    }
  }

  const handleSeach = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    const filterProtocoloData = protocolo?.filter((data) => {
      return Object.values(data).some((value) => {
        if (value === null) {
          return false;
        }
        return value.toString().toLowerCase().includes(newValue.toLowerCase());
      });
    });

    setSearchData(filterProtocoloData);
  }, 500);

  return (
    <Painel>
      <Typography variant="h6" gutterBottom sx={{ marginBottom: "8px" }}>
        Protocolo
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <ActionProtocolo
          name={name}
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
              <TableCell>Data</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Codigo</TableCell>
              <TableCell>Serial</TableCell>
              <TableCell>Caixa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {search !== undefined && search?.length > 0 ? (
              search.map((protocolo) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={protocolo.id}
                >
                  <TableCell component="th" scope="row">
                    {format(
                      utcToZonedTime(protocolo.nameProtocols.date, fusoHorario),
                      "dd/MM/yyyy"
                    )}
                  </TableCell>
                  <TableCell>{protocolo.nameProtocols.user.name}</TableCell>
                  <TableCell>{protocolo.codigo}</TableCell>
                  <TableCell>{protocolo.serial}</TableCell>
                  <TableCell>{protocolo.caixa}</TableCell>
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
    </Painel>
  );
}
