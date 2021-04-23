import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { message, Spin } from "antd";
import Layout from "@/layout";
import Login from "@pages/login";
import { connect } from "react-redux";
import { RouterBasename } from "@/common";
import { setUserInfoAction } from "@/store/action";
import { login } from "@/api";
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
    let info = getLocalUser();
    if (!info) return setLoad(false);
    login(info)
      .then((res) => {
        const { data, status } = res;
        let token = info.token || res.token;
        if (status === 0) {
          data.token = token;
          setLoad(false);
          setUser(data);
          return;
        }
        setLoad(false);
        return message.error("登录遇到问题，请重新登录");
      })
      .catch((err) => {
        message.error("登录遇到问题，请重新登录");
        setLoad(false);
      });
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
