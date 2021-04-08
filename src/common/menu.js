const menu = [
  {
    title: "主页",
    key: "home",
    path: "/home",
    type: 0,
    icon: "icon_home",
  },
  {
    title: "图表",
    key: "table",
    path: "/table",
    type: 0,
    icon: "icon_faimlyalbum",
    children: [
      {
        title: "表格",
        key: "t_table",
        path: "/table",
        type: 0,
      },
      {
        title: "图表",
        key: "shape",
        path: "/shape",
        type: 0,
      },
      {
        title: "表单",
        key: "form",
        path: "/form",
        type: 0,
      },
    ],
  },
  {
    title: "拖拽组件",
    key: "drag",
    path: "/drag",
    type: 0,
  },
  {
    title: "404页面",
    key: "404",
    path: "/test404",
    type: 0,
  },
];

export default menu.map((i) => {
  if (i.children) {
    i.children = i.children.map((child) => ({
      ...child,
      parentKey: i.key,
      path: i.path + child.path,
    }));
  }
  i.parentKey = "";
  return i;
});
