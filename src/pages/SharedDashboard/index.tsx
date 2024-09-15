import { useEffect, useState } from "react";
import Painel from "../../components/Painel";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ListIcon from "@mui/icons-material/List";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VerticalShadesClosedIcon from "@mui/icons-material/VerticalShadesClosed";
import Filter1Icon from "@mui/icons-material/Filter1";
import Filter2Icon from "@mui/icons-material/Filter2";
import GraphicBarraH from "../../components/graphicBarraH";
import GraphicBarraV from "../../components/graphicBarraV";
import GraphicPizza from "../../components/graphicPizza";
import GraphicAcuracidade from "../../components/graphicAcuracidade";
import Loading from "../../components/loanding";
import IndicatorPerfom from "../../components/IndicatorPerfom";
import GraphicNEvoluc from "../../components/graphicNEvoluc";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UIdashboardList } from "../../types";
import LinearProgress from "@mui/material/LinearProgress";

export default function SharedDashboard() {
  const [dashboardData, setDashboardData] = useState<UIdashboardList | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_URL}dashboard/${id}`
        );
        setDashboardData(data);
      } catch (err) {
        console.error(err);
        // Handle error state here
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 50000);

    return () => clearInterval(intervalId);
  }, [id]);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTable = useMediaQuery(theme.breakpoints.down("md"));

  if (loading || !dashboardData) {
    return <LinearProgress color="success" />;
  }

  return (
    <Painel>
      <Loading />
      <Box
        sx={{
          display: "flex",
          flexDirection: isTable ? "column" : "row",
          alignItems: "center",
          marginBottom: 1,
        }}
      >
        {!isMobile && (
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              textAlign: "center",
              marginLeft: "270px",
            }}
          >
            PAINEL ANÁLISE DE INVENTÁRIO - IBL/TELEFONICA
          </Typography>
        )}
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item sm={6} xs={12} md={4}>
            <IndicatorPerfom
              indicadorDesempenho={dashboardData.indicadorDesempenho}
            />
          </Grid>
          <Grid item xs={6} sm={2} md={2}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Card sx={{ borderRadius: 1, width: 160, height: 50 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <ListIcon
                      sx={{
                        marginLeft: 1,
                        marginTop: 1,
                        fontSize: 25,
                        color: "#1bad47",
                      }}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",

                        marginLeft: 2,
                        marginTop: 1,
                      }}
                    >
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        sx={{ fontWeight: "bold", marginBottom: -1 }}
                      >
                        Total SKUs
                      </Typography>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: "bold", marginLeft: 1 }}
                      >
                        {dashboardData ? dashboardData?.totalSKU : 0}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card sx={{ borderRadius: 1, width: 160, height: 50 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <VerticalShadesClosedIcon
                      sx={{
                        marginLeft: 1,
                        marginTop: 1,
                        fontSize: 19,
                        color: "#1bad47",
                      }}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",

                        marginLeft: 2,
                        marginTop: 1,
                      }}
                    >
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        sx={{ fontWeight: "bold", marginBottom: -1 }}
                      >
                        Total Endereços
                      </Typography>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: "bold", marginRight: 1 }}
                      >
                        {dashboardData ? dashboardData?.totalEndereco : 0}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card sx={{ borderRadius: 1, width: 160, height: 50 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Filter1Icon
                      sx={{
                        marginLeft: 1,
                        marginTop: 1,
                        fontSize: 18,
                        color: "#1bad47",
                      }}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",

                        marginLeft: 2,
                        marginTop: 1,
                      }}
                    >
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        sx={{ fontWeight: "bold", marginBottom: -1 }}
                      >
                        Primeira contagem
                      </Typography>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: "bold", marginRight: 2 }}
                      >
                        {dashboardData
                          ? dashboardData?.totalPrimeiraContagem
                          : 0}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card sx={{ borderRadius: 1, width: 160, height: 50 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Filter2Icon
                      sx={{
                        marginLeft: 1,
                        marginTop: 1,
                        fontSize: 18,
                        color: "#1bad47",
                      }}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",

                        marginLeft: 2,
                        marginTop: 1,
                      }}
                    >
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        sx={{ fontWeight: "bold", marginBottom: -1 }}
                      >
                        Segunda contagem
                      </Typography>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: "bold", marginRight: 2 }}
                      >
                        {dashboardData
                          ? dashboardData?.totalSegundaContagem
                          : 0}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={2} sm={2}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Card sx={{ borderRadius: 1, width: 160, height: 50 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <AccessTimeIcon
                      sx={{
                        marginLeft: 1,
                        marginTop: 1,
                        fontSize: 18,
                        color: "#1bad47",
                      }}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginLeft: 3,
                        marginTop: 1,
                      }}
                    >
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        sx={{ fontWeight: "bold", marginBottom: -1 }}
                      >
                        Evolução
                      </Typography>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: "bold" }}
                      >
                        {dashboardData
                          ? `${dashboardData?.evolucaoContagem}%`
                          : 0}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card sx={{ borderRadius: 1, width: 160, height: 50 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <AccessTimeIcon
                      sx={{
                        marginLeft: 1,
                        marginTop: 1,
                        fontSize: 18,
                        color: "#1bad47",
                      }}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginLeft: 2,
                        marginTop: 1,
                      }}
                    >
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        sx={{ fontWeight: "bold", marginBottom: -1 }}
                      >
                        Duração
                      </Typography>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: "bold" }}
                      >
                        {dashboardData ? dashboardData?.tempoInventario : 0}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card sx={{ borderRadius: 1, width: 160 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <PersonIcon
                      sx={{
                        marginLeft: 1,
                        marginTop: 1,
                        fontSize: 18,
                        color: "#1bad47",
                      }}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginLeft: 2,
                        marginTop: 1,
                      }}
                    >
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        sx={{ fontWeight: "bold" }}
                      >
                        Usuarios
                      </Typography>
                      {dashboardData &&
                        dashboardData.usersPoints &&
                        dashboardData.usersPoints.map((item) => (
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                            sx={{ marginBottom: 0 }}
                          >
                            {item.name} - {item.totalPoints}
                          </Typography>
                        ))}
                    </Box>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={4} xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Card sx={{ height: 120 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: 2,
                    }}
                  >
                    <GraphicAcuracidade
                      acuracidade={Number(dashboardData.acuracidade)}
                    />
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <Typography
                    variant="caption"
                    display="block"
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
                    <GraphicBarraV dashboardData={dashboardData} />
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={4} xs={12} sx={{ marginTop: -2 }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Card>
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      marginTop: 1,
                      marginBottom: -1,
                    }}
                  >
                    EVOLUÇÃO POR RUA
                  </Typography>
                  <Box
                    sx={{
                      p: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <GraphicNEvoluc
                      evolucaoPorRua={dashboardData.evolucaoPorRua}
                    />
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={4} xs={12} sx={{ marginTop: -2 }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Card>
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      marginTop: 1,
                      marginBottom: -2,
                    }}
                  >
                    STATUS
                  </Typography>
                  <Box
                    sx={{
                      p: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <GraphicPizza
                      totalSomaDivergencias={
                        dashboardData.totalSomaDivergencias
                      }
                      totalSomaContagem={dashboardData.totalSomaContagem}
                    />
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={4} xs={12} sx={{ marginTop: -2 }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Card sx={{ height: 212 }}>
                  <Typography
                    variant="caption"
                    display="block"
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
                    <GraphicBarraH
                      totalFalta={dashboardData.totalFalta}
                      totalSobra={dashboardData.totalSobra}
                    />
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Painel>
  );
}
