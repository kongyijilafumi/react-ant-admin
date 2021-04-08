import Home from "@pages/home";
import Table from "@pages/table";
import Shape from "@pages/table/shape";
import Error404 from "@pages/err/404";
import Form from "@pages/table/form";
import Drag from "@pages/drag";
import { Redirect } from "react-router-dom";
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
    key: "Home",
    components: Home,
  },
  {
    path: "/table/table",
    keepAlive: true,
    title: "表格",
    key: "table",
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
    keepAlive: true,
    title: "表单",
    key: "form",
    components: Form,
  },
  {
    path: "/drag",
    title: "拖拽组件",
    key: "drag",
    components: Drag,
  },
  {
    path: "*",
    title: "404",
    key: "404",
    components: Error404,
  },
];

export default routerList;
