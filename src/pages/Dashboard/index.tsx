import { useEffect, useState } from "react";
import Painel from "../../components/Painel";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ListIcon from "@mui/icons-material/List";
import VerticalShadesClosedIcon from "@mui/icons-material/VerticalShadesClosed";
import Filter1Icon from "@mui/icons-material/Filter1";
import Filter2Icon from "@mui/icons-material/Filter2";
import GraphicBarraH from "../../components/graphicBarraH";
import GraphicBarraV from "../../components/graphicBarraV";
import GraphicPizza from "../../components/graphicPizza";
import GraphicAcuracidade from "../../components/graphicAcuracidade";
import GraphicEvolucao from "../../components/graphicEvolucao";
import SelectAutoInv from "../../components/SelectAutoInv";
import { SelectChangeEvent } from "@mui/material/Select";
import { useDashboard } from "../../contexts/hooks/Dashboard";
import { useName } from "../../contexts/hooks/NewName";
import Loading from "../../components/loanding";

export default function Dashboard() {
  const { dashboardData, ListDashboard, setUIRemoveData } = useDashboard();
  const { nameData } = useName();

  const [nameInv, setNameInv] = useState("");
  const [idDashboard, setIdDashboard] = useState("");

  const handleChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;

    setNameInv(value);

    const filterName = nameData!.filter((data) => data.name === value);

    if (value) {
      setIdDashboard(filterName[0].id);
      //ListDashboard(filterName[0].id);
    }
  };

  useEffect(() => {
    let timeoutId: number;
    const polling = () => {
      if (idDashboard) {
        ListDashboard(idDashboard);
      }

      timeoutId = setTimeout(polling, 50000);
    };

    polling();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [idDashboard]);

  return (
    <Painel>
      <Loading />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 1,
        }}
      >
        <SelectAutoInv nameInv={nameInv} handleChange={handleChange} />
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            textAlign: "center",
            marginLeft: "100px",
          }}
        >
          PAINEL INVENTÁRIO - IBL/TELEFONICA
        </Typography>
      </Box>
      {dashboardData ? (
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Card sx={{ borderRadius: 3, width: 210, height: 80 }}>
              <Box
                sx={{
                  p: 1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Box>
                  <ListIcon color="primary" sx={{ fontSize: 40 }} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 2,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
                    Total SKUs
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    {dashboardData ? dashboardData?.totalSKU : 0}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card sx={{ borderRadius: 3, width: 210, height: 80 }}>
              <Box
                sx={{
                  p: 1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Box>
                  <VerticalShadesClosedIcon
                    color="primary"
                    sx={{ fontSize: 30 }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 2,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
                    Total Endereços
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    {dashboardData ? dashboardData?.totalEndereco : 0}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card sx={{ borderRadius: 3, width: 200, height: 80 }}>
              <Box
                sx={{
                  p: 1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Filter1Icon color="primary" sx={{ fontSize: 28 }} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 2,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
                    Primeira contagem
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    {dashboardData ? dashboardData?.totalPrimeiraContagem : 0}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card sx={{ borderRadius: 3, width: 210, height: 80 }}>
              <Box
                sx={{
                  p: 1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Filter2Icon color="primary" sx={{ fontSize: 28 }} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 2,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
                    Segunda contagem
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    {dashboardData ? dashboardData?.totalSegundaContagem : 0}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={5}>
            <Card sx={{ height: 400 }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ fontWeight: "bold", textAlign: "center", marginTop: 1 }}
              >
                POCENTAGEM - STATUS
              </Typography>
              <Box
                sx={{
                  p: 1,
                  display: "flex",

                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <GraphicPizza />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={7}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={6}>
                <Card sx={{ height: 150 }}>
                  <Typography
                    variant="caption"
                    display="block"
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      marginTop: 1,
                    }}
                  >
                    EVOLUÇÃO
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: 2,
                    }}
                  >
                    <GraphicEvolucao />
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={6} md={6}>
                <Card sx={{ height: 150 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: 2,
                    }}
                  >
                    <GraphicAcuracidade />
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={6} md={6}>
                <Card sx={{ height: 235 }}>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      marginTop: 1,
                    }}
                  >
                    FALTA/SOBRA
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: 2,
                    }}
                  >
                    <GraphicBarraH />
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={6} md={6}>
                <Card sx={{ height: 235 }}>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      marginTop: 1,
                    }}
                  >
                    SKU - STATUS
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: 2,
                    }}
                  >
                    <GraphicBarraV />
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            textAlign: "center",
            marginLeft: "100px",
            marginTop: "100px",
          }}
        >
          Favor Selecionar Inventário
        </Typography>
      )}
    </Painel>
  );
}
