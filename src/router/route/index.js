import Home from "@pages/home";
import Test from "@pages/test";
import Demo from "@pages/demo";
import Login from "@pages/login";
import Error404 from "@pages/err/404";
const routerList = [
  {
    path: "/",
    keepAlive: true,
    title: "Home",
    key: "Home",
    components: Home,
  },
  {
    path: "/test",
    keepAlive: true,
    title: "Test",
    key: "Test",
    components: Test,
  },
  {
    path: "/demo",
    keepAlive: true,
    title: "demo",
    key: "demo",
    components: Demo,
  },
  {
    path: "/nav3",
    keepAlive: true,
    title: "nav3",
    key: "nav3",
    components: Login,
  },
  {
    path: "*",
    title: "404",
    key: "404",
    components: Error404,
  },
];

export default routerList;
