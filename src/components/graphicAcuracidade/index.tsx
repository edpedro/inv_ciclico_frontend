import { Gauge } from "@ant-design/plots";

interface ProsAcuracidade {
  acuracidade: number;
}

const GraphicAcuracidade = ({ acuracidade }: ProsAcuracidade) => {
  const config = {
    percent: Number(acuracidade) / 100,
    range: {
      color: "l(0) 0:#9de0b1 1:#1bad47",
    },
    startAngle: Math.PI,
    endAngle: 2 * Math.PI,
    indicator: false || undefined,
    statistic: {
      title: {
        offsetY: -30,
        style: {
          fontSize: "28px",
          color: "#4B535E",
        },
        formatter: () => `${acuracidade}%`,
      },
      content: {
        style: {
          fontSize: "20px",
          lineHeight: "44px",
          color: "#4B535E",
        },
        formatter: () => "Acuracidade",
      },
    },
  };
  const columnStyle = {
    width: "280px",
    height: "100px",
  };
  return <Gauge {...config} style={columnStyle} />;
};

export default GraphicAcuracidade;
