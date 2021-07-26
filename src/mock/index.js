import dayjs from "dayjs";
import { message } from "antd";
let currentUser = {};
const userInfoList = [
  {
    user_id: 1,
    username: "张同学",
    account: "admin",
    type_id: "超级管理员",
    t_id: 1,
  },
  {
    user_id: 2,
    username: "王五",
    account: "user",
    type_id: "用户",
    t_id: 2,
  },
  {
    user_id: 4,
    username: "李四",
    account: "qq123456",
    type_id: "游客",
    t_id: 3,
  },
  {
    user_id: 5,
    username: "路过的老鼠",
    account: "jake",
    type_id: "低权游客",
    t_id: 4,
  },
  {
    user_id: 6,
    username: "站长",
    account: "superAdmin",
    type_id: "超级管理员",
    t_id: 1,
  },
];
let menu = [
  {
    menu_id: 9,
    title: "列表页",
    path: "/list",
    key: "list",
    parentKey: "",
    icon: "icon_list",
    keepAlive: "false",
    order: 1,
  },
  {
    menu_id: 10,
    title: "卡片列表",
    path: "/card",
    key: "listCard",
    parentKey: "list",
    icon: "",
    keepAlive: "false",
    order: 5485,
  },
  {
    menu_id: 11,
    title: "查询列表",
    path: "/search",
    key: "listSearch",
    parentKey: "list",
    icon: "",
    keepAlive: "false",
    order: 9588,
  },
  {
    menu_id: 7,
    title: "表单页",
    path: "/form",
    key: "from",
    parentKey: "",
    icon: "icon_form",
    keepAlive: "false",
    order: 3,
  },
  {
    menu_id: 6,
    title: "基础表单",
    path: "/index",
    key: "formIndex",
    parentKey: "from",
    icon: "",
    keepAlive: "false",
    order: 9654,
  },
  {
    menu_id: 1,
    title: "详情页",
    path: "/details",
    key: "details",
    parentKey: "",
    icon: "icon_edit",
    keepAlive: "false",
    order: 3,
  },
  {
    menu_id: 2,
    title: "个人中心",
    path: "/person",
    key: "detailsPerson",
    parentKey: "details",
    icon: "icon_infopersonal",
    keepAlive: "false",
    order: 9998,
  },
  {
    menu_id: 16,
    title: "结果页",
    path: "/result",
    key: "result",
    parentKey: "",
    icon: "icon_voiceprint",
    keepAlive: "false",
    order: 4,
  },
  {
    menu_id: 3,
    title: "403",
    path: "/403",
    key: "error403",
    parentKey: "result",
    icon: "icon_locking",
    keepAlive: "false",
    order: 0,
  },
  {
    menu_id: 4,
    title: "404",
    path: "/404",
    key: "error404",
    parentKey: "result",
    icon: "icon_close",
    keepAlive: "false",
    order: 1,
  },
  {
    menu_id: 5,
    title: "500",
    path: "/500",
    key: "error500",
    parentKey: "result",
    icon: "icon_privacy_closed",
    keepAlive: "false",
    order: 4568,
  },
  {
    menu_id: 17,
    title: "统计",
    path: "/statistics",
    key: "statistics",
    parentKey: "",
    icon: "icon_MTR",
    keepAlive: "true",
    order: 5,
  },
  {
    menu_id: 18,
    title: "访客统计",
    path: "/visitor",
    key: "visitor",
    parentKey: "statistics",
    icon: "icon_addresslist",
    keepAlive: "true",
    order: 1,
  },
  {
    menu_id: 12,
    title: "权限管理",
    path: "/power",
    key: "power",
    parentKey: "",
    icon: "icon_set",
    keepAlive: "false",
    order: 9,
  },
  {
    menu_id: 14,
    title: "权限类别",
    path: "/type",
    key: "powerType",
    parentKey: "power",
    icon: "icon_safety",
    keepAlive: "true",
    order: 12,
  },
  {
    menu_id: 13,
    title: "菜单管理",
    path: "/menu",
    key: "powerMenu",
    parentKey: "power",
    icon: "icon_menu",
    keepAlive: "true",
    order: 1475,
  },
  {
    menu_id: 15,
    title: "用户管理",
    path: "/user",
    key: "powerUser",
    parentKey: "power",
    icon: "icon_infopersonal",
    keepAlive: "true",
    order: 1593,
  },
  {
    menu_id: 8,
    title: "图标库",
    path: "/icons",
    key: "icons",
    parentKey: "",
    icon: "icon_pen",
    keepAlive: "true",
    order: 10,
  },
];
const typeList = [
  {
    type_id: 1,
    name: "超级管理员",
    menu_id: "2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,1",
  },
  { type_id: 2, name: "用户", menu_id: "1,9,10,11,2,7,6,17,18,16,3,4,5,8" },
  { type_id: 3, name: "游客", menu_id: "9,1,10,11,2,7,6,17,18,12" },
  { type_id: 4, name: "低权游客", menu_id: "9,10" },
];
const power = {
  status: 0,
  data: typeList,
  mapKey: [
    { title: "权限id", dataIndex: "type_id", key: "type_id" },
    { title: "权限简称", dataIndex: "name", key: "name" },
    { title: "显示菜单列表id", dataIndex: "menu_id", key: "menu_id" },
  ],
  menu: formatMenu(menu),
};
const userInfo = {
  msg: "登录成功",
  status: 0,
  data: null,
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
const menuMapKey = [
  { title: "菜单id", dataIndex: "menu_id", key: "menu_id" },
  { title: "菜单名称", dataIndex: "title", key: "title" },
  { title: "菜单路由", dataIndex: "path", key: "path" },
  { title: "菜单唯一key", dataIndex: "key", key: "key" },
  { title: "菜单父级key", dataIndex: "parentKey", key: "parentKey" },
  { title: "菜单图标", dataIndex: "icon", key: "icon" },
  { title: "页面是否保持状态", dataIndex: "keepAlive", key: "keepAlive" },
  { title: "菜单排序", dataIndex: "order", key: "order" },
];
const MockData = {
  "/getmenu": {
    data: formatMenu(menu),
    mapKey: menuMapKey,
  },
  "/getpower": power,
  "/login": userInfo,
  "/addmenu": addMenu,
  "/addmessage": addMsg,
  "/getmessage": msg,
  "/delmenu": delMenu,
  "/getmenuinfo": { status: 0 },
  "/editmenuinfo": { status: 0, msg: "修改成功！" },
  "/getvisitordata": { status: 1, msg: "暂无" },
};

function get(url) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (url === "/getmenu") {
        let typeId = currentUser.t_id;
        if (typeId) {
          let action = typeList.find((i) => i.type_id === typeId)?.menu_id;
          action = action ? action.split(",").map(Number) : [];
          let menuList = menu.filter((i) => action.includes(i.menu_id));
          MockData[url].data = formatMenu(menuList);
        }
        res(MockData[url]);

        return;
      }
      res(MockData[url]);
    }, 500);
  }).then((res) => (res ? res : message.error("接口暂未配置")));
}

