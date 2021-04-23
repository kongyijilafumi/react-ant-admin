import dayjs from "dayjs";
let menu = [
  {
    title: "详情页",
    path: "/details",
    key: "details",
    parentKey: "",
    icon: "icon_edit",
    type: "1,0",
  },
  {
    title: "个人中心",
    path: "/person",
    key: "detailsPerson",
    parentKey: "details",
    icon: "icon_infopersonal",
    type: "0,1",
  },
  {
    title: "403",
    path: "/403",
    key: "error403",
    parentKey: "result",
    icon: "",
    type: "1,0",
  },
  {
    title: "404",
    path: "/404",
    key: "error404",
    parentKey: "result",
    icon: "",
    type: "1,0",
  },
  {
    title: "500",
    path: "/500",
    key: "error500",
    parentKey: "result",
    icon: "",
    type: "1,0",
  },
  {
    title: "基础表单",
    path: "/index",
    key: "formIndex",
    parentKey: "from",
    icon: "",
    type: "1,0",
  },
  {
    title: "表单页",
    path: "/form",
    key: "from",
    parentKey: "",
    icon: "icon_form",
    type: "0,1",
  },
  {
    title: "列表页",
    path: "/list",
    key: "list",
    parentKey: "",
    icon: "icon_list",
    type: "0,1",
  },
  {
    title: "卡片列表",
    path: "/card",
    key: "listCard",
    parentKey: "list",
    icon: "",
    type: "0,1",
  },
  {
    title: "查询列表",
    path: "/search",
    key: "listSearch",
    parentKey: "list",
    icon: "",
    type: "0,1",
  },
  {
    title: "权限管理",
    path: "/power",
    key: "power",
    parentKey: "",
    icon: "icon_set",
    type: "0",
  },
  {
    title: "菜单管理",
    path: "/menu",
    key: "powerMenu",
    parentKey: "power",
    icon: "",
    type: "0",
  },
  {
    title: "结果页",
    path: "/result",
    key: "result",
    parentKey: "",
    icon: "icon_voiceprint",
    type: "1,0",
  },
];
const power = {
  status: 0,
  data: [
    { type: "0", name: "超级管理员" },
    { type: "1", name: "普通用户" },
  ],
};
const userInfo = {
  msg: "登录成功",
  status: 0,
  data: { user_id: 1, username: "超级管理员", account: "admin", power: "0" },
};

const addMenu = {
  msg: "添加成功,菜单栏需要关闭页面重新打开即可生效！",
  status: 0,
};
const addMsg = { msg: "添加成功", status: 0 };

const msgList = [
  {
    m_id: 1,
    name: "第一条消息",
    description: "我创建的第一天消息",
    creator: "超级管理员",
    add_time: "2021-04-20 17:01:09",
  },
  {
    m_id: 2,
    name: "RegExp",
    description:
      "RegExp 对象表示正则表达式,它是对字符串执行模式匹配的强大工具。 ",
    creator: "超级管理员",
    add_time: "2021-04-20 17:48:42",
  },
  {
    m_id: 3,
    name: "Ant Design",
    description:
      "antd 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。",
    creator: "超级管理员",
    add_time: "2021-04-20 17:46:44",
  },
  {
    m_id: 4,
    name: "react-ant-admin",
    description:
      "此框架使用与二次开发，前端框架使用react，UI框架使用ant-design，全局数据状态管理使用redux，ajax使用库为axios。用于快速搭建中后台页面。",
    creator: "超级管理员",
    add_time: "2021-04-20 17:28:45",
  },
];
const msg = {
  status: 0,
  data: {
    mapKey: [
      { title: "消息id", dataIndex: "m_id", key: "m_id" },
      { title: "消息名称", dataIndex: "name", key: "name" },
      { title: "消息描述词", dataIndex: "description", key: "description" },
      { title: "创建人", dataIndex: "creator", key: "creator" },
      { title: "创建时间", dataIndex: "add_time", key: "add_time" },
    ],
    total: 4,
  },
  msg: "",
};
const delMenu = { msg: "操作成功", status: 0 };

const MockData = {
  "/getmenu": menu,
  "/getpower": power,
  "/login": userInfo,
  "/addmenu": addMenu,
  "/addmessage": addMsg,
  "/getmessage": msg,
  "/delmenu": delMenu,
  "/getmenuinfo": { status: 0 },
  "/editmenuinfo": { status: 0, msg: "修改成功！" },
};

function get(url) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (url === "/getmenu") {
        return res(formatMenu(MockData[url]));
      }
      res(MockData[url]);
    }, 500);
  });
}

function post(url, data) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      switch (url) {
        case "/login":
          MockData[url].data.account = data.account;
          if (data.account.indexOf("admin") === -1) {
            MockData[url].data.power = "1";
            MockData[url].data.username = "普通用户";
          }
          return res(MockData[url]);
        case "/addmenu":
          menu.push(data);
          return res(MockData[url]);
        case "/addmessage":
          msgList.push({
            ...data,
            m_id: Math.random(),
            creator: userInfo.data.username,
            add_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          });
          msg.data.total = msgList.length;
          return res(MockData[url]);
        case "/delmenu":
          let newMenu = menu.filter((i) => i.key !== data.key);
          menu = newMenu.filter((i) => i.parentKey !== data.key);
          return res(MockData[url]);
        case "/getmenuinfo":
          MockData[url].data = menu.find((i) => i.key === data.key);
          return res(MockData[url]);
        case "/editmenuinfo":
          menu = menu.map((item) => {
            if (item.key === data.key) {
              return data;
            }
            return item;
          });
          return res(MockData[url]);
        case "/getmessage":
          let list = [...msgList];
          if (data.name) {
            list = list.filter((i) => i.name.includes(data.name));
          }
          if (data.description) {
            list = list.filter((i) => i.description.includes(data.description));
          }
          MockData[url].data.list = list;
          msg.data.total = list.length;
          return res(MockData[url]);
        default:
          res();
          break;
      }
    }, 100);
  });
}

function formatMenu(list) {
  let data = list.map((i) => ({ ...i }));
  if (Array.isArray(list)) {
    let praentList = [],
      childList = [];
    data.forEach((item) => {
      item.type = item.type.split(",");
      if (item.parentKey) {
        childList.push(item);
        return;
      }
      praentList.push(item);
    });
    childList.forEach((item) => {
      let find = praentList.find((p) => p.key === item.parentKey);
      if (!find) {
        return praentList.push(item);
      }
      item.parentPath = find.path;
      if (find.children) {
        return find.children.push(item);
      }
      find.children = [item];
    });
    return praentList;
  }
  return [];
}
const mock = { get, post };

export default mock;
