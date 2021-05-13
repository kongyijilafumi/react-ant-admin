import React from "react";
import { Layout } from "antd";
import Header from "./header";
import Menu from "./siderMenu";
import TopMenu from "./topMenu";
import Footer from "./footer";
import Router from "@/router";
import "./index.less";
const { Content } = Layout;
const LayoutBody = () => {
  return (
    <Layout className="my-layout-body">
      <Header />
      <Layout>
        <Menu />
        <Layout className="layout-content-wrap">
          <TopMenu />
          <Content className="site-layout-background layout-content-body">
            <Router />
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutBody;
