import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Spin } from "antd";
import Layout from "@/layout";
import Login from "@pages/login";
import { connect } from "react-redux";
import { RouterBasename } from "@/common";
import { setUserInfoAction } from "@/store/action";
import { getLocalUser } from "@/utils";

const mapStateToProps = (state) => ({
  userInfo: state.global.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (info) => dispatch(setUserInfoAction(info)),
});

function AppRouter({ userInfo, setUser }) {
  const [loading, setLoad] = useState(true);
  useEffect(() => {
    if (!userInfo) {
      let info = getLocalUser();
      if (!info) {
        setUser(info);
      }
      return setLoad(false);
    }
    setLoad(false);
    // eslint-disable-next-line
  }, []);
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

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);