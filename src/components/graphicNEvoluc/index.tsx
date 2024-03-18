import { Bullet } from "@ant-design/plots";
import { useDashboard } from "../../contexts/hooks/Dashboard";

const GraphicNEvoluc = () => {
  const { dashboardData } = useDashboard();

  const dataNew =
    dashboardData?.evolucaoPorRua.map((item) => {
      return {
        title: item.Rua,
        ranges: [100],
        measures: [parseInt(item.EvolRua)],
        targets: [0],
      };
    }) || [];

  const color = {
    ranges: ["#bfeec8"],
    measures: ["#1bad47"],
    targets: ["#f0f"],
  };

  const config = {
    data: dataNew,
    color: {
      measure: color.measures[0],
      range: color.ranges[0],
      target: color.targets[0],
    },
    xField: "title",
    style: {
      width: "330px",
      height: "180px",
    },
    measureField: "measures",
    rangeField: "ranges",
    targetField: "targets",
  };

  return <Bullet {...config} />;
};

export default GraphicNEvoluc;
