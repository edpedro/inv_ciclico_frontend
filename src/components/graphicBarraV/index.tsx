import React from "react";
import { Column } from "@ant-design/plots";
import { IntervalGeometryLabelPosition } from "@antv/g2/lib/interface";
import { useDashboard } from "../../contexts/hooks/Dashboard";

interface DataItem {
  type: string;
  sales: number;
}

const GraphicBarraV: React.FC = () => {
  const { dashboardData } = useDashboard();

  const data: DataItem[] = [
    {
      type: "Divergência",
      sales: dashboardData ? dashboardData?.totalDivergencia : 0,
    },
    {
      type: "Acertos",
      sales: dashboardData ? dashboardData?.totalAcertos : 0,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",
    columnWidthRatio: 0.3,
    label: {
      position: "middle" as IntervalGeometryLabelPosition,
      style: {
        fill: "#000",
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "categoria",
      },
      sales: {
        alias: "Total",
      },
    },
    columnStyle: ({ type }: { type: string }) => {
      if (type === "Divergência") {
        return { fill: "#db111b" };
      } else if (type === "Acertos") {
        return { fill: "#1bad47" };
      }
    },
  };
  const columnStyle = {
    width: "280px",
    height: "180px",
  };
  return <Column {...config} style={columnStyle} />;
};

export default GraphicBarraV;
