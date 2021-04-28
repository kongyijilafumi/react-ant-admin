import loadable from "@loadable/component";
import { Redirect } from "react-router-dom";

const Card = loadable(() => import("@pages/list/card"));
const Search = loadable(() => import("@pages/list/search"));
const IndexForm = loadable(() => import("@pages/form"));
const Person = loadable(() => import("@pages/details/person"));
const Error = loadable(() => import("@pages/err"));
const PowerMenu = loadable(() => import("@pages/power/menu"));
const Vistor = loadable(() => import("@pages/statistics/vistor"));
const PowerUser = loadable(() => import("@pages/power/user"));
const routerList = [
  {
    path: "/",
    key: "index",
    to: "/details/person",
    components: Redirect,
  },
  {
    path: "/list/card",
    keepAlive: true,
    components: Card,
  },
  {
    path: "/list/search",
    components: Search,
  },
  {
    path: "/form/index",
    components: IndexForm,
  },
  {
    path: "/result/404",
    components: Error,
  },
  {
    path: "/result/403",
    status: "403",
    errTitle: "403",
    subTitle: "Sorry, you don't have access to this page.",
    components: Error,
  },
  {
    path: "/result/500",
    status: "500",
    errTitle: "500",
    subTitle: "Sorry, the server is reporting an error.",
    components: Error,
  },
  {
    path: "/details/person",
    components: Person,
  },
  {
    path: "/power/menu",
    components: PowerMenu,
  },
  {
    path: "/statistics/visitor",
    components: Vistor,
  },
  {
    path: "/power/user",
    components: PowerUser,
  },
  {
    path: "*",
    title: "页面不存在",
    key: "404",
    keepAlive: true,
    components: Error,
  },
];

export default routerList;
