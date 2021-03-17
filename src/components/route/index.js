import React from "react";
import Home from "@pages/home";
import Test from "@pages/test";
import Demo from "@pages/demo";

const routerList = [
  {
    path: "/",
    keepAlive: true,
    title: "Home",
    key:"Home",
    components: <Home />,
  },
  {
    path: "/test",
    keepAlive: true,
    title: "Test",
    key:"Test",
    components: <Test />,
  },
  {
    path: "/demo",
    keepAlive: true,
    title: "demo",
    key:"demo",
    components: <Demo />,
  },
];

export default routerList;
