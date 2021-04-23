import React from "react";
import Echarts from "@/components/echarts";
import { lineOpt, pieOpt, barOpt } from "./shapeData";

export default function Shape() {
  return (
    <div>
      <h1>Echarts图表</h1>
      <h2>折线图</h2>
      <Echarts option={lineOpt} />
      <h2>柱状图</h2>
      <Echarts option={barOpt} />
      <h2>饼图</h2>
      <Echarts option={pieOpt} />
    </div>
  );
}