function post(url, data) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      switch (url) {
        case "/login": {
          const info = userInfoList.find((u) => u.account === data.account);
          if (info) {
            MockData[url].data = info;
            currentUser = info;
            return res(MockData[url]);
          }
          message.error("未找到账号");
          return;
        }
        case "/addmenu": {
          menu.push({ ...data, menu_id: Math.random() });
          return res(MockData[url]);
        }
        case "/addmessage": {
          msgList.push({
            ...data,
            m_id: Math.random(),
            creator: userInfo.data.username,
            add_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          });
          msg.data.total = msgList.length;
          return res(MockData[url]);
        }
        case "/delmenu": {
          let newMenu = menu.filter((i) => i.key !== data.key);
          menu = newMenu.filter((i) => i.parentKey !== data.key);
          return res(MockData[url]);
        }
        case "/getmenuinfo": {
          MockData[url].data = menu.find((i) => i.key === data.key);
          return res(MockData[url]);
        }
        case "/editmenuinfo": {
          menu = menu.map((item) => {
            if (item.key === data.key) {
              return { ...item, ...data };
            }
            return item;
          });
          return res(MockData[url]);
        }
        case "/getmessage": {
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
        }
        default: {
          res({ status: 1, msg: "暂无" });
          break;
        }
      }
    }, 100);
  }).then((res) => (res.status === 0 ? res : message.error("接口暂未配置")));
}

function formatMenu(list) {
  list.sort((a, b) => a.order - b.order);
  let data = list.map((i) => ({ ...i }));
  if (Array.isArray(list)) {
    let praentList = [],
      childList = [];
    data.forEach((item) => {
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
