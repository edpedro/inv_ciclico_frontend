import { useEffect } from "react";
import Painel from "../../components/Painel";
import Typography from "@mui/material/Typography";
import { useName } from "../../contexts/hooks/NewName";

import mapaSistema from "../../assets/mapaSistema.png";

export default function Home() {
  const { loadNameData } = useName();

  useEffect(() => {
    loadNameData();
  }, []);

  return (
    <Painel>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ marginBottom: "20px", textAlign: "center" }}
      >
        Bem-vindo ao Mapa do Sistema
      </Typography>
      <div style={{ height: "100%" }}>
        <img
          src={mapaSistema}
          alt="Mapa do Sistema"
          style={{ height: "100%", width: "100%" }}
        />
      </div>
    </Painel>
  );
}
