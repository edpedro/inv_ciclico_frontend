import { Bar } from "@ant-design/plots";
import { useDashboard } from "../../contexts/hooks/Dashboard";

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
      position: "middle",

      offset: 4,
    },
    legend: {
      position: "top",
    },
    color: (data: DataItem) => {
      if (data.year === "Falta") {
        return "#db111b";
      } else if (data.year === "Sobra") {
        return "#ebb504";
      }
    },
  };
  const columnStyle = {
    width: "280px",
    height: "180px",
  };
  return <Bar {...config} style={columnStyle} />;
};

export default GraphicBarraH;
