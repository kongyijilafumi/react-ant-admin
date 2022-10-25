import { useEffect, useState } from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Spin } from "antd";
import Layout from "@/layout";
import Login from "@/pages/login";
import { getLocalUser } from "@/utils";
import { useDispatchUser, useStateUserInfo } from "@/store/hooks";

const isHash = import.meta.env.REACT_APP_ROUTER_ISHASH === "1"
const RouterBasename = import.meta.env.REACT_APP_ROUTERBASE || "/"

function AppRouter() {
  const [loading, setLoad] = useState(true);
  const { stateSetUser } = useDispatchUser()
  const userInfo = useStateUserInfo()
  useEffect(() => {
    if (!userInfo) {
      let localInfo = getLocalUser();
      if (localInfo && localInfo.isLogin === true) {
        stateSetUser(localInfo);
      }
      return setLoad(false);
    } else {
      setLoad(false);
    }
  }, [userInfo, stateSetUser]);
  if (loading)
    return (
      <Spin size="large" wrapperClassName="loading-page" tip="Loading..." />
    );
  if (!userInfo) return <Login />;
  if (isHash) {
    return <HashRouter>
      <Layout />
    </HashRouter>
  }

  return (
    <BrowserRouter basename={RouterBasename}>
      <Layout />
    </BrowserRouter>
  );
}

export default AppRouter;
