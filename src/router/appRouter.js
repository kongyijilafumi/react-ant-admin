import React, { useEffect, useState } from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Spin } from "antd";
import Layout from "@/layout";
import Login from "@pages/login";
import { getLocalUser } from "@/utils";
import { useDispatchUser, useStateUserInfo } from "@/store/hooks";

const Router = process.env.REACT_APP_ROUTER_ISHASH === "1" ? HashRouter : BrowserRouter
const RouterBasename = process.env.REACT_APP_ROUTERBASE || "/"

function AppRouter() {
  const [loading, setLoad] = useState(true);
  const userInfo = useStateUserInfo()
  const { stateSetUser: setUser } = useDispatchUser()
  useEffect(() => {
    if (!userInfo) {
      let localInfo = getLocalUser();
      if (localInfo && localInfo.isLogin === true) {
        setUser(localInfo);
      }
      return setLoad(false);
    }
    setLoad(false);
  }, [userInfo, setUser]);
  if (loading)
    return (
      <Spin size="large" wrapperClassName="loading-page" tip="Loading...">
        <div className="loading-page"></div>
      </Spin>
    );
  if (!userInfo) return <Login />;
  return (
    <Router basename={RouterBasename}>
      <Layout />
    </Router>
  );
}

export default AppRouter;
