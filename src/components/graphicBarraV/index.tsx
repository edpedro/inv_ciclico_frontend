import React, { useMemo } from "react";
import { Column } from "@ant-design/plots";
import { IntervalGeometryLabelPosition } from "@antv/g2/lib/interface";
import { useDashboard } from "../../contexts/hooks/Dashboard";
import { UIdashboardList } from "../../types";

interface DataItem {
  type: string;
  sales: number;
}
interface ProsDashboardData {
  dashboardData: UIdashboardList;
}

const GraphicBarraV: React.FC<ProsDashboardData> = ({ dashboardData }) => {
  const memoizedData = useMemo(() => {
    if (!dashboardData) {
      return [];
    }

    const { totalDivergencia = 0, totalAcertos = 0 } =
      dashboardData as UIdashboardList;

    return [
      { type: "Divergência", sales: totalDivergencia },
      { type: "Acertos", sales: totalAcertos },
    ];
  }, [dashboardData]);

  if (memoizedData.length === 0) {
    return <div>No data available for the chart</div>;
  }

  const config = {
    data: memoizedData,
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
      type: { alias: "categoria" },
      sales: { alias: "Total" },
    },
    columnStyle: ({ type }: { type: string }) => ({
      fill: type === "Divergência" ? "#db111b" : "#1bad47",
    }),
  };

  return <Column {...config} style={{ width: "200px", height: "100px" }} />;
};

export default GraphicBarraV;
