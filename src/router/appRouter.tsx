import { useCallback, useEffect, useState } from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Spin } from "antd";
import Layout from "@/layout";
import Login from "@/pages/login";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfoAction } from "@/store/user/action";
import { getLocalUser } from "@/utils";
import { State } from "@/types"
import { getStateUser } from "@/store/getter";

const isHash = import.meta.env.REACT_APP_ROUTER_ISHASH === "1"
const RouterBasename = import.meta.env.REACT_APP_ROUTERBASE || "/"

function AppRouter() {
  const [loading, setLoad] = useState(true);
  const dispatch = useDispatch()
  const setUser = useCallback((info: State["user"]) => dispatch(setUserInfoAction(info)), [dispatch])
  const userInfo = useSelector(getStateUser)
  useEffect(() => {
    if (!userInfo) {
      let localInfo = getLocalUser();
      if (localInfo && localInfo.isLogin === true) {
        setUser(localInfo);
      }
      return setLoad(false);
    } else {
      setLoad(false);
    }
  }, [userInfo]);
  if (loading)
    return (
      <Spin size="large" wrapperClassName="loading-page" tip="Loading..." />
    );
  if (!userInfo) return <Login />;
  if (isHash) {
    return <HashRouter basename={RouterBasename}>
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
