import { Pie } from "@ant-design/plots";

interface DataItem {
  type: string;
  value: number;
}

interface PropsDashboardData {
  totalSomaDivergencias: number;
  totalSomaContagem: number;
}

const GraphicPizza = ({
  totalSomaDivergencias,
  totalSomaContagem,
}: PropsDashboardData) => {
  const data: DataItem[] = [
    {
      type: "Divergência",
      value: totalSomaDivergencias ? totalSomaDivergencias : 0,
    },
    {
      type: "Acertos",
      value: totalSomaContagem ? totalSomaContagem : 0,
    },
  ];

  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    color: ["#db111b", "#1bad47"],
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      // content: (data: any) => {
      //   const percent = data.percent;
      //   return `${(percent * 100).toFixed(0)}%`;
      // },
      content: "{percentage}",
      style: {
        fontSize: 14,
        textAlign: "center",
        color: "#fff",
      },
    },

    pieStyle: ({ type }: { type: string }) => {
      if (type === "Divergência") {
        return { fill: "#db111b" };
      } else if (type === "Acertos") {
        return { fill: "#1bad47" };
      }
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  const columnStyle = {
    width: "500px",
    height: "190px",
  };
  return <Pie {...config} style={columnStyle} />;
};

export default GraphicPizza;
