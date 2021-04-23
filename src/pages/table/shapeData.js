const lineOpt = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {},
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: "line",
    },
  ],
};
const barOpt = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: "bar",
      showBackground: true,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)",
      },
    },
  ],
};

const pieOpt = {
  backgroundColor: "#2c343c",

  title: {
    text: "Customized Pie",
    left: "center",
    top: 20,
    textStyle: {
      color: "#ccc",
    },
  },

  tooltip: {
    trigger: "item",
  },

  visualMap: {
    show: false,
    min: 80,
    max: 600,
    inRange: {
      colorLightness: [0, 1],
    },
  },
  series: [
    {
      name: "访问来源",
      type: "pie",
      radius: "55%",
      center: ["50%", "50%"],
      data: [
        { value: 335, name: "直接访问" },
        { value: 310, name: "邮件营销" },
        { value: 274, name: "联盟广告" },
        { value: 235, name: "视频广告" },
        { value: 400, name: "搜索引擎" },
      ].sort(function (a, b) {
        return a.value - b.value;
      }),
      roseType: "radius",
      label: {
        color: "rgba(255, 255, 255, 0.3)",
      },
      labelLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.3)",
        },
        smooth: 0.2,
        length: 10,
        length2: 20,
      },
      itemStyle: {
        color: "#c23531",
        shadowBlur: 200,
        shadowColor: "rgba(0, 0, 0, 0.5)",
      },

      animationType: "scale",
      animationEasing: "elasticOut",
      animationDelay: function (idx) {
        return Math.random() * 200;
      },
    },
  ],
};

export { lineOpt, barOpt, pieOpt };
