const menu = [
  {
    title: "栏目1",
    key: "nav1",
    path: "/nav",
    type: 0,
    icon: "icon_home",
    children: [
      {
        title: "home",
        key: "home",
        path: "/",
        icon: "icon_message",
        type: 0,
      },
    ],
  },
  {
    title: "栏目2",
    key: "nav2",
    path: "/nav2",
    type: 0,
    icon: "icon_info",
    children: [
      {
        icon: "icon_genieSEC",
        title: "demo",
        key: "demo",
        path: "/demo",
        type: 0,
      },
      {
        title: "test",
        key: "test",
        path: "/test",
        type: 0,
      },
    ],
  },
  {
    title: "栏目3",
    key: "nav3",
    path: "/nav3",
    type: 0,
  },
];

export default menu
  .map((i) => {
    if (i.children) {
      i.children = i.children.map((child) => ({ ...child, parentKey: i.key }));
    }
    i.parentKey = "";
    return i;
  })
  .concat(
    Array.from({ length: 10 }, (v, k) => ({
      title: "栏目" + (k + 5),
      key: "nav" + (k + 5),
      path: "/nav" + (k + 5),
      type: 0,
    }))
  );
