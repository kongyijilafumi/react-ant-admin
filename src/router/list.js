import auto from "./auto";
import loadable from "@loadable/component";
import { Redirect } from "react-router-dom";
const Error = loadable(() => import("@pages/err"));

const defaultArr = [
  {
    [MENU_PATH]: "/",
    [MENU_KEY]: "index",
    to: "/details/person",
    components: Redirect,
  },
  {
    [MENU_PATH]: "/result/404",
    components: Error,
  },
  {
    [MENU_PATH]: "/result/403",
    status: "403",
    errTitle: "403",
    subTitle: "Sorry, you don't have access to this page.",
    components: Error,
  },
  {
    [MENU_PATH]: "/result/500",
    status: "500",
    errTitle: "500",
    subTitle: "Sorry, the server is reporting an error.",
    components: Error,
  },
  {
    [MENU_PATH]: "*",
    [MENU_TITLE]: "页面不存在",
    key: "404",
    keepAlive: true,
    components: Error,
  },
];
const list = auto.map((c) => ({ ...c, components: loadable(c.components) }));

list.push(...defaultArr);

export default list;
