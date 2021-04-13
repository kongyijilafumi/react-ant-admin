import loadable from "@loadable/component";
import { Redirect } from "react-router-dom";

const Table = loadable(() => import("@pages/table"));
const Shape = loadable(() => import("@pages/table/shape"));
const Error404 = loadable(() => import("@pages/err/404"));
const Form = loadable(() => import("@pages/table/form"));
const Drag = loadable(() => import("@pages/drag"));
const Icons = loadable(() => import("@pages/icons"));
const Home = loadable(() => import("@pages/home"));

const routerList = [
  {
    path: "/",
    key: "index",
    to: "/home",
    components: Redirect,
  },
  {
    path: "/home",
    keepAlive: true,
    title: "主页",
    key: "home",
    components: Home,
  },
  {
    path: "/table/table",
    keepAlive: true,
    title: "表格",
    key: "t_table",
    components: Table,
  },
  {
    path: "/table/shape",
    keepAlive: true,
    title: "图表",
    key: "shape",
    components: Shape,
  },
  {
    path: "/table/form",
    title: "表单",
    key: "form",
    components: Form,
  },
  {
    path: "/drag",
    title: "拖拽组件",
    keepAlive: true,
    key: "drag",
    components: Drag,
  },
  {
    path: "/icons",
    title: "图标库",
    keepAlive: true,
    key: "icons",
    components: Icons,
  },
  {
    path: "*",
    title: "404",
    key: "404",
    keepAlive: true,
    components: Error404,
  },
];

export default routerList;
