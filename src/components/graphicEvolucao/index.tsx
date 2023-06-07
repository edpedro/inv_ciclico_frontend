import { Liquid } from "@ant-design/plots";
import { useDashboard } from "../../contexts/hooks/Dashboard";

const GraphicEvolucao = () => {
  const { dashboardData } = useDashboard();
  const config = {
    percent: Number(dashboardData?.evolucaoContagem) / 100,
    outline: {
      border: 6,
      distance: 6,
    },
    wave: {
      length: 128,
    },
    color: () => "#1bad47", // Set the color to "#1bad47"
    statistic: {
      content: {
        formatter: () => `${dashboardData?.evolucaoContagem}%`, // Customize the display format of the percent
        style: {
          fontSize: "20px", // Reduce the font size of the percent
          fill: "#000000", // Set the font color of the percent
        },
      },
    },
  };
  const columnStyle = {
    width: "300px",
    height: "120px",
  };
  return <Liquid {...config} style={columnStyle} />;
};

export default GraphicEvolucao;
