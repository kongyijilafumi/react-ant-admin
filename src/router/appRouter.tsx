import { useEffect, useState } from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Spin } from "antd";
import Layout from "@/layout";
import Login from "@/pages/login";
import { connect } from "react-redux";
import { setUserInfoAction } from "@/store/user/action";
import { getLocalUser } from "@/utils";
import { State, Dispatch } from "@/types"

const isHash = import.meta.env.REACT_APP_ROUTER_ISHASH === "1"
const RouterBasename = import.meta.env.REACT_APP_ROUTERBASE || "/"

interface AppRouterProps {
  userInfo: State["user"]
  setUser: (info: State["user"]) => void
}

const mapStateToProps = (state: State) => ({
  userInfo: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setUser: (info: State["user"]) => dispatch(setUserInfoAction(info)),
});

function AppRouter({ userInfo, setUser }: AppRouterProps) {
  const [loading, setLoad] = useState(true);
  useEffect(() => {
    if (!userInfo) {
      let localInfo = getLocalUser();
      if (localInfo && localInfo.isLogin === true) {
        setUser(localInfo);
      }
      return setLoad(false);
    }
    setLoad(false);
    // eslint-disable-next-line
  }, []);
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

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
