import { Bar } from "@ant-design/plots";
import { useDashboard } from "../../contexts/hooks/Dashboard";
import { useMemo } from "react";
import { UIdashboardList } from "../../types";

interface DataItem {
  year: string;
  value: number;
}

interface PropsDashboardData {
  totalFalta: number;
  totalSobra: number;
}

const GraphicBarraH = ({ totalFalta, totalSobra }: PropsDashboardData) => {
  const data: DataItem[] = [
    {
      year: "Falta",
      value: totalFalta ? totalFalta : 0,
    },
    {
      year: "Sobra",
      value: totalSobra ? totalSobra : 0,
    },
  ];
  const config = {
    data,
    xField: "value",
    yField: "year",
    seriesField: "year",
    label: {
      position: "middle" as "middle",
      offset: 4,
    },
    legend: {
      position: "top" as "top",
    },
    color: ["#db111b", "#ebb504"],
  };
  const columnStyle = {
    width: "260px",
    height: "150px",
  };
  return <Bar {...config} style={columnStyle} />;
};

export default GraphicBarraH;
