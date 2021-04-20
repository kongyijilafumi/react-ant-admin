import loadable from "@loadable/component";
import { Redirect } from "react-router-dom";

const Table = loadable(() => import("@pages/table"));
const Shape = loadable(() => import("@pages/table/shape"));
const Error = loadable(() => import("@pages/err"));
const Form = loadable(() => import("@pages/table/form"));
const Drag = loadable(() => import("@pages/drag"));
const Icons = loadable(() => import("@pages/icons"));
const Home = loadable(() => import("@pages/home"));
const P0 = loadable(() => import("@pages/power/p0"));
const P1 = loadable(() => import("@pages/power/p1"));

const routerList = [
  {
    path: "/",
    to: "/home",
    key:"gohonme",
    components: Redirect,
  },
  {
    path: "/home",
    keepAlive: true,
    components: Home,
  },
  {
    path: "/table/table",
    keepAlive: true,
    components: Table,
  },
  {
    path: "/table/shape",
    keepAlive: true,
    components: Shape,
  },
  {
    path: "/table/form",
    components: Form,
  },
  {
    path: "/drag",
    keepAlive: true,
    components: Drag,
  },
  {
    path: "/icons",
    keepAlive: true,
    components: Icons,
  },
  {
    path: "/power/0",
    components: P0,
  },
  {
    path: "/power/1",
    components: P1,
  },
  {
    path: "*",
    title: "404",
    key: "404",
    keepAlive: true,
    components: Error,
  },
];

export default routerList;
