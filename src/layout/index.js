import React from "react";
import { Layout } from "antd";
import Header from "./header";
import Menu from "./siderMenu";
import TopMenu from "./topMenu";
import Router from "@/router";
import "./index.scss";
const { Content } = Layout;
const LayoutBody = () => {
  return (
    <Layout className="layout-body">
      <Header />
      <Layout>
        <Menu />
        <Layout className="layout-content-wrap">
          <TopMenu />
          <Content className="site-layout-background layout-content-body">
            <Router />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutBody;
