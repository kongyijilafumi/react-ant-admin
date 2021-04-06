import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./index";
import Layout from "@/layout";
import Header from "@/layout/header";
import Menu from "@/layout/siderMenu";
import TopMenu from "@/layout/topMenu";
import { connect } from "react-redux";
import Login from "@pages/login";
import { Spin } from "antd";

const mapStateToProps = (state) => ({
  userInfo: state.global.userInfo,
});

function AppRouter({ userInfo }) {
  const [loading, setLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    },1000);
  }, []);
  if (loading)
    return (
      <Spin size="large" wrapperClassName="loading-page" tip="Loading...">
        <div className="loading-page"></div>
      </Spin>
    );
  if (!userInfo) return <Login />;
  return (
    <Router>
      <Layout
        header={<Header />}
        menu={<Menu />}
        content={<Routes />}
        topMenu={<TopMenu />}
      />
    </Router>
  );
}

export default connect(mapStateToProps, null)(AppRouter);
