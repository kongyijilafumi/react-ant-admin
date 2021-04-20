import React from "react";
import ReactEcharts from 'echarts-for-react';
const Echart = ({ option, theme = "light", style }) => {
    return (
        <ReactEcharts option={option} theme={theme} style={style} />
    )
}

export default Echart