import { Gauge } from "@ant-design/plots";
import { useDashboard } from "../../contexts/hooks/Dashboard";

const GraphicAcuracidade = () => {
  const { dashboardData } = useDashboard();

  const config = {
    percent: Number(dashboardData?.acuracidade) / 100,
    range: {
      color: "l(0) 0:#9de0b1 1:#1bad47",
    },
    startAngle: Math.PI,
    endAngle: 2 * Math.PI,
    indicator: false || undefined,
    statistic: {
      title: {
        offsetY: -36,
        style: {
          fontSize: "36px",
          color: "#4B535E",
        },
        formatter: () => `${dashboardData?.acuracidade}%`,
      },
      content: {
        style: {
          fontSize: "24px",
          lineHeight: "44px",
          color: "#4B535E",
        },
        formatter: () => "Acuracidade",
      },
    },
  };
  const columnStyle = {
    width: "280px",
    height: "140px",
  };
  return <Gauge {...config} style={columnStyle} />;
};

export default GraphicAcuracidade;
