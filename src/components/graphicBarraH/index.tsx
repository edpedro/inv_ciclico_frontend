import { Bar } from "@ant-design/plots";
import { useDashboard } from "../../contexts/hooks/Dashboard";
import { useMemo } from "react";
import { UIdashboardList } from "../../types";

interface DataItem {
  year: string;
  value: number;
}

const GraphicBarraH = () => {
  const { dashboardData } = useDashboard();

  const data: DataItem[] = [
    {
      year: "Falta",
      value: dashboardData ? dashboardData?.totalFalta : 0,
    },
    {
      year: "Sobra",
      value: dashboardData ? dashboardData?.totalSobra : 0,
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
    width: "280px",
    height: "180px",
  };
  return <Bar {...config} style={columnStyle} />;
};

export default GraphicBarraH;
